from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session 
from services import summary_service
from database import get_db
from logger import loggers
from fastapi_jwt_auth.auth_jwt import AuthJWT


router = APIRouter(
    prefix="/api/summary",
    tags=["Summary"]
)

@router.get("/")
def get_summary_BasedOn_category(start_date:str,end_date:str,Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("get Summary request received.....")
    try:
        Authorize.jwt_required()
        jwt_payload = Authorize.get_raw_jwt()
        user_id = jwt_payload["id"]
    except Exception as e:
        loggers.error(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail=e)
    result = summary_service.getSummary(start_date,end_date,user_id,db)
    loggers.info("Successfully get summary....")
    return result
    
