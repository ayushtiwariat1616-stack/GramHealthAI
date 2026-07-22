from fastapi import APIRouter

from app.api.routes import system, health, chat

api_router = APIRouter()

api_router.include_router(system.router)
api_router.include_router(health.router)
api_router.include_router(chat.router)