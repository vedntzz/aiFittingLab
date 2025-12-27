"""
Database initialization script
Run this to create all tables in the database
"""
from core.database import engine, Base
from models.user import User
from models.post import Post
from models.draft import Draft


def init_database():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created successfully!")


if __name__ == "__main__":
    init_database()
