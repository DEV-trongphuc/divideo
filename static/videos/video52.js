/**
 * Video 52: Wi-Fi 2.4GHz vs 5GHz Comparison
 * Plugin containing animations for wave propagation, truck wall penetration, supercar crashes, and decision grids.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_wifi_1: [
            { text: '2.4 GHz', start: 1.0, end: 4.5, class: 'active-blue' },
            { text: '5 GHz', start: 4.5, end: 5.5, class: 'active-purple' }
        ],
        slide_wifi_1_b: [
            { text: 'kết nối', start: 1.0, end: 4.0, class: 'active-gold' },
            { text: 'dễ hiểu', start: 4.0, end: 6.5, class: 'active-good' }
        ],
        slide_wifi_2: [
            { text: 'xe tải', start: 1.5, end: 5.5, class: 'active-blue' },
            { text: 'chậm hơn', start: 5.5, end: 9.0, class: 'active-gold' },
            { text: 'xuyên qua', start: 9.0, end: 12.0, class: 'active-good' }
        ],
        slide_wifi_3: [
            { text: 'siêu xe đua', start: 1.5, end: 5.0, class: 'active-purple' },
            { text: 'tốc độ cực nhanh', start: 5.0, end: 9.0, class: 'active-good' },
            { text: 'mất sóng', start: 9.0, end: 12.0, class: 'active-bad' }
        ],
        slide_wifi_4: [
            { text: 'ngồi gần', start: 2.0, end: 6.0, class: 'active-good' },
            { text: 'phòng khác', start: 6.0, end: 10.0, class: 'active-gold' },
            { text: 'tránh chập chờn', start: 10.0, end: 13.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_wifi_1', 'slide_wifi_1_b', 'slide_wifi_2', 'slide_wifi_3', 'slide_wifi_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v52-zoom-container">${absHtml}<div class="v52-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_wifi_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v52-logo-container">
                    <div class="v52-wave-pulse pulse-1"></div>
                    <div class="v52-wave-pulse pulse-2"></div>
                    <div class="v52-wave-pulse pulse-3"></div>
                    <div class="v52-logo-ring"></div>
                    <div class="v52-logo-ring inner"></div>
                    <div class="v52-logo-core">
                        <i data-lucide="wifi"></i>
                        <span style="color:#fff; font-size:18px; font-weight:900; letter-spacing:0.5px; font-family:sans-serif; margin-top: 2px;">2.4GHz vs 5GHz</span>
                    </div>
                </div>
                <div class="v52-glass-card glow-blue">
                    <span class="v52-status-badge blue"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> KẾT NỐI NÀO TỐT NHẤT?</span>
                    <span style="color:#fff;" id="v52-intro-status">Điện thoại nhà bạn hiển thị cả 2 sóng Wi-Fi 2.4GHz và 5GHz?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_wifi_1_b') {
            canvas.innerHTML = sceneWrap(`
                <div class="v52-scene-row" style="height: 220px; display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 40px;">
                    <!-- Choice 2.4GHz -->
                    <div class="v52-choice-node blue" id="v52-choice-24">
                        <span class="emoji">🚚</span>
                        <span class="freq">2.4 GHz</span>
                        <span class="desc">Chạy xa, xuyên tường</span>
                    </div>

                    <!-- VS Divider -->
                    <div class="v52-vs-divider">
                        <div class="v52-vs-line"></div>
                        <div class="v52-vs-circle">VS</div>
                        <div class="v52-vs-line"></div>
                    </div>

                    <!-- Choice 5GHz -->
                    <div class="v52-choice-node purple" id="v52-choice-5">
                        <span class="emoji">🏎️</span>
                        <span class="freq">5 GHz</span>
                        <span class="desc">Cực nhanh, nhạy sóng</span>
                    </div>
                </div>
                <div class="v52-glass-card glow-gold">
                    <span class="v52-status-badge gold"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> LỰA CHỌN KHÓ KHĂN?</span>
                    <span style="color:#fff;" id="v52-choice-status">Bạn băn khoăn không biết nên kết nối vào sóng nào?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_wifi_2') {
            canvas.innerHTML = sceneWrap(`
                <div class="v52-scene-row">
                    <!-- Router on Left (Absolute) -->
                    <div class="v52-router-node" id="v52-s2-router" style="position:absolute; left:40px; top:30px;">
                        <i data-lucide="router"></i>
                        <span>Router 2.4G</span>
                    </div>

                    <!-- Pulse Wave -->
                    <div class="v52-pulse-wave" id="v52-s2-pulse"></div>

                    <!-- Two Brick Walls in the Middle -->
                    <div style="display:flex; gap:25px; position:absolute; left:260px; top:20px;">
                        <div class="v52-wall"></div>
                        <div class="v52-wall"></div>
                    </div>

                    <!-- Moving Truck -->
                    <div class="v52-vehicle" id="v52-s2-truck" style="left:150px; top:35px;">
                        <span>🚚</span>
                        <span class="label">2.4GHz Wave</span>
                    </div>

                    <!-- Client Laptop on Right (Absolute) -->
                    <div class="v52-client-node" id="v52-s2-client" style="position:absolute; right:40px; top:30px;">
                        <i data-lucide="laptop"></i>
                        <span>Client Device</span>
                    </div>

                    <!-- Alert Badge -->
                    <div class="v52-badge green" id="v52-s2-badge">2.4GHz: BẮT SÓNG KHỎE (150Mbps)</div>
                </div>

                <div class="v52-glass-card glow-blue">
                    <span class="v52-status-badge blue"><i data-lucide="truck" style="width:12px;height:12px;"></i> 2.4GHZ CHARACTERISTICS</span>
                    <span style="color:#fff;" id="v52-s2-status">Sóng 2.4GHz giống như xe tải chở hàng chạy đường dài.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_wifi_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v52-scene-row">
                    <!-- Router on Left (Absolute) -->
                    <div class="v52-router-node purple" id="v52-s3-router" style="position:absolute; left:40px; top:30px;">
                        <i data-lucide="router"></i>
                        <span>Router 5G</span>
                    </div>

                    <!-- Pulse Wave -->
                    <div class="v52-pulse-wave purple" id="v52-s3-pulse"></div>

                    <!-- One Brick Wall in the Middle -->
                    <div style="position:absolute; left:285px; top:20px;">
                        <div class="v52-wall" id="v52-s3-wall"></div>
                    </div>

                    <!-- Crash Spark -->
                    <div class="v52-crash-spark" id="v52-s3-spark" style="left:265px; top:40px;">💥</div>

                    <!-- Moving Supercar -->
                    <div class="v52-vehicle" id="v52-s3-car" style="left:150px; top:35px;">
                        <span>🏎️</span>
                        <span class="label">5GHz Wave</span>
                    </div>

                    <!-- Client Laptop on Right (Absolute) -->
                    <div class="v52-client-node" id="v52-s3-client" style="position:absolute; right:40px; top:30px;">
                        <i data-lucide="laptop"></i>
                        <span>Client Device</span>
                    </div>

                    <!-- Alert Badges -->
                    <div class="v52-badge red" id="v52-s3-badge-fail">5GHz: MẤT SÓNG HOÀN TOÀN (0Mbps)</div>
                    <div class="v52-badge green" id="v52-s3-badge-ok">5GHz: TỐC ĐỘ CỰC ĐỈNH (1200Mbps)</div>
                </div>

                <div class="v52-glass-card glow-purple">
                    <span class="v52-status-badge purple"><i data-lucide="zap" style="width:12px;height:12px;"></i> 5GHZ CHARACTERISTICS</span>
                    <span style="color:#fff;" id="v52-s3-status">Sóng 5GHz giống như siêu xe đua trên đường cao tốc.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_wifi_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v52-compare-grid">
                    <!-- Column 2.4GHz -->
                    <div class="v52-compare-col" id="v52-col-24">
                        <div class="v52-col-header blue">
                            <i data-lucide="truck"></i>
                            <span>Sóng 2.4 GHz</span>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Tốc độ tối đa</span>
                            <div class="val">~ 150 Mbps</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Khả năng xuyên tường</span>
                            <div class="val"><i data-lucide="check-circle" class="good" style="width:14px;height:14px;"></i> Cực kỳ khỏe</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Phạm vi phủ sóng</span>
                            <div class="val"><i data-lucide="check-circle" class="good" style="width:14px;height:14px;"></i> Rất xa (đến 50m)</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Nên dùng khi</span>
                            <div class="val">Ở xa, trong phòng kín, tầng khác</div>
                        </div>
                    </div>

                    <!-- Column 5GHz -->
                    <div class="v52-compare-col" id="v52-col-5">
                        <div class="v52-col-header purple">
                            <i data-lucide="zap"></i>
                            <span>Sóng 5 GHz</span>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Tốc độ tối đa</span>
                            <div class="val"><i data-lucide="trending-up" class="good" style="width:14px;height:14px;"></i> ~ 1.2 Gbps (Nhanh gấp 8 lần!)</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Khả năng xuyên tường</span>
                            <div class="val"><i data-lucide="x-circle" class="bad" style="width:14px;height:14px;"></i> Rất kém</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Phạm vi phủ sóng</span>
                            <div class="val"><i data-lucide="x-circle" class="bad" style="width:14px;height:14px;"></i> Hẹp (đến 15m)</div>
                        </div>
                        <div class="v52-compare-item">
                            <span class="label">Nên dùng khi</span>
                            <div class="val">Ngồi gần, chơi game, xem phim 4K</div>
                        </div>
                    </div>
                </div>

                <div class="v52-glass-card glow-green">
                    <span class="v52-status-badge green"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> BÍ QUYẾT LỰA CHỌN</span>
                    <span style="color:#fff;" id="v52-s4-status">Quy tắc chọn sóng Wi-Fi phù hợp cực kỳ đơn giản.</span>
                </div>
            `);
            initIcons();
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_wifi_1') {
            const status = canvas.querySelector('#v52-intro-status');
            if (status) {
                if (progress <= 0.5) {
                    status.textContent = 'Điện thoại nhà bạn hiển thị cả 2 sóng Wi-Fi 2.4GHz và 5GHz?';
                } else {
                    status.textContent = 'Bạn băn khoăn không biết nên kết nối vào sóng nào?';
                }
            }
        }
        else if (slideId === 'slide_wifi_1_b') {
            const choice24 = canvas.querySelector('#v52-choice-24');
            const choice5 = canvas.querySelector('#v52-choice-5');
            const status = canvas.querySelector('#v52-choice-status');

            if (choice24) choice24.className = 'v52-choice-node blue';
            if (choice5) choice5.className = 'v52-choice-node purple';

            if (progress <= 0.4) {
                if (choice24) choice24.className = 'v52-choice-node blue active-blue';
                if (status) status.textContent = 'Chọn 2.4GHz chạy xa, khỏe, xuyên tường...';
            } else if (progress > 0.4 && progress <= 0.8) {
                if (choice5) choice5.className = 'v52-choice-node purple active-purple';
                if (status) status.textContent = 'Hay chọn 5GHz siêu tốc độ, mượt mà?';
            } else {
                if (choice24) choice24.className = 'v52-choice-node blue active-blue';
                if (choice5) choice5.className = 'v52-choice-node purple active-purple';
                if (status) status.textContent = 'Đừng lo! Hãy cùng phân biệt cực kỳ dễ hiểu ngay nhé.';
            }
        }
        else if (slideId === 'slide_wifi_2') {
            const router = canvas.querySelector('#v52-s2-router');
            const client = canvas.querySelector('#v52-s2-client');
            const pulse = canvas.querySelector('#v52-s2-pulse');
            const truck = canvas.querySelector('#v52-s2-truck');
            const status = canvas.querySelector('#v52-s2-status');
            const badge = canvas.querySelector('#v52-s2-badge');

            // Reset state
            if (router) router.className = 'v52-router-node';
            if (client) client.className = 'v52-client-node';
            if (pulse) { pulse.style.opacity = '0'; pulse.style.width = '2px'; }
            if (truck) { truck.style.opacity = '0'; truck.style.left = '150px'; }
            if (badge) badge.style.display = 'none';

            if (progress > 0.05) {
                if (router) router.className = 'v52-router-node active-user';
            }

            // Staggered wave pulses
            if (progress > 0.1 && progress < 0.85) {
                if (pulse) {
                    const waveT = ((progress - 0.1) / 0.75) % 0.35; // loop waves
                    pulse.style.opacity = 1 - (waveT / 0.35);
                    pulse.style.width = `${waveT * 1200}px`;
                }
            }

            // Truck travel from left: 150px to 390px
            if (progress >= 0.15 && progress < 0.8) {
                const t = (progress - 0.15) / 0.65;
                if (truck) {
                    truck.style.opacity = '1';
                    const currentX = 150 + t * 240;
                    truck.style.left = `${currentX}px`;
                }
                if (status) status.textContent = 'Xe tải 2.4GHz đi chậm hơn, nhưng cực kỳ khỏe, dễ dàng xuyên qua tường gạch...';
            }
            else if (progress >= 0.8) {
                if (truck) {
                    truck.style.opacity = '1';
                    truck.style.left = '390px';
                }
                if (client) client.className = 'v52-client-node connected-blue';
                if (badge) badge.style.display = 'block';
                if (status) status.textContent = 'Dù có nhiều vật cản, sóng 2.4GHz vẫn truyền được tín hiệu khỏe mạnh đến thiết bị!';
            }
        }
        else if (slideId === 'slide_wifi_3') {
            const router = canvas.querySelector('#v52-s3-router');
            const client = canvas.querySelector('#v52-s3-client');
            const pulse = canvas.querySelector('#v52-s3-pulse');
            const car = canvas.querySelector('#v52-s3-car');
            const spark = canvas.querySelector('#v52-s3-spark');
            const wall = canvas.querySelector('#v52-s3-wall');
            const status = canvas.querySelector('#v52-s3-status');
            const badgeFail = canvas.querySelector('#v52-s3-badge-fail');
            const badgeOk = canvas.querySelector('#v52-s3-badge-ok');

            // Reset state
            if (router) router.className = 'v52-router-node purple';
            if (client) client.className = 'v52-client-node';
            if (pulse) { pulse.style.opacity = '0'; pulse.style.width = '2px'; }
            if (car) { car.style.opacity = '0'; car.style.left = '150px'; car.style.transform = 'none'; }
            if (spark) { spark.style.opacity = '0'; spark.style.transform = 'scale(0.5)'; }
            if (wall) { wall.style.display = 'block'; wall.style.opacity = '1'; }
            if (badgeFail) badgeFail.style.display = 'none';
            if (badgeOk) badgeOk.style.display = 'none';

            if (progress > 0.05) {
                if (router) router.className = 'v52-router-node purple active-purple';
            }

            // Staggered fast wave pulses (double speed of 2.4)
            if (progress > 0.08 && progress < 0.8) {
                if (pulse) {
                    const waveT = ((progress - 0.08) / 0.72) % 0.18; // loop waves twice as fast
                    pulse.style.opacity = 1 - (waveT / 0.18);
                    pulse.style.width = `${waveT * 1800}px`;
                }
            }

            // Supercar travel
            if (progress >= 0.15 && progress < 0.5) {
                const t = (progress - 0.15) / 0.35;
                if (car) {
                    car.style.opacity = '1';
                    // Travel from left: 150px to 215px (hits the wall at 285px)
                    const currentX = 150 + t * 65;
                    car.style.left = `${currentX}px`;
                }
                if (status) status.textContent = 'Siêu xe 5GHz phóng cực nhanh với băng thông lớn, nhưng khả năng vượt tường rất kém...';
            }
            // CRASH phase
            else if (progress >= 0.5 && progress < 0.8) {
                const crashProgress = (progress - 0.5) / 0.3; // 0 to 1
                if (car) {
                    car.style.opacity = Math.max(0, 1 - crashProgress * 3);
                    car.style.left = '215px';
                    car.style.transform = 'rotate(-15deg) translateY(-5px)';
                }
                if (spark) {
                    if (crashProgress < 0.4) {
                        spark.style.opacity = '1';
                        spark.style.transform = `scale(${1 + crashProgress * 1.5})`;
                    } else {
                        spark.style.opacity = '0';
                    }
                }
                if (client) client.className = 'v52-client-node disconnected';
                if (badgeFail) badgeFail.style.display = 'block';
                if (status) status.textContent = 'BÙM! Chỉ cần gặp 1 bức tường gạch, siêu xe 5GHz lập tức đâm sầm và mất sóng hoàn toàn!';
            }
            // NO WALL phase (Sit close, showing speed)
            else if (progress >= 0.8) {
                if (wall) { wall.style.opacity = '0.15'; } // Wall fades out / bypassed
                if (car) {
                    car.style.opacity = '1';
                    car.style.left = '390px';
                }
                if (client) client.className = 'v52-client-node connected-purple';
                if (badgeOk) badgeOk.style.display = 'block';
                if (status) status.textContent = 'Tuy nhiên, nếu ngồi gần và không vật cản, siêu xe 5GHz chạy với tốc độ đỉnh cao 1200Mbps!';
            }
        }
        else if (slideId === 'slide_wifi_4') {
            const col24 = canvas.querySelector('#v52-col-24');
            const col5 = canvas.querySelector('#v52-col-5');
            const status = canvas.querySelector('#v52-s4-status');

            if (col24) col24.classList.remove('active');
            if (col5) col5.classList.remove('active');

            if (progress <= 0.4) {
                if (col24) col24.classList.add('active');
                if (status) status.textContent = 'Tóm lại: Chọn sóng 2.4GHz khi bạn ở xa, phòng kín hoặc tầng khác để sóng ổn định.';
            }
            else if (progress > 0.4 && progress <= 0.8) {
                if (col5) col5.classList.add('active', 'purple');
                if (status) status.textContent = 'Chọn sóng 5GHz khi bạn ở gần cục phát Wi-Fi để xem phim 4K, gọi video mượt mà.';
            }
            else {
                if (col24) col24.classList.add('active');
                if (col5) col5.classList.add('active', 'purple');
                if (status) status.textContent = 'Quy tắc vàng: Ở GẦN chọn 5GHz - Ở XA chọn 2.4GHz!';
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video52',
        topic: 'Wi-Fi 2.4G vs 5G',
        episodeNum: 52,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video52 Plugin] Loaded: Wi-Fi 2.4G vs 5G slides loaded.');
})();
