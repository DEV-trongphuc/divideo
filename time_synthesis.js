const http = require('http');

const API_BASE = 'http://127.0.0.1:5501';
const SCRIPT = 'video19';

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
    console.log(`=== BẮT ĐẦU ĐO THỜI GIAN TẠO GIỌNG NÓI VOXCPM CHO ${SCRIPT.toUpperCase()} ===`);
    console.log("==========================================================================");
    
    const startTime = Date.now();
    
    try {
        console.log(`[+] Đang gửi yêu cầu khởi tạo API synthesize-all cho ${SCRIPT}...`);
        await post(`${API_BASE}/api/synthesize-all`, {
            script: SCRIPT,
            voice: "google-vi-VN-Neural2-D",
            refVoice: "default_voxcpm"
        });
        
        console.log(`[+] Đã kích hoạt API thành công. Đang đo thời gian tiến trình...`);
        
        let lastProgress = -1;
        let lastCurrent = 0;
        let lastSlideTime = Date.now();
        
        while (true) {
            await sleep(500);
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
                console.log(`\n\n[SUCCESS] Đã tạo xong toàn bộ giọng nói cho ${SCRIPT}!`);
                break;
            } else if (status.status === 'failed') {
                console.log(`\n\n[ERROR] Tiến trình thất bại: ${status.error}`);
                break;
            }
        }
    } catch (error) {
        console.error(`\n[FATAL ERROR] Lỗi: ${error.message}`);
        console.log("[HELP] Hãy chắc chắn Flask server đang chạy ở http://127.0.0.1:5501");
    }
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`==========================================================================`);
    console.log(`[KẾT QUẢ] TỔNG THỜI GIAN ĐO ĐƯỢC: ${totalTime} giây.`);
    console.log(`==========================================================================`);
}

run();
