from pydantic import BaseModel, validator
from typing import Optional
from datetime import date

class LogConfig(BaseModel):
    """Logging configuration to be set for the server"""

    LOGGER_NAME: str = "FastApi"
    LOG_FORMAT: str = "%(levelprefix)s | %(asctime)s | %(message)s"
    LOG_LEVEL: str = "DEBUG"

    # Logging config
    version = 1
    disable_existing_loggers = False
    formatters = {
        "default": {
            "()": "uvicorn.logging.DefaultFormatter",
            "fmt": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    }
    handlers = {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
    }
    loggers = {
        "FastApi": {"handlers": ["default"], "level": LOG_LEVEL},
    }

class Setting(BaseModel):
    authJwt_secret_key : str = "6eb79abb9454995b30029931071a90dc852b4a5a6391d91432d147f432fc1a07" 
     
class CreateUser(BaseModel):
    username : str
    email : str
    password : str
    
    class Config:
        orm_mode = True
        schema_extra={
            'example':{
                'username':'kranthi',
                'email':'kranthi@gmail.com',
                'password': 'password'
            }
        }
       
class SignUp(BaseModel):

    username : Optional[str]
    email : Optional[str]
    password : str
    
    class Config:
        orm_mode = True
        schema_extra={
            'example':{
                'username': 'kranthi',
                'password' : 'password'
            }
        }

class Category(BaseModel):
    
    category_type : str
    categoryName : str
    
    class Config:
        orm_mode = True
        schema_extra={
            'example':{
                'category_type': "INCOME",
                'categoryName':"Home"
            }
        }
        
class Transaction(BaseModel):
    
    category_id : int
    amount : int
    date: date
    comments : str
    is_delete: Optional[bool]
    
    class Config:
        orm_mode = True
        schema_extra = {
            'example':{
                'category_id': 1,
                'amount': 230,
                'date' : date(2022,2,1),
                'comments': "add something" 
            }
        }
        
       
class UpdateTransaction(BaseModel):
    
    amount : Optional[int]
    date: Optional[date]
    comments : Optional[str]
    is_delete: Optional[bool]
    
    class Config:
        orm_mode = True
        schema_extra = {
            'example':{
                'amount': 230,
                'date' : date(2022,2,1),
                'comments': "add something" 
            }
        }