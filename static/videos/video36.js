/**
 * Video 36: Facebook Proximity Tracking - "Công nghệ đáng sợ"
 * Dynamic loader plugin for Video 36 slides & GFX
 */
(function () {
    'use strict';

    // ── KEYWORDS TIMINGS ──────────────────────────────────────────────────────
    const keywordsData = {
        slide_v36_hook_a: [
            { text: 'gợi ý kết bạn', start: 3.0, end: 5.0, class: 'active-gold' }
        ],
        slide_v36_hook_b: [
            { text: 'nghe lén', start: 3.0, end: 5.0, class: 'active-bad' }
        ],
        slide_v36_location_bluetooth: [
            { text: 'tọa độ giống hệt nhau', start: 3.0, end: 7.0, class: 'active-gold' },
            { text: 'Bluetooth', start: 7.5, end: 11.0, class: 'active-good' }
        ],
        slide_v36_wifi_overlap: [
            { text: 'Wi-Fi', start: 3.0, end: 6.0, class: 'active-good' },
            { text: 'IP công cộng', start: 6.5, end: 10.0, class: 'active-gold' }
        ],
        slide_v36_contact_sync: [
            { text: 'Đồng bộ danh bạ', start: 1.5, end: 5.0, class: 'active-gold' },
            { text: 'so khớp chéo', start: 10.5, end: 14.5, class: 'active-good' }
        ],
        slide_v36_social_graph: [
            { text: 'Social Graph', start: 3.0, end: 6.0, class: 'active-gold' },
            { text: 'gợi ý kết bạn', start: 11.0, end: 15.0, class: 'active-good' }
        ],
        slide_v36_privacy_shield: [
            { text: 'quyền riêng tư', start: 7.0, end: 10.5, class: 'active-good' },
            { text: 'tắt quyền vị trí', start: 10.5, end: 14.5, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_v36_hook_a', 'slide_v36_hook_b', 'slide_v36_location_bluetooth', 'slide_v36_wifi_overlap',
        'slide_v36_contact_sync', 'slide_v36_social_graph', 'slide_v36_privacy_shield'
    ];

    // ── GFX RENDERER ───────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_v36_hook_a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper-hook">
                        <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                            <div class="v36-facebook-intro-container">
                                <div class="v36-facebook-glow-ring"></div>
                                <div class="v36-facebook-glow-ring inner"></div>
                                <div class="v36-giant-facebook-logo">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                                </div>
                            </div>
                            <div class="v36-glass-card" style="text-align: center; width: 440px; padding: 18px 24px; margin-top: 15px; border: 1.5px solid rgba(24, 119, 242, 0.4); background: rgba(10, 12, 15, 0.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55);">
                                <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(24, 119, 242, 0.4); background: rgba(24, 119, 242, 0.1); color: #1877f2; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                    <i data-lucide="facebook" style="width: 14px; height: 14px; color: #1877f2;"></i> Proximity Tracking
                                </div>
                                <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: #1877f2; line-height: 1.45;">
                                    Gợi ý kết bạn: Phải chăng Facebook đang nghe lén điện thoại của bạn?
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }
        else if (slideId === 'slide_v36_hook_b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper">
                        <div style="display:flex; align-items:center; gap:50px; position:relative;">
                            <!-- Phone A (User A) -->
                            <div class="v36-phone float-a">
                                <div class="v36-phone-notch"></div>
                                <div class="v36-fb-header">
                                    <span style="font-size:18px; font-weight:bold; color:#1877f2; letter-spacing:-0.5px;">facebook</span>
                                    <img class="v36-fb-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png" alt="FB logo">
                                </div>
                                <div class="v36-phone-screen">
                                    <div style="text-align:center; padding-top:20px;">
                                        <span style="font-size:42px;">👦</span>
                                        <div style="font-size:18px; font-weight:bold; margin-top:8px; color:#f8fafc;">Bạn (User A)</div>
                                    </div>
                                    <!-- Signal scanner area -->
                                    <div style="position:relative; flex:1; display:flex; align-items:center; justify-content:center;">
                                        <div class="v36-sonar-ring r1" style="width:160px; height:160px; left:50%; top:50%;"></div>
                                        <div class="v36-sonar-ring r2" style="width:160px; height:160px; left:50%; top:50%;"></div>
                                        <div style="font-size:28px; z-index:2; position:relative;">📡</div>
                                    </div>
                                    <!-- Suggestion card slides up -->
                                    <div class="v36-suggestion-card v36-glass-card">
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <span style="font-size:32px;">👧</span>
                                            <div style="flex:1; text-align:left;">
                                                <div style="font-size:14px; font-weight:bold; color:#fff;">Người bạn mới (User B)</div>
                                                <div style="font-size:12px; color:rgba(255,255,255,0.6);">2 bạn chung</div>
                                            </div>
                                        </div>
                                        <div style="display:flex; gap:8px; margin-top:12px;">
                                            <button style="flex:1; background:#1877f2; color:#fff; border:none; border-radius:6px; padding:6px; font-size:12px; font-weight:600; cursor:pointer;">Thêm bạn bè</button>
                                            <button style="background:rgba(255,255,255,0.1); color:#fff; border:none; border-radius:6px; padding:6px 12px; font-size:12px; cursor:pointer;">Gỡ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Connection Status Panel -->
                            <div style="width:110px; display:flex; flex-direction:column; align-items:center; gap:15px; z-index:10;">
                                <div class="v36-glass-card" style="padding:12px 16px; border-radius:12px; border-color:rgba(245,158,11,0.25); background:rgba(245,158,11,0.05); text-align:center; min-width:90px;">
                                    <div style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:bold; letter-spacing:0.8px;">Gặp mặt</div>
                                    <div class="v36-hook-status" style="font-size:14px; font-weight:bold; margin-top:4px; color:#fff;">Trực tiếp</div>
                                </div>
                            </div>

                            <!-- Phone B (User B) -->
                            <div class="v36-phone float-b">
                                <div class="v36-phone-notch"></div>
                                <div class="v36-fb-header">
                                    <span style="font-size:18px; font-weight:bold; color:#1877f2; letter-spacing:-0.5px;">facebook</span>
                                    <img class="v36-fb-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png" alt="FB logo">
                                </div>
                                <div class="v36-phone-screen">
                                    <div style="text-align:center; padding-top:20px;">
                                        <span style="font-size:42px;">👧</span>
                                        <div style="font-size:18px; font-weight:bold; margin-top:8px; color:#f8fafc;">Bạn mới (User B)</div>
                                    </div>
                                    <div style="position:relative; flex:1; display:flex; align-items:center; justify-content:center;">
                                        <div class="v36-sonar-ring r1" style="width:160px; height:160px; left:50%; top:50%;"></div>
                                        <div class="v36-sonar-ring r2" style="width:160px; height:160px; left:50%; top:50%;"></div>
                                        <div style="font-size:28px; z-index:2; position:relative;">📡</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v36_location_bluetooth') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper" style="zoom:0.88; gap:40px; display:flex; align-items:center; justify-content:center;">
                        <!-- Coordinates Map -->
                        <div class="v36-glass-card" style="width:450px; height:480px; padding:20px; display:flex; flex-direction:column; box-sizing:border-box;">
                            <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">📍 Bản đồ tọa độ thực tế</div>
                            <div style="flex:1; position:relative; margin-top:15px; border-radius:12px; overflow:hidden; background:#070a12; border:1px solid rgba(255,255,255,0.04);">
                                <div class="v36-map-grid"></div>
                                
                                <!-- Proximity boundary circles -->
                                <div class="v36-proximity-circle" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); border:2px dashed rgba(56, 189, 248, 0.35); border-radius:50%; width:200px; height:200px;"></div>
                                
                                <!-- Node A -->
                                <div class="v36-user-node-s2 node-a" style="position:absolute; left:44%; top:48%; transform:translate(-50%, -50%); z-index:5; text-align:center;">
                                    <span style="font-size:32px;">👦</span>
                                    <div style="font-size:12px; background:rgba(0,0,0,0.65); padding:2px 6px; border-radius:4px; margin-top:2px; font-weight:600;">User A</div>
                                </div>
                                <!-- Node B -->
                                <div class="v36-user-node-s2 node-b" style="position:absolute; left:56%; top:52%; transform:translate(-50%, -50%); z-index:5; text-align:center;">
                                    <span style="font-size:32px;">👧</span>
                                    <div style="font-size:12px; background:rgba(0,0,0,0.65); padding:2px 6px; border-radius:4px; margin-top:2px; font-weight:600;">User B</div>
                                </div>
                                
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <line class="v36-s2-line" x1="198" y1="230" x2="252" y2="250" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 4" style="opacity:0; transition:opacity 0.4s;"></line>
                                </svg>
                            </div>
                        </div>

                        <!-- DB Log and Bluetooth Scan -->
                        <div class="v36-glass-card" style="width:430px; height:480px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">🔍 Đối chiếu dữ liệu vị trí</div>
                                <div style="margin-top:20px;">
                                    <table class="v36-db-table">
                                        <thead>
                                            <tr>
                                                <th>THIẾT BỊ</th>
                                                <th>GPS LAT / LONG</th>
                                                <th>BLUETOOTH SIGNAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="row-a">
                                                <td>User A</td>
                                                <td class="gps-a" style="font-family:monospace;">Đang lấy...</td>
                                                <td class="bt-a">Đang quét...</td>
                                            </tr>
                                            <tr class="row-b">
                                                <td>User B</td>
                                                <td class="gps-b" style="font-family:monospace;">Đang lấy...</td>
                                                <td class="bt-b">Đang quét...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="v36-glass-card" style="padding:15px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:12px; border-color:rgba(255,255,255,0.05);">
                                <div class="v36-led-dot active-scanning s2-led"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái khớp</div>
                                    <div class="v36-s2-result-text" style="font-size:15px; font-weight:bold; margin-top:2px;">Tìm kiếm tín hiệu trùng lặp...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v36_wifi_overlap') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper" style="zoom:0.88; gap:40px; display:flex; align-items:center; justify-content:center;">
                        <!-- Connection flow graph -->
                        <div class="v36-glass-card" style="width:480px; height:480px; padding:20px; display:flex; flex-direction:column; box-sizing:border-box;">
                            <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">📡 Kết nối Wi-Fi & SSID chung</div>
                            
                            <div style="flex:1; position:relative; margin-top:15px; border-radius:12px; overflow:hidden; background:#070a12; border:1px solid rgba(255,255,255,0.04);">
                                <!-- Wi-Fi Router node -->
                                <div class="v36-router-node" style="position:absolute; left:50%; top:35%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <div style="width:70px; height:70px; border-radius:50%; background:rgba(30, 41, 59, 0.9); border:2.5px solid #f59e0b; display:flex; align-items:center; justify-content:center; font-size:36px; margin:0 auto; box-shadow:0 10px 30px rgba(0,0,0,0.5);">📶</div>
                                    <div style="font-size:14px; font-weight:bold; margin-top:6px; color:#f59e0b;">Coffee Highlands Wi-Fi</div>
                                </div>

                                <!-- User A -->
                                <div class="v36-user-node-s3" style="position:absolute; left:22%; top:75%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <span style="font-size:36px;">👦</span>
                                    <div style="font-size:13px; font-weight:bold; margin-top:4px;">User A</div>
                                </div>
                                <!-- User B -->
                                <div class="v36-user-node-s3" style="position:absolute; left:78%; top:75%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <span style="font-size:36px;">👧</span>
                                    <div style="font-size:13px; font-weight:bold; margin-top:4px;">User B</div>
                                </div>

                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <path class="v36-s3-path-a v36-dash-path" d="M 105 350 L 210 200" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3"></path>
                                    <path class="v36-s3-path-b v36-dash-path" d="M 375 350 L 270 200" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3"></path>
                                    <path class="v36-s3-path-upload v36-dash-path" d="M 240 135 L 240 40" fill="none" stroke="rgba(56, 189, 248, 0.4)" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                </svg>
                                
                                <!-- Connection flow packet dots -->
                                <div class="v36-s3-packet-a" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#f59e0b; opacity:0; left:105px; top:350px; transform:translate(-50%,-50%); z-index:5;"></div>
                                <div class="v36-s3-packet-b" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#f59e0b; opacity:0; left:375px; top:350px; transform:translate(-50%,-50%); z-index:5;"></div>

                                <!-- Cloud database syncing badge -->
                                <div class="v36-cloud-upload-badge v36-glass-card" style="position:absolute; left:50%; top:45px; transform:translateX(-50%); padding:6px 12px; font-size:12px; font-weight:bold; border-color:rgba(56, 189, 248, 0.3); background:rgba(56, 189, 248, 0.05); color:#38bdf8; opacity:0; transition:opacity 0.4s;">
                                    Cloud Syncing...
                                </div>
                            </div>
                        </div>

                        <!-- Console monitor -->
                        <div class="v36-glass-card" style="width:400px; height:480px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">📋 Network log console</div>
                                <div style="background:rgba(0,0,0,0.45); border-radius:10px; padding:15px; border:1px solid rgba(255,255,255,0.05); font-family:monospace; font-size:13px; line-height:1.6; color:#a2a8b3; height:240px; margin-top:20px; overflow:hidden; text-align:left;" class="v36-network-console">
                                    <!-- Console lines -->
                                </div>
                            </div>
                            
                            <div class="v36-glass-card" style="padding:15px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:12px; border-color:rgba(255,255,255,0.05);">
                                <div class="v36-led-dot active-scanning s3-led"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Kết quả phân tích</div>
                                    <div class="v36-s3-result-text" style="font-size:15px; font-weight:bold; margin-top:2px;">Tìm kiếm dải IP trùng...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v36_contact_sync') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper" style="zoom:0.88; gap:40px; display:flex; align-items:center; justify-content:center;">
                        <!-- Contact graph map -->
                        <div class="v36-glass-card" style="width:450px; height:480px; padding:20px; display:flex; flex-direction:column; box-sizing:border-box;">
                            <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">👥 Sơ đồ liên kết danh bạ</div>
                            
                            <div style="flex:1; position:relative; margin-top:15px; border-radius:12px; overflow:hidden; background:#070a12; border:1px solid rgba(255,255,255,0.04);">
                                <!-- User C (Mutual friend) -->
                                <div class="v36-user-node-s4 node-c" style="position:absolute; left:50%; top:25%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <div class="v36-graph-node" style="margin:0 auto; border-color:#f59e0b;">👦</div>
                                    <div style="font-size:13px; font-weight:bold; margin-top:4px; color:#f59e0b; white-space:nowrap;">Bạn chung (User C)</div>
                                </div>

                                <!-- User A -->
                                <div class="v36-user-node-s4 node-a" style="position:absolute; left:25%; top:70%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <div class="v36-graph-node" style="margin:0 auto;">👦</div>
                                    <div style="font-size:13px; font-weight:bold; margin-top:4px;">Bạn (User A)</div>
                                </div>
                                <!-- User B -->
                                <div class="v36-user-node-s4 node-b" style="position:absolute; left:75%; top:70%; transform:translate(-50%,-50%); z-index:10; text-align:center;">
                                    <div class="v36-graph-node" style="margin:0 auto;">👧</div>
                                    <div style="font-size:13px; font-weight:bold; margin-top:4px;">Bạn mới (User B)</div>
                                </div>

                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <line class="v36-s4-line-ca" x1="225" y1="125" x2="112" y2="335" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"></line>
                                    <line class="v36-s4-line-cb" x1="225" y1="125" x2="338" y2="335" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"></line>
                                    <path class="v36-s4-line-ab" d="M 112 335 L 338 335" fill="none" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6 4" style="opacity:0; transition:opacity 0.4s;"></path>
                                </svg>
                                
                                <div class="v36-s4-packet-ca" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#f59e0b; opacity:0; left:225px; top:125px; transform:translate(-50%,-50%); z-index:5;"></div>
                                <div class="v36-s4-packet-cb" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#f59e0b; opacity:0; left:225px; top:125px; transform:translate(-50%,-50%); z-index:5;"></div>
                            </div>
                        </div>

                        <!-- Table DB query match contacts -->
                        <div class="v36-glass-card" style="width:430px; height:480px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">📁 Đồng bộ danh bạ của User C</div>
                                <div style="margin-top:20px;">
                                    <table class="v36-db-table">
                                        <thead>
                                            <tr>
                                                <th>DANH BẠ UPLOAD</th>
                                                <th>SỐ ĐIỆN THOẠI</th>
                                                <th>KẾT QUẢ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="row-contact-a">
                                                <td>"User A - Đại học"</td>
                                                <td style="font-family:monospace;">090-345-6789</td>
                                                <td class="status-a">Đang quét...</td>
                                            </tr>
                                            <tr class="row-contact-b">
                                                <td>"User B - Highlands"</td>
                                                <td style="font-family:monospace;">098-999-1234</td>
                                                <td class="status-b">Đang quét...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="v36-glass-card" style="padding:15px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:12px; border-color:rgba(255,255,255,0.05);">
                                <div class="v36-led-dot active-scanning s4-led"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">So khớp chéo (Cross-matching)</div>
                                    <div class="v36-s4-result-text" style="font-size:15px; font-weight:bold; margin-top:2px;">Tìm kiếm mối liên kết ẩn...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v36_social_graph') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper" style="zoom:0.88; gap:40px; display:flex; align-items:center; justify-content:center;">
                        <!-- Social Graph Network -->
                        <div class="v36-glass-card" style="width:480px; height:480px; padding:20px; display:flex; flex-direction:column; box-sizing:border-box;">
                            <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">🕸️ Đồ thị quan hệ Social Graph</div>
                            
                            <div style="flex:1; position:relative; margin-top:15px; border-radius:12px; overflow:hidden; background:#070a12; border:1px solid rgba(255,255,255,0.04);">
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <!-- Network background edges -->
                                    <line x1="80" y1="120" x2="220" y2="80" stroke="rgba(255,255,255,0.08)" stroke-width="2"></line>
                                    <line x1="80" y1="120" x2="160" y2="240" stroke="rgba(255,255,255,0.08)" stroke-width="2"></line>
                                    <line x1="220" y1="80" x2="380" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="2"></line>
                                    <line x1="160" y1="240" x2="320" y2="240" stroke="rgba(255,255,255,0.08)" stroke-width="2"></line>
                                    <line x1="320" y1="240" x2="380" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="2"></line>
                                    
                                    <!-- Highlight edges matching step progress -->
                                    <path class="v36-s5-path-a" d="M 80 120 L 220 80" fill="none" stroke="#38bdf8" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                    <path class="v36-s5-path-b" d="M 220 80 L 380 120" fill="none" stroke="#38bdf8" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                    
                                    <path class="v36-s5-path-c" d="M 80 120 L 160 240" fill="none" stroke="#34d399" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                    <path class="v36-s5-path-d" d="M 160 240 L 320 240" fill="none" stroke="#34d399" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                    <path class="v36-s5-path-e" d="M 320 240 L 380 120" fill="none" stroke="#34d399" stroke-width="3" style="opacity:0; transition:opacity 0.4s;"></path>
                                </svg>
                                
                                <!-- Nodes -->
                                <div class="v36-graph-node active-user" style="position:absolute; left:80px; top:120px; transform:translate(-50%,-50%); z-index:5;">A</div>
                                <div class="v36-graph-node v36-s5-node-f1" style="position:absolute; left:220px; top:80px; transform:translate(-50%,-50%); z-index:5; font-size:12px;">F1</div>
                                <div class="v36-graph-node v36-s5-node-f2" style="position:absolute; left:160px; top:240px; transform:translate(-50%,-50%); z-index:5; font-size:12px;">F2</div>
                                <div class="v36-graph-node v36-s5-node-f3" style="position:absolute; left:320px; top:240px; transform:translate(-50%,-50%); z-index:5; font-size:12px;">F3</div>
                                <div class="v36-graph-node active-match" style="position:absolute; left:380px; top:120px; transform:translate(-50%,-50%); z-index:5;">B</div>
                            </div>
                        </div>

                        <!-- Stats scoring table panel -->
                        <div class="v36-glass-card" style="width:400px; height:480px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:18px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-align:left;">🧠 Phân tích thuật toán Graph</div>
                                <div style="margin-top:25px; display:flex; flex-direction:column; gap:16px;">
                                    <div class="v36-glass-card" style="padding:15px; border-color:rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.5); font-size:14px;">Số bạn chung:</span>
                                        <span class="v36-s5-mutual" style="font-weight:bold; color:#38bdf8; font-size:14px;">0 bạn chung</span>
                                    </div>
                                    <div class="v36-glass-card" style="padding:15px; border-color:rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.5); font-size:14px;">Trùng vị trí / Wi-Fi:</span>
                                        <span class="v36-s5-overlap" style="font-weight:bold; color:#34d399; font-size:14px;">Chưa ghi nhận</span>
                                    </div>
                                    <div class="v36-glass-card" style="padding:15px; border-color:rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); display:flex; justify-content:space-between; align-items:center;">
                                        <span style="color:rgba(255,255,255,0.5); font-size:14px;">Điểm tin cậy đề xuất:</span>
                                        <span class="v36-s5-score" style="font-weight:900; color:#fb7185; font-size:18px;">0%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="v36-glass-card" style="padding:15px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:12px; border-color:rgba(255,255,255,0.05);">
                                <div class="v36-led-dot active-scanning s5-led"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái đề xuất</div>
                                    <div class="v36-s5-result-text" style="font-size:15px; font-weight:bold; margin-top:2px;">Đang tính toán liên kết...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v36_privacy_shield') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v36-scene-wrapper">
                        <div class="v36-phone float-a" style="width:380px; height:530px; border-radius:32px;">
                            <div class="v36-phone-notch"></div>
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:12px; margin-top:10px; width:100%;">
                                <span style="font-size:20px; font-weight:bold; color:#fff;">Quyền riêng tư</span>
                                <span style="font-size:13px; color:#34d399; font-weight:600;">Facebook App</span>
                            </div>
                            <div class="v36-phone-screen" style="padding-top:15px; justify-content:flex-start; text-align:left;">
                                <div class="v36-toggle-row">
                                    <div>
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">Quyền vị trí chạy nền</div>
                                        <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px;">Cho phép FB theo dõi khi tắt app</div>
                                    </div>
                                    <div class="v36-toggle-switch on toggle-location"></div>
                                </div>
                                <div class="v36-toggle-row">
                                    <div>
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">Tự đồng bộ danh bạ</div>
                                        <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px;">Upload số điện thoại lên máy chủ</div>
                                    </div>
                                    <div class="v36-toggle-switch on toggle-contacts"></div>
                                </div>
                                <div class="v36-toggle-row">
                                    <div>
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">Bluetooth Beacons</div>
                                        <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px;">Quét thiết bị Bluetooth xung quanh</div>
                                    </div>
                                    <div class="v36-toggle-switch on toggle-bluetooth"></div>
                                </div>
                                
                                <!-- Protective Shield Overlay -->
                                <div class="v36-shield-overlay v36-shield-glow-effect">
                                    <span class="v36-shield-icon">🛡️</span>
                                    <div style="font-size:18px; font-weight:bold; color:#34d399;">ĐÃ BẢO VỆ AN TOÀN</div>
                                    <div style="font-size:12px; color:rgba(255,255,255,0.6); margin-top:6px; line-height:1.5;">Quyền định vị ngầm và Bluetooth đã bị vô hiệu hóa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    // ── ANIMATION TIMELINE UPDATE ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_v36_hook_a') {
            return;
        }
        else if (slideId === 'slide_v36_hook_b') {
            const suggestion = canvas.querySelector('.v36-suggestion-card');
            const statusLabel = canvas.querySelector('.v36-hook-status');
            
            if (progress > 0.45) {
                if (suggestion) suggestion.classList.add('active');
                if (statusLabel) {
                    statusLabel.textContent = 'Gợi ý kết bạn!';
                    statusLabel.style.color = '#38bdf8';
                }
            } else {
                if (suggestion) suggestion.classList.remove('active');
                if (statusLabel) {
                    statusLabel.textContent = 'Gặp trực tiếp';
                    statusLabel.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_v36_location_bluetooth') {
            const pathLine = canvas.querySelector('.v36-s2-line');
            const gpsA = canvas.querySelector('.gps-a');
            const gpsB = canvas.querySelector('.gps-b');
            const btA = canvas.querySelector('.bt-a');
            const btB = canvas.querySelector('.bt-b');
            const led = canvas.querySelector('.s2-led');
            const resultText = canvas.querySelector('.v36-s2-result-text');
            const userB = canvas.querySelector('.node-b');

            // Move user B closer to A during slide
            if (userB) {
                const startLeft = 56;
                const endLeft = 51;
                const currentLeft = startLeft - (startLeft - endLeft) * progress;
                userB.style.left = `${currentLeft}%`;
            }

            if (progress > 0.2 && progress < 0.6) {
                if (gpsA) gpsA.textContent = '10.7769° N, 106.7009° E';
                if (gpsB) gpsB.textContent = '10.7769° N, 106.7009° E';
                if (btA) btA.textContent = 'Scanning...';
                if (btB) btB.textContent = 'Scanning...';
                if (resultText) resultText.textContent = 'Tọa độ GPS trùng khớp (Khoảng cách < 5m)';
            }
            else if (progress >= 0.6) {
                if (gpsA) gpsA.textContent = '10.7769° N, 106.7009° E';
                if (gpsB) gpsB.textContent = '10.7769° N, 106.7009° E';
                if (btA) btA.textContent = 'Beacon ID 8a2f';
                if (btB) btB.textContent = 'Beacon ID 8a2f';
                if (pathLine) pathLine.style.opacity = '1';
                if (led) {
                    led.className = 'v36-led-dot active-ok s2-led';
                }
                if (resultText) resultText.textContent = 'Trùng khớp Bluetooth + GPS! Ghi nhận liên kết.';
            }
            else {
                if (gpsA) gpsA.textContent = 'Đang lấy...';
                if (gpsB) gpsB.textContent = 'Đang lấy...';
                if (btA) btA.textContent = 'Đang quét...';
                if (btB) btB.textContent = 'Đang quét...';
                if (pathLine) pathLine.style.opacity = '0';
                if (led) {
                    led.className = 'v36-led-dot active-scanning s2-led';
                }
                if (resultText) resultText.textContent = 'Tìm kiếm tín hiệu trùng lặp...';
            }
        }
        else if (slideId === 'slide_v36_wifi_overlap') {
            const packetA = canvas.querySelector('.v36-s3-packet-a');
            const packetB = canvas.querySelector('.v36-s3-packet-b');
            const uploadPath = canvas.querySelector('.v36-s3-path-upload');
            const cloudBadge = canvas.querySelector('.v36-cloud-upload-badge');
            const consoleBox = canvas.querySelector('.v36-network-console');
            const led = canvas.querySelector('.s3-led');
            const resultText = canvas.querySelector('.v36-s3-result-text');

            // Packet flow to router: progress 0.1 to 0.5
            if (progress > 0.1 && progress < 0.5) {
                const t = (progress - 0.1) / 0.4;
                // Path A: 105, 350 -> 210, 200
                const xa = 105 + (210 - 105) * t;
                const ya = 350 - (350 - 200) * t;
                if (packetA) { packetA.style.left = `${xa}px`; packetA.style.top = `${ya}px`; packetA.style.opacity = '1'; }

                // Path B: 375, 350 -> 270, 200
                const xb = 375 - (375 - 270) * t;
                const yb = 350 - (350 - 200) * t;
                if (packetB) { packetB.style.left = `${xb}px`; packetB.style.top = `${yb}px`; packetB.style.opacity = '1'; }
            } else {
                if (packetA) packetA.style.opacity = '0';
                if (packetB) packetB.style.opacity = '0';
            }

            // Sync from router to cloud: progress 0.5 to 0.8
            if (progress >= 0.5) {
                if (uploadPath) uploadPath.style.opacity = '1';
                if (cloudBadge) cloudBadge.style.opacity = '1';
            } else {
                if (uploadPath) uploadPath.style.opacity = '0';
                if (cloudBadge) cloudBadge.style.opacity = '0';
            }

            // Console output text lines
            if (consoleBox) {
                let lines = [];
                if (progress > 0.1) lines.push('> [WiFi] Connecting User A...');
                if (progress > 0.25) lines.push('> [WiFi] Connecting User B...');
                if (progress > 0.4) lines.push('> [WiFi] Router registered: Cafe_Highlands');
                if (progress > 0.55) {
                    lines.push('> [Cloud] Matching External IP: 113.161.42.100');
                    lines.push('> [Cloud] SSID overlap: Cafe_Highlands_Guest');
                }
                if (progress > 0.8) {
                    lines.push('> MATCH DETECTED: 2 devices sharing hotspot');
                }
                consoleBox.innerHTML = lines.join('<br>');
            }

            if (progress >= 0.8) {
                if (led) led.className = 'v36-led-dot active-ok s3-led';
                if (resultText) resultText.textContent = 'IP và SSID trùng khớp! Xác nhận đang ở cùng quán cafe.';
            } else if (progress >= 0.55) {
                if (led) led.className = 'v36-led-dot active-scanning s3-led';
                if (resultText) resultText.textContent = 'Phát hiện cùng dải IP công cộng...';
            } else {
                if (led) led.className = 'v36-led-dot active-scanning s3-led';
                if (resultText) resultText.textContent = 'Tìm kiếm dải IP trùng...';
            }
        }
        else if (slideId === 'slide_v36_contact_sync') {
            const packetCA = canvas.querySelector('.v36-s4-packet-ca');
            const packetCB = canvas.querySelector('.v36-s4-packet-cb');
            const abLine = canvas.querySelector('.v36-s4-line-ab');
            const statusA = canvas.querySelector('.status-a');
            const statusB = canvas.querySelector('.status-b');
            const led = canvas.querySelector('.s4-led');
            const resultText = canvas.querySelector('.v36-s4-result-text');

            // Packets fly from C to A and B
            if (progress > 0.1 && progress < 0.5) {
                const t = (progress - 0.1) / 0.4;
                // C -> A: 225, 125 -> 112, 335
                const xa = 225 - (225 - 112) * t;
                const ya = 125 + (335 - 125) * t;
                if (packetCA) { packetCA.style.left = `${xa}px`; packetCA.style.top = `${ya}px`; packetCA.style.opacity = '1'; }

                // C -> B: 225, 125 -> 338, 335
                const xb = 225 + (338 - 225) * t;
                const yb = 125 + (335 - 125) * t;
                if (packetCB) { packetCB.style.left = `${xb}px`; packetCB.style.top = `${yb}px`; packetCB.style.opacity = '1'; }
            } else {
                if (packetCA) packetCA.style.opacity = '0';
                if (packetCB) packetCB.style.opacity = '0';
            }

            if (progress > 0.35) {
                if (statusA) { statusA.textContent = 'Khớp User A'; statusA.style.color = '#34d399'; }
            } else {
                if (statusA) { statusA.textContent = 'Đang quét...'; statusA.style.color = '#e2e8f0'; }
            }

            if (progress > 0.65) {
                if (statusB) { statusB.textContent = 'Khớp User B'; statusB.style.color = '#34d399'; }
                if (abLine) abLine.style.opacity = '1';
            } else {
                if (statusB) { statusB.textContent = 'Đang quét...'; statusB.style.color = '#e2e8f0'; }
                if (abLine) abLine.style.opacity = '0';
            }

            if (progress >= 0.75) {
                if (led) led.className = 'v36-led-dot active-alert s4-led';
                if (resultText) resultText.textContent = 'Tìm thấy liên kết gián tiếp từ danh bạ User C!';
            } else {
                if (led) led.className = 'v36-led-dot active-scanning s4-led';
                if (resultText) resultText.textContent = 'Đang so khớp các số điện thoại...';
            }
        }
        else if (slideId === 'slide_v36_social_graph') {
            const pathA = canvas.querySelector('.v36-s5-path-a');
            const pathB = canvas.querySelector('.v36-s5-path-b');
            const pathC = canvas.querySelector('.v36-s5-path-c');
            const pathD = canvas.querySelector('.v36-s5-path-d');
            const pathE = canvas.querySelector('.v36-s5-path-e');
            const nodeF1 = canvas.querySelector('.v36-s5-node-f1');
            const nodeF2 = canvas.querySelector('.v36-s5-node-f2');
            const nodeF3 = canvas.querySelector('.v36-s5-node-f3');
            
            const mutualText = canvas.querySelector('.v36-s5-mutual');
            const overlapText = canvas.querySelector('.v36-s5-overlap');
            const scoreText = canvas.querySelector('.v36-s5-score');
            const resultText = canvas.querySelector('.v36-s5-result-text');
            const led = canvas.querySelector('.s5-led');

            // Step 1: Draw connections through F1 (Mutual friends)
            if (progress > 0.15) {
                if (pathA) pathA.style.opacity = '1';
                if (pathB) pathB.style.opacity = '1';
                if (nodeF1) { nodeF1.style.borderColor = '#38bdf8'; nodeF1.style.boxShadow = '0 0 10px rgba(56,189,248,0.2)'; }
                if (mutualText) mutualText.textContent = '1 bạn chung';
            } else {
                if (pathA) pathA.style.opacity = '0';
                if (pathB) pathB.style.opacity = '0';
                if (nodeF1) { nodeF1.style.borderColor = 'rgba(255,255,255,0.2)'; nodeF1.style.boxShadow = 'none'; }
                if (mutualText) mutualText.textContent = '0 bạn chung';
            }

            // Step 2: Draw connections through F2 -> F3 (Mutual circle)
            if (progress > 0.45) {
                if (pathC) pathC.style.opacity = '1';
                if (pathD) pathD.style.opacity = '1';
                if (pathE) pathE.style.opacity = '1';
                if (nodeF2) { nodeF2.style.borderColor = '#34d399'; nodeF2.style.boxShadow = '0 0 10px rgba(52,211,153,0.2)'; }
                if (nodeF3) { nodeF3.style.borderColor = '#34d399'; nodeF3.style.boxShadow = '0 0 10px rgba(52,211,153,0.2)'; }
                if (mutualText) mutualText.textContent = '3 bạn chung';
                if (overlapText) overlapText.textContent = 'GPS Trùng (Highlands)';
            } else {
                if (pathC) pathC.style.opacity = '0';
                if (pathD) pathD.style.opacity = '0';
                if (pathE) pathE.style.opacity = '0';
                if (nodeF2) { nodeF2.style.borderColor = 'rgba(255,255,255,0.2)'; nodeF2.style.boxShadow = 'none'; }
                if (nodeF3) { nodeF3.style.borderColor = 'rgba(255,255,255,0.2)'; nodeF3.style.boxShadow = 'none'; }
                if (overlapText) overlapText.textContent = 'Chưa ghi nhận';
            }

            // Step 3: Compute final connection score
            let score = 0;
            if (progress > 0.1) {
                const currentRatio = Math.min(1, (progress - 0.1) / 0.85);
                score = Math.floor(currentRatio * 98);
            }
            if (scoreText) scoreText.textContent = `${score}%`;

            if (progress >= 0.85) {
                if (led) led.className = 'v36-led-dot active-ok s5-led';
                if (resultText) resultText.textContent = 'Độ tin cậy 98%! Đang kích hoạt gợi ý kết bạn.';
            } else {
                if (led) led.className = 'v36-led-dot active-scanning s5-led';
                if (resultText) resultText.textContent = 'Đang tính toán mức độ liên kết...';
            }
        }
        else if (slideId === 'slide_v36_privacy_shield') {
            const toggleLoc = canvas.querySelector('.toggle-location');
            const toggleCont = canvas.querySelector('.toggle-contacts');
            const toggleBlue = canvas.querySelector('.toggle-bluetooth');
            const shield = canvas.querySelector('.v36-shield-overlay');

            // Turn off toggles step by step
            if (progress > 0.2) {
                if (toggleLoc) toggleLoc.classList.remove('on');
            } else {
                if (toggleLoc) toggleLoc.classList.add('on');
            }

            if (progress > 0.45) {
                if (toggleCont) toggleCont.classList.remove('on');
            } else {
                if (toggleCont) toggleCont.classList.add('on');
            }

            if (progress > 0.7) {
                if (toggleBlue) toggleBlue.classList.remove('on');
            } else {
                if (toggleBlue) toggleBlue.classList.add('on');
            }

            // Activate shield
            if (progress > 0.8) {
                if (shield) shield.classList.add('active');
            } else {
                if (shield) shield.classList.remove('active');
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video36',
        topic: 'Facebook biết bạn gặp ai?',
        episodeNum: 36,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video36 Plugin] Loaded: Facebook Proximity Tracking slides ready.');
})();
