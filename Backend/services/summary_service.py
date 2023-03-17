from routers import category_router
from routers import transaction_router

def getSummary(start_date,end_date,db):
    categories = category_router.get_all_categories(db)
    transactions_db = transaction_router.filter_transaction(start_date,end_date,db)
    categorySummary = []
    for category in categories:
        acc = 0
        for transaction in transactions_db:
            if transaction.category_id == category.id:
                acc += transaction.amount
        categorySummary.append({
        "id":category.id,
        "categoryName": category.categoryName,
        "category_type": category.category_type,
        "amount": acc
        })
     
    category_type = []
    for category in categories:
        if category.category_type not in category_type:
            category_type.append(category.category_type)
    
    overAllSummary = []
    for types in category_type:
        acc = 0
        for transaction in transactions_db:
            if transaction.category.category_type == types:
                acc += transaction.amount
        overAllSummary.append({
        "category_type": types,
        "amount": acc
        })
            
    return {"categorySummary": categorySummary,"overAllSummary":overAllSummary}
