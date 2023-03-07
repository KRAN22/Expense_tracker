from fastapi import APIRouter,Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas import Transaction
from logger import loggers
from services import transaction_services


router = APIRouter(
    prefix="/app/transaction",
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
    