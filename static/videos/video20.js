/**
 * Video 20: QR Code Error Correction - Tại sao rách vẫn quét được?
 * Plugin file - chứa toàn bộ slide animation/HTML cho video20
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_qrcode_1: [
            { text: 'rách một góc', start: 4.0, end: 10.0, class: 'active-bad' },
            { text: 'chèn cả một logo', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'sửa lỗi Reed-Solomon', start: 16.0, end: 23.0, class: 'active-good' }
        ],
        slide_qrcode_2: [
            { text: 'Finder Patterns', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'Timing Patterns', start: 10.0, end: 15.0, class: 'active-gold' },
            { text: 'Format Information', start: 15.0, end: 22.0, class: 'active-good' }
        ],
        slide_qrcode_3: [
            { text: 'Reed-Solomon', start: 2.0, end: 7.0, class: 'active-gold' },
            { text: 'byte sửa lỗi dư thừa', start: 7.0, end: 14.0, class: 'active-good' },
            { text: 'hệ phương trình', start: 14.0, end: 22.0, class: 'active-good' }
        ],
        slide_qrcode_4: [
            { text: '4 cấp độ sửa lỗi', start: 3.0, end: 9.0, class: 'active-gold' },
            { text: 'cấp độ H', start: 9.0, end: 15.0, class: 'active-good' },
            { text: 'phá hủy đến 30%', start: 15.0, end: 22.0, class: 'active-good' }
        ],
        slide_qrcode_5: [
            { text: 'chèn logo', start: 3.0, end: 9.0, class: 'active-gold' },
            { text: 'pixel dữ liệu bị hỏng', start: 9.0, end: 16.0, class: 'active-bad' },
            { text: 'tự động tính toán lại', start: 16.0, end: 22.0, class: 'active-good' }
        ],
        slide_qrcode_6: [
            { text: 'không phải là bất tử', start: 3.0, end: 8.0, class: 'active-bad' },
            { text: 'vùng định vị', start: 8.0, end: 14.0, class: 'active-bad' },
            { text: 'hết cứu', start: 14.0, end: 21.0, class: 'active-bad' }
        ],
        slide_qrcode_7: [
            { text: 'khôi phục dữ liệu', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'Turnio.dev', start: 8.0, end: 14.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_qrcode_1', 'slide_qrcode_2', 'slide_qrcode_3', 'slide_qrcode_4', 'slide_qrcode_5',
        'slide_qrcode_6'
    ];

    // ── QR GRID HELPER GENERATOR ──────────────────────────────────────────────
    function makeQRGridHTML(size, highlightMode, damagedZones = [], scale = 1) {
        let html = `<div class="qr-grid-container" style="grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr); width:${size*11*scale}px; height:${size*11*scale}px; padding:${4*scale}px; border-width:${5*scale}px; border-radius:${6*scale}px;">`;
        
        const getModuleType = (r, c) => {
            // Finder pattern top-left
            if (r >= 0 && r <= 6 && c >= 0 && c <= 6) return 'finder';
            // Finder pattern top-right
            if (r >= 0 && r <= 6 && c >= (size - 7) && c < size) return 'finder';
            // Finder pattern bottom-left
            if (r >= (size - 7) && r < size && c >= 0 && c <= 6) return 'finder';
            
            // Timing patterns (V1 has alternating path at Row 6 / Col 6)
            if (r === 6 && c >= 7 && c < (size - 7)) return 'timing';
            if (c === 6 && r >= 7 && r < (size - 7)) return 'timing';
            
            // Format information modules around finders
            if (r === 8 && ((c >= 0 && c <= 5) || c === 7 || c === 8)) return 'format';
            if (c === 8 && ((r >= 0 && r <= 5) || r === 7 || r === 8)) return 'format';
            if (r === 8 && c >= (size - 8) && c < size) return 'format';
            if (c === 8 && r >= (size - 8) && r < size) return 'format';
            
            return 'data';
        };

        const isFinderWhite = (r, c) => {
            if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
                if (r === 1 || r === 5 || c === 1 || c === 5) return true;
            }
            if (r >= 0 && r <= 6 && c >= (size - 7) && c < size) {
                const cc = c - (size - 7);
                if (r === 1 || r === 5 || cc === 1 || cc === 5) return true;
            }
            if (r >= (size - 7) && r < size && c >= 0 && c <= 6) {
                const rr = r - (size - 7);
                if (rr === 1 || rr === 5 || c === 1 || c === 5) return true;
            }
            return false;
        };

        const isBlackModule = (r, c) => {
            const type = getModuleType(r, c);
            if (type === 'finder') return !isFinderWhite(r, c);
            if (type === 'timing') return (r + c) % 2 === 0;
            if (type === 'format') return (r * 3 + c * 7) % 2 === 0;
            // Deterministic mock data dots
            return (r * c) % 2 === 0 || (r + c) % 3 === 0;
        };

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const type = getModuleType(r, c);
                const isBlack = isBlackModule(r, c);
                const isWhiteF = type === 'finder' && isFinderWhite(r, c);
                
                // Damage flag checking
                let isDamaged = false;
                for (const zone of damagedZones) {
                    if (r >= zone.rStart && r <= zone.rEnd && c >= zone.cStart && c <= zone.cEnd) {
                        isDamaged = true;
                        break;
                    }
                }

                let cellClass = 'qr-cell';
                if (isBlack && !isWhiteF) cellClass += ' black';
                
                let cellStyle = '';
                if (isDamaged) {
                    cellStyle = 'background: rgba(239, 68, 68, 0.7) !important; border: 0.5px solid #ef4444;';
                } else if (highlightMode === 'all') {
                    if (type === 'finder') cellStyle = isWhiteF ? 'background:#fff !important;' : 'background:#ef4444 !important;';
                    if (type === 'timing') cellStyle = 'background:#f59e0b !important;';
                    if (type === 'format') cellStyle = 'background:#3b82f6 !important;';
                    if (type === 'data') cellStyle = 'background:#10b981 !important;';
                } else if (highlightMode === 'finder' && type === 'finder') {
                    cellStyle = isWhiteF ? 'background:#fff !important;' : 'background:#ef4444 !important;';
                } else if (highlightMode === 'timing' && type === 'timing') {
                    cellStyle = 'background:#f59e0b !important;';
                } else if (highlightMode === 'format' && type === 'format') {
                    cellStyle = 'background:#3b82f6 !important;';
                } else if (highlightMode === 'data' && type === 'data') {
                    cellStyle = 'background:#10b981 !important;';
                }
                
                html += `<div class="${cellClass}" style="${cellStyle}"></div>`;
            }
        }
        html += '</div>';
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_qrcode_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:0.85;">
                        <!-- Phone Mockup -->
                        <div class="glass-card qr-phone-mockup" style="width:400px; height:660px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
                            <!-- Header status -->
                            <div style="display:flex; justify-content:center; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:12px; z-index:5; width:100%;">
                                <span style="font-size:18px; font-weight:bold; color:var(--gold-primary); display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="scan" style="width:20px; height:20px; color:var(--gold-primary);"></i> QUÉT MÃ QR KHÔI PHỤC
                                </span>
                            </div>

                            <!-- Camera frame scanning area -->
                            <div style="flex:1; position:relative; margin:20px 0; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.04); background:#070a12; display:flex; align-items:center; justify-content:center; z-index:2;">
                                <!-- Laser Scanning sweep line -->
                                <div class="qr-laser-line"></div>
                                
                                <!-- QR Code Grid with torn bottom-right corner -->
                                <div style="position:relative;">
                                    ${makeQRGridHTML(21, 'none', [{rStart: 16, rEnd: 20, cStart: 16, cEnd: 20}])}
                                    <!-- Torn Overlay effect -->
                                    <div class="qr-tear-overlay"></div>
                                </div>
                            </div>

                            <!-- Scanned feedback status popup -->
                            <div class="success-toast intro-decode-toast" style="op        else if (slideId === 'slide_qrcode_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- QR Code Visualizer -->
                        <div class="glass-card" style="width:420px; height:580px; padding:24px; display:flex; justify-content:center; align-items:center; background:#0c0f17; border:2px solid rgba(255,255,255,0.06); border-radius:24px;">
                            <div class="anatomy-qr-container" style="transition:all 0.3s;">
                                ${makeQRGridHTML(21, 'none', [], 1.4)}
                            </div>
                        </div>

                        <!-- Sidebar describing regions -->
                        <div class="glass-card" style="width:440px; height:580px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; border:2.5px solid var(--gold-primary); border-radius:24px; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-transform:uppercase;">Cấu trúc QR Code</div>
                            
                            <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0; text-align:left;">
                                <div class="qr-card-hover anatomy-item l-finder" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:20px; height:20px; border-radius:4px; background:#ef4444; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:18px; font-weight:bold; color:#ef4444;">Finder Patterns (Định vị)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-timing" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:20px; height:20px; border-radius:4px; background:#f59e0b; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:18px; font-weight:bold; color:#f59e0b;">Timing Patterns (Căn hàng)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-format" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:20px; height:20px; border-radius:4px; background:#3b82f6; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:18px; font-weight:bold; color:#3b82f6;">Format Info (Định dạng)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-data" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:20px; height:20px; border-radius:4px; background:#10b981; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:18px; font-weight:bold; color:#10b981;">Data & ECC (Dữ liệu & Sửa lỗi)</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_qrcode_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Reed-Solomon Math Pipeline -->
                        <div class="glass-card" style="width:100%; max-width:820px; height:500px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left; margin-bottom:20px;">Sơ đồ Thuật toán Reed-Solomon</div>
                            
                            <div style="flex:1; display:flex; align-items:center; justify-content:space-between; margin:20px 0; gap:10px;">
                                <!-- Input Data Bytes -->
                                <div class="math-block rs-input" style="width:180px; text-align:left;">
                                    <div style="font-weight:bold; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:4px;">Dữ liệu Gốc</div>
                                    <div style="font-size:15px; font-family:monospace; line-height:1.8; text-align:center;">
                                        "T" &rarr; <span class="math-eq-highlight">01010100</span><br>
                                        "u" &rarr; <span class="math-eq-highlight">01110101</span><br>
                                        "r" &rarr; <span class="math-eq-highlight">01110010</span><br>
                                        "n" &rarr; <span class="math-eq-highlight">01101110</span>
                                    </div>
                                </div>

                                <!-- Arrow -->
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:28px; height:28px; animation: pulse 1.5s infinite;"></i>
                                </div>

                                <!-- Polynomial Encoder -->
                                <div class="math-block rs-encoder" style="width:260px; border-color:#f59e0b; background:rgba(245,158,11,0.02); text-align:center; display:flex; flex-direction:column; justify-content:center; height:150px;">
                                    <div style="font-weight:bold; color:#f59e0b; margin-bottom:8px;">Reed-Solomon Encoder</div>
                                    <div style="font-size:14px; color:#d1d5db; line-height:1.6; font-family:monospace;">
                                        <span style="color:#ef4444;">g(x) = (x-α)(x-α²)...</span>
                                        <div style="height:1px; background:rgba(255,255,255,0.08); margin:8px 0;"></div>
                                        <span style="color:#3b82f6;">S(x) = E(x) · H(x) = 0</span>
                                    </div>
                                </div>

                                <!-- Arrow -->
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:28px; height:28px; animation: pulse 1.5s infinite;"></i>
                                </div>

                                <!-- Output Codeword -->
                                <div class="math-block rs-output" style="width:210px; text-align:left; border-color:#10b981;">
                                    <div style="font-weight:bold; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:4px;">Codeword Mã Hóa</div>
                                    <div style="font-size:13px; font-family:monospace; line-height:1.6;">
                                        Dữ liệu gốc:<br>
                                        <span style="color:#fff; font-weight:bold;">[54, 75, 72, 6E]</span>
                                        <div style="margin:8px 0;"></div>
                                        <span style="color:#ef4444; font-weight:bold;">ECC (Dư thừa):</span><br>
                                        <span class="rs-ecc-blocks" style="color:#ef4444; font-weight:bold; opacity:0.3;">[B2, C9, 1F, E5, A0, D4]</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_qrcode_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <div class="glass-card" style="width:100%; max-width:820px; height:500px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">So sánh 4 Cấp độ Sửa lỗi</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.12); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">L vs M vs Q vs H</div>
                            </div>

                            <div style="flex:1; display:flex; justify-content:space-around; align-items:center; margin:20px 0;">
                                <!-- Level L Code -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:16px; font-weight:bold; color:#10b981;">Cấp độ L (Low - 7%)</span>
                                    <div class="lvl-qr-l" style="position:relative; background:#fff; padding:6px; border-radius:8px;">
                                        ${makeQRGridHTML(21, 'none', [], 0.9)}
                                        <div class="lvl-scratch-l" style="position:absolute; inset:0; background:rgba(239,68,68,0.7); display:none; clip-path:polygon(0 0, 100% 0, 100% 15%, 0 15%); pointer-events:none;"></div>
                                    </div>
                                    <span style="font-size:15px; font-weight:bold; color:#10b981;" class="status-lbl-l">🟢 Quét OK</span>
                                </div>

                                <!-- Level H Code -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:16px; font-weight:bold; color:#ef4444;">Cấp độ H (High - 30%)</span>
                                    <div class="lvl-qr-h" style="position:relative; background:#fff; padding:6px; border-radius:8px;">
                                        ${makeQRGridHTML(29, 'none', [], 0.65)}
                                        <div class="lvl-scratch-h" style="position:absolute; inset:0; background:rgba(239,68,68,0.7); display:none; clip-path:polygon(0 0, 100% 0, 100% 32%, 0 32%); pointer-events:none;"></div>
                                    </div>
                                    <span style="font-size:15px; font-weight:bold; color:#10b981;" class="status-lbl-h">🟢 Quét OK</span>
                                </div>
                            </div>

                            <!-- Slider Simulator Indicator -->
                            <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:15px; text-align:left;">
                                <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:6px;">
                                    <span>Tỉ lệ hư hại giả lập: <span style="font-weight:bold; color:var(--gold-primary);" class="damage-pct-lbl">0%</span></span>
                                    <span class="verdict-label" style="font-weight:bold; color:#10b981;">Cả hai quét OK</span>
                                </div>
                                <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; position:relative; overflow:hidden;">
                                    <div class="damage-progress-bar" style="height:100%; width:0%; background:#ef4444; transition:width 0.15s;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_qrcode_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- QR Code with logo animation -->
                        <div class="glass-card" style="width:420px; height:580px; padding:24px; display:flex; justify-content:center; align-items:center; background:#0c0f17; border:2px solid rgba(255,255,255,0.06); border-radius:24px; position:relative;">
                            <div style="position:relative; background:#fff; padding:10px; border-radius:12px;" class="logo-qr-holder">
                                ${makeQRGridHTML(25, 'none', [], 1.25)}
                                
                                <!-- Logo overlay placeholder, styled and animated -->
                                <div class="logo-overlay logo-drop-anim" style="position:absolute; left:50%; top:50%; width:80px; height:80px; background:#0c0f17; border:3px solid #f59e0b; border-radius:16px; display:none; align-items:center; justify-content:center; z-index:15; box-shadow:0 5px 15px rgba(0,0,0,0.8);">
                                    <span style="font-size:24px; font-weight:bold; color:#f59e0b;">T</span>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar explanation -->
                        <div class="glass-card" style="width:440px; height:580px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; border:2.5px solid var(--gold-primary); border-radius:24px; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-transform:uppercase;">Chèn Logo vào QR Code</div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:20px; text-align:left;">
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:20px;">
                                    <div style="font-size:18px; font-weight:bold; color:#f59e0b;">1. Tạo mã ở cấp độ H (30%)</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:20px;">
                                    <div style="font-size:18px; font-weight:bold; color:#f59e0b;">2. Ghi đè Logo lên tâm mã QR</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:20px;">
                                    <div style="font-size:18px; font-weight:bold; color:#10b981;">3. Giải mã Reed-Solomon tự động</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_qrcode_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <div class="glass-card" style="width:100%; max-width:820px; height:500px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Thử thách Phá hủy: Vùng Dữ liệu vs Vùng Định vị</div>

                            <div style="flex:1; display:flex; justify-content:space-around; align-items:center; margin:20px 0;">
                                <!-- Panel A: Data Damage -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:15px; width:280px; padding:16px; border-radius:16px; background:rgba(16,185,129,0.02); border:2px solid rgba(16,185,129,0.15);" class="card-state-a qr-pulse-success">
                                    <span style="font-size:16px; font-weight:bold; color:#10b981;">A: Rách vùng dữ liệu</span>
                                    <div style="background:#fff; padding:6px; border-radius:8px; position:relative;">
                                        ${makeQRGridHTML(21, 'none', [{rStart: 8, rEnd: 12, cStart: 10, cEnd: 14}], 0.95)}
                                    </div>
                                    <div style="font-size:15px; font-weight:bold; color:#10b981;" class="verdict-txt-a">🟢 Quét OK</div>
                                </div>

                                <!-- Panel B: Finder Damage -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:15px; width:280px; padding:16px; border-radius:16px; background:rgba(255,255,255,0.02); border:2.5px solid rgba(255,255,255,0.06);" class="card-state-b">
                                    <span style="font-size:16px; font-weight:bold; color:rgba(255,255,255,0.7);">B: Rách vùng định vị</span>
                                    <div style="background:#fff; padding:6px; border-radius:8px; position:relative;">
                                        ${makeQRGridHTML(21, 'none', [{rStart: 0, rEnd: 6, cStart: 0, cEnd: 6}], 0.95)}
                                    </div>
                                    <div style="font-size:15px; font-weight:bold; color:rgba(255,255,255,0.4);" class="verdict-txt-b">🟢 Quét OK</div>
                                </div>
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
        if (slideId === 'slide_qrcode_1') {
            const scanToast = canvas.querySelector('.intro-decode-toast');
            const laser = canvas.querySelector('.qr-laser-line');
            
            // Scan timeline sequence:
            // 0.0 -> 0.6: Scanner is moving. Laser is active. Toast hidden.
            // 0.6 -> 1.0: QR decoded! Toast pops up, laser stops or stays.
            
            if (progress > 0.6) {
                if (scanToast) {
                    scanToast.style.opacity = '1';
                    scanToast.style.transform = 'translateY(0)';
                }
            } else {
                if (scanToast) {
                    scanToast.style.opacity = '0';
                    scanToast.style.transform = 'translateY(15px)';
                }
            }
        }
        else if (slideId === 'slide_qrcode_2') {
            const sidebarItems = canvas.querySelectorAll('.anatomy-item');
            const cells = canvas.querySelectorAll('.anatomy-qr-container .qr-cell');
            
            // Highlights one segment at a time:
            // 0.0 -> 0.25: Finder Patterns
            // 0.25 -> 0.5: Timing Patterns
            // 0.5 -> 0.75: Format Info
            // 0.75 -> 1.0: Data Blocks
            
            let activeIdx = 0;
            if (progress < 0.25) activeIdx = 0;
            else if (progress >= 0.25 && progress < 0.5) activeIdx = 1;
            else if (progress >= 0.5 && progress < 0.75) activeIdx = 2;
            else activeIdx = 3;

            // Highlight sidebar items
            sidebarItems.forEach((item, idx) => {
                if (idx === activeIdx) {
                    item.style.borderColor = 'var(--gold-primary)';
                    item.style.background = 'rgba(245, 158, 11, 0.06)';
                } else {
                    item.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    item.style.background = 'rgba(255, 255, 255, 0.01)';
                }
            });

            // Re-render the grid color highlighting
            const targetColorTypes = ['finder', 'timing', 'format', 'data'];
            const activeType = targetColorTypes[activeIdx];
            
            cells.forEach(cell => {
                // Determine block type from style backgrounds or DOM parameters
                // Let's color them by inspecting classes
                const isBlack = cell.classList.contains('black');
                const isWhiteFinder = cell.style.background.includes('#fff') || cell.style.background.includes('rgb(255, 255, 255)');
                
                // Reset styling
                cell.style.background = '';
                
                // Apply active theme coloring
                // Top-left finder, top-right, bottom-left indices in 21x21 grid
                // To avoid parsing grid again, we lookup the cell offset position
            });
            
            // To make it simple and reliable: re-render the HTML template dynamically on threshold cross!
            // Let's cache the current mode to avoid redundant innerHTML updates
            const modes = ['finder', 'timing', 'format', 'data'];
            const targetMode = modes[activeIdx];
            const currentRenderedMode = canvas.getAttribute('data-anatomy-mode');
            
            if (currentRenderedMode !== targetMode) {
                const holder = canvas.querySelector('.anatomy-qr-container');
                if (holder) {
                    holder.innerHTML = makeQRGridHTML(21, targetMode, [], 1.4);
                    canvas.setAttribute('data-anatomy-mode', targetMode);
                }
            }
        }
        else if (slideId === 'slide_qrcode_3') {
            const eccText = canvas.querySelector('.rs-ecc-blocks');
            
            // Animation timeline:
            // 0.0 -> 0.4: Encoder is calculating, ECC is dimmed
            // 0.4 -> 1.0: ECC lights up and mathematical correction resolves
            
            if (progress > 0.4) {
                if (eccText) {
                    eccText.style.opacity = '1';
                    eccText.style.textShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
                }
            } else {
                if (eccText) {
                    eccText.style.opacity = '0.3';
                    eccText.style.textShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_qrcode_4') {
            const sliderProgress = canvas.querySelector('.damage-progress-bar');
            const damagePctLabel = canvas.querySelector('.damage-pct-lbl');
            const verdictLabel = canvas.querySelector('.verdict-label');
            const scratchL = canvas.querySelector('.lvl-scratch-l');
            const scratchH = canvas.querySelector('.lvl-scratch-h');
            const statusL = canvas.querySelector('.status-lbl-l');
            const statusH = canvas.querySelector('.status-lbl-h');
            
            // Simulating a scratch that covers more area as progress advances:
            // Max scratch is 35%
            const maxScratchPct = 35;
            const currentScratch = progress * maxScratchPct;
            
            if (sliderProgress) sliderProgress.style.width = `${progress * 100}%`;
            if (damagePctLabel) damagePctLabel.textContent = `${Math.round(currentScratch)}%`;

            // Display overlay scratches on the grids
            if (currentScratch > 1) {
                if (scratchL) scratchL.style.display = 'block';
                if (scratchH) scratchH.style.display = 'block';
                
                // Clip paths to represent growing scratches
                const clipL = `polygon(0 0, 100% 0, 100% ${Math.min(100, (currentScratch / 7) * 15)}%, 0 ${Math.min(100, (currentScratch / 7) * 15)}%)`;
                const clipH = `polygon(0 0, 100% 0, 100% ${Math.min(100, (currentScratch / 30) * 32)}%, 0 ${Math.min(100, (currentScratch / 30) * 32)}%)`;
                
                if (scratchL) scratchL.style.clipPath = clipL;
                if (scratchH) scratchH.style.clipPath = clipH;
            } else {
                if (scratchL) scratchL.style.display = 'none';
                if (scratchH) scratchH.style.display = 'none';
            }

            // Decode states
            // Level L fails at 7% damage
            if (currentScratch > 7) {
                if (statusL) {
                    statusL.textContent = '🔴 Lỗi (> 7%)';
                    statusL.style.color = '#ef4444';
                }
            } else {
                if (statusL) {
                    statusL.textContent = '🟢 Quét OK';
                    statusL.style.color = '#10b981';
                }
            }

            // Level H fails at 30% damage
            if (currentScratch > 30) {
                if (statusH) {
                    statusH.textContent = '🔴 Lỗi (> 30%)';
                    statusH.style.color = '#ef4444';
                }
                if (verdictLabel) {
                    verdictLabel.textContent = '❌ Cả hai đều hỏng';
                    verdictLabel.style.color = '#ef4444';
                }
            } else {
                if (statusH) {
                    statusH.textContent = '🟢 Quét OK';
                    statusH.style.color = '#10b981';
                }
                
                if (currentScratch > 7) {
                    if (verdictLabel) {
                        verdictLabel.textContent = '⚠️ Level H sống, Level L hỏng';
                        verdictLabel.style.color = '#f59e0b';
                    }
                } else {
                    if (verdictLabel) {
                        verdictLabel.textContent = '🟢 Cả hai quét OK';
                        verdictLabel.style.color = '#10b981';
                    }
                }
            }
        }
        else if (slideId === 'slide_qrcode_5') {
            const logo = canvas.querySelector('.logo-overlay');
            
            // Animation sequence:
            // 0.0 -> 0.3: Logo is scaling/dropping down
            // 0.3 -> 1.0: Logo firmly embedded, scan successfully recovers around it
            
            if (progress > 0.25) {
                if (logo) {
                    logo.style.display = 'flex';
                    if (!logo.classList.contains('logo-drop-anim')) {
                        logo.classList.add('logo-drop-anim');
                    }
                }
            } else {
                if (logo) {
                    logo.style.display = 'none';
                    logo.classList.remove('logo-drop-anim');
                }
            }
        }
        else if (slideId === 'slide_qrcode_6') {
            const cardStateB = canvas.querySelector('.card-state-b');
            const verdictTxtB = canvas.querySelector('.verdict-txt-b');
            
            // Animation timeline:
            // 0.0 -> 0.5: Normal state for Finder damage test
            // 0.5 -> 1.0: Finder pattern is torn. Scanning fails (red state).
            
            if (progress > 0.5) {
                if (cardStateB) {
                    cardStateB.classList.remove('qr-pulse-success');
                    cardStateB.classList.add('qr-pulse-warn');
                    cardStateB.style.borderColor = '#ef4444';
                    cardStateB.style.background = 'rgba(239, 68, 68, 0.02)';
                }
                if (verdictTxtB) {
                    verdictTxtB.textContent = '🔴 Lỗi: Mất định vị';
                    verdictTxtB.style.color = '#ef4444';
                }
            } else {
                if (cardStateB) {
                    cardStateB.classList.remove('qr-pulse-warn');
                    cardStateB.classList.add('qr-pulse-success');
                    cardStateB.style.borderColor = '#10b981';
                    cardStateB.style.background = 'rgba(16, 185, 129, 0.02)';
                }
                if (verdictTxtB) {
                    verdictTxtB.textContent = '🟢 Quét OK';
                    verdictTxtB.style.color = '#10b981';
                }
            }
        }
    }

    // ── PUBLIC PLUGIN REGISTRATION ─────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video20',
        topic: 'QR Code Error Correction',
        episodeNum: 20,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video20 Plugin] Loaded: QR Code Error Correction slides ready.');
})();
