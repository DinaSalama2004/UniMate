from sqlalchemy import Column, String
from database import Base

class Student(Base):
    __tablename__ = "students"

    user_id = Column(String, primary_key=True)
    university = Column(String)
    college = Column(String)