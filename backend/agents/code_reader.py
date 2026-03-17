import ollama
from backend.tools.file_tools import list_repo_files,read_file
from backend.core.config import settings


def code_reader(state: dict) -> dict:
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

    code_context_parts = []
    for file_path in relevant_files:
        content = read_file(file_path)
        code_context_parts.append(f"### FILE: {file_path}\n{content}\n")
 
    code_context = "\n".join(code_context_parts)
 
    return {
        "repo_files": all_files,
        "relevant_files": relevant_files,
        "code_context": code_context,
    }
 
def _parse_file_list(raw: str, all_files: list) -> list:
    """
    Safely parse the LLM's response into a list of valid file paths.
    Falls back to the first 3 files if parsing fails.
    """
    import ast
    try:
        parsed = ast.literal_eval(raw)
        if isinstance(parsed, list):
            # only keep paths that actually exist in the repo
            return [f for f in parsed if f in all_files][:5]
    except Exception:
        pass
 
    # fallback — pick first 3 files if LLM gave garbage output
    return all_files[:3]
 