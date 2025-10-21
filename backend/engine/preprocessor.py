from pydub import AudioSegment


def preprocessor(file_path: str, target_bitrate=64_000, sample_rate=22050) -> str:
    """converts audio to mono channel + lowers bitrate\n
    **PARAMS:** file_path (mp3), target_bitrate, sample_rate\n
    **RETURN:** audio path"""
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_channels(1)
    audio = audio.set_frame_rate(sample_rate)
    processed_path = file_path.replace(".mp3", "_processed.mp3")
    audio.export(processed_path, format="mp3", bitrate=f"{target_bitrate//1000}k")
    return processed_path
