/**
 * Video 58: Google H3 Hexagon Grid & Surge Pricing Simulation
 * Plugin containing animations for map indexing, supply-demand density tracking,
 * and dynamic pricing multiplier updates.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_surge_1: [
            { text: 'trời mưa lớn', start: 1.0, end: 5.5, class: 'active-cyan' },
            { text: 'tăng gấp đôi', start: 5.5, end: 10.0, class: 'active-red' },
            { text: 'nhu cầu cao', start: 10.0, end: 14.5, class: 'active-red' }
        ],
        slide_surge_2: [
            { text: 'Google H3', start: 1.5, end: 6.5, class: 'active-gold' },
            { text: 'mã ID duy nhất', start: 6.5, end: 11.0, class: 'active-cyan' },
            { text: 'vị trí của bạn', start: 11.0, end: 16.0, class: 'active-cyan' }
        ],
        slide_surge_3: [
            { text: 'nhu cầu đặt xe', start: 1.5, end: 6.5, class: 'active-red' },
            { text: 'đổ dồn vào', start: 6.5, end: 11.0, class: 'active-red' },
            { text: 'tăng gấp 5', start: 11.0, end: 14.0, class: 'active-red' }
        ],
        slide_surge_4: [
            { text: 'tài xế rảnh', start: 1.5, end: 6.0, class: 'active-green' },
            { text: 'giảm mạnh', start: 6.0, end: 10.5, class: 'active-red' },
            { text: 'lệch pha nghiêm trọng', start: 10.5, end: 15.0, class: 'active-red' }
        ],
        slide_surge_5: [
            { text: 'hệ số nhân giá', start: 1.5, end: 6.5, class: 'active-red' },
            { text: 'khuyến khích', start: 6.5, end: 12.0, class: 'active-green' },
            { text: 'tài xế', start: 12.0, end: 17.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_surge_1', 'slide_surge_2', 'slide_surge_3', 'slide_surge_4', 'slide_surge_5'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // Wrap with layout container
    function sceneWrap(inner) {
        return `<div class="v58-zoom-container"><div class="v58-scene-content">${inner}</div></div>`;
    }

    // Helper: Linear interpolation for point on line segment
    function getPointOnLine(x1, y1, x2, y2, t) {
        return {
            x: x1 + (x2 - x1) * t,
            y: y1 + (y2 - y1) * t
        };
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        canvas.innerHTML = sceneWrap(`
            <div class="v58-scene-row" id="s-scene-row">
                <!-- PHONE MOCKUP (Left) -->
                <div class="v58-phone-mockup" id="phone-map">
                    <div class="v58-dynamic-island"></div>
                    
                    <div class="v58-phone-statusbar">
                        <span class="v58-phone-time">08:15</span>
                        <div style="display:flex; align-items:center; gap:2.5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M8.5 16.5c3.5-3.5 3.5-3.5 7 0"/><path d="M5 13c7-7 7-7 14 0"/><path d="M1.5 9.5c10.5-10.5 10.5-10.5 21 0"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(90deg); margin-left:-2px;"><rect width="14" height="8" x="3" y="8" rx="1.5" ry="1.5"/><line x1="19" x2="19" y1="10" y2="14"/></svg>
                        </div>
                    </div>

                    <div class="v58-phone-navbar">
                        <span class="v58-phone-navbar-title">RIDE BOOKING MAP</span>
                    </div>

                    <div class="v58-phone-screen">
                        <!-- Map background & texture -->
                        <div class="v58-map-bg"></div>
                        <div class="v58-map-gridlines"></div>
                        <div class="v58-rain-overlay" id="s-rain-overlay"></div>

                        <!-- SVG Hexagon grid, Pins, and Cars Layer -->
                        <svg class="v58-hexagon-svg" id="s-hexagon-svg" viewBox="0 0 230 330">
                            <!-- Hex 0: Center -->
                            <polygon id="hex-0" class="v58-hex-cell" points="141,150 115,135 89,150 89,180 115,195 141,180" />
                            <!-- Hex 1: North -->
                            <polygon id="hex-1" class="v58-hex-cell" points="141,60 115,45 89,60 89,90 115,105 141,90" />
                            <!-- Hex 2: South -->
                            <polygon id="hex-2" class="v58-hex-cell" points="141,240 115,225 89,240 89,270 115,285 141,270" />
                            <!-- Hex 3: North-East -->
                            <polygon id="hex-3" class="v58-hex-cell" points="193,105 167,90 141,105 141,135 167,150 193,135" />
                            <!-- Hex 4: South-East -->
                            <polygon id="hex-4" class="v58-hex-cell" points="193,195 167,180 141,195 141,225 167,240 193,225" />
                            <!-- Hex 5: North-West -->
                            <polygon id="hex-5" class="v58-hex-cell" points="89,105 63,90 37,105 37,135 63,150 89,135" />
                            <!-- Hex 6: South-West -->
                            <polygon id="hex-6" class="v58-hex-cell" points="89,195 63,180 37,195 37,225 63,240 89,225" />

                            <!-- Dotted Arrow Dispatch Path inside SVG -->
                            <path id="s-dispatch-arrow" class="v58-dispatch-arrow" d="M 167 210 L 115 165" />

                            <!-- Customer Pins inside SVG (transform translate) -->
                            <g class="v58-svg-cust-pin" id="pin-cust-1" transform="translate(110, 155)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-2" transform="translate(122, 160)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-3" transform="translate(105, 172)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-4" transform="translate(125, 175)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-5" transform="translate(115, 165)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-6" transform="translate(128, 158)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-7" transform="translate(102, 164)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-8" transform="translate(118, 182)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-9" transform="translate(110, 178)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>
                            <g class="v58-svg-cust-pin" id="pin-cust-10" transform="translate(120, 150)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                                <circle cx="0" cy="0" r="6" fill="none" stroke="#f43f5e" stroke-width="0.8" class="v58-svg-pulse" />
                            </g>

                            <!-- Static Driver Cars inside SVG (using premium vector path designs) -->
                            <g id="pin-driver-center" class="v58-svg-car" transform="translate(115, 167) rotate(45)">
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" fill="rgba(0,0,0,0.5)" />
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" class="v58-car-body" fill="#f43f5e" />
                                <rect x="-3" y="-3.5" width="6" height="6" rx="1.2" fill="#1e293b" />
                                <path d="M-2.5,-3.5 L2.5,-3.5 L2,-5 L-2,-5 Z" fill="#38bdf8" opacity="0.8" />
                                <path d="M-2.5,2.5 L2.5,2.5 L2,1.5 L-2,1.5 Z" fill="#38bdf8" opacity="0.6" />
                                <circle cx="-3.5" cy="-6" r="0.6" fill="#fef08a" />
                                <circle cx="3.5" cy="-6" r="0.6" fill="#fef08a" />
                            </g>
                            <g id="pin-driver-ne" class="v58-svg-car" transform="translate(167, 122) rotate(-30)">
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" fill="rgba(0,0,0,0.5)" />
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" class="v58-car-body" fill="#475569" />
                                <rect x="-3" y="-3.5" width="6" height="6" rx="1.2" fill="#1e293b" />
                                <path d="M-2.5,-3.5 L2.5,-3.5 L2,-5 L-2,-5 Z" fill="#38bdf8" opacity="0.8" />
                                <path d="M-2.5,2.5 L2.5,2.5 L2,1.5 L-2,1.5 Z" fill="#38bdf8" opacity="0.6" />
                                <circle cx="-3.5" cy="-6" r="0.6" fill="#fef08a" />
                                <circle cx="3.5" cy="-6" r="0.6" fill="#fef08a" />
                            </g>
                            <g id="pin-driver-nw" class="v58-svg-car" transform="translate(63, 122) rotate(120)">
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" fill="rgba(0,0,0,0.5)" />
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" class="v58-car-body" fill="#475569" />
                                <rect x="-3" y="-3.5" width="6" height="6" rx="1.2" fill="#1e293b" />
                                <path d="M-2.5,-3.5 L2.5,-3.5 L2,-5 L-2,-5 Z" fill="#38bdf8" opacity="0.8" />
                                <path d="M-2.5,2.5 L2.5,2.5 L2,1.5 L-2,1.5 Z" fill="#38bdf8" opacity="0.6" />
                                <circle cx="-3.5" cy="-6" r="0.6" fill="#fef08a" />
                                <circle cx="3.5" cy="-6" r="0.6" fill="#fef08a" />
                            </g>
                            <g id="pin-driver-sw" class="v58-svg-car" transform="translate(63, 212) rotate(60)">
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" fill="rgba(0,0,0,0.5)" />
                                <rect x="-4.5" y="-6.5" width="9" height="13" rx="2" class="v58-car-body" fill="#475569" />
                                <rect x="-3" y="-3.5" width="6" height="6" rx="1.2" fill="#1e293b" />
                                <path d="M-2.5,-3.5 L2.5,-3.5 L2,-5 L-2,-5 Z" fill="#38bdf8" opacity="0.8" />
                                <path d="M-2.5,2.5 L2.5,2.5 L2,1.5 L-2,1.5 Z" fill="#38bdf8" opacity="0.6" />
                                <circle cx="-3.5" cy="-6" r="0.6" fill="#fef08a" />
                                <circle cx="3.5" cy="-6" r="0.6" fill="#fef08a" />
                            </g>

                            <!-- Dispatching Driver Car inside SVG -->
                            <g id="s-driver-dispatch" class="v58-svg-car-dispatch" transform="translate(167, 210) rotate(-50)" style="opacity: 0;">
                                <circle cx="0" cy="0" r="10" fill="none" stroke="#10b981" stroke-width="1.2" class="v58-dispatch-pulse" />
                                <rect x="-5.5" y="-7.5" width="11" height="15" rx="2.5" fill="rgba(0,0,0,0.6)" />
                                <rect x="-5.5" y="-7.5" width="11" height="15" rx="2.5" fill="#10b981" stroke="#fff" stroke-width="0.8" />
                                <rect x="-3.5" y="-4" width="7" height="7" rx="1.5" fill="#0f172a" />
                                <path d="M-3,-4 L3,-4 L2.5,-6 L-2.5,-6 Z" fill="#38bdf8" opacity="0.8" />
                                <circle cx="-4.2" cy="-7" r="0.8" fill="#fff" />
                                <circle cx="4.2" cy="-7" r="0.8" fill="#fff" />
                            </g>

                            <!-- Geohash H3 ID Bubble (inside SVG to ensure absolute scaling lock) -->
                            <g class="v58-id-bubble-svg" id="s-id-bubble" transform="translate(115, 130)" style="opacity: 0; pointer-events: none;">
                                <rect x="-42" y="-12" width="84" height="16" rx="5" fill="rgba(15, 23, 42, 0.95)" stroke="var(--surge-yellow)" stroke-width="1" />
                                <text x="0" y="-4" font-size="6.5" font-family="monospace" font-weight="bold" fill="var(--surge-yellow)" text-anchor="middle" dominant-baseline="central">88268562d5fffff</text>
                            </g>
                        </svg>


                        <!-- Booking Dialog Overlay -->
                        <div class="v58-booking-dialog" id="s-booking-dialog">
                            <div class="v58-dialog-header">
                                <span>GrabCar 4 Chỗ</span>
                                <span style="display:flex; align-items:center; gap:2px;"><i data-lucide="navigation" style="width:8px; height:8px;"></i> 2.8 km</span>
                            </div>
                            <div class="v58-dialog-price-row">
                                <div style="display:flex; align-items:baseline; gap:4px;">
                                    <span class="v58-original-price" id="s-original-price">45.000đ</span>
                                    <span class="v58-surge-price" id="s-surge-price">45.000đ</span>
                                </div>
                                <span class="v58-surge-badge" id="s-surge-badge">x2.0 SURGE</span>
                            </div>
                            <button class="v58-book-btn">Đặt Xe Ngay</button>
                        </div>
                    </div>
                    
                    <div class="v58-phone-home-bar"></div>
                </div>

                <!-- SLEEK COMPACT DASHBOARD (Right) -->
                <div class="v58-dashboard-card" id="s-dashboard">
                    <span class="v58-dash-title">SURGE SYSTEM</span>
                    <span class="v58-dash-header" id="s-dash-header">Hệ Thống Ổn Định</span>

                    <!-- HUD Gauge Circular Progress (Compact) -->
                    <div class="v58-hud-gauge-container">
                        <svg class="v58-hud-svg" viewBox="0 0 100 100">
                            <circle class="v58-hud-track" cx="50" cy="50" r="40" />
                            <circle class="v58-hud-fill" id="s-hud-fill" cx="50" cy="50" r="40" />
                        </svg>
                        <div class="v58-hud-val-container">
                            <span class="v58-hud-number" id="s-hud-val">x1.0</span>
                        </div>
                    </div>

                    <!-- Compact Metrics Row -->
                    <div class="v58-metrics-row">
                        <div class="v58-metric-item">
                            <span class="v58-metric-lbl">CẦU</span>
                            <span class="v58-metric-val red" id="s-metric-demand">12</span>
                        </div>
                        <div class="v58-metric-item">
                            <span class="v58-metric-lbl">CUNG</span>
                            <span class="v58-metric-val green" id="s-metric-supply">8</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
        initIcons();
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const sceneRow = canvas.querySelector('#s-scene-row');
        const phoneMap = canvas.querySelector('#phone-map');
        const dashboard = canvas.querySelector('#s-dashboard');
        
        const rain = canvas.querySelector('#s-rain-overlay');
        const dialog = canvas.querySelector('#s-booking-dialog');
        const originalPrice = canvas.querySelector('#s-original-price');
        const surgePrice = canvas.querySelector('#s-surge-price');
        const surgeBadge = canvas.querySelector('#s-surge-badge');
        
        const hex0 = canvas.querySelector('#hex-0');
        const hex1 = canvas.querySelector('#hex-1');
        const hex2 = canvas.querySelector('#hex-2');
        const hex3 = canvas.querySelector('#hex-3');
        const hex4 = canvas.querySelector('#hex-4');
        const hex5 = canvas.querySelector('#hex-5');
        const hex6 = canvas.querySelector('#hex-6');

        const idBubble = canvas.querySelector('#s-id-bubble');
        const dispatchArrow = canvas.querySelector('#s-dispatch-arrow');

        const driverCenter = canvas.querySelector('#pin-driver-center');
        const driverDispatch = canvas.querySelector('#s-driver-dispatch');

        // Dashboard selectors
        const dashHeader = canvas.querySelector('#s-dash-header');
        const hudFill = canvas.querySelector('#s-hud-fill');
        const hudVal = canvas.querySelector('#s-hud-val');
        const metricDemand = canvas.querySelector('#s-metric-demand');
        const metricSupply = canvas.querySelector('#s-metric-supply');

        // Passenger Pins list
        const custPins = [];
        for (let i = 1; i <= 10; i++) {
            custPins.push(canvas.querySelector(`#pin-cust-${i}`));
        }

        const resetStates = () => {
            // Restore layouts
            if (sceneRow) sceneRow.className = 'v58-scene-row';
            if (phoneMap) phoneMap.style.display = 'flex';
            if (dashboard) {
                dashboard.style.display = 'flex';
                dashboard.className = 'v58-dashboard-card';
            }

            if (rain) rain.classList.remove('active');
            if (dialog) dialog.classList.remove('active');
            if (originalPrice) originalPrice.style.display = 'none';
            if (surgePrice) {
                surgePrice.textContent = '45.000đ';
                surgePrice.classList.remove('surged');
            }
            if (surgeBadge) {
                surgeBadge.classList.remove('active');
                surgeBadge.style.background = 'var(--surge-red)';
                surgeBadge.textContent = 'x2.0 SURGE';
            }

            // Reset hexagon classes
            [hex0, hex1, hex2, hex3, hex4, hex5, hex6].forEach(hex => {
                if (hex) hex.setAttribute('class', 'v58-hex-cell');
            });

            if (idBubble) idBubble.classList.remove('active');
            if (dispatchArrow) dispatchArrow.classList.remove('active');

            if (driverCenter) driverCenter.style.opacity = '1';
            if (driverDispatch) {
                driverDispatch.style.opacity = '0';
                driverDispatch.setAttribute('transform', 'translate(167, 210) rotate(-50)');
            }

            // Hide passenger pins
            custPins.forEach(pin => {
                if (pin) pin.style.opacity = '0';
            });

            // Dashboard Reset
            if (dashHeader) {
                dashHeader.textContent = 'Hệ Thống Ổn Định';
                dashHeader.style.color = '#fff';
            }
            if (hudFill) {
                hudFill.style.strokeDashoffset = '251.2'; // 0% filled
                hudFill.style.stroke = 'var(--surge-green)';
            }
            if (hudVal) hudVal.textContent = 'x1.0';
            if (metricDemand) metricDemand.textContent = '12';
            if (metricSupply) {
                metricSupply.textContent = '8';
                metricSupply.style.color = 'var(--surge-green)';
            }
        };

        resetStates();

        if (slideId === 'slide_surge_1') {
            // Layout: Large Phone Only
            if (sceneRow) sceneRow.classList.add('phone-only');

            // Rain starts and dialog triggers
            if (progress > 0.10) {
                if (rain) rain.classList.add('active');
            }
            if (progress >= 0.25) {
                if (dialog) dialog.classList.add('active');
            }
            if (progress >= 0.55) {
                if (hex0) hex0.setAttribute('class', 'v58-hex-cell warm');
                if (originalPrice) originalPrice.style.display = 'inline';
                if (surgePrice) {
                    surgePrice.textContent = '90.000đ';
                    surgePrice.classList.add('surged');
                }
                if (surgeBadge) surgeBadge.classList.add('active');
            }
        }
        else if (slideId === 'slide_surge_2') {
            // Layout: Large Phone Only
            if (sceneRow) sceneRow.classList.add('phone-only');
            if (rain) rain.classList.add('active');
            
            // Staggered hexagonal radial reveal
            // Hex 0 (Center) fades in first, followed by others
            if (progress < 0.20) {
                if (hex0) hex0.setAttribute('class', 'v58-hex-cell cool');
            } else if (progress < 0.40) {
                if (hex0) hex0.setAttribute('class', 'v58-hex-cell cool');
                [hex1, hex3, hex5].forEach(hex => {
                    if (hex) hex.setAttribute('class', 'v58-hex-cell cool');
                });
            } else {
                [hex0, hex1, hex2, hex3, hex4, hex5, hex6].forEach(hex => {
                    if (hex) hex.setAttribute('class', 'v58-hex-cell cool');
                });
            }
            
            if (progress >= 0.45) {
                if (idBubble) idBubble.classList.add('active');
                if (hex0) hex0.setAttribute('class', 'v58-hex-cell warm flashing');
            }
        }
        else if (slideId === 'slide_surge_3') {
            // Layout: Large Phone Only (Show demand spike on map)
            if (sceneRow) sceneRow.classList.add('phone-only');
            if (rain) rain.classList.add('active');
            
            // Active H3 boundaries
            [hex0, hex1, hex2, hex3, hex4, hex5, hex6].forEach(hex => {
                if (hex) hex.setAttribute('class', 'v58-hex-cell cool');
            });
            if (hex0) hex0.setAttribute('class', 'v58-hex-cell hot flashing');

            // Passengers multiplying stagger-fade
            const activeCusts = Math.min(10, Math.floor(progress * 13));
            custPins.forEach((pin, idx) => {
                if (pin && idx < activeCusts) {
                    pin.style.opacity = '1';
                }
            });
        }
        else if (slideId === 'slide_surge_4') {
            // Layout: Server Dashboard Only (focus on metric drop/surge index)
            if (sceneRow) sceneRow.classList.add('dash-only');

            // Animate gauge & counting metrics
            const demandVal = Math.round(52 + progress * 42); // 52 -> 94
            const supplyVal = Math.max(1, Math.round(5 - progress * 4.5)); // 5 -> 1
            const surgeVal = (1.5 + progress * 0.7).toFixed(1); // 1.5 -> 2.2

            if (metricDemand) metricDemand.textContent = demandVal.toString();
            if (metricSupply) {
                metricSupply.textContent = supplyVal.toString();
                metricSupply.style.color = supplyVal <= 2 ? 'var(--surge-red)' : 'var(--surge-yellow)';
            }
            if (hudVal) hudVal.textContent = 'x' + surgeVal;

            if (hudFill) {
                hudFill.style.strokeDashoffset = `${251.2 - progress * 251.2}`;
                if (progress < 0.4) {
                    hudFill.style.stroke = 'var(--surge-green)';
                    hudFill.style.setProperty('--curr-glow', 'var(--surge-green-glow)');
                } else if (progress < 0.7) {
                    hudFill.style.stroke = 'var(--surge-yellow)';
                    hudFill.style.setProperty('--curr-glow', 'var(--surge-yellow-glow)');
                } else {
                    hudFill.style.stroke = 'var(--surge-red)';
                    hudFill.style.setProperty('--curr-glow', 'var(--surge-red-glow)');
                    if (dashboard) dashboard.classList.add('glow-red');
                    if (dashHeader) {
                        dashHeader.textContent = 'TRẠNG THÁI QUÁ TẢI';
                        dashHeader.style.color = 'var(--surge-red)';
                    }
                }
            }
        }
        else if (slideId === 'slide_surge_5') {
            // Layout: Side-by-side Split layout
            if (sceneRow) sceneRow.classList.add('split');
            if (rain) rain.classList.add('active');

            // Set grid boundaries
            [hex1, hex2, hex3, hex5, hex6].forEach(hex => {
                if (hex) hex.setAttribute('class', 'v58-hex-cell cool');
            });
            if (hex4) hex4.setAttribute('class', 'v58-hex-cell cool'); // dispatch source

            // Center Hex 0 starts hot
            if (hex0) hex0.setAttribute('class', 'v58-hex-cell hot flashing');

            // Show active dialog on phone screen
            if (dialog) dialog.classList.add('active');
            if (originalPrice) originalPrice.style.display = 'inline';
            if (surgePrice) {
                surgePrice.textContent = '99.000đ';
                surgePrice.classList.add('surged');
            }
            if (surgeBadge) surgeBadge.classList.add('active');

            // Keep all passenger pins visible
            custPins.forEach(pin => {
                if (pin) pin.style.opacity = '1';
            });

            if (progress <= 0.65) {
                const t = progress / 0.65;
                if (dispatchArrow) dispatchArrow.classList.add('active');
                if (driverDispatch) {
                    driverDispatch.style.opacity = '1';
                    // Linear interpolation from Hex 4 (167, 210) to Hex 0 (115, 165)
                    const pt = getPointOnLine(167, 210, 115, 165, t);
                    driverDispatch.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(-50)`);
                }
                if (driverCenter) driverCenter.style.opacity = '0'; // Hide center driver during dispatch

                // High-demand dashboard state
                if (metricDemand) metricDemand.textContent = '94';
                const curSupply = Math.round(1 + t * 14);
                if (metricSupply) {
                    metricSupply.textContent = curSupply.toString();
                    metricSupply.style.color = 'var(--surge-yellow)';
                }
                if (hudVal) hudVal.textContent = 'x2.2';
                if (hudFill) {
                    hudFill.style.strokeDashoffset = `${251.2 - 0.9 * 251.2}`;
                    hudFill.style.stroke = 'var(--surge-red)';
                    hudFill.style.setProperty('--curr-glow', 'var(--surge-red-glow)');
                    if (dashboard) dashboard.classList.add('glow-red');
                    if (dashHeader) {
                        dashHeader.textContent = 'ĐANG ĐIỀU PHỐI';
                        dashHeader.style.color = 'var(--surge-yellow)';
                    }
                }
            }
            else {
                // Dispatch completed! Driver arrived, pricing decays.
                if (driverDispatch) {
                    driverDispatch.style.opacity = '0'; // Hide dispatch car since it has arrived
                }
                if (driverCenter) driverCenter.style.opacity = '1';
                if (dispatchArrow) dispatchArrow.classList.remove('active');

                // Trigger green success-flash on Hex 0
                if (hex0) hex0.setAttribute('class', 'v58-hex-cell success-flash');

                // Price decays
                if (surgePrice) {
                    surgePrice.textContent = '54.000đ';
                }
                if (surgeBadge) {
                    surgeBadge.textContent = 'x1.2 SURGE';
                    surgeBadge.style.background = 'var(--surge-yellow)';
                }

                // Balanced dashboard state
                if (metricDemand) metricDemand.textContent = '42'; // some users canceled
                if (metricSupply) {
                    metricSupply.textContent = '15'; // drivers arrived
                    metricSupply.style.color = 'var(--surge-green)';
                }
                if (hudVal) hudVal.textContent = 'x1.2';
                if (hudFill) {
                    hudFill.style.strokeDashoffset = `${251.2 - 0.2 * 251.2}`;
                    hudFill.style.stroke = 'var(--surge-green)';
                    hudFill.style.setProperty('--curr-glow', 'var(--surge-green-glow)');
                }
                if (dashboard) dashboard.classList.add('glow-green');
                if (dashHeader) {
                    dashHeader.textContent = 'HỆ THỐNG CÂN BẰNG';
                    dashHeader.style.color = 'var(--surge-green)';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video58',
        topic: 'Surge Pricing Map',
        episodeNum: 58,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video58 Plugin] Loaded: Grab/Uber Surge Pricing & Google H3 map simulation.');
})();
