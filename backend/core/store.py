import uuid 
from datetime import datetime 
from typing import Optional, Dict, Any
from backend.api.schema import RunStatus, RunState

_runs: Dict[str, RunState] = {}
 
 
def create_run(issue: str, repo_path: str) -> RunState:
    run_id = str(uuid.uuid4())
    record = RunState(
        run_id=run_id,
        issue=issue,
        repo_path=repo_path,
        status=RunStatus.PENDING,
        created_at=datetime.utcnow(),
    )
    _runs[run_id] = record
    return record
 
 
def get_run(run_id: str) -> Optional[RunState]:
    return _runs.get(run_id)
 
 
def update_run(run_id: str, **kwargs) -> Optional[RunState]:
    record = _runs.get(run_id)
    if not record:
        return None
    updated = record.model_copy(update=kwargs)
    _runs[run_id] = updated
    return updated
 
 
def list_runs() -> list[RunState]:
    return sorted(_runs.values(), key=lambda r: r.created_at, reverse=True)