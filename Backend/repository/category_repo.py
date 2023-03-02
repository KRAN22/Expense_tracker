from sqlalchemy.orm import Session
import model
from fastapi import status,HTTPException
from logger import loggers

def createCategory(category,db:Session):
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

def getCategoryByName(name,db:Session):
    queries=[]
    queries.append(model.Category.categoryName == name)
    result =  db.query(model.Category).filter(*queries).first()
    return result

def getAllCategories(db:Session):
    result = db.query(model.Category).all()
    return result

def getCategoryById(id,db:Session):
    queries=[]
    queries.append(model.Category.id == id)
    result =  db.query(model.Category).filter(*queries).first()
    return result

def deleteCategory(id,db:Session):
    category = db.query(model.Category).filter(model.Category.id == id).first()
    if not category:
        loggers.error("The Todo is Not excited..")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="The Todo is Not  excited..."
                            )
    db.delete(category)
    db.commit()
    return status.HTTP_204_NO_CONTENT

def updateCategory(category,db:Session):
    db.commit()
    db.refresh(category)
    return category