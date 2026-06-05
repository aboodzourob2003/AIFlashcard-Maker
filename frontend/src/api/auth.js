import api from './client'

export const register = (email, password, fullName) =>
  api.post('/api/auth/register', { email, password, full_name: fullName }).then((r) => r.data)

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password }).then((r) => r.data)

export const getMe = () => api.get('/api/auth/me').then((r) => r.data)
