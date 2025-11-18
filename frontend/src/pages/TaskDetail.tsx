import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClient } from '../store/useAuth'
import { Task } from '../types'
import { ChatBox } from '../components/ChatBox'
import { FileUploader } from '../components/FileUploader'
import { Timer } from '../components/Timer'

export const TaskDetail = () => {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    if (!id) return
    apiClient()
      .get(`/tasks/${id}`)
      .then(({ data }) => setTask(data))
  }, [id])

  const uploadFile = async (file: File) => {
    if (!id) return
    const formData = new FormData()
    formData.append('upload', file)
    await apiClient().post(`/tasks/${id}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  if (!task) return <p>Yuklanmoqda...</p>

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <p className="text-xs uppercase text-slate-400">Kategoriya: {task.category ?? 'General'}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{task.title}</h1>
            {task.due_time && <Timer due={task.due_time} />}
          </div>
          <p className="text-slate-600 dark:text-slate-300">{task.description}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">Status: {task.status}</span>
            {task.due_time && <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700">Due: {new Date(task.due_time).toLocaleString()}</span>}
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Ball: {task.score}</span>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 h-[420px]">
          <h2 className="text-lg font-semibold mb-3">Real-time Chat</h2>
          <ChatBox taskId={Number(id)} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Fayl almashish</h3>
          <FileUploader onUpload={uploadFile} />
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Redo / Izoh</h3>
          <textarea className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 p-4" rows={4} placeholder="Qayta topshirish izohi..."></textarea>
          <button className="mt-3 w-full rounded-2xl bg-rose-500 text-white py-2">Qayta topshirish</button>
        </div>
      </div>
    </div>
  )
}
