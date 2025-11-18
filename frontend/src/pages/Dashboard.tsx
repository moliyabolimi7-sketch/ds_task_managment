import { useEffect, useState } from 'react'
import { StatsCards } from '../components/StatsCards'
import { TaskTable } from '../components/TaskTable'
import { apiClient } from '../store/useAuth'
import { Task } from '../types'

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

  return (
    <div className="space-y-6">
      <StatsCards
        stats={[
          { title: 'Bugungi vazifalar', value: stats.total },
          { title: 'Bajarilgan', value: stats.completed, trend: '+5% oyiga' },
          { title: 'Kutilmoqda', value: stats.pending },
          { title: 'Ball', value: stats.score }
        ]}
      />
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Faol vazifalar</h3>
          <button className="text-sm text-brand-600">Yangi vazifa</button>
        </div>
        <TaskTable tasks={tasks} />
      </section>
    </div>
  )
}
