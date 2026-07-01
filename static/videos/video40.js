/**
 * Video 40: End-to-End Encryption (E2EE)
 * Plugin file - chứa toàn bộ slide animation/HTML cho video40
 * Load động bởi app.js khi user chọn video40
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_v40_1: [],
        slide_v40_2: [
            { text: 'chữ trần', start: 3.0, end: 7.5, class: 'active-bad' },
            { text: 'đọc trọn vẹn', start: 7.5, end: 12.0, class: 'active-bad' }
        ],
        slide_v40_3: [
            { text: 'Khóa công khai', start: 4.5, end: 9.5, class: 'active-gold' },
            { text: 'Khóa cá nhân', start: 9.5, end: 14.5, class: 'active-good' }
        ],
        slide_v40_4: [
            { text: 'khóa chặt', start: 3.5, end: 7.5, class: 'active-good' },
            { text: 'ký tự rác', start: 7.5, end: 12.0, class: 'active-gold' }
        ],
        slide_v40_5: [
            { text: 'server trung gian', start: 2.0, end: 6.5, class: 'active-gold' },
            { text: 'chịu chết', start: 6.5, end: 11.0, class: 'active-bad' }
        ],
        slide_v40_6: [
            { text: 'Chìa khóa cá nhân', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'giải mã', start: 8.0, end: 12.0, class: 'active-good' }
        ],
        slide_v40_7: [
            { text: 'bộ nhớ máy', start: 4.0, end: 9.5, class: 'active-gold' },
            { text: 'app mod', start: 9.5, end: 14.5, class: 'active-bad' },
            { text: 'giữ lại', start: 14.5, end: 18.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_v40_1', 'slide_v40_2', 'slide_v40_3', 'slide_v40_4', 'slide_v40_5', 'slide_v40_6', 'slide_v40_7'
    ];

    // Helpers to prevent flickering due to constant DOM innerHTML/textContent updates
    function safeSetHTML(el, html) {
        if (!el) return;
        if (el.innerHTML !== html) {
            el.innerHTML = html;
        }
    }

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
        path.setAttribute('stroke', strokeColor || 'var(--e2ee-purple)');
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

    function placePacketOnCurve(wrap, start, end, tStart, tEnd, t) {
        if (!wrap) return;
        const tCurve = tStart + (tEnd - tStart) * t;
        const pt = getPathPoint(start, end, tCurve);
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

    // Helper to generate keyboard layouts for mockup
    function makeKeyboardHTML() {
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];
        let html = `<div class="v40-keyboard">`;
        rows.forEach((row) => {
            html += `<div class="v40-keyboard-row">`;
            row.forEach((key) => {
                html += `<div class="v40-key key-${key}">${key}</div>`;
            });
            html += `</div>`;
        });
        // Spacebar row
        html += `
            <div class="v40-keyboard-row" style="margin-top:2px;">
                <div class="v40-key space key-space">space</div>
            </div>
        </div>`;
        return html;
    }

    // GFX Generators
    function phoneMockHTML(id, userLabel, options = {}) {
        const showKeyboard = options.showKeyboard || false;
        const placeholderText = options.placeholderText || 'Nhập tin nhắn...';
        const typingText = options.typingText || '';
        const isPeer = options.isPeer || false;
        const avatarChar = userLabel.includes('B') ? 'B' : 'A';
        const avatarClass = isPeer ? 'peer' : '';

        // Status bar HTML
        const statusBarHTML = `
            <div class="v40-status-bar">
                <span>09:41</span>
                <div class="v40-phone-island"></div>
                <div class="status-right">
                    <i data-lucide="signal" style="width:9px;height:9px;"></i>
                    <i data-lucide="wifi" style="width:9px;height:9px;"></i>
                    <i data-lucide="battery" style="width:10px;height:10px;"></i>
                </div>
            </div>
        `;

        // App Header HTML
        const appHeaderHTML = `
            <div class="v40-app-header">
                <div class="v40-app-header-left">
                    <i data-lucide="chevron-left" style="width:12px;height:12px;color:var(--e2ee-blue);"></i>
                    <div class="v40-app-header-avatar ${avatarClass}">${avatarChar}</div>
                    <div class="v40-app-header-info">
                        <span class="v40-app-header-name">${userLabel}</span>
                        <span class="v40-app-header-status ${typingText ? 'typing' : ''}">${typingText || 'Online'}</span>
                    </div>
                </div>
                <div class="v40-app-header-right">
                    <i data-lucide="phone"></i>
                    <i data-lucide="video"></i>
                    <i data-lucide="more-vertical"></i>
                </div>
            </div>
        `;

        // Bottom input bar HTML
        const inputFieldClass = typingText ? 'v40-phone-input-field' : 'v40-phone-input-field placeholder';
        const inputBarHTML = `
            <div class="v40-phone-input-bar">
                <i data-lucide="smile" style="color:#aaa;"></i>
                <div class="${inputFieldClass}" id="${id}-input-display">${typingText || placeholderText}</div>
                <i data-lucide="send"></i>
            </div>
        `;

        return `
            <div class="v40-phone-mockup" id="${id}-phone">
                ${statusBarHTML}
                ${appHeaderHTML}
                <div class="v40-phone-body" id="${id}-phone-chat">
                    <!-- Chat bubbles will go here -->
                </div>
                ${inputBarHTML}
                ${showKeyboard ? makeKeyboardHTML() : ''}
                <div class="v40-unsend-overlay" id="${id}-unsend-screen">
                    <i data-lucide="trash-2" style="width:24px;height:24px;margin-bottom:4px;"></i>
                    <span>TIN NHẮN ĐÃ THU HỒI</span>
                </div>
            </div>
        `;
    }

    function serverMockHTML(id, title) {
        return `
            <div class="v40-server-mockup" id="${id}-server">
                <div class="v40-server-header">
                    <span class="v40-server-title">
                        <i data-lucide="server" style="width:11px;height:11px;"></i>
                        ${title}
                    </span>
                    <div class="v40-server-led active"></div>
                </div>
                <div class="v40-server-terminal">
                    <span class="v40-term-title">Server Logs: Idle</span>
                    <div class="v40-term-log" id="${id}-term-log">Waiting for packet...</div>
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

        if (slideId === 'slide_v40_1') {
            canvas.innerHTML = `
                <div class="v40-scene-wrapper">
                    <div class="v40-grid-bg orange-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(245,158,11,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                        <div class="v40-logo-intro-container">
                            <div class="v40-logo-glow-ring"></div>
                            <div class="v40-logo-glow-ring inner"></div>
                            <div class="v40-giant-logo">
                                <i data-lucide="shield-check" style="width:96px;height:96px;"></i>
                            </div>
                        </div>
                        
                        <!-- Premium Glass Card (Styled in beautiful Orange/Gold like cookie video) -->
                        <div class="v40-glass" style="text-align: center; width: 440px; padding: 22px 28px; border-radius: 20px; border: 1.5px solid rgba(245, 158, 11, 0.4); background: rgba(13, 17, 28, 0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 0 15px rgba(245, 158, 11, 0.4), 0 20px 40px rgba(0,0,0,0.55); margin-top: 15px;">
                            <div style="font-family:'Fira Code', monospace; font-size: 16px; font-weight: bold; color: #f59e0b; line-height: 1.45;" id="v40-intro-label">
                                ${slide.title || 'Mã Hóa Đầu Cuối E2EE:<br>Bí Ẩn Thu Hồi Tin Nhắn Vẫn Bị Đọc'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_2') {
            // Slide 2: Plaintext transmission
            canvas.innerHTML = `
                <div class="v40-simulation-layout">
                    <div class="v40-devices-row">
                        ${phoneMockHTML('v40-p2a', 'User A (Gửi)', { isPeer: false })}
                        ${serverMockHTML('v40-p2s', 'Ứng dụng Server')}
                        ${phoneMockHTML('v40-p2b', 'User B (Nhận)', { isPeer: true })}
                    </div>

                    <!-- SVG Network Paths -->
                    <svg class="v40-svg-container">
                        <path id="v40-p2-path-a" class="v40-flow-path" />
                        <path id="v40-p2-path-b" class="v40-flow-path" />
                    </svg>

                    <!-- Packets -->
                    <div class="v40-packet-wrap" id="v40-p2-pkt">
                        <div class="v40-packet-core plain">💬</div>
                        <span class="v40-packet-label">"Mật mật"</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag no-encrypt">
                                <i data-lucide="unlocked"></i> KHÔNG MÃ HÓA
                            </span>
                            <span class="v40-status-text text-orange" id="v40-p2-status">Khởi động...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_3') {
            // Slide 3: Public / Private Keys Generation
            canvas.innerHTML = `
                <div class="v40-simulation-layout">
                    <div class="v40-devices-row" style="justify-content: space-around;">
                        ${phoneMockHTML('v40-p3a', 'User A (Gửi)', { isPeer: false })}
                        ${phoneMockHTML('v40-p3b', 'User B (Nhận)', { isPeer: true })}
                    </div>

                    <!-- SVG Network Paths -->
                    <svg class="v40-svg-container">
                        <path id="v40-p3-path-key" class="v40-flow-path" />
                    </svg>

                    <!-- Packet carrying Public Key (Lock) -->
                    <div class="v40-packet-wrap" id="v40-p3-pkt">
                        <div class="v40-packet-core">🔒</div>
                        <span class="v40-packet-label">Public Key (Ổ khóa)</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag">
                                <i data-lucide="key"></i> ASYMMETRIC CRYPTO
                            </span>
                            <span class="v40-status-text text-blue" id="v40-p3-status">Tạo khóa...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_4') {
            // Slide 4: Encryption at Source (A locks message)
            canvas.innerHTML = `
                <div class="v40-simulation-layout">
                    <div class="v40-devices-row">
                        <div style="position:relative; width:250px; height:440px;">
                            ${phoneMockHTML('v40-p4a', 'User A (Gửi)', { isPeer: false, showKeyboard: true })}
                            <div class="v40-lock-overlay" id="v40-p4a-lock-screen">
                                <div class="v40-lock-icon-glow">
                                    <i data-lucide="lock"></i>
                                </div>
                                <span>TIN NHẮN ĐÃ MÃ HÓA</span>
                            </div>
                        </div>
                        ${serverMockHTML('v40-p4s', 'Zalo/Telegram Server')}
                        ${phoneMockHTML('v40-p4b', 'User B (Nhận)', { isPeer: true })}
                    </div>

                    <svg class="v40-svg-container">
                        <path id="v40-p4-path-a" class="v40-flow-path" />
                    </svg>

                    <div class="v40-packet-wrap" id="v40-p4-pkt">
                        <div class="v40-packet-core">🔒</div>
                        <span class="v40-packet-label" id="v40-p4-pkt-lbl">"xf#7d9!"</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag encrypt-source">
                                <i data-lucide="lock"></i> MÃ HÓA TẠI NGUỒN
                            </span>
                            <span class="v40-status-text text-yellow" id="v40-p4-status">Mã hóa...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_5') {
            // Slide 5: Server Transit (Server cannot read)
            canvas.innerHTML = `
                <div class="v40-simulation-layout">
                    <div class="v40-devices-row">
                        ${phoneMockHTML('v40-p5a', 'User A (Gửi)', { isPeer: false })}
                        ${serverMockHTML('v40-p5s', 'Zalo/Telegram Server')}
                        ${phoneMockHTML('v40-p5b', 'User B (Nhận)', { isPeer: true })}
                    </div>

                    <svg class="v40-svg-container">
                        <path id="v40-p5-path-a" class="v40-flow-path" />
                        <path id="v40-p5-path-b" class="v40-flow-path" />
                    </svg>

                    <div class="v40-packet-wrap" id="v40-p5-pkt">
                        <div class="v40-packet-core">🔒</div>
                        <span class="v40-packet-label" id="v40-p5-pkt-lbl">"xf#7d9!"</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag server-transit">
                                <i data-lucide="shield-alert"></i> SERVER CHỊU CHẾT
                            </span>
                            <span class="v40-status-text text-orange" id="v40-p5-status">Trung chuyển...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_6') {
            // Slide 6: Decryption at Destination (B unlocks)
            canvas.innerHTML = `
                <div class="v40-simulation-layout">
                    <div class="v40-devices-row">
                        ${phoneMockHTML('v40-p6a', 'User A (Gửi)', { isPeer: false })}
                        ${serverMockHTML('v40-p6s', 'Zalo/Telegram Server')}
                        ${phoneMockHTML('v40-p6b', 'User B (Nhận)', { isPeer: true, typingText: 'đang giải mã...' })}
                    </div>

                    <svg class="v40-svg-container">
                        <path id="v40-p6-path-b" class="v40-flow-path" />
                    </svg>

                    <div class="v40-packet-wrap" id="v40-p6-pkt">
                        <div class="v40-packet-core">🔒</div>
                        <span class="v40-packet-label" id="v40-p6-pkt-lbl">"xf#7d9!"</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag decrypt-destination">
                                <i data-lucide="unlock"></i> GIẢI MÃ TẠI ĐÍCH
                            </span>
                            <span class="v40-status-text text-blue" id="v40-p6-status">Giải mã...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v40_7') {
            // Slide 7: Modded Apps Bypass Unsend
            canvas.innerHTML = `
                <div class="v40-simulation-layout v40-slide7-layout">
                    <!-- Phía bên trái: Server gửi lệnh xóa -->
                    <div class="v40-s7-left">
                        ${serverMockHTML('v40-p7s', 'Server Trung Gian')}
                        <div class="v40-s7-server-desc">
                            <i data-lucide="info" style="width:12px;height:12px;color:var(--e2ee-orange);"></i>
                            <span>Server gửi yêu cầu thu hồi (DELETE) tới thiết bị</span>
                        </div>
                    </div>

                    <!-- Phía bên phải: Điện thoại B (App Mod) cận cảnh -->
                    <div class="v40-s7-right">
                        <div class="v40-phone-mockup s7-phone" id="v40-p7b-phone">
                            <!-- Status Bar -->
                            <div class="v40-status-bar">
                                <span>09:41</span>
                                <div class="v40-phone-island"></div>
                                <div class="status-right">
                                    <i data-lucide="signal" style="width:9px;height:9px;"></i>
                                    <i data-lucide="wifi" style="width:9px;height:9px;"></i>
                                    <i data-lucide="battery" style="width:10px;height:10px;"></i>
                                </div>
                            </div>
                            <!-- App Header -->
                            <div class="v40-app-header">
                                <div class="v40-app-header-left">
                                    <i data-lucide="chevron-left" style="width:12px;height:12px;color:var(--e2ee-blue);"></i>
                                    <div class="v40-app-header-avatar peer">B</div>
                                    <div class="v40-app-header-info">
                                        <span class="v40-app-header-name">User B (App Mod)</span>
                                        <span class="v40-app-header-status text-orange">Chặn thu hồi</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Phone Body -->
                            <div class="v40-phone-body" id="v40-p7b-phone-chat">
                                <!-- Tin nhắn gốc hiển thị ở đây -->
                            </div>
                            
                            <!-- App Mod Shield Filter Overlay -->
                            <div class="v40-s7-shield-barrier" id="v40-p7b-barrier">
                                <i data-lucide="shield-alert"></i>
                                <span>APP MOD CHẶN LỆNH XÓA</span>
                            </div>

                            <!-- Local Database representation inside the phone -->
                            <div class="v40-s7-local-db">
                                <div class="db-header">
                                    <i data-lucide="database"></i>
                                    <span>SQLITE LOCAL DB</span>
                                </div>
                                <div class="db-row" id="v40-s7-db-row-1">
                                    <span class="db-key">msg_1:</span>
                                    <span class="db-val">"Mật mật 🤫"</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SVG Network Paths -->
                    <svg class="v40-svg-container">
                        <path id="v40-p7-path-delete" class="v40-flow-path" />
                    </svg>

                    <!-- Packets -->
                    <div class="v40-packet-wrap" id="v40-p7-pkt">
                        <div class="v40-packet-core red">🗑️</div>
                        <span class="v40-packet-label">Lệnh DELETE</span>
                    </div>

                    <div class="v40-glass v40-status-card">
                        <div class="v40-status-inner">
                            <span class="v40-key-tag unsend-msg">
                                <i data-lucide="alert-octagon"></i> THU HỒI TIN NHẮN
                            </span>
                            <span class="v40-status-text text-orange" id="v40-p7-status">Bắt đầu...</span>
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
        const container = canvas.querySelector('.v40-simulation-layout');

        if (slideId === 'slide_v40_1') {
            // CSS Rotation
        }
        else if (slideId === 'slide_v40_2') {
            const chatA = canvas.querySelector('#v40-p2a-phone-chat');
            const chatB = canvas.querySelector('#v40-p2b-phone-chat');
            const pkt = canvas.querySelector('#v40-p2-pkt');
            const status = canvas.querySelector('#v40-p2-status');
            const serverLog = canvas.querySelector('#v40-p2-term-log');
            const led = canvas.querySelector('#v40-p2s-server .v40-server-led');

            const phoneA = canvas.querySelector('#v40-p2a-phone');
            const phoneB = canvas.querySelector('#v40-p2b-phone');
            const server = canvas.querySelector('#v40-p2s-server');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p2-path-a', phoneA, server, container, 'var(--e2ee-cyan)');
                drawSVGPath(canvas, '#v40-p2-path-b', server, phoneB, container, 'var(--e2ee-cyan)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offA = getCenterOffset(phoneA, container);
            const offB = getCenterOffset(phoneB, container);
            const offS = getCenterOffset(server, container);

            if (progress < 0.45) {
                const t = progress / 0.45;
                safeSetHTML(chatA, `<div class="v40-chat-bubble sent plain">Mật mật 🤫</div>`);
                safeSetHTML(chatB, '');
                placePacket(pkt, offA, offS, t);
                safeSetText(status, '1. A gửi tin nhắn không mã hóa');
                safeSetText(serverLog, 'Receiving packet...\nReading TCP buffer...');
                if (led && led.className !== 'v40-server-led active') led.className = 'v40-server-led active';
            }
            else if (progress >= 0.45 && progress < 0.6) {
                hidePacket(pkt);
                safeSetText(status, '⚠️ Server trung gian đọc trọn nội dung!');
                safeSetHTML(serverLog, 'Packet captured!\nFrom: User A | To: User B\nContent: <span class="v40-term-log highlight-red" style="color:var(--e2ee-orange); font-weight:bold;">"Mật mật 🤫"</span>\nStatus: Plaintext Read Success ❌');
                if (led && led.className !== 'v40-server-led active-red') led.className = 'v40-server-led active-red';
            }
            else {
                const t = (progress - 0.6) / 0.4;
                placePacket(pkt, offS, offB, t);
                safeSetHTML(chatB, `<div class="v40-chat-bubble received plain">Mật mật 🤫</div>`);
                safeSetText(status, '2. Server chuyển tiếp tin nhắn trần đến B');
                safeSetHTML(serverLog, 'Forwarding content...\nSent to User B: "Mật mật 🤫"');
                if (led && led.className !== 'v40-server-led active') led.className = 'v40-server-led active';
            }
        }
        else if (slideId === 'slide_v40_3') {
            const chatA = canvas.querySelector('#v40-p3a-phone-chat');
            const chatB = canvas.querySelector('#v40-p3b-phone-chat');
            const pkt = canvas.querySelector('#v40-p3-pkt');
            const status = canvas.querySelector('#v40-p3-status');

            const phoneA = canvas.querySelector('#v40-p3a-phone');
            const phoneB = canvas.querySelector('#v40-p3b-phone');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p3-path-key', phoneB, phoneA, container, 'var(--e2ee-blue)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offA = getCenterOffset(phoneA, container);
            const offB = getCenterOffset(phoneB, container);

            if (progress < 0.4) {
                hidePacket(pkt);
                safeSetHTML(chatB, `
                    <div style="font-size:10px; color:#fff; font-weight:bold; text-align:left;">Đang tạo khóa...</div>
                    <div class="v40-key-tag"><i data-lucide="key" style="width:10px;height:10px;"></i> Chìa cá nhân</div>
                `);
                safeSetHTML(chatA, '');
                safeSetText(status, '1. B sinh Cặp khóa cá nhân & công khai');
            }
            else if (progress >= 0.4 && progress < 0.85) {
                const t = (progress - 0.4) / 0.45;
                placePacket(pkt, offB, offA, t);
                safeSetHTML(chatB, `
                    <div class="v40-key-tag"><i data-lucide="key" style="width:10px;height:10px;"></i> Chìa khóa riêng B</div>
                    <div class="v40-lock-tag"><i data-lucide="lock" style="width:10px;height:10px;"></i> Ổ khóa công khai B</div>
                `);
                safeSetHTML(chatA, '');
                safeSetText(status, '2. B gửi Ổ khóa công khai cho A');
            }
            else {
                hidePacket(pkt);
                safeSetHTML(chatA, `
                    <div style="font-size:9px; color:var(--e2ee-text-muted); text-align:left;">Đã lưu ổ khóa B</div>
                    <div class="v40-lock-tag"><i data-lucide="lock" style="width:10px;height:10px;"></i> Ổ khóa B</div>
                `);
                safeSetText(status, '✓ A đã nhận và lưu trữ ổ khóa của B');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v40_4') {
            // Slide 4: A locks message and starts sending
            const chatA = canvas.querySelector('#v40-p4a-phone-chat');
            const pkt = canvas.querySelector('#v40-p4-pkt');
            const pktLbl = canvas.querySelector('#v40-p4-pkt-lbl');
            const status = canvas.querySelector('#v40-p4-status');
            const inputDisplay = canvas.querySelector('#v40-p4a-input-display');
            const lockScreen = canvas.querySelector('#v40-p4a-lock-screen');

            const phoneA = canvas.querySelector('#v40-p4a-phone');
            const server = canvas.querySelector('#v40-p4s-server');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p4-path-a', phoneA, server, container, 'var(--e2ee-yellow)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offA = getCenterOffset(phoneA, container);
            const offS = getCenterOffset(server, container);

            const phrase = 'Mật mật 🤫';

            if (progress < 0.35) {
                hidePacket(pkt);
                if (lockScreen) lockScreen.classList.remove('active');
                
                // Animate character typing
                const typeP = Math.min(1, progress / 0.3);
                const charCount = Math.floor(typeP * phrase.length);
                const typedText = phrase.slice(0, charCount);
                if (inputDisplay) {
                    safeSetText(inputDisplay, typedText + (typeP < 1 ? '|' : ''));
                    inputDisplay.classList.remove('placeholder');
                }
                safeSetHTML(chatA, '');
                safeSetText(status, '1. Soạn thảo tin nhắn "Mật mật"');

                // Virtual keypress highlights
                const rawKeys = ['M', 'A', 'T', 'M', 'A', 'T'];
                const keyIdx = Math.floor(typeP * rawKeys.length);
                canvas.querySelectorAll('.v40-key').forEach(el => el.classList.remove('pressing'));
                if (typeP < 1 && keyIdx < rawKeys.length) {
                    const currChar = rawKeys[keyIdx];
                    const keyEl = canvas.querySelector(`.key-${currChar}`);
                    if (keyEl) keyEl.classList.add('pressing');
                }
            }
            else if (progress >= 0.35 && progress < 0.65) {
                hidePacket(pkt);
                if (lockScreen) lockScreen.classList.add('active');
                
                if (inputDisplay) {
                    safeSetText(inputDisplay, 'Nhập tin nhắn...');
                    inputDisplay.classList.add('placeholder');
                }
                safeSetHTML(chatA, `
                    <div class="v40-chat-bubble sent plain" style="opacity:0.25;">Mật mật 🤫</div>
                    <div class="v40-chat-bubble sent cipher">Mã hóa... "xf#7d9!" 🔒</div>
                `);
                safeSetText(status, '2. Lấy Ổ khóa của B khóa chặt lại');
                canvas.querySelectorAll('.v40-key').forEach(el => el.classList.remove('pressing'));
            }
            else {
                const t = (progress - 0.65) / 0.35;
                if (lockScreen) lockScreen.classList.remove('active');
                
                if (inputDisplay) {
                    safeSetText(inputDisplay, 'Nhập tin nhắn...');
                    inputDisplay.classList.add('placeholder');
                }
                // Move packet halfway towards server on curve (t goes from 0.0 to 0.5)
                placePacketOnCurve(pkt, offA, offS, 0.0, 0.5, t);
                safeSetText(pktLbl, '"xf#7d9!"');
                safeSetText(status, '3. Gửi chuỗi ký tự rác đi qua mạng');
                canvas.querySelectorAll('.v40-key').forEach(el => el.classList.remove('pressing'));
            }
        }
        else if (slideId === 'slide_v40_5') {
            // Slide 5: Server Transit Block
            const pkt = canvas.querySelector('#v40-p5-pkt');
            const pktLbl = canvas.querySelector('#v40-p5-pkt-lbl');
            const status = canvas.querySelector('#v40-p5-status');
            const serverLog = canvas.querySelector('#v40-p5-term-log');
            const led = canvas.querySelector('#v40-p5s-server .v40-server-led');

            const phoneA = canvas.querySelector('#v40-p5a-phone');
            const phoneB = canvas.querySelector('#v40-p5b-phone');
            const server = canvas.querySelector('#v40-p5s-server');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p5-path-a', phoneA, server, container, 'var(--e2ee-orange)');
                drawSVGPath(canvas, '#v40-p5-path-b', server, phoneB, container, 'var(--e2ee-orange)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offA = getCenterOffset(phoneA, container);
            const offB = getCenterOffset(phoneB, container);
            const offS = getCenterOffset(server, container);

            const halfA = { x: offA.x + (offS.x - offA.x) * 0.5, y: offA.y + (offS.y - offA.y) * 0.5 };
            const halfB = { x: offS.x + (offB.x - offS.x) * 0.5, y: offS.y + (offB.y - offS.y) * 0.5 };

            if (progress < 0.4) {
                // Packet goes from halfway-A to Server on curve (t goes from 0.5 to 1.0)
                const t = progress / 0.4;
                placePacketOnCurve(pkt, offA, offS, 0.5, 1.0, t);
                safeSetText(pktLbl, '"xf#7d9!"');
                safeSetText(status, '1. Gói tin khóa đi tới Server');
                safeSetText(serverLog, 'Incoming packet...');
                if (led && led.className !== 'v40-server-led active') led.className = 'v40-server-led active';
            }
            else if (progress >= 0.4 && progress < 0.75) {
                hidePacket(pkt);
                safeSetText(status, '🔒 Kể cả dev ứng dụng cũng không thể đọc được!');
                safeSetHTML(serverLog, 'Captured Ciphertext:\nContent: <span class="v40-term-log" style="color:var(--e2ee-yellow); font-weight:bold;">"xf#7d9! 🔒"</span>\nDecrypt err: Private Key missing.\n<span class="v40-term-log" style="color:var(--e2ee-orange); font-weight:bold;">Unable to read data. Forwarding...</span>');
                if (led && led.className !== 'v40-server-led active-red') led.className = 'v40-server-led active-red';
            }
            else {
                // Packet leaves Server towards B (halfway) on curve (t goes from 0.0 to 0.5)
                const t = (progress - 0.75) / 0.25;
                placePacketOnCurve(pkt, offS, offB, 0.0, 0.5, t);
                safeSetText(pktLbl, '"xf#7d9!"');
                safeSetText(status, '2. Server chỉ có thể chuyển tiếp gói tin đi');
                if (led && led.className !== 'v40-server-led active') led.className = 'v40-server-led active';
            }
        }
        else if (slideId === 'slide_v40_6') {
            // Slide 6: B decrypts using private key
            const chatB = canvas.querySelector('#v40-p6b-phone-chat');
            const pkt = canvas.querySelector('#v40-p6-pkt');
            const pktLbl = canvas.querySelector('#v40-p6-pkt-lbl');
            const status = canvas.querySelector('#v40-p6-status');

            const server = canvas.querySelector('#v40-p6s-server');
            const phoneB = canvas.querySelector('#v40-p6b-phone');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p6-path-b', server, phoneB, container, 'var(--e2ee-orange)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offS = getCenterOffset(server, container);
            const offB = getCenterOffset(phoneB, container);
            const halfB = { x: offS.x + (offB.x - offS.x) * 0.5, y: offS.y + (offB.y - offS.y) * 0.5 };

            if (progress < 0.45) {
                // Packet goes from halfway to B on curve (t goes from 0.5 to 1.0)
                const t = progress / 0.45;
                placePacketOnCurve(pkt, offS, offB, 0.5, 1.0, t);
                safeSetText(pktLbl, '"xf#7d9!"');
                safeSetHTML(chatB, '');
                safeSetText(status, '1. Gói tin khóa đến thiết bị B');
            }
            else if (progress >= 0.45 && progress < 0.75) {
                hidePacket(pkt);
                safeSetHTML(chatB, `
                    <div class="v40-chat-bubble received cipher">"xf#7d9!" 🔒</div>
                    <div class="v40-key-tag"><i data-lucide="key" style="width:10px;height:10px;"></i> Tra chìa cá nhân...</div>
                `);
                safeSetText(status, '2. B sử dụng Chìa khóa cá nhân tra vào');
            }
            else {
                hidePacket(pkt);
                safeSetHTML(chatB, `
                    <div class="v40-chat-bubble received cipher" style="opacity:0.25;">"xf#7d9!" 🔒</div>
                    <div class="v40-chat-bubble received plain">Mật mật 🤫 <span style="color:var(--e2ee-blue);">🔓</span></div>
                `);
                safeSetText(status, '✓ Giải mã thành công tin nhắn gốc!');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v40_7') {
            const chatB = canvas.querySelector('#v40-p7b-phone-chat');
            const pkt = canvas.querySelector('#v40-p7-pkt');
            const status = canvas.querySelector('#v40-p7-status');
            const serverLog = canvas.querySelector('#v40-p7-term-log');
            const led = canvas.querySelector('#v40-p7s-server .v40-server-led');
            const barrier = canvas.querySelector('#v40-p7b-barrier');
            const dbVal = canvas.querySelector('#v40-s7-db-row-1 .db-val');

            const phoneB = canvas.querySelector('#v40-p7b-phone');
            const server = canvas.querySelector('#v40-p7s-server');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v40-p7-path-delete', server, phoneB, container, 'var(--e2ee-red)');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const offS = getCenterOffset(server, container);
            const offB = getCenterOffset(phoneB, container);

            if (progress < 0.3) {
                hidePacket(pkt);
                safeSetHTML(chatB, `<div class="v40-chat-bubble received plain">Mật mật 🤫</div>`);
                if (barrier) {
                    barrier.classList.remove('active');
                    barrier.classList.remove('shake');
                }
                if (dbVal) dbVal.style.color = 'var(--e2ee-cyan)';
                safeSetText(status, '1. Tin nhắn E2EE được giải mã và lưu trữ cục bộ ở DB thiết bị B');
                safeSetText(serverLog, 'Waiting for Client B action...\nMessage 1 status: delivered');
                if (led && led.className !== 'v40-server-led active') led.className = 'v40-server-led active';
            }
            else if (progress >= 0.3 && progress < 0.65) {
                const t = (progress - 0.3) / 0.35;
                placePacket(pkt, offS, offB, t);
                safeSetHTML(chatB, `<div class="v40-chat-bubble received plain">Mật mật 🤫</div>`);
                if (barrier) {
                    barrier.classList.remove('active');
                    barrier.classList.remove('shake');
                }
                if (dbVal) dbVal.style.color = 'var(--e2ee-cyan)';
                safeSetText(status, '2. A yêu cầu thu hồi, Server gửi lệnh DELETE tới B');
                safeSetHTML(serverLog, 'Broadcasting DELETE command to B...\nDELETE message_1');
                if (led && led.className !== 'v40-server-led active-orange') led.className = 'v40-server-led active-orange';
            }
            else {
                hidePacket(pkt);
                safeSetHTML(chatB, `
                    <div class="v40-chat-bubble received plain">Mật mật 🤫</div>
                    <div class="v40-chat-bubble received unsend-warning" style="margin-top:4px;">Blocked Unsend 🛡️ (Chặn thu hồi)</div>
                `);
                if (barrier) {
                    barrier.classList.add('active');
                    if (progress >= 0.65 && progress < 0.8) {
                        barrier.classList.add('shake');
                    } else {
                        barrier.classList.remove('shake');
                    }
                }
                if (dbVal) dbVal.style.color = 'var(--e2ee-orange)';
                safeSetText(status, '❌ App Mod của B bỏ qua lệnh DELETE, giữ tin nhắn trong bộ nhớ máy!');
                safeSetHTML(serverLog, 'Client B: Ignored delete command\nSQL database: unchanged\n<span class="v40-term-log" style="color:var(--e2ee-orange); font-weight:bold;">Warning: Client bypasses unsend rules!</span>');
                if (led && led.className !== 'v40-server-led active-red') led.className = 'v40-server-led active-red';
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video40',
        topic: 'End-to-End Encryption (E2EE)',
        episodeNum: 40,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video40 Plugin] Loaded: E2EE slides ready.');
})();
