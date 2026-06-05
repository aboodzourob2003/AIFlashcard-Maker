import json
from typing import Optional

from pydantic import BaseModel

from app.ai.state import PipelineState
from app.ai.prompts.validator import VALIDATOR_PROMPT


class FlashcardRaw(BaseModel):
    question: str
    answer: str
    difficulty: str = "medium"
    hint: Optional[str] = None


class ValidationOutput(BaseModel):
    flashcards: list[FlashcardRaw]
    validation_passed: bool
    error_message: Optional[str] = None


def validate_flashcards(state: PipelineState, llm) -> dict:
    cards_json = json.dumps(state.get("flashcards", []), indent=2)
    chain = VALIDATOR_PROMPT | llm.with_structured_output(ValidationOutput)
    result: ValidationOutput = chain.invoke({
        "text": state["raw_text"],
        "flashcards": cards_json,
    })

    valid_difficulties = {"easy", "medium", "hard"}
    cleaned = []
    for card in result.flashcards:
        diff = card.difficulty if card.difficulty in valid_difficulties else "medium"
        cleaned.append({
            "question": card.question,
            "answer": card.answer,
            "difficulty": diff,
            "hint": card.hint,
        })

    return {
        "flashcards": cleaned,
        "validation_passed": result.validation_passed and len(cleaned) >= 2,
        "error_message": result.error_message if not result.validation_passed else None,
    }
