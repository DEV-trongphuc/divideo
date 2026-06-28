const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://127.0.0.1:5501';

// Read arguments: node gen_voice.js <script_name> [project_name]
const scriptArg = process.argv[2];
if (!scriptArg) {
    console.error("[-] Lỗi: Vui lòng truyền tên kịch bản (ví dụ: node gen_voice.js video28)");
    process.exit(1);
}
const SCRIPTS = [scriptArg];
const PROJECT = process.argv[3] || 'TurnioDev';

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

        // Set timeout to 10 minutes to avoid socket reset on long processing
        req.setTimeout(600000);
        req.on('timeout', () => {
            req.destroy(new Error('Yêu cầu tạo giọng nói bị quá thời gian chờ (10 phút)'));
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
    console.log(`=== BẮT ĐẦU TIẾN TRÌNH TẠO GIỌNG NÓI CHO KỊCH BẢN ${SCRIPTS[0].toUpperCase()} ===`);
    console.log(`=== DỰ ÁN: ${PROJECT} | API SERVER: ${API_BASE} ===`);
    console.log("==========================================================================");
    
    for (const script of SCRIPTS) {
        console.log(`\n--------------------------------------------------------------------------`);
        console.log(`[+] Đang bắt đầu xử lý kịch bản: ${script} (Project: ${PROJECT})`);
        
        // Load slides.json to get slide IDs for detailed logs
        const folder = PROJECT === 'DOMMemo' ? 'kichban_memo' : 'kichban';
        const slidesPath = path.join(__dirname, folder, script, 'slides.json');
        let slides = [];
        if (fs.existsSync(slidesPath)) {
            try {
                slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'));
            } catch (e) {
                console.warn(`[!] Không thể đọc slides.json trước: ${e.message}`);
            }
        }

        const startTime = Date.now();
        
        try {
            // Trigger synthesis for current video
            await post(`${API_BASE}/api/synthesize-all`, {
                script: script,
                voice: "google-vi-VN-Neural2-D",
                refVoice: "default_voxcpm",
                project: PROJECT
            });
            
            console.log(`[+] Đã kích hoạt API thành công. Theo dõi trạng thái tiến độ...`);
            
            let lastCurrent = 0;
            let slideStartTime = Date.now();
            const slideTimings = [];
            
            while (true) {
                await sleep(500); // Poll every 500ms for more accurate slide timing
                const status = await get(`${API_BASE}/api/synthesize-all/status?script=${script}&project=${PROJECT}`);
                
                if (status.status === 'processing') {
                    if (status.current > lastCurrent) {
                        const elapsed = (Date.now() - slideStartTime) / 1000;
                        
                        // Clear progress bar line
                        process.stdout.write(`\r\x1b[K`);
                        
                        for (let i = lastCurrent; i < status.current; i++) {
                            const slideObj = slides[i] || { id: `slide_${i + 1}` };
                            let slideDuration = 0;
                            let isCached = false;
                            
                            if (i === status.current - 1) {
                                slideDuration = elapsed;
                            } else {
                                slideDuration = 0.01; // tiny fallback for skipped/cached slides in the same tick
                                isCached = true;
                            }
                            
                            const durationStr = slideDuration.toFixed(2);
                            const statusTag = isCached ? ' (Cached/Nhanh)' : '';
                            console.log(`[+] Slide ${i + 1}/${status.total} [${slideObj.id}] hoàn thành trong ${durationStr}s${statusTag}`);
                            
                            slideTimings.push({
                                index: i + 1,
                                id: slideObj.id,
                                duration: durationStr,
                                cached: isCached
                            });
                        }
                        
                        slideStartTime = Date.now();
                        lastCurrent = status.current;
                    }
                    
                    // Draw progress bar at the bottom
                    const barLength = 30;
                    const filledLength = Math.round(barLength * (status.progress / 100));
                    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
                    process.stdout.write(`\rProgress: [${bar}] ${status.progress}% (${status.current}/${status.total} slides)`);
                    
                } else if (status.status === 'completed') {
                    // Process any remaining slides if status suddenly completed
                    if (status.total > lastCurrent) {
                        const elapsed = (Date.now() - slideStartTime) / 1000;
                        process.stdout.write(`\r\x1b[K`);
                        
                        for (let i = lastCurrent; i < status.total; i++) {
                            const slideObj = slides[i] || { id: `slide_${i + 1}` };
                            let slideDuration = 0;
                            let isCached = false;
                            
                            if (i === status.total - 1) {
                                slideDuration = elapsed;
                            } else {
                                slideDuration = 0.01;
                                isCached = true;
                            }
                            
                            const durationStr = slideDuration.toFixed(2);
                            const statusTag = isCached ? ' (Cached/Nhanh)' : '';
                            console.log(`[+] Slide ${i + 1}/${status.total} [${slideObj.id}] hoàn thành trong ${durationStr}s${statusTag}`);
                            
                            slideTimings.push({
                                index: i + 1,
                                id: slideObj.id,
                                duration: durationStr,
                                cached: isCached
                            });
                        }
                    }
                    
                    // Final 100% update
                    process.stdout.write(`\r\x1b[K`);
                    const bar = '█'.repeat(30);
                    process.stdout.write(`Progress: [${bar}] 100% completed!\n\n`);
                    console.log(`[SUCCESS] Đã tạo xong toàn bộ giọng nói cho ${script} thuộc dự án ${PROJECT}!`);
                    
                    // Print summary table
                    console.log(`\n==========================================================================`);
                    console.log(`=== BẢNG THỐNG KÊ THỜI GIAN HOÀN THÀNH TỪNG SLIDE ===`);
                    console.log(`==========================================================================`);
                    slideTimings.forEach(item => {
                        const cachedTag = item.cached ? ' [Cached]' : '';
                        console.log(` - Slide ${String(item.index).padStart(2, '0')} [${item.id.padEnd(25)}]: ${item.duration.padStart(6)}s${cachedTag}`);
                    });
                    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                    console.log(`--------------------------------------------------------------------------`);
                    console.log(`Tổng thời gian thực thi kịch bản: ${totalTime}s`);
                    console.log(`==========================================================================`);
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
            console.log("[HELP] Vui lòng kiểm tra xem Flask server có đang chạy tại http://127.0.0.1:5501 không.");
        }
    }
}

run();
