from fastapi import FastAPI
from src.routes.fic import router as fic_router

app = FastAPI()

app.include_router(fic_router, prefix="/fic")
