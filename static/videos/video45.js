/**
 * Video 45: Floating-Point Precision Bug (0.1 + 0.2 = 0.30000000000000004)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video45
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_float_2: [
            { text: 'console', start: 3.0, end: 9.0, class: 'active-gold' },
            { text: 'sai số', start: 9.0, end: 15.0, class: 'active-bad' }
        ],
        slide_float_3: [
            { text: 'ieee 754', start: 2.0, end: 10.0, class: 'active-good' },
            { text: 'nhị phân tuần hoàn', start: 10.0, end: 21.0, class: 'active-bad' }
        ],
        slide_float_4: [
            { text: '100.000 giao dịch', start: 2.0, end: 10.0, class: 'active-gold' },
            { text: 'lệch sổ sách', start: 10.0, end: 20.0, class: 'active-bad' }
        ],
        slide_float_5: [
            { text: 'decimal', start: 3.0, end: 12.0, class: 'active-good' },
            { text: 'số nguyên xu', start: 12.0, end: 22.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_float_1',
        'slide_float_2',
        'slide_float_3',
        'slide_float_4',
        'slide_float_5'
    ];

    // Helper: generate repeating binary bits row
    function makeBinaryBitsHTML() {
        const bits = [
            '0', '.', '0', '0', '0', '1', '1', '0', '0', '1', '1',
            '0', '0', '1', '1', '0', '0', '1', '1', '0', '0',
            '1', '1', '0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '1', '1'
        ];
        let html = '';
        bits.forEach((b, idx) => {
            if (b === '.') {
                html += `<span style="font-size:24px; color:#f59e0b; margin:0 2px;">.</span>`;
            } else {
                const isRep = idx >= 3; // 000110011...
                html += `<div class="v45-bit-box bit-${idx} ${isRep ? 'repeating' : ''}">${b}</div>`;
            }
        });
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_float_1') {
            canvas.innerHTML = `
                <div class="v45-zoom-container">
                    <div class="v37-grid-bg orange-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(245,158,11,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    
                    <!-- Slide 1 Orbiting Rings Intro Hook Container -->
                    <div class="v45-intro-container">
                        <div class="v45-glow-ring outer"></div>
                        <div class="v45-glow-ring inner"></div>
                        
                        <!-- Merging blocks animation wrapper -->
                        <div class="v45-block-container" id="s1-block-container">
                            <div class="v45-merge-block" id="s1-block-01" style="left: calc(50% - 140px); top: 20px;">0.1</div>
                            
                            <!-- Glowing Plus Operator -->
                            <div class="v45-plus-operator" id="s1-plus-op" style="left: calc(50% - 15px); top: 38px;">+</div>
                            
                            <div class="v45-merge-block" id="s1-block-02" style="left: calc(50% + 30px); top: 20px;">0.2</div>
                            
                            <!-- Collision Ripple Effect -->
                            <div class="v45-collision-ripple" id="s1-ripple" style="left: calc(50% - 50px); top: 5px;"></div>
                            
                            <div class="v45-result-block" id="s1-result-block" style="left: calc(50% - 130px); top: 15px;">
                                 <div class="v45-result-badge">
                                     <i data-lucide="alert-octagon" style="width:11px; height:11px;"></i> KẾT QUẢ MÁY TÍNH
                                 </div>
                                 <div class="v45-result-value">0.3000...4</div>
                                 <div class="v45-result-expected">(Mong muốn: 0.3)</div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card v45-hook-card">
                        <div class="v45-hook-badge">
                            <i data-lucide="alert-triangle" style="width:16px; height:16px;"></i> Lỗi Số Thực Kính Điển
                        </div>
                        <div class="v45-hook-title">
                            Tại sao 0.1 + 0.2 = 0.30000000000000004?<br>Cơn ác mộng của lập trình viên Fintech
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_float_2') {
            canvas.innerHTML = `
                <div class="v45-zoom-container">

                    <div class="v45-console">
                        <div class="v45-console-header">
                            <div class="v45-console-dots">
                                <div class="v45-console-dot" style="background:#ff5f56;"></div>
                                <div class="v45-console-dot" style="background:#ffbd2e;"></div>
                                <div class="v45-console-dot" style="background:#27c93f;"></div>
                            </div>
                            <span>Developer Tools - Javascript Console</span>
                        </div>
                        
                        <div class="v45-console-line">
                            <span class="v45-console-prompt">&gt;</span>
                            <span class="v45-console-input" id="console-query"></span>
                            <span class="console-caret" style="width:2px; height:18px; background:#fff; animation: blink 1s infinite;" id="caret-id"></span>
                        </div>
                        
                        <div class="v45-console-line" style="margin-top:10px;">
                            <span class="v45-console-output" id="console-result" style="display:none;"></span>
                        </div>
                        
                        <!-- Floating Warning Badge -->
                        <div class="v45-warning-badge" id="console-warn">
                            <i data-lucide="shield-alert" style="width:18px; height:18px;"></i>
                            <span>SAI SỐ DẤU PHẨY ĐỘNG!</span>
                        </div>
                    </div>
                </div>
                
                <style>
                    @keyframes blink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                </style>
            `;
        }
        else if (slideId === 'slide_float_3') {
            canvas.innerHTML = `
                <div class="v45-zoom-container">



                    <div class="v45-binary-card">
                        <!-- Left Panel: Input Decimals -->
                        <div class="v45-binary-section" style="max-width:240px; border-right:1px solid rgba(255,255,255,0.06); padding-right:20px;">
                            <span class="v45-section-title">Hệ Thập Phân (Decimal)</span>
                            <div class="v45-decimal-box">
                                <span style="font-size:11px; color:#888; font-weight:bold;">GIÁ TRỊ THẬP PHÂN:</span>
                                <span style="font-size:26px; font-weight:800; color:#fbbf24; font-family:monospace;">0.1</span>
                            </div>
                            <div style="font-size:12px; color:#aaa; line-height:1.45; margin-top:10px;">
                                Trong hệ số 10, 0.1 là số hữu hạn. Nhưng khi dịch sang nhị phân, nó biến thành một chuỗi tuần hoàn vô hạn không bao giờ dừng.
                            </div>
                        </div>

                        <!-- Right Panel: Binary bits flow -->
                        <div class="v45-binary-section">
                            <span class="v45-section-title">Hệ Nhị Phân (64-Bit Float Precision)</span>
                            <div class="v45-binary-flow">
                                ${makeBinaryBitsHTML()}
                                
                                <!-- Truncation cut-off warn -->
                                <div class="v45-cutoff-marker" id="binary-cutoff">
                                    ✂️ BỊ CẮT BỚT BỘ NHỚ (ROUNDING ERROR)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_float_4') {
            canvas.innerHTML = `
                <div class="v45-zoom-container">

                    <div class="v45-loop-box" style="position:relative;">
                        <!-- Audit Stamp -->
                        <div class="v45-audit-stamp" id="s4-audit-stamp">KIỂM TOÁN THẤT BẠI!</div>
                        
                        <!-- Coin container for fly effect -->
                        <div id="s4-coin-container" style="position:absolute; inset:0; pointer-events:none; z-index:10;"></div>

                        <div class="v45-loop-counters">
                            <!-- Expected Card -->
                            <div class="v45-counter-card expected">
                                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                    <span style="font-size:12px; font-weight:bold; color:#888;">THEO LÝ THUYẾT</span>
                                    <span style="font-size:10px; background:rgba(16, 185, 129, 0.1); color:#10b981; padding:2px 6px; border-radius:4px; font-weight:bold;">Chính xác</span>
                                </div>
                                <span style="font-size:13px; color:#eee;">EXPECTED BALANCE (USD)</span>
                                <span class="v45-counter-val expected-green" id="loop-expected">$0.00</span>
                            </div>

                            <!-- Actual Card (Drifted) -->
                            <div class="v45-counter-card drift">
                                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                    <span style="font-size:12px; font-weight:bold; color:#888;">MÁY TÍNH TÍNH RA</span>
                                    <span style="font-size:10px; background:rgba(239, 68, 68, 0.1); color:#ef4444; padding:2px 6px; border-radius:4px; font-weight:bold;">Bị Lệch</span>
                                </div>
                                <span style="font-size:13px; color:#eee;">ACTUAL DOUBLE SUM</span>
                                <span class="v45-counter-val drift-red" id="loop-actual">$0.00</span>
                            </div>
                        </div>

                        <!-- Real-time iteration terminal -->
                        <div class="v45-loop-terminal" id="loop-terminal">
                            <!-- Loop lines will be printed here dynamically -->
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_float_5') {
            canvas.innerHTML = `
                <div class="v45-zoom-container">

                    <!-- Top Visual blocks comparison -->
                    <div class="v45-solution-comparison-header">
                        <div class="v45-visual-block bad" id="s5-block-bad">
                            <span>Double: $0.1 + $0.2 = $0.3000...4</span>
                        </div>
                        <div class="v45-visual-block good" id="s5-block-good">
                            <span>Int Cents: 10¢ + 20¢ = 30¢</span>
                        </div>
                    </div>

                    <div class="v45-comparison-box">
                        <!-- Bad Way Card -->
                        <div class="v45-compare-card bad" id="s5-card-bad">
                            <div class="v45-code-title">
                                <span>NGUY HIỂM (DÙNG FLOAT/DOUBLE)</span>
                                <span class="v45-code-title-badge">CẤM DÙNG</span>
                            </div>
                            <div class="v45-code-snippet">
                                <span class="type">double</span> balance = <span class="number">0.0</span>;<br>
                                <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i &lt; <span class="number">100000</span>; i++) {<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;balance += <span class="number">0.1</span>; <span class="comment">// Cộng dồn sai số nhị phân</span><br>
                                }<br>
                                <span class="comment">// Kết quả: 10000.00000001883</span><br>
                                System.out.println(balance);
                            </div>
                        </div>

                        <!-- Good Way Card -->
                        <div class="v45-compare-card good" id="s5-card-good">
                            <div class="v45-code-title">
                                <span>AN TOÀN (QUY ĐỔI SANG XU - INTEGER)</span>
                                <span class="v45-code-title-badge">KHUYÊN DÙNG</span>
                            </div>
                            <div class="v45-code-snippet">
                                <span class="comment">// 0.1 USD = 10 Cents (Số nguyên)</span><br>
                                <span class="type">long</span> centsBalance = <span class="number">0</span>;<br>
                                <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i &lt; <span class="number">100000</span>; i++) {<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;centsBalance += <span class="number">10</span>; <span class="comment">// Phép cộng nguyên tuyệt đối</span><br>
                                }<br>
                                <span class="comment">// Kết quả: 1000000 cents (Chính xác 100%)</span><br>
                                <span class="type">double</span> finalUSD = centsBalance / <span class="number">100.0</span>;
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_float_1') {
            const block1 = canvas.querySelector('#s1-block-01');
            const block2 = canvas.querySelector('#s1-block-02');
            const plusOp = canvas.querySelector('#s1-plus-op');
            const ripple = canvas.querySelector('#s1-ripple');
            const result = canvas.querySelector('#s1-result-block');

            if (progress <= 0.10) {
                // Phase 0: Idle separate state
                if (block1) { block1.style.opacity = '1'; block1.style.transform = 'none'; }
                if (block2) { block2.style.opacity = '1'; block2.style.transform = 'none'; }
                if (plusOp) { plusOp.style.opacity = '1'; plusOp.style.transform = 'scale(1)'; }
                if (ripple) { ripple.style.display = 'none'; }
                if (result) result.classList.remove('active');
            }
            else if (progress > 0.10 && progress <= 0.45) {
                // Phase 1: Blocks slide horizontally to meet at the center (t goes 0 to 1)
                const t = (progress - 0.10) / 0.35;
                if (block1) {
                    block1.style.opacity = '1';
                    block1.style.transform = `translateX(${t * 85}px) translateY(${Math.sin(t * Math.PI) * -15}px)`;
                }
                if (block2) {
                    block2.style.opacity = '1';
                    block2.style.transform = `translateX(${-t * 85}px) translateY(${Math.sin(t * Math.PI) * -15}px)`;
                }
                if (plusOp) {
                    plusOp.style.opacity = `${1 - t}`;
                    plusOp.style.transform = `scale(${1 - t * 0.4})`;
                }
                if (ripple) { ripple.style.display = 'none'; }
                if (result) result.classList.remove('active');
            }
            else if (progress > 0.45 && progress <= 0.55) {
                // Phase 2: Impact! Blocks vanish, ripple wave triggers, result scales up
                const tRip = (progress - 0.45) / 0.10;
                if (block1) block1.style.opacity = '0';
                if (block2) block2.style.opacity = '0';
                if (plusOp) plusOp.style.opacity = '0';
                
                if (ripple) {
                    ripple.style.display = 'block';
                    ripple.style.transform = `scale(${tRip * 2.5})`;
                    ripple.style.opacity = `${1 - tRip}`;
                }
                if (result) result.classList.add('active');
            }
            else {
                // Phase 3: Final state, result block is fully active
                if (block1) block1.style.opacity = '0';
                if (block2) block2.style.opacity = '0';
                if (plusOp) plusOp.style.opacity = '0';
                if (ripple) ripple.style.display = 'none';
                if (result) result.classList.add('active');
            }
        }
        else if (slideId === 'slide_float_2') {
            const queryEl = canvas.querySelector('#console-query');
            const resultEl = canvas.querySelector('#console-result');
            const warnEl = canvas.querySelector('#console-warn');
            const caret = canvas.querySelector('#caret-id');

            const queryText = "0.1 + 0.2";
            
            // Phase 1: Typing text from progress = 0.1 to 0.5
            if (progress > 0.1 && progress <= 0.5) {
                const t = (progress - 0.1) / 0.4;
                const charCount = Math.floor(t * queryText.length);
                if (queryEl) queryEl.textContent = queryText.slice(0, charCount);
                if (caret) caret.style.display = 'inline-block';
                if (resultEl) resultEl.style.display = 'none';
                if (warnEl) warnEl.classList.remove('visible');
            }
            // Phase 2: Show caret stationary, display output at progress = 0.5 to 0.65 (Glow the trailing error 4)
            else if (progress > 0.5 && progress <= 0.65) {
                if (queryEl) queryEl.textContent = queryText;
                if (caret) caret.style.display = 'none';
                if (resultEl) {
                    resultEl.style.display = 'inline-block';
                    resultEl.innerHTML = `0.3000000000000000<span style="color:#ff7b72; font-weight:bold; background:rgba(239,68,68,0.2); border:1px solid #ef4444; border-radius:3px; padding:0 2px; text-shadow:0 0 10px #ef4444; display:inline-block; animation: error-blink 0.5s infinite alternate;">4</span>`;
                    resultEl.className = "v45-console-output error-val";
                }
                if (warnEl) warnEl.classList.remove('visible');
            }
            // Phase 3: Show warning badge at progress > 0.65
            else if (progress > 0.65) {
                if (queryEl) queryEl.textContent = queryText;
                if (caret) caret.style.display = 'none';
                if (resultEl) {
                    resultEl.style.display = 'inline-block';
                    resultEl.innerHTML = `0.3000000000000000<span style="color:#ff7b72; font-weight:bold; background:rgba(239,68,68,0.2); border:1px solid #ef4444; border-radius:3px; padding:0 2px; text-shadow:0 0 10px #ef4444; display:inline-block;">4</span>`;
                    resultEl.className = "v45-console-output error-val";
                }
                if (warnEl) warnEl.classList.add('visible');
            }
            else {
                if (queryEl) queryEl.textContent = "";
                if (caret) caret.style.display = 'inline-block';
                if (resultEl) resultEl.style.display = 'none';
                if (warnEl) warnEl.classList.remove('visible');
            }
        }
        else if (slideId === 'slide_float_3') {
            const bits = canvas.querySelectorAll('.v45-bit-box');
            const cutoff = canvas.querySelector('#binary-cutoff');
            const inputVal = canvas.querySelector('#s3-input-val');
            const flyingVal = canvas.querySelector('#s3-flying-val');

            // Phase 1: Input slides into converter machine (progress = 0.1 to 0.3)
            if (progress > 0.1 && progress <= 0.3) {
                const t = (progress - 0.1) / 0.2;
                if (inputVal) {
                    inputVal.style.display = 'block';
                    inputVal.style.transform = `translateX(${t * 110}px) scale(${1 - t * 0.4})`;
                    inputVal.style.opacity = `${1 - t}`;
                }
                if (flyingVal) flyingVal.style.display = 'none';
                bits.forEach(b => b.classList.remove('active-bit'));
                if (cutoff) cutoff.classList.remove('visible');
            }
            // Phase 2: Binary streams out of machine (progress = 0.3 to 0.7)
            else if (progress > 0.3 && progress <= 0.70) {
                if (inputVal) inputVal.style.display = 'none';
                const t = (progress - 0.3) / 0.40;
                if (flyingVal) {
                    flyingVal.style.display = 'block';
                    flyingVal.style.transform = `translateX(${(t - 0.5) * 140}px)`;
                    flyingVal.style.opacity = `${t < 0.2 ? t * 5 : (1 - t) * 1.5}`;
                }

                // Scan highlight bitboxes sequentially
                const highlightIdx = Math.floor(t * bits.length);
                bits.forEach((bitBox, idx) => {
                    if (idx <= highlightIdx) {
                        bitBox.classList.add('active-bit');
                    } else {
                        bitBox.classList.remove('active-bit');
                    }
                });
                if (cutoff) cutoff.classList.remove('visible');
            }
            // Phase 3: Show cutoff warning (progress > 0.70)
            else if (progress > 0.70) {
                if (inputVal) inputVal.style.display = 'none';
                if (flyingVal) flyingVal.style.display = 'none';
                bits.forEach(bitBox => bitBox.classList.add('active-bit'));
                if (cutoff) cutoff.classList.add('visible');
            }
            else {
                if (inputVal) { inputVal.style.display = 'block'; inputVal.style.transform = 'none'; inputVal.style.opacity = '1'; }
                if (flyingVal) flyingVal.style.display = 'none';
                bits.forEach(b => b.classList.remove('active-bit'));
                if (cutoff) cutoff.classList.remove('visible');
            }
        }
        else if (slideId === 'slide_float_4') {
            const expEl = canvas.querySelector('#loop-expected');
            const actEl = canvas.querySelector('#loop-actual');
            const terminal = canvas.querySelector('#loop-terminal');
            const coinContainer = canvas.querySelector('#s4-coin-container');
            const stamp = canvas.querySelector('#s4-audit-stamp');

            if (progress > 0.1) {
                const t = Math.min(1, (progress - 0.1) / 0.75);
                const loopLimit = Math.floor(t * 100000);
                
                const expectedSum = (loopLimit * 0.1).toFixed(2);
                const actualSumVal = loopLimit * 0.1000000000001883;
                
                let actualSumStr = '';
                if (loopLimit < 100) {
                    actualSumStr = actualSumVal.toFixed(2);
                } else if (loopLimit < 20000) {
                    actualSumStr = actualSumVal.toFixed(10);
                } else {
                    actualSumStr = actualSumVal.toFixed(12);
                }

                if (expEl) expEl.textContent = `$${parseFloat(expectedSum).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
                if (actEl) actEl.textContent = `$${actualSumStr}`;

                // Spawn flying transaction coins
                if (progress > 0.15 && progress <= 0.85 && coinContainer && Math.random() < 0.28) {
                    const coin = document.createElement('div');
                    coin.className = 'v45-coin';
                    coin.style.left = '160px';
                    coin.style.top = '220px'; // starts at loop terminal
                    coin.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    coinContainer.appendChild(coin);
                    
                    setTimeout(() => {
                        const targetLeft = Math.random() < 0.5 ? '190px' : '530px';
                        coin.style.left = targetLeft;
                        coin.style.top = '50px';
                        coin.style.opacity = '0';
                    }, 10);
                    setTimeout(() => coin.remove(), 370);
                }

                // Print logs in simulated terminal
                if (terminal) {
                    let logHTML = '';
                    const logs = [
                        { step: 1, text: `[START] Vòng lặp giao dịch khởi chạy...` },
                        { step: 1000, text: `[WARN] Giao dịch 1,000: Lệch $0.00000000013` },
                        { step: 10000, text: `[WARN] Giao dịch 10,000: Lệch $0.00000000188` },
                        { step: 50000, text: `[CRITICAL] Giao dịch 50,000: Lệch $0.00000000941` },
                        { step: 75000, text: `[CRITICAL] Giao dịch 75,000: Lệch $0.00000001412` },
                        { step: 100000, text: `[FAIL] Giao dịch 100,000 hoàn tất. Tổng sai số tích luỹ vượt kiểm toán!` }
                    ];

                    logs.forEach(log => {
                        if (loopLimit >= log.step) {
                            const isErr = log.text.includes('CRITICAL') || log.text.includes('FAIL') || log.text.includes('WARN');
                            logHTML += `<div class="v45-loop-line ${isErr ? 'highlight-err' : ''}">${log.text}</div>`;
                        }
                    });
                    terminal.innerHTML = logHTML;
                }

                // Phase 4: Stamp Audit Failure! (progress > 0.82)
                if (progress > 0.82 && stamp) {
                    stamp.classList.add('stamped');
                } else if (stamp) {
                    stamp.classList.remove('stamped');
                }
            } else {
                if (expEl) expEl.textContent = "$0.00";
                if (actEl) actEl.textContent = "$0.00";
                if (terminal) terminal.innerHTML = '<div class="v45-loop-line">[SYSTEM] Sẵn sàng mô phỏng 100,000 giao dịch...</div>';
                if (stamp) stamp.classList.remove('stamped');
            }
        }
        else if (slideId === 'slide_float_5') {
            const blockBad = canvas.querySelector('#s5-block-bad');
            const blockGood = canvas.querySelector('#s5-block-good');
            const cardBad = canvas.querySelector('#s5-card-bad');
            const cardGood = canvas.querySelector('#s5-card-good');

            // Phase 1: Highlight Float/Double error (progress = 0.1 to 0.5)
            if (progress > 0.1 && progress <= 0.5) {
                if (blockBad) {
                    blockBad.style.opacity = '1';
                    blockBad.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.6)';
                    blockBad.style.transform = 'scale(1.05)';
                }
                if (cardBad) {
                    cardBad.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    cardBad.style.background = 'rgba(239, 68, 68, 0.05)';
                }
                if (blockGood) {
                    blockGood.style.opacity = '0.35';
                    blockGood.style.boxShadow = 'none';
                    blockGood.style.transform = 'none';
                }
                if (cardGood) {
                    cardGood.style.borderColor = 'rgba(255,255,255,0.06)';
                    cardGood.style.background = 'rgba(30, 41, 59, 0.45)';
                }
            }
            // Phase 2: Highlight Integer Cents solution (progress > 0.5)
            else if (progress > 0.5) {
                if (blockBad) {
                    blockBad.style.opacity = '0.35';
                    blockBad.style.boxShadow = 'none';
                    blockBad.style.transform = 'none';
                }
                if (cardBad) {
                    cardBad.style.borderColor = 'rgba(255,255,255,0.06)';
                    cardBad.style.background = 'rgba(30, 41, 59, 0.45)';
                }
                if (blockGood) {
                    blockGood.style.opacity = '1';
                    blockGood.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.6)';
                    blockGood.style.transform = 'scale(1.05)';
                }
                if (cardGood) {
                    cardGood.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    cardGood.style.background = 'rgba(16, 185, 129, 0.05)';
                }
            }
            else {
                if (blockBad) { blockBad.style.opacity = '1'; blockBad.style.boxShadow = 'none'; blockBad.style.transform = 'none'; }
                if (blockGood) { blockGood.style.opacity = '1'; blockGood.style.boxShadow = 'none'; blockGood.style.transform = 'none'; }
                if (cardBad) { cardBad.style.borderColor = 'rgba(255,255,255,0.06)'; cardBad.style.background = 'rgba(30, 41, 59, 0.45)'; }
                if (cardGood) { cardGood.style.borderColor = 'rgba(255,255,255,0.06)'; cardGood.style.background = 'rgba(30, 41, 59, 0.45)'; }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video45'
    };

    console.log('[Video45 Plugin] Loaded: Floating-point precision anomaly slides loaded successfully.');
})();
