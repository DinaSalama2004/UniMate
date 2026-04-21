from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime
from database import Base
import datetime

class StudentCourse(Base):
    __tablename__ = "student_courses"

    student_id = Column(String(36), ForeignKey("students.user_id"), primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"), primary_key=True)

    grade = Column(Float)
    semester = Column(Integer)