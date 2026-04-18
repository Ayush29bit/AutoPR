import { useState } from 'react'

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded border border-border-dim bg-bg-primary overflow-hidden">
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-dim bg-bg-secondary">
        <span className="font-mono text-xs text-ink-muted tracking-wider uppercase">
          {label || 'output'}
        </span>
        <button
          onClick={copy}
          className="font-mono text-xs text-ink-muted hover:text-accent transition-colors"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      {/* code */}
      <pre className="p-4 font-mono text-xs text-ink-secondary overflow-x-auto leading-relaxed whitespace-pre-wrap">
        {code || '—'}
      </pre>
    </div>
  )
}