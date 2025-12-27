from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate, UserUpdate
from typing import Optional


class UserService:
    @staticmethod
    def get_by_id(db: Session, user_id: str) -> Optional[User]:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_by_google_id(db: Session, google_id: str) -> Optional[User]:
        """Get user by Google ID"""
        return db.query(User).filter(User.google_id == google_id).first()

    @staticmethod
    def create(db: Session, user_data: UserCreate) -> User:
        """Create new user"""
        user = User(**user_data.model_dump())
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def update(db: Session, user_id: str, user_data: UserUpdate) -> Optional[User]:
        """Update user"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            return None

        update_data = user_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)

        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def delete(db: Session, user_id: str) -> bool:
        """Delete user"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            return False

        db.delete(user)
        db.commit()
        return True
