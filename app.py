import os
import sys
import json
import threading
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tts_handler
from tts_handler import init_voxcpm, synthesize_audio

app = Flask(__name__, static_folder="static", static_url_path="/static")
CORS(app)

# Ensure folders exist
os.makedirs("static", exist_ok=True)
os.makedirs("static/generated", exist_ok=True)
os.makedirs("voices", exist_ok=True)

SLIDES_FILE = "slides.json"
VOXCPM_DOWNLOAD_STATUS = {"status": "idle", "progress": 0, "error": None}

# Default slides to bootstrap the dashboard
DEFAULT_SLIDES = [
    {
        "id": "slide_1",
        "title": "TỐI ƯU HÓA BACK-END",
        "subtitle": "Kỹ thuật tối ưu hóa Database & Caching cho lập trình viên",
        "layout": "title",
        "script": "Cách tối ưu hóa backend, database và caching giúp ứng dụng chạy nhanh như chớp.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 6.0,
        "cards": [],
        "code": "",
        "diagram": []
    },
    {
        "id": "slide_2",
        "title": "Đọc cache trước, DB sau.",
        "subtitle": "Quy trình hoạt động của cơ chế Caching",
        "layout": "diagram",
        "script": "Khi có request, đọc cache trước. Nếu cache hit, trả về ngay. Nếu cache miss, đọc database rồi lưu lại cache.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 8.0,
        "cards": [],
        "code": "",
        "diagram": [
            {"id": "node_1", "label": "Client Request", "type": "start"},
            {"id": "node_2", "label": "Đọc Cache (Redis)", "type": "process"},
            {"id": "node_3", "label": "CACHE HIT (0.5ms)", "type": "success", "note": "Trả về dữ liệu"},
            {"id": "node_4", "label": "CACHE MISS", "type": "warning", "note": "Truy vấn DB (50ms)"},
            {"id": "node_5", "label": "Cập nhật Cache", "type": "process"}
        ]
    },
    {
        "id": "slide_3",
        "title": "Sử dụng Database Indexes",
        "subtitle": "Tối ưu hóa tốc độ tìm kiếm bản ghi",
        "layout": "code",
        "script": "Tạo index trên các trường thường xuyên tìm kiếm để tối ưu tốc độ truy vấn database.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 7.0,
        "cards": [],
        "code": "-- TRƯỚC KHI TỐI ƯU (Quét toàn bảng - O(N))\nSELECT * FROM users WHERE email = 'contact@urnio.dev';\n\n-- SAU KHI TỐI ƯU (Tạo index tìm kiếm - O(log N))\nCREATE INDEX idx_users_email ON users(email);\n\n-- Truy vấn giờ đây chạy cực kỳ nhanh!\nSELECT * FROM users WHERE email = 'contact@urnio.dev';",
        "diagram": []
    },
    {
        "id": "slide_4",
        "title": "3 Chiến Lược Tối Ưu Backend",
        "subtitle": "Các trụ cột cốt lõi để nâng cao hiệu năng hệ thống",
        "layout": "cards",
        "script": "Tóm lại, ta cần 3 trụ cột: đánh index DB, áp dụng caching và sử dụng hàng đợi bất đồng bộ.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 8.0,
        "cards": [
            {"icon": "database", "title": "Index DB", "desc": "Giúp tìm kiếm bản ghi tức thì, tránh full table scan."},
            {"icon": "zap", "title": "Caching", "desc": "Lưu trữ dữ liệu tạm thời để giảm tải truy cập DB chính."},
            {"icon": "git-branch", "title": "Queue / Async", "desc": "Chạy các tác vụ tốn thời gian ở chế độ nền (Gửi mail, nén ảnh)."}
        ],
        "code": "",
        "diagram": []
    }
]

