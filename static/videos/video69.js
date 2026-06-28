/**
 * Video 69: Salami Slicing Bug (Làm tròn 1 xu)
 * Custom slides detailing bank rounding math and fractional residue gathering.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_salami_intro: [
            { text: 'rút ruột triệu đô', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'tấn công cắt lát salami', start: 7.5, end: 11.5, class: 'active-yellow' }
        ],
        slide_salami_rounding: [
            { text: 'số thực phân số lẻ', start: 3.5, end: 6.5, class: 'active-cyan' },
            { text: 'làm tròn số này xuống', start: 7.5, end: 10.5, class: 'active-yellow' }
        ],
        slide_salami_fraction: [
            { text: 'phần dư cực kỳ nhỏ', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'tích lũy sẽ cực kỳ khổng lồ', start: 7.0, end: 11.0, class: 'active-gold' }
        ],
        slide_salami_loop: [
            { text: 'vòng lặp nhỏ', start: 3.0, end: 6.0, class: 'active-cyan' },
            { text: 'chuyển toàn bộ phần dư', start: 7.0, end: 10.5, class: 'active-yellow' }
        ],
        slide_salami_ledger: [
            { text: 'số tiền làm tròn hoàn hảo', start: 3.5, end: 6.5, class: 'active-green' },
            { text: 'hàng nghìn Đô la mỗi giờ', start: 7.5, end: 11.5, class: 'active-gold' }
        ],
        slide_salami_float: [
            { text: 'nhị phân IEEE 754', start: 3.0, end: 6.0, class: 'active-pink' },
            { text: 'số vô hạn tuần hoàn', start: 7.0, end: 10.5, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_salami_intro', 'slide_salami_rounding', 'slide_salami_fraction', 
        'slide_salami_loop', 'slide_salami_ledger', 'slide_salami_float'
    ];

    function sceneWrap(inner) {
        return `<div class="v69-zoom-container"><div class="v69-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: Safe Vault with Gold Coins raining
        if (slideId === 'slide_salami_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-vault-board">
                        <div class="v69-vault-door" id="v69-intro-door">
                            <div class="v69-vault-wheel" id="v69-intro-wheel">
                                <div class="v69-vault-spoke"></div>
                                <div class="v69-vault-spoke"></div>
                                <div class="v69-vault-spoke"></div>
                                <div class="v69-vault-spoke"></div>
                            </div>
                        </div>
                        
                        <!-- Raining coins -->
                        <div class="v69-coin" id="v69-coin-1" style="left:120px;"></div>
                        <div class="v69-coin" id="v69-coin-2" style="left:240px;"></div>
                        <div class="v69-coin" id="v69-coin-3" style="left:380px;"></div>
                        <div class="v69-coin" id="v69-coin-4" style="left:520px;"></div>
                        <div class="v69-coin" id="v69-coin-5" style="left:660px;"></div>
                    </div>
                </div>
            `);
        }

        // Slide 2: Bank transaction receipts sliding
        else if (slideId === 'slide_salami_rounding') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-receipts-container">
                        <div class="v69-bank-receipt">
                            <div style="font-weight:bold; text-align:center; font-size:16px;">BANK TRANS INVOICE</div>
                            <div class="v69-receipt-dashed"></div>
                            <div class="v69-receipt-row"><span>Account No:</span> <span>*3059</span></div>
                            <div class="v69-receipt-row"><span>Monthly Int:</span> <span>3.125 %</span></div>
                            <div class="v69-receipt-row"><span>Principal:</span> <span>$3,200.00</span></div>
                            <div class="v69-receipt-dashed"></div>
                            
                            <!-- Calculated Interest and Red slicing line -->
                            <div class="v69-receipt-row" style="font-size:18px; font-weight:bold;">
                                <span>NET INTEREST:</span>
                                <span id="v69-receipt-val">$100.0048</span>
                            </div>
                            <div class="v69-receipt-red-cut" id="v69-receipt-cut"></div>
                            
                            <div class="v69-receipt-dashed"></div>
                            <div class="v69-receipt-row" style="font-size:16px; font-weight:bold; color:#10b981;" id="v69-receipt-final">
                                <span>PAID BALANCE:</span>
                                <span id="v69-receipt-final-val">$100.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 3: Residue floating pipe
        else if (slideId === 'slide_salami_fraction') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-residue-board">
                        <div style="font-family:monospace; font-size:16px; color:#9ca3af; text-align:center; font-weight:bold; letter-spacing:1px;">
                            DÒNG CHẢY PHẦN DƯ LẺ THẬP PHÂN (RESIDUE FLOW)
                        </div>
                        
                        <!-- Flow pipe simulation -->
                        <div class="v69-pipe-flow">
                            <div class="v69-pipe-particle" id="v69-part-1">$0.0048</div>
                            <div class="v69-pipe-particle" id="v69-part-2">$0.0012</div>
                            <div class="v69-pipe-particle" id="v69-part-3">$0.0076</div>
                            <div class="v69-pipe-particle" id="v69-part-4">$0.0035</div>
                            
                            <span style="position:absolute; right:30px; font-family:monospace; font-size:14px; color:#10b981; font-weight:bold;">HACKER ACCOUNT</span>
                        </div>
                        
                        <div style="font-family:monospace; font-size:14px; text-align:center; color:#888;">
                            Mỗi giao dịch trích lại một phần phân số siêu nhỏ tích tụ liên tục.
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Code loop window
        else if (slideId === 'slide_salami_loop') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-code-window">
                        <div class="v69-code-header">
                            <div class="v69-code-dots">
                                <div class="v69-code-dot close"></div>
                                <div class="v69-code-dot min"></div>
                                <div class="v69-code-dot max"></div>
                            </div>
                            <span style="font-family:monospace; font-size:12px; color:#64748b; margin-left:20px;">salami_gather.js</span>
                        </div>
                        <div class="v69-code-body">
                            <div class="v69-code-line"><span class="v69-code-comment">// Quét qua danh sách tài khoản ngân hàng</span></div>
                            <div class="v69-code-line"><span class="v69-code-kw">for</span> (<span class="v69-code-kw">let</span> <span class="v69-code-var">acc</span> <span class="v69-code-kw">of</span> <span class="v69-code-var">accounts</span>) {</div>
                            <div class="v69-code-line" style="padding-left:30px;"><span class="v69-code-comment">// Lấy phần tiền dư nhỏ hơn 1 xu (0.01)</span></div>
                            <div class="v69-code-line highlight" style="padding-left:30px;" id="v69-code-gather">
                                <span class="v69-code-kw">let</span> <span class="v69-code-var">residue</span> = <span class="v69-code-var">acc</span>.<span class="v69-code-var">interest</span> - <span class="v69-code-var">Math</span>.<span class="v69-code-var">floor</span>(<span class="v69-code-var">acc</span>.<span class="v69-code-var">interest</span> * <span class="v69-code-var">100</span>) / <span class="v69-code-var">100</span>;
                            </div>
                            <div class="v69-code-line highlight" style="padding-left:30px;" id="v69-code-inject">
                                <span class="v69-code-var">hacker</span>.<span class="v69-code-var">balance</span> += <span class="v69-code-var">residue</span>;
                            </div>
                            <div class="v69-code-line" style="padding-left:30px;"><span class="v69-code-var">acc</span>.<span class="v69-code-var">interest</span> -= <span class="v69-code-var">residue</span>;</div>
                            <div class="v69-code-line">}</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 5: Hacker ledger dashboard
        else if (slideId === 'slide_salami_ledger') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-ledger-board">
                        <span style="font-family:monospace; font-size:16px; color:#9ca3af; letter-spacing:2px; font-weight:bold;">SỐ DƯ TÀI KHOẢN HACKER</span>
                        <div class="v69-ledger-num" id="v69-ledger-balance">$0.00</div>
                        <span style="font-family:monospace; font-size:14px; color:#10b981; text-align:center; font-weight:bold; animation:v69-pulse-out-rect 2s infinite;" id="v69-ledger-status">
                            📥 RECEIVING SLICES... (ACTIVE)
                        </span>
                    </div>
                </div>
            `);
        }

        // Slide 6: IEEE 754 float binary converter
        else if (slideId === 'slide_salami_float') {
            canvas.innerHTML = sceneWrap(`
                <div class="v69-scene-row">
                    <div class="v69-converter-board">
                        <div style="font-family:monospace; font-size:16px; color:#9ca3af; text-align:center; font-weight:bold; letter-spacing:1px;">
                            BIỂU DIỄN SỐ THỰC 0.1 TRONG HỆ NHỊ PHÂN IEEE 754
                        </div>
                        
                        <div class="v69-binary-grid">
                            <span>0.1 (Decimal) = </span>
                            <span>0.0001</span>
                            <span class="v69-binary-highlight">1001</span>
                            <span class="v69-binary-highlight">1001</span>
                            <span class="v69-binary-highlight">1001</span>
                            <span class="v69-binary-highlight">1001</span>
                            <span class="v69-binary-highlight">1001</span>
                            <span>1100... (Vô hạn)</span>
                            <div class="v69-binary-cutbar" id="v69-binary-cutbar-item"></div>
                        </div>
                        
                        <div style="font-family:monospace; font-size:13px; color:#a78bfa; text-align:center;" id="v69-binary-explanation">
                            Máy tính buộc phải cắt xén làm tròn ở bit thứ 53 của phần định trị (significand).
                        </div>
                    </div>
                </div>
            `);
        }
    }

    // ── FRAME UPDATE ANIMATIONS ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v69-scene-row');
        if (!row) return;

        // Slide 1: Vault wheel rotates, door fades out, coins rain down
        if (slideId === 'slide_salami_intro') {
            const wheel = row.querySelector('#v69-intro-wheel');
            const door = row.querySelector('#v69-intro-door');
            
            if (wheel) {
                const angle = progress * 720;
                wheel.style.transform = `rotate(${angle}deg)`;
            }
            
            if (door) {
                if (progress > 0.45) {
                    const fade = (progress - 0.45) / 0.15;
                    door.style.opacity = `${Math.max(0, 1 - fade)}`;
                    door.style.pointerEvents = 'none';
                } else {
                    door.style.opacity = '1';
                }
            }
            
            // Coins rain down
            for (let i = 1; i <= 5; i++) {
                const coin = row.querySelector(`#v69-coin-${i}`);
                if (coin) {
                    if (progress > 0.45) {
                        coin.style.opacity = '1';
                        // fall speed variations
                        const speed = 1.0 + (i * 0.15);
                        const dropProg = Math.min(1.0, (progress - 0.45) / 0.55 * speed);
                        const y = -50 + dropProg * 480;
                        const rot = dropProg * 360 * speed;
                        coin.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
                    } else {
                        coin.style.opacity = '0';
                    }
                }
            }
        }

        // Slide 2: Interest calculations and red cut line
        else if (slideId === 'slide_salami_rounding') {
            const cutLine = row.querySelector('#v69-receipt-cut');
            const receiptVal = row.querySelector('#v69-receipt-val');
            const finalReceipt = row.querySelector('#v69-receipt-final');
            
            if (progress < 0.45) {
                if (cutLine) cutLine.style.opacity = '0';
                if (receiptVal) {
                    receiptVal.textContent = '$100.0048';
                    receiptVal.style.color = '#1e293b';
                }
                if (finalReceipt) finalReceipt.style.opacity = '0.1';
            } 
            else if (progress >= 0.45 && progress < 0.75) {
                if (cutLine) cutLine.style.opacity = '1';
                if (receiptVal) {
                    receiptVal.textContent = '$100.0048';
                    receiptVal.style.color = '#ef4444';
                }
                if (finalReceipt) finalReceipt.style.opacity = '0.1';
            } 
            else {
                if (cutLine) cutLine.style.opacity = '0.1';
                if (receiptVal) {
                    receiptVal.textContent = '$100.00 [ROUNDED]';
                    receiptVal.style.color = '#64748b';
                }
                if (finalReceipt) {
                    finalReceipt.style.opacity = '1';
                    finalReceipt.style.transition = 'opacity 0.2s ease-out';
                }
            }
        }

        // Slide 3: Residue floating particles down the pipe
        else if (slideId === 'slide_salami_fraction') {
            const speedFactor = progress * 900;
            
            for (let i = 1; i <= 4; i++) {
                const part = row.querySelector(`#v69-part-${i}`);
                if (part) {
                    const offset = -80 + ((speedFactor + (i * 180)) % 860);
                    part.style.left = `${offset}px`;
                    // wave motion
                    const y = 35 + Math.sin(offset * 0.02) * 15;
                    part.style.top = `${y}px`;
                }
            }
        }

        // Slide 4: Code loop highlights blink
        else if (slideId === 'slide_salami_loop') {
            const line1 = row.querySelector('#v69-code-gather');
            const line2 = row.querySelector('#v69-code-inject');
            
            if (line1 && line2) {
                const blink = Math.sin(progress * 15) > 0;
                if (blink) {
                    line1.style.background = 'rgba(16, 185, 129, 0.25)';
                    line2.style.background = 'rgba(16, 185, 129, 0.25)';
                } else {
                    line1.style.background = 'rgba(16, 185, 129, 0.08)';
                    line2.style.background = 'rgba(16, 185, 129, 0.08)';
                }
            }
        }

        // Slide 5: Hacker ledger digits roll up
        else if (slideId === 'slide_salami_ledger') {
            const balanceEl = row.querySelector('#v69-ledger-balance');
            const statusEl = row.querySelector('#v69-ledger-status');
            
            if (balanceEl) {
                const targetVal = 148560.42;
                const currentVal = progress * targetVal;
                balanceEl.textContent = `$${currentVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
            
            if (statusEl) {
                const rate = Math.round(progress * 1250);
                statusEl.textContent = `📥 RECEIVING SLICES... +$${rate}/sec (ACTIVE)`;
            }
        }

        // Slide 6: IEEE 754 binary converter line highlight
        else if (slideId === 'slide_salami_float') {
            const cutbar = row.querySelector('#v69-binary-cutbar-item');
            const explanation = row.querySelector('#v69-binary-explanation');
            
            if (progress < 0.4) {
                if (cutbar) cutbar.style.opacity = '0';
                if (explanation) explanation.textContent = 'Máy tính nhị phân biểu diễn số thực 0.1 dưới dạng vô hạn tuần hoàn.';
            } 
            else if (progress >= 0.4 && progress < 0.75) {
                if (cutbar) {
                    cutbar.style.opacity = '1';
                    cutbar.style.left = '280px';
                }
                if (explanation) {
                    explanation.textContent = 'Do giới hạn bộ nhớ (53 bit phần định trị), hệ thống buộc phải cắt bỏ (truncate) phần đuôi.';
                    explanation.style.color = 'var(--v69-pink)';
                }
            } 
            else {
                if (cutbar) {
                    cutbar.style.opacity = '1';
                    cutbar.style.left = '280px';
                }
                if (explanation) {
                    explanation.textContent = 'Kết quả ép tròn làm lệch tổng số: 0.1 + 0.2 = 0.30000000000000004!';
                    explanation.style.color = '#ef4444';
                    explanation.style.animation = 'v69-pulse-out-rect 1s infinite alternate';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video69',
        topic: 'Thuật toán làm tròn 1 xu',
        episodeNum: 69,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video69 Plugin] Loaded: Salami slicing and floating point rounding error simulation.');
})();
