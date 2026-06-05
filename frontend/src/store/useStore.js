import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' }
  )
)

export const useFlashcardStore = create((set) => ({
  generatedCards: [],
  generationMeta: null,   // { domain, summary, processing_time_ms }
  setGeneratedCards: (cards, meta) => set({ generatedCards: cards, generationMeta: meta }),
  clearGenerated: () => set({ generatedCards: [], generationMeta: null }),

  // Review session state
  sessionCards: [],
  sessionDeckId: null,
  sessionId: null,
  currentIndex: 0,
  knownIndices: new Set(),
  unknownIndices: new Set(),
  startSession: (cards, deckId, sessionId) =>
    set({ sessionCards: cards, sessionDeckId: deckId, sessionId, currentIndex: 0, knownIndices: new Set(), unknownIndices: new Set() }),
  markCard: (index, outcome) =>
    set((state) => {
      const knownIndices = new Set(state.knownIndices)
      const unknownIndices = new Set(state.unknownIndices)
      if (outcome === 'known') { knownIndices.add(index); unknownIndices.delete(index) }
      else { unknownIndices.add(index); knownIndices.delete(index) }
      return { knownIndices, unknownIndices }
    }),
  nextCard: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  resetSession: () => set({ currentIndex: 0, knownIndices: new Set(), unknownIndices: new Set() }),
}))
