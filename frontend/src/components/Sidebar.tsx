import { NavLink } from 'react-router-dom'
import { Squares2X2Icon, ChatBubbleLeftRightIcon, Cog6ToothIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { to: '/tasks', label: 'Tasks', icon: ChatBubbleLeftRightIcon },
  { to: '/reports', label: 'Reports', icon: UserGroupIcon },
  { to: '/settings', label: 'Settings', icon: Cog6ToothIcon }
]

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white/90 dark:bg-slate-900/60 backdrop-blur border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col">
      <div className="px-6 py-8">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white">TaskFlow Pro</h1>
        <p className="text-sm text-slate-500">Role aware workflow</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-500 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
