"""
This module indexes a repository into chormadb for vector search 

Goes through all files in the repo 
Splits each file into overlapping chunks 
Embeds chunk using embedding models
Stores chunks and embeddings in a local chromadb collection
"""
