from fastapi import APIRouter

router = APIRouter(tags=["System"])

@router.get("/")
def home():
    return {
        "message": "Welcome to GramHealthAI API",
        "version": "1.0.0",
        "status": "running"
    }