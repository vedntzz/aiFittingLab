from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from schemas.user import UserResponse


class PostBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = []


class PostCreate(PostBase):
    image_url: str
    is_ai_generated: bool = False


class PostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None


class PostResponse(PostBase):
    id: str
    user_id: str
    user: UserResponse
    image_url: str
    likes: int
    saves: int
    is_ai_generated: bool
    created_at: datetime

    class Config:
        from_attributes = True


class PostListResponse(BaseModel):
    items: List[PostResponse]
    page: int
    page_size: int
    total: int
    has_more: bool
