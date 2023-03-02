from database import Base
from sqlalchemy import String,Column,Integer



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
    
    def __repr__(self):
        return f"<Category {self.category_name}" 