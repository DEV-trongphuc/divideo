/**
 * DOM Memo Video 12: Multitasking Switch Cost (Cognitive Penalty)
 * Custom script plugin driving rapid task switchers, context load simulations, performance penalty dials, and card state highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo12_1: [
            { text: 'vừa nhắn tin vừa làm việc', start: 1.5, end: 4.0, class: 'active-pink' },
            { text: 'không phải siêu năng lực', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'nhảy qua nhảy lại', start: 8.0, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo12_2: [
            { text: 'xóa bộ nhớ đệm cũ', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'nạp lại bối cảnh', start: 5.2, end: 8.2, class: 'active-indigo' },
            { text: 'khoảng trễ vô hình', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo12_3: [
            { text: 'hiệu suất làm việc', start: 1.5, end: 4.0, class: 'active-pink' },
            { text: 'bốn mươi phần trăm', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'mắc sai sót tăng gấp đôi', start: 7.8, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo12_4: [
            { text: 'Làm việc tuần tự', start: 1.8, end: 5.0, class: 'active-indigo' },
            { text: 'đa nhiệm phân tán', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'tải lại não bộ', start: 8.8, end: 11.5, class: 'active-purple' }
        ],
        slide_memo12_5: [
            { text: 'tập trung vào từng việc', start: 1.2, end: 4.2, class: 'active-indigo' },
            { text: 'siêu năng lực thực sự', start: 4.8, end: 7.8, class: 'active-pink' },
            { text: 'follow DOM Memo', start: 8.2, end: 11.0, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo12_1', 'slide_memo12_2', 'slide_memo12_3', 'slide_memo12_4', 'slide_memo12_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo12_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo12-1-container">
                        <!-- Ambient drifting task items -->
                        <span class="ambient-task-particle" style="top: 12%; left: 8%; animation-delay: -2s;">💻</span>
                        <span class="ambient-task-particle" style="top: 72%; left: 15%; animation-delay: -5s;">💬</span>
                        <span class="ambient-task-particle" style="top: 22%; left: 82%; animation-delay: -8s;">✅</span>

                        <!-- Swappable task panels -->
                        <div class="task-switcher-board-v12">
                            <!-- Selector outline box -->
                            <div class="switcher-selector-overlay" style="left: 70px;"></div>

                            <!-- Work Panel -->
                            <div class="task-panel-v12 task-theme-work active-task-pulse">
                                <span class="task-icon-v12">💻</span>
                                <span class="task-title-v12">SOẠN BÁO CÁO</span>
                                <span style="font-size: 12px; opacity: 0.5;">(Nhiệm vụ Tập trung A)</span>
                            </div>

                            <!-- Chat Panel -->
                            <div class="task-panel-v12 task-theme-chat">
                                <span class="task-icon-v12">💬</span>
                                <span class="task-title-v12">NHẮN TIN BẠN BÈ</span>
                                <span style="font-size: 12px; opacity: 0.5;">(Nhiệm vụ Phân tán B)</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo12_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo12-2-container">
                        <span class="ambient-task-particle" style="top: 10%; left: 85%; animation-delay: -1s;">🗑️</span>
                        <span class="ambient-task-particle" style="top: 82%; left: 10%; animation-delay: -3s;">📥</span>

                        <!-- Context switch cache boards -->
                        <div class="cache-switch-board-v12">
                            <!-- Cache Work -->
                            <div class="cache-panel-card card-work-cache">
                                <div class="cache-status-header">
                                    <span class="cache-status-title">BỐI CẢNH LÀM VIỆC (TASK A)</span>
                                    <span class="cache-status-badge work-badge loading">ĐANG NẠP...</span>
                                </div>
                                <div class="cache-progress-bg">
                                    <div class="cache-progress-fill work-fill" style="width: 10%;"></div>
                                </div>
                            </div>

                            <!-- Cache Chat -->
                            <div class="cache-panel-card card-chat-cache">
                                <div class="cache-status-header">
                                    <span class="cache-status-title">BỐI CẢNH TIN NHẮN (TASK B)</span>
                                    <span class="cache-status-badge chat-badge loading">ĐANG CHỜ...</span>
                                </div>
                                <div class="cache-progress-bg">
                                    <div class="cache-progress-fill chat-fill" style="width: 0%;"></div>
                                </div>
                            </div>
                            
                            <!-- Overload warning message -->
                            <div class="cache-text-alert">XÓA BỘ NHỚ ĐỆM LÀM VIỆC! 🧹</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo12_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo12-3-container">
                        <span class="ambient-task-particle" style="top: 15%; left: 10%; animation-delay: -4s;">⚡</span>
                        <span class="ambient-task-particle" style="top: 75%; left: 80%; animation-delay: -7s;">⚠️</span>

                        <!-- Left: Circular efficiency dial -->
                        <div class="penalty-dial-wrap">
                            <div class="penalty-gauge-outer">
                                <div class="penalty-arc-ring"></div>
                                <div class="penalty-value-core">
                                    <span class="penalty-number-txt">100%</span>
                                    <span class="penalty-lbl-txt">HIỆU SUẤT NÃO</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Performance statistics -->
                        <div class="penalty-dashboard-v12">
                            <div class="penalty-title-v12">Báo cáo tài nguyên não bộ</div>
                            
                            <div class="penalty-row-item work-penalty">
                                <div class="penalty-row-lbl">
                                    <span>Tốc độ xử lý</span>
                                    <span class="penalty-val-highlight speed-val">100%</span>
                                </div>
                            </div>

                            <div class="penalty-row-item">
                                <div class="penalty-row-lbl">
                                    <span>Tỷ lệ mắc sai sót</span>
                                    <span class="penalty-val-highlight error-val" style="color:#10b981;">BÌNH THƯỜNG</span>
                                </div>
                            </div>
                            
                            <span class="penalty-status-badge">TẬP TRUNG TỐT</span>

                            <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                                💡 *Khoản phạt nhận thức*: Khi bắt não đổi bối cảnh liên tục, ta mất trung bình 20-30% thời gian để nạp lại công việc, gây trễ tích lũy và suy kiệt đường glucose.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo12_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo12-4-container">
                        <span class="ambient-task-particle" style="top: 8%; left: 82%; animation-delay: -2s;">🎯</span>
                        <span class="ambient-task-particle" style="top: 78%; left: 12%; animation-delay: -5s;">🌀</span>

                        <!-- Serial vs Multitask Switch panels -->
                        <div class="comparison-row-v12">
                            <!-- Card 1: Serial sequential workflow -->
                            <div class="comparison-card-v12 card-theme-serial card-active">
                                <div class="comp-header-v12">
                                    <h3>LÀM VIỆC TUẦN TỰ</h3>
                                    <div class="comp-icon-badge-v12">🎯</div>
                                </div>
                                
                                <div class="comp-list-v12">
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">✅</span>
                                        <span>Bảo toàn bộ nhớ đệm (Cache)</span>
                                    </div>
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">✅</span>
                                        <span>Hiệu suất tập trung tối đa</span>
                                    </div>
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">✅</span>
                                        <span>Xong việc nhanh, ít lỗi</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v12">NHANH GỌN & TIẾT KIỆM</div>
                            </div>

                            <!-- Card 2: Multitask SWITCHING workflow -->
                            <div class="comparison-card-v12 card-theme-multi card-inactive">
                                <div class="comp-header-v12">
                                    <h3>ĐA NHIỆM PHÂN TÁN</h3>
                                    <div class="comp-icon-badge-v12">⚠️</div>
                                </div>
                                
                                <div class="comp-list-v12">
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">❌</span>
                                        <span>Xoá/nạp lại cache liên tục</span>
                                    </div>
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">❌</span>
                                        <span>Hiệu suất giảm tới 40%</span>
                                    </div>
                                    <div class="comp-row-v12">
                                        <span class="comp-bullet-v12">❌</span>
                                        <span>Dễ stress, tăng tỷ lệ lỗi 2X</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v12">HAO TÀI NGUYÊN NÃO</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo12_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo12-5-container">
                        <div class="calming-wave-v12"></div>
                        
                        <!-- Reassurance speech bubble -->
                        <div class="outro-reassurance-box-v12" style="transform: scale(0.9); opacity: 0;">
                            <div class="reassurance-face-v12">🎯</div>
                            <div class="reassurance-text-v12">
                                "Tập trung sâu vào một việc chính là siêu năng lực tối thượng giúp bạn bứt phá hiệu năng!"
                            </div>
                        </div>
                        
                        <!-- CTA follow banner -->
                        <div class="outro-cta-banner-v12">
                            <div class="outro-cta-logo-v12">DOM MEMO</div>
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
        if (slideId === 'slide_memo12_1') {
            const overlay = canvas.querySelector('.switcher-selector-overlay');
            const workPanel = canvas.querySelector('.task-panel-v12.task-theme-work');
            const chatPanel = canvas.querySelector('.task-panel-v12.task-theme-chat');

            // Rapid switching back and forth (18 toggles based on progress)
            const numToggles = 18;
            const toggledIndex = Math.floor(progress * numToggles) % 2;

            if (overlay) {
                if (toggledIndex === 0) {
                    overlay.style.left = '70px';
                    if (workPanel) workPanel.classList.add('active-task-pulse');
                    if (chatPanel) chatPanel.classList.remove('active-task-pulse');
                } else {
                    overlay.style.left = '410px';
                    if (workPanel) workPanel.classList.remove('active-task-pulse');
                    if (chatPanel) chatPanel.classList.add('active-task-pulse');
                }
            }
        }
        else if (slideId === 'slide_memo12_2') {
            const workFill = canvas.querySelector('.work-fill');
            const workBadge = canvas.querySelector('.work-badge');
            const chatFill = canvas.querySelector('.chat-fill');
            const chatBadge = canvas.querySelector('.chat-badge');
            const alertText = canvas.querySelector('.cache-text-alert');

            // 4 switching phases:
            // Phase 1 (0 to 0.25): Work loads. Work fill 0->100%, Chat waiting.
            // Phase 2 (0.25 to 0.5): Switch! Cache clears. Work drops, Chat loads.
            // Phase 3 (0.5 to 0.75): Switch! Cache clears. Chat drops, Work loads.
            // Phase 4 (0.75 to 1.0): Overload alerts.
            if (progress < 0.25) {
                const ratio = progress / 0.25;
                if (workFill) workFill.style.width = `${ratio * 100}%`;
                if (workBadge) {
                    workBadge.textContent = 'ĐANG NẠP...';
                    workBadge.className = 'cache-status-badge work-badge loading';
                }
                if (chatFill) chatFill.style.width = '0%';
                if (chatBadge) {
                    chatBadge.textContent = 'ĐANG CHỜ...';
                    chatBadge.className = 'cache-status-badge chat-badge waiting';
                }
                if (alertText) alertText.classList.remove('active');
            }
            else if (progress < 0.5) {
                const ratio = (progress - 0.25) / 0.25;
                if (workFill) workFill.style.width = '0%';
                if (workBadge) {
                    workBadge.textContent = 'ĐÃ XÓA 🧹';
                    workBadge.className = 'cache-status-badge work-badge clearing';
                }
                if (chatFill) chatFill.style.width = `${ratio * 100}%`;
                if (chatBadge) {
                    chatBadge.textContent = 'ĐANG NẠP...';
                    chatBadge.className = 'cache-status-badge chat-badge loading';
                }
                if (alertText) {
                    alertText.textContent = 'XÓA CACHE LÀM VIỆC! 🧹';
                    alertText.classList.add('active');
                }
            }
            else if (progress < 0.75) {
                const ratio = (progress - 0.5) / 0.25;
                if (workFill) workFill.style.width = `${ratio * 100}%`;
                if (workBadge) {
                    workBadge.textContent = 'ĐANG NẠP...';
                    workBadge.className = 'cache-status-badge work-badge loading';
                }
                if (chatFill) chatFill.style.width = '0%';
                if (chatBadge) {
                    chatBadge.textContent = 'ĐÃ XÓA 🧹';
                    chatBadge.className = 'cache-status-badge chat-badge clearing';
                }
                if (alertText) {
                    alertText.textContent = 'XÓA CACHE TIN NHẮN! 🧹';
                    alertText.classList.add('active');
                }
            }
            else {
                if (workFill) workFill.style.width = '20%';
                if (workBadge) {
                    workBadge.textContent = 'TRÌ HOÃN';
                    workBadge.className = 'cache-status-badge work-badge clearing';
                }
                if (chatFill) chatFill.style.width = '20%';
                if (chatBadge) {
                    chatBadge.textContent = 'TRÌ HOÃN';
                    chatBadge.className = 'cache-status-badge chat-badge clearing';
                }
                if (alertText) {
                    alertText.textContent = '⚠️ NÃO QUÁ TẢI (CONTEXT SWITCH OVERHEAD)';
                    alertText.classList.add('active');
                }
            }
        }
        else if (slideId === 'slide_memo12_3') {
            const gaugeOuter = canvas.querySelector('.penalty-gauge-outer');
            const dialValText = canvas.querySelector('.penalty-number-txt');
            const speedVal = canvas.querySelector('.speed-val');
            const errorVal = canvas.querySelector('.error-val');
            const statusBadge = canvas.querySelector('.penalty-status-badge');

            // Progress < 0.3: High performance (100%)
            // Progress 0.3 to 0.8: Performance drops (100% -> 40%)
            if (progress < 0.3) {
                if (gaugeOuter) gaugeOuter.classList.remove('overload-state');
                if (dialValText) dialValText.textContent = '100%';
                if (speedVal) speedVal.textContent = '100%';
                if (errorVal) {
                    errorVal.textContent = 'BÌNH THƯỜNG';
                    errorVal.style.color = '#10b981';
                }
                if (statusBadge) {
                    statusBadge.textContent = 'TẬP TRUNG TỐT';
                    statusBadge.classList.remove('overload');
                }
            } else {
                const ratio = Math.min(1.0, (progress - 0.3) / 0.5);
                const curVal = Math.round(100 - (100 - 40) * ratio);

                if (gaugeOuter) gaugeOuter.classList.add('overload-state');
                if (dialValText) dialValText.textContent = `${curVal}%`;
                if (speedVal) speedVal.textContent = `${curVal}%`;
                if (errorVal) {
                    errorVal.textContent = 'TĂNG GẤP 2 LẦN ⚠️';
                    errorVal.style.color = '#ef4444';
                }
                if (statusBadge) {
                    statusBadge.textContent = 'HIỆU SUẤT GIẢM 40% ⚠️';
                    statusBadge.classList.add('overload');
                }
            }
        }
        else if (slideId === 'slide_memo12_4') {
            const serialCard = canvas.querySelector('.card-theme-serial');
            const multiCard = canvas.querySelector('.card-theme-multi');

            // Swap highlights
            if (progress < 0.5) {
                if (serialCard) {
                    serialCard.classList.remove('card-inactive');
                    serialCard.classList.add('card-active');
                }
                if (multiCard) {
                    multiCard.classList.remove('card-active');
                    multiCard.classList.add('card-inactive');
                }
            } else {
                if (serialCard) {
                    serialCard.classList.remove('card-active');
                    serialCard.classList.add('card-inactive');
                }
                if (multiCard) {
                    multiCard.classList.remove('card-inactive');
                    multiCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo12_5') {
            const box = canvas.querySelector('.outro-reassurance-box-v12');

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
        scriptName: 'video12',
        topic: 'Multitasking switch cost',
        episodeNum: 12,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 12 Plugin] Loaded: Multitasking switch cost ready.');
})();
