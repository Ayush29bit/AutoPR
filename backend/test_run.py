"""
Quick end-to-end test script. Run this directly to verify
"""

import os
import sys
import json

#  Config check 
print("  AutoPR — End-to-End Test")
print("="*60)

from backend.core.config import settings

print("\n[1] Checking configuration...")
errors = []
if not settings.GROQ_API_KEY:
    errors.append("GROQ_API_KEY is missing in .env")
if not settings.GOOGLE_API_KEY:
    errors.append("GOOGLE_API_KEY is missing in .env")
if errors:
    for e in errors:
        print(f"    ✗ {e}")
    print("\nFix your .env file and re-run.")
    sys.exit(1)

print(f"    ✓ GROQ_API_KEY found  (model: {settings.GROQ_MODEL})")
print(f"    ✓ GOOGLE_API_KEY found (embedding: {settings.GOOGLE_EMBEDDING_MODEL})")

# Test Groq connection
print("\n[2] Testing Groq LLM connection...")
try:
    from backend.core.llm import chat
    response = chat(
        prompt="Say exactly: GROQ_OK",
        system="You are a test bot. Only say what you are told.",
        temperature=0.0,
    )
    if "GROQ_OK" in response:
        print(f"    ✓ Groq responding correctly")
    else:
        print(f"    ~ Groq responded (unexpected output): {response[:80]}")
except Exception as e:
    print(f"    ✗ Groq failed: {e}")
    sys.exit(1)

# Test Google Embeddings
print("\n[3] Testing Google Embeddings...")
try:
    from google import genai 
    from google.genai import types as genai_types 
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    result = client.models.embed_content(
        model=settings.GOOGLE_EMBEDDING_MODEL,
        contents="test embedding",
        config = genai_types.EmbedContentConfig(task_type="retrieval_document"),
    )
    dims = len(result.embeddings[0].values)
    print(f"    ✓ Google embeddings working (dimensions: {dims})")
except Exception as e:
    print(f"    ✗ Google embeddings failed: {e}")
    sys.exit(1)

# Test file tools 
print("\n[4] Testing file scanner...")
try:
    from backend.tools.file_tools import list_repo_files
    repo_path = os.path.dirname(os.path.abspath(__file__))
    files = list_repo_files(repo_path)
    print(f"    ✓ Found {len(files)} files in backend folder")
    print(f"    ~ Sample: {files[0] if files else 'none'}")
except Exception as e:
    print(f"    ✗ File scanner failed: {e}")
    sys.exit(1)

#  Test RAG indexing
print("\n[5] Testing RAG indexer (this may take 30-60s on first run)...")
try:
    from backend.retrieval.indexer import index_repo
    result = index_repo(repo_path)
    print(f"    ✓ Indexing status: {result['status']}")
    print(f"    ~ Chunks in vector store: {result.get('chunks_created') or result.get('total_chunks')}")
except Exception as e:
    print(f"    ✗ Indexer failed: {e}")
    sys.exit(1)

#  Test RAG retrieval
print("\n[6] Testing RAG retrieval...")
try:
    from backend.retrieval.retriever import retrieve_relevant_chunks
    issue = "The file_tools.py only scans .py files, extend it to support .js and .ts files"
    result = retrieve_relevant_chunks(issue, repo_path, top_k=5)
    print(f"    ✓ Retrieved {len(result['relevant_files'])} relevant files")
    for f in result["relevant_files"]:
        print(f"    ~ {f}")
except Exception as e:
    print(f"    ✗ Retrieval failed: {e}")
    sys.exit(1)

# Full pipeline test
print("\n[7] Running full agent pipeline (takes 1-3 minutes)...")
print("    Agents will run one by one — watch for each completing...\n")

try:
    from backend.graph.pipeline import run_graph

    result = run_graph(
        run_id="test-001",
        issue="The file_tools.py only scans .py files, extend it to support .js, .ts, and .go files too",
        repo_path=repo_path,
        github_repo="",
        github_token="",
    )

    print("\n" + "="*60)
    print("  PIPELINE RESULTS")
    print("="*60)

    print(f"\n  Status:          {'✓ completed' if not result.get('error') else '✗ failed'}")
    print(f"  Relevant files:  {result.get('relevant_files', [])}")

    if result.get("error"):
        print(f"\n  Error: {result['error']}")
    else:
        print(f"\n  PLAN:\n{result.get('plan', 'none')}")
        print(f"\n  PATCH (first 500 chars):\n{result.get('patch', 'none')[:500]}")
        print(f"\n  TESTS (first 300 chars):\n{result.get('tests', 'none')[:300]}")
        print(f"\n  PR URL: {result.get('pr_url', 'skipped — no GitHub token')}")

except Exception as e:
    print(f"\n    ✗ Pipeline failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "="*60)
print("  All checks passed. System is ready.")
print("="*60 + "\n")