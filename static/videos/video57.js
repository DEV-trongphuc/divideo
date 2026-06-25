/**
 * Video 57: AirDrop & Quick Share P2P Wireless Simulation
 * Plugin containing animations for BLE peer discovery, secure handshake keys,
 * direct WiFi P2P link pipes, and high-speed local wireless file transfers.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_airdrop_1: [
            { text: 'AirDrop', start: 1.0, end: 5.5, class: 'active-cyan' },
            { text: 'Quick Share', start: 5.5, end: 10.0, class: 'active-cyan' },
            { text: 'không có Internet', start: 10.0, end: 14.5, class: 'active-cyan' }
        ],
        slide_airdrop_2: [
            { text: 'dò tìm thiết bị', start: 1.0, end: 6.0, class: 'active-cyan' },
            { text: 'Bluetooth Low Energy', start: 6.0, end: 11.5, class: 'active-cyan' },
            { text: 'sẵn sàng nhận file', start: 11.5, end: 16.0, class: 'active-cyan' }
        ],
        slide_airdrop_3: [
            { text: 'bắt tay đàm phán', start: 1.5, end: 6.5, class: 'active-cyan' },
            { text: 'WiFi ngang hàng', start: 6.5, end: 12.0, class: 'active-cyan' },
            { text: 'băng thông cực kỳ rộng', start: 12.0, end: 17.0, class: 'active-cyan' }
        ],
        slide_airdrop_4: [
            { text: 'truyền file bắt đầu', start: 1.5, end: 6.5, class: 'active-cyan' },
            { text: 'tốc độ bàn thờ', start: 6.5, end: 12.0, class: 'active-cyan' },
            { text: 'WiFi Direct', start: 12.0, end: 17.5, class: 'active-cyan' }
        ]
    };

    const customSlideIds = [
        'slide_airdrop_1', 'slide_airdrop_2', 'slide_airdrop_3', 'slide_airdrop_4'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // Wrap with layout container
    function sceneWrap(inner) {
        return `<div class="v57-zoom-container"><div class="v57-scene-content">${inner}</div></div>`;
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

        // Render only the scene row containing the phones, omitting the bottom description cards completely
        canvas.innerHTML = sceneWrap(`
            <div class="v57-scene-row">
                <!-- Ambient Background Glow circles -->
                <div class="v57-bg-glow-circle c1"></div>
                <div class="v57-bg-glow-circle c2"></div>

                <!-- Concentric BLE Discovery Wave Rings (behind Phone A) -->
                <div class="v57-ble-pulse-ring r1" id="s-ble-ring-1"></div>
                <div class="v57-ble-pulse-ring r2" id="s-ble-ring-2"></div>
                <div class="v57-ble-pulse-ring r3" id="s-ble-ring-3"></div>

                <!-- BLE advertising beacon particles radiating outward -->
                <div class="v57-ble-beacon b1" id="s-ble-beacon-1"></div>
                <div class="v57-ble-beacon b2" id="s-ble-beacon-2"></div>
                <div class="v57-ble-beacon b3" id="s-ble-beacon-3"></div>
                <div class="v57-ble-beacon b4" id="s-ble-beacon-4"></div>

                <!-- SVG Connectors Layer -->
                <svg class="v57-connector-svg">
                    <defs>
                        <!-- Gradient for WiFi Direct Pipe Tunnel -->
                        <linearGradient id="v57-cyan-blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#06b6d4" />
                            <stop offset="100%" stop-color="#2563eb" />
                        </linearGradient>
                    </defs>
                    <!-- BLE discovery link line -->
                    <path id="s-ble-line" class="v57-ble-wave-line" d="M 170 240 L 470 240" />
                    
                    <!-- WiFi Direct pipe link tunnels -->
                    <path id="s-wifi-pipe" class="v57-wifi-pipe-tunnel" d="M 170 240 L 470 240" />
                    <path id="s-wifi-pipe-core" class="v57-wifi-pipe-tunnel-core" d="M 170 240 L 470 240" />
                </svg>

                <!-- Secure Handshake Shield badge -->
                <div class="v57-handshake-shield" id="s-handshake-shield">
                    <i data-lucide="shield-check" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:3px;"></i> P2P LINK SECURE
                </div>

                <!-- Secure golden key packet (handshake negotiation) -->
                <div class="v57-key-packet" id="s-key-packet">
                    <i data-lucide="key" style="width:10px; height:10px; color:#fff; display:inline-block; vertical-align:middle;"></i>
                </div>

                <!-- High-speed WiFi Direct data stream particles -->
                <div class="v57-data-particle p1" id="s-data-part-1"></div>
                <div class="v57-data-particle p2" id="s-data-part-2"></div>
                <div class="v57-data-particle p3" id="s-data-part-3"></div>

                <!-- Floating transferring card -->
                <div class="v57-transferring-card" id="s-transfer-card">
                    <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300&auto=format&fit=crop" />
                </div>

                <!-- PHONE A (Sender - Left) -->
                <div class="v57-phone-mockup" id="phone-sender">
                    <div class="v57-dynamic-island"></div>
                    
                    <div class="v57-phone-statusbar">
                        <span class="v57-phone-time">12:30</span>
                        <div style="display:flex; align-items:center; gap:2.5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M8.5 16.5c3.5-3.5 3.5-3.5 7 0"/><path d="M5 13c7-7 7-7 14 0"/><path d="M1.5 9.5c10.5-10.5 10.5-10.5 21 0"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(90deg); margin-left:-2px;"><rect width="14" height="8" x="3" y="8" rx="1.5" ry="1.5"/><line x1="19" x2="19" y1="10" y2="14"/></svg>
                        </div>
                    </div>

                    <div class="v57-phone-navbar">
                        <span class="v57-phone-navbar-title">Photo Library</span>
                    </div>

                    <div class="v57-phone-screen">
                        <div class="v57-gallery-grid">
                            <div class="v57-gallery-item selected" id="gallery-item-1">
                                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300&auto=format&fit=crop" />
                                <div class="v57-select-badge">✓</div>
                            </div>
                            <div class="v57-gallery-item">
                                <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=300&auto=format&fit=crop" />
                            </div>
                            <div class="v57-gallery-item">
                                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop" />
                            </div>
                            <div class="v57-gallery-item">
                                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop" />
                            </div>
                        </div>

                        <button class="v57-share-btn" id="s-share-btn">Share File</button>

                        <!-- Peer Discovery list overlay on Phone A -->
                        <div class="v57-peer-list" id="s-peer-panel">
                            <div class="v57-radar-circle">
                                <div class="v57-peer-node" id="s-peer-bob-node" style="top: 23px; left: 23px;">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" />
                                </div>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; margin-top:-6px;">
                                <span class="v57-peer-name" id="s-peer-bob-name">Bob's iPhone</span>
                                <span style="font-size:7px; color:rgba(255,255,255,0.4); margin-top:2px;">Tap to AirDrop</span>
                                <!-- Signal Strength Bar Visualizer -->
                                <div class="v57-signal-visualizer" id="s-signal-viz">
                                    <span class="v57-signal-bar bar1"></span>
                                    <span class="v57-signal-bar bar2"></span>
                                    <span class="v57-signal-bar bar3"></span>
                                    <span class="v57-signal-bar bar4"></span>
                                    <span class="v57-signal-bar bar5"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="v57-phone-home-bar"></div>
                </div>

                <!-- PHONE B (Receiver - Right) -->
                <div class="v57-phone-mockup" id="phone-receiver">
                    <div class="v57-dynamic-island"></div>
                    
                    <div class="v57-phone-statusbar">
                        <span class="v57-phone-time">12:30</span>
                        <div style="display:flex; align-items:center; gap:2.5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M8.5 16.5c3.5-3.5 3.5-3.5 7 0"/><path d="M5 13c7-7 7-7 14 0"/><path d="M1.5 9.5c10.5-10.5 10.5-10.5 21 0"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(90deg); margin-left:-2px;"><rect width="14" height="8" x="3" y="8" rx="1.5" ry="1.5"/><line x1="19" x2="19" y1="10" y2="14"/></svg>
                        </div>
                    </div>

                    <div class="v57-phone-navbar">
                        <span class="v57-phone-navbar-title">Home Screen</span>
                    </div>

                    <div class="v57-phone-screen" style="background:#090d16; display:flex; justify-content:center; align-items:center;">
                        <!-- Wallpaper mockup -->
                        <div style="width:100%; height:100%; border-radius:12px; opacity:0.35; background: radial-gradient(circle, #1e3a8a 0%, #020617 100%);"></div>

                        <!-- iOS AirDrop Share Sheet Banner / Modal on Receiver -->
                        <div class="v57-airdrop-banner" id="s-airdrop-banner">
                            <div class="v57-banner-header">
                                <div style="width:14px; height:14px; border-radius:50%; background:var(--air-cyan); display:flex; align-items:center; justify-content:center; overflow:hidden;">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" style="width:100%; height:100%; object-fit:cover;" />
                                </div>
                                <span class="v57-banner-title">AirDrop</span>
                            </div>
                            <div style="display:flex; flex-direction:column; gap:2px; margin-top:2px;">
                                <span style="font-size:8.5px; font-weight:800; color:#fff; line-height:1;">Alice's iPhone</span>
                                <span class="v57-banner-desc">muốn gửi 1 bức ảnh.</span>
                            </div>
                            <div class="v57-banner-actions" style="margin-top:4px;">
                                <button class="v57-banner-btn decline">Từ chối</button>
                                <button class="v57-banner-btn accept">Chấp nhận</button>
                            </div>
                        </div>

                        <!-- Circle Progress Overlay during transfer -->
                        <div class="v57-transfer-overlay" id="s-transfer-overlay">
                            <div class="v57-progress-ring">
                                <svg class="v57-progress-svg">
                                    <circle class="v57-progress-bg" cx="32" cy="32" r="30" />
                                    <circle class="v57-progress-fill" id="s-progress-fill" cx="32" cy="32" r="30" />
                                </svg>
                                <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
                                    <span class="v57-progress-percent" id="s-progress-percent">0%</span>
                                </div>
                            </div>
                            <span style="font-size:8px; font-weight:800; color:#22d3ee; text-transform:uppercase; letter-spacing:0.5px; text-shadow:0 0 8px rgba(6, 182, 212, 0.4);">Đang nhận file...</span>
                        </div>

                        <!-- Received image success display view -->
                        <div class="v57-received-image-view" id="s-received-view">
                            <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300&auto=format&fit=crop" class="v57-received-img" />
                            <span class="v57-success-badge"><i data-lucide="check-circle" style="width:10px; height:10px; display:inline-block; vertical-align:middle; margin-right:3px;"></i> Đã nhận</span>
                        </div>
                    </div>

                    <div class="v57-phone-home-bar"></div>
                </div>
            </div>
        `);
        initIcons();
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const bleLine = canvas.querySelector('#s-ble-line');
        const wifiPipe = canvas.querySelector('#s-wifi-pipe');
        const wifiPipeCore = canvas.querySelector('#s-wifi-pipe-core');
        const shield = canvas.querySelector('#s-handshake-shield');
        const transferCard = canvas.querySelector('#s-transfer-card');
        const peerPanel = canvas.querySelector('#s-peer-panel');
        const bobNode = canvas.querySelector('#s-peer-bob-node');
        const banner = canvas.querySelector('#s-airdrop-banner');
        const overlay = canvas.querySelector('#s-transfer-overlay');
        const progressFill = canvas.querySelector('#s-progress-fill');
        const progressPct = canvas.querySelector('#s-progress-percent');
        const receivedView = canvas.querySelector('#s-received-view');

        const bleRing1 = canvas.querySelector('#s-ble-ring-1');
        const bleRing2 = canvas.querySelector('#s-ble-ring-2');
        const bleRing3 = canvas.querySelector('#s-ble-ring-3');

        // New Visual Elements Selected
        const keyPacket = canvas.querySelector('#s-key-packet');
        const bleBeacon1 = canvas.querySelector('#s-ble-beacon-1');
        const bleBeacon2 = canvas.querySelector('#s-ble-beacon-2');
        const bleBeacon3 = canvas.querySelector('#s-ble-beacon-3');
        const bleBeacon4 = canvas.querySelector('#s-ble-beacon-4');
        const dataPart1 = canvas.querySelector('#s-data-part-1');
        const dataPart2 = canvas.querySelector('#s-data-part-2');
        const dataPart3 = canvas.querySelector('#s-data-part-3');
        const shareBtn = canvas.querySelector('#s-share-btn');

        // Helper to reset all visual states
        const resetStates = () => {
            if (bleLine) bleLine.setAttribute('class', 'v57-ble-wave-line');
            if (wifiPipe) wifiPipe.setAttribute('class', 'v57-wifi-pipe-tunnel');
            if (wifiPipeCore) wifiPipeCore.setAttribute('class', 'v57-wifi-pipe-tunnel-core');
            if (shield) shield.classList.remove('active');
            if (transferCard) {
                transferCard.classList.remove('active');
                transferCard.style.left = '170px';
                transferCard.style.top = '240px';
                transferCard.style.transform = 'translate(-50%, -50%) scale(0.6) rotate(0deg)';
            }
            if (peerPanel) peerPanel.classList.remove('active');
            if (bobNode) bobNode.classList.remove('visible');
            if (banner) banner.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (receivedView) receivedView.classList.remove('active');
            
            if (bleRing1) bleRing1.classList.remove('active');
            if (bleRing2) bleRing2.classList.remove('active');
            if (bleRing3) bleRing3.classList.remove('active');

            // Reset new elements
            if (keyPacket) {
                keyPacket.classList.remove('active');
                keyPacket.style.left = '170px';
                keyPacket.style.top = '240px';
                keyPacket.style.transform = 'translate(-50%, -50%) scale(0.6) rotate(0deg)';
            }
            if (bleBeacon1) bleBeacon1.classList.remove('active');
            if (bleBeacon2) bleBeacon2.classList.remove('active');
            if (bleBeacon3) bleBeacon3.classList.remove('active');
            if (bleBeacon4) bleBeacon4.classList.remove('active');
            if (dataPart1) dataPart1.classList.remove('active');
            if (dataPart2) dataPart2.classList.remove('active');
            if (dataPart3) dataPart3.classList.remove('active');
            if (shareBtn) shareBtn.classList.remove('pressed');

            if (progressFill) progressFill.style.strokeDashoffset = '188.4';
            if (progressPct) progressPct.textContent = '0%';
        };

        resetStates();

        if (slideId === 'slide_airdrop_1') {
            // Slide 1 Hook Sequence: Tap Share -> Radar Scan -> Bob Found -> Accept banner
            if (progress >= 0.12 && progress < 0.20) {
                if (shareBtn) shareBtn.classList.add('pressed');
            }
            else if (progress >= 0.20 && progress < 0.45) {
                if (peerPanel) peerPanel.classList.add('active');
                if (bleRing1) bleRing1.classList.add('active');
                if (bleRing2) bleRing2.classList.add('active');
                if (bleRing3) bleRing3.classList.add('active');
            }
            else if (progress >= 0.45 && progress < 0.75) {
                if (peerPanel) peerPanel.classList.add('active');
                if (bobNode) bobNode.classList.add('visible');
                if (bleLine) bleLine.setAttribute('class', 'v57-ble-wave-line active');
            }
            else if (progress >= 0.75) {
                if (peerPanel) peerPanel.classList.add('active');
                if (bobNode) bobNode.classList.add('visible');
                if (banner) banner.classList.add('active');
                if (bleLine) bleLine.setAttribute('class', 'v57-ble-wave-line active');
            }
        }
        else if (slideId === 'slide_airdrop_2') {
            // Slide 2: BLE Discovery Phase (focus on Bluetooth waves)
            if (peerPanel) peerPanel.classList.add('active');
            if (bobNode) bobNode.classList.add('visible');

            if (bleRing1) bleRing1.classList.add('active');
            if (bleRing2) bleRing2.classList.add('active');
            if (bleRing3) bleRing3.classList.add('active');
            if (bleLine) bleLine.setAttribute('class', 'v57-ble-wave-line active');

            // Emit small Bluetooth beacons
            if (bleBeacon1) bleBeacon1.classList.add('active');
            if (bleBeacon2) bleBeacon2.classList.add('active');
            if (bleBeacon3) bleBeacon3.classList.add('active');
            if (bleBeacon4) bleBeacon4.classList.add('active');

            if (progress > 0.6) {
                if (banner) banner.classList.add('active');
            }
        }
        else if (slideId === 'slide_airdrop_3') {
            // Slide 3: Handshake and local WiFi Link activation
            if (peerPanel) peerPanel.classList.add('active');
            if (bobNode) bobNode.classList.add('visible');

            if (progress <= 0.40) {
                const t = progress / 0.40;
                if (bleLine) bleLine.setAttribute('class', 'v57-ble-wave-line active');
                
                // Animate golden encryption key flying instead of photo card!
                if (keyPacket) {
                    keyPacket.classList.add('active');
                    const pt = getPointOnLine(170, 240, 470, 240, t);
                    keyPacket.style.left = `${pt.x}px`;
                    keyPacket.style.top = `${pt.y}px`;
                    const scale = t < 0.2 ? (t / 0.2) * 1.0 : (t > 0.8 ? ((1 - t) / 0.2) * 1.0 : 1.0);
                    keyPacket.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${t * 360}deg)`;
                }
            }
            else if (progress > 0.40 && progress <= 0.70) {
                if (wifiPipe) wifiPipe.setAttribute('class', 'v57-wifi-pipe-tunnel active');
                if (wifiPipeCore) wifiPipeCore.setAttribute('class', 'v57-wifi-pipe-tunnel-core active');
            }
            else {
                if (wifiPipe) wifiPipe.setAttribute('class', 'v57-wifi-pipe-tunnel active');
                if (wifiPipeCore) wifiPipeCore.setAttribute('class', 'v57-wifi-pipe-tunnel-core active');
                if (shield) shield.classList.add('active');
            }
        }
        else if (slideId === 'slide_airdrop_4') {
            // Slide 4: High-Speed file transfer along the pipe
            if (peerPanel) peerPanel.classList.add('active');
            if (bobNode) bobNode.classList.add('visible');

            if (wifiPipe) wifiPipe.setAttribute('class', 'v57-wifi-pipe-tunnel active');
            if (wifiPipeCore) wifiPipeCore.setAttribute('class', 'v57-wifi-pipe-tunnel-core active');

            if (progress <= 0.70) {
                const t = progress / 0.70;
                if (transferCard) {
                    transferCard.classList.add('active');
                    const pt = getPointOnLine(170, 240, 470, 240, t);
                    transferCard.style.left = `${pt.x}px`;
                    transferCard.style.top = `${pt.y}px`;
                    
                    // High-fidelity ease-scaling & dynamic rotation!
                    const scale = t < 0.25 ? (t / 0.25) * 0.6 : (t > 0.75 ? ((1 - t) / 0.25) * 0.6 : 0.6);
                    const rot = t * 180;
                    transferCard.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
                }

                // Streaming high-speed WiFi data particles
                if (dataPart1) dataPart1.classList.add('active');
                if (dataPart2) dataPart2.classList.add('active');
                if (dataPart3) dataPart3.classList.add('active');

                if (overlay) overlay.classList.add('active');
                const percent = Math.min(100, Math.round(t * 100));
                if (progressPct) progressPct.textContent = `${percent}%`;
                if (progressFill) {
                    const offset = 188.4 - (percent / 100) * 188.4;
                    progressFill.style.strokeDashoffset = offset.toString();
                }
            }
            else {
                if (receivedView) receivedView.classList.add('active');
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video57',
        topic: 'AirDrop P2P',
        episodeNum: 57,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video57 Plugin] Loaded: AirDrop P2P Wireless Transfer slides registered.');
})();
