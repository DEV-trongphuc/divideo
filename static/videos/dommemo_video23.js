/**
 * DOM Memo Video 23: Context Recognition (Nhận diện bối cảnh)
 * Custom script plugin driving backdrop shifts, face scanning laser sweeps, and comparison card highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo23_1: [
            { text: 'gặp hàng ngày ở văn phòng', start: 1.5, end: 4.5, class: 'active-gold' },
            { text: 'vô tình chạm mặt ở siêu thị', start: 5.0, end: 8.0, class: 'active-steel' },
            { text: 'không thể nhớ ra họ', start: 8.5, end: 11.2, class: 'active-gold' }
        ],
        slide_memo23_2: [
            { text: 'không chỉ lưu trữ khuôn mặt', start: 1.5, end: 4.5, class: 'active-steel' },
            { text: 'gói thông tin', start: 4.8, end: 7.8, class: 'active-gold' },
            { text: 'bối cảnh xung quanh', start: 8.2, end: 11.0, class: 'active-gold' }
        ],
        slide_memo23_3: [
            { text: 'bối cảnh khớp hoàn hảo', start: 2.0, end: 5.0, class: 'active-gold' },
            { text: 'tỷ lệ nhận diện đạt', start: 5.5, end: 8.5, class: 'active-gold' },
            { text: 'sự lệch bối cảnh', start: 9.0, end: 12.0, class: 'active-steel' }
        ],
        slide_memo23_4: [
            { text: 'quét các pixel ngũ quan', start: 2.0, end: 5.0, class: 'active-steel' },
            { text: 'quét toàn bộ bối cảnh', start: 5.5, end: 8.5, class: 'active-gold' },
            { text: 'quét sâu chậm chạp', start: 9.0, end: 11.5, class: 'active-steel' }
        ],
        slide_memo23_5: [
            { text: 'đừng cố nhìn chằm chằm', start: 1.5, end: 4.5, class: 'active-steel' },
            { text: 'nghĩ về những nơi thường gặp', start: 4.8, end: 7.8, class: 'active-gold' },
            { text: 'lập tức truy xuất', start: 8.2, end: 11.0, class: 'active-gold' }
        ],
        slide_memo23_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-gold' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-steel' }
        ]
    };

    const customSlideIds = [
        'slide_memo23_1', 'slide_memo23_2', 'slide_memo23_3', 'slide_memo23_4', 'slide_memo23_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo23_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo23-1-container">
                        <!-- Floating Context Particles -->
                        <span class="ambient-context-particle-v23" style="top: 15%; left: 8%; animation-delay: -1s;">❓</span>
                        <span class="ambient-context-particle-v23" style="top: 75%; left: 88%; animation-delay: -3s;">🏢</span>
                        <span class="ambient-context-particle-v23" style="top: 20%; left: 80%; animation-delay: -5s;">🏖️</span>

                        <div class="scan-hook-box">
                            <div class="pulsing-face-v23">👤</div>
                            <div class="hook-laser-line-v23"></div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo23_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo23-2-container">
                        <span class="ambient-context-particle-v23" style="top: 8%; left: 85%; animation-delay: -2s;">🏢</span>
                        <span class="ambient-context-particle-v23" style="top: 82%; left: 10%; animation-delay: -4s;">🏖️</span>

                        <div class="scan-diagram-board">
                            <div class="diagram-node-v23 node-face">
                                <span class="diagram-node-icon">👤</span>
                                <span>1. Chi Tiết Mặt</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➕</span>
                            <div class="diagram-node-v23 node-context">
                                <span class="diagram-node-icon">🗺️</span>
                                <span>2. Thẻ Bối Cảnh</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v23 node-memory">
                                <span class="diagram-node-icon">🧠</span>
                                <span>3. Gợi Nhớ Nhanh</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Context-Dependent Memory*: Trí nhớ hoạt động theo cụm. Khi ghi nhớ một khuôn mặt, thùy hải mã đồng thời chụp lại "backdrops" bao quanh. Sự vắng mặt của bối cảnh làm nghẽn quá trình truy xuất liên kết.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo23_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo23-3-container">
                        <span class="ambient-context-particle-v23" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-context-particle-v23" style="top: 80%; left: 82%; animation-delay: -5s;">👤</span>

                        <!-- Left Panel: Face Scanner & Backdrop Shifter -->
                        <div class="scan-panel-v23">
                            <div class="pulsing-face-v23" style="font-size: 60px; animation-duration: 3s;">👤</div>
                            <div class="backdrop-label-v23 office">🏢 VĂN PHÒNG QUEN THUỘC</div>
                            <div class="sim-laser-line-v23"></div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="scan-dashboard-v23">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                TỶ LỆ KHỚP KHUÔN MẶT
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Kết quả nhận diện</span>
                                <span class="scan-status-badge match">Khớp! (95%)</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Chỉ mục thông tin*: Không gian xung quanh đóng vai trò như chỉ mục dữ liệu. Khi bối cảnh bị lệch, não bộ buộc phải chạy cơ chế quét sâu cực kỳ chậm chạp và tốn năng lượng.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo23_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo23-4-container">
                        <span class="ambient-context-particle-v23" style="top: 12%; left: 85%; animation-delay: -2s;">🏢</span>
                        <span class="ambient-context-particle-v23" style="top: 78%; left: 12%; animation-delay: -5s;">👤</span>

                        <div class="comp-row-v23">
                            <!-- Left Card: Pure Feature Scan -->
                            <div class="comp-card-v23 card-theme-features card-active">
                                <div class="comp-header-v23">
                                    <h3>QUÉT ĐIỂM NGŨ QUAN</h3>
                                    <div class="comp-icon-v23">📐</div>
                                </div>

                                <div class="comp-bullet-list-v23">
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">❌</span>
                                        <span>Chỉ đối chiếu hình học mắt, mũi, miệng</span>
                                    </div>
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">❌</span>
                                        <span>Truy xuất dữ liệu chậm chạp</span>
                                    </div>
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">❌</span>
                                        <span>Dễ đứng hình khi gặp bối cảnh lạ</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v23">QUÉT HÌNH HỌC THÔ</div>
                            </div>

                            <!-- Right Card: Contextual Indexing -->
                            <div class="comp-card-v23 card-theme-context card-inactive">
                                <div class="comp-header-v23">
                                    <h3>QUÉT THEO LIÊN TƯỞNG</h3>
                                    <div class="comp-icon-v23">⚡</div>
                                </div>

                                <div class="comp-bullet-list-v23">
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">✨</span>
                                        <span>Khớp nét mặt đi kèm trang phục & vị trí</span>
                                    </div>
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">✨</span>
                                        <span>Kích hoạt cụm liên kết trí nhớ tức thì</span>
                                    </div>
                                    <div class="comp-bullet-row-v23">
                                        <span class="comp-bullet-icon-v23">✨</span>
                                        <span>Gợi nhớ siêu tốc nhờ khớp chỉ mục</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v23">TRUY XUẤT ĐỒNG BỘ</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo23_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo23-5-container">
                        <div class="takeaway-radar-v23"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v23" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v23">💡</div>
                            <div class="takeaway-text-v23">
                                "Đừng cố căng mắt nhìn đối phương khi chưa nhớ ra. Hãy nhắm mắt một giây, nghĩ về không gian làm việc hoặc quán cafe quen, não bạn sẽ có câu trả lời!"
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
        if (slideId === 'slide_memo23_1') {
            // Laser scan run automatically by CSS
        }
        else if (slideId === 'slide_memo23_2') {
            const faceNode = canvas.querySelector('.node-face');
            const contextNode = canvas.querySelector('.node-context');
            const memoryNode = canvas.querySelector('.node-memory');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (faceNode) faceNode.classList.add('active-node');
                if (contextNode) contextNode.classList.add('active-node');
                if (memoryNode) memoryNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (faceNode) faceNode.classList.add('active-node');
                if (contextNode) contextNode.classList.add('active-node');
                if (memoryNode) memoryNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            } else {
                if (faceNode) faceNode.classList.add('active-node');
                if (contextNode) contextNode.classList.remove('active-node');
                if (memoryNode) memoryNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo23_3') {
            const label = canvas.querySelector('.backdrop-label-v23');
            const laser = canvas.querySelector('.sim-laser-line-v23');
            const statusTag = canvas.querySelector('.scan-status-badge');

            // Running laser scan
            const laserY = 15 + Math.abs(Math.sin(progress * 12)) * 190;
            if (laser) laser.style.top = `${laserY}px`;

            if (progress < 0.5) {
                if (label) {
                    label.textContent = '🏢 VĂN PHÒNG QUEN THUỘC';
                    label.className = 'backdrop-label-v23 office';
                }
                if (statusTag) {
                    statusTag.textContent = 'Khớp! (95%)';
                    statusTag.className = 'scan-status-badge match';
                }
                if (laser) {
                    laser.style.background = 'var(--memo23-gold)';
                    laser.style.boxShadow = '0 0 10px var(--memo23-gold)';
                }
            } else {
                if (label) {
                    label.textContent = '🏖️ BÃI BIỂN CÔNG CỘNG';
                    label.className = 'backdrop-label-v23 beach';
                }
                if (statusTag) {
                    statusTag.textContent = 'Lệch Bối Cảnh (40%)';
                    statusTag.className = 'scan-status-badge miss';
                }
                if (laser) {
                    laser.style.background = 'var(--memo23-red)';
                    laser.style.boxShadow = '0 0 10px var(--memo23-red)';
                }
            }
        }
        else if (slideId === 'slide_memo23_4') {
            const featuresCard = canvas.querySelector('.card-theme-features');
            const contextCard = canvas.querySelector('.card-theme-context');

            if (progress < 0.5) {
                if (featuresCard) {
                    featuresCard.classList.remove('card-inactive');
                    featuresCard.classList.add('card-active');
                }
                if (contextCard) {
                    contextCard.classList.remove('card-active');
                    contextCard.classList.add('card-inactive');
                }
            } else {
                if (featuresCard) {
                    featuresCard.classList.remove('card-active');
                    featuresCard.classList.add('card-inactive');
                }
                if (contextCard) {
                    contextCard.classList.remove('card-inactive');
                    contextCard.classList.add('card-active');
                }
            }

            // Progressive bullet row reveals
            const featuresBullets = featuresCard ? featuresCard.querySelectorAll('.comp-bullet-row-v23') : [];
            const contextBullets = contextCard ? contextCard.querySelectorAll('.comp-bullet-row-v23') : [];

            featuresBullets.forEach((bullet, bIdx) => {
                const triggerProgress = 0.1 + bIdx * 0.1;
                if (progress >= triggerProgress) {
                    bullet.style.opacity = '1';
                    bullet.style.transform = 'translateY(0)';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.transform = 'translateY(15px)';
                }
            });

            contextBullets.forEach((bullet, bIdx) => {
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
        else if (slideId === 'slide_memo23_5') {
            const box = canvas.querySelector('.takeaway-box-v23');
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
        scriptName: 'video23',
        topic: 'Context Recognition',
        episodeNum: 23,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 23 Plugin] Loaded: Context Recognition ready.');
})();
