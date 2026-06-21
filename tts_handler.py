import os
import sys
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
        # Note: optimize=False by default to avoid long torch.compile delays on startup
        voxcpm_model = VoxCPM(voxcpm_model_path=checkpoint_dir, enable_denoiser=False, optimize=False)
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
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)

def synthesize_audio(text, output_path, reference_audio_path=None, voice_preference="en-US-AriaNeural"):
    """
    Synthesize audio from text.
    If voice_preference starts with "google-", uses Google Cloud TTS API.
    If VoxCPM is available and initialized, uses VoxCPM for voice cloning.
    Otherwise, falls back to Edge-TTS.
    """
    # Clean up input text
    text = text.strip()
    if not text:
        raise ValueError("Text to synthesize cannot be empty.")
    
    # Map default_voxcpm to the local high-quality voice file
    if reference_audio_path == "default_voxcpm":
        reference_audio_path = "voices/giong_nam_tram_am.wav"
        
    is_voxcpm_selected = VOXCPM_AVAILABLE and reference_audio_path and os.path.exists(reference_audio_path)
    
    if is_voxcpm_selected:
        global voxcpm_model
        if voxcpm_model is None:
            if os.path.exists("./checkpoints/VoxCPM/config.json"):
                init_voxcpm()
        
        if voxcpm_model is not None:
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
                            audio_array = voxcpm_model.generate(
                                text=text,
                                reference_wav_path=reference_audio_path,
                                inference_timesteps=6,
                                retry_badcase=False
                            )
                        print(f"[+] Synthesized to {output_path} using VoxCPM Voice Cloning: {reference_audio_path}")
                    
                    # Write to output file using model's sample rate (default 16000 or 48000)
                    sample_rate = getattr(voxcpm_model.tts_model, "sample_rate", 16000)
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
                voice = "vi-VN-HoaiMyNeural"
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
        voice = "vi-VN-HoaiMyNeural" # Female, or vi-VN-NamMinhNeural (Male)
        
    print(f"[+] Generating audio using Edge-TTS (voice: {voice})...")
    try:
        asyncio.run(synthesize_edge_tts(text, voice, output_path))
        print(f"[+] Synthesized to {output_path} using Edge-TTS.")
        return True
    except Exception as e:
        print(f"[-] Edge-TTS synthesis failed: {e}", file=sys.stderr)
        traceback.print_exc()
        raise e

