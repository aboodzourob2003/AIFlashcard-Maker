from typing import Literal

from pydantic import BaseModel, field_validator


class GenerateRequest(BaseModel):
    text: str
    provider: Literal["openai", "anthropic"] = "openai"

    @field_validator("text")
    @classmethod
    def text_not_empty(cls, v: str) -> str:
        if len(v.strip()) < 3:
            raise ValueError("Text must be at least 3 characters")
        return v.strip()


class FlashcardItem(BaseModel):
    question: str
    answer: str
    difficulty: str = "medium"
    hint: str | None = None


class GenerateResponse(BaseModel):
    flashcards: list[FlashcardItem]
    domain: str | None
    total_cards: int
    summary: str | None
    processing_time_ms: int
