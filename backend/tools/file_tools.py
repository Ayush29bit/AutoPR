import os

supported_extensions = { ".py", ".js", ".ts", ".jsx", ".tsx",
    ".go", ".java", ".rb", ".rs",
    ".yaml", ".yml", ".json", ".toml",
    ".md", ".env.example"}

ignored_dirs={
     "__pycache__", ".git", "node_modules",
    ".venv", "venv", "env", "dist", "build",
    ".mypy_cache", ".pytest_cache",
}

def list_repo_files(repo_path:str) -> list[str]:
    """
    Walks the repo and returns all files with supported extensions.
    Skips ignored directories.
    """
    file_list = []

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        for file in files:
            _, ext = os.path.splitext(file)
            if ext in supported_extensions:
                file_list.append(os.path.join(root, file))

    return file_list

def read_file(file_path:str) -> str:
    """
    Reads and returns the content of a file.
    Returns an error string if the file can't be read.
    Truncates files over 300 lines to avoid overwhelming the LLM context.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.readlines()
        
        
        if len(lines) > 300:
            truncated = lines[:300]
            truncated.append(f"\n... (truncated — {len(lines) - 300} more lines)")
            return "".join(truncated)
 
        return "".join(lines)
    
    except Exception as e:
        return f"Error reading file: {str(e)}"
    
