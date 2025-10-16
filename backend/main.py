from fastapi import FastAPI
from routes import router

app = FastAPI(title="Sonique Backend") 

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Sonique online"}
