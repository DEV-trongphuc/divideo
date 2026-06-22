const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Get video script from arguments, default to 'video19'
const SCRIPT = process.argv[2] || 'video19';
const API_BASE = 'http://127.0.0.1:5500';

let flaskProcess = null;

// Graceful exit handler
function cleanExit(code = 0) {
    if (flaskProcess) {
        console.log('\n[+] Đang tắt Flask server...');
        flaskProcess.kill('SIGINT');
    }
    process.exit(code);
}

process.on('SIGINT', () => {
    console.log('\n[-] Bị ngắt bởi người dùng (Ctrl+C).');
    cleanExit(1);
});

// Helper for HTTP requests
function post(url, data) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const options = {
            hostname: u.hostname,
            port: u.port || 80,
            path: u.pathname + u.search,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });
        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
}

function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
            });
        }).on('error', reject);
    });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Detect python command on the machine
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

async function main() {
    console.log("==========================================================================");
    console.log("=== HỆ THỐNG TỰ ĐỘNG KHỞI CHẠY & TẠO GIỌNG NÓI VOXCPM (ALL-IN-ONE) ===");
    console.log("==========================================================================");
    
    const pythonCmd = await getPythonCommand();
    
    // 1. Automatically run pip install requirements.txt first using python -m pip
    console.log("\n[1/3] Đang tự động kiểm tra và cài đặt các thư viện Python cần thiết...");
    try {
        let pipArgs = ['-m', 'pip', 'install', '-r', 'requirements.txt'];
        console.log(`[+] Đang chạy: ${pythonCmd} ${pipArgs.join(' ')} ...`);
        execSync(`"${pythonCmd}" ${pipArgs.join(' ')}`, { stdio: 'inherit' });
        console.log("[+] Đã hoàn thành bước kiểm tra/cài đặt thư viện!");
    } catch (e) {
        console.log(`[!] Cảnh báo khi chạy pip install: ${e.message}`);
        console.log("[!] Sẽ tiếp tục chạy app vì có thể các thư viện đã được cài đặt sẵn trước đó.");
    }
    
    // 2. Automatically check if VoxCPM model files exist
    const configPath = path.join('checkpoints', 'VoxCPM', 'config.json');
    if (!fs.existsSync(configPath)) {
        console.log("\n[!] CẢNH BÁO: Không tìm thấy file checkpoint của mô hình VoxCPM (4.5GB) tại ./checkpoints/VoxCPM/");
        console.log("[+] Đang tự động tải mô hình từ HuggingFace thông qua download_model.py...");
        try {
            execSync(`"${pythonCmd}" download_model.py`, { stdio: 'inherit' });
            console.log("[+] Đã tải mô hình thành công!");
        } catch (e) {
            console.error(`\n[FATAL ERROR] Không thể tải mô hình tự động: ${e.message}`);
            cleanExit(1);
        }
    } else {
        console.log("\n[+] Đã phát hiện thấy mô hình VoxCPM trong thư mục checkpoints.");
    }
    
    // 3. Start Flask app.py
    console.log(`\n[2/3] Đang khởi động Flask app.py bằng lệnh: ${pythonCmd}...`);
    flaskProcess = spawn(pythonCmd, ['app.py']);
    
    let serverStarted = false;
    
    flaskProcess.stderr.on('data', (data) => {
        const line = data.toString();
        process.stdout.write(`[Flask] ${line}`);
    });
    
    flaskProcess.stdout.on('data', (data) => {
        const line = data.toString();
        process.stdout.write(`[Flask] ${line}`);
    });
    
    flaskProcess.on('exit', (code) => {
        if (code !== 0 && !serverStarted) {
            console.error(`\n[FATAL ERROR] Flask server bị sập khi đang khởi động (exit code: ${code}).`);
            cleanExit(1);
        }
    });

    // Wait for port 5500 to become active
    console.log("[+] Đang chờ Flask server khởi động trên cổng 5500...");
    let retries = 30;
    while (retries > 0) {
        await sleep(1000);
        try {
            const status = await get(`${API_BASE}/api/voxcpm/status`);
            if (status) {
                serverStarted = true;
                console.log("[+] Flask server đã sẵn sàng!");
                break;
            }
        } catch (e) {
            retries--;
        }
    }
    
    if (!serverStarted) {
        console.error("\n[FATAL ERROR] Quá thời gian chờ Flask server khởi chạy.");
        cleanExit(1);
    }
    
    const startTime = Date.now();
    
    // 4. Trigger speech generation
    try {
        console.log(`\n[3/3] Đang kích hoạt tạo giọng nói cho kịch bản: ${SCRIPT}...`);
        
        await post(`${API_BASE}/api/synthesize-all`, {
            script: SCRIPT,
            voice: "google-vi-VN-Neural2-D",
            refVoice: "default_voxcpm"
        });
        
        console.log(`[+] API đã nhận yêu cầu. Bắt đầu đo thời gian thực tế...`);
        
        let lastProgress = -1;
        let lastCurrent = 0;
        let lastSlideTime = Date.now();
        
        while (true) {
            await sleep(1000);
            const status = await get(`${API_BASE}/api/synthesize-all/status?script=${SCRIPT}`);
            
            if (status.status === 'processing') {
                if (status.current > lastCurrent) {
                    const elapsedForSlide = ((Date.now() - lastSlideTime) / 1000).toFixed(2);
                    console.log(`\n[+] Slide ${status.current}/${status.total} hoàn thành trong ${elapsedForSlide} giây.`);
                    lastCurrent = status.current;
                    lastSlideTime = Date.now();
                }
                
                if (status.progress !== lastProgress) {
                    const barLength = 30;
                    const filledLength = Math.round(barLength * (status.progress / 100));
                    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
                    process.stdout.write(`\r[TIẾN ĐỘ] Progress: [${bar}] ${status.progress}% (${status.current}/${status.total} slides)`);
                    lastProgress = status.progress;
                }
            } else if (status.status === 'completed') {
                console.log(`\n\n[SUCCESS] Đã tạo xong toàn bộ giọng nói cho kịch bản ${SCRIPT}!`);
                break;
            } else if (status.status === 'failed') {
                console.log(`\n\n[ERROR] Tiến trình thất bại: ${status.error}`);
                break;
            }
        }
    } catch (error) {
        console.error(`\n[FATAL ERROR] Lỗi trong quá trình tạo: ${error.message}`);
    }
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`==========================================================================`);
    console.log(`[KẾT QUẢ] TỔNG THỜI GIAN ĐO ĐƯỢC: ${totalTime} giây.`);
    console.log(`==========================================================================`);
    
    cleanExit(0);
}

main();
