from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session 
from routers import transaction_router,category_router
from database import get_db


router = APIRouter(
    prefix="/api/summary",
    tags=["Summary"]
)

@router.post("/")
def get_summary(start_date:str,end_date:str,db:Session=Depends(get_db)):
    categories = category_router.get_all_categories(db)
    transactions_db = transaction_router.filter_transaction(start_date,end_date,db)
    result = []
    for category in categories:
        acc = 0
        for transaction in transactions_db:
            if transaction.category_id == category.id:
                acc += transaction.amount
        result.append({
        "categoryName": category.categoryName,
        "category_type": category.category_type,
        "amount": acc
        })
            
    return result
    