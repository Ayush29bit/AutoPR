import { Link } from 'react-router-dom'
import { useAllRuns } from '../hooks/useRun'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { shortId, truncate } from '../utils'

export default function HistoryPage() {
  const { runs, loading, refresh } = useAllRuns()

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-xs text-ink-muted tracking-widest uppercase mb-1">
            — All Runs —
          </div>
          <h1 className="font-mono text-lg text-ink-primary">Run History</h1>
        </div>
        <button
          onClick={refresh}
          className="font-mono text-xs text-ink-muted hover:text-accent transition-colors border border-border-base px-3 py-1.5 rounded"
        >
          ↺ refresh
        </button>
      </div>

      {/* table header */}
      <div className="grid grid-cols-12 px-4 py-2 font-mono text-xs text-ink-muted tracking-widest uppercase border-b border-border-dim">
        <span className="col-span-2">Run ID</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-8">Issue</span>
      </div>

      {/* rows */}
      {loading && (
        <div className="flex items-center gap-2 px-4 py-6 font-mono text-sm text-ink-muted">
          <Spinner /> loading...
        </div>
      )}

      {!loading && runs.length === 0 && (
        <div className="px-4 py-8 text-center font-mono text-sm text-ink-muted">
          no runs yet —{' '}
          <Link to="/" className="text-accent hover:underline">start one</Link>
        </div>
      )}

      {runs.map((run, i) => (
        <Link
          key={run.run_id}
          to={`/run/${run.run_id}`}
          className="grid grid-cols-12 px-4 py-3 border-b border-border-dim
                     hover:bg-bg-secondary transition-colors duration-100 animate-slide-in"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          <span className="col-span-2 font-mono text-xs text-ink-secondary">
            #{shortId(run.run_id)}
          </span>
          <span className="col-span-2">
            <Badge status={run.status} />
          </span>
          <span className="col-span-8 font-mono text-xs text-ink-secondary truncate">
            {truncate(run.issue, 70)}
          </span>
        </Link>
      ))}

      {/* back */}
      <div className="mt-6">
        <Link to="/" className="font-mono text-xs text-ink-muted hover:text-accent transition-colors">
          ← new run
        </Link>
      </div>
    </div>
  )
}