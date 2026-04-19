import { useParams, Link } from 'react-router-dom'
import { useRun } from '../hooks/useRun'
import RunHeader from '../components/run/RunHeader'
import AgentPanel from '../components/run/AgentRow'
import ResultsPanel from '../components/run/ResultsPanel'
import Spinner from '../components/ui/Spinner'

export default function RunPage() {
  const { runId }      = useParams()
  const { run, error } = useRun(runId)

  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="px-4 py-3 rounded-xl border border-red-800/50 bg-red-900/20 text-sm text-red-400 mb-4">
        {error}
      </div>
      <Link to="/" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">← New run</Link>
    </div>
  )

  if (!run) return (
    <div className="flex items-center gap-2 px-6 py-10 text-sm text-gray-600">
      <Spinner /> Loading...
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in">
      {run.status === 'completed' && (
        <div className="fixed inset-0 bg-emerald-500 pointer-events-none animate-flash" style={{ zIndex: 50 }} />
      )}

      <Link to="/" className="inline-block text-xs text-gray-600 hover:text-gray-300 transition-colors mb-6">
        ← New run
      </Link>

      <RunHeader run={run} />
      <AgentPanel run={run} />
      {run.status === 'completed' && <ResultsPanel run={run} />}
    </div>
  )
}