import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import DeckCard from '../components/DeckCard'
import { listDecks, deleteDeck } from '../api/decks'

export default function Decks() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // Re-fetch every time the user navigates to this page so scores are fresh
  useEffect(() => {
    setLoading(true)
    listDecks()
      .then(setDecks)
      .catch(() => toast.error('Failed to load decks'))
      .finally(() => setLoading(false))
  }, [location.key])

  async function handleDelete(id) {
    if (!confirm('Delete this deck? It will be hidden but your study history is kept.')) return
    try {
      await deleteDeck(id)
      setDecks((prev) => prev.filter((d) => d.id !== id))
      toast.success('Deck deleted')
    } catch {
      toast.error('Failed to delete deck')
    }
  }

  function handleRename(id, newName) {
    setDecks((prev) => prev.map((d) => d.id === id ? { ...d, name: newName } : d))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Decks</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition text-sm shadow-sm"
        >
          + New Deck
        </button>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗂️</div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">No decks yet</h2>
          <p className="text-slate-400 mb-6">Generate flashcards and save them as a deck.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition"
          >
            Generate Flashcards
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {decks.map((deck, i) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <DeckCard deck={deck} onDelete={handleDelete} onRename={handleRename} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
