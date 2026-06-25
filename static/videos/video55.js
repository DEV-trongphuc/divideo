/**
 * Video 55: Elevator Algorithm (SCAN Algorithm) Simulation
 * Plugin containing animations for elevator building shafts, floor passenger triggers,
 * FCFS zig-zag path traces, and SCAN algorithm linear efficiency comparisons.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_elev_1: [
            { text: 'đi xuống', start: 1.0, end: 5.5, class: 'active-red' },
            { text: 'chạy vút lên', start: 5.5, end: 10.0, class: 'active-blue' }
        ],
        slide_elev_2: [
            { text: 'ai bấm trước đi trước', start: 1.5, end: 6.5, class: 'active-red' },
            { text: 'chạy điên cuồng', start: 6.5, end: 12.0, class: 'active-red' },
            { text: 'tốn điện', start: 12.0, end: 17.5, class: 'active-red' }
        ],
        slide_elev_3: [
            { text: 'thuật toán scan', start: 1.5, end: 6.0, class: 'active-gold' },
            { text: 'một chiều', start: 6.0, end: 11.5, class: 'active-blue' },
            { text: 'quay đầu', start: 11.5, end: 16.0, class: 'active-green' }
        ],
        slide_elev_4: [
            { text: 'chín tầng', start: 2.0, end: 7.0, class: 'active-red' },
            { text: 'bốn tầng', start: 7.0, end: 11.5, class: 'active-green' },
            { text: 'năm mươi phần trăm', start: 11.5, end: 17.0, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_elev_1', 'slide_elev_2', 'slide_elev_3', 'slide_elev_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // Wrap GFX with layout zoom container
    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v55-zoom-container">${absHtml}<div class="v55-scene-content">${inner}</div></div>`;
    }

    // Floor height offsets matching Y-coordinates in building
    const floorY = {
        5: 12,
        4: 84,
        3: 156,
        2: 228,
        1: 300
    };

    // Helper: generate building HTML with custom attributes
    function makeBuildingHTML(idPrefix) {
        return `
            <div class="v55-building" id="${idPrefix}-building">
                <!-- Floor Dividers -->
                <div class="v55-floor-markings">
                    <div class="v55-floor-divider"></div>
                    <div class="v55-floor-divider"></div>
                    <div class="v55-floor-divider"></div>
                    <div class="v55-floor-divider"></div>
                </div>

                <!-- Elevator Cabin with Sliding Doors & Cabin Content -->
                <div class="v55-elevator-cabin" id="${idPrefix}-cabin" style="top: ${floorY[1]}px;">
                    <div class="v55-cabin-door left" id="${idPrefix}-door-l"></div>
                    <div class="v55-cabin-door right" id="${idPrefix}-door-r"></div>

                    <div class="v55-cabin-content">
                        <div class="v55-cabin-arrow" id="${idPrefix}-arrow">▲</div>
                        <div class="v55-cabin-indicator" id="${idPrefix}-ind">1F</div>
                        <div class="v55-cabin-passengers" id="${idPrefix}-cabin-pass"></div>
                    </div>
                </div>

                <!-- Path Trace SVG Overlay -->
                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                    <path id="${idPrefix}-path" class="v55-trace-path" d="" />
                </svg>
            </div>
        `;
    }

    // Helper: generate floor labels
    function makeFloorLabelsHTML() {
        return `
            <div class="v55-floor-labels">
                <div class="v55-floor-label">Tầng 5</div>
                <div class="v55-floor-label">Tầng 4</div>
                <div class="v55-floor-label">Tầng 3</div>
                <div class="v55-floor-label">Tầng 2</div>
                <div class="v55-floor-label">Tầng 1</div>
            </div>
        `;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_elev_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v55-scene-row">
                    <div class="v55-building-wrapper">
                        <!-- Floor Numbers on Left -->
                        ${makeFloorLabelsHTML()}

                        <!-- Building Shaft -->
                        ${makeBuildingHTML('s1')}

                        <!-- Passenger Stations on Right -->
                        <div class="v55-passenger-station" style="top: ${floorY[5]}px;" id="s1-pass-5">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn up active">▲</div>
                        </div>
                        <div class="v55-passenger-station" style="top: ${floorY[3]}px;" id="s1-pass-3">
                            <span class="v55-passenger-emoji" id="s1-pass-3-emoji">🧍</span>
                            <div class="v55-req-btn down active" id="s1-pass-3-btn">▼</div>
                        </div>
                    </div>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_elev_2') {
            canvas.innerHTML = sceneWrap(`
                <div class="v55-scene-row">
                    <div class="v55-building-wrapper" style="position: absolute; left: 100px; top: 20px;">
                        ${makeFloorLabelsHTML()}
                        ${makeBuildingHTML('s2')}

                        <!-- Passenger request indicators -->
                        <div class="v55-passenger-station" style="top: ${floorY[5]}px;" id="s2-pass-5">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn up" id="s2-btn-5">①</div>
                        </div>
                        <div class="v55-passenger-station" style="top: ${floorY[4]}px;" id="s2-pass-4">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn down" id="s2-btn-4">③</div>
                        </div>
                        <div class="v55-passenger-station" style="top: ${floorY[2]}px;" id="s2-pass-2">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn up" id="s2-btn-2">②</div>
                        </div>
                    </div>

                    <!-- Queue display board + graph -->
                    <div class="v55-glass-card glow-red" style="position:absolute; right:15px; top:50px; width:260px; height:270px; padding:16px; display:flex; flex-direction:column; gap:8px; justify-content:center; text-align:left;">
                        <span style="font-size:12px; font-weight:800; color:var(--elev-red); letter-spacing:0.8px;">FCFS QUEUE</span>
                        <span style="font-size:16px; font-weight:bold; color:#fff; line-height:1.2; margin:0;">Bấm lần lượt:</span>
                        <div style="font-family:monospace; font-size:13px; color:#ef4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); padding:8px 10px; border-radius:8px; line-height:1.5;">
                            1. Tầng 5 ➔ Đón<br>
                            2. Tầng 2 ➔ Đón<br>
                            3. Tầng 4 ➔ Đón
                        </div>
                        <div style="font-size:13px; color:#e5e7eb; font-family:sans-serif; font-weight:bold; margin-top:2px;" id="s2-distance-board">Hành trình: 0 tầng</div>
                        
                        <!-- Live Graph Container -->
                        <div class="v55-graph-container" style="height:86px; margin-top:4px;">
                            <svg class="v55-graph-svg" id="s2-graph-svg">
                                <line class="v55-graph-grid" x1="0" y1="10" x2="230" y2="10" />
                                <line class="v55-graph-grid" x1="0" y1="24" x2="230" y2="24" />
                                <line class="v55-graph-grid" x1="0" y1="38" x2="230" y2="38" />
                                <line class="v55-graph-grid" x1="0" y1="52" x2="230" y2="52" />
                                <line class="v55-graph-grid" x1="0" y1="66" x2="230" y2="66" />
                                
                                <path id="s2-graph-path" class="v55-graph-path red" d="" />
                                <circle id="s2-graph-dot" class="v55-graph-dot red" r="4.5" cx="0" cy="66" />
                            </svg>
                        </div>
                    </div>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_elev_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v55-scene-row">
                    <div class="v55-building-wrapper" style="position: absolute; left: 100px; top: 20px;">
                        ${makeFloorLabelsHTML()}
                        ${makeBuildingHTML('s3')}

                        <!-- Passenger requests (Same as FCFS but sorted by direction sweep) -->
                        <div class="v55-passenger-station" style="top: ${floorY[5]}px;">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn up" id="s3-btn-5">▲</div>
                        </div>
                        <div class="v55-passenger-station" style="top: ${floorY[4]}px;">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn down" id="s3-btn-4">▼</div>
                        </div>
                        <div class="v55-passenger-station" style="top: ${floorY[2]}px;">
                            <span class="v55-passenger-emoji">🧍</span>
                            <div class="v55-req-btn up" id="s3-btn-2">▲</div>
                        </div>
                    </div>

                    <!-- Scan status board + graph -->
                    <div class="v55-glass-card glow-green" style="position:absolute; right:15px; top:50px; width:260px; height:270px; padding:16px; display:flex; flex-direction:column; gap:8px; justify-content:center; text-align:left;">
                        <span style="font-size:12px; font-weight:800; color:var(--elev-green); letter-spacing:0.8px;">SCAN SWEEP</span>
                        <span style="font-size:16px; font-weight:bold; color:#fff; line-height:1.2; margin:0;">Quét đi lên (UP):</span>
                        <div style="font-family:monospace; font-size:13px; color:#10b981; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:8px 10px; border-radius:8px; line-height:1.5;">
                            • Quét Tầng 2 ➔ Gom<br>
                            • Quét Tầng 4 ➔ Gom<br>
                            • Quét Tầng 5 ➔ Gom
                        </div>
                        <div style="font-size:13px; color:#e5e7eb; font-family:sans-serif; font-weight:bold; margin-top:2px;" id="s3-distance-board">Hành trình: 0 tầng</div>
                        
                        <!-- Live Graph Container -->
                        <div class="v55-graph-container" style="height:86px; margin-top:4px;">
                            <svg class="v55-graph-svg" id="s3-graph-svg">
                                <line class="v55-graph-grid" x1="0" y1="10" x2="230" y2="10" />
                                <line class="v55-graph-grid" x1="0" y1="24" x2="230" y2="24" />
                                <line class="v55-graph-grid" x1="0" y1="38" x2="230" y2="38" />
                                <line class="v55-graph-grid" x1="0" y1="52" x2="230" y2="52" />
                                <line class="v55-graph-grid" x1="0" y1="66" x2="230" y2="66" />
                                
                                <path id="s3-graph-path" class="v55-graph-path green" d="" />
                                <circle id="s3-graph-dot" class="v55-graph-dot green" r="4.5" cx="0" cy="66" />
                            </svg>
                        </div>
                    </div>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_elev_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v55-scene-row" style="height: 420px; padding-top: 60px; box-sizing: border-box;">
                    <div class="v55-comparison-grid">
                        <!-- Left FCFS Column -->
                        <div class="v55-comparison-column">
                            <span class="v55-column-header fcfs">FCFS Algorithm</span>
                            ${makeBuildingHTML('s4fcfs')}
                            <div class="v55-metric-box" style="margin-top:4px; padding:6px 12px;">
                                <span class="v55-metric-val red" id="s4-fcfs-val" style="font-size:24px;">0</span>
                                <span class="v55-metric-lbl" style="font-size:9px;">TẦNG DI CHUYỂN</span>
                            </div>
                            <!-- Live FCFS Graph -->
                            <div class="v55-graph-container" style="width:230px; height:60px; margin-top:2px;">
                                <svg class="v55-graph-svg" id="s4fcfs-graph-svg">
                                    <line class="v55-graph-grid" x1="0" y1="8" x2="230" y2="8" />
                                    <line class="v55-graph-grid" x1="0" y1="18" x2="230" y2="18" />
                                    <line class="v55-graph-grid" x1="0" y1="28" x2="230" y2="28" />
                                    <line class="v55-graph-grid" x1="0" y1="38" x2="230" y2="38" />
                                    <line class="v55-graph-grid" x1="0" y1="48" x2="230" y2="48" />
                                    
                                    <path id="s4fcfs-graph-path" class="v55-graph-path red" d="" />
                                    <circle id="s4fcfs-graph-dot" class="v55-graph-dot red" r="3.5" cx="0" cy="48" />
                                </svg>
                            </div>
                        </div>

                        <div style="font-size:24px; font-weight:800; color:rgba(255,255,255,0.15); font-family:monospace; margin-top:-60px;">VS</div>

                        <!-- Right SCAN Column -->
                        <div class="v55-comparison-column">
                            <span class="v55-column-header scan">SCAN Algorithm</span>
                            ${makeBuildingHTML('s4scan')}
                            <div class="v55-metric-box" style="margin-top:4px; padding:6px 12px;">
                                <span class="v55-metric-val green" id="s4-scan-val" style="font-size:24px;">0</span>
                                <span class="v55-metric-lbl" style="font-size:9px;">TẦNG DI CHUYỂN</span>
                            </div>
                            <!-- Live SCAN Graph -->
                            <div class="v55-graph-container" style="width:230px; height:60px; margin-top:2px;">
                                <svg class="v55-graph-svg" id="s4scan-graph-svg">
                                    <line class="v55-graph-grid" x1="0" y1="8" x2="230" y2="8" />
                                    <line class="v55-graph-grid" x1="0" y1="18" x2="230" y2="18" />
                                    <line class="v55-graph-grid" x1="0" y1="28" x2="230" y2="28" />
                                    <line class="v55-graph-grid" x1="0" y1="38" x2="230" y2="38" />
                                    <line class="v55-graph-grid" x1="0" y1="48" x2="230" y2="48" />
                                    
                                    <path id="s4scan-graph-path" class="v55-graph-path green" d="" />
                                    <circle id="s4scan-graph-dot" class="v55-graph-dot green" r="3.5" cx="0" cy="48" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            initIcons();
        }
    }

    // Helper: interpolate Y position between floors with smooth pauses and transitions
    function getElevatorState(progress, path) {
        const segmentsCount = path.length - 1;
        const segmentProgress = progress * segmentsCount;
        const segmentIdx = Math.min(segmentsCount - 1, Math.floor(segmentProgress));
        const localT = segmentProgress - segmentIdx;
        
        const startFloor = path[segmentIdx];
        const endFloor = path[segmentIdx + 1];
        
        let cabinY;
        let doorsOpen = false;
        let doorsProgress = 0; // 0 = closed, 1 = open
        let boardingProgress = 0; // 0 = not boarded, 1 = inside
        
        // Define phases inside local segment:
        // 0.0 to 0.25: Paused at start floor, doors are closing (doorsProgress goes 1 -> 0)
        // 0.25 to 0.75: Elevator moving. Doors are closed (doorsProgress = 0)
        // 0.75 to 1.0: Paused at end floor, doors are opening (doorsProgress goes 0 -> 1) and boarding starts (boardingProgress goes 0 -> 1)
        
        if (localT < 0.25) {
            cabinY = floorY[startFloor];
            doorsProgress = 1 - (localT / 0.25);
            doorsOpen = doorsProgress > 0.01;
            boardingProgress = 0;
        } else if (localT > 0.75) {
            cabinY = floorY[endFloor];
            doorsProgress = (localT - 0.75) / 0.25;
            doorsOpen = doorsProgress > 0.01;
            boardingProgress = (localT - 0.75) / 0.25;
        } else {
            // Moving phase (0.25 to 0.75)
            const moveT = (localT - 0.25) / 0.5; // normalized 0 to 1
            // Ease in-out transition
            const smoothT = moveT * moveT * (3 - 2 * moveT);
            cabinY = floorY[startFloor] + smoothT * (floorY[endFloor] - floorY[startFloor]);
            doorsProgress = 0;
            doorsOpen = false;
            boardingProgress = 0;
        }
        
        return {
            cabinY,
            doorsOpen,
            doorsProgress,
            boardingProgress,
            startFloor,
            endFloor,
            segmentIdx
        };
    }

    // Helper: draw SVG path inside the building (representing physical cabin wire path)
    function drawSVGPath(svgPathEl, cabinX, floorSeq, currentProgress) {
        if (!svgPathEl) return;
        const segmentsCount = floorSeq.length - 1;
        const segmentProgress = currentProgress * segmentsCount;
        const activeIdx = Math.floor(segmentProgress);

        let d = `M ${cabinX} ${floorY[floorSeq[0]] + 26}`; // Center of starting cabin
        
        // Draw completed segments
        for (let i = 0; i < activeIdx; i++) {
            d += ` L ${cabinX} ${floorY[floorSeq[i + 1]] + 26}`;
        }
        
        // Draw active segment up to current progress
        if (activeIdx < segmentsCount) {
            const currentState = getElevatorState(currentProgress, floorSeq);
            d += ` L ${cabinX} ${currentState.cabinY + 26}`;
        }
        
        svgPathEl.setAttribute('d', d);
    }

    // Helper: draw time-series graph path
    function updateLiveGraph(svgPathEl, svgDotEl, graphWidth, graphHeight, floorSeq, currentProgress, maxDistance) {
        if (!svgPathEl) return;
        
        const getGraphY = (yVal) => {
            // yVal is in range [floorY[5]=15, floorY[1]=247]
            // Map linearly to graph canvas height [6, graphHeight - 6]
            const yPercent = (yVal - floorY[5]) / (floorY[1] - floorY[5]);
            return 6 + yPercent * (graphHeight - 12);
        };
        
        let d = '';
        const steps = 100;
        const currentStep = Math.floor(currentProgress * steps);
        
        for (let i = 0; i <= currentStep; i++) {
            const t = i / steps;
            const x = t * graphWidth;
            const state = getElevatorState(t, floorSeq);
            const y = getGraphY(state.cabinY);
            if (i === 0) {
                d += `M ${x} ${y}`;
            } else {
                d += ` L ${x} ${y}`;
            }
        }
        
        // Add final point exactly at currentProgress
        if (currentProgress > 0) {
            const x = currentProgress * graphWidth;
            const state = getElevatorState(currentProgress, floorSeq);
            const y = getGraphY(state.cabinY);
            if (d === '') {
                d += `M ${x} ${y}`;
            } else {
                d += ` L ${x} ${y}`;
            }
            
            // Update dot position
            if (svgDotEl) {
                svgDotEl.setAttribute('cx', x);
                svgDotEl.setAttribute('cy', y);
                svgDotEl.style.display = 'block';
            }
        } else {
            const state = getElevatorState(0, floorSeq);
            const y = getGraphY(state.cabinY);
            d += `M 0 ${y}`;
            if (svgDotEl) {
                svgDotEl.setAttribute('cx', 0);
                svgDotEl.setAttribute('cy', y);
                svgDotEl.style.display = 'block';
            }
        }
        
        svgPathEl.setAttribute('d', d);
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_elev_1') {
            const status = canvas.querySelector('#v55-s1-status');
            const cabin = canvas.querySelector('#s1-cabin');
            const arrow = canvas.querySelector('#s1-arrow');
            const indicator = canvas.querySelector('#s1-ind');
            const cabinPass = canvas.querySelector('#s1-cabin-pass');
            const doorL = canvas.querySelector('#s1-door-l');
            const doorR = canvas.querySelector('#s1-door-r');
            
            const pass5Emoji = canvas.querySelector('#s1-pass-5');
            const pass3Emoji = canvas.querySelector('#s1-pass-3-emoji');
            const pass3Btn = canvas.querySelector('#s1-pass-3-btn');

            // Path: 2 -> 5 -> 3 -> 1
            const path = [2, 5, 3, 1];
            const state = getElevatorState(progress, path);

            if (cabin) {
                cabin.style.top = `${state.cabinY}px`;
                
                // Doors
                if (doorL) doorL.style.transform = `translateX(${-state.doorsProgress * 100}%)`;
                if (doorR) doorR.style.transform = `translateX(${state.doorsProgress * 100}%)`;

                cabin.classList.remove('moving-up', 'moving-down');
                if (!state.doorsOpen) {
                    cabin.classList.add(state.endFloor > state.startFloor ? 'moving-up' : 'moving-down');
                    if (arrow) arrow.textContent = state.endFloor > state.startFloor ? '▲' : '▼';
                } else {
                    if (arrow) arrow.textContent = '■';
                }

                if (indicator) {
                    const floorNum = Math.round(5 - (state.cabinY - floorY[5]) / 72);
                    indicator.textContent = `${floorNum}F`;
                }
            }

            const p5Emoji = pass5Emoji ? pass5Emoji.querySelector('.v55-passenger-emoji') : null;
            const p5Btn = pass5Emoji ? pass5Emoji.querySelector('.v55-req-btn') : null;

            // Reset defaults
            if (p5Emoji) { p5Emoji.style.transform = 'translateX(0)'; p5Emoji.style.opacity = '1'; }
            if (pass3Emoji) { pass3Emoji.style.transform = 'translateX(0)'; pass3Emoji.style.opacity = '1'; }

            // Segment 0: 2 -> 5
            if (state.segmentIdx === 0) {
                if (cabinPass) cabinPass.textContent = '';
                if (p5Btn) p5Btn.classList.add('active');
                
                if (pass3Emoji) {
                    pass3Emoji.textContent = progress > 0.15 ? '❓' : '🧍';
                    pass3Emoji.style.transform = progress > 0.15 ? 'scale(1.2)' : 'scale(1)';
                }
                if (pass3Btn) pass3Btn.classList.add('active');

                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (p5Emoji) {
                        p5Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        p5Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) {
                        cabinPass.textContent = '🧍';
                        cabinPass.style.opacity = `${boardVal}`;
                    }
                }

                if (status) status.textContent = 'Bạn đứng ở tầng 3 bấm đi xuống, nhưng cabin lại vút thẳng lên tầng 5 trước?';
            }
            // Segment 1: 5 -> 3
            else if (state.segmentIdx === 1) {
                if (p5Emoji) p5Emoji.style.opacity = '0';
                if (p5Btn) p5Btn.classList.remove('active');

                if (pass3Emoji) {
                    pass3Emoji.textContent = '😠';
                    pass3Emoji.style.transform = 'scale(1.15)';
                }
                if (pass3Btn) pass3Btn.classList.add('active');

                if (cabinPass) cabinPass.textContent = '🧍';

                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass3Emoji) {
                        pass3Emoji.textContent = '😊';
                        pass3Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass3Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) {
                        cabinPass.textContent = '🧍🧍';
                        cabinPass.style.opacity = '1';
                    }
                }

                if (status) status.textContent = 'Không phải thang lỗi đâu! Thang đang chạy theo quy trình tối ưu quét một chiều.';
            }
            // Segment 2: 3 -> 1
            else {
                if (p5Emoji) p5Emoji.style.opacity = '0';
                if (pass3Emoji) pass3Emoji.style.opacity = '0';
                if (pass3Btn) pass3Btn.classList.remove('active');

                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (cabinPass) {
                        cabinPass.style.transform = `translateX(${-boardVal * 100}px)`;
                        cabinPass.style.opacity = `${1 - boardVal}`;
                    }
                } else {
                    if (cabinPass) {
                        cabinPass.textContent = '🧍🧍';
                        cabinPass.style.transform = 'translateX(0)';
                        cabinPass.style.opacity = '1';
                    }
                }

                if (status) status.textContent = 'Khi đi ngang qua tầng 3, thang mới đón bạn và đi xuống tầng 1. Bạn vui vẻ lên cabin.';
            }
        }
        else if (slideId === 'slide_elev_2') {
            const status = canvas.querySelector('#v55-s2-status');
            const cabin = canvas.querySelector('#s2-cabin');
            const arrow = canvas.querySelector('#s2-arrow');
            const indicator = canvas.querySelector('#s2-ind');
            const svgPath = canvas.querySelector('#s2-path');
            const distBoard = canvas.querySelector('#s2-distance-board');
            
            const doorL = canvas.querySelector('#s2-door-l');
            const doorR = canvas.querySelector('#s2-door-r');
            const cabinPass = canvas.querySelector('#s2-cabin-pass');

            const btn5 = canvas.querySelector('#s2-btn-5');
            const btn2 = canvas.querySelector('#s2-btn-2');
            const btn4 = canvas.querySelector('#s2-btn-4');

            const pass5Emoji = canvas.querySelector('#s2-pass-5 .v55-passenger-emoji');
            const pass4Emoji = canvas.querySelector('#s2-pass-4 .v55-passenger-emoji');
            const pass2Emoji = canvas.querySelector('#s2-pass-2 .v55-passenger-emoji');

            const path = [1, 5, 2, 4];
            const state = getElevatorState(progress, path);

            if (cabin) {
                cabin.style.top = `${state.cabinY}px`;
                
                // Doors
                if (doorL) doorL.style.transform = `translateX(${-state.doorsProgress * 100}%)`;
                if (doorR) doorR.style.transform = `translateX(${state.doorsProgress * 100}%)`;

                cabin.classList.remove('moving-up', 'moving-down');
                if (!state.doorsOpen) {
                    cabin.classList.add(state.endFloor > state.startFloor ? 'moving-up' : 'moving-down');
                    if (arrow) arrow.textContent = state.endFloor > state.startFloor ? '▲' : '▼';
                } else {
                    if (arrow) arrow.textContent = '■';
                }

                if (indicator) {
                    const floorNum = Math.round(5 - (state.cabinY - floorY[5]) / 72);
                    indicator.textContent = `${floorNum}F`;
                }
            }

            drawSVGPath(svgPath, 80, path, progress);
            svgPath.setAttribute('class', 'v55-trace-path red');

            const graphPath = canvas.querySelector('#s2-graph-path');
            const graphDot = canvas.querySelector('#s2-graph-dot');
            updateLiveGraph(graphPath, graphDot, 230, 76, path, progress, 9);

            const totalDistance = 9;
            const currentDist = Math.min(totalDistance, (progress * totalDistance).toFixed(1));
            if (distBoard) {
                distBoard.textContent = `Hành trình di chuyển: ${currentDist} tầng`;
            }

            // Reset emoji position
            if (pass5Emoji) { pass5Emoji.style.transform = 'translateX(0)'; pass5Emoji.style.opacity = '1'; }
            if (pass4Emoji) { pass4Emoji.style.transform = 'translateX(0)'; pass4Emoji.style.opacity = '1'; }
            if (pass2Emoji) { pass2Emoji.style.transform = 'translateX(0)'; pass2Emoji.style.opacity = '1'; }

            if (btn5) btn5.classList.add('active', 'up');
            if (btn2) btn2.classList.add('active', 'up');
            if (btn4) btn4.classList.add('active', 'down');

            // Segment 0: 1 -> 5
            if (state.segmentIdx === 0) {
                if (cabinPass) cabinPass.textContent = '';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass5Emoji) {
                        pass5Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass5Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍'; cabinPass.style.opacity = `${boardVal}`; }
                }
            }
            // Segment 1: 5 -> 2
            else if (state.segmentIdx === 1) {
                if (pass5Emoji) pass5Emoji.style.opacity = '0';
                if (btn5) btn5.classList.remove('active', 'up');

                if (cabinPass) cabinPass.textContent = '🧍';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass2Emoji) {
                        pass2Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass2Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍🧍'; cabinPass.style.opacity = '1'; }
                }
            }
            // Segment 2: 2 -> 4
            else {
                if (pass5Emoji) pass5Emoji.style.opacity = '0';
                if (pass2Emoji) pass2Emoji.style.opacity = '0';
                if (btn5) btn5.classList.remove('active', 'up');
                if (btn2) btn2.classList.remove('active', 'up');

                if (cabinPass) cabinPass.textContent = '🧍🧍';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass4Emoji) {
                        pass4Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass4Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍🧍🧍'; cabinPass.style.opacity = '1'; }
                }
            }

            if (progress >= 0.98) {
                if (btn4) btn4.classList.remove('active', 'down');
                if (pass4Emoji) pass4Emoji.style.opacity = '0';
            }

            if (progress <= 0.5) {
                if (status) status.textContent = 'Nếu xử lý theo FCFS, cabin phải leo thẳng từ tầng 1 lên 5, rồi lập tức xuống tầng 2.';
            } else {
                if (status) status.textContent = 'Hành trình chạy giật cục này làm thang di chuyển tới 9 tầng, cực kỳ hao mòn và tốn điện.';
            }
        }
        else if (slideId === 'slide_elev_3') {
            const status = canvas.querySelector('#v55-s3-status');
            const cabin = canvas.querySelector('#s3-cabin');
            const arrow = canvas.querySelector('#s3-arrow');
            const indicator = canvas.querySelector('#s3-ind');
            const svgPath = canvas.querySelector('#s3-path');
            const distBoard = canvas.querySelector('#s3-distance-board');
            
            const doorL = canvas.querySelector('#s3-door-l');
            const doorR = canvas.querySelector('#s3-door-r');
            const cabinPass = canvas.querySelector('#s3-cabin-pass');

            const btn2 = canvas.querySelector('#s3-btn-2');
            const btn4 = canvas.querySelector('#s3-btn-4');
            const btn5 = canvas.querySelector('#s3-btn-5');

            const pass2Emoji = btn2 ? btn2.parentNode.querySelector('.v55-passenger-emoji') : null;
            const pass4Emoji = btn4 ? btn4.parentNode.querySelector('.v55-passenger-emoji') : null;
            const pass5Emoji = btn5 ? btn5.parentNode.querySelector('.v55-passenger-emoji') : null;

            const path = [1, 2, 4, 5];
            const state = getElevatorState(progress, path);

            if (cabin) {
                cabin.style.top = `${state.cabinY}px`;
                
                // Doors
                if (doorL) doorL.style.transform = `translateX(${-state.doorsProgress * 100}%)`;
                if (doorR) doorR.style.transform = `translateX(${state.doorsProgress * 100}%)`;

                cabin.classList.remove('moving-up', 'moving-down');
                if (!state.doorsOpen) {
                    cabin.classList.add(state.endFloor > state.startFloor ? 'moving-up' : 'moving-down');
                    if (arrow) arrow.textContent = state.endFloor > state.startFloor ? '▲' : '▼';
                } else {
                    if (arrow) arrow.textContent = '■';
                }

                if (indicator) {
                    const floorNum = Math.round(5 - (state.cabinY - floorY[5]) / 72);
                    indicator.textContent = `${floorNum}F`;
                }
            }

            drawSVGPath(svgPath, 80, path, progress);
            svgPath.setAttribute('class', 'v55-trace-path green');

            const graphPath = canvas.querySelector('#s3-graph-path');
            const graphDot = canvas.querySelector('#s3-graph-dot');
            updateLiveGraph(graphPath, graphDot, 230, 76, path, progress, 4);

            const totalDistance = 4;
            const currentDist = Math.min(totalDistance, (progress * totalDistance).toFixed(1));
            if (distBoard) {
                distBoard.textContent = `Hành trình di chuyển: ${currentDist} tầng`;
            }

            if (pass2Emoji) { pass2Emoji.style.transform = 'translateX(0)'; pass2Emoji.style.opacity = '1'; }
            if (pass4Emoji) { pass4Emoji.style.transform = 'translateX(0)'; pass4Emoji.style.opacity = '1'; }
            if (pass5Emoji) { pass5Emoji.style.transform = 'translateX(0)'; pass5Emoji.style.opacity = '1'; }

            if (btn2) btn2.classList.add('active', 'up');
            if (btn4) btn4.classList.add('active', 'down');
            if (btn5) btn5.classList.add('active', 'up');

            // Segment 0: 1 -> 2
            if (state.segmentIdx === 0) {
                if (cabinPass) cabinPass.textContent = '';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass2Emoji) {
                        pass2Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass2Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍'; cabinPass.style.opacity = `${boardVal}`; }
                }
            }
            // Segment 1: 2 -> 4
            else if (state.segmentIdx === 1) {
                if (pass2Emoji) pass2Emoji.style.opacity = '0';
                if (btn2) btn2.classList.remove('active', 'up');

                if (cabinPass) cabinPass.textContent = '🧍';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass4Emoji) {
                        pass4Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass4Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍🧍'; cabinPass.style.opacity = '1'; }
                }
            }
            // Segment 2: 4 -> 5
            else {
                if (pass2Emoji) pass2Emoji.style.opacity = '0';
                if (pass4Emoji) pass4Emoji.style.opacity = '0';
                if (btn2) btn2.classList.remove('active', 'up');
                if (btn4) btn4.classList.remove('active', 'down');

                if (cabinPass) cabinPass.textContent = '🧍🧍';
                if (state.doorsOpen && state.doorsProgress > 0.5) {
                    const boardVal = state.boardingProgress;
                    if (pass5Emoji) {
                        pass5Emoji.style.transform = `translateX(${-boardVal * 115}px) scale(${1 - boardVal * 0.2})`;
                        pass5Emoji.style.opacity = `${1 - boardVal}`;
                    }
                    if (cabinPass) { cabinPass.textContent = '🧍🧍🧍'; cabinPass.style.opacity = '1'; }
                }
            }

            if (progress >= 0.98) {
                if (btn5) btn5.classList.remove('active', 'up');
                if (pass5Emoji) pass5Emoji.style.opacity = '0';
            }

            if (progress <= 0.5) {
                if (status) status.textContent = 'Với SCAN, cabin quét liên tục đi lên: gom khách tầng 2, rồi tầng 4, rồi tầng 5.';
            } else {
                if (status) status.textContent = 'Mọi người được đón nhịp nhàng, tổng quãng đường đi chỉ là 4 tầng, tối ưu cực lớn!';
            }
        }
        else if (slideId === 'slide_elev_4') {
            const status = canvas.querySelector('#v55-s4-status');
            
            const cabinFcfs = canvas.querySelector('#s4fcfs-cabin');
            const arrowFcfs = canvas.querySelector('#s4fcfs-arrow');
            const indFcfs = canvas.querySelector('#s4fcfs-ind');
            const svgFcfs = canvas.querySelector('#s4fcfs-path');
            const valFcfs = canvas.querySelector('#s4-fcfs-val');
            
            const doorFcfsL = canvas.querySelector('#s4fcfs-door-l');
            const doorFcfsR = canvas.querySelector('#s4fcfs-door-r');
            const cabinFcfsPass = canvas.querySelector('#s4fcfs-cabin-pass');

            const cabinScan = canvas.querySelector('#s4scan-cabin');
            const arrowScan = canvas.querySelector('#s4scan-arrow');
            const indScan = canvas.querySelector('#s4scan-ind');
            const svgScan = canvas.querySelector('#s4scan-path');
            const valScan = canvas.querySelector('#s4-scan-val');
            
            const doorScanL = canvas.querySelector('#s4scan-door-l');
            const doorScanR = canvas.querySelector('#s4scan-door-r');
            const cabinScanPass = canvas.querySelector('#s4scan-cabin-pass');

            const loopT = (progress * 2) % 1.0;

            // FCFS: 1 -> 5 -> 2 -> 4
            const pathFcfs = [1, 5, 2, 4];
            const stateFcfs = getElevatorState(loopT, pathFcfs);
            
            if (cabinFcfs) {
                cabinFcfs.style.top = `${stateFcfs.cabinY}px`;
                if (doorFcfsL) doorFcfsL.style.transform = `translateX(${-stateFcfs.doorsProgress * 100}%)`;
                if (doorFcfsR) doorFcfsR.style.transform = `translateX(${stateFcfs.doorsProgress * 100}%)`;

                cabinFcfs.classList.remove('moving-up', 'moving-down');
                if (!stateFcfs.doorsOpen) {
                    cabinFcfs.classList.add(stateFcfs.endFloor > stateFcfs.startFloor ? 'moving-up' : 'moving-down');
                    if (arrowFcfs) arrowFcfs.textContent = stateFcfs.endFloor > stateFcfs.startFloor ? '▲' : '▼';
                } else {
                    if (arrowFcfs) arrowFcfs.textContent = '■';
                }
                if (indFcfs) indFcfs.textContent = `${Math.round(5 - (stateFcfs.cabinY - floorY[5]) / 72)}F`;
            }
            
            drawSVGPath(svgFcfs, 80, pathFcfs, loopT);
            svgFcfs.setAttribute('class', 'v55-trace-path red');
            
            const graphPathFcfs = canvas.querySelector('#s4fcfs-graph-path');
            const graphDotFcfs = canvas.querySelector('#s4fcfs-graph-dot');
            updateLiveGraph(graphPathFcfs, graphDotFcfs, 230, 60, pathFcfs, loopT, 9);
            
            if (valFcfs) valFcfs.textContent = Math.round(loopT * 9);
            
            if (cabinFcfsPass) {
                if (stateFcfs.segmentIdx === 0) {
                    cabinFcfsPass.textContent = stateFcfs.doorsOpen ? '🧍' : '';
                } else if (stateFcfs.segmentIdx === 1) {
                    cabinFcfsPass.textContent = stateFcfs.doorsOpen ? '🧍🧍' : '🧍';
                } else {
                    cabinFcfsPass.textContent = stateFcfs.doorsOpen ? '🧍🧍🧍' : '🧍🧍';
                }
            }

            // SCAN: 1 -> 2 -> 4 -> 5
            const pathScan = [1, 2, 4, 5];
            const stateScan = getElevatorState(loopT, pathScan);
            
            if (cabinScan) {
                cabinScan.style.top = `${stateScan.cabinY}px`;
                if (doorScanL) doorScanL.style.transform = `translateX(${-stateScan.doorsProgress * 100}%)`;
                if (doorScanR) doorScanR.style.transform = `translateX(${stateScan.doorsProgress * 100}%)`;

                cabinScan.classList.remove('moving-up', 'moving-down');
                if (!stateScan.doorsOpen) {
                    cabinScan.classList.add(stateScan.endFloor > stateScan.startFloor ? 'moving-up' : 'moving-down');
                    if (arrowScan) arrowScan.textContent = stateScan.endFloor > stateScan.startFloor ? '▲' : '▼';
                } else {
                    if (arrowScan) arrowScan.textContent = '■';
                }
                if (indScan) indScan.textContent = `${Math.round(5 - (stateScan.cabinY - floorY[5]) / 72)}F`;
            }
            
            drawSVGPath(svgScan, 80, pathScan, loopT);
            svgScan.setAttribute('class', 'v55-trace-path green');
            
            const graphPathScan = canvas.querySelector('#s4scan-graph-path');
            const graphDotScan = canvas.querySelector('#s4scan-graph-dot');
            updateLiveGraph(graphPathScan, graphDotScan, 230, 60, pathScan, loopT, 4);
            
            if (valScan) valScan.textContent = Math.round(loopT * 4);
            
            if (cabinScanPass) {
                if (stateScan.segmentIdx === 0) {
                    cabinScanPass.textContent = stateScan.doorsOpen ? '🧍' : '';
                } else if (stateScan.segmentIdx === 1) {
                    cabinScanPass.textContent = stateScan.doorsOpen ? '🧍🧍' : '🧍';
                } else {
                    cabinScanPass.textContent = stateScan.doorsOpen ? '🧍🧍🧍' : '🧍🧍';
                }
            }

            if (progress <= 0.5) {
                if (status) status.textContent = 'SCAN giúp giảm số lần đảo chiều động cơ đột ngột và tiết kiệm tới 55% điện năng.';
            } else {
                if (status) status.textContent = 'Thuật toán này cũng được sử dụng trong lập trình đọc ghi ổ cứng máy tính (Disk Scheduling).';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video55',
        topic: 'Elevator Algorithm'
    };

    console.log('[Video55 Plugin] Loaded: Elevator SCAN Algorithm slides registered.');
})();
