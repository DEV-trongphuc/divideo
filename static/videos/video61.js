/**
 * Video 61: OpenAI Jalapeño Custom ASIC Chip Simulation
 * Plugin driving visual models, keyphrase activations, and retro-tech animations.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_jla_intro: [
            { text: 'tự thiết kế con chip', start: 4.8, end: 7.2, class: 'active-yellow' },
            { text: 'Jalapeño', start: 6.8, end: 8.0, class: 'active-yellow' }
        ],
        slide_jla_nvidia: [
            { text: 'cắt khỏi “mạch máu”', start: 3.8, end: 6.8, class: 'active-yellow' },
            { text: 'phụ thuộc lượng GPU', start: 7.2, end: 11.8, class: 'active-violet' }
        ],
        slide_jla_design: [
            { text: 'thiết kế cùng Broadcom', start: 1.5, end: 4.8, class: 'active-cyan' },
            { text: 'phản hồi câu hỏi', start: 7.5, end: 10.5, class: 'active-green' }
        ],
        slide_jla_compare: [
            { text: 'xe tải đa năng', start: 1.8, end: 4.2, class: 'active-violet' },
            { text: 'xe chuyên dụng siêu tốc', start: 4.5, end: 7.2, class: 'active-green' }
        ],
        slide_jla_empire: [
            { text: 'giảm chi phí vận hành', start: 1.5, end: 4.5, class: 'active-green' },
            { text: 'đế chế AI khép kín', start: 10.0, end: 13.5, class: 'active-yellow' }
        ],
        slide_jla_outro: [
            { text: 'giúp AI rẻ hơn', start: 1.0, end: 4.2, class: 'active-green' },
            { text: 'kiểm soát hoàn toàn', start: 4.8, end: 8.5, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_jla_intro', 'slide_jla_nvidia', 'slide_jla_design', 'slide_jla_compare', 'slide_jla_empire', 'slide_jla_outro'
    ];

    function sceneWrap(inner) {
        return `<div class="v61-zoom-container"><div class="v61-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_jla_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row v61-hook-row">
                    <!-- Background Cyber Decoration Rings -->
                    <div class="v61-decor-ring ring-outer"></div>
                    <div class="v61-decor-ring ring-inner"></div>

                    <!-- Brand Battle Row on Top -->
                    <div class="v61-logo-battle-row">
                        <!-- OpenAI Brand -->
                        <div class="v61-battle-logo-wrapper oai-wrapper">
                            <img src="/static/videos/openai_logo.png" class="v61-battle-logo" alt="OpenAI">
                            <div class="v61-battle-glow oai-glow"></div>
                        </div>
                        
                        <!-- Partnership icon -->
                        <div class="v61-battle-vs">
                            <i data-lucide="plus" class="v61-battle-vs-icon"></i>
                        </div>
                        
                        <!-- TSMC Brand -->
                        <div class="v61-battle-logo-wrapper tsmc-wrapper">
                            <img src="/static/videos/tsmc_logo.png" class="v61-battle-logo" alt="TSMC">
                            <div class="v61-battle-glow tsmc-glow"></div>
                        </div>
                    </div>
                    
                    <!-- SVG Overlay for Curved Data Streams from Logos to Photo (Centered) -->
                    <svg class="v61-hook-svg" viewBox="0 0 520 330">
                        <!-- Left Curve: OpenAI logo (~160, 30) to Photo top (~260, 110) -->
                        <path class="v61-stream-path oai-stream" id="s-hook-path-left" d="M 140 30 Q 180 90 290 110" />
                        <!-- Right Curve: TSMC logo (~360, 30) to Photo top (~260, 110) -->
                        <path class="v61-stream-path tsmc-stream" id="s-hook-path-right" d="M 380 30 Q 340 90 290 110" />
                    </svg>

                    <!-- Split Row Layout -> Stacked Vertically -->
                    <div class="v61-hook-split">
                        <!-- Top Showcase Card -->
                        <div class="v61-photo-frame" id="s-photo-frame" style="width: 100%; height: 200px; border-radius: 16px;">
                            <div class="v61-hud-corner tl"></div>
                            <div class="v61-hud-corner tr"></div>
                            <div class="v61-hud-corner bl"></div>
                            <div class="v61-hud-corner br"></div>
                            
                            <img src="/static/videos/jalapeno_chip.jpg" class="v61-photo-img" id="s-photo-img" alt="Jalapeño Chip">
                            
                            <!-- Picture in Picture Chip Badge -->
                            <div class="v61-chip-badge" style="bottom: 12px; right: 12px; padding: 6px 10px; gap: 6px;">
                                <span class="v61-badge-pulse"></span>
                                <span class="v61-badge-icon">
                                    <i data-lucide="cpu" style="width:14px; height:14px; color:var(--v61-gold)"></i>
                                </span>
                                <div class="v61-badge-text">
                                    <span class="v61-badge-title" style="font-size: 8.5px;">JALAPEÑO</span>
                                    <span class="v61-badge-sub" style="font-size: 7px;">OpenAI ASIC</span>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Specs HUD Panel (Wide & Compact) -->
                        <div class="v61-specs-hud" id="s-specs-hud" style="width: 100%; height: auto; padding: 12px 16px;">
                            <div class="v61-specs-hdr" style="border-bottom: 1.5px solid rgba(0, 242, 254, 0.2); padding-bottom: 4px; margin-bottom: 6px;">
                                <i data-lucide="cpu" style="width:12px; height:12px;"></i> CHIP SPECS
                            </div>
                            <div style="display: flex; flex-direction: row; width: 100%; align-items: center; justify-content: space-between; gap: 15px;">
                                <!-- Spec list (left columns) -->
                                <div class="v61-spec-list" style="display: flex; flex-direction: row; justify-content: space-between; gap: 15px; flex: 1;">
                                    <div class="v61-spec-item" style="flex: 1;">
                                        <span class="v61-spec-lbl">Co-Design Partner</span>
                                        <span class="v61-spec-val cyan">Broadcom ASIC</span>
                                    </div>
                                    <div class="v61-spec-item" style="flex: 1;">
                                        <span class="v61-spec-lbl">Processor Type</span>
                                        <span class="v61-spec-val green">Inference Only</span>
                                    </div>
                                    <div class="v61-spec-item" style="flex: 1;">
                                        <span class="v61-spec-lbl">Primary Workload</span>
                                        <span class="v61-spec-val gold">ChatGPT & AI Agent</span>
                                    </div>
                                </div>
                                <!-- Nodes Matrix (right panel grid) -->
                                <div class="v61-nodes-matrix" id="s-nodes-matrix" style="border-top: none; border-left: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0; padding-left: 15px; margin-top: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;">
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                    <div class="v61-matrix-dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- News ticker box below -->
                    <div class="v61-ticker-box" id="s-ticker-box" style="margin-top: 10px;">
                        <div class="v61-ticker-badge">AI NEWS</div>
                        <div class="v61-ticker-text" id="s-ticker-text">LOADING DATAFEED...</div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_jla_nvidia') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row">
                    <div class="v61-split-scene">
                        <!-- NVIDIA GPU CARD -->
                        <div class="v61-card v61-bloodline-card nvidia-card" id="s-nvidia-card">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:8px; width:100%;">
                                <img src="/static/videos/nvidia_logo.png" class="v61-entity-logo" alt="NVIDIA">
                                <span class="v61-entity-label">NVIDIA H100</span>
                            </div>
                            <span class="v61-entity-chip-icon">
                                <i data-lucide="database" style="width:48px; height:48px; color:var(--v61-nvidia)"></i>
                            </span>
                            <span class="v61-entity-desc">Nguồn cấp GPU huyết mạch của hệ sinh thái AI</span>
                        </div>

                        <!-- Data connection pipe -->
                        <div class="v61-cable-track" id="s-cable-track">
                            <div class="v61-cable-left"></div>
                            <div class="v61-cable-right"></div>
                            <!-- Flowing data packets -->
                            <div class="v61-cable-packet" id="s-packet-1" style="left:10%;"></div>
                            <div class="v61-cable-packet" id="s-packet-2" style="left:50%;"></div>
                            <div class="v61-cable-packet" id="s-packet-3" style="left:80%;"></div>
                            
                            <!-- Scissor icon -->
                            <div class="v61-scissors" id="s-scissors">
                                <i data-lucide="scissors" style="width:26px; height:26px;" id="s-scissors-icon"></i>
                            </div>
                        </div>

                        <!-- Red cross overlay -->
                        <div class="v61-cross-overlay" id="s-cross-overlay">
                            <i data-lucide="x-circle" style="width:70px; height:70px; color:var(--v61-primary)"></i>
                        </div>

                        <!-- OPENAI INDEPENDENT CLOUD -->
                        <div class="v61-card v61-bloodline-card openai-card" id="s-openai-card">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:8px; width:100%;">
                                <img src="/static/videos/openai_logo.png" class="v61-entity-logo" alt="OpenAI">
                                <span class="v61-entity-label">OPENAI CLOUD</span>
                            </div>
                            <span class="v61-entity-chip-icon" id="s-openai-chip-icon">
                                <i data-lucide="cloud" style="width:48px; height:48px; color:#fff" id="s-oai-icon"></i>
                            </span>
                            <span class="v61-entity-desc" id="s-openai-chip-desc">Chạy các mô hình ChatGPT, Codex, AI Agents</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_jla_design') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row">
                    <div class="v61-design-grid">
                        <!-- Blueprint block diagram -->
                        <div class="v61-blueprint-board">
                            <!-- SVG Connecting Flow Line in Background -->
                            <svg class="v61-bp-flow-svg" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                <defs>
                                    <linearGradient id="v61-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="var(--v61-nvidia)" />
                                        <stop offset="100%" stop-color="var(--v61-primary)" />
                                    </linearGradient>
                                </defs>
                                <path id="s-bp-flow-path" d="M 220 90 L 360 90" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />
                                <path id="s-bp-flow-pulse" d="M 220 90 L 360 90" fill="none" stroke="url(#v61-flow-grad)" stroke-width="3.5" stroke-dasharray="12 18" stroke-dashoffset="0" style="opacity: 0; filter: drop-shadow(0 0 5px var(--v61-primary)); transition: opacity 0.2s;" />
                            </svg>

                            <div class="v61-bp-block inactive" id="s-bp-train" style="z-index:2;">
                                <span class="v61-bp-icon">
                                    <img src="/static/videos/nvidia_logo.png" style="width:38px; height:38px; object-fit:contain;" alt="NVIDIA">
                                </span>
                                <span class="v61-bp-title">TRAINING</span>
                                <span class="v61-bp-desc">Học máy từ đầu (Nvidia GPU)</span>
                            </div>

                            <!-- Legacy flow element kept invisible to prevent reference errors -->
                            <div class="v61-bp-flow-line" id="s-bp-flow" style="display:none;"></div>

                            <div class="v61-bp-block active" id="s-bp-infer" style="z-index:2;">
                                <span class="v61-bp-icon">
                                    <img src="/static/videos/openai_logo.png" style="width:38px; height:38px; object-fit:contain;" alt="OpenAI">
                                </span>
                                <span class="v61-bp-title">INFERENCE</span>
                                <span class="v61-bp-desc">Phản hồi prompt Jalapeño</span>
                            </div>
                        </div>

                        <!-- Staggered metric progress bars -->
                        <div class="v61-design-metrics">
                            <!-- Metric 1: Power -->
                            <div class="v61-metric-progress-row">
                                <div class="v61-metric-hdr">
                                    <span class="v61-metric-name">Năng Lượng Tiêu Thụ (Power Draw)</span>
                                    <span class="v61-metric-val-compare" id="s-metric-power">
                                        <span class="bad">100%</span><span class="good">100%</span>
                                    </span>
                                </div>
                                <div class="v61-bar-bg">
                                    <div class="v61-bar-fill power" id="s-bar-power" style="width: 100%;"></div>
                                </div>
                            </div>

                            <!-- Metric 2: Latency -->
                            <div class="v61-metric-progress-row">
                                <div class="v61-metric-hdr">
                                    <span class="v61-metric-name">Độ Trễ Phản Hồi (Inference Latency)</span>
                                    <span class="v61-metric-val-compare" id="s-metric-latency">
                                        <span class="bad">50ms</span><span class="good">50ms</span>
                                    </span>
                                </div>
                                <div class="v61-bar-bg">
                                    <div class="v61-bar-fill latency" id="s-bar-latency" style="width: 100%;"></div>
                                </div>
                            </div>

                            <!-- Metric 3: Cost -->
                            <div class="v61-metric-progress-row">
                                <div class="v61-metric-hdr">
                                    <span class="v61-metric-name">Chi Phí Vận Hành Mở Rộng (Query Cost)</span>
                                    <span class="v61-metric-val-compare" id="s-metric-cost">
                                        <span class="bad">1.0x</span><span class="good">1.0x</span>
                                    </span>
                                </div>
                                <div class="v61-bar-bg">
                                    <div class="v61-bar-fill cost" id="s-bar-cost" style="width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_jla_compare') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row">
                    <div class="v61-compare-row">
                        <!-- NVIDIA GENERAL TRUCK CARD -->
                        <div class="v61-card v61-compare-card nvidia-comp" id="s-nvidia-comp">
                            <div class="v61-comp-hdr">
                                <h3>Nvidia GPU</h3>
                                <div class="v61-comp-icon-box">
                                    <i data-lucide="truck" style="width:18px; height:18px; color:var(--v61-nvidia)"></i>
                                </div>
                            </div>
                            <div class="v61-comp-display">
                                <span class="v61-comp-vehicle" id="s-nvidia-vehicle">
                                    <i data-lucide="truck" style="width:70px; height:70px; color:var(--v61-nvidia)"></i>
                                </span>
                            </div>
                            <div class="v61-comp-bullet-list">
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-nvidia)"></i> Xe Tải Đa Năng
                                </div>
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-nvidia)"></i> Train mọi loại AI
                                </div>
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-nvidia)"></i> Tốn điện, đắt đỏ
                                </div>
                            </div>
                            <span class="v61-comp-tag">Đa Dụng / Cồng Kềnh</span>
                        </div>

                        <!-- OPENAI JALAPENO CAR CARD -->
                        <div class="v61-card v61-compare-card openai-comp" id="s-openai-comp">
                            <div class="v61-comp-hdr">
                                <h3>Jalapeño</h3>
                                <div class="v61-comp-icon-box">
                                    <i data-lucide="zap" style="width:18px; height:18px; color:var(--v61-primary)"></i>
                                </div>
                            </div>
                            <div class="v61-comp-display">
                                <!-- Background speed lines -->
                                <div class="v61-speed-line" style="top:25%; left:10%;"></div>
                                <div class="v61-speed-line" style="top:55%; left:25%;"></div>
                                <div class="v61-speed-line" style="top:75%; left:5%;"></div>
                                <span class="v61-comp-vehicle v61-comp-drone-fly" id="s-openai-vehicle">
                                    <i data-lucide="zap" style="width:65px; height:65px; color:var(--v61-primary); filter:drop-shadow(0 0 10px var(--v61-primary))"></i>
                                </span>
                            </div>
                            <div class="v61-comp-bullet-list">
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-primary)"></i> Xe Chở AI Chuyên Dụng
                                </div>
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-primary)"></i> Tối ưu Inference ChatGPT
                                </div>
                                <div class="v61-comp-bullet-item">
                                    <i data-lucide="check" style="width:12px; height:12px; color:var(--v61-primary)"></i> Siêu tiết kiệm & Rẻ
                                </div>
                            </div>
                            <span class="v61-comp-tag">Tốc Độ / Chuyên Biệt</span>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_jla_empire') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row">
                    <div class="v61-empire-circle-container">
                        <!-- Shield Glow Bubble -->
                        <div class="v61-shield-bubble" id="s-shield-bubble"></div>

                        <!-- Center Empire Node -->
                        <div class="v61-center-castle" id="s-center-castle">
                            <img src="/static/videos/openai_logo.png" class="v61-center-oai-logo" id="s-center-oai-logo" alt="OpenAI">
                        </div>

                        <!-- Loop Nodes -->
                        <div class="v61-empire-node v61-node-cloud" id="s-node-cloud">
                            <span class="icon">
                                <i data-lucide="cloud" style="width:24px; height:24px; color:var(--v61-accent)"></i>
                            </span>
                            <span>Hạ Tầng</span>
                        </div>
                        <div class="v61-empire-node v61-node-data" id="s-node-data">
                            <span class="icon">
                                <i data-lucide="database" style="width:24px; height:24px; color:var(--v61-accent)"></i>
                            </span>
                            <span>Dữ Liệu</span>
                        </div>
                        <div class="v61-empire-node v61-node-model" id="s-node-model">
                            <span class="icon">
                                <i data-lucide="git-branch" style="width:24px; height:24px; color:var(--v61-accent)"></i>
                            </span>
                            <span>Mô Hình</span>
                        </div>
                        <div class="v61-empire-node v61-node-chip" id="s-node-chip">
                            <span class="icon">
                                <i data-lucide="cpu" style="width:24px; height:24px; color:var(--v61-gold)"></i>
                            </span>
                            <span>Chip Tự Chế</span>
                        </div>
                        <div class="v61-empire-node v61-node-users" id="s-node-users">
                            <span class="icon">
                                <i data-lucide="users" style="width:24px; height:24px; color:var(--v61-accent)"></i>
                            </span>
                            <span>Người Dùng</span>
                        </div>

                        <!-- Connection loops SVG -->
                        <svg class="v61-loop-svg" viewBox="0 0 380 380">
                            <!-- Paths linking nodes in circle -->
                            <path class="v61-connection-path" id="s-path-1" d="M 190 50 Q 275 80 320 140" />
                            <path class="v61-connection-path" id="s-path-2" d="M 320 140 Q 315 220 270 290" />
                            <path class="v61-connection-path" id="s-path-3" d="M 270 290 Q 190 310 110 290" />
                            <path class="v61-connection-path" id="s-path-4" d="M 110 290 Q 65 220 60 140" />
                            <path class="v61-connection-path" id="s-path-5" d="M 60 140 Q 105 80 190 50" />
                        </svg>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_jla_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v61-scene-row">
                    <div class="v61-poll-container" style="width: 560px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="v61-poll-cards" style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
                            <!-- Option A -->
                            <div class="v61-card v61-poll-card opt-a" id="s-poll-opt-a" style="display:flex; flex-direction:row; align-items:center; gap:16px; height:82px; padding:12px 24px; position:relative; overflow:hidden; border-radius:14px; width:100%; opacity:1; transform:scale(1);">
                                <div class="v61-poll-icon-wrap" style="width:42px; height:42px; border-radius:50%; background:rgba(16, 185, 129, 0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    <i data-lucide="globe" style="width:20px; height:20px; color:#10b981"></i>
                                </div>
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:center; text-align:left; line-height:1.3; z-index:2;">
                                    <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.5px;">Lựa chọn 1</span>
                                    <span style="font-size:15px; font-weight:bold; color:#fff; margin-top:3px;">Giúp AI rẻ hơn cho nhân loại</span>
                                </div>
                                <div class="v61-poll-pct-text" id="s-pct-opt-a" style="position:static; opacity:1; font-size:24px; font-weight:900; color:#10b981; margin-left:18px; font-family:monospace; transform:none; transition:none; z-index:2;">0%</div>
                                <div class="v61-poll-pct-bar" id="s-bar-opt-a" style="position:absolute; bottom:0; left:0; height:5px; width:0%; background:#10b981; transition:width 0.8s cubic-bezier(0.16, 1, 0.3, 1); z-index:1;"></div>
                            </div>
 
                            <!-- Option B -->
                            <div class="v61-card v61-poll-card opt-b" id="s-poll-opt-b" style="display:flex; flex-direction:row; align-items:center; gap:16px; height:82px; padding:12px 24px; position:relative; overflow:hidden; border-radius:14px; width:100%; opacity:1; transform:scale(1);">
                                <div class="v61-poll-icon-wrap" style="width:42px; height:42px; border-radius:50%; background:rgba(245, 158, 11, 0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    <i data-lucide="shield" style="width:20px; height:20px; color:#f59e0b"></i>
                                </div>
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:center; text-align:left; line-height:1.3; z-index:2;">
                                    <span style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.5px;">Lựa chọn 2</span>
                                    <span style="font-size:15px; font-weight:bold; color:#fff; margin-top:3px;">Bước đầu độc quyền kiểm soát AI</span>
                                </div>
                                <div class="v61-poll-pct-text" id="s-pct-opt-b" style="position:static; opacity:1; font-size:24px; font-weight:900; color:#f59e0b; margin-left:18px; font-family:monospace; transform:none; transition:none; z-index:2;">0%</div>
                                <div class="v61-poll-pct-bar" id="s-bar-opt-b" style="position:absolute; bottom:0; left:0; height:5px; width:0%; background:#f59e0b; transition:width 0.8s cubic-bezier(0.16, 1, 0.3, 1); z-index:1;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Trigger Lucide parsing for injected icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── INTERACTIVE TIMELINE ANIMATION ─────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v61-scene-row');
        if (!row) return;

        // Slide 1: Specs matrix blinking, background rings rotating, and hover float
        if (slideId === 'slide_jla_intro') {
            const frame = row.querySelector('#s-photo-frame');
            const img = row.querySelector('#s-photo-img');
            const tickerText = row.querySelector('#s-ticker-text');
            const ringOuter = row.querySelector('.ring-outer');
            const ringInner = row.querySelector('.ring-inner');
            const dots = row.querySelectorAll('.v61-matrix-dot');

            if (frame) {
                // Dynamic 3D hovering floating tilt
                const yShift = Math.sin(progress * 10) * 5;
                const xRot = Math.sin(progress * 6) * 2.5;
                const yRot = Math.cos(progress * 6) * 2.5;
                frame.style.transform = `translateY(${yShift}px) rotateX(${xRot}deg) rotateY(${yRot}deg)`;
                
                // Pulsing glow shadow (reduced neon shadow)
                const glowSize = 10 + Math.sin(progress * 15) * 3;
                frame.style.boxShadow = `0 0 ${glowSize}px rgba(245, 158, 11, 0.25)`;
            }

            if (img) {
                // Ken burns image scaling
                img.style.transform = `scale(${1.05 + progress * 0.1})`;
            }

            if (ringOuter) ringOuter.style.transform = `translate(-50%, -50%) rotate(${progress * 90}deg)`;
            if (ringInner) ringInner.style.transform = `translate(-50%, -50%) rotate(${-progress * 150}deg)`;

            if (dots.length > 0) {
                dots.forEach((dot, idx) => {
                    const active = Math.sin(progress * 80 + idx * 4.3) * Math.cos(progress * 30 - idx * 2.1) > 0.15;
                    dot.classList.toggle('active', active);
                });
            }

            if (tickerText) {
                // Live typing ticker text
                const fullText = "CO-DESIGNED WITH BROADCOM • CUSTOM JALAPENO ASIC INTELLIGENCE PROCESSOR";
                const chars = Math.floor(progress * fullText.length);
                tickerText.textContent = fullText.slice(0, chars) + (progress < 0.98 ? "_" : "");
            }

            // Spawn floating neon dot-particles
            let lastSpawnTime = parseFloat(canvas.getAttribute('data-last-spawn') || '0');
            const now = progress;
            if (now - lastSpawnTime > 0.08 && now < 0.95) {
                canvas.setAttribute('data-last-spawn', now.toString());
                const container = row.querySelector('#s-photo-frame');
                if (container) {
                    const particle = document.createElement('div');
                    particle.className = 'v61-dot-particle';
                    particle.style.background = Math.random() > 0.5 ? 'var(--v61-primary)' : 'var(--v61-gold)';
                    particle.style.boxShadow = `0 0 8px ${particle.style.background}`;
                    
                    const left = 5 + Math.random() * 90;
                    particle.style.left = `${left}%`;
                    particle.style.bottom = '5%';
                    particle.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
                    particle.style.animationDelay = '0s';
                    
                    container.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 3000);
                }
            }
        }

        // Slide 2: Data packets flow, scissor snapping, and electric sparks explosion
        else if (slideId === 'slide_jla_nvidia') {
            const nvidiaCard = row.querySelector('#s-nvidia-card');
            const openaiCard = row.querySelector('#s-openai-card');
            const cableTrack = row.querySelector('#s-cable-track');
            const crossOverlay = row.querySelector('#s-cross-overlay');
            const scissors = row.querySelector('#s-scissors');
            const oaiChipIcon = row.querySelector('#s-openai-chip-icon');
            const oaiChipDesc = row.querySelector('#s-openai-chip-desc');

            const p1 = row.querySelector('#s-packet-1');
            const p2 = row.querySelector('#s-packet-2');
            const p3 = row.querySelector('#s-packet-3');

            if (progress <= 0.25) {
                if (nvidiaCard) nvidiaCard.className = 'v61-card v61-bloodline-card nvidia-card';
                if (openaiCard) openaiCard.className = 'v61-card v61-bloodline-card openai-card';
                if (cableTrack) cableTrack.className = 'v61-cable-track';
                if (crossOverlay) crossOverlay.className = 'v61-cross-overlay';
                
                if (scissors) {
                    scissors.classList.add('active');
                    const scissorPos = 20 + (progress / 0.25) * 30;
                    scissors.style.left = `${scissorPos}%`;
                    scissors.style.transform = `translateX(-50%) rotate(${progress * 1280}deg)`;
                }

                if (oaiChipIcon && oaiChipIcon.dataset.state !== 'cloud') {
                    oaiChipIcon.dataset.state = 'cloud';
                    oaiChipIcon.innerHTML = `<i data-lucide="cloud" style="width:48px; height:48px; color:#fff" id="s-oai-icon"></i>`;
                    if (typeof lucide !== 'undefined') lucide.createIcons({ node: oaiChipIcon });
                }
                if (oaiChipDesc) oaiChipDesc.textContent = 'Chạy các mô hình ChatGPT, Codex, AI Agents';

                if (p1) p1.style.left = `${((progress * 3) % 1.0) * 100}%`;
                if (p2) p2.style.left = `${((progress * 3 + 0.33) % 1.0) * 100}%`;
                if (p3) p3.style.left = `${((progress * 3 + 0.66) % 1.0) * 100}%`;
            } else {
                if (nvidiaCard) nvidiaCard.className = 'v61-card v61-bloodline-card nvidia-card crashed';
                if (openaiCard) openaiCard.className = 'v61-card v61-bloodline-card openai-card independent';
                if (cableTrack) cableTrack.className = 'v61-cable-track cut-active';
                if (crossOverlay) crossOverlay.className = 'v61-cross-overlay active';
                
                if (oaiChipIcon && oaiChipIcon.dataset.state !== 'chip') {
                    oaiChipIcon.dataset.state = 'chip';
                    oaiChipIcon.innerHTML = `<i data-lucide="cpu" style="width:48px; height:48px; color:var(--v61-primary)" id="s-oai-icon"></i>`;
                    if (typeof lucide !== 'undefined') lucide.createIcons({ node: oaiChipIcon });
                }
                if (oaiChipDesc) {
                    oaiChipDesc.innerHTML = '<strong>Độc lập vận hành</strong> với chip Jalapeño tự thiết kế';
                    oaiChipDesc.style.color = 'var(--v61-primary)';
                }

                if (scissors) {
                    scissors.style.left = '50%';
                    scissors.style.transform = 'translateX(-50%) rotate(-45deg) scale(1.3)';
                }

                // Shake Nvidia card briefly on snap
                if (progress > 0.25 && progress < 0.35) {
                    if (nvidiaCard) nvidiaCard.style.transform = `translate(${Math.sin(progress * 120) * 4}px, ${Math.cos(progress * 120) * 4}px)`;
                    if (crossOverlay) {
                        crossOverlay.style.left = `${nvidiaCard.offsetLeft + nvidiaCard.offsetWidth/2 - 35}px`;
                        crossOverlay.style.top = `${nvidiaCard.offsetTop + nvidiaCard.offsetHeight/2 - 45}px`;
                    }
                } else {
                    if (nvidiaCard) nvidiaCard.style.transform = 'none';
                    if (crossOverlay) {
                        crossOverlay.style.left = '20%';
                        crossOverlay.style.top = '40%';
                    }
                }

                // TRIGGER SPARK EXPLOSION ONCE
                if (!canvas.v61SparksSpawned) {
                    canvas.v61SparksSpawned = true;
                    if (cableTrack) {
                        for (let i = 0; i < 20; i++) {
                            const spark = document.createElement('div');
                            spark.className = 'v61-spark';
                            spark.style.left = '50%';
                            spark.style.top = '50%';
                            const angle = Math.random() * Math.PI * 2;
                            const speed = 60 + Math.random() * 80;
                            spark.style.background = Math.random() > 0.5 ? 'var(--v61-primary)' : 'var(--v61-accent)';
                            spark.style.boxShadow = `0 0 10px ${spark.style.background}`;
                            cableTrack.appendChild(spark);
                            
                            setTimeout(() => {
                                spark.style.transition = 'all 0.6s cubic-bezier(0.1, 0.8, 0.1, 1)';
                                spark.style.transform = `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px) scale(0)`;
                                spark.style.opacity = '0';
                            }, 10);
                            
                            setTimeout(() => spark.remove(), 700);
                        }
                    }
                }
            }

            if (progress < 0.15) {
                canvas.v61SparksSpawned = false;
            }
        }

        // Slide 3: Co-Design ASIC blueprint & dynamic metrics counts with card transitions
        else if (slideId === 'slide_jla_design') {
            const bpTrain = row.querySelector('#s-bp-train');
            const bpInfer = row.querySelector('#s-bp-infer');
            const bpFlow = row.querySelector('#s-bp-flow');
            const barPower = row.querySelector('#s-bar-power');
            const barLatency = row.querySelector('#s-bar-latency');
            const barCost = row.querySelector('#s-bar-cost');
            
            const metPower = row.querySelector('#s-metric-power');
            const metLatency = row.querySelector('#s-metric-latency');
            const metCost = row.querySelector('#s-metric-cost');
            const bpFlowPulse = row.querySelector('#s-bp-flow-pulse');

            if (progress < 0.2) {
                // Training is active initially, Inference is dim
                if (bpTrain) {
                    bpTrain.className = 'v61-bp-block active';
                    bpTrain.style.borderColor = 'var(--v61-nvidia)';
                    bpTrain.style.boxShadow = '0 0 20px var(--v61-nvidia-glow)';
                    bpTrain.style.transform = 'scale(1.08)';
                }
                
                if (bpInfer) {
                    bpInfer.className = 'v61-bp-block inactive';
                    bpInfer.style.borderColor = 'rgba(255,255,255,0.1)';
                    bpInfer.style.boxShadow = 'none';
                    bpInfer.style.transform = 'scale(0.95)';
                }

                if (bpFlowPulse) {
                    bpFlowPulse.style.opacity = '0';
                }
                
                if (barPower) barPower.style.width = '100%';
                if (barLatency) barLatency.style.width = '100%';
                if (barCost) barCost.style.width = '100%';

                if (metPower) metPower.innerHTML = '<span class="bad">100%</span>';
                if (metLatency) metLatency.innerHTML = '<span class="bad">50ms</span>';
                if (metCost) metCost.innerHTML = '<span class="bad">1.0x</span>';
            } 
            else if (progress >= 0.2 && progress < 0.45) {
                // Signal travels along path
                if (bpTrain) {
                    bpTrain.className = 'v61-bp-block active';
                    bpTrain.style.borderColor = 'var(--v61-nvidia)';
                    bpTrain.style.boxShadow = '0 0 20px var(--v61-nvidia-glow)';
                    bpTrain.style.transform = 'scale(1.08)';
                }
                if (bpInfer) {
                    bpInfer.className = 'v61-bp-block inactive';
                    bpInfer.style.borderColor = 'rgba(255,255,255,0.1)';
                    bpInfer.style.boxShadow = 'none';
                    bpInfer.style.transform = 'scale(0.95)';
                }
                
                if (bpFlowPulse) {
                    bpFlowPulse.style.opacity = '1';
                    const elapsed = (progress - 0.2) / 0.25;
                    bpFlowPulse.style.strokeDashoffset = `${-elapsed * 120}`;
                }

                if (barPower) barPower.style.width = '100%';
                if (barLatency) barLatency.style.width = '100%';
                if (barCost) barCost.style.width = '100%';

                if (metPower) metPower.innerHTML = '<span class="bad">100%</span>';
                if (metLatency) metLatency.innerHTML = '<span class="bad">50ms</span>';
                if (metCost) metCost.innerHTML = '<span class="bad">1.0x</span>';
            }
            else {
                // Inference takes over, Training dims
                if (bpTrain) {
                    bpTrain.className = 'v61-bp-block inactive';
                    bpTrain.style.borderColor = 'rgba(255,255,255,0.1)';
                    bpTrain.style.boxShadow = 'none';
                    bpTrain.style.transform = 'scale(0.95)';
                }
                if (bpInfer) {
                    bpInfer.className = 'v61-bp-block active';
                    bpInfer.style.borderColor = 'var(--v61-primary)';
                    bpInfer.style.boxShadow = '0 0 25px var(--v61-primary-glow)';
                    
                    // Card pop bounce animation
                    const scaleFactor = Math.min(1.12, 1.08 + Math.sin((progress - 0.45) * 15) * 0.05);
                    bpInfer.style.transform = `scale(${scaleFactor})`;
                }
                
                if (bpFlowPulse) {
                    bpFlowPulse.style.opacity = '0.8';
                    bpFlowPulse.style.strokeDashoffset = `${-progress * 100}`;
                }

                const factor = Math.min(1.0, (progress - 0.45) / 0.4);
                const easeFactor = factor * (2 - factor);

                const finalPower = 100 - (80 * easeFactor);
                const finalLatency = 50 - (42 * easeFactor);
                const finalCost = 100 - (90 * easeFactor);

                if (barPower) barPower.style.width = `${finalPower}%`;
                if (barLatency) barLatency.style.width = `${(finalLatency / 50) * 100}%`;
                if (barCost) barCost.style.width = `${finalCost}%`;

                if (metPower) metPower.innerHTML = `<span class="bad">100%</span><span class="good">${Math.round(finalPower)}%</span>`;
                if (metLatency) metLatency.innerHTML = `<span class="bad">50ms</span><span class="good">${Math.round(finalLatency)}ms</span>`;
                if (metCost) metCost.innerHTML = `<span class="bad">1.0x</span><span class="good">${(finalCost / 100).toFixed(2)}x</span>`;
            }
        }

        // Slide 4: Cargo Truck bumpy drive vs Jalapeno Racer wind trails
        else if (slideId === 'slide_jla_compare') {
            const nvidiaCard = row.querySelector('#s-nvidia-comp');
            const openaiCard = row.querySelector('#s-openai-comp');
            const truck = row.querySelector('#s-nvidia-vehicle');
            const drone = row.querySelector('#s-openai-vehicle');

            if (progress <= 0.45) {
                if (nvidiaCard) nvidiaCard.className = 'v61-card v61-compare-card nvidia-comp card-active';
                if (openaiCard) openaiCard.className = 'v61-card v61-compare-card openai-comp card-inactive';
                
                if (truck) {
                    const rot = Math.sin(progress * 40) * 1.5;
                    const shift = Math.sin(progress * 20) * 4;
                    truck.style.transform = `rotate(${rot}deg) translateY(${shift}px)`;
                }
                if (drone) drone.style.transform = 'translateX(-220px) scale(0.8)';

                // Exhaust smoke particles
                let lastSmokeTime = parseFloat(canvas.getAttribute('data-last-smoke') || '0');
                if (progress - lastSmokeTime > 0.08) {
                    canvas.setAttribute('data-last-smoke', progress.toString());
                    const display = row.querySelector('.nvidia-comp .v61-comp-display');
                    if (display) {
                        const smoke = document.createElement('span');
                        smoke.style.position = 'absolute';
                        smoke.style.fontSize = '14px';
                        smoke.style.left = '45%';
                        smoke.style.top = '62%';
                        smoke.style.opacity = '0.7';
                        smoke.style.pointerEvents = 'none';
                        smoke.textContent = '💨';
                        display.appendChild(smoke);
                        
                        setTimeout(() => {
                            smoke.style.transition = 'all 1s ease-out';
                            smoke.style.transform = 'translate(-45px, -20px) scale(1.6)';
                            smoke.style.opacity = '0';
                        }, 20);
                        setTimeout(() => smoke.remove(), 1100);
                    }
                }
            } else {
                if (nvidiaCard) nvidiaCard.className = 'v61-card v61-compare-card nvidia-comp card-inactive';
                if (openaiCard) openaiCard.className = 'v61-card v61-compare-card openai-comp card-active';

                if (truck) truck.style.transform = 'none';

                const speedLines = row.querySelectorAll('.v61-speed-line');
                speedLines.forEach((line, index) => {
                    const speed = 300 + index * 100;
                    line.style.transform = `translateX(${((progress * speed) % 200) - 100}px)`;
                });

                if (drone) {
                    const factor = Math.min(1.0, (progress - 0.45) / 0.35);
                    const ease = factor * (2 - factor);
                    const x = -200 + (ease * 200);
                    const y = Math.sin(progress * 25) * 5;
                    drone.style.transform = `translateX(${x}px) translateY(${y}px) scaleX(1.18)`;
                }
            }
        }

        // Slide 5: Sequential drawing loops and shield bubble ripples (Smooth)
        else if (slideId === 'slide_jla_empire') {
            const castle = row.querySelector('#s-center-castle');
            const bubble = row.querySelector('#s-shield-bubble');
            const oaiLogo = row.querySelector('#s-center-oai-logo');

            const nodes = {
                cloud: row.querySelector('#s-node-cloud'),
                data: row.querySelector('#s-node-data'),
                model: row.querySelector('#s-node-model'),
                chip: row.querySelector('#s-node-chip'),
                users: row.querySelector('#s-node-users')
            };

            const paths = {
                p1: row.querySelector('#s-path-1'),
                p2: row.querySelector('#s-path-2'),
                p3: row.querySelector('#s-path-3'),
                p4: row.querySelector('#s-path-4'),
                p5: row.querySelector('#s-path-5')
            };

            const drawPath = (path, start, end) => {
                if (!path) return;
                const pathLength = path.getTotalLength() || 160;
                path.style.strokeDasharray = `${pathLength}`;
                
                if (progress < start) {
                    path.style.strokeDashoffset = `${pathLength}`;
                    path.classList.remove('active');
                } else if (progress > end) {
                    path.style.strokeDashoffset = '0';
                    path.classList.add('active');
                } else {
                    const localProg = (progress - start) / (end - start);
                    path.style.strokeDashoffset = `${pathLength - localProg * pathLength}`;
                    path.classList.add('active');
                }
            };

            const popNode = (node, triggerProg) => {
                if (!node) return;
                if (progress > triggerProg) {
                    node.classList.add('active');
                } else {
                    node.classList.remove('active');
                }
            };

            popNode(nodes.cloud, 0.05);
            drawPath(paths.p1, 0.05, 0.15);
            
            popNode(nodes.data, 0.15);
            drawPath(paths.p2, 0.15, 0.25);
            
            popNode(nodes.model, 0.25);
            drawPath(paths.p3, 0.25, 0.35);
            
            popNode(nodes.chip, 0.35);
            drawPath(paths.p4, 0.35, 0.45);
            
            popNode(nodes.users, 0.45);
            drawPath(paths.p5, 0.45, 0.55);

            // Animate OpenAI logo scale & rotation
            if (oaiLogo) {
                const baseScale = progress < 0.5 ? (progress / 0.5) : 1.0;
                const pulse = 1.0 + Math.sin(progress * 15) * 0.03;
                oaiLogo.style.transform = `scale(${baseScale * pulse}) rotate(${progress * 360}deg)`;
            }

            // Loop locked down & shield active
            if (progress > 0.6) {
                if (castle) castle.classList.add('locked');
                if (bubble) bubble.classList.add('active');
                row.querySelectorAll('.v61-empire-node').forEach(node => node.classList.add('locked'));
            } else {
                if (castle) castle.classList.remove('locked');
                if (bubble) bubble.classList.remove('active');
                row.querySelectorAll('.v61-empire-node').forEach(node => node.classList.remove('locked'));
            }
        }

        // Slide 6: Outro Feedback Poll
        else if (slideId === 'slide_jla_outro') {
            const cardA = row.querySelector('#s-poll-opt-a');
            const cardB = row.querySelector('#s-poll-opt-b');
            const barA = row.querySelector('#s-bar-opt-a');
            const barB = row.querySelector('#s-bar-opt-b');
            
            const pctA = row.querySelector('#s-pct-opt-a');
            const pctB = row.querySelector('#s-pct-opt-b');

            if (cardA) {
                cardA.className = 'v61-card v61-poll-card opt-a voted';
                cardA.style.transform = 'scale(1) translateY(0)';
                cardA.style.opacity = '1';
            }
            if (cardB) {
                cardB.className = 'v61-card v61-poll-card opt-b voted';
                cardB.style.transform = 'scale(1) translateY(0)';
                cardB.style.opacity = '1';
            }

            const factor = Math.min(1.0, progress / 0.65);
            const ease = factor * (2 - factor);

            const countA = Math.round(ease * 68);
            const countB = Math.round(ease * 32);

            if (barA) barA.style.width = `${countA}%`;
            if (barB) barB.style.width = `${countB}%`;

            if (pctA) pctA.textContent = `${countA}%`;
            if (pctB) pctB.textContent = `${countB}%`;
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video61',
        topic: 'OpenAI Jalapeno Chip',
        episodeNum: 61,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video61 Plugin] Loaded: OpenAI Jalapeño Custom ASIC Chip Simulation.');
})();
