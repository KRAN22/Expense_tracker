from fastapi import APIRouter,Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas import Transaction,UpdateTransaction
from logger import loggers
from services import transaction_services


router = APIRouter(
    prefix="/api/transaction",
    tags=["Transaction"]
)

@router.post("/add_transaction")
def add_transaction(transaction:Transaction,db:Session=Depends(get_db)):
    loggers.info("post transaction request received....")   
    result = transaction_services.addTransaction(transaction,db)
    loggers.info("SuccessFully add transaction.....")
    return  result

@router.get("/")
def get_all_transactions(db:Session=Depends(get_db)):
    loggers.info("Get all transactions request received...")
    result = transaction_services.GetAllTransactions(db)
    loggers.info("Successfully get all Transactions...")
    return result

@router.delete("/deleteTransaction/{id}")
def delete_transaction(id:int,db:Session=Depends(get_db)):
    loggers.info("Delete transaction request received....")
    result = transaction_services.deleteTransaction(id,db)
    loggers.info("Successfully delete the transaction....")
    return result

@router.put("/editTransaction/{id}")
def update_transaction(id:int,transaction :UpdateTransaction,db:Session=Depends(get_db)):
    loggers.info("put transaction request received....")
    result = transaction_services.updateTransaction(id,transaction,db)
    loggers.info("Successfully edit transaction...")
    return result
    
@router.get("/filterTransaction")
def filter_transaction(start_date:str,end_date:str,db:Session=Depends(get_db)):
    loggers.info("get filter Transaction request received...")
    result = transaction_services.filterTransaction(start_date,end_date,db)
    loggers.info("Successfully get all filter transaction....")
    return result