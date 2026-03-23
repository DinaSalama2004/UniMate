from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.user import User
from models.student import Student
from models.admin import Admin
from utils.security import hash_password, verify_password, super_admin_required
from utils.jwt import create_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# SIGN UP STUDENT
@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):

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
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({
        "user_id": user.id,
        "role": user.role
    })

    return {"access_token": token, "role": user.role}


# SUPER ADMIN CREATES ADMIN
@router.post("/create-admin")
def create_admin(email: str, password: str, db: Session = Depends(get_db),
                 _: User = Depends(super_admin_required)):
    # Check if email already exists
    if db.query(User).filter(User.email == email).first():
        return {"error": "Email already exists"}
    
    # Create admin user
    admin = User(
        email=email,
        password=hash_password(password),
        role="admin"
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return {"message": f"Admin {email} created successfully"}