/**
 * Video 42: Password Hashing & Security
 * Plugin file - contains renderGfx and updateFrame for video42
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_v42_1: [],
        slide_v42_1a: [
            { text: 'thông báo', start: 1.5, end: 5.5, class: 'active-gold' },
            { text: 'Gmail', start: 5.5, end: 10.0, class: 'active-cyan' }
        ],
        slide_v42_1b: [
            { text: 'email', start: 2.0, end: 6.5, class: 'active-cyan' },
            { text: 'đổi mật khẩu', start: 6.5, end: 11.5, class: 'active-good' }
        ],
        slide_v42_1c: [
            { text: 'mật khẩu mới', start: 3.0, end: 7.5, class: 'active-gold' },
            { text: 'hệ thống', start: 7.5, end: 11.0, class: 'active-cyan' }
        ],
        slide_v42_2: [
            { text: 'chữ trần', start: 2.0, end: 6.5, class: 'active-bad' },
            { text: 'database', start: 6.5, end: 12.0, class: 'active-bad' }
        ],
        slide_v42_3: [
            { text: 'Hàm băm một chiều', start: 3.5, end: 8.5, class: 'active-good' },
            { text: 'chuỗi ký tự rác', start: 8.5, end: 13.5, class: 'active-gold' }
        ],
        slide_v42_3b: [
            { text: 'MD5', start: 4.5, end: 8.5, class: 'active-bad' },
            { text: 'Bcrypt', start: 9.0, end: 13.5, class: 'active-good' }
        ],
        slide_v42_4: [
            { text: 'băm mật khẩu', start: 1.5, end: 5.5, class: 'active-gold' },
            { text: 'đổi mật khẩu mới', start: 9.5, end: 14.5, class: 'active-good' }
        ],
        slide_v42_5: []
    };

    const customSlideIds = [
        'slide_v42_1', 'slide_v42_1a', 'slide_v42_1b', 'slide_v42_1c', 'slide_v42_2', 'slide_v42_3', 'slide_v42_3b', 'slide_v42_4'
    ];

    // Helpers to prevent flickering due to constant DOM updates
    function safeSetHTML(el, html) {
        if (!el) return;
        if (el.innerHTML !== html) {
            el.innerHTML = html;
        }
    }

    function safeSetText(el, text) {
        if (!el) return;
        if (el.textContent !== text) {
            el.textContent = text;
        }
    }

    // Get offset position inside a zoom container
    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.4;
        return {
            x: (rect.left - contRect.left + rect.width / 2) / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    // Get offset position of an edge inside a zoom container
    function getEdgeOffset(el, container, edge) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.4;
        let x = rect.left - contRect.left;
        if (edge === 'right') {
            x += rect.width;
        } else if (edge === 'center') {
            x += rect.width / 2;
        }
        return {
            x: x / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    // Draw curved cubic bezier paths between nodes
    function drawSVGPath(canvas, pathId, startNode, endNode, container, strokeColor) {
        const path = canvas.querySelector(pathId);
        if (!path || !startNode || !endNode || !container) return;
        const start = getCenterOffset(startNode, container);
        const end = getCenterOffset(endNode, container);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        
        if (Math.abs(dy) < 15) {
            path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
        } else {
            path.setAttribute('d', `M ${start.x} ${start.y} C ${start.x + dx * 0.45} ${start.y}, ${end.x - dx * 0.45} ${end.y}, ${end.x} ${end.y}`);
        }
        path.setAttribute('stroke', strokeColor || 'var(--hash-cyan)');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
    }

    // Position packets along a linear/bezier path
    function getPathPoint(start, end, t) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 15) {
            return { x: start.x + dx * t, y: start.y + dy * t };
        }
        const mt = 1 - t;
        return {
            x: mt * mt * mt * start.x + 3 * mt * mt * t * (start.x + dx * 0.45)
                + 3 * mt * t * t * (end.x - dx * 0.45) + t * t * t * end.x,
            y: mt * mt * mt * start.y + 3 * mt * mt * t * start.y
                + 3 * mt * t * t * end.y + t * t * t * end.y
        };
    }

    function placePacket(wrap, start, end, t) {
        if (!wrap) return;
        const pt = getPathPoint(start, end, t);
        wrap.style.left = `${pt.x}px`;
        wrap.style.top = `${pt.y}px`;
        wrap.classList.add('visible');
    }

    function hidePacket(wrap) {
        if (wrap) {
            wrap.classList.remove('visible');
            wrap.style.opacity = '0';
        }
    }

    // ── GFX GENERATOR HELPERS ──────────────────────────────────────────────────
    
    function phoneMockHTML(id, screenHTML) {
        return `
            <div class="v42-phone-mockup" id="${id}-phone">
                <!-- Status bar -->
                <div class="v42-status-bar">
                    <span>09:41</span>
                    <div class="v42-status-icons">
                        <i data-lucide="wifi"></i>
                        <i data-lucide="signal"></i>
                        <i data-lucide="battery"></i>
                    </div>
                </div>
                <div class="v42-phone-screen">
                    ${screenHTML}
                </div>
                <!-- Clicking Pointer Hand -->
                <div class="v42-click-cursor" id="${id}-cursor">
                    <i data-lucide="hand" style="width:30px;height:30px;color:#ff5722;fill:#ff5722;transform:rotate(-20deg);"></i>
                </div>
            </div>
        `;
    }

    function lockscreenScreenHTML(id) {
        return `
            <div class="v42-lockscreen">
                <div class="v42-lockscreen-wallpaper"></div>
                <div class="v42-lockscreen-time">09:41</div>
                <div class="v42-lockscreen-date">Thứ Ba, 23 Tháng 6</div>
                <div class="v42-lockscreen-notif-container">
                    <div class="v42-notification-card" id="${id}-notif">
                        <div class="v42-notif-icon">
                            <i data-lucide="mail"></i>
                        </div>
                        <div class="v42-notif-body">
                            <div class="v42-notif-header">
                                <span>GMAIL</span>
                                <span>vừa xong</span>
                            </div>
                            <span class="v42-notif-title">Google Accounts</span>
                            <span class="v42-notif-text">Yêu cầu đặt lại mật khẩu Google của bạn...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function gmailScreenHTML(id) {
        return `
            <div class="v42-gmail-app">
                <div class="v42-gmail-header">
                    <i data-lucide="menu" style="width:16px;height:16px;color:#a0a0a5;"></i>
                    <div class="v42-gmail-search">
                        <i data-lucide="search" style="color:#a0a0a5;"></i>
                        <span>Tìm kiếm trong email...</span>
                    </div>
                    <div class="v42-gmail-avatar">T</div>
                </div>
                <div class="v42-gmail-content">
                    <!-- Inbox list screen -->
                    <div class="v42-gmail-inbox" id="${id}-gmail-inbox-view">
                        <span class="v42-inbox-section-title">Hộp thư chính</span>
                        <div class="v42-inbox-list">
                            <!-- Target Item Google Accounts -->
                            <div class="v42-inbox-item unread" id="${id}-inbox-item-google">
                                <div class="v42-inbox-avatar google">G</div>
                                <div class="v42-inbox-details">
                                    <div class="v42-inbox-sender-row">
                                        <span class="v42-inbox-sender">Google Accounts</span>
                                        <span class="v42-inbox-time">09:41</span>
                                    </div>
                                    <span class="v42-inbox-subject">Yêu cầu đặt lại mật khẩu</span>
                                    <span class="v42-inbox-preview">Chúng tôi nhận được yêu cầu khôi phục mật khẩu...</span>
                                </div>
                                <div class="v42-inbox-unread-dot"></div>
                            </div>
                            <!-- Fake Item Github -->
                            <div class="v42-inbox-item">
                                <div class="v42-inbox-avatar github">GH</div>
                                <div class="v42-inbox-details">
                                    <div class="v42-inbox-sender-row">
                                        <span class="v42-inbox-sender">GitHub Security</span>
                                        <span class="v42-inbox-time">08:15</span>
                                    </div>
                                    <span class="v42-inbox-subject">[GitHub] Security Alert: new sign-in</span>
                                    <span class="v42-inbox-preview">We detected a login from a new device...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Email Detail screen -->
                    <div class="v42-email-detail" id="${id}-gmail-detail-view">
                        <div class="v42-email-meta">
                            <div class="v42-sender-icon">
                                <i data-lucide="shield-check"></i>
                            </div>
                            <div class="v42-sender-info">
                                <span class="v42-sender-name">Google Accounts</span>
                                <span class="v42-sender-email">no-reply@accounts.google.com</span>
                            </div>
                        </div>
                        <div class="v42-email-body">
                            <h2 class="v42-email-title">Yêu cầu đặt lại mật khẩu Google của bạn</h2>
                            <p class="v42-email-text">Chúng tôi nhận được yêu cầu khôi phục mật khẩu từ bạn. Nhấp vào nút bên dưới để tiến hành thiết lập mật khẩu mới an toàn:</p>
                            <div class="v42-email-btn" id="${id}-email-btn">
                                <i data-lucide="key-round"></i> Đổi Mật Khẩu Mới
                            </div>
                            <p class="v42-email-warning">⚠️ Link này chỉ có hiệu lực trong 60 phút và chỉ sử dụng được 1 lần.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function browserResetFormHTML(id) {
        return `
            <div class="v42-browser-app">
                <div class="v42-browser-header">
                    <div class="v42-browser-address-bar">
                        <i data-lucide="lock"></i>
                        <span class="v42-browser-address-text">accounts.google.com/reset</span>
                    </div>
                    <i data-lucide="more-vertical" style="width:16px;height:16px;color:#a0a0a5;"></i>
                </div>
                <div class="v42-browser-content">
                    <div class="v42-google-logo-mini">
                        <span class="blue">G</span>
                        <span class="red">o</span>
                        <span class="yellow">o</span>
                        <span class="blue">g</span>
                        <span class="green">l</span>
                        <span class="red">e</span>
                    </div>
                    <h2 class="v42-reset-title">Thiết lập mật khẩu mới</h2>
                    <span class="v42-reset-subtitle">Tạo mật khẩu mạnh và không dùng lại cho các dịch vụ khác</span>
                    
                    <div class="v42-form-group">
                        <span class="v42-form-label">Mật khẩu mới</span>
                        <div class="v42-form-input-wrap">
                            <input type="text" class="v42-form-input" id="${id}-pwd-input" value="" readonly>
                            <span class="v42-input-icon">
                                <i data-lucide="eye-off"></i>
                            </span>
                        </div>
                    </div>

                    <div class="v42-form-group">
                        <span class="v42-form-label">Xác nhận mật khẩu</span>
                        <div class="v42-form-input-wrap">
                            <input type="password" class="v42-form-input" id="${id}-pwd-confirm" value="" readonly>
                            <span class="v42-input-icon">
                                <i data-lucide="eye-off"></i>
                            </span>
                        </div>
                        
                        <div class="v42-strength-wrapper">
                            <div class="v42-strength-bar">
                                <div class="v42-strength-fill" id="${id}-strength-fill"></div>
                            </div>
                            <span class="v42-strength-text" id="${id}-strength-txt">-</span>
                        </div>
                    </div>

                    <button class="v42-form-btn" id="${id}-submit-btn">Lưu Mật Khẩu</button>
                </div>
            </div>
        `;
    }

    function dbConsoleHTML(id, highlightRow = 0, isHashed = false) {
        const pass1 = isHashed ? '$2b$12$s4Lt_9x!r9h/cIP...' : '123456';
        const pass2 = isHashed ? '$2b$12$p3Pp3r_7ye98b76...' : 'iloveyou';
        const salt1 = isHashed ? 's4Lt_9x!' : 'NULL';
        const salt2 = isHashed ? 'p3Pp3r_7y' : 'NULL';
        
        return `
            <div class="v42-supabase-console" id="${id}-db-console">
                <div class="v42-supabase-sidebar">
                    <i data-lucide="database" class="item active"></i>
                    <i data-lucide="users" class="item"></i>
                    <i data-lucide="key" class="item"></i>
                    <i data-lucide="terminal" class="item"></i>
                </div>
                <div class="v42-supabase-main">
                    <div class="v42-supabase-header">
                        <div class="v42-supabase-breadcrumb">
                            <span>tables</span>
                            <i data-lucide="chevron-right" style="width:10px;height:10px;"></i>
                            <span class="table-name">users</span>
                        </div>
                        <i data-lucide="refresh-cw" style="width:12px;height:12px;color:#4b5563;"></i>
                    </div>
                    <div class="v42-supabase-grid">
                        <table class="v42-db-table">
                            <thead>
                                <tr>
                                    <th style="width: 25px;">#</th>
                                    <th style="width: 75px;">username</th>
                                    <th>password_hash</th>
                                    <th style="width: 80px;">salt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="${id}-db-row-1" class="${highlightRow === 1 ? 'highlight-red' : ''}">
                                    <td>1</td>
                                    <td>nguyena</td>
                                    <td id="${id}-db-val-1" style="color: ${isHashed ? 'var(--hash-green)' : 'var(--hash-red)'}; font-weight: bold;">${pass1}</td>
                                    <td id="${id}-db-salt-1" style="color: var(--hash-yellow); font-family: monospace;">${salt1}</td>
                                </tr>
                                <tr id="${id}-db-row-2" class="${highlightRow === 2 ? 'highlight-red' : ''}">
                                    <td>2</td>
                                    <td>tranb</td>
                                    <td id="${id}-db-val-2" style="color: ${isHashed ? 'var(--hash-green)' : 'var(--hash-red)'}; font-weight: bold;">${pass2}</td>
                                    <td id="${id}-db-salt-2" style="color: var(--hash-yellow); font-family: monospace;">${salt2}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function loginFormHTML(id, isSubmit = false) {
        return `
            <div class="v42-client-mockup" id="${id}-login-form" style="width: 170px !important; padding: 12px; gap: 8px;">
                <div class="v42-device-header" style="padding-bottom: 6px;">
                    <div class="v42-device-title" style="font-size: 11px !important;">
                        <i data-lucide="laptop" style="width:12px;height:12px;"></i>
                        Form Đăng Nhập
                    </div>
                </div>
                <div style="background: #04060b; border-radius: 8px; padding: 8px; font-size:10px; display:flex; flex-direction:column; gap:6px; text-align:left;">
                    <div style="display:flex; flex-direction:column;">
                        <span style="color:#64748b; font-size:8px;">Username</span>
                        <span style="font-weight:bold; color: #fff;">nguyena</span>
                    </div>
                    <div style="display:flex; flex-direction:column;">
                        <span style="color:#64748b; font-size:8px;">Mật khẩu</span>
                        <span style="font-weight:bold; font-family:monospace; color:var(--hash-red);">${isSubmit ? '123456' : '••••••'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function saltingFlowHTML(id) {
        return `
            <div class="v42-salting-flow" id="${id}-salting-flow">
                <div class="v42-salting-inputs">
                    <!-- Password Card -->
                    <div class="v42-salting-card" id="${id}-flow-pwd">
                        <div class="v42-salting-card-icon red">
                            <i data-lucide="lock"></i>
                        </div>
                        <div class="v42-salting-card-info">
                            <span class="v42-salting-card-lbl">Mật khẩu</span>
                            <span class="v42-salting-card-val" id="${id}-flow-pwd-val">123456</span>
                        </div>
                    </div>
                    <!-- Salt Card -->
                    <div class="v42-salting-card" id="${id}-flow-salt">
                        <div class="v42-salting-card-icon yellow">
                            <i data-lucide="cookie"></i>
                        </div>
                        <div class="v42-salting-card-info">
                            <span class="v42-salting-card-lbl">Salt (Muối)</span>
                            <span class="v42-salting-card-val" id="${id}-flow-salt-val">s4Lt_9x!</span>
                        </div>
                    </div>
                </div>
                
                <!-- Machine Engine -->
                <div class="v42-hash-machine-box">
                    <div class="v42-machine-gear-box" id="${id}-machine">
                        <div class="v42-machine-gear"></div>
                        <div class="v42-machine-gear inner"></div>
                        <div class="v42-machine-icon">
                            <i data-lucide="binary"></i>
                        </div>
                    </div>
                    <span style="font-size:10px; font-weight:800; color:var(--hash-green); text-transform:uppercase;">BCRYPT HASH</span>
                </div>

                <!-- Hash Result Card -->
                <div class="v42-hash-result-card" id="${id}-flow-result">
                    <span class="v42-hash-result-title">Mã Băm Lưu Trữ</span>
                    <span class="v42-hash-result-val" id="${id}-flow-result-val">$2b$12$...</span>
                </div>
            </div>
        `;
    }

    function matcherMockHTML(id) {
        return `
            <div class="v42-matcher-mockup" id="${id}-matcher" style="width: 170px !important;">
                <div class="v42-device-header">
                    <div class="v42-device-title" style="color:var(--hash-yellow); font-size: 11px !important;">
                        <i data-lucide="git-compare" style="width:12px;height:12px;"></i>
                        Bộ So Khớp (Matcher)
                    </div>
                </div>
                <div class="v42-matcher-body" style="height: 110px !important; gap: 8px;">
                    <div class="v42-compare-row" style="gap: 4px;">
                        <div class="v42-compare-item" id="${id}-comp-input" style="padding: 4px 6px; font-size:9.5px !important;">
                            <span>Input:</span>
                            <span class="val">-</span>
                        </div>
                        <div class="v42-compare-item" id="${id}-comp-db" style="padding: 4px 6px; font-size:9.5px !important;">
                            <span>DB:</span>
                            <span class="val">-</span>
                        </div>
                    </div>
                    <div id="${id}-match-badge" class="v42-match-result" style="display:none; margin-top: 2px; padding: 4px 12px; font-size: 11px !important;">MATCH ✓</div>
                </div>
            </div>
        `;
    }

    function hackerTerminalHTML(id) {
        return `
            <div class="v42-hacker-mockup" id="${id}-hacker" style="width: 340px !important;">
                <div class="v42-device-header">
                    <div class="v42-device-title" style="color:var(--hash-red); font-size:13px !important;">
                        <i data-lucide="skull" style="width:14px;height:14px;"></i>
                        Hacker Database Leak
                    </div>
                </div>
                <div class="v42-hacker-body" id="${id}-hacker-body" style="height:80px !important; padding:8px;">
                    <div class="v42-hacker-terminal">
                        <span class="line cmd"># select username, plaintext_password from users;</span>
                        <span class="line status" id="${id}-hacker-status">READING DB...</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ── RENDER GRAPHICS TEMPLATE ───────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        } else {
            return;
        }

        if (slideId === 'slide_v42_1') {
            canvas.innerHTML = `
                <div class="v42-scene-wrapper">
                    <div style="position:absolute; inset:0; background-image:radial-gradient(rgba(245, 158, 11, 0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; margin-top: 30px;">
                        <div class="v42-logo-intro-container">
                            <div class="v42-logo-glow-ring"></div>
                            <div class="v42-logo-glow-ring inner"></div>
                            <div class="v42-giant-logo">
                                <i data-lucide="key-round"></i>
                            </div>
                        </div>
                        <div class="v42-giant-password-text">PASSWORD</div>
                        <div class="v42-sub-intro-text">
                            <span>HASHING</span>
                            <span class="dot">•</span>
                            <span>SALTING</span>
                            <span class="dot">•</span>
                            <span>SECURITY</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_1a') {
            // Lock Screen Notification
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    ${phoneMockHTML('v42-p1a', lockscreenScreenHTML('v42-p1a'))}

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-cyan">
                                <i data-lucide="bell"></i> NOTIFICATION
                            </span>
                            <span class="v42-status-text text-cyan" id="v42-p1a-status">Đang gửi yêu cầu đặt lại mật khẩu...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_1b') {
            // Gmail App Open
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    ${phoneMockHTML('v42-p1b', gmailScreenHTML('v42-p1b'))}

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-cyan">
                                <i data-lucide="mail"></i> RESET LINK
                            </span>
                            <span class="v42-status-text text-cyan" id="v42-p1b-status">Nhận email chứa link đổi mật khẩu bảo mật...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_1c') {
            // Reset Password form gõ 123456
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    ${phoneMockHTML('v42-p1c', browserResetFormHTML('v42-p1c'))}

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-yellow">
                                <i data-lucide="lock"></i> NEW PASSWORD
                            </span>
                            <span class="v42-status-text text-yellow" id="v42-p1c-status">Đang nhập mật khẩu mới...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_2') {
            // Plaintext database risk
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    <div style="width:100%; display:flex; justify-content:center; margin-bottom:5px;">
                        ${hackerTerminalHTML('v42-p2')}
                    </div>
                    <div class="v42-devices-row">
                        ${loginFormHTML('v42-p2', true)}
                        ${dbConsoleHTML('v42-p2', 0, false)}
                    </div>

                    <svg class="v42-svg-container">
                        <path id="v42-p2-path-leak" class="v42-flow-path" />
                    </svg>

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-red">
                                <i data-lucide="unlock"></i> MẬT KHẨU TRẦN
                            </span>
                            <span class="v42-status-text text-red" id="v42-p2-status">Lưu trữ mật khẩu không an toàn trong Database...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_3') {
            // Hashing and salting
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    <div style="width:100%; display:flex; justify-content:center; margin-bottom:5px;">
                        ${saltingFlowHTML('v42-p3')}
                    </div>
                    <div style="width:100%; display:flex; justify-content:center;">
                        ${dbConsoleHTML('v42-p3', 0, true)}
                    </div>

                    <svg class="v42-svg-container">
                        <path id="v42-p3-path-pwd" class="v42-flow-path" />
                        <path id="v42-p3-path-salt" class="v42-flow-path" />
                        <path id="v42-p3-path-db" class="v42-flow-path" />
                    </svg>

                    <!-- Packets -->
                    <div class="v42-packet-wrap" id="v42-p3-pwd-pkt">
                        <div class="v42-packet-core red">🔓</div>
                        <span class="v42-packet-label">123456</span>
                    </div>

                    <div class="v42-packet-wrap" id="v42-p3-salt-pkt">
                        <div class="v42-packet-core yellow">🧂</div>
                        <span class="v42-packet-label" id="v42-p3-salt-lbl">Salt</span>
                    </div>

                    <div class="v42-packet-wrap" id="v42-p3-hash-pkt">
                        <div class="v42-packet-core green">🔒</div>
                        <span class="v42-packet-label" id="v42-p3-hash-lbl">$2b$12$...</span>
                    </div>

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-green">
                                <i data-lucide="shield"></i> HASH & SALT
                            </span>
                            <span class="v42-status-text text-green" id="v42-p3-status">Mật khẩu kết hợp với Salt và băm qua Bcrypt.</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_3b') {
            // MD5 vs Bcrypt comparison
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    <div class="v42-comparison-row">
                        <!-- MD5 Card -->
                        <div class="v42-comp-card md5" id="v42-p3b-md5">
                            <span class="v42-comp-badge fast">SIÊU NHANH (Nguy hiểm)</span>
                            <h3 class="v42-comp-title">MD5 / SHA1</h3>
                            <div class="v42-stat-box">
                                <div class="v42-stat-row">
                                    <span class="v42-stat-label">Tốc độ băm:</span>
                                    <span class="v42-stat-value red">10 Tỷ / giây</span>
                                </div>
                                <div class="v42-stat-row">
                                    <span class="v42-stat-label">Dò Brute Force:</span>
                                    <span class="v42-stat-value red">Vài giây</span>
                                </div>
                            </div>
                            <div class="v42-progress-container">
                                <div class="v42-progress-label">
                                    <span>Tốc độ bẻ khóa của Hacker</span>
                                    <span class="val" id="v42-p3b-md5-percent">0%</span>
                                </div>
                                <div class="v42-progress-bar">
                                    <div class="v42-progress-fill red" id="v42-p3b-md5-bar"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Bcrypt Card -->
                        <div class="v42-comp-card bcrypt" id="v42-p3b-bcrypt">
                            <span class="v42-comp-badge slow">CHẬM CỐ Ý (Bảo mật)</span>
                            <h3 class="v42-comp-title">Bcrypt / Argon2</h3>
                            <div class="v42-stat-box">
                                <div class="v42-stat-row">
                                    <span class="v42-stat-label">Tốc độ băm:</span>
                                    <span class="v42-stat-value green">10 / giây</span>
                                </div>
                                <div class="v42-stat-row">
                                    <span class="v42-stat-label">Dò Brute Force:</span>
                                    <span class="v42-stat-value green">120 Năm</span>
                                </div>
                            </div>
                            <div class="v42-progress-container">
                                <div class="v42-progress-label">
                                    <span>Tốc độ bẻ khóa của Hacker</span>
                                    <span class="val" id="v42-p3b-bcrypt-percent">0%</span>
                                </div>
                                <div class="v42-progress-bar">
                                    <div class="v42-progress-fill green" id="v42-p3b-bcrypt-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-red" id="v42-p3b-tag">
                                <i data-lucide="zap"></i> MD5 VS BCRYPT
                            </span>
                            <span class="v42-status-text text-red" id="v42-p3b-status">Hacker dễ dàng brute-force các mã băm siêu nhanh như MD5...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_v42_4') {
            // Login verification and block reverse
            canvas.innerHTML = `
                <div class="v42-simulation-layout">
                    <div style="width:100%; display:flex; justify-content:center; margin-bottom:5px;">
                        ${matcherMockHTML('v42-p4')}
                    </div>
                    <div class="v42-devices-row">
                        ${loginFormHTML('v42-p4', true)}
                        ${dbConsoleHTML('v42-p4', 0, true)}
                    </div>

                    <svg class="v42-svg-container">
                        <path id="v42-p4-path-input" class="v42-flow-path" />
                        <path id="v42-p4-path-db" class="v42-flow-path" />
                    </svg>

                    <div class="v42-packet-wrap" id="v42-p4-pkt">
                        <div class="v42-packet-core yellow" id="v42-p4-pkt-core">🔒</div>
                        <span class="v42-packet-label" id="v42-p4-pkt-lbl">a78f3d...</span>
                    </div>

                    <!-- Reverse blocker shield -->
                    <div class="v42-reverse-blocker" id="v42-p4-blocker">
                        <i data-lucide="shield-alert"></i>
                        <span style="margin-top: 4px;">BLOCKED</span>
                    </div>

                    <div class="v42-glass v42-status-card">
                        <div class="v42-status-inner">
                            <span class="v42-key-tag step-cyan" id="v42-p4-tag">
                                <i data-lucide="git-compare"></i> SO KHỚP HASH
                            </span>
                            <span class="v42-status-text text-cyan" id="v42-p4-status">Đang thực hiện so khớp mã băm để xác thực...</span>
                        </div>
                    </div>
                </div>
            `;
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const container = canvas.querySelector('.v42-simulation-layout');
        if (!container) return;

        if (slideId === 'slide_v42_1') {
            // Title slide
        }
        else if (slideId === 'slide_v42_1a') {
            const notif = canvas.querySelector('#v42-p1a-notif');
            const cursor = canvas.querySelector('#v42-p1a-cursor');
            const phone = canvas.querySelector('#v42-p1a-phone');
            const status = canvas.querySelector('#v42-p1a-status');

            if (phone) {
                phone.style.transform = `translateY(${15 * (1 - progress)}px)`;
            }

            if (notif) {
                if (progress > 0.2) {
                    notif.classList.add('visible');
                } else {
                    notif.classList.remove('visible');
                }
            }

            if (cursor && notif && phone) {
                const notifRect = notif.getBoundingClientRect();
                const phoneRect = phone.getBoundingClientRect();
                const zoom = container.offsetWidth > 0 ? (container.getBoundingClientRect().width / container.offsetWidth) : 1.4;
                const targetX = (notifRect.left - phoneRect.left + notifRect.width / 2) / zoom;
                const targetY = (notifRect.top - phoneRect.top + notifRect.height / 2) / zoom;

                if (progress < 0.3) {
                    cursor.classList.remove('visible');
                    cursor.style.left = '260px';
                    cursor.style.top = '440px';
                    safeSetText(status, 'Khi bạn nhấn "Quên mật khẩu", hệ thống sẽ gửi một thông báo xác nhận.');
                }
                else if (progress >= 0.3 && progress < 0.75) {
                    const t = (progress - 0.3) / 0.45;
                    cursor.classList.add('visible');
                    cursor.style.left = `${260 + (targetX - 260) * t}px`;
                    cursor.style.top = `${440 + (targetY - 440) * t}px`;
                    cursor.style.transform = 'scale(1) rotate(-20deg)';
                    safeSetText(status, 'Thông báo Gmail xuất hiện trên màn hình khóa. Click để mở xem chi tiết...');
                }
                else {
                    cursor.classList.add('visible');
                    cursor.style.left = `${targetX}px`;
                    cursor.style.top = `${targetY}px`;
                    cursor.style.transform = 'scale(0.88) rotate(-20deg)'; // Click effect
                    notif.style.background = 'rgba(255, 255, 255, 0.15)';
                    safeSetText(status, 'Mở thông báo email khôi phục tài khoản...');
                }
            }
        }
        else if (slideId === 'slide_v42_1b') {
            const inboxView = canvas.querySelector('#v42-p1b-gmail-inbox-view');
            const detailView = canvas.querySelector('#v42-p1b-gmail-detail-view');
            const inboxItem = canvas.querySelector('#v42-p1b-inbox-item-google');
            const btn = canvas.querySelector('#v42-p1b-email-btn');
            const cursor = canvas.querySelector('#v42-p1b-cursor');
            const phone = canvas.querySelector('#v42-p1b-phone');
            const status = canvas.querySelector('#v42-p1b-status');

            if (phone && cursor && inboxView && detailView && inboxItem && btn) {
                const phoneRect = phone.getBoundingClientRect();
                const zoom = container.offsetWidth > 0 ? (container.getBoundingClientRect().width / container.offsetWidth) : 1.4;

                if (progress < 0.45) {
                    // Phase 1: Tap the unread email item
                    const itemRect = inboxItem.getBoundingClientRect();
                    const targetX = (itemRect.left - phoneRect.left + itemRect.width / 2) / zoom;
                    const targetY = (itemRect.top - phoneRect.top + itemRect.height / 2) / zoom;

                    inboxView.style.display = 'flex';
                    detailView.style.display = 'none';
                    btn.className = 'v42-email-btn';
                    btn.innerHTML = '<i data-lucide="key-round" style="width:16px;height:16px;"></i> Đổi Mật Khẩu Mới';

                    const t = progress / 0.45;
                    cursor.classList.add('visible');
                    cursor.style.left = `${260 + (targetX - 260) * t}px`;
                    cursor.style.top = `${420 + (targetY - 420) * t}px`;
                    cursor.style.transform = t > 0.9 ? 'scale(0.88) rotate(-20deg)' : 'scale(1) rotate(-20deg)';
                    
                    safeSetText(status, 'Google gửi email xác nhận chứa nút bấm đổi mật khẩu dùng 1 lần.');
                }
                else if (progress >= 0.45 && progress < 0.85) {
                    // Phase 2: Open email, move cursor to the action button
                    inboxView.style.display = 'none';
                    detailView.style.display = 'flex';
                    btn.className = 'v42-email-btn';

                    const btnRect = btn.getBoundingClientRect();
                    const targetX = (btnRect.left - phoneRect.left + btnRect.width / 2) / zoom;
                    const targetY = (btnRect.top - phoneRect.top + btnRect.height / 2) / zoom;

                    const t = (progress - 0.45) / 0.4;
                    cursor.classList.add('visible');
                    cursor.style.left = `${targetX}px`;
                    cursor.style.top = `${targetY - 80 + 80 * t}px`; // Move from above
                    cursor.style.transform = 'scale(1) rotate(-20deg)';
                    
                    safeSetText(status, 'Email khôi phục mở ra. Di chuyển đến nút "Đổi Mật Khẩu Mới"...');
                }
                else {
                    // Phase 3: Click the button and trigger redirection
                    inboxView.style.display = 'none';
                    detailView.style.display = 'flex';
                    
                    const btnRect = btn.getBoundingClientRect();
                    const targetX = (btnRect.left - phoneRect.left + btnRect.width / 2) / zoom;
                    const targetY = (btnRect.top - phoneRect.top + btnRect.height / 2) / zoom;

                    cursor.classList.add('visible');
                    cursor.style.left = `${targetX}px`;
                    cursor.style.top = `${targetY}px`;
                    cursor.style.transform = 'scale(0.88) rotate(-20deg)';

                    btn.className = 'v42-email-btn success';
                    btn.innerHTML = '<i data-lucide="refresh-cw" style="width:16px;height:16px;animation:spin 1s infinite linear;"></i> Đang Chuyển Hướng...';
                    
                    safeSetText(status, 'Nhấp chọn đổi mật khẩu để bắt đầu nhập thông tin mới bảo mật.');
                }
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v42_1c') {
            const inputField = canvas.querySelector('#v42-p1c-pwd-input');
            const confirmField = canvas.querySelector('#v42-p1c-pwd-confirm');
            const submitBtn = canvas.querySelector('#v42-p1c-submit-btn');
            const strengthFill = canvas.querySelector('#v42-p1c-strength-fill');
            const strengthTxt = canvas.querySelector('#v42-p1c-strength-txt');
            const cursor = canvas.querySelector('#v42-p1c-cursor');
            const phone = canvas.querySelector('#v42-p1c-phone');
            const status = canvas.querySelector('#v42-p1c-status');

            if (phone && cursor && inputField && confirmField && submitBtn && strengthFill && strengthTxt) {
                const phoneRect = phone.getBoundingClientRect();
                const zoom = container.offsetWidth > 0 ? (container.getBoundingClientRect().width / container.offsetWidth) : 1.4;

                const inputRect = inputField.getBoundingClientRect();
                const btnRect = submitBtn.getBoundingClientRect();

                const inputX = (inputRect.left - phoneRect.left + inputRect.width / 2) / zoom;
                const inputY = (inputRect.top - phoneRect.top + inputRect.height / 2) / zoom;
                const btnX = (btnRect.left - phoneRect.left + btnRect.width / 2) / zoom;
                const btnY = (btnRect.top - phoneRect.top + btnRect.height / 2) / zoom;

                const passChars = "123456";

                if (progress < 0.25) {
                    // Move cursor to input field and click it
                    const t = progress / 0.25;
                    cursor.classList.add('visible');
                    cursor.style.left = `${260 + (inputX - 260) * t}px`;
                    cursor.style.top = `${400 + (inputY - 400) * t}px`;
                    cursor.style.transform = t > 0.9 ? 'scale(0.88) rotate(-20deg)' : 'scale(1) rotate(-20deg)';

                    inputField.value = "";
                    confirmField.value = "";
                    strengthFill.style.width = "0%";
                    strengthFill.style.background = "var(--hash-red)";
                    safeSetText(strengthTxt, "-");
                    submitBtn.style.background = "#1a73e8";

                    safeSetText(status, 'Trình duyệt chuyển hướng đến form điền mật khẩu mới của Google.');
                }
                else if (progress >= 0.25 && progress < 0.75) {
                    // Typing password character by character
                    const t = (progress - 0.25) / 0.5;
                    const charCount = Math.floor(t * passChars.length) + 1;
                    const currentTyped = passChars.substring(0, Math.min(charCount, passChars.length));
                    
                    inputField.value = currentTyped;
                    confirmField.value = "•".repeat(currentTyped.length);

                    // Strength update
                    if (charCount <= 2) {
                        strengthFill.style.width = "30%";
                        strengthFill.style.background = "var(--hash-red)";
                        safeSetText(strengthTxt, "Yếu ❌");
                    } else if (charCount <= 4) {
                        strengthFill.style.width = "60%";
                        strengthFill.style.background = "var(--hash-yellow)";
                        safeSetText(strengthTxt, "Trung bình ⚠️");
                    } else {
                        strengthFill.style.width = "100%";
                        strengthFill.style.background = "var(--hash-green)";
                        safeSetText(strengthTxt, "Mạnh ✓");
                    }

                    cursor.classList.add('visible');
                    cursor.style.left = `${inputX}px`;
                    cursor.style.top = `${inputY}px`;
                    cursor.style.transform = 'scale(1) rotate(-20deg)';

                    safeSetText(status, `Gõ phím thiết lập mật khẩu mới: "${currentTyped}"...`);
                }
                else if (progress >= 0.75 && progress < 0.92) {
                    // Move cursor to "Lưu mật khẩu" button
                    const t = (progress - 0.75) / 0.17;
                    inputField.value = "123456";
                    confirmField.value = "••••••";
                    strengthFill.style.width = "100%";
                    strengthFill.style.background = "var(--hash-green)";
                    safeSetText(strengthTxt, "Mạnh ✓");
                    submitBtn.style.background = "#1a73e8";

                    cursor.classList.add('visible');
                    cursor.style.left = `${inputX + (btnX - inputX) * t}px`;
                    cursor.style.top = `${inputY + (btnY - inputY) * t}px`;
                    cursor.style.transform = 'scale(1) rotate(-20deg)';

                    safeSetText(status, 'Hoàn thành điền mật khẩu mới. Di chuyển đến Lưu Mật Khẩu...');
                }
                else {
                    // Click submit button
                    inputField.value = "123456";
                    confirmField.value = "••••••";
                    strengthFill.style.width = "100%";
                    safeSetText(strengthTxt, "Mạnh ✓");

                    cursor.classList.add('visible');
                    cursor.style.left = `${btnX}px`;
                    cursor.style.top = `${btnY}px`;
                    cursor.style.transform = 'scale(0.88) rotate(-20deg)';

                    submitBtn.style.background = "var(--hash-green)";
                    submitBtn.textContent = "Đã Lưu ✓";

                    safeSetText(status, 'Nhấp chọn lưu thông tin. Hệ thống bắt đầu xử lý và lưu trữ dữ liệu!');
                }
            }
        }
        else if (slideId === 'slide_v42_2') {
            const loginForm = canvas.querySelector('#v42-p2-login-form');
            const status = canvas.querySelector('#v42-p2-status');
            const hacker = canvas.querySelector('#v42-p2-hacker');
            const hackerBody = canvas.querySelector('#v42-p2-hacker-body');
            const dbConsole = canvas.querySelector('#v42-p2-db-console');

            const row1 = canvas.querySelector('#v42-p2-db-row-1');
            const row2 = canvas.querySelector('#v42-p2-db-row-2');

            // Draw path dynamically on every frame to avoid CSS transition issues
            drawSVGPath(canvas, '#v42-p2-path-leak', dbConsole, hacker, container, 'var(--hash-red)');

            if (progress < 0.5) {
                if (hacker) hacker.classList.remove('active-glow');
                if (dbConsole) dbConsole.style.borderColor = 'rgba(255,255,255,0.08)';
                if (row1) row1.className = '';
                if (row2) row2.className = '';
                safeSetHTML(hackerBody, `
                    <div class="v42-hacker-terminal">
                        <span class="line cmd"># select username, plaintext_password from users;</span>
                        <span class="line status">READING DB...</span>
                    </div>
                `);
                safeSetText(status, 'Nếu hệ thống lưu mật khẩu dưới dạng chữ trần (Plaintext)...');
            } else {
                if (hacker) hacker.classList.add('active-glow');
                if (dbConsole) dbConsole.style.borderColor = 'var(--hash-red)';
                if (row1) row1.className = 'highlight-red';
                if (row2) row2.className = 'highlight-red';
                safeSetHTML(hackerBody, `
                    <div class="v42-hacker-terminal">
                        <span class="line cmd"># select username, plaintext_password from users;</span>
                        <span class="line warning" style="color:var(--hash-red);">[LEAK] nguyena | 123456</span>
                        <span class="line warning" style="color:var(--hash-red);">[LEAK] tranb   | iloveyou</span>
                    </div>
                `);
                safeSetText(status, 'Hacker đột nhập được vào DB sẽ đọc trọn vẹn mật khẩu của tất cả mọi người!');
            }
        }
        else if (slideId === 'slide_v42_3') {
            const pwdNode = canvas.querySelector('#v42-p3-flow-pwd');
            const saltNode = canvas.querySelector('#v42-p3-flow-salt');
            const machineNode = canvas.querySelector('#v42-p3-machine');
            const resultNode = canvas.querySelector('#v42-p3-flow-result');
            const dbConsole = canvas.querySelector('#v42-p3-db-console');

            const pwdVal = canvas.querySelector('#v42-p3-flow-pwd-val');
            const saltVal = canvas.querySelector('#v42-p3-flow-salt-val');
            const resultVal = canvas.querySelector('#v42-p3-flow-result-val');

            const pwdPkt = canvas.querySelector('#v42-p3-pwd-pkt');
            const saltPkt = canvas.querySelector('#v42-p3-salt-pkt');
            const hashPkt = canvas.querySelector('#v42-p3-hash-pkt');
            const saltLbl = canvas.querySelector('#v42-p3-salt-lbl');
            const hashLbl = canvas.querySelector('#v42-p3-hash-lbl');

            const dbRow1 = canvas.querySelector('#v42-p3-db-row-1');
            const dbRow2 = canvas.querySelector('#v42-p3-db-row-2');
            const dbVal1 = canvas.querySelector('#v42-p3-db-val-1');
            const dbVal2 = canvas.querySelector('#v42-p3-db-val-2');
            const dbSalt1 = canvas.querySelector('#v42-p3-db-salt-1');
            const dbSalt2 = canvas.querySelector('#v42-p3-db-salt-2');

            const status = canvas.querySelector('#v42-p3-status');

            // Draw paths dynamically
            drawSVGPath(canvas, '#v42-p3-path-pwd', pwdNode, machineNode, container, 'rgba(255,255,255,0.15)');
            drawSVGPath(canvas, '#v42-p3-path-salt', saltNode, machineNode, container, 'var(--hash-yellow)');
            drawSVGPath(canvas, '#v42-p3-path-db', resultNode, dbConsole, container, 'var(--hash-green)');

            const offPwd = getCenterOffset(pwdNode, container);
            const offSalt = getCenterOffset(saltNode, container);
            const offMach = getCenterOffset(machineNode, container);
            const offRes = getCenterOffset(resultNode, container);
            const offDB = getCenterOffset(dbConsole, container);

            if (progress < 0.35) {
                // Phase 1: nguyena registers. Password and Salt flow into machine
                const t = progress / 0.35;
                if (pwdNode) pwdNode.classList.add('active-red');
                if (saltNode) saltNode.classList.add('active-yellow');
                if (resultNode) resultNode.classList.remove('active-green');
                
                safeSetText(pwdVal, '123456');
                safeSetText(saltVal, 's4Lt_9x!');
                safeSetText(resultVal, '$2b$12$...');

                if (dbRow1) dbRow1.className = '';
                if (dbRow2) dbRow2.className = '';
                safeSetText(dbVal1, 'NULL');
                safeSetText(dbSalt1, 'NULL');
                safeSetText(dbVal2, 'NULL');
                safeSetText(dbSalt2, 'NULL');

                placePacket(pwdPkt, offPwd, offMach, t);
                placePacket(saltPkt, offSalt, offMach, t);
                safeSetText(saltLbl, 'Salt: s4Lt_9x!');
                hidePacket(hashPkt);

                safeSetText(status, '1. nguyena đăng ký pass "123456". Hệ thống trộn thêm Salt ngẫu nhiên: "s4Lt_9x!"');
            } 
            else if (progress >= 0.35 && progress < 0.68) {
                // Phase 2: Machine outputs hash and stores to row 1
                const t = (progress - 0.35) / 0.33;
                if (pwdNode) pwdNode.classList.remove('active-red');
                if (saltNode) saltNode.classList.remove('active-yellow');
                if (resultNode) resultNode.classList.add('active-green');
                
                safeSetText(pwdVal, '123456');
                safeSetText(saltVal, 's4Lt_9x!');
                safeSetText(resultVal, '$2b$12$s4Lt_9x!r9h/cIP...');

                if (dbRow1) dbRow1.className = 'highlight-green';
                if (dbRow2) dbRow2.className = '';
                safeSetText(dbVal1, '$2b$12$s4Lt_9x!r9h/cIP...');
                safeSetText(dbSalt1, 's4Lt_9x!');
                safeSetText(dbVal2, 'NULL');
                safeSetText(dbSalt2, 'NULL');

                hidePacket(pwdPkt);
                hidePacket(saltPkt);
                placePacket(hashPkt, offRes, offDB, t);
                safeSetText(hashLbl, '$2b$12$s4Lt...');

                safeSetText(status, '2. Hàm Bcrypt băm hỗn hợp này thành chuỗi ký tự rác dài dằng dặc rồi lưu vào database.');
            } 
            else {
                // Phase 3: tranb registers with SAME password but gets different salt & hash
                const t = (progress - 0.68) / 0.32;
                if (pwdNode) pwdNode.classList.add('active-red');
                if (saltNode) saltNode.classList.add('active-yellow');
                
                safeSetText(pwdVal, '123456');
                safeSetText(saltVal, 'p3Pp3r_7y');

                if (dbRow1) dbRow1.className = '';
                if (dbRow2) dbRow2.className = 'highlight-green';
                safeSetText(dbVal1, '$2b$12$s4Lt_9x!r9h/cIP...');
                safeSetText(dbSalt1, 's4Lt_9x!');

                if (t < 0.5) {
                    const t1 = t / 0.5;
                    if (resultNode) resultNode.classList.remove('active-green');
                    safeSetText(resultVal, '$2b$12$...');
                    safeSetText(dbVal2, 'NULL');
                    safeSetText(dbSalt2, 'NULL');

                    placePacket(pwdPkt, offPwd, offMach, t1);
                    placePacket(saltPkt, offSalt, offMach, t1);
                    safeSetText(saltLbl, 'Salt: p3Pp3r_7y');
                    hidePacket(hashPkt);
                } else {
                    const t2 = (t - 0.5) / 0.5;
                    if (resultNode) resultNode.classList.add('active-green');
                    safeSetText(resultVal, '$2b$12$p3Pp3r_7ye98b76...');
                    safeSetText(dbVal2, '$2b$12$p3Pp3r_7ye98b76...');
                    safeSetText(dbSalt2, 'p3Pp3r_7y');

                    hidePacket(pwdPkt);
                    hidePacket(saltPkt);
                    placePacket(hashPkt, offRes, offDB, t2);
                    safeSetText(hashLbl, '$2b$12$p3Pp...');
                }

                safeSetText(status, '3. tranb cũng dùng pass "123456", nhưng Salt "p3Pp3r_7y" khác -> ra mã băm lưu trữ hoàn toàn khác!');
            }
        }
        else if (slideId === 'slide_v42_3b') {
            const md5Card = canvas.querySelector('#v42-p3b-md5');
            const bcryptCard = canvas.querySelector('#v42-p3b-bcrypt');
            const status = canvas.querySelector('#v42-p3b-status');
            const tag = canvas.querySelector('#v42-p3b-tag');
            
            const md5Percent = canvas.querySelector('#v42-p3b-md5-percent');
            const md5Bar = canvas.querySelector('#v42-p3b-md5-bar');
            
            const bcryptPercent = canvas.querySelector('#v42-p3b-bcrypt-percent');
            const bcryptBar = canvas.querySelector('#v42-p3b-bcrypt-bar');

            if (progress < 0.5) {
                // MD5 Brute force speed
                const t = progress / 0.5;
                if (md5Card) md5Card.classList.add('active');
                if (bcryptCard) bcryptCard.classList.remove('active');
                
                if (md5Bar) md5Bar.style.width = `${t * 100}%`;
                if (md5Percent) safeSetText(md5Percent, `${Math.floor(t * 100)}% (Thành công)`);
                
                if (bcryptBar) bcryptBar.style.width = '0%';
                if (bcryptPercent) safeSetText(bcryptPercent, '0%');
                
                if (tag) {
                    tag.className = 'v42-key-tag step-red';
                    tag.innerHTML = '<i data-lucide="zap"></i> MD5 / SHA1 (Nguy hiểm)';
                }
                safeSetText(status, 'Hàm băm siêu nhanh như MD5 là món quà cho hacker: chúng đoán mò hàng tỷ mật khẩu mỗi giây.');
            } else {
                // Bcrypt delay security
                const t = (progress - 0.5) / 0.5;
                if (md5Card) md5Card.classList.remove('active');
                if (bcryptCard) bcryptCard.classList.add('active');
                
                if (md5Bar) md5Bar.style.width = '100%';
                if (md5Percent) safeSetText(md5Percent, '100% (Thành công)');
                
                const val = t * 0.0001;
                if (bcryptBar) bcryptBar.style.width = '0.5%';
                if (bcryptPercent) safeSetText(bcryptPercent, `${val.toFixed(5)}% (Cần 120 năm)`);
                
                if (tag) {
                    tag.className = 'v42-key-tag step-green';
                    tag.innerHTML = '<i data-lucide="shield"></i> Bcrypt (Bảo mật)';
                }
                safeSetText(status, 'Bcrypt có độ trễ cố ý: khiến việc dò quét brute-force của hacker bị treo và mất hàng trăm năm!');
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
        else if (slideId === 'slide_v42_4') {
            const loginForm = canvas.querySelector('#v42-p4-login-form');
            const status = canvas.querySelector('#v42-p4-status');
            const pkt = canvas.querySelector('#v42-p4-pkt');
            const pktCore = canvas.querySelector('#v42-p4-pkt-core');
            const pktLbl = canvas.querySelector('#v42-p4-pkt-lbl');
            const matcher = canvas.querySelector('#v42-p4-matcher');
            const dbConsole = canvas.querySelector('#v42-p4-db-console');
            const blocker = canvas.querySelector('#v42-p4-blocker');
            const statusTag = canvas.querySelector('#v42-p4-tag');

            const matchBadge = canvas.querySelector('#v42-p4-match-badge');
            const compInput = canvas.querySelector('#v42-p4-comp-input .val');
            const compDB = canvas.querySelector('#v42-p4-comp-db .val');

            // Draw paths dynamically
            drawSVGPath(canvas, '#v42-p4-path-input', loginForm, matcher, container, 'rgba(255,255,255,0.15)');
            drawSVGPath(canvas, '#v42-p4-path-db', dbConsole, matcher, container, 'var(--hash-cyan)');

            const offC = getCenterOffset(loginForm, container);
            const offM = getCenterOffset(matcher, container);
            const offDB = getCenterOffset(dbConsole, container);

            if (progress < 0.4) {
                // Phase 1: Browser sends login pass. Băm it and send to matcher
                const t = progress / 0.4;
                if (blocker) blocker.classList.remove('active');
                if (matchBadge) matchBadge.style.display = 'none';
                if (compInput) safeSetText(compInput, '-');
                if (compDB) safeSetText(compDB, '-');
                if (statusTag) {
                    statusTag.className = 'v42-key-tag step-cyan';
                    statusTag.innerHTML = '<i data-lucide="git-compare"></i> SO KHỚP HASH';
                }

                placePacket(pkt, offC, offM, t);
                if (pktCore) {
                    pktCore.className = 'v42-packet-core red';
                    safeSetText(pktCore, '🔓');
                }
                if (pktLbl) safeSetText(pktLbl, '123456');
                safeSetText(status, '1. Khi đăng nhập, hệ thống băm mật khẩu vừa gõ bằng cùng Salt...');
            } 
            else if (progress >= 0.4 && progress < 0.78) {
                // Phase 2: Match DB Hash
                const t = (progress - 0.4) / 0.38;
                if (blocker) blocker.classList.remove('active');
                hidePacket(pkt);
                if (matchBadge) {
                    matchBadge.style.display = 'inline-block';
                    matchBadge.className = 'v42-match-result';
                    safeSetText(matchBadge, 'MATCH ✓');
                }
                if (compInput) safeSetText(compInput, 'a78f3d9b...');
                if (compDB) safeSetText(compDB, 'a78f3d9b...');
                if (statusTag) {
                    statusTag.className = 'v42-key-tag step-green';
                    statusTag.innerHTML = '<i data-lucide="check-circle"></i> KHỚP MÃ ✓';
                }

                safeSetText(status, '2. So khớp mã băm mới sinh với mã băm trong DB. Nếu trùng nhau -> Đăng nhập thành công!');
            }
            else {
                // Phase 3: Try to reverse băm (One-way Blocked)
                const t = (progress - 0.78) / 0.22;
                if (blocker) blocker.classList.add('active');
                if (matchBadge) matchBadge.style.display = 'none';
                if (compInput) safeSetText(compInput, '-');
                if (compDB) safeSetText(compDB, '-');
                if (statusTag) {
                    statusTag.className = 'v42-key-tag step-red';
                    statusTag.innerHTML = '<i data-lucide="shield-alert"></i> KHÔNG THỂ DỊCH NGƯỢC';
                }

                // Send a red packet going backwards from DB to Browser, but gets blocked
                placePacket(pkt, offDB, offC, t);
                if (pktCore) {
                    pktCore.className = 'v42-packet-core red';
                    safeSetText(pktCore, '↮');
                }
                if (pktLbl) safeSetText(pktLbl, 'a78f3d ↮ ???');

                safeSetText(status, '3. Vì hàm băm là một chiều: Không cách nào dịch ngược lấy lại mật khẩu cũ. Bạn buộc phải đổi mới!');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ node: canvas });
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video42',
        keywordsData: keywordsData,
        customSlideIds: customSlideIds,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };
})();
