/**
 * Video 33: YouTube Watch History Sync Architecture
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video33
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_yt_intro_a: [
            { text: 'đồng bộ', start: 1.0, end: 5.0, class: 'active-gold' }
        ],
        slide_yt_intro_b: [
            { text: 'chuẩn xác', start: 0.5, end: 5.0, class: 'active-good' }
        ],
        slide_yt_naive: [
            { text: '1 giây', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'quá tải', start: 8.0, end: 17.0, class: 'active-bad' }
        ],
        slide_yt_gateway: [
            { text: 'API Gateway', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'chặn đứng', start: 9.0, end: 18.0, class: 'active-bad' }
        ],
        slide_yt_kafka: [
            { text: 'Heartbeat 5s', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'Kafka Queue', start: 8.0, end: 18.5, class: 'active-gold' }
        ],
        slide_yt_cache: [
            { text: 'Redis Cache', start: 1.0, end: 10.0, class: 'active-green' },
            { text: 'Batch Write', start: 10.0, end: 20.0, class: 'active-gold' }
        ],
        slide_yt_sync: [
            { text: 'API Request', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: 'dưới 5ms', start: 7.0, end: 16.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_yt_intro_a',
        'slide_yt_intro_b',
        'slide_yt_naive',
        'slide_yt_gateway',
        'slide_yt_kafka',
        'slide_yt_cache',
        'slide_yt_sync',
        'slide_yt_outro'
    ];

    function initIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Calculates element center relative to zoomed container, dividing by zoom factor to align coordinates perfectly
    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        
        // Calculate the zoom factor dynamically
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.45;
        
        const rx = rect.left - contRect.left + rect.width / 2;
        const ry = rect.top - contRect.top + rect.height / 2;
        
        return {
            x: rx / zoom,
            y: ry / zoom
        };
    }

    // Helper to calculate coordinate along a path (straight line or cubic Bezier)
    function getPathPoint(start, end, t) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        
        if (Math.abs(dy) < 5) {
            return {
                x: start.x + dx * t,
                y: start.y + dy * t
            };
        }
        
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;
        const t2 = t * t;
        const t3 = t2 * t;
        
        const x = mt3 * start.x + 3 * mt2 * t * (start.x + dx * 0.4) + 3 * mt * t2 * (end.x - dx * 0.4) + t3 * end.x;
        const y = mt3 * start.y + 3 * mt2 * t * start.y + 3 * mt * t2 * end.y + t3 * end.y;
        
        return { x, y };
    }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // Helper to draw clean curves between nodes
    function drawSVGPath(canvas, pathId, startNode, endNode, container) {
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
        path.setAttribute('stroke', 'rgba(255, 255, 255, 0.12)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_yt_intro_a') {
            canvas.innerHTML = `
                <div class="v33-scene-wrapper">
                    <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                        <div class="v33-youtube-intro-container">
                            <div class="v33-youtube-glow-ring"></div>
                            <div class="v33-youtube-glow-ring inner"></div>
                            <div class="v33-giant-youtube-logo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" />
                            </div>
                        </div>
                        <div class="v33-glass-card" style="text-align: center; width: 440px; padding: 18px 24px; margin-top: 15px; border: 1.5px solid rgba(255, 0, 0, 0.4); background: rgba(15, 10, 10, 0.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55);">
                            <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(255, 0, 0, 0.4); background: rgba(255, 0, 0, 0.1); color: var(--yt-red); border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                <i data-lucide="youtube" style="width: 14px; height: 14px; color: var(--yt-red);"></i> Watch History
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: var(--yt-red); line-height: 1.45;">
                                Đồng bộ phát lại: Làm sao YouTube nhớ vị trí xem chuẩn xác từng giây?
                            </div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_intro_b') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-intro-svg">
                        <path id="path-phone-cloud" stroke-dasharray="4 4" />
                        <path id="path-cloud-tv" stroke-dasharray="4 4" />
                    </svg>

                    <!-- Devices Row -->
                    <div class="v33-devices-container" id="v33-intro-container" style="width:100%;">
                        <!-- Phone mockup -->
                        <div class="v33-phone-mockup" id="v33-intro-phone">
                            <div style="font-size: 9px; color: var(--yt-text-muted); display:flex; align-items:center; gap:3px;">
                                <i data-lucide="smartphone" style="width:12px; height:12px;"></i> Phone Client
                            </div>
                            <div class="v33-player-screen">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:55px; object-fit:contain;" alt="YouTube" />
                                <div style="position:absolute; bottom:8px; left:8px; font-size:8px; color:#fff; font-weight:bold; background:#ff0000; padding:2px 4px; border-radius:3px; box-shadow:0 2px 6px rgba(0,0,0,0.4);">LIVE</div>
                            </div>
                            <div style="display:flex; flex-direction:column; gap:2px;">
                                <div class="v33-progress-bar">
                                    <div class="v33-progress-fill" id="v33-intro-phone-fill"></div>
                                </div>
                                <div style="display:flex; justify-content:space-between; width:100%;">
                                    <span class="v33-timestamp" id="v33-intro-phone-time">23:00</span>
                                    <span style="font-size:10px; color:var(--yt-text-muted); margin-top:5px;">30:00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Syncing Cloud Station -->
                        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;" id="v33-intro-cloud">
                            <div class="v33-node" style="padding: 12px; border-radius:50%; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.03);">
                                <i data-lucide="cloud" style="width:28px; height:28px; color:var(--yt-blue);"></i>
                            </div>
                            <span style="font-size:10.5px; font-weight:bold; color:var(--yt-blue);">Cloud Sync</span>
                        </div>

                        <!-- TV mockup -->
                        <div style="display:flex; flex-direction:column; align-items:center;" id="v33-intro-tv-wrapper">
                            <div class="v33-tv-mockup" id="v33-intro-tv">
                                <div style="font-size: 9px; color: var(--yt-text-muted); display:flex; align-items:center; gap:3px;">
                                    <i data-lucide="tv" style="width:12px; height:12px;"></i> Smart TV Client
                                </div>
                                <div class="v33-player-screen" style="background:#05070c;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:75px; object-fit:contain; opacity:0.15;" id="v33-intro-tv-logo" alt="YouTube" />
                                    
                                    <!-- Sync Complete badge inside TV screen -->
                                    <div style="position:absolute; inset:0; background:rgba(16,185,129,0.18); display:none; flex-direction:column; align-items:center; justify-content:center; gap:4px; z-index:5;" id="v33-intro-tv-sync-badge">
                                        <i data-lucide="check-circle" style="width:26px; height:26px; color:var(--yt-green); animation: v32-pulse-radar 1.5s infinite;"></i>
                                        <span style="font-size:10px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:0.5px;">Resumed 23:17</span>
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:2px;">
                                    <div class="v33-progress-bar">
                                        <div class="v33-progress-fill" id="v33-intro-tv-fill"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; width:100%;">
                                        <span class="v33-timestamp" id="v33-intro-tv-time">00:00</span>
                                        <span style="font-size:10px; color:var(--yt-text-muted); margin-top:5px;">30:00</span>
                                    </div>
                                </div>
                            </div>
                            <div class="v33-tv-stand"></div>
                        </div>
                    </div>

                    <!-- Flow packets container overlay -->
                    <div class="v33-packet" id="v33-intro-pkt-1"></div>

                    <!-- Status description card -->
                    <div class="v33-glass-card" style="display:flex; justify-content:space-between; align-items:center; width:440px; padding:18px 24px;">
                        <span style="font-size:11px; font-weight:bold; color:var(--yt-text-muted); text-transform:uppercase; letter-spacing:1px; display:inline-flex; align-items:center; gap:5px;">
                            <i data-lucide="refresh-cw" style="width:14px; height:14px; color:var(--yt-blue); animation: spin 4s linear infinite;"></i> Playback State
                        </span>
                        <div style="font-family:'Fira Code', monospace; font-size:12px; font-weight:bold; color:var(--yt-blue);" id="v33-intro-status">
                            Ready to sync...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_naive') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 25px;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-naive-svg">
                        <path id="path-naive-client-db" stroke-dasharray="4 4" />
                    </svg>

                    <!-- DB Storm Layout -->
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;" id="v33-naive-container">
                        <!-- Client -->
                        <div class="v33-node" style="padding:16px 20px; border-color:var(--yt-red); background:rgba(255,0,0,0.02);" id="v33-naive-client">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:45px; object-fit:contain; margin-bottom:5px;" alt="YouTube" />
                            <span style="font-size:13px; font-weight:bold;">Phone Client</span>
                            <span style="font-size:9.5px; color:var(--yt-text-muted); margin-top:3px;">Gửi 1 request / 1 giây</span>
                        </div>

                        <!-- DB Node -->
                        <div class="v33-db-node" id="v33-naive-db">
                            <i data-lucide="database" style="width:40px; height:40px; color:#fff;" id="v33-naive-db-icon"></i>
                            <span style="font-size:13px; font-weight:bold; margin-top:6px;">SQL Database</span>
                            <div class="v33-metrics-bar">
                                <div class="v33-metrics-fill" id="v33-naive-cpu-bar"></div>
                            </div>
                            <span style="font-size:10px; color:var(--yt-text-muted); margin-top:5px; font-weight:bold;" id="v33-naive-cpu-label">CPU: 10%</span>
                        </div>
                    </div>

                    <!-- Flow packets container overlay -->
                    <div class="v33-packet" id="v33-naive-pkt-1"></div>
                    <div class="v33-packet" id="v33-naive-pkt-2"></div>
                    <div class="v33-packet" id="v33-naive-pkt-3"></div>
                    <div class="v33-packet" id="v33-naive-pkt-4"></div>

                    <!-- Overload indicator/Status panel -->
                    <div class="v33-glass-card" style="display:flex; flex-direction:column; gap:6px; transition:border-color 0.3s;" id="v33-naive-status-card">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:bold; color:var(--yt-text-muted); text-transform:uppercase;" id="v33-naive-status-title">
                                Database Latency
                            </span>
                            <span class="v33-status-val-pill green" id="v33-naive-status-val">
                                0.5 ms (Stable)
                            </span>
                        </div>
                        <div style="font-size:10.5px; color:var(--yt-text-muted);" id="v33-naive-status-desc">
                            Ghi mốc thời gian liên tục trực tiếp vào cơ sở dữ liệu quan hệ...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_gateway') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-gate-svg">
                        <path id="path-gate-phone-gateway" stroke-dasharray="4 4" />
                        <path id="path-gate-hacker-gateway" stroke-dasharray="4 4" />
                        <path id="path-gate-gateway-queue" stroke-dasharray="4 4" />
                    </svg>

                    <!-- Gateway Flow structure -->
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; height:340px;" id="v33-gate-container">
                        <!-- Left Nodes: Users & Hackers -->
                        <div style="display:flex; flex-direction:column; gap:60px;">
                            <!-- Phone client (Valid) -->
                            <div class="v33-node" id="v33-gate-phone" style="border-color:var(--yt-green); background:rgba(16,185,129,0.02); width:130px;">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:40px; object-fit:contain; margin-bottom:4px;" alt="YouTube" />
                                <span style="font-size:11px;">YouTube Phone</span>
                                <span style="font-size:8px; color:var(--yt-green); font-weight:bold; margin-top:2px;">TOKEN VALID</span>
                            </div>

                            <!-- Hacker Node (Invalid) -->
                            <div class="v33-node" id="v33-gate-hacker" style="border-color:var(--yt-red); background:rgba(255,0,0,0.02); width:130px;">
                                <i data-lucide="skull" style="width:20px; height:20px; color:var(--yt-red);"></i>
                                <span style="font-size:11px; margin-top:4px; font-weight:bold;">Spammer / Hacker</span>
                                <span style="font-size:8px; color:var(--yt-red); font-weight:bold; margin-top:2px;">NO TOKEN</span>
                            </div>
                        </div>

                        <!-- Middle API Gateway -->
                        <div class="v33-node" id="v33-gate-gateway" style="width:110px; height:110px; border-radius:50%; justify-content:center; align-items:center; background:rgba(15,23,42,0.9); border:2.5px solid var(--yt-blue); position:relative;">
                            <i data-lucide="shield" style="width:30px; height:30px; color:var(--yt-blue);" id="v33-gate-icon"></i>
                            <span style="font-size:11px; font-weight:bold; margin-top:4px; text-align:center;">API Gateway</span>
                            
                            <!-- Shield Barrier overlay -->
                            <div style="position:absolute; inset:-8px; border:2px solid var(--yt-red); border-radius:50%; box-shadow:0 0 15px var(--yt-red); opacity:0; transform:scale(0.9); transition:all 0.3s;" id="v33-gate-shield"></div>
                        </div>

                        <!-- Right Message Queue -->
                        <div class="v33-node" id="v33-gate-queue" style="width:110px; border-color:var(--yt-gold);">
                            <i data-lucide="git-commit" style="width:20px; height:20px; color:var(--yt-gold);"></i>
                            <span style="font-size:10px; margin-top:4px;">Kafka Queue</span>
                            <span style="font-size:7px; color:var(--yt-text-muted); margin-top:2px;" id="v33-gate-queue-status">0 pending</span>
                        </div>
                    </div>

                    <!-- Flow Packets -->
                    <div class="v33-packet green" id="v33-gate-pkt-green"></div>
                    <div class="v33-packet red" id="v33-gate-pkt-red"></div>

                    <!-- Status dialog description -->
                    <div class="v33-glass-card" style="display:flex; justify-content:space-between; align-items:center;" id="v33-gate-status-card">
                        <span style="font-size:11px; font-weight:bold; color:var(--yt-text-muted); text-transform:uppercase;">
                            Gateway filter
                        </span>
                        <div style="font-family:'Fira Code', monospace; font-size:12px; font-weight:bold; color:var(--yt-blue);" id="v33-gate-status-text">
                            Analyzing request headers...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_kafka') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 15px; zoom:1.35;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-kafka-svg">
                        <path id="path-kafka-phone-gateway" stroke-dasharray="4 4" />
                        <path id="path-kafka-gateway-queue" stroke-dasharray="4 4" />
                        <path id="path-kafka-queue-worker" stroke-dasharray="4 4" />
                    </svg>

                    <!-- High Throughput Architecture Pipeline -->
                    <div class="v33-pipeline-container" id="v33-kafka-container" style="width:100%;">
                        <!-- Row 1: Clients & Gateway -->
                        <div class="v33-pipeline-row">
                            <div class="v33-node" id="v33-kafka-phone">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:36px; object-fit:contain; margin-bottom:2px;" alt="YouTube" />
                                <span style="font-size:10px; margin-top:2px;">Phone Client</span>
                                <span style="font-size:8px; color:var(--yt-green); font-weight:bold; margin-top:2px;" id="v33-kafka-heartbeat-timer">HB: 5.0s</span>
                            </div>

                            <div class="v33-node" id="v33-kafka-gateway">
                                <i data-lucide="server" style="width:18px; height:18px; color:#fff;"></i>
                                <span style="font-size:10px; margin-top:2px;">API Gateway</span>
                            </div>
                        </div>

                        <!-- Row 2: Kafka queue -->
                        <div class="v33-pipeline-row" style="justify-content:center;">
                            <div class="v33-node" id="v33-kafka-queue" style="width:200px;">
                                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                                    <span style="font-size:10px; color:var(--yt-gold); font-weight:bold;"><i data-lucide="git-commit" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> Apache Kafka Queue</span>
                                    <span style="font-size:8px; font-family:monospace; background:rgba(0,0,0,0.3); padding:1px 4px; border-radius:3px; color:var(--yt-gold);" id="v33-kafka-queue-count">0 items</span>
                                </div>
                                <div class="v33-queue-buffer" id="v33-kafka-queue-buffer">
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                    <div class="v33-queue-slot"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Row 3: Workers -->
                        <div class="v33-pipeline-row" style="justify-content:center;">
                            <div class="v33-node" id="v33-kafka-worker" style="width:150px;">
                                <i data-lucide="cpu" style="width:20px; height:20px; color:var(--yt-blue);"></i>
                                <span style="font-size:11px; margin-top:4px;">Stream Processing Workers</span>
                            </div>
                        </div>
                    </div>

                    <!-- Flow packets overlay -->
                    <div class="v33-packet gold" id="v33-kafka-pkt-1"></div>
                    <div class="v33-packet gold" id="v33-kafka-pkt-2"></div>

                    <!-- Description panel -->
                    <div class="v33-glass-card" style="padding:12px 18px;">
                        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:bold; color:var(--yt-text-muted);">
                            <span>WATCH HISTORY QUEUE</span>
                            <span style="color:var(--yt-gold);">Kafka Buffer Layer</span>
                        </div>
                        <div style="font-size:10px; color:var(--yt-text-muted); margin-top:5px;" id="v33-kafka-status-desc">
                            Kafka xếp hàng các gói tin Heartbeat để phân phối tải ghi.
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_cache') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-cache-svg">
                        <path id="path-cache-worker-redis" stroke-dasharray="4 4" />
                        <path id="path-cache-worker-bigtable" stroke-dasharray="4 4" />
                    </svg>

                    <!-- Cache structure -->
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; height:300px;" id="v33-cache-container">
                        <!-- Left Workers -->
                        <div class="v33-node" id="v33-cache-worker" style="width:120px;">
                            <i data-lucide="cpu" style="width:24px; height:24px; color:var(--yt-blue);"></i>
                            <span style="font-size:12px; margin-top:4px;">Stream Workers</span>
                            <span style="font-size:8px; color:var(--yt-text-muted); margin-top:2px;">Processing checkpoints</span>
                        </div>

                        <!-- Right Targets: Redis Cache & Bigtable Storage -->
                        <div style="display:flex; flex-direction:column; gap:40px;">
                            <div class="v33-node" id="v33-cache-redis" style="width:130px; flex-direction:row; justify-content:space-between; padding:10px 14px; border-color:var(--yt-green);">
                                <div style="display:flex; flex-direction:column; align-items:flex-start;">
                                    <span style="font-size:11px; color:var(--yt-green); font-weight:bold;">Redis Cache</span>
                                    <span style="font-size:8px; color:var(--yt-text-muted);">In-Memory Read</span>
                                </div>
                                <i data-lucide="zap" style="width:16px; height:16px; color:var(--yt-green);"></i>
                            </div>

                            <div class="v33-node" id="v33-cache-bigtable" style="width:130px; flex-direction:row; justify-content:space-between; padding:10px 14px; border-color:var(--yt-blue);">
                                <div style="display:flex; flex-direction:column; align-items:flex-start;">
                                    <span style="font-size:11px; color:var(--yt-blue); font-weight:bold;">Bigtable DB</span>
                                    <span style="font-size:8px; color:var(--yt-text-muted);">Durable Batch</span>
                                </div>
                                <i data-lucide="database" style="width:16px; height:16px; color:var(--yt-blue);"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Flow packets overlay -->
                    <div class="v33-packet green" id="v33-cache-pkt-redis"></div>
                    <div class="v33-packet blue" id="v33-cache-pkt-bigtable"></div>

                    <!-- Status description card -->
                    <div class="v33-glass-card" style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:11px; font-weight:bold; color:var(--yt-text-muted); text-transform:uppercase;">
                            Write Strategy
                        </span>
                        <div style="font-family:'Fira Code', monospace; font-size:12px; font-weight:bold; color:var(--yt-green);" id="v33-cache-status-text">
                            Writing back to cache...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_sync') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 20px;">
                    <!-- SVG Paths layer (moved to direct child of container for perfect coordinate alignment) -->
                    <svg class="v33-svg-container" id="v33-sync-svg">
                        <path id="path-sync-tv-gateway" stroke-dasharray="4 4" />
                        <path id="path-sync-gateway-cache" stroke-dasharray="4 4" />
                    </svg>

                    <!-- Sync Flow structure -->
                    <div style="display:flex; justify-content:space-around; align-items:center; width:100%; margin:15px 0;" id="v33-sync-container">
                        <!-- TV client requesting sync -->
                        <div style="display:flex; flex-direction:column; align-items:center;">
                            <div class="v33-tv-mockup" id="v33-sync-tv" style="width:180px; height:110px; padding:10px;">
                                <div style="font-size: 8px; color: var(--yt-text-muted); display:flex; align-items:center; gap:2px;">
                                    <i data-lucide="tv" style="width:10px; height:10px;"></i> Smart TV
                                </div>
                                <div class="v33-player-screen" style="background:#070b12;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style="width:65px; object-fit:contain; opacity:0.15;" id="v33-sync-tv-logo" alt="YouTube" />
                                    
                                    <!-- Sync Resume Dialog Modal -->
                                    <div class="v33-glass-card" style="position:absolute; inset:6px; padding:8px; display:none; flex-direction:column; justify-content:space-between; border-color:var(--yt-blue); background:rgba(15,23,42,0.95); z-index:10; border-radius:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.8);" id="v33-sync-dialog">
                                        <span style="font-size:8px; font-weight:bold; color:var(--yt-blue);">Resume Video?</span>
                                        <span style="font-size:7px; color:var(--yt-text-muted);">Xem tiếp tại 23:17?</span>
                                        <div style="display:flex; gap:4px; width:100%;">
                                            <div style="flex:1; background:var(--yt-blue); color:#fff; font-size:6px; font-weight:bold; padding:3px; border-radius:3px; text-align:center;" id="v33-btn-yes">YES</div>
                                            <div style="flex:1; background:rgba(255,255,255,0.05); color:var(--yt-text-muted); font-size:6px; padding:3px; border-radius:3px; text-align:center;">NO</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:1px;">
                                    <div class="v33-progress-bar" style="height:3px;">
                                        <div class="v33-progress-fill" id="v33-sync-tv-fill"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; width:100%;">
                                        <span class="v33-timestamp" id="v33-sync-tv-time" style="font-size:8px; margin-top:2px;">00:00</span>
                                        <span style="font-size:7px; color:var(--yt-text-muted); margin-top:2px;">30:00</span>
                                    </div>
                                </div>
                            </div>
                            <div class="v33-tv-stand" style="width:50px; height:10px;"></div>
                        </div>

                        <!-- API Gateway -->
                        <div class="v33-node" id="v33-sync-gateway" style="padding:12px;">
                            <i data-lucide="server" style="width:18px; height:18px; color:#fff;"></i>
                            <span style="font-size:9.5px; margin-top:2px;">Gateway</span>
                        </div>

                        <!-- Cache -->
                        <div class="v33-node" id="v33-sync-cache" style="padding:12px; border-color:var(--yt-green); background:rgba(16,185,129,0.02);">
                            <i data-lucide="zap" style="width:18px; height:18px; color:var(--yt-green);"></i>
                            <span style="font-size:9.5px; margin-top:2px; color:var(--yt-green);">Redis Cache</span>
                            <span style="font-size:7px; color:var(--yt-text-muted); margin-top:1px;">WatchState</span>
                        </div>
                    </div>

                    <!-- Flow packets container overlay -->
                    <div class="v33-packet blue" id="v33-sync-pkt-1"></div>
                    <div class="v33-packet green" id="v33-sync-pkt-2"></div>

                    <!-- Sync completed notification banner -->
                    <div class="v33-tv-toast" id="v33-sync-toast">
                        <i data-lucide="check-circle" style="width:16px; height:16px; color:var(--yt-green);"></i>
                        <span style="color:#fff; font-weight:bold;">Đã đồng bộ thành công! Đang phát tại 23:17</span>
                    </div>

                    <!-- Status description card -->
                    <div class="v33-glass-card" style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:11px; font-weight:bold; color:var(--yt-text-muted); text-transform:uppercase;">
                            Read latency
                        </span>
                        <div style="font-family:'Fira Code', monospace; font-size:12px; font-weight:bold; color:var(--yt-green);" id="v33-sync-latency-val">
                            Redis Query: < 1ms
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_yt_outro') {
            canvas.innerHTML = `
                <div class="v33-zoom-container" style="justify-content: center; gap: 15px;">
                    <!-- Key architectural benefits grid dashboard -->
                    <div class="v33-outro-grid">
                        
                        <!-- Card 1: Heartbeat interval -->
                        <div class="v33-outro-card" id="v33-outro-card-1">
                            <span class="v33-outro-number">5 Giây</span>
                            <span class="v33-outro-label">Heartbeat Interval</span>
                            <span class="v33-outro-desc">Giãn cách gửi mốc xem để tối ưu hóa tần suất ghi từ thiết bị.</span>
                        </div>

                        <!-- Card 2: Queue Buffer Capacity -->
                        <div class="v33-outro-card" id="v33-outro-card-2">
                            <span class="v33-outro-number">> 250M/s</span>
                            <span class="v33-outro-label">Write Capacity</span>
                            <span class="v33-outro-desc">Hàng đợi Kafka hấp thụ mượt mà hàng trăm triệu checkpoint ghi cùng lúc.</span>
                        </div>

                        <!-- Card 3: Cache latency -->
                        <div class="v33-outro-card" id="v33-outro-card-3">
                            <span class="v33-outro-number">< 5ms</span>
                            <span class="v33-outro-label">Sync Latency</span>
                            <span class="v33-outro-desc">Redis Cache phản hồi mốc xem gần như lập tức khi mở thiết bị mới.</span>
                        </div>

                        <!-- Card 4: Database load reduction -->
                        <div class="v33-outro-card" id="v33-outro-card-4">
                            <span class="v33-outro-number">-95% Tải</span>
                            <span class="v33-outro-label">DB Load Reduced</span>
                            <span class="v33-outro-desc">Worker thực hiện Batch Write gom nhóm giúp giảm tải tối đa cho Bigtable.</span>
                        </div>
                    </div>

                    <!-- Final success metrics summary card -->
                    <div class="v33-glass-card" style="display:flex; justify-content:space-between; align-items:center; border-color:var(--yt-gold); background:rgba(245,158,11,0.02);">
                        <span style="font-size:11px; font-weight:bold; color:var(--yt-gold); text-transform:uppercase; display:inline-flex; align-items:center; gap:5px;">
                            <i data-lucide="check-circle" style="width:14px; height:14px;"></i> YouTube Sync Architecture
                        </span>
                        <div style="font-size:12px; font-weight:bold; color:#fff;">
                            99.99% Stable Scale
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        // Base container selection for coordinate alignment
        const container = canvas.querySelector('.v33-zoom-container');

        if (slideId === 'slide_yt_intro_a') {
            // Hook slide - no complex simulations, CSS handles animations
            return;
        }
        else if (slideId === 'slide_yt_intro_b') {
            const phoneFill = canvas.querySelector('#v33-intro-phone-fill');
            const phoneTime = canvas.querySelector('#v33-intro-phone-time');
            const tvFill = canvas.querySelector('#v33-intro-tv-fill');
            const tvTime = canvas.querySelector('#v33-intro-tv-time');
            const tvSyncBadge = canvas.querySelector('#v33-intro-tv-sync-badge');
            const tvLogo = canvas.querySelector('#v33-intro-tv-logo');
            const introStatus = canvas.querySelector('#v33-intro-status');
            const packet = canvas.querySelector('#v33-intro-pkt-1');

            const phoneNode = canvas.querySelector('#v33-intro-phone');
            const cloudNode = canvas.querySelector('#v33-intro-cloud');
            const tvNode = canvas.querySelector('#v33-intro-tv');

            // Draw SVG paths once coordinate contexts are resolved
            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-phone-cloud', phoneNode, cloudNode, container);
                drawSVGPath(canvas, '#path-cloud-tv', cloudNode, tvNode, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            // Phase 1 (0.0 -> 0.4): Phone is playing, progress bar crawling
            if (progress <= 0.4) {
                const subProgress = progress / 0.4;
                const currentSec = 1380 + subProgress * 17; // 23:00 to 23:17
                const fillPct = (currentSec / 1800) * 100;
                
                if (phoneFill) phoneFill.style.width = `${fillPct}%`;
                if (phoneTime) phoneTime.textContent = formatTime(currentSec);
                if (tvFill) tvFill.style.width = `0%`;
                if (tvTime) tvTime.textContent = '00:00';
                if (tvSyncBadge) tvSyncBadge.style.display = 'none';
                if (tvLogo) tvLogo.style.opacity = '0.15';
                if (introStatus) introStatus.textContent = 'Watching on Phone...';
                if (packet) packet.style.opacity = '0';
            } 
            // Phase 2 (0.4 -> 0.7): Phone paused, checkpoint packet travels Phone -> Cloud -> TV
            else if (progress > 0.4 && progress <= 0.7) {
                if (phoneFill) phoneFill.style.width = `77.6%`; // 23:17
                if (phoneTime) phoneTime.textContent = '23:17';
                if (tvFill) tvFill.style.width = `0%`;
                if (tvTime) tvTime.textContent = '00:00';
                if (tvSyncBadge) tvSyncBadge.style.display = 'none';
                if (tvLogo) tvLogo.style.opacity = '0.15';
                if (introStatus) introStatus.textContent = 'Syncing checkpoint...';

                // Animate packet along Phone -> Cloud -> TV path
                if (packet && phoneNode && cloudNode && tvNode && container) {
                    const phoneCoords = getCenterOffset(phoneNode, container);
                    const cloudCoords = getCenterOffset(cloudNode, container);
                    const tvCoords = getCenterOffset(tvNode, container);

                    const subProgress = (progress - 0.4) / 0.3; // 0 to 1
                    let pt;

                    if (subProgress < 0.5) {
                        const t = subProgress / 0.5;
                        pt = getPathPoint(phoneCoords, cloudCoords, t);
                    } else {
                        const t = (subProgress - 0.5) / 0.5;
                        pt = getPathPoint(cloudCoords, tvCoords, t);
                    }

                    packet.style.left = `${pt.x}px`;
                    packet.style.top = `${pt.y}px`;
                    packet.style.opacity = '1';
                }
            }
            // Phase 3 (0.7 -> 1.0): Checkpoint received! TV resumes and crawls forward
            else {
                if (phoneFill) phoneFill.style.width = `77.6%`;
                if (phoneTime) phoneTime.textContent = '23:17';
                if (packet) packet.style.opacity = '0';
                if (tvSyncBadge) tvSyncBadge.style.display = 'flex';
                if (tvLogo) tvLogo.style.opacity = '0';
                if (introStatus) introStatus.textContent = 'Playback Resumed!';

                const subProgress = (progress - 0.7) / 0.3; // 0 to 1
                const currentSec = 1397 + subProgress * 8; // 23:17 to 23:25
                const fillPct = (currentSec / 1800) * 100;
                
                if (tvFill) tvFill.style.width = `${fillPct}%`;
                if (tvTime) tvTime.textContent = formatTime(currentSec);
            }
        }
        else if (slideId === 'slide_yt_naive') {
            const dbNode = canvas.querySelector('#v33-naive-db');
            const cpuBar = canvas.querySelector('#v33-naive-cpu-bar');
            const cpuLabel = canvas.querySelector('#v33-naive-cpu-label');
            const statusCard = canvas.querySelector('#v33-naive-status-card');
            const statusTitle = canvas.querySelector('#v33-naive-status-title');
            const statusVal = canvas.querySelector('#v33-naive-status-val');
            const statusDesc = canvas.querySelector('#v33-naive-status-desc');

            const clientEl = canvas.querySelector('#v33-naive-client');
            const dbEl = canvas.querySelector('#v33-naive-db');

            // Draw SVG connection
            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-naive-client-db', clientEl, dbEl, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            // Animate packet stream
            for (let i = 1; i <= 4; i++) {
                const pkt = canvas.querySelector(`#v33-naive-pkt-${i}`);
                if (pkt && clientEl && dbEl && container) {
                    const startPos = getCenterOffset(clientEl, container);
                    const endPos = getCenterOffset(dbEl, container);
                    
                    const offset = (i - 1) * 0.22;
                    let subProgress = (progress - offset) % 0.4;
                    if (subProgress < 0 || progress < offset || progress > 0.8) {
                        pkt.style.opacity = '0';
                    } else {
                        const t = subProgress / 0.4;
                        const pt = getPathPoint(startPos, endPos, t);
                        
                        pkt.style.left = `${pt.x}px`;
                        pkt.style.top = `${pt.y}px`;
                        pkt.style.opacity = '1';
                    }
                }
            }

            // DB CPU load ramp up
            if (progress <= 0.6) {
                const cpu = Math.floor(10 + progress * 150); // 10% to 100%
                if (cpuBar) {
                    cpuBar.style.width = `${Math.min(cpu, 100)}%`;
                    if (cpu >= 85) {
                        cpuBar.classList.add('critical');
                    } else {
                        cpuBar.classList.remove('critical');
                    }
                }
                if (cpuLabel) cpuLabel.textContent = `CPU: ${Math.min(cpu, 100)}%`;
                if (dbNode) {
                    dbNode.classList.remove('overloaded');
                }
                if (statusVal) {
                    const latency = (0.5 + progress * 15).toFixed(1);
                    statusVal.textContent = `${latency} ms (Stable)`;
                    statusVal.className = "v33-status-val-pill green";
                }
                if (statusTitle) statusTitle.textContent = 'Database Latency';
                if (statusDesc) statusDesc.textContent = 'Ghi mốc thời gian liên tục trực tiếp vào cơ sở dữ liệu quan hệ...';
                if (statusCard) statusCard.style.borderColor = 'var(--yt-border)';
            }
            // Crash state
            else {
                if (cpuBar) {
                    cpuBar.style.width = '100%';
                    cpuBar.classList.add('critical');
                }
                if (cpuLabel) cpuLabel.textContent = 'CPU: 100% (CRASH)';
                if (dbNode) {
                    dbNode.classList.add('overloaded');
                }
                if (statusVal) {
                    statusVal.textContent = '504 GATEWAY TIMEOUT';
                    statusVal.className = "v33-status-val-pill red";
                }
                if (statusTitle) statusTitle.textContent = 'CRITICAL ERROR';
                if (statusDesc) statusDesc.textContent = 'Database quá tải ghi! Hàng đợi kết nối bị cạn kiệt khiến máy chủ bị khóa.';
                if (statusCard) statusCard.style.borderColor = 'var(--yt-red)';
            }
        }
        else if (slideId === 'slide_yt_gateway') {
            const phoneNode = canvas.querySelector('#v33-gate-phone');
            const hackerNode = canvas.querySelector('#v33-gate-hacker');
            const gatewayNode = canvas.querySelector('#v33-gate-gateway');
            const queueNode = canvas.querySelector('#v33-gate-queue');

            const pktGreen = canvas.querySelector('#v33-gate-pkt-green');
            const pktRed = canvas.querySelector('#v33-gate-pkt-red');
            const shield = canvas.querySelector('#v33-gate-shield');
            const queueStatus = canvas.querySelector('#v33-gate-queue-status');
            const statusText = canvas.querySelector('#v33-gate-status-text');

            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-gate-phone-gateway', phoneNode, gatewayNode, container);
                drawSVGPath(canvas, '#path-gate-hacker-gateway', hackerNode, gatewayNode, container);
                drawSVGPath(canvas, '#path-gate-gateway-queue', gatewayNode, queueNode, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const cycle = (progress * 2.5) % 1.0;
            const phase = Math.floor(progress * 2.5);

            // Path coords
            const phoneCoords = getCenterOffset(phoneNode, container);
            const hackerCoords = getCenterOffset(hackerNode, container);
            const gatewayCoords = getCenterOffset(gatewayNode, container);
            const queueCoords = getCenterOffset(queueNode, container);

            // Reset
            if (pktGreen) pktGreen.style.opacity = '0';
            if (pktRed) pktRed.style.opacity = '0';
            if (shield) {
                shield.style.opacity = '0';
                shield.style.transform = 'scale(0.9)';
            }

            if (progress <= 0.8) {
                if (phase % 2 === 0) {
                    // Valid packet flow: Phone -> Gateway -> Kafka Queue
                    if (statusText) statusText.textContent = "Validating YouTube App credentials...";
                    
                    if (cycle < 0.5) {
                        const t = cycle / 0.5;
                        if (pktGreen) {
                            const pt = getPathPoint(phoneCoords, gatewayCoords, t);
                            pktGreen.style.left = `${pt.x}px`;
                            pktGreen.style.top = `${pt.y}px`;
                            pktGreen.style.opacity = '1';
                        }
                    } else {
                        const t = (cycle - 0.5) / 0.5;
                        if (pktGreen) {
                            const pt = getPathPoint(gatewayCoords, queueCoords, t);
                            pktGreen.style.left = `${pt.x}px`;
                            pktGreen.style.top = `${pt.y}px`;
                            pktGreen.style.opacity = '1';
                        }
                        if (queueStatus) queueStatus.textContent = "1 request pushed";
                    }
                } else {
                    // Invalid packet flow: Hacker -> Gateway (Blocked)
                    if (statusText) statusText.textContent = "Detecting spam / unauthorized request...";
                    
                    if (cycle < 0.5) {
                        const t = cycle / 0.5;
                        if (pktRed) {
                            const pt = getPathPoint(hackerCoords, gatewayCoords, t);
                            pktRed.style.left = `${pt.x}px`;
                            pktRed.style.top = `${pt.y}px`;
                            pktRed.style.opacity = '1';
                        }
                    } else {
                        // Hits shield at Gateway
                        if (shield) {
                            shield.style.opacity = '1';
                            shield.style.transform = 'scale(1.05)';
                        }
                        if (statusText) statusText.textContent = "BLOCKED: 401 Unauthorized!";
                        if (pktRed) {
                            const pt = getPathPoint(hackerCoords, gatewayCoords, 1.0);
                            pktRed.style.left = `${pt.x}px`;
                            pktRed.style.top = `${pt.y}px`;
                            pktRed.style.opacity = '0.5';
                        }
                    }
                }
            } else {
                if (statusText) statusText.textContent = "API Gateway successfully filters traffic.";
                if (queueStatus) queueStatus.textContent = "Traffic routed cleanly";
            }
        }
        else if (slideId === 'slide_yt_kafka') {
            const queueCount = canvas.querySelector('#v33-kafka-queue-count');
            const hbTimer = canvas.querySelector('#v33-kafka-heartbeat-timer');
            const queueSlots = canvas.querySelectorAll('#v33-kafka-queue-buffer .v33-queue-slot');
            const descText = canvas.querySelector('#v33-kafka-status-desc');

            const phoneNode = canvas.querySelector('#v33-kafka-phone');
            const gatewayNode = canvas.querySelector('#v33-kafka-gateway');
            const queueNode = canvas.querySelector('#v33-kafka-queue');
            const workerNode = canvas.querySelector('#v33-kafka-worker');

            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-kafka-phone-gateway', phoneNode, gatewayNode, container);
                drawSVGPath(canvas, '#path-kafka-gateway-queue', gatewayNode, queueNode, container);
                drawSVGPath(canvas, '#path-kafka-queue-worker', queueNode, workerNode, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const remaining = (5.0 - (progress * 18.5) % 5.0).toFixed(1);
            if (hbTimer) hbTimer.textContent = `HB: ${remaining}s`;

            const cycleProgress = (progress * 2.5) % 1.0;

            const pkt1 = canvas.querySelector('#v33-kafka-pkt-1');
            const pkt2 = canvas.querySelector('#v33-kafka-pkt-2');

            // Phase 1: Client -> Gateway -> Kafka Queue
            if (pkt1 && phoneNode && gatewayNode && queueNode) {
                const start = getCenterOffset(phoneNode, container);
                const mid = getCenterOffset(gatewayNode, container);
                const end = getCenterOffset(queueNode, container);

                if (cycleProgress < 0.5) {
                    const t = cycleProgress / 0.5;
                    const pt = getPathPoint(start, mid, t);
                    pkt1.style.left = `${pt.x}px`;
                    pkt1.style.top = `${pt.y}px`;
                    pkt1.style.opacity = '1';
                } else {
                    const t = (cycleProgress - 0.5) / 0.5;
                    const pt = getPathPoint(mid, end, t);
                    pkt1.style.left = `${pt.x}px`;
                    pkt1.style.top = `${pt.y}px`;
                    pkt1.style.opacity = '1';
                }
            }

            // Queue buffer dynamic sizes
            const activeSlotsCount = Math.floor(3 + Math.sin(progress * Math.PI * 5) * 2);
            if (queueCount) queueCount.textContent = `${activeSlotsCount * 14}k checkpoints`;
            queueSlots.forEach((slot, index) => {
                if (index < activeSlotsCount) {
                    slot.classList.add('filled');
                } else {
                    slot.classList.remove('filled');
                }
            });

            // Phase 2: Kafka -> Worker
            if (pkt2 && queueNode && workerNode) {
                const start = getCenterOffset(queueNode, container);
                const end = getCenterOffset(workerNode, container);
                const t = cycleProgress;
                const pt = getPathPoint(start, end, t);
                pkt2.style.left = `${pt.x}px`;
                pkt2.style.top = `${pt.y}px`;
                pkt2.style.opacity = progress > 0.15 ? '1' : '0';
            }

            if (progress <= 0.4) {
                if (descText) descText.textContent = "Điện thoại gửi checkpoint (Heartbeat) định kỳ mỗi 5 giây.";
            } else if (progress > 0.4 && progress <= 0.75) {
                if (descText) descText.textContent = "Hàng đợi Kafka đóng vai trò bộ đệm hấp thụ hàng triệu yêu cầu ghi.";
            } else {
                if (descText) descText.textContent = "Workers kéo các checkpoint từ hàng đợi về để xử lý tuần tự.";
            }
        }
        else if (slideId === 'slide_yt_cache') {
            const workerNode = canvas.querySelector('#v33-cache-worker');
            const redisNode = canvas.querySelector('#v33-cache-redis');
            const bigtableNode = canvas.querySelector('#v33-cache-bigtable');

            const pktRedis = canvas.querySelector('#v33-cache-pkt-redis');
            const pktBigtable = canvas.querySelector('#v33-cache-pkt-bigtable');
            const statusText = canvas.querySelector('#v33-cache-status-text');

            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-cache-worker-redis', workerNode, redisNode, container);
                drawSVGPath(canvas, '#path-cache-worker-bigtable', workerNode, bigtableNode, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const workerCoords = getCenterOffset(workerNode, container);
            const redisCoords = getCenterOffset(redisNode, container);
            const bigtableCoords = getCenterOffset(bigtableNode, container);

            // Animate asynchronous writes: Redis instantly, Bigtable in bulk batches
            const cycle = (progress * 2) % 1.0;
            const step = Math.floor(progress * 2);

            // Reset nodes classes
            if (redisNode) redisNode.classList.remove('active-green');
            if (bigtableNode) bigtableNode.classList.remove('active-blue');

            if (progress <= 0.85) {
                if (pktRedis && pktBigtable) {
                    // Update Redis Cache constantly
                    const tRedis = cycle;
                    const ptRedis = getPathPoint(workerCoords, redisCoords, tRedis);
                    pktRedis.style.left = `${ptRedis.x}px`;
                    pktRedis.style.top = `${ptRedis.y}px`;
                    pktRedis.style.opacity = '1';

                    if (tRedis > 0.85 && redisNode) {
                        redisNode.classList.add('active-green');
                    }

                    // Update Bigtable occasionally (Batch Write)
                    if (step === 1) {
                        const tBig = cycle;
                        const ptBig = getPathPoint(workerCoords, bigtableCoords, tBig);
                        pktBigtable.style.left = `${ptBig.x}px`;
                        pktBigtable.style.top = `${ptBig.y}px`;
                        pktBigtable.style.opacity = '1';

                        if (tBig > 0.85 && bigtableNode) {
                            bigtableNode.classList.add('active-blue');
                        }
                        if (statusText) statusText.textContent = "Batch writing 5,000 checkpoints to Bigtable database...";
                    } else {
                        pktBigtable.style.opacity = '0';
                        if (statusText) statusText.textContent = "Writing instantly to memory cache (Redis)...";
                    }
                }
            } else {
                if (pktRedis) pktRedis.style.opacity = '0';
                if (pktBigtable) pktBigtable.style.opacity = '0';
                if (statusText) statusText.textContent = "Bulk Write Complete! Latency synchronized successfully.";
            }
        }
        else if (slideId === 'slide_yt_sync') {
            const tvFill = canvas.querySelector('#v33-sync-tv-fill');
            const tvTime = canvas.querySelector('#v33-sync-tv-time');
            const dialog = canvas.querySelector('#v33-sync-dialog');
            const btnYes = canvas.querySelector('#v33-btn-yes');
            const syncToast = canvas.querySelector('#v33-sync-toast');
            const tvPlayIcon = canvas.querySelector('#v33-sync-tv-play');
            const tvLogo = canvas.querySelector('#v33-sync-tv-logo');

            const tvNode = canvas.querySelector('#v33-sync-tv');
            const gatewayNode = canvas.querySelector('#v33-sync-gateway');
            const cacheNode = canvas.querySelector('#v33-sync-cache');

            const pkt1 = canvas.querySelector('#v33-sync-pkt-1');
            const pkt2 = canvas.querySelector('#v33-sync-pkt-2');

            if (needsDrawPaths(canvas)) {
                drawSVGPath(canvas, '#path-sync-tv-gateway', tvNode, gatewayNode, container);
                drawSVGPath(canvas, '#path-sync-gateway-cache', gatewayNode, cacheNode, container);
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            // Phase 1 (0.0 -> 0.3): Query request TV -> Gateway -> Cache
            if (progress <= 0.3) {
                if (tvFill) tvFill.style.width = '0%';
                if (tvTime) tvTime.textContent = '00:00';
                if (dialog) dialog.style.display = 'none';
                if (tvLogo) tvLogo.style.opacity = '0.15';
                if (syncToast) syncToast.classList.remove('active');
                if (tvPlayIcon) tvPlayIcon.style.opacity = '0';

                if (pkt1 && tvNode && gatewayNode && cacheNode) {
                    const start = getCenterOffset(tvNode, container);
                    const mid = getCenterOffset(gatewayNode, container);
                    const end = getCenterOffset(cacheNode, container);
                    const subProgress = progress / 0.3; // 0 to 1

                    if (subProgress < 0.5) {
                        const t = subProgress / 0.5;
                        const pt = getPathPoint(start, mid, t);
                        pkt1.style.left = `${pt.x}px`;
                        pkt1.style.top = `${pt.y}px`;
                    } else {
                        const t = (subProgress - 0.5) / 0.5;
                        const pt = getPathPoint(mid, end, t);
                        pkt1.style.left = `${pt.x}px`;
                        pkt1.style.top = `${pt.y}px`;
                    }
                    pkt1.style.opacity = '1';
                }
                if (pkt2) pkt2.style.opacity = '0';
            }
            // Phase 2 (0.3 -> 0.45): Cache response checkpoint lookup returns
            else if (progress > 0.3 && progress <= 0.45) {
                if (pkt1) pkt1.style.opacity = '0';
                if (dialog) dialog.style.display = 'none';
                if (tvLogo) tvLogo.style.opacity = '0.15';
                if (syncToast) syncToast.classList.remove('active');

                if (pkt2 && tvNode && gatewayNode && cacheNode) {
                    const start = getCenterOffset(cacheNode, container);
                    const mid = getCenterOffset(gatewayNode, container);
                    const end = getCenterOffset(tvNode, container);
                    const subProgress = (progress - 0.3) / 0.15; // 0 to 1

                    if (subProgress < 0.5) {
                        const t = subProgress / 0.5;
                        const pt = getPathPoint(mid, start, 1 - t);
                        pkt2.style.left = `${pt.x}px`;
                        pkt2.style.top = `${pt.y}px`;
                    } else {
                        const t = (subProgress - 0.5) / 0.5;
                        const pt = getPathPoint(end, mid, 1 - t);
                        pkt2.style.left = `${pt.x}px`;
                        pkt2.style.top = `${pt.y}px`;
                    }
                    pkt2.style.opacity = '1';
                }
            }
            // Phase 3 (0.45 -> 0.75): TV dialog popup "Resume watch?"
            else if (progress > 0.45 && progress <= 0.75) {
                if (pkt2) pkt2.style.opacity = '0';
                if (dialog) dialog.style.display = 'flex';
                if (tvLogo) tvLogo.style.opacity = '0.02';
                if (syncToast) syncToast.classList.remove('active');
                if (tvFill) tvFill.style.width = '0%';
                if (tvTime) tvTime.textContent = '00:00';
                if (tvPlayIcon) tvPlayIcon.style.opacity = '0';

                if (btnYes) {
                    if (progress > 0.6) {
                        btnYes.style.background = 'var(--yt-green)';
                        btnYes.style.boxShadow = '0 0 8px var(--yt-green-glow)';
                    } else {
                        btnYes.style.background = 'var(--yt-blue)';
                        btnYes.style.boxShadow = 'none';
                    }
                }
            }
            // Phase 4 (0.75 -> 1.0): Resumed at 23:17 successfully
            else {
                if (dialog) dialog.style.display = 'none';
                if (tvLogo) tvLogo.style.opacity = '0';
                if (syncToast) syncToast.classList.add('active');
                if (tvPlayIcon) tvPlayIcon.style.opacity = '0.35';

                const subProgress = (progress - 0.75) / 0.25; // 0 to 1
                const currentSec = 1397 + subProgress * 6; // 23:17 to 23:23
                const fillPct = (currentSec / 1800) * 100;

                if (tvFill) tvFill.style.width = `${fillPct}%`;
                if (tvTime) tvTime.textContent = formatTime(currentSec);
            }
        }
        else if (slideId === 'slide_yt_outro') {
            const cards = canvas.querySelectorAll('.v33-outro-card');
            
            cards.forEach((card, index) => {
                const threshold = 0.1 + index * 0.2;
                if (progress >= threshold) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.classList.add('active');
                } else {
                    card.style.opacity = '0.2';
                    card.style.transform = 'scale(0.92)';
                    card.classList.remove('active');
                }
            });
        }
    }

    // Helper to check if SVG path coordinates need drawing
    function needsDrawPaths(canvas) {
        return canvas.getAttribute('data-paths-drawn') !== 'true';
    }

    // Register plugin
    window.VideoPlugin = {
        scriptName: 'video33',
        topic: 'YouTube Playback Sync',
        keywordsData,
        customSlideIds,
        renderGfx,
        updateFrame
    };

    console.log('[Video33 Plugin] Loaded: YouTube Watch Progress Sync ready.');
})();
