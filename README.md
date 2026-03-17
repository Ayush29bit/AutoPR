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

  <!-- FEATURES -->
  <div class="section">
    <div class="section-label">Core Capabilities</div>
    <h2>Everything needed. Nothing extra.</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <div class="feature-title">5-Agent Pipeline</div>
        <p class="feature-desc">Specialized agents chained via LangGraph — each with one focused, deterministic job.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <div class="feature-title">Async by Default</div>
        <p class="feature-desc">FastAPI background tasks return a run ID instantly. The pipeline runs without blocking.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔄</div>
        <div class="feature-title">Live SSE Streaming</div>
        <p class="feature-desc">Server-Sent Events push real-time agent progress to the frontend as each step completes.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <div class="feature-title">Fault Tolerant</div>
        <p class="feature-desc">Conditional graph edges — the pipeline exits gracefully if any agent fails, no crashes.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🏠</div>
        <div class="feature-title">100% Local LLM</div>
        <p class="feature-desc">Ollama runs llama3 on your machine. No OpenAI key, no cloud, no data leaves your device.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🐙</div>
        <div class="feature-title">Real GitHub PRs</div>
        <p class="feature-desc">Creates a branch, commits every changed file, and opens a proper Pull Request via PyGithub.</p>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- ARCHITECTURE -->
  <div class="section">
    <div class="section-label">System Design</div>
    <h2>Architecture</h2>
    <p>A GitHub issue enters the FastAPI layer, gets queued as a background task, then flows through the LangGraph StateGraph where each agent adds to the shared state — ending with a real PR on GitHub.</p>

    <div class="arch-container">
      <svg width="100%" viewBox="0 0 820 660" xmlns="http://www.w3.org/2000/svg" style="max-width:820px;display:block;margin:0 auto;">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </marker>
        </defs>

        <!-- ── USER / FRONTEND ── -->
        <rect x="260" y="16" width="300" height="48" rx="8" fill="#0d1117" stroke="#1e2530" stroke-width="1"/>
        <text x="410" y="37" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#8a95a3" font-weight="700" letter-spacing="0.1em">USER / FRONTEND</text>
        <text x="410" y="53" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">POST /api/v1/issues/run</text>

        <!-- arrow down -->
        <line x1="410" y1="64" x2="410" y2="102" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>

        <!-- ── FASTAPI BOX ── -->
        <rect x="80" y="104" width="660" height="160" rx="10" fill="#0d1117" stroke="#1e2530" stroke-width="1"/>
        <text x="410" y="124" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#009688" font-weight="700" letter-spacing="0.1em">FASTAPI BACKEND</text>

        <!-- 3 route boxes -->
        <rect x="104" y="136" width="180" height="52" rx="6" fill="#111318" stroke="#252d3a" stroke-width="1"/>
        <text x="194" y="157" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4d9fff" font-weight="700">/issues/run</text>
        <text x="194" y="173" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">POST 202</text>

        <rect x="320" y="136" width="180" height="52" rx="6" fill="#111318" stroke="#252d3a" stroke-width="1"/>
        <text x="410" y="157" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4d9fff" font-weight="700">/runs/{id}</text>
        <text x="410" y="173" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">GET status</text>

        <rect x="536" y="136" width="180" height="52" rx="6" fill="#111318" stroke="#252d3a" stroke-width="1"/>
        <text x="626" y="157" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4d9fff" font-weight="700">/runs/{id}/stream</text>
        <text x="626" y="173" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">SSE live updates</text>

        <!-- run store bar -->
        <rect x="104" y="204" width="612" height="44" rx="6" fill="#111318" stroke="#252d3a" stroke-width="1"/>
        <text x="410" y="221" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#8a95a3" font-weight="700">RUN STORE</text>
        <text x="410" y="237" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">pending → running → completed / failed</text>

        <!-- arrow down from FastAPI -->
        <line x1="410" y1="264" x2="410" y2="302" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>
        <text x="430" y="287" font-family="'Space Mono',monospace" font-size="10" fill="#4a5568">BackgroundTask</text>

        <!-- ── LANGGRAPH BOX ── -->
        <rect x="80" y="304" width="660" height="268" rx="10" fill="#0d1117" stroke="#1e2530" stroke-width="1"/>
        <text x="410" y="324" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#FF6B35" font-weight="700" letter-spacing="0.1em">LANGGRAPH STATEGRAPH</text>

        <!-- AgentState bar -->
        <rect x="104" y="334" width="612" height="36" rx="6" fill="#111318" stroke="#252d3a" stroke-width="1"/>
        <text x="410" y="348" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#f59e0b">AgentState</text>
        <text x="410" y="362" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#4a5568">issue · repo_path · relevant_files · code_context · plan · patch · tests · pr_url · error</text>

        <!-- Agent nodes row -->
        <!-- Agent 01 -->
        <rect x="96" y="388" width="112" height="68" rx="6" fill="#111318" stroke="#4d9fff" stroke-width="1"/>
        <text x="152" y="408" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#4d9fff">AGENT 01</text>
        <text x="152" y="424" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#e8edf5" font-weight="600">Code Reader</text>
        <text x="152" y="440" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">finds relevant</text>
        <text x="152" y="452" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">files</text>

        <!-- Agent 02 -->
        <rect x="228" y="388" width="112" height="68" rx="6" fill="#111318" stroke="#a78bfa" stroke-width="1"/>
        <text x="284" y="408" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#a78bfa">AGENT 02</text>
        <text x="284" y="424" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#e8edf5" font-weight="600">Planner</text>
        <text x="284" y="440" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">step-by-step</text>
        <text x="284" y="452" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">fix plan</text>

        <!-- Agent 03 -->
        <rect x="360" y="388" width="112" height="68" rx="6" fill="#111318" stroke="#00e5a0" stroke-width="1"/>
        <text x="416" y="408" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#00e5a0">AGENT 03</text>
        <text x="416" y="424" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#e8edf5" font-weight="600">Code Writer</text>
        <text x="416" y="440" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">writes actual</text>
        <text x="416" y="452" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">code changes</text>

        <!-- Agent 04 -->
        <rect x="492" y="388" width="112" height="68" rx="6" fill="#111318" stroke="#f59e0b" stroke-width="1"/>
        <text x="548" y="408" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#f59e0b">AGENT 04</text>
        <text x="548" y="424" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#e8edf5" font-weight="600">Test Writer</text>
        <text x="548" y="440" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">pytest test</text>
        <text x="548" y="452" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">cases</text>

        <!-- Agent 05 -->
        <rect x="624" y="388" width="112" height="68" rx="6" fill="#111318" stroke="#ff6b6b" stroke-width="1"/>
        <text x="680" y="408" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#ff6b6b">AGENT 05</text>
        <text x="680" y="424" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#e8edf5" font-weight="600">PR Opener</text>
        <text x="680" y="440" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">opens github</text>
        <text x="680" y="452" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">pull request</text>

        <!-- arrows between agents -->
        <line x1="208" y1="422" x2="226" y2="422" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="340" y1="422" x2="358" y2="422" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="472" y1="422" x2="490" y2="422" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="604" y1="422" x2="622" y2="422" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>

        <!-- conditional edge label -->
        <text x="152" y="476" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">conditional →</text>
        <text x="152" y="486" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8" fill="#4a5568">end if no files</text>

        <!-- START label -->
        <rect x="96" y="500" width="112" height="24" rx="4" fill="#00e5a010" stroke="#00e5a030" stroke-width="1"/>
        <text x="152" y="516" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#00e5a0">START → END flow</text>

        <!-- ── GITHUB ── -->
        <line x1="680" y1="572" x2="680" y2="604" stroke="#1e2530" stroke-width="1.5" marker-end="url(#arr)"/>

        <rect x="600" y="606" width="160" height="48" rx="8" fill="#0d1117" stroke="#a78bfa50" stroke-width="1"/>
        <text x="680" y="626" text-anchor="middle" font-family="'Space Mono',monospace" font-size="10" fill="#a78bfa" font-weight="700">GITHUB API</text>
        <text x="680" y="642" text-anchor="middle" font-family="'Space Mono',monospace" font-size="9" fill="#4a5568">branch · commit · PR ✓</text>
      </svg>
    </div>
  </div>

  <div class="divider"></div>

  <!-- WORKFLOW -->
  <div class="section">
    <div class="section-label">How it works</div>
    <h2>The Pipeline</h2>

    <div class="workflow">
      <div class="wf-step">
        <div class="wf-num c1">01</div>
        <div class="wf-body">
          <div class="wf-agent" style="color:var(--blue)">Code Reader</div>
          <div class="wf-title">Scans the codebase</div>
          <p class="wf-desc">Lists every file in the repository, shows the LLM the file tree alongside the issue, and asks it to identify the 5 most relevant files. Reads those files and stitches their content into a shared <code>code_context</code>.</p>
        </div>
      </div>
      <div class="wf-step">
        <div class="wf-num c2">02</div>
        <div class="wf-body">
          <div class="wf-agent" style="color:var(--purple)">Planner</div>
          <div class="wf-title">Writes the fix strategy</div>
          <p class="wf-desc">Receives the issue and code context. Returns a numbered, step-by-step plan referencing exact function names, file paths, and line numbers. No code yet — just the plan.</p>
        </div>
      </div>
      <div class="wf-step">
        <div class="wf-num c3">03</div>
        <div class="wf-body">
          <div class="wf-agent" style="color:var(--green)">Code Writer</div>
          <div class="wf-title">Implements the changes</div>
          <p class="wf-desc">Follows the plan and writes the full updated content of every file that needs changing. Output is structured as <code># FILE: &lt;path&gt;</code> sections for easy parsing.</p>
        </div>
      </div>
      <div class="wf-step">
        <div class="wf-num c4">04</div>
        <div class="wf-body">
          <div class="wf-agent" style="color:var(--amber)">Test Writer</div>
          <div class="wf-title">Writes the tests</div>
          <p class="wf-desc">Receives the patch and writes <code>pytest</code> test cases — at minimum one test confirming the fix works and one edge case test.</p>
        </div>
      </div>
      <div class="wf-step">
        <div class="wf-num c5">05</div>
        <div class="wf-body">
          <div class="wf-agent" style="color:var(--coral)">PR Opener</div>
          <div class="wf-title">Ships the Pull Request</div>
          <p class="wf-desc">Creates a new branch (<code>autopr/&lt;issue-slug&gt;</code>), commits every changed file, and opens a Pull Request with the plan as the description — ready for your review.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- TECH STACK -->
  <div class="section">
    <div class="section-label">Built with</div>
    <h2>Tech Stack</h2>
    <table class="tech-table">
      <tr>
        <th>Layer</th>
        <th>Technology</th>
        <th>Why</th>
      </tr>
      <tr>
        <td>Agent Orchestration</td>
        <td><span class="pill" style="color:#FF6B35;border-color:#FF6B3540;background:#FF6B3512;">LangGraph StateGraph</span></td>
        <td>Deterministic node routing with conditional edges and shared state</td>
      </tr>
      <tr>
        <td>LLM Inference</td>
        <td><span class="pill" style="color:#e8edf5;border-color:#e8edf520;background:#e8edf508;">Ollama / llama3</span></td>
        <td>Fully local, no API costs, works offline</td>
      </tr>
      <tr>
        <td>Backend Framework</td>
        <td><span class="pill" style="color:#009688;border-color:#00968840;background:#00968812;">FastAPI + Uvicorn</span></td>
        <td>Async, background tasks, auto-generated API docs</td>
      </tr>
      <tr>
        <td>Data Validation</td>
        <td><span class="pill" style="color:#4d9fff;border-color:#4d9fff40;background:#4d9fff12;">Pydantic v2</span></td>
        <td>Type-safe request/response models with zero boilerplate</td>
      </tr>
      <tr>
        <td>GitHub Integration</td>
        <td><span class="pill" style="color:#a78bfa;border-color:#a78bfa40;background:#a78bfa12;">PyGithub</span></td>
        <td>Branch creation, file commits, Pull Request API</td>
      </tr>
      <tr>
        <td>Live Updates</td>
        <td><span class="pill" style="color:#f59e0b;border-color:#f59e0b40;background:#f59e0b12;">SSE Streaming</span></td>
        <td>Push updates to frontend without polling</td>
      </tr>
      <tr>
        <td>Containerization</td>
        <td><span class="pill" style="color:#2496ED;border-color:#2496ED40;background:#2496ED12;">Docker Compose</span></td>
        <td>Single command to run the full stack</td>
      </tr>
    </table>
  </div>

  <div class="divider"></div>

  <!-- QUICKSTART -->
  <div class="section">
    <div class="section-label">Get started</div>
    <h2>Quickstart</h2>
    <pre><span style="color:#4a5568"># 1. clone and install</span>
git clone https://github.com/yourusername/AutoPR.git
cd AutoPR/backend && pip install -r requirements.txt

<span style="color:#4a5568"># 2. pull the model</span>
ollama pull llama3

<span style="color:#4a5568"># 3. configure</span>
cp .env.example .env   <span style="color:#4a5568"># add GITHUB_TOKEN + GITHUB_REPO</span>

<span style="color:#4a5568"># 4. run</span>
uvicorn backend.main:app --reload

<span style="color:#4a5568"># API docs → http://localhost:8000/docs</span></pre>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <span>AutoPR</span> — built to get you out of the "toy project" category ⚡
  </div>

</div>
</body>
</html>
