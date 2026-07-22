from pydantic import BaseModel


from typing import Literal

class ChatRequest(BaseModel):
    message: str
    language: Literal[
        "English",
        "हिन्दी",
        "Hinglish",
    ] = "English"


class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = []