import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import FlashCard from '../components/FlashCard'
import { useFlashcardStore } from '../store/useStore'
import { createDeck } from '../api/decks'

export default function Cards() {
  const navigate = useNavigate()
  const { generatedCards, generationMeta, startSession } = useFlashcardStore()
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [deckName, setDeckName] = useState('')
  const [saving, setSaving] = useState(false)

  if (!generatedCards || generatedCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">No flashcards yet</h2>
        <p className="text-slate-400 mb-6">Go to the home page and generate flashcards from your study material.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition">
          Generate Flashcards
        </button>
      </div>
    )
  }

  async function handleSaveDeck() {
    if (!deckName.trim()) return
    setSaving(true)
    try {
      await createDeck({
        name: deckName.trim(),
        domain: generationMeta?.domain,
        cards: generatedCards.map((c) => ({
          question: c.question,
          answer: c.answer,
          difficulty: c.difficulty,
          hint: c.hint || null,
        })),
      })
      toast.success(`Deck "${deckName}" saved!`)
      setShowSaveDialog(false)
      setDeckName('')
    } catch {
      toast.error('Failed to save deck')
    } finally {
      setSaving(false)
    }
  }

  function handleStartReview() {
    startSession(generatedCards, null, null)
    navigate('/review')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {generatedCards.length} Flashcards Generated
          </h1>
          {generationMeta?.domain && (
            <p className="text-sm text-slate-500 mt-0.5">
              Domain: <span className="font-medium text-brand-600">{generationMeta.domain}</span>
              {generationMeta.processing_time_ms && (
                <span className="ml-2 text-slate-400">· {(generationMeta.processing_time_ms / 1000).toFixed(1)}s</span>
              )}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 border border-brand-300 text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition text-sm"
          >
            💾 Save as Deck
          </button>
          <button
            onClick={handleStartReview}
            className="px-4 py-2 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition text-sm shadow-sm"
          >
            ▶ Start Review
          </button>
        </div>
      </motion.div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {generatedCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <FlashCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Save dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowSaveDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Save as Deck</h3>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveDeck()}
                placeholder="e.g., Biology Chapter 5"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDeck}
                  disabled={!deckName.trim() || saving}
                  className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition disabled:opacity-50 text-sm"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
