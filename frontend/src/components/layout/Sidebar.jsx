import { NavLink, useNavigate } from 'react-router-dom'
import { useAllRuns } from '../../hooks/useRun'
import { shortId, statusHex, truncate } from '../../utils'

export default function Sidebar() {
  const { runs, loading } = useAllRuns()
  const navigate = useNavigate()

  return (
    <aside className="w-56 shrink-0 border-r border-border-dim bg-bg-secondary flex flex-col overflow-hidden">
      <div className="p-3 border-b border-border-dim">
        <button
          onClick={() => navigate('/')}
          className="w-full font-mono text-xs text-accent border border-accent/30 bg-accent/10
                     hover:bg-accent hover:text-bg-primary transition-all duration-150
                     px-3 py-2 rounded tracking-widest uppercase"
        >
          + New Run
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 pt-3 pb-1">
          <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">
            Run History
          </span>
        </div>

        {loading && (
          <div className="px-3 py-2 font-mono text-xs text-ink-muted animate-pulse">loading...</div>
        )}

        {!loading && runs.length === 0 && (
          <div className="px-3 py-2 font-mono text-xs text-ink-muted">no runs yet</div>
        )}

        {runs.map((run, i) => (
          <NavLink
            key={run.run_id}
            to={`/run/${run.run_id}`}
            style={{ animationDelay: `${i * 40}ms` }}
            className={({ isActive }) =>
              `flex items-start gap-2 px-3 py-2 cursor-pointer animate-slide-in
               border-l-2 transition-all duration-100
               ${isActive
                 ? 'border-accent bg-accent/10'
                 : 'border-transparent hover:border-border-bright hover:bg-bg-tertiary'}`
            }
          >
            <span className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: statusHex(run.status) }} />
            <div className="min-w-0">
              <div className="font-mono text-xs text-ink-primary truncate">#{shortId(run.run_id)}</div>
              <div className="font-mono text-xs text-ink-muted truncate mt-0.5">{truncate(run.issue, 28)}</div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="px-3 py-2 border-t border-border-dim">
        <NavLink to="/history" className="font-mono text-xs text-ink-muted hover:text-ink-secondary transition-colors">
          view all →
        </NavLink>
      </div>
    </aside>
  )
}