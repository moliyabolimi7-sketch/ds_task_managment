import { useEffect, useState } from 'react'
import { apiClient } from '../store/useAuth'

interface User {
  id: number
  first_name: string
  last_name: string
  role: string
  phone: string
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    apiClient()
      .get('/users')
      .then(({ data }) => setUsers(data))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Foydalanuvchilar</h1>
        <button className="px-4 py-2 rounded-full bg-brand-600 text-white">Yangi user</button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/40 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Ism familya</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Telefon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">{user.first_name} {user.last_name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{user.role}</span>
                </td>
                <td className="px-4 py-3">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
