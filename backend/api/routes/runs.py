import asyncio
import json 
from fastapi import APIRouter, BackgroundTasks, HTTPException
from fastapi.responses import StreamingResponse
from backend.api.schema import RunStatus, RunListResponse, RunDetailResponse
from backend.core.store import list_runs, get_run

router = APIRouter()

@router.get("/runs", response_model=RunListResponse)
async def list_all_runs():
    runs = list_runs()
    return RunListResponse(runs=runs)

@router.get("/runs/{run_id}", response_model=RunDetailResponse)
async def get_run_detail(run_id: str):
    record = get_run(run_id)
    if not record:
        raise HTTPException(status_code=404, detail="Run not found")
    return RunDetailResponse(**record.dict())

@router.get("/runs/{run_id}/stream")
async def stream_run(run_id: str):
    """
    Server-Sent Events endpoint.
    The frontend can connect here to receive live status updates
    without polling — the stream closes when the run finishes.
    """
    async def event_generator():
        while True:
            record = get_run(run_id)
            if not record:
                yield f"data: {json.dumps({'error': 'run not found'})}\n\n"
                break
 
            payload = record.model_dump(mode="json")
            yield f"data: {json.dumps(payload)}\n\n"
 
            if record.status in (RunStatus.COMPLETED, RunStatus.FAILED):
                break
 
            await asyncio.sleep(1.5)
 
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",      
        },
    )