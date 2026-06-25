/**
 * Video 59: Unix Year 2038 Overflow Bug Simulation
 * Plugin containing animations for clock counting, binary register overflow,
 * and 64-bit expansion.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_y2038_1: [
            { text: 'thảm họa hệ thống', start: 1.0, end: 4.5, class: 'active-red' },
            { text: 'đến năm 2038', start: 4.5, end: 7.0, class: 'active-yellow' }
        ],
        slide_y2038_1b: [
            { text: 'tê liệt hoàn toàn', start: 1.5, end: 6.5, class: 'active-red' },
            { text: 'Chuyện gì thực sự', start: 6.5, end: 10.0, class: 'active-cyan' }
        ],
        slide_y2038_2: [
            { text: 'đếm thời gian', start: 1.5, end: 6.0, class: 'active-cyan' },
            { text: 'số giây trôi qua', start: 6.0, end: 11.5, class: 'active-cyan' },
            { text: 'Unix Epoch', start: 11.5, end: 15.5, class: 'active-gold' }
        ],
        slide_y2038_3: [
            { text: 'số nguyên 32-bit', start: 1.5, end: 6.0, class: 'active-gold' },
            { text: 'hai tỷ 147 triệu', start: 6.0, end: 11.0, class: 'active-yellow' },
            { text: 'chạm mốc giới hạn', start: 11.0, end: 14.0, class: 'active-red' }
        ],
        slide_y2038_4: [
            { text: 'ngày mười chín tháng ba', start: 1.5, end: 6.0, class: 'active-yellow' },
            { text: 'bị tràn số', start: 6.0, end: 10.5, class: 'active-red' },
            { text: 'giật lùi về', start: 10.5, end: 14.0, class: 'active-red' },
            { text: 'sập lập tức', start: 14.0, end: 17.0, class: 'active-red' }
        ],
        slide_y2038_5: [
            { text: 'nâng cấp', start: 1.5, end: 5.5, class: 'active-green' },
            { text: '64-bit', start: 5.5, end: 10.0, class: 'active-green' },
            { text: 'hai trăm chín mươi hai tỷ', start: 10.0, end: 14.5, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_y2038_1', 'slide_y2038_1b', 'slide_y2038_2', 'slide_y2038_3', 'slide_y2038_4', 'slide_y2038_5'
    ];

    function sceneWrap(inner) {
        return `<div class="v59-zoom-container"><div class="v59-scene-content">${inner}</div></div>`;
    }

    // Helper: Convert timestamp to date/time format
    function formatUnixTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const yyyy = date.getUTCFullYear();
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(date.getUTCDate()).padStart(2, '0');
        const hh = String(date.getUTCHours()).padStart(2, '0');
        const min = String(date.getUTCMinutes()).padStart(2, '0');
        const ss = String(date.getUTCSeconds()).padStart(2, '0');
        return {
            dateStr: `${yyyy}-${mm}-${dd}`,
            timeStr: `${hh}<span class="v59-time-colon">:</span>${min}<span class="v59-time-colon">:</span>${ss} UTC`
        };
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        let bitCells = '';
        // Render 64 bit cells (b63 down to b0)
        for (let i = 63; i >= 0; i--) {
            const isUpper = i >= 32;
            const isSign = i === 31 || i === 63;
            const cellClass = `v59-bit-cell${isUpper ? ' cell-upper' : ''}${isSign ? ' sign' : ''}`;
            const label = isSign ? 'sign' : `b${i}`;
            bitCells += `
                <div class="${cellClass}" id="bit-${i}">
                    <span class="v59-bit-num">0</span>
                    <span class="v59-bit-lbl">${label}</span>
                </div>
            `;
        }

        canvas.innerHTML = sceneWrap(`
            <div class="v59-scene-row" id="s-scene-row">
                <!-- Centered Radar Ripple Rings for Intro Hook -->
                <div class="v59-intro-ripple" id="s-ripple-1"></div>
                <div class="v59-intro-ripple" id="s-ripple-2"></div>
                <div class="v59-intro-ripple" id="s-ripple-3"></div>

                <!-- Interactive Floating Particle Layer -->
                <div class="v59-particle-layer" id="s-particle-layer" style="position:absolute; inset:0; pointer-events:none; z-index:15; overflow:hidden;"></div>

                <!-- CLOCK STATUS CARD (Left) -->
                <div class="v59-card v59-clock-card" id="s-clock-card">
                    <div class="v59-card-hdr">
                        <span class="v59-card-lbl">TIME MONITOR</span>
                        <span class="v59-status-badge stable" id="s-clock-status">STABLE</span>
                    </div>

                    <div class="v59-clock-display">
                        <div class="v59-device-icon-container">
                            <div class="v59-device-pulse active" id="s-clock-pulse"></div>
                            <svg id="s-clock-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--v59-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <span class="v59-date-str" id="s-date-str">2026-06-25</span>
                        <span class="v59-time-str" id="s-time-str">12:34:56 UTC</span>
                    </div>

                    <div class="v59-clock-desc" id="s-clock-desc">
                        Hệ thống hoạt động ổn định
                    </div>
                </div>

                <!-- BINARY REGISTER CARD (Right) -->
                <div class="v59-card v59-register-card" id="s-register-card">
                    <div class="v59-card-hdr">
                        <span class="v59-card-lbl">REGISTER STATUS</span>
                        <span class="v59-status-badge stable" id="s-register-status">32-BIT MODE</span>
                    </div>

                    <div class="v59-register-container">
                        <div class="v59-bit-grid mode-32" id="s-bit-grid">
                            ${bitCells}
                        </div>
                    </div>

                    <div class="v59-register-metrics">
                        <div class="v59-metric-row">
                            <span class="v59-metric-lbl">Epoch Counter</span>
                            <span class="v59-metric-val" id="s-metric-counter">0</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const sceneRow = canvas.querySelector('#s-scene-row');
        const clockCard = canvas.querySelector('#s-clock-card');
        const registerCard = canvas.querySelector('#s-register-card');
        const clockStatus = canvas.querySelector('#s-clock-status');
        const registerStatus = canvas.querySelector('#s-register-status');
        const clockPulse = canvas.querySelector('#s-clock-pulse');
        const clockIcon = canvas.querySelector('#s-clock-icon');
        const dateStr = canvas.querySelector('#s-date-str');
        const timeStr = canvas.querySelector('#s-time-str');
        const clockDesc = canvas.querySelector('#s-clock-desc');
        const bitGrid = canvas.querySelector('#s-bit-grid');
        const metricCounter = canvas.querySelector('#s-metric-counter');
        const particleLayer = canvas.querySelector('#s-particle-layer');

        const upperCells = canvas.querySelectorAll('.cell-upper');

        // Track progress delta to detect playback state
        const lastProgress = parseFloat(canvas.getAttribute('data-last-progress') || '0');
        const progressDiff = progress - lastProgress;
        canvas.setAttribute('data-last-progress', progress);

        // Initialize particles list
        canvas.v59Particles = canvas.v59Particles || [];

        // Clear particles if timeline seeks back or skips
        if (progressDiff < 0 || Math.abs(progressDiff) > 0.1) {
            canvas.v59Particles = [];
            if (particleLayer) particleLayer.innerHTML = '';
        }

        // Reset functions
        const resetStates = () => {
            if (sceneRow) sceneRow.className = 'v59-scene-row';
            if (clockCard) clockCard.className = 'v59-card v59-clock-card';
            if (registerCard) registerCard.className = 'v59-card v59-register-card';

            if (clockStatus) {
                clockStatus.className = 'v59-status-badge stable';
                clockStatus.textContent = 'STABLE';
            }
            if (registerStatus) {
                registerStatus.className = 'v59-status-badge stable';
                registerStatus.textContent = '32-BIT MODE';
            }
            if (clockPulse) {
                clockPulse.className = 'v59-device-pulse active';
                clockPulse.style.borderColor = 'var(--v59-green)';
            }
            if (clockIcon) {
                clockIcon.setAttribute('stroke', 'var(--v59-green)');
            }
            if (dateStr) dateStr.className = 'v59-date-str';
            if (timeStr) timeStr.className = 'v59-time-str';
            if (clockDesc) {
                clockDesc.textContent = 'Hệ thống hoạt động ổn định';
                clockDesc.style.color = 'var(--v59-yellow)';
                clockDesc.style.background = 'rgba(245, 158, 11, 0.05)';
                clockDesc.style.borderColor = 'rgba(245, 158, 11, 0.1)';
            }
            if (bitGrid) {
                bitGrid.className = 'v59-bit-grid mode-32';
            }
            if (metricCounter) {
                metricCounter.className = 'v59-metric-val';
            }

            // Hide upper cells
            upperCells.forEach(cell => {
                cell.style.display = 'none';
                cell.style.transitionDelay = '0ms';
            });

            // Reset all 64 bits to 0
            for (let i = 0; i < 64; i++) {
                const cell = canvas.querySelector(`#bit-${i}`);
                if (cell) {
                    cell.classList.remove('active', 'crashed', 'pop');
                    const num = cell.querySelector('.v59-bit-num');
                    if (num) num.textContent = '0';
                }
            }

            // Clear particles
            canvas.v59Particles = [];
            if (particleLayer) particleLayer.innerHTML = '';
        };

        resetStates();

        // Particle update routine (optimized with translate3d)
        const updateParticles = () => {
            if (!particleLayer) return;
            canvas.v59Particles = canvas.v59Particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.ay; // gravity/buoyancy
                p.life -= 1;

                if (p.life <= 0) {
                    if (p.el) p.el.remove();
                    return false;
                }

                if (p.el) {
                    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
                    p.el.style.opacity = p.life / p.maxLife;
                }
                return true;
            });
        };

        // Helper to update binary representation in register grid (optimized: no forced reflows)
        const updateRegisterBits = (val, bitWidth = 32) => {
            if (bitWidth === 32) {
                let binStr = '';
                if (val >= 0) {
                    binStr = val.toString(2).padStart(32, '0');
                } else {
                    const positiveBin = Math.abs(val + 1).toString(2).padStart(32, '0');
                    for (let c of positiveBin) {
                        binStr += c === '0' ? '1' : '0';
                    }
                }

                // Update b0 - b31
                for (let i = 0; i < 32; i++) {
                    const cell = canvas.querySelector(`#bit-${i}`);
                    const valChar = binStr[31 - i];
                    if (cell) {
                        const num = cell.querySelector('.v59-bit-num');
                        if (num) {
                            num.textContent = valChar;
                        }
                        if (valChar === '1') {
                            cell.classList.add('active');
                        } else {
                            cell.classList.remove('active');
                        }
                    }
                }
            } else if (bitWidth === 64) {
                const bigVal = BigInt(val);
                const binStr = bigVal.toString(2).padStart(64, '0');

                // Update b0 - b63
                for (let i = 0; i < 64; i++) {
                    const cell = canvas.querySelector(`#bit-${i}`);
                    const valChar = binStr[63 - i];
                    if (cell) {
                        const num = cell.querySelector('.v59-bit-num');
                        if (num) {
                            num.textContent = valChar;
                        }
                        if (valChar === '1') {
                            cell.classList.add('active');
                        } else {
                            cell.classList.remove('active');
                        }
                    }
                }
            }
        };

        // ── SLIDE TIMELINE CONFIGURATIONS ───────────────────────────────────────

        if (slideId === 'slide_y2038_1') {
            if (sceneRow) sceneRow.classList.add('intro-only');
            // Intro: Static display of the exact crash time (2038-03-19 03:14:07 UTC)
            const targetEpoch = 2147483647;
            const formatted = formatUnixTime(targetEpoch);

            if (dateStr) dateStr.textContent = formatted.dateStr;
            if (timeStr) timeStr.innerHTML = formatted.timeStr;
            if (metricCounter) {
                metricCounter.textContent = targetEpoch.toLocaleString();
                metricCounter.className = 'v59-metric-val yellow';
            }

            if (clockStatus) {
                clockStatus.className = 'v59-status-badge warning';
                clockStatus.textContent = 'LIMIT REACHED';
            }
            if (registerStatus) {
                registerStatus.className = 'v59-status-badge warning';
                registerStatus.textContent = '32-BIT LIMIT';
            }
            if (clockDesc) {
                clockDesc.textContent = 'Mốc thời hạn cực đại của hệ thống';
                clockDesc.style.color = 'var(--v59-yellow)';
                clockDesc.style.background = 'rgba(245, 158, 11, 0.05)';
                clockDesc.style.borderColor = 'rgba(245, 158, 11, 0.1)';
            }
            if (clockPulse) {
                clockPulse.style.borderColor = 'var(--v59-yellow)';
            }
            if (clockIcon) {
                clockIcon.setAttribute('stroke', 'var(--v59-yellow)');
            }

            updateRegisterBits(targetEpoch, 32);
        }
        else if (slideId === 'slide_y2038_1b') {
            // Slide 1b: Normal running state (June 2026) side-by-side with 32-bit register
            const currentEpoch = 1773273021 + Math.round(progress * 10);
            const formatted = formatUnixTime(currentEpoch);

            if (dateStr) dateStr.textContent = formatted.dateStr;
            if (timeStr) timeStr.innerHTML = formatted.timeStr;
            if (metricCounter) {
                metricCounter.textContent = currentEpoch.toLocaleString();
                metricCounter.className = 'v59-metric-val green';
            }

            updateRegisterBits(currentEpoch, 32);
        }
        else if (slideId === 'slide_y2038_2') {
            // Slide 2: Count up from Unix Epoch (1970) to 2010
            const targetVal = Math.round(progress * 1262304000);
            const formatted = formatUnixTime(targetVal);

            if (dateStr) dateStr.textContent = formatted.dateStr;
            if (timeStr) timeStr.innerHTML = formatted.timeStr;
            if (metricCounter) {
                metricCounter.textContent = targetVal.toLocaleString();
            }

            updateRegisterBits(targetVal, 32);
            
            if (clockDesc) clockDesc.textContent = 'Thời gian đếm giây tăng tiến liên tục';

            // Particle Emitter: Send "seconds" from Clock to registers (reduced emission for performance)
            if (progressDiff > 0 && Math.random() < 0.20 && particleLayer) {
                const pEl = document.createElement('div');
                pEl.className = 'v59-particle';
                pEl.style.transform = `translate3d(135px, 190px, 0)`;
                particleLayer.appendChild(pEl);

                canvas.v59Particles.push({
                    x: 135,
                    y: 190,
                    vx: 6 + Math.random() * 2,
                    vy: -4 - Math.random() * 4,
                    ay: 0.35,
                    life: 45,
                    maxLife: 45,
                    el: pEl
                });
            }
        }
        else if (slideId === 'slide_y2038_3') {
            const currentEpoch = 2147483500 + Math.round(progress * 140);
            const formatted = formatUnixTime(currentEpoch);

            if (dateStr) dateStr.textContent = formatted.dateStr;
            if (timeStr) timeStr.innerHTML = formatted.timeStr;
            if (metricCounter) {
                metricCounter.textContent = currentEpoch.toLocaleString();
                metricCounter.classList.add('yellow');
            }

            if (clockStatus) {
                clockStatus.className = 'v59-status-badge warning';
                clockStatus.textContent = 'WARNING';
            }
            if (registerStatus) {
                registerStatus.className = 'v59-status-badge warning';
                registerStatus.textContent = 'LIMIT REACHING';
            }
            if (clockDesc) {
                clockDesc.textContent = 'CẬN CỰC HẠN SỐ NGUYÊN 32-BIT';
                clockDesc.style.color = 'var(--v59-yellow)';
            }
            if (clockPulse) {
                clockPulse.style.borderColor = 'var(--v59-yellow)';
            }
            if (clockIcon) {
                clockIcon.setAttribute('stroke', 'var(--v59-yellow)');
            }

            updateRegisterBits(currentEpoch, 32);
        }
        else if (slideId === 'slide_y2038_4') {
            // Slide 4: Integer Overflow Crash!
            if (progress <= 0.5) {
                const t = progress / 0.5;
                const currentEpoch = 2147483640 + Math.round(t * 7); 
                const formatted = formatUnixTime(currentEpoch);

                if (dateStr) dateStr.textContent = formatted.dateStr;
                if (timeStr) timeStr.innerHTML = formatted.timeStr;
                if (metricCounter) {
                    metricCounter.textContent = currentEpoch.toLocaleString();
                    metricCounter.classList.add('yellow');
                }

                if (clockStatus) {
                    clockStatus.className = 'v59-status-badge warning';
                    clockStatus.textContent = 'LIMIT MAX';
                }
                if (registerStatus) {
                    registerStatus.className = 'v59-status-badge warning';
                    registerStatus.textContent = '32-BIT MAX';
                }

                updateRegisterBits(currentEpoch, 32);
            }
            else {
                // OVERFLOW CRASH STAGE!
                const crashedEpoch = -2147483648;
                const formatted = formatUnixTime(crashedEpoch);

                // Shake & Glitch last for exactly 1 second (progress 0.50 to 0.56)
                const isShaking = progress > 0.5 && progress <= 0.56;

                if (dateStr) {
                    dateStr.textContent = formatted.dateStr;
                    dateStr.classList.add('crashed');
                    if (!isShaking) {
                        dateStr.style.animation = 'none'; // Stop glitching text
                    }
                }
                if (timeStr) {
                    timeStr.innerHTML = formatted.timeStr;
                    timeStr.classList.add('crashed');
                    if (!isShaking) {
                        timeStr.style.animation = 'none'; // Stop glitching text
                    }
                }
                if (metricCounter) {
                    metricCounter.textContent = '-2,147,483,648 (OVERFLOW)';
                    metricCounter.className = 'v59-metric-val red';
                }

                // Shake and glow red (only during the shake window)
                if (isShaking) {
                    if (sceneRow) sceneRow.classList.add('shake-active');
                    if (clockCard) clockCard.classList.add('shake-red');
                    if (registerCard) registerCard.classList.add('shake-red');
                } else {
                    if (sceneRow) sceneRow.classList.remove('shake-active');
                    // Remove violent shaking border class but keep stable warning state
                    if (clockCard) {
                        clockCard.classList.remove('shake-red');
                        clockCard.style.borderColor = 'var(--v59-red)';
                        clockCard.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.15)';
                    }
                    if (registerCard) {
                        registerCard.classList.remove('shake-red');
                        registerCard.style.borderColor = 'var(--v59-red)';
                        registerCard.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.15)';
                    }
                }

                if (clockStatus) {
                    clockStatus.className = 'v59-status-badge error';
                    clockStatus.textContent = 'CRASHED';
                }
                if (registerStatus) {
                    registerStatus.className = 'v59-status-badge error';
                    registerStatus.textContent = 'SIGN BIT OVERFLOW';
                }
                if (clockDesc) {
                    clockDesc.textContent = 'HỆ THỐNG TÊ LIỆT (NGƯỢC VỀ 1901)';
                    clockDesc.style.color = 'var(--v59-red)';
                    clockDesc.style.background = 'rgba(239, 68, 68, 0.05)';
                    clockDesc.style.borderColor = 'rgba(239, 68, 68, 0.1)';
                }
                if (clockPulse) {
                    clockPulse.className = 'v59-device-pulse'; // stop pulsing
                }
                if (clockIcon) {
                    clockIcon.setAttribute('stroke', 'var(--v59-red)');
                }

                updateRegisterBits(crashedEpoch, 32);

                const signCell = canvas.querySelector('#bit-31');
                if (signCell) signCell.classList.add('crashed');

                // Particle Emitter: Red smoke only emits during the 1s shake window
                if (isShaking && progressDiff > 0 && Math.random() < 0.15 && particleLayer) {
                    const pEl = document.createElement('div');
                    pEl.className = 'v59-particle red-smoke';
                    pEl.style.transform = `translate3d(345px, 125px, 0)`;
                    particleLayer.appendChild(pEl);

                    canvas.v59Particles.push({
                        x: 345 + (Math.random() * 10 - 5),
                        y: 125 + (Math.random() * 6 - 3),
                        vx: -1.0 + Math.random() * 2.0,
                        vy: -1.2 - Math.random() * 1.8,
                        ay: -0.04,
                        life: 35,
                        maxLife: 35,
                        el: pEl
                    });
                }
            }
        }
        else if (slideId === 'slide_y2038_5') {
            // Slide 5: Upgraded to 64-bit, stable tick past the limit
            if (bitGrid) {
                bitGrid.className = 'v59-bit-grid mode-64';
            }

            // Unhide and stagger upper cells
            upperCells.forEach((cell, idx) => {
                cell.style.display = 'flex';
                cell.style.transitionDelay = `${idx * 8}ms`;
            });

            const currentEpoch = 2147483648 + Math.round(progress * 22);
            const formatted = formatUnixTime(currentEpoch);

            if (dateStr) dateStr.textContent = formatted.dateStr;
            if (timeStr) timeStr.innerHTML = formatted.timeStr;
            if (metricCounter) {
                metricCounter.textContent = currentEpoch.toLocaleString();
                metricCounter.classList.add('green');
            }

            if (clockCard) clockCard.classList.add('glow-green');
            if (registerCard) registerCard.classList.add('glow-green');

            if (clockStatus) {
                clockStatus.className = 'v59-status-badge stable';
                clockStatus.textContent = '64-BIT OK';
            }
            if (registerStatus) {
                registerStatus.className = 'v59-status-badge stable';
                registerStatus.textContent = '64-BIT MODE';
            }
            if (clockDesc) {
                clockDesc.textContent = 'HỆ THỐNG AN TOÀN TRONG 292 TỶ NĂM';
                clockDesc.style.color = 'var(--v59-green)';
                clockDesc.style.background = 'rgba(16, 185, 129, 0.05)';
                clockDesc.style.borderColor = 'rgba(16, 185, 129, 0.1)';
            }
            if (clockPulse) {
                clockPulse.style.borderColor = 'var(--v59-green)';
            }
            if (clockIcon) {
                clockIcon.setAttribute('stroke', 'var(--v59-green)');
            }

            updateRegisterBits(currentEpoch, 64);
        }

        // Run particle animation frame updates
        updateParticles();
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video59',
        topic: 'Unix Year 2038 Overflow',
        episodeNum: 59,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video59 Plugin] Loaded: Unix Year 2038 Overflow Bug Simulation.');
})();
