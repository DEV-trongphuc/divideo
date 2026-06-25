/**
 * Video 29: Facebook Mutual Friends (Graph Intersection & Two Pointers)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video29
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_fb_2: [
            { text: 'SQL', start: 1.0, end: 9.0, class: 'active-bad' },
            { text: 'thảm họa nghẽn', start: 9.0, end: 18.0, class: 'active-bad' }
        ],
        slide_fb_3: [
            { text: 'Đồ thị', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'Điểm', start: 8.0, end: 15.0, class: 'active-gold' },
            { text: 'Đường nối', start: 15.0, end: 22.0, class: 'active-good' }
        ],
        slide_fb_4: [
            { text: 'Danh sách kề', start: 1.0, end: 9.0, class: 'active-good' },
            { text: 'sắp xếp', start: 9.0, end: 18.0, class: 'active-gold' }
        ],
        slide_fb_5: [
            { text: 'Hai con trỏ', start: 1.0, end: 9.0, class: 'active-good' },
            { text: 'O(n+m)', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_fb_6: [
            { text: 'Cristiano Ronaldo', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'HashSet', start: 8.0, end: 16.0, class: 'active-good' },
            { text: 'Bitmap', start: 16.0, end: 24.0, class: 'active-good' }
        ],
        slide_fb_7: [
            { text: 'Sharding', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'phân mảnh', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_fb_8: [
            { text: 'gợi ý', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'chấm điểm', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_fb_9: [
            { text: '4.5 tỷ tỷ cặp', start: 1.0, end: 9.0, class: 'active-bad' },
            { text: 'bộ nhớ đệm', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_fb_10: [
            { text: 'đồ thị', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'thiết kế hệ thống', start: 9.0, end: 18.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_fb_1',
        'slide_fb_2',
        'slide_fb_3',
        'slide_fb_4',
        'slide_fb_5',
        'slide_fb_6',
        'slide_fb_7',
        'slide_fb_8',
        'slide_fb_9',
        'slide_fb_10'
    ];

    // Helper: generate array list HTML
    function renderArrayHTML(arrayId, values, isPointerActive = false) {
        return `
            <div class="v29-array-container" id="${arrayId}">
                ${values.map((v, i) => `
                    <div class="v29-array-node" id="${arrayId}-node-${i}">
                        ${v}
                    </div>
                `).join('')}
                ${isPointerActive ? `<div class="v29-pointer" id="${arrayId}-pointer" style="left: 0px;"><i data-lucide="chevron-up"></i></div>` : ''}
            </div>
        `;
    }

    // Helper: generate array list HTML for X (pointer on top)
    function renderArrayHTML_X(arrayId, values, isPointerActive = false) {
        return `
            <div class="v29-array-container" id="${arrayId}">
                ${values.map((v, i) => `
                    <div class="v29-array-node" id="${arrayId}-node-${i}">
                        ${v}
                    </div>
                `).join('')}
                ${isPointerActive ? `<div class="v29-pointer-x" id="${arrayId}-pointer" style="left: 0px;"><i data-lucide="chevron-down"></i></div>` : ''}
            </div>
        `;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_fb_1') {
            canvas.innerHTML = `
                <div class="v29-zoom-container" style="justify-content: flex-start; padding-top: 10px; gap: 14px;">
                    <div style="font-size:16px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Quy mô mạng xã hội Facebook
                    </div>

                    <!-- Profile Card Area -->
                    <div class="v29-fb-card" style="position:relative; width: 100%; height: 320px; overflow: hidden; display: flex; flex-direction: column;">
                        <!-- Header with FB style search & messages -->
                        <div class="v29-fb-header">
                            <span class="v29-fb-brand">facebook</span>
                            <div style="display: flex; gap: 8px;">
                                <div style="width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center;"><i data-lucide="search" style="width:14px; height:14px; color:#fff;"></i></div>
                                <div style="width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center;"><i data-lucide="message-circle" style="width:14px; height:14px; color:#fff;"></i></div>
                            </div>
                        </div>

                        <!-- FB Navigation Tabs -->
                        <div class="v29-fb-tabs">
                            <div class="v29-fb-tab-item active"><i data-lucide="home" style="width:18px; height:18px;"></i></div>
                            <div class="v29-fb-tab-item"><i data-lucide="users" style="width:18px; height:18px;"></i></div>
                            <div class="v29-fb-tab-item"><i data-lucide="video" style="width:18px; height:18px;"></i></div>
                            <div class="v29-fb-tab-item"><i data-lucide="user" style="width:18px; height:18px;"></i></div>
                            <div class="v29-fb-tab-item"><i data-lucide="bell" style="width:18px; height:18px;"></i></div>
                            <div class="v29-fb-tab-item"><i data-lucide="menu" style="width:18px; height:18px;"></i></div>
                        </div>

                        <!-- Card Body with Stacked Avatars & Flying Dots -->
                        <div class="v29-fb-profile-body" style="flex:1; justify-content:center; position:relative; padding:12px 24px;">
                            
                            <!-- SVG connecting line with running dash -->
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                <path id="v29-main-arc" d="M 120 70 Q 185 30 250 70" fill="none" stroke="rgba(24, 119, 242, 0.25)" stroke-width="2.5" stroke-dasharray="6 4" />
                            </svg>

                            <!-- Stacked profile avatars -->
                            <div class="v29-avatar-stack">
                                <div class="v29-avatar user-a">A</div>
                                <div class="v29-avatar user-x">X</div>
                            </div>

                            <!-- User info name -->
                            <div style="font-size:15px; font-weight:800; color:#fff; text-align:center; margin-top:-5px; z-index:2;">
                                Alice & Xavier
                            </div>

                            <!-- Mutual Friends Badge -->
                            <div class="v29-mutual-badge" id="v29-mutual-badge" style="z-index:2;">
                                <i data-lucide="users" style="width:16px; height:16px;"></i>
                                <span id="v29-mutual-val">0 bạn chung</span>
                            </div>

                            <!-- Flying User Cards (Pills with circular avatar + name) -->
                            <div id="v29-fly-1" class="v29-flying-card" style="opacity:0; left:10px; top:60px;">
                                <span class="v29-flying-avatar-circle" style="background:#60a5fa;"></span> @bob
                            </div>
                            <div id="v29-fly-2" class="v29-flying-card" style="opacity:0; right:15px; top:80px;">
                                <span class="v29-flying-avatar-circle" style="background:#34d399;"></span> @clara
                            </div>
                            <div id="v29-fly-3" class="v29-flying-card" style="opacity:0; left:30px; bottom:40px;">
                                <span class="v29-flying-avatar-circle" style="background:#fbbf24;"></span> @daniel
                            </div>
                            <div id="v29-fly-4" class="v29-flying-card" style="opacity:0; right:40px; bottom:60px;">
                                <span class="v29-flying-avatar-circle" style="background:#f87171;"></span> @emma
                            </div>
                        </div>
                    </div>

                </div>
            `;
        }
        else if (slideId === 'slide_fb_2') {
            canvas.innerHTML = `
                <div class="v29-zoom-container" style="justify-content: flex-start; padding-top: 10px; gap: 14px; zoom: 1.15;">
                    <div class="v29-fb-card" style="padding: 16px; width: 100%; display: flex; flex-direction: column; gap: 14px;">
                        
                        <!-- Stack layout representing User & Friend tables vertically with bigger text -->
                        <div class="v29-db-stack">
                            <!-- Table 1: User list -->
                            <div class="v29-db-card-large" id="v29-db-user">
                                <div class="v29-db-scanline"></div>
                                <div style="font-size:14px; font-weight:bold; color:var(--fb-blue); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="table" style="width:16px; height:16px;"></i> Table: User (3 Tỷ hàng)
                                </div>
                                <table class="v29-db-table-large">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="v29-row-a">
                                            <td><span class="v29-badge-id-large">1</span></td>
                                            <td><span class="v29-badge-code-large blue">A</span> <span class="v29-cell-name">Alice</span></td>
                                        </tr>
                                        <tr class="v29-row-x">
                                            <td><span class="v29-badge-id-large">3.0B</span></td>
                                            <td><span class="v29-badge-code-large blue">X</span> <span class="v29-cell-name">Xavier</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Table 2: Friends Mapping -->
                            <div class="v29-db-card-large" id="v29-db-friend">
                                <div class="v29-db-scanline"></div>
                                <div style="font-size:14px; font-weight:bold; color:var(--fb-orange); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="git-commit" style="width:16px; height:16px;"></i> Table: Friend Map
                                </div>
                                <table class="v29-db-table-large">
                                    <thead>
                                        <tr>
                                            <th>user_id</th>
                                            <th>friend_id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="v29-row-a">
                                            <td><span class="v29-badge-code-large blue">A</span></td>
                                            <td><span class="v29-badge-code-large orange">B</span></td>
                                        </tr>
                                        <tr class="v29-row-a v29-row-mutual">
                                            <td><span class="v29-badge-code-large blue">A</span></td>
                                            <td><span class="v29-badge-code-large orange">C</span></td>
                                        </tr>
                                        <tr class="v29-row-x v29-row-mutual">
                                            <td><span class="v29-badge-code-large blue">X</span></td>
                                            <td><span class="v29-badge-code-large orange">C</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Metrics Dashboard Panel -->
                        <div class="v29-metrics-panel" style="padding: 12px 0 0 0; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; gap: 14px;">
                            <!-- Metric 1: Scan Rows -->
                            <div class="v29-metric-card" style="flex: 1; text-align: left;">
                                <div class="v29-metric-header" style="display:flex; justify-content:space-between; align-items:center;">
                                    <span class="v29-metric-label" style="font-size:11px; font-weight:800; color:rgba(255,255,255,0.45);">FULL TABLE SCAN</span>
                                    <i data-lucide="database" class="v29-metric-icon" style="width:14px; height:14px; color:var(--fb-blue);"></i>
                                </div>
                                <div class="v29-metric-value-large" id="v29-scan-rows" style="color:#fff;">0 / 3 Tỷ hàng</div>
                                <div class="v29-metric-bar" style="height:8px; margin-top:6px;">
                                    <div class="v29-metric-bar-fill" id="v29-scan-bar" style="height:100%;"></div>
                                </div>
                            </div>

                            <!-- Metric 2: Latency -->
                            <div class="v29-metric-card" style="flex: 1; text-align: left;">
                                <div class="v29-metric-header" style="display:flex; justify-content:space-between; align-items:center;">
                                    <span class="v29-metric-label" style="font-size:11px; font-weight:800; color:rgba(255,255,255,0.45);">ĐỘ TRỄ TRUY VẤN</span>
                                    <i data-lucide="clock" class="v29-metric-icon" style="width:14px; height:14px; color:var(--fb-orange);"></i>
                                </div>
                                <div class="v29-metric-value-large" id="v29-latency-val" style="color:var(--fb-green);">50 ms</div>
                                <div class="v29-metric-bar" style="height:8px; margin-top:6px;">
                                    <div class="v29-metric-bar-fill" id="v29-latency-bar" style="height:100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottleneck Alert -->
                    <div class="v29-fb-card v29-alert-card" id="v29-db-alert" style="padding:12px 16px; display:flex; align-items:center; justify-content:center; gap:10px; opacity:0; transform:translateY(12px); transition:all 0.3s; width: 100%;">
                        <i data-lucide="alert-octagon" style="width:24px; height:24px; color:#f87171; flex-shrink: 0;"></i>
                        <span style="font-size:14px; color:#f87171; font-weight:900; letter-spacing:0.5px; text-align:left;">🚨 NGHẼN DATABASE: 3 TỶ USER KHÔNG THỂ JOIN!</span>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_3') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Mô hình đồ thị quan hệ (Social Graph)
                    </div>

                    <!-- Live Graph View -->
                    <div class="v29-graph-container" id="v29-graph">
                        <!-- Node A (Blue) -->
                        <div class="v29-graph-node" id="node-a" style="left: 40px; top: 100px;">A</div>
                        
                        <!-- Node X (Orange) -->
                        <div class="v29-graph-node" id="node-x" style="left: 300px; top: 100px;">X</div>

                        <!-- Nodes C, D (Common Neighbors - Green) -->
                        <div class="v29-graph-node" id="node-c" style="left: 165px; top: 35px;">C</div>
                        <div class="v29-graph-node" id="node-d" style="left: 165px; top: 165px;">D</div>

                        <!-- Other Friend Nodes (B, E, Y) -->
                        <div class="v29-graph-node" id="node-b" style="left: 80px; top: 10px;">B</div>
                        <div class="v29-graph-node" id="node-e" style="left: 80px; top: 200px;">E</div>
                        <div class="v29-graph-node" id="node-y" style="left: 230px; top: 200px;">Y</div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_4') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Cơ cấu lưu trữ: Danh sách kề
                    </div>

                    <div class="v29-fb-card" style="padding:18px; display:flex; flex-direction:column; gap:16px; width:100%;">
                        <div style="font-size:14px; font-weight:bold; color:var(--fb-text-muted); border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                            Lưu trữ sẵn mảng bạn bè đã được sắp xếp
                        </div>

                        <!-- Adjacency list for A -->
                        <div class="v29-list-row">
                            <div class="v29-list-label active-a">User A ➔</div>
                            ${renderArrayHTML('v29-array-a-4', [2, 5, 9, 11, 18])}
                        </div>

                        <!-- Adjacency list for X -->
                        <div class="v29-list-row">
                            <div class="v29-list-label active-x">User X ➔</div>
                            ${renderArrayHTML_X('v29-array-x-4', [1, 2, 5, 18])}
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_5') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:2px; letter-spacing:0.8px;">
                        Giao tập hợp bằng Hai con trỏ
                    </div>
                    
                    <div style="font-size:11px; font-family:monospace; color:#34d399; font-weight:bold; text-align:center; margin-bottom:5px; text-transform:uppercase;">
                        Độ phức tạp tuyến tính: O(n + m)
                    </div>

                    <div class="v29-fb-card" style="padding:22px 18px; display:flex; flex-direction:column; gap:20px; width:100%; position:relative;">
                        
                        <!-- List A row with pointer -->
                        <div class="v29-list-row" style="margin-bottom:12px; position:relative;">
                            <div class="v29-list-label active-a">User A:</div>
                            ${renderArrayHTML('v29-array-a-5', [2, 5, 9, 11, 18], true)}
                        </div>

                        <!-- List X row with pointer -->
                        <div class="v29-list-row" style="margin-top:12px; position:relative;">
                            <div class="v29-list-label active-x">User X:</div>
                            ${renderArrayHTML_X('v29-array-x-5', [1, 2, 5, 18], true)}
                        </div>
                        
                        <!-- Comparison Info & Matches list -->
                        <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
                            <div style="font-size:12px; color:var(--fb-text-muted); font-family:monospace;" id="v29-compare-log">
                                So sánh: A[...] vs X[...]
                            </div>
                            <div style="display:flex; align-items:center; gap:6px;">
                                <span style="font-size:12px; font-weight:bold; color:var(--fb-green);">Bạn chung:</span>
                                <div style="display:flex; gap:4px;" id="v29-match-list">
                                    <!-- Matches display here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_6') {
            canvas.innerHTML = `
                <div class="v29-zoom-container" style="zoom: 1.25; gap: 14px; display:flex; flex-direction:column; width:100%;">
                    <div style="font-size:18px; font-weight:900; color:rgba(255,255,255,0.45); text-transform:uppercase; text-align:center; margin-bottom:4px; letter-spacing:0.8px;">
                        Thử thách KOL: Quá nhiều followers
                    </div>

                    <!-- CR7 Profile vs HashSet acceleration split layout -->
                    <div style="display:grid; grid-template-columns: 1.1fr 1.2fr; gap:14px; width:100%; box-sizing:border-box;">
                        
                        <!-- Left: CR7 Profile Card with Ticking Followers and Traffic -->
                        <div class="v29-fb-card v29-avatar-gold-glow" style="padding:16px; text-align:center; position:relative; overflow:hidden; display:flex; flex-direction:column; align-items:center; gap:8px;">
                            <!-- Floating queries in CR7 card representing user queries -->
                            <div class="v29-request-incoming" id="v29-req-0" style="left:10px; top:60px; display:none;">Join A?</div>
                            <div class="v29-request-incoming" id="v29-req-1" style="right:10px; top:110px; display:none;">Join X?</div>
                            <div class="v29-request-incoming" id="v29-req-2" style="left:20px; top:130px; display:none;">Common?</div>

                            <!-- Avatar with premium frame -->
                            <div style="position:relative; width:64px; height:64px; margin-bottom:2px;">
                                <img src="https://cdnmedia.baotintuc.vn/Upload/EqV5H9rWgvy9oNikwkHLXA/files/02102025-Cristiano-Ronaldo-1.png" 
                                     style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:2px solid #fbbf24; background:#1e293b;" />
                                <!-- Online LED -->
                                <div style="position:absolute; bottom:2px; right:2px; width:10px; height:10px; border-radius:50%; background:#34d399; border:2px solid #242526;"></div>
                            </div>
                            
                            <!-- Name and Verified Blue Badge -->
                            <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                                <span style="font-weight:900; font-size:14px; color:#fff;">C. Ronaldo</span>
                                <span class="v29-verified-badge">✓</span>
                            </div>
                            
                            <!-- Follower count ticker -->
                            <div id="v29-cr7-followers" style="font-size:12px; color:#fbbf24; font-weight:800; font-family:monospace; background:rgba(251,191,36,0.1); padding:2px 8px; border-radius:6px; border:1px solid rgba(251,191,36,0.2);">
                                50.000.000 Followers
                            </div>
                            
                            <!-- Database state under naive two-pointer intersection -->
                            <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:8px; margin-top:4px; font-size:9px; color:rgba(255,255,255,0.45); text-transform:uppercase; font-weight:bold; width:100%;">
                                Hai con trỏ O(N)
                            </div>
                            <div id="v29-cr7-status" style="color:var(--fb-red); font-size:11px; font-weight:900; letter-spacing:0.5px; padding:4px; border-radius:6px; border:1px solid rgba(248,113,113,0.2); width:100%; box-sizing:border-box;">
                                ❌ QUÁ TẢI (50M REQS)
                            </div>
                        </div>

                        <!-- Right: HashSet lookup simulator -->
                        <div class="v29-fb-card" style="padding:16px; border-color:rgba(52,211,153,0.3); display:flex; flex-direction:column; gap:8px;">
                            <div style="font-weight:900; font-size:13px; color:#fff; text-align:center;">HashSet Lookup</div>
                            <div style="font-size:11px; color:var(--fb-green); font-weight:bold; text-align:center; background:rgba(52,211,153,0.1); padding:2px 8px; border-radius:6px; border:1px solid rgba(52,211,153,0.2); display:inline-block; margin:0 auto;">
                                Tốc độ tra cứu O(1)
                            </div>
                            
                            <!-- HashTable layout representation -->
                            <div class="v29-hashtable-container" style="margin-top:6px;">
                                <div class="v29-hashtable-row">
                                    <span class="v29-hashtable-index">[0]</span>
                                    <div class="v29-hashtable-bucket"><span class="v29-hash-val-badge">Bob</span></div>
                                </div>
                                <div class="v29-hashtable-row">
                                    <span class="v29-hashtable-index">[1]</span>
                                    <div class="v29-hashtable-bucket"><span class="v29-hash-val-badge">Charlie</span></div>
                                </div>
                                <div class="v29-hashtable-row">
                                    <span class="v29-hashtable-index">[2]</span>
                                    <div class="v29-hashtable-bucket" id="v29-bucket-target"><span class="v29-hash-val-badge target">Alice</span></div>
                                </div>
                                <div class="v29-hashtable-row">
                                    <span class="v29-hashtable-index">[3]</span>
                                    <div class="v29-hashtable-bucket"><span class="v29-hash-val-badge">David</span></div>
                                </div>
                            </div>

                            <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:6px; text-align:center; font-size:11px; font-weight:800; color:var(--fb-green); transition: all 0.3s;" id="v29-hash-result">
                                Query: Alice -> Found in 0.1ms
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_7') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Quy mô phân tán: Sharding Graph
                    </div>

                    <!-- Split Servers visualization -->
                    <div class="v29-fb-card" style="padding:18px; display:flex; flex-direction:column; gap:14px; width:100%;">
                        <div style="font-size:13px; font-weight:bold; color:var(--fb-text-muted); border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px; text-align:left;">
                            Chia nhỏ Đồ thị quan hệ theo dải ký tự ID
                        </div>

                        <div style="display:flex; justify-content:space-between; gap:16px;">
                            <!-- Server Shard 1 -->
                            <div id="v29-shard-1" style="flex:1; background:rgba(0,0,0,0.3); border:1.5px solid rgba(255,255,255,0.05); border-radius:12px; padding:12px; text-align:center; transition:all 0.3s;">
                                <i data-lucide="server" style="width:28px; height:28px; color:var(--fb-blue); margin-bottom:6px;"></i>
                                <div style="font-weight:bold; font-size:12px; color:#fff;">Shard 1 (A - M)</div>
                                <div style="font-size:10px; color:rgba(255,255,255,0.45); margin-top:2px;">Chứa Alice (A)</div>
                            </div>

                            <!-- Server Shard 2 -->
                            <div id="v29-shard-2" style="flex:1; background:rgba(0,0,0,0.3); border:1.5px solid rgba(255,255,255,0.05); border-radius:12px; padding:12px; text-align:center; transition:all 0.3s;">
                                <i data-lucide="server" style="width:28px; height:28px; color:var(--fb-orange); margin-bottom:6px;"></i>
                                <div style="font-weight:bold; font-size:12px; color:#fff;">Shard 2 (N - Z)</div>
                                <div style="font-size:10px; color:rgba(255,255,255,0.45); margin-top:2px;">Chứa Xavier (X)</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_8') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:4px; letter-spacing:0.8px;">
                        Gợi ý kết bạn (AI Ranker scoring)
                    </div>

                    <div style="display:flex; gap:16px; width:100%; box-sizing:border-box; align-items: stretch;">
                        <!-- Left Panel: Ranking Score Dashboard -->
                        <div class="v29-fb-card" style="padding:16px; flex:1.2; display:flex; flex-direction:column; gap:8px; text-align:left;">
                            <div style="font-size:12px; color:var(--fb-text-muted); font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px; text-transform:uppercase; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                                <i data-lucide="bar-chart-3" style="width:13px; height:13px; color:var(--fb-blue);"></i> Các tiêu chí chấm điểm
                            </div>
                            
                            <div class="v29-score-card">
                                <!-- Metric 1 -->
                                <div class="v29-criteria-row">
                                    <div class="v29-criteria-icon-wrap">
                                        <i data-lucide="users" style="width:14px; height:14px;"></i>
                                    </div>
                                    <div class="v29-criteria-info">
                                        <div class="v29-score-item">
                                            <span>Bạn chung (Mutual Friends)</span>
                                            <span class="v29-score-points blue">+40 điểm</span>
                                        </div>
                                        <div class="v29-progress-container">
                                            <div class="v29-progress-fill blue" id="v29-score-fill-1"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Metric 2 -->
                                <div class="v29-criteria-row">
                                    <div class="v29-criteria-icon-wrap">
                                        <i data-lucide="map-pin" style="width:14px; height:14px;"></i>
                                    </div>
                                    <div class="v29-criteria-info">
                                        <div class="v29-score-item">
                                            <span>Cùng thành phố / Khu vực</span>
                                            <span class="v29-score-points green">+20 điểm</span>
                                        </div>
                                        <div class="v29-progress-container">
                                            <div class="v29-progress-fill green" id="v29-score-fill-2"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Metric 3 -->
                                <div class="v29-criteria-row">
                                    <div class="v29-criteria-icon-wrap">
                                        <i data-lucide="navigation" style="width:14px; height:14px;"></i>
                                    </div>
                                    <div class="v29-criteria-info">
                                        <div class="v29-score-item">
                                            <span>Check-in gần nhau (Proximity)</span>
                                            <span class="v29-score-points orange">+15 điểm</span>
                                        </div>
                                        <div class="v29-progress-container">
                                            <div class="v29-progress-fill orange" id="v29-score-fill-3"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Metric 4 -->
                                <div class="v29-criteria-row">
                                    <div class="v29-criteria-icon-wrap">
                                        <i data-lucide="briefcase" style="width:14px; height:14px;"></i>
                                    </div>
                                    <div class="v29-criteria-info">
                                        <div class="v29-score-item">
                                            <span>Cùng trường học / Công ty</span>
                                            <span class="v29-score-points purple">+25 điểm</span>
                                        </div>
                                        <div class="v29-progress-container">
                                            <div class="v29-progress-fill purple" id="v29-score-fill-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: People You May Know Card -->
                        <div class="v29-fb-card" id="v29-suggest-card" style="padding:16px; flex:0.8; display:flex; flex-direction:column; align-items:center; justify-content:space-between; border-color:rgba(255,255,255,0.05); transition:all 0.4s ease; opacity: 0.75; transform:scale(0.95); background: radial-gradient(circle at top left, rgba(24, 119, 242, 0.12), rgba(15, 23, 42, 0.98));">
                            <div class="v29-badge-suggest">Gợi ý kết bạn</div>
                            
                            <!-- Avatar with dashed spinning ring -->
                            <div class="v29-avatar-wrapper">
                                <div class="v29-avatar-ring"></div>
                                <img src="https://scontent.fsgn5-21.fna.fbcdn.net/v/t39.30808-6/668933919_1261633489494055_7499248789811692787_n.jpg?stp=dst-jpg_tt6&cstp=mx894x891&ctp=s894x891&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wvLh2Riq2QMQ7kNvwGt_IxC&_nc_oc=AdrHuRf8zauOjhCJSY0xbW89HJfw-nvDaIMyH4iuu8k4qCMhvobjx6UuzBZg6t7PkOw&_nc_zt=23&_nc_ht=scontent.fsgn5-21.fna&_nc_gid=3hvTf0ik8SHGLNgNHWbq5A&_nc_ss=7b2a8&oh=00_Af90XAmsbWyRbIGON5gM-rT2yLYpw1T5lJtUnqS6l6SW-w&oe=6A42FD48" 
                                     class="v29-avatar-img" />
                                <div class="v29-online-dot"></div>
                            </div>
                            
                            <!-- Name and Blue Verified Badge -->
                            <div style="display:flex; align-items:center; gap:4px; margin-top:2px;">
                                <span style="font-weight:900; font-size:14px; color:#fff; white-space:nowrap;">Turnio DEV</span>
                                <span class="v29-verified-badge" style="width:12px; height:12px; font-size:7px; margin-left: 0;">✓</span>
                            </div>

                            <!-- Social Proof: Mutual Friends overlapping avatars -->
                            <div class="v29-mutual-avatars">
                                <div class="v29-mutual-avatar-group">
                                    <img src="https://cdnmedia.baotintuc.vn/Upload/EqV5H9rWgvy9oNikwkHLXA/files/02102025-Cristiano-Ronaldo-1.png" class="v29-mini-avatar" />
                                    <span class="v29-mini-avatar letter">Y</span>
                                    <span class="v29-mini-avatar letter blue">X</span>
                                </div>
                                <span style="font-size: 8px; color: var(--fb-text-muted); font-weight: 700; white-space: nowrap;">9 bạn chung bao gồm CR7</span>
                            </div>
                            
                            <!-- Overall Score overlay inside HUD ring -->
                            <div class="v29-score-hud">
                                <svg class="v29-hud-svg" viewBox="0 0 80 80">
                                    <defs>
                                        <linearGradient id="v29-hud-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#1877f2" />
                                            <stop offset="100%" stop-color="#60a5fa" />
                                        </linearGradient>
                                    </defs>
                                    <circle class="v29-hud-bg" cx="40" cy="40" r="34" />
                                    <circle class="v29-hud-fill" id="v29-hud-fill-circle" cx="40" cy="40" r="34" stroke-dasharray="213.63" stroke-dashoffset="213.63" />
                                </svg>
                                <div class="v29-hud-value" id="v29-score-value">0%</div>
                            </div>
                            
                            <button class="v29-add-btn">
                                <i data-lucide="user-plus" style="width:12px; height:12px; color:#fff;"></i> Thêm bạn bè
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_9') {
            canvas.innerHTML = `
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Bài toán lưu trữ tỷ tỷ cặp
                    </div>

                    <div class="v29-fb-card" style="padding:20px; border-color:rgba(239, 68, 68, 0.25); background:rgba(239, 68, 68, 0.02); text-align:center; width:100%;">
                        <div style="font-size:12px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; font-family:monospace; letter-spacing:0.5px;">
                            Số lượng cặp quan hệ khả thi cho 3 tỷ người dùng:
                        </div>
                        <div style="font-size:22px; font-weight:900; color:#fff; margin-top:8px; font-family:monospace; letter-spacing:0.5px;">
                            3B × (3B - 1) / 2
                        </div>
                        <div style="font-size:16px; color:rgba(255,255,255,0.3); margin:4px 0;">
                            =
                        </div>
                        <div style="font-size:26px; font-weight:900; color:var(--fb-red); text-shadow:0 0 10px rgba(239,68,68,0.3); font-family:monospace; letter-spacing:0.5px;">
                            4.5 Tỷ Tỷ Cặp!
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top:10px; margin-top:12px; font-size:13px; color:var(--fb-orange); font-weight:bold; letter-spacing:0.5px;">
                            ⚠️ Không hệ thống nào lưu trữ nổi dữ liệu tĩnh này!
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_fb_10') {
            canvas.innerHTML = `
                <div class="v29-zoom-container" style="justify-content: center; gap: 32px;">
                    <!-- Social Graph Intersection -->
                    <div style="position:relative; width:300px; height:180px; display:flex; align-items:center; justify-content:center;">
                        <!-- Node Left -->
                        <div style="position:absolute; left:20px; width:70px; height:70px; border-radius:50%; background:#3b82f6; border:3px solid #121212; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(59,130,246,0.3); z-index: 3; animation: v29-float 5s infinite;">
                            <i data-lucide="user" style="width:36px; height:36px; color:#fff;"></i>
                        </div>
                        <!-- Connecting Lines to Center -->
                        <svg style="position:absolute; width:100%; height:100%; pointer-events:none; z-index:1;">
                            <line x1="55" y1="90" x2="150" y2="90" style="stroke:rgba(255,255,255,0.15); stroke-width:3; stroke-dasharray: 6 4;" />
                            <line x1="245" y1="90" x2="150" y2="90" style="stroke:rgba(255,255,255,0.15); stroke-width:3; stroke-dasharray: 6 4;" />
                            <line x1="55" y1="90" x2="150" y2="40" style="stroke:rgba(255,255,255,0.1); stroke-width:2;" />
                            <line x1="245" y1="90" x2="150" y2="40" style="stroke:rgba(255,255,255,0.1); stroke-width:2;" />
                            <line x1="55" y1="90" x2="150" y2="140" style="stroke:rgba(255,255,255,0.1); stroke-width:2;" />
                            <line x1="245" y1="90" x2="150" y2="140" style="stroke:rgba(255,255,255,0.1); stroke-width:2;" />
                        </svg>
                        <!-- Center Intersection Node -->
                        <div style="position:absolute; width:90px; height:90px; border-radius:50%; background:rgba(245,158,11,0.1); border:3px solid #f59e0b; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(245,158,11,0.3); z-index: 4; animation: v29-float 3s infinite 0.5s;" id="v29-outro-mutual">
                            <i data-lucide="users" style="width:34px; height:34px; color:#f59e0b; margin-bottom:2px;"></i>
                            <span style="font-size:12px; font-weight:900; color:#fff; font-family:'Outfit';">MUTUAL</span>
                        </div>
                        <!-- Node Right -->
                        <div style="position:absolute; right:20px; width:70px; height:70px; border-radius:50%; background:#10b981; border:3px solid #121212; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(16,185,129,0.3); z-index: 3; animation: v29-float 5s infinite 1s;">
                            <i data-lucide="user-check" style="width:36px; height:36px; color:#fff;"></i>
                        </div>
                    </div>
                    <!-- Summary Card -->
                    <div class="glass-card" style="padding:18px 28px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); border-radius:16px; text-align:center; width:100%; max-width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6); animation: v29-float 6s ease-in-out infinite 1s;">
                        <div style="font-family:'Outfit', sans-serif; font-size:16px; font-weight:800; color:var(--gold-primary); letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:8px;">Social Graph Intersection</div>
                        <div style="font-size:15px; color:#94a3b8; line-height:1.6; display:block;">Xử lý giao tập hợp quy mô lớn siêu tốc</div>
                    </div>
                </div>
            `;
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_fb_1') {
            // Flying avatar dots flying into profile stacks
            const f1 = canvas.querySelector('#v29-fly-1');
            const f2 = canvas.querySelector('#v29-fly-2');
            const f3 = canvas.querySelector('#v29-fly-3');
            const f4 = canvas.querySelector('#v29-fly-4');

            const animateDot = (el, startProgress, endProgress, startX, startY, endX, endY) => {
                if (!el) return;
                if (progress >= startProgress && progress <= endProgress) {
                    const t = (progress - startProgress) / (endProgress - startProgress);
                    el.style.opacity = t < 0.2 ? (t * 5) : (1 - t);
                    el.style.left = `${startX + t * (endX - startX)}px`;
                    el.style.top = `${startY + t * (endY - startY)}px`;
                } else {
                    el.style.opacity = '0';
                }
            };

            // Flying endpoints target center of profile card
            animateDot(f1, 0.0, 0.35, 10, 60, 150, 90);
            animateDot(f2, 0.15, 0.5, 340, 80, 180, 90);
            animateDot(f3, 0.3, 0.65, 30, 220, 160, 90);
            animateDot(f4, 0.45, 0.8, 320, 200, 170, 90);

            // Counter mutual friends ticks up from 0 to 128
            const mutualVal = canvas.querySelector('#v29-mutual-val');
            const mutualBadge = canvas.querySelector('#v29-mutual-badge');
            const count = Math.round(progress * 128);
            
            if (mutualVal) {
                mutualVal.textContent = `${count} bạn chung`;
            }

            if (mutualBadge) {
                if (progress >= 0.8) {
                    mutualBadge.classList.add('highlight');
                } else {
                    mutualBadge.classList.remove('highlight');
                }
            }
        }
        else if (slideId === 'slide_fb_2') {
            const scanRows = canvas.querySelector('#v29-scan-rows');
            const latencyVal = canvas.querySelector('#v29-latency-val');
            const alertBox = canvas.querySelector('#v29-db-alert');
            
            const dbUser = canvas.querySelector('#v29-db-user');
            const dbFriend = canvas.querySelector('#v29-db-friend');
 
            // Trigger scanlines
            if (dbUser && dbFriend) {
                const scanlineUser = dbUser.querySelector('.v29-db-scanline');
                const scanlineFriend = dbFriend.querySelector('.v29-db-scanline');
                
                if (progress > 0.05 && progress < 0.9) {
                    if (scanlineUser) scanlineUser.classList.add('scanning');
                    if (scanlineFriend) scanlineFriend.classList.add('scanning');
                } else {
                    if (scanlineUser) scanlineUser.classList.remove('scanning');
                    if (scanlineFriend) scanlineFriend.classList.remove('scanning');
                }
            }
 
            // 1. Scan rows increments from 0 to 3 billion
            const bill = (progress * 3.0).toFixed(2);
            if (scanRows) {
                if (progress >= 0.9) {
                    scanRows.textContent = "3.00 Tỷ hàng (FAILED)";
                    scanRows.style.color = "var(--fb-red)";
                } else {
                    scanRows.textContent = `${bill} Tỷ hàng`;
                    scanRows.style.color = "#fff";
                }
            }
 
            // 2. Latency grows exponentially
            if (latencyVal) {
                if (progress < 0.1) {
                    latencyVal.textContent = "50 ms";
                    latencyVal.style.color = "var(--fb-green)";
                } else {
                    const ms = Math.round(50 + progress * progress * 9950);
                    latencyVal.textContent = `${ms.toLocaleString('vi-VN')} ms`;
                    latencyVal.style.color = ms > 2000 ? "var(--fb-red)" : (ms > 300 ? "var(--fb-orange)" : "var(--fb-green)");
                }
            }
 
            // 3. Warning Alert shows at progress >= 0.6
            if (alertBox) {
                if (progress >= 0.6) {
                    alertBox.style.opacity = '1';
                    alertBox.style.transform = 'translateY(0)';
                } else {
                    alertBox.style.opacity = '0';
                    alertBox.style.transform = 'translateY(12px)';
                }
            }
 
            // 4. Interactive Row highlights
            const rows = canvas.querySelectorAll('.v29-db-table-large tr');
            rows.forEach(r => r.classList.remove('active-row-a', 'active-row-x', 'active-row-mutual'));
 
            if (progress > 0.1 && progress < 0.45) {
                canvas.querySelectorAll('.v29-row-a').forEach(r => r.classList.add('active-row-a'));
            } else if (progress >= 0.45 && progress < 0.8) {
                canvas.querySelectorAll('.v29-row-x').forEach(r => r.classList.add('active-row-x'));
            } else if (progress >= 0.8) {
                canvas.querySelectorAll('.v29-row-mutual').forEach(r => r.classList.add('active-row-mutual'));
            }
 
            // 5. Update metric bar fills
            const scanBar = canvas.querySelector('#v29-scan-bar');
            const latencyBar = canvas.querySelector('#v29-latency-bar');
 
            if (scanBar) {
                const scanWidth = progress * 100;
                scanBar.style.width = `${scanWidth}%`;
                if (progress >= 0.9) {
                    scanBar.style.background = 'var(--fb-red)';
                    scanBar.style.boxShadow = '0 0 8px var(--fb-red)';
                } else {
                    scanBar.style.background = 'var(--fb-blue)';
                    scanBar.style.boxShadow = '0 0 8px var(--fb-blue)';
                }
            }
 
            if (latencyBar) {
                const latencyPct = progress * progress * 100;
                latencyBar.style.width = `${latencyPct}%`;
                const ms = Math.round(50 + progress * progress * 9950);
                if (ms > 2000) {
                    latencyBar.style.background = 'var(--fb-red)';
                    latencyBar.style.boxShadow = '0 0 8px var(--fb-red)';
                } else if (ms > 300) {
                    latencyBar.style.background = 'var(--fb-orange)';
                    latencyBar.style.boxShadow = '0 0 8px var(--fb-orange)';
                } else {
                    latencyBar.style.background = 'var(--fb-green)';
                    latencyBar.style.boxShadow = '0 0 8px var(--fb-green)';
                }
            }
        }
        else if (slideId === 'slide_fb_3') {
            // Draw connective lines (Edges) dynamically on canvas
            const gNode = canvas.querySelector('#v29-graph');
            if (gNode && !gNode.querySelector('.v29-graph-edge')) {
                // Nodes positions relative to graph box
                const nodes = {
                    a: { x: 40 + 21, y: 100 + 21 },
                    x: { x: 300 + 21, y: 100 + 21 },
                    c: { x: 165 + 21, y: 35 + 21 },
                    d: { x: 165 + 21, y: 165 + 21 },
                    b: { x: 80 + 21, y: 10 + 21 },
                    e: { x: 80 + 21, y: 200 + 21 },
                    y: { x: 230 + 21, y: 200 + 21 }
                };

                const links = [
                    { from: 'a', to: 'b', class: 'edge-a-b' },
                    { from: 'a', to: 'c', class: 'edge-a-c' },
                    { from: 'a', to: 'd', class: 'edge-a-d' },
                    { from: 'a', to: 'e', class: 'edge-a-e' },
                    { from: 'x', to: 'c', class: 'edge-x-c' },
                    { from: 'x', to: 'd', class: 'edge-x-d' },
                    { from: 'x', to: 'y', class: 'edge-x-y' }
                ];

                links.forEach(link => {
                    const fromNode = nodes[link.from];
                    const toNode = nodes[link.to];

                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                    const edge = document.createElement('div');
                    edge.className = `v29-graph-edge ${link.class}`;
                    edge.style.width = `${dist}px`;
                    edge.style.left = `${fromNode.x}px`;
                    edge.style.top = `${fromNode.y}px`;
                    edge.style.transform = `rotate(${angle}deg)`;
                    gNode.appendChild(edge);
                });
            }

            // Animate nodes & edge highlighting along progress
            const nodeA = canvas.querySelector('#node-a');
            const nodeX = canvas.querySelector('#node-x');
            const nodeC = canvas.querySelector('#node-c');
            const nodeD = canvas.querySelector('#node-d');

            const edgeAC = canvas.querySelector('.edge-a-c');
            const edgeAD = canvas.querySelector('.edge-a-d');
            const edgeXC = canvas.querySelector('.edge-x-c');
            const edgeXD = canvas.querySelector('.edge-x-d');

            // Reset styles
            if (nodeA) nodeA.className = 'v29-graph-node';
            if (nodeX) nodeX.className = 'v29-graph-node';
            if (nodeC) nodeC.className = 'v29-graph-node';
            if (nodeD) nodeD.className = 'v29-graph-node';
            if (edgeAC) edgeAC.className = 'v29-graph-edge edge-a-c';
            if (edgeAD) edgeAD.className = 'v29-graph-edge edge-a-d';
            if (edgeXC) edgeXC.className = 'v29-graph-edge edge-x-c';
            if (edgeXD) edgeXD.className = 'v29-graph-edge edge-x-d';

            if (progress >= 0.15) {
                if (nodeA) nodeA.classList.add('active-a');
            }
            if (progress >= 0.35) {
                if (nodeX) nodeX.classList.add('active-x');
            }
            if (progress >= 0.55) {
                if (edgeAC) edgeAC.classList.add('active');
                if (edgeAD) edgeAD.classList.add('active');
                if (edgeXC) edgeXC.classList.add('active-x');
                if (edgeXD) edgeXD.classList.add('active-x');
            }
            if (progress >= 0.8) {
                if (nodeC) nodeC.classList.add('active-mutual');
                if (nodeD) nodeD.classList.add('active-mutual');
            }
        }
        else if (slideId === 'slide_fb_4') {
            const arrayA = canvas.querySelector('#v29-array-a-4');
            const arrayX = canvas.querySelector('#v29-array-x-4');

            if (arrayA && arrayX) {
                const nodesA = arrayA.querySelectorAll('.v29-array-node');
                const nodesX = arrayX.querySelectorAll('.v29-array-node');

                nodesA.forEach((node, i) => {
                    if (progress >= 0.2 + (i * 0.1)) {
                        node.classList.add('active-a');
                    } else {
                        node.classList.remove('active-a');
                    }
                });

                nodesX.forEach((node, i) => {
                    if (progress >= 0.3 + (i * 0.1)) {
                        node.classList.add('active-x');
                    } else {
                        node.classList.remove('active-x');
                    }
                });
            }
        }
        else if (slideId === 'slide_fb_5') {
            const arrayA = canvas.querySelector('#v29-array-a-5');
            const arrayX = canvas.querySelector('#v29-array-x-5');
            const pointerA = canvas.querySelector('#v29-array-a-5-pointer');
            const pointerX = canvas.querySelector('#v29-array-x-5-pointer');
            const compareLog = canvas.querySelector('#v29-compare-log');
            const matchList = canvas.querySelector('#v29-match-list');

            const valsA = [2, 5, 9, 11, 18];
            const valsX = [1, 2, 5, 18];

            const steps = [
                { aIdx: 0, xIdx: 0, text: "So sánh A[0]=2 > X[0]=1. Con trỏ X tăng.", match: [] },
                { aIdx: 0, xIdx: 1, text: "So sánh A[0]=2 = X[1]=2. Khớp! Lưu 2.", match: [2] },
                { aIdx: 1, xIdx: 2, text: "So sánh A[1]=5 = X[2]=5. Khớp! Lưu 5.", match: [2, 5] },
                { aIdx: 2, xIdx: 3, text: "So sánh A[2]=9 < X[3]=18. Con trỏ A tăng.", match: [2, 5] },
                { aIdx: 3, xIdx: 3, text: "So sánh A[3]=11 < X[3]=18. Con trỏ A tăng.", match: [2, 5] },
                { aIdx: 4, xIdx: 3, text: "So sánh A[4]=18 = X[3]=18. Khớp! Lưu 18.", match: [2, 5, 18] },
                { aIdx: 4, xIdx: 3, text: "Duyệt xong danh sách. Tổng cộng 3 bạn chung.", match: [2, 5, 18] }
            ];

            const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
            const currentStep = steps[stepIndex];

            // Reset node active classes
            if (arrayA && arrayX) {
                const nodesA = arrayA.querySelectorAll('.v29-array-node');
                const nodesX = arrayX.querySelectorAll('.v29-array-node');

                nodesA.forEach((node, i) => {
                    node.className = 'v29-array-node';
                    if (currentStep.match.includes(valsA[i])) {
                        node.classList.add('match');
                    } else if (i === currentStep.aIdx) {
                        node.classList.add('active-a');
                    }
                });

                nodesX.forEach((node, i) => {
                    node.className = 'v29-array-node';
                    if (currentStep.match.includes(valsX[i])) {
                        node.classList.add('match');
                    } else if (i === currentStep.xIdx) {
                        node.classList.add('active-x');
                    }
                });

                // Update pointers location smoothly
                if (pointerA) {
                    const targetNode = arrayA.querySelector(`#v29-array-a-5-node-${currentStep.aIdx}`);
                    if (targetNode) {
                        const offset = targetNode.offsetLeft + (targetNode.offsetWidth / 2) - 10;
                        pointerA.style.left = `${offset}px`;
                    }
                }

                if (pointerX) {
                    const targetNode = arrayX.querySelector(`#v29-array-x-5-node-${currentStep.xIdx}`);
                    if (targetNode) {
                        const offset = targetNode.offsetLeft + (targetNode.offsetWidth / 2) - 10;
                        pointerX.style.left = `${offset}px`;
                    }
                }
            }

            if (compareLog) compareLog.textContent = currentStep.text;
            if (matchList) {
                matchList.innerHTML = currentStep.match.map(v => `
                    <div style="width: 24px; height: 24px; border-radius: 6px; background: var(--fb-green); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; color: #000; box-shadow:0 0 6px var(--fb-green);">${v}</div>
                `).join('');
            }
        }
        else if (slideId === 'slide_fb_6') {
            const followersEl = canvas.querySelector('#v29-cr7-followers');
            const statusEl = canvas.querySelector('#v29-cr7-status');
            const bucketTarget = canvas.querySelector('#v29-bucket-target');
            const hashResult = canvas.querySelector('#v29-hash-result');
            
            // 1. Follower count ticker
            if (followersEl) {
                const count = Math.floor(progress * 15);
                followersEl.textContent = `${(50000000 + count).toLocaleString('vi-VN')} Followers`;
            }

            // 2. Follower requests stream
            const req0 = canvas.querySelector('#v29-req-0');
            const req1 = canvas.querySelector('#v29-req-1');
            const req2 = canvas.querySelector('#v29-req-2');
            
            if (progress > 0.1) {
                const speed = 1.4;
                if (req0) {
                    req0.style.display = 'block';
                    const y0 = (60 - ((progress * speed) % 1.0) * 80);
                    req0.style.top = `${y0}px`;
                    req0.style.opacity = Math.sin(Math.PI * ((progress * speed) % 1.0));
                }
                if (req1) {
                    req1.style.display = 'block';
                    const y1 = (110 - ((progress * speed + 0.33) % 1.0) * 80);
                    req1.style.top = `${y1}px`;
                    req1.style.opacity = Math.sin(Math.PI * ((progress * speed + 0.33) % 1.0));
                }
                if (req2) {
                    req2.style.display = 'block';
                    const y2 = (130 - ((progress * speed + 0.66) % 1.0) * 80);
                    req2.style.top = `${y2}px`;
                    req2.style.opacity = Math.sin(Math.PI * ((progress * speed + 0.66) % 1.0));
                }
            } else {
                if (req0) req0.style.display = 'none';
                if (req1) req1.style.display = 'none';
                if (req2) req2.style.display = 'none';
            }

            // 3. Database status alert under O(N)
            if (statusEl) {
                if (progress < 0.45) {
                    statusEl.textContent = '⏳ ĐANG QUÉT (O(N))';
                    statusEl.style.color = 'var(--fb-orange)';
                    statusEl.style.borderColor = 'rgba(251,191,36,0.3)';
                    statusEl.style.background = 'rgba(251,191,36,0.06)';
                } else {
                    statusEl.textContent = '❌ QUÁ TẢI (50M REQS)';
                    statusEl.style.color = 'var(--fb-red)';
                    statusEl.style.borderColor = 'rgba(248,113,113,0.3)';
                    statusEl.style.background = 'rgba(248,113,113,0.06)';
                }
            }

            // 4. HashTable simulation lookup success
            if (bucketTarget) {
                if (progress >= 0.4) {
                    bucketTarget.classList.add('active-lookup');
                } else {
                    bucketTarget.classList.remove('active-lookup');
                }
            }

            // 5. HashTable result message
            if (hashResult) {
                if (progress < 0.4) {
                    hashResult.textContent = 'Query: Alice -> Hashing...';
                    hashResult.style.color = 'var(--fb-orange)';
                    hashResult.style.transform = 'scale(1)';
                } else {
                    hashResult.textContent = 'Query: Alice -> FOUND IN O(1) (0.1ms)';
                    hashResult.style.color = 'var(--fb-green)';
                    hashResult.style.transform = 'scale(1.04)';
                    hashResult.style.textShadow = '0 0 10px rgba(52,211,153,0.4)';
                }
            }
        }
        else if (slideId === 'slide_fb_7') {
            const s1 = canvas.querySelector('#v29-shard-1');
            const s2 = canvas.querySelector('#v29-shard-2');

            if (s1 && s2) {
                if (progress >= 0.7) {
                    s1.style.borderColor = 'rgba(52, 211, 153, 0.4)';
                    s1.style.background = 'rgba(52, 211, 153, 0.05)';
                    s1.style.transform = 'scale(1.02)';
                    
                    s2.style.borderColor = 'rgba(52, 211, 153, 0.4)';
                    s2.style.background = 'rgba(52, 211, 153, 0.05)';
                    s2.style.transform = 'scale(1.02)';
                } else if (progress >= 0.4) {
                    s1.style.borderColor = 'var(--fb-blue)';
                    s1.style.background = 'rgba(24, 119, 242, 0.08)';
                    s1.style.transform = 'scale(1.04)';
                    
                    s2.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    s2.style.background = 'rgba(0,0,0,0.3)';
                    s2.style.transform = 'scale(1)';
                } else if (progress >= 0.1) {
                    s1.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    s1.style.background = 'rgba(0,0,0,0.3)';
                    s1.style.transform = 'scale(1)';

                    s2.style.borderColor = 'var(--fb-orange)';
                    s2.style.background = 'rgba(251, 191, 36, 0.08)';
                    s2.style.transform = 'scale(1.04)';
                } else {
                    s1.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    s1.style.background = 'rgba(0,0,0,0.3)';
                    s1.style.transform = 'scale(1)';
                    s2.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    s2.style.background = 'rgba(0,0,0,0.3)';
                    s2.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_fb_8') {
            const f1 = canvas.querySelector('#v29-score-fill-1');
            const f2 = canvas.querySelector('#v29-score-fill-2');
            const f3 = canvas.querySelector('#v29-score-fill-3');
            const f4 = canvas.querySelector('#v29-score-fill-4');
            const scoreValue = canvas.querySelector('#v29-score-value');
            const hudCircle = canvas.querySelector('#v29-hud-fill-circle');
            const suggestCard = canvas.querySelector('#v29-suggest-card');

            // Sequentially fill up criteria bars
            const r1 = Math.min(1.0, progress / 0.25);
            if (f1) f1.style.width = `${r1 * 100}%`;

            const r2 = progress < 0.25 ? 0 : Math.min(1.0, (progress - 0.25) / 0.25);
            if (f2) f2.style.width = `${r2 * 100}%`;

            const r3 = progress < 0.5 ? 0 : Math.min(1.0, (progress - 0.5) / 0.25);
            if (f3) f3.style.width = `${r3 * 100}%`;

            const r4 = progress < 0.75 ? 0 : Math.min(1.0, (progress - 0.75) / 0.25);
            if (f4) f4.style.width = `${r4 * 100}%`;

            const scoreVal = Math.round(progress * 92);
            if (scoreValue) scoreValue.textContent = `${scoreVal}%`;
            if (hudCircle) {
                const circ = 213.63; // 2 * Math.PI * 34
                const offset = circ - (scoreVal / 100) * circ;
                hudCircle.style.strokeDashoffset = offset;
            }

            // Highlight recommendation card
            if (suggestCard) {
                if (progress >= 0.75) {
                    suggestCard.style.opacity = '1';
                    suggestCard.style.transform = 'scale(1.03)';
                    suggestCard.style.borderColor = 'rgba(24, 119, 242, 0.7)';
                    suggestCard.style.boxShadow = '0 10px 40px rgba(24, 119, 242, 0.35)';
                } else {
                    suggestCard.style.opacity = '0.75';
                    suggestCard.style.transform = 'scale(0.95)';
                    suggestCard.style.borderColor = 'rgba(255,255,255,0.05)';
                    suggestCard.style.boxShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_fb_10') {
            const mutual = canvas.querySelector('#v29-outro-mutual');
            if (mutual) {
                const pulse = Math.abs(Math.sin(progress * 4 * Math.PI));
                mutual.style.transform = `scale(${1 + pulse * 0.08})`;
                mutual.style.borderColor = pulse > 0.5 ? '#f59e0b' : 'rgba(245,158,11,0.5)';
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video29',
        topic: 'Facebook Mutual Friends',
        episodeNum: 29,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video29 Plugin] Loaded: FACEBOOK MUTUAL FRIENDS 10 slides ready.');
})();
