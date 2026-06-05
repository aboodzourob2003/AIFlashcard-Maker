import { useState } from 'react'
import { motion } from 'framer-motion'

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
}

export default function FlashCard({ card, size = 'normal' }) {
  const [flipped, setFlipped] = useState(false)

  const heightClass = size === 'large' ? 'h-72 sm:h-80' : 'h-52'

  return (
    <div
      className={`perspective w-full cursor-pointer select-none ${heightClass}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={flipped ? 'Show question' : 'Show answer'}
    >
      <div className={`card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front — Question */}
        <div className="card-face absolute inset-0 bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Question</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[card.difficulty] || DIFFICULTY_STYLES.medium}`}>
              {card.difficulty}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-800 font-medium text-center leading-relaxed text-sm sm:text-base">
              {card.question}
            </p>
          </div>
          <p className="text-xs text-slate-300 text-center mt-2">Click to reveal answer</p>
        </div>

        {/* Back — Answer */}
        <div className="card-face card-back absolute inset-0 bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl shadow-md flex flex-col p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Answer</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white`}>
              {card.difficulty}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white font-medium text-center leading-relaxed text-sm sm:text-base">
              {card.answer}
            </p>
          </div>
          {card.hint && (
            <p className="text-xs text-indigo-200 text-center mt-2 italic">💡 {card.hint}</p>
          )}
          <p className="text-xs text-indigo-300 text-center mt-2">Click to see question</p>
        </div>
      </div>
    </div>
  )
}
