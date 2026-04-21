from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.interest import Interest
from models.course import Course
from models.major import Major

router = APIRouter(prefix="/academic", tags=["Academic"])

@router.get("/majors")
def get_majors(db: Session = Depends(get_db)):
    return [
    {
        "id": m.id,
        "name": m.name
    }
    for m in db.query(Major).all()
]

@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return courses

@router.get("/interests")
def get_interests(db: Session = Depends(get_db)):
    interests = db.query(Interest).limit(10).all()

    return [
        {
            "id": i.id,
            "name": i.name
        }
        for i in interests
    ]