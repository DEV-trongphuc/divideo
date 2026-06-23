/**
 * Video 27: Zip Bomb (42.zip & Recursive Decompression Mechanics)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video27
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Slide 1 (first slide) has no keywords as per rule.
    const keywordsData = {
        slide_zipbomb_2: [
            { text: '42.zip', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'quét tự động', start: 8.0, end: 16.0, class: 'active-gold' }
        ],
        slide_zipbomb_3: [
            { text: 'lớp ngòi nổ', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: '16 tệp nén', start: 8.0, end: 15.0, class: 'active-bad' }
        ],
        slide_zipbomb_4: [
            { text: 'đệ quy', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'búp bê Nga', start: 8.0, end: 17.0, class: 'active-gold' }
        ],
        slide_zipbomb_5: [
            { text: '16 lũy thừa 5', start: 2.0, end: 11.0, class: 'active-gold' },
            { text: '4.5 Petabytes', start: 11.0, end: 22.0, class: 'active-bad' }
        ],
        slide_zipbomb_6: [
            { text: 'Lặp lại tuyệt đối', start: 1.0, end: 9.0, class: 'active-gold' },
            { text: 'nén cực đại', start: 9.0, end: 20.0, class: 'active-good' }
        ],
        slide_zipbomb_7: [
            { text: 'phát nổ', start: 2.0, end: 10.0, class: 'active-bad' },
            { text: 'phình to', start: 10.0, end: 17.0, class: 'active-bad' }
        ],
        slide_zipbomb_8: [
            { text: 'dữ liệu', start: 2.0, end: 10.0, class: 'active-bad' },
            { text: 'vượt xa', start: 10.0, end: 17.0, class: 'active-gold' }
        ],
        slide_zipbomb_9: [
            { text: 'tê liệt', start: 1.0, end: 9.0, class: 'active-bad' },
            { text: 'Từ chối dịch vụ', start: 9.0, end: 22.0, class: 'active-bad' }
        ],
        slide_zipbomb_10: [
            { text: 'phòng vệ', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'chặn đứng', start: 8.0, end: 20.0, class: 'active-good' }
        ],
        slide_zipbomb_11: [
            { text: 'hệ thống', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'phòng vệ', start: 8.0, end: 18.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_zipbomb_1',
        'slide_zipbomb_2',
        'slide_zipbomb_3',
        'slide_zipbomb_4',
        'slide_zipbomb_5',
        'slide_zipbomb_6',
        'slide_zipbomb_7',
        'slide_zipbomb_8',
        'slide_zipbomb_9',
        'slide_zipbomb_10',
        'slide_zipbomb_11'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return; // Keep DOM persistence for performance

        if (slideId === 'slide_zipbomb_1') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div class="v27-orbit-ring v27-orbit-1"></div>
                    <div class="v27-orbit-ring v27-orbit-2"></div>

                    <!-- Bomb Visual with heartbeat pulse and fuse sparks -->
                    <div class="v27-bomb-anim" style="position:relative; width:195px; height:195px;">
                        <div style="position:absolute; inset:-20px; background:radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%); filter:blur(20px);"></div>
                        <i data-lucide="bomb" style="width:145px; height:145px; color:#ef4444; z-index:5;"></i>
                        <div class="v27-fuse-spark" style="position:absolute; right:32px; top:32px; width:18px; height:18px; border-radius:50%; background:#f59e0b; border: 2.5px solid #fff; z-index: 6;"></div>
                    </div>

                    <!-- Info Comparison Card -->
                    <div class="glass-card v27-floating" style="padding:22px; border:2px solid rgba(239, 68, 68, 0.25); background:rgba(239, 68, 68, 0.03); border-radius:20px; text-align:center;">
                        <div style="font-size:18px; font-weight:800; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:14px; text-transform:uppercase; letter-spacing:0.8px;">
                            Bản nén tử thần: 42.zip
                        </div>
                        <div style="display:flex; justify-content:space-around; align-items:center; gap:16px; padding:6px 0;">
                            <div>
                                <div style="font-size:13px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">Kích thước nén</div>
                                <div style="font-size:30px; font-weight:900; color:#fff; margin-top:2px;">42 KB</div>
                            </div>
                            <div style="font-size:32px; color:#ef4444; font-weight:bold;">➔</div>
                            <div>
                                <div style="font-size:13px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">Khi giải nén</div>
                                <div style="font-size:30px; font-weight:900; color:#ef4444; text-shadow:0 0 10px rgba(239,68,68,0.4); margin-top:2px;">4.5 Petabytes</div>
                            </div>
                        </div>
                        <div style="margin-top:12px; font-size:14px; color:#f59e0b; font-weight:bold; background:rgba(245,158,11,0.08); padding:6px 16px; border-radius:10px; display:inline-block; border:1px solid rgba(245,158,11,0.15); letter-spacing:0.5px;">
                            Tỷ lệ nén: 100.000.000 : 1
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_2') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div class="v27-orbit-ring v27-orbit-1"></div>
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Tình huống: Gửi tệp đính kèm
                    </div>

                    <!-- Horizontal Transit Lane (Unique UI layout) -->
                    <div class="v27-transit-container">
                        <div style="display:flex; flex-direction:column; align-items:center; gap:4px; z-index: 5;">
                            <i data-lucide="mail-open" style="width:36px; height:36px; color:#3b82f6;"></i>
                            <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Email</span>
                        </div>
                        
                        <div style="flex:1; position:relative; height:40px; display:flex; align-items:center; justify-content:center;">
                            <div style="width:80%; height:2px; background:rgba(255,255,255,0.1); border-top:1px dashed rgba(255,255,255,0.2);"></div>
                            <div class="v27-transit-dot">
                                <i data-lucide="file-archive" style="width:24px; height:24px; color:#f59e0b; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));"></i>
                            </div>
                        </div>

                        <div style="display:flex; flex-direction:column; align-items:center; gap:4px; z-index: 5;">
                            <i data-lucide="server" style="width:36px; height:36px; color:#10b981;"></i>
                            <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Máy Chủ</span>
                        </div>
                    </div>

                    <!-- Security Scanner Panel -->
                    <div class="v27-scanner-box">
                        <div class="v27-scan-ray"></div>
                        <div style="font-size:15px; font-family:monospace; color:#94a3b8; font-weight:bold; letter-spacing:0.5px;" id="v27-scan-status">
                            Hệ thống đang tự động quét bảo mật...
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_3') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Mở Giải Lớp 1: 16 Tệp Nén Con
                    </div>

                    <!-- Single main file expanding to grid of 16 -->
                    <div class="glass-card" style="padding:16px; border-radius:20px; display:flex; flex-direction:column; align-items:center; gap:16px; width:100%;">
                        <div id="v27-slide3-source" style="display:flex; align-items:center; gap:8px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.25); padding:8px 16px; border-radius:12px; transition:all 0.5s;">
                            <i data-lucide="file-archive" style="width:28px; height:28px; color:#f59e0b;"></i>
                            <span style="font-weight:bold; color:#fff; font-size:15px;">42.zip (42 KB)</span>
                        </div>
                        
                        <div style="font-size:24px; color:rgba(255,255,255,0.3); font-weight:bold;">➔</div>

                        <div class="v27-folder-grid">
                            ${Array.from({ length: 16 }).map((_, i) => `
                                <div class="v27-folder-item" id="v27-folder-${i}">
                                    <i data-lucide="folder-archive" style="width:20px; height:20px; color:#3b82f6;"></i>
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.6); font-weight:bold;">#${i+1}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_4') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Cấu trúc đệ quy lồng 5 tầng
                    </div>
                    
                    <!-- Nested Russian Doll Boxes (Highly Diverse Layout) -->
                    <div class="v27-nest-container">
                        <div class="v27-nest-box depth-0" id="doll-0">
                            <div class="v27-nest-header">
                                <span><i data-lucide="folder-archive" style="color:#3b82f6;"></i>42.zip (Tầng 0)</span>
                                <span style="font-family:monospace; color:#3b82f6;">42 KB</span>
                            </div>
                            
                            <div class="v27-nest-box depth-1" id="doll-1" style="opacity: 0.15; transform: scale(0.97);">
                                <div class="v27-nest-header">
                                    <span><i data-lucide="folder" style="color:#2563eb;"></i>Tầng 1 (16 tệp nén)</span>
                                    <span style="font-family:monospace; color:#2563eb;">16 con</span>
                                </div>
                                
                                <div class="v27-nest-box depth-2" id="doll-2" style="opacity: 0.15; transform: scale(0.97);">
                                    <div class="v27-nest-header">
                                        <span><i data-lucide="folder" style="color:#1d4ed8;"></i>Tầng 2 (256 tệp nén)</span>
                                        <span style="font-family:monospace; color:#1d4ed8;">256 con</span>
                                    </div>
                                    
                                    <div class="v27-nest-box depth-3" id="doll-3" style="opacity: 0.15; transform: scale(0.97);">
                                        <div class="v27-nest-header">
                                            <span><i data-lucide="folder" style="color:#f59e0b;"></i>Tầng 3 (4096 tệp nén)</span>
                                            <span style="font-family:monospace; color:#f59e0b;">4096 con</span>
                                        </div>

                                        <div class="v27-nest-box depth-4" id="doll-4" style="opacity: 0.15; transform: scale(0.97);">
                                            <div class="v27-nest-header">
                                                <span><i data-lucide="file-text" style="color:#ef4444;"></i>Tầng 5 (Văn bản thô)</span>
                                                <span style="font-family:monospace; color:#ef4444; font-weight:bold;">4.5 PB!</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_5') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Số lượng tệp tăng lũy thừa
                    </div>

                    <div class="v27-math-card">
                        <div style="font-size:13px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; font-family:monospace; letter-spacing:0.5px;">
                            Tổng số file ở tầng đáy:
                        </div>
                        <div style="font-size:21px; font-weight:900; color:#fff; margin-top:8px; font-family:monospace; letter-spacing:0.5px;">
                            16 × 16 × 16 × 16 × 16
                        </div>
                        <div style="font-size:16px; color:rgba(255,255,255,0.3); margin:4px 0;">
                            =
                        </div>
                        <div class="v27-math-number" id="v27-math-res" style="margin: 2px 0;">
                            0
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top:10px; margin-top:10px; font-size:14px; color:#f59e0b; font-weight:bold; letter-spacing:0.5px;">
                            Hơn 1 triệu tệp văn bản con!
                        </div>
                    </div>

                    <div class="glass-card" style="padding:12px; border-radius:16px; text-align:center; border-color:rgba(245,158,11,0.25); max-width:480px; margin:0 auto;">
                        <div style="font-size:12px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">Tổng dung lượng giải nén:</div>
                        <div style="font-size:18px; font-weight:800; color:#fff; margin-top:2px; letter-spacing:0.5px;">1.048.576 tệp × 4.3 GB</div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_6') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Nguyên lý: Nén từ sự lặp lại
                    </div>

                    <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
                        <!-- Raw File Container with Horizontal Scrolling Ticker -->
                        <div class="glass-card" style="padding:16px; border-color:rgba(59,130,246,0.25); background:rgba(59,130,246,0.01); text-align:left;">
                            <div style="font-size:14px; font-weight:bold; color:#3b82f6; margin-bottom:8px; text-transform:uppercase; display:flex; justify-content:space-between; align-items:center; letter-spacing:0.5px;">
                                <span>Tệp Văn Bản Thô (4.3 GB)</span>
                                <i data-lucide="file-text" style="width:18px; height:18px; color:#3b82f6;"></i>
                            </div>
                            
                            <div class="v27-ticker-container">
                                <div class="v27-ticker-track" id="v27-ticker-track">
                                    <span class="v27-ticker-text">0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</span>
                                    <span class="v27-ticker-text">0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</span>
                                </div>
                            </div>
                        </div>

                        <!-- Compressed Command Box -->
                        <div class="glass-card" style="padding:16px; border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.01); text-align:center;">
                            <div style="font-size:13px; font-weight:bold; color:#10b981; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.8px;">
                                Thuật toán ZIP ghi nhận siêu ngắn:
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size:17px; color:#10b981; font-weight:bold; padding:8px 12px; background:rgba(0,0,0,0.35); border-radius:8px; border:1px solid rgba(16,185,129,0.15); letter-spacing:0.5px;">
                                [Ký tự: "0"] x 4.300.000.000
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_7') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Kích hoạt: Giải nén lớp đầu
                    </div>
                    
                    <div class="glass-card" style="padding:20px; border:2px solid rgba(239,68,68,0.25); border-radius:20px; background:#0c0f17; text-align:left; width:100%;">
                        <div style="font-size:16px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; text-transform:uppercase; display:flex; justify-content:space-between; align-items:center; letter-spacing:0.8px;">
                            <span>Tiến trình giải nén...</span>
                            <span style="color:#ef4444; font-weight:900;" id="v27-expl-perc-1">0%</span>
                        </div>

                        <div style="margin:16px 0; display:flex; flex-direction:column; gap:16px;">
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; font-family:monospace; font-size:14px; letter-spacing:0.5px;">
                                    <span style="color:rgba(255,255,255,0.4);">Tầng 1 (5.5 Gigabytes):</span>
                                    <span style="color:#fff; font-weight:bold;" id="v27-exp-size-t1">0 GB / 5.5 GB</span>
                                </div>
                                <div class="v27-progress-container">
                                    <div class="v27-progress-fill" id="v27-exp-bar-t1" style="width:0%; background-color:#3b82f6;"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; font-family:monospace; font-size:14px; letter-spacing:0.5px;">
                                    <span style="color:rgba(255,255,255,0.4);">Tầng 2 (88 Gigabytes):</span>
                                    <span style="color:#ef4444; font-weight:bold;" id="v27-exp-size-t2">0 GB / 88 GB</span>
                                </div>
                                <div class="v27-progress-container">
                                    <div class="v27-progress-fill" id="v27-exp-bar-t2" style="width:0%; background-color:#ef4444;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_8') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <div style="font-size:18px; font-weight:800; color:var(--text-muted); text-transform:uppercase; text-align:center; margin-bottom:5px; letter-spacing:0.8px;">
                        Thảm họa: Giải nén cực đại
                    </div>

                    <div class="glass-card" style="padding:18px; border:2px solid rgba(239,68,68,0.3); border-radius:20px; background:#0c0f17; text-align:left; width:100%;">
                        <div style="font-size:14px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.8px;">
                            Bung lớp ngòi nổ đệ quy sâu:
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            <!-- Layer 3 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:13px;">
                                    <span style="color:rgba(255,255,255,0.45);">Tầng 3 (1.4 TB):</span>
                                    <span style="color:#fff; font-weight:bold;" id="v27-size-l3">0 TB</span>
                                </div>
                                <div class="v27-progress-container" style="height:12px;">
                                    <div class="v27-progress-fill" id="v27-bar-l3" style="width:0%; background-color:#2563eb;"></div>
                                </div>
                            </div>

                            <!-- Layer 4 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:13px;">
                                    <span style="color:rgba(255,255,255,0.45);">Tầng 4 (22 TB):</span>
                                    <span style="color:#fff; font-weight:bold;" id="v27-size-l4">0 TB</span>
                                </div>
                                <div class="v27-progress-container" style="height:12px;">
                                    <div class="v27-progress-fill" id="v27-bar-l4" style="width:0%; background-color:#1d4ed8;"></div>
                                </div>
                            </div>

                            <!-- Layer 5 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:13px;">
                                    <span style="color:#ef4444; font-weight:bold;">Tầng 5 (4.5 PB!):</span>
                                    <span style="color:#ef4444; font-weight:bold;" id="v27-size-l5">0 PB</span>
                                </div>
                                <div class="v27-progress-container" style="height:12px;">
                                    <div class="v27-progress-fill" id="v27-bar-l5" style="width:0%; background-color:#ef4444;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_9') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <!-- STATIC SYSTEM CONSOLE WITH NO SHAKING -->
                    <div class="glass-card" style="padding:18px; border:1.5px solid rgba(255,255,255,0.06); border-radius:20px; background:#0c0f17; width:100%;">
                        <div style="font-size:16px; font-weight:900; color:#ef4444; border-bottom:1px solid rgba(239,68,68,0.2); padding-bottom:8px; margin-bottom:16px; text-transform:uppercase; text-align:center; display:flex; justify-content:center; align-items:center; gap:8px; letter-spacing:0.8px;">
                            <i data-lucide="cpu" style="width:18px; height:18px;"></i>
                            <span>Hiệu suất phần cứng máy chủ</span>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:12px; text-align:left;">
                            <!-- CPU Usage -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px; letter-spacing:0.5px;">
                                    <span>CPU Usage:</span>
                                    <span id="v27-cpu-val" style="color:#10b981;">15%</span>
                                </div>
                                <div class="v27-progress-container">
                                    <div class="v27-progress-fill" id="v27-cpu-bar" style="width:15%; background-color:#10b981;"></div>
                                </div>
                            </div>
                            
                            <!-- RAM Usage -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px; letter-spacing:0.5px;">
                                    <span>Memory (RAM) Usage:</span>
                                    <span id="v27-ram-val" style="color:#10b981;">30%</span>
                                </div>
                                <div class="v27-progress-container">
                                    <div class="v27-progress-fill" id="v27-ram-bar" style="width:30%; background-color:#10b981;"></div>
                                </div>
                            </div>

                            <!-- Disk Usage -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px; letter-spacing:0.5px;">
                                    <span>Disk Storage Space:</span>
                                    <span id="v27-disk-val" style="color:#10b981;">5%</span>
                                </div>
                                <div class="v27-progress-container">
                                    <div class="v27-progress-fill" id="v27-disk-bar" style="width:5%; background-color:#10b981;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Warning Alert (Static glowing error - No shake) -->
                    <div class="glass-card v27-warning-card" id="v27-alert-box" style="padding:12px 16px; border-radius:16px; display:flex; align-items:center; justify-content:center; gap:10px; opacity:0; transform:translateY(12px); transition:all 0.3s; width:100%;">
                        <i data-lucide="alert-octagon" style="width:24px; height:24px; color:#ef4444; flex-shrink: 0;"></i>
                        <span style="font-size:14px; color:#ef4444; font-weight:900; letter-spacing:0.5px; text-align:left;">🚨 CRITICAL ERROR: STORAGE OVERFLOW & CRASH!</span>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_10') {
            canvas.innerHTML = `
                <div class="v27-zoom-container">
                    <!-- SINGLE INTEGRATED SECURITY PANEL - Split horizontal visual -->
                    <div class="glass-card v27-shield-active" style="padding:18px; border:2px solid rgba(16,185,129,0.25); border-radius:20px; background:#0c0f17; display:flex; flex-direction:column; gap:16px; width:100%;">
                        
                        <div style="font-size:15px; font-weight:900; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; width:100%; text-transform:uppercase; text-align:left; letter-spacing:0.8px;">
                            Lá chắn phòng vệ Antivirus
                        </div>

                        <div style="display:flex; align-items:center; gap:20px;">
                            <!-- Shield status block -->
                            <div style="display:flex; flex-direction:column; align-items:center; gap:8px; flex:1;">
                                <i data-lucide="shield-check" id="v27-shield-icon" style="width:75px; height:75px; color:#10b981; filter:drop-shadow(0 2px 5px rgba(0,0,0,0.3)); transition: all 0.3s;"></i>
                                <div class="glass-card" style="padding:6px; border:1px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.06); border-radius:10px; font-weight:900; color:#10b981; font-size:12px; text-align:center; opacity:0; transition:all 0.3s;" id="v27-shield-badge">
                                    CHẶN ĐỨNG
                                </div>
                            </div>

                            <!-- Rules status checklist -->
                            <div style="flex:1.5; text-align:left; display:flex; flex-direction:column; gap:12px;">
                                <div>
                                    <div style="font-size:11px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">1. Độ sâu đệ quy (≤ 3)</div>
                                    <div style="font-size:13px; font-weight:bold; color:#fff; margin-top:2px; letter-spacing:0.5px;" id="v27-rule-depth">Đang phân tích...</div>
                                </div>
                                <div>
                                    <div style="font-size:11px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">2. Tỷ lệ nén (≤ 1000:1)</div>
                                    <div style="font-size:13px; font-weight:bold; color:#fff; margin-top:2px; letter-spacing:0.5px;" id="v27-rule-ratio">Đang phân tích...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_zipbomb_11') {
            canvas.innerHTML = `
                <div class="v27-zoom-container" style="justify-content: center; gap: 32px;">
                    <!-- Concentric circles radar with archive folder -->
                    <div style="position:relative; width:220px; height:220px; display:flex; align-items:center; justify-content:center;">
                        <div class="v27-orbit-ring v27-orbit-1" style="position:absolute; width:180px; height:180px; animation: v27-bomb-pulse 2s infinite;"></div>
                        <div class="v27-orbit-ring v27-orbit-2" style="position:absolute; width:240px; height:240px; animation: v27-bomb-pulse 3s infinite reverse;"></div>
                        <i data-lucide="folder-archive" style="width:110px; height:110px; color:#ef4444; filter:drop-shadow(0 0 20px rgba(239, 68, 68, 0.5)); z-index:2; animation: v27-float 4s ease-in-out infinite;"></i>
                        <div style="position:absolute; top:20px; right:20px; animation: v27-float 3s ease-in-out infinite;"><i data-lucide="bomb" style="width:32px; height:32px; color:#f59e0b;"></i></div>
                        <div style="position:absolute; bottom:20px; left:20px; animation: v27-float 5s ease-in-out infinite;"><i data-lucide="alert-triangle" style="width:28px; height:28px; color:#ef4444;"></i></div>
                    </div>
                    <!-- Premium Text Summary Card -->
                    <div class="glass-card" style="padding:18px 24px; border:2px solid rgba(239, 68, 68, 0.25); background:rgba(239, 68, 68, 0.03); border-radius:16px; text-align:center; width:100%; max-width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6); animation: v27-float 6s ease-in-out infinite 1s;">
                        <div style="font-size:16px; font-weight:800; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.8px;">
                            ZIP BOMB SUMMARY
                        </div>
                        <div style="font-size:15px; color:#94a3b8; line-height:1.6; font-weight:bold;">
                            42 KB ➔ 4.5 Petabytes (Tỷ lệ nén 100M:1)
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
        if (slideId === 'slide_zipbomb_1') {
            const spark = canvas.querySelector('.v27-fuse-spark');
            if (spark) {
                const pulse = Math.abs(Math.sin(progress * 25 * Math.PI));
                spark.style.transform = `scale(${0.9 + pulse * 0.3})`;
            }
        }
        else if (slideId === 'slide_zipbomb_2') {
            const statusText = canvas.querySelector('#v27-scan-status');
            const dot = canvas.querySelector('.v27-transit-dot');
            if (dot) {
                // Animate position along path
                dot.style.left = `${15 + progress * 70}%`;
            }
            if (statusText) {
                if (progress < 0.3) {
                    statusText.textContent = 'Nhận email tệp đính kèm: 42.zip';
                    statusText.style.color = '#3b82f6';
                } else if (progress >= 0.3 && progress < 0.7) {
                    statusText.textContent = 'Đang tự động quét bảo mật...';
                    statusText.style.color = '#f59e0b';
                } else {
                    statusText.textContent = 'Cảnh báo: Phát hiện Zip Bomb!';
                    statusText.style.color = '#ef4444';
                }
            }
        }
        else if (slideId === 'slide_zipbomb_3') {
            const sourceCard = canvas.querySelector('#v27-slide3-source');
            if (progress >= 0.2) {
                if (sourceCard) {
                    sourceCard.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    sourceCard.style.background = 'rgba(239, 68, 68, 0.1)';
                }
                // Cascade display folders in the grid
                for (let i = 0; i < 16; i++) {
                    const item = canvas.querySelector(`#v27-folder-${i}`);
                    if (item) {
                        const triggerPoint = 0.2 + (i * 0.04);
                        if (progress >= triggerPoint) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    }
                }
            } else {
                if (sourceCard) {
                    sourceCard.style.borderColor = 'rgba(245, 158, 11, 0.25)';
                    sourceCard.style.background = 'rgba(245, 158, 11, 0.1)';
                }
                for (let i = 0; i < 16; i++) {
                    const item = canvas.querySelector(`#v27-folder-${i}`);
                    if (item) item.classList.remove('active');
                }
            }
        }
        else if (slideId === 'slide_zipbomb_4') {
            const d0 = canvas.querySelector('#doll-0');
            const d1 = canvas.querySelector('#doll-1');
            const d2 = canvas.querySelector('#doll-2');
            const d3 = canvas.querySelector('#doll-3');
            const d4 = canvas.querySelector('#doll-4');

            if (progress >= 0.1 && d0) {
                d0.style.borderColor = '#3b82f6';
            }
            if (progress >= 0.3 && d1) {
                d1.style.opacity = '1';
                d1.style.transform = 'scale(1)';
                d1.style.borderColor = '#2563eb';
            } else if (d1) {
                d1.style.opacity = '0.15';
                d1.style.transform = 'scale(0.97)';
                d1.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
            if (progress >= 0.5 && d2) {
                d2.style.opacity = '1';
                d2.style.transform = 'scale(1)';
                d2.style.borderColor = '#1d4ed8';
            } else if (d2) {
                d2.style.opacity = '0.15';
                d2.style.transform = 'scale(0.97)';
                d2.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
            if (progress >= 0.7 && d3) {
                d3.style.opacity = '1';
                d3.style.transform = 'scale(1)';
                d3.style.borderColor = '#f59e0b';
            } else if (d3) {
                d3.style.opacity = '0.15';
                d3.style.transform = 'scale(0.97)';
                d3.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
            if (progress >= 0.85 && d4) {
                d4.style.opacity = '1';
                d4.style.transform = 'scale(1)';
                d4.style.borderColor = '#ef4444';
            } else if (d4) {
                d4.style.opacity = '0.15';
                d4.style.transform = 'scale(0.97)';
                d4.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        }
        else if (slideId === 'slide_zipbomb_5') {
            const mathRes = canvas.querySelector('#v27-math-res');
            if (mathRes) {
                if (progress < 0.2) {
                    mathRes.textContent = '16';
                } else if (progress >= 0.2 && progress < 0.4) {
                    mathRes.textContent = '256';
                } else if (progress >= 0.4 && progress < 0.6) {
                    mathRes.textContent = '4.096';
                } else if (progress >= 0.6 && progress < 0.8) {
                    mathRes.textContent = '65.536';
                } else {
                    mathRes.textContent = '1.048.576';
                }
            }
        }
        else if (slideId === 'slide_zipbomb_6') {
            const track = canvas.querySelector('#v27-ticker-track');
            if (track) {
                const elements = track.querySelectorAll('.v27-ticker-text');
                elements.forEach(el => {
                    if (progress > 0.4) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                });
            }
        }
        else if (slideId === 'slide_zipbomb_7') {
            const expPerc = canvas.querySelector('#v27-expl-perc-1');
            const sizeT1 = canvas.querySelector('#v27-exp-size-t1');
            const barT1 = canvas.querySelector('#v27-exp-bar-t1');
            const sizeT2 = canvas.querySelector('#v27-exp-size-t2');
            const barT2 = canvas.querySelector('#v27-exp-bar-t2');

            const percent = Math.round(progress * 100);
            if (expPerc) expPerc.textContent = `${percent}%`;

            // Layer 1 decompression (Tầng 1) occupies first 50% of slide progress
            if (progress < 0.5) {
                const subRatio = progress / 0.5;
                const currentGB = (subRatio * 5.5).toFixed(1);
                if (sizeT1) sizeT1.textContent = `${currentGB} GB / 5.5 GB`;
                if (barT1) barT1.style.width = `${subRatio * 100}%`;
                
                if (sizeT2) sizeT2.textContent = '0 GB / 88 GB';
                if (barT2) barT2.style.width = '0%';
            } else {
                // Layer 1 full
                if (sizeT1) sizeT1.textContent = '5.5 GB / 5.5 GB';
                if (barT1) barT1.style.width = '100%';

                // Layer 2 decompression (Tầng 2) occupies the rest 50%
                const subRatio = (progress - 0.5) / 0.5;
                const currentGB = (subRatio * 88).toFixed(1);
                if (sizeT2) sizeT2.textContent = `${currentGB} GB / 88 GB`;
                if (barT2) barT2.style.width = `${subRatio * 100}%`;
            }
        }
        else if (slideId === 'slide_zipbomb_8') {
            const sizeL3 = canvas.querySelector('#v27-size-l3');
            const barL3 = canvas.querySelector('#v27-bar-l3');
            const sizeL4 = canvas.querySelector('#v27-size-l4');
            const barL4 = canvas.querySelector('#v27-bar-l4');
            const sizeL5 = canvas.querySelector('#v27-size-l5');
            const barL5 = canvas.querySelector('#v27-bar-l5');

            // Decompress Layer 3, 4, 5 sequentially
            if (progress < 0.33) {
                const r = progress / 0.33;
                if (sizeL3) sizeL3.textContent = `${(r * 1.4).toFixed(1)} TB`;
                if (barL3) barL3.style.width = `${r * 100}%`;

                if (sizeL4) sizeL4.textContent = '0 TB';
                if (barL4) barL4.style.width = '0%';
                if (sizeL5) sizeL5.textContent = '0 PB';
                if (barL5) barL5.style.width = '0%';
            } else if (progress >= 0.33 && progress < 0.66) {
                if (sizeL3) sizeL3.textContent = '1.4 TB';
                if (barL3) barL3.style.width = '100%';

                const r = (progress - 0.33) / 0.33;
                if (sizeL4) sizeL4.textContent = `${(r * 22).toFixed(1)} TB`;
                if (barL4) barL4.style.width = `${r * 100}%`;

                if (sizeL5) sizeL5.textContent = '0 PB';
                if (barL5) barL5.style.width = '0%';
            } else {
                if (sizeL3) sizeL3.textContent = '1.4 TB';
                if (barL3) barL3.style.width = '100%';
                if (sizeL4) sizeL4.textContent = '22 TB';
                if (barL4) barL4.style.width = '100%';

                const r = (progress - 0.66) / 0.34;
                if (sizeL5) sizeL5.textContent = `${(r * 4.5).toFixed(1)} PB!`;
                if (barL5) barL5.style.width = `${r * 100}%`;
            }
        }
        else if (slideId === 'slide_zipbomb_9') {
            const cpuVal = canvas.querySelector('#v27-cpu-val');
            const cpuBar = canvas.querySelector('#v27-cpu-bar');
            const ramVal = canvas.querySelector('#v27-ram-val');
            const ramBar = canvas.querySelector('#v27-ram-bar');
            const diskVal = canvas.querySelector('#v27-disk-val');
            const diskBar = canvas.querySelector('#v27-disk-bar');
            const alertBox = canvas.querySelector('#v27-alert-box');

            // Dynamic hardware dâng cao
            const cpu = Math.round(15 + progress * 85);
            const ram = Math.round(30 + progress * 70);
            const disk = Math.round(5 + progress * 95);

            if (cpuVal) cpuVal.textContent = `${cpu}%`;
            if (cpuBar) {
                cpuBar.style.width = `${cpu}%`;
                cpuBar.style.backgroundColor = cpu > 85 ? '#ef4444' : (cpu > 55 ? '#f59e0b' : '#10b981');
            }

            if (ramVal) ramVal.textContent = `${ram}%`;
            if (ramBar) {
                ramBar.style.width = `${ram}%`;
                ramBar.style.backgroundColor = ram > 85 ? '#ef4444' : (ram > 55 ? '#f59e0b' : '#10b981');
            }

            if (diskVal) diskVal.textContent = `${disk}%`;
            if (diskBar) {
                diskBar.style.width = `${disk}%`;
                diskBar.style.backgroundColor = disk > 85 ? '#ef4444' : (disk > 55 ? '#f59e0b' : '#10b981');
            }

            if (progress >= 0.65) {
                if (alertBox) {
                    alertBox.style.opacity = '1';
                    alertBox.style.transform = 'translateY(0)';
                }
            } else {
                if (alertBox) {
                    alertBox.style.opacity = '0';
                    alertBox.style.transform = 'translateY(12px)';
                }
            }
        }
        else if (slideId === 'slide_zipbomb_10') {
            const ruleDepth = canvas.querySelector('#v27-rule-depth');
            const ruleRatio = canvas.querySelector('#v27-rule-ratio');
            const badge = canvas.querySelector('#v27-shield-badge');
            const icon = canvas.querySelector('#v27-shield-icon');

            if (progress >= 0.3) {
                if (ruleDepth) {
                    ruleDepth.textContent = 'Phát hiện: 5 tầng (Tối đa ≤ 3)';
                    ruleDepth.style.color = '#ef4444';
                }
            } else {
                if (ruleDepth) {
                    ruleDepth.textContent = 'Đang phân tích độ sâu...';
                    ruleDepth.style.color = '#fff';
                }
            }

            if (progress >= 0.6) {
                if (ruleRatio) {
                    ruleRatio.textContent = 'Phát hiện: 100M:1 (Tối đa ≤ 1000:1)';
                    ruleRatio.style.color = '#ef4444';
                }
                if (badge) {
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                }
                if (icon) {
                    icon.style.color = '#10b981';
                }
            } else {
                if (ruleRatio) {
                    ruleRatio.textContent = 'Đang phân tích tỷ lệ nén...';
                    ruleRatio.style.color = '#fff';
                }
                if (badge) {
                    badge.style.opacity = '0';
                    badge.style.transform = 'scale(0.9)';
                }
                if (icon) {
                    icon.style.color = '#f59e0b';
                }
            }
        }
        else if (slideId === 'slide_zipbomb_11') {
            // Pure CSS keyframes
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video27',
        topic: 'Cơ chế Zip Bomb',
        episodeNum: 27,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video27 Plugin] Loaded: ZIP BOMB premium 11 slides ready.');
})();
