import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { updateDeck } from '../api/decks'

function ScoreBadge({ score }) {
  if (score == null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 font-medium">
        📚 Not studied yet
      </span>
    )
  }
  const pct = Math.round(score)
  const { bg, text, emoji } =
    pct >= 80
      ? { bg: 'bg-emerald-100', text: 'text-emerald-700', emoji: '🏆' }
      : pct >= 50
      ? { bg: 'bg-amber-100', text: 'text-amber-700', emoji: '📈' }
      : { bg: 'bg-red-100', text: 'text-red-600', emoji: '💪' }

  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${bg} ${text}`}>
      {emoji} Last score: {pct}%
    </span>
  )
}

export default function DeckCard({ deck, onDelete, onRename }) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(deck.name)
  const [saving, setSaving] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  async function handleRename() {
    const trimmed = nameInput.trim()
    if (!trimmed || trimmed === deck.name) {
      setNameInput(deck.name)
      setEditing(false)
      return
    }
    setSaving(true)
    try {
      const updated = await updateDeck(deck.id, { name: trimmed })
      onRename(deck.id, updated.name)
      toast.success('Deck renamed')
    } catch {
      toast.error('Failed to rename deck')
      setNameInput(deck.name)
    } finally {
      setSaving(false)
      setEditing(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleRename()
    if (e.key === 'Escape') { setNameInput(deck.name); setEditing(false) }
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={inputRef}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              disabled={saving}
              className="w-full font-semibold text-slate-900 text-base border-b-2 border-brand-400 focus:outline-none bg-transparent pb-0.5"
            />
          ) : (
            <h3
              className="font-semibold text-slate-900 text-base truncate cursor-pointer hover:text-brand-600 transition"
              title="Click to rename"
              onClick={() => setEditing(true)}
            >
              {deck.name}
            </h3>
          )}
          {deck.domain && (
            <span className="inline-block mt-1 text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">
              {deck.domain}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 text-slate-300 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition"
            title="Rename deck"
          >
            ✎
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(deck.id) }}
            className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition"
            title="Delete deck"
          >
            🗑
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">{deck.card_count} cards</span>
        <ScoreBadge score={deck.last_session_score} />
      </div>

      {/* Study button */}
      <button
        onClick={() => navigate(`/decks/${deck.id}`)}
        className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition text-sm shadow-sm"
      >
        Study Now
      </button>
    </motion.div>
  )
}
