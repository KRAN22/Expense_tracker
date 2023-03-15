from fastapi import HTTPException,status
from repository import transaction_repo
from repository import category_repo
from logger import loggers
import model

def addTransaction(transaction,db):
    categoryId = category_repo.getCategoryById(transaction.category_id,db)
    
    if categoryId:
        new_transaction = model.Transaction(
            category_id = transaction.category_id,
            amount = transaction.amount,
            date = transaction.date,
            comments = transaction.comments
        )
        result = transaction_repo.addTransaction(new_transaction,db)
        return result
    
    loggers.error("The transaction is failed due to category not found in categories")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="The transaction is failed due to category not found in categories")
    

def GetAllTransactions(db):
    result = transaction_repo.getAllTransactions(db)
    return result

def deleteTransaction(id,db):
    result = transaction_repo.deleteTransaction(id,db)
    return result

def updateTransaction(id,transaction,db):
    current_transaction = transaction_repo.getTransactionById(id,db)
    if not current_transaction:
        loggers.error(f"With the id {id} the transaction is not found..")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"With the id {id} the transaction not found ")

    if transaction.amount:
        current_transaction.amount = transaction.amount
        
    if transaction.date:
        current_transaction.date = transaction.date
        
    if transaction.comments:
        current_transaction.comments = transaction.comments
        
    if transaction.category_type:
        current_transaction.category.category_type = transaction.category_type
    
    result = transaction_repo.updateTransaction(current_transaction,db)
    return result
    
    