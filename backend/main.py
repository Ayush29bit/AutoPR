from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import uvicorn
from contextlib import asynccontextmanager

from backend.api.routes import health, runs, issues, home
from backend.core.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"🚀 AutoPR backend starting — model: {settings.OLLAMA_MODEL}")
    yield
    print("🛑 AutoPR backend shutting down")

app = FastAPI(
    title = "AutoPR",
    description="Multi-agent system that resolves GitHub issues and opens Pull Requests",
    lifespan = lifespan

)


origins = ["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home.router,tags=["Home"])
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(runs.router, prefix="/api/v1", tags=["Runs"])
app.include_router(issues.router, prefix="/api/v1", tags=["Issues"])

if __name__=="__main__":
       uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)




