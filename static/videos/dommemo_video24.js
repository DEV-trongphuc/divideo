/**
 * DOM Memo Video 24: Mere Exposure Effect (Hiệu ứng tiếp xúc)
 * Custom script plugin driving familiarity loops, defensive shield decay, face morphing, and card highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo24_1: [
            { text: 'lần đầu tiên gặp', start: 1.5, end: 4.5, class: 'active-crimson' },
            { text: 'càng gặp lại càng thấy thích', start: 5.0, end: 8.0, class: 'active-indigo' },
            { text: 'nghiện lúc nào không hay', start: 8.5, end: 11.2, class: 'active-indigo' }
        ],
        slide_memo24_2: [
            { text: 'giảm bớt cảnh giác', start: 1.5, end: 4.5, class: 'active-crimson' },
            { text: 'tăng cảm giác an toàn', start: 4.8, end: 7.8, class: 'active-indigo' },
            { text: 'phản ứng ưa thích tự nhiên', start: 8.2, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo24_3: [
            { text: 'chỉ số phòng vệ rất cao', start: 2.0, end: 5.0, class: 'active-crimson' },
            { text: 'lần thứ mười', start: 5.5, end: 8.5, class: 'active-indigo' },
            { text: 'yêu thích', start: 9.0, end: 12.0, class: 'active-indigo' }
        ],
        slide_memo24_4: [
            { text: 'báo động đỏ', start: 2.0, end: 5.0, class: 'active-crimson' },
            { text: 'não thùy trán hoạt động mượt mà', start: 5.5, end: 8.5, class: 'active-indigo' },
            { text: 'yêu thích nó', start: 9.0, end: 11.5, class: 'active-indigo' }
        ],
        slide_memo24_5: [
            { text: 'đừng vội ghét', start: 1.5, end: 4.5, class: 'active-crimson' },
            { text: 'tiếp xúc thêm vài lần', start: 4.8, end: 7.8, class: 'active-indigo' },
            { text: 'tìm thấy điểm thú vị', start: 8.2, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo24_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-indigo' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-crimson' }
        ]
    };

    const customSlideIds = [
        'slide_memo24_1', 'slide_memo24_2', 'slide_memo24_3', 'slide_memo24_4', 'slide_memo24_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo24_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo24-1-container">
                        <!-- Floating Exposure Particles -->
                        <span class="ambient-exposure-particle-v24" style="top: 15%; left: 8%; animation-delay: -1s;">🎵</span>
                        <span class="ambient-exposure-particle-v24" style="top: 75%; left: 88%; animation-delay: -3s;">👥</span>
                        <span class="ambient-exposure-particle-v24" style="top: 20%; left: 80%; animation-delay: -5s;">🍜</span>

                        <div class="exposure-hook-box">
                            <div class="pulsing-music-note">🎵</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo24_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo24-2-container">
                        <span class="ambient-exposure-particle-v24" style="top: 8%; left: 85%; animation-delay: -2s;">👥</span>
                        <span class="ambient-exposure-particle-v24" style="top: 82%; left: 10%; animation-delay: -4s;">🍜</span>

                        <div class="exposure-diagram-board">
                            <div class="diagram-node-v24 node-exposure">
                                <span class="diagram-node-icon">🔄</span>
                                <span>1. Lặp Tiếp Xúc</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v24 node-threat">
                                <span class="diagram-node-icon">🛡️</span>
                                <span>2. Giảm Cảnh Giác</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v24 node-ease">
                                <span class="diagram-node-icon">🧠</span>
                                <span>3. Thân Thuộc</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Mere Exposure Effect*: Tiến hóa lập trình não bộ cảnh giác với người lạ/vật lạ để sinh tồn. Sự tiếp xúc lặp lại an toàn chứng minh đối tượng vô hại, kích hoạt cơ chế nhận thức dễ dàng (Cognitive Ease) để chuyển hóa sang yêu thích.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo24_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo24-3-container">
                        <span class="ambient-exposure-particle-v24" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-exposure-particle-v24" style="top: 80%; left: 82%; animation-delay: -5s;">🔄</span>

                        <!-- Left Panel: Exposure shield loop -->
                        <div class="exposure-panel-v24">
                            <div class="loop-counter-badge">TIẾP XÚC: LẦN 1</div>
                            <div class="shield-layer-v24"></div>
                            <div class="exposure-object-v24">👽</div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="exposure-dashboard-v24">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                PHÂN TÍCH NHẬN THỨC
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Thái độ phản ứng</span>
                                <span class="exposure-status-badge alert">E DÈ / XA LẠ</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Trạng thái an toàn*: Mức độ quen thuộc tăng tỉ lệ thuận với số lần tiếp xúc, đồng thời làm hao mòn màng chắn phòng vệ của hạch hạnh nhân.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo24_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo24-4-container">
                        <span class="ambient-exposure-particle-v24" style="top: 12%; left: 85%; animation-delay: -2s;">👥</span>
                        <span class="ambient-exposure-particle-v24" style="top: 78%; left: 12%; animation-delay: -5s;">🍜</span>

                        <div class="comp-row-v24">
                            <!-- Left Card: First Encounter -->
                            <div class="comp-card-v24 card-theme-alarm card-active">
                                <div class="comp-header-v24">
                                    <h3>LẦN ĐẦU GẶP GỠ</h3>
                                    <div class="comp-icon-v24">🚨</div>
                                </div>

                                <div class="comp-bullet-list-v24">
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">❌</span>
                                        <span>Hạch hạnh nhân báo động cảnh giác</span>
                                    </div>
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">❌</span>
                                        <span>Đánh giá đề phòng cao độ</span>
                                    </div>
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">❌</span>
                                        <span>Cảm nhận sự e dè, bất an tự nhiên</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v24">CẢNH GIÁC CAO ĐỘ</div>
                            </div>

                            <!-- Right Card: Tenth Encounter -->
                            <div class="comp-card-v24 card-theme-ease card-inactive">
                                <div class="comp-header-v24">
                                    <h3>LẦN THỨ MƯỜI GẶP</h3>
                                    <div class="comp-icon-v24">💖</div>
                                </div>

                                <div class="comp-bullet-list-v24">
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">✨</span>
                                        <span>Tắt hoàn toàn phản ứng báo động đỏ</span>
                                    </div>
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">✨</span>
                                        <span>Kích hoạt thùy trán xử lý trơn tru</span>
                                    </div>
                                    <div class="comp-bullet-row-v24">
                                        <span class="comp-bullet-icon-v24">✨</span>
                                        <span>Nảy sinh cảm tình & yêu mến tự thân</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v24">NHẬN THỨC DỄ DÀNG</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo24_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo24-5-container">
                        <div class="takeaway-radar-v24"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v24" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v24">🌱</div>
                            <div class="takeaway-text-v24">
                                "Đừng vội từ bỏ những bài học mới, người bạn mới hay món ăn mới. Hãy cho não bộ cơ hội tiếp xúc đủ lâu để làm quen và yêu thích chúng nhé!"
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
        if (slideId === 'slide_memo24_1') {
            const note = canvas.querySelector('.pulsing-music-note');
            if (note) {
                note.style.transform = `rotate(${progress * 360}deg) scale(${1.2 + Math.sin(progress * 15) * 0.15})`;
            }
            if (isPlaying && Math.random() < 0.1) {
                const heart = document.createElement('span');
                heart.className = 'hook-exposure-heart';
                heart.textContent = Math.random() > 0.5 ? '❤️' : '💖';
                heart.style.left = `${300 + Math.random() * 300}px`;
                heart.style.top = `${150 + Math.random() * 150}px`;
                const container = canvas.querySelector('.exposure-hook-box');
                if (container) container.appendChild(heart);
                setTimeout(() => heart.remove(), 2000);
            }
        }
        else if (slideId === 'slide_memo24_2') {
            const expNode = canvas.querySelector('.node-exposure');
            const threatNode = canvas.querySelector('.node-threat');
            const easeNode = canvas.querySelector('.node-ease');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (expNode) expNode.classList.add('active-node');
                if (threatNode) threatNode.classList.add('active-node');
                if (easeNode) easeNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.add('highlight-link-indigo');
                    arrow2.classList.remove('highlight-link');
                }
            } else if (progress >= 0.35) {
                if (expNode) expNode.classList.add('active-node');
                if (threatNode) threatNode.classList.add('active-node');
                if (easeNode) easeNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-indigo');
                    arrow2.classList.remove('highlight-link');
                }
            } else {
                if (expNode) expNode.classList.add('active-node');
                if (threatNode) threatNode.classList.remove('active-node');
                if (easeNode) easeNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-indigo');
                    arrow2.classList.remove('highlight-link');
                }
            }
        }
        else if (slideId === 'slide_memo24_3') {
            const badge = canvas.querySelector('.loop-counter-badge');
            const shield = canvas.querySelector('.shield-layer-v24');
            const obj = canvas.querySelector('.exposure-object-v24');
            const statusTag = canvas.querySelector('.exposure-status-badge');

            if (progress < 0.33) {
                // Loop 1
                if (badge) badge.textContent = 'TIẾP XÚC: LẦN 1';
                if (shield) {
                    shield.className = 'shield-layer-v24';
                    shield.style.transform = `rotate(${progress * 60}deg) scale(1)`;
                }
                if (obj) {
                    obj.textContent = '👽';
                    obj.style.transform = 'scale(1)';
                }
                if (statusTag) {
                    statusTag.textContent = 'E DÈ / XA LẠ';
                    statusTag.className = 'exposure-status-badge alert';
                }
            } else if (progress >= 0.33 && progress < 0.66) {
                // Loop 5
                if (badge) badge.textContent = 'TIẾP XÚC: LẦN 5';
                if (shield) {
                    shield.className = 'shield-layer-v24 shield-weak';
                    shield.style.transform = `rotate(${progress * 120}deg) scale(1.05)`;
                }
                if (obj) {
                    obj.textContent = '🤔';
                    obj.style.transform = 'scale(1.1)';
                }
                if (statusTag) {
                    statusTag.textContent = 'BÌNH THƯỜNG / QUEN';
                    statusTag.className = 'exposure-status-badge alert';
                }
            } else {
                // Loop 10
                if (badge) badge.textContent = 'TIẾP XÚC: LẦN 10';
                if (shield) {
                    shield.className = 'shield-layer-v24 shield-off';
                    shield.style.transform = `rotate(${progress * 180}deg) scale(1.15)`;
                    shield.style.opacity = '0';
                    shield.style.transition = 'all 0.5s ease';
                }
                if (obj) {
                    obj.textContent = '🥰';
                    obj.style.transform = 'scale(1.25)';
                }
                if (statusTag) {
                    statusTag.textContent = 'YÊU THÍCH / AN TOÀN';
                    statusTag.className = 'exposure-status-badge safe';
                }
            }
        }
        else if (slideId === 'slide_memo24_4') {
            const alarmCard = canvas.querySelector('.card-theme-alarm');
            const easeCard = canvas.querySelector('.card-theme-ease');

            if (progress < 0.5) {
                if (alarmCard) {
                    alarmCard.classList.remove('card-inactive');
                    alarmCard.classList.add('card-active');
                }
                if (easeCard) {
                    easeCard.classList.remove('card-active');
                    easeCard.classList.add('card-inactive');
                }
            } else {
                if (alarmCard) {
                    alarmCard.classList.remove('card-active');
                    alarmCard.classList.add('card-inactive');
                }
                if (easeCard) {
                    easeCard.classList.remove('card-inactive');
                    easeCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const alarmBullets = alarmCard ? alarmCard.querySelectorAll('.comp-bullet-row-v24') : [];
            const easeBullets = easeCard ? easeCard.querySelectorAll('.comp-bullet-row-v24') : [];

            alarmBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            easeBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo24_5') {
            const box = canvas.querySelector('.takeaway-box-v24');
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
        scriptName: 'video24',
        topic: 'Mere Exposure',
        episodeNum: 24,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 24 Plugin] Loaded: Mere Exposure ready.');
})();
