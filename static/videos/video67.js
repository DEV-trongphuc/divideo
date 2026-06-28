/**
 * Video 67: Ariane 5 Rocket Explosion (Integer Overflow)
 * Custom slides detailing the €370M software disaster in 1996.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_ariane_intro: [
            { text: 'trị giá 370 triệu Đô', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'phát nổ thành một quả cầu lửa', start: 8.5, end: 11.5, class: 'active-yellow' }
        ],
        slide_ariane_stats: [
            { text: 'lỗi phần mềm đắt đỏ nhất', start: 3.0, end: 6.5, class: 'active-red' },
            { text: 'hoạt động hoàn hảo', start: 7.5, end: 10.5, class: 'active-green' }
        ],
        slide_ariane_code: [
            { text: 'dòng code điều hướng', start: 2.5, end: 5.5, class: 'active-cyan' },
            { text: 'ép kiểu vận tốc ngang', start: 7.0, end: 11.0, class: 'active-yellow' }
        ],
        slide_ariane_overflow: [
            { text: 'tối đa là 32767', start: 3.5, end: 6.5, class: 'active-yellow' },
            { text: 'đảo ngược thành âm 32768', start: 7.5, end: 11.5, class: 'active-red' }
        ],
        slide_ariane_failure: [
            { text: 'lệch quỹ đạo nghiêm trọng', start: 3.5, end: 7.0, class: 'active-red' },
            { text: 'xoay ngoặt các vòi phun', start: 8.0, end: 11.0, class: 'active-cyan' }
        ],
        slide_ariane_destruction: [
            { text: 'lực cản không khí cực lớn', start: 3.0, end: 6.0, class: 'active-yellow' },
            { text: 'tự hủy toàn bộ', start: 7.0, end: 10.5, class: 'active-red' }
        ]
    };

    const customSlideIds = [
        'slide_ariane_intro', 'slide_ariane_stats', 'slide_ariane_code', 
        'slide_ariane_overflow', 'slide_ariane_failure', 'slide_ariane_destruction'
    ];

    function sceneWrap(inner) {
        return `<div class="v67-zoom-container"><div class="v67-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: Rocket launching with scrolling sky
        if (slideId === 'slide_ariane_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-sky-container">
                        <div class="v67-sky-clouds scrolling"></div>
                        <div class="v67-ariane-rocket" id="v67-intro-rocket">
                            <div class="v67-rocket-body"></div>
                            <div class="v67-booster left"></div>
                            <div class="v67-booster right"></div>
                            <div class="v67-fire"></div>
                            <div class="v67-booster-fire left"></div>
                            <div class="v67-booster-fire right"></div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 2: Launch Stats card grid
        else if (slideId === 'slide_ariane_stats') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-stats-grid">
                        <div class="v67-stat-card">
                            <div class="v67-stat-val" id="v67-stats-time">0s</div>
                            <div class="v67-stat-lbl">THỜI GIAN BAY</div>
                        </div>
                        <div class="v67-stat-card">
                            <div class="v67-stat-val" id="v67-stats-cost">$0M</div>
                            <div class="v67-stat-lbl">THIỆT HẠI TÀI SẢN</div>
                        </div>
                        <div class="v67-stat-card">
                            <div class="v67-stat-val" id="v67-stats-status" style="color:#22c55e;">NOMINAL</div>
                            <div class="v67-stat-lbl">TRẠNG THÁI HỆ THỐNG</div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 3: Code window downcast
        else if (slideId === 'slide_ariane_code') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-code-window">
                        <div class="v67-code-header">
                            <div class="v67-code-dots">
                                <div class="v67-code-dot close"></div>
                                <div class="v67-code-dot min"></div>
                                <div class="v67-code-dot max"></div>
                            </div>
                            <span style="font-family:monospace; font-size:12px; color:#64748b; margin-left:20px;">ariane5_nav.c</span>
                        </div>
                        <div class="v67-code-body">
                            <div class="v67-code-line"><span class="v67-code-comment">// Vận tốc ngang dùng số thực 64-bit chính xác cao</span></div>
                            <div class="v67-code-line"><span class="v67-code-type">double</span> <span class="v67-code-var">horizontal_velocity_64bit</span> = <span class="v67-code-var">32768.45</span>;</div>
                            <div class="v67-code-line"><span class="v67-code-comment">// ...</span></div>
                            <div class="v67-code-line highlight" id="v67-code-bug-line">
                                <span class="v67-code-type">int16_t</span> <span class="v67-code-var">horizontal_velocity_16bit</span> = (<span class="v67-code-type">int16_t</span>)<span class="v67-code-var">horizontal_velocity_64bit</span>;
                            </div>
                            <div class="v67-code-line"><span class="v67-code-comment">// ⚠️ Ép kiểu không kiểm tra giới hạn biên (overflow validation)</span></div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Overflow Display Panel
        else if (slideId === 'slide_ariane_overflow') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-overflow-panel">
                        <div class="v67-counter-board">
                            <span class="v67-counter-label">64-BIT FLOAT (ORIGINAL):</span>
                            <span class="v67-counter-num" style="color:#06b6d4;" id="v67-overflow-float">32700.00</span>
                        </div>
                        <div class="v67-counter-board" style="border-color:#b91c1c;">
                            <span class="v67-counter-label">16-BIT INTEGER (DOWNCASTED):</span>
                            <span class="v67-counter-num" id="v67-overflow-int">32700</span>
                        </div>
                        <div style="font-family:monospace; font-size:16px; color:#ef4444; font-weight:bold; opacity:0; text-align:center;" id="v67-overflow-warning">
                            ⚠️ INTEGER OVERFLOW DETECTED! VALUE WRAPPED AROUND!
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 5: Aerodynamic Stress Meter & Nozzle Tilting
        else if (slideId === 'slide_ariane_failure') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-stress-panel">
                        <!-- Thrust vectoring nozzle direction HUD -->
                        <div class="v67-thrust-hud">
                            <div class="v67-hud-nozzle" id="v67-failure-nozzle">
                                <div style="position:absolute; bottom:-40px; left:17px; width:16px; height:40px; background:linear-gradient(180deg, #ffaa00, transparent); border-radius:50% 50% 0 0;"></div>
                            </div>
                            <span style="position:absolute; top:12px; font-family:monospace; font-size:12px; color:var(--v67-cyan); font-weight:bold;">THRUST ANGLE: <strong id="v67-failure-angle">0°</strong></span>
                        </div>
                        
                        <!-- Stress bar -->
                        <div class="v67-stress-gauge">
                            <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:14px; font-weight:bold;">
                                <span>AERODYNAMIC STRESS</span>
                                <span style="color:#ef4444;" id="v67-failure-stress-val">10%</span>
                            </div>
                            <div class="v67-gauge-bar-outer">
                                <div class="v67-gauge-bar-inner" id="v67-failure-bar"></div>
                            </div>
                            <div style="font-family:monospace; font-size:12px; color:#94a3b8; line-height:1.4;">
                                Vòi phun động cơ nghiêng cực đại bẻ lái đột ngột tạo lực cản không khí khổng lồ đè nén lên vỏ.
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: Self-destruction Explosion effect
        else if (slideId === 'slide_ariane_destruction') {
            canvas.innerHTML = sceneWrap(`
                <div class="v67-scene-row">
                    <div class="v67-sky-container" style="background:#020617;">
                        <!-- Damaged rocket structure -->
                        <div class="v67-ariane-rocket" id="v67-destruct-rocket" style="transform:translateY(30px) rotate(25deg);">
                            <div class="v67-rocket-body" style="background:linear-gradient(90deg, #94a3b8, #cbd5e1); border-radius:0 15px 0 0;"></div>
                            <div class="v67-booster left" style="transform:rotate(-15deg); left:-15px;"></div>
                            <div class="v67-booster right" style="transform:rotate(15deg); right:-15px;"></div>
                        </div>
                        
                        <!-- Exploding particles -->
                        <div class="v67-fireball-particle" id="v67-fire-1" style="width:120px; height:120px; top:120px; left:350px;"></div>
                        <div class="v67-fireball-particle" id="v67-fire-2" style="width:150px; height:150px; top:200px; left:410px;"></div>
                        <div class="v67-fireball-particle" id="v67-fire-3" style="width:180px; height:180px; top:150px; left:380px;"></div>
                        
                        <!-- Flash screen -->
                        <div class="v67-explosion-overlay" id="v67-destruct-overlay"></div>
                    </div>
                </div>
            `);
        }
    }

    // ── FRAME UPDATE ANIMATIONS ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v67-scene-row');
        if (!row) return;

        // Slide 1: Rocket launches upward, clouds scroll down
        if (slideId === 'slide_ariane_intro') {
            const rocket = row.querySelector('#v67-intro-rocket');
            if (rocket) {
                const yPos = 240 - progress * 320; // Flight path upward
                const wiggle = Math.sin(progress * 120) * 1.5;
                rocket.style.transform = `translateY(${yPos}px) translateX(${wiggle}px)`;
            }
        }

        // Slide 2: Stats card count-up values
        else if (slideId === 'slide_ariane_stats') {
            const timeEl = row.querySelector('#v67-stats-time');
            const costEl = row.querySelector('#v67-stats-cost');
            const statusEl = row.querySelector('#v67-stats-status');
            
            if (timeEl) {
                const sec = Math.round(progress * 37);
                timeEl.textContent = `${sec}s`;
            }
            
            if (costEl) {
                const cost = Math.round(progress * 370);
                costEl.textContent = `$${cost}M`;
            }
            
            if (statusEl) {
                if (progress < 0.6) {
                    statusEl.textContent = 'NOMINAL';
                    statusEl.style.color = '#22c55e';
                } else if (progress >= 0.6 && progress < 0.85) {
                    statusEl.textContent = 'WARNING';
                    statusEl.style.color = '#eab308';
                } else {
                    statusEl.textContent = 'CRITICAL FAILURE';
                    statusEl.style.color = '#ef4444';
                    statusEl.style.textShadow = '0 0 10px rgba(239,68,68,0.5)';
                }
            }
        }

        // Slide 3: Code highlight flicker
        else if (slideId === 'slide_ariane_code') {
            const line = row.querySelector('#v67-code-bug-line');
            if (line) {
                const blink = Math.sin(progress * 15) > 0;
                if (blink) {
                    line.style.background = 'rgba(239, 68, 68, 0.25)';
                } else {
                    line.style.background = 'rgba(239, 68, 68, 0.1)';
                }
            }
        }

        // Slide 4: Integer Overflow value wraps around
        else if (slideId === 'slide_ariane_overflow') {
            const floatEl = row.querySelector('#v67-overflow-float');
            const intEl = row.querySelector('#v67-overflow-int');
            const warning = row.querySelector('#v67-overflow-warning');
            
            if (progress < 0.5) {
                const normProg = progress / 0.5;
                const floatVal = 32700 + normProg * 67; // counts from 32700 to 32767
                const intVal = Math.round(floatVal);
                
                if (floatEl) floatEl.textContent = floatVal.toFixed(2);
                if (intEl) {
                    intEl.textContent = intVal;
                    intEl.className = 'v67-counter-num';
                }
                if (warning) warning.style.opacity = '0';
            } else {
                // Instantly overflows at 0.5 progress!
                const normProg = (progress - 0.5) / 0.5;
                const floatVal = 32767 + normProg * 1000; // continues growing up to 33767
                
                // Int wraps to -32768, then increments up from there
                const wrappedVal = Math.round(-32768 + normProg * 1000);
                
                if (floatEl) floatEl.textContent = floatVal.toFixed(2);
                if (intEl) {
                    intEl.textContent = wrappedVal;
                    intEl.classList.add('overflow-active');
                }
                if (warning) {
                    warning.style.opacity = Math.sin(progress * 40) > 0 ? '1' : '0.2';
                }
            }
        }

        // Slide 5: Nozzle tilting & stress meter rise
        else if (slideId === 'slide_ariane_failure') {
            const nozzle = row.querySelector('#v67-failure-nozzle');
            const angleEl = row.querySelector('#v67-failure-angle');
            const bar = row.querySelector('#v67-failure-bar');
            const stressEl = row.querySelector('#v67-failure-stress-val');
            
            if (nozzle && angleEl) {
                // Tilt nozzle to 38 degrees
                const angle = Math.min(38, progress * 80);
                nozzle.style.transform = `rotate(${angle}deg)`;
                angleEl.textContent = `${Math.round(angle)}°`;
            }
            
            if (bar && stressEl) {
                // Stress rises up to 100%
                const pct = Math.min(100, Math.round(progress * 130));
                bar.style.width = `${pct}%`;
                stressEl.textContent = `${pct}%`;
                
                if (pct >= 85) {
                    stressEl.style.color = '#ef4444';
                    stressEl.style.animation = 'v67-glitch-shake 0.1s infinite';
                }
            }
        }

        // Slide 6: Self-destruction explosion particles expanding
        else if (slideId === 'slide_ariane_destruction') {
            const rocket = row.querySelector('#v67-destruct-rocket');
            const f1 = row.querySelector('#v67-fire-1');
            const f2 = row.querySelector('#v67-fire-2');
            const f3 = row.querySelector('#v67-fire-3');
            const overlay = row.querySelector('#v67-destruct-overlay');
            
            if (progress < 0.25) {
                if (rocket) {
                    const normProg = progress / 0.25;
                    rocket.style.transform = `translateY(${30 + normProg * 40}px) rotate(${25 + normProg * 10}deg)`;
                }
                if (overlay) overlay.style.opacity = '0';
                if (f1) f1.style.opacity = '0';
                if (f2) f2.style.opacity = '0';
                if (f3) f3.style.opacity = '0';
            } 
            else if (progress >= 0.25 && progress < 0.4) {
                // Instant flash of explosion!
                if (overlay) {
                    const flash = (progress - 0.25) / 0.15;
                    overlay.style.opacity = `${1 - flash}`;
                }
                if (rocket) rocket.style.opacity = '0';
                
                // Show fireballs expanding
                if (f1) { f1.style.opacity = '1'; f1.style.transform = 'scale(1.2)'; }
                if (f2) { f2.style.opacity = '1'; f2.style.transform = 'scale(1.1)'; }
                if (f3) { f3.style.opacity = '1'; f3.style.transform = 'scale(1.0)'; }
            } 
            else {
                // Fireballs expand and fade to smoke
                const fadeProg = (progress - 0.4) / 0.6;
                if (f1) {
                    f1.style.transform = `scale(${1.2 + fadeProg * 1.5})`;
                    f1.style.opacity = `${1 - fadeProg}`;
                    f1.style.filter = 'brightness(0.2)';
                }
                if (f2) {
                    f2.style.transform = `scale(${1.1 + fadeProg * 2.0})`;
                    f2.style.opacity = `${1 - fadeProg}`;
                    f2.style.filter = 'brightness(0.2)';
                }
                if (f3) {
                    f3.style.transform = `scale(${1.0 + fadeProg * 2.5})`;
                    f3.style.opacity = `${1 - fadeProg}`;
                    f3.style.filter = 'brightness(0.2)';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video67',
        topic: 'Thảm họa tràn số Ariane 5',
        episodeNum: 67,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video67 Plugin] Loaded: Ariane 5 launch, overflow, and self-destruction simulation.');
})();
