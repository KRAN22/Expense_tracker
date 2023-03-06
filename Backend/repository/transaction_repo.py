from sqlalchemy.orm import Session
import model

def addTransaction(new_transaction,db:Session):
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

def getAppTransactions(db:Session):
    result = db.query(model.Transaction).all()
    return result