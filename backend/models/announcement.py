from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from database import Base
import datetime

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

    category = Column(String(50), nullable=False)  # event, internship, etc
    status = Column(String(20), default="draft")    # draft / published

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)