<div align="center">

<br/>

```
 █████╗ ██╗   ██╗████████╗ ██████╗ ██████╗ ██████╗
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗
███████║██║   ██║   ██║   ██║   ██║██████╔╝██████╔╝
██╔══██║██║   ██║   ██║   ██║   ██║██╔═══╝ ██╔══██╗
██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║     ██║  ██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝  ╚═╝
```

### A multi-agent system that reads your GitHub issues and ships the fix — automatically.

<br/>

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-0.1-FF6B35?style=for-the-badge&logo=langchain&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black?style=for-the-badge&logo=ollama&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub_API-PyGithub-181717?style=for-the-badge&logo=github&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br/>

</div>

---

## What is AutoPR?

**AutoPR** is a production-grade multi-agent orchestration system that takes a GitHub issue as input and autonomously:

1. 🔍 **Reads and understands** your entire codebase
2. 🧠 **Plans** a step-by-step fix strategy
3. ✍️ **Writes** the actual code changes
4. 🧪 **Generates** tests for the patch
5. 🚀 **Opens a Pull Request** on GitHub — ready for your review

Built with **LangGraph StateGraph** for deterministic agent orchestration, **FastAPI** for a production-ready async backend, and **Ollama** for fully local LLM inference — no API keys, no cloud, no data leaving your machine.

---

## Features

| Feature | Description |
|---|---|
| 🤖 **5-Agent Pipeline** | Specialized agents chained via LangGraph — each with one focused job |
| ⚡ **Async by Default** | FastAPI background tasks + SSE streaming — never blocks the UI |
| 🔄 **Live Agent Progress** | Server-Sent Events stream real-time updates as each agent finishes |
| 🛡️ **Fault Tolerant** | Conditional graph edges — pipeline exits gracefully if an agent fails |
| 🏠 **100% Local** | Ollama runs the LLM on your machine — no OpenAI, no Anthropic, no cloud |
| 🐙 **Real GitHub PRs** | PyGithub creates a branch, commits files, and opens a proper PR |
| 🐳 **Docker Ready** | Single `docker-compose up` spins up the full stack |
| 📡 **REST API** | Clean versioned API — fully documented at `/docs` |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER / FRONTEND                            │
│                  POST /api/v1/issues/run                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         FASTAPI BACKEND                             │
│                                                                     │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│   │  /issues    │    │   /runs/{id} │    │ /runs/{id}/stream    │  │
│   │  POST 202   │    │   GET status │    │  SSE live updates    │  │
│   └──────┬──────┘    └──────────────┘    └──────────────────────┘  │
│          │                                                          │
│          │ BackgroundTask                                           │
│          ▼                                                          │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    RUN STORE (in-memory)                    │  │
│   │         pending → running → completed / failed              │  │
│   └─────────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│               LANGGRAPH STATEGRAPH  (graph/pipeline.py)             │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │                       AgentState                             │ │
│   │  issue · repo_path · repo_files · relevant_files             │ │
│   │  code_context · plan · patch · tests · pr_url · error        │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│   START                                                             │
│     │                                                               │
│     ▼                                                               │
│   ┌─────────────┐   no files?  ┌─────┐                             │
│   │ CODE READER ├─────────────►│ END │                             │
│   │  Agent 01   │              └─────┘                             │
│   └──────┬──────┘                                                  │
│          │ relevant_files found                                     │
│          ▼                                                          │
│   ┌─────────────┐                                                   │
│   │   PLANNER   │  reads issue + code_context                      │
│   │   Agent 02  │  writes numbered fix plan                        │
│   └──────┬──────┘                                                  │
│          ▼                                                          │
│   ┌─────────────┐                                                   │
│   │ CODE WRITER │  reads plan + context                            │
│   │   Agent 03  │  writes full updated files                       │
│   └──────┬──────┘                                                  │
│          ▼                                                          │
│   ┌─────────────┐                                                   │
│   │ TEST WRITER │  reads patch                                     │
│   │   Agent 04  │  writes pytest test cases                        │
│   └──────┬──────┘                                                  │
│          ▼                                                          │
│   ┌─────────────┐                                                   │
│   │  PR OPENER  │  creates branch → commits files → opens PR      │
│   │   Agent 05  │  returns pr_url                                  │
│   └──────┬──────┘                                                  │
│          ▼                                                          │
│        END                                                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   GITHUB API    │
                    │  New branch     │
                    │  Committed fix  │
                    │  Pull Request ✓ │
                    └─────────────────┘
