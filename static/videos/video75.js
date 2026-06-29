/**
 * Video 75: Why memory comes in powers of 2 (64, 128, 256...)
 * Interactive simulation layout designed for mobile 9:16 screen (Supercharged Premium Animations).
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_mem_hook: [
            { text: 'dung lượng', start: 3.0, end: 6.5, class: 'active-cyan' },
            { text: 'không có 100GB', start: 8.0, end: 12.0, class: 'active-red' }
        ],
        slide_mem_math: [
            { text: 'lũy thừa của số 2', start: 3.5, end: 7.5, class: 'active-purple' },
            { text: '1 Terabyte', start: 9.0, end: 13.0, class: 'active-yellow' }
        ],
        slide_mem_binary: [
            { text: 'nhị phân', start: 3.5, end: 7.0, class: 'active-green' },
            { text: 'đường dẫn địa chỉ', start: 8.5, end: 12.0, class: 'active-yellow' }
        ],
        slide_mem_waste: [
            { text: 'lãng phí', start: 4.0, end: 7.5, class: 'active-red' },
            { text: 'tối ưu mạch điện', start: 8.5, end: 12.0, class: 'active-cyan' }
        ],
        slide_mem_provisioning: [
            { text: 'dự phòng', start: 3.5, end: 7.0, class: 'active-yellow' },
            { text: 'kéo dài tuổi thọ', start: 8.5, end: 12.0, class: 'active-green' }
        ],
        slide_mem_summary: [
            { text: 'tương thích nhị phân', start: 3.5, end: 7.5, class: 'active-cyan' },
            { text: 'vùng dự phòng', start: 8.0, end: 12.0, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_mem_hook',
        'slide_mem_math',
        'slide_mem_binary',
        'slide_mem_waste',
        'slide_mem_provisioning',
        'slide_mem_summary'
    ];

    function sceneWrap(inner) {
        return `<div class="v75-zoom-container"><div class="v75-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_mem_hook') {
            canvas.innerHTML = sceneWrap(`
                <div class="v75-cards-board">
                    <div class="v75-panel-header">
                        <span>PHYSICAL SSD CHIP MODULES</span>
                        <span style="color:var(--v75-cyan);">POWERS OF 2</span>
                    </div>

                    <div class="v75-cards-grid">
                        <div class="v75-card-box active-pow" id="v75-c-64">
                            <div class="v75-card-chip-core">SSD-64</div>
                            <span class="v75-card-num">64 GB</span>
                            <span class="v75-card-lbl">2^6 GIGABYTE</span>
                        </div>
                        <div class="v75-card-box active-pow" id="v75-c-128">
                            <div class="v75-card-chip-core">SSD-128</div>
                            <span class="v75-card-num">128 GB</span>
                            <span class="v75-card-lbl">2^7 GIGABYTE</span>
                        </div>
                        <div class="v75-card-box active-pow" id="v75-c-256">
                            <div class="v75-card-chip-core">SSD-256</div>
                            <span class="v75-card-num">256 GB</span>
                            <span class="v75-card-lbl">2^8 GIGABYTE</span>
                        </div>
                        <div class="v75-card-box card-target-err" id="v75-c-100" style="opacity: 1; transform: none;">
                            <div class="v75-cross-strike" id="v75-cross"></div>
                            <div class="v75-card-chip-core" style="border-color:rgba(239,68,68,0.3);">ERR-100</div>
                            <span class="v75-card-num" style="color:var(--v75-red);">100 GB</span>
                            <span class="v75-card-lbl" style="color:#ef4444;">NON-BINARY</span>
                        </div>
                    </div>

                    <!-- Cyber compatibility error tooltip -->
                    <div class="v75-error-tooltip" id="v75-hook-error">
                        ⚠️ LỖI: Không Tương Thích Kiến Trúc Nhị Phân!
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_mem_math') {
            canvas.innerHTML = sceneWrap(`
                <div class="v75-math-board">
                    <div class="v75-panel-header">
                        <span>BINARY MATH EQUATIONS</span>
                        <span style="color:var(--v75-purple);">POWERS OF 2</span>
                    </div>

                    <div class="v75-formula-list">
                        <!-- All equations visible, highlighted sequentially in updateFrame -->
                        <div class="v75-formula-item" id="v75-f-6"><span>2⁶</span> = <span>64 GB</span></div>
                        <div class="v75-formula-item" id="v75-f-7"><span>2⁷</span> = <span>128 GB</span></div>
                        <div class="v75-formula-item" id="v75-f-8"><span>2⁸</span> = <span>256 GB</span></div>
                        <div class="v75-formula-item" id="v75-f-9"><span>2⁹</span> = <span>512 GB</span></div>
                        <div class="v75-formula-item" id="v75-f-10"><span>2¹⁰</span> = <span>1024 GB (1 TB)</span></div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_mem_binary') {
            canvas.innerHTML = sceneWrap(`
                <div class="v75-binary-board">
                    <div class="v75-panel-header">
                        <span>ADDRESS DECODER BUS</span>
                        <span style="color:var(--v75-green);">BINARY LOGIC</span>
                    </div>

                    <div class="v75-binary-layout">
                        <!-- Left: 3 physical address line switches -->
                        <div class="v75-switches-col">
                            <div class="v75-switch-wrapper">
                                <span style="font-family:monospace; font-size:16px; font-weight:bold; color:#64748b;">LINE A2</span>
                                <div class="v75-switch-box" id="v75-sw-2"></div>
                            </div>
                            <div class="v75-switch-wrapper">
                                <span style="font-family:monospace; font-size:16px; font-weight:bold; color:#64748b;">LINE A1</span>
                                <div class="v75-switch-box" id="v75-sw-1"></div>
                            </div>
                            <div class="v75-switch-wrapper">
                                <span style="font-family:monospace; font-size:16px; font-weight:bold; color:#64748b;">LINE A0</span>
                                <div class="v75-switch-box" id="v75-sw-0"></div>
                            </div>
                        </div>

                        <!-- Middle: Central decoder logic chip -->
                        <div class="v75-decoder-center">
                            <div class="v75-decoder-chip" id="v75-dec-chip">
                                <span style="font-size:12px; color:#64748b; font-weight:bold;">DECODER</span>
                                <span style="font-size:28px; font-weight:900; color:var(--v75-green);" id="v75-dec-bin">000</span>
                            </div>
                        </div>

                        <!-- Right: 8 LED output memory nodes -->
                        <div class="v75-led-matrix">
                            <!-- Binary active tooltip -->
                            <div class="v75-decoded-bubble" id="v75-dec-val">DECODED: 0</div>

                            <div class="v75-led-node" id="v75-led-0">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 0 (000)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-1">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 1 (001)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-2">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 2 (010)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-3">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 3 (011)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-4">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 4 (100)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-5">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 5 (101)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-6">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 6 (110)</span>
                            </div>
                            <div class="v75-led-node" id="v75-led-7">
                                <div class="v75-led-bulb"></div>
                                <div class="v75-led-halo"></div>
                                <span>Cell 7 (111)</span>
                            </div>
                        </div>
                    </div>

                    <!-- SVG Connection wires with nested electron particles inside (100% immune to absolute layout offsets) -->
                    <svg class="v75-binary-svg" id="v75-binary-svg-canvas" width="800" height="750" viewBox="0 0 800 750">
                        <path class="v75-wire-line w-line-2" id="v75-wire-2" d="" />
                        <path class="v75-wire-line w-line-1" id="v75-wire-1" d="" />
                        <path class="v75-wire-line w-line-0" id="v75-wire-0" d="" />
                        <path class="v75-wire-line w-line-out" id="v75-wire-out" d="" style="stroke:var(--v75-yellow); stroke-width:5px; filter:drop-shadow(0 0 8px var(--v75-yellow)); opacity:0;" />
                        
                        <!-- Electron flow particles as SVG circles -->
                        <circle id="v75-elec-0" r="6" fill="#10b981" style="opacity: 0; filter: drop-shadow(0 0 8px #10b981);" />
                        <circle id="v75-elec-1" r="6" fill="#10b981" style="opacity: 0; filter: drop-shadow(0 0 8px #10b981);" />
                        <circle id="v75-elec-2" r="6" fill="#10b981" style="opacity: 0; filter: drop-shadow(0 0 8px #10b981);" />
                    </svg>
                </div>
            `);

            // Schedule immediate alignment checks to prevent cached or static 00:00 display mismatch
            setTimeout(function () {
                alignDecoderWires(canvas, 0, 0, 0, 0);
            }, 60);
            setTimeout(function () {
                alignDecoderWires(canvas, 0, 0, 0, 0);
            }, 300);
        }
        else if (slideId === 'slide_mem_waste') {
            let gridHtml = '';
            for (let i = 0; i < 128; i++) {
                gridHtml += `<div class="v75-grid-cell" id="v75-cell-${i}"></div>`;
            }
            canvas.innerHTML = sceneWrap(`
                <div class="v75-wasted-board">
                    <div class="v75-panel-header">
                        <span>128-CELL HARDWARE DECODER GRID</span>
                        <span style="color:var(--v75-red);" id="v75-waste-hdr">USABLE CAP: 100/128</span>
                    </div>

                    <div class="v75-cell-grid">
                        ${gridHtml}
                    </div>

                    <!-- Wasted overlay label -->
                    <div class="v75-wasted-overlay" id="v75-wasted-lbl">
                        ⚠️ WASTED SPACE<br>
                        28 CELLS (22%) UNUSED
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_mem_provisioning') {
            canvas.innerHTML = sceneWrap(`
                <div class="v75-prov-board">
                    <div class="v75-panel-header">
                        <span>PHYSICAL STORAGE PARTITIONING</span>
                        <span style="color:var(--v75-yellow);">128 GB PHYSICAL</span>
                    </div>

                    <div class="v75-chip-container">
                        <!-- Usable partition -->
                        <div class="v75-partition part-usable" id="v75-part-u">
                            <span class="v75-partition-lbl" id="v75-lbl-u">128 GB</span>
                            <span class="v75-partition-desc" id="v75-desc-u">User Data Space</span>
                            <div class="v75-barrier-laser" id="v75-laser-line"></div>
                        </div>

                        <!-- Spare / reserved partition -->
                        <div class="v75-partition part-spare" id="v75-part-s">
                            <span class="v75-partition-lbl" style="color:var(--v75-red);">8 GB</span>
                            <span class="v75-partition-desc" style="color:rgba(255,255,255,0.4);">Spare Block</span>
                            <div class="v75-shield-icon" id="v75-prov-shield">🛡️
                                <!-- Floating repair symbols inside shield -->
                                <div class="v75-repair-sparkle" id="v75-spark-1" style="top:-30px; left:-20px;">⚙️</div>
                                <div class="v75-repair-sparkle" id="v75-spark-2" style="top:-40px; right:-20px; animation-delay:0.3s;">🔧</div>
                                <div class="v75-repair-sparkle" id="v75-spark-3" style="bottom:-20px; left:20px; animation-delay:0.6s;">⚡</div>
                            </div>
                        </div>
                    </div>

                    <div style="font-size:16px; color:#64748b; line-height:1.5; text-align:center;">
                        SSD Controller sử dụng vùng dự phòng (Over-provisioning) để cân bằng hao mòn tế bào nhớ.
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_mem_summary') {
            canvas.innerHTML = sceneWrap(`
                <div class="v75-summary-container">
                    <div class="v75-summary-card" id="v75-sum-1">
                        <div class="v75-sum-icon">🔌</div>
                        <div class="v75-sum-info">
                            <div class="v75-sum-title">Mạch Nhị Phân Lũy Thừa 2</div>
                            <div class="v75-sum-desc">Tối ưu hóa thiết kế dây dẫn vật lý và quản lý địa chỉ CPU nhị phân.</div>
                        </div>
                    </div>
                    <div class="v75-summary-card" id="v75-sum-2">
                        <div class="v75-sum-icon">🛡️</div>
                        <div class="v75-sum-info">
                            <div class="v75-sum-title">Vùng Dự Phòng SSD (OP)</div>
                            <div class="v75-sum-desc">Khu vực dự phòng khoảng 7% dung lượng giúp tự động thay thế các ô nhớ hỏng (bad sector), kéo dài tuổi thọ ổ cứng.</div>
                        </div>
                    </div>
                </div>
            `);
        }
    }

    // Helper to get element layout offset relative to a target parent (immune to CSS scale transforms)
    function getLayoutOffset(el, parent) {
        let x = 0;
        let y = 0;
        let curr = el;
        while (curr && curr !== parent) {
            x += curr.offsetLeft || 0;
            y += curr.offsetTop || 0;
            curr = curr.offsetParent;
        }
        return { x, y };
    }

    // ── FAIL-SAFE DYNAMIC WIRE ALIGNMENT ROUTINE ──────────────────────────────
    function alignDecoderWires(canvas, b0, b1, b2, state) {
        const board = canvas.querySelector('.v75-binary-board');
        if (!board) return;

        const dec = canvas.querySelector('#v75-dec-chip');
        if (!dec) return;

        const posDec = getLayoutOffset(dec, board);
        const decW = dec.offsetWidth;
        const decH = dec.offsetHeight;

        // 1. Connect Switch A0, A1, A2 to the Decoder left side
        const bits = [b0, b1, b2];
        for (let i = 0; i < 3; i++) {
            const sw = canvas.querySelector(`#v75-sw-${i}`);
            const wire = canvas.querySelector(`#v75-wire-${i}`);
            if (sw && wire) {
                const posSw = getLayoutOffset(sw, board);
                
                const x1 = posSw.x + sw.offsetWidth;
                const y1 = posSw.y + sw.offsetHeight / 2;
                
                const x2 = posDec.x;
                const y2 = posDec.y + (decH * (0.25 + i * 0.25));

                wire.setAttribute('d', `M ${x1},${y1} C ${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`);
                wire.setAttribute('class', `v75-wire-line w-line-${i} ${bits[i] ? 'wire-active' : ''}`);
            }
        }

        // 2. Connect Decoder right side to the active LED node
        const activeLed = canvas.querySelector(`.v75-led-node.led-active`);
        const outWire = canvas.querySelector('#v75-wire-out');
        if (activeLed && outWire) {
            const posLed = getLayoutOffset(activeLed, board);

            const x1 = posDec.x + decW;
            const y1 = posDec.y + decH / 2;
            const x2 = posLed.x;
            const y2 = posLed.y + activeLed.offsetHeight / 2;

            outWire.setAttribute('d', `M ${x1},${y1} C ${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`);
            outWire.style.opacity = '1';
        } else if (outWire) {
            outWire.style.opacity = '0';
        }
    }

    // Static pre-calculated output paths from Decoder right edge (X=430, Y=285) to LED Left edge
    const outPaths = [
        "M 430,285 C 460,285 460,124 490,124", // Cell 0
        "M 430,285 C 500,285 500,124 618,124", // Cell 1
        "M 430,285 C 460,285 460,192 490,192", // Cell 2
        "M 430,285 C 500,285 500,192 618,192", // Cell 3
        "M 430,285 C 460,285 460,260 490,260", // Cell 4
        "M 430,285 C 500,285 500,260 618,260", // Cell 5
        "M 430,285 C 460,285 460,328 490,328", // Cell 6
        "M 430,285 C 500,285 500,328 618,328"  // Cell 7
    ];

    // ── UPDATE FRAME ANIMATION LOOP ────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_mem_hook') {
            const card64 = canvas.querySelector('#v75-c-64');
            const card128 = canvas.querySelector('#v75-c-128');
            const card256 = canvas.querySelector('#v75-c-256');
            const card100 = canvas.querySelector('#v75-c-100');
            const cross = canvas.querySelector('#v75-cross');
            const errTooltip = canvas.querySelector('#v75-hook-error');

            if (progress < 0.05) {
                // Focus: 64GB only
                if (card64) { card64.classList.remove('focus-off'); card64.style.transform = 'none'; }
                if (card128) { card128.classList.add('focus-off'); card128.style.transform = 'none'; }
                if (card256) { card256.classList.add('focus-off'); card256.style.transform = 'none'; }
                if (card100) { card100.classList.add('focus-off'); card100.style.transform = 'none'; card100.classList.remove('err-active'); }
                if (cross) cross.style.opacity = '0';
                if (errTooltip) errTooltip.classList.remove('show-err');
            }
            else if (progress >= 0.05 && progress < 0.10) {
                // Focus: 64GB and 128GB
                if (card64) { card64.classList.remove('focus-off'); card64.style.transform = 'none'; }
                if (card128) { card128.classList.remove('focus-off'); card128.style.transform = 'none'; }
                if (card256) { card256.classList.add('focus-off'); card256.style.transform = 'none'; }
                if (card100) { card100.classList.add('focus-off'); card100.style.transform = 'none'; card100.classList.remove('err-active'); }
                if (cross) cross.style.opacity = '0';
                if (errTooltip) errTooltip.classList.remove('show-err');
            }
            else if (progress >= 0.10 && progress < 0.15) {
                // Focus: 64GB, 128GB and 256GB
                if (card64) { card64.classList.remove('focus-off'); card64.style.transform = 'none'; }
                if (card128) { card128.classList.remove('focus-off'); card128.style.transform = 'none'; }
                if (card256) { card256.classList.remove('focus-off'); card256.style.transform = 'none'; }
                if (card100) { card100.classList.add('focus-off'); card100.style.transform = 'none'; card100.classList.remove('err-active'); }
                if (cross) cross.style.opacity = '0';
                if (errTooltip) errTooltip.classList.remove('show-err');
            }
            else {
                // Focus: All, with 100GB in error state
                if (card64) { card64.classList.remove('focus-off'); card64.style.transform = 'none'; }
                if (card128) { card128.classList.remove('focus-off'); card128.style.transform = 'none'; }
                if (card256) { card256.classList.remove('focus-off'); card256.style.transform = 'none'; }
                
                if (card100) {
                    card100.classList.remove('focus-off');
                    card100.classList.add('err-active');
                    if (cross) cross.style.opacity = '1';
                    if (errTooltip) errTooltip.classList.add('show-err');
                    
                    const shake = (Math.floor(progress * 45) % 2 === 0) ? -5 : 5;
                    card100.style.transform = `translateX(${shake}px)`;
                }
            }
        }
        else if (slideId === 'slide_mem_math') {
            const f6 = canvas.querySelector('#v75-f-6');
            const f7 = canvas.querySelector('#v75-f-7');
            const f8 = canvas.querySelector('#v75-f-8');
            const f9 = canvas.querySelector('#v75-f-9');
            const f10 = canvas.querySelector('#v75-f-10');

            if (progress < 0.33) {
                // Focus: 2^6 only (before "2^6 = 64" is spoken)
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.add('focus-off'); f7.classList.remove('active-formula'); }
                if (f8) { f8.classList.add('focus-off'); f8.classList.remove('active-formula'); }
                if (f9) { f9.classList.add('focus-off'); f9.classList.remove('active-formula'); }
                if (f10) { f10.classList.add('focus-off'); f10.classList.remove('active-formula'); }
            }
            else if (progress >= 0.33 && progress < 0.45) {
                // Focus: 2^6 and 2^7 (narrator says "2^7 = 128")
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.remove('focus-off'); f7.classList.add('active-formula'); }
                if (f8) { f8.classList.add('focus-off'); f8.classList.remove('active-formula'); }
                if (f9) { f9.classList.add('focus-off'); f9.classList.remove('active-formula'); }
                if (f10) { f10.classList.add('focus-off'); f10.classList.remove('active-formula'); }
            }
            else if (progress >= 0.45 && progress < 0.57) {
                // Focus: 2^6, 2^7 and 2^8 (narrator says "2^8 = 256")
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.remove('focus-off'); f7.classList.add('active-formula'); }
                if (f8) { f8.classList.remove('focus-off'); f8.classList.add('active-formula'); }
                if (f9) { f9.classList.add('focus-off'); f9.classList.remove('active-formula'); }
                if (f10) { f10.classList.add('focus-off'); f10.classList.remove('active-formula'); }
            }
            else if (progress >= 0.57 && progress < 0.69) {
                // Focus: 2^6, 2^7, 2^8 and 2^9 (narrator says "2^9 = 512")
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.remove('focus-off'); f7.classList.add('active-formula'); }
                if (f8) { f8.classList.remove('focus-off'); f8.classList.add('active-formula'); }
                if (f9) { f9.classList.remove('focus-off'); f9.classList.add('active-formula'); }
                if (f10) { f10.classList.add('focus-off'); f10.classList.remove('active-formula'); }
            }
            else if (progress >= 0.69 && progress < 0.81) {
                // Focus: 2^6, 2^7, 2^8, 2^9 and 2^10 (narrator says "2^10 = 1024")
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.remove('focus-off'); f7.classList.add('active-formula'); }
                if (f8) { f8.classList.remove('focus-off'); f8.classList.add('active-formula'); }
                if (f9) { f9.classList.remove('focus-off'); f9.classList.add('active-formula'); }
                if (f10) { f10.classList.remove('focus-off'); f10.classList.add('active-formula'); }
            }
            else {
                // Focus: All active (after "1TB" is spoken)
                if (f6) { f6.classList.remove('focus-off'); f6.classList.add('active-formula'); }
                if (f7) { f7.classList.remove('focus-off'); f7.classList.add('active-formula'); }
                if (f8) { f8.classList.remove('focus-off'); f8.classList.add('active-formula'); }
                if (f9) { f9.classList.remove('focus-off'); f9.classList.add('active-formula'); }
                if (f10) { f10.classList.remove('focus-off'); f10.classList.add('active-formula'); }
            }
        }
        else if (slideId === 'slide_mem_binary') {
            const sw0 = canvas.querySelector('#v75-sw-0');
            const sw1 = canvas.querySelector('#v75-sw-1');
            const sw2 = canvas.querySelector('#v75-sw-2');
            const decBin = canvas.querySelector('#v75-dec-bin');
            const decVal = canvas.querySelector('#v75-dec-val');
            
            const state = Math.min(7, Math.floor(Math.min(1.0, progress / 0.25) * 8));
            
            const b0 = state & 1;
            const b1 = (state >> 1) & 1;
            const b2 = (state >> 2) & 1;

            if (sw0) sw0.className = `v75-switch-box ${b0 ? 'switch-on' : ''}`;
            if (sw1) sw1.className = `v75-switch-box ${b1 ? 'switch-on' : ''}`;
            if (sw2) sw2.className = `v75-switch-box ${b2 ? 'switch-on' : ''}`;

            for (let i = 0; i < 8; i++) {
                const led = canvas.querySelector(`#v75-led-${i}`);
                if (led) {
                    if (i === state) {
                        led.classList.add('led-active');
                    } else {
                        led.classList.remove('led-active');
                    }
                }
            }

            // Align wires dynamically relative to the SVG container coordinates
            alignDecoderWires(canvas, b0, b1, b2, state);

            if (decBin) {
                decBin.textContent = `${b2}${b1}${b0}`;
            }

            const e0 = canvas.querySelector('#v75-elec-0');
            const e1 = canvas.querySelector('#v75-elec-1');
            const e2 = canvas.querySelector('#v75-elec-2');

            const wire0 = canvas.querySelector('#v75-wire-0');
            const wire1 = canvas.querySelector('#v75-wire-1');
            const wire2 = canvas.querySelector('#v75-wire-2');

            // Wire A0 particle flow
            try {
                if (e0 && wire0 && b0 && wire0.getAttribute('d')) {
                    e0.style.opacity = '1';
                    const pathLen = wire0.getTotalLength ? wire0.getTotalLength() : 200;
                    const run = (progress * 18) % 1.0;
                    if (wire0.getPointAtLength && pathLen > 0) {
                        const pt = wire0.getPointAtLength(run * pathLen);
                        e0.setAttribute('cx', pt.x);
                        e0.setAttribute('cy', pt.y);
                    }
                } else if (e0) {
                    e0.style.opacity = '0';
                }
            } catch (err) {
                if (e0) e0.style.opacity = '0';
            }

            // Wire A1 particle flow
            try {
                if (e1 && wire1 && b1 && wire1.getAttribute('d')) {
                    e1.style.opacity = '1';
                    const pathLen = wire1.getTotalLength ? wire1.getTotalLength() : 200;
                    const run = (progress * 18) % 1.0;
                    if (wire1.getPointAtLength && pathLen > 0) {
                        const pt = wire1.getPointAtLength(run * pathLen);
                        e1.setAttribute('cx', pt.x);
                        e1.setAttribute('cy', pt.y);
                    }
                } else if (e1) {
                    e1.style.opacity = '0';
                }
            } catch (err) {
                if (e1) e1.style.opacity = '0';
            }

            // Wire A2 particle flow
            try {
                if (e2 && wire2 && b2 && wire2.getAttribute('d')) {
                    e2.style.opacity = '1';
                    const pathLen = wire2.getTotalLength ? wire2.getTotalLength() : 200;
                    const run = (progress * 18) % 1.0;
                    if (wire2.getPointAtLength && pathLen > 0) {
                        const pt = wire2.getPointAtLength(run * pathLen);
                        e2.setAttribute('cx', pt.x);
                        e2.setAttribute('cy', pt.y);
                    }
                } else if (e2) {
                    e2.style.opacity = '0';
                }
            } catch (err) {
                if (e2) e2.style.opacity = '0';
            }

            if (decVal) {
                decVal.classList.add('show-dec');
                decVal.textContent = `DECODED: CELL ${state} (${b2}${b1}${b0})`;
            }
        }
        else if (slideId === 'slide_mem_waste') {
            const overlay = canvas.querySelector('#v75-wasted-lbl');
            const wasteHdr = canvas.querySelector('#v75-waste-hdr');

            const filledCount = Math.min(100, Math.floor(Math.min(1.0, progress / 0.12) * 100));

            for (let i = 0; i < 128; i++) {
                const cell = canvas.querySelector(`#v75-cell-${i}`);
                if (cell) {
                    if (i < filledCount) {
                        cell.className = 'v75-grid-cell cell-usable';
                    } else if (progress >= 0.15 && i >= 100) {
                        cell.className = 'v75-grid-cell cell-wasted';
                    } else {
                        cell.className = 'v75-grid-cell';
                    }
                }
            }

            if (progress >= 0.15) {
                if (overlay) {
                    overlay.classList.add('show');
                    const shake = (Math.floor(progress * 40) % 2 === 0) ? -2 : 2;
                    overlay.style.transform = `translate(calc(-50% + ${shake}px), calc(-50% + ${shake}px)) scale(1)`;
                }
                if (wasteHdr) {
                    wasteHdr.textContent = 'WASTED: 28 CELLS UNUSED!';
                    wasteHdr.style.color = 'var(--v75-red)';
                }
            } else {
                if (overlay) overlay.classList.remove('show');
                if (wasteHdr) {
                    wasteHdr.textContent = `USABLE CAP: ${filledCount}/128`;
                    wasteHdr.style.color = 'var(--v75-cyan)';
                }
            }
        }
        else if (slideId === 'slide_mem_provisioning') {
            const partU = canvas.querySelector('#v75-part-u');
            const partS = canvas.querySelector('#v75-part-s');
            const lblU = canvas.querySelector('#v75-lbl-u');
            const descU = canvas.querySelector('#v75-desc-u');
            const laser = canvas.querySelector('#v75-laser-line');
            const shield = canvas.querySelector('#v75-prov-shield');
            const sparks = canvas.querySelectorAll('.v75-repair-sparkle');

            if (progress < 0.15) {
                if (partU) partU.style.width = '100%';
                if (partS) partS.style.width = '0%';
                if (lblU) lblU.textContent = '128 GB';
                if (descU) descU.textContent = 'User Data Space';
                if (laser) laser.classList.remove('show');
                if (shield) {
                    shield.style.opacity = '0';
                    shield.style.transform = 'scale(0.6)';
                }
                sparks.forEach(s => s.style.opacity = '0');
            }
            else if (progress >= 0.15 && progress < 0.35) {
                if (partU) partU.style.width = '80%';
                if (partS) partS.style.width = '20%';
                if (lblU) lblU.textContent = '120 GB';
                if (descU) descU.textContent = 'Usable Partition';
                if (laser) laser.classList.add('show');
                if (shield) {
                    shield.style.opacity = '0';
                    shield.style.transform = 'scale(0.6)';
                }
                sparks.forEach(s => s.style.opacity = '0');
            }
            else {
                if (partU) partU.style.width = '80%';
                if (partS) partS.style.width = '20%';
                if (lblU) lblU.textContent = '120 GB';
                if (descU) descU.textContent = 'Usable Partition';
                if (laser) laser.classList.add('show');
                
                if (shield) {
                    shield.style.opacity = '1';
                    const pulse = 1.0 + Math.sin(progress * Math.PI * 10) * 0.08;
                    shield.style.transform = `scale(${pulse})`;
                }
                
                sparks.forEach((s, idx) => {
                    s.style.opacity = '1';
                    const floatRun = ((progress - 0.35) * 8 + idx * 0.3) % 1.0;
                    s.style.transform = `translateY(${-floatRun * 60}px) scale(${0.8 + (1 - floatRun) * 0.4})`;
                    s.style.opacity = 1 - floatRun;
                });
            }
        }
        else if (slideId === 'slide_mem_summary') {
            const card1 = canvas.querySelector('#v75-sum-1');
            const card2 = canvas.querySelector('#v75-sum-2');
            if (progress < 0.25) {
                // Focus: Card 1 only
                if (card1) {
                    card1.classList.remove('focus-off');
                    card1.classList.add('active-sum');
                }
                if (card2) {
                    card2.classList.add('focus-off');
                    card2.classList.remove('active-sum');
                }
            } else {
                // Focus: Both Card 1 and Card 2 active
                if (card1) {
                    card1.classList.remove('focus-off');
                    card1.classList.add('active-sum');
                }
                if (card2) {
                    card2.classList.remove('focus-off');
                    card2.classList.add('active-sum');
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video75',
        topic: 'Tại Sao Bộ Nhớ Lũy Thừa 2',
        episodeNum: 75,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video75 Plugin] Loaded: Memory Powers of 2 simulator.');
})();
