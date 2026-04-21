from sqlalchemy import Column, String, Integer, Float, Date
from database import Base

class Student(Base):
    __tablename__ = "students"

    user_id = Column(String(36), primary_key=True)

    university = Column(String(255))
    college = Column(String(255))

    major_id = Column(Integer)
    academic_year = Column(Integer)
    gpa = Column(Float)

    bio = Column(String(500))
    gender = Column(String(20))
    birthdate = Column(Date)

    profile_completion_percentage = Column(Integer, default=0)