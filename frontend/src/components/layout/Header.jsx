import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'

const TITLE = 'AutoPR'

export default function Header() {
  const [displayed, setDisplayed] = useState('')
  const [online, setOnline]       = useState(null)

  // typewriter effect on mount
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      setDisplayed(TITLE.slice(0, ++i))
      if (i >= TITLE.length) clearInterval(iv)
    }, 80)
    return () => clearInterval(iv)
  }, [])

  // poll health every 30s
  useEffect(() => {
    const check = () => api.health().then(() => setOnline(true)).catch(() => setOnline(false))
    check()
    const iv = setInterval(check, 30_000)
    return () => clearInterval(iv)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 h-12 border-b border-border-dim bg-bg-secondary shrink-0">
      {/* logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <span className="font-mono font-bold text-accent text-sm tracking-widest">
          {displayed}
          <span className="animate-blink">█</span>
        </span>
        <span className="text-ink-muted font-mono text-xs">v1.0.0</span>
      </Link>

      {/* center label */}
      <span className="font-mono text-xs text-ink-muted tracking-widest uppercase hidden md:block">
        Multi-Agent Issue Resolver
      </span>

      {/* status indicator */}
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${
          online === null ? 'bg-ink-muted' :
          online          ? 'bg-status-success animate-pulse-accent' :
                            'bg-status-error'
        }`} />
        <span className="font-mono text-xs text-ink-muted">
          {online === null ? 'connecting' : online ? 'backend online' : 'backend offline'}
        </span>
      </div>
    </header>
  )
}