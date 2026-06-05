import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class CardOut(BaseModel):
    id: uuid.UUID
    deck_id: uuid.UUID
    question: str
    answer: str
    difficulty: Literal["easy", "medium", "hard"]
    position: int
    is_active: bool
    hint: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class CardUpdate(BaseModel):
    is_active: bool | None = None
    hint: str | None = None
