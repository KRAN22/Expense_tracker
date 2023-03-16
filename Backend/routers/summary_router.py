from fastapi import APIRouter

router = APIRouter(
    prefix="/api/summary",
    tags=["Summary"]
)


@router.get("")
def get_summary():
    return "Hello"