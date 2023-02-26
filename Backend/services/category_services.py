from fastapi import HTTPException,status
from repository import category_repo
from logger import loggers
import model

def CreateCategory(Category,db):
    category = category_repo.getCategoryByName(Category.category_name,db)
    if category:
        loggers.info("The category is already excited....")
        raise HTTPException(status_code=status.HTTP_208_ALREADY_REPORTED,
                            detail="category already excited...")
    
    new_category = model.Category(
        category_name = Category.category_name
    )
    result = category_repo.createCategory(new_category,db)
    return result

def getAllCategories(db):
    result = category_repo.getAllCategories(db)
    return result