/**
 * DOM Memo Video 1: Phantom Vibration Syndrome
 * Custom script plugin containing rendering logic and frame updates for each slide.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo_1: [
            { text: 'cảm thấy điện thoại rung', start: 1.2, end: 3.5, class: 'active-purple' },
            { text: 'mở ra', start: 3.8, end: 4.8, class: 'active-indigo' },
            { text: 'chẳng có gì', start: 5.0, end: 6.2, class: 'active-pink' }
        ],
        slide_memo_2: [
            { text: 'Hội chứng rung ảo giác', start: 2.0, end: 5.0, class: 'active-purple' },
            { text: 'tâm lý phổ biến', start: 5.5, end: 8.0, class: 'active-indigo' },
            { text: 'smartphone', start: 8.5, end: 11.2, class: 'active-pink' }
        ],
        slide_memo_3: [
            { text: 'lo lắng', start: 1.5, end: 3.2, class: 'active-pink' },
            { text: 'chờ đợi', start: 3.5, end: 5.0, class: 'active-indigo' },
            { text: 'cảnh giác cao độ', start: 5.5, end: 8.0, class: 'active-purple' },
            { text: 'hạ thấp ngưỡng nhận diện', start: 8.2, end: 10.8, class: 'active-purple' }
        ],
        slide_memo_4: [
            { text: 'cọ xát nhẹ của quần áo', start: 1.5, end: 4.0, class: 'active-indigo' },
            { text: 'co cơ đùi', start: 4.2, end: 6.2, class: 'active-pink' },
            { text: 'diễn giải nhầm', start: 6.5, end: 8.8, class: 'active-purple' },
            { text: 'thà báo động nhầm', start: 9.0, end: 11.8, class: 'active-purple' }
        ]
    };

    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_memo_1', 'slide_memo_2', 'slide_memo_3', 'slide_memo_4'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo-1-container">
                        <div class="vibe-ripple-waves">
                            <div class="vibe-ring vr-1"></div>
                            <div class="vibe-ring vr-2"></div>
                            <div class="vibe-ring vr-3"></div>
                        </div>
                        <div class="phone-mockup-wrap">
                            <div class="phone-case-memo vibe-shake">
                                <div class="phone-screen-memo">
                                    <div class="phone-status-bar">
                                        <span>12:00</span>
                                        <div style="display:flex; gap:6px; align-items:center;">
                                            <i data-lucide="wifi" style="width:16px; height:16px;"></i>
                                            <i data-lucide="battery" style="width:18px; height:18px;"></i>
                                        </div>
                                    </div>
                                    <div class="phone-lockscreen-content">
                                        <div class="phone-time-date">
                                            <div class="time-large">10:42</div>
                                            <div class="date-small">Thứ Năm, 25 Tháng 6</div>
                                        </div>
                                        <div class="no-notif-card glass-card">
                                            <div class="bell-silent-icon">
                                                <i data-lucide="bell-off"></i>
                                            </div>
                                            <div class="notif-text">
                                                <h4>Không có thông báo mới</h4>
                                                <p>Mở khoá để xem chi tiết</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="phantom-title-badge">HỘI CHỨNG RUNG ẢO GIÁC</div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo-2-container">
                        <div class="memo-left-layout">
                            <div class="phone-mockup-pocket vibe-shake-light">
                                <div class="pocket-overlay">
                                    <div class="pocket-seam"></div>
                                    <span class="pocket-label">TÚI QUẦN</span>
                                </div>
                                <div class="vibe-indicator-pocket">
                                    <i data-lucide="activity" class="neon-pulse-icon"></i>
                                </div>
                            </div>
                        </div>
                        <div class="memo-right-layout">
                            <div class="memo-card-item mc-1 glass-card">
                                <div class="mc-icon"><i data-lucide="bell-off"></i></div>
                                <div class="mc-content">
                                    <h3>Không thông báo</h3>
                                    <p>Điện thoại im lặng hoàn toàn, không có tin nhắn hay cuộc gọi nhỡ.</p>
                                </div>
                            </div>
                            <div class="memo-card-item mc-2 glass-card">
                                <div class="mc-icon"><i data-lucide="activity"></i></div>
                                <div class="mc-content">
                                    <h3>Cảm giác thật</h3>
                                    <p>Cơ đùi hoặc túi quần thực sự cảm nhận được nhịp rung cơ học rõ rệt.</p>
                                </div>
                            </div>
                            <div class="memo-card-item mc-3 glass-card">
                                <div class="mc-icon"><i data-lucide="smartphone"></i></div>
                                <div class="mc-content">
                                    <h3>Thói quen kiểm tra</h3>
                                    <p>Xảy ra nhiều nhất ở người có thói quen rút máy kiểm tra liên tục.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo-3-container">
                        <div class="brain-svg-wrap">
                            <svg class="brain-outline" viewBox="0 0 200 200" width="160" height="160">
                                <path d="M100,30 C130,30 160,40 170,70 C180,100 170,130 150,150 C130,165 110,165 100,175 C90,165 70,165 50,150 C30,130 20,100 30,70 C40,40 70,30 100,30 Z" fill="none" stroke="rgba(139, 92, 246, 0.4)" stroke-width="3" />
                                <circle cx="100" cy="90" r="10" class="brain-core-glow" fill="#a78bfa" />
                                <circle cx="60" cy="80" r="6" class="brain-node" fill="#818cf8" />
                                <circle cx="140" cy="80" r="6" class="brain-node" fill="#818cf8" />
                                <circle cx="100" cy="140" r="6" class="brain-node" fill="#f472b6" />
                                <line x1="60" y1="80" x2="100" y2="90" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                                <line x1="140" y1="80" x2="100" y2="90" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                                <line x1="100" y1="140" x2="100" y2="90" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                            </svg>
                            <div class="brain-pulse-ring"></div>
                            <div class="sensory-threshold-gauge">
                                <div class="gauge-label">NGƯỠNG CẢM NHẬN</div>
                                <div class="gauge-bar-bg">
                                    <div class="gauge-bar-fill"></div>
                                    <div class="gauge-threshold-line"></div>
                                </div>
                                <div class="gauge-status-text">Ngưỡng bình thường (Cao)</div>
                            </div>
                        </div>
                        <div class="memo-diagram-flow">
                            <div class="flow-step fs-1 glass-card">
                                <div class="fs-num">1</div>
                                <div class="fs-text">Chờ đợi / Lo lắng</div>
                            </div>
                            <div class="flow-arrow fa-1"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step fs-2 glass-card">
                                <div class="fs-num">2</div>
                                <div class="fs-text">Hạ thấp ngưỡng cảm nhận</div>
                            </div>
                            <div class="flow-arrow fa-2"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step fs-3 glass-card">
                                <div class="fs-num">3</div>
                                <div class="fs-text">Nhiễu nhẹ (Co cơ, cọ xát)</div>
                            </div>
                            <div class="flow-arrow fa-3"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step fs-4 glass-card highlighted-step">
                                <div class="fs-num">4</div>
                                <div class="fs-text">Phán đoán: CÓ RUNG!</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo-4-container">
                        <div class="stimulus-panel-memo glass-card">
                            <div class="sp-title">KÍCH THÍCH VẬT LÝ NHẸ</div>
                            <div class="stimulus-icons-wrap">
                                <div class="stim-item si-1">
                                    <div class="stim-icon-wrap"><i data-lucide="waves"></i></div>
                                    <div class="stim-detail">
                                        <h4>Cọ xát quần áo</h4>
                                        <p>Ma sát nhỏ khi di chuyển</p>
                                    </div>
                                </div>
                                <div class="stim-item si-2">
                                    <div class="stim-icon-wrap"><i data-lucide="activity"></i></div>
                                    <div class="stim-detail">
                                        <h4>Co thắt cơ đùi</h4>
                                        <p>Phản ứng sinh học tự nhiên</p>
                                    </div>
                                </div>
                            </div>
                            <div class="interpretation-arrow">
                                <i data-lucide="arrow-down"></i>
                                <span>Não diễn giải sai</span>
                            </div>
                            <div class="interpretation-result">
                                <div class="ir-icon-wrap vibrate-active"><i data-lucide="smartphone"></i></div>
                                <div class="ir-detail">
                                    <h4>TÍN HIỆU RUNG GIẢ</h4>
                                    <p>Não tự phóng đại biên độ</p>
                                </div>
                            </div>
                        </div>
                        <div class="sim-panel-memo glass-card">
                            <div class="sim-title">BỘ LỌC TÍN HIỆU NÃO BỘ</div>
                            <div class="sim-bars-wrap">
                                <div class="sim-bar-item">
                                    <div class="sb-label">Độ Lo Lắng (Anxiety)</div>
                                    <div class="sb-progress-bg">
                                        <div class="sb-progress-fill anxiety-fill" style="width: 20%;"></div>
                                    </div>
                                    <div class="sb-value anxiety-val">20%</div>
                                </div>
                                <div class="sim-bar-item">
                                    <div class="sb-label">Ngưỡng Lọc (Threshold)</div>
                                    <div class="sb-progress-bg">
                                        <div class="sb-progress-fill threshold-fill" style="width: 80%;"></div>
                                    </div>
                                    <div class="sb-value threshold-val">80/100</div>
                                </div>
                                <div class="sim-bar-item">
                                    <div class="sb-label">Tín hiệu nhiễu (Sensory Signal)</div>
                                    <div class="sb-progress-bg">
                                        <div class="sb-progress-fill signal-fill" style="width: 15%;"></div>
                                    </div>
                                    <div class="sb-value signal-val">15/100</div>
                                </div>
                            </div>
                            <div class="brain-alert-box alert-inactive">
                                <i data-lucide="alert-triangle" class="alert-icon-svg"></i>
                                <span class="alert-text-span">HỆ THỐNG AN TOÀN</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons inside canvas
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
        if (slideId === 'slide_memo_1') {
            const phone = canvas.querySelector('.phone-case-memo');
            const wave1 = canvas.querySelector('.vr-1');
            const wave2 = canvas.querySelector('.vr-2');
            const wave3 = canvas.querySelector('.vr-3');
            const notifCard = canvas.querySelector('.no-notif-card');

            // Phone vibration: active in the first 65% of progress, then stops
            if (progress < 0.65) {
                if (phone && !phone.classList.contains('vibrate-active')) {
                    phone.classList.add('vibrate-active');
                }
                // Ripples follow progress loop
                const loopProgress = (progress * 5) % 1.0;
                if (wave1) {
                    wave1.style.transform = `scale(${1 + loopProgress * 1.5})`;
                    wave1.style.opacity = (1 - loopProgress).toString();
                }
                if (wave2) {
                    const loopProgress2 = ((progress * 5) + 0.33) % 1.0;
                    wave2.style.transform = `scale(${1 + loopProgress2 * 1.5})`;
                    wave2.style.opacity = (1 - loopProgress2).toString();
                }
                if (wave3) {
                    const loopProgress3 = ((progress * 5) + 0.66) % 1.0;
                    wave3.style.transform = `scale(${1 + loopProgress3 * 1.5})`;
                    wave3.style.opacity = (1 - loopProgress3).toString();
                }
            } else {
                if (phone) phone.classList.remove('vibrate-active');
                if (wave1) wave1.style.opacity = '0';
                if (wave2) wave2.style.opacity = '0';
                if (wave3) wave3.style.opacity = '0';
            }

            // Notification reveal: Slide & fade in from 45% onwards
            if (progress > 0.45) {
                const ratio = Math.min(1, (progress - 0.45) / 0.25);
                if (notifCard) {
                    notifCard.style.opacity = ratio.toString();
                    notifCard.style.transform = `translateY(${(1 - ratio) * 15}px)`;
                }
            } else {
                if (notifCard) {
                    notifCard.style.opacity = '0';
                    notifCard.style.transform = 'translateY(15px)';
                }
            }
        }
        else if (slideId === 'slide_memo_2') {
            const phonePocket = canvas.querySelector('.phone-mockup-pocket');
            const card1 = canvas.querySelector('.mc-1');
            const card2 = canvas.querySelector('.mc-2');
            const card3 = canvas.querySelector('.mc-3');

            // Pocket phone vibration active periodically
            if ((progress > 0.05 && progress < 0.2) || (progress > 0.4 && progress < 0.55) || (progress > 0.7 && progress < 0.85)) {
                if (phonePocket) phonePocket.classList.add('vibrate-active');
            } else {
                if (phonePocket) phonePocket.classList.remove('vibrate-active');
            }

            // Reveal cards sequentially
            // Card 1
            if (progress > 0.15) {
                const ratio = Math.min(1, (progress - 0.15) / 0.15);
                if (card1) {
                    card1.style.opacity = ratio.toString();
                    card1.style.transform = `translateX(${(1 - ratio) * -20}px)`;
                }
            } else {
                if (card1) { card1.style.opacity = '0'; card1.style.transform = 'translateX(-20px)'; }
            }
            // Card 2
            if (progress > 0.45) {
                const ratio = Math.min(1, (progress - 0.45) / 0.15);
                if (card2) {
                    card2.style.opacity = ratio.toString();
                    card2.style.transform = `translateX(${(1 - ratio) * -20}px)`;
                }
            } else {
                if (card2) { card2.style.opacity = '0'; card2.style.transform = 'translateX(-20px)'; }
            }
            // Card 3
            if (progress > 0.75) {
                const ratio = Math.min(1, (progress - 0.75) / 0.15);
                if (card3) {
                    card3.style.opacity = ratio.toString();
                    card3.style.transform = `translateX(${(1 - ratio) * -20}px)`;
                }
            } else {
                if (card3) { card3.style.opacity = '0'; card3.style.transform = 'translateX(-20px)'; }
            }
        }
        else if (slideId === 'slide_memo_3') {
            const gaugeFill = canvas.querySelector('.gauge-bar-fill');
            const gaugeThres = canvas.querySelector('.gauge-threshold-line');
            const statusText = canvas.querySelector('.gauge-status-text');
            const ring = canvas.querySelector('.brain-pulse-ring');
            const core = canvas.querySelector('.brain-core-glow');

            // Steps
            const fs1 = canvas.querySelector('.fs-1');
            const fa1 = canvas.querySelector('.fa-1');
            const fs2 = canvas.querySelector('.fs-2');
            const fa2 = canvas.querySelector('.fa-2');
            const fs3 = canvas.querySelector('.fs-3');
            const fa3 = canvas.querySelector('.fa-3');
            const fs4 = canvas.querySelector('.fs-4');

            // 1. Anxiety rises, Normal threshold level drops
            let thresholdPercent = 80;
            if (progress > 0.1 && progress < 0.45) {
                const ratio = (progress - 0.1) / 0.35;
                thresholdPercent = 80 - (50 * ratio); // drops from 80% to 30%
                if (statusText) {
                    statusText.textContent = "Hạ thấp ngưỡng cảm nhận...";
                    statusText.style.color = "#f472b6";
                }
                if (core) {
                    core.setAttribute('fill', '#f472b6');
                    core.setAttribute('r', (10 + ratio * 6).toString());
                }
            } else if (progress >= 0.45) {
                thresholdPercent = 30;
                if (statusText) {
                    statusText.textContent = "Ngưỡng cảm nhận CỰC THẤP!";
                    statusText.style.color = "#ec4899";
                }
                if (core) {
                    core.setAttribute('fill', '#ec4899');
                    core.setAttribute('r', '16');
                }
            } else {
                if (statusText) {
                    statusText.textContent = "Ngưỡng bình thường (Cao)";
                    statusText.style.color = "#a78bfa";
                }
                if (core) {
                    core.setAttribute('fill', '#a78bfa');
                    core.setAttribute('r', '10');
                }
            }

            if (gaugeFill) gaugeFill.style.height = `${thresholdPercent}%`;
            if (gaugeThres) gaugeThres.style.bottom = `${thresholdPercent}%`;

            // Core pulsing rings
            if (ring) {
                const ringProgress = (progress * 4) % 1.0;
                ring.style.transform = `translate(-50%, -50%) scale(${1 + ringProgress * 1.8})`;
                ring.style.opacity = (1 - ringProgress).toString();
                if (progress > 0.45) {
                    ring.style.borderColor = '#ec4899';
                } else {
                    ring.style.borderColor = '#8b5cf6';
                }
            }

            // Flow items sequence
            if (fs1) fs1.style.opacity = progress > 0.08 ? '1' : '0.2';
            if (fa1) fa1.style.opacity = progress > 0.22 ? '1' : '0.2';
            if (fs2) fs2.style.opacity = progress > 0.35 ? '1' : '0.2';
            if (fa2) fa2.style.opacity = progress > 0.52 ? '1' : '0.2';
            if (fs3) fs3.style.opacity = progress > 0.65 ? '1' : '0.2';
            if (fa3) fa3.style.opacity = progress > 0.78 ? '1' : '0.2';
            if (fs4) {
                if (progress > 0.85) {
                    fs4.style.opacity = '1';
                    fs4.classList.add('pulse-glow');
                } else {
                    fs4.style.opacity = '0.2';
                    fs4.classList.remove('pulse-glow');
                }
            }
        }
        else if (slideId === 'slide_memo_4') {
            const anxietyFill = canvas.querySelector('.anxiety-fill');
            const anxietyVal = canvas.querySelector('.anxiety-val');
            const thresFill = canvas.querySelector('.threshold-fill');
            const thresVal = canvas.querySelector('.threshold-val');
            const sigFill = canvas.querySelector('.signal-fill');
            const sigVal = canvas.querySelector('.signal-val');
            const alertBox = canvas.querySelector('.brain-alert-box');
            const alertText = canvas.querySelector('.alert-text-span');

            // Phase 1: Anxiety rises (progress 0.0 -> 0.3)
            let anxiety = 20;
            let threshold = 80;
            let signal = 15;

            if (progress < 0.3) {
                const r = progress / 0.3;
                anxiety = Math.round(20 + 70 * r); // 20 -> 90%
                threshold = Math.round(80 - 50 * r); // 80 -> 30/100
                signal = Math.round(15 + 10 * r); // 15 -> 25/100
            } else if (progress >= 0.3 && progress < 0.65) {
                anxiety = 90;
                threshold = 30;
                // Phase 2: Noise Signal Spikes up (progress 0.35 -> 0.55)
                if (progress > 0.35) {
                    const r2 = Math.min(1, (progress - 0.35) / 0.2);
                    signal = Math.round(25 + 25 * r2); // 25 -> 50/100 (which exceeds threshold of 30!)
                } else {
                    signal = 25;
                }
            } else {
                anxiety = 90;
                threshold = 30;
                signal = 50;
            }

            // Update UI Bars
            if (anxietyFill) anxietyFill.style.width = `${anxiety}%`;
            if (anxietyVal) anxietyVal.textContent = `${anxiety}%`;

            if (thresFill) thresFill.style.width = `${threshold}%`;
            if (thresVal) thresVal.textContent = `${threshold}/100`;

            if (sigFill) sigFill.style.width = `${signal}%`;
            if (sigVal) sigVal.textContent = `${signal}/100`;

            // Phase 3: Trigger alarm when signal > threshold (occurs around progress > 0.48)
            if (signal > threshold && progress > 0.45) {
                if (alertBox) {
                    alertBox.className = 'brain-alert-box alert-active';
                    if (alertText) alertText.textContent = "BÁO ĐỘNG ĐỎ: ĐIỆN THOẠI RUNG!";
                }
            } else {
                if (alertBox) {
                    alertBox.className = 'brain-alert-box alert-inactive';
                    if (alertText) alertText.textContent = "HỆ THỐNG AN TOÀN";
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video1',
        topic: 'Phantom Vibration',
        episodeNum: 1,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 1 Plugin] Loaded: Phantom Vibration ready.');
})();
