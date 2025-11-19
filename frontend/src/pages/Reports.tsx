import { useEffect, useState } from 'react'
import { DepartmentHealth, ExecutiveHeadlineGrid, PerformerBoard, RecentActivityList } from '../components/ReportWidgets'
import { apiClient } from '../store/useAuth'
import { ExecutiveOverview } from '../types'

export const Reports = () => {
  const [overview, setOverview] = useState<ExecutiveOverview | null>(null)
  const [employeeFallback, setEmployeeFallback] = useState<{ total: number; completed: number; pending: number; score: number } | null>(null)

  useEffect(() => {
    apiClient()
      .get('/reports/executive')
      .then(({ data }) => setOverview(data))
      .catch(() => {
        apiClient()
          .get('/reports/employee')
          .then(({ data }) => setEmployeeFallback(data))
      })
  }, [])

  if (!overview && !employeeFallback) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center text-slate-400">
        Premium hisobotlar yuklanmoqda...
      </div>
    )
  }

  if (!overview && employeeFallback) {
    return (
      <div className="rounded-[32px] bg-gradient-to-r from-brand-600 via-violet-600 to-rose-500 text-white p-10 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-2">Shaxsiy statistika</h2>
        <p className="text-white/80 mb-6">Direktor moduliga kirish ruxsatisiz ham premium rejimdagi shaxsiy natijalaringiz.</p>
        <div className="grid gap-4 md:grid-cols-4">
          <MetricChip label="Vazifalar" value={employeeFallback.total} />
          <MetricChip label="Bajarilgan" value={employeeFallback.completed} />
          <MetricChip label="Pending" value={employeeFallback.pending} />
          <MetricChip label="Ball" value={employeeFallback.score} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {overview && <ExecutiveHeadlineGrid headline={overview.headline} />}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <DepartmentHealth breakdown={overview?.department_breakdown ?? []} />
          <RecentActivityList items={overview?.recent_activity ?? []} />
        </div>
        <PerformerBoard performers={overview?.top_performers ?? []} />
      </div>
    </div>
  )
}

const MetricChip = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur border border-white/30">
    <p className="text-sm uppercase tracking-wide text-white/70">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
)
