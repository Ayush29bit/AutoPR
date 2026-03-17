<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AutoPR — README</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
  :root {
    --bg: #0a0c0f;
    --surface: #111318;
    --surface2: #181c23;
    --border: #1e2530;
    --border2: #252d3a;
    --green: #00e5a0;
    --green-dim: #00e5a020;
    --green-mid: #00e5a040;
    --blue: #4d9fff;
    --blue-dim: #4d9fff15;
    --amber: #f59e0b;
    --amber-dim: #f59e0b15;
    --coral: #ff6b6b;
    --coral-dim: #ff6b6b15;
    --purple: #a78bfa;
    --purple-dim: #a78bfa15;
    --text: #e8edf5;
    --text-secondary: #8a95a3;
    --text-tertiary: #4a5568;
    --mono: 'Space Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }
 
  * { box-sizing: border-box; margin: 0; padding: 0; }
 
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.7;
    min-height: 100vh;
  }
 
  /* scanline texture */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 1000;
  }
 
  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 32px 120px;
  }
 
  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 80px 0 60px;
    position: relative;
  }
 
  .hero-glow {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse at center top, #00e5a018 0%, transparent 70%);
    pointer-events: none;
  }
 
  .ascii-logo {
    font-family: var(--mono);
    font-size: 11px;
    line-height: 1.2;
    color: var(--green);
    letter-spacing: 0.05em;
    opacity: 0.9;
    display: inline-block;
    position: relative;
  }
 
  .ascii-logo::after {
    content: '';
    position: absolute;
    inset: -8px;
    background: var(--green-dim);
    border-radius: 4px;
    z-index: -1;
  }
 
  .tagline {
    margin-top: 28px;
    font-family: var(--sans);
    font-size: 17px;
    font-weight: 300;
    color: var(--text-secondary);
    letter-spacing: 0.01em;
  }
 
  .tagline strong {
    color: var(--text);
    font-weight: 500;
  }
 
  /* ── BADGES ── */
  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 28px;
  }
 
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 6px;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border: 1px solid;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .badge:hover { transform: translateY(-1px); }
 
  .badge-python  { color: #3776AB; border-color: #3776AB40; background: #3776AB12; }
  .badge-fastapi { color: #009688; border-color: #00968840; background: #00968812; }
  .badge-lg      { color: #FF6B35; border-color: #FF6B3540; background: #FF6B3512; }
  .badge-ollama  { color: #e8edf5; border-color: #e8edf520; background: #e8edf508; }
  .badge-gh      { color: #a78bfa; border-color: #a78bfa40; background: #a78bfa12; }
  .badge-docker  { color: #2496ED; border-color: #2496ED40; background: #2496ED12; }
 
  /* ── SECTION ── */
  .section {
    margin-top: 72px;
  }
 
  .section-label {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 6px;
  }
 
  h2 {
    font-family: var(--sans);
    font-size: 26px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
 
  h3 {
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    margin: 28px 0 8px;
  }
 
  p {
    color: var(--text-secondary);
    margin-bottom: 14px;
  }
 
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border2), transparent);
    margin: 64px 0;
  }
 
  /* ── FEATURES GRID ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 24px;
  }
 
  .feature-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    transition: border-color 0.2s, background 0.2s;
  }
  .feature-card:hover {
    border-color: var(--border2);
    background: var(--surface2);
  }
 
  .feature-icon {
    font-size: 22px;
    margin-bottom: 10px;
  }
 
  .feature-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--text);
    margin-bottom: 4px;
  }
 
  .feature-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }
 
  /* ── ARCHITECTURE SVG ── */
  .arch-container {
    margin-top: 32px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px 24px;
    overflow-x: auto;
  }
 
  /* ── WORKFLOW STEPS ── */
  .workflow {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
 
  .wf-step {
    display: flex;
    gap: 20px;
    position: relative;
  }
 
  .wf-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 44px;
    bottom: 0;
    width: 2px;
    background: var(--border2);
  }
 
  .wf-num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    border: 1.5px solid;
    position: relative;
    z-index: 1;
    margin-top: 2px;
  }
 
  .wf-body {
    padding: 2px 0 32px;
  }
 
  .wf-agent {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
 
  .wf-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 5px;
  }
 
  .wf-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }
 
  .c1 { color: var(--blue);   border-color: var(--blue);   background: var(--blue-dim); }
  .c2 { color: var(--purple); border-color: var(--purple); background: var(--purple-dim); }
  .c3 { color: var(--green);  border-color: var(--green);  background: var(--green-mid); }
  .c4 { color: var(--amber);  border-color: var(--amber);  background: var(--amber-dim); }
  .c5 { color: var(--coral);  border-color: var(--coral);  background: var(--coral-dim); }
 
  /* ── CODE BLOCK ── */
  pre {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.7;
    color: var(--text-secondary);
    overflow-x: auto;
    margin: 16px 0;
  }
 
  code {
    font-family: var(--mono);
    font-size: 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--green);
  }
 
  /* ── TECH TABLE ── */
  .tech-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
 
  .tech-table th {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    text-align: left;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
  }
 
  .tech-table td {
    padding: 12px 16px;
    font-size: 14px;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border);
  }
 
  .tech-table td:first-child {
    color: var(--text);
    font-weight: 500;
  }
 
  .tech-table tr:last-child td { border-bottom: none; }
  .tech-table tr:hover td { background: var(--surface2); }
 
  .pill {
    display: inline-block;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 4px;
    border: 1px solid;
  }
 
  /* ── FOOTER ── */
  .footer {
    margin-top: 80px;
    text-align: center;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text-tertiary);
    border-top: 1px solid var(--border);
    padding-top: 32px;
  }
 
  .footer span {
    color: var(--green);
  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  .hero, .section { animation: fadeUp 0.5s ease both; }
  .section:nth-child(2) { animation-delay: 0.1s; }
  .section:nth-child(3) { animation-delay: 0.15s; }
  .section:nth-child(4) { animation-delay: 0.2s; }
</style>
</head>
<body>
<div class="page">
 
  <!-- HERO -->
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
