/**
 * Video 22: Spotify Shuffle Algorithm - Ngẫu nhiên hơn hay Ít ngẫu nhiên hơn?
 * Plugin file - chứa toàn bộ slide animation/HTML cho video22
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_spotify_shuffle_1: [],
        slide_spotify_shuffle_2: [
            { text: 'ngẫu nhiên toán học', start: 5.0, end: 15.0, class: 'active-bad' },
            { text: 'kỳ vọng người nghe', start: 15.0, end: 25.0, class: 'active-good' }
        ],
        slide_spotify_shuffle_3: [
            { text: 'fisher-yates shuffle', start: 4.0, end: 14.0, class: 'active-gold' },
            { text: 'lỗi trùng cụm', start: 14.0, end: 24.5, class: 'active-bad' }
        ],
        slide_spotify_shuffle_4: [
            { text: 'balanced shuffle', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'trải đều bài hát', start: 14.0, end: 25.5, class: 'active-gold' }
        ],
        slide_spotify_shuffle_5: [
            { text: 'cơ chế jitter offset', start: 4.0, end: 14.0, class: 'active-gold' },
            { text: 'bất ngờ ngẫu nhiên', start: 14.0, end: 25.0, class: 'active-good' }
        ],
        slide_spotify_shuffle_6: [
            { text: 'so sánh trực quan', start: 4.0, end: 14.0, class: 'active-gold' },
            { text: 'cân bằng hài hòa', start: 14.0, end: 26.0, class: 'active-good' }
        ]
    };

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
                        <!-- Spotify Phone Mockup - Sized up to 440px x 600px -->
                        <div class="glass-card" style="width:440px; height:600px; border:2.5px solid rgba(255,255,255,0.1); border-radius:32px; padding:24px; display:flex; flex-direction:column; background:#121212; position:relative; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.95); box-sizing:border-box;">
                            
                            <!-- Playlist Screen -->
                            <div class="playlist-screen" style="position:absolute; inset:24px; display:flex; flex-direction:column; justify-content:flex-start; z-index: 2; transform: none; opacity: 1;">
                                <!-- Header -->
                                <div style="display:flex; gap:16px; align-items:center; margin-bottom:20px;">
                                    <div style="width:100px; height:100px; border-radius:12px; background:linear-gradient(135deg, #1db954, #191414); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 16px rgba(0,0,0,0.4);">
                                        <i data-lucide="music-4" style="color:#fff; width:48px; height:48px;"></i>
                                    </div>
                                    <div style="display:flex; flex-direction:column; justify-content:center; text-align:left;">
                                        <span style="font-size:12px; font-weight:bold; color:var(--spotify-green); letter-spacing:1px;">PLAYLIST</span>
                                        <span style="font-size:22px; font-weight:bold; color:#fff; margin-top:2px;">Mix Ngẫu Nhiên</span>
                                        <span style="font-size:13px; color:var(--spotify-text); margin-top:4px;">Turnio.dev • 7 bài hát</span>
                                    </div>
                                </div>

                                <!-- Action Row -->
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                                    <div style="display:flex; gap:16px; align-items:center;">
                                        <i data-lucide="shuffle" style="color:var(--spotify-green); width:24px; height:24px; cursor:pointer;" class="pulse-glow"></i>
                                        <i data-lucide="arrow-down-circle" style="color:var(--spotify-text); width:20px; height:20px;"></i>
                                        <i data-lucide="user-plus" style="color:var(--spotify-text); width:20px; height:20px;"></i>
                                    </div>
                                    <div style="width:48px; height:48px; border-radius:50%; background:var(--spotify-green); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); cursor:pointer;">
                                        <i data-lucide="play" style="color:#000; width:20px; height:20px; fill:#000; margin-left:2px;"></i>
                                    </div>
                                </div>

                                <!-- Song List -->
                                <div class="song-list-container" style="flex:1; display:flex; flex-direction:column;">
                                    <!-- Song Row 1 (Active) -->
                                    <div class="playlist-song-row active">
                                        <div style="display:flex; gap:12px; align-items:center; text-align:left;">
                                            <span style="font-size:14px; font-weight:bold; color:var(--spotify-green); width:15px; text-align:center;">1</span>
                                            <div style="display:flex; flex-direction:column;">
                                                <span style="font-size:14px; font-weight:bold; color:var(--spotify-green);">Chúng Ta Của Tương Lai</span>
                                                <span style="font-size:12px; color:var(--spotify-text);">Sơn Tùng M-TP</span>
                                            </div>
                                        </div>
                                        <div class="eq-container">
                                            <div class="eq-bar"></div>
                                            <div class="eq-bar"></div>
                                            <div class="eq-bar"></div>
                                            <div class="eq-bar"></div>
                                        </div>
                                    </div>

                                    <!-- Song Row 2 -->
                                    <div class="playlist-song-row">
                                        <div style="display:flex; gap:12px; align-items:center; text-align:left;">
                                            <span style="font-size:14px; font-weight:bold; color:var(--spotify-text); width:15px; text-align:center;">2</span>
                                            <div style="display:flex; flex-direction:column;">
                                                <span style="font-size:14px; font-weight:bold; color:#fff;">Hãy Trao Cho Anh</span>
                                                <span style="font-size:12px; color:var(--spotify-text);">Sơn Tùng M-TP</span>
                                            </div>
                                        </div>
                                        <i data-lucide="more-horizontal" style="color:var(--spotify-text); width:18px; height:18px;"></i>
                                    </div>

                                    <!-- Song Row 3 -->
                                    <div class="playlist-song-row">
                                        <div style="display:flex; gap:12px; align-items:center; text-align:left;">
                                            <span style="font-size:14px; font-weight:bold; color:var(--spotify-text); width:15px; text-align:center;">3</span>
                                            <div style="display:flex; flex-direction:column;">
                                                <span style="font-size:14px; font-weight:bold; color:#fff;">Cơn Mưa Ngang Qua</span>
                                                <span style="font-size:12px; color:var(--spotify-text);">Sơn Tùng M-TP</span>
                                            </div>
                                        </div>
                                        <i data-lucide="more-horizontal" style="color:var(--spotify-text); width:18px; height:18px;"></i>
                                    </div>

                                    <!-- Song Row 4 -->
                                    <div class="playlist-song-row">
                                        <div style="display:flex; gap:12px; align-items:center; text-align:left;">
                                            <span style="font-size:14px; font-weight:bold; color:var(--spotify-text); width:15px; text-align:center;">4</span>
                                            <div style="display:flex; flex-direction:column;">
                                                <span style="font-size:14px; font-weight:bold; color:#fff;">Cruel Summer</span>
                                                <span style="font-size:12px; color:var(--spotify-text);">Taylor Swift</span>
                                            </div>
                                        </div>
                                        <i data-lucide="more-horizontal" style="color:var(--spotify-text); width:18px; height:18px;"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- Active Player Screen -->
                            <div class="player-screen" style="position:absolute; inset:24px; display:flex; flex-direction:column; justify-content:space-between; z-index: 1; opacity:0; transform:translateY(100px); pointer-events: none;">
                                <!-- Header phone -->
                                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.08); padding-bottom:10px;">
                                    <span style="font-size:14px; font-weight:bold; color:var(--spotify-green); letter-spacing:1.5px; font-family:sans-serif;">PLAYING FROM SHUFFLE</span>
                                    <i data-lucide="music-2" style="color:var(--spotify-green); width:20px; height:20px;"></i>
                                </div>

                                <!-- Warning alert box (slides down on same artist clump) -->
                                <div class="cluster-alert-badge" style="position:absolute; top:-100px; left:0px; right:0px; padding:12px; border-radius:12px; border:1.5px solid #f59e0b; color:#fff; font-size:13px; font-family:sans-serif; text-align:center; transition: all 0.5s ease-in-out; z-index:10; display:flex; align-items:center; justify-content:center; gap:8px; opacity: 0; background: rgba(245, 158, 11, 0.15);">
                                    <i data-lucide="alert-triangle" style="width:18px; height:18px; color:#f59e0b;"></i>
                                    <span style="font-weight:bold; color:#fcd34d;">Gặp cụm: Sơn Tùng M-TP hát liên tiếp!</span>
                                </div>

                                <!-- Vinyl Rotating Disc (Enlarged) -->
                                <div style="position:relative; width:220px; height:220px; margin:20px auto; display:flex; align-items:center; justify-content:center; z-index:2;">
                                    <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(29,185,84,0.3) 0%, transparent 70%); filter:blur(20px);"></div>
                                    <div class="vinyl-disc-spin" style="width:200px; height:200px; border-radius:50%; background:repeating-radial-gradient(circle, #222 0px, #222 4px, #111 4px, #111 8px); border:4px solid #000; display:flex; align-items:center; justify-content:center; box-shadow: 0 12px 30px rgba(0,0,0,0.75);">
                                        <div style="width:60px; height:60px; border-radius:50%; background:var(--spotify-green); border:4px solid #121212; display:flex; align-items:center; justify-content:center;">
                                            <span style="font-size:28px;">🎵</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Song Details -->
                                <div style="z-index:2; text-align:center; margin-bottom:10px;">
                                    <div style="font-size:24px; font-weight:bold; color:#fff;" class="song-title">Chúng Ta Của Tương Lai</div>
                                    <div style="font-size:16px; color:var(--spotify-text); margin-top:6px;" class="artist-name">Sơn Tùng M-TP</div>
                                </div>

                                <!-- Mini Player Buttons -->
                                <div style="display:flex; justify-content:center; align-items:center; gap:25px; margin-bottom:12px; z-index:2;">
                                    <i data-lucide="shuffle" style="color:var(--spotify-green); width:24px; height:24px; cursor:pointer;" class="pulse-glow"></i>
                                    <i data-lucide="skip-back" style="color:#fff; width:22px; height:22px;"></i>
                                    <div style="width:50px; height:50px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3);">
                                        <i data-lucide="pause" style="color:#000; width:22px; height:22px; fill:#000;"></i>
                                    </div>
                                    <i data-lucide="skip-forward" style="color:#fff; width:22px; height:22px;"></i>
                                    <i data-lucide="repeat" style="color:#fff; width:22px; height:22px;"></i>
                                </div>

                                <!-- Timeline progress slider -->
                                <div style="z-index:2;">
                                    <div style="width:100%; height:6px; background:#535353; border-radius:3px; position:relative; overflow:hidden;">
                                        <div class="player-prog-fill" style="height:100%; background:var(--spotify-green); width:0%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--spotify-text); margin-top:6px; font-family:monospace;">
                                        <span class="player-time-elapsed">0:00</span>
                                        <span>2:45</span>
                                    </div>
                                </div>

                                <!-- Next Up (blocked MTP song) -->
                                <div class="next-up-blocked" style="margin-top:12px; padding:9px 12px; border-radius:10px; background:rgba(0,0,0,0.35); border:1px solid rgba(245,158,11,0.2); display:flex; align-items:center; justify-content:space-between; z-index:2; opacity:0; transition: opacity 0.5s ease;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:36px; height:36px; border-radius:6px; background:linear-gradient(135deg,#ef4444,#991b1b); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                            <i data-lucide="music" style="width:16px; height:16px; color:#fff;"></i>
                                        </div>
                                        <div style="text-align:left;">
                                            <div style="font-size:11px; color:rgba(255,255,255,0.45); font-family:sans-serif; letter-spacing:0.5px;">TIẾP THEO</div>
                                            <div style="font-size:13px; font-weight:bold; color:#fff;">Hãy Trao Cho Anh</div>
                                            <div style="font-size:11px; color:var(--spotify-text);">Sơn Tùng M-TP</div>
                                        </div>
                                    </div>
                                    <div class="blocked-badge" style="padding:4px 10px; border-radius:20px; background:rgba(245,158,11,0.18); border:1.5px solid rgba(245,158,11,0.6); color:#f59e0b; font-size:11px; font-weight:bold; font-family:sans-serif; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:0 0 8px rgba(245,158,11,0.25);">
                                        <i data-lucide="shield-x" style="width:12px; height:12px; color:#f59e0b;"></i>
                                        Bị chặn
                                    </div>
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
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:450px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="font-size:23px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px; text-align:left;">Sự khác biệt giữa Toán Học và Nhận Thức con người</div>

                            <!-- Absolute position content box -->
                            <div style="position:relative; width:820px; height:320px; margin: 10px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Left side: Mathematical Random -->
                                <div style="position:absolute; left:50px; top:10px; width:280px; display:flex; flex-direction:column; align-items:center; gap:15px;">
                                    <span style="font-size:16px; font-weight:bold; color:#ef4444;">1. Ngẫu nhiên Toán Học (True Random)</span>
                                    ${makeDotCloudHTML(true)}
                                </div>

                                <!-- Center: VS -->
                                <div style="position:absolute; left:360px; top:110px; width:100px; display:flex; flex-direction:column; align-items:center; gap:20px;">
                                    <i data-lucide="arrow-right-left" style="color:rgba(255,255,255,0.2); width:32px; height:32px;" class="icon-pulse"></i>
                                    <div class="vs-meter" style="padding:4px 12px; border-radius:6px; background:rgba(245,158,11,0.12); color:var(--gold-primary); font-family:monospace; font-weight:bold; font-size:15px;">VS</div>
                                </div>

                                <!-- Right side: Human Expectation of Random -->
                                <div style="position:absolute; left:490px; top:10px; width:280px; display:flex; flex-direction:column; align-items:center; gap:15px;">
                                    <span style="font-size:16px; font-weight:bold; color:#10b981;">2. Con người kỳ vọng (Balanced)</span>
                                    ${makeDotCloudHTML(false)}
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
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:450px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:23px; font-weight:bold; color:var(--gold-primary);">Thuật toán Fisher-Yates Shuffle (Ngẫu nhiên tuyệt đối)</div>
                                <div style="font-size:14px; background:rgba(59,130,246,0.15); padding:2px 10px; border-radius:6px; color:#60a5fa; font-family:monospace; font-weight:bold;">Độ phức tạp: O(N)</div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Swap elements array (enlarged cards slightly) -->
                                <div style="display:flex; gap:16px; justify-content:center; align-items:center; width:100%; position:absolute; left:0; top:100px; height:90px;" class="fy-array-box">
                                    <!-- Colors: Red (Sơn Tùng), Blue (Taylor Swift), Green (Coldplay) -->
                                    <div class="song-track-card track-0" style="width:100px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
                                    <div class="song-track-card track-1" style="width:100px; height:70px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(59,130,246,0.25);">Taylor Swift</div>
                                    <div class="song-track-card track-2" style="width:100px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
                                    <div class="song-track-card track-3" style="width:100px; height:70px; background:linear-gradient(135deg, #10b981, #047857); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(16,185,129,0.25);">Coldplay</div>
                                    <div class="song-track-card track-4" style="width:100px; height:70px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(59,130,246,0.25);">Taylor Swift</div>
                                    <div class="song-track-card track-5" style="width:100px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
                                    <div class="song-track-card track-6" style="width:100px; height:70px; background:linear-gradient(135deg, #10b981, #047857); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; color:#fff; font-size:13px; text-align:center; padding:4px; box-sizing:border-box; box-shadow:0 4px 15px rgba(16,185,129,0.25);">Coldplay</div>
                                </div>

                                <!-- SVG overlay for swap indicator arrows -->
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;" class="fy-arrows-svg">
                                    <path d="" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-dasharray="4,4" class="swap-path-arrow" style="display:none;"></path>
                                </svg>

                                <!-- Cluster Warning Banner -->
                                <div class="fy-cluster-alert-panel" style="position:absolute; left:210px; top:220px; width:400px; padding:10px 15px; border-radius:10px; background:rgba(239,68,68,0.15); border:1.5px solid #ef4444; color:#fff; text-align:center; font-size:14px; font-weight:bold; opacity:0; transition:all 0.4s; display:flex; align-items:center; justify-content:center; gap:8px; z-index:3;">
                                    <i data-lucide="alert-octagon" style="width:18px; height:18px; color:#ef4444;"></i>
                                    <span>LỖI TRÙNG CỤM: 2 bài hát của Sơn Tùng M-TP xếp sát nhau!</span>
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
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:450px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:23px; font-weight:bold; color:var(--gold-primary);">Thuật toán Balanced Shuffle (Trải đều Halftoning)</div>
                                <div style="font-size:14px; background:rgba(16,185,129,0.12); padding:2px 10px; border-radius:6px; color:#10b981; font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="check" style="width:14px; height:14px;"></i> Ngăn ngừa trùng cụm
                                </div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Grouped Artist buckets (Top row) -->
                                <div style="position:absolute; left:41px; top:25px; display:flex; justify-content:space-between; width:738px;">
                                    <div class="bucket-a" style="border:1.5px dashed rgba(239,68,68,0.45); padding:10px; border-radius:12px; display:flex; gap:8px; background:rgba(239,68,68,0.02); position:relative;">
                                        <span style="font-size:13px; color:#ef4444; font-weight:bold; position:absolute; top:-25px; left:50%; transform:translateX(-50%); white-space:nowrap; font-family:sans-serif;">Sơn Tùng M-TP</span>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #ef4444, #b91c1c); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);" class="card-b-a1">Sơn Tùng M-TP</div>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #ef4444, #b91c1c); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);" class="card-b-a2">Sơn Tùng M-TP</div>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #ef4444, #b91c1c); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);" class="card-b-a3">Sơn Tùng M-TP</div>
                                    </div>

                                    <div class="bucket-b" style="border:1.5px dashed rgba(59,130,246,0.45); padding:10px; border-radius:12px; display:flex; gap:8px; background:rgba(59,130,246,0.02); position:relative;">
                                        <span style="font-size:13px; color:#3b82f6; font-weight:bold; position:absolute; top:-25px; left:50%; transform:translateX(-50%); white-space:nowrap; font-family:sans-serif;">Taylor Swift</span>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);" class="card-b-b1">Taylor Swift</div>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);" class="card-b-b2">Taylor Swift</div>
                                    </div>

                                    <div class="bucket-c" style="border:1.5px dashed rgba(16,185,129,0.45); padding:10px; border-radius:12px; display:flex; gap:8px; background:rgba(16,185,129,0.02); position:relative;">
                                        <span style="font-size:13px; color:#10b981; font-weight:bold; position:absolute; top:-25px; left:50%; transform:translateX(-50%); white-space:nowrap; font-family:sans-serif;">Coldplay</span>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #10b981, #047857); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);" class="card-b-c1">Coldplay</div>
                                        <div style="width:90px; height:70px; border-radius:10px; background:linear-gradient(135deg, #10b981, #047857); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);" class="card-b-c2">Coldplay</div>
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
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:450px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:23px; font-weight:bold; color:var(--gold-primary);">Cơ chế ngẫu nhiên Jitter Offset (Tránh cứng nhắc)</div>
                                <div style="font-size:14px; background:rgba(245,158,11,0.15); padding:2px 10px; border-radius:6px; color:var(--gold-primary); font-family:monospace; font-weight:bold;">Balanced + Random Jitter</div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Song Array layout with spacing (enlarged cards to 90px x 70px) -->
                                <div style="display:flex; gap:18px; justify-content:center; align-items:center; width:780px; position:absolute; left:20px; top:120px; height:80px;" class="jitter-array-box">
                                    <div class="song-track-card jt-0" style="width:90px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
                                    <div class="song-track-card jt-1" style="width:90px; height:70px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(59,130,246,0.25);">Taylor Swift</div>
                                    <div class="song-track-card jt-2" style="width:90px; height:70px; background:linear-gradient(135deg, #10b981, #047857); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(16,185,129,0.25);">Coldplay</div>
                                    <div class="song-track-card jt-3" style="width:90px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
                                    <div class="song-track-card jt-4" style="width:90px; height:70px; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(59,130,246,0.25);">Taylor Swift</div>
                                    <div class="song-track-card jt-5" style="width:90px; height:70px; background:linear-gradient(135deg, #10b981, #047857); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(16,185,129,0.25);">Coldplay</div>
                                    <div class="song-track-card jt-6" style="width:90px; height:70px; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:12px; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; position:relative; box-shadow: 0 4px 15px rgba(239,68,68,0.25);">Sơn Tùng M-TP</div>
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
                        <div class="glass-card cyber-grid" style="width:100%; max-width:880px; height:450px; padding:28px; border:2px solid rgba(245,158,11,0.25); border-radius:24px; background:#0c0f17; box-shadow:0 0 30px rgba(245,158,11,0.15); display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:8px;">
                                <div style="font-size:23px; font-weight:bold; color:var(--gold-primary);">So sánh mô phỏng các luồng phát nhạc (Shuffle Stream)</div>
                                <div style="font-size:14px; background:rgba(29,185,84,0.15); padding:2px 10px; border-radius:6px; color:var(--spotify-green); font-family:monospace; font-weight:bold; display:flex; align-items:center; gap:4px;">
                                    <i data-lucide="music" style="width:14px; height:14px;"></i> Live Compare
                                </div>
                            </div>

                            <!-- Absolute container -->
                            <div style="position:relative; width:820px; height:320px; margin:15px auto 0 auto; box-sizing:border-box;">
                                
                                <!-- Top Stream: Fisher-Yates (Absolute Random) -->
                                <div style="position:absolute; left:20px; top:40px; width:780px; height:90px; border-radius:12px; border:1.5px solid rgba(239,68,68,0.2); background:rgba(239,68,68,0.01); padding:10px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:13px; font-weight:bold; color:#ef4444;">1. Thuật toán cũ Fisher-Yates (Lỗi trùng cụm)</span>
                                        <span style="font-size:11px; font-family:monospace; color:#ef4444;" class="stream-a-alert-lbl"></span>
                                    </div>
                                    <div style="display:flex; gap:10px; justify-content:start; overflow:hidden;" class="stream-box-fy">
                                        <!-- Song blocks will insert here -->
                                    </div>
                                </div>

                                <!-- Bottom Stream: Spotify Balanced Shuffle -->
                                <div style="position:absolute; left:20px; top:170px; width:780px; height:90px; border-radius:12px; border:1.5px solid rgba(29,185,84,0.25); background:rgba(29,185,84,0.01); padding:10px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:13px; font-weight:bold; color:var(--spotify-green);">2. Thuật toán mới Spotify Shuffle (Trải đều hài hòa)</span>
                                        <span style="font-size:11px; font-family:monospace; color:var(--spotify-green); font-weight:bold;">🟢 Spaced perfectly!</span>
                                    </div>
                                    <div style="display:flex; gap:10px; justify-content:start; overflow:hidden;" class="stream-box-spotify">
                                        <!-- Song blocks will insert here -->
                                    </div>
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
            const playlistScreen = canvas.querySelector('.playlist-screen');
            const playerScreen = canvas.querySelector('.player-screen');
            const warningBadge = canvas.querySelector('.cluster-alert-badge');
            const progressFill = canvas.querySelector('.player-prog-fill');
            const elapsedText = canvas.querySelector('.player-time-elapsed');

            // 1. Dual interface transitions
            // 0.0 -> 0.2: Playlist view active
            // 0.2 -> 0.24: Snappy transition (Playlist slides up/fades out, Player slides up/fades in)
            // 0.24 -> 1.0: Player view active
            if (progress <= 0.2) {
                if (playlistScreen) {
                    playlistScreen.style.opacity = '1';
                    playlistScreen.style.transform = 'translateY(0)';
                    playlistScreen.style.pointerEvents = 'auto';
                }
                if (playerScreen) {
                    playerScreen.style.opacity = '0';
                    playerScreen.style.transform = 'translateY(100px)';
                    playerScreen.style.pointerEvents = 'none';
                }
            } else if (progress > 0.2 && progress < 0.24) {
                const t = (progress - 0.2) / 0.04;
                if (playlistScreen) {
                    playlistScreen.style.opacity = (1 - t).toString();
                    playlistScreen.style.transform = `translateY(${-t * 100}px)`;
                    playlistScreen.style.pointerEvents = 'none';
                }
                if (playerScreen) {
                    playerScreen.style.opacity = t.toString();
                    playerScreen.style.transform = `translateY(${(1 - t) * 100}px)`;
                    playerScreen.style.pointerEvents = 'none';
                }
            } else {
                if (playlistScreen) {
                    playlistScreen.style.opacity = '0';
                    playlistScreen.style.transform = 'translateY(-100px)';
                    playlistScreen.style.pointerEvents = 'none';
                }
                if (playerScreen) {
                    playerScreen.style.opacity = '1';
                    playerScreen.style.transform = 'translateY(0)';
                    playerScreen.style.pointerEvents = 'auto';
                }
            }

            // 2. Vinyl play time elapsed updates
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

            // 3. Alert Badge drops down at progress > 0.35
            if (warningBadge) {
                if (progress > 0.35) {
                    warningBadge.style.top = '48px';
                    warningBadge.style.opacity = '1';
                } else {
                    warningBadge.style.top = '-100px';
                    warningBadge.style.opacity = '0';
                }
            }

            // 4. "Next Up" blocked song appears after warning badge at > 0.45
            const nextUpBlock = canvas.querySelector('.next-up-blocked');
            const blockedBadge = canvas.querySelector('.blocked-badge');
            if (nextUpBlock) {
                nextUpBlock.style.opacity = progress > 0.45 ? '1' : '0';
            }
            if (blockedBadge) {
                blockedBadge.style.opacity = progress > 0.55 ? '1' : '0';
            }
        }
        else if (slideId === 'slide_spotify_shuffle_2') {
            // Clean, visual only
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
            // 0.15 -> 0.19: Swap 1: Track-0 (Red A1) and Track-1 (Blue B1)
            // 0.25 -> 0.29: Swap 2: Track-2 (Red A2) and Track-4 (Blue B2)
            
            if (progress <= 0.15) {
                [t0, t1, t2, t3, t4, t5, t6].forEach(resetSwapStyles);
                if (consoleText) consoleText.textContent = 'Bắt đầu xáo trộn ngẫu nhiên...';
                if (clusterPanel) clusterPanel.style.opacity = '0';
                if (swapArrow) swapArrow.style.display = 'none';
            }
            
            // Swap 1 (Distance is 116px, Y offset set to 135px)
            else if (progress > 0.15 && progress <= 0.19) {
                const subP = (progress - 0.15) / 0.04;
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
                    swapArrow.setAttribute('d', `M 112 135 Q 170 95 228 135`);
                }
                if (consoleText) consoleText.textContent = 'Hoán đổi Sơn Tùng M-TP (vị trí 0) và Taylor Swift (vị trí 1)...';
            }
            
            // Wait/static state between swap 1 and swap 2
            else if (progress > 0.19 && progress <= 0.25) {
                if (t0) { t0.style.transform = `translateX(116px)`; resetSwapStyles(t0); }
                if (t1) { t1.style.transform = `translateX(-116px)`; resetSwapStyles(t1); }
                [t2, t4].forEach(resetSwapStyles);
                if (swapArrow) swapArrow.style.display = 'none';
                if (consoleText) consoleText.textContent = 'Đang tiếp tục xáo trộn ngẫu nhiên...';
            }

            // Swap 2 (Distance is 232px, Y offset set to 135px)
            else if (progress > 0.25 && progress <= 0.29) {
                // Settle Swap 1 physically
                if (t0) { t0.style.transform = `translateX(116px)`; resetSwapStyles(t0); }
                if (t1) { t1.style.transform = `translateX(-116px)`; resetSwapStyles(t1); }
                
                const subP = (progress - 0.25) / 0.04;
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
                    swapArrow.style.display = 'block';
                    swapArrow.setAttribute('d', `M 294 135 Q 410 85 526 135`);
                }
                if (consoleText) consoleText.textContent = 'Hoán đổi Sơn Tùng M-TP (vị trí 2) và Taylor Swift (vị trí 4)...';
            }

            // Settle all, trigger cluster warnings (0.29 -> 1.0)
            else {
                if (t0) { t0.style.transform = `translateX(116px)`; resetSwapStyles(t0); }
                if (t1) { t1.style.transform = `translateX(-116px)`; resetSwapStyles(t1); }
                if (t2) { t2.style.transform = `translateX(232px)`; resetSwapStyles(t2); }
                if (t4) { t4.style.transform = `translateX(-232px)`; resetSwapStyles(t4); }
                
                if (swapArrow) swapArrow.style.display = 'none';

                if (progress >= 0.35) {
                    if (t4) t4.style.borderColor = '#ef4444';
                    if (t5) t5.style.borderColor = '#ef4444';
                    if (clusterPanel) clusterPanel.style.opacity = '1';
                    if (consoleText) consoleText.innerHTML = 'Lỗi trùng cụm: Hai bài hát của Sơn Tùng M-TP nằm cạnh nhau!';
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

            // Phase 1 (0.0 -> 0.25): Spacing calculation & placing Artist A (Animates 0.15 -> 0.25)
            if (progress <= 0.25) {
                if (explanation) explanation.innerHTML = `<strong>Bước 1:</strong> Tính toán khoảng cách trải đều cho các bài hát của <strong>Sơn Tùng M-TP</strong> (Ví dụ: 7 bài / 3 bài = cách ~2.3 vị trí)`;
                
                const subP = progress <= 0.15 ? 0 : (progress - 0.15) / 0.10;
                // Translations:
                // A1 (x_rel=10) -> Slot 0 (x_rel=0). DX = -10px, DY = 145px.
                // A2 (x_rel=108) -> Slot 3 (x_rel=324). DX = +216px, DY = 145px.
                // A3 (x_rel=206) -> Slot 6 (x_rel=648). DX = +442px, DY = 145px.
                if (a1) a1.style.transform = `translateY(${subP * 145}px) translateX(${-10 * subP}px)`;
                if (a2) a2.style.transform = `translateY(${subP * 145}px) translateX(${216 * subP}px)`;
                if (a3) a3.style.transform = `translateY(${subP * 145}px) translateX(${442 * subP}px)`;
                
                // Draw connecting path guides from top card centers to bottom slot centers
                if (svg && progress > 0.15) {
                    svg.innerHTML = `
                        <path d="M 96 70 Q 91 142 86 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 194 70 Q 302 142 410 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 292 70 Q 513 142 734 215" stroke="rgba(239,68,68,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }
            }
            // Phase 2 (0.25 -> 0.45): Placing Artist B (Animates 0.35 -> 0.45)
            else if (progress > 0.25 && progress <= 0.45) {
                // Settle A cards into slots
                if (a1) a1.style.opacity = '0';
                if (a2) a2.style.opacity = '0';
                if (a3) a3.style.opacity = '0';
                const slot0 = canvas.querySelector('.slot-0');
                const slot3 = canvas.querySelector('.slot-3');
                const slot6 = canvas.querySelector('.slot-6');
                if (slot0) slot0.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;
                if (slot3) slot3.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;
                if (slot6) slot6.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;

                if (explanation) explanation.innerHTML = `<strong>Bước 2:</strong> Điền các bài hát của <strong>Taylor Swift</strong> vào khoảng trống còn lại (Slot 1 và Slot 4)`;

                const subP = progress <= 0.35 ? 0 : (progress - 0.35) / 0.10;
                // Translations:
                // B1 (x_rel=324) -> Slot 1 (x_rel=108). DX = -216px, DY = 145px.
                // B2 (x_rel=422) -> Slot 4 (x_rel=432). DX = +10px, DY = 145px.
                if (b1) b1.style.transform = `translateY(${subP * 145}px) translateX(${-216 * subP}px)`;
                if (b2) b2.style.transform = `translateY(${subP * 145}px) translateX(${10 * subP}px)`;

                if (svg && progress > 0.35) {
                    svg.innerHTML = `
                        <path d="M 410 70 Q 302 142 194 215" stroke="rgba(59,130,246,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 508 70 Q 513 142 518 215" stroke="rgba(59,130,246,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }
            }
            // Phase 3 (0.45 -> 1.0): Placing Artist C (Animates 0.55 -> 0.65)
            else if (progress > 0.45) {
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
                if (slot0) slot0.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;
                if (slot3) slot3.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;
                if (slot6) slot6.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #ef4444, #b91c1c); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);">Sơn Tùng M-TP</div>`;
                if (slot1) slot1.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);">Taylor Swift</div>`;
                if (slot4) slot4.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);">Taylor Swift</div>`;

                if (explanation) explanation.innerHTML = `<strong>Bước 3:</strong> Hoàn tất chèn nốt bài hát của <strong>Coldplay</strong> (Slot 2 và Slot 5). Mọi bài hát được phân bố đều nhau!`;

                const subP = progress <= 0.55 ? 0 : Math.min(1, (progress - 0.55) / 0.10);
                // Translations:
                // C1 (x_rel=540) -> Slot 2 (x_rel=216). DX = -324px, DY = 145px.
                // C2 (x_rel=638) -> Slot 5 (x_rel=540). DX = -98px, DY = 145px.
                if (c1) c1.style.transform = `translateY(${subP * 145}px) translateX(${-324 * subP}px)`;
                if (c2) c2.style.transform = `translateY(${subP * 145}px) translateX(${-98 * subP}px)`;

                if (svg && progress > 0.55) {
                    svg.innerHTML = `
                        <path d="M 626 70 Q 464 142 302 215" stroke="rgba(16,185,129,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                        <path d="M 724 70 Q 675 142 626 215" stroke="rgba(16,185,129,${subP * 0.45})" stroke-width="2" fill="none" class="guide-line-glow"></path>
                    `;
                }

                // Settle C cards at progress > 0.65
                if (progress > 0.65) {
                    if (c1) c1.style.opacity = '0';
                    if (c2) c2.style.opacity = '0';
                    const slot2 = canvas.querySelector('.slot-2');
                    const slot5 = canvas.querySelector('.slot-5');
                    if (slot2) slot2.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #10b981, #047857); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);">Coldplay</div>`;
                    if (slot5) slot5.innerHTML = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #10b981, #047857); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; font-weight:bold; font-size:12px; text-align:center; padding: 4px; box-sizing: border-box; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);">Coldplay</div>`;
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

            if (progress <= 0.25) {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach(resetJt);
                if (consoleText) consoleText.textContent = 'Các bài hát đang được xếp cách đều cố định (Sơn Tùng → Taylor Swift → Coldplay → Sơn Tùng...). Sẽ bị dễ đoán!';
            }
            
            // Jitter start (0.25 -> 0.38): Cards vibrating
            else if (progress > 0.25 && progress <= 0.38) {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach((el) => {
                    if (el) el.classList.add('jitter-active');
                });
                if (consoleText) consoleText.textContent = 'Đang kích hoạt Jitter ngẫu nhiên... Các bài hát rung lắc chuẩn bị lệch vị trí!';
            }
            
            // Jitter settlement (0.38 -> 0.45): apply offset swap
            else if (progress > 0.38 && progress <= 0.45) {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach((el) => {
                    if (el) el.classList.remove('jitter-active');
                });

                const subP = (progress - 0.38) / 0.07;
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

                if (consoleText) consoleText.innerHTML = 'Jitter hoán vị ngẫu nhiên nhẹ: <strong>Taylor Swift ↔ Coldplay</strong>...';
            }
            
            // Settle final position (0.45 -> 1.0)
            else {
                [jt0, jt1, jt2, jt3, jt4, jt5, jt6].forEach((el) => {
                    if (el) el.classList.remove('jitter-active');
                });
                if (jt1) { jt1.style.transform = 'translateX(108px)'; jt1.style.borderColor = '#1db954'; }
                if (jt2) { jt2.style.transform = 'translateX(-108px)'; jt2.style.borderColor = '#1db954'; }
                if (jt4) { jt4.style.transform = 'translateX(108px)'; jt4.style.borderColor = '#1db954'; }
                if (jt5) { jt5.style.transform = 'translateX(-108px)'; jt5.style.borderColor = '#1db954'; }

                if (consoleText) consoleText.innerHTML = 'Jitter hoán vị ngẫu nhiên nhẹ: <strong>Taylor Swift ↔ Coldplay</strong>. Luồng phát nhạc bây giờ là: Sơn Tùng → Coldplay → Taylor Swift → Sơn Tùng... Vừa bất ngờ vừa không bị chùng cụm!';
            }
        }
        else if (slideId === 'slide_spotify_shuffle_6') {
            const streamBoxFY = canvas.querySelector('.stream-box-fy');
            const streamBoxSpotify = canvas.querySelector('.stream-box-spotify');
            const alertLbl = canvas.querySelector('.stream-a-alert-lbl');
            const compLbl1 = canvas.querySelector('.sim-compare-lbl-1');

            if (streamBoxFY && streamBoxSpotify) {
                // Render tracks
                const gradients = [
                    'linear-gradient(135deg, #ef4444, #b91c1c)', // Sơn Tùng M-TP
                    'linear-gradient(135deg, #3b82f6, #1d4ed8)', // Taylor Swift
                    'linear-gradient(135deg, #10b981, #047857)'  // Coldplay
                ];
                const names = ['Sơn Tùng', 'Taylor Swift', 'Coldplay'];
                
                // Fisher Yates stream containing clusters: A, A, A, B, B, C, C
                const fySequence = [0, 0, 0, 1, 1, 2, 2];
                // Spotify sequence containing balanced: A, B, C, A, B, C, A
                const spotSequence = [0, 1, 2, 0, 1, 2, 0];

                const renderStream = (box, seq, isActiveClustered) => {
                    let html = '';
                    seq.forEach((id, idx) => {
                        const isHighlight = isActiveClustered && (idx <= 2); // Highlight red clustering
                        const border = isHighlight ? 'border: 2px solid #ef4444; box-shadow: 0 0 10px #ef4444;' : 'border: 1px solid rgba(255,255,255,0.1);';
                        const star = (!isActiveClustered && idx === 3 && progress > 0.4) ? `<i data-lucide="star" style="width:12px; height:12px; color:var(--spotify-green); fill:var(--spotify-green); position:absolute; top:-6px; right:-6px;" class="star-popup"></i>` : '';
                        html += `
                            <div style="width:90px; height:50px; border-radius:8px; background:${gradients[id]}; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; font-size:12px; color:#fff; position:relative; text-align:center; padding: 2px; box-sizing: border-box; box-shadow: 0 4px 10px rgba(0,0,0,0.2); ${border}">
                                ${names[id]}
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
                renderStream(streamBoxFY, fySequence, progress >= 0.20);
                renderStream(streamBoxSpotify, spotSequence, false);

                if (progress >= 0.20) {
                    if (alertLbl) alertLbl.textContent = '⚠️ Trùng cụm: Sơn Tùng M-TP hát liên tiếp!';
                    if (compLbl1) compLbl1.innerHTML = '<strong>Đã phát hiện trùng:</strong> Người dùng sẽ nghi ngờ nút Shuffle.';
                } else {
                    if (alertLbl) alertLbl.textContent = '';
                    if (compLbl1) compLbl1.textContent = 'Đang bắt đầu phát danh sách âm nhạc...';
                }

                if (progress >= 0.45) {
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
