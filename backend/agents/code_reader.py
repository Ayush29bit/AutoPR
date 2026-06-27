import ast
from backend.tools.file_tools import list_repo_files,read_file,normalize_path
from backend.core.llm import chat 
from backend.retrieval.retriever import retrieve_relevant_chunks
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

    Primary path:  RAG — Google embeddings + ChromaDB find relevant chunks
    Fallback path: LLM picks from file list (if RAG returns nothing)
 
    Both paths normalize file paths to forward slashes so Windows paths
    with backslashes don't cause silent mismatches.
    """

    issue = state["issue"]
    repo_path = state["repo_path"]
    retrieval = retrieve_relevant_chunks(issue, repo_path, top_k=8)
    code_context = retrieval["code_context"]
 
    all_files = list_repo_files(repo_path)
    
    if not relevant_files:
        preview = "\n".join(all_files[:60])
 
        response = chat(
            system="You are a senior software engineer. Return only valid Python list syntax. No explanation.",
            prompt=f"""A GitHub issue has been reported:
{issue}
 
Repository files (language-agnostic — could be Python, Go, JS, Rust, etc.):
{preview}
 
Return ONLY a Python list of the 5 most relevant file paths, exactly as shown above.
Example: ["src/auth/login.go", "pkg/utils/validator.ts"]
""",
        )
 
        # normalize all paths before comparing
        # LLM might return backslashes on Windows, our list uses forward slashes
        normalized_all = {normalize_path(f): f for f in all_files}
 
        try:
            parsed = ast.literal_eval(response.strip())
            if isinstance(parsed, list):
                relevant_files = [
                    normalized_all.get(normalize_path(f))
                    for f in parsed
                    if normalize_path(f) in normalized_all
                ]
                relevant_files = [f for f in relevant_files if f][:5]
        except Exception:
            pass
 
        # fallback: if LLM returns nothing valid, just take the first 3 files
        if not relevant_files:
            relevant_files = all_files[:3]
 
        parts        = [f"### FILE: {f}\n{read_file(f)}\n" for f in relevant_files]
        code_context = "\n".join(parts)
 
    return {
        "repo_files":     all_files,
        "relevant_files": relevant_files,
        "code_context":   code_context,
    }
 