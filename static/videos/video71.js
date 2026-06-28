/**
 * Video 71: Netflix Chaos Monkey
 * Custom slides detailing cloud architecture resilience simulations.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_chaos_intro: [
            { text: 'Chaos Monkey', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'tự động tìm và đánh sập', start: 5.5, end: 9.0, class: 'active-yellow' }
        ],
        slide_chaos_why: [
            { text: 'tự tay phá hoại', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'sẵn sàng sửa lỗi', start: 7.0, end: 10.5, class: 'active-cyan' }
        ],
        slide_chaos_grid: [
            { text: 'máy chủ nhỏ phân tán', start: 2.0, end: 5.0, class: 'active-cyan' },
            { text: 'bộ cân bằng tải', start: 6.5, end: 9.5, class: 'active-yellow' }
        ],
        slide_chaos_attack: [
            { text: 'tắt phụt nguồn', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'hỏng đột ngột', start: 7.5, end: 11.0, class: 'active-yellow' }
        ],
        slide_chaos_failover: [
            { text: 'bẻ lái dòng lưu lượng', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'khởi động một máy chủ mới', start: 7.0, end: 11.0, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_chaos_intro', 'slide_chaos_why', 'slide_chaos_grid', 
        'slide_chaos_attack', 'slide_chaos_failover'
    ];

    function sceneWrap(inner) {
        return `<div class="v71-zoom-container"><div class="v71-scene-content">${inner}</div></div>`;
    }

    const activeSparkline = "M 0 15 Q 15 5, 30 18 T 60 8 T 90 22 T 120 15 T 150 25 T 180 10 T 210 18 T 240 12";
    const deadSparkline = "M 0 28 L 240 28";

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        // Dynamically inject styles directly into document head to bypass browser CSS cache
        let styleTag = document.getElementById('v71-dynamic-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'v71-dynamic-styles';
            styleTag.innerHTML = `
                /* video71.css styles injected dynamically to prevent caching errors */
                .v71-zoom-container {
                    width: 100%; height: 100%;
                    display: flex; justify-content: center; align-items: center;
                    background: transparent;
                }
                .v71-scene-content {
                    position: relative; z-index: 2; width: 100%;
                    display: flex; justify-content: center; align-items: center;
                }
                .v71-scene-row {
                    width: 920px; height: 650px;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                    position: relative; overflow: hidden; border-radius: 24px;
                }
                .v71-dashboard {
                    width: 100%; height: 520px;
                    background: transparent; position: relative; overflow: hidden;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                }
                
                /* Huge Netflix Brand Header (Centered in the Hook, fades out later) */
                .v71-brand-header {
                    position: absolute;
                    top: 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    z-index: 30;
                    transition: opacity 0.4s ease, transform 0.4s ease;
                    pointer-events: none;
                }
                .v71-brand-logo {
                    width: 140px;
                    height: auto;
                    filter: drop-shadow(0 0 35px rgba(229, 9, 20, 0.65));
                }
                .v71-brand-title {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 34px;
                    color: #e50914;
                    font-weight: 900;
                    letter-spacing: 6px;
                    text-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
                }

                /* Borderless Balancer node (Open card design per user request) */
                .v71-balancer-node {
                    position: absolute;
                    top: 15px;
                    width: 380px;
                    background: transparent !important; /* No card background */
                    border: none !important; /* No border outline */
                    box-shadow: none !important; /* No shadow */
                    padding: 0 !important;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    font-family: monospace;
                    font-size: 16px;
                    color: #94a3b8;
                    z-index: 10;
                    transition: opacity 0.4s ease;
                }
                .v71-server-grid {
                    position: absolute;
                    top: 200px; /* Shifted down to accommodate large logo */
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                    width: 820px;
                    justify-items: center;
                    z-index: 10;
                    transition: opacity 0.4s ease;
                }
                .v71-server-node {
                    width: 240px;
                    height: 140px;
                    background: rgba(15, 23, 42, 0.85);
                    border: 2px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
                    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
                    backdrop-filter: blur(25px);
                    position: relative;
                }
                .v71-server-node.active-green {
                    border-color: var(--v71-primary);
                    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.12), inset 0 0 15px rgba(16, 185, 129, 0.05);
                }
                .v71-server-node.active-red {
                    border-color: var(--v71-red);
                    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.35);
                }
                .v71-server-hdr {
                    display: flex; justify-content: space-between; align-items: center;
                    font-family: monospace; font-size: 13px; color: #64748b; font-weight: bold;
                }
                .v71-server-node.active-green .v71-server-hdr { color: var(--v71-primary); }
                .v71-server-node.active-red .v71-server-hdr { color: var(--v71-red); }
                .v71-server-status {
                    font-size: 11px; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; font-weight: bold;
                }
                .v71-server-node.active-green .v71-server-status { background: rgba(16, 185, 129, 0.15); color: var(--v71-primary); }
                .v71-server-node.active-red .v71-server-status { background: rgba(239, 68, 68, 0.2); color: var(--v71-red); }
                .v71-server-body { display: flex; flex-direction: column; gap: 4px; margin: 4px 0; }
                .v71-server-metrics { display: flex; justify-content: space-between; font-family: monospace; font-size: 15px; color: #fff; font-weight: bold; }
                .v71-sparkline { width: 100%; height: 30px; overflow: visible; }
                .v71-sparkline-path { fill: none; stroke: var(--v71-primary); stroke-width: 2.5px; stroke-linecap: round; stroke-linejoin: round; transition: d 0.3s ease, stroke 0.3s; }
                .v71-server-node.active-red .v71-sparkline-path { stroke: var(--v71-red); }
                .v71-server-load-bar { width: 100%; height: 8px; background: rgba(255,255,255,0.04); border-radius: 4px; overflow: hidden; }
                .v71-server-load-fill { height: 100%; background: var(--v71-primary); width: 45%; transition: width 0.3s; }
                .v71-server-node.active-red .v71-server-load-fill { background: var(--v71-red); width: 0% !important; }
                .v71-traffic-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; transition: opacity 0.4s ease; }
                .v71-traffic-path { fill: none; stroke: rgba(255,255,255,0.03); stroke-width: 2.5px; transition: stroke 0.3s; }
                .v71-traffic-path.active { stroke: rgba(59, 130, 246, 0.12); }
                .v71-traffic-path.dead { stroke: rgba(239,68,68,0.12); }
                .v71-traffic-dot { position: absolute; width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; box-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa; pointer-events: none; z-index: 8; }
                .v71-monkey-crosshair { position: absolute; width: 60px; height: 60px; color: var(--v71-red); display: flex; justify-content: center; align-items: center; transform: translate(-50%, -50%) scale(1.5); opacity: 0; pointer-events: none; z-index: 20; filter: drop-shadow(0 0 15px var(--v71-red-glow)); transition: opacity 0.25s, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .v71-monkey-crosshair.locked { opacity: 1; transform: translate(-50%, -50%) scale(1); animation: v71-crosshair-pulse 0.5s infinite alternate; }
                @keyframes v71-crosshair-pulse { 0% { transform: translate(-50%, -50%) scale(0.9); } 100% { transform: translate(-50%, -50%) scale(1.1); } }
                .v71-spark-particle { position: absolute; width: 10px; height: 10px; background: #f59e0b; border-radius: 50%; pointer-events: none; z-index: 12; animation: v71-spark-fly 0.6s ease-out forwards; }
                @keyframes v71-spark-fly { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--dx), var(--dy)) scale(0.1); opacity: 0; } }
                .v71-warning-overlay { position: absolute; bottom: 20px; width: 820px; background: #1e1b4b; border: 2px solid #ef4444; border-radius: 12px; padding: 0; font-family: monospace; color: #fff; z-index: 20; display: flex; flex-direction: column; box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4), 0 0 15px rgba(239, 68, 68, 0.2); opacity: 0; overflow: hidden; transition: opacity 0.2s; }
                .v71-warning-stripes { width: 100%; height: 10px; background-size: 20px 20px; background-image: linear-gradient(45deg, #ef4444 25%, #000 25%, #000 50%, #ef4444 50%, #ef4444 75%, #000 75%, #000); }
                .v71-warning-title { font-size: 14px; font-weight: bold; color: #ef4444; padding: 10px 15px 5px; display: flex; align-items: center; }
                .v71-warning-val { font-size: 24px; font-weight: 900; color: #fff; padding: 0 15px 8px; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
            `;
            document.head.appendChild(styleTag);
        }

        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        // We render a standard borderless server console framework across slides
        canvas.innerHTML = sceneWrap(`
            <div class="v71-scene-row">
                <div class="v71-dashboard" id="v71-board">
                    <!-- Netflix Brand Header (Intro hook state, will fade out) -->
                    <div class="v71-brand-header" id="v71-brand-hdr">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg" alt="Netflix Logo" class="v71-brand-logo">
                        <div class="v71-brand-title">CHAOS MONKEY</div>
                    </div>

                    <!-- Top: Load Balancer Node with Netflix Logo integrated (Large logo, borderless card) -->
                    <div class="v71-balancer-node" id="v71-balancer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg" style="height: 65px; filter: drop-shadow(0 0 18px rgba(229, 9, 20, 0.6)); margin-bottom: 5px;" alt="Netflix">
                        <span style="font-weight:bold; font-size:14px; color:#e50914; letter-spacing:2px;">LOAD BALANCER</span>
                        <span style="font-size:16px; color:#94a3b8; font-weight:bold;" id="v71-balancer-status">STATUS: ROUTING NORMAL</span>
                    </div>
                    
                    <!-- SVG traffic connections -->
                    <svg class="v71-traffic-svg">
                        <path class="v71-traffic-path" id="v71-path-1" d="M 460 130 L 205 200" />
                        <path class="v71-traffic-path" id="v71-path-2" d="M 460 130 L 460 200" />
                        <path class="v71-traffic-path" id="v71-path-3" d="M 460 130 L 715 200" />
                    </svg>
                    
                    <!-- Active traffic dots container -->
                    <div id="v71-dots-container" style="position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none;">
                        <div class="v71-traffic-dot" id="v71-dot-1"></div>
                        <div class="v71-traffic-dot" id="v71-dot-2"></div>
                        <div class="v71-traffic-dot" id="v71-dot-3"></div>
                        <div class="v71-traffic-dot" id="v71-dot-4"></div>
                        <div class="v71-traffic-dot" id="v71-dot-5"></div>
                    </div>
                    
                    <!-- Chaos Monkey Targeting laser crosshair -->
                    <div class="v71-monkey-crosshair" id="v71-monkey-laser">
                        <i data-lucide="target" style="width:36px; height:36px;"></i>
                    </div>
                    
                    <!-- Sparks container -->
                    <div id="v71-sparks-container" style="position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none; z-index:15;"></div>
                    
                    <!-- Center: 3 Microservice Nodes -->
                    <div class="v71-server-grid">
                        <!-- Node 1: API Server -->
                        <div class="v71-server-node active-green" id="v71-node-1">
                            <div class="v71-server-hdr">
                                <span>srv-api-01</span>
                                <span class="v71-server-status" id="v71-status-1">ACTIVE</span>
                            </div>
                            <div class="v71-server-body">
                                <div class="v71-server-metrics">
                                    <span id="v71-load-lbl-1">CPU: 42%</span>
                                    <span style="color:#64748b;">RAM: 58%</span>
                                </div>
                                <svg class="v71-sparkline" viewBox="0 0 240 30">
                                    <path class="v71-sparkline-path" id="v71-sparkline-1" d="${activeSparkline}" />
                                </svg>
                            </div>
                            <div class="v71-server-load-bar">
                                <div class="v71-server-load-fill" id="v71-fill-1" style="width:42%;"></div>
                            </div>
                        </div>
                        
                        <!-- Node 2: Auth Server -->
                        <div class="v71-server-node active-green" id="v71-node-2">
                            <div class="v71-server-hdr">
                                <span>srv-auth-02</span>
                                <span class="v71-server-status" id="v71-status-2">ACTIVE</span>
                            </div>
                            <div class="v71-server-body">
                                <div class="v71-server-metrics">
                                    <span id="v71-load-lbl-2">CPU: 38%</span>
                                    <span style="color:#64748b;">RAM: 61%</span>
                                </div>
                                <svg class="v71-sparkline" viewBox="0 0 240 30">
                                    <path class="v71-sparkline-path" id="v71-sparkline-2" d="${activeSparkline}" />
                                </svg>
                            </div>
                            <div class="v71-server-load-bar">
                                <div class="v71-server-load-fill" id="v71-fill-2" style="width:38%;"></div>
                            </div>
                        </div>
                        
                        <!-- Node 3: Payment Server -->
                        <div class="v71-server-node active-green" id="v71-node-3">
                            <div class="v71-server-hdr">
                                <span>srv-pay-03</span>
                                <span class="v71-server-status" id="v71-status-3">ACTIVE</span>
                            </div>
                            <div class="v71-server-body">
                                <div class="v71-server-metrics">
                                    <span id="v71-load-lbl-3">CPU: 51%</span>
                                    <span style="color:#64748b;">RAM: 47%</span>
                                </div>
                                <svg class="v71-sparkline" viewBox="0 0 240 30">
                                    <path class="v71-sparkline-path" id="v71-sparkline-3" d="${activeSparkline}" />
                                </svg>
                            </div>
                            <div class="v71-server-load-bar">
                                <div class="v71-server-load-fill" id="v71-fill-3" style="width:51%;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom: Warnings Overlay board -->
                    <div class="v71-warning-overlay" id="v71-console-alert">
                        <div class="v71-warning-stripes"></div>
                        <div class="v71-warning-title">
                            <i data-lucide="alert-triangle" style="width:16px; height:16px; margin-right:6px; color:#ef4444;"></i> CHAOS ENGINEERING SYSTEM REPORT
                        </div>
                        <div class="v71-warning-val" id="v71-console-alert-text">CHAOS MONKEY IDLE • SYSTEM STEADY</div>
                    </div>
                </div>
            </div>
        `);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // Helper to spawn sparks at target coordinates
    function spawnSparks(container, tx, ty) {
        if (!container) return;
        for (let i = 0; i < 15; i++) {
            const sp = document.createElement('div');
            sp.className = 'v71-spark-particle';
            sp.style.left = `${tx}px`;
            sp.style.top = `${ty}px`;
            
            // Random direction values for fly animation
            const dx = (Math.random() - 0.5) * 160;
            const dy = (Math.random() - 0.5) * 160;
            sp.style.setProperty('--dx', `${dx}px`);
            sp.style.setProperty('--dy', `${dy}px`);
            
            container.appendChild(sp);
            setTimeout(() => sp.remove(), 600);
        }
    }

    // ── FRAME UPDATE ANIMATIONS ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v71-scene-row');
        if (!row) return;

        // Balancer and Server Node Elements
        const balancerStatus = row.querySelector('#v71-balancer-status');
        const node1 = row.querySelector('#v71-node-1');
        const node2 = row.querySelector('#v71-node-2');
        const node3 = row.querySelector('#v71-node-3');
        
        const status1 = row.querySelector('#v71-status-1');
        const status2 = row.querySelector('#v71-status-2');
        const status3 = row.querySelector('#v71-status-3');
        
        const fill1 = row.querySelector('#v71-fill-1');
        const fill2 = row.querySelector('#v71-fill-2');
        const fill3 = row.querySelector('#v71-fill-3');
        
        const lbl1 = row.querySelector('#v71-load-lbl-1');
        const lbl2 = row.querySelector('#v71-load-lbl-2');
        const lbl3 = row.querySelector('#v71-load-lbl-3');

        const sparkline1 = row.querySelector('#v71-sparkline-1');
        const sparkline2 = row.querySelector('#v71-sparkline-2');
        const sparkline3 = row.querySelector('#v71-sparkline-3');
        
        const path1 = row.querySelector('#v71-path-1');
        const path2 = row.querySelector('#v71-path-2');
        const path3 = row.querySelector('#v71-path-3');
        
        const laser = row.querySelector('#v71-monkey-laser');
        const sparksContainer = row.querySelector('#v71-sparks-container');
        const alertBox = row.querySelector('#v71-console-alert');
        const alertTxt = row.querySelector('#v71-console-alert-text');
        
        const brandHeader = row.querySelector('#v71-brand-hdr');
        const balancer = row.querySelector('#v71-balancer');
        const serverGrid = row.querySelector('.v71-server-grid');
        const trafficSvg = row.querySelector('.v71-traffic-svg');
        const dotsContainer = row.querySelector('#v71-dots-container');

        // New adjusted coordinates:
        // Balancer center-bottom: (460, 130)
        // Node 1 top center: (205, 200)
        // Node 2 top center: (460, 200)
        // Node 3 top center: (715, 200)
        const bx = 460, by = 130;
        const n1x = 205, n1y = 200;
        const n2x = 460, n2y = 200;
        const n3x = 715, n3y = 200;

        // Animate traffic dots flowing
        const dot1 = row.querySelector('#v71-dot-1');
        const dot2 = row.querySelector('#v71-dot-2');
        const dot3 = row.querySelector('#v71-dot-3');
        const dot4 = row.querySelector('#v71-dot-4');
        const dot5 = row.querySelector('#v71-dot-5');
        
        function setDotPos(dotEl, targetX, targetY, offset) {
            if (!dotEl) return;
            const p = (progress * 4 + offset) % 1.0;
            const x = bx + p * (targetX - bx);
            const y = by + p * (targetY - by);
            dotEl.style.left = `${x - 4}px`;
            dotEl.style.top = `${y - 4}px`;
        }

        // Default: Routing traffic evenly to all 3 servers
        if (slideId === 'slide_chaos_grid' || slideId === 'slide_chaos_why') {
            if (brandHeader) {
                brandHeader.style.opacity = '0';
                brandHeader.style.pointerEvents = 'none';
            }
            if (balancer) balancer.style.opacity = '1';
            if (serverGrid) serverGrid.style.opacity = '1';
            if (trafficSvg) trafficSvg.style.opacity = '1';
            if (dotsContainer) dotsContainer.style.opacity = '1';

            setDotPos(dot1, n1x, n1y, 0.0);
            setDotPos(dot2, n2x, n2y, 0.2);
            setDotPos(dot3, n3x, n3y, 0.4);
            setDotPos(dot4, n1x, n1y, 0.6);
            setDotPos(dot5, n3x, n3y, 0.8);
            
            if (path1) path1.className.baseVal = 'v71-traffic-path active';
            if (path2) path2.className.baseVal = 'v71-traffic-path active';
            if (path3) path3.className.baseVal = 'v71-traffic-path active';
        }

        // Slide 1: Chaos Monkey shuts down Node 2 (Auth Server)
        else if (slideId === 'slide_chaos_intro') {
            if (progress < 0.25) {
                // Show logo header in huge intro state, hide balancer and architecture grid smoothly
                if (brandHeader) {
                    brandHeader.style.opacity = '1';
                    brandHeader.classList.add('intro-state');
                }
                if (balancer) balancer.style.opacity = '0';
                if (serverGrid) serverGrid.style.opacity = '0';
                if (trafficSvg) trafficSvg.style.opacity = '0';
                if (dotsContainer) dotsContainer.style.opacity = '0';
                if (laser) laser.style.opacity = '0';
                if (alertBox) alertBox.style.opacity = '0';
            } else {
                // Hide logo header completely, fade in balancer & stack
                if (brandHeader) {
                    brandHeader.style.opacity = '0';
                    brandHeader.style.pointerEvents = 'none';
                    brandHeader.classList.remove('intro-state');
                }
                if (balancer) balancer.style.opacity = '1';
                if (serverGrid) serverGrid.style.opacity = '1';
                if (trafficSvg) trafficSvg.style.opacity = '1';
                if (dotsContainer) dotsContainer.style.opacity = '1';

                const normProg = (progress - 0.25) / 0.75;

                if (normProg < 0.2) {
                    // Node 2 is healthy
                    if (node2) {
                        node2.className = 'v71-server-node active-green';
                        status2.textContent = 'ACTIVE';
                        fill2.style.width = '38%';
                        lbl2.textContent = 'CPU: 38%';
                    }
                    if (sparkline2) sparkline2.setAttribute('d', activeSparkline);
                    if (laser) {
                        laser.className = 'v71-monkey-crosshair';
                    }
                    if (alertBox) alertBox.style.opacity = '0';
                    
                    // Flow traffic normal
                    setDotPos(dot1, n1x, n1y, 0.0);
                    setDotPos(dot2, n2x, n2y, 0.2);
                    setDotPos(dot3, n3x, n3y, 0.4);
                    setDotPos(dot4, n1x, n1y, 0.6);
                    setDotPos(dot5, n3x, n3y, 0.8);
                } else if (normProg >= 0.2 && normProg < 0.4) {
                    // Laser locks onto Node 2
                    if (laser) {
                        laser.style.left = `${n2x}px`;
                        laser.style.top = `${n2y}px`;
                        laser.classList.add('locked');
                    }
                    setDotPos(dot1, n1x, n1y, 0.0);
                    setDotPos(dot2, n2x, n2y, 0.2);
                    setDotPos(dot3, n3x, n3y, 0.4);
                } else {
                    // Node 2 crashes! (Flatlines & dead status, no screen shake)
                    if (node2 && !node2.classList.contains('active-red')) {
                        node2.className = 'v71-server-node active-red';
                        if (status2) status2.textContent = 'DEAD';
                        if (fill2) fill2.style.width = '0%';
                        if (lbl2) lbl2.textContent = 'CPU: 0%';
                        if (sparkline2) sparkline2.setAttribute('d', deadSparkline);
                        spawnSparks(sparksContainer, n2x, n2y);
                    }
                    if (laser) {
                        laser.classList.remove('locked');
                        laser.style.opacity = '0';
                    }
                    if (alertBox) {
                        alertBox.style.opacity = '1';
                        if (alertTxt) alertTxt.textContent = '⚠️ CRITICAL FAULT: node-auth-02 COMPROMISED (FORCE KILLED)';
                    }
                    if (balancerStatus) {
                        balancerStatus.textContent = 'STATUS: REROUTING TRAFFIC';
                        balancerStatus.style.color = '#ef4444';
                    }
                    
                    // Reroute traffic dots away from Node 2 to Node 1/3
                    setDotPos(dot1, n1x, n1y, 0.0);
                    setDotPos(dot2, n1x, n1y, 0.2); // Rerouted to Node 1!
                    setDotPos(dot3, n3x, n3y, 0.4);
                    setDotPos(dot4, n3x, n3y, 0.6); // Rerouted to Node 3!
                    setDotPos(dot5, n1x, n1y, 0.8);
                    
                    if (path2) path2.className.baseVal = 'v71-traffic-path dead';
                }
            }
        }

        // Slide 4: Chaos Monkey shuts down Node 3 (Payment Server)
        else if (slideId === 'slide_chaos_attack') {
            if (brandHeader) {
                brandHeader.style.opacity = '0';
                brandHeader.style.pointerEvents = 'none';
            }
            if (balancer) balancer.style.opacity = '1';
            if (serverGrid) serverGrid.style.opacity = '1';
            if (trafficSvg) trafficSvg.style.opacity = '1';
            if (dotsContainer) dotsContainer.style.opacity = '1';

            // Keep Node 2 crashed from previous slides
            if (node2) {
                node2.className = 'v71-server-node active-red';
                status2.textContent = 'DEAD';
                fill2.style.width = '0%';
                lbl2.textContent = 'CPU: 0%';
                if (sparkline2) sparkline2.setAttribute('d', deadSparkline);
            }
            if (path2) path2.className.baseVal = 'v71-traffic-path dead';

            if (progress < 0.35) {
                if (node3) {
                    node3.className = 'v71-server-node active-green';
                    status3.textContent = 'ACTIVE';
                    fill3.style.width = '51%';
                    lbl3.textContent = 'CPU: 51%';
                }
                if (sparkline3) sparkline3.setAttribute('d', activeSparkline);
                if (laser) laser.className = 'v71-monkey-crosshair';
                if (alertBox) alertBox.style.opacity = '0';
                
                // Flow to Node 1 and Node 3
                setDotPos(dot1, n1x, n1y, 0.0);
                setDotPos(dot2, n3x, n3y, 0.25);
                setDotPos(dot3, n1x, n1y, 0.5);
                setDotPos(dot4, n3x, n3y, 0.75);
                setDotPos(dot5, n1x, n1y, 0.9);
            } else if (progress >= 0.35 && progress < 0.5) {
                // Laser locks onto Node 3
                if (laser) {
                    laser.style.left = `${n3x}px`;
                    laser.style.top = `${n3y}px`;
                    laser.classList.add('locked');
                }
                setDotPos(dot1, n1x, n1y, 0.0);
                setDotPos(dot2, n3x, n3y, 0.25);
                setDotPos(dot3, n1x, n1y, 0.5);
            } else {
                // Node 3 crashes!
                if (node3 && !node3.classList.contains('active-red')) {
                    node3.className = 'v71-server-node active-red';
                    if (status3) status3.textContent = 'DEAD';
                    if (fill3) fill3.style.width = '0%';
                    if (lbl3) lbl3.textContent = 'CPU: 0%';
                    if (sparkline3) sparkline3.setAttribute('d', deadSparkline);
                    spawnSparks(sparksContainer, n3x, n3y);
                }
                if (laser) {
                    laser.classList.remove('locked');
                    laser.style.opacity = '0';
                }
                if (alertBox) {
                    alertBox.style.opacity = '1';
                    if (alertTxt) alertTxt.textContent = '⚠️ CRITICAL FAULT: node-pay-03 TERMINATED BY MONKEY';
                }
                
                // Stop flow to Node 3
                setDotPos(dot1, n1x, n1y, 0.0);
                setDotPos(dot2, n1x, n1y, 0.25);
                setDotPos(dot3, n1x, n1y, 0.5);
                setDotPos(dot4, n1x, n1y, 0.75);
                setDotPos(dot5, n1x, n1y, 0.9);
                
                if (path3) path3.className.baseVal = 'v71-traffic-path dead';
            }
        }

        // Slide 5: Automatic traffic rerouting & Node recovery
        else if (slideId === 'slide_chaos_failover') {
            if (brandHeader) {
                brandHeader.style.opacity = '0';
                brandHeader.style.pointerEvents = 'none';
            }
            if (balancer) balancer.style.opacity = '1';
            if (serverGrid) serverGrid.style.opacity = '1';
            if (trafficSvg) trafficSvg.style.opacity = '1';
            if (dotsContainer) dotsContainer.style.opacity = '1';

            // Node 2 (Auth) recovers and is active green
            if (node2) {
                node2.className = 'v71-server-node active-green';
                status2.textContent = 'ACTIVE';
                fill2.style.width = '40%';
                lbl2.textContent = 'CPU: 40%';
                if (sparkline2) sparkline2.setAttribute('d', activeSparkline);
            }
            if (path2) path2.className.baseVal = 'v71-traffic-path active';

            if (progress < 0.5) {
                // Node 3 is still dead, traffic redirected to Node 1/2
                if (node3) {
                    node3.className = 'v71-server-node active-red';
                    status3.textContent = 'DEAD';
                    fill3.style.width = '0%';
                    lbl3.textContent = 'CPU: 0%';
                    if (sparkline3) sparkline3.setAttribute('d', deadSparkline);
                }
                if (path3) path3.className.baseVal = 'v71-traffic-path dead';
                
                // Redirection flows
                setDotPos(dot1, n1x, n1y, 0.0);
                setDotPos(dot2, n2x, n2y, 0.2);
                setDotPos(dot3, n1x, n1y, 0.4);
                setDotPos(dot4, n2x, n2y, 0.6);
                setDotPos(dot5, n1x, n1y, 0.8);
                
                if (alertBox) {
                    alertBox.style.opacity = '1';
                    alertBox.style.borderColor = '#fbbf24';
                    if (alertTxt) alertTxt.textContent = '🔄 FAILOVER: REROUTING DEMANDS TO ACTIVE STACKS';
                }
            } else {
                // Node 3 recovers! Fades in fresh green
                if (node3 && node3.classList.contains('active-red')) {
                    node3.className = 'v71-server-node active-green';
                    if (status3) status3.textContent = 'ACTIVE';
                    if (fill3) fill3.style.width = '25%'; // starts with light load
                    if (lbl3) lbl3.textContent = 'CPU: 25%';
                    if (sparkline3) sparkline3.setAttribute('d', activeSparkline);
                    
                    // Bounce animation
                    node3.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        node3.style.transform = 'scale(1)';
                        node3.style.transition = 'transform 0.3s ease-out';
                    }, 100);
                }
                if (path3) path3.className.baseVal = 'v71-traffic-path active';
                
                // Traffic distributes to Node 3 again!
                setDotPos(dot1, n1x, n1y, 0.0);
                setDotPos(dot2, n2x, n2y, 0.2);
                setDotPos(dot3, n3x, n3y, 0.4); // flows to Node 3!
                setDotPos(dot4, n1x, n1y, 0.6);
                setDotPos(dot5, n3x, n3y, 0.8); // flows to Node 3!
                
                if (alertBox) {
                    alertBox.style.opacity = '1';
                    alertBox.style.borderColor = '#10b981';
                    if (alertTxt) alertTxt.textContent = '✅ RECOVERY: ALL CLUSTER NODES ONLINE & SYNCHRONIZED';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video71',
        topic: 'Netflix Chaos Monkey',
        episodeNum: 71,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video71 Plugin] Loaded: Netflix Chaos Monkey cluster failover simulation.');
})();
