"""
ROUTE               TYPE    ACTION

/load               POST    takes Spotify track/album/playlist ID(s) and runs batch pipeline on multiple workers
/dashboard          GET     queries the entire DB for the dashboard
/dashboard          POST    queries the DB for specific entries and returns spotify metadata
TODO
/match              POST    takes user's mp3, runs pipeline to create hash, queries DB for matches
/feedback           POST    after match, queries if match was correct
"""

import time
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from concurrent.futures import ThreadPoolExecutor, as_completed
from engine.spotify_parser import extract_spotify_ids
from pipeline.load import process_spotify_track
from pipeline.db import get_dashboard, get_song

router = APIRouter()


class LoadRequest(BaseModel):
    track_id: list[str] = []
    album_id: list[str] = []
    playlist_id: list[str] = []


class DashboardRequest(BaseModel):
    spotify_id: str


@router.post("/load")
async def load_tracks(req: LoadRequest, max_workers: int = 5):
    all_track_ids = []

    # collect all track IDs before batch processing (tracks, albums, playlists)
    all_track_ids.extend(req.track_id or [])
    for album_id in req.album_id or []:
        try:
            album_tracks = extract_spotify_ids(album_id, "album")
            all_track_ids.extend(album_tracks)
        except Exception as e:
            print(f"[ERROR] Album {album_id} failed: {e}")
    for playlist_id in req.playlist_id or []:
        try:
            playlist_tracks = extract_spotify_ids(playlist_id, "playlist")
            all_track_ids.extend(playlist_tracks)
        except Exception as e:
            print(f"[ERROR] Playlist {playlist_id} failed: {e}")

    if not all_track_ids:
        raise HTTPException(status_code=400, detail="No track IDs available to process")

    start_time = time.time()
    processed_count = 0
    total_tracks = len(all_track_ids)

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(process_spotify_track, tid): tid for tid in all_track_ids
        }

        for future in as_completed(futures):
            tid = futures[future]
            try:
                result = future.result()
                if result == 1:
                    processed_count += 1
            except Exception as e:
                print(f"[ERROR] Track {tid} failed: {e}")

    skipped_count = total_tracks - processed_count
    duration = round(time.time() - start_time, 2)
    average = round(duration / total_tracks, 2) if total_tracks else 0

    return {
        "message": "Processing complete",
        "details": {
            "processed": processed_count,
            "skipped": skipped_count,
            "duration": duration,
            "average": average,
        },
    }


@router.get("/dashboard")
async def dashboard():
    return {"data": get_dashboard()}


@router.post("/dashboard")
async def dashboard_post(req: DashboardRequest):
    if not req.spotify_id:
        raise HTTPException(status_code=400, detail="No Spotify ID provided")

    song = get_song(req.spotify_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    (
        spotify_id,
        youtube_id,
        title,
        artists,
        cover,
        album_name,
        release_date,
        duration_ms,
    ) = song
    return {
        "spotify_ID": spotify_id,
        "youtube_ID": youtube_id,
        "title": title,
        "artists": artists,
        "cover": cover,
        "album_name": album_name,
        "release_date": release_date,
        "duration_ms": duration_ms,
    }


@router.post("/match")
async def match():
    # placeholder: logic to match audio fingerprint
    return JSONResponse(content={"status": "success", "message": "Match endpoint hit"})


@router.post("/feedback")
async def match():
    return JSONResponse(content={"200: Ok"})
