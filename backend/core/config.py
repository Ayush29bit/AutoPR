from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "AutoPR"
    
    # Groq LLM
    GROQ_API_KEY: str = "GROQ_API_KEY"
    GROQ_MODEL: str = "openai/gpt-oss-20b"

    # Google Embeddings
    GOOGLE_API_KEY: str = "GOOGLE_API_KEY"
    GOOGLE_EMBEDDING_MODEL: str = "gemini-embedding-001"

    # GITHUB INTEGRATION
    GITHUB_TOKEN: str = "GITHUB_TOKEN"
    GITHUB_REPO: str = "GITHUB_REPO"

    # CHROMA DB LOCAL
    CHROMA_PERSIST_DIR: str = "./chroma_db"    
 
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    LOG_LEVEL: str = "INFO"
 
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
 
settings = Settings()
