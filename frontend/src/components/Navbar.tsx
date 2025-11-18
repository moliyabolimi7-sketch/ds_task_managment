import { BellIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../hooks/useTheme'
import { NotificationDropdown } from './NotificationDropdown'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur">
      <div>
        <p className="text-xs uppercase text-slate-400">Overview</p>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Welcome back 👋</h2>
      </div>
      <div className="flex items-center gap-4">
        <NotificationDropdown>
          <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white">
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>
        </NotificationDropdown>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white"
        >
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </div>
    </header>
  )
}
