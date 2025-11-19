import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from '../types'
import { apiClient } from '../store/useAuth'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

interface Props {
  taskId: number
}

export const ChatBox = ({ taskId }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    apiClient()
      .get(`/tasks/${taskId}/chat`)
      .then(({ data }) => setMessages(data))
  }, [taskId])

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws/tasks/${taskId}`)
    wsRef.current = ws
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prev) => [...prev, message])
    }
    return () => ws.close()
  }, [taskId])

  const sendMessage = async () => {
    if (!text.trim()) return
    await apiClient().post(`/tasks/${taskId}/chat`, { content: text })
    setText('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
        {messages.map((msg) => (
          <div key={msg.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
            <p className="text-xs text-slate-500">{new Date(msg.created_at).toLocaleString()}</p>
            <p className="text-sm text-slate-800 dark:text-slate-100">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-900"
          placeholder="Xabar yozish..."
        />
        <button onClick={sendMessage} className="px-4 py-2 rounded-full bg-brand-600 text-white">
          Send
        </button>
      </div>
    </div>
  )
}
