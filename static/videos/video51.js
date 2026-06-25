/**
 * Video 51: Is Incognito Mode actually private?
 * Plugin file containing interactive animations for browser local storage, DNS queries, firewall logs, server fingerprinting, and VPN tunnels.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_incog_1a: [
            { text: 'tab ẩn danh', start: 1.0, end: 5.5, class: 'active-purple' },
            { text: 'mũ và mắt kính', start: 5.5, end: 8.5, class: 'active-purple' }
        ],
        slide_incog_1b: [
            { text: 'bảo mật', start: 1.0, end: 5.0, class: 'active-purple' },
            { text: 'sự thật', start: 5.0, end: 8.0, class: 'active-bad' }
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
        'slide_incog_1a', 'slide_incog_1b', 'slide_incog_local', 'slide_incog_dns', 
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

        if (slideId === 'slide_incog_1a') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-avatar-intro-container">
                    <div class="v51-avatar-glow-ring"></div>
                    <div class="v51-avatar-glow-ring inner"></div>
                    <div class="v51-giant-avatar">
                        <div class="v51-spy-icon-wrapper">
                            <svg class="v51-spy-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 10h20M12 2v8M6 10c0 3.31 2.69 6 6 6s6-2.69 6-6M3 10a9 9 0 0 1 18 0M10 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM14 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                            </svg>
                        </div>
                        <div class="v51-avatar-purple-dot"></div>
                    </div>
                </div>
                <div class="v51-glass-card glow-purple v50-status-card v51-status-card" style="text-align: center; width: 440px;">
                    <span class="v51-status-badge purple"><i data-lucide="eye-off" style="width:12px;height:12px;"></i> INCOGNITO ACTIVATED</span>
                    <span style="color:#fff; font-size:15px; font-weight:bold; line-height:1.45; text-align:center; font-family:'Fira Code', monospace; display:block; margin-top:4px;">Chế độ ẩn danh có thực sự bảo mật tuyệt đối?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_1b') {
            canvas.innerHTML = sceneWrap(`
                <div style="display:flex; justify-content:center; align-items:center; height:290px; margin-bottom:-10px;">
                    <!-- Chrome Incognito Mobile Landing Mockup -->
                    <div class="v51-phone-mock">
                        <div class="v51-phone-notch"></div>
                        <div class="v51-phone-status-bar">
                            <span>09:41</span>
                            <div class="right-icons">
                                <i data-lucide="wifi" style="width:8px;height:8px;"></i>
                                <i data-lucide="battery" style="width:10px;height:10px;"></i>
                            </div>
                        </div>
                        <div class="v51-phone-screen">
                            <div style="display:flex; justify-content:center; align-items:center; flex-direction:column; gap:6px; margin-top:20px; margin-bottom:25px;">
                                <svg class="v51-spy-svg" style="width:52px; height:52px; color:var(--incog-purple);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2 10h20M12 2v8M6 10c0 3.31 2.69 6 6 6s6-2.69 6-6M3 10a9 9 0 0 1 18 0M10 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM14 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                                </svg>
                                <span style="font-size:14px; font-weight:800; color:#fff; font-family:sans-serif;">Ẩn danh</span>
                            </div>
                            <div style="text-align:left; font-family:sans-serif; font-size:11.5px; color:var(--incog-text-muted); display:flex; flex-direction:column; gap:12px; padding:0 10px;">
                                <span style="font-size:12.5px; color:#fff; font-weight:bold;">Trình duyệt sẽ không lưu:</span>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="check" style="width:13px; height:13px; color:var(--incog-purple); stroke-width:3;"></i>
                                    <span>Lịch sử duyệt web</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="check" style="width:13px; height:13px; color:var(--incog-purple); stroke-width:3;"></i>
                                    <span>Cookies phiên làm việc</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="check" style="width:13px; height:13px; color:var(--incog-purple); stroke-width:3;"></i>
                                    <span>Thông tin biểu mẫu đã nhập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="v51-glass-card glow-purple v50-status-card v51-status-card">
                    <span class="v51-status-badge purple"><i data-lucide="help-circle" style="width:12px;height:12px;"></i> INCOGNITO ASSURANCE</span>
                    <span style="color:#fff;" id="v51-assurance-status">Liệu tất cả hành vi của bạn có thực sự được bảo mật như bạn nghĩ?</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_incog_local') {
            canvas.innerHTML = sceneWrap(`
                <div class="v51-scene-row" style="gap:90px; height: 180px; position:relative; align-items: center;">
                    <!-- Laptop screen simulating browser -->
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v51-laptop-mock">
                            <div class="v51-laptop-screen">
                                ${browserTabsHTML('Ẩn danh')}
                                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">
                                    <i data-lucide="eye-off" style="width:44px;height:44px;color:var(--incog-purple);"></i>
                                    <span style="font-size:15px; color:var(--incog-text-muted); font-weight:500;">Tab ẩn danh đang mở</span>
                                </div>
                            </div>
                        </div>
                        <div class="v51-laptop-base"></div>
                    </div>

                    <!-- Trash can on the right -->
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; margin-top:20px;">
                        <div class="v51-trash-can" id="v51-trash-bin">
                            <div class="v51-trash-lid"></div>
                            <i data-lucide="trash-2" style="width:32px;height:32px;"></i>
                        </div>
                        <span style="font-size:11px; color:var(--incog-text-muted); font-weight:bold; margin-top:8px;">Auto-Delete</span>
                    </div>

                    <!-- Floating Data Chips that will fall into trash -->
                    <div class="v51-data-chip" id="v51-chip-history" style="top:25px; left:40px;">
                        <i data-lucide="history" style="width:12px;height:12px;color:var(--incog-purple);"></i> duyệt web
                    </div>
                    <div class="v51-data-chip" id="v51-chip-cookies" style="top:75px; left:25px;">
                        <i data-lucide="cookie" style="width:12px;height:12px;color:var(--incog-purple);"></i> cookies
                    </div>
                    <div class="v51-data-chip" id="v51-chip-autofill" style="top:125px; left:45px;">
                        <i data-lucide="file-text" style="width:12px;height:12px;color:var(--incog-purple);"></i> biểu mẫu
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
                <div class="v51-scene-row" style="gap:15px; height: 160px; position:relative;">
                    <div class="v51-node active-user" id="v51-dns-node-user">
                        <i data-lucide="laptop" style="color:var(--incog-cyan);"></i>
                        <span>Client</span>
                    </div>
                    <div class="v51-network-wire pulse-cyan" id="v51-dns-wire-1"></div>
                    <div class="v51-node" id="v51-dns-node-isp">
                        <i data-lucide="router" style="color:var(--incog-red);"></i>
                        <span style="font-size:7px;">ISP (Nhà mạng)</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-dns-wire-2"></div>
                    <div class="v51-node" id="v51-dns-node-dns">
                        <i data-lucide="server" style="color:var(--incog-red);"></i>
                        <span>DNS Server</span>
                    </div>

                    <!-- Flying packet -->
                    <div class="v51-packet-dot" id="v51-dns-packet">dns: secret-web.com</div>

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
                <div class="v51-scene-row" style="gap:15px; height: 160px; position:relative;">
                    <div class="v51-node active-user" id="v51-net-node-user">
                        <i data-lucide="laptop" style="color:var(--incog-cyan);"></i>
                        <span>Client</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-net-wire-1"></div>
                    <div class="v51-node" id="v51-net-node-firewall">
                        <div class="v51-laser-scanner" id="v51-net-laser"></div>
                        <i data-lucide="shield-alert" style="color:var(--incog-red);"></i>
                        <span>Firewall</span>
                    </div>
                    <div class="v51-network-wire pulse-red" id="v51-net-wire-2"></div>
                    <div class="v51-node" id="v51-net-node-web">
                        <i data-lucide="globe" style="color:var(--incog-red);"></i>
                        <span>Website</span>
                    </div>

                    <!-- Flying packet -->
                    <div class="v51-packet-dot red" id="v51-net-packet">http: secret-web.com</div>

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
                <div class="v51-scene-row" style="gap:65px; height: 160px; position:relative;">
                    <!-- User Browser specs -->
                    <div class="v51-laptop-mock" style="width:250px; height:165px;">
                        <div class="v51-laptop-screen">
                            <div class="v51-laser-scanner" id="v51-srv-laser"></div>
                            ${browserTabsHTML('Dịch vụ')}
                            <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; font-family:sans-serif;">
                                <i data-lucide="user-check" style="width:28px;height:28px;color:var(--incog-cyan);"></i>
                                <span style="font-size:11.5px; color:#fff; font-weight:bold;">Đang truy cập Web</span>
                            </div>
                        </div>
                    </div>

                    <!-- Floating fingerprint data dots -->
                    <div class="v51-fingerprint-particle" id="v51-srv-pt-1"></div>
                    <div class="v51-fingerprint-particle" id="v51-srv-pt-2"></div>
                    <div class="v51-fingerprint-particle" id="v51-srv-pt-3"></div>

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
                    <div class="v51-node" id="v51-sol-node-vpn">
                        <i data-lucide="lock" style="color:var(--incog-purple);"></i>
                        <span>VPN Server</span>
                    </div>
                    <div class="v51-network-wire pulse-cyan" id="v51-sol-wire-2"></div>
                    <div class="v51-node" id="v51-sol-node-dns">
                        <i data-lucide="server" style="color:var(--incog-green);"></i>
                        <span>Secure DNS</span>
                    </div>

                    <!-- Lock tunnel background -->
                    <div class="v51-vpn-tunnel"></div>

                    <!-- Secure packet -->
                    <div class="v51-packet-dot encrypted" id="v51-sol-packet"><i data-lucide="lock" style="width:10px;height:10px;margin-right:3px;display:inline-block;vertical-align:middle;"></i>[AES]</div>

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

            // Staggered flight progress calculations
            const getChipProgress = (start, end) => {
                if (progress < start) return 0;
                if (progress > end) return 1;
                return (progress - start) / (end - start);
            };

            const pHist = getChipProgress(0.2, 0.45);
            const pCook = getChipProgress(0.35, 0.6);
            const pAuto = getChipProgress(0.5, 0.75);

            // History Chip (parabolic path)
            if (chipHistory) {
                if (pHist > 0 && pHist < 1) {
                    const archY = -Math.sin(pHist * Math.PI) * 45;
                    chipHistory.style.transform = `translate(${pHist * 295}px, ${pHist * 50 + archY}px) scale(${1 - pHist * 0.4})`;
                    chipHistory.style.opacity = 1 - pHist * 0.5;
                } else if (pHist >= 1) {
                    chipHistory.style.opacity = 0;
                } else {
                    chipHistory.style.transform = 'translate(0, 0)';
                    chipHistory.style.opacity = 1;
                }
            }

            // Cookies Chip (parabolic path)
            if (chipCookies) {
                if (pCook > 0 && pCook < 1) {
                    const archY = -Math.sin(pCook * Math.PI) * 45;
                    chipCookies.style.transform = `translate(${pCook * 310}px, ${pCook * 5 + archY}px) scale(${1 - pCook * 0.4})`;
                    chipCookies.style.opacity = 1 - pCook * 0.5;
                } else if (pCook >= 1) {
                    chipCookies.style.opacity = 0;
                } else {
                    chipCookies.style.transform = 'translate(0, 0)';
                    chipCookies.style.opacity = 1;
                }
            }

            // Autofill Chip (parabolic path)
            if (chipAutofill) {
                if (pAuto > 0 && pAuto < 1) {
                    const archY = -Math.sin(pAuto * Math.PI) * 45;
                    chipAutofill.style.transform = `translate(${pAuto * 290}px, ${-pAuto * 40 + archY}px) scale(${1 - pAuto * 0.4})`;
                    chipAutofill.style.opacity = 1 - pAuto * 0.5;
                } else if (pAuto >= 1) {
                    chipAutofill.style.opacity = 0;
                } else {
                    chipAutofill.style.transform = 'translate(0, 0)';
                    chipAutofill.style.opacity = 1;
                }
            }

            // Rumble/Flash Trash can when hits occur
            if (trashBin) {
                const isRumbling = (pHist > 0.85 && pHist < 1.0) || (pCook > 0.85 && pCook < 1.0) || (pAuto > 0.85 && pAuto < 1.0);
                trashBin.classList.toggle('rumble', isRumbling);
                trashBin.classList.toggle('glow', progress >= 0.2);
            }
        }
        else if (slideId === 'slide_incog_dns') {
            const userNode = canvas.querySelector('#v51-dns-node-user');
            const ispNode = canvas.querySelector('#v51-dns-node-isp');
            const dnsNode = canvas.querySelector('#v51-dns-node-dns');
            const wire1 = canvas.querySelector('#v51-dns-wire-1');
            const wire2 = canvas.querySelector('#v51-dns-wire-2');
            const dnsPacket = canvas.querySelector('#v51-dns-packet');

            // Packet flight logic
            if (dnsPacket) {
                if (progress >= 0.1 && progress < 0.3) {
                    const norm = (progress - 0.1) / 0.2;
                    dnsPacket.style.opacity = 1;
                    dnsPacket.style.left = `${10 + norm * 35}%`;
                    dnsPacket.style.top = '40%';
                } else if (progress >= 0.3 && progress < 0.45) {
                    dnsPacket.style.opacity = 1;
                    dnsPacket.style.left = '45%';
                    dnsPacket.style.top = '40%';
                } else if (progress >= 0.45 && progress < 0.65) {
                    const norm = (progress - 0.45) / 0.2;
                    dnsPacket.style.opacity = 1;
                    dnsPacket.style.left = `${45 + norm * 37}%`;
                    dnsPacket.style.top = '40%';
                } else {
                    dnsPacket.style.opacity = 0;
                }
            }

            // Node states
            if (userNode) userNode.classList.toggle('active-user', progress > 0.05);
            if (wire1) wire1.style.opacity = progress > 0.15 ? '1' : '0.2';
            if (ispNode) ispNode.classList.toggle('active-red', progress > 0.3);
            if (wire2) wire2.style.opacity = progress > 0.45 ? '1' : '0.2';
            if (dnsNode) dnsNode.classList.toggle('active-red', progress > 0.6);

            // Log entries
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
            const netPacket = canvas.querySelector('#v51-net-packet');
            const netLaser = canvas.querySelector('#v51-net-laser');

            // Packet flight
            if (netPacket) {
                if (progress >= 0.1 && progress < 0.35) {
                    const norm = (progress - 0.1) / 0.25;
                    netPacket.style.opacity = 1;
                    netPacket.style.left = `${10 + norm * 35}%`;
                    netPacket.style.top = '40%';
                } else if (progress >= 0.35 && progress < 0.5) {
                    netPacket.style.opacity = 1;
                    netPacket.style.left = '45%';
                    netPacket.style.top = '40%';
                } else if (progress >= 0.5 && progress < 0.7) {
                    const norm = (progress - 0.5) / 0.2;
                    netPacket.style.opacity = 1;
                    netPacket.style.left = `${45 + norm * 37}%`;
                    netPacket.style.top = '40%';
                } else {
                    netPacket.style.opacity = 0;
                }
            }

            // Firewall scanning sweep
            if (netLaser) {
                if (progress >= 0.35 && progress < 0.5) {
                    netLaser.style.opacity = 1;
                    const sweep = Math.sin((progress - 0.35) / 0.15 * Math.PI * 2) * 25 + 25;
                    netLaser.style.top = `${sweep}px`;
                } else {
                    netLaser.style.opacity = 0;
                }
            }

            // Node states
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
            const srvLaser = canvas.querySelector('#v51-srv-laser');
            const p1 = canvas.querySelector('#v51-srv-pt-1');
            const p2 = canvas.querySelector('#v51-srv-pt-2');
            const p3 = canvas.querySelector('#v51-srv-pt-3');

            const srvIp = canvas.querySelector('#v51-srv-ip');
            const srvAgent = canvas.querySelector('#v51-srv-agent');
            const srvRes = canvas.querySelector('#v51-srv-res');
            const srvGpu = canvas.querySelector('#v51-srv-gpu');
            const srvHash = canvas.querySelector('#v51-srv-hash');
            const status = canvas.querySelector('#v51-server-status');

            // Laptop laser scan sweep
            if (srvLaser) {
                if (progress >= 0.1 && progress < 0.8) {
                    srvLaser.style.opacity = 1;
                    const sweep = Math.sin(progress * Math.PI * 4) * 45 + 45;
                    srvLaser.style.top = `${sweep}px`;
                } else {
                    srvLaser.style.opacity = 0;
                }
            }

            // Fingerprint particle emitter
            const animateParticle = (el, start, end, yOffset) => {
                if (!el) return;
                if (progress >= start && progress < end) {
                    const norm = (progress - start) / (end - start);
                    el.style.opacity = 1;
                    el.style.left = `${30 + norm * 35}%`;
                    el.style.top = `${35 + Math.sin(norm * Math.PI) * yOffset}px`;
                } else {
                    el.style.opacity = 0;
                }
            };

            animateParticle(p1, 0.2, 0.45, -25);
            animateParticle(p2, 0.4, 0.65, 25);
            animateParticle(p3, 0.55, 0.8, -15);

            // Spec reveal list
            if (srvIp) {
                if (progress >= 0.25) {
                    srvIp.textContent = '14.232.80.12';
                    srvIp.classList.add('active');
                } else {
                    srvIp.textContent = 'Ẩn danh?';
                    srvIp.classList.remove('active');
                }
            }
            if (srvAgent) {
                if (progress >= 0.45) {
                    srvAgent.textContent = 'Chrome 124 (OS)';
                    srvAgent.classList.add('active');
                } else {
                    srvAgent.textContent = 'Chrome';
                    srvAgent.classList.remove('active');
                }
            }
            if (srvRes) srvRes.classList.toggle('active', progress >= 0.55);
            if (srvGpu) srvGpu.classList.toggle('active', progress >= 0.65);
            if (srvHash) {
                srvHash.classList.toggle('active', progress >= 0.75);
                if (progress >= 0.75) {
                    srvHash.style.textShadow = '0 0 8px rgba(239, 68, 68, 0.6)';
                    if (status) {
                        status.textContent = 'Website đích vẫn nhận diện chính xác danh tính thiết bị của bạn qua Fingerprint.';
                        status.style.color = 'var(--incog-red)';
                    }
                } else {
                    srvHash.style.textShadow = '';
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
            const solPacket = canvas.querySelector('#v51-sol-packet');

            // Packet travel
            if (solPacket) {
                if (progress >= 0.1 && progress < 0.35) {
                    const norm = (progress - 0.1) / 0.25;
                    solPacket.style.opacity = 1;
                    solPacket.style.left = `${10 + norm * 35}%`;
                    solPacket.style.top = '40%';
                } else if (progress >= 0.35 && progress < 0.5) {
                    solPacket.style.opacity = 1;
                    solPacket.style.left = '45%';
                    solPacket.style.top = '40%';
                } else if (progress >= 0.5 && progress < 0.7) {
                    const norm = (progress - 0.5) / 0.2;
                    solPacket.style.opacity = 1;
                    solPacket.style.left = `${45 + norm * 37}%`;
                    solPacket.style.top = '40%';
                } else {
                    solPacket.style.opacity = 0;
                }
            }

            // Node states
            if (userNode) userNode.classList.toggle('active-user', progress > 0.05);
            if (wire1) wire1.style.opacity = progress > 0.15 ? '1' : '0.2';
            if (vpnNode) vpnNode.classList.toggle('active-purple', progress > 0.35);
            if (wire2) wire2.style.opacity = progress > 0.5 ? '1' : '0.2';
            if (dnsNode) dnsNode.classList.toggle('active-green', progress > 0.65);

            // Matrix encryption generator
            const log0 = canvas.querySelector('#v51-sol-log-0');
            const log1 = canvas.querySelector('#v51-sol-log-1');
            const log2 = canvas.querySelector('#v51-sol-log-2');
            const log3 = canvas.querySelector('#v51-sol-log-3');

            const scrambleString = (len) => {
                const dict = '0123456789!@#$%^&*()_+-=X';
                let out = '';
                for (let i = 0; i < len; i++) out += dict.charAt(Math.floor(Math.random() * dict.length));
                return out;
            };

            if (progress > 0.05) {
                if (log0) {
                    log0.classList.add('secure');
                    log0.innerHTML = progress >= 0.15 ? `> [${scrambleString(10)}]` : '> [ENCRYPTED DATA]';
                }
                if (log1) {
                    log1.classList.add('secure');
                    log1.innerHTML = progress >= 0.35 ? `> [${scrambleString(12)}]` : '> [ENCRYPTED DATA]';
                }
                if (log2) {
                    log2.classList.add('secure');
                    log2.innerHTML = progress >= 0.55 ? `> [${scrambleString(10)}]` : '> [ENCRYPTED DATA]';
                }
                if (log3) {
                    log3.classList.add('secure');
                    log3.innerHTML = progress >= 0.75 ? `> [${scrambleString(14)}]` : '> [ENCRYPTED DATA]';
                }
            }
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
