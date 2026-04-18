import { formatDuration, shortId, truncate } from '../../utils'
import Badge from '../ui/Badge'
import Spinner from '../ui/Spinner'

export default function RunHeader({ run }) {
  if (!run) return null

  const isRunning   = run.status === 'running'
  const isCompleted = run.status === 'completed'
  const isFailed    = run.status === 'failed'

  return (
    <div className="mb-6 pb-4 border-b border-border-dim animate-fade-in">
      {/* top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-ink-muted">
            RUN #{shortId(run.run_id)}
          </span>
          <Badge status={run.status} />
        </div>

        {/* live indicator */}
        {isRunning && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-info animate-pulse" />
            <span className="font-mono text-xs text-status-info">live</span>
            <Spinner />
          </div>
        )}

        {isCompleted && (
          <span className="font-mono text-xs text-status-success">
            ✓ pipeline complete
          </span>
        )}

        {isFailed && (
          <span className="font-mono text-xs text-status-error">
            ✗ pipeline failed
          </span>
        )}
      </div>

      {/* issue text */}
      <p className="font-mono text-sm text-ink-primary leading-relaxed">
        › {truncate(run.issue, 120)}
      </p>

      {/* repo path */}
      {run.repo_path && (
        <p className="font-mono text-xs text-ink-muted mt-1">
          {run.repo_path}
        </p>
      )}

      {/* error banner */}
      {isFailed && run.error && (
        <div className="mt-3 px-3 py-2 rounded border border-status-error/30 bg-status-error/10">
          <span className="font-mono text-xs text-status-error">
            ✗ {run.error}
          </span>
        </div>
      )}
    </div>
  )
}