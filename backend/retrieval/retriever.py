"""
This file retrieves the most relevant code
chunks for a particular issue 

Embeds the issue text using embedding model
Queries ChromaDB for the top-K most relevant chunks
Returns the chunks associated with files to pass to agents
"""
