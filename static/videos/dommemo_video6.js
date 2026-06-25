/**
 * DOM Memo Video 6: Telepathy Selection Bias
 * Custom script plugin containing selection bias animations and probability dashboard counters.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo6_1: [
            { text: 'nghĩ đến họ', start: 1.0, end: 3.5, class: 'active-purple' },
            { text: 'thần giao cách cảm', start: 4.5, end: 8.0, class: 'active-pink' }
        ],
        slide_memo6_2: [
            { text: 'định kiến xác nhận', start: 1.5, end: 5.0, class: 'active-indigo' },
            { text: 'sự trùng hợp', start: 6.0, end: 9.5, class: 'active-pink' }
        ],
        slide_memo6_3: [
            { text: 'hai mươi lần', start: 1.2, end: 4.2, class: 'active-purple' },
            { text: 'lý thuyết xác suất', start: 5.5, end: 9.0, class: 'active-indigo' }
        ],
        slide_memo6_4: [
            { text: 'Kỳ tích', start: 1.0, end: 4.5, class: 'active-pink' },
            { text: 'xóa ngay', start: 5.5, end: 9.0, class: 'active-purple' }
        ],
        slide_memo6_5: [
            { text: 'chọn lọc', start: 1.0, end: 4.0, class: 'active-indigo' },
            { text: 'tâm lý học', start: 5.0, end: 8.5, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo6_1', 'slide_memo6_2', 'slide_memo6_3', 'slide_memo6_4', 'slide_memo6_5'
    ];

    // Helper: generate grid dots
    function makeGridHTML() {
        let html = '';
        for (let i = 0; i < 100; i++) {
            // Dot 54 is the coincidence dot (roughly in the middle)
            if (i === 54) {
                html += `<div class="matrix-dot dot-coincidence" data-idx="${i}">💬</div>`;
            } else {
                html += `<div class="matrix-dot dot-ignored" data-idx="${i}">⚫</div>`;
            }
        }
        return html;
    }

    // Helper: generate pre-spawned falling particles for trash bin
    function makeFallingParticlesHTML() {
        let html = '';
        const letters = ['💭', '💤', '🧠', '❔', '💬', '💭', '✉️', '❌', '💤', '❔'];
        for (let i = 0; i < 10; i++) {
            const leftOffset = 30 + (i * 25); // distribute horizontally
            html += `<span class="falling-particle" style="left: ${leftOffset}px; top: 120px; opacity: 0;">${letters[i % letters.length]}</span>`;
        }
        return html;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo6_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo6-1-container">
                        <!-- Left: Thought Cloud -->
                        <div class="thought-cloud-wrap">
                            <div class="thought-cloud-bg">
                                <span class="thought-profile-icon">👨‍💻</span>
                                <span class="thought-text">"ĐANG NGHĨ VỀ CRUSH..."</span>
                            </div>
                        </div>

                        <!-- Right: Phone Mockup -->
                        <div class="phone-mockup-wrap">
                            <div class="phone-mockup-screen">
                                <div class="phone-header-notch"></div>
                                
                                <div class="chat-bubble bubble-sent chat-b1">Hôm nay thế nào rồi cậu?</div>
                                <div class="chat-bubble bubble-sent chat-b2">Sao lâu quá không thấy rep ta... 🥺</div>
                                <div class="chat-bubble bubble-received chat-b3">Ê nè! Tớ vừa định nhắn cho cậu luôn á! 😳</div>
                            </div>
                        </div>

                        <!-- SVG Lightning path connecting them -->
                        <svg class="lightning-path-svg">
                            <path class="lightning-bolt" d="M 230,190 L 320,150 L 380,240 L 490,210" />
                        </svg>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo6_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo6-2-container">
                        <div class="matrix-container">
                            <div class="matrix-grid">
                                ${makeGridHTML()}
                            </div>
                            
                            <div class="matrix-legend">
                                <div class="legend-item"><span class="legend-dot lg-ignored"></span> 99 lần nghĩ nhưng im lặng (Bị lãng quên)</div>
                                <div class="legend-item"><span class="legend-dot lg-coincidence"></span> 1 lần nhắn trùng hợp (Nhớ mãi)</div>
                            </div>
                            
                            <div class="scan-banner">ĐỊNH KIẾN XÁC NHẬN! 🧠</div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo6_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo6-3-container">
                        <div class="stats-dashboard">
                            <!-- Card 1: Thought frequency -->
                            <div class="stat-card total-thought-card">
                                <div class="stat-icon">💭</div>
                                <span class="stat-title">Số lần nghĩ về crush / năm</span>
                                <span class="stat-number thought-counter-val">0</span>
                                <span class="stat-tag">Tần suất cực lớn</span>
                            </div>

                            <!-- Card 2: Successful match rate -->
                            <div class="stat-card match-card">
                                <div class="stat-icon">⚡</div>
                                <span class="stat-title">Số lần trùng hợp tin nhắn</span>
                                <span class="stat-number match-counter-val">0</span>
                                <span class="stat-tag match-tag-lbl">Khớp ngẫu nhiên: 0.07%</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo6_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo6-4-container">
                        <div class="memory-box-row">
                            <!-- Box 1: Storage / Keep -->
                            <div class="memory-box-item box-keep">
                                <div class="box-title-container">
                                    <h3>Hộp lưu trữ</h3>
                                    <p>Trùng hợp = Kỳ tích!</p>
                                </div>
                                
                                <div class="box-glowing-container">🌟</div>
                                
                                <span class="box-status-msg keep-msg">GHI NHỚ VĨNH VIỄN</span>
                            </div>

                            <!-- Box 2: Trash / Delete -->
                            <div class="memory-box-item box-trash">
                                <div class="box-title-container">
                                    <h3>Thùng rác não bộ</h3>
                                    <p>Nghĩ nhưng im lặng = Rác</p>
                                </div>
                                
                                <div class="box-glowing-container">🗑️</div>
                                
                                <!-- Pre-spawned falling particle elements -->
                                ${makeFallingParticlesHTML()}
                                
                                <span class="box-status-msg trash-msg">XÓA NGAY LẬP TỨC</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo6_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo6-5-container">
                        <!-- Standard CTA Outro -->
                        <div style="text-align: center; margin-top: 100px;">
                            <div style="font-size: 80px; margin-bottom: 20px; animation: bounce 2s infinite alternate;">🧠</div>
                            <h2 style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 10px;">BẠN ĐÃ HIỂU NÃO BỘ CHƯA?</h2>
                            <p style="font-size: 18px; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6;">
                                Mọi thần giao cách cảm chỉ là thuật toán thống kê của bộ não. Đừng để định kiến xác nhận đánh lừa bạn!
                            </p>
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
        if (slideId === 'slide_memo6_1') {
            const b1 = canvas.querySelector('.chat-b1');
            const b2 = canvas.querySelector('.chat-b2');
            const b3 = canvas.querySelector('.chat-b3');
            const phone = canvas.querySelector('.phone-mockup-wrap');
            const bolt = canvas.querySelector('.lightning-bolt');
            const cloud = canvas.querySelector('.thought-cloud-bg');

            // Thought cloud scale animation
            if (cloud) {
                const scale = 1.0 + Math.sin(progress * 15) * 0.05;
                cloud.style.transform = `scale(${scale})`;
            }

            // Message bubble popping sequence
            if (b1) {
                b1.style.opacity = progress > 0.15 ? '1' : '0';
                b1.style.transform = progress > 0.15 ? 'translateY(0)' : 'translateY(20px)';
            }
            if (b2) {
                b2.style.opacity = progress > 0.35 ? '1' : '0';
                b2.style.transform = progress > 0.35 ? 'translateY(0)' : 'translateY(20px)';
            }
            if (b3) {
                b3.style.opacity = progress > 0.65 ? '1' : '0';
                b3.style.transform = progress > 0.65 ? 'translateY(0)' : 'translateY(20px)';
            }

            // Phone vibration when message arrives
            if (phone) {
                if (progress > 0.65 && progress < 0.85) {
                    phone.classList.add('vibrating');
                } else {
                    phone.classList.remove('vibrating');
                }
            }

            // Telepathy lightning bolt flash
            if (bolt) {
                if (progress > 0.72 && progress < 0.82) {
                    bolt.style.opacity = '1';
                } else {
                    bolt.style.opacity = '0';
                }
            }
        }
        else if (slideId === 'slide_memo6_2') {
            const banner = canvas.querySelector('.scan-banner');
            const coincidenceDot = canvas.querySelector('.dot-coincidence');
            const ignoredDots = canvas.querySelectorAll('.dot-ignored');

            // Grid scanning & dimming phase
            if (progress < 0.2) {
                // Dim down banner and reset dot states
                if (banner) banner.style.opacity = '0';
                if (coincidenceDot) coincidenceDot.classList.remove('glow-active');
                ignoredDots.forEach(d => {
                    d.style.opacity = '0.3';
                    d.style.transform = 'scale(1)';
                });
            } 
            else if (progress < 0.55) {
                // Scanning effect: dots pulse row by row
                const rowIndex = Math.floor((progress - 0.2) / 0.35 * 10);
                ignoredDots.forEach(d => {
                    const idx = parseInt(d.getAttribute('data-idx'));
                    const r = Math.floor(idx / 10);
                    if (r === rowIndex) {
                        d.style.opacity = '1';
                        d.style.transform = 'scale(1.2)';
                        d.style.color = '#a855f7';
                    } else {
                        d.style.opacity = '0.25';
                        d.style.transform = 'scale(1)';
                        d.style.color = '';
                    }
                });
                if (coincidenceDot) coincidenceDot.classList.remove('glow-active');
                if (banner) banner.style.opacity = '0';
            } 
            else if (progress < 0.8) {
                // Highlight only the coincidence dot, completely dim others
                ignoredDots.forEach(d => {
                    d.style.opacity = '0.05';
                    d.style.transform = 'scale(0.8)';
                    d.style.color = '';
                });
                if (coincidenceDot) {
                    coincidenceDot.classList.add('glow-active');
                }
                if (banner) banner.style.opacity = '0';
            } 
            else {
                // Coincidence is glowing and "Selection Bias" banner pops up!
                ignoredDots.forEach(d => {
                    d.style.opacity = '0.05';
                    d.style.transform = 'scale(0.8)';
                });
                if (coincidenceDot) coincidenceDot.classList.add('glow-active');
                if (banner) banner.style.opacity = '1';
            }
        }
        else if (slideId === 'slide_memo6_3') {
            const thoughtVal = canvas.querySelector('.thought-counter-val');
            const matchVal = canvas.querySelector('.match-counter-val');
            const matchTag = canvas.querySelector('.match-tag-lbl');
            const matchCard = canvas.querySelector('.match-card');

            // Counter math
            if (thoughtVal && matchVal) {
                const maxThoughts = 7200;
                const maxMatches = 5;

                const curThoughts = Math.min(maxThoughts, Math.floor(progress * 1.35 * maxThoughts));
                const curMatches = Math.min(maxMatches, Math.floor(progress * 1.35 * maxMatches));

                thoughtVal.textContent = curThoughts.toLocaleString();
                matchVal.textContent = curMatches;

                // Highlight the match card and calculate pct
                if (progress > 0.75) {
                    if (matchCard) matchCard.classList.add('card-highlight');
                    if (matchTag) {
                        matchTag.textContent = 'Khớp ngẫu nhiên: 0.07% 🔥';
                    }
                } else {
                    if (matchCard) matchCard.classList.remove('card-highlight');
                    if (matchTag) {
                        const pct = curThoughts > 0 ? ((curMatches / curThoughts) * 100).toFixed(2) : '0.00';
                        matchTag.textContent = `Tỷ lệ khớp: ${pct}%`;
                    }
                }
            }
        }
        else if (slideId === 'slide_memo6_4') {
            const keepBox = canvas.querySelector('.box-keep');
            const trashBox = canvas.querySelector('.box-trash');
            const particles = canvas.querySelectorAll('.falling-particle');

            // Phase 1 (0 to 0.45): Thoughts are falling into the trash bin (failures)
            if (progress < 0.45) {
                if (trashBox) trashBox.classList.add('activated');
                if (keepBox) keepBox.classList.remove('activated');

                // Animate falling particles deterministically
                particles.forEach((p, idx) => {
                    const startProgress = 0.05 + (idx * 0.03);
                    const duration = 0.18;
                    if (progress >= startProgress && progress < startProgress + duration) {
                        const ratio = (progress - startProgress) / duration;
                        p.style.opacity = (0.8 - ratio * 0.8).toString();
                        p.style.transform = `translateY(${ratio * 150}px) rotate(${ratio * 360}deg)`;
                    } else {
                        p.style.opacity = '0';
                    }
                });
            }
            // Phase 2 (0.45 to 0.8): Thought matching matches temple, keep box lights up
            else if (progress < 0.8) {
                if (trashBox) trashBox.classList.remove('activated');
                if (keepBox) keepBox.classList.add('activated');
                particles.forEach(p => p.style.opacity = '0');
            }
            // Phase 3 (0.8 to 1.0): Both highlight showing how the bias is formed
            else {
                if (trashBox) trashBox.classList.add('activated');
                if (keepBox) keepBox.classList.add('activated');
                particles.forEach(p => p.style.opacity = '0');
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video6',
        topic: 'Telepathy Selection Bias',
        episodeNum: 6,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 6 Plugin] Loaded: Telepathy Selection Bias ready.');
})();
