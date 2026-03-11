import ollama
from backend.tools.file_tools import list_repo_files


def code_reader(issue, repo_path):

    files = list_repo_files(repo_path)
    
    # limit file list so prompt doesn't explode
    preview = "\n".join(files[:20])

    prompt = f"""
You are a senior software engineer analyzing a repository.

A GitHub issue has been reported:

{issue}

Here is a list of files in the repository:

{preview}

Your task:

1. Identify which files are most likely related to the issue.
2. Explain why those files are relevant.
3. Suggest which file should be inspected first.

Be concise and technical.
"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]