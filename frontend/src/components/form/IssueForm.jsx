import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStartRun } from '../../hooks/useRun'
import { SPINNER_FRAMES } from '../../utils'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import Card from '../ui/Card'

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

  useEffect(() => { textareaRef.current?.focus() }, [])

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

  const canSubmit = issue.trim().length >= 10 && repoPath.trim().length > 0 && !loading

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* issue textarea */}
      <Textarea
        label="Issue description"
        ref={textareaRef}
        value={issue}
        onChange={e => setIssue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit() }}
        rows={5}
        placeholder="The login function crashes when token is None — need a null check before accessing token.user_id"
        hint={issue.length > 0 ? `${issue.length} characters · Ctrl+Enter to submit` : 'Minimum 10 characters'}
      />

      {/* repo path */}
      <Input
        label="Repository path"
        prefix="~/"
        type="text"
        value={repoPath}
        onChange={e => setRepoPath(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
        placeholder="D:/Projects/myrepo"
      />

      {/* github section */}
      <div>
        <button
          onClick={() => setAdvanced(v => !v)}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors mb-3"
        >
          <span className={`transition-transform duration-150 ${advanced ? 'rotate-90' : ''}`}>▶</span>
          GitHub integration
          <span className="text-gray-700">— optional, required to open a real PR</span>
        </button>

        {advanced && (
          <Card className="p-4 flex flex-col gap-4 animate-fade-in">
            <Input
              label="GitHub repo"
              type="text"
              value={githubRepo}
              onChange={e => setGithubRepo(e.target.value)}
              placeholder="owner/repo"
            />
            <Input
              label="GitHub token"
              type="password"
              value={githubToken}
              onChange={e => setGithubToken(e.target.value)}
              placeholder="ghp_••••••••••••••"
            />
          </Card>
        )}
      </div>

      {/* error */}
      {error && (
        <div className="px-4 py-3 rounded-xl border border-red-800/50 bg-red-900/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* submit */}
      <Button onClick={handleSubmit} disabled={!canSubmit}>
        {loading
          ? <><span className="font-mono">{SPINNER_FRAMES[spinFrame]}</span> Running pipeline...</>
          : 'Run pipeline'
        }
      </Button>

    </div>
  )
}