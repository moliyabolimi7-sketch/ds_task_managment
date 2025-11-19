import React from 'react'
import {
  ArrowUpRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface TimelineItem {
  title: string
  description: string
  time: string
  badge: string
  tone?: 'emerald' | 'amber' | 'sky' | 'rose'
}

interface Performer {
  name: string
  role: string
  score: number
  trend: string
}

interface Action {
  title: string
  description: string
  cta: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const ExperienceHero = ({
  stats,
  nextReview
}: {
  stats: { total: number; completed: number; pending: number; score: number }
  nextReview?: string
}) => {
  const completion = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0
  const focus = Math.max(0, 100 - stats.pending * 5)

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-600 via-violet-600 to-rose-500 text-white p-8 shadow-2xl">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_45%)]" />
      <div className="relative grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">TaskFlow Luxury Workspace</p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Strategiyani tezlashtiring va barcha rollar uchun premium nazorat panelini oching
          </h1>
          <p className="text-white/80 max-w-2xl">
            Telegram tasdiqlari, real-time chat va Sheets eksportlari yagona joyda. KPI ustidan nazoratni boyitilgan vizuallar,
            ball tizimi va qayta topshirish sikllari bilan oshiring.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-white/20 text-sm backdrop-blur">{stats.total} ta vazifa kuzatuvda</span>
            <span className="px-4 py-2 rounded-full bg-white/20 text-sm backdrop-blur">Score: {stats.score}</span>
            {nextReview && <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Keyingi nazorat: {nextReview}</span>}
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Tugallanish</span>
              <span>{completion}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/20">
              <span className="block h-full rounded-full bg-white" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-white/15 rounded-3xl p-6 backdrop-blur border border-white/30 flex flex-col gap-5">
          <div>
            <p className="text-sm text-white/70">Premium signal</p>
            <p className="text-4xl font-semibold flex items-center gap-1">
              {focus}%
              <ArrowUpRightIcon className="w-6 h-6" />
            </p>
            <p className="text-xs text-white/70">Monitoring intensivligi</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">VIP Nizom</p>
                <p className="text-xs text-white/70">Telegram approve + Sheets export</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Realtime Review</p>
                <p className="text-xs text-white/70">Chat + fayl almashish</p>
              </div>
            </div>
          </div>
          <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-brand-600 font-semibold py-3">
            Komanda panelini ochish
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const QuickActions = ({ actions }: { actions: Action[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => (
        <div key={action.title} className="p-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
            <action.icon className="w-5 h-5" />
          </div>
          <h4 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{action.title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
          <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            {action.cta}
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export const ActivityTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">Jarayon oqimi</p>
          <h3 className="text-lg font-semibold">Live timeline</h3>
        </div>
        <ClockIcon className="w-5 h-5 text-slate-400" />
      </div>
      <div className="mt-6 space-y-6">
        {items.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className={`w-3 h-3 rounded-full ${timelineTone(item.tone)}`}></span>
              {idx !== items.length - 1 && <span className="flex-1 w-px bg-slate-100 dark:bg-slate-800"></span>}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.badge}
                </span>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const timelineTone = (tone?: TimelineItem['tone']) => {
  switch (tone) {
    case 'emerald':
      return 'bg-emerald-400'
    case 'amber':
      return 'bg-amber-400'
    case 'rose':
      return 'bg-rose-400'
    default:
      return 'bg-sky-400'
  }
}

export const TopPerformers = ({ performers }: { performers: Performer[] }) => {
  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">Top talent</p>
          <h3 className="text-lg font-semibold">Ball reytingi</h3>
        </div>
        <StarIcon className="w-5 h-5 text-amber-400" />
      </div>
      <div className="mt-6 space-y-5">
        {performers.map((performer) => (
          <div key={performer.name} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-semibold">
              {performer.name
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{performer.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{performer.role}</p>
                </div>
                <p className="text-sm font-semibold">{performer.score}</p>
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-rose-500"
                  style={{ width: `${Math.min(performer.score / 12, 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-emerald-500">{performer.trend} this week</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const defaultActions: Action[] = [
  {
    title: 'Instant briefing',
    description: 'Direktor va ta’sischiga push/Telegram xulosa yuboring',
    cta: 'Brief yaratish',
    icon: PaperAirplaneIcon
  },
  {
    title: 'VIP task review',
    description: 'Pending review vazifalarini premium sharh bilan yopish',
    cta: 'Review paneli',
    icon: BoltIcon
  },
  {
    title: 'Sheets eksporti',
    description: 'Google Sheets bilan birlashtirilgan to‘liq hisobot',
    cta: 'Eksportni yaratish',
    icon: SparklesIcon
  }
]
