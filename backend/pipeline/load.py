import os
import json
import sys
from pipeline.db import save_fingerprints_batch, song_exists
from engine.spotify_parser import spotify_parser
from engine.yt_scraper import yt_downloader
from engine.preprocessor import preprocessor
from engine.spectrogram import audio_to_spectrogram
from engine.peak_maker import *
from engine.fingerprinting import *


### the json databse is temporary , move to real database before moving to produciton
DB_JSON = os.path.join(os.path.dirname(__file__), "db_mock.json")

def _ensure_db():
    if not os.path.exists(DB_JSON):
        with open(DB_JSON, "w") as f:
            json.dump({"songs": [], "fingerprints": []}, f)


def song_exists_json(track_id: str) -> bool:
    _ensure_db()
    try:
        with open(DB_JSON, "r") as f:
            data = json.load(f)
        return track_id in data.get("songs", [])
    except Exception:
        return False

def save_fingerprints_batch_json(fingerprints: list, spotify_id: str, youtube_id: str):
    _ensure_db()
    try:
        with open(DB_JSON, "r") as f:
            data = json.load(f)
    except Exception:
        data = {"songs": [], "fingerprints": []}

    # add spotify and youtube ids to each fingerprint if not present
    for fprint in fingerprints:
        if "spotify_ID" not in fprint:
            fprint["spotify_ID"] = spotify_id
        if "youtube_ID" not in fprint:
            fprint["youtube_ID"] = youtube_id

    data.setdefault("fingerprints", []).extend(fingerprints)
    if spotify_id not in data.get("songs", []):
        data.setdefault("songs", []).append(spotify_id)

    with open(DB_JSON, "w") as f:
        json.dump(data, f)

        
##########################
#########################


def process_spotify_track(track_id: str):
    """runs complete pipeline for a spotify ID
    **PIPELINE:** check if exists > Spotify metadata > YT search & download > preprocessing > spectrogram > fingerprinting > save to DB (JSON mock) > cleanup > return
    **PARAMS:** track_id (spotify)
    **RETURN:** list of dicts [{spotify_ID, youtube_ID, hash, time}]"""
    print(f"\n[START] Processing Spotify ID: {track_id}")

    try:
        # 1: check if song already exists (using JSON mock)
        if song_exists_json(track_id):
            print(f"[WARN] Skipping track {track_id}: Song already exists")
            return [], True

        # 2: Spotify metadata
        try:
            info = spotify_parser(track_id)
        except ValueError as e:
            print(f"[WARN] Skipping track {track_id}: {e}")
            return [], True

        title = info.get("title")
        artists = info.get("artists")
        if not title or not artists:
            print(f"[WARN] Invalid metadata for {track_id}, skipping...")
            return [], True

        print(f"[INFO] Track: {title} - {artists}")

        # 3: YT search & download
        query = f"{title} {artists}"
        safe_filename = f"{track_id}"

        try:
            audio_path, youtube_id = yt_downloader(query, safe_filename)
        except ValueError as e:
            print(f"[WARN] Skipping track {track_id}: {e}")
            return [], True

        print(f"[INFO] Downloaded audio: {audio_path}")
        print(f"[INFO] YouTube ID: {youtube_id}")

        # 4: preprocessing
        processed_path = preprocessor(audio_path)
        print(f"[INFO] Preprocessed audio: {processed_path}")

        # 5: generate spectrogram
        S_db = audio_to_spectrogram(processed_path)
        print(f"[INFO] Spectrogram shape: {S_db.shape}")


        peaks = extract_peaks(S_db)
        print(f"[INFO] Extracted {len(peaks)} peaks from spectrogram")

        # 6: fingerprinting
        fingerprints_tuple, _ = generate_hashes(peaks, track_id)
        fingerprints = [{'hash': int(h), 'time': int(t)} for h, t in fingerprints_tuple]
        print(f"[INFO] Generated {len(fingerprints)} fingerprints")

        # 6.5 peak making from spectrogram


        # 7: save to DB -> using JSON mock now
        save_fingerprints_batch_json(fingerprints, track_id, youtube_id)

        # 8: cleanup
        for path in [audio_path, processed_path]:
            if os.path.exists(path):
                os.remove(path)

        print(f"[DONE] Finished processing {track_id}\n")

    except Exception as e:
        print(f"[ERROR] Failed to process {track_id}: {e}")
        return [], True


# # process_spotify_track("7mykoq6R3BArsSpNDjFQTm")
# # more ids
# ids = [
#     "4yMMsS5QaEcsHZkKwdEyLv",
#     "4VbpKAZKVxzY7JpGQ34zMj",
#     "3lcRYiY6NbuxNTf5hjbyyu",
#     "2yR2sziCF4WEs3klW1F38d",
#     "7mykoq6R3BArsSpNDjFQTm",
# ]

# for track_id in ids:
#     process_spotify_track(track_id)
