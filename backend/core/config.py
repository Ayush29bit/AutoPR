from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "AutoPR"
    
    # Groq LLM
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama3-8b-8192"  

    # Google Embeddings
    GOOGLE_API_KEY: str = ""
    GOOGLE_EMBEDDING_MODEL: str = "models/text-embedding-004"

    # GITHUB INTEGRATION
    GITHUB_TOKEN: str = ""
    GITHUB_REPO: str = ""    

    # CHROMA DB LOCAL
    CHROMA_PERSIST_DIR: str = "./chroma_db"    
 
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    LOG_LEVEL: str = "INFO"
 
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
 
settings = Settings()
