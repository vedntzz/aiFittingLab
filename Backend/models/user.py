from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from core.database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=True, index=True)
    image = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    google_id = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")
    drafts = relationship("Draft", back_populates="user", cascade="all, delete-orphan")
