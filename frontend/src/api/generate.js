import api from './client'

export const generateFlashcards = (text, provider = 'openai') =>
  api.post('/api/generate', { text, provider }).then((r) => r.data)
