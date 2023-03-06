from database import Base
from sqlalchemy import String,Column,Integer,ForeignKey,Boolean, Date
from sqlalchemy.orm import relationship
import datetime


class User(Base):
    __tablename__ = "user"
    
    id = Column(Integer,primary_key=True,index= True,autoincrement=True)
    username = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))

    def __repr__(self):
        return f"<User {self.username}>"
    
class Category(Base):
    __tablename__ = "category"
    
    id = Column(Integer,primary_key=True,index= True,autoincrement=True)
    categoryName = Column(String(255))
    
    transaction = relationship("Transaction", back_populates="categories")
    
    def __repr__(self):
        return f"<Category {self.categoryName}" 
    
class Transaction(Base):
    __tablename__ = "transaction"
    
    id = Column(Integer,autoincrement=True,primary_key=True,index=True)
    category_id = Column(Integer,ForeignKey("category.id"))
    amount = Column(Integer)
    date = Column(Date)
    comments = Column(String(255))
    id_delete = Column(Boolean,default=False)
    
    categories = relationship("Category", back_populates="transaction")
    
    def __repr__(self):
        return f"<Transaction {self.id}" 