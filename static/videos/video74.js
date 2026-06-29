/**
 * Video 73: SMS Brandname Spoofing (Giả mạo tin nhắn ngân hàng)
 * Interactive simulation layout designed for mobile 9:16 screen (Supercharged Premium Animations).
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_sms_hook: [
            { text: 'tin nhắn từ ngân hàng', start: 3.5, end: 7.5, class: 'active-cyan' },
            { text: 'nằm chung một hộp thoại', start: 8.5, end: 12.5, class: 'active-red' }
        ],
        slide_sms_imsi_catcher: [
            { text: 'phát sóng di động giả mạo', start: 3.0, end: 7.0, class: 'active-red' },
            { text: 'tự động kết nối', start: 9.0, end: 12.5, class: 'active-yellow' }
        ],
        slide_sms_transmission: [
            { text: 'không có cơ chế xác thực', start: 4.0, end: 8.0, class: 'active-red' },
            { text: 'Sender ID', start: 8.5, end: 11.5, class: 'active-yellow' }
        ],
        slide_sms_grouping: [
            { text: 'so khớp chuỗi ký tự', start: 3.0, end: 7.0, class: 'active-yellow' },
            { text: 'gom tin nhắn giả', start: 8.5, end: 12.0, class: 'active-green' }
        ],
        slide_sms_prevention: [
            { text: 'không bao giờ nhấp vào link', start: 3.0, end: 7.0, class: 'active-red' },
            { text: 'Smart OTP', start: 8.5, end: 12.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_sms_hook',
        'slide_sms_imsi_catcher',
        'slide_sms_transmission',
        'slide_sms_grouping',
        'slide_sms_prevention'
    ];

    function sceneWrap(inner) {
        return `<div class="v74-zoom-container"><div class="v74-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_sms_hook') {
            canvas.innerHTML = sceneWrap(`
                <div class="v74-phone-mockup" id="v74-hook-phone">
                    <div class="v74-sms-header">
                        <span class="v74-sms-back">❮</span>
                        <div class="v74-sms-sender-title">Vietcombank</div>
                        <div class="v74-sms-sender-subtitle">Tin nhắn SMS</div>
                    </div>
                    <div class="v74-sms-body">
                        <!-- Message 1: Genuine -->
                        <div class="v74-sms-bubble incoming" style="animation: v74-fade-up 0.5s forwards;">
                            GD: +20,000,000VND vao luc 09:30. So du: 45,200,000VND.
                        </div>
                        <!-- Message 2: Genuine -->
                        <div class="v74-sms-bubble incoming" style="animation: v74-fade-up 0.5s forwards 0.3s; animation-fill-mode: both;">
                            Ma OTP cua quy khach la <span class="v74-otp-blur">495028</span>. Hieu luc trong 3 phut.
                        </div>
                        <!-- Message 3: Fake Phishing Link -->
                        <div class="v74-sms-bubble incoming phishing" id="v74-sms-phish">
                            <span class="v74-phish-badge">⚠️ CẢNH BÁO GIẢ MẠO</span>
                            KHAN CAP: Tai khoan cua quy khach hien dang bi dang nhap la tai Ha Noi. Vui long xac thuc ngay tai: 
                            <span class="v74-sms-phish-link">vietcombank-security.xyz</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sms_imsi_catcher') {
            canvas.innerHTML = sceneWrap(`
                <div class="v74-imsi-board">
                    <!-- Status Header Badge -->
                    <div class="v74-status-badge secure" id="v74-imsi-status">AN TOÀN: ĐANG KẾT NỐI TRẠM THẬT</div>

                    <div class="v74-imsi-grid">
                        <!-- Left: Real Cellular Tower -->
                        <div class="v74-station-node real">
                            <div class="v74-antenna-mast-g">
                                <div class="v74-tower-base"></div>
                                <div class="v74-tower-body"></div>
                                <div class="v74-tower-emitter"></div>
                                <div class="v74-signal-ring s1"></div>
                                <div class="v74-signal-ring s2"></div>
                                <div class="v74-signal-ring s3"></div>
                            </div>
                            <div class="v74-station-label">Trạm Thật (Vina/Viettel)</div>
                        </div>

                        <!-- Center: Victim's Smartphone -->
                        <div class="v74-victim-phone-device" id="v74-victim-phone">
                            <div class="v74-phone-notch-g"></div>
                            <div class="v74-phone-screen-g">
                                <div class="v74-phone-sim-status">
                                    <span class="v74-phone-sim-carrier" id="v74-sim-carrier-name">RealNet</span>
                                    <span class="v74-phone-sim-bars" id="v74-sim-bars-icon" style="color: var(--v74-cyan)">📶</span>
                                </div>
                                <div class="v74-phone-inner-content">
                                    <div class="v74-phone-lock-icon" id="v74-phone-lock-status">🔒</div>
                                    <div class="v74-phone-slide-text" id="v74-phone-conn-status" style="color: var(--v74-cyan)">Đã kết nối</div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Hacker Catcher (Rogue base station) -->
                        <div class="v74-station-node fake">
                            <div class="v74-hacker-vehicle-g">
                                <div class="v74-hacker-car">
                                    <div class="v74-car-cabin"></div>
                                    <div class="v74-car-chassis">
                                        <div class="v74-car-wheel w-left"></div>
                                        <div class="v74-car-wheel w-right"></div>
                                    </div>
                                    <div class="v74-car-antenna-pole">
                                        <div class="v74-car-dish">📡</div>
                                    </div>
                                </div>
                                <!-- Expanding threat pulses -->
                                <div class="v74-threat-wave tw1" id="v74-wave-1"></div>
                                <div class="v74-threat-wave tw2" id="v74-wave-2"></div>
                                <div class="v74-threat-wave tw3" id="v74-wave-3"></div>
                            </div>
                            <div class="v74-station-label">Trạm Giả (IMSI Catcher)</div>
                        </div>
                    </div>

                    <!-- SVG Connection Lines (Adjusted Y to 300 for height 600px) -->
                    <svg class="v74-line-svg">
                        <line class="v74-connection-line real-line" id="v74-line-real" x1="400" y1="300" x2="160" y2="300" />
                        <line class="v74-connection-line fake-line" id="v74-line-fake" x1="400" y1="300" x2="640" y2="300" />
                    </svg>

                    <!-- Moving packet flow along lines -->
                    <div class="v74-line-packet real-packet" id="v74-packet-r"></div>
                    <div class="v74-line-packet fake-packet" id="v74-packet-f"></div>
                </div>
            `);
        }
        else if (slideId === 'slide_sms_transmission') {
            canvas.innerHTML = sceneWrap(`
                <div class="v74-control-panel">
                    <div class="v74-panel-header">
                        <span>🛰️ GSM SMS BROADCASTER</span>
                        <span style="color:#ef4444; font-size:16px;">● BROADCASTING</span>
                    </div>

                    <div class="v74-form-group">
                        <div class="v74-field-label">Sender ID (Brandname)</div>
                        <div class="v74-field-input sender-id-input">Vietcombank</div>
                    </div>

                    <div class="v74-form-group">
                        <div class="v74-field-label">Target Broadcast Radius</div>
                        <div class="v74-field-input">500 meters (GSM Band-900)</div>
                    </div>

                    <div class="v74-form-group">
                        <div class="v74-field-label">Message Payload</div>
                        <div class="v74-field-input" style="height:120px; font-size:18px; color:rgba(255,255,255,0.7); line-height:1.4;">
                            KHAN CAP: Tai khoan cua quy khach hien dang bi dang nhap la tai Ha Noi. Vui long xac thuc ngay tai: vietcombank-security.xyz
                        </div>
                    </div>

                    <div class="v74-btn-submit" id="v74-btn-send">
                        [ RUN BRANDNAME INJECTION ]
                        <!-- Progress loading bar inside button -->
                        <div class="v74-loading-bar-wrap" id="v74-btn-progress-wrap">
                            <div class="v74-loading-bar-fill" id="v74-btn-progress-fill"></div>
                        </div>
                    </div>

                    <!-- Visual Flyout Packet -->
                    <div class="v74-packet-flow" id="v74-sms-packet">
                        ✉️ Brandname: "Vietcombank"
                    </div>

                    <!-- Cursor simulated icon -->
                    <div class="v74-cursor" id="v74-cursor-f">👆</div>
                </div>
            `);
        }
        else if (slideId === 'slide_sms_grouping') {
            canvas.innerHTML = sceneWrap(`
                <div class="v74-match-board">
                    <div class="v74-panel-header">
                        <span>📁 OS THREAD COMPARATOR</span>
                        <span style="color:#10b981; font-size:16px;">STRING MATCHING</span>
                    </div>

                    <!-- Laser beam paths for matching -->
                    <svg class="v74-compare-laser-svg">
                        <line class="v74-match-laser left-laser" id="v74-laser-l" x1="230" y1="210" x2="400" y2="210" />
                        <line class="v74-match-laser right-laser" id="v74-laser-r" x1="570" y1="210" x2="400" y2="210" />
                    </svg>

                    <div class="v74-compare-row">
                        <!-- Incoming Fake Packet -->
                        <div class="v74-comp-card c1" id="v74-comp-incoming">
                            <span class="v74-card-lbl">Tin Nhắn Nhận</span>
                            <span class="v74-card-val v74-c1-val">"Vietcombank"</span>
                        </div>

                        <!-- Equal operator -->
                        <div class="v74-operator-box">===</div>

                        <!-- Existing Genuine Thread -->
                        <div class="v74-comp-card c2" id="v74-comp-target">
                            <span class="v74-card-lbl">Hộp Thoại Sẵn Có</span>
                            <span class="v74-card-val v74-c2-val">"Vietcombank"</span>
                        </div>

                        <!-- Equal match result tag -->
                        <div class="v74-match-result" id="v74-match-ok">✓ MATCH: TRUE</div>
                    </div>

                    <div class="v74-threads-list">
                        <div style="font-size:18px; color:#64748b; font-weight:bold; margin-bottom:5px;">DANH SÁCH HỘP THOẠI TRÊN ĐIỆN THOẠI</div>
                        
                        <div class="v74-thread-item" id="v74-th-1">
                            <div class="v74-thread-left">
                                <span class="v74-thread-icon">💬</span>
                                <span class="v74-thread-name">Mẹ Yêu</span>
                            </div>
                            <span class="v74-thread-meta">Hôm qua</span>
                        </div>

                        <div class="v74-thread-item" id="v74-th-target">
                            <div class="v74-thread-left">
                                <span class="v74-thread-icon">🏦</span>
                                <span class="v74-thread-name">Vietcombank</span>
                            </div>
                            <span class="v74-thread-meta" id="v74-th-time">10:30 AM</span>
                        </div>

                        <div class="v74-thread-item" id="v74-th-3">
                            <div class="v74-thread-left">
                                <span class="v74-thread-icon">💬</span>
                                <span class="v74-thread-name">Giao Hàng Nhanh</span>
                            </div>
                            <span class="v74-thread-meta">2 ngày trước</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sms_prevention') {
            canvas.innerHTML = sceneWrap(`
                <div class="v74-prevention-container">
                    <!-- Left: Phishing SMS -->
                    <div class="v74-prev-col danger-side" id="v74-danger-col">
                        <div class="v74-prev-hdr v74-danger-text">
                            <span>❌ SMS BRANDNAME</span>
                        </div>
                        <div class="v74-app-screen-mock">
                            <div style="background:#1f2937; border-radius:12px; padding:10px; font-size:15px; color:#fff;">
                                Vui long xac thuc tai: vietcombank-security.xyz
                            </div>
                            <div style="font-size:15px; color:#ef4444; font-weight:bold; text-align:center; margin-top:20px;">
                                ⚠️ CẢNH BÁO BỊ HACK MẤT NICK
                            </div>
                        </div>
                        <div style="font-size:18px; text-align:center; color:#94a3b8; font-weight:bold;">
                            Tuyệt đối không click Link
                        </div>
                        <div class="v74-hazard-line" id="v74-danger-line"></div>
                    </div>

                    <!-- Right: In-App Smart OTP -->
                    <div class="v74-prev-col secure-side" id="v74-secure-col">
                        <div class="v74-prev-hdr v74-secure-text">
                            <span>🛡️ SMART OTP ON APP</span>
                        </div>
                        <div class="v74-app-screen-mock" style="background:#0b1329;">
                            <div class="v74-smart-otp-container">
                                <div class="v74-smart-otp-shield" id="v74-shield-rot">🛡️</div>
                                <div class="v74-smart-otp-code" id="v74-otp-num">******</div>
                            </div>
                            <div class="v74-app-btn" id="v74-app-btn-conf">XÁC NHẬN OTP</div>
                        </div>
                        <div style="font-size:18px; text-align:center; color:#94a3b8; font-weight:bold;">
                            Smart OTP tự động trên App
                        </div>
                    </div>

                    <!-- Hand Cursor simulation -->
                    <div class="v74-cursor" id="v74-app-cursor">👆</div>
                </div>
            `);
        }
    }

    // ── UPDATE FRAME ANIMATION LOOP ────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_sms_hook') {
            const smsPhish = canvas.querySelector('#v74-sms-phish');
            const phone = canvas.querySelector('#v74-hook-phone');

            // 1. Phishing message slides up and triggers haptic shake
            if (smsPhish) {
                if (progress >= 0.4) {
                    const factor = (progress - 0.4) / 0.5; // 0 to 1
                    const slideIn = Math.min(1.0, factor);
                    smsPhish.style.opacity = slideIn;
                    smsPhish.style.transform = `translateY(${30 - (slideIn * 30)}px)`;
                    
                    const blink = Math.floor(progress * 15) % 2 === 0;
                    smsPhish.style.borderColor = blink ? '#ef4444' : 'rgba(239,68,68,0.2)';

                    // Trigger phone vibration shake at exact receive moment
                    if (progress >= 0.4 && progress < 0.48) {
                        if (phone) phone.style.animation = 'v74-phone-shake 0.3s ease-in-out';
                    } else {
                        if (phone) phone.style.animation = 'none';
                    }
                } else {
                    smsPhish.style.opacity = '0';
                    smsPhish.style.transform = 'translateY(30px)';
                    if (phone) phone.style.animation = 'none';
                }
            }
        }
        else if (slideId === 'slide_sms_imsi_catcher') {
            const lineReal = canvas.querySelector('#v74-line-real');
            const lineFake = canvas.querySelector('#v74-line-fake');
            const phone = canvas.querySelector('#v74-victim-phone');
            const carrierName = canvas.querySelector('#v74-sim-carrier-name');
            const barsIcon = canvas.querySelector('#v74-sim-bars-icon');
            const lockStatus = canvas.querySelector('#v74-phone-lock-status');
            const connStatus = canvas.querySelector('#v74-phone-conn-status');
            const waves = canvas.querySelectorAll('.v74-threat-wave');
            const realRings = canvas.querySelectorAll('.v74-signal-ring');
            const statusBadge = canvas.querySelector('#v74-imsi-status');
            const packR = canvas.querySelector('#v74-packet-r');
            const packF = canvas.querySelector('#v74-packet-f');

            if (progress < 0.35) {
                // Phase 1a: Secure normal connection
                if (statusBadge) {
                    statusBadge.textContent = 'AN TOÀN: ĐANG KẾT NỐI TRẠM THẬT';
                    statusBadge.className = 'v74-status-badge secure';
                }
                if (lineReal) {
                    lineReal.style.opacity = '1';
                    lineReal.style.strokeWidth = '4px';
                }
                if (lineFake) lineFake.style.opacity = '0';
                
                if (phone) {
                    phone.style.transform = 'translateX(-40px) scale(1)';
                    phone.style.borderColor = 'var(--v74-cyan)';
                    phone.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(6, 182, 212, 0.4)';
                }
                
                if (carrierName) carrierName.textContent = 'VinaPhone';
                if (barsIcon) {
                    barsIcon.textContent = '📶';
                    barsIcon.style.color = 'var(--v74-cyan)';
                }
                if (lockStatus) lockStatus.textContent = '🔒';
                if (connStatus) {
                    connStatus.textContent = 'ĐÃ KẾT NỐI';
                    connStatus.style.color = 'var(--v74-cyan)';
                }
                
                waves.forEach(w => w.style.display = 'none');
                realRings.forEach(r => {
                    r.style.display = 'block';
                    r.style.opacity = '1';
                });

                // Real packets traveling
                if (packR) {
                    packR.style.opacity = '1';
                    const run = (progress * 6) % 1.0;
                    packR.style.left = `${160 + run * 200}px`; 
                    packR.style.top = '293px';
                }
                if (packF) packF.style.opacity = '0';
            }
            else if (progress >= 0.35 && progress < 0.45) {
                // Phase 1b: Rogue tower starts emitting waves to override signal
                if (statusBadge) {
                    statusBadge.textContent = 'CẢNH BÁO: TRẠM GIẢ ĐANG PHÁT SÓNG ĐÈ';
                    statusBadge.className = 'v74-status-badge warning';
                }
                if (lineReal) {
                    lineReal.style.opacity = '1';
                    lineReal.style.strokeWidth = '4px';
                }
                if (lineFake) lineFake.style.opacity = '0';
                
                if (phone) {
                    phone.style.transform = 'translateX(-40px) scale(1)';
                    phone.style.borderColor = 'var(--v74-cyan)';
                    phone.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(6, 182, 212, 0.4)';
                }
                
                if (carrierName) carrierName.textContent = 'VinaPhone';
                if (barsIcon) {
                    barsIcon.textContent = '📶';
                    barsIcon.style.color = 'var(--v74-cyan)';
                }
                if (lockStatus) lockStatus.textContent = '🔒';
                if (connStatus) {
                    connStatus.textContent = 'SÓNG YẾU...';
                    connStatus.style.color = 'var(--v74-yellow)';
                }
                
                // Show rogue waves clashing
                waves.forEach(w => w.style.display = 'block');
                realRings.forEach(r => {
                    r.style.display = 'block';
                    r.style.opacity = '0.5'; // weakening
                });

                // Real packets traveling slower/fading
                if (packR) {
                    packR.style.opacity = '0.6';
                    const run = (progress * 6) % 1.0;
                    packR.style.left = `${160 + run * 200}px`; 
                    packR.style.top = '293px';
                }
                if (packF) packF.style.opacity = '0';
            }
            else if (progress >= 0.45 && progress < 0.55) {
                // Phase 2: Searching / Shaking transition
                if (statusBadge) {
                    statusBadge.textContent = 'CẢNH BÁO: ĐIỆN THOẠI BỊ MẤT TÍN HIỆU';
                    statusBadge.className = 'v74-status-badge warning';
                }
                const shake = (Math.floor(progress * 40) % 2 === 0) ? -6 : 6;
                if (phone) {
                    phone.style.transform = `translateX(${shake}px) scale(1.05)`;
                    phone.style.borderColor = 'var(--v74-yellow)';
                    phone.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(234, 179, 8, 0.4)';
                }
                
                if (carrierName) carrierName.textContent = 'Tìm mạng...';
                if (barsIcon) {
                    barsIcon.textContent = '📡';
                    barsIcon.style.color = 'var(--v74-yellow)';
                }
                if (lockStatus) lockStatus.textContent = '⚠️';
                if (connStatus) {
                    connStatus.textContent = 'MẤT KẾT NỐI';
                    connStatus.style.color = 'var(--v74-yellow)';
                }
                
                if (lineReal) lineReal.style.opacity = '0.2';
                if (lineFake) lineFake.style.opacity = '0.2';
                if (packR) packR.style.opacity = '0';
                if (packF) packF.style.opacity = '0';
                
                waves.forEach(w => w.style.display = 'block');
                realRings.forEach(r => r.style.display = 'none');
            }
            else {
                // Phase 3: Hijacked by Rogue Station (red alert)
                if (statusBadge) {
                    statusBadge.textContent = 'NGUY HIỂM: ĐÃ BỊ KẾT NỐI VÀO TRẠM GIẢ';
                    statusBadge.className = 'v74-status-badge danger';
                }
                if (lineReal) {
                    lineReal.style.opacity = '0';
                    if (lineFake) {
                        lineFake.style.opacity = '1';
                        lineFake.style.strokeWidth = '6px';
                    }
                }
                
                if (phone) {
                    phone.style.transform = 'translateX(60px) scale(1)';
                    phone.style.borderColor = 'var(--v74-red)';
                    phone.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(239, 68, 68, 0.5)';
                }
                
                if (carrierName) carrierName.textContent = 'Mạng lạ (GSM)';
                if (barsIcon) {
                    barsIcon.textContent = '📶';
                    barsIcon.style.color = 'var(--v74-red)';
                }
                if (lockStatus) lockStatus.textContent = '🔓';
                if (connStatus) {
                    connStatus.textContent = 'KẾT NỐI KHÔNG AN TOÀN';
                    connStatus.style.color = 'var(--v74-red)';
                }
                
                waves.forEach(w => w.style.display = 'block');
                realRings.forEach(r => r.style.display = 'none');

                // Fake packets traveling
                if (packR) packR.style.opacity = '0';
                if (packF) {
                    packF.style.opacity = '1';
                    const run = ((progress - 0.55) * 6) % 1.0;
                    packF.style.left = `${640 - run * 200}px`; // from fake tower (640) to phone (440)
                    packF.style.top = '293px'; // 300 - 7
                }
            }
        }
        else if (slideId === 'slide_sms_transmission') {
            const button = canvas.querySelector('#v74-btn-send');
            const cursor = canvas.querySelector('#v74-cursor-f');
            const packet = canvas.querySelector('#v74-sms-packet');
            const progressWrap = canvas.querySelector('#v74-btn-progress-wrap');
            const progressFill = canvas.querySelector('#v74-btn-progress-fill');

            // 1. Cursor moves to the button
            if (cursor) {
                if (progress < 0.3) {
                    cursor.style.opacity = '1';
                    cursor.style.transform = 'translate(100px, 120px)';
                } else if (progress >= 0.3 && progress < 0.45) {
                    const p = (progress - 0.3) / 0.15;
                    cursor.style.transform = `translate(${100 - p * 100}px, ${120 - p * 120}px)`; // moves to (0,0) center of button
                    cursor.style.opacity = '1';
                } else {
                    cursor.style.opacity = '0';
                }
            }

            // 2. Button clicks and progress bar loads
            if (button && progressFill && progressWrap) {
                if (progress >= 0.45 && progress < 0.65) {
                    button.classList.add('btn-active');
                    button.textContent = '[ INJECTING BROADCAST... ]';
                    progressWrap.style.display = 'block';
                    const loadP = (progress - 0.45) / 0.2; // 0% to 100%
                    progressFill.style.width = `${Math.min(100, loadP * 100)}%`;
                } else if (progress >= 0.65) {
                    button.classList.remove('btn-active');
                    button.textContent = '[ BROADCAST SUCCESSFUL ]';
                    progressWrap.style.display = 'block';
                    progressFill.style.width = '100%';
                } else {
                    button.classList.remove('btn-active');
                    button.textContent = '[ RUN BRANDNAME INJECTION ]';
                    progressWrap.style.display = 'none';
                    progressFill.style.width = '0%';
                }
            }

            // 3. SMS packet flies towards phone and fades out at the end
            if (packet) {
                if (progress >= 0.6) {
                    const p = (progress - 0.6) / 0.4; // scale to 1
                    let opacity = 1;
                    if (p > 0.7) {
                        opacity = Math.max(0, 1.0 - (p - 0.7) / 0.3); // Fade out to 0 in the last 30% of its trajectory
                    }
                    packet.style.opacity = opacity;
                    packet.style.transform = `translate(-50%, ${-100 - p * 450}px) scale(${0.6 + p * 0.5})`;
                } else {
                    packet.style.opacity = '0';
                    packet.style.transform = 'translate(-50%, -50%) scale(0.6)';
                }
            }
        }
        else if (slideId === 'slide_sms_grouping') {
            const cardIncoming = canvas.querySelector('#v74-comp-incoming');
            const cardTarget = canvas.querySelector('#v74-comp-target');
            const matchOk = canvas.querySelector('#v74-match-ok');
            const threadItem = canvas.querySelector('#v74-th-target');
            const threadTime = canvas.querySelector('#v74-th-time');
            const laserL = canvas.querySelector('#v74-laser-l');
            const laserR = canvas.querySelector('#v74-laser-r');

            // 1. Incoming card slides from left into the compare box
            if (cardIncoming) {
                if (progress < 0.15) {
                    cardIncoming.style.transform = 'translateX(-220px)';
                    cardIncoming.style.opacity = '0';
                } else if (progress >= 0.15 && progress < 0.45) {
                    const p = (progress - 0.15) / 0.3;
                    cardIncoming.style.transform = `translateX(${-220 + p * 220}px)`;
                    cardIncoming.style.opacity = '1';
                } else {
                    cardIncoming.style.transform = 'translateX(0)';
                    cardIncoming.style.opacity = '1';
                }
            }

            // 2. Connecting lasers glow during comparison
            if (laserL && laserR) {
                if (progress >= 0.35 && progress < 0.75) {
                    laserL.style.opacity = '1';
                    laserR.style.opacity = '1';
                } else {
                    laserL.style.opacity = '0';
                    laserR.style.opacity = '0';
                }
            }

            // 3. Matching OK box flashes and cards shake haptically
            if (matchOk) {
                if (progress >= 0.48 && progress < 0.8) {
                    matchOk.style.opacity = '1';
                    matchOk.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    
                    const shake = (Math.floor(progress * 50) % 2 === 0) ? -2 : 2;
                    if (cardIncoming) cardIncoming.style.transform = `translate(${shake}px, ${shake}px)`;
                    if (cardTarget) cardTarget.style.transform = `translate(${-shake}px, ${-shake}px)`;
                } else {
                    matchOk.style.opacity = '0';
                    matchOk.style.transform = 'translate(-50%, -50%) scale(0.6)';
                    if (cardIncoming && progress >= 0.45) cardIncoming.style.transform = 'translateX(0)';
                    if (cardTarget) cardTarget.style.transform = 'translate(0)';
                }
            }

            // 4. Thread list item gets highlighted
            if (threadItem) {
                if (progress >= 0.7) {
                    threadItem.classList.add('highlighted-item');
                    if (threadTime) {
                        threadTime.textContent = 'MỚI NHẬN';
                        threadTime.style.color = '#10b981';
                        threadTime.style.fontWeight = 'bold';
                    }
                } else {
                    threadItem.classList.remove('highlighted-item');
                    if (threadTime) {
                        threadTime.textContent = '10:30 AM';
                        threadTime.style.color = '#64748b';
                        threadTime.style.fontWeight = 'normal';
                    }
                }
            }
        }
        else if (slideId === 'slide_sms_prevention') {
            const hazardLine = canvas.querySelector('#v74-danger-line');
            const shieldRot = canvas.querySelector('#v74-shield-rot');
            const otpNum = canvas.querySelector('#v74-otp-num');
            const cursor = canvas.querySelector('#v74-app-cursor');
            const secureCol = canvas.querySelector('#v74-secure-col');
            const dangerCol = canvas.querySelector('#v74-danger-col');
            const confirmBtn = canvas.querySelector('#v74-app-btn-conf');

            // 1. Hazard cross line strikes SMS & danger background flashes
            if (hazardLine && dangerCol) {
                if (progress >= 0.3) {
                    hazardLine.style.opacity = '1';
                    dangerCol.classList.add('alert-active');
                } else {
                    hazardLine.style.opacity = '0';
                    dangerCol.classList.remove('alert-active');
                }
            }

            // 2. Smart OTP App animations (rotations)
            if (shieldRot) {
                const angle = progress * 360 * 2;
                shieldRot.style.transform = `rotateY(${angle}deg)`;
            }

            if (otpNum) {
                if (progress >= 0.5) {
                    otpNum.textContent = '495 028';
                    otpNum.style.color = '#10b981';
                    otpNum.style.textShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                } else {
                    otpNum.textContent = '******';
                    otpNum.style.color = '#fff';
                    otpNum.style.textShadow = 'none';
                }
            }

            // 3. User cursor finger clicks "Confirm App" button
            if (cursor) {
                if (progress >= 0.52 && progress < 0.72) {
                    const p = (progress - 0.52) / 0.2;
                    cursor.style.opacity = '1';
                    cursor.style.transform = `translate(${180 - p * 180}px, ${150 - p * 150}px)`; // moves to confirm button (adjusted for compact cards)
                } else if (progress >= 0.72 && progress < 0.85) {
                    cursor.style.opacity = '1';
                    cursor.style.transform = 'translate(0px, 0px) scale(0.95)'; // clicking
                } else {
                    cursor.style.opacity = '0';
                }
            }

            // 4. Secure Side background flashes green & button active glow
            if (secureCol && confirmBtn) {
                if (progress >= 0.72) {
                    secureCol.style.background = 'rgba(16, 185, 129, 0.08)';
                    secureCol.style.borderColor = 'var(--v74-green)';
                    confirmBtn.classList.add('btn-confirm-active');
                } else {
                    secureCol.style.background = 'rgba(15, 23, 42, 0.8)';
                    secureCol.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    confirmBtn.classList.remove('btn-confirm-active');
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video74',
        topic: 'Giả Mạo SMS Brandname',
        episodeNum: 73,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[video74 Plugin] Loaded: SMS Brandname Spoofing simulator with rich animations.');
})();
