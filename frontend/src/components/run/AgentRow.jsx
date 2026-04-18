import { useState, useEffect, useRef } from 'react'
import { blockBar, SPINNER_FRAMES } from '../../utils'
import Spinner from '../ui/Spinner'
import CodeBlock from '../ui/CodeBlock'

const AGENTS = [
  { key: 'code_reader', label: 'Code Reader',  desc: 'scanning repository'   },
  { key: 'planner',     label: 'Planner',       desc: 'planning fix strategy' },
  { key: 'code_writer', label: 'Code Writer',   desc: 'writing code changes'  },
  { key: 'test_writer', label: 'Test Writer',   desc: 'generating tests'      },
  { key: 'pr_opener',   label: 'PR Opener',     desc: 'opening pull request'  },
]

// Derive per-agent status from overall run state
function deriveAgentStatuses(run) {
  if (!run) return {}
  const order = ['code_reader','planner','code_writer','test_writer','pr_opener']
  const statuses = {}

  if (run.status === 'pending') {
    order.forEach(k => { statuses[k] = 'waiting' })
    return statuses
  }

  // mark done based on which state fields are populated
  const doneMap = {
    code_reader: !!(run.relevant_files?.length),
    planner:     !!run.plan,
    code_writer: !!run.patch,
    test_writer: !!run.tests,
    pr_opener:   run.status === 'completed',
  }

  let foundRunning = false
  for (const key of order) {
    if (doneMap[key]) {
      statuses[key] = 'done'
    } else if (!foundRunning && run.status === 'running') {
      statuses[key] = 'running'
      foundRunning = true
    } else {
      statuses[key] = 'waiting'
    }
  }

  if (run.status === 'failed') {
    const firstWaiting = order.find(k => statuses[k] === 'running' || statuses[k] === 'waiting')
    if (firstWaiting) statuses[firstWaiting] = 'failed'
  }

  return statuses
}

function AgentRow({ agent, status, run, index }) {
  const [open,      setOpen]      = useState(false)
  const [elapsed,   setElapsed]   = useState(0)
  const [progress,  setProgress]  = useState(0)
  const timerRef = useRef(null)

  // start timer when running
  useEffect(() => {
    if (status === 'running') {
      setElapsed(0)
      setProgress(0)
      timerRef.current = setInterval(() => {
        setElapsed(e => e + 1)
        setProgress(p => Math.min(p + Math.random() * 4, 92))
      }, 1000)
    } else {
      clearInterval(timerRef.current)
      if (status === 'done') setProgress(100)
    }
    return () => clearInterval(timerRef.current)
  }, [status])

  // auto-open completed agent rows
  useEffect(() => {
    if (status === 'done') setOpen(true)
  }, [status])

  const output = getOutput(agent.key, run)

  const icon = {
    waiting: <span className="text-ink-muted font-mono text-sm">○</span>,
    running: <span className="text-status-info font-mono text-sm animate-pulse-accent">◉</span>,
    done:    <span className="text-status-success font-mono text-sm">✓</span>,
    failed:  <span className="text-status-error font-mono text-sm">✗</span>,
  }[status]

  const rowColor = {
    waiting: 'border-border-dim opacity-50',
    running: 'border-status-info/40 bg-status-info/5',
    done:    'border-status-success/30',
    failed:  'border-status-error/30 bg-status-error/5',
  }[status]

  const mm = String(Math.floor(elapsed / 60)).padStart(2,'0')
  const ss = String(elapsed % 60).padStart(2,'0')

  return (
    <div
      className={`border rounded overflow-hidden transition-all duration-300 animate-slide-in ${rowColor}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* row header */}
      <button
        onClick={() => status !== 'waiting' && setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left"
      >
        {/* icon */}
        <span className="w-5 shrink-0">{icon}</span>

        {/* agent label */}
        <span className={`font-mono text-sm font-medium w-32 shrink-0 ${
          status === 'waiting' ? 'text-ink-muted' : 'text-ink-primary'
        }`}>
          {agent.label}
        </span>

        {/* progress / status text */}
        <span className="flex-1 font-mono text-xs text-ink-muted">
          {status === 'running' && (
            <span className="flex items-center gap-2">
              <Spinner />
              <span className="text-status-info">{blockBar(progress)}</span>
              <span>{agent.desc}</span>
            </span>
          )}
          {status === 'waiting' && '—'}
          {status === 'done'    && (
            <span className="text-status-success">
              {output ? 'output ready' : 'complete'}
            </span>
          )}
          {status === 'failed'  && (
            <span className="text-status-error">failed</span>
          )}
        </span>

        {/* timer */}
        {(status === 'running' || status === 'done') && (
          <span className="font-mono text-xs text-ink-muted shrink-0">
            [{mm}:{ss}]
          </span>
        )}

        {/* expand chevron */}
        {status !== 'waiting' && output && (
          <span className="font-mono text-xs text-ink-muted shrink-0">
            {open ? '▼' : '▶'}
          </span>
        )}
      </button>

      {/* expandable output */}
      {open && output && (
        <div className="border-t border-border-dim animate-fade-in">
          <CodeBlock code={output.content} label={output.label} />
        </div>
      )}
    </div>
  )
}

function getOutput(key, run) {
  if (!run) return null
  const map = {
    code_reader: run.relevant_files?.length
      ? { label: 'relevant files', content: run.relevant_files.join('\n') }
      : null,
    planner:     run.plan  ? { label: 'fix plan',  content: run.plan  } : null,
    code_writer: run.patch ? { label: 'patch',     content: run.patch } : null,
    test_writer: run.tests ? { label: 'tests',     content: run.tests } : null,
    pr_opener:   run.pr_url
      ? { label: 'pull request', content: run.pr_url }
      : null,
  }
  return map[key] || null
}

export default function AgentPanel({ run }) {
  const statuses = deriveAgentStatuses(run)
  return (
    <div className="space-y-2">
      {AGENTS.map((agent, i) => (
        <AgentRow
          key={agent.key}
          agent={agent}
          status={statuses[agent.key] || 'waiting'}
          run={run}
          index={i}
        />
      ))}
    </div>
  )
}