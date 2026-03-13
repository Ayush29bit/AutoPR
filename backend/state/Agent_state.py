from typing import TypedDict, List 
class AgentState(TypedDict):
    issue: str
    repo_files: List[str]
    relevant_files: List[str]
    plan: str
    patch: str
    tests: str
    pr_url: str 
