"""
This file retrieves the most relevant code
chunks for a particular issue 

Embeds the issue text using embedding model
Queries ChromaDB for the top-K most relevant chunks
Returns the chunks associated with files to pass to agents
"""

import google.generativeai as genai
from collections import defaultdict
 
from backend.retrieval.indexer import get_chroma_client, _collection_name, index_repo
from backend.core.config import settings
 
genai.configure(api_key=settings.GOOGLE_API_KEY)
 
 
def _embed_query(text: str) -> list[float]:
    """
    Embeds a single query string.
    Uses task_type='retrieval_query' — different from 'retrieval_document'
    used during indexing.
    """
    result = genai.embed_content(
        model=settings.GOOGLE_EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_query",
    )
    return result["embedding"]
 
 
def retrieve_relevant_chunks(
    issue: str,
    repo_path: str,
    top_k: int = 8,
) -> dict:
    """
    Main entry point for retrieval.
    Args:
        issue:     the GitHub issue description (plain English)
        repo_path: path to the repo (must already be indexed)
        top_k:     number of chunks to retrieve
    Returns:
        {
            "relevant_files":  ["path/to/file.py", ...],   # unique file paths
            "code_context":    "### FILE: ...\n<content>",  # stitched context
            "chunks":          [{"file": ..., "content": ...}, ...]
        }
    """
    client          = get_chroma_client()
    collection_name = _collection_name(repo_path)
 
    # auto-index if not indexed yet
    existing = [c.name for c in client.list_collections()]
    if collection_name not in existing:
        index_repo(repo_path)
 
    collection   = client.get_collection(collection_name)
    query_vector = _embed_query(issue)
 
    results = collection.query(
        query_embeddings=[query_vector],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )
 
    if not results["ids"][0]:
        return {"relevant_files": [], "code_context": "", "chunks": []}
 
    # group chunks by file
    file_chunks = defaultdict(list)
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        file_path = meta["file_path"]
        file_chunks[file_path].append(doc)
 
    # build context string — each file gets a header
    context_parts   = []
    relevant_files  = list(file_chunks.keys())
 
    for file_path, chunks in file_chunks.items():
        combined = "\n...\n".join(chunks)
        context_parts.append(f"### FILE: {file_path}\n{combined}\n")
 
    code_context = "\n".join(context_parts)
 
    return {
        "relevant_files": relevant_files,
        "code_context":   code_context,
        "chunks": [
            {"file": meta["file_path"], "content": doc}
            for doc, meta in zip(results["documents"][0], results["metadatas"][0])
        ],
    }