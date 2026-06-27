import os

# Supported file extensions fpr code files.
# Covers the vast majority of real-world codebases.
# Grouped by language family for readability.

SUPPORTED_EXTENSIONS = {
    # Python
    ".py", ".pyi",
    # JavaScript / TypeScript
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
    # Go
    ".go",
    # Java / Kotlin / Scala
    ".java", ".kt", ".kts", ".scala",
    # C / C++ / C#
    ".c", ".h", ".cpp", ".hpp", ".cs",
    # Rust
    ".rs",
    # Ruby
    ".rb", ".erb",
    # PHP
    ".php",
    # Swift
    ".swift",
    # Shell
    ".sh", ".bash", ".zsh", ".fish",
    # Web
    ".html", ".htm", ".css", ".scss", ".sass",
    # Config / Infrastructure
    ".yaml", ".yml", ".json", ".toml", ".ini",
    ".env.example", ".tf", ".hcl",
    # Docs
    ".md", ".mdx", ".rst", ".txt",
    # Docker / CI
    "Dockerfile", ".dockerignore",
    ".github",
}

IGNORED_DIRS = {
    "__pycache__", ".git", ".svn", ".hg",
    "node_modules", ".npm",
    ".venv", "venv", "env", ".env",
    "dist", "build", "out", "target", "bin", "obj",
    ".mypy_cache", ".pytest_cache", ".ruff_cache",
    ".idea", ".vscode",
    "coverage", ".nyc_output",
    "vendor",                          # Go, PHP
    "Pods",                            # iOS
    ".gradle", ".mvn",                 # Java
}

def list_repo_files(repo_path:str) -> list[str]:
    """
    Walks the repo and returns all files with supported extensions.
    Skips ignored directories.
    """
    file_list = []

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        for file in files:
            _, ext = os.path.splitext(file)
            if ext in SUPPORTED_EXTENSIONS or file in SUPPORTED_EXTENSIONS:
                file_list.append(os.path.join(root, file))

    return file_list

IGNORED_FILES = {
    "package-lock.json", "yarn.lock", "pnpm-lock.yaml",
    "poetry.lock", "Pipfile.lock", "Gemfile.lock",
    "Cargo.lock", "go.sum",
}

def list_repo_files(repo_path: str) -> list[str]:
    """
    Walks the repo and returns all relevant source files.
    Language-agnostic — works on Python, Go, JS, Rust, Java, etc.
    Normalizes all paths to forward slashes for cross-platform consistency.
    """
    file_list = []
 
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
 
        for file in files:
            if file in IGNORED_FILES:
                continue

            _, ext = os.path.splitext(file)
 
            # match by extension OR by exact filename (e.g. "Dockerfile")
            if ext in SUPPORTED_EXTENSIONS or file in SUPPORTED_EXTENSIONS:
                full_path = os.path.join(root, file)
                # normalize to forward slashes — consistent across Windows/Linux/Mac
                normalized = full_path.replace("\\", "/")
                file_list.append(normalized)
 
    return sorted(file_list)

def read_file(file_path:str) -> str:
    """
    Reads and returns the content of a file.
    Returns an error string if the file can't be read.
    Truncates files over 300 lines to avoid overwhelming the LLM context.
    """
    try: 
       try:
           with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
        
       except UnicodeDecodeError:
            with open(file_path, "r", encoding="latin-1") as f:
                lines = f.readlines()
        
       total = len(lines)

       if total <= 500:
            return "".join(lines)
       
       if total<=1000:
            head = lines[:400]
            tail = lines[-100:]
            notice = f"\n... (truncated — {total - 500} more lines)"
            return "".join(head) + notice + "".join(tail)
       
       head = lines[:300]
       tail = lines[-100:]
       notice = f"\n\n... [{total - 350} lines omitted — file has {total} total lines] ...\n\n"
       return "".join(head) + notice + "".join(tail)
    
    except Exception as e:
        return f"Error reading file: {str(e)}"
    
def normalize_path(path:str)->str:
    """
    Normalizes a file path to use forward slashes.
    Ensures consistent behavior across Windows, Linux, and Mac.
    """
    return path.replace("\\", "/")