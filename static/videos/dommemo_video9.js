/**
 * DOM Memo Video 9: Silence Anxiety (Information Gap)
 * Custom script plugin driving chat indicators, reel updates, jigsaw slots, defense gauges, and card swaps.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo9_1: [
            { text: 'chưa trả lời tin nhắn', start: 1.2, end: 4.0, class: 'active-pink' },
            { text: 'dựng cả một kịch bản', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'giận mình sao', start: 8.0, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo9_2: [
            { text: 'ghét các khoảng trống', start: 1.5, end: 4.5, class: 'active-purple' },
            { text: 'im lặng mơ hồ', start: 5.0, end: 7.5, class: 'active-indigo' },
            { text: 'giả định tiêu cực', start: 8.0, end: 10.5, class: 'active-pink' }
        ],
        slide_memo9_3: [
            { text: 'cơ chế sinh tồn', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'tâm lý phòng thủ', start: 5.0, end: 7.8, class: 'active-purple' },
            { text: 'bị ruồng bỏ', start: 8.2, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo9_4: [
            { text: 'thực tế rất đơn giản', start: 1.2, end: 4.2, class: 'active-indigo' },
            { text: 'phim thảm kịch', start: 4.8, end: 7.5, class: 'active-pink' },
            { text: 'sự thật bình yên', start: 8.0, end: 11.0, class: 'active-purple' }
        ],
        slide_memo9_5: [
            { text: 'não đang vẽ chuyện', start: 1.0, end: 4.2, class: 'active-indigo' },
            { text: 'follow DOM Memo', start: 5.0, end: 9.0, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo9_1', 'slide_memo9_2', 'slide_memo9_3', 'slide_memo9_4', 'slide_memo9_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo9_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo9-1-container">
                        <!-- Ambient drifting thought bubbles -->
                        <span class="ambient-particle-v9" style="top: 8%; left: 8%; animation-delay: -2s;">💭</span>
                        <span class="ambient-particle-v9" style="top: 75%; left: 15%; animation-delay: -5s;">🎬</span>
                        <span class="ambient-particle-v9" style="top: 20%; left: 82%; animation-delay: -8s;">⏳</span>
                        
                        <!-- Left: Rotating movie reel and thought tags -->
                        <div class="film-reel-wrap">
                            <div class="film-reel-container">
                                <div class="film-reel-graphic reel-spinning">
                                    <div class="film-reel-inner">
                                        <div class="film-spoke"></div>
                                        <div class="film-spoke"></div>
                                        <div class="film-spoke"></div>
                                        <div class="film-spoke"></div>
                                    </div>
                                    <div class="film-reel-center">🎬</div>
                                </div>
                                
                                <!-- Staggered thought alerts representing the brain's cinema -->
                                <span class="thought-reel-badge t-tag1">Giận mình? 🥺</span>
                                <span class="thought-reel-badge t-tag2">Block rồi? 🚫</span>
                                <span class="thought-reel-badge t-tag3">Mình làm sai? 💔</span>
                            </div>
                        </div>

                        <!-- Right: Sleek chat thread mockup simulating unanswered text -->
                        <div class="phone-mockup-v9">
                            <div class="phone-screen-v9">
                                <div class="phone-header-v9">
                                    <div class="phone-header-user">
                                        <div class="user-avatar-v9">👤</div>
                                        <div>
                                            <div style="font-weight: 800; font-size: 16px; color: #fff;">Người Ấy</div>
                                            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.45);">Hoạt động 5 phút trước</div>
                                        </div>
                                    </div>
                                    <div class="user-status-dot"></div>
                                </div>
                                
                                <div class="chat-history-v9">
                                    <div class="chat-bubble-v9 sent">Cậu ơi... 🥺</div>
                                    <div class="chat-bubble-v9 sent">Tối nay đi cafe không?</div>
                                    <div class="message-status-txt">
                                        <span class="seen-check">✓✓</span> Đã xem
                                    </div>
                                    
                                    <!-- Typing dots that disappear -->
                                    <div class="typing-indicator-v9 visible">
                                        <div class="typing-dot"></div>
                                        <div class="typing-dot"></div>
                                        <div class="typing-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo9_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo9-2-container">
                        <span class="ambient-particle-v9" style="top: 12%; left: 85%; animation-delay: -1s;">🧩</span>
                        <span class="ambient-particle-v9" style="top: 82%; left: 8%; animation-delay: -3s;">❓</span>
                        
                        <!-- Jigsaw board simulating Information Gap -->
                        <div class="puzzle-board-v9">
                            <div class="puzzle-grid-v9">
                                <div class="puzzle-piece-static">
                                    <span class="piece-icon">💬</span>
                                    <span>Tin nhắn gửi đi</span>
                                </div>
                                
                                <!-- Empty slot -->
                                <div class="puzzle-slot-empty">
                                    <span class="slot-placeholder-icon">🕳️</span>
                                    <span>KHOẢNG TRỐNG</span>
                                    <span style="font-size: 11px; opacity: 0.5; margin-top: 5px; font-weight: normal;">(Não ghét sự mơ hồ)</span>
                                </div>
                                
                                <div class="puzzle-piece-static">
                                    <span class="piece-icon">⏳</span>
                                    <span>Sự Im Lặng</span>
                                </div>
                            </div>
                            
                            <!-- Jagged red assumption piece sliding in -->
                            <div class="puzzle-piece-moving">
                                <span class="moving-piece-icon">🚨</span>
                                <span>"HỌ GHÉT MÌNH!"</span>
                                <span style="font-size: 11px; opacity: 0.8; font-weight: normal;">Giả định tiêu cực</span>
                            </div>
                        </div>
                        
                        <!-- Psychological explanation banner -->
                        <div class="gap-anxiety-badge">
                            ⚠️ Não bộ cực ghét khoảng trống thông tin và sẽ tự điền vào bằng nỗi sợ tệ nhất!
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo9_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo9-3-container">
                        <span class="ambient-particle-v9" style="top: 10%; left: 10%; animation-delay: -4s;">🛡️</span>
                        <span class="ambient-particle-v9" style="top: 80%; left: 80%; animation-delay: -7s;">⚠️</span>
                        
                        <!-- Left: Radar protective barrier -->
                        <div class="radar-panel-v9">
                            <div class="radar-screen-v9">
                                <div class="radar-circle-line c1"></div>
                                <div class="radar-circle-line c2"></div>
                                <div class="radar-circle-line c3"></div>
                                
                                <div class="shield-barrier-glow"></div>
                                <div class="survival-shield-v9">🛡️</div>
                            </div>
                        </div>
                        
                        <!-- Right: Survival stats dashboard -->
                        <div class="telemetry-dashboard-v9">
                            <div class="dashboard-title-v9">Hệ Thống Phòng Thủ Sinh Tồn</div>
                            
                            <div class="metric-row-v9">
                                <div class="metric-label-v9">
                                    <span>Trạng thái não bộ</span>
                                    <span class="defense-status-tag">THEO DÕI</span>
                                </div>
                            </div>
                            
                            <div class="metric-row-v9">
                                <div class="metric-label-v9">
                                    <span>Chỉ số cảnh giác</span>
                                    <span class="metric-value-highlight vigilance-value">10%</span>
                                </div>
                                <div class="telemetry-progress-bg">
                                    <div class="telemetry-progress-fill vigilance-fill" style="width: 10%;"></div>
                                </div>
                            </div>
                            
                            <div class="metric-row-v9">
                                <div class="metric-label-v9">
                                    <span>Chỉ số phòng vệ</span>
                                    <span class="metric-value-highlight defense-value">10%</span>
                                </div>
                                <div class="telemetry-progress-bg">
                                    <div class="telemetry-progress-fill defense-fill" style="width: 10%;"></div>
                                </div>
                            </div>
                            
                            <div style="font-size: 13.5px; color: rgba(255, 255, 255, 0.4); line-height: 1.5; text-align: left; margin-top: 10px;">
                                💡 *Cơ chế tiền sử*: Não bộ giả định kịch bản tồi tệ nhất để bảo vệ bạn khỏi nguy cơ bị loại trừ hoặc ruồng bỏ.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo9_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo9-4-container">
                        <span class="ambient-particle-v9" style="top: 8%; left: 82%; animation-delay: -2s;">🎬</span>
                        <span class="ambient-particle-v9" style="top: 78%; left: 12%; animation-delay: -5s;">🔋</span>
                        
                        <!-- Dual spring panels: movie scenario vs reality -->
                        <div class="comparison-row-v9">
                            <!-- Card 1: Distortion movie -->
                            <div class="comparison-card-v9 card-brain-movie card-active">
                                <div class="comp-card-header">
                                    <h3>KỊCH BẢN CỦA NÃO</h3>
                                    <div class="comp-icon-badge">🎬</div>
                                </div>
                                
                                <div class="comp-items-list">
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">❌</span>
                                        <span>"Họ ghét mình rồi"</span>
                                    </div>
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">❌</span>
                                        <span>"Mình nói câu gì sai"</span>
                                    </div>
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">❌</span>
                                        <span>"Mối quan hệ sắp toang"</span>
                                    </div>
                                </div>
                                
                                <div class="comp-card-footer-lbl">BI KỊCH & ĐỀ PHÒNG</div>
                            </div>
                            
                            <!-- Card 2: Simple reality -->
                            <div class="comparison-card-v9 card-real-world card-inactive">
                                <div class="comp-card-header">
                                    <h3>THỰC TẾ KHÁCH QUAN</h3>
                                    <div class="comp-icon-badge">🔋</div>
                                </div>
                                
                                <div class="comp-items-list">
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">✅</span>
                                        <span>Điện thoại hết pin sập nguồn</span>
                                    </div>
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">✅</span>
                                        <span>Đang bận học, tắm, rửa bát</span>
                                    </div>
                                    <div class="comp-item-row">
                                        <span class="comp-bullet-icon">✅</span>
                                        <span>Đơn giản là ngủ quên mất</span>
                                    </div>
                                </div>
                                
                                <div class="comp-card-footer-lbl">ĐƠN GIẢN & THƯỜNG NHẬT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo9_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo9-5-container">
                        <div class="calming-ambient-wave"></div>
                        
                        <!-- A reassuring reply shows up -->
                        <div class="outro-phone-reply" style="transform: scale(0.9); opacity: 0;">
                            <div class="outro-phone-header">
                                <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></span>
                                Người Ấy • Vừa xong
                            </div>
                            <div class="outro-phone-bubble">
                                "Đi chứ! Để tớ chuẩn bị đồ nhé! 😄"
                            </div>
                        </div>
                        
                        <div class="outro-cta-banner-v9">
                            <div class="outro-cta-logo-text">DOM MEMO</div>
                            <p style="font-size: 19px; color: rgba(255,255,255,0.75); font-weight: 600; margin-bottom: 25px;">
                                Thả lỏng tâm trí • Ngưng tự diễn phim
                            </p>
                            <span style="font-size: 15px; color: rgba(255,255,255,0.4); border: 1.5px solid rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 24px; font-weight: 600; display: inline-block;">
                                Nhấn follow để làm chủ cảm xúc mỗi ngày
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
        if (slideId === 'slide_memo9_1') {
            const typingInd = canvas.querySelector('.typing-indicator-v9');
            const statusTxt = canvas.querySelector('.message-status-txt');
            const thoughts = [
                canvas.querySelector('.t-tag1'),
                canvas.querySelector('.t-tag2'),
                canvas.querySelector('.t-tag3')
            ];

            // Typing indicator disappears around progress 0.35
            if (typingInd) {
                if (progress < 0.35) {
                    typingInd.classList.add('visible');
                } else {
                    typingInd.classList.remove('visible');
                }
            }

            // Message status changes
            if (statusTxt) {
                if (progress < 0.35) {
                    statusTxt.innerHTML = '✓ Đã gửi';
                    statusTxt.style.color = 'rgba(255, 255, 255, 0.3)';
                } else {
                    statusTxt.innerHTML = '<span class="seen-check" style="color: #06b6d4;">✓✓</span> Đã xem';
                    statusTxt.style.color = 'rgba(255, 255, 255, 0.55)';
                }
            }

            // Staggered floating thoughts fade in
            const thresholds = [0.4, 0.6, 0.8];
            thoughts.forEach((el, index) => {
                if (el) {
                    if (progress > thresholds[index]) {
                        el.classList.add('visible');
                    } else {
                        el.classList.remove('visible');
                    }
                }
            });
        }
        else if (slideId === 'slide_memo9_2') {
            const movingPiece = canvas.querySelector('.puzzle-piece-moving');
            const slot = canvas.querySelector('.puzzle-slot-empty');
            const badge = canvas.querySelector('.gap-anxiety-badge');

            // Set coordinates dynamically based on timeline progress
            // Start pos: bottom left corner (left: 30px, top: 250px)
            // Target pos: slot coordinate center (left: 243px, top: 100px)
            const startX = 30;
            const startY = 250;
            const startRot = -15;
            const startScale = 0.85;

            const endX = 243;
            const endY = 100;
            const endRot = 0;
            const endScale = 1.0;

            if (movingPiece) {
                if (progress < 0.1) {
                    // Start position
                    movingPiece.style.left = `${startX}px`;
                    movingPiece.style.top = `${startY}px`;
                    movingPiece.style.transform = `rotate(${startRot}deg) scale(${startScale})`;
                    movingPiece.style.borderColor = '#ef4444';
                    movingPiece.style.boxShadow = '0 15px 35px rgba(239, 68, 68, 0.4)';
                    if (slot) slot.classList.remove('highlight-active');
                }
                else if (progress <= 0.65) {
                    // Linear interpolation from 0.1 to 0.65 progress
                    const ratio = (progress - 0.1) / 0.55;
                    const curX = startX + (endX - startX) * ratio;
                    const curY = startY + (endY - startY) * ratio;
                    const curRot = startRot + (endRot - startRot) * ratio;
                    const curScale = startScale + (endScale - startScale) * ratio;

                    movingPiece.style.left = `${curX}px`;
                    movingPiece.style.top = `${curY}px`;
                    movingPiece.style.transform = `rotate(${curRot}deg) scale(${curScale})`;
                    movingPiece.style.borderColor = '#ef4444';
                    movingPiece.style.boxShadow = '0 15px 35px rgba(239, 68, 68, 0.4)';
                    if (slot) slot.classList.add('highlight-active');
                }
                else {
                    // Snapped state
                    movingPiece.style.left = `${endX}px`;
                    movingPiece.style.top = `${endY}px`;
                    movingPiece.style.transform = `rotate(${endRot}deg) scale(${endScale})`;
                    // Visual pop to show success slotting
                    movingPiece.style.borderColor = '#ff2b2b';
                    movingPiece.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.8)';
                    if (slot) slot.classList.remove('highlight-active');
                }
            }

            // Staggered explanation badge fade in
            if (badge) {
                if (progress > 0.7) {
                    badge.classList.add('visible');
                } else {
                    badge.classList.remove('visible');
                }
            }
        }
        else if (slideId === 'slide_memo9_3') {
            const barrier = canvas.querySelector('.shield-barrier-glow');
            const statusTag = canvas.querySelector('.defense-status-tag');
            const vigilanceVal = canvas.querySelector('.vigilance-value');
            const vigilanceFill = canvas.querySelector('.vigilance-fill');
            const defenseVal = canvas.querySelector('.defense-value');
            const defenseFill = canvas.querySelector('.defense-fill');

            // Barrier activations
            if (barrier) {
                if (progress > 0.45) {
                    barrier.classList.add('active');
                } else {
                    barrier.classList.remove('active');
                }
            }

            if (statusTag) {
                if (progress > 0.45) {
                    statusTag.textContent = 'KÍCH HOẠT ĐỀ PHÒNG 🚨';
                    statusTag.classList.add('active');
                } else {
                    statusTag.textContent = 'THEO DÕI...';
                    statusTag.classList.remove('active');
                }
            }

            // Vigilance metrics: 10% to 100% between 0.1 and 0.8 progress
            if (vigilanceVal && vigilanceFill) {
                let vPct = 10;
                if (progress > 0.1) {
                    const ratio = Math.min(1.0, (progress - 0.1) / 0.7);
                    vPct = Math.round(10 + (100 - 10) * ratio);
                }
                vigilanceVal.textContent = `${vPct}%`;
                vigilanceFill.style.width = `${vPct}%`;
            }

            // Defense power metrics: 10% to 100% between 0.25 and 0.85 progress
            if (defenseVal && defenseFill) {
                let dPct = 10;
                if (progress > 0.25) {
                    const ratio = Math.min(1.0, (progress - 0.25) / 0.6);
                    dPct = Math.round(10 + (100 - 10) * ratio);
                }
                defenseVal.textContent = `${dPct}%`;
                defenseFill.style.width = `${dPct}%`;
            }
        }
        else if (slideId === 'slide_memo9_4') {
            const movieCard = canvas.querySelector('.card-brain-movie');
            const realCard = canvas.querySelector('.card-real-world');

            // Swap card focus based on halfway progress split
            if (progress < 0.5) {
                if (movieCard) {
                    movieCard.classList.remove('card-inactive');
                    movieCard.classList.add('card-active');
                }
                if (realCard) {
                    realCard.classList.remove('card-active');
                    realCard.classList.add('card-inactive');
                }
            } else {
                if (movieCard) {
                    movieCard.classList.remove('card-active');
                    movieCard.classList.add('card-inactive');
                }
                if (realCard) {
                    realCard.classList.remove('card-inactive');
                    realCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo9_5') {
            const replyWrap = canvas.querySelector('.outro-phone-reply');

            // Outro phone reply transitions in nicely after progress 0.3
            if (replyWrap) {
                if (progress > 0.3) {
                    replyWrap.style.transform = 'scale(1) translateY(0)';
                    replyWrap.style.opacity = '1';
                    replyWrap.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    replyWrap.style.transform = 'scale(0.9) translateY(15px)';
                    replyWrap.style.opacity = '0';
                    replyWrap.style.transition = 'all 0.3s ease';
                }
            }
        }
    }

    // ── PUBLIC API REGISTRATION ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video9',
        topic: 'Silence Anxiety',
        episodeNum: 9,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 9 Plugin] Loaded: Silence Anxiety ready.');
})();
