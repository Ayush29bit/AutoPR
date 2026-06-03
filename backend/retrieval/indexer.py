"""
This module indexes a repository into chormadb for vector search 

Goes through all files in the repo 
Splits each file into overlapping chunks 
Embeds chunk using embedding models
Stores chunks and embeddings in a local chromadb collection
"""
import os
import re
import hashlib
import chromadb
import google.generativeai as genai
 
from backend.tools.file_tools import list_repo_files, read_file
from backend.core.config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)
 
# ChromaDB client 
_chroma_client = None
 
 
def get_chroma_client() -> chromadb.PersistentClient:
    global _chroma_client
    if _chroma_client is None:
        _chroma_client = chromadb.PersistentClient(
            path=settings.CHROMA_PERSIST_DIR
        )
    return _chroma_client
 
 
def _collection_name(repo_path: str) -> str:
    """
    Creates a stable, safe collection name from the repo path.
    ChromaDB collection names must be 3-63 chars, alphanumeric + hyphens.
    """
    h = hashlib.md5(repo_path.encode()).hexdigest()[:12]
    return f"repo-{h}"
 
 
def _chunk_text(text: str, chunk_size: int = 400, overlap: int = 50) -> list[str]:
    """
    Splits text into overlapping chunks by approximate token count.
    We estimate 1 token ≈ 4 characters (rough but sufficient).
 
    Why overlap? If a relevant piece of logic sits at a chunk boundary,
    it appears in both chunks and still gets retrieved.
    """
    char_size    = chunk_size * 4
    char_overlap = overlap * 4
 
    chunks = []
    start  = 0
 
    while start < len(text):
        end = start + char_size
        chunks.append(text[start:end])
        start += char_size - char_overlap
 
    return [c.strip() for c in chunks if c.strip()]
 
 
def _embed_texts(texts: list[str]) -> list[list[float]]:
    """
    Embeds a list of strings using Google text-embedding-004.
    Batches into groups of 100 (Google API limit per request).
    """
    embeddings = []
    batch_size = 100
 
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        result = genai.embed_content(
            model=settings.GOOGLE_EMBEDDING_MODEL,
            content=batch,
            task_type="retrieval_document",
        )
        embeddings.extend(result["embedding"])
 
    return embeddings
 
 
def index_repo(repo_path: str, force: bool = False) -> dict:
    """
    Main entry point. Indexes the entire repo into ChromaDB.
 
    Args:
        repo_path: absolute path to the local repo
        force: if True, re-indexes even if collection already exists
 
    Returns dict with stats: files_indexed, chunks_created
    """
    client          = get_chroma_client()
    collection_name = _collection_name(repo_path)
 
    # check if already indexed
    existing = [c.name for c in client.list_collections()]
    if collection_name in existing and not force:
        collection = client.get_collection(collection_name)
        return {
            "status":        "already_indexed",
            "collection":    collection_name,
            "total_chunks":  collection.count(),
        }
 
    # delete old collection if force re-indexing
    if collection_name in existing:
        client.delete_collection(collection_name)
 
    collection = client.create_collection(
        name=collection_name,
        metadata={"repo_path": repo_path},
    )
 
    all_files     = list_repo_files(repo_path)
    all_chunks    = []
    all_ids       = []
    all_metadatas = []
 
    for file_path in all_files:
        content = read_file(file_path)
        if not content or content.startswith("Error reading"):
            continue
 
        chunks = _chunk_text(content)
 
        for i, chunk in enumerate(chunks):
            chunk_id = hashlib.md5(f"{file_path}:{i}:{chunk[:50]}".encode()).hexdigest()
            all_chunks.append(chunk)
            all_ids.append(chunk_id)
            all_metadatas.append({
                "file_path":   file_path,
                "chunk_index": i,
                "repo_path":   repo_path,
            })
 
    if not all_chunks:
        return {"status": "no_files_found", "files_indexed": 0, "chunks_created": 0}
 
    embeddings = _embed_texts(all_chunks)
 
    batch_size = 500
    for i in range(0, len(all_chunks), batch_size):
        collection.add(
            documents=embeddings[i : i + batch_size],   # storing embeddings as documents
            ids=all_ids[i : i + batch_size],
            metadatas=all_metadatas[i : i + batch_size],
        )
 
    return {
        "status":        "indexed",
        "collection":    collection_name,
        "files_indexed": len(all_files),
        "chunks_created": len(all_chunks),
    }
 
