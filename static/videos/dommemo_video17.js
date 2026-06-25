/**
 * DOM Memo Video 17: Auditory Prediction (Phonemic Restoration)
 * Custom script plugin driving waveform gaps, orange predictive bridge, comparison cards, and active listening takeaway.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo17_1: [
            { text: 'nuốt mất vài từ', start: 2.0, end: 5.0, class: 'active-cyan' },
            { text: 'câu hoàn chỉnh', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'đoán trước âm thanh', start: 9.0, end: 11.5, class: 'active-orange' }
        ],
        slide_memo17_2: [
            { text: 'Phục hồi Âm phân', start: 1.5, end: 4.5, class: 'active-orange' },
            { text: 'che khuất bởi tiếng ồn', start: 4.8, end: 7.8, class: 'active-cyan' },
            { text: 'truy quét ngữ cảnh', start: 8.2, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo17_3: [
            { text: 'gặp một khoảng nhiễu', start: 2.5, end: 5.5, class: 'active-cyan' },
            { text: 'tín hiệu dự đoán', start: 6.0, end: 9.0, class: 'active-orange' },
            { text: 'nối liền câu', start: 9.5, end: 12.0, class: 'active-pink' }
        ],
        slide_memo17_4: [
            { text: 'âm thanh đứt quãng', start: 2.0, end: 5.0, class: 'active-cyan' },
            { text: 'câu nói trơn tru', start: 5.5, end: 8.5, class: 'active-orange' },
            { text: 'dựng lại âm thanh', start: 9.0, end: 11.5, class: 'active-indigo' }
        ],
        slide_memo17_5: [
            { text: 'dự đoán sai', start: 2.0, end: 4.5, class: 'active-pink' },
            { text: 'lắng nghe chủ động', start: 5.0, end: 8.0, class: 'active-orange' },
            { text: 'lấp đầy khoảng trống', start: 8.5, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo17_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-orange' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-indigo' }
        ]
    };

    const customSlideIds = [
        'slide_memo17_1', 'slide_memo17_2', 'slide_memo17_3', 'slide_memo17_4', 'slide_memo17_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo17_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo17-1-container">
                        <!-- Floating Audio Particles -->
                        <span class="ambient-audio-particle" style="top: 15%; left: 10%; animation-delay: -1s;">🔊</span>
                        <span class="ambient-audio-particle" style="top: 75%; left: 85%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-audio-particle" style="top: 25%; left: 80%; animation-delay: -5s;">💬</span>

                        <div class="audio-hook-box">
                            <div class="hook-megaphone-v17">📢</div>
                            <div class="phrase-box-v17">
                                <span class="phrase-word">Bộ</span>
                                <span class="phrase-word">não</span>
                                <span class="phrase-word">bạn</span>
                                <span class="phrase-word">đang</span>
                                <span class="phrase-word word-target">...</span>
                                <span class="phrase-word">âm</span>
                                <span class="phrase-word">thanh</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo17_2') {
            if (needsTemplate) {
                let segmentsHtml = '';
                // Generate 16 wave segments
                for (let i = 0; i < 16; i++) {
                    const defaultHeight = 40 + Math.sin(i * 0.6) * 70 + Math.random() * 20;
                    segmentsHtml += `<div class="wave-segment-v17" data-h="${defaultHeight}" style="height: ${defaultHeight}px;"></div>`;
                }

                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo17-2-container">
                        <span class="ambient-audio-particle" style="top: 8%; left: 80%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-audio-particle" style="top: 80%; left: 12%; animation-delay: -4s;">🧠</span>

                        <div class="anatomy-board-v17">
                            <div class="audio-grid-bg"></div>
                            <div style="display: flex; gap: 12px; width: 100%; height: 260px; align-items: center; justify-content: center; z-index: 5;">
                                ${segmentsHtml}
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Phonemic Restoration*: Thính giác tự động vá lại những khoảng trống âm thanh bằng thông tin dự báo, trước cả khi ý thức kịp nhận ra có sự đứt quãng.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo17_3') {
            if (needsTemplate) {
                let barsHtml = '';
                // Generate 20 bars for wave lane
                for (let i = 0; i < 20; i++) {
                    const isGap = i >= 8 && i <= 12;
                    const height = isGap ? 6 : (30 + Math.sin(i * 0.8) * 45);
                    const classes = `bar-v17${isGap ? ' gap-area' : ''}`;
                    barsHtml += `<div class="${classes}" data-h="${height}" style="height: ${height}px;"></div>`;
                }

                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo17-3-container">
                        <span class="ambient-audio-particle" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-audio-particle" style="top: 80%; left: 82%; animation-delay: -5s;">💬</span>

                        <!-- Left Panel: Soundwave with gap -->
                        <div class="sound-panel-v17">
                            <div class="audio-grid-bg"></div>
                            <div class="wave-lane-v17">
                                ${barsHtml}
                                <div class="prediction-bridge-v17"></div>
                            </div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="sound-dashboard-v17">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                TÍN HIỆU ĐƯỜNG TRUYỀN
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái thính giác</span>
                                <span class="sound-status-badge broken">Đứt quãng (Nhiễu)</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Dự báo thông tin*: Vùng vỏ não thính giác chính lập tức kích hoạt khi nhận thấy tiếng ồn trắng đè lên chữ, tạo liên kết bắc cầu để tái dựng câu.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo17_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo17-4-container">
                        <span class="ambient-audio-particle" style="top: 12%; left: 85%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-audio-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v17">
                            <!-- Left Card: Raw Physical Input -->
                            <div class="comp-card-v17 card-theme-raw-input card-active">
                                <div class="comp-header-v17">
                                    <h3>ĐẦU VÀO VẬT LÝ</h3>
                                    <div class="comp-icon-v17">🔊</div>
                                </div>

                                <div class="comp-bullet-list-v17">
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">❌</span>
                                        <span>Âm thanh bị đứt quãng đột ngột</span>
                                    </div>
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">❌</span>
                                        <span>Xen lẫn tạp âm và tiếng ồn trắng</span>
                                    </div>
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">❌</span>
                                        <span>Thông tin thô bị khuyết thiếu</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v17">TÍN HIỆU ĐỨT QUÃNG</div>
                            </div>

                            <!-- Right Card: Brain's Reconstructed Output -->
                            <div class="comp-card-v17 card-theme-brain-output card-inactive">
                                <div class="comp-header-v17">
                                    <h3>BẢN DỰNG CỦA NÃO</h3>
                                    <div class="comp-icon-v17">🧠</div>
                                </div>

                                <div class="comp-bullet-list-v17">
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">✨</span>
                                        <span>Tái tạo từ bị khuyết bằng ngữ cảnh</span>
                                    </div>
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">✨</span>
                                        <span>Lọc nhiễu và làm mượt âm lượng</span>
                                    </div>
                                    <div class="comp-bullet-row-v17">
                                        <span class="comp-bullet-icon-v17">✨</span>
                                        <span>Tạo trải nghiệm nghe trơn tru</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v17">PHỤC HỒI HOÀN CHỈNH</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo17_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo17-5-container">
                        <div class="takeaway-radar-v17"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v17" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v17">👂</div>
                            <div class="takeaway-text-v17">
                                "Đôi khi não tự động đoán sai từ bị mất dẫn đến hiểu lầm ý người khác. Hãy lắng nghe chủ động và hỏi lại nếu chưa rõ nhé!"
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
        if (slideId === 'slide_memo17_1') {
            const targetWord = canvas.querySelector('.word-target');
            const megaphone = canvas.querySelector('.hook-megaphone-v17');
            
            if (megaphone) {
                megaphone.style.transform = `scale(${1 + Math.sin(progress * 20) * 0.1}) rotate(${Math.sin(progress * 15) * 5}deg)`;
            }

            if (targetWord) {
                if (progress >= 0.5) {
                    targetWord.textContent = 'đoán trước';
                    targetWord.className = 'phrase-word word-target word-restored';
                    const scaleVal = Math.min(1.15, 1 + (progress - 0.5) * 0.3);
                    targetWord.style.transform = `scale(${scaleVal})`;
                } else {
                    targetWord.textContent = '...';
                    targetWord.className = 'phrase-word word-target word-missing';
                    targetWord.style.transform = '';
                }
            }
        }
        else if (slideId === 'slide_memo17_2') {
            const segments = canvas.querySelectorAll('.wave-segment-v17');
            segments.forEach((seg, idx) => {
                const baseHeight = parseFloat(seg.getAttribute('data-h') || '50');
                const offset = idx / segments.length;
                
                // Cascade entry effect: grow from 0 height based on progress
                const entryProgress = Math.max(0, Math.min(1, (progress - offset * 0.3) * 2));
                const wave = Math.sin((progress * 4 - offset * 3) * Math.PI);
                const dynamicHeight = Math.max(15, (baseHeight + wave * 25) * entryProgress);
                seg.style.height = `${dynamicHeight}px`;

                // Add highlight class based on scanning path
                const activeStart = offset * 0.6;
                const activeEnd = activeStart + 0.3;
                if (progress >= activeStart && progress <= activeEnd) {
                    seg.classList.add('shuffled');
                } else {
                    seg.classList.remove('shuffled');
                }
            });
        }
        else if (slideId === 'slide_memo17_3') {
            const bars = canvas.querySelectorAll('.bar-v17');
            const bridge = canvas.querySelector('.prediction-bridge-v17');
            const statusTag = canvas.querySelector('.sound-status-badge');

            // Soundwave vibration
            bars.forEach((bar, idx) => {
                const isGap = bar.classList.contains('gap-area');
                const baseHeight = parseFloat(bar.getAttribute('data-h'));
                let height = baseHeight;

                if (isGap) {
                    if (progress >= 0.4) {
                        // Restored gap height oscillates
                        height = 20 + Math.sin(progress * 15 + idx) * 12;
                        bar.style.background = 'var(--memo17-orange)';
                        bar.style.boxShadow = '0 0 10px var(--memo17-orange)';
                    } else {
                        // Broken gap height stays small
                        height = 6 + Math.sin(progress * 45 + idx) * 2;
                        bar.style.background = 'rgba(255, 255, 255, 0.05)';
                        bar.style.boxShadow = 'none';
                    }
                } else {
                    // Regular bars bounce continuously
                    height = baseHeight + Math.sin(progress * 25 + idx) * 10;
                }
                bar.style.height = `${height}px`;
            });

            // Bridge active & dashboard update
            if (progress >= 0.4) {
                if (bridge) {
                    bridge.classList.add('active-bridge');
                    // Grow from left center
                    const bridgeScale = Math.min(1, (progress - 0.4) / 0.2);
                    bridge.style.transform = `translateY(-50%) scaleX(${bridgeScale})`;
                    bridge.style.transformOrigin = 'left center';
                    bridge.style.opacity = '1';
                }
                if (statusTag) {
                    statusTag.textContent = 'Phục hồi (Dự đoán)';
                    statusTag.className = 'sound-status-badge restored';
                }
            } else {
                if (bridge) {
                    bridge.classList.remove('active-bridge');
                    bridge.style.transform = 'translateY(-50%) scaleX(0)';
                    bridge.style.opacity = '0';
                }
                if (statusTag) {
                    statusTag.textContent = 'Đứt quãng (Nhiễu)';
                    statusTag.className = 'sound-status-badge broken';
                }
            }
        }
        else if (slideId === 'slide_memo17_4') {
            const rawCard = canvas.querySelector('.card-theme-raw-input');
            const brainCard = canvas.querySelector('.card-theme-brain-output');

            // Swap card highlight state at 50% progress
            if (progress < 0.5) {
                if (rawCard) {
                    rawCard.classList.remove('card-inactive');
                    rawCard.classList.add('card-active');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-active');
                    brainCard.classList.add('card-inactive');
                }
            } else {
                if (rawCard) {
                    rawCard.classList.remove('card-active');
                    rawCard.classList.add('card-inactive');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-inactive');
                    brainCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const rawBullets = rawCard ? rawCard.querySelectorAll('.comp-bullet-row-v17') : [];
            const brainBullets = brainCard ? brainCard.querySelectorAll('.comp-bullet-row-v17') : [];

            rawBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            brainBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo17_5') {
            const box = canvas.querySelector('.takeaway-box-v17');
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
        scriptName: 'video17',
        topic: 'Auditory Prediction',
        episodeNum: 17,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 17 Plugin] Loaded: Auditory Prediction ready.');
})();
