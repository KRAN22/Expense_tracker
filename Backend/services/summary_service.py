from services import category_services
from repository import transaction_repo

def getSummary(start_date,end_date,db):
    categories = category_services.getAllCategories(db)
    transactions_db = transaction_repo.TransactionsDates(start_date,end_date,db)
    
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
        
    total_income = sum(item["amount"] for item in overAllSummary if item["category_type"] == "Income")
    total_savings = sum(item["amount"] for item in overAllSummary if item["category_type"] == "Savings")
    total_expense = sum(item["amount"] for item in overAllSummary if item["category_type"] == "Expense")
    
    bank_balance = total_income-total_expense-total_savings
     
    return {"categorySummary": categorySummary,"overAllSummary":overAllSummary,"bankBalance":bank_balance}
