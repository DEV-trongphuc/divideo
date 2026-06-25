/**
 * DOM Memo Video 4: Supermarket Psychological Maze
 * Custom script plugin containing rich consumer psychology animations and timeline logic.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo4_1: [
            { text: 'mua sữa', start: 1.2, end: 3.2, class: 'active-purple' },
            { text: 'túi đồ', start: 3.5, end: 5.5, class: 'active-pink' }
        ],
        slide_memo4_2: [
            { text: 'món thiết yếu', start: 1.5, end: 4.0, class: 'active-indigo' },
            { text: 'góc xa nhất', start: 4.5, end: 7.2, class: 'active-purple' },
            { text: 'nhặt thêm đồ', start: 7.5, end: 10.5, class: 'active-pink' }
        ],
        slide_memo4_3: [
            { text: 'nhịp điệu chậm rãi', start: 1.5, end: 4.5, class: 'active-indigo' },
            { text: 'lò bánh mì', start: 5.0, end: 7.5, class: 'active-purple' },
            { text: 'mua sắm bằng cảm xúc', start: 8.0, end: 10.8, class: 'active-pink' }
        ],
        slide_memo4_4: [
            { text: 'quầy thu ngân', start: 1.5, end: 3.8, class: 'active-purple' },
            { text: 'năng lượng ý chí', start: 4.2, end: 7.0, class: 'active-indigo' },
            { text: 'hạ gục bạn', start: 7.5, end: 10.5, class: 'active-pink' }
        ]
    };

    const customSlideIds = [
        'slide_memo4_1', 'slide_memo4_2', 'slide_memo4_3', 'slide_memo4_4'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo4_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo4-1-container">
                        <!-- Shopping Cart Animation Area -->
                        <div class="shopping-cart-simulation">
                            <div class="supermarket-background-grid"></div>
                            
                            <div class="cart-container-wrap">
                                <div class="cart-basket vibrate-active">
                                    <i data-lucide="shopping-cart"></i>
                                    <!-- Items that will drop inside as time passes -->
                                    <div class="cart-items-grid">
                                        <div class="item-drop item-1">🥛</div>
                                        <div class="item-drop item-2">🍎</div>
                                        <div class="item-drop item-3">🍞</div>
                                        <div class="item-drop item-4">🍫</div>
                                        <div class="item-drop item-5">🥫</div>
                                        <div class="item-drop item-6">🥤</div>
                                        <div class="item-drop item-7">🍪</div>
                                        <div class="item-drop item-8">🥚</div>
                                        <div class="item-drop item-9">🧀</div>
                                        <div class="item-drop item-10">🍝</div>
                                        <div class="item-drop item-11">🍩</div>
                                        <div class="item-drop item-12">🍇</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cart-items-counter glass-card">
                            <span class="counter-label">GIỎ HÀNG THỰC TẾ:</span>
                            <span class="counter-value">3 món</span>
                        </div>

                        <div class="sleep-status-badge">TÂM LÝ SIÊU THỊ</div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo4_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo4-2-container">
                        <div class="supermarket-maze-card glass-card">
                            <div class="maze-header">SƠ ĐỒ DI CHUYỂN BẮT BUỘC</div>
                            
                            <div class="maze-arena">
                                <!-- Grid map showing shelves and pathways -->
                                <div class="maze-shelf ms-1"><span>BÁNH KẸO</span></div>
                                <div class="maze-shelf ms-2"><span>NƯỚC NGỌT</span></div>
                                <div class="maze-shelf ms-3"><span>ĐỒ GIA DỤNG</span></div>
                                <div class="maze-shelf ms-4"><span>HÓA MỸ PHẨM</span></div>
                                
                                <div class="maze-target-item">🥛 SỮA & TRỨNG<br><small>(Góc cuối siêu thị)</small></div>
                                <div class="maze-entrance">CỬA VÀO 🚪</div>

                                <!-- SVG overlay trace route path -->
                                <svg viewBox="0 0 500 240" class="maze-route-svg">
                                    <path d="M40,220 L40,110 L180,110 L180,220 L300,220 L300,50 L430,50 L430,110" fill="none" stroke="rgba(244, 114, 182, 0.2)" stroke-width="4" stroke-dasharray="8,6" />
                                    <path d="M40,220 L40,110 L180,110 L180,220 L300,220 L300,50 L430,50 L430,110" fill="none" stroke="var(--memo-pink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="maze-path-draw" />
                                    
                                    <!-- Dynamic points that highlight picked items -->
                                    <circle cx="40" cy="110" r="8" fill="#ef4444" class="impulse-point ip-1" />
                                    <circle cx="180" cy="220" r="8" fill="#ef4444" class="impulse-point ip-2" />
                                    <circle cx="300" cy="50" r="8" fill="#ef4444" class="impulse-point ip-3" />
                                </svg>

                                <div class="impulse-indicator ii-1">+ Bánh ngọt 🍰</div>
                                <div class="impulse-indicator ii-2">+ Nước ngọt 🥤</div>
                                <div class="impulse-indicator ii-3">+ Khăn giấy 🧻</div>
                            </div>
                        </div>

                        <div class="memo-diagram-flow">
                            <div class="flow-step m4-fs1 glass-card">
                                <div class="fs-num">1</div>
                                <div class="fs-text">Cửa vào</div>
                            </div>
                            <div class="flow-arrow m4-fa1"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m4-fs2 glass-card">
                                <div class="fs-num">2</div>
                                <div class="fs-text">Đi lòng vòng</div>
                            </div>
                            <div class="flow-arrow m4-fa2"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m4-fs3 glass-card">
                                <div class="fs-num">3</div>
                                <div class="fs-text">Lấy đồ cần mua</div>
                            </div>
                            <div class="flow-arrow m4-fa3"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m4-fs4 glass-card highlighted-step">
                                <div class="fs-num">4</div>
                                <div class="fs-text">Giỏ đồ đầy ắp</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo4_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo4-3-container">
                        <div class="memo-left-layout">
                            <div class="sensory-trap-card glass-card">
                                <div class="music-trap-section">
                                    <div class="trap-icon pulsing-indigo"><i data-lucide="music"></i></div>
                                    <div class="music-tempo-meter">
                                        <div class="tempo-bar tp-1"></div>
                                        <div class="tempo-bar tp-2"></div>
                                        <div class="tempo-bar tp-3"></div>
                                    </div>
                                    <span class="tempo-label">Nhạc chậm (60 BPM)</span>
                                </div>
                                
                                <div class="divider-vertical"></div>

                                <div class="smell-trap-section">
                                    <div class="trap-icon pulsing-pink"><i data-lucide="cookie"></i></div>
                                    <div class="scent-cloud-wrap">
                                        <div class="scent-steam st-1"></div>
                                        <div class="scent-steam st-2"></div>
                                        <div class="scent-steam st-3"></div>
                                    </div>
                                    <span class="scent-label">Mùi bánh nướng 🥐</span>
                                </div>
                            </div>

                            <div class="sensory-effects-badge glass-card">
                                <span>GIẢM TỐC ĐỘ ĐI BỘ • KÍCH THÍCH CƠN ĐÓI</span>
                            </div>
                        </div>

                        <div class="memo-right-layout">
                            <div class="memo-card-item m4-c1 glass-card">
                                <div class="mc-icon"><i data-lucide="music"></i></div>
                                <div class="mc-content">
                                    <h3>Thư giãn & Đi chậm</h3>
                                    <p>Âm nhạc nhịp độ chậm làm dịu nhịp tim, khiến khách hàng nán lại mua sắm lâu hơn.</p>
                                </div>
                            </div>
                            <div class="memo-card-item m4-c2 glass-card">
                                <div class="mc-icon"><i data-lucide="droplet"></i></div>
                                <div class="mc-content">
                                    <h3>Tấn công khứu giác</h3>
                                    <p>Mùi hương bánh nướng ngào ngạt đánh lừa dạ dày, thôi thúc giỏ hàng tích trữ.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo4_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo4-4-container">
                        <div class="checkout-trap-panel glass-card left-checkout-panel">
                            <div class="sc-title sc-red-title">BẪY CHỐT CHẶN THU NGÂN</div>
                            
                            <div class="conveyor-belt-wrap">
                                <div class="belt-track"></div>
                                <div class="belt-rollers">
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                                <div class="belt-items">
                                    <div class="b-item bi-1">🍫 Kẹo ngọt</div>
                                    <div class="b-item bi-2">🍬 Kẹo cao su</div>
                                    <div class="b-item bi-3">🔋 Pin sạc</div>
                                </div>
                            </div>

                            <div class="checkout-bars-wrap">
                                <div class="checkout-bar-item">
                                    <div class="ch-lbl">Năng lượng Ý chí (Willpower)</div>
                                    <div class="ch-progress-bg">
                                        <div class="ch-progress-fill willpower-fill" style="width: 100%;"></div>
                                    </div>
                                    <span class="ch-val-label wp-val">100%</span>
                                </div>
                                <div class="checkout-bar-item">
                                    <div class="ch-lbl">Kích thích bốc đồng (Impulse)</div>
                                    <div class="ch-progress-bg">
                                        <div class="ch-progress-fill impulse-fill" style="width: 10%;"></div>
                                    </div>
                                    <span class="ch-val-label im-val">10%</span>
                                </div>
                            </div>
                        </div>

                        <div class="checkout-trap-panel glass-card right-checkout-panel">
                            <div class="sc-title sc-blue-title">QUYẾT ĐỊNH BỊ HẠ GỤC</div>
                            
                            <div class="willpower-depletion-gfx">
                                <div class="willpower-brain-glow vibrate-active">
                                    <i data-lucide="zap-off" class="depleted-icon"></i>
                                </div>
                                <div class="willpower-status-alert alert-inactive">Ý CHÍ VỮNG VÀNG</div>
                            </div>

                            <div class="checkout-labels-group">
                                <span class="checkout-desc-txt">Kiệt sức đưa ra quyết định (Decision Fatigue)</span>
                                <span class="checkout-status-tag text-blue">CHƯA BỊ CÁM DỖ</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: {
                    class: 'lucide-icon-custom'
                },
                nameAttr: 'data-lucide'
            });
        }
    }

    // ── ANIMATION FRAME UPDATES ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_memo4_1') {
            const cart = canvas.querySelector('.cart-basket');
            const items = canvas.querySelectorAll('.item-drop');
            const counterVal = canvas.querySelector('.counter-value');

            // Move cart across screen horizontally
            if (cart) {
                const xPos = -100 + progress * 160; // moves from -100px to 60px
                cart.style.transform = `translateX(${xPos}px)`;
                
                // Fast vibration shake reflecting speed
                const shake = Math.sin(progress * 150) * 1.5;
                cart.style.transform += ` translateY(${shake}px)`;
            }

            // Drop items in cart sequentially
            // milk(1), apple(2), bread(3) represent the initial 3 planned items.
            // Rest are impulse buys.
            let itemsCount = 3;
            items.forEach((item, idx) => {
                const triggerProgress = (idx * 0.08); // reveal item every 8% progress
                if (progress > triggerProgress) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                    if (idx >= 3) {
                        itemsCount = 3 + Math.floor((progress - 0.24) / 0.06);
                        itemsCount = Math.max(3, Math.min(12, itemsCount));
                    }
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.5) translateY(-80px)';
                }
            });

            if (counterVal) {
                counterVal.textContent = `${itemsCount} món`;
                if (itemsCount > 3) {
                    counterVal.style.color = '#f472b6';
                    counterVal.textContent += ' (Lãng phí! 💸)';
                } else {
                    counterVal.style.color = '#10b981';
                }
            }
        }
        else if (slideId === 'slide_memo4_2') {
            const pathDraw = canvas.querySelector('.maze-path-draw');
            const ip1 = canvas.querySelector('.ip-1');
            const ip2 = canvas.querySelector('.ip-2');
            const ip3 = canvas.querySelector('.ip-3');
            const ii1 = canvas.querySelector('.ii-1');
            const ii2 = canvas.querySelector('.ii-2');
            const ii3 = canvas.querySelector('.ii-3');

            // Flow steps
            const fs1 = canvas.querySelector('.m4-fs1');
            const fa1 = canvas.querySelector('.m4-fa1');
            const fs2 = canvas.querySelector('.m4-fs2');
            const fa2 = canvas.querySelector('.m4-fa2');
            const fs3 = canvas.querySelector('.m4-fs3');
            const fa3 = canvas.querySelector('.m4-fa3');
            const fs4 = canvas.querySelector('.m4-fs4');

            // Draw route line
            if (pathDraw) {
                // Total length of svg path is around 800px
                const dashOffset = 800 - (progress * 800);
                pathDraw.style.strokeDashoffset = dashOffset.toString();
                pathDraw.style.strokeDasharray = '800';
            }

            // Impulse purchase alerts pop up along the path
            if (progress > 0.25) {
                if (ip1) ip1.style.opacity = '1';
                if (ii1) { ii1.style.opacity = '1'; ii1.style.transform = 'scale(1)'; }
            } else {
                if (ip1) ip1.style.opacity = '0';
                if (ii1) { ii1.style.opacity = '0'; ii1.style.transform = 'scale(0.5)'; }
            }

            if (progress > 0.5) {
                if (ip2) ip2.style.opacity = '1';
                if (ii2) { ii2.style.opacity = '1'; ii2.style.transform = 'scale(1)'; }
            } else {
                if (ip2) ip2.style.opacity = '0';
                if (ii2) { ii2.style.opacity = '0'; ii2.style.transform = 'scale(0.5)'; }
            }

            if (progress > 0.75) {
                if (ip3) ip3.style.opacity = '1';
                if (ii3) { ii3.style.opacity = '1'; ii3.style.transform = 'scale(1)'; }
            } else {
                if (ip3) ip3.style.opacity = '0';
                if (ii3) { ii3.style.opacity = '0'; ii3.style.transform = 'scale(0.5)'; }
            }

            // Diagram flow steps sequence
            if (fs1) fs1.style.opacity = progress > 0.08 ? '1' : '0.2';
            if (fa1) fa1.style.opacity = progress > 0.22 ? '1' : '0.2';
            if (fs2) fs2.style.opacity = progress > 0.35 ? '1' : '0.2';
            if (fa2) fa2.style.opacity = progress > 0.52 ? '1' : '0.2';
            if (fs3) fs3.style.opacity = progress > 0.65 ? '1' : '0.2';
            if (fa3) fa3.style.opacity = progress > 0.78 ? '1' : '0.2';
            if (fs4) {
                if (progress > 0.85) {
                    fs4.style.opacity = '1';
                    fs4.classList.add('pulse-glow');
                } else {
                    fs4.style.opacity = '0.2';
                    fs4.classList.remove('pulse-glow');
                }
            }
        }
        else if (slideId === 'slide_memo4_3') {
            const card1 = canvas.querySelector('.m4-c1');
            const card2 = canvas.querySelector('.m4-c2');
            const tp1 = canvas.querySelector('.tp-1');
            const tp2 = canvas.querySelector('.tp-2');
            const tp3 = canvas.querySelector('.tp-3');
            const steams = canvas.querySelectorAll('.scent-steam');

            // Slow tempo music bar chart oscillation
            const tSpeed = progress * 15;
            if (tp1) tp1.style.height = `${30 + Math.abs(Math.sin(tSpeed)) * 40}%`;
            if (tp2) tp2.style.height = `${20 + Math.abs(Math.cos(tSpeed + 1)) * 50}%`;
            if (tp3) tp3.style.height = `${40 + Math.abs(Math.sin(tSpeed + 2)) * 30}%`;

            // Rising bakery scent clouds
            steams.forEach((st, idx) => {
                const sProgress = (progress * 5 + idx * 0.33) % 1.0;
                st.style.transform = `translateY(${-sProgress * 80}px) scale(${0.5 + sProgress * 1.5})`;
                st.style.opacity = (0.8 - sProgress).toString();
            });

            // Reveal cards sequentially
            if (progress > 0.15) {
                const r = Math.min(1, (progress - 0.15) / 0.15);
                if (card1) { card1.style.opacity = r.toString(); card1.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card1) { card1.style.opacity = '0'; card1.style.transform = 'translateX(-20px)'; }
            }

            if (progress > 0.55) {
                const r = Math.min(1, (progress - 0.55) / 0.15);
                if (card2) { card2.style.opacity = r.toString(); card2.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card2) { card2.style.opacity = '0'; card2.style.transform = 'translateX(-20px)'; }
            }
        }
        else if (slideId === 'slide_memo4_4') {
            const wpFill = canvas.querySelector('.willpower-fill');
            const wpVal = canvas.querySelector('.wp-val');
            const imFill = canvas.querySelector('.impulse-fill');
            const imVal = canvas.querySelector('.im-val');
            const brainGlow = canvas.querySelector('.willpower-brain-glow');
            const alertText = canvas.querySelector('.willpower-status-alert');
            const checkoutStatus = canvas.querySelector('.checkout-status-tag');
            const itemsGroup = canvas.querySelector('.belt-items');

            // Willpower depletion (100% -> 15%) & Impulse rising (10% -> 90%)
            let willpower = 100;
            let impulse = 10;

            if (progress < 0.8) {
                const r = progress / 0.8;
                willpower = Math.round(100 - 85 * r);
                impulse = Math.round(10 + 80 * r);
            } else {
                willpower = 15;
                impulse = 90;
            }

            if (wpFill) wpFill.style.width = `${willpower}%`;
            if (wpVal) wpVal.textContent = `${willpower}%`;

            if (imFill) imFill.style.width = `${impulse}%`;
            if (imVal) imVal.textContent = `${impulse}%`;

            // Conveyor belt moving items
            if (itemsGroup) {
                const beltPos = (progress * 180) % 150;
                itemsGroup.style.transform = `translateX(${beltPos - 120}px)`;
            }

            // System status triggers when willpower drops below impulse (around progress > 0.45)
            if (willpower < impulse && progress > 0.4) {
                if (brainGlow) {
                    brainGlow.style.background = 'rgba(239, 68, 68, 0.15)';
                    brainGlow.style.borderColor = '#ef4444';
                    brainGlow.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
                    brainGlow.style.color = '#ef4444';
                }
                if (alertText) {
                    alertText.textContent = "Ý CHÍ CẠN KIỆT! 😰";
                    alertText.className = "willpower-status-alert alert-active";
                }
                if (checkoutStatus) {
                    checkoutStatus.textContent = "BỊ CÁM DỖ: NHẶT KẸO!";
                    checkoutStatus.className = "checkout-status-tag text-red";
                }
            } else {
                if (brainGlow) {
                    brainGlow.style.background = 'rgba(99, 102, 241, 0.12)';
                    brainGlow.style.borderColor = 'rgba(99, 102, 241, 0.35)';
                    brainGlow.style.boxShadow = 'none';
                    brainGlow.style.color = 'var(--memo-indigo)';
                }
                if (alertText) {
                    alertText.textContent = "Ý CHÍ VỮNG VÀNG";
                    alertText.className = "willpower-status-alert alert-inactive";
                }
                if (checkoutStatus) {
                    checkoutStatus.textContent = "CHƯA BỊ CÁM DỖ";
                    checkoutStatus.className = "checkout-status-tag text-blue";
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video4',
        topic: 'Supermarket Maze',
        episodeNum: 4,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 4 Plugin] Loaded: Supermarket Psychological Maze ready.');
})();
