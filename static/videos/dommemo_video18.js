/**
 * DOM Memo Video 18: Saccadic Suppression (Che giấu chuyển động mắt)
 * Custom script plugin driving camera blur simulation, eye trajectory movement, and motion suppression comparison cards.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo18_1: [
            { text: 'đảo mắt qua lại', start: 1.5, end: 4.5, class: 'active-yellow' },
            { text: 'rung lắc điên cuồng', start: 5.0, end: 8.0, class: 'active-slate' },
            { text: 'không cảm nhận được', start: 8.5, end: 11.0, class: 'active-yellow' }
        ],
        slide_memo18_2: [
            { text: 'ức chế vận nhãn', start: 1.5, end: 4.5, class: 'active-yellow' },
            { text: 'tạm thời giảm xử lý', start: 5.0, end: 8.0, class: 'active-slate' },
            { text: 'chặn hoàn toàn cảm giác nhòe', start: 8.5, end: 11.2, class: 'active-yellow' }
        ],
        slide_memo18_3: [
            { text: 'di chuyển nhanh', start: 2.0, end: 5.0, class: 'active-slate' },
            { text: 'bật chế độ che mờ', start: 5.5, end: 8.5, class: 'active-yellow' },
            { text: 'ngắt luồng thông tin hình ảnh', start: 9.0, end: 12.0, class: 'active-slate' }
        ],
        slide_memo18_4: [
            { text: 'nhòe và rung lắc dữ dội', start: 2.0, end: 5.0, class: 'active-slate' },
            { text: 'cắt bỏ hoàn toàn', start: 5.5, end: 8.2, class: 'active-yellow' },
            { text: 'thước phim mượt mà', start: 8.5, end: 11.0, class: 'active-slate' }
        ],
        slide_memo18_5: [
            { text: 'chóng mặt và buồn nôn', start: 1.8, end: 4.8, class: 'active-slate' },
            { text: 'hệ thống chống rung hoàn hảo', start: 5.2, end: 8.5, class: 'active-yellow' }
        ],
        slide_memo18_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 3.5, class: 'active-yellow' },
            { text: 'thấu hiểu bản thân', start: 3.8, end: 6.8, class: 'active-slate' }
        ]
    };

    const customSlideIds = [
        'slide_memo18_1', 'slide_memo18_2', 'slide_memo18_3', 'slide_memo18_4', 'slide_memo18_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo18_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo18-1-container">
                        <!-- Floating Eye Particles -->
                        <span class="ambient-eye-particle" style="top: 15%; left: 10%; animation-delay: -1s;">👁️</span>
                        <span class="ambient-eye-particle" style="top: 75%; left: 85%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-eye-particle" style="top: 25%; left: 80%; animation-delay: -5s;">📷</span>

                        <div class="eye-hook-box">
                            <div class="shaking-bg-v18"></div>
                            <span class="hook-giant-eye-v18">👁️</span>
                            <div class="gaze-target-hook gaze-left"></div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo18_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo18-2-container">
                        <span class="ambient-eye-particle" style="top: 8%; left: 80%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-eye-particle" style="top: 80%; left: 12%; animation-delay: -4s;">👁️</span>

                        <div class="eye-diagram-board-v18">
                            <div class="diagram-node-v18 node-eye">
                                <span class="diagram-node-icon">👁️</span>
                                <span>1. Lia Mắt Nhanh</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v18 node-brain">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Não Ức Chế</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v18 node-cortex">
                                <span class="diagram-node-icon">🖥️</span>
                                <span>3. Chặn Nhòe Ảnh</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Saccadic Suppression*: Trong thời gian lia mắt (khoảng 20-50 mili giây), não bộ tự động giảm độ nhạy của thị giác, chặn các chuyển động nhòe truyền lên trung khu thần kinh.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo18_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo18-3-container">
                        <span class="ambient-eye-particle" style="top: 10%; left: 15%; animation-delay: -1s;">👁️</span>
                        <span class="ambient-eye-particle" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <!-- Left Panel: Eye trajectory & blur window -->
                        <div class="eye-panel-v18">
                            <div class="visual-feed-window">
                                <div class="visual-feed-grid">
                                    <div class="target-dot-v18 dot-a active-target">A</div>
                                    <div style="flex-grow: 1;"></div>
                                    <div class="target-dot-v18 dot-b">B</div>
                                </div>
                            </div>
                            <!-- Eye element tracking position -->
                            <div class="eye-icon-v18" style="left: 80px;">👁️</div>
                        </div>

                        <!-- Right Panel: Dashboard -->
                        <div class="eye-dashboard-v18">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                THỊ GIÁC ĐƯỜNG TRUYỀN
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Bộ lọc nhòe ảnh</span>
                                <span class="eye-status-badge processing">Bình thường (Active)</span>
                            </div>

                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Cắt cảnh tự động*: Não tắt xử lý thô trong quá trình chuyển động và kích hoạt lại tức thì khi mắt đã khóa tiêu điểm tại điểm đích.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo18_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo18-4-container">
                        <span class="ambient-eye-particle" style="top: 12%; left: 85%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-eye-particle" style="top: 78%; left: 12%; animation-delay: -5s;">👁️</span>

                        <div class="comp-row-v18">
                            <!-- Left Card: Raw Physical Input (Jitter / Blur) -->
                            <div class="comp-card-v18 card-theme-camera-feed card-active">
                                <div class="comp-header-v18">
                                    <h3>CAMERA QUAY THÔ</h3>
                                    <div class="comp-icon-v18">📹</div>
                                </div>

                                <div class="comp-bullet-list-v18">
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">❌</span>
                                        <span>Khung cảnh bị nhòe vệt liên tục</span>
                                    </div>
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">❌</span>
                                        <span>Rung lắc khung hình dữ dội</span>
                                    </div>
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">❌</span>
                                        <span>Gây chóng mặt và rối loạn tiêu cự</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v18">TÍN HIỆU RUNG LẮC</div>
                            </div>

                            <!-- Right Card: Brain's Reconstructed Output (Stabilized) -->
                            <div class="comp-card-v18 card-theme-brain-output-v18 card-inactive">
                                <div class="comp-header-v18">
                                    <h3>THỊ GIÁC CỦA NÃO</h3>
                                    <div class="comp-icon-v18">🧠</div>
                                </div>

                                <div class="comp-bullet-list-v18">
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">✨</span>
                                        <span>Ức chế luồng ảnh nhòe khi di chuyển</span>
                                    </div>
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">✨</span>
                                        <span>Giữ cố định bối cảnh xung quanh</span>
                                    </div>
                                    <div class="comp-bullet-row-v18">
                                        <span class="comp-bullet-icon-v18">✨</span>
                                        <span>Ghép mượt các khung hình tĩnh</span>
                                    </div>
                                </div>

                                <div class="comp-footer-v18">CHỐNG RUNG HOÀN HẢO</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo18_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo18-5-container">
                        <div class="takeaway-radar-v18"></div>

                        <!-- Reassurance takeaway box -->
                        <div class="takeaway-box-v18" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v18">🤩</div>
                            <div class="takeaway-text-v18">
                                "Saccadic Suppression chính là bộ chống rung cơ học tối tân. Nếu không có nó, mỗi cái liếc mắt của bạn sẽ là một cơn say sóng điên cuồng!"
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
        if (slideId === 'slide_memo18_1') {
            const target = canvas.querySelector('.gaze-target-hook');
            const shakeBg = canvas.querySelector('.shaking-bg-v18');
            const giantEye = canvas.querySelector('.hook-giant-eye-v18');

            // Dot sweeps back & forth
            const period = progress * Math.PI * 2;
            const isMoving = Math.sin(period) > 0.3 || Math.sin(period) < -0.3;

            if (isMoving) {
                if (shakeBg) shakeBg.classList.add('active-shake');
            } else {
                if (shakeBg) shakeBg.classList.remove('active-shake');
            }

            if (target && shakeBg) {
                if (progress >= 0.3 && progress < 0.45) {
                    const ratio = (progress - 0.3) / 0.15;
                    const offset = -180 + 360 * ratio;
                    target.style.transform = `translateX(${offset}px)`;
                } else if (progress >= 0.45 && progress < 0.7) {
                    target.className = 'gaze-target-hook gaze-right';
                    target.style.transform = '';
                } else if (progress >= 0.7 && progress < 0.85) {
                    const ratio = (progress - 0.7) / 0.15;
                    const offset = 180 - 360 * ratio;
                    target.style.transform = `translateX(${offset}px)`;
                } else if (progress >= 0.85) {
                    target.className = 'gaze-target-hook gaze-left';
                    target.style.transform = '';
                } else {
                    target.className = 'gaze-target-hook gaze-left';
                    target.style.transform = '';
                }
            }

            const isLeft = progress < 0.35 || progress > 0.75;
            if (isLeft) {
                if (giantEye) {
                    giantEye.style.transform = 'translateX(-80px) scale(1.4) scaleX(1)';
                }
            } else {
                if (giantEye) {
                    giantEye.style.transform = 'translateX(80px) scale(1.4) scaleX(-1)';
                }
            }
        }
        else if (slideId === 'slide_memo18_2') {
            const eyeNode = canvas.querySelector('.node-eye');
            const brainNode = canvas.querySelector('.node-brain');
            const cortexNode = canvas.querySelector('.node-cortex');
            const arrow1 = canvas.querySelector('.arrow-1');
            const arrow2 = canvas.querySelector('.arrow-2');

            // Sequential diagram path highlights
            if (progress >= 0.7) {
                if (eyeNode) eyeNode.classList.add('active-node');
                if (brainNode) brainNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.add('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (eyeNode) eyeNode.classList.add('active-node');
                if (brainNode) brainNode.classList.add('active-node');
                if (cortexNode) cortexNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.add('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            } else {
                if (eyeNode) eyeNode.classList.add('active-node');
                if (brainNode) brainNode.classList.remove('active-node');
                if (cortexNode) cortexNode.classList.remove('active-node');
                if (arrow1) arrow1.classList.remove('highlight-link');
                if (arrow2) arrow2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo18_3') {
            const eye = canvas.querySelector('.eye-icon-v18');
            const feed = canvas.querySelector('.visual-feed-window');
            const dotA = canvas.querySelector('.dot-a');
            const dotB = canvas.querySelector('.dot-b');
            const statusTag = canvas.querySelector('.eye-status-badge');

            const targetXLeft = 80;
            const targetXRight = 320;

            if (progress < 0.3) {
                if (eye) {
                    eye.style.left = `${targetXLeft}px`;
                    eye.style.transform = 'scale(1)';
                }
                if (feed) {
                    feed.style.filter = 'none';
                    feed.style.opacity = '1';
                }
                if (dotA) dotA.className = 'target-dot-v18 dot-a active-target';
                if (dotB) dotB.className = 'target-dot-v18 dot-b';
                if (statusTag) {
                    statusTag.textContent = 'Bình thường (Active)';
                    statusTag.className = 'eye-status-badge processing';
                }
            } else if (progress >= 0.3 && progress < 0.7) {
                const ratio = (progress - 0.3) / 0.4;
                // Easing curve: easeInOutQuad for smooth acceleration/deceleration
                const easeRatio = ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
                const currentX = targetXLeft + (targetXRight - targetXLeft) * easeRatio;
                
                // Bell curve for velocity-based size and blur
                const bell = Math.sin(ratio * Math.PI);

                if (eye) {
                    eye.style.left = `${currentX}px`;
                    // Slight stretch effect in movement direction
                    eye.style.transform = `scaleX(${1 + bell * 0.15}) scaleY(${1 - bell * 0.08})`;
                }
                if (feed) {
                    feed.style.filter = `blur(${bell * 20}px)`;
                    feed.style.opacity = `${1 - bell * 0.85}`;
                }
                if (dotA) dotA.className = 'target-dot-v18 dot-a';
                if (dotB) dotB.className = 'target-dot-v18 dot-b';
                if (statusTag) {
                    statusTag.textContent = 'Ức chế thị giác (Blocked)';
                    statusTag.className = 'eye-status-badge blocked';
                }
            } else {
                if (eye) {
                    eye.style.left = `${targetXRight}px`;
                    eye.style.transform = 'scale(1)';
                }
                if (feed) {
                    feed.style.filter = 'none';
                    feed.style.opacity = '1';
                }
                if (dotA) dotA.className = 'target-dot-v18 dot-a';
                if (dotB) dotB.className = 'target-dot-v18 dot-b active-target';
                if (statusTag) {
                    statusTag.textContent = 'Bình thường (Active)';
                    statusTag.className = 'eye-status-badge processing';
                }
            }
        }
        else if (slideId === 'slide_memo18_4') {
            const rawCard = canvas.querySelector('.card-theme-camera-feed');
            const brainCard = canvas.querySelector('.card-theme-brain-output-v18');

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
            const rawBullets = rawCard ? rawCard.querySelectorAll('.comp-bullet-row-v18') : [];
            const brainBullets = brainCard ? brainCard.querySelectorAll('.comp-bullet-row-v18') : [];

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
        else if (slideId === 'slide_memo18_5') {
            const box = canvas.querySelector('.takeaway-box-v18');
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
        scriptName: 'video18',
        topic: 'Saccadic Suppression',
        episodeNum: 18,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 18 Plugin] Loaded: Saccadic Suppression ready.');
})();
