/**
 * Video 73: Wi-Fi Public & Man-in-the-Middle Attack (Coffee Shop scenario)
 * Interactive simulation layout designed for mobile 9:16 screen (Supercharged Premium Animations).
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_wifi_hook: [
            { text: 'Wi-Fi miễn phí', start: 3.5, end: 7.5, class: 'active-cyan' },
            { text: 'âm thầm đọc sạch', start: 8.5, end: 12.5, class: 'active-red' }
        ],
        slide_wifi_rogue_ap: [
            { text: 'Wi-Fi giả mạo', start: 3.5, end: 7.0, class: 'active-red' },
            { text: 'tự động bị đánh lừa', start: 9.0, end: 12.5, class: 'active-yellow' }
        ],
        slide_wifi_mitm: [
            { text: 'Man-in-the-Middle', start: 3.0, end: 7.0, class: 'active-red' },
            { text: 'đi vòng qua laptop', start: 8.5, end: 12.5, class: 'active-yellow' }
        ],
        slide_wifi_http_https: [
            { text: 'HTTP', start: 3.0, end: 6.5, class: 'active-red' },
            { text: 'HTTPS', start: 7.5, end: 11.5, class: 'active-green' }
        ],
        slide_wifi_prevention: [
            { text: 'VPN', start: 3.5, end: 7.0, class: 'active-green' },
            { text: 'mã hóa', start: 8.0, end: 11.5, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_wifi_hook',
        'slide_wifi_rogue_ap',
        'slide_wifi_mitm',
        'slide_wifi_http_https',
        'slide_wifi_prevention'
    ];

    function sceneWrap(inner) {
        return `<div class="v73-zoom-container"><div class="v73-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_wifi_hook') {
            canvas.innerHTML = sceneWrap(`
                <div class="v73-phone-mockup" id="v73-hook-phone">
                    <div class="v73-phone-header">
                        <span class="v73-phone-time">09:41</span>
                        <span class="v73-phone-battery">🔋 92%</span>
                    </div>
                    <div class="v73-phone-body" id="v73-hook-body">
                        <div class="v73-browser-url-bar">
                            <span>🔒</span>
                            <span>http://my-banking.com</span>
                        </div>
                        <div class="v73-browser-content">
                            <!-- Wi-Fi Pulsing Icon -->
                            <div class="v73-wifi-pulsar" id="v73-wifi-icon">
                                <svg class="v73-wifi-svg-icon" viewBox="0 0 100 100">
                                    <circle class="v73-wifi-bar b0" cx="50" cy="80" r="6" fill="currentColor" />
                                    <path class="v73-wifi-bar b1" d="M 38 68 A 17 17 0 0 1 62 68" fill="none" stroke-width="6" stroke-linecap="round" />
                                    <path class="v73-wifi-bar b2" d="M 26 56 A 34 34 0 0 1 74 56" fill="none" stroke-width="6" stroke-linecap="round" />
                                    <path class="v73-wifi-bar b3" d="M 14 44 A 51 51 0 0 1 86 44" fill="none" stroke-width="6" stroke-linecap="round" />
                                </svg>
                                
                                <!-- Sonar pulsing wave indicators -->
                                <div class="v73-sonar-wave s1" id="v73-sonar-1"></div>
                                <div class="v73-sonar-wave s2" id="v73-sonar-2"></div>

                                <!-- Hacker Skull overlay -->
                                <div class="v73-wifi-hacker-skull" id="v73-hacker-skull">☠️</div>
                            </div>
                            
                            <div style="font-size:18px; color:#64748b; font-weight:bold; margin-top:20px; text-align:center;" id="v73-wifi-status">
                                Đang kết nối...
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_wifi_rogue_ap') {
            canvas.innerHTML = sceneWrap(`
                <div class="v73-phone-mockup">
                    <div class="v73-phone-header">
                        <span class="v73-phone-time">09:42</span>
                        <span class="v73-phone-battery">🔋 91%</span>
                    </div>
                    <div class="v73-phone-body" style="padding: 20px;">
                        <div style="font-size:24px; font-weight:bold; color:#fff; align-self:flex-start; margin-bottom:20px;">Wi-Fi Settings</div>
                        
                        <div class="v73-wifi-group">
                            <div style="font-size:16px; color:#64748b; font-weight:bold;">MẠNG KHẢ DỤNG</div>
                            
                            <!-- Real Coffee Wi-Fi (Weak signal) -->
                            <div class="v73-wifi-row" id="v73-wifi-real">
                                <div class="v73-wifi-row-left">
                                    <span style="font-size:24px;">📶</span>
                                    <span style="color:#fff; font-weight:bold;">Coffee_Guest_FREE</span>
                                </div>
                                <div class="v73-wifi-row-right">
                                    <span>(Tín hiệu yếu)</span>
                                    <span class="v73-wifi-check">✓</span>
                                </div>
                            </div>

                            <!-- Fake Rogue AP Wi-Fi (Strong signal) -->
                            <div class="v73-wifi-row" id="v73-wifi-fake">
                                <div class="v73-wifi-row-left">
                                    <span style="font-size:24px; color:var(--v73-cyan);">📶</span>
                                    <span style="color:#fff; font-weight:bold;">Coffee_Guest_FREE</span>
                                </div>
                                <div class="v73-wifi-row-right">
                                    <span style="color:var(--v73-cyan); font-weight:bold;" id="v73-fake-status">(Sóng Khỏe 5G)</span>
                                    <span class="v73-wifi-check" id="v73-check-fake">✓</span>
                                </div>
                            </div>
                        </div>

                        <!-- Info Notice description -->
                        <div style="font-size:15px; color:#64748b; margin-top:40px; line-height:1.5; text-align:center;">
                            Điện thoại sẽ ưu tiên tự động kết nối vào mạng có cường độ sóng mạnh nhất xung quanh.
                        </div>
                    </div>

                    <!-- Simulated Finger Cursor -->
                    <div class="v73-cursor" id="v73-hand-cursor">👆</div>
                </div>
            `);
        }
        else if (slideId === 'slide_wifi_mitm') {
            canvas.innerHTML = sceneWrap(`
                <div class="v73-mitm-board">
                    <div class="v73-mitm-grid">
                        <!-- Left: Client phone -->
                        <div class="v73-mitm-node client">
                            <div class="v73-mitm-icon">📱</div>
                            <div class="v73-mitm-lbl">Client Phone</div>
                        </div>

                        <!-- Middle (Below): Hacker laptop -->
                        <div class="v73-mitm-node hacker" id="v73-hacker-node">
                            <div class="v73-mitm-icon">💻☠️</div>
                            <div class="v73-mitm-lbl">Hacker MITM</div>
                        </div>

                        <!-- Right: Target Bank Server -->
                        <div class="v73-mitm-node server">
                            <div class="v73-mitm-icon">🏦</div>
                            <div class="v73-mitm-lbl">Bank Server</div>
                        </div>
                    </div>

                    <!-- SVG connection curve paths -->
                    <svg class="v73-mitm-svg">
                        <!-- Direct path (curve top) - Client to Server -->
                        <path class="v73-mitm-path direct" id="v73-path-direct" d="M 120,280 Q 410,120 700,280" />
                        
                        <!-- Hijacked path 1 (Client to Hacker) -->
                        <path class="v73-mitm-path hijacked" id="v73-path-h1" d="M 120,280 Q 260,380 410,480" />
                        
                        <!-- Hijacked path 2 (Hacker to Server) -->
                        <path class="v73-mitm-path hijacked" id="v73-path-h2" d="M 410,480 Q 560,380 700,280" />
                    </svg>

                    <!-- Flowing packets -->
                    <div class="v73-mitm-packet" id="v73-pack-cyan"></div>
                    <div class="v73-mitm-packet packet-fake" id="v73-pack-red"></div>
                </div>
            `);
        }
        else if (slideId === 'slide_wifi_http_https') {
            canvas.innerHTML = sceneWrap(`
                <div class="v73-comp-board">
                    <!-- Left: Plaintext HTTP -->
                    <div class="v73-comp-col http-side" id="v73-http-col">
                        <div class="v73-comp-hdr v73-red">
                            <span>❌ HTTP (Không bảo mật)</span>
                        </div>
                        <div class="v73-packet-card">
                            <div class="v73-envelope-laser" id="v73-http-laser"></div>
                            <div class="v73-packet-envelope" id="v73-http-envelope">✉️</div>
                            <div class="v73-packet-data" id="v73-http-data">
                                <span class="v73-comp-lbl">Dữ Liệu Trần:</span><br>
                                <span class="v73-text-plain">pass: 123456</span>
                            </div>
                        </div>
                        <div style="font-size:18px; text-align:center; color:#94a3b8; font-weight:bold;">
                            Hacker đọc nguyên bản thô!
                        </div>
                    </div>

                    <!-- Right: Encrypted HTTPS -->
                    <div class="v73-comp-col https-side" id="v73-https-col">
                        <div class="v73-comp-hdr v73-green">
                            <span>🔒 HTTPS (Mã hóa)</span>
                        </div>
                        <div class="v73-packet-card">
                            <div class="v73-envelope-laser green-laser" id="v73-https-laser"></div>
                            <div class="v73-packet-envelope" id="v73-https-envelope">✉️
                                <div class="v73-packet-lock">🔒</div>
                            </div>
                            <div class="v73-packet-data" id="v73-https-data">
                                <span class="v73-comp-lbl">Dữ Liệu Mã Hóa:</span><br>
                                <span class="v73-text-cryptic">pass: k9#$f!Az</span>
                            </div>
                        </div>
                        <div style="font-size:18px; text-align:center; color:#94a3b8; font-weight:bold;">
                            Hacker chỉ nhận mã rác!
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_wifi_prevention') {
            canvas.innerHTML = sceneWrap(`
                <div class="v73-vpn-board">
                    <div class="v73-mitm-grid" style="align-items: center; position:relative;">
                        <!-- Client node -->
                        <div class="v73-mitm-node client">
                            <div class="v73-mitm-icon">📱</div>
                            <div class="v73-mitm-lbl" style="border-color:var(--v73-cyan); color:var(--v73-cyan);">Secure Client</div>
                        </div>

                        <!-- Server node -->
                        <div class="v73-mitm-node server">
                            <div class="v73-mitm-icon">🏦</div>
                            <div class="v73-mitm-lbl">Bank Server</div>
                        </div>

                        <!-- VPN Tunnel Hologram Cylinder -->
                        <div class="v73-vpn-tunnel" id="v73-vpn-pipe"></div>

                        <!-- VPN Shield icon center -->
                        <div class="v73-vpn-shield" id="v73-vpn-shield-icon">🛡️</div>
                        <div class="v73-shield-blast" id="v73-vpn-blast-1"></div>
                        <div class="v73-shield-blast" id="v73-vpn-blast-2" style="animation-delay:0.5s;"></div>

                        <!-- Hacker node attempting hijack from below -->
                        <div class="v73-mitm-node hacker" id="v73-vpn-hacker" style="position:absolute; bottom:60px; left:50%; transform:translateX(-50%);">
                            <div class="v73-mitm-icon" style="font-size:80px; color:var(--v73-red);">💻☠️</div>
                        </div>
                    </div>

                    <!-- SVG for Laser Bounce Attacks -->
                    <svg class="v73-mitm-svg">
                        <line class="v73-connection-line" id="v73-vpn-laser" x1="410" y1="600" x2="410" y2="375" stroke="#ef4444" stroke-width="4" stroke-dasharray="8 6" style="opacity:0;" />
                    </svg>

                    <!-- Safe packet traveling inside pipe -->
                    <div class="v73-mitm-packet" id="v73-vpn-packet" style="background:var(--v73-yellow); box-shadow:0 0 15px var(--v73-yellow);"></div>

                    <!-- Simulated Finger Cursor -->
                    <div class="v73-cursor" id="v73-vpn-cursor">👆</div>
                </div>
            `);
        }
    }

    // ── UPDATE FRAME ANIMATION LOOP ────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_wifi_hook') {
            const wifiIcon = canvas.querySelector('#v73-wifi-icon');
            const skull = canvas.querySelector('#v73-hacker-skull');
            const status = canvas.querySelector('#v73-wifi-status');
            const phone = canvas.querySelector('#v73-hook-phone');
            const body = canvas.querySelector('#v73-hook-body');
            const sonar1 = canvas.querySelector('#v73-sonar-1');
            const sonar2 = canvas.querySelector('#v73-sonar-2');

            if (progress < 0.45) {
                if (wifiIcon) {
                    wifiIcon.style.color = 'var(--v73-cyan)';
                    wifiIcon.style.filter = 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.4))';
                }
                if (skull) {
                    skull.style.opacity = '0';
                    skull.style.transform = 'translate(-50%, -50%) scale(0.5)';
                }
                if (status) {
                    status.textContent = 'Đang dùng: Coffee_Guest_FREE';
                    status.style.color = 'var(--v73-cyan)';
                }
                if (phone) {
                    phone.style.animation = 'none';
                    phone.style.transform = 'translateX(0)';
                }
                if (body) body.classList.remove('glitch-active');
                
                // Active blue sonar ripples
                if (sonar1) { sonar1.style.opacity = '1'; sonar1.style.borderColor = 'var(--v73-cyan)'; }
                if (sonar2) { sonar2.style.opacity = '1'; sonar2.style.borderColor = 'var(--v73-cyan)'; }
            }
            else if (progress >= 0.45 && progress < 0.55) {
                // Shake haptic warning when hijack starts
                const shake = (Math.floor(progress * 45) % 2 === 0) ? -6 : 6;
                if (phone) phone.style.transform = `translateX(${shake}px)`;
                if (wifiIcon) wifiIcon.style.color = '#eab308';
                if (status) status.textContent = 'Đang dò sóng Wi-Fi...';
                if (body) body.classList.add('glitch-active');
                
                if (sonar1) sonar1.style.borderColor = '#eab308';
                if (sonar2) sonar2.style.borderColor = '#eab308';
            }
            else {
                // Hacker completely intercepts (Red alert)
                if (wifiIcon) {
                    wifiIcon.style.color = 'var(--v73-red)';
                    wifiIcon.style.filter = 'drop-shadow(0 0 30px var(--v73-red))';
                }
                if (skull) {
                    skull.style.opacity = '1';
                    skull.style.transform = 'translate(-50%, -50%) scale(1.15)';
                }
                if (status) {
                    status.textContent = '⚠️ ĐÃ BỊ MITM NGHE LÉN!';
                    status.style.color = 'var(--v73-red)';
                }
                if (phone) phone.style.transform = 'translateX(0)';
                if (body) body.classList.add('glitch-active');
                
                // Red sonar ripples indicating malicious AP
                if (sonar1) { sonar1.style.opacity = '1'; sonar1.style.borderColor = 'var(--v73-red)'; }
                if (sonar2) { sonar2.style.opacity = '1'; sonar2.style.borderColor = 'var(--v73-red)'; }
            }
        }
        else if (slideId === 'slide_wifi_rogue_ap') {
            const rowFake = canvas.querySelector('#v73-wifi-fake');
            const checkFake = canvas.querySelector('#v73-check-fake');
            const cursor = canvas.querySelector('#v73-hand-cursor');
            const statusText = canvas.querySelector('#v73-fake-status');

            // 1. Cursor finger slides to the Fake Wi-Fi row
            if (cursor) {
                if (progress < 0.3) {
                    cursor.style.opacity = '1';
                    cursor.style.transform = 'translate(100px, 200px)';
                } else if (progress >= 0.3 && progress < 0.5) {
                    const p = (progress - 0.3) / 0.2;
                    cursor.style.transform = `translate(${100 - p * 60}px, ${200 - p * 150}px)`; // moves to row fake
                    cursor.style.opacity = '1';
                } else if (progress >= 0.5 && progress < 0.75) {
                    cursor.style.transform = 'translate(40px, 50px) scale(0.9)'; // clicking
                    cursor.style.opacity = '1';
                } else {
                    cursor.style.opacity = '0';
                    cursor.style.transform = 'translate(40px, 50px)';
                }
            }

            // 2. Select fake row, show red highlight alert of hijacked connection
            if (rowFake && checkFake) {
                if (progress >= 0.52) {
                    rowFake.classList.add('wifi-active');
                    checkFake.classList.add('checked');
                    if (progress >= 0.78) {
                        // Highlight as red AP leak at the end of the slide
                        rowFake.classList.add('wifi-hijacked-highlight');
                        checkFake.classList.add('checked-red');
                        if (statusText) {
                            statusText.textContent = 'CONNECTED (MITM RISK)';
                            statusText.style.color = 'var(--v73-red)';
                        }
                    } else {
                        rowFake.classList.remove('wifi-hijacked-highlight');
                        checkFake.classList.remove('checked-red');
                        if (statusText) {
                            statusText.textContent = '(Sóng Khỏe 5G)';
                            statusText.style.color = 'var(--v73-cyan)';
                        }
                    }
                } else {
                    rowFake.classList.remove('wifi-active', 'wifi-hijacked-highlight');
                    checkFake.classList.remove('checked', 'checked-red');
                    if (statusText) {
                        statusText.textContent = '(Sóng Khỏe 5G)';
                        statusText.style.color = 'var(--v73-cyan)';
                    }
                }
            }
        }
        else if (slideId === 'slide_wifi_mitm') {
            const pathDirect = canvas.querySelector('#v73-path-direct');
            const pathH1 = canvas.querySelector('#v73-path-h1');
            const pathH2 = canvas.querySelector('#v73-path-h2');
            const hackerNode = canvas.querySelector('#v73-hacker-node');
            const packCyan = canvas.querySelector('#v73-pack-cyan');
            const packRed = canvas.querySelector('#v73-pack-red');

            if (progress < 0.45) {
                // Direct connection client-server
                if (pathDirect) pathDirect.style.opacity = '1';
                if (pathH1) pathH1.style.opacity = '0';
                if (pathH2) pathH2.style.opacity = '0';
                if (hackerNode) hackerNode.style.transform = 'scale(0.85) translateY(20px)';
                
                // Cyan packets flow directly
                if (packCyan) {
                    packCyan.style.opacity = '1';
                    const run = (progress * 5) % 1.0;
                    const x = 120 + run * 580;
                    const y = 280 - Math.sin(run * Math.PI) * 120;
                    packCyan.style.left = `${x}px`;
                    packCyan.style.top = `${y}px`;
                }
                if (packRed) packRed.style.opacity = '0';
            }
            else {
                // Hijacked via MITM
                if (pathDirect) pathDirect.style.opacity = '0.15';
                if (pathH1) pathH1.style.opacity = '1';
                if (pathH2) pathH2.style.opacity = '1';
                
                // Spin hacker node slightly to show active packet interception
                if (hackerNode) {
                    const spin = Math.sin((progress - 0.45) * Math.PI * 8) * 3;
                    hackerNode.style.transform = `scale(1.1) translateY(0) rotate(${spin}deg)`;
                }
                
                if (packCyan) packCyan.style.opacity = '0';
                
                // Red packets flow hijacked path (Client -> Hacker -> Server)
                if (packRed) {
                    packRed.style.opacity = '1';
                    const run = ((progress - 0.45) * 5) % 1.0;
                    if (run < 0.5) {
                        // First leg: Client to Hacker (120,280 -> 410,480)
                        const subRun = run * 2;
                        packRed.style.left = `${120 + subRun * 290}px`;
                        packRed.style.top = `${280 + subRun * 200}px`;
                    } else {
                        // Second leg: Hacker to Server (410,480 -> 700,280)
                        const subRun = (run - 0.5) * 2;
                        packRed.style.left = `${410 + subRun * 290}px`;
                        packRed.style.top = `${480 - subRun * 200}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_wifi_http_https') {
            const httpData = canvas.querySelector('#v73-http-data');
            const httpsData = canvas.querySelector('#v73-https-data');
            const httpEnv = canvas.querySelector('#v73-http-envelope');
            const httpsEnv = canvas.querySelector('#v73-https-envelope');
            const httpCol = canvas.querySelector('#v73-http-col');
            const httpsCol = canvas.querySelector('#v73-https-col');
            const httpLaser = canvas.querySelector('#v73-http-laser');
            const httpsLaser = canvas.querySelector('#v73-https-laser');

            // 1. HTTP opens and displays plain data, sweep decrypt red laser
            if (progress >= 0.2) {
                if (httpData) httpData.classList.add('show');
                if (httpEnv) httpEnv.style.transform = 'scale(1.15) rotate(-5deg)';
                if (httpCol) httpCol.classList.add('alert-active');
                
                if (httpLaser) {
                    httpLaser.style.opacity = '1';
                    const sweep = Math.sin((progress - 0.2) * Math.PI * 4) * 50 + 50;
                    httpLaser.style.top = `${sweep}%`;
                }
            } else {
                if (httpData) httpData.classList.remove('show');
                if (httpEnv) httpEnv.style.transform = 'scale(1)';
                if (httpCol) httpCol.classList.remove('alert-active');
                if (httpLaser) httpLaser.style.opacity = '0';
            }

            // 2. HTTPS opens and displays encrypted rác data, sweep green laser
            if (progress >= 0.6) {
                if (httpsData) httpsData.classList.add('show');
                if (httpsEnv) httpsEnv.style.transform = 'scale(1.15) rotate(5deg)';
                if (httpsCol) {
                    httpsCol.style.background = 'rgba(16, 185, 129, 0.04)';
                    httpsCol.style.borderColor = 'var(--v73-green)';
                }
                
                if (httpsLaser) {
                    httpsLaser.style.opacity = '1';
                    const sweep = Math.sin((progress - 0.6) * Math.PI * 4) * 50 + 50;
                    httpsLaser.style.top = `${sweep}%`;
                }
            } else {
                if (httpsData) httpsData.classList.remove('show');
                if (httpsEnv) httpsEnv.style.transform = 'scale(1)';
                if (httpsCol) {
                    httpsCol.style.background = 'rgba(15, 23, 42, 0.8)';
                    httpsCol.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }
                if (httpsLaser) httpsLaser.style.opacity = '0';
            }
        }
        else if (slideId === 'slide_wifi_prevention') {
            const vpnPipe = canvas.querySelector('#v73-vpn-pipe');
            const vpnShield = canvas.querySelector('#v73-vpn-shield-icon');
            const vpnLaser = canvas.querySelector('#v73-vpn-laser');
            const vpnPacket = canvas.querySelector('#v73-vpn-packet');
            const cursor = canvas.querySelector('#v73-vpn-cursor');
            const hacker = canvas.querySelector('#v73-vpn-hacker');
            const blast1 = canvas.querySelector('#v73-vpn-blast-1');
            const blast2 = canvas.querySelector('#v73-vpn-blast-2');

            // 1. Cursor finger clicks to activate VPN (starts invisible, clicks, fades out)
            if (cursor) {
                if (progress < 0.2) {
                    cursor.style.opacity = '0';
                    cursor.style.transform = 'translate(100px, 150px)';
                } else if (progress >= 0.2 && progress < 0.45) {
                    const p = (progress - 0.2) / 0.25;
                    cursor.style.transform = `translate(${100 - p * 100}px, ${150 - p * 150}px)`; // moves to center shield
                    cursor.style.opacity = '1';
                } else if (progress >= 0.45 && progress < 0.58) {
                    cursor.style.transform = 'translate(0px, 0px) scale(0.9)'; // clicking
                    cursor.style.opacity = '1';
                } else {
                    cursor.style.opacity = '0';
                    cursor.style.transform = 'translate(0px, 0px)';
                }
            }

            // 2. VPN Tunnel activates (shows pipe and shield)
            if (progress >= 0.45) {
                if (vpnPipe) vpnPipe.style.opacity = '1';
                if (vpnShield) {
                    vpnShield.style.opacity = '1';
                    vpnShield.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            } else {
                if (vpnPipe) vpnPipe.style.opacity = '0';
                if (vpnShield) {
                    vpnShield.style.opacity = '0';
                    vpnShield.style.transform = 'translate(-50%, -50%) scale(0.6)';
                }
            }

            // 3. Hacker attempts to hijack but laser bounces off (hacker slides in and fades in at 0.6)
            if (hacker) {
                if (progress >= 0.6) {
                    hacker.style.opacity = '1';
                    hacker.style.transform = 'translateX(-50%) translateY(0)';
                    
                    if (vpnLaser) {
                        vpnLaser.style.opacity = '1';
                        const blink = Math.floor(progress * 15) % 2 === 0;
                        vpnLaser.setAttribute('stroke', blink ? '#ef4444' : '#10b981');
                    }
                    
                    // Activate defensive shield blast waves (ripple waves)
                    if (blast1) blast1.classList.add('active-blast');
                    if (blast2) blast2.classList.add('active-blast');
                } else {
                    hacker.style.opacity = '0';
                    hacker.style.transform = 'translateX(-50%) translateY(50px)';
                    if (vpnLaser) vpnLaser.style.opacity = '0';
                    if (blast1) blast1.classList.remove('active-blast');
                    if (blast2) blast2.classList.remove('active-blast');
                }
            }

            // 4. Safe packet flowing inside VPN pipe
            if (progress >= 0.48) {
                if (vpnPacket) {
                    vpnPacket.style.opacity = '1';
                    const run = ((progress - 0.48) * 4) % 1.0;
                    vpnPacket.style.left = `${150 + run * 480}px`; // flows inside pipe from client to server
                    vpnPacket.style.top = '365px';
                }
            } else {
                if (vpnPacket) vpnPacket.style.opacity = '0';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video73',
        topic: 'Giả Mạo Wi-Fi Công Cộng',
        episodeNum: 73,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video73 Plugin] Loaded: Wi-Fi MITM simulator with premium animations.');
})();
