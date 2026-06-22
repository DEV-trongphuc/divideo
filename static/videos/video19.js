/**
 * Video 19: Google Maps Router - Giải mã Google Maps
 * Plugin file - chứa toàn bộ slide animation/HTML cho video19
 * Load động bởi app.js khi user chọn video19
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_maps_1: [
            { text: 'nhanh nhất', start: 4.0, end: 9.0, class: 'active-good' },
            { text: 'thử tất cả', start: 9.0, end: 15.0, class: 'active-bad' },
            { text: 'cấp số nhân', start: 15.0, end: 22.0, class: 'active-bad' }
        ],
        slide_maps_2: [
            { text: 'Đồ thị', start: 4.0, end: 10.0, class: 'active-good' },
            { text: 'Node', start: 10.0, end: 15.0, class: 'active-gold' },
            { text: 'Edge', start: 15.0, end: 21.0, class: 'active-gold' }
        ],
        slide_maps_3: [
            { text: 'Dijkstra', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'loang dần', start: 6.0, end: 14.0, class: 'active-good' },
            { text: 'tốn CPU', start: 14.0, end: 22.0, class: 'active-bad' }
        ],
        slide_maps_4: [
            { text: 'A*', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'Heuristic', start: 8.0, end: 14.0, class: 'active-gold' },
            { text: 'đúng hướng', start: 14.0, end: 21.0, class: 'active-good' }
        ],
        slide_maps_5: [
            { text: 'phân cấp', start: 4.0, end: 10.0, class: 'active-good' },
            { text: 'loại bỏ hàng triệu', start: 10.0, end: 16.0, class: 'active-bad' },
            { text: 'cao tốc', start: 16.0, end: 22.0, class: 'active-gold' }
        ],
        slide_maps_6: [
            { text: 'Tìm kiếm hai đầu', start: 3.0, end: 10.0, class: 'active-good' },
            { text: 'gặp nhau ở giữa', start: 10.0, end: 16.0, class: 'active-gold' },
            { text: 'nhanh gấp đôi', start: 16.0, end: 22.0, class: 'active-good' }
        ],
        slide_maps_7: [
            { text: 'ngắn nhất', start: 3.0, end: 8.0, class: 'active-bad' },
            { text: 'Thời gian', start: 8.0, end: 14.0, class: 'active-good' },
            { text: 'nhanh hơn đáng kể', start: 14.0, end: 21.0, class: 'active-good' }
        ],
        slide_maps_8: [
            { text: 'dữ liệu định vị GPS', start: 4.0, end: 10.0, class: 'active-gold' },
            { text: 'ùn tắc', start: 10.0, end: 15.0, class: 'active-bad' },
            { text: 'dự đoán chính xác', start: 15.0, end: 22.0, class: 'active-good' }
        ],
        slide_maps_9: [
            { text: 'tai nạn', start: 2.0, end: 7.0, class: 'active-bad' },
            { text: 'chỉ chạy thuật toán tìm đường mới', start: 7.0, end: 14.0, class: 'active-good' },
            { text: 'trong tích tắc', start: 14.0, end: 20.0, class: 'active-gold' }
        ]
    };

    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_maps_1', 'slide_maps_2', 'slide_maps_3', 'slide_maps_4', 'slide_maps_5',
        'slide_maps_6', 'slide_maps_7', 'slide_maps_8', 'slide_maps_9'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_maps_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:30px; zoom:0.83;">
                        <!-- Phone Mockup showing Maps Routing -->
                        <div class="glass-card phone-mockup maps-phone-intro" style="width:440px; height:700px; border:2.5px solid var(--gold-primary); border-radius:36px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.85); transition:all 0.3s;">
                            <!-- Header Search Bar -->
                            <div style="background:#161d2a; border-radius:18px; padding:12px 18px; display:flex; align-items:center; gap:12px; border:1.5px solid rgba(255,255,255,0.06); z-index:5;">
                                <i data-lucide="search" style="color:var(--gold-primary); width:22px; height:22px;"></i>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:15px; color:rgba(255,255,255,0.4);">Điểm đến</div>
                                    <div style="font-size:18px; font-weight:bold; color:#fff; margin-top:2px;">Sân bay Tân Sơn Nhất</div>
                                </div>
                            </div>

                            <!-- Map Grid Simulation Area -->
                            <div style="flex:1; position:relative; margin:20px 0; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.04); background:#070a12; z-index:2;">
                                <!-- Grid background -->
                                <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.02) 1.5px, transparent 1.5px); background-size: 24px 24px;"></div>
                                
                                <!-- Start/End Pins -->
                                <div class="map-node start-pin" style="position:absolute; left:15%; top:75%; display:flex; flex-direction:column; align-items:center; z-index:10;">
                                    <span style="font-size:32px; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.5));">📍</span>
                                    <span style="background:#3b82f6; color:#fff; font-size:13px; font-weight:bold; padding:2px 8px; border-radius:6px; margin-top:2px; white-space:nowrap;">Quận 1</span>
                                </div>
                                <div class="map-node end-pin" style="position:absolute; left:75%; top:20%; display:flex; flex-direction:column; align-items:center; z-index:10;">
                                    <span style="font-size:32px; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.5));">✈️</span>
                                    <span style="background:#ef4444; color:#fff; font-size:13px; font-weight:bold; padding:2px 8px; border-radius:6px; margin-top:2px; white-space:nowrap;">Sân bay</span>
                                </div>

                                <!-- Brute force network pathways scanner (drawn dynamically) -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;" class="intro-svg-canvas">
                                    <path class="intro-bg-road" d="M 66 382 L 150 250 L 330 250 L 330 102" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6" />
                                    <path class="intro-bg-road" d="M 66 382 L 200 382 L 200 170 L 330 102" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6" />
                                    <path class="intro-bg-road" d="M 66 382 L 66 170 L 250 102 L 330 102" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6" />
                                    
                                    <!-- Scan Paths -->
                                    <path class="intro-scan-path sp-1" d="M 66 382 L 150 250 L 330 250 L 330 102" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="350" stroke-dashoffset="350" />
                                    <path class="intro-scan-path sp-2" d="M 66 382 L 200 382 L 200 170 L 330 102" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="350" stroke-dashoffset="350" />
                                    <path class="intro-scan-path sp-3" d="M 66 382 L 66 170 L 250 102 L 330 102" fill="none" stroke="#3b82f6" stroke-width="4" stroke-dasharray="400" stroke-dashoffset="400" />
                                    
                                    <!-- Gold Winner Route -->
                                    <path class="intro-winner-path" d="M 66 382 L 150 250 L 330 250 L 330 102" fill="none" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" style="opacity:0; transition:all 0.5s;" />
                                </svg>
                             </div>

                             <!-- Bottom ETA Output Panel -->
                             <div class="glass-card intro-eta-card" style="background:#161d2a; border-radius:20px; padding:18px; border:1.5px solid rgba(255,255,255,0.06); text-align:left; display:flex; justify-content:space-between; align-items:center; z-index:5; transform:translateY(30px); opacity:0; transition:all 0.5s;">
                                 <div>
                                     <div style="font-size:24px; font-weight:900; color:#3b82f6;">18 phút <span style="font-size:18px; color:rgba(255,255,255,0.5); font-weight:normal;">(7.2 km)</span></div>
                                     <div style="font-size:15px; color:#d1d5db; margin-top:4px;">Tuyến đường nhanh nhất, ít kẹt xe</div>
                                 </div>
                                 <button style="background:#3b82f6; border:none; border-radius:12px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; color:#fff;">
                                     <i data-lucide="navigation" style="width:20px; height:20px; fill:#fff; color:#fff;"></i>
                                 </button>
                             </div>
                         </div>
                     </div>
                 `;
            }
        }
        else if (slideId === 'slide_maps_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; zoom:0.83;">
                        <!-- Left View: Map Image view -->
                        <div class="glass-card" style="width:400px; height:580px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; background:#0e121a; position:relative; overflow:hidden;">
                            <div style="font-size:20px; font-weight:bold; color:var(--text-muted); border-bottom:1.5px solid rgba(255,255,255,0.05); padding-bottom:8px;">Bản đồ Thực tế</div>
                            <div style="flex:1; display:flex; justify-content:center; align-items:center; position:relative; margin:15px 0; background:#070a12; border-radius:16px;">
                                <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 15px 15px;"></div>
                                <!-- Sketching streets mockup -->
                                <div class="street-block-s2" style="position:absolute; width:130px; height:100px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; top:40px; left:40px;"></div>
                                <div class="street-block-s2" style="position:absolute; width:130px; height:100px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; top:40px; right:40px;"></div>
                                <div class="street-block-s2" style="position:absolute; width:130px; height:100px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; bottom:40px; left:40px;"></div>
                                <div class="street-block-s2" style="position:absolute; width:130px; height:100px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; bottom:40px; right:40px;"></div>
                                
                                <span style="font-size:75px; z-index:5;">🗺️</span>
                            </div>
                        </div>

                        <!-- Central Arrow -->
                        <div style="position:relative; width:80px; display:flex; align-items:center; justify-content:center;">
                            <i data-lucide="arrow-right" style="color:var(--gold-primary); width:32px; height:32px;"></i>
                        </div>

                        <!-- Right View: Graph view representation -->
                        <div class="glass-card" style="width:480px; height:580px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; position:relative; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-transform:uppercase;">Graph (Đồ thị toán học)</div>
                            
                            <div style="flex:1; position:relative; margin:15px 0; background:#070a12; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.03);">
                                <!-- Graph Canvas drawing connections -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <line x1="80" y1="120" x2="220" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                    <line x1="80" y1="120" x2="150" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                    <line x1="220" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                    <line x1="220" y1="120" x2="290" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                    <line x1="150" y1="280" x2="290" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                    <line x1="290" y1="280" x2="360" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
                                </svg>
                                
                                <!-- Edges Weights Labels -->
                                <span class="edge-weight" style="position:absolute; left:140px; top:95px; background:rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.15); padding:2px 8px; border-radius:6px; font-size:14px; font-family:monospace; color:#ff5722; font-weight:bold; z-index:3; opacity:0; transition:opacity 0.3s;">3 phút</span>
                                <span class="edge-weight" style="position:absolute; left:280px; top:95px; background:rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.15); padding:2px 8px; border-radius:6px; font-size:14px; font-family:monospace; color:#ff5722; font-weight:bold; z-index:3; opacity:0; transition:opacity 0.3s;">500 m</span>
                                
                                <!-- Nodes representation (glowing nodes) -->
                                <div class="graph-node-s2 n-a" style="position:absolute; left:80px; top:120px; width:44px; height:44px; border-radius:50%; background:#10b981; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#000; z-index:5; box-shadow:0 0 15px #10b981;">A</div>
                                <div class="graph-node-s2 n-b" style="position:absolute; left:220px; top:120px; width:44px; height:44px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; transition:all 0.3s;">B</div>
                                <div class="graph-node-s2 n-c" style="position:absolute; left:360px; top:120px; width:44px; height:44px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; box-shadow:0 0 15px #ef4444;">C</div>
                                <div class="graph-node-s2 n-d" style="position:absolute; left:150px; top:280px; width:44px; height:44px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; transition:all 0.3s;">D</div>
                                <div class="graph-node-s2 n-e" style="position:absolute; left:290px; top:280px; width:44px; height:44px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; transition:all 0.3s;">E</div>
                            </div>
                            
                            <div style="background:rgba(245,158,11,0.04); border:1px solid rgba(245,158,11,0.15); border-radius:16px; padding:15px; display:flex; justify-content:space-around; align-items:center; font-size:16px;">
                                <span style="display:flex; align-items:center; gap:6px;"><span style="width:14px; height:14px; border-radius:50%; background:#10b981; display:block;"></span> Node (Giao lộ)</span>
                                <span style="display:flex; align-items:center; gap:6px;"><span style="width:30px; height:4px; background:rgba(255,255,255,0.4); display:block;"></span> Edge (Con đường)</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.22;">
                        <!-- Dijkstra Visualizer Grid -->
                        <div class="glass-card" style="width:100%; max-width:800px; height:480px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Tìm kiếm Loang rộng (Dijkstra)</div>
                            
                            <!-- Search Canvas -->
                            <div style="flex:1; height:380px; position:relative; margin-top:15px; background:#070a12; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.03); display:flex; justify-content:center; align-items:center;">
                                <div style="width:700px; height:100%; position:relative; margin:0 auto;">
                                    <!-- Dijkstra Ripple Rings (Concentric circles growing outwards) -->
                                    <div class="dijkstra-ripple r1" style="position:absolute; left:80px; top:50%; width:0px; height:0px; border-radius:50%; border:2px solid #ef4444; background:rgba(239,68,68,0.015); transform:translate(-50%, -50%); opacity:0; pointer-events:none;"></div>
                                    <div class="dijkstra-ripple r2" style="position:absolute; left:80px; top:50%; width:0px; height:0px; border-radius:50%; border:2px solid #ef4444; background:rgba(239,68,68,0.015); transform:translate(-50%, -50%); opacity:0; pointer-events:none;"></div>
                                    
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="dijkstra-svg">
                                        <!-- Radial network lines -->
                                        <line x1="80" y1="190" x2="200" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e1" />
                                        <line x1="80" y1="190" x2="200" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e2" />
                                        <line x1="200" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e3" />
                                        <line x1="200" y1="280" x2="350" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e4" />
                                        <line x1="350" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e5" />
                                        <line x1="350" y1="280" x2="500" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e6" />
                                        <line x1="500" y1="100" x2="620" y2="190" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e7" />
                                        <line x1="500" y1="280" x2="620" y2="190" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" class="d-edge e8" />
                                    </svg>
                                    
                                    <!-- Nodes -->
                                    <div class="d-node start" style="position:absolute; left:80px; top:190px; width:44px; height:44px; border-radius:50%; background:#10b981; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#000; z-index:5; box-shadow:0 0 15px #10b981;">A</div>
                                    <div class="d-node n-1" style="position:absolute; left:200px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node n-2" style="position:absolute; left:200px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node n-3" style="position:absolute; left:350px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node n-4" style="position:absolute; left:350px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node n-5" style="position:absolute; left:500px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node n-6" style="position:absolute; left:500px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="d-node dest" style="position:absolute; left:620px; top:190px; width:44px; height:44px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; transition:all 0.3s;">B</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.22;">
                        <!-- A* Visualizer Grid -->
                        <div class="glass-card" style="width:100%; max-width:800px; height:480px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Tìm kiếm Hướng mục tiêu (A* Heuristic)</div>
                                <div style="font-size:15px; font-weight:bold; color:#10b981; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:4px 10px; border-radius:8px; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="compass" style="width:16px; height:16px;"></i> Heuristic Hướng: ĐÔNG (Phía B)
                                </div>
                            </div>
                            
                            <!-- Search Canvas -->
                            <div style="flex:1; height:380px; position:relative; margin-top:15px; background:#070a12; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.03); display:flex; justify-content:center; align-items:center;">
                                <div style="width:700px; height:100%; position:relative; margin:0 auto;">
                                    <!-- Heuristic Direction Vector (glowing arrow pointing east) -->
                                    <div class="heuristic-vector" style="position:absolute; left:120px; top:50%; width:460px; height:6px; background:linear-gradient(to right, rgba(16,185,129,0.5), transparent); transform:translateY(-50%); pointer-events:none; z-index:1; border-radius:3px;">
                                        <div style="position:absolute; right:0; top:-8px; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:14px solid rgba(16,185,129,0.8);"></div>
                                    </div>

                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="astar-svg">
                                        <line x1="80" y1="190" x2="200" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-1" />
                                        <line x1="80" y1="190" x2="200" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-2" />
                                        <line x1="200" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-3" />
                                        <line x1="200" y1="280" x2="350" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-4" />
                                        <line x1="350" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-5" />
                                        <line x1="350" y1="280" x2="500" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-6" />
                                        <line x1="500" y1="100" x2="620" y2="190" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-7" />
                                        <line x1="500" y1="280" x2="620" y2="190" stroke="rgba(255,255,255,0.1)" stroke-width="3" class="a-edge ea-8" />
                                    </svg>
                                    
                                    <!-- Nodes -->
                                    <div class="a-node start" style="position:absolute; left:80px; top:190px; width:44px; height:44px; border-radius:50%; background:#10b981; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#000; z-index:5; box-shadow:0 0 15px #10b981;">A</div>
                                    <div class="a-node n-1" style="position:absolute; left:200px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node n-2" style="position:absolute; left:200px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node n-3" style="position:absolute; left:350px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node n-4" style="position:absolute; left:350px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node n-5" style="position:absolute; left:500px; top:100px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node n-6" style="position:absolute; left:500px; top:280px; width:40px; height:40px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.2); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="a-node dest" style="position:absolute; left:620px; top:190px; width:44px; height:44px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; transition:all 0.3s;">B</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.22;">
                        <!-- Road Levels Map -->
                        <div class="glass-card" style="width:100%; max-width:800px; height:480px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Hạ tầng Phân cấp Đường (Hierarchical Simplification)</div>
                            
                            <div style="flex:1; height:380px; position:relative; margin-top:15px; background:#070a12; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.03); display:flex; justify-content:center; align-items:center;">
                                <div style="width:700px; height:100%; position:relative; margin:0 auto;">
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="hierarchy-svg">
                                        <!-- High-Level Highways (Thick lines) -->
                                        <path class="highway-path" d="M 80 190 L 350 90 L 620 190" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" style="opacity:0.8;" />
                                        <path class="highway-path" d="M 80 190 L 260 270 L 440 270 L 620 190" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" style="opacity:0.8;" />
                                        
                                        <!-- Local Alleys (Thin nested lines, dimmed out on click) -->
                                        <line x1="80" y1="190" x2="215" y2="140" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="215" y1="140" x2="350" y2="90" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="350" y1="90" x2="485" y2="140" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="485" y1="140" x2="620" y2="190" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        
                                        <line x1="80" y1="190" x2="170" y2="230" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="170" y1="230" x2="260" y2="270" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="260" y1="270" x2="350" y2="270" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="350" y1="270" x2="440" y2="270" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="440" y1="270" x2="530" y2="230" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                        <line x1="530" y1="230" x2="620" y2="190" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" class="alley-road" />
                                    </svg>
                                    
                                    <!-- Labels for High-Level Highways -->
                                    <div style="position:absolute; left:350px; top:65px; color:#f59e0b; font-size:15px; font-weight:bold; transform:translate(-50%, -50%); text-shadow:0 2px 4px rgba(0,0,0,0.8); pointer-events:none; z-index:10;">Cao tốc CT01</div>
                                    <div style="position:absolute; left:350px; top:295px; color:#f59e0b; font-size:15px; font-weight:bold; transform:translate(-50%, -50%); text-shadow:0 2px 4px rgba(0,0,0,0.8); pointer-events:none; z-index:10;">Quốc lộ 1A</div>

                                    <!-- Labels and Nodes -->
                                    <div style="position:absolute; left:80px; top:190px; width:44px; height:44px; border-radius:50%; background:#10b981; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#000; z-index:5; box-shadow:0 0 15px #10b981;">A</div>
                                    <div style="position:absolute; left:620px; top:190px; width:44px; height:44px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; box-shadow:0 0 15px #ef4444;">B</div>
                                    
                                    <!-- Map overlay legend -->
                                    <div style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.85); padding:10px 18px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:8px; font-size:15px; z-index:10;">
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="width:24px; height:8px; background:#f59e0b; border-radius:3px; display:block;"></span>
                                            <span style="font-weight:bold; color:#fff;">Cao tốc / Quốc lộ</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; opacity: 0.6;" class="legend-alley">
                                            <span style="width:24px; height:3px; background:rgba(255,255,255,0.4); display:block;"></span>
                                            <span style="color:#d1d5db;">Hẻm / Đường nhánh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.22;">
                        <!-- Bidirectional Search Visualizer -->
                        <div class="glass-card" style="width:100%; max-width:800px; height:480px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Tìm kiếm Hai đầu cùng lúc (Bidirectional Search)</div>
                            
                            <div style="flex:1; height:380px; position:relative; margin-top:15px; background:#070a12; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.03); display:flex; justify-content:center; align-items:center;">
                                <div style="width:700px; height:100%; position:relative; margin:0 auto;">
                                    <!-- Ripple rings from both sides -->
                                    <div class="bidir-ripple left-wave" style="position:absolute; left:80px; top:50%; width:0px; height:0px; border-radius:50%; border:2px solid #10b981; background:rgba(16,185,129,0.015); transform:translate(-50%, -50%); opacity:0; z-index:1;"></div>
                                    <div class="bidir-ripple right-wave" style="position:absolute; left:620px; top:50%; width:0px; height:0px; border-radius:50%; border:2px solid #3b82f6; background:rgba(59,130,246,0.015); transform:translate(-50%, -50%); opacity:0; z-index:1;"></div>
                                    
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="bidir-svg">
                                        <path class="bidir-edge" d="M 80 190 L 215 190 L 350 190 L 485 190 L 620 190" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="4.5" />
                                        <!-- Dynamic glows path -->
                                        <path class="bidir-path-left" d="M 80 190 L 350 190" fill="none" stroke="#10b981" stroke-width="7" stroke-dasharray="270" stroke-dashoffset="270" />
                                        <path class="bidir-path-right" d="M 620 190 L 350 190" fill="none" stroke="#3b82f6" stroke-width="7" stroke-dasharray="270" stroke-dashoffset="270" />
                                    </svg>
                                    
                                    <!-- Nodes -->
                                    <div style="position:absolute; left:80px; top:190px; width:46px; height:46px; border-radius:50%; background:#10b981; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#000; z-index:5; box-shadow:0 0 15px #10b981;">A</div>
                                    <div class="bidir-node n-l1" style="position:absolute; left:215px; top:190px; width:36px; height:36px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div class="bidir-node intersection" style="position:absolute; left:350px; top:190px; width:44px; height:44px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:10; display:flex; align-items:center; justify-content:center; font-size:22px; transition:all 0.3s;">🤝</div>
                                    <div class="bidir-node n-r1" style="position:absolute; left:485px; top:190px; width:36px; height:36px; border-radius:50%; background:#2d3748; border:2px solid rgba(255,255,255,0.3); transform:translate(-50%,-50%); z-index:5; transition:all 0.3s;"></div>
                                    <div style="position:absolute; left:620px; top:190px; width:46px; height:46px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:#fff; z-index:5; box-shadow:0 0 15px #ef4444;">B</div>
                                    
                                    <!-- Central Flash Glow -->
                                    <div class="bidir-flash" style="position:absolute; left:350px; top:190px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle, rgba(245,158,11,0.8) 0%, transparent 70%); transform:translate(-50%,-50%) scale(0); opacity:0; z-index:4; pointer-events:none; transition:all 0.3s;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_7') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- Route A (Short distance, Congested) -->
                        <div class="glass-card route-card ra" style="width:400px; height:580px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#120c0f; transition:all 0.3s;">
                            <div>
                                <div style="font-size:20px; font-weight:bold; color:#ef4444; border-bottom:1.5px solid rgba(239,68,68,0.15); padding-bottom:8px; text-transform:uppercase;">Tuyến đường ngắn A</div>
                                <div style="font-size:15px; color:rgba(255,255,255,0.4); margin-top:6px;">Chạy xuyên đô thị nhiều đèn đỏ</div>
                            </div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px;">
                                <div style="background:rgba(239,68,68,0.05); border:1.5px solid rgba(239,68,68,0.2); border-radius:18px; padding:20px; width:80%; text-align:center;">
                                    <div style="font-size:20px; color:#fff;">Khoảng cách:</div>
                                    <div style="font-size:38px; font-weight:900; color:#ef4444; font-family:monospace; margin-top:5px;">5 km</div>
                                </div>
                                <div style="background:rgba(239,68,68,0.05); border:1.5px solid rgba(239,68,68,0.2); border-radius:18px; padding:20px; width:80%; text-align:center;">
                                    <div style="font-size:20px; color:#fff;">Thời gian di chuyển:</div>
                                    <div style="font-size:38px; font-weight:900; color:#ef4444; font-family:monospace; margin-top:5px;">35 phút</div>
                                </div>
                            </div>

                            <div style="background:rgba(239,68,68,0.15); color:#ef4444; border-radius:12px; padding:12px; font-size:16px; text-align:center; font-weight:bold;">
                                ⚠️ Nhiều điểm ùn tắc nặng
                            </div>
                        </div>

                        <!-- Route B (Longer distance, Flowing highway) -->
                        <div class="glass-card route-card rb" style="width:400px; height:580px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c1214; transition:all 0.3s; position:relative;">
                            <div class="rec-badge" style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#10b981; color:#000; font-size:13px; font-weight:bold; padding:4px 14px; border-radius:10px; text-transform:uppercase; letter-spacing:0.5px; opacity:0; transition:all 0.3s;">Khuyên Dùng (Fastest)</div>
                            <div>
                                <div style="font-size:20px; font-weight:bold; color:#10b981; border-bottom:1.5px solid rgba(16,185,129,0.15); padding-bottom:8px; text-transform:uppercase;">Tuyến đường dài B</div>
                                <div style="font-size:15px; color:rgba(255,255,255,0.4); margin-top:6px;">Đi vòng bằng đường cao tốc</div>
                            </div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px;">
                                <div style="background:rgba(16,185,129,0.05); border:1.5px solid rgba(16,185,129,0.2); border-radius:18px; padding:20px; width:80%; text-align:center;">
                                    <div style="font-size:20px; color:#fff;">Khoảng cách:</div>
                                    <div style="font-size:38px; font-weight:900; color:#10b981; font-family:monospace; margin-top:5px;">8 km</div>
                                </div>
                                <div style="background:rgba(16,185,129,0.05); border:1.5px solid rgba(16,185,129,0.2); border-radius:18px; padding:20px; width:80%; text-align:center;">
                                    <div style="font-size:20px; color:#fff;">Thời gian di chuyển:</div>
                                    <div style="font-size:38px; font-weight:900; color:#10b981; font-family:monospace; margin-top:5px;">12 phút</div>
                                </div>
                            </div>

                            <div style="background:rgba(16,185,129,0.15); color:#10b981; border-radius:12px; padding:12px; font-size:16px; text-align:center; font-weight:bold;">
                                ✅ Đường thông thoáng cực kỳ
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_8') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.15;">
                        <!-- Real-time Traffic Simulator Map -->
                        <div class="glass-card" style="width:100%; max-width:850px; height:290px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 0 25px rgba(245,158,11,0.15);">
                            <div style="font-size:18px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left; display:flex; justify-content:space-between; align-items:center;">
                                <span>Dòng chảy phương tiện thực tế (Crowdsourced GPS)</span>
                                <span style="font-size:13px; background:rgba(245,158,11,0.15); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold; letter-spacing:0.5px;">LIVE CORRELATION</span>
                            </div>
                            
                            <div style="display:flex; flex-direction:column; gap:16px; margin-top:18px;">
                                <!-- Lane 1: Highway (Clear) -->
                                <div style="position:relative; height:48px; background:rgba(255,255,255,0.015); border-radius:12px; border:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; padding:0 15px; overflow:hidden;">
                                    <div style="width:160px; text-align:left; font-size:14px; font-weight:bold; color:#10b981; display:flex; align-items:center; gap:8px; z-index:5;">
                                        <span style="width:8px; height:8px; border-radius:50%; background:#10b981;"></span> Tuyến Cao tốc
                                    </div>
                                    <div style="flex:1; position:relative; height:12px; background:rgba(16,185,129,0.15); border-radius:6px;" class="traffic-lane-1">
                                        <!-- Cars -->
                                        <div class="car-dot c-lane1-1" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane1-2" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane1-3" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                    </div>
                                    <div style="width:110px; text-align:right; font-size:14px; font-weight:bold; color:#10b981; z-index:5;" class="speed-label-1">80 km/h</div>
                                </div>

                                <!-- Lane 2: Main Road (Congested) -->
                                <div style="position:relative; height:48px; background:rgba(255,255,255,0.015); border-radius:12px; border:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; padding:0 15px; overflow:hidden;">
                                    <div style="width:160px; text-align:left; font-size:14px; font-weight:bold; color:#ef4444; display:flex; align-items:center; gap:8px; z-index:5;">
                                        <span style="width:8px; height:8px; border-radius:50%; background:#ef4444; animation:pulse-red 1s infinite;"></span> Đường nội đô
                                    </div>
                                    <div style="flex:1; position:relative; height:12px; background:rgba(16,185,129,0.15); border-radius:6px; overflow:hidden; display:flex;" class="traffic-lane-2">
                                        <div style="width:40%; height:100%; background:#10b981;"></div>
                                        <div style="width:30%; height:100%; background:#ef4444; box-shadow:0 0 15px rgba(239,68,68,0.5);"></div>
                                        <div style="width:30%; height:100%; background:#10b981;"></div>
                                        
                                        <!-- Cars -->
                                        <div class="car-dot c-lane2-1" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane2-2" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane2-3" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane2-4" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#ff5722; transform:translate(-50%,-50%); box-shadow:0 0 8px #ff5722; left:0%;"></div>
                                        <div class="car-dot c-lane2-5" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#ff5722; transform:translate(-50%,-50%); box-shadow:0 0 8px #ff5722; left:0%;"></div>
                                        <div class="car-dot c-lane2-6" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#ff5722; transform:translate(-50%,-50%); box-shadow:0 0 8px #ff5722; left:0%;"></div>
                                    </div>
                                    <div style="width:110px; text-align:right; font-size:14px; font-weight:bold; color:#ef4444; z-index:5;" class="speed-label-2">5 km/h</div>
                                </div>

                                <!-- Lane 3: Secondary Street (Moderate) -->
                                <div style="position:relative; height:48px; background:rgba(255,255,255,0.015); border-radius:12px; border:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; padding:0 15px; overflow:hidden;">
                                    <div style="width:160px; text-align:left; font-size:14px; font-weight:bold; color:#f59e0b; display:flex; align-items:center; gap:8px; z-index:5;">
                                        <span style="width:8px; height:8px; border-radius:50%; background:#f59e0b;"></span> Đường tránh phụ
                                    </div>
                                    <div style="flex:1; position:relative; height:12px; background:rgba(16,185,129,0.15); border-radius:6px; overflow:hidden; display:flex;" class="traffic-lane-3">
                                        <div style="width:60%; height:100%; background:#10b981;"></div>
                                        <div style="width:40%; height:100%; background:#f59e0b;"></div>
                                        
                                        <!-- Cars -->
                                        <div class="car-dot c-lane3-1" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane3-2" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                        <div class="car-dot c-lane3-3" style="position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff; left:0%;"></div>
                                    </div>
                                    <div style="width:110px; text-align:right; font-size:14px; font-weight:bold; color:#f59e0b; z-index:5;" class="speed-label-3">35 km/h</div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Panel: AI Traffic Model Chart -->
                        <div style="display:flex; justify-content:space-between; width:100%; max-width:850px; gap:20px;">
                            <div class="glass-card" style="flex:1.2; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; text-align:left; background:rgba(245,158,11,0.02); box-shadow:0 0 20px rgba(245,158,11,0.06); display:flex; flex-direction:column; gap:12px;">
                                <div style="font-size:16px; font-weight:bold; color:var(--gold-primary); text-transform:uppercase; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="brain-circuit" style="width:18px; height:18px; color:var(--gold-primary);"></i> Trí Tuệ Nhân Tạo Dự Đoán (Predictive ETA)
                                </div>
                                <div style="display:flex; flex-direction:column; gap:10px; font-size:15px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">
                                        <span style="color:#d1d5db; display:flex; align-items:center; gap:8px;"><i data-lucide="calendar-days" style="width:16px; height:16px; color:rgba(255,255,255,0.4);"></i> Mẫu hình lịch sử:</span>
                                        <span style="font-weight:bold; color:#fff;">Thứ Hai 8:00 AM (Hay kẹt)</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">
                                        <span style="color:#d1d5db; display:flex; align-items:center; gap:8px;"><i data-lucide="cloud-rain" style="width:16px; height:16px; color:rgba(255,255,255,0.4);"></i> Thời tiết & Sự kiện:</span>
                                        <span style="font-weight:bold; color:#fff;">Đang mưa to (+15 phút)</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(239,68,68,0.08); padding:8px 12px; border-radius:10px; border:1px solid rgba(239,68,68,0.2);">
                                        <span style="color:#fff; display:flex; align-items:center; gap:8px; font-weight:bold;"><i data-lucide="clock" style="width:16px; height:16px; color:#ef4444;"></i> Tổng thời gian chờ:</span>
                                        <span style="font-weight:bold; color:#ef4444; font-size:17px; font-family:monospace;">27 phút (Kẹt nặng)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="glass-card" style="flex:1; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:20px; text-align:center; display:flex; flex-direction:column; justify-content:space-between; background:rgba(255,255,255,0.01);">
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:8px; display:flex; align-items:center; justify-content:center; gap:8px;">
                                    <i data-lucide="shield-check" style="width:18px; height:18px; color:#10b981;"></i> Bảo mật GPS
                                </div>
                                
                                <div style="position:relative; height:100px; display:flex; align-items:center; justify-content:center; margin:10px 0;">
                                    <div style="position:absolute; width:70px; height:70px; border-radius:50%; border:1px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.02); animation:ping 2s infinite;" class="shield-scan-ring"></div>
                                    <i data-lucide="shield" style="width:60px; height:60px; color:#10b981; fill:rgba(16,185,129,0.1); filter:drop-shadow(0 0 10px rgba(16,185,129,0.4));" class="privacy-shield-icon"></i>
                                </div>
                                
                                <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); padding:8px 12px; border-radius:10px; display:flex; flex-direction:column; gap:2px;">
                                    <span style="font-size:14px; color:#10b981; font-weight:bold;">Dữ liệu ẩn danh 100%</span>
                                    <span style="font-size:12px; color:rgba(255,255,255,0.4);">Không định danh cá nhân</span>
                                </div>
                            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_maps_9') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:35px; zoom:0.83;">
                        <!-- Dynamic Map Reroute Phone -->
                        <div class="glass-card phone-mockup reroute-phone" style="width:400px; height:680px; border:2.5px solid #1877f2; border-radius:36px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; background:#0c0f17; position:relative; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.85);">
                            <!-- Status bar -->
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:10px; margin-bottom:12px; z-index:5;">
                                <span style="font-size:16px; font-weight:bold; color:#10b981; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="navigation" style="width:18px; height:18px; color:#10b981; fill:#10b981;"></i> Đang di chuyển...
                                </span>
                                <span style="font-size:13px; color:rgba(255,255,255,0.3); font-weight:bold;">ETA: 10:18 AM</span>
                            </div>

                            <!-- Map canvas -->
                            <div style="flex:1; position:relative; background:#070a12; border-radius:18px; border:1px solid rgba(255,255,255,0.03); overflow:hidden; z-index:2;">
                                <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 20px 20px;"></div>
                                
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:3;" class="reroute-svg">
                                    <!-- Original path -->
                                    <path class="reroute-original-path" d="M 60 300 L 200 300 L 320 300 L 320 80" fill="none" stroke="#1877f2" stroke-width="6" />
                                    <!-- Rerouted alternative path -->
                                    <path class="reroute-new-path" d="M 200 300 L 200 190 L 320 190 L 320 80" fill="none" stroke="#10b981" stroke-width="6" stroke-dasharray="250" stroke-dashoffset="250" style="opacity:0;" />
                                </svg>
                                
                                <!-- Car indicator -->
                                <div class="reroute-car-dot" style="position:absolute; left:60px; top:300px; width:20px; height:20px; border-radius:50%; background:#fff; border:3px solid #1877f2; transform:translate(-50%,-50%); box-shadow:0 0 10px #1877f2; z-index:10; transition:all 0.5s;"></div>
                                
                                <!-- Crash warning icon -->
                                <div class="crash-accident-icon" style="position:absolute; left:260px; top:300px; transform:translate(-50%,-50%) scale(0); opacity:0; font-size:32px; z-index:10; transition:all 0.4s;">💥</div>
                                
                                <div style="position:absolute; left:320px; top:80px; width:36px; height:36px; border-radius:50%; background:#ef4444; border:2px solid #fff; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; font-size:16px; z-index:5;">🏁</div>
                            </div>

                            <!-- Alert dynamic reroute -->
                            <div class="glass-card reroute-alert-panel" style="background:#161d2a; border:2.5px solid #10b981; border-radius:18px; padding:12px; display:flex; align-items:center; gap:10px; z-index:5; opacity:0; transform:translateY(20px); transition:all 0.4s; box-shadow:0 10px 20px rgba(0,0,0,0.5);">
                                <div style="width:36px; height:36px; border-radius:50%; background:#10b981; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size:18px;">💡</div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:15px; font-weight:bold; color:#10b981;">Phát hiện tuyến đường nhanh hơn!</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.6); margin-top:2px;">Tiết kiệm 12 phút - Tránh điểm tai nạn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_maps_1') {
            const p1 = canvas.querySelector('.intro-scan-path.sp-1');
            const p2 = canvas.querySelector('.intro-scan-path.sp-2');
            const p3 = canvas.querySelector('.intro-scan-path.sp-3');
            const winner = canvas.querySelector('.intro-winner-path');
            const etaCard = canvas.querySelector('.intro-eta-card');
            
            // Animation sequence:
            // 0.0 -> 0.6: Scanner paths scan the map
            // 0.6 -> 0.8: Green winner path lights up
            // 0.8 -> 1.0: ETA info card slides up
            
            if (progress < 0.6) {
                const ratio = progress / 0.6;
                const offset1 = 350 - (350 * ratio);
                const offset2 = 350 - (350 * ratio);
                const offset3 = 400 - (400 * ratio);
                
                if (p1) p1.style.strokeDashoffset = offset1.toString();
                if (p2) p2.style.strokeDashoffset = offset2.toString();
                if (p3) p3.style.strokeDashoffset = offset3.toString();
                if (winner) winner.style.opacity = '0';
                if (etaCard) { etaCard.style.opacity = '0'; etaCard.style.transform = 'translateY(30px)'; }
            }
            else if (progress >= 0.6 && progress < 0.8) {
                if (p1) p1.style.strokeDashoffset = '0';
                if (p2) p2.style.strokeDashoffset = '0';
                if (p3) p3.style.strokeDashoffset = '0';
                if (winner) winner.style.opacity = '1';
                if (etaCard) { etaCard.style.opacity = '0'; etaCard.style.transform = 'translateY(30px)'; }
            }
            else {
                // progress >= 0.8
                if (winner) winner.style.opacity = '1';
                if (etaCard) {
                    etaCard.style.opacity = '1';
                    etaCard.style.transform = 'translateY(0)';
                }
            }
        }
        else if (slideId === 'slide_maps_2') {
            const nodeB = canvas.querySelector('.graph-node-s2.n-b');
            const nodeD = canvas.querySelector('.graph-node-s2.n-d');
            const nodeE = canvas.querySelector('.graph-node-s2.n-e');
            const weights = canvas.querySelectorAll('.edge-weight');
            
            // Timeline:
            // 0.0 -> 0.4: Highlight nodes
            // 0.4 -> 0.8: Weights labels pop in
            
            if (progress > 0.25) {
                if (nodeB) { nodeB.style.background = '#f59e0b'; nodeB.style.borderColor = '#fff'; nodeB.style.boxShadow = '0 0 15px #f59e0b'; nodeB.style.color = '#000'; }
                if (nodeD) { nodeD.style.background = '#f59e0b'; nodeD.style.borderColor = '#fff'; nodeD.style.boxShadow = '0 0 15px #f59e0b'; nodeD.style.color = '#000'; }
                if (nodeE) { nodeE.style.background = '#f59e0b'; nodeE.style.borderColor = '#fff'; nodeE.style.boxShadow = '0 0 15px #f59e0b'; nodeE.style.color = '#000'; }
            } else {
                if (nodeB) { nodeB.style.background = '#2d3748'; nodeB.style.borderColor = 'rgba(255,255,255,0.3)'; nodeB.style.boxShadow = 'none'; nodeB.style.color = '#fff'; }
                if (nodeD) { nodeD.style.background = '#2d3748'; nodeD.style.borderColor = 'rgba(255,255,255,0.3)'; nodeD.style.boxShadow = 'none'; nodeD.style.color = '#fff'; }
                if (nodeE) { nodeE.style.background = '#2d3748'; nodeE.style.borderColor = 'rgba(255,255,255,0.3)'; nodeE.style.boxShadow = 'none'; nodeE.style.color = '#fff'; }
            }
            
            weights.forEach(w => {
                w.style.opacity = progress > 0.6 ? '1' : '0';
            });
        }
        else if (slideId === 'slide_maps_3') {
            const rip1 = canvas.querySelector('.dijkstra-ripple.r1');
            const rip2 = canvas.querySelector('.dijkstra-ripple.r2');
            const edges = canvas.querySelectorAll('.d-edge');
            const nodes = canvas.querySelectorAll('.d-node:not(.start):not(.dest)');
            const dest = canvas.querySelector('.d-node.dest');
            
            // Animation sequence:
            // ripples expand from left to right (A to B)
            
            if (progress > 0.05) {
                const ratio1 = Math.min(1, (progress - 0.05) / 0.8);
                const size1 = ratio1 * 750;
                if (rip1) {
                    rip1.style.width = `${size1}px`;
                    rip1.style.height = `${size1}px`;
                    rip1.style.opacity = (1 - ratio1).toString();
                }
            } else {
                if (rip1) { rip1.style.width = '0px'; rip1.style.height = '0px'; rip1.style.opacity = '0'; }
            }
            
            if (progress > 0.35) {
                const ratio2 = Math.min(1, (progress - 0.35) / 0.6);
                const size2 = ratio2 * 750;
                if (rip2) {
                    rip2.style.width = `${size2}px`;
                    rip2.style.height = `${size2}px`;
                    rip2.style.opacity = (1 - ratio2).toString();
                }
            } else {
                if (rip2) { rip2.style.width = '0px'; rip2.style.height = '0px'; rip2.style.opacity = '0'; }
            }

            // Light up edges based on progress
            edges.forEach((edge, idx) => {
                const triggerProgress = 0.1 + (idx * 0.08);
                if (progress > triggerProgress) {
                    edge.style.stroke = '#ef4444';
                    edge.style.opacity = '0.9';
                } else {
                    edge.style.stroke = 'rgba(255,255,255,0.15)';
                    edge.style.opacity = '1';
                }
            });

            // Light up nodes based on progress
            nodes.forEach((node, idx) => {
                const triggerProgress = 0.2 + (idx * 0.08);
                if (progress > triggerProgress) {
                    node.style.background = '#ef4444';
                    node.style.borderColor = '#fff';
                    node.style.boxShadow = '0 0 15px #ef4444';
                } else {
                    node.style.background = '#2d3748';
                    node.style.borderColor = 'rgba(255,255,255,0.3)';
                    node.style.boxShadow = 'none';
                }
            });

            // Target node resolves
            if (progress > 0.85) {
                if (dest) {
                    dest.style.background = '#10b981';
                    dest.style.boxShadow = '0 0 20px #10b981';
                }
            } else {
                if (dest) {
                    dest.style.background = '#ef4444';
                    dest.style.boxShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_maps_4') {
            const edges = canvas.querySelectorAll('.a-edge');
            const nodes = canvas.querySelectorAll('.a-node:not(.start):not(.dest)');
            const dest = canvas.querySelector('.a-node.dest');
            
            // A* heuristic prioritized search:
            // Highlighting only paths on the upper level (going correct direction, closer to target)
            // upper nodes index: 0, 2, 4
            
            edges.forEach((edge, idx) => {
                // index mapping: upper roads: ea-1 (0), ea-3 (2), ea-5 (4), ea-7 (6)
                const isUpper = [0, 2, 4, 6].includes(idx);
                const triggerProgress = 0.15 + (idx * 0.08);
                
                if (progress > triggerProgress) {
                    if (isUpper) {
                        edge.style.stroke = '#10b981';
                        edge.style.strokeWidth = '5px';
                    } else {
                        edge.style.stroke = 'rgba(255,255,255,0.05)';
                    }
                } else {
                    edge.style.stroke = 'rgba(255,255,255,0.1)';
                    edge.style.strokeWidth = '3px';
                }
            });
            
            nodes.forEach((node, idx) => {
                // index mapping: upper nodes: n-1 (idx 0), n-3 (idx 2), n-5 (idx 4)
                const isUpper = [0, 2, 4].includes(idx);
                const triggerProgress = 0.25 + (idx * 0.1);
                
                if (progress > triggerProgress) {
                    if (isUpper) {
                        node.style.background = '#10b981';
                        node.style.borderColor = '#fff';
                        node.style.boxShadow = '0 0 15px #10b981';
                    } else {
                        node.style.background = 'rgba(45, 55, 72, 0.2)';
                        node.style.borderColor = 'rgba(255,255,255,0.08)';
                    }
                } else {
                    node.style.background = '#2d3748';
                    node.style.borderColor = 'rgba(255,255,255,0.2)';
                    node.style.boxShadow = 'none';
                }
            });
            
            if (progress > 0.8) {
                if (dest) {
                    dest.style.background = '#10b981';
                    dest.style.boxShadow = '0 0 20px #10b981';
                }
            } else {
                if (dest) {
                    dest.style.background = '#ef4444';
                    dest.style.boxShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_maps_5') {
            const alleys = canvas.querySelectorAll('.alley-road');
            const legendAlley = canvas.querySelector('.legend-alley');
            
            // Animation sequence:
            // Alleys dim out to show simplification
            
            if (progress > 0.35) {
                alleys.forEach(a => {
                    a.style.opacity = '0.05';
                    a.style.stroke = 'rgba(255,255,255,0.02)';
                });
                if (legendAlley) legendAlley.style.opacity = '0.15';
            } else {
                alleys.forEach(a => {
                    a.style.opacity = '1';
                    a.style.stroke = 'rgba(255,255,255,0.25)';
                });
                if (legendAlley) legendAlley.style.opacity = '0.6';
            }
        }
        else if (slideId === 'slide_maps_6') {
            const ripLeft = canvas.querySelector('.left-wave');
            const ripRight = canvas.querySelector('.right-wave');
            const pLeft = canvas.querySelector('.bidir-path-left');
            const pRight = canvas.querySelector('.bidir-path-right');
            const meetNode = canvas.querySelector('.intersection');
            const flash = canvas.querySelector('.bidir-flash');
            
            // Animation sequence:
            // Waves progress from both sides and meet at the center node at progress = 0.6
            
            if (progress < 0.6) {
                const ratio = progress / 0.6;
                const offset = 270 - (270 * ratio);
                
                if (pLeft) pLeft.style.strokeDashoffset = offset.toString();
                if (pRight) pRight.style.strokeDashoffset = offset.toString();
                
                // Waves ripples scale up
                const size = ratio * 320;
                if (ripLeft) { ripLeft.style.width = `${size}px`; ripLeft.style.height = `${size}px`; ripLeft.style.opacity = (1 - ratio).toString(); }
                if (ripRight) { ripRight.style.width = `${size}px`; ripRight.style.height = `${size}px`; ripRight.style.opacity = (1 - ratio).toString(); }
                
                if (meetNode) { meetNode.style.background = '#2d3748'; meetNode.style.boxShadow = 'none'; meetNode.style.transform = 'translate(-50%,-50%) scale(1)'; }
                if (flash) { flash.style.transform = 'translate(-50%,-50%) scale(0)'; flash.style.opacity = '0'; }
            }
            else {
                // progress >= 0.6
                if (pLeft) pLeft.style.strokeDashoffset = '0';
                if (pRight) pRight.style.strokeDashoffset = '0';
                if (ripLeft) ripLeft.style.opacity = '0';
                if (ripRight) ripRight.style.opacity = '0';
                
                // Meeting flash
                const flashRatio = Math.min(1, (progress - 0.6) / 0.2);
                if (meetNode) {
                    meetNode.style.background = '#f59e0b';
                    meetNode.style.borderColor = '#fff';
                    meetNode.style.boxShadow = '0 0 25px #f59e0b';
                    meetNode.style.transform = 'translate(-50%,-50%) scale(1.15)';
                }
                if (flash) {
                    flash.style.transform = `translate(-50%,-50%) scale(${flashRatio * 1.6})`;
                    flash.style.opacity = (1 - flashRatio).toString();
                }
            }
        }
        else if (slideId === 'slide_maps_7') {
            const badge = canvas.querySelector('.rb .rec-badge');
            const cardA = canvas.querySelector('.ra');
            const cardB = canvas.querySelector('.rb');
            
            // Highlight B at the end
            if (progress > 0.6) {
                if (badge) badge.style.opacity = '1';
                if (cardB) { cardB.style.borderColor = '#10b981'; cardB.style.boxShadow = '0 0 35px rgba(16,185,129,0.3)'; }
                if (cardA) { cardA.style.opacity = '0.35'; cardA.style.borderColor = 'rgba(255,255,255,0.06)'; }
            } else {
                if (badge) badge.style.opacity = '0';
                if (cardB) { cardB.style.borderColor = 'rgba(255,255,255,0.06)'; cardB.style.boxShadow = 'none'; }
                if (cardA) { cardA.style.opacity = '1'; cardA.style.borderColor = 'rgba(255,255,255,0.06)'; }
            }
        }
        else if (slideId === 'slide_maps_8') {
            // Lane 1: 3 cars (c-lane1-1, c-lane1-2, c-lane1-3)
            const lane1Cars = canvas.querySelectorAll('.car-dot.c-lane1-1, .car-dot.c-lane1-2, .car-dot.c-lane1-3');
            lane1Cars.forEach((c, idx) => {
                const t = (progress * 2.8 + idx * 0.33) % 1.0;
                c.style.left = `${t * 100}%`;
            });
            
            // Lane 2: 6 cars (c-lane2-1 to c-lane2-6) - bottleneck slow down in red zone (40%-70%)
            const lane2Cars = canvas.querySelectorAll('.car-dot.c-lane2-1, .car-dot.c-lane2-2, .car-dot.c-lane2-3, .car-dot.c-lane2-4, .car-dot.c-lane2-5, .car-dot.c-lane2-6');
            lane2Cars.forEach((c, idx) => {
                const t = (progress * 1.3 + idx * 0.16) % 1.0;
                let percentage = 0;
                if (t < 0.3) {
                    percentage = (t / 0.3) * 40;
                } else if (t < 0.8) {
                    percentage = 40 + ((t - 0.3) / 0.5) * 30;
                } else {
                    percentage = 70 + ((t - 0.8) / 0.2) * 30;
                }
                c.style.left = `${percentage}%`;
            });
            
            // Lane 3: 3 cars (c-lane3-1 to c-lane3-3) - moderate speed in yellow zone (60%-100%)
            const lane3Cars = canvas.querySelectorAll('.car-dot.c-lane3-1, .car-dot.c-lane3-2, .car-dot.c-lane3-3');
            lane3Cars.forEach((c, idx) => {
                const t = (progress * 1.8 + idx * 0.33) % 1.0;
                let percentage = 0;
                if (t < 0.5) {
                    percentage = (t / 0.5) * 60;
                } else {
                    percentage = 60 + ((t - 0.5) / 0.5) * 40;
                }
                c.style.left = `${percentage}%`;
            });
        }
        else if (slideId === 'slide_maps_9') {
            const car = canvas.querySelector('.reroute-car-dot');
            const crash = canvas.querySelector('.crash-accident-icon');
            const originalPath = canvas.querySelector('.reroute-original-path');
            const newPath = canvas.querySelector('.reroute-new-path');
            const alertBox = canvas.querySelector('.reroute-alert-panel');
            
            // Timeline:
            // 0.0 -> 0.3: Car moves from start to intersection (200px, 300px)
            // 0.3 -> 0.4: Crash alert triggers ahead. Path ahead turns red.
            // 0.4 -> 0.6: Alternative path recalculates (grows green). Alert pops up.
            // 0.6 -> 1.0: Car changes direction, moves along new path.
            
            if (progress < 0.3) {
                const ratio = progress / 0.3;
                const currentX = 60 + (200 - 60) * ratio;
                if (car) { car.style.left = `${currentX}px`; car.style.top = '300px'; }
                if (crash) { crash.style.opacity = '0'; crash.style.transform = 'translate(-50%,-50%) scale(0)'; }
                if (originalPath) originalPath.style.stroke = '#1877f2';
                if (newPath) { newPath.style.opacity = '0'; newPath.style.strokeDashoffset = '250'; }
                if (alertBox) { alertBox.style.opacity = '0'; alertBox.style.transform = 'translateY(20px)'; }
            }
            else if (progress >= 0.3 && progress < 0.45) {
                if (car) { car.style.left = '200px'; car.style.top = '300px'; }
                
                // Trigger Crash alert
                if (crash) { crash.style.opacity = '1'; crash.style.transform = 'translate(-50%,-50%) scale(1)'; }
                if (originalPath) originalPath.style.stroke = '#ef4444'; // Red alert!
            }
            else if (progress >= 0.45 && progress < 0.65) {
                if (car) { car.style.left = '200px'; car.style.top = '300px'; }
                if (crash) { crash.style.opacity = '1'; crash.style.transform = 'translate(-50%,-50%) scale(1)'; }
                
                // Calculate new green path
                const ratio = (progress - 0.45) / 0.2; // 0 to 1
                const offset = 250 - (250 * ratio);
                if (newPath) {
                    newPath.style.opacity = '1';
                    newPath.style.strokeDashoffset = offset.toString();
                }
                
                // Alert popup
                if (alertBox) { alertBox.style.opacity = '1'; alertBox.style.transform = 'translateY(0)'; }
            }
            else {
                // progress >= 0.65
                if (crash) { crash.style.opacity = '1'; crash.style.transform = 'translate(-50%,-50%) scale(1)'; }
                if (newPath) { newPath.style.opacity = '1'; newPath.style.strokeDashoffset = '0'; }
                if (alertBox) { alertBox.style.opacity = '1'; alertBox.style.transform = 'translateY(0)'; }
                
                // Move car along new path: (200px, 300px) -> (200px, 190px) -> (320px, 190px) -> (320px, 80px)
                const ratio = (progress - 0.65) / 0.35; // 0 to 1
                let currentX = 200;
                let currentY = 300;
                
                if (ratio < 0.3) {
                    const localRatio = ratio / 0.3;
                    currentY = 300 - (300 - 190) * localRatio;
                } else if (ratio >= 0.3 && ratio < 0.7) {
                    const localRatio = (ratio - 0.3) / 0.4;
                    currentY = 190;
                    currentX = 200 + (320 - 200) * localRatio;
                } else {
                    const localRatio = (ratio - 0.7) / 0.3;
                    currentX = 320;
                    currentY = 190 - (190 - 80) * localRatio;
                }
                
                if (car) { car.style.left = `${currentX}px`; car.style.top = `${currentY}px`; }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video19',
        topic: 'Google Maps Router',
        episodeNum: 19,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video19 Plugin] Loaded: Google Maps Router slides ready.');
})();
