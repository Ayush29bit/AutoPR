import ollama
from backend.core.config import settings

def planner(state: dict) -> dict:
    issue = state["issue"]
    code_context = state["code_context"]
    relevant_files = state["relevant_files"]

    prompt = f"""You are a senior software engineer tasked with fixing a GitHub issue.

    ISSUE:
{issue}
 
RELEVANT FILES:
{", ".join(relevant_files)}
 
CODE CONTEXT:
{code_context}
 
Your task:
Write a clear, numbered, step-by-step plan to fix this issue.
 
Rules:
- Be specific. Reference exact function names, file names, and line numbers if visible.
- Keep each step to one sentence.
- Do NOT write any code yet — just the plan.
- Maximum 8 steps.
 
Example format:
1. Identify the root cause in `auth/login.py` inside the `validate_token()` function.
2. Add a null check before accessing `token.user_id`.
3. Return a 401 response if the token is None.
"""
    
    response = ollama.chat(
        model=settings.OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}]
    )
 
    plan = response["message"]["content"].strip()
 
    return {"plan": plan}
 