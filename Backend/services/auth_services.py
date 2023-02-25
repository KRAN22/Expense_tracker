from repository import user_repo
from werkzeug.security import check_password_hash
from fastapi_jwt_auth.auth_jwt import AuthJWT
from datetime import timedelta
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException,status


def createAuth(login,Authorize:AuthJWT,db):
    if login.username:
        user = user_repo.getAllByUserName(login.username,db)
    if login.email:
        user = user_repo.getUserByEmail(login.email,db)
        
    if user and check_password_hash(user.password,login.password):
        expires =  timedelta(days=1)
        dic ={
            "id":user.id
        }
        access_token = Authorize.create_access_token(subject=user.username,user_claims=dic,expires_time=expires)
        refresh_token = Authorize.create_refresh_token(subject=user.password)
        
        response={
            "Access":access_token,
            "Refresh": refresh_token
        }
        return jsonable_encoder(response)
    raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST,
                        detail="Invalid Authorization"
                        )

def getRefreshToken(Authorize:AuthJWT):
    try:
        Authorize.jwt_refresh_token_required
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Please provide a valid refresh token...")
    
    current_username = Authorize.get_jwt_subject() 
    
    access_token = Authorize.create_access_token(subject = current_username)
    
    return jsonable_encoder({"access":access_token})     
    