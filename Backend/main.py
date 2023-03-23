from fastapi import FastAPI
from logging.config import dictConfig
from schemas import LogConfig, Setting
from fastapi_jwt_auth.auth_jwt import AuthJWT
from routers import user_router,auth_router,category_router,transaction_router,summary_router
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import model

dictConfig(LogConfig().dict())

app = FastAPI()

model.Base.metadata.create_all(bind=engine)

@AuthJWT.load_config
def get_config():
    return Setting()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(user_router.router)
app.include_router(auth_router.router)
app.include_router(category_router.router)
app.include_router(transaction_router.router)
app.include_router(summary_router.router)

