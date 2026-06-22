/**
 * Video 24: Messenger Active Status presence system using Bitmaps
 * Plugin file - chứa toàn bộ slide animation/HTML cho video24
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_active_1: [],
        slide_active_2: [
            { text: 'update sql', start: 4.0, end: 14.0, class: 'active-bad' },
            { text: 'bảng user', start: 14.0, end: 25.0, class: 'active-gold' }
        ],
        slide_active_3: [
            { text: 'ghi đĩa liên tục', start: 4.0, end: 14.0, class: 'active-bad' },
            { text: 'nghẽn database', start: 14.0, end: 24.5, class: 'active-bad' }
        ],
        slide_active_4: [
            { text: 'cấu trúc bitmap', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'tối ưu hóa bit', start: 14.0, end: 25.5, class: 'active-good' }
        ],
        slide_active_5: [
            { text: 'tiết kiệm ram', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'bộ nhớ cache', start: 14.0, end: 25.0, class: 'active-gold' }
        ],
        slide_active_6: [
            { text: 'presence service', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'truy vấn o(1)', start: 14.0, end: 26.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_active_1', 'slide_active_2', 'slide_active_3', 
        'slide_active_4', 'slide_active_5', 'slide_active_6'
    ];

    // Helper: generate avatars for Slide 1 Mockup (Reduced count to 4, made them larger)
    function makeAvatarsHTML() {
        const users = [
            { name: 'An', initials: 'A', active: true },
            { name: 'Bình', initials: 'B', active: false },
            { name: 'Cường', initials: 'C', active: true },
            { name: 'Duy', initials: 'D', active: true }
        ];
        let html = `<div style="display:flex; justify-content:space-around; width:100%; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); box-sizing:border-box;">`;
        users.forEach(u => {
            html += `
                <div style="display:flex; flex-direction:column; align-items:center; gap:6px; position:relative; width:52px;">
                    <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #3b82f6, #8b5cf6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:16px; font-family:sans-serif; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                        ${u.initials}
                        ${u.active ? `<div class="active-dot-pulse" style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; border:2px solid #0c0f17; background-color:#10b981;"></div>` : ''}
                    </div>
                    <span style="font-size:11px; color:#aaa; font-family:sans-serif; font-weight:500;">${u.name}</span>
                </div>
            `;
        });
        html += `</div>`;
        return html;
    }

    // Helper: make chat mock list
    function makeChatListHTML() {
        const chats = [
            { name: 'An', msg: 'Có chuyện này quan trọng...', time: '1m', active: true },
            { name: 'Cường', msg: 'Dự án backend chạy ngon chưa?', time: '5m', active: true },
            { name: 'Bình', msg: 'Mai cafe bàn nốt nhé', time: '1h', active: false }
        ];
        let html = `<div style="display:flex; flex-direction:column; gap:12px; padding:12px 0; width:100%; box-sizing:border-box;">`;
        chats.forEach(c => {
            html += `
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-family:sans-serif; font-weight:bold; position:relative; border:1px solid rgba(255,255,255,0.06);">
                            ${c.name.charAt(0)}
                            ${c.active ? `<div class="active-dot-pulse" style="position:absolute; bottom:0; right:0; width:10px; height:10px; border-radius:50%; border:1.5px solid #0c0f17; background-color:#10b981;"></div>` : ''}
                        </div>
                        <div style="display:flex; flex-direction:column; text-align:left; gap:2px;">
                            <span style="font-size:13px; font-weight:bold; color:#fff; font-family:sans-serif;">${c.name}</span>
                            <span style="font-size:11px; color:#888; font-family:sans-serif; max-width:130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.msg}</span>
                        </div>
                    </div>
                    <span style="font-size:10px; color:#666; font-family:sans-serif;">${c.time}</span>
                </div>
            `;
        });
        html += `</div>`;
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_active_1') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <!-- Center workspace row -->
                    <div style="display:flex; gap:40px; justify-content:center; align-items:center; width:840px;">
                        
                        <!-- Left Phone Messenger Mockup -->
                        <div class="glass-card" style="width:230px; height:410px; border-radius:24px; border:2px solid rgba(255,255,255,0.15); background:#0c0f17; box-shadow:0 15px 35px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden; position:relative; padding:12px; box-sizing:border-box;">
                            <!-- Top Header of Phone -->
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                                <span style="font-size:16px; font-weight:bold; color:#fff; font-family:sans-serif;">Chats</span>
                                <i data-lucide="edit" style="width:16px; height:16px; color:#aaa;"></i>
                            </div>
                            
                            <!-- Avatars list -->
                            ${makeAvatarsHTML()}
                            
                            <!-- Active search -->
                            <div style="margin-top:8px; padding:6px 10px; border-radius:8px; background:rgba(255,255,255,0.05); font-size:11px; color:#888; text-align:left; font-family:sans-serif;">
                                Tìm kiếm bạn bè...
                            </div>
                            
                            <!-- Chat list -->
                            ${makeChatListHTML()}
                        </div>

                        <!-- Right Stats Box -->
                        <div class="glass-card" style="width:320px; padding:24px; border-radius:20px; border:1px solid rgba(255,255,255,0.1); background:#0f1118; display:flex; flex-direction:column; gap:16px; text-align:left;">
                            <div style="font-size:11px; font-weight:bold; color:#8b5cf6; font-family:monospace; letter-spacing:1px; text-transform:uppercase;">SYSTEM METRICS</div>
                            <div style="font-size:22px; font-weight:bold; color:#fff; font-family:sans-serif; margin-bottom:2px;">Online Accounts</div>
                            
                            <!-- Counter card -->
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:16px; border-radius:12px; display:flex; flex-direction:column; gap:4px;">
                                <span style="font-size:11px; color:#aaa; font-family:sans-serif; font-weight:bold; letter-spacing:0.5px;">ONLINE CONCURRENTLY</span>
                                <div style="font-size:38px; font-weight:800; color:#10b981; font-family:monospace; text-shadow:0 0 10px rgba(16,185,129,0.3);" class="concurrent-counter">0</div>
                            </div>
                            
                            <div style="font-size:12px; color:#888; font-family:sans-serif; line-height:1.4;">
                                Thử thách presence service: cập nhật trạng thái hoạt động tức thời cho hàng trăm triệu tài khoản kết nối đồng thời.
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_2') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px;">
                        
                        <!-- Connecting lines SVG -->
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="s2-svg-canvas">
                            <!-- Line Client -> DB -->
                            <path d="M 230 205 L 510 205" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" stroke-dasharray="4,4" fill="none" class="conn-path"></path>
                        </svg>

                        <!-- Dynamic flowing SQL queries container -->
                        <div class="s2-packet-canvas" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>

                        <!-- Left phone (Messenger User) -->
                        <div class="glass-card" style="position:absolute; left:20px; top:0; width:210px; height:410px; border-radius:24px; border:2px solid rgba(255,255,255,0.15); background:#0c0f17; box-shadow:0 15px 35px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; z-index:3;">
                            <div style="height:32px; background:#181c25; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-size:11px; color:#aaa; font-weight:bold;">
                                📱 CLIENT MESSENGER
                            </div>
                            
                            <!-- Small Mockup screen showing status status toggling -->
                            <div style="flex:1; padding:15px; display:flex; flex-direction:column; gap:18px; justify-content:center; align-items:center; background:rgba(0,0,0,0.15);">
                                <div class="client-status-badge" style="padding:10px 20px; border-radius:20px; font-family:sans-serif; font-size:14px; font-weight:bold; transition:all 0.3s; display:flex; align-items:center; gap:6px;">
                                    <div class="status-indicator-dot" style="width:10px; height:10px; border-radius:50%;"></div>
                                    <span class="status-indicator-text">OFFLINE</span>
                                </div>
                                <div style="font-size:12px; color:#aaa; font-family:sans-serif; text-align:center; line-height:1.4;" class="client-action-lbl">
                                    Đang kết nối...
                                </div>
                            </div>
                            
                            <div style="padding:10px; background:#181c25; font-size:10px; color:#666; font-family:monospace; text-align:center;">
                                User ID: 123456
                            </div>
                        </div>

                        <!-- Right DB Node -->
                        <div class="glass-card s2-db-card" style="position:absolute; left:510px; top:25px; width:310px; height:360px; border-radius:20px; border:1px solid rgba(139, 92, 246, 0.3); background:#0c0e14; box-shadow:0 10px 25px rgba(139, 92, 246, 0.1); padding:18px; box-sizing:border-box; display:flex; flex-direction:column; gap:15px; z-index:3;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(139, 92, 246, 0.2); padding-bottom:8px;">
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="database" style="width:18px; height:18px; color:#8b5cf6;"></i>
                                    <span style="font-family:monospace; font-size:13px; color:#8b5cf6; font-weight:bold;">SQL DATABASE</span>
                                </div>
                                <span style="font-size:10px; background:rgba(139, 92, 246, 0.12); color:#8b5cf6; padding:2px 8px; border-radius:4px; font-family:monospace;">users table</span>
                            </div>

                            <!-- Mock DB Table -->
                            <div style="width:100%; border:1px solid rgba(255,255,255,0.06); border-radius:8px; overflow:hidden;">
                                <table style="width:100%; border-collapse:collapse; font-family:monospace; font-size:12px; text-align:left; color:#ccc;">
                                    <tr style="background:rgba(255,255,255,0.05); color:#888;">
                                        <th style="padding:8px;">id</th>
                                        <th style="padding:8px;">name</th>
                                        <th style="padding:8px; text-align:center;">online</th>
                                    </tr>
                                    <tr class="db-row-1" style="transition:all 0.3s;">
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">123456</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">An</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; font-weight:bold;" class="db-col-online">false</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">123457</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">Bình</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; color:#ef4444; font-weight:bold;">false</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">123458</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05);">Cường</td>
                                        <td style="padding:8px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; color:#10b981; font-weight:bold;">true</td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Live code display box -->
                            <div class="sql-query-box" style="padding:12px; font-size:12px;">
                                <span style="color:#666;">-- SQL query executed:</span><br>
                                <span class="sql-query-text" style="color:#33ff33; font-weight:bold;">SELECT online FROM users WHERE id = 123456;</span>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_3') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px; overflow:hidden;">
                        
                        <!-- Storm packets canvas -->
                        <div class="s3-packet-canvas" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>

                        <!-- Left: Active Heartbeat users grid (9 nodes) - Made grid nodes and spacing larger -->
                        <div style="position:absolute; left:20px; top:60px; width:250px; height:250px; display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; justify-items:center; align-content:center; box-sizing:border-box;">
                            <!-- Node 1 -->
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U1 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1.5px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U2 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U3 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U4 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U5 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U6 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U7 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U8 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                            <div class="u-node" style="width:62px; height:62px; border-radius:50%; background:#1f2937; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:bold; position:relative; border:1.5px solid rgba(255,255,255,0.15);">
                                U9 <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-radius:50%; background:#4b5563; border:1px solid #0c0f17;" class="u-dot"></div>
                            </div>
                        </div>

                        <!-- Right: Overloaded Database node - Made it larger -->
                        <div class="glass-card s3-db-node" style="position:absolute; left:330px; top:30px; width:180px; height:160px; border-radius:24px; border:2.5px solid rgba(255,255,255,0.1); background:#121622; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 4px 20px rgba(0,0,0,0.5); transition:all 0.15s; z-index:3;">
                            <i data-lucide="database" style="width:64px; height:64px; color:rgba(255,255,255,0.4);" class="db-icon-shake"></i>
                            <span style="font-size:13px; font-family:monospace; color:#aaa; margin-top:8px; font-weight:bold; letter-spacing:0.5px;">SQL ENGINE</span>
                        </div>

                        <!-- Metrics Dashboard - Larger size -->
                        <div class="glass-card" style="position:absolute; left:530px; top:30px; width:290px; height:160px; padding:15px; border-radius:16px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:8px; box-sizing:border-box; font-family:monospace; font-size:12px; z-index:3; text-align:left;">
                            <div style="font-weight:bold; color:#888; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; font-size:12px;">DATABASE OVERLOAD METRICS</div>
                            <div style="display:flex; justify-content:space-between; margin-top:4px;">
                                <span>WRITE OPERATIONS:</span>
                                <span style="color:#ef4444; font-weight:bold;" class="s3-lbl-traffic">0</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>DISK WRITE LOAD:</span>
                                <span style="color:#ef4444; font-weight:bold;" class="s3-lbl-io">0%</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>CPU LOAD LEVEL:</span>
                                <span style="color:#ef4444; font-weight:bold;" class="s3-lbl-cpu">0.1%</span>
                            </div>
                        </div>

                        <!-- Scrolling Terminal Log for SQL update failures - Larger size -->
                        <div class="terminal-window" style="position:absolute; left:330px; top:210px; width:490px; height:170px; z-index:3; font-size:10.5px;"></div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_4') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; padding:15px 0;">
                        
                        <!-- Top Half: Traditional records - Made much larger and styled like table rows -->
                        <div class="glass-card" style="width:100%; padding:18px; border-radius:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.01); box-sizing:border-box;">
                            <div style="font-size:14px; font-weight:bold; color:#fff; font-family:sans-serif; text-transform:uppercase; margin-bottom:12px; text-align:left; letter-spacing:0.5px;">Bảng Dữ Liệu Truyền Thống (8 Bytes / row)</div>
                            <div style="display:flex; gap:15px; justify-content:center;" class="traditional-records-box">
                                <div class="glass-card s4-rec-card" style="padding:14px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); background:#111625; font-family:monospace; font-size:14px; text-align:left; transition:all 0.3s; display:flex; gap:8px;">
                                    <span>User 1:</span> <span style="color:#10b981; font-weight:bold;">true</span>
                                </div>
                                <div class="glass-card s4-rec-card" style="padding:14px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); background:#111625; font-family:monospace; font-size:14px; text-align:left; transition:all 0.3s; display:flex; gap:8px;">
                                    <span>User 2:</span> <span style="color:#ef4444; font-weight:bold;">false</span>
                                </div>
                                <div class="glass-card s4-rec-card" style="padding:14px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); background:#111625; font-family:monospace; font-size:14px; text-align:left; transition:all 0.3s; display:flex; gap:8px;">
                                    <span>User 3:</span> <span style="color:#10b981; font-weight:bold;">true</span>
                                </div>
                                <div class="glass-card s4-rec-card" style="padding:14px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); background:#111625; font-family:monospace; font-size:14px; text-align:left; transition:all 0.3s; display:flex; gap:8px;">
                                    <span>User 4:</span> <span style="color:#ef4444; font-weight:bold;">false</span>
                                </div>
                            </div>
                        </div>

                        <!-- Compressor arrows indicator - Enlarged -->
                        <div style="display:flex; justify-content:center; align-items:center; gap:12px; color:#8b5cf6;" class="compressor-block">
                            <i data-lucide="chevron-down" style="width:28px; height:28px; animation:bounce 1.5s infinite;"></i>
                            <span style="font-family:monospace; font-size:14px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Nén dữ liệu thành Bit</span>
                            <i data-lucide="chevron-down" style="width:28px; height:28px; animation:bounce 1.5s infinite;"></i>
                        </div>

                        <!-- Bottom Half: Compressed Bitmap - Bit cells and titles made much larger -->
                        <div class="glass-card" style="width:100%; padding:18px; border-radius:18px; border:1px solid rgba(16, 185, 129, 0.3); background:rgba(16, 185, 129, 0.01); box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <span style="font-size:14px; font-weight:bold; color:var(--active-green); font-family:sans-serif; text-transform:uppercase; letter-spacing:0.5px;">Cấu Trúc Redis Bitmap (1 Bit / User)</span>
                                <span style="font-size:12px; font-family:monospace; color:#aaa; font-weight:bold;">Size: 8 bits (1 Byte)</span>
                            </div>
                            
                            <div style="display:flex; justify-content:center; gap:10px;">
                                <div class="bit-cell cell-0" style="width:52px; height:52px; font-size:24px; border-radius:10px;">1</div>
                                <div class="bit-cell cell-1" style="width:52px; height:52px; font-size:24px; border-radius:10px;">0</div>
                                <div class="bit-cell cell-2" style="width:52px; height:52px; font-size:24px; border-radius:10px;">1</div>
                                <div class="bit-cell cell-3" style="width:52px; height:52px; font-size:24px; border-radius:10px;">0</div>
                                <div class="bit-cell cell-4" style="width:52px; height:52px; font-size:24px; border-radius:10px;">0</div>
                                <div class="bit-cell cell-5" style="width:52px; height:52px; font-size:24px; border-radius:10px;">1</div>
                                <div class="bit-cell cell-6" style="width:52px; height:52px; font-size:24px; border-radius:10px;">1</div>
                                <div class="bit-cell cell-7" style="width:52px; height:52px; font-size:24px; border-radius:10px;">0</div>
                            </div>
                            
                            <!-- Bit annotation labels - Larger -->
                            <div style="display:flex; justify-content:center; gap:10px; margin-top:8px; font-family:monospace; font-size:11px; color:#888; font-weight:bold;">
                                <div style="width:52px; text-align:center;">User 1</div>
                                <div style="width:52px; text-align:center;">User 2</div>
                                <div style="width:52px; text-align:center;">User 3</div>
                                <div style="width:52px; text-align:center;">User 4</div>
                                <div style="width:52px; text-align:center;">User 5</div>
                                <div style="width:52px; text-align:center;">User 6</div>
                                <div style="width:52px; text-align:center;">User 7</div>
                                <div style="width:52px; text-align:center;">User 8</div>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_5') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div class="glass-card cyber-grid" style="width:100%; max-width:860px; height:450px; padding:24px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                            <div style="font-size:22px; font-weight:bold; color:var(--gold-primary);">So Sánh Tiết Kiệm Bộ Nhớ (100 Triệu Accounts)</div>
                            <div style="font-size:13px; background:rgba(16,185,129,0.12); padding:2px 10px; border-radius:6px; color:#10b981; font-family:monospace; font-weight:bold;">MEMORY METRICS</div>
                        </div>

                        <!-- Bar chart comparison container -->
                        <div style="display:flex; flex-direction:column; gap:25px; margin:20px 0; width:100%;">
                            
                            <!-- Row 1: Traditional DB records - Bar and labels enlarged -->
                            <div style="display:flex; flex-direction:column; gap:10px; width:100%; text-align:left;">
                                <div style="display:flex; justify-content:space-between; font-size:14px; font-family:sans-serif; color:#ccc; font-weight:bold;">
                                    <span>SQL Table (Row Record + Index + Overhead)</span>
                                    <span style="color:#ef4444; font-size:26px; font-weight:bold; font-family:monospace;" class="lbl-traditional-memory">0 MB</span>
                                </div>
                                <div style="width:100%; height:32px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; padding:6px; box-sizing:border-box;">
                                    <div class="growth-bar" style="width:0%; height:18px; border-radius:9px;"></div>
                                </div>
                            </div>

                            <!-- Row 2: Redis Bitmap - Bar and labels enlarged -->
                            <div style="display:flex; flex-direction:column; gap:10px; width:100%; text-align:left;">
                                <div style="display:flex; justify-content:space-between; font-size:14px; font-family:sans-serif; color:#ccc; font-weight:bold;">
                                    <span>Redis Bitmap (1 bit / account)</span>
                                    <span style="color:#10b981; font-size:26px; font-weight:bold; font-family:monospace;" class="lbl-optimized-memory">0 MB</span>
                                </div>
                                <div style="width:100%; height:32px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; padding:6px; box-sizing:border-box;">
                                    <div class="growth-bar-optimized" style="width:0%; height:18px; border-radius:9px;"></div>
                                </div>
                            </div>

                        </div>

                        <!-- Promotional metric highlight -->
                        <div style="padding:15px; border-radius:12px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2); display:flex; align-items:center; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:rgba(16,185,129,0.15); display:flex; align-items:center; justify-content:center; color:#10b981;">
                                    <i data-lucide="shield-check" style="width:18px; height:18px;"></i>
                                </div>
                                <div style="text-align:left;">
                                    <div style="font-size:15px; font-weight:bold; color:#fff; font-family:sans-serif;">Hiệu quả tối ưu vượt trội</div>
                                    <div style="font-size:12px; color:rgba(255,255,255,0.45); font-family:sans-serif;">Giảm thiểu tới 98% bộ nhớ lưu trữ hoạt động, giúp ứng dụng vận hành trơn tru.</div>
                                </div>
                            </div>
                            <div style="padding:8px 18px; border-radius:20px; background:#fff; color:#000; font-size:15px; font-weight:bold; font-family:sans-serif;" class="lbl-saving-percent">98% REDUCED</div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_6') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div class="glass-card cyber-grid" style="width:100%; max-width:860px; height:450px; padding:28px 24px; border:2px solid rgba(239, 68, 68, 0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 35px rgba(239, 68, 68, 0.2); display:flex; flex-direction:column; justify-content:flex-start; gap:40px; box-sizing:border-box;">
                        
                        <div style="display:flex; justify-content:center; align-items:center; gap:10px; border-bottom:1.5px solid rgba(239, 68, 68, 0.15); padding-bottom:8px;">
                            <i data-lucide="check-circle" style="width:24px; height:24px; color:#10b981;"></i>
                            <h2 style="font-size:22px; font-weight:bold; color:#fff; margin:0;">Hệ Thống Presence Service Tối Ưu</h2>
                        </div>

                        <!-- Architecture Flow - Compact height, larger elements -->
                        <div style="position:relative; width:800px; height:180px; margin:25px auto 0 auto;">
                            <!-- SVG lines -->
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="s6-svg-canvas">
                                <!-- Client -> WS Gateway -->
                                <path d="M 120 70 L 260 70" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                                <!-- WS Gateway -> Presence Service -->
                                <path d="M 370 70 L 490 70" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                                <!-- Presence Service -> Redis Bitmap -->
                                <path d="M 610 70 L 700 70" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none"></path>
                            </svg>

                            <!-- Dynamic flowing packets canvas -->
                            <div class="s6-packet-canvas" style="position:absolute; inset:0; pointer-events:none; z-index:2;"></div>

                            <!-- 1. Client Mobile -->
                            <div class="glass-card" style="position:absolute; left:20px; top:10px; width:100px; height:120px; border-radius:16px; border:1.5px solid rgba(255,255,255,0.15); background:#0c0f17; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; z-index:3;">
                                <div style="width:26px; height:38px; border-radius:4px; border:1px solid rgba(255,255,255,0.2); position:relative; display:flex; align-items:center; justify-content:center;">
                                    <div class="s6-client-dot" style="width:6px; height:6px; border-radius:50%; background:#10b981; position:absolute; bottom:2px; right:2px;"></div>
                                    <i data-lucide="smartphone" style="width:14px; height:14px; color:#aaa;"></i>
                                </div>
                                <span style="font-size:10px; font-family:sans-serif; color:#aaa; font-weight:bold;">User Client</span>
                            </div>

                            <!-- 2. WebSocket Gateway Server -->
                            <div class="glass-card s6-gateway-srv" style="position:absolute; left:260px; top:25px; width:110px; height:90px; border-radius:16px; border:1.5px solid rgba(0, 132, 255, 0.4); background:#111522; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; z-index:3; transition:all 0.2s;">
                                <i data-lucide="server" style="width:24px; height:24px; color:#0084ff;"></i>
                                <span style="font-size:11px; font-family:monospace; color:#fff; font-weight:bold;">WS Gateway</span>
                            </div>

                            <!-- 3. Presence Service Node -->
                            <div class="glass-card s6-presence-srv" style="position:absolute; left:490px; top:25px; width:120px; height:90px; border-radius:16px; border:1.5px solid rgba(139, 92, 246, 0.4); background:#151222; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; z-index:3; transition:all 0.2s;">
                                <i data-lucide="git-branch" style="width:24px; height:24px; color:#8b5cf6;"></i>
                                <span style="font-size:11px; font-family:monospace; color:#fff; font-weight:bold;">Presence Srv</span>
                            </div>

                            <!-- 4. Redis Bitmap Node -->
                            <div class="glass-card s6-redis-node" style="position:absolute; left:680px; top:15px; width:110px; height:110px; border-radius:50%; border:2px solid rgba(239, 68, 68, 0.4); background:#1a1012; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; z-index:3; transition:all 0.2s;">
                                <div style="width:26px; height:26px; border-radius:50%; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:11px; box-shadow:0 0 10px rgba(239,68,68,0.5);">R</div>
                                <span style="font-size:9px; font-family:monospace; color:#ef4444; font-weight:bold;">REDIS BITMAP</span>
                                <div style="font-size:8px; font-family:monospace; color:#888;" class="redis-command-display">GETBIT user:status 123</div>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_active_1') {
            const counterEl = canvas.querySelector('.concurrent-counter');
            if (counterEl) {
                // Animate concurrent users counter from 0 to 200M based on progress
                const val = Math.floor(progress * 200);
                counterEl.textContent = `${val} Triệu`;
            }
        }
        else if (slideId === 'slide_active_2') {
            const clientBadge = canvas.querySelector('.client-status-badge');
            const clientDot = canvas.querySelector('.status-indicator-dot');
            const clientText = canvas.querySelector('.status-indicator-text');
            const clientAction = canvas.querySelector('.client-action-lbl');
            const packetCanvas = canvas.querySelector('.s2-packet-canvas');
            
            const dbRow = canvas.querySelector('.db-row-1');
            const dbColOnline = canvas.querySelector('.db-col-online');
            const queryText = canvas.querySelector('.sql-query-text');

            if (packetCanvas) packetCanvas.innerHTML = '';

            let packetHTML = '';
            let isOnline = false;

            // Phase 1: 0.1 -> 0.45: Open Messenger, UPDATE users SET online=true
            if (progress > 0.1 && progress <= 0.45) {
                isOnline = true;
                const t = (progress - 0.1) / 0.35;
                // Query Packet flies Client (X=230) -> DB (X=510)
                const x = 230 + t * 280;
                packetHTML = `<div style="position:absolute; left:${x}px; top:205px; width:10px; height:10px; border-radius:50%; background:#8b5cf6; box-shadow:0 0 10px #8b5cf6; transform:translate(-5px,-5px);"></div>`;
                
                if (clientBadge) {
                    clientBadge.style.background = 'rgba(16,185,129,0.15)';
                    clientBadge.style.borderColor = '#10b981';
                    if (clientDot) clientDot.style.backgroundColor = '#10b981';
                    if (clientText) clientText.textContent = 'ONLINE';
                }
                if (clientAction) clientAction.textContent = 'Đang mở ứng dụng...';
                if (queryText) queryText.textContent = 'UPDATE users SET online = true WHERE id = 123456;';

                if (t >= 0.85) {
                    if (dbRow) dbRow.style.background = 'rgba(16,185,129,0.15)';
                    if (dbColOnline) { dbColOnline.textContent = 'true'; dbColOnline.style.color = '#10b981'; }
                } else {
                    if (dbRow) dbRow.style.background = 'transparent';
                    if (dbColOnline) { dbColOnline.textContent = 'false'; dbColOnline.style.color = '#ef4444'; }
                }
            }
            // Phase 2: 0.45 -> 0.75: Close Messenger, UPDATE users SET online=false
            else if (progress > 0.45 && progress <= 0.75) {
                isOnline = false;
                const t = (progress - 0.45) / 0.30;
                // Query Packet flies Client (X=230) -> DB (X=510)
                const x = 230 + t * 280;
                packetHTML = `<div style="position:absolute; left:${x}px; top:205px; width:10px; height:10px; border-radius:50%; background:#ef4444; box-shadow:0 0 10px #ef4444; transform:translate(-5px,-5px);"></div>`;

                if (clientBadge) {
                    clientBadge.style.background = 'rgba(239,68,68,0.15)';
                    clientBadge.style.borderColor = '#ef4444';
                    if (clientDot) clientDot.style.backgroundColor = '#ef4444';
                    if (clientText) clientText.textContent = 'OFFLINE';
                }
                if (clientAction) clientAction.textContent = 'Tắt ứng dụng...';
                if (queryText) queryText.textContent = 'UPDATE users SET online = false WHERE id = 123456;';

                if (t >= 0.85) {
                    if (dbRow) dbRow.style.background = 'rgba(239,68,68,0.15)';
                    if (dbColOnline) { dbColOnline.textContent = 'false'; dbColOnline.style.color = '#ef4444'; }
                } else {
                    if (dbRow) dbRow.style.background = 'transparent';
                    if (dbColOnline) { dbColOnline.textContent = 'true'; dbColOnline.style.color = '#10b981'; }
                }
            }
            // Phase 3: 0.75 -> 1.0: Check friend list, SELECT online FROM users
            else if (progress > 0.75) {
                const t = (progress - 0.75) / 0.25;
                
                // Bidirectional packet animation: Client -> DB, then DB -> Client
                let x = 230;
                let col = '#3b82f6';
                if (t < 0.5) {
                    // Client -> DB
                    x = 230 + (t / 0.5) * 280;
                } else {
                    // DB -> Client
                    x = 510 - ((t - 0.5) / 0.5) * 280;
                    col = '#10b981';
                }
                packetHTML = `<div style="position:absolute; left:${x}px; top:205px; width:10px; height:10px; border-radius:50%; background:${col}; box-shadow:0 0 10px ${col}; transform:translate(-5px,-5px);"></div>`;

                if (clientBadge) {
                    clientBadge.style.background = 'rgba(255,255,255,0.05)';
                    clientBadge.style.borderColor = '#4b5563';
                    if (clientDot) clientDot.style.backgroundColor = '#4b5563';
                    if (clientText) clientText.textContent = 'QUERYING';
                }
                if (clientAction) clientAction.textContent = 'Đang lọc bạn bè online...';
                if (queryText) queryText.textContent = 'SELECT id, online FROM users WHERE id IN (123457, 123458);';
                if (dbRow) dbRow.style.background = 'transparent';
            }
            else {
                // Settle
                if (clientBadge) {
                    clientBadge.style.background = 'rgba(255,255,255,0.05)';
                    clientBadge.style.borderColor = '#4b5563';
                    if (clientDot) clientDot.style.backgroundColor = '#4b5563';
                    if (clientText) clientText.textContent = 'OFFLINE';
                }
                if (clientAction) clientAction.textContent = 'Đang kết nối...';
                if (dbRow) dbRow.style.background = 'transparent';
                if (dbColOnline) { dbColOnline.textContent = 'false'; dbColOnline.style.color = '#ef4444'; }
            }

            if (packetCanvas) {
                packetCanvas.innerHTML = packetHTML;
            }
        }
        else if (slideId === 'slide_active_3') {
            const grid = canvas.querySelectorAll('.u-node');
            const dbNode = canvas.querySelector('.s3-db-node');
            const dbIcon = canvas.querySelector('.db-icon-shake');
            const packetCanvas = canvas.querySelector('.s3-packet-canvas');
            const terminal = canvas.querySelector('.terminal-window');

            const trafficLbl = canvas.querySelector('.s3-lbl-traffic');
            const ioLbl = canvas.querySelector('.s3-lbl-io');
            const cpuLbl = canvas.querySelector('.s3-lbl-cpu');

            if (packetCanvas) packetCanvas.innerHTML = '';

            // Flashing users grid
            grid.forEach((node, idx) => {
                const isOnline = (Math.floor(progress * 150) + idx) % 2 === 0;
                const dot = node.querySelector('.u-dot');
                if (dot) {
                    dot.style.backgroundColor = isOnline ? '#10b981' : '#4b5563';
                    dot.style.boxShadow = isOnline ? '0 0 8px #10b981' : 'none';
                }
            });

            // Heartbeat overflow phase: progress > 0.15
            if (progress > 0.15 && progress <= 0.8) {
                // Storm SQL packets flying from Grid (X=130) to Database (X=330)
                if (packetCanvas && Math.random() < 0.6) {
                    const packet = document.createElement('div');
                    packet.style.position = 'absolute';
                    packet.style.left = '130px';
                    packet.style.top = `${80 + Math.random() * 200}px`;
                    packet.style.width = '8px';
                    packet.style.height = '8px';
                    packet.style.borderRadius = '50%';
                    packet.style.background = '#ef4444';
                    packet.style.boxShadow = '0 0 8px #ef4444';
                    packet.style.transition = 'all 0.4s linear';
                    packetCanvas.appendChild(packet);
                    
                    setTimeout(() => {
                        packet.style.left = '330px';
                    }, 10);
                    setTimeout(() => {
                        packet.remove();
                    }, 420);
                }

                // Shake database
                if (dbNode) {
                    dbNode.classList.add('db-overloaded');
                }
                if (dbIcon) {
                    dbIcon.style.color = '#ef4444';
                }

                // Calculate metrics loading
                const scaleP = (progress - 0.15) / 0.65;
                if (trafficLbl) trafficLbl.textContent = `${Math.floor(50 + scaleP * 9500000).toLocaleString()} /s`;
                if (ioLbl) ioLbl.textContent = `${Math.floor(15 + scaleP * 85)}%`;
                if (cpuLbl) cpuLbl.textContent = `${Math.floor(10 + scaleP * 89)}%`;

                // Update Terminal logs dynamically
                if (terminal) {
                    const errorLogs = [
                        '[WARN] Inode locks exceeded on table "users"',
                        '[ERROR] PostgreSQL connection pool exhausted (max 500)',
                        '[ERROR] CPU utilization at 98% - kernel context switches high',
                        '[CRITICAL] IOPS limit reached on AWS RDS instance!',
                        '[CRITICAL] Disk write latency > 850ms',
                        '[CRITICAL] Presence update buffer overflow. Packet discarded.',
                        '[ERROR] DB locks timed out. Transcation aborted.'
                    ];
                    let logHTML = '';
                    const logLimit = Math.floor(scaleP * 25);
                    for (let i = 0; i < logLimit; i++) {
                        const err = errorLogs[i % errorLogs.length];
                        logHTML += `<div class="terminal-line err">${err}</div>`;
                    }
                    terminal.innerHTML = logHTML;
                    terminal.scrollTop = terminal.scrollHeight;
                }
            } else {
                // Settle / Idle
                if (dbNode) {
                    dbNode.classList.remove('db-overloaded');
                }
                if (dbIcon) {
                    dbIcon.style.color = 'rgba(255,255,255,0.4)';
                }
                if (trafficLbl) trafficLbl.textContent = '0';
                if (ioLbl) ioLbl.textContent = '0%';
                if (cpuLbl) cpuLbl.textContent = '0.5%';
                if (terminal) terminal.innerHTML = '<div class="terminal-line" style="color:#888;">[SYSTEM] DB Engine listening on port 5432...</div>';
            }
        }
        else if (slideId === 'slide_active_4') {
            const records = canvas.querySelectorAll('.s4-rec-card');
            const bits = canvas.querySelectorAll('.bit-cell');
            const compressor = canvas.querySelector('.compressor-block');

            // 0.1 -> 0.45: Records collapse
            if (progress > 0.1 && progress <= 0.45) {
                const t = (progress - 0.1) / 0.35;
                if (compressor) compressor.style.opacity = t;
                records.forEach((rec, idx) => {
                    rec.style.transform = `scale(${1 - t * 0.2}) translateY(${t * 30}px)`;
                    rec.style.opacity = 1 - t * 0.3;
                });
            } else if (progress > 0.45) {
                if (compressor) compressor.style.opacity = 1;
                records.forEach(rec => {
                    rec.style.transform = 'scale(0.8) translateY(30px)';
                    rec.style.opacity = 0.7;
                });
            } else {
                if (compressor) compressor.style.opacity = 0;
                records.forEach(rec => {
                    rec.style.transform = 'none';
                    rec.style.opacity = 1;
                });
            }

            // 0.45 -> 0.95: Bit cells flash and light up
            bits.forEach((cell, idx) => {
                const bitVal = cell.textContent;
                if (progress > 0.45) {
                    const subP = (progress - 0.45) / 0.5;
                    const cellP = idx / 8;
                    
                    if (subP >= cellP) {
                        cell.classList.add(bitVal === '1' ? 'bit-1' : 'bit-0');
                    } else {
                        cell.classList.remove('bit-1', 'bit-0');
                    }
                } else {
                    cell.classList.remove('bit-1', 'bit-0');
                }
            });
        }
        else if (slideId === 'slide_active_5') {
            const traditionalMemory = canvas.querySelector('.lbl-traditional-memory');
            const optimizedMemory = canvas.querySelector('.lbl-optimized-memory');
            
            const barTraditional = canvas.querySelector('.growth-bar');
            const barOptimized = canvas.querySelector('.growth-bar-optimized');

            // Traditional Database Row Memory builds up from 0 to 800 MB
            // Optimized Redis Bitmap Memory builds up from 0 to 12.5 MB
            if (progress > 0.1) {
                const t = Math.min(1, (progress - 0.1) / 0.6);
                
                const tradVal = Math.floor(t * 800);
                const optVal = (t * 12.5).toFixed(1);

                if (traditionalMemory) traditionalMemory.textContent = `${tradVal} MB`;
                if (optimizedMemory) optimizedMemory.textContent = `${optVal} MB`;

                if (barTraditional) barTraditional.style.width = `${t * 96}%`;
                if (barOptimized) barOptimized.style.width = `${Math.max(2, t * 12.5 / 800 * 100)}%`;
            } else {
                if (traditionalMemory) traditionalMemory.textContent = '0 MB';
                if (optimizedMemory) optimizedMemory.textContent = '0 MB';
                if (barTraditional) barTraditional.style.width = '0%';
                if (barOptimized) barOptimized.style.width = '0%';
            }
        }
        else if (slideId === 'slide_active_6') {
            const packetCanvas = canvas.querySelector('.s6-packet-canvas');
            const clientDot = canvas.querySelector('.s6-client-dot');
            const gatewaySrv = canvas.querySelector('.s6-gateway-srv');
            const presenceSrv = canvas.querySelector('.s6-presence-srv');
            const redisNode = canvas.querySelector('.s6-redis-node');

            if (packetCanvas) packetCanvas.innerHTML = '';

            // Heartbeat status indicators
            let packetsHTML = '';
            let gwPulse = false;
            let prPulse = false;
            let rdPulse = false;

            // Phase 1: client -> Gateway (X=70 to X=260) - Path center Y is 70px
            // progress: 0.15 -> 0.35
            if (progress > 0.15 && progress <= 0.35) {
                const t = (progress - 0.15) / 0.20;
                const x = 70 + t * 190;
                packetsHTML += `<circle cx="${x}" cy="70" r="5" fill="#0084ff" filter="drop-shadow(0 0 6px #0084ff)"></circle>`;
                if (t >= 0.85) gwPulse = true;
            }

            // Phase 2: Gateway -> Presence Service (X=315 to X=490)
            // progress: 0.35 -> 0.55
            if (progress > 0.35 && progress <= 0.55) {
                gwPulse = true;
                const t = (progress - 0.35) / 0.20;
                const x = 315 + t * 175;
                packetsHTML += `<circle cx="${x}" cy="70" r="5" fill="#8b5cf6" filter="drop-shadow(0 0 6px #8b5cf6)"></circle>`;
                if (t >= 0.85) prPulse = true;
            }

            // Phase 3: Presence Service -> Redis Bitmap (X=550 to X=735)
            // progress: 0.55 -> 0.80
            if (progress > 0.55 && progress <= 0.80) {
                prPulse = true;
                const t = (progress - 0.55) / 0.25;
                const x = 550 + t * 185;
                packetsHTML += `<circle cx="${x}" cy="70" r="5" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"></circle>`;
                
                if (t >= 0.9) {
                    rdPulse = true;
                }
            }

            // Phase 4: Client green dot pulses upon success validation
            // progress > 0.80
            if (progress > 0.80) {
                rdPulse = true;
                if (clientDot) {
                    clientDot.style.backgroundColor = '#10b981';
                    clientDot.style.boxShadow = '0 0 10px #10b981';
                    clientDot.style.transform = 'scale(1.25)';
                }
            } else {
                if (clientDot) {
                    clientDot.style.backgroundColor = '#4b5563';
                    clientDot.style.boxShadow = 'none';
                    clientDot.style.transform = 'scale(1)';
                }
            }

            if (packetCanvas) {
                packetCanvas.innerHTML = `<svg style="width:100%; height:100%;">${packetsHTML}</svg>`;
            }

            // Server node transforms/glows
            if (gatewaySrv) {
                if (gwPulse) {
                    gatewaySrv.style.borderColor = '#0084ff';
                    gatewaySrv.style.boxShadow = '0 0 15px rgba(0, 132, 255, 0.5)';
                    gatewaySrv.style.transform = 'scale(1.05)';
                } else {
                    gatewaySrv.style.borderColor = 'rgba(0, 132, 255, 0.4)';
                    gatewaySrv.style.boxShadow = 'none';
                    gatewaySrv.style.transform = 'scale(1)';
                }
            }
            if (presenceSrv) {
                if (prPulse) {
                    presenceSrv.style.borderColor = '#8b5cf6';
                    presenceSrv.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
                    presenceSrv.style.transform = 'scale(1.05)';
                } else {
                    presenceSrv.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                    presenceSrv.style.boxShadow = 'none';
                    presenceSrv.style.transform = 'scale(1)';
                }
            }
            if (redisNode) {
                if (rdPulse) {
                    redisNode.style.borderColor = '#ef4444';
                    redisNode.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                    redisNode.style.transform = 'scale(1.05)';
                } else {
                    redisNode.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    redisNode.style.boxShadow = 'none';
                    redisNode.style.transform = 'scale(1)';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video24'
    };

    console.log('[Video24 Plugin] Loaded: Messenger Active Status presence slides loaded successfully.');
})();
