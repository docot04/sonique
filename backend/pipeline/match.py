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
