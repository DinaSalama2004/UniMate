"""Pytest configuration: in-memory SQLite, no SQL Server required."""

import os

os.environ["UNIMATE_TESTING"] = "1"

import pytest
from fastapi.testclient import TestClient

from database import Base, engine
from main import app


def _import_models_for_metadata():
    import models.admin  # noqa: F401
    import models.student  # noqa: F401
    import models.user  # noqa: F401


@pytest.fixture(autouse=True)
def _reset_database():
    _import_models_for_metadata()
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as test_client:
        yield test_client
