from fastapi import APIRouter

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.get("/")
def create_user():
    return "Created successfully..."