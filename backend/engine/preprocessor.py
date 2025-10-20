from pydub import AudioSegment


def preprocessor(file_path: str, target_bitrate=64_000, sample_rate=22050) -> str:
    """converts audio to mono channel + lowers bitrate\n
    **PARAMS:** file_path (mp3), target_bitrate, sample_rate\n
    **RETURN:** audio path"""
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_channels(1)
    audio = audio.set_frame_rate(sample_rate)
    processed_path = file_path.replace(".mp3", "_processed.wav")
    audio.export(processed_path, format="wav")
    return processed_path
