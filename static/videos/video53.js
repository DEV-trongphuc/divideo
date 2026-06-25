/**
 * Video 53: Brute-forcing 6-digit OTP Simulation
 * Plugin containing animations for безопасный dial spins, hacker table highlights, 3-strikes lockouts, and checklists.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_otp_1: [
            { text: 'vô hạn lần thử', start: 1.0, end: 4.5, class: 'active-gold' },
            { text: '6 số', start: 4.5, end: 8.0, class: 'active-blue' },
            { text: '1.000.000 khả năng', start: 8.0, end: 12.0, class: 'active-good' }
        ],
        slide_otp_2: [
            { text: 'trung bình', start: 1.0, end: 4.0, class: 'active-blue' },
            { text: 'mười một ngày', start: 4.0, end: 8.5, class: 'active-gold' },
            { text: 'mười bảy phút', start: 8.5, end: 13.5, class: 'active-bad' }
        ],
        slide_otp_3: [
            { text: 'giới hạn ba lần', start: 2.0, end: 6.0, class: 'active-bad' },
            { text: 'năm phút', start: 6.0, end: 9.0, class: 'active-gold' },
            { text: '0,0003%', start: 9.0, end: 12.5, class: 'active-good' }
        ],
        slide_otp_4: [
            { text: 'hạn OTP ngắn', start: 1.5, end: 4.5, class: 'active-good' },
            { text: 'giới hạn lần nhập', start: 4.5, end: 7.5, class: 'active-blue' },
            { text: 'dùng xong là vô hiệu', start: 7.5, end: 13.5, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_otp_1', 'slide_otp_2', 'slide_otp_3', 'slide_otp_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v53-zoom-container">${absHtml}<div class="v53-scene-content">${inner}</div></div>`;
    }

    // Generate random OTP string
    function makeRandOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_otp_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v53-scene-row">
                    <!-- Safe Lock Dial on Left -->
                    <div class="v53-safe-container">
                        <div class="v53-safe-wave pulse-1"></div>
                        <div class="v53-safe-wave pulse-2"></div>
                        <div class="v53-safe-dial" id="v53-safe-dial">
                            <div class="v53-safe-dial-center">
                                <div class="v53-safe-dial-notch"></div>
                            </div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                            <div class="v53-safe-dial-tick"></div>
                        </div>
                    </div>

                    <!-- Code Ticker Odometer on Right -->
                    <div class="v53-odometer-container">
                        <div class="v53-odometer-laser"></div>
                        <div class="v53-odometer-title">ĐANG QUÉT MÃ OTP</div>
                        <div class="v53-odometer-digits" id="v53-odometer-digits">
                            <div class="v53-odometer-digit-box">0</div>
                            <div class="v53-odometer-digit-box">0</div>
                            <div class="v53-odometer-digit-box">0</div>
                            <div class="v53-odometer-digit-box">0</div>
                            <div class="v53-odometer-digit-box">0</div>
                            <div class="v53-odometer-digit-box">0</div>
                        </div>
                    </div>
                </div>

                <div class="v53-glass-card glow-blue">
                    <span class="v53-status-badge blue"><i data-lucide="shield" style="width:12px;height:12px;"></i> KHẢ NĂNG PHÁ KHÓA</span>
                    <span style="color:#fff;" id="v53-otp-status-text">OTP 6 số (000000 - 999999): Tổng cộng 1.000.000 khả năng.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_otp_2') {
            canvas.innerHTML = sceneWrap(`
                <div class="v53-scene-row">
                    <!-- Brute Force Table on Left -->
                    <div class="v53-table-wrapper">
                        <table class="v53-table">
                            <thead>
                                <tr>
                                    <th>Tốc độ thử</th>
                                    <th>Thời gian trúng</th>
                                    <th>Thời gian lâu nhất</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="v53-row-1">
                                    <td>1 lần / giây</td>
                                    <td>5,8 ngày</td>
                                    <td>11,6 ngày</td>
                                </tr>
                                <tr id="v53-row-10">
                                    <td>10 lần / giây</td>
                                    <td>13,9 giờ</td>
                                    <td>27,8 giờ</td>
                                </tr>
                                <tr id="v53-row-100">
                                    <td>100 lần / giây</td>
                                    <td>83 phút</td>
                                    <td>2,8 giờ</td>
                                </tr>
                                <tr id="v53-row-1000">
                                    <td>1.000 lần / giây</td>
                                    <td>8,3 phút</td>
                                    <td>16,7 phút</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Hacking console log on Right -->
                    <div class="v53-console-wrapper">
                        <div class="v53-console-header">BRUTE-FORCE CONSOLE</div>
                        <div class="v53-console-log" id="v53-console-log">
                            <div>[SYS] Waiting...</div>
                        </div>
                    </div>
                </div>

                <div class="v53-glass-card glow-yellow">
                    <span class="v53-status-badge yellow"><i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> TẤN CÔNG BRUTE-FORCE</span>
                    <span style="color:#fff;" id="v53-otp-s2-text">Nếu bị quét liên tục, thời gian bẻ khóa phụ thuộc vào tốc độ thử.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_otp_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v53-scene-row">
                    <!-- Phone screen mockup in center -->
                    <div class="v53-phone-mockup">
                        <div class="v53-phone-header">
                            <span>Operator 5G</span>
                            <span>5:00 ⏳</span>
                        </div>
                        <div class="v53-phone-title">Nhập mã OTP</div>
                        
                        <!-- OTP Display boxes -->
                        <div class="v53-otp-boxes" id="v53-otp-display">
                            <div class="v53-otp-box">-</div>
                            <div class="v53-otp-box">-</div>
                            <div class="v53-otp-box">-</div>
                            <div class="v53-otp-box">-</div>
                            <div class="v53-otp-box">-</div>
                            <div class="v53-otp-box">-</div>
                        </div>

                        <!-- Strikes list -->
                        <div class="v53-strike-list">
                            <div class="v53-strike-item" id="v53-strike-1">
                                <span>Lần thử 1</span>
                                <span class="badge">Sẵn sàng</span>
                            </div>
                            <div class="v53-strike-item" id="v53-strike-2">
                                <span>Lần thử 2</span>
                                <span class="badge">Sẵn sàng</span>
                            </div>
                            <div class="v53-strike-item" id="v53-strike-3">
                                <span>Lần thử 3</span>
                                <span class="badge">Sẵn sàng</span>
                            </div>
                        </div>

                        <!-- Lockout Screen Overlay -->
                        <div class="v53-lockout-overlay" id="v53-lockout-screen">
                            <span class="v53-lockout-icon">🔒</span>
                            <span class="v53-lockout-title">Tài khoản bị khóa</span>
                            <span class="v53-lockout-desc">Bạn đã nhập sai OTP quá 3 lần. Vui lòng thử lại sau 15 phút.</span>
                        </div>
                    </div>
                </div>

                <div class="v53-glass-card glow-red">
                    <span class="v53-status-badge red"><i data-lucide="lock" style="width:12px;height:12px;"></i> GIỚI HẠN BẢO VỆ</span>
                    <span style="color:#fff;" id="v53-otp-s3-text">Hầu hết các hệ thống bảo mật chỉ cho phép thử tối đa 3 lần.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_otp_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v53-checklist">
                    <div class="v53-check-item" id="v53-chk-1">
                        <div class="v53-check-icon-box">1</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Hết hạn siêu nhanh</span>
                            <span class="v53-check-sub">Chỉ có hiệu lực từ 30s - 5p</span>
                        </div>
                    </div>
                    <div class="v53-check-item" id="v53-chk-2">
                        <div class="v53-check-icon-box">2</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Khóa khi nhập sai</span>
                            <span class="v53-check-sub">Giới hạn 3 - 5 lần nhập sai</span>
                        </div>
                    </div>
                    <div class="v53-check-item" id="v53-chk-3">
                        <div class="v53-check-icon-box">3</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Delay gửi lại</span>
                            <span class="v53-check-sub">Chỉ gửi lại OTP sau 30s - 60s</span>
                        </div>
                    </div>
                    <div class="v53-check-item" id="v53-chk-4">
                        <div class="v53-check-icon-box">4</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Khóa IP / Thiết bị</span>
                            <span class="v53-check-sub">Ngăn chặn spam request liên tục</span>
                        </div>
                    </div>
                    <div class="v53-check-item" id="v53-chk-5">
                        <div class="v53-check-icon-box">5</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Khóa tạm thời tài khoản</span>
                            <span class="v53-check-sub">Ngăn hacker đoán mò dài ngày</span>
                        </div>
                    </div>
                    <div class="v53-check-item" id="v53-chk-6">
                        <div class="v53-check-icon-box">6</div>
                        <div class="v53-check-text">
                            <span class="v53-check-label">Hủy bỏ ngay sau dùng</span>
                            <span class="v53-check-sub">Chỉ sử dụng duy nhất một lần</span>
                        </div>
                    </div>
                </div>

                <div class="v53-glass-card glow-blue">
                    <span class="v53-status-badge blue"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> QUY TẮC AN TOÀN VÀNG</span>
                    <span style="color:#fff;" id="v53-otp-s4-text">Các cơ chế phối hợp giúp mã OTP 6 số đạt độ an toàn tuyệt đối.</span>
                </div>
            `);
            initIcons();
        }
    }

    // Helper to print fake hacking logs
    let lastConsoleTime = 0;
    let consoleLogs = [];
    function renderHackerConsole(logEl, speedLevel, progress) {
        const now = Date.now();
        // Update console logs at different speeds
        let rate = 300; // ms
        if (speedLevel === 2) rate = 100;
        if (speedLevel === 3) rate = 30;
        if (speedLevel === 4) rate = 8;

        if (now - lastConsoleTime > rate) {
            lastConsoleTime = now;
            // Generate 5 fake codes
            const fakeCode = makeRandOTP();
            consoleLogs.push(`[TRY] ${fakeCode} - Fail`);
            if (consoleLogs.length > 9) consoleLogs.shift();

            logEl.innerHTML = consoleLogs.map(line => `<div>${line}</div>`).join('');
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_otp_1') {
            const dial = canvas.querySelector('#v53-safe-dial');
            const odometer = canvas.querySelector('#v53-odometer-digits');
            const status = canvas.querySelector('#v53-otp-status-text');

            // Rotate Dial
            if (dial) {
                const angle = progress * 720;
                dial.style.transform = `rotate(${angle}deg)`;
            }

            // Rolling odometer numbers with micro scale pulse
            if (odometer) {
                const boxes = odometer.querySelectorAll('.v53-odometer-digit-box');
                if (progress < 0.9) {
                    boxes.forEach(box => {
                        box.textContent = Math.floor(Math.random() * 10).toString();
                        box.style.color = '#38bdf8';
                        box.style.textShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
                        // Scale pulsing
                        box.style.transform = `scale(${1 + Math.sin(Date.now() / 50) * 0.05})`;
                    });
                    if (status) status.textContent = 'Mã OTP 6 số (000000 - 999999): Tổng cộng 1.000.000 khả năng.';
                } else {
                    // Settle on 999999
                    boxes.forEach(box => {
                        box.textContent = '9';
                        box.style.color = '#10b981';
                        box.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
                        box.style.transform = 'scale(1)';
                    });
                    if (status) status.textContent = 'Với 1.000.000 khả năng, bẻ khóa ngẫu nhiên cực kỳ bất khả thi!';
                }
            }
        }
        else if (slideId === 'slide_otp_2') {
            const row1 = canvas.querySelector('#v53-row-1');
            const row10 = canvas.querySelector('#v53-row-10');
            const row100 = canvas.querySelector('#v53-row-100');
            const row1000 = canvas.querySelector('#v53-row-1000');
            const logEl = canvas.querySelector('#v53-console-log');
            const status = canvas.querySelector('#v53-otp-s2-text');

            if (row1) row1.className = '';
            if (row10) row10.className = '';
            if (row100) row100.className = '';
            if (row1000) row1000.className = '';

            let speedLevel = 1;

            if (progress <= 0.25) {
                if (row1) row1.className = 'active';
                speedLevel = 1;
                if (status) status.textContent = 'Thử 1 mã/giây: Trung bình mất 5.8 ngày để trúng, lâu nhất 11.6 ngày.';
            } else if (progress > 0.25 && progress <= 0.5) {
                if (row10) row10.className = 'active';
                speedLevel = 2;
                if (status) status.textContent = 'Tăng lên 10 mã/giây: Trung bình cần 13.9 giờ, lâu nhất 27.8 giờ.';
            } else if (progress > 0.5 && progress <= 0.75) {
                if (row100) row100.className = 'active';
                speedLevel = 3;
                if (status) status.textContent = 'Tốc độ 100 mã/giây: Chỉ cần trung bình 83 phút, lâu nhất 2.8 giờ.';
            } else {
                if (row1000) row1000.className = 'active super-fast';
                speedLevel = 4;
                if (status) status.textContent = 'Tốc độ 1.000 mã/giây: Cực kỳ nguy hiểm, trung bình trúng chỉ sau 8.3 phút!';
            }

            if (logEl) {
                renderHackerConsole(logEl, speedLevel, progress);
            }
        }
        else if (slideId === 'slide_otp_3') {
            const boxes = canvas.querySelectorAll('#v53-otp-display .v53-otp-box');
            const strike1 = canvas.querySelector('#v53-strike-1');
            const strike2 = canvas.querySelector('#v53-strike-2');
            const strike3 = canvas.querySelector('#v53-strike-3');
            const lockout = canvas.querySelector('#v53-lockout-screen');
            const status = canvas.querySelector('#v53-otp-s3-text');
            const phone = canvas.querySelector('.v53-phone-mockup');

            // Reset UI
            boxes.forEach(box => { box.textContent = '-'; box.className = 'v53-otp-box'; });
            if (strike1) { strike1.className = 'v53-strike-item'; strike1.querySelector('.badge').textContent = 'Sẵn sàng'; }
            if (strike2) { strike2.className = 'v53-strike-item'; strike2.querySelector('.badge').textContent = 'Sẵn sàng'; }
            if (strike3) { strike3.className = 'v53-strike-item'; strike3.querySelector('.badge').textContent = 'Sẵn sàng'; }
            if (lockout) lockout.classList.remove('active');

            // Handle shake triggers
            if (phone) {
                const isShaking = (progress >= 0.22 && progress <= 0.26) || 
                                  (progress >= 0.47 && progress <= 0.51) || 
                                  (progress >= 0.72 && progress <= 0.76);
                if (isShaking) {
                    phone.classList.add('v53-phone-shake-active');
                } else {
                    phone.classList.remove('v53-phone-shake-active');
                }
            }

            if (progress <= 0.25) {
                // Attempting first entry
                const code = '482059';
                const len = Math.floor(((progress - 0.05) / 0.15) * 6);
                for (let i = 0; i < 6; i++) {
                    if (i < len) {
                        boxes[i].textContent = code[i];
                        boxes[i].className = 'v53-otp-box filled';
                    } else if (i === len) {
                        boxes[i].className = 'v53-otp-box active-cursor';
                    }
                }
                if (len >= 6) {
                    boxes.forEach(box => box.className = 'v53-otp-box error');
                    if (strike1) { strike1.className = 'v53-strike-item fail'; strike1.querySelector('.badge').textContent = 'Sai ❌'; }
                }
                if (status) status.textContent = 'Nhập sai lần thứ nhất: 482059. Hệ thống cảnh báo.';
            }
            else if (progress > 0.25 && progress <= 0.5) {
                // First strike remains red
                if (strike1) { strike1.className = 'v53-strike-item fail'; strike1.querySelector('.badge').textContent = 'Sai ❌'; }

                // Attempting second entry
                const code = '910384';
                const len = Math.floor(((progress - 0.28) / 0.17) * 6);
                for (let i = 0; i < 6; i++) {
                    if (i < len) {
                        boxes[i].textContent = code[i];
                        boxes[i].className = 'v53-otp-box filled';
                    } else if (i === len) {
                        boxes[i].className = 'v53-otp-box active-cursor';
                    }
                }
                if (len >= 6) {
                    boxes.forEach(box => box.className = 'v53-otp-box error');
                    if (strike2) { strike2.className = 'v53-strike-item fail'; strike2.querySelector('.badge').textContent = 'Sai ❌'; }
                }
                if (status) status.textContent = 'Nhập sai lần thứ hai: 910384. Hệ thống tiếp tục báo lỗi.';
            }
            else if (progress > 0.5 && progress <= 0.75) {
                // First & Second strike red
                if (strike1) { strike1.className = 'v53-strike-item fail'; strike1.querySelector('.badge').textContent = 'Sai ❌'; }
                if (strike2) { strike2.className = 'v53-strike-item fail'; strike2.querySelector('.badge').textContent = 'Sai ❌'; }

                // Attempting third entry
                const code = '038472';
                const len = Math.floor(((progress - 0.53) / 0.17) * 6);
                for (let i = 0; i < 6; i++) {
                    if (i < len) {
                        boxes[i].textContent = code[i];
                        boxes[i].className = 'v53-otp-box filled';
                    } else if (i === len) {
                        boxes[i].className = 'v53-otp-box active-cursor';
                    }
                }
                if (len >= 6) {
                    boxes.forEach(box => box.className = 'v53-otp-box error');
                    if (strike3) { strike3.className = 'v53-strike-item fail'; strike3.querySelector('.badge').textContent = 'Sai ❌'; }
                }
                if (status) status.textContent = 'Nhập sai lần thứ ba: 038472. Đã dùng hết mọi cơ hội!';
            }
            else {
                // Locked out!
                if (strike1) { strike1.className = 'v53-strike-item fail'; strike1.querySelector('.badge').textContent = 'Sai ❌'; }
                if (strike2) { strike2.className = 'v53-strike-item fail'; strike2.querySelector('.badge').textContent = 'Sai ❌'; }
                if (strike3) { strike3.className = 'v53-strike-item fail'; strike3.querySelector('.badge').textContent = 'Sai ❌'; }
                boxes.forEach(box => { box.textContent = '•'; box.className = 'v53-otp-box error'; });
                if (lockout) lockout.classList.add('active');
                if (status) status.textContent = 'BÙM! Nhập sai 3 lần, tài khóa khóa tạm thời. Xác suất đoán mò lúc này chỉ là 0.0003%!';
            }
        }
        else if (slideId === 'slide_otp_4') {
            const chk1 = canvas.querySelector('#v53-chk-1');
            const chk2 = canvas.querySelector('#v53-chk-2');
            const chk3 = canvas.querySelector('#v53-chk-3');
            const chk4 = canvas.querySelector('#v53-chk-4');
            const chk5 = canvas.querySelector('#v53-chk-5');
            const chk6 = canvas.querySelector('#v53-chk-6');
            const status = canvas.querySelector('#v53-otp-s4-text');

            if (chk1) chk1.className = 'v53-check-item';
            if (chk2) chk2.className = 'v53-check-item';
            if (chk3) chk3.className = 'v53-check-item';
            if (chk4) chk4.className = 'v53-check-item';
            if (chk5) chk5.className = 'v53-check-item';
            if (chk6) chk6.className = 'v53-check-item';

            if (progress > 0.12) { if (chk1) chk1.className = 'v53-check-item active'; }
            if (progress > 0.28) { if (chk2) chk2.className = 'v53-check-item active'; }
            if (progress > 0.44) { if (chk3) chk3.className = 'v53-check-item active'; }
            if (progress > 0.60) { if (chk4) chk4.className = 'v53-check-item active'; }
            if (progress > 0.76) { if (chk5) chk5.className = 'v53-check-item active'; }
            if (progress > 0.90) { if (chk6) chk6.className = 'v53-check-item active'; }

            if (progress <= 0.3) {
                if (status) status.textContent = 'OTP phải hết hạn cực nhanh và giới hạn số lần nhập sai từ 3 - 5 lần.';
            } else if (progress > 0.3 && progress <= 0.65) {
                if (status) status.textContent = 'Chỉ cho phép gửi lại sau 1 phút, đồng thời chặn các IP spam liên tiếp.';
            } else if (progress > 0.65 && progress <= 0.85) {
                if (status) status.textContent = 'Khóa tạm thời tài khoản khi thử quá nhiều để chặn đứng hacker đoán mã dài ngày.';
            } else {
                if (status) status.textContent = 'Quy tắc vàng: Mã OTP dùng xong hoặc hết hạn là lập tức vô hiệu hoàn toàn!';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video53',
        topic: 'Brute force OTP',
        episodeNum: 53,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video53 Plugin] Loaded: Brute-forcing OTP slides loaded.');
})();
