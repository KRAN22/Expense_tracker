from fastapi import APIRouter,Depends
from schemas import CreateUser
from sqlalchemy.orm import Session
from services import user_services
from database import get_db
from logger import loggers

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.post("/signIn")
def create_user(user:CreateUser,db:Session=Depends(get_db)):
    loggers.info("Post user request received....")
    result = user_services.createUser(user,db)
    loggers.info("Successfully created...")
    return result 

@router.get("/")
def get_all_users(db:Session=Depends(get_db)):
    loggers.info("Get user request received....")
    result = user_services.getAllUsers(db)
    loggers.info("Successfully get all users.....")
    return result

@router.get("/{id}")
def get_user_by_id(id:int,db:Session=Depends(get_db)):
    loggers.info("Get UserById request received....")
    result = user_services.getUserById(id,db)
    loggers.info("Successfully get the user by id...")
    return result