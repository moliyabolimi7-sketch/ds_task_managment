import { useState } from 'react'

export const Settings = () => {
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark'>('light')
  const [botToken, setBotToken] = useState('')

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Tizim sozlamalari</h1>
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Default tema</p>
          <select
            value={defaultTheme}
            onChange={(e) => setDefaultTheme(e.target.value as 'light' | 'dark')}
            className="mt-1 w-full rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Telegram bot token</p>
          <input
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2"
          />
        </div>
        <button className="px-5 py-2 rounded-full bg-brand-600 text-white">Saqlash</button>
      </div>
    </div>
  )
}
