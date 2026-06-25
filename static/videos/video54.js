/**
 * Video 54: Google Maps Traffic Detection Simulation
 * Plugin containing animations for map street grids, GPS signal wave transmissions, traffic speed vectors, and cart hacks.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_map_1: [
            { text: 'kẹt xe', start: 1.0, end: 4.5, class: 'active-bad' },
            { text: 'vệ tinh', start: 4.5, end: 8.5, class: 'active-blue' },
            { text: 'camera', start: 8.5, end: 12.0, class: 'active-gold' }
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
        'slide_map_1', 'slide_map_2', 'slide_map_3', 'slide_map_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

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
                <div class="v54-scene-row">
                    <!-- Map Grid on Left -->
                    <div class="v54-map-grid">
                        <div class="v54-map-block b1"></div>
                        <div class="v54-map-block b2"></div>
                        <div class="v54-map-block b3"></div>
                        <div class="v54-map-block b4"></div>

                        <!-- Street Lanes -->
                        <div class="v54-street-lane horizontal" id="v54-s1-street-h"></div>
                        <div class="v54-street-lane vertical" id="v54-s1-street-v"></div>

                        <!-- Animated traffic dots -->
                        <div class="v54-traffic-dot" id="v54-dot-1"></div>
                        <div class="v54-traffic-dot" id="v54-dot-2"></div>
                        <div class="v54-traffic-dot" id="v54-dot-3"></div>
                        <div class="v54-traffic-dot" id="v54-dot-4"></div>
                        <div class="v54-traffic-dot" id="v54-dot-5"></div>
                    </div>

                    <!-- Satellite Radar on Right -->
                    <div class="v54-satellite-node">
                        <div class="v54-sat-wave"></div>
                        <div class="v54-sat-wave" style="animation-delay: 1.25s;"></div>
                        <i data-lucide="orbit"></i>
                        <span>Vệ tinh do thám?</span>
                    </div>
                </div>

                <div class="v54-glass-card glow-blue">
                    <span class="v54-status-badge blue"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> CÂU HỎI HÓA GIẢI</span>
                    <span style="color:#fff;" id="v54-map-status">Làm sao Google Maps biết chính xác đường nào đang kẹt xe?</span>
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
                        <i data-lucide="cloud-lightning"></i>
                        <span class="v54-cloud-title">Google Servers</span>
                    </div>

                    <!-- Flying packets container -->
                    <div id="v54-packets-layer" style="position:absolute; inset:0; pointer-events:none; z-index:5;">
                        <div class="v54-data-packet" id="v54-pkt-1"></div>
                        <div class="v54-data-packet" id="v54-pkt-2"></div>
                        <div class="v54-data-packet" id="v54-pkt-3"></div>
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
                        <div class="v54-road-lane" id="v54-s3-lane"></div>

                        <!-- Vehicles -->
                        <div class="v54-road-car" id="v54-car-1">🚗</div>
                        <div class="v54-road-car" id="v54-car-2">🚙</div>
                        <div class="v54-road-car" id="v54-car-3">🚕</div>
                        <div class="v54-road-car" id="v54-car-4">🏎️</div>
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
            const horizontalLane = canvas.querySelector('#v54-s1-street-h');
            const verticalLane = canvas.querySelector('#v54-s1-street-v');
            const d1 = canvas.querySelector('#v54-dot-1');
            const d2 = canvas.querySelector('#v54-dot-2');
            const d3 = canvas.querySelector('#v54-dot-3');
            const d4 = canvas.querySelector('#v54-dot-4');
            const d5 = canvas.querySelector('#v54-dot-5');
            const status = canvas.querySelector('#v54-map-status');

            // Reset lane styles
            if (horizontalLane) horizontalLane.style.backgroundColor = '#334155';
            if (verticalLane) verticalLane.style.backgroundColor = '#334155';

            if (progress < 0.5) {
                // Free flow: Green/normal speed
                const t = progress * 2;
                if (d1) { d1.style.left = `${(t * 320) % 320}px`; d1.style.top = `106px`; }
                if (d2) { d2.style.left = `${((t + 0.3) * 320) % 320}px`; d2.style.top = `106px`; }
                if (d3) { d3.style.left = `156px`; d3.style.top = `${(t * 200) % 200}px`; }
                if (d4) { d4.style.left = `156px`; d4.style.top = `${((t + 0.5) * 200) % 200}px`; }
                if (d5) { d5.style.left = `${((t + 0.75) * 320) % 320}px`; d5.style.top = `106px`; }
                if (status) status.textContent = 'Làm sao Google Maps biết đường nào kẹt xe? Camera hay Vệ tinh?';
            } else {
                // Jammed flow: Color lanes Red, move dots slow and bunch them up
                if (horizontalLane) horizontalLane.style.backgroundColor = '#ef4444';
                
                const t = (progress - 0.5) * 0.2; // very slow motion
                // Bunch horizontal dots together
                if (d1) { d1.style.left = `${120 + t * 40}px`; d1.style.top = `106px`; }
                if (d2) { d2.style.left = `${140 + t * 40}px`; d2.style.top = `106px`; }
                if (d5) { d5.style.left = `${160 + t * 40}px`; d5.style.top = `106px`; }
                
                // Vertical lane remains normal
                const tVert = progress * 2;
                if (d3) { d3.style.left = `156px`; d3.style.top = `${(tVert * 200) % 200}px`; }
                if (d4) { d4.style.left = `156px`; d4.style.top = `${((tVert + 0.5) * 200) % 200}px`; }

                if (status) status.textContent = 'Không! Google dựa vào dữ liệu thực từ hàng triệu thiết bị giao thông.';
            }
        }
        else if (slideId === 'slide_map_2') {
            const p1 = canvas.querySelector('#v54-pkt-1');
            const p2 = canvas.querySelector('#v54-pkt-2');
            const p3 = canvas.querySelector('#v54-pkt-3');
            const status = canvas.querySelector('#v54-map-s2-status');

            // Animate flying data packets from Phone (x:200, y:110) to Cloud (x:480, y:110)
            const startX = 200;
            const endX = 480;
            const startY = 110;
            const endY = 110;

            const t1 = (progress * 4) % 1.0;
            const t2 = ((progress + 0.3) * 4) % 1.0;
            const t3 = ((progress + 0.6) * 4) % 1.0;

            if (p1) {
                p1.style.left = `${startX + t1 * (endX - startX)}px`;
                p1.style.top = `${startY + Math.sin(t1 * Math.PI) * -30}px`; // curve trajectory
                p1.style.opacity = t1 > 0.9 ? 1 - (t1 - 0.9) / 0.1 : 1;
            }
            if (p2) {
                p2.style.left = `${startX + t2 * (endX - startX)}px`;
                p2.style.top = `${startY + Math.sin(t2 * Math.PI) * -40}px`;
                p2.style.opacity = t2 > 0.9 ? 1 - (t2 - 0.9) / 0.1 : 1;
            }
            if (p3) {
                p3.style.left = `${startX + t3 * (endX - startX)}px`;
                p3.style.top = `${startY + Math.sin(t3 * Math.PI) * -20}px`;
                p3.style.opacity = t3 > 0.9 ? 1 - (t3 - 0.9) / 0.1 : 1;
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
            const c1 = canvas.querySelector('#v54-car-1');
            const c2 = canvas.querySelector('#v54-car-2');
            const c3 = canvas.querySelector('#v54-car-3');
            const c4 = canvas.querySelector('#v54-car-4');
            const status = canvas.querySelector('#v54-map-s3-status');

            // Reset
            if (lane) lane.className = 'v54-road-lane';
            if (speed) speed.className = 'v54-speed-badge';

            if (progress <= 0.3) {
                // Clear flow: 50km/h
                if (speed) { speed.textContent = '50 km/h'; }
                const t = progress * 2.5;
                if (c1) c1.style.left = `${(t * 600) % 600}px`;
                if (c2) c2.style.left = `${((t + 0.25) * 600) % 600}px`;
                if (c3) c3.style.left = `${((t + 0.5) * 600) % 600}px`;
                if (c4) c4.style.left = `${((t + 0.75) * 600) % 600}px`;
                if (status) status.textContent = 'Nếu mọi xe đi nhanh, Google Maps nhận diện cung đường thông thoáng (Màu Xanh).';
            }
            else if (progress > 0.3 && progress <= 0.7) {
                // Slow flow: 25km/h (Orange)
                if (lane) lane.className = 'v54-road-lane slow';
                if (speed) { speed.textContent = '25 km/h'; speed.className = 'v54-speed-badge slow'; }
                const t = progress * 1.2;
                if (c1) c1.style.left = `${(t * 600) % 600}px`;
                if (c2) c2.style.left = `${((t + 0.2) * 600) % 600}px`;
                if (c3) c3.style.left = `${((t + 0.4) * 600) % 600}px`;
                if (c4) c4.style.left = `${((t + 0.6) * 600) % 600}px`;
                if (status) status.textContent = 'Khi tốc độ giảm xuống, đường chuyển sang Màu Cam (Ùn ứ nhẹ).';
            }
            else {
                // Jammed flow: 5km/h (Red)
                if (lane) lane.className = 'v54-road-lane jam';
                if (speed) { speed.textContent = '5 km/h'; speed.className = 'v54-speed-badge jam'; }
                const t = (progress - 0.7) * 0.15; // slow
                // Bunch them up very close
                if (c1) c1.style.left = `${220 + t * 600}px`;
                if (c2) c2.style.left = `${265 + t * 600}px`;
                if (c3) c3.style.left = `${310 + t * 600}px`;
                if (c4) c4.style.left = `${355 + t * 600}px`;
                if (status) status.textContent = 'Và nếu hàng loạt thiết bị di chuyển rùa bò 5km/h, đường lập tức hóa Đỏ rực!';
            }
        }
        else if (slideId === 'slide_map_4') {
            const cart = canvas.querySelector('#v54-s4-cart');
            const trailRed = canvas.querySelector('#v54-s4-trail-red');
            const status = canvas.querySelector('#v54-map-s4-status');

            // Cart moves from left (40px) to right (500px)
            const startX = 40;
            const endX = 500;
            const currentX = startX + progress * (endX - startX);

            if (cart) {
                cart.style.left = `${currentX}px`;
            }

            // Red trail follows the cart
            if (trailRed) {
                // Trail starts at left 0 and expands width to cart's current position + cart center offset (around 40px)
                trailRed.style.width = `${currentX + 30}px`;
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
