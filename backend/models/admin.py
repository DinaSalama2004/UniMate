from sqlalchemy import Column, String
from database import Base

class Admin(Base):
    __tablename__ = "admins"

    user_id = Column(String, primary_key=True)
    full_name = Column(String)