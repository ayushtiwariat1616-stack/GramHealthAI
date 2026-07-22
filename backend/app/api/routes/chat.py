from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(tags=["Chat"])

chat_service = ChatService()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = chat_service.get_response(request.message, request.language)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
    )