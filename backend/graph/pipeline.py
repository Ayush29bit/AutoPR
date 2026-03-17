from langgraph import StateGraph, END
from backend.agents.code_reader import code_reader
from backend.agents.planner import planner
from backend.agents.code_writer import code_write
from backend.agents.test_writer import test_writer
from backend.agents.pr_opener import pr_opener
from backend.state.agent_state import AgentState

def node_code_reader(state:AgentState)-> AgentState:
    try:
        return code_reader(state)
    except Exception as e:
        return {"error": f"code_reader failed: {str(e)}"}

def node_planner(state: AgentState) -> AgentState:
    try:
        return planner(state)
    except Exception as e:
        return {"error": f"planner failed: {str(e)}"}
 
 
def node_code_writer(state: AgentState) -> AgentState:
    try:
        return code_writer(state)
    except Exception as e:
        return {"error": f"code_writer failed: {str(e)}"}
 
 
def node_test_writer(state: AgentState) -> AgentState:
    try:
        return test_writer(state)
    except Exception as e:
        return {"error": f"test_writer failed: {str(e)}"}
 
def node_pr_opener(state: AgentState) -> AgentState:
    try:
        return pr_opener(state)
    except Exception as e:
        return {"error": f"pr_opener failed: {str(e)}"}

def should_continue_after_reader(state: AgentState) -> str:
    if state.get("error"):
        return "end"
    if not state.get("relevant_files"):
        return "end"
    return "continue"

def build_graph():
    graph = StateGraph(AgentState)
 
    graph.add_node("code_reader", node_code_reader)
    graph.add_node("planner",     node_planner)
    graph.add_node("code_writer", node_code_writer)
    graph.add_node("test_writer", node_test_writer)
    graph.add_node("pr_opener",   node_pr_opener)
 
    graph.set_entry_point("code_reader")
 
    graph.add_conditional_edges(
        "code_reader",
        should_continue_after_reader,
        {
            "continue": "planner",
            "end": END,
        }
    )
 
    graph.add_edge("planner",     "code_writer")
    graph.add_edge("code_writer", "test_writer")
    graph.add_edge("test_writer", "pr_opener")
    graph.add_edge("pr_opener",   END)
 
    return graph.compile()

def run_graph(
    run_id: str,
    issue: str,
    repo_path: str,
    github_repo: str = "",
    github_token: str = "",
) -> dict:
    graph = build_graph()
 
    initial_state: AgentState = {
        "issue": issue,
        "repo_path": repo_path,
        "github_repo": github_repo,
        "github_token": github_token,
        "repo_files": [],
        "relevant_files": [],
        "code_context": "",
        "plan": "",
        "patch": "",
        "tests": "",
        "pr_url": None,
        "error": None,
    }
 
    final_state = graph.invoke(initial_state)
    return dict(final_state) 
 
 


