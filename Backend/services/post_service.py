from sqlalchemy.orm import Session
from models.post import Post
from schemas.post import PostCreate, PostUpdate
from typing import List, Optional


class PostService:
    @staticmethod
    def get_by_id(db: Session, post_id: str) -> Optional[Post]:
        """Get post by ID"""
        return db.query(Post).filter(Post.id == post_id).first()

    @staticmethod
    def get_all(
        db: Session, skip: int = 0, limit: int = 20, user_id: Optional[str] = None
    ) -> tuple[List[Post], int]:
        """Get all posts with pagination"""
        query = db.query(Post)

        if user_id:
            query = query.filter(Post.user_id == user_id)

        total = query.count()
        posts = query.order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

        return posts, total

    @staticmethod
    def create(db: Session, user_id: str, post_data: PostCreate) -> Post:
        """Create new post"""
        post = Post(user_id=user_id, **post_data.model_dump())
        db.add(post)
        db.commit()
        db.refresh(post)
        return post

    @staticmethod
    def update(db: Session, post_id: str, post_data: PostUpdate) -> Optional[Post]:
        """Update post"""
        post = PostService.get_by_id(db, post_id)
        if not post:
            return None

        update_data = post_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(post, field, value)

        db.commit()
        db.refresh(post)
        return post

    @staticmethod
    def delete(db: Session, post_id: str) -> bool:
        """Delete post"""
        post = PostService.get_by_id(db, post_id)
        if not post:
            return False

        db.delete(post)
        db.commit()
        return True

    @staticmethod
    def like_post(db: Session, post_id: str) -> Optional[Post]:
        """Increment likes count"""
        post = PostService.get_by_id(db, post_id)
        if not post:
            return None

        post.likes += 1
        db.commit()
        db.refresh(post)
        return post

    @staticmethod
    def save_post(db: Session, post_id: str) -> Optional[Post]:
        """Increment saves count"""
        post = PostService.get_by_id(db, post_id)
        if not post:
            return None

        post.saves += 1
        db.commit()
        db.refresh(post)
        return post
