from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session 
from services import category_services
from fastapi_jwt_auth.auth_jwt import AuthJWT
from database import get_db
from schemas import Category
from logger import loggers


router = APIRouter(
    prefix="/api/category",
    tags=["Category"]
)

@router.post("/addCategory")
def category(category:Category,Authorize:AuthJWT=Depends(),db:Session=Depends(get_db)):
    loggers.info("post category request received....")
    try:
        Authorize.jwt_required()
    except Exception as e:
        loggers.error(e.massage)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail= e.message
                            )
    result = category_services.CreateCategory(category,db)
    loggers.info("Successfully created category...")
    return result

@router.get("/")
def get_all_categories(db:Session=Depends(get_db)):
    loggers.info("get category request received...")
    result = category_services.getAllCategories(db)
    loggers.info("Successfully get all categories...")
    return result

@router.get("/{id}")
def get_category_by_id(id:int,db:Session=Depends(get_db)):
    loggers.info("get category bt id request received....")
    result = category_services.getCategoryById(id,db)
    loggers.info("Successfully get category by id....")
    return result

@router.delete("/deleteCategory/{id}")
def delete_category(id:int,db:Session=Depends(get_db)):
    loggers.info("Delete category request received...")
    result = category_services.deleteCategory(id,db)
    loggers.info("Successfully delete category...")
    return result

@router.put("/updateCategory/{id}")
def update_category(category:Category,id:int,db:Session=Depends(get_db)):
    loggers.info("update request received....")
    result = category_services.updateCategory(id,category,db)
    loggers.info("Successfully updated todo....")
    return result