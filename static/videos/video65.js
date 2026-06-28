/**
 * Video 65: Apollo 11 vs USB-C Charger
 * Custom slides comparing Apollo Guidance Computer (AGC) and USB-C PD Microchip.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_apollo_intro: [
            { text: 'chỉ là sợi dây đồng', start: 2.0, end: 4.5, class: 'active-red' },
            { text: 'mạnh hơn cả siêu máy tính', start: 6.5, end: 10.0, class: 'active-yellow' }
        ],
        slide_apollo_launch: [
            { text: 'Saturn V khổng lồ', start: 3.5, end: 6.0, class: 'active-cyan' },
            { text: 'bộ não máy tính chuyên dụng', start: 7.5, end: 11.5, class: 'active-yellow' }
        ],
        slide_apollo_agc: [
            { text: '1.024 MegaHéc', start: 4.5, end: 7.5, class: 'active-gold' },
            { text: '4 KiloByte', start: 8.5, end: 11.0, class: 'active-yellow' }
        ],
        slide_apollo_charger: [
            { text: 'ARM Cortex-M0', start: 4.0, end: 6.5, class: 'active-cyan' },
            { text: '48 MegaHéc', start: 7.0, end: 9.5, class: 'active-primary' }
        ],
        slide_apollo_comparison: [
            { text: 'nhanh gấp 48 lần', start: 3.5, end: 6.5, class: 'active-cyan' },
            { text: 'bộ nhớ RAM gấp đôi', start: 7.5, end: 10.5, class: 'active-green' }
        ],
        slide_apollo_why: [
            { text: 'độ tin cậy tuyệt đối', start: 3.5, end: 6.5, class: 'active-green' },
            { text: 'chống bức xạ vũ trụ', start: 7.0, end: 9.5, class: 'active-cyan' }
        ]
    };

    const customSlideIds = [
        'slide_apollo_intro', 'slide_apollo_launch', 'slide_apollo_agc', 
        'slide_apollo_charger', 'slide_apollo_comparison', 'slide_apollo_why'
    ];

    function sceneWrap(inner) {
        return `<div class="v65-zoom-container"><div class="v65-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: Split visual - Mini simulations inside hook cards
        if (slideId === 'slide_apollo_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-intro-split">
                        <div class="v65-intro-side left" id="v65-intro-apollo">
                            <div class="v65-intro-icon"><i data-lucide="rocket"></i></div>
                            <div class="v65-intro-title">Apollo 11</div>
                            
                            <!-- Mini Space HUD simulation -->
                            <div class="v65-mini-sim-box">
                                <div class="v65-mini-hud-grid"></div>
                                <div class="v65-mini-orbit">
                                    <div class="v65-mini-shuttle"><i data-lucide="rocket" style="width:16px; height:16px;"></i></div>
                                </div>
                                <div class="v65-mini-telemetry">
                                    <span>ALT: <strong id="v65-mini-alt">384,400</strong> KM</span>
                                    <span>VEL: 1.62 KM/S</span>
                                </div>
                            </div>
                            
                            <div class="v65-intro-desc">Đưa 3 phi hành gia chinh phục mặt trăng năm 1969</div>
                        </div>
                        
                        <div class="v65-intro-side right" id="v65-intro-usbc">
                            <div class="v65-intro-icon"><i data-lucide="zap"></i></div>
                            <div class="v65-intro-title">Cáp USB-C</div>
                            
                            <!-- Mini USB-C Pulse contract simulation (Wider layout) -->
                            <div class="v65-mini-sim-box">
                                <div class="v65-mini-pulse-ring"></div>
                                <div class="v65-mini-chip-board">
                                    <span style="font-family:monospace; font-size:12px; color:var(--v65-primary); font-weight:bold; letter-spacing:1px;">PD CONTRACT</span>
                                    <span style="font-family:monospace; font-size:22px; color:#fff; font-weight:bold; margin-top:5px; text-shadow: 0 0 8px var(--v65-primary-glow);" id="v65-mini-watt">5V / 3A</span>
                                    <span style="font-family:monospace; font-size:11px; color:#f59e0b; margin-top:4px; font-weight:800;" id="v65-mini-status">NEGOTIATING</span>
                                </div>
                            </div>
                            
                            <div class="v65-intro-desc">Sạc điện thoại trên bàn của bạn ngày nay</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 2: Real Space Shuttle Cockpit / HUD simulation
        else if (slideId === 'slide_apollo_launch') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-hud-container">
                        <div class="v65-hud-grid"></div>
                        
                        <!-- HUD Orbit Rings -->
                        <div class="v65-hud-orbit">
                            <!-- Flying rocket inside HUD -->
                            <div class="v65-rocket-container-hud" id="v65-saturn-rocket">
                                <div class="v65-saturn-v"></div>
                                <div class="v65-rocket-fin left"></div>
                                <div class="v65-rocket-fin right"></div>
                                <div class="v65-rocket-fire"></div>
                            </div>
                        </div>
                        
                        <!-- Telemetry HUD readings -->
                        <div class="v65-hud-telemetry top-left">
                            <span>SYS: ACTIVE</span>
                            <span>MISSION: APOLLO 11</span>
                            <span>TARGET: MOON LUNAR</span>
                        </div>
                        
                        <div class="v65-hud-telemetry top-right">
                            <span style="color:#f59e0b;">ALTITUDE: <strong id="v65-hud-alt">0</strong> KM</span>
                            <span style="color:#f59e0b;">VELOCITY: <strong id="v65-hud-vel">0</strong> M/S</span>
                        </div>
                        
                        <div class="v65-hud-telemetry bottom-left">
                            <span>PITCH: <strong id="v65-hud-pitch">0°</strong></span>
                            <span>YAW: <strong id="v65-hud-yaw">0°</strong></span>
                        </div>
                        
                        <div class="v65-hud-telemetry bottom-right">
                            <span>STAGE: I / S-IC</span>
                            <span style="color:#10b981;">THRUST: 100% (MAX)</span>
                        </div>
                        
                        <!-- Starfield particles scrolling -->
                        <div class="v65-stars scrolling" id="v65-star-scroll" style="opacity: 0.15;"></div>
                    </div>
                </div>
            `);
        }

        // Slide 3: REALISTIC Apollo DSKY interface mockup
        else if (slideId === 'slide_apollo_agc') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-dsky-console">
                        <!-- Left Status Lights Panel (2 columns of 7) -->
                        <div class="v65-dsky-indicator-panel">
                            <div class="v65-dsky-panel-light amber" id="v65-dsky-uplink">UPLINK</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-auto">AUTO</div>
                            <div class="v65-dsky-panel-light amber" id="v65-dsky-noatt">NO ATT</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-hold">HOLD</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-stby">STBY</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-free">FREE</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-keyrel">KEY REL</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-test">TEST</div>
                            <div class="v65-dsky-panel-light amber" id="v65-dsky-oprerr">OPR ERR</div>
                            <div class="v65-dsky-panel-light red" id="v65-dsky-fail">FAIL</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-temp">TEMP</div>
                            <div class="v65-dsky-panel-light red" id="v65-dsky-gimbal">GIMBAL</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-tracker">TRACKER</div>
                            <div class="v65-dsky-panel-light green" id="v65-dsky-reset">RESET</div>
                        </div>
                        
                        <!-- Right Display screen (VERB, NOUN, and 3 data rows) -->
                        <div class="v65-dsky-displays-panel">
                            <div class="v65-dsky-header-row">
                                <div class="v65-dsky-header-cell">
                                    <span class="v65-dsky-mini-label">PROG</span>
                                    <span class="v65-dsky-mini-val">11</span>
                                </div>
                                <div class="v65-dsky-header-cell">
                                    <span class="v65-dsky-mini-label">VERB</span>
                                    <span class="v65-dsky-mini-val" id="v65-dsky-verb">16</span>
                                </div>
                                <div class="v65-dsky-header-cell">
                                    <span class="v65-dsky-mini-label">NOUN</span>
                                    <span class="v65-dsky-mini-val" id="v65-dsky-noun">20</span>
                                </div>
                            </div>
                            
                            <!-- Reg 1: CPU Clock -->
                            <div class="v65-dsky-reg-row">
                                <span class="v65-dsky-reg-label">R1 (CPU CLOCK)</span>
                                <span class="v65-dsky-reg-val" id="v65-dsky-r1">+00000</span>
                            </div>
                            
                            <!-- Reg 2: RAM size -->
                            <div class="v65-dsky-reg-row">
                                <span class="v65-dsky-reg-label">R2 (RAM SIZE)</span>
                                <span class="v65-dsky-reg-val" id="v65-dsky-r2">+00004</span>
                            </div>
                            
                            <!-- Reg 3: Launch year -->
                            <div class="v65-dsky-reg-row">
                                <span class="v65-dsky-reg-label">R3 (LAUNCH YEAR)</span>
                                <span class="v65-dsky-reg-val" id="v65-dsky-r3">+01969</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: REAL USB-C POWER DELIVERY PROTOCOL MONITOR
        else if (slideId === 'slide_apollo_charger') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-usbc-protocol-board">
                        <!-- Left Schematic (Connector Pinout & Chip) -->
                        <div class="v65-usbc-schematic">
                            <div class="v65-connector-outline">
                                <div class="v65-pin-row">
                                    <div class="v65-connector-pin"></div>
                                    <div class="v65-connector-pin"></div>
                                    <div class="v65-connector-pin" style="background:#00f0ff;"></div>
                                    <div class="v65-connector-pin" style="background:#00f0ff;"></div>
                                    <div class="v65-connector-pin"></div>
                                    <div class="v65-connector-pin"></div>
                                    <div class="v65-connector-pin"></div>
                                    <div class="v65-connector-pin"></div>
                                </div>
                            </div>
                            
                            <div class="v65-schematic-chip">
                                <span style="font-family:monospace; font-size:12px; color:var(--v65-primary); font-weight:bold;">ARM M0 CORE</span>
                                <span style="font-family:monospace; font-size:16px; color:#fff; font-weight:bold; margin-top:5px;">48 MHz</span>
                                <span style="font-family:monospace; font-size:11px; color:#888;">8KB RAM</span>
                            </div>
                            
                            <!-- Current Power State badge -->
                            <div style="margin-top:15px; font-family:monospace; font-size:14px; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px;" id="v65-pwr-badge">
                                POWER STATE: INIT
                            </div>
                        </div>
                        
                        <!-- Right: Packet log (Live Typing) -->
                        <div class="v65-negotiation-log" id="v65-usbc-log-box">
                            <div class="v65-log-line tx" id="v65-log-1">[0.0s] TX Cap: 5V/3A, 9V/3A, 20V/5A, 28V/5A</div>
                            <div class="v65-log-line rx" id="v65-log-2">[1.2s] RX Request: 28V/5A (EPR Contract)</div>
                            <div class="v65-log-line tx" id="v65-log-3">[2.4s] TX Status: ACCEPT CONTRACT</div>
                            <div class="v65-log-line rx" id="v65-log-4">[3.6s] RX Status: CONTRACT ACCEPTED</div>
                            <div class="v65-log-line ok" id="v65-log-5">[4.8s] POWER NEGO SUCCESSFUL -> 140W ACTIVE</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 5: High-end Comparison Chart
        else if (slideId === 'slide_apollo_comparison') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-chart-wrap">
                        <div class="v65-chart-title">
                            <span>SO SÁNH HIỆU NĂNG CHIP</span>
                            <span style="color:var(--v65-pink); font-size: 16px;">MẠNH HƠN GẤP 48 LẦN</span>
                        </div>
                        <div class="v65-chart-rows">
                            <!-- Row 1: Clock Speed -->
                            <div class="v65-chart-row-item">
                                <div class="v65-row-info">
                                    <span class="v65-row-name">Xung nhịp (Clock speed)</span>
                                </div>
                                <div class="v65-row-info" style="margin-top:-4px;">
                                    <span style="font-size:14px; color:var(--v65-gold); font-weight:700;">Tàu Apollo 11: 1.024 MHz</span>
                                    <span style="font-size:14px; color:var(--v65-primary); font-weight:700;">Cáp USB-C: 48 MHz</span>
                                </div>
                                <div class="v65-bar-outer">
                                    <div class="v65-bar-inner charger" id="v65-bar-clock"></div>
                                </div>
                            </div>
                            <!-- Row 2: RAM -->
                            <div class="v65-chart-row-item">
                                <div class="v65-row-info">
                                    <span class="v65-row-name">Dung lượng bộ nhớ RAM</span>
                                </div>
                                <div class="v65-row-info" style="margin-top:-4px;">
                                    <span style="font-size:14px; color:var(--v65-gold); font-weight:700;">Tàu Apollo 11: 4 KB</span>
                                    <span style="font-size:14px; color:var(--v65-primary); font-weight:700;">Cáp USB-C: 8 KB</span>
                                </div>
                                <div class="v65-bar-outer">
                                    <div class="v65-bar-inner charger" id="v65-bar-ram" style="background: linear-gradient(90deg, #d946ef, var(--v65-pink)); box-shadow: 0 0 12px var(--v65-pink-glow);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: Radiation Hardening Immersive
        else if (slideId === 'slide_apollo_why') {
            canvas.innerHTML = sceneWrap(`
                <div class="v65-scene-row">
                    <div class="v65-shield-wrapper-huge">
                        <div class="v65-shield-container">
                            <!-- Satellite / Hardware -->
                            <div class="v65-satellite-body">
                                <div style="position:absolute; top:20px; left:20px; color:#fff;"><i data-lucide="cpu" style="width:36px; height:36px;"></i></div>
                            </div>
                            <div class="v65-solar-panel left"></div>
                            <div class="v65-solar-panel right"></div>
                            
                            <!-- Force shield bubble -->
                            <div class="v65-shield-bubble" id="v65-shield-bubble"></div>
                            
                            <!-- Flying particles -->
                            <div class="v65-ray-particle" id="v65-ray-1" style="top:40px; left:-50px; width:40px;"></div>
                            <div class="v65-ray-particle" id="v65-ray-2" style="top:110px; left:-50px; width:30px;"></div>
                            <div class="v65-ray-particle" id="v65-ray-3" style="top:190px; left:-50px; width:45px;"></div>
                        </div>
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
        const row = canvas.querySelector('.v65-scene-row');
        if (!row) return;

        // Slide 1: NO zooms (per request), only update mini simulations
        if (slideId === 'slide_apollo_intro') {
            const apolloSide = row.querySelector('#v65-intro-apollo');
            const usbcSide = row.querySelector('#v65-intro-usbc');
            const miniAlt = row.querySelector('#v65-mini-alt');
            const miniWatt = row.querySelector('#v65-mini-watt');
            const miniStatus = row.querySelector('#v65-mini-status');
            
            // Keep them statically at scale(1)
            if (apolloSide) apolloSide.style.transform = 'scale(1)';
            if (usbcSide) usbcSide.style.transform = 'scale(1)';
            
            // Orbit simulation rotate
            const orbit = row.querySelector('.v65-mini-orbit');
            if (orbit) {
                orbit.style.transform = `rotate(${progress * 720}deg)`;
            }
            
            // Countdown altitude in mini HUD
            if (miniAlt) {
                const alt = Math.round(384400 - progress * 240000);
                miniAlt.textContent = alt.toLocaleString();
            }
            
            // Cycle wattage negotiation in mini charger card
            if (miniWatt && miniStatus) {
                if (progress < 0.25) {
                    miniWatt.textContent = '5V / 3A';
                    miniStatus.textContent = 'NEGOTIATING';
                    miniStatus.style.color = '#f59e0b';
                } else if (progress >= 0.25 && progress < 0.55) {
                    miniWatt.textContent = '20V / 5A';
                    miniStatus.textContent = 'POWER CAP OK';
                    miniStatus.style.color = '#fbbf24';
                } else {
                    miniWatt.textContent = '28V / 5A (140W)';
                    miniStatus.textContent = 'EPR CONTRACT ACTIVE';
                    miniStatus.style.color = '#10b981';
                }
            }
        }

        // Slide 2: Space Shuttle HUD Telemetry
        else if (slideId === 'slide_apollo_launch') {
            const rocket = row.querySelector('#v65-saturn-rocket');
            const altEl = row.querySelector('#v65-hud-alt');
            const velEl = row.querySelector('#v65-hud-vel');
            const pitchEl = row.querySelector('#v65-hud-pitch');
            const yawEl = row.querySelector('#v65-hud-yaw');
            
            if (rocket) {
                const yPos = 120 - progress * 290;
                rocket.style.transform = `translateY(${yPos}px)`;
            }
            
            if (altEl) {
                const alt = Math.round(progress * 125);
                altEl.textContent = alt;
            }
            if (velEl) {
                const vel = Math.round(progress * 2450);
                velEl.textContent = vel;
            }
            if (pitchEl) {
                const pitch = Math.round(progress * 42);
                pitchEl.textContent = `${pitch}°`;
            }
            if (yawEl) {
                const yaw = (Math.sin(progress * 15) * 1.5).toFixed(1);
                yawEl.textContent = `${yaw}°`;
            }
        }

        // Slide 3: REALISTIC DSKY Console display
        else if (slideId === 'slide_apollo_agc') {
            const r1El = row.querySelector('#v65-dsky-r1');
            const verbEl = row.querySelector('#v65-dsky-verb');
            const nounEl = row.querySelector('#v65-dsky-noun');
            
            const lights = ['uplink', 'noatt', 'stby', 'keyrel', 'oprerr', 'temp', 'auto', 'hold', 'free', 'test', 'fail', 'gimbal', 'tracker', 'reset'];
            lights.forEach((name, i) => {
                const el = row.querySelector(`#v65-dsky-${name}`);
                if (el) {
                    const active = Math.sin(progress * 40 + i) > 0.1;
                    if (active) {
                        el.classList.add('on');
                    } else {
                        el.classList.remove('on');
                    }
                }
            });
            
            if (r1El) {
                const target = 1024;
                const val = progress < 0.85 ? Math.round((progress / 0.85) * target) : target;
                let valStr = String(val);
                while (valStr.length < 5) valStr = '0' + valStr;
                r1El.textContent = '+' + valStr;
            }
            
            if (verbEl && nounEl) {
                if (progress < 0.35) {
                    verbEl.textContent = '16';
                    nounEl.textContent = '20';
                } else if (progress >= 0.35 && progress < 0.7) {
                    verbEl.textContent = '37';
                    nounEl.textContent = '88';
                } else {
                    verbEl.textContent = '06';
                    nounEl.textContent = '62';
                }
            }
        }

        // Slide 4: REAL USB-C POWER DELIVERY CONTRACT
        else if (slideId === 'slide_apollo_charger') {
            const pwrBadge = row.querySelector('#v65-pwr-badge');
            
            const timings = [0.1, 0.3, 0.5, 0.7, 0.9];
            timings.forEach((t, index) => {
                const line = row.querySelector(`#v65-log-${index + 1}`);
                if (line) {
                    if (progress >= t) {
                        line.style.opacity = '1';
                    } else {
                        line.style.opacity = '0';
                    }
                }
            });
            
            if (pwrBadge) {
                if (progress < 0.3) {
                    pwrBadge.textContent = 'POWER STATE: DETECTING';
                    pwrBadge.style.color = '#f59e0b';
                } else if (progress >= 0.3 && progress < 0.7) {
                    pwrBadge.textContent = 'POWER STATE: NEGOTIATING';
                    pwrBadge.style.color = '#00f0ff';
                } else {
                    pwrBadge.textContent = 'POWER STATE: EPR 140W ACTIVE';
                    pwrBadge.style.color = '#10b981';
                    pwrBadge.style.boxShadow = '0 0 10px rgba(16,185,129,0.3)';
                }
            }
        }

        // Slide 5: Comparison charts progress bar
        else if (slideId === 'slide_apollo_comparison') {
            const barClock = row.querySelector('#v65-bar-clock');
            const barRam = row.querySelector('#v65-bar-ram');
            
            if (barClock) {
                const targetBarVal = 100;
                const val = progress < 0.85 ? (progress / 0.85) * targetBarVal : targetBarVal;
                barClock.style.width = `${val}%`;
            }
            
            if (barRam) {
                const targetBarVal = 100;
                const val = progress < 0.85 ? (progress / 0.85) * targetBarVal : targetBarVal;
                barRam.style.width = `${val}%`;
            }
        }

        // Slide 6: Radiation particles hitting shield
        else if (slideId === 'slide_apollo_why') {
            const bubble = row.querySelector('#v65-shield-bubble');
            const ray1 = row.querySelector('#v65-ray-1');
            const ray2 = row.querySelector('#v65-ray-2');
            const ray3 = row.querySelector('#v65-ray-3');
            
            const speedFactor = progress * 600;
            
            if (ray1) {
                const x = -50 + (speedFactor % 320);
                ray1.style.transform = `translateX(${x}px)`;
                
                if (bubble) {
                    if (x > 80 && x < 100) {
                        bubble.style.borderColor = '#ff3333';
                        bubble.style.boxShadow = '0 0 40px rgba(255,50,50,0.6)';
                    } else {
                        bubble.style.borderColor = '#38bdf8';
                        bubble.style.boxShadow = '0 0 30px rgba(56,189,248,0.4)';
                    }
                }
            }
            
            if (ray2) {
                const x = -50 + ((speedFactor * 1.3 + 120) % 320);
                ray2.style.transform = `translateX(${x}px)`;
            }
            
            if (ray3) {
                const x = -50 + ((speedFactor * 0.9 + 50) % 320);
                ray3.style.transform = `translateX(${x}px)`;
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video65',
        topic: 'Cáp sạc vs Apollo 11',
        episodeNum: 65,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video65 Plugin] Loaded: Transparent Space & USB-C UI Upgrade.');
})();
