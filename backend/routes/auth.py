from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from sqlalchemy.orm import Session

from database import get_db
from models.student import Student
from models.user import User
from utils.jwt import create_token
from utils.security import hash_password, super_admin_required, verify_password

router = APIRouter()


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
    email = str(body.email).strip().lower()

    if db.query(User).filter(User.email == email).first():
        raise HTTPException(
            status_code=400,
            detail={
                "code": "email_exists",
                "message": "This email is already registered.",
            },
        )

    user = User(
        full_name=body.full_name,
        email=email,
        password=hash_password(body.password),
        role="student",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    student = Student(user_id=user.id)
    db.add(student)
    db.commit()

    token = create_token({
        "sub": user.email,
        "user_id": user.id,
        "role": user.role,
    })
    return {"token": token, "role": user.role}


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


# SUPER ADMIN CREATES ADMIN
@router.post("/create-admin")
def create_admin(
    body: EmailPasswordBody,
    db: Session = Depends(get_db),
    _: User = Depends(super_admin_required),
):
    email = body.email.strip().lower()
    # Check if email already exists
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(
            status_code=400,
            detail={
                "code": "email_exists",
                "message": "This email is already registered.",
            },
        )

    # Create admin user
    admin = User(
        email=email,
        password=hash_password(body.password),
        role="admin"
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    from models.admin import Admin
    admin_record = Admin(user_id=admin.id)
    db.add(admin_record)
    db.commit()

    return {"message": f"Admin {email} created successfully"}


# SUPER ADMIN DELETES ADMIN
@router.delete("/admin/{admin_id}")
def delete_admin(
    admin_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(super_admin_required),
):
    admin = db.query(User).filter(User.id == admin_id, User.role == "admin").first()
    if not admin:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "admin_not_found",
                "message": "Admin not found.",
            },
        )
    
    from models.admin import Admin
    admin_record = db.query(Admin).filter(Admin.user_id == admin_id).first()
    if admin_record:
        db.delete(admin_record)

    db.delete(admin)
    db.commit()
    return {"message": f"Admin deleted successfully"}