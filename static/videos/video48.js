/**
 * Video 48: Tinder Geospatial Indexing
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video48
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_active_1: [
            { text: 'tinder', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'gps', start: 6.0, end: 12.0, class: 'active-gold' },
            { text: 'geospatial', start: 12.0, end: 19.0, class: 'active-good' }
        ],
        slide_active_2: [
            { text: 'haversine', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'full table scan', start: 8.0, end: 14.0, class: 'active-bad' },
            { text: 'cpu', start: 14.0, end: 19.0, class: 'active-bad' }
        ],
        slide_active_3: [
            { text: 'geohash', start: 1.0, end: 7.0, class: 'active-good' },
            { text: 'lưới', start: 7.0, end: 14.0, class: 'active-gold' },
            { text: 'wx4g0', start: 14.0, end: 21.0, class: 'active-good' }
        ],
        slide_active_4: [
            { text: 'redis', start: 1.0, end: 7.0, class: 'active-good' },
            { text: 'sorted set', start: 7.0, end: 14.0, class: 'active-gold' },
            { text: 'zrangebyscore', start: 14.0, end: 21.0, class: 'active-good' }
        ],
        slide_active_5: [
            { text: 'điểm mù', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: '8 ô lân cận', start: 8.0, end: 15.0, class: 'active-gold' },
            { text: 'bao phủ', start: 15.0, end: 21.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_active_1',
        'slide_active_2',
        'slide_active_3',
        'slide_active_4',
        'slide_active_5'
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_active_1') {
            canvas.innerHTML = `
                <div class="v48-slide-container">
                    <!-- Ambient Background Glows -->
                    <div class="v48-bg-glow-circle circle-1"></div>
                    <div class="v48-bg-glow-circle circle-2"></div>
                    
                    <!-- Floating Particles -->
                    <div class="v48-floating-particles">
                        <span class="v48-particle p1">❤️</span>
                        <span class="v48-particle p2">✨</span>
                        <span class="v48-particle p3">🔥</span>
                        <span class="v48-particle p4">❤️</span>
                        <span class="v48-particle p5">✨</span>
                        <span class="v48-particle p6">🔥</span>
                    </div>

                    <!-- Phone Wrapper for Radar Rings -->
                    <div class="v48-phone-frame-wrapper">
                        <div class="v48-radar-ring ring-1"></div>
                        <div class="v48-radar-ring ring-2"></div>
                        <div class="v48-radar-ring ring-3"></div>

                        <div class="v48-phone-frame">
                            <!-- Tinder Header -->
                            <div class="v48-phone-header">
                                <i data-lucide="user" class="v48-header-icon"></i>
                                <img src="https://logo-teka.com/wp-content/uploads/2025/10/tinder-icon-logo.png" class="v48-tinder-logo" alt="Tinder">
                                <i data-lucide="message-circle" class="v48-header-icon"></i>
                            </div>

                            <!-- Card Stack -->
                            <div class="v48-card-stack">
                                <!-- Card 2: Bob -->
                                <div class="v48-profile-card v48-card-bob" id="s1-card-bob">
                                    <div class="v48-card-bg v48-grad-bob">
                                        <div class="v48-avatar-emoji">👨‍💻</div>
                                    </div>
                                    <div class="v48-card-info">
                                        <h3>Bob, 25 <span class="v48-badge-online"></span></h3>
                                        <p><i data-lucide="map-pin"></i> Cách bạn 4 km</p>
                                        <p class="v48-card-bio">Software Engineer • Mê leo núi 🏔️</p>
                                    </div>
                                    <div class="v48-swipe-badge nope" id="s1-badge-nope-bob">NOPE</div>
                                    <div class="v48-swipe-badge like" id="s1-badge-like-bob">LIKE</div>
                                </div>

                                <!-- Card 1: Alice -->
                                <div class="v48-profile-card v48-card-alice" id="s1-card-alice">
                                    <div class="v48-card-bg v48-grad-alice">
                                        <div class="v48-avatar-emoji">👩‍🎨</div>
                                    </div>
                                    <div class="v48-card-info">
                                        <h3>Alice, 22 <span class="v48-badge-online"></span></h3>
                                        <p><i data-lucide="map-pin"></i> Cách bạn 2 km</p>
                                        <p class="v48-card-bio">UI/UX Designer • Nghiện matcha 🍵</p>
                                    </div>
                                    <div class="v48-swipe-badge nope" id="s1-badge-nope-alice">NOPE</div>
                                    <div class="v48-swipe-badge like" id="s1-badge-like-alice">LIKE</div>
                                </div>
                            </div>

                            <!-- Bottom Action Buttons -->
                            <div class="v48-phone-actions">
                                <div class="v48-btn refresh"><i data-lucide="rotate-ccw"></i></div>
                                <div class="v48-btn nope-btn"><i data-lucide="x"></i></div>
                                <div class="v48-btn star"><i data-lucide="star"></i></div>
                                <div class="v48-btn like-btn"><i data-lucide="heart"></i></div>
                                <div class="v48-btn boost"><i data-lucide="zap"></i></div>
                            </div>

                            <!-- Floating GPS Coordinates -->
                            <div class="v48-gps-widget" id="s1-gps-widget">
                                <i data-lucide="locate" class="v48-gps-icon"></i>
                                <span>GPS: <span class="v48-gps-lat">21.0285</span>, <span class="v48-gps-lng">105.8542</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_2') {
            canvas.innerHTML = `
                <div class="v48-slide-container">
                    <!-- SQL Code Panel -->
                    <div class="v48-code-window v48-glass">
                        <div class="v48-code-header">
                            <span class="v48-dot red"></span>
                            <span class="v48-dot yellow"></span>
                            <span class="v48-dot green"></span>
                            <span class="v48-code-title">haversine_query.sql</span>
                        </div>
                        <pre class="v48-code-pre"><code><span class="v48-key">SELECT</span> id, name, avatar
<span class="v48-key">FROM</span> users
<span class="v48-key">WHERE</span> <span class="v48-func">acos</span>(<span class="v48-func">sin</span>(<span class="v48-func">radians</span>(<span class="v48-val">21.0285</span>)) * <span class="v48-func">sin</span>(<span class="v48-func">radians</span>(latitude)) 
  + <span class="v48-func">cos</span>(<span class="v48-func">radians</span>(<span class="v48-val">21.0285</span>)) * <span class="v48-func">cos</span>(<span class="v48-func">radians</span>(latitude)) 
  * <span class="v48-func">cos</span>(<span class="v48-func">radians</span>(longitude) - <span class="v48-func">radians</span>(<span class="v48-val">105.8542</span>))) 
  * <span class="v48-val">6371</span> &lt;= <span class="v48-val">10</span>;</code></pre>
                    </div>

                    <!-- DB Server & Monitor Row -->
                    <div class="v48-db-monitor-row">
                        <!-- Server Rack -->
                        <div class="v48-server-rack v48-glass" id="s2-server-rack">
                            <div class="v48-server-blade">
                                <div class="v48-blade-header">BLADE-01</div>
                                <div class="v48-led-group">
                                    <span class="v48-led active" id="s2-led-1"></span>
                                    <span class="v48-led active" id="s2-led-2"></span>
                                    <span class="v48-led active" id="s2-led-3"></span>
                                </div>
                            </div>
                            <div class="v48-server-blade">
                                <div class="v48-blade-header">BLADE-02</div>
                                <div class="v48-led-group">
                                    <span class="v48-led active" id="s2-led-4"></span>
                                    <span class="v48-led active" id="s2-led-5"></span>
                                    <span class="v48-led active" id="s2-led-6"></span>
                                </div>
                            </div>
                        </div>

                        <!-- CPU Monitor -->
                        <div class="v48-cpu-monitor v48-glass" id="s2-cpu-monitor">
                            <div class="v48-cpu-header">
                                <span>CPU USAGE</span>
                                <span class="v48-cpu-pct" id="s2-cpu-pct">12%</span>
                            </div>
                            <div class="v48-chart-container">
                                <svg class="v48-cpu-svg" viewBox="0 0 200 100">
                                    <path d="M0,90 Q40,85 80,88 T120,80 T160,85 T200,90" fill="none" stroke="#10b981" stroke-width="3" id="s2-cpu-line"/>
                                </svg>
                            </div>
                            <div class="v48-cpu-warning" id="s2-cpu-warning">WARNING: FULL TABLE SCAN!</div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_3') {
            canvas.innerHTML = `
                <div class="v48-slide-container">
                    <div class="v48-geohash-scene v48-glass">
                        <!-- Grid Overlay Map -->
                        <div class="v48-map-grid" id="s3-map-grid">
                            <!-- Grid cells are created dynamically, but here we place static divisions -->
                            <div class="v48-grid-row">
                                <div class="v48-grid-cell" id="s3-cell-00"><span>wx4g0</span></div>
                                <div class="v48-grid-cell" id="s3-cell-01"><span>wx4g1</span></div>
                                <div class="v48-grid-cell" id="s3-cell-02"><span>wx4g2</span></div>
                            </div>
                            <div class="v48-grid-row">
                                <div class="v48-grid-cell" id="s3-cell-10"><span>wx4g3</span></div>
                                <div class="v48-grid-cell user-cell" id="s3-cell-11">
                                    <span>wx4g4</span>
                                    <!-- User Dot -->
                                    <div class="v48-map-dot user-dot" id="s3-user-dot">
                                        <div class="v48-dot-pulse"></div>
                                    </div>
                                </div>
                                <div class="v48-grid-cell" id="s3-cell-12"><span>wx4g5</span></div>
                            </div>
                            <div class="v48-grid-row">
                                <div class="v48-grid-cell" id="s3-cell-20"><span>wx4g6</span></div>
                                <div class="v48-grid-cell" id="s3-cell-21"><span>wx4g7</span></div>
                                <div class="v48-grid-cell" id="s3-cell-22"><span>wx4g8</span></div>
                            </div>

                            <!-- Scattered user dots -->
                            <div class="v48-map-dot other-dot" style="left: 15%; top: 25%;" id="s3-dot-1"></div>
                            <div class="v48-map-dot other-dot target-dot" style="left: 48%; top: 40%;" id="s3-dot-2"></div>
                            <div class="v48-map-dot other-dot target-dot" style="left: 55%; top: 62%;" id="s3-dot-3"></div>
                            <div class="v48-map-dot other-dot" style="left: 82%; top: 78%;" id="s3-dot-4"></div>
                            <div class="v48-map-dot other-dot" style="left: 85%; top: 20%;" id="s3-dot-5"></div>
                        </div>

                        <!-- Sidebar Geohash resolution status -->
                        <div class="v48-geohash-sidebar">
                            <div class="v48-sidebar-header">GEOHASH ENCODER</div>
                            <div class="v48-coord-display">
                                <div>Lat: 21.0285</div>
                                <div>Lng: 105.8542</div>
                            </div>
                            <div class="v48-hash-string" id="s3-hash-string">w</div>
                            <div class="v48-hash-binary" id="s3-hash-binary">011001 101111 ...</div>
                            <div class="v48-hash-info" id="s3-hash-info">Khớp tiền tố = Ở gần nhau</div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_4') {
            canvas.innerHTML = `
                <div class="v48-slide-container">
                    <!-- Redis Terminal console -->
                    <div class="v48-redis-terminal v48-glass">
                        <div class="v48-term-header">
                            <i data-lucide="terminal" style="width:14px; height:14px; color:#10b981;"></i>
                            <span>Redis CLI - Geospatial Query</span>
                        </div>
                        <div class="v48-term-body">
                            <div class="v48-term-line"><span class="v48-term-prompt">redis-cli></span> <span id="s4-cmd-1">GEOADD tinder:locations 105.8542 21.0285 "user:you"</span></div>
                            <div class="v48-term-line output" id="s4-out-1">(integer) 1</div>
                            <div class="v48-term-line"><span class="v48-term-prompt">redis-cli></span> <span id="s4-cmd-2">GEORADIUS tinder:locations 105.8542 21.0285 10 km km WITHDIST</span></div>
                        </div>
                    </div>

                    <!-- Redis Sorted Set visualization -->
                    <div class="v48-zset-visual v48-glass">
                        <div class="v48-zset-header">
                            <i data-lucide="database" style="width:16px; height:16px; color:#fbbf24;"></i>
                            <span>Redis Sorted Set (ZSET) - Index Storage</span>
                        </div>
                        <div class="v48-zset-table">
                            <div class="v48-zset-row header">
                                <span class="v48-zcol-idx">Index</span>
                                <span class="v48-zcol-member">Member (User ID)</span>
                                <span class="v48-zcol-score">Score (52-bit Geohash Integer)</span>
                            </div>
                            <div class="v48-zset-row" id="s4-row-1">
                                <span class="v48-zcol-idx">001</span>
                                <span class="v48-zcol-member">user:maria</span>
                                <span class="v48-zcol-score">4025184209121</span>
                            </div>
                            <div class="v48-zset-row in-range" id="s4-row-2">
                                <span class="v48-zcol-idx">002</span>
                                <span class="v48-zcol-member">user:alice (Cách 2km)</span>
                                <span class="v48-zcol-score">4025187110540</span>
                            </div>
                            <div class="v48-zset-row in-range" id="s4-row-3">
                                <span class="v48-zcol-idx">003</span>
                                <span class="v48-zcol-member">user:bob (Cách 4km)</span>
                                <span class="v48-zcol-score">4025187121305</span>
                            </div>
                            <div class="v48-zset-row" id="s4-row-4">
                                <span class="v48-zcol-idx">004</span>
                                <span class="v48-zcol-member">user:david</span>
                                <span class="v48-zcol-score">4025189912001</span>
                            </div>
                        </div>

                        <!-- Scan laser bar overlay -->
                        <div class="v48-scan-laser" id="s4-scan-laser"></div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_5') {
            canvas.innerHTML = `
                <div class="v48-slide-container">
                    <div class="v48-boundary-scene v48-glass">
                        <!-- Grid 3x3 Map -->
                        <div class="v48-boundary-map" id="s5-boundary-map">
                            <!-- Rows and cells -->
                            <div class="v48-bgrid-row">
                                <div class="v48-bgrid-cell" id="s5-cell-1"><span>wx4g1</span></div>
                                <div class="v48-bgrid-cell" id="s5-cell-2"><span>wx4g2</span></div>
                                <div class="v48-bgrid-cell" id="s5-cell-3"><span>wx4g3</span></div>
                            </div>
                            <div class="v48-bgrid-row">
                                <div class="v48-bgrid-cell" id="s5-cell-8"><span>wx4g8</span></div>
                                <div class="v48-bgrid-cell user-cell" id="s5-cell-4">
                                    <span>wx4g4</span>
                                </div>
                                <div class="v48-bgrid-cell target-cell" id="s5-cell-5">
                                    <span>wx4g5</span>
                                </div>
                            </div>
                            <div class="v48-bgrid-row">
                                <div class="v48-bgrid-cell" id="s5-cell-6"><span>wx4g6</span></div>
                                <div class="v48-bgrid-cell" id="s5-cell-7"><span>wx4g7</span></div>
                                <div class="v48-bgrid-cell" id="s5-cell-9"><span>wx4g9</span></div>
                            </div>

                            <!-- User Dot (positioned close to right border of cell-4) -->
                            <div class="v48-bdot user-dot" id="s5-user-dot" style="left: 48%; top: 52%;">
                                <div class="v48-bdot-pulse"></div>
                            </div>

                            <!-- Target Dot (positioned just across the line in cell-5) -->
                            <div class="v48-bdot target-dot" id="s5-target-dot" style="left: 58%; top: 54%;"></div>

                            <!-- Search Circle Radius -->
                            <div class="v48-search-circle" id="s5-search-circle" style="left: 48%; top: 52%;"></div>
                        </div>

                        <!-- Sidebar details -->
                        <div class="v48-boundary-sidebar">
                            <div class="v48-sidebar-header">ĐIỂM MÙ BIÊN (BOUNDARY)</div>
                            <div class="v48-boundary-status" id="s5-status-title">QUÉT 1 Ô LƯỚI GỐC</div>
                            <div class="v48-boundary-desc" id="s5-status-desc">Không tìm thấy người ở ô bên cạnh dù khoảng cách rất gần (10m).</div>
                            <div class="v48-boundary-badge" id="s5-status-badge">0 KẾT QUẢ</div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_active_1') {
            const cardAlice = canvas.querySelector('#s1-card-alice');
            const cardBob = canvas.querySelector('#s1-card-bob');
            const badgeNopeAlice = canvas.querySelector('#s1-badge-nope-alice');
            const badgeLikeAlice = canvas.querySelector('#s1-badge-like-alice');
            const badgeNopeBob = canvas.querySelector('#s1-badge-nope-bob');
            const badgeLikeBob = canvas.querySelector('#s1-badge-like-bob');
            const gpsWidget = canvas.querySelector('#s1-gps-widget');

            // Reset transitions and values
            if (cardAlice) { cardAlice.style.transform = 'translate(0, 0) rotate(0deg)'; cardAlice.style.opacity = '1'; }
            if (cardBob) { cardBob.style.transform = 'translate(0, 0) rotate(0deg)'; cardBob.style.opacity = '1'; }
            if (badgeNopeAlice) badgeNopeAlice.style.opacity = '0';
            if (badgeLikeAlice) badgeLikeAlice.style.opacity = '0';
            if (badgeNopeBob) badgeNopeBob.style.opacity = '0';
            if (badgeLikeBob) badgeLikeBob.style.opacity = '0';
            if (gpsWidget) gpsWidget.classList.remove('pulse-active');

            if (progress <= 0.15) {
                // Initial state
            }
            else if (progress > 0.15 && progress <= 0.50) {
                // Alice slides right (LIKE)
                const t = (progress - 0.15) / 0.35; // 0 -> 1
                const x = t * 240;
                const r = t * 18;
                if (cardAlice) {
                    cardAlice.style.transform = `translate(${x}px, ${-t * 15}px) rotate(${r}deg)`;
                    cardAlice.style.opacity = `${1 - t * 0.9}`;
                }
                if (badgeLikeAlice) badgeLikeAlice.style.opacity = `${t * 1.5}`;
                if (gpsWidget) gpsWidget.classList.add('pulse-active');
            }
            else if (progress > 0.50 && progress <= 0.60) {
                // Alice completely gone, Bob on top
                if (cardAlice) cardAlice.style.opacity = '0';
            }
            else if (progress > 0.60 && progress <= 0.90) {
                // Alice is gone, Bob slides left (NOPE)
                if (cardAlice) cardAlice.style.opacity = '0';
                const t = (progress - 0.60) / 0.30; // 0 -> 1
                const x = -t * 240;
                const r = -t * 18;
                if (cardBob) {
                    cardBob.style.transform = `translate(${x}px, ${-t * 15}px) rotate(${r}deg)`;
                    cardBob.style.opacity = `${1 - t * 0.9}`;
                }
                if (badgeNopeBob) badgeNopeBob.style.opacity = `${t * 1.5}`;
            }
            else {
                // Both swiped out
                if (cardAlice) cardAlice.style.opacity = '0';
                if (cardBob) cardBob.style.opacity = '0';
                if (gpsWidget) gpsWidget.classList.add('pulse-active');
            }
        }
        else if (slideId === 'slide_active_2') {
            const led1 = canvas.querySelector('#s2-led-1');
            const led2 = canvas.querySelector('#s2-led-2');
            const led3 = canvas.querySelector('#s2-led-3');
            const led4 = canvas.querySelector('#s2-led-4');
            const led5 = canvas.querySelector('#s2-led-5');
            const led6 = canvas.querySelector('#s2-led-6');
            const cpuPct = canvas.querySelector('#s2-cpu-pct');
            const cpuLine = canvas.querySelector('#s2-cpu-line');
            const warning = canvas.querySelector('#s2-cpu-warning');
            const cpuMonitor = canvas.querySelector('#s2-cpu-monitor');

            // Reset
            const leds = [led1, led2, led3, led4, led5, led6];
            leds.forEach(led => {
                if (led) { led.className = 'v48-led active'; led.style.animation = 'none'; }
            });
            if (cpuPct) cpuPct.textContent = '12%';
            if (cpuLine) {
                cpuLine.setAttribute('d', 'M0,90 Q40,85 80,88 T120,80 T160,85 T200,90');
                cpuLine.setAttribute('stroke', '#10b981');
            }
            if (warning) warning.style.display = 'none';
            if (cpuMonitor) cpuMonitor.classList.remove('critical');

            if (progress <= 0.30) {
                // Initial normal queries
                leds.forEach((led, i) => {
                    if (led && Math.random() > 0.4) led.classList.toggle('active');
                });
            }
            else if (progress > 0.30 && progress <= 0.65) {
                // Full Scan begins, LEDs flash rapidly
                leds.forEach((led) => {
                    if (led) led.style.animation = 'v48-led-blink 0.15s infinite alternate';
                });
                const t = (progress - 0.30) / 0.35; // 0 -> 1
                const currentCpu = Math.round(12 + t * 45);
                if (cpuPct) cpuPct.textContent = `${currentCpu}%`;
                if (cpuLine) {
                    const yVal = 90 - t * 40;
                    cpuLine.setAttribute('d', `M0,90 L40,${90-t*15} L80,${88-t*25} L120,${80-t*35} L160,${85-t*30} L200,${yVal}`);
                    cpuLine.setAttribute('stroke', '#fbbf24');
                }
            }
            else {
                // Server Overload (100% CPU)
                leds.forEach((led) => {
                    if (led) {
                        led.className = 'v48-led error';
                        led.style.animation = 'v48-led-blink 0.1s infinite alternate';
                    }
                });
                if (cpuPct) cpuPct.textContent = '99%';
                if (cpuLine) {
                    cpuLine.setAttribute('d', 'M0,90 L30,80 L60,82 L90,40 L120,38 L150,12 L200,10');
                    cpuLine.setAttribute('stroke', '#ef4444');
                }
                if (warning) warning.style.display = 'block';
                if (cpuMonitor) cpuMonitor.classList.add('critical');
            }
        }
        else if (slideId === 'slide_active_3') {
            const hashStr = canvas.querySelector('#s3-hash-string');
            const hashBin = canvas.querySelector('#s3-hash-binary');
            const mapGrid = canvas.querySelector('#s3-map-grid');
            const dot1 = canvas.querySelector('#s3-dot-1');
            const dot2 = canvas.querySelector('#s3-dot-2');
            const dot3 = canvas.querySelector('#s3-dot-3');
            const dot4 = canvas.querySelector('#s3-dot-4');
            const dot5 = canvas.querySelector('#s3-dot-5');
            const cells = canvas.querySelectorAll('.v48-grid-cell');

            // Reset
            if (hashStr) hashStr.textContent = 'w';
            if (hashBin) hashBin.textContent = '011001';
            if (mapGrid) mapGrid.style.transform = 'scale(1)';
            [dot1, dot2, dot3, dot4, dot5].forEach(dot => {
                if (dot) dot.className = 'v48-map-dot other-dot';
            });
            cells.forEach(cell => {
                if (cell) cell.className = 'v48-grid-cell';
            });

            if (progress <= 0.20) {
                // Broad Level 1
                if (hashStr) hashStr.textContent = 'w';
                if (hashBin) hashBin.textContent = '011001';
            }
            else if (progress > 0.20 && progress <= 0.45) {
                // Subdivides to Level 2
                if (hashStr) hashStr.textContent = 'wx';
                if (hashBin) hashBin.textContent = '011001 10111';
                if (mapGrid) mapGrid.style.transform = 'scale(1.15)';
            }
            else if (progress > 0.45 && progress <= 0.70) {
                // Subdivides to Level 3
                if (hashStr) hashStr.textContent = 'wx4';
                if (hashBin) hashBin.textContent = '011001 101111 00100';
                if (mapGrid) mapGrid.style.transform = 'scale(1.3)';
            }
            else {
                // Level 5 Precise matching prefix (wx4g0)
                if (hashStr) hashStr.textContent = 'wx4g0';
                if (hashBin) hashBin.textContent = '011001 101111 00100 10001 00000';
                if (mapGrid) mapGrid.style.transform = 'scale(1.5)';
                
                // Dim out cells and far dots. Highlight target cells and near dots.
                cells.forEach(cell => {
                    if (cell) {
                        if (cell.classList.contains('user-cell') || cell.id === 's3-cell-00' || cell.id === 's3-cell-10') {
                            cell.classList.add('match-active');
                        } else {
                            cell.classList.add('dimmed');
                        }
                    }
                });

                // Dot 2 and Dot 3 are near (inside match-active cells)
                if (dot2) dot2.className = 'v48-map-dot other-dot active-near';
                if (dot3) dot3.className = 'v48-map-dot other-dot active-near';
                if (dot1) dot1.classList.add('dimmed');
                if (dot4) dot4.classList.add('dimmed');
                if (dot5) dot5.classList.add('dimmed');
            }
        }
        else if (slideId === 'slide_active_4') {
            const cmd1 = canvas.querySelector('#s4-cmd-1');
            const out1 = canvas.querySelector('#s4-out-1');
            const cmd2 = canvas.querySelector('#s4-cmd-2');
            const laser = canvas.querySelector('#s4-scan-laser');
            const row1 = canvas.querySelector('#s4-row-1');
            const row2 = canvas.querySelector('#s4-row-2');
            const row3 = canvas.querySelector('#s4-row-3');
            const row4 = canvas.querySelector('#s4-row-4');

            // Reset console text
            if (cmd1) cmd1.style.opacity = '0';
            if (out1) out1.style.display = 'none';
            if (cmd2) cmd2.style.opacity = '0';
            if (laser) { laser.style.display = 'none'; laser.style.top = '12%'; }
            [row1, row2, row3, row4].forEach(row => {
                if (row) row.classList.remove('highlight-row', 'dimmed-row');
            });

            if (progress <= 0.20) {
                // Typing cmd1
                if (cmd1) { cmd1.style.opacity = '1'; cmd1.textContent = 'GEOADD tinder:locations 105.8542 21.0285 "user:you"'.slice(0, Math.round(progress/0.20 * 48)); }
            }
            else if (progress > 0.20 && progress <= 0.35) {
                // Show output 1
                if (cmd1) { cmd1.style.opacity = '1'; cmd1.textContent = 'GEOADD tinder:locations 105.8542 21.0285 "user:you"'; }
                if (out1) out1.style.display = 'block';
            }
            else if (progress > 0.35 && progress <= 0.60) {
                // Typing cmd2
                if (cmd1) cmd1.style.opacity = '1';
                if (out1) out1.style.display = 'block';
                const t = (progress - 0.35) / 0.25;
                if (cmd2) { cmd2.style.opacity = '1'; cmd2.textContent = 'GEORADIUS tinder:locations 105.8542 21.0285 10 km WITHDIST'.slice(0, Math.round(t * 54)); }
            }
            else {
                // Run range query, laser scanning through the Sorted Set (ZSET)
                if (cmd1) cmd1.style.opacity = '1';
                if (out1) out1.style.display = 'block';
                if (cmd2) { cmd2.style.opacity = '1'; cmd2.textContent = 'GEORADIUS tinder:locations 105.8542 21.0285 10 km WITHDIST'; }
                if (laser) laser.style.display = 'block';

                const t = (progress - 0.60) / 0.40; // 0 -> 1
                
                // Laser position animation
                if (t <= 0.4) {
                    // Scanning down
                    if (laser) laser.style.top = `${25 + t/0.4 * 40}%`;
                } else {
                    // Locked range highlight (Alice and Bob rows)
                    if (laser) laser.style.top = '48%';
                    if (row2) row2.classList.add('highlight-row');
                    if (row3) row3.classList.add('highlight-row');
                    if (row1) row1.classList.add('dimmed-row');
                    if (row4) row4.classList.add('dimmed-row');
                }
            }
        }
        else if (slideId === 'slide_active_5') {
            const cells = canvas.querySelectorAll('.v48-bgrid-cell');
            const targetDot = canvas.querySelector('#s5-target-dot');
            const searchCircle = canvas.querySelector('#s5-search-circle');
            const statusTitle = canvas.querySelector('#s5-status-title');
            const statusDesc = canvas.querySelector('#s5-status-desc');
            const statusBadge = canvas.querySelector('#s5-status-badge');

            // Reset
            cells.forEach(cell => {
                if (cell) cell.className = 'v48-bgrid-cell';
            });
            if (targetDot) targetDot.className = 'v48-bdot target-dot';
            if (searchCircle) {
                searchCircle.style.width = '30px';
                searchCircle.style.height = '30px';
                searchCircle.style.opacity = '0.5';
            }
            if (statusTitle) statusTitle.textContent = 'QUÉT 1 Ô LƯỚI GỐC';
            if (statusDesc) statusDesc.textContent = 'Không tìm thấy người ở ô bên cạnh dù khoảng cách rất gần (10m).';
            if (statusBadge) {
                statusBadge.textContent = '0 KẾT QUẢ';
                statusBadge.className = 'v48-boundary-badge error';
            }

            if (progress <= 0.45) {
                // Phase 1: Only query original cell (wx4g4) - Target is missed!
                const cell4 = canvas.querySelector('#s5-cell-4');
                if (cell4) cell4.classList.add('match-active');
                cells.forEach(cell => {
                    if (cell && cell.id !== 's5-cell-4') cell.classList.add('dimmed');
                });
                if (targetDot) targetDot.classList.add('dimmed');
            }
            else {
                // Phase 2: Expanded query to 8 neighbors - Target found!
                cells.forEach(cell => {
                    if (cell) cell.classList.add('match-active');
                });
                if (targetDot) targetDot.className = 'v48-bdot target-dot active-near';
                if (searchCircle) {
                    searchCircle.style.width = '240px';
                    searchCircle.style.height = '240px';
                    searchCircle.style.opacity = '1';
                }
                if (statusTitle) statusTitle.textContent = 'TÌM KIẾM 8 Ô LÂN CẬN';
                if (statusDesc) statusDesc.textContent = 'Quét bao phủ toàn bộ 9 ô lưới giúp loại bỏ hoàn toàn điểm mù biên!';
                if (statusBadge) {
                    statusBadge.textContent = '1 KẾT QUẢ';
                    statusBadge.className = 'v48-boundary-badge success';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video48',
        topic: 'Geospatial Indexing'
    };

    console.log('[Video48 Plugin] Loaded: Tinder Geospatial Indexing plugin loaded.');
})();
