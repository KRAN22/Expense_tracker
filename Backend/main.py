from fastapi import FastAPI
from logging.config import dictConfig
from schemas import LogConfig, Setting
from fastapi_jwt_auth.auth_jwt import AuthJWT
from routers import user_router

dictConfig(LogConfig().dict())

app = FastAPI()

@AuthJWT.load_config
def get_config():
    return Setting()

app.include_router(user_router.router)