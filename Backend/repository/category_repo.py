from sqlalchemy.orm import Session
import model

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