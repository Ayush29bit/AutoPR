import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStartRun } from '../../hooks/useRun'
import { SPINNER_FRAMES } from '../../utils'

export default function IssueForm() {
  const [issue,       setIssue]       = useState('')
  const [repoPath,    setRepoPath]    = useState('')
  const [githubRepo,  setGithubRepo]  = useState('')
  const [githubToken, setGithubToken] = useState('')
  const [advanced,    setAdvanced]    = useState(false)
  const [spinFrame,   setSpinFrame]   = useState(0)
  const textareaRef = useRef(null)
  const navigate    = useNavigate()
  const { start, loading, error } = useStartRun()

  // focus textarea on mount
  useEffect(() => { textareaRef.current?.focus() }, [])

  // spinner animation
  useEffect(() => {
    if (!loading) return
    const iv = setInterval(() => setSpinFrame(f => (f + 1) % SPINNER_FRAMES.length), 80)
    return () => clearInterval(iv)
  }, [loading])

  const handleSubmit = async () => {
    if (!issue.trim() || !repoPath.trim() || loading) return
    const runId = await start(issue.trim(), repoPath.trim(), githubRepo.trim(), githubToken.trim())
    if (runId) navigate(`/run/${runId}`)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* prompt header */}
      <div className="mb-6">
        <div className="font-mono text-xs text-ink-muted tracking-widest uppercase mb-1">
          — New Pipeline Run —
        </div>
        <h1 className="font-mono text-xl text-ink-primary">
          Describe the GitHub issue
        </h1>
        <p className="font-sans text-sm text-ink-secondary mt-1">
          The agents will read your codebase, plan a fix, write the code, generate tests, and open a PR.
        </p>
      </div>

      {/* issue textarea */}
      <div className="mb-4">
        <label className="block font-mono text-xs text-ink-muted mb-2 tracking-wider uppercase">
          Issue Description
        </label>
        <div className="relative border border-border-base rounded bg-bg-secondary focus-within:border-accent transition-colors duration-150">
          <span className="absolute top-3 left-3 font-mono text-accent text-sm select-none">›</span>
          <textarea
            ref={textareaRef}
            value={issue}
            onChange={e => setIssue(e.target.value)}
            onKeyDown={handleKey}
            rows={5}
            placeholder="The login function crashes when token is None — need a null check before accessing token.user_id"
            className="w-full bg-transparent font-mono text-sm text-ink-primary placeholder-ink-muted
                       pl-8 pr-4 py-3 resize-none outline-none"
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-xs text-ink-muted">
            {issue.length > 0 ? `${issue.length} chars` : 'min 10 chars required'}
          </span>
          <span className="font-mono text-xs text-ink-muted">⌘+Enter to run</span>
        </div>
      </div>

      {/* repo path */}
      <div className="mb-4">
        <label className="block font-mono text-xs text-ink-muted mb-2 tracking-wider uppercase">
          Repository Path
        </label>
        <div className="flex items-center border border-border-base rounded bg-bg-secondary focus-within:border-accent transition-colors duration-150">
          <span className="font-mono text-ink-muted text-sm px-3 border-r border-border-dim select-none">~/</span>
          <input
            type="text"
            value={repoPath}
            onChange={e => setRepoPath(e.target.value)}
            onKeyDown={handleKey}
            placeholder="absolute/path/to/your/repo"
            className="flex-1 bg-transparent font-mono text-sm text-ink-primary placeholder-ink-muted px-3 py-2.5 outline-none"
          />
        </div>
      </div>

      {/* advanced toggle */}
      <button
        onClick={() => setAdvanced(v => !v)}
        className="font-mono text-xs text-ink-muted hover:text-ink-secondary transition-colors mb-3"
      >
        {advanced ? '▼' : '▶'} GitHub integration (optional)
      </button>

      {advanced && (
        <div className="mb-4 pl-3 border-l border-border-dim space-y-3 animate-fade-in">
          <div>
            <label className="block font-mono text-xs text-ink-muted mb-1.5 tracking-wider uppercase">
              GitHub Repo
            </label>
            <input
              type="text"
              value={githubRepo}
              onChange={e => setGithubRepo(e.target.value)}
              placeholder="owner/repo"
              className="w-full bg-bg-secondary border border-border-base rounded font-mono text-sm
                         text-ink-primary placeholder-ink-muted px-3 py-2.5 outline-none
                         focus:border-accent transition-colors duration-150"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-ink-muted mb-1.5 tracking-wider uppercase">
              GitHub Token
            </label>
            <input
              type="password"
              value={githubToken}
              onChange={e => setGithubToken(e.target.value)}
              placeholder="ghp_••••••••••••••"
              className="w-full bg-bg-secondary border border-border-base rounded font-mono text-sm
                         text-ink-primary placeholder-ink-muted px-3 py-2.5 outline-none
                         focus:border-accent transition-colors duration-150"
            />
          </div>
        </div>
      )}

      {/* error */}
      {error && (
        <div className="mb-4 px-3 py-2 border border-status-error/30 bg-status-error/10 rounded font-mono text-xs text-status-error">
          ✗ {error}
        </div>
      )}

      {/* submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || !issue.trim() || !repoPath.trim()}
        className={`w-full font-mono text-sm tracking-widest uppercase py-3 rounded transition-all duration-150
          ${loading || !issue.trim() || !repoPath.trim()
            ? 'bg-bg-tertiary text-ink-muted border border-border-dim cursor-not-allowed'
            : 'bg-accent text-bg-primary hover:opacity-90 glow-accent cursor-pointer'
          }`}
      >
        {loading
          ? `${SPINNER_FRAMES[spinFrame]} Running Pipeline...`
          : '▶ Run Pipeline'
        }
      </button>

      {/* hint */}
      <p className="text-center font-mono text-xs text-ink-muted mt-3">
        Pipeline takes 1–3 minutes · Results stream live
      </p>
    </div>
  )
}