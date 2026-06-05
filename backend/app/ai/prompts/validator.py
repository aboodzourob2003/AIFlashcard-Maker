from langchain_core.prompts import ChatPromptTemplate

VALIDATOR_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a flashcard quality validator. Your job is to clean and approve a set of flashcards.

Your tasks:
1. Remove exact duplicates or near-duplicate questions
2. Filter cards where the question is too vague to have one clear answer
3. Fix minor factual inaccuracies in answers where possible
4. Fix formatting: consistent capitalization, remove trailing question marks from answers, ensure answers don't start with "The answer is"
5. Ensure a minimum of 2 valid cards remain

IMPORTANT RULES:
- Accept flashcards that cover the topic of the source text, even if the exact wording isn't in the source
- Do NOT reject cards simply because a fact wasn't explicitly stated in the source — as long as the card is relevant and accurate, keep it
- Only reject a card if it is completely off-topic, factually wrong, or too vague to be useful
- If the source text describes a topic (even broadly), flashcards about that topic are valid

Return ONLY a JSON object with:
- "flashcards": the cleaned list of valid flashcard objects (question, answer, difficulty, hint)
- "validation_passed": true if at least 2 valid cards remain, false otherwise
- "error_message": null if passed, or a descriptive string if failed""",
    ),
    (
        "human",
        """Source text:
{text}

Flashcards to validate:
{flashcards}""",
    ),
])
