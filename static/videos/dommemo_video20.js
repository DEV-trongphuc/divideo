/**
 * DOM Memo Video 20: Earworms (Nhạc kẹt trong đầu)
 * Custom script plugin driving cerebral equalizer, sensory loop diagram, and comparison card highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo20_1: [
            { text: 'đoạn nhạc lặp đi lặp lại', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'không cách nào dứt ra', start: 5.0, end: 8.0, class: 'active-blue' },
            { text: 'hiện tượng sâu tai', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo20_2: [
            { text: 'vùng xử lý âm thanh', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'hoạt động gần giống', start: 4.8, end: 7.8, class: 'active-blue' },
            { text: 'nghe nhạc thực tế', start: 8.2, end: 11.2, class: 'active-pink' }
        ],
        slide_memo20_3: [
            { text: 'không có bất kỳ âm thanh', start: 2.0, end: 5.0, class: 'active-blue' },
            { text: 'vỏ não thính giác', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'phát ra các xung điện', start: 9.0, end: 12.0, class: 'active-pink' }
        ],
        slide_memo20_4: [
            { text: 'tai tiếp nhận sóng cơ học', start: 2.0, end: 5.0, class: 'active-blue' },
            { text: 'não tự kích hoạt từ bên trong', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'trải nghiệm nghe như thật', start: 9.0, end: 11.5, class: 'active-pink' }
        ],
        slide_memo20_5: [
            { text: 'chặn cơ chế vận ngôn', start: 2.0, end: 5.0, class: 'active-blue' },
            { text: 'nghe nốt đoạn cuối bài hát', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'đóng lại vòng lặp', start: 9.0, end: 11.0, class: 'active-pink' }
        ],
        slide_memo20_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-pink' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-blue' }
        ]
    };

    const customSlideIds = [
        'slide_memo20_1', 'slide_memo20_2', 'slide_memo20_3', 'slide_memo20_4', 'slide_memo20_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo20_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo20-1-container">
                        <!-- Ambient Music Particles -->
                        <span class="ambient-music-particle" style="top: 15%; left: 8%; animation-delay: -1s;">🎵</span>
                        <span class="ambient-music-particle" style="top: 75%; left: 88%; animation-delay: -3s;">🎶</span>
                        <span class="ambient-music-particle" style="top: 20%; left: 80%; animation-delay: -5s;">🎸</span>

                        <div class="music-hook-box">
                            <div class="pulsing-headphones">🎧</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo20_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo20-2-container">
                        <span class="ambient-music-particle" style="top: 8%; left: 85%; animation-delay: -2s;">🎵</span>
                        <span class="ambient-music-particle" style="top: 82%; left: 10%; animation-delay: -4s;">🎶</span>

                        <div class="music-diagram-board">
                            <div class="diagram-node-v20 node-stimulus">
                                <span class="diagram-node-icon">📻</span>
                                <span>1. Giai điệu Quen</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v20 node-cortex">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Vỏ não Thính giác</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v20 node-loop">
                                <span class="diagram-node-icon">🔁</span>
                                <span>3. Vòng lặp Vô thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Earworm Loop*: Khi vỏ não thính giác bắt đầu tự hoạt động từ bên trong mà không cần đầu vào âm thanh thực tế, nó sẽ hình thành một vòng lặp kín kích thích cảm nhận giai điệu liên tục.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo20_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo20-3-container">
                        <span class="ambient-music-particle" style="top: 10%; left: 15%; animation-delay: -1s;">🎵</span>
                        <span class="ambient-music-particle" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <!-- Left Panel: Brain Equalizer -->
                        <div class="brain-cortex-panel-v20">
                            <div class="mute-badge-v20">🤫 Không có âm thanh ngoài</div>
                            <div class="brain-profile-outline">
                                <div class="cortex-equalizer">
                                    <div class="eq-bar-v20 bar-0" style="height: 10px;"></div>
                                    <div class="eq-bar-v20 bar-1" style="height: 10px;"></div>
                                    <div class="eq-bar-v20 bar-2" style="height: 10px;"></div>
                                    <div class="eq-bar-v20 bar-3" style="height: 10px;"></div>
                                    <div class="eq-bar-v20 bar-4" style="height: 10px;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="earworm-dashboard-v20">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                PHÂN TÍCH ĐIỆN NÃO
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Hoạt động thính giác</span>
                                <span class="earworm-status-badge wait">Đang dò tìm...</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Tự động replay*: Do thói quen lặp lại hoặc kết thúc lửng lơ của bài hát, vỏ não thính giác tự khôi phục dữ liệu nhạc từ trí nhớ ngắn hạn và phát đi phát lại.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo20_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo20-4-container">
                        <span class="ambient-music-particle" style="top: 12%; left: 85%; animation-delay: -2s;">🎵</span>
                        <span class="ambient-music-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v20">
                            <!-- Left Card: Hearing -->
                            <div class="comp-card-v20 card-theme-hearing card-active">
                                <div class="comp-header-v20">
                                    <h3>NGHE NHẠC THẬT</h3>
                                    <div class="comp-icon-v20">🔊</div>
                                </div>

                                <div class="comp-bullet-list-v20">
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">✨</span>
                                        <span>Tai đón nhận dao động cơ học vật lý</span>
                                    </div>
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">✨</span>
                                        <span>Kích hoạt màng nhĩ & ốc tai</span>
                                    </div>
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">✨</span>
                                        <span>Đáp ứng trực tiếp với nguồn phát ngoài</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v20">TÍN HIỆU NGOẠI NGOẠI</div>
                            </div>

                            <!-- Right Card: Earworm -->
                            <div class="comp-card-v20 card-theme-imagination card-inactive">
                                <div class="comp-header-v20">
                                    <h3>NHẠC KẸT TRONG NÃO</h3>
                                    <div class="comp-icon-v20">🔁</div>
                                </div>

                                <div class="comp-bullet-list-v20">
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">🔥</span>
                                        <span>Không có bất cứ nguồn âm bên ngoài</span>
                                    </div>
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">🔥</span>
                                        <span>Vỏ não tự tạo xung nhịp tuần hoàn</span>
                                    </div>
                                    <div class="comp-bullet-row-v20">
                                        <span class="comp-bullet-icon-v20">🔥</span>
                                        <span>Bỏ qua tai ngoài, kích thích thẳng ký ức</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v20">VÒNG LẶP NỘI SINH</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo20_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo20-5-container">
                        <div class="takeaway-radar-v20"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v20" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v20">🍬</div>
                            <div class="takeaway-text-v20">
                                "Cách tốt nhất để thoát khỏi sâu tai: hãy nhai một phong kẹo cao su hoặc nghe trọn vẹn nốt bài nhạc đó để đóng vòng lặp nhận thức nhé!"
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
        if (slideId === 'slide_memo20_1') {
            // Handled by CSS animations
        }
        else if (slideId === 'slide_memo20_2') {
            const stimNode = canvas.querySelector('.node-stimulus');
            const cortexNode = canvas.querySelector('.node-cortex');
            const loopNode = canvas.querySelector('.node-loop');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (stimNode) stimNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.add('active-node');
                if (loopNode) loopNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (stimNode) stimNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.add('active-node');
                if (loopNode) loopNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            } else {
                if (stimNode) stimNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.remove('active-node');
                if (loopNode) loopNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo20_3') {
            const bars = canvas.querySelectorAll('.eq-bar-v20');
            const statusTag = canvas.querySelector('.earworm-status-badge');

            if (progress >= 0.2) {
                if (statusTag) {
                    statusTag.textContent = 'Vòng lặp: ĐANG CHẠY';
                    statusTag.className = 'earworm-status-badge active-loop';
                }

                // Random jitter for equalizer with ease-in entrance scale
                const scaleIn = Math.min(1, (progress - 0.2) * 5);
                bars.forEach((bar, idx) => {
                    const offset = idx / bars.length;
                    const wave = Math.sin((progress * 30 - offset * 8) * Math.PI);
                    const height = (15 + Math.abs(wave) * 45 + (Math.random() * 8)) * scaleIn;
                    bar.style.height = `${height}px`;
                });
            } else {
                if (statusTag) {
                    statusTag.textContent = 'Đang dò tìm...';
                    statusTag.className = 'earworm-status-badge wait';
                }
                bars.forEach(bar => {
                    bar.style.height = '10px';
                });
            }
        }
        else if (slideId === 'slide_memo20_4') {
            const hearingCard = canvas.querySelector('.card-theme-hearing');
            const imagCard = canvas.querySelector('.card-theme-imagination');

            if (progress < 0.5) {
                if (hearingCard) {
                    hearingCard.classList.remove('card-inactive');
                    hearingCard.classList.add('card-active');
                }
                if (imagCard) {
                    imagCard.classList.remove('card-active');
                    imagCard.classList.add('card-inactive');
                }
            } else {
                if (hearingCard) {
                    hearingCard.classList.remove('card-active');
                    hearingCard.classList.add('card-inactive');
                }
                if (imagCard) {
                    imagCard.classList.remove('card-inactive');
                    imagCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const hearBullets = hearingCard ? hearingCard.querySelectorAll('.comp-bullet-row-v20') : [];
            const imagBullets = imagCard ? imagCard.querySelectorAll('.comp-bullet-row-v20') : [];

            hearBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            imagBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo20_5') {
            const box = canvas.querySelector('.takeaway-box-v20');
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
        scriptName: 'video20',
        topic: 'Earworms',
        episodeNum: 20,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 20 Plugin] Loaded: Earworms ready.');
})();
