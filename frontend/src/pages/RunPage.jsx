import { useParams, Link } from 'react-router-dom'
import { useRun } from '../hooks/useRun'
import RunHeader from '../components/run/RunHeader'
import AgentPanel from '../components/run/AgentRow'
import ResultsPanel from '../components/run/ResultsPanel'
import Spinner from '../components/ui/Spinner'

export default function RunPage() {
  const { runId }    = useParams()
  const { run, error } = useRun(runId)

  if (error) return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="font-mono text-sm text-status-error px-4 py-3 border border-status-error/30 rounded bg-status-error/10">
        ✗ {error}
      </div>
      <Link to="/" className="block mt-4 font-mono text-xs text-ink-muted hover:text-accent transition-colors">
        ← back to new run
      </Link>
    </div>
  )

  if (!run) return (
    <div className="flex items-center gap-3 py-8 font-mono text-sm text-ink-muted">
      <Spinner /> loading run...
    </div>
  )

  const isCompleted = run.status === 'completed'

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* completion flash overlay */}
      {isCompleted && (
        <div
          className="fixed inset-0 bg-accent pointer-events-none animate-flash"
          style={{ zIndex: 50 }}
        />
      )}

      {/* back link */}
      <Link
        to="/"
        className="inline-block font-mono text-xs text-ink-muted hover:text-accent transition-colors mb-4"
      >
        ← new run
      </Link>

      <RunHeader run={run} />
      <AgentPanel run={run} />
      {isCompleted && <ResultsPanel run={run} />}
    </div>
  )
}