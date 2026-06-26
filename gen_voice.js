const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

// Configuration
const PORT = 5501;
const API_BASE = `http://127.0.0.1:${PORT}`;
const KICHBAN_DIR = path.join(__dirname, 'kichban');
const FFMPEG_PATH = path.join(__dirname, 'ffmpeg.exe');

let flaskProcess = null;
let spawnedFlask = false;

// Helper: Check if port is in use
function isPortInUse(port) {
    return new Promise((resolve) => {
        const client = new net.Socket();
        client.once('connect', () => {
            client.destroy();
            resolve(true); // Port is in use
        });
        client.once('error', () => {
            resolve(false); // Port is free
        });
        client.connect(port, '127.0.0.1');
    });
}

// Helper: HTTP GET request
function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        }).on('error', reject);
    });
}

// Helper: HTTP POST request
function post(url, data) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const options = {
            hostname: u.hostname,
            port: u.port || 80,
            path: u.pathname + u.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        resolve(body);
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        // Thiết lập timeout 10 phút để tránh lỗi socket bị ngắt (ECONNRESET) khi CPU xử lý lâu
        req.setTimeout(600000);
        req.on('timeout', () => {
            req.destroy(new Error('Yêu cầu tạo giọng nói bị quá thời gian chờ (10 phút)'));
        });

        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Exit Handler
function cleanExit(code = 0) {
    if (spawnedFlask && flaskProcess) {
        console.log('\n[+] Đang tắt Flask server chạy ngầm...');
        try {
            flaskProcess.kill('SIGINT');
        } catch (e) {
            // ignore
        }
    }
    process.exit(code);
}

process.on('SIGINT', () => {
    console.log('\n[-] Bị ngắt bởi người dùng (Ctrl+C).');
    cleanExit(1);
});

// Detect Python Command
function getPythonCommand() {
    return new Promise((resolve) => {
        const checkCmds = ['python', 'py', 'python3'];
        let index = 0;
        
        function tryNext() {
            if (index >= checkCmds.length) {
                resolve('python'); // Fallback
                return;
            }
            const cmd = checkCmds[index];
            const proc = spawn(cmd, ['--version']);
            proc.on('error', () => {
                index++;
                tryNext();
            });
            proc.on('exit', (code) => {
                if (code === 0) {
                    resolve(cmd);
                } else {
                    index++;
                    tryNext();
                }
            });
        }
        tryNext();
    });
}

// Start Flask Server if not running
async function ensureServerRunning() {
    const active = await isPortInUse(PORT);
    if (active) {
        console.log(`[+] Đã phát hiện Flask server đang chạy sẵn trên cổng ${PORT}.`);
        return true;
    }

    console.log(`[-] Flask server chưa chạy. Đang tự động khởi chạy trên cổng ${PORT}...`);
    const pythonCmd = await getPythonCommand();
    const appPath = path.join(__dirname, 'app.py');

    flaskProcess = spawn(pythonCmd, [appPath], { cwd: __dirname });
    spawnedFlask = true;

    // Handle process events
    flaskProcess.on('exit', (code) => {
        if (code !== 0 && spawnedFlask) {
            console.error(`\n[FATAL ERROR] Flask server bị dừng bất ngờ (exit code: ${code}).`);
            cleanExit(1);
        }
    });

    // Wait for the server to initialize
    console.log("[+] Đang chờ mô hình VoxCPM khởi động hoàn tất (thường mất khoảng 10-15s)...");
    let retries = 30;
    while (retries > 0) {
        await sleep(1000);
        try {
            const status = await get(`${API_BASE}/api/voices`);
            if (status && status.voxcpm_available !== undefined) {
                console.log(`[+] Flask server đã sẵn sàng! VoxCPM Khả dụng: ${status.voxcpm_available}`);
                return true;
            }
        } catch (e) {
            // not ready yet
        }
        retries--;
    }

    console.error("\n[FATAL ERROR] Quá thời gian chờ Flask server khởi chạy.");
    cleanExit(1);
}

// Concatenate individual slide audios into full_voice.mp3
function concatAudioFiles(videoName, slides) {
    const mp3Dir = path.join(KICHBAN_DIR, videoName, 'mp3');
    if (!fs.existsSync(mp3Dir)) return;

    const generatedFiles = slides
        .map(s => path.join(mp3Dir, `${s.id}.mp3`))
        .filter(p => fs.existsSync(p));

    if (generatedFiles.length === 0) return;

    console.log(`[+] Đang tiến hành ghép các file thành full_voice.mp3 cho kịch bản ${videoName}...`);
    try {
        const concatListPath = path.join(mp3Dir, 'concat_list.txt');
        const fileContent = generatedFiles.map(f => `file '${path.basename(f)}'`).join('\n');
        fs.writeFileSync(concatListPath, fileContent, 'utf8');

        // Run ffmpeg
        const cmd = `"${FFMPEG_PATH}" -y -f concat -safe 0 -i concat_list.txt -c copy full_voice.mp3`;
        execSync(cmd, { cwd: mp3Dir, stdio: 'ignore' });

        if (fs.existsSync(concatListPath)) {
            fs.unlinkSync(concatListPath);
        }
        console.log(`[SUCCESS] Đã tạo thành công: ${path.join(mp3Dir, 'full_voice.mp3')}`);
    } catch (e) {
        console.error(`[-] Lỗi khi ghép file âm thanh: ${e.message}`);
    }
}

// Synthesize a single slide
async function synthesizeSlide(videoName, slide, slideIndex, totalSlides) {
    const slideId = slide.id;
    const text = (slide.voiceText || slide.script || "").trim();
    if (!text) {
        console.log(`[-] Slide ${slideIndex}/${totalSlides} (${slideId}): Bỏ qua vì script trống.`);
        return true;
    }

    console.log(`[+] Slide ${slideIndex}/${totalSlides} (${slideId}): Đang tạo voice...`);
    const start = Date.now();
    try {
        const response = await post(`${API_BASE}/api/synthesize`, {
            slideId: slideId,
            text: text,
            refVoice: slide.refVoice || "default_voxcpm",
            voice: slide.voice || "google-vi-VN-Neural2-D",
            script: videoName
        });

        const elapsed = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`[OK] Slide ${slideIndex}/${totalSlides} (${slideId}): Hoàn thành trong ${elapsed}s. Độ dài file: ${response.duration}s.`);
        return true;
    } catch (error) {
        console.error(`[ERROR] Slide ${slideIndex}/${totalSlides} (${slideId}) thất bại: ${error.message}`);
        return false;
    }
}

