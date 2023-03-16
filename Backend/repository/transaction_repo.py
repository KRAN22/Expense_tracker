from fastapi import HTTPException,status
from sqlalchemy.orm import Session,joinedload
from logger import loggers
import model

def addTransaction(new_transaction,db:Session):
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

def getAllTransactions(db:Session):
    results = db.query(model.Transaction).options(joinedload(model.Transaction.category)).all()
    return results

def getTransactionById(id,db:Session):
    queries = []
    queries.append(model.Transaction.id == id)
    result = db.query(model.Transaction).filter(*queries).first()
    return result

def deleteTransaction(id,db:Session):
    transaction = db.query(model.Transaction).filter(model.Transaction.id == id).first()
    if not transaction:
        loggers.error("The Transaction is Not excited..")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="The Transaction is Not  excited..."
                            )
    db.delete(transaction)
    db.commit()
    return status.HTTP_204_NO_CONTENT

def updateTransaction(transaction,db:Session):
    db.commit()
    db.refresh(transaction) 
    return transaction
    
def filterTransaction(start_date,end_date,db:Session):
    transactions = db.query(model.Transaction).filter(model.Transaction.date.between(start_date, end_date)).all()
    return transactions