import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.card import Card
from app.models.deck import Deck
from app.models.review_session import ReviewSession
from app.models.user import User
from app.schemas.deck import DeckCreate, DeckDetail, DeckOut, DeckUpdate
from app.utils.deps import get_current_user

router = APIRouter()


def _get_deck_or_404(deck_id: uuid.UUID, user_id: uuid.UUID, db: Session) -> Deck:
    deck = db.query(Deck).filter(
        Deck.id == deck_id, Deck.user_id == user_id, Deck.is_deleted == False
    ).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    return deck


def _attach_session_info(deck: Deck, db: Session) -> DeckOut:
    last_session = (
        db.query(ReviewSession)
        .filter(ReviewSession.deck_id == deck.id, ReviewSession.completed_at.isnot(None))
        .order_by(desc(ReviewSession.completed_at))
        .first()
    )
    out = DeckOut.model_validate(deck)
    if last_session:
        out.last_session_score = float(last_session.score_percentage) if last_session.score_percentage else None
        out.last_session_date = last_session.completed_at
    return out


@router.get("", response_model=list[DeckOut])
def list_decks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    decks = (
        db.query(Deck)
        .filter(Deck.user_id == current_user.id, Deck.is_deleted == False)
        .order_by(desc(Deck.created_at))
        .all()
    )
    return [_attach_session_info(d, db) for d in decks]


@router.post("", response_model=DeckOut, status_code=status.HTTP_201_CREATED)
def create_deck(
    body: DeckCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = Deck(
        user_id=current_user.id,
        name=body.name,
        description=body.description,
        domain=body.domain,
        source_text=body.source_text,
        card_count=len(body.cards),
    )
    db.add(deck)
    db.flush()

    for i, card_data in enumerate(body.cards, start=1):
        diff = card_data.difficulty if card_data.difficulty in ("easy", "medium", "hard") else "medium"
        card = Card(
            deck_id=deck.id,
            question=card_data.question,
            answer=card_data.answer,
            difficulty=diff,
            position=i,
            hint=card_data.hint,
        )
        db.add(card)

    db.commit()
    db.refresh(deck)
    return _attach_session_info(deck, db)


@router.get("/{deck_id}", response_model=DeckDetail)
def get_deck(
    deck_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = _get_deck_or_404(deck_id, current_user.id, db)
    active_cards = [c for c in deck.cards if c.is_active]
    base = _attach_session_info(deck, db)
    return DeckDetail(
        **base.model_dump(),
        cards=active_cards,
        source_text=deck.source_text,
    )


@router.patch("/{deck_id}", response_model=DeckOut)
def update_deck(
    deck_id: uuid.UUID,
    body: DeckUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = _get_deck_or_404(deck_id, current_user.id, db)
    if body.name is not None:
        deck.name = body.name
    if body.description is not None:
        deck.description = body.description
    db.commit()
    db.refresh(deck)
    return _attach_session_info(deck, db)


@router.delete("/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deck(
    deck_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = _get_deck_or_404(deck_id, current_user.id, db)
    deck.is_deleted = True          # soft delete — data is preserved
    db.commit()
