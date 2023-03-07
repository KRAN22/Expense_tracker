from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from logger import loggers
import model

def addTransaction(new_transaction,db:Session):
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

def getAppTransactions(db:Session):
    result = db.query(model.Transaction).all()
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