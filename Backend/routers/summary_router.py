from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session 
from services import summary_service
from database import get_db
from logger import loggers


router = APIRouter(
    prefix="/api/summary",
    tags=["Summary"]
)

@router.get("/")
def get_summary_BasedOn_category(start_date:str,end_date:str,db:Session=Depends(get_db)):
    loggers.info("get Summary request received.....")
    result = summary_service.getSummary(start_date,end_date,db)
    loggers.info("Successfully get summary....")
    return result
    
