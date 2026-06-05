import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.card import Card
from app.models.deck import Deck
from app.models.review_session import ReviewSession
from app.models.review_session_card import ReviewSessionCard
from app.models.user import User
from app.schemas.session import SessionCardRecord, SessionCreate, SessionOut
from app.utils.deps import get_current_user

router = APIRouter()


def _get_session_or_404(session_id: uuid.UUID, user_id: uuid.UUID, db: Session) -> ReviewSession:
    session = db.query(ReviewSession).filter(
        ReviewSession.id == session_id, ReviewSession.user_id == user_id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("", response_model=SessionOut, status_code=status.HTTP_201_CREATED)
def start_session(
    body: SessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = db.query(Deck).filter(Deck.id == body.deck_id, Deck.user_id == current_user.id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    active_count = db.query(Card).filter(Card.deck_id == deck.id, Card.is_active == True).count()
    session = ReviewSession(
        user_id=current_user.id,
        deck_id=deck.id,
        total_cards=active_count,
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.post("/{session_id}/cards", status_code=status.HTTP_201_CREATED)
def record_card(
    session_id: uuid.UUID,
    body: SessionCardRecord,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if body.outcome not in ("known", "unknown"):
        raise HTTPException(status_code=400, detail="outcome must be 'known' or 'unknown'")

    session = _get_session_or_404(session_id, current_user.id, db)
    if session.completed_at:
        raise HTTPException(status_code=400, detail="Session already completed")

    existing = db.query(ReviewSessionCard).filter(
        ReviewSessionCard.session_id == session_id,
        ReviewSessionCard.card_id == body.card_id,
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Card already recorded in this session")

    rsc = ReviewSessionCard(
        session_id=session_id,
        card_id=body.card_id,
        outcome=body.outcome,
    )
    db.add(rsc)

    if body.outcome == "known":
        session.cards_known += 1
    else:
        session.cards_unknown += 1

    db.commit()
    return {"status": "recorded"}


@router.patch("/{session_id}/complete", response_model=SessionOut)
def complete_session(
    session_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = _get_session_or_404(session_id, current_user.id, db)
    if session.completed_at:
        return session

    session.completed_at = datetime.now(timezone.utc)
    if session.total_cards > 0:
        session.score_percentage = round(session.cards_known / session.total_cards * 100, 2)
    else:
        session.score_percentage = 0

    db.commit()
    db.refresh(session)
    return session


@router.get("", response_model=list[SessionOut])
def list_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sessions = (
        db.query(ReviewSession)
        .filter(ReviewSession.user_id == current_user.id)
        .order_by(ReviewSession.started_at.desc())
        .limit(50)
        .all()
    )
    return sessions
