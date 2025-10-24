# TODO
"""
24-10-2025 : DONE
- take audio sample from user
- preprocessor engine (maybe on frontend for better retrieval times)
- spectrogram conversion engine
- fingerprinting engine
- query database based on diff between hash_times
"""
import os,sys,json
from collections import Counter
from engine.preprocessor import preprocessor
from engine.spectrogram import audio_to_spectrogram
from engine.fingerprinting import *
from engine.peak_maker import *
from engine.spotify_parser import *

import os
import uuid

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)

DB_JSON = os.path.join(os.path.dirname(__file__), "db_mock.json")


def process_audio_sample(audio_bytes: bytes) -> list:
    """
    # TEMPORARY:\n
    Saves the recieved file in a **temp** directory and returns the match results.
    """
    # Generate a unique filename
    filename = f"{uuid.uuid4()}.mp3"
    file_path = os.path.join(TEMP_DIR, filename)

    # Write the audio bytes to the file
    with open(file_path, "wb") as f:
        f.write(audio_bytes)

    # call match and return its result
    result = match(file_path)
    return result

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
        input_fingerprints, _ = generate_hashes(peaks, None)
    except Exception as e:
        print(f"[ERROR] Could not generate fingerprints for {file_path}: {e}")
        return []
    finally:
        if processed_path and os.path.exists(processed_path):
            os.remove(processed_path)

    input_fingerprints_with_time = {h: t for h, t in input_fingerprints}

    # Group database fingerprints by spotify_ID
    db_fingerprints_by_song = {}
    for db_fp in db_fingerprints:
        spotify_id = db_fp["spotify_ID"]
        if spotify_id not in db_fingerprints_by_song:
            db_fingerprints_by_song[spotify_id] = []
        db_fingerprints_by_song[spotify_id].append((db_fp["hash"], db_fp["time"]))

    # Find potential matches and calculate confidence
    results = []
    for spotify_id, db_fps in db_fingerprints_by_song.items():
        # Find matching hashes and their time offsets
        time_offsets = []
        for db_hash, db_time in db_fps:
            if db_hash in input_fingerprints_with_time:
                input_time = input_fingerprints_with_time[db_hash]
                time_offsets.append(db_time - input_time)

        if time_offsets:
            # Find the most common time offset
            most_common_offset, num_matches = Counter(time_offsets).most_common(1)[0]

            # Calculate confidence based on the number of matches at the best offset
            # This is a more robust measure of similarity
            confidence = (num_matches / len(input_fingerprints)) * 100 if len(input_fingerprints) > 0 else 0

            song_details = get_song_details(spotify_id)
            if song_details:
                results.append({
                    "song_details": song_details,
                    "confidence": round(confidence, 2)
                })

    # Sort results by confidence
    results.sort(key=lambda x: x["confidence"], reverse=True)

    return results



# for testing purposes
# import glob

# if __name__ == "__main__":
#     music_fold_path = os.path.join("tests")
#     audio_files = glob.glob(os.path.join(music_fold_path, '*.mp3'))

#     all_results = []

#     for audio_file in audio_files:
#         print(f"\n--- Matching {os.path.basename(audio_file)} ---")
#         match_results = match(audio_file)
#         if match_results:
#             for result in match_results:
#                 result['file_name'] = os.path.basename(audio_file)
#                 all_results.append(result)
#         else:
#             print("--- No Match Found ---")

#     if all_results:
#         # Sort all results by confidence
#         all_results.sort(key=lambda x: x["confidence"], reverse=True)

#         print("\n--- Overall Match Results ---")
#         for i, result in enumerate(all_results[:10]):
#             details = result['song_details']
#             confidence = result['confidence']
#             file_name = result['file_name']
#             print(f"\n--- Rank {i+1} ---")
#             print(f"File: {file_name}")
#             print(f"Title: {details.get('title')}")
#             print(f"Artists: {details.get('artists')}")
#             print(f"Album: {details.get('album')}")
#             print(f"Release Year: {details.get('year')}")
#             print(f"Confidence: {confidence}%")
#             print("--------------------")
#     else:
#         print("\n--- No Matches Found in any of the files ---")