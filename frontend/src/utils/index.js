// Format seconds into mm:ss
export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// Truncate a string with ellipsis
export function truncate(str, n = 60) {
  return str?.length > n ? str.slice(0, n) + '…' : str
}

// Short run ID — first 8 chars
export function shortId(id) {
  return id?.slice(0, 8) || '—'
}

// Status → color class
export function statusColor(status) {
  return {
    pending:   'text-ink-muted',
    running:   'text-status-info',
    completed: 'text-status-success',
    failed:    'text-status-error',
  }[status] || 'text-ink-muted'
}

// Status → accent color hex (for SVG/inline styles)
export function statusHex(status) {
  return {
    pending:   '#4a5568',
    running:   '#4d9fff',
    completed: '#00e5a0',
    failed:    '#ff6b6b',
  }[status] || '#4a5568'
}

// ASCII spinner frames
export const SPINNER_FRAMES = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

// Block progress bar — e.g. "████████░░░░" 12 wide
export function blockBar(pct, width = 12) {
  const filled = Math.round((pct / 100) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}