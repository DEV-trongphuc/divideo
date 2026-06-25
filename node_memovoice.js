const http = require('http');

const API_BASE = 'http://127.0.0.1:5501';

// Read arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: node node_memovoice.js <video_range_or_id> [voice_name]");
    console.log("Example: node node_memovoice.js 1-3");
    console.log("Example: node node_memovoice.js 4-20");
    console.log("Example: node node_memovoice.js 21");
    console.log("Example (deep voice): node node_memovoice.js 1-3 vi-VN-NamMinhNeural-Deep");
    process.exit(1);
}

// Parse range
const rangeStr = args[0].replace(/\s+/g, '');
let startId, endId;

if (rangeStr.includes('-')) {
    const parts = rangeStr.split('-');
    startId = parseInt(parts[0], 10);
    endId = parseInt(parts[1], 10);
} else {
    startId = parseInt(rangeStr, 10);
    endId = startId;
}

if (isNaN(startId) || isNaN(endId)) {
    console.error("[-] Lỗi: Khoảng video không hợp lệ. Vui lòng nhập định dạng số (ví dụ: 1-3 hoặc 21).");
    process.exit(1);
}

// Default voice is our new Southern warm male voice, but can be overridden by 2nd arg
const selectedVoice = args[1] || "vi-VN-NamMinhNeural-Warm";

// Helper functions for HTTP requests
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
    console.log(`=== BẮT ĐẦU TẠO GIỌNG NÓI EDGE-TTS CHO CÁC VIDEO TỪ ${startId} ĐẾN ${endId} ===`);
    console.log(`=== Giọng được chọn: ${selectedVoice}`);
    console.log("==========================================================================");

    for (let i = startId; i <= endId; i++) {
        const script = `video${i}`;
        console.log(`\n--------------------------------------------------------------------------`);
        console.log(`[+] Đang xử lý kịch bản: ${script}`);

        try {
            // Trigger synthesis for current video
            await post(`${API_BASE}/api/synthesize-all`, {
                script: script,
                project: "DOMMemo",
                voice: selectedVoice,
                refVoice: null
            });

            console.log(`[+] Đã kích hoạt API thành công. Đang theo dõi tiến độ...`);

            // Poll status until done
            let lastProgress = -1;
            while (true) {
                await sleep(1000);
                const status = await get(`${API_BASE}/api/synthesize-all/status?script=${script}&project=DOMMemo`);

                if (status.status === 'processing') {
                    if (status.progress !== lastProgress) {
                        const barLength = 30;
                        const filledLength = Math.round(barLength * (status.progress / 100));
                        const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
                        process.stdout.write(`\rTiến độ: [${bar}] ${status.progress}% (${status.current}/${status.total} slides)`);
                        lastProgress = status.progress;
                    }
                } else if (status.status === 'completed') {
                    // Final 100% update
                    const bar = '█'.repeat(30);
                    process.stdout.write(`\rTiến độ: [${bar}] 100% completed!\n`);
                    console.log(`[SUCCESS] Đã tạo xong giọng nói cho ${script}!`);
                    break;
                } else if (status.status === 'failed') {
                    console.log(`\n[ERROR] Tiến trình tạo giọng nói cho ${script} thất bại: ${status.error}`);
                    break;
                } else if (status.status === 'idle') {
                    // Sometimes status might momentarily default to idle before beginning or after completing
                    // We check if progress is 100 or 0
                    if (lastProgress >= 90) {
                         const bar = '█'.repeat(30);
                         process.stdout.write(`\rTiến độ: [${bar}] 100% completed!\n`);
                         console.log(`[SUCCESS] Đã hoàn thành tạo giọng nói cho ${script}!`);
                         break;
                    } else {
                         console.log(`\n[WARNING] Server ở trạng thái idle, đang thử lại...`);
                         await sleep(1000);
                    }
                }
            }
        } catch (error) {
            console.error(`\n[FATAL ERROR] Lỗi khi xử lý ${script}: ${error.message}`);
            console.log("[HELP] Vui lòng kiểm tra xem Flask server có đang chạy tại http://127.0.0.1:5501 không.");
            process.exit(1);
        }
    }

    console.log(`\n==========================================================================`);
    console.log("=== HOÀN THÀNH TẠO GIỌNG NÓI CHO TẤT CẢ CÁC VIDEO YÊU CẦU! ===");
    console.log("==========================================================================");
}

run();
