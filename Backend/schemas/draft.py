from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class Garment(BaseModel):
    id: str
    type: str  # 'top', 'bottom', 'footwear', 'accessory'
    image_url: str
    product_url: Optional[str] = None
    name: Optional[str] = None


class DraftBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class DraftCreate(DraftBase):
    image_url: str
    garments: List[Garment] = []
    style_params: Dict[str, Any] = {}


class DraftUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    garments: Optional[List[Garment]] = None
    style_params: Optional[Dict[str, Any]] = None


class DraftResponse(DraftBase):
    id: str
    user_id: str
    image_url: str
    garments: List[Garment]
    style_params: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class DraftListResponse(BaseModel):
    items: List[DraftResponse]
    total: int
