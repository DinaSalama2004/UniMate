from contextlib import asynccontextmanager

from fastapi import FastAPI

from database import init_db
from exception_handlers import register_exception_handlers
from routes import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)
register_exception_handlers(app)

app.include_router(auth.router)