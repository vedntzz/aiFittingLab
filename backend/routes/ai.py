from fastapi import APIRouter, Depends, HTTPException, status
from schemas.ai import AIGenerationRequest, AIGenerationResponse
from services.ai_service import AIService

router = APIRouter()


@router.post("/generate", response_model=AIGenerationResponse)
async def generate_outfit(
    request: AIGenerationRequest,
    # TODO: Add authentication
):
    """
    Generate AI outfit based on user image and selected garments

    This endpoint receives:
    - User's uploaded image
    - Selected garment references
    - Optional style parameters

    Returns:
    - Generated outfit image URL
    - Generation metadata
    """
    try:
        result = await AIService.generate_outfit(request)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI generation failed: {str(e)}",
        )


@router.post("/validate-image")
async def validate_image(
    image_data: str,
):
    """Validate uploaded image before processing"""
    is_valid = await AIService.validate_image(image_data)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image format or size",
        )
    return {"valid": True}