```

---

## Project Structure

```
AutoPR/
├── backend/
│   ├── agents/
│   │   ├── code_reader.py      # Agent 01 — finds relevant files
│   │   ├── planner.py          # Agent 02 — creates fix plan
│   │   ├── code_writer.py      # Agent 03 — writes code changes
│   │   ├── test_writer.py      # Agent 04 — writes tests
│   │   └── pr_opener.py        # Agent 05 — opens GitHub PR
│   ├── api/
│   │   ├── schemas.py          # Pydantic models (requests + responses)
│   │   └── routes/
│   │       ├── health.py       # GET /api/v1/health
│   │       ├── issues.py       # POST /api/v1/issues/run
│   │       └── runs.py         # GET /api/v1/runs + SSE stream
│   ├── core/
│   │   ├── config.py           # Pydantic settings (reads .env)
│   │   └── store.py            # In-memory run store
│   ├── graph/
│   │   └── pipeline.py         # LangGraph StateGraph — wires all agents
│   ├── state/
│   │   └── Agent_state.py      # Shared TypedDict state across all agents
│   ├── tools/
│   │   └── file_tools.py       # list_repo_files, read_file
│   ├── main.py                 # FastAPI app entry point
│   └── requirements.txt
├── dockerfile
├── .env.example
└── README.md
```

---

## Quickstart

### Prerequisites

- Python 3.11+
- [Ollama](https://ollama.ai) installed and running
- A GitHub Personal Access Token (for PR creation)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/AutoPR.git
cd AutoPR/backend

python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

### 2. Pull the model

```bash
ollama pull llama3
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
OLLAMA_MODEL=llama3
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=owner/repo
```

### 4. Start the server

```bash
uvicorn backend.main:app --reload
```

API docs available at → **http://localhost:8000/docs**

---

## API Reference

### Start a pipeline run

```http
POST /api/v1/issues/run
Content-Type: application/json

{
  "issue": "The login function crashes when token is None",
  "repo_path": "/absolute/path/to/your/repo",
  "github_repo": "owner/repo",
  "github_token": "ghp_optional_override"
}
```

**Response `202 Accepted`:**
```json
{
  "run_id": "3f7a1c2d-...",
  "status": "pending",
  "message": "Pipeline started. Poll /api/v1/runs/{run_id} for status."
}
```

### Poll run status

```http
GET /api/v1/runs/{run_id}
```

### Stream live updates (SSE)

```http
GET /api/v1/runs/{run_id}/stream
```

Connect from the frontend:
```javascript
const source = new EventSource(`/api/v1/runs/${runId}/stream`);
source.onmessage = (e) => {
  const state = JSON.parse(e.data);
  console.log(state.status); // pending → running → completed
};
```

---

## How each agent works

### Agent 01 — Code Reader
Lists every file in the repo, shows the LLM the file tree + issue, and asks it to identify the 5 most relevant files. Reads those files and stitches their content into a shared `code_context`.

### Agent 02 — Planner
Receives the issue + code context. Returns a numbered, step-by-step plan referencing exact function names and file paths. No code — just the plan.

### Agent 03 — Code Writer
Receives the plan + code context. Writes the full updated content of every file that needs changing. Output is structured as `# FILE: <path>` sections.

### Agent 04 — Test Writer
Receives the patch. Writes `pytest` test cases — at minimum one test confirming the fix works and one edge case.

### Agent 05 — PR Opener
Creates a new branch (`autopr/<issue-slug>`), commits every changed file, and opens a Pull Request with the plan as the description.

---

## Docker

```bash
docker-compose up --build
```

The backend starts on **port 8000**.

---

## Roadmap

- [ ] Frontend UI with live agent progress view
- [ ] SSE-powered step-by-step status panel
- [ ] Support for OpenAI / Anthropic models alongside Ollama
- [ ] Retrieval-augmented code search (embeddings + vector store)
- [ ] Webhook listener — trigger automatically from GitHub issue events
- [ ] Multi-repo support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Agent Orchestration | LangGraph StateGraph |
| LLM Inference | Ollama (llama3, local) |
| Backend Framework | FastAPI + Uvicorn |
| Data Validation | Pydantic v2 |
| GitHub Integration | PyGithub |
| Live Streaming | Server-Sent Events (SSE) |
| Containerization | Docker + Docker Compose |

---

<div align="center">

Built to get you out of the "toy project" category. ⚡

</div>
