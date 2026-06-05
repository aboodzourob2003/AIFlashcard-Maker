import api from './client'

export const listDecks = () => api.get('/api/decks').then((r) => r.data)

export const createDeck = (payload) => api.post('/api/decks', payload).then((r) => r.data)

export const getDeck = (id) => api.get(`/api/decks/${id}`).then((r) => r.data)

export const deleteDeck = (id) => api.delete(`/api/decks/${id}`)

export const updateDeck = (id, data) =>
  api.patch(`/api/decks/${id}`, data).then((r) => r.data)

export const updateCard = (cardId, data) =>
  api.patch(`/api/cards/${cardId}`, data).then((r) => r.data)
