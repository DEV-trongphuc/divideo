/**
 * DOM Memo Video 16: Unconscious Choice Illusion
 * Custom script plugin driving decision timeline, conscious delay wave, and self-control takeaway.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo16_1: [
            { text: 'chọn ngẫu nhiên', start: 1.5, end: 4.5, class: 'active-purple' },
            { text: 'nghiêng về một đáp án', start: 5.0, end: 8.2, class: 'active-emerald' },
            { text: 'từ trước', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo16_2: [
            { text: 'thí nghiệm đo sóng não', start: 1.5, end: 4.8, class: 'active-purple' },
            { text: 'tự động kích hoạt', start: 5.2, end: 8.2, class: 'active-emerald' },
            { text: 'trước đó tới nửa giây', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo16_3: [
            { text: 'vùng vô thức', start: 1.5, end: 4.0, class: 'active-emerald' },
            { text: 'chốt đáp án A trước', start: 4.2, end: 7.2, class: 'active-pink' },
            { text: 'tôi vừa tự chọn', start: 7.5, end: 11.5, class: 'active-purple' }
        ],
        slide_memo16_4: [
            { text: 'thói quen, cảm xúc', start: 2.0, end: 5.0, class: 'active-emerald' },
            { text: 'biện minh, hợp lý hóa', start: 5.5, end: 8.5, class: 'active-purple' },
            { text: 'định đoạt từ trước', start: 8.8, end: 11.2, class: 'active-pink' }
        ],
        slide_memo16_5: [
            { text: 'dừng lại 3 giây', start: 1.5, end: 4.5, class: 'active-emerald' },
            { text: 'phá vỡ thói quen', start: 4.8, end: 7.5, class: 'active-pink' },
            { text: 'thực sự sáng suốt', start: 7.8, end: 10.5, class: 'active-indigo' }
        ],
        slide_memo16_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 4.0, class: 'active-purple' },
            { text: 'thấu hiểu bản thân', start: 4.3, end: 7.0, class: 'active-indigo' }
        ]
    };

    const customSlideIds = [
        'slide_memo16_1', 'slide_memo16_2', 'slide_memo16_3', 'slide_memo16_4', 'slide_memo16_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo16_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo16-1-container">
                        <!-- Floating Neural/Choice Particles -->
                        <span class="ambient-neural-particle" style="top: 15%; left: 8%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-neural-particle" style="top: 75%; left: 88%; animation-delay: -3s;">⚡</span>
                        <span class="ambient-neural-particle" style="top: 20%; left: 80%; animation-delay: -5s;">❓</span>

                        <div class="choice-hook-box">
                            <div class="hook-grid-bg"></div>
                            
                            <!-- Choice A Node -->
                            <div class="hook-option-node opt-a">
                                <span>A</span>
                                <span class="hook-option-lbl">CHỌN A</span>
                            </div>
                            <div class="center-brain-v16">🧠</div>

                            <!-- Choice B Node -->
                            <div class="hook-option-node opt-b">
                                <span>B</span>
                                <span class="hook-option-lbl">CHỌN B</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo16_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo16-2-container">
                        <span class="ambient-neural-particle" style="top: 8%; left: 85%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-neural-particle" style="top: 82%; left: 10%; animation-delay: -4s;">🧠</span>

                        <!-- Libet's Experiment Timeline -->
                        <div class="timeline-board-v16">
                            <h2 style="font-size: 16px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin-bottom: 50px; text-transform: uppercase;">
                                TRỤC THỜI GIAN LỰA CHỌN TRONG NÃO BỘ
                            </h2>

                            <div class="timeline-axis">
                                <div class="timeline-axis-fill"></div>
                                
                                <!-- Pins -->
                                <div class="timeline-pin pin-unconscious"></div>
                                <div class="timeline-pin pin-conscious"></div>
                                <div class="timeline-pin pin-action"></div>

                                <!-- Cards -->
                                <div class="timeline-label-card card-unconscious">
                                    <span class="card-time">-500ms</span>
                                    <span>Vô thức chuẩn bị hành động</span>
                                </div>
                                <div class="timeline-label-card card-conscious">
                                    <span class="card-time">-200ms</span>
                                    <span>Ý thức nhận ra quyết định</span>
                                </div>
                                <div class="timeline-label-card card-action">
                                    <span class="card-time">0ms</span>
                                    <span>Nhấn nút hành động</span>
                                </div>
                            </div>
                        </div>

                        <div style="font-size: 14.5px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Thí nghiệm Libet (1983)*: Điện thế sẵn sàng (Readiness Potential) trong não đạt đỉnh khoảng 300 mili giây trước khi tình nguyện viên có ý thức muốn nhấn nút.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo16_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo16-3-container">
                        <span class="ambient-neural-particle" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-neural-particle" style="top: 80%; left: 82%; animation-delay: -5s;">❓</span>

                        <!-- Left: Choice pathways -->
                        <div class="choice-panel-v16">
                            <!-- Unconscious track -->
                            <div class="choice-path-track track-uncon">
                                <span class="path-lbl-v16">XỬ LÝ VÔ THỨC</span>
                                <span class="choice-wave-signal uncon-wave-node" style="left: 40px;">⚡</span>
                            </div>

                            <!-- Conscious track -->
                            <div class="choice-path-track track-con">
                                <span class="path-lbl-v16">Ý THỨC CHỦ QUAN</span>
                                <span class="choice-wave-signal con-wave-node" style="left: 40px;">💭</span>
                            </div>

                            <!-- Target option node inside sim -->
                            <div class="sim-target-node-v16" style="left: 310px;">
                                <span class="target-status-icon-v16">🅰️</span>
                                <span style="font-size: 11px;">ĐÁP ÁN A</span>
                            </div>
                        </div>

                        <!-- Right: Dashboard data -->
                        <div class="choice-dashboard-v16">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                ĐIỆN THẾ QUYẾT ĐỊNH
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái ý thức</span>
                                <span class="choice-status-badge wait">ĐANG PHÂN TÍCH...</span>
                            </div>
                            
                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Cơ chế dự đoán*: Vô thức quét nhanh các kinh nghiệm và cảm xúc trong quá khứ để chốt đáp án trước, sau đó phát tín hiệu chuyển tiếp lên ý thức.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo16_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo16-4-container">
                        <span class="ambient-neural-particle" style="top: 12%; left: 88%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-neural-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v16">
                            <!-- Left Card: Unconscious -->
                            <div class="comp-card-v16 card-theme-unconscious card-active">
                                <div class="comp-header-v16-title">
                                    <h3>QUYẾT ĐỊNH VÔ THỨC</h3>
                                    <div class="comp-icon-v16">⚡</div>
                                </div>
                                
                                <div class="comp-bullet-list-v16">
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">✨</span>
                                        <span>Tốc độ siêu nhanh (Dưới 100ms)</span>
                                    </div>
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">✨</span>
                                        <span>Dựa trên thói quen và cảm xúc</span>
                                    </div>
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">✨</span>
                                        <span>Đưa ra đáp án cuối trước khi ý thức biết</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-v16">HỆ THỐNG XỬ LÝ NHANH</div>
                            </div>

                            <!-- Right Card: Conscious -->
                            <div class="comp-card-v16 card-theme-conscious card-inactive">
                                <div class="comp-header-v16-title">
                                    <h3>BIỆN MINH Ý THỨC</h3>
                                    <div class="comp-icon-v16">💭</div>
                                </div>
                                
                                <div class="comp-bullet-list-v16">
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">❌</span>
                                        <span>Tốc độ chậm hơn (Vài trăm ms)</span>
                                    </div>
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">❌</span>
                                        <span>Tìm lý do logic để hợp lý hóa</span>
                                    </div>
                                    <div class="comp-bullet-row-v16">
                                        <span class="comp-bullet-icon-v16">❌</span>
                                        <span>Tạo ảo giác "tự mình vừa đắn đo"</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-v16">BỘ PHẬN BIỆN HỘ CỦA NÃO</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo16_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo16-5-container">
                        <div class="takeaway-radar-v16"></div>
                        
                        <!-- Reassurance/Takeaway box -->
                        <div class="takeaway-box-v16" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v16">⏱️</div>
                            <div class="takeaway-text-v16">
                                "Lần tới trước khi mua sắm ngẫu hứng hay phản ứng giận dữ, hãy dừng lại 3 giây để ý thức có cơ hội dẫn dắt hành động thay vì thói quen vô thức!"
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
        if (slideId === 'slide_memo16_1') {
            const optA = canvas.querySelector('.opt-a');
            const optB = canvas.querySelector('.opt-b');
            const brain = canvas.querySelector('.center-brain-v16');

            if (progress >= 0.25) {
                if (optA && !optA.classList.contains('focused')) {
                    optA.classList.add('focused');
                }
                if (optB && optB.classList.contains('focused')) {
                    optB.classList.remove('focused');
                }
                if (brain) {
                    brain.style.transform = 'scale(1.2) translateX(-30px)';
                    brain.style.filter = 'drop-shadow(0 0 35px var(--memo16-emerald))';
                }
            } else {
                if (optA) optA.classList.remove('focused');
                if (optB) optB.classList.remove('focused');
                if (brain) {
                    brain.style.transform = '';
                    brain.style.filter = '';
                }
            }
        }
        else if (slideId === 'slide_memo16_2') {
            const axisFill = canvas.querySelector('.timeline-axis-fill');
            const pinUncon = canvas.querySelector('.pin-unconscious');
            const pinCon = canvas.querySelector('.pin-conscious');
            const pinAct = canvas.querySelector('.pin-action');
            const cardUncon = canvas.querySelector('.card-unconscious');
            const cardCon = canvas.querySelector('.card-conscious');
            const cardAct = canvas.querySelector('.card-action');

            // Timeline fill animation
            if (axisFill) axisFill.style.width = `${progress * 100}%`;

            // Unconscious trigger (-500ms): progress >= 0.15 (15% along axis)
            if (progress >= 0.15) {
                if (pinUncon) pinUncon.classList.add('active-pin');
                if (cardUncon) cardUncon.classList.add('active-card');
            } else {
                if (pinUncon) pinUncon.classList.remove('active-pin');
                if (cardUncon) cardUncon.classList.remove('active-card');
            }

            // Conscious intent (-200ms): progress >= 0.65 (60% along axis)
            if (progress >= 0.65) {
                if (pinCon) pinCon.classList.add('active-pin');
                if (cardCon) cardCon.classList.add('active-card');
            } else {
                if (pinCon) pinCon.classList.remove('active-pin');
                if (cardCon) cardCon.classList.remove('active-card');
            }

            // Physical action (0ms): progress >= 0.90 (90% along axis)
            if (progress >= 0.90) {
                if (pinAct) pinAct.classList.add('active-pin');
                if (cardAct) cardAct.classList.add('active-card');
            } else {
                if (pinAct) pinAct.classList.remove('active-pin');
                if (cardAct) cardAct.classList.remove('active-card');
            }
        }
        else if (slideId === 'slide_memo16_3') {
            const unconWave = canvas.querySelector('.uncon-wave-node');
            const conWave = canvas.querySelector('.con-wave-node');
            const targetNode = canvas.querySelector('.sim-target-node-v16');
            const statusTag = canvas.querySelector('.choice-status-badge');

            const targetX = 310;

            // Unconscious signal travels from 40px to 310px (progress 0.0 to 0.4)
            const unconRatio = Math.min(1.0, progress / 0.4);
            const unconX = 40 + (targetX - 40) * unconRatio;
            if (unconWave) {
                unconWave.style.left = `${unconX}px`;
                unconWave.style.opacity = `${1 - unconRatio * 0.5}`;
            }

            // Conscious signal travels from 40px to 310px later (progress 0.4 to 0.75)
            let conX = 40;
            let conOpacity = 0;
            if (progress > 0.4) {
                const conRatio = Math.min(1.0, (progress - 0.4) / 0.35);
                conX = 40 + (targetX - 40) * conRatio;
                conOpacity = 1 - conRatio * 0.5;
            }
            if (conWave) {
                conWave.style.left = `${conX}px`;
                conWave.style.opacity = `${conOpacity}`;
            }

            // Target node class modifications based on signal arrival
            if (progress >= 0.4 && progress < 0.75) {
                if (targetNode) {
                    targetNode.className = 'sim-target-node-v16 bias-uncon';
                    targetNode.textContent = '🅰️';
                }
                if (statusTag) {
                    statusTag.textContent = 'VÔ THỨC ĐÃ CHỌN A';
                    statusTag.className = 'choice-status-badge unconscious-decided';
                }
            } else if (progress >= 0.75) {
                if (targetNode) {
                    targetNode.className = 'sim-target-node-v16 bias-both';
                    targetNode.textContent = '🌟';
                }
                if (statusTag) {
                    statusTag.textContent = 'Ý THỨC CHỐT A (Xong!)';
                    statusTag.className = 'choice-status-badge conscious-locked';
                }
            } else {
                if (targetNode) {
                    targetNode.className = 'sim-target-node-v16';
                    targetNode.textContent = '🅰️';
                }
                if (statusTag) {
                    statusTag.textContent = 'ĐANG PHÂN TÍCH...';
                    statusTag.className = 'choice-status-badge wait';
                }
            }
        }
        else if (slideId === 'slide_memo16_4') {
            const unconCard = canvas.querySelector('.card-theme-unconscious');
            const conCard = canvas.querySelector('.card-theme-conscious');

            // Swap card highlight state at 50%
            if (progress < 0.5) {
                if (unconCard) {
                    unconCard.classList.remove('card-inactive');
                    unconCard.classList.add('card-active');
                }
                if (conCard) {
                    conCard.classList.remove('card-active');
                    conCard.classList.add('card-inactive');
                }
            } else {
                if (unconCard) {
                    unconCard.classList.remove('card-active');
                    unconCard.classList.add('card-inactive');
                }
                if (conCard) {
                    conCard.classList.remove('card-inactive');
                    conCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo16_5') {
            const box = canvas.querySelector('.takeaway-box-v16');

            if (box) {
                if (progress > 0.25) {
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
        scriptName: 'video16',
        topic: 'Unconscious Choice',
        episodeNum: 16,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 16 Plugin] Loaded: Unconscious Choice ready.');
})();
