import ollama
from backend.tools.file_tools import list_repo_files,read_files
from backend.core.config import settings


def code_reader(state: dict) -> dict:
    """
    AGENT 01 — Code Reader
 
    What it does:
    1. Lists every file in the repo
    2. Shows the LLM the file list + the issue
    3. LLM picks which files are most relevant
    4. Reads those files and stitches their content together
    5. Returns: repo_files, relevant_files, code_context
    """
    issue = state["issue"]
    repo_path = state["repo_path"]
 
    # Step 1: list all files in the repo
    all_files = list_repo_files(repo_path)
 
    # only show the LLM the first 60 files so the prompt doesn't get too long
    preview = "\n".join(all_files[:60])
 
    prompt = f"""You are a senior software engineer analyzing a repository.
 
A GitHub issue has been reported:
{issue}
 
Here is a list of files in the repository:
{preview}
 
Your task:
1. Identify which files are MOST likely related to this issue (max 5 files).
2. Return ONLY a Python list of file paths, exactly as they appear above.
3. No explanation. No markdown. Just the list.
 
Example output:
["src/auth/login.py", "src/utils/validator.py"]
"""
 
    response = ollama.chat(
        model=settings.OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}]
    )
 
    raw = response["message"]["content"].strip()
 
    # parse the list the LLM returned — safely
    relevant_files = _parse_file_list(raw, all_files)