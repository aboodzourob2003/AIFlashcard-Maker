import time

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.audit_log import AuditLog
from app.models.user import User
from app.schemas.generate import FlashcardItem, GenerateRequest, GenerateResponse
from app.utils.deps import get_current_user
from app.ai.pipeline import run_pipeline

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
def generate(
    body: GenerateRequest,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    start = time.monotonic()

    try:
        result = run_pipeline(body.text, provider=body.provider)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI service error: {str(exc)}",
        )

    if not result.get("validation_passed"):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=result.get("error_message") or "Could not generate valid flashcards from this text. Try providing more detailed content.",
        )

    elapsed_ms = int((time.monotonic() - start) * 1000)

    raw_cards = result.get("flashcards") or []
    flashcards = [
        FlashcardItem(
            question=c["question"],
            answer=c["answer"],
            difficulty=c.get("difficulty", "medium"),
            hint=c.get("hint"),
        )
        for c in raw_cards
    ]

    db.add(AuditLog(
        user_id=current_user.id,
        event_type="GENERATION_REQUESTED",
        event_data={"text_length": len(body.text), "provider": body.provider, "cards_generated": len(flashcards)},
        ip_address=request.client.host if request.client else None,
    ))
    db.commit()

    return GenerateResponse(
        flashcards=flashcards,
        domain=result.get("domain"),
        total_cards=len(flashcards),
        summary=result.get("summary"),
        processing_time_ms=elapsed_ms,
    )
