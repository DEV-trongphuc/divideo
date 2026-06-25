/**
 * Video 54: Google Maps Traffic Detection Simulation
 * Plugin containing animations for map street grids, GPS signal wave transmissions, traffic speed vectors, and cart hacks.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_map_1: [
            { text: 'kẹt xe', start: 1.0, end: 5.5, class: 'active-bad' }
        ],
        slide_map_1_a: [
            { text: 'vệ tinh', start: 1.0, end: 3.5, class: 'active-blue' },
            { text: 'camera', start: 3.5, end: 6.0, class: 'active-gold' }
        ],
        slide_map_1_b: [
            { text: 'vệ tinh', start: 1.0, end: 3.5, class: 'active-bad' },
            { text: 'camera', start: 3.5, end: 7.0, class: 'active-bad' }
        ],
        slide_map_2: [
            { text: 'trong túi quần', start: 1.5, end: 5.5, class: 'active-gold' },
            { text: 'định vị', start: 5.5, end: 9.0, class: 'active-blue' },
            { text: 'ẩn danh', start: 9.0, end: 13.0, class: 'active-good' }
        ],
        slide_map_3: [
            { text: 'mật độ', start: 1.0, end: 4.5, class: 'active-blue' },
            { text: 'rùa bò', start: 4.5, end: 9.0, class: 'active-bad' },
            { text: 'màu đỏ', start: 9.0, end: 14.0, class: 'active-bad' }
        ],
        slide_map_4: [
            { text: 'chín mươi chín', start: 2.0, end: 6.5, class: 'active-blue' },
            { text: 'xe kéo', start: 6.5, end: 10.0, class: 'active-gold' },
            { text: 'kẹt xe đỏ rực', start: 10.0, end: 15.0, class: 'active-bad' }
        ]
    };

    const customSlideIds = [
        'slide_map_1', 'slide_map_1_a', 'slide_map_1_b', 'slide_map_2', 'slide_map_3', 'slide_map_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // Wrap GFX with layout zoom container
    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v54-zoom-container">${absHtml}<div class="v54-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_map_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-logo-intro-container">
                    <div class="v54-logo-glow-ring"></div>
                    <div class="v54-logo-glow-ring inner"></div>
                    <div class="v54-giant-logo">
                        <div class="v54-logo-icon-wrapper">
                            <img src="/static/google_maps_pin.png" class="v54-logo-img" />
                        </div>
                        <div class="v54-logo-pulse-dot"></div>
                    </div>
                </div>
                <div class="v54-glass-card glow-gold">
                    <span class="v54-status-badge gold"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> BÍ ẨN CÔNG NGHỆ</span>
                    <span style="color:#fff; font-size:18px; font-weight:700; line-height:1.5;" id="v54-intro-status">Vệ tinh do thám hay camera khắp mọi nơi? Làm sao Google Maps biết được?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_map_1_a') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-scene-row" style="display:flex; justify-content:center; align-items:center; gap:24px; padding: 10px;">
                    <!-- Left: Satellite Card -->
                    <div class="v54-node-card-s1a satellite" id="v54-s1a-sat">
                        <div class="v54-node-card-inner">
                            <div class="v54-s1a-icon-bg bg-blue">
                                <i data-lucide="orbit" style="width:36px; height:36px; color:#3b82f6;"></i>
                            </div>
                            <div class="v54-s1a-pulse-circle blue"></div>
                            <span class="v54-s1a-title">VỆ TINH DO THÁM</span>
                            <span class="v54-s1a-desc">Chụp ảnh & truyền dữ liệu từ vũ trụ</span>
                        </div>
                    </div>

                    <div style="font-size: 16px; font-weight: 800; color: rgba(255,255,255,0.15); font-family: monospace; z-index:3;">VS</div>

                    <!-- Right: Camera Card -->
                    <div class="v54-node-card-s1a camera" id="v54-s1a-cam">
                        <div class="v54-node-card-inner">
                            <div class="v54-s1a-icon-bg bg-gold">
                                <i data-lucide="video" style="width:36px; height:36px; color:#f59e0b;"></i>
                            </div>
                            <div class="v54-s1a-pulse-circle gold"></div>
                            <span class="v54-s1a-title">CAMERA GIÁM SÁT</span>
                            <span class="v54-s1a-desc">Gắn tại các ngã tư & giao lộ</span>
                        </div>
                    </div>
                </div>
                
                <div class="v54-glass-card glow-gold">
                    <span class="v54-status-badge gold"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> BÍ ẨN CÔNG NGHỆ</span>
                    <span style="color:#fff; font-size:18px; font-weight:700; line-height:1.5;" id="v54-intro-status">Do vệ tinh do thám hay camera giám sát được lắp đặt khắp các giao lộ?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_map_1_b') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-scene-row">
                    <!-- Top: Satellite & Camera surveillance panel (with cancel cross) -->
                    <div style="position:absolute; left:50%; top:10px; width:460px; height:80px; transform:translateX(-50%); display:flex; justify-content:center; align-items:center; gap:40px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:6px 20px; box-sizing:border-box; overflow:hidden; z-index:3;">
                        <!-- Satellite representation -->
                        <div class="v54-satellite-node" style="position:relative; right:auto; top:auto; width:130px; height:70px; display:flex; flex-direction:row; align-items:center; gap:10px;">
                            <div style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
                                <div class="v54-sat-wave" style="width:36px; height:36px; border-width:1.5px;" id="v54-sat-wave-el"></div>
                                <i data-lucide="orbit" style="width:26px; height:26px; color:#3b82f6; filter:none; animation:none;" id="v54-sat-icon"></i>
                            </div>
                            <span style="font-size:12px; margin-top:0; color:#fff; font-weight:800;">Vệ tinh</span>
                        </div>
                        <!-- Camera representation -->
                        <div class="v54-camera-node" style="position:relative; width:130px; height:70px; display:flex; flex-direction:row; align-items:center; gap:10px; color:#9ca3af;">
                            <div style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
                                <div class="v54-sat-wave" style="width:36px; height:36px; border-width:1.5px;" id="v54-cam-wave-el"></div>
                                <i data-lucide="video" style="width:26px; height:26px; color:#f59e0b;" id="v54-cam-icon"></i>
                            </div>
                            <span style="font-size:12px; margin-top:0; color:#fff; font-weight:800;">Camera</span>
                        </div>

                        <!-- Cancel Cross Overlay -->
                        <svg class="v54-cancel-cross" id="v54-cancel-cross-el" viewBox="0 0 100 100" style="width:75px; height:75px;">
                            <line x1="15" y1="15" x2="85" y2="85" stroke="#ef4444" stroke-width="12" stroke-linecap="round" />
                            <line x1="85" y1="15" x2="15" y2="85" stroke="#ef4444" stroke-width="12" stroke-linecap="round" />
                        </svg>
                    </div>
                    
                    <!-- Middle label (System check / Crossed status) -->
                    <div id="v54-s1b-label" style="position:absolute; left:50%; top:96px; transform:translateX(-50%); font-size:12px; font-weight:800; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px; z-index:5;">Kiểm tra hệ thống...</div>

                    <!-- Bottom: Premium Vector Map Grid (SVG paths like Video 19) -->
                    <div class="v54-map-grid" style="width:640px; height:200px; top:120px; left:0; background:#070a12; position:absolute; overflow:hidden; border:2.5px solid rgba(255,255,255,0.06); border-radius:18px;">
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                            <!-- Park green zones -->
                            <path class="v54-map-park" d="M 0 0 L 200 0 L 150 60 Q 80 70 0 50 Z" />
                            <path class="v54-map-park" d="M 450 150 Q 520 130 640 180 L 640 200 L 400 200 Z" />
                            <!-- River -->
                            <path class="v54-map-river" d="M -10 140 C 150 145, 300 110, 650 90" />
                            <!-- Thin grid lines -->
                            <line x1="10" y1="30" x2="630" y2="30" class="v54-map-grid-street" />
                            <line x1="10" y1="170" x2="630" y2="170" class="v54-map-grid-street" />
                            <line x1="40" y1="10" x2="40" y2="190" class="v54-map-grid-street" />
                            <line x1="580" y1="10" x2="580" y2="190" class="v54-map-grid-street" />
                        </svg>

                        <!-- Blocks -->
                        <div class="v54-map-block b1" style="z-index:2;"></div>
                        <div class="v54-map-block b2" style="z-index:2;"></div>
                        <div class="v54-map-block b3" style="z-index:2;"></div>
                        <div class="v54-map-block b4" style="z-index:2;"></div>

                        <!-- Street Lanes -->
                        <div class="v54-street-lane horizontal" id="v54-s1b-street-h" style="z-index:3;"></div>
                        <div class="v54-street-lane vertical" id="v54-s1b-street-v" style="z-index:3;"></div>

                        <!-- Animated traffic dots -->
                        <div class="v54-traffic-dot h-car" id="v54-vdot-1" style="z-index:4; position:absolute;">🚗</div>
                        <div class="v54-traffic-dot h-car" id="v54-vdot-2" style="z-index:4; position:absolute;">🚙</div>
                        <div class="v54-traffic-dot v-car" id="v54-vdot-3" style="z-index:4; position:absolute;">🚕</div>
                        <div class="v54-traffic-dot v-car" id="v54-vdot-4" style="z-index:4; position:absolute;">🚗</div>
                        <div class="v54-traffic-dot h-car" id="v54-vdot-5" style="z-index:4; position:absolute;">🚙</div>
                    </div>
                </div>

                <div class="v54-glass-card glow-blue">
                    <span class="v54-status-badge blue"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> THỰC TẾ TRÁI NGƯỢC</span>
                    <span style="color:#fff;" id="v54-map-s1b-status">Thực chất Google không cần lắp đặt camera hay phóng vệ tinh do thám để xem kẹt xe.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_map_2') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-scene-row">
                    <!-- Phone GPS transmitter on Left -->
                    <div class="v54-phone-mockup">
                        <div class="v54-gps-wave"></div>
                        <div class="v54-gps-wave w2"></div>
                        <i data-lucide="map-pin" class="v54-phone-gps"></i>
                        <span style="color:#fff; font-size:11px; font-weight:800; margin-top:8px;">Anonymous GPS</span>
                    </div>

                    <!-- Cloud Database on Right -->
                    <div class="v54-cloud-node">
                        <!-- Ripple element inside cloud -->
                        <div class="v54-cloud-ripple" id="v54-s2-cloud-rip" style="left:50%; top:50%; transform:translate(-50%,-50%);"></div>
                        <i data-lucide="cloud-lightning" style="position:relative; z-index:2;"></i>
                        <span class="v54-cloud-title" style="position:relative; z-index:2;">Google Servers</span>
                    </div>

                    <!-- Flying packets container -->
                    <div id="v54-packets-layer" style="position:absolute; inset:0; pointer-events:none; z-index:5;">
                        <div class="v54-data-packet" id="v54-pkt-1"></div>
                        <div class="v54-data-packet" id="v54-pkt-2"></div>
                        <div class="v54-data-packet" id="v54-pkt-3"></div>
                        
                        <!-- Floating packet labels (offset vertically to avoid overlapping when paused) -->
                        <div class="v54-packet-label" id="v54-pkt-lbl-1" style="position:absolute; font-size:10px; font-family:monospace; color:#38bdf8; opacity:0; pointer-events:none; font-weight:bold; text-shadow:0 1px 3px rgba(0,0,0,0.8);">GPS: 10.76, 106.66</div>
                        <div class="v54-packet-label" id="v54-pkt-lbl-2" style="position:absolute; font-size:10px; font-family:monospace; color:#38bdf8; opacity:0; pointer-events:none; font-weight:bold; text-shadow:0 1px 3px rgba(0,0,0,0.8);">Speed: 45 km/h</div>
                    </div>
                </div>

                <div class="v54-glass-card glow-green">
                    <span class="v54-status-badge green"><i data-lucide="smartphone" style="width:12px;height:12px;"></i> GPS CROWD-SOURCING</span>
                    <span style="color:#fff;" id="v54-map-s2-status">Bí mật nằm trong túi quần: Điện thoại liên tục phát đi tọa độ GPS.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_map_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-scene-row">
                    <div class="v54-road-track">
                        <!-- Speedometer badge -->
                        <div class="v54-speed-badge" id="v54-s3-speed">50 km/h</div>

                        <!-- Lane strip -->
                        <div class="v54-road-lane" id="v54-s3-lane">
                            <!-- Moving dashed dividers -->
                            <div class="v54-road-divider-container" id="v54-s3-dividers">
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                                <div class="v54-road-divider"></div>
                            </div>
                        </div>

                        <!-- Vehicles -->
                        <div class="v54-road-car" id="v54-car-1" style="position:absolute;">🚗</div>
                        <div class="v54-road-car" id="v54-car-2" style="position:absolute;">🚙</div>
                        <div class="v54-road-car" id="v54-car-3" style="position:absolute;">🚕</div>
                        <div class="v54-road-car" id="v54-car-4" style="position:absolute;">🏎️</div>

                        <!-- Sibling Exhaust smoke elements -->
                        <div class="v54-exhaust-smoke" id="v54-smoke-1">💨</div>
                        <div class="v54-exhaust-smoke" id="v54-smoke-2">💨</div>
                        <div class="v54-exhaust-smoke" id="v54-smoke-3">💨</div>
                        <div class="v54-exhaust-smoke" id="v54-smoke-4">💨</div>
                    </div>
                </div>

                <div class="v54-glass-card glow-red">
                    <span class="v54-status-badge red"><i data-lucide="users" style="width:12px;height:12px;"></i> PHÂN TÍCH MẬT ĐỘ</span>
                    <span style="color:#fff;" id="v54-map-s3-status">Nhiều thiết bị cùng di chuyển rùa bò -> Cảnh báo kẹt xe màu đỏ!</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_map_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v54-scene-row">
                    <!-- Street Track -->
                    <div class="v54-road-track" style="height: 100px; top: 60px;">
                        <!-- Street green background -->
                        <div class="v54-street-color-track"></div>
                        <!-- Red trail behind cart -->
                        <div class="v54-street-color-track-red" id="v54-s4-trail-red"></div>

                        <!-- Side street lane for approaching car -->
                        <div class="v54-side-lane" id="v54-s4-side-lane"></div>
                        <!-- Approaching car -->
                        <div class="v54-turning-car" id="v54-s4-turning-car" style="position:absolute;">🚗</div>
                        <!-- Confused alert above the car -->
                        <div id="v54-s4-car-alert" style="position:absolute; left:443px; top:-65px; font-size:22px; opacity:0; transition:all 0.3s; z-index:15;">❓</div>

                        <!-- Moving Cart Experiment -->
                        <div class="v54-cart-container" id="v54-s4-cart" style="left: 40px; top: 15px;">
                            <div class="v54-cart-alert">⚠️</div>
                            <div class="v54-cart-body">🛒</div>
                            <!-- Phone stack inside cart -->
                            <div class="v54-cart-phones">📱📱📱</div>
                            <div class="v54-cart-label">99 Phones</div>
                        </div>
                    </div>
                </div>

                <div class="v54-glass-card glow-red">
                    <span class="v54-status-badge red"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> THỬ NGHIỆM THÚ VỊ</span>
                    <span style="color:#fff;" id="v54-map-s4-status">Kéo 99 chiếc điện thoại đi bộ trên đường tạo kẹt xe giả hoàn hảo!</span>
                </div>
            `);
            initIcons();
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_map_1') {
            const status = canvas.querySelector('#v54-intro-status');
            if (progress <= 0.5) {
                if (status) status.textContent = 'Khi thấy bản đồ báo kẹt xe đỏ rực, bạn có tự hỏi làm sao Google biết được?';
            } else {
                if (status) status.textContent = 'Làm sao hệ thống ghi nhận chính xác trạng thái giao thông thời gian thực?';
            }
        }
        else if (slideId === 'slide_map_1_a') {
            const status = canvas.querySelector('#v54-intro-status');
            const satCard = canvas.querySelector('#v54-s1a-sat');
            const camCard = canvas.querySelector('#v54-s1a-cam');

            if (progress <= 0.5) {
                if (status) status.textContent = 'Do vệ tinh do thám trên cao chụp ảnh và phân tích liên tục?';
                if (satCard) {
                    satCard.classList.remove('inactive');
                    satCard.classList.add('active');
                }
                if (camCard) {
                    camCard.classList.remove('active');
                    camCard.classList.add('inactive');
                }
            } else {
                if (status) status.textContent = 'Hay do hệ thống camera giao thông thông minh lắp đặt ở khắp các giao lộ?';
                if (satCard) {
                    satCard.classList.remove('active');
                    satCard.classList.add('inactive');
                }
                if (camCard) {
                    camCard.classList.remove('inactive');
                    camCard.classList.add('active');
                }
            }
        }
        else if (slideId === 'slide_map_1_b') {
            const horizontalLane = canvas.querySelector('#v54-s1b-street-h');
            const verticalLane = canvas.querySelector('#v54-s1b-street-v');
            const d1 = canvas.querySelector('#v54-vdot-1');
            const d2 = canvas.querySelector('#v54-vdot-2');
            const d3 = canvas.querySelector('#v54-vdot-3');
            const d4 = canvas.querySelector('#v54-vdot-4');
            const d5 = canvas.querySelector('#v54-vdot-5');
            const cancelCross = canvas.querySelector('#v54-cancel-cross-el');
            const satWave = canvas.querySelector('#v54-sat-wave-el');
            const camWave = canvas.querySelector('#v54-cam-wave-el');
            const subLabel = canvas.querySelector('#v54-s1b-label');
            const statusText = canvas.querySelector('#v54-map-s1b-status');

            // Reset lane styles
            if (horizontalLane) horizontalLane.style.backgroundColor = '#334155';
            if (verticalLane) verticalLane.style.backgroundColor = '#334155';

            if (progress < 0.5) {
                // Free flow: Green/normal speed
                const t = progress * 2;
                if (d1) { d1.style.left = `${(t * 640) % 640}px`; d1.style.top = `101px`; }
                if (d2) { d2.style.left = `${((t + 0.35) * 640) % 640}px`; d2.style.top = `101px`; }
                if (d3) { d3.style.left = `311px`; d3.style.top = `${(t * 200) % 200}px`; }
                if (d4) { d4.style.left = `311px`; d4.style.top = `${((t + 0.5) * 200) % 200}px`; }
                if (d5) { d5.style.left = `${((t + 0.7) * 640) % 640}px`; d5.style.top = `101px`; }
                
                if (cancelCross) cancelCross.classList.remove('v54-cancel-active');
                if (satWave) satWave.style.opacity = '1';
                if (camWave) camWave.style.opacity = '1';
                if (subLabel) {
                    subLabel.textContent = 'Kiểm tra hệ thống...';
                    subLabel.style.color = '#9ca3af';
                }
                if (statusText) {
                    statusText.textContent = 'Thực chất Google không cần lắp đặt camera hay phóng vệ tinh do thám để xem kẹt xe.';
                }
            } else {
                // Jammed flow: Color lanes Red, move dots slow and bunch them up
                if (horizontalLane) horizontalLane.style.backgroundColor = '#ef4444';
                
                const t = (progress - 0.5) * 0.2; // very slow motion
                // Bunch horizontal dots together around the vertical intersection (x = 320)
                if (d1) { d1.style.left = `${280 + t * 40}px`; d1.style.top = `101px`; }
                if (d2) { d2.style.left = `${300 + t * 40}px`; d2.style.top = `101px`; }
                if (d5) { d5.style.left = `${320 + t * 40}px`; d5.style.top = `101px`; }
                
                // Vertical lane remains normal
                const tVert = progress * 2;
                if (d3) { d3.style.left = `311px`; d3.style.top = `${(tVert * 200) % 200}px`; }
                if (d4) { d4.style.left = `311px`; d4.style.top = `${((tVert + 0.5) * 200) % 200}px`; }

                if (cancelCross) cancelCross.classList.add('v54-cancel-active');
                if (satWave) satWave.style.opacity = '0';
                if (camWave) camWave.style.opacity = '0';
                if (subLabel) {
                    subLabel.textContent = '❌ Không sử dụng!';
                    subLabel.style.color = 'var(--map-red)';
                }
                if (statusText) {
                    statusText.textContent = 'Không vệ tinh do thám, không camera đắt đỏ! Google có phương án tối ưu hơn.';
                }
            }
        }
        else if (slideId === 'slide_map_2') {
            const p1 = canvas.querySelector('#v54-pkt-1');
            const p2 = canvas.querySelector('#v54-pkt-2');
            const p3 = canvas.querySelector('#v54-pkt-3');
            
            const lbl1 = canvas.querySelector('#v54-pkt-lbl-1');
            const lbl2 = canvas.querySelector('#v54-pkt-lbl-2');
            
            const cloudRip = canvas.querySelector('#v54-s2-cloud-rip');
            const status = canvas.querySelector('#v54-map-s2-status');

            // Coordinates: Phone is left, Cloud is right
            const startX = 130;
            const endX = 510;
            const startY = 100;
            const endY = 100;

            // Packet progress loops (offset timings)
            const t1 = (progress * 3.5) % 1.0;
            const t2 = ((progress + 0.33) * 3.5) % 1.0;
            const t3 = ((progress + 0.66) * 3.5) % 1.0;

            if (p1) {
                p1.style.left = `${startX + t1 * (endX - startX)}px`;
                p1.style.top = `${startY + Math.sin(t1 * Math.PI) * -35}px`; // curve
                p1.style.opacity = t1 > 0.9 ? 1 - (t1 - 0.9) / 0.1 : 1;
            }
            if (p2) {
                p2.style.left = `${startX + t2 * (endX - startX)}px`;
                p2.style.top = `${startY + Math.sin(t2 * Math.PI) * -45}px`;
                p2.style.opacity = t2 > 0.9 ? 1 - (t2 - 0.9) / 0.1 : 1;
            }
            if (p3) {
                p3.style.left = `${startX + t3 * (endX - startX)}px`;
                p3.style.top = `${startY + Math.sin(t3 * Math.PI) * -20}px`;
                p3.style.opacity = t3 > 0.9 ? 1 - (t3 - 0.9) / 0.1 : 1;
            }

            // Animate floating packet text labels (vertically offset to prevent overlaps)
            if (lbl1) {
                lbl1.style.left = `${startX + t1 * (endX - startX) - 20}px`;
                lbl1.style.top = `${startY + Math.sin(t1 * Math.PI) * -35 - 18}px`; // Above the packet path
                lbl1.style.opacity = (t1 > 0.1 && t1 < 0.9) ? '0.95' : '0';
            }
            if (lbl2) {
                lbl2.style.left = `${startX + t2 * (endX - startX) - 20}px`;
                lbl2.style.top = `${startY + Math.sin(t2 * Math.PI) * -45 + 18}px`; // Below the packet path
                lbl2.style.opacity = (t2 > 0.1 && t2 < 0.9) ? '0.95' : '0';
            }

            // Cloud ripple trigger upon packet arrival
            if (cloudRip) {
                if ((t1 > 0.82 && t1 < 0.96) || (t2 > 0.82 && t2 < 0.96) || (t3 > 0.82 && t3 < 0.96)) {
                    cloudRip.classList.add('v54-cloud-ripple-active');
                } else {
                    cloudRip.classList.remove('v54-cloud-ripple-active');
                }
            }

            if (progress <= 0.5) {
                if (status) status.textContent = 'Bí mật nằm trong túi quần của bạn! Khi định vị được kích hoạt...';
            } else {
                if (status) status.textContent = 'Điện thoại gửi liên tục thông tin ẩn danh về vị trí và tốc độ về máy chủ Google.';
            }
        }
        else if (slideId === 'slide_map_3') {
            const lane = canvas.querySelector('#v54-s3-lane');
            const speed = canvas.querySelector('#v54-s3-speed');
            
            const dividers = canvas.querySelector('#v54-s3-dividers');
            
            const c1 = canvas.querySelector('#v54-car-1');
            const c2 = canvas.querySelector('#v54-car-2');
            const c3 = canvas.querySelector('#v54-car-3');
            const c4 = canvas.querySelector('#v54-car-4');
            
            const s1 = canvas.querySelector('#v54-smoke-1');
            const s2 = canvas.querySelector('#v54-smoke-2');
            const s3 = canvas.querySelector('#v54-smoke-3');
            const s4 = canvas.querySelector('#v54-smoke-4');
            
            const status = canvas.querySelector('#v54-map-s3-status');

            // Reset classes
            if (lane) lane.className = 'v54-road-lane';
            if (speed) speed.className = 'v54-speed-badge';

            const smokeElements = [s1, s2, s3, s4];
            smokeElements.forEach(s => {
                if (s) s.classList.remove('v54-exhaust-active');
            });

            if (progress <= 0.3) {
                // Phase 1: Clear flow (50 km/h) - cars move fast, lane dividers scroll fast
                if (speed) { speed.textContent = '50 km/h'; }
                
                const t = progress * 2.5;
                const p1 = (t * 600) % 600;
                const p2 = ((t + 0.25) * 600) % 600;
                const p3 = ((t + 0.5) * 600) % 600;
                const p4 = ((t + 0.75) * 600) % 600;
                
                if (c1) c1.style.left = `${p1}px`;
                if (c2) c2.style.left = `${p2}px`;
                if (c3) c3.style.left = `${p3}px`;
                if (c4) c4.style.left = `${p4}px`;
                
                // Dividers scroll fast
                const scrollOffset = (progress * 1800) % 70;
                if (dividers) dividers.style.transform = `translate3d(-${scrollOffset}px, -50%, 0)`;

                if (status) status.textContent = 'Nếu mọi xe đi nhanh, Google Maps nhận diện cung đường thông thoáng (Màu Xanh).';
            }
            else if (progress > 0.3 && progress <= 0.7) {
                // Phase 2: Slow flow (25 km/h) - cars slow down, lane dividers scroll slow
                if (lane) lane.className = 'v54-road-lane slow';
                if (speed) { speed.textContent = '25 km/h'; speed.className = 'v54-speed-badge slow'; }
                
                const t = progress * 1.1;
                const p1 = (t * 600) % 600;
                const p2 = ((t + 0.2) * 600) % 600;
                const p3 = ((t + 0.4) * 600) % 600;
                const p4 = ((t + 0.6) * 600) % 600;
                
                if (c1) c1.style.left = `${p1}px`;
                if (c2) c2.style.left = `${p2}px`;
                if (c3) c3.style.left = `${p3}px`;
                if (c4) c4.style.left = `${p4}px`;
                
                // Dividers scroll slow
                const scrollOffset = (progress * 600) % 70;
                if (dividers) dividers.style.transform = `translate3d(-${scrollOffset}px, -50%, 0)`;

                if (status) status.textContent = 'Khi tốc độ giảm xuống, đường chuyển sang Màu Cam (Ùn ứ nhẹ).';
            }
            else {
                // Phase 3: Jammed flow (5 km/h) - cars bunch up, lane dividers stop, smoke pulses!
                if (lane) lane.className = 'v54-road-lane jam';
                if (speed) { speed.textContent = '5 km/h'; speed.className = 'v54-speed-badge jam'; }
                
                const t = (progress - 0.7) * 0.12; // crawling
                
                const p1 = 200 + t * 600;
                const p2 = 250 + t * 600;
                const p3 = 300 + t * 600;
                const p4 = 350 + t * 600;

                if (c1) c1.style.left = `${p1}px`;
                if (c2) c2.style.left = `${p2}px`;
                if (c3) c3.style.left = `${p3}px`;
                if (c4) c4.style.left = `${p4}px`;
                
                // Position exhaust smoke sibling nodes slightly behind each car
                if (s1) { s1.style.left = `${p1 - 22}px`; s1.style.top = '78px'; s1.classList.add('v54-exhaust-active'); }
                if (s2) { s2.style.left = `${p2 - 22}px`; s2.style.top = '78px'; s2.classList.add('v54-exhaust-active'); }
                if (s3) { s3.style.left = `${p3 - 22}px`; s3.style.top = '78px'; s3.classList.add('v54-exhaust-active'); }
                if (s4) { s4.style.left = `${p4 - 22}px`; s4.style.top = '78px'; s4.classList.add('v54-exhaust-active'); }
                
                // Dividers stop
                if (dividers) dividers.style.transform = `translate3d(0px, -50%, 0)`;

                if (status) status.textContent = 'Và nếu hàng loạt thiết bị di chuyển rùa bò 5km/h, đường lập tức hóa Đỏ rực!';
            }
        }
        else if (slideId === 'slide_map_4') {
            const cart = canvas.querySelector('#v54-s4-cart');
            const trailRed = canvas.querySelector('#v54-s4-trail-red');
            const sideLane = canvas.querySelector('#v54-s4-side-lane');
            const turningCar = canvas.querySelector('#v54-s4-turning-car');
            const carAlert = canvas.querySelector('#v54-s4-car-alert');
            const status = canvas.querySelector('#v54-map-s4-status');

            // 1. Move Cart from left (40px) to right (500px)
            const startX = 40;
            const endX = 500;
            const currentX = startX + progress * (endX - startX);

            if (cart) {
                cart.style.left = `${currentX}px`;
            }

            // 2. Expand Red trail behind the cart
            if (trailRed) {
                trailRed.style.width = `${currentX + 35}px`;
            }

            // 3. Animate approaching car on the side lane (cross street)
            if (progress < 0.55) {
                // Cart hasn't reached side lane (450px) yet
                if (sideLane) sideLane.style.backgroundColor = 'var(--map-green)';
                
                // Car drives down normal (facing down)
                const carRatio = progress / 0.55;
                const carTop = -40 + carRatio * 65; // stops at top: 25px
                if (turningCar) {
                    turningCar.style.top = `${carTop}px`;
                    turningCar.style.left = `443px`;
                    turningCar.textContent = '🚗';
                    turningCar.style.transform = 'rotate(90deg)'; // Face down
                }
                if (carAlert) carAlert.style.opacity = '0';
            }
            else if (progress >= 0.55 && progress < 0.72) {
                // Cart passes intersection -> road turns red, side lane gets warning
                if (sideLane) sideLane.style.backgroundColor = 'var(--map-orange)';
                
                // Car stops at intersection and is confused (still facing down)
                if (turningCar) {
                    turningCar.style.top = `25px`;
                    turningCar.style.left = `443px`;
                    turningCar.textContent = '🚗';
                    turningCar.style.transform = 'rotate(90deg)'; // Face down
                }
                if (carAlert) carAlert.style.opacity = '1'; // Show "?"
            }
            else {
                // progress >= 0.72: Car decides to turn back and drives up
                if (sideLane) sideLane.style.backgroundColor = 'var(--map-red)';
                
                const turnRatio = (progress - 0.72) / 0.28;
                const carTop = 25 - turnRatio * 65; // drives back up
                
                if (turningCar) {
                    turningCar.style.top = `${carTop}px`;
                    turningCar.style.left = `443px`;
                    turningCar.textContent = '🚗'; // REMAINS A CAR EMOJI!
                    turningCar.style.transform = 'rotate(-90deg) scale(1.1)'; // Face UP to go back up!
                }
                if (carAlert) carAlert.style.opacity = '0'; // Hide "?"
            }

            if (progress <= 0.5) {
                if (status) status.textContent = 'Thử nghiệm nổi tiếng: Kéo 99 chiếc điện thoại bật định vị đi bộ trên đường...';
            } else {
                if (status) status.textContent = 'Google Maps tưởng lầm có 99 chiếc ô tô đang kẹt xe, và lập tức tô đỏ con đường vắng tanh!';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video54',
        topic: 'How Google Maps works',
        episodeNum: 54,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video54 Plugin] Loaded: Google Maps Traffic slides loaded.');
})();
