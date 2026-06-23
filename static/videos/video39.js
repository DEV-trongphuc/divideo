/**
 * Video 39: Digital Video Call Compression
 * Plugin file - chứa toàn bộ slide animation/HTML cho video39
 * Load động bởi app.js khi user chọn video39
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_v39_1: [],
        slide_v39_2: [
            { text: 'Dư thừa thời gian', start: 2.0, end: 7.0, class: 'active-gold' },
            { text: 'đứng yên', start: 7.0, end: 12.0, class: 'active-good' }
        ],
        slide_v39_3: [
            { text: 'I-Frame', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'mốc tham chiếu', start: 8.0, end: 13.5, class: 'active-gold' }
        ],
        slide_v39_4: [
            { text: 'P-Frame', start: 3.0, end: 7.0, class: 'active-good' },
            { text: 'giảm đến 90%', start: 7.0, end: 14.0, class: 'active-gold' }
        ],
        slide_v39_5: [
            { text: 'Vector chuyển động', start: 4.0, end: 10.0, class: 'active-good' },
            { text: 'dịch sang trái', start: 10.0, end: 15.0, class: 'active-gold' }
        ],
        slide_v39_6: [
            { text: 'B-Frame', start: 2.5, end: 7.5, class: 'active-good' },
            { text: 'quá khứ lẫn tương lai', start: 7.5, end: 12.5, class: 'active-gold' }
        ],
        slide_v39_7: [
            { text: 'Chuỗi GOP', start: 2.0, end: 6.0, class: 'active-good' },
            { text: 'không độ trễ', start: 6.0, end: 10.0, class: 'active-gold' }
        ]
    };

    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_v39_1', 'slide_v39_2', 'slide_v39_3', 'slide_v39_4', 'slide_v39_5', 'slide_v39_6', 'slide_v39_7'
    ];

    // Helper: generate 8x8 pixel grid cells programmatically
    function getGridCellsHTML(prefix) {
        let html = '';
        for (let i = 0; i < 64; i++) {
            html += `<div class="v39-pixel ${prefix}-px-${i}"></div>`;
        }
        return html;
    }

    // Face structure indices on 8x8 grid
    const faceIndices = [11, 12, 18, 19, 20, 21, 26, 27, 28, 29, 34, 35, 36, 37, 42, 43, 44, 45, 51, 52];
    const mouthIndices = [43, 44];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        } else {
            return; // template already exists, don't wipe it
        }

        if (slideId === 'slide_v39_1') {
            canvas.innerHTML = `
                <div class="v39-scene-wrapper">
                    <div class="v39-grid-bg red-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(239,68,68,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                        <div class="v39-logo-intro-container">
                            <div class="v39-logo-glow-ring"></div>
                            <div class="v39-logo-glow-ring inner"></div>
                            <div class="v39-giant-logo">
                                <img src="https://cdn-icons-png.flaticon.com/512/3687/3687415.png" alt="Video Compression Logo" style="filter: drop-shadow(0 0 25px rgba(239, 68, 68, 0.7));">
                            </div>
                        </div>
                        
                        <!-- Premium Badge and Label in Glass Card -->
                        <div class="glass-card v39-glow-red" style="text-align: center; width: 440px; padding: 18px 24px; border-radius: 20px; border: 1.5px solid rgba(239, 68, 68, 0.4); background: rgba(13, 17, 28, 0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 15px;">
                            <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;" class="v39-intro-badge">
                                <i data-lucide="video" style="width:14px;height:14px;"></i> ${slide.subtitle || 'Video Compression Engine'}
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size: 16px; font-weight: bold; color: #ef4444; line-height: 1.4;" id="v39-intro-label">
                                ${slide.title || 'Giải Mã Video Call: Nén Dung Lượng 1000 Lần Thế Nào?'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_2') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Pixel Grid representing Speaker Frame -->
                    <div style="position: relative;">
                        <div class="v39-pixel-grid" id="v39-redundancy-grid">
                            ${getGridCellsHTML('v39-redun')}
                        </div>
                        <div class="v39-glass" style="position: absolute; top: 12px; left: 12px; padding: 6px 12px; border-radius: 6px; font-size: 12px; color: rgba(255,255,255,0.7); font-family: monospace; font-weight: bold; letter-spacing: 0.5px;">CAMERA VIEW</div>
                    </div>

                    <!-- Analysis Panel -->
                    <div class="v39-glass" style="width: 100%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Trạng thái:</span>
                            <span style="font-weight: bold; color: var(--compress-cyan);" class="v39-redun-status">Đang quét khung hình...</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
                            <div class="v39-redun-progress" style="width: 0%; height: 100%; background: var(--compress-cyan); transition: width 0.1s linear;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 14px; font-family: monospace; color: rgba(255,255,255,0.5); font-weight: bold;">
                            <span class="v39-redun-static-pct">Hậu cảnh tĩnh: 0%</span>
                            <span class="v39-redun-action">Bỏ qua: 0%</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_3') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Fully loaded Grid -->
                    <div style="position: relative;">
                        <div class="v39-pixel-grid" id="v39-iframe-grid">
                            ${getGridCellsHTML('v39-iframe')}
                        </div>
                        <!-- Laser scan light -->
                        <div class="v39-laser-scanner"></div>
                    </div>

                    <!-- Stats Box -->
                    <div class="v39-glass" style="width: 100%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Loại khung hình:</span>
                            <span style="font-weight: bold; color: var(--compress-orange);">Intra-coded (I-Frame)</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Dung lượng:</span>
                            <span style="font-weight: bold; color: #fff;" class="v39-iframe-size">100% (Khung thô gốc)</span>
                        </div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; font-weight: 500;" class="v39-iframe-desc">
                            Đang quét ghi nhận toàn bộ chi tiết...
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_4') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Side-by-Side Grids (Wider sizes) -->
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; position: relative; width: 100%;">
                        <!-- Left: I-Frame Reference -->
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
                            <div class="v39-pixel-grid" id="v39-pframe-ref" style="width: 310px; height: 310px; gap: 4px; padding: 8px;">
                                ${getGridCellsHTML('v39-pframe-ref')}
                            </div>
                            <span style="font-size: 15px; color: var(--compress-orange); font-family: monospace; font-weight: bold; letter-spacing: 0.5px;">I-Frame (Mốc gốc)</span>
                        </div>

                        <!-- Minus Sign -->
                        <span style="font-size: 42px; font-weight: bold; color: rgba(255,255,255,0.3);">-</span>

                        <!-- Right: P-Frame Delta -->
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
                            <div class="v39-pixel-grid" id="v39-pframe-delta" style="width: 310px; height: 310px; gap: 4px; padding: 8px;">
                                ${getGridCellsHTML('v39-pframe-delta')}
                            </div>
                            <span style="font-size: 15px; color: var(--compress-magenta); font-family: monospace; font-weight: bold; letter-spacing: 0.5px;">P-Frame (Thay đổi)</span>
                        </div>
                    </div>

                    <!-- Stats Box -->
                    <div class="v39-glass" style="width: 100%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Tiết kiệm băng thông:</span>
                            <span style="font-weight: bold; color: var(--compress-green);" class="v39-pframe-save">90% dung lượng</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Dữ liệu truyền:</span>
                            <span style="font-weight: bold; color: var(--compress-magenta);" class="v39-pframe-tx">Chỉ pixel cử động</span>
                        </div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; font-weight: 500;" class="v39-pframe-desc">
                            Trừ đi các khối ảnh tĩnh trùng lặp...
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_5') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Grid area where block shifts and draws vectors -->
                    <div style="position: relative;">
                        <div class="v39-pixel-grid" id="v39-vector-grid">
                            ${getGridCellsHTML('v39-vec')}
                        </div>
                        
                        <!-- Dynamic SVG overlay for Motion Vector arrow (400x400 px container, 50px cell pitch) -->
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;" id="v39-vector-svg">
                            <defs>
                                <marker id="v39-arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <polygon points="0 0, 6 3, 0 6" fill="var(--compress-cyan)" />
                                </marker>
                            </defs>
                            <line class="v39-vector-line" x1="0" y1="0" x2="0" y2="0" stroke="var(--compress-cyan)" stroke-width="4.5" marker-end="url(#v39-arrowhead)" style="opacity: 0; transition: opacity 0.2s;" />
                        </svg>
                    </div>

                    <!-- Codec block analysis -->
                    <div class="v39-glass" style="width: 100%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Tìm kiếm lưới (Macroblock):</span>
                            <span style="font-weight: bold; color: #fff;">Khối 16x16 / 8x8</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Toạ độ vector:</span>
                            <span style="font-weight: bold; color: var(--compress-cyan); font-family: monospace;" class="v39-vector-coords">[dx: 0, dy: 0]</span>
                        </div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; font-weight: 500;" class="v39-vector-desc">
                            Bù chuyển động điểm ảnh thay vì vẽ lại...
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_6') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Three vertical columns or horizontally offset grids -->
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; position: relative; width: 100%;">
                        <!-- Left: Past Frame -->
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
                            <div class="v39-pixel-grid" id="v39-bframe-past" style="width: 190px; height: 190px; gap: 3px; padding: 6px;">
                                ${getGridCellsHTML('v39-bf-past')}
                            </div>
                            <span style="font-size: 13px; color: var(--compress-orange); font-family: monospace; font-weight: bold;">I-Frame (Quá khứ)</span>
                        </div>

                        <!-- arrow left-to-right -->
                        <div style="display: flex; flex-direction: column; align-items: center; font-size: 24px;" class="v39-bf-arrow-left">
                            <span style="color: var(--compress-purple);">➡️</span>
                        </div>

                        <!-- Middle: B-Frame -->
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1.1;">
                            <div class="v39-pixel-grid v39-glow-purple" id="v39-bframe-mid" style="width: 220px; height: 220px; gap: 3px; border-color: var(--compress-purple); padding: 8px;">
                                ${getGridCellsHTML('v39-bf-mid')}
                            </div>
                            <span style="font-size: 14px; color: var(--compress-purple); font-weight: bold; font-family: monospace;">B-Frame (Giải nén)</span>
                        </div>

                        <!-- arrow right-to-left -->
                        <div style="display: flex; flex-direction: column; align-items: center; font-size: 24px;" class="v39-bf-arrow-right">
                            <span style="color: var(--compress-purple);">⬅️</span>
                        </div>

                        <!-- Right: Future Frame -->
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
                            <div class="v39-pixel-grid" id="v39-bframe-future" style="width: 190px; height: 190px; gap: 3px; padding: 6px;">
                                ${getGridCellsHTML('v39-bf-fut')}
                            </div>
                            <span style="font-size: 13px; color: var(--compress-magenta); font-family: monospace; font-weight: bold;">P-Frame (Tương lai)</span>
                        </div>
                    </div>

                    <!-- Stats Box -->
                    <div class="v39-glass" style="width: 100%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Nguồn tham chiếu:</span>
                            <span style="font-weight: bold; color: var(--compress-purple);" class="v39-bf-ref-state">Tham chiếu cả 2 đầu</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 18px;">
                            <span style="color: rgba(255,255,255,0.5);">Độ nén tối đa:</span>
                            <span style="font-weight: bold; color: var(--compress-green);">Mức nén cao nhất</span>
                        </div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; font-weight: 500;" class="v39-bf-desc">
                            Khôi phục các vùng bị che khuất nhờ nội suy...
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v39_7') {
            canvas.innerHTML = `
                <div class="v39-slide-container">
                    <!-- Conveyor Belt Area (680px wide) -->
                    <div style="width: 100%; height: 130px; overflow: hidden; position: relative; display: flex; align-items: center; background: rgba(0,0,0,0.35); border-radius: 20px; border: 2px solid rgba(255,255,255,0.05); padding: 10px 0;">
                        <!-- Highlight zone in the middle -->
                        <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 86px; margin-left: -43px; border: 2px dashed var(--compress-green); box-shadow: 0 0 15px rgba(16,185,129,0.15); border-radius: 12px; z-index: 10; pointer-events: none;">
                            <span style="position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); font-size: 9px; font-weight: bold; color: var(--compress-green); font-family: monospace; letter-spacing: 0.5px;">TRANSMIT</span>
                        </div>

                        <!-- Slide strip container (width 76px + 14px gap = 90px pitch) -->
                        <div class="v39-gop-strip" style="display: flex; gap: 14px; position: absolute; left: 50%; transform: translateX(0px); transition: transform 0.1s linear;">
                            <div class="v39-gop-item gop-i" style="width: 76px; height: 110px; border-radius: 12px; border: 2.5px solid var(--compress-orange); background: rgba(245,158,11,0.15); display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 0 10px rgba(245,158,11,0.25);">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-orange);">I<sub>1</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.5); font-family: monospace; margin-top: 6px; font-weight: bold;">Ref</span>
                            </div>
                            <div class="v39-gop-item gop-b" style="width: 76px; height: 110px; border-radius: 12px; border: 1.8px solid var(--compress-purple); background: rgba(189,0,255,0.08); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-purple);">B<sub>2</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                            <div class="v39-gop-item gop-b" style="width: 76px; height: 110px; border-radius: 12px; border: 1.8px solid var(--compress-purple); background: rgba(189,0,255,0.08); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-purple);">B<sub>3</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                            <div class="v39-gop-item gop-p" style="width: 76px; height: 110px; border-radius: 12px; border: 2.2px solid var(--compress-magenta); background: rgba(255,0,127,0.12); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-magenta);">P<sub>4</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                            <div class="v39-gop-item gop-b" style="width: 76px; height: 110px; border-radius: 12px; border: 1.8px solid var(--compress-purple); background: rgba(189,0,255,0.08); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-purple);">B<sub>5</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                            <div class="v39-gop-item gop-b" style="width: 76px; height: 110px; border-radius: 12px; border: 1.8px solid var(--compress-purple); background: rgba(189,0,255,0.08); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-purple);">B<sub>6</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                            <div class="v39-gop-item gop-p" style="width: 76px; height: 110px; border-radius: 12px; border: 2.2px solid var(--compress-magenta); background: rgba(255,0,127,0.12); display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <span style="font-size: 24px; font-weight: bold; color: var(--compress-magenta);">P<sub>7</sub></span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin-top: 6px;">Diff</span>
                            </div>
                        </div>
                    </div>

                    <!-- Bandwidth Comparison Chart -->
                    <div class="v39-chart-container">
                        <!-- Column 1: Raw HD -->
                        <div class="v39-chart-bar-wrapper">
                            <div class="v39-chart-bar v39-bar-raw" id="v39-bar-raw-el">
                                <span class="v39-chart-val" id="v39-val-raw">0 Gbps</span>
                            </div>
                            <span class="v39-chart-lbl">Raw HD thô</span>
                        </div>

                        <!-- Column 2: MJPEG -->
                        <div class="v39-chart-bar-wrapper">
                            <div class="v39-chart-bar v39-bar-mjpeg" id="v39-bar-mjpeg-el">
                                <span class="v39-chart-val" id="v39-val-mjpeg">0 Mbps</span>
                            </div>
                            <span class="v39-chart-lbl">Nén từng ảnh</span>
                        </div>

                        <!-- Column 3: GOP Stream -->
                        <div class="v39-chart-bar-wrapper">
                            <div class="v39-chart-bar v39-bar-gop" id="v39-bar-gop-el">
                                <span class="v39-chart-val" id="v39-val-gop" style="color: var(--compress-green);">0 Mbps</span>
                            </div>
                            <span class="v39-chart-lbl">Nén chuỗi GOP</span>
                        </div>
                    </div>

                    <!-- Bottom feedback label -->
                    <div style="font-size: 15px; font-family: monospace; color: var(--compress-green); font-weight: bold; text-align: center;" class="v39-save-status">
                        Dung lượng giảm 99.9% -> Gọi mượt 4G/5G!
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
        if (slideId === 'slide_v39_1') {
            const titleEl = canvas.querySelector('#v39-intro-label');
            const badgeEl = canvas.querySelector('.v39-intro-badge');
            if (titleEl && slide.title && titleEl.innerHTML !== slide.title) {
                titleEl.innerHTML = slide.title;
            }
            if (badgeEl && slide.subtitle) {
                const newBadgeHTML = `<i data-lucide="video" style="width:14px;height:14px;"></i> ${slide.subtitle}`;
                if (badgeEl.innerHTML !== newBadgeHTML) {
                    badgeEl.innerHTML = newBadgeHTML;
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons({ node: badgeEl });
                    }
                }
            }
        }
        else if (slideId === 'slide_v39_2') {
            const statusEl = canvas.querySelector('.v39-redun-status');
            const progBar = canvas.querySelector('.v39-redun-progress');
            const staticPctEl = canvas.querySelector('.v39-redun-static-pct');
            const actionEl = canvas.querySelector('.v39-redun-action');

            if (progBar) progBar.style.width = `${progress * 100}%`;

            // Animate grid pixels based on progress
            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-redun-px-${i}`);
                if (!pixel) continue;

                const isFace = faceIndices.includes(i);
                const isMouth = mouthIndices.includes(i);

                if (progress < 0.35) {
                    // Phase 1: Normal Camera feed scanning
                    if (isFace) {
                        pixel.className = 'v39-pixel active-face';
                    } else {
                        pixel.className = 'v39-pixel';
                        pixel.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    }
                    pixel.style.opacity = '1';
                } else if (progress >= 0.35 && progress < 0.7) {
                    // Phase 2: Static background detection
                    if (isFace) {
                        pixel.className = 'v39-pixel active-face';
                        pixel.style.opacity = '1';
                    } else {
                        // Background pixels dim out to show they are static
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.backgroundColor = 'rgba(255,255,255,0.02)';
                        pixel.style.opacity = '0.2';
                    }
                } else {
                    // Phase 3: Only face/mouth moving
                    if (isMouth) {
                        // Mouth coordinates pulse
                        const pulse = Math.sin(progress * 40) > 0;
                        pixel.className = pulse ? 'v39-pixel active-mouth' : 'v39-pixel active-face';
                    } else if (isFace) {
                        pixel.className = 'v39-pixel active-face';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.1';
                    }
                }
            }

            // Update panel text
            if (progress < 0.35) {
                if (statusEl) statusEl.textContent = 'Đang nhận diện hậu cảnh...';
                if (staticPctEl) staticPctEl.textContent = 'Hậu cảnh tĩnh: Hết';
                if (actionEl) actionEl.textContent = 'Bỏ qua truyền: 0%';
            } else if (progress >= 0.35 && progress < 0.7) {
                if (statusEl) statusEl.textContent = 'Phát hiện hậu cảnh đứng yên!';
                if (staticPctEl) staticPctEl.textContent = 'Hậu cảnh tĩnh: 80%';
                if (actionEl) actionEl.textContent = 'Bỏ qua truyền: 80% ✅';
            } else {
                if (statusEl) statusEl.textContent = 'Chỉ gửi pixel thay đổi (Khuôn mặt)';
                if (staticPctEl) staticPctEl.textContent = 'Hậu cảnh tĩnh: Đã khóa';
                if (actionEl) actionEl.textContent = 'Dung lượng giảm 80%';
            }
        }
        else if (slideId === 'slide_v39_3') {
            const sizeEl = canvas.querySelector('.v39-iframe-size');
            const descEl = canvas.querySelector('.v39-iframe-desc');
            const scanner = canvas.querySelector('.v39-laser-scanner');

            if (scanner) {
                // Link scanner vertical offset to progress
                scanner.style.top = `${progress * 100}%`;
                scanner.style.opacity = progress > 0.95 ? '0' : '1';
            }

            // Animate grid pixels scanning line-by-line
            const totalLines = 8;
            const currentLine = Math.floor(progress * totalLines);

            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-iframe-px-${i}`);
                if (!pixel) continue;

                const pixelLine = Math.floor(i / 8);
                if (pixelLine <= currentLine) {
                    pixel.className = 'v39-pixel iframe-full';
                } else {
                    pixel.className = 'v39-pixel';
                    pixel.style.backgroundColor = 'rgba(255,255,255,0.02)';
                }
            }

            // Update stats
            if (progress < 0.4) {
                if (sizeEl) sizeEl.textContent = 'Đang quét...';
                if (descEl) descEl.textContent = 'Ghi nhận bức ảnh tĩnh gốc ban đầu...';
            } else if (progress >= 0.4 && progress < 0.8) {
                if (sizeEl) sizeEl.textContent = '100% dung lượng (Đầy đủ)';
                if (descEl) descEl.textContent = 'Khung I-Frame: Điểm mốc vững chắc!';
            } else {
                if (sizeEl) sizeEl.textContent = '100% (Mốc tham chiếu)';
                if (descEl) descEl.textContent = 'Đã lưu đệm. Đợi tính toán P-Frame...';
            }
        }
        else if (slideId === 'slide_v39_4') {
            const saveEl = canvas.querySelector('.v39-pframe-save');
            const txEl = canvas.querySelector('.v39-pframe-tx');
            const descEl = canvas.querySelector('.v39-pframe-desc');

            // Left Grid: I-Frame Reference (Keep fully lit always)
            for (let i = 0; i < 64; i++) {
                const refPixel = canvas.querySelector(`.v39-pframe-ref-px-${i}`);
                if (refPixel) {
                    refPixel.className = 'v39-pixel iframe-full';
                }
            }

            // Right Grid: P-Frame Delta
            for (let i = 0; i < 64; i++) {
                const deltaPixel = canvas.querySelector(`.v39-pframe-delta-px-${i}`);
                if (!deltaPixel) continue;

                const isMouth = mouthIndices.includes(i);
                
                if (progress < 0.4) {
                    // Calculating
                    deltaPixel.className = 'v39-pixel';
                    deltaPixel.style.backgroundColor = 'rgba(255,255,255,0.02)';
                } else {
                    // Show delta (only mouth/lips change)
                    if (isMouth) {
                        const pulse = Math.sin(progress * 30) > 0;
                        deltaPixel.className = pulse ? 'v39-pixel active-mouth' : 'v39-pixel bg-static';
                        deltaPixel.style.opacity = '1';
                    } else {
                        deltaPixel.className = 'v39-pixel bg-static';
                        deltaPixel.style.opacity = '0.05';
                    }
                }
            }

            // Text status updates
            if (progress < 0.4) {
                if (saveEl) saveEl.textContent = 'Đang so sánh hiệu...';
                if (txEl) txEl.textContent = 'Đang tính toán...';
                if (descEl) descEl.textContent = 'Phép trừ: Khung hiện tại - I-Frame tham chiếu';
            } else if (progress >= 0.4 && progress < 0.8) {
                if (saveEl) saveEl.textContent = 'Tiết kiệm ~90%';
                if (txEl) txEl.textContent = 'Chỉ gửi 2 pixel thay đổi';
                if (descEl) descEl.textContent = 'Loại bỏ hoàn toàn hậu cảnh đứng yên!';
            } else {
                if (saveEl) saveEl.textContent = 'Nén cực đại: Đạt 90%!';
                if (txEl) txEl.textContent = 'Mã hóa P-Frame thành công';
                if (descEl) descEl.textContent = 'P-Frame siêu nhẹ truyền tải cực nhanh!';
            }
        }
        else if (slideId === 'slide_v39_5') {
            const coordsEl = canvas.querySelector('.v39-vector-coords');
            const descEl = canvas.querySelector('.v39-vector-desc');
            const vectorLine = canvas.querySelector('.v39-vector-line');

            // Define block coordinates on grid.
            // Move block indices from original [27,28,35,36] to shifted [29,30,37,38]
            const originalBlock = [27, 28, 35, 36];
            const shiftedBlock = [29, 30, 37, 38];

            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-vec-px-${i}`);
                if (!pixel) continue;

                if (progress < 0.3) {
                    // Block sits at original position
                    if (originalBlock.includes(i)) {
                        pixel.className = 'v39-pixel active-face';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.1';
                    }
                } else if (progress >= 0.3 && progress < 0.7) {
                    // Showing search/motion transition
                    if (originalBlock.includes(i) || shiftedBlock.includes(i)) {
                        pixel.className = 'v39-pixel active-face';
                        pixel.style.opacity = '0.6';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.1';
                    }
                } else {
                    // Block is at shifted position
                    if (shiftedBlock.includes(i)) {
                        pixel.className = 'v39-pixel active-face';
                        pixel.style.opacity = '1';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.1';
                    }
                }
            }

            // Animate SVG vector arrow overlay (400x400 px container, 50px cell pitch)
            // Cell 27 center (col 3, row 3): x = 175, y = 175
            // Cell 29 center (col 5, row 3): x = 275, y = 175
            if (progress >= 0.5) {
                if (vectorLine) {
                    vectorLine.setAttribute('x1', '175');
                    vectorLine.setAttribute('y1', '175');
                    vectorLine.setAttribute('x2', '260'); // 275 - 15px ref for arrowhead
                    vectorLine.setAttribute('y2', '175');
                    vectorLine.style.opacity = '1';
                }
                if (coordsEl) coordsEl.textContent = '[dx: +2, dy: 0]';
                if (descEl) descEl.textContent = 'Gửi Vector chỉ hướng: Dịch chuyển ngang 2 ô!';
            } else {
                if (vectorLine) vectorLine.style.opacity = '0';
                if (coordsEl) coordsEl.textContent = '[dx: 0, dy: 0]';
                if (descEl) descEl.textContent = 'Đang tìm kiếm hướng di chuyển khối hình...';
            }
        }
        else if (slideId === 'slide_v39_6') {
            const refStateEl = canvas.querySelector('.v39-bf-ref-state');
            const descEl = canvas.querySelector('.v39-bf-desc');
            const arrowLeft = canvas.querySelector('.v39-bf-arrow-left');
            const arrowRight = canvas.querySelector('.v39-bf-arrow-right');

            // Render Past Reference (I-Frame: fully lit)
            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-bf-past-px-${i}`);
                if (pixel) pixel.className = 'v39-pixel iframe-full';
            }

            // Render Future Reference (P-Frame: mouth only)
            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-bf-fut-px-${i}`);
                if (pixel) {
                    if (mouthIndices.includes(i)) {
                        pixel.className = 'v39-pixel active-mouth';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.05';
                    }
                }
            }

            // Render B-Frame (Middle)
            for (let i = 0; i < 64; i++) {
                const pixel = canvas.querySelector(`.v39-bf-mid-px-${i}`);
                if (!pixel) continue;

                const isFace = faceIndices.includes(i);
                const isMouth = mouthIndices.includes(i);

                if (progress < 0.45) {
                    // Emphasize dependencies
                    pixel.className = 'v39-pixel';
                    pixel.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    if (arrowLeft) arrowLeft.style.opacity = '0.3';
                    if (arrowRight) arrowRight.style.opacity = '0.3';
                } else {
                    // Construct B-Frame dynamically
                    if (isMouth) {
                        pixel.className = 'v39-pixel active-mouth';
                    } else if (isFace) {
                        pixel.className = 'v39-pixel active-face';
                        pixel.style.opacity = '0.7';
                    } else {
                        pixel.className = 'v39-pixel bg-static';
                        pixel.style.opacity = '0.05';
                    }
                    if (arrowLeft) { arrowLeft.style.opacity = '1'; arrowLeft.style.transform = 'scale(1.1)'; }
                    if (arrowRight) { arrowRight.style.opacity = '1'; arrowRight.style.transform = 'scale(1.1)'; }
                }
            }

            // Texts
            if (progress < 0.45) {
                if (refStateEl) refStateEl.textContent = 'Đang tìm mốc tham chiếu...';
                if (descEl) descEl.textContent = 'Tham chiếu cả khung hình quá khứ và tương lai';
            } else {
                if (refStateEl) refStateEl.textContent = 'Tham chiếu kép thành công ✅';
                if (descEl) descEl.textContent = 'Điền điểm ảnh bị khuyết từ hai phía -> Cực mượt!';
            }
        }
        else if (slideId === 'slide_v39_7') {
            const strip = canvas.querySelector('.v39-gop-strip');
            const kbpsEl = canvas.querySelector('.v39-gop-kbps');
            const descEl = canvas.querySelector('.v39-gop-desc');

            // 1. Shift GOP conveyor belt (width 76px + 14px gap = 90px pitch)
            const shiftX = -270 * progress;
            if (strip) {
                strip.style.transform = `translateX(${shiftX}px)`;
            }

            const items = canvas.querySelectorAll('.v39-gop-item');
            items.forEach((item, index) => {
                const itemPos = 50 + index * 90 + shiftX;
                const isTransmitting = Math.abs(itemPos) < 45;

                if (isTransmitting) {
                    item.style.transform = 'scale(1.2)';
                    item.style.filter = 'brightness(1.25) drop-shadow(0 0 10px rgba(16,185,129,0.35))';
                } else {
                    item.style.transform = 'scale(1)';
                    item.style.filter = 'none';
                }
            });

            // 2. Animate Bandwidth Chart elements
            const barRaw = canvas.querySelector('#v39-bar-raw-el');
            const barMjpeg = canvas.querySelector('#v39-bar-mjpeg-el');
            const barGop = canvas.querySelector('#v39-bar-gop-el');

            const valRaw = canvas.querySelector('#v39-val-raw');
            const valMjpeg = canvas.querySelector('#v39-val-mjpeg');
            const valGop = canvas.querySelector('#v39-val-gop');

            const saveStatus = canvas.querySelector('.v39-save-status');

            // target height percentages
            const targetRawH = 85; 
            const targetMjpegH = 40;
            const targetGopH = 12;

            if (barRaw) barRaw.style.height = `${progress * targetRawH}%`;
            if (barMjpeg) barMjpeg.style.height = `${progress * targetMjpegH}%`;
            if (barGop) barGop.style.height = `${progress * targetGopH}%`;

            // Count-up calculations
            const rawValText = (progress * 3.0).toFixed(1) + ' Gbps';
            const mjpegValText = Math.floor(progress * 150) + ' Mbps';
            const gopValText = (progress * 3.0).toFixed(1) + ' Mbps';

            if (valRaw) valRaw.textContent = rawValText;
            if (valMjpeg) valMjpeg.textContent = mjpegValText;
            if (valGop) valGop.textContent = gopValText;

            // Highlight saving ratio dynamically
            if (progress > 0.75) {
                if (saveStatus) {
                    saveStatus.textContent = 'Dung lượng giảm 99.9% (Nén 1000 lần)!!! 🔥';
                    saveStatus.style.color = '#10b981';
                }
                if (barRaw) barRaw.style.animation = 'shakeAlert 1.5s infinite ease-in-out';
            } else {
                if (saveStatus) {
                    saveStatus.textContent = 'Đang so sánh băng thông truyền tải thực tế...';
                    saveStatus.style.color = 'rgba(255,255,255,0.4)';
                }
                if (barRaw) barRaw.style.animation = 'none';
            }

            // Text info updates
            if (progress < 0.4) {
                if (kbpsEl) kbpsEl.textContent = 'Đang so sánh luồng truyền tải...';
                if (descEl) descEl.textContent = 'Dữ liệu thô vs Nén MJPEG vs Nén chuỗi GOP...';
            } else if (progress >= 0.4 && progress < 0.8) {
                if (kbpsEl) kbpsEl.textContent = 'MJPEG cần 150 Mbps, GOP cần 3 Mbps!';
                if (descEl) descEl.textContent = 'Chuỗi GOP loại bỏ trùng lặp thời gian vượt trội!';
            } else {
                if (kbpsEl) kbpsEl.textContent = 'Nén chuỗi GOP: Đỉnh cao thiết kế!';
                if (descEl) descEl.textContent = 'Truyền mượt HD trên di động không trễ!';
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video39',
        topic: 'Digital Video Call Compression',
        episodeNum: 39,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video39 Plugin] Loaded: Digital Video Call Compression slides ready.');
})();
