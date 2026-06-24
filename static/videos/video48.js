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
                                <!-- Card 5: Ethan -->
                                <div class="v48-profile-card v48-card-ethan" id="s1-card-ethan">
                                    <div class="v48-card-bg v48-grad-ethan">
                                        <div class="v48-avatar-emoji">👨‍🍳</div>
                                    </div>
                                    <div class="v48-card-info">
                                        <h3>Ethan, 27 <span class="v48-badge-online"></span></h3>
                                        <p><i data-lucide="map-pin"></i> Cách bạn 3 km</p>
                                        <p class="v48-card-bio">Head Chef • Coffee Lover ☕</p>
                                    </div>
                                    <div class="v48-swipe-badge nope" id="s1-badge-nope-ethan">NOPE</div>
                                    <div class="v48-swipe-badge like" id="s1-badge-like-ethan">LIKE</div>
                                </div>

                                <!-- Card 4: Diana -->
                                <div class="v48-profile-card v48-card-diana" id="s1-card-diana">
                                    <div class="v48-card-bg v48-grad-diana">
                                        <div class="v48-avatar-emoji">👩‍⚕️</div>
                                    </div>
                                    <div class="v48-card-info">
                                        <h3>Diana, 24 <span class="v48-badge-online"></span></h3>
                                        <p><i data-lucide="map-pin"></i> Cách bạn 1 km</p>
                                        <p class="v48-card-bio">Doctor • Yoga & Books 📚</p>
                                    </div>
                                    <div class="v48-swipe-badge nope" id="s1-badge-nope-diana">NOPE</div>
                                    <div class="v48-swipe-badge like" id="s1-badge-like-diana">LIKE</div>
                                </div>

                                <!-- Card 3: Charlie -->
                                <div class="v48-profile-card v48-card-charlie" id="s1-card-charlie">
                                    <div class="v48-card-bg v48-grad-charlie">
                                        <div class="v48-avatar-emoji">🏃‍♂️</div>
                                    </div>
                                    <div class="v48-card-info">
                                        <h3>Charlie, 28 <span class="v48-badge-online"></span></h3>
                                        <p><i data-lucide="map-pin"></i> Cách bạn 6 km</p>
                                        <p class="v48-card-bio">Product PM • Marathon Runner 🏃‍♂️</p>
                                    </div>
                                    <div class="v48-swipe-badge nope" id="s1-badge-nope-charlie">NOPE</div>
                                    <div class="v48-swipe-badge like" id="s1-badge-like-charlie">LIKE</div>
                                </div>

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
                    <div class="v48-code-window v48-glass" style="position: relative; overflow: hidden;">
                        <div class="v48-code-scan" id="s2-code-scan"></div>
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
                        <div class="v48-server-rack v48-glass" id="s2-server-rack" style="position: relative;">
                            <div class="v48-server-blade" id="s2-blade-1-el" style="position: relative;">
                                <div class="v48-blade-header">BLADE-01</div>
                                <div class="v48-led-group">
                                    <span class="v48-led active" id="s2-led-1"></span>
                                    <span class="v48-led active" id="s2-led-2"></span>
                                    <span class="v48-led active" id="s2-led-3"></span>
                                </div>
                                <div class="v48-blade-heat" id="s2-heat-1"></div>
                            </div>
                            <div class="v48-server-blade" id="s2-blade-2-el" style="position: relative;">
                                <div class="v48-blade-header">BLADE-02</div>
                                <div class="v48-led-group">
                                    <span class="v48-led active" id="s2-led-4"></span>
                                    <span class="v48-led active" id="s2-led-5"></span>
                                    <span class="v48-led active" id="s2-led-6"></span>
                                </div>
                                <div class="v48-blade-heat" id="s2-heat-2"></div>
                            </div>
                        </div>
 
                        <!-- CPU Monitor -->
                        <div class="v48-cpu-monitor v48-glass" id="s2-cpu-monitor" style="position: relative; overflow: hidden;">
                            <div class="v48-cpu-warning-banner" id="s2-warning-banner">CRITICAL OVERLOAD</div>
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
                        <div class="v48-map-grid">
                            <div class="v48-map-inner" id="s3-map-grid">
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
            const cardCharlie = canvas.querySelector('#s1-card-charlie');
            const cardDiana = canvas.querySelector('#s1-card-diana');
            const cardEthan = canvas.querySelector('#s1-card-ethan');
 
            const badgeNopeAlice = canvas.querySelector('#s1-badge-nope-alice');
            const badgeLikeAlice = canvas.querySelector('#s1-badge-like-alice');
            const badgeNopeBob = canvas.querySelector('#s1-badge-nope-bob');
            const badgeLikeBob = canvas.querySelector('#s1-badge-like-bob');
            const badgeNopeCharlie = canvas.querySelector('#s1-badge-nope-charlie');
            const badgeLikeCharlie = canvas.querySelector('#s1-badge-like-charlie');
            const badgeNopeDiana = canvas.querySelector('#s1-badge-nope-diana');
            const badgeLikeDiana = canvas.querySelector('#s1-badge-like-diana');
            const badgeNopeEthan = canvas.querySelector('#s1-badge-nope-ethan');
            const badgeLikeEthan = canvas.querySelector('#s1-badge-like-ethan');
 
            const gpsWidget = canvas.querySelector('#s1-gps-widget');
 
            // Reset all transforms, opacity, and badges
            const cards = [
                { el: cardAlice, nope: badgeNopeAlice, like: badgeLikeAlice, dir: 1 },  // 1 = right, -1 = left
                { el: cardBob, nope: badgeNopeBob, like: badgeLikeBob, dir: -1 },
                { el: cardCharlie, nope: badgeNopeCharlie, like: badgeLikeCharlie, dir: 1 },
                { el: cardDiana, nope: badgeNopeDiana, like: badgeLikeDiana, dir: -1 },
                { el: cardEthan, nope: badgeNopeEthan, like: badgeLikeEthan, dir: 1 }
            ];
 
            cards.forEach(c => {
                if (c.el) {
                    c.el.style.transform = 'translate(0, 0) rotate(0deg)';
                    c.el.style.opacity = '1';
                }
                if (c.nope) c.nope.style.opacity = '0';
                if (c.like) c.like.style.opacity = '0';
            });
            if (gpsWidget) gpsWidget.classList.remove('pulse-active');
 
            // Define timing windows for each swipe
            const steps = [
                { start: 0.05, end: 0.18 }, // Card 1 (Alice) swipes right
                { start: 0.20, end: 0.33 }, // Card 2 (Bob) swipes left
                { start: 0.35, end: 0.48 }, // Card 3 (Charlie) swipes right
                { start: 0.50, end: 0.63 }, // Card 4 (Diana) swipes left
                { start: 0.65, end: 0.78 }  // Card 5 (Ethan) swipes right
            ];
 
            // Animate each card
            steps.forEach((step, idx) => {
                const c = cards[idx];
                if (!c.el) return;
 
                if (progress < step.start) {
                    c.el.style.transform = 'translate(0, 0) rotate(0deg)';
                    c.el.style.opacity = '1';
                } else if (progress >= step.start && progress <= step.end) {
                    const t = (progress - step.start) / (step.end - step.start); // 0 -> 1
                    const x = t * 280 * c.dir;
                    const r = t * 20 * c.dir;
                    c.el.style.transform = `translate(${x}px, ${-t * 20}px) rotate(${r}deg)`;
                    c.el.style.opacity = `${1 - t * 0.95}`;
                    
                    if (c.dir === 1 && c.like) c.like.style.opacity = `${t * 1.5}`;
                    if (c.dir === -1 && c.nope) c.nope.style.opacity = `${t * 1.5}`;
                    if (gpsWidget) gpsWidget.classList.add('pulse-active');
                } else {
                    c.el.style.transform = `translate(${300 * c.dir}px, -25px) rotate(${25 * c.dir}deg)`;
                    c.el.style.opacity = '0';
                }
            });
 
            // Activate GPS pulse when swiping is in progress or completed
            if (progress > 0.05) {
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
            const codeScan = canvas.querySelector('#s2-code-scan');
            const heat1 = canvas.querySelector('#s2-heat-1');
            const heat2 = canvas.querySelector('#s2-heat-2');
            const warningBanner = canvas.querySelector('#s2-warning-banner');
 
            const leds = [led1, led2, led3, led4, led5, led6];
 
            // Reset
            leds.forEach(led => {
                if (led) { led.className = 'v48-led active'; led.style.animation = 'none'; }
            });
            if (cpuPct) cpuPct.textContent = '12%';
            if (cpuLine) {
                cpuLine.setAttribute('stroke', '#10b981');
                cpuLine.setAttribute('stroke-width', '3');
            }
            if (warning) warning.style.display = 'none';
            if (cpuMonitor) cpuMonitor.classList.remove('critical');
            if (codeScan) { codeScan.style.display = 'none'; codeScan.style.top = '0%'; }
            if (heat1) { heat1.style.opacity = '0'; }
            if (heat2) { heat2.style.opacity = '0'; }
            if (warningBanner) { warningBanner.style.display = 'none'; }
 
            if (progress <= 0.20) {
                leds.forEach((led, i) => {
                    if (led && Math.random() > 0.4) led.classList.toggle('active');
                });
                if (codeScan) {
                    codeScan.style.display = 'block';
                    codeScan.style.top = `${progress/0.20 * 100}%`;
                }
                if (cpuLine) {
                    const path = `M0,85 Q25,${80 + Math.random()*8} 50,85 T100,82 T150,85 T200,80`;
                    cpuLine.setAttribute('d', path);
                }
            }
            else if (progress > 0.20 && progress <= 0.65) {
                leds.forEach((led) => {
                    if (led) led.style.animation = 'v48-led-blink 0.15s infinite alternate';
                });
                const t = (progress - 0.20) / 0.45; // 0 -> 1
                const currentCpu = Math.round(12 + t * 65); // Ramps up to 77%
                if (cpuPct) cpuPct.textContent = `${currentCpu}%`;
                
                if (codeScan) {
                    codeScan.style.display = 'block';
                    codeScan.style.top = `${((progress - 0.20) / 0.15 % 1.0) * 100}%`;
                }
 
                if (heat1) heat1.style.opacity = `${t * 0.5}`;
                if (heat2) heat2.style.opacity = `${t * 0.3}`;
 
                if (cpuLine) {
                    const amp = t * 35;
                    const p1 = 80 - Math.random() * amp;
                    const p2 = 82 - Math.random() * amp;
                    const p3 = 78 - Math.random() * amp;
                    const p4 = 90 - t * 40 - Math.random() * 5;
                    cpuLine.setAttribute('d', `M0,90 L40,${p1} L80,${p2} L120,${p3} L160,80 L200,${p4}`);
                    cpuLine.setAttribute('stroke', '#fbbf24');
                }
            }
            else {
                leds.forEach((led) => {
                    if (led) {
                        led.className = 'v48-led error';
                        led.style.animation = 'v48-led-blink 0.08s infinite alternate';
                    }
                });
                if (cpuPct) cpuPct.textContent = '99%';
                if (warning) warning.style.display = 'block';
                if (cpuMonitor) cpuMonitor.classList.add('critical');
                if (warningBanner) warningBanner.style.display = 'flex';
                
                if (heat1) heat1.style.opacity = '1';
                if (heat2) heat2.style.opacity = '0.9';
 
                if (cpuLine) {
                    const spikes = [];
                    for (let x = 0; x <= 200; x += 15) {
                        const y = 15 + Math.random() * 25;
                        spikes.push(`${x},${y}`);
                    }
                    cpuLine.setAttribute('d', `M0,90 L` + spikes.join(' L'));
                    cpuLine.setAttribute('stroke', '#ef4444');
                }
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
