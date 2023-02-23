from fastapi import FastAPI
from logging.config import dictConfig
from schemas import LogConfig, Setting
from fastapi_jwt_auth.auth_jwt import AuthJWT
from routers import user_router
from database import engine
import model

dictConfig(LogConfig().dict())

app = FastAPI()

model.Base.metadata.create_all(bind=engine)

@AuthJWT.load_config
def get_config():
    return Setting()

app.include_router(user_router.router)