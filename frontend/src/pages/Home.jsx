import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { generateFlashcards } from '../api/generate'
import { useFlashcardStore } from '../store/useStore'

const PROVIDER_OPTIONS = [
  { value: 'openai', label: 'GPT-4o', icon: '✦' },
  { value: 'anthropic', label: 'Claude', icon: '◆' },
]

export default function Home() {
  const [text, setText] = useState('')
  const [provider, setProvider] = useState('anthropic')
  const [loading, setLoading] = useState(false)
  const [inlineError, setInlineError] = useState('')
  const setGeneratedCards = useFlashcardStore((s) => s.setGeneratedCards)
  const navigate = useNavigate()

  async function handleGenerate(e) {
    e.preventDefault()
    if (text.trim().length < 3) {
      setInlineError('Please enter a topic or paste some text.')
      return
    }
    setInlineError('')
    setLoading(true)
    try {
      const result = await generateFlashcards(text.trim(), provider)
      setGeneratedCards(result.flashcards, {
        domain: result.domain,
        summary: result.summary,
        processing_time_ms: result.processing_time_ms,
      })
      toast.success(`Generated ${result.total_cards} flashcards!`)
      navigate('/cards')
    } catch (err) {
      if (err.response?.status === 422) {
        setInlineError('Could not generate enough valid flashcards from this text. Try pasting more detailed educational content (e.g. lecture notes, a textbook paragraph, or article excerpt).')
      } else {
        toast.error('Generation failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Turn any text into{' '}
            <span className="text-brand-600">flashcards instantly</span>
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Paste your lecture notes, textbook paragraphs, or any educational content. Our 4-step AI pipeline generates high-quality flashcards in seconds.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <form onSubmit={handleGenerate}>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setInlineError('') }}
              disabled={loading}
              rows={10}
                placeholder="Paste notes, a paragraph, an article — or just type a topic like 'photosynthesis' or 'World War 2'…"
              className="w-full px-6 py-5 text-slate-800 text-sm leading-relaxed resize-none focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
            />

            {inlineError && (
              <div className="mx-6 mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {inlineError}
              </div>
            )}

            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
              {/* Provider selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 mr-1">AI Model:</span>
                {PROVIDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setProvider(opt.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                      provider === opt.value
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Generate button */}
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <span>✦</span> Generate
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-slate-400 mt-4"
          >
            Running AI pipeline: analyzing → extracting concepts → generating → validating…
          </motion.p>
        )}

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { icon: '🔍', title: '4-Stage Pipeline', desc: 'Analyze → Extract → Generate → Validate' },
            { icon: '⚡', title: 'Under 15 Seconds', desc: 'GPT-4o or Claude processes your text' },
            { icon: '🎯', title: '4.4/5 Quality', desc: 'Rated by university students' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-semibold text-slate-800">{f.title}</div>
              <div className="text-xs text-slate-400 mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
