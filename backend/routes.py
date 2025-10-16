from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse

router = APIRouter()


# POST /load
@router.post("/load")
async def load():
    # placeholder: logic to load audio or data
    return JSONResponse(content={"status": "success", "message": "Load endpoint hit"})


# GET /db?id=""
@router.get("/db")
async def get_db(id: str = Query(..., description="ID of the record to fetch")):
    # placeholder: logic to fetch from DB
    return JSONResponse(content={"status": "success", "id": id, "data": {}})


# POST /match
@router.post("/match")
async def match():
    # placeholder: logic to match audio fingerprint
    return JSONResponse(content={"status": "success", "message": "Match endpoint hit"})
