import { shortId, truncate } from '../../utils'
import Badge from '../ui/Badge'
import Spinner from '../ui/Spinner'

export default function RunHeader({ run }) {
  if (!run) return null

  const isRunning   = run.status === 'running'
  const isCompleted = run.status === 'completed'
  const isFailed    = run.status === 'failed'

  return (
    <div className="mb-6 pb-5 border-b border-gray-800 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-gray-600 font-mono">#{shortId(run.run_id)}</span>
          <Badge status={run.status} />
        </div>

        {isRunning && (
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Live</span>
            <Spinner />
          </div>
        )}
        {isCompleted && <span className="text-xs text-emerald-400">Pipeline complete</span>}
        {isFailed    && <span className="text-xs text-red-400">Pipeline failed</span>}
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">
        {truncate(run.issue, 140)}
      </p>

      {run.repo_path && (
        <p className="text-xs text-gray-600 font-mono mt-1.5">{run.repo_path}</p>
      )}

      {isFailed && run.error && (
        <div className="mt-3 px-3 py-2.5 rounded-lg border border-red-800/50 bg-red-900/20 text-xs text-red-400">
          {run.error}
        </div>
      )}
    </div>
  )
}