from sqlalchemy import Column, String, DateTime, Text, Integer, Boolean, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from core.database import Base
import uuid


class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    image_url = Column(String, nullable=False)
    title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    tags = Column(ARRAY(String), default=[])
    likes = Column(Integer, default=0)
    saves = Column(Integer, default=0)
    is_ai_generated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="posts")
