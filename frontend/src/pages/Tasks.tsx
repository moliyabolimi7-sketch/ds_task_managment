import { useEffect, useState } from 'react'
import { TaskTable } from '../components/TaskTable'
import { apiClient } from '../store/useAuth'
import { Task } from '../types'

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    apiClient()
      .get('/tasks')
      .then(({ data }) => setTasks(data))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Vazifalar</h1>
        <button className="px-4 py-2 rounded-full bg-brand-600 text-white">Create task</button>
      </div>
      <TaskTable tasks={tasks} />
    </div>
  )
}
