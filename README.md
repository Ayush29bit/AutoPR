## AutoPR

AutoPR is a multi-agent AI system that autonomously resolves GitHub issues by analyzing the repository, generating code patches, writing tests, and opening pull requests.

Built using LangGraph, AutoPR orchestrates specialized AI agents that collaborate to perform real-world software engineering workflows.

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
