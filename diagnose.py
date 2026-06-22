import os
import sys
import traceback

print("=========================================")
print("=== DIAGNOSING VOXCPM DEPENDENCIES ======")
print("=========================================")

print(f"[+] Python Version: {sys.version}")
print(f"[+] Python Executable: {sys.executable}")
print(f"[+] Current Directory: {os.getcwd()}")

dependencies = [
    "torch",
    "transformers",
    "safetensors",
    "tqdm",
    "librosa",
    "soundfile",
    "pydantic",
    "huggingface_hub",
    "imageio_ffmpeg"
]

print("\n--- Testing Imports ---")
all_ok = True
for dep in dependencies:
    try:
        __import__(dep)
        print(f"[OK] Successfully imported {dep}")
    except ImportError as e:
        print(f"[FAIL] Failed to import {dep}: {e}")
        all_ok = False

print("\n--- Testing VoxCPM Import ---")
try:
    sys.path.append(os.path.join(os.path.dirname(__file__), "VoxCPM", "src"))
    from voxcpm import VoxCPM
    print("[OK] Successfully imported VoxCPM!")
except Exception as e:
    print("[FAIL] Failed to import VoxCPM!")
    traceback.print_exc()
    all_ok = False

if all_ok:
    print("\n[SUCCESS] All dependencies and packages are OK!")
else:
    print("\n[ERROR] Some dependencies are missing. Please run:")
    print(f"  {sys.executable} -m pip install -r requirements.txt")
print("=========================================")
