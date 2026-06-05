from langgraph.graph import StateGraph, END

from app.ai.state import PipelineState
from app.ai.nodes.analyzer import analyze_text
from app.ai.nodes.extractor import extract_concepts
from app.ai.nodes.generator import generate_flashcards
from app.ai.nodes.validator import validate_flashcards
from app.ai.llm import get_llm


def build_pipeline(provider: str | None = None):
    llm = get_llm(provider)

    def node_analyze(state: PipelineState) -> dict:
        return analyze_text(state, llm)

    def node_extract(state: PipelineState) -> dict:
        return extract_concepts(state, llm)

    def node_generate(state: PipelineState) -> dict:
        return generate_flashcards(state, llm)

    def node_validate(state: PipelineState) -> dict:
        return validate_flashcards(state, llm)

    def route_after_validation(state: PipelineState) -> str:
        return "end"

    graph = StateGraph(PipelineState)
    graph.add_node("analyze", node_analyze)
    graph.add_node("extract", node_extract)
    graph.add_node("generate", node_generate)
    graph.add_node("validate", node_validate)

    graph.set_entry_point("analyze")
    graph.add_edge("analyze", "extract")
    graph.add_edge("extract", "generate")
    graph.add_edge("generate", "validate")
    graph.add_edge("validate", END)

    return graph.compile()


def run_pipeline(text: str, provider: str | None = None) -> PipelineState:
    pipeline = build_pipeline(provider)
    initial_state: PipelineState = {
        "raw_text": text,
        "summary": None,
        "domain": None,
        "recommended_count": None,
        "concepts": None,
        "flashcards": None,
        "validation_passed": None,
        "error_message": None,
    }
    result = pipeline.invoke(initial_state)
    return result
