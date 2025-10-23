# TODO
"""
- take audio sample from user
- preprocessor engine (maybe on frontend for better retrieval times)
- spectrogram conversion engine
- fingerprinting engine
- query database based on diff between hash_times
"""
from engine.preprocessor import preprocessor
from engine.spectrogram import audio_to_spectrogram
from engine.fingerprinting import dummy_fingerprint

import os
import uuid

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


def process_audio_sample(audio_bytes: bytes) -> str:
    """
    # TEMPORARY:\n
    Saves the recieved file in a **temp** directory and returns The path of the saved file.
    """
    # Generate a unique filename
    filename = f"{uuid.uuid4()}.mp3"
    file_path = os.path.join(TEMP_DIR, filename)

    # Write the audio bytes to the file
    with open(file_path, "wb") as f:
        f.write(audio_bytes)

    return file_path
