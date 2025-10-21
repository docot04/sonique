import hashlib
import random


def dummy_fingerprint(file_path: str, song_id: str):
    """simulate fingerprinting and return a list of dicts with entries: song_id, hash, time"""
    num_fingerprints = random.randint(100, 300)

    fingerprints = []
    for i in range(num_fingerprints):
        hash = hashlib.md5(f"{file_path}-{i}-{random.random()}".encode()).hexdigest()[
            :10
        ]
        time = round(random.uniform(0.0, 180.0), 2)
        fingerprints.append(
            {"spotify_ID": song_id, "hash_value": hash, "hash_time": time}
        )
    return fingerprints
