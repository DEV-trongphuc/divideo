/**
 * DOM Memo Video 26: Sleep Deprivation & Emotion (Thiếu ngủ & Cảm xúc)
 * Custom script plugin driving chat bubble vibration shake, rested/tired interpreter, and threat scanner stats.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo26_1: [
            { text: 'thiếu ngủ hoặc mệt mỏi', start: 1.5, end: 4.5, class: 'active-violet' },
            { text: 'câu trả lời ngắn gọn', start: 5.0, end: 8.0, class: 'active-green' },
            { text: 'đang có ý đồ xấu', start: 8.5, end: 11.2, class: 'active-violet' }
        ],
        slide_memo26_2: [
            { text: 'giảm kết nối', start: 1.5, end: 4.5, class: 'active-violet' },
            { text: 'vỏ não trước trán', start: 4.8, end: 7.8, class: 'active-green' },
            { text: 'diễn dịch mọi tín hiệu thành mối đe dọa', start: 8.2, end: 11.0, class: 'active-violet' }
        ],
        slide_memo26_3: [
            { text: 'ngủ đủ giấc', start: 2.0, end: 5.0, class: 'active-green' },
            { text: 'nhận diện là trung tính', start: 5.5, end: 8.5, class: 'active-green' },
            { text: 'diễn dịch tin nhắn đó thành hành vi gây hấn', start: 9.0, end: 12.0, class: 'active-violet' }
        ],
        slide_memo26_4: [
            { text: 'hoạt động khách quan', start: 2.0, end: 5.0, class: 'active-green' },
            { text: 'bóp méo nhận thức', start: 5.5, end: 8.5, class: 'active-violet' },
            { text: 'phóng đại sự đe dọa', start: 9.0, end: 11.5, class: 'active-violet' }
        ],
        slide_memo26_5: [
            { text: 'thảo luận căng thẳng khi đang thiếu ngủ', start: 1.5, end: 4.5, class: 'active-violet' },
            { text: 'đi ngủ sớm', start: 4.8, end: 7.8, class: 'active-green' },
            { text: 'nhìn nhận mọi việc nhẹ nhàng hơn', start: 8.2, end: 11.0, class: 'active-green' }
        ],
        slide_memo26_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-green' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-violet' }
        ]
    };

    const customSlideIds = [
        'slide_memo26_1', 'slide_memo26_2', 'slide_memo26_3', 'slide_memo26_4', 'slide_memo26_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo26_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo26-1-container">
                        <!-- Floating Particles -->
                        <span class="ambient-sleep-particle-v26" style="top: 15%; left: 8%; animation-delay: -1s;">💤</span>
                        <span class="ambient-sleep-particle-v26" style="top: 75%; left: 88%; animation-delay: -3s;">💬</span>
                        <span class="ambient-sleep-particle-v26" style="top: 20%; left: 80%; animation-delay: -5s;">🔋</span>

                        <div class="sleep-hook-box">
                            <div class="hook-angry-cloud-v26" style="opacity: 0; left: 160px; top: 80px;">😡</div>
                            <div class="hook-chat-bubble">Ok.</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo26_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo26-2-container">
                        <span class="ambient-sleep-particle-v26" style="top: 8%; left: 85%; animation-delay: -2s;">💬</span>
                        <span class="ambient-sleep-particle-v26" style="top: 82%; left: 10%; animation-delay: -4s;">💤</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v26 node-sleep">
                                <span class="diagram-node-icon">💤</span>
                                <span>1. Thiếu Ngủ</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v26 node-pfc">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. PFC Mất Kết Nối</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v26 node-amygdala">
                                <span class="diagram-node-icon">🌋</span>
                                <span>3. Amygdala Quá Tải</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Sleep & Emotional Regulation*: Khi thiếu ngủ, vùng vỏ não trước trán (PFC) giảm kiểm soát hạch hạnh nhân (Amygdala) đến sáu mươi phần trăm. Không bị kìm hãm, Amygdala hoạt động quá mức, liên tục dự đoán tiêu cực.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo26_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo26-3-container">
                        <span class="ambient-sleep-particle-v26" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-sleep-particle-v26" style="top: 80%; left: 82%; animation-delay: -5s;">💬</span>

                        <!-- Left Panel: Chat bubble parser -->
                        <div class="chat-bubble-panel-v26">
                            <div class="state-indicator-badge rested">ĐỦ GIẤC (RESTED)</div>
                            <div class="chat-bubble-sim rested-state">Ok.</div>
                            <div class="interpretation-lbl">Ý nghĩa: Đồng ý bình thường</div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="amygdala-dashboard-v26">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                PHÂN TÍCH DIỄN DỊCH
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Hoạt động Amygdala</span>
                                <span class="amygdala-status-badge calm">An Toàn (20%)</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Sai lệch nhận thức*: Thiếu ngủ làm sai lệch khả năng đọc hiểu ngữ cảnh xã hội, biến các thông điệp khách quan thành mối đe dọa mang tính thù hằn cá nhân.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo26_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo26-4-container">
                        <span class="ambient-sleep-particle-v26" style="top: 12%; left: 85%; animation-delay: -2s;">💤</span>
                        <span class="ambient-sleep-particle-v26" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v26">
                            <!-- Left Card: Rested -->
                            <div class="comp-card-v26 card-theme-rested card-active">
                                <div class="comp-header-v26">
                                    <h3>NGỦ ĐỦ GIẤC</h3>
                                    <div class="comp-icon-v26">🔋</div>
                                </div>

                                <div class="comp-bullet-list-v26">
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">✨</span>
                                        <span>PFC duy trì kiểm soát hạch hạnh nhân tốt</span>
                                    </div>
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">✨</span>
                                        <span>Phân tích thông điệp khách quan, logic</span>
                                    </div>
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">✨</span>
                                        <span>Giữ vững bình tĩnh và sự cảm thông</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v26">ĐIỀU TIẾT HỢP LÝ</div>
                            </div>

                            <!-- Right Card: Sleep-Deprived -->
                            <div class="comp-card-v26 card-theme-tired card-inactive">
                                <div class="comp-header-v26">
                                    <h3>THIẾU NGỦ MỆT MỎI</h3>
                                    <div class="comp-icon-v26">⚠️</div>
                                </div>

                                <div class="comp-bullet-list-v26">
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">❌</span>
                                        <span>PFC đứt kết nối, Amygdala tự do phóng điện</span>
                                    </div>
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">❌</span>
                                        <span>Phóng đại đe dọa từ thông tin trung lập</span>
                                    </div>
                                    <div class="comp-bullet-row-v26">
                                        <span class="comp-bullet-icon-v26">❌</span>
                                        <span>Dễ nảy sinh bực dọc, suy diễn tiêu cực</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v26">MẤT KIỂM SOÁT CẢM XÚC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo26_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo26-5-container">
                        <div class="takeaway-radar-v26"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v26" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v26">😴</div>
                            <div class="takeaway-text-v26">
                                "Đừng bao giờ tranh cãi hay trả lời email quan trọng khi đang thiếu ngủ. Đi ngủ sớm và để bộ não nghỉ ngơi sẽ giải quyết 90% cơn giận nhé!"
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
        if (slideId === 'slide_memo26_1') {
            const bubble = canvas.querySelector('.hook-chat-bubble');
            const cloud = canvas.querySelector('.hook-angry-cloud-v26');
            if (bubble) {
                if (progress > 0.45) {
                    bubble.textContent = 'Ok. 😒 (Nói móc?)';
                    bubble.classList.add('shaking-bubble');
                    if (cloud) {
                        cloud.style.opacity = '0.6';
                        cloud.style.transform = 'scale(1.4)';
                    }
                } else {
                    bubble.textContent = 'Ok.';
                    bubble.classList.remove('shaking-bubble');
                    if (cloud) {
                        cloud.style.opacity = '0';
                        cloud.style.transform = 'scale(0.8)';
                    }
                }
            }
        }
        else if (slideId === 'slide_memo26_2') {
            const sleepNode = canvas.querySelector('.node-sleep');
            const pfcNode = canvas.querySelector('.node-pfc');
            const amygdalaNode = canvas.querySelector('.node-amygdala');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (sleepNode) sleepNode.classList.add('active-node');
                if (pfcNode) pfcNode.classList.add('active-node');
                if (amygdalaNode) amygdalaNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.add('highlight-link-violet');
                    arrow2.classList.remove('highlight-link');
                }
            } else if (progress >= 0.35) {
                if (sleepNode) sleepNode.classList.add('active-node');
                if (pfcNode) pfcNode.classList.add('active-node');
                if (amygdalaNode) amygdalaNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-violet');
                    arrow2.classList.remove('highlight-link');
                }
            } else {
                if (sleepNode) sleepNode.classList.add('active-node');
                if (pfcNode) pfcNode.classList.remove('active-node');
                if (amygdalaNode) amygdalaNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-violet');
                    arrow2.classList.remove('highlight-link');
                }
            }
        }
        else if (slideId === 'slide_memo26_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const bubble = canvas.querySelector('.chat-bubble-sim');
            const label = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                // Rested state
                if (badge) {
                    badge.textContent = 'ĐỦ GIẤC (RESTED)';
                    badge.className = 'state-indicator-badge rested';
                }
                if (bubble) bubble.className = 'chat-bubble-sim rested-state';
                if (label) label.textContent = 'Ý nghĩa: Đồng ý bình thường';
                if (statusTag) {
                    statusTag.textContent = 'An Toàn (20%)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                // Tired state
                if (badge) {
                    badge.textContent = 'THIẾU NGỦ (TIRED)';
                    badge.className = 'state-indicator-badge tired';
                }
                if (bubble) bubble.className = 'chat-bubble-sim tired-state';
                if (label) label.textContent = 'Ý nghĩa: Đang giận dữ / Nói móc!';
                if (statusTag) {
                    statusTag.textContent = 'ĐE DỌA CỰC CAO (98%)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo26_4') {
            const restedCard = canvas.querySelector('.card-theme-rested');
            const tiredCard = canvas.querySelector('.card-theme-tired');

            if (progress < 0.5) {
                if (restedCard) {
                    restedCard.classList.remove('card-inactive');
                    restedCard.classList.add('card-active');
                }
                if (tiredCard) {
                    tiredCard.classList.remove('card-active');
                    tiredCard.classList.add('card-inactive');
                }
            } else {
                if (restedCard) {
                    restedCard.classList.remove('card-active');
                    restedCard.classList.add('card-inactive');
                }
                if (tiredCard) {
                    tiredCard.classList.remove('card-inactive');
                    tiredCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const restedBullets = restedCard ? restedCard.querySelectorAll('.comp-bullet-row-v26') : [];
            const tiredBullets = tiredCard ? tiredCard.querySelectorAll('.comp-bullet-row-v26') : [];

            restedBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            tiredBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo26_5') {
            const box = canvas.querySelector('.takeaway-box-v26');
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
        scriptName: 'video26',
        topic: 'Sleep Deprivation',
        episodeNum: 26,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 26 Plugin] Loaded: Sleep Deprivation ready.');
})();
