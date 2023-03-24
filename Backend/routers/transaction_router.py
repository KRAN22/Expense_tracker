from fastapi import APIRouter,Depends,HTTPException,status
from database import get_db
from sqlalchemy.orm import Session
from schemas import Transaction,UpdateTransaction
from logger import loggers
from services import transaction_services
from datetime import datetime
from fastapi_jwt_auth.auth_jwt import AuthJWT


router = APIRouter(
    prefix="/api/transaction",
    tags=["Transaction"]
)

@router.post("/add_transaction")
def add_transaction(transaction:Transaction,Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("post transaction request received....")
    try:
        Authorize.jwt_required()  
        jwt_payload = Authorize.get_raw_jwt()
        user_id = jwt_payload["id"]
    except Exception as e:
        loggers.error(e.massage)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=e.massage
                            )
    result = transaction_services.addTransaction(transaction,user_id,db)
    loggers.info("SuccessFully add transaction.....")
    return  result

@router.get("/user_id")
def get_all_transactions(limit: int = 10,
    page: int = 1 ,
    start_date: str = "1970-01-01",
    end_date: str= datetime.today().strftime('%Y-%m-%d') ,
    Authorize:AuthJWT=Depends(),
    db: Session = Depends(get_db)):
    loggers.info("Get all transactions request received...")
    try:
        Authorize.jwt_required()
        payload = Authorize.get_raw_jwt()
        user_id = payload["id"]
    except Exception as e:
        loggers.error(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=e)
    count = len(transaction_services.GetTransactionsUserId(user_id,db)) 
    result = transaction_services.filterTransaction(start_date,end_date,limit,user_id,page,db)
    loggers.info("Successfully get all Transactions...")
    return {"date":result,"count":count}

@router.delete("/deleteTransaction/{id}")
def delete_transaction(id:int, Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("Delete transaction request received....")
    try:
        Authorize.jwt_required()
    except Exception as e:
        loggers.error(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=e)
    result = transaction_services.deleteTransaction(id,db)
    loggers.info("Successfully delete the transaction....")
    return result

@router.put("/editTransaction/{id}")
def update_transaction(id:int,transaction:UpdateTransaction,Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("put transaction request received....")
    try:
        Authorize.jwt_required()
    except Exception as e:
        loggers.error(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=e)
    result = transaction_services.updateTransaction(id,transaction,db)
    loggers.info("Successfully edit transaction...")
    return result
    

