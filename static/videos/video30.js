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
                    <!-- Botnet & Server Flow -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 180px;">
                        
                        <!-- SVG paths for visual lines -->
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <path id="v30-path-1" d="M 50 40 Q 120 70 210 90" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="2" />
                            <path id="v30-path-2" d="M 50 90 L 210 90" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="2" />
                            <path id="v30-path-3" d="M 50 140 Q 120 110 210 90" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="2" />
                        </svg>

                        <!-- Botnet Nodes -->
                        <div style="display: flex; flex-direction: column; gap: 14px; z-index: 2;">
                            <div class="v30-node active-red" style="width: 70px;">
                                <div class="v30-node-icon"><i data-lucide="skull"></i></div>
                                <div class="v30-node-label">Bot 1</div>
                            </div>
                            <div class="v30-node active-red" style="width: 70px;">
                                <div class="v30-node-icon"><i data-lucide="skull"></i></div>
                                <div class="v30-node-label">Bot 2</div>
                            </div>
                            <div class="v30-node active-red" style="width: 70px;">
                                <div class="v30-node-icon"><i data-lucide="skull"></i></div>
                                <div class="v30-node-label">Bot 3</div>
                            </div>
                        </div>

                        <!-- Target Server -->
                        <div class="v30-node active-blue" id="v30-target-server" style="width: 90px; height: 120px; z-index: 2; align-self: center;">
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
                    <div class="v30-glass-card" style="padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(239, 68, 68, 0.2);">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="v30-status-badge red" id="v30-status-1"><i data-lucide="alert-triangle"></i> Ddos attack</span>
                        </div>
                        <div style="font-family: 'Fira Code', monospace; font-size: 11px; font-weight: 700; color: var(--cf-red);" id="v30-traffic-count">
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
                    <!-- Direct overload layout -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 180px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <path d="M 40 50 Q 110 70 220 90" fill="none" stroke="rgba(239, 68, 68, 0.3)" stroke-width="2.5" />
                            <path d="M 40 90 L 220 90" fill="none" stroke="rgba(239, 68, 68, 0.3)" stroke-width="2.5" />
                            <path d="M 40 130 Q 110 110 220 90" fill="none" stroke="rgba(239, 68, 68, 0.3)" stroke-width="2.5" />
                        </svg>

                        <!-- High density botnet source -->
                        <div class="v30-node active-red" style="width: 80px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="zap-off"></i></div>
                            <div class="v30-node-label">Botnet</div>
                            <div class="v30-node-desc">10,000 Nodes</div>
                        </div>

                        <!-- Crashing Server -->
                        <div class="v30-node active-blue" id="v30-crash-server" style="width: 90px; height: 120px; z-index: 2;">
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
                    <div class="v30-glass-card" id="v30-error-toast" style="padding: 12px; text-align: center; border-color: rgba(255, 255, 255, 0.08); transition: all 0.4s;">
                        <span style="font-family: 'Fira Code', monospace; font-size: 13px; font-weight: 800; color: var(--cf-text-muted);" id="v30-error-text">
                            HTTP Status: 200 OK
                        </span>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_3') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 14px;">
                    <!-- Anycast Routing Architecture -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 220px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <!-- Botnet to Edge Nodes -->
                            <path d="M 45 60 L 125 40" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="1.5" />
                            <path d="M 45 110 L 125 110" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="1.5" />
                            <path d="M 45 160 L 125 180" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="1.5" />

                            <!-- Edge Nodes to Origin Server (Filtered/No traffic) -->
                            <path d="M 195 40 L 255 110" fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1.5" stroke-dasharray="3 3" />
                            <path d="M 195 110 L 255 110" fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1.5" stroke-dasharray="3 3" />
                            <path d="M 195 180 L 255 110" fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1.5" stroke-dasharray="3 3" />
                        </svg>

                        <!-- Botnet Source -->
                        <div class="v30-node active-red" style="width: 70px; z-index: 2; padding: 8px;">
                            <div class="v30-node-icon" style="width:30px; height:30px; margin-bottom:4px;"><i data-lucide="skull" style="width:16px; height:16px;"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Botnet</div>
                        </div>

                        <!-- 3 Edge Centers -->
                        <div style="display: flex; flex-direction: column; gap: 12px; z-index: 2;">
                            <div class="v30-node active-orange" id="v30-edge-1" style="width: 70px; padding: 6px;">
                                <div class="v30-node-icon" style="width:28px; height:28px; margin-bottom:4px;"><i data-lucide="shield" style="width:14px; height:14px;"></i></div>
                                <div class="v30-node-label" style="font-size:8px;">Edge US</div>
                            </div>
                            <div class="v30-node active-orange" id="v30-edge-2" style="width: 70px; padding: 6px;">
                                <div class="v30-node-icon" style="width:28px; height:28px; margin-bottom:4px;"><i data-lucide="shield" style="width:14px; height:14px;"></i></div>
                                <div class="v30-node-label" style="font-size:8px;">Edge EU</div>
                            </div>
                            <div class="v30-node active-orange" id="v30-edge-3" style="width: 70px; padding: 6px;">
                                <div class="v30-node-icon" style="width:28px; height:28px; margin-bottom:4px;"><i data-lucide="shield" style="width:14px; height:14px;"></i></div>
                                <div class="v30-node-label" style="font-size:8px;">Edge AS</div>
                            </div>
                        </div>

                        <!-- Safe Origin Server -->
                        <div class="v30-node active-green" id="v30-origin-server" style="width: 70px; z-index: 2; padding: 8px; align-self: center;">
                            <div class="v30-node-icon" style="width:30px; height:30px; margin-bottom:4px;"><i data-lucide="server" style="width:16px; height:16px;"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Origin</div>
                            <div class="v30-node-desc" style="font-size:7px;" id="v30-origin-load">Load: 0%</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Routing Alert -->
                    <div class="v30-glass-card" style="padding: 10px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(59, 130, 246, 0.2);">
                        <span class="v30-status-badge orange" style="font-size: 8px;"><i data-lucide="globe"></i> Anycast Routing</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 10px; color: var(--cf-green);" id="v30-routing-status">
                            Traffic Distributed Globally
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_4') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 16px;">
                    <!-- WAF Filter Screen -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 180px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <path d="M 40 90 L 260 90" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="2" />
                        </svg>

                        <!-- Incoming Traffic -->
                        <div class="v30-node active-orange" style="width: 70px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="activity"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Traffic</div>
                        </div>

                        <!-- WAF Core Filter Node -->
                        <div class="v30-node active-yellow" id="v30-waf-node" style="width: 100px; height: 120px; z-index: 2; position: relative; overflow: hidden;">
                            <div class="v30-waf-laser"></div>
                            <div class="v30-node-icon"><i data-lucide="brick-wall"></i></div>
                            <div class="v30-node-label" style="font-size:11px;">WAF Shield</div>
                            <div class="v30-node-desc" style="font-size:7px; margin-top:4px;" id="v30-waf-stats">Rules Active</div>
                        </div>

                        <!-- Clean Server -->
                        <div class="v30-node active-green" style="width: 70px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="check-circle-2"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Clean</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- WAF Log Table -->
                    <div class="v30-glass-card" style="padding: 10px; font-family: 'Fira Code', monospace; font-size: 9px; display: flex; flex-direction: column; gap: 4px;">
                        <div style="display: flex; justify-content: space-between; color: var(--cf-text-muted); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
                            <span>RULE TYPE</span>
                            <span>ACTION</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
                            <span style="color: var(--cf-red);" id="v30-waf-log-rule">SQL Injection Pattern</span>
                            <span class="v30-status-badge red" style="font-size: 7px; padding: 2px 4px;" id="v30-waf-log-action">DROP</span>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_5') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 16px;">
                    <!-- JS Challenge Panel Mockup -->
                    <div class="v30-glass-card" style="width: 100%; border-color: rgba(255, 255, 255, 0.08); padding: 16px 20px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(255, 255, 255, 0.06); padding-bottom: 10px; margin-bottom: 12px;">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></div>
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></div>
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></div>
                            </div>
                            <span style="font-size: 10px; color: var(--cf-text-muted); font-weight: 600; font-family: 'Fira Code', monospace;">cloudflare_challenge.html</span>
                            <i data-lucide="lock" style="width: 12px; height: 12px; color: var(--cf-green);"></i>
                        </div>

                        <!-- Verification Area -->
                        <div class="v30-challenge-box" id="v30-challenge-panel">
                            <div class="v30-spinner" id="v30-challenge-spinner"></div>
                            <div style="font-size: 12px; font-weight: 800; text-align: center; color: var(--cf-text);" id="v30-challenge-title">
                                Checking your browser...
                            </div>
                            <div style="font-size: 9px; text-align: center; color: var(--cf-text-muted);" id="v30-challenge-desc">
                                This process is automatic. Please wait 1-2 seconds.
                            </div>
                        </div>
                    </div>

                    <!-- Client node validation status -->
                    <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 4px;">
                        <div class="v30-node active-green" id="v30-user-node" style="width: 100px; padding: 8px; opacity: 0.5;">
                            <div class="v30-node-icon" style="width:30px; height:30px; margin-bottom:4px;"><i data-lucide="user"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Real User</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-green);" id="v30-user-status">Passed</div>
                        </div>

                        <div class="v30-node active-red" id="v30-bot-node" style="width: 100px; padding: 8px; opacity: 0.5;">
                            <div class="v30-node-icon" style="width:30px; height:30px; margin-bottom:4px;"><i data-lucide="bot"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Headless Bot</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-red);" id="v30-bot-status">Blocked</div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_6') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- Rate Limiting Demo -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 150px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <path d="M 50 75 L 210 75" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="2" />
                        </svg>

                        <!-- Requester IP -->
                        <div class="v30-node active-blue" id="v30-rate-ip-node" style="width: 100px;">
                            <div class="v30-node-icon"><i data-lucide="fingerprint"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">IP Source</div>
                            <div class="v30-node-desc" style="font-family: 'Fira Code', monospace; font-size:7px;">198.51.100.42</div>
                        </div>

                        <!-- Guard Shield -->
                        <div class="v30-node active-green" id="v30-rate-shield-node" style="width: 100px;">
                            <div class="v30-node-icon" id="v30-rate-shield-icon"><i data-lucide="check"></i></div>
                            <div class="v30-node-label" id="v30-rate-shield-label" style="font-size:9px;">ALLOW</div>
                            <div class="v30-node-desc" id="v30-rate-shield-desc" style="font-size:7px;">Traffic Normal</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Rate Monitor Card -->
                    <div class="v30-glass-card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 10px; font-weight: 800; color: var(--cf-text-muted);">REQUEST FREQUENCY</span>
                            <span class="v30-status-badge green" id="v30-rate-badge" style="font-size: 9px; font-weight: 900;">SAFE</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-size: 20px; font-weight: 900; font-family: 'Fira Code', monospace; color: var(--cf-text);" id="v30-rate-counter">12 req/s</span>
                            <span style="font-size: 9px; color: var(--cf-text-muted);">Threshold: 100 req/s</span>
                        </div>

                        <div class="v30-progress-bar" style="height: 8px;">
                            <div class="v30-progress-fill" id="v30-rate-bar" style="width: 12%;"></div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_7') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: flex-start; padding-top: 10px; gap: 16px;">
                    <div style="font-size:12px; font-weight:800; color:var(--cf-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Global Threat Intelligence
                    </div>

                    <!-- Network Map Node Diagram -->
                    <div style="display: flex; justify-content: space-around; width: 100%; position: relative; height: 110px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <path d="M 60 55 L 140 55" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3" />
                            <path d="M 220 55 L 140 55" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3" />
                        </svg>

                        <div class="v30-node active-red" id="v30-threat-node-1" style="width: 66px; padding: 6px;">
                            <div class="v30-node-icon" style="width:26px; height:26px; margin-bottom:2px;"><i data-lucide="skull" style="width:12px; height:12px;"></i></div>
                            <div class="v30-node-label" style="font-size:8px;">Target A</div>
                            <div class="v30-node-desc" style="font-size:6px; color: var(--cf-red);">ATTACKED</div>
                        </div>

                        <!-- Central Database Sync -->
                        <div class="v30-node active-yellow" id="v30-threat-db" style="width: 80px; padding: 6px;">
                            <div class="v30-node-icon" style="width:28px; height:28px; margin-bottom:2px;"><i data-lucide="database" style="width:14px; height:14px;"></i></div>
                            <div class="v30-node-label" style="font-size:8px;">Threat DB</div>
                            <div class="v30-node-desc" style="font-size:6px; color: var(--cf-yellow);" id="v30-db-sync-status">SYNCED</div>
                        </div>

                        <div class="v30-node active-green" id="v30-threat-node-2" style="width: 66px; padding: 6px;">
                            <div class="v30-node-icon" style="width:26px; height:26px; margin-bottom:2px;"><i data-lucide="shield-check" style="width:12px; height:12px;"></i></div>
                            <div class="v30-node-label" style="font-size:8px;">Target B</div>
                            <div class="v30-node-desc" style="font-size:6px; color: var(--cf-green);" id="v30-target2-status">SAFE</div>
                        </div>
                    </div>

                    <!-- Threat Logs Dashboard -->
                    <div class="v30-threat-list" id="v30-threat-logs">
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 45.223.11.9</span>
                            <span style="color: var(--cf-red);">BLOCKED (US)</span>
                        </div>
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 185.90.2.14</span>
                            <span style="color: var(--cf-red);">BLOCKED (EU)</span>
                        </div>
                        <div class="v30-threat-item blocked" style="opacity: 0.3;">
                            <span style="color: var(--cf-text-muted);">IP 91.200.4.88</span>
                            <span style="color: var(--cf-red);">BLOCKED (AS)</span>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_8') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 14px;">
                    <div class="v30-comparison-grid">
                        <!-- Unicast column -->
                        <div class="v30-comparison-col" id="v30-unicast-col" style="position: relative; height: 260px; justify-content: space-between;">
                            <div style="font-size: 11px; font-weight: 800; color: var(--cf-red); letter-spacing: 0.5px;">UNICAST</div>
                            
                            <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                                <path d="M 25 100 L 65 140" fill="none" stroke="rgba(239, 68, 68, 0.2)" stroke-width="1.5" />
                                <path d="M 110 100 L 70 140" fill="none" stroke="rgba(239, 68, 68, 0.2)" stroke-width="1.5" />
                            </svg>

                            <div style="display: flex; gap: 30px; z-index: 2;">
                                <div class="v30-node active-red" style="width: 40px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="skull" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">US</span>
                                </div>
                                <div class="v30-node active-red" style="width: 40px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="skull" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">EU</span>
                                </div>
                            </div>

                            <!-- Single Central Node -->
                            <div class="v30-node active-red" id="v30-unicast-center" style="width: 60px; padding: 6px; z-index: 2; margin-bottom: 20px;">
                                <div class="v30-node-icon" style="width:24px; height:24px; margin-bottom:2px;"><i data-lucide="server" style="width:12px; height:12px;"></i></div>
                                <span style="font-size: 8px;">HQ Server</span>
                                <span style="font-size: 6px; color: var(--cf-red); font-weight: 700; margin-top:2px;">CONGESTED</span>
                            </div>
                        </div>

                        <!-- Anycast column -->
                        <div class="v30-comparison-col" id="v30-anycast-col" style="position: relative; height: 260px; justify-content: space-between; border-color: var(--cf-green);">
                            <div style="font-size: 11px; font-weight: 800; color: var(--cf-green); letter-spacing: 0.5px;">ANYCAST</div>
                            
                            <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                                <path d="M 25 100 L 25 140" fill="none" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1.5" />
                                <path d="M 110 100 L 110 140" fill="none" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1.5" />
                            </svg>

                            <div style="display: flex; gap: 30px; z-index: 2;">
                                <div class="v30-node active-red" style="width: 40px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="skull" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">US</span>
                                </div>
                                <div class="v30-node active-red" style="width: 40px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="skull" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">EU</span>
                                </div>
                            </div>

                            <!-- Two distributed servers -->
                            <div style="display: flex; gap: 24px; z-index: 2; margin-bottom: 20px;">
                                <div class="v30-node active-green" style="width: 46px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="server" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">Node US</span>
                                </div>
                                <div class="v30-node active-green" style="width: 46px; padding: 4px;">
                                    <div class="v30-node-icon" style="width:22px; height:22px; margin-bottom:2px;"><i data-lucide="server" style="width:12px; height:12px;"></i></div>
                                    <span style="font-size: 7px;">Node EU</span>
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
                <div class="v30-zoom-container" style="justify-content: center; gap: 16px;">
                    <!-- Cloudflare Tunnel Architecture -->
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; height: 180px;">
                        
                        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                            <!-- Public Internet Attacking Paths (Blocked) -->
                            <path d="M 45 40 Q 120 70 215 90" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="1.5" />
                            
                            <!-- Inside Tunnel Secure Flow (Outbound reverse tunnel) -->
                            <path class="v30-tunnel-line" d="M 125 120 L 215 120" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round" />
                            <path d="M 125 120 L 215 120" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="2" />
                        </svg>

                        <!-- Cloudflare Edge Center -->
                        <div class="v30-node active-orange" style="width: 80px; height: 120px; z-index: 2;">
                            <div class="v30-node-icon"><i data-lucide="cloud"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">CF Edge</div>
                            <div class="v30-node-desc" style="font-size:7px;">Public Proxy</div>
                        </div>

                        <!-- Connector label over tunnel -->
                        <div style="position: absolute; left: 95px; top: 138px; font-size: 8px; font-weight: 800; color: var(--cf-green); font-family: 'Fira Code', monospace; z-index: 3;">
                            CF Tunnel (Outbound Only)
                        </div>

                        <!-- Safe Origin Server behind firewall -->
                        <div class="v30-node active-green" style="width: 80px; height: 120px; z-index: 2;">
                            <div class="v30-node-icon" id="v30-tunnel-lock-icon"><i data-lucide="lock"></i></div>
                            <div class="v30-node-label" style="font-size:9px;">Server</div>
                            <div class="v30-node-desc" style="font-size:7px; color: var(--cf-red);" id="v30-tunnel-ports">Inbound: Blocked</div>
                        </div>
                    </div>

                    <div id="v30-packets-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 5;"></div>

                    <!-- Secure Shield Badge -->
                    <div class="v30-glass-card" style="padding: 10px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(16, 185, 129, 0.2);">
                        <span class="v30-status-badge green" style="font-size: 8px;"><i data-lucide="shield-check"></i> Ports Closed</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 10px; color: var(--cf-text-muted);" id="v30-tunnel-status">
                            No Public IP Exposed
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_cf_10') {
            canvas.innerHTML = `
                <div class="v30-zoom-container" style="justify-content: center; gap: 20px;">
                    <div style="text-align: center; margin-bottom: 4px;">
                        <div style="font-size: 20px; font-weight: 900; color: var(--cf-orange); text-transform: uppercase; letter-spacing: 0.5px;">Turnio.dev</div>
                        <div style="font-size: 9px; color: var(--cf-text-muted); margin-top: 2px;">KIẾN THỨC HỆ THỐNG THỰC CHIẾN</div>
                    </div>

                    <!-- Glass Card listing Call to Actions -->
                    <div class="v30-glass-card" style="border-color: rgba(243, 128, 32, 0.25); box-shadow: 0 8px 32px rgba(243, 128, 32, 0.15); width: 100%;">
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

                    <div style="display: flex; gap: 14px; font-size: 10px; color: var(--cf-text-muted); font-weight: 600;">
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
        if (slideId === 'slide_cf_1') {
            const serverLoadText = canvas.querySelector('#v30-server-load-text');
            const serverLoadFill = canvas.querySelector('#v30-server-load-fill');
            const targetServer = canvas.querySelector('#v30-target-server');
            const statusBadge = canvas.querySelector('#v30-status-1');
            const trafficCount = canvas.querySelector('#v30-traffic-count');
            const container = canvas.querySelector('#v30-packets-container');

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
                    targetServer.style.boxShadow = '0 0 20px var(--cf-red-glow)';
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

            // Spawn particles
            if (container) {
                // Clear out of date packets
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                // Generate new flowing particles based on progress phase
                const numPackets = Math.min(25, 4 + Math.round(progress * 25));
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet red';
                    container.appendChild(packet);

                    // Compute random offset along the paths to server
                    // Server is approximately at x = 235px, y = 90px
                    // Bots are at x = 50px, and y = 40, 90, 140
                    const startYOptions = [40, 90, 140];
                    const startY = startYOptions[i % 3];
                    const startX = 50;
                    const endX = 225;
                    const endY = 90;

                    // Compute current position along path based on progress + index fraction
                    const localProg = (progress * 5 + (i / numPackets)) % 1.0;
                    const curX = startX + (endX - startX) * localProg;
                    let curY = startY + (endY - startY) * localProg;

                    // Add nice wave variation
                    if (startY !== 90) {
                        const midX = (startX + endX) / 2;
                        const controlY = startY === 40 ? 70 : 110;
                        // Quadratic bezier
                        const t = localProg;
                        curY = (1-t)*(1-t)*startY + 2*(1-t)*t*controlY + t*t*endY;
                    }

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${curY}px`;
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

            // Transition from normal load to complete failure
            if (progress < 0.3) {
                if (server) {
                    server.className = 'v30-node active-red';
                    server.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
                }
                if (serverLabel) serverLabel.textContent = 'Server';
                if (serverDesc) serverDesc.textContent = 'Load: 92%';
                if (serverFill) {
                    serverFill.style.width = '92%';
                    serverFill.className = 'v30-progress-fill danger';
                }
                if (toast) {
                    toast.style.borderColor = 'rgba(255,255,255,0.08)';
                    toast.style.background = 'rgba(15,22,42,0.55)';
                }
                if (errorText) {
                    errorText.textContent = 'HTTP Status: 200 OK';
                    errorText.style.color = 'var(--cf-text-muted)';
                }
            } else {
                // SẬP
                if (server) {
                    server.className = 'v30-node active-red';
                    server.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.8)';
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
                    toast.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                    toast.style.background = 'rgba(239, 68, 68, 0.08)';
                    toast.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
                }
                if (errorText) {
                    errorText.textContent = '502 BAD GATEWAY (TIMEOUT)';
                    errorText.style.color = 'var(--cf-red)';
                }
            }

            // Spawn aggressive packets hitting the server
            if (container) {
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                // Stop packets if crashed to show it is dead, or keep hitting
                // Let's keep them hitting to show relentless force
                const numPackets = 20;
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet red';
                    container.appendChild(packet);

                    const startX = 85;
                    const startYOptions = [60, 90, 120];
                    const startY = startYOptions[i % 3];
                    const endX = 230;
                    const endY = 90;

                    const localProg = (progress * 7 + (i / numPackets)) % 1.0;
                    const curX = startX + (endX - startX) * localProg;
                    const curY = startY + (endY - startY) * localProg;

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${curY}px`;
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

            // Edge Nodes pulsing
            if (edge1 && edge2 && edge3) {
                edge1.className = progress > 0.2 ? 'v30-node active-orange' : 'v30-node';
                edge2.className = progress > 0.4 ? 'v30-node active-orange' : 'v30-node';
                edge3.className = progress > 0.6 ? 'v30-node active-orange' : 'v30-node';
            }

            if (origin && originLoad) {
                origin.className = 'v30-node active-green';
                origin.style.boxShadow = '0 0 10px var(--cf-green-glow)';
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

            // Spawn particles: botnet -> Edges. None -> Origin.
            if (container) {
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                const numPackets = 18;
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet red';
                    container.appendChild(packet);

                    const startX = 40;
                    const startYOptions = [60, 110, 160];
                    const startY = startYOptions[i % 3];

                    // Destination is one of the three edges
                    // Edge US: (160, 40)
                    // Edge EU: (160, 110)
                    // Edge AS: (160, 180)
                    const endX = 150;
                    const destYOptions = [40, 110, 180];
                    const endY = destYOptions[i % 3];

                    const localProg = (progress * 4 + (i / numPackets)) % 1.0;
                    const curX = startX + (endX - startX) * localProg;
                    const curY = startY + (endY - startY) * localProg;

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${curY}px`;
                }

                // Add 1-2 green packets flowing from Edges to Origin representing legitimate requests getting through
                if (progress > 0.2) {
                    for (let j = 0; j < 2; j++) {
                        const packet = document.createElement('div');
                        packet.className = 'v30-packet green';
                        container.appendChild(packet);

                        const startX = 160;
                        const startYOptions = [40, 110, 180];
                        const startY = startYOptions[j % 3];
                        const endX = 245;
                        const endY = 110;

                        const localProg = (progress * 2 + (j / 2)) % 1.0;
                        const curX = startX + (endX - startX) * localProg;
                        const curY = startY + (endY - startY) * localProg;

                        packet.style.left = `${curX}px`;
                        packet.style.top = `${curY}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_4') {
            const stats = canvas.querySelector('#v30-waf-stats');
            const logRule = canvas.querySelector('#v30-waf-log-rule');
            const logAction = canvas.querySelector('#v30-waf-log-action');
            const container = canvas.querySelector('#v30-packets-container');

            // Dynamic rule changes in logger
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

            // Packet flow: red packets turn red/yellow, hit WAF shield, and disappear
            // Green packets pass right through to server
            if (container) {
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                const numPackets = 15;
                for (let i = 0; i < numPackets; i++) {
                    const isMalicious = (i % 3 !== 0); // 2/3 are bad, 1/3 is good
                    const packet = document.createElement('div');
                    packet.className = isMalicious ? 'v30-packet red' : 'v30-packet green';
                    container.appendChild(packet);

                    const startX = 60;
                    const startY = 90;
                    const midX = 145; // WAF Center
                    const endX = 250;

                    const localProg = (progress * 3.5 + (i / numPackets)) % 1.0;

                    if (isMalicious) {
                        // Malicious packets flow to WAF and dissolve/fade
                        if (localProg < 0.5) {
                            const curX = startX + (midX - startX) * (localProg / 0.5);
                            packet.style.left = `${curX}px`;
                            packet.style.top = `${startY}px`;
                            packet.style.opacity = `${1 - (localProg / 0.5)}`;
                        } else {
                            packet.style.display = 'none';
                        }
                    } else {
                        // Safe packets flow all the way to server
                        const curX = startX + (endX - startX) * localProg;
                        packet.style.left = `${curX}px`;
                        packet.style.top = `${startY}px`;
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
                    panel.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    panel.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.15)';
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
                    panel.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    panel.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.15)';
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

            // Shield status transition when rate > 100 threshold
            if (rate <= 100) {
                if (badge) {
                    badge.textContent = 'SAFE';
                    badge.className = 'v30-status-badge green';
                }
                if (shieldNode) {
                    shieldNode.className = 'v30-node active-green';
                    shieldNode.style.boxShadow = '0 0 10px var(--cf-green-glow)';
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
                    shieldNode.style.boxShadow = '0 0 20px var(--cf-red-glow)';
                }
                if (shieldLabel) shieldLabel.textContent = 'BLOCKED';
                if (shieldDesc) shieldDesc.textContent = 'Threshold Exceeded';
                if (shieldIcon) {
                    shieldIcon.innerHTML = '<i data-lucide="lock"></i>';
                    initIcons();
                }
            }

            // Packet flow. As rate increases, make them fly faster and more red
            if (container) {
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                const numPackets = Math.min(22, 3 + Math.round(progress * 22));
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    // If blocked (progress > 0.25 equivalent), packets bounce or stop at shield
                    const isBlocked = (rate > 100);
                    packet.className = isBlocked ? 'v30-packet red' : 'v30-packet green';
                    container.appendChild(packet);

                    const startX = 90;
                    const startY = 75;
                    const endX = 200; // Shield position

                    const localProg = (progress * 5 + (i / numPackets)) % 1.0;
                    if (isBlocked && localProg > 0.8) {
                        // Drop them at shield
                        packet.style.display = 'none';
                    } else {
                        const curX = startX + (endX - startX) * localProg;
                        packet.style.left = `${curX}px`;
                        packet.style.top = `${startY}px`;
                    }
                }
            }
        }
        else if (slideId === 'slide_cf_7') {
            const dbStatus = canvas.querySelector('#v30-db-sync-status');
            const target2 = canvas.querySelector('#v30-target2-status');
            const target2Node = canvas.querySelector('#v30-threat-node-2');
            const logs = canvas.querySelectorAll('#v30-threat-logs .v30-threat-item');

            // Sequentially trigger synchronization states
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
        }
        else if (slideId === 'slide_cf_8') {
            const uniContainer = canvas.querySelector('#v30-unicast-packets');
            const anyContainer = canvas.querySelector('#v30-anycast-packets');
            const unicastCenter = canvas.querySelector('#v30-unicast-center');

            // Unicast: packets converge at server and shake
            if (unicastCenter) {
                if (progress > 0.4) {
                    const shakeAmount = Math.sin(Date.now() / 15) * 2;
                    unicastCenter.style.transform = `translateX(${shakeAmount}px)`;
                    unicastCenter.style.borderColor = 'var(--cf-red)';
                    unicastCenter.style.boxShadow = '0 0 20px var(--cf-red-glow)';
                } else {
                    unicastCenter.style.transform = 'none';
                    unicastCenter.style.borderColor = 'rgba(255,255,255,0.08)';
                    unicastCenter.style.boxShadow = 'none';
                }
            }

            // Unicast packets
            if (uniContainer) {
                const oldPackets = uniContainer.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                const numPackets = 12;
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet red';
                    uniContainer.appendChild(packet);

                    // Starts from clients (left: 20px & 110px) to server (middle: 67px)
                    const startX = (i % 2 === 0) ? 25 : 110;
                    const startY = 100;
                    const endX = 67;
                    const endY = 220;

                    const localProg = (progress * 3.5 + (i / numPackets)) % 1.0;
                    const curX = startX + (endX - startX) * localProg;
                    const curY = startY + (endY - startY) * localProg;

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${curY}px`;
                }
            }

            // Anycast packets: go straight down to respective regional edge nodes
            if (anyContainer) {
                const oldPackets = anyContainer.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                const numPackets = 12;
                for (let i = 0; i < numPackets; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet green';
                    anyContainer.appendChild(packet);

                    const startX = (i % 2 === 0) ? 220 : 305;
                    const startY = 100;
                    const endX = startX;
                    const endY = 220;

                    const localProg = (progress * 3 + (i / numPackets)) % 1.0;
                    const curX = startX;
                    const curY = startY + (endY - startY) * localProg;

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${curY}px`;
                }
            }
        }
        else if (slideId === 'slide_cf_9') {
            const ports = canvas.querySelector('#v30-tunnel-ports');
            const status = canvas.querySelector('#v30-tunnel-status');
            const lockIcon = canvas.querySelector('#v30-tunnel-lock-icon');
            const container = canvas.querySelector('#v30-packets-container');

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

            // Public packets bounce off Edge node; secure packets flow through tunnel
            if (container) {
                const oldPackets = container.querySelectorAll('.v30-packet');
                oldPackets.forEach(p => p.remove());

                // Public bad packet bouncing
                for (let i = 0; i < 3; i++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet red';
                    container.appendChild(packet);

                    // Targets Edge (150, 90) but bounces
                    const startX = 30;
                    const startY = 40;
                    const endX = 75;
                    const endY = 90;

                    const localProg = (progress * 2.5 + (i / 3)) % 1.0;
                    if (localProg < 0.6) {
                        const curX = startX + (endX - startX) * (localProg / 0.6);
                        const curY = startY + (endY - startY) * (localProg / 0.6);
                        packet.style.left = `${curX}px`;
                        packet.style.top = `${curY}px`;
                    } else {
                        // Bounce off
                        const t = (localProg - 0.6) / 0.4;
                        const curX = endX - 25 * t;
                        const curY = endY - 15 * t;
                        packet.style.left = `${curX}px`;
                        packet.style.top = `${curY}px`;
                        packet.style.opacity = `${1 - t}`;
                    }
                }

                // Tunnel secure packets flow inside the tunnel (120px to 215px)
                for (let j = 0; j < 3; j++) {
                    const packet = document.createElement('div');
                    packet.className = 'v30-packet green';
                    container.appendChild(packet);

                    const startX = 120;
                    const startY = 120;
                    const endX = 215;

                    const localProg = (progress * 2 + (j / 3)) % 1.0;
                    const curX = startX + (endX - startX) * localProg;

                    packet.style.left = `${curX}px`;
                    packet.style.top = `${startY}px`;
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
                    c1.style.background = 'rgba(243, 128, 32, 0.05)';
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
                    c2.style.background = 'rgba(243, 128, 32, 0.05)';
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
                    c3.style.background = 'rgba(243, 128, 32, 0.05)';
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
