import create from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

interface AuthState {
  token: string | null
  user: any | null
  setToken: (token: string | null) => void
  fetchProfile: () => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  setToken: (token) => {
    set({ token })
  },
  fetchProfile: async () => {
    const { token } = get()
    if (!token) return
    const { data } = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    set({ user: data })
  },
  logout: () => set({ token: null, user: null })
}))

export const apiClient = () => {
  const token = useAuth.getState().token
  return axios.create({
    baseURL: API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
}
