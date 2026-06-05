import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import ProgressBar from '../components/ProgressBar'
import { useFlashcardStore } from '../store/useStore'
import { recordCard, completeSession } from '../api/sessions'

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
}

function ReviewCard({ card, onFlip, isFlipped }) {
  return (
    <div className="perspective w-full max-w-2xl mx-auto cursor-pointer h-64 sm:h-80" onClick={onFlip}>
      <div className={`card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="card-face absolute inset-0 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Question</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_STYLES[card.difficulty] || DIFFICULTY_STYLES.medium}`}>
              {card.difficulty}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-900 font-semibold text-center leading-relaxed text-lg">{card.question}</p>
          </div>
          <p className="text-xs text-slate-300 text-center">Tap card to reveal answer</p>
        </div>
        {/* Back */}
        <div className="card-face card-back absolute inset-0 bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl shadow-xl flex flex-col p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Answer</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white">{card.difficulty}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white font-semibold text-center leading-relaxed text-lg">{card.answer}</p>
          </div>
          {card.hint && <p className="text-xs text-indigo-200 text-center mt-2 italic">💡 {card.hint}</p>}
        </div>
      </div>
    </div>
  )
}

export default function Review() {
  const navigate = useNavigate()
  const {
    sessionCards, sessionDeckId, sessionId,
    currentIndex, knownIndices, unknownIndices,
    markCard, nextCard, startSession,
  } = useFlashcardStore()

  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(1)
  const [showSummary, setShowSummary] = useState(false)
  const [completing, setCompleting] = useState(false)

  const card = sessionCards[currentIndex]
  const total = sessionCards.length
  const reviewed = knownIndices.size + unknownIndices.size

  useEffect(() => {
    setIsFlipped(false)
  }, [currentIndex])

  if (!sessionCards || sessionCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">📖</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">No active review session</h2>
        <p className="text-slate-400 mb-6">Generate flashcards or open a deck to start reviewing.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition">
          Go Home
        </button>
      </div>
    )
  }

  async function handleMark(outcome) {
    setDirection(outcome === 'known' ? 1 : -1)
    markCard(currentIndex, outcome)

    // Only record to API when we have a real server session and a real card id
    if (sessionId && card.id) {
      try { await recordCard(sessionId, card.id, outcome) } catch (_) {}
    }

    if (currentIndex + 1 >= total) {
      await handleComplete()
    } else {
      nextCard()
    }
  }

  async function handleComplete() {
    setCompleting(true)
    if (sessionId) {
      try { await completeSession(sessionId) } catch (_) {}
    }
    setCompleting(false)
    setShowSummary(true)
  }

  function handleReviewUnknown() {
    const unknownCards = sessionCards.filter((_, i) => unknownIndices.has(i))
    if (unknownCards.length === 0) {
      toast('No unknown cards!', { icon: '🎉' })
      return
    }
    startSession(unknownCards, sessionDeckId, null)
  }

  function handleReviewAgain() {
    startSession(sessionCards, sessionDeckId, null)
    setShowSummary(false)
  }

  // Summary screen
  if (showSummary) {
        const pct = total > 0 ? Math.round((knownIndices.size / total) * 100) : 0
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-1">{pct}%</h2>
          <p className="text-slate-500 mb-6">Session complete</p>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{knownIndices.size}</div>
              <div className="text-xs text-slate-400 mt-0.5">Known</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{unknownIndices.size}</div>
              <div className="text-xs text-slate-400 mt-0.5">Unknown</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{total}</div>
              <div className="text-xs text-slate-400 mt-0.5">Total</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleReviewAgain}
              className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition"
            >
              Review Again
            </button>
            {unknownIndices.size > 0 && (
              <button
                onClick={handleReviewUnknown}
                className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
              >
                Study Unknown Cards ({unknownIndices.size})
              </button>
            )}
            <button
              onClick={() => navigate('/decks')}
              className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
            >
              Back to Decks
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
          <span>Card {currentIndex + 1} of {total}</span>
          <div className="flex items-center gap-3">
            <span>{knownIndices.size} known · {unknownIndices.size} unknown</span>
            <button
              onClick={() => navigate(-1)}
              className="text-xs text-slate-400 hover:text-red-400 hover:bg-red-50 px-2 py-1 rounded-lg transition font-medium"
              title="Exit review"
            >
              ✕ Exit
            </button>
          </div>
        </div>
        <ProgressBar value={reviewed} total={total} />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: direction * 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <ReviewCard card={card} isFlipped={isFlipped} onFlip={() => setIsFlipped((f) => !f)} />
        </motion.div>
      </AnimatePresence>

      {/* Action buttons — appear after flip */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-4 mt-8"
          >
            <button
              onClick={() => handleMark('unknown')}
              disabled={completing}
              className="flex-1 py-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-bold rounded-2xl transition text-lg disabled:opacity-50"
            >
              ✗ Don't Know
            </button>
            <button
              onClick={() => handleMark('known')}
              disabled={completing}
              className="flex-1 py-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-600 font-bold rounded-2xl transition text-lg disabled:opacity-50"
            >
              ✓ I Know It
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
