from typing import Optional
from pydantic import BaseModel

from app.ai.state import PipelineState
from app.ai.prompts.analyzer import ANALYZER_PROMPT


class AnalysisOutput(BaseModel):
    summary: str
    domain: str
    recommended_count: int


def analyze_text(state: PipelineState, llm) -> dict:
    chain = ANALYZER_PROMPT | llm.with_structured_output(AnalysisOutput)
    result: AnalysisOutput = chain.invoke({"text": state["raw_text"]})
    count = max(3, min(20, result.recommended_count))
    return {
        "summary": result.summary,
        "domain": result.domain,
        "recommended_count": count,
    }
