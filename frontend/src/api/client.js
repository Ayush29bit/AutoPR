const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export const api = {
  health:    ()                                         => request('/api/v1/health'),
  startRun:  (issue, repoPath, githubRepo, githubToken) => request('/api/v1/issues/run', {
    method: 'POST',
    body: JSON.stringify({ issue, repo_path: repoPath, github_repo: githubRepo || '', github_token: githubToken || '' }),
  }),
  getRun:    (runId) => request(`/api/v1/runs/${runId}`),
  getAllRuns: ()      => request('/api/v1/runs'),
}

export function streamRun(runId, onMessage, onError) {
  const source = new EventSource(`${BASE_URL}/api/v1/runs/${runId}/stream`)
  source.onmessage = (e) => { try { onMessage(JSON.parse(e.data)) } catch {} }
  source.onerror   = (e) => { onError?.(e); source.close() }
  return source
}