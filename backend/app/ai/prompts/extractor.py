from langchain_core.prompts import ChatPromptTemplate

EXTRACTOR_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are an expert educational concept extractor for university students.

Your job is to extract key concepts that a student should know about the topic.

IMPORTANT: The user's text may be short, informal, or just hint at a topic. That is fine.
Use the topic summary to guide you — extract concepts a student would genuinely need to know about this subject, drawing on your own knowledge of the topic if the text is thin.

Focus on concepts that are:
- Expressible as clear question-answer pairs
- Specific and testable
- Important for understanding the topic at a university level

Return ONLY a JSON object with a key "concepts" containing a list of concise concept statements.""",
    ),
    (
        "human",
        """User's text:
{text}

Topic summary: {summary}

Extract {recommended_count} key concepts a student should know about this topic.""",
    ),
])
