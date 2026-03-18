import ollama 
from backend.core.config import settings

def code_writer(state: dict) -> dict:
    """
    AGENT 03 — Code Writer
 
    What it does:
    - Reads the plan from Agent 02 + the original code context
    - Writes the actual code changes needed to fix the issue
    - Returns the patch in unified diff format (like a real git diff)
    - Returns: patch
    """
    issue = state["issue"]
    plan = state["plan"]
    code_context = state["code_context"]
    relevant_files = state["relevant_files"]
 
    prompt = f"""You are a senior software engineer implementing a code fix.
 
ISSUE:
{issue}
 
PLAN TO FOLLOW:
{plan}
 
CURRENT CODE:
{code_context}
 
Your task:
Implement the fix by writing the complete updated version of each file that needs changes.
 
Rules:
- Write the FULL file content, not just the changed lines.
- Start each file with a comment: # FILE: <filepath>
- If multiple files need changes, separate them clearly.
- Do not add any explanation outside the code.
- Do not use markdown code blocks.
 
Example output:
# FILE: src/auth/login.py
import os
...rest of the complete file...
"""
 
    response = ollama.chat(
        model=settings.OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}]
    )
 
    patch = response["message"]["content"].strip()
 
    return {"patch": patch}
 
