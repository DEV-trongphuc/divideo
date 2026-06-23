/**
 * Video 30: Cloudflare DDoS Protection
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video30
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_cf_1: [
            { text: 'DDoS', start: 1.0, end: 12.0, class: 'active-bad' },
            { text: 'botnet', start: 12.0, end: 20.0, class: 'active-bad' },
            { text: 'quá tải', start: 20.0, end: 28.0, class: 'active-bad' }
        ],
        slide_cf_2: [
            { text: 'kết nối trực tiếp', start: 1.0, end: 10.0, class: 'active-bad' },
            { text: '502 Bad Gateway', start: 10.0, end: 22.0, class: 'active-bad' }
        ],
        slide_cf_3: [
            { text: 'Anycast Routing', start: 1.0, end: 10.0, class: 'active-good' },
            { text: 'Edge Center', start: 10.0, end: 18.0, class: 'active-gold' },
            { text: 'giấu an toàn', start: 18.0, end: 26.0, class: 'active-good' }
        ],
        slide_cf_4: [
            { text: 'WAF', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'SQL Injection', start: 9.0, end: 18.0, class: 'active-bad' },
            { text: 'drop', start: 18.0, end: 25.0, class: 'active-good' }
        ],
        slide_cf_5: [
            { text: 'JavaScript Challenge', start: 1.0, end: 10.0, class: 'active-gold' },
            { text: 'người thật', start: 10.0, end: 17.0, class: 'active-good' },
            { text: 'botnet', start: 17.0, end: 24.0, class: 'active-bad' }
        ],
        slide_cf_6: [
            { text: 'Rate Limiting', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'HTTP Flood', start: 9.0, end: 16.0, class: 'active-bad' },
            { text: 'khóa IP', start: 16.0, end: 23.0, class: 'active-bad' }
        ],
        slide_cf_7: [
            { text: 'Threat Intelligence', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'đồng bộ toàn cầu', start: 9.0, end: 18.0, class: 'active-good' },
            { text: 'chặn đứng', start: 18.0, end: 26.0, class: 'active-good' }
        ],
        slide_cf_8: [
            { text: 'Unicast', start: 1.0, end: 10.0, class: 'active-bad' },
            { text: 'Anycast', start: 10.0, end: 17.0, class: 'active-good' },
            { text: 'phân phối thông minh', start: 17.0, end: 24.0, class: 'active-good' }
        ],
        slide_cf_9: [
            { text: 'Cloudflare Tunnel', start: 1.0, end: 10.0, class: 'active-good' },
            { text: 'mã hóa ngược', start: 10.0, end: 18.0, class: 'active-gold' },
            { text: 'ẩn hoàn toàn', start: 18.0, end: 26.0, class: 'active-good' }
        ],
        slide_cf_10: [
            { text: 'Anycast phân tán', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'tường lửa WAF', start: 8.0, end: 15.0, class: 'active-gold' },
            { text: 'Turnio.dev', start: 15.0, end: 22.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_cf_1',
        'slide_cf_2',
        'slide_cf_3',
        'slide_cf_4',
        'slide_cf_5',
        'slide_cf_6',
        'slide_cf_7',
        'slide_cf_8',
        'slide_cf_9',
        'slide_cf_10'
    ];

    // Helper: trigger Lucide icons
    function initIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // ── GEOMETRY HELPERS ───────────────────────────────────────────────────────
    // Calculates element center relative to zoomed container
    function getNodeCenter(node, container) {
        if (!node || !container) return { x: 0, y: 0 };
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate the zoom factor dynamically
        const zoom = container.offsetWidth > 0 ? (containerRect.width / container.offsetWidth) : 1.45;
        
        const rx = rect.left - containerRect.left + rect.width / 2;
        const ry = rect.top - containerRect.top + rect.height / 2;
        
        return {
            x: rx / zoom,
            y: ry / zoom
        };
    }

    function getLinearPoint(t, p0, p1) {
        return {
            x: p0.x + (p1.x - p0.x) * t,
            y: p0.y + (p1.y - p0.y) * t
        };
    }

    function getBezierPoint(t, p0, p1, p2) {
        return {
            x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
            y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y
        };
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;
        if (slideId === 'slide_cf_1') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 24px;">
                    <!-- SVG paths for visual lines -->
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-path-1" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2.5" />
                        <path id="v30-path-2" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2.5" />
                        <path id="v30-path-3" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2.5" />
                    </svg>

                    <!-- Botnet & Server Flow -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 240px;">
                        
                        <!-- Botnet Nodes -->
                        <div style="display: flex; flex-direction: column; gap: 8px; z-index: 2;">
                            <div class="v30-node active-red" id="v30-bot-1" style="width: 90px; padding: 8px 12px;">
                                <div class="v30-node-icon" style="width: 32px; height: 32px; margin-bottom: 4px;"><i data-lucide="skull" style="width: 18px; height: 18px;"></i></div>
                                <div class="v30-node-label" style="font-size: 11px;">Bot 1</div>
                            </div>
                            <div class="v30-node active-red" id="v30-bot-2" style="width: 90px; padding: 8px 12px;">
                                <div class="v30-node-icon" style="width: 32px; height: 32px; margin-bottom: 4px;"><i data-lucide="skull" style="width: 18px; height: 18px;"></i></div>
                                <div class="v30-node-label" style="font-size: 11px;">Bot 2</div>
                            </div>
                            <div class="v30-node active-red" id="v30-bot-3" style="width: 90px; padding: 8px 12px;">
                                <div class="v30-node-icon" style="width: 32px; height: 32px; margin-bottom: 4px;"><i data-lucide="skull" style="width: 18px; height: 18px;"></i></div>
                                <div class="v30-node-label" style="font-size: 11px;">Bot 3</div>
                            </div>
                        </div>

                        <!-- Target Server -->
                        <div class="v30-node active-blue" id="v30-target-server" style="width: 110px; height: 140px; z-index: 2; align-self: center;">
                            <div class="v30-node-icon"><i data-lucide="server"></i></div>
                            <div class="v30-node-label">Server</div>
                            <div class="v30-node-desc" id="v30-server-load-text">Load: 10%</div>
                            <div class="v30-progress-bar">
                                <div class="v30-progress-fill" id="v30-server-load-fill" style="width: 10%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Flow packets container -->
                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Attack Alert Toast -->
                    <div class="v30-glass-card" style="padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(239, 68, 68, 0.25);">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="v30-status-badge red" id="v30-status-1"><i data-lucide="alert-triangle"></i> ddos attack</span>
                        </div>
                        <div style="font-family: 'Fira Code', monospace; font-size: 13px; font-weight: 900; color: var(--cf-red);" id="v30-traffic-count">
                            12k req/s
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_2') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-direct-path" d="" fill="none" stroke="rgba(239, 68, 68, 0.35)" stroke-width="3" />
                    </svg>

                    <!-- Direct overload layout -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 240px;">
                        
                        <!-- High density botnet source -->
                        <div class="v30-node active-red" id="v30-botnet-source" style="width: 105px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="zap-off"></i></div>
                            <div class="v30-node-label">Botnet</div>
                            <div class="v30-node-desc">10,000 Nodes</div>
                        </div>

                        <!-- Crashing Server -->
                        <div class="v30-node active-blue" id="v30-crash-server" style="width: 110px; height: 140px; z-index: 2;">
                            <div class="v30-node-icon" id="v30-crash-server-icon"><i data-lucide="server"></i></div>
                            <div class="v30-node-label" id="v30-crash-server-label">Server</div>
                            <div class="v30-node-desc" id="v30-crash-server-desc">Load: 80%</div>
                            <div class="v30-progress-bar">
                                <div class="v30-progress-fill warning" id="v30-crash-server-fill" style="width: 80%;"></div>
                            </div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Error Output Toast -->
                    <div class="v30-glass-card" id="v30-error-toast" style="padding: 14px; text-align: center; border-color: rgba(255, 255, 255, 0.08); transition: all 0.4s;">
                        <span style="font-family: 'Fira Code', monospace; font-size: 14px; font-weight: 900; color: var(--cf-text-muted);" id="v30-error-text">
                            HTTP Status: 200 OK
                        </span>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_3') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 16px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <!-- Botnet to Edge Nodes -->
                        <path id="v30-anycast-path-1" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2" />
                        <path id="v30-anycast-path-2" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2" />
                        <path id="v30-anycast-path-3" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2" />

                        <!-- Edge Nodes to Origin Server (Filtered/No traffic) -->
                        <path id="v30-anycast-safe-1" d="" fill="none" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1.5" stroke-dasharray="4 4" />
                        <path id="v30-anycast-safe-2" d="" fill="none" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1.5" stroke-dasharray="4 4" />
                        <path id="v30-anycast-safe-3" d="" fill="none" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1.5" stroke-dasharray="4 4" />
                    </svg>

                    <!-- Anycast Routing Architecture -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 260px;">
                        
                        <!-- Botnet Source -->
                        <div class="v30-node active-red" id="v30-botnet-anycast" style="width: 85px; z-index: 2; padding: 10px;">
                            <div class="v30-node-icon" style="width:36px; height:36px; margin-bottom:6px;"><i data-lucide="skull" style="width:20px; height:20px;"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">Botnet</div>
                        </div>

                        <!-- 3 Edge Centers -->
                        <div style="display: flex; flex-direction: column; gap: 14px; z-index: 2;">
                            <div class="v30-node active-orange" id="v30-edge-1" style="width: 85px; padding: 8px;">
                                <div class="v30-node-icon" style="width:32px; height:32px; margin-bottom:4px; border-radius:50%; overflow:hidden; background:transparent;">
                                    <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                                </div>
                                <div class="v30-node-label" style="font-size:10px;">Edge US</div>
                            </div>
                            <div class="v30-node active-orange" id="v30-edge-2" style="width: 85px; padding: 8px;">
                                <div class="v30-node-icon" style="width:32px; height:32px; margin-bottom:4px; border-radius:50%; overflow:hidden; background:transparent;">
                                    <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                                </div>
                                <div class="v30-node-label" style="font-size:10px;">Edge EU</div>
                            </div>
                            <div class="v30-node active-orange" id="v30-edge-3" style="width: 85px; padding: 8px;">
                                <div class="v30-node-icon" style="width:32px; height:32px; margin-bottom:4px; border-radius:50%; overflow:hidden; background:transparent;">
                                    <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                                </div>
                                <div class="v30-node-label" style="font-size:10px;">Edge AS</div>
                            </div>
                        </div>

                        <!-- Safe Origin Server -->
                        <div class="v30-node active-green" id="v30-origin-server" style="width: 85px; z-index: 2; padding: 10px; align-self: center;">
                            <div class="v30-node-icon" style="width:36px; height:36px; margin-bottom:6px;"><i data-lucide="server" style="width:20px; height:20px;"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">Origin</div>
                            <div class="v30-node-desc" style="font-size:9px;" id="v30-origin-load">Load: 0%</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Routing Alert -->
                    <div class="v30-glass-card" style="padding: 12px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(59, 130, 246, 0.25);">
                        <span class="v30-status-badge orange" style="font-size: 9px;"><i data-lucide="globe"></i> Anycast Routing</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 11px; font-weight: 700; color: var(--cf-green);" id="v30-routing-status">
                            Traffic Distributed Globally
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_4') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-waf-path-1" d="" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2.5" />
                        <path id="v30-waf-path-2" d="" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2.5" />
                    </svg>

                    <!-- WAF Filter Screen -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 240px;">
                        
                        <!-- Incoming Traffic -->
                        <div class="v30-node active-orange" id="v30-traffic-node" style="width: 90px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="activity"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">Traffic</div>
                        </div>

                        <!-- WAF Core Filter Node -->
                        <div class="v30-node active-yellow" id="v30-waf-node" style="width: 120px; height: 140px; z-index: 2; position: relative; overflow: hidden;">
                            <div class="v30-waf-laser"></div>
                            <div class="v30-node-icon" style="border-radius:50%; overflow:hidden; background:transparent;">
                                <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                            </div>
                            <div class="v30-node-label" style="font-size:12px;">WAF Shield</div>
                            <div class="v30-node-desc" style="font-size:8px; margin-top:4px;" id="v30-waf-stats">Rules Active</div>
                        </div>

                        <!-- Clean Server -->
                        <div class="v30-node active-green" id="v30-clean-node" style="width: 90px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="check-circle-2"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">Clean</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- WAF Log Table -->
                    <div class="v30-glass-card" style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 11px; display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; justify-content: space-between; color: var(--cf-text-muted); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; font-weight: 700;">
                            <span>RULE TYPE</span>
                            <span>ACTION</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
                            <span style="color: var(--cf-red); font-weight: 700;" id="v30-waf-log-rule">SQL Injection Pattern</span>
                            <span class="v30-status-badge red" style="font-size: 9px; padding: 3px 6px;" id="v30-waf-log-action">DROP</span>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_5') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- JS Challenge Panel Mockup -->
                    <div class="v30-glass-card" style="width: 100%; border-color: rgba(255, 255, 255, 0.08); padding: 18px 22px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(255, 255, 255, 0.06); padding-bottom: 12px; margin-bottom: 14px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></div>
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b;"></div>
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></div>
                            </div>
                            <span style="font-size: 11px; color: var(--cf-text-muted); font-weight: 700; font-family: 'Fira Code', monospace;">cloudflare_challenge.html</span>
                            <i data-lucide="lock" style="width: 14px; height: 14px; color: var(--cf-green);"></i>
                        </div>

                        <!-- Verification Area -->
                        <div class="v30-challenge-box" id="v30-challenge-panel">
                            <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width: 32px; height: 32px; border-radius: 50%; box-shadow: 0 0 10px rgba(243, 128, 32, 0.3);" />
                            <div class="v30-spinner" id="v30-challenge-spinner"></div>
                            <div style="font-size: 14px; font-weight: 900; text-align: center; color: var(--cf-text);" id="v30-challenge-title">
                                Checking your browser...
                            </div>
                            <div style="font-size: 10px; text-align: center; color: var(--cf-text-muted);" id="v30-challenge-desc">
                                This process is automatic. Please wait 1-2 seconds.
                            </div>
                        </div>
                    </div>

                    <!-- Client node validation status -->
                    <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 4px;">
                        <div class="v30-node active-green" id="v30-user-node" style="width: 110px; padding: 10px; opacity: 0.5;">
                            <div class="v30-node-icon" style="width:36px; height:36px; margin-bottom:4px;"><i data-lucide="user"></i></div>
                            <div class="v30-node-label" style="font-size:10px;">Real User</div>
                            <div class="v30-node-desc" style="font-size:8px; color: var(--cf-green); font-weight:700;" id="v30-user-status">Passed</div>
                        </div>

                        <div class="v30-node active-red" id="v30-bot-node" style="width: 110px; padding: 10px; opacity: 0.5;">
                            <div class="v30-node-icon" style="width:36px; height:36px; margin-bottom:4px;"><i data-lucide="bot"></i></div>
                            <div class="v30-node-label" style="font-size:10px;">Headless Bot</div>
                            <div class="v30-node-desc" style="font-size:8px; color: var(--cf-red); font-weight:700;" id="v30-bot-status">Blocked</div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_6') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 24px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-rate-path" d="" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" />
                    </svg>

                    <!-- Rate Limiting Demo -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 180px;">
                        
                        <!-- Requester IP -->
                        <div class="v30-node active-blue" id="v30-rate-ip-node" style="width: 110px;">
                            <div class="v30-node-icon"><i data-lucide="fingerprint"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">IP Source</div>
                            <div class="v30-node-desc" style="font-family: 'Fira Code', monospace; font-size:8px;">198.51.100.42</div>
                        </div>

                        <!-- Guard Shield -->
                        <div class="v30-node active-green" id="v30-rate-shield-node" style="width: 110px;">
                            <div class="v30-node-icon" id="v30-rate-shield-icon"><i data-lucide="check"></i></div>
                            <div class="v30-node-label" id="v30-rate-shield-label" style="font-size:11px;">ALLOW</div>
                            <div class="v30-node-desc" id="v30-rate-shield-desc" style="font-size:8px;">Traffic Normal</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Rate Monitor Card -->
                    <div class="v30-glass-card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--cf-text-muted);">REQUEST FREQUENCY</span>
                            <span class="v30-status-badge green" id="v30-rate-badge" style="font-size: 10px; font-weight: 900;">SAFE</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-size: 24px; font-weight: 900; font-family: 'Fira Code', monospace; color: var(--cf-text);" id="v30-rate-counter">12 req/s</span>
                            <span style="font-size: 10px; color: var(--cf-text-muted); font-weight:600;">Threshold: 100 req/s</span>
                        </div>

                        <div class="v30-progress-bar" style="height: 10px;">
                            <div class="v30-progress-fill" id="v30-rate-bar" style="width: 12%;"></div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_7') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: flex-start; padding-top: 10px; gap: 20px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-threat-path-1" d="" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4 4" />
                        <path id="v30-threat-path-2" d="" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4 4" />
                    </svg>

                    <div style="font-size:13px; font-weight:800; color:var(--cf-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px; margin-bottom: 4px;">
                        Global Threat Intelligence
                    </div>

                    <!-- Network Map Node Diagram -->
                    <div style="display: flex; justify-content: space-around; width: 100%; position: relative; height: 140px;">
                        
                        <div class="v30-node active-red" id="v30-threat-node-1" style="width: 80px; padding: 8px;">
                            <div class="v30-node-icon" style="width:34px; height:34px; margin-bottom:4px;"><i data-lucide="skull" style="width:16px; height:16px;"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Target A</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-red); font-weight: 700;">ATTACKED</div>
                        </div>

                        <!-- Central Database Sync -->
                        <div class="v30-node active-yellow" id="v30-threat-db" style="width: 95px; padding: 8px;">
                            <div class="v30-node-icon" style="width:36px; height:36px; margin-bottom:4px;"><i data-lucide="database" style="width:18px; height:18px;"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Threat DB</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-yellow); font-weight: 700;" id="v30-db-sync-status">SYNCED</div>
                        </div>

                        <div class="v30-node active-green" id="v30-threat-node-2" style="width: 80px; padding: 8px;">
                            <div class="v30-node-icon" style="width:34px; height:34px; margin-bottom:4px;"><i data-lucide="shield-check" style="width:16px; height:16px;"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Target B</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-green); font-weight: 700;" id="v30-target2-status">SAFE</div>
                        </div>
                    </div>

                    <!-- Threat Logs Dashboard -->
                    <div class="v30-threat-list" id="v30-threat-logs">
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 45.223.11.9</span>
                            <span style="color: var(--cf-red); font-weight: 700;">BLOCKED (US)</span>
                        </div>
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 185.90.2.14</span>
                            <span style="color: var(--cf-red); font-weight: 700;">BLOCKED (EU)</span>
                        </div>
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 91.200.4.88</span>
                            <span style="color: var(--cf-red); font-weight: 700;">BLOCKED (AS)</span>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_8') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 16px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <path id="v30-unicast-path-1" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2" />
                        <path id="v30-unicast-path-2" d="" fill="none" stroke="rgba(239, 68, 68, 0.25)" stroke-width="2" />
                        <path id="v30-anycast-path-left" d="" fill="none" stroke="rgba(16, 185, 129, 0.25)" stroke-width="2" />
                        <path id="v30-anycast-path-right" d="" fill="none" stroke="rgba(16, 185, 129, 0.25)" stroke-width="2" />
                    </svg>

                    <div class="v30-comparison-grid">
                        <!-- Unicast column -->
                        <div class="v30-comparison-col" id="v30-unicast-col" style="position: relative; height: 320px; justify-content: space-between;">
                            <div style="font-size: 13px; font-weight: 900; color: var(--cf-red); letter-spacing: 0.8px;">UNICAST</div>
                            
                            <div style="display: flex; gap: 24px; z-index: 2;">
                                <div class="v30-node active-red" id="v30-uni-bot-us" style="width: 48px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px;"><i data-lucide="skull" style="width:14px; height:14px;"></i></div>
                                    <span style="font-size: 8px; font-weight: 700;">US</span>
                                </div>
                                <div class="v30-node active-red" id="v30-uni-bot-eu" style="width: 48px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px;"><i data-lucide="skull" style="width:14px; height:14px;"></i></div>
                                    <span style="font-size: 8px; font-weight: 700;">EU</span>
                                </div>
                            </div>

                            <!-- Single Central Node -->
                            <div class="v30-node active-red" id="v30-unicast-center" style="width: 75px; padding: 8px; z-index: 2; margin-bottom: 24px;">
                                <div class="v30-node-icon" style="width:28px; height:28px; margin-bottom:4px;"><i data-lucide="server" style="width:16px; height:16px;"></i></div>
                                <span style="font-size: 9px; font-weight: 800;">HQ Server</span>
                                <span style="font-size: 7px; color: var(--cf-red); font-weight: 800; margin-top:2px;">CONGESTED</span>
                            </div>
                        </div>

                        <!-- Anycast column -->
                        <div class="v30-comparison-col" id="v30-anycast-col" style="position: relative; height: 320px; justify-content: space-between; border-color: var(--cf-green);">
                            <div style="font-size: 13px; font-weight: 900; color: var(--cf-green); letter-spacing: 0.8px;">ANYCAST</div>
                            
                            <div style="display: flex; gap: 24px; z-index: 2;">
                                <div class="v30-node active-red" id="v30-any-bot-us" style="width: 48px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px;"><i data-lucide="skull" style="width:14px; height:14px;"></i></div>
                                    <span style="font-size: 8px; font-weight: 700;">US</span>
                                </div>
                                <div class="v30-node active-red" id="v30-any-bot-eu" style="width: 48px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px;"><i data-lucide="skull" style="width:14px; height:14px;"></i></div>
                                    <span style="font-size: 8px; font-weight: 700;">EU</span>
                                </div>
                            </div>

                            <!-- Two distributed servers -->
                            <div style="display: flex; gap: 20px; z-index: 2; margin-bottom: 24px;">
                                <div class="v30-node active-green" id="v30-any-node-us" style="width: 50px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px; border-radius:50%; overflow:hidden; background:transparent;">
                                        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                                    </div>
                                    <span style="font-size: 8px; font-weight: 700;">Node US</span>
                                </div>
                                <div class="v30-node active-green" id="v30-any-node-eu" style="width: 50px; padding: 6px;">
                                    <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px; border-radius:50%; overflow:hidden; background:transparent;">
                                        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                                    </div>
                                    <span style="font-size: 8px; font-weight: 700;">Node EU</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="v30-unicast-packets" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>
                    <div id="v30-anycast-packets" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_9') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                        <!-- Public Internet Attacking Paths (Blocked) -->
                        <path id="v30-tunnel-attack-path" d="" fill="none" stroke="rgba(239, 68, 68, 0.2)" stroke-width="2" />
                        
                        <!-- Inside Tunnel Secure Flow (Outbound reverse tunnel) -->
                        <path class="v30-tunnel-line" id="v30-tunnel-svg-line" d="" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round" />
                        <path id="v30-tunnel-svg-line-bg" d="" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="2.5" />
                    </svg>

                    <!-- Cloudflare Tunnel Architecture -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 240px;">
                        
                        <!-- Cloudflare Edge Center -->
                        <div class="v30-node active-orange" id="v30-tunnel-edge" style="width: 100px; height: 140px; z-index: 2;">
                            <div class="v30-node-icon" style="border-radius:50%; overflow:hidden; background:transparent;">
                                <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-avatar/avatars/cloudflare.webp" style="width:100%; height:100%; object-fit:cover;" />
                            </div>
                            <div class="v30-node-label" style="font-size:11px;">CF Edge</div>
                            <div class="v30-node-desc" style="font-size:8px;">Public Proxy</div>
                        </div>

                        <!-- Connector label over tunnel -->
                        <div id="v30-tunnel-label" style="position: absolute; font-size: 9px; font-weight: 800; color: var(--cf-green); font-family: 'Fira Code', monospace; z-index: 3; pointer-events: none; text-align: center;">
                            CF Tunnel
                        </div>

                        <!-- Safe Origin Server behind firewall -->
                        <div class="v30-node active-green" id="v30-tunnel-server" style="width: 100px; height: 140px; z-index: 2;">
                            <div class="v30-node-icon" id="v30-tunnel-lock-icon"><i data-lucide="lock"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">Server</div>
                            <div class="v30-node-desc" style="font-size:8px; color: var(--cf-red);" id="v30-tunnel-ports">Inbound: Blocked</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Secure Shield Badge -->
                    <div class="v30-glass-card" style="padding: 12px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(16, 185, 129, 0.25);">
                        <span class="v30-status-badge green" style="font-size: 9px;"><i data-lucide="shield-check"></i> Ports Closed</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 11px; color: var(--cf-text-muted);" id="v30-tunnel-status">
                            No Public IP Exposed
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_10') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 24px;">
                    <div style="text-align: center; margin-bottom: 4px;">
                        <div style="font-size: 24px; font-weight: 900; color: var(--cf-orange); text-transform: uppercase; letter-spacing: 0.8px;">Turnio.dev</div>
                        <div style="font-size: 11px; color: var(--cf-text-muted); margin-top: 4px; font-weight: 700; letter-spacing: 0.5px;">KIẾN THỨC HỆ THỐNG THỰC CHIẾN</div>
                    </div>

                    <!-- Glass Card listing Call to Actions -->
                    <div class="v30-glass-card" style="border-color: rgba(243, 128, 32, 0.3); box-shadow: 0 10px 36px rgba(243, 128, 32, 0.2); width: 100%;">
                        <div class="v30-cta-list">
                            <div class="v30-cta-item" id="v30-cta-1" style="opacity: 0.3; transform: scale(0.95); transition: all 0.4s;">
                                <i data-lucide="user-plus"></i>
                                <span>Ấn Follow kênh Turnio.dev</span>
                            </div>
                            <div class="v30-cta-item" id="v30-cta-2" style="opacity: 0.3; transform: scale(0.95); transition: all 0.4s;">
                                <i data-lucide="heart"></i>
                                <span>Thả tim & chia sẻ bài viết</span>
                            </div>
                            <div class="v30-cta-item" id="v30-cta-3" style="opacity: 0.3; transform: scale(0.95); transition: all 0.4s;">
                                <i data-lucide="message-square"></i>
                                <span>Bình luận câu hỏi của bạn bên dưới</span>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 18px; font-size: 12px; color: var(--cf-text-muted); font-weight: 700;">
                        <span>❤️ 4.2k</span>
                        <span>💬 832</span>
                        <span>🔄 1.1k</span>
                    </div>
                </div>
            `;
            initIcons();
        }
    }

    // ── ANIMATION FRAME HANDLER ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying) {
        const zoomContainer = canvas.querySelector('.v30-zoom-container');

        if (slideId === 'slide_cf_1') {
            const serverLoadText = canvas.querySelector('#v30-server-load-text');
            const serverLoadFill = canvas.querySelector('#v30-server-load-fill');
            const targetServer = canvas.querySelector('#v30-target-server');
            const statusBadge = canvas.querySelector('#v30-status-1');
            const trafficCount = canvas.querySelector('#v30-traffic-count');
            const container = canvas.querySelector('#v30-packets-container');

            const bot1 = canvas.querySelector('#v30-bot-1');
            const bot2 = canvas.querySelector('#v30-bot-2');
            const bot3 = canvas.querySelector('#v30-bot-3');

            // Load increases as progress goes up
            const loadVal = Math.round(10 + progress * 80);
            if (serverLoadText) serverLoadText.textContent = `Load: ${loadVal}%`;
            if (serverLoadFill) {
                serverLoadFill.style.width = `${loadVal}%`;
                if (loadVal > 70) {
                    serverLoadFill.className = 'v30-progress-fill danger';
                } else if (loadVal > 40) {
                    serverLoadFill.className = 'v30-progress-fill warning';
                } else {
                    serverLoadFill.className = 'v30-progress-fill';
                }
            }

            // Target server glow
            if (targetServer) {
                if (loadVal > 75) {
                    targetServer.style.borderColor = 'var(--cf-red)';
                    targetServer.style.boxShadow = '0 0 24px var(--cf-red-glow)';
                } else {
                    targetServer.style.borderColor = 'var(--cf-blue)';
                    targetServer.style.boxShadow = 'none';
                }
            }

            // Update badge text and traffic count
            if (statusBadge) {
                if (progress > 0.4) {
                    statusBadge.innerHTML = '<i data-lucide="alert-octagon"></i> HIGH CRITICAL';
                    statusBadge.className = 'v30-status-badge red';
                } else {
                    statusBadge.innerHTML = '<i data-lucide="alert-triangle"></i> DDoS ATTACK';
                    statusBadge.className = 'v30-status-badge red';
                }
                initIcons();
            }

            if (trafficCount) {
                const reqs = Math.round(12 + progress * 328);
                trafficCount.textContent = `${reqs}k req/s`;
            }

            // Dynamic layout calculations
            if (bot1 && bot2 && bot3 && targetServer && zoomContainer) {
                const cBot1 = getNodeCenter(bot1, zoomContainer);
                const cBot2 = getNodeCenter(bot2, zoomContainer);
                const cBot3 = getNodeCenter(bot3, zoomContainer);
                const cServer = getNodeCenter(targetServer, zoomContainer);

                // Update path coordinates
                const path1 = canvas.querySelector('#v30-path-1');
                const path2 = canvas.querySelector('#v30-path-2');
                const path3 = canvas.querySelector('#v30-path-3');

                // Bezier controls: curving towards middle
                const midX = (cBot1.x + cServer.x) / 2;
                const cp1 = { x: midX, y: cBot1.y + 40 };
                const cp3 = { x: midX, y: cBot3.y - 40 };

                if (path1) path1.setAttribute('d', `M ${cBot1.x} ${cBot1.y} Q ${cp1.x} ${cp1.y} ${cServer.x} ${cServer.y}`);
                if (path2) path2.setAttribute('d', `M ${cBot2.x} ${cBot2.y} L ${cServer.x} ${cServer.y}`);
                if (path3) path3.setAttribute('d', `M ${cBot3.x} ${cBot3.y} Q ${cp3.x} ${cp3.y} ${cServer.x} ${cServer.y}`);

                // Spawn particles dynamically along paths
                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = Math.min(24, 6 + Math.round(progress * 24));
                    for (let i = 0; i < numPackets; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet red';
                        container.appendChild(packet);

                        const localProg = (progress * 6 + (i / numPackets)) % 1.0;
                        const route = i % 3;
                        let pt = { x: 0, y: 0 };

                        if (route === 0) {
                            pt = getBezierPoint(localProg, cBot1, cp1, cServer);
                        } else if (route === 1) {
                            pt = getLinearPoint(localProg, cBot2, cServer);
                        } else {
                            pt = getBezierPoint(localProg, cBot3, cp3, cServer);
                        }

                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_2') {
            const server = canvas.querySelector('#v30-crash-server');
            const serverLabel = canvas.querySelector('#v30-crash-server-label');
            const serverDesc = canvas.querySelector('#v30-crash-server-desc');
            const serverFill = canvas.querySelector('#v30-crash-server-fill');
            const serverIcon = canvas.querySelector('#v30-crash-server-icon');
            const toast = canvas.querySelector('#v30-error-toast');
            const errorText = canvas.querySelector('#v30-error-text');
            const container = canvas.querySelector('#v30-packets-container');

            const botnet = canvas.querySelector('#v30-botnet-source');

            // Transition from normal load to complete failure
            if (progress < 0.35) {
                if (server) {
                    server.className = 'v30-node active-red';
                    server.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.3)';
                }
                if (serverLabel) serverLabel.textContent = 'Server';
                if (serverDesc) serverDesc.textContent = 'Load: 92%';
                if (serverFill) {
                    serverFill.style.width = '92%';
                    serverFill.className = 'v30-progress-fill danger';
                }
                if (toast) {
                    toast.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    toast.style.background = 'rgba(15, 22, 42, 0.55)';
                    toast.style.boxShadow = 'none';
                }
                if (errorText) {
                    errorText.textContent = 'HTTP Status: 200 OK';
                    errorText.style.color = 'var(--cf-text-muted)';
                }
            } else {
                // SẬP
                if (server) {
                    server.className = 'v30-node active-red';
                    server.style.boxShadow = '0 0 35px rgba(239, 68, 68, 0.9)';
                    server.style.transform = 'scale(0.95)';
                }
                if (serverLabel) serverLabel.textContent = 'CRASHED';
                if (serverDesc) serverDesc.textContent = 'SYSTEM OFFLINE';
                if (serverFill) {
                    serverFill.style.width = '100%';
                    serverFill.className = 'v30-progress-fill danger';
                }
                if (serverIcon) {
                    serverIcon.innerHTML = '<i data-lucide="alert-octagon" style="color: var(--cf-red);"></i>';
                    initIcons();
                }
                if (toast) {
                    toast.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    toast.style.background = 'rgba(239, 68, 68, 0.1)';
                    toast.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.35)';
                }
                if (errorText) {
                    errorText.textContent = '502 BAD GATEWAY (CONNECTION TIMEOUT)';
                    errorText.style.color = 'var(--cf-red)';
                }
            }

            // Path update and packets animation
            if (botnet && server && zoomContainer) {
                const cBot = getNodeCenter(botnet, zoomContainer);
                const cServer = getNodeCenter(server, zoomContainer);

                const directPath = canvas.querySelector('#v30-direct-path');
                if (directPath) {
                    directPath.setAttribute('d', `M ${cBot.x} ${cBot.y} L ${cServer.x} ${cServer.y}`);
                }

                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = 22;
                    for (let i = 0; i < numPackets; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet red';
                        container.appendChild(packet);

                        // Calculate wave displacement
                        const localProg = (progress * 7 + (i / numPackets)) % 1.0;
                        const pt = getLinearPoint(localProg, cBot, cServer);

                        // Add small wave offset for visual interest
                        const waveOffset = Math.sin(localProg * Math.PI * 2 + i) * 6;
                        
                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y + waveOffset}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_3') {
            const edge1 = canvas.querySelector('#v30-edge-1');
            const edge2 = canvas.querySelector('#v30-edge-2');
            const edge3 = canvas.querySelector('#v30-edge-3');
            const origin = canvas.querySelector('#v30-origin-server');
            const originLoad = canvas.querySelector('#v30-origin-load');
            const statusLabel = canvas.querySelector('#v30-routing-status');
            const container = canvas.querySelector('#v30-packets-container');
            const botnet = canvas.querySelector('#v30-botnet-anycast');

            // Edge Nodes active pulsing states
            if (edge1 && edge2 && edge3) {
                edge1.className = progress > 0.2 ? 'v30-node active-orange' : 'v30-node';
                edge2.className = progress > 0.4 ? 'v30-node active-orange' : 'v30-node';
                edge3.className = progress > 0.6 ? 'v30-node active-orange' : 'v30-node';
            }

            if (origin && originLoad) {
                origin.className = 'v30-node active-green';
                origin.style.boxShadow = '0 0 15px var(--cf-green-glow)';
                originLoad.textContent = 'Load: 2%';
            }

            if (statusLabel) {
                if (progress > 0.7) {
                    statusLabel.textContent = 'Edge load balanced (Safe)';
                    statusLabel.style.color = 'var(--cf-green)';
                } else {
                    statusLabel.textContent = 'Distributing Traffic...';
                    statusLabel.style.color = 'var(--cf-orange)';
                }
            }

            // Dynamic coordinate matching
            if (botnet && edge1 && edge2 && edge3 && origin && zoomContainer) {
                const cBot = getNodeCenter(botnet, zoomContainer);
                const cEdge1 = getNodeCenter(edge1, zoomContainer);
                const cEdge2 = getNodeCenter(edge2, zoomContainer);
                const cEdge3 = getNodeCenter(edge3, zoomContainer);
                const cOrigin = getNodeCenter(origin, zoomContainer);

                // Update all paths
                const path1 = canvas.querySelector('#v30-anycast-path-1');
                const path2 = canvas.querySelector('#v30-anycast-path-2');
                const path3 = canvas.querySelector('#v30-anycast-path-3');
                const safe1 = canvas.querySelector('#v30-anycast-safe-1');
                const safe2 = canvas.querySelector('#v30-anycast-safe-2');
                const safe3 = canvas.querySelector('#v30-anycast-safe-3');

                if (path1) path1.setAttribute('d', `M ${cBot.x} ${cBot.y} L ${cEdge1.x} ${cEdge1.y}`);
                if (path2) path2.setAttribute('d', `M ${cBot.x} ${cBot.y} L ${cEdge2.x} ${cEdge2.y}`);
                if (path3) path3.setAttribute('d', `M ${cBot.x} ${cBot.y} L ${cEdge3.x} ${cEdge3.y}`);

                if (safe1) safe1.setAttribute('d', `M ${cEdge1.x} ${cEdge1.y} L ${cOrigin.x} ${cOrigin.y}`);
                if (safe2) safe2.setAttribute('d', `M ${cEdge2.x} ${cEdge2.y} L ${cOrigin.x} ${cOrigin.y}`);
                if (safe3) safe3.setAttribute('d', `M ${cEdge3.x} ${cEdge3.y} L ${cOrigin.x} ${cOrigin.y}`);

                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    // Flow malicious packets from Botnet -> Edges
                    const numPackets = 18;
                    for (let i = 0; i < numPackets; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet red';
                        container.appendChild(packet);

                        const route = i % 3;
                        const dest = route === 0 ? cEdge1 : (route === 1 ? cEdge2 : cEdge3);

                        const localProg = (progress * 5.0 + (i / numPackets)) % 1.0;
                        const pt = getLinearPoint(localProg, cBot, dest);

                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y}px`;
                    }

                    // Flow legitimate safe packets Edge -> Origin
                    if (progress > 0.25) {
                        for (let j = 0; j < 3; j++) {
                            const packet = document.createElement('div');
                            packet.className = 'v30-packet green';
                            container.appendChild(packet);

                            const src = j === 0 ? cEdge1 : (j === 1 ? cEdge2 : cEdge3);
                            const localProg = (progress * 2.5 + (j / 3)) % 1.0;
                            const pt = getLinearPoint(localProg, src, cOrigin);

                            packet.style.left = `${pt.x}px`;
                            packet.style.top = `${pt.y}px`;
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_4') {
            const stats = canvas.querySelector('#v30-waf-stats');
            const logRule = canvas.querySelector('#v30-waf-log-rule');
            const logAction = canvas.querySelector('#v30-waf-log-action');
            const container = canvas.querySelector('#v30-packets-container');

            const trafficNode = canvas.querySelector('#v30-traffic-node');
            const wafNode = canvas.querySelector('#v30-waf-node');
            const cleanNode = canvas.querySelector('#v30-clean-node');

            if (stats) {
                const count = Math.round(500 + progress * 2400);
                stats.textContent = `${count} Rules Blocked`;
            }

            if (logRule && logAction) {
                if (progress > 0.7) {
                    logRule.textContent = 'Bad User-Agent string';
                    logRule.style.color = 'var(--cf-yellow)';
                    logAction.textContent = 'BLOCK';
                    logAction.className = 'v30-status-badge red';
                } else if (progress > 0.4) {
                    logRule.textContent = 'SQL Injection Payload';
                    logRule.style.color = 'var(--cf-red)';
                    logAction.textContent = 'DROP';
                    logAction.className = 'v30-status-badge red';
                } else {
                    logRule.textContent = 'Cross-Site Scripting (XSS)';
                    logRule.style.color = 'var(--cf-orange)';
                    logAction.textContent = 'DROP';
                    logAction.className = 'v30-status-badge red';
                }
            }

            // Coordinate drawing and flow
            if (trafficNode && wafNode && cleanNode && zoomContainer) {
                const cTraffic = getNodeCenter(trafficNode, zoomContainer);
                const cWaf = getNodeCenter(wafNode, zoomContainer);
                const cClean = getNodeCenter(cleanNode, zoomContainer);

                // Update paths
                const path1 = canvas.querySelector('#v30-waf-path-1');
                const path2 = canvas.querySelector('#v30-waf-path-2');

                if (path1) path1.setAttribute('d', `M ${cTraffic.x} ${cTraffic.y} L ${cWaf.x} ${cWaf.y}`);
                if (path2) path2.setAttribute('d', `M ${cWaf.x} ${cWaf.y} L ${cClean.x} ${cClean.y}`);

                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = 16;
                    for (let i = 0; i < numPackets; i++) {
                        const isMalicious = (i % 3 !== 0); // 2/3 are bad
                        const packet = document.createElement('div');
                        packet.className = isMalicious ? 'v30-packet red' : 'v30-packet green';
                        container.appendChild(packet);

                        const localProg = (progress * 4 + (i / numPackets)) % 1.0;

                        if (isMalicious) {
                            // Blocks at WAF (localProg goes 0.0 -> 0.5 to reach WAF)
                            if (localProg < 0.5) {
                                const tNorm = localProg / 0.5;
                                const pt = getLinearPoint(tNorm, cTraffic, cWaf);
                                packet.style.left = `${pt.x}px`;
                                packet.style.top = `${pt.y}px`;
                                packet.style.opacity = `${1 - tNorm}`;
                            } else {
                                packet.style.display = 'none';
                            }
                        } else {
                            // Safe packet flows all the way Traffic -> WAF -> Clean
                            if (localProg < 0.5) {
                                const tNorm = localProg / 0.5;
                                const pt = getLinearPoint(tNorm, cTraffic, cWaf);
                                packet.style.left = `${pt.x}px`;
                                packet.style.top = `${pt.y}px`;
                            } else {
                                const tNorm = (localProg - 0.5) / 0.5;
                                const pt = getLinearPoint(tNorm, cWaf, cClean);
                                packet.style.left = `${pt.x}px`;
                                packet.style.top = `${pt.y}px`;
                            }
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_5') {
            const panel = canvas.querySelector('#v30-challenge-panel');
            const spinner = canvas.querySelector('#v30-challenge-spinner');
            const title = canvas.querySelector('#v30-challenge-title');
            const desc = canvas.querySelector('#v30-challenge-desc');

            const userNode = canvas.querySelector('#v30-user-node');
            const botNode = canvas.querySelector('#v30-bot-node');

            if (progress < 0.4) {
                if (spinner) spinner.style.display = 'block';
                if (title) title.textContent = 'Checking browser (JS Challenge)...';
                if (desc) desc.textContent = 'Verifying security token. Standby.';
                if (panel) panel.style.borderColor = 'var(--cf-border)';

                if (userNode) userNode.style.opacity = '0.4';
                if (botNode) botNode.style.opacity = '0.4';
            } else if (progress < 0.75) {
                // Real user passes
                if (spinner) spinner.style.display = 'none';
                if (title) title.innerHTML = '<span style="color: var(--cf-green);">✓ Verification Successful</span>';
                if (desc) desc.textContent = 'Security Token validated successfully. Redirecting...';
                if (panel) {
                    panel.style.borderColor = 'rgba(16, 185, 129, 0.45)';
                    panel.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
                }

                if (userNode) {
                    userNode.style.opacity = '1';
                    userNode.style.transform = 'scale(1.05)';
                }
                if (botNode) botNode.style.opacity = '0.3';
            } else {
                // Bot fails challenge
                if (spinner) spinner.style.display = 'none';
                if (title) title.innerHTML = '<span style="color: var(--cf-red);">✗ Verification Failed (403)</span>';
                if (desc) desc.textContent = 'Headless client detected. Request Blocked.';
                if (panel) {
                    panel.style.borderColor = 'rgba(239, 68, 68, 0.45)';
                    panel.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.2)';
                }

                if (userNode) {
                    userNode.style.opacity = '0.3';
                    userNode.style.transform = 'scale(1)';
                }
                if (botNode) {
                    botNode.style.opacity = '1';
                    botNode.style.transform = 'scale(1.05)';
                }
            }
        }
        else if (slideId === 'slide_cf_6') {
            const counter = canvas.querySelector('#v30-rate-counter');
            const rateBar = canvas.querySelector('#v30-rate-bar');
            const badge = canvas.querySelector('#v30-rate-badge');
            const shieldNode = canvas.querySelector('#v30-rate-shield-node');
            const shieldLabel = canvas.querySelector('#v30-rate-shield-label');
            const shieldDesc = canvas.querySelector('#v30-rate-shield-desc');
            const shieldIcon = canvas.querySelector('#v30-rate-shield-icon');
            const container = canvas.querySelector('#v30-packets-container');

            const ipNode = canvas.querySelector('#v30-rate-ip-node');

            // Scale request rate from 10 to 450 req/s
            const rate = Math.round(10 + progress * 440);
            if (counter) counter.textContent = `${rate} req/s`;

            const fillPct = Math.min(100, (rate / 100) * 100);
            if (rateBar) {
                rateBar.style.width = `${fillPct}%`;
                if (rate > 100) {
                    rateBar.className = 'v30-progress-fill danger';
                } else if (rate > 60) {
                    rateBar.className = 'v30-progress-fill warning';
                } else {
                    rateBar.className = 'v30-progress-fill';
                }
            }

            // Shield status transition
            if (rate <= 100) {
                if (badge) {
                    badge.textContent = 'SAFE';
                    badge.className = 'v30-status-badge green';
                }
                if (shieldNode) {
                    shieldNode.className = 'v30-node active-green';
                    shieldNode.style.boxShadow = '0 0 12px var(--cf-green-glow)';
                }
                if (shieldLabel) shieldLabel.textContent = 'ALLOW';
                if (shieldDesc) shieldDesc.textContent = 'Traffic Normal';
                if (shieldIcon) {
                    shieldIcon.innerHTML = '<i data-lucide="check"></i>';
                    initIcons();
                }
            } else {
                if (badge) {
                    badge.textContent = 'BLOCKED (429)';
                    badge.className = 'v30-status-badge red';
                }
                if (shieldNode) {
                    shieldNode.className = 'v30-node active-red';
                    shieldNode.style.boxShadow = '0 0 24px var(--cf-red-glow)';
                }
                if (shieldLabel) shieldLabel.textContent = 'BLOCKED';
                if (shieldDesc) shieldDesc.textContent = 'Threshold Exceeded';
                if (shieldIcon) {
                    shieldIcon.innerHTML = '<i data-lucide="lock"></i>';
                    initIcons();
                }
            }

            // Dynamic coordinates and flow
            if (ipNode && shieldNode && zoomContainer) {
                const cIp = getNodeCenter(ipNode, zoomContainer);
                const cShield = getNodeCenter(shieldNode, zoomContainer);

                const ratePath = canvas.querySelector('#v30-rate-path');
                if (ratePath) {
                    ratePath.setAttribute('d', `M ${cIp.x} ${cIp.y} L ${cShield.x} ${cShield.y}`);
                }

                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = Math.min(22, 4 + Math.round(progress * 22));
                    for (let i = 0; i < numPackets; i++) {
                        const isBlocked = (rate > 100);
                        const packet = document.createElement('div');
                        packet.className = isBlocked ? 'v30-packet red' : 'v30-packet green';
                        container.appendChild(packet);

                        const localProg = (progress * 5 + (i / numPackets)) % 1.0;
                        
                        if (isBlocked && localProg > 0.85) {
                            // Blocked at shield boundary
                            packet.style.display = 'none';
                        } else {
                            const pt = getLinearPoint(localProg, cIp, cShield);
                            packet.style.left = `${pt.x}px`;
                            packet.style.top = `${pt.y}px`;
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_7') {
            const dbStatus = canvas.querySelector('#v30-db-sync-status');
            const target2 = canvas.querySelector('#v30-target2-status');
            const target2Node = canvas.querySelector('#v30-threat-node-2');
            const logs = canvas.querySelectorAll('#v30-threat-logs .v30-threat-item');

            const tNode1 = canvas.querySelector('#v30-threat-node-1');
            const tDb = canvas.querySelector('#v30-threat-db');
            const tNode2 = canvas.querySelector('#v30-threat-node-2');

            // Sequentially trigger sync state
            if (progress > 0.7) {
                if (dbStatus) dbStatus.textContent = 'UPDATED (100%)';
                if (target2) {
                    target2.textContent = 'BLOCKED IP';
                    target2.style.color = 'var(--cf-red)';
                }
                if (target2Node) {
                    target2Node.className = 'v30-node active-red';
                    target2Node.style.boxShadow = '0 0 15px var(--cf-red-glow)';
                }
            } else if (progress > 0.35) {
                if (dbStatus) dbStatus.textContent = 'SYNCING (50%)';
                if (target2) {
                    target2.textContent = 'PROTECTED';
                    target2.style.color = 'var(--cf-yellow)';
                }
                if (target2Node) {
                    target2Node.className = 'v30-node active-yellow';
                    target2Node.style.boxShadow = '0 0 10px var(--cf-yellow-glow)';
                }
            } else {
                if (dbStatus) dbStatus.textContent = 'MONITORING';
                if (target2) {
                    target2.textContent = 'SAFE';
                    target2.style.color = 'var(--cf-green)';
                }
                if (target2Node) {
                    target2Node.className = 'v30-node active-green';
                    target2Node.style.boxShadow = 'none';
                }
            }

            // Sync log items opacity
            logs.forEach((log, idx) => {
                const threshold = (idx + 1) * 0.25;
                if (progress >= threshold) {
                    log.style.opacity = '1';
                    log.style.transform = 'translateX(0)';
                } else {
                    log.style.opacity = '0.2';
                    log.style.transform = 'translateX(-10px)';
                }
            });

            // Coordinate drawing
            if (tNode1 && tDb && tNode2 && zoomContainer) {
                const cNode1 = getNodeCenter(tNode1, zoomContainer);
                const cDb = getNodeCenter(tDb, zoomContainer);
                const cNode2 = getNodeCenter(tNode2, zoomContainer);

                const path1 = canvas.querySelector('#v30-threat-path-1');
                const path2 = canvas.querySelector('#v30-threat-path-2');

                if (path1) path1.setAttribute('d', `M ${cNode1.x} ${cNode1.y} L ${cDb.x} ${cDb.y}`);
                if (path2) path2.setAttribute('d', `M ${cDb.x} ${cDb.y} L ${cNode2.x} ${cNode2.y}`);
            }
        }
        else if (slideId === 'slide_cf_8') {
            const uniContainer = canvas.querySelector('#v30-unicast-packets');
            const anyContainer = canvas.querySelector('#v30-anycast-packets');
            const unicastCenter = canvas.querySelector('#v30-unicast-center');

            const uniBotUs = canvas.querySelector('#v30-uni-bot-us');
            const uniBotEu = canvas.querySelector('#v30-uni-bot-eu');

            const anyBotUs = canvas.querySelector('#v30-any-bot-us');
            const anyBotEu = canvas.querySelector('#v30-any-bot-eu');
            const anyNodeUs = canvas.querySelector('#v30-any-node-us');
            const anyNodeEu = canvas.querySelector('#v30-any-node-eu');

            // Unicast: center server shakes if congested
            if (unicastCenter) {
                if (progress > 0.4) {
                    const shakeAmount = Math.sin(Date.now() / 15) * 2;
                    unicastCenter.style.transform = `translateX(${shakeAmount}px)`;
                    unicastCenter.style.borderColor = 'var(--cf-red)';
                    unicastCenter.style.boxShadow = '0 0 24px var(--cf-red-glow)';
                } else {
                    unicastCenter.style.transform = 'none';
                    unicastCenter.style.borderColor = 'rgba(255,255,255,0.08)';
                    unicastCenter.style.boxShadow = 'none';
                }
            }

            // Unicast drawing & flow
            if (uniBotUs && uniBotEu && unicastCenter && zoomContainer) {
                const cBotUs = getNodeCenter(uniBotUs, zoomContainer);
                const cBotEu = getNodeCenter(uniBotEu, zoomContainer);
                const cCenter = getNodeCenter(unicastCenter, zoomContainer);

                const uPath1 = canvas.querySelector('#v30-unicast-path-1');
                const uPath2 = canvas.querySelector('#v30-unicast-path-2');

                if (uPath1) uPath1.setAttribute('d', `M ${cBotUs.x} ${cBotUs.y} L ${cCenter.x} ${cCenter.y}`);
                if (uPath2) uPath2.setAttribute('d', `M ${cBotEu.x} ${cBotEu.y} L ${cCenter.x} ${cCenter.y}`);

                if (uniContainer) {
                    const oldPackets = uniContainer.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = 12;
                    for (let i = 0; i < numPackets; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet red';
                        uniContainer.appendChild(packet);

                        const src = i % 2 === 0 ? cBotUs : cBotEu;
                        const localProg = (progress * 4 + (i / numPackets)) % 1.0;
                        const pt = getLinearPoint(localProg, src, cCenter);

                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y}px`;
                    }
                }
            }

            // Anycast drawing & flow
            if (anyBotUs && anyBotEu && anyNodeUs && anyNodeEu && zoomContainer) {
                const cBotUs = getNodeCenter(anyBotUs, zoomContainer);
                const cBotEu = getNodeCenter(anyBotEu, zoomContainer);
                const cNodeUs = getNodeCenter(anyNodeUs, zoomContainer);
                const cNodeEu = getNodeCenter(anyNodeEu, zoomContainer);

                const aPathLeft = canvas.querySelector('#v30-anycast-path-left');
                const aPathRight = canvas.querySelector('#v30-anycast-path-right');

                if (aPathLeft) aPathLeft.setAttribute('d', `M ${cBotUs.x} ${cBotUs.y} L ${cNodeUs.x} ${cNodeUs.y}`);
                if (aPathRight) aPathRight.setAttribute('d', `M ${cBotEu.x} ${cBotEu.y} L ${cNodeEu.x} ${cNodeEu.y}`);

                if (anyContainer) {
                    const oldPackets = anyContainer.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    const numPackets = 12;
                    for (let i = 0; i < numPackets; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet green';
                        anyContainer.appendChild(packet);

                        const isLeft = i % 2 === 0;
                        const src = isLeft ? cBotUs : cBotEu;
                        const dest = isLeft ? cNodeUs : cNodeEu;

                        const localProg = (progress * 3.5 + (i / numPackets)) % 1.0;
                        const pt = getLinearPoint(localProg, src, dest);

                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_9') {
            const ports = canvas.querySelector('#v30-tunnel-ports');
            const status = canvas.querySelector('#v30-tunnel-status');
            const lockIcon = canvas.querySelector('#v30-tunnel-lock-icon');
            const container = canvas.querySelector('#v30-packets-container');

            const edge = canvas.querySelector('#v30-tunnel-edge');
            const server = canvas.querySelector('#v30-tunnel-server');

            if (ports && status && lockIcon) {
                if (progress > 0.5) {
                    ports.textContent = 'IP: Hidden';
                    ports.style.color = 'var(--cf-green)';
                    status.textContent = 'All Inbound Closed';
                    status.style.color = 'var(--cf-green)';
                    lockIcon.innerHTML = '<i data-lucide="shield-check" style="color: var(--cf-green);"></i>';
                    initIcons();
                } else {
                    ports.textContent = 'Ports Blocked';
                    ports.style.color = 'var(--cf-red)';
                    status.textContent = 'Tunnel Active';
                    status.style.color = 'var(--cf-text-muted)';
                    lockIcon.innerHTML = '<i data-lucide="lock"></i>';
                    initIcons();
                }
            }

            // Draw tunnel line and label dynamically
            if (edge && server && zoomContainer) {
                const cEdge = getNodeCenter(edge, zoomContainer);
                const cServer = getNodeCenter(server, zoomContainer);

                const tunnelLine = canvas.querySelector('#v30-tunnel-svg-line');
                const tunnelLineBg = canvas.querySelector('#v30-tunnel-svg-line-bg');
                const label = canvas.querySelector('#v30-tunnel-label');

                if (tunnelLine) tunnelLine.setAttribute('d', `M ${cEdge.x} ${cEdge.y} L ${cServer.x} ${cServer.y}`);
                if (tunnelLineBg) tunnelLineBg.setAttribute('d', `M ${cEdge.x} ${cEdge.y} L ${cServer.x} ${cServer.y}`);

                if (label) {
                    label.style.left = `${(cEdge.x + cServer.x) / 2 - 40}px`;
                    label.style.top = `${(cEdge.y + cServer.y) / 2 + 16}px`;
                }

                // Public packets bounce off Edge node; tunnel packets flow internally
                if (container) {
                    const oldPackets = container.querySelectorAll('.v30-packet');
                    oldPackets.forEach(p => p.remove());

                    // Draw dynamic tunnel packets (internal)
                    for (let j = 0; j < 4; j++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet green';
                        container.appendChild(packet);

                        const localProg = (progress * 2.5 + (j / 4)) % 1.0;
                        const pt = getLinearPoint(localProg, cEdge, cServer);

                        packet.style.left = `${pt.x}px`;
                        packet.style.top = `${pt.y}px`;
                    }

                    // Public attack packets targeting CF Edge (cEdge.x, cEdge.y) and bouncing
                    const attackPath = canvas.querySelector('#v30-tunnel-attack-path');
                    // Dynamic attack path starts at (cEdge.x - 70, cEdge.y - 50) and curved to Edge
                    const startX = cEdge.x - 70;
                    const startY = cEdge.y - 60;
                    const controlX = cEdge.x - 20;
                    const controlY = cEdge.y - 20;

                    if (attackPath) {
                        attackPath.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${cEdge.x} ${cEdge.y}`);
                    }

                    for (let i = 0; i < 3; i++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet red';
                        container.appendChild(packet);

                        const localProg = (progress * 3.0 + (i / 3)) % 1.0;
                        
                        if (localProg < 0.65) {
                            const tNorm = localProg / 0.65;
                            const pt = getBezierPoint(tNorm, { x: startX, y: startY }, { x: controlX, y: controlY }, cEdge);
                            packet.style.left = `${pt.x}px`;
                            packet.style.top = `${pt.y}px`;
                        } else {
                            // Bounce off Edge boundary
                            const tBounce = (localProg - 0.65) / 0.35;
                            const bounceEndX = cEdge.x - 30;
                            const bounceEndY = cEdge.y - 25;
                            const pt = getLinearPoint(tBounce, cEdge, { x: bounceEndX, y: bounceEndY });
                            packet.style.left = `${pt.x}px`;
                            packet.style.top = `${pt.y}px`;
                            packet.style.opacity = `${1 - tBounce}`;
                        }
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_10') {
            const c1 = canvas.querySelector('#v30-cta-1');
            const c2 = canvas.querySelector('#v30-cta-2');
            const c3 = canvas.querySelector('#v30-cta-3');

            // Sequentially scale and light up CTA items
            if (c1) {
                if (progress > 0.15) {
                    c1.style.opacity = '1';
                    c1.style.transform = 'scale(1.02)';
                    c1.style.borderColor = 'var(--cf-orange)';
                    c1.style.background = 'rgba(243, 128, 32, 0.08)';
                } else {
                    c1.style.opacity = '0.3';
                    c1.style.transform = 'scale(0.95)';
                    c1.style.borderColor = 'rgba(255,255,255,0.06)';
                    c1.style.background = 'rgba(255, 255, 255, 0.03)';
                }
            }

            if (c2) {
                if (progress > 0.45) {
                    c2.style.opacity = '1';
                    c2.style.transform = 'scale(1.02)';
                    c2.style.borderColor = 'var(--cf-orange)';
                    c2.style.background = 'rgba(243, 128, 32, 0.08)';
                } else {
                    c2.style.opacity = '0.3';
                    c2.style.transform = 'scale(0.95)';
                    c2.style.borderColor = 'rgba(255,255,255,0.06)';
                    c2.style.background = 'rgba(255, 255, 255, 0.03)';
                }
            }

            if (c3) {
                if (progress > 0.75) {
                    c3.style.opacity = '1';
                    c3.style.transform = 'scale(1.02)';
                    c3.style.borderColor = 'var(--cf-orange)';
                    c3.style.background = 'rgba(243, 128, 32, 0.08)';
                } else {
                    c3.style.opacity = '0.3';
                    c3.style.transform = 'scale(0.95)';
                    c3.style.borderColor = 'rgba(255,255,255,0.06)';
                    c3.style.background = 'rgba(255, 255, 255, 0.03)';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video30',
        topic: 'How Cloudflare mitigates millions of DDoS requests per second',
        episodeNum: 30,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video30 Plugin] Loaded: CLOUDFLARE DDoS PROTECTION 10 slides ready.');
})();
