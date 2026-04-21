from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String(255))
    course_code = Column(String(50), unique=True)

    major_id = Column(Integer, ForeignKey("majors.id"))
    category = Column(String(100))
    difficulty_level = Column(Integer)