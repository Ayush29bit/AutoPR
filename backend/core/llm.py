"""
Single place that creates the GROQ LLM client
"""
from groq import Groq
from backend.core.config import settings
 
_client = None

def get_llm_client()->Groq:
    global _client 
    if _client is None:
        _client = Groq(api_key=settings.GROQ_API_KEY)
    return _client

def chat(prompt: str, system: str = None, temperature: float = 0.2) -> str:
    """
    Simple wrapper around Groq chat completion.
    Returns the response text directly.
 
    temperature=0.2 keeps outputs focused and deterministic —
    low enough for reliable structured output, not so low it's repetitive.
    """
    client = get_llm_client()
 
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})
 
    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=4096,
    )
 
    return response.choices[0].message.content.strip()