DEFAULT_SLIDES_MEMO = [
    {
        "id": "slide_memo_1",
        "title": "BỘ NÃO HOẠT ĐỘNG THẾ NÀO?",
        "subtitle": "Cơ chế 'Cognitive Dispatch' điều phối thông tin của não bộ",
        "layout": "title",
        "script": "Não bộ của chúng ta hoạt động như một bộ xử lý trung tâm, liên tục nhận thông tin kích thích và điều phối các phản ứng cảm xúc hành vi.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 7.0,
        "cards": [],
        "code": "",
        "diagram": []
    },
    {
        "id": "slide_memo_2",
        "title": "Kích thích -> Phản hồi",
        "subtitle": "Quy trình xử lý của hệ thống nhận thức",
        "layout": "diagram",
        "script": "Khi có kích thích từ môi trường, não bộ sẽ truy xuất vùng nhớ đệm trước. Nếu có phản xạ sẵn, nó sẽ phản hồi ngay lập tức để tiết kiệm năng lượng xử lý.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 9.0,
        "cards": [],
        "code": "",
        "diagram": [
            {"id": "node_m1", "label": "Kích thích bên ngoài", "type": "start"},
            {"id": "node_m2", "label": "Quét bộ nhớ đệm (Cache)", "type": "process"},
            {"id": "node_m3", "label": "PHẢN XẠ NHANH (0.1s)", "type": "success", "note": "Không cần suy nghĩ"},
            {"id": "node_m4", "label": "SUY NGHĨ SÂU", "type": "warning", "note": "Phân tích logic (Vỏ não mới)"},
            {"id": "node_m5", "label": "Lưu lại phản xạ mới", "type": "process"}
        ]
    },
    {
        "id": "slide_memo_3",
        "title": "Hội Chứng Phân Phối Nhận Thức",
        "subtitle": "Đánh giá khả năng xử lý thông tin",
        "layout": "code",
        "script": "Trong tâm lý học nhận thức, việc phân phối tín hiệu được tối ưu hóa qua các thói quen hàng ngày để giảm tải cho vỏ não mới.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 8.0,
        "cards": [],
        "code": "// QUY TRÌNH PHÂN PHỐI NHẬN THỨC\nif (Stimulus == Familiar) {\n    TriggerHabitPath(); // Tốn 0% ý thức\n} else {\n    EngageAnalyticalThinking(); // Tốn 100% ý thức và glucose\n}\n\n// Kết quả: Tạo ra thói quen tốt để tối ưu hóa bộ não!",
        "diagram": []
    },
    {
        "id": "slide_memo_4",
        "title": "3 Trụ Cột Của Trí Nhớ",
        "subtitle": "Các giai đoạn hình thành ký ức trong não bộ",
        "layout": "cards",
        "script": "Tóm lại, trí nhớ được hình thành qua 3 giai đoạn chính: Mã hóa thông tin nhận thức, Lưu trữ dài hạn, và Truy xuất (Memo Dispatch) khi cần.",
        "voice": "google-vi-VN-Neural2-D",
        "refVoice": "",
        "audioPath": "",
        "duration": 9.0,
        "cards": [
            {"icon": "zap", "title": "Mã hóa (Encoding)", "desc": "Chuyển kích thích vật lý thành tín hiệu điện hóa thần kinh."},
            {"icon": "database", "title": "Lưu trữ (Storage)", "desc": "Duy trì thông tin theo thời gian (ngắn hạn hoặc dài hạn)."},
            {"icon": "git-branch", "title": "Truy xuất (Retrieval)", "desc": "Gửi thông tin từ kho lưu trữ về ý thức để sử dụng."}
        ],
        "code": "",
        "diagram": []
    }
]

import re

def sanitize_script_name(name):
    if not name:
        return "video1"
    # Allow only alphanumeric, underscores, and hyphens to prevent path traversal
    sanitized = re.sub(r'[^a-zA-Z0-9_\-]', '', name)
    return sanitized if sanitized else "video1"

def get_project_folder(project_name):
    if project_name == "DOMMemo":
        return "kichban_memo"
    return "kichban"

def get_slides_path(script_name, project_name="TurnioDEV"):
    script_name = sanitize_script_name(script_name)
    project_folder = get_project_folder(project_name)
    folder = os.path.join(project_folder, script_name)
    os.makedirs(folder, exist_ok=True)
    return os.path.join(folder, "slides.json")

def load_slides(script_name="video1", project_name="TurnioDEV"):
    path = get_slides_path(script_name, project_name)
    if not os.path.exists(path):
        defaults = DEFAULT_SLIDES_MEMO if project_name == "DOMMemo" else DEFAULT_SLIDES
        # Bootstrap: if loading video1 and root slides.json exists, use it.
        # Otherwise bootstrap from defaults.
        if project_name == "TurnioDEV" and script_name == "video1" and os.path.exists(SLIDES_FILE):
            try:
                with open(SLIDES_FILE, "r", encoding="utf-8") as f:
                    slides = json.load(f)
                with open(path, "w", encoding="utf-8") as f:
                    json.dump(slides, f, ensure_ascii=False, indent=2)
                return slides
            except Exception:
                pass
        
        with open(path, "w", encoding="utf-8") as f:
            json.dump(defaults, f, ensure_ascii=False, indent=2)
        return defaults
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        defaults = DEFAULT_SLIDES_MEMO if project_name == "DOMMemo" else DEFAULT_SLIDES
        return defaults

