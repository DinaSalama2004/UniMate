from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class StudentInterest(Base):
    __tablename__ = "student_interests"

    student_id = Column(String(36), ForeignKey("students.user_id"), primary_key=True)
    interest_id = Column(Integer, ForeignKey("interests.id"), primary_key=True)