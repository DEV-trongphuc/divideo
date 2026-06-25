/**
 * DOM Memo Video 13: Time Perception Illusion (Subjective Time)
 * Custom script plugin driving slow/fast hourglasses, pacemaker gate switches, subjective counters, and card highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo13_1: [
            { text: 'chờ thang máy', start: 1.2, end: 4.2, class: 'active-pink' },
            { text: 'lướt điện thoại', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'thời gian lại méo mó', start: 8.0, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo13_2: [
            { text: 'stopwatch sinh học', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'ước lượng thời gian', start: 5.2, end: 8.2, class: 'active-indigo' },
            { text: 'mức độ chú ý', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo13_3: [
            { text: 'chán nản', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'cổng chú ý mở rộng', start: 5.0, end: 8.0, class: 'active-purple' },
            { text: 'cổng đóng lại', start: 8.3, end: 11.5, class: 'active-indigo' }
        ],
        slide_memo13_4: [
            { text: 'nghèo thông tin', start: 1.8, end: 5.0, class: 'active-indigo' },
            { text: 'dopamine ngập tràn', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'chiếm trọn ý thức', start: 8.8, end: 11.5, class: 'active-purple' }
        ],
        slide_memo13_5: [
            { text: 'làm chủ được cảm nhận', start: 1.2, end: 4.2, class: 'active-indigo' },
            { text: 'sống trọn vẹn', start: 4.8, end: 7.8, class: 'active-pink' },
            { text: 'follow DOM Memo', start: 8.2, end: 11.0, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo13_1', 'slide_memo13_2', 'slide_memo13_3', 'slide_memo13_4', 'slide_memo13_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo13_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo13-1-container">
                        <!-- Ambient drifting clocks -->
                        <span class="ambient-time-particle" style="top: 10%; left: 8%; animation-delay: -2s;">⏳</span>
                        <span class="ambient-time-particle" style="top: 75%; left: 15%; animation-delay: -5s;">🕒</span>
                        <span class="ambient-time-particle" style="top: 20%; left: 82%; animation-delay: -7s;">⏰</span>

                        <!-- Left Box: Slow Elevator Wait -->
                        <div class="time-box-v13 box-wait active-focus">
                            <span class="box-title-v13">5 PHÚT CHỜ THANG MÁY</span>
                            <div class="hourglass-wrapper">⏳</div>
                            <div class="lane-progress-bg">
                                <div class="lane-progress-fill wait-fill" style="width: 10%;"></div>
                            </div>
                            <span class="box-footer-txt wait-duration-lbl">Thời gian giãn nở</span>
                        </div>

                        <!-- Right Box: Fast Social Scroll -->
                        <div class="time-box-v13 box-scroll">
                            <span class="box-title-v13">30 PHÚT LƯỚT ĐIỆN THOẠI</span>
                            <div class="hourglass-wrapper hourglass-spinning">⏳</div>
                            <div class="lane-progress-bg">
                                <div class="lane-progress-fill scroll-fill" style="width: 10%;"></div>
                            </div>
                            <span class="box-footer-txt scroll-duration-lbl">Thời gian trôi vèo</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo13_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo13-2-container">
                        <span class="ambient-time-particle" style="top: 15%; left: 80%; animation-delay: -1s;">🕒</span>
                        <span class="ambient-time-particle" style="top: 80%; left: 10%; animation-delay: -4s;">⏳</span>

                        <!-- Time distortion dashboard -->
                        <div class="distortion-metrics-v13">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0 0 10px 0; text-transform: uppercase; text-align: left;">
                                CHỈ SỐ BIẾN DẠNG THỜI GIAN
                            </h3>
                            
                            <div class="dist-metric-row">
                                <div class="dist-metric-lbl">
                                    <span>Mức độ chú ý thời gian (Attention Gate)</span>
                                    <span class="dist-metric-val attention-val">10%</span>
                                </div>
                                <div class="dist-progress-bg">
                                    <div class="dist-progress-fill attention-fill" style="width: 10%;"></div>
                                </div>
                            </div>

                            <div class="dist-metric-row">
                                <div class="dist-metric-lbl">
                                    <span>Mật độ kích thích & Dopamine</span>
                                    <span class="dist-metric-val dopamine-val">10%</span>
                                </div>
                                <div class="dist-progress-bg">
                                    <div class="dist-progress-fill dopamine-fill" style="width: 10%;"></div>
                                </div>
                            </div>

                            <div class="dist-metric-row">
                                <div class="dist-metric-lbl">
                                    <span>Độ giãn nở cảm nhận (Subjective stretch)</span>
                                    <span class="dist-metric-val stretch-val">1.0X</span>
                                </div>
                                <div class="dist-progress-bg">
                                    <div class="dist-progress-fill stretch-fill" style="width: 10%;"></div>
                                </div>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01);">
                            💡 *Tại sao đổi bối cảnh*: Khi ít kích thích, não rảnh rỗi nên dồn chú ý vào chính thời gian. Từng nhịp đếm nhận thức được ghi nhận đầy đủ, làm thời gian giãn dài ra 2X.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo13_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo13-3-container">
                        <span class="ambient-time-particle" style="top: 10%; left: 80%; animation-delay: -2s;">🚪</span>
                        <span class="ambient-time-particle" style="top: 80%; left: 10%; animation-delay: -5s;">•</span>

                        <!-- Attention Gate simulator -->
                        <div class="gate-simulation-board">
                            <!-- Left: Pacemaker -->
                            <div class="gate-pacemaker-node">
                                <span class="pacemaker-icon">⏱️</span>
                                <span style="font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.4);">BỘ PHÁT NHỊP</span>
                            </div>

                            <!-- Traveling pulse tick -->
                            <span class="pacemaker-pulse-tick" style="left: 40px;">•</span>

                            <!-- Center: Gate Door -->
                            <div class="gate-door-wrap">
                                <div class="gate-door-graphic"></div>
                                <span class="gate-lbl-overlay">CỔNG MỞ (CHÁN)</span>
                            </div>

                            <!-- Right: Accumulator -->
                            <div class="gate-accumulator-node">
                                <span class="accumulator-score">0</span>
                                <span style="font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.45); text-align: center;">NHỊP Ý THỨC ĐÃ ĐẾM</span>
                            </div>
                        </div>
                        
                        <div style="font-size: 14.5px; color: rgba(255, 255, 255, 0.45); max-width: 650px; text-align: center; line-height: 1.4;">
                            ⚠️ *Mô hình Attention Gate*: Càng chú tâm (Cổng Mở), nhịp đếm lọt vào bộ đếm càng nhiều ➔ Thời gian dài ra. Càng bị thu hút (Cổng Đóng), nhịp đếm bị chặn đứng ➔ Thời gian trôi vèo!
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo13_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo13-4-container">
                        <span class="ambient-time-particle" style="top: 8%; left: 85%; animation-delay: -3s;">⏳</span>
                        <span class="ambient-time-particle" style="top: 80%; left: 15%; animation-delay: -6s;">📱</span>

                        <!-- Split comparison cards -->
                        <div class="comparison-row-v13">
                            <!-- Left Card: Waiting for elevator -->
                            <div class="comparison-card-v13 card-wait-elevator card-active">
                                <div class="comp-header-v13">
                                    <h3>CHỜ THANG MÁY</h3>
                                    <div class="comp-icon-badge-v13">⏳</div>
                                </div>
                                
                                <div class="comp-list-v13">
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">❌</span>
                                        <span>Không có thông tin mới</span>
                                    </div>
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">❌</span>
                                        <span>Chú ý tập trung cao độ vào thời gian</span>
                                    </div>
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">❌</span>
                                        <span>Thời gian cảm nhận dài hơn thực tế</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v13">THỜI GIAN GIÃN NỞ</div>
                            </div>

                            <!-- Right Card: Scrolling phone -->
                            <div class="comparison-card-v13 card-scroll-phone card-inactive">
                                <div class="comp-header-v13">
                                    <h3>LƯỚT MẠNG XÃ HỘI</h3>
                                    <div class="comp-icon-badge-v13">📱</div>
                                </div>
                                
                                <div class="comp-list-v13">
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">✅</span>
                                        <span>Dopamine kích thích liên tục</span>
                                    </div>
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">✅</span>
                                        <span>Quên hoàn toàn việc đếm nhịp giây</span>
                                    </div>
                                    <div class="comp-row-v13">
                                        <span class="comp-bullet-v13">✅</span>
                                        <span>Cảm giác thời gian trôi đi cực nhanh</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v13">THỜI GIAN CO RÚT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo13_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo13-5-container">
                        <div class="calming-ring-v13"></div>
                        
                        <!-- Reassurance box -->
                        <div class="outro-reassurance-box-v13" style="transform: scale(0.9); opacity: 0;">
                            <div class="reassurance-face-v13">⏳</div>
                            <div class="reassurance-text-v13">
                                "Thời gian chỉ là cảm nhận chủ quan của não bộ. Hãy làm chủ sự chú ý để làm chủ cuộc sống!"
                            </div>
                        </div>
                        
                        <!-- CTA follow banner -->
                        <div class="outro-cta-banner-v13">
                            <div class="outro-cta-logo-v13">DOM MEMO</div>
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
        if (slideId === 'slide_memo13_1') {
            const waitBox = canvas.querySelector('.time-box-v13.box-wait');
            const scrollBox = canvas.querySelector('.time-box-v13.box-scroll');

            const waitFill = canvas.querySelector('.wait-fill');
            const scrollFill = canvas.querySelector('.scroll-fill');

            const waitDuration = canvas.querySelector('.wait-duration-lbl');
            const scrollDuration = canvas.querySelector('.scroll-duration-lbl');

            // Wait fill ratio goes up very slowly (reaches 35% at end)
            const wRatio = progress * 0.35;
            if (waitFill) waitFill.style.width = `${wRatio * 100}%`;
            if (waitDuration) {
                const elapsedMin = Math.floor(progress * 5);
                waitDuration.textContent = `Mới trôi qua: ${elapsedMin} phút (Rất lâu!)`;
            }

            // Scroll fill ratio goes up super fast (reaches 100% at progress 0.45)
            const sRatio = Math.min(1.0, progress * 2.2);
            if (scrollFill) scrollFill.style.width = `${sRatio * 100}%`;
            if (scrollDuration) {
                const elapsedMin = Math.floor(sRatio * 30);
                scrollDuration.textContent = `Đã trôi qua: ${elapsedMin} phút (Nhanh!)`;
            }

            // Highlight boxes based on progress split
            if (progress < 0.5) {
                if (waitBox) waitBox.classList.add('active-focus');
                if (scrollBox) scrollBox.classList.remove('active-focus');
            } else {
                if (waitBox) waitBox.classList.remove('active-focus');
                if (scrollBox) scrollBox.classList.add('active-focus');
            }
        }
        else if (slideId === 'slide_memo13_2') {
            const attVal = canvas.querySelector('.attention-val');
            const attFill = canvas.querySelector('.attention-fill');
            const dopVal = canvas.querySelector('.dopamine-val');
            const dopFill = canvas.querySelector('.dopamine-fill');
            const strVal = canvas.querySelector('.stretch-val');
            const strFill = canvas.querySelector('.stretch-fill');

            // Animate progress stats based on timeline
            // Slide progresses: Wait stats first, then flips to Scroll stats
            if (progress < 0.5) {
                const ratio = progress / 0.5;
                // Wait mode: Attention rises to 90%, Dopamine stays around 10%, Subjective stretch rises to 2.0X
                const curAtt = Math.round(10 + (90 - 10) * ratio);
                const curDop = Math.round(10 + (15 - 10) * ratio);
                const curStr = (1.0 + 1.0 * ratio).toFixed(1);

                if (attVal) attVal.textContent = `${curAtt}%`;
                if (attFill) attFill.style.width = `${curAtt}%`;
                if (dopVal) dopVal.textContent = `${curDop}%`;
                if (dopFill) dopFill.style.width = `${curDop}%`;
                if (strVal) strVal.textContent = `${curStr}X (Giãn nở)`;
                if (strFill) {
                    strFill.style.width = `${(parseFloat(curStr) / 2.0) * 100}%`;
                    strFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
                }
            } else {
                const ratio = (progress - 0.5) / 0.5;
                // Scroll mode: Attention drops to 15%, Dopamine spikes to 95%, Subjective stretch drops to 0.3X
                const curAtt = Math.round(90 - (90 - 15) * ratio);
                const curDop = Math.round(15 + (95 - 15) * ratio);
                const curStr = (2.0 - (2.0 - 0.3) * ratio).toFixed(1);

                if (attVal) attVal.textContent = `${curAtt}%`;
                if (attFill) attFill.style.width = `${curAtt}%`;
                if (dopVal) dopVal.textContent = `${curDop}%`;
                if (dopFill) dopFill.style.width = `${curDop}%`;
                if (strVal) strVal.textContent = `${curStr}X (Co rút)`;
                if (strFill) {
                    strFill.style.width = `${(parseFloat(curStr) / 2.0) * 100}%`;
                    strFill.style.background = 'linear-gradient(90deg, #06b6d4, #ec4899)';
                }
            }
        }
        else if (slideId === 'slide_memo13_3') {
            const door = canvas.querySelector('.gate-door-graphic');
            const lbl = canvas.querySelector('.gate-lbl-overlay');
            const pulse = canvas.querySelector('.pacemaker-pulse-tick');
            const score = canvas.querySelector('.accumulator-score');

            // Pulse travels continuously (12 cycles)
            const numCycles = 12;
            const cycleRatio = (progress * numCycles) % 1.0;
            const tickX = 70 + (500 - 70) * cycleRatio;
            if (pulse) pulse.style.left = `${tickX}px`;

            // State toggle at progress 0.5
            if (progress < 0.5) {
                // Gate is open
                if (door) door.classList.remove('gate-closed');
                if (lbl) {
                    lbl.textContent = 'CỔNG MỞ (NHÀM CHÁN)';
                    lbl.style.color = 'var(--memo13-primary)';
                }
                if (pulse) {
                    pulse.style.opacity = '1';
                    pulse.textContent = '•';
                    pulse.style.color = 'var(--memo13-primary)';
                }

                // Ticks increment accumulator score sequentially
                const curScore = Math.floor(progress * 2 * 12);
                if (score) score.textContent = curScore;
            } else {
                // Gate is closed
                if (door) door.classList.add('gate-closed');
                if (lbl) {
                    lbl.textContent = 'CỔNG ĐÓNG (LƯỚT MẠNG)';
                    lbl.style.color = 'var(--memo13-secondary)';
                }

                // Pulse bounces off or stops at gate coordinate (left: ~270px)
                if (pulse) {
                    if (tickX > 270) {
                        pulse.style.opacity = '0'; // blocked by closed gate
                    } else {
                        pulse.style.opacity = '1';
                        pulse.textContent = 'x';
                        pulse.style.color = 'var(--memo13-secondary)';
                    }
                }

                // Accumulator score freezes
                const finalWaitScore = Math.floor(0.5 * 2 * 12);
                if (score) score.textContent = finalWaitScore;
            }
        }
        else if (slideId === 'slide_memo13_4') {
            const waitCard = canvas.querySelector('.card-wait-elevator');
            const scrollCard = canvas.querySelector('.card-scroll-phone');

            // Swap active highlights
            if (progress < 0.5) {
                if (waitCard) {
                    waitCard.classList.remove('card-inactive');
                    waitCard.classList.add('card-active');
                }
                if (scrollCard) {
                    scrollCard.classList.remove('card-active');
                    scrollCard.classList.add('card-inactive');
                }
            } else {
                if (waitCard) {
                    waitCard.classList.remove('card-active');
                    waitCard.classList.add('card-inactive');
                }
                if (scrollCard) {
                    scrollCard.classList.remove('card-inactive');
                    scrollCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo13_5') {
            const box = canvas.querySelector('.outro-reassurance-box-v13');

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
        scriptName: 'video13',
        topic: 'Subjective Time Perception',
        episodeNum: 13,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 13 Plugin] Loaded: Subjective Time ready.');
})();
