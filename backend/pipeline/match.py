import os
import sys
import json
from collections import Counter

# Ensure repo root is on sys.path so absolute package imports work when running the file directly
_repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

from backend.engine.spectrogram import audio_to_spectrogram
from backend.engine.fingerprinting import generate_hashes
from backend.engine.peak_maker import extract_peaks
from backend.engine.preprocessor import preprocessor
from backend.engine.spotify_parser import spotify_parser

DB_JSON = os.path.join(os.path.dirname(__file__), "db_mock.json")

def get_song_details(spotify_id):
    """Gets song details from Spotify."""
    try:
        return spotify_parser(spotify_id)
    except Exception as e:
        print(f"[ERROR] Could not get song details for {spotify_id}: {e}")
        return None

def match(file_path: str):
    """
    Matches an audio file against the fingerprint database.

    Args:
        file_path (str): Path to the audio file.

    Returns:
        list: A list of dictionaries, where each dictionary contains
              'song_details' and 'confidence'. The list is sorted by
              confidence in descending order.
    """
    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        return []

    try:
        with open(DB_JSON, "r") as f:
            db_data = json.load(f)
        db_fingerprints = db_data.get("fingerprints", [])
    except (FileNotFoundError, json.JSONDecodeError):
        print("[ERROR] Database not found or is corrupted.")
        return []

    # Generate fingerprints for the input audio file
    processed_path = None
    try:
        processed_path = preprocessor(file_path)
        s_db = audio_to_spectrogram(processed_path)
        peaks = extract_peaks(s_db)
        # We don't have a track_id here, so we pass None
        input_fingerprints = generate_hashes(peaks, None)
    except Exception as e:
        print(f"[ERROR] Could not generate fingerprints for {file_path}: {e}")
        return []
    finally:
        if processed_path and os.path.exists(processed_path):
            os.remove(processed_path)

    input_hashes = {fp["hash"] for fp in input_fingerprints}

    # Group database fingerprints by spotify_ID
    db_hashes_by_song = {}
    for db_fp in db_fingerprints:
        spotify_id = db_fp["spotify_ID"]
        if spotify_id not in db_hashes_by_song:
            db_hashes_by_song[spotify_id] = set()
        db_hashes_by_song[spotify_id].add(db_fp["hash"])

    # Find potential matches and calculate confidence
    results = []
    for spotify_id, db_hashes in db_hashes_by_song.items():
        matching_hashes = input_hashes.intersection(db_hashes)
        match_count = len(matching_hashes)

        if match_count > 0:
            # Confidence is the ratio of matched hashes to the total number of unique hashes in the input audio
            confidence = (match_count / len(db_hashes)) * 100 if len(db_hashes) > 0 else 0
            
            song_details = get_song_details(spotify_id)
            if song_details:
                results.append({
                    "song_details": song_details,
                    "confidence": round(confidence, 2)
                })

    # Sort results by confidence
    results.sort(key=lambda x: x["confidence"], reverse=True)

    return results

import glob

if __name__ == "__main__":
    music_fold_path = os.path.join(_repo_root, "music_fold")
    audio_files = glob.glob(os.path.join(music_fold_path, '*.mp3'))

    all_results = []

    for audio_file in audio_files:
        print(f"\n--- Matching {os.path.basename(audio_file)} ---")
        match_results = match(audio_file)
        if match_results:
            for result in match_results:
                result['file_name'] = os.path.basename(audio_file)
                all_results.append(result)
        else:
            print("--- No Match Found ---")

    if all_results:
        # Sort all results by confidence
        all_results.sort(key=lambda x: x["confidence"], reverse=True)

        print("\n--- Overall Match Results ---")
        for i, result in enumerate(all_results[:10]):
            details = result['song_details']
            confidence = result['confidence']
            file_name = result['file_name']
            print(f"\n--- Rank {i+1} ---")
            print(f"File: {file_name}")
            print(f"Title: {details.get('title')}")
            print(f"Artists: {details.get('artists')}")
            print(f"Album: {details.get('album')}")
            print(f"Release Year: {details.get('year')}")
            print(f"Confidence: {confidence}%")
            print("--------------------")
    else:
        print("\n--- No Matches Found in any of the files ---")
