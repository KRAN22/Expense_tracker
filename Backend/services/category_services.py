from fastapi import HTTPException,status
from repository import category_repo
from logger import loggers
import model

def CreateCategory(Category,db):
    category = category_repo.getCategoryByName(Category.categoryName,db)
    if category:
        loggers.info("The category is already excited....")
        raise HTTPException(status_code=status.HTTP_208_ALREADY_REPORTED,
                            detail="category already excited...")
    
    new_category = model.Category(
        categoryName = Category.categoryName
    )
    result = category_repo.createCategory(new_category,db)
    return result

def getAllCategories(db):
    result = category_repo.getAllCategories(db)
    return result

def getCategoryById(id,db):
    result = category_repo.getCategoryById(id,db)
    if result:
        return result
    loggers.error(f"With the id {id} no categories found....")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"With the id {id} no categories found..")