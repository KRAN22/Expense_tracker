from fastapi import FastAPI
from logging.config import dictConfig
from schemas import LogConfig
from logger import logger


dictConfig(LogConfig().dict())

app = FastAPI()


@app.get("/")
def Hello():
    return "Hello world"