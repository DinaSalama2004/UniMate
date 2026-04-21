from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db

from models.announcement import Announcement
from utils.security import super_admin_required, admin_required, require_roles

router = APIRouter(prefix="/announcements", tags=["Announcements"])
from pydantic import BaseModel
from typing import Optional

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    category: str
    status: Optional[str] = "draft"


class AnnouncementUpdate(BaseModel):
    title: Optional[str]
    content: Optional[str]
    category: Optional[str]
    status: Optional[str]

# CREATE announcement (Admin)
@router.post("/create")
def create_announcement(
    body: AnnouncementCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_roles("admin", "super_admin"))
):
    announcement = Announcement(
        title=body.title,
        content=body.content,
        category=body.category,
        status=body.status
    )

    db.add(announcement)
    db.commit()
    db.refresh(announcement)

    return announcement


# GET ALL (Students + Admin)
@router.get("/")
def get_announcements(db: Session = Depends(get_db)):
    return db.query(Announcement).order_by(Announcement.created_at.desc()).all()


# GET BY ID
@router.get("/{announcement_id}")
def get_one(announcement_id: int, db: Session = Depends(get_db)):
    ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()

    if not ann:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return ann


# UPDATE (Admin)
@router.put("/{announcement_id}")
def update_announcement(
    announcement_id: int,
    body: AnnouncementUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_roles("admin", "super_admin"))
):
    ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()

    if not ann:
        raise HTTPException(status_code=404, detail="Announcement not found")

    for key, value in body.dict(exclude_unset=True).items():
        setattr(ann, key, value)

    db.commit()
    db.refresh(ann)

    return ann


# DELETE (Admin)
@router.delete("/{announcement_id}")
def delete_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_roles("admin", "super_admin"))
):
    ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()

    if not ann:
        raise HTTPException(status_code=404, detail="Announcement not found")

    db.delete(ann)
    db.commit()

    return {"message": "Announcement deleted successfully"}