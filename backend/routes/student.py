from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, field_validator, model_validator
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from database import get_db
from models.student import Student
from models.user import User
from utils.security import SECRET_KEY, ALGORITHM
from models.student import Student
from models.student_interests import StudentInterest
from models.student_courses import StudentCourse
from jose import jwt, JWTError
from typing import List
from pydantic import BaseModel
from typing import Optional
from datetime import date

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# UPDATE STUDENT PROFILE

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id = payload.get("user_id")
        email = payload.get("sub")
        role = payload.get("role")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token: missing user_id"
            )

        return {
            "user_id": user_id,
            "email": email,
            "role": role
        }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

class StudentProfileUpdate(BaseModel):
    university: Optional[str]
    college: Optional[str]
    major_id: Optional[int]
    academic_year: Optional[int]

@router.put("/student/updateBasicData")
def update_basic_data(
    body: StudentProfileUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    student = db.query(Student).filter(
        Student.user_id == user["user_id"]
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    for key, value in body.dict(exclude_unset=True).items():
        setattr(student, key, value)

    db.commit()

    return {"message": "Profile updated successfully"}


# UPDATE STUDENT INTERSETS
class InterestsUpdate(BaseModel):
    interests: List[int]

@router.put("/student/updateInterests")
def update_interests(
    body: InterestsUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    student_id = user["user_id"]

    # delete old interests
    db.query(StudentInterest).filter(
        StudentInterest.student_id == student_id
    ).delete()

    # insert new ones
    for interest_id in body.interests:
        db.add(StudentInterest(
            student_id=student_id,
            interest_id=interest_id
        ))

    db.commit()

    return {"message": "Interests updated successfully"}


# UPDATE STUDENT COURSES
class CourseUpdate(BaseModel):
    course_id: int
    grade: Optional[float]
    semester: Optional[int]

class CoursesUpdate(BaseModel):
    courses: list[CourseUpdate]

@router.put("/student/updateCourses")
def update_courses(
    body: CoursesUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    student_id = user["user_id"]

    # delete old courses
    db.query(StudentCourse).filter(
        StudentCourse.student_id == student_id
    ).delete()

    # insert new ones
    for c in body.courses:
        db.add(StudentCourse(
            student_id=student_id,
            course_id=c.course_id,
            grade=c.grade,
            semester=c.semester
        ))

    db.commit()

    return {"message": "Courses updated successfully"}
