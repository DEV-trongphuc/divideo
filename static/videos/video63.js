/**
 * Video 63: Supabase - The Open-Source Firebase Killer Simulation
 * Plugin driving custom slides, database animations, realtime message feeds, and self-hosting terminal.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_sup_intro_a: [
            { text: 'thách thức ông lớn Google Firebase', start: 2.0, end: 5.0, class: 'active-red' }
        ],
        slide_sup_intro_b: [
            { text: 'cơ sở dữ liệu mạnh nhất hành tinh', start: 3.5, end: 6.0, class: 'active-green' }
        ],
        slide_sup_problem: [
            { text: 'truy xuất quan hệ phức tạp', start: 3.0, end: 6.0, class: 'active-red' },
            { text: 'cơn ác mộng kinh hoàng trên NoSQL', start: 7.0, end: 10.5, class: 'active-red' }
        ],
        slide_sup_example: [
            { text: 'dữ liệu bị nhân bản', start: 3.5, end: 7.0, class: 'active-red' },
            { text: 'sửa đúng một dòng duy nhất', start: 8.5, end: 12.0, class: 'active-green' }
        ],
        slide_sup_postgres: [
            { text: 'PostgreSQL làm nền tảng', start: 1.5, end: 4.5, class: 'active-cyan' },
            { text: 'pgvector cho AI hay PostGIS cho bản đồ', start: 6.5, end: 10.5, class: 'active-green' }
        ],
        slide_sup_pros_cons: [
            { text: 'SQL mạnh mẽ và giá cố định', start: 2.0, end: 5.5, class: 'active-green' },
            { text: 'nhược điểm là bạn phải tự quản lý index', start: 6.5, end: 11.5, class: 'active-red' }
        ],
        slide_sup_pricing_lockin: [
            { text: 'Firebase tính tiền theo số lượt đọc ghi', start: 1.5, end: 5.5, class: 'active-red' },
            { text: 'Supabase tính theo dung lượng ổ cứng', start: 7.0, end: 11.0, class: 'active-green' }
        ],
        slide_sup_features: [
            { text: 'hệ thống xác thực người dùng', start: 2.5, end: 5.5, class: 'active-purple' },
            { text: 'thời gian thực qua WebSockets', start: 8.5, end: 12.0, class: 'active-green' }
        ],
        slide_sup_open_source: [
            { text: 'hoàn toàn mã nguồn mở', start: 2.0, end: 5.0, class: 'active-green' },
            { text: 'tự host trên máy chủ của mình', start: 6.0, end: 9.0, class: 'active-cyan' }
        ]
    };

    const customSlideIds = [
        'slide_sup_intro_a', 'slide_sup_intro_b', 'slide_sup_problem', 'slide_sup_example', 
        'slide_sup_postgres', 'slide_sup_pros_cons', 'slide_sup_pricing_lockin', 'slide_sup_features', 'slide_sup_open_source'
    ];

    function sceneWrap(inner) {
        return `<div class="v63-zoom-container"><div class="v63-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_sup_intro_a') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">
                    <div class="v63-avatar-intro-container">
                        <div class="v63-avatar-glow-ring"></div>
                        <div class="v63-avatar-glow-ring inner"></div>
                        <div class="v63-giant-avatar" id="s-intro-logo-frame">
                            <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" alt="Supabase Logo">
                        </div>
                    </div>
                    
                    <!-- Glass Card containing repository badge and hook statement -->
                    <div class="v63-card" style="text-align: center; width: 440px; padding: 18px 24px; border-radius: 20px; border: 1.5px solid rgba(62, 207, 142, 0.4); background: rgba(12, 15, 24, 0.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 10px; display:flex; flex-direction:column; align-items:center; gap:8px;">
                        <div style="font-size: 13px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(62, 207, 142, 0.4); background: rgba(62, 207, 142, 0.1); color: #3ecf8e; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                            <i data-lucide="github" style="width:14px;height:14px;"></i> supabase/supabase • ⭐ <span id="s-intro-stars-count">0</span>
                        </div>
                        <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: #3ecf8e; line-height: 1.45;" id="s-intro-ticker-text">
                            Backend 3 phút thay thế hoàn toàn Firebase?
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_intro_b') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-intro-b-logos">
                        <!-- Left: Supabase -->
                        <div class="v63-logo-box sup" id="s-int-b-sup">
                            <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" class="v63-mini-logo" alt="Supabase">
                            <span>Supabase</span>
                        </div>
                        
                        <!-- Middle: Connecting Bridge Arrow -->
                        <div class="v63-bridge-arrow" id="s-int-b-arrow">
                            <i data-lucide="arrow-right"></i>
                        </div>
                        
                        <!-- Right: Postgres -->
                        <div class="v63-logo-box pg" id="s-int-b-pg">
                            <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png" class="v63-mini-logo" alt="Postgres">
                            <span>Postgres Cloud</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_problem') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-problem-grid">
                        <!-- Top: Firebase NoSQL Bloated Document Mockup -->
                        <div class="v63-editor-frame" id="s-prob-editor">
                            <div class="v63-editor-hdr">
                                <div class="mac-dots">
                                    <span class="dot close"></span>
                                    <span class="dot minimize"></span>
                                    <span class="dot maximize"></span>
                                </div>
                                <span class="editor-title">firestore_users_denormalized.json</span>
                            </div>
                            <div class="v63-editor-body">
                                <div class="v63-code-line"><span class="c-dim">{</span></div>
                                <div class="v63-code-line"><span class="c-key">  "user_id":</span> <span class="c-val">"usr_99X4"</span>,</div>
                                <div class="v63-code-line" id="s-prob-line-dup1"><span class="c-key">  "comments_dup1":</span> <span class="c-val">"Duplicated comment block #1"</span>,</div>
                                <div class="v63-code-line" id="s-prob-line-dup2"><span class="c-key">  "comments_dup2":</span> <span class="c-val">"Duplicated comment block #2"</span>,</div>
                                <div class="v63-code-line" id="s-prob-line-join"><span class="c-key">  "join_query":</span> <span class="c-val">"Error: JOIN is not supported!"</span></div>
                                <div class="v63-code-line"><span class="c-dim">}</span></div>
                            </div>
                        </div>

                        <!-- Middle: Stats Panel Row -->
                        <div class="v63-stats-panel" id="s-prob-stats">
                            <div class="v63-stat-card bad" id="s-prob-invoice-card">
                                <span class="lbl">FIREBASE MONTHLY BILL</span>
                                <span class="val" id="s-prob-price-count">$0.00</span>
                                <div class="v63-bill-growth-bar"><div class="v63-bill-growth-fill" id="s-prob-bill-fill"></div></div>
                            </div>
                            
                            <div class="v63-stat-card bad v63-graph-card">
                                <span class="lbl">DATABASE RESOURCE USAGE</span>
                                <div class="v63-mini-chart-container">
                                    <svg viewBox="0 0 100 40" class="v63-mini-chart">
                                        <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2" />
                                        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2" />
                                        <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2" />
                                        <path d="M 0 35 Q 25 35 50 30 T 100 5" fill="none" stroke="var(--v63-orange)" stroke-width="2.5" id="s-prob-chart-path" stroke-dasharray="120" stroke-dashoffset="120" />
                                    </svg>
                                </div>
                                <span class="val" id="s-prob-reads-count">0 reads</span>
                            </div>
                        </div>

                        <!-- Bottom: Alert Banner -->
                        <div class="v63-alert-banner" id="s-prob-alert">
                            <i data-lucide="alert-octagon" class="pulse-icon"></i>
                            <span>BILL LIMIT EXCEEDED!</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_example') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-compare-columns">
                        <!-- Top: Firebase duplication -->
                        <div class="v63-comp-col" id="s-ex-before-card">
                            <span class="col-lbl red">FIREBASE NOSQL (DUPLICATION)</span>
                            <div class="v63-mini-code" style="height: 100px;">
                                <div class="code-row text-alert" id="s-ex-dup-row1">Order #1: "Burger King" <span class="c-err">❌ Dup</span></div>
                                <div class="code-row text-alert" id="s-ex-dup-row2">Order #2: "Burger King" <span class="c-err">❌ Dup</span></div>
                                <div class="code-row text-alert" id="s-ex-dup-row3">Order #3: "Burger King" <span class="c-err">❌ Dup</span></div>
                                <div class="code-row text-cmd" style="margin-top: 6px; font-size: 0.6rem; color: var(--v63-orange);" id="s-ex-dup-notice">
                                    Need to update thousands of orders!
                                </div>
                            </div>
                        </div>
                        
                        <!-- Bottom: Supabase Relational JOIN -->
                        <div class="v63-comp-col" id="s-ex-after-card">
                            <span class="col-lbl green">SUPABASE SQL (RELATIONAL JOIN)</span>
                            <div class="v63-mini-code" style="height: 115px; position:relative;">
                                <!-- Table Restaurants -->
                                <div class="v63-mini-table" id="s-ex-tbl-rest" style="padding: 4px; border: 1px solid var(--v63-border); border-radius: 6px; background: rgba(62,207,142,0.05); margin-bottom: 8px;">
                                    <div style="font-weight: 700; font-size: 0.6rem; color: var(--v63-primary);">[restaurants]</div>
                                    <div style="font-size: 0.55rem; color:#fff;" id="s-ex-rest-val">id: 1 | name: "Burger King"</div>
                                </div>
                                <!-- Table Orders -->
                                <div class="v63-mini-table" id="s-ex-tbl-ord" style="padding: 4px; border: 1px solid var(--v63-border); border-radius: 6px; background: rgba(255,255,255,0.02);">
                                    <div style="font-weight: 700; font-size: 0.6rem; color: var(--v63-cyan);">[orders]</div>
                                    <div style="font-size: 0.55rem; color: var(--text-muted);">ord_101 | rest_id: 1 <span class="c-val">(JOIN -> BK)</span></div>
                                    <div style="font-size: 0.55rem; color: var(--text-muted);">ord_102 | rest_id: 1 <span class="c-val">(JOIN -> BK)</span></div>
                                </div>
                                <div class="v63-success-flash" id="s-ex-sql-notice" style="position:absolute; bottom: 4px; left: 6px; font-size: 0.65rem; color: var(--v63-primary); opacity:0;">
                                    ✔ Edited 1 row! Done.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_postgres') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-chicken-sim-card">
                        <!-- Central chicken main icon -->
                        <div class="v63-chicken-main" id="s-pg-chicken-main">
                            <span class="v63-chicken-drumstick">🍗</span>
                            <div class="v63-chicken-glow-ring"></div>
                            <div class="v63-chicken-glow-ring inner"></div>
                        </div>
                        
                        <!-- Simple floating badges row -->
                        <div class="v63-chicken-badge-row">
                            <span class="v63-sim-tag green" id="s-pg-tag-users">👥 users</span>
                            <span class="v63-sim-tag cyan" id="s-pg-tag-profiles">👤 profiles</span>
                            <span class="v63-sim-tag purple" id="s-pg-tag-orders">📦 orders</span>
                        </div>
                        
                        <!-- Glow ready label -->
                        <div class="v63-chicken-ready-label" id="s-pg-ready-label">
                            <span>DỌN SẴN • CHỈ VIỆC ĂN!</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_pros_cons') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-vertical-compare">
                        <!-- Card 1: Pros -->
                        <div class="v63-detail-card cloud" id="s-pc-pros-card">
                            <div class="v63-f-hdr" style="display:flex; align-items:center; gap:10px;">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 0 5px var(--v63-primary-glow));" alt="Supabase">
                                <span style="color: var(--v63-primary); font-weight: 800; font-size: 0.85rem;">ƯU ĐIỂM (PROS) - SQL MẠNH MẼ</span>
                            </div>
                            
                            <!-- Simulation 1: SQL Join -->
                            <div class="v63-sim-row">
                                <div class="v63-mini-db-table">
                                    <div class="tbl-title">users</div>
                                    <div class="tbl-row joined">id: 1 | name: "An"</div>
                                    <div class="tbl-row">id: 2 | name: "Bình"</div>
                                </div>
                                <div class="v63-join-connector">
                                    <svg width="100%" height="30" style="overflow:visible;">
                                        <path d="M 0 15 L 75 15" fill="none" stroke-width="2.5" class="v63-join-line" />
                                        <polygon points="70,10 80,15 70,20" fill="var(--v63-primary)" />
                                    </svg>
                                </div>
                                <div class="v63-mini-db-table">
                                    <div class="tbl-title">orders</div>
                                    <div class="tbl-row joined">id: 101 | u_id: 1</div>
                                    <div class="tbl-row">id: 102 | u_id: 2</div>
                                </div>
                            </div>
                            
                            <!-- Simulation 2: Docker logo / Self Host status -->
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; margin-top:2px;">
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/docker.png" style="width: 16px; height: 16px; object-fit: contain;" alt="Docker">
                                    <span>Mã nguồn mở (Docker Self-host)</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:4px; font-size:0.6rem; font-weight:800; color:var(--v63-primary); background:rgba(62,207,142,0.1); padding:2px 8px; border-radius:4px; border:1px solid var(--v63-primary-glow);">
                                    <span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--v63-primary); display: inline-block; animation: v63Pulse 1.2s infinite ease-in-out;"></span>
                                    <span>DOCKER RUNNING</span>
                                </div>
                            </div>
                        </div>

                        <!-- Card 2: Cons -->
                        <div class="v63-detail-card warning-glow" id="s-pc-cons-card">
                            <div class="s-pc-scan-line" id="s-pc-scan-line" style="position:absolute; top:0; left:0; width:100%; height:2px; background:rgba(255, 107, 107, 0.4); box-shadow:0 0 8px rgba(255, 107, 107, 0.8); display:none; pointer-events:none; z-index:10;"></div>
                            <div class="v63-f-hdr" style="display:flex; align-items:center; gap:10px;">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 0 5px var(--v63-cyan-glow));" alt="Postgres">
                                <span style="color: var(--v63-orange); font-weight: 800; font-size: 0.85rem;">NHƯỢC ĐIỂM (CONS) - THÁCH THỨC</span>
                            </div>
                            
                            <!-- Simulation 1: Connection limits -->
                            <div style="display:flex; flex-direction:column; gap:4px; text-align:left;">
                                <div style="display:flex; justify-content:space-between; font-size:0.7rem;">
                                    <span>Giới hạn kết nối (Connection Limit)</span>
                                    <span style="font-family:var(--font-mono); font-weight:800; color:var(--v63-orange);"><span id="s-pc-conn-count">0</span> / 100</span>
                                </div>
                                <div class="v63-conn-limit-bar">
                                    <div class="v63-conn-limit-fill" id="s-pc-conn-fill"></div>
                                </div>
                            </div>
                            
                            <!-- Simulation 2: Index scanning (No index / Index added) -->
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; margin-top:4px;">
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png" style="width: 14px; height: 14px; object-fit: contain;" id="s-pc-search-icon" alt="Postgres">
                                    <span id="s-pc-search-lbl" style="transition: color 0.3s ease;">Quét tuần tự (Seq Scan)</span>
                                </div>
                                <div class="v63-index-warning-box" id="s-pc-index-box">
                                    <i data-lucide="alert-octagon" style="width:12px; height:12px;" id="s-pc-index-icon"></i>
                                    <span id="s-pc-index-lbl">NO INDEX!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_pricing_lockin') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-vertical-compare">
                        <!-- Card 1: Firebase -->
                        <div class="v63-detail-card warning-glow" id="s-pr-fb">
                            <div class="v63-badge-overlay" style="border-color: var(--v63-orange); color: var(--v63-orange);">NOSQL READS BILL</div>
                            <div class="v63-f-hdr" style="display:flex; align-items:center; gap:10px;">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/firebase.png" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 0 5px var(--v63-orange-glow));" alt="Firebase">
                                <span style="color: var(--v63-orange); font-weight: 800; font-size: 0.85rem;">Firebase: Tính theo số lượt đọc/ghi</span>
                            </div>
                            
                            <div class="v63-sim-row" style="height: 75px;">
                                <!-- Client querying database visually -->
                                <div style="display:flex; align-items:center; gap:8px; width: 100%;">
                                    <div class="v63-wallet-panel" id="s-pr-fb-wallet">
                                        <i data-lucide="wallet" style="width:38px; height:38px; color:var(--v63-orange);"></i>
                                    </div>
                                    <div style="flex-grow:1; display:flex; flex-direction:column; gap:6px; justify-content:center; text-align:left; margin-left:25px;">
                                        <div style="font-size:0.65rem; color:var(--text-muted);">Số lượt đọc (Loops Leak):</div>
                                        <div style="font-family:var(--font-mono); font-size:1.15rem; font-weight:900; color:var(--v63-orange);" id="s-pr-fb-reads">0</div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:6px; justify-content:center; text-align:right; min-width:110px;">
                                        <div style="font-size:0.65rem; color:var(--text-muted);">Hóa đơn:</div>
                                        <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:900; color:var(--v63-orange);" id="s-pr-fb-cost">$0.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Card 2: Supabase -->
                        <div class="v63-detail-card cloud" id="s-pr-sb">
                            <div class="v63-badge-overlay green">FLAT STORAGE BILL</div>
                            <div class="v63-f-hdr" style="display:flex; align-items:center; gap:10px;">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 0 5px var(--v63-primary-glow));" alt="Supabase">
                                <span style="color: var(--v63-primary); font-weight: 800; font-size: 0.85rem;">Supabase: Tính theo dung lượng ổ cứng</span>
                            </div>
                            
                            <div class="v63-sim-row" style="height: 75px;">
                                <div style="display:flex; align-items:center; gap:8px; width: 100%;">
                                    <div style="width: 50px; height: 50px; display:flex; align-items:center; justify-content:center;">
                                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png" style="width: 32px; height: 32px; object-fit: contain;" alt="Postgres">
                                    </div>
                                    <div style="flex-grow:1; display:flex; flex-direction:column; gap:6px; justify-content:center; text-align:left; margin-left:15px;">
                                        <div style="font-size:0.65rem; color:var(--text-muted); display:flex; justify-content:space-between; width:130px; box-sizing:border-box;">
                                            <span>Dung lượng DB:</span>
                                            <span style="font-weight:800; color:#fff;" id="s-pr-sb-size">1.2 GB</span>
                                        </div>
                                        <div class="v63-conn-limit-bar" style="width:130px;">
                                            <div class="v63-conn-limit-fill" id="s-pr-sb-size-fill" style="width:12%; background:var(--v63-primary);"></div>
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:6px; justify-content:center; text-align:right; min-width:110px;">
                                        <div style="font-size:0.65rem; color:var(--text-muted);">Hóa đơn:</div>
                                        <div style="font-family:var(--font-mono); font-size:1.35rem; font-weight:900; color:var(--v63-primary);">$25.00 FLAT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_features') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-triple-grid">
                        <!-- Card 1: Auth -->
                        <div class="v63-card v63-feature-card" id="s-feat-auth">
                            <div class="v63-f-hdr">
                                <i data-lucide="shield"></i>
                                <span>AUTHENTICATION</span>
                            </div>
                            <div class="v63-f-body">
                                <div class="v63-auth-list">
                                    <div class="v63-auth-item">
                                        <span class="user">user_A@gmail.com</span>
                                        <span class="v63-auth-status success">Active</span>
                                    </div>
                                    <div class="v63-auth-item" id="s-auth-item-2" style="opacity: 0;">
                                        <span class="user">user_B@github</span>
                                        <span class="v63-auth-status success">OAuth</span>
                                    </div>
                                    <div class="v63-auth-item" id="s-auth-item-3" style="opacity: 0;">
                                        <span class="user">user_C@google</span>
                                        <span class="v63-auth-status success">OAuth</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Card 2: Storage -->
                        <div class="v63-card v63-feature-card" id="s-feat-storage">
                            <div class="v63-f-hdr">
                                <i data-lucide="folder-archive"></i>
                                <span>STORAGE S3</span>
                            </div>
                            <div class="v63-f-body">
                                <div class="v63-storage-progress">
                                    <div class="v63-file-row">
                                        <i data-lucide="image"></i>
                                        <div class="v63-file-info">
                                            <span class="v63-file-name">avatar.png</span>
                                            <div class="v63-bar-bg"><div class="v63-bar-fill" id="s-stor-bar-1"></div></div>
                                        </div>
                                    </div>
                                    <div class="v63-file-row">
                                        <i data-lucide="video"></i>
                                        <div class="v63-file-info">
                                            <span class="v63-file-name">video.mp4</span>
                                            <div class="v63-bar-bg"><div class="v63-bar-fill" id="s-stor-bar-2"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Card 3: Realtime WebSockets -->
                        <div class="v63-card v63-feature-card" id="s-feat-realtime" style="position:relative;">
                            <div class="v63-rt-badge">WS LIVE</div>
                            <div class="v63-f-hdr">
                                <i data-lucide="radio"></i>
                                <span>REALTIME</span>
                            </div>
                            <div class="v63-f-body">
                                <div class="v63-realtime-feed" id="s-rt-feed">
                                    <div class="v63-chat-bubble" id="s-chat-b1">⚡ INSERT table users</div>
                                    <div class="v63-chat-bubble" id="s-chat-b2">⚡ UPDATE row 12</div>
                                    <div class="v63-chat-bubble" id="s-chat-b3">⚡ DELETE row 88</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_sup_open_source') {
            canvas.innerHTML = sceneWrap(`
                <div class="v63-scene-row">
                    <div class="v63-host-compare">
                        <!-- Left: Supabase Managed Cloud -->
                        <div class="v63-card v63-host-card cloud" id="s-host-cloud">
                            <div class="v63-badge-overlay green">ACTIVE</div>
                            <div class="v63-host-icon-area">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" style="width: 48px; height: 48px; object-fit: contain; filter: drop-shadow(0 0 10px var(--v63-primary-glow));" alt="Supabase">
                            </div>
                            <h3 class="v63-host-title">Supabase Cloud</h3>
                            <p class="v63-host-desc">Serverless Database hosting, global CDN, automated backups, 1-click upgrade.</p>
                        </div>

                        <!-- Right: Self-Hosted Docker -->
                        <div class="v63-card v63-host-card selfhost" id="s-host-self">
                            <div class="v63-badge-overlay" id="s-self-badge">PENDING</div>
                            <div class="v63-host-icon-area">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/docker.png" style="width: 48px; height: 48px; object-fit: contain; filter: drop-shadow(0 0 10px var(--v63-cyan-glow));" alt="Docker">
                            </div>
                            <h3 class="v63-host-title">Self-Host (Docker)</h3>
                            <div class="v63-docker-terminal">
                                <span class="v63-term-line cmd" id="s-term-line-1"></span>
                                <span class="v63-term-line" id="s-term-line-2"></span>
                                <span class="v63-term-line" id="s-term-line-3"></span>
                                <span class="v63-term-line success" id="s-term-line-4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Render Lucide icons for template
        if (window.lucide) {
            window.lucide.createIcons({
                attrs: { class: 'lucide-icon' },
                node: canvas
            });
        }
    }

    // ── GFX FRAME TICK UPDATE ──────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying, getSlideDuration, slide) {
        const row = canvas.querySelector('.v63-scene-row');
        if (!row) return;

        // Slide 1a: Intro Logo Rotating & Git Stars Counting
        if (slideId === 'slide_sup_intro_a') {
            const starsCount = row.querySelector('#s-intro-stars-count');
            const ringOuter = row.querySelector('.v63-avatar-glow-ring:not(.inner)');
            const ringInner = row.querySelector('.v63-avatar-glow-ring.inner');
            const tickerText = row.querySelector('#s-intro-ticker-text');

            if (starsCount) {
                const targetStars = 71248;
                const factor = Math.min(1.0, progress / 0.85);
                const ease = factor * (2 - factor); // easeOutQuad
                const curStars = Math.round(ease * targetStars);
                
                if (curStars >= 1000) {
                    starsCount.textContent = (curStars / 1000).toFixed(1) + 'k';
                } else {
                    starsCount.textContent = curStars.toString();
                }
            }

            if (ringOuter) ringOuter.style.transform = `rotate(${progress * 120}deg)`;
            if (ringInner) ringInner.style.transform = `rotate(${-progress * 180}deg)`;

            if (tickerText) {
                const fullText = "Backend 3 phút thay thế hoàn toàn Firebase?";
                const chars = Math.floor(progress * fullText.length);
                tickerText.textContent = fullText.slice(0, chars) + (progress < 0.98 ? "_" : "");
            }

            // Spawn floating neon dot-particles inside the logo frame
            let lastSpawnTime = parseFloat(canvas.getAttribute('data-last-spawn') || '0');
            if (progress - lastSpawnTime > 0.05 && progress < 0.95) {
                canvas.setAttribute('data-last-spawn', progress.toString());
                const container = row.querySelector('#s-intro-logo-frame');
                if (container) {
                    const particle = document.createElement('div');
                    particle.className = 'v63-dot-particle';
                    particle.style.background = Math.random() > 0.5 ? 'var(--v63-cyan)' : 'var(--v63-primary)';
                    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
                    const left = 10 + Math.random() * 80;
                    particle.style.left = `${left}%`;
                    particle.style.bottom = '10%';
                    particle.style.animationDuration = `${1.0 + Math.random() * 1.2}s`;
                    container.appendChild(particle);
                    
                    setTimeout(() => particle.remove(), 2000);
                }
            }
        }

        // Slide 1b: Connecting logos together (Supabase & Postgres)
        else if (slideId === 'slide_sup_intro_b') {
            const cardSup = row.querySelector('#s-int-b-sup');
            const cardPg = row.querySelector('#s-int-b-pg');
            const arrow = row.querySelector('#s-int-b-arrow');

            if (cardSup) {
                const shift = Math.sin(progress * 8) * 3;
                const scale = 0.95 + Math.min(0.05, progress * 0.05);
                cardSup.style.transform = `translateY(${shift}px) scale(${scale})`;
            }

            if (cardPg) {
                const shift = Math.cos(progress * 8) * 3;
                const scale = 0.95 + Math.min(0.05, progress * 0.05);
                cardPg.style.transform = `translateY(${shift}px) scale(${scale})`;
            }

            if (arrow) {
                const pulse = 1.0 + Math.sin(progress * 15) * 0.08;
                arrow.style.transform = `scale(${pulse})`;
            }
        }

        // Slide 2: NoSQL bottleneck shaking & Live drawing chart
        else if (slideId === 'slide_sup_problem') {
            const editor = row.querySelector('#s-prob-editor');
            const stats = row.querySelector('#s-prob-stats');
            
            const lineDup1 = row.querySelector('#s-prob-line-dup1');
            const lineDup2 = row.querySelector('#s-prob-line-dup2');
            const lineJoin = row.querySelector('#s-prob-line-join');
            
            const priceCount = row.querySelector('#s-prob-price-count');
            const billFill = row.querySelector('#s-prob-bill-fill');
            
            const chartPath = row.querySelector('#s-prob-chart-path');
            const readsCount = row.querySelector('#s-prob-reads-count');
            const alertBanner = row.querySelector('#s-prob-alert');

            // Interactive Editor lines highlighting based on progress
            if (lineDup1) {
                if (progress > 0.15 && progress < 0.75) {
                    lineDup1.classList.add('active-warning');
                } else {
                    lineDup1.classList.remove('active-warning');
                }
            }
            if (lineDup2) {
                if (progress > 0.3 && progress < 0.75) {
                    lineDup2.classList.add('active-warning');
                } else {
                    lineDup2.classList.remove('active-warning');
                }
            }
            if (lineJoin) {
                if (progress > 0.45 && progress < 0.95) {
                    lineJoin.classList.add('active-warning');
                } else {
                    lineJoin.classList.remove('active-warning');
                }
            }

            if (editor) {
                editor.style.transform = 'none';
            }

            // Count price up to $980.50
            if (priceCount) {
                const maxPrice = 980.50;
                const curPrice = (progress * maxPrice).toFixed(2);
                priceCount.textContent = `$${parseFloat(curPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            }

            // Fill billing growth bar
            if (billFill) {
                billFill.style.width = `${progress * 100}%`;
                if (progress > 0.7) {
                    billFill.style.background = 'var(--v63-orange)';
                    billFill.style.boxShadow = '0 0 8px var(--v63-orange)';
                } else {
                    billFill.style.background = 'var(--v63-primary)';
                    billFill.style.boxShadow = '0 0 6px var(--v63-primary)';
                }
            }

            // Live SVG Chart drawing path
            if (chartPath) {
                const maxOffset = 120;
                const curOffset = maxOffset - (progress * maxOffset);
                chartPath.style.strokeDashoffset = curOffset.toString();
            }

            // Count reads up to 150,000
            if (readsCount) {
                const maxReads = 150000;
                const curReads = Math.round(progress * maxReads);
                readsCount.textContent = `${curReads.toLocaleString()} reads`;
            }

            // Flashing Alert Banner
            if (alertBanner && progress > 0.65) {
                alertBanner.classList.add('active');
            } else if (alertBanner) {
                alertBanner.classList.remove('active');
            }
        }

        // Slide 3: Example App updates (Burger King -> BK Grill)
        else if (slideId === 'slide_sup_example') {
            const dupRow1 = row.querySelector('#s-ex-dup-row1');
            const dupRow2 = row.querySelector('#s-ex-dup-row2');
            const dupRow3 = row.querySelector('#s-ex-dup-row3');
            const dupNotice = row.querySelector('#s-ex-dup-notice');
            
            const restVal = row.querySelector('#s-ex-rest-val');
            const sqlNotice = row.querySelector('#s-ex-sql-notice');
            
            // At progress > 0.45, simulate updating name to "BK Grill"
            if (progress > 0.45) {
                if (dupRow1) {
                    dupRow1.innerHTML = 'Order #1: "BK Grill" <span class="c-val">✔ Fixed</span>';
                    dupRow1.style.color = '#34d399';
                }
                if (dupRow2) {
                    dupRow2.innerHTML = 'Order #2: "BK Grill" <span class="c-val">✔ Fixed</span>';
                    dupRow2.style.color = '#34d399';
                }
                if (dupRow3) {
                    dupRow3.innerHTML = 'Order #3: "BK Grill" <span class="c-val">✔ Fixed</span>';
                    dupRow3.style.color = '#34d399';
                }
                if (dupNotice) {
                    dupNotice.innerHTML = 'Had to write update loop for 10k rows!';
                    dupNotice.style.color = 'var(--v63-orange)';
                }
                
                if (restVal) {
                    restVal.innerHTML = 'id: 1 | name: <span class="c-val" style="font-weight:800;">"BK Grill"</span>';
                }
                if (sqlNotice) {
                    sqlNotice.style.opacity = '1';
                }
            } else {
                if (dupRow1) {
                    dupRow1.innerHTML = 'Order #1: "Burger King" <span class="c-err">❌ Dup</span>';
                    dupRow1.style.color = '';
                }
                if (dupRow2) {
                    dupRow2.innerHTML = 'Order #2: "Burger King" <span class="c-err">❌ Dup</span>';
                    dupRow2.style.color = '';
                }
                if (dupRow3) {
                    dupRow3.innerHTML = 'Order #3: "Burger King" <span class="c-err">❌ Dup</span>';
                    dupRow3.style.color = '';
                }
                if (dupNotice) {
                    dupNotice.innerHTML = 'Need to update thousands of orders!';
                    dupNotice.style.color = '';
                }
                
                if (restVal) {
                    restVal.innerHTML = 'id: 1 | name: "Burger King"';
                }
                if (sqlNotice) {
                    sqlNotice.style.opacity = '0';
                }
            }
        }

        // Slide 5: Postgres Relational DB Tree with Fried Chicken Metaphor
        else if (slideId === 'slide_sup_postgres') {
            const chickenMain = row.querySelector('#s-pg-chicken-main');
            const tagUsers = row.querySelector('#s-pg-tag-users');
            const tagProfiles = row.querySelector('#s-pg-tag-profiles');
            const tagOrders = row.querySelector('#s-pg-tag-orders');
            const readyLabel = row.querySelector('#s-pg-ready-label');

            if (chickenMain) {
                if (progress >= 0.1) chickenMain.classList.add('active');
                else chickenMain.classList.remove('active');
            }

            // Staggered tag display
            if (tagUsers) {
                if (progress >= 0.25) tagUsers.classList.add('active');
                else tagUsers.classList.remove('active');
            }
            if (tagProfiles) {
                if (progress >= 0.4) tagProfiles.classList.add('active');
                else tagProfiles.classList.remove('active');
            }
            if (tagOrders) {
                if (progress >= 0.55) tagOrders.classList.add('active');
                else tagOrders.classList.remove('active');
            }

            // Ready label scale pop-in
            if (readyLabel) {
                if (progress >= 0.75) {
                    readyLabel.classList.add('active');
                } else {
                    readyLabel.classList.remove('active');
                }
            }
        }

        // Slide 6: Pros/Cons Stacked Redesign with Simulations
        else if (slideId === 'slide_sup_pros_cons') {
            const prosCard = row.querySelector('#s-pc-pros-card');
            const consCard = row.querySelector('#s-pc-cons-card');
            
            const connCount = row.querySelector('#s-pc-conn-count');
            const connFill = row.querySelector('#s-pc-conn-fill');
            
            const searchLbl = row.querySelector('#s-pc-search-lbl');
            const indexBox = row.querySelector('#s-pc-index-box');
            const indexIcon = row.querySelector('#s-pc-index-icon');
            const indexLbl = row.querySelector('#s-pc-index-lbl');

            // Staggered card activation
            if (progress < 0.45) {
                if (prosCard) prosCard.classList.add('active');
                if (consCard) consCard.classList.remove('active');
                
                // Slow connection idle values
                if (connCount) connCount.textContent = Math.round(5 + progress * 5).toString();
                if (connFill) connFill.style.width = '8%';
                
                // Reset index warning
                if (indexBox) {
                    indexBox.className = "v63-index-warning-box";
                    if (indexIcon) {
                        indexIcon.setAttribute('data-lucide', 'alert-octagon');
                        indexIcon.style.color = 'var(--v63-orange)';
                    }
                    if (indexLbl) indexLbl.textContent = "NO INDEX!";
                }
                if (searchLbl) {
                    searchLbl.textContent = "Quét tuần tự (Seq Scan)";
                    searchLbl.style.color = "var(--v63-orange)";
                }
            } else {
                if (prosCard) prosCard.classList.remove('active');
                if (consCard) consCard.classList.add('active');

                // Rapid connection limit spike (spikes to 98)
                const consProgress = (progress - 0.45) / 0.55; // 0 to 1
                const curConn = Math.round(10 + Math.min(1.0, consProgress / 0.7) * 88);
                if (connCount) connCount.textContent = curConn.toString();
                if (connFill) {
                    connFill.style.width = `${curConn}%`;
                    if (curConn > 85) {
                        connFill.style.background = 'var(--v63-orange)';
                    } else {
                        connFill.style.background = 'var(--v63-primary)';
                    }
                }
                
                // Solve index scan simulation at progress > 0.75
                if (progress > 0.75) {
                    if (indexBox) {
                        indexBox.className = "v63-index-warning-box ok";
                        if (indexIcon) {
                            indexIcon.setAttribute('data-lucide', 'check-circle');
                            indexIcon.style.color = 'var(--v63-primary)';
                        }
                        if (indexLbl) indexLbl.textContent = "INDEX OK";
                    }
                    if (searchLbl) {
                        searchLbl.textContent = "⚡ Index Scan (0.01ms)";
                        searchLbl.style.color = "var(--v63-primary)";
                    }
                } else {
                    if (indexBox) {
                        indexBox.className = "v63-index-warning-box";
                        if (indexIcon) {
                            indexIcon.setAttribute('data-lucide', 'alert-octagon');
                            indexIcon.style.color = 'var(--v63-orange)';
                        }
                        if (indexLbl) indexLbl.textContent = "NO INDEX!";
                    }
                    if (searchLbl) {
                        searchLbl.textContent = "Quét tuần tự (Seq Scan)";
                        searchLbl.style.color = "var(--v63-orange)";
                    }
                }
            }

            // Animate sweeping scan line for Cons card under Seq Scan
            const scanLine = row.querySelector('#s-pc-scan-line');
            if (progress >= 0.45 && progress < 0.75) {
                if (scanLine) {
                    scanLine.style.display = 'block';
                    scanLine.style.top = ((progress - 0.45) / 0.3 * 100) + '%';
                }
            } else {
                if (scanLine) scanLine.style.display = 'none';
            }
        }

        // Slide 7: Firebase Pricing spike vs Supabase Flat - Redesigned to stacked
        else if (slideId === 'slide_sup_pricing_lockin') {
            const fbReads = row.querySelector('#s-pr-fb-reads');
            const fbCost = row.querySelector('#s-pr-fb-cost');
            const sbSize = row.querySelector('#s-pr-sb-size');
            const sbSizeFill = row.querySelector('#s-pr-sb-size-fill');
            
            const cardFb = row.querySelector('#s-pr-fb');
            const cardSb = row.querySelector('#s-pr-sb');

            // Stagger card activation based on audio focus
            if (progress < 0.5) {
                if (cardFb) cardFb.classList.add('active');
                if (cardSb) cardSb.classList.remove('active');

                // Firebase counts to 1,250,000 reads & $950.00
                const fbProgress = Math.min(1.0, progress / 0.45);
                if (fbReads) {
                    const maxReads = 1250000;
                    const curReads = Math.round(fbProgress * maxReads);
                    fbReads.textContent = curReads.toLocaleString();
                }
                if (fbCost) {
                    const maxCost = 950.00;
                    const curCost = (fbProgress * maxCost).toFixed(2);
                    fbCost.textContent = `$${parseFloat(curCost).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
                }

                // Shake Firebase card when cost explodes (progress > 0.25)
                if (cardFb && progress > 0.25) {
                    const shake = (Math.random() - 0.5) * 4.5;
                    cardFb.style.transform = `translateY(${shake}px) rotate(${(Math.random() - 0.5) * 1.5}deg)`;
                    cardFb.style.borderColor = 'var(--v63-orange)';
                }

                // Spawn flying coins from wallet
                let lastCoinTime = parseFloat(canvas.getAttribute('data-last-coin') || '0');
                if (progress - lastCoinTime > 0.04 && progress < 0.48) {
                    canvas.setAttribute('data-last-coin', progress.toString());
                    const wallet = row.querySelector('#s-pr-fb-wallet');
                    if (wallet) {
                        const coin = document.createElement('div');
                        coin.className = 'v63-coin-element';
                        coin.textContent = '$';
                        coin.style.left = `${10 + Math.random() * 20}px`;
                        coin.style.top = `${10 + Math.random() * 20}px`;
                        wallet.appendChild(coin);
                        setTimeout(() => coin.remove(), 800);
                    }
                }
            } else {
                if (cardFb) {
                    cardFb.classList.remove('active');
                    cardFb.style.transform = 'none';
                    cardFb.style.borderColor = '';
                }
                if (cardSb) cardSb.classList.add('active');

                // Supabase size grows slightly 1.2 -> 3.8 GB, pricing stays $25.00 FLAT
                const sbProgress = (progress - 0.5) / 0.5; // 0 to 1
                const curSize = (1.2 + sbProgress * 2.6).toFixed(1);
                if (sbSize) {
                    sbSize.textContent = `${curSize} GB`;
                }
                if (sbSizeFill) {
                    const fillPercent = Math.round((parseFloat(curSize) / 10) * 100);
                    sbSizeFill.style.width = `${fillPercent}%`;
                }
            }
        }

        // Slide 8: Realtime, S3 Storage progress, and Auth logins
        else if (slideId === 'slide_sup_features') {
            const authCard = row.querySelector('#s-feat-auth');
            const storageCard = row.querySelector('#s-feat-storage');
            const realtimeCard = row.querySelector('#s-feat-realtime');

            // Staggered introduction of cards
            const popCard = (card, start, end) => {
                if (!card) return;
                if (progress < start) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(25px)';
                } else if (progress > end) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    const local = (progress - start) / (end - start);
                    const y = 25 - local * 25;
                    card.style.opacity = local;
                    card.style.transform = `translateY(${y}px)`;
                }
            };

            popCard(authCard, 0.0, 0.2);
            popCard(storageCard, 0.1, 0.3);
            popCard(realtimeCard, 0.2, 0.4);

            // Auth list items fading in
            const auth2 = row.querySelector('#s-auth-item-2');
            const auth3 = row.querySelector('#s-auth-item-3');
            if (auth2) auth2.style.opacity = progress > 0.45 ? '1' : '0';
            if (auth3) auth3.style.opacity = progress > 0.7 ? '1' : '0';

            // Storage bars progress filling
            const bar1 = row.querySelector('#s-stor-bar-1');
            const bar2 = row.querySelector('#s-stor-bar-2');
            
            if (bar1) {
                const fill1 = Math.min(100, Math.max(0, (progress - 0.25) / 0.3 * 100));
                bar1.style.width = `${fill1}%`;
            }
            if (bar2) {
                const fill2 = Math.min(100, Math.max(0, (progress - 0.5) / 0.3 * 100));
                bar2.style.width = `${fill2}%`;
            }

            // Realtime bubble feed popups
            const chat1 = row.querySelector('#s-chat-b1');
            const chat2 = row.querySelector('#s-chat-b2');
            const chat3 = row.querySelector('#s-chat-b3');

            if (chat1) progress > 0.35 ? chat1.classList.add('active') : chat1.classList.remove('active');
            if (chat2) progress > 0.6 ? chat2.classList.add('active') : chat2.classList.remove('active');
            if (chat3) progress > 0.85 ? chat3.classList.add('active') : chat3.classList.remove('active');
        }

        // Slide 9: Cloud vs Terminal docker-compose loop
        else if (slideId === 'slide_sup_open_source') {
            const cloudCard = row.querySelector('#s-host-cloud');
            const selfCard = row.querySelector('#s-host-self');
            const badgeSelf = row.querySelector('#s-self-badge');
            
            const line1 = row.querySelector('#s-term-line-1');
            const line2 = row.querySelector('#s-term-line-2');
            const line3 = row.querySelector('#s-term-line-3');
            const line4 = row.querySelector('#s-term-line-4');

            // Stagger cards zoom entry
            if (cloudCard) {
                const scale = progress < 0.2 ? 0.9 + (progress / 0.2) * 0.1 : 1.0;
                cloudCard.style.transform = `scale(${scale})`;
            }

            // Docker compose terminal script updates
            const typeText = (element, text, start, end) => {
                if (!element) return;
                if (progress < start) {
                    element.textContent = "";
                } else if (progress > end) {
                    element.textContent = text;
                } else {
                    const local = (progress - start) / (end - start);
                    const chars = Math.floor(local * text.length);
                    element.textContent = text.slice(0, chars);
                }
            };

            typeText(line1, "$ docker-compose up -d", 0.1, 0.35);
            typeText(line2, "Creating supabase-db ... done", 0.4, 0.6);
            typeText(line3, "Creating supabase-auth ... done", 0.6, 0.78);
            typeText(line4, "Services active on port 8000! ✔", 0.8, 0.95);

            // Update docker status badge
            if (badgeSelf) {
                if (progress >= 0.95) {
                    badgeSelf.textContent = "RUNNING";
                    badgeSelf.className = "v63-badge-overlay green";
                } else {
                    badgeSelf.textContent = "COMPOSING";
                    badgeSelf.className = "v63-badge-overlay";
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video63',
        topic: 'Supabase Open-Source Firebase Killer',
        episodeNum: 63,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video63 Plugin] Loaded: Supabase - The Open-Source Firebase Killer.');
})();
