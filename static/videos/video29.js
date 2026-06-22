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
            { text: 'Turnio.dev', start: 1.0, end: 9.0, class: 'active-gold' },
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
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Truy vấn Bảng quan hệ SQL
                    </div>

                    <div class="v29-fb-card" style="padding:18px; width:100%; display:flex; flex-direction:column; gap:14px;">
                        
                        <!-- Grid layout representing User & Friend tables -->
                        <div class="v29-db-grid">
                            <!-- Table 1: User list -->
                            <div class="v29-db-card" id="v29-db-user">
                                <div class="v29-db-scanline"></div>
                                <div style="font-size:11px; font-weight:bold; color:var(--fb-blue); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="table" style="width:12px; height:12px;"></i> Table: User (3B Rows)
                                </div>
                                <div style="font-family:monospace; font-size:10px; color:rgba(255,255,255,0.45); line-height:1.4; text-align:left;">
                                    [1] - Alice (A)<br>
                                    [2] - Bob (B)<br>
                                    [3] - Charlie (C)<br>
                                    [...] - Xavier (X)
                                </div>
                            </div>

                            <!-- Table 2: Friends Mapping -->
                            <div class="v29-db-card" id="v29-db-friend">
                                <div class="v29-db-scanline"></div>
                                <div style="font-size:11px; font-weight:bold; color:var(--fb-orange); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="git-commit" style="width:12px; height:12px;"></i> Table: Friend Map
                                </div>
                                <div style="font-family:monospace; font-size:10px; color:rgba(255,255,255,0.45); line-height:1.4; text-align:left;">
                                    A ➔ B (2), C (3), D (4)<br>
                                    X ➔ C (3), D (4), Y (25)<br>
                                    B ➔ A (1), C (3), Z (99)<br>
                                    [...] - Full scan index lookup
                                </div>
                            </div>
                        </div>

                        <div class="v29-sql-box">
                            <span style="color:#60a5fa;">SELECT</span> friend_id <span style="color:#60a5fa;">FROM</span> Friend <span style="color:#60a5fa;">WHERE</span> user_id = 'A'<br>
                            <span style="color:#ef4444;">INTERSECT</span><br>
                            <span style="color:#60a5fa;">SELECT</span> friend_id <span style="color:#60a5fa;">FROM</span> Friend <span style="color:#60a5fa;">WHERE</span> user_id = 'X';
                        </div>

                        <!-- Bottleneck graphics -->
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.25); border-radius:10px; padding:10px; border:1px solid rgba(255,255,255,0.04);">
                            <div style="text-align:left; flex:1;">
                                <div style="font-size:11px; color:rgba(255,255,255,0.4); font-weight:bold;">FULL TABLE SCAN</div>
                                <div style="font-size:14px; font-weight:900; color:#fff;" id="v29-scan-rows">0 / 3 Tỷ hàng</div>
                            </div>
                            <div style="width:2px; height:30px; background:rgba(255,255,255,0.1); margin:0 12px;"></div>
                            <div style="text-align:left; flex:1;">
                                <div style="font-size:11px; color:rgba(255,255,255,0.4); font-weight:bold;">ĐỘ TRỄ TRUY VẤN</div>
                                <div style="font-size:14px; font-weight:900; color:#f87171;" id="v29-latency-val">> 10,000 ms</div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottleneck Alert -->
                    <div class="v29-fb-card v29-alert-card" id="v29-db-alert" style="padding:12px 16px; display:flex; align-items:center; justify-content:center; gap:10px; opacity:0; transform:translateY(12px); transition:all 0.3s; width: 100%;">
                        <i data-lucide="alert-octagon" style="width:24px; height:24px; color:#f87171; flex-shrink: 0;"></i>
                        <span style="font-size:13px; color:#f87171; font-weight:900; letter-spacing:0.5px; text-align:left;">🚨 NGHẼN DATABASE: 3 TỶ USER KHÔNG THỂ JOIN!</span>
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
                <div class="v29-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Thử thách KOL: Quá nhiều followers
                    </div>

                    <!-- Ronaldo Card vs normal user split layout -->
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; width:100%;">
                        <!-- Left: Ronaldo Profile Info -->
                        <div class="v29-fb-card" style="padding:16px; text-align:center; border-color:rgba(251,191,36,0.3);">
                            <div style="width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; margin: 0 auto 8px auto; color:#fff; box-shadow:0 4px 10px rgba(0,0,0,0.3);">CR7</div>
                            <div style="font-weight:900; font-size:13px;">C. Ronaldo</div>
                            <div style="font-size:11px; color:var(--fb-orange); font-weight:bold; margin-top:2px;">50M Followers</div>
                            
                            <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:8px; margin-top:8px; font-size:10px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold;">Đọc Hai con trỏ?</div>
                            <div style="color:var(--fb-red); font-size:12px; font-weight:bold; margin-top:4px;">❌ QUÁ TẢI (O(N) LỚN)</div>
                        </div>

                        <!-- Right: HashSet & Bitmap acceleration -->
                        <div class="v29-fb-card" style="padding:16px; text-align:center; border-color:rgba(52,211,153,0.3);">
                            <div style="width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg, #10b981 0%, #059669 100%); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:20px; margin: 0 auto 8px auto; color:#000;"><i data-lucide="zap" style="width:24px; height:24px; color:#000;"></i></div>
                            <div style="font-weight:900; font-size:13px;">Giải pháp tăng tốc</div>
                            <div style="font-size:11px; color:var(--fb-green); font-weight:bold; margin-top:2px;">Thời gian tra cứu O(1)</div>
                            
                            <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:8px; margin-top:8px; font-size:10px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold;">Cấu trúc tối ưu</div>
                            <div style="color:var(--fb-green); font-size:12px; font-weight:bold; margin-top:4px;">HashSet / Bitmap / Graph DB</div>
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
                    <div style="font-size:18px; font-weight:800; color:var(--fb-text-muted); text-transform:uppercase; text-align:center; margin-bottom:2px; letter-spacing:0.8px;">
                        Gợi ý kết bạn (AI Ranker scoring)
                    </div>

                    <div style="display:flex; gap:16px; width:100%; box-sizing:border-box;">
                        <!-- Left Panel: Ranking Score Dashboard -->
                        <div class="v29-fb-card" style="padding:16px; flex:1.2; display:flex; flex-direction:column; gap:10px; text-align:left;">
                            <div style="font-size:12px; color:var(--fb-text-muted); font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Các tiêu chí chấm điểm</div>
                            
                            <div class="v29-score-card">
                                <!-- Metric 1 -->
                                <div>
                                    <div class="v29-score-item">
                                        <span>Bạn chung (Mutual Friends)</span>
                                        <span style="color:var(--fb-blue);">+40 điểm</span>
                                    </div>
                                    <div class="v29-progress-container"><div class="v29-progress-fill" id="v29-score-fill-1" style="background:var(--fb-blue);"></div></div>
                                </div>
                                <!-- Metric 2 -->
                                <div>
                                    <div class="v29-score-item">
                                        <span>Cùng thành phố / Khu vực</span>
                                        <span style="color:var(--fb-green);">+20 điểm</span>
                                    </div>
                                    <div class="v29-progress-container"><div class="v29-progress-fill" id="v29-score-fill-2" style="background:var(--fb-green);"></div></div>
                                </div>
                                <!-- Metric 3 -->
                                <div>
                                    <div class="v29-score-item">
                                        <span>Check-in gần nhau (Proximity)</span>
                                        <span style="color:var(--fb-orange);">+15 điểm</span>
                                    </div>
                                    <div class="v29-progress-container"><div class="v29-progress-fill" id="v29-score-fill-3" style="background:var(--fb-orange);"></div></div>
                                </div>
                                <!-- Metric 4 -->
                                <div>
                                    <div class="v29-score-item">
                                        <span>Cùng trường học / Công ty</span>
                                        <span style="color:rgba(255,255,255,0.85);">+25 điểm</span>
                                    </div>
                                    <div class="v29-progress-container"><div class="v29-progress-fill" id="v29-score-fill-4" style="background:rgba(255,255,255,0.4);"></div></div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: People You May Know Card -->
                        <div class="v29-fb-card" id="v29-suggest-card" style="padding:16px; flex:0.8; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; border-color:rgba(255,255,255,0.05); transition:all 0.4s ease; opacity: 0.2; transform:scale(0.95);">
                            <div style="width:46px; height:46px; border-radius:50%; background:linear-gradient(135deg, #1877f2 0%, #155dfc 100%); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; box-shadow:0 4px 10px rgba(0,0,0,0.3);">Y</div>
                            <div style="font-weight:900; font-size:12px;">Yuri Miller</div>
                            
                            <!-- Overall Score overlay -->
                            <div style="font-size:16px; font-weight:900; color:var(--fb-blue); margin-top:2px;" id="v29-score-total">Score: 0</div>
                            <div style="font-size:9px; color:var(--fb-text-muted); text-transform:uppercase; font-weight:800; letter-spacing:0.5px;">Gợi ý kết bạn</div>
                            
                            <button style="width:100%; height:26px; border-radius:6px; background:var(--fb-blue); border:none; color:#fff; font-size:10px; font-weight:bold; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; margin-top:4px;">
                                <i data-lucide="user-plus" style="width:10px; height:10px; color:#fff;"></i> Thêm bạn bè
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
                <div class="v29-zoom-container">
                    <!-- CTA Card -->
                    <div class="v29-fb-card v29-floating" style="padding:24px 20px; border:2px solid rgba(24, 119, 242, 0.35); text-align:center; width:100%;">
                        <div style="margin-bottom:12px;">
                            <div class="v29-logo-glow">
                                <i data-lucide="sparkles" style="width:28px; height:28px; color:#fff;"></i>
                            </div>
                        </div>
                        
                        <div style="font-size:20px; font-weight:900; color:#fff; letter-spacing:0.8px; line-height:1.2;">
                            TURNIO.DEV
                        </div>
                        <div style="font-size:13px; color:var(--fb-blue); font-weight:bold; text-transform:uppercase; margin-top:2px; letter-spacing:1px;">
                            Thiết Kế Hệ Thống Thực Chiến
                        </div>

                        <div style="margin:16px 0; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); padding:10px 0; display:flex; justify-content:space-around; align-items:center;">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="heart" style="width:22px; height:22px; color:#ef4444;"></i>
                                <span style="font-size:11px; color:rgba(255,255,255,0.5); font-weight:bold;">Thích</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="message-square" style="width:22px; height:22px; color:#3b82f6;"></i>
                                <span style="font-size:11px; color:rgba(255,255,255,0.5); font-weight:bold;">Bình luận</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="share-2" style="width:22px; height:22px; color:#10b981;"></i>
                                <span style="font-size:11px; color:rgba(255,255,255,0.5); font-weight:bold;">Chia sẻ</span>
                            </div>
                        </div>

                        <div style="font-size:14px; color:rgba(255,255,255,0.7); font-weight:500; line-height:1.4; padding:0 4px; letter-spacing:0.5px;">
                            Nhấn <span style="color:var(--fb-blue); font-weight:bold;">Follow</span> kênh ngay để học nhiều kiến thức hệ thống bổ ích!
                        </div>
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
            const scoreTotal = canvas.querySelector('#v29-score-total');
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

            const score = Math.round(progress * 92);
            if (scoreTotal) scoreTotal.textContent = `Score: ${score}`;

            // Highlight recommendation card
            if (suggestCard) {
                if (progress >= 0.75) {
                    suggestCard.style.opacity = '1';
                    suggestCard.style.transform = 'scale(1.05)';
                    suggestCard.style.borderColor = 'var(--fb-blue)';
                    suggestCard.style.boxShadow = '0 0 20px rgba(24, 119, 242, 0.25)';
                } else {
                    suggestCard.style.opacity = '0.2';
                    suggestCard.style.transform = 'scale(0.95)';
                    suggestCard.style.borderColor = 'rgba(255,255,255,0.05)';
                    suggestCard.style.boxShadow = 'none';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video29',
        topic: 'Facebook Mutual Friends & Graph Intersection Algorithm',
        episodeNum: 29,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video29 Plugin] Loaded: FACEBOOK MUTUAL FRIENDS 10 slides ready.');
})();