def save_slides(slides, script_name="video1", project_name="TurnioDEV"):
    path = get_slides_path(script_name, project_name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(slides, f, ensure_ascii=False, indent=2)

# Startup Initialization of VoxCPM in background
def start_voxcpm_async():
    init_voxcpm()

threading.Thread(target=start_voxcpm_async, daemon=True).start()

# API Endpoints
@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/kichban/<path:filename>")
def serve_kichban(filename):
    return send_from_directory("kichban", filename)

@app.route("/kichban_memo/<path:filename>")
def serve_kichban_memo(filename):
    return send_from_directory("kichban_memo", filename)

@app.route("/logo.png")
def serve_logo():
    return send_from_directory(app.root_path, "logo.png")

@app.route("/Dom_memo.png")
@app.route("/dom_memo.png")
def serve_dom_memo_logo():
    return send_from_directory(app.root_path, "Dom_memo.png")


@app.route("/api/slides", methods=["GET"])
def get_slides():
    script_name = request.args.get("script", "video1")
    project_name = request.args.get("project", "TurnioDEV")
    return jsonify(load_slides(script_name, project_name))

@app.route("/api/slides", methods=["POST"])
def update_slides():
    script_name = request.args.get("script", "video1")
    project_name = request.args.get("project", "TurnioDEV")
    slides = request.json
    save_slides(slides, script_name, project_name)
    return jsonify({"success": True, "message": f"Slides for {script_name} saved successfully."})

@app.route("/api/scripts", methods=["GET"])
def get_scripts():
    project_name = request.args.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)
    scripts = []
    if os.path.exists(project_folder):
        for entry in os.listdir(project_folder):
            if os.path.isdir(os.path.join(project_folder, entry)):
                # Ensure slides.json exists in directory to consider it a script
                if os.path.exists(os.path.join(project_folder, entry, "slides.json")):
                    scripts.append(entry)
                elif entry == "video1":
                    scripts.append(entry)
    if "video1" not in scripts:
        scripts.insert(0, "video1")
        
    # Sort scripts list numerically (e.g. video2 before video10)
    import re
    def get_num(s):
        match = re.search(r'\d+', s)
        return int(match.group()) if match else 0
    scripts = sorted(list(set(scripts)), key=get_num)
    
    return jsonify(scripts)

@app.route("/api/scripts", methods=["POST"])
def create_script():
    data = request.json or {}
    name = data.get("name", "").strip()
    project_name = data.get("project", "TurnioDEV")
    if not name:
        return jsonify({"error": "Tên kịch bản không được để trống"}), 400
    
    script_name = sanitize_script_name(name)
    if script_name == "video1" and name != "video1":
        return jsonify({"error": "Tên kịch bản không hợp lệ (chỉ chấp nhận chữ cái, số, gạch dưới, gạch ngang)"}), 400
    
    # Check if script folder already exists
    path = get_slides_path(script_name, project_name)
    if os.path.exists(path):
        return jsonify({"error": f"Kịch bản '{script_name}' đã tồn tại"}), 400
    
    # Initialize it with defaults
    load_slides(script_name, project_name)
    return jsonify({"success": True, "name": script_name})


