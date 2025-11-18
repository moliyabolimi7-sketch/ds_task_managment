import { useEffect, useState } from 'react'
import { apiClient } from '../store/useAuth'

export const Reports = () => {
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([])

  useEffect(() => {
    apiClient()
      .get('/reports/leaderboard')
      .then(({ data }) => setLeaderboard(data))
  }, [])

  return (
    <div className="space-y-5">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Eng yaxshi hodimlar</h2>
        <div className="space-y-3">
          {leaderboard.map((item, idx) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center font-semibold">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500">Top performer</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-brand-600">{item.score} ball</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
