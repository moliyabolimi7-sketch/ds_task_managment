import { PropsWithChildren, useState } from 'react'

const notifications = [
  { id: 1, text: '🆕 Otabek uchun yangi vazifa yuklandi', time: 'Just now', badge: 'Task' },
  { id: 2, text: '📤 Malika vazifani topshirdi', time: '12 daqiqa oldin', badge: 'Review' },
  { id: 3, text: '📎 Chatga fayl yuklandi', time: '1 soat oldin', badge: 'File' }
]

export const NotificationDropdown = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <div onClick={() => setOpen((prev) => !prev)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Bildirishnomalar</span>
            <button className="text-brand-600 text-xs">Hammasi</button>
          </div>
          {notifications.map((item) => (
            <div key={item.id} className="text-sm text-slate-600 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-2xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.badge}
                </span>
                <span>{item.time}</span>
              </div>
              <p className="mt-1">{item.text}</p>
            </div>
          ))}
          <button className="w-full text-sm font-semibold text-brand-600 py-2 rounded-xl bg-brand-500/5">Notification centerga o‘tish</button>
        </div>
      )}
    </div>
  )
}
