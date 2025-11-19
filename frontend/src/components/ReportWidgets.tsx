import { ChartBarIcon, ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { DepartmentSnapshot, ExecutiveHeadline, PerformerSnapshot, RecentActivityItem } from '../types'

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

export const ExecutiveHeadlineGrid = ({ headline }: { headline: ExecutiveHeadline }) => {
  const cards = [
    {
      label: 'Barcha vazifalar',
      value: headline.total_tasks,
      helper: `${headline.score_volume} premium ball`,
      accent: 'from-brand-500/10 via-brand-500/5 to-white dark:to-slate-900'
    },
    {
      label: 'Tugallanish foizi',
      value: `${numberFormatter.format(headline.completion_rate)}%`,
      helper: `${headline.completed} ta yopildi`,
      accent: 'from-emerald-500/20 via-emerald-500/10 to-white dark:to-slate-900'
    },
    {
      label: 'Pending review',
      value: headline.pending_review,
      helper: `${headline.in_progress} in progress`,
      accent: 'from-amber-500/20 via-amber-500/10 to-white dark:to-slate-900'
    },
    {
      label: 'Overdue / Rejected',
      value: `${headline.overdue}/${headline.rejected}`,
      helper: 'Qayta topshirishlar',
      accent: 'from-rose-500/20 via-rose-500/10 to-white dark:to-slate-900'
    }
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-3xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br ${card.accent} p-5 shadow-sm`}
        >
          <p className="text-xs uppercase text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{card.helper}</p>
        </div>
      ))}
      <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-500 dark:text-slate-400">O'rtacha ball</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">{headline.average_score}</p>
          <p className="text-xs text-slate-400">Luxury focus</p>
        </div>
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--tw-gradient-from),var(--tw-gradient-to))] from-brand-500 via-violet-500 to-rose-500 opacity-70" />
          <div className="absolute inset-[6px] rounded-full bg-white dark:bg-slate-950 flex items-center justify-center">
            <span className="text-lg font-semibold text-slate-900 dark:text-white">{headline.completion_rate}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DepartmentHealth = ({ breakdown }: { breakdown: DepartmentSnapshot[] }) => {
  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">Bo'limlar</p>
          <h3 className="text-lg font-semibold">Premium health</h3>
        </div>
        <ChartBarIcon className="w-5 h-5 text-slate-400" />
      </div>
      <div className="mt-6 space-y-4">
        {breakdown.map((dept) => {
          const completion = dept.total ? Math.round((dept.completed / dept.total) * 100) : 0
          const active = Math.max(dept.total - dept.completed - dept.pending, 0)
          return (
            <div key={dept.department}>
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium text-slate-900 dark:text-white">{dept.department}</p>
                <span className="text-slate-500 dark:text-slate-400">{completion}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-emerald-400 via-brand-500 to-rose-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {dept.completed} done • {dept.pending} pending • {active} active
              </p>
            </div>
          )
        })}
        {!breakdown.length && (
          <p className="text-sm text-slate-400">Hali bo'limlar statistikasi mavjud emas.</p>
        )}
      </div>
    </div>
  )
}

export const PerformerBoard = ({ performers }: { performers: PerformerSnapshot[] }) => {
  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">Top talent</p>
          <h3 className="text-lg font-semibold">Luxury leaderboard</h3>
        </div>
        <SparklesIcon className="w-5 h-5 text-brand-500" />
      </div>
      <div className="mt-6 space-y-4">
        {performers.map((perf, idx) => (
          <div key={perf.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-semibold">
                {idx + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{perf.name}</p>
                <p className="text-xs text-slate-400">
                  {perf.role ?? 'Employee'} • {perf.department ?? '—'}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{perf.score} ball</p>
          </div>
        ))}
        {!performers.length && <p className="text-sm text-slate-400">Ball statistikasi hozircha mavjud emas.</p>}
      </div>
    </div>
  )
}

export const RecentActivityList = ({ items }: { items: RecentActivityItem[] }) => {
  const tone = (status: string) => {
    if (status === 'COMPLETED') return 'text-emerald-500'
    if (status === 'PENDING_REVIEW') return 'text-amber-500'
    if (status === 'REJECTED') return 'text-rose-500'
    return 'text-brand-500'
  }

  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">So'nggi faoliyat</p>
          <h3 className="text-lg font-semibold">Executive timeline</h3>
        </div>
        <ExclamationTriangleIcon className="w-5 h-5 text-slate-400" />
      </div>
      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-slate-400">
                {item.assignee} • {item.due_time ? new Date(item.due_time).toLocaleDateString() : 'Terminsiz'}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-xs font-semibold ${tone(item.status)}`}>{item.status}</p>
              <p className="text-xs text-slate-400">{item.score} ball</p>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-sm text-slate-400">Faoliyat yozuvlari topilmadi.</p>}
      </div>
    </div>
  )
}
