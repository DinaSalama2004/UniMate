from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt, JWTError
from database import get_db
from models.student import Student
from models.user import User
from utils.jwt import create_token
from utils.security import hash_password, verify_password, SECRET_KEY, ALGORITHM
from models.student import Student
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from utils.security import SECRET_KEY, ALGORITHM

router = APIRouter()

class PostForgotPasswordBody(BaseModel):
    email: EmailStr

class PostResetPasswordBody(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str = Field(..., min_length=8, max_length=128)

class EmailPasswordBody(BaseModel):
    email: EmailStr
    password: str = Field(..., max_length=128)

    @field_validator("password")
    @classmethod
    def password_required(cls, v: str) -> str:
        if not v:
            raise ValueError("Password is required.")
        return v

class RegisterBody(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: EmailStr
    password: str = Field(..., max_length=128)
    confirm_password: str = Field(..., max_length=128)

    @field_validator("full_name")
    @classmethod
    def full_name_not_blank(cls, v: str) -> str:
        s = v.strip()
        if not s:
            raise ValueError("Full name cannot be empty.")
        return s

    @field_validator("password", "confirm_password")
    @classmethod
    def password_length(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        return v

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Password and confirm password do not match.")
        return self
    
# SIGN UP STUDENT
@router.post("/register")
def register(body: RegisterBody, db: Session = Depends(get_db)):
    email = body.email.strip().lower()

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail={"code": "email_exists", "message": "Email already registered"}
        )

    user = User(
        full_name=body.full_name,
        email=email,
        password=hash_password(body.password),
        role="student"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    student = Student(
        user_id=user.id,
        academic_year=None,
        gpa=None,
        profile_completion_percentage=10
    )

    db.add(student)
    db.commit()

    token = create_token({
        "sub": user.email,
        "user_id": user.id,
        "role": user.role
    })

    return {
        "token": token,
        "role": user.role,
        "user_id": user.id
    }

# LOGIN STUDENT, ADMIN
@router.post("/login")
def login(body: EmailPasswordBody, db: Session = Depends(get_db)):
    email = body.email.strip().lower()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(body.password, user.password):
        raise HTTPException(
            status_code=401,
            detail={
                "code": "invalid_credentials",
                "message": "Invalid email or password.",
            },
        )

    token = create_token({
        "sub": user.email,
        "user_id": user.id,
        "role": user.role
    })
    
    return {"token": token, "role": user.role}

# FORGOT PASSWORD
@router.post("/forgot-password")
def forgot_password(body: PostForgotPasswordBody, db: Session = Depends(get_db)):
    email = body.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # In a real app we might not want to return 404 to prevent email enumeration, 
        # but returning it here for UX clarity.
        raise HTTPException(
            status_code=404,
            detail={"code": "user_not_found", "message": "User not found."}
        )
        
    payload = {
        "sub": user.email,
        "purpose": "password_reset",
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }
    reset_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"message": "Reset link would be sent via email in production", "reset_token": reset_token}

# RESET PASSWORD
@router.post("/reset-password")
def reset_password(body: PostResetPasswordBody, db: Session = Depends(get_db)):
    email = body.email.strip().lower()
    
    try:
        payload = jwt.decode(body.reset_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("sub") != email or payload.get("purpose") != "password_reset":
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail={"code": "invalid_token", "message": "The reset token is invalid or expired."})
        
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.password = hash_password(body.new_password)
    db.commit()
    return {"message": "Password updated successfully."}

