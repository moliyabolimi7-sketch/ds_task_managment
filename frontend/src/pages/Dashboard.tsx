import { useEffect, useMemo, useState } from 'react'
import {
  ChartBarIcon,
  CheckBadgeIcon,
  FireIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { StatsCards } from '../components/StatsCards'
import { TaskTable } from '../components/TaskTable'
import { apiClient } from '../store/useAuth'
import { Task } from '../types'
import { ActivityTimeline, ExperienceHero, QuickActions, TopPerformers, defaultActions } from '../components/DashboardWidgets'

export const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, score: 0 })
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    apiClient()
      .get('/reports/employee')
      .then(({ data }) => setStats(data))
    apiClient()
      .get('/tasks')
      .then(({ data }) => setTasks(data))
  }, [])

  const timelineItems = useMemo(() => {
    if (!tasks.length) {
      return [
        {
          title: 'VIP briefing yuborildi',
          description: 'Direktor va ta’sischiga kunlik Sheets xulosasi yetkazildi',
          time: '08:00',
          badge: 'Report',
          tone: 'sky' as const
        },
        {
          title: 'Marketing sprinti yopildi',
          description: '4 ta vazifa completed, 1 ta pending review',
          time: '10:30',
          badge: 'Completed',
          tone: 'emerald' as const
        }
      ]
    }
    return tasks.slice(0, 4).map((task, index) => ({
      title: task.title,
      description: task.description,
      time: index === 0 ? 'Hozir' : `${index * 2} soat oldin`,
      badge: task.status,
      tone:
        task.status === 'Completed'
          ? 'emerald'
          : task.status === 'Pending review'
          ? 'amber'
          : task.status === 'Rejected (Redo)'
          ? 'rose'
          : 'sky'
    }))
  }, [tasks])

  const performers = useMemo(
    () => [
      { name: 'Otabek Karimov', role: 'Product Lead', score: 982, trend: '+12' },
      { name: 'Malika Sodiqova', role: 'Marketing Manager', score: 915, trend: '+8' },
      { name: 'Aziza Raximova', role: 'Data Analyst', score: 880, trend: '+5' }
    ],
    []
  )

  const enhancedStats = [
    {
      title: 'Bugungi vazifalar',
      value: stats.total,
      trend: 'Real-time sync',
      accent: 'from-brand-500/10 via-brand-500/5 to-white dark:to-slate-900',
      icon: FireIcon,
      sparkline: [4, 6, 5, 9, 12, stats.total]
    },
    {
      title: 'Bajarilgan',
      value: stats.completed,
      trend: '+5% oyiga',
      accent: 'from-emerald-500/20 via-emerald-500/10 to-white dark:to-slate-900',
      icon: ShieldCheckIcon,
      sparkline: [3, 4, 6, 8, stats.completed]
    },
    {
      title: 'Kutilmoqda',
      value: stats.pending,
      accent: 'from-amber-500/20 via-amber-500/10 to-white dark:to-slate-900',
      icon: ChartBarIcon,
      sparkline: [1, 3, 2, 5, stats.pending]
    },
    {
      title: 'Ball indeksi',
      value: stats.score,
      trend: 'VIP mode active',
      accent: 'from-rose-500/20 via-rose-500/10 to-white dark:to-slate-900',
      icon: CheckBadgeIcon,
      sparkline: [700, 720, 750, 780, stats.score]
    }
  ]

  return (
    <div className="space-y-6">
      <ExperienceHero stats={stats} nextReview="17:30" />
      <StatsCards stats={enhancedStats} />
      <QuickActions actions={defaultActions} />
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
            <div>
              <p className="text-xs uppercase text-slate-400">Faol vazifalar</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Premium task panel</h3>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-brand-500 text-white px-4 py-2 text-sm font-semibold">
              Yangi vazifa
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">+</span>
            </button>
          </div>
          <div className="p-6">
            <TaskTable tasks={tasks} />
          </div>
        </section>
        <div className="space-y-6">
          <ActivityTimeline items={timelineItems} />
          <TopPerformers performers={performers} />
        </div>
      </div>
    </div>
  )
}
