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
            { text: 'tối ưu', start: 8.0, end: 18.0, class: 'active-gold' }
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
                <div class="v28-zoom-container" style="justify-content: flex-start; padding-top: 10px; gap: 14px; zoom: 1.25; overflow: visible !important;">
                    <!-- Container for Phone Mockup and Flying Request Tags -->
                    <div style="position: relative; width: 100%; height: 440px; display: flex; justify-content: center; align-items: center; box-sizing: border-box; margin-top: -30px;">
                        
                        <!-- Flying Request Tags (Left side) with avatar circles -->
                        <div id="v28-req-tag-l1" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#60a5fa; color:#60a5fa;"></span> @alex
                        </div>
                        <div id="v28-req-tag-l2" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#34d399; color:#34d399;"></span> @bob
                        </div>
                        <div id="v28-req-tag-l3" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#fbbf24; color:#fbbf24;"></span> @charlie
                        </div>
                        <div id="v28-req-tag-l4" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#8b5cf6; color:#8b5cf6;"></span> @lucas
                        </div>

                        <!-- Flying Request Tags (Right side) -->
                        <div id="v28-req-tag-r1" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#f87171; color:#f87171;"></span> @david
                        </div>
                        <div id="v28-req-tag-r2" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#60a5fa; color:#60a5fa;"></span> @emma
                        </div>
                        <div id="v28-req-tag-r3" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#34d399; color:#34d399;"></span> @fiona
                        </div>
                        <div id="v28-req-tag-r4" class="v28-flying-card" style="opacity: 0;">
                            <span class="v28-flying-avatar-circle" style="background:#f97316; color:#f97316;"></span> @henry
                        </div>

                        <!-- Smartphone Mockup - Larger & High-fidelity -->
                        <div class="v28-phone-frame" id="v28-phone">
                            <div class="v28-phone-ripple" id="v28-phone-ripple"></div>
                            
                            <!-- Phone Screen Area -->
                            <div style="flex: 1; border-radius: 24px; background: linear-gradient(135deg, rgba(14, 18, 30, 0.45) 0%, rgba(7, 9, 15, 0.45) 100%); display: flex; flex-direction: column; justify-content: space-between; padding: 16px; box-sizing: border-box; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.04);">
                                
                                <!-- Glass Reflection Overlay -->
                                <div style="position: absolute; top: 0; left: 0; width: 200%; height: 200%; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%); transform: rotate(-25deg); pointer-events: none; z-index: 10;"></div>
                                
                                <!-- Screen Glow -->
                                <div id="v28-phone-screen-glow" style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%); pointer-events: none; transition: all 0.3s ease; z-index: 1;"></div>
                                
                                <!-- Dynamic Island notch -->
                                <div style="width: 100px; height: 20px; background: #000; border-radius: 10px; margin: 0 auto 10px auto; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; box-sizing: border-box; border: 1px solid rgba(255,255,255,0.06); z-index: 11; position: relative;">
                                    <div style="width: 6px; height: 6px; border-radius: 50%; background: #1a202c;"></div>
                                    <div style="width: 32px; height: 3px; background: rgba(255,255,255,0.15); border-radius: 1.5px;"></div>
                                    <div style="width: 6px; height: 6px; border-radius: 50%; background: #0a101f;"></div>
                                </div>

                                <!-- Mock Status Bar -->
                                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 600; z-index: 2; padding: 0 4px;">
                                    <span>09:41</span>
                                    <div style="display: flex; gap: 5px; align-items: center;">
                                        <i data-lucide="signal" style="width: 12px; height: 12px; opacity: 0.7;"></i>
                                        <i data-lucide="wifi" style="width: 12px; height: 12px; opacity: 0.7;"></i>
                                        <i data-lucide="battery" style="width: 14px; height: 14px; opacity: 0.7;"></i>
                                    </div>
                                </div>

                                <!-- Registration App Mockup Content -->
                                <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 15px; z-index: 2;">
                                    <!-- App Logo with elegant gradient and soft shadow -->
                                    <div style="width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--bf-blue) 0%, #1e40af 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s ease; box-shadow: 0 6px 15px rgba(59,130,246,0.3);" id="v28-phone-app-logo">
                                        <i data-lucide="user-plus" style="width: 24px; height: 24px; color: #fff;"></i>
                                    </div>
                                    
                                    <!-- Username Form Fields -->
                                    <div style="display: flex; flex-direction: column; gap: 6px; text-align: left; margin-top: 4px;">
                                        <div style="font-size: 10px; color: rgba(255,255,255,0.4); font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Username</div>
                                        <div style="width: 100%; height: 38px; border-radius: 10px; background: rgba(0,0,0,0.5); border: 1.5px solid rgba(255,255,255,0.1); display: flex; align-items: center; padding: 0 12px; box-sizing: border-box; transition: all 0.25s;" id="v28-phone-input-container">
                                            <span id="v28-phone-username-val" style="font-size: 14px; font-family: monospace; color: #fff; font-weight: bold; letter-spacing: 0.5px;"></span>
                                            <span class="v28-typing-cursor" id="v28-cursor"></span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Button & Stats -->
                                <div style="display: flex; flex-direction: column; gap: 10px; z-index: 2; margin-bottom: 4px;">
                                    <!-- Loading Status Indicator -->
                                    <div id="v28-phone-status" style="font-size: 12px; font-weight: 900; text-align: center; color: var(--bf-green); height: 20px; letter-spacing: 0.5px;"></div>
                                    
                                    <!-- App Register Button -->
                                    <div id="v28-phone-btn" style="width: 100%; height: 38px; border-radius: 10px; background: var(--bf-blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #0b0f19; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">
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
                <div class="v28-zoom-container" style="zoom: 1.35; gap: 10px; padding: 8px; flex-direction: row; align-items: stretch; justify-content: space-between; width: 100%;">
                    <!-- Left Column: Data Flow System -->
                    <div style="width: 58%; display: flex; flex-direction: column; gap: 8px;">
                        <!-- Query Pipeline Card -->
                        <div class="glass-card" style="padding: 10px; border-radius: 14px; display: flex; flex-direction: column; gap: 8px; border: 1px solid rgba(255,255,255,0.08); background: rgba(10,15,30,0.6); position: relative; overflow: hidden; flex: 1;">
                            <!-- Sweep scanline overlay -->
                            <div class="v28-db-scanline"></div>
                            
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px;">
                                <span style="font-size:9.5px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:0.3px;">Query Pipeline</span>
                                <span id="v28-queue-val" style="font-size:8.5px; font-weight:900; color:#34d399; font-family:monospace;">0 reqs</span>
                            </div>

                            <!-- Laptops -->
                            <div style="display:flex; justify-content:space-around; align-items:center; background:rgba(0,0,0,0.25); border-radius:6px; padding:2px 4px;">
                                <div id="v28-client-a" style="display:flex; align-items:center; gap:2px; opacity:0.65; transition:all 0.3s; font-size:8px; font-weight:bold; color:#60a5fa;">
                                    <i data-lucide="laptop" style="width:9px; height:9px;"></i>A
                                </div>
                                <div id="v28-client-b" style="display:flex; align-items:center; gap:2px; opacity:0.65; transition:all 0.3s; font-size:8px; font-weight:bold; color:#34d399;">
                                    <i data-lucide="laptop" style="width:9px; height:9px;"></i>B
                                </div>
                                <div id="v28-client-c" style="display:flex; align-items:center; gap:2px; opacity:0.65; transition:all 0.3s; font-size:8px; font-weight:bold; color:#fbbf24;">
                                    <i data-lucide="laptop" style="width:9px; height:9px;"></i>C
                                </div>
                            </div>

                            <!-- Transit Tube -->
                            <div style="width:100%; height:110px; background:rgba(5,8,16,0.6); border:1px solid rgba(255,255,255,0.05); border-radius:8px; position:relative; overflow:hidden; display:flex; justify-content:center; align-items:center;" id="v28-transit-pipe">
                                <div id="v28-pipe-label" style="font-size:8px; font-weight:900; color:rgba(255,255,255,0.12); text-transform:uppercase; letter-spacing:0.5px; z-index:1;">
                                    Query Bus
                                </div>
                                
                                <div style="display:flex; flex-direction:column; gap:16px; position:absolute; left:6px; opacity:0.15; color:#fff; font-size:8px;">
                                    <i data-lucide="chevron-down" style="width:8px; height:8px;"></i>
                                    <i data-lucide="chevron-down" style="width:8px; height:8px;"></i>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:16px; position:absolute; right:6px; opacity:0.15; color:#fff; font-size:8px;">
                                    <i data-lucide="chevron-down" style="width:8px; height:8px;"></i>
                                    <i data-lucide="chevron-down" style="width:8px; height:8px;"></i>
                                </div>

                                <!-- Centered query packets -->
                                <div id="v28-q-pack-0" style="position:absolute; left:calc(50% - 70px); width:140px; height:18px; background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.3); border-radius:5px; font-size:7px; font-family:monospace; color:#fff; padding:0 6px; display:flex; align-items:center; justify-content:space-between; transition:all 0.15s linear; box-sizing:border-box;">
                                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:95px; text-align:left;">SELECT username FROM...</span>
                                    <span class="v28-pack-status" style="color:#34d399; font-weight:bold;">OK</span>
                                </div>
                                <div id="v28-q-pack-1" style="position:absolute; left:calc(50% - 70px); width:140px; height:18px; background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.3); border-radius:5px; font-size:7px; font-family:monospace; color:#fff; padding:0 6px; display:flex; align-items:center; justify-content:space-between; transition:all 0.15s linear; box-sizing:border-box;">
                                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:95px; text-align:left;">SELECT username FROM...</span>
                                    <span class="v28-pack-status" style="color:#34d399; font-weight:bold;">OK</span>
                                </div>
                                <div id="v28-q-pack-2" style="position:absolute; left:calc(50% - 70px); width:140px; height:18px; background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.3); border-radius:5px; font-size:7px; font-family:monospace; color:#fff; padding:0 6px; display:flex; align-items:center; justify-content:space-between; transition:all 0.15s linear; box-sizing:border-box;">
                                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:95px; text-align:left;">SELECT username FROM...</span>
                                    <span class="v28-pack-status" style="color:#34d399; font-weight:bold;">OK</span>
                                </div>
                                <div id="v28-q-pack-3" style="position:absolute; left:calc(50% - 70px); width:140px; height:18px; background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.3); border-radius:5px; font-size:7px; font-family:monospace; color:#fff; padding:0 6px; display:flex; align-items:center; justify-content:space-between; transition:all 0.15s linear; box-sizing:border-box;">
                                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:95px; text-align:left;">SELECT username FROM...</span>
                                    <span class="v28-pack-status" style="color:#34d399; font-weight:bold;">OK</span>
                                </div>
                            </div>
                        </div>

                        <!-- HDD Storage Platter Engine (Connected below pipeline) -->
                        <div class="glass-card" style="padding: 8px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.08); background: rgba(10,15,30,0.6); width: 100%;">
                            <div style="display:flex; align-items:center; gap:4px; font-size:8.5px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.5px; border-bottom: 1px solid rgba(255,255,255,0.04); width:100%; padding-bottom:3px;">
                                <i data-lucide="hard-drive" style="width:10px; height:10px; color:#fbbf24;"></i>
                                <span>Storage Platter Engine</span>
                            </div>
                            
                            <div style="display:flex; justify-content:center; align-items:center; width:90px; height:90px; background:rgba(0,0,0,0.35); border-radius:12px; border:1px solid rgba(255,255,255,0.05); box-shadow:inset 0 2px 4px rgba(0,0,0,0.4); position:relative; overflow:visible;">
                                <svg width="82" height="82" viewBox="0 0 100 100" style="overflow:visible;" id="v28-hdd-svg">
                                    <rect x="2" y="2" width="96" height="96" rx="10" fill="#0b0f19" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
                                    <circle cx="46" cy="52" r="38" fill="url(#platterGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" id="v28-hdd-platter" style="transform-origin: 46px 52px;" class="v28-disk-spinning-fast" />
                                    <circle cx="46" cy="52" r="8" fill="#334155" stroke="rgba(255,255,255,0.2)" />
                                    <circle cx="46" cy="52" r="3" fill="#020617" />
                                    <path d="M 18 24 L 28 34 M 64 80 L 74 90" stroke="rgba(255,255,255,0.12)" stroke-width="2" stroke-linecap="round" />
                                    <g id="v28-hdd-arm" class="v28-arm-sweeping-slow" style="transform-origin: 82px 18px;">
                                        <circle cx="82" cy="18" r="6" fill="#64748b" stroke="rgba(255,255,255,0.2)" />
                                        <line x1="82" y1="18" x2="48" y2="48" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
                                        <line x1="82" y1="18" x2="48" y2="48" stroke="#cbd5e1" stroke-width="1" stroke-linecap="round" />
                                        <polygon points="48,48 44,45 45,51" fill="#334155" />
                                        <circle cx="48" cy="48" r="1.5" fill="#34d399" id="v28-hdd-led" />
                                    </g>
                                    <defs>
                                        <linearGradient id="platterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#475569" />
                                            <stop offset="30%" stop-color="#1e293b" />
                                            <stop offset="50%" stop-color="#94a3b8" />
                                            <stop offset="70%" stop-color="#0f172a" />
                                            <stop offset="100%" stop-color="#334155" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Status, Telemetry & Warnings -->
                    <div style="width: 40%; display: flex; flex-direction: column; gap: 8px; justify-content: space-between;">
                        <!-- Status & Telemetry Card -->
                        <div class="glass-card" style="padding: 12px; border-radius: 14px; display: flex; flex-direction: column; gap: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(10,15,30,0.6); flex: 1;">
                            <div style="display:flex; flex-direction:column; gap:4px; align-items:center; border-bottom: 1px solid rgba(255,255,255,0.04); width:100%; padding-bottom:6px;">
                                <span style="font-size:8.5px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.5px;">Server Node</span>
                                <span style="font-size:9px; font-weight:900; color:#34d399; background:rgba(52,211,153,0.1); padding:2px 8px; border-radius:5px; border:1px solid rgba(52,211,153,0.15); display:inline-block; margin-top:2px;" id="v28-db-status">ONLINE</span>
                            </div>

                            <!-- Gauges container (stacked vertically) -->
                            <div style="display:flex; flex-direction:column; justify-content:space-around; align-items:center; gap:12px; flex: 1;">
                                <!-- CPU Load Gauge -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                    <div style="position:relative; width:54px; height:54px; display:flex; align-items:center; justify-content:center;">
                                        <svg width="54" height="54" viewBox="0 0 60 60">
                                            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="5.5" />
                                            <circle id="v28-gauge-cpu" cx="30" cy="30" r="24" fill="none" stroke="#34d399" stroke-width="5" 
                                                    class="v28-gauge-circle" stroke-dasharray="150.8" stroke-dashoffset="150.8" stroke-linecap="round" />
                                        </svg>
                                        <span id="v28-cpu-val" style="position:absolute; font-size:10px; font-family:monospace; font-weight:900; color:#fff;">15%</span>
                                    </div>
                                    <span style="font-size:8.5px; font-weight:800; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.3px;">CPU Load</span>
                                </div>
                                
                                <!-- Disk I/O Latency Gauge -->
                                <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                    <div style="position:relative; width:54px; height:54px; display:flex; align-items:center; justify-content:center;">
                                        <svg width="54" height="54" viewBox="0 0 60 60">
                                            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="5.5" />
                                            <circle id="v28-gauge-latency" cx="30" cy="30" r="24" fill="none" stroke="#34d399" stroke-width="5" 
                                                    class="v28-gauge-circle" stroke-dasharray="150.8" stroke-dashoffset="150.8" stroke-linecap="round" />
                                        </svg>
                                        <span id="v28-latency-val" style="position:absolute; font-size:9px; font-family:monospace; font-weight:900; color:#fff;">1.2 ms</span>
                                    </div>
                                    <span style="font-size:8.5px; font-weight:800; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.3px;">Disk I/O</span>
                                </div>
                            </div>
                        </div>

                        <!-- Warning Alert Card at bottom of Right Column -->
                        <div class="glass-card v28-alert-card" id="v28-db-alert" style="padding:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; opacity:0; transform:translateY(12px); transition:all 0.3s; border:1px solid rgba(239,68,68,0.25); background: rgba(239,68,68,0.08); min-height: 80px; text-align: center; border-radius: 14px;">
                            <i data-lucide="alert-triangle" style="width:18px; height:18px; color:#f87171; filter: drop-shadow(0 0 3px #f87171);"></i>
                            <span style="font-size:9px; color:#f87171; font-weight:900; letter-spacing:0.3px; text-transform:uppercase; line-height: 1.3;">NGHẼN DISK I/O:<br>DATABASE QUÁ TẢI</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_bloom_3') {
            canvas.innerHTML = `
                <div class="v28-zoom-container" style="zoom: 1.35; gap: 14px;">
                    <!-- DDR5 RAM Cache module visualization -->
                    <div style="width:100%; display:flex; flex-direction:column; align-items:center; gap:6px;">
                        <div style="width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.8px; padding:0 4px;">
                            <span>DDR5 RAM Cache Stick</span>
                            <span style="color:#ef4444;" class="v28-gold-glow">Redis Node</span>
                        </div>
                        
                        <div class="v28-ram-module">
                            <div class="v28-ram-chips-grid">
                                <!-- Chip 1 -->
                                <div class="v28-ram-chip-block">
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                </div>
                                <!-- Chip 2 -->
                                <div class="v28-ram-chip-block">
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                </div>
                                <!-- Chip 3 -->
                                <div class="v28-ram-chip-block">
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                </div>
                                <!-- Chip 4 -->
                                <div class="v28-ram-chip-block">
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                    <div class="v28-ram-chip-cell"></div>
                                </div>
                            </div>
                            <div class="v28-ram-pins">
                                ${Array.from({ length: 44 }).map(() => '<div class="v28-ram-pin"></div>').join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Cost Dashboard & Calculations -->
                    <div class="glass-card" style="padding:16px; border-radius:20px; text-align:left; width: 100%; border:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:12px; position:relative; overflow:hidden;">
                        <!-- Money floating container -->
                        <div id="v28-money-container" style="position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:20px;">
                            <div class="v28-flying-dollar-bill" id="v28-bill-0" style="left:20%; display:none;">$</div>
                            <div class="v28-flying-dollar-bill" id="v28-bill-1" style="left:50%; display:none;">$</div>
                            <div class="v28-flying-dollar-bill" id="v28-bill-2" style="left:80%; display:none;">$</div>
                        </div>

                        <!-- Cash register billing cost -->
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.5px;">Server Cost:</span>
                            <div class="v28-billing-counter" id="v28-ram-cost-counter">
                                $0<span class="v28-billing-unit">/ Month</span>
                            </div>
                        </div>

                        <!-- Technical storage math math formula list -->
                        <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:10px; border:1px solid rgba(255,255,255,0.04); display:flex; flex-direction:column; gap:4px; font-family:monospace; font-size:10px; line-height:1.4;">
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:rgba(255,255,255,0.45);">Total Usernames:</span>
                                <span style="color:#fff; font-weight:bold;">500,000,000</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:rgba(255,255,255,0.45);">Avg String Size:</span>
                                <span style="color:#fff; font-weight:bold;">~30 Bytes</span>
                            </div>
                            <div style="border-top:1px dashed rgba(255,255,255,0.1); margin:3px 0;"></div>
                            <div style="display:flex; justify-content:space-between; font-size:11px;">
                                <span style="color:#60a5fa; font-weight:800;">Memory Required:</span>
                                <span id="v28-ram-val-redis" style="color:#ef4444; font-weight:900;">0.0 GB / 15.0 GB</span>
                            </div>
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

                    <!-- Bit Array visual representation -->
                    <div class="glass-card v28-bit-array-card" style="padding:15px; border-radius:20px; display:flex; flex-direction:column; align-items:center; gap:10px; width: 100%; opacity:0; transform:translateY(15px); transition:all 0.4s ease-out; box-sizing:border-box;">
                        <div style="font-size:12px; font-weight:bold; color:#10b981; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.8px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; width:100%; text-align:center;">
                            Mô Phỏng Mảng Bit trong RAM (Bloom Filter Array)
                        </div>
                        ${renderBitArrayHTML('v28-array-4', 12)}
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
                <div class="v28-zoom-container" style="justify-content: center; gap: 32px;">
                    <!-- Hashing visualization and bit array -->
                    <div style="position:relative; display:flex; flex-direction:column; align-items:center; gap:20px;">
                        <!-- Centered DB + Search icons -->
                        <div style="position:relative; width:140px; height:140px; display:flex; align-items:center; justify-content:center; background:rgba(59, 130, 246, 0.08); border:2px dashed rgba(59, 130, 246, 0.3); border-radius:50%; animation: v28-float 6s ease-in-out infinite;">
                            <i data-lucide="database" style="width:60px; height:60px; color:#3b82f6; filter:drop-shadow(0 0 15px rgba(59, 130, 246, 0.4));"></i>
                            <div style="position:absolute; right:-10px; bottom:-10px; width:54px; height:54px; border-radius:50%; background:#10b981; display:flex; align-items:center; justify-content:center; border:2px solid #121212; box-shadow:0 8px 16px rgba(0,0,0,0.4);">
                                <i data-lucide="filter" style="width:24px; height:24px; color:#fff;"></i>
                            </div>
                        </div>
                        
                        <!-- Micro Bit Array with pulse effects -->
                        <div style="display:flex; gap:8px; background:rgba(255,255,255,0.02); padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,0.06); margin-top:20px;">
                            <div style="width:40px; height:40px; border-radius:6px; background:#10b981; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#000; font-size:16px; border:1px solid rgba(255,255,255,0.1); transition: transform 0.3s;" class="v28-cell-pulsing">1</div>
                            <div style="width:40px; height:40px; border-radius:6px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-size:16px; border:1px solid rgba(255,255,255,0.05);">0</div>
                            <div style="width:40px; height:40px; border-radius:6px; background:#10b981; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#000; font-size:16px; border:1px solid rgba(255,255,255,0.1); transition: transform 0.3s;" class="v28-cell-pulsing">1</div>
                            <div style="width:40px; height:40px; border-radius:6px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-size:16px; border:1px solid rgba(255,255,255,0.05);">0</div>
                            <div style="width:40px; height:40px; border-radius:6px; background:#10b981; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#000; font-size:16px; border:1px solid rgba(255,255,255,0.1); transition: transform 0.3s;" class="v28-cell-pulsing">1</div>
                        </div>
                    </div>
                    <!-- Summary Card -->
                    <div class="glass-card" style="padding:18px 28px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); border-radius:16px; text-align:center; width:100%; max-width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6); animation: v28-float 6s ease-in-out infinite 1s;">
                        <div style="font-family:'Outfit', sans-serif; font-size:16px; font-weight:800; color:var(--gold-primary); letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:8px;">Bloom Filter Efficiency</div>
                        <div style="font-size:15px; color:#94a3b8; line-height:1.6; display:block;">Tiết kiệm dung lượng bộ nhớ đệm lên tới 99%</div>
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
            const tags = [
                { id: 'l1', side: 'left', startX: 4, startY: 60, delay: 0.0 },
                { id: 'l2', side: 'left', startX: 1, startY: 160, delay: 0.25 },
                { id: 'l3', side: 'left', startX: 5, startY: 270, delay: 0.5 },
                { id: 'l4', side: 'left', startX: 0, startY: 360, delay: 0.75 },
                { id: 'r1', side: 'right', startX: 4, startY: 80, delay: 0.12 },
                { id: 'r2', side: 'right', startX: 1, startY: 170, delay: 0.37 },
                { id: 'r3', side: 'right', startX: 5, startY: 280, delay: 0.62 },
                { id: 'r4', side: 'right', startX: 0, startY: 370, delay: 0.87 }
            ];

            let triggerRipple = false;

            tags.forEach(tag => {
                const el = canvas.querySelector(`#v28-req-tag-${tag.id}`);
                if (!el) return;
                
                // Continuous loop of flying requests:
                // Multiply progress by a factor to make them fly fast and repeatedly
                const speedMult = 4.0; 
                let t = ((progress * speedMult) + tag.delay) % 1.0;
                
                // Flight path coordinate calculation:
                // Move from start% to 50% center
                const curX = tag.startX + (50 - tag.startX) * t;
                const curY = tag.startY + (180 - tag.startY) * t;
                const scale = 1.0 - t * 0.65;
                const opacity = t < 0.15 ? (t / 0.15) : (t > 0.85 ? (1.0 - t) / 0.15 : 1.0);
                
                if (tag.side === 'left') {
                    el.style.left = `${curX}%`;
                    el.style.right = 'auto';
                    el.style.transform = `translate3d(-50%, 0, 0) scale(${scale})`;
                } else {
                    el.style.right = `${curX}%`;
                    el.style.left = 'auto';
                    el.style.transform = `translate3d(50%, 0, 0) scale(${scale})`;
                }
                
                el.style.top = `${curY}px`;
                el.style.opacity = opacity;
                
                // If tag is close to absorption notch, trigger ripple flag
                if (t > 0.90 && t < 0.98) {
                    triggerRipple = true;
                }
            });

            // Absorption ripple animation
            const ripple = canvas.querySelector('#v28-phone-ripple');
            if (ripple) {
                if (triggerRipple) {
                    ripple.classList.add('active');
                } else {
                    ripple.classList.remove('active');
                }
            }

            // Phone screen typing & status logic
            const usernameVal = canvas.querySelector('#v28-phone-username-val');
            const statusVal = canvas.querySelector('#v28-phone-status');
            const phoneBtn = canvas.querySelector('#v28-phone-btn');
            const screenGlow = canvas.querySelector('#v28-phone-screen-glow');
            const inputContainer = canvas.querySelector('#v28-phone-input-container');

            let username = "";
            let statusText = "";
            let color = "var(--bf-blue)";
            let btnText = "Sign Up";
            let isTaken = false;

            if (progress < 0.2) {
                username = "alex";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
                isTaken = false;
            } else if (progress < 0.4) {
                username = "bob";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
                isTaken = false;
            } else if (progress < 0.6) {
                username = "charlie";
                statusText = "✗ TAKEN";
                color = "var(--bf-red)";
                btnText = "Taken";
                isTaken = true;
            } else if (progress < 0.8) {
                username = "david";
                statusText = "✓ AVAILABLE";
                color = "var(--bf-green)";
                btnText = "Success";
                isTaken = false;
            } else {
                username = "emma";
                statusText = "✗ TAKEN";
                color = "var(--bf-red)";
                btnText = "Taken";
                isTaken = true;
            }

            // Typing simulation calculation inside subranges
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
                    phoneBtn.style.boxShadow = `0 4px 15px ${color}40`;
                } else {
                    phoneBtn.textContent = "Checking...";
                    phoneBtn.style.background = "rgba(96,165,250,0.2)";
                    phoneBtn.style.color = "var(--bf-blue)";
                    phoneBtn.style.boxShadow = "none";
                }
            }

            if (screenGlow) {
                if (subProgress > 0.6) {
                    screenGlow.style.background = `radial-gradient(circle, ${color}2b 0%, transparent 70%)`;
                } else {
                    screenGlow.style.background = "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)";
                }
            }

            // Shake input field and flash borders
            if (inputContainer) {
                inputContainer.classList.remove('v28-input-shake');
                if (subProgress > 0.6) {
                    inputContainer.style.borderColor = color;
                    inputContainer.style.boxShadow = `0 0 10px ${color}33`;
                    if (isTaken) {
                        inputContainer.classList.add('v28-input-shake');
                    }
                } else {
                    inputContainer.style.borderColor = "rgba(96,165,250,0.4)";
                    inputContainer.style.boxShadow = "0 0 10px rgba(96,165,250,0.15)";
                }
            }

            // Database metrics counter
            const totalCounter = canvas.querySelector('#v28-counter-total');
            const speedCounter = canvas.querySelector('#v28-counter-speed');

            const totalBase = 500124500;
            // Real-time counter ticks up to show heavy traffic load
            const totalClimb = Math.floor(progress * 135000);
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
            const cpuGauge = canvas.querySelector('#v28-gauge-cpu');
            const latencyVal = canvas.querySelector('#v28-latency-val');
            const latencyGauge = canvas.querySelector('#v28-gauge-latency');
            const queueVal = canvas.querySelector('#v28-queue-val');
            const dbStatus = canvas.querySelector('#v28-db-status');
            const dbIcon = canvas.querySelector('#v28-db-icon');
            const alertBox = canvas.querySelector('#v28-db-alert');
            const scanline = canvas.querySelector('.v28-db-scanline');
            const hddPlatter = canvas.querySelector('#v28-hdd-platter');
            const hddArm = canvas.querySelector('#v28-hdd-arm');
            const hddLed = canvas.querySelector('#v28-hdd-led');
            const clientA = canvas.querySelector('#v28-client-a');
            const clientB = canvas.querySelector('#v28-client-b');
            const clientC = canvas.querySelector('#v28-client-c');

            // 1. Scanline sweep
            if (scanline) {
                if (progress > 0.05 && progress < 0.9) {
                    scanline.classList.add('scanning');
                } else {
                    scanline.classList.remove('scanning');
                }
            }

            // 2. CPU load calculation & gauge update
            const cpu = Math.round(15 + progress * 85);
            if (cpuVal) cpuVal.textContent = `${cpu}%`;
            if (cpuGauge) {
                const cpuOffset = 150.8 - (cpu / 100) * 150.8;
                cpuGauge.style.strokeDashoffset = cpuOffset;
                const cpuColor = cpu > 80 ? 'var(--bf-red)' : (cpu > 45 ? 'var(--bf-orange)' : 'var(--bf-green)');
                cpuGauge.style.stroke = cpuColor;
                if (cpuVal) cpuVal.style.color = cpuColor;
            }

            // 3. Latency calculation & gauge update
            const latency = (1.2 + progress * progress * 318.8).toFixed(1);
            if (latencyVal) latencyVal.textContent = `${latency} ms`;
            if (latencyGauge) {
                const latPercent = Math.min(100, (parseFloat(latency) / 320) * 100);
                const latOffset = 150.8 - (latPercent / 100) * 150.8;
                latencyGauge.style.strokeDashoffset = latOffset;
                const latColor = latency > 150 ? 'var(--bf-red)' : (latency > 20 ? 'var(--bf-orange)' : 'var(--bf-green)');
                latencyGauge.style.stroke = latColor;
                if (latencyVal) latencyVal.style.color = latColor;
            }

            // 4. Clients activation pulse
            if (clientA && clientB && clientC) {
                const cycle = Math.floor(Date.now() / 300) % 3;
                clientA.style.opacity = (cycle === 0) ? '1' : '0.5';
                clientA.style.transform = (cycle === 0) ? 'scale(1.05)' : 'scale(1)';
                clientB.style.opacity = (cycle === 1) ? '1' : '0.5';
                clientB.style.transform = (cycle === 1) ? 'scale(1.05)' : 'scale(1)';
                clientC.style.opacity = (cycle === 2) ? '1' : '0.5';
                clientC.style.transform = (cycle === 2) ? 'scale(1.05)' : 'scale(1)';
            }

            // 5. Query packet stream animation
            const packs = [
                canvas.querySelector('#v28-q-pack-0'),
                canvas.querySelector('#v28-q-pack-1'),
                canvas.querySelector('#v28-q-pack-2'),
                canvas.querySelector('#v28-q-pack-3')
            ];

            const pipeHeight = 110;
            packs.forEach((p, idx) => {
                if (p) {
                    const statusText = p.querySelector('.v28-pack-status');
                    if (progress < 0.35) {
                        // Quick flow state
                        const speed = 400 + idx * 50;
                        const y = (progress * speed + idx * 25) % (pipeHeight - 20);
                        p.style.transform = `translateY(${y}px)`;
                        p.style.opacity = '1';
                        p.style.borderColor = 'rgba(96,165,250,0.3)';
                        p.style.background = 'rgba(96,165,250,0.1)';
                        if (statusText) {
                            statusText.textContent = 'OK';
                            statusText.style.color = '#34d399';
                        }
                    } else if (progress >= 0.35 && progress < 0.7) {
                        // Clogging state (stack up)
                        const targetY = pipeHeight - 24 - idx * 22;
                        const y = targetY + Math.sin(Date.now() / 100 + idx) * 1.5;
                        p.style.transform = `translateY(${y}px)`;
                        p.style.opacity = '1';
                        p.style.borderColor = 'rgba(251,191,36,0.6)';
                        p.style.background = 'rgba(251,191,36,0.15)';
                        if (statusText) {
                            statusText.textContent = 'DELAY';
                            statusText.style.color = '#fbbf24';
                        }
                    } else {
                        // Clogged / Timed out (red & shaking)
                        const targetY = pipeHeight - 24 - idx * 22;
                        const shake = (Math.random() - 0.5) * 2;
                        p.style.transform = `translateY(${targetY}px) translateX(${shake}px)`;
                        p.style.opacity = '1';
                        p.style.borderColor = 'rgba(239,68,68,0.7)';
                        p.style.background = 'rgba(239,68,68,0.2)';
                        if (statusText) {
                            statusText.textContent = 'TIMEOUT';
                            statusText.style.color = '#ef4444';
                        }
                    }
                }
            });

            // 6. Hard Disk platter spinning & distress animation
            if (hddPlatter) {
                hddPlatter.classList.remove('v28-disk-spinning-fast', 'v28-disk-spinning-slow', 'v28-disk-spinning-stuck', 'v28-disk-shaking');
                if (progress < 0.4) {
                    hddPlatter.classList.add('v28-disk-spinning-fast');
                    hddPlatter.style.stroke = 'rgba(255,255,255,0.25)';
                } else if (progress >= 0.4 && progress < 0.7) {
                    hddPlatter.classList.add('v28-disk-spinning-slow', 'v28-disk-shaking');
                    hddPlatter.style.stroke = 'var(--bf-orange)';
                } else {
                    hddPlatter.classList.add('v28-disk-spinning-stuck', 'v28-disk-shaking');
                    hddPlatter.style.stroke = 'var(--bf-red)';
                }
            }

            // 7. HDD Read/Write Arm sweeper speed
            if (hddArm) {
                hddArm.classList.remove('v28-arm-sweeping-slow', 'v28-arm-sweeping-fast');
                if (progress < 0.4) {
                    hddArm.classList.add('v28-arm-sweeping-slow');
                } else {
                    hddArm.classList.add('v28-arm-sweeping-fast');
                }
            }

            // 8. HDD Head LED color
            if (hddLed) {
                if (progress < 0.4) {
                    hddLed.setAttribute('fill', '#34d399');
                } else if (progress >= 0.4 && progress < 0.7) {
                    hddLed.setAttribute('fill', '#fbbf24');
                } else {
                    hddLed.setAttribute('fill', '#ef4444');
                }
            }

            // 9. Queue text count & status updating
            const queueCount = Math.round(progress * 50);
            if (queueVal) {
                if (queueCount > 40) {
                    queueVal.textContent = `QUÁ TẢI (${queueCount} reqs)`;
                    queueVal.style.color = 'var(--bf-red)';
                } else if (queueCount > 15) {
                    queueVal.textContent = `Cảnh báo (${queueCount} reqs)`;
                    queueVal.style.color = 'var(--bf-orange)';
                } else {
                    queueVal.textContent = `${queueCount} Requests`;
                    queueVal.style.color = 'var(--bf-green)';
                }
            }

            // 10. Database server status
            if (dbStatus) {
                const pipe = canvas.querySelector('#v28-transit-pipe');
                const card = pipe ? pipe.closest('.glass-card') : null;
                
                if (progress >= 0.7) {
                    dbStatus.textContent = "I/O BOTTLENECK";
                    dbStatus.style.color = "var(--bf-red)";
                    dbStatus.style.borderColor = "rgba(248, 113, 113, 0.4)";
                    dbStatus.style.background = "rgba(248, 113, 113, 0.15)";
                    if (pipe) {
                        pipe.style.background = "rgba(239, 68, 68, 0.12)";
                        pipe.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    }
                    if (card) {
                        card.style.borderColor = "rgba(239, 68, 68, 0.25)";
                        card.style.boxShadow = "0 8px 32px rgba(239, 68, 68, 0.18)";
                    }
                    if (dbIcon) dbIcon.style.color = "var(--bf-red)";
                } else if (progress >= 0.4) {
                    dbStatus.textContent = "OVERLOADED";
                    dbStatus.style.color = "var(--bf-orange)";
                    dbStatus.style.borderColor = "rgba(251, 191, 36, 0.3)";
                    dbStatus.style.background = "rgba(251, 191, 36, 0.1)";
                    if (pipe) {
                        pipe.style.background = "rgba(251, 191, 36, 0.08)";
                        pipe.style.borderColor = "rgba(251, 191, 36, 0.2)";
                    }
                    if (card) {
                        card.style.borderColor = "rgba(251, 191, 36, 0.15)";
                        card.style.boxShadow = "0 8px 32px rgba(251, 191, 36, 0.08)";
                    }
                    if (dbIcon) dbIcon.style.color = "var(--bf-orange)";
                } else {
                    dbStatus.textContent = "ONLINE";
                    dbStatus.style.color = "var(--bf-green)";
                    dbStatus.style.borderColor = "rgba(52, 211, 153, 0.2)";
                    dbStatus.style.background = "rgba(52, 211, 153, 0.1)";
                    if (pipe) {
                        pipe.style.background = "rgba(5, 8, 16, 0.5)";
                        pipe.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    }
                    if (card) {
                        card.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        card.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.45)";
                    }
                    if (dbIcon) dbIcon.style.color = "var(--bf-blue)";
                }
            }

            // 11. Alert box overlay fade-in
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
            const costCounter = canvas.querySelector('#v28-ram-cost-counter');
            const cells = canvas.querySelectorAll('.v28-ram-chip-cell');
            const bill0 = canvas.querySelector('#v28-bill-0');
            const bill1 = canvas.querySelector('#v28-bill-1');
            const bill2 = canvas.querySelector('#v28-bill-2');

            // 1. RAM Capacity values
            const currentGB = (progress * 15.0).toFixed(1);
            if (ramVal) ramVal.textContent = `${currentGB} GB / 15.0 GB`;

            // 2. RAM Module cells sequential lighting
            if (cells.length > 0) {
                const numLit = Math.floor(progress * cells.length);
                cells.forEach((cell, i) => {
                    cell.classList.remove('state-good', 'state-warning', 'state-danger');
                    if (i < numLit) {
                        if (i < cells.length * 0.4) {
                            cell.classList.add('state-good');
                        } else if (i < cells.length * 0.75) {
                            cell.classList.add('state-warning');
                        } else {
                            cell.classList.add('state-danger');
                        }
                    }
                });
            }

            // 3. Billing cash counter odometer
            const cost = Math.round(progress * 250);
            if (costCounter) {
                costCounter.innerHTML = `$${cost}<span class="v28-billing-unit">/ Month</span>`;
            }

            // 4. Money flying particle animation
            if (progress > 0.15) {
                const speed = 1.3;
                if (bill0) {
                    bill0.style.display = 'block';
                    const y0 = (100 - ((progress * speed) % 1.0) * 110);
                    bill0.style.top = `${y0}%`;
                    bill0.style.opacity = Math.sin(Math.PI * ((progress * speed) % 1.0));
                }
                if (bill1) {
                    bill1.style.display = 'block';
                    const y1 = (100 - ((progress * speed + 0.33) % 1.0) * 110);
                    bill1.style.top = `${y1}%`;
                    bill1.style.opacity = Math.sin(Math.PI * ((progress * speed + 0.33) % 1.0));
                }
                if (bill2) {
                    bill2.style.display = 'block';
                    const y2 = (100 - ((progress * speed + 0.66) % 1.0) * 110);
                    bill2.style.top = `${y2}%`;
                    bill2.style.opacity = Math.sin(Math.PI * ((progress * speed + 0.66) % 1.0));
                }
            } else {
                if (bill0) bill0.style.display = 'none';
                if (bill1) bill1.style.display = 'none';
                if (bill2) bill2.style.display = 'none';
            }
        }
        else if (slideId === 'slide_bloom_4') {
            const ramVal = canvas.querySelector('#v28-ram-val-bf');
            const ramBar = canvas.querySelector('#v28-ram-bar-bf');
            const bitArrayCard = canvas.querySelector('.v28-bit-array-card');
            const array = canvas.querySelector('#v28-array-4');

            const currentMB = Math.round(progress * 600);
            if (ramVal) ramVal.textContent = `${currentMB} MB / 600 MB`;
            if (ramBar) ramBar.style.width = `${progress * 100}%`;

            // Animate bit array card fade-in when talking about Bloom filter array
            if (bitArrayCard) {
                if (progress > 0.20) {
                    bitArrayCard.style.opacity = '1';
                    bitArrayCard.style.transform = 'translateY(0)';
                } else {
                    bitArrayCard.style.opacity = '0';
                    bitArrayCard.style.transform = 'translateY(15px)';
                }
            }

            // Animate bits lighting up
            if (array) {
                const targetBits = [
                    { idx: 2, threshold: 0.28 },
                    { idx: 5, threshold: 0.40 },
                    { idx: 8, threshold: 0.52 },
                    { idx: 10, threshold: 0.64 }
                ];
                targetBits.forEach(tb => {
                    const node = array.querySelector(`#v28-array-4-bit-${tb.idx}`);
                    if (node) {
                        if (progress >= tb.threshold) {
                            node.textContent = '1';
                            node.className = 'v28-bit-node active-good';
                        } else {
                            node.textContent = '0';
                            node.className = 'v28-bit-node';
                        }
                    }
                });
            }
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
        else if (slideId === 'slide_bloom_10') {
            const cells = canvas.querySelectorAll('.v28-cell-pulsing');
            cells.forEach((cell, idx) => {
                const wave = Math.abs(Math.sin((progress * 4 * Math.PI) - (idx * 0.8)));
                cell.style.transform = `scale(${1 + wave * 0.15})`;
                cell.style.boxShadow = `0 0 ${wave * 15}px rgba(16, 185, 129, 0.4)`;
            });
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video28',
        topic: 'Cơ chế Bloom Filter',
        episodeNum: 28,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video28 Plugin] Loaded: BLOOM FILTER premium 10 slides ready.');
})();
