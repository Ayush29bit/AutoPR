export default function Badge({ status }) {
  const map = {
    pending:   { label: 'pending',   cls: 'text-ink-muted   border-ink-muted/30   bg-ink-muted/10'   },
    running:   { label: 'running',   cls: 'text-status-info  border-status-info/30  bg-status-info/10'  },
    completed: { label: 'completed', cls: 'text-status-success border-status-success/30 bg-status-success/10' },
    failed:    { label: 'failed',    cls: 'text-status-error  border-status-error/30  bg-status-error/10'  },
  }
  const { label, cls } = map[status] || map.pending
  return (
    <span className={`font-mono text-xs px-2 py-0.5 rounded border tracking-widest uppercase ${cls}`}>
      {label}
    </span>
  )
}