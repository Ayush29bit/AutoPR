from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime 
from enum import Enum 

class RunState(str,Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class AgentStep(str, Enum):
    CODE_READER = "CODE_READER"
    PLANNER = "PLANNER"
    CODE_WRITER = "CODE_WRITER"
    TEST_WRITER = "TEST_WRITER"
    PR_OPENER = "PR_OPENER"

class CreateRunRequest(BaseModel):
    issue : str = Field(..., min_lenghth=10, max_length=1000, description="The GitHub issue to be addressed")
    repo_path:str=Field(..., description="The absolute path to the local repository")
    Github_repo_url: Optional[str] = Field(None, description="The URL of the GitHub repository")
    Github_token :Optional[str]=Field(None, description="The GitHub token for authentication")

class AgentProgress(BaseModel):
    run_id:str
    step: AgentStep
    status:str
    output:Optional[str]=None
    error:Optional[str]=None
    timestamp:datetime = Field(default_factory=datetime.utcnow)

class RunStatus(BaseModel):
    run_id:str
    state:RunState
    repo_path:str
    issue:str
    created_at:datetime
    completed_at:Optional[datetime]=None
    relevant_files: Optional[List[str]] = None
    plan: Optional[str] = None
    patch: Optional[str] = None
    tests: Optional[str] = None
    pr_url: Optional[str] = None
    error: Optional[str] = None
