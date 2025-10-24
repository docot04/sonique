import os, base64, requests
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")


def spotify_parser(track_id: str):
    """returns metadata for a spotify song\n
    **PARAMS:** track_id (spotify songID)\n
    **RETURN:** {title, artists, album_name, cover (link), release_date, duration_ms}"""
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

    album = data.get("album", {})
    images = album.get("images", [])
    cover_url = images[0]["url"] if images else None

    return {
        "title": data.get("name"),
        "artists": ", ".join(a.get("name", "") for a in data.get("artists", [])),
        "album_name": album.get("name"),
        "cover": cover_url,
        "release_date": album.get("release_date"),
        "duration_ms": data.get("duration_ms"),
    }


## why this ???

def extract_spotify_ids(item_id: str, item_type: str):
    """extracts all track IDs from a Spotify album/playlist\n
    **PARAMS:** item_id (spotify album/playlist ID), item_type ("album" / "playlist")\n
    **RETURN:**list of track IDs
    """
    # Get access token
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
    headers = {"Authorization": f"Bearer {token}"}

    track_ids = []

    if item_type == "album":
        resp = requests.get(
            f"https://api.spotify.com/v1/albums/{item_id}/tracks",
            headers=headers,
            timeout=10,
        )
        if resp.status_code != 200:
            raise ValueError(f"Album ID {item_id} is invalid or not found")
        tracks = resp.json().get("items", [])
        track_ids = [t["id"] for t in tracks]

    elif item_type == "playlist":
        # Spotify paginates playlist tracks, so loop through pages
        url = f"https://api.spotify.com/v1/playlists/{item_id}/tracks"
        while url:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code != 200:
                raise ValueError(f"Playlist ID {item_id} is invalid or not found")
            data = resp.json()
            track_ids.extend(
                [
                    item["track"]["id"]
                    for item in data.get("items", [])
                    if item.get("track")
                ]
            )
            url = data.get("next")  # next page URL

    else:
        raise ValueError('item_type must be either "album" or "playlist"')

    return track_ids
