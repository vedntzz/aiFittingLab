from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from schemas.draft import DraftCreate, DraftUpdate, DraftResponse, DraftListResponse
from services.draft_service import DraftService

router = APIRouter()


@router.get("/", response_model=DraftListResponse)
async def get_user_drafts(
    db: Session = Depends(get_db),
    # TODO: Get user_id from authentication
):
    """Get all drafts for current user"""
    # Mock user_id for now
    user_id = "user-1"
    drafts = DraftService.get_user_drafts(db, user_id)
    return DraftListResponse(items=drafts, total=len(drafts))


@router.get("/{draft_id}", response_model=DraftResponse)
async def get_draft(
    draft_id: str,
    db: Session = Depends(get_db),
):
    """Get draft by ID"""
    draft = DraftService.get_by_id(db, draft_id)
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found",
        )
    return draft


@router.post("/", response_model=DraftResponse, status_code=status.HTTP_201_CREATED)
async def create_draft(
    draft_create: DraftCreate,
    db: Session = Depends(get_db),
    # TODO: Get user_id from authentication
):
    """Create new draft"""
    # Mock user_id for now
    user_id = "user-1"
    draft = DraftService.create(db, user_id, draft_create)
    return draft


@router.put("/{draft_id}", response_model=DraftResponse)
async def update_draft(
    draft_id: str,
    draft_update: DraftUpdate,
    db: Session = Depends(get_db),
    # TODO: Add authentication - verify user owns the draft
):
    """Update draft"""
    draft = DraftService.update(db, draft_id, draft_update)
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found",
        )
    return draft


@router.delete("/{draft_id}")
async def delete_draft(
    draft_id: str,
    db: Session = Depends(get_db),
    # TODO: Add authentication - verify user owns the draft
):
    """Delete draft"""
    success = DraftService.delete(db, draft_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found",
        )
    return {"message": "Draft deleted successfully"}
