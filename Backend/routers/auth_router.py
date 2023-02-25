from fastapi import APIRouter,Depends
from fastapi_jwt_auth.auth_jwt import AuthJWT
from schemas import SignUp
from sqlalchemy.orm import Session
from database import get_db
from logger import loggers
from services import auth_services

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

@router.post("/Login")
def logIn(login:SignUp, Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("Post auth request received....")
    result = auth_services.createAuth(login,Authorize,db)
    loggers.info("Successfully create authToken....")
    return result

@router.get("/refresh")
def refresh_token(Authorize:AuthJWT=Depends()):
    loggers.info("get refresh request received....")
    result = auth_services.getRefreshToken(Authorize)
    loggers.info("Successfully get refresh token...")
    return result