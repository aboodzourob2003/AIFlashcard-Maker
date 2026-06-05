import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import FlashCard from '../components/FlashCard'
import { getDeck } from '../api/decks'
import { startSession } from '../api/sessions'
import { useFlashcardStore } from '../store/useStore'

export default function DeckDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deck, setDeck] = useState(null)
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)
  const startSessionStore = useFlashcardStore((s) => s.startSession)

  useEffect(() => {
    getDeck(id)
      .then(setDeck)
      .catch(() => { toast.error('Deck not found'); navigate('/decks') })
      .finally(() => setLoading(false))
  }, [id])

  async function handleStartReview() {
    setStarting(true)
    try {
      const session = await startSession(id)
      startSessionStore(deck.cards, id, session.id)
      navigate('/review')
    } catch {
      toast.error('Failed to start review session')
    } finally {
      setStarting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!deck) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <button
            onClick={() => navigate('/decks')}
            className="text-sm text-slate-400 hover:text-slate-600 mb-2 flex items-center gap-1"
          >
            ← Back to Decks
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{deck.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            {deck.domain && (
              <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">
                {deck.domain}
              </span>
            )}
            <span className="text-sm text-slate-400">{deck.card_count} cards</span>
          </div>
        </div>
        <button
          onClick={handleStartReview}
          disabled={starting || deck.cards.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition disabled:opacity-50 shadow-sm"
        >
          {starting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Starting…
            </>
          ) : (
            '▶ Start Review'
          )}
        </button>
      </motion.div>

      {/* Cards grid */}
      {deck.cards.length === 0 ? (
        <div className="text-center py-16 text-slate-400">No cards in this deck.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {deck.cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <FlashCard card={card} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
