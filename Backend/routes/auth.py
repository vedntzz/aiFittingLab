from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import create_access_token
from schemas.auth import GoogleAuthRequest, GoogleAuthResponse
from schemas.user import UserCreate
from services.user_service import UserService
import httpx

router = APIRouter()


@router.post("/google", response_model=GoogleAuthResponse)
async def google_auth(
    auth_request: GoogleAuthRequest,
    db: Session = Depends(get_db),
):
    """
    Authenticate user with Google OAuth

    TODO: Verify Google token with Google API
    This is a simplified version
    """
    # TODO: Verify token with Google
    # async with httpx.AsyncClient() as client:
    #     response = await client.get(
    #         f"https://oauth2.googleapis.com/tokeninfo?id_token={auth_request.token}"
    #     )
    #     if response.status_code != 200:
    #         raise HTTPException(
    #             status_code=status.HTTP_401_UNAUTHORIZED,
    #             detail="Invalid token",
    #         )
    #     user_info = response.json()

    # Mock user info (replace with actual Google response)
    user_info = {
        "sub": "google-id-123",
        "email": "user@example.com",
        "name": "Test User",
        "picture": "https://example.com/avatar.jpg",
    }

    # Check if user exists
    user = UserService.get_by_google_id(db, user_info["sub"])

    # Create user if doesn't exist
    if not user:
        user = UserService.get_by_email(db, user_info["email"])
        if not user:
            user_create = UserCreate(
                email=user_info["email"],
                name=user_info["name"],
                google_id=user_info["sub"],
            )
            user = UserService.create(db, user_create)

    # Create access token
    access_token = create_access_token(data={"sub": user.id, "email": user.email})

    return GoogleAuthResponse(
        access_token=access_token,
        user={
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "image": user.image,
        },
    )


@router.get("/me")
async def get_current_user(
    # TODO: Add authentication dependency
    db: Session = Depends(get_db),
):
    """Get current authenticated user"""
    # TODO: Implement JWT verification
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not implemented",
    )
