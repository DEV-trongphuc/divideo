import asyncio
import os
from tts_handler import synthesize_audio

def test():
    text = "Xin chào các bạn, đây là thử nghiệm giọng nói tiếng Việt từ hệ thống của URNIO DEV."
    output_file = "test.wav"
    
    print(f"[+] Tiến hành tạo thử giọng đọc cho câu: '{text}'...")
    try:
        # We will use the fallback Edge-TTS to quickly verify it
        # as the full VoxCPM weights take time to download.
        success = synthesize_audio(
            text=text,
            output_path=output_file,
            voice_preference="vi-VN-HoaiMyNeural"
        )
        if success and os.path.exists(output_file):
            size = os.path.getsize(output_file)
            print(f"[+] Tạo giọng nói THÀNH CÔNG! Đã lưu file '{output_file}' ({size} bytes).")
        else:
            print("[-] Tạo giọng nói thất bại.")
    except Exception as e:
        print(f"[-] Có lỗi xảy ra: {e}")

if __name__ == "__main__":
    test()
