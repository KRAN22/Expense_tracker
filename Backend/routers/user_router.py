from fastapi import APIRouter,Depends,status
from schemas import CreateUser
from database import get_db
from sqlalchemy.orm import Session
from logger import loggers
from services import user_service 

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.post("/signIn",status_code=status.HTTP_201_CREATED)
def create_user(user : CreateUser ,db : Session=Depends(get_db)):
    loggers.info("Create user request received....")
    return user_service.createUser(user,db)
    