// Main execution flow
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log("==========================================================================");
        console.log("=== CÔNG CỤ TỰ ĐỘNG TẠO GIỌNG NÓI HÀNG LOẠT (VOXCPM CPU CLI) ===");
        console.log("==========================================================================");
        console.log("Hướng dẫn sử dụng:");
        console.log("  1. Tạo toàn bộ slide của một kịch bản:");
        console.log("     node gen_voice.js video38");
        console.log("\n  2. Chỉ tạo 1 slide cụ thể của một kịch bản (1-based index):");
        console.log("     node gen_voice.js video38 1");
        console.log("\n  3. Quét toàn bộ các kịch bản và chỉ tạo các slide CHƯA CÓ VOICE:");
        console.log("     node gen_voice.js all");
        console.log("==========================================================================");
        cleanExit(0);
    }

    const command = args[0].toLowerCase();
    
    // Ensure Flask Server is up
    await ensureServerRunning();

    const startTime = Date.now();

    if (command === 'all') {
        console.log("\n[+] Bắt đầu quét tất cả kịch bản để tìm các slide chưa có voice...");
        if (!fs.existsSync(KICHBAN_DIR)) {
            console.error(`[-] Thư mục kịch bản không tồn tại: ${KICHBAN_DIR}`);
            cleanExit(1);
        }

        const videoDirs = fs.readdirSync(KICHBAN_DIR)
            .filter(file => {
                const fullPath = path.join(KICHBAN_DIR, file);
                const hasSlides = fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'slides.json'));
                if (!hasSlides) return false;
                
                const match = file.match(/^video(\d+)$/);
                if (!match) return false;
                const num = parseInt(match[1]);
                return num >= 20 && num <= 42;
            })
            .sort((a, b) => {
                const numA = parseInt(a.replace(/\D/g, '')) || 0;
                const numB = parseInt(b.replace(/\D/g, '')) || 0;
                return numA - numB;
            });

        console.log(`[+] Tìm thấy ${videoDirs.length} kịch bản có slides.json.`);

        for (const videoName of videoDirs) {
            const slidesPath = path.join(KICHBAN_DIR, videoName, 'slides.json');
            let slides = [];
            try {
                slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'));
            } catch (e) {
                console.error(`[-] Lỗi đọc file slides.json tại ${videoName}: ${e.message}`);
                continue;
            }

            // Filter missing slides
            const missingSlides = [];
            slides.forEach((slide, idx) => {
                const audioRelativePath = slide.audioPath ? slide.audioPath.replace(/^\//, '') : '';
                const audioFullPath = audioRelativePath ? path.join(__dirname, audioRelativePath) : '';
                const fileExists = audioFullPath && fs.existsSync(audioFullPath);

                if (!fileExists) {
                    missingSlides.push({ slide, index: idx + 1 });
                }
            });

            if (missingSlides.length === 0) {
                console.log(`[+] Kịch bản ${videoName}: Tất cả các slide đều đã có voice. Bỏ qua.`);
                continue;
            }

            console.log(`\n--------------------------------------------------------------------------`);
            console.log(`[+] Kịch bản ${videoName}: Phát hiện ${missingSlides.length}/${slides.length} slide thiếu voice. Đang tiến hành tạo...`);
            
            let successCount = 0;
            for (const item of missingSlides) {
                const ok = await synthesizeSlide(videoName, item.slide, item.index, slides.length);
                if (ok) successCount++;
            }

            console.log(`[+] Kịch bản ${videoName}: Đã tạo xong ${successCount}/${missingSlides.length} slide thiếu.`);
            
            // Re-concatenate to update full_voice.mp3
            concatAudioFiles(videoName, slides);
        }

    } else {
        // Handle specific videoName
        const videoName = args[0];
        const slidesPath = path.join(KICHBAN_DIR, videoName, 'slides.json');
        
        if (!fs.existsSync(slidesPath)) {
            console.error(`[ERROR] Không tìm thấy file slides.json cho kịch bản: ${videoName}`);
            console.error(`Đường dẫn tìm kiếm: ${slidesPath}`);
            cleanExit(1);
        }

        let slides = [];
        try {
            slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'));
        } catch (e) {
            console.error(`[ERROR] Không thể đọc file slides.json: ${e.message}`);
            cleanExit(1);
        }

        const slideArg = args[1];

        if (slideArg) {
            // Case: generate single slide (1-based index)
            const slideNum = parseInt(slideArg);
            if (isNaN(slideNum) || slideNum < 1 || slideNum > slides.length) {
                console.error(`[ERROR] Vui lòng nhập số thứ tự slide hợp lệ từ 1 đến ${slides.length}.`);
                cleanExit(1);
            }

            const targetIdx = slideNum - 1;
            const targetSlide = slides[targetIdx];
            
            console.log(`\n[+] Đang tạo voice duy nhất cho Slide ${slideNum} của kịch bản ${videoName}...`);
            await synthesizeSlide(videoName, targetSlide, slideNum, slides.length);
            
            // Re-concatenate to keep full_voice.mp3 updated
            concatAudioFiles(videoName, slides);

        } else {
            // Case: generate all slides for specific video
            console.log(`\n==========================================================================`);
            console.log(`[+] Bắt đầu tạo voice cho toàn bộ kịch bản: ${videoName} (${slides.length} slides)`);
            console.log(`==========================================================================`);

            let successCount = 0;
            for (let i = 0; i < slides.length; i++) {
                const ok = await synthesizeSlide(videoName, slides[i], i + 1, slides.length);
                if (ok) successCount++;
            }

            console.log(`\n[+] Đã hoàn thành tạo voice: ${successCount}/${slides.length} slide thành công.`);
            
            // Concatenate
            concatAudioFiles(videoName, slides);
        }
    }

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n==========================================================================`);
    console.log(`[KẾT QUẢ] TỔNG THỜI GIAN THỰC THI: ${totalTime} giây.`);
    console.log(`==========================================================================`);
    
    cleanExit(0);
}

main();
