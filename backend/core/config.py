from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "AutoPR"
    
    OLLAMA_MODEL: str = "llama3"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
 
    GITHUB_TOKEN: str = ""
    GITHUB_REPO: str = ""        
 
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    LOG_LEVEL: str = "INFO"
 
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
 
settings = Settings()
