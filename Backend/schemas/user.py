from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    name: str
    username: Optional[str] = None
    bio: Optional[str] = None


class UserCreate(UserBase):
    google_id: Optional[str] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None


class UserResponse(UserBase):
    id: str
    image: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class UserProfile(UserResponse):
    posts_count: int = 0
    drafts_count: int = 0
