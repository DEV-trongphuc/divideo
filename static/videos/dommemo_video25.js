/**
 * DOM Memo Video 25: Zeigarnik Effect (Nhiệm vụ dở dang)
 * Custom script plugin driving tab manager flashing loops, prefrontal cortex buffer indicators, and checklist closures.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo25_1: [
            { text: 'làm dở dang', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'bị cắt ngang giữa chừng', start: 5.0, end: 8.0, class: 'active-red' },
            { text: 'bám riết lấy tâm trí bạn', start: 8.2, end: 11.2, class: 'active-red' }
        ],
        slide_memo25_2: [
            { text: 'nhiệm vụ chưa hoàn tất', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'trạng thái mở', start: 4.8, end: 7.8, class: 'active-red' },
            { text: 'liên tục nhắc nhở', start: 8.2, end: 11.0, class: 'active-red' }
        ],
        slide_memo25_3: [
            { text: 'hoàn thành sẽ được đóng', start: 2.0, end: 5.0, class: 'active-green' },
            { text: 'công việc dở dang', start: 5.5, end: 8.5, class: 'active-red' },
            { text: 'tiêu hao năng lượng glucose', start: 9.0, end: 12.0, class: 'active-red' }
        ],
        slide_memo25_4: [
            { text: 'không tốn năng lượng', start: 2.0, end: 5.0, class: 'active-green' },
            { text: 'bộ nhớ đệm trước trán', start: 5.5, end: 8.5, class: 'active-red' },
            { text: 'gửi tín hiệu cảnh báo', start: 9.0, end: 11.5, class: 'active-red' }
        ],
        slide_memo25_5: [
            { text: 'viết chúng ra giấy', start: 1.5, end: 4.5, class: 'active-green' },
            { text: 'đánh lừa não bộ', start: 4.8, end: 7.8, class: 'active-green' },
            { text: 'đóng lại các vòng lặp', start: 8.2, end: 11.0, class: 'active-green' }
        ],
        slide_memo25_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-green' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-red' }
        ]
    };

    const customSlideIds = [
        'slide_memo25_1', 'slide_memo25_2', 'slide_memo25_3', 'slide_memo25_4', 'slide_memo25_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo25_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo25-1-container">
                        <!-- Floating Check Particles -->
                        <span class="ambient-check-particle-v25" style="top: 15%; left: 8%; animation-delay: -1s;">✔️</span>
                        <span class="ambient-check-particle-v25" style="top: 75%; left: 88%; animation-delay: -3s;">❌</span>
                        <span class="ambient-check-particle-v25" style="top: 20%; left: 80%; animation-delay: -5s;">📝</span>

                        <div class="check-hook-box">
                            <div class="hook-todo-list">
                                <div class="hook-todo-item done">✔️ Task A: Soạn báo cáo (Xong)</div>
                                <div class="hook-todo-item done">✔️ Task B: Gửi email khách (Xong)</div>
                                <div class="hook-todo-item pending">❌ Task C: Soạn hợp đồng (DỞ DANG!)</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo25_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo25-2-container">
                        <span class="ambient-check-particle-v25" style="top: 8%; left: 85%; animation-delay: -2s;">📝</span>
                        <span class="ambient-check-particle-v25" style="top: 82%; left: 10%; animation-delay: -4s;">✔️</span>

                        <div class="check-diagram-board">
                            <div class="diagram-node-v25 node-start">
                                <span class="diagram-node-icon">📝</span>
                                <span>1. Việc Dở Dang</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v25 node-buffer">
                                <span class="diagram-node-icon">🔁</span>
                                <span>2. Bộ Nhớ Đệm</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v25 node-archive">
                                <span class="diagram-node-icon">📁</span>
                                <span>3. Đóng Vòng Lặp</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Zeigarnik Effect*: Bộ não giữ các nhiệm vụ chưa hoàn tất trong hồi hải mã và thùy trước trán (Working Memory) để bạn luôn nhớ về chúng. Chỉ khi nhiệm vụ nhận tín hiệu "đã hoàn tất", năng lượng điện não mới được ngắt giải phóng.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo25_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo25-3-container">
                        <span class="ambient-check-particle-v25" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-check-particle-v25" style="top: 80%; left: 82%; animation-delay: -5s;">📝</span>

                        <!-- Left Panel: Memory Tab Manager -->
                        <div class="tab-manager-panel-v25">
                            <div class="memory-tab-row tab-done">
                                <span class="tab-lbl">Tab A: Học Tiếng Anh (Xong)</span>
                                <span class="tab-check-v25">✔️</span>
                            </div>
                            <div class="memory-tab-row tab-done">
                                <span class="tab-lbl">Tab B: Đi chợ mua đồ (Xong)</span>
                                <span class="tab-check-v25">✔️</span>
                            </div>
                            <div class="memory-tab-row tab-pending">
                                <span class="tab-lbl tab-pending-lbl">Tab C: Soạn Dự án (DỞ DANG)</span>
                                <span class="tab-check-v25 tab-pending-check">⚠️</span>
                            </div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="buffer-dashboard-v25">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                BỘ NHỚ ĐỆM TRƯỚC TRÁN
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái bộ nhớ</span>
                                <span class="buffer-status-badge overload">Quá Tải Cảnh Báo (85%)</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Open Loops*: Bộ não coi các tab dở dang là các vòng lặp mở tiêu tốn glucose. Viết chúng ra Todo-list trước khi ngủ là mẹo vàng đóng băng vòng lặp này.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo25_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo25-4-container">
                        <span class="ambient-check-particle-v25" style="top: 12%; left: 85%; animation-delay: -2s;">📝</span>
                        <span class="ambient-check-particle-v25" style="top: 78%; left: 12%; animation-delay: -5s;">✔️</span>

                        <div class="comp-row-v25">
                            <!-- Left Card: Closed task -->
                            <div class="comp-card-v25 card-theme-closed card-active">
                                <div class="comp-header-v25">
                                    <h3>VIỆC ĐÃ HOÀN TẤT</h3>
                                    <div class="comp-icon-v25">✔️</div>
                                </div>

                                <div class="comp-bullet-list-v25">
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">✨</span>
                                        <span>Bộ nhớ lưu trữ dài hạn ở dạng tĩnh</span>
                                    </div>
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">✨</span>
                                        <span>Tốn 0% năng lượng hoạt động điện não</span>
                                    </div>
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">✨</span>
                                        <span>Trả lại sự tĩnh lặng bình yên cho tâm trí</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v25">VÒNG LẶP ĐÃ ĐÓNG</div>
                            </div>

                            <!-- Right Card: Unfinished task -->
                            <div class="comp-card-v25 card-theme-open card-inactive">
                                <div class="comp-header-v25">
                                    <h3>VIỆC DỞ DANG</h3>
                                    <div class="comp-icon-v25">⚠️</div>
                                </div>

                                <div class="comp-bullet-list-v25">
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">❌</span>
                                        <span>Tồn đọng liên tục ở bộ nhớ đệm trước trán</span>
                                    </div>
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">❌</span>
                                        <span>Gửi tín hiệu báo động nhấp nháy liên tiếp</span>
                                    </div>
                                    <div class="comp-bullet-row-v25">
                                        <span class="comp-bullet-icon-v25">❌</span>
                                        <span>Gây xao nhãng và mệt mỏi tinh thần</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v25">VÒNG LẶP ĐANG MỞ</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo25_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo25-5-container">
                        <div class="takeaway-radar-v25"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v25" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v25">📝</div>
                            <div class="takeaway-text-v25">
                                "Lần tới trước khi ngủ, hãy dành 2 phút viết Todo-list cho ngày mai. Hành động này thuyết phục não rằng kế hoạch đã sẵn sàng và tắt các cảnh báo dở dang!"
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
        if (slideId === 'slide_memo25_1') {
            // todo pending item vibration handled via CSS keyframes keying off pending class
        }
        else if (slideId === 'slide_memo25_2') {
            const startNode = canvas.querySelector('.node-start');
            const bufferNode = canvas.querySelector('.node-buffer');
            const archiveNode = canvas.querySelector('.node-archive');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (startNode) startNode.classList.add('active-node');
                if (bufferNode) bufferNode.classList.add('active-node');
                if (archiveNode) archiveNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.add('highlight-link-green');
                    arrow2.classList.remove('highlight-link');
                }
            } else if (progress >= 0.35) {
                if (startNode) startNode.classList.add('active-node');
                if (bufferNode) bufferNode.classList.add('active-node');
                if (archiveNode) archiveNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-green');
                    arrow2.classList.remove('highlight-link');
                }
            } else {
                if (startNode) startNode.classList.add('active-node');
                if (bufferNode) bufferNode.classList.remove('active-node');
                if (archiveNode) archiveNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) {
                    arrow2.classList.remove('highlight-link-green');
                    arrow2.classList.remove('highlight-link');
                }
            }
        }
        else if (slideId === 'slide_memo25_3') {
            const tabC = canvas.querySelector('.tab-pending');
            const tabCLbl = canvas.querySelector('.tab-pending-lbl');
            const tabCCheck = canvas.querySelector('.tab-pending-check');
            const statusTag = canvas.querySelector('.buffer-status-badge');

            if (progress < 0.5) {
                // Loop is open/flashing and wiggling
                if (tabC) {
                    tabC.className = 'memory-tab-row tab-pending';
                    const wiggle = Math.sin(progress * 50) * 2;
                    tabC.style.transform = `translateX(${wiggle}px)`;
                }
                if (tabCLbl) {
                    tabCLbl.textContent = 'Tab C: Soạn Dự án (DỞ DANG)';
                    tabCLbl.style.textDecoration = 'none';
                }
                if (tabCCheck) tabCCheck.textContent = '⚠️';
                if (statusTag) {
                    statusTag.textContent = 'Quá Tải Cảnh Báo (85%)';
                    statusTag.className = 'buffer-status-badge overload';
                }
            } else {
                // Loop is closed
                if (tabC) {
                    tabC.className = 'memory-tab-row tab-done';
                    tabC.style.transform = '';
                }
                if (tabCLbl) {
                    tabCLbl.textContent = 'Tab C: Soạn Dự án (Hoàn tất)';
                    tabCLbl.style.textDecoration = 'line-through';
                }
                if (tabCCheck) tabCCheck.textContent = '✔️';
                if (statusTag) {
                    statusTag.textContent = 'Tĩnh Lặng An Toàn (10%)';
                    statusTag.className = 'buffer-status-badge clean';
                }
            }
        }
        else if (slideId === 'slide_memo25_4') {
            const closedCard = canvas.querySelector('.card-theme-closed');
            const openCard = canvas.querySelector('.card-theme-open');

            if (progress < 0.5) {
                if (closedCard) {
                    closedCard.classList.remove('card-inactive');
                    closedCard.classList.add('card-active');
                }
                if (openCard) {
                    openCard.classList.remove('card-active');
                    openCard.classList.add('card-inactive');
                }
            } else {
                if (closedCard) {
                    closedCard.classList.remove('card-active');
                    closedCard.classList.add('card-inactive');
                }
                if (openCard) {
                    openCard.classList.remove('card-inactive');
                    openCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const closedBullets = closedCard ? closedCard.querySelectorAll('.comp-bullet-row-v25') : [];
            const openBullets = openCard ? openCard.querySelectorAll('.comp-bullet-row-v25') : [];

            closedBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            openBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo25_5') {
            const box = canvas.querySelector('.takeaway-box-v25');
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
        scriptName: 'video25',
        topic: 'Zeigarnik Effect',
        episodeNum: 25,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 25 Plugin] Loaded: Zeigarnik Effect ready.');
})();
