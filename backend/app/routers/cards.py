import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.card import Card
from app.models.user import User
from app.schemas.card import CardOut, CardUpdate
from app.utils.deps import get_current_user

router = APIRouter()


@router.patch("/{card_id}", response_model=CardOut)
def update_card(
    card_id: uuid.UUID,
    body: CardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    card = (
        db.query(Card)
        .join(Card.deck)
        .filter(Card.id == card_id, Card.deck.has(user_id=current_user.id))
        .first()
    )
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    if body.is_active is not None:
        card.is_active = body.is_active
        # Keep card_count in sync
        deck = card.deck
        deck.card_count = db.query(Card).filter(Card.deck_id == deck.id, Card.is_active == True).count()
    if body.hint is not None:
        card.hint = body.hint
    db.commit()
    db.refresh(card)
    return card
