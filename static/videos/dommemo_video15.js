/**
 * DOM Memo Video 15: False Action Memory Illusion
 * Custom script plugin driving lock simulators, memory source monitors, merging waves, and anchoring habits.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo15_1: [
            { text: 'Bạn đã từng khóa cửa', start: 1.5, end: 4.5, class: 'active-emerald' },
            { text: 'tưởng tượng', start: 4.8, end: 7.8, class: 'active-purple' },
            { text: 'tin rằng', start: 8.0, end: 10.5, class: 'active-pink' }
        ],
        slide_memo15_2: [
            { text: 'lỗi giám sát nguồn', start: 1.5, end: 4.5, class: 'active-purple' },
            { text: 'trộn lẫn', start: 4.8, end: 7.5, class: 'active-pink' },
            { text: 'thực tế và suy nghĩ', start: 7.8, end: 10.5, class: 'active-emerald' }
        ],
        slide_memo15_3: [
            { text: 'tưởng tượng', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'vùng thần kinh giống hệt', start: 5.2, end: 8.2, class: 'active-pink' },
            { text: 'xóa nhòa', start: 8.5, end: 11.2, class: 'active-emerald' }
        ],
        slide_memo15_4: [
            { text: 'cảm giác ở ngón tay', start: 1.8, end: 4.8, class: 'active-emerald' },
            { text: 'hình ảnh chiếc khóa', start: 5.2, end: 8.2, class: 'active-purple' },
            { text: 'tự động điền', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo15_5: [
            { text: 'tỉnh thức', start: 1.5, end: 4.5, class: 'active-emerald' },
            { text: 'Tôi đang khóa cửa', start: 4.8, end: 7.5, class: 'active-pink' }
        ]
    };

    const customSlideIds = [
        'slide_memo15_1', 'slide_memo15_2', 'slide_memo15_3', 'slide_memo15_4', 'slide_memo15_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo15_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo15-1-container">
                        <!-- Ambient drifting action cues -->
                        <span class="ambient-confused-particle" style="top: 10%; left: 10%; animation-delay: -1s;">🔑</span>
                        <span class="ambient-confused-particle" style="top: 80%; left: 80%; animation-delay: -4s;">🚪</span>
                        <span class="ambient-confused-particle" style="top: 25%; left: 85%; animation-delay: -6s;">❓</span>

                        <!-- Lock/Key simulator -->
                        <div class="lock-gate-box">
                            <div class="lock-grid-bg"></div>
                            
                            <!-- Key sliding -->
                            <span class="sim-key-node">🔑</span>
                            
                            <!-- Target Lock -->
                            <span class="sim-lock-node">🔒</span>
                            
                            <!-- Confused question mark cloud -->
                            <span class="question-cloud-v15">❓</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo15_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo15-2-container">
                        <span class="ambient-confused-particle" style="top: 15%; left: 82%; animation-delay: -2s;">🔑</span>
                        <span class="ambient-confused-particle" style="top: 75%; left: 8%; animation-delay: -5s;">🧠</span>

                        <!-- Source monitoring model -->
                        <div class="source-board-v15">
                            <!-- Left: Action input nodes -->
                            <div style="display: flex; flex-direction: column; gap: 40px;">
                                <div class="source-anchor-v15">
                                    <span class="anchor-icon">⚡</span>
                                    <span class="anchor-lbl">HÀNH ĐỘNG THẬT</span>
                                </div>
                                <div class="source-anchor-v15">
                                    <span class="anchor-icon">💭</span>
                                    <span class="anchor-lbl">TƯỞNG TƯỢNG</span>
                                </div>
                            </div>

                            <!-- Center: Moving pathways -->
                            <div class="source-split-pathways">
                                <div class="source-path-lane lane-real">
                                    <div class="source-lane-pulse" style="left: 0%;"></div>
                                </div>
                                <div class="source-path-lane lane-imagined">
                                    <div class="source-lane-pulse" style="left: 0%;"></div>
                                </div>
                            </div>

                            <!-- Right: Single Memory Cache entry -->
                            <div class="source-anchor-v15">
                                <span class="anchor-icon">🧠</span>
                                <span class="anchor-lbl">BỘ NHỚ ĐỆM</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hội chứng lặp lại*: Khi hành động được thực hiện quá nhiều lần, vỏ não sẽ tự động gom hai nguồn tín hiệu (Làm thật vs Nghĩ) vào chung một nhãn lưu trữ duy nhất.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo15_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo15-3-container">
                        <span class="ambient-confused-particle" style="top: 8%; left: 8%; animation-delay: -3s;">❓</span>
                        <span class="ambient-confused-particle" style="top: 82%; left: 85%; animation-delay: -7s;">🔑</span>

                        <!-- Left: Merge panel (fixed dimensions to avoid overlaps) -->
                        <div class="merge-panel-v15">
                            <!-- Real Action Track -->
                            <div class="merge-lane-track track-real">
                                <span class="lane-label-v15">HÀNH ĐỘNG VẬT LÝ</span>
                                <span class="merge-wave-signal real-wave-node" style="left: 40px;">⚡</span>
                            </div>

                            <!-- Imagined Action Track -->
                            <div class="merge-lane-track track-imagined">
                                <span class="lane-label-v15">Ý NGHĨ TRONG ĐẦU</span>
                                <span class="merge-wave-signal imagined-wave-node" style="left: 40px;">💭</span>
                            </div>

                            <!-- Merged signal (starts hidden, appears at progress >= 0.65) -->
                            <span class="merge-wave-signal merged-wave-node" style="left: 360px; color: var(--memo15-pink); opacity: 0; filter: drop-shadow(0 0 10px rgba(236,72,153,0.6));">🌀</span>

                            <!-- Merge Box overlay -->
                            <div class="memory-cache-merge" style="left: 310px;">
                                <span class="merge-core-icon">🧠</span>
                                <span style="font-size: 11px;">MEMORY CACHE</span>
                            </div>
                        </div>

                        <!-- Right: Dashboard data -->
                        <div class="merge-dashboard-v15">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                BỘ NHỚ TRỘN LẪN
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái phân tích</span>
                                <span class="merge-status-badge waiting">ĐANG KIỂM TRA...</span>
                            </div>
                            
                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Sự chồng lấn tế bào*: Quá trình ghi nhớ hình ảnh khóa cửa và hành động khóa cửa thực chất kích hoạt các cụm nơ-ron tương đồng, tạo ra ký ức giả.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo15_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo15-4-container">
                        <span class="ambient-confused-particle" style="top: 12%; left: 88%; animation-delay: -2s;">🔑</span>
                        <span class="ambient-confused-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🚪</span>

                        <div class="comparison-row-v15">
                            <!-- Left Card: Real Sensory -->
                            <div class="comparison-card-v15 card-theme-real-sensory card-active">
                                <div class="comp-header-v15">
                                    <h3>KÝ ỨC THỰC TẾ</h3>
                                    <div class="comp-icon-badge-v15">🟢</div>
                                </div>
                                
                                <div class="comp-list-v15">
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">✨</span>
                                        <span>Cảm giác cơ học của đầu ngón tay</span>
                                    </div>
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">✨</span>
                                        <span>Âm thanh 'tạch' của ổ khóa cơ</span>
                                    </div>
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">✨</span>
                                        <span>Sự chú ý tập trung tại thời điểm đó</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v15">CHI TIẾT VẬT LÝ</div>
                            </div>

                            <!-- Right Card: Habit Fake -->
                            <div class="comparison-card-v15 card-theme-habit-fake card-inactive">
                                <div class="comp-header-v15">
                                    <h3>KÝ ỨC TƯỞNG TƯỢNG</h3>
                                    <div class="comp-icon-badge-v15">🟣</div>
                                </div>
                                
                                <div class="comp-list-v15">
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">❌</span>
                                        <span>Chỉ là hình ảnh quen thuộc của khóa</span>
                                    </div>
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">❌</span>
                                        <span>Não bộ tự lấp đầy khoảng trống</span>
                                    </div>
                                    <div class="comp-row-v15">
                                        <span class="comp-bullet-v15">❌</span>
                                        <span>Hành vi quen mắt được tự dựng lại</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v15">BẢN TỰ DỰNG CỦA NÃO</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo15_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo15-5-container">
                        <div class="calming-radar-v15"></div>
                        
                        <!-- Reassurance box -->
                        <div class="reassurance-box-v15" style="transform: scale(0.9); opacity: 0; margin-top: 180px;">
                            <div class="reassurance-face-v15">🔑</div>
                            <div class="reassurance-text-v15">
                                "Lần tới khi khóa cửa, hãy đọc to 'Tôi đang khóa cửa' hoặc gõ nhẹ vào ổ khóa để neo giữ ký ức vật lý thật nhé!"
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
        if (slideId === 'slide_memo15_1') {
            const keyNode = canvas.querySelector('.sim-key-node');
            const lockNode = canvas.querySelector('.sim-lock-node');
            const questionCloud = canvas.querySelector('.question-cloud-v15');

            // Key slides from left: 100px to left: 450px (progress 0.0 to 0.6)
            const kX = 100 + (450 - 100) * Math.min(1.0, progress / 0.6);
            if (keyNode) {
                keyNode.style.left = `${kX}px`;
                keyNode.style.transform = `scale(1.4) rotate(${progress > 0.6 ? 90 : 0}deg)`;
            }

            if (progress > 0.6) {
                if (lockNode && !lockNode.classList.contains('locked')) {
                    lockNode.textContent = '🔓';
                    lockNode.classList.add('locked');
                }
                if (lockNode) lockNode.style.transform = 'scale(1.6)';
                if (questionCloud) {
                    questionCloud.style.opacity = '1';
                    questionCloud.style.transform = 'translateY(-30px) scale(1.5)';
                }
            } else {
                if (lockNode) {
                    lockNode.textContent = '🔒';
                    lockNode.classList.remove('locked');
                    lockNode.style.transform = 'scale(1.3) rotate(' + (Math.sin(progress * 20) * 5) + 'deg)';
                }
                if (questionCloud) {
                    questionCloud.style.opacity = '0';
                    questionCloud.style.transform = 'translateY(0) scale(1)';
                }
            }
        }
        else if (slideId === 'slide_memo15_2') {
            const realPulse = canvas.querySelector('.lane-real .source-lane-pulse');
            const imaginedPulse = canvas.querySelector('.lane-imagined .source-lane-pulse');

            // Pulses travel horizontally along lanes
            const pX = progress * 100;
            if (realPulse) realPulse.style.left = `${pX}%`;
            if (imaginedPulse) imaginedPulse.style.left = `${pX}%`;
        }
        else if (slideId === 'slide_memo15_3') {
            const realNode = canvas.querySelector('.real-wave-node');
            const imaginedNode = canvas.querySelector('.imagined-wave-node');
            const mergedNode = canvas.querySelector('.merged-wave-node');
            const mergeBox = canvas.querySelector('.memory-cache-merge');
            const statusTag = canvas.querySelector('.merge-status-badge');

            // Travel coordinates: starts at 40px, targets box center at 310px
            const targetX = 310;

            if (progress < 0.65) {
                // Signals are entering the cache box
                const ratio = Math.min(1.0, progress / 0.65);
                const currentX = 40 + (targetX - 40) * ratio;

                if (realNode) {
                    realNode.style.left = `${currentX}px`;
                    realNode.style.opacity = `${1 - ratio * 0.5}`;
                }
                if (imaginedNode) {
                    imaginedNode.style.left = `${currentX}px`;
                    imaginedNode.style.opacity = `${1 - ratio * 0.5}`;
                }
                if (mergedNode) {
                    mergedNode.style.opacity = '0';
                }
                if (mergeBox) mergeBox.classList.remove('active-merge');
                if (statusTag) {
                    statusTag.textContent = 'ĐANG PHÂN TÍCH...';
                    statusTag.className = 'merge-status-badge waiting';
                }
            } else {
                // Signals are merged inside the cache box, exiting to the right as confusion
                const ratio = (progress - 0.65) / 0.35;
                const exitX = 350 + (410 - 350) * ratio;

                if (realNode) realNode.style.opacity = '0';
                if (imaginedNode) imaginedNode.style.opacity = '0';
                
                if (mergedNode) {
                    mergedNode.style.left = `${exitX}px`;
                    mergedNode.style.opacity = '1';
                }
                if (mergeBox) mergeBox.classList.add('active-merge');
                if (statusTag) {
                    statusTag.textContent = 'KÝ ỨC TRỘN LẪN ⚠️';
                    statusTag.className = 'merge-status-badge confused';
                }
            }
        }
        else if (slideId === 'slide_memo15_4') {
            const sensoryCard = canvas.querySelector('.card-theme-real-sensory');
            const habitCard = canvas.querySelector('.card-theme-habit-fake');

            // Swap card highlights halfway
            if (progress < 0.5) {
                if (sensoryCard) {
                    sensoryCard.classList.remove('card-inactive');
                    sensoryCard.classList.add('card-active');
                }
                if (habitCard) {
                    habitCard.classList.remove('card-active');
                    habitCard.classList.add('card-inactive');
                }
            } else {
                if (sensoryCard) {
                    sensoryCard.classList.remove('card-active');
                    sensoryCard.classList.add('card-inactive');
                }
                if (habitCard) {
                    habitCard.classList.remove('card-inactive');
                    habitCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo15_5') {
            const box = canvas.querySelector('.reassurance-box-v15');

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
        scriptName: 'video15',
        topic: 'False Action Memory',
        episodeNum: 15,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 15 Plugin] Loaded: False Action Memory ready.');
})();
