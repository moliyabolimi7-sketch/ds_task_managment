import dayjs from 'dayjs'
import { Task } from '../types'
import { Link } from 'react-router-dom'

export const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className="min-w-full text-left">
        <thead className="text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Vazifa</th>
            <th className="px-4 py-3">Kim uchun</th>
            <th className="px-4 py-3">Holat</th>
            <th className="px-4 py-3">Muddat</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-4 py-3">
                <Link to={`/tasks/${task.id}`} className="font-medium text-brand-600">
                  {task.title}
                </Link>
                <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
              </td>
              <td className="px-4 py-3">
                {task.assigned_to ? `${task.assigned_to.first_name} ${task.assigned_to.last_name}` : '—'}
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800">
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3">{task.due_time ? dayjs(task.due_time).format('DD MMM, HH:mm') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
