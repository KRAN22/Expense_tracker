from fastapi import HTTPException,status
from werkzeug.security import generate_password_hash
from repository import user_repo
from logger import loggers
import model

def createUser(user,db):    
    User = user_repo.getAllByUserName(user.username,db)
    if User:
        loggers.error("The UserName is already excited....")
        raise HTTPException(status_code=status.HTTP_208_ALREADY_REPORTED,
                            detail="UserName is already excited....")
    newUser = model.User(
        username = user.username,
        email = user.email,
        password = generate_password_hash(user.password)
    )
    result = user_repo.createUser(newUser,db)  
    return result

def getAllUsers(db):
    users = user_repo.getAllUsers(db)  
    return users  

def getUserById(id,db):
    user = user_repo.getUserById(id,db) 
    if not user:
        loggers.error(f"With user id {id} no user found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"With user id {id} no user found")
    return user