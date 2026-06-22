/**
 * Video 22: Spotify Shuffle Algorithm - Ngẫu nhiên hơn hay Ít ngẫu nhiên hơn?
 * Plugin file - chứa toàn bộ slide animation/HTML cho video22
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    // Empty to remove the small cluttered keyword tag cloud from the top of the canvas
    const keywordsData = {};

    const customSlideIds = [
        'slide_spotify_shuffle_1', 'slide_spotify_shuffle_2', 'slide_spotify_shuffle_3', 
        'slide_spotify_shuffle_4', 'slide_spotify_shuffle_5', 'slide_spotify_shuffle_6'
    ];

    // Helper: Generate random cylinder chars with the active char fixed at center index 8
    function makeColumnChars(activeChar) {
        const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let result = [];
        for (let i = 0; i < 15; i++) {
            if (i === 8) {
                result.push(activeChar);
            } else {
                let c;
                do {
                    c = charset[Math.floor(Math.random() * charset.length)];
                } while (c === activeChar || result.includes(c));
                result.push(c);
            }
        }
        return result;
    }

    // Helper: Render slot reel column
    function makeBase62ColumnHTML(activeChar, colIdx) {
        const columnChars = makeColumnChars(activeChar);
        let html = `<div class="reel-container reel-col-${colIdx}" data-active-idx="8" style="position: relative; width: 44px; height: 140px; overflow: hidden; background: rgba(5,5,10,0.7); border: 1.5px solid rgba(245, 158, 11, 0.2); border-radius: 8px; box-shadow: inset 0 0 15px rgba(0,0,0,0.9), 0 0 10px rgba(245,158,11,0.05); display: flex; justify-content: center;">`;
        html += `<div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%); pointer-events: none; z-index: 10;"></div>`;
        html += `<div style="position: absolute; top: 0; left: 0; right: 0; height: 45px; background: linear-gradient(to bottom, #0c0f17 100%, transparent); opacity: 0.95; pointer-events: none; z-index: 5;"></div>`;
        html += `<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 45px; background: linear-gradient(to top, #0c0f17 100%, transparent); opacity: 0.95; pointer-events: none; z-index: 5;"></div>`;
        html += `<div style="position: absolute; top: 52px; left: 2px; right: 2px; height: 36px; border-top: 1px dashed rgba(245, 158, 11, 0.45); border-bottom: 1px dashed rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.05); pointer-events: none; z-index: 4;"></div>`;
        
        html += `<div class="b62-column-strip" style="position:absolute; top:0; display:flex; flex-direction:column; align-items:center; gap:0; padding:52px 0; width: 100%;">`;
        columnChars.forEach((char) => {
            const isActive = char === activeChar;
            const color = isActive ? '#f59e0b' : 'rgba(255,255,255,0.2)';
            const scale = isActive ? 'scale(1.25)' : 'scale(0.85)';
            const fontWeight = isActive ? 'bold' : '500';
            const textShadow = isActive ? '0 0 10px rgba(245, 158, 11, 0.7)' : 'none';
            html += `<span class="b62-char" data-char="${char}" style="font-size:22px; font-family:monospace; color:${color}; transform:${scale}; font-weight:${fontWeight}; height:36px; line-height:36px; text-shadow:${textShadow}; transition: all 0.2s;">${char}</span>`;
        });
        html += `</div></div>`;
        return html;
    }

    // Helper: Make visual digital odometer container
    function makeOdometerHTML(numDigits) {
        let html = `<div class="odometer-container" style="display:flex; justify-content:center; gap:3px;">`;
        for (let i = 0; i < numDigits; i++) {
            html += `<div class="digit-card" id="odo-digit-${i}">0</div>`;
        }
        html += `</div>`;
        return html;
    }

    // Helper: Make 2D dot cloud for Slide 2
    function makeDotCloudHTML(isClustered) {
        // Red (Artist A), Blue (Artist B), Green (Artist C)
        const colors = ['#ef4444', '#3b82f6', '#10b981'];
        let dots = [];
        
        if (isClustered) {
            // Grouped clusters (reality of math random)
            // Cluster 1 (Red)
            dots.push({ x: 40, y: 50, c: 0 }, { x: 70, y: 60, c: 0 }, { x: 55, y: 90, c: 0 });
            // Cluster 2 (Blue)
            dots.push({ x: 160, y: 150, c: 1 }, { x: 185, y: 135, c: 1 }, { x: 170, y: 175, c: 1 });
            // Scattered
            dots.push({ x: 190, y: 50, c: 2 }, { x: 50, y: 160, c: 2 }, { x: 110, y: 110, c: 1 });
        } else {
            // Evenly spaced / distributed (human expectation)
            dots.push({ x: 50, y: 50, c: 0 }, { x: 120, y: 60, c: 1 }, { x: 190, y: 50, c: 2 });
            dots.push({ x: 55, y: 120, c: 2 }, { x: 120, y: 130, c: 0 }, { x: 185, y: 120, c: 1 });
            dots.push({ x: 50, y: 190, c: 1 }, { x: 120, y: 200, c: 2 }, { x: 190, y: 190, c: 0 });
        }

        let html = `<div style="position:relative; width:240px; height:240px; background:rgba(0,0,0,0.55); border:1.5px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; box-shadow: inset 0 0 15px rgba(0,0,0,0.6);">`;
        dots.forEach((d) => {
            html += `<div style="position:absolute; left:${d.x}px; top:${d.y}px; width:18px; height:18px; border-radius:50%; background:${colors[d.c]}; box-shadow:0 0 10px ${colors[d.c]};"></div>`;
        });
        html += `</div>`;
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_spotify_shuffle_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; zoom:1.0;">
                        <!-- Spotify Phone Mockup - Scaled up significantly for maximum wow effect -->
                        <div class="glass-card" style="width:440px; height:560px; border:2.5px solid rgba(255,255,255,0.1); border-radius:32px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; background:#121212; position:relative; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.95); box-sizing:border-box;">
                            
                            <!-- Header phone -->
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.08); padding-bottom:10px;">
                                <span style="font-size:14px; font-weight:bold; color:var(--spotify-green); letter-spacing:1.5px; font-family:sans-serif;">PLAYING FROM SHUFFLE</span>
                                <i data-lucide="music-2" style="color:var(--spotify-green); width:20px; height:20px;"></i>
                            </div>

                            <!-- Warning alert box (slides down on same artist clump) -->
                            <div class="cluster-alert-badge" style="position:absolute; top:-70px; left:28px; right:28px; padding:12px; border-radius:12px; border:1.5px solid #ef4444; color:#fff; font-size:13px; font-family:sans-serif; text-align:center; transition: all 0.5s ease-in-out; z-index:10; display:flex; align-items:center; justify-content:center; gap:8px;">
                                <i data-lucide="alert-triangle" style="width:18px; height:18px; color:#ef4444;"></i>
                                <span style="font-weight:bold;">Gặp cụm: Ca sĩ A hát liên tiếp!</span>
                            </div>

                            <!-- Vinyl Rotating Disc (Enlarged) -->
                            <div style="position:relative; width:240px; height:240px; margin:25px auto; display:flex; align-items:center; justify-content:center; z-index:2;">
                                <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(29,185,84,0.3) 0%, transparent 70%); filter:blur(20px);"></div>
                                <div class="vinyl-disc-spin" style="width:220px; height:220px; border-radius:50%; background:repeating-radial-gradient(circle, #222 0px, #222 4px, #111 4px, #111 8px); border:4px solid #000; display:flex; align-items:center; justify-content:center; box-shadow: 0 12px 30px rgba(0,0,0,0.75);">
                                    <div style="width:70px; height:70px; border-radius:50%; background:var(--spotify-green); border:4px solid #121212; display:flex; align-items:center; justify-content:center;">
                                        <span style="font-size:32px;">🎵</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Song Details -->
                            <div style="z-index:2; text-align:center;">
                                <div style="font-size:26px; font-weight:bold; color:#fff;" class="song-title">Song by Artist A</div>
                                <div style="font-size:18px; color:var(--spotify-text); margin-top:6px;" class="artist-name">Artist A (Album 1)</div>
                            </div>

                            <!-- Mini Player Buttons -->
                            <div style="display:flex; justify-content:center; align-items:center; gap:25px; margin-top:15px; z-index:2;">
                                <i data-lucide="shuffle" style="color:var(--spotify-green); width:24px; height:24px; cursor:pointer;" class="pulse-glow"></i>
                                <i data-lucide="skip-back" style="color:#fff; width:22px; height:22px;"></i>
                                <div style="width:50px; height:50px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3);">
                                    <i data-lucide="pause" style="color:#000; width:22px; height:22px; fill:#000;"></i>
                                </div>
                                <i data-lucide="skip-forward" style="color:#fff; width:22px; height:22px;"></i>
                                <i data-lucide="repeat" style="color:#fff; width:22px; height:22px;"></i>
                            </div>

                            <!-- Timeline progress slider -->
                            <div style="z-index:2; margin-top:12px;">
                                <div style="width:100%; height:6px; background:#535353; border-radius:3px; position:relative; overflow:hidden;">
                                    <div class="player-prog-fill" style="height:100%; background:var(--spotify-green); width:0%;"></div>
                                </div>
                                <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--spotify-text); margin-top:6px; font-family:monospace;">
                                    <span class="player-time-elapsed">0:00</span>
                                    <span>2:45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_spotify_shuffle_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Comparison Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Sự khác biệt giữa Toán Học và Nhận Thức con người</div>

                            <!-- Absolute position content box -->
                            <div style="position:relative; width:820px; height:320px; margin: 10px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Left side: Mathematical Random -->
                                <div style="position:absolute; left:50px; top:0; width:280px; display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:15px; font-weight:bold; color:#ef4444;">1. Ngẫu nhiên Toán Học (True Random)</span>
                                    ${makeDotCloudHTML(true)}
                                    <div style="font-size:13px; color:#94a3b8; text-align:center; height:35px; margin-top:2px;">Có xác suất trùng hợp ngẫu nhiên.<br><span style="color:#ef4444; font-weight:bold;">Xuất hiện cụm sát nhau!</span></div>
                                </div>

                                <!-- Center: VS -->
                                <div style="position:absolute; left:360px; top:90px; width:100px; display:flex; flex-direction:column; align-items:center; gap:20px;">
                                    <i data-lucide="arrow-right-left" style="color:rgba(255,255,255,0.2); width:32px; height:32px;" class="icon-pulse"></i>
                                    <div class="vs-meter" style="padding:4px 12px; border-radius:6px; background:rgba(245,158,11,0.12); color:var(--gold-primary); font-family:monospace; font-weight:bold; font-size:15px;">VS</div>
                                </div>

                                <!-- Right side: Human Expectation of Random -->
                                <div style="position:absolute; left:490px; top:0; width:280px; display:flex; flex-direction:column; align-items:center; gap:10px;">
                                    <span style="font-size:15px; font-weight:bold; color:#10b981;">2. Con người kỳ vọng (Balanced)</span>
                                    ${makeDotCloudHTML(false)}
                                    <div style="font-size:13px; color:#94a3b8; text-align:center; height:35px; margin-top:2px;">Các bài hát phải rải rác đều nhau.<br><span style="color:#10b981; font-weight:bold;">Không muốn ca sĩ lặp lại gần!</span></div>
                                </div>

                                <!-- Dynamic rating labels sliding under -->
                                <div class="rating-bubble-left" style="position:absolute; left:70px; top:292px; width:240px; padding:6px; border-radius:8px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); font-size:13px; color:#f87171; text-align:center; opacity:0; transition:all 0.5s;">
                                    Người nghe phàn nàn: "Shuffle bị lỗi rồi!"
                                </div>
                                <div class="rating-bubble-right" style="position:absolute; left:510px; top:292px; width:240px; padding:6px; border-radius:8px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); font-size:13px; color:#34d399; text-align:center; opacity:0; transition:all 0.5s;">
                                    Người nghe hài lòng: "Rất ngẫu nhiên!"
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_spotify_shuffle_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Fisher-Yates Slide Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Thuật toán Fisher-Yates Shuffle (Ngẫu nhiên tuyệt đối)</div>
                                <div style="font-size:14px; background:rgba(59,130,246,0.15); padding:2px 10px; border-radius:6px; color:#60a5fa; font-family:monospace; font-weight:bold;">Độ phức tạp: O(N)</div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Swap elements array (enlarged cards slightly) -->
                                <div style="display:flex; gap:16px; justify-content:center; align-items:center; width:100%; position:absolute; left:0; top:55px; height:90px;" class="fy-array-box">
                                    <!-- Colors: Red (Artist A), Blue (Artist B), Green (Artist C) -->
                                    <div class="song-track-card track-0" style="width:100px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">A1</div>
                                    <div class="song-track-card track-1" style="width:100px; height:70px; background:#3b82f6; border-radius:12px; border:2px solid #3b82f6; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">B1</div>
                                    <div class="song-track-card track-2" style="width:100px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">A2</div>
                                    <div class="song-track-card track-3" style="width:100px; height:70px; background:#10b981; border-radius:12px; border:2px solid #10b981; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">C1</div>
                                    <div class="song-track-card track-4" style="width:100px; height:70px; background:#3b82f6; border-radius:12px; border:2px solid #3b82f6; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">B2</div>
                                    <div class="song-track-card track-5" style="width:100px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">A3</div>
                                    <div class="song-track-card track-6" style="width:100px; height:70px; background:#10b981; border-radius:12px; border:2px solid #10b981; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; color:#fff; font-size:16px;">C2</div>
                                </div>

                                <!-- SVG overlay for swap indicator arrows -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="fy-arrows-svg">
                                    <path d="" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-dasharray="4,4" class="swap-path-arrow" style="display:none;"></path>
                                </svg>

                                <!-- Text explanation console and warnings -->
                                <div style="position:absolute; left:120px; top:180px; width:580px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:15px; font-family:monospace; text-align:left; font-size:13px;">
                                    <div style="color:var(--gold-primary); font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px; margin-bottom:6px;">Console: Fisher-Yates xáo trộn ngẫu nhiên</div>
                                    <div class="fy-console-text" style="color:#d1d5db; line-height:1.5;">Đang bắt đầu xáo trộn ngẫu nhiên các phần tử...</div>
                                </div>

                                <!-- Cluster Warning Banner -->
                                <div class="fy-cluster-alert-panel" style="position:absolute; left:210px; top:5px; width:400px; padding:8px 15px; border-radius:10px; background:rgba(239,68,68,0.12); border:1.5px solid #ef4444; color:#fff; text-align:center; font-size:13px; font-weight:bold; opacity:0; transition:all 0.4s; display:flex; align-items:center; justify-content:center; gap:8px; z-index:3;">
                                    <i data-lucide="alert-octagon" style="width:16px; height:16px; color:#ef4444;"></i>
                                    <span>LỖI CHÙNG CỤM: [A2] [A3] xếp cạnh nhau!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_spotify_shuffle_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Balanced Shuffle Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Thuật toán Balanced Shuffle (Trải đều Halftoning)</div>
                                <div style="font-size:14px; background:rgba(16,185,129,0.12); padding:2px 10px; border-radius:6px; color:#10b981; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="check" style="width:14px; height:14px;"></i> Ngăn ngừa trùng cụm
                                </div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Grouped Artist buckets (Top row) -->
                                <div style="position:absolute; left:10px; top:10px; display:flex; gap:30px; justify-content:center; width:100%;">
                                    <div class="bucket-a" style="border:1px dashed rgba(239,68,68,0.4); padding:10px; border-radius:12px; display:flex; gap:6px; background:rgba(239,68,68,0.02);">
                                        <span style="font-size:12px; color:#ef4444; font-weight:bold; writing-mode:vertical-lr; text-align:center;">Ca sĩ A</span>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-a1">A1</div>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-a2">A2</div>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-a3">A3</div>
                                    </div>

                                    <div class="bucket-b" style="border:1px dashed rgba(59,130,246,0.4); padding:10px; border-radius:12px; display:flex; gap:6px; background:rgba(59,130,246,0.02);">
                                        <span style="font-size:12px; color:#3b82f6; font-weight:bold; writing-mode:vertical-lr; text-align:center;">Ca sĩ B</span>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#3b82f6; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-b1">B1</div>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#3b82f6; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-b2">B2</div>
                                    </div>

                                    <div class="bucket-c" style="border:1px dashed rgba(16,185,129,0.4); padding:10px; border-radius:12px; display:flex; gap:6px; background:rgba(16,185,129,0.02);">
                                        <span style="font-size:12px; color:#10b981; font-weight:bold; writing-mode:vertical-lr; text-align:center;">Ca sĩ C</span>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-c1">C1</div>
                                        <div style="width:42px; height:42px; border-radius:6px; background:#10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:13px;" class="card-b-c2">C2</div>
                                    </div>
                                </div>

                                <!-- Timeline Playlist targets (Bottom row) -->
                                <div style="position:absolute; left:41px; top:180px; display:flex; gap:18px; justify-content:center; width:738px;" class="balanced-playlist-timeline">
                                    <div class="timeline-slot slot-0" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">01</div>
                                    <div class="timeline-slot slot-1" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">02</div>
                                    <div class="timeline-slot slot-2" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">03</div>
                                    <div class="timeline-slot slot-3" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">04</div>
                                    <div class="timeline-slot slot-4" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">05</div>
                                    <div class="timeline-slot slot-5" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">06</div>
                                    <div class="timeline-slot slot-6" style="width:90px; height:70px; border:1.5px dashed rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2); font-family:monospace; font-size:13px; font-weight:bold; position:relative; box-sizing:border-box;">07</div>
                                </div>

                                <!-- SVG overlay for allocation paths -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="alloc-lines-svg">
                                    <!-- Guides will draw here during progress -->
                                </svg>

                                <!-- Informative label overlay -->
                                <div style="position:absolute; left:80px; top:270px; width:660px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:10px; padding:10px; font-size:12px; color:#d1d5db; text-align:center;" class="balanced-explanation">
                                    Bước 1: Tính khoảng cách chia đều cho Ca sĩ A (Ví dụ: Tổng 7 bài / 3 bài ca sĩ A = Cứ 2.3 bài xếp 1 bài)
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_spotify_shuffle_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Jitter Slide Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">Cơ chế ngẫu nhiên Jitter Offset (Tránh cứng nhắc)</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.15); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">Balanced + Random Jitter</div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Song Array layout with spacing (enlarged cards to 90px x 70px) -->
                                <div style="display:flex; gap:18px; justify-content:center; align-items:center; width:780px; position:absolute; left:20px; top:60px; height:80px;" class="jitter-array-box">
                                    <div class="song-track-card jt-0" style="width:90px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">A1</div>
                                    <div class="song-track-card jt-1" style="width:90px; height:70px; background:#3b82f6; border-radius:12px; border:2px solid #3b82f6; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">B1</div>
                                    <div class="song-track-card jt-2" style="width:90px; height:70px; background:#10b981; border-radius:12px; border:2px solid #10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">C1</div>
                                    <div class="song-track-card jt-3" style="width:90px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">A2</div>
                                    <div class="song-track-card jt-4" style="width:90px; height:70px; background:#3b82f6; border-radius:12px; border:2px solid #3b82f6; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">B2</div>
                                    <div class="song-track-card jt-5" style="width:90px; height:70px; background:#10b981; border-radius:12px; border:2px solid #10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">C2</div>
                                    <div class="song-track-card jt-6" style="width:90px; height:70px; background:#ef4444; border-radius:12px; border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px; position:relative;">A3</div>
                                </div>

                                <!-- Explanation note -->
                                <div style="position:absolute; left:120px; top:180px; width:580px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:15px; font-family:monospace; text-align:left; font-size:13px;">
                                    <div style="color:var(--gold-primary); font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px; margin-bottom:6px;">Cơ chế hoạt động của Jitter</div>
                                    <div class="jt-console-text" style="color:#d1d5db; line-height:1.5;">Các bài hát đang được trải đều cố định theo công thức halftoning. Chuẩn bị thêm Jitter để hoán đổi nhỏ vài vị trí nhằm duy trì tính bất ngờ...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_spotify_shuffle_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:1.0;">
                        <!-- Simulator Live Card -->
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:500px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary);">So sánh mô phỏng các luồng phát nhạc (Shuffle Stream)</div>
                                <div style="font-size:14px; background:rgba(29,185,84,0.15); padding:2px 10px; border-radius:6px; color:var(--spotify-green); font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="music" style="width:14px; height:14px;"></i> Live Compare
                                </div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Top Stream: Fisher-Yates (Absolute Random) -->
                                <div style="position:absolute; left:20px; top:10px; width:780px; height:90px; border-radius:12px; border:1.5px solid rgba(239,68,68,0.2); background:rgba(239,68,68,0.01); padding:10px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:13px; font-weight:bold; color:#ef4444;">1. Thuật toán cũ Fisher-Yates (Lỗi trùng cụm)</span>
                                        <span style="font-size:11px; font-family:monospace; color:#ef4444;" class="stream-a-alert-lbl"></span>
                                    </div>
                                    <div style="display:flex; gap:10px; justify-content:start; overflow:hidden;" class="stream-box-fy">
                                        <!-- Song blocks will insert here -->
                                    </div>
                                </div>

                                <!-- Bottom Stream: Spotify Balanced Shuffle -->
                                <div style="position:absolute; left:20px; top:130px; width:780px; height:90px; border-radius:12px; border:1.5px solid rgba(29,185,84,0.25); background:rgba(29,185,84,0.01); padding:10px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:13px; font-weight:bold; color:var(--spotify-green);">2. Thuật toán mới Spotify Shuffle (Trải đều hài hòa)</span>
                                        <span style="font-size:11px; font-family:monospace; color:var(--spotify-green); font-weight:bold;">🟢 Spaced perfectly!</span>
                                    </div>
                                    <div style="display:flex; gap:10px; justify-content:start; overflow:hidden;" class="stream-box-spotify">
                                        <!-- Song blocks will insert here -->
                                    </div>
                                </div>

                                <!-- Summary text comparison -->
                                <div style="position:absolute; left:50px; top:250px; width:720px; background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:10px 15px; font-size:13px; color:#d1d5db; display:flex; justify-content:space-between; align-items:center; font-family:monospace;">
                                    <span class="sim-compare-lbl-1">Đang mô phỏng quá trình truyền phát các ca khúc...</span>
                                    <span style="color:var(--spotify-green); font-weight:bold;" class="sim-compare-lbl-2">Tâm lý: Thấy ngẫu nhiên hơn!</span>
                                </div>
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
        if (slideId === 'slide_spotify_shuffle_1') {
            const warningBadge = canvas.querySelector('.cluster-alert-badge');
            const progressFill = canvas.querySelector('.player-prog-fill');
            const elapsedText = canvas.querySelector('.player-time-elapsed');

            // 1. Vinyl play time elapsed updates
            const totalDuration = 165; // 2:45
            const currentSeconds = Math.floor(progress * totalDuration);
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            if (elapsedText) {
                elapsedText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            if (progressFill) {
                progressFill.style.width = `${progress * 100}%`;
            }

            // 2. Alert Badge drops down at progress 0.35 to represent irritation
            if (warningBadge) {
                if (progress >= 0.35 && progress <= 0.85) {
                    warningBadge.style.top = '70px'; // adjusted for the new enlarged mockup height
                } else {
                    warningBadge.style.top = '-70px';
                }
            }
        }
        else if (slideId === 'slide_spotify_shuffle_2') {
            const leftBubble = canvas.querySelector('.rating-bubble-left');
            const rightBubble = canvas.querySelector('.rating-bubble-right');

            if (progress >= 0.25) {
                if (leftBubble) {
                    leftBubble.style.opacity = '1';
                    leftBubble.style.transform = 'translateY(0)';
                }
            } else {
                if (leftBubble) {
                    leftBubble.style.opacity = '0';
                    leftBubble.style.transform = 'translateY(10px)';
                }
            }

            if (progress >= 0.65) {
                if (rightBubble) {
                    rightBubble.style.opacity = '1';
                    rightBubble.style.transform = 'translateY(0)';
                }
            } else {
                if (rightBubble) {
                    rightBubble.style.opacity = '0';
                    rightBubble.style.transform = 'translateY(10px)';
                }
            }
        }
        else if (slideId === 'slide_spotify_shuffle_3') {
            const t0 = canvas.querySelector('.track-0');
            const t1 = canvas.querySelector('.track-1');
            const t2 = canvas.querySelector('.track-2');
            const t3 = canvas.querySelector('.track-3');
            const t4 = canvas.querySelector('.track-4');
            const t5 = canvas.querySelector('.track-5');
            const t6 = canvas.querySelector('.track-6');
            
            const consoleText = canvas.querySelector('.fy-console-text');
            const clusterPanel = canvas.querySelector('.fy-cluster-alert-panel');
            const swapArrow = canvas.querySelector('.swap-path-arrow');

            const resetSwapStyles = (el) => {
                if (el) {
                    el.classList.remove('swapping');
                    el.style.transform = 'none';
                    el.style.borderColor = 'transparent';
                }
            };
            
            // Swap timeline:
            // 0.05 -> 0.3: Swap 1: Track-0 (Red A1) and Track-1 (Blue B1)
            // 0.3 -> 0.55: Swap 2: Track-2 (Red A2) and Track-4 (Blue B2)
            
            if (progress <= 0.05) {
                [t0, t1, t2, t3, t4, t5, t6].forEach(resetSwapStyles);
                if (consoleText) consoleText.textContent = 'Bắt đầu xáo trộn ngẫu nhiên...';
                if (clusterPanel) clusterPanel.style.opacity = '0';
                if (swapArrow) swapArrow.style.display = 'none';
            }
            
            // Swap 1 (Distance is 116px)
            else if (progress > 0.05 && progress <= 0.3) {
                const subP = (progress - 0.05) / 0.25;
                if (t0) {
                    t0.classList.add('swapping');
                    t0.style.transform = `translateX(${subP * 116}px) translateY(-10px)`;
                    t0.style.borderColor = '#f59e0b';
                }
                if (t1) {
                    t1.classList.add('swapping');
                    t1.style.transform = `translateX(${-subP * 116}px) translateY(10px)`;
                    t1.style.borderColor = '#f59e0b';
                }
                if (swapArrow) {
                    swapArrow.style.display = 'block';
                    // Index 0 (x=112) to Index 1 (x=228). Centers: index 0 (62+50=112), index 1 (178+50=228)
                    swapArrow.setAttribute('d', `M 112 90 Q 170 50 228 90`);
                }
                if (consoleText) consoleText.textContent = 'Hoán đổi vị trí 0 (A1) và vị trí 1 (B1)...';
            }
            
            // Swap 2 (Distance is 232px)
            else if (progress > 0.3 && progress <= 0.55) {
                // Settle Swap 1 physically
                if (t0) { t0.style.transform = `translateX(116px)`; t0.classList.remove('swapping'); t0.style.borderColor = 'transparent'; }
                if (t1) { t1.style.transform = `translateX(-116px)`; t1.classList.remove('swapping'); t1.style.borderColor = 'transparent'; }
                
                const subP = (progress - 0.3) / 0.25;
                if (t2) {
                    t2.classList.add('swapping');
                    t2.style.transform = `translateX(${subP * 232}px) translateY(-10px)`;
                    t2.style.borderColor = '#f59e0b';
                }
                if (t4) {
                    t4.classList.add('swapping');
                    t4.style.transform = `translateX(${-subP * 232}px) translateY(10px)`;
                    t4.style.borderColor = '#f59e0b';
                }
                if (swapArrow) {
                    // Index 2 (x=344) to Index 4 (x=576). Centers: index 2 (244+50=294), index 4 (476+50=526)
                    swapArrow.setAttribute('d', `M 294 90 Q 410 40 526 90`);
                }
                if (consoleText) consoleText.textContent = 'Hoán đổi vị trí 2 (A2) và vị trí 4 (B2)...';
            }

            // Settle all, trigger cluster warnings (0.55 -> 1.0)
            else if (progress > 0.55) {
                if (t0) { t0.style.transform = `translateX(116px)`; resetSwapStyles(t0); }
                if (t1) { t1.style.transform = `translateX(-116px)`; resetSwapStyles(t1); }
                if (t2) { t2.style.transform = `translateX(232px)`; resetSwapStyles(t2); }
                if (t4) { t4.style.transform = `translateX(-232px)`; resetSwapStyles(t4); }
                
                if (swapArrow) swapArrow.style.display = 'none';

                if (progress >= 0.75) {
                    // Clustered adjacent: Card 4 (now A2) and Card 5 (A3) are red cards standing next to each other
                    if (t4) t4.style.borderColor = '#ef4444';
                    if (t5) t5.style.borderColor = '#ef4444';
                    if (clusterPanel) clusterPanel.style.opacity = '1';
                    if (consoleText) consoleText.innerHTML = '<span style="color:#ef4444; font-weight:bold;">Lỗi trùng lặp:</span> Ca sĩ A xuất hiện liên tục ở cuối danh sách phát phát nhạc (A2, A3). Người dùng bực bội!';
                } else {
                    if (clusterPanel) clusterPanel.style.opacity = '0';
                    if (consoleText) consoleText.textContent = 'Hoàn tất xáo trộn ngẫu nhiên Fisher-Yates.';
                }
            }
        }
        else if (slideId === 'slide_shortener_4') {
            // Not custom for video22
        }
        else if (slideId === 'slide_spotify_shuffle_4') {
            const svg = canvas.querySelector('.alloc-lines-svg');
            const explanation = canvas.querySelector('.balanced-explanation');
            
            // Cards top
            const a1 = canvas.querySelector('.card-b-a1');
            const a2 = canvas.querySelector('.card-b-a2');
            const a3 = canvas.querySelector('.card-b-a3');
            const b1 = canvas.querySelector('.card-b-b1');
            const b2 = canvas.querySelector('.card-b-b2');
            const c1 = canvas.querySelector('.card-b-c1');
            const c2 = canvas.querySelector('.card-b-c2');

            // Timeline slots bottom
            const slots = canvas.querySelectorAll('.timeline-slot');

            // Reset
            if (svg) svg.innerHTML = '';
            [a1, a2, a3, b1, b2, c1, c2].forEach((card) => {
                if (card) {
                    card.style.transform = 'none';
                    card.style.opacity = '1';
                }
            });
            slots.forEach((s) => s.innerHTML = s.className.split(' ').find(c => c.startsWith('slot-')).split('-')[1]);

            // Phase 1 (0.0 -> 0.35): Spacing calculation & placing Artist A
            if (progress <= 0.35) {
                const subP = progress / 0.35;
                if (explanation) explanation.innerHTML = `<strong>Bước 1:</strong> Tính toán khoảng cách trải đều cho các bài hát của <strong>Ca sĩ A</strong> (Ví dụ: 7 bài / 3 bài = cách ~2.3 vị trí)`;
                
                // Translations:
                // A1 (x=100, y=30) -> Slot 0 (x=86, y=215). DX = -14px, DY = 185px.
                // A2 (x=150, y=30) -> Slot 3 (x=410, y=215). DX = +260px, DY = 185px.
                // A3 (x=200, y=30) -> Slot 6 (x=734, y=215). DX = +534px, DY = 185px.
                if (a1) a1.style.transform = `translateY(${subP * 185}px) translateX(${-14 * subP}px)`;
                if (a2) a2.style.transform = `translateY(${subP * 185}px) translateX(${260 * subP}px)`;
                if (a3) a3.style.transform = `translateY(${subP * 185}px) translateX(${534 * subP}px)`;
                
                // Draw connecting path guides from top card centers to bottom slot centers
                if (svg) {
                    svg.innerHTML = `
                        <path d="M 100 30 Q 93 122 86 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 150 30 Q 280 122 410 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 200 30 Q 467 122 734 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }
            }
            // Phase 2 (0.35 -> 0.70): Placing Artist B
            else if (progress > 0.35 && progress <= 0.70) {
                // Settle A cards into slots
                if (a1) a1.style.opacity = '0';
                if (a2) a2.style.opacity = '0';
                if (a3) a3.style.opacity = '0';
                const slot0 = canvas.querySelector('.slot-0');
                const slot3 = canvas.querySelector('.slot-3');
                const slot6 = canvas.querySelector('.slot-6');
                if (slot0) slot0.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A1</div>`;
                if (slot3) slot3.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A2</div>`;
                if (slot6) slot6.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A3</div>`;

                const subP = (progress - 0.35) / 0.35;
                if (explanation) explanation.innerHTML = `<strong>Bước 2:</strong> Điền các bài hát của <strong>Ca sĩ B</strong> vào khoảng trống còn lại (Slot 1 và Slot 4)`;
                
                // Translations:
                // B1 (x=350, y=30) -> Slot 1 (x=194, y=215). DX = -156px, DY = 185px.
                // B2 (x=400, y=30) -> Slot 4 (x=518, y=215). DX = +118px, DY = 185px.
                if (b1) b1.style.transform = `translateY(${subP * 185}px) translateX(${-156 * subP}px)`;
                if (b2) b2.style.transform = `translateY(${subP * 185}px) translateX(${118 * subP}px)`;

                if (svg) {
                    svg.innerHTML = `
                        <path d="M 350 30 Q 272 122 194 215" stroke="rgba(59,130,246,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 400 30 Q 459 122 518 215" stroke="rgba(59,130,246,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }
            }
            // Phase 3 (0.70 -> 1.0): Placing Artist C (balanced result)
            else if (progress > 0.70) {
                // Settle A and B cards
                if (a1) a1.style.opacity = '0';
                if (a2) a2.style.opacity = '0';
                if (a3) a3.style.opacity = '0';
                if (b1) b1.style.opacity = '0';
                if (b2) b2.style.opacity = '0';
                
                const slot0 = canvas.querySelector('.slot-0');
                const slot3 = canvas.querySelector('.slot-3');
                const slot6 = canvas.querySelector('.slot-6');
                const slot1 = canvas.querySelector('.slot-1');
                const slot4 = canvas.querySelector('.slot-4');
                if (slot0) slot0.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A1</div>`;
                if (slot3) slot3.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A2</div>`;
                if (slot6) slot6.innerHTML = `<div style="width:100%; height:100%; background:#ef4444; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">A3</div>`;
                if (slot1) slot1.innerHTML = `<div style="width:100%; height:100%; background:#3b82f6; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">B1</div>`;
                if (slot4) slot4.innerHTML = `<div style="width:100%; height:100%; background:#3b82f6; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">B2</div>`;

                const subP = (progress - 0.70) / 0.3;
                if (explanation) explanation.innerHTML = `<strong>Bước 3:</strong> Hoàn tất chèn nốt bài hát của <strong>Ca sĩ C</strong> (Slot 2 và Slot 5). Mọi bài hát được phân bố đều nhau!`;

                // Translations:
                // C1 (x=600, y=30) -> Slot 2 (x=302, y=215). DX = -298px, DY = 185px.
                // C2 (x=650, y=30) -> Slot 5 (x=626, y=215). DX = -24px, DY = 185px.
                if (c1) c1.style.transform = `translateY(${subP * 185}px) translateX(${-298 * subP}px)`;
                if (c2) c2.style.transform = `translateY(${subP * 185}px) translateX(${-24 * subP}px)`;

                if (svg) {
                    svg.innerHTML = `
                        <path d="M 600 30 Q 451 122 302 215" stroke="rgba(16,185,129,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 650 30 Q 638 122 626 215" stroke="rgba(16,185,129,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }

                // Settle C cards at progress > 0.95
                if (progress > 0.95) {
                    if (c1) c1.style.opacity = '0';
                    if (c2) c2.style.opacity = '0';
                    const slot2 = canvas.querySelector('.slot-2');
                    const slot5 = canvas.querySelector('.slot-5');
                    if (slot2) slot2.innerHTML = `<div style="width:100%; height:100%; background:#10b981; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">C1</div>`;
                    if (slot5) slot5.innerHTML = `<div style="width:100%; height:100%; background:#10b981; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; font-weight:bold; font-size:14px;">C2</div>`;
                }
            }
        }
        else if (slideId === 'slide_spotify_shuffle_5') {
            const jt0 = canvas.querySelector('.jt-0');
            const jt1 = canvas.querySelector('.jt-1');
            const jt2 = canvas.querySelector('.jt-2');
            const jt3 = canvas.querySelector('.jt-3');
            const jt4 = canvas.querySelector('.jt-4');
            const jt5 = canvas.querySelector('.jt-5');
            const jt6 = canvas.querySelector('.jt-6');
            
            const consoleText = canvas.querySelector('.jt-console-text');

            const resetJt = (el) => {
                if (el) {
                    el.classList.remove('jitter-active');
                    el.style.transform = 'none';
                    el.style.borderColor = 'transparent';
                }
            };

            if (progress <= 0.2) {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach(resetJt);
                if (consoleText) consoleText.textContent = 'Các bài hát đang được xếp cách đều cố định (A1 -> B1 -> C1 -> A2 -> B2 -> C2 -> A3). Sẽ bị dễ đoán!';
            }
            
            // Jitter start (0.2 -> 0.6): Cards vibrating
            else if (progress > 0.2 && progress <= 0.6) {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach((el) => {
                    if (el) el.classList.add('jitter-active');
                });
                if (consoleText) consoleText.textContent = 'Đang kích hoạt Jitter ngẫu nhiên... Các bài hát rung lắc chuẩn bị lệch vị trí!';
            }
            
            // Jitter settlement (0.6 -> 1.0): apply offset swap (offset size updated for enlarged cards)
            else if (progress > 0.6) {
                // Settle: Swap jt-1 (B1) and jt-2 (C1), Swap jt-4 (B2) and jt-5 (C2)
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach((el) => {
                    if (el) el.classList.remove('jitter-active');
                });

                const subP = (progress - 0.6) / 0.4;
                if (jt1) {
                    jt1.style.transform = `translateX(${subP * 108}px)`;
                    jt1.style.borderColor = '#1db954';
                }
                if (jt2) {
                    jt2.style.transform = `translateX(${-subP * 108}px)`;
                    jt2.style.borderColor = '#1db954';
                }
                if (jt4) {
                    jt4.style.transform = `translateX(${subP * 108}px)`;
                    jt4.style.borderColor = '#1db954';
                }
                if (jt5) {
                    jt5.style.transform = `translateX(${-subP * 108}px)`;
                    jt5.style.borderColor = '#1db954';
                }

                if (consoleText) consoleText.innerHTML = 'Jitter hoán vị ngẫu nhiên nhẹ: <strong>B1 ↔ C1</strong> và <strong>B2 ↔ C2</strong>. Luồng phát nhạc bây giờ là: A1 → C1 → B1 → A2 → C2 → B2 → A3. Vừa bất ngờ vừa không bị chùng cụm!';
            }
        }
        else if (slideId === 'slide_spotify_shuffle_6') {
            const streamBoxFY = canvas.querySelector('.stream-box-fy');
            const streamBoxSpotify = canvas.querySelector('.stream-box-spotify');
            const alertLbl = canvas.querySelector('.stream-a-alert-lbl');
            const compLbl1 = canvas.querySelector('.sim-compare-lbl-1');

            if (streamBoxFY && streamBoxSpotify) {
                // Render tracks
                const colors = ['#ef4444', '#3b82f6', '#10b981'];
                const names = ['A', 'B', 'C'];
                
                // Fisher Yates stream containing clusters: A, A, A, B, B, C, C
                const fySequence = [0, 0, 0, 1, 1, 2, 2];
                // Spotify sequence containing balanced: A, B, C, A, B, C, A
                const spotSequence = [0, 1, 2, 0, 1, 2, 0];

                const renderStream = (box, seq, isActiveClustered) => {
                    let html = '';
                    seq.forEach((id, idx) => {
                        const isHighlight = isActiveClustered && (idx <= 2); // Highlight red clustering
                        const border = isHighlight ? 'border: 2px solid #ef4444; box-shadow: 0 0 10px #ef4444;' : 'border: 1px solid rgba(255,255,255,0.05);';
                        const star = (!isActiveClustered && idx === 3 && progress > 0.4) ? `<i data-lucide="star" style="width:12px; height:12px; color:var(--spotify-green); fill:var(--spotify-green); position:absolute; top:-6px; right:-6px;" class="star-popup"></i>` : '';
                        html += `
                            <div style="width:75px; height:46px; border-radius:8px; background:${colors[id]}; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:monospace; font-weight:bold; font-size:13px; color:#fff; position:relative; ${border}">
                                ${names[id]}${idx + 1}
                                ${star}
                            </div>
                        `;
                    });
                    box.innerHTML = html;
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons({ node: box });
                    }
                };

                // Stream animation sequence
                renderStream(streamBoxFY, fySequence, progress >= 0.35);
                renderStream(streamBoxSpotify, spotSequence, false);

                if (progress >= 0.35) {
                    if (alertLbl) alertLbl.textContent = '⚠️ Trùng cụm: A1, A2, A3 phát liên tiếp!';
                    if (compLbl1) compLbl1.innerHTML = '<strong>Đã phát hiện trùng:</strong> Người dùng sẽ nghi ngờ nút Shuffle.';
                } else {
                    if (alertLbl) alertLbl.textContent = '';
                    if (compLbl1) compLbl1.textContent = 'Đang bắt đầu phát danh sách âm nhạc...';
                }

                if (progress >= 0.70) {
                    if (compLbl1) compLbl1.innerHTML = '<strong>Kết quả:</strong> Spotify Shuffle tạo cảm giác ngẫu nhiên hơn bằng cách phân phối đều các nghệ sĩ.';
                }
            }
        }
    }

    // ── PUBLIC PLUGIN REGISTRATION ─────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video22',
        topic: 'Spotify Shuffle Algorithm',
        episodeNum: 22,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video22 Plugin] Loaded: Spotify Shuffle slides layout updated.');
})();
