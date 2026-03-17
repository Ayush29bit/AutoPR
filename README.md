  <div class="hero">
    <div class="hero-glow"></div>
    <pre class="ascii-logo"> █████╗ ██╗   ██╗████████╗ ██████╗ ██████╗ ██████╗
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗
███████║██║   ██║   ██║   ██║   ██║██████╔╝██████╔╝
██╔══██║██║   ██║   ██║   ██║   ██║██╔═══╝ ██╔══██╗
██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║     ██║  ██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝  ╚═╝</pre>
 
    <p class="tagline">A <strong>multi-agent orchestration system</strong> that reads your GitHub issues<br/>and ships the fix — automatically.</p>
 
    <div class="badges">
      <span class="badge badge-python">🐍 Python 3.11+</span>
      <span class="badge badge-fastapi">⚡ FastAPI</span>
      <span class="badge badge-lg">🔗 LangGraph</span>
      <span class="badge badge-ollama">🦙 Ollama</span>
      <span class="badge badge-gh">🐙 GitHub API</span>
      <span class="badge badge-docker">🐳 Docker</span>
    </div>
  </div>
 
  <div class="divider"></div>
### Example Workflow

Input GitHub Issue

"Login API throws token validation error when user session expires."

AutoPR execution pipeline

Issue → Code Retrieval → Plan → Patch → Tests → PR

Output

"Pull Request created with fix + tests"

### What each agent does 

```
CodeReader → finds relevant files 
Planner → generates fix strategy 
CodeWriter → generates code patch 
TestWriter → generates tests
PROpener → creates PR

```

### Workflow 

```
GitHub Issue
     ↓
LangGraph Orchestrator
     ↓
CodeReader Agent
     ↓
Planner Agent
     ↓
CodeWriter Agent
     ↓
TestWriter Agent
     ↓
PR Opener Agent
     ↓
GitHub PR

```
