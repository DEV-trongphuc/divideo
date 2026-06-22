import os
from huggingface_hub import snapshot_download

def download():
    print("[+] Starting download of 'openbmb/VoxCPM2' weights to './checkpoints/VoxCPM'...")
    os.makedirs("./checkpoints/VoxCPM", exist_ok=True)
    try:
        # Download the snapshot into the local folder, disabling symlinks for a flat filesystem setup
        snapshot_download(
            repo_id="openbmb/VoxCPM2",
            local_dir="./checkpoints/VoxCPM",
            local_dir_use_symlinks=False
        )
        print("[+] Download COMPLETED successfully! All checkpoint files are located in ./checkpoints/VoxCPM")
    except Exception as e:
        print(f"[-] Download failed: {e}")

if __name__ == "__main__":
    download()
