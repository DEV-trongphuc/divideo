const http = require('http');

const API_BASE = 'http://127.0.0.1:5501';

// Read arguments: node generate_voices.js <script_name> [project_name]
const scriptArg = process.argv[2];
if (!scriptArg) {
    console.error("[-] Lỗi: Vui lòng truyền tên kịch bản (ví dụ: node generate_voices.js video28)");
    process.exit(1);
}
const SCRIPTS = [scriptArg];
const PROJECT = process.argv[3] || 'TurnioDEV';

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
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        }).on('error', reject);
    });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log("==========================================================================");
    console.log(`=== BẮT ĐẦU TIẾN TRÌNH TẠO GIỌNG NÓI VOXCPM TRẦM ẤM CHO KỊCH BẢN ${SCRIPTS[0].toUpperCase()} ===`);
    console.log(`=== DỰ ÁN: ${PROJECT} | API SERVER: ${API_BASE} ===`);
    console.log("==========================================================================");
    
    for (const script of SCRIPTS) {
        console.log(`\n--------------------------------------------------------------------------`);
        console.log(`[+] Đang bắt đầu xử lý kịch bản: ${script} (Project: ${PROJECT})`);
        
        try {
            // Trigger synthesis for current video
            await post(`${API_BASE}/api/synthesize-all`, {
                script: script,
                voice: "google-vi-VN-Neural2-D",
                refVoice: "default_voxcpm",
                project: PROJECT
            });
            
            console.log(`[+] Đã kích hoạt API thành công. Theo dõi trạng thái tiến độ...`);
            
            // Poll status until done
            let lastProgress = -1;
            while (true) {
                await sleep(1500);
                const status = await get(`${API_BASE}/api/synthesize-all/status?script=${script}&project=${PROJECT}`);
                
                if (status.status === 'processing') {
                    if (status.progress !== lastProgress) {
                        const barLength = 30;
                        const filledLength = Math.round(barLength * (status.progress / 100));
                        const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
                        process.stdout.write(`\rProgress: [${bar}] ${status.progress}% (${status.current}/${status.total} slides)`);
                        lastProgress = status.progress;
                    }
                } else if (status.status === 'completed') {
                    // Final 100% update
                    const bar = '█'.repeat(30);
                    process.stdout.write(`\rProgress: [${bar}] 100% completed!\n`);
                    console.log(`[SUCCESS] Đã tạo xong toàn bộ giọng nói cho ${script} thuộc dự án ${PROJECT}!`);
                    break;
                } else if (status.status === 'failed') {
                    console.log(`\n[ERROR] Tiến trình tạo giọng nói cho ${script} thất bại: ${status.error}`);
                    break;
                } else if (status.status === 'idle') {
                    console.log(`\n[WARNING] Trạng thái nhàn rỗi (idle) nhưng chưa kết thúc.`);
                    break;
                }
            }
        } catch (error) {
            console.error(`\n[FATAL ERROR] Lỗi khi kích hoạt/xử lý ${script}: ${error.message}`);
            console.log("[HELP] Vui lòng kiểm tra xem Flask server có đang chạy tại http://127.0.0.1:5500 không.");
        }
    }
    
    console.log(`\n==========================================================================`);
    console.log("=== HOÀN THÀNH TẠO GIỌNG NÓI CHO CẢ 3 VIDEO! ===");
    console.log("==========================================================================");
}

run();
