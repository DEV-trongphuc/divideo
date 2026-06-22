/**
 * Video 28: Bloom Filter (Lá chắn tối ưu kiểm tra username trùng lặp)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video28
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_bloom_2: [
            { text: 'quá tải', start: 1.0, end: 9.0, class: 'active-bad' },
            { text: 'Disk I/O', start: 9.0, end: 18.0, class: 'active-bad' }
        ],
        slide_bloom_3: [
            { text: '15 Gigabytes RAM', start: 1.0, end: 10.0, class: 'active-bad' },
            { text: 'chi phí', start: 10.0, end: 18.0, class: 'active-gold' }
        ],
        slide_bloom_4: [
            { text: 'mảng bit', start: 1.0, end: 9.0, class: 'active-good' },
            { text: '600 Megabytes', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_bloom_5: [
            { text: 'hàm băm', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'ghi nhận', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_bloom_6: [
            { text: 'bằng 0', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'chắc chắn 100%', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_bloom_7: [
            { text: 'Dương tính giả', start: 1.0, end: 10.0, class: 'active-bad' },
            { text: 'trùng lặp', start: 10.0, end: 19.0, class: 'active-gold' }
        ],
        slide_bloom_8: [
            { text: 'không tồn tại', start: 1.0, end: 9.0, class: 'active-good' },
            { text: 'truy vấn', start: 9.0, end: 18.0, class: 'active-bad' }
        ],
        slide_bloom_9: [
            { text: 'lá chắn', start: 1.0, end: 9.0, class: 'active-good' },
            { text: '99%', start: 9.0, end: 18.0, class: 'active-good' }
        ],
        slide_bloom_10: [
            { text: 'hiệu năng', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'Turnio', start: 8.0, end: 18.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_bloom_1',
        'slide_bloom_2',
        'slide_bloom_3',
        'slide_bloom_4',
        'slide_bloom_5',
        'slide_bloom_6',
        'slide_bloom_7',
        'slide_bloom_8',
        'slide_bloom_9',
        'slide_bloom_10'
    ];

    // Helpers to render a bit array
    function renderBitArrayHTML(arrayId, length, highlightIndices = []) {
        return `
            <div class="v28-bit-array" id="${arrayId}">
                ${Array.from({ length }).map((_, i) => {
                    const isActive = highlightIndices.includes(i);
                    return `
                        <div class="v28-bit-slot">
                            <div class="v28-bit-node" id="${arrayId}-bit-${i}">0</div>
                            <span class="v28-bit-index">${i}</span>
                        </div>
                    `;
                }).join('')}
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

        if (slideId === 'slide_bloom_1') {
            canvas.innerHTML = `
                <div class="v28-zoom-container" style="justify-content: flex-start; padding-top: 15px; gap: 14px;">
                    <!-- Container for Phone Mockup and Flying Request Tags -->
                    <div style="position: relative; width: 100%; height: 380px; display: flex; justify-content: center; align-items: center; box-sizing: border-box; overflow: hidden; margin-top: 5px;">
                        
                        <!-- Flying Request Tags (Left side) with avatar circles -->
                        <div id="v28-req-tag-l1" class="v28-flying-card" style="position: absolute; left: 5px; top: 50px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#60a5fa;"></span> @alex
                        </div>
                        <div id="v28-req-tag-l2" class="v28-flying-card" style="position: absolute; left: 20px; top: 150px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#34d399;"></span> @bob
                        </div>
                        <div id="v28-req-tag-l3" class="v28-flying-card" style="position: absolute; left: 0px; top: 250px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#fbbf24;"></span> @charlie
                        </div>

                        <!-- Flying Request Tags (Right side) -->
                        <div id="v28-req-tag-r1" class="v28-flying-card" style="position: absolute; right: 5px; top: 60px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#f87171;"></span> @david
                        </div>
                        <div id="v28-req-tag-r2" class="v28-flying-card" style="position: absolute; right: 20px; top: 160px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#60a5fa;"></span> @emma
                        </div>
                        <div id="v28-req-tag-r3" class="v28-flying-card" style="position: absolute; right: 0px; top: 240px; opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#34d399;"></span> @fiona
                        </div>

                        <!-- Smartphone Mockup - Larger & High-fidelity -->
                        <div class="v28-phone-frame" style="width: 210px; height: 340px; position: relative; display: flex; flex-direction: column; padding: 10px; box-sizing: border-box; transition: all 0.3s; z-index: 2;">
                            <!-- Dynamic Island notch -->
                            <div style="width: 80px; height: 16px; background: #000; border-radius: 8px; margin: 0 auto 10px auto; display: flex; align-items: center; justify-content: space-between; padding: 0 8px; box-sizing: border-box; border: 1px solid rgba(255,255,255,0.06);">
                                <div style="width: 5px; height: 5px; border-radius: 50%; background: #1a202c;"></div>
                                <div style="width: 25px; height: 3px; background: rgba(255,255,255,0.15); border-radius: 1.5px;"></div>
                                <div style="width: 5px; height: 5px; border-radius: 50%; background: #0a101f;"></div>
                            </div>
                            
                            <!-- Phone Screen Area -->
                            <div style="flex: 1; border-radius: 20px; background: linear-gradient(135deg, rgba(14, 18, 30, 0.45) 0%, rgba(7, 9, 15, 0.45) 100%); display: flex; flex-direction: column; justify-content: space-between; padding: 12px; box-sizing: border-box; overflow: hidden; position: relative;">
                                
                                <!-- Glass Reflection Overlay -->
                                <div style="position: absolute; top: 0; left: 0; width: 200%; height: 200%; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%); transform: rotate(-25deg); pointer-events: none; z-index: 10;"></div>
                                
                                <!-- Screen Glow -->
                                <div id="v28-phone-screen-glow" style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%); pointer-events: none; transition: all 0.3s ease; z-index: 1;"></div>
                                
                                <!-- Mock Status Bar -->
                                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: rgba(255,255,255,0.45); font-weight: 600; z-index: 2; padding: 0 4px;">
                                    <span>09:41</span>
                                    <div style="display: flex; gap: 5px; align-items: center;">
                                        <i data-lucide="signal" style="width: 10px; height: 10px; opacity: 0.7;"></i>
                                        <i data-lucide="wifi" style="width: 10px; height: 10px; opacity: 0.7;"></i>
                                        <i data-lucide="battery" style="width: 12px; height: 12px; opacity: 0.7;"></i>
                                    </div>
                                </div>

                                <!-- Registration App Mockup Content -->
                                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; z-index: 2;">
                                    <!-- App Logo with elegant gradient and soft shadow -->
                                    <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, var(--bf-blue) 0%, #1e40af 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s ease; box-shadow: 0 6px 15px rgba(59,130,246,0.3);" id="v28-phone-app-logo">
                                        <i data-lucide="user-plus" style="width: 20px; height: 20px; color: #fff;"></i>
                                    </div>
                                    
                                    <!-- Username Form Fields -->
                                    <div style="display: flex; flex-direction: column; gap: 4px; text-align: left; margin-top: 4px;">
                                        <div style="font-size: 9px; color: rgba(255,255,255,0.4); font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Username</div>
                                        <div style="width: 100%; height: 32px; border-radius: 8px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; padding: 0 10px; box-sizing: border-box; transition: border-color 0.25s;">
                                            <span id="v28-phone-username-val" style="font-size: 12px; font-family: monospace; color: #fff; font-weight: bold; letter-spacing: 0.5px;"></span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Button & Stats -->
                                <div style="display: flex; flex-direction: column; gap: 8px; z-index: 2; margin-bottom: 4px;">
                                    <!-- Loading Status Indicator -->
                                    <div id="v28-phone-status" style="font-size: 10px; font-weight: 900; text-align: center; color: var(--bf-green); height: 16px; letter-spacing: 0.5px;"></div>
                                    
                                    <!-- App Register Button -->
                                    <div id="v28-phone-btn" style="width: 100%; height: 32px; border-radius: 8px; background: var(--bf-blue); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #0b0f19; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">
                                        Sign Up
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                    <!-- Scale Metrics Info overlay at bottom of slide -->
                    <div class="glass-card" style="padding: 12px 16px; border-radius: 18px; text-align: center; width: 100%;">
                        <div style="display: flex; justify-content: space-around; align-items: center; gap: 10px;">
                            <div>
                                <div style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Tổng người dùng</div>
                                <div style="font-size: 18px; font-weight: 900; color: #fff; margin-top: 1px;" id="v28-counter-total">500.000.000</div>
                            </div>
                            <div style="font-size: 20px; color: rgba(255,255,255,0.15); font-weight: 300;">|</div>
                            <div>
                                <div style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Đăng ký đồng thời</div>
                                <div style="font-size: 18px; font-weight: 900; color: var(--bf-orange); margin-top: 1px;" id="v28-counter-speed">+100.000 / s</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_2') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <!-- DB performance monitor layout -->
                    <div class="glass-card" style="padding:18px; border-radius:20px; width:100%; display:flex; flex-direction:column; gap:16px; position:relative; overflow:hidden;">
                        <!-- Sweep scanline overlay -->
                        <div class="v28-db-scanline"></div>

                        <!-- Header status -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <i data-lucide="database" style="width:20px; height:20px; color:#60a5fa;" id="v28-db-icon"></i>
                                <span style="font-weight:900; color:#fff; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Database Cluster</span>
                            </div>
                            <span style="font-size:11px; font-weight:800; color:#34d399; background:rgba(52,211,153,0.1); padding:2px 8px; border-radius:6px;" id="v28-db-status">ONLINE</span>
                        </div>
                        
                        <!-- Visual Row: Disk Cylinder + Gauges -->
                        <div style="display:flex; gap:20px; align-items:center; justify-content:space-between;">
                            <!-- Left: Disk Cylinder Visual with LEDs -->
                            <div style="display:flex; flex-direction:column; gap:6px; align-items:center; justify-content:center; width:80px; height:90px; position:relative; flex-shrink:0; background:rgba(0,0,0,0.25); border-radius:12px; padding:6px; border:1px solid rgba(255,255,255,0.05);">
                                <!-- Disk platter layers -->
                                <div id="v28-disk-p1" style="width:54px; height:15px; border-radius:50%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); transition:all 0.3s; position:relative; display:flex; align-items:center; justify-content:center;">
                                    <div style="width:16px; height:5px; border-radius:50%; background:rgba(255,255,255,0.1);"></div>
                                    <div style="position:absolute; top:2px; right:6px; width:4px; height:4px; border-radius:50%; background:#34d399; transition:background 0.15s;" class="v28-disk-led"></div>
                                </div>
                                <div id="v28-disk-p2" style="width:54px; height:15px; border-radius:50%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); transition:all 0.3s; position:relative; display:flex; align-items:center; justify-content:center;">
                                    <div style="width:16px; height:5px; border-radius:50%; background:rgba(255,255,255,0.1);"></div>
                                    <div style="position:absolute; top:2px; right:6px; width:4px; height:4px; border-radius:50%; background:#34d399; transition:background 0.15s;" class="v28-disk-led"></div>
                                </div>
                                <div id="v28-disk-p3" style="width:54px; height:15px; border-radius:50%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); transition:all 0.3s; position:relative; display:flex; align-items:center; justify-content:center;">
                                    <div style="width:16px; height:5px; border-radius:50%; background:rgba(255,255,255,0.1);"></div>
                                    <div style="position:absolute; top:2px; right:6px; width:4px; height:4px; border-radius:50%; background:#34d399; transition:background 0.15s;" class="v28-disk-led"></div>
                                </div>
                            </div>
                            
                            <!-- Right: Performance gauges -->
                            <div style="flex:1; display:flex; flex-direction:column; gap:10px; text-align:left;">
                                <!-- CPU Load bar -->
                                <div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; font-family:monospace; margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.555);">CPU LOAD:</span>
                                        <span id="v28-cpu-val" style="color:#34d399; font-weight:bold;">15%</span>
                                    </div>
                                    <div class="v28-ram-bar-outer" style="height:10px; margin:0;">
                                        <div class="v28-ram-bar-fill" id="v28-cpu-fill" style="width:15%; background:#34d399;"></div>
                                    </div>
                                </div>
                                
                                <!-- Latency meter -->
                                <div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; font-family:monospace; margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.555);">DISK LATENCY:</span>
                                        <span id="v28-latency-val" style="color:#34d399; font-weight:bold;">1.2 ms</span>
                                    </div>
                                    <div class="v28-ram-bar-outer" style="height:10px; margin:0;">
                                        <div class="v28-ram-bar-fill" id="v28-latency-fill" style="width:5%; background:#34d399;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Queue bottleneck lane -->
                        <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:12px; text-align:left;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:11px; font-weight:800; font-family:monospace;">
                                <span style="color:rgba(255,255,255,0.555);">QUEUE:</span>
                                <span id="v28-queue-val" style="color:#34d399; font-weight:bold;">0 Requests</span>
                            </div>
                            <!-- Request transit lane visual -->
                            <div style="width:100%; height:32px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); border-radius:8px; position:relative; overflow:hidden; display:flex; align-items:center; padding:0 8px; box-sizing:border-box;" id="v28-queue-lane">
                                <div style="display:flex; gap:6px; width:100%; height:100%; align-items:center; justify-content:flex-end;" id="v28-queue-pile">
                                    <!-- Dynamic queue items pile up here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alert overlay -->
                    <div class="glass-card v28-alert-card" id="v28-db-alert" style="padding:12px 16px; display:flex; align-items:center; justify-content:center; gap:10px; opacity:0; transform:translateY(12px); transition:all 0.3s; width: 100%;">
                        <i data-lucide="alert-octagon" style="width:20px; height:20px; color:#f87171; flex-shrink: 0;"></i>
                        <span style="font-size:12px; color:#f87171; font-weight:900; letter-spacing:0.5px; text-align:left;">🚨 NGHẼN DISK I/O: DATABASE QUÁ TẢI TRUY XUẤT</span>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_3') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <div class="glass-card" style="padding:20px; border-radius:20px; text-align:left; width: 100%;">
                        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:bold; color:rgba(255,255,255,0.5); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:16px; text-transform:uppercase; letter-spacing:0.8px;">
                            <i data-lucide="database" style="width:16px; height:16px; color:#ef4444;"></i> RAM Redis String Cache
                        </div>
                        
                        <div class="v28-ram-container">
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:13px; margin-bottom:4px;">
                                    <span style="color:rgba(255,255,255,0.5);">500M Username Thô:</span>
                                    <span style="color:#ef4444; font-weight:bold;" id="v28-ram-val-redis">0 GB / 15 GB</span>
                                </div>
                                <div class="v28-ram-bar-outer">
                                    <div class="v28-ram-bar-fill" id="v28-ram-bar-redis" style="background:#ef4444;"></div>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top:16px; border-top:1px solid rgba(255,255,255,0.08); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:12px; color:rgba(255,255,255,0.4);">Ước tính chi phí RAM máy chủ:</span>
                            <span style="font-size:15px; font-weight:900; color:#ef4444;">~$250 / Tháng</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_4') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <div class="glass-card" style="padding:18px; border-radius:20px; text-align:left; width: 100%;">
                        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:bold; color:rgba(255,255,255,0.5); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:14px; text-transform:uppercase; letter-spacing:0.8px;">
                            <i data-lucide="bar-chart-2" style="width:16px; height:16px; color:#10b981;"></i> Bộ Nhớ RAM Cần Thiết (So sánh)
                        </div>
                        
                        <div class="v28-ram-container" style="gap:14px;">
                            <!-- Redis bar -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:12px; margin-bottom:4px;">
                                    <span style="color:rgba(255,255,255,0.45);">Redis String Cache:</span>
                                    <span style="color:#ef4444; font-weight:bold;">15 GB</span>
                                </div>
                                <div class="v28-ram-bar-outer" style="height:14px;">
                                    <div class="v28-ram-bar-fill" style="width:100%; background:#ef4444;"></div>
                                </div>
                            </div>

                            <!-- Bloom Filter bar -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:12px; margin-bottom:4px;">
                                    <span style="color:#10b981; font-weight:bold;">Bloom Filter Array:</span>
                                    <span style="color:#10b981; font-weight:bold;" id="v28-ram-val-bf">0 MB / 600 MB</span>
                                </div>
                                <div class="v28-ram-bar-outer" style="height:14px;">
                                    <div class="v28-ram-bar-fill" id="v28-ram-bar-bf" style="background:#10b981;"></div>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top:14px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px; font-size:12px; color:#10b981; font-weight:bold; text-align:center; letter-spacing:0.5px;">
                            🔥 Tiết kiệm 96% dung lượng bộ nhớ RAM!
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_5') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <!-- Interactive simulation lane -->
                    <div class="glass-card" style="padding:18px; border-radius:20px; display:flex; flex-direction:column; align-items:center; gap:16px; width:100%;">
                        <div style="display:flex; align-items:center; gap:8px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.2); padding:6px 14px; border-radius:12px;">
                            <i data-lucide="user-plus" style="width:16px; height:16px; color:#3b82f6;"></i>
                            <span style="font-weight:bold; color:#fff; font-size:14px; font-family:monospace;">Đăng ký: "alex"</span>
                        </div>

                        <!-- Hash lane diagram: 3 distinct function nodes -->
                        <div class="v28-hash-container" style="gap:30px;">
                            <div class="v28-hash-node" id="v28-hash-h1">H1</div>
                            <div class="v28-hash-node" id="v28-hash-h2">H2</div>
                            <div class="v28-hash-node" id="v28-hash-h3">H3</div>
                        </div>

                        <!-- Bit Array -->
                        ${renderBitArrayHTML('v28-array-5', 12)}
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_6') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <!-- Section 1: Mock Registration Form -->
                    <div class="glass-card" style="padding: 16px; border-radius: 20px; width: 100%;">
                        <div class="v28-form-container">
                            <div class="v28-input-group">
                                <label class="v28-input-label">Username Check</label>
                                <div class="v28-input-wrapper">
                                    <i data-lucide="user" class="v28-input-icon"></i>
                                    <input type="text" id="v28-form-input-6" class="v28-input-field" placeholder="Nhập tên tài khoản..." readonly value="" />
                                </div>
                            </div>
                            <button id="v28-form-btn-6" class="v28-btn-submit state-default">
                                <span>Đăng ký</span>
                            </button>
                            <div id="v28-form-alert-6" class="v28-status-alert">
                                <span id="v28-alert-icon-6" style="margin-right: 4px; display: inline-flex; align-items: center;"></span>
                                <span id="v28-alert-text-6"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Compact Bit Array representing the Bloom Filter check -->
                    <div class="glass-card" style="padding: 12px; border-radius: 16px; width: 100%; border-color: rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px;">Bloom Filter (RAM 600MB)</span>
                            <span id="v28-hash-info-6" style="font-size: 10px; font-family: monospace; color: #3b82f6; font-weight: bold; opacity: 0; transition: opacity 0.3s;">Băm: 3, 5, 9</span>
                        </div>
                        <!-- Bit Array -->
                        ${renderBitArrayHTML('v28-array-6', 12, [2, 5, 8])}
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_7') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <!-- Section 1: Mock Registration Form -->
                    <div class="glass-card" style="padding: 16px; border-radius: 20px; width: 100%;">
                        <div class="v28-form-container">
                            <div class="v28-input-group">
                                <label class="v28-input-label">Username Check</label>
                                <div class="v28-input-wrapper">
                                    <i data-lucide="user" class="v28-input-icon"></i>
                                    <input type="text" id="v28-form-input-7" class="v28-input-field" placeholder="Nhập tên tài khoản..." readonly value="" />
                                </div>
                            </div>
                            <button id="v28-form-btn-7" class="v28-btn-submit state-default">
                                <span>Đăng ký</span>
                            </button>
                            <div id="v28-form-alert-7" class="v28-status-alert">
                                <span id="v28-alert-icon-7" style="margin-right: 4px; display: inline-flex; align-items: center;"></span>
                                <span id="v28-alert-text-7"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Compact Bit Array representing the Bloom Filter check -->
                    <div class="glass-card" style="padding: 12px; border-radius: 16px; width: 100%; border-color: rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px;">Bloom Filter (RAM 600MB)</span>
                            <span id="v28-hash-info-7" style="font-size: 10px; font-family: monospace; color: #ef4444; font-weight: bold; opacity: 0; transition: opacity 0.3s;">Băm: 2, 5, 8</span>
                        </div>
                        <!-- Bit Array -->
                        ${renderBitArrayHTML('v28-array-7', 12, [2, 5, 8])}
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_8') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%; box-sizing: border-box;">
                        
                        <!-- Case 1: KHÔNG -->
                        <div id="v28-rule-card-1" class="glass-card" style="padding: 16px; border-radius: 20px; border-color: rgba(16, 185, 129, 0.25); background: rgba(16, 185, 129, 0.02); display: flex; flex-direction: column; gap: 12px; text-align: left; transition: all 0.4s ease;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.3);">
                                    <i data-lucide="shield-check" style="width: 16px; height: 16px; color: #10b981;"></i>
                                </div>
                                <div style="font-size: 12px; font-weight: 900; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px;">Báo: KHÔNG</div>
                            </div>
                            
                            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
                                <div style="font-size: 15px; font-weight: 900; color: #fff; margin-bottom: 2px;">100% TRỐNG</div>
                            </div>
                            
                            <p style="font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; flex-grow: 1; margin: 0;">
                                Khẳng định chính xác 100% chưa tồn tại. Được tạo tài khoản ngay.
                            </p>
                            
                            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 8px; padding: 5px 8px; font-size: 9px; font-weight: 800; color: #10b981; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; margin-top: auto;">
                                ➔ KHÔNG GỌI DB
                            </div>
                        </div>

                        <!-- Case 2: CÓ -->
                        <div id="v28-rule-card-2" class="glass-card" style="padding: 16px; border-radius: 20px; border-color: rgba(245, 158, 11, 0.25); background: rgba(245, 158, 11, 0.02); display: flex; flex-direction: column; gap: 12px; text-align: left; transition: all 0.4s ease;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(245, 158, 11, 0.3);">
                                    <i data-lucide="shield-alert" style="width: 16px; height: 16px; color: #f59e0b;"></i>
                                </div>
                                <div style="font-size: 12px; font-weight: 900; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.5px;">Báo: CÓ</div>
                            </div>
                            
                            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
                                <div style="font-size: 15px; font-weight: 900; color: #fff; margin-bottom: 2px;">NGHI NGỜ TRÙNG</div>
                            </div>
                            
                            <p style="font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; flex-grow: 1; margin: 0;">
                                Có khả năng trùng băm (dương tính giả). Cần đối chiếu chính xác.
                            </p>
                            
                            <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.15); border-radius: 8px; padding: 5px 8px; font-size: 9px; font-weight: 800; color: #f59e0b; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; margin-top: auto;">
                                ➔ ĐỐI CHIẾU DB
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_9') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <div class="v28-flow-container">
                        <div class="v28-flow-node" id="v28-flow-client">
                            <i data-lucide="laptop" style="width:18px; height:18px; color:#3b82f6;"></i>
                            <span>1. Client Request</span>
                        </div>

                        <!-- Dot lane area with glow -->
                        <div style="flex:1; width:2px; background:rgba(255,255,255,0.08); position:relative; min-height:40px;">
                            <div id="v28-flow-dot" style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:8px; height:8px; border-radius:50%; background:#f59e0b; box-shadow:0 0 10px #f59e0b; opacity:0; transition:all 0.1s;"></div>
                        </div>

                        <div class="v28-flow-node" id="v28-flow-bf" style="border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.04);">
                            <i data-lucide="shield" style="width:18px; height:18px; color:#10b981;"></i>
                            <span>2. Bloom Filter (RAM 600MB)</span>
                        </div>

                        <div style="flex:1; width:2px; background:rgba(255,255,255,0.08); position:relative; min-height:40px;">
                            <div id="v28-flow-dot-db" style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:8px; height:8px; border-radius:50%; background:#ef4444; box-shadow:0 0 10px #ef4444; opacity:0; transition:all 0.1s;"></div>
                        </div>

                        <div class="v28-flow-node" id="v28-flow-db">
                            <i data-lucide="database" style="width:18px; height:18px; color:rgba(255,255,255,0.4);"></i>
                            <span>3. Database Server</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_10') {
            canvas.innerHTML = `
                <div class="v28-zoom-container">
                    <!-- CTA Card -->
                    <div class="glass-card v28-floating" style="padding:22px 20px; border-radius:24px; text-align:center; width:100%;">
                        <div style="margin-bottom:12px;">
                            <div style="margin:0 auto; width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, var(--bf-orange) 0%, #d97706 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 0 15px rgba(245,158,11,0.4);">
                                <i data-lucide="sparkles" style="width:24px; height:24px; color:#0b0f19;"></i>
                            </div>
                        </div>
                        
                        <div style="font-size:18px; font-weight:900; color:#fff; letter-spacing:0.8px; line-height:1.2;">
                            TURNIO.DEV
                        </div>
                        <div style="font-size:12px; color:#f59e0b; font-weight:bold; text-transform:uppercase; margin-top:2px; letter-spacing:1px;">
                            Thiết Kế Hệ Thống Thực Chiến
                        </div>

                        <div style="margin:14px 0; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); padding:8px 0; display:flex; justify-content:space-around; align-items:center;">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="heart" style="width:20px; height:20px; color:#ef4444;"></i>
                                <span style="font-size:10px; color:rgba(255,255,255,0.5); font-weight:bold;">Thích</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="message-square" style="width:20px; height:20px; color:#3b82f6;"></i>
                                <span style="font-size:10px; color:rgba(255,255,255,0.5); font-weight:bold;">Bình luận</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <i data-lucide="share-2" style="width:20px; height:20px; color:#10b981;"></i>
                                <span style="font-size:10px; color:rgba(255,255,255,0.5); font-weight:bold;">Chia sẻ</span>
                            </div>
                        </div>

                        <div style="font-size:12px; color:rgba(255,255,255,0.7); font-weight:500; line-height:1.4; padding:0 4px; letter-spacing:0.5px;">
                            Nhấn <span style="color:#f59e0b; font-weight:bold;">Follow</span> kênh ngay để không bỏ lỡ bài viết tiếp theo!
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
        if (slideId === 'slide_bloom_1') {
            const l1 = canvas.querySelector('#v28-req-tag-l1');
            const l2 = canvas.querySelector('#v28-req-tag-l2');
            const l3 = canvas.querySelector('#v28-req-tag-l3');
            const r1 = canvas.querySelector('#v28-req-tag-r1');
            const r2 = canvas.querySelector('#v28-req-tag-r2');
            const r3 = canvas.querySelector('#v28-req-tag-r3');

            const animateTag = (el, start, duration, dir, baseVal) => {
                if (!el) return;
                const t = (progress - start) / duration;
                if (t >= 0 && t <= 1) {
                    el.style.opacity = t < 0.3 ? (t * 3.3) : ((1 - t) * 1.4);
                    const pos = baseVal + t * 50;
                    if (dir === 'left') {
                        el.style.left = `${pos}px`;
                    } else {
                        el.style.right = `${pos}px`;
                    }
                } else {
                    el.style.opacity = '0';
                }
            };

            animateTag(l1, 0.0, 0.35, 'left', 5);
            animateTag(l2, 0.2, 0.35, 'left', 20);
            animateTag(l3, 0.4, 0.35, 'left', 0);

            animateTag(r1, 0.1, 0.35, 'right', 5);
            animateTag(r2, 0.3, 0.35, 'right', 20);
            animateTag(r3, 0.5, 0.35, 'right', 0);

            // Phone screen typing & status logic
            const usernameVal = canvas.querySelector('#v28-phone-username-val');
            const statusVal = canvas.querySelector('#v28-phone-status');
            const phoneBtn = canvas.querySelector('#v28-phone-btn');
            const screenGlow = canvas.querySelector('#v28-phone-screen-glow');

            let username = "";
            let statusText = "";
            let color = "var(--bf-blue)";
            let btnText = "Sign Up";

            if (progress < 0.2) {
                username = "alex";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
            } else if (progress < 0.4) {
                username = "bob";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
            } else if (progress < 0.6) {
                username = "charlie";
                statusText = "✗ TAKEN";
                color = "var(--bf-red)";
                btnText = "Taken";
            } else if (progress < 0.8) {
                username = "david";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
            } else {
                username = "emma";
                statusText = "✗ TAKEN";
                color = "var(--bf-red)";
                btnText = "Taken";
            }

            // Typing simulation calculation
            const subRange = 0.2;
            const subProgress = (progress % subRange) / subRange;
            const fullWord = username;
            const charsToShow = Math.floor(subProgress * 1.5 * fullWord.length);
            const partialWord = fullWord.substring(0, Math.min(fullWord.length, charsToShow));

            let cursor = "";
            if (charsToShow < fullWord.length) {
                cursor = Math.floor(Date.now() / 250) % 2 === 0 ? "|" : "";
            }

            if (usernameVal) usernameVal.textContent = partialWord + cursor;
            
            if (statusVal) {
                if (subProgress > 0.6) {
                    statusVal.textContent = statusText;
                    statusVal.style.color = color;
                } else {
                    statusVal.textContent = "Checking...";
                    statusVal.style.color = "var(--bf-blue)";
                }
            }

            if (phoneBtn) {
                if (subProgress > 0.6) {
                    phoneBtn.textContent = btnText;
                    phoneBtn.style.background = color;
                    phoneBtn.style.color = "#000";
                } else {
                    phoneBtn.textContent = "Checking...";
                    phoneBtn.style.background = "rgba(96,165,250,0.2)";
                    phoneBtn.style.color = "var(--bf-blue)";
                }
            }

            if (screenGlow) {
                if (subProgress > 0.6) {
                    screenGlow.style.background = `radial-gradient(circle, ${color}33 0%, transparent 70%)`;
                } else {
                    screenGlow.style.background = "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)";
                }
            }

            // Database metrics counter
            const totalCounter = canvas.querySelector('#v28-counter-total');
            const speedCounter = canvas.querySelector('#v28-counter-speed');

            const totalBase = 500000000;
            const totalClimb = Math.floor(progress * 124500);
            if (totalCounter) {
                totalCounter.textContent = (totalBase + totalClimb).toLocaleString('vi-VN');
            }

            if (speedCounter) {
                const pulse = 1 + Math.abs(Math.sin(progress * 30 * Math.PI)) * 0.05;
                speedCounter.style.transform = `scale(${pulse})`;
            }
        }
        else if (slideId === 'slide_bloom_2') {
            const cpuVal = canvas.querySelector('#v28-cpu-val');
            const cpuFill = canvas.querySelector('#v28-cpu-fill');
            const latencyVal = canvas.querySelector('#v28-latency-val');
            const latencyFill = canvas.querySelector('#v28-latency-fill');
            const queueVal = canvas.querySelector('#v28-queue-val');
            const queuePile = canvas.querySelector('#v28-queue-pile');
            const dbStatus = canvas.querySelector('#v28-db-status');
            const dbIcon = canvas.querySelector('#v28-db-icon');
            const alertBox = canvas.querySelector('#v28-db-alert');
            const scanline = canvas.querySelector('.v28-db-scanline');

            // Toggle scanning sweep
            if (scanline) {
                if (progress > 0.05 && progress < 0.9) {
                    scanline.classList.add('scanning');
                } else {
                    scanline.classList.remove('scanning');
                }
            }

            // 1. CPU Load climbs from 15% to 100%
            const cpu = Math.round(15 + progress * 85);
            if (cpuVal) cpuVal.textContent = `${cpu}%`;
            if (cpuFill) {
                cpuFill.style.width = `${cpu}%`;
                cpuFill.style.background = cpu > 80 ? 'var(--bf-red)' : (cpu > 45 ? 'var(--bf-orange)' : 'var(--bf-green)');
            }

            // 2. Latency climbs exponentially from 1.2ms to 320ms
            const latency = (1.2 + progress * progress * 318.8).toFixed(1);
            if (latencyVal) latencyVal.textContent = `${latency} ms`;
            if (latencyFill) {
                const latPercent = Math.min(100, (latency / 320) * 100);
                latencyFill.style.width = `${latPercent}%`;
                latencyFill.style.background = latency > 150 ? 'var(--bf-red)' : (latency > 20 ? 'var(--bf-orange)' : 'var(--bf-green)');
            }

            // 3. Queue count climbs from 0 to 50
            const queueCount = Math.round(progress * 50);
            if (queueVal) {
                if (queueCount > 40) {
                    queueVal.textContent = `QUÁ TẢI (${queueCount} requests)`;
                    queueVal.style.color = 'var(--bf-red)';
                } else if (queueCount > 15) {
                    queueVal.textContent = `Cảnh báo (${queueCount} requests)`;
                    queueVal.style.color = 'var(--bf-orange)';
                } else {
                    queueVal.textContent = `${queueCount} Requests`;
                    queueVal.style.color = 'var(--bf-green)';
                }
            }

            // 4. Populate queue visual blocks (pile up)
            if (queuePile) {
                const maxDots = 12;
                const numDots = Math.min(maxDots, Math.floor(progress * 15));
                let dotsHtml = "";
                for (let i = 0; i < numDots; i++) {
                    const dotColor = i < 4 ? 'var(--bf-green)' : (i < 8 ? 'var(--bf-orange)' : 'var(--bf-red)');
                    dotsHtml += `
                        <div style="width: 15px; height: 15px; border-radius: 4px; background: ${dotColor}; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 900; color: #000; box-shadow: 0 0 4px ${dotColor};">
                            R
                        </div>
                    `;
                }
                queuePile.innerHTML = dotsHtml;
            }

            // 5. Hard drive cylinder LEDs & Platter status
            const platters = ['#v28-disk-p1', '#v28-disk-p2', '#v28-disk-p3'];
            platters.forEach(id => {
                const platter = canvas.querySelector(id);
                if (platter) {
                    const led = platter.querySelector('.v28-disk-led');
                    if (progress >= 0.7) {
                        platter.style.borderColor = 'var(--bf-red)';
                        platter.style.background = 'rgba(248, 113, 113, 0.15)';
                        if (led) led.style.background = 'var(--bf-red)';
                    } else if (progress >= 0.4) {
                        platter.style.borderColor = 'var(--bf-orange)';
                        platter.style.background = 'rgba(251, 191, 36, 0.08)';
                        if (led) {
                            const isLit = Math.floor(Date.now() / 150) % 2 === 0;
                            led.style.background = isLit ? 'var(--bf-orange)' : 'transparent';
                        }
                    } else {
                        platter.style.borderColor = 'rgba(255,255,255,0.2)';
                        platter.style.background = 'rgba(255,255,255,0.05)';
                        if (led) {
                            const isLit = Math.floor(Date.now() / 400) % 2 === 0;
                            led.style.background = isLit ? 'var(--bf-green)' : 'transparent';
                        }
                    }
                }
            });

            // 6. DB status text & icon
            if (dbStatus) {
                if (progress >= 0.7) {
                    dbStatus.textContent = "CRASHED";
                    dbStatus.style.color = "var(--bf-red)";
                    dbStatus.style.background = "rgba(248, 113, 113, 0.15)";
                    if (dbIcon) dbIcon.style.color = "var(--bf-red)";
                } else if (progress >= 0.4) {
                    dbStatus.textContent = "OVERLOADED";
                    dbStatus.style.color = "var(--bf-orange)";
                    dbStatus.style.background = "rgba(251, 191, 36, 0.1)";
                    if (dbIcon) dbIcon.style.color = "var(--bf-orange)";
                } else {
                    dbStatus.textContent = "ONLINE";
                    dbStatus.style.color = "var(--bf-green)";
                    dbStatus.style.background = "rgba(52, 211, 153, 0.1)";
                    if (dbIcon) dbIcon.style.color = "var(--bf-blue)";
                }
            }

            // 7. Alert overlay
            if (progress >= 0.7 && alertBox) {
                alertBox.style.opacity = '1';
                alertBox.style.transform = 'translateY(0)';
            } else if (alertBox) {
                alertBox.style.opacity = '0';
                alertBox.style.transform = 'translateY(12px)';
            }
        }
        else if (slideId === 'slide_bloom_3') {
            const ramVal = canvas.querySelector('#v28-ram-val-redis');
            const ramBar = canvas.querySelector('#v28-ram-bar-redis');

            const currentGB = (progress * 15.0).toFixed(1);
            if (ramVal) ramVal.textContent = `${currentGB} GB / 15 GB`;
            if (ramBar) ramBar.style.width = `${progress * 100}%`;
        }
        else if (slideId === 'slide_bloom_4') {
            const ramVal = canvas.querySelector('#v28-ram-val-bf');
            const ramBar = canvas.querySelector('#v28-ram-bar-bf');

            const currentMB = Math.round(progress * 600);
            if (ramVal) ramVal.textContent = `${currentMB} MB / 600 MB`;
            if (ramBar) ramBar.style.width = `${progress * 100}%`;
        }
        else if (slideId === 'slide_bloom_5') {
            const array = canvas.querySelector('#v28-array-5');
            const h1 = canvas.querySelector('#v28-hash-h1');
            const h2 = canvas.querySelector('#v28-hash-h2');
            const h3 = canvas.querySelector('#v28-hash-h3');

            if (array) {
                // Initialize default state
                for (let i = 0; i < 12; i++) {
                    const node = array.querySelector(`#v28-array-5-bit-${i}`);
                    if (node) {
                        node.textContent = '0';
                        node.className = 'v28-bit-node';
                    }
                }
                
                if (h1) h1.classList.remove('active');
                if (h2) h2.classList.remove('active');
                if (h3) h3.classList.remove('active');

                // Flip bit 2 at progress >= 0.3
                if (progress >= 0.3) {
                    if (h1) h1.classList.add('active');
                    const node2 = array.querySelector('#v28-array-5-bit-2');
                    if (node2) {
                        node2.textContent = '1';
                        node2.className = 'v28-bit-node active-good';
                    }
                }
                // Flip bit 5 at progress >= 0.55
                if (progress >= 0.55) {
                    if (h2) h2.classList.add('active');
                    const node5 = array.querySelector('#v28-array-5-bit-5');
                    if (node5) {
                        node5.textContent = '1';
                        node5.className = 'v28-bit-node active-good';
                    }
                }
                // Flip bit 8 at progress >= 0.8
                if (progress >= 0.8) {
                    if (h3) h3.classList.add('active');
                    const node8 = array.querySelector('#v28-array-5-bit-8');
                    if (node8) {
                        node8.textContent = '1';
                        node8.className = 'v28-bit-node active-good';
                    }
                }
            }
        }
        else if (slideId === 'slide_bloom_6') {
            const array = canvas.querySelector('#v28-array-6');
            const inputField = canvas.querySelector('#v28-form-input-6');
            const submitBtn = canvas.querySelector('#v28-form-btn-6');
            const alertBox = canvas.querySelector('#v28-form-alert-6');
            const alertIcon = canvas.querySelector('#v28-alert-icon-6');
            const alertText = canvas.querySelector('#v28-alert-text-6');
            const hashInfo = canvas.querySelector('#v28-hash-info-6');

            // 1. Typing animation (progress 0.0 -> 0.3)
            let typedText = "";
            if (progress < 0.1) {
                typedText = "";
            } else if (progress < 0.2) {
                typedText = "b";
            } else if (progress < 0.3) {
                typedText = "bo";
            } else {
                typedText = "bob";
            }
            if (inputField) {
                inputField.value = typedText;
                if (progress < 0.3) {
                    inputField.classList.add('focused');
                } else {
                    inputField.classList.remove('focused');
                }
            }

            // 2. Submit Button state & Loading spinner (progress 0.3 -> 0.6)
            if (submitBtn) {
                if (progress < 0.3) {
                    submitBtn.className = "v28-btn-submit state-default";
                    submitBtn.innerHTML = "<span>Đăng ký</span>";
                } else if (progress < 0.6) {
                    submitBtn.className = "v28-btn-submit state-loading";
                    submitBtn.innerHTML = '<div class="v28-spinner"></div><span>Đang kiểm tra...</span>';
                } else {
                    submitBtn.className = "v28-btn-submit state-success";
                    submitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Đăng ký thành công</span>';
                }
            }

            // 3. Bloom filter bit array visualization (progress >= 0.45 checks bits)
            if (array) {
                const presetIndices = [2, 5, 8];
                for (let i = 0; i < 12; i++) {
                    const node = array.querySelector(`#v28-array-6-bit-${i}`);
                    if (node) {
                        if (presetIndices.includes(i)) {
                            node.textContent = '1';
                            node.className = 'v28-bit-node active-good';
                            node.style.borderColor = '';
                            node.style.transform = '';
                        } else {
                            node.textContent = '0';
                            node.className = 'v28-bit-node';
                            node.style.borderColor = '';
                            node.style.transform = '';
                        }
                    }
                }

                if (progress >= 0.4) {
                    if (hashInfo) hashInfo.style.opacity = '1';
                    
                    if (progress >= 0.5) {
                        const node3 = array.querySelector('#v28-array-6-bit-3');
                        if (node3) {
                            node3.className = 'v28-bit-node active-bad';
                            node3.style.transform = 'scale(1.25)';
                        }
                        const node5 = array.querySelector('#v28-array-6-bit-5');
                        if (node5) {
                            node5.style.borderColor = 'var(--bf-blue)';
                            node5.style.transform = 'scale(1.25)';
                        }
                        const node9 = array.querySelector('#v28-array-6-bit-9');
                        if (node9) {
                            node9.style.borderColor = 'var(--bf-blue)';
                            node9.style.transform = 'scale(1.25)';
                        }
                    }
                } else {
                    if (hashInfo) hashInfo.style.opacity = '0';
                }
            }

            // 4. Alert status box (progress >= 0.6)
            if (alertBox) {
                if (progress >= 0.6) {
                    alertBox.className = "v28-status-alert alert-success show";
                    if (alertIcon) {
                        alertIcon.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    }
                    if (alertText) {
                        alertText.textContent = "Tên tài khoản khả dụng!";
                    }
                } else {
                    alertBox.className = "v28-status-alert";
                    if (alertText) alertText.textContent = "";
                    if (alertIcon) alertIcon.innerHTML = "";
                }
            }
        }
        else if (slideId === 'slide_bloom_7') {
            const array = canvas.querySelector('#v28-array-7');
            const inputField = canvas.querySelector('#v28-form-input-7');
            const submitBtn = canvas.querySelector('#v28-form-btn-7');
            const alertBox = canvas.querySelector('#v28-form-alert-7');
            const alertIcon = canvas.querySelector('#v28-alert-icon-7');
            const alertText = canvas.querySelector('#v28-alert-text-7');
            const hashInfo = canvas.querySelector('#v28-hash-info-7');

            // 1. Typing animation (progress 0.0 -> 0.3)
            let typedText = "";
            if (progress < 0.05) {
                typedText = "";
            } else if (progress < 0.09) {
                typedText = "c";
            } else if (progress < 0.13) {
                typedText = "ch";
            } else if (progress < 0.17) {
                typedText = "cha";
            } else if (progress < 0.21) {
                typedText = "char";
            } else if (progress < 0.24) {
                typedText = "charl";
            } else if (progress < 0.27) {
                typedText = "charli";
            } else {
                typedText = "charlie";
            }
            if (inputField) {
                inputField.value = typedText;
                if (progress < 0.3) {
                    inputField.classList.add('focused');
                } else {
                    inputField.classList.remove('focused');
                }
            }

            // 2. Submit Button state & Loading spinner (progress 0.3 -> 0.6)
            if (submitBtn) {
                if (progress < 0.3) {
                    submitBtn.className = "v28-btn-submit state-default";
                    submitBtn.innerHTML = "<span>Đăng ký</span>";
                } else if (progress < 0.6) {
                    submitBtn.className = "v28-btn-submit state-loading";
                    submitBtn.innerHTML = '<div class="v28-spinner"></div><span>Đang kiểm tra...</span>';
                } else {
                    submitBtn.className = "v28-btn-submit state-error";
                    submitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg><span>Tên đã tồn tại</span>';
                }
            }

            // 3. Bloom filter bit array visualization (progress >= 0.45 checks bits)
            if (array) {
                const presetIndices = [2, 5, 8];
                for (let i = 0; i < 12; i++) {
                    const node = array.querySelector(`#v28-array-7-bit-${i}`);
                    if (node) {
                        if (presetIndices.includes(i)) {
                            node.textContent = '1';
                            node.className = 'v28-bit-node active-good';
                            node.style.borderColor = '';
                            node.style.transform = '';
                        } else {
                            node.textContent = '0';
                            node.className = 'v28-bit-node';
                            node.style.borderColor = '';
                            node.style.transform = '';
                        }
                    }
                }

                if (progress >= 0.4) {
                    if (hashInfo) hashInfo.style.opacity = '1';
                    
                    if (progress >= 0.5) {
                        presetIndices.forEach(idx => {
                            const node = array.querySelector(`#v28-array-7-bit-${idx}`);
                            if (node) {
                                node.className = 'v28-bit-node active-good';
                                node.style.borderColor = 'var(--bf-red)';
                                node.style.transform = 'scale(1.25)';
                            }
                        });
                    }
                } else {
                    if (hashInfo) hashInfo.style.opacity = '0';
                }
            }

            // 4. Alert status box (progress >= 0.6)
            if (alertBox) {
                if (progress >= 0.6) {
                    alertBox.className = "v28-status-alert alert-error show";
                    if (alertIcon) {
                        alertIcon.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
                    }
                    if (alertText) {
                        alertText.textContent = "Tên tài khoản đã tồn tại!";
                    }
                } else {
                    alertBox.className = "v28-status-alert";
                    if (alertText) alertText.textContent = "";
                    if (alertIcon) alertIcon.innerHTML = "";
                }
            }
        }
        else if (slideId === 'slide_bloom_8') {
            const card1 = canvas.querySelector('#v28-rule-card-1');
            const card2 = canvas.querySelector('#v28-rule-card-2');
            if (card1 && card2) {
                if (progress < 0.4) {
                    card1.style.opacity = '1';
                    card1.style.transform = 'scale(1.02)';
                    card1.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                    card1.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.15)';
                    
                    card2.style.opacity = '0.4';
                    card2.style.transform = 'scale(0.98)';
                    card2.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    card2.style.boxShadow = 'none';
                } else if (progress >= 0.4 && progress < 0.7) {
                    card1.style.opacity = '0.4';
                    card1.style.transform = 'scale(0.98)';
                    card1.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    card1.style.boxShadow = 'none';
                    
                    card2.style.opacity = '1';
                    card2.style.transform = 'scale(1.02)';
                    card2.style.borderColor = 'rgba(245, 158, 11, 0.8)';
                    card2.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.15)';
                } else {
                    card1.style.opacity = '1';
                    card1.style.transform = 'scale(1)';
                    card1.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    card1.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                    
                    card2.style.opacity = '1';
                    card2.style.transform = 'scale(1)';
                    card2.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                    card2.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }
            }
        }
        else if (slideId === 'slide_bloom_9') {
            const dot = canvas.querySelector('#v28-flow-dot');
            const dotDb = canvas.querySelector('#v28-flow-dot-db');
            const nodeBf = canvas.querySelector('#v28-flow-bf');
            const nodeDb = canvas.querySelector('#v28-flow-db');

            if (dot && dotDb) {
                nodeBf.style.borderColor = 'rgba(255,255,255,0.08)';
                nodeDb.style.borderColor = 'rgba(255,255,255,0.08)';

                if (progress < 0.4) {
                    const r = progress / 0.4;
                    dot.style.opacity = '1';
                    dot.style.top = `${r * 100}%`;
                    dotDb.style.opacity = '0';
                } else if (progress >= 0.4 && progress < 0.6) {
                    dot.style.opacity = '0';
                    dot.style.top = '100%';
                    nodeBf.style.borderColor = '#10b981';
                    nodeBf.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
                    dotDb.style.opacity = '0';
                } else if (progress >= 0.6 && progress < 0.9) {
                    const r = (progress - 0.6) / 0.3;
                    dotDb.style.opacity = '1';
                    dotDb.style.top = `${r * 100}%`;
                } else {
                    dotDb.style.opacity = '0';
                    dotDb.style.top = '100%';
                    nodeDb.style.borderColor = '#ef4444';
                    nodeDb.style.boxShadow = '0 0 20px rgba(239,68,68,0.3)';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video28',
        topic: 'Bloom Filter Space-Efficient Check Mechanics',
        episodeNum: 28,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video28 Plugin] Loaded: BLOOM FILTER premium 10 slides ready.');
})();
