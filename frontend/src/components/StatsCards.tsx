interface Stat {
  title: string
  value: string | number
  trend?: string
}

export const StatsCards = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500">{stat.title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          {stat.trend && <p className="text-xs text-emerald-500">{stat.trend}</p>}
        </div>
      ))}
    </div>
  )
}
