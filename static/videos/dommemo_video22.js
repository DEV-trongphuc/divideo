/**
 * DOM Memo Video 22: Auditory Sensory Gating (Bộ lọc âm lượng)
 * Custom script plugin driving gating barrier states, pulsing sound dots, and comparison card highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo22_1: [
            { text: 'tiếng tích tắc của đồng hồ', start: 1.5, end: 4.5, class: 'active-amber' },
            { text: 'tiếng quạt trần', start: 5.0, end: 8.0, class: 'active-purple' },
            { text: 'cực kỳ khó chịu', start: 8.5, end: 11.2, class: 'active-purple' }
        ],
        slide_memo22_2: [
            { text: 'Gating cảm giác', start: 1.5, end: 4.5, class: 'active-amber' },
            { text: 'màng lọc tự động', start: 4.8, end: 7.8, class: 'active-amber' },
            { text: 'loại bỏ các âm thanh lặp lại', start: 8.2, end: 11.0, class: 'active-purple' }
        ],
        slide_memo22_3: [
            { text: 'màng lọc hoạt động tốt', start: 2.0, end: 5.0, class: 'active-amber' },
            { text: 'mệt mỏi hay căng thẳng', start: 5.5, end: 8.5, class: 'active-purple' },
            { text: 'bộ lọc bị sập', start: 9.0, end: 12.0, class: 'active-purple' }
        ],
        slide_memo22_4: [
            { text: 'lọc bỏ tới chín mươi phần trăm', start: 2.0, end: 5.0, class: 'active-amber' },
            { text: 'toàn bộ tín hiệu lọt qua', start: 5.5, end: 8.5, class: 'active-purple' },
            { text: 'quá tải thính giác', start: 9.0, end: 11.5, class: 'active-purple' }
        ],
        slide_memo22_5: [
            { text: 'não bạn đang mệt', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'nghỉ ngơi hoặc thiền định', start: 5.2, end: 8.2, class: 'active-amber' },
            { text: 'khôi phục lại màng lọc', start: 8.5, end: 11.0, class: 'active-amber' }
        ],
        slide_memo22_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-amber' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo22_1', 'slide_memo22_2', 'slide_memo22_3', 'slide_memo22_4', 'slide_memo22_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo22_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo22-1-container">
                        <!-- Ambient Sound Particles -->
                        <span class="ambient-sound-particle-v22" style="top: 15%; left: 8%; animation-delay: -1s;">🔊</span>
                        <span class="ambient-sound-particle-v22" style="top: 75%; left: 88%; animation-delay: -3s;">💨</span>
                        <span class="ambient-sound-particle-v22" style="top: 20%; left: 80%; animation-delay: -5s;">⚡</span>

                        <div class="fan-hook-box">
                            <div class="sound-wave-ring" style="animation-delay: 0s; left: 380px; top: 140px;"></div>
                            <div class="sound-wave-ring" style="animation-delay: 0.6s; left: 380px; top: 140px;"></div>
                            <div class="sound-wave-ring" style="animation-delay: 1.2s; left: 380px; top: 140px;"></div>
                            <div class="spinning-fan-icon">🌀</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo22_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo22-2-container">
                        <span class="ambient-sound-particle-v22" style="top: 8%; left: 85%; animation-delay: -2s;">🔊</span>
                        <span class="ambient-sound-particle-v22" style="top: 82%; left: 10%; animation-delay: -4s;">⚡</span>

                        <div class="gate-diagram-board">
                            <div class="diagram-node-v22 node-sound">
                                <span class="diagram-node-icon">🔊</span>
                                <span>1. Xung Âm Thanh</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v22 node-gate">
                                <span class="diagram-node-icon">🚧</span>
                                <span>2. Bộ Lọc Gating</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v22 node-cortex">
                                <span class="diagram-node-icon">🧠</span>
                                <span>3. Vỏ Não Thính Giác</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Sensory Gating*: Bộ não nhận hàng ngàn kích thích thính giác mỗi giây. Cơ chế lọc gating hoạt động tại vùng đồi thị (Thalamus) để dọn dẹp các tiếng ồn không cần thiết trước khi gửi lên vỏ não phân tích.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo22_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo22-3-container">
                        <span class="ambient-sound-particle-v22" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-sound-particle-v22" style="top: 80%; left: 82%; animation-delay: -5s;">🔊</span>

                        <!-- Left Panel: Gating Barrier Simulator -->
                        <div class="gating-filter-panel-v22">
                            <div class="noise-emitter-v22">🔊</div>
                            <div class="gating-filter-barrier-v22"></div>
                            <div class="receiver-brain-v22">🧠</div>
                            <!-- Flying sound pulse dot -->
                            <div class="audio-pulse-dot-v22"></div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="gating-dashboard-v22">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                HIỆU SUẤT BỘ LỌC
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái bộ lọc</span>
                                <span class="gating-status-badge calm">Đang phân tích...</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Quá tải cảm giác*: Khi bị stress hoặc mất ngủ, hoạt động của các tế bào neuron ức chế bị giảm sút trầm trọng, màng lọc cảm giác bị sập và khiến bạn thấy mọi tiếng ồn to rõ mồn một.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo22_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo22-4-container">
                        <span class="ambient-sound-particle-v22" style="top: 12%; left: 85%; animation-delay: -2s;">🔊</span>
                        <span class="ambient-sound-particle-v22" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v22">
                            <!-- Left Card: Calm Gated State -->
                            <div class="comp-card-v22 card-theme-calm card-active">
                                <div class="comp-header-v22">
                                    <h3>THƯ GIÃN (FILTER ON)</h3>
                                    <div class="comp-icon-v22">🛡️</div>
                                </div>

                                <div class="comp-bullet-list-v22">
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">✨</span>
                                        <span>Lọc bỏ 90% tiếng ồn nền vô hại</span>
                                    </div>
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">✨</span>
                                        <span>Giữ vỏ não yên tĩnh để tập trung sâu</span>
                                    </div>
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">✨</span>
                                        <span>Dễ dàng bỏ qua tiếng quạt, tiếng tích tắc</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v22">BỘ LỌC AN TOÀN</div>
                            </div>

                            <!-- Right Card: Stressed Leak State -->
                            <div class="comp-card-v22 card-theme-stress card-inactive">
                                <div class="comp-header-v22">
                                    <h3>CĂNG THẲNG (FILTER OFF)</h3>
                                    <div class="comp-icon-v22">⚠️</div>
                                </div>

                                <div class="comp-bullet-list-v22">
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">❌</span>
                                        <span>Màng lọc đồi thị bị vô hiệu hóa</span>
                                    </div>
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">❌</span>
                                        <span>Mọi xung âm thanh rác đều lọt qua</span>
                                    </div>
                                    <div class="comp-bullet-row-v22">
                                        <span class="comp-bullet-icon-v22">❌</span>
                                        <span>Nhạy cảm thái quá, gây stress tâm lý</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v22">QUÁ TẢI TIẾNG ỒN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo22_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo22-5-container">
                        <div class="takeaway-radar-v22"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v22" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v22">🧘‍♀️</div>
                            <div class="takeaway-text-v22">
                                "Khi bạn thấy khó chịu với tiếng quạt trần hay đồng hồ, đó là hồi chuông báo động não cần nghỉ ngơi. Hãy nhắm mắt và thở sâu năm phút nhé!"
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
        if (slideId === 'slide_memo22_1') {
            // spinning fan & pulsing wave rings
            const fan = canvas.querySelector('.spinning-fan-icon');
            if (fan) {
                const r = progress * 1440;
                fan.style.transform = `rotate(${r}deg)`;
            }
            const rings = canvas.querySelectorAll('.sound-wave-ring');
            rings.forEach((ring, idx) => {
                const p = (progress * 2 + idx * 0.3) % 1;
                const size = 100 + p * 400;
                const opacity = 1 - p;
                ring.style.width = `${size}px`;
                ring.style.height = `${size}px`;
                ring.style.opacity = `${opacity}`;
                ring.style.left = `${450 - size/2}px`;
                ring.style.top = `${190 - size/2}px`;
            });
        }
        else if (slideId === 'slide_memo22_2') {
            const soundNode = canvas.querySelector('.node-sound');
            const gateNode = canvas.querySelector('.node-gate');
            const cortexNode = canvas.querySelector('.node-cortex');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (soundNode) soundNode.classList.add('active-node');
                if (gateNode) gateNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.add('highlight-link-purple');
                    arrow2.classList.remove('highlight-link');
                }
            } else if (progress >= 0.35) {
                if (soundNode) soundNode.classList.add('active-node');
                if (gateNode) gateNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-purple');
                    arrow2.classList.remove('highlight-link');
                }
            } else {
                if (soundNode) soundNode.classList.add('active-node');
                if (gateNode) gateNode.classList.remove('active-node');
                if (cortexNode) cortexNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-purple');
                    arrow2.classList.remove('highlight-link');
                }
            }
        }
        else if (slideId === 'slide_memo22_3') {
            const barrier = canvas.querySelector('.gating-filter-barrier-v22');
            const receiver = canvas.querySelector('.receiver-brain-v22');
            const dot = canvas.querySelector('.audio-pulse-dot-v22');
            const statusTag = canvas.querySelector('.gating-status-badge');

            // Sound dot travels from left (70px) to right (280px)
            const tick = (progress % 0.2) / 0.2; // loop pulse every 20% slide time
            const dotLeft = 70 + (280 - 70) * tick;

            if (dot) {
                dot.style.left = `${dotLeft}px`;
                dot.style.opacity = `${1.0 - (tick > 0.9 ? (tick - 0.9) / 0.1 : 0)}`;
            }

            if (progress < 0.5) {
                // Calm state: filter active
                if (barrier) barrier.className = 'gating-filter-barrier-v22';
                if (receiver) receiver.className = 'receiver-brain-v22';
                if (statusTag) {
                    statusTag.textContent = 'ĐANG LỌC BẬT (90%)';
                    statusTag.className = 'gating-status-badge calm';
                }

                // Dot fades out at barrier (180px)
                if (dot) {
                    if (dotLeft > 180) {
                        dot.style.opacity = '0.05';
                        dot.style.transform = 'translateY(-50%) scale(0.4)';
                    } else {
                        dot.style.transform = 'translateY(-50%) scale(1)';
                    }
                    dot.style.background = 'var(--memo22-amber)';
                    dot.style.boxShadow = '0 0 10px var(--memo22-amber)';
                }
            } else {
                // Stressed state: filter disabled
                if (barrier) barrier.className = 'gating-filter-barrier-v22 broken-filter';
                
                // Receiver brain shakes violently on impact
                if (receiver) {
                    if (dotLeft > 250 && dotLeft < 275) {
                        receiver.className = 'receiver-brain-v22 alarm-shake active-alarm-vibrate';
                    } else {
                        receiver.className = 'receiver-brain-v22 alarm-shake';
                    }
                }
                
                if (statusTag) {
                    statusTag.textContent = 'BỘ LỌC SẬP (5% LỌC)';
                    statusTag.className = 'gating-status-badge stress';
                }

                // Dot passes straight through with full scale
                if (dot) {
                    dot.style.transform = 'translateY(-50%) scale(1.2)';
                    dot.style.background = 'var(--memo22-purple)';
                    dot.style.boxShadow = '0 0 12px var(--memo22-purple)';
                }
            }
        }
        else if (slideId === 'slide_memo22_4') {
            const calmCard = canvas.querySelector('.card-theme-calm');
            const stressCard = canvas.querySelector('.card-theme-stress');

            if (progress < 0.5) {
                if (calmCard) {
                    calmCard.classList.remove('card-inactive');
                    calmCard.classList.add('card-active');
                }
                if (stressCard) {
                    stressCard.classList.remove('card-active');
                    stressCard.classList.add('card-inactive');
                }
            } else {
                if (calmCard) {
                    calmCard.classList.remove('card-active');
                    calmCard.classList.add('card-inactive');
                }
                if (stressCard) {
                    stressCard.classList.remove('card-inactive');
                    stressCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const calmBullets = calmCard ? calmCard.querySelectorAll('.comp-bullet-row-v22') : [];
            const stressBullets = stressCard ? stressCard.querySelectorAll('.comp-bullet-row-v22') : [];

            calmBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            stressBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo22_5') {
            const box = canvas.querySelector('.takeaway-box-v22');
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
        scriptName: 'video22',
        topic: 'Sensory Gating',
        episodeNum: 22,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 22 Plugin] Loaded: Auditory Gating ready.');
})();
