import os, base64, requests
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")


def spotify_parser(track_id):
    """returns title, artists, cover URL for a spotify songID\n
    **PARAMS:** track_id: spotify songID"""
    token = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={
            "Authorization": f"Basic {base64.b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode()).decode()}"
        },
        data={"grant_type": "client_credentials"},
        timeout=10,
    ).json()["access_token"]

    data = requests.get(
        f"https://api.spotify.com/v1/tracks/{track_id}",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    ).json()

    return {
        "title": data.get("name", "Unknown Title"),
        "artists": ", ".join(a.get("name", "") for a in data.get("artists", [])),
        "cover": (data.get("album", {}).get("images") or [{}])[0].get("url"),
    }
