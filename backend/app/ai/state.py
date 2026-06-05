from typing import Optional
from typing_extensions import TypedDict

from pydantic import BaseModel


class FlashcardItem(BaseModel):
    question: str
    answer: str
    difficulty: str = "medium"
    hint: Optional[str] = None


class PipelineState(TypedDict):
    raw_text: str
    summary: Optional[str]
    domain: Optional[str]
    recommended_count: Optional[int]
    concepts: Optional[list[str]]
    flashcards: Optional[list[dict]]
    validation_passed: Optional[bool]
    error_message: Optional[str]
