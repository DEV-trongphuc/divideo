/**
 * DOM Memo Video 2: Paradoxical Insomnia / Sleep Effort
 * Custom script plugin containing rich visual animations and storytelling logic.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo2_1: [
            { text: 'phải ngủ ngay', start: 1.2, end: 2.8, class: 'active-pink' },
            { text: 'tỉnh táo hơn', start: 3.2, end: 5.8, class: 'active-purple' }
        ],
        slide_memo2_2: [
            { text: 'mục tiêu bắt buộc', start: 1.5, end: 4.0, class: 'active-indigo' },
            { text: 'tự theo dõi', start: 4.5, end: 6.8, class: 'active-purple' },
            { text: 'áp lực thời gian', start: 7.2, end: 9.5, class: 'active-pink' }
        ],
        slide_memo2_3: [
            { text: 'tiến trình sinh học vô thức', start: 1.8, end: 4.8, class: 'active-indigo' },
            { text: 'nhiệm vụ khẩn cấp', start: 5.2, end: 7.5, class: 'active-pink' },
            { text: 'mạng lưới cảnh giác', start: 8.0, end: 10.8, class: 'active-purple' }
        ],
        slide_memo2_4: [
            { text: 'Ý định nghịch lý', start: 1.5, end: 3.8, class: 'active-purple' },
            { text: 'từ bỏ nỗ lực', start: 4.5, end: 7.0, class: 'active-indigo' },
            { text: 'chìm vào giấc ngủ', start: 8.0, end: 11.2, class: 'active-pink' }
        ]
    };

    const customSlideIds = [
        'slide_memo2_1', 'slide_memo2_2', 'slide_memo2_3', 'slide_memo2_4'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo2_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo2-1-container">
                        <div class="night-sky-bg">
                            <div class="moon-glow"></div>
                        </div>
                        
                        <!-- Floating Thoughts representing a racing mind -->
                        <div class="floating-thoughts-container">
                            <div class="thought-item th-1">8:00 Sáng Họp... 📋</div>
                            <div class="thought-item th-2">Sao vẫn chưa ngủ?? 😰</div>
                            <div class="thought-item th-3">Chỉ còn 4 tiếng nữa... ⏰</div>
                            <div class="thought-item th-4">Nhịp tim đập nhanh quá... 🫀</div>
                        </div>

                        <div class="bedroom-mockup">
                            <div class="pillow-glow"></div>
                            <div class="bed-base"></div>
                            <div class="sleeping-head">
                                <div class="brain-glow-s1"></div>
                                <div class="eyes-awake">
                                    <div class="eye left-eye"></div>
                                    <div class="eye right-eye"></div>
                                </div>
                            </div>
                        </div>

                        <div class="clock-digital glass-card">
                            <div class="clock-icon"><i data-lucide="clock"></i></div>
                            <span class="clock-time-val">11:30 PM</span>
                        </div>

                        <div class="brain-thought-bubble glass-card">
                            <span>PHẢI NGỦ NGAY! 😤</span>
                        </div>

                        <!-- ECG Heart Rate Monitor Line -->
                        <div class="heart-rate-monitor">
                            <svg viewBox="0 0 300 60" class="ekg-svg" preserveAspectRatio="none">
                                <path d="M0,30 L90,30 L95,15 L100,45 L105,30 L115,30 L120,5 L130,55 L140,30 L150,30 L300,30" class="ekg-path" />
                            </svg>
                            <span class="pulse-bpm-label">BPM: 72</span>
                        </div>

                        <div class="sleep-status-badge">NGHỊCH LÝ GIẤC NGỦ</div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo2_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo2-2-container">
                        <div class="memo-left-layout">
                            <div class="clock-countdown-card glass-card">
                                <div class="countdown-circle">
                                    <svg viewBox="0 0 100 100" class="svg-countdown">
                                        <circle cx="50" cy="50" r="45" class="cc-bg" />
                                        <circle cx="50" cy="50" r="45" class="cc-fill" />
                                    </svg>
                                    <div class="countdown-text">
                                        <span class="cd-num">5.0h</span>
                                        <span class="cd-lbl">còn lại</span>
                                    </div>
                                </div>
                                <div class="clock-status-label">Báo thức lúc 6:00 AM</div>
                            </div>

                            <!-- Cortisol (Stress) Meter Thermometer -->
                            <div class="cortisol-meter glass-card">
                                <div class="cm-label">CORTISOL (STRESS)</div>
                                <div class="cm-bar-bg">
                                    <div class="cm-bar-fill"></div>
                                </div>
                                <div class="cm-value">Bình thường</div>
                            </div>
                        </div>
                        <div class="memo-right-layout">
                            <div class="memo-card-item m2-c1 glass-card">
                                <div class="mc-icon"><i data-lucide="clock"></i></div>
                                <div class="mc-content">
                                    <h3>Đếm ngược thời gian</h3>
                                    <p>Não liên tục nhẩm tính: Chỉ còn 5 tiếng nữa là phải dậy đi làm.</p>
                                </div>
                            </div>
                            <div class="memo-card-item m2-c2 glass-card">
                                <div class="mc-icon"><i data-lucide="heart"></i></div>
                                <div class="mc-content">
                                    <h3>Nhịp tim tăng nhẹ</h3>
                                    <p>Lo lắng sản sinh cortisol và adrenaline, giữ nhịp tim ở mức cao.</p>
                                </div>
                            </div>
                            <div class="memo-card-item m2-c3 glass-card">
                                <div class="mc-icon"><i data-lucide="brain"></i></div>
                                <div class="mc-content">
                                    <h3>Tự kiểm tra liên tục</h3>
                                    <p>Não luôn tự hỏi: Mình đã buồn ngủ chưa? Sao vẫn chưa ngủ được?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo2_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo2-3-container">
                        <div class="network-battle-area">
                            <div class="battle-title-header">TƯƠNG TÁC XUNG ĐỘT TRONG NÃO BỘ</div>
                            
                            <div class="battle-field-container">
                                <!-- Sleep Center (VLPO) -->
                                <div class="battle-node sleep-defense-node">
                                    <div class="bn-icon-wrap"><i data-lucide="shield"></i></div>
                                    <span class="bn-title">Hệ Phục hồi (VLPO)</span>
                                    <span class="bn-desc">Tự động xoa dịu</span>
                                </div>

                                <!-- Energy Tug of War Beam -->
                                <div class="battle-energy-track">
                                    <div class="battle-energy-beam">
                                        <div class="beam-clash-glow"></div>
                                    </div>
                                </div>

                                <!-- Alert Center (RAS) -->
                                <div class="battle-node alert-attack-node">
                                    <div class="bn-icon-wrap"><i data-lucide="zap"></i></div>
                                    <span class="bn-title">Hệ Cảnh giác (RAS)</span>
                                    <span class="bn-desc">Nỗ lực kiểm soát</span>
                                </div>
                            </div>

                            <div class="net-status-display-rich glass-card">
                                <div class="ns-row-rich">
                                    <span class="ns-dot dot-sleep"></span>
                                    <span>Hệ phục hồi giấc ngủ:</span>
                                    <span class="ns-val-rich vlpo-status">Hoạt động tốt</span>
                                </div>
                                <div class="ns-row-rich">
                                    <span class="ns-dot dot-alert"></span>
                                    <span>Hệ cảnh giác thức tỉnh:</span>
                                    <span class="ns-val-rich ras-status">TẮT</span>
                                </div>
                            </div>
                        </div>

                        <div class="memo-diagram-flow">
                            <div class="flow-step m2-fs1 glass-card">
                                <div class="fs-num">1</div>
                                <div class="fs-text">Ý chí ép buộc</div>
                            </div>
                            <div class="flow-arrow m2-fa1"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m2-fs2 glass-card">
                                <div class="fs-num">2</div>
                                <div class="fs-text">Não kiểm tra</div>
                            </div>
                            <div class="flow-arrow m2-fa2"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m2-fs3 glass-card">
                                <div class="fs-num">3</div>
                                <div class="fs-text">Nhầm nguy hiểm</div>
                            </div>
                            <div class="flow-arrow m2-fa3"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m2-fs4 glass-card highlighted-step">
                                <div class="fs-num">4</div>
                                <div class="fs-text">Thức tỉnh hoàn toàn</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo2_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo2-4-container">
                        <div class="sleep-compare-panel glass-card left-compare-card">
                            <div class="sc-title sc-red-title">CỐ GẮNG KIỂM SOÁT</div>
                            <div class="sc-body">
                                <div class="sc-graphic">
                                    <div class="circle-lock-alert">
                                        <i data-lucide="lock" class="alert-icon-red"></i>
                                    </div>
                                    <div class="shatter-pieces">
                                        <span class="piece p-1"></span>
                                        <span class="piece p-2"></span>
                                        <span class="piece p-3"></span>
                                    </div>
                                    <div class="alert-waves-red"></div>
                                </div>
                                <div class="sc-label-group">
                                    <span class="sc-lbl">Hệ Giao Cảm (Căng thẳng)</span>
                                    <span class="sc-status text-red">TỈNH TÁO (MẤT NGỦ)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sleep-compare-panel glass-card right-compare-card">
                            <div class="sc-title sc-blue-title">Ý ĐỊNH NGHỊCH LÝ</div>
                            <div class="sc-body">
                                <div class="sc-graphic">
                                    <div class="circle-sleep-pass">
                                        <i data-lucide="eye-off" class="pass-icon-blue"></i>
                                    </div>
                                    <div class="alert-waves-blue"></div>
                                </div>
                                <div class="sc-label-group">
                                    <span class="sc-lbl">Hệ Phó Giao Cảm (Thư giãn)</span>
                                    <span class="sc-status text-blue">THẢ LỎNG (DỄ NGỦ)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons
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
        if (slideId === 'slide_memo2_1') {
            const timeVal = canvas.querySelector('.clock-time-val');
            const eyes = canvas.querySelector('.eyes-awake');
            const leftEye = canvas.querySelector('.left-eye');
            const rightEye = canvas.querySelector('.right-eye');
            const thought = canvas.querySelector('.brain-thought-bubble');
            const th1 = canvas.querySelector('.th-1');
            const th2 = canvas.querySelector('.th-2');
            const th3 = canvas.querySelector('.th-3');
            const th4 = canvas.querySelector('.th-4');
            const ekgPath = canvas.querySelector('.ekg-path');
            const bpmLabel = canvas.querySelector('.pulse-bpm-label');

            // Clock time speeds up: 11:30 PM -> 3:45 AM
            if (timeVal) {
                const totalMins = Math.round(progress * 255); // 255 mins elapsed
                const h = (11 + Math.floor(totalMins / 60)) % 12 || 12;
                const m = totalMins % 60;
                const mStr = String(m).padStart(2, '0');
                const ampm = (11 + Math.floor(totalMins / 60)) >= 12 ? 'AM' : 'PM';
                timeVal.textContent = `${h}:${mStr} ${ampm}`;
            }

            // Eyes open wider and dilate based on progress
            if (eyes) {
                if (progress < 0.2) {
                    eyes.style.transform = 'scaleY(0.1)';
                } else if (progress < 0.45) {
                    eyes.style.transform = `scaleY(${0.1 + (progress - 0.2) * 4})`;
                } else {
                    eyes.style.transform = 'scaleY(1.1)';
                    // jitter eyes due to anxiety
                    const jitter = (Math.sin(progress * 80) * 1.0);
                    leftEye.style.transform = `translate(${jitter}px, ${jitter}px)`;
                    rightEye.style.transform = `translate(${-jitter}px, ${jitter}px)`;
                }
            }

            // Anxious floating thoughts appearance
            if (th1) { th1.style.opacity = progress > 0.1 ? '0.75' : '0'; th1.style.transform = `translateY(${Math.sin(progress * 10) * 8}px)`; }
            if (th2) { th2.style.opacity = progress > 0.3 ? '0.75' : '0'; th2.style.transform = `translateY(${Math.cos(progress * 12) * 8}px)`; }
            if (th3) { th3.style.opacity = progress > 0.5 ? '0.75' : '0'; th3.style.transform = `translateY(${Math.sin(progress * 15) * 8}px)`; }
            if (th4) { th4.style.opacity = progress > 0.7 ? '0.75' : '0'; th4.style.transform = `translateY(${Math.cos(progress * 18) * 8}px)`; }

            // ECG Heartbeat gets faster as anxiety/progress rises
            if (ekgPath) {
                const bpm = Math.round(72 + progress * 48); // rises from 72 to 120 BPM
                if (bpmLabel) bpmLabel.textContent = `BPM: ${bpm}`;
                
                // Speed up path dash movement
                const animSpeed = 4 - (progress * 2.8); // goes from 4s cycle to 1.2s cycle
                ekgPath.style.animation = `ekg-flow-anim ${animSpeed}s linear infinite`;
                if (bpm > 95) {
                    ekgPath.style.stroke = '#ef4444';
                    if (bpmLabel) bpmLabel.style.color = '#ef4444';
                } else {
                    ekgPath.style.stroke = 'var(--memo-indigo)';
                    if (bpmLabel) bpmLabel.style.color = 'var(--memo-indigo)';
                }
            }

            // Thought bubble vibrates and flashes red
            if (thought) {
                if (progress > 0.35) {
                    const ratio = Math.min(1, (progress - 0.35) / 0.25);
                    thought.style.opacity = ratio.toString();
                    thought.style.transform = `translateY(${(1 - ratio) * 20}px) scale(${1 + Math.sin(progress * 40) * 0.04})`;
                    if (progress > 0.6) {
                        thought.style.borderColor = '#ef4444';
                        thought.style.boxShadow = '0 0 15px rgba(239,68,68,0.25)';
                    }
                } else {
                    thought.style.opacity = '0';
                    thought.style.transform = 'translateY(20px)';
                }
            }
        }
        else if (slideId === 'slide_memo2_2') {
            const circleFill = canvas.querySelector('.cc-fill');
            const countdownText = canvas.querySelector('.cd-num');
            const cortisolFill = canvas.querySelector('.cm-bar-fill');
            const cortisolVal = canvas.querySelector('.cm-value');
            const card1 = canvas.querySelector('.m2-c1');
            const card2 = canvas.querySelector('.m2-c2');
            const card3 = canvas.querySelector('.m2-c3');

            // Countdown circle fills
            if (circleFill) {
                const circumference = 2 * Math.PI * 45;
                const ratio = 1 - progress * 0.6;
                circleFill.style.strokeDasharray = `${circumference}`;
                circleFill.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
                
                // Change color based on progress
                if (progress > 0.6) {
                    circleFill.style.stroke = '#ef4444';
                } else {
                    circleFill.style.stroke = 'var(--memo-pink)';
                }
            }

            if (countdownText) {
                const remainingHours = Math.max(2, (5 - progress * 3).toFixed(1));
                countdownText.textContent = `${remainingHours}h`;
            }

            // Cortisol stress level rising
            if (cortisolFill) {
                const cLvl = Math.round(20 + progress * 75); // rises 20% -> 95%
                cortisolFill.style.height = `${cLvl}%`;
                
                if (cortisolVal) {
                    if (cLvl < 45) {
                        cortisolVal.textContent = "Bình thường";
                        cortisolVal.style.color = "#10b981";
                        cortisolFill.style.background = "#10b981";
                    } else if (cLvl < 75) {
                        cortisolVal.textContent = "Gia tăng ( cortisol↑ )";
                        cortisolVal.style.color = "#f59e0b";
                        cortisolFill.style.background = "#f59e0b";
                    } else {
                        cortisolVal.textContent = "QUÁ TẢI ( STRESS! )";
                        cortisolVal.style.color = "#ef4444";
                        cortisolFill.style.background = "#ef4444";
                        cortisolFill.style.boxShadow = "0 0 10px #ef4444";
                    }
                }
            }

            // Reveal cards sequentially
            if (progress > 0.15) {
                const r = Math.min(1, (progress - 0.15) / 0.15);
                if (card1) { card1.style.opacity = r.toString(); card1.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card1) { card1.style.opacity = '0'; card1.style.transform = 'translateX(-20px)'; }
            }

            if (progress > 0.45) {
                const r = Math.min(1, (progress - 0.45) / 0.15);
                if (card2) { card2.style.opacity = r.toString(); card2.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card2) { card2.style.opacity = '0'; card2.style.transform = 'translateX(-20px)'; }
            }

            if (progress > 0.75) {
                const r = Math.min(1, (progress - 0.75) / 0.15);
                if (card3) { card3.style.opacity = r.toString(); card3.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card3) { card3.style.opacity = '0'; card3.style.transform = 'translateX(-20px)'; }
            }
        }
        else if (slideId === 'slide_memo2_3') {
            const sleepNode = canvas.querySelector('.sleep-defense-node');
            const alertNode = canvas.querySelector('.alert-attack-node');
            const beam = canvas.querySelector('.battle-energy-beam');
            const glow = canvas.querySelector('.beam-clash-glow');
            const vlpoStatus = canvas.querySelector('.vlpo-status');
            const rasStatus = canvas.querySelector('.ras-status');

            // Diagram steps
            const fs1 = canvas.querySelector('.m2-fs1');
            const fa1 = canvas.querySelector('.m2-fa1');
            const fs2 = canvas.querySelector('.m2-fs2');
            const fa2 = canvas.querySelector('.m2-fa2');
            const fs3 = canvas.querySelector('.m2-fs3');
            const fa3 = canvas.querySelector('.m2-fa3');
            const fs4 = canvas.querySelector('.m2-fs4');

            // Battle mechanics: Energy beam gets pushed from center (50%) to left (10%) as alertness takes over
            if (progress < 0.2) {
                if (beam) { beam.style.left = '50%'; beam.style.width = '2px'; }
                if (glow) { glow.style.left = '50%'; }
                if (sleepNode) sleepNode.style.transform = 'scale(1.0)';
                if (alertNode) alertNode.style.transform = 'scale(1.0)';
            } else {
                const ratio = Math.min(1, (progress - 0.2) / 0.6); // 0.0 -> 1.0
                const beamPos = 50 - (ratio * 40); // 50% down to 10%
                if (beam) {
                    beam.style.left = `${beamPos}%`;
                    beam.style.width = `${ratio * 100}%`;
                    beam.style.background = `linear-gradient(90deg, rgba(236,72,153,${ratio * 0.8}) 0%, rgba(99,102,241,${(1 - ratio) * 0.8}) 100%)`;
                }
                if (glow) {
                    glow.style.left = `${beamPos}%`;
                    glow.style.opacity = ratio.toString();
                    glow.style.transform = `translate(-50%, -50%) scale(${1 + ratio * 0.6})`;
                }

                if (sleepNode) {
                    sleepNode.style.transform = `scale(${1 - ratio * 0.25})`; // shrinks
                    if (ratio > 0.8) {
                        sleepNode.style.borderColor = 'rgba(255,255,255,0.08)';
                        sleepNode.style.color = '#475569';
                    } else {
                        sleepNode.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    }
                }
                if (alertNode) {
                    alertNode.style.transform = `scale(${1 + ratio * 0.25})`; // grows
                    alertNode.style.boxShadow = `0 0 ${20 + ratio * 20}px rgba(236, 72, 153, ${ratio * 0.45})`;
                    alertNode.style.borderColor = `rgba(236, 72, 153, ${0.4 + ratio * 0.6})`;
                }

                // Update text statuses
                if (vlpoStatus) {
                    if (ratio > 0.8) {
                        vlpoStatus.textContent = "BỊ TÊ LIỆT";
                        vlpoStatus.style.color = "#475569";
                    } else {
                        vlpoStatus.textContent = "VLPO yếu dần";
                        vlpoStatus.style.color = "#818cf8";
                    }
                }
                if (rasStatus) {
                    rasStatus.textContent = `BẬT CẢNH BÁO (${Math.round(ratio * 100)}%)`;
                    rasStatus.style.color = "#ec4899";
                    rasStatus.classList.add('glow-txt');
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
        else if (slideId === 'slide_memo2_4') {
            const leftCard = canvas.querySelector('.left-compare-card');
            const rightCard = canvas.querySelector('.right-compare-card');
            const redWaves = canvas.querySelector('.alert-waves-red');
            const blueWaves = canvas.querySelector('.alert-waves-blue');
            const lockIcon = canvas.querySelector('.circle-lock-alert');
            const pieces = canvas.querySelectorAll('.piece');

            // Left card active first (progress < 0.5)
            if (progress < 0.5) {
                if (leftCard) {
                    leftCard.style.opacity = '1';
                    leftCard.style.transform = 'scale(1.03)';
                    leftCard.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    leftCard.style.boxShadow = '0 10px 30px rgba(239,68,68,0.15)';
                }
                if (rightCard) {
                    rightCard.style.opacity = '0.4';
                    rightCard.style.transform = 'scale(0.97)';
                    rightCard.style.borderColor = 'var(--memo-glass-border)';
                    rightCard.style.boxShadow = 'none';
                }

                // Shake lock icon
                if (lockIcon) {
                    const jitter = Math.sin(progress * 120) * 1.5;
                    lockIcon.style.transform = `translate(${jitter}px, ${jitter}px)`;
                }

                // Red waves ripple
                if (redWaves) {
                    const waveR = (progress * 8) % 1.0;
                    redWaves.style.transform = `scale(${1 + waveR * 1.6})`;
                    redWaves.style.opacity = (1 - waveR).toString();
                }
                if (blueWaves) blueWaves.style.opacity = '0';
                pieces.forEach(p => p.style.opacity = '0');
            } 
            // Paradoxical transition starts (progress >= 0.5)
            else {
                const shiftRatio = (progress - 0.5) / 0.5; // 0.0 -> 1.0
                
                if (leftCard) {
                    leftCard.style.opacity = (1.0 - shiftRatio * 0.6).toString(); // dims down to 0.4
                    leftCard.style.transform = `scale(${1.03 - shiftRatio * 0.06})`; // shrinks
                    leftCard.style.borderColor = 'var(--memo-glass-border)';
                    leftCard.style.boxShadow = 'none';
                }

                // Shatter lock effect: fade out lock icon, explode pieces
                if (lockIcon) {
                    lockIcon.style.opacity = (1 - shiftRatio * 2).toString();
                    lockIcon.style.transform = `scale(${1 - shiftRatio * 0.3}) translateY(${shiftRatio * 15}px)`;
                }

                pieces.forEach((p, idx) => {
                    p.style.opacity = '1';
                    const angle = (idx * 120) * (Math.PI / 180);
                    const dist = shiftRatio * 45;
                    const x = Math.cos(angle) * dist;
                    const y = Math.sin(angle) * dist + (shiftRatio * 20); // gravity drop
                    p.style.transform = `translate(${x}px, ${y}px) rotate(${shiftRatio * 180}deg)`;
                });

                if (rightCard) {
                    rightCard.style.opacity = (0.4 + shiftRatio * 0.6).toString(); // grows to 1.0
                    rightCard.style.transform = `scale(${0.97 + shiftRatio * 0.06})`; // grows
                    rightCard.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    rightCard.style.boxShadow = `0 10px ${30 + shiftRatio * 20}px rgba(99,102,241,0.25)`;
                }

                if (redWaves) redWaves.style.opacity = '0';
                
                // Calming blue sleep waves expand
                if (blueWaves) {
                    const waveB = (progress * 6) % 1.0;
                    blueWaves.style.transform = `scale(${1 + waveB * 1.8})`;
                    blueWaves.style.opacity = (1 - waveB).toString();
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video2',
        topic: 'Sleep Effort Paradox',
        episodeNum: 2,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 2 Plugin] Loaded: Sleep Effort Paradox ready.');
})();
