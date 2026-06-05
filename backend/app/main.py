from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, generate, decks, cards, sessions

app = FastAPI(
    title="AI Flashcard Maker",
    description="Automatically generate flashcards from educational text using LLMs.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(decks.router, prefix="/api/decks", tags=["decks"])
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
