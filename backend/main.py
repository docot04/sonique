# from fastapi import FastAPI
# from routes import router
# app = FastAPI(title="Sonique Backend")
# app.include_router(router)
# @app.get("/")
# async def root():
#     return {"message": "Sonique online"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(title="Sonique Backend")

# ✅ CORS setup
origins = [
    "http://localhost:19006",  # Expo web dev server
    "http://127.0.0.1:19006",
    "http://localhost:8081",  # Expo web (your current frontend)
    "http://127.0.0.1:8081",  # optional
    # "*"  # You can use this temporarily to allow all origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your routes
app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Sonique online"}
