import uuid
from datetime import datetime

from pydantic import BaseModel


class SessionCreate(BaseModel):
    deck_id: uuid.UUID


class SessionCardRecord(BaseModel):
    card_id: uuid.UUID
    outcome: str  # "known" | "unknown"


class SessionOut(BaseModel):
    id: uuid.UUID
    deck_id: uuid.UUID | None
    started_at: datetime
    completed_at: datetime | None
    total_cards: int
    cards_known: int
    cards_unknown: int
    score_percentage: float | None

    model_config = {"from_attributes": True}
