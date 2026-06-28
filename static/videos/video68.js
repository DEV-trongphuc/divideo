/**
 * Video 68: Einstein Relativity & GPS Drift
 * Custom slides detailing time dilation and the 11 km drift correction (Rich Animations & Click Interactions).
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_gps_intro: [
            { text: 'lệch tới 11 cây số', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'chỉ hướng thẳng xuống sông', start: 7.5, end: 11.0, class: 'active-yellow' }
        ],
        slide_gps_satellites: [
            { text: 'chính xác thời gian tín hiệu', start: 3.5, end: 6.5, class: 'active-cyan' },
            { text: 'độ cao 20.000 km', start: 7.5, end: 10.5, class: 'active-yellow' }
        ],
        slide_gps_dilation: [
            { text: 'trọng lực yếu hơn', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'tốc độ di chuyển cao', start: 7.5, end: 10.5, class: 'active-cyan' }
        ],
        slide_gps_drift: [
            { text: 'chạy nhanh hơn', start: 3.5, end: 6.5, class: 'active-gold' },
            { text: '38 micrô-giây mỗi ngày', start: 7.0, end: 10.5, class: 'active-yellow' }
        ],
        slide_gps_math: [
            { text: 'tốc độ ánh sáng', start: 3.0, end: 6.0, class: 'active-cyan' },
            { text: 'hơn 11 cây số', start: 7.5, end: 11.0, class: 'active-red' }
        ],
        slide_gps_correction: [
            { text: 'liên tục áp dụng', start: 3.0, end: 6.0, class: 'active-green' },
            { text: 'đồng bộ hoàn hảo', start: 7.0, end: 10.5, class: 'active-cyan' }
        ]
    };

    const customSlideIds = [
        'slide_gps_intro', 'slide_gps_satellites', 'slide_gps_dilation', 
        'slide_gps_drift', 'slide_gps_math', 'slide_gps_correction'
    ];

    function sceneWrap(inner) {
        return `<div class="v68-zoom-container"><div class="v68-scene-content">${inner}</div></div>`;
    }

    // Helper to calculate angle between two coordinates
    function getAngle(x1, y1, x2, y2) {
        const dy = y2 - y1;
        const dx = x2 - x1;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs
        return theta + 90; // offset to align navigation icon pointing up
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: Car Navigation app drifting off road
        if (slideId === 'slide_gps_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-nav-board" id="v68-intro-board">
                        <div class="v68-map-grid"></div>
                        <div class="v68-map-river"></div>
                        <div class="v68-map-road">
                            <div class="v68-map-road-stripes"></div>
                        </div>
                        
                        <!-- Pulse signals -->
                        <div class="v68-gps-wave"></div>
                        <div class="v68-gps-wave"></div>
                        
                        <!-- SVG route path overlays -->
                        <svg class="v68-route-svg">
                            <path class="v68-route-line correct-path" id="v68-svg-correct" d="" />
                            <path class="v68-route-line drifted-path" id="v68-svg-drifted" d="" />
                        </svg>
                        
                        <!-- Target Destination Pin/Crosshair -->
                        <div class="v68-target-crosshair" id="v68-target-marker" style="left: 228px; top: 80px;">
                            <i data-lucide="map-pin" style="width:28px; height:28px; fill: var(--v68-gold); stroke: #000; stroke-width: 2px;"></i>
                        </div>
                        
                        <!-- Correct Path Arrow -->
                        <div class="v68-nav-arrow correct" id="v68-nav-correct" style="left:218px; top:460px;">
                            <i data-lucide="navigation" style="width:28px; height:28px;"></i>
                        </div>
                        
                        <!-- Drifted Path Arrow (Without Einstein) -->
                        <div class="v68-nav-arrow drifted" id="v68-nav-drifted" style="left:218px; top:460px;">
                            <i data-lucide="navigation-off" style="width:28px; height:28px;"></i>
                        </div>
                        
                        <!-- Dust trails and water splash container -->
                        <div id="v68-trails-container" style="position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none;"></div>
                        
                        <div class="v68-drift-badge">
                            MỤC TIÊU: <span style="color:var(--v68-gold); font-weight:bold;">CLICK BẤT KỲ ĐỂ CHỌN</span><br>
                            DRIFT ERROR: <strong id="v68-drift-distance" style="color:var(--v68-red); font-size:18px;">0.00 KM</strong>
                        </div>
                    </div>
                </div>
            `);
            
            // Set initial click targets on canvas attributes
            canvas.setAttribute('data-target-x', '228');
            canvas.setAttribute('data-target-y', '80');
            
            // Click Handler: Update destination target interactively
            const board = canvas.querySelector('#v68-intro-board');
            if (board) {
                board.addEventListener('click', (e) => {
                    const rect = board.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;
                    
                    canvas.setAttribute('data-target-x', String(clickX));
                    canvas.setAttribute('data-target-y', String(clickY));
                    
                    const marker = board.querySelector('#v68-target-marker');
                    if (marker) {
                        marker.style.left = `${clickX}px`;
                        marker.style.top = `${clickY}px`;
                    }
                });
            }
        }

        // Slide 2: Earth and Orbiting Satellites with lasers
        else if (slideId === 'slide_gps_satellites') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-space-panel">
                        <div class="v68-space-stars"></div>
                        <div class="v68-space-earth-atmosphere"></div>
                        <div class="v68-space-earth" id="v68-space-earth-body"></div>
                        
                        <!-- Orbit rings -->
                        <div class="v68-orbit-line o1"></div>
                        <div class="v68-orbit-line o2"></div>
                        
                        <!-- SVG Laser overlay -->
                        <svg class="v68-space-laser-svg">
                            <line class="v68-laser-beam" id="v68-laser-1" x1="0" y1="0" x2="400" y2="210" />
                            <line class="v68-laser-beam" id="v68-laser-2" x1="0" y1="0" x2="400" y2="210" />
                            <line class="v68-laser-beam" id="v68-laser-3" x1="0" y1="0" x2="400" y2="210" />
                        </svg>
                        
                        <!-- Satellite items orbiting -->
                        <div class="v68-satellite-item" id="v68-sat-1">
                            <i data-lucide="satellite" style="width:28px; height:28px;"></i>
                        </div>
                        <div class="v68-satellite-item" id="v68-sat-2">
                            <i data-lucide="satellite" style="width:28px; height:28px;"></i>
                        </div>
                        <div class="v68-satellite-item" id="v68-sat-3">
                            <i data-lucide="satellite" style="width:28px; height:28px;"></i>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 3: Time Dilation Clock panel (Space vs Earth) with dials
        else if (slideId === 'slide_gps_dilation') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-clocks-panel">
                        <div class="v68-clock-card space">
                            <div class="v68-clock-title">VỆ TINH (SPACE CLOCK)</div>
                            
                            <!-- Analog clock dials HUD -->
                            <div class="v68-hud-dial">
                                <div class="v68-hud-hand" id="v68-hand-space"></div>
                            </div>
                            
                            <div style="font-size:12px; color:#888; font-family:monospace; margin-top:-5px;">SPEED: 14,000 KM/H • GRAVITY: WEAK</div>
                            <div class="v68-clock-time" id="v68-clock-space-val">12:00:00.000000</div>
                            <div class="v68-clock-desc" style="color:var(--v68-gold); font-weight:bold;">Chạy nhanh hơn (General Relativity)</div>
                        </div>
                        
                        <div class="v68-clock-card earth">
                            <div class="v68-clock-title">MẶT ĐẤT (EARTH CLOCK)</div>
                            
                            <!-- Analog clock dials HUD -->
                            <div class="v68-hud-dial">
                                <div class="v68-hud-hand" id="v68-hand-earth"></div>
                            </div>
                            
                            <div style="font-size:12px; color:#888; font-family:monospace; margin-top:-5px;">SPEED: STATIC • GRAVITY: STRONG</div>
                            <div class="v68-clock-time" id="v68-clock-earth-val">12:00:00.000000</div>
                            <div class="v68-clock-desc" style="color:var(--v68-primary); font-weight:bold;">Chạy chậm hơn (Mức chuẩn Trái Đất)</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Microsecond Drift Counter board
        else if (slideId === 'slide_gps_drift') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-drift-counter-panel">
                        <span style="font-family:monospace; font-size:16px; color:#9ca3af; letter-spacing:2px; font-weight:bold;">TỔNG SAI LỆCH THỜI GIAN MỖI NGÀY</span>
                        <div class="v68-drift-number" id="v68-drift-usec">+0.000000 μs</div>
                        <span style="font-family:monospace; font-size:14px; color:#fbbf24; text-align:center; line-height:1.4;">
                            Bao gồm: +45.7 μs (Thuyết tương đối rộng) và -7.1 μs (Thuyết tương đối hẹp)
                        </span>
                    </div>
                </div>
            `);
        }

        // Slide 5: Speed of Light Math
        else if (slideId === 'slide_gps_math') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-math-board">
                        <div style="font-family:monospace; font-size:16px; color:#9ca3af; text-align:center; font-weight:bold; letter-spacing:1px;">
                            TÍN HIỆU ĐỊNH VỊ DI CHUYỂN BẰNG TỐC ĐỘ ÁNH SÁNG
                        </div>
                        
                        <!-- Pulse laser simulation -->
                        <div class="v68-light-pulse-container">
                            <div style="position:absolute; left:20px; color:#ef4444;"><i data-lucide="satellite" style="width:32px; height:32px;"></i></div>
                            <div class="v68-pulse-laser" id="v68-pulse-laser-item"></div>
                            <div style="position:absolute; right:20px; color:#22c55e;"><i data-lucide="smartphone" style="width:32px; height:32px;"></i></div>
                        </div>
                        
                        <!-- Math formula -->
                        <div class="v68-formula-line" id="v68-math-formula">
                            Quãng đường lệch (Δd) = c × Δt
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: Relativistic Corrections Code check
        else if (slideId === 'slide_gps_correction') {
            canvas.innerHTML = sceneWrap(`
                <div class="v68-scene-row">
                    <div class="v68-correction-board">
                        <!-- Left equation badge -->
                        <div class="v68-formula-box">
                            <span style="font-family:monospace; font-size:13px; color:#94a3b8; font-weight:bold;">PHƯƠNG TRÌNH EINSTEIN</span>
                            <div class="v68-latex-equation">
                                Δt_rel = +38.6 μs
                            </div>
                            <div style="font-family:monospace; font-size:14px; background:#111827; padding:8px 15px; border-radius:6px; color:#10b981; font-weight:bold;" id="v68-correction-badge">
                                CLOCK CORRECTION: ACTIVE
                            </div>
                        </div>
                        
                        <!-- Right logs console -->
                        <div class="v68-sync-log-box">
                            <div class="v68-sync-line info" id="v68-sync-log-1">[0.0s] Booting GPS navigation core...</div>
                            <div class="v68-sync-line warn" id="v68-sync-log-2">[1.5s] Dilation drift: +38.57 microseconds/day</div>
                            <div class="v68-sync-line info" id="v68-sync-log-3">[3.0s] Applying Einstein Relativistic correction factor</div>
                            <div class="v68-sync-line success" id="v68-sync-log-4">[4.5s] Clocks synchronized with atomic reference</div>
                            <div class="v68-sync-line success" id="v68-sync-log-5">[6.0s] POSITIONING COMPLETED -> ERROR: < 0.1m (OK)</div>
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
        const row = canvas.querySelector('.v68-scene-row');
        if (!row) return;

        // Slide 1: Car Navigation app drifting off road into the river with smoke & splashes
        if (slideId === 'slide_gps_intro') {
            const correctArrow = row.querySelector('#v68-nav-correct');
            const driftedArrow = row.querySelector('#v68-nav-drifted');
            const distanceEl = row.querySelector('#v68-drift-distance');
            const trailsContainer = row.querySelector('#v68-trails-container');
            const svgCorrect = row.querySelector('#v68-svg-correct');
            const svgDrifted = row.querySelector('#v68-svg-drifted');
            
            // Read target click positions (with defaults)
            const tx = parseFloat(canvas.getAttribute('data-target-x') || '228');
            const ty = parseFloat(canvas.getAttribute('data-target-y') || '80');
            
            const startX = 228;
            const startY = 460;
            
            // Correct path goes straight from (startX, startY) to target (tx, ty)
            const cx = startX + progress * (tx - startX);
            const cy = startY + progress * (ty - startY);
            
            if (correctArrow) {
                correctArrow.style.left = `${cx - 14}px`;
                correctArrow.style.top = `${cy - 14}px`;
                const rot = getAngle(startX, startY, tx, ty);
                const correctIcon = correctArrow.querySelector('svg') || correctArrow.querySelector('i');
                if (correctIcon) {
                    correctIcon.style.transform = `rotate(${rot}deg)`;
                }
            }
            
            if (svgCorrect) {
                svgCorrect.setAttribute('d', `M ${startX} ${startY} L ${cx} ${cy}`);
            }
            
            // Drifted path departs, then drifts into the river (adding X translation as progress grows)
            let dx = cx;
            let dy = cy;
            let dRot = getAngle(startX, startY, tx, ty);
            
            if (progress > 0.25) {
                const normProg = (progress - 0.25) / 0.75;
                // drift offset X: drifts into the river by moving 260px rightwards
                dx = cx + normProg * 260;
                dy = cy - normProg * 40;
                dRot = getAngle(startX, startY, tx + 260, ty - 40);
            }
            
            if (driftedArrow) {
                driftedArrow.style.left = `${dx - 14}px`;
                driftedArrow.style.top = `${dy - 14}px`;
                const driftedIcon = driftedArrow.querySelector('svg') || driftedArrow.querySelector('i');
                if (driftedIcon) {
                    driftedIcon.style.transform = `rotate(${dRot}deg)`;
                }
            }
            
            if (svgDrifted) {
                if (progress > 0.25) {
                    const dLinePivotX = startX + 0.25 * (tx - startX);
                    const dLinePivotY = startY + 0.25 * (ty - startY);
                    svgDrifted.setAttribute('d', `M ${startX} ${startY} L ${dLinePivotX} ${dLinePivotY} Q ${(dLinePivotX + dx)/2 + 30} ${(dLinePivotY + dy)/2} ${dx} ${dy}`);
                } else {
                    svgDrifted.setAttribute('d', `M ${startX} ${startY} L ${dx} ${dy}`);
                }
            }
            
            if (distanceEl) {
                const km = (progress * 11.4).toFixed(2);
                distanceEl.textContent = `${km} KM`;
            }

            // Generate smoke trail/dust particles periodically
            if (trailsContainer && Math.random() < 0.15) {
                // Correct path smoke
                const s1 = document.createElement('div');
                s1.className = 'v68-smoke-trail';
                s1.style.left = `${cx}px`;
                s1.style.top = `${cy + 15}px`;
                trailsContainer.appendChild(s1);
                
                // Drifted path smoke/water splash
                const s2 = document.createElement('div');
                if (progress > 0.8) {
                    // Water splash bubbles
                    s2.className = 'v68-splash-particle';
                    s2.style.left = `${dx + (Math.random() - 0.5) * 20}px`;
                    s2.style.top = `${dy + (Math.random() - 0.5) * 20}px`;
                } else {
                    // regular dust trail
                    s2.className = 'v68-smoke-trail';
                    s2.style.left = `${dx}px`;
                    s2.style.top = `${dy + 15}px`;
                }
                trailsContainer.appendChild(s2);

                // Fade out particles
                setTimeout(() => {
                    s1.style.transform = 'scale(2.5)';
                    s1.style.opacity = '0';
                    s1.style.transition = 'all 0.4s ease-out';
                    
                    s2.style.transform = 'scale(2.5)';
                    s2.style.opacity = '0';
                    s2.style.transition = 'all 0.4s ease-out';
                    
                    setTimeout(() => {
                        s1.remove();
                        s2.remove();
                    }, 400);
                }, 50);
            }
        }

        // Slide 2: Orbiting space satellites with dynamic laser connecting beams
        else if (slideId === 'slide_gps_satellites') {
            const s1 = row.querySelector('#v68-sat-1');
            const s2 = row.querySelector('#v68-sat-2');
            const s3 = row.querySelector('#v68-sat-3');
            
            const l1 = row.querySelector('#v68-laser-1');
            const l2 = row.querySelector('#v68-laser-2');
            const l3 = row.querySelector('#v68-laser-3');
            
            const earthBody = row.querySelector('#v68-space-earth-body');
            
            const t = progress * Math.PI * 2;
            
            // Earth coordinates (center is roughly at 400px, 210px)
            const ex = 400;
            const ey = 210;
            
            if (earthBody) {
                earthBody.style.transform = `rotate(${progress * 180}deg)`;
            }

            // Satellite 1 orbit (o1)
            let s1x = 0, s1y = 0;
            if (s1) {
                const r = 150;
                s1x = ex - 12 + Math.cos(t) * r * 0.9;
                s1y = ey - 12 + Math.sin(t) * r * 0.4;
                s1.style.left = `${s1x}px`;
                s1.style.top = `${s1y}px`;
                
                if (l1) {
                    l1.setAttribute('x1', String(s1x + 12));
                    l1.setAttribute('y1', String(s1y + 12));
                }
            }
            
            // Satellite 2 orbit (o2)
            let s2x = 0, s2y = 0;
            if (s2) {
                const r = 150;
                s2x = ex - 12 + Math.cos(t + Math.PI * 0.6) * r * 0.7;
                s2y = ey - 12 - Math.sin(t + Math.PI * 0.6) * r * 0.7;
                s2.style.left = `${s2x}px`;
                s2.style.top = `${s2y}px`;
                
                if (l2) {
                    l2.setAttribute('x1', String(s2x + 12));
                    l2.setAttribute('y1', String(s2y + 12));
                }
            }
            
            // Satellite 3 orbit (elsewhere)
            let s3x = 0, s3y = 0;
            if (s3) {
                const r = 150;
                s3x = ex - 12 - Math.cos(t * 1.5) * r * 0.6;
                s3y = ey - 12 + Math.sin(t * 1.5) * r * 0.5;
                s3.style.left = `${s3x}px`;
                s3.style.top = `${s3y}px`;
                
                if (l3) {
                    l3.setAttribute('x1', String(s3x + 12));
                    l3.setAttribute('y1', String(s3y + 12));
                }
            }
        }

        // Slide 3: Time Dilation Clock Dials + rotating analog hands
        else if (slideId === 'slide_gps_dilation') {
            const spaceVal = row.querySelector('#v68-clock-space-val');
            const earthVal = row.querySelector('#v68-clock-earth-val');
            const handSpace = row.querySelector('#v68-hand-space');
            const handEarth = row.querySelector('#v68-hand-earth');
            
            if (earthVal && spaceVal) {
                // Earth clock ticks standard microseconds
                const earthUsec = Math.round(progress * 1000000);
                let earthStr = String(earthUsec);
                while (earthStr.length < 6) earthStr = '0' + earthStr;
                earthVal.textContent = `12:00:00.${earthStr}`;
                
                // Space clock runs faster (+38.6us per day equivalent scale)
                const spaceUsec = Math.round(progress * 1000000 + progress * 120); // simulated faster speed
                let spaceStr = String(spaceUsec);
                while (spaceStr.length < 6) spaceStr = '0' + spaceStr;
                spaceVal.textContent = `12:00:00.${spaceStr}`;
            }

            // Rotate analog hands: Space clock hand spins slightly faster
            if (handEarth) {
                handEarth.style.transform = `rotate(${progress * 360}deg)`;
            }
            if (handSpace) {
                handSpace.style.transform = `rotate(${progress * 360 * 1.12}deg)`;
            }
        }

        // Slide 4: Microsecond Drift Counter board
        else if (slideId === 'slide_gps_drift') {
            const usecEl = row.querySelector('#v68-drift-usec');
            if (usecEl) {
                const val = (progress * 38.57).toFixed(6);
                usecEl.textContent = `+${val} μs`;
            }
        }

        // Slide 5: Speed of light calculation beam pulse
        else if (slideId === 'slide_gps_math') {
            const laser = row.querySelector('#v68-pulse-laser-item');
            const formula = row.querySelector('#v68-math-formula');
            
            if (laser) {
                const leftPos = (progress * 700) % 760;
                laser.style.left = `${leftPos}px`;
            }
            
            if (formula) {
                if (progress < 0.3) {
                    formula.textContent = 'Quãng đường lệch (Δd) = c × Δt';
                    formula.style.color = '#fff';
                } else if (progress >= 0.3 && progress < 0.75) {
                    formula.textContent = 'Δd = 300,000 km/s × 38.6 μs';
                    formula.style.color = '#fbbf24';
                } else {
                    formula.textContent = 'Δd = 11.58 Kilometers (Drift!)';
                    formula.style.color = '#ef4444';
                    formula.style.animation = 'v68-glitch-shake 0.15s infinite';
                }
            }
        }

        // Slide 6: Relativistic Corrections Code check
        else if (slideId === 'slide_gps_correction') {
            const timings = [0.1, 0.3, 0.5, 0.7, 0.9];
            timings.forEach((t, index) => {
                const line = row.querySelector(`#v68-sync-log-${index + 1}`);
                if (line) {
                    if (progress >= t) {
                        line.style.opacity = '1';
                    } else {
                        line.style.opacity = '0';
                    }
                }
            });
            
            const badge = row.querySelector('#v68-correction-badge');
            if (badge) {
                if (progress < 0.7) {
                    badge.textContent = 'CLOCK SYNCING...';
                    badge.style.color = '#f59e0b';
                } else {
                    badge.textContent = 'CLOCK SYNC: ACTIVE (OK)';
                    badge.style.color = '#10b981';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video68',
        topic: 'Sai lệch GPS Einstein',
        episodeNum: 68,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video68 Plugin] Loaded: Einstein relativity GPS time dilation drift simulation.');
})();
