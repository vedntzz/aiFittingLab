from sqlalchemy.orm import Session
from models.draft import Draft
from schemas.draft import DraftCreate, DraftUpdate
from typing import List, Optional


class DraftService:
    @staticmethod
    def get_by_id(db: Session, draft_id: str) -> Optional[Draft]:
        """Get draft by ID"""
        return db.query(Draft).filter(Draft.id == draft_id).first()

    @staticmethod
    def get_user_drafts(db: Session, user_id: str) -> List[Draft]:
        """Get all drafts for a user"""
        return (
            db.query(Draft)
            .filter(Draft.user_id == user_id)
            .order_by(Draft.updated_at.desc())
            .all()
        )

    @staticmethod
    def create(db: Session, user_id: str, draft_data: DraftCreate) -> Draft:
        """Create new draft"""
        draft_dict = draft_data.model_dump()
        draft_dict["garments"] = [g.model_dump() for g in draft_data.garments]
        draft = Draft(user_id=user_id, **draft_dict)
        db.add(draft)
        db.commit()
        db.refresh(draft)
        return draft

    @staticmethod
    def update(db: Session, draft_id: str, draft_data: DraftUpdate) -> Optional[Draft]:
        """Update draft"""
        draft = DraftService.get_by_id(db, draft_id)
        if not draft:
            return None

        update_data = draft_data.model_dump(exclude_unset=True)
        if "garments" in update_data and update_data["garments"]:
            update_data["garments"] = [g.model_dump() for g in update_data["garments"]]

        for field, value in update_data.items():
            setattr(draft, field, value)

        db.commit()
        db.refresh(draft)
        return draft

    @staticmethod
    def delete(db: Session, draft_id: str) -> bool:
        """Delete draft"""
        draft = DraftService.get_by_id(db, draft_id)
        if not draft:
            return False

        db.delete(draft)
        db.commit()
        return True
