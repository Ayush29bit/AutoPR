import { useState, useEffect, useRef, useCallback } from 'react'
import { api, streamRun } from '../api/client'

export function useRun(runId) {
  const [run, setRun]       = useState(null)
  const [error, setError]   = useState(null)
  const sourceRef           = useRef(null)

  useEffect(() => {
    if (!runId) return
    // initial fetch
    api.getRun(runId).then(setRun).catch(e => setError(e.message))
    // open SSE stream
    sourceRef.current = streamRun(
      runId,
      (data) => {
        setRun(data)
        if (data.status === 'completed' || data.status === 'failed') {
          sourceRef.current?.close()
        }
      },
      () => setError('Stream disconnected')
    )
    return () => sourceRef.current?.close()
  }, [runId])

  return { run, error }
}

export function useStartRun() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const start = useCallback(async (issue, repoPath, githubRepo, githubToken) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.startRun(issue, repoPath, githubRepo, githubToken)
      return res.run_id
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { start, loading, error }
}

export function useAllRuns() {
  const [runs, setRuns]     = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    setLoading(true)
    api.getAllRuns()
      .then(data => setRuns(data.runs || []))
      .catch(() => setRuns([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return { runs, loading, refresh }
}