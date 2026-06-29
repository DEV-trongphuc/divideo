/**
 * Video 32: JSON Web Tokens (JWT) & Stateless Authentication
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video32
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_jwt_1a: [
            { text: 'session ID', start: 1.0, end: 5.0, class: 'active-gold' },
            { text: 'JSON Web Token', start: 5.0, end: 9.0, class: 'active-gold' }
        ],
        slide_jwt_1b: [
            { text: 'thông tin định danh', start: 1.0, end: 5.0, class: 'active-blue' },
            { text: 'chữ ký mã hóa', start: 5.0, end: 9.0, class: 'active-good' }
        ],
        slide_jwt_structure: [
            { text: 'Header', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'Payload', start: 6.0, end: 12.0, class: 'active-blue' },
            { text: 'Signature', start: 12.0, end: 18.0, class: 'active-good' }
        ],
        slide_jwt_verification: [
            { text: 'không cần', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'khóa bí mật', start: 8.0, end: 16.0, class: 'active-good' }
        ],
        slide_jwt_hack: [
            { text: 'chỉnh sửa', start: 1.0, end: 9.0, class: 'active-bad' },
            { text: 'chặn đứng', start: 9.0, end: 18.0, class: 'active-bad' }
        ],
        slide_jwt_outro: [
            { text: 'hàng triệu người dùng', start: 2.0, end: 5.5, class: 'active-gold' },
            { text: 'không bị nghẽn', start: 6.5, end: 10.0, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_jwt_1a',
        'slide_jwt_1b',
        'slide_jwt_structure',
        'slide_jwt_verification',
        'slide_jwt_hack',
        'slide_jwt_outro'
    ];

    function initIcons(canvas) {
        if (window.lucide) {
            window.lucide.createIcons({ node: canvas });
        }
    }

    // Helper to format raw token with color spans
    function getFormattedTokenHtml(rawString, limit = 999) {
        const hPart = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        const pPart = "eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoidXNlciJ9";
        const sPart = "c2lnbmF0dXJlX2FiYzEyMw";

        let accumulated = "";
        let charIndex = 0;

        // Render Header
        for (let i = 0; i < hPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-header">${hPart[i]}</span>`;
        }
        // Render Dot 1
        if (charIndex < limit) {
            accumulated += ".";
            charIndex++;
        }
        // Render Payload
        for (let i = 0; i < pPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-payload">${pPart[i]}</span>`;
        }
        // Render Dot 2
        if (charIndex < limit) {
            accumulated += ".";
            charIndex++;
        }
        // Render Signature
        for (let i = 0; i < sPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-signature">${sPart[i]}</span>`;
        }

        return accumulated;
    }

    // Modified token representation for hacking slide
    function getHackedTokenHtml(limit = 999) {
        const hPart = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        const pPart = "eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ"; // hacked admin payload
        const sPart = "c2lnbmF0dXJlX2FiYzEyMw"; // incorrect signature

        let accumulated = "";
        let charIndex = 0;

        // Render Header
        for (let i = 0; i < hPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-header">${hPart[i]}</span>`;
        }
        // Render Dot 1
        if (charIndex < limit) {
            accumulated += ".";
            charIndex++;
        }
        // Render Payload (Hacked payload turns red/orange glow)
        for (let i = 0; i < pPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-payload" style="color:#f59e0b; text-shadow:0 0 5px rgba(245,158,11,0.5);">${pPart[i]}</span>`;
        }
        // Render Dot 2
        if (charIndex < limit) {
            accumulated += ".";
            charIndex++;
        }
        // Render Signature (Incorrect signature)
        for (let i = 0; i < sPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-signature" style="color:var(--jwt-red); text-decoration:line-through;">${sPart[i]}</span>`;
        }

        return accumulated;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        // Inject styles dynamically to bypass cache and add premium UI rules
        let styleTag = document.getElementById('v32-dynamic-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'v32-dynamic-styles';
            styleTag.innerHTML = `
                /* Injected Styles for Video 32 - JWT stateless authentication */
                .v32-zoom-container {
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                    gap: 15px; background: transparent; position: relative; overflow: hidden;
                    box-sizing: border-box;
                }
                .v32-glass-card {
                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(16px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                    border-radius: 20px;
                    width: 480px;
                    box-sizing: border-box;
                    color: #fff;
                    padding: 16px;
                    transition: all 0.3s ease;
                }
                .v32-token-card {
                    width: 480px;
                    border: 1.5px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 18px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background: linear-gradient(-45deg, #1e1b4b, #0f172a, #111827);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                    transition: all 0.4s ease;
                }
                .v32-token-card.shake {
                    animation: v32-shake-anim 0.5s ease-in-out;
                }
                @keyframes v32-shake-anim {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-8px); }
                    40%, 80% { transform: translateX(8px); }
                }
                .v32-token-raw {
                    font-family: 'Fira Code', monospace;
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 1.5;
                    word-break: break-all;
                    background: rgba(0, 0, 0, 0.35);
                    padding: 12px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .part-header { color: #f43f5e; }
                .part-payload { color: #3b82f6; }
                .part-signature { color: #10b981; }

                /* Slide 5: Hacker terminal styles */
                .v32-terminal-window {
                    width: 480px;
                    background: #090d16;
                    border: 1.5px solid rgba(244, 63, 94, 0.25);
                    border-radius: 14px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(244, 63, 94, 0.1);
                    font-family: 'Fira Code', monospace;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                .v32-terminal-window.shake {
                    animation: v32-shake-anim 0.5s ease-in-out;
                    border-color: #ef4444;
                    box-shadow: 0 0 25px rgba(239, 68, 68, 0.25);
                }
                .v32-terminal-header {
                    background: #111827;
                    padding: 8px 14px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .v32-terminal-dots {
                    display: flex;
                    gap: 6px;
                    margin-right: 15px;
                }
                .v32-term-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .v32-term-dot.red { background: #ef4444; }
                .v32-term-dot.yellow { background: #f59e0b; }
                .v32-term-dot.green { background: #10b981; }
                .v32-terminal-title {
                    font-size: 11px;
                    color: #64748b;
                    font-weight: bold;
                }
                .v32-terminal-body {
                    padding: 14px;
                    font-size: 12px;
                    line-height: 1.5;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .v32-sig-compare {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 5px;
                }
                .v32-sig-box {
                    background: rgba(0, 0, 0, 0.25);
                    border-radius: 8px;
                    padding: 8px;
                    border: 1px solid rgba(255,255,255,0.03);
                    text-align: left;
                }
                .v32-sig-str {
                    font-family: 'Fira Code', monospace;
                    font-size: 10px;
                    word-break: break-all;
                    margin-top: 4px;
                    padding: 4px;
                    border-radius: 4px;
                    background: rgba(0, 0, 0, 0.2);
                }
                .v32-sig-str.calculated { color: #10b981; }
                .v32-sig-str.received { color: #ef4444; }
                
                .v32-alarm-alert {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 10px;
                    border-radius: 10px;
                    margin-top: 10px;
                    font-family: monospace;
                    font-size: 13px;
                    font-weight: bold;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: background 0.3s, border-color 0.3s;
                }
                .v32-alarm-alert.alert-red {
                    background: rgba(239, 68, 68, 0.15) !important;
                    border-color: #ef4444 !important;
                    color: #ef4444 !important;
                    animation: v32-flash-red 0.8s infinite alternate;
                }
                @keyframes v32-flash-red {
                    0% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.1); }
                    100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.35); }
                }

                /* Slide 6: High-load simulation styles */
                .v32-sim-stage {
                    width: 480px;
                    height: 240px;
                    position: relative;
                    background: rgba(15, 23, 42, 0.55);
                    border: 1.5px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 30px;
                    box-sizing: border-box;
                    backdrop-filter: blur(12px);
                }
                .v32-sim-node {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    z-index: 5;
                }
                .v32-sim-node-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    background: rgba(30, 41, 59, 0.85);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                .v32-sim-node.client .v32-sim-node-icon {
                    border-color: #3b82f6;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.25);
                }
                .v32-sim-node.server .v32-sim-node-icon {
                    border-color: #10b981;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
                    animation: v32-server-glow 3s infinite alternate;
                }
                @keyframes v32-server-glow {
                    0% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
                    100% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
                }
                .v32-sim-node.db .v32-sim-node-icon {
                    border-color: rgba(255,255,255,0.08);
                    opacity: 0.65;
                }
                .v32-node-title {
                    font-size: 11px;
                    font-weight: 900;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #94a3b8;
                }
                .v32-sim-node.client .v32-node-title { color: #3b82f6; }
                .v32-sim-node.server .v32-node-title { color: #10b981; }

                /* Connection pipes */
                .v32-pipe {
                    position: absolute;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    z-index: 1;
                }
                .v32-pipe.client-server {
                    left: 90px;
                    right: 210px;
                    top: 110px;
                }
                .v32-pipe.server-db {
                    left: 270px;
                    right: 90px;
                    top: 110px;
                }
                .v32-pipe.server-db::after {
                    content: 'Bypassed ✕';
                    position: absolute;
                    top: -18px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-family: monospace;
                    font-size: 8px;
                    color: #f43f5e;
                    background: rgba(244, 63, 94, 0.15);
                    padding: 2px 6px;
                    border-radius: 4px;
                    border: 1px solid rgba(244, 63, 94, 0.25);
                }

                /* Flowing green dots representing requests */
                .v32-req-dot {
                    position: absolute;
                    width: 7px;
                    height: 7px;
                    background: #10b981;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #10b981;
                    left: 90px;
                    top: 108px;
                    opacity: 0;
                    z-index: 3;
                }
                .v32-indicator-gauge {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(0,0,0,0.3);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-family: monospace;
                    font-size: 9px;
                    color: #fff;
                    margin-top: 4px;
                }
                .v32-indicator-gauge.green { color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); }
                .v32-indicator-gauge.gray { color: #64748b; }
            `;
            document.head.appendChild(styleTag);
        }

        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_jwt_1a') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: flex-start; padding-top: 65px; gap: 20px;">
                    <div class="v32-intro-container" style="height: 190px; position: relative; width: 360px; display: flex; align-items: center; justify-content: center; margin: 10px 0;">
                        <!-- Spinning Cosmic Rings -->
                        <div class="v32-glow-ring outer"></div>
                        <div class="v32-glow-ring inner"></div>
                        
                        <!-- JWT Brandmark Logo -->
                        <img src="/static/jwt.svg" class="v32-jwt-logo-hook" alt="JWT Logo">
                    </div>

                    <!-- Slide Hook Info Card -->
                    <div class="v32-glass-card v32-hook-card" style="margin-top: 65px;">
                        <div class="v32-hook-badge">
                            <i data-lucide="zap"></i> JSON Web Token
                        </div>
                        <div class="v32-hook-title">
                            Bảo mật Stateless không trạng thái<br>cho hàng triệu người dùng?
                        </div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
        else if (slideId === 'slide_jwt_1b') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 24px;">
                    <!-- Token Representation Card -->
                    <div class="v32-token-card" id="v32-token-card-1">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size: 10px; font-weight:bold; color:var(--jwt-text-muted); text-transform:uppercase; letter-spacing:1px; display:inline-flex; align-items:center; gap:4px;">
                                <i data-lucide="shield" style="width:12px; height:12px; color:var(--jwt-green);"></i> Security Session Token
                            </span>
                            <span style="font-size: 9px; font-family: monospace; background:rgba(0,0,0,0.3); padding: 2px 6px; border-radius:4px; color:var(--jwt-green);">STATELESS</span>
                        </div>
                        
                        <!-- Token String typing area -->
                        <div class="v32-token-raw" id="v32-token-typing">
                            &nbsp;
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.06); padding-top:10px;">
                            <span style="font-size: 10px; color: var(--jwt-text-muted);">Format: Header.Payload.Signature</span>
                            <span style="font-size: 11px; font-weight:bold; color:#fff;">JWT Standard</span>
                        </div>
                    </div>

                    <!-- Decoded Summary badge -->
                    <div class="v32-glass-card v32-status-card" style="padding: 14px 20px; border-color: rgba(255,255,255,0.08);">
                        <span class="v32-status-badge green" style="font-size: 10px;"><i data-lucide="key-round"></i> jwt authorized</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 12px; font-weight: 800; color: var(--jwt-text-muted);" id="v32-token-desc">
                            Generating session token...
                        </div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
        else if (slideId === 'slide_jwt_structure') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 15px; padding-top: 10px;">
                    <!-- The full token colored -->
                    <div class="v32-token-card" style="padding: 14px 18px; gap: 10px;">
                        <div style="display:flex; justify-content:space-between; font-size:9px; color:var(--jwt-text-muted);">
                            <span>RAW TOKEN STRINGS</span>
                            <span style="color:var(--jwt-blue); font-weight:bold;">3 segments decoded</span>
                        </div>
                        <div class="v32-token-raw" style="font-size:11px; padding:10px;">
                            ${getFormattedTokenHtml(999)}
                        </div>
                    </div>

                    <!-- Decode structures panel -->
                    <div class="v32-decoded-container">
                        <!-- Header block -->
                        <div class="v32-decoded-block header" id="v32-block-header">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span class="v32-block-tag red">Header (Thuật toán)</span>
                                <span style="font-size:9px; color:var(--jwt-red); font-family:monospace;">base64url</span>
                            </div>
                            <div class="v32-block-code">{ "alg": "HS256", "typ": "JWT" }</div>
                        </div>

                        <!-- Payload block -->
                        <div class="v32-decoded-block payload" id="v32-block-payload">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span class="v32-block-tag blue">Payload (Dữ liệu người dùng)</span>
                                <span style="font-size:9px; color:var(--jwt-blue); font-family:monospace;">base64url</span>
                            </div>
                            <div class="v32-block-code">{ "user": "Alice", "role": "user" }</div>
                        </div>

                        <!-- Signature block -->
                        <div class="v32-decoded-block signature" id="v32-block-signature">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span class="v32-block-tag green">Signature (Chữ ký chống giả mạo)</span>
                                <span style="font-size:9px; color:var(--jwt-green); font-family:monospace;">hashed with secret</span>
                            </div>
                            <div class="v32-block-code" style="font-size:10px; line-height:1.3;">HMACSHA256(
  base64Url(Header) + "." + base64Url(Payload),
  secret_key
)</div>
                        </div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
        else if (slideId === 'slide_jwt_verification') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 20px;">
                    <div style="font-size:13px; font-weight:800; color:var(--jwt-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Xác thực không trạng thái (Stateless)
                    </div>

                    <!-- Flow Diagram -->
                    <div class="v32-glass-card" style="padding:14px; position:relative; overflow:hidden;">
                        <div class="v32-flow-box">
                            <div class="v32-flow-node active-blue" id="v32-flow-client">
                                <i data-lucide="smartphone" style="width:20px; height:20px; margin-bottom:4px; color:var(--jwt-blue);"></i>
                                Client
                            </div>

                            <div class="v32-flow-line">
                                <div class="v32-flow-line-fill" id="v32-flow-fill"></div>
                            </div>
                            
                            <!-- Flow packet representing JWT token -->
                            <div class="v32-flow-dot" id="v32-flow-packet"></div>

                            <div class="v32-flow-node" id="v32-flow-server">
                                <i data-lucide="server" style="width:20px; height:20px; margin-bottom:4px;"></i>
                                API Server
                            </div>
                        </div>

                        <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:10px; display:flex; justify-content:space-between; font-size:11px; font-family:monospace; color:var(--jwt-text-muted);">
                            <span id="v32-flow-desc">Status: Idle</span>
                            <span style="font-weight:bold; color:var(--jwt-green);" id="v32-flow-verdict">DB Query: 0</span>
                        </div>
                    </div>

                    <!-- Verification detail math block -->
                    <div class="v32-glass-card" style="border-color: rgba(16, 185, 129, 0.2); transition: border-color 0.3s;" id="v32-verif-details-card">
                        <div style="font-size:11px; font-weight:800; color:var(--jwt-text-muted); text-transform:uppercase; text-align:left; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px;">
                            Thuật toán đối chiếu chữ ký số
                        </div>
                        
                        <div style="font-family:'Fira Code', monospace; font-size:12px; margin-top:8px; line-height:1.4; text-align:left;" id="v32-verif-formula">
                            Chờ nhận token từ Client...
                        </div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
        else if (slideId === 'slide_jwt_hack') {
            // Slide 5: Hacker terminal and signature mismatch checker
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 15px;">
                    <!-- Hacker Terminal Window -->
                    <div class="v32-terminal-window" id="v32-hacker-term">
                        <div class="v32-terminal-header">
                            <div class="v32-terminal-dots">
                                <span class="v32-term-dot red"></span>
                                <span class="v32-term-dot yellow"></span>
                                <span class="v32-term-dot green"></span>
                            </div>
                            <span class="v32-terminal-title">hacker@kali: ~</span>
                        </div>
                        <div class="v32-terminal-body">
                            <div class="v32-term-line"><span style="color:#10b981;">hacker@kali:~$</span> ./exploit_jwt.sh --claim role=admin</div>
                            <div class="v32-term-line" id="v32-term-line-1" style="color:#94a3b8; opacity:0; transition:opacity 0.2s;">[+] Decoded Payload: { "user": "Alice", "role": "user" }</div>
                            <div class="v32-term-line" id="v32-term-line-2" style="color:#fbbf24; opacity:0; transition:opacity 0.2s; font-weight:bold;">[!] Modifying payload: "role" -> "admin"...</div>
                            <div class="v32-term-line" id="v32-term-line-3" style="color:#94a3b8; opacity:0; transition:opacity 0.2s;">[+] Re-encoding token. Sending request...</div>
                        </div>
                    </div>

                    <!-- Decoded details showing admin tampering -->
                    <div class="v32-token-card" id="v32-hacked-card" style="border-color: rgba(244, 63, 94, 0.35); padding: 12px 16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:10px; font-weight:bold; color:#ef4444; text-transform:uppercase; letter-spacing:1px; display:inline-flex; align-items:center; gap:4px;">
                                <i data-lucide="alert-octagon" style="color:#ef4444; width:12px; height:12px;"></i> Tampered Token
                            </span>
                            <span style="font-size: 8px; font-family: monospace; background:rgba(244, 63, 94, 0.15); padding: 2px 6px; border-radius:4px; color:#ef4444; font-weight:900;" id="v32-token-validity-tag">VERIFYING...</span>
                        </div>
                        
                        <!-- Colored hacked string -->
                        <div class="v32-token-raw" style="font-size: 11px; padding: 10px;" id="v32-hacked-raw">
                            ${getHackedTokenHtml(999)}
                        </div>
                    </div>

                    <!-- Server Verification panel -->
                    <div class="v32-glass-card" style="padding: 14px 18px;" id="v32-server-check-panel">
                        <div style="font-size:10px; font-weight:800; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px; text-align:left;">
                            API SERVER - ĐỐI CHIẾU CHỮ KÝ SỐ
                        </div>
                        <div class="v32-sig-compare">
                            <div class="v32-sig-box">
                                <span style="font-size:8px; color:#64748b; font-weight:bold; display:block;">SERVER CALCULATED</span>
                                <div class="v32-sig-str calculated" id="v32-sig-calc">Chờ tính...</div>
                            </div>
                            <div class="v32-sig-box">
                                <span style="font-size:8px; color:#64748b; font-weight:bold; display:block;">TOKEN RECEIVED</span>
                                <div class="v32-sig-str received" id="v32-sig-rec">Chờ nhận...</div>
                            </div>
                        </div>

                        <!-- Alarm Alert bar -->
                        <div class="v32-alarm-alert" id="v32-alarm-box">
                            <i data-lucide="shield-check" style="width:16px; height:16px; color:#3b82f6;" id="v32-alarm-icon"></i>
                            <span id="v32-alarm-text">ĐANG ĐỢI TOKEN TỪ HACKER...</span>
                        </div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
        else if (slideId === 'slide_jwt_outro') {
            // Slide 6: High Load Stateless Simulation (Server handles scale, DB bypassed)
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 15px;">
                    <div style="font-size:13px; font-weight:800; color:#fbbf24; text-transform:uppercase; text-align:center; letter-spacing:1px;">
                        HIỆU NĂNG VÀ KHẢ NĂNG MỞ RỘNG (SCALE)
                    </div>

                    <!-- Simulation Stage -->
                    <div class="v32-sim-stage">
                        <!-- Left Node: Client / Users -->
                        <div class="v32-sim-node client">
                            <div class="v32-sim-node-icon">
                                <i data-lucide="users" style="width:28px; height:28px; color:#3b82f6;"></i>
                            </div>
                            <span class="v32-node-title">Clients</span>
                            <span style="font-size:9px; color:#64748b; font-weight:bold;">Hàng triệu User</span>
                        </div>

                        <!-- Connection Pipes -->
                        <div class="v32-pipe client-server"></div>
                        <div class="v32-pipe server-db"></div>

                        <!-- Active traffic request dots -->
                        <div class="v32-req-dot" id="v32-dot-1"></div>
                        <div class="v32-req-dot" id="v32-dot-2"></div>
                        <div class="v32-req-dot" id="v32-dot-3"></div>
                        <div class="v32-req-dot" id="v32-dot-4"></div>
                        <div class="v32-req-dot" id="v32-dot-5"></div>

                        <!-- Center Node: API Server (Stateless Verification) -->
                        <div class="v32-sim-node server">
                            <div class="v32-sim-node-icon" id="v32-server-icon">
                                <i data-lucide="server" style="width:28px; height:28px; color:#10b981;"></i>
                            </div>
                            <span class="v32-node-title">API Server</span>
                            <div class="v32-indicator-gauge green" id="v32-server-gauge">VERIFY: 0.5ms</div>
                        </div>

                        <!-- Right Node: Database (Bypassed) -->
                        <div class="v32-sim-node db" id="v32-db-node">
                            <div class="v32-sim-node-icon">
                                <i data-lucide="database" style="width:28px; height:28px; color:#94a3b8;"></i>
                            </div>
                            <span class="v32-node-title">Database</span>
                            <div class="v32-indicator-gauge gray" id="v32-db-gauge">LOAD: 0%</div>
                        </div>
                    </div>

                    <!-- Summary Info Card -->
                    <div class="v32-glass-card" style="padding:14px 20px; text-align:center; width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6);">
                        <div style="font-family:'Outfit', sans-serif; font-size:15px; font-weight:800; color:#fbbf24; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px;">Ưu điểm tối thượng của JWT</div>
                        <div style="font-size:13px; color:#94a3b8; line-height:1.5;">Xác thực Stateless không trạng thái, API Server tự xác thực trực tiếp mà không cần chạm vào Database, triệt tiêu hoàn toàn nghẽn cổ chai!</div>
                    </div>
                </div>
            `;
            initIcons(canvas);
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying) {
        const row = canvas; // canvas root element

        if (slideId === 'slide_jwt_1a') {
            // Static logo title slide, no ticking needed
        }
        else if (slideId === 'slide_jwt_1b') {
            const typingEl = row.querySelector('#v32-token-typing');
            const descEl = row.querySelector('#v32-token-desc');

            const hPart = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            const pPart = "eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoidXNlciJ9";
            const sPart = "c2lnbmF0dXJlX2FiYzEyMw";
            const fullToken = hPart + "." + pPart + "." + sPart;

            // Character typing simulation
            const typingLimit = Math.floor(progress * 1.2 * fullToken.length);
            const isTyping = typingLimit < fullToken.length;
            const cursorHtml = isTyping ? '<span class="v32-cursor"></span>' : '';

            if (typingEl) {
                typingEl.innerHTML = getFormattedTokenHtml(fullToken, typingLimit) + cursorHtml;
            }

            if (descEl) {
                if (typingLimit < hPart.length) {
                    descEl.innerHTML = `Gõ Header (Đỏ)...`;
                    descEl.style.color = "var(--jwt-red)";
                } else if (typingLimit < hPart.length + pPart.length + 1) {
                    descEl.innerHTML = `Gõ Payload (Xanh dương)...`;
                    descEl.style.color = "var(--jwt-blue)";
                } else if (isTyping) {
                    descEl.innerHTML = `Gõ Signature bảo mật (Xanh lá)...`;
                    descEl.style.color = "var(--jwt-green)";
                } else {
                    descEl.innerHTML = `JWT Token đã sẵn sàng!`;
                    descEl.style.color = "#fff";
                }
            }
        }
        else if (slideId === 'slide_jwt_structure') {
            const headerBlock = row.querySelector('#v32-block-header');
            const payloadBlock = row.querySelector('#v32-block-payload');
            const signatureBlock = row.querySelector('#v32-block-signature');

            // Toggle blocks active status sequentially
            if (headerBlock) {
                headerBlock.className = `v32-decoded-block header ${progress < 0.35 ? 'active' : ''}`;
            }
            if (payloadBlock) {
                payloadBlock.className = `v32-decoded-block payload ${(progress >= 0.35 && progress < 0.70) ? 'active' : ''}`;
            }
            if (signatureBlock) {
                signatureBlock.className = `v32-decoded-block signature ${progress >= 0.70 ? 'active' : ''}`;
            }
        }
        else if (slideId === 'slide_jwt_verification') {
            const packet = row.querySelector('#v32-flow-packet');
            const fill = row.querySelector('#v32-flow-fill');
            const server = row.querySelector('#v32-flow-server');
            const client = row.querySelector('#v32-flow-client');
            const desc = row.querySelector('#v32-flow-desc');
            const formula = row.querySelector('#v32-verif-formula');
            const detailsCard = row.querySelector('#v32-verif-details-card');

            if (progress < 0.70) {
                const t = progress / 0.70;
                if (packet) {
                    packet.style.opacity = '1';
                    packet.className = 'v32-flow-dot green';
                    packet.style.left = `${100 + t * 130}px`; // travels US-Client to API-Server
                }
                if (fill) fill.style.width = `${t * 100}%`;
                if (server) {
                    server.className = 'v32-flow-node';
                    server.classList.remove('pulse-radar');
                }
                if (client) client.className = 'v32-flow-node active-blue';
                if (desc) desc.textContent = "Status: Sending token with request...";
                if (formula) {
                    formula.innerHTML = `<span style="color:var(--jwt-blue);">Tính toán lại:</span> HMACSHA256(Header.Payload, Key)...`;
                }
                if (detailsCard) detailsCard.style.borderColor = 'var(--jwt-border)';
            } else {
                if (packet) packet.style.opacity = '0';
                if (fill) fill.style.width = '100%';
                if (server) {
                    server.className = 'v32-flow-node active-green pulse-radar';
                }
                if (desc) desc.textContent = "Status: Signature matches! (200 OK)";
                if (formula) {
                    formula.innerHTML = `<span style="color:var(--jwt-green); font-weight:bold;">Chữ ký hợp lệ!</span><br/>
<span style="color:var(--jwt-green);">HMAC_Server</span> == <span style="color:var(--jwt-green);">Signature_Token</span><br/>
Hệ thống cấp quyền truy cập.`;
                }
                if (detailsCard) detailsCard.style.borderColor = 'var(--jwt-green)';
            }
        }
        else if (slideId === 'slide_jwt_hack') {
            // Slide 5: Hacker terminal and signature mismatch checker
            const line1 = row.querySelector('#v32-term-line-1');
            const line2 = row.querySelector('#v32-term-line-2');
            const line3 = row.querySelector('#v32-term-line-3');
            
            const termWindow = row.querySelector('#v32-hacker-term');
            const validityTag = row.querySelector('#v32-token-validity-tag');
            const card = row.querySelector('#v32-hacked-card');
            
            const sigCalc = row.querySelector('#v32-sig-calc');
            const sigRec = row.querySelector('#v32-sig-rec');
            
            const alarmBox = row.querySelector('#v32-alarm-box');
            const alarmIcon = row.querySelector('#v32-alarm-icon');
            const alarmText = row.querySelector('#v32-alarm-text');

            // Sequential typing in terminal
            if (line1) line1.style.opacity = progress > 0.15 ? '1' : '0';
            if (line2) line2.style.opacity = progress > 0.35 ? '1' : '0';
            if (line3) line3.style.opacity = progress > 0.55 ? '1' : '0';

            if (progress < 0.65) {
                // Hacker is editing/sending
                if (termWindow) termWindow.classList.remove('shake');
                if (card) {
                    card.style.borderColor = 'rgba(244, 63, 94, 0.35)';
                    card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';
                }
                if (validityTag) {
                    validityTag.textContent = 'CHECKING...';
                    validityTag.style.color = '#fbbf24';
                    validityTag.style.background = 'rgba(251, 191, 36, 0.15)';
                }
                if (sigCalc) sigCalc.textContent = 'Chờ tính...';
                if (sigRec) sigRec.textContent = 'Chờ nhận...';
                
                if (alarmBox) {
                    alarmBox.className = 'v32-alarm-alert';
                    alarmBox.style.color = '#94a3b8';
                }
                if (alarmIcon) {
                    alarmIcon.setAttribute('data-lucide', 'shield-alert');
                    alarmIcon.style.color = '#fbbf24';
                }
                if (alarmText) alarmText.textContent = 'ĐANG ĐỢI TOKEN TỪ HACKER...';
            } else {
                // Hacker gets blocked (Red warning, shake terminal)
                if (termWindow && !termWindow.classList.contains('shake')) {
                    termWindow.classList.add('shake');
                }
                if (card) {
                    card.style.borderColor = '#ef4444';
                    card.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.25)';
                }
                if (validityTag) {
                    validityTag.textContent = 'INVALID SIGNATURE';
                    validityTag.style.color = '#ef4444';
                    validityTag.style.background = 'rgba(239, 68, 68, 0.15)';
                }
                if (sigCalc) sigCalc.textContent = 'eyJSZWNhbGN1bGF0ZWRfdmFsaWRfc2ln...';
                if (sigRec) sigRec.textContent = 'c2lnbmF0dXJlX2FiYzEyMw==...';
                
                if (alarmBox) {
                    alarmBox.className = 'v32-alarm-alert alert-red';
                }
                if (alarmIcon) {
                    alarmIcon.style.color = '#ef4444';
                }
                if (alarmText) alarmText.textContent = '⚠️ CHỮ KÝ KHÔNG KHỚP: TRUY CẬP BỊ CHẶN (401)!';
            }
            if (window.lucide && alarmIcon) {
                window.lucide.createIcons({ node: alarmBox });
            }
        }
        else if (slideId === 'slide_jwt_outro') {
            // Slide 6: High load stateless traffic flow simulation
            const dot1 = row.querySelector('#v32-dot-1');
            const dot2 = row.querySelector('#v32-dot-2');
            const dot3 = row.querySelector('#v32-dot-3');
            const dot4 = row.querySelector('#v32-dot-4');
            const dot5 = row.querySelector('#v32-dot-5');
            
            const serverIcon = row.querySelector('#v32-server-icon');
            const serverGauge = row.querySelector('#v32-server-gauge');
            
            const dbNode = row.querySelector('#v32-db-node');
            const dbGauge = row.querySelector('#v32-db-gauge');

            // Flow packets repeatedly from Clients to Server
            // Clients are at left: ~90px, Server is at center: ~240px. Distance is 150px.
            function animateDot(dotEl, offset) {
                if (!dotEl) return;
                const p = (progress * 6 + offset) % 1.0;
                dotEl.style.opacity = (p > 0.05 && p < 0.95) ? '1' : '0';
                dotEl.style.left = `${90 + p * 150}px`;
            }

            animateDot(dot1, 0.0);
            animateDot(dot2, 0.2);
            animateDot(dot3, 0.4);
            animateDot(dot4, 0.6);
            animateDot(dot5, 0.8);

            // API Server is highly active, flashing green checkmarks or verify status
            if (serverGauge) {
                const reqCount = Math.floor(progress * 1500000);
                serverGauge.textContent = `REQ/S: ${reqCount.toLocaleString()}`;
            }

            // Database node is completely idle (grayed out, load 0%)
            if (dbNode) {
                dbNode.style.opacity = '0.4';
            }
            if (dbGauge) {
                dbGauge.textContent = 'DB LOAD: 0%';
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video32',
        topic: 'Cơ chế bảo mật JWT',
        episodeNum: 32,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video32 Plugin] Loaded: JWT Security 5 slides ready.');
})();
