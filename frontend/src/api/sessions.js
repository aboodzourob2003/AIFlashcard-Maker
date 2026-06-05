import api from './client'

export const startSession = (deckId) =>
  api.post('/api/sessions', { deck_id: deckId }).then((r) => r.data)

export const recordCard = (sessionId, cardId, outcome) =>
  api.post(`/api/sessions/${sessionId}/cards`, { card_id: cardId, outcome }).then((r) => r.data)

export const completeSession = (sessionId) =>
  api.patch(`/api/sessions/${sessionId}/complete`).then((r) => r.data)
