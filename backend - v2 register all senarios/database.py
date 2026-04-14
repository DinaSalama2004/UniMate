# database.py
import os
import re
from pathlib import Path
from urllib.parse import quote_plus, unquote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine.url import URL, make_url
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import StaticPool

UNIMATE_TESTING = os.getenv("UNIMATE_TESTING", "").strip().lower() in ("1", "true", "yes")

if not UNIMATE_TESTING:
    load_dotenv(Path(__file__).resolve().parent / ".env")


def _validated_db_name(name: str) -> str:
    if not name or not re.fullmatch(r"[A-Za-z0-9_]+", name):
        raise ValueError(f"Invalid database name for auto-create: {name!r}")
    return name


def _odbc_connect_string(database: str) -> str:
    """Raw ODBC connection string (used for app DB and for master during CREATE DATABASE)."""
    server = os.getenv("SQLSERVER_SERVER", r"localhost\SQLEXPRESS").strip()
    driver = os.getenv("SQLSERVER_DRIVER", "ODBC Driver 17 for SQL Server").strip()
    trusted = os.getenv("SQLSERVER_TRUSTED_CONNECTION", "yes").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )
    uid = os.getenv("SQLSERVER_UID", "").strip()
    pwd = os.getenv("SQLSERVER_PWD", "").strip()

    parts = [f"DRIVER={{{driver}}}", f"SERVER={server}", f"DATABASE={database}"]
    if trusted:
        parts.append("Trusted_Connection=yes")
    else:
        if not uid:
            raise ValueError(
                "SQLSERVER_TRUSTED_CONNECTION is disabled but SQLSERVER_UID is empty. "
                "Set SQLSERVER_UID/SQLSERVER_PWD or use Trusted_Connection=yes."
            )
        parts.append(f"UID={uid}")
        parts.append(f"PWD={pwd}")
    return ";".join(parts) + ";"


def _build_database_url() -> str:
    """Prefer DATABASE_URL; otherwise build ODBC string (handles named instances like SQLEXPRESS)."""
    explicit = os.getenv("DATABASE_URL", "").strip()
    if explicit:
        return explicit

    database = os.getenv("SQLSERVER_DATABASE", "unimate").strip()
    return "mssql+pyodbc:///?odbc_connect=" + quote_plus(_odbc_connect_string(database))


if UNIMATE_TESTING:
    DATABASE_URL = "sqlite:///:memory:"
else:
    DATABASE_URL = _build_database_url()

Base = declarative_base()

if UNIMATE_TESTING:
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        echo=False,
        future=True,
    )
else:
    engine = create_engine(DATABASE_URL, echo=True, future=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def _database_name_for_admin() -> str:
    """Logical database name for CREATE DATABASE when URL uses odbc_connect."""
    url = make_url(DATABASE_URL)
    if url.database:
        return _validated_db_name(url.database)
    odbc_key = url.query.get("odbc_connect")
    if odbc_key:
        raw = unquote_plus(odbc_key[0] if isinstance(odbc_key, (list, tuple)) else odbc_key)
        m = re.search(r"(?i)DATABASE=([^;]+)", raw)
        if m:
            return _validated_db_name(m.group(1).strip())
    return _validated_db_name(os.getenv("SQLSERVER_DATABASE", "unimate").strip())


def _master_engine_url() -> str:
    """Connection URL pointing at master (for ensure_database_exists)."""
    explicit = os.getenv("DATABASE_URL", "").strip()
    if not explicit:
        return "mssql+pyodbc:///?odbc_connect=" + quote_plus(_odbc_connect_string("master"))

    url = make_url(DATABASE_URL)
    odbc_key = url.query.get("odbc_connect")
    if odbc_key:
        raw = unquote_plus(odbc_key[0] if isinstance(odbc_key, (list, tuple)) else odbc_key)
        raw_master = re.sub(r"(?i)DATABASE=[^;]+", "DATABASE=master", raw, count=1)
        if not re.search(r"(?i)DATABASE=", raw_master):
            raw_master = "DATABASE=master;" + raw_master
        return "mssql+pyodbc:///?odbc_connect=" + quote_plus(raw_master)

    master = URL.create(
        drivername=url.drivername,
        username=url.username,
        password=url.password,
        host=url.host,
        port=url.port,
        database="master",
        query=url.query,
    )
    return master.render_as_string(hide_password=False)


def ensure_database_exists() -> None:
    """Create the SQL Server database if missing (requires a running instance; uses master)."""
    if UNIMATE_TESTING:
        return

    db_name = _database_name_for_admin()
    master_url = _master_engine_url()
    engine_master = create_engine(
        master_url,
        echo=False,
        future=True,
        isolation_level="AUTOCOMMIT",
    )
    stmt = (
        f"IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'{db_name}') "
        f"CREATE DATABASE [{db_name}]"
    )
    with engine_master.connect() as conn:
        conn.execute(text(stmt))


def create_tables() -> None:
    """Create tables from SQLAlchemy models (imports register metadata on Base)."""
    import models.admin  # noqa: F401
    import models.student  # noqa: F401
    import models.user  # noqa: F401

    Base.metadata.create_all(bind=engine)


def apply_mssql_schema_patches() -> None:
    """Add columns missing on existing SQL Server tables (create_all does not ALTER old tables)."""
    if UNIMATE_TESTING or engine.dialect.name != "mssql":
        return
    stmt = text(
        """
        IF OBJECT_ID(N'dbo.users', N'U') IS NOT NULL
           AND COL_LENGTH('dbo.users', 'full_name') IS NULL
        BEGIN
            ALTER TABLE dbo.users ADD full_name VARCHAR(255) NULL;
        END
        """
    )
    with engine.begin() as conn:
        conn.execute(stmt)


def init_db() -> None:
    if UNIMATE_TESTING:
        create_tables()
        return
    ensure_database_exists()
    create_tables()
    apply_mssql_schema_patches()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
