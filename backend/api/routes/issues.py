import asyncio
from datetime import datetime 
from fastapi import APIRouter, BackgroundTasks
from backend.api.schema import RunStatus, CreateRunRequest, CreateRunResponse
from backend.core.config import settings
from backend.core.store import create_run, update_run_status

router = APIRouter()

async def _run_pipeline(run_id:str, request: CreateRunRequest):
    from backend.graph.pipeline import run_pipeline 
    try:
        update_run_status(run_id, RunStatus.IN_PROGRESS)
        result = await asyncio.to_thread(
                  run_pipeline, 
                  run_id=run_id,
                    issue=request.issue,
                    repo_path=request.repo_path
                    github_token=settings.GITHUB_TOKEN or request.github_token
                    gtihub_repo=request.github_repo or settings.GITHUB_REPO
            )
        
        update_run_status(
            run_id,
            status=RunStatus.COMPLETED,
            completed_at=datetime.utcnow(),
            relevant_files=result.get("relevant_files"),
            plan=result.get("plan"),
            patch=result.get("patch"),
            tests=result.get("tests"),
            pr_url=result.get("pr_url"),
    
        )
    except Exception as exc:
        update_run_status(
            run_id,
            status=RunStatus.FAILED,
            completed_at=datetime.utcnow(),
            error=str(exc),
        )
 
 
@router.post("/issues/run", response_model=CreateRunResponse, status_code=202)
async def create_issue_run(
    request: CreateRunRequest,
    background_tasks: BackgroundTasks,):
    """
    Accepts a GitHub issue + repo path, kicks off the multi-agent pipeline
    in the background, and immediately returns a run_id for polling/streaming.
    """
    record = create_run(issue=request.issue, repo_path=request.repo_path)
    background_tasks.add_task(_run_pipeline, record.run_id, request)
 
    return CreateRunResponse(
        run_id=record.run_id,
        status=RunStatus.PENDING,
        message="Pipeline started. Poll /api/v1/runs/{run_id} for status.",
    )
 




