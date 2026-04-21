from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from models.user import User
from database import get_db


pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


# OAuth2 token setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "your_secret_key_here"  # change this to a strong secret in production
ALGORITHM = "HS256"

# Hardcoded super admin email
SUPER_ADMIN_EMAIL = "dinasalama@gmail.com"

# Dependency to get current user from JWT token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

# Dependency to restrict route access to super admin only
def super_admin_required(current_user: User = Depends(get_current_user)):
    if current_user.email != SUPER_ADMIN_EMAIL and getattr(current_user, "role", "") != "super_admin":
        raise HTTPException(status_code=403, detail="Only super admin can perform this action")
    return current_user

def admin_required(current_user: User = Depends(get_current_user)):
    if getattr(current_user, "role", "") not in ["admin", "super_admin"]:
        raise HTTPException(
            status_code=403,
            detail="Only admin or super admin can perform this action"
        )
    return current_user

def require_roles(*roles):
    def checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail="Not enough permissions"
            )
        return current_user
    return checker