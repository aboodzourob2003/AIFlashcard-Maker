# AI Flashcard Maker

A full-stack web application that converts any educational text into high-quality, interactive flashcards using a 4-stage LangGraph AI pipeline.

**Tech Stack:** React 18 · Vite · TailwindCSS · Framer Motion · FastAPI · PostgreSQL · LangChain · LangGraph · GPT-4o / Claude

---

## Project Structure

```
abood_graduation_project/
├── backend/          Python FastAPI backend + AI pipeline
└── frontend/         React 18 + Vite frontend
```

---

## Quick Start

### 1. Prerequisites

- Conda (Anaconda or Miniconda)
- Node.js 18+
- PostgreSQL running locally (create the `flashcard_db` database)

```sql
CREATE DATABASE flashcard_db;
```

### 2. Backend Setup (using Conda)

```bash
cd backend

# Create and activate a conda environment
conda create -n flashcard python=3.11 -y
conda activate flashcard

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env — add your OpenAI and/or Anthropic API keys:
#   OPENAI_API_KEY=sk-...
#   ANTHROPIC_API_KEY=sk-ant-...
#   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/flashcard_db

# Run database migrations
alembic upgrade head

# Start the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> **Note:** To work on the backend in future sessions, always run `conda activate flashcard` first.

API docs available at: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend

npm install

# Start the dev server
npm run dev
```

Frontend available at: http://localhost:5173

---

## Features

- **4-Stage AI Pipeline** — Analyze → Extract Concepts → Generate → Validate (LangGraph)
- **Dual LLM Support** — GPT-4o or Claude 3.5 Sonnet, selectable per request
- **3D Flashcard Flip** — Smooth rotateY animation using Framer Motion
- **Review Mode** — Know / Don't Know with progress tracking and session summary
- **Deck Management** — Save generated cards as named decks, review history
- **JWT Authentication** — Secure login/register with bcrypt-hashed passwords
- **PostgreSQL** — 6-table normalized schema with constraints and indexes

---

## AI Pipeline Architecture

```
Input Text
    ↓
[Node 1: TextAnalyzer]       → summary, domain, recommended_count
    ↓
[Node 2: ConceptExtractor]   → list of key concepts
    ↓
[Node 3: FlashcardGenerator] → question/answer pairs with difficulty
    ↓
[Node 4: QualityValidator]   → cleaned, deduplicated flashcards
    ↓
Return to API (or 422 if validation fails)
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register + get JWT |
| POST | `/api/auth/login` | Login + get JWT |
| GET | `/api/auth/me` | Current user |
| POST | `/api/generate` | Run AI pipeline |
| GET | `/api/decks` | List user's decks |
| POST | `/api/decks` | Create deck with cards |
| GET | `/api/decks/{id}` | Deck detail + cards |
| DELETE | `/api/decks/{id}` | Delete deck |
| PATCH | `/api/cards/{id}` | Update card |
| POST | `/api/sessions` | Start review session |
| POST | `/api/sessions/{id}/cards` | Record card outcome |
| PATCH | `/api/sessions/{id}/complete` | Complete session |

---

## Environment Variables

```
OPENAI_API_KEY        Your OpenAI API key
ANTHROPIC_API_KEY     Your Anthropic API key
DEFAULT_PROVIDER      openai or anthropic
DATABASE_URL          PostgreSQL connection string
JWT_SECRET            Secret key for JWT signing
JWT_EXPIRE_HOURS      Token expiry (default: 24)
```
