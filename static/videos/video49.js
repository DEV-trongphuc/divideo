/**
 * Video 49: Google's HyperLogLog++ Algorithm
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video49
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Note: keywords match words spoken in the voice script (which contains 'cộng cộng')
    const keywordsData = {
        slide_hll_1: [
            { text: 'hyperloglog cộng cộng', start: 10.0, end: 16.0, class: 'active-good' },
            { text: 'mười hai kilobyte', start: 16.0, end: 21.0, class: 'active-cyan' }
        ],
        slide_hll_2: [
            { text: 'hashset', start: 3.5, end: 8.5, class: 'active-bad' },
            { text: 'ngốn sạch', start: 8.5, end: 13.5, class: 'active-bad' },
            { text: 'mười hai kilobyte', start: 16.5, end: 21.0, class: 'active-good' }
        ],
        slide_hll_3: [
            { text: 'xác suất', start: 2.0, end: 7.0, class: 'active-good' },
            { text: 'đồng xu', start: 7.0, end: 12.0, class: 'active-cyan' },
            { text: 'nhị phân', start: 12.0, end: 17.0, class: 'active-good' }
        ],
        slide_hll_4: [
            { text: 'google', start: 1.0, end: 5.0, class: 'active-cyan' },
            { text: 'sparse', start: 5.0, end: 12.0, class: 'active-good' },
            { text: 'dense', start: 12.0, end: 19.0, class: 'active-cyan' }
        ],
        slide_hll_5: [
            { text: 'google', start: 5.0, end: 10.0, class: 'active-good' },
            { text: 'hiệu chuẩn', start: 10.0, end: 15.0, class: 'active-cyan' },
            { text: 'một phần trăm', start: 15.0, end: 21.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_hll_1',
        'slide_hll_2',
        'slide_hll_3',
        'slide_hll_4',
        'slide_hll_5'
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_hll_1') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg cyan-tint"></div>
                    <div class="v49-intro-container">
                        <!-- Spinning Cosmic Rings -->
                        <div class="v49-glow-ring outer"></div>
                        <div class="v49-glow-ring inner"></div>
                        
                        <!-- Google BigQuery Logo Center Hook -->
                        <img src="https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg" class="v49-bigquery-logo-hook" alt="Google BigQuery">
                        
                        <!-- View Counter Box -->
                        <div class="v49-counter-box">
                            <div class="v49-counter-badge">
                                <i data-lucide="eye"></i> <span>LIVE TRAFFIC MONITOR</span>
                            </div>
                            <div class="v49-counter-value" id="s1-view-count">982,590,483</div>
                            <div class="v49-counter-ram">BỘ NHỚ: <span class="v49-ram-val">12 KB</span> (CỐ ĐỊNH)</div>
                        </div>
                    </div>

                    <!-- Slide Hook Info Card -->
                    <div class="glass-card v49-hook-card">
                        <div class="v49-hook-badge">
                            <i data-lucide="zap"></i> Google HyperLogLog++
                        </div>
                        <div class="v49-hook-title">
                            Đếm 1 Tỷ Lượt Xem chỉ bằng 12KB RAM với<br>thuật toán HyperLogLog++
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_2') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg split-tint"></div>
                    <div class="v49-compare-layout">
                        <!-- Left: HashSet (Bad) -->
                        <div class="v49-compare-card bad" id="s2-hashset-card">
                            <div class="v49-card-header">
                                <i data-lucide="database"></i>
                                <span>HASHSET (BẢNG BĂM)</span>
                            </div>
                            <div class="v49-card-stat">
                                <div class="label">BỘ NHỚ TIÊU THỤ</div>
                                <div class="value text-red" id="s2-hs-mem">1.2 GB</div>
                            </div>
                            <div class="v49-card-stat">
                                <div class="label">ĐỘ CHÍNH XÁC</div>
                                <div class="value text-green">100% (Tuyệt đối)</div>
                            </div>
                            <div class="v49-progress-wrapper">
                                <div class="v49-progress-bar bad" id="s2-hs-bar" style="width: 15%"></div>
                            </div>
                            <div class="v49-status-badge bad" id="s2-hs-badge" style="display:none">
                                <i data-lucide="alert-octagon"></i> OVERLOAD CRITICAL
                            </div>
                            <!-- Piling data logs stack container -->
                            <div class="v49-chip-stack" id="s2-hs-stack" style="position: relative; width: 100%; height: 160px; margin-top: 10px; border-radius: 12px; background: rgba(0, 0, 0, 0.25); border: 1px dashed rgba(239, 68, 68, 0.2); overflow: hidden;"></div>
                        </div>

                        <!-- Right: HLL++ (Good) -->
                        <div class="v49-compare-card good" id="s2-hll-card">
                            <div class="v49-card-header">
                                <i data-lucide="cpu"></i>
                                <span>HYPERLOGLOG++</span>
                            </div>
                            <div class="v49-card-stat">
                                <div class="label">BỘ NHỚ TIÊU THỤ</div>
                                <div class="value text-green">12 KB (Cố định)</div>
                            </div>
                            <div class="v49-card-stat">
                                <div class="label">ĐỘ CHÍNH XÁC</div>
                                <div class="value text-cyan" id="s2-hll-err">Sai số: ~1.04%</div>
                            </div>
                            <div class="v49-progress-wrapper">
                                <div class="v49-progress-bar good" id="s2-hll-bar" style="width: 100%"></div>
                            </div>
                            
                            <!-- Mini Register Grid for 12KB RAM Visual representation -->
                            <div class="v49-mini-grid-container">
                                <div class="v49-mini-grid-header">12KB Register Array (m = 1024)</div>
                                <div class="v49-mini-grid" id="s2-hll-mini-grid"></div>
                            </div>

                            <div class="v49-status-badge good">
                                <i data-lucide="shield-check"></i> STABLE RUNTIME
                            </div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_3') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg purple-tint"></div>
                    <div class="v49-probability-layout">
                        <!-- Left: Coin Flip Card -->
                        <div class="v49-coin-card">
                            <div class="v49-coin-3d-wrapper">
                                <div class="v49-coin-3d" id="s3-coin">
                                    <div class="v49-coin-face front">🪙 NGỬA</div>
                                    <div class="v49-coin-face back">🪙 XẤP</div>
                                </div>
                            </div>
                            <div class="v49-coin-label" id="s3-coin-label">Tung đồng xu...</div>
                            <div class="v49-flip-history" id="s3-flip-history"></div>
                        </div>

                        <!-- Right: Binary Hash Highlight -->
                        <div class="v49-hash-card">
                            <div class="v49-hash-header">
                                <span>Dữ liệu đầu vào</span>
                                <i data-lucide="arrow-right"></i>
                                <span>Chuỗi nhị phân (Hash)</span>
                            </div>
                            <div class="v49-input-box" id="s3-input-val">user_id: 847927</div>
                            <div class="v49-binary-box" id="s3-binary-bits"></div>
                            <div class="v49-explanation" id="s3-explanation">
                                <span>Số lượng số 0 đầu liên tiếp: </span><strong class="text-purple" id="s3-zero-count">0</strong>
                                <br>
                                <span>Ước lượng tập hợp: </span><strong class="text-gold" id="s3-est-val">2^0 = 1 phần tử</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_4') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg orange-tint"></div>
                    <div class="v49-morph-container">
                        <!-- Sparse Representation -->
                        <div class="v49-sparse-capsule" id="s4-sparse-capsule">
                            <div class="v49-capsule-header">
                                <i data-lucide="file-archive"></i>
                                <span>SPARSE REPRESENTATION (Tập hợp nhỏ)</span>
                            </div>
                            <div class="v49-sparse-list">
                                <div class="v49-sparse-item"><span>Chỉ mục 12</span> <span class="v49-arrow">➜</span> <span>Giá trị 4</span></div>
                                <div class="v49-sparse-item"><span>Chỉ mục 28</span> <span class="v49-arrow">➜</span> <span>Giá trị 2</span></div>
                                <div class="v49-sparse-item"><span>Chỉ mục 55</span> <span class="v49-arrow">➜</span> <span>Giá trị 6</span></div>
                            </div>
                            <div class="v49-capsule-footer">Lưu khóa-giá trị, nén dung lượng cực hạn</div>
                        </div>

                        <!-- Dense Representation -->
                        <div class="v49-dense-grid-card" id="s4-dense-card" style="display: none; opacity: 0; transform: scale(0.95);">
                            <div class="v49-dense-header">
                                <i data-lucide="grid"></i>
                                <span>DENSE REPRESENTATION (Tập hợp lớn)</span>
                            </div>
                            <div class="v49-register-grid" id="s4-register-grid"></div>
                            <div class="v49-dense-footer">64 thanh ghi cố định (m = 64), truy cập trực tiếp</div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_5') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg calibration-tint"></div>
                    <div class="v49-calibration-layout">
                        <!-- Chart SVG -->
                        <div class="v49-chart-container">
                            <svg class="v49-svg-chart" viewBox="0 0 400 250">
                                <!-- Grid Lines -->
                                <line x1="50" y1="20" x2="50" y2="220" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
                                <line x1="50" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
                                
                                <!-- Uncalibrated Skewed Curve -->
                                <path d="M 50 220 C 150 180, 220 160, 380 70" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" opacity="0.6"/>
                                
                                <!-- Calibrated Target Curve -->
                                <path id="s5-curve-path" d="M 50 220 C 120 210, 200 170, 380 120" fill="none" stroke="#10b981" stroke-width="3"/>
                                
                                <!-- Calibration cursor pointer -->
                                <circle id="s5-chart-cursor" cx="50" cy="220" r="6" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)"/>
                            </svg>
                            <div class="v49-chart-labels">
                                <span class="x-label">Độ lớn tập hợp thực tế</span>
                                <span class="y-label">Ước lượng thô vs. Hiệu chuẩn Google</span>
                            </div>
                        </div>

                        <!-- Readout dashboard -->
                        <div class="v49-readout-dashboard">
                            <div class="v49-readout-item">
                                <span class="label">ƯỚC LƯỢNG THÔ (HLL)</span>
                                <span class="value text-red" id="s5-val-raw">0</span>
                            </div>
                            <div class="v49-readout-item">
                                <span class="label">SAI SỐ HIỆU CHỈNH</span>
                                <span class="value text-gold" id="s5-val-bias">0%</span>
                            </div>
                            <div class="v49-readout-item highlight">
                                <span class="label">HIỆU CHUẨN GOOGLE (HLL++)</span>
                                <span class="value text-green" id="s5-val-calibrated">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
    }

    // ── TIMELINE ANIMATION ENGINE ──────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying, getSlideDuration, slide) {
        if (slideId === 'slide_hll_1') {
            const countEl = canvas.querySelector('#s1-view-count');
            if (countEl) {
                const count = Math.floor(982590483 + progress * (1000000000 - 982590483));
                countEl.textContent = count.toLocaleString('en-US');
            }
        }
        else if (slideId === 'slide_hll_2') {
            const hsCard = canvas.querySelector('#s2-hashset-card');
            const hsBar = canvas.querySelector('#s2-hs-bar');
            const hsMem = canvas.querySelector('#s2-hs-mem');
            const hsBadge = canvas.querySelector('#s2-hs-badge');
            const hsStack = canvas.querySelector('#s2-hs-stack');
            const errEl = canvas.querySelector('#s2-hll-err');
            const miniGrid = canvas.querySelector('#s2-hll-mini-grid');

            // 1. Update memory footprint count and bars
            const currentMem = (1.2 + progress * 7.0).toFixed(1);
            if (hsMem) hsMem.textContent = `${currentMem} GB`;
            
            const hsPct = Math.min(100, Math.floor(15 + progress * 85));
            if (hsBar) hsBar.style.width = `${hsPct}%`;

            // Overload triggers when progress > 0.50
            if (progress > 0.50) {
                if (hsCard) hsCard.classList.add('overloaded');
                if (hsBar) {
                    hsBar.classList.add('critical');
                }
                if (hsBadge) {
                    hsBadge.style.display = 'flex';
                    hsBadge.classList.add('pulse');
                }
            } else {
                if (hsCard) hsCard.classList.remove('overloaded');
                if (hsBar) {
                    hsBar.classList.remove('critical');
                }
                if (hsBadge) {
                    hsBadge.style.display = 'none';
                    hsBadge.classList.remove('pulse');
                }
            }

            // 2. HashSet Block stack simulation
            const targetCount = Math.floor(progress * 24);
            if (hsStack) {
                if (progress < 0.02) {
                    hsStack.innerHTML = '';
                } else {
                    const currentCount = hsStack.children.length;
                    if (currentCount < targetCount) {
                        for (let i = currentCount; i < targetCount; i++) {
                            const block = document.createElement('div');
                            block.className = 'v49-stack-block';
                            block.textContent = `user_${Math.floor(100000 + Math.random() * 900000)}`;
                            block.style.position = 'absolute';
                            block.style.left = `${(i % 3) * 32 + 2}%`;
                            block.style.bottom = `${Math.floor(i / 3) * 18 + 4}px`;
                            block.style.width = '30%';
                            block.style.height = '14px';
                            block.style.background = 'rgba(239, 68, 68, 0.15)';
                            block.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                            block.style.color = '#f87171';
                            block.style.fontSize = '8px';
                            block.style.display = 'flex';
                            block.style.alignItems = 'center';
                            block.style.justifyContent = 'center';
                            block.style.borderRadius = '3px';
                            block.style.fontFamily = 'monospace';
                            block.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
                            hsStack.appendChild(block);
                        }
                    }
                }
            }

            // HLL accuracy fluctuation
            if (errEl) {
                const err = (1.04 + Math.sin(progress * 40) * 0.04).toFixed(2);
                errEl.textContent = `Sai số: ~${err}%`;
            }

            // 3. Render 12KB mini register grid
            if (miniGrid) {
                if (miniGrid.children.length === 0) {
                    let html = '';
                    for (let i = 0; i < 96; i++) {
                        html += `<div class="v49-mini-cell" id="s2-mini-cell-${i}"></div>`;
                    }
                    miniGrid.innerHTML = html;
                }

                // Deterministic pulsing based on progress + cell index
                const len = miniGrid.children.length;
                for (let i = 0; i < len; i++) {
                    const cell = miniGrid.children[i];
                    if (cell) {
                        const isActive = Math.sin(i * 12 + progress * 150) > 0.65;
                        if (isActive) {
                            cell.classList.add('pulse-active');
                        } else {
                            cell.classList.remove('pulse-active');
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_hll_3') {
            const coin = canvas.querySelector('#s3-coin');
            const label = canvas.querySelector('#s3-coin-label');
            const history = canvas.querySelector('#s3-flip-history');
            const bitsBox = canvas.querySelector('#s3-binary-bits');
            const inputVal = canvas.querySelector('#s3-input-val');
            const zeroCountEl = canvas.querySelector('#s3-zero-count');
            const estValEl = canvas.querySelector('#s3-est-val');

            const results = ['H', 'H', 'H', 'H', 'H', 'T'];
            const step = Math.floor(progress * 6);
            const sp = (progress * 6) % 1.0;

            // 1. Coin rotation logic
            if (coin) {
                if (sp < 0.65) {
                    // Coin is currently spinning
                    const angle = step * 180 + (sp / 0.65) * 720;
                    coin.style.transform = `rotateY(${angle}deg)`;
                    if (label) label.textContent = `Tung đồng xu lần ${step + 1}...`;
                } else {
                    // Coin has landed
                    const isHead = results[step] === 'H';
                    const targetAngle = step * 180 + (isHead ? 0 : 180);
                    coin.style.transform = `rotateY(${targetAngle}deg)`;
                    if (label) label.textContent = isHead ? 'KẾT QUẢ: NGỬA! (H)' : 'KẾT QUẢ: XẤP! (T)';
                }
            }

            // 2. Render Flip History Bubbles
            if (history) {
                // Determine how many steps completed landing phase
                let bubblesCount = step;
                if (sp >= 0.65) {
                    bubblesCount = step + 1;
                }
                
                // Regenerate history if child count is wrong
                if (history.children.length !== bubblesCount) {
                    history.innerHTML = '';
                    for (let i = 0; i < bubblesCount; i++) {
                        const bubble = document.createElement('div');
                        const isHead = results[i] === 'H';
                        bubble.className = `v49-history-bubble ${isHead ? 'head' : 'tail'}`;
                        bubble.textContent = results[i];
                        history.appendChild(bubble);
                    }
                }
            }

            // 3. Binary Bits & Estimate Readout
            if (bitsBox) {
                let userId = 'user_id: 847927';
                let bitString = '000001010111100101';
                let numZeros = 5;
                let est = 32;

                if (step === 0) {
                    userId = 'user_id: 412093';
                    bitString = '011010010111010010';
                    numZeros = 1;
                    est = 2;
                } else if (step === 1) {
                    userId = 'user_id: 194857';
                    bitString = '001010011101001011';
                    numZeros = 2;
                    est = 4;
                } else if (step === 2) {
                    userId = 'user_id: 593021';
                    bitString = '000110100101100110';
                    numZeros = 3;
                    est = 8;
                } else if (step === 3) {
                    userId = 'user_id: 748192';
                    bitString = '000010110100101101';
                    numZeros = 4;
                    est = 16;
                } else {
                    userId = 'user_id: 847927';
                    bitString = '000001010111100101';
                    numZeros = 5;
                    est = 32;
                }

                if (inputVal && inputVal.textContent !== userId) {
                    inputVal.textContent = userId;
                }
                if (zeroCountEl) zeroCountEl.textContent = numZeros;
                if (estValEl) estValEl.textContent = `2^${numZeros} = ${est} phần tử`;

                // Render cell markup only if string changes
                if (bitsBox.getAttribute('data-bits') !== bitString) {
                    bitsBox.setAttribute('data-bits', bitString);
                    let html = '';
                    for (let i = 0; i < bitString.length; i++) {
                        const char = bitString[i];
                        let cellClass = '';
                        if (i < numZeros) {
                            cellClass = 'zero-lead';
                        } else if (i === numZeros) {
                            cellClass = 'first-one';
                        }
                        html += `<div class="v49-bit-cell ${cellClass}">${char}</div>`;
                    }
                    bitsBox.innerHTML = html;
                }
            }
        }
        else if (slideId === 'slide_hll_4') {
            const denseCard = canvas.querySelector('#s4-dense-card');
            const sparseCapsule = canvas.querySelector('#s4-sparse-capsule');
            
            if (progress < 0.50) {
                // Phase 1: Sparse View
                if (sparseCapsule) {
                    sparseCapsule.style.display = 'flex';
                    sparseCapsule.style.opacity = '1';
                    sparseCapsule.style.transform = 'scale(1)';
                }
                if (denseCard) {
                    denseCard.style.display = 'none';
                    denseCard.style.opacity = '0';
                    denseCard.style.transform = 'scale(0.95)';
                }
            } else {
                // Phase 2: Dense Grid View
                if (sparseCapsule) {
                    sparseCapsule.style.display = 'none';
                    sparseCapsule.style.opacity = '0';
                }
                if (denseCard) {
                    denseCard.style.display = 'flex';
                    denseCard.style.opacity = '1';
                    denseCard.style.transform = 'scale(1)';
                    
                    const grid = denseCard.querySelector('#s4-register-grid');
                    if (grid && grid.children.length === 0) {
                        let html = '';
                        for (let i = 0; i < 64; i++) {
                            html += `<div class="v49-register-cell" id="s4-cell-${i}">0</div>`;
                        }
                        grid.innerHTML = html;
                    }

                    // Sweep through cells, filling them up
                    const vals = [
                        0,3,0,0,5,0,2,0, 1,0,4,0,0,3,0,0, 0,0,0,2,6,0,0,1, 0,0,5,0,0,0,3,0,
                        2,0,0,1,0,4,0,0, 0,3,0,0,2,0,5,0, 0,0,6,0,0,1,0,0, 4,0,0,3,0,0,2,0
                    ];

                    const sweepPercent = (progress - 0.5) / 0.5; // 0 -> 1
                    const sweepLimit = Math.floor(sweepPercent * 64);

                    for (let i = 0; i < 64; i++) {
                        const cell = denseCard.querySelector(`#s4-cell-${i}`);
                        if (cell) {
                            if (i <= sweepLimit) {
                                cell.textContent = vals[i];
                                if (vals[i] > 0) {
                                    if (i === sweepLimit) {
                                        cell.className = 'v49-register-cell active-pulse';
                                    } else {
                                        cell.className = 'v49-register-cell occupied';
                                    }
                                } else {
                                    cell.className = 'v49-register-cell';
                                }
                            } else {
                                cell.textContent = '0';
                                cell.className = 'v49-register-cell';
                            }
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_hll_5') {
            const path = canvas.querySelector('#s5-curve-path');
            const cursor = canvas.querySelector('#s5-chart-cursor');
            const rawEl = canvas.querySelector('#s5-val-raw');
            const biasEl = canvas.querySelector('#s5-val-bias');
            const calEl = canvas.querySelector('#s5-val-calibrated');

            // 1. Move the SVG chart cursor
            if (path && cursor) {
                try {
                    const pathLen = path.getTotalLength();
                    const pt = path.getPointAtLength(progress * pathLen);
                    cursor.setAttribute('cx', pt.x);
                    cursor.setAttribute('cy', pt.y);
                } catch (e) {
                    // Fallback in case getTotalLength / getPointAtLength fails
                    const cx = 50 + progress * 330;
                    const cy = 220 - progress * 100;
                    cursor.setAttribute('cx', cx);
                    cursor.setAttribute('cy', cy);
                }
            }

            // 2. Update stats readouts
            if (rawEl) {
                const rawVal = Math.floor(progress * 12450);
                rawEl.textContent = rawVal.toLocaleString('en-US');
            }
            if (calEl) {
                const calVal = Math.floor(progress * 9800);
                calEl.textContent = calVal.toLocaleString('en-US');
            }
            if (biasEl) {
                if (progress < 0.05) {
                    biasEl.textContent = '0%';
                    biasEl.className = 'value text-gold';
                } else if (progress < 0.70) {
                    const skew = (22.5 + Math.sin(progress * 15) * 2.5).toFixed(1);
                    biasEl.textContent = `+${skew}%`;
                    biasEl.className = 'value text-red';
                } else {
                    biasEl.textContent = 'Đã sửa (<1.0%)';
                    biasEl.className = 'value text-green';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video49',
        topic: 'HyperLogLog++'
    };

    console.log('[Video49 Plugin] Loaded: HyperLogLog++ plugin successfully registered.');
})();
