from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from core.database import get_db
from schemas.post import PostCreate, PostUpdate, PostResponse, PostListResponse
from services.post_service import PostService
from typing import Optional

router = APIRouter()


@router.get("/", response_model=PostListResponse)
async def get_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Get all posts with pagination"""
    skip = (page - 1) * page_size
    posts, total = PostService.get_all(db, skip=skip, limit=page_size, user_id=user_id)

    return PostListResponse(
        items=posts,
        page=page,
        page_size=page_size,
        total=total,
        has_more=skip + len(posts) < total,
    )


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(
    post_id: str,
    db: Session = Depends(get_db),
):
    """Get post by ID"""
    post = PostService.get_by_id(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_create: PostCreate,
    db: Session = Depends(get_db),
    # TODO: Get user_id from authentication
):
    """Create new post"""
    # Mock user_id for now
    user_id = "user-1"
    post = PostService.create(db, user_id, post_create)
    return post


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: str,
    post_update: PostUpdate,
    db: Session = Depends(get_db),
    # TODO: Add authentication - verify user owns the post
):
    """Update post"""
    post = PostService.update(db, post_id, post_update)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


@router.delete("/{post_id}")
async def delete_post(
    post_id: str,
    db: Session = Depends(get_db),
    # TODO: Add authentication - verify user owns the post
):
    """Delete post"""
    success = PostService.delete(db, post_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return {"message": "Post deleted successfully"}


@router.post("/{post_id}/like", response_model=PostResponse)
async def like_post(
    post_id: str,
    db: Session = Depends(get_db),
):
    """Like a post"""
    post = PostService.like_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


@router.post("/{post_id}/save", response_model=PostResponse)
async def save_post(
    post_id: str,
    db: Session = Depends(get_db),
):
    """Save a post"""
    post = PostService.save_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post
