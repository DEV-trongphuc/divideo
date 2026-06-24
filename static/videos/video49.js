/**
 * Video 49: Google's HyperLogLog++ Algorithm
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video49
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Matches the narration text in slides.json for highlight synchronization
    const keywordsData = {
        slide_hll_1a: [
            { text: 'bigquery', start: 1.0, end: 5.5, class: 'active-cyan' },
            { text: 'mười hai kilôbyte', start: 5.5, end: 11.0, class: 'active-good' },
            { text: 'hyperloglog cộng cộng', start: 11.0, end: 17.0, class: 'active-good' }
        ],
        slide_hll_1b: [
            { text: 'một tỷ', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'bảng băm', start: 8.0, end: 13.0, class: 'active-bad' },
            { text: 'tám gigabyte', start: 13.0, end: 17.5, class: 'active-bad' }
        ],
        slide_hll_2: [
            { text: 'hashset', start: 3.5, end: 8.5, class: 'active-bad' },
            { text: 'ngốn sạch', start: 8.5, end: 13.5, class: 'active-bad' },
            { text: 'mười hai kilôbyte', start: 16.5, end: 21.0, class: 'active-good' }
        ],
        slide_hll_3: [
            { text: 'xác suất', start: 2.0, end: 7.0, class: 'active-good' },
            { text: 'đồng xu', start: 7.0, end: 12.0, class: 'active-cyan' },
            { text: 'nhị phân', start: 12.0, end: 17.0, class: 'active-good' }
        ],
        slide_hll_4: [
            { text: 'khởi tạo', start: 2.0, end: 7.0, class: 'active-cyan' },
            { text: 'sparse', start: 7.0, end: 12.0, class: 'active-good' },
            { text: 'vài trăm byte', start: 12.0, end: 19.0, class: 'active-good' }
        ],
        slide_hll_5: [
            { text: 'vượt ngưỡng', start: 2.0, end: 7.0, class: 'active-bad' },
            { text: 'dense', start: 7.0, end: 12.0, class: 'active-cyan' },
            { text: 'mười hai kilôbyte', start: 12.0, end: 19.0, class: 'active-good' }
        ],
        slide_hll_6: [
            { text: 'chuyển đổi', start: 2.0, end: 7.0, class: 'active-good' },
            { text: 'giải nén', start: 7.0, end: 12.0, class: 'active-cyan' },
            { text: 'nạp trực tiếp', start: 12.0, end: 19.0, class: 'active-good' }
        ],
        slide_hll_7: [
            { text: 'google', start: 5.0, end: 10.0, class: 'active-good' },
            { text: 'hiệu chuẩn', start: 10.0, end: 15.0, class: 'active-cyan' },
            { text: 'một phần trăm', start: 15.0, end: 21.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_hll_1a',
        'slide_hll_1b',
        'slide_hll_2',
        'slide_hll_3',
        'slide_hll_4',
        'slide_hll_5',
        'slide_hll_6',
        'slide_hll_7'
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_hll_1a') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg cyan-tint"></div>
                    <div class="v49-intro-container" style="height: 190px;">
                        <!-- Spinning Cosmic Rings -->
                        <div class="v49-glow-ring outer"></div>
                        <div class="v49-glow-ring inner"></div>
                        
                        <!-- Google BigQuery Logo Center Hook -->
                        <img src="/static/bigquery.svg" class="v49-bigquery-logo-hook" alt="Google BigQuery">
                    </div>

                    <!-- Slide Hook Info Card -->
                    <div class="glass-card v49-hook-card" style="margin-top: 65px;">
                        <div class="v49-hook-badge">
                            <i data-lucide="zap"></i> Google HyperLogLog++
                        </div>
                        <div class="v49-hook-title">
                            Làm sao Google BigQuery đếm hàng tỷ đối tượng<br>chỉ bằng 12KB RAM?
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_1b') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg cyan-tint"></div>
                    <div class="v49-intro-container">
                        <!-- Spinning Cosmic Rings -->
                        <div class="v49-glow-ring outer"></div>
                        <div class="v49-glow-ring inner"></div>
                        
                        <!-- View Counter Box -->
                        <div class="v49-counter-box">
                            <div class="v49-counter-badge">
                                <i data-lucide="eye"></i> <span>LIVE TRAFFIC MONITOR</span>
                            </div>
                            <div class="v49-counter-value" id="s1b-view-count">982,590,483</div>
                            <div class="v49-counter-ram">BỘ NHỚ: <span class="v49-ram-val">12 KB</span> (CỐ ĐỊNH)</div>
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
                    <div class="v49-dashboard-layout">
                        <!-- Top Producer -->
                        <div class="v49-stream-producer">
                            <div class="v49-producer-badge">
                                <i data-lucide="activity"></i> DỮ LIỆU ĐẦU VÀO: <span id="s2-input-rate">10,000 / giây</span>
                            </div>
                        </div>

                        <!-- Left vs Right Columns -->
                        <div class="v49-dash-columns">
                            <!-- Left: HashSet (Bad) -->
                            <div class="v49-dash-card bad" id="s2-hashset-card">
                                <div class="v49-dash-header">
                                    <i data-lucide="database"></i>
                                    <span>HASHSET (BẢNG BĂM)</span>
                                </div>
                                <div class="v49-metric">
                                    <span class="label">BỘ NHỚ RAM</span>
                                    <span class="value text-red" id="s2-hs-mem">1.2 GB</span>
                                </div>
                                <!-- Bucket container to hold piled logs -->
                                <div class="v49-bucket" id="s2-hs-bucket">
                                    <!-- Dynamic blocks inside bucket -->
                                </div>
                                <div class="v49-dash-status bad" id="s2-hs-status">
                                    STABLE RUNTIME
                                </div>
                            </div>

                            <!-- Right: HLL++ (Good) -->
                            <div class="v49-dash-card good" id="s2-hll-card">
                                <div class="v49-dash-header">
                                    <i data-lucide="cpu"></i>
                                    <span>HYPERLOGLOG++</span>
                                </div>
                                <div class="v49-metric">
                                    <span class="label">BỘ NHỚ RAM</span>
                                    <span class="value text-green">12 KB (Cố định)</span>
                                </div>
                                <!-- Grid representation -->
                                <div class="v49-dash-grid" id="s2-hll-dash-grid">
                                    <!-- 64 cells generated dynamically -->
                                </div>
                                <div class="v49-dash-status good" id="s2-hll-status">
                                    STABLE RUNTIME
                                </div>
                            </div>
                        </div>
                        
                        <!-- Streaming particles box -->
                        <div id="s2-particles" style="position:absolute; inset:0; pointer-events:none; z-index:5;"></div>
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
                        <div class="v49-sparse-capsule" style="position: relative; width: 100%; height: 100%; display: flex;">
                            <div class="v49-capsule-header">
                                <i data-lucide="file-archive"></i>
                                <span>SPARSE REPRESENTATION (Tập hợp nhỏ)</span>
                            </div>
                            <div class="v49-sparse-list" id="s4-sparse-list">
                                <!-- Generated Dynamically -->
                            </div>
                            <div class="v49-capsule-footer" id="s4-sparse-footer">Dung lượng bộ nhớ: 240 Byte (Nén cực hạn)</div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_5') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg cyan-tint"></div>
                    <div class="v49-morph-container">
                        <!-- Dense Representation -->
                        <div class="v49-dense-grid-card" style="position: relative; width: 100%; height: 100%; display: flex;">
                            <div class="v49-dense-header">
                                <i data-lucide="grid"></i>
                                <span>DENSE REPRESENTATION (Tập hợp lớn)</span>
                            </div>
                            <div class="v49-register-grid" id="s5-register-grid"></div>
                            <div class="v49-dense-footer">Mảng cố định 64 thanh ghi (m = 64) = 12KB RAM cố định</div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_6') {
            canvas.innerHTML = `
                <div class="v49-zoom-container">
                    <div class="v49-grid-bg split-tint"></div>
                    <div class="v49-transition-layout">
                        <!-- Left Sparse -->
                        <div class="v49-sparse-capsule" id="s6-sparse">
                            <div class="v49-capsule-header">
                                <i data-lucide="file-archive"></i>
                                <span>SPARSE (Khóa-Giá trị)</span>
                            </div>
                            <div class="v49-sparse-list">
                                <div class="v49-sparse-item" id="s6-sparse-item-0"><span>Reg #12</span> <span class="v49-arrow">➜</span> <span>Val 4</span></div>
                                <div class="v49-sparse-item" id="s6-sparse-item-1"><span>Reg #28</span> <span class="v49-arrow">➜</span> <span>Val 2</span></div>
                                <div class="v49-sparse-item" id="s6-sparse-item-2"><span>Reg #55</span> <span class="v49-arrow">➜</span> <span>Val 6</span></div>
                            </div>
                            <div class="v49-capsule-footer">Dung lượng: ~240 Byte</div>
                        </div>

                        <!-- Middle Status Arrow -->
                        <div class="v49-transition-mid">
                            <div class="v49-transition-arrow">➔</div>
                            <div class="v49-transition-threshold" id="s6-threshold-status">Ngưỡng: 200 items</div>
                        </div>

                        <!-- Right Dense -->
                        <div class="v49-dense-grid-card" id="s6-dense">
                            <div class="v49-dense-header">
                                <i data-lucide="grid"></i>
                                <span>DENSE (Mảng phẳng)</span>
                            </div>
                            <div class="v49-register-grid" id="s6-register-grid"></div>
                            <div class="v49-dense-footer">Cố định: 12KB RAM</div>
                        </div>
                    </div>
                </div>
            `;
            if (window.lucide) { window.lucide.createIcons({ node: canvas }); }
        }
        else if (slideId === 'slide_hll_7') {
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
                                <path id="s7-curve-path" d="M 50 220 C 120 210, 200 170, 380 120" fill="none" stroke="#10b981" stroke-width="3"/>
                                
                                <!-- Calibration cursor pointer -->
                                <circle id="s7-chart-cursor" cx="50" cy="220" r="6" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)"/>
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
                                <span class="value text-red" id="s7-val-raw">0</span>
                            </div>
                            <div class="v49-readout-item">
                                <span class="label">SAI SỐ HIỆU CHỈNH</span>
                                <span class="value text-gold" id="s7-val-bias">0%</span>
                            </div>
                            <div class="v49-readout-item highlight">
                                <span class="label">HIỆU CHUẨN GOOGLE (HLL++)</span>
                                <span class="value text-green" id="s7-val-calibrated">0</span>
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
        if (slideId === 'slide_hll_1a') {
            // Static logo title slide, no ticking needed
        }
        else if (slideId === 'slide_hll_1b') {
            const countEl = canvas.querySelector('#s1b-view-count');
            if (countEl) {
                const count = Math.floor(982590483 + progress * (1000000000 - 982590483));
                countEl.textContent = count.toLocaleString('en-US');
            }
        }
        else if (slideId === 'slide_hll_2') {
            const hsCard = canvas.querySelector('#s2-hashset-card');
            const hsMem = canvas.querySelector('#s2-hs-mem');
            const hsBucket = canvas.querySelector('#s2-hs-bucket');
            const hsStatus = canvas.querySelector('#s2-hs-status');
            const hllGrid = canvas.querySelector('#s2-hll-dash-grid');
            const particlesBox = canvas.querySelector('#s2-particles');

            // 1. Update memory footprint
            const currentMem = (1.2 + progress * 7.0).toFixed(1);
            if (hsMem) hsMem.textContent = `${currentMem} GB`;

            // Overload triggers when progress > 0.50
            const isOverloaded = progress > 0.50;
            if (isOverloaded) {
                if (hsCard) hsCard.classList.add('overloaded');
                if (hsBucket) hsBucket.classList.add('overloaded');
            } else {
                if (hsCard) hsCard.classList.remove('overloaded');
                if (hsBucket) hsBucket.classList.remove('overloaded');
            }

            if (hsStatus) {
                const desiredText = isOverloaded ? 'OVERLOAD CRITICAL' : 'STABLE RUNTIME';
                if (!hsStatus.textContent.includes(desiredText)) {
                    hsStatus.className = `v49-dash-status bad ${isOverloaded ? 'overloaded' : ''}`;
                    hsStatus.innerHTML = isOverloaded 
                        ? `<span style="display:inline-flex; align-items:center; gap:4px;"><i data-lucide="alert-octagon" style="width:12px; height:12px;"></i> OVERLOAD CRITICAL</span>`
                        : `STABLE RUNTIME`;
                    if (window.lucide) { window.lucide.createIcons({ node: hsStatus }); }
                }
            }

            // 2. Initialize HLL++ grid if empty
            if (hllGrid && hllGrid.children.length === 0) {
                let html = '';
                for (let i = 0; i < 64; i++) {
                    html += `<div class="v49-dash-grid-cell" id="s2-hll-cell-${i}"></div>`;
                }
                hllGrid.innerHTML = html;
            }

            // 3. Streaming particles logic
            if (particlesBox) {
                const interval = 0.015;
                const lifespan = 0.06;
                const maxIdx = Math.floor(progress / interval);

                let particlesHtml = '';
                let completedLeft = 0;
                let completedRight = 0;

                for (let i = 0; i <= maxIdx; i++) {
                    const birth = i * interval;
                    const death = birth + lifespan;
                    if (death <= progress) {
                        if (i % 2 === 0) {
                            completedLeft++;
                        } else {
                            completedRight++;
                        }
                    } else if (progress >= birth) {
                        const t = (progress - birth) / lifespan;
                        const isLeft = i % 2 === 0;
                        const targetX = isLeft ? 24 : 76;
                        const targetY = 240;
                        
                        const offsetX = Math.sin(i * 17) * 12;
                        const offsetY = Math.cos(i * 13) * 12;

                        const curX = 50 + (targetX - 50) * t + offsetX * (1 - t);
                        const curY = 35 + (targetY - 35) * t + offsetY * (1 - t);

                        particlesHtml += `<div class="v49-stream-particle" style="left: ${curX}%; top: ${curY}px;"></div>`;
                    }
                }

                particlesBox.innerHTML = particlesHtml;

                // 4. Update HashSet bucket with piled logs
                if (hsBucket) {
                    const currentCount = hsBucket.children.length;
                    const targetCount = Math.min(36, completedLeft);
                    if (currentCount !== targetCount) {
                        hsBucket.innerHTML = '';
                        for (let k = 0; k < targetCount; k++) {
                            const block = document.createElement('div');
                            block.className = 'v49-stack-block';
                            block.style.position = 'absolute';
                            block.style.left = `${(k % 3) * 32 + 2}%`;
                            block.style.bottom = `${Math.floor(k / 3) * 15 + 4}px`;
                            block.style.width = '30%';
                            block.style.height = '12px';
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
                            block.textContent = `id_${Math.floor(1000 + k * 137)}`;
                            hsBucket.appendChild(block);
                        }
                    }
                }

                // 5. Update HLL++ Grid active cells
                if (hllGrid) {
                    const activeCells = new Set();
                    for (let j = 0; j < completedRight; j++) {
                        activeCells.add((j * 17) % 64);
                    }

                    for (let c = 0; c < 64; c++) {
                        const cell = hllGrid.children[c];
                        if (cell) {
                            if (activeCells.has(c)) {
                                cell.classList.add('active');
                            } else {
                                cell.classList.remove('active');
                            }
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
                let bubblesCount = step;
                if (sp >= 0.65) {
                    bubblesCount = step + 1;
                }
                
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
            const list = canvas.querySelector('#s4-sparse-list');
            const footer = canvas.querySelector('#s4-sparse-footer');

            // Render list dynamically depending on progress
            const maxItems = 6;
            const currentItems = Math.min(maxItems, Math.floor(progress * maxItems) + 1);
            const ramUsage = Math.floor(40 + progress * 200);

            if (footer) {
                footer.textContent = `Dung lượng bộ nhớ: ${ramUsage} Byte (Tiết kiệm ~98%)`;
            }

            if (list) {
                const itemsData = [
                    { idx: 12, val: 4 },
                    { idx: 28, val: 2 },
                    { idx: 55, val: 6 },
                    { idx: 74, val: 1 },
                    { idx: 90, val: 3 },
                    { idx: 104, val: 5 }
                ];
                
                let html = '';
                for (let i = 0; i < currentItems; i++) {
                    const item = itemsData[i % itemsData.length];
                    html += `
                        <div class="v49-sparse-item" style="animation: v49-bubble-pop 0.3s ease forwards;">
                            <span>Chỉ mục ${item.idx}</span>
                            <span class="v49-arrow">➜</span>
                            <span>Giá trị ${item.val}</span>
                        </div>
                    `;
                }
                list.innerHTML = html;
            }
        }
        else if (slideId === 'slide_hll_5') {
            const grid = canvas.querySelector('#s5-register-grid');
            if (grid) {
                if (grid.children.length === 0) {
                    let html = '';
                    for (let i = 0; i < 64; i++) {
                        html += `<div class="v49-register-cell" id="s5-cell-${i}">0</div>`;
                    }
                    grid.innerHTML = html;
                }

                // Random flat sweep on dense registers
                const vals = [
                    0,3,0,0,5,0,2,0, 1,0,4,0,0,3,0,0, 0,0,0,2,6,0,0,1, 0,0,5,0,0,0,3,0,
                    2,0,0,1,0,4,0,0, 0,3,0,0,2,0,5,0, 0,0,6,0,0,1,0,0, 4,0,0,3,0,0,2,0
                ];

                const activeIdx = Math.floor(progress * 64);
                for (let i = 0; i < 64; i++) {
                    const cell = grid.querySelector(`#s5-cell-${i}`);
                    if (cell) {
                        cell.textContent = vals[i];
                        if (vals[i] > 0) {
                            if (i === activeIdx) {
                                cell.className = 'v49-register-cell active-pulse';
                            } else {
                                cell.className = 'v49-register-cell occupied';
                            }
                        } else {
                            cell.className = 'v49-register-cell';
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_hll_6') {
            const sparse = canvas.querySelector('#s6-sparse');
            const dense = canvas.querySelector('#s6-dense');
            const status = canvas.querySelector('#s6-threshold-status');
            const grid = canvas.querySelector('#s6-register-grid');

            if (grid && grid.children.length === 0) {
                let html = '';
                for (let i = 0; i < 64; i++) {
                    html += `<div class="v49-register-cell" id="s6-cell-${i}">0</div>`;
                }
                grid.innerHTML = html;
            }

            // Animate transition phases
            if (progress < 0.35) {
                // Phase 1: Sparse is active
                if (sparse) sparse.style.opacity = '1';
                if (dense) dense.style.opacity = '0.3';
                if (status) {
                    status.textContent = 'KIỂM TRA NGƯỠNG...';
                    status.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    status.style.color = '#fbbf24';
                }
                
                // Clear dense grid
                for (let i = 0; i < 64; i++) {
                    const cell = grid.querySelector(`#s6-cell-${i}`);
                    if (cell) {
                        cell.textContent = '0';
                        cell.className = 'v49-register-cell';
                    }
                }
            }
            else if (progress >= 0.35 && progress < 0.75) {
                // Phase 2: Morphing in progress
                if (sparse) sparse.style.opacity = '0.7';
                if (dense) dense.style.opacity = '0.7';
                if (status) {
                    status.textContent = 'VƯỢT NGƯỠNG! MORPHING...';
                    status.style.borderColor = '#ef4444';
                    status.style.color = '#ef4444';
                }

                // Unpack sparse keys to dense indexes (Reg 12 -> 4, Reg 28 -> 2, Reg 55 -> 6)
                const transferPct = (progress - 0.35) / 0.40; // 0 -> 1
                
                for (let i = 0; i < 64; i++) {
                    const cell = grid.querySelector(`#s6-cell-${i}`);
                    if (cell) {
                        if (i === 12 && transferPct > 0.2) {
                            cell.textContent = '4';
                            cell.className = transferPct < 0.5 ? 'v49-register-cell active-pulse' : 'v49-register-cell occupied';
                        } else if (i === 28 && transferPct > 0.5) {
                            cell.textContent = '2';
                            cell.className = transferPct < 0.8 ? 'v49-register-cell active-pulse' : 'v49-register-cell occupied';
                        } else if (i === 55 && transferPct > 0.8) {
                            cell.textContent = '6';
                            cell.className = 'v49-register-cell active-pulse';
                        } else {
                            cell.textContent = '0';
                            cell.className = 'v49-register-cell';
                        }
                    }
                }
            }
            else {
                // Phase 3: Morph Complete! Dense is fully populated and active
                if (sparse) sparse.style.opacity = '0.15';
                if (dense) dense.style.opacity = '1';
                if (status) {
                    status.textContent = 'MORPH COMPLETE';
                    status.style.borderColor = '#10b981';
                    status.style.color = '#10b981';
                }

                // Dense grid shows values fully unpacked
                for (let i = 0; i < 64; i++) {
                    const cell = grid.querySelector(`#s6-cell-${i}`);
                    if (cell) {
                        if (i === 12) {
                            cell.textContent = '4';
                            cell.className = 'v49-register-cell occupied';
                        } else if (i === 28) {
                            cell.textContent = '2';
                            cell.className = 'v49-register-cell occupied';
                        } else if (i === 55) {
                            cell.textContent = '6';
                            cell.className = 'v49-register-cell occupied';
                        } else {
                            cell.textContent = '0';
                            cell.className = 'v49-register-cell';
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_hll_7') {
            const path = canvas.querySelector('#s7-curve-path');
            const cursor = canvas.querySelector('#s7-chart-cursor');
            const rawEl = canvas.querySelector('#s7-val-raw');
            const biasEl = canvas.querySelector('#s7-val-bias');
            const calEl = canvas.querySelector('#s7-val-calibrated');

            // 1. Move the SVG chart cursor
            if (path && cursor) {
                try {
                    const pathLen = path.getTotalLength();
                    const pt = path.getPointAtLength(progress * pathLen);
                    cursor.setAttribute('cx', pt.x);
                    cursor.setAttribute('cy', pt.y);
                } catch (e) {
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
