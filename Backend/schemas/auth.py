from pydantic import BaseModel, EmailStr
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None
    email: Optional[str] = None


class GoogleAuthRequest(BaseModel):
    token: str  # Google ID token


class GoogleAuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict
