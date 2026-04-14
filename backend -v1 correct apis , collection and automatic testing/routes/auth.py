from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models.student import Student
from models.user import User
from utils.jwt import create_token
from utils.security import hash_password, super_admin_required, verify_password

router = APIRouter()


class EmailPasswordBody(BaseModel):
    email: str
    password: str


# SIGN UP STUDENT
@router.post("/register")
def register(body: EmailPasswordBody, db: Session = Depends(get_db)):
    email = body.email.strip()  # Removes spaces
    password = body.password

    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email exists")

    user = User(
        email=email,
        password=hash_password(password),
        role="student"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    student = Student(user_id=user.id)
    db.add(student)
    db.commit()

    return {"message": "Student created"}


# LOGIN STUDENT, ADMIN
@router.post("/login")
def login(body: EmailPasswordBody, db: Session = Depends(get_db)):
    email = body.email.strip()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(body.password, user.password):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({
        "user_id": user.id,
        "role": user.role
    })

    return {"token": token, "role": user.role}


# SUPER ADMIN CREATES ADMIN
@router.post("/create-admin")
def create_admin(
    body: EmailPasswordBody,
    db: Session = Depends(get_db),
    _: User = Depends(super_admin_required),
):
    email = body.email.strip()
    # Check if email already exists
    if db.query(User).filter(User.email == email).first():
        return {"error": "Email already exists"}

    # Create admin user
    admin = User(
        email=email,
        password=hash_password(body.password),
        role="admin"
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return {"message": f"Admin {email} created successfully"}