import { Link } from 'react-router-dom'
import { useAllRuns } from '../hooks/useRun'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { shortId, truncate } from '../utils'

export default function HistoryPage() {
  const { runs, loading, refresh } = useAllRuns()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-100 tracking-tight">Run history</h1>
          <p className="text-sm text-gray-500 mt-0.5">{runs.length} total runs</p>
        </div>
        <button
          onClick={refresh}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors
                     border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {/* table */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-gray-900/60 border-b border-gray-800">
          <span className="col-span-2 text-xs text-gray-600 uppercase tracking-wider font-medium">ID</span>
          <span className="col-span-2 text-xs text-gray-600 uppercase tracking-wider font-medium">Status</span>
          <span className="col-span-8 text-xs text-gray-600 uppercase tracking-wider font-medium">Issue</span>
        </div>

        {loading && (
          <div className="flex items-center gap-2 px-4 py-6 text-sm text-gray-600">
            <Spinner /> Loading...
          </div>
        )}

        {!loading && runs.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-600">
            No runs yet —{' '}
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">start one</Link>
          </div>
        )}

        {runs.map((run, i) => (
          <Link
            key={run.run_id}
            to={`/run/${run.run_id}`}
            className="grid grid-cols-12 items-center px-4 py-3 border-b border-gray-800/60 last:border-0
                       hover:bg-gray-800/40 transition-colors duration-100 animate-slide-in"
            style={{ animationDelay: `${i * 25}ms` }}
          >
            <span className="col-span-2 font-mono text-xs text-gray-600">#{shortId(run.run_id)}</span>
            <span className="col-span-2"><Badge status={run.status} /></span>
            <span className="col-span-8 text-xs text-gray-400 truncate">{truncate(run.issue, 70)}</span>
          </Link>
        ))}
      </div>

      <div className="mt-5">
        <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">← New run</Link>
      </div>
    </div>
  )
}