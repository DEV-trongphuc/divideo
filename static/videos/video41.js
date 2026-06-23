/**
 * Video 41: HTTPS & SSL/TLS Handshake
 * Plugin file - contains renderGfx and updateFrame for video41
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_v41_1: [],
        slide_v41_2: [
            { text: 'Client Hello', start: 2.0, end: 6.5, class: 'active-cyan' },
            { text: 'Server Hello', start: 6.5, end: 12.0, class: 'active-purple' }
        ],
        slide_v41_3: [
            { text: 'Certificate Authority', start: 4.5, end: 8.5, class: 'active-cyan' },
            { text: 'hập lệ', start: 8.5, end: 12.5, class: 'active-good' }
        ],
        slide_v41_4: [
            { text: 'Khóa đối xứng', start: 2.5, end: 7.0, class: 'active-gold' },
            { text: 'Khóa công khai', start: 7.0, end: 12.0, class: 'active-purple' }
        ],
        slide_v41_5: [
            { text: 'Khóa cá nhân', start: 1.5, end: 5.5, class: 'active-purple' },
            { text: 'Khóa phiên', start: 5.5, end: 12.0, class: 'active-gold' }
        ],
        slide_v41_8: []
    };

    const customSlideIds = [
        'slide_v41_1', 'slide_v41_1b', 'slide_v41_1c', 'slide_v41_2', 'slide_v41_3', 'slide_v41_4', 'slide_v41_5'
    ];

    // Helpers to prevent flickering due to constant DOM innerHTML/textContent updates
    function safeSetHTML(el, html) {
        if (!el) return;
        if (el.innerHTML !== html) {
            el.innerHTML = html;
        }
    }

    // Helper: Safe text update
    function safeSetText(el, text) {
        if (!el) return;
        if (el.textContent !== text) {
            el.textContent = text;
        }
    }

    // Helper: Get offset position inside a zoom container
    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.45;
        return {
            x: (rect.left - contRect.left + rect.width / 2) / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    // Helper: Get offset position of an edge inside a zoom container
    function getEdgeOffset(el, container, edge) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.45;
        let x = rect.left - contRect.left;
        if (edge === 'right') {
            x += rect.width;
        } else if (edge === 'center') {
            x += rect.width / 2;
        }
        return {
            x: x / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    // Helper: Draw curved cubic bezier paths between nodes
    function drawSVGPath(canvas, pathId, startNode, endNode, container, strokeColor) {
        const path = canvas.querySelector(pathId);
        if (!path || !startNode || !endNode || !container) return;
        const start = getCenterOffset(startNode, container);
        const end = getCenterOffset(endNode, container);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        
        if (Math.abs(dy) < 15) {
            path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
        } else {
            path.setAttribute('d', `M ${start.x} ${start.y} C ${start.x + dx * 0.45} ${start.y}, ${end.x - dx * 0.45} ${end.y}, ${end.x} ${end.y}`);
        }
        path.setAttribute('stroke', strokeColor || 'var(--tls-cyan)');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
    }

    // Helper: Position packets along a linear/bezier path
    function getPathPoint(start, end, t) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 15) {
            return { x: start.x + dx * t, y: start.y + dy * t };
        }
        const mt = 1 - t;
        return {
            x: mt * mt * mt * start.x + 3 * mt * mt * t * (start.x + dx * 0.45)
                + 3 * mt * t * t * (end.x - dx * 0.45) + t * t * t * end.x,
            y: mt * mt * mt * start.y + 3 * mt * mt * t * start.y
                + 3 * mt * t * t * end.y + t * t * t * end.y
        };
    }

    function placePacket(wrap, start, end, t) {
        if (!wrap) return;
        const pt = getPathPoint(start, end, t);
        wrap.style.left = `${pt.x}px`;
        wrap.style.top = `${pt.y}px`;
        wrap.classList.add('visible');
    }

    function hidePacket(wrap) {
        if (wrap) {
            wrap.classList.remove('visible');
            wrap.style.opacity = '0';
        }
    }

    // GFX Generators
    function browserMockHTML(id, secure = false) {
        const lockIcon = secure ? 'lock' : 'unlock';
        const urlColorClass = secure ? 'secure' : '';
        const urlText = secure ? 'https://bank.com' : 'http://bank.com';
        
        return `
            <div class="v41-client-mockup" id="${id}-browser">
                <div class="v41-device-header">
                    <div class="v41-device-title">
                        <i data-lucide="laptop"></i>
                        Trình Duyệt (Client)
                    </div>
                </div>
                <div class="v41-browser-window">
                    <div class="v41-browser-bar">
                        <div class="v41-browser-dots">
                            <span class="v41-dot" style="background:#ef4444;"></span>
                            <span class="v41-dot" style="background:#f59e0b;"></span>
                            <span class="v41-dot" style="background:#10b981;"></span>
                        </div>
                        <div class="v41-browser-url ${urlColorClass}" id="${id}-url-bar">
                            <i data-lucide="${lockIcon}"></i>
                            <span id="${id}-url-text">${urlText}</span>
                        </div>
                    </div>
                    <div class="v41-browser-body" id="${id}-browser-body">
                        <!-- Content goes here -->
                    </div>
                </div>
            </div>
        `;
    }

    function serverMockHTML(id) {
        return `
            <div class="v41-server-mockup" id="${id}-server">
                <div class="v41-device-header">
                    <div class="v41-device-title" style="color:var(--tls-purple);">
                        <i data-lucide="server"></i>
                        Web Server (bank.com)
                    </div>
                </div>
                <div class="v41-server-body" id="${id}-server-body">
                    <!-- Content goes here -->
                </div>
            </div>
        `;
    }

    function caMockHTML(id) {
        return `
            <div class="v41-ca-mockup" id="${id}-ca">
                <div class="v41-device-header">
                    <div class="v41-device-title" style="color:var(--tls-green);">
                        <i data-lucide="shield-check"></i>
                        Certificate Authority (CA)
                    </div>
                </div>
                <div class="v41-ca-body" id="${id}-ca-status">
                    <div class="v41-ca-status-badge">CA Root Registry Active</div>
                </div>
            </div>
        `;
    }

    function hackerMockHTML(id) {
        return `
            <div class="v41-hacker-mockup" id="${id}-hacker">
                <div class="v41-device-header">
                    <div class="v41-device-title" style="color:var(--tls-red);">
                        <i data-lucide="skull"></i>
                        Hacker (Wifi Sniffer)
                    </div>
                </div>
                <div class="v41-hacker-body" id="${id}-hacker-body">
                    <div class="v41-hacker-terminal">
                        <span class="line cmd"># tcpdump -i wlan0 -A</span>
                        <span class="line status" id="${id}-hacker-status">SNIFFING...</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        } else {
            return;
        }

        if (slideId === 'slide_v41_1') {
            canvas.innerHTML = `
                <div class="v41-scene-wrapper">
                    <div style="position:absolute; inset:0; background-image:radial-gradient(rgba(0, 240, 255, 0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; margin-top: 30px;">
                        <div class="v41-logo-intro-container">
                            <div class="v41-logo-glow-ring"></div>
                            <div class="v41-logo-glow-ring inner"></div>
                            <div class="v41-giant-logo">
                                <i data-lucide="lock"></i>
                            </div>
                        </div>
                        <div class="v41-giant-https-text">HTTPS</div>
                        <div class="v41-sub-intro-text">
                            <span>SSL</span>
                            <span class="dot">•</span>
                            <span>TLS</span>
                            <span class="dot">•</span>
                            <span>SECURE CONNECTION</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_1b') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <div style="width:100%; display:flex; justify-content:center; margin-bottom:10px;">
                        ${hackerMockHTML('v41-p1b')}
                    </div>
                    <div class="v41-devices-row">
                        ${browserMockHTML('v41-p1b')}
                        ${serverMockHTML('v41-p1b')}
                    </div>

                    <!-- SVG Sniff Paths -->
                    <svg class="v41-svg-container">
                        <path id="v41-p1b-path-flow" class="v41-flow-path" />
                        <path id="v41-p1b-path-sniff" class="v41-flow-path" />
                    </svg>

                    <!-- Sniffed Packet -->
                    <div class="v41-packet-wrap" id="v41-p1b-pkt">
                        <div class="v41-packet-core red" id="v41-p1b-pkt-core">🔓</div>
                        <span class="v41-packet-label" id="v41-p1b-pkt-lbl">pass: 123456</span>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-hello" id="v41-p1b-tag">
                                <i data-lucide="unlock"></i> HTTP (Chữ Trần)
                            </span>
                            <span class="v41-status-text text-red" id="v41-p1b-status">Dữ liệu truyền không được mã hóa...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_1c') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <div class="v41-protocol-row">
                        <div class="v41-protocol-card ssl">
                            <div class="v41-protocol-badge con">DEPRECATED</div>
                            <div class="v41-protocol-icon"><i data-lucide="shield-alert"></i></div>
                            <h3>SSL</h3>
                            <span class="v41-protocol-name">Secure Sockets Layer</span>
                            <div class="v41-protocol-line"></div>
                            <p style="font-size:11.5px; line-height:1.4; color:#94a3b8; text-align:center; margin:0; padding:0 8px;">Phát triển bởi Netscape (1994-1996). Hiện đã bị khai tử hoàn toàn do nhiều lỗ hổng bảo mật nghiêm trọng.</p>
                        </div>
                        <div class="v41-protocol-card tls">
                            <div class="v41-protocol-badge pro">ACTIVE</div>
                            <div class="v41-protocol-icon"><i data-lucide="shield-check"></i></div>
                            <h3>TLS</h3>
                            <span class="v41-protocol-name">Transport Layer Security</span>
                            <div class="v41-protocol-line"></div>
                            <p style="font-size:11.5px; line-height:1.4; color:#94a3b8; text-align:center; margin:0; padding:0 8px;">Bản nâng cấp mã hóa mạnh mẽ từ năm 1999. Phiên bản TLS 1.3 đang bảo vệ toàn bộ kết nối web ngày nay.</p>
                        </div>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-secure">
                                <i data-lucide="shield"></i> SSL vs TLS
                            </span>
                            <span class="v41-status-text text-cyan" id="v41-p1c-status">TLS thay thế hoàn toàn SSL từ năm 1999!</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_2') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <div class="v41-devices-row">
                        ${browserMockHTML('v41-p2')}
                        ${serverMockHTML('v41-p2')}
                    </div>

                    <!-- SVG Network Paths -->
                    <svg class="v41-svg-container">
                        <path id="v41-p2-path-client" class="v41-flow-path" />
                        <path id="v41-p2-path-server" class="v41-flow-path" />
                    </svg>

                    <!-- Packets -->
                    <div class="v41-packet-wrap" id="v41-p2-pkt">
                        <!-- Will display dynamically: Client Hello or Server Hello -->
                        <div class="v41-packet-core" id="v41-p2-pkt-core">👋</div>
                        <span class="v41-packet-label" id="v41-p2-pkt-lbl">Client Hello</span>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-hello">
                                <i data-lucide="handshake"></i> CLIENT & SERVER HELLO
                            </span>
                            <span class="v41-status-text text-cyan" id="v41-p2-status">Bắt đầu bắt tay...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_3') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <!-- CA in middle top, Client left, Server right -->
                    <div style="width:100%; display:flex; justify-content:center; margin-bottom:10px;">
                        ${caMockHTML('v41-p3')}
                    </div>
                    <div class="v41-devices-row">
                        ${browserMockHTML('v41-p3')}
                        ${serverMockHTML('v41-p3')}
                    </div>

                    <svg class="v41-svg-container">
                        <path id="v41-p3-path-verify" class="v41-flow-path" />
                        <path id="v41-p3-path-reply" class="v41-flow-path" />
                    </svg>

                    <!-- CA verification badge overlay -->
                    <div class="v41-verify-shield" id="v41-p3-shield">
                        <i data-lucide="shield-check"></i>
                        <span>VERIFIED BY CA</span>
                    </div>

                    <div class="v41-packet-wrap" id="v41-p3-pkt">
                        <div class="v41-packet-core yellow" id="v41-p3-pkt-core">📜</div>
                        <span class="v41-packet-label" id="v41-p3-pkt-lbl">Xác thực chứng chỉ</span>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-verify">
                                <i data-lucide="shield-alert"></i> XÁC THỰC CHỨNG CHỈ
                            </span>
                            <span class="v41-status-text text-green" id="v41-p3-status">Trình duyệt xác thực...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_4') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <div class="v41-devices-row">
                        <!-- Browser container with key creation overlay -->
                        <div style="position:relative;">
                            ${browserMockHTML('v41-p4')}
                            <div class="v41-key-overlay" id="v41-p4-key-overlay">
                                <div class="v41-key-overlay-icon">
                                    <i data-lucide="key-round"></i>
                                </div>
                                <span>TẠO KHÓA PHIÊN (Session Key)</span>
                            </div>
                        </div>
                        ${serverMockHTML('v41-p4')}
                    </div>

                    <svg class="v41-svg-container">
                        <path id="v41-p4-path-send" class="v41-flow-path" />
                    </svg>

                    <div class="v41-packet-wrap" id="v41-p4-pkt">
                        <div class="v41-packet-core yellow">🔒</div>
                        <span class="v41-packet-label">Session Key (Đã Khóa)</span>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-exchange">
                                <i data-lucide="key"></i> TRAO ĐỔI KHÓA PHIÊN
                            </span>
                            <span class="v41-status-text text-yellow" id="v41-p4-status">Sinh khóa đối xứng...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v41_5') {
            canvas.innerHTML = `
                <div class="v41-simulation-layout">
                    <div class="v41-devices-row">
                        ${browserMockHTML('v41-p5', true)}
                        ${serverMockHTML('v41-p5')}
                    </div>

                    <svg class="v41-svg-container">
                        <path id="v41-p5-path-flow" class="v41-flow-path" />
                    </svg>

                    <!-- Encrypted packets flowing continuously -->
                    <div class="v41-packet-wrap" id="v41-p5-pkt-a">
                        <div class="v41-packet-core cyan" id="v41-p5-pkt-core">🔒</div>
                        <span class="v41-packet-label" id="v41-p5-pkt-lbl">Dữ liệu E2E (AES)</span>
                    </div>

                    <div class="v41-glass v41-status-card">
                        <div class="v41-status-inner">
                            <span class="v41-key-tag step-secure">
                                <i data-lucide="lock"></i> KÊNH TRUYỀN BẢO MẬT
                            </span>
                            <span class="v41-status-text text-green" id="v41-p5-status">Thiết lập kênh HTTPS thành công!</span>
                        </div>
                    </div>
                </div>
            `;
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const container = canvas.querySelector('.v41-simulation-layout');

        if (slideId === 'slide_v41_1') {
            // Intro
        }
        else if (slideId === 'slide_v41_1b') {
            const browserBody = canvas.querySelector('#v41-p1b-browser-body');
            const serverBody = canvas.querySelector('#v41-p1b-server-body');
            const status = canvas.querySelector('#v41-p1b-status');
            const statusTag = canvas.querySelector('#v41-p1b-tag');
            const pkt = canvas.querySelector('#v41-p1b-pkt');
            const pktCore = canvas.querySelector('#v41-p1b-pkt-core');
            const pktLbl = canvas.querySelector('#v41-p1b-pkt-lbl');
            const urlBar = canvas.querySelector('#v41-p1b-url-bar');
            const urlText = canvas.querySelector('#v41-p1b-url-text');
            const hackerBody = canvas.querySelector('#v41-p1b-hacker-body');
            const hacker = canvas.querySelector('#v41-p1b-hacker');

            const browser = canvas.querySelector('#v41-p1b-browser');
            const server = canvas.querySelector('#v41-p1b-server');
            const hackerNode = canvas.querySelector('#v41-p1b-hacker');

            const offC = getCenterOffset(browser, container);
            const offS = getCenterOffset(server, container);
            const offH = getCenterOffset(hackerNode, container);

            // Edge-to-edge path positions to prevent text overlapping
            const startPt = getEdgeOffset(browser, container, 'right');
            const endPt = getEdgeOffset(server, container, 'left');
            const midPt = { x: (startPt.x + endPt.x) / 2, y: (startPt.y + endPt.y) / 2 };

            // Draw SVG paths dynamically on every frame to avoid CSS transition delay issues
            const pathFlow = canvas.querySelector('#v41-p1b-path-flow');
            if (pathFlow) {
                pathFlow.setAttribute('d', `M ${startPt.x} ${startPt.y} L ${endPt.x} ${endPt.y}`);
                pathFlow.setAttribute('stroke', 'rgba(255,255,255,0.15)');
                pathFlow.setAttribute('stroke-width', '2.5');
                pathFlow.setAttribute('fill', 'none');
            }

            const pathSniff = canvas.querySelector('#v41-p1b-path-sniff');
            if (pathSniff) {
                pathSniff.setAttribute('d', `M ${offH.x} ${offH.y + 82} L ${midPt.x} ${midPt.y}`);
                pathSniff.setAttribute('stroke', 'var(--tls-red)');
                pathSniff.setAttribute('stroke-width', '2.5');
                pathSniff.setAttribute('stroke-dasharray', '4 4');
                pathSniff.setAttribute('fill', 'none');
            }

            if (progress < 0.5) {
                // HTTP Mode
                const t = progress / 0.5;
                if (urlBar) urlBar.className = 'v41-browser-url';
                if (urlText) safeSetText(urlText, 'http://bank.com');
                if (hacker) hacker.classList.add('active-glow');
                
                safeSetHTML(browserBody, '<div class="v41-status-label-big red" style="border-color:var(--tls-red); color:var(--tls-red); background:rgba(239,68,68,0.08); width:100%;"><i data-lucide="unlock" style="width:16px;height:16px;margin-right:6px;"></i>Gửi HTTP Request</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple" style="width:100%;"><i data-lucide="help-circle" style="width:16px;height:16px;margin-right:6px;"></i>Đang nhận...</div>');
                
                if (statusTag) {
                    statusTag.style.borderColor = 'var(--tls-red)';
                    statusTag.style.color = 'var(--tls-red)';
                    statusTag.style.background = 'rgba(239,68,68,0.1)';
                    statusTag.innerHTML = '<i data-lucide="unlock" style="width:18px;height:18px;"></i> HTTP (Chữ Trần)';
                }
                
                if (t > 0.9) {
                    hidePacket(pkt);
                } else {
                    placePacket(pkt, startPt, endPt, t);
                }

                if (pktCore) {
                    pktCore.className = 'v41-packet-core red';
                    safeSetText(pktCore, '🔓');
                }
                if (pktLbl) safeSetText(pktLbl, 'pass: 123456');

                if (t > 0.4) {
                    safeSetHTML(hackerBody, `
                        <div class="v41-hacker-terminal">
                            <span class="line cmd"># tcpdump -i wlan0 -A</span>
                            <span class="line warning" style="color:var(--tls-red); font-weight:bold;">[INTERCEPTED] Plaintext HTTP</span>
                            <span class="line success" style="color:var(--tls-red); font-weight:bold; font-size:13px; text-shadow:0 0 8px rgba(239,68,68,0.5);">➔ pass: 123456</span>
                        </div>
                    `);
                    safeSetText(status, 'HTTP gửi chữ trần: Hacker nằm giữa dễ dàng đọc trọn mật khẩu!');
                } else {
                    safeSetHTML(hackerBody, `
                        <div class="v41-hacker-terminal">
                            <span class="line cmd"># tcpdump -i wlan0 -A</span>
                            <span class="line status">LISTENING ON PORT 80...</span>
                        </div>
                    `);
                    safeSetText(status, 'Khi dùng HTTP, dữ liệu đi qua Internet hoàn toàn không được mã hóa');
                }
            } else {
                // HTTPS Mode
                const t = (progress - 0.5) / 0.5;
                if (urlBar) urlBar.className = 'v41-browser-url secure';
                if (urlText) safeSetText(urlText, 'https://bank.com');
                if (hacker) hacker.classList.remove('active-glow');

                safeSetHTML(browserBody, '<div class="v41-status-label-big green" style="width:100%;"><i data-lucide="lock" style="width:16px;height:16px;margin-right:6px;"></i>Gửi HTTPS Request</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big green" style="width:100%;"><i data-lucide="key" style="width:16px;height:16px;margin-right:6px;"></i>Nhận & Giải mã AES</div>');
                
                if (statusTag) {
                    statusTag.style.borderColor = 'var(--tls-green)';
                    statusTag.style.color = 'var(--tls-green)';
                    statusTag.style.background = 'rgba(16,185,129,0.1)';
                    statusTag.innerHTML = '<i data-lucide="lock" style="width:18px;height:18px;"></i> HTTPS (Mã Hóa)';
                }

                if (t > 0.9) {
                    hidePacket(pkt);
                } else {
                    placePacket(pkt, startPt, endPt, t);
                }

                if (pktCore) {
                    pktCore.className = 'v41-packet-core cyan';
                    safeSetText(pktCore, '🔒');
                }
                if (pktLbl) safeSetText(pktLbl, 'pass: 8f92ac...');

                if (t > 0.4) {
                    safeSetHTML(hackerBody, `
                        <div class="v41-hacker-terminal">
                            <span class="line cmd"># tcpdump -i wlan0 -A</span>
                            <span class="line status" style="color:#64748b;">[INTERCEPTED] Encrypted HTTPS</span>
                            <span class="line info" style="color:#64748b; font-family:monospace; font-size:11px;">➔ pass: 8f92ac79b88e1460...</span>
                        </div>
                    `);
                    safeSetText(status, 'HTTPS mã hóa dữ liệu: Hacker thu được bưu thiếp đã khóa kín, không thể xem!');
                } else {
                    safeSetHTML(hackerBody, `
                        <div class="v41-hacker-terminal">
                            <span class="line cmd"># tcpdump -i wlan0 -A</span>
                            <span class="line status">MONITORING PORT 443...</span>
                        </div>
                    `);
                    safeSetText(status, 'Khi dùng HTTPS, dữ liệu được đóng gói mã hóa an toàn nhờ SSL/TLS');
                }
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v41_1c') {
            const sslCard = canvas.querySelector('.v41-protocol-card.ssl');
            const tlsCard = canvas.querySelector('.v41-protocol-card.tls');
            const status = canvas.querySelector('#v41-p1c-status');

            if (progress < 0.5) {
                if (sslCard) sslCard.classList.add('active-glow-red');
                if (tlsCard) tlsCard.classList.remove('active-glow-cyan');
                safeSetText(status, 'SSL (Secure Sockets Layer) ra đời trước, nay đã lỗi thời và bị khai tử.');
            } else {
                if (sslCard) sslCard.classList.remove('active-glow-red');
                if (tlsCard) tlsCard.classList.add('active-glow-cyan');
                safeSetText(status, 'TLS (Transport Layer Security) là bản kế thừa an toàn đang bảo vệ web hiện tại.');
            }
        }
        else if (slideId === 'slide_v41_2') {
            const browserBody = canvas.querySelector('#v41-p2-browser-body');
            const serverBody = canvas.querySelector('#v41-p2-server-body');
            const status = canvas.querySelector('#v41-p2-status');
            const pkt = canvas.querySelector('#v41-p2-pkt');
            const pktCore = canvas.querySelector('#v41-p2-pkt-core');
            const pktLbl = canvas.querySelector('#v41-p2-pkt-lbl');

            const browser = canvas.querySelector('#v41-p2-browser');
            const server = canvas.querySelector('#v41-p2-server');

            drawSVGPath(canvas, '#v41-p2-path-client', browser, server, container, 'var(--tls-cyan)');
            drawSVGPath(canvas, '#v41-p2-path-server', server, browser, container, 'var(--tls-purple)');

            const offC = getCenterOffset(browser, container);
            const offS = getCenterOffset(server, container);

            if (progress < 0.45) {
                // Client Hello
                const t = progress / 0.45;
                safeSetHTML(browserBody, '<div class="v41-status-label-big cyan">Gửi Client Hello 👋</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Đang chờ Client Hello...</div>');
                placePacket(pkt, offC, offS, t);
                if (pktCore) safeSetText(pktCore, '👋');
                safeSetText(pktLbl, 'Client Hello');
                safeSetText(status, '1. Trình duyệt gửi Client Hello (TLS v1.3, Cipher Suites)');
            }
            else if (progress >= 0.45 && progress < 0.85) {
                // Server Hello & Cert
                const t = (progress - 0.45) / 0.4;
                safeSetHTML(browserBody, '<div class="v41-status-label-big cyan">Đang chờ Server Hello...</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Gửi Server Hello + Cert 📜</div>');
                placePacket(pkt, offS, offC, t);
                if (pktCore) {
                    pktCore.className = 'v41-packet-core purple';
                    safeSetText(pktCore, '📜');
                }
                safeSetText(pktLbl, 'Server Hello + Cert');
                safeSetText(status, '2. Server gửi Server Hello + SSL Certificate (Khóa công khai)');
            }
            else {
                // Done Hello exchange
                hidePacket(pkt);
                safeSetHTML(browserBody, `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                        <div style="color:var(--tls-purple); font-weight:bold; font-size:14px;">Đã Nhận Chứng Chỉ</div>
                        <div class="v41-cert-badge"><i data-lucide="award"></i> bank.com Cert</div>
                    </div>
                `);
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Chờ Trình duyệt xác thực...</div>');
                safeSetText(status, '✓ Đã hoàn thành trao đổi lời chào!');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v41_3') {
            const browserBody = canvas.querySelector('#v41-p3-browser-body');
            const serverBody = canvas.querySelector('#v41-p3-server-body');
            const status = canvas.querySelector('#v41-p3-status');
            const caStatus = canvas.querySelector('#v41-p3-ca-status');
            const shield = canvas.querySelector('#v41-p3-shield');
            const pkt = canvas.querySelector('#v41-p3-pkt');
            const pktCore = canvas.querySelector('#v41-p3-pkt-core');
            const pktLbl = canvas.querySelector('#v41-p3-pkt-lbl');
            const urlBar = canvas.querySelector('#v41-p3-url-bar');
            const urlText = canvas.querySelector('#v41-p3-url-text');

            const browser = canvas.querySelector('#v41-p3-browser');
            const ca = canvas.querySelector('#v41-p3-ca');

            drawSVGPath(canvas, '#v41-p3-path-verify', browser, ca, container, 'var(--tls-yellow)');
            drawSVGPath(canvas, '#v41-p3-path-reply', ca, browser, container, 'var(--tls-cyan)');

            const offC = getCenterOffset(browser, container);
            const offCA = getCenterOffset(ca, container);

            if (progress < 0.4) {
                // Request CA
                const t = progress / 0.4;
                safeSetHTML(browserBody, '<div class="v41-status-label-big yellow">Đang gửi yêu cầu xác thực...</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Đang chờ xác thực...</div>');
                placePacket(pkt, offC, offCA, t);
                if (pktCore) {
                    pktCore.className = 'v41-packet-core yellow';
                    safeSetText(pktCore, '📜');
                }
                safeSetText(pktLbl, 'Gửi Chứng Chỉ');
                if (shield) shield.classList.remove('active');
                safeSetText(status, '1. Trình duyệt gửi truy vấn kiểm tra chữ ký CA của chứng chỉ');
                safeSetHTML(caStatus, '<div class="v41-ca-status-badge yellow">Đang kiểm tra chữ ký...</div>');
            }
            else if (progress >= 0.4 && progress < 0.8) {
                // CA Response OK
                const t = (progress - 0.4) / 0.4;
                safeSetHTML(browserBody, '<div class="v41-status-label-big green">Chữ ký CA Root Hợp Lệ! ✓</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Đang chờ xác thực...</div>');
                placePacket(pkt, offCA, offC, t);
                if (pktCore) {
                    pktCore.className = 'v41-packet-core cyan';
                    safeSetText(pktCore, '✓');
                }
                safeSetText(pktLbl, 'Xác nhận hợp lệ');
                if (shield) shield.classList.add('active');
                safeSetText(status, '2. CA phản hồi OK: Chứng chỉ hợp lệ và tin cậy!');
                safeSetHTML(caStatus, '<div class="v41-ca-status-badge">Chứng chỉ HỢP LỆ ✓</div>');
            }
            else {
                // Verify finished
                hidePacket(pkt);
                if (shield) shield.classList.remove('active');
                safeSetHTML(browserBody, `
                    <div class="v41-browser-alert secure" style="font-size:14px !important; padding:10px 16px !important;">
                        <i data-lucide="shield-check" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;"></i>
                        Xác Minh Tin Cậy
                    </div>
                `);
                safeSetHTML(serverBody, '<div class="v41-status-label-big green">Xác thực thành công! ✓</div>');
                if (urlBar) urlBar.className = 'v41-browser-url secure';
                if (urlText) safeSetText(urlText, 'https://bank.com');
                safeSetText(status, '✓ Trình duyệt xác minh server chính chủ, không bị hacker giả mạo!');
                safeSetHTML(caStatus, '<div class="v41-ca-status-badge">Chứng chỉ HỢP LỆ ✓</div>');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v41_4') {
            const browserBody = canvas.querySelector('#v41-p4-browser-body');
            const serverBody = canvas.querySelector('#v41-p4-server-body');
            const status = canvas.querySelector('#v41-p4-status');
            const pkt = canvas.querySelector('#v41-p4-pkt');
            const keyOverlay = canvas.querySelector('#v41-p4-key-overlay');

            const browser = canvas.querySelector('#v41-p4-browser');
            const server = canvas.querySelector('#v41-p4-server');

            drawSVGPath(canvas, '#v41-p4-path-send', browser, server, container, 'var(--tls-yellow)');

            const offC = getCenterOffset(browser, container);
            const offS = getCenterOffset(server, container);

            if (progress < 0.35) {
                hidePacket(pkt);
                if (keyOverlay) keyOverlay.classList.add('active');
                safeSetHTML(browserBody, '<div class="v41-status-label-big yellow">Sinh Khóa Phiên... 🔑</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Chờ nhận Khóa...</div>');
                safeSetText(status, '1. Trình duyệt tự sinh Khóa phiên đối xứng (Session Key)');
            }
            else if (progress >= 0.35 && progress < 0.75) {
                const t = (progress - 0.35) / 0.4;
                if (keyOverlay) keyOverlay.classList.remove('active');
                placePacket(pkt, offC, offS, t);
                safeSetHTML(browserBody, '<div class="v41-status-label-big yellow">Gửi Khóa Phiên đã mã hóa 🔒</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big purple">Đang nhận Khóa...</div>');
                safeSetText(status, '2. Lấy Khóa công khai của Server khóa chặt Khóa phiên lại');
            }
            else {
                hidePacket(pkt);
                if (keyOverlay) keyOverlay.classList.remove('active');
                safeSetHTML(browserBody, '<div class="v41-status-label-big green">Đã gửi Khóa phiên! ✓</div>');
                safeSetHTML(serverBody, '<div class="v41-status-label-big green">Giải mã thành công! 🔑</div>');
                safeSetText(status, '3. Gửi Session Key đã khóa sang cho Server');
            }
        }
        else if (slideId === 'slide_v41_5') {
            const browserBody = canvas.querySelector('#v41-p5-browser-body');
            const serverBody = canvas.querySelector('#v41-p5-server-body');
            const status = canvas.querySelector('#v41-p5-status');
            const pktA = canvas.querySelector('#v41-p5-pkt-a');
            const pktCore = canvas.querySelector('#v41-p5-pkt-core');
            const pktLbl = canvas.querySelector('#v41-p5-pkt-lbl');

            const browser = canvas.querySelector('#v41-p5-browser');
            const server = canvas.querySelector('#v41-p5-server');

            drawSVGPath(canvas, '#v41-p5-path-flow', browser, server, container, 'var(--tls-green)');

            const offC = getCenterOffset(browser, container);
            const offS = getCenterOffset(server, container);

            if (progress < 0.4) {
                hidePacket(pktA);
                safeSetHTML(browserBody, '<div class="v41-status-label-big green">Đã có Khóa phiên 🔑</div>');
                safeSetHTML(serverBody, `
                    <div class="v41-status-label-big purple" style="flex-direction:column; gap:4px;">
                        <span>Giải mã Khóa phiên...</span>
                        <span style="font-size:11px; opacity:0.8; font-weight:normal;">(Bằng Khóa cá nhân)</span>
                    </div>
                `);
                safeSetText(status, '1. Server dùng Khóa cá nhân để giải mã lấy Khóa phiên');
            }
            else {
                // Continuous data transmission with Session key encryption
                const t = ((progress - 0.4) / 0.6) % 1.0;
                placePacket(pktA, offC, offS, t);
                
                if (t < 0.5) {
                    if (pktCore) {
                        pktCore.className = 'v41-packet-core cyan';
                        safeSetText(pktCore, '🔒');
                    }
                    if (pktLbl) safeSetText(pktLbl, 'Mã hóa AES');
                } else {
                    if (pktCore) {
                        pktCore.className = 'v41-packet-core purple';
                        safeSetText(pktCore, '🔑');
                    }
                    if (pktLbl) safeSetText(pktLbl, 'Dữ liệu E2E');
                }

                safeSetHTML(browserBody, `
                    <div class="v41-status-label-big green">
                        <i data-lucide="lock" style="width:14px;height:14px;"></i> Mã hóa AES 🛡️
                    </div>
                `);
                safeSetHTML(serverBody, `
                    <div class="v41-status-label-big green">
                        <i data-lucide="unlock" style="width:14px;height:14px;"></i> Giải mã AES 🛡️
                    </div>
                `);
                safeSetText(status, '2. Kênh truyền HTTPS đã mở! Mọi dữ liệu truyền qua lại đều được mã hóa bằng Khóa phiên');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video41',
        keywordsData: keywordsData,
        customSlideIds: customSlideIds,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };
})();
