/**
 * Video 21: URL Shortener Mechanics - Rút gọn Link bằng cách nào mà không bao giờ trùng?
 * Plugin file - chứa toàn bộ slide animation/HTML cho video21
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_shortener_1a: [
            { text: 'rút gọn link', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'không bao giờ bị trùng', start: 10.0, end: 14.5, class: 'active-good' }
        ],
        slide_shortener_1b: [
            { text: 'hệ thống phân tán', start: 1.0, end: 8.0, class: 'active-gold' }
        ],
        slide_shortener_2: [
            { text: 'hệ cơ số 62', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: '56 tỷ mã', start: 10.0, end: 16.0, class: 'active-good' },
            { text: '3,5 nghìn tỷ', start: 16.0, end: 22.0, class: 'active-good' }
        ],
        slide_shortener_3: [
            { text: 'bộ sinh ID duy nhất', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'tăng thêm một đơn vị', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'chuyển đổi sang Base62', start: 16.0, end: 23.0, class: 'active-good' }
        ],
        slide_shortener_4: [
            { text: 'bộ điều phối Zookeeper', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'dải ID riêng biệt', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'tự tăng ID cục bộ', start: 16.0, end: 23.0, class: 'active-good' }
        ],
        slide_shortener_5: [
            { text: 'đoán được liên kết', start: 4.0, end: 10.0, class: 'active-bad' },
            { text: 'xáo trộn các bit', start: 10.0, end: 17.0, class: 'active-gold' },
            { text: 'không thể đoán trước', start: 17.0, end: 23.0, class: 'active-good' }
        ],
        slide_shortener_6: [
            { text: 'lưu vào Redis và Database', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'giải mã ngược', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'redirect 301', start: 16.0, end: 23.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_shortener_1a', 'slide_shortener_1b', 'slide_shortener_2', 'slide_shortener_3', 'slide_shortener_4', 'slide_shortener_5',
        'slide_shortener_6'
    ];

    // Helper: Generate random cylinder chars with the active char fixed at center index 8
    function makeColumnChars(activeChar) {
        const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let result = [];
        for (let i = 0; i < 15; i++) {
            if (i === 8) {
                result.push(activeChar);
            } else {
                let c;
                do {
                    c = charset[Math.floor(Math.random() * charset.length)];
                } while (c === activeChar || result.includes(c));
                result.push(c);
            }
        }
        return result;
    }

    // Helper: Render slot reel column
    function makeBase62ColumnHTML(activeChar, colIdx) {
        const columnChars = makeColumnChars(activeChar);
        let html = `<div class="reel-container reel-col-${colIdx}" data-active-idx="8" style="position: relative; width: 44px; height: 140px; overflow: hidden; background: rgba(5,5,10,0.7); border: 1.5px solid rgba(245, 158, 11, 0.2); border-radius: 8px; box-shadow: inset 0 0 15px rgba(0,0,0,0.9), 0 0 10px rgba(245,158,11,0.05); display: flex; justify-content: center;">`;
        html += `<div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%); pointer-events: none; z-index: 10;"></div>`;
        html += `<div style="position: absolute; top: 0; left: 0; right: 0; height: 45px; background: linear-gradient(to bottom, #0c0f17 100%, transparent); opacity: 0.95; pointer-events: none; z-index: 5;"></div>`;
        html += `<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 45px; background: linear-gradient(to top, #0c0f17 100%, transparent); opacity: 0.95; pointer-events: none; z-index: 5;"></div>`;
        html += `<div style="position: absolute; top: 52px; left: 2px; right: 2px; height: 36px; border-top: 1px dashed rgba(245, 158, 11, 0.45); border-bottom: 1px dashed rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.05); pointer-events: none; z-index: 4;"></div>`;
        
        html += `<div class="b62-column-strip" style="position:absolute; top:0; display:flex; flex-direction:column; align-items:center; gap:0; padding:52px 0; width: 100%;">`;
        columnChars.forEach((char) => {
            const isActive = char === activeChar;
            const color = isActive ? '#f59e0b' : 'rgba(255,255,255,0.2)';
            const scale = isActive ? 'scale(1.25)' : 'scale(0.85)';
            const fontWeight = isActive ? 'bold' : '500';
            const textShadow = isActive ? '0 0 10px rgba(245, 158, 11, 0.7)' : 'none';
            html += `<span class="b62-char" data-char="${char}" style="font-size:22px; font-family:monospace; color:${color}; transform:${scale}; font-weight:${fontWeight}; height:36px; line-height:36px; text-shadow:${textShadow}; transition: all 0.2s;">${char}</span>`;
        });
        html += `</div></div>`;
        return html;
    }

    // Helper: Make visual digital odometer container
    function makeOdometerHTML(numDigits) {
        let html = `<div class="odometer-container" style="display:flex; justify-content:center; gap:3px;">`;
        for (let i = 0; i < numDigits; i++) {
            html += `<div class="digit-card" id="odo-digit-${i}">0</div>`;
        }
        html += `</div>`;
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_shortener_1a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v21-scene-wrapper">
                        <div class="cyber-grid" style="position:absolute; inset:0; pointer-events:none;"></div>
                        <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                            <div class="v21-bitly-intro-container">
                                <div class="v21-bitly-glow-ring"></div>
                                <div class="v21-bitly-glow-ring inner"></div>
                                <div class="v21-giant-bitly-logo">
                                    <img src="https://mkt-static.bitly.com/static/1781279141/pages/wp-content/uploads/2021/08/bitly_logo.svg" alt="Bitly Logo" style="filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6));">
                                </div>
                            </div>
                            
                            <!-- Premium Badge and Label in Glass Card -->
                            <div class="glass-card glow-gold" style="text-align: center; width: 440px; padding: 18px 24px; border-radius: 20px; border: 1.5px solid rgba(245, 158, 11, 0.4); background: rgba(13, 17, 28, 0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 15px;">
                                <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); color: var(--gold-secondary); border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                    <i data-lucide="link" style="width:14px;height:14px;"></i> URL Shortener Ingestion
                                </div>
                                <div style="font-family:'Fira Code', monospace; font-size: 16px; font-weight: bold; color: var(--gold-secondary); line-height: 1.4;" id="v21-intro-label">
                                    Tại sao rút gọn Link không bao giờ trùng lặp?
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons({ node: canvas });
                }
            }
        }
        else if (slideId === 'slide_shortener_1b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; zoom:1.0;">
                        <!-- URL Compressor Pipeline Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Hệ thống Rút gọn URL (URL Shortener Ingestion)</div>
                            
                            <!-- Absolute Coord Box -->
                            <div style="position:relative; width:820px; height:320px; margin: 15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Left side: Long URL Input Box -->
                                <div class="flow-card long-url-card scanner-container" style="width:250px; height:220px; padding:18px; background:rgba(59,130,246,0.02); border:1.5px solid rgba(59,130,246,0.2); border-radius:16px; box-shadow:0 4px 15px rgba(0,0,0,0.3); display:flex; flex-direction:column; justify-content:space-between; text-align:left; position:absolute; left:10px; top:50px; box-sizing:border-box; z-index:2;">
                                    <div class="scanner-bar" style="--neon-color:#3b82f6;"></div>
                                    <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(59,130,246,0.2); padding-bottom:6px;">
                                        <i data-lucide="globe" style="width:18px; height:18px; color:#3b82f6;"></i>
                                        <span style="font-size:14px; font-weight:bold; color:#3b82f6;">Input Long URL</span>
                                    </div>
                                    <div style="font-family:monospace; font-size:13px; color:#93c5fd; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; line-height:1.5; word-break:break-all; flex:1; margin-top:10px;">
                                        https://example.com/very-long-path-to-article-about-system-design?ref=turniodev&id=823719
                                    </div>
                                    <div style="font-size:11px; font-family:monospace; color:rgba(59,130,246,0.6); text-align:right;">Len: 86 Chars</div>
                                </div>

                                <!-- Center: Core Reactor -->
                                <div style="display:flex; flex-direction:column; align-items:center; position:absolute; left:340px; top:80px; width:140px; height:160px; box-sizing:border-box; z-index:2;">
                                    <!-- Rotating Concentric Reactor -->
                                    <div class="compressor-core-outer" style="position:relative; width:110px; height:110px; display:flex; justify-content:center; align-items:center;">
                                        <svg viewBox="0 0 64 64" style="position:absolute; width:100%; height:100%;">
                                            <!-- Outer Ring -->
                                            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(245,158,11,0.2)" stroke-width="2.5"></circle>
                                            <circle cx="32" cy="32" r="28" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="24 16" class="ring-outer"></circle>
                                            <!-- Inner Ring -->
                                            <circle cx="32" cy="32" r="20" fill="none" stroke="rgba(245,158,11,0.15)" stroke-width="2"></circle>
                                            <circle cx="32" cy="32" r="20" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="12 18" class="ring-inner"></circle>
                                        </svg>
                                        <!-- Core CPU Icon -->
                                        <div style="z-index:2; width:44px; height:44px; border-radius:50%; background:#161b26; border:2px solid var(--gold-primary); display:flex; align-items:center; justify-content:center; box-shadow:0 0 15px rgba(245,158,11,0.4);" class="pulse-glow">
                                            <i data-lucide="cpu" style="width:20px; height:20px; color:var(--gold-primary);" class="icon-spin"></i>
                                        </div>
                                    </div>
                                    <div style="font-size:13px; font-weight:bold; color:var(--gold-primary); margin-top:8px; font-family:monospace; text-shadow:0 0 8px rgba(245,158,11,0.35);">Base62 Engine</div>
                                    <div class="compression-stats" style="font-size:11px; font-family:monospace; color:#94a3b8; margin-top:2px;">Nén: Idle</div>
                                </div>

                                <!-- Right side: Short URL Output Box -->
                                <div class="flow-card short-url-card" style="width:250px; height:220px; padding:18px; background:rgba(16,185,129,0.02); border:1.5px solid rgba(16,185,129,0.2); border-radius:16px; box-shadow:0 4px 15px rgba(0,0,0,0.3); display:flex; flex-direction:column; justify-content:space-between; text-align:left; position:absolute; left:560px; top:50px; box-sizing:border-box; transition:all 0.4s; z-index:2;">
                                    <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:6px;">
                                        <div style="width:10px; height:10px; border-radius:50%; background:#10b981;" class="ping-circle"></div>
                                        <span style="font-size:14px; font-weight:bold; color:#10b981;">Output Short URL</span>
                                    </div>
                                    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:8px;">
                                        <div style="font-family:monospace; font-size:24px; font-weight:bold; color:#10b981; text-shadow:0 0 10px rgba(16,185,129,0.4);" class="short-url-val-glow">
                                            tn.dev/a8G4zP
                                        </div>
                                        <span style="font-size:11px; background:rgba(16,185,129,0.12); color:#10b981; padding:3px 8px; border-radius:5px; font-weight:bold; font-family:monospace;">Length: 6 Chars</span>
                                    </div>
                                    <div style="font-size:11px; font-family:monospace; color:rgba(16,185,129,0.6); text-align:right;">Tỷ lệ trùng: 0%</div>
                                </div>

                                <!-- SVG Laser Line Overlays connecting paths perfectly -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="pipe-lines-svg">
                                    <!-- Left input edge to core (y=160) -->
                                    <path d="M 260 160 L 340 160" stroke="rgba(59,130,246,0.2)" stroke-width="2.5" fill="none" class="input-glow-path"></path>
                                    <circle cx="260" cy="160" r="5.5" fill="#3b82f6" class="input-pulse-dot" style="display:none; filter:drop-shadow(0 0 4px #3b82f6);"></circle>
                                    <!-- Core to right output edge (y=160) -->
                                    <path d="M 480 160 L 560 160" stroke="rgba(16,185,129,0.2)" stroke-width="2.5" fill="none" class="output-glow-path"></path>
                                    <circle cx="480" cy="160" r="5.5" fill="#10b981" class="output-pulse-dot" style="display:none; filter:drop-shadow(0 0 4px #10b981);"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons({ node: canvas });
                }
            }
        }
        else if (slideId === 'slide_shortener_2') {
            if (needsTemplate) {
                const targetKey = ['a', '8', 'G', '4', 'z', 'P'];
                
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Base62 Math Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Hệ Cơ Số 62 (Base62) &amp; Sức chứa</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.12); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">Charset: [0-9][a-z][A-Z] (62 ký tự)</div>
                            </div>

                            <div style="flex:1; display:flex; justify-content:space-around; align-items:center; margin:15px 0;">
                                <!-- Slot Machine Columns -->
                                <div style="display:flex; gap:10px; align-items:center; padding:10px; background:rgba(0,0,0,0.2); border-radius:14px; border:1px solid rgba(255,255,255,0.04);">
                                    ${targetKey.map((char, index) => makeBase62ColumnHTML(char, index)).join('')}
                                </div>

                                <!-- Math Formulas Display -->
                                <div style="display:flex; flex-direction:column; gap:14px; width:340px; text-align:left;">
                                    <div style="background:rgba(255,255,255,0.015); border:1.5px solid rgba(255,255,255,0.05); border-radius:16px; padding:18px; display:flex; flex-direction:column; gap:6px;" class="metric-card-1">
                                        <div style="font-size:16px; font-weight:bold; color:#3b82f6;">Với 6 ký tự Base62:</div>
                                        <div style="font-size:26px; font-weight:bold; color:#fff; font-family:monospace; letter-spacing:0.5px;">
                                            62<sup>6</sup> = <span style="color:#10b981;" class="glow-green">56.8 Tỷ</span>
                                        </div>
                                        <!-- Neon progress gauge vs global population -->
                                        <div style="height:5px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden; margin-top:4px;">
                                            <div style="width:100%; height:100%; background:#10b981; box-shadow:0 0 8px #10b981; border-radius:3px;"></div>
                                        </div>
                                        <div style="font-size:12px; color:#94a3b8; display:flex; justify-content:space-between; margin-top:2px;">
                                            <span>Đủ cấp 7 link/người</span>
                                            <span style="color:#10b981; font-weight:bold;">Vượt xa dân số (8 tỷ)</span>
                                        </div>
                                    </div>

                                    <div style="background:rgba(255,255,255,0.015); border:1.5px solid rgba(255,255,255,0.05); border-radius:16px; padding:18px; display:flex; flex-direction:column; gap:6px;" class="metric-card-2">
                                        <div style="font-size:16px; font-weight:bold; color:#f59e0b;">Với 7 ký tự Base62:</div>
                                        <div style="font-size:26px; font-weight:bold; color:#fff; font-family:monospace; letter-spacing:0.5px;">
                                            62<sup>7</sup> = <span style="color:#f59e0b;" class="glow-gold">3.5 Nghìn Tỷ</span>
                                        </div>
                                        <div style="height:5px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden; margin-top:4px;">
                                            <div style="width:0%; height:100%; background:#f59e0b; box-shadow:0 0 8px #f59e0b; border-radius:3px; transition: width 1s;" class="gauge-bar-7"></div>
                                        </div>
                                        <div style="font-size:12px; color:#94a3b8; display:flex; justify-content:space-between; margin-top:2px;">
                                            <span>Sức chứa khổng lồ</span>
                                            <span style="color:#f59e0b; font-weight:bold;">Không bao giờ cạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="background:rgba(255,255,255,0.015); border:1.5px solid rgba(255,255,255,0.05); border-radius:14px; padding:14px 20px; text-align:left; font-size:16px; font-family:monospace; color:#e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                                <span>Ví dụ: ID gốc <strong style="color:#3b82f6;">56800235</strong> <i data-lucide="chevrons-right" style="width:18px; height:18px; display:inline-block; vertical-align:middle; color:#3b82f6;"></i> Base62: <strong style="color:#f59e0b;" class="sample-base62-out">a8G4zP</strong></span>
                                <span style="color:#10b981; font-weight:bold; text-shadow:0 0 6px rgba(16,185,129,0.3);">Khả năng trùng: 0%</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_shortener_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- ID Generator Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Cơ chế Đếm Tự Động (Auto-Increment) &amp; Mã hóa</div>

                            <div style="flex:1; display:flex; align-items:center; justify-content:space-between; margin:20px 0; gap:10px; position:relative; width:100%;">
                                <!-- Odometer Digit Flip Counter Block -->
                                <div class="math-block id-counter-block" style="width:260px; text-align:left; border-color:#3b82f6; background:rgba(59,130,246,0.015); height:250px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; border-width:1.5px;">
                                    <div>
                                        <div style="font-size:16px; font-weight:bold; color:#3b82f6; margin-bottom:8px; border-bottom:1px solid rgba(59,130,246,0.2); padding-bottom:6px; display:flex; align-items:center; gap:8px;">
                                            <i data-lucide="plus-circle" style="width:18px; height:18px;"></i>
                                            <span>Atomic Counter</span>
                                        </div>
                                        <div style="font-size:13px; color:#94a3b8; line-height:1.5; margin-bottom:12px;">Đếm tự động, tăng tuần tự trong luồng phân tán.</div>
                                    </div>
                                    
                                    <!-- Odometer digital grid -->
                                    <div style="display:flex; justify-content:center; background:rgba(0,0,0,0.45); padding:16px 10px; border-radius:12px; border:1px solid rgba(59,130,246,0.25);">
                                        ${makeOdometerHTML(8)}
                                    </div>
                                    
                                    <div style="font-size:11px; font-family:monospace; color:#3b82f6; text-align:center;">Thread-Safe / Lock-Free ID</div>
                                </div>

                                <!-- Connecting Lines SVGs -->
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:32px; height:32px;" class="flow-arrow-down-1"></i>
                                </div>

                                <!-- Encoder Division Process -->
                                <div class="math-block convert-block" style="width:310px; border-color:#f59e0b; background:rgba(245,158,11,0.015); text-align:left; height:250px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; border-width:1.5px; position:relative;">
                                    <div style="font-size:16px; font-weight:bold; color:#f59e0b; margin-bottom:4px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(245,158,11,0.2); padding-bottom:6px;">
                                        <i data-lucide="binary" style="width:18px; height:18px;"></i>
                                        <span>Base62 Conversion (Modulo)</span>
                                    </div>
                                    
                                    <div style="font-size:12px; color:#d1d5db; font-family:monospace; flex:1; display:flex; flex-direction:column; justify-content:center; gap:6px; line-height:1.6;" class="modulo-math-stack">
                                        <!-- Step lines will insert here dynamically -->
                                        <div class="math-step-line" style="color:rgba(255,255,255,0.3);">Chờ nạp ID...</div>
                                    </div>
                                </div>

                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:32px; height:32px;" class="flow-arrow-down-2"></i>
                                </div>

                                <!-- Short Key Output Box -->
                                <div class="math-block output-key-block" style="width:220px; text-align:left; border-color:#10b981; background:rgba(16,185,129,0.015); height:250px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; border-width:1.5px;">
                                    <div>
                                        <div style="font-size:16px; font-weight:bold; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:6px; display:flex; align-items:center; gap:8px;">
                                            <i data-lucide="link" style="width:18px; height:18px;"></i>
                                            <span>Short Key</span>
                                        </div>
                                        <div style="font-size:13px; color:#94a3b8; line-height:1.5; margin-bottom:12px;">Mã định danh 6 ký tự Base62.</div>
                                    </div>
                                    <div style="font-size:28px; font-family:monospace; color:#10b981; font-weight:bold; text-align:center; background:rgba(0,0,0,0.45); padding:14px; border-radius:10px; text-shadow:0 0 10px rgba(16,185,129,0.5); border:1.5px solid rgba(16,185,129,0.25);" class="short-key-val">
                                        5MeO
                                    </div>
                                    <div style="font-size:11px; font-family:monospace; color:#10b981; text-align:center;">Collision-Free Link</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_shortener_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; zoom:1.0;">
                        <!-- Distributed Range Allocator Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Hệ điều phối dải ID (Distributed Range Allocator)</div>
                                <div style="font-size:14px; background:rgba(139,92,246,0.15); padding:2px 10px; border-radius:6px; color:#c084fc; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="share-2" style="width:14px; height:14px;"></i> Zookeeper Cluster
                                </div>
                            </div>

                            <!-- Absolute Coord Box -->
                            <div style="position:relative; width:820px; height:350px; margin: 15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Coordinator Node (Zookeeper) -->
                                <div class="coordinator-node pulse-glow" style="padding:12px 34px; background:rgba(139,92,246,0.06); border:2.5px solid #8b5cf6; border-radius:20px; font-size:18px; font-weight:bold; color:#a78bfa; text-align:center; box-shadow:0 0 25px rgba(139,92,246,0.35); z-index:5; display:flex; align-items:center; gap:10px; position:absolute; left:270px; top:15px; width:280px; box-sizing:border-box;">
                                    <div style="position:absolute; inset:-4px; border:1px solid rgba(139,92,246,0.4); border-radius:24px; animation: ping-wave 2s infinite;"></div>
                                    <i data-lucide="shield" style="width:20px; height:20px; color:#a78bfa;"></i>
                                    <span>Zookeeper Coordinator</span>
                                </div>

                                <!-- Server A -->
                                <div class="server-node node-a" style="display:flex; flex-direction:column; gap:8px; width:240px; height:160px; padding:16px; border-radius:16px; background:rgba(59,130,246,0.02); border:2px solid rgba(59,130,246,0.15); box-sizing:border-box; position:absolute; left:20px; top:160px; z-index:2;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                        <span style="font-size:15px; font-weight:bold; color:#3b82f6; display:flex; align-items:center; gap:6px;">
                                            <i data-lucide="server" style="width:16px; height:16px;"></i>
                                            <span>Web Server A</span>
                                        </span>
                                        <div style="width:8px; height:8px; border-radius:50%;" class="led-blink-green"></div>
                                    </div>
                                    <div style="font-size:12px; color:#94a3b8; text-align:center;">Dải: <strong style="color:#fff;">[1.0M - 1.9M]</strong></div>
                                    
                                    <div style="display:flex; align-items:flex-end; gap:3px; height:25px; background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; border:1px solid rgba(255,255,255,0.05); width:100%;">
                                        <div style="flex:1; background:#3b82f6; height:45%; border-radius:1px; animation: traffic-pulse 1.3s infinite alternate;"></div>
                                        <div style="flex:1; background:#3b82f6; height:75%; border-radius:1px; animation: traffic-pulse 0.9s infinite alternate 0.1s;"></div>
                                        <div style="flex:1; background:#3b82f6; height:50%; border-radius:1px; animation: traffic-pulse 1.4s infinite alternate 0.3s;"></div>
                                        <div style="flex:1; background:#3b82f6; height:85%; border-radius:1px; animation: traffic-pulse 0.8s infinite alternate 0.2s;"></div>
                                    </div>
                                    <div style="font-size:18px; font-family:monospace; color:#3b82f6; font-weight:bold; text-shadow:0 0 8px rgba(59,130,246,0.4); text-align:center;" class="srv-counter-a">ID: 1,002,517</div>
                                </div>

                                <!-- Server B -->
                                <div class="server-node node-b" style="display:flex; flex-direction:column; gap:8px; width:240px; height:160px; padding:16px; border-radius:16px; background:rgba(249,115,22,0.02); border:2px solid rgba(249,115,22,0.15); box-sizing:border-box; position:absolute; left:290px; top:160px; z-index:2;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                        <span style="font-size:15px; font-weight:bold; color:#f97316; display:flex; align-items:center; gap:6px;">
                                            <i data-lucide="server" style="width:16px; height:16px;"></i>
                                            <span>Web Server B</span>
                                        </span>
                                        <div style="width:8px; height:8px; border-radius:50%;" class="led-blink-orange"></div>
                                    </div>
                                    <div style="font-size:12px; color:#94a3b8; text-align:center;">Dải: <strong style="color:#fff;">[2.0M - 2.9M]</strong></div>
                                    
                                    <div style="display:flex; align-items:flex-end; gap:3px; height:25px; background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; border:1px solid rgba(255,255,255,0.05); width:100%;">
                                        <div style="flex:1; background:#f97316; height:35%; border-radius:1px; animation: traffic-pulse 1.1s infinite alternate 0.2s;"></div>
                                        <div style="flex:1; background:#f97316; height:90%; border-radius:1px; animation: traffic-pulse 0.7s infinite alternate;"></div>
                                        <div style="flex:1; background:#f97316; height:60%; border-radius:1px; animation: traffic-pulse 1.5s infinite alternate 0.4s;"></div>
                                        <div style="flex:1; background:#f97316; height:45%; border-radius:1px; animation: traffic-pulse 1s infinite alternate 0.1s;"></div>
                                    </div>
                                    <div style="font-size:18px; font-family:monospace; color:#f97316; font-weight:bold; text-shadow:0 0 8px rgba(249,115,22,0.4); text-align:center;" class="srv-counter-b">ID: 2,000,104</div>
                                </div>

                                <!-- Server C -->
                                <div class="server-node node-c" style="display:flex; flex-direction:column; gap:8px; width:240px; height:160px; padding:16px; border-radius:16px; background:rgba(236,72,153,0.02); border:2px solid rgba(236,72,153,0.15); box-sizing:border-box; position:absolute; left:560px; top:160px; z-index:2;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                        <span style="font-size:15px; font-weight:bold; color:#ec4899; display:flex; align-items:center; gap:6px;">
                                            <i data-lucide="server" style="width:16px; height:16px;"></i>
                                            <span>Web Server C</span>
                                        </span>
                                        <div style="width:8px; height:8px; border-radius:50%;" class="led-blink-pink"></div>
                                    </div>
                                    <div style="font-size:12px; color:#94a3b8; text-align:center;">Dải: <strong style="color:#fff;">[3.0M - 3.9M]</strong></div>
                                    
                                    <div style="display:flex; align-items:flex-end; gap:3px; height:25px; background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; border:1px solid rgba(255,255,255,0.05); width:100%;">
                                        <div style="flex:1; background:#ec4899; height:50%; border-radius:1px; animation: traffic-pulse 1.4s infinite alternate 0.1s;"></div>
                                        <div style="flex:1; background:#ec4899; height:30%; border-radius:1px; animation: traffic-pulse 1.2s infinite alternate 0.3s;"></div>
                                        <div style="flex:1; background:#ec4899; height:80%; border-radius:1px; animation: traffic-pulse 0.8s infinite alternate 0.1s;"></div>
                                        <div style="flex:1; background:#ec4899; height:70%; border-radius:1px; animation: traffic-pulse 1.1s infinite alternate 0.2s;"></div>
                                    </div>
                                    <div style="font-size:18px; font-family:monospace; color:#ec4899; font-weight:bold; text-shadow:0 0 8px rgba(236,72,153,0.4); text-align:center;" class="srv-counter-c">ID: 3,001,489</div>
                                </div>

                                <!-- Connecting paths SVGs -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="range-lines-svg">
                                    <!-- From coordinator center bottom (410, 67) to servers centers top (140/410/680, 160) -->
                                    <path d="M 410 67 Q 275 105 140 160" stroke="rgba(139,92,246,0.25)" stroke-width="2" fill="none" class="coord-path-a"></path>
                                    <path d="M 410 67 L 410 160" stroke="rgba(139,92,246,0.25)" stroke-width="2" fill="none" class="coord-path-b"></path>
                                    <path d="M 410 67 Q 545 105 680 160" stroke="rgba(139,92,246,0.25)" stroke-width="2" fill="none" class="coord-path-c"></path>
                                    
                                    <!-- Moving packets -->
                                    <circle cx="410" cy="67" r="5" fill="#a78bfa" class="packet-dot-a" style="display:none; filter:drop-shadow(0 0 4px #a78bfa);"></circle>
                                    <circle cx="410" cy="67" r="5" fill="#a78bfa" class="packet-dot-b" style="display:none; filter:drop-shadow(0 0 4px #a78bfa);"></circle>
                                    <circle cx="410" cy="67" r="5" fill="#a78bfa" class="packet-dot-c" style="display:none; filter:drop-shadow(0 0 4px #a78bfa);"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_shortener_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; zoom:1.0;">
                        <!-- Bit Shuffling Security Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Mã hóa ngăn chặn dò đoán URL (Bit Shuffling Security)</div>
                            
                            <!-- Absolute Coord Box -->
                            <div style="position:relative; width:820px; height:350px; margin: 15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Left side: Original ID in Binary -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:8px; width:50px; position:absolute; left:40px; top:15px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:13px; font-weight:bold; color:#3b82f6; white-space:nowrap; margin-bottom:4px;">ID Gốc: 22</span>
                                    
                                    <div style="display:flex; flex-direction:column; gap:4px;" class="bit-col-left">
                                        <div class="bit-node bit-l-0 active-0">0</div>
                                        <div class="bit-node bit-l-1 active-0">0</div>
                                        <div class="bit-node bit-l-2 active-0">0</div>
                                        <div class="bit-node bit-l-3 active-1">1</div>
                                        <div class="bit-node bit-l-4 active-0">0</div>
                                        <div class="bit-node bit-l-5 active-1">1</div>
                                        <div class="bit-node bit-l-6 active-1">1</div>
                                        <div class="bit-node bit-l-7 active-0">0</div>
                                    </div>
                                </div>

                                <!-- Right side: Shuffled ID in Binary -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:8px; width:50px; position:absolute; left:380px; top:15px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:13px; font-weight:bold; color:#10b981; white-space:nowrap; margin-bottom:4px;" class="shuffled-title-lbl">Xáo Trộn: 0</span>
                                    
                                    <div style="display:flex; flex-direction:column; gap:4px;" class="bit-col-right">
                                        <div class="bit-node bit-r-0 active-0">0</div>
                                        <div class="bit-node bit-r-1 active-0">0</div>
                                        <div class="bit-node bit-r-2 active-0">0</div>
                                        <div class="bit-node bit-r-3 active-0">0</div>
                                        <div class="bit-node bit-r-4 active-0">0</div>
                                        <div class="bit-node bit-r-5 active-0">0</div>
                                        <div class="bit-node bit-r-6 active-0">0</div>
                                        <div class="bit-node bit-r-7 active-0">0</div>
                                    </div>
                                </div>

                                <!-- SVGs crossovers wires (connecting left column at x=56 to right column at x=396) -->
                                <svg style="position:absolute; left:56px; top:0; width:340px; height:350px; pointer-events:none; z-index:1;" class="bit-wires-svg">
                                    <!-- Crossover paths. Centers: y_left_i = 46 + i*36 -->
                                    <path d="M 0 46 L 340 154" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" class="wire-0 wire-path"></path>
                                    <path d="M 0 82 L 340 262" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" class="wire-1 wire-path"></path>
                                    <path d="M 0 118 L 340 46" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" class="wire-2 wire-path"></path>
                                    
                                    <!-- Active crossover lines (for index 3, 5, 6) -->
                                    <path d="M 0 154 L 340 298" stroke="rgba(59,130,246,0.25)" stroke-width="2.5" fill="none" class="wire-3 wire-path" id="p-wire-3"></path>
                                    <path d="M 0 190 L 340 118" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" class="wire-4 wire-path"></path>
                                    <path d="M 0 226 L 340 82" stroke="rgba(59,130,246,0.25)" stroke-width="2.5" fill="none" class="wire-5 wire-path" id="p-wire-5"></path>
                                    <path d="M 0 262 L 340 226" stroke="rgba(59,130,246,0.25)" stroke-width="2.5" fill="none" class="wire-6 wire-path" id="p-wire-6"></path>
                                    
                                    <path d="M 0 298 L 340 190" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" class="wire-7 wire-path"></path>

                                    <!-- Pulse flows travelling -->
                                    <circle cx="0" cy="154" r="5.5" fill="#f59e0b" class="glow-dot-3" style="display:none; filter:drop-shadow(0 0 6px #f59e0b);"></circle>
                                    <circle cx="0" cy="226" r="5.5" fill="#f59e0b" class="glow-dot-5" style="display:none; filter:drop-shadow(0 0 6px #f59e0b);"></circle>
                                    <circle cx="0" cy="262" r="5.5" fill="#f59e0b" class="glow-dot-6" style="display:none; filter:drop-shadow(0 0 6px #f59e0b);"></circle>
                                </svg>

                                <!-- Text explanation & Scrambler Key Matrix -->
                                <div style="width:260px; display:flex; flex-direction:column; gap:12px; text-align:left; position:absolute; left:540px; top:15px; z-index:2;">
                                    <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:4px;">
                                        <div style="font-size:12px; font-weight:bold; color:#f59e0b; text-transform:uppercase;">Scrambler Matrix Key</div>
                                        <div style="font-family:monospace; font-size:11px; color:#94a3b8; display:grid; grid-template-columns:repeat(4,1fr); gap:4px; text-align:center;">
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px;">0→3</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px;">1→6</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px;">2→0</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px; background:rgba(59,130,246,0.15); color:#fff;">3→7</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px;">4→2</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px; background:rgba(59,130,246,0.15); color:#fff;">5→1</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px; background:rgba(59,130,246,0.15); color:#fff;">6→5</span>
                                            <span style="border:1px solid rgba(255,255,255,0.05); padding:2px;">7→4</span>
                                        </div>
                                    </div>
                                    <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:12px; font-size:12px; color:#94a3b8; line-height:1.5;">
                                        Kẻ tấn công không thể dò link tiếp theo vì ID đã bị xáo trộn vị trí các bit một cách hỗn loạn.
                                    </div>
                                    <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:12px; padding:14px; text-align:center;">
                                        <div style="font-size:11px; color:#94a3b8; margin-bottom:4px; text-transform:uppercase;">Short Key Output</div>
                                        <div style="font-size:22px; font-weight:bold; color:#10b981; font-family:monospace;" class="shuffled-b62-val">tn.dev/1c</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_shortener_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; zoom:1.0;">
                        <!-- Redirect Pipeline Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Luồng Chuyển Hướng Siêu Tốc (Redirect Routing Pipeline)</div>
                                <div style="font-size:14px; background:rgba(16,185,129,0.12); padding:2px 10px; border-radius:6px; color:#10b981; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="zap" style="width:14px; height:14px;"></i> Speed: &lt; 10ms (Redis)
                                </div>
                            </div>

                            <!-- Absolute Coord Box -->
                            <div style="position:relative; width:820px; height:350px; margin: 15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Step 1: User Click -->
                                <div class="flow-step step-client" style="display:flex; flex-direction:column; align-items:center; gap:8px; width:150px; height:120px; padding:12px; border-radius:14px; background:rgba(255,255,255,0.015); transition:all 0.3s; position:absolute; left:20px; top:40px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:14px; font-weight:bold; color:#a78bfa; white-space:nowrap;">1. User Click</span>
                                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); display:flex; align-items:center; justify-content:center;">
                                        <i data-lucide="mouse-pointer-click" style="width:20px; height:20px; color:#a78bfa;"></i>
                                    </div>
                                    <span style="font-size:13px; font-family:monospace; color:#94a3b8; text-align:center;">tn.dev/a8G4zP</span>
                                </div>

                                <!-- Step 2: Web Server -->
                                <div class="flow-step step-server" style="display:flex; flex-direction:column; align-items:center; gap:8px; width:150px; height:120px; padding:12px; border-radius:14px; background:rgba(255,255,255,0.015); transition:all 0.3s; position:absolute; left:220px; top:40px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:14px; font-weight:bold; color:#3b82f6; white-space:nowrap;">2. Web Server</span>
                                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); display:flex; align-items:center; justify-content:center;">
                                        <i data-lucide="server" style="width:20px; height:20px; color:#3b82f6;"></i>
                                    </div>
                                    <span style="font-size:13px; font-family:monospace; color:#94a3b8; text-align:center;">Decode Base62 ID</span>
                                </div>

                                <!-- Step 3: Redis Cache Lookup -->
                                <div class="flow-step step-cache" style="display:flex; flex-direction:column; align-items:center; gap:8px; width:160px; height:120px; padding:12px; border-radius:14px; background:rgba(255,255,255,0.015); transition:all 0.3s; position:absolute; left:420px; top:40px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:14px; font-weight:bold; color:#10b981; white-space:nowrap;">3. Redis Cache</span>
                                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); display:flex; align-items:center; justify-content:center;">
                                        <i data-lucide="database" style="width:20px; height:20px; color:#10b981;"></i>
                                    </div>
                                    <span style="font-size:13px; font-family:monospace; color:#94a3b8; text-align:center; white-space:nowrap;" class="cache-status-lbl">Truy vấn Cache</span>
                                </div>

                                <!-- Step 4: Redirection -->
                                <div class="flow-step step-redirect" style="display:flex; flex-direction:column; align-items:center; gap:8px; width:150px; height:120px; padding:12px; border-radius:14px; background:rgba(255,255,255,0.015); transition:all 0.3s; position:absolute; left:630px; top:40px; box-sizing:border-box; z-index:2;">
                                    <span style="font-size:14px; font-weight:bold; color:#f59e0b; white-space:nowrap;">4. HTTP 301</span>
                                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); display:flex; align-items:center; justify-content:center;">
                                        <i data-lucide="external-link" style="width:20px; height:20px; color:#f59e0b;"></i>
                                    </div>
                                    <span style="font-size:13px; font-family:monospace; color:#94a3b8; text-align:center; white-space:nowrap;">Redirect browser</span>
                                </div>

                                <!-- Row 2: Database fallback (placed directly below Cache node at center x=500) -->
                                <div class="flow-step step-db" style="display:flex; align-items:center; gap:12px; width:220px; height:75px; padding:10px 16px; border-radius:12px; background:rgba(239,68,68,0.015); border:1.5px solid rgba(239,68,68,0.15); transition:all 0.3s; position:absolute; left:390px; top:230px; box-sizing:border-box; z-index:2;">
                                    <div style="width:36px; height:36px; border-radius:8px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                        <i data-lucide="hard-drive" style="width:18px; height:18px; color:#ef4444;"></i>
                                    </div>
                                    <div style="text-align:left;">
                                        <div style="font-size:13px; font-weight:bold; color:#ef4444; white-space:nowrap;">Relational DB (Slow)</div>
                                        <span style="font-size:11px; font-family:monospace; color:#94a3b8;">Fallback if cache miss</span>
                                    </div>
                                </div>

                                <!-- SVG connections overlay representing routing paths -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="workflow-lines-svg">
                                    <!-- Client to server (170,100) -> (220,100) -->
                                    <path d="M 170 100 L 220 100" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none" id="flow-p1"></path>
                                    <!-- Server to Cache (370,100) -> (420,100) -->
                                    <path d="M 370 100 L 420 100" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none" id="flow-p2"></path>
                                    
                                    <!-- Cache hit path (to redirect) (580,100) -> (630,100) -->
                                    <path d="M 580 100 L 630 100" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none" id="flow-p-hit"></path>
                                    
                                    <!-- Cache miss path (to DB) (500,160) -> (500,230) -->
                                    <path d="M 500 160 L 500 230" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none" stroke-dasharray="4,4" id="flow-p-miss"></path>
                                    <!-- DB to Redirect link (610, 267.5) -> curve to (705, 160) -->
                                    <path d="M 610 267 Q 705 267 705 160" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none" id="flow-p-db-to-redir"></path>
                                    
                                    <!-- Packet flow animation dot -->
                                    <circle cx="95" cy="100" r="6" fill="#a78bfa" class="work-flow-dot" style="display:none; filter:drop-shadow(0 0 6px #a78bfa);"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_shortener_1a') {
            // CSS keyframes
        }
        else if (slideId === 'slide_shortener_1b') {
            const longCard = canvas.querySelector('.long-url-card');
            const shortCard = canvas.querySelector('.short-url-card');
            const stats = canvas.querySelector('.compression-stats');
            
            const dotInput = canvas.querySelector('.input-pulse-dot');
            const dotOutput = canvas.querySelector('.output-pulse-dot');
            const pathIn = canvas.querySelector('.input-glow-path');
            const pathOut = canvas.querySelector('.output-glow-path');

            // Reset
            if (dotInput) dotInput.style.display = 'none';
            if (dotOutput) dotOutput.style.display = 'none';
            if (pathIn) pathIn.setAttribute('stroke', 'rgba(59,130,246,0.2)');
            if (pathOut) pathOut.setAttribute('stroke', 'rgba(16,185,129,0.2)');

            // 0.0 -> 0.45: Input packet moving to core
            if (progress <= 0.45) {
                const subP = progress / 0.45;
                if (longCard) {
                    longCard.style.borderColor = '#3b82f6';
                    longCard.style.background = 'rgba(59,130,246,0.06)';
                    longCard.style.boxShadow = '0 0 15px rgba(59,130,246,0.2)';
                }
                if (dotInput) {
                    dotInput.style.display = 'block';
                    dotInput.setAttribute('cx', 260 + subP * 80);
                }
                if (pathIn) pathIn.setAttribute('stroke', '#3b82f6');
                if (stats) stats.textContent = 'Đang đọc URL nguồn...';
            } else {
                if (longCard) {
                    longCard.style.borderColor = 'rgba(59,130,246,0.2)';
                    longCard.style.background = 'rgba(59,130,246,0.02)';
                    longCard.style.boxShadow = 'none';
                }
            }

            // 0.45 -> 0.75: Core active compressing
            if (progress > 0.45 && progress <= 0.75) {
                if (stats) {
                    const compPercent = Math.floor(((progress - 0.45) / 0.3) * 93);
                    stats.textContent = `Đang nén Base62... ${compPercent}%`;
                    stats.style.color = 'var(--gold-primary)';
                }
            }

            // 0.75 -> 1.0: Output packet moving to short URL card
            if (progress > 0.75) {
                const subP = (progress - 0.75) / 0.25;
                if (shortCard) {
                    shortCard.style.borderColor = '#10b981';
                    shortCard.style.background = 'rgba(16,185,129,0.07)';
                    shortCard.style.boxShadow = '0 0 25px rgba(16,185,129,0.25)';
                    shortCard.style.transform = 'scale(1.03)';
                }
                if (dotOutput) {
                    dotOutput.style.display = 'block';
                    dotOutput.setAttribute('cx', 480 + subP * 80);
                }
                if (pathOut) pathOut.setAttribute('stroke', '#10b981');
                if (stats) {
                    stats.textContent = 'Hoàn tất! Tỷ lệ nén: 93%';
                    stats.style.color = '#10b981';
                }
            } else {
                if (shortCard) {
                    shortCard.style.borderColor = 'rgba(16,185,129,0.2)';
                    shortCard.style.background = 'rgba(16,185,129,0.02)';
                    shortCard.style.boxShadow = 'none';
                    shortCard.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_shortener_2') {
            const strips = canvas.querySelectorAll('.b62-column-strip');
            const sampleOut = canvas.querySelector('.sample-base62-out');
            const gauge7 = canvas.querySelector('.gauge-bar-7');
            
            strips.forEach((strip, idx) => {
                const delay = idx * 0.08;
                const columnProgress = Math.max(0, Math.min(1, (progress - delay) / 0.5));
                
                if (columnProgress > 0 && columnProgress < 1) {
                    strip.classList.add('spinning');
                } else {
                    strip.classList.remove('spinning');
                }

                // target center is index 8 (height 36px)
                const targetYOffset = -8 * 36;
                const startYOffset = -14 * 36; // Spins downwards
                const currentY = startYOffset + columnProgress * (targetYOffset - startYOffset);
                
                strip.style.transform = `translateY(${currentY}px)`;
            });

            // Expand gauge bar on progress
            if (gauge7) {
                gauge7.style.width = `${Math.min(100, progress * 100)}%`;
            }

            if (progress > 0.8) {
                if (sampleOut) {
                    sampleOut.style.color = '#10b981';
                    sampleOut.style.textShadow = '0 0 10px rgba(16,185,129,0.6)';
                }
            } else {
                if (sampleOut) {
                    sampleOut.style.color = '#fff';
                    sampleOut.style.textShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_shortener_3') {
            const moduloMathStack = canvas.querySelector('.modulo-math-stack');
            const keyVal = canvas.querySelector('.short-key-val');
            
            const baseValue = 56800230;
            const currentIncrement = Math.floor(progress * 10);
            const displayNum = baseValue + currentIncrement;
            const displayNumStr = displayNum.toString().padStart(8, '0');
            
            // Render individual odometer digit cards
            for (let i = 0; i < 8; i++) {
                const digitCard = canvas.querySelector(`#odo-digit-${i}`);
                if (digitCard) {
                    digitCard.textContent = displayNumStr[i];
                    // Add subtle active transform to the last changes
                    if (i >= 6 && progress > 0.1) {
                        digitCard.style.borderColor = '#3b82f6';
                        digitCard.style.boxShadow = '0 0 8px rgba(59,130,246,0.6)';
                    } else {
                        digitCard.style.borderColor = 'rgba(255,255,255,0.1)';
                        digitCard.style.boxShadow = 'none';
                    }
                }
            }

            // Keys matching increments:
            const shortKeys = ['a8G4zP', 'a8G4zQ', 'a8G4zR', 'a8G4zS', 'a8G4zT', 'a8G4zU', 'a8G4zV', 'a8G4zW', 'a8G4zX', 'a8G4zY', 'a8G4zZ'];
            const activeKey = shortKeys[Math.min(currentIncrement, shortKeys.length - 1)];
            if (keyVal) {
                keyVal.textContent = activeKey;
            }

            // Build dynamic divisions step list
            if (moduloMathStack) {
                let stepsHTML = '';
                const remainderChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                
                // Construct step 1:
                const rem1 = displayNum % 62;
                const quot1 = Math.floor(displayNum / 62);
                const char1 = remainderChars[rem1];
                
                // Construct step 2:
                const rem2 = quot1 % 62;
                const quot2 = Math.floor(quot1 / 62);
                const char2 = remainderChars[rem2];

                // Construct step 3:
                const rem3 = quot2 % 62;
                const quot3 = Math.floor(quot2 / 62);
                const char3 = remainderChars[rem3];

                if (progress >= 0.15) {
                    stepsHTML += `<div style="color:#ef4444; border-left: 2px solid #ef4444; padding-left: 8px;">Step 1: ${displayNum} % 62 = <strong style="color:#fff;">${rem1}</strong> (<strong style="color:#f59e0b;">${char1}</strong>)</div>`;
                }
                if (progress >= 0.45) {
                    stepsHTML += `<div style="color:#ef4444; border-left: 2px solid #ef4444; padding-left: 8px; margin-top: 4px;">Step 2: ${quot1} % 62 = <strong style="color:#fff;">${rem2}</strong> (<strong style="color:#f59e0b;">${char2}</strong>)</div>`;
                }
                if (progress >= 0.75) {
                    stepsHTML += `<div style="color:#ef4444; border-left: 2px solid #ef4444; padding-left: 8px; margin-top: 4px;">Step 3: ${quot2} % 62 = <strong style="color:#fff;">${rem3}</strong> (<strong style="color:#f59e0b;">${char3}</strong>)</div>`;
                    stepsHTML += `<div style="color:#10b981; font-weight:bold; margin-top:8px;">Base62 Output: ...${char3}${char2}${char1}</div>`;
                }
                
                if (stepsHTML === '') {
                    stepsHTML = `<div style="color:rgba(255,255,255,0.3); font-style:italic;">Nạp ID để thực hiện phép chia...</div>`;
                }
                moduloMathStack.innerHTML = stepsHTML;
            }
        }
        else if (slideId === 'slide_shortener_4') {
            const nodeA = canvas.querySelector('.node-a');
            const nodeB = canvas.querySelector('.node-b');
            const nodeC = canvas.querySelector('.node-c');
            const cntA = canvas.querySelector('.srv-counter-a');
            const cntB = canvas.querySelector('.srv-counter-b');
            const cntC = canvas.querySelector('.srv-counter-c');

            const pathA = canvas.querySelector('.coord-path-a');
            const pathB = canvas.querySelector('.coord-path-b');
            const pathC = canvas.querySelector('.coord-path-c');
            
            const pDotA = canvas.querySelector('.packet-dot-a');
            const pDotB = canvas.querySelector('.packet-dot-b');
            const pDotC = canvas.querySelector('.packet-dot-c');

            const valA = 1002517 + Math.floor(progress * 48);
            const valB = 2000104 + Math.floor(progress * 35);
            const valC = 3001489 + Math.floor(progress * 52);

            if (cntA) cntA.textContent = `ID: ${valA.toLocaleString('en-US')}`;
            if (cntB) cntB.textContent = `ID: ${valB.toLocaleString('en-US')}`;
            if (cntC) cntC.textContent = `ID: ${valC.toLocaleString('en-US')}`;

            // Reset dots
            if (pDotA) pDotA.style.display = 'none';
            if (pDotB) pDotB.style.display = 'none';
            if (pDotC) pDotC.style.display = 'none';

            // Server A path flow (0.05 -> 0.35)
            if (progress > 0.05 && progress <= 0.35) {
                const subP = (progress - 0.05) / 0.3;
                if (pDotA) {
                    pDotA.style.display = 'block';
                    // Quadratic Bezier interpolation: M 410 67 Q 275 105 140 160
                    const t = subP;
                    const cx = (1-t)*(1-t)*410 + 2*t*(1-t)*275 + t*t*140;
                    const cy = (1-t)*(1-t)*67 + 2*t*(1-t)*105 + t*t*160;
                    pDotA.setAttribute('cx', cx);
                    pDotA.setAttribute('cy', cy);
                }
                if (pathA) pathA.setAttribute('stroke', '#3b82f6');
                if (nodeA) {
                    nodeA.style.borderColor = '#3b82f6';
                    nodeA.style.background = 'rgba(59,130,246,0.08)';
                    nodeA.style.boxShadow = '0 0 15px rgba(59,130,246,0.2)';
                }
            } else {
                if (pathA) pathA.setAttribute('stroke', 'rgba(139,92,246,0.25)');
                if (nodeA) {
                    nodeA.style.borderColor = 'rgba(59,130,246,0.15)';
                    nodeA.style.background = 'rgba(59,130,246,0.02)';
                    nodeA.style.boxShadow = 'none';
                }
            }

            // Server B path flow (0.35 -> 0.65)
            if (progress > 0.35 && progress <= 0.65) {
                const subP = (progress - 0.35) / 0.3;
                if (pDotB) {
                    pDotB.style.display = 'block';
                    // Linear interpolation: M 410 67 L 410 160
                    pDotB.setAttribute('cx', 410);
                    pDotB.setAttribute('cy', 67 + subP * 93);
                }
                if (pathB) pathB.setAttribute('stroke', '#f97316');
                if (nodeB) {
                    nodeB.style.borderColor = '#f97316';
                    nodeB.style.background = 'rgba(249,115,22,0.08)';
                    nodeB.style.boxShadow = '0 0 15px rgba(249,115,22,0.2)';
                }
            } else {
                if (pathB) pathB.setAttribute('stroke', 'rgba(139,92,246,0.25)');
                if (nodeB) {
                    nodeB.style.borderColor = 'rgba(249,115,22,0.15)';
                    nodeB.style.background = 'rgba(249,115,22,0.02)';
                    nodeB.style.boxShadow = 'none';
                }
            }

            // Server C path flow (0.65 -> 0.95)
            if (progress > 0.65 && progress <= 0.95) {
                const subP = (progress - 0.65) / 0.3;
                if (pDotC) {
                    pDotC.style.display = 'block';
                    // Quadratic Bezier interpolation: M 410 67 Q 545 105 680 160
                    const t = subP;
                    const cx = (1-t)*(1-t)*410 + 2*t*(1-t)*545 + t*t*680;
                    const cy = (1-t)*(1-t)*67 + 2*t*(1-t)*105 + t*t*160;
                    pDotC.setAttribute('cx', cx);
                    pDotC.setAttribute('cy', cy);
                }
                if (pathC) pathC.setAttribute('stroke', '#ec4899');
                if (nodeC) {
                    nodeC.style.borderColor = '#ec4899';
                    nodeC.style.background = 'rgba(236,72,153,0.08)';
                    nodeC.style.boxShadow = '0 0 15px rgba(236,72,153,0.2)';
                }
            } else {
                if (pathC) pathC.setAttribute('stroke', 'rgba(139,92,246,0.25)');
                if (nodeC) {
                    nodeC.style.borderColor = 'rgba(236,72,153,0.15)';
                    nodeC.style.background = 'rgba(236,72,153,0.02)';
                    nodeC.style.boxShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_shortener_5') {
            const dot3 = canvas.querySelector('.glow-dot-3');
            const dot5 = canvas.querySelector('.glow-dot-5');
            const dot6 = canvas.querySelector('.glow-dot-6');
            const shuffledTitle = canvas.querySelector('.shuffled-title-lbl');
            const shuffledB62 = canvas.querySelector('.shuffled-b62-val');

            const bitR1 = canvas.querySelector('.bit-r-1');
            const bitR2 = canvas.querySelector('.bit-r-2');
            const bitR5 = canvas.querySelector('.bit-r-5');

            const wire3 = canvas.querySelector('#p-wire-3');
            const wire5 = canvas.querySelector('#p-wire-5');
            const wire6 = canvas.querySelector('#p-wire-6');

            // Reset right bits active styles
            const resetRBit = (node) => {
                if (node) {
                    node.classList.remove('active-1');
                    node.classList.remove('flipped');
                    node.classList.add('active-0');
                    node.textContent = '0';
                    node.style.borderColor = 'rgba(255,255,255,0.06)';
                }
            };
            
            // Loop through all right bits to reset
            for (let i = 0; i < 8; i++) {
                resetRBit(canvas.querySelector(`.bit-r-${i}`));
            }

            if (wire3) wire3.setAttribute('stroke', 'rgba(59,130,246,0.25)');
            if (wire5) wire5.setAttribute('stroke', 'rgba(59,130,246,0.25)');
            if (wire6) wire6.setAttribute('stroke', 'rgba(59,130,246,0.25)');

            if (shuffledTitle) {
                shuffledTitle.textContent = 'Xáo Trộn: 0';
                shuffledTitle.style.color = 'rgba(255,255,255,0.4)';
            }
            if (shuffledB62) {
                shuffledB62.textContent = 'tn.dev/000000';
                shuffledB62.style.color = '#fff';
            }

            // Animate dots along the wires (length=340px)
            if (progress > 0.05 && progress < 0.8) {
                const pathProgress = (progress - 0.05) / 0.75;
                const x = pathProgress * 340;
                
                if (dot3) {
                    dot3.style.display = 'block';
                    dot3.setAttribute('cx', x);
                    dot3.setAttribute('cy', 154 + pathProgress * 144); // wire 3: (0,154)->(340,298)
                }
                if (dot5) {
                    dot5.style.display = 'block';
                    dot5.setAttribute('cx', x);
                    dot5.setAttribute('cy', 226 - pathProgress * 144); // wire 5: (0,226)->(340,82)
                }
                if (dot6) {
                    dot6.style.display = 'block';
                    dot6.setAttribute('cx', x);
                    dot6.setAttribute('cy', 262 - pathProgress * 36);  // wire 6: (0,262)->(340,226)
                }

                if (wire3) wire3.setAttribute('stroke', '#f59e0b');
                if (wire5) wire5.setAttribute('stroke', '#f59e0b');
                if (wire6) wire6.setAttribute('stroke', '#f59e0b');
            } else {
                if (dot3) dot3.style.display = 'none';
                if (dot5) dot5.style.display = 'none';
                if (dot6) dot6.style.display = 'none';
            }

            // After crossing, original bits charge up the shuffled bits on the right side
            // Shuffled values: bit 3->7 (active), 5->1 (active), 6->5 (active)
            // So on the right, bits 1, 5, 7 will be active (1), others are 0.
            // Binary: 10100010 = 162
            if (progress >= 0.8) {
                const activeRightIndexes = [1, 5, 7];
                for (let i = 0; i < 8; i++) {
                    const rNode = canvas.querySelector(`.bit-r-${i}`);
                    if (rNode) {
                        if (activeRightIndexes.includes(i)) {
                            rNode.classList.remove('active-0');
                            rNode.classList.add('active-1');
                            rNode.classList.add('flipped');
                            rNode.textContent = '1';
                        }
                    }
                }
                if (shuffledTitle) {
                    shuffledTitle.textContent = 'Xáo Trộn: 162';
                    shuffledTitle.style.color = '#10b981';
                }
                if (shuffledB62) {
                    shuffledB62.textContent = 'tn.dev/2C';
                    shuffledB62.style.color = '#10b981';
                }
                if (wire3) wire3.setAttribute('stroke', '#10b981');
                if (wire5) wire5.setAttribute('stroke', '#10b981');
                if (wire6) wire6.setAttribute('stroke', '#10b981');
            }
        }
        else if (slideId === 'slide_shortener_6') {
            const sClient = canvas.querySelector('.step-client');
            const sServer = canvas.querySelector('.step-server');
            const sCache = canvas.querySelector('.step-cache');
            const sRedir = canvas.querySelector('.step-redirect');
            const sDb = canvas.querySelector('.step-db');
            const cacheStatus = canvas.querySelector('.cache-status-lbl');

            const p1 = canvas.querySelector('#flow-p1');
            const p2 = canvas.querySelector('#flow-p2');
            const pHit = canvas.querySelector('#flow-p-hit');
            const pMiss = canvas.querySelector('#flow-p-miss');
            const pDbToRedir = canvas.querySelector('#flow-p-db-to-redir');
            
            const wDot = canvas.querySelector('.work-flow-dot');

            const resetNode = (node) => {
                if (node) {
                    node.style.borderColor = 'rgba(255,255,255,0.06)';
                    node.style.background = 'rgba(255,255,255,0.015)';
                    node.style.transform = 'scale(1)';
                    node.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
                }
            };
            
            resetNode(sClient);
            resetNode(sServer);
            resetNode(sCache);
            resetNode(sRedir);
            if (sDb) {
                sDb.style.borderColor = 'rgba(239,68,68,0.15)';
                sDb.style.background = 'rgba(239,68,68,0.015)';
                sDb.style.transform = 'scale(1)';
            }

            if (p1) p1.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            if (p2) p2.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            if (pHit) pHit.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            if (pMiss) pMiss.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            if (pDbToRedir) pDbToRedir.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            
            if (wDot) wDot.style.display = 'none';

            // Sequential Flow Breakdown (Request, Lookup, Cache Miss fallback to DB, Writeback, Redirect)
            // Phase 1 (0.0 -> 0.20): User click to Web Server
            if (progress <= 0.20) {
                const subP = progress / 0.20;
                if (sClient) {
                    sClient.style.borderColor = '#a78bfa';
                    sClient.style.background = 'rgba(139,92,246,0.08)';
                    sClient.style.transform = 'scale(1.04)';
                    sClient.style.boxShadow = '0 0 20px rgba(139,92,246,0.2)';
                }
                if (p1) p1.setAttribute('stroke', '#a78bfa');
                if (wDot && progress > 0.02) {
                    wDot.style.display = 'block';
                    wDot.setAttribute('fill', '#a78bfa');
                    // path 1: (95,100) -> (295,100)
                    wDot.setAttribute('cx', 95 + subP * 200);
                    wDot.setAttribute('cy', 100);
                }
                if (cacheStatus) cacheStatus.textContent = 'Đang tiếp nhận...';
            }
            // Phase 2 (0.20 -> 0.40): Web Server to Redis Cache
            else if (progress > 0.20 && progress <= 0.40) {
                const subP = (progress - 0.20) / 0.20;
                if (sServer) {
                    sServer.style.borderColor = '#3b82f6';
                    sServer.style.background = 'rgba(59,130,246,0.08)';
                    sServer.style.transform = 'scale(1.04)';
                    sServer.style.boxShadow = '0 0 20px rgba(59,130,246,0.2)';
                }
                if (p1) p1.setAttribute('stroke', '#3b82f6');
                if (p2) p2.setAttribute('stroke', '#3b82f6');
                if (wDot) {
                    wDot.style.display = 'block';
                    wDot.setAttribute('fill', '#3b82f6');
                    // path 2: (295,100) -> (500,100)
                    wDot.setAttribute('cx', 295 + subP * 205);
                    wDot.setAttribute('cy', 100);
                }
                if (cacheStatus) cacheStatus.textContent = 'Giải mã ID...';
            }
            // Phase 3 (0.40 -> 0.60): Cache Miss! Check DB
            else if (progress > 0.40 && progress <= 0.60) {
                const subP = (progress - 0.40) / 0.20;
                if (sCache) {
                    sCache.style.borderColor = '#ef4444';
                    sCache.style.background = 'rgba(239,68,68,0.08)';
                    sCache.style.transform = 'scale(1.04)';
                    sCache.style.boxShadow = '0 0 20px rgba(239,68,68,0.2)';
                }
                if (sDb) {
                    sDb.style.borderColor = '#ef4444';
                    sDb.style.background = 'rgba(239,68,68,0.08)';
                }
                if (p2) p2.setAttribute('stroke', '#ef4444');
                if (pMiss) pMiss.setAttribute('stroke', '#ef4444');
                
                if (wDot) {
                    wDot.style.display = 'block';
                    wDot.setAttribute('fill', '#ef4444');
                    // path 3 (Cache bottom (500,160) -> DB top (500,230))
                    wDot.setAttribute('cx', 500);
                    wDot.setAttribute('cy', 160 + subP * 70);
                }
                if (cacheStatus) cacheStatus.innerHTML = '🔴 Cache Miss! Truy vấn DB...';
            }
            // Phase 4 (0.60 -> 0.80): DB read success -> Writeback to cache
            else if (progress > 0.60 && progress <= 0.80) {
                const subP = (progress - 0.60) / 0.20;
                if (sDb) {
                    sDb.style.borderColor = '#10b981';
                    sDb.style.background = 'rgba(16,185,129,0.08)';
                    sDb.style.transform = 'scale(1.04)';
                }
                if (sCache) {
                    sCache.style.borderColor = '#10b981';
                    sCache.style.background = 'rgba(16,185,129,0.08)';
                }
                if (pMiss) pMiss.setAttribute('stroke', '#10b981');
                if (wDot) {
                    wDot.style.display = 'block';
                    wDot.setAttribute('fill', '#10b981');
                    // path 4 (DB top (500,230) -> Cache bottom (500,160))
                    wDot.setAttribute('cx', 500);
                    wDot.setAttribute('cy', 230 - subP * 70);
                }
                if (cacheStatus) cacheStatus.innerHTML = '🟢 Đã nạp Cache!';
            }
            // Phase 5 (0.80 -> 1.00): Cache hit redirect
            else if (progress > 0.80) {
                const subP = (progress - 0.80) / 0.20;
                if (sCache) {
                    sCache.style.borderColor = '#10b981';
                    sCache.style.background = 'rgba(16,185,129,0.08)';
                }
                if (sRedir) {
                    sRedir.style.borderColor = '#f59e0b';
                    sRedir.style.background = 'rgba(245,158,11,0.08)';
                    sRedir.style.transform = 'scale(1.04)';
                    sRedir.style.boxShadow = '0 0 20px rgba(245,158,11,0.25)';
                }
                if (pHit) pHit.setAttribute('stroke', '#10b981');
                if (wDot) {
                    wDot.style.display = 'block';
                    wDot.setAttribute('fill', '#10b981');
                    // path 5: Cache right (580,100) -> Redirect center (705,100)
                    wDot.setAttribute('cx', 580 + subP * 125);
                    wDot.setAttribute('cy', 100);
                }
                if (cacheStatus) cacheStatus.innerHTML = '🟢 Redirect 301 Success!';
            }
        }
    }

    // ── PUBLIC PLUGIN REGISTRATION ─────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video21',
        topic: 'URL Shortener Mechanics',
        episodeNum: 21,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video21 Plugin] Loaded: URL Shortener Mechanics slides coordinates fixed.');
})();
