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

def match(file_path: str, threshold: int = 5):
    """
    Matches an audio file against the fingerprint database.

    Args:
        file_path (str): Path to the audio file.
        threshold (int): Minimum number of matching hashes to be considered a match.

    Returns:
        tuple: (bool, dict) where bool is True if a match is found,
               and dict contains the song details.
    """
    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        return False, {}

    try:
        with open(DB_JSON, "r") as f:
            db_data = json.load(f)
        db_fingerprints = db_data.get("fingerprints", [])
    except (FileNotFoundError, json.JSONDecodeError):
        print("[ERROR] Database not found or is corrupted.")
        return False, {}

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
        return False, {}
    finally:
        if processed_path and os.path.exists(processed_path):
            os.remove(processed_path)


    input_hashes = {fp["hash"] for fp in input_fingerprints}

    # Find potential matches
    matches = []
    for db_fp in db_fingerprints:
        if db_fp["hash"] in input_hashes:
            matches.append(db_fp["spotify_ID"])

    if not matches:
        return False, {}

    # Find the song with the most matches
    most_common_song = Counter(matches).most_common(1)
    if not most_common_song or most_common_song[0][1] < threshold:
        return False, {}

    best_match_id = most_common_song[0][0]
    song_details = get_song_details(best_match_id)

    if song_details:
        return True, song_details
    else:
        return False, {}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python match.py <audio_file>")
        sys.exit(1)

    audio_file = sys.argv[1]
    found, details = match(audio_file)

    if found:
        print("\n--- Match Found ---")
        print(f"Title: {details.get('title')}")
        print(f"Artists: {details.get('artists')}")
        print(f"Album: {details.get('album')}")
        print(f"Release Year: {details.get('year')}")
        print("--------------------")
    else:
        print("\n--- No Match Found ---")