/**
 * DOM Memo Video 19: Price Placebo (Ảo giác giá cả)
 * Custom script plugin driving glass selection, satisfaction dials, brain activity glow, and comparison cards.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo19_1: [
            { text: 'dán nhãn giá đắt đỏ', start: 1.5, end: 4.5, class: 'active-gold' },
            { text: 'lập tức cảm thấy nó ngon hơn', start: 5.0, end: 8.2, class: 'active-red' },
            { text: 'chất lượng hơn hẳn', start: 8.5, end: 11.0, class: 'active-gold' }
        ],
        slide_memo19_2: [
            { text: 'hiệu ứng giả dược', start: 1.5, end: 4.5, class: 'active-gold' },
            { text: 'mã hóa thông tin', start: 4.8, end: 7.8, class: 'active-red' },
            { text: 'sự hài lòng thực tế', start: 8.2, end: 11.2, class: 'active-gold' }
        ],
        slide_memo19_3: [
            { text: 'hai ly nước giống hệt nhau', start: 2.0, end: 5.0, class: 'active-red' },
            { text: 'kích hoạt vùng thỏa mãn', start: 5.5, end: 8.5, class: 'active-gold' },
            { text: 'chín mươi lăm phần trăm', start: 9.0, end: 12.0, class: 'active-gold' }
        ],
        slide_memo19_4: [
            { text: 'hoàn toàn đồng nhất', start: 2.0, end: 5.0, class: 'active-red' },
            { text: 'khoái cảm vượt trội', start: 5.5, end: 8.5, class: 'active-gold' },
            { text: 'não tự thêu dệt nên', start: 9.0, end: 11.5, class: 'active-gold' }
        ],
        slide_memo19_5: [
            { text: 'nhãn giá đắt đỏ che mờ', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'rèn luyện sự tỉnh thức', start: 4.8, end: 7.8, class: 'active-gold' },
            { text: 'cảm nhận giá trị thực', start: 8.2, end: 11.0, class: 'active-gold' }
        ],
        slide_memo19_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-gold' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-red' }
        ]
    };

    const customSlideIds = [
        'slide_memo19_1', 'slide_memo19_2', 'slide_memo19_3', 'slide_memo19_4', 'slide_memo19_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo19_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo19-1-container">
                        <!-- Floating Price Particles -->
                        <span class="ambient-price-particle" style="top: 15%; left: 8%; animation-delay: -1s;">$100</span>
                        <span class="ambient-price-particle" style="top: 75%; left: 88%; animation-delay: -3s;">$10</span>
                        <span class="ambient-price-particle" style="top: 25%; left: 80%; animation-delay: -5s;">💵</span>

                        <div class="price-hook-box">
                            <div class="wine-bottle-container">
                                <span class="wine-bottle-icon">🍷</span>
                                <div class="price-tag-badge tag-ten-dollar">Giá: $10</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo19_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo19-2-container">
                        <span class="ambient-price-particle" style="top: 8%; left: 85%; animation-delay: -2s;">🍷</span>
                        <span class="ambient-price-particle" style="top: 82%; left: 10%; animation-delay: -4s;">💵</span>

                        <div class="price-diagram-board">
                            <div class="diagram-node-v19 node-tag">
                                <span class="diagram-node-icon">🏷️</span>
                                <span>1. Nhãn Giá Cao</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v19 node-expectation">
                                <span class="diagram-node-icon">💭</span>
                                <span>2. Tạo Kỳ Vọng</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v19 node-pleasure">
                                <span class="diagram-node-icon">🧠</span>
                                <span>3. Vùng Thỏa Mãn</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *消费安慰剂效应*: Cùng một hoạt chất, nhưng khi người thử biết nó đắt tiền, thùy trán trước của não bộ lập tức kích thích tín hiệu khoái cảm mạnh hơn, thay đổi hương vị cảm nhận thực tế.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo19_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo19-3-container">
                        <span class="ambient-price-particle" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-price-particle" style="top: 80%; left: 82%; animation-delay: -5s;">🍷</span>

                        <!-- Left Panel: Two glasses -->
                        <div class="drink-panel-v19">
                            <div class="wine-glass-option option-ten selected-glass">
                                <span style="font-size: 55px;">🍷</span>
                                <span class="glass-tag">$10 Wine</span>
                            </div>
                            <div class="wine-glass-option option-hundred">
                                <span style="font-size: 55px;">🍷</span>
                                <span class="glass-tag">$100 Wine</span>
                            </div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="satisfaction-dashboard-v19">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                CHỈ SỐ THỎA MÃN
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái hoạt động não</span>
                                <span class="satisfaction-status-badge low">Bình thường (40%)</span>
                            </div>

                            <div style="margin-top: 5px;">
                                <div style="font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 6px; display: flex; justify-content: space-between;">
                                    <span>Độ sáng vùng khoái cảm:</span>
                                    <span class="satisfaction-val" style="font-weight: 700; color: #fff;">40%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
                                    <div class="satisfaction-bar" style="width: 40%; height: 100%; background: var(--memo19-red); transition: all 0.3s ease;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo19_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo19-4-container">
                        <span class="ambient-price-particle" style="top: 12%; left: 85%; animation-delay: -2s;">💵</span>
                        <span class="ambient-price-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v19">
                            <!-- Left Card: Chemical Molecules -->
                            <div class="comp-card-v19 card-theme-liquid card-active">
                                <div class="comp-header-v19">
                                    <h3>THÀNH PHẦN HOÁ HỌC</h3>
                                    <div class="comp-icon-v19">🧪</div>
                                </div>

                                <div class="comp-bullet-list-v19">
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">✨</span>
                                        <span>Phân tử chất lỏng giống nhau 100%</span>
                                    </div>
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">✨</span>
                                        <span>Nồng độ cồn và lượng đường tương đồng</span>
                                    </div>
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">✨</span>
                                        <span>Không có sự khác biệt ở lưỡi</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v19">ĐỒNG NHẤT VẬT LÝ</div>
                            </div>

                            <!-- Right Card: Subjective Experience -->
                            <div class="comp-card-v19 card-theme-reward card-inactive">
                                <div class="comp-header-v19">
                                    <h3>TRẢI NGHIỆM CHỦ QUAN</h3>
                                    <div class="comp-icon-v19">👑</div>
                                </div>

                                <div class="comp-bullet-list-v19">
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">🔥</span>
                                        <span>Não tự kích hoạt kì vọng ngon hơn</span>
                                    </div>
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">🔥</span>
                                        <span>Tăng lượng dopamine giải phóng</span>
                                    </div>
                                    <div class="comp-bullet-row-v19">
                                        <span class="comp-bullet-icon-v19">🔥</span>
                                        <span>Kéo dài dư vị hài lòng trong tâm trí</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v19">BẢN DỰNG KỲ VỌNG</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo19_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo19-5-container">
                        <div class="takeaway-radar-v19"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v19" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v19">🧘</div>
                            <div class="takeaway-text-v19">
                                "Đừng để những mác giá hàng hiệu che lấp cảm xúc thuần túy của bạn. Hãy thưởng thức một cách tỉnh thức để nhận định đúng giá trị thực!"
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons if loaded
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
        if (slideId === 'slide_memo19_1') {
            const tag = canvas.querySelector('.price-tag-badge');
            const bottle = canvas.querySelector('.wine-bottle-icon');
            if (tag) {
                if (progress >= 0.5) {
                    tag.textContent = 'Giá: $90 👑';
                    tag.className = 'price-tag-badge tag-ninety-dollar';
                    tag.style.transform = 'scale(1.4)';
                    tag.style.background = 'var(--memo19-gold)';
                    tag.style.boxShadow = '0 0 25px var(--memo19-gold)';
                } else {
                    tag.textContent = 'Giá: $10';
                    tag.className = 'price-tag-badge tag-ten-dollar';
                    tag.style.transform = 'scale(1)';
                    tag.style.background = '';
                    tag.style.boxShadow = '';
                }
            }
            if (bottle) {
                const r = Math.sin(progress * Math.PI * 4) * 8;
                bottle.style.transform = `rotate(${r}deg) scale(1.3)`;
            }
        }
        else if (slideId === 'slide_memo19_2') {
            const tagNode = canvas.querySelector('.node-tag');
            const expectNode = canvas.querySelector('.node-expectation');
            const pleasureNode = canvas.querySelector('.node-pleasure');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Diagram flow transition sequential reveal
            if (progress >= 0.7) {
                if (tagNode) tagNode.classList.add('active-node');
                if (expectNode) expectNode.classList.add('active-node');
                if (pleasureNode) pleasureNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (tagNode) tagNode.classList.add('active-node');
                if (expectNode) expectNode.classList.add('active-node');
                if (pleasureNode) pleasureNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            } else {
                if (tagNode) tagNode.classList.add('active-node');
                if (expectNode) expectNode.classList.remove('active-node');
                if (pleasureNode) pleasureNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo19_3') {
            const optTen = canvas.querySelector('.option-ten');
            const optHundred = canvas.querySelector('.option-hundred');
            const statusTag = canvas.querySelector('.satisfaction-status-badge');
            const valText = canvas.querySelector('.satisfaction-val');
            const bar = canvas.querySelector('.satisfaction-bar');

            if (progress < 0.5) {
                // Focus on $10 wine
                if (optTen) optTen.classList.add('selected-glass');
                if (optHundred) optHundred.classList.remove('selected-glass');
                if (statusTag) {
                    statusTag.textContent = 'Bình thường (40%)';
                    statusTag.className = 'satisfaction-status-badge low';
                }
                
                // Dynamically grow bar up to 40%
                const currentPercent = Math.round(Math.min(40, progress * 2 * 40));
                if (valText) valText.textContent = `${currentPercent}%`;
                if (bar) {
                    bar.style.width = `${currentPercent}%`;
                    bar.style.background = 'var(--memo19-red)';
                }
            } else {
                // Focus on $100 wine
                if (optTen) optTen.classList.remove('selected-glass');
                if (optHundred) optHundred.classList.add('selected-glass');
                if (statusTag) {
                    statusTag.textContent = 'Hưng phấn cực độ (95%)';
                    statusTag.className = 'satisfaction-status-badge high';
                }
                
                // Dynamically grow bar from 40% to 95%
                const ratio = (progress - 0.5) / 0.5;
                const currentPercent = Math.round(40 + ratio * 55);
                if (valText) valText.textContent = `${currentPercent}%`;
                if (bar) {
                    bar.style.width = `${currentPercent}%`;
                    bar.style.background = 'var(--memo19-gold)';
                }
            }
        }
        else if (slideId === 'slide_memo19_4') {
            const liquidCard = canvas.querySelector('.card-theme-liquid');
            const rewardCard = canvas.querySelector('.card-theme-reward');

            if (progress < 0.5) {
                if (liquidCard) {
                    liquidCard.classList.remove('card-inactive');
                    liquidCard.classList.add('card-active');
                }
                if (rewardCard) {
                    rewardCard.classList.remove('card-active');
                    rewardCard.classList.add('card-inactive');
                }
            } else {
                if (liquidCard) {
                    liquidCard.classList.remove('card-active');
                    liquidCard.classList.add('card-inactive');
                }
                if (rewardCard) {
                    rewardCard.classList.remove('card-inactive');
                    rewardCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const liquidBullets = liquidCard ? liquidCard.querySelectorAll('.comp-bullet-row-v19') : [];
            const rewardBullets = rewardCard ? rewardCard.querySelectorAll('.comp-bullet-row-v19') : [];

            liquidBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            rewardBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.5 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });
        }
        else if (slideId === 'slide_memo19_5') {
            const box = canvas.querySelector('.takeaway-box-v19');
            if (box) {
                if (progress > 0.2) {
                    box.style.transform = 'scale(1) translateY(0)';
                    box.style.opacity = '1';
                    box.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    box.style.transform = 'scale(0.9) translateY(20px)';
                    box.style.opacity = '0';
                    box.style.transition = 'all 0.3s ease';
                }
            }
        }
    }

    // ── PUBLIC API REGISTRATION ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video19',
        topic: 'Price Placebo',
        episodeNum: 19,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 19 Plugin] Loaded: Price Placebo ready.');
})();
