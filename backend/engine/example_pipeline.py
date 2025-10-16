import os
import time
from spotify_parser import spotify_parser
from yt_scraper import yt_downloader
from preprocessor import preprocessor
from spectrogram import audio_to_spectrogram
from fingerprinting import dummy_fingerprint


def spotify_to_fingerprint(track_id: str):
    """
    (placeholder) pipeline for indexing:\n
    Spotify ID (**input**) > get metadata > search metadata on YT and download mp3 > preprocess > gemnerate spectrogram > (dummy) fingerprinting > returns list of dicts: [{song_id, hash, time}, ...] (**output**)
    """
    # 1: get spoty metadata from song id
    info = spotify_parser(track_id)
    title = info.get("title", "Unknown Title")
    artists = info.get("artists", "Unknown Artist")
    print(f"[INFO] Track: {title} - {artists}")

    # 2. search spoty metadata on YT and download mp3
    query = f"{title} {artists}"
    safe_filename = f"{title}_{artists}".replace(" ", "_").replace("/", "_")
    audio_path = yt_downloader(query, safe_filename)
    print(f"[INFO] Downloaded audio: {audio_path}")

    # 3. preprocess audio
    processed_path = preprocessor(audio_path)
    print(f"[INFO] Preprocessed audio: {processed_path}")

    # 3.5. delete up original file
    if os.path.exists(audio_path):
        os.remove(audio_path)

    # 4: generate spectrogram (passed to fingerprinting)
    S_db = audio_to_spectrogram(processed_path)
    print(f"[INFO] Spectrogram shape: {S_db.shape}")

    # 5: generate dummy fingerprints (placeholder for real fingerprinting)
    fingerprints = dummy_fingerprint(processed_path, track_id)
    print(f"[INFO] Generated {len(fingerprints)} dummy fingerprints")

    # 5.5. delete processed file files
    if os.path.exists(processed_path):
        os.remove(processed_path)

    return fingerprints


songId = input("Enter song id: ")
start = time.time()
output = spotify_to_fingerprint(songId)
out_string = str(output)
with open("db.json", "w") as f:
    f.write(out_string)
end = time.time()
runtime = end - start
print("completed pipeline in: ")
print(runtime)
