from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import Base, engine
from db import models  # noqa: F401 - ensures models are registered before create_all
from routers import assistant, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crisis Compass API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant.router)
app.include_router(auth.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "crisis-compass-api"}