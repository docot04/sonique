import os
from yt_dlp import YoutubeDL

output_dir = "downloads"

ydl_opts_template = {
    "format": "bestaudio/best",
    "postprocessors": [
        {"key": "FFmpegExtractAudio", "preferredcodec": "mp3", "preferredquality": "64"}
    ],
    "noplaylist": True,
    "cachedir": False,
    "quiet": True,
}


def yt_downloader(query: str, filename: str) -> str:
    """downloads YT audio using search query as mp3\n
    **PARAMS:** query (search query), filename (downloaded file)"""
    opts = ydl_opts_template.copy()
    opts["outtmpl"] = os.path.join(output_dir, f"{filename}.%(ext)s")

    with YoutubeDL(opts) as ydl:
        info = ydl.extract_info(f"ytsearch1:{query}", download=True)
        if "entries" in info:
            info = info["entries"][0]

    return os.path.join(output_dir, f"{filename}.mp3")
