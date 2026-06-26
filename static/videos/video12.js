/**
 * Video 12: YouTube 4K Streaming (DASH, CDN GGC, Codecs VP9/AV1, Buffering)
 * Plugin file - contains slide animation, GFX rendering templates, and frame update handlers.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_stream_1a: [
            { text: 'video 4K', start: 1.0, end: 4.0, class: 'active-red' },
            { text: 'không một giây khựng lag', start: 4.5, end: 7.5, class: 'active-gold' },
            { text: 'tích tắc', start: 8.0, end: 10.5, class: 'active-good' }
        ],
        slide_stream_1b: [
            { text: 'Sự thật', start: 0.5, end: 2.5, class: 'active-good' },
            { text: 'tốc độ mạng', start: 2.5, end: 4.5, class: 'active-gold' }
        ],
        slide_stream_2a: [
            { text: 'Tải truyền thống', start: 1.0, end: 4.5, class: 'active-bad' },
            { text: 'file lớn', start: 5.0, end: 9.0, class: 'active-gold' },
            { text: 'đứng hình lập tức', start: 10.0, end: 14.5, class: 'active-bad' }
        ],
        slide_stream_3a: [
            { text: 'Giải pháp', start: 0.5, end: 2.5, class: 'active-good' },
            { text: 'chia nhỏ video', start: 3.5, end: 7.0, class: 'active-gold' },
            { text: 'Video Chunking', start: 7.5, end: 11.5, class: 'active-good' }
        ],
        slide_stream_4a: [
            { text: 'Mã hóa', start: 2.0, end: 5.5, class: 'active-good' },
            { text: 'Đa phiên bản', start: 6.0, end: 11.0, class: 'active-gold' },
            { text: 'Manifest', start: 12.0, end: 16.5, class: 'active-good' }
        ],
        slide_stream_5a: [
            { text: 'Mạng phân phối', start: 0.5, end: 3.0, class: 'active-good' },
            { text: 'Google Global Cache', start: 4.5, end: 8.5, class: 'active-good' },
            { text: 'nhà mạng nội địa', start: 10.0, end: 14.0, class: 'active-gold' }
        ],
        slide_stream_6a: [
            { text: 'Thuật toán', start: 0.5, end: 2.5, class: 'active-good' },
            { text: 'Thích ứng mạng', start: 3.0, end: 6.5, class: 'active-good' },
            { text: 'đo tốc độ mạng', start: 7.0, end: 11.0, class: 'active-gold' }
        ],
        slide_stream_7a: [
            { text: 'Mạng lag', start: 0.5, end: 3.0, class: 'active-bad' },
            { text: 'tụt vạch sóng', start: 3.5, end: 6.5, class: 'active-bad' },
            { text: 'độ phân giải thấp hơn', start: 8.0, end: 12.5, class: 'active-gold' }
        ],
        slide_stream_8a: [
            { text: 'Kết quả', start: 0.5, end: 2.5, class: 'active-good' },
            { text: 'chạy liên tục', start: 3.5, end: 6.5, class: 'active-good' },
            { text: 'mờ hơn một chút', start: 7.0, end: 10.5, class: 'active-gold' }
        ],
        slide_stream_9a: [
            { text: 'Phục hồi', start: 0.5, end: 2.5, class: 'active-good' },
            { text: 'nét căng trở lại', start: 3.5, end: 7.5, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_stream_1a', 'slide_stream_1b', 'slide_stream_2a',
        'slide_stream_3a', 'slide_stream_4a', 'slide_stream_5a',
        'slide_stream_6a', 'slide_stream_7a', 'slide_stream_8a', 'slide_stream_9a'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        // Slide 1a & 1b: Intro / Hook
        // Slide 1a: Intro / Hook
        if (slideId === 'slide_stream_1a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="position:relative; max-width:820px; width:86%; margin: 0 auto; flex-direction:column; gap:0px; align-items:center; justify-content:center; height:500px; overflow:visible;">
                        <!-- Rotating Abstract Globe in Background -->
                        <div class="earth-background" style="position:absolute; top:50%; left:50%; width:540px; height:540px; border-radius:50%; border:1.5px dashed rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; transform: translate(-50%, -50%); pointer-events:none;">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" style="animation: spin 30s linear infinite; opacity: 0.5;">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                                <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                                <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                                <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                                <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                            </svg>
                        </div>

                        <!-- Curved Cyber Data Streams Overlay -->
                        <div class="v12-streams-svg-1a" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:4;">
                            <svg width="100%" height="100%" viewBox="0 0 600 400" style="background:transparent; overflow:visible;">
                                <defs>
                                    <linearGradient id="cyber-beam-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#ff007f" stop-opacity="0" />
                                        <stop offset="50%" stop-color="#ff007f" stop-opacity="0.3" />
                                        <stop offset="100%" stop-color="#ff007f" stop-opacity="0.8" />
                                    </linearGradient>
                                </defs>
                                <!-- Curved lines -->
                                <path id="stream-p1" d="M 40 140 Q 150 100 270 190" fill="none" stroke="url(#cyber-beam-pink)" stroke-width="1.5" stroke-dasharray="4, 4" opacity="0.45" />
                                <path id="stream-p2" d="M 560 140 Q 450 100 330 190" fill="none" stroke="url(#cyber-beam-pink)" stroke-width="1.5" stroke-dasharray="4, 4" opacity="0.45" />
                                <path id="stream-p3" d="M 120 40 Q 200 60 280 160" fill="none" stroke="url(#cyber-beam-pink)" stroke-width="1.2" stroke-dasharray="3, 3" opacity="0.35" />
                                <path id="stream-p4" d="M 480 40 Q 400 60 320 160" fill="none" stroke="url(#cyber-beam-pink)" stroke-width="1.2" stroke-dasharray="3, 3" opacity="0.35" />

                                <!-- Glowing circles traveling along paths -->
                                <circle r="4" fill="#ff007f" style="filter: drop-shadow(0 0 5px #ff007f);">
                                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 40 140 Q 150 100 270 190" />
                                </circle>
                                <circle r="4" fill="#ff007f" style="filter: drop-shadow(0 0 5px #ff007f);">
                                    <animateMotion dur="2.6s" repeatCount="indefinite" path="M 560 140 Q 450 100 330 190" />
                                </circle>
                                <circle r="3" fill="#ff007f" style="filter: drop-shadow(0 0 4px #ff007f);">
                                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 120 40 Q 200 60 280 160" />
                                </circle>
                                <circle r="3" fill="#ff007f" style="filter: drop-shadow(0 0 4px #ff007f);">
                                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 480 40 Q 400 60 320 160" />
                                </circle>

                                <text x="45" y="155" fill="#ff007f" font-size="11" font-family="monospace" font-weight="bold" opacity="0.8" text-anchor="middle">US ORIGIN</text>
                                <text x="555" y="155" fill="#ff007f" font-size="11" font-family="monospace" font-weight="bold" opacity="0.8" text-anchor="middle">4K STREAM</text>
                            </svg>
                        </div>

                        <!-- Shockwave -->
                        <div class="cloud-shockwave" style="position:absolute; top:35%; left:50%; transform:translate(-50%, -50%); width:0; height:0; border-radius:50%; border:2px solid #ff007f; opacity:0; pointer-events:none; transition: all 0.5s ease-out; z-index:2;"></div>

                        <!-- Phone Mockup representing USER client (wrapped to prevent override and clip overlap) -->
                        <div class="v12-phone-wrap-1a" style="transform: scale(1.15) translateY(-20px); transform-origin: top center; height: 510px; width: 300px; display: flex; justify-content: center; overflow: visible; z-index: 5;">
                            <div class="yt-phone-container yt-phone-floating" style="margin: 0; height:480px; width:300px;">
                                <div class="yt-phone-notch"></div>
                                
                                <!-- Pulsing play button overlay -->
                                <div class="play-btn-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:8; border-radius:32px; transition: opacity 0.4s ease; pointer-events:none;">
                                    <div style="width:70px; height:70px; border-radius:50%; background:#ff007f; display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(255,0,127,0.6);">
                                        <i data-lucide="play" style="width:28px; height:28px; color:#fff; fill:#fff; margin-left:4px;"></i>
                                    </div>
                                </div>

                                <!-- Video Screen simulation -->
                                <div class="yt-player-display" style="margin-top:15px; border-radius: 20px; flex: 1; height: calc(100% - 75px); overflow: hidden; position: relative;">
                                    <div class="phone-cyber-grid"></div>
                                    
                                    <!-- Animated Background Scenery (Retrowave Sun & Grid) -->
                                    <div class="yt-player-scenery">
                                        <div class="scenery-sun"></div>
                                        <div class="scenery-grid"></div>
                                        <div class="player-hud-wrap">
                                            <div class="hud-left-panel">
                                                <div class="hud-rec-indicator">
                                                    <div class="hud-rec-dot"></div>
                                                    <span>LIVE 4K</span>
                                                </div>
                                                <div class="hud-stats">
                                                    <div>FPS: 60</div>
                                                    <div>INPUT: USA</div>
                                                </div>
                                            </div>
                                            <div class="hud-right-panel">
                                                <div class="hud-eq-wrap">
                                                    <div class="player-eq-bar b-1"></div>
                                                    <div class="player-eq-bar b-2"></div>
                                                    <div class="player-eq-bar b-3"></div>
                                                    <div class="player-eq-bar b-4"></div>
                                                </div>
                                                <div class="hud-audio-freq">AUDIO: OK</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Dynamic data packet badge -->
                                    <div class="packet-speed-badge">
                                        4K Stream: ~45 Mbps
                                    </div>
                                </div>

                                <!-- Bottom Controls: Progress & Duration -->
                                <div style="z-index:2; margin-top:10px;">
                                    <div class="yt-progress-bar">
                                        <div class="yt-progress-buffer" style="width: 0%;"></div>
                                        <div class="yt-progress-playhead" style="width: 0%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.5); margin-top:6px; font-family:monospace;">
                                        <span class="curr-time">0:00</span>
                                        <span>4K UHD 60fps</span>
                                        <span>2:45</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }
        else if (slideId === 'slide_stream_1b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="display:flex; flex-direction:column; gap:5px; padding:10px; width:100%; max-width:820px; width:86%; margin: 0 auto; align-items:center; justify-content:space-between; box-sizing:border-box; height:530px; overflow:visible;">
                        
                        <!-- Curved Cyber Data Streams Overlay -->
                        <div class="v12-streams-svg-1b" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:4;">
                            <svg width="100%" height="100%" viewBox="0 0 600 400" style="background:transparent; overflow:visible;">
                                <defs>
                                    <linearGradient id="cyber-beam-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#00f2fe" stop-opacity="0" />
                                        <stop offset="50%" stop-color="#00f2fe" stop-opacity="0.3" />
                                        <stop offset="100%" stop-color="#00f2fe" stop-opacity="0.8" />
                                    </linearGradient>
                                </defs>
                                <!-- Curved lines -->
                                <path id="stream-b1" d="M 40 140 Q 150 100 270 190" fill="none" stroke="url(#cyber-beam-cyan)" stroke-width="1.5" stroke-dasharray="4, 4" opacity="0.45" />
                                <path id="stream-b2" d="M 560 140 Q 450 100 330 190" fill="none" stroke="url(#cyber-beam-cyan)" stroke-width="1.5" stroke-dasharray="4, 4" opacity="0.45" />
                                <path id="stream-b3" d="M 120 40 Q 200 60 280 160" fill="none" stroke="url(#cyber-beam-cyan)" stroke-width="1.2" stroke-dasharray="3, 3" opacity="0.35" />
                                <path id="stream-b4" d="M 480 40 Q 400 60 320 160" fill="none" stroke="url(#cyber-beam-cyan)" stroke-width="1.2" stroke-dasharray="3, 3" opacity="0.35" />

                                <!-- Glowing circles traveling along paths -->
                                <circle r="4" fill="#00f2fe" style="filter: drop-shadow(0 0 5px #00f2fe);">
                                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 40 140 Q 150 100 270 190" />
                                </circle>
                                <circle r="4" fill="#00f2fe" style="filter: drop-shadow(0 0 5px #00f2fe);">
                                    <animateMotion dur="2.6s" repeatCount="indefinite" path="M 560 140 Q 450 100 330 190" />
                                </circle>
                                <circle r="3" fill="#00f2fe" style="filter: drop-shadow(0 0 4px #00f2fe);">
                                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 120 40 Q 200 60 280 160" />
                                </circle>
                                <circle r="3" fill="#00f2fe" style="filter: drop-shadow(0 0 4px #00f2fe);">
                                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 480 40 Q 400 60 320 160" />
                                </circle>

                                <text x="45" y="155" fill="#00f2fe" font-size="11" font-family="monospace" font-weight="bold" opacity="0.8" text-anchor="middle">GGC CACHE</text>
                                <text x="555" y="155" fill="#00f2fe" font-size="11" font-family="monospace" font-weight="bold" opacity="0.8" text-anchor="middle">10ms LATENCY</text>
                            </svg>
                        </div>

                        <!-- Phone Mockup representing USER playback client (wrapped to prevent override and overlap) -->
                        <div class="v12-phone-wrap-1b" style="transform: scale(1.1) translateY(-35px); transform-origin: top center; height: 480px; width: 300px; display: flex; justify-content: center; overflow: visible; z-index: 5;">
                            <div class="yt-phone-container yt-phone-floating" style="margin: 0; height: 480px; width: 300px;">
                                <div class="yt-phone-notch"></div>
                                
                                <!-- Video Screen simulation inside phone -->
                                <div class="yt-player-display" style="margin-top:15px; border-radius: 20px; flex: 1; height: calc(100% - 75px); overflow: hidden; position: relative;">
                                    <div class="phone-cyber-grid"></div>
                                    <div class="yt-player-scenery">
                                        <div class="scenery-sun" style="background: linear-gradient(to bottom, #00f2fe 0%, #0072ff 100%); filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.5));"></div>
                                        <div class="scenery-grid" style="background-image: linear-gradient(to top, rgba(0, 242, 254, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(0, 242, 254, 0.2) 1px, transparent 1px);"></div>
                                        <div class="player-hud-wrap">
                                            <div class="hud-left-panel">
                                                <div class="hud-rec-indicator" style="border-color: rgba(0, 242, 254, 0.5); box-shadow: 0 0 8px rgba(0, 242, 254, 0.2);">
                                                    <div class="hud-rec-dot" style="background: #00f2fe; box-shadow: 0 0 5px #00f2fe;"></div>
                                                    <span style="color: #00f2fe; text-shadow: 0 0 3px rgba(0, 242, 254, 0.4);">OPTIMIZED</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bottom Controls inside phone screen -->
                                <div style="z-index:2; margin-top:10px;">
                                    <div class="yt-progress-bar">
                                        <div class="yt-progress-buffer" style="width: 80%;"></div>
                                        <div class="yt-progress-playhead" style="width: 25%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.5); margin-top:6px; font-family:monospace;">
                                        <span class="curr-time-1b">0:45</span>
                                        <span>1080p GGC</span>
                                        <span>2:45</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom: Backend stack optimizations (3 cards horizontal) -->
                        <div style="display:flex; flex-direction:row; gap:16px; width:100%; box-sizing:border-box; margin-top:25px; z-index:5;">
                            <!-- Card 1 -->
                            <div class="glass-card v12-card-chunk" style="flex:1; display:flex; align-items:center; gap:8px; border:1px solid var(--yt-border); border-radius:12px; padding:10px 12px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); text-align:left;">
                                <span style="font-size:18px; flex-shrink:0;">📂</span>
                                <div style="display:flex; flex-direction:column; line-height:1.2;">
                                    <span style="font-size:12px; font-weight:bold; color:#fff;">Video Chunking</span>
                                    <span style="font-size:9.5px; color:rgba(255,255,255,0.5);">Splits video into 2-4s segments</span>
                                </div>
                            </div>
                            <!-- Card 2 -->
                            <div class="glass-card v12-card-ggc" style="flex:1; display:flex; align-items:center; gap:8px; border:1px solid var(--yt-border); border-radius:12px; padding:10px 12px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); text-align:left;">
                                <span style="font-size:18px; flex-shrink:0;">🌐</span>
                                <div style="display:flex; flex-direction:column; line-height:1.2;">
                                    <span style="font-size:12px; font-weight:bold; color:#fff;">GGC CDN Edge</span>
                                    <span style="font-size:9.5px; color:rgba(255,255,255,0.5);">Caches copies at local ISP</span>
                                </div>
                            </div>
                            <!-- Card 3 -->
                            <div class="glass-card v12-card-abr" style="flex:1; display:flex; align-items:center; gap:8px; border:1px solid var(--yt-border); border-radius:12px; padding:10px 12px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); text-align:left;">
                                <span style="font-size:18px; flex-shrink:0;">🧠</span>
                                <div style="display:flex; flex-direction:column; line-height:1.2;">
                                    <span style="font-size:12px; font-weight:bold; color:#fff;">ABR Algorithm</span>
                                    <span style="font-size:9.5px; color:rgba(255,255,255,0.5);">Dynamic quality scaling on-the-fly</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }

        // Slide 2a: Traditional single MP4 download issue
        else if (slideId === 'slide_stream_2a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="flex-direction:column; gap:0px; padding:10px 15px; width:100%; max-width:520px; margin: -25px auto 0 auto; align-items:center; justify-content:center; box-sizing:border-box; height:auto; overflow:visible;">
                        
                        <!-- Top: Phone Mockup (wrapped to prevent overlap and animation clash) -->
                        <div style="transform: scale(0.78); transform-origin: top center; height: 380px; width: 300px; display: flex; justify-content: center; overflow: visible; z-index: 5;">
                            <div class="yt-phone-container yt-phone-floating" style="margin: 0; height: 480px; width: 300px;">
                                <div class="yt-phone-notch"></div>
                                <div class="yt-player-display" style="margin-top:15px; border-radius: 20px; flex: 1; height: calc(100% - 75px); overflow: hidden; position: relative;">
                                    <div class="phone-cyber-grid"></div>
                                    <div class="yt-player-scenery video-playback-screen" style="transition: filter 0.3s ease;">
                                        <div class="scenery-sun"></div>
                                        <div class="scenery-grid"></div>
                                    </div>
                                    
                                    <!-- Buffering Spinner overlay -->
                                    <div class="mp4-spinner-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:8; opacity:0; transition: opacity 0.3s ease; pointer-events:none;">
                                        <div class="spinner-icon" style="width:40px; height:40px; border:4px solid rgba(255,255,255,0.1); border-top-color:#ff007f; border-radius:50%; animation: spin 1s linear infinite;"></div>
                                        <span style="font-family:monospace; font-size:10px; color:#ff007f; font-weight:bold; margin-top:10px; letter-spacing:1px;">BUFFERING...</span>
                                    </div>
                                </div>
                                
                                <div style="z-index:2; margin-top:10px;">
                                    <div class="yt-progress-bar">
                                        <div class="yt-progress-buffer" style="width: 0%;"></div>
                                        <div class="yt-progress-playhead" style="width: 0%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.5); margin-top:6px; font-family:monospace;">
                                        <span class="curr-time">0:00</span>
                                        <span>Traditional MP4</span>
                                        <span>2:45</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mid: Connection line with packets flowing upward -->
                        <div style="position:relative; width:100%; height:60px; margin: 2px 0; z-index: 4;">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
                                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="4, 4" />
                                <line class="glowing-flow-line mp4-flow-line" x1="50%" y1="100%" x2="50%" y2="0%" stroke="#10b981" stroke-width="1.5" stroke-dasharray="8, 12" style="filter: drop-shadow(0 0 4px #10b981);" />
                            </svg>
                            <!-- Packets flowing upward -->
                            <div class="yt-stream-packet-up mp4-pack" style="animation-name: packetFlowUpward; animation-duration: 1.8s; left: 50%; bottom: 0; background:#10b981; color:#10b981;"></div>
                            <!-- Flowing MBs Text Tags -->
                            <div class="flowing-mb-tag-up cyan mp4-mb-tag" style="animation: mbFlowUpward 1.8s linear infinite; animation-delay: 0.6s;">12 Mbps</div>
                        </div>

                        <!-- Bottom: Traditional Server Download Monitor -->
                        <div class="glass-card" style="width:100%; display:flex; flex-direction:column; border:1.5px solid var(--yt-border); border-radius:16px; padding:10px 12px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); box-sizing:border-box; height: 160px; justify-content: center; position:relative; overflow:hidden; z-index: 5;">
                            <div style="font-size:10px; font-family:monospace; color:#ff007f; font-weight:bold; letter-spacing:1px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px; display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                                <i data-lucide="server" style="width:12px; height:12px; color:#ff007f;"></i> TRADITIONAL MP4 SERVER
                            </div>
                            
                            <!-- Large File Info -->
                            <div style="display:flex; flex-direction:column; gap:6px; text-align:left; font-family:monospace;">
                                <div style="display:flex; justify-content:space-between; font-size:9.5px; color:rgba(255,255,255,0.7);">
                                    <span>FILE: large_video_4K.mp4</span>
                                    <span>SIZE: 1.8 GB</span>
                                </div>
                                
                                <!-- Connection Speed -->
                                <div style="display:flex; justify-content:space-between; font-size:9.5px; color:rgba(255,255,255,0.7);">
                                    <span>SPEED: <span class="mp4-speed-val" style="color:#ff007f; font-weight:bold;">12 Mbps</span></span>
                                    <span>STATUS: <span class="mp4-status-val" style="color:#ff007f; font-weight:bold;">DOWNLOADING...</span></span>
                                </div>
                                
                                <!-- Progress Bar -->
                                <div style="width:100%; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden; border: 1px solid rgba(255,255,255,0.05); margin-top:2px; margin-bottom:2px;">
                                    <div class="mp4-fill-bar" style="height:100%; width:0%; background:linear-gradient(90deg, #ff007f, #b3005c); box-shadow: 0 0 10px rgba(255,0,127,0.4); transition:width 0.1s linear;"></div>
                                </div>

                                <div style="display:flex; justify-content:space-between; font-size:9.5px;">
                                    <span class="mp4-pct-val" style="color:#fff; font-weight:bold;">0%</span>
                                    <span style="color:rgba(255,255,255,0.4);">450 MB / 1.8 GB</span>
                                </div>
                                
                                <!-- Error Box -->
                                <div class="mp4-alert-box" style="text-align:center; padding:4px; border-radius:6px; font-size:8.5px; font-weight:bold; color:#ff007f; opacity:0; transition:all 0.3s; text-transform:uppercase; border: 1px solid rgba(255,0,127,0.25); background:rgba(255,0,127,0.05); animation: alertPulse 1.5s infinite alternate; margin-top:4px;">
                                    ⚠️ BUFFER STALLED - NETWORK TIMEOUT
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }

        else if (slideId === 'slide_stream_3a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="flex-direction:column; gap:0px; padding:10px 15px; width:100%; max-width:520px; margin: -25px auto 0 auto; align-items:center; justify-content:center; box-sizing:border-box; height:auto; overflow:visible; position:relative;">
                        
                        <!-- Top: Phone Mockup (wrapped to prevent overlaps and animation clashes) -->
                        <div style="transform: scale(0.78); transform-origin: top center; height: 380px; width: 300px; display: flex; justify-content: center; overflow: visible; z-index: 5;">
                            <div class="yt-phone-container yt-phone-floating" style="margin: 0; height: 480px; width: 300px;">
                                <div class="yt-phone-notch"></div>
                                <div class="yt-player-display" style="margin-top:15px; border-radius: 20px; flex: 1; height: calc(100% - 75px); overflow: hidden; position: relative;">
                                    <div class="phone-cyber-grid"></div>
                                    <div class="yt-player-scenery">
                                        <div class="scenery-sun"></div>
                                        <div class="scenery-grid"></div>
                                        <div class="player-hud-wrap">
                                            <div class="hud-left-panel">
                                                <div class="hud-rec-indicator">
                                                    <div class="hud-rec-dot"></div>
                                                    <span>CHUNK PLAYBACK</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="z-index:2; margin-top:10px;">
                                    <div class="yt-progress-bar">
                                        <div class="yt-progress-buffer" style="width: 0%;"></div>
                                        <div class="yt-progress-playhead" style="width: 0%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.5); margin-top:6px; font-family:monospace;">
                                        <span class="curr-time">0:00</span>
                                        <span>DASH Stream</span>
                                        <span>2:45</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mid: Flying chunks area (hidden, absolute overlay) -->
                        <div class="flying-chunks-area" style="position:absolute; inset:0; pointer-events:none; z-index: 9;">
                            <div class="flying-chunk-p chunk-fp1" style="position:absolute; bottom:115px; left:6%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C1</div>
                            <div class="flying-chunk-p chunk-fp2" style="position:absolute; bottom:115px; left:18%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C2</div>
                            <div class="flying-chunk-p chunk-fp3" style="position:absolute; bottom:115px; left:30%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C3</div>
                            <div class="flying-chunk-p chunk-fp4" style="position:absolute; bottom:115px; left:42%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C4</div>
                            <div class="flying-chunk-p chunk-fp5" style="position:absolute; bottom:115px; left:54%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C5</div>
                            <div class="flying-chunk-p chunk-fp6" style="position:absolute; bottom:115px; left:66%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C6</div>
                            <div class="flying-chunk-p chunk-fp7" style="position:absolute; bottom:115px; left:78%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C7</div>
                            <div class="flying-chunk-p chunk-fp8" style="position:absolute; bottom:115px; left:90%; width:34px; height:20px; border-radius:4px; background:#ff007f; color:#fff; font-size:9px; font-weight:bold; display:flex; align-items:center; justify-content:center; opacity:0; box-shadow:0 0 8px #ff007f;">C8</div>
                        </div>

                        <!-- Bottom: Laser Chunking Simulator (Stacked with 8 square chunks) -->
                        <div class="glass-card" style="width:100%; display:flex; flex-direction:column; border:1.5px solid var(--yt-border); border-radius:16px; padding:8px 10px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); box-sizing:border-box; height: 115px; justify-content: center; position:relative; overflow:hidden; z-index: 5;">
                            <div style="font-size:9px; font-family:monospace; color:#ff007f; font-weight:bold; letter-spacing:1px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:3px; display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                                <i data-lucide="scissors" style="width:10px; height:10px; color:#ff007f;"></i> VIDEO CHUNKING: 2-SECOND SEGMENTS
                            </div>
                            
                            <div style="display:flex; justify-content: space-between; gap:4px; width:100%; position:relative; padding:5px 0; align-items:center;">
                                <!-- Laser cutter sweeper -->
                                <div class="laser-cutter" style="left: 0%; height: 40px; top: 0px;"></div>
                                
                                <!-- 8 square chunks -->
                                <div class="dash-chunk-block chunk-s1" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C1</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s2" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C2</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s3" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C3</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s4" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C4</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s5" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C5</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s6" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C6</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s7" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C7</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                                <div class="dash-chunk-block chunk-s8" style="width:40px; height:40px; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: all 0.3s; flex: none; box-sizing: border-box;">
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);">C8</span>
                                    <span style="font-size:9px; font-weight:bold; color:#fff;">2s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }


        // Slide 4a: Mã hóa: Transcoding / Manifest lists
        else if (slideId === 'slide_stream_4a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="flex-direction:column; gap:0px; padding:10px 15px; width:100%; max-width:680px; margin: 0 auto; align-items:center; justify-content:center; box-sizing:border-box; height:auto; overflow:visible; margin-top: 10px;">
                        
                        <!-- Top: Transcoding Server Blades -->
                        <div class="glass-card" style="width:100%; display:flex; flex-direction:column; border:1.5px solid var(--yt-border); border-radius:16px; padding:12px 14px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); box-sizing:border-box; height:195px; justify-content:center; z-index: 5;">
                            <div style="font-size:11.5px; font-family:monospace; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; text-align:left;">
                                TRANSCODED QUALITY OUTPUTS
                            </div>
                            
                            <div style="display:flex; flex-direction:column; gap:8px;">
                                <div class="transcoding-blade-item res-4k-blade" style="display:flex; align-items:center; gap:10px; padding:6px 12px; border-radius:8px; background:rgba(255, 0, 127, 0.04); border:1px solid rgba(255, 0, 127, 0.2); transition:all 0.3s;">
                                    <div style="color:#ff007f; display:flex; align-items:center;"><i data-lucide="video" style="width:15px; height:15px;"></i></div>
                                    <div style="flex:1; text-align:left; line-height:1.2;">
                                        <div style="font-size:13px; font-weight:bold; color:#fff;">4K UHD (2160p)</div>
                                        <div style="font-size:9.5px; color:rgba(255,255,255,0.5);">AV1/VP9 • 45 Mbps</div>
                                    </div>
                                    <div style="background:rgba(255,0,127,0.15); border:1px solid rgba(255,0,127,0.4); color:#ff007f; font-size:9px; font-weight:bold; padding:2px 6px; border-radius:3px; font-family:monospace;">READY</div>
                                </div>

                                <div class="transcoding-blade-item res-1080p-blade" style="display:flex; align-items:center; gap:10px; padding:6px 12px; border-radius:8px; background:rgba(245, 158, 11, 0.04); border:1px solid rgba(245, 158, 11, 0.2); transition:all 0.3s;">
                                    <div style="color:#f59e0b; display:flex; align-items:center;"><i data-lucide="video" style="width:15px; height:15px;"></i></div>
                                    <div style="flex:1; text-align:left; line-height:1.2;">
                                        <div style="font-size:13px; font-weight:bold; color:#fff;">1080p FHD</div>
                                        <div style="font-size:9.5px; color:rgba(255,255,255,0.5);">VP9/H.264 • 8 Mbps</div>
                                    </div>
                                    <div style="background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.4); color:#f59e0b; font-size:9px; font-weight:bold; padding:2px 6px; border-radius:3px; font-family:monospace;">READY</div>
                                </div>

                                <div class="transcoding-blade-item res-360p-blade" style="display:flex; align-items:center; gap:10px; padding:6px 12px; border-radius:8px; background:rgba(16, 185, 129, 0.04); border:1px solid rgba(16, 185, 129, 0.2); transition:all 0.3s;">
                                    <div style="color:#10b981; display:flex; align-items:center;"><i data-lucide="video" style="width:15px; height:15px;"></i></div>
                                    <div style="flex:1; text-align:left; line-height:1.2;">
                                        <div style="font-size:13px; font-weight:bold; color:#fff;">360p SD</div>
                                        <div style="font-size:9.5px; color:rgba(255,255,255,0.5);">H.264 • 1.5 Mbps</div>
                                    </div>
                                    <div style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.4); color:#10b981; font-size:9px; font-weight:bold; padding:2px 6px; border-radius:3px; font-family:monospace;">READY</div>
                                </div>
                            </div>
                        </div>

                        <!-- Mid: Connection flow line -->
                        <div style="position:relative; width:100%; height:50px; margin: 2px 0; z-index: 4;">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
                                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="4, 4" />
                                <line class="glowing-flow-line" x1="50%" y1="0%" x2="50%" y2="100%" stroke="#ff007f" stroke-width="2.5" stroke-dasharray="8, 12" style="filter: drop-shadow(0 0 4px #ff007f);" />
                            </svg>
                            <!-- Code packets flowing down -->
                            <div class="yt-stream-packet" style="animation-name: packetFlow1a; animation-duration: 1.5s; left: 50%; top: 0; background:#ff007f;"></div>
                            <div class="flowing-mb-tag" style="animation: mbFlow1a 1.5s linear infinite; animation-delay: 0.5s; font-size: 10.5px; left: calc(50% + 10px);">index_manifest.m3u8</div>
                        </div>

                        <!-- Bottom: Manifest Editor -->
                        <div class="manifest-editor-container" style="width:100%; display:flex; flex-direction:column; gap:0px; height:210px; z-index: 5;">
                            <!-- IDE Header Bar -->
                            <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(10,10,15,0.85); border:1px solid rgba(255,255,255,0.06); border-bottom:none; border-radius:8px 8px 0 0; padding:6px 12px; box-sizing:border-box;">
                                <div style="display:flex; gap:6px;">
                                    <div style="width:8px; height:8px; border-radius:50%; background:#ff5f56;"></div>
                                    <div style="width:8px; height:8px; border-radius:50%; background:#ffbd2e;"></div>
                                    <div style="width:8px; height:8px; border-radius:50%; background:#27c93f;"></div>
                                </div>
                                <div style="font-size:11px; font-family:monospace; color:rgba(255,255,255,0.5); display:flex; align-items:center; gap:6px; font-weight:bold;">
                                    <i data-lucide="file-code" style="width:13px; height:13px; color:#ff007f;"></i> index_manifest.m3u8
                                </div>
                                <div style="width:20px;"></div>
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size:13px; display:flex; background:#020205; border-radius:0 0 8px 8px; padding:12px; border:1px solid rgba(255,255,255,0.06); box-sizing:border-box; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); height: calc(100% - 24px); text-align:left;">
                                <!-- Line Numbers -->
                                <div style="color:rgba(255,255,255,0.15); text-align:right; padding-right:10px; border-right:1px solid rgba(255,255,255,0.05); user-select:none; display:flex; flex-direction:column; gap:5px;">
                                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
                                </div>
                                <!-- Code Content -->
                                <div style="color:rgba(255,255,255,0.55); padding-left:10px; display:flex; flex-direction:column; gap:5px; text-align:left; width:100%; overflow:hidden;">
                                    <div>#EXTM3U</div>
                                    <div>#EXT-X-STREAM-INF:BANDWIDTH=45000000</div>
                                    <div style="color:#ff007f; font-weight:bold; text-shadow:0 0 4px rgba(255,0,127,0.2); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">/video_4k_chunk1.ts</div>
                                    <div>#EXT-X-STREAM-INF:BANDWIDTH=8000000</div>
                                    <div style="color:#f59e0b; font-weight:bold; text-shadow:0 0 4px rgba(245,158,11,0.2); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">/video_1080p_chunk1.ts</div>
                                    <div>#EXT-X-STREAM-INF:BANDWIDTH=1500000</div>
                                    <div style="color:#00f2fe; font-weight:bold; text-shadow:0 0 4px rgba(0,242,254,0.2); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">/video_360p_chunk1.ts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }

        else if (slideId === 'slide_stream_5a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="flex-direction:column; gap:8px; padding:10px; width: 100%; max-width: 620px; margin: 0 auto; flex-shrink:0; height:auto; display:flex; justify-content:center; align-items:center; box-sizing:border-box;">
                        
                        <!-- Top: Geographical Map SVG -->
                        <div style="width:100%; height:285px; display:flex; justify-content:center; align-items:center; position:relative;">
                            <svg width="100%" height="285" viewBox="30 30 310 195" style="background: transparent;" id="ggc-svg-map">
                                <defs>
                                    <pattern id="ggc-grid-pattern" width="12" height="12" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="0.8" fill="rgba(255, 255, 255, 0.05)" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#ggc-grid-pattern)" />

                                <!-- Undersea Fiber Line Ocean (USA to SG) -->
                                <path class="fiber-line-ocean" d="M 45 50 L 120 150" fill="none" stroke="rgba(255, 0, 127, 0.25)" stroke-width="3" stroke-linecap="round" />
                                <path class="fiber-line-ocean-flow fiber-flow-line" d="M 45 50 L 120 150" fill="none" stroke="#ff007f" stroke-width="3" stroke-linecap="round" style="filter: drop-shadow(0 0 4px #ff007f);" />

                                <!-- Singapore to Vietnam Region Lines -->
                                <path class="fiber-line-sg-vnpt" d="M 120 150 L 260 55" fill="none" stroke="rgba(255, 0, 127, 0.25)" stroke-width="2.5" stroke-linecap="round" />
                                <path class="fiber-line-sg-vnpt-flow fiber-flow-line" d="M 120 150 L 260 55" fill="none" stroke="#ff007f" stroke-width="2.5" stroke-linecap="round" style="filter: drop-shadow(0 0 4px #ff007f);" />
                                
                                <path class="fiber-line-sg-vtl" d="M 120 150 L 320 100" fill="none" stroke="rgba(255, 0, 127, 0.25)" stroke-width="2.5" stroke-linecap="round" />
                                <path class="fiber-line-sg-vtl-flow fiber-flow-line" d="M 120 150 L 320 100" fill="none" stroke="#ff007f" stroke-width="2.5" stroke-linecap="round" style="filter: drop-shadow(0 0 4px #ff007f);" />

                                <path class="fiber-line-sg-fpt" d="M 120 150 L 260 145" fill="none" stroke="rgba(255, 0, 127, 0.25)" stroke-width="2.5" stroke-linecap="round" />
                                <path class="fiber-line-sg-fpt-flow fiber-flow-line" d="M 120 150 L 260 145" fill="none" stroke="#ff007f" stroke-width="2.5" stroke-linecap="round" style="filter: drop-shadow(0 0 4px #ff007f);" />

                                <!-- Vietnam Caches to User Domestic Lines (Idle first, active later) -->
                                <path class="fiber-line-cache-vnpt" d="M 260 55 L 260 210" fill="none" stroke="rgba(0, 242, 254, 0.15)" stroke-width="2.5" stroke-linecap="round" style="opacity: 0;" />
                                <path class="fiber-line-cache-vnpt-flow fiber-flow-line" d="M 260 55 L 260 210" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" style="opacity: 0; filter: drop-shadow(0 0 4px #00f2fe);" />

                                <path class="fiber-line-cache-vtl" d="M 320 100 L 260 210" fill="none" stroke="rgba(0, 242, 254, 0.15)" stroke-width="2.5" stroke-linecap="round" style="opacity: 0;" />
                                <path class="fiber-line-cache-vtl-flow fiber-flow-line" d="M 320 100 L 260 210" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" style="opacity: 0; filter: drop-shadow(0 0 4px #00f2fe);" />

                                <path class="fiber-line-cache-fpt" d="M 260 145 L 260 210" fill="none" stroke="rgba(0, 242, 254, 0.15)" stroke-width="2.5" stroke-linecap="round" style="opacity: 0;" />
                                <path class="fiber-line-cache-fpt-flow fiber-flow-line" d="M 260 145 L 260 210" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" style="opacity: 0; filter: drop-shadow(0 0 4px #00f2fe);" />

                                <!-- USA Origin Server -->
                                <g class="usa-cluster-node" transform="translate(45, 50)">
                                    <circle cx="0" cy="0" r="18" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                    <circle cx="0" cy="0" r="13" fill="none" stroke="#ff007f" stroke-width="1.8" style="stroke-dasharray: 4, 2; filter: drop-shadow(0 0 6px #ff007f);"/>
                                    <text x="0" y="3.5" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">USA</text>
                                    <text x="0" y="-23" font-size="10.5" fill="rgba(255,255,255,0.65)" font-family="Outfit, sans-serif" text-anchor="middle" font-weight="bold">USA Server</text>
                                </g>

                                <!-- Cable Cut Cross Alert -->
                                <g class="cable-cut-cross" transform="translate(82.5, 100)" style="opacity: 0; transition: opacity 0.3s;">
                                    <circle r="16" fill="#000" stroke="#ef4444" stroke-width="2.5" />
                                    <line x1="-5" y1="-5" x2="5" y2="5" stroke="#ef4444" stroke-width="2.5" />
                                    <line x1="5" y1="-5" x2="-5" y2="5" stroke="#ef4444" stroke-width="2.5" />
                                    <text x="22" y="3.5" font-size="11" fill="#ef4444" font-weight="bold" font-family="monospace" text-anchor="start">FIBER SEVERED</text>
                                </g>

                                <!-- SG Hub -->
                                <g class="sg-transit-node" transform="translate(120, 150)">
                                    <circle cx="0" cy="0" r="16" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                    <circle cx="0" cy="0" r="11" fill="none" stroke="#f59e0b" stroke-width="1.5" style="stroke-dasharray: 3, 2; filter: drop-shadow(0 0 5px #f59e0b);"/>
                                    <text x="0" y="3.5" font-size="8.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">SG</text>
                                    <text x="0" y="25" font-size="10.5" fill="rgba(255,255,255,0.65)" font-family="Outfit, sans-serif" text-anchor="middle" font-weight="bold">SG Transit</text>
                                </g>

                                <!-- VN Cache Nodes -->
                                <g class="vn-node vnpt-node" transform="translate(260, 55)" style="opacity: 0.25; transition: all 0.5s;">
                                    <circle cx="0" cy="0" r="18" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                    <circle class="ggc-core-ring vnpt-core-ring" cx="0" cy="0" r="13" fill="none" stroke="#00f2fe" stroke-width="1.2" style="stroke-dasharray: 4, 2; filter: drop-shadow(0 0 4px #00f2fe);"/>
                                    <text x="0" y="3.5" font-size="8.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">VNPT</text>
                                </g>

                                <g class="vn-node viettel-node" transform="translate(320, 100)" style="opacity: 0.25; transition: all 0.5s;">
                                    <circle cx="0" cy="0" r="18" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                    <circle class="ggc-core-ring viettel-core-ring" cx="0" cy="0" r="13" fill="none" stroke="#00f2fe" stroke-width="1.2" style="stroke-dasharray: 4, 2; filter: drop-shadow(0 0 4px #00f2fe);"/>
                                    <text x="0" y="3.5" font-size="8.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">VTL</text>
                                </g>

                                <g class="vn-node fpt-node" transform="translate(260, 145)" style="opacity: 0.25; transition: all 0.5s;">
                                    <circle cx="0" cy="0" r="18" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                    <circle class="ggc-core-ring fpt-core-ring" cx="0" cy="0" r="13" fill="none" stroke="#00f2fe" stroke-width="1.2" style="stroke-dasharray: 4, 2; filter: drop-shadow(0 0 4px #00f2fe);"/>
                                    <text x="0" y="3.5" font-size="8.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">FPT</text>
                                </g>

                                <!-- User Client Node -->
                                <g class="user-client-node" transform="translate(260, 210)">
                                    <circle cx="0" cy="0" r="20" fill="#0d0d12" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                                    <circle cx="0" cy="0" r="14" fill="none" stroke="#00f2fe" stroke-width="1.2" style="opacity:0.3; filter: drop-shadow(0 0 4px #00f2fe);"/>
                                    <text x="0" y="4" font-size="10.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">USER</text>
                                    <text x="0" y="-30" font-size="10" fill="rgba(255,255,255,0.65)" font-family="monospace" text-anchor="middle" class="user-latency-lbl">Ping: 350ms</text>
                                </g>
                            </svg>
                        </div>
                        
                        <!-- Bottom: GGC Caching Status Dashboard -->
                        <div class="glass-card ggc-dashboard-card" style="width:100%; border:1.5px solid var(--yt-border); border-radius:16px; padding:12px 14px; background:rgba(10,10,15,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); box-sizing:border-box; height:150px; display:flex; flex-direction:column; justify-content:center; gap:8px; z-index: 5;">
                            <!-- Title and Global Status -->
                            <div style="font-size:11.5px; font-family:monospace; color:#00f2fe; font-weight:bold; letter-spacing:1px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:5px; display:flex; justify-content:space-between; align-items:center;">
                                <span><i data-lucide="activity" style="width:13px; height:13px; color:#00f2fe; vertical-align:middle; margin-right:4px;"></i> GGC LOCAL EDGE ROUTING</span>
                                <span class="ggc-global-status" style="color:rgba(255,255,255,0.45); font-size:10px;">CHECKING...</span>
                            </div>
                            
                            <!-- ISP Rows -->
                            <div style="display:flex; flex-direction:column; gap:6px;">
                                <!-- VNPT Row -->
                                <div class="ggc-isp-row vnpt-row" style="display:flex; align-items:center; justify-content:space-between; font-size:11px; font-family:monospace; padding:5px 8px; border-radius:6px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); transition:all 0.3s;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span class="status-led vnpt-led dim" style="width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
                                        <span style="color:#fff; font-weight:bold;">VNPT</span>
                                        <span style="color:rgba(255,255,255,0.4); font-size:9.5px;">GGC-VNPT-01</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:16px;">
                                        <span class="vnpt-ping" style="color:rgba(255,255,255,0.4);">Ping: --</span>
                                        <span class="vnpt-hit" style="color:rgba(255,255,255,0.4);">Hit Rate: --</span>
                                    </div>
                                </div>

                                <!-- Viettel Row -->
                                <div class="ggc-isp-row viettel-row" style="display:flex; align-items:center; justify-content:space-between; font-size:11px; font-family:monospace; padding:5px 8px; border-radius:6px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); transition:all 0.3s;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span class="status-led viettel-led dim" style="width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
                                        <span style="color:#fff; font-weight:bold;">VIETTEL</span>
                                        <span style="color:rgba(255,255,255,0.4); font-size:9.5px;">GGC-VTL-02</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:16px;">
                                        <span class="viettel-ping" style="color:rgba(255,255,255,0.4);">Ping: --</span>
                                        <span class="viettel-hit" style="color:rgba(255,255,255,0.4);">Hit Rate: --</span>
                                    </div>
                                </div>

                                <!-- FPT Row -->
                                <div class="ggc-isp-row fpt-row" style="display:flex; align-items:center; justify-content:space-between; font-size:11px; font-family:monospace; padding:5px 8px; border-radius:6px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); transition:all 0.3s;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span class="status-led fpt-led dim" style="width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
                                        <span style="color:#fff; font-weight:bold;">FPT TELECOM</span>
                                        <span style="color:rgba(255,255,255,0.4); font-size:9.5px;">GGC-FPT-01</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:16px;">
                                        <span class="fpt-ping" style="color:rgba(255,255,255,0.4);">Ping: --</span>
                                        <span class="fpt-hit" style="color:rgba(255,255,255,0.4);">Hit Rate: --</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }
        else if (slideId === 'slide_stream_6a' || slideId === 'slide_stream_7a' || slideId === 'slide_stream_8a' || slideId === 'slide_stream_9a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="yt-wrapper video12-wrapper" style="flex-direction:column; gap:0px; padding:10px 15px; width: 100%; max-width: 760px; margin: 10px auto 0 auto; align-items: center; justify-content: center; box-sizing:border-box; height:auto; overflow:visible;">
                        
                        <!-- Top: Phone Mockup playing video (Smaller & Sleeker) -->
                        <div style="display:flex; flex-direction:column; gap:5px; align-items:center; justify-content:center; width:100%; overflow:visible; z-index: 5;">
                            <div class="yt-phone-mockup-small yt-phone-floating" style="margin-right: 0px; width: 200px; height: 280px; border: 3.5px solid #27272a; border-radius:20px; display:flex; flex-direction:column; justify-content:space-between; padding:8px; box-sizing:border-box; background: #0d0d12;">
                                <div class="yt-phone-notch"></div>
                                
                                <div class="yt-player-display" style="width:100%; height:100%; margin-top:5px; border-radius: 12px; position:relative; overflow:hidden;">
                                    <div class="phone-cyber-grid"></div>
                                    
                                    <!-- Animated Background Scenery -->
                                    <div class="yt-player-scenery video-playback-screen" style="transition: filter 0.8s ease;">
                                        <div class="scenery-sun" style="width: 70px; height: 70px; top: 38%;"></div>
                                        <div class="scenery-grid"></div>
                                        
                                        <div class="player-hud-wrap" style="inset: 6px;">
                                            <div class="hud-left-panel" style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                                                <div class="hud-rec-indicator" style="padding: 1.5px 3px;">
                                                    <div class="hud-rec-dot"></div>
                                                    <span class="video-quality-hud" style="font-size: 7px; color:#ff007f;">4K UHD</span>
                                                </div>
                                                <!-- Dynamic Audio Wave Graph -->
                                                <div class="audio-waves-hud">
                                                    <div class="audio-wave-bar wb-1"></div>
                                                    <div class="audio-wave-bar wb-2"></div>
                                                    <div class="audio-wave-bar wb-3"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Alert overlay inside phone screen -->
                                    <div class="phone-alert-overlay" style="font-size: 7px; top: 35%;">⚠️ CONGESTION!</div>

                                    <!-- Success recovery badge -->
                                    <div class="success-restore-badge" style="display:none; font-size: 6.5px; top: 12px; padding: 2px 6px;">⚡ 4K RESTORED</div>

                                    <!-- Spinner overlay inside screen -->
                                    <div class="phone-spinner-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:8; opacity:0; transition: opacity 0.3s ease; pointer-events:none;">
                                        <div class="spinner-icon" style="width:24px; height:24px; border:2px solid rgba(255,255,255,0.1); border-top-color:#ff007f; border-radius:50%; animation: spin 1s linear infinite;"></div>
                                    </div>

                                    <!-- Progress bar inside phone screen -->
                                    <div style="position: absolute; bottom: 6px; left: 6px; right: 6px; z-index: 5;">
                                        <div class="yt-progress-bar" style="height: 3px;">
                                            <div class="yt-progress-buffer" style="width: 0%;"></div>
                                            <div class="yt-progress-playhead" style="width: 0%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mid: Connection line area with packets flowing UPWARD -->
                        <div style="position:relative; width:100%; height:45px; margin: 2px 0; z-index: 4;">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
                                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="4, 4" />
                                <line class="glowing-flow-line ABR-flow-line" x1="50%" y1="100%" x2="50%" y2="0%" stroke="#10b981" stroke-width="1.5" stroke-dasharray="8, 12" style="filter: drop-shadow(0 0 4px #10b981);" />
                            </svg>
                            <!-- Packets flowing upward -->
                            <div class="yt-stream-packet-up ABR-pack" style="animation-name: packetFlowUpward; animation-duration: 1.8s; left: 50%; bottom: 0; background:#10b981; color:#10b981;"></div>
                            <!-- Flowing MBs Text Tags -->
                            <div class="flowing-mb-tag-up green ABR-mb-tag" style="animation: mbFlowUpward 1.8s linear infinite; animation-delay: 0.6s;">45 Mbps</div>
                        </div>

                        <!-- Bottom: Telemetry Dashboard (Sleek and Spacious) -->
                        <div class="glass-card abr-telemetry-dashboard" style="width: 100%; height: 200px; border: 1.5px solid var(--yt-border); border-radius: 20px; background: rgba(10,10,15,0.7); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); padding: 12px; overflow: hidden; display: flex; flex-direction:column; justify-content: space-between; position: relative; box-sizing:border-box; z-index: 5;">
                            <!-- Dashboard Header -->
                            <div style="font-size:10px; font-family:monospace; color:#00f2fe; font-weight:bold; letter-spacing:1px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:5px; display:flex; justify-content:space-between; align-items:center; width:100%;">
                                <span style="display:flex; align-items:center; gap:5px;">
                                    <i data-lucide="activity" style="width:12px; height:12px; color:#00f2fe;"></i> ABR TELEMETRY MONITOR
                                </span>
                                <span class="telemetry-status-badge" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 7.5px; padding: 1px 6px; border-radius: 4px; font-family: monospace;">TIME: <span class="curr-time">0:00</span> / 2:45</span>
                            </div>
                            
                            <!-- Dashboard Body Grid -->
                            <div style="display: flex; flex: 1; width: 100%; gap: 10px; margin-top: 8px; align-items: stretch; justify-content: space-between;">
                                
                                <!-- Widget 1: Speed & Latency -->
                                <div class="telemetry-widget" style="flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; text-align: left; position: relative;">
                                    <div style="font-size: 7.5px; color: rgba(255,255,255,0.4); font-family: monospace; font-weight: bold;">BANDWIDTH SPEED</div>
                                    <div style="display: flex; align-items: baseline; gap: 2px; margin: 2px 0;">
                                        <span class="telemetry-speed-val" style="font-size: 18px; font-weight: 800; color: #ff007f; font-family: monospace; text-shadow: 0 0 10px rgba(255,0,127,0.3);">50.0</span>
                                        <span style="font-size: 8px; color: rgba(255,255,255,0.5); font-family: monospace;">Mbps</span>
                                    </div>
                                    
                                    <!-- WiFi Signal & Ping -->
                                    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 5px;">
                                        <div style="display: flex; flex-direction: column; gap: 1px;">
                                            <span style="font-size: 6.5px; color: rgba(255,255,255,0.3); font-family: monospace;">LATENCY</span>
                                            <span class="telemetry-ping-val" style="font-size: 8.5px; font-weight: bold; color: #10b981; font-family: monospace;">2 ms</span>
                                        </div>
                                        <!-- Wi-Fi Graphic -->
                                        <svg class="abr-wifi-bars" width="16" height="13" viewBox="0 0 16 13" style="background: transparent;">
                                            <rect class="bar-1" x="0" y="9" width="2" height="4" rx="0.5" fill="#ff007f" />
                                            <rect class="bar-2" x="4" y="6" width="2" height="7" rx="0.5" fill="#ff007f" />
                                            <rect class="bar-3" x="8" y="3" width="2" height="10" rx="0.5" fill="#ff007f" />
                                            <rect class="bar-4" x="12" y="0" width="2" height="13" rx="0.5" fill="#ff007f" />
                                        </svg>
                                    </div>
                                </div>

                                <!-- Widget 2: Connection Path -->
                                <div class="telemetry-widget" style="flex: 1.3; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: relative;">
                                    <div style="font-size: 7.5px; color: rgba(255,255,255,0.4); font-family: monospace; font-weight: bold; width: 100%; text-align: left;">ROUTING PATH</div>
                                    
                                    <!-- Connection Diagram SVG (Clean & Simplified) -->
                                    <svg width="100%" height="45" viewBox="0 0 160 45" style="background: transparent;">
                                        <!-- Cable line from GGC to Router -->
                                        <path d="M 20 20 L 80 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
                                        <path class="path-ggc-router" d="M 20 20 L 80 20" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4, 4" style="animation: dashFlow 1s linear infinite;" />

                                        <!-- Cable line from Router to Phone -->
                                        <path d="M 80 20 L 140 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
                                        <path class="path-router-phone" d="M 80 20 L 140 20" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4, 4" style="animation: dashFlow 1s linear infinite;" />

                                        <!-- GGC Node -->
                                        <g transform="translate(20, 20)">
                                            <circle r="9" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                            <circle class="ggc-path-glow" r="6" fill="none" stroke="#00f2fe" stroke-width="1" style="stroke-dasharray: 2, 1; filter: drop-shadow(0 0 2px #00f2fe);"/>
                                            <text y="2" font-size="5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">GGC</text>
                                        </g>

                                        <!-- Router Node -->
                                        <g transform="translate(80, 20)">
                                            <circle r="8" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                            <circle class="router-path-glow" r="5" fill="none" stroke="#10b981" stroke-width="1" style="stroke-dasharray: 2, 1; filter: drop-shadow(0 0 2px #10b981);"/>
                                            <text y="1.5" font-size="4" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">WIFI</text>
                                        </g>

                                        <!-- User Phone Node -->
                                        <g transform="translate(140, 20)">
                                            <circle r="9" fill="#0d0d12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                                            <circle class="phone-path-glow" r="6" fill="none" stroke="#ff007f" stroke-width="1" style="stroke-dasharray: 2, 1; filter: drop-shadow(0 0 2px #ff007f);"/>
                                            <text y="2" font-size="4.5" fill="#fff" font-weight="bold" text-anchor="middle" font-family="monospace">USER</text>
                                        </g>

                                        <!-- Flashing indicators -->
                                        <circle class="router-status-dot" cx="80" cy="8" r="1.2" fill="#10b981" style="filter: drop-shadow(0 0 2px #10b981);" />
                                        
                                        <!-- Flying packet helper (glowing circle) -->
                                        <circle id="abr-flying-packet" r="2.5" fill="#00f2fe" cx="140" cy="20" style="opacity: 0; filter: drop-shadow(0 0 3px #00f2fe);" />
                                    </svg>
                                    
                                    <div class="telemetry-connection-status" style="font-size: 7px; color: #10b981; font-family: monospace; font-weight: bold; text-transform: uppercase;">LINK STATUS: OPTIMAL</div>
                                </div>

                                <!-- Widget 3: Quality & Stream (Bitrate, Resolution, Buffer) -->
                                <div class="telemetry-widget" style="flex: 1.1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; text-align: left; position: relative;">
                                    <div style="font-size: 7.5px; color: rgba(255,255,255,0.4); font-family: monospace; font-weight: bold;">STREAM DATA</div>
                                    
                                    <!-- Resolution Badge -->
                                    <div style="margin: 2px 0;">
                                        <span class="telemetry-quality-badge q-4k" style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; font-family: monospace; letter-spacing: 0.5px; display: inline-block;">4K UHD</span>
                                    </div>
                                    
                                    <!-- Bitrate & Codec (Merged to 1 clean line) -->
                                    <div style="font-size: 7.5px; font-family: monospace; color: rgba(255,255,255,0.5);">
                                        <span class="telemetry-codec-val" style="color: #fff; font-weight: bold;">AV1</span> • <span class="telemetry-bitrate-val" style="color: rgba(255,255,255,0.85);">45 Mbps</span>
                                    </div>

                                    <!-- Buffer Health Bar -->
                                    <div style="border-top: 1px solid rgba(255,255,255,0.04); padding-top: 4px;">
                                        <div style="display: flex; justify-content: space-between; font-size: 7px; color: rgba(255,255,255,0.4); font-family: monospace; margin-bottom: 2px;">
                                            <span>BUFFER</span>
                                            <span class="telemetry-buffer-val" style="color: #10b981; font-weight: bold;">30s</span>
                                        </div>
                                        <div style="width: 100%; height: 3px; background: rgba(255,255,255,0.05); border-radius: 1.5px; overflow: hidden;">
                                            <div class="telemetry-buffer-fill" style="width: 90%; height: 100%; background: #10b981; box-shadow: 0 0 4px #10b981; transition: width 0.3s ease;"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- Manifest glassmorphic scan overlay -->
                            <div class="manifest-popup-glass">
                                <div style="font-weight:bold; color:#00f2fe; border-bottom:1px solid rgba(0,242,254,0.2); padding-bottom:3px; margin-bottom:3px; display:flex; justify-content:space-between; align-items:center;">
                                    <span>📄 index_manifest.mpd</span>
                                    <span class="manifest-status-badge">SCANNING</span>
                                </div>
                                <div class="manifest-row m-4k"><span>🟢 4K UHD (45 Mbps)</span> <span class="m-status-4k">--</span></div>
                                <div class="manifest-row m-1080p"><span>🟡 1080p FHD (8 Mbps)</span> <span class="m-status-1080p">--</span></div>
                                <div class="manifest-row m-360p"><span>🔴 360p SD (1.5 Mbps)</span> <span class="m-status-360p">--</span></div>
                            </div>
                        </div>
                    </div>
                `;
                initIcons();
            }
        }
    }

    // Dynamic generation of grid map dots for USA and VN region
    function drawGridMap(svg) {
        // Clear any old dot grid maps first
        const oldGrid = svg.querySelector('.grid-map-dots');
        if (oldGrid) oldGrid.remove();

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'grid-map-dots');
        
        // USA Region Landmass
        for (let x = 60; x <= 260; x += 15) {
            for (let y = 80; y <= 240; y += 15) {
                // Skew USA block shape slightly
                if ((x < 100 && y > 180) || (x > 220 && y < 120)) continue;
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '2');
                circle.setAttribute('fill', 'rgba(255, 255, 255, 0.04)');
                g.appendChild(circle);
            }
        }
        
        // VN Region Landmass
        for (let x = 540; x <= 720; x += 15) {
            for (let y = 60; y <= 300; y += 15) {
                // S-curve filter representing Vietnam/Southeast Asia
                const normalizedY = (y - 60) / 240;
                const centerVal = 580 + normalizedY * 80;
                if (Math.abs(x - centerVal) > 55) continue;
                
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '2');
                circle.setAttribute('fill', 'rgba(255, 255, 255, 0.04)');
                g.appendChild(circle);
            }
        }
        
        svg.insertBefore(g, svg.firstChild);
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        // Slide 1a & 1b: Hook
        if (slideId === 'slide_stream_1a' || slideId === 'slide_stream_1b') {
            const bufferBar = canvas.querySelector('.yt-progress-buffer');
            const playheadBar = canvas.querySelector('.yt-progress-playhead');
            const elapsedLbl = canvas.querySelector('.curr-time');
            const elapsedLbl1b = canvas.querySelector('.curr-time-1b');
            const shockwave = canvas.querySelector('.cloud-shockwave');
            const playBtn = canvas.querySelector('.play-btn-overlay');

            const playheadWidth = progress * 65;
            if (playheadBar) playheadBar.style.width = `${playheadWidth}%`;

            const bufferWidth = Math.min(100, progress * 95);
            if (bufferBar) bufferBar.style.width = `${bufferWidth}%`;

            const totalSec = 165; // 2:45
            const elapsedSec = Math.floor(progress * totalSec);
            const m = Math.floor(elapsedSec / 60);
            const s = Math.floor(elapsedSec % 60).toString().padStart(2, '0');
            if (elapsedLbl) elapsedLbl.textContent = `${m}:${s}`;
            if (elapsedLbl1b) elapsedLbl1b.textContent = `${m}:${s}`;

            if (slideId === 'slide_stream_1a') {
                const speedBadge = canvas.querySelector('.packet-speed-badge');
                if (speedBadge) {
                    const baseSpeed = 45.2;
                    const variance = Math.sin(Date.now() / 600) * 2.1 + Math.cos(Date.now() / 1100) * 0.7;
                    const currentSpeed = (baseSpeed + variance).toFixed(1);
                    speedBadge.textContent = `4K Stream: ~${currentSpeed} Mbps`;
                }

                // Entrance animations
                const entrance = Math.min(1, progress / 0.22);
                const ease = 1 - Math.pow(1 - entrance, 3); // Cubic ease out

                // 1. Phone mockup wrapper scale & slide up
                const phoneWrap = canvas.querySelector('.v12-phone-wrap-1a');
                if (phoneWrap) {
                    const scale = 0.6 + 0.55 * ease; // 0.6 -> 1.15
                    const y = 120 - 140 * ease; // 120 -> -20
                    phoneWrap.style.transform = `scale(${scale}) translateY(${y}px)`;
                    phoneWrap.style.opacity = ease.toString();
                }

                // 2. Earth background globe fade & scale
                const earthBg = canvas.querySelector('.earth-background');
                if (earthBg) {
                    earthBg.style.opacity = (ease * 0.5).toString();
                    const scale = 0.85 + 0.15 * ease;
                    earthBg.style.transform = `translate(-50%, -50%) scale(${scale})`;
                }

                // 3. Cyber data streams overlay fade & scale
                const streams = canvas.querySelector('.v12-streams-svg-1a');
                if (streams) {
                    streams.style.opacity = ease.toString();
                    const scale = 0.95 + 0.05 * ease;
                    streams.style.transform = `scale(${scale})`;
                    streams.style.transformOrigin = 'center center';
                }

                // 4. Speed badge entrance scale
                if (speedBadge) {
                    speedBadge.style.transform = `translateY(-50%) scale(${ease})`;
                    speedBadge.style.opacity = ease.toString();
                }
            }
            else if (slideId === 'slide_stream_1b') {
                const entrance = Math.min(1, progress / 0.22);
                const ease = 1 - Math.pow(1 - entrance, 3); // Cubic ease out

                // 1. Phone mockup wrapper scale & slide up
                const phoneWrap = canvas.querySelector('.v12-phone-wrap-1b');
                if (phoneWrap) {
                    const scale = 0.8 + 0.3 * ease; // 0.8 -> 1.1
                    const y = 60 - 95 * ease; // 60 -> -35
                    phoneWrap.style.transform = `scale(${scale}) translateY(${y}px)`;
                    phoneWrap.style.opacity = ease.toString();
                }

                // 2. Cyber data streams overlay fade
                const streams = canvas.querySelector('.v12-streams-svg-1b');
                if (streams) {
                    streams.style.opacity = ease.toString();
                }

                // 3. Bottom staggered cards entrance
                const cardChunk = canvas.querySelector('.v12-card-chunk');
                const cardGgc = canvas.querySelector('.v12-card-ggc');
                const cardAbr = canvas.querySelector('.v12-card-abr');

                if (cardChunk) {
                    const pCard = Math.max(0, Math.min(1, (progress - 0.1) / 0.2));
                    const easeCard = 1 - Math.pow(1 - pCard, 3);
                    cardChunk.style.opacity = easeCard.toString();
                    cardChunk.style.transform = `translateY(${(1 - easeCard) * 30}px)`;
                }
                if (cardGgc) {
                    const pCard = Math.max(0, Math.min(1, (progress - 0.22) / 0.2));
                    const easeCard = 1 - Math.pow(1 - pCard, 3);
                    cardGgc.style.opacity = easeCard.toString();
                    cardGgc.style.transform = `translateY(${(1 - easeCard) * 30}px)`;
                }
                if (cardAbr) {
                    const pCard = Math.max(0, Math.min(1, (progress - 0.34) / 0.2));
                    const easeCard = 1 - Math.pow(1 - pCard, 3);
                    cardAbr.style.opacity = easeCard.toString();
                    cardAbr.style.transform = `translateY(${(1 - easeCard) * 30}px)`;
                }
            }

            if (playBtn) {
                if (progress < 0.25) {
                    playBtn.style.opacity = (1 - (progress / 0.25)).toString();
                    playBtn.style.pointerEvents = 'none';
                } else {
                    playBtn.style.opacity = '0';
                }
            }

            if (progress > 0.85 && progress < 0.98) {
                const waveRatio = (progress - 0.85) / 0.13;
                if (shockwave) {
                    shockwave.style.width = `${80 + waveRatio * 130}px`;
                    shockwave.style.height = `${80 + waveRatio * 130}px`;
                    shockwave.style.opacity = (1 - waveRatio).toString();
                }
            } else {
                if (shockwave) {
                    shockwave.style.width = '0px';
                    shockwave.style.height = '0px';
                    shockwave.style.opacity = '0';
                }
            }
        }

        // Slide 2a: Traditional single MP4 download issue
        else if (slideId === 'slide_stream_2a') {
            const mp4Fill = canvas.querySelector('.mp4-fill-bar');
            const mp4Pct = canvas.querySelector('.mp4-pct-val');
            const mp4Speed = canvas.querySelector('.mp4-speed-val');
            const mp4Status = canvas.querySelector('.mp4-status-val');
            const alertBox = canvas.querySelector('.mp4-alert-box');
            const spinner = canvas.querySelector('.mp4-spinner-overlay');
            const videoScreen = canvas.querySelector('.video-playback-screen');
            const playhead = canvas.querySelector('.yt-phone-container .yt-progress-playhead');
            const buffer = canvas.querySelector('.yt-phone-container .yt-progress-buffer');
            const elapsedLbl = canvas.querySelector('.curr-time');

            // Format dynamic elapsed time
            const totalSec = 165; // 2:45
            
            // Flow packets to 45%, then stall
            if (progress < 0.45) {
                const ratio = progress / 0.45;
                const pct = Math.round(ratio * 36);
                if (mp4Fill) mp4Fill.style.width = `${pct}%`;
                if (mp4Pct) mp4Pct.textContent = `${pct}%`;
                if (mp4Speed) { mp4Speed.textContent = '12 Mbps'; mp4Speed.style.color = '#10b981'; }
                if (mp4Status) { mp4Status.textContent = 'DOWNLOADING...'; mp4Status.style.color = '#10b981'; }
                if (alertBox) alertBox.style.opacity = '0';
                if (spinner) spinner.style.opacity = '0';
                if (videoScreen) videoScreen.style.filter = 'none';
                
                // Animate smoothly without jumping
                if (playhead) playhead.style.width = `${ratio * 25}%`;
                if (buffer) buffer.style.width = `${ratio * 28}%`; // slightly ahead
            } 
            else {
                if (mp4Fill) mp4Fill.style.width = '36%';
                if (mp4Pct) mp4Pct.textContent = '36% (Stalled)';
                if (mp4Speed) { mp4Speed.textContent = '0 Mbps'; mp4Speed.style.color = '#ef4444'; }
                if (mp4Status) { mp4Status.textContent = 'STALLED'; mp4Status.style.color = '#ef4444'; }
                if (alertBox) alertBox.style.opacity = '1';
                if (spinner) spinner.style.opacity = '1';
                if (videoScreen) videoScreen.style.filter = 'blur(4px)';
                
                // Stalled state
                if (playhead) playhead.style.width = '25%';
                if (buffer) buffer.style.width = '25%'; // Playhead caught up to buffer
            }

            const elapsedSec = Math.floor((progress < 0.45 ? (progress / 0.45) * 0.25 : 0.25) * totalSec);
            const m = Math.floor(elapsedSec / 60);
            const s = Math.floor(elapsedSec % 60).toString().padStart(2, '0');
            if (elapsedLbl) elapsedLbl.textContent = `${m}:${s}`;
        }

        // Slide 3a: Video Chunking film cuts
        else if (slideId === 'slide_stream_3a') {
            const laser = canvas.querySelector('.laser-cutter');
            const chunk1 = canvas.querySelector('.chunk-s1');
            const chunk2 = canvas.querySelector('.chunk-s2');
            const chunk3 = canvas.querySelector('.chunk-s3');
            const chunk4 = canvas.querySelector('.chunk-s4');
            const playhead = canvas.querySelector('.yt-phone-container .yt-progress-playhead');
            const buffer = canvas.querySelector('.yt-phone-container .yt-progress-buffer');
            const elapsedLbl = canvas.querySelector('.curr-time');

            if (laser) laser.style.left = `${progress * 100}%`;

            if (chunk1) {
                chunk1.classList.toggle('active', progress >= 0.1 && progress < 0.35);
                const dots = chunk1.querySelectorAll('.chunk-frames-grid div');
                if (progress >= 0.15) {
                    dots.forEach(d => { d.style.background = '#ff007f'; d.style.boxShadow = '0 0 8px #ff007f'; });
                } else {
                    dots.forEach(d => { d.style.background = 'rgba(255,255,255,0.15)'; d.style.boxShadow = 'none'; });
                }
            }
            if (chunk2) {
                chunk2.classList.toggle('active', progress >= 0.35 && progress < 0.6);
                const dots = chunk2.querySelectorAll('.chunk-frames-grid div');
                if (progress >= 0.4) {
                    dots.forEach(d => { d.style.background = '#ff007f'; d.style.boxShadow = '0 0 8px #ff007f'; });
                } else {
                    dots.forEach(d => { d.style.background = 'rgba(255,255,255,0.15)'; d.style.boxShadow = 'none'; });
                }
            }
            if (chunk3) {
                chunk3.classList.toggle('active', progress >= 0.6 && progress < 0.85);
                const dots = chunk3.querySelectorAll('.chunk-frames-grid div');
                if (progress >= 0.65) {
                    dots.forEach(d => { d.style.background = '#ff007f'; d.style.boxShadow = '0 0 8px #ff007f'; });
                } else {
                    dots.forEach(d => { d.style.background = 'rgba(255,255,255,0.15)'; d.style.boxShadow = 'none'; });
                }
            }
            if (chunk4) {
                chunk4.classList.toggle('active', progress >= 0.85);
                const dots = chunk4.querySelectorAll('.chunk-frames-grid div');
                if (progress >= 0.9) {
                    dots.forEach(d => { d.style.background = '#ff007f'; d.style.boxShadow = '0 0 8px #ff007f'; });
                } else {
                    dots.forEach(d => { d.style.background = 'rgba(255,255,255,0.15)'; d.style.boxShadow = 'none'; });
                }
            }

            // Smooth continuous playhead
            if (playhead) playhead.style.width = `${progress * 100}%`;

            // Step-wise buffer bar increments as each chunk is received
            let bufW = 0;
            if (progress >= 0.15) bufW = 25;
            if (progress >= 0.40) bufW = 50;
            if (progress >= 0.65) bufW = 75;
            if (progress >= 0.90) bufW = 100;
            if (buffer) buffer.style.width = `${bufW}%`;

            // Time label update
            const totalSec = 165; // 2:45
            const elapsedSec = Math.floor(progress * totalSec);
            const m = Math.floor(elapsedSec / 60);
            const s = Math.floor(elapsedSec % 60).toString().padStart(2, '0');
            if (elapsedLbl) elapsedLbl.textContent = `${m}:${s}`;
        }

        // Slide 4a: Manifest list indicators
        else if (slideId === 'slide_stream_4a') {
            // Static representation with key highlights
        }

        // Slide 5a: Google Global Cache Topology (USA -> VN Edge caching)
        else if (slideId === 'slide_stream_5a') {
            const oceanLine = canvas.querySelector('.fiber-line-ocean');
            const oceanFlow = canvas.querySelector('.fiber-line-ocean-flow');
            
            const lineVnpt = canvas.querySelector('.fiber-line-sg-vnpt');
            const flowVnpt = canvas.querySelector('.fiber-line-sg-vnpt-flow');
            const lineVtl = canvas.querySelector('.fiber-line-sg-vtl');
            const flowVtl = canvas.querySelector('.fiber-line-sg-vtl-flow');
            const lineFpt = canvas.querySelector('.fiber-line-sg-fpt');
            const flowFpt = canvas.querySelector('.fiber-line-sg-fpt-flow');

            const cacheVnpt = canvas.querySelector('.fiber-line-cache-vnpt');
            const cacheVnptFlow = canvas.querySelector('.fiber-line-cache-vnpt-flow');
            const cacheVtl = canvas.querySelector('.fiber-line-cache-vtl');
            const cacheVtlFlow = canvas.querySelector('.fiber-line-cache-vtl-flow');
            const cacheFpt = canvas.querySelector('.fiber-line-cache-fpt');
            const cacheFptFlow = canvas.querySelector('.fiber-line-cache-fpt-flow');

            const cutCross = canvas.querySelector('.cable-cut-cross');
            
            const nodeVnpt = canvas.querySelector('.vnpt-node');
            const nodeVtl = canvas.querySelector('.viettel-node');
            const nodeFpt = canvas.querySelector('.fpt-node');

            const ledVnpt = canvas.querySelector('.vnpt-led');
            const ledVtl = canvas.querySelector('.viettel-led');
            const ledFpt = canvas.querySelector('.fpt-led');

            const pingVnpt = canvas.querySelector('.vnpt-ping');
            const pingVtl = canvas.querySelector('.viettel-ping');
            const pingFpt = canvas.querySelector('.fpt-ping');

            const hitVnpt = canvas.querySelector('.vnpt-hit');
            const hitVtl = canvas.querySelector('.viettel-hit');
            const hitFpt = canvas.querySelector('.fpt-hit');

            const globalStatus = canvas.querySelector('.ggc-global-status');
            const userPing = canvas.querySelector('.user-latency-lbl');

            if (progress < 0.35) {
                // Phase 1: Undersea routing from USA (Slow)
                if (oceanLine) oceanLine.style.opacity = '1';
                if (oceanFlow) oceanFlow.style.opacity = '1';
                
                if (lineVnpt) lineVnpt.style.opacity = '1';
                if (flowVnpt) flowVnpt.style.opacity = '1';
                if (lineVtl) lineVtl.style.opacity = '1';
                if (flowVtl) flowVtl.style.opacity = '1';
                if (lineFpt) lineFpt.style.opacity = '1';
                if (flowFpt) flowFpt.style.opacity = '1';

                if (cacheVnpt) cacheVnpt.style.opacity = '0';
                if (cacheVnptFlow) cacheVnptFlow.style.opacity = '0';
                if (cacheVtl) cacheVtl.style.opacity = '0';
                if (cacheVtlFlow) cacheVtlFlow.style.opacity = '0';
                if (cacheFpt) cacheFpt.style.opacity = '0';
                if (cacheFptFlow) cacheFptFlow.style.opacity = '0';

                if (cutCross) cutCross.style.opacity = '0';
                
                if (nodeVnpt) nodeVnpt.style.opacity = '0.25';
                if (nodeVtl) nodeVtl.style.opacity = '0.25';
                if (nodeFpt) nodeFpt.style.opacity = '0.25';

                if (ledVnpt) ledVnpt.className = 'status-led vnpt-led dim';
                if (ledVtl) ledVtl.className = 'status-led viettel-led dim';
                if (ledFpt) ledFpt.className = 'status-led fpt-led dim';

                if (pingVnpt) pingVnpt.textContent = 'Ping: --';
                if (pingVtl) pingVtl.textContent = 'Ping: --';
                if (pingFpt) pingFpt.textContent = 'Ping: --';

                if (hitVnpt) hitVnpt.textContent = 'Hit Rate: 0%';
                if (hitVtl) hitVtl.textContent = 'Hit Rate: 0%';
                if (hitFpt) hitFpt.textContent = 'Hit Rate: 0%';

                if (pingVnpt) pingVnpt.style.color = 'rgba(255,255,255,0.4)';
                if (pingVtl) pingVtl.style.color = 'rgba(255,255,255,0.4)';
                if (pingFpt) pingFpt.style.color = 'rgba(255,255,255,0.4)';
                if (hitVnpt) hitVnpt.style.color = 'rgba(255,255,255,0.4)';
                if (hitVtl) hitVtl.style.color = 'rgba(255,255,255,0.4)';
                if (hitFpt) hitFpt.style.color = 'rgba(255,255,255,0.4)';

                if (globalStatus) { globalStatus.textContent = 'ROUTING: USA ORIGIN (SLOW)'; globalStatus.style.color = '#ff007f'; }
                if (userPing) { userPing.textContent = 'Ping: 350ms'; userPing.style.color = 'rgba(255,255,255,0.4)'; }
            } 
            else if (progress >= 0.35 && progress < 0.6) {
                // Phase 2: Undersea cable severed
                if (oceanLine) oceanLine.style.opacity = '0.3';
                if (oceanFlow) oceanFlow.style.opacity = '0';
                
                if (lineVnpt) lineVnpt.style.opacity = '0.3';
                if (flowVnpt) flowVnpt.style.opacity = '0';
                if (lineVtl) lineVtl.style.opacity = '0.3';
                if (flowVtl) flowVtl.style.opacity = '0';
                if (lineFpt) lineFpt.style.opacity = '0.3';
                if (flowFpt) flowFpt.style.opacity = '0';

                if (cacheVnpt) cacheVnpt.style.opacity = '0';
                if (cacheVnptFlow) cacheVnptFlow.style.opacity = '0';
                if (cacheVtl) cacheVtl.style.opacity = '0';
                if (cacheVtlFlow) cacheVtlFlow.style.opacity = '0';
                if (cacheFpt) cacheFpt.style.opacity = '0';
                if (cacheFptFlow) cacheFptFlow.style.opacity = '0';

                if (cutCross) cutCross.style.opacity = '1';
                
                if (nodeVnpt) nodeVnpt.style.opacity = '0.25';
                if (nodeVtl) nodeVtl.style.opacity = '0.25';
                if (nodeFpt) nodeFpt.style.opacity = '0.25';

                if (ledVnpt) ledVnpt.className = 'status-led vnpt-led red';
                if (ledVtl) ledVtl.className = 'status-led viettel-led red';
                if (ledFpt) ledFpt.className = 'status-led fpt-led red';

                if (pingVnpt) pingVnpt.textContent = 'TIMEOUT';
                if (pingVtl) pingVtl.textContent = 'TIMEOUT';
                if (pingFpt) pingFpt.textContent = 'TIMEOUT';

                if (hitVnpt) hitVnpt.textContent = 'OFFLINE';
                if (hitVtl) hitVtl.textContent = 'OFFLINE';
                if (hitFpt) hitFpt.textContent = 'OFFLINE';

                if (pingVnpt) pingVnpt.style.color = '#ef4444';
                if (pingVtl) pingVtl.style.color = '#ef4444';
                if (pingFpt) pingFpt.style.color = '#ef4444';
                if (hitVnpt) hitVnpt.style.color = '#ef4444';
                if (hitVtl) hitVtl.style.color = '#ef4444';
                if (hitFpt) hitFpt.style.color = '#ef4444';

                if (globalStatus) { globalStatus.textContent = 'UNDERSEA CABLE: SEVERED'; globalStatus.style.color = '#ef4444'; }
                if (userPing) { userPing.textContent = 'LINK SEVERED (TIMEOUT)'; userPing.style.color = '#ef4444'; }
            } 
            else {
                // Phase 3: Vietnam Caches Active (Local routing)
                if (oceanLine) oceanLine.style.opacity = '0.1';
                if (oceanFlow) oceanFlow.style.opacity = '0';
                
                if (lineVnpt) lineVnpt.style.opacity = '0.1';
                if (flowVnpt) flowVnpt.style.opacity = '0';
                if (lineVtl) lineVtl.style.opacity = '0.1';
                if (flowVtl) flowVtl.style.opacity = '0';
                if (lineFpt) lineFpt.style.opacity = '0.1';
                if (flowFpt) flowFpt.style.opacity = '0';

                if (cacheVnpt) cacheVnpt.style.opacity = '1';
                if (cacheVnptFlow) cacheVnptFlow.style.opacity = '1';
                if (cacheVtl) cacheVtl.style.opacity = '1';
                if (cacheVtlFlow) cacheVtlFlow.style.opacity = '1';
                if (cacheFpt) cacheFpt.style.opacity = '1';
                if (cacheFptFlow) cacheFptFlow.style.opacity = '1';

                if (cutCross) cutCross.style.opacity = '1'; // Keep cutCross visible to show local bypass
                
                if (nodeVnpt) {
                    nodeVnpt.style.opacity = '1';
                    const ring = nodeVnpt.querySelector('.vnpt-core-ring');
                    if (ring) { ring.style.stroke = '#10b981'; ring.style.filter = 'drop-shadow(0 0 4px #10b981)'; }
                }
                if (nodeVtl) {
                    nodeVtl.style.opacity = '1';
                    const ring = nodeVtl.querySelector('.viettel-core-ring');
                    if (ring) { ring.style.stroke = '#10b981'; ring.style.filter = 'drop-shadow(0 0 4px #10b981)'; }
                }
                if (nodeFpt) {
                    nodeFpt.style.opacity = '1';
                    const ring = nodeFpt.querySelector('.fpt-core-ring');
                    if (ring) { ring.style.stroke = '#10b981'; ring.style.filter = 'drop-shadow(0 0 4px #10b981)'; }
                }

                if (ledVnpt) ledVnpt.className = 'status-led vnpt-led green';
                if (ledVtl) ledVtl.className = 'status-led viettel-led green';
                if (ledFpt) ledFpt.className = 'status-led fpt-led green';

                if (pingVnpt) pingVnpt.textContent = 'Ping: 2ms';
                if (pingVtl) pingVtl.textContent = 'Ping: 3ms';
                if (pingFpt) pingFpt.textContent = 'Ping: 2ms';

                if (hitVnpt) hitVnpt.textContent = 'Hit Rate: 99.4%';
                if (hitVtl) hitVtl.textContent = 'Hit Rate: 98.7%';
                if (hitFpt) hitFpt.textContent = 'Hit Rate: 99.1%';

                if (pingVnpt) pingVnpt.style.color = '#10b981';
                if (pingVtl) pingVtl.style.color = '#10b981';
                if (pingFpt) pingFpt.style.color = '#10b981';
                if (hitVnpt) hitVnpt.style.color = '#10b981';
                if (hitVtl) hitVtl.style.color = '#10b981';
                if (hitFpt) hitFpt.style.color = '#10b981';

                if (globalStatus) { globalStatus.textContent = 'GGC LOCAL EDGE: ACTIVE'; globalStatus.style.color = '#10b981'; }
                if (userPing) { userPing.textContent = 'Ping: 2ms (VN Edge GGC)'; userPing.style.color = '#10b981'; }
            }
        }

        // Slide 6a, 7a, 8a, 9a: Adaptive Bitrate ABR Map + Client Phone Mockup
        else if (slideId === 'slide_stream_6a' || slideId === 'slide_stream_7a' || slideId === 'slide_stream_8a' || slideId === 'slide_stream_9a') {
            // Bind telemetry dashboard elements
            const speedVal = canvas.querySelector('.telemetry-speed-val');
            const pingVal = canvas.querySelector('.telemetry-ping-val');
            const connectionStatus = canvas.querySelector('.telemetry-connection-status');
            const systemBadge = canvas.querySelector('.telemetry-status-badge');
            const qualityBadge = canvas.querySelector('.telemetry-quality-badge');
            const bitrateVal = canvas.querySelector('.telemetry-bitrate-val');
            const codecVal = canvas.querySelector('.telemetry-codec-val');
            const bufferVal = canvas.querySelector('.telemetry-buffer-val');
            const bufferFill = canvas.querySelector('.telemetry-buffer-fill');
            
            const pathGgcRouter = canvas.querySelector('.path-ggc-router');
            const pathRouterPhone = canvas.querySelector('.path-router-phone');
            const ggcGlow = canvas.querySelector('.ggc-path-glow');
            const routerGlow = canvas.querySelector('.router-path-glow');
            const phoneGlow = canvas.querySelector('.phone-path-glow');
            const routerDot = canvas.querySelector('.router-status-dot');

            const bars = canvas.querySelector('.abr-wifi-bars');
            const videoScreen = canvas.querySelector('.video-playback-screen');
            const qualityHud = canvas.querySelector('.video-quality-hud');
            const qualityLbl = canvas.querySelector('.phone-quality-label');
            const spinner = canvas.querySelector('.phone-spinner-overlay');
            const playhead = canvas.querySelector('.yt-phone-mockup-small .yt-progress-playhead');
            const buffer = canvas.querySelector('.yt-phone-mockup-small .yt-progress-buffer');
            const elapsedLbl = canvas.querySelector('.curr-time');

            // Interactive elements
            const manifestPopup = canvas.querySelector('.manifest-popup-glass');
            const manifestBadge = canvas.querySelector('.manifest-status-badge');
            const row4k = canvas.querySelector('.m-4k');
            const row1080p = canvas.querySelector('.m-1080p');
            const row360p = canvas.querySelector('.m-360p');
            const mStatus4k = canvas.querySelector('.m-status-4k');
            const mStatus1080p = canvas.querySelector('.m-status-1080p');
            const mStatus360p = canvas.querySelector('.m-status-360p');
            const phoneAlert = canvas.querySelector('.phone-alert-overlay');
            const successBadge = canvas.querySelector('.success-restore-badge');
            const flyingPacket = canvas.querySelector('#abr-flying-packet');
            
            // Audio wave elements
            const eqBar1 = canvas.querySelector('.audio-wave-bar.wb-1');
            const eqBar2 = canvas.querySelector('.audio-wave-bar.wb-2');
            const eqBar3 = canvas.querySelector('.audio-wave-bar.wb-3');

            // Format dynamic elapsed time
            const totalSec = 165; // 2:45
            const elapsedSec = Math.floor(progress * totalSec);
            const m = Math.floor(elapsedSec / 60);
            const s = Math.floor(elapsedSec % 60).toString().padStart(2, '0');
            if (elapsedLbl) elapsedLbl.textContent = `${m}:${s}`;

            // Helper to style wifi bars
            const setWifiBars = (activeCount, color) => {
                if (!bars) return;
                for (let i = 1; i <= 4; i++) {
                    const bar = bars.querySelector(`.bar-${i}`);
                    if (bar) {
                        if (i <= activeCount) {
                            bar.style.fill = color;
                            bar.style.opacity = '1';
                        } else {
                            bar.style.fill = 'rgba(255,255,255,0.2)';
                            bar.style.opacity = '0.15';
                        }
                    }
                }
            };

            // Reset active states for reusable overlays
            if (manifestPopup) manifestPopup.classList.remove('active');
            if (phoneAlert) phoneAlert.style.opacity = '0';
            if (successBadge) successBadge.style.display = 'none';
            if (flyingPacket) flyingPacket.style.opacity = '0';

            // EQ Bounce animation
            if (eqBar1 && eqBar2 && eqBar3) {
                const bounce1 = 0.3 + Math.sin(Date.now() / 150) * 0.5;
                const bounce2 = 0.3 + Math.sin(Date.now() / 100) * 0.5;
                const bounce3 = 0.3 + Math.sin(Date.now() / 200) * 0.5;
                eqBar1.style.transform = `scaleY(${Math.max(0.1, bounce1)})`;
                eqBar2.style.transform = `scaleY(${Math.max(0.1, bounce2)})`;
                eqBar3.style.transform = `scaleY(${Math.max(0.1, bounce3)})`;
            }

            if (slideId === 'slide_stream_6a') {
                const elapsed = progress * 13.32;
                
                if (elapsed < 3.0) {
                    // Initial High-Speed
                    if (speedVal) speedVal.textContent = '50.0';
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: ACTIVE'; systemBadge.style.color = '#10b981'; systemBadge.style.background = 'rgba(16,185,129,0.1)'; systemBadge.style.borderColor = 'rgba(16,185,129,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '4K UHD'; qualityBadge.className = 'telemetry-quality-badge q-4k'; }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    if (bufferVal) bufferVal.textContent = '30s';
                    if (bufferFill) { bufferFill.style.width = '90%'; bufferFill.style.background = '#10b981'; bufferFill.style.boxShadow = '0 0 5px #10b981'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; pathGgcRouter.style.strokeDasharray = '4, 4'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#10b981'; pathRouterPhone.style.opacity = '1'; pathRouterPhone.style.strokeDasharray = '4, 4'; }
                    if (ggcGlow) ggcGlow.style.stroke = '#00f2fe';
                    if (routerGlow) routerGlow.style.stroke = '#10b981';
                    if (phoneGlow) phoneGlow.style.stroke = '#ff007f';
                    if (routerDot) { routerDot.style.fill = '#10b981'; routerDot.style.filter = 'drop-shadow(0 0 2px #10b981)'; }
                    
                    setWifiBars(4, '#10b981');
                    if (qualityHud) qualityHud.textContent = '4K UHD';
                    if (qualityLbl) qualityLbl.textContent = '4K UHD';
                } 
                else if (elapsed >= 3.0 && elapsed < 7.0) {
                    // ABR Enrolling
                    if (speedVal) speedVal.textContent = '50.0';
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: ENROLLING...'; systemBadge.style.color = '#00f2fe'; systemBadge.style.background = 'rgba(0,242,254,0.1)'; systemBadge.style.borderColor = 'rgba(0,242,254,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '4K UHD'; qualityBadge.className = 'telemetry-quality-badge q-scanning'; }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    if (bufferVal) bufferVal.textContent = '30s';
                    if (bufferFill) { bufferFill.style.width = '90%'; bufferFill.style.background = '#10b981'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#00f2fe'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#00f2fe'; pathRouterPhone.style.opacity = '1'; }
                    if (routerDot) { routerDot.style.fill = '#00f2fe'; }
                    
                    setWifiBars(4, '#00f2fe');
                    if (qualityHud) qualityHud.textContent = '4K UHD';
                    if (qualityLbl) qualityLbl.textContent = '4K UHD';

                    if (ggcGlow) {
                        ggcGlow.style.stroke = '#00f2fe';
                        ggcGlow.style.strokeWidth = `${1 + Math.sin(Date.now() / 100) * 0.5}px`;
                    }
                } 
                else {
                    // Measurement phase (fluctuate dynamically)
                    const rngSpeed = 46 + Math.sin(Date.now() / 80) * 5;
                    const rngBuffer = 28 + Math.round(Math.sin(Date.now() / 150) * 2);
                    if (speedVal) speedVal.textContent = rngSpeed.toFixed(1);
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: MEASURING...'; systemBadge.style.color = '#10b981'; systemBadge.style.background = 'rgba(16,185,129,0.1)'; systemBadge.style.borderColor = 'rgba(16,185,129,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '4K UHD'; qualityBadge.className = 'telemetry-quality-badge q-4k'; }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    if (bufferVal) bufferVal.textContent = rngBuffer + 's';
                    if (bufferFill) { bufferFill.style.width = `${rngBuffer / 33 * 100}%`; bufferFill.style.background = '#10b981'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#10b981'; pathRouterPhone.style.opacity = '1'; }
                    if (routerDot) { routerDot.style.fill = '#10b981'; }
                    
                    const barCount = 3 + (Math.round(Date.now() / 300) % 2);
                    setWifiBars(barCount, '#10b981');
                    if (qualityHud) qualityHud.textContent = '4K UHD';
                    if (qualityLbl) qualityLbl.textContent = '4K UHD';
                }

                if (videoScreen) videoScreen.style.filter = 'none';
                if (spinner) spinner.style.opacity = '0';
                if (playhead) playhead.style.width = `${progress * 100}%`;
                if (buffer) buffer.style.width = `${Math.min(100, 30 + progress * 70)}%`;
            }
            else if (slideId === 'slide_stream_7a') {
                const elapsed = progress * 15.72;
                
                if (elapsed < 3.5) {
                    // Initially fine
                    if (speedVal) speedVal.textContent = '50.0';
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: ACTIVE'; systemBadge.style.color = '#10b981'; systemBadge.style.background = 'rgba(16,185,129,0.1)'; systemBadge.style.borderColor = 'rgba(16,185,129,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '4K UHD'; qualityBadge.className = 'telemetry-quality-badge q-4k'; }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    if (bufferVal) bufferVal.textContent = '30s';
                    if (bufferFill) { bufferFill.style.width = '90%'; bufferFill.style.background = '#10b981'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#10b981'; pathRouterPhone.style.opacity = '1'; }
                    if (routerDot) { routerDot.style.fill = '#10b981'; }
                    if (routerGlow) routerGlow.style.stroke = '#10b981';
                    if (phoneGlow) phoneGlow.style.stroke = '#ff007f';
                    
                    setWifiBars(4, '#10b981');
                    if (videoScreen) videoScreen.style.filter = 'none';
                    if (qualityHud) qualityHud.textContent = '4K';
                    if (qualityLbl) qualityLbl.textContent = '4K';
                } 
                else if (elapsed >= 3.5 && elapsed < 7.5) {
                    // Wi-Fi Drop (lagging)
                    if (speedVal) speedVal.textContent = '4.0';
                    if (pingVal) pingVal.textContent = '120 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: CONGESTED'; connectionStatus.style.color = '#ef4444'; }
                    if (systemBadge) { systemBadge.textContent = 'CONGESTION DETECTED'; systemBadge.style.color = '#ef4444'; systemBadge.style.background = 'rgba(239,68,68,0.1)'; systemBadge.style.borderColor = 'rgba(239,68,68,0.3)'; }
                    
                    const isBadgeFlash = Math.round(Date.now() / 250) % 2 === 0;
                    if (qualityBadge) { 
                        qualityBadge.textContent = '4K UHD'; 
                        qualityBadge.className = isBadgeFlash ? 'telemetry-quality-badge q-4k' : 'telemetry-quality-badge q-360p';
                    }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    
                    const bufSec = Math.max(12, 30 - Math.round((elapsed - 3.5) / 4 * 18));
                    if (bufferVal) bufferVal.textContent = bufSec + 's';
                    if (bufferFill) { bufferFill.style.width = `${bufSec / 33 * 100}%`; bufferFill.style.background = '#f59e0b'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#ef4444'; pathRouterPhone.style.opacity = '0.3'; }
                    if (routerDot) { routerDot.style.fill = '#ef4444'; }
                    if (routerGlow) routerGlow.style.stroke = '#ef4444';
                    if (phoneGlow) phoneGlow.style.stroke = '#ef4444';
                    
                    const isFlash = Math.round(Date.now() / 250) % 2 === 0;
                    setWifiBars(1, isFlash ? '#ef4444' : 'rgba(255,255,255,0.2)');
                    
                    if (phoneAlert) {
                        phoneAlert.textContent = '⚠️ CONGESTION: 4 Mbps';
                        phoneAlert.style.opacity = '1';
                    }
                    if (videoScreen) videoScreen.style.filter = 'none';
                    if (qualityHud) qualityHud.textContent = '4K';
                    if (qualityLbl) qualityLbl.textContent = '4K';
                } 
                else if (elapsed >= 7.5 && elapsed < 11.5) {
                    // Manifest lookup phase
                    if (speedVal) speedVal.textContent = '4.0';
                    if (pingVal) pingVal.textContent = '120 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: CONGESTED'; connectionStatus.style.color = '#ef4444'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: SCANNING MANIFEST'; systemBadge.style.color = '#00f2fe'; systemBadge.style.background = 'rgba(0,242,254,0.1)'; systemBadge.style.borderColor = 'rgba(0,242,254,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = 'SCANNING...'; qualityBadge.className = 'telemetry-quality-badge q-scanning'; }
                    if (bitrateVal) bitrateVal.textContent = '---';
                    if (codecVal) codecVal.textContent = '---';
                    
                    const bufSec = Math.max(6, 12 - Math.round((elapsed - 7.5) / 4 * 6));
                    if (bufferVal) bufferVal.textContent = bufSec + 's';
                    if (bufferFill) { bufferFill.style.width = `${bufSec / 33 * 100}%`; bufferFill.style.background = '#ef4444'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#00f2fe'; pathGgcRouter.style.opacity = '0.3'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#00f2fe'; pathRouterPhone.style.opacity = '0.3'; }
                    if (routerDot) { routerDot.style.fill = '#00f2fe'; }
                    
                    setWifiBars(1, '#ef4444');
                    if (videoScreen) videoScreen.style.filter = 'none';

                    // Manifest Popup visualization
                    if (manifestPopup) {
                        manifestPopup.classList.add('active');
                        const pLocal = elapsed - 7.5; // 0 to 4.0
                        if (manifestBadge) manifestBadge.textContent = 'ABR SCANNING';
                        
                        if (row4k && mStatus4k) {
                            if (pLocal < 1.2) {
                                row4k.className = 'manifest-row checking';
                                mStatus4k.textContent = 'CHECKING...';
                            } else {
                                row4k.className = 'manifest-row failed';
                                mStatus4k.textContent = 'FAILED';
                            }
                        }
                        if (row1080p && mStatus1080p) {
                            if (pLocal < 1.2) {
                                row1080p.className = 'manifest-row';
                                mStatus1080p.textContent = '--';
                            } else if (pLocal >= 1.2 && pLocal < 2.4) {
                                row1080p.className = 'manifest-row checking';
                                mStatus1080p.textContent = 'CHECKING...';
                            } else {
                                row1080p.className = 'manifest-row failed';
                                mStatus1080p.textContent = 'FAILED';
                            }
                        }
                        if (row360p && mStatus360p) {
                            if (pLocal < 2.4) {
                                row360p.className = 'manifest-row';
                                mStatus360p.textContent = '--';
                            } else if (pLocal >= 2.4 && pLocal < 3.2) {
                                row360p.className = 'manifest-row checking';
                                mStatus360p.textContent = 'CHECKING...';
                            } else {
                                row360p.className = 'manifest-row selected';
                                mStatus360p.textContent = 'SELECTED';
                                if (manifestBadge) manifestBadge.textContent = '360p MATCHED';
                            }
                        }
                    }

                    // Animate flying packet USER (140, 25) <-> GGC (20, 25)
                    if (flyingPacket) {
                        flyingPacket.style.opacity = '1';
                        const pLocal = (elapsed - 7.5) / 4.0; // 0 to 1
                        if (pLocal < 0.5) {
                            const ratio = pLocal * 2;
                            const cx = 140 + (20 - 140) * ratio;
                            flyingPacket.setAttribute('cx', cx);
                            flyingPacket.setAttribute('cy', 25);
                            flyingPacket.style.fill = '#00f2fe';
                        } else {
                            const ratio = (pLocal - 0.5) * 2;
                            const cx = 20 + (140 - 20) * ratio;
                            flyingPacket.setAttribute('cx', cx);
                            flyingPacket.setAttribute('cy', 25);
                            flyingPacket.style.fill = '#10b981';
                        }
                    }
                    if (qualityHud) qualityHud.textContent = '4K';
                    if (qualityLbl) qualityLbl.textContent = '4K';
                } 
                else {
                    // Resolution downgrade applied
                    if (speedVal) speedVal.textContent = '4.0';
                    if (pingVal) pingVal.textContent = '120 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: LIMITED'; connectionStatus.style.color = '#ef4444'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: DOWNGRADED'; systemBadge.style.color = '#f59e0b'; systemBadge.style.background = 'rgba(245,158,11,0.1)'; systemBadge.style.borderColor = 'rgba(245,158,11,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '360p SD'; qualityBadge.className = 'telemetry-quality-badge q-360p'; }
                    if (bitrateVal) bitrateVal.textContent = '1.5 Mbps';
                    if (codecVal) codecVal.textContent = 'H.264';
                    
                    const bufSec = Math.min(15, 6 + Math.round((elapsed - 11.5) / 4.22 * 9));
                    if (bufferVal) bufferVal.textContent = bufSec + 's';
                    if (bufferFill) { bufferFill.style.width = `${bufSec / 33 * 100}%`; bufferFill.style.background = '#f59e0b'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#f59e0b'; pathRouterPhone.style.opacity = '0.4'; }
                    if (routerDot) { routerDot.style.fill = '#f59e0b'; }
                    if (routerGlow) routerGlow.style.stroke = '#f59e0b';
                    if (phoneGlow) phoneGlow.style.stroke = '#f59e0b';
                    
                    setWifiBars(1, '#ef4444');
                    
                    if (videoScreen) videoScreen.style.filter = 'blur(2.5px)';
                    if (qualityHud) qualityHud.textContent = '360p';
                    if (qualityLbl) qualityLbl.textContent = '360p';
                }
                
                if (spinner) spinner.style.opacity = '0';
                if (playhead) playhead.style.width = `${progress * 100}%`;
                if (buffer) buffer.style.width = `${Math.min(100, 15 + progress * 85)}%`;
            }
            else if (slideId === 'slide_stream_8a') {
                if (speedVal) speedVal.textContent = '4.0';
                if (pingVal) pingVal.textContent = '120 ms';
                if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: LIMITED'; connectionStatus.style.color = '#f59e0b'; }
                if (systemBadge) { systemBadge.textContent = 'ABR: ACTIVE (360p)'; systemBadge.style.color = '#10b981'; systemBadge.style.background = 'rgba(16,185,129,0.1)'; systemBadge.style.borderColor = 'rgba(16,185,129,0.3)'; }
                if (qualityBadge) { qualityBadge.textContent = '360p SD'; qualityBadge.className = 'telemetry-quality-badge q-360p'; }
                if (bitrateVal) bitrateVal.textContent = '1.5 Mbps';
                if (codecVal) codecVal.textContent = 'H.264';
                if (bufferVal) bufferVal.textContent = '15s';
                if (bufferFill) { bufferFill.style.width = '45%'; bufferFill.style.background = '#10b981'; }
                
                if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                if (pathRouterPhone) { pathRouterPhone.style.stroke = '#f59e0b'; pathRouterPhone.style.opacity = '0.5'; }
                if (routerDot) { routerDot.style.fill = '#f59e0b'; }
                if (routerGlow) routerGlow.style.stroke = '#10b981';
                if (phoneGlow) phoneGlow.style.stroke = '#10b981';
                
                setWifiBars(1, '#10b981');

                if (videoScreen) videoScreen.style.filter = 'blur(2.5px)';
                if (qualityHud) qualityHud.textContent = '360p';
                if (qualityLbl) qualityLbl.textContent = '360p';

                if (buffer) buffer.style.width = `${Math.min(100, 45 + progress * 55)}%`;
                if (playhead) playhead.style.width = `${progress * 100}%`;
                if (spinner) spinner.style.opacity = '0';
            }
            else if (slideId === 'slide_stream_9a') {
                const elapsed = progress * 12.52;
                
                if (elapsed < 4.0) {
                    // Recovery phase starting
                    const curSpeed = 4 + (elapsed / 4.0) * 41;
                    if (speedVal) speedVal.textContent = curSpeed.toFixed(1);
                    
                    const curPing = Math.round(120 - (elapsed / 4.0) * 105);
                    if (pingVal) pingVal.textContent = curPing + ' ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: RECOVERING'; connectionStatus.style.color = '#f59e0b'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: RECOVERING...'; systemBadge.style.color = '#f59e0b'; systemBadge.style.background = 'rgba(245,158,11,0.1)'; systemBadge.style.borderColor = 'rgba(245,158,11,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '360p SD'; qualityBadge.className = 'telemetry-quality-badge q-360p'; }
                    if (bitrateVal) bitrateVal.textContent = '1.5 Mbps';
                    if (codecVal) codecVal.textContent = 'H.264';
                    if (bufferVal) bufferVal.textContent = '15s';
                    if (bufferFill) { bufferFill.style.width = '45%'; bufferFill.style.background = '#f59e0b'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#f59e0b'; pathGgcRouter.style.opacity = '0.8'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#f59e0b'; pathRouterPhone.style.opacity = '0.8'; }
                    if (routerDot) { routerDot.style.fill = '#f59e0b'; }
                    if (routerGlow) routerGlow.style.stroke = '#f59e0b';
                    if (phoneGlow) phoneGlow.style.stroke = '#f59e0b';
                    
                    const barCount = 1 + Math.floor((elapsed / 4.0) * 3);
                    setWifiBars(barCount, '#f59e0b');
                    
                    if (videoScreen) videoScreen.style.filter = 'blur(2.5px)';
                    if (qualityHud) qualityHud.textContent = '360p';
                    if (qualityLbl) qualityLbl.textContent = '360p';
                } 
                else if (elapsed >= 4.0 && elapsed < 8.0) {
                    // Manifest scan for upgrade
                    if (speedVal) speedVal.textContent = '50.0';
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: UPGRADING QUALITY'; systemBadge.style.color = '#00f2fe'; systemBadge.style.background = 'rgba(0,242,254,0.1)'; systemBadge.style.borderColor = 'rgba(0,242,254,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = 'SCANNING...'; qualityBadge.className = 'telemetry-quality-badge q-scanning'; }
                    if (bitrateVal) bitrateVal.textContent = '---';
                    if (codecVal) codecVal.textContent = '---';
                    
                    const bufSec = Math.min(20, 15 + Math.round((elapsed - 4.0) / 4.0 * 5));
                    if (bufferVal) bufferVal.textContent = bufSec + 's';
                    if (bufferFill) { bufferFill.style.width = `${bufSec / 33 * 100}%`; bufferFill.style.background = '#00f2fe'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#00f2fe'; pathGgcRouter.style.opacity = '0.6'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#00f2fe'; pathRouterPhone.style.opacity = '0.6'; }
                    if (routerDot) { routerDot.style.fill = '#00f2fe'; }
                    if (routerGlow) routerGlow.style.stroke = '#00f2fe';
                    if (phoneGlow) phoneGlow.style.stroke = '#00f2fe';
                    
                    setWifiBars(4, '#10b981');
                    if (videoScreen) videoScreen.style.filter = 'blur(2.5px)';

                    if (manifestPopup) {
                        manifestPopup.classList.add('active');
                        if (manifestBadge) manifestBadge.textContent = 'ABR UPGRADING';
                        const pLocal = elapsed - 4.0; // 0 to 4.0
                        
                        if (row360p && mStatus360p) {
                            row360p.className = 'manifest-row selected';
                            mStatus360p.textContent = 'ACTIVE';
                        }
                        if (row1080p && mStatus1080p) {
                            if (pLocal < 1.5) {
                                row1080p.className = 'manifest-row checking';
                                mStatus1080p.textContent = 'CHECKING...';
                            } else {
                                row1080p.className = 'manifest-row selected';
                                mStatus1080p.textContent = 'OK';
                            }
                        }
                        if (row4k && mStatus4k) {
                            if (pLocal < 1.5) {
                                row4k.className = 'manifest-row';
                                mStatus4k.textContent = '--';
                            } else if (pLocal >= 1.5 && pLocal < 3.0) {
                                row4k.className = 'manifest-row checking';
                                mStatus4k.textContent = 'CHECKING...';
                            } else {
                                row4k.className = 'manifest-row selected';
                                mStatus4k.textContent = 'SELECTED';
                                if (manifestBadge) manifestBadge.textContent = '4K MATCHED';
                            }
                        }
                    }

                    // Animate flying packet Phone (140, 25) <-> GGC (20, 25) rapidly
                    if (flyingPacket) {
                        flyingPacket.style.opacity = '1';
                        const pLocal = (elapsed - 4.0) / 4.0;
                        if (pLocal < 0.5) {
                            const ratio = pLocal * 2;
                            const cx = 140 + (20 - 140) * ratio;
                            flyingPacket.setAttribute('cx', cx);
                            flyingPacket.setAttribute('cy', 25);
                            flyingPacket.style.fill = '#00f2fe';
                        } else {
                            const ratio = (pLocal - 0.5) * 2;
                            const cx = 20 + (140 - 20) * ratio;
                            flyingPacket.setAttribute('cx', cx);
                            flyingPacket.setAttribute('cy', 25);
                            flyingPacket.style.fill = '#10b981';
                        }
                    }
                    if (qualityHud) qualityHud.textContent = '360p';
                    if (qualityLbl) qualityLbl.textContent = '360p';
                }
                else {
                    // Restored High-Res 4K UHD
                    if (speedVal) speedVal.textContent = '50.0';
                    if (pingVal) pingVal.textContent = '2 ms';
                    if (connectionStatus) { connectionStatus.textContent = 'LINK STATUS: OPTIMAL'; connectionStatus.style.color = '#10b981'; }
                    if (systemBadge) { systemBadge.textContent = 'ABR: ACTIVE'; systemBadge.style.color = '#10b981'; systemBadge.style.background = 'rgba(16,185,129,0.1)'; systemBadge.style.borderColor = 'rgba(16,185,129,0.3)'; }
                    if (qualityBadge) { qualityBadge.textContent = '4K UHD'; qualityBadge.className = 'telemetry-quality-badge q-4k'; }
                    if (bitrateVal) bitrateVal.textContent = '45 Mbps';
                    if (codecVal) codecVal.textContent = 'AV1';
                    
                    const bufSec = Math.min(32, 20 + Math.round((elapsed - 8.0) / 4.52 * 12));
                    if (bufferVal) bufferVal.textContent = bufSec + 's';
                    if (bufferFill) { bufferFill.style.width = `${bufSec / 33 * 100}%`; bufferFill.style.background = '#10b981'; }
                    
                    if (pathGgcRouter) { pathGgcRouter.style.stroke = '#10b981'; pathGgcRouter.style.opacity = '1'; }
                    if (pathRouterPhone) { pathRouterPhone.style.stroke = '#10b981'; pathRouterPhone.style.opacity = '1'; }
                    if (routerDot) { routerDot.style.fill = '#10b981'; }
                    if (routerGlow) routerGlow.style.stroke = '#10b981';
                    if (phoneGlow) phoneGlow.style.stroke = '#ff007f';
                    
                    setWifiBars(4, '#10b981');
                    
                    // Smoothly remove blur
                    const recoveryRatio = (elapsed - 8.0) / 4.52;
                    let blurVal = 2.5 - recoveryRatio * 2.5;
                    if (blurVal < 0) blurVal = 0;
                    if (videoScreen) videoScreen.style.filter = blurVal > 0 ? `blur(${blurVal}px)` : 'none';
                    
                    if (qualityHud) qualityHud.textContent = '4K UHD';
                    if (qualityLbl) qualityLbl.textContent = '4K UHD';

                    if (successBadge) successBadge.style.display = 'block';
                }

                if (spinner) spinner.style.opacity = '0';
                if (playhead) playhead.style.width = `${progress * 100}%`;
                if (buffer) buffer.style.width = `${Math.min(100, 20 + progress * 80)}%`;
            }
        }
    }

    // Helpers
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: {
                    class: 'lucide-icon-custom'
                },
                nameAttr: 'data-lucide'
            });
        }
    }

    function strokeColor(el, color) {
        if (el) el.style.stroke = color;
    }

    function updateChunkTag(canvas, tagClass, text) {
        canvas.querySelectorAll('.res-tag-indicator').forEach(el => {
            el.className = `res-tag-indicator ${tagClass}`;
            el.textContent = text;
        });
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video12',
        topic: 'YouTube 4K Streaming',
        episodeNum: 12,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video12 Plugin] Loaded: YouTube 4K Streaming slides ready.');
})();
