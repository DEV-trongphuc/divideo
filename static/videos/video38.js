/**
 * Video 38: TikTok Storage System
 * Plugin file - chứa toàn bộ slide animation/HTML cho video38
 * Load động bởi app.js khi user chọn video38
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_v38_1: [
            { text: 'Hàng tỷ video', start: 0.5, end: 3.5, class: 'active-gold' },
            { text: 'lưu trữ', start: 3.5, end: 6.5, class: 'active-good' }
        ],
        slide_v38_2: [
            { text: 'hàng trăm giờ', start: 0.5, end: 6.0, class: 'active-gold' },
            { text: 'hàng nghìn Petabytes', start: 6.0, end: 12.0, class: 'active-bad' }
        ],
        slide_v38_3: [
            { text: 'CDN', start: 4.5, end: 9.5, class: 'active-good' },
            { text: 'máy chủ Edge', start: 9.5, end: 14.0, class: 'active-gold' }
        ],
        slide_v38_4: [
            { text: 'Hot Storage', start: 2.5, end: 8.0, class: 'active-good' },
            { text: 'Cold Storage', start: 8.0, end: 14.5, class: 'active-bad' }
        ],
        slide_v38_5: [
            { text: 'Transcoding', start: 2.0, end: 7.5, class: 'active-good' },
            { text: 'nhiều phiên bản', start: 7.5, end: 13.5, class: 'active-gold' }
        ],
        slide_v38_6: [
            { text: 'Object Storage', start: 0.5, end: 7.5, class: 'active-good' },
            { text: 'Cassandra', start: 7.5, end: 15.0, class: 'active-gold' }
        ]
    };


    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_v38_1', 'slide_v38_2', 'slide_v38_3', 'slide_v38_4', 'slide_v38_5', 'slide_v38_6'
    ];

    const tiktokLogoUrl = 'https://play-lh.googleusercontent.com/2o7iuqPe-0msP3DvNhzoOgNo4eZ6GkL_RtGVeKyBn5UBQAW5cw-GW5V3wDOHB1yTQuqWzrFLFOv2u4_5ea1uhg';

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_v38_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:20px; zoom:1.2; padding-top:5px; margin-top:-50px;">
                        <!-- TikTok Mockup Mobile -->
                        <div class="tiktok-phone-container tiktok-phone-floating" style="width:440px; height:710px; padding:20px 20px 15px 20px; display:flex; flex-direction:column; justify-content:space-between; position:relative; box-sizing:border-box;">
                            <!-- Header with Brand Icon -->
                            <div style="display:flex; justify-content:center; align-items:center; z-index:5; padding:5px 0;">
                                <img src="${tiktokLogoUrl}" alt="TikTok Logo" style="width:75px; height:75px; border-radius:16px; box-shadow: 0 4px 25px rgba(0,0,0,0.65);">
                            </div>

                            <!-- Screen Video Simulation -->
                            <div style="flex:1; margin:15px 0; border-radius:24px; border:1px solid rgba(255,255,255,0.06); background:#050508; position:relative; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                                <!-- Cyber grid -->
                                <div style="position:absolute; inset:0; background:linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 20px 20px;"></div>
                                
                                <!-- Cloud Node at Top -->
                                <div class="upload-target-cloud" style="position:absolute; top:35px; display:flex; flex-direction:column; align-items:center; gap:8px; z-index:4;">
                                    <span class="cloud-icon" style="font-size:75px; filter:drop-shadow(0 0 15px var(--tiktok-cyan)); transition: all 0.3s;">☁️</span>
                                    <span style="font-size:14px; color:var(--tiktok-cyan); font-family:monospace; text-transform:uppercase; letter-spacing:1.5px; font-weight:bold;">TikTok Storage</span>
                                </div>

                                <!-- Device Node at Bottom -->
                                <div class="upload-source-device" style="position:absolute; bottom:25px; display:flex; flex-direction:column; align-items:center; gap:6px; z-index:4;">
                                    <span style="font-size:52px; filter:drop-shadow(0 0 8px rgba(255,255,255,0.2));">📱</span>
                                    <span style="font-size:13px; color:rgba(255,255,255,0.4); font-family:monospace;">User Device</span>
                                </div>

                                <!-- Floating uploading video card -->
                                <div class="upload-video-card glass-card" style="position:absolute; width:270px; background:rgba(12,12,18,0.95); border:2.5px solid var(--tiktok-magenta); border-radius:18px; padding:15px; display:flex; flex-direction:column; gap:10px; box-shadow:0 10px 30px rgba(254,9,121,0.35); z-index:5; pointer-events:none; left:50%; transform:translate(-50%, -50%); transition: opacity 0.2s, transform 0.1s linear; top:70%; box-sizing:border-box;">
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <span style="font-size:38px; filter:drop-shadow(0 0 10px var(--tiktok-magenta));" class="upload-file-icon">🎬</span>
                                        <div style="text-align:left; flex:1; min-width:0;">
                                            <div style="font-size:15px; font-weight:bold; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:150px;">trending_video.mp4</div>
                                            <div style="font-size:12px; color:rgba(255,255,255,0.5);" class="upload-speed-val">Connecting...</div>
                                        </div>
                                    </div>
                                    <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                                        <div class="upload-progress-bar-val" style="width:0%; height:100%; background:linear-gradient(90deg, var(--tiktok-magenta), var(--tiktok-cyan)); transition:width 0.1s linear;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; font-family:monospace; color:rgba(255,255,255,0.6);">
                                        <span class="upload-pct-val">0%</span>
                                        <span class="upload-status-val">Uploading...</span>
                                    </div>
                                </div>

                                <!-- Upward stream lines in background -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                    <path class="flow-path-cyan" d="M 110 460 L 110 160" fill="none" stroke="var(--tiktok-cyan)" stroke-width="3" stroke-dasharray="10 8" style="opacity:0.35;" />
                                    <path class="flow-path-magenta" d="M 270 460 L 270 160" fill="none" stroke="var(--tiktok-magenta)" stroke-width="3" stroke-dasharray="10 8" style="opacity:0.35;" />
                                </svg>
                            </div>

                            <!-- Mobile Footer details -->
                            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:18px; padding:12px; text-align:center; z-index:5; backdrop-filter:blur(8px);">
                                <div style="font-size:16px; font-weight:bold; color:#fff;">Đang tải lên: @trending_video</div>
                                <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px;">Tốc độ cao • Không gián đoạn</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v38_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:25px; zoom:1.05; padding-top:50px;">
                        <!-- Left Panel: Scale Dashboard -->
                        <div class="glass-card tiktok-card" style="width:370px; height:560px; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#08080a; box-sizing:border-box;">
                            <div style="font-size:22px; font-weight:bold; color:var(--tiktok-cyan); border-bottom:1.5px solid rgba(0,242,254,0.15); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Thống kê tải lên (Upload Scale)</div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; gap:18px; justify-content:center; margin:15px 0;">
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:16px;">
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4);">Hoạt động hàng tháng</div>
                                    <div style="font-size:38px; font-weight:900; color:#fff; font-family:monospace;" class="val-active-users">0 tỷ User</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:16px;">
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4);">Tốc độ tải video mới</div>
                                    <div style="font-size:38px; font-weight:900; color:var(--tiktok-magenta); font-family:monospace;" class="val-upload-rate">0 giờ/phút</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:16px;">
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4);">Dung lượng ghi mới hàng ngày</div>
                                    <div style="font-size:38px; font-weight:900; color:var(--tiktok-cyan); font-family:monospace;" class="val-gb-rate">0 Petabytes</div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Data server racks -->
                        <div class="glass-card tiktok-card" style="width:370px; height:560px; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#08080a; box-sizing:border-box; position:relative; overflow:hidden;">
                            <!-- Scanner laser light line animation -->
                            <div class="rack-glow-scanner"></div>

                            <div style="font-size:22px; font-weight:bold; color:var(--tiktok-magenta); border-bottom:1.5px solid rgba(254,9,121,0.15); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Cụm máy chủ lưu trữ (Server Clusters)</div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; gap:14px; margin-top:20px;" class="server-rack-container">
                                <!-- Rack 1 -->
                                <div style="background:#111; border:1.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
                                    <span style="font-size:15px; font-family:monospace; color:#ccc;">DATACENTER_RACK_01</span>
                                    <div style="display:flex; gap:6px;">
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#ef4444; display:block;"></span>
                                    </div>
                                </div>
                                <!-- Rack 2 -->
                                <div style="background:#111; border:1.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
                                    <span style="font-size:15px; font-family:monospace; color:#ccc;">DATACENTER_RACK_02</span>
                                    <div style="display:flex; gap:6px;">
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#f59e0b; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                    </div>
                                </div>
                                <!-- Rack 3 -->
                                <div style="background:#111; border:1.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
                                    <span style="font-size:15px; font-family:monospace; color:#ccc;">DATACENTER_RACK_03</span>
                                    <div style="display:flex; gap:6px;">
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                    </div>
                                </div>
                                <!-- Rack 4 -->
                                <div style="background:#111; border:1.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
                                    <span style="font-size:15px; font-family:monospace; color:#ccc;">DATACENTER_RACK_04</span>
                                    <div style="display:flex; gap:6px;">
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#ef4444; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                        <span class="server-light" style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                    </div>
                                </div>
                            </div>

                            <div style="background:rgba(254,9,121,0.05); border:1px solid rgba(254,9,121,0.2); border-radius:16px; padding:15px; text-align:center; z-index:2;">
                                <div style="font-size:16px; color:#fff; font-weight:bold;">Sức tải tối đa thiết kế</div>
                                <div style="font-size:20px; color:var(--tiktok-magenta); font-weight:bold; margin-top:4px;">99.999% SLA Uptime</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v38_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:20px; zoom:1.15; padding-top:55px;">
                        <div class="glass-card tiktok-card" style="width:100%; max-width:820px; height:460px; border-radius:24px; padding:24px; background:#08080a; position:relative; overflow:hidden; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(0,242,254,0.15); padding-bottom:10px;">
                                <div style="font-size:22px; font-weight:bold; color:var(--tiktok-cyan); text-transform:uppercase; letter-spacing:0.5px;">Mạng phân phối nội dung (CDN Network)</div>
                                <div style="font-size:16px; font-weight:bold; color:#10b981; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:6px 14px; border-radius:10px;" class="cdn-latency-lbl">Độ trễ: 350ms</div>
                            </div>

                            <!-- Map Area -->
                            <div style="flex:1; height:340px; margin-top:20px; background:#040406; border-radius:16px; border:1px solid rgba(255,255,255,0.03); position:relative; overflow:hidden; display:flex; justify-content:center; align-items:center;">
                                <div style="width:750px; height:100%; position:relative;">
                                    
                                    <!-- CDN Waves -->
                                    <div class="cdn-wave-ring r1" style="left: 375px; top: 150px;"></div>
                                    
                                    <!-- SVG Connecting Lines -->
                                    <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                        <!-- Path Origin -> Edge -->
                                        <path class="cdn-line-1" d="M 80 150 L 375 150" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" stroke-dasharray="6 4" />
                                        <!-- Path Edge -> User -->
                                        <path class="cdn-line-2" d="M 375 150 L 670 150" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" stroke-dasharray="6 4" />
                                    </svg>

                                    <!-- Packets -->
                                    <div class="cdn-packet-1" style="position:absolute; width:16px; height:16px; border-radius:50%; background:var(--tiktok-magenta); box-shadow:0 0 15px var(--tiktok-magenta); left:80px; top:150px; transform:translate(-50%,-50%); opacity:0; z-index:5;"></div>
                                    <div class="cdn-packet-2" style="position:absolute; width:16px; height:16px; border-radius:50%; background:var(--tiktok-cyan); box-shadow:0 0 15px var(--tiktok-cyan); left:375px; top:150px; transform:translate(-50%,-50%); opacity:0; z-index:5;"></div>

                                    <!-- Nodes (Origin, Edge, User) with larger sizes -->
                                    <div class="cdn-node-origin" style="position:absolute; left:80px; top:150px; transform:translate(-50%,-50%); text-align:center; z-index:10;">
                                        <div style="width:80px; height:80px; border-radius:50%; background:#1a1a24; border:2px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:32px; box-shadow:0 4px 15px rgba(0,0,0,0.5);">🇺🇸</div>
                                        <span style="font-size:14px; font-weight:bold; color:rgba(255,255,255,0.4); display:block; margin-top:6px; width:120px; line-height:1.2;">Origin Server<br>(Mỹ)</span>
                                    </div>

                                    <div class="cdn-node-edge" style="position:absolute; left:375px; top:150px; transform:translate(-50%,-50%); text-align:center; z-index:10;">
                                        <div style="width:90px; height:90px; border-radius:50%; background:#1a1a24; border:2.5px solid var(--tiktok-cyan); display:flex; align-items:center; justify-content:center; font-size:36px; box-shadow:0 4px 15px rgba(0,0,0,0.5); transition:all 0.3s;" class="cdn-edge-globe">🇸🇬</div>
                                        <span style="font-size:14px; font-weight:bold; color:var(--tiktok-cyan); display:block; margin-top:6px; width:140px; line-height:1.2;">Edge CDN<br>(Singapore)</span>
                                    </div>

                                    <div class="cdn-node-user" style="position:absolute; left:670px; top:150px; transform:translate(-50%,-50%); text-align:center; z-index:10;">
                                        <div style="width:80px; height:80px; border-radius:50%; background:#1a1a24; border:2px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:32px; box-shadow:0 4px 15px rgba(0,0,0,0.5);">🇻🇳</div>
                                        <span style="font-size:14px; font-weight:bold; color:rgba(255,255,255,0.4); display:block; margin-top:6px; width:120px; line-height:1.2;">Bạn<br>(Việt Nam)</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v38_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:20px; zoom:1.15; padding-top:130px;">
                        <div style="display:flex; justify-content:space-between; width:100%; max-width:820px; gap:24px; position:relative; height:440px; box-sizing:border-box;">
                            
                            <!-- Moving Video element (initial position centered horizontally at left Hot Storage drive) -->
                            <div class="moving-video-card glass-card" style="position:absolute; width:130px; padding:10px; border-radius:14px; border:2px solid var(--tiktok-cyan); background:rgba(0,0,0,0.92); box-shadow:0 8px 30px rgba(0,242,254,0.35); z-index:100; text-align:center; left:16.5%; top:210px; transform:translate(-50%, -50%); transition: all 0.3s; box-sizing:border-box;">
                                <span style="font-size:36px; display:block; margin-bottom:4px;">🎥</span>
                                <div style="font-size:13px; font-weight:bold; color:#fff;" class="moving-video-title">Video của bạn</div>
                                <div style="font-size:11px; color:rgba(255,255,255,0.5); font-family:monospace; margin-top:2px;" class="moving-video-views">10M views</div>
                            </div>

                            <!-- Hot Storage (SSD) -->
                            <div class="glass-card storage-drive hot-drive" style="flex:1; border-radius:24px; padding:24px 15px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-sizing:border-box;">
                                <div>
                                    <div style="font-size:22px; font-weight:900; color:var(--tiktok-magenta); border-bottom:1.5px solid rgba(254,9,121,0.2); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Hot Storage</div>
                                    <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:6px;">Lưu trên NVMe SSD</div>
                                </div>
                                <div style="font-size:16px; color:#fff; display:flex; flex-direction:column; gap:10px;">
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">⚡ Tốc độ: 7000 MB/s</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">💰 Chi phí: Rất cao</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">📈 Ưu tiên: Rất cao</div>
                                </div>
                            </div>

                            <!-- Warm Storage (HDD RAID) -->
                            <div class="glass-card storage-drive warm-drive" style="flex:1; border-radius:24px; padding:24px 15px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-sizing:border-box;">
                                <div>
                                    <div style="font-size:22px; font-weight:900; color:#f59e0b; border-bottom:1.5px solid rgba(245,158,11,0.2); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Warm Storage</div>
                                    <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:6px;">Lưu trên HDD RAID</div>
                                </div>
                                <div style="font-size:16px; color:#fff; display:flex; flex-direction:column; gap:10px;">
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">⚡ Tốc độ: 250 MB/s</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">💰 Chi phí: Trung bình</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">📊 Ưu tiên: Trung bình</div>
                                </div>
                            </div>

                            <!-- Cold Storage (Tapes) -->
                            <div class="glass-card storage-drive cold-drive" style="flex:1; border-radius:24px; padding:24px 15px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-sizing:border-box;">
                                <div>
                                    <div style="font-size:22px; font-weight:900; color:#3b82f6; border-bottom:1.5px solid rgba(59,130,246,0.2); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Cold Storage</div>
                                    <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:6px;">Lưu trên Băng từ/HDD</div>
                                </div>
                                <div style="font-size:16px; color:#fff; display:flex; flex-direction:column; gap:10px;">
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">⚡ Tốc độ: 80 MB/s</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">💰 Chi phí: Rất rẻ</div>
                                    <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:12px;">📉 Ưu tiên: Thấp</div>
                                </div>
                            </div>

                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v38_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:20px; zoom:1.15; padding-top:55px;">
                        <div style="display:flex; flex-direction:column; width:100%; max-width:820px; gap:25px; align-items:center; box-sizing:border-box;">
                            
                            <!-- Top: Raw Video upload (horizontal style) -->
                            <div class="glass-card raw-video-card" style="width:680px; height:90px; border-radius:18px; border:2px solid rgba(255,255,255,0.08); padding:12px 24px; display:flex; align-items:center; gap:20px; background:#08080a; transition:all 0.3s; position:relative; box-sizing:border-box;">
                                <span style="font-size:42px;">📥</span>
                                <div style="text-align:left;">
                                    <div style="font-size:16px; font-weight:bold; color:#fff;">Video Gốc (Raw Input)</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px; font-family:monospace;">1080p (50MB)</div>
                                </div>
                            </div>

                            <!-- Middle: Transcode Engine (horizontal style) -->
                            <div class="glass-card transcode-engine" style="width:680px; height:95px; border-radius:18px; border:2.5px solid var(--tiktok-cyan); padding:12px 24px; display:flex; align-items:center; gap:20px; background:#08080a; position:relative; box-shadow:0 0 20px rgba(0,242,254,0.1); box-sizing:border-box;">
                                <i data-lucide="settings" style="width:46px; height:46px; color:var(--tiktok-cyan);" class="spinning-gear"></i>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:18px; font-weight:bold; color:var(--tiktok-cyan); text-transform:uppercase; letter-spacing:0.5px;">Transcoder</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px; font-family:monospace;" class="transcode-engine-status">Đang đợi file...</div>
                                </div>
                            </div>

                            <!-- Bottom: Transcoded Output List (vertical stack) -->
                            <div style="width:680px; display:flex; flex-direction:column; gap:16px; box-sizing:border-box;">
                                
                                <!-- Step 1: 1080p -->
                                <div class="transcode-step t1 glass-card" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; background:#08080a; box-sizing:border-box;">
                                    <div style="text-align:left;">
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">WiFi / High Quality</div>
                                        <div style="font-size:12px; color:rgba(255,255,255,0.4); font-family:monospace; margin-top:2px;">1080p - H.265 (8MB)</div>
                                    </div>
                                    <span style="font-size:16px;" class="transcode-status-t1">⏳</span>
                                </div>

                                <!-- Step 2: 720p -->
                                <div class="transcode-step t2 glass-card" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; background:#08080a; box-sizing:border-box;">
                                    <div style="text-align:left;">
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">4G / Medium Quality</div>
                                        <div style="font-size:12px; color:rgba(255,255,255,0.4); font-family:monospace; margin-top:2px;">720p - H.264 (3MB)</div>
                                    </div>
                                    <span style="font-size:16px;" class="transcode-status-t2">⏳</span>
                                </div>

                                <!-- Step 3: 480p -->
                                <div class="transcode-step t3 glass-card" style="border:1.5px solid rgba(255,255,255,0.06); border-radius:14px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; background:#08080a; box-sizing:border-box;">
                                    <div style="text-align:left;">
                                        <div style="font-size:14px; font-weight:bold; color:#fff;">3G / Low Quality</div>
                                        <div style="font-size:12px; color:rgba(255,255,255,0.4); font-family:monospace; margin-top:2px;">480p - H.264 (1MB)</div>
                                    </div>
                                    <span style="font-size:16px;" class="transcode-status-t3">⏳</span>
                                </div>

                            </div>

                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_v38_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:20px; zoom:1.15; padding-top:55px;">
                        <div style="position:relative; width:100%; max-width:860px; height:340px; display:flex; align-items:center; justify-content:space-between; box-sizing:border-box;">
                            <!-- Connection Line -->
                            <div style="position:absolute; left:20%; right:20%; top:50%; height:3px; background:repeating-linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 6px, transparent 6px, transparent 12px); transform:translateY(-50%); z-index:1;"></div>
                            
                            <!-- Left Target: Object Storage -->
                            <div class="glass-card obj-storage-card" style="width:300px; height:320px; border-radius:24px; border:2px solid rgba(255,255,255,0.06); padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#08080a; transition:all 0.3s; z-index:2; box-sizing:border-box;">
                                <div>
                                    <div style="font-size:24px; font-weight:900; color:var(--tiktok-cyan); border-bottom:1.5px solid rgba(0,242,254,0.15); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Object Storage</div>
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:6px;">Lưu file video thô</div>
                                </div>
                                <div style="display:flex; justify-content:center; align-items:center; background:rgba(0,242,254,0.02); border:1.5px dashed rgba(0,242,254,0.2); border-radius:16px; height:130px;" class="obj-storage-dropzone">
                                    <span style="font-size:54px;" class="obj-storage-icon">📦</span>
                                </div>
                                <div style="font-size:16px; color:#fff; font-weight:bold; font-family:monospace; text-align:center;" class="obj-storage-status">Amazon S3 / MinIO</div>
                            </div>
 
                            <!-- Right Target: Distributed Database -->
                            <div class="glass-card metadata-db-card" style="width:300px; height:320px; border-radius:24px; border:2px solid rgba(255,255,255,0.06); padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#08080a; transition:all 0.3s; z-index:2; box-sizing:border-box;">
                                <div>
                                    <div style="font-size:24px; font-weight:900; color:var(--tiktok-magenta); border-bottom:1.5px solid rgba(254,9,121,0.15); padding-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Metadata DB</div>
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:6px;">Lưu tương tác &amp; Hashtag</div>
                                </div>
                                <div style="display:flex; justify-content:center; align-items:center; background:rgba(254,9,121,0.02); border:1.5px dashed rgba(254,9,121,0.2); border-radius:16px; height:130px;" class="metadata-db-dropzone">
                                    <span style="font-size:54px;" class="metadata-db-icon">🗄️</span>
                                </div>
                                <div style="font-size:16px; color:#fff; font-weight:bold; font-family:monospace; text-align:center;" class="metadata-db-status">Cassandra / Redis</div>
                            </div>
 
                            <!-- Packets (absolute coordinates relative to the 860px parent) -->
                            <div class="split-packet-left" style="position:absolute; width:16px; height:16px; border-radius:50%; background:var(--tiktok-cyan); box-shadow:0 0 15px var(--tiktok-cyan); top:50%; transform:translate(-50%, -50%); opacity:0; z-index:3;"></div>
                            <div class="split-packet-right" style="position:absolute; width:16px; height:16px; border-radius:50%; background:var(--tiktok-magenta); box-shadow:0 0 15px var(--tiktok-magenta); top:50%; transform:translate(-50%, -50%); opacity:0; z-index:3;"></div>
 
                            <!-- Input Request Block (absolute coordinates relative to the 860px parent) -->
                            <div class="incoming-post-card glass-card" style="position:absolute; width:200px; padding:18px; border-radius:20px; border:2px solid rgba(255,255,255,0.15); background:#08080a; text-align:center; top:50%; transform:translate(-50%, -50%); transition: all 0.3s; z-index:100; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                                <div style="font-size:18px; font-weight:bold; color:#fff;">New Video Post</div>
                                <div style="font-size:14px; color:var(--tiktok-cyan); font-family:monospace; margin-top:4px;">MP4 + Likes/Meta</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_v38_1') {
            const phone = canvas.querySelector('.tiktok-phone-container');
            const card = canvas.querySelector('.upload-video-card');
            const pBar = canvas.querySelector('.upload-progress-bar-val');
            const pctText = canvas.querySelector('.upload-pct-val');
            const speedText = canvas.querySelector('.upload-speed-val');
            const statusText = canvas.querySelector('.upload-status-val');
            const cloudIcon = canvas.querySelector('.cloud-icon');
            const fileIcon = canvas.querySelector('.upload-file-icon');

            if (phone) {
                const borderHue = progress * 360;
                phone.style.borderColor = `hsla(${borderHue}, 80%, 60%, 0.35)`;
                phone.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.8), 
                                        -4px 0 20px rgba(0, 242, 254, ${0.15 + progress * 0.3}), 
                                        4px 0 20px rgba(254, 9, 121, ${0.15 + progress * 0.3})`;
            }

            if (progress < 0.8) {
                const ratio = progress / 0.8;
                const topPct = 70 - (70 - 30) * ratio; // goes from 70% to 30%
                const pct = Math.floor(ratio * 100);
                const speed = (18.5 + Math.sin(progress * 15) * 5).toFixed(1);

                if (card) {
                    card.style.top = `${topPct}%`;
                    card.style.borderColor = 'var(--tiktok-magenta)';
                    card.style.boxShadow = '0 10px 30px rgba(254,9,121,0.35)';
                    card.style.opacity = '1';
                    card.style.transform = 'translate(-50%, -50%) scale(1)';
                }
                if (pBar) pBar.style.width = `${pct}%`;
                if (pctText) pctText.textContent = `${pct}%`;
                if (speedText) speedText.textContent = `${speed} MB/s`;
                if (statusText) statusText.textContent = 'Uploading...';
                if (fileIcon) fileIcon.textContent = '🎬';
                if (cloudIcon) {
                    cloudIcon.style.transform = 'scale(1)';
                    cloudIcon.style.filter = 'drop-shadow(0 0 15px var(--tiktok-cyan))';
                }
            }
            else if (progress >= 0.8 && progress < 0.9) {
                // Success phase
                if (card) {
                    card.style.top = '30%';
                    card.style.borderColor = '#10b981'; // success green
                    card.style.boxShadow = '0 10px 30px rgba(16,185,129,0.5)';
                    card.style.opacity = '1';
                    card.style.transform = 'translate(-50%, -50%) scale(1.05)';
                }
                if (pBar) pBar.style.width = '100%';
                if (pctText) pctText.textContent = '100%';
                if (speedText) speedText.textContent = '0 MB/s';
                if (statusText) statusText.textContent = '✅ Success!';
                if (fileIcon) fileIcon.textContent = '✅';
                if (cloudIcon) {
                    cloudIcon.style.transform = 'scale(1.15)';
                    cloudIcon.style.filter = 'drop-shadow(0 0 25px #10b981)';
                }
            }
            else {
                // Fade out/merging phase (progress >= 0.9)
                const ratio = (progress - 0.9) / 0.1; // 0 to 1
                if (card) {
                    card.style.top = '30%';
                    card.style.opacity = (1 - ratio).toString();
                    card.style.transform = `translate(-50%, -50%) scale(${1.05 - ratio * 0.4})`;
                }
                if (cloudIcon) {
                    cloudIcon.style.transform = `scale(${1.15 - ratio * 0.15})`;
                    cloudIcon.style.filter = 'drop-shadow(0 0 15px var(--tiktok-cyan))';
                }
            }
        }
        else if (slideId === 'slide_v38_2') {
            const activeUsers = canvas.querySelector('.val-active-users');
            const uploadRate = canvas.querySelector('.val-upload-rate');
            const gbRate = canvas.querySelector('.val-gb-rate');
            const serverLights = canvas.querySelectorAll('.server-light');

            // Count-up calculations
            const userVal = (progress * 1.5).toFixed(1);
            const uploadVal = Math.floor(progress * 500);
            const gbVal = Math.floor(progress * 25);

            if (activeUsers) activeUsers.textContent = `${userVal} tỷ User`;
            if (uploadRate) uploadRate.textContent = `${uploadVal} giờ/phút`;
            if (gbRate) gbRate.textContent = `${gbVal} Petabytes`;

            // Blinking lights logic
            serverLights.forEach((light, index) => {
                const isBlinking = Math.sin(progress * 60 + index) > 0;
                light.style.opacity = isBlinking ? '1' : '0.2';
            });
        }
        else if (slideId === 'slide_v38_3') {
            const p1 = canvas.querySelector('.cdn-packet-1');
            const p2 = canvas.querySelector('.cdn-packet-2');
            const wave = canvas.querySelector('.cdn-wave-ring');
            const edgeGlobe = canvas.querySelector('.cdn-edge-globe');
            const latency = canvas.querySelector('.cdn-latency-lbl');

            // 0.0 -> 0.4: Packet travels Origin -> Edge CDN
            // 0.4 -> 0.6: Edge CDN ripples/caches
            // 0.6 -> 1.0: Packet travels CDN Edge -> Local User. Latency drops!
            
            if (progress < 0.4) {
                const ratio = progress / 0.4;
                const currentX = 80 + (375 - 80) * ratio;
                if (p1) { p1.style.left = `${currentX}px`; p1.style.opacity = '1'; }
                if (p2) p2.style.opacity = '0';
                if (wave) wave.classList.remove('animate');
                if (edgeGlobe) { edgeGlobe.style.borderColor = 'rgba(255,255,255,0.2)'; edgeGlobe.style.boxShadow = 'none'; }
                if (latency) { latency.textContent = 'Độ trễ: 350ms'; latency.style.color = '#ef4444'; }
            }
            else if (progress >= 0.4 && progress < 0.6) {
                if (p1) p1.style.opacity = '0';
                if (p2) p2.style.opacity = '0';
                if (wave) wave.classList.add('animate');
                if (edgeGlobe) { 
                    edgeGlobe.style.borderColor = 'var(--tiktok-cyan)'; 
                    edgeGlobe.style.boxShadow = '0 0 20px var(--tiktok-cyan)';
                }
                if (latency) { latency.textContent = 'Đang lưu cache...'; latency.style.color = '#f59e0b'; }
            }
            else {
                // progress >= 0.6
                if (p1) p1.style.opacity = '0';
                if (wave) wave.classList.remove('animate');
                if (edgeGlobe) { 
                    edgeGlobe.style.borderColor = 'var(--tiktok-cyan)'; 
                    edgeGlobe.style.boxShadow = '0 0 10px var(--tiktok-cyan)';
                }
                
                const ratio = (progress - 0.6) / 0.4; // 0 to 1
                const currentX = 375 + (670 - 375) * ratio;
                if (p2) { p2.style.left = `${currentX}px`; p2.style.opacity = '1'; }
                if (latency) { latency.textContent = 'Độ trễ: 15ms (Mượt)'; latency.style.color = '#10b981'; }
            }
        }
        else if (slideId === 'slide_v38_4') {
            const vCard = canvas.querySelector('.moving-video-card');
            const vViews = canvas.querySelector('.moving-video-views');
            const vTitle = canvas.querySelector('.moving-video-title');
            
            const hotCard = canvas.querySelector('.hot-drive');
            const warmCard = canvas.querySelector('.warm-drive');
            const coldCard = canvas.querySelector('.cold-drive');

            // 0.0 -> 0.3: Video lies in Hot storage, view count is 10M
            // 0.3 -> 0.6: Video moves to Warm storage, view count drops to 5K
            // 0.6 -> 1.0: Video moves to Cold storage, view count drops to 0
            
            if (progress < 0.3) {
                // Hot storage active
                if (vCard) { vCard.style.left = '16.5%'; vCard.style.top = '210px'; vCard.style.borderColor = 'var(--tiktok-magenta)'; }
                if (vViews) vViews.textContent = '10M views/hr';
                if (vTitle) vTitle.textContent = '🔥 Video Viral';
                if (hotCard) hotCard.classList.add('active');
                if (warmCard) warmCard.classList.remove('active');
                if (coldCard) coldCard.classList.remove('active');
            }
            else if (progress >= 0.3 && progress < 0.65) {
                // Move to Warm storage
                const ratio = (progress - 0.3) / 0.35; // 0 to 1
                const currentX = 16.5 + (50 - 16.5) * ratio;
                if (vCard) { vCard.style.left = `${currentX}%`; vCard.style.top = '210px'; vCard.style.borderColor = '#f59e0b'; }
                if (vViews) vViews.textContent = '100 views/day';
                if (vTitle) vTitle.textContent = '📂 Video Cũ';
                if (hotCard) hotCard.classList.remove('active');
                if (warmCard) warmCard.classList.add('active');
                if (coldCard) coldCard.classList.remove('active');
            }
            else {
                // Move to Cold storage
                const ratio = (progress - 0.65) / 0.35; // 0 to 1
                const currentX = 50 + (83.5 - 50) * ratio;
                if (vCard) { vCard.style.left = `${currentX}%`; vCard.style.top = '210px'; vCard.style.borderColor = '#3b82f6'; }
                if (vViews) vViews.textContent = '0 views/year';
                if (vTitle) vTitle.textContent = '❄️ Đóng Băng';
                if (hotCard) hotCard.classList.remove('active');
                if (warmCard) warmCard.classList.remove('active');
                if (coldCard) coldCard.classList.add('active');
            }
        }
        else if (slideId === 'slide_v38_5') {
            const rawCard = canvas.querySelector('.raw-video-card');
            const engine = canvas.querySelector('.transcode-engine');
            const engineStatus = canvas.querySelector('.transcode-engine-status');
            const gear = canvas.querySelector('.spinning-gear');

            const t1 = canvas.querySelector('.transcode-step.t1');
            const t2 = canvas.querySelector('.transcode-step.t2');
            const t3 = canvas.querySelector('.transcode-step.t3');

            const status1 = canvas.querySelector('.transcode-status-t1');
            const status2 = canvas.querySelector('.transcode-status-t2');
            const status3 = canvas.querySelector('.transcode-status-t3');

            // Timeline:
            // 0.0 -> 0.3: Video flows into engine. Engine loads.
            // 0.3 -> 0.5: Transcoding 1080p finishes.
            // 0.5 -> 0.7: Transcoding 720p finishes.
            // 0.7 -> 1.0: Transcoding 480p finishes. Done.
            
            if (progress < 0.3) {
                const ratio = progress / 0.3;
                if (rawCard) {
                    rawCard.style.transform = `translateY(${(ratio - 1) * 200}px)`;
                    rawCard.style.opacity = ratio.toString();
                }
                if (engineStatus) engineStatus.textContent = 'Đang nạp file...';
                if (gear) gear.style.animationPlayState = 'paused';
                
                if (t1) t1.classList.remove('active');
                if (t2) t2.classList.remove('active');
                if (t3) t3.classList.remove('active');
                if (status1) status1.textContent = '⏳';
                if (status2) status2.textContent = '⏳';
                if (status3) status3.textContent = '⏳';
            }
            else {
                if (rawCard) {
                    rawCard.style.transform = 'translateY(0)';
                    rawCard.style.opacity = '1';
                }
                if (gear) gear.style.animationPlayState = 'running';
                
                if (progress >= 0.3 && progress < 0.5) {
                    if (engineStatus) engineStatus.textContent = 'Đang render 1080p...';
                    if (t1) t1.classList.add('active');
                    if (status1) status1.textContent = '⚡ Đã xong';
                }
                else if (progress >= 0.5 && progress < 0.75) {
                    if (engineStatus) engineStatus.textContent = 'Đang render 720p...';
                    if (t1) t1.classList.add('active');
                    if (t2) t2.classList.add('active');
                    if (status1) status1.textContent = '⚡ Đã xong';
                    if (status2) status2.textContent = '⚡ Đã xong';
                }
                else {
                    // progress >= 0.75
                    if (engineStatus) engineStatus.textContent = 'Hoàn tất transcoding!';
                    if (t1) t1.classList.add('active');
                    if (t2) t2.classList.add('active');
                    if (t3) t3.classList.add('active');
                    if (status1) status1.textContent = '⚡ Đã xong';
                    if (status2) status2.textContent = '⚡ Đã xong';
                    if (status3) status3.textContent = '⚡ Đã xong';
                }
            }
        }
        else if (slideId === 'slide_v38_6') {
            const incoming = canvas.querySelector('.incoming-post-card');
            
            const spl = canvas.querySelector('.split-packet-left');
            const spr = canvas.querySelector('.split-packet-right');

            const objCard = canvas.querySelector('.obj-storage-card');
            const dbCard = canvas.querySelector('.metadata-db-card');

            const objStatus = canvas.querySelector('.obj-storage-status');
            const dbStatus = canvas.querySelector('.metadata-db-status');

            const objIcon = canvas.querySelector('.obj-storage-icon');
            const dbIcon = canvas.querySelector('.metadata-db-icon');

            // Timeline:
            // 0.0 -> 0.3: Post incoming card approaches center.
            // 0.3 -> 0.7: Packet split. Cyan flows left, Magenta flows right.
            // 0.7 -> 1.0: Nodes highlight, status changes to "Saved successfully".
            
            if (progress < 0.3) {
                const ratio = progress / 0.3;
                const currentPct = 10 + (50 - 10) * ratio; // Moves from 10% to 50%
                if (incoming) {
                    incoming.style.left = `${currentPct}%`;
                    incoming.style.top = '50%';
                    incoming.style.opacity = '1';
                }
                if (spl) spl.style.opacity = '0';
                if (spr) spr.style.opacity = '0';
                
                if (objCard) { objCard.style.borderColor = 'rgba(255,255,255,0.06)'; objCard.style.boxShadow = 'none'; }
                if (dbCard) { dbCard.style.borderColor = 'rgba(255,255,255,0.06)'; dbCard.style.boxShadow = 'none'; }
                if (objStatus) objStatus.textContent = 'Amazon S3 / MinIO';
                if (dbStatus) dbStatus.textContent = 'Cassandra / Redis';
                if (objIcon) objIcon.style.transform = 'scale(1)';
                if (dbIcon) dbIcon.style.transform = 'scale(1)';
            }
            else if (progress >= 0.3 && progress < 0.75) {
                if (incoming) incoming.style.opacity = '0';
                
                const ratio = (progress - 0.3) / 0.45; // 0 to 1
                const xLeftPct = 50 - (50 - 17.5) * ratio; // flows from 50% left to 17.5% center
                const xRightPct = 50 + (82.5 - 50) * ratio; // flows from 50% right to 82.5% center
                
                if (spl) { spl.style.left = `${xLeftPct}%`; spl.style.opacity = '1'; }
                if (spr) { spr.style.left = `${xRightPct}%`; spr.style.opacity = '1'; }
                
                if (objCard) { objCard.style.borderColor = 'rgba(255,255,255,0.06)'; objCard.style.boxShadow = 'none'; }
                if (dbCard) { dbCard.style.borderColor = 'rgba(255,255,255,0.06)'; dbCard.style.boxShadow = 'none'; }
                if (objStatus) objStatus.textContent = 'Đang nhận tệp thô...';
                if (dbStatus) dbStatus.textContent = 'Đang cập nhật DB...';
                if (objIcon) objIcon.style.transform = 'scale(1)';
                if (dbIcon) dbIcon.style.transform = 'scale(1)';
            }
            else {
                // progress >= 0.75
                if (incoming) incoming.style.opacity = '0';
                if (spl) spl.style.opacity = '0';
                if (spr) spr.style.opacity = '0';
                
                if (objCard) {
                    objCard.style.borderColor = 'var(--tiktok-cyan)';
                    objCard.style.boxShadow = '0 0 25px rgba(0, 242, 254, 0.25)';
                }
                if (dbCard) {
                    dbCard.style.borderColor = 'var(--tiktok-magenta)';
                    dbCard.style.boxShadow = '0 0 25px rgba(254, 9, 121, 0.25)';
                }
                
                if (objStatus) objStatus.textContent = '✅ Đã lưu Video File!';
                if (dbStatus) dbStatus.textContent = '✅ Đã lưu Metadata!';
                if (objIcon) objIcon.style.transform = 'scale(1.2)';
                if (dbIcon) dbIcon.style.transform = 'scale(1.2)';
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video38',
        topic: 'TikTok Storage System',
        episodeNum: 38,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video38 Plugin] Loaded: TikTok Storage System slides ready.');
})();
