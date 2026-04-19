import { useState, useEffect } from 'react'
import { SPINNER_FRAMES } from '../../utils'

export default function Spinner({ className = '' }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % SPINNER_FRAMES.length), 80)
    return () => clearInterval(iv)
  }, [])
  return (
    <span className={`font-mono text-blue-400 ${className}`}>
      {SPINNER_FRAMES[frame]}
    </span>
  )
}