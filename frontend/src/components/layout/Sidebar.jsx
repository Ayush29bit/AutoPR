import { NavLink, useNavigate } from 'react-router-dom'
import { useAllRuns } from '../../hooks/useRun'
import { shortId, statusHex, truncate } from '../../utils'

export default function Sidebar() {
  const { runs, loading } = useAllRuns()
  const navigate = useNavigate()

  return (
    <aside className="w-52 shrink-0 border-r border-gray-800/80 bg-gray-950 flex flex-col overflow-hidden">

      {/* new run button */}
      <div className="p-3">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-medium
                     text-gray-300 bg-gray-800 hover:bg-gray-700
                     rounded-lg px-3 py-2 transition-colors duration-150"
        >
          <span className="text-gray-500">+</span>
          New run
        </button>
      </div>

      {/* history list */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="px-2 pb-1 pt-2">
          <span className="text-xs text-gray-600 uppercase tracking-wider font-medium">
            Recent
          </span>
        </div>

        {loading && (
          <div className="px-2 py-2 text-xs text-gray-600 animate-pulse">Loading...</div>
        )}

        {!loading && runs.length === 0 && (
          <div className="px-2 py-2 text-xs text-gray-600">No runs yet</div>
        )}

        {runs.map((run, i) => (
          <NavLink
            key={run.run_id}
            to={`/run/${run.run_id}`}
            style={{ animationDelay: `${i * 30}ms` }}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer
               animate-slide-in transition-colors duration-100 group
               ${isActive
                 ? 'bg-gray-800 text-gray-100'
                 : 'text-gray-500 hover:bg-gray-800/60 hover:text-gray-300'
               }`
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: statusHex(run.status) }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate leading-tight">
                {truncate(run.issue, 26) || `Run #${shortId(run.run_id)}`}
              </div>
              <div className="text-xs text-gray-700 font-mono mt-0.5">
                #{shortId(run.run_id)}
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* footer */}
      <div className="p-3 border-t border-gray-800/80">
        <NavLink
          to="/history"
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          View all runs →
        </NavLink>
      </div>
    </aside>
  )
}