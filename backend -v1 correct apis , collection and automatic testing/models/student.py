from sqlalchemy import Column, String
from database import Base

class Student(Base):
    __tablename__ = "students"

    user_id = Column(String(36), primary_key=True)
    university = Column(String(255))
    college = Column(String(255))