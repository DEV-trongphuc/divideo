/**
 * Video 20: QR Code Error Correction - Tại sao rách vẫn quét được?
 * Plugin file - chứa toàn bộ slide animation/HTML cho video20
 */
(function () {
    'use strict';

    // Real QR Code matrices generated for the URL: https://fb.com/turni0
    // 0 = White module, 1 = Black module
    const REAL_QR_L_25 = [
        [1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,1,0,0,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,0,1,0,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,1,0,1,1,1,0,0,1,1,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1,0,0,1,1,1],
        [0,1,0,0,1,0,0,0,1,1,0,1,1,1,0,0,1,1,0,1,1,1,1,1,0],
        [0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0],
        [1,0,1,0,1,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,0],
        [1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0],
        [1,1,1,1,0,1,0,0,0,1,1,0,0,0,1,0,1,1,0,1,1,0,1,0,1],
        [0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1],
        [0,0,1,0,0,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1,1,1,0,0,0],
        [0,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1,0,1,1],
        [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,1,0,0],
        [1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,0,0],
        [1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1,0,1,1,0],
        [1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
        [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0],
        [1,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,1,0,0,1,0,1,1,0,0],
        [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,1,0,1,0,1,0,1]
    ];

    const REAL_QR_H_29 = [
        [1,1,1,1,1,1,1,0,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,0,0,1,1,1,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,0,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,1,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,0],
        [1,0,1,1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,0,0,0,1,1,0,0,1,1,1,0,1,1,1,0,0,1,0,1,1,0],
        [0,1,1,0,1,0,0,1,0,0,1,1,0,0,1,1,0,0,0,0,1,0,0,1,0,1,1,0,0],
        [1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,0,0,1,1,0,1,1,1,1,0,0,1,1,0],
        [0,1,1,0,1,1,0,1,0,1,0,0,0,0,0,1,0,0,1,0,1,1,1,0,0,0,0,1,1],
        [0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0],
        [1,1,0,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0],
        [0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,1,0,0,0,1,0,0,0,1,0,1,1],
        [0,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,0,0,1,1,0,1,1],
        [1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0,0,1,0],
        [1,0,0,1,1,0,1,1,0,0,1,1,1,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,1,0,0,0,1,0,1,0,0],
        [1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0],
        [1,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,1,1,0,0,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1],
        [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,0,0,1,0,1,0,0,1,1,1],
        [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,1,1,0,0,1,0,1,0],
        [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,0]
    ];

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_qrcode_1: [
            { text: 'rách một góc', start: 4.0, end: 10.0, class: 'active-bad' },
            { text: 'chèn cả một logo', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'sửa lỗi Reed-Solomon', start: 16.0, end: 23.0, class: 'active-good' }
        ],
        slide_qrcode_2: [
            { text: 'Mẫu định vị', start: 3.0, end: 8.0, class: 'active-gold' },
            { text: 'Mẫu căn chỉnh', start: 8.0, end: 15.5, class: 'active-gold' },
            { text: 'Mẫu đồng bộ', start: 15.5, end: 19.5, class: 'active-gold' },
            { text: 'Thông tin định dạng', start: 19.5, end: 24.5, class: 'active-good' }
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
        slide_qrcode_4_chart: [
            { text: 'tỷ lệ khôi phục', start: 2.0, end: 7.0, class: 'active-gold' },
            { text: 'cấp độ L và M', start: 7.0, end: 12.0, class: 'active-gold' },
            { text: 'cấp độ Q và H', start: 12.0, end: 17.0, class: 'active-good' }
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
        'slide_qrcode_1', 'slide_qrcode_2', 'slide_qrcode_3', 'slide_qrcode_4', 'slide_qrcode_4_chart',
        'slide_qrcode_5', 'slide_qrcode_6'
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
            
            // Alignment pattern (Version 3 center at 22,22; Version 2 center at 18,18)
            if (size === 29) {
                if (r >= 20 && r <= 24 && c >= 20 && c <= 24) return 'alignment';
            } else if (size === 25) {
                if (r >= 16 && r <= 20 && c >= 16 && c <= 20) return 'alignment';
            }

            // Timing patterns (alternating path at Row 6 / Col 6)
            if (r === 6 && c >= 7 && c < (size - 7)) return 'timing';
            if (c === 6 && r >= 7 && r < (size - 7)) return 'timing';
            
            // Format information modules around finders
            if (r === 8 && ((c >= 0 && c <= 5) || c === 7 || c === 8)) return 'format';
            if (c === 8 && ((r >= 0 && r <= 5) || r === 7 || r === 8)) return 'format';
            if (r === 8 && c >= (size - 8) && c < size) return 'format';
            if (c === 8 && r >= (size - 8) && r < size) return 'format';
            
            return 'data';
        };

        const isBlackModule = (r, c) => {
            if (size === 29) {
                return REAL_QR_H_29[r][c] === 1;
            }
            if (size === 25) {
                return REAL_QR_L_25[r][c] === 1;
            }
            // Fallback for V1
            return (r * c) % 2 === 0;
        };

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const type = getModuleType(r, c);
                const isBlack = isBlackModule(r, c);
                
                // Damage flag checking
                let isDamaged = false;
                for (const zone of damagedZones) {
                    if (r >= zone.rStart && r <= zone.rEnd && c >= zone.cStart && c <= zone.cEnd) {
                        isDamaged = true;
                        break;
                    }
                }

                let cellClass = 'qr-cell';
                if (isBlack) cellClass += ' black';
                
                // Highlight classes mapping
                if (!isDamaged) {
                    if (highlightMode === 'all') {
                        if (type === 'finder') cellClass += isBlack ? ' finder-pattern' : ' finder-white';
                        if (type === 'alignment') cellClass += ' alignment-pattern';
                        if (type === 'timing') cellClass += ' timing-pattern';
                        if (type === 'format') cellClass += ' format-info';
                        if (type === 'data') cellClass += ' data-block';
                    } else if (highlightMode === 'finder' && type === 'finder') {
                        cellClass += isBlack ? ' finder-pattern' : ' finder-white';
                    } else if (highlightMode === 'alignment' && type === 'alignment') {
                        cellClass += ' alignment-pattern';
                    } else if (highlightMode === 'timing' && type === 'timing') {
                        cellClass += ' timing-pattern';
                    } else if (highlightMode === 'format' && type === 'format') {
                        cellClass += ' format-info';
                    } else if (highlightMode === 'data' && type === 'data') {
                        cellClass += ' data-block';
                    }
                }
                
                let cellStyle = '';
                if (isDamaged) {
                    cellStyle = 'background: rgba(239, 68, 68, 0.75) !important; border: 0.5px solid #ef4444;';
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
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:8px; z-index:5;">
                                <span style="font-size:16px; font-weight:bold; color:var(--gold-primary); display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="scan" style="width:18px; height:18px; color:var(--gold-primary);"></i> Đang quét QR...
                                </span>
                            </div>

                            <!-- Camera frame scanning area -->
                            <div style="flex:1; position:relative; margin:20px 0; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.04); background:#070a12; display:flex; align-items:center; justify-content:center; z-index:2;">
                                <!-- Laser Scanning sweep line -->
                                <div class="qr-laser-line"></div>
                                
                                <!-- QR Code Grid with torn bottom-right corner -->
                                <div style="position:relative;">
                                    ${makeQRGridHTML(29, 'none', [{rStart: 22, rEnd: 28, cStart: 22, cEnd: 28}], 0.85)}
                                    <!-- Torn Overlay effect -->
                                    <div class="qr-tear-overlay"></div>
                                </div>
                            </div>

                            <!-- Scanned feedback status popup -->
                            <div class="success-toast intro-decode-toast" style="opacity:0; transform:translateY(15px); transition:all 0.4s; justify-content:center; min-height:48px;">
                                <i data-lucide="check-circle" style="width:20px; height:20px; color:#10b981;"></i>
                                <span>Đã nhận diện: https://fb.com/turni0</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_qrcode_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- QR Code Visualizer -->
                        <div class="glass-card" style="width:420px; height:580px; padding:24px; display:flex; justify-content:center; align-items:center; background:#0c0f17; border:2px solid rgba(255,255,255,0.06); border-radius:24px;">
                            <div class="anatomy-qr-container" style="transition:all 0.3s;">
                                ${makeQRGridHTML(29, 'none', [], 1.05)}
                            </div>
                        </div>

                        <!-- Sidebar describing regions -->
                        <div class="glass-card" style="width:440px; height:580px; padding:20px 24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; border:2.5px solid var(--gold-primary); border-radius:24px; box-shadow:0 0 25px rgba(245,158,11,0.1); box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:6px; text-transform:uppercase;">Cấu trúc QR Code</div>
                            
                            <div style="display:flex; flex-direction:column; gap:11px; margin:12px 0; text-align:left; justify-content:center; flex:1;">
                                <div class="qr-card-hover anatomy-item l-finder" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:22px; height:22px; border-radius:5px; background:#ef4444; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:17px; color:#ef4444; font-weight:bold;">Mẫu định vị (Finder)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-alignment" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:22px; height:22px; border-radius:5px; background:#a855f7; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:17px; color:#a855f7; font-weight:bold;">Mẫu căn chỉnh (Alignment)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-timing" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:22px; height:22px; border-radius:5px; background:#f59e0b; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:17px; color:#f59e0b; font-weight:bold;">Mẫu đồng bộ (Timing)</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-format" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:22px; height:22px; border-radius:5px; background:#3b82f6; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:17px; color:#3b82f6; font-weight:bold;">Thông tin định dạng</h4>
                                </div>

                                <div class="qr-card-hover anatomy-item l-data" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01); transition:all 0.3s;">
                                    <div style="width:22px; height:22px; border-radius:5px; background:#10b981; flex-shrink:0;"></div>
                                    <h4 style="margin:0; font-size:17px; color:#10b981; font-weight:bold;">Dữ liệu & Sửa lỗi</h4>
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
                        <div class="glass-card" style="width:100%; max-width:880px; height:440px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Sơ đồ Thuật toán Reed-Solomon</div>
                            
                            <div style="flex:1; display:flex; align-items:center; justify-content:space-between; margin:20px 0; gap:10px;">
                                <!-- Input Data Bytes -->
                                <div class="math-block rs-input" style="width:240px; text-align:left;">
                                    <div style="font-size:19px; font-weight:bold; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:4px;">Dữ liệu Gốc</div>
                                    <div style="font-size:17px; font-family:monospace; line-height:1.6;">
                                        Byte 1: <span class="math-eq-highlight">01010100</span> (T)<br>
                                        Byte 2: <span class="math-eq-highlight">01110101</span> (u)<br>
                                        Byte 3: <span class="math-eq-highlight">01110010</span> (r)<br>
                                        Byte 4: <span class="math-eq-highlight">01101110</span> (n)
                                    </div>
                                </div>

                                <!-- Arrow -->
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:28px; height:28px; animation: pulse 1.5s infinite;"></i>
                                </div>

                                <!-- Polynomial Encoder -->
                                <div class="math-block rs-encoder" style="width:310px; border-color:#f59e0b; background:rgba(245,158,11,0.02); text-align:center;">
                                    <div style="font-size:19px; font-weight:bold; color:#f59e0b; margin-bottom:8px;">Reed-Solomon Encoder</div>
                                    <div style="font-size:17px; color:#d1d5db; line-height:1.6; font-family:monospace;">
                                        Đa thức Generator:<br>
                                        <span style="color:#ef4444; font-weight:bold;">g(x) = (x-α)(x-α²)...</span>
                                        <div style="height:1px; background:rgba(255,255,255,0.08); margin:8px 0;"></div>
                                        Hệ phương trình sửa lỗi:<br>
                                        <span style="color:#3b82f6; font-weight:bold;">S(x) = E(x) · H(x) = 0</span>
                                    </div>
                                </div>

                                <!-- Arrow -->
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <i data-lucide="chevrons-right" style="color:rgba(255,255,255,0.3); width:28px; height:28px; animation: pulse 1.5s infinite;"></i>
                                </div>

                                <!-- Output Codeword -->
                                <div class="math-block rs-output" style="width:250px; text-align:left; border-color:#10b981;">
                                    <div style="font-size:19px; font-weight:bold; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:4px;">Codeword Đã Mã Hóa</div>
                                    <div style="font-size:17px; font-family:monospace; line-height:1.5;">
                                        Dữ liệu gốc:<br>
                                        <span style="color:#fff;">[54, 75, 72, 6E]</span>
                                        <div style="margin:4px 0;"></div>
                                        <span style="color:#ef4444; font-weight:bold;">Mã sửa lỗi (ECC):</span><br>
                                        <span class="rs-ecc-blocks" style="color:#ef4444; opacity:0.3; font-weight:bold; transition:all 0.3s;">[B2, C9, 1F, E5, A0, D4]</span>
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
                        <div class="glass-card" style="width:100%; max-width:880px; height:530px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">So sánh 4 Cấp độ Sửa lỗi</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.12); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">L vs M vs Q vs H</div>
                            </div>

                            <div style="flex:1; display:flex; justify-content:center; gap:85px; align-items:center; margin:20px 0;">
                                <!-- Level L Code (25x25) -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:18px; font-weight:bold; color:#10b981;">Cấp độ L (Low - 7%)</span>
                                    <div class="lvl-qr-l" style="position:relative; background:#fff; padding:6px; border-radius:8px;">
                                        ${makeQRGridHTML(25, 'none', [], 0.95)}
                                        <div class="lvl-scratch-l" style="position:absolute; inset:0; background:rgba(239,68,68,0.7); display:none; clip-path:polygon(0 0, 100% 0, 100% 15%, 0 15%); pointer-events:none;"></div>
                                    </div>
                                    <span style="font-size:18px; font-weight:bold; color:#10b981;" class="status-lbl-l">Quét: 🟢 OK</span>
                                </div>

                                <!-- Level H Code (29x29) -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:18px; font-weight:bold; color:#ef4444;">Cấp độ H (High - 30%)</span>
                                    <div class="lvl-qr-h" style="position:relative; background:#fff; padding:6px; border-radius:8px;">
                                        ${makeQRGridHTML(29, 'none', [], 0.8)}
                                        <div class="lvl-scratch-h" style="position:absolute; inset:0; background:rgba(239,68,68,0.7); display:none; clip-path:polygon(0 0, 100% 0, 100% 32%, 0 32%); pointer-events:none;"></div>
                                    </div>
                                    <span style="font-size:18px; font-weight:bold; color:#10b981;" class="status-lbl-h">Quét: 🟢 OK</span>
                                </div>
                            </div>

                            <!-- Slider Simulator Indicator -->
                            <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:15px; text-align:left;">
                                <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:bold; margin-bottom:6px;">
                                    <span>Hư hại: <span style="color:var(--gold-primary);" class="damage-pct-lbl">0%</span></span>
                                    <span class="verdict-label" style="color:#10b981;">Hoạt động bình thường</span>
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
        else if (slideId === 'slide_qrcode_4_chart') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Reed-Solomon Error Correction Level Chart -->
                        <div class="glass-card" style="width:100%; max-width:820px; height:500px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">So sánh Tỷ lệ Sửa lỗi</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.12); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">Khả năng phục hồi dữ liệu tối đa</div>
                            </div>
                            
                            <div style="flex:1; display:flex; align-items:flex-end; justify-content:space-around; margin:40px 20px 20px; height:260px; border-bottom:2px solid rgba(255,255,255,0.1); padding-bottom:10px; position:relative;">
                                <!-- Chart grid lines -->
                                <div style="position:absolute; left:0; bottom:23.5%; width:100%; height:1px; border-top:1px dashed rgba(255,255,255,0.08); pointer-events:none;"></div> <!-- 7% level -->
                                <div style="position:absolute; left:0; bottom:50%; width:100%; height:1px; border-top:1px dashed rgba(255,255,255,0.08); pointer-events:none;"></div> <!-- 15% level -->
                                <div style="position:absolute; left:0; bottom:83.5%; width:100%; height:1px; border-top:1px dashed rgba(255,255,255,0.08); pointer-events:none;"></div> <!-- 25% level -->

                                <!-- Column L -->
                                <div style="display:flex; flex-direction:column; align-items:center; width:120px; z-index:2;">
                                    <span style="font-size:18px; font-weight:bold; color:#10b981; margin-bottom:8px;" class="chart-val-l">0%</span>
                                    <div class="chart-bar-l" style="width:50px; height:0px; background:linear-gradient(to top, rgba(16,185,129,0.2), #10b981); border-radius:8px 8px 0 0; box-shadow:0 0 15px rgba(16,185,129,0.3); transition:height 0.1s ease-out;"></div>
                                    <span style="font-size:16px; font-weight:bold; color:#e2e8f0; margin-top:12px;">Cấp L</span>
                                </div>

                                <!-- Column M -->
                                <div style="display:flex; flex-direction:column; align-items:center; width:120px; z-index:2;">
                                    <span style="font-size:18px; font-weight:bold; color:#3b82f6; margin-bottom:8px;" class="chart-val-m">0%</span>
                                    <div class="chart-bar-m" style="width:50px; height:0px; background:linear-gradient(to top, rgba(59,130,246,0.2), #3b82f6); border-radius:8px 8px 0 0; box-shadow:0 0 15px rgba(59,130,246,0.3); transition:height 0.1s ease-out;"></div>
                                    <span style="font-size:16px; font-weight:bold; color:#e2e8f0; margin-top:12px;">Cấp M</span>
                                </div>

                                <!-- Column Q -->
                                <div style="display:flex; flex-direction:column; align-items:center; width:120px; z-index:2;">
                                    <span style="font-size:18px; font-weight:bold; color:#f97316; margin-bottom:8px;" class="chart-val-q">0%</span>
                                    <div class="chart-bar-q" style="width:50px; height:0px; background:linear-gradient(to top, rgba(249,115,22,0.2), #f97316); border-radius:8px 8px 0 0; box-shadow:0 0 15px rgba(249,115,22,0.3); transition:height 0.1s ease-out;"></div>
                                    <span style="font-size:16px; font-weight:bold; color:#e2e8f0; margin-top:12px;">Cấp Q</span>
                                </div>

                                <!-- Column H -->
                                <div style="display:flex; flex-direction:column; align-items:center; width:120px; z-index:2;">
                                    <span style="font-size:18px; font-weight:bold; color:#ef4444; margin-bottom:8px;" class="chart-val-h">0%</span>
                                    <div class="chart-bar-h" style="width:50px; height:0px; background:linear-gradient(to top, rgba(239,68,68,0.2), #ef4444); border-radius:8px 8px 0 0; box-shadow:0 0 15px rgba(239,68,68,0.3); transition:height 0.1s ease-out;"></div>
                                    <span style="font-size:16px; font-weight:bold; color:#e2e8f0; margin-top:12px;">Cấp H</span>
                                </div>
                            </div>

                            <!-- Legend / Info section at the bottom -->
                            <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:15px 25px;">
                                <div style="font-size:14px; color:#94a3b8; display:flex; gap:20px; width:100%; justify-content:space-around; text-align:center;">
                                    <div style="flex:1;"><strong style="color:#10b981;">L (Low):</strong> Sửa lỗi 7%</div>
                                    <div style="flex:1; border-left:1px solid rgba(255,255,255,0.08);"><strong style="color:#3b82f6;">M (Medium):</strong> Sửa lỗi 15%</div>
                                    <div style="flex:1; border-left:1px solid rgba(255,255,255,0.08);"><strong style="color:#f97316;">Q (Quartile):</strong> Sửa lỗi 25%</div>
                                    <div style="flex:1; border-left:1px solid rgba(255,255,255,0.08);"><strong style="color:#ef4444;">H (High):</strong> Sửa lỗi 30%</div>
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
                                ${makeQRGridHTML(29, 'none', [], 1.05)}
                                
                                <!-- Logo overlay placeholder, styled and animated -->
                                <div class="logo-overlay logo-drop-anim" style="position:absolute; left:50%; top:50%; width:90px; height:90px; background:#0c0f17; border:3px solid #f59e0b; border-radius:50%; display:none; align-items:center; justify-content:center; z-index:15; box-shadow:0 6px 20px rgba(0,0,0,0.85); overflow:hidden;">
                                    <img src="http://localhost:5501/logo.png" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" alt="Logo">
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar explanation -->
                        <div class="glass-card" style="width:440px; height:580px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; border:2.5px solid var(--gold-primary); border-radius:24px; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-transform:uppercase;">Chèn Logo vào QR Code</div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:20px; text-align:left;">
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:18px; display:flex; align-items:center; gap:12px;">
                                    <span style="font-size:24px;">1️⃣</span>
                                    <div style="font-size:16px; font-weight:bold; color:#f59e0b;">Tạo mã cấp độ H (30%)</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:18px; display:flex; align-items:center; gap:12px;">
                                    <span style="font-size:24px;">2️⃣</span>
                                    <div style="font-size:16px; font-weight:bold; color:#f59e0b;">Chèn Logo vào giữa</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:18px; display:flex; align-items:center; gap:12px;">
                                    <span style="font-size:24px;">3️⃣</span>
                                    <div style="font-size:16px; font-weight:bold; color:#10b981;">Tự sửa lỗi thời gian thực</div>
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
                        <div class="glass-card" style="width:100%; max-width:880px; height:530px; padding:24px; border:2.5px solid var(--gold-primary); border-radius:24px; background:#0c0f17; box-shadow:0 0 25px rgba(245,158,11,0.1); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Thử thách Phá hủy: Vùng Dữ liệu vs Vùng Định vị</div>

                            <div style="flex:1; display:flex; justify-content:center; gap:85px; align-items:center; margin:20px 0;">
                                <!-- Panel A: Data Damage -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px; width:300px; padding:16px; border-radius:16px; background:rgba(16,185,129,0.02); border:2px solid rgba(16,185,129,0.15);" class="card-state-a qr-pulse-success">
                                    <span style="font-size:18px; font-weight:bold; color:#10b981;">Rách vùng dữ liệu</span>
                                    <div style="background:#fff; padding:6px; border-radius:8px; position:relative;">
                                        ${makeQRGridHTML(29, 'none', [{rStart: 11, rEnd: 17, cStart: 11, cEnd: 17}], 0.8)}
                                    </div>
                                    <div style="font-size:18px; font-weight:bold; color:#10b981;" class="verdict-txt-a">🟢 Quét OK</div>
                                </div>

                                <!-- Panel B: Finder Damage -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:10px; width:300px; padding:16px; border-radius:16px; background:rgba(255,255,255,0.02); border:2.5px solid rgba(255,255,255,0.06);" class="card-state-b">
                                    <span style="font-size:18px; font-weight:bold; color:rgba(255,255,255,0.7);">Rách vùng định vị</span>
                                    <div style="background:#fff; padding:6px; border-radius:8px; position:relative;">
                                        ${makeQRGridHTML(29, 'none', [{rStart: 0, rEnd: 6, cStart: 0, cEnd: 6}], 0.8)}
                                    </div>
                                    <div style="font-size:18px; font-weight:bold; color:rgba(255,255,255,0.4);" class="verdict-txt-b">🟢 Quét OK</div>
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
            
            // Sync with new voiceover timing (total 29.5s):
            // 0s -> 8.0s: Finder Patterns (activeIdx = 0)
            // 8.0s -> 15.5s: Alignment Patterns (activeIdx = 1)
            // 15.5s -> 19.5s: Timing Patterns (activeIdx = 2)
            // 19.5s -> 24.5s: Format Info (activeIdx = 3)
            // 24.5s -> 29.5s: Data Blocks (activeIdx = 4)
            const currentTime = progress * 29.5;
            let activeIdx = 0;
            if (currentTime < 8.0) activeIdx = 0;
            else if (currentTime >= 8.0 && currentTime < 15.5) activeIdx = 1;
            else if (currentTime >= 15.5 && currentTime < 19.5) activeIdx = 2;
            else if (currentTime >= 19.5 && currentTime < 24.5) activeIdx = 3;
            else activeIdx = 4;

            // Highlight sidebar items
            sidebarItems.forEach((item, idx) => {
                if (idx === activeIdx) {
                    item.style.borderColor = 'var(--gold-primary)';
                    item.style.background = 'rgba(245, 158, 11, 0.08)';
                } else {
                    item.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    item.style.background = 'rgba(255, 255, 255, 0.01)';
                }
            });

            // Re-render HTML dynamically only on threshold transition to ensure performance
            const modes = ['finder', 'alignment', 'timing', 'format', 'data'];
            const targetMode = modes[activeIdx];
            const currentRenderedMode = canvas.getAttribute('data-anatomy-mode');
            
            if (currentRenderedMode !== targetMode) {
                const holder = canvas.querySelector('.anatomy-qr-container');
                if (holder) {
                    holder.innerHTML = makeQRGridHTML(29, targetMode, [], 1.05);
                    canvas.setAttribute('data-anatomy-mode', targetMode);
                }
            }
        }
        else if (slideId === 'slide_qrcode_3') {
            const eccText = canvas.querySelector('.rs-ecc-blocks');
            
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
            
            const maxScratchPct = 35;
            const currentScratch = progress * maxScratchPct;
            
            if (sliderProgress) sliderProgress.style.width = `${progress * 100}%`;
            if (damagePctLabel) damagePctLabel.textContent = `${Math.round(currentScratch)}%`;

            // Display overlay scratches on the grids
            if (currentScratch > 1) {
                if (scratchL) scratchL.style.display = 'block';
                if (scratchH) scratchH.style.display = 'block';
                
                const clipL = `polygon(0 0, 100% 0, 100% ${Math.min(100, (currentScratch / 7) * 15)}%, 0 ${Math.min(100, (currentScratch / 7) * 15)}%)`;
                const clipH = `polygon(0 0, 100% 0, 100% ${Math.min(100, (currentScratch / 30) * 32)}%, 0 ${Math.min(100, (currentScratch / 30) * 32)}%)`;
                
                if (scratchL) scratchL.style.clipPath = clipL;
                if (scratchH) scratchH.style.clipPath = clipH;
            } else {
                if (scratchL) scratchL.style.display = 'none';
                if (scratchH) scratchH.style.display = 'none';
            }

            // Decode states
            if (currentScratch > 7) {
                if (statusL) {
                    statusL.textContent = 'Quét: 🔴 Lỗi';
                    statusL.style.color = '#ef4444';
                }
            } else {
                if (statusL) {
                    statusL.textContent = 'Quét: 🟢 OK';
                    statusL.style.color = '#10b981';
                }
            }

            if (currentScratch > 30) {
                if (statusH) {
                    statusH.textContent = 'Quét: 🔴 Lỗi';
                    statusH.style.color = '#ef4444';
                }
                if (verdictLabel) {
                    verdictLabel.textContent = '❌ Cả hai đều lỗi';
                    verdictLabel.style.color = '#ef4444';
                }
            } else {
                if (statusH) {
                    statusH.textContent = 'Quét: 🟢 OK';
                    statusH.style.color = '#10b981';
                }
                
                if (currentScratch > 7) {
                    if (verdictLabel) {
                        verdictLabel.textContent = '⚠️ Chỉ Level H hoạt động';
                        verdictLabel.style.color = '#f59e0b';
                    }
                } else {
                    if (verdictLabel) {
                        verdictLabel.textContent = '🟢 Hoạt động bình thường';
                        verdictLabel.style.color = '#10b981';
                    }
                }
            }
        }
        else if (slideId === 'slide_qrcode_4_chart') {
            const barL = canvas.querySelector('.chart-bar-l');
            const barM = canvas.querySelector('.chart-bar-m');
            const barQ = canvas.querySelector('.chart-bar-q');
            const barH = canvas.querySelector('.chart-bar-h');

            const valL = canvas.querySelector('.chart-val-l');
            const valM = canvas.querySelector('.chart-val-m');
            const valQ = canvas.querySelector('.chart-val-q');
            const valH = canvas.querySelector('.chart-val-h');

            const maxL = 47;
            const maxM = 100;
            const maxQ = 167;
            const maxH = 200;

            if (barL) barL.style.height = `${progress * maxL}px`;
            if (barM) barM.style.height = `${progress * maxM}px`;
            if (barQ) barQ.style.height = `${progress * maxQ}px`;
            if (barH) barH.style.height = `${progress * maxH}px`;

            if (valL) valL.textContent = `${Math.round(progress * 7)}%`;
            if (valM) valM.textContent = `${Math.round(progress * 15)}%`;
            if (valQ) valQ.textContent = `${Math.round(progress * 25)}%`;
            if (valH) valH.textContent = `${Math.round(progress * 30)}%`;
        }
        else if (slideId === 'slide_qrcode_5') {
            const logo = canvas.querySelector('.logo-overlay');
            
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
            
            if (progress > 0.5) {
                if (cardStateB) {
                    cardStateB.classList.remove('qr-pulse-success');
                    cardStateB.classList.add('qr-pulse-warn');
                    cardStateB.style.borderColor = '#ef4444';
                    cardStateB.style.background = 'rgba(239, 68, 68, 0.02)';
                }
                if (verdictTxtB) {
                    verdictTxtB.textContent = '❌ Quét lỗi';
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
