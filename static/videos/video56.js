/**
 * Video 56: Read Receipt System Design Simulation
 * Plugin containing animations for Chat Clients, Database Write Amplification overload states,
 * Last Read Timestamp timeline sweeps, and WebSocket Fan-out network packet simulations.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_read_1: [
            { text: 'đã xem', start: 1.0, end: 5.5, class: 'active-blue' },
            { text: 'avatar nhỏ', start: 5.5, end: 10.0, class: 'active-blue' },
            { text: 'bài toán phân phối', start: 10.0, end: 14.5, class: 'active-gold' }
        ],
        slide_read_2: [
            { text: 'trạng thái', start: 1.5, end: 6.0, class: 'active-red' },
            { text: '100 lệnh update', start: 6.0, end: 11.5, class: 'active-red' },
            { text: 'quá tải', start: 11.5, end: 17.5, class: 'active-red' }
        ],
        slide_read_3: [
            { text: 'mốc thời gian đọc cuối cùng', start: 2.0, end: 7.5, class: 'active-green' },
            { text: '12 giờ 30 phút', start: 7.5, end: 12.0, class: 'active-blue' },
            { text: 'mặc định', start: 12.0, end: 17.0, class: 'active-green' }
        ],
        slide_read_4: [
            { text: 'websocket', start: 1.5, end: 6.5, class: 'active-blue' },
            { text: 'gói tin siêu nhẹ', start: 6.5, end: 11.5, class: 'active-green' },
            { text: 'dời avatar', start: 11.5, end: 16.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_read_1', 'slide_read_2', 'slide_read_3', 'slide_read_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // Wrap with layout container
    function sceneWrap(inner) {
        return `<div class="v56-zoom-container"><div class="v56-scene-content">${inner}</div></div>`;
    }

    // Helper: Linear interpolation for point on line segment
    function getPointOnLine(x1, y1, x2, y2, t) {
        return {
            x: x1 + (x2 - x1) * t,
            y: y1 + (y2 - y1) * t
        };
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_read_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v56-scene-row" style="height: 600px; width: 100%; display: flex; justify-content: center; align-items: center; position: relative;">
                    <!-- Ambient Background Blur circles -->
                    <div class="v56-bg-glow-circle c1"></div>
                    <div class="v56-bg-glow-circle c2"></div>

                    <!-- Radar rings behind phone -->
                    <div class="v56-radar-ring r1"></div>
                    <div class="v56-radar-ring r2"></div>
                    <div class="v56-radar-ring r3"></div>

                    <!-- Floating reaction particles -->
                    <span class="v56-particle p1">💬</span>
                    <span class="v56-particle p2">✔️</span>
                    <span class="v56-particle p3">✨</span>
                    <span class="v56-particle p4">💙</span>
                    <span class="v56-particle p5">👍</span>

                    <!-- Phone Chat Mockup Centered & Large -->
                    <div class="v56-phone-mockup-large">
                        <!-- Dynamic Island -->
                        <div class="v56-dynamic-island"></div>
                        
                        <!-- Status Bar -->
                        <div class="v56-phone-statusbar">
                            <span class="v56-phone-time">12:30</span>
                            <div style="display:flex; align-items:center; gap:3px;">
                                <!-- Cellular signal SVG -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
                                <!-- Wifi SVG -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M8.5 16.5c3.5-3.5 3.5-3.5 7 0"/><path d="M5 13c7-7 7-7 14 0"/><path d="M1.5 9.5c10.5-10.5 10.5-10.5 21 0"/></svg>
                                <!-- Battery SVG -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(90deg); margin-left:-2px;"><rect width="14" height="8" x="3" y="8" rx="1.5" ry="1.5"/><line x1="19" x2="19" y1="10" y2="14"/></svg>
                            </div>
                        </div>

                        <!-- App Navbar -->
                        <div class="v56-phone-navbar">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <i data-lucide="chevron-left" style="width:16px; height:16px; color:#38bdf8; cursor:pointer;"></i>
                                <div style="width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; overflow:hidden;">
                                    <img src="https://cdnmedia.baotintuc.vn/Upload/EqV5H9rWgvy9oNikwkHLXA/files/02102025-Cristiano-Ronaldo-1.png" style="width:100%; height:100%; object-fit:cover;" />
                                </div>
                                <div style="display:flex; flex-direction:column;">
                                    <span style="font-size:12.5px; font-weight:800; color:#fff; line-height:1;">Alice</span>
                                    <span style="font-size:9.5px; color:#22c55e; font-weight:600; margin-top:2px;">Online</span>
                                </div>
                            </div>
                            <div style="display:flex; gap:14px; color:#38bdf8; align-items:center;">
                                <i data-lucide="phone" style="width:14px; height:14px;"></i>
                                <i data-lucide="video" style="width:14px; height:14px;"></i>
                            </div>
                        </div>

                        <!-- Chat Feed -->
                        <div class="v56-chat-feed" id="s1-chat-feed">
                            <!-- Msg 1 (Alice) -->
                            <div class="v56-chat-bubble left visible">
                                Chào cả nhóm! Check file thiết kế hệ thống nhé.
                                <div style="font-size:7px; color:rgba(255,255,255,0.4); align-self:flex-end; margin-top:2px;">12:30</div>
                            </div>
                            
                            <!-- Msg 2 (Me) -->
                            <div class="v56-chat-bubble right visible">
                                Đã gửi bản nháp rồi đó.
                                <div style="font-size:7px; color:rgba(255,255,255,0.5); align-self:flex-end; display:flex; align-items:center; gap:2.5px; margin-top:2px;">
                                    12:30
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-single" style="color:rgba(255,255,255,0.5);"><path d="M20 6 9 17l-5-5"/></svg>
                                </div>
                            </div>

                            <!-- Typing Indicator (Alice) -->
                            <div class="v56-typing-bubble v56-hidden" id="s1-typing">
                                <div class="v56-typing-dot"></div>
                                <div class="v56-typing-dot"></div>
                                <div class="v56-typing-dot"></div>
                            </div>

                            <!-- Msg 3 (Alice) -->
                            <div class="v56-chat-bubble left v56-hidden" id="s1-msg-3">
                                Ủy ban duyệt dự án rồi nhé! 🎉
                                <div style="font-size:7px; color:rgba(255,255,255,0.4); align-self:flex-end; margin-top:2px;">12:31</div>
                            </div>

                            <!-- Msg 4 (Me) -->
                            <div class="v56-chat-bubble right v56-hidden" id="s1-msg-4">
                                Tuyệt vời! Bản thiết kế cuối cùng đây.
                                <div style="font-size:7px; color:rgba(255,255,255,0.5); align-self:flex-end; display:flex; align-items:center; gap:2.5px; margin-top:2px;">
                                    12:31
                                    <!-- Double tick elements integrated inside the time container -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" id="s1-check-single" style="color:rgba(255,255,255,0.5);"><path d="M20 6 9 17l-5-5"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" id="s1-check-double" style="display:none; color:#38bdf8;"><path d="m18 6-7 11-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                                </div>
                            </div>

                            <!-- Read Avatar Overlay -->
                            <div class="v56-read-status-wrapper" id="s1-read-badge">
                                <img src="https://cdnmedia.baotintuc.vn/Upload/EqV5H9rWgvy9oNikwkHLXA/files/02102025-Cristiano-Ronaldo-1.png" class="v56-read-avatar" />
                                <span class="v56-read-text">Đã xem 12:31</span>
                            </div>
                        </div>

                        <!-- Phone Input Bar -->
                        <div class="v56-phone-input-bar">
                            <i data-lucide="plus" style="width:14px; height:14px; color:#64748b;"></i>
                            <div class="v56-phone-input-field">Tin nhắn</div>
                            <i data-lucide="smile" style="width:14px; height:14px; color:#64748b;"></i>
                        </div>

                        <!-- Home Indicator Bar -->
                        <div class="v56-phone-home-bar"></div>
                    </div>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_read_2') {
            canvas.innerHTML = sceneWrap(`
                <div class="v56-scene-row">
                    <!-- Naive database table -->
                    <div class="v56-table-wrapper" id="s2-table-card">
                        <table class="v56-table">
                            <thead>
                                <tr>
                                    <th>Msg ID</th>
                                    <th>Sender</th>
                                    <th>Content</th>
                                    <th>State (Bob)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="s2-row-1">
                                    <td>#1001</td>
                                    <td>Alice</td>
                                    <td>Check file nhé</td>
                                    <td><span class="v56-badge read" id="s2-badge-1">Đã xem</span></td>
                                </tr>
                                <tr id="s2-row-2">
                                    <td>#1002</td>
                                    <td>Alice</td>
                                    <td>Gửi bản nháp rồi</td>
                                    <td><span class="v56-badge unread" id="s2-badge-2">Chưa đọc</span></td>
                                </tr>
                                <tr id="s2-row-3">
                                    <td>#1003</td>
                                    <td>Alice</td>
                                    <td>Kèm cả slide ảnh</td>
                                    <td><span class="v56-badge unread" id="s2-badge-3">Chưa đọc</span></td>
                                </tr>
                                <tr id="s2-row-4">
                                    <td>#1004</td>
                                    <td>Alice</td>
                                    <td>Xác nhận nhé!</td>
                                    <td><span class="v56-badge unread" id="s2-badge-4">Chưa đọc</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- DB performance monitor -->
                    <div class="v56-metric-card" id="s2-metric-card">
                        <div class="v56-metric-title">Database IOPS Load</div>
                        <div class="v56-metric-value normal" id="s2-cpu-val">2.5% CPU</div>
                        
                        <div style="font-family:monospace; font-size:9.5px; color:var(--read-text-muted); text-align:center; width:100%; border-top:1px solid #1e293b; padding-top:6px;" id="s2-log-panel">
                            UPDATE messages<br>SET is_read = true<br>WHERE id = 1002;
                        </div>

                        <div class="v56-progress-bar-wrapper">
                            <div class="v56-progress-bar-fill normal" id="s2-cpu-bar"></div>
                        </div>

                        <!-- Soundwave/Signal frequency visualization -->
                        <div class="v56-db-wave-container calm" id="s2-db-wave">
                            <div class="v56-db-wave-bar b1"></div>
                            <div class="v56-db-wave-bar b2"></div>
                            <div class="v56-db-wave-bar b3"></div>
                            <div class="v56-db-wave-bar b4"></div>
                            <div class="v56-db-wave-bar b5"></div>
                            <div class="v56-db-wave-bar b6"></div>
                            <div class="v56-db-wave-bar b7"></div>
                            <div class="v56-db-wave-bar b8"></div>
                            <div class="v56-db-wave-bar b9"></div>
                            <div class="v56-db-wave-bar b10"></div>
                        </div>
                    </div>
                </div>

                <div class="v56-glass-card glow-red">
                    <span class="v56-status-badge red"><i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> THẢM HỌA THIẾT KẾ</span>
                    <span style="color:#fff;" id="v56-s2-status">Cách tiếp cận ngây thơ: Cập nhật trạng thái từng tin nhắn riêng lẻ.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_read_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v56-scene-row" style="flex-direction:column; gap:12px; height:auto; justify-content: flex-start; align-items: stretch;">
                    
                    <div style="display:flex; gap:12px; align-items: stretch;">
                        <!-- Optimal Table -->
                        <div class="v56-table-wrapper-compact" style="flex:1.2; height:125px;">
                            <table class="v56-table">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Chat ID</th>
                                        <th>Last Read Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background:rgba(14, 165, 233, 0.05); border-left: 2px solid #0ea5e9;">
                                        <td style="color:#fff; padding-left: 8px;">Bob</td>
                                        <td style="color:#fff;">Group 1</td>
                                        <td style="color:#38bdf8; font-family:monospace; font-weight:700;" id="s3-db-time">12:30:00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 8px;">Alice</td>
                                        <td>Group 1</td>
                                        <td style="font-family:monospace;">12:28:40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- DB performance monitor -->
                        <div class="v56-metric-card-compact" style="flex:0.8; height:125px;">
                            <span class="v56-metric-title" style="font-size:9px; color:#94a3b8; font-weight:700;">DB WRITE IOPS</span>
                            <div style="display:flex; flex-direction:column; gap:2px;">
                                <span class="v56-metric-value normal" id="s3-cpu-val" style="font-size:18px; font-weight:800; color:#38bdf8; text-shadow:0 0 10px rgba(56, 189, 248, 0.2);">1.2% CPU</span>
                                <span style="font-size:8px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.3px; display:flex; align-items:center; gap:3px;">
                                    <i data-lucide="check-circle" style="width:10px; height:10px; color:#38bdf8;"></i> Normal Status
                                </span>
                            </div>
                            <div class="v56-progress-bar-wrapper" style="height:6px; border-radius:3px; margin:0; width:100%; border:none; background:rgba(255,255,255,0.05);">
                                <div class="v56-progress-bar-fill normal" id="s3-cpu-bar" style="width:3.6%; background:linear-gradient(90deg, #0ea5e9, #38bdf8); border-radius:3px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Timeline Sweep and Card List -->
                    <div class="v56-timeline-container">
                        <div class="v56-timeline-scale">
                            <div class="v56-timeline-tick" style="left:5%;"></div>
                            <div class="v56-timeline-tick-label" style="left:5%;">12:30:00</div>

                            <div class="v56-timeline-tick" style="left:35%;"></div>
                            <div class="v56-timeline-tick-label" style="left:35%;">12:30:05</div>

                            <div class="v56-timeline-tick" style="left:65%;"></div>
                            <div class="v56-timeline-tick-label" style="left:65%;">12:30:10</div>

                            <div class="v56-timeline-tick" style="left:95%;"></div>
                            <div class="v56-timeline-tick-label" style="left:95%;">12:30:15</div>

                            <div class="v56-timeline-cursor" id="s3-cursor" style="left: 5%;">
                                <div class="v56-timeline-cursor-label" id="s3-cursor-lbl">Bob: 12:30:00</div>
                            </div>
                        </div>

                        <!-- 4 Chat Message Cards -->
                        <div style="display:flex; gap:8px; width:100%; margin-top:4px;">
                            <!-- Message #1 -->
                            <div id="s3-msg-1" class="v56-msg-card">
                                <div style="display:flex; align-items:center; gap:5px;">
                                    <span style="width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#fff;">A</span>
                                    <span style="font-size:9px; font-weight:800; color:#e2e8f0;">Alice</span>
                                </div>
                                <div style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2; margin:2px 0;">"Check file nhé"</div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:7.5px; color:#64748b; font-family:monospace;">12:30:00</span>
                                    <span class="v56-msg-status-icon" style="color:#64748b; display:flex; align-items:center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-single"><path d="M20 6 9 17l-5-5"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-double" style="display:none;"><path d="m18 6-7 11-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                                    </span>
                                </div>
                            </div>
                            <!-- Message #2 -->
                            <div id="s3-msg-2" class="v56-msg-card">
                                <div style="display:flex; align-items:center; gap:5px;">
                                    <span style="width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#fff;">A</span>
                                    <span style="font-size:9px; font-weight:800; color:#e2e8f0;">Alice</span>
                                </div>
                                <div style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2; margin:2px 0;">"Gửi bản nháp rồi"</div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:7.5px; color:#64748b; font-family:monospace;">12:30:04</span>
                                    <span class="v56-msg-status-icon" style="color:#64748b; display:flex; align-items:center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-single"><path d="M20 6 9 17l-5-5"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-double" style="display:none;"><path d="m18 6-7 11-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                                    </span>
                                </div>
                            </div>
                            <!-- Message #3 (Voice Message) -->
                            <div id="s3-msg-3" class="v56-msg-card voice-msg">
                                <div style="display:flex; align-items:center; gap:5px;">
                                    <span style="width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#fff;">A</span>
                                    <span style="font-size:9px; font-weight:800; color:#e2e8f0;">Alice</span>
                                </div>
                                <div class="v56-voice-bubble-content">
                                    <button class="v56-voice-play-btn" style="pointer-events:none;">
                                        <svg class="v56-voice-play-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                                        <svg class="v56-voice-pause-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="display:none;"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>
                                    </button>
                                    <div class="v56-voice-waveform">
                                        <div class="v56-voice-bar h1"></div>
                                        <div class="v56-voice-bar h2"></div>
                                        <div class="v56-voice-bar h3"></div>
                                        <div class="v56-voice-bar h4"></div>
                                        <div class="v56-voice-bar h5"></div>
                                        <div class="v56-voice-bar h6"></div>
                                        <div class="v56-voice-bar h7"></div>
                                        <div class="v56-voice-bar h8"></div>
                                        <div class="v56-voice-bar h9"></div>
                                        <div class="v56-voice-bar h10"></div>
                                        <div class="v56-voice-bar h11"></div>
                                        <div class="v56-voice-bar h12"></div>
                                    </div>
                                    <span class="v56-voice-duration">0:12</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:7.5px; color:#64748b; font-family:monospace;">12:30:09</span>
                                    <span class="v56-msg-status-icon" style="color:#64748b; display:flex; align-items:center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-single"><path d="M20 6 9 17l-5-5"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-double" style="display:none;"><path d="m18 6-7 11-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                                    </span>
                                </div>
                            </div>
                            <!-- Message #4 -->
                            <div id="s3-msg-4" class="v56-msg-card">
                                <div style="display:flex; align-items:center; gap:5px;">
                                    <span style="width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#fff;">A</span>
                                    <span style="font-size:9px; font-weight:800; color:#e2e8f0;">Alice</span>
                                </div>
                                <div style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2; margin:2px 0;">"Xác nhận nhé!"</div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:7.5px; color:#64748b; font-family:monospace;">12:30:14</span>
                                    <span class="v56-msg-status-icon" style="color:#64748b; display:flex; align-items:center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-single"><path d="M20 6 9 17l-5-5"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="v56-check-double" style="display:none;"><path d="m18 6-7 11-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="v56-glass-card glow-sky" style="margin-top:10px;">
                    <span class="v56-status-badge sky"><i data-lucide="zap" style="width:12px;height:12px;"></i> LAST READ TIMESTAMP</span>
                    <span style="color:#fff;" id="v56-s3-status">Giải pháp tối ưu: Chỉ ghi nhận một mốc thời gian đọc cuối cùng cho mỗi user.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_read_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v56-scene-row">
                    <div class="v56-network-wrapper">
                        <!-- Connecting vector lines -->
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
                            <path id="s4-line-1" class="v56-net-line" d="M 88 120 L 284 120" />
                            <path id="s4-line-2" class="v56-net-line" d="M 356 120 L 552 54" />
                            <path id="s4-line-3" class="v56-net-line" d="M 356 120 L 552 120" />
                            <path id="s4-line-4" class="v56-net-line" d="M 356 120 L 552 186" />

                            <!-- Flowing packet circle icons -->
                            <circle id="s4-pack-in" class="v56-net-packet" r="5" style="opacity:0;" />
                            <circle id="s4-pack-out-1" class="v56-net-packet" r="5" style="opacity:0;" />
                            <circle id="s4-pack-out-2" class="v56-net-packet" r="5" style="opacity:0;" />
                            <circle id="s4-pack-out-3" class="v56-net-packet" r="5" style="opacity:0;" />
                        </svg>

                        <!-- Transmission signal ripples -->
                        <div class="v56-signal-ripple ripple1" id="s4-ripple-1"></div>
                        <div class="v56-signal-ripple ripple2" id="s4-ripple-2"></div>

                        <!-- Central Server Node -->
                        <div class="v56-hub-node" id="s4-hub">
                            <i data-lucide="server" style="width:18px; height:18px; margin-bottom:1px; color:#fff;"></i>
                            <span style="font-size:8px; font-weight:bold; letter-spacing:0.3px; text-transform:uppercase;">Hub</span>
                        </div>

                        <!-- Client nodes -->
                        <div class="v56-client-node reader" id="s4-client-reader">
                            <span style="font-size:8px; color:var(--read-text-muted); position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-weight:bold; white-space:nowrap; text-transform:uppercase;">Bob</span>
                            🧍
                        </div>
                        <div class="v56-client-node member1" id="s4-client-m1">
                            <span style="font-size:8px; color:var(--read-text-muted); position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-weight:bold; white-space:nowrap; text-transform:uppercase;">Alice</span>
                            👩
                        </div>
                        <div class="v56-client-node member2" id="s4-client-m2">
                            <span style="font-size:8px; color:var(--read-text-muted); position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-weight:bold; white-space:nowrap; text-transform:uppercase;">Charlie</span>
                            👨
                        </div>
                        <div class="v56-client-node member3" id="s4-client-m3">
                            <span style="font-size:8px; color:var(--read-text-muted); position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-weight:bold; white-space:nowrap; text-transform:uppercase;">David</span>
                            👦
                        </div>
                    </div>
                </div>

                <div class="v56-glass-card glow-sky">
                    <span class="v56-status-badge sky"><i data-lucide="activity" style="width:12px;height:12px;"></i> WEBSOCKET FAN-OUT</span>
                    <span style="color:#fff;" id="v56-s4-status">WebSocket Push: Server gửi mốc thời gian đọc cực nhẹ đến các thành viên đang online.</span>
                </div>
            `);
            initIcons();
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_read_1') {
            const typing = canvas.querySelector('#s1-typing');
            const msg3 = canvas.querySelector('#s1-msg-3');
            const msg4 = canvas.querySelector('#s1-msg-4');
            const singleCheck = canvas.querySelector('#s1-check-single');
            const doubleCheck = canvas.querySelector('#s1-check-double');
            const readBadge = canvas.querySelector('#s1-read-badge');

            // 0.0 to 0.08: Just Bob's message sent (Msg 1 & 2 visible, typing/3/4 hidden, single check)
            if (progress < 0.08) {
                if (typing) { typing.classList.remove('v56-visible'); typing.classList.add('v56-hidden'); }
                if (msg3) { msg3.classList.remove('v56-visible'); msg3.classList.add('v56-hidden'); }
                if (msg4) { msg4.classList.remove('v56-visible'); msg4.classList.add('v56-hidden'); }
                if (singleCheck) singleCheck.style.display = 'block';
                if (doubleCheck) doubleCheck.style.display = 'none';
                if (readBadge) readBadge.classList.remove('active');
            }
            // 0.08 to 0.16: Alice starts typing...
            else if (progress >= 0.08 && progress < 0.16) {
                if (typing) { typing.classList.remove('v56-hidden'); typing.classList.add('v56-visible'); }
                if (msg3) { msg3.classList.remove('v56-visible'); msg3.classList.add('v56-hidden'); }
                if (msg4) { msg4.classList.remove('v56-visible'); msg4.classList.add('v56-hidden'); }
                if (singleCheck) singleCheck.style.display = 'block';
                if (doubleCheck) doubleCheck.style.display = 'none';
                if (readBadge) readBadge.classList.remove('active');
            }
            // 0.16 to 0.26: Alice's message pops in ("Ủy ban duyệt dự án rồi nhé! 🎉"), typing stops
            else if (progress >= 0.16 && progress < 0.26) {
                if (typing) { typing.classList.remove('v56-visible'); typing.classList.add('v56-hidden'); }
                if (msg3) { msg3.classList.remove('v56-hidden'); msg3.classList.add('v56-visible'); }
                if (msg4) { msg4.classList.remove('v56-visible'); msg4.classList.add('v56-hidden'); }
                if (singleCheck) singleCheck.style.display = 'block';
                if (doubleCheck) doubleCheck.style.display = 'none';
                if (readBadge) readBadge.classList.remove('active');
            }
            // 0.26 to 0.35: Bob sends final message (Msg 4 pops in, single check)
            else if (progress >= 0.26 && progress < 0.35) {
                if (typing) { typing.classList.remove('v56-visible'); typing.classList.add('v56-hidden'); }
                if (msg3) { msg3.classList.remove('v56-hidden'); msg3.classList.add('v56-visible'); }
                if (msg4) { msg4.classList.remove('v56-hidden'); msg4.classList.add('v56-visible'); }
                if (singleCheck) singleCheck.style.display = 'block';
                if (doubleCheck) doubleCheck.style.display = 'none';
                if (readBadge) readBadge.classList.remove('active');
            }
            // 0.35 to 0.42: Single check changes to Double check (blue)
            else if (progress >= 0.35 && progress < 0.42) {
                if (typing) { typing.classList.remove('v56-visible'); typing.classList.add('v56-hidden'); }
                if (msg3) { msg3.classList.remove('v56-hidden'); msg3.classList.add('v56-visible'); }
                if (msg4) { msg4.classList.remove('v56-hidden'); msg4.classList.add('v56-visible'); }
                if (singleCheck) singleCheck.style.display = 'none';
                if (doubleCheck) doubleCheck.style.display = 'block';
                if (readBadge) readBadge.classList.remove('active');
            }
            // 0.42 to 1.0: Alice's read badge slides & pops in under Bob's message (completes very early)
            else {
                if (typing) { typing.classList.remove('v56-visible'); typing.classList.add('v56-hidden'); }
                if (msg3) { msg3.classList.remove('v56-hidden'); msg3.classList.add('v56-visible'); }
                if (msg4) { msg4.classList.remove('v56-hidden'); msg4.classList.add('v56-visible'); }
                if (singleCheck) singleCheck.style.display = 'none';
                if (doubleCheck) doubleCheck.style.display = 'block';
                if (readBadge) readBadge.classList.add('active');
            }
        }
        else if (slideId === 'slide_read_2') {
            const tableCard = canvas.querySelector('#s2-table-card');
            const cpuBar = canvas.querySelector('#s2-cpu-bar');
            const cpuVal = canvas.querySelector('#s2-cpu-val');
            const logPanel = canvas.querySelector('#s2-log-panel');
            const statusText = canvas.querySelector('#v56-s2-status');
            const dbWave = canvas.querySelector('#s2-db-wave');

            const badge2 = canvas.querySelector('#s2-badge-2');
            const badge3 = canvas.querySelector('#s2-badge-3');
            const badge4 = canvas.querySelector('#s2-badge-4');

            const row1 = canvas.querySelector('#s2-row-1');
            const row2 = canvas.querySelector('#s2-row-2');
            const row3 = canvas.querySelector('#s2-row-3');
            const row4 = canvas.querySelector('#s2-row-4');

            // Reset
            if (row1) row1.className = '';
            if (row2) row2.className = '';
            if (row3) row3.className = '';
            if (row4) row4.className = '';

            if (badge2) { badge2.className = 'v56-badge unread'; badge2.textContent = 'Chưa đọc'; }
            if (badge3) { badge3.className = 'v56-badge unread'; badge3.textContent = 'Chưa đọc'; }
            if (badge4) { badge4.className = 'v56-badge unread'; badge4.textContent = 'Chưa đọc'; }

            if (progress <= 0.25) {
                // Flash row 2
                if (row2) row2.className = 'flash-red';
                if (cpuBar) { cpuBar.className = 'v56-progress-bar-fill normal'; cpuBar.style.width = '15%'; }
                if (cpuVal) { cpuVal.className = 'v56-metric-value normal'; cpuVal.textContent = '15.4% CPU'; }
                if (logPanel) logPanel.innerHTML = 'UPDATE messages<br>SET is_read = true<br>WHERE id = 1002;';
                if (tableCard) tableCard.classList.remove('v56-table-shake-active');
                if (statusText) statusText.textContent = 'Bob đọc tin nhắn #1002. Hệ thống thực hiện câu lệnh UPDATE trạng thái dòng này.';
                if (dbWave) dbWave.className = 'v56-db-wave-container calm';
            }
            else if (progress > 0.25 && progress <= 0.5) {
                if (badge2) { badge2.className = 'v56-badge read'; badge2.textContent = 'Đã xem'; }
                // Flash row 3
                if (row3) row3.className = 'flash-red';
                if (cpuBar) { cpuBar.className = 'v56-progress-bar-fill normal'; cpuBar.style.width = '42%'; }
                if (cpuVal) { cpuVal.className = 'v56-metric-value normal'; cpuVal.textContent = '42.8% CPU'; }
                if (logPanel) logPanel.innerHTML = 'UPDATE messages<br>SET is_read = true<br>WHERE id = 1003;';
                if (tableCard) tableCard.classList.remove('v56-table-shake-active');
                if (statusText) statusText.textContent = 'Bob tiếp tục đọc tin #1003. Lệnh UPDATE thứ hai được gửi trực tiếp xuống Database.';
                if (dbWave) dbWave.className = 'v56-db-wave-container active';
            }
            else if (progress > 0.5 && progress <= 0.75) {
                if (badge2) { badge2.className = 'v56-badge read'; badge2.textContent = 'Đã xem'; }
                if (badge3) { badge3.className = 'v56-badge read'; badge3.textContent = 'Đã xem'; }
                // Flash row 4
                if (row4) row4.className = 'flash-red';
                if (cpuBar) { cpuBar.className = 'v56-progress-bar-fill danger'; cpuBar.style.width = '78%'; }
                if (cpuVal) { cpuVal.className = 'v56-metric-value danger'; cpuVal.textContent = '78.2% CPU'; }
                if (logPanel) logPanel.innerHTML = 'UPDATE messages<br>SET is_read = true<br>WHERE id = 1004;';
                if (tableCard) tableCard.classList.add('v56-table-shake-active');
                if (statusText) statusText.textContent = 'Khi số lượng tin nhắn và số lượng thành viên nhóm tăng lên, lượng update nhân gấp bội.';
                if (dbWave) dbWave.className = 'v56-db-wave-container overload';
            }
            else {
                if (badge2) { badge2.className = 'v56-badge read'; badge2.textContent = 'Đã xem'; }
                if (badge3) { badge3.className = 'v56-badge read'; badge3.textContent = 'Đã xem'; }
                if (badge4) { badge4.className = 'v56-badge read'; badge4.textContent = 'Đã xem'; }

                if (row2) row2.className = 'flash-red';
                if (row3) row3.className = 'flash-red';
                if (row4) row4.className = 'flash-red';

                if (cpuBar) { cpuBar.className = 'v56-progress-bar-fill danger'; cpuBar.style.width = '99%'; }
                if (cpuVal) { cpuVal.className = 'v56-metric-value danger'; cpuVal.textContent = '99.5% CPU'; }
                if (logPanel) logPanel.innerHTML = '!!! DETECTED WRITE LOCKS !!!<br>Database Write IOPS saturated!<br>Connection pool exhausted.';
                if (tableCard) tableCard.classList.add('v56-table-shake-active');
                if (statusText) statusText.textContent = 'BÙM! Database bị khóa ghi (Write Lock), CPU vọt lên 99%, hệ thống nghẽn hoàn toàn!';
                if (dbWave) dbWave.className = 'v56-db-wave-container overload';
            }
        }
        else if (slideId === 'slide_read_3') {
            const cursor = canvas.querySelector('#s3-cursor');
            const cursorLbl = canvas.querySelector('#s3-cursor-lbl');
            const dbTime = canvas.querySelector('#s3-db-time');

            const m1 = canvas.querySelector('#s3-msg-1');
            const m2 = canvas.querySelector('#s3-msg-2');
            const m3 = canvas.querySelector('#s3-msg-3');
            const m4 = canvas.querySelector('#s3-msg-4');

            // Timeline sweep coordinates (between 5% and 95%)
            const startPct = 5;
            const endPct = 95;
            const currentPct = startPct + progress * (endPct - startPct);

            if (cursor) cursor.style.left = `${currentPct}%`;

            // Calculate timestamp based on progress
            // 12:30:00 to 12:30:15
            const totalSeconds = Math.min(15, Math.floor(progress * 15));
            const secondsStr = totalSeconds < 10 ? `0${totalSeconds}` : `${totalSeconds}`;
            const timeStr = `12:30:${secondsStr}`;

            if (cursorLbl) cursorLbl.textContent = `Bob: ${timeStr}`;
            if (dbTime) dbTime.textContent = timeStr;

            // Fluctuate CPU value slightly
            const cpuValEl = canvas.querySelector('#s3-cpu-val');
            const cpuBarEl = canvas.querySelector('#s3-cpu-bar');
            if (cpuValEl && cpuBarEl) {
                const baseCpu = 1.2;
                const variance = Math.sin(progress * Math.PI * 6) * 0.15;
                const currentCpu = Math.max(0.8, baseCpu + variance);
                cpuValEl.textContent = `${currentCpu.toFixed(1)}% CPU`;
                cpuBarEl.style.width = `${currentCpu * 3}%`;
            }

            // Cell flash logic when read message updates
            const currentReadCount = totalSeconds >= 14 ? 4 : (totalSeconds >= 9 ? 3 : (totalSeconds >= 4 ? 2 : 1));
            const oldReadCount = parseInt(canvas.dataset.lastReadCount || '0', 10);
            if (currentReadCount !== oldReadCount) {
                canvas.dataset.lastReadCount = currentReadCount.toString();
                if (dbTime) {
                    dbTime.classList.remove('v56-cell-flash');
                    void dbTime.offsetWidth; // trigger reflow
                    dbTime.classList.add('v56-cell-flash');
                }
            }

            // Reset and set card active states
            const resetMsgCard = (el) => {
                el.classList.remove('read');
                const singleCheck = el.querySelector('.v56-check-single');
                const doubleCheck = el.querySelector('.v56-check-double');
                if (singleCheck) singleCheck.style.display = 'block';
                if (doubleCheck) doubleCheck.style.display = 'none';
            };
            const setReadMsgCard = (el) => {
                el.classList.add('read');
                const singleCheck = el.querySelector('.v56-check-single');
                const doubleCheck = el.querySelector('.v56-check-double');
                if (singleCheck) singleCheck.style.display = 'none';
                if (doubleCheck) doubleCheck.style.display = 'block';
            };

            if (m1) resetMsgCard(m1);
            if (m2) resetMsgCard(m2);
            if (m3) resetMsgCard(m3);
            if (m4) resetMsgCard(m4);

            // Message Sent times: msg1=0s, msg2=4s, msg3=9s, msg4=14s
            if (totalSeconds >= 0) { if (m1) setReadMsgCard(m1); }
            if (totalSeconds >= 4) { if (m2) setReadMsgCard(m2); }
            if (totalSeconds >= 9) {
                if (m3) {
                    setReadMsgCard(m3);
                    m3.classList.add('playing');
                }
            } else {
                if (m3) {
                    m3.classList.remove('playing');
                }
            }
            if (totalSeconds >= 14) { if (m4) setReadMsgCard(m4); }
        }
        else if (slideId === 'slide_read_4') {
            const packIn = canvas.querySelector('#s4-pack-in');
            const packOut1 = canvas.querySelector('#s4-pack-out-1');
            const packOut2 = canvas.querySelector('#s4-pack-out-2');
            const packOut3 = canvas.querySelector('#s4-pack-out-3');

            const line1 = canvas.querySelector('#s4-line-1');
            const line2 = canvas.querySelector('#s4-line-2');
            const line3 = canvas.querySelector('#s4-line-3');
            const line4 = canvas.querySelector('#s4-line-4');

            const hub = canvas.querySelector('#s4-hub');
            const clientReader = canvas.querySelector('#s4-client-reader');
            const clientM1 = canvas.querySelector('#s4-client-m1');
            const clientM2 = canvas.querySelector('#s4-client-m2');
            const clientM3 = canvas.querySelector('#s4-client-m3');

            const rip1 = canvas.querySelector('#s4-ripple-1');
            const rip2 = canvas.querySelector('#s4-ripple-2');

            // Reset active states
            if (line1) line1.setAttribute('class', 'v56-net-line');
            if (line2) line2.setAttribute('class', 'v56-net-line');
            if (line3) line3.setAttribute('class', 'v56-net-line');
            if (line4) line4.setAttribute('class', 'v56-net-line');

            if (hub) hub.className = 'v56-hub-node';
            if (clientReader) clientReader.className = 'v56-client-node reader';
            if (clientM1) clientM1.className = 'v56-client-node member1';
            if (clientM2) clientM2.className = 'v56-client-node member2';
            if (clientM3) clientM3.className = 'v56-client-node member3';

            if (packIn) packIn.style.opacity = '0';
            if (packOut1) packOut1.style.opacity = '0';
            if (packOut2) packOut2.style.opacity = '0';
            if (packOut3) packOut3.style.opacity = '0';

            if (progress > 0.5) {
                if (rip1) rip1.classList.add('active');
                if (rip2) rip2.classList.add('active');
            } else {
                if (rip1) rip1.classList.remove('active');
                if (rip2) rip2.classList.remove('active');
            }

            // Segment 1: Bob reads message, packet flows from Bob to Server Hub (0.0 to 0.35)
            if (progress <= 0.35) {
                const t = progress / 0.35;
                if (clientReader) clientReader.className = 'v56-client-node reader active';
                if (line1) line1.setAttribute('class', 'v56-net-line active');

                const pt = getPointOnLine(88, 120, 284, 120, t);
                if (packIn) {
                    packIn.setAttribute('cx', pt.x.toString());
                    packIn.setAttribute('cy', pt.y.toString());
                    packIn.style.opacity = '0.95';
                }
            }
            // Segment 2: Server Hub processing, flashing (0.35 to 0.5)
            else if (progress > 0.35 && progress <= 0.5) {
                if (hub) hub.className = 'v56-hub-node active';
                if (line1) line1.setAttribute('class', 'v56-net-line active');
            }
            // Segment 3: Server Hub fan-out push to recipients (0.5 to 0.85)
            else if (progress > 0.5 && progress <= 0.85) {
                const t = (progress - 0.5) / 0.35;
                if (hub) hub.className = 'v56-hub-node active';
                if (line2) line2.setAttribute('class', 'v56-net-line active');
                if (line3) line3.setAttribute('class', 'v56-net-line active');
                if (line4) line4.setAttribute('class', 'v56-net-line active');

                const pt1 = getPointOnLine(356, 120, 552, 54, t);
                const pt2 = getPointOnLine(356, 120, 552, 120, t);
                const pt3 = getPointOnLine(356, 120, 552, 186, t);

                if (packOut1) { packOut1.setAttribute('cx', pt1.x.toString()); packOut1.setAttribute('cy', pt1.y.toString()); packOut1.style.opacity = '0.95'; }
                if (packOut2) { packOut2.setAttribute('cx', pt2.x.toString()); packOut2.setAttribute('cy', pt2.y.toString()); packOut2.style.opacity = '0.95'; }
                if (packOut3) { packOut3.setAttribute('cx', pt3.x.toString()); packOut3.setAttribute('cy', pt3.y.toString()); packOut3.style.opacity = '0.95'; }
            }
            // Segment 4: Recipients render read indicator (0.85 to 1.0)
            else {
                if (hub) hub.className = 'v56-hub-node active';
                if (clientM1) clientM1.className = 'v56-client-node member1 active';
                if (clientM2) clientM2.className = 'v56-client-node member2 active';
                if (clientM3) clientM3.className = 'v56-client-node member3 active';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video56',
        topic: 'Read Receipt',
        episodeNum: 56,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video56 Plugin] Loaded: Read Receipt System Design slides registered.');
})();
