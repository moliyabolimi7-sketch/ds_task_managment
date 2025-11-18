import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface Props {
  due: string
}

export const Timer = ({ due }: Props) => {
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    const tick = () => {
      const diff = dayjs(due).diff(dayjs(), 'second')
      const dur = dayjs.duration(diff, 'seconds')
      setRemaining(`${dur.hours()}h ${dur.minutes()}m ${dur.seconds()}s`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [due])

  return <span className="text-xs font-semibold text-brand-600">{remaining}</span>
}
