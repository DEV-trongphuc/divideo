/**
 * Video 26: ZIP Compression & Lossless LZW Mechanics
 * Plugin file - chứa toàn bộ slide animation/HTML cho video26
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Slide 1 (first slide) has no keywords as per rule.
    const keywordsData = {
        slide_zip_1a: [],
        slide_zip_1b: [],
        slide_zip_2: [
            { text: 'dư thừa dữ liệu', start: 8.0, end: 15.0, class: 'active-good' },
            { text: 'tính lặp lại', start: 1.0, end: 8.0, class: 'active-gold' }
        ],
        slide_zip_3: [
            { text: 'Lossy', start: 3.5, end: 12.0, class: 'active-bad' },
            { text: 'Lossless', start: 12.0, end: 20.0, class: 'active-good' }
        ],
        slide_zip_4: [
            { text: 'từ điển động', start: 6.0, end: 14.0, class: 'active-gold' },
            { text: 'ghép các ký tự', start: 14.0, end: 21.0, class: 'active-good' }
        ],
        slide_zip_5: [
            { text: 'mã số định danh', start: 6.0, end: 14.0, class: 'active-gold' },
            { text: 'thu nhỏ', start: 14.0, end: 20.0, class: 'active-good' }
        ],
        slide_zip_6: [
            { text: 'khôi phục', start: 8.0, end: 16.0, class: 'active-good' },
            { text: 'không cần đính kèm', start: 1.0, end: 8.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_zip_1a', 'slide_zip_1b', 'slide_zip_2', 'slide_zip_3', 'slide_zip_4', 'slide_zip_5', 'slide_zip_6'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_zip_1a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-scene-wrapper">
                        <div class="v37-grid-bg" style="position:absolute; inset:0; background-image:radial-gradient(rgba(245,158,11,0.05) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                        <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                            <div class="v26-zip-intro-container">
                                <div class="v26-zip-glow-ring"></div>
                                <div class="v26-zip-glow-ring inner"></div>
                                <div class="v26-giant-zip-logo">
                                    <img src="/static/zip_icon.png" alt="ZIP Logo">
                                </div>
                            </div>
                            
                            <!-- Premium Badge and Label in Glass Card -->
                            <div class="glass-card" style="text-align: center; width: 440px; padding: 18px 24px; border-radius: 20px; border: 1.5px solid rgba(245, 158, 11, 0.45); background: rgba(12, 16, 24, 0.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 15px;">
                                <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); color: #fbbf24; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                    <i data-lucide="folder-archive" style="width:14px;height:14px;"></i> Lossless Compression
                                </div>
                                <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: #fbbf24; line-height: 1.45;">
                                    Bí ẩn tệp .ZIP: Làm sao nén file không mất một chữ?
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_1b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container">
                        <!-- ZIP Logo visual representation -->
                        <div class="zip-icon-anim" style="position:relative; width:280px; height:280px; display:flex; align-items:center; justify-content:center;">
                            <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%); filter:blur(25px);"></div>
                            <img src="/static/zip_icon.png" style="width:220px; height:220px; z-index:5; filter:drop-shadow(0 15px 30px rgba(245, 158, 11, 0.45));" alt="ZIP File Icon">
                            
                            <!-- Floating Binary Particles (Wow aesthetics) -->
                            <div class="v26-binary-particle" style="position:absolute; left:-45px; top:30px; color:#fbbf24; font-size:24px; animation:v26-float-particle-1 4s infinite ease-in-out;">1</div>
                            <div class="v26-binary-particle" style="position:absolute; right:-35px; top:60px; color:#10b981; font-size:20px; animation:v26-float-particle-2 5s infinite ease-in-out; animation-delay:1s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:-25px; bottom:40px; color:#f59e0b; font-size:22px; animation:v26-float-particle-3 6s infinite ease-in-out; animation-delay:2s;">1</div>
                            <div class="v26-binary-particle" style="position:absolute; right:-55px; bottom:30px; color:#fbbf24; font-size:26px; animation:v26-float-particle-1 5s infinite ease-in-out; animation-delay:0.5s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:50%; top:-45px; transform:translateX(-50%); color:#10b981; font-size:18px; animation:v26-float-particle-2 4s infinite ease-in-out; animation-delay:1.5s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:40%; bottom:-45px; transform:translateX(-50%); color:#f59e0b; font-size:24px; animation:v26-float-particle-3 5s infinite ease-in-out; animation-delay:0.8s;">1</div>
                        </div>
                        <div style="font-size:28px; font-weight:bold; color:#fbbf24; text-shadow:0 0 20px rgba(245,158,11,0.45); text-align:center; letter-spacing:1px; margin-top:15px;">
                            Lossless Compression
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container" style="zoom: 1.3;">
                        <div class="glass-card" style="max-width:820px; width:100%; padding:30px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0c0f17; position:relative; overflow:hidden;">
                            <div style="font-size:18px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                Phát hiện tính lặp lại (Data Redundancy)
                            </div>
                            <!-- Redundancy Scanner beam -->
                            <div class="redundancy-scanner"></div>
                            
                            <div style="font-family:'Fira Code', monospace; font-size:32px; line-height:2.2; color:#94a3b8; text-align:center; padding:20px 0; word-spacing:10px;" class="redundancy-text-block">
                                <span class="repeat-word tobe" id="w1">TO BE</span> OR <span class="repeat-word not" id="w2">NOT</span> <span class="repeat-word tobe" id="w3">TO BE</span>, OR <span class="repeat-word tobe" id="w4">TO BE</span> OR <span class="repeat-word not" id="w5">NOT</span> <span class="repeat-word tobe" id="w6">TO BE</span>
                            </div>
                        </div>

                        <!-- Statistics box -->
                        <div style="display:flex; gap:20px; max-width:820px; width:100%;">
                            <div class="glass-card" style="flex:1; padding:20px; border:1.5px solid rgba(59,130,246,0.25); border-radius:18px; background:rgba(59,130,246,0.02); text-align:center;">
                                <div style="font-size:24px; font-weight:bold; color:#3b82f6;">Lặp 'TO BE': 4 lần</div>
                            </div>
                            <div class="glass-card" style="flex:1; padding:20px; border:1.5px solid rgba(16,185,129,0.25); border-radius:18px; background:rgba(16,185,129,0.02); text-align:center;">
                                <div style="font-size:24px; font-weight:bold; color:#10b981;">Lặp 'NOT': 2 lần</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container" style="zoom: 1.45;">
                        <div class="comparison-grid" style="max-width:820px; width:100%; gap:20px;">
                            <!-- Left: Lossy Compression -->
                            <div class="comparison-col lossy" style="padding:24px;">
                                <div style="font-size:18px; font-weight:bold; color:#ef4444; border-bottom:1.5px solid rgba(239,68,68,0.15); padding-bottom:10px; margin-bottom:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Lossy (JPEG, MP3)
                                </div>
                                
                                <!-- Pixel Grid Simulator -->
                                <div class="lossy-pixel-grid" style="width:160px; height:160px; margin:20px auto;">
                                    ${Array.from({length: 64}).map((_, i) => `<div class="lossy-pixel" id="px-${i}"></div>`).join('')}
                                </div>
                                
                                <div style="margin-top:20px;" class="lossy-status-text">
                                    <div style="font-size:24px; font-weight:bold; color:#fff;" class="lossy-percent">Dung lượng: 100%</div>
                                </div>
                            </div>

                            <!-- Right: Lossless Compression -->
                            <div class="comparison-col lossless" style="padding:24px;">
                                <div style="font-size:18px; font-weight:bold; color:#10b981; border-bottom:1.5px solid rgba(16,185,129,0.15); padding-bottom:10px; margin-bottom:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Lossless (ZIP, PNG)
                                </div>

                                <!-- File compression representation -->
                                <div style="height:160px; margin:20px 0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:16px;">
                                    <div class="glass-card file-box" style="width:200px; padding:15px; border:2px solid rgba(255,255,255,0.08); border-radius:16px; background:rgba(0,0,0,0.3); transition:all 0.3s; text-align:center;">
                                        <i data-lucide="file-code" style="width:40px; height:40px; color:#10b981; margin-bottom:8px;"></i>
                                        <div style="font-size:16px; font-weight:bold; color:#fff; font-family:monospace;" class="lossless-filename">source_code.py</div>
                                        <div style="font-size:16px; color:#fff; font-family:monospace; margin-top:4px;" class="lossless-filesize">12 KB</div>
                                    </div>
                                </div>

                                <div style="margin-top:20px;">
                                    <div style="font-size:24px; font-weight:bold; color:#fff;" class="lossless-percent">Dung lượng: 100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container" style="zoom: 1.3;">
                        <div style="display:flex; width:100%; max-width:820px; gap:20px; align-items:stretch;">
                            <!-- Left: Character Stream Scanner -->
                            <div class="glass-card" style="flex:1.3; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0c0f17; display:flex; flex-direction:column; justify-content:space-between; gap:16px;">
                                <div style="font-size:18px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Luồng ký tự đầu vào
                                </div>
                                
                                <div style="display:flex; justify-content:center; align-items:center; flex-wrap:wrap; padding:20px; background:rgba(0,0,0,0.3); border-radius:16px; margin:5px 0; gap:2px;" class="char-stream-box">
                                    <span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">N</span><span class="char-unit">O</span><span class="char-unit">T</span><span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">N</span><span class="char-unit">O</span><span class="char-unit">T</span>
                                </div>

                                <!-- Dynamic Status Display -->
                                <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:15px; text-align:left; font-size:14px; display:flex; flex-direction:column; gap:8px;" class="v26-status-panel">
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-weight:bold;">Chuỗi hiện tại (W):</span>
                                        <strong style="color:#60a5fa; font-family:monospace; font-size:16px;" class="v26-w-str">-</strong>
                                    </div>
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-weight:bold;">Ký tự tiếp theo (K):</span>
                                        <strong style="color:#f59e0b; font-family:monospace; font-size:16px;" class="v26-k-char">-</strong>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
                                        <span style="color:rgba(255,255,255,0.4); font-weight:bold;">Kết quả xem xét (W+K):</span>
                                        <strong style="color:#10b981; font-family:monospace; font-size:16px;" class="v26-wk-str">-</strong>
                                    </div>
                                </div>

                                <div class="glass-card" style="padding:15px; border:1.5px solid rgba(245,158,11,0.25); background:rgba(245,158,11,0.02); border-radius:12px; text-align:center;">
                                    <div style="font-size:18px; color:var(--gold-primary); font-weight:bold;" class="dict-status-msg">Khởi tạo từ điển (1 - 255)</div>
                                </div>
                            </div>

                            <!-- Right: Dynamic LZW Dictionary -->
                            <div class="glass-card" style="flex:1; padding:24px; border:2.5px solid rgba(255,255,255,0.06); border-radius:24px; background:#0b0e14; max-height:400px; overflow-y:auto;">
                                <div style="font-size:18px; font-weight:bold; color:var(--gold-primary); border-bottom:1px solid rgba(245,158,11,0.15); padding-bottom:10px; margin-bottom:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Từ điển LZW
                                </div>
                                <table class="dict-table" style="font-size:16px;">
                                    <thead>
                                        <tr>
                                            <th>Mã</th>
                                            <th>Chuỗi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="dict-table-body">
                                        <!-- Built dynamically -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container" style="zoom: 1.25;">
                        <div class="glass-card" style="max-width:820px; width:100%; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0c0f17; text-align:left;">
                            <div style="font-size:18px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
                                Dòng dữ liệu sau khi mã hóa LZW
                            </div>

                            <!-- Conversion representation -->
                            <div style="display:flex; align-items:center; justify-content:space-between; margin:20px 0; gap:20px;">
                                <!-- Text input -->
                                <div style="flex:1; background:rgba(255,255,255,0.02); border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; padding:16px; text-align:center;">
                                    <div style="font-family:'Fira Code', monospace; font-size:18px; color:#fff;" class="s5-orig-text">TOBEORNOTTOBEORTOBEORNOT</div>
                                </div>

                                <!-- Arrow icon -->
                                <div style="width:40px; text-align:center;">
                                    <i data-lucide="arrow-right" style="width:32px; height:32px; color:var(--gold-primary);"></i>
                                </div>

                                <!-- Code output -->
                                <div style="flex:1.4; background:rgba(16,185,129,0.03); border:1.5px solid rgba(16,185,129,0.25); border-radius:16px; padding:16px; text-align:center; position:relative; overflow:hidden;">
                                    <div style="font-family:'Fira Code', monospace; font-size:18px; color:#10b981; font-weight:bold; letter-spacing:2px;" class="s5-compressed-numbers">[84, 79, 66, 69, 256, ...]</div>
                                </div>
                            </div>
                        </div>

                        <!-- Compression Ratio Status Card -->
                        <div class="glass-card" style="max-width:820px; width:100%; padding:24px; border:2px solid rgba(16,185,129,0.2); border-radius:24px; background:rgba(16,185,129,0.02); display:flex; justify-content:space-between; align-items:center; gap:30px;">
                            <div style="flex:1.2; text-align:left;">
                                <div style="font-size:24px; font-weight:bold; color:#fff;">Tỷ lệ nén: <span style="color:#10b981;" class="ratio-percentage">100%</span></div>
                                <div style="font-size:16px; color:rgba(255,255,255,0.5); margin-top:6px;" class="ratio-desc">Đang xử lý dữ liệu...</div>
                                
                                <div class="compression-bar-outer" style="height:18px; border-radius:10px; margin-top:15px;">
                                    <div class="compression-bar-inner" style="width:100%; border-radius:10px;"></div>
                                </div>
                            </div>
                            
                            <div class="glass-card" style="flex:0.8; padding:20px; border:1px dashed rgba(16,185,129,0.3); border-radius:18px; background:rgba(16,185,129,0.03); text-align:center;">
                                <div style="font-size:28px; font-weight:900; color:#10b981; font-family:monospace;" class="storage-saving-text">48 Bytes</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_zip_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container" style="zoom: 1.3;">
                        <div style="display:flex; width:100%; max-width:820px; gap:20px; align-items:stretch;">
                            <!-- Left: Output String reconstruction -->
                            <div class="glass-card" style="flex:1.2; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0c0f17; display:flex; flex-direction:column; justify-content:space-between;">
                                <div>
                                    <div style="font-size:18px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
                                        Giải nén dòng mã số
                                    </div>
                                    <div style="font-family:'Fira Code', monospace; font-size:18px; color:#10b981; background:rgba(0,0,0,0.3); border-radius:12px; padding:12px; margin-top:15px; word-break:break-all; text-align:left; letter-spacing:1px;" class="decoder-input-nums">
                                        [84, 79, 66, 69, 256, 79, 82, 258]
                                    </div>
                                </div>

                                <!-- Dynamic Decoding Status Panel -->
                                <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:12px 15px; text-align:left; font-size:14px; display:flex; flex-direction:column; gap:8px; margin-top:12px;" class="v26-dec-status-panel">
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-weight:bold;">Mã số đang giải:</span>
                                        <strong style="color:#10b981; font-family:monospace; font-size:16px;" class="v26-dec-code">-</strong>
                                    </div>
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-weight:bold;">Giải nghĩa mẫu:</span>
                                        <strong style="color:var(--gold-primary); font-family:monospace; font-size:16px;" class="v26-dec-pattern">-</strong>
                                    </div>
                                </div>

                                <div style="margin:20px 0; text-align:left;">
                                    <div style="font-family:'Fira Code', monospace; font-size:32px; color:#fff; font-weight:bold; border-bottom:2px dashed rgba(255,255,255,0.15); padding-bottom:5px; min-height:45px; letter-spacing:4px;" class="decoded-text-output"></div>
                                </div>

                                <div class="glass-card success-match-badge" style="padding:14px; border:1.5px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.02); border-radius:12px; display:flex; align-items:center; gap:8px; opacity:0; transition:all 0.3s;">
                                    <i data-lucide="check-circle" style="width:22px; height:22px; color:#10b981;"></i>
                                    <span style="font-size:16px; color:#10b981; font-weight:bold; letter-spacing:0.5px;">CRC OK - NGUYÊN VẸN 100%</span>
                                </div>
                            </div>

                            <!-- Right: Reconstructed Dictionary -->
                            <div class="glass-card" style="flex:1; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0b0e14; max-height:400px; overflow-y:auto;">
                                <div style="font-size:18px; font-weight:bold; color:#10b981; border-bottom:1px solid rgba(16,185,129,0.15); padding-bottom:10px; margin-bottom:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Từ điển tái cấu trúc
                                </div>
                                <table class="dict-table" style="font-size:16px;">
                                    <thead>
                                        <tr>
                                            <th>Mã</th>
                                            <th>Chuỗi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="dict-table-body-decode">
                                        <!-- Rebuilt dynamically -->
                                    </tbody>
                                </table>
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
        if (slideId === 'slide_zip_1b') {
            const img = canvas.querySelector('img');
            if (img) {
                // Gentle floating rotation
                const angle = 3 * Math.sin(progress * 2 * Math.PI);
                img.style.transform = `rotate(${angle}deg)`;
            }
        }
        else if (slideId === 'slide_zip_2') {
            const scanner = canvas.querySelector('.redundancy-scanner');
            if (scanner) {
                scanner.style.left = `${progress * 100}%`;
            }
            
            // Highlight elements sequentially
            const words = [
                { el: canvas.querySelector('#w1'), trigger: 0.1 },
                { el: canvas.querySelector('#w3'), trigger: 0.35 },
                { el: canvas.querySelector('#w4'), trigger: 0.55 },
                { el: canvas.querySelector('#w6'), trigger: 0.8 },
                { el: canvas.querySelector('#w2'), trigger: 0.25 },
                { el: canvas.querySelector('#w5'), trigger: 0.7 }
            ];
            
            words.forEach(w => {
                if (w.el) {
                    if (progress >= w.trigger) {
                        w.el.style.transform = 'scale(1.08)';
                        w.el.style.textShadow = '0 0 10px currentColor';
                    } else {
                        w.el.style.transform = 'scale(1)';
                        w.el.style.textShadow = 'none';
                    }
                }
            });
        }
        else if (slideId === 'slide_zip_3') {
            const lossyPercent = canvas.querySelector('.lossy-percent');
            const lossyDesc = canvas.querySelector('.lossy-desc');
            const losslessPercent = canvas.querySelector('.lossless-percent');
            const losslessDesc = canvas.querySelector('.lossless-desc');
            const fileBox = canvas.querySelector('.file-box');
            const losslessFilesize = canvas.querySelector('.lossless-filesize');
            
            // Animate pixels inside Lossy column
            const pixels = canvas.querySelectorAll('.lossy-pixel');
            
            if (progress < 0.4) {
                // Lossy initial
                if (lossyPercent) lossyPercent.textContent = 'Dung lượng: 100%';
                if (lossyDesc) { lossyDesc.textContent = 'Chất lượng gốc'; lossyDesc.style.color = '#fff'; }
                pixels.forEach((p, idx) => {
                    p.style.filter = 'none';
                    // custom gradient look
                    const r = Math.floor(100 + 100 * Math.sin(idx * 0.15));
                    const g = Math.floor(80 + 90 * Math.cos(idx * 0.2));
                    const b = 255;
                    p.style.background = `rgb(${r}, ${g}, ${b})`;
                });
                
                // Lossless initial
                if (losslessPercent) losslessPercent.textContent = 'Dung lượng: 100%';
                if (losslessDesc) { losslessDesc.textContent = 'Giải nén khớp 100% byte'; losslessDesc.style.color = '#10b981'; }
                if (fileBox) {
                    fileBox.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    fileBox.style.background = 'rgba(0, 0, 0, 0.3)';
                    fileBox.style.transform = 'scale(1)';
                }
                if (losslessFilesize) losslessFilesize.textContent = '12 KB';
            } else {
                // Lossy compression triggered (pixelated, lower size)
                const lossyRatio = 100 - Math.round((progress - 0.4) / 0.6 * 90);
                if (lossyPercent) lossyPercent.textContent = `Dung lượng: ${lossyRatio}%`;
                if (lossyDesc) { lossyDesc.textContent = 'JPEG: Lượng tử hóa làm mất chi tiết (Artifacted)'; lossyDesc.style.color = '#ef4444'; }
                
                pixels.forEach((p, idx) => {
                    // simulate blocking color quantization
                    const blockIndex = Math.floor(idx / 8);
                    const groupColorR = Math.floor(100 + 100 * Math.sin(blockIndex * 0.8));
                    const groupColorG = Math.floor(80 + 90 * Math.cos(blockIndex * 0.9));
                    p.style.background = `rgb(${groupColorR}, ${groupColorG}, 200)`;
                    p.style.filter = 'blur(1.5px)';
                });
                
                // Lossless compression triggered (zipped, smaller size but perfect)
                const losslessRatio = 100 - Math.round((progress - 0.4) / 0.6 * 75);
                const kbSize = (12 - (progress - 0.4) / 0.6 * 9).toFixed(1);
                if (losslessPercent) losslessPercent.textContent = `Dung lượng: ${losslessRatio}%`;
                if (losslessFilesize) losslessFilesize.textContent = `${kbSize} KB`;
                if (losslessDesc) { losslessDesc.textContent = 'ZIP: Mã hóa LZW hoàn toàn bảo toàn'; }
                if (fileBox) {
                    fileBox.style.borderColor = '#10b981';
                    fileBox.style.background = 'rgba(16, 185, 129, 0.03)';
                    fileBox.style.transform = 'scale(1.05)';
                }
            }
        }
        else if (slideId === 'slide_zip_4') {
            const pointer = canvas.querySelector('.stream-char-pointer');
            const tbody = canvas.querySelector('.dict-table-body');
            const msg = canvas.querySelector('.dict-status-msg');
            const charUnits = canvas.querySelectorAll('.char-unit');
            const wStrEl = canvas.querySelector('.v26-w-str');
            const kCharEl = canvas.querySelector('.v26-k-char');
            const wkStrEl = canvas.querySelector('.v26-wk-str');
            
            const totalChars = 24;
            const pointerIndex = Math.min(totalChars - 1, Math.floor(progress * totalChars * 1.15));
            
            // Highlight current character
            if (charUnits.length > 0) {
                charUnits.forEach((cu, idx) => {
                    if (idx === pointerIndex) {
                        cu.classList.add('active');
                    } else {
                        cu.classList.remove('active');
                    }
                });
            }

            // Move pointer across text
            if (pointer) {
                pointer.style.left = `${20 + pointerIndex * 26.2}px`;
            }

            const lzwTrace = [
                { w: "-", k: "T", wk: "T", inDict: true, addedCode: null, msg: "Ký tự đầu tiên: 'T' có trong từ điển ASCII" },
                { w: "T", k: "O", wk: "TO", inDict: false, addedCode: { index: 256, pattern: "TO" }, msg: "Thêm mẫu mới: 'TO' được gán mã #256" },
                { w: "O", k: "B", wk: "OB", inDict: false, addedCode: { index: 257, pattern: "OB" }, msg: "Thêm mẫu mới: 'OB' được gán mã #257" },
                { w: "B", k: "E", wk: "BE", inDict: false, addedCode: { index: 258, pattern: "BE" }, msg: "Thêm mẫu mới: 'BE' được gán mã #258" },
                { w: "E", k: "O", wk: "EO", inDict: false, addedCode: { index: 259, pattern: "EO" }, msg: "Thêm mẫu mới: 'EO' được gán mã #259" },
                { w: "O", k: "R", wk: "OR", inDict: false, addedCode: { index: 260, pattern: "OR" }, msg: "Thêm mẫu mới: 'OR' được gán mã #260" },
                { w: "R", k: "N", wk: "RN", inDict: false, addedCode: { index: 261, pattern: "RN" }, msg: "Thêm mẫu mới: 'RN' được gán mã #261" },
                { w: "N", k: "O", wk: "NO", inDict: false, addedCode: { index: 262, pattern: "NO" }, msg: "Thêm mẫu mới: 'NO' được gán mã #262" },
                { w: "O", k: "T", wk: "OT", inDict: false, addedCode: { index: 263, pattern: "OT" }, msg: "Thêm mẫu mới: 'OT' được gán mã #263" },
                { w: "T", k: "T", wk: "TT", inDict: false, addedCode: { index: 264, pattern: "TT" }, msg: "Thêm mẫu mới: 'TT' được gán mã #264" },
                { w: "T", k: "O", wk: "TO", inDict: true, addedCode: null, msg: "Mẫu 'TO' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "TO", k: "B", wk: "TOB", inDict: false, addedCode: { index: 265, pattern: "TOB" }, msg: "Thêm mẫu mới: 'TOB' được gán mã #265" },
                { w: "B", k: "E", wk: "BE", inDict: true, addedCode: null, msg: "Mẫu 'BE' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "BE", k: "O", wk: "BEO", inDict: false, addedCode: { index: 266, pattern: "BEO" }, msg: "Thêm mẫu mới: 'BEO' được gán mã #266" },
                { w: "O", k: "R", wk: "OR", inDict: true, addedCode: null, msg: "Mẫu 'OR' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "OR", k: "T", wk: "ORT", inDict: false, addedCode: { index: 267, pattern: "ORT" }, msg: "Thêm mẫu mới: 'ORT' được gán mã #267" },
                { w: "T", k: "O", wk: "TO", inDict: true, addedCode: null, msg: "Mẫu 'TO' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "TO", k: "B", wk: "TOB", inDict: true, addedCode: null, msg: "Mẫu 'TOB' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "TOB", k: "E", wk: "TOBE", inDict: false, addedCode: { index: 268, pattern: "TOBE" }, msg: "Thêm mẫu mới: 'TOBE' được gán mã #268" },
                { w: "E", k: "O", wk: "EO", inDict: true, addedCode: null, msg: "Mẫu 'EO' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "EO", k: "R", wk: "EOR", inDict: false, addedCode: { index: 269, pattern: "EOR" }, msg: "Thêm mẫu mới: 'EOR' được gán mã #269" },
                { w: "R", k: "N", wk: "RN", inDict: true, addedCode: null, msg: "Mẫu 'RN' đã có trong từ điển -> Tiếp tục ghép" },
                { w: "RN", k: "O", wk: "RNO", inDict: false, addedCode: { index: 270, pattern: "RNO" }, msg: "Thêm mẫu mới: 'RNO' được gán mã #270" },
                { w: "O", k: "T", wk: "OT", inDict: true, addedCode: null, msg: "Mẫu 'OT' đã có trong từ điển -> Tiếp tục ghép" }
            ];

            const step = lzwTrace[pointerIndex] || { w: "-", k: "-", wk: "-", inDict: true, addedCode: null, msg: "Khởi tạo từ điển (1 - 255)" };

            if (wStrEl) wStrEl.textContent = step.w;
            if (kCharEl) kCharEl.textContent = step.k;
            if (wkStrEl) {
                wkStrEl.textContent = step.wk;
                wkStrEl.style.color = step.inDict ? "#10b981" : "var(--gold-primary)";
            }

            if (tbody) {
                let html = `
                    <tr>
                        <td style="color:rgba(255,255,255,0.3);">1 ... 255</td>
                        <td style="color:rgba(255,255,255,0.3);">Bộ mã ASCII (A, B, C...)</td>
                    </tr>
                `;
                
                for (let idx = 0; idx <= pointerIndex; idx++) {
                    const s = lzwTrace[idx];
                    if (s && s.addedCode) {
                        html += `
                            <tr class="new-entry">
                                <td style="color:var(--gold-primary); font-weight:bold;">${s.addedCode.index}</td>
                                <td style="color:#fff; font-weight:bold;">${s.addedCode.pattern}</td>
                            </tr>
                        `;
                    }
                }
                
                tbody.innerHTML = html;

                // Auto-scroll logic for dict container
                const scrollContainer = tbody.closest('.glass-card');
                if (scrollContainer) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            }

            if (msg) {
                msg.textContent = step.msg;
                msg.style.color = step.inDict ? "#10b981" : "var(--gold-primary)";
            }
        }
        else if (slideId === 'slide_zip_5') {
            const compNumbers = canvas.querySelector('.s5-compressed-numbers');
            const bar = canvas.querySelector('.compression-bar-inner');
            const percent = canvas.querySelector('.ratio-percentage');
            const storage = canvas.querySelector('.storage-saving-text');
            const desc = canvas.querySelector('.ratio-desc');
            const origTextEl = canvas.querySelector('.s5-orig-text');
            
            const textStr = "TOBEORNOTTOBEORTOBEORNOT";
            const s5Steps = [
                { name: 'T', start: 0, end: 1, code: 84 },
                { name: 'O', start: 1, end: 2, code: 79 },
                { name: 'B', start: 2, end: 3, code: 66 },
                { name: 'E', start: 3, end: 4, code: 69 },
                { name: 'O', start: 4, end: 5, code: 79 },
                { name: 'R', start: 5, end: 6, code: 82 },
                { name: 'N', start: 6, end: 7, code: 78 },
                { name: 'O', start: 7, end: 8, code: 79 },
                { name: 'T', start: 8, end: 9, code: 84 },
                { name: 'TO', start: 9, end: 11, code: 256 },
                { name: 'BE', start: 11, end: 13, code: 258 },
                { name: 'OR', start: 13, end: 15, code: 260 },
                { name: 'TOB', start: 15, end: 18, code: 265 },
                { name: 'EO', start: 18, end: 20, code: 259 },
                { name: 'RN', start: 20, end: 22, code: 261 },
                { name: 'OT', start: 22, end: 24, code: 263 }
            ];

            const numCount = Math.min(16, Math.floor(progress * 17));

            // Dynamic Text Highlight
            if (origTextEl) {
                if (numCount === 0) {
                    origTextEl.innerHTML = `<span style="color:#fff;">${textStr}</span>`;
                } else {
                    const activeIdx = Math.min(s5Steps.length - 1, numCount - 1);
                    const activeStep = s5Steps[activeIdx];
                    const doneText = textStr.substring(0, activeStep.start);
                    const activeText = textStr.substring(activeStep.start, activeStep.end);
                    const pendingText = textStr.substring(activeStep.end);
                    
                    origTextEl.innerHTML = `<span style="color:rgba(16, 185, 129, 0.65); text-decoration: line-through; opacity: 0.75;">${doneText}</span>` + 
                           `<span style="color:var(--gold-primary); text-shadow:0 0 12px rgba(245,158,11,0.8); font-weight:bold; background:rgba(245,158,11,0.2); border:1px solid rgba(245,158,11,0.5); border-radius:6px; padding:2px 8px; margin:0 2px; display:inline-block; transform:scale(1.08); transition:all 0.15s ease-out;">${activeText}</span>` +
                           `<span style="color:rgba(255,255,255,0.4);">${pendingText}</span>`;
                }
            }

            // Output compressed numbers
            if (compNumbers) {
                if (numCount === 0) {
                    compNumbers.innerHTML = `<span style="color:rgba(255,255,255,0.3)">[]</span>`;
                } else {
                    const codes = s5Steps.slice(0, numCount).map(s => s.code);
                    const listHtml = codes.map((c, i) => {
                        if (i === numCount - 1) {
                            return `<span class="active-code-highlight" style="margin:0 2px;">${c}</span>`;
                        } else {
                            return `<span style="color:#10b981; margin:0 2px;">${c}</span>`;
                        }
                    }).join(', ');
                    compNumbers.innerHTML = `[${listHtml}]`;
                }
            }

            // Sync ratios & storage
            const currentPercent = 100 - Math.round((numCount / 16) * 75);
            const currentBytes = Math.round(48 - (numCount / 16) * 36);

            if (bar) bar.style.width = `${currentPercent}%`;
            if (percent) {
                percent.textContent = `${currentPercent}%`;
                percent.style.color = numCount === 16 ? '#10b981' : (numCount === 0 ? '#fff' : '#f59e0b');
            }
            if (storage) storage.textContent = `${currentBytes} Bytes`;
            
            if (desc) {
                if (numCount === 0) {
                    desc.textContent = 'Bắt đầu nén dữ liệu...';
                } else if (numCount === 16) {
                    desc.textContent = 'Nén hoàn tất! Tiết kiệm 75% dung lượng.';
                } else {
                    desc.textContent = 'Thuật toán LZW đang mã hóa...';
                }
            }
        }
        else if (slideId === 'slide_zip_6') {
            const tbodyDecode = canvas.querySelector('.dict-table-body-decode');
            const outputText = canvas.querySelector('.decoded-text-output');
            const badge = canvas.querySelector('.success-match-badge');
            const decCodeEl = canvas.querySelector('.v26-dec-code');
            const decPatternEl = canvas.querySelector('.v26-dec-pattern');
            const inputNumsEl = canvas.querySelector('.decoder-input-nums');
            
            // Decoded outputs
            const decodeSteps = [
                { progress: 0.1, char: 'T', index: 84 },
                { progress: 0.2, char: 'O', index: 79 },
                { progress: 0.3, char: 'B', index: 66 },
                { progress: 0.4, char: 'E', index: 69 },
                { progress: 0.5, char: 'TO', index: 256 },
                { progress: 0.6, char: 'O', index: 79 },
                { progress: 0.7, char: 'R', index: 82 },
                { progress: 0.8, char: 'BE', index: 258 }
            ];
            
            // Generate reconstructed dictionary based on steps
            const rebuildEntries = [
                { index: 256, pattern: 'TO', trigger: 0.35 },
                { index: 257, pattern: 'OB', trigger: 0.48 },
                { index: 258, pattern: 'BE', trigger: 0.62 },
                { index: 259, pattern: 'EO', trigger: 0.75 }
            ];

            // Determine active index based on progress
            let activeIdx = -1;
            if (progress >= 0.1 && progress < 0.2) activeIdx = 0;
            else if (progress >= 0.2 && progress < 0.3) activeIdx = 1;
            else if (progress >= 0.3 && progress < 0.4) activeIdx = 2;
            else if (progress >= 0.4 && progress < 0.5) activeIdx = 3;
            else if (progress >= 0.5 && progress < 0.6) activeIdx = 4;
            else if (progress >= 0.6 && progress < 0.7) activeIdx = 5;
            else if (progress >= 0.7 && progress < 0.8) activeIdx = 6;
            else if (progress >= 0.8) activeIdx = 7;

            // Highlight active code in the input list
            if (inputNumsEl) {
                const inputCodes = [84, 79, 66, 69, 256, 79, 82, 258];
                const listHtml = inputCodes.map((c, i) => {
                    if (i === activeIdx) {
                        return `<span class="active-code-highlight">${c}</span>`;
                    } else {
                        return `<span style="color:#10b981; opacity:${i < activeIdx ? 0.55 : 1};">${c}</span>`;
                    }
                }).join(', ');
                inputNumsEl.innerHTML = `[${listHtml}]`;
            }

            // Update decoding status panel
            if (activeIdx !== -1) {
                const activeStep = decodeSteps[activeIdx];
                if (decCodeEl) decCodeEl.textContent = `#${activeStep.index}`;
                if (decPatternEl) decPatternEl.textContent = `"${activeStep.char}"`;
            } else {
                if (decCodeEl) decCodeEl.textContent = "-";
                if (decPatternEl) decPatternEl.textContent = "-";
            }
            
            // Text assembly
            let compiledText = '';
            decodeSteps.forEach(step => {
                if (progress >= step.progress) {
                    compiledText += step.char;
                }
            });
            
            if (outputText) outputText.textContent = compiledText;
            
            // Dictionary table building
            if (tbodyDecode) {
                let html = `
                    <tr>
                        <td style="color:rgba(255,255,255,0.3);">1 ... 255</td>
                        <td style="color:rgba(255,255,255,0.3);">Bộ mã ASCII (A, B, C...)</td>
                    </tr>
                `;
                
                rebuildEntries.forEach(entry => {
                    if (progress >= entry.trigger) {
                        html += `
                            <tr class="new-entry">
                                <td style="color:#10b981; font-weight:bold;">${entry.index}</td>
                                <td style="color:#fff; font-weight:bold;">${entry.pattern}</td>
                            </tr>
                        `;
                    }
                });
                
                tbodyDecode.innerHTML = html;

                // Auto-scroll logic for reconstructed dict container
                const scrollContainer = tbodyDecode.closest('.glass-card');
                if (scrollContainer) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            }
            
            // Show check-circle badge at the end
            if (badge) {
                if (progress >= 0.85) {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                } else {
                    badge.style.opacity = '0';
                    badge.style.transform = 'translateY(10px)';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video26',
        topic: 'Nén ZIP & Thuật toán LZW',
        episodeNum: 26,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video26 Plugin] Loaded: ZIP Compression slides ready.');
})();