@app.route("/api/voices", methods=["GET"])
def get_voices():
    # List reference WAV files in voices/ folder
    voices = []
    for f in os.listdir("voices"):
        if f.lower().endswith(".wav"):
            voices.append(f)
    return jsonify({
        "voxcpm_available": tts_handler.VOXCPM_AVAILABLE,
        "voices": voices,
        "fallback_voices": [
            {"id": "google-vi-VN-Wavenet-B", "name": "Google: Nam MN (Miền Nam, Wavenet)"},
            {"id": "google-vi-VN-Standard-B", "name": "Google: Nam MN (Miền Nam, Standard)"},
            {"id": "google-vi-VN-Neural2-D", "name": "Google: Nam MB (Trầm ấm, Neural2)"},
            {"id": "google-vi-VN-Wavenet-D", "name": "Google: Nam MB (Miền Bắc, Wavenet)"},
            {"id": "google-vi-VN-Wavenet-C", "name": "Google: Nữ MN (Miền Nam, Wavenet)"},
            {"id": "google-vi-VN-Neural2-A", "name": "Google: Nữ MB (Miền Bắc, Neural2)"},
            {"id": "vi-VN-NamMinhNeural", "name": "Edge: Nam Minh (Nam VN - Trầm ấm)"},
            {"id": "vi-VN-NamMinhNeural-Warm", "name": "Edge: Nam Minh (Miền Nam - Trầm ấm, Hạ Tone)"},
            {"id": "vi-VN-NamMinhNeural-Deep", "name": "Edge: Nam Minh (Miền Nam - Giọng trầm sâu)"},
            {"id": "vi-VN-HoaiMyNeural", "name": "Edge: Hoài Mỹ (Nữ VN - Truyền cảm)"},
            {"id": "en-US-AriaNeural", "name": "Edge: Aria (Female US)"},
            {"id": "en-US-GuyNeural", "name": "Edge: Guy (Male US)"}
        ]
    })

@app.route("/api/upload-voice", methods=["POST"])
def upload_voice():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.lower().endswith('.wav'):
        # Ensure clean filename
        filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '', file.filename)
        if not filename.lower().endswith('.wav'):
            filename += '.wav'
        
        filepath = os.path.join("voices", filename)
        file.save(filepath)
        return jsonify({"success": True, "filename": filename})
    else:
        return jsonify({"error": "Only .wav files are allowed"}), 400

