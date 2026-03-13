import os

def list_repo_files(repo_path):

    file_list = []

    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if file.endswith([".py", ".js", ".java", ".cpp", ".c", ".h", ".ts", ".go", ".yaml"]):
                file_list.append(os.path.join(root, file))

    return file_list

def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"