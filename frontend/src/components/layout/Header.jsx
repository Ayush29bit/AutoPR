import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'

export default function Header() {
  const [online, setOnline] = useState(null)

  useEffect(() => {
    const check = () => api.health().then(() => setOnline(true)).catch(() => setOnline(false))
    check()
    const iv = setInterval(check, 30_000)
    return () => clearInterval(iv)
  }, [])

  return (
    <header className="flex items-center justify-between px-5 h-12 border-b border-gray-800/80 bg-gray-950 shrink-0">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xs">A</span>
        </div>
        <span className="font-semibold text-gray-100 text-sm tracking-tight">AutoPR</span>
        <span className="text-gray-700 text-xs font-mono">v1.0.0</span>
      </Link>

      <span className="text-xs text-gray-600 hidden md:block">
        Multi-Agent Issue Resolver
      </span>

      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
          online === null ? 'bg-gray-700' :
          online          ? 'bg-emerald-500' :
                            'bg-red-500'
        }`} />
        <span className="text-xs text-gray-600">
          {online === null ? 'connecting' : online ? 'online' : 'offline'}
        </span>
      </div>
    </header>
  )
}