@app.route("/api/synthesize", methods=["POST"])
def synthesize():
    data = request.json or {}
    slide_id = data.get("slideId")
    text = data.get("text", "").strip()
    ref_voice = data.get("refVoice", "")
    voice_preference = data.get("voice", "vi-VN-HoaiMyNeural")
    script_name = sanitize_script_name(data.get("script", "video1"))
    project_name = data.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)

    if not slide_id or not text:
        return jsonify({"error": "Missing slideId or text"}), 400

    temp_filename = f"{slide_id}_temp.wav"
    temp_path = os.path.join("static", "generated", temp_filename)
    
    ref_audio_path = None
    if ref_voice:
        if ref_voice == "default_voxcpm":
            ref_audio_path = "default_voxcpm"
        else:
            ref_audio_path = os.path.join("voices", ref_voice)
            if not os.path.exists(ref_audio_path):
                ref_audio_path = None

    try:
        # Run synthesis (will use VoxCPM if initialized, else Edge-TTS fallback)
        synthesize_audio(
            text=text,
            output_path=temp_path,
            reference_audio_path=ref_audio_path,
            voice_preference=voice_preference
        )

        # Convert to MP3 under project_folder/<script_name>/mp3/
        mp3_dir = os.path.join(project_folder, script_name, "mp3")
        os.makedirs(mp3_dir, exist_ok=True)
        mp3_filename = f"{slide_id}.mp3"
        mp3_path = os.path.join(mp3_dir, mp3_filename)
        
        pad_dur = "0.8" if project_name == "DOMMemo" else "1.8"
        ffmpeg_path = os.path.abspath("ffmpeg.exe")
        cmd = [
            ffmpeg_path, "-y", "-i", temp_path,
            "-af", f"apad=pad_dur={pad_dur}",
            "-codec:a", "libmp3lame", "-qscale:a", "2",
            mp3_path
        ]
        
        import subprocess
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            # Fallback
            cmd_fallback = [
                ffmpeg_path, "-y", "-i", temp_path,
                "-af", f"apad=pad_dur={pad_dur}",
                mp3_path
            ]
            subprocess.run(cmd_fallback, capture_output=True)
            
        # Clean up temp WAV
        if os.path.exists(temp_path):
            os.remove(temp_path)

        # Get synthesized audio duration
        duration = 10.0
        try:
            import librosa
            duration = float(librosa.get_duration(path=mp3_path))
        except Exception as duration_err:
            print(f"[-] Error parsing audio duration: {duration_err}", file=sys.stderr)

        audio_url = f"/{project_folder}/{script_name}/mp3/{mp3_filename}"
        
        # Automatically update slide audio path and duration in slides.json
        slides = load_slides(script_name, project_name)
        for slide in slides:
            if slide["id"] == slide_id:
                slide["audioPath"] = audio_url
                slide["duration"] = duration
                break
        save_slides(slides, script_name, project_name)

        return jsonify({
            "success": True,
            "audioUrl": audio_url,
            "duration": duration
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

TTS_SYNTHESIS_STATUS = {"status": "idle", "progress": 0, "current": 0, "total": 0, "error": None}

def calculate_slide_hash(slide):
    import hashlib
    text = slide.get("script", "").strip()
    voice = slide.get("voice", "vi-VN-HoaiMyNeural")
    ref_voice = slide.get("refVoice", "")
    content = f"{text}||{voice}||{ref_voice}"
    return hashlib.md5(content.encode("utf-8")).hexdigest()

def synthesize_all_thread(script_name, slides, project_name="TurnioDEV"):
    global TTS_SYNTHESIS_STATUS
    TTS_SYNTHESIS_STATUS["status"] = "processing"
    TTS_SYNTHESIS_STATUS["progress"] = 0
    TTS_SYNTHESIS_STATUS["current"] = 0
    TTS_SYNTHESIS_STATUS["total"] = len(slides)
    TTS_SYNTHESIS_STATUS["error"] = None
    
    project_folder = get_project_folder(project_name)
    mp3_dir = os.path.join(project_folder, script_name, "mp3")
    mp4_dir = os.path.join(project_folder, script_name, "mp4")
    os.makedirs(mp3_dir, exist_ok=True)
    os.makedirs(mp4_dir, exist_ok=True)
    
    try:
        import imageio_ffmpeg
        ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        ffmpeg_path = os.path.abspath("ffmpeg.exe")
    from concurrent.futures import ThreadPoolExecutor

    def process_slide(item):
        nonlocal mp3_dir, ffmpeg_path
        global TTS_SYNTHESIS_STATUS
        idx, slide = item
        slide_id = slide["id"]
        text = slide.get("script", "").strip()
        ref_voice = slide.get("refVoice", "")
        voice_preference = slide.get("voice", "vi-VN-HoaiMyNeural")
        
        if not text:
            # Done immediately
            TTS_SYNTHESIS_STATUS["current"] += 1
            TTS_SYNTHESIS_STATUS["progress"] = int((TTS_SYNTHESIS_STATUS["current"] / TTS_SYNTHESIS_STATUS["total"]) * 100)
            return idx, None

        # Check cache: if audio file exists and script + voice settings match the hash, skip synthesis
        current_hash = calculate_slide_hash(slide)
        mp3_path = os.path.join(mp3_dir, f"{slide_id}.mp3")
        if slide.get("audioPath") and os.path.exists(mp3_path) and slide.get("scriptHash") == current_hash:
            print(f"[+] Slide {slide_id} is unchanged, skipping synthesis.", file=sys.stderr)
            TTS_SYNTHESIS_STATUS["current"] += 1
            TTS_SYNTHESIS_STATUS["progress"] = int((TTS_SYNTHESIS_STATUS["current"] / TTS_SYNTHESIS_STATUS["total"]) * 100)
            return idx, mp3_path
            
        temp_wav = os.path.join("static", "generated", f"{slide_id}_temp.wav")
        ref_audio_path = None
        if ref_voice:
            if ref_voice == "default_voxcpm":
                ref_audio_path = "default_voxcpm"
            else:
                ref_audio_path = os.path.join("voices", ref_voice)
                if not os.path.exists(ref_audio_path):
                    ref_audio_path = None
                
        try:
            synthesize_audio(
                text=text,
                output_path=temp_wav,
                reference_audio_path=ref_audio_path,
                voice_preference=voice_preference
            )
            
            pad_dur = "0.8" if project_name == "DOMMemo" else "1.8"
            cmd = [
                ffmpeg_path, "-y", "-i", temp_wav,
                "-af", f"apad=pad_dur={pad_dur}",
                "-codec:a", "libmp3lame", "-qscale:a", "2",
                mp3_path
            ]
            
            import subprocess
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode != 0:
                cmd_fallback = [ffmpeg_path, "-y", "-i", temp_wav, mp3_path]
                subprocess.run(cmd_fallback, capture_output=True)
                
            if os.path.exists(temp_wav):
                os.remove(temp_wav)
                
            duration = 10.0
            try:
                import librosa
                duration = float(librosa.get_duration(path=mp3_path))
            except Exception as duration_err:
                print(f"[-] Error parsing audio duration: {duration_err}", file=sys.stderr)
                
            audio_url = f"/{project_folder}/{script_name}/mp3/{slide_id}.mp3"
            slide["audioPath"] = audio_url
            slide["duration"] = duration
            slide["scriptHash"] = current_hash
            
            # Progress update
            TTS_SYNTHESIS_STATUS["current"] += 1
            TTS_SYNTHESIS_STATUS["progress"] = int((TTS_SYNTHESIS_STATUS["current"] / TTS_SYNTHESIS_STATUS["total"]) * 100)
            
            return idx, mp3_path
        except Exception as e:
            print(f"[-] Error synthesizing slide {slide_id}: {e}", file=sys.stderr)
            # Progress update even on failure to avoid blocking, but save error
            TTS_SYNTHESIS_STATUS["current"] += 1
            TTS_SYNTHESIS_STATUS["progress"] = int((TTS_SYNTHESIS_STATUS["current"] / TTS_SYNTHESIS_STATUS["total"]) * 100)
            raise e

    # Execute synthesis sequentially to prevent CPU thrashing
    tasks = list(enumerate(slides))
    with ThreadPoolExecutor(max_workers=1) as executor:
        try:
            results = list(executor.map(process_slide, tasks))
        except Exception as e:
            TTS_SYNTHESIS_STATUS["status"] = "failed"
            TTS_SYNTHESIS_STATUS["error"] = f"Error during synthesis: {str(e)}"
            return

    # Sort results by original slide index to preserve chronological order
    results.sort(key=lambda x: x[0])
    generated_files = [res[1] for res in results if res is not None and res[1] is not None]

    if generated_files:
        try:
            import subprocess
            concat_list_path = os.path.join(mp3_dir, "concat_list.txt")
            with open(concat_list_path, "w", encoding="utf-8") as f:
                for gf in generated_files:
                    f.write(f"file '{os.path.basename(gf)}'\n")
            
            # Run concat command in the target directory so paths are simple
            cmd_concat = [
                ffmpeg_path, "-y", "-f", "concat", "-safe", "0",
                "-i", "concat_list.txt", "-c", "copy", "full_voice.mp3"
            ]
            subprocess.run(cmd_concat, cwd=mp3_dir, capture_output=True)
            
            if os.path.exists(concat_list_path):
                os.remove(concat_list_path)
        except Exception as concat_err:
            print(f"[-] Error concatenating audios: {concat_err}", file=sys.stderr)
            
    save_slides(slides, script_name, project_name)
    TTS_SYNTHESIS_STATUS["status"] = "completed"
    TTS_SYNTHESIS_STATUS["progress"] = 100

@app.route("/api/synthesize-all", methods=["POST"])
def synthesize_all():
    global TTS_SYNTHESIS_STATUS
    if TTS_SYNTHESIS_STATUS["status"] == "processing":
        return jsonify({"error": "Tiến trình tạo giọng nói đang chạy. Vui lòng chờ..."}), 400
        
    data = request.json or {}
    script_name = sanitize_script_name(data.get("script", "video1"))
    project_name = data.get("project", "TurnioDEV")
    voice = data.get("voice")
    ref_voice = data.get("refVoice")
    
    slides = load_slides(script_name, project_name)
    
    # Propagate active slide voice to all slides to ensure one consistent voice
    if voice is not None or ref_voice is not None:
        for slide in slides:
            if voice is not None:
                slide["voice"] = voice
            if ref_voice is not None:
                slide["refVoice"] = ref_voice
        save_slides(slides, script_name, project_name)
    
    # Run in background thread
    threading.Thread(
        target=synthesize_all_thread,
        args=(script_name, slides, project_name),
        daemon=True
    ).start()
    
    return jsonify({"success": True, "status": "processing"})

@app.route("/api/synthesize-all/status", methods=["GET"])
def synthesize_all_status():
    global TTS_SYNTHESIS_STATUS
    script_name = sanitize_script_name(request.args.get("script", "video1"))
    project_name = request.args.get("project", "TurnioDEV")
    
    # If completed, reload slides to get the updated audioUrls and durations
    slides = []
    if TTS_SYNTHESIS_STATUS["status"] == "completed":
        slides = load_slides(script_name, project_name)
        # Reset state back to idle so we can synthesize again in the future
        TTS_SYNTHESIS_STATUS = {"status": "idle", "progress": 0, "current": 0, "total": 0, "error": None}
        return jsonify({
            "status": "completed",
            "progress": 100,
            "current": len(slides),
            "total": len(slides),
            "error": None,
            "slides": slides
        })
        
    return jsonify({
        "status": TTS_SYNTHESIS_STATUS["status"],
        "progress": TTS_SYNTHESIS_STATUS["progress"],
        "current": TTS_SYNTHESIS_STATUS["current"],
        "total": TTS_SYNTHESIS_STATUS["total"],
        "error": TTS_SYNTHESIS_STATUS["error"],
        "slides": []
    })

@app.route("/api/save-video", methods=["POST"])
def save_video():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    script_name = sanitize_script_name(request.args.get("script", "video1"))
    project_name = request.args.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)
    mp4_dir = os.path.join(project_folder, script_name, "mp4")
    os.makedirs(mp4_dir, exist_ok=True)
    
    temp_ext = ".webm" if "webm" in file.filename.lower() else ".mp4"
    temp_path = os.path.join(mp4_dir, f"temp_upload{temp_ext}")
    file.save(temp_path)
    
    output_path = os.path.join(mp4_dir, "video.mp4")
    
    try:
        ffmpeg_path = os.path.abspath("ffmpeg.exe")
        cmd = [
            ffmpeg_path, "-y", "-i", temp_path,
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:v", "2M", "-b:a", "192k",
            output_path
        ]
        import subprocess
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"[-] ffmpeg conversion failed: {result.stderr}", file=sys.stderr)
            if os.path.exists(output_path):
                os.remove(output_path)
            os.rename(temp_path, output_path)
        else:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        return jsonify({"success": True, "filepath": f"/{project_folder}/{script_name}/mp4/video.mp4"})
    except Exception as e:
        print(f"[-] Error saving/converting video: {e}", file=sys.stderr)
        try:
            if os.path.exists(temp_path):
                if os.path.exists(output_path):
                    os.remove(output_path)
                os.rename(temp_path, output_path)
        except Exception:
            pass
        return jsonify({"success": True, "filepath": f"/{project_folder}/{script_name}/mp4/video.mp4", "warning": str(e)})

@app.route("/api/export-video", methods=["POST"])
def export_video_backend():
    data = request.json or {}
    script_name = sanitize_script_name(data.get("script", "video1"))
    project_name = data.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)
    
    # We can check if an export is already running
    status_path = os.path.join(project_folder, script_name, "export_status.json")
    if os.path.exists(status_path):
        try:
            with open(status_path, "r", encoding="utf-8") as f:
                status_data = json.load(f)
            if status_data.get("status") == "processing":
                return jsonify({"error": "Tiến trình xuất video đang chạy. Vui lòng chờ..."}), 400
        except Exception:
            pass
            
    # Start the export in a background thread
    def run_export():
        os.makedirs(os.path.dirname(status_path), exist_ok=True)
        with open(status_path, "w", encoding="utf-8") as f:
            json.dump({
                "status": "processing",
                "progress": 0,
                "error": None,
                "filepath": None,
                "message": "Đang khởi động..."
            }, f, ensure_ascii=False, indent=2)
            
        try:
            import subprocess
            python_exe = sys.executable
            cmd = [python_exe, "export_video_headless.py", script_name, project_name]
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"[-] Headless export failed: {result.stderr}", file=sys.stderr)
                with open(status_path, "w", encoding="utf-8") as f:
                    json.dump({
                        "status": "failed",
                        "progress": 0,
                        "error": result.stderr or "Lỗi xảy ra trong script xuất video.",
                        "filepath": None
                    }, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[-] Headless export exception: {e}", file=sys.stderr)
            with open(status_path, "w", encoding="utf-8") as f:
                json.dump({
                    "status": "failed",
                    "progress": 0,
                    "error": str(e),
                    "filepath": None
                }, f, ensure_ascii=False, indent=2)
                
    threading.Thread(target=run_export, daemon=True).start()
    return jsonify({"success": True, "message": "Tiến trình xuất video chất lượng cao đã bắt đầu ở chế độ nền."})

@app.route("/api/export-status", methods=["GET"])
def export_status_backend():
    script_name = sanitize_script_name(request.args.get("script", "video1"))
    project_name = request.args.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)
    status_path = os.path.join(project_folder, script_name, "export_status.json")
    if not os.path.exists(status_path):
        return jsonify({
            "status": "idle",
            "progress": 0,
            "error": None,
            "filepath": None
        })
    try:
        with open(status_path, "r", encoding="utf-8") as f:
            return jsonify(json.load(f))
    except Exception as e:
        return jsonify({
            "status": "failed",
            "progress": 0,
            "error": f"Lỗi đọc trạng thái: {str(e)}",
            "filepath": None
        }), 500

# Download VoxCPM model weights background orchestrator
def download_weights_thread():
    global VOXCPM_DOWNLOAD_STATUS
    VOXCPM_DOWNLOAD_STATUS["status"] = "downloading"
    VOXCPM_DOWNLOAD_STATUS["progress"] = 10
    VOXCPM_DOWNLOAD_STATUS["error"] = None
    try:
        from huggingface_hub import snapshot_download
        print("[+] Downloading VoxCPM model weights via huggingface_hub...")
        snapshot_download(
            repo_id="openbmb/VoxCPM",
            local_dir="./checkpoints/VoxCPM"
        )
        VOXCPM_DOWNLOAD_STATUS["status"] = "completed"
        VOXCPM_DOWNLOAD_STATUS["progress"] = 100
        print("[+] VoxCPM model weights downloaded successfully! Initializing model...")
        # Re-initialize the model now that the weights are available
        init_voxcpm()
    except Exception as e:
        VOXCPM_DOWNLOAD_STATUS["status"] = "failed"
        VOXCPM_DOWNLOAD_STATUS["error"] = str(e)
        print(f"[-] VoxCPM model download failed: {e}", file=sys.stderr)

@app.route("/api/voxcpm/download", methods=["POST"])
def download_voxcpm_weights():
    global VOXCPM_DOWNLOAD_STATUS
    if VOXCPM_DOWNLOAD_STATUS["status"] == "downloading":
        return jsonify(VOXCPM_DOWNLOAD_STATUS)
    
    threading.Thread(target=download_weights_thread, daemon=True).start()
    return jsonify({"success": True, "status": "downloading", "message": "Download started in background."})

