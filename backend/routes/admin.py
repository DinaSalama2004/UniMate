from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from utils.security import hash_password, super_admin_required

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
@router.delete("/admin/{admin_email}")
def delete_admin(
    admin_email: str,
    db: Session = Depends(get_db),
    _: User = Depends(super_admin_required),
):
    email = admin_email.strip().lower()
    admin = db.query(User).filter(User.email == email, User.role == "admin").first()
    if not admin:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "admin_not_found",
                "message": "Admin not found.",
            },
        )
    
    from models.admin import Admin
    admin_record = db.query(Admin).filter(Admin.user_id == admin.id).first()
    if admin_record:
        db.delete(admin_record)

    db.delete(admin)
    db.commit()
    return {"message": f"Admin deleted successfully"}


