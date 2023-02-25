from sqlalchemy.orm import Session
import model

def createUser(user,db:Session):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def getAllByUserName(username,db:Session):
    queries=[]
    queries.append(model.User.username==username)
    result = db.query(model.User).filter(*queries).first()
    return result
    
def getAllUsers(db:Session):
    result = db.query(model.User).all()
    return result

def getUserById(id,db:Session):
    queries=[]
    queries.append(model.User.id==id)
    result = db.query(model.User).filter(*queries).first()
    return result

def getUserByEmail(email,db:Session):
    queries=[]
    queries.append(model.User.email==email)
    result = db.query(model.User).filter(*queries).first()
    return result