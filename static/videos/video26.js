/**
 * Video 26: ZIP Compression & Lossless LZW Mechanics
 * Plugin file - chứa toàn bộ slide animation/HTML cho video26
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Slide 1 (first slide) has no keywords as per rule.
    const keywordsData = {
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
        'slide_zip_1', 'slide_zip_2', 'slide_zip_3', 'slide_zip_4', 'slide_zip_5', 'slide_zip_6'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_zip_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v26-zoom-container">
                        <!-- ZIP Logo visual representation -->
                        <div class="zip-icon-anim" style="position:relative; width:280px; height:280px; display:flex; align-items:center; justify-content:center;">
                            <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%); filter:blur(25px);"></div>
                            <img src="/static/zip_icon.png" style="width:220px; height:220px; z-index:5; filter:drop-shadow(0 15px 30px rgba(59, 130, 246, 0.45));" alt="ZIP File Icon">
                            
                            <!-- Floating Binary Particles (Wow aesthetics) -->
                            <div class="v26-binary-particle" style="position:absolute; left:-45px; top:30px; color:#3b82f6; font-size:24px; animation:v26-float-particle-1 4s infinite ease-in-out;">1</div>
                            <div class="v26-binary-particle" style="position:absolute; right:-35px; top:60px; color:#10b981; font-size:20px; animation:v26-float-particle-2 5s infinite ease-in-out; animation-delay:1s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:-25px; bottom:40px; color:#f59e0b; font-size:22px; animation:v26-float-particle-3 6s infinite ease-in-out; animation-delay:2s;">1</div>
                            <div class="v26-binary-particle" style="position:absolute; right:-55px; bottom:30px; color:#3b82f6; font-size:26px; animation:v26-float-particle-1 5s infinite ease-in-out; animation-delay:0.5s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:50%; top:-45px; transform:translateX(-50%); color:#10b981; font-size:18px; animation:v26-float-particle-2 4s infinite ease-in-out; animation-delay:1.5s;">0</div>
                            <div class="v26-binary-particle" style="position:absolute; left:40%; bottom:-45px; transform:translateX(-50%); color:#f59e0b; font-size:24px; animation:v26-float-particle-3 5s infinite ease-in-out; animation-delay:0.8s;">1</div>
                        </div>
                        <div style="font-size:28px; font-weight:bold; color:#fff; text-shadow:0 0 15px rgba(59,130,246,0.35); text-align:center; letter-spacing:1px; margin-top:15px;">
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
                            <div class="glass-card" style="flex:1.3; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0c0f17; display:flex; flex-direction:column; justify-content:space-between;">
                                <div style="font-size:18px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
                                    Luồng ký tự đầu vào
                                </div>
                                
                                <div style="display:flex; justify-content:center; align-items:center; flex-wrap:wrap; padding:20px; background:rgba(0,0,0,0.3); border-radius:16px; margin:20px 0; gap:2px;" class="char-stream-box">
                                    <span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">N</span><span class="char-unit">O</span><span class="char-unit">T</span><span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">T</span><span class="char-unit">O</span><span class="char-unit">B</span><span class="char-unit">E</span><span class="char-unit">O</span><span class="char-unit">R</span><span class="char-unit">N</span><span class="char-unit">O</span><span class="char-unit">T</span>
                                </div>

                                <div class="glass-card" style="padding:15px; border:1px solid rgba(245,158,11,0.25); background:rgba(245,158,11,0.02); border-radius:12px; text-align:center;">
                                    <div style="font-size:20px; color:var(--gold-primary); font-weight:bold;" class="dict-status-msg">Khởi tạo từ điển (1 - 255)</div>
                                </div>
                            </div>

                            <!-- Right: Dynamic LZW Dictionary -->
                            <div class="glass-card" style="flex:1; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; background:#0b0e14; max-height:400px; overflow-y:auto;">
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
        if (slideId === 'slide_zip_1') {
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
            
            // Generate dictionary elements sequentially depending on progress
            const dictEntries = [
                { index: 256, pattern: 'TO', trigger: 0.15 },
                { index: 257, pattern: 'OB', trigger: 0.25 },
                { index: 258, pattern: 'BE', trigger: 0.35 },
                { index: 259, pattern: 'EO', trigger: 0.42 },
                { index: 260, pattern: 'OR', trigger: 0.50 },
                { index: 261, pattern: 'RN', trigger: 0.58 },
                { index: 262, pattern: 'NO', trigger: 0.66 },
                { index: 263, pattern: 'OT', trigger: 0.74 },
                { index: 264, pattern: 'TT', trigger: 0.82 },
                { index: 265, pattern: 'TOB', trigger: 0.90 }
            ];
            
            if (tbody) {
                let html = '';
                // Render initial basic codes
                html += `
                    <tr>
                        <td style="color:rgba(255,255,255,0.3);">1 ... 255</td>
                        <td style="color:rgba(255,255,255,0.3);">Bộ mã ASCII (A, B, C...)</td>
                    </tr>
                `;
                
                let activeEntry = null;
                dictEntries.forEach(entry => {
                    if (progress >= entry.trigger) {
                        html += `
                            <tr class="new-entry">
                                <td style="color:var(--gold-primary); font-weight:bold;">${entry.index}</td>
                                <td style="color:#fff; font-weight:bold;">${entry.pattern}</td>
                            </tr>
                        `;
                        activeEntry = entry;
                    }
                });
                
                tbody.innerHTML = html;
                
                if (msg) {
                    if (activeEntry) {
                        msg.textContent = `Thêm mẫu mới: '${activeEntry.pattern}' được gán mã #${activeEntry.index}`;
                        msg.style.color = 'var(--gold-primary)';
                    } else {
                        msg.textContent = 'Khởi tạo từ điển (1 - 255)';
                        msg.style.color = 'rgba(255,255,255,0.5)';
                    }
                }
            }
        }
        else if (slideId === 'slide_zip_5') {
            const compNumbers = canvas.querySelector('.s5-compressed-numbers');
            const bar = canvas.querySelector('.compression-bar-inner');
            const percent = canvas.querySelector('.ratio-percentage');
            const storage = canvas.querySelector('.storage-saving-text');
            const desc = canvas.querySelector('.ratio-desc');
            
            // Animation sequence for streams and rates
            if (progress < 0.25) {
                if (compNumbers) compNumbers.textContent = '[84, 79, 66, 69, ...]';
                if (bar) bar.style.width = '100%';
                if (percent) percent.textContent = '100%';
                if (percent) percent.style.color = '#fff';
                if (storage) storage.textContent = '48 Bytes';
                if (desc) desc.textContent = 'Đang xử lý dữ liệu...';
            } else if (progress >= 0.25 && progress < 0.75) {
                const ratio = (progress - 0.25) / 0.5; // 0 to 1
                const currentPercent = 100 - Math.round(ratio * 75);
                const currentBytes = Math.round(48 - ratio * 36);
                
                if (compNumbers) compNumbers.textContent = '[84, 79, 66, 69, 256, 79, 82, 258]';
                if (bar) bar.style.width = `${currentPercent}%`;
                if (percent) {
                    percent.textContent = `${currentPercent}%`;
                    percent.style.color = '#f59e0b';
                }
                if (storage) storage.textContent = `${currentBytes} Bytes`;
                if (desc) desc.textContent = 'Thuật toán LZW đang mã hóa...';
            } else {
                // Done nén
                if (compNumbers) compNumbers.textContent = '[84, 79, 66, 69, 256, 79, 82, 258, 260, 265, 258, 260]';
                if (bar) bar.style.width = '25%';
                if (percent) {
                    percent.textContent = '25%';
                    percent.style.color = '#10b981';
                }
                if (storage) storage.textContent = '12 Bytes';
                if (desc) desc.textContent = 'Nén hoàn tất! Giảm 75%';
            }
        }
        else if (slideId === 'slide_zip_6') {
            const tbodyDecode = canvas.querySelector('.dict-table-body-decode');
            const outputText = canvas.querySelector('.decoded-text-output');
            const badge = canvas.querySelector('.success-match-badge');
            
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
        topic: 'ZIP Compression & Lossless LZW Mechanics',
        episodeNum: 26,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video26 Plugin] Loaded: ZIP Compression slides ready.');
})();
