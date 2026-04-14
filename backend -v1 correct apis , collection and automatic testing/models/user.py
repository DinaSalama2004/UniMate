from sqlalchemy import Column, String
from database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True)
    password = Column(String(500))
    role = Column(String(20))