from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session 
from services import category_services
from database import get_db
from schemas import Category
from logger import loggers
import model


router = APIRouter(
    prefix="/api/category",
    tags=["Category"]
)

@router.post("/addCategory")
def category(category:Category,db:Session=Depends(get_db)):
    loggers.info("post category request received....")
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