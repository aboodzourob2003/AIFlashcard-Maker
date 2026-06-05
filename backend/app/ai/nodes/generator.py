import json
from typing import Optional

from pydantic import BaseModel

from app.ai.state import PipelineState
from app.ai.prompts.generator import GENERATOR_PROMPT


class FlashcardRaw(BaseModel):
    question: str
    answer: str
    difficulty: str = "medium"
    hint: Optional[str] = None


class FlashcardSet(BaseModel):
    flashcards: list[FlashcardRaw]


def generate_flashcards(state: PipelineState, llm) -> dict:
    concepts_text = "\n".join(f"- {c}" for c in (state.get("concepts") or []))
    chain = GENERATOR_PROMPT | llm.with_structured_output(FlashcardSet)
    result: FlashcardSet = chain.invoke({
        "text": state["raw_text"],
        "domain": state.get("domain", "General"),
        "summary": state.get("summary", ""),
        "concepts": concepts_text,
    })
    cards = [c.model_dump() for c in result.flashcards]
    return {"flashcards": cards}
