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