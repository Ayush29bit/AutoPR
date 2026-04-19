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
    <div className="mt-8 flex flex-col gap-4 animate-fade-in">

      {/* pr link */}
      {run?.pr_url && (
        <a
          href={run.pr_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-4 py-3.5 rounded-xl
                     border border-emerald-800/50 bg-emerald-900/20
                     hover:bg-emerald-900/30 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-400 text-sm">✓</span>
            <span className="text-sm font-medium text-emerald-300">Pull request opened</span>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
            Open on GitHub →
          </span>
        </a>
      )}

      {/* files changed */}
      {run?.relevant_files?.length > 0 && (
        <div className="px-4 py-3 rounded-xl border border-gray-800 bg-gray-900">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2.5">
            Files changed
          </div>
          <div className="flex flex-col gap-1">
            {run.relevant_files.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="text-yellow-600">M</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* tabs */}
      <div>
        <div className="flex gap-1 mb-3 border-b border-gray-800">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm transition-all duration-100 -mb-px border-b-2
                ${tab === t.key
                  ? 'border-blue-500 text-gray-100 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CodeBlock code={content[tab]} label={tab} />
      </div>

    </div>
  )
}