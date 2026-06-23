import os
import sys
import json
import shutil
import tempfile
import time
import subprocess
from playwright.sync_api import sync_playwright
import imageio_ffmpeg

def main():
    if len(sys.argv) < 2:
        print("Usage: python export_video_headless.py <script_name>")
        sys.exit(1)

    script_name = sys.argv[1]
    slides_path = os.path.join("kichban", script_name, "slides.json")
    status_path = os.path.join("kichban", script_name, "export_status.json")
    mp4_dir = os.path.join("kichban", script_name, "mp4")
    mp3_dir = os.path.join("kichban", script_name, "mp3")
    
    os.makedirs(mp4_dir, exist_ok=True)
    
    def update_status(progress_pct, message=None, status="processing", error=None, filepath=None):
        data = {
            "status": status,
            "progress": progress_pct,
            "error": error,
            "filepath": filepath
        }
        if message:
            data["message"] = message
        with open(status_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    # 1. Load slides and validate
    if not os.path.exists(slides_path):
        update_status(0, error=f"Không tìm thấy slides.json tại {slides_path}", status="failed")
        sys.exit(1)

    try:
        with open(slides_path, "r", encoding="utf-8") as f:
            slides = json.load(f)
    except Exception as e:
        update_status(0, error=f"Lỗi đọc file slides.json: {str(e)}", status="failed")
        sys.exit(1)

    if not slides:
        update_status(0, error="Kịch bản không có slide nào", status="failed")
        sys.exit(1)

    # Resolve FFmpeg path
    try:
        ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        ffmpeg_path = os.path.abspath("ffmpeg.exe")

    # 2. Check and consolidate audio track
    audio_path = os.path.join(mp3_dir, "full_voice.mp3")
    if not os.path.exists(audio_path):
        # Fallback: check if individual slide MP3s exist and concatenate them
        individual_files = []
        for slide in slides:
            slide_mp3 = os.path.join(mp3_dir, f"{slide['id']}.mp3")
            if os.path.exists(slide_mp3):
                individual_files.append(slide_mp3)
        
        if len(individual_files) == len(slides):
            # Concatenate on the fly
            print("[+] missing full_voice.mp3, concatenating individual files...")
            concat_list_path = os.path.join(mp3_dir, "concat_list_temp.txt")
            try:
                with open(concat_list_path, "w", encoding="utf-8") as f:
                    for gf in individual_files:
                        f.write(f"file '{os.path.basename(gf)}'\n")
                
                cmd_concat = [
                    ffmpeg_path, "-y", "-f", "concat", "-safe", "0",
                    "-i", "concat_list_temp.txt", "-c", "copy", "full_voice.mp3"
                ]
                subprocess.run(cmd_concat, cwd=mp3_dir, capture_output=True)
                if os.path.exists(concat_list_path):
                    os.remove(concat_list_path)
            except Exception as concat_err:
                print(f"[-] concat failed: {concat_err}")
        
    has_audio = os.path.exists(audio_path)

    # 3. Start Playwright & render frames
    temp_dir = tempfile.mkdtemp(prefix="divideo_export_")
    try:
        with sync_playwright() as p:
            update_status(5, "Đang khởi tạo trình duyệt ảo...")
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1080, "height": 1920})
            page = context.new_page()
            
            # Navigate to local dashboard
            page.goto(f"http://localhost:5501/?script={script_name}")
            
            # Wait for window.getSlides function to be defined and slides to be populated
            page.wait_for_function("window.getSlides && window.getSlides().length > 0", timeout=15000)
            
            # Disable transitions to avoid animation lag/overlap during snapshots
            page.evaluate("""() => {
                const style = document.createElement('style');
                style.innerHTML = `
                    *, *::before, *::after {
                        transition: none !important;
                        transition-duration: 0s !important;
                        animation-play-state: paused !important;
                    }
                `;
                document.head.appendChild(style);
                document.getElementById('tiktok-canvas').classList.add('is-exporting-canvas');
            }""")
            
            # Render slides one by one
            frame_idx = 0
            fps = 30
            
            # Calculate total duration and expected frames
            total_duration = 0.0
            slide_durations = []
            for i, slide in enumerate(slides):
                duration = page.evaluate(f"window.getSlideDuration(window.slides[{i}])")
                slide_durations.append(duration)
                total_duration += duration
                
            total_expected_frames = max(1, int(total_duration * fps))
            
            for i, slide in enumerate(slides):
                duration = slide_durations[i]
                slide_frames = int(duration * fps)
                
                # Setup slide structure
                page.evaluate(f"""() => {{
                    window.selectSlide({i});
                    window.setIsPlayingForExport(true);
                    window.renderCanvasPreview(window.slides[{i}], 0, true);
                }}""")
                
                # Let assets settle
                time.sleep(0.15)
                
                # Wait for fonts and images to load completely inside #tiktok-canvas
                page.evaluate("""async () => {
                    await document.fonts.ready;
                    const imgs = Array.from(document.querySelectorAll('#tiktok-canvas img'));
                    await Promise.all(imgs.map(img => {
                        if (img.complete) return Promise.resolve();
                        return new Promise(resolve => {
                            img.onload = resolve;
                            img.onerror = resolve;
                        });
                    }));
                }""")
                
                # Render frame-by-frame
                for f in range(slide_frames):
                    t = f / fps
                    # Render progress preview (forceRebuild = false)
                    page.evaluate(f"window.renderCanvasPreview(window.slides[{i}], {t}, false);")
                    
                    # Capture screenshot of canvas container
                    frame_path = os.path.join(temp_dir, f"frame_{frame_idx:05d}.png")
                    page.locator("#tiktok-canvas").screenshot(path=frame_path)
                    
                    frame_idx += 1
                    
                    # Report progress (max 90% before encoding)
                    pct = 5 + int((frame_idx / total_expected_frames) * 85)
                    update_status(pct, f"Đang vẽ hình: Slide {i+1}/{len(slides)} ({f+1}/{slide_frames} frames)")
            
            browser.close()
            
    except Exception as e:
        update_status(0, error=f"Lỗi render trong trình duyệt: {str(e)}", status="failed")
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
        sys.exit(1)

    # 4. Compile with FFmpeg
    update_status(90, "Đang ghép âm thanh và mã hóa video MP4...")
    output_path = os.path.join(mp4_dir, "video.mp4")
    
    if os.path.exists(output_path):
        try:
            os.remove(output_path)
        except Exception as err:
            update_status(90, error=f"Không thể ghi đè file video cũ: {str(err)}", status="failed")
            shutil.rmtree(temp_dir)
            sys.exit(1)

    if has_audio:
        cmd = [
            ffmpeg_path, "-y",
            "-framerate", "30",
            "-i", os.path.join(temp_dir, "frame_%05d.png"),
            "-i", audio_path,
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            output_path
        ]
    else:
        cmd = [
            ffmpeg_path, "-y",
            "-framerate", "30",
            "-i", os.path.join(temp_dir, "frame_%05d.png"),
            "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            output_path
        ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            update_status(90, error=f"Lỗi chạy FFmpeg: {result.stderr}", status="failed")
            sys.exit(1)
            
        # Clean up temp frames
        shutil.rmtree(temp_dir)
        
        # Complete
        update_status(100, "Xuất video thành công!", status="completed", filepath=f"/kichban/{script_name}/mp4/video.mp4")
        print("[+] Video export completed successfully!")
    except Exception as e:
        update_status(90, error=f"Lỗi ghép nối video: {str(e)}", status="failed")
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
        sys.exit(1)

if __name__ == "__main__":
    main()
