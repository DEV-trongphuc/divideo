/**
 * DOM Memo Video 21: Peak-End Rule (Quy luật Đỉnh - Kết)
 * Custom script plugin driving timeline scanning, peak/end highlight pulses, and memory pathway synthesis.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo21_1: [
            { text: 'gặp một sự cố tồi tệ', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'sự cố tồi tệ ở phút cuối', start: 5.0, end: 8.0, class: 'active-red' },
            { text: 'biến thành một trải nghiệm tồi tệ', start: 8.2, end: 11.2, class: 'active-red' }
        ],
        slide_memo21_2: [
            { text: 'không tính trung bình cộng', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'khoảnh khắc cao trào nhất', start: 4.8, end: 7.8, class: 'active-emerald' },
            { text: 'phần kết thúc', start: 8.2, end: 11.0, class: 'active-red' }
        ],
        slide_memo21_3: [
            { text: 'thăng trầm', start: 2.0, end: 5.0, class: 'active-emerald' },
            { text: 'Đỉnh cao trào', start: 5.5, end: 8.5, class: 'active-emerald' },
            { text: 'Kết thúc để ghi nhớ', start: 9.0, end: 11.5, class: 'active-red' }
        ],
        slide_memo21_4: [
            { text: 'tích cực chiếm đa số', start: 2.0, end: 5.0, class: 'active-emerald' },
            { text: 'bóp méo hoàn toàn', start: 5.5, end: 8.5, class: 'active-red' },
            { text: 'đánh giá sai bản chất', start: 9.0, end: 11.5, class: 'active-red' }
        ],
        slide_memo21_5: [
            { text: 'kết thúc ngày làm việc', start: 1.5, end: 4.5, class: 'active-emerald' },
            { text: 'niềm vui nhỏ', start: 4.8, end: 7.8, class: 'active-emerald' },
            { text: 'neo giữ những ký ức', start: 8.2, end: 11.0, class: 'active-emerald' }
        ],
        slide_memo21_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-emerald' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-red' }
        ]
    };

    const customSlideIds = [
        'slide_memo21_1', 'slide_memo21_2', 'slide_memo21_3', 'slide_memo21_4', 'slide_memo21_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo21_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo21-1-container">
                        <!-- Floating Emotion Particles -->
                        <span class="ambient-emotion-particle" style="top: 15%; left: 8%; animation-delay: -1s;">⭐</span>
                        <span class="ambient-emotion-particle" style="top: 75%; left: 88%; animation-delay: -3s;">⚠️</span>
                        <span class="ambient-emotion-particle" style="top: 20%; left: 80%; animation-delay: -5s;">❤️</span>

                        <div class="emotion-hook-box">
                            <div class="happy-sad-emoji-wrapper">
                                <span class="hook-happy-emoji">😊</span>
                                <span class="hook-sad-emoji">😢</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo21_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo21-2-container">
                        <span class="ambient-emotion-particle" style="top: 8%; left: 85%; animation-delay: -2s;">⭐</span>
                        <span class="ambient-emotion-particle" style="top: 82%; left: 10%; animation-delay: -4s;">❤️</span>

                        <div class="emotion-diagram-board">
                            <div class="diagram-node-v21 node-peak">
                                <span class="diagram-node-icon">⭐</span>
                                <span>1. Điểm Cao Trào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v21 node-ending">
                                <span class="diagram-node-icon">😢</span>
                                <span>2. Điểm Kết Thúc</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v21 node-memory">
                                <span class="diagram-node-icon">🧠</span>
                                <span>3. Ký Ức Đóng Khung</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Peak-End Rule*: Não bộ hoạt động như một nhà biên tập phim cắt cúp. Nó loại bỏ hầu hết thời gian trải nghiệm và chỉ dùng điểm cực trị cảm xúc cùng cái kết để viết lại lịch sử ký ức.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo21_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo21-3-container">
                        <span class="ambient-emotion-particle" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-emotion-particle" style="top: 80%; left: 82%; animation-delay: -5s;">⭐</span>

                        <!-- Left Panel: Chart coordinate -->
                        <div class="experience-chart-panel-v21">
                            <div class="chart-svg-container">
                                <!-- SVG curves -->
                                <svg width="380" height="160" style="position: absolute; top: 0; left: 0;">
                                    <line x1="20" y1="80" x2="360" y2="80" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
                                    <!-- Base grey experience curve -->
                                    <path class="chart-line-v21" d="M 20 80 Q 90 20, 150 15 T 250 90 T 360 145" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="3" />
                                    <!-- Active emerald experience curve -->
                                    <path class="active-chart-line-v21" d="M 20 80 Q 90 20, 150 15 T 250 90 T 360 145" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400" style="transition: stroke-dashoffset 0.05s ease;" />
                                    <!-- Selected gold memories links -->
                                    <path class="selected-memory-line-v21" d="" fill="none" stroke="var(--memo21-gold)" stroke-width="4" stroke-dasharray="6,4" style="opacity: 0; transition: opacity 0.4s ease;" />
                                </svg>

                                <!-- Node points -->
                                <div class="chart-node-v21 node-pt-1" style="left: 20px; top: 80px;"></div>
                                <div class="chart-node-v21 node-pt-2" style="left: 90px; top: 50px;"></div>
                                <div class="chart-node-v21 node-pt-3 peak-node" style="left: 150px; top: 15px;"></div>
                                <div class="chart-node-v21 node-pt-4" style="left: 250px; top: 75px;"></div>
                                <div class="chart-node-v21 node-pt-5 end-node" style="left: 360px; top: 145px;"></div>

                                <!-- Scanning vertical cursor -->
                                <div class="chart-cursor-v21" style="left: 20px;"></div>
                            </div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="retrospect-dashboard-v21">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                TỔNG KẾT TRẢI NGHIỆM
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Đánh giá hồi tưởng</span>
                                <span class="retrospect-status-badge neutral">Đang phân tích...</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Công thức Hồi tưởng*: Trí nhớ dài hạn = (Định Đỉnh + Điểm Kết) / 2. Mọi đoạn bằng phẳng hoặc tích cực ở giữa đều bị lướt qua khi não thiết lập lưu trữ.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo21_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo21-4-container">
                        <span class="ambient-emotion-particle" style="top: 12%; left: 85%; animation-delay: -2s;">⭐</span>
                        <span class="ambient-emotion-particle" style="top: 78%; left: 12%; animation-delay: -5s;">💔</span>

                        <div class="comp-row-v21">
                            <!-- Left Card: Average Reality -->
                            <div class="comp-card-v21 card-theme-average card-active">
                                <div class="comp-header-v21">
                                    <h3>TRUNG BÌNH THỰC TẾ</h3>
                                    <div class="comp-icon-v21">📈</div>
                                </div>

                                <div class="comp-bullet-list-v21">
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">✨</span>
                                        <span>90% thời lượng chuyến đi vui vẻ</span>
                                    </div>
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">✨</span>
                                        <span>Nhiều cột mốc kỷ niệm tích cực</span>
                                    </div>
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">✨</span>
                                        <span>Giá trị trải nghiệm thực tế cao</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v21">TRUNG BÌNH TÍCH CỰC</div>
                            </div>

                            <!-- Right Card: Skewed Memory -->
                            <div class="comp-card-v21 card-theme-biased card-inactive">
                                <div class="comp-header-v21">
                                    <h3>BẢN GHI CỦA TRÍ NHỚ</h3>
                                    <div class="comp-icon-v21">🧠</div>
                                </div>

                                <div class="comp-bullet-list-v21">
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">❌</span>
                                        <span>Phóng đại điểm kết thúc khó chịu</span>
                                    </div>
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">❌</span>
                                        <span>Bỏ qua 90% sự vui vẻ ở phần giữa</span>
                                    </div>
                                    <div class="comp-bullet-row-v21">
                                        <span class="comp-bullet-icon-v21">❌</span>
                                        <span>Ghi đè nhãn "Chuyến đi tồi tệ"</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v21">BIẾN DẠNG NHẬN THỨC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo21_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo21-5-container">
                        <div class="takeaway-radar-v21"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v21" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v21">🎁</div>
                            <div class="takeaway-text-v21">
                                "Điểm neo cảm xúc ở phút cuối cực kỳ mạnh mẽ. Hãy tặng một món quà nhỏ hoặc nở nụ cười trước khi chia tay để tạo một kết thúc trọn vẹn nhé!"
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
        if (slideId === 'slide_memo21_1') {
            const happy = canvas.querySelector('.hook-happy-emoji');
            const sad = canvas.querySelector('.hook-sad-emoji');
            if (happy && sad) {
                if (progress < 0.5) {
                    happy.style.transform = 'scale(1.4) rotate(10deg)';
                    happy.style.opacity = '1';
                    sad.style.transform = 'scale(0.8)';
                    sad.style.opacity = '0.2';
                } else {
                    happy.style.transform = 'scale(0.8)';
                    happy.style.opacity = '0.2';
                    sad.style.transform = 'scale(1.4) rotate(-10deg)';
                    sad.style.opacity = '1';
                }
            }
        }
        else if (slideId === 'slide_memo21_2') {
            const peakNode = canvas.querySelector('.node-peak');
            const endingNode = canvas.querySelector('.node-ending');
            const memoryNode = canvas.querySelector('.node-memory');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (peakNode) peakNode.classList.add('active-node');
                if (endingNode) endingNode.classList.add('active-node');
                if (memoryNode) memoryNode.classList.add('active-node');
                if (arrow1) {
                    arrow1.classList.add('highlight-link-red');
                    arrow1.classList.remove('highlight-link');
                }
                if (arrow2) arrow2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (peakNode) peakNode.classList.add('active-node');
                if (endingNode) endingNode.classList.add('active-node');
                if (memoryNode) memoryNode.classList.remove('active-node');
                if (arrow1) {
                    arrow1.classList.add('highlight-link-red');
                    arrow1.classList.remove('highlight-link');
                }
                if (arrow2) arrow2.classList.remove('highlight-link');
            } else {
                if (peakNode) peakNode.classList.add('active-node');
                if (endingNode) endingNode.classList.remove('active-node');
                if (memoryNode) memoryNode.classList.remove('active-node');
                if (arrow1) {
                    arrow1.classList.remove('highlight-link-red');
                    arrow1.classList.remove('highlight-link');
                }
                if (arrow2) arrow2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo21_3') {
            const cursor = canvas.querySelector('.chart-cursor-v21');
            const pathLink = canvas.querySelector('.selected-memory-line-v21');
            const activeLine = canvas.querySelector('.active-chart-line-v21');
            const statusTag = canvas.querySelector('.retrospect-status-badge');

            // X-coordinates: 20px (pt 1) to 360px (pt 5)
            const startX = 20;
            const endX = 360;

            const cursorProgress = Math.min(1.0, progress / 0.7);
            const currentX = startX + (endX - startX) * cursorProgress;

            if (cursor) cursor.style.left = `${currentX}px`;

            // Draw active emerald line matching cursor progress
            if (activeLine) {
                const drawOffset = 400 * (1 - cursorProgress);
                activeLine.style.strokeDashoffset = drawOffset;
            }

            // Active pulses
            const node3 = canvas.querySelector('.node-pt-3');
            const node5 = canvas.querySelector('.node-pt-5');

            if (currentX >= 150) {
                if (node3) node3.style.transform = 'translate(-50%, -50%) scale(1.4)';
            } else {
                if (node3) node3.style.transform = '';
            }

            if (currentX >= 360) {
                if (node5) node5.style.transform = 'translate(-50%, -50%) scale(1.4)';
            } else {
                if (node5) node5.style.transform = '';
            }

            // Connection drawing
            if (progress >= 0.7) {
                if (pathLink) {
                    pathLink.setAttribute('d', 'M 150 15 L 360 145');
                    pathLink.style.opacity = '1';
                }
                if (statusTag) {
                    statusTag.textContent = 'Trí nhớ ghi nhận: TỆ HẠI (-30)';
                    statusTag.className = 'retrospect-status-badge ruined';
                }
            } else {
                if (pathLink) {
                    pathLink.style.opacity = '0';
                }
                if (statusTag) {
                    statusTag.textContent = 'Đang phân tích...';
                    statusTag.className = 'retrospect-status-badge neutral';
                }
            }
        }
        else if (slideId === 'slide_memo21_4') {
            const averageCard = canvas.querySelector('.card-theme-average');
            const biasedCard = canvas.querySelector('.card-theme-biased');

            if (progress < 0.5) {
                if (averageCard) {
                    averageCard.classList.remove('card-inactive');
                    averageCard.classList.add('card-active');
                }
                if (biasedCard) {
                    biasedCard.classList.remove('card-active');
                    biasedCard.classList.add('card-inactive');
                }
            } else {
                if (averageCard) {
                    averageCard.classList.remove('card-active');
                    averageCard.classList.add('card-inactive');
                }
                if (biasedCard) {
                    biasedCard.classList.remove('card-inactive');
                    biasedCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const averageBullets = averageCard ? averageCard.querySelectorAll('.comp-bullet-row-v21') : [];
            const biasedBullets = biasedCard ? biasedCard.querySelectorAll('.comp-bullet-row-v21') : [];

            averageBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            biasedBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo21_5') {
            const box = canvas.querySelector('.takeaway-box-v21');
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
        scriptName: 'video21',
        topic: 'Peak-End Rule',
        episodeNum: 21,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 21 Plugin] Loaded: Peak-End Rule ready.');
})();
