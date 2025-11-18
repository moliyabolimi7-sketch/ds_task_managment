import { FormEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const setToken = useAuth((state) => state.setToken)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { phone, password })
      setToken(data.access_token)
      await useAuth.getState().fetchProfile()
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-500 to-slate-900">
      <form onSubmit={submit} className="bg-white/90 rounded-3xl shadow-2xl p-10 space-y-5 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900">TaskFlow Pro</h1>
        <p className="text-slate-500">Telegramdan olingan login va parol bilan tizimga kiring.</p>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <div className="space-y-1">
          <label className="text-xs uppercase text-slate-400">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
            placeholder="+998..."
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase text-slate-400">Parol</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
            placeholder="••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-brand-600 text-white font-semibold"
          disabled={loading}
        >
          {loading ? 'Yuklanmoqda...' : 'Kirish'}
        </button>
        <a
          href="https://t.me/taskflow_bot"
          target="_blank"
          className="block text-center text-sm text-brand-600"
        >
          Login & parolni Telegramdan olish
        </a>
      </form>
    </div>
  )
}
