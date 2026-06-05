from pydantic import BaseModel

from app.ai.state import PipelineState
from app.ai.prompts.extractor import EXTRACTOR_PROMPT


class ConceptList(BaseModel):
    concepts: list[str]


def extract_concepts(state: PipelineState, llm) -> dict:
    chain = EXTRACTOR_PROMPT | llm.with_structured_output(ConceptList)
    result: ConceptList = chain.invoke({
        "text": state["raw_text"],
        "summary": state.get("summary", ""),
        "recommended_count": state.get("recommended_count", 10),
    })
    return {"concepts": result.concepts}
