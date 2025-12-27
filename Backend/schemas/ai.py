from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from schemas.draft import Garment


class StyleParams(BaseModel):
    style: Optional[str] = None
    fit: Optional[str] = None  # 'loose', 'regular', 'tight'
    occasion: Optional[str] = None


class AIGenerationRequest(BaseModel):
    user_image: str  # Base64 or URL
    garments: List[Garment]
    style_params: Optional[StyleParams] = None


class AIGenerationResponse(BaseModel):
    image_url: str
    id: str
    processing_time: float
    success: bool = True
    message: Optional[str] = None
