import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../hooks/useTheme'
import { NotificationDropdown } from './NotificationDropdown'
import { useAuth } from '../store/useAuth'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const user = useAuth((state) => state.user)
  const initials = user ? `${user?.first_name?.[0] ?? ''}${user?.last_name?.[0] ?? ''}` : 'TF'

  return (
    <header className="flex flex-wrap items-center gap-4 justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur">
      <div>
        <p className="text-xs uppercase text-slate-400">Overview</p>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Welcome back 👋</h2>
      </div>
      <div className="flex-1 flex items-center gap-3 min-w-[240px] max-w-xl">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Buyruq palitrasi, vazifa yoki foydalanuvchini qidirish"
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-950/40 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60"
          />
        </div>
        <span className="hidden lg:inline-flex px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-300">
          ⌘ + K
        </span>
      </div>
      <div className="flex items-center gap-4">
        <NotificationDropdown>
          <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white">
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          </button>
        </NotificationDropdown>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white"
        >
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
        <div className="flex items-center gap-3 px-3 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="text-xs">
            <p className="font-semibold text-slate-700 dark:text-white">{user ? `${user.first_name} ${user.last_name}` : 'TaskFlow VIP'}</p>
            <p className="text-slate-500 dark:text-slate-400">{user?.role ?? 'Premium access'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
