import os
import sys
import re
import asyncio
import numpy as np
import soundfile as sf
import traceback
import base64
import requests

# Flag to indicate if VoxCPM is successfully initialized
VOXCPM_AVAILABLE = False
voxcpm_model = None

# Attempt to load VoxCPM
try:
    # Add VoxCPM repository folder to sys.path so we can import it
    sys.path.append(os.path.join(os.path.dirname(__file__), "VoxCPM", "src"))
    from voxcpm import VoxCPM
    VOXCPM_AVAILABLE = True
except Exception as e:
    print("[-] VoxCPM import not available. Using Edge-TTS fallback.", file=sys.stderr)
    print(f"[-] Details: {e}", file=sys.stderr)

def init_voxcpm(checkpoint_dir="./checkpoints/VoxCPM"):
    global voxcpm_model, VOXCPM_AVAILABLE
    if not VOXCPM_AVAILABLE:
        return False
    
    config_json = os.path.join(checkpoint_dir, "config.json")
    if not os.path.exists(config_json):
        print(f"[-] Checkpoint not found at {checkpoint_dir}. VoxCPM disabled until checkpoints are downloaded.", file=sys.stderr)
        return False

    try:
        print(f"[+] Initializing VoxCPM from {checkpoint_dir}...", file=sys.stderr)
        import torch
        # Auto detect GPU: prefer CUDA (RTX cards) over CPU
        device_override = "cuda" if torch.cuda.is_available() else "cpu"
        # Disable ZipEnhancer model loading to save massive RAM and GPU memory.
        # Fallback python spectral subtraction will be used instead.
        enable_denoiser = False
        
        print(f"[+] VoxCPM config: device={device_override}, denoiser={enable_denoiser}")
        voxcpm_model = VoxCPM(
            voxcpm_model_path=checkpoint_dir,
            enable_denoiser=enable_denoiser,
            optimize=False,
            device=device_override
        )
        print("[+] VoxCPM loaded successfully!", file=sys.stderr)
        return True
    except Exception as e:
        print(f"[-] Failed to initialize VoxCPM: {e}", file=sys.stderr)
        traceback.print_exc()
        return False

GOOGLE_API_KEY = "AIzaSyAhdEAlXfPDKcH2pc_XhGineeaQiSlKGho"

