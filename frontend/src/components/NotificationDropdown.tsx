import { PropsWithChildren, useState } from 'react'

export const NotificationDropdown = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const notifications = [
    { id: 1, text: '🆕 Yangi vazifa yuklandi' },
    { id: 2, text: '📤 Vazifa topshirildi' }
  ]

  return (
    <div className="relative">
      <div onClick={() => setOpen((prev) => !prev)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2">
          {notifications.map((item) => (
            <div key={item.id} className="text-sm text-slate-600 dark:text-slate-200">
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
