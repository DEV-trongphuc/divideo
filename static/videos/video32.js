/**
 * Video 32: JSON Web Tokens (JWT) & Stateless Authentication
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video32
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_jwt_1: [
            { text: 'JWT', start: 1.0, end: 10.0, class: 'active-gold' },
            { text: 'chữ ký mã hóa', start: 10.0, end: 17.0, class: 'active-good' }
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
        ]
    };

    const customSlideIds = [
        'slide_jwt_1',
        'slide_jwt_structure',
        'slide_jwt_verification',
        'slide_jwt_hack',
        'slide_jwt_outro'
    ];

    function initIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
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
        // payload for admin role base64: eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ
        const pPart = "eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ"; 
        const sPart = "c2lnbmF0dXJlX2FiYzEyMw"; // Hacker cannot guess correct signature without secret key

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
        // Render Signature (Incorrect signature flashes red warning)
        for (let i = 0; i < sPart.length && charIndex < limit; i++, charIndex++) {
            accumulated += `<span class="part-signature" style="color:var(--jwt-red); text-decoration:line-through;">${sPart[i]}</span>`;
        }

        return accumulated;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_jwt_1') {
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
                    <div class="v32-glass-card" style="padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(255,255,255,0.08);">
                        <span class="v32-status-badge green" style="font-size: 10px;"><i data-lucide="key-round"></i> jwt authorized</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 12px; font-weight: 800; color: var(--jwt-text-muted);" id="v32-token-desc">
                            Generating session token...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
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
            initIcons();
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
            initIcons();
        }
        else if (slideId === 'slide_jwt_hack') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- Hacker Token representation -->
                    <div class="v32-token-card" id="v32-hacked-card" style="border-color: rgba(244, 63, 94, 0.3);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:10px; font-weight:bold; color:var(--jwt-red); text-transform:uppercase; letter-spacing:1px; display:inline-flex; align-items:center; gap:4px;">
                                <i data-lucide="alert-octagon" style="color:var(--jwt-red); width:12px; height:12px;"></i> Tampered Token
                            </span>
                            <span style="font-size: 8px; font-family: monospace; background:rgba(244, 63, 94, 0.15); padding: 2px 6px; border-radius:4px; color:var(--jwt-red); font-weight:900;">INVALID SIGNATURE</span>
                        </div>
                        
                        <!-- Colored hacked string -->
                        <div class="v32-token-raw" style="font-size: 12px;" id="v32-hacked-raw">
                            ${getHackedTokenHtml(999)}
                        </div>

                        <!-- Decoded payload values showing admin tampering -->
                        <div style="background:rgba(0,0,0,0.25); border-radius:10px; padding:10px 14px; border:1px solid rgba(255,255,255,0.05); text-align:left; font-size:12px;">
                            <div style="font-size:10px; color:var(--jwt-text-muted); font-weight:bold; text-transform:uppercase; margin-bottom:4px;">Hacker Decoded Payload</div>
                            <div style="font-family:'Fira Code', monospace; display:flex; justify-content:space-between; align-items:center;">
                                <span>role: <strong style="color:var(--jwt-red); font-weight:900;" id="v32-hack-role-val">"admin"</strong></span>
                                <span style="font-size:9px; color:var(--jwt-red); background:rgba(244, 63, 94, 0.1); padding:2px 6px; border-radius:4px;">TAMPERED ❌</span>
                            </div>
                        </div>
                    </div>

                    <!-- Flow Diagram -->
                    <div class="v32-glass-card" style="padding:14px; position:relative; overflow:hidden;">
                        <div class="v32-flow-box">
                            <div class="v32-flow-node active-red" id="v32-flow-client-h">
                                <i data-lucide="smartphone" style="width:20px; height:20px; margin-bottom:4px; color:var(--jwt-red);"></i>
                                Hacker
                            </div>

                            <div class="v32-flow-line">
                                <div class="v32-flow-line-fill" id="v32-flow-fill-h" style="background:var(--jwt-red);"></div>
                            </div>
                            
                            <div class="v32-flow-dot red" id="v32-flow-packet-h"></div>
                            <div class="v32-shield-barrier" id="v32-shield-h"></div>

                            <div class="v32-flow-node" id="v32-flow-server-h">
                                <i data-lucide="server" style="width:20px; height:20px; margin-bottom:4px;"></i>
                                API Server
                            </div>
                        </div>

                        <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:10px; display:flex; justify-content:space-between; font-size:11px; font-family:monospace; color:var(--jwt-text-muted);">
                            <span id="v32-flow-desc-h">Status: Hacker sending request...</span>
                            <span style="font-weight:bold; color:var(--jwt-red);" id="v32-flow-verdict-h">Signature check...</span>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_jwt_outro') {
            canvas.innerHTML = `
                <div class="v32-zoom-container" style="justify-content: center; gap: 32px;">
                    <!-- Three part Token blocks connection -->
                    <div class="v32-token-card" style="animation: v32-card-breath 6s ease-in-out infinite; gap: 12px;">
                        <!-- Header -->
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 16px; border-radius:10px; background:rgba(239, 68, 68, 0.05); border:1px solid rgba(239, 68, 68, 0.15); border-left:4px solid #ef4444;" class="v32-outro-part" id="v32-outro-h">
                            <span style="font-family:'Fira Code', monospace; font-size:13px; font-weight:bold; color:#ef4444;">HEADER</span>
                            <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Alg & Type</span>
                        </div>
                        <!-- Payload -->
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 16px; border-radius:10px; background:rgba(59, 130, 246, 0.05); border:1px solid rgba(59, 130, 246, 0.15); border-left:4px solid #3b82f6;" class="v32-outro-part" id="v32-outro-p">
                            <span style="font-family:'Fira Code', monospace; font-size:13px; font-weight:bold; color:#3b82f6;">PAYLOAD</span>
                            <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">User Claims</span>
                        </div>
                        <!-- Signature -->
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 16px; border-radius:10px; background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.2); border-left:4px solid #10b981;" class="v32-outro-part" id="v32-outro-s">
                            <span style="font-family:'Fira Code', monospace; font-size:13px; font-weight:bold; color:#10b981;">SIGNATURE</span>
                            <span style="display:inline-flex; align-items:center; gap:4px; font-size:10px; font-weight:bold; color:#10b981; text-transform:uppercase; background:rgba(16,185,129,0.1); padding:2px 8px; border-radius:12px;" id="v32-outro-sig-badge">
                                <i data-lucide="key-round" style="width:10px; height:10px;"></i> Verified
                            </span>
                        </div>
                    </div>
                    <!-- Summary Card -->
                    <div class="glass-card" style="padding:18px 28px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); border-radius:16px; text-align:center; width:100%; max-width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6); animation: v32-card-breath 6s ease-in-out infinite 1s;">
                        <div style="font-family:'Outfit', sans-serif; font-size:16px; font-weight:800; color:var(--gold-primary); letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:8px;">JSON Web Token Security</div>
                        <div style="font-size:15px; color:#94a3b8; line-height:1.6; display:block;">Xác thực Stateless không trạng thái, an toàn và mở rộng tối đa</div>
                    </div>
                </div>
            `;
            initIcons();
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying) {
        if (slideId === 'slide_jwt_1') {
            const typingEl = canvas.querySelector('#v32-token-typing');
            const descEl = canvas.querySelector('#v32-token-desc');

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
            const headerBlock = canvas.querySelector('#v32-block-header');
            const payloadBlock = canvas.querySelector('#v32-block-payload');
            const signatureBlock = canvas.querySelector('#v32-block-signature');

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
            const packet = canvas.querySelector('#v32-flow-packet');
            const fill = canvas.querySelector('#v32-flow-fill');
            const server = canvas.querySelector('#v32-flow-server');
            const client = canvas.querySelector('#v32-flow-client');
            const desc = canvas.querySelector('#v32-flow-desc');
            const formula = canvas.querySelector('#v32-verif-formula');
            const detailsCard = canvas.querySelector('#v32-verif-details-card');

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
            const packet = canvas.querySelector('#v32-flow-packet-h');
            const fill = canvas.querySelector('#v32-flow-fill-h');
            const server = canvas.querySelector('#v32-flow-server-h');
            const client = canvas.querySelector('#v32-flow-client-h');
            const shield = canvas.querySelector('#v32-shield-h');
            const desc = canvas.querySelector('#v32-flow-desc-h');
            const verdict = canvas.querySelector('#v32-flow-verdict-h');
            const card = canvas.querySelector('#v32-hacked-card');

            if (progress < 0.65) {
                const t = progress / 0.65;
                if (packet) {
                    packet.style.opacity = '1';
                    packet.style.left = `${100 + t * 70}px`; // travels only halfway to the shield
                }
                if (fill) fill.style.width = `${t * 50}%`;
                if (shield) shield.classList.remove('active');
                if (server) {
                    server.className = 'v32-flow-node';
                    server.classList.remove('pulse-radar');
                }
                if (desc) desc.textContent = "Status: Hacker sending altered token...";
                if (verdict) {
                    verdict.textContent = "Checking Signature...";
                    verdict.style.color = "var(--jwt-text-muted)";
                }
                if (card) {
                    card.style.borderColor = 'rgba(244, 63, 94, 0.3)';
                    card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.75)';
                    card.classList.remove('shake');
                }
            } else {
                // Blocked at server signature comparison check
                if (packet) packet.style.opacity = '0';
                if (fill) fill.style.width = '50%';
                if (shield) shield.classList.add('active');
                if (server) server.className = 'v32-flow-node active-red';
                if (desc) desc.textContent = "Status: SIGNATURE VERIFICATION FAILED!";
                if (verdict) {
                    verdict.textContent = "401 Unauthorized ❌";
                    verdict.style.color = "var(--jwt-red)";
                }
                if (card) {
                    card.style.borderColor = 'var(--jwt-red)';
                    card.style.boxShadow = '0 0 30px var(--jwt-red-glow)';
                    if (!card.classList.contains('shake')) {
                        card.classList.add('shake');
                    }
                }
            }
        }
        else if (slideId === 'slide_jwt_outro') {
            const parts = canvas.querySelectorAll('.v32-outro-part');
            parts.forEach((part, idx) => {
                const wave = Math.abs(Math.sin((progress * 4 * Math.PI) - (idx * 0.8)));
                part.style.transform = `scale(${1 + wave * 0.04})`;
            });
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