def synthesize_google_tts(text, voice_name, output_path):
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={GOOGLE_API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    
    # Strip the prefix "google-" if present
    g_voice = voice_name
    if g_voice.startswith("google-"):
        g_voice = g_voice[len("google-"):]
        
    payload = {
        "input": {
            "text": text
        },
        "voice": {
            "languageCode": "vi-VN" if "vi-VN" in g_voice else "en-US",
            "name": g_voice
        },
        "audioConfig": {
            "audioEncoding": "LINEAR16"  # Output standard WAV format
        }
    }
    
    response = requests.post(url, headers=headers, json=payload, timeout=5.0)
    if response.status_code != 200:
        raise Exception(f"Google TTS API error: {response.status_code} - {response.text}")
        
    data = response.json()
    audio_content = data.get("audioContent")
    if not audio_content:
        raise Exception("Google TTS returned empty audioContent")
        
    audio_bytes = base64.b64decode(audio_content)
    with open(output_path, "wb") as f:
        f.write(audio_bytes)
    return True

async def synthesize_edge_tts(text, voice, output_path):
    """Fallback synthesizer using Microsoft Edge-TTS (high quality neural voice)."""
    import edge_tts
    pitch = "+0Hz"
    rate = "+0%"
    
    if voice.endswith("-Warm"):
        voice = voice[:-5]
        pitch = "-7Hz"
    elif voice.endswith("-Deep"):
        voice = voice[:-5]
        pitch = "-12Hz"
        
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    await communicate.save(output_path)

def normalize_text_for_tts(text):
    if not text:
        return text
    
    # 1. Phonetic replacements for Vietnamese TTS (done first before tokenization)
    text = re.sub(r'\bDOM\b', 'Đom', text, flags=re.IGNORECASE)
    text = re.sub(r'\bQR\s*Code\b', 'Quy Rờ Code', text, flags=re.IGNORECASE)
    text = re.sub(r'\bQR\b', 'Quy Rờ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bQ\s+R\b', 'Quy Rờ', text, flags=re.IGNORECASE)
    
    # Levels (Cấp độ L/M/Q/H or Cấp độ sửa lỗi L/M/Q/H)
    def replace_level(match):
        prefix = match.group(1)
        letter = match.group(2).upper()
        mapping = {
            'L': 'lờ',
            'M': 'mờ',
            'Q': 'quy',
            'H': 'Hát'
        }
        return f"{prefix}{mapping.get(letter, letter)}"
    
    text = re.sub(r'\b(cấp độ\s+(?:sửa lỗi\s+)?)([lmqh])\b', replace_level, text, flags=re.IGNORECASE)

    whitelist = {
        "SQL", "CPU", "RAM", "IP", "MV", "AI", "CSDL", "DB", "LLM", "TTL", "OOM", "F5", "HTTP", "API", "ID", "HTML"
    }
    
    def replace_word(match):
        word = match.group(0)
        if word.isupper() and any(c.isalpha() for c in word):
            if word not in whitelist:
                # Print to stdout/stderr so we can trace it in logs
                print(f"[TTS NORMALIZER] Lowercasing word: {word}")
                return word.lower()
        return word
        
    return re.sub(r'\b[A-Za-z0-9_]+\b', replace_word, text)

def simple_spectral_denoise(file_path):
    """Pure Python spectral subtraction noise reduction (no external DLL dependencies)."""
    import soundfile as sf
    import scipy.signal
    import numpy as np

    # Load audio using soundfile instead of librosa
    audio, sr = sf.read(file_path)
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    if sr != 16000:
        num_samples = int(len(audio) * 16000 / sr)
        audio = scipy.signal.resample(audio, num_samples)
        sr = 16000
    
    # Compute Short-Time Fourier Transform (STFT)
    f, t, Zxx = scipy.signal.stft(audio, fs=sr, nperseg=512)
    
    # Estimate noise profile from the first 12 frames (usually silence/background noise at start)
    noise_estimation = np.mean(np.abs(Zxx[:, :12]), axis=1, keepdims=True)
    
    # Perform spectral subtraction
    magnitude = np.abs(Zxx)
    phase = np.angle(Zxx)
    
    # Subtract noise floor (over-subtraction factor 1.8 to clean background hiss)
    subtracted_magnitude = magnitude - 1.8 * noise_estimation
    subtracted_magnitude = np.maximum(subtracted_magnitude, 0.02 * magnitude)
    
    # Reconstruct and inverse STFT
    Zxx_clean = subtracted_magnitude * np.exp(1j * phase)
    _, audio_clean = scipy.signal.istft(Zxx_clean, fs=sr)
    
    # Save clean audio back to the file path
    sf.write(file_path, audio_clean, sr)
    return file_path


def ensure_voice_cache(reference_audio_path):
    if not reference_audio_path or not reference_audio_path.endswith(".wav"):
        return reference_audio_path
        
    pt_path = reference_audio_path[:-4] + ".pt"
    if os.path.exists(pt_path):
        return pt_path
        
    if not os.path.exists(reference_audio_path):
        return reference_audio_path
        
    try:
        import soundfile as sf
        import torch
        import shutil
        import scipy.signal
        
        denoised_ok = False
        global voxcpm_model
        # Use ZipEnhancer denoiser to clean the reference WAV file before caching
        if voxcpm_model is not None and getattr(voxcpm_model, 'denoiser', None) is not None:
            print(f"[+] Denoising reference audio {reference_audio_path} before caching...", flush=True)
            temp_clean_path = reference_audio_path[:-4] + "_clean.wav"
            try:
                voxcpm_model.denoiser.enhance(reference_audio_path, temp_clean_path)
                if os.path.exists(temp_clean_path):
                    shutil.move(temp_clean_path, reference_audio_path)
                    print("[+] Reference audio denoised successfully via ZipEnhancer!", flush=True)
                    denoised_ok = True
            except Exception as denoise_err:
                print(f"[-] Failed to denoise reference audio with ZipEnhancer: {denoise_err}.", flush=True)
                if os.path.exists(temp_clean_path):
                    try:
                        os.remove(temp_clean_path)
                    except:
                        pass
        
        # Fallback to pure Python spectral subtraction denoiser if ZipEnhancer failed or was skipped
        if not denoised_ok:
            try:
                print(f"[+] Running fallback python spectral subtraction denoiser for {reference_audio_path}...", flush=True)
                simple_spectral_denoise(reference_audio_path)
                print("[+] Fallback python denoising completed successfully!", flush=True)
            except Exception as fallback_err:
                print(f"[-] Fallback python denoiser failed: {fallback_err}. Proceeding with original audio.", flush=True)
        
        print(f"[+] Cache not found for {reference_audio_path}. Automating slice & cache generation...")
        
        # Load and check duration
        data, samplerate = sf.read(reference_audio_path)
        if len(data.shape) > 1:
            data = data[:, 0]
            
        num_samples = int(10 * samplerate)
        if len(data) > num_samples:
            print(f"[+] Slicing reference audio {reference_audio_path} to first 10 seconds...")
            data = data[:num_samples]
            sf.write(reference_audio_path, data, samplerate)
            
        if voxcpm_model is not None and hasattr(voxcpm_model, 'tts_model'):
            model = voxcpm_model.tts_model
            audio_vae = getattr(model, "audio_vae", None)
            if audio_vae is not None:
                print(f"[+] Encoding reference audio using initialized AudioVAE...")
                audio = data
                sr = samplerate
                if sr != 16000:
                    num_samples_res = int(len(audio) * 16000 / sr)
                    audio = scipy.signal.resample(audio, num_samples_res)
                    
                audio_tensor = torch.from_numpy(audio).float().unsqueeze(0).to(model.device)
                
                patch_size = getattr(model, "patch_size", 4)
                chunk_size = getattr(audio_vae, "chunk_size", 16)
                patch_len = patch_size * chunk_size
                
                if audio_tensor.size(1) % patch_len != 0:
                    padding_size = patch_len - audio_tensor.size(1) % patch_len
                    audio_tensor = torch.nn.functional.pad(audio_tensor, (0, padding_size))
                
                with torch.no_grad():
                    feat = audio_vae.encode(audio_tensor, 16000).cpu()
                    latent_dim = getattr(audio_vae, "latent_dim", 64)
                    ref_audio_feat = feat.view(latent_dim, -1, patch_size).permute(1, 2, 0)
                
                cache = {
                    "ref_audio_feat": ref_audio_feat,
                    "mode": "reference"
                }
                torch.save(cache, pt_path)
                print(f"[+] Successfully generated and saved cache to {pt_path}")
                return pt_path
    except Exception as e:
        print(f"[-] Auto cache generation failed: {e}", file=sys.stderr)
        traceback.print_exc()
        
    return reference_audio_path

def synthesize_audio(text, output_path, reference_audio_path=None, voice_preference="vi-VN-NamMinhNeural"):
    """
    Synthesize audio from text.


    If voice_preference starts with "google-", uses Google Cloud TTS API.
    If VoxCPM is available and initialized, uses VoxCPM for voice cloning.
    Otherwise, falls back to Edge-TTS.
    """
    # Map Northern voices to Southern fallback voices to prevent Northern voices from being generated
    if voice_preference in ["google-vi-VN-Neural2-D", "google-vi-VN-Wavenet-D", "vi-VN-HoaiMyNeural"]:
        voice_preference = "vi-VN-NamMinhNeural"
    elif voice_preference == "google-vi-VN-Neural2-A":
        voice_preference = "google-vi-VN-Wavenet-C" # Southern Female

    # Clean up input text
    text = text.strip()
    if not text:
        raise ValueError("Text to synthesize cannot be empty.")
    
    # Normalize uppercase words to prevent spelling-out by TTS
    text = normalize_text_for_tts(text)
    
    # Map default_voxcpm to the local high-quality voice file
    if reference_audio_path == "default_voxcpm":
        reference_audio_path = "voices/giong_nam_tram_am.wav"
        
    # Auto-caching: use pre-encoded prompt cache (.pt) if available
    if reference_audio_path and reference_audio_path.endswith(".wav"):
        pt_path = reference_audio_path[:-4] + ".pt"
        if os.path.exists(pt_path):
            print(f"[+] Found pre-encoded speaker cache {pt_path}, swapping to fast path.")
            reference_audio_path = pt_path
        
    # If a reference voice is requested, we MUST use VoxCPM. No fallback to Google/Edge.
    if reference_audio_path:
        if not VOXCPM_AVAILABLE:
            raise RuntimeError("[-] VoxCPM package hoặc dependencies không khả dụng. Hãy chắc chắn đã chạy pip install thành công.")
            
        if not os.path.exists(reference_audio_path):
            raise FileNotFoundError(f"[-] Không tìm thấy file âm thanh giọng mẫu: {reference_audio_path}")
            
        global voxcpm_model
        if voxcpm_model is None:
            if os.path.exists("./checkpoints/VoxCPM/config.json"):
                init_voxcpm()
            else:
                raise FileNotFoundError("[-] Không tìm thấy mô hình VoxCPM (config.json) tại ./checkpoints/VoxCPM/. Hãy tải mô hình trước bằng: node run_synthesis.js")
        
        if voxcpm_model is None:
            raise RuntimeError("[-] Không thể khởi tạo mô hình VoxCPM. Vui lòng kiểm tra dung lượng RAM hoặc log lỗi khởi động server.")
            
        if reference_audio_path.endswith(".wav"):
            reference_audio_path = ensure_voice_cache(reference_audio_path)
        
        max_retries = 3
        last_err = None
        import time
        import torch
        
        for attempt in range(1, max_retries + 1):
            try:
                print(f"[+] VoxCPM synthesis attempt {attempt}/{max_retries} for {output_path}...")
                with torch.no_grad():
                    # Check if VoxCPM model has synthesize method, else use generate method
                    if hasattr(voxcpm_model, 'synthesize'):
                        audio_array = voxcpm_model.synthesize(
                            text=text,
                            reference_audio=reference_audio_path
                        )
                    else:
                        # Set 8 steps on GPU (balanced speed/quality) and 6 steps on CPU
                        steps = 8 if torch.cuda.is_available() else 6
                        denoise_flag = False  # Bypassed post-denoiser since the cached .pt file is already pre-denoised
                        print(f"[+] VoxCPM generating with timesteps={steps}, denoise={denoise_flag}")
                        
                        audio_array = voxcpm_model.generate(
                            text=text,
                            reference_wav_path=reference_audio_path,
                            inference_timesteps=steps,
                            denoise=denoise_flag,
                            retry_badcase=False
                        )
                    print(f"[+] Synthesized to {output_path} using VoxCPM Voice Cloning: {reference_audio_path}")
                
                # Write to output file using model's sample rate (default 16000 or 48000)
                sample_rate = getattr(voxcpm_model.tts_model, "sample_rate", 16000)
                
                # Tăng/Chuẩn hóa âm lượng tự động (Peak Normalization về mức 95% âm lượng tối đa)
                max_val = np.max(np.abs(audio_array))
                if max_val > 0:
                    audio_array = audio_array / max_val * 0.95
                
                sf.write(output_path, audio_array, sample_rate)
                return True
            except Exception as e:
                print(f"[-] VoxCPM synthesis attempt {attempt} failed: {e}", file=sys.stderr)
                traceback.print_exc()
                last_err = e
                if attempt < max_retries:
                    time.sleep(1.0) # Wait 1 second before retrying
        
        # If we reached here, all retries failed. Do NOT fall through to other synthesizers.
        raise RuntimeError(f"VoxCPM synthesis failed after {max_retries} attempts: {last_err}")

    # Try using Google TTS if requested
    if voice_preference.startswith("google-"):
        print(f"[+] Generating audio using Google TTS (voice: {voice_preference})...")
        try:
            synthesize_google_tts(text, voice_preference, output_path)
            print(f"[+] Synthesized to {output_path} using Google TTS.")
            return True
        except Exception as e:
            print(f"[-] Google TTS failed: {e}. Falling back to normal flow.", file=sys.stderr)
            # Fall through to other synthesizers if Google API fails

    # Fallback to Edge-TTS
    # Choose voice based on Vietnamese presence in text or voice preference
    voice = voice_preference
    
    # Map Google voice names to Edge-TTS voice names if we are calling Edge-TTS
    if voice.startswith("google-"):
        original_google_voice = voice
        if "vi-VN" in voice:
            # If the Google voice was male, map to Edge male voice
            if any(m in voice for m in ["-B", "-D"]):
                voice = "vi-VN-NamMinhNeural"
            else:
                voice = "vi-VN-NamMinhNeural" # Map female Google to Southern female
        else:
            # English voices
            if any(m in voice for m in ["-B", "-D", "-Guy"]):
                voice = "en-US-GuyNeural"
            else:
                voice = "en-US-AriaNeural"
        print(f"[+] Mapped Google voice '{original_google_voice}' to Edge-TTS fallback voice '{voice}'", file=sys.stderr)

    # Simple check for Vietnamese characters
    vi_chars = ["á", "à", "ả", "ã", "ạ", "ắ", "ằ", "ẳ", "ẵ", "ặ", "ấ", "ầ", "ẩ", "ẫ", "ậ", 
                "é", "è", "ẻ", "ẽ", "ẹ", "ế", "ề", "ể", "ễ", "ệ", "í", "ì", "ỉ", "ĩ", "ị", 
                "ó", "ò", "ỏ", "õ", "ọ", "ố", "ồ", "ổ", "ỗ", "ộ", "ớ", "ờ", "ở", "ỡ", "ợ", 
                "ú", "ù", "ủ", "ũ", "ụ", "ứ", "ừ", "ử", "ữ", "ự", "ý", "ỳ", "ỷ", "ỹ", "ỵ", "đ"]
    
    is_vietnamese = any(char in text.lower() for char in vi_chars)
    if is_vietnamese and "vi-VN" not in voice:
        # Default high-quality Vietnamese voice
        voice = "vi-VN-NamMinhNeural" # Male Southern voice
        
    print(f"[+] Generating audio using Edge-TTS (voice: {voice})...")
    try:
        asyncio.run(synthesize_edge_tts(text, voice, output_path))
        print(f"[+] Synthesized to {output_path} using Edge-TTS.")
        return True
    except Exception as e:
        print(f"[-] Edge-TTS synthesis failed: {e}", file=sys.stderr)
        traceback.print_exc()
        raise e

