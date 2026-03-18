import ollama
from backend.core.config import settings

def test_writer(state: dict) -> dict:
    """
    AGENT 04 — Test Writer
 
    What it does:
    - Reads the plan from Agent 02 + the original code context
    - Writes tests that would verify the fix works and prevent regressions
    - Returns the test code in unified diff format (like a real git diff)
    - Returns: test_patch
    """
    issue = state["issue"]
    plan = state["plan"]
    patch = state["patch"]
 
    prompt = f"""You are a senior software engineer writing tests for a bug fix.
    ISSUE THAT WAS FIXED:
{issue}
 
THE FIX THAT WAS APPLIED:
{patch}
 
Your task:
Write pytest test cases that verify this fix works correctly.
 
Rules:
- Use pytest style (def test_...).
- Write at least 2 tests: one that confirms the bug is fixed, one edge case.
- Use mocks where needed (from unittest.mock import patch, MagicMock).
- Start the file with: # FILE: tests/test_fix.py
- Do not use markdown code blocks.
- Do not add explanation outside the code.
 
Example format:
# FILE: tests/test_fix.py
import pytest
from unittest.mock import patch, MagicMock
 
def test_fix_resolves_issue():
    ...
 
def test_edge_case():
    ...
"""
    response = ollama.chat(
        model=settings.OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}]
    )
 
    tests = response["message"]["content"].strip()
 
    return {"tests": tests}

