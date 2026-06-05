from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

from app.config import settings


def get_llm(provider: str | None = None):
    p = (provider or settings.default_provider).lower()
    if p == "anthropic":
        return ChatAnthropic(
            model="claude-sonnet-4-5",
            anthropic_api_key=settings.anthropic_api_key,
            temperature=0.2,
            max_tokens=4096,
        )
    return ChatOpenAI(
        model="gpt-4o",
        openai_api_key=settings.openai_api_key,
        temperature=0.2,
        max_tokens=4096,
    )
