/**
 * Video 23: Messenger Chat Typing Indicator System
 * Plugin file - chứa toàn bộ slide animation/HTML cho video23
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_typing_1: [],
        slide_typing_2: [
            { text: 'http polling', start: 4.0, end: 14.0, class: 'active-bad' },
            { text: 'kết nối websocket', start: 14.0, end: 25.0, class: 'active-good' }
        ],
        slide_typing_3: [
            { text: 'event websocket', start: 4.0, end: 14.0, class: 'active-gold' },
            { text: 'nghẽn băng thông', start: 14.0, end: 24.5, class: 'active-bad' }
        ],
        slide_typing_4: [
            { text: 'debounce', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'khoảng trễ', start: 14.0, end: 25.5, class: 'active-gold' }
        ],
        slide_typing_5: [
            { text: 'redis pub/sub', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'phát sóng sự kiện', start: 14.0, end: 25.0, class: 'active-gold' }
        ],
        slide_typing_6: [
            { text: 'trải nghiệm mượt mà', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'hiệu năng cao', start: 14.0, end: 24.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_typing_1', 'slide_typing_2', 'slide_typing_3', 
        'slide_typing_4', 'slide_typing_5'
    ];

    // Helper to calculate coordinates along a cubic bezier curve
    function getCubicBezier(t, p0, p1, p2, p3) {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
        return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
    }

    // Helper to generate keyboard layouts for mockup
    function makeKeyboardHTML() {
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];
        let html = `<div style="display:flex; flex-direction:column; gap:4px; width:100%; padding:4px; box-sizing:border-box; background:#1c1d22; border-top:1px solid rgba(255,255,255,0.1);">`;
        rows.forEach((row, rIdx) => {
            html += `<div style="display:flex; justify-content:center; gap:4px;">`;
            row.forEach((key) => {
                html += `<div class="kb-key key-${key}" style="flex:1; max-width:22px; height:28px; border-radius:4px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.05); color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-family:sans-serif; font-weight:bold; transition:all 0.1s;">${key}</div>`;
            });
            html += `</div>`;
        });
        // Spacebar row
        html += `
            <div style="display:flex; justify-content:center; gap:4px; margin-top:2px;">
                <div class="kb-key key-space" style="width:130px; height:28px; border-radius:4px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:#888; font-size:10px; font-family:sans-serif; transition:all 0.1s;">space</div>
            </div>
        </div>`;
        return html;
    }

    const stormLogs = [
        { p: 0.00, text: '[SYSTEM] Init WebSocket Server...', type: 'sys' },
        { p: 0.05, text: '[SYSTEM] Port 8080 listening...', type: 'sys' },
        { p: 0.15, text: '[WS] Client connected: user_a', type: 'info' },
        { p: 0.17, text: '[WS] RECV: {"type":"typing"} (12ms)', type: 'info' },
        { p: 0.20, text: '[WS] RECV: {"type":"typing"} (14ms)', type: 'info' },
        { p: 0.23, text: '[WS] RECV: {"type":"typing"} (11ms)', type: 'info' },
        { p: 0.26, text: '[WS] RECV: {"type":"typing"} (15ms)', type: 'info' },
        { p: 0.29, text: '[WS] RECV: {"type":"typing"} (10ms)', type: 'info' },
        { p: 0.32, text: '[WS] RECV: {"type":"typing"} (12ms)', type: 'info' },
        { p: 0.35, text: '[WARN] High frequency from client_a', type: 'warn' },
        { p: 0.38, text: '[WS] RECV: {"type":"typing"} (10ms)', type: 'info' },
        { p: 0.42, text: '[WS] RECV: {"type":"typing"} (14ms)', type: 'info' },
        { p: 0.45, text: '[WARN] CPU Usage: 89%', type: 'warn' },
        { p: 0.48, text: '[WS] RECV: {"type":"typing"} (15ms)', type: 'info' },
        { p: 0.52, text: '[WARN] WebSocket queue size: 1024', type: 'warn' },
        { p: 0.55, text: '[WS] RECV: {"type":"typing"} (16ms)', type: 'info' },
        { p: 0.58, text: '[CRITICAL] Buffer Overflow!', type: 'err' },
        { p: 0.62, text: '[CRITICAL] Dropping connections: user_a', type: 'err' },
        { p: 0.65, text: '[CRITICAL] Out of Memory: process crashed', type: 'err' },
        { p: 0.70, text: '[SYSTEM] Core dumped.', type: 'err' },
        { p: 0.75, text: '[SYSTEM] Restarting engine...', type: 'sys' },
        { p: 0.82, text: '[SYSTEM] Recovery completed.', type: 'sys' },
        { p: 0.88, text: '[SYSTEM] Port 8080 listening...', type: 'sys' }
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_typing_1') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                    <!-- Absolute relative board workspace -->
                    <div style="position:relative; width:840px; height:410px;">
                        
                        <!-- Connection flow lines SVG -->
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="flow-svg-s1">
                            <!-- Curve Phone A -> Server -->
                            <path d="M 240 205 C 300 205, 325 155, 385 155" stroke="rgba(0,132,255,0.15)" stroke-width="3" fill="none" class="path-a"></path>
                            <!-- Curve Server -> Phone B -->
                            <path d="M 455 155 C 515 155, 540 205, 600 205" stroke="rgba(0,132,255,0.15)" stroke-width="3" fill="none" class="path-b"></path>
                        </svg>

                        <!-- Dynamic flowing packets container -->
                        <div class="s1-packet-canvas" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>

                        <!-- Left phone (Sender User A) -->
                        <div class="glass-card" style="position:absolute; left:10px; top:0; width:230px; height:410px; border-radius:24px; border:2px solid rgba(255,255,255,0.15); background:#0c0f17; box-shadow:0 15px 35px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; z-index:3;">
                            <div style="height:32px; background:#181c25; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-size:11px; color:#aaa; font-weight:bold; letter-spacing:0.5px;">
                                👤 USER A (Đang nhắn)
                            </div>
                            <!-- Chat box area -->
                            <div class="chat-box-a" style="flex:1; padding:12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto; box-sizing:border-box; background:rgba(0,0,0,0.15);">
                                <div style="align-self:flex-start; background:#242526; color:#fff; padding:6px 12px; border-radius:14px; font-size:12px; font-family:sans-serif;">Alo bạn ơi, có đó không?</div>
                                <div style="align-self:flex-end; background:#0084ff; color:#fff; padding:6px 12px; border-radius:14px; font-size:12px; font-family:sans-serif; margin-top:10px;">Có nha, đang định hỏi cái này...</div>
                            </div>
                            <!-- Bottom keyboard input -->
                            <div>
                                <div style="padding:6px 10px; background:#181c25; display:flex; align-items:center; gap:8px;">
                                    <div class="input-display-a" style="flex:1; height:24px; border-radius:12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:#fff; font-size:11px; font-family:sans-serif; display:flex; align-items:center; padding:0 8px; overflow:hidden; white-space:nowrap;"></div>
                                    <i data-lucide="send" style="width:14px; height:14px; color:#0084ff;"></i>
                                </div>
                                ${makeKeyboardHTML()}
                            </div>
                        </div>

                        <!-- Central Server Box -->
                        <div style="position:absolute; left:360px; top:120px; width:120px; display:flex; flex-direction:column; align-items:center; gap:10px; z-index:3;">
                            <div class="server-node" style="width:70px; height:70px; border-radius:18px; border:2px solid rgba(0, 132, 255, 0.4); background:#111625; display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(0,132,255,0.25); transition:all 0.3s;">
                                <i data-lucide="server" style="width:32px; height:32px; color:#0084ff;" class="server-icon-pulse"></i>
                            </div>
                            <span style="font-family:monospace; font-size:11px; color:#0084ff; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase;">Chat Server</span>
                        </div>

                        <!-- Right phone (Receiver User B) -->
                        <div class="glass-card" style="position:absolute; left:600px; top:0; width:230px; height:410px; border-radius:24px; border:2px solid rgba(255,255,255,0.15); background:#0c0f17; box-shadow:0 15px 35px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; z-index:3;">
                            <div style="height:32px; background:#181c25; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-size:11px; color:#aaa; font-weight:bold; letter-spacing:0.5px;">
                                👤 USER B (Người nhận)
                            </div>
                            <!-- Chat box area -->
                            <div class="chat-box-b" style="flex:1; padding:12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto; box-sizing:border-box; background:rgba(0,0,0,0.15); position:relative;">
                                <div style="align-self:flex-end; background:#0084ff; color:#fff; padding:6px 12px; border-radius:14px; font-size:12px; font-family:sans-serif;">Alo bạn ơi, có đó không?</div>
                                <div style="align-self:flex-start; background:#242526; color:#fff; padding:6px 12px; border-radius:14px; font-size:12px; font-family:sans-serif; margin-top:10px;">Có nha, đang định hỏi cái này...</div>
                                
                                <!-- Typing Indicator bubble -->
                                <div class="typing-indicator-bubble" style="align-self:flex-start; background:#242526; padding:8px 14px; border-radius:18px; display:none; align-items:center; gap:4px; margin-top:8px; opacity:0; transition:all 0.3s; box-shadow:0 3px 8px rgba(0,0,0,0.25);">
                                    <div class="typing-dot"></div>
                                    <div class="typing-dot"></div>
                                    <div class="typing-dot"></div>
                                </div>
                            </div>
                            <!-- Fake input bottom -->
                            <div style="padding:10px; background:#181c25; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.08);">
                                <div style="flex:1; height:24px; border-radius:12px; background:rgba(255,255,255,0.05); font-size:11px; color:rgba(255,255,255,0.3); display:flex; align-items:center; padding:0 10px; font-family:sans-serif;">Nhập tin nhắn...</div>
                                <i data-lucide="image" style="width:14px; height:14px; color:#aaa; margin-left:8px;"></i>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_typing_2') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    <!-- Protocols Comparison -->
                    <div class="glass-card cyber-grid" style="width:100%; max-width:860px; height:450px; padding:24px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                        
                        <!-- Header slot -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                            <div style="font-size:22px; font-weight:bold; color:var(--gold-primary);">Kết Nối Thời Gian Thực: HTTP Polling vs WebSocket</div>
                            <div style="font-size:13px; background:rgba(245,158,11,0.12); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">COMPARE SCHEMES</div>
                        </div>

                        <!-- Visual lanes container -->
                        <div style="position:relative; width:800px; height:320px; margin:10px auto 0 auto;">
                            
                            <!-- HTTP POLLING LANE (TOP) -->
                            <div style="position:absolute; left:0; top:15px; width:100%; height:120px; border-radius:16px; border:1.5px dashed rgba(239,68,68,0.2); background:rgba(239,68,68,0.01); box-sizing:border-box; padding:10px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                                    <span style="font-size:13px; font-weight:bold; color:#ef4444; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.5px;">1. HTTP Long/Short Polling (Thô sơ, lãng phí)</span>
                                    <span style="font-size:12px; font-family:monospace; color:#ef4444;" class="polling-stats">Requests: 0</span>
                                </div>
                                
                                <div style="position:relative; height:60px; width:100%;">
                                    <!-- Browser -->
                                    <div style="position:absolute; left:20px; top:12px; width:70px; height:36px; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.05); display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-family:sans-serif; font-weight:bold;">Browser</div>
                                    
                                    <!-- Server -->
                                    <div class="polling-server-node" style="position:absolute; left:420px; top:12px; width:70px; height:36px; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.05); display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-family:sans-serif; font-weight:bold; transition:all 0.2s;">Server</div>
                                    
                                    <!-- Database cylinder node -->
                                    <div class="polling-db-node" style="position:absolute; left:680px; top:10px; width:75px; height:40px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:#12131a; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; transition:all 0.2s;">
                                        <i data-lucide="database" style="width:16px; height:16px; color:#aaa; margin-bottom:2px;" class="db-icon"></i>
                                        <span style="font-size:8px; font-family:monospace; color:#aaa; font-weight:bold;">DATABASE</span>
                                    </div>

                                    <!-- SVG Paths for connection -->
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="polling-svg">
                                        <!-- Browser -> Server line -->
                                        <path d="M 90 30 L 420 30" stroke="rgba(239,68,68,0.15)" stroke-width="2" stroke-dasharray="4,4" fill="none"></path>
                                        <!-- Server -> DB line -->
                                        <path d="M 490 30 L 680 30" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="3,3" fill="none"></path>
                                    </svg>

                                    <!-- Container for flying query packets -->
                                    <div class="polling-packet-container" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>
                                </div>
                            </div>

                            <!-- WEBSOCKET LANE (BOTTOM) -->
                            <div style="position:absolute; left:0; top:165px; width:100%; height:120px; border-radius:16px; border:1.5px dashed rgba(16,185,129,0.25); background:rgba(16,185,129,0.01); box-sizing:border-box; padding:10px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                                    <span style="font-size:13px; font-weight:bold; color:#10b981; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.5px;">2. WebSocket Connection (Duy trì duy nhất, cực nhẹ)</span>
                                    <span style="font-size:12px; font-family:monospace; color:#10b981;" class="websocket-stats">Persistent Pipe: Active</span>
                                </div>
                                <div style="position:relative; height:60px; width:100%;">
                                    <!-- Browser -->
                                    <div style="position:absolute; left:20px; top:12px; width:70px; height:36px; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.05); display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-family:sans-serif; font-weight:bold;">Browser</div>
                                    
                                    <!-- Thick persistent green WebSocket pipe -->
                                    <div style="position:absolute; left:90px; top:28px; width:330px; height:6px; background:linear-gradient(90deg, rgba(16,185,129,0.4), rgba(5,150,105,0.4)); box-shadow:0 0 10px rgba(16,185,129,0.2); border-radius:3px;" class="ws-pipe"></div>
                                    
                                    <!-- Server -->
                                    <div class="ws-server-node" style="position:absolute; left:420px; top:12px; width:70px; height:36px; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.05); display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-family:sans-serif; font-weight:bold; transition:all 0.2s;">Server</div>

                                    <!-- Packet Container -->
                                    <div class="ws-packet-container" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_typing_3') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    <!-- WebSocket Flood Overload -->
                    <div class="glass-card cyber-grid alarm-container" style="width:100%; max-width:860px; height:450px; padding:24px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; transition:background 0.3s;">
                        
                        <!-- Header -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                            <div style="font-size:22px; font-weight:bold; color:var(--gold-primary);">Lỗi Gửi Quá Tải: Bão Sự Kiện (Event Storm Flood)</div>
                            <div style="font-size:12px; background:rgba(239,68,68,0.15); padding:2px 10px; border-radius:6px; color:#ef4444; font-family:monospace; font-weight:bold; animation:pulse 1s infinite;" class="alarm-label">ALARM: OVERFLOW</div>
                        </div>

                        <!-- Absolute visual container -->
                        <div style="position:relative; width:800px; height:320px; margin:10px auto 0 auto; overflow:hidden;">
                            
                            <!-- Left: Active Keyboard typing storm -->
                            <div style="position:absolute; left:20px; top:50px; width:220px; display:flex; flex-direction:column; align-items:center; gap:10px;">
                                <div style="width:100%; padding:10px; background:#181c25; border-radius:14px; border:1px solid rgba(255,255,255,0.08); text-align:center;">
                                    <div style="font-size:11px; color:#aaa; font-family:sans-serif; font-weight:bold; margin-bottom:5px;">GÕ PHÍM LIÊN TỤC</div>
                                    <div class="storm-input-display" style="width:100%; height:26px; border-radius:8px; background:rgba(255,255,255,0.05); color:#fff; font-size:12px; font-family:monospace; display:flex; align-items:center; justify-content:center; overflow:hidden; white-space:nowrap; border:1px solid rgba(0,132,255,0.3);">typing...</div>
                                </div>
                                ${makeKeyboardHTML()}
                            </div>

                            <!-- Central flow space for packet storms -->
                            <div style="position:absolute; left:260px; top:20px; width:280px; height:280px;" class="storm-channel-box">
                                <!-- Red warning packets will be instantiated dynamically -->
                            </div>

                            <!-- Right: Overloaded Server Node -->
                            <div style="position:absolute; left:560px; top:10px; width:90px; height:90px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                                <div class="storm-server-node" style="width:100%; height:100%; border-radius:24px; border:2px solid rgba(255,255,255,0.1); background:#121622; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 4px 20px rgba(0,0,0,0.5); transition:all 0.15s;">
                                    <i data-lucide="server" style="width:40px; height:40px; color:rgba(255,255,255,0.4);" class="server-icon-storm"></i>
                                    <span style="font-size:9px; font-family:monospace; color:#888; margin-top:4px; font-weight:bold;">ENGINE</span>
                                </div>
                            </div>
                            
                            <!-- Server Resource Dashboard -->
                            <div style="position:absolute; left:670px; top:10px; width:120px; height:90px; padding:10px; border-radius:12px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); font-family:monospace; font-size:10px; display:flex; flex-direction:column; gap:4px; box-sizing:border-box;">
                                <div style="display:flex; justify-content:space-between; color:#aaa;">
                                    <span>TRAFFIC:</span>
                                    <span style="color:#ef4444; font-weight:bold;" class="lbl-traffic">45 /s</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; color:#aaa;">
                                    <span>CPU:</span>
                                    <span style="color:#ef4444; font-weight:bold;" class="lbl-cpu">12%</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; color:#aaa;">
                                    <span>QUEUE:</span>
                                    <span style="color:#ef4444; font-weight:bold;" class="lbl-ram">Safe</span>
                                </div>
                            </div>

                            <!-- Scrolling Terminal Console Log -->
                            <div class="terminal-window" style="position:absolute; left:560px; top:120px; width:230px; height:170px;">
                                <!-- Console output text goes here -->
                            </div>

                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_typing_4') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    <!-- Client-side Debouncing / Throttling -->
                    <div class="glass-card cyber-grid" style="width:100%; max-width:860px; height:450px; padding:24px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                        
                        <!-- Header -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                            <div style="font-size:22px; font-weight:bold; color:var(--gold-primary);">Kỹ Thuật Debounce/Throttling: Lọc Gói Tin Tại Đầu Cuối</div>
                            <div style="font-size:13px; background:rgba(16,185,129,0.12); padding:2px 10px; border-radius:6px; color:#10b981; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                <i data-lucide="shield-check" style="width:14px; height:14px;"></i> Client Protected
                            </div>
                        </div>

                        <!-- Absolute container -->
                        <div style="position:relative; width:800px; height:320px; margin:10px auto 0 auto;">
                            
                            <!-- Dynamic flying packets canvas -->
                            <div class="debounce-packet-area" style="position:absolute; inset:0; pointer-events:none; z-index:3;"></div>

                            <!-- Left: Keyboard & input timer -->
                            <div style="position:absolute; left:20px; top:40px; width:220px; display:flex; flex-direction:column; align-items:center; gap:12px; z-index:2;">
                                <div style="width:100%; padding:10px; background:#181c25; border-radius:14px; border:1px solid rgba(255,255,255,0.08); text-align:center;">
                                    <div style="font-size:11px; color:#aaa; font-family:sans-serif; font-weight:bold; margin-bottom:5px;">GÕ PHÍM LIÊN TỤC</div>
                                    <div class="debounce-input-display" style="width:100%; height:26px; border-radius:8px; background:rgba(255,255,255,0.05); color:#fff; font-size:12px; font-family:monospace; display:flex; align-items:center; justify-content:center; overflow:hidden; white-space:nowrap; border:1px solid rgba(16,185,129,0.3);">typing...</div>
                                </div>
                                ${makeKeyboardHTML()}
                            </div>

                            <!-- Center: Debounce Filter Gate & Timer Ring -->
                            <div style="position:absolute; left:270px; top:40px; width:260px; height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:15px; border-left:1px dashed rgba(255,255,255,0.08); border-right:1px dashed rgba(255,255,255,0.08); z-index:2;">
                                
                                <!-- Radial Timer countdown ring -->
                                <div style="position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center;" class="timer-ring-container">
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; transform:rotate(-90deg);">
                                        <circle cx="45" cy="45" r="38" stroke="rgba(255,255,255,0.05)" stroke-width="6" fill="none"></circle>
                                        <circle cx="45" cy="45" r="38" stroke="#10b981" stroke-width="6" fill="none" stroke-dasharray="239" stroke-dashoffset="0" class="timer-circle-fill" style="transition: stroke-dashoffset 0.1s linear;"></circle>
                                    </svg>
                                    <div style="font-family:monospace; font-size:18px; font-weight:bold; color:#10b981;" class="timer-countdown-text">2.0s</div>
                                </div>
                                <span style="font-family:sans-serif; font-size:11px; color:#aaa; font-weight:bold; text-transform:uppercase;">Bộ Trễ Debounce</span>
                                
                                <!-- Gate lock status -->
                                <div class="filter-gate-badge" style="padding:4px 12px; border-radius:20px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#ef4444; font-size:11px; font-family:sans-serif; font-weight:bold; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="lock" style="width:12px; height:12px;"></i>
                                    BLOCKING EVENTS
                                </div>
                            </div>

                            <!-- Right: WebSocket server receiving filtered packet -->
                            <div style="position:absolute; left:560px; top:40px; width:220px; display:flex; flex-direction:column; align-items:center; gap:12px; z-index:2;">
                                <div class="debounce-server-node" style="width:110px; height:110px; border-radius:24px; border:2px solid rgba(16,185,129,0.3); background:#0c131a; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 4px 20px rgba(16,185,129,0.15); transition:all 0.3s;">
                                    <i data-lucide="server" style="width:48px; height:48px; color:#10b981;"></i>
                                    <span style="font-size:10px; font-family:monospace; color:#aaa; margin-top:6px; font-weight:bold;">CHAT SERVER</span>
                                </div>

                                <!-- Saved traffic details -->
                                <div style="width:100%; padding:10px; border-radius:12px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); font-family:monospace; font-size:11px; display:flex; flex-direction:column; gap:4px; box-sizing:border-box;">
                                    <div style="display:flex; justify-content:space-between; color:#aaa;">
                                        <span>TRAFFIC:</span>
                                        <span style="color:#10b981; font-weight:bold;" class="db-lbl-traffic">1 req / 2s</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; color:#aaa;">
                                        <span>CPU LOAD:</span>
                                        <span style="color:#10b981; font-weight:bold;" class="db-lbl-cpu">0.1%</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; color:#aaa;">
                                        <span>SAVING RATE:</span>
                                        <span style="color:#10b981; font-weight:bold;">95% REDUCED</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_typing_5') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    <!-- Server side: Redis Pub/Sub Router -->
                    <div class="glass-card cyber-grid" style="width:100%; max-width:860px; height:450px; padding:24px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                        
                        <!-- Header -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                            <div style="font-size:22px; font-weight:bold; color:var(--gold-primary);">Server-side: Redis Pub/Sub Định Tuyến Sự Kiện Quy Mô Lớn</div>
                            <div style="font-size:13px; background:rgba(239,68,68,0.15); padding:2px 10px; border-radius:6px; color:#ef4444; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                <i data-lucide="zap" style="width:14px; height:14px;"></i> Redis Broker Active
                            </div>
                        </div>

                        <!-- Absolute routing flow container -->
                        <div style="position:relative; width:800px; height:320px; margin:10px auto 0 auto;">
                            
                            <!-- Left: User A Phone & WS Server A -->
                            <div style="position:absolute; left:10px; top:110px; display:flex; align-items:center; gap:10px; z-index:3;">
                                <div style="width:50px; height:80px; border-radius:8px; border:1.5px solid rgba(255,255,255,0.15); background:#0f111a; display:flex; align-items:center; justify-content:center; color:#888; font-size:9px; font-family:sans-serif; text-align:center;">User A</div>
                                
                                <div class="ws-srv-a" style="width:85px; height:70px; border-radius:12px; border:1.5px solid rgba(0, 132, 255, 0.4); background:#111522; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-size:10px; font-weight:bold; transition: all 0.2s;">
                                    <i data-lucide="server" style="width:20px; height:20px; color:#0084ff; margin-bottom:4px;"></i>
                                    <span>Server A</span>
                                </div>
                            </div>

                            <!-- Center: Redis Pub/Sub Router Hub -->
                            <div class="redis-hub" style="position:absolute; left:345px; top:105px; width:110px; height:110px; border-radius:50%; border:2px solid rgba(239, 68, 68, 0.4); background:#161014; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; transition:all 0.3s; z-index:4; box-shadow:0 0 20px rgba(239,68,68,0.15);">
                                <div style="width:40px; height:40px; border-radius:50%; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-size:16px; margin-bottom:4px; box-shadow:0 0 10px rgba(239,68,68,0.5);">R</div>
                                <span style="font-family:monospace; font-size:10px; font-weight:bold; color:#ef4444; letter-spacing:0.5px;">REDIS PUB/SUB</span>
                                <div class="redis-ripple-container" style="position:absolute; inset:0; pointer-events:none;"></div>
                            </div>

                            <!-- Right: WebSocket Server B & Server C -->
                            <div style="position:absolute; right:10px; top:15px; display:flex; flex-direction:column; gap:40px; align-items:flex-end; z-index:3;">
                                
                                <!-- Server B & User B -->
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div class="ws-srv-b" style="width:85px; height:70px; border-radius:12px; border:1.5px solid rgba(0, 132, 255, 0.4); background:#111522; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-size:10px; font-weight:bold; transition: all 0.2s;">
                                        <i data-lucide="server" style="width:20px; height:20px; color:#0084ff; margin-bottom:4px;"></i>
                                        <span>Server B</span>
                                    </div>
                                    <div style="width:50px; height:80px; border-radius:8px; border:1.5px solid rgba(255,255,255,0.15); background:#0f111a; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#aaa; font-size:9px; font-family:sans-serif; text-align:center; position:relative;">
                                        <span>User B</span>
                                        <div class="p5-bubble-b" style="padding:2px; border-radius:6px; background:#242526; display:none; align-items:center; gap:2px; position:absolute; top:-12px; left:-10px; scale:0.8;">
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Server C & User C -->
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div class="ws-srv-c" style="width:85px; height:70px; border-radius:12px; border:1.5px solid rgba(0, 132, 255, 0.4); background:#111522; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-size:10px; font-weight:bold; transition: all 0.2s;">
                                        <i data-lucide="server" style="width:20px; height:20px; color:#0084ff; margin-bottom:4px;"></i>
                                        <span>Server C</span>
                                    </div>
                                    <div style="width:50px; height:80px; border-radius:8px; border:1.5px solid rgba(255,255,255,0.15); background:#0f111a; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#aaa; font-size:9px; font-family:sans-serif; text-align:center; position:relative;">
                                        <span>User C</span>
                                        <div class="p5-bubble-c" style="padding:2px; border-radius:6px; background:#242526; display:none; align-items:center; gap:2px; position:absolute; top:-12px; left:-10px; scale:0.8;">
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                            <div class="typing-dot" style="width:3px; height:3px;"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- SVG link lines for connection flows -->
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="redis-svg-canvas">
                                <!-- Paths will be generated dynamically -->
                            </svg>

                        </div>
                    </div>
                </div>
            `;
        }


        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_typing_1') {
            const inputDisplay = canvas.querySelector('.input-display-a');
            const typingBubble = canvas.querySelector('.typing-indicator-bubble');
            const packetCanvas = canvas.querySelector('.s1-packet-canvas');
            const serverNode = canvas.querySelector('.server-node');
            const phrase = 'Có chuyện này cực kỳ thú vị...';
            
            // Clear packets
            if (packetCanvas) packetCanvas.innerHTML = '';

            // Render typing animation based on progress
            if (progress <= 0.1) {
                if (inputDisplay) inputDisplay.textContent = '';
                if (typingBubble) { typingBubble.style.display = 'none'; typingBubble.style.opacity = '0'; }
                if (serverNode) { serverNode.style.transform = 'scale(1)'; serverNode.style.boxShadow = '0 0 20px rgba(0,132,255,0.25)'; }
            }
            else if (progress > 0.1 && progress <= 0.7) {
                // Animate typing characters
                const subP = (progress - 0.1) / 0.6;
                const charCount = Math.floor(subP * phrase.length);
                if (inputDisplay) inputDisplay.textContent = phrase.slice(0, charCount) + '|';
                
                // Key highlights
                const currChar = phrase.charAt(charCount - 1).toUpperCase();
                const keyEl = canvas.querySelector(`.key-${currChar}`);
                if (keyEl) {
                    keyEl.classList.add('key-pressing');
                    setTimeout(() => keyEl.classList.remove('key-pressing'), 150);
                }

                // Show typing indicator on Receiver side
                if (typingBubble) {
                    typingBubble.style.display = 'flex';
                    typingBubble.style.opacity = '1';
                }

                // Animate flying WebSocket packets along curves for keys pressed
                const keypressMilestones = [0.15, 0.23, 0.31, 0.39, 0.47, 0.55, 0.63];
                let shouldFlashServer = false;
                let activePacketsHTML = '';

                keypressMilestones.forEach(triggerP => {
                    // Flow A: Phone A -> Server (takes 0.04 progress)
                    if (progress >= triggerP && progress < triggerP + 0.04) {
                        const t = (progress - triggerP) / 0.04;
                        const x = getCubicBezier(t, 240, 300, 325, 385);
                        const y = getCubicBezier(t, 205, 205, 155, 155);
                        activePacketsHTML += `<div style="position:absolute; left:${x}px; top:${y}px; width:10px; height:10px; border-radius:50%; background:#0084ff; box-shadow:0 0 10px #0084ff; transform:translate(-5px, -5px); z-index:4;"></div>`;
                    }
                    
                    // Server Flash condition
                    if (progress >= triggerP + 0.038 && progress < triggerP + 0.05) {
                        shouldFlashServer = true;
                    }

                    // Flow B: Server -> Phone B (starts at triggerP + 0.03, takes 0.04 progress)
                    const triggerP2 = triggerP + 0.03;
                    if (progress >= triggerP2 && progress < triggerP2 + 0.04) {
                        const t = (progress - triggerP2) / 0.04;
                        const x = getCubicBezier(t, 455, 515, 540, 600);
                        const y = getCubicBezier(t, 155, 155, 205, 205);
                        activePacketsHTML += `<div style="position:absolute; left:${x}px; top:${y}px; width:10px; height:10px; border-radius:50%; background:#0084ff; box-shadow:0 0 10px #0084ff; transform:translate(-5px, -5px); z-index:4;"></div>`;
                    }
                });

                if (packetCanvas) {
                    packetCanvas.innerHTML = activePacketsHTML;
                }

                if (serverNode) {
                    if (shouldFlashServer) {
                        serverNode.style.transform = 'scale(1.08)';
                        serverNode.style.borderColor = '#0084ff';
                        serverNode.style.boxShadow = '0 0 25px rgba(0,132,255,0.7)';
                    } else {
                        serverNode.style.transform = 'scale(1)';
                        serverNode.style.borderColor = 'rgba(0, 132, 255, 0.4)';
                        serverNode.style.boxShadow = '0 0 20px rgba(0,132,255,0.25)';
                    }
                }
            }
            else {
                // Done typing state
                if (inputDisplay) inputDisplay.textContent = phrase;
                if (typingBubble) {
                    typingBubble.style.opacity = '0';
                    setTimeout(() => { if (progress > 0.7) typingBubble.style.display = 'none'; }, 300);
                }
                if (serverNode) {
                    serverNode.style.transform = 'scale(1)';
                    serverNode.style.boxShadow = '0 0 20px rgba(0,132,255,0.25)';
                }
            }
        }
        else if (slideId === 'slide_typing_2') {
            const pollingStats = canvas.querySelector('.polling-stats');
            const pollPacketContainer = canvas.querySelector('.polling-packet-container');
            const wsPacketContainer = canvas.querySelector('.ws-packet-container');
            
            const pollingServer = canvas.querySelector('.polling-server-node');
            const pollingDB = canvas.querySelector('.polling-db-node');
            const wsServer = canvas.querySelector('.ws-server-node');

            if (pollPacketContainer) pollPacketContainer.innerHTML = '';
            if (wsPacketContainer) wsPacketContainer.innerHTML = '';

            // 1. Polling animation - periodically shoot request-response queries
            const interval = 0.15; // 15% progress per cycle
            const shootIdx = Math.floor(progress / interval);
            if (pollingStats) pollingStats.textContent = `Requests: ${shootIdx}`;
            
            const insideP = (progress % interval) / interval; // 0.0 -> 1.0

            let pollPackets = '';
            let sFlash = false;
            let dbFlash = false;

            if (progress > 0.02) {
                if (insideP <= 0.3) {
                    // Browser -> Server (X=90 to X=420)
                    const t = insideP / 0.3;
                    const x = 90 + t * (420 - 90);
                    pollPackets += `<div style="position:absolute; left:${x}px; top:28px; width:8px; height:8px; border-radius:50%; background:#ef4444; box-shadow:0 0 8px #ef4444; transform:translate(-4px, -4px);"></div>`;
                }
                else if (insideP > 0.3 && insideP <= 0.5) {
                    // Hit Server, query Database: Server -> DB (X=490 to X=680)
                    sFlash = true;
                    const t = (insideP - 0.3) / 0.2;
                    const x = 490 + t * (680 - 490);
                    pollPackets += `<div style="position:absolute; left:${x}px; top:28px; width:8px; height:8px; border-radius:50%; background:#ef4444; box-shadow:0 0 8px #ef4444; transform:translate(-4px, -4px);"></div>`;
                }
                else if (insideP > 0.5 && insideP <= 0.7) {
                    // Hit Database, return response: DB -> Server (X=680 to X=490)
                    dbFlash = true;
                    const t = (insideP - 0.5) / 0.2;
                    const x = 680 - t * (680 - 490);
                    pollPackets += `<div style="position:absolute; left:${x}px; top:28px; width:8px; height:8px; border-radius:50%; background:#ef4444; box-shadow:0 0 8px #ef4444; transform:translate(-4px, -4px);"></div>`;
                }
                else if (insideP > 0.7 && insideP <= 1.0) {
                    // Server returns response: Server -> Browser (X=420 to X=90)
                    sFlash = true;
                    const t = (insideP - 0.7) / 0.3;
                    const x = 420 - t * (420 - 90);
                    pollPackets += `<div style="position:absolute; left:${x}px; top:28px; width:8px; height:8px; border-radius:50%; background:#ef4444; box-shadow:0 0 8px #ef4444; transform:translate(-4px, -4px);"></div>`;
                }
            }

            if (pollPacketContainer) pollPacketContainer.innerHTML = pollPackets;

            // Apply light status changes to nodes
            if (pollingServer) {
                if (sFlash) {
                    pollingServer.style.borderColor = '#ef4444';
                    pollingServer.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.4)';
                } else {
                    pollingServer.style.borderColor = '#ef4444';
                    pollingServer.style.boxShadow = 'none';
                }
            }
            if (pollingDB) {
                if (dbFlash) {
                    pollingDB.classList.add('db-pulse');
                    pollingDB.style.borderColor = '#ef4444';
                } else {
                    pollingDB.classList.remove('db-pulse');
                    pollingDB.style.borderColor = 'rgba(255,255,255,0.15)';
                }
            }

            // 2. WebSocket animation - single green packet slides down on user typing milestones
            let wsPackets = '';
            let wsSrvPulse = false;
            const wsTriggers = [0.2, 0.45, 0.7];
            
            wsTriggers.forEach(triggerP => {
                if (progress >= triggerP && progress < triggerP + 0.12) {
                    const t = (progress - triggerP) / 0.12;
                    const x = 90 + t * (420 - 90);
                    wsPackets += `<div style="position:absolute; left:${x}px; top:24px; padding:2px 6px; border-radius:4px; background:#10b981; color:#fff; font-family:monospace; font-size:7px; font-weight:bold; box-shadow:0 0 8px #10b981; transform:translate(-20px, -2px); white-space:nowrap;">{"type":"typing"}</div>`;
                    
                    if (t >= 0.95) {
                        wsSrvPulse = true;
                    }
                }
            });

            if (wsPacketContainer) wsPacketContainer.innerHTML = wsPackets;

            if (wsServer) {
                if (wsSrvPulse) {
                    wsServer.style.borderColor = '#10b981';
                    wsServer.style.boxShadow = '0 0 15px rgba(16,185,129,0.6)';
                    wsServer.style.transform = 'scale(1.05)';
                } else {
                    wsServer.style.borderColor = '#10b981';
                    wsServer.style.boxShadow = 'none';
                    wsServer.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_typing_3') {
            const channelBox = canvas.querySelector('.storm-channel-box');
            const serverNode = canvas.querySelector('.storm-server-node');
            const inputDisplay = canvas.querySelector('.storm-input-display');
            const alarmContainer = canvas.querySelector('.alarm-container');
            const terminal = canvas.querySelector('.terminal-window');
            
            const trafficLbl = canvas.querySelector('.lbl-traffic');
            const cpuLbl = canvas.querySelector('.lbl-cpu');
            const ramLbl = canvas.querySelector('.lbl-ram');

            // Keyboard highlights
            const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
            const activeKey = keys[Math.floor(progress * 100) % keys.length];
            canvas.querySelectorAll('.kb-key').forEach(el => el.classList.remove('key-pressing'));
            const keyEl = canvas.querySelector(`.key-${activeKey}`);
            if (keyEl && progress < 0.8) {
                keyEl.classList.add('key-pressing');
            }

            // Animate keyboard input typing text
            if (inputDisplay) {
                const dots = '.'.repeat(Math.floor(progress * 30) % 4);
                inputDisplay.textContent = 'typing' + dots;
            }

            // Terminal Logs Update
            if (terminal) {
                let linesHTML = '';
                stormLogs.forEach(log => {
                    if (log.p <= progress) {
                        let cl = 'terminal-line';
                        if (log.type === 'warn') cl += ' warn';
                        if (log.type === 'err') cl += ' err';
                        linesHTML += `<div class="${cl}">${log.text}</div>`;
                    }
                });
                terminal.innerHTML = linesHTML;
                terminal.scrollTop = terminal.scrollHeight;
            }

            // Flood phase start at progress > 0.15
            if (progress > 0.15 && progress <= 0.8) {
                // Shoot red packets at high frequency
                if (channelBox && Math.random() < 0.4) {
                    const packet = document.createElement('div');
                    packet.style.position = 'absolute';
                    packet.style.left = '0px';
                    packet.style.top = `${Math.random() * 240}px`;
                    packet.style.width = '8px';
                    packet.style.height = '8px';
                    packet.style.borderRadius = '50%';
                    packet.style.background = '#ef4444';
                    packet.style.boxShadow = '0 0 8px #ef4444';
                    packet.style.transition = 'all 0.5s linear';
                    channelBox.appendChild(packet);
                    
                    setTimeout(() => {
                        packet.style.left = '280px';
                    }, 10);
                    setTimeout(() => {
                        packet.remove();
                    }, 520);
                }

                // Shake server node
                if (serverNode) {
                    serverNode.classList.add('server-shake-heavy');
                    serverNode.querySelector('svg').style.color = '#ef4444';
                }

                // Alarm layout flash
                if (alarmContainer) {
                    alarmContainer.classList.add('alarm-flash-bg');
                }

                // Metrics
                const scaleP = (progress - 0.15) / 0.65;
                if (trafficLbl) trafficLbl.textContent = `${Math.floor(25 + scaleP * 900)} /s`;
                if (cpuLbl) cpuLbl.textContent = `${Math.floor(12 + scaleP * 87)}%`;
                if (ramLbl) ramLbl.textContent = scaleP > 0.6 ? 'OOM CRITICAL' : 'WARNING';
            }
            else {
                // Idle or settled
                if (serverNode) {
                    serverNode.classList.remove('server-shake-heavy');
                    serverNode.style.borderColor = 'rgba(255,255,255,0.1)';
                    serverNode.querySelector('svg').style.color = 'rgba(255,255,255,0.4)';
                }
                if (alarmContainer) {
                    alarmContainer.classList.remove('alarm-flash-bg');
                }
                if (trafficLbl) trafficLbl.textContent = '0 /s';
                if (cpuLbl) cpuLbl.textContent = '0.5%';
                if (ramLbl) ramLbl.textContent = 'Safe';
            }
        }
        else if (slideId === 'slide_typing_4') {
            const inputDisplay = canvas.querySelector('.debounce-input-display');
            const countdownText = canvas.querySelector('.timer-countdown-text');
            const circleFill = canvas.querySelector('.timer-circle-fill');
            const gateBadge = canvas.querySelector('.filter-gate-badge');
            const packetArea = canvas.querySelector('.debounce-packet-area');
            const serverNode = canvas.querySelector('.debounce-server-node');
            
            // Circle circumference = 2 * Math.PI * 38 = ~238.7
            const maxOffset = 239;

            // Simulating keyboard keypresses
            const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
            const activeKey = keys[Math.floor(progress * 150) % keys.length];
            canvas.querySelectorAll('.kb-key').forEach(el => el.classList.remove('key-pressing'));
            const keyEl = canvas.querySelector(`.key-${activeKey}`);
            
            // Typing bursts: 0.1 -> 0.45, and 0.55 -> 0.8
            const isTyping = (progress > 0.1 && progress < 0.45) || (progress > 0.55 && progress < 0.8);
            if (isTyping && keyEl) {
                keyEl.classList.add('key-pressing');
                if (inputDisplay) inputDisplay.textContent = 'User gõ phím liên tục...';
            } else {
                if (inputDisplay) inputDisplay.textContent = 'Không có phím nhấn';
            }

            // Animate flying packets
            let packetsHTML = '';
            
            // 1. Red typing packets flying from keyboard (X=240, Y=120) to filter gate (X=350, Y=120)
            const redMilestones = [
                0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40, 0.44,
                0.57, 0.61, 0.65, 0.69, 0.73, 0.77
            ];
            
            redMilestones.forEach(triggerP => {
                if (progress >= triggerP && progress < triggerP + 0.03) {
                    const t = (progress - triggerP) / 0.03;
                    const x = 240 + t * 110;
                    packetsHTML += `<circle cx="${x}" cy="120" r="5" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"></circle>`;
                }
                
                // Show bouncing blocked packet right after hitting the gate
                if (progress >= triggerP + 0.03 && progress < triggerP + 0.05) {
                    packetsHTML += `<circle cx="350" cy="120" r="4" fill="#ef4444" class="packet-bounce"></circle>`;
                }
            });

            // 2. Green packets flying from gate (X=350, Y=120) to Server (X=560, Y=120)
            // First green packet flies when first burst debounce triggers (t = 0.46 to 0.53)
            let srvPulse = false;
            if (progress >= 0.46 && progress < 0.53) {
                const t = (progress - 0.46) / 0.07;
                const x = 350 + t * 210;
                packetsHTML += `<circle cx="${x}" cy="120" r="6" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)"></circle>`;
                if (t >= 0.9) srvPulse = true;
            }
            // Second green packet flies when second burst debounce triggers (t = 0.81 to 0.88)
            if (progress >= 0.81 && progress < 0.88) {
                const t = (progress - 0.81) / 0.07;
                const x = 350 + t * 210;
                packetsHTML += `<circle cx="${x}" cy="120" r="6" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)"></circle>`;
                if (t >= 0.9) srvPulse = true;
            }

            if (packetArea) {
                packetArea.innerHTML = `<svg style="width:100%; height:100%;">${packetsHTML}</svg>`;
            }

            // Server Node pulse
            if (serverNode) {
                if (srvPulse) {
                    serverNode.style.borderColor = '#10b981';
                    serverNode.style.boxShadow = '0 0 25px rgba(16,185,129,0.7)';
                    serverNode.style.transform = 'scale(1.06)';
                } else {
                    serverNode.style.borderColor = 'rgba(16,185,129,0.3)';
                    serverNode.style.boxShadow = '0 4px 20px rgba(16,185,129,0.15)';
                    serverNode.style.transform = 'scale(1)';
                }
            }

            // Visualizing the timer countdown
            if (progress <= 0.1) {
                if (countdownText) countdownText.textContent = '0.0s';
                if (circleFill) circleFill.style.strokeDashoffset = maxOffset;
                if (gateBadge) {
                    gateBadge.innerHTML = '<i data-lucide="lock" style="width:12px; height:12px;"></i> STANDBY';
                    gateBadge.style.background = 'rgba(255,255,255,0.05)';
                    gateBadge.style.borderColor = 'rgba(255,255,255,0.1)';
                    gateBadge.style.color = '#aaa';
                }
            }
            else if (progress > 0.1 && progress <= 0.45) {
                // Burst 1: Timer keeps resetting near 2.0s
                const jitterTime = 1.8 + Math.random() * 0.2;
                if (countdownText) countdownText.textContent = `${jitterTime.toFixed(1)}s`;
                if (circleFill) {
                    const offset = maxOffset * (1 - jitterTime / 2.0);
                    circleFill.style.strokeDashoffset = offset;
                }
                if (gateBadge) {
                    gateBadge.innerHTML = '<i data-lucide="lock" style="width:12px; height:12px;"></i> BLOCKING EVENTS';
                    gateBadge.style.background = 'rgba(239,68,68,0.15)';
                    gateBadge.style.borderColor = 'rgba(239,68,68,0.4)';
                    gateBadge.style.color = '#ef4444';
                }
            }
            else if (progress > 0.45 && progress <= 0.55) {
                // Pause 1: Timer countdown runs down to 0
                const decayP = (progress - 0.45) / 0.10; // 0 to 1
                const remainingTime = Math.max(0, 2.0 * (1 - decayP));
                if (countdownText) countdownText.textContent = `${remainingTime.toFixed(1)}s`;
                if (circleFill) {
                    circleFill.style.strokeDashoffset = maxOffset * (1 - remainingTime / 2.0);
                }
                
                if (remainingTime > 0) {
                    if (gateBadge) {
                        gateBadge.innerHTML = '<i data-lucide="lock" style="width:12px; height:12px;"></i> BLOCKING EVENTS';
                        gateBadge.style.background = 'rgba(239,68,68,0.15)';
                        gateBadge.style.borderColor = 'rgba(239,68,68,0.4)';
                        gateBadge.style.color = '#ef4444';
                    }
                } else {
                    if (gateBadge) {
                        gateBadge.innerHTML = '<i data-lucide="unlock" style="width:12px; height:12px;"></i> SENDING EVENT';
                        gateBadge.style.background = 'rgba(16,185,129,0.15)';
                        gateBadge.style.borderColor = 'rgba(16,185,129,0.4)';
                        gateBadge.style.color = '#10b981';
                    }
                }
            }
            else if (progress > 0.55 && progress <= 0.8) {
                // Burst 2: Timer stays near 2.0s again
                const jitterTime = 1.8 + Math.random() * 0.2;
                if (countdownText) countdownText.textContent = `${jitterTime.toFixed(1)}s`;
                if (circleFill) {
                    circleFill.style.strokeDashoffset = maxOffset * (1 - jitterTime / 2.0);
                }
                if (gateBadge) {
                    gateBadge.innerHTML = '<i data-lucide="lock" style="width:12px; height:12px;"></i> BLOCKING EVENTS';
                    gateBadge.style.background = 'rgba(239,68,68,0.15)';
                    gateBadge.style.borderColor = 'rgba(239,68,68,0.4)';
                    gateBadge.style.color = '#ef4444';
                }
            }
            else {
                // Settle down to 0
                const decayP = (progress - 0.8) / 0.20;
                const remainingTime = Math.max(0, 2.0 * (1 - decayP));
                if (countdownText) countdownText.textContent = `${remainingTime.toFixed(1)}s`;
                if (circleFill) {
                    circleFill.style.strokeDashoffset = maxOffset * (1 - remainingTime / 2.0);
                }
                if (remainingTime > 0) {
                    if (gateBadge) {
                        gateBadge.innerHTML = '<i data-lucide="lock" style="width:12px; height:12px;"></i> BLOCKING EVENTS';
                        gateBadge.style.background = 'rgba(239,68,68,0.15)';
                        gateBadge.style.borderColor = 'rgba(239,68,68,0.4)';
                        gateBadge.style.color = '#ef4444';
                    }
                } else {
                    if (gateBadge) {
                        gateBadge.innerHTML = '<i data-lucide="unlock" style="width:12px; height:12px;"></i> SENDING EVENT';
                        gateBadge.style.background = 'rgba(16,185,129,0.15)';
                        gateBadge.style.borderColor = 'rgba(16,185,129,0.4)';
                        gateBadge.style.color = '#10b981';
                    }
                }
            }

            if (typeof lucide !== 'undefined' && gateBadge) {
                lucide.createIcons({ node: gateBadge });
            }
        }
        else if (slideId === 'slide_typing_5') {
            const redisHub = canvas.querySelector('.redis-hub');
            const rippleContainer = canvas.querySelector('.redis-ripple-container');
            const svgCanvas = canvas.querySelector('.redis-svg-canvas');
            const bubbleB = canvas.querySelector('.p5-bubble-b');
            const bubbleC = canvas.querySelector('.p5-bubble-c');

            const srvA = canvas.querySelector('.ws-srv-a');
            const srvB = canvas.querySelector('.ws-srv-b');
            const srvC = canvas.querySelector('.ws-srv-c');

            // 1. WebSocket Server A receives typing packet from Client A (User A)
            // Progress: 0.15 -> 0.35
            let linesHTML = '';
            let srvAPulse = false;
            let redisPulse = false;
            let srvBPulse = false;
            let srvCPulse = false;

            if (progress > 0.15 && progress <= 0.35) {
                const t = (progress - 0.15) / 0.20;
                // Packet traveling from User A (x=35, y=150) to Server A (x=112, y=150)
                const packetX = 35 + t * 77;
                linesHTML += `<circle cx="${packetX}" cy="150" r="5" fill="#0084ff" filter="drop-shadow(0 0 6px #0084ff)"></circle>`;
                if (t >= 0.9) srvAPulse = true;
            }

            // 2. Server A forwards event to Redis Pub/Sub Hub
            // Progress: 0.35 -> 0.50
            if (progress > 0.35 && progress <= 0.50) {
                srvAPulse = true;
                const t = (progress - 0.35) / 0.15;
                // Connection path from Server A (x=155, y=150) to Redis Hub (x=345, y=160)
                const packetX = 155 + t * 190;
                const packetY = 150 + t * 10;
                linesHTML += `<circle cx="${packetX}" cy="${packetY}" r="5" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"></circle>`;
                if (t >= 0.9) redisPulse = true;
            }

            // 3. Redis broadcasts (publishes) event to Server B and Server C
            // Progress: 0.50 -> 0.75
            if (progress > 0.50 && progress <= 0.75) {
                redisPulse = true;
                if (redisHub) redisHub.classList.add('redis-active-hub');
                
                // Show ripple expansion exactly once at the start of pub/sub broadcast
                if (rippleContainer && !rippleContainer.querySelector('.redis-ripple')) {
                    rippleContainer.innerHTML = '<div class="redis-ripple"></div>';
                }

                const t = (progress - 0.50) / 0.25;
                
                // Path 1 (Quadratic Bezier): Redis Hub (x=400, y=140) to Server B (x=620, y=65), ctrl X=510, Y=80
                const p1X = (1 - t) * (1 - t) * 400 + 2 * (1 - t) * t * 510 + t * t * 620;
                const p1Y = (1 - t) * (1 - t) * 140 + 2 * (1 - t) * t * 80 + t * t * 65;
                
                // Path 2 (Quadratic Bezier): Redis Hub (x=400, y=180) to Server C (x=620, y=230), ctrl X=510, Y=220
                const p2X = (1 - t) * (1 - t) * 400 + 2 * (1 - t) * t * 510 + t * t * 220;
                const p2Y = (1 - t) * (1 - t) * 180 + 2 * (1 - t) * t * 220 + t * t * 230;

                linesHTML += `
                    <circle cx="${p1X}" cy="${p1Y}" r="5" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"></circle>
                    <circle cx="${p2X}" cy="${p2Y}" r="5" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"></circle>
                `;
                
                if (t >= 0.9) {
                    srvBPulse = true;
                    srvCPulse = true;
                }
            } else {
                if (redisHub) redisHub.classList.remove('redis-active-hub');
                if (rippleContainer) rippleContainer.innerHTML = '';
            }

            // 4. Server B/C deliver packet to Client B/C & trigger "Typing..." dots
            // Progress: 0.75 -> 0.95
            if (progress > 0.75) {
                srvBPulse = true;
                srvCPulse = true;
                const t = Math.min(1, (progress - 0.75) / 0.20);
                
                // Path 1: Server B (x=662, y=65) to User B (x=740, y=65)
                const p1X = 662 + t * 78;
                
                // Path 2: Server C (x=662, y=230) to User C (x=740, y=230)
                const p2X = 662 + t * 78;

                linesHTML += `
                    <circle cx="${p1X}" cy="65" r="4" fill="#0084ff" filter="drop-shadow(0 0 5px #0084ff)"></circle>
                    <circle cx="${p2X}" cy="230" r="4" fill="#0084ff" filter="drop-shadow(0 0 5px #0084ff)"></circle>
                `;

                if (t >= 0.85) {
                    if (bubbleB) { bubbleB.style.display = 'flex'; bubbleB.style.opacity = '1'; }
                    if (bubbleC) { bubbleC.style.display = 'flex'; bubbleC.style.opacity = '1'; }
                }
            } else {
                if (bubbleB) { bubbleB.style.display = 'none'; bubbleB.style.opacity = '0'; }
                if (bubbleC) { bubbleC.style.display = 'none'; bubbleC.style.opacity = '0'; }
            }

            // Apply pulse styling to Server A, B, C based on packets
            if (srvA) {
                if (srvAPulse) {
                    srvA.style.borderColor = '#0084ff';
                    srvA.style.boxShadow = '0 0 15px rgba(0, 132, 255, 0.6)';
                    srvA.style.transform = 'scale(1.05)';
                } else {
                    srvA.style.borderColor = 'rgba(0, 132, 255, 0.4)';
                    srvA.style.boxShadow = 'none';
                    srvA.style.transform = 'scale(1)';
                }
            }
            if (srvB) {
                if (srvBPulse) {
                    srvB.style.borderColor = '#0084ff';
                    srvB.style.boxShadow = '0 0 15px rgba(0, 132, 255, 0.6)';
                    srvB.style.transform = 'scale(1.05)';
                } else {
                    srvB.style.borderColor = 'rgba(0, 132, 255, 0.4)';
                    srvB.style.boxShadow = 'none';
                    srvB.style.transform = 'scale(1)';
                }
            }
            if (srvC) {
                if (srvCPulse) {
                    srvC.style.borderColor = '#0084ff';
                    srvC.style.boxShadow = '0 0 15px rgba(0, 132, 255, 0.6)';
                    srvC.style.transform = 'scale(1.05)';
                } else {
                    srvC.style.borderColor = 'rgba(0, 132, 255, 0.4)';
                    srvC.style.boxShadow = 'none';
                    srvC.style.transform = 'scale(1)';
                }
            }

            // Draw base connecting network pathways matching curves
            if (svgCanvas) {
                svgCanvas.innerHTML = `
                    <!-- Server A to Redis -->
                    <path d="M 155 150 L 345 160" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                    <!-- Redis to Server B (Quadratic Bezier) -->
                    <path d="M 400 140 Q 510 80 620 65" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                    <!-- Redis to Server C (Quadratic Bezier) -->
                    <path d="M 400 180 Q 510 220 620 230" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                    <!-- Server B to User B -->
                    <path d="M 662 65 L 740 65" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none"></path>
                    <!-- Server C to User C -->
                    <path d="M 662 230 L 740 230" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none"></path>
                    ${linesHTML}
                `;
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video23'
    };

    console.log('[Video23 Plugin] Loaded: Messenger Typing Indicator slides loaded successfully.');
})();
