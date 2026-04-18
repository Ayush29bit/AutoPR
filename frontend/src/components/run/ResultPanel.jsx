import { useState } from 'react'
import CodeBlock from '../ui/CodeBlock'

const TABS = [
  { key: 'plan',  label: 'Plan'  },
  { key: 'patch', label: 'Patch' },
  { key: 'tests', label: 'Tests' },
]

export default function ResultsPanel({ run }) {
  const [tab, setTab] = useState('plan')

  const content = { plan: run?.plan, patch: run?.patch, tests: run?.tests }

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border-dim" />
        <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">Results</span>
        <div className="h-px flex-1 bg-border-dim" />
      </div>

      {run?.pr_url && (
        <a
          href={run.pr_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between mb-4 px-4 py-3 rounded
                     border border-accent/40 bg-accent/10 hover:bg-accent/20
                     transition-colors duration-150 glow-accent group"
        >
          <span className="font-mono text-sm text-accent">✓ Pull Request Opened</span>
          <span className="font-mono text-xs text-ink-secondary group-hover:text-accent transition-colors">
            open on GitHub →
          </span>
        </a>
      )}

      {run?.relevant_files?.length > 0 && (
        <div className="mb-4 px-4 py-3 rounded border border-border-base bg-bg-secondary">
          <div className="font-mono text-xs text-ink-muted mb-2 tracking-widest uppercase">Files Changed</div>
          <div className="space-y-1">
            {run.relevant_files.map(f => (
              <div key={f} className="font-mono text-xs text-ink-secondary flex items-center gap-2">
                <span className="text-status-warning">~</span>{f}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-1 mb-3 border-b border-border-dim">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-mono text-xs px-4 py-2 border-b-2 transition-all duration-100 -mb-px
              ${tab === t.key
                ? 'border-accent text-accent'
                : 'border-transparent text-ink-muted hover:text-ink-secondary'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <CodeBlock code={content[tab]} label={tab} />
    </div>
  )
}