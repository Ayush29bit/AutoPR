import ollama
from backend.tools.file_tools import list_repo_files, read_file


REPO_PATH =  "D:/91878/Documents/AutoPR"


def analyze_issue(issue_text):

    files = list_repo_files(REPO_PATH)

    # only show a few files to the model
    files_preview = "\n".join(files[:10])

    prompt = f"""
You are a senior software engineer.

A GitHub issue has been reported:

{issue_text}

Here are some files in the repository:

{files_preview}

Which file is most likely related to the issue?
Explain your reasoning.
"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]


def main():

    print("AutoPR Stage 2 — Repository Aware Agent\n")

    issue = input("Enter GitHub issue description:\n")

    print("\nAnalyzing repository...\n")

    result = analyze_issue(issue)

    print(result)


if __name__ == "__main__":
    main()