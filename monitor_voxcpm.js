const http = require('http');

const SERVER_URL = 'http://127.0.0.1:5500';
const VIDEOS = ['video8', 'video9', 'video10', 'video11', 'video12'];
const POLL_INTERVAL_MS = 1500;

// Helper to make HTTP requests using Node.js standard library (no dependencies)
function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(SERVER_URL + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    try {
                        const parsed = JSON.parse(data);
                        reject(new Error(parsed.error || `HTTP error ${res.statusCode}`));
                    } catch (e) {
                        reject(new Error(`HTTP error ${res.statusCode}: ${data}`));
                    }
                }
            });
        });

        req.on('error', (err) => reject(err));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawProgressBar(progress, current, total) {
    const width = 30;
    const filledLength = Math.round(width * (progress / 100));
    const emptyLength = width - filledLength;
    const bar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);
    return `[${bar}] ${progress}% (${current}/${total} slide)`;
}

async function run() {
    console.log('================================================================');
    console.log('🔊 CÔNG CỤ TỰ ĐỘNG TẠO VÀ THEO DÕI GIỌNG NÓI VOXCPM (VIDEO 8-11)');
    console.log('================================================================');

    // Test server connection
    try {
        await request('GET', '/api/voices');
        console.log('✅ Kết nối máy chủ thành công (http://127.0.0.1:5500)');
    } catch (err) {
        console.error('❌ Không thể kết nối tới máy chủ Flask! Vui lòng chạy lệnh: python app.py trước.');
        process.exit(1);
    }

    for (const video of VIDEOS) {
        console.log(`\n----------------------------------------------------------------`);
        console.log(`🚀 Bắt đầu tạo giọng nói cho: ${video.toUpperCase()}`);

        // Check if server is currently processing another task
        let isWaiting = true;
        while (isWaiting) {
            try {
                const statusData = await request('GET', `/api/synthesize-all/status?script=${video}`);
                if (statusData.status === 'processing') {
                    console.log('⏳ Máy chủ đang bận xử lý một tiến trình khác, vui lòng đợi...');
                    await delay(3000);
                } else {
                    isWaiting = false;
                }
            } catch (err) {
                console.error(`[-] Lỗi khi kiểm tra trạng thái máy chủ: ${err.message}`);
                await delay(3000);
            }
        }

        // Trigger synthesis
        try {
            console.log(`📡 Đang gửi yêu cầu tạo giọng nói cho ${video}...`);
            await request('POST', '/api/synthesize-all', { script: video });
            console.log(`✅ Đã khởi chạy tiến trình tạo giọng nói.`);
        } catch (err) {
            console.error(`❌ Không thể khởi chạy tiến trình tạo giọng: ${err.message}`);
            continue;
        }

        // Poll status
        let completed = false;
        let consecutiveIdleCount = 0;
        
        while (!completed) {
            await delay(POLL_INTERVAL_MS);
            try {
                const statusData = await request('GET', `/api/synthesize-all/status?script=${video}`);
                const { status, progress, current, total, error } = statusData;

                if (status === 'processing') {
                    consecutiveIdleCount = 0;
                    const barText = drawProgressBar(progress, current, total);
                    process.stdout.write(`\r▶️ Đang tạo: ${barText}   `);
                } else if (status === 'completed') {
                    process.stdout.write(`\r▶️ Hoàn thành: ${drawProgressBar(100, total, total)}\n`);
                    console.log(`🎉 Thành công! Đã tạo xong toàn bộ audio cho kịch bản ${video.toUpperCase()}`);
                    completed = true;
                } else if (status === 'failed') {
                    console.log(`\n❌ Lỗi tiến trình tạo giọng: ${error}`);
                    completed = true;
                } else if (status === 'idle') {
                    // Sometimes if we miss the 'completed' transition state due to timing,
                    // it resets to idle. We track consecutive idle checks to detect completion or failure.
                    consecutiveIdleCount++;
                    if (consecutiveIdleCount >= 3) {
                        console.log(`\nℹ️ Tiến trình chuyển về trạng thái rảnh (Idle). Có thể đã hoàn thành.`);
                        completed = true;
                    } else {
                        process.stdout.write(`\r▶️ Trạng thái: Chờ khởi động... `);
                    }
                }
            } catch (err) {
                console.error(`\n[-] Lỗi kết nối trong khi theo dõi: ${err.message}`);
            }
        }
    }

    console.log('\n================================================================');
    console.log('✅ ĐÃ HOÀN THÀNH TẤT CẢ CÁC VIDEO 8, 9, 10, 11!');
    console.log('================================================================');
}

run();