@app.route("/api/voxcpm/status", methods=["GET"])
def get_voxcpm_status():
    # Return status of model download and initialization
    global VOXCPM_DOWNLOAD_STATUS
    
    checkpoint_exists = os.path.exists("./checkpoints/VoxCPM/config.json")
    model_loaded = tts_handler.voxcpm_model is not None
    
    return jsonify({
        "voxcpm_installed": tts_handler.VOXCPM_AVAILABLE,
        "checkpoint_downloaded": checkpoint_exists,
        "model_loaded": model_loaded,
        "download_status": VOXCPM_DOWNLOAD_STATUS
    })

@app.route("/api/open-folder", methods=["POST"])
def open_folder():
    data = request.json or {}
    script_name = sanitize_script_name(data.get("script", "video1"))
    project_name = data.get("project", "TurnioDEV")
    project_folder = get_project_folder(project_name)
    folder_type = data.get("type", "mp3")
    
    if folder_type == "mp3":
        path = os.path.abspath(os.path.join(project_folder, script_name, "mp3"))
    elif folder_type == "video":
        video_file = os.path.abspath(os.path.join(project_folder, script_name, "mp4", "video.mp4"))
        if os.path.exists(video_file):
            path = video_file
        else:
            path = os.path.abspath(os.path.join(project_folder, script_name, "mp4"))
    else:
        return jsonify({"error": "Invalid folder type"}), 400
        
    if not os.path.exists(path):
        # Fallback to script folder
        path = os.path.abspath(os.path.join(project_folder, script_name))
        
    try:
        if sys.platform == "win32":
            os.startfile(path)
        elif sys.platform == "darwin":
            import subprocess
            subprocess.run(["open", path])
        else:
            import subprocess
            subprocess.run(["xdg-open", path])
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

import re

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

@app.route("/api/log", methods=["POST"])
def client_log():
    data = request.get_data(as_text=True)
    # Print safely to console
    print(f"[BROWSER CLIENT LOG] {data.encode('ascii', errors='replace').decode('ascii')[:150]}...")
    sys.stdout.flush()
    try:
        log_file = r"C:\Users\AD\.gemini\antigravity-ide\brain\704ec6d5-1bea-4711-ad88-91003df7fe40\scratch\client_logs.txt"
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(data + "\n")
    except Exception as e:
        print("Failed to write client log file:", e)
    return jsonify({"success": True})

if __name__ == "__main__":
    print("[*] Starting TikTok Widescreen Studio server on port 5501...")
    app.run(host="0.0.0.0", port=5501, debug=True, use_reloader=False)
