import os, base64, requests
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")


def spotify_parser(track_id: str):
    """returns metadata for a spotify song\n
    **PARAMS:** track_id (spotify songID)\n
    **RETURN:** {title, artists, cover (link)}"""
    token_resp = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={
            "Authorization": f"Basic {base64.b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode()).decode()}"
        },
        data={"grant_type": "client_credentials"},
        timeout=10,
    )

    if token_resp.status_code != 200:
        raise Exception("Failed to get Spotify access token")

    token = token_resp.json().get("access_token")
    if not token:
        raise Exception("Spotify access token missing")

    resp = requests.get(
        f"https://api.spotify.com/v1/tracks/{track_id}",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    )

    if resp.status_code != 200:
        raise ValueError(f"Spotify track ID {track_id} is invalid or not found")

    data = resp.json()

    return {
        "title": data.get("name"),
        "artists": ", ".join(a.get("name", "") for a in data.get("artists", [])),
        "cover": (data.get("album", {}).get("images") or [{}])[0].get("url"),
    }
