import { useState, useEffect, useRef } from 'react'
import { blockBar, SPINNER_FRAMES } from '../../utils'
import Spinner from '../ui/Spinner'
import CodeBlock from '../ui/CodeBlock'

const AGENTS = [
  { key: 'code_reader', label: 'Code Reader',  desc: 'Scanning repository'   },
  { key: 'planner',     label: 'Planner',       desc: 'Planning fix strategy' },
  { key: 'code_writer', label: 'Code Writer',   desc: 'Writing code changes'  },
  { key: 'test_writer', label: 'Test Writer',   desc: 'Generating tests'      },
  { key: 'pr_opener',   label: 'PR Opener',     desc: 'Opening pull request'  },
]

function deriveAgentStatuses(run) {
  if (!run) return {}
  const order = ['code_reader','planner','code_writer','test_writer','pr_opener']
  const statuses = {}

  if (run.status === 'pending') {
    order.forEach(k => { statuses[k] = 'waiting' })
    return statuses
  }

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
    const first = order.find(k => statuses[k] === 'running' || statuses[k] === 'waiting')
    if (first) statuses[first] = 'failed'
  }

  return statuses
}

function getOutput(key, run) {
  if (!run) return null
  const map = {
    code_reader: run.relevant_files?.length ? { label: 'relevant files', content: run.relevant_files.join('\n') } : null,
    planner:     run.plan  ? { label: 'fix plan',  content: run.plan  } : null,
    code_writer: run.patch ? { label: 'patch',     content: run.patch } : null,
    test_writer: run.tests ? { label: 'tests',     content: run.tests } : null,
    pr_opener:   run.pr_url ? { label: 'pull request', content: run.pr_url } : null,
  }
  return map[key] || null
}

function AgentRow({ agent, status, run, index }) {
  const [open,     setOpen]     = useState(false)
  const [elapsed,  setElapsed]  = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (status === 'running') {
      setElapsed(0); setProgress(0)
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

  useEffect(() => { if (status === 'done') setOpen(true) }, [status])

  const output = getOutput(agent.key, run)
  const mm = String(Math.floor(elapsed / 60)).padStart(2,'0')
  const ss = String(elapsed % 60).padStart(2,'0')

  const rowStyles = {
    waiting: 'border-gray-800/60 opacity-40',
    running: 'border-blue-800/50 bg-blue-900/10',
    done:    'border-gray-800',
    failed:  'border-red-800/50 bg-red-900/10',
  }

  const iconEl = {
    waiting: <span className="text-gray-700 text-base leading-none">○</span>,
    running: <Spinner />,
    done:    <span className="text-emerald-400 text-sm leading-none">✓</span>,
    failed:  <span className="text-red-400 text-sm leading-none">✗</span>,
  }[status]

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 animate-slide-in ${rowStyles[status]}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => status !== 'waiting' && setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left"
      >
        <span className="w-4 shrink-0 flex items-center justify-center">{iconEl}</span>

        <span className={`text-sm font-medium w-28 shrink-0 ${status === 'waiting' ? 'text-gray-600' : 'text-gray-200'}`}>
          {agent.label}
        </span>

        <span className="flex-1 text-xs text-gray-600">
          {status === 'running' && (
            <span className="flex items-center gap-2 text-blue-400">
              <span className="font-mono">{blockBar(progress)}</span>
              <span>{agent.desc}</span>
            </span>
          )}
          {status === 'waiting' && '—'}
          {status === 'done'    && <span className="text-emerald-500">{output ? 'Output ready' : 'Complete'}</span>}
          {status === 'failed'  && <span className="text-red-400">Failed</span>}
        </span>

        {(status === 'running' || status === 'done') && (
          <span className="font-mono text-xs text-gray-600 shrink-0">{mm}:{ss}</span>
        )}

        {status !== 'waiting' && output && (
          <span className="text-gray-600 text-xs shrink-0">{open ? '▾' : '▸'}</span>
        )}
      </button>

      {open && output && (
        <div className="border-t border-gray-800 animate-fade-in">
          <CodeBlock code={output.content} label={output.label} />
        </div>
      )}
    </div>
  )
}

export default function AgentPanel({ run }) {
  const statuses = deriveAgentStatuses(run)
  return (
    <div className="flex flex-col gap-2">
      {AGENTS.map((agent, i) => (
        <AgentRow key={agent.key} agent={agent} status={statuses[agent.key] || 'waiting'} run={run} index={i} />
      ))}
    </div>
  )
}