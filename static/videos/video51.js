/**
 * Video 51: Is Incognito Mode actually private?
 * Plugin file containing interactive animations for browser local storage, DNS queries, firewall logs, server fingerprinting, and VPN tunnels.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_incog_intro: [
            { text: 'tab ẩn danh', start: 2.0, end: 7.0, class: 'active-purple' },
            { text: 'mũ và mắt kính', start: 7.0, end: 12.0, class: 'active-purple' }
        ],
        slide_incog_local: [
            { text: 'lịch sử duyệt web', start: 5.0, end: 10.0, class: 'active-good' },
            { text: 'cookies', start: 10.0, end: 14.0, class: 'active-good' },
            { text: 'không lưu lại', start: 14.0, end: 17.5, class: 'active-good' }
        ],
        slide_incog_dns: [
            { text: 'phân giải tên miền', start: 3.5, end: 8.0, class: 'active-bad' },
            { text: 'nhà mạng', start: 8.0, end: 13.0, class: 'active-bad' }
        ],
        slide_incog_network: [
            { text: 'tường lửa', start: 4.0, end: 9.0, class: 'active-bad' },
            { text: 'IT admin', start: 9.0, end: 15.0, class: 'active-bad' }
        ],
        slide_incog_server: [
            { text: 'địa chỉ IP', start: 3.0, end: 8.0, class: 'active-bad' },
            { text: 'vân tay số', start: 8.0, end: 14.5, class: 'active-gold' }
        ],
        slide_incog_solutions: [
            { text: 'mã hóa', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'VPN', start: 8.0, end: 13.0, class: 'active-good' },
            { text: 'mã hóa DNS', start: 13.0, end: 17.5, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_incog_intro', 'slide_incog_local', 'slide_incog_dns', 
        'slide_incog_network', 'slide_incog_server', 'slide_incog_solutions'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v51-zoom-container">${absHtml}<div class="v51-scene-content">${inner}</div></div>`;
    }

    // Helper: generate mockup of browser tab bar
    function browserTabsHTML(activeTabName) {
        return `
            <div class="v51-browser-tab-bar">
                <div class="v51-browser-tab">
                    <i data-lucide="globe" style="width:8px;height:8px;"></i>
                    <span>Tin tức</span>
                </div>
                <div class="v51-browser-tab active">
                    <i data-lucide="eye-off" style="width:8px;height:8px;color:var(--incog-purple);"></i>
                    <span>${activeTabName}</span>
                </div>
            </div>
        `;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_incog_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-spy-badge-container">
                    <svg class="v51-spy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 10h20M12 2v8M6 10c0 3.31 2.69 6 6 6s6-2.69 6-6M3 10a9 9 0 0 1 18 0M10 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM14 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                </div>
                <div class="v51-glass-card glow-purple v50-status-card v51-status-card">
                    <span class="v51-status-badge purple"><i data-lucide="eye-off" style="width:12px;height:12px;"></i> INCOGNITO ACTIVATED</span>
                    <span style="color:#fff;" id="v51-intro-status">Chế độ ẩn danh: Bảo mật hay chỉ là một chiếc mặt nạ che mắt?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_local') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:70px; height: 160px; position:relative;">
                    <!-- Laptop screen simulating browser -->
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v51-laptop-mock">
                            <div class="v51-laptop-screen">
                                ${browserTabsHTML('Ẩn danh')}
                                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;">
                                    <i data-lucide="eye-off" style="width:20px;height:20px;color:var(--incog-purple);"></i>
                                    <span style="font-size:7px; color:var(--incog-text-muted);">Tab ẩn danh đang mở</span>
                                </div>
                            </div>
                        </div>
                        <div class="v51-laptop-base"></div>
                    </div>

                    <!-- Trash can on the right -->
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; margin-top:20px;">
                        <div class="v51-trash-can" id="v51-trash-bin">
                            <div class="v51-trash-lid"></div>
                            <i data-lucide="trash-2" style="width:20px;height:20px;"></i>
                        </div>
                        <span style="font-size:9px; color:var(--incog-text-muted); font-weight:bold; margin-top:6px;">Auto-Delete</span>
                    </div>

                    <!-- Floating Data Chips that will fall into trash -->
                    <div class="v51-data-chip" id="v51-chip-history" style="top:15px; left:40px;">
                        <i data-lucide="history" style="width:10px;height:10px;color:var(--incog-purple);"></i> duyệt web
                    </div>
                    <div class="v51-data-chip" id="v51-chip-cookies" style="top:55px; left:25px;">
                        <i data-lucide="cookie" style="width:10px;height:10px;color:var(--incog-purple);"></i> cookies
                    </div>
                    <div class="v51-data-chip" id="v51-chip-autofill" style="top:95px; left:45px;">
                        <i data-lucide="file-text" style="width:10px;height:10px;color:var(--incog-purple);"></i> biểu mẫu
                    </div>
                </div>

                <div class="v51-glass-card glow-green v50-status-card v51-status-card">
                    <span class="v51-status-badge green"><i data-lucide="database" style="width:12px;height:12px;"></i> LOCAL BROWSER CLEANUP</span>
                    <span style="color:#fff;" id="v51-local-status">Dữ liệu lướt web cục bộ sẽ lập tức biến mất khi đóng Tab.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_dns') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:15px; height: 160px;">
                    <div class="v51-node active-user" id="v51-dns-node-user">
                        <i data-lucide="laptop" style="color:var(--incog-cyan);"></i>
                        <span>Client</span>
                    </div>
                    <div class="v51-network-wire pulse-cyan" id="v51-dns-wire-1"></div>
                    <div class="v51-node active-red" id="v51-dns-node-isp">
                        <i data-lucide="router" style="color:var(--incog-red);"></i>
                        <span>ISP (Nhà mạng)</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-dns-wire-2"></div>
                    <div class="v51-node active-red" id="v51-dns-node-dns">
                        <i data-lucide="server" style="color:var(--incog-red);"></i>
                        <span>DNS Server</span>
                    </div>

                    <!-- DNS Log viewer -->
                    <div class="v51-log-terminal">
                        <div style="font-size:7px; color:var(--incog-red); font-weight:bold; border-bottom:1px solid rgba(239,68,68,0.2); padding-bottom:2px; margin-bottom:4px;">ISP DNS QUERIES LOG</div>
                        <div class="v51-log-line" id="v51-dns-log-0">> Request IP for google.com</div>
                        <div class="v51-log-line" id="v51-dns-log-1">> Request IP for github.com</div>
                        <div class="v51-log-line" id="v51-dns-log-2">> Request IP for facebook.com</div>
                        <div class="v51-log-line" id="v51-dns-log-3">> Request IP for secret-web.com</div>
                    </div>
                </div>

                <div class="v51-glass-card glow-red v50-status-card v51-status-card">
                    <span class="v51-status-badge red"><i data-lucide="shield-alert" style="width:12px;height:12px;"></i> DNS LEAK DETECTED</span>
                    <span style="color:var(--incog-red);" id="v51-dns-status">Nhà mạng vẫn nhìn thấy mọi yêu cầu truy vấn tên miền của bạn.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_network') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:15px; height: 160px;">
                    <div class="v51-node active-user" id="v51-net-node-user">
                        <i data-lucide="laptop" style="color:var(--incog-cyan);"></i>
                        <span>Client</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-net-wire-1"></div>
                    <div class="v51-node active-red" id="v51-net-node-firewall">
                        <i data-lucide="shield-alert" style="color:var(--incog-red);"></i>
                        <span>Firewall</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-net-wire-2"></div>
                    <div class="v51-node active-red" id="v51-net-node-web">
                        <i data-lucide="globe" style="color:var(--incog-red);"></i>
                        <span>Website</span>
                    </div>

                    <!-- Firewall log monitor -->
                    <div class="v51-log-terminal">
                        <div style="font-size:7px; color:var(--incog-red); font-weight:bold; border-bottom:1px solid rgba(239,68,68,0.2); padding-bottom:2px; margin-bottom:4px;">COMPANY FIREWALL LOG</div>
                        <div class="v51-log-line" id="v51-net-log-0">[10.0.2.14] GET /jira</div>
                        <div class="v51-net-log-1 v51-log-line">[10.0.2.14] GET /slack</div>
                        <div class="v51-net-log-2 v51-log-line">[10.0.2.14] GET /youtube.com</div>
                        <div class="v51-net-log-3 v51-log-line">[10.0.2.14] GET /game-portal.com</div>
                    </div>
                </div>

                <div class="v51-glass-card glow-red v50-status-card v51-status-card">
                    <span class="v51-status-badge red"><i data-lucide="alert-octagon" style="width:12px;height:12px;"></i> MONITORED CONNECTION</span>
                    <span style="color:var(--incog-red);" id="v51-network-status">Tường lửa công ty ghi nhận tất cả URL đi qua router Wi-Fi.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_server') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:50px; height: 160px;">
                    <!-- User Browser specs -->
                    <div class="v51-laptop-mock" style="width:170px; height:120px;">
                        <div class="v51-laptop-screen">
                            ${browserTabsHTML('Dịch vụ')}
                            <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; font-family:sans-serif;">
                                <i data-lucide="user-check" style="width:16px;height:16px;color:var(--incog-cyan);"></i>
                                <span style="font-size:8px; color:#fff; font-weight:bold;">Đang truy cập Web</span>
                            </div>
                        </div>
                    </div>

                    <!-- Server profile collector -->
                    <div class="v51-server-panel">
                        <div style="font-size:7px; color:var(--incog-purple); font-weight:bold; border-bottom:1px solid rgba(168,85,247,0.2); padding-bottom:2px; margin-bottom:4px; text-align:left;">WEB SERVER RECEIVED DATA</div>
                        <div class="v51-panel-item">IP: <span class="highlight red" id="v51-srv-ip">Ẩn danh?</span></div>
                        <div class="v51-panel-item">Agent: <span class="highlight red" id="v51-srv-agent">Chrome</span></div>
                        <div class="v51-panel-item">Screen: <span class="highlight" id="v51-srv-res">1920x1080</span></div>
                        <div class="v51-panel-item">GPU: <span class="highlight" id="v51-srv-gpu">RTX 4070</span></div>
                        <div class="v51-panel-item">Fingerprint: <span class="highlight purple" id="v51-srv-hash">hash_8f2e9b01</span></div>
                    </div>
                </div>

                <div class="v51-glass-card glow-purple v50-status-card v51-status-card">
                    <span class="v51-status-badge purple"><i data-lucide="fingerprint" style="width:12px;height:12px;"></i> SERVER IDENTIFICATION</span>
                    <span style="color:#fff;" id="v51-server-status">Website đích vẫn thấy địa chỉ IP thực tế và nhận diện qua vân tay số.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_solutions') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:15px; height: 160px; position:relative;">
                    <div class="v51-node active-user" id="v51-sol-node-user">
                        <i data-lucide="laptop" style="color:var(--incog-cyan);"></i>
                        <span>Client</span>
                    </div>
                    <div class="v51-network-wire pulse-purple" id="v51-sol-wire-1"></div>
                    <div class="v51-node active-purple" id="v51-sol-node-vpn">
                        <i data-lucide="lock" style="color:var(--incog-purple);"></i>
                        <span>VPN Server</span>
                    </div>
                    <div class="v51-network-wire pulse-cyan" id="v51-sol-wire-2"></div>
                    <div class="v51-node active-green" id="v51-sol-node-dns">
                        <i data-lucide="server" style="color:var(--incog-green);"></i>
                        <span>Secure DNS</span>
                    </div>

                    <!-- Lock tunnel background -->
                    <div class="v51-vpn-tunnel"></div>

                    <!-- Secure Log monitor -->
                    <div class="v51-log-terminal" style="border-color:rgba(16,185,129,0.3);">
                        <div style="font-size:7px; color:var(--incog-green); font-weight:bold; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:2px; margin-bottom:4px;">ISP PACKET SNIFFER</div>
                        <div class="v51-log-line secure" id="v51-sol-log-0">> [ENCRYPTED DATA]</div>
                        <div class="v51-log-line secure" id="v51-sol-log-1">> [ENCRYPTED DATA]</div>
                        <div class="v51-log-line secure" id="v51-sol-log-2">> [ENCRYPTED DATA]</div>
                        <div class="v51-log-line secure" id="v51-sol-log-3">> [ENCRYPTED DATA]</div>
                    </div>
                </div>

                <div class="v51-glass-card glow-green v50-status-card v51-status-card">
                    <span class="v51-status-badge green"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> ENCRYPTED PRIVACY</span>
                    <span style="color:#fff;" id="v51-solutions-status">Mã hóa VPN và DNS giúp ẩn mình hoàn toàn trước nhà mạng và tường lửa.</span>
                </div>
            `);
            initIcons();
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_incog_local') {
            const trashBin = canvas.querySelector('#v51-trash-bin');
            const chipHistory = canvas.querySelector('#v51-chip-history');
            const chipCookies = canvas.querySelector('#v51-chip-cookies');
            const chipAutofill = canvas.querySelector('#v51-chip-autofill');

            // Timeline phase mapping
            // Progress 0.0 - 0.2: chips float near laptop
            // Progress 0.2 - 0.7: chips fall into trash bin
            // Progress 0.7 - 1.0: chips disappear, trash bin glows green/purple

            if (progress < 0.2) {
                if (chipHistory) { chipHistory.style.transform = 'translate(0, 0)'; chipHistory.style.opacity = 1; }
                if (chipCookies) { chipCookies.style.transform = 'translate(0, 0)'; chipCookies.style.opacity = 1; }
                if (chipAutofill) { chipAutofill.style.transform = 'translate(0, 0)'; chipAutofill.style.opacity = 1; }
                if (trashBin) trashBin.classList.remove('glow');
            }
            else if (progress >= 0.2 && progress <= 0.75) {
                const normVal = (progress - 0.2) / 0.55; // 0 to 1
                
                // Trash bin position is approx (x: 210, y: 50) relative to start
                if (chipHistory) {
                    chipHistory.style.transform = `translate(${normVal * 150}px, ${normVal * 35}px) scale(${1 - normVal * 0.4})`;
                    chipHistory.style.opacity = 1 - normVal;
                }
                if (chipCookies) {
                    chipCookies.style.transform = `translate(${normVal * 165}px, ${normVal * 0}px) scale(${1 - normVal * 0.4})`;
                    chipCookies.style.opacity = 1 - normVal;
                }
                if (chipAutofill) {
                    chipAutofill.style.transform = `translate(${normVal * 145}px, ${-normVal * 35}px) scale(${1 - normVal * 0.4})`;
                    chipAutofill.style.opacity = 1 - normVal;
                }
                if (trashBin) {
                    trashBin.classList.add('glow');
                }
            }
            else {
                if (chipHistory) { chipHistory.style.opacity = 0; }
                if (chipCookies) { chipCookies.style.opacity = 0; }
                if (chipAutofill) { chipAutofill.style.opacity = 0; }
                if (trashBin) trashBin.classList.add('glow');
            }
        }
        else if (slideId === 'slide_incog_dns') {
            const userNode = canvas.querySelector('#v51-dns-node-user');
            const ispNode = canvas.querySelector('#v51-dns-node-isp');
            const dnsNode = canvas.querySelector('#v51-dns-node-dns');
            const wire1 = canvas.querySelector('#v51-dns-wire-1');
            const wire2 = canvas.querySelector('#v51-dns-wire-2');
            
            // Activate nodes sequentially
            if (userNode) userNode.classList.toggle('active-user', progress > 0.05);
            if (wire1) wire1.style.opacity = progress > 0.15 ? '1' : '0.2';
            if (ispNode) ispNode.classList.toggle('active-red', progress > 0.3);
            if (wire2) wire2.style.opacity = progress > 0.45 ? '1' : '0.2';
            if (dnsNode) dnsNode.classList.toggle('active-red', progress > 0.6);

            // Activate terminal log lines based on timeline progress
            const log0 = canvas.querySelector('#v51-dns-log-0');
            const log1 = canvas.querySelector('#v51-dns-log-1');
            const log2 = canvas.querySelector('#v51-dns-log-2');
            const log3 = canvas.querySelector('#v51-dns-log-3');
            const status = canvas.querySelector('#v51-dns-status');

            if (log0) log0.classList.toggle('active', progress >= 0.1);
            if (log1) log1.classList.toggle('active', progress >= 0.25);
            if (log2) log2.classList.toggle('active', progress >= 0.45);
            if (log3) {
                log3.classList.toggle('active', progress >= 0.65);
                if (progress >= 0.65) {
                    log3.innerHTML = '> Request IP for secret-web.com <span style="color:var(--incog-red); font-weight:bold;">[LEAKED!]</span>';
                    if (status) {
                        status.textContent = 'Nhà mạng vẫn nhìn thấy và lưu trữ tất cả tên miền bạn vừa truy vấn!';
                        status.style.color = 'var(--incog-red)';
                    }
                } else {
                    log3.innerHTML = '> Request IP for secret-web.com';
                    if (status) {
                        status.textContent = 'Nhà mạng vẫn nhìn thấy mọi yêu cầu truy vấn tên miền của bạn.';
                        status.style.color = 'var(--incog-red)';
                    }
                }
            }
        }
        else if (slideId === 'slide_incog_network') {
            const userNode = canvas.querySelector('#v51-net-node-user');
            const firewallNode = canvas.querySelector('#v51-net-node-firewall');
            const webNode = canvas.querySelector('#v51-net-node-web');
            const wire1 = canvas.querySelector('#v51-net-wire-1');
            const wire2 = canvas.querySelector('#v51-net-wire-2');

            if (userNode) userNode.classList.toggle('active-user', progress > 0.05);
            if (wire1) wire1.style.opacity = progress > 0.15 ? '1' : '0.2';
            if (firewallNode) firewallNode.classList.toggle('active-red', progress > 0.35);
            if (wire2) wire2.style.opacity = progress > 0.5 ? '1' : '0.2';
            if (webNode) webNode.classList.toggle('active-red', progress > 0.65);

            // Log entries
            const log0 = canvas.querySelector('#v51-net-log-0');
            const log1 = canvas.querySelector('#v51-net-log-1');
            const log2 = canvas.querySelector('#v51-net-log-2');
            const log3 = canvas.querySelector('#v51-net-log-3');
            const status = canvas.querySelector('#v51-network-status');

            if (log0) log0.classList.toggle('active', progress >= 0.1);
            if (log1) log1.classList.toggle('active', progress >= 0.3);
            if (log2) log2.classList.toggle('active', progress >= 0.5);
            if (log3) {
                log3.classList.toggle('active', progress >= 0.7);
                if (progress >= 0.7) {
                    log3.innerHTML = '[10.0.2.14] GET /game-portal.com <span style="color:var(--incog-red);">⚠️ ALERT</span>';
                    if (status) {
                        status.textContent = 'Mạng nội bộ và Firewall ghi lại chính xác lịch sử lướt web thời gian thực.';
                        status.style.color = 'var(--incog-red)';
                    }
                } else {
                    log3.innerHTML = '[10.0.2.14] GET /game-portal.com';
                    if (status) {
                        status.textContent = 'Tường lửa công ty ghi nhận tất cả URL đi qua router Wi-Fi.';
                        status.style.color = 'var(--incog-red)';
                    }
                }
            }
        }
        else if (slideId === 'slide_incog_server') {
            const ipVal = canvas.querySelector('#v51-srv-ip');
            const agentVal = canvas.querySelector('#v51-srv-agent');
            const hashVal = canvas.querySelector('#v51-srv-hash');
            const status = canvas.querySelector('#v51-server-status');

            if (ipVal) {
                if (progress >= 0.25) {
                    ipVal.textContent = '14.232.80.12';
                    ipVal.className = 'highlight red';
                } else {
                    ipVal.textContent = 'Ẩn danh?';
                    ipVal.className = 'highlight';
                }
            }
            if (agentVal) {
                if (progress >= 0.45) {
                    agentVal.textContent = 'Chrome 124 (OS)';
                    agentVal.className = 'highlight red';
                } else {
                    agentVal.textContent = 'Chrome';
                    agentVal.className = 'highlight';
                }
            }
            if (hashVal) {
                if (progress >= 0.7) {
                    hashVal.className = 'highlight red';
                    hashVal.style.textShadow = '0 0 8px rgba(239, 68, 68, 0.6)';
                    if (status) {
                        status.textContent = 'Website đích vẫn nhận diện chính xác danh tính thiết bị của bạn qua Fingerprint.';
                        status.style.color = 'var(--incog-red)';
                    }
                } else {
                    hashVal.className = 'highlight purple';
                    hashVal.style.textShadow = '';
                    if (status) {
                        status.textContent = 'Website đích vẫn thấy địa chỉ IP thực tế và nhận diện qua vân tay số.';
                        status.style.color = '#fff';
                    }
                }
            }
        }
        else if (slideId === 'slide_incog_solutions') {
            const userNode = canvas.querySelector('#v51-sol-node-user');
            const vpnNode = canvas.querySelector('#v51-sol-node-vpn');
            const dnsNode = canvas.querySelector('#v51-sol-node-dns');
            const wire1 = canvas.querySelector('#v51-sol-wire-1');
            const wire2 = canvas.querySelector('#v51-sol-wire-2');

            if (userNode) userNode.classList.toggle('active-user', progress > 0.05);
            if (wire1) wire1.style.opacity = progress > 0.15 ? '1' : '0.2';
            if (vpnNode) vpnNode.classList.toggle('active-purple', progress > 0.35);
            if (wire2) wire2.style.opacity = progress > 0.5 ? '1' : '0.2';
            if (dnsNode) dnsNode.classList.toggle('active-green', progress > 0.65);

            // Log entries showing green encryption success
            const log0 = canvas.querySelector('#v51-sol-log-0');
            const log1 = canvas.querySelector('#v51-sol-log-1');
            const log2 = canvas.querySelector('#v51-sol-log-2');
            const log3 = canvas.querySelector('#v51-sol-log-3');

            if (log0) log0.classList.toggle('active', progress >= 0.15);
            if (log1) log1.classList.toggle('active', progress >= 0.35);
            if (log2) log2.classList.toggle('active', progress >= 0.55);
            if (log3) log3.classList.toggle('active', progress >= 0.75);
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video51',
        topic: 'Incognito Mode',
        episodeNum: 51,
        customSlideIds,
        keywordsData,
        renderGfx,
        updateFrame
    };

    console.log('[Video51 Plugin] Loaded: Is Incognito Mode actually private slides loaded.');
})();
