/**
 * DOM Memo Video 14: Blind Spot Illusion
 * Custom script plugin driving visual blind spot simulations, retinal nerve gaps, and autofill comparisons.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo14_1: [
            { text: 'vùng không nhìn thấy', start: 2.0, end: 5.0, class: 'active-pink' },
            { text: 'não đã âm thầm', start: 5.5, end: 8.0, class: 'active-purple' },
            { text: 'che nó đi', start: 8.2, end: 10.8, class: 'active-emerald' }
        ],
        slide_memo14_2: [
            { text: 'dây thần kinh thị giác', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'không có bất kỳ', start: 5.2, end: 8.0, class: 'active-pink' },
            { text: 'tế bào cảm quang', start: 8.3, end: 10.5, class: 'active-emerald' }
        ],
        slide_memo14_3: [
            { text: 'nhìn thẳng vào', start: 1.5, end: 4.0, class: 'active-emerald' },
            { text: 'dấu cộng màu xanh', start: 4.2, end: 7.2, class: 'active-purple' },
            { text: 'biến mất', start: 7.5, end: 11.5, class: 'active-pink' }
        ],
        slide_memo14_4: [
            { text: 'cơ chế tự lấp đầy', start: 2.0, end: 5.0, class: 'active-emerald' },
            { text: 'màu sắc, đường nét', start: 5.5, end: 8.5, class: 'active-purple' },
            { text: 'lấp vào chỗ trống', start: 8.8, end: 11.2, class: 'active-pink' }
        ],
        slide_memo14_5: [
            { text: 'tin những gì mình thấy', start: 1.5, end: 4.5, class: 'active-indigo' },
            { text: 'bản dựng tối ưu', start: 4.8, end: 7.5, class: 'active-pink' }
        ],
        slide_memo14_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 4.0, class: 'active-emerald' },
            { text: 'thấu hiểu bản thân', start: 4.3, end: 7.0, class: 'active-indigo' }
        ]
    };

    const customSlideIds = [
        'slide_memo14_1', 'slide_memo14_2', 'slide_memo14_3', 'slide_memo14_4', 'slide_memo14_5', 'slide_memo14_6'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo14_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-1-container">
                        <!-- Ambient drifting light particles -->
                        <span class="ambient-light-particle" style="top: 15%; left: 12%; animation-delay: -1s;">💡</span>
                        <span class="ambient-light-particle" style="top: 80%; left: 85%; animation-delay: -3s;">⚡</span>
                        <span class="ambient-light-particle" style="top: 25%; left: 78%; animation-delay: -5s;">👁️</span>

                        <!-- Blind Spot Field Simulator -->
                        <div class="hook-eye-field">
                            <div class="field-grid-bg"></div>
                            
                            <!-- Visual of the eye looking outward -->
                            <span class="eye-vector">👁️</span>
                            
                            <!-- Light field cone -->
                            <div class="vision-cone"></div>
                            
                            <!-- Blind spot overlay cone -->
                            <div class="blind-spot-cone-zone"></div>
                            
                            <!-- Warning notification -->
                            <div class="blind-spot-warning-tag" style="opacity: 0; transform: scale(0.9); transition: all 0.5s ease;">
                                ⚠️ ĐIỂM MÙ THỊ GIÁC
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo14_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-2-container">
                        <span class="ambient-light-particle" style="top: 10%; left: 80%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-light-particle" style="top: 75%; left: 10%; animation-delay: -4s;">🧠</span>

                        <!-- Optic Nerve junction anatomy -->
                        <div class="retina-board-v14">
                            <!-- Eye entry -->
                            <div class="anatomy-node">
                                <span class="anatomy-icon">👁️</span>
                                <span class="anatomy-lbl">VÕNG MẠC MẮT</span>
                            </div>

                            <!-- Nerve pathway bridge -->
                            <div class="retina-nerve-bridge">
                                <div class="retina-nerve-pulse" style="left: 0%;"></div>
                                
                                <!-- Optic Disc Gap representing Blind Spot -->
                                <div class="optic-disc-gap">LỖ KHUYẾT</div>
                            </div>

                            <!-- Brain visual cortex -->
                            <div class="anatomy-node">
                                <span class="anatomy-icon">🧠</span>
                                <span class="anatomy-lbl">VỎ NÃO THỊ GIÁC</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Bản chất sinh học*: Nơi các bó dây thần kinh gom lại để đi ra sau mắt không có chỗ cho các tế bào hình que hay hình nón, tạo nên một **vùng mù hoàn toàn**.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo14_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-3-container">
                        <span class="ambient-light-particle" style="top: 12%; left: 8%; animation-delay: -1s;">⏳</span>
                        <span class="ambient-light-particle" style="top: 85%; left: 82%; animation-delay: -4s;">💡</span>

                        <!-- Left: Blind spot interactive lane -->
                        <div class="test-panel-v14">
                            <!-- Static Green Plus sign anchor -->
                            <span class="test-cross-anchor">+</span>
                            
                            <!-- Track line -->
                            <div class="test-dot-track-line"></div>
                            
                            <!-- Moving Red Dot -->
                            <div class="test-moving-dot" style="left: 80px; opacity: 1;"></div>
                            
                            <!-- Blind Spot Target area (where it goes invisible) -->
                            <div class="blind-spot-filter-zone">
                                <span style="font-size: 14px; margin-bottom: 4px;">🕳️</span>
                                <span>ĐIỂM MÙ</span>
                            </div>
                        </div>

                        <!-- Right: Dashboard data -->
                        <div class="tester-dashboard-v14">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                THỬ NGHIỆM ĐIỂM MÙ
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái điểm nhìn</span>
                                <span class="test-status-badge focusing">NHÌN THẲNG VÀO +</span>
                            </div>
                            
                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Hướng dẫn thử*: Hãy nhắm mắt trái, chỉ dùng mắt phải nhìn chăm chú vào dấu **+** bên trái, rồi quan sát chấm đỏ bên phải biến mất khỏi tầm mắt.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo14_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-4-container">
                        <span class="ambient-light-particle" style="top: 10%; left: 88%; animation-delay: -2s;">💡</span>
                        <span class="ambient-light-particle" style="top: 75%; left: 10%; animation-delay: -6s;">🧠</span>

                        <div class="comparison-row-v14">
                            <!-- Left Card: Raw Eye Input -->
                            <div class="comparison-card-v14 card-theme-eye card-active">
                                <div class="comp-header-v14">
                                    <h3>MẮT THU NHẬN</h3>
                                    <div class="comp-icon-badge-v14">👁️</div>
                                </div>
                                
                                <div class="comp-list-v14">
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">❌</span>
                                        <span>Bị khuyết một lỗ tròn lớn</span>
                                    </div>
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">❌</span>
                                        <span>Không có bất kỳ hình ảnh nào</span>
                                    </div>
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">❌</span>
                                        <span>Dữ liệu thô bị đứt gãy</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v14">KHUYẾT THIẾU THỰC TẾ</div>
                            </div>

                            <!-- Right Card: Brain Autofilled view -->
                            <div class="comparison-card-v14 card-theme-brain-fill card-inactive">
                                <div class="comp-header-v14">
                                    <h3>NÃO TỰ LẤP ĐẦY</h3>
                                    <div class="comp-icon-badge-v14">🧠</div>
                                </div>
                                
                                <div class="comp-list-v14">
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">✨</span>
                                        <span>Tự sao chép họa tiết xung quanh</span>
                                    </div>
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">✨</span>
                                        <span>Vá liền các đường kẻ bị đứt</span>
                                    </div>
                                    <div class="comp-row-v14">
                                        <span class="comp-bullet-v14">✨</span>
                                        <span>Tạo ra một bức tranh liền mạch</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v14">CHẮP VÁ THÔNG MINH</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo14_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-5-container">
                        <div class="calming-radar-v14"></div>
                        
                        <!-- Reassurance advice container -->
                        <div class="reassurance-box-v14" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="reassurance-face-v14">🧠</div>
                            <div class="reassurance-text-v14">
                                "Não bộ lấp đầy thông tin thiếu để bảo vệ bạn khỏi sự hỗn loạn. Hãy tỉnh táo trước những gì bạn cho là hiển nhiên nhé!"
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo14_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo14-5-container">
                        <div class="calming-radar-v14"></div>
                        
                        <!-- CTA follow banner -->
                        <div class="outro-cta-banner-v14" style="margin-top: 0px; text-align: center; z-index: 2;">
                            <div class="outro-cta-logo-v14">DOM MEMO</div>
                            <p style="font-size: 19px; color: rgba(255,255,255,0.75); font-weight: 600; margin-bottom: 25px;">
                                Hiểu tâm lý học • Làm chủ cuộc sống
                            </p>
                            <span style="font-size: 15px; color: rgba(255,255,255,0.4); border: 1.5px solid rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 24px; font-weight: 600; display: inline-block;">
                                Đừng quên thả tim và follow DOM Memo nhé!
                            </span>
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
        if (slideId === 'slide_memo14_1') {
            const warningTag = canvas.querySelector('.blind-spot-warning-tag');
            const coneZone = canvas.querySelector('.blind-spot-cone-zone');
            const eye = canvas.querySelector('.eye-vector');

            if (eye) {
                const angle = Math.sin(progress * Math.PI * 2) * 15;
                eye.style.transform = `rotate(${angle}deg) scale(1.4)`;
            }

            if (progress > 0.35) {
                if (coneZone) coneZone.classList.add('show-spot');
                if (warningTag) {
                    warningTag.style.opacity = '1';
                    warningTag.style.transform = 'scale(1.3)';
                }
            } else {
                if (coneZone) coneZone.classList.remove('show-spot');
                if (warningTag) {
                    warningTag.style.opacity = '0';
                    warningTag.style.transform = 'scale(0.9)';
                }
            }
        }
        else if (slideId === 'slide_memo14_2') {
            const pulse = canvas.querySelector('.retina-nerve-pulse');
            const gap = canvas.querySelector('.optic-disc-gap');

            // Pulse travels from 0% to 100%
            const pPct = progress * 100;
            if (pulse) pulse.style.left = `${pPct}%`;

            // Optic Disc Gap pulses when the nerve signal passes it (around 65% to 80% mark)
            if (progress >= 0.65 && progress <= 0.8) {
                if (gap) {
                    gap.style.borderColor = '#ef4444';
                    gap.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.7)';
                    gap.style.background = 'rgba(239, 68, 68, 0.3)';
                }
            } else {
                if (gap) {
                    gap.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                    gap.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
                    gap.style.background = 'rgba(239, 68, 68, 0.12)';
                }
            }
        }
        else if (slideId === 'slide_memo14_3') {
            const dot = canvas.querySelector('.test-moving-dot');
            const filter = canvas.querySelector('.blind-spot-filter-zone');
            const badge = canvas.querySelector('.test-status-badge');

            // Track boundaries: starts at 80px, ends at 380px (300px travel range)
            const startX = 80;
            const range = 300;
            const xPos = startX + range * progress;

            if (dot) dot.style.left = `${xPos}px`;

            // Blind spot area is located from 220px to 310px (equivalent to progress 0.45 to 0.75)
            const isInBlindSpot = (xPos >= 220 && xPos <= 310);

            if (isInBlindSpot) {
                if (dot) dot.style.opacity = '0';
                if (filter) filter.classList.add('active-filter');
                if (badge) {
                    badge.textContent = 'BIẾN MẤT (ĐIỂM MÙ!)';
                    badge.className = 'test-status-badge invisible-spot';
                }
            } else {
                if (dot) dot.style.opacity = '1';
                if (filter) filter.classList.remove('active-filter');
                if (badge) {
                    badge.textContent = 'CHẤM ĐANG DI CHUYỂN';
                    badge.className = 'test-status-badge focusing';
                }
            }
        }
        else if (slideId === 'slide_memo14_4') {
            const eyeCard = canvas.querySelector('.card-theme-eye');
            const brainCard = canvas.querySelector('.card-theme-brain-fill');

            // Swap card focus halfway
            if (progress < 0.5) {
                if (eyeCard) {
                    eyeCard.classList.remove('card-inactive');
                    eyeCard.classList.add('card-active');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-active');
                    brainCard.classList.add('card-inactive');
                }
            } else {
                if (eyeCard) {
                    eyeCard.classList.remove('card-active');
                    eyeCard.classList.add('card-inactive');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-inactive');
                    brainCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo14_5') {
            const box = canvas.querySelector('.reassurance-box-v14');

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
        else if (slideId === 'slide_memo14_6') {
            const banner = canvas.querySelector('.outro-cta-banner-v14');
            if (banner) {
                if (progress > 0.2) {
                    banner.style.transform = 'scale(1)';
                    banner.style.opacity = '1';
                    banner.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    banner.style.transform = 'scale(0.9)';
                    banner.style.opacity = '0';
                    banner.style.transition = 'all 0.3s ease';
                }
            }
        }
    }

    // ── PUBLIC API REGISTRATION ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video14',
        topic: 'Blind Spot Illusion',
        episodeNum: 14,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 14 Plugin] Loaded: Blind Spot Illusion ready.');
})();
