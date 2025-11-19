import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { ComponentType, SVGProps } from 'react'

interface Stat {
  title: string
  value: string | number
  trend?: string
  accent?: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  sparkline?: number[]
}

const Sparkline = ({ data }: { data?: number[] }) => {
  if (!data || data.length === 0) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data
    .map((value, index) => {
      const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100
      const range = max - min || 1
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16 text-white/80 dark:text-white/60">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="drop-shadow-[0_4px_12px_rgba(15,23,42,0.2)]"
      />
    </svg>
  )
}

export const StatsCards = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`relative overflow-hidden rounded-3xl p-5 border border-white/40 dark:border-slate-800 shadow-lg bg-gradient-to-br ${
            stat.accent ?? 'from-white via-white to-white dark:from-slate-900 dark:via-slate-900'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600/80 dark:text-slate-300/80">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
            {stat.icon && (
              <span className="p-3 rounded-2xl bg-white/30 dark:bg-white/10 text-white">
                <stat.icon className="w-5 h-5" />
              </span>
            )}
          </div>
          {stat.trend && (
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
              <ArrowUpRightIcon className="w-4 h-4" />
              {stat.trend}
            </p>
          )}
          {stat.sparkline && <div className="mt-4"><Sparkline data={stat.sparkline} /></div>}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/40 blur-3xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
