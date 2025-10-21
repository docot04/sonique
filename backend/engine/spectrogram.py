import numpy as np
import librosa


def audio_to_spectrogram(file_path: str, sr=16000, n_fft=4096, hop_length=512):
    """
    convert audio file to linear spectrogram in dB scale (np.ndarray)\n
    **PARAMS:** file_path (mp3), sr (sample rate), n_fft(FFT passes), hop_length\n
    **RETURN:** numpy array"""

    y, _ = librosa.load(file_path, sr=sr, mono=True)
    S = np.abs(librosa.stft(y, n_fft=n_fft, hop_length=hop_length))
    S_db = librosa.amplitude_to_db(S, ref=np.max)
    return S_db
