from repository import user_repo
from werkzeug.security import generate_password_hash
from logger import loggers
from fastapi import HTTPException,status
import model

def createUser(user,db):
    users = user_repo.getAllByUserName(user.username,db)
    if users:
        loggers.error("The user name is already existed..")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="*UserName is already existed..."
                            )
    new_user = model.User(username = user.username,
                          email=user.email,
                          password = generate_password_hash(user.password))
    
    result =  user_repo.createUser(new_user,db)
    return result
    