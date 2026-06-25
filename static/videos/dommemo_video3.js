/**
 * DOM Memo Video 3: Recorded Voice Paradox
 * Custom script plugin containing rich visual animations and storytelling logic.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo3_1: [
            { text: 'giọng nói của mình', start: 1.2, end: 3.2, class: 'active-purple' },
            { text: 'ghi âm', start: 3.5, end: 4.8, class: 'active-indigo' },
            { text: 'không giống mình', start: 5.0, end: 5.8, class: 'active-pink' }
        ],
        slide_memo3_2: [
            { text: 'sóng âm truyền qua không khí', start: 1.5, end: 4.5, class: 'active-indigo' },
            { text: 'người khác nghe', start: 5.0, end: 7.2, class: 'active-purple' },
            { text: 'giọng nói thực sự', start: 7.5, end: 9.8, class: 'active-pink' }
        ],
        slide_memo3_3: [
            { text: 'dẫn truyền qua xương sọ', start: 1.8, end: 4.8, class: 'active-indigo' },
            { text: 'dây thanh quản', start: 5.2, end: 7.8, class: 'active-purple' },
            { text: 'tai trong', start: 8.2, end: 11.2, class: 'active-pink' }
        ],
        slide_memo3_4: [
            { text: 'bộ lọc âm trầm', start: 1.5, end: 4.5, class: 'active-purple' },
            { text: 'tần số thấp', start: 5.0, end: 7.5, class: 'active-indigo' },
            { text: 'ấm áp và dày dặn', start: 8.0, end: 10.8, class: 'active-pink' }
        ]
    };

    const customSlideIds = [
        'slide_memo3_1', 'slide_memo3_2', 'slide_memo3_3', 'slide_memo3_4'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo3_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo3-1-container">
                        <div class="vintage-mic-ripple">
                            <div class="mic-wave mw-1"></div>
                            <div class="mic-wave mw-2"></div>
                            <div class="mic-wave mw-3"></div>
                        </div>

                        <!-- Cassette Tape simulation playing voice -->
                        <div class="cassette-tape-wrap vibe-shake-light">
                            <div class="cassette-body">
                                <div class="cassette-label">VOICE MEMO #003</div>
                                <div class="cassette-window">
                                    <div class="tape-reel reel-left">
                                        <div class="spoke s-1"></div>
                                        <div class="spoke s-2"></div>
                                        <div class="spoke s-3"></div>
                                    </div>
                                    <div class="tape-reel reel-right">
                                        <div class="spoke s-1"></div>
                                        <div class="spoke s-2"></div>
                                        <div class="spoke s-3"></div>
                                    </div>
                                </div>
                                <div class="cassette-bottom-holes">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>

                        <div class="mic-status-label glass-card">
                            <div class="mic-icon vibrate-active"><i data-lucide="mic"></i></div>
                            <span class="mic-status-text">ĐANG PHÁT LẠI...</span>
                        </div>

                        <div class="voice-wave-canvas-wrap">
                            <div class="vwave vw-1"></div>
                            <div class="vwave vw-2"></div>
                            <div class="vwave vw-3"></div>
                            <div class="vwave vw-4"></div>
                            <div class="vwave vw-5"></div>
                            <div class="vwave vw-6"></div>
                        </div>

                        <div class="sleep-status-badge">NGHỊCH LÝ GIỌNG NÓI</div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo3_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo3-2-container">
                        <div class="memo-left-layout">
                            <div class="sound-propagation-card glass-card">
                                <div class="mouth-speaker-node">
                                    <i data-lucide="volume-2"></i>
                                </div>
                                
                                <div class="propagation-field">
                                    <div class="air-particle p-1"></div>
                                    <div class="air-particle p-2"></div>
                                    <div class="air-particle p-3"></div>
                                    <div class="air-particle p-4"></div>
                                    
                                    <div class="wave-ripple wr-1"></div>
                                    <div class="wave-ripple wr-2"></div>
                                </div>

                                <div class="ear-receiver-node">
                                    <i data-lucide="ear"></i>
                                </div>
                            </div>

                            <div class="air-conduction-badge glass-card">
                                <span>DẪN TRUYỀN KHÔNG KHÍ (100% CƠ HỌC)</span>
                            </div>
                        </div>

                        <div class="memo-right-layout">
                            <div class="memo-card-item m3-c1 glass-card">
                                <div class="mc-icon"><i data-lucide="wind"></i></div>
                                <div class="mc-content">
                                    <h3>Sóng âm truyền đi</h3>
                                    <p>Các phân tử không khí nén giãn liên tục để truyền tải dao động âm.</p>
                                </div>
                            </div>
                            <div class="memo-card-item m3-c2 glass-card">
                                <div class="mc-icon"><i data-lucide="mic"></i></div>
                                <div class="mc-content">
                                    <h3>Ghi âm bắt sóng</h3>
                                    <p>Thiết bị thu nhận sóng cơ học giống hệt cách tai người khác nghe bạn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo3_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo3-3-container">
                        <div class="skull-anatomy-card">
                            <div class="anatomy-title">BẢN ĐỒ DẪN TRUYỀN ÂM THANH</div>
                            
                            <div class="anatomy-view">
                                <!-- Anatomical head outline using SVG -->
                                <svg viewBox="0 0 400 300" class="head-anatomy-svg">
                                    <!-- Head Profile -->
                                    <path d="M150,50 C230,50 280,100 280,170 C280,210 240,240 210,250 C180,260 170,270 150,270 C130,270 120,250 100,240 C70,225 60,180 60,140 C60,90 90,50 150,50 Z" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" />
                                    <!-- Inner Ear (Cochlea) Target -->
                                    <circle cx="210" cy="150" r="14" fill="rgba(139, 92, 246, 0.15)" stroke="var(--memo-primary)" stroke-width="2" class="cochlea-target" />
                                    <path d="M206,146 A5,5 0 1,1 214,154" fill="none" stroke="var(--memo-primary)" stroke-width="2" />
                                    
                                    <!-- Vocal Cords Source -->
                                    <circle cx="150" cy="230" r="10" fill="rgba(236, 72, 153, 0.2)" stroke="var(--memo-pink)" stroke-width="2" class="vocal-cords-source" />
                                    
                                    <!-- Air Path (Outside -> Ear) -->
                                    <path d="M130,230 C90,210 70,160 180,140" fill="none" stroke="rgba(244, 114, 182, 0.3)" stroke-dasharray="6,4" stroke-width="2.5" class="anatomy-air-path" />
                                    
                                    <!-- Bone Path (Inside skull -> Ear) -->
                                    <path d="M155,225 Q180,190 205,155" fill="none" stroke="rgba(99, 102, 241, 0.3)" stroke-width="4.5" stroke-linecap="round" class="anatomy-bone-path" />
                                </svg>

                                <div class="path-label pl-air">Dẫn truyền Không khí</div>
                                <div class="path-label pl-bone">Dẫn truyền Xương sọ</div>
                            </div>
                        </div>

                        <div class="memo-diagram-flow">
                            <div class="flow-step m3-fs1 glass-card">
                                <div class="fs-num">1</div>
                                <div class="fs-text">Dây thanh rung</div>
                            </div>
                            <div class="flow-arrow m3-fa1"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m3-fs2 glass-card">
                                <div class="fs-num">2</div>
                                <div class="fs-text">Sóng truyền ra</div>
                            </div>
                            <div class="flow-arrow m3-fa2"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m3-fs3 glass-card">
                                <div class="fs-num">3</div>
                                <div class="fs-text">Rung xương sọ</div>
                            </div>
                            <div class="flow-arrow m3-fa3"><i data-lucide="chevron-right"></i></div>
                            <div class="flow-step m3-fs4 glass-card highlighted-step">
                                <div class="fs-num">4</div>
                                <div class="fs-text">Trầm ấm hơn</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo3_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo3-4-container">
                        <div class="equalizer-compare-panel glass-card left-eq-panel">
                            <div class="sc-title sc-red-title">GIỌNG QUA GHI ÂM</div>
                            
                            <div class="eq-bars-container recorded-eq">
                                <div class="eq-bar eq-b1"></div>
                                <div class="eq-bar eq-b2"></div>
                                <div class="eq-bar eq-b3"></div>
                                <div class="eq-bar eq-b4"></div>
                                <div class="eq-bar eq-b5"></div>
                                <div class="eq-bar eq-b6"></div>
                            </div>

                            <div class="eq-label-group">
                                <span class="eq-frequency-desc">Thiếu tần số thấp (Bass)</span>
                                <span class="eq-status-tag text-red">MỎNG & CHÓI TAI</span>
                            </div>
                        </div>

                        <div class="equalizer-compare-panel glass-card right-eq-panel">
                            <div class="sc-title sc-blue-title">GIỌNG TỰ CẢM NHẬN</div>
                            
                            <div class="eq-bars-container self-eq">
                                <div class="eq-bar eq-b1"></div>
                                <div class="eq-bar eq-b2"></div>
                                <div class="eq-bar eq-b3"></div>
                                <div class="eq-bar eq-b4"></div>
                                <div class="eq-bar eq-b5"></div>
                                <div class="eq-bar eq-b6"></div>
                            </div>

                            <div class="eq-label-group">
                                <span class="eq-frequency-desc">Xương sọ khuếch đại Bass ↑</span>
                                <span class="eq-status-tag text-blue">TRẦM ẤM & DÀY DẶN</span>
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
        if (slideId === 'slide_memo3_1') {
            const leftReel = canvas.querySelector('.reel-left');
            const rightReel = canvas.querySelector('.reel-right');
            const wave1 = canvas.querySelector('.mw-1');
            const wave2 = canvas.querySelector('.mw-2');
            const wave3 = canvas.querySelector('.mw-3');
            const vwaves = canvas.querySelectorAll('.vwave');

            // Cassette reels rotate based on playback
            if (leftReel && rightReel) {
                const deg = progress * 720;
                leftReel.style.transform = `rotate(${deg}deg)`;
                rightReel.style.transform = `rotate(${deg}deg)`;
            }

            // Expanding concentric ripples
            const loopProgress = (progress * 4) % 1.0;
            if (wave1) {
                wave1.style.transform = `translate(-50%, -50%) scale(${1 + loopProgress * 1.5})`;
                wave1.style.opacity = (1 - loopProgress).toString();
            }
            if (wave2) {
                const loopProgress2 = ((progress * 4) + 0.33) % 1.0;
                wave2.style.transform = `translate(-50%, -50%) scale(${1 + loopProgress2 * 1.5})`;
                wave2.style.opacity = (1 - loopProgress2).toString();
            }
            if (wave3) {
                const loopProgress3 = ((progress * 4) + 0.66) % 1.0;
                wave3.style.transform = `translate(-50%, -50%) scale(${1 + loopProgress3 * 1.5})`;
                wave3.style.opacity = (1 - loopProgress3).toString();
            }

            // Voice wave columns jumping up and down
            vwaves.forEach((vw, idx) => {
                const speed = 25 + idx * 5;
                const scaleVal = 0.3 + Math.abs(Math.sin(progress * speed)) * 1.2;
                vw.style.transform = `scaleY(${scaleVal})`;
            });
        }
        else if (slideId === 'slide_memo3_2') {
            const card1 = canvas.querySelector('.m3-c1');
            const card2 = canvas.querySelector('.m3-c2');
            const speakerNode = canvas.querySelector('.mouth-speaker-node');
            const receiverNode = canvas.querySelector('.ear-receiver-node');
            const wr1 = canvas.querySelector('.wr-1');
            const wr2 = canvas.querySelector('.wr-2');
            const particles = canvas.querySelectorAll('.air-particle');

            // Sound waves ripple animation expanding from left to right
            const loopProgress = (progress * 6) % 1.0;
            if (wr1) {
                wr1.style.transform = `translate(-50%, -50%) scale(${0.5 + loopProgress * 2.5})`;
                wr1.style.opacity = (1 - loopProgress).toString();
            }
            if (wr2) {
                const loopProgress2 = ((progress * 6) + 0.5) % 1.0;
                wr2.style.transform = `translate(-50%, -50%) scale(${0.5 + loopProgress2 * 2.5})`;
                wr2.style.opacity = (1 - loopProgress2).toString();
            }

            // Pulse speaker and listener nodes when wave hits
            if (speakerNode) {
                const speakerPulse = 1 + Math.abs(Math.sin(progress * 40)) * 0.12;
                speakerNode.style.transform = `scale(${speakerPulse})`;
            }
            if (receiverNode) {
                // Ear receiver node pulses when wave crosses middle/end
                const receiverPulse = (progress * 6 % 1.0 > 0.6) ? 1.15 : 1.0;
                receiverNode.style.transform = `scale(${receiverPulse})`;
            }

            // Air particles oscillate back and forth representing pressure waves
            particles.forEach((p, idx) => {
                const jitter = Math.sin(progress * 50 + idx) * 12;
                p.style.transform = `translateX(${jitter}px)`;
            });

            // Reveal cards sequentially
            if (progress > 0.15) {
                const r = Math.min(1, (progress - 0.15) / 0.15);
                if (card1) { card1.style.opacity = r.toString(); card1.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card1) { card1.style.opacity = '0'; card1.style.transform = 'translateX(-20px)'; }
            }

            if (progress > 0.55) {
                const r = Math.min(1, (progress - 0.55) / 0.15);
                if (card2) { card2.style.opacity = r.toString(); card2.style.transform = `translateX(${(1 - r) * -20}px)`; }
            } else {
                if (card2) { card2.style.opacity = '0'; card2.style.transform = 'translateX(-20px)'; }
            }
        }
        else if (slideId === 'slide_memo3_3') {
            const airPath = canvas.querySelector('.anatomy-air-path');
            const bonePath = canvas.querySelector('.anatomy-bone-path');
            const vocalSource = canvas.querySelector('.vocal-cords-source');
            const cochlea = canvas.querySelector('.cochlea-target');

            // Flow steps
            const fs1 = canvas.querySelector('.m3-fs1');
            const fa1 = canvas.querySelector('.m3-fa1');
            const fs2 = canvas.querySelector('.m3-fs2');
            const fa2 = canvas.querySelector('.m3-fa2');
            const fs3 = canvas.querySelector('.m3-fs3');
            const fa3 = canvas.querySelector('.m3-fa3');
            const fs4 = canvas.querySelector('.m3-fs4');

            // SVGs line dashes flow
            if (airPath) {
                // Animate air dash offset
                const dashOffset = 200 - (progress * 200);
                airPath.style.strokeDashoffset = dashOffset.toString();
                if (progress > 0.2) {
                    airPath.style.stroke = 'var(--memo-pink)';
                } else {
                    airPath.style.stroke = 'rgba(244, 114, 182, 0.3)';
                }
            }

            if (bonePath) {
                // Bone conduction solid line glows in phase
                if (progress > 0.5) {
                    bonePath.style.stroke = 'var(--memo-indigo)';
                    bonePath.style.filter = 'drop-shadow(0 0 8px #6366f1)';
                } else {
                    bonePath.style.stroke = 'rgba(99, 102, 241, 0.3)';
                    bonePath.style.filter = 'none';
                }
            }

            // Pulse vocal cords continuously
            if (vocalSource) {
                const s = 1 + Math.abs(Math.sin(progress * 60)) * 0.15;
                vocalSource.setAttribute('r', (10 * s).toString());
            }

            // Cochlea glows when both waves arrive (progress > 0.75)
            if (cochlea) {
                if (progress > 0.75) {
                    cochlea.setAttribute('fill', 'var(--memo-primary)');
                    cochlea.style.filter = 'drop-shadow(0 0 12px #8b5cf6)';
                } else {
                    cochlea.setAttribute('fill', 'rgba(139, 92, 246, 0.15)');
                    cochlea.style.filter = 'none';
                }
            }

            // Diagram flow steps sequence
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
        else if (slideId === 'slide_memo3_4') {
            const recordedPanel = canvas.querySelector('.left-eq-panel');
            const selfPanel = canvas.querySelector('.right-eq-panel');

            // Pulse Equalizer bars on both sides
            const recordedBars = canvas.querySelectorAll('.recorded-eq .eq-bar');
            const selfBars = canvas.querySelectorAll('.self-eq .eq-bar');

            // Left panel is active first, then right panel takes priority
            if (progress < 0.5) {
                if (recordedPanel) {
                    recordedPanel.style.opacity = '1';
                    recordedPanel.style.transform = 'scale(1.03)';
                    recordedPanel.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    recordedPanel.style.boxShadow = '0 10px 30px rgba(239,68,68,0.15)';
                }
                if (selfPanel) {
                    selfPanel.style.opacity = '0.4';
                    selfPanel.style.transform = 'scale(0.97)';
                    selfPanel.style.borderColor = 'var(--memo-glass-border)';
                    selfPanel.style.boxShadow = 'none';
                }
            } else {
                const shiftRatio = (progress - 0.5) / 0.5;
                if (recordedPanel) {
                    recordedPanel.style.opacity = (1.0 - shiftRatio * 0.6).toString();
                    recordedPanel.style.transform = `scale(${1.03 - shiftRatio * 0.06})`;
                    recordedPanel.style.borderColor = 'var(--memo-glass-border)';
                    recordedPanel.style.boxShadow = 'none';
                }
                if (selfPanel) {
                    selfPanel.style.opacity = (0.4 + shiftRatio * 0.6).toString();
                    selfPanel.style.transform = `scale(${0.97 + shiftRatio * 0.06})`;
                    selfPanel.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    selfPanel.style.boxShadow = `0 10px ${30 + shiftRatio * 20}px rgba(99,102,241,0.25)`;
                }
            }

            // Animate equalizer bars:
            // Recorded Voice has low bass (first 2 bars) and high treble (last 4 bars)
            recordedBars.forEach((bar, idx) => {
                let baseHeight = 50;
                if (idx < 2) baseHeight = 15; // low bass
                else baseHeight = 70; // high treble
                
                const jitter = Math.abs(Math.sin(progress * (30 + idx * 5))) * 25;
                bar.style.height = `${baseHeight + jitter}%`;
            });

            // Self-heard Voice has heavily boosted bass (first 2-3 bars) and normal/warm treble
            selfBars.forEach((bar, idx) => {
                let baseHeight = 30;
                if (idx < 3) baseHeight = 80; // boosted bass!
                else baseHeight = 40; // warm mids/treble
                
                const jitter = Math.abs(Math.cos(progress * (25 + idx * 8))) * 18;
                bar.style.height = `${baseHeight + jitter}%`;
            });
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video3',
        topic: 'Voice Paradox',
        episodeNum: 3,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 3 Plugin] Loaded: Recorded Voice Paradox ready.');
})();
