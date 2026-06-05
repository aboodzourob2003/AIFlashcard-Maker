import uuid
from datetime import datetime

from pydantic import BaseModel, field_validator

from app.schemas.card import CardOut


class GeneratedCard(BaseModel):
    question: str
    answer: str
    difficulty: str = "medium"
    hint: str | None = None


class DeckUpdate(BaseModel):
    name: str | None = None
    description: str | None = None

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str | None) -> str | None:
        if v is not None and not v.strip():
            raise ValueError("Deck name cannot be empty")
        return v.strip() if v else v


class DeckCreate(BaseModel):
    name: str
    description: str | None = None
    domain: str | None = None
    source_text: str | None = None
    cards: list[GeneratedCard]

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Deck name cannot be empty")
        return v.strip()


class DeckOut(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None
    domain: str | None
    card_count: int
    is_public: bool
    created_at: datetime
    updated_at: datetime
    last_session_score: float | None = None
    last_session_date: datetime | None = None

    model_config = {"from_attributes": True}


class DeckDetail(DeckOut):
    cards: list[CardOut] = []
    source_text: str | None = None
