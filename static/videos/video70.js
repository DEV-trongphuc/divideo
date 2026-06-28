/**
 * Video 70: Therac-25 Radiation Race Condition
 * Custom slides detailing the 1985 medical software catastrophe.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_therac_intro: [
            { text: 'lỗi Race Condition', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'gấp 100 lần mức an toàn', start: 6.5, end: 9.5, class: 'active-yellow' }
        ],
        slide_therac_modes: [
            { text: 'đĩa quay vật lý', start: 2.5, end: 5.5, class: 'active-cyan' },
            { text: 'màng chắn kim loại nặng', start: 7.5, end: 11.0, class: 'active-yellow' }
        ],
        slide_therac_race: [
            { text: 'gõ phím nhanh', start: 2.5, end: 5.5, class: 'active-cyan' },
            { text: 'chưa đầy 8 giây', start: 7.0, end: 10.5, class: 'active-yellow' }
        ],
        slide_therac_glitch: [
            { text: 'tranh chấp tài nguyên', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'không kịp xoay màng chắn', start: 7.5, end: 11.0, class: 'active-cyan' }
        ],
        slide_therac_blast: [
            { text: 'phóng ra', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'phóng xạ nguyên bản hủy diệt', start: 7.0, end: 10.5, class: 'active-red' }
        ],
        slide_therac_overflow: [
            { text: 'biến đếm 1-byte', start: 3.5, end: 6.5, class: 'active-cyan' },
            { text: 'tràn số trở về 0', start: 7.5, end: 11.0, class: 'active-red' }
        ]
    };

    const customSlideIds = [
        'slide_therac_intro', 'slide_therac_modes', 'slide_therac_race', 
        'slide_therac_glitch', 'slide_therac_blast', 'slide_therac_overflow'
    ];

    function sceneWrap(inner) {
        return `<div class="v70-zoom-container"><div class="v70-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: General Overdose warning & Laser blast (Industrial Console Design)
        if (slideId === 'slide_therac_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <div class="v70-blast-board" id="v70-intro-board">
                        <!-- Flashing emergency room light glow -->
                        <div class="v70-room-alarm-glow" id="v70-intro-room-glow"></div>
                        
                        <!-- Top: Dosimeter Stats panel -->
                        <div class="v70-console-readout">
                            <div class="v70-readout-row">
                                <span>BEAM STATE:</span>
                                <span style="color:#60a5fa; font-weight:bold;" id="v70-intro-beam-state">STANDBY</span>
                            </div>
                            <div class="v70-readout-row">
                                <span>METAL TARGET SHIELD:</span>
                                <span style="color:#10b981; font-weight:bold;" id="v70-intro-shield-state">ALIGNED (OK)</span>
                            </div>
                        </div>
                        
                        <!-- Center: Spinning SVG Radioactive Trefoil Symbol -->
                        <div class="v70-hazard-dial-container">
                            <svg class="v70-hazard-svg" id="v70-intro-hazard-logo" viewBox="0 0 100 100">
                                <!-- Center circle -->
                                <circle cx="50" cy="50" r="10" fill="currentColor" />
                                <!-- 3 blades of the radioactive trefoil -->
                                <path d="M 50 50 L 50 18 A 32 32 0 0 1 77.7 34 Z" fill="currentColor" />
                                <path d="M 50 50 L 22.3 66 A 32 32 0 0 1 22.3 34 Z" fill="currentColor" transform="rotate(120, 50, 50)" />
                                <path d="M 50 50 L 77.7 66 A 32 32 0 0 1 50 82 Z" fill="currentColor" transform="rotate(240, 50, 50)" />
                            </svg>
                            <div class="v70-hazard-ring" id="v70-intro-ring-1"></div>
                            <div class="v70-hazard-ring" id="v70-intro-ring-2"></div>
                        </div>
                        
                        <!-- Bottom: Dosimeter Level Gauge -->
                        <div class="v70-dosimeter-container">
                            <div class="v70-dosimeter-labels">
                                <span>0 RADS</span>
                                <span>5k</span>
                                <span>10k</span>
                                <span>15k</span>
                                <span>20k</span>
                                <span style="color:#ef4444; font-weight:bold;">25,000 RADS</span>
                            </div>
                            <div class="v70-dosimeter-track">
                                <div class="v70-dosimeter-fill" id="v70-intro-gauge-fill"></div>
                            </div>
                        </div>
                        
                        <!-- Floating warning overlay -->
                        <div class="v70-overdose-overlay" id="v70-intro-overdose">
                            <div class="v70-warning-stripes"></div>
                            <div class="v70-warning-title">
                                <i data-lucide="alert-octagon" style="width:16px; height:16px; margin-right:6px; color:#ef4444;"></i> CRITICAL WARNING
                            </div>
                            <div class="v70-warning-val" id="v70-intro-rads">25,000 RADS</div>
                            <div class="v70-warning-sub">100X MAXIMUM RADIATION SAFETY LIMIT</div>
                            <div class="v70-warning-code">ERR_RACE_CON_MOTOR_STALL</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 2: Turntable Mechanism Simulation
        else if (slideId === 'slide_therac_modes') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <div class="v70-turntable-container">
                        <!-- Left: Rotating Turntable Plate -->
                        <div class="v70-turntable-plate" id="v70-modes-plate">
                            <div class="v70-turntable-sector spreader" style="transform: translateY(-80px);">
                                <span>ELECTRON</span>
                                <span>SPREADER</span>
                            </div>
                            <div class="v70-turntable-sector target" style="transform: translateY(80px);">
                                <span>X-RAY</span>
                                <span>TARGET</span>
                            </div>
                        </div>
                        
                        <!-- Right: Details board -->
                        <div style="flex:1; display:flex; flex-direction:column; gap:20px; font-family:monospace; color:#fff;">
                            <div style="font-size:24px; font-weight:900; letter-spacing:1px; color:#94a3b8; border-bottom:2px solid rgba(255,255,255,0.08); padding-bottom:12px;">
                                TURNTABLE STATUS
                            </div>
                            <div style="font-size:26px; font-weight:bold; color:var(--v70-primary); text-shadow:0 0 10px var(--v70-primary-glow);" id="v70-modes-status">
                                ACTIVE MODE: ELECTRON
                            </div>
                            <div style="display:flex; flex-direction:column; gap:15px; font-size:19px; line-height:1.4;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <span style="color:var(--v70-primary); font-size:26px;">🟢</span>
                                    <span><strong>ELECTRON:</strong> NĂNG LƯỢNG THẤP (Không màng chắn)</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <span style="color:#eab308; font-size:26px;">🟡</span>
                                    <span><strong>X-RAY:</strong> NĂNG LƯỢNG CAO (Cần màng chắn)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 3: Operator console keystrokes
        else if (slideId === 'slide_therac_race') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <div class="v70-terminal-window">
                        <div class="v70-terminal-header">
                            <span style="font-family:monospace; font-size:13px; color:#64748b;">THERAC-25 OPERATOR CONSOLE</span>
                        </div>
                        <div class="v70-terminal-body">
                            <div>> PATIENT NAME: JOHN DOE</div>
                            <div>> ENTER BEAM TYPE: <span id="v70-terminal-input">X</span><span class="v70-cursor"></span></div>
                            <div style="margin-top:20px; font-size:15px; color:#94a3b8;" id="v70-terminal-time-lbl">
                                TIME REMAINING TO CONFIGURE MOTOR: <strong id="v70-terminal-sec">8.0s</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Multi-thread resource clash
        else if (slideId === 'slide_therac_glitch') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <div class="v70-thread-panel">
                        <!-- Thread 1: User Interface -->
                        <div class="v70-thread-row">
                            <div class="v70-thread-hdr">
                                <span>THREAD 1: USER INTERFACE COMMANDS</span>
                                <span style="color:#60a5fa;" id="v70-thread-ui-status">READY</span>
                            </div>
                            <div class="v70-thread-bar-outer">
                                <div class="v70-thread-bar-inner ui" id="v70-thread-ui-bar"></div>
                            </div>
                        </div>
                        
                        <!-- Thread 2: Turntable Motor -->
                        <div class="v70-thread-row">
                            <div class="v70-thread-hdr">
                                <span>THREAD 2: HARDWARE TURNTABLE ALIGNMENT</span>
                                <span style="color:#fbbf24;" id="v70-thread-hw-status">IN PROGRESS...</span>
                            </div>
                            <div class="v70-thread-bar-outer">
                                <div class="v70-clash-marker" id="v70-clash-mark"></div>
                                <div class="v70-thread-bar-inner hardware" id="v70-thread-hw-bar"></div>
                            </div>
                        </div>
                        
                        <div style="font-family:monospace; font-size:14px; text-align:center; color:#ef4444; opacity:0; font-weight:bold;" id="v70-clash-warning">
                            ⚠️ RACE CONDITION: HARDWARE WAS NOT SYNCHRONIZED BEFORE FAILED BEAM TRIGGERS!
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 5: Raw radiation blast on stuck turntable (Industrial Console Design)
        else if (slideId === 'slide_therac_blast') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <div class="v70-blast-board" id="v70-blast-board-item">
                        <!-- Flashing emergency room light glow -->
                        <div class="v70-room-alarm-glow" id="v70-blast-room-glow"></div>
                        
                        <!-- Top: Dosimeter Stats panel -->
                        <div class="v70-console-readout" style="border-color:#ef4444; background:#1e0811;">
                            <div class="v70-readout-row">
                                <span style="color:#ef4444; font-weight:bold;">BEAM STATE:</span>
                                <span style="color:#ec4899; font-weight:bold; text-shadow:0 0 10px var(--v70-beam-glow);">RAW UNFILTERED ELECTRON DISCHARGE</span>
                            </div>
                            <div class="v70-readout-row">
                                <span>TARGET INTERLOCK:</span>
                                <span style="color:#ef4444; font-weight:bold; animation: v70-glitch-shake 0.15s infinite;">BYPASSED (MOTOR FAILURE)</span>
                            </div>
                        </div>
                        
                        <!-- Center: Spinning SVG Radioactive Trefoil Symbol -->
                        <div class="v70-hazard-dial-container">
                            <svg class="v70-hazard-svg warning-active" id="v70-blast-hazard-logo" viewBox="0 0 100 100">
                                <!-- Center circle -->
                                <circle cx="50" cy="50" r="10" fill="currentColor" />
                                <!-- 3 blades of the radioactive trefoil -->
                                <path d="M 50 50 L 50 18 A 32 32 0 0 1 77.7 34 Z" fill="currentColor" />
                                <path d="M 50 50 L 22.3 66 A 32 32 0 0 1 22.3 34 Z" fill="currentColor" transform="rotate(120, 50, 50)" />
                                <path d="M 50 50 L 77.7 66 A 32 32 0 0 1 50 82 Z" fill="currentColor" transform="rotate(240, 50, 50)" />
                            </svg>
                            <div class="v70-hazard-ring warning-active" id="v70-blast-ring-1"></div>
                            <div class="v70-hazard-ring warning-active" id="v70-blast-ring-2"></div>
                        </div>
                        
                        <!-- Bottom: Dosimeter Level Gauge -->
                        <div class="v70-dosimeter-container">
                            <div class="v70-dosimeter-labels">
                                <span>0 RADS</span>
                                <span>5k</span>
                                <span>10k</span>
                                <span>15k</span>
                                <span>20k</span>
                                <span style="color:#ef4444; font-weight:bold; animation: v70-glitch-shake 0.1s infinite;">25,000 RADS</span>
                            </div>
                            <div class="v70-dosimeter-track" style="border-color:#ef4444;">
                                <div class="v70-dosimeter-fill" id="v70-blast-gauge-fill" style="width:100%; box-shadow:0 0 20px #ef4444;"></div>
                            </div>
                        </div>
                        
                        <!-- Floating warning overlay -->
                        <div class="v70-overdose-overlay" id="v70-blast-overdose" style="display:flex; opacity:1;">
                            <div class="v70-warning-stripes"></div>
                            <div class="v70-warning-title">
                                <i data-lucide="alert-octagon" style="width:16px; height:16px; margin-right:6px; color:#ef4444;"></i> CRITICAL FAULT
                            </div>
                            <div class="v70-warning-val" style="color:#fca5a5;">25,000 RADS</div>
                            <div class="v70-warning-sub">UNFILTERED ENERGY IMPACT OVERDOSE</div>
                            <div class="v70-warning-code">ERR_SYSTEM_ALIGNMENT_FAILURE</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: 1-Byte coincidence register overflow
        else if (slideId === 'slide_therac_overflow') {
            canvas.innerHTML = sceneWrap(`
                <div class="v70-scene-row">
                    <!-- Title outside, at the top -->
                    <div style="font-family:monospace; font-size:20px; color:#94a3b8; letter-spacing:2px; font-weight:bold; margin-bottom:20px; text-shadow: 0 0 10px rgba(148,163,184,0.15);">
                        1-BYTE COINCIDENCE REGISTER
                    </div>
                    
                    <!-- Circular Dial Container containing only the number -->
                    <div class="v70-overflow-board" style="position:relative; width:320px; height:320px; display:flex; justify-content:center; align-items:center;">
                        <!-- SVG Hologram circle dial -->
                        <svg class="v70-hologram-circle-svg">
                            <circle class="v70-holo-ring-bg" cx="160" cy="160" r="140" />
                            <circle class="v70-holo-ring-active" id="v70-holo-ring" cx="160" cy="160" r="140" />
                        </svg>
                        
                        <div class="v70-register-number" id="v70-overflow-reg" style="position:relative; z-index:2; margin:0; line-height:1;">000</div>
                    </div>
                    
                    <!-- Status message outside, at the bottom -->
                    <div style="font-family:monospace; font-size:18px; color:#10b981; font-weight:bold; margin-top:25px; min-height:40px; text-align:center; line-height:1.4;" id="v70-overflow-status">
                        CHECKING HARDWARE STATUS...
                    </div>
                </div>
            `);
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── FRAME UPDATE ANIMATIONS ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v70-scene-row');
        if (!row) return;

        // Slide 1: General Overdose warning, spin radioactive symbol, increase dosimeter fill
        if (slideId === 'slide_therac_intro') {
            const board = row.querySelector('#v70-intro-board');
            const roomGlow = row.querySelector('#v70-intro-room-glow');
            const logo = row.querySelector('#v70-intro-hazard-logo');
            const ring1 = row.querySelector('#v70-intro-ring-1');
            const ring2 = row.querySelector('#v70-intro-ring-2');
            const gaugeFill = row.querySelector('#v70-intro-gauge-fill');
            const beamState = row.querySelector('#v70-intro-beam-state');
            const shieldState = row.querySelector('#v70-intro-shield-state');
            const overdose = row.querySelector('#v70-intro-overdose');
            
            if (progress < 0.25) {
                // Standby normal state
                const slowRot = progress * 90;
                if (logo) {
                    logo.style.transform = `rotate(${slowRot}deg)`;
                    logo.classList.remove('warning-active');
                }
                if (ring1) ring1.classList.remove('warning-active');
                if (ring2) ring2.classList.remove('warning-active');
                if (gaugeFill) {
                    gaugeFill.style.width = `${progress * 60}%`; // small standard rise
                }
                if (beamState) {
                    beamState.textContent = 'STANDBY';
                    beamState.style.color = '#60a5fa';
                }
                if (shieldState) {
                    shieldState.textContent = 'ALIGNED (OK)';
                    shieldState.style.color = '#10b981';
                }
                if (overdose) overdose.style.opacity = '0';
                if (roomGlow) roomGlow.style.opacity = '0';
                if (board) board.style.transform = 'translate(0,0)';
            } else {
                // Spike Overdose state
                const normProg = (progress - 0.25) / 0.75;
                const fastRot = 22.5 + normProg * 1280; // spin extremely fast!
                
                if (logo) {
                    logo.style.transform = `rotate(${fastRot}deg)`;
                    logo.classList.add('warning-active');
                }
                if (ring1) ring1.classList.add('warning-active');
                if (ring2) ring2.classList.add('warning-active');
                
                if (gaugeFill) {
                    gaugeFill.style.width = '100%'; // maxed out!
                }
                
                if (beamState) {
                    beamState.textContent = 'RAW ELECTRON (25 MeV) - DANGEROUS';
                    beamState.style.color = '#ec4899';
                }
                if (shieldState) {
                    shieldState.textContent = 'NOT ALIGNED (STUCK)';
                    shieldState.style.color = '#ef4444';
                    shieldState.style.animation = 'v70-glitch-shake 0.1s infinite';
                }
                
                if (overdose) overdose.style.opacity = '1';
                
                // Room alarm flash
                if (roomGlow) {
                    roomGlow.style.opacity = (Math.round(progress * 20) % 2 === 0) ? '1' : '0.25';
                }
                
                // Screen shake
                if (board) {
                    const shakeX = (Math.random() - 0.5) * 8;
                    const shakeY = (Math.random() - 0.5) * 8;
                    board.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
                }
            }
        }

        // Slide 2: Rotating turntable plate
        else if (slideId === 'slide_therac_modes') {
            const plate = row.querySelector('#v70-modes-plate');
            const status = row.querySelector('#v70-modes-status');
            
            // Rotates 180 degrees
            const angle = progress * 180;
            if (plate) {
                plate.style.transform = `rotate(${angle}deg)`;
            }
            
            if (status) {
                if (angle < 45) {
                    status.textContent = 'ACTIVE MODE: ELECTRON SPREADER';
                    status.style.color = 'var(--v70-primary)';
                } else if (angle >= 45 && angle < 135) {
                    status.textContent = 'TRANSITIONING MOTORS...';
                    status.style.color = '#fbbf24';
                } else {
                    status.textContent = 'ACTIVE MODE: X-RAY METAL TARGET';
                    status.style.color = '#eab308';
                }
            }
        }

        // Slide 3: Operator console retyping commands
        else if (slideId === 'slide_therac_race') {
            const input = row.querySelector('#v70-terminal-input');
            const sec = row.querySelector('#v70-terminal-sec');
            
            // Operator types X, then quickly deletes it and types E
            if (progress < 0.25) {
                if (input) input.textContent = 'X';
            } else if (progress >= 0.25 && progress < 0.45) {
                if (input) input.textContent = ''; // backspace
            } else {
                if (input) input.textContent = 'E'; // correction
            }
            
            // Countdown 8s
            if (sec) {
                const s = Math.max(0.0, 8.0 - progress * 9.5).toFixed(1);
                sec.textContent = `${s}s`;
                if (parseFloat(s) < 1.0) {
                    sec.style.color = '#ef4444';
                } else {
                    sec.style.color = '#fbbf24';
                }
            }
        }

        // Slide 4: Multi-thread resource clash
        else if (slideId === 'slide_therac_glitch') {
            const uiBar = row.querySelector('#v70-thread-ui-bar');
            const hwBar = row.querySelector('#v70-thread-hw-bar');
            const uiStatus = row.querySelector('#v70-thread-ui-status');
            const hwStatus = row.querySelector('#v70-thread-hw-status');
            const clashMark = row.querySelector('#v70-clash-mark');
            const clashWarning = row.querySelector('#v70-clash-warning');
            
            // UI thread runs fast
            const uiPct = Math.min(100, progress * 240);
            if (uiBar) uiBar.style.width = `${uiPct}%`;
            
            if (uiStatus) {
                if (uiPct >= 100) {
                    uiStatus.textContent = 'COMMAND COMPLETED (ELECTRON MODE)';
                    uiStatus.style.color = '#22c55e';
                } else {
                    uiStatus.textContent = 'PROCESSING INTERFACE...';
                    uiStatus.style.color = '#60a5fa';
                }
            }
            
            // Hardware motor thread runs slow (takes longer than 8 seconds, so only reaches 40%)
            const hwPct = Math.min(70, progress * 90);
            if (hwBar) hwBar.style.width = `${hwPct}%`;
            
            if (hwStatus) {
                if (progress > 0.78) {
                    hwStatus.textContent = 'MOTOR INTERRUPTED (STUCK)';
                    hwStatus.style.color = '#ef4444';
                } else {
                    hwStatus.textContent = 'TURNTABLE ROTATING (40% ALIGNED)';
                    hwStatus.style.color = '#fbbf24';
                }
            }
            
            // Clash trigger at progress > 0.75
            if (progress > 0.75) {
                if (clashMark) clashMark.style.opacity = Math.sin(progress * 100) > 0 ? '1' : '0.2';
                if (clashWarning) {
                    clashWarning.style.opacity = '1';
                    clashWarning.style.animation = 'v70-glitch-shake 0.1s infinite';
                }
            } else {
                if (clashMark) clashMark.style.opacity = '0';
                if (clashWarning) {
                    clashWarning.style.opacity = '0';
                    clashWarning.style.animation = 'none';
                }
            }
        }

        // Slide 5: Raw radiation blast on stuck turntable (Radioactive console style)
        else if (slideId === 'slide_therac_blast') {
            const board = row.querySelector('#v70-blast-board-item');
            const roomGlow = row.querySelector('#v70-blast-room-glow');
            const logo = row.querySelector('#v70-blast-hazard-logo');
            
            // Extreme spinning logo
            if (logo) {
                const rot = progress * 1680;
                logo.style.transform = `rotate(${rot}deg)`;
            }
            
            // Room glow emergency flash
            if (roomGlow) {
                roomGlow.style.opacity = (Math.round(progress * 24) % 2 === 0) ? '1' : '0.25';
            }
            
            // Screen shake
            if (board) {
                const shakeX = (Math.random() - 0.5) * 12;
                const shakeY = (Math.random() - 0.5) * 12;
                board.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
            }
        }

        // Slide 6: 1-Byte coincidence register overflow
        else if (slideId === 'slide_therac_overflow') {
            const regEl = row.querySelector('#v70-overflow-reg');
            const statusEl = row.querySelector('#v70-overflow-status');
            const holoRing = row.querySelector('#v70-holo-ring');
            
            if (progress < 0.75) {
                const normProg = progress / 0.75;
                const val = Math.round(normProg * 255);
                if (regEl) {
                    regEl.textContent = String(val).padStart(3, '0');
                    regEl.className = 'v70-register-number';
                }
                if (statusEl) {
                    statusEl.textContent = 'INCREMENTING MOTOR POLLING STEPS...';
                    statusEl.style.color = '#fbbf24';
                }
                if (holoRing) {
                    const offset = 880 - normProg * 880;
                    holoRing.style.strokeDashoffset = String(offset);
                    holoRing.classList.remove('overflowed');
                }
            } else {
                // Overflows to 0
                if (regEl) {
                    regEl.textContent = '000';
                    regEl.classList.add('overflowed');
                }
                if (statusEl) {
                    statusEl.textContent = '⚠️ REGISTER OVERFLOWED! STATUS CLEARED (OK)';
                    statusEl.style.color = '#ef4444';
                    statusEl.style.animation = 'v70-glitch-shake 0.15s infinite';
                }
                if (holoRing) {
                    holoRing.style.strokeDashoffset = '0';
                    holoRing.classList.add('overflowed');
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video70',
        topic: 'Thảm họa xạ trị Therac-25',
        episodeNum: 70,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video70 Plugin] Loaded: Therac-25 race condition and register overflow simulation.');
})();
