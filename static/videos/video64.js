/**
 * Video 64: Progress Bar Stuck at 99% Simulation
 * Plugin driving custom slides, simulated OS installation windows,
 * milestone checklists, and psychological easing curve charts.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_loading_intro: [
            { text: 'đứng im bất động', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'hiển thị đúng tốc độ', start: 7.0, end: 9.5, class: 'active-yellow' }
        ],
        slide_loading_error: [
            { text: 'Setup Not Responding', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'cú lừa tâm lý cực lớn', start: 7.0, end: 10.0, class: 'active-yellow' }
        ],
        slide_loading_milestones: [
            { text: 'không thể tự đoán', start: 2.0, end: 5.0, class: 'active-red' },
            { text: 'cột mốc sự kiện cố định', start: 6.5, end: 10.0, class: 'active-green' }
        ],
        slide_loading_uneven: [
            { text: 'giải nén 950MB mất 2 giây', start: 3.5, end: 6.5, class: 'active-cyan' },
            { text: 'nặng gấp 10 lần các bước trước', start: 8.0, end: 11.5, class: 'active-yellow' }
        ],
        slide_loading_graph_real: [
            { text: 'đường nằm ngang phẳng lì', start: 3.0, end: 6.0, class: 'active-red' },
            { text: 'bất ngờ dựng đứng ở giây cuối', start: 7.0, end: 10.5, class: 'active-yellow' }
        ],
        slide_loading_graph_display: [
            { text: 'chạy thật nhanh lúc đầu', start: 4.0, end: 7.0, class: 'active-cyan' },
            { text: 'ghìm lại từ từ ở mức 99%', start: 8.0, end: 11.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_loading_intro', 'slide_loading_error', 'slide_loading_milestones', 
        'slide_loading_uneven', 'slide_loading_graph_real', 'slide_loading_graph_display'
    ];

    function sceneWrap(inner) {
        return `<div class="v64-zoom-container"><div class="v64-scene-content">${inner}</div></div>`;
    }

    // Generate HTML for 50 block grid
    function makeGridHTML(gridId) {
        let html = `<div class="v64-blocks-grid" id="${gridId}">`;
        for (let i = 0; i < 50; i++) {
            html += `<div class="v64-grid-block"></div>`;
        }
        html += `</div>`;
        return html;
    }

    // Generate HTML for 15 small blocks of hardware queues
    function makeQueueBlocksHTML(count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `<div class="v64-small-square"></div>`;
        }
        return html;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: Install Window Intro
        if (slideId === 'slide_loading_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row">
                    <div class="v64-os-window" id="v64-installer-win">
                        <div class="v64-os-header">
                            <div class="v64-mac-dots">
                                <span class="v64-mac-dot close"></span>
                                <span class="v64-mac-dot minimize"></span>
                                <span class="v64-mac-dot maximize"></span>
                            </div>
                            <span class="v64-window-title">Setup.exe - System Installer</span>
                        </div>
                        <div class="v64-os-body">
                            <div class="v64-installer-title" id="v64-install-title">Đang cài đặt hệ thống...</div>
                            
                            <!-- File allocation blocks grid simulation -->
                            ${makeGridHTML('v64-grid-intro')}

                            <div class="v64-progress-wrapper">
                                <div class="v64-progress-info">
                                    <span class="v64-status-text" id="v64-install-status">Đang chuẩn bị...</span>
                                    <span class="v64-percent-text" id="v64-install-percent">0%</span>
                                </div>
                                <div class="v64-progress-bar-bg">
                                    <div class="v64-progress-bar-fill" id="v64-install-bar-fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        
        // Slide 2: Stuck Warning & Popup Stack (No shake)
        else if (slideId === 'slide_loading_error') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row" style="position:relative;">
                    <div class="v64-os-window stuck" id="v64-installer-win-err">
                        <div class="v64-os-header">
                            <div class="v64-mac-dots">
                                <span class="v64-mac-dot close"></span>
                                <span class="v64-mac-dot minimize"></span>
                                <span class="v64-mac-dot maximize"></span>
                            </div>
                            <span class="v64-window-title">Setup.exe - System Installer</span>
                        </div>
                        <div class="v64-os-body">
                            <div class="v64-installer-title" style="color: var(--v64-orange);">Cài đặt không phản hồi...</div>
                            
                            <!-- File blocks grid stuck at last square -->
                            ${makeGridHTML('v64-grid-error')}

                            <div class="v64-progress-wrapper">
                                <div class="v64-progress-info">
                                    <span class="v64-status-text">Đang đăng ký khóa Registry (Kẹt ở 99%)...</span>
                                    <span class="v64-percent-text" style="color:var(--v64-orange);">99%</span>
                                </div>
                                <div class="v64-progress-bar-bg" style="border-color: rgba(255,170,68,0.3);">
                                    <div class="v64-progress-bar-fill" style="width: 99%; background: linear-gradient(90deg, #f59e0b, #fbbf24); box-shadow: 0 0 15px var(--v64-orange-glow);"></div>
                                </div>
                            </div>

                            <div class="v64-warning-toast show" id="v64-install-toast">
                                <i data-lucide="alert-triangle" style="flex-shrink:0;"></i>
                                <span>Error 0x4B3F: File operations are unresponsive.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Multiple Error Popups container -->
                    <div class="v64-error-dialog-container">
                        <!-- Dialog 1 -->
                        <div class="v64-error-dialog" id="v64-err-dialog-1">
                            <div class="v64-err-hdr">
                                <span class="v64-err-title">System Error</span>
                                <span style="color: rgba(255,255,255,0.4); font-size:10px; cursor:pointer;">❌</span>
                            </div>
                            <div class="v64-err-body">
                                <div class="v64-err-msg-row">
                                    <i data-lucide="alert-octagon"></i>
                                    <span class="v64-err-msg">Setup.exe has stopped responding. Windows is checking for a solution...</span>
                                </div>
                                <div class="v64-err-btn-row">
                                    <button class="v64-err-btn">Wait</button>
                                    <button class="v64-err-btn primary">Close</button>
                                </div>
                            </div>
                        </div>

                        <!-- Dialog 2 -->
                        <div class="v64-error-dialog" id="v64-err-dialog-2">
                            <div class="v64-err-hdr">
                                <span class="v64-err-title">Registry Timeout</span>
                                <span style="color: rgba(255,255,255,0.4); font-size:10px; cursor:pointer;">❌</span>
                            </div>
                            <div class="v64-err-body">
                                <div class="v64-err-msg-row">
                                    <i data-lucide="x-circle"></i>
                                    <span class="v64-err-msg">Write permission timeout on path: HKLM\\Software\\Classes\\TypeLib\\...</span>
                                </div>
                                <div class="v64-err-btn-row">
                                    <button class="v64-err-btn primary">Abort</button>
                                    <button class="v64-err-btn">Retry</button>
                                </div>
                            </div>
                        </div>

                        <!-- Dialog 3 -->
                        <div class="v64-error-dialog" id="v64-err-dialog-3">
                            <div class="v64-err-hdr">
                                <span class="v64-err-title">Setup.exe - Memory Crash</span>
                                <span style="color: rgba(255,255,255,0.4); font-size:10px; cursor:pointer;">❌</span>
                            </div>
                            <div class="v64-err-body">
                                <div class="v64-err-msg-row">
                                    <i data-lucide="shield-alert"></i>
                                    <span class="v64-err-msg">The instruction at 0x000F4B3F referenced memory. Memory could not be written.</span>
                                </div>
                                <div class="v64-err-btn-row">
                                    <button class="v64-err-btn primary">Terminate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 3: PC Internals Architecture Flow Diagram
        else if (slideId === 'slide_loading_milestones') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row">
                    <div class="v64-arch-canvas">
                        <div class="v64-arch-title">Lược đồ Máy tính & Tốc độ Xử lý</div>
                        
                        <div style="position:relative; width:100%; height:200px;">
                            <svg class="v64-svg-overlay" width="100%" height="100%">
                                <!-- Link Cloud -> CPU -->
                                <path id="v64-pc-link-1" d="M 136 100 L 196 100" class="v64-link-line" />
                                <!-- Link CPU -> Disk -->
                                <path id="v64-pc-link-2" d="M 302 100 L 362 100" class="v64-link-line" />
                            </svg>

                            <div class="v64-pc-case">
                                <!-- Node 1: Cloud Network -->
                                <div class="v64-pc-component" id="v64-comp-net">
                                    <i data-lucide="globe"></i>
                                    <span class="v64-pc-component-title">INTERNET<br>(Cloud Server)</span>
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);" id="v64-comp-net-speed">150 Mbps</span>
                                </div>

                                <!-- Node 2: CPU Processing -->
                                <div class="v64-pc-component" id="v64-comp-cpu">
                                    <i data-lucide="cpu"></i>
                                    <span class="v64-pc-component-title">CPU & RAM<br>(Xử lý gói tin)</span>
                                    <span style="font-size:9px; font-family:monospace; color:rgba(255,255,255,0.4);" id="v64-comp-cpu-load">Load: 0%</span>
                                </div>

                                <!-- Node 3: Hard Disk Write -->
                                <div class="v64-pc-component" id="v64-comp-disk">
                                    <i data-lucide="database"></i>
                                    <span class="v64-pc-component-title">Ổ CỨNG SSD<br>(Lưu trữ tệp)</span>
                                    
                                    <!-- Mini 2x2 grid blocks inside Disk to represent written files -->
                                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top:2px;">
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                        <div class="v64-small-square" style="width:7px; height:7px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="v64-arch-footer">
                            <span class="v64-arch-step-desc" id="v64-arch-desc">Khởi tạo phần cứng...</span>
                            <span class="v64-arch-step-pct" id="v64-arch-pct">Tiến trình: 0%</span>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Asymmetric Queues (PC Hardware Monitor - replacing old Cards)
        else if (slideId === 'slide_loading_uneven') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row">
                    <div class="v64-monitor-container">
                        <!-- Queue 1: Network Card -->
                        <div class="v64-monitor-section" id="v64-mon-1">
                            <div class="v64-monitor-hdr">
                                <span class="v64-monitor-title"><i data-lucide="download-cloud"></i> 1. Card Mạng (Tải file 15MB)</span>
                                <span class="v64-monitor-status" id="v64-mon-1-status">Đang chờ...</span>
                            </div>
                            <div class="v64-monitor-grid-row" id="v64-mon-1-grid">
                                ${makeQueueBlocksHTML(15)}
                            </div>
                        </div>

                        <!-- Queue 2: CPU Unzipper -->
                        <div class="v64-monitor-section" id="v64-mon-2">
                            <div class="v64-monitor-hdr">
                                <span class="v64-monitor-title"><i data-lucide="archive"></i> 2. Chip CPU (Giải nén 950MB)</span>
                                <span class="v64-monitor-status" id="v64-mon-2-status">Đang chờ...</span>
                            </div>
                            <div class="v64-monitor-grid-row" id="v64-mon-2-grid">
                                ${makeQueueBlocksHTML(15)}
                            </div>
                        </div>

                        <!-- Queue 3: Disk registry writer -->
                        <div class="v64-monitor-section" id="v64-mon-3">
                            <div class="v64-monitor-hdr">
                                <span class="v64-monitor-title"><i data-lucide="database"></i> 3. Ổ cứng SSD (Ghi 10,000+ Registry)</span>
                                <span class="v64-monitor-status" id="v64-mon-3-status">Đang chờ...</span>
                            </div>
                            <div class="v64-monitor-grid-row" id="v64-mon-3-grid">
                                ${makeQueueBlocksHTML(15)}
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 5: Graph Real (Actual speed - Task Manager style)
        else if (slideId === 'slide_loading_graph_real') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row" style="position:relative;">
                    <div class="v64-chart-card">
                        <div class="v64-chart-title">
                            <span>Hiệu năng CPU: Tốc độ Thực tế</span>
                            <span style="font-size:11px; font-family:monospace; color:rgba(255,94,94,0.7);" id="v64-lbl-real-util">Sử dụng: 0%</span>
                        </div>
                        
                        <div class="v64-taskmgr-grid-bg">
                            <div class="v64-taskmgr-grid"></div>
                            
                            <svg width="100%" height="100%" style="overflow:visible;" id="v64-svg-chart-real">
                                <!-- Guide lines -->
                                <line x1="0" y1="18" x2="480" y2="18" stroke="rgba(255,94,94,0.15)" stroke-dasharray="4" />
                                
                                <!-- Curve: Tốc độ thật -->
                                <path id="v64-path-real" d="M 0 170 L 180 170 L 330 170 C 370 170, 430 170, 480 10" fill="none" stroke="var(--v64-orange)" stroke-width="3" />
                                
                                <!-- Animated cursor dot -->
                                <circle id="v64-cursor-real" r="6" fill="var(--v64-orange)" filter="drop-shadow(0 0 5px var(--v64-orange-glow))" cx="0" cy="170" />
                            </svg>

                            <!-- Tooltip label cursor -->
                            <div class="v64-chart-cursor-label red" id="v64-lbl-real" style="opacity:0;">Thực tế: 0%</div>

                            <div class="v64-chart-label-x" style="left: 8px;">60 giây trước</div>
                            <div class="v64-chart-label-x" style="right: 8px;">Hiện tại</div>
                            <div class="v64-chart-label-y" style="top: 15px; color: var(--v64-orange);">99% kẹt</div>
                            <div class="v64-chart-label-y" style="bottom: 5px;">0%</div>
                        </div>

                        <div class="v64-chart-legend">
                            <div class="v64-legend-item">
                                <div class="v64-legend-color red"></div>
                                <span>Tốc độ Ghi tệp thực tế (Nghẽn cực nặng ở Registry)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: Graph Display (Comparison - Task Manager style)
        else if (slideId === 'slide_loading_graph_display') {
            canvas.innerHTML = sceneWrap(`
                <div class="v64-scene-row" style="position:relative;">
                    <div class="v64-chart-card">
                        <div class="v64-chart-title">
                            <span>Hiệu năng CPU: Tốc độ Hiển thị</span>
                            <span style="font-size:11px; font-family:monospace; color:var(--v64-primary);" id="v64-lbl-disp-util">Sử dụng: 0%</span>
                        </div>
                        
                        <div class="v64-taskmgr-grid-bg">
                            <div class="v64-taskmgr-grid"></div>
                            
                            <svg width="100%" height="100%" style="overflow:visible;" id="v64-svg-chart-comp">
                                <!-- Guide lines -->
                                <line x1="0" y1="18" x2="480" y2="18" stroke="rgba(255,94,94,0.1)" stroke-dasharray="4" />
                                
                                <!-- Curve 1: Tốc độ thật (dimmed) -->
                                <path id="v64-path-real-dim" d="M 0 170 L 180 170 L 330 170 C 370 170, 430 170, 480 10" fill="none" stroke="rgba(255, 170, 68, 0.25)" stroke-width="2" />
                                
                                <!-- Curve 2: Tốc độ hiển thị -->
                                <path id="v64-path-display" d="M 0 170 C 70 70, 190 30, 336 18 L 480 10" fill="none" stroke="var(--v64-primary)" stroke-width="3" />
                                
                                <!-- Animated cursor dots -->
                                <circle id="v64-cursor-real-dim" r="4" fill="rgba(255, 170, 68, 0.4)" cx="0" cy="170" />
                                <circle id="v64-cursor-display" r="6" fill="var(--v64-primary)" filter="drop-shadow(0 0 5px var(--v64-primary-glow))" cx="0" cy="170" />
                            </svg>

                            <!-- Tooltip labels -->
                            <div class="v64-chart-cursor-label red" id="v64-lbl-real-dim" style="opacity:0; font-size: 8px; padding: 2px 4px;">Thực tế: 0%</div>
                            <div class="v64-chart-cursor-label cyan" id="v64-lbl-display" style="opacity:0;">Hiển thị: 0%</div>

                            <div class="v64-chart-label-x" style="left: 8px;">60 giây trước</div>
                            <div class="v64-chart-label-x" style="right: 8px;">Hiện tại</div>
                            <div class="v64-chart-label-y" style="top: 15px; color: var(--v64-primary);">99% giữ chân</div>
                            <div class="v64-chart-label-y" style="bottom: 5px;">0%</div>
                        </div>

                        <div class="v64-chart-legend">
                            <div class="v64-legend-item">
                                <div class="v64-legend-color red" style="background: rgba(255, 170, 68, 0.35); box-shadow:none;"></div>
                                <span style="color: rgba(255,255,255,0.45);">Tốc độ Ghi thật</span>
                            </div>
                            <div class="v64-legend-item">
                                <div class="v64-legend-color cyan"></div>
                                <span>Tiến trình UX Easing giả lập</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Initialize Lucide Icons for rendered content
        if (window.lucide) {
            window.lucide.createIcons({
                attrs: { class: 'lucide-icon' },
                nameAttr: 'data-sim-icon'
            });
            window.lucide.createIcons();
        }
    }

    // Helper to light up squares in a grid block
    function animateGridBlocks(gridEl, countFilled, isStuck) {
        if (!gridEl) return;
        const blocks = gridEl.querySelectorAll('.v64-grid-block');
        blocks.forEach((block, idx) => {
            if (idx < countFilled) {
                block.setAttribute('class', 'v64-grid-block filled');
            } else if (idx === countFilled && isStuck) {
                block.setAttribute('class', 'v64-grid-block stuck');
            } else {
                block.setAttribute('class', 'v64-grid-block');
            }
        });
    }

    // Helper to light up squares in small queues
    function animateQueueBlocks(queueEl, filledCount, stateClass) {
        if (!queueEl) return;
        const squares = queueEl.querySelectorAll('.v64-small-square');
        squares.forEach((sq, idx) => {
            if (idx < filledCount) {
                if (idx === filledCount - 1 && stateClass === 'stuck') {
                    sq.setAttribute('class', 'v64-small-square filled stuck');
                } else {
                    sq.setAttribute('class', 'v64-small-square filled');
                }
            } else {
                sq.setAttribute('class', 'v64-small-square');
            }
        });
    }

    // ── INTERACTIVE TIMELINE ANIMATOR ──────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying) {
        const row = canvas.querySelector('.v64-scene-row');
        if (!row) return;

        // Slide 1: Install Window Intro
        if (slideId === 'slide_loading_intro') {
            const win = row.querySelector('#v64-installer-win');
            const fill = row.querySelector('#v64-install-bar-fill');
            const percentText = row.querySelector('#v64-install-percent');
            const statusText = row.querySelector('#v64-install-status');
            const gridEl = row.querySelector('#v64-grid-intro');
            
            let currentPct = 0;
            if (progress <= 0.45) {
                currentPct = Math.floor((progress / 0.45) * 99);
                if (win) win.classList.remove('stuck');
                
                if (currentPct < 25) {
                    if (statusText) statusText.textContent = "Downloading package updates...";
                } else if (currentPct < 70) {
                    if (statusText) statusText.textContent = "Extracting archived system resources...";
                } else {
                    if (statusText) statusText.textContent = "Writing system configurations to folder...";
                }
                
                // Light up blocks grid
                const filledBlocksCount = Math.floor(currentPct / 100 * 50);
                animateGridBlocks(gridEl, filledBlocksCount, false);
            } else {
                currentPct = 99;
                if (win) win.classList.add('stuck');
                if (statusText) statusText.textContent = "Registering system registry keys (Stuck)...";
                
                // 49 blocks filled, 50th block blinking orange (stuck)
                animateGridBlocks(gridEl, 49, true);
            }

            if (fill) fill.style.width = `${currentPct}%`;
            if (percentText) percentText.textContent = `${currentPct}%`;
        }

        // Slide 2: Stuck Warning & Popup Stack (No shake)
        else if (slideId === 'slide_loading_error') {
            const d1 = row.querySelector('#v64-err-dialog-1');
            const d2 = row.querySelector('#v64-err-dialog-2');
            const d3 = row.querySelector('#v64-err-dialog-3');
            const gridEl = row.querySelector('#v64-grid-error');

            // Set grid blocks to be stuck
            animateGridBlocks(gridEl, 49, true);

            // Stagger popup entry times
            if (progress > 0.15) {
                if (d1) d1.classList.add('show');
            } else {
                if (d1) d1.classList.remove('show');
            }

            if (progress > 0.45) {
                if (d2) d2.classList.add('show');
            } else {
                if (d2) d2.classList.remove('show');
            }

            if (progress > 0.75) {
                if (d3) d3.classList.add('show');
            } else {
                if (d3) d3.classList.remove('show');
            }
        }

        // Slide 3: Flow Architecture Diagram (PC Case Components)
        else if (slideId === 'slide_loading_milestones') {
            const compNet = row.querySelector('#v64-comp-net');
            const compCpu = row.querySelector('#v64-comp-cpu');
            const compDisk = row.querySelector('#v64-comp-disk');

            const link1 = row.querySelector('#v64-pc-link-1');
            const link2 = row.querySelector('#v64-pc-link-2');

            const netSpeed = row.querySelector('#v64-comp-net-speed');
            const cpuLoad = row.querySelector('#v64-comp-cpu-load');
            const diskGridSquares = compDisk ? compDisk.querySelectorAll('.v64-small-square') : [];

            const archDesc = row.querySelector('#v64-arch-desc');
            const archPct = row.querySelector('#v64-arch-pct');

            // --- Phase 1: Network active (0.0 to 0.35 progress) ---
            if (progress < 0.35) {
                if (compNet) compNet.className = "v64-pc-component active";
                if (compCpu) compCpu.className = "v64-pc-component";
                if (compDisk) compDisk.className = "v64-pc-component";

                if (link1) link1.setAttribute('class', "v64-link-line active");
                if (link2) link2.setAttribute('class', "v64-link-line");

                if (netSpeed) netSpeed.textContent = "150 Mbps";
                if (cpuLoad) cpuLoad.textContent = "Load: 5%";
                
                // Clear Disk mini blocks
                diskGridSquares.forEach(sq => sq.setAttribute('class', 'v64-small-square'));

                const pct = Math.round(progress / 0.35 * 30);
                if (archDesc) archDesc.textContent = "Bước 1: Tải dữ liệu từ Internet (Card mạng active)...";
                if (archPct) archPct.textContent = `Tiến trình: ${pct}%`;
            }
            // --- Phase 2: CPU Processing (0.35 to 0.7 progress) ---
            else if (progress >= 0.35 && progress < 0.7) {
                if (compNet) compNet.className = "v64-pc-component success";
                if (compCpu) compCpu.className = "v64-pc-component active";
                if (compDisk) compDisk.className = "v64-pc-component";

                if (link1) link1.setAttribute('class', "v64-link-line");
                if (link2) link2.setAttribute('class', "v64-link-line active");

                if (netSpeed) netSpeed.textContent = "Idle";
                const load = 40 + Math.round((progress - 0.35) / 0.35 * 50);
                if (cpuLoad) cpuLoad.textContent = `Load: ${load}%`;

                // Fill half of the Disk mini blocks
                diskGridSquares.forEach((sq, idx) => {
                    if (idx < 4) sq.setAttribute('class', 'v64-small-square filled');
                    else sq.setAttribute('class', 'v64-small-square');
                });

                const pct = 30 + Math.round((progress - 0.35) / 0.35 * 60);
                if (archDesc) archDesc.textContent = "Bước 2: CPU giải nén tài nguyên (Băng thông bus active)...";
                if (archPct) archPct.textContent = `Tiến trình: ${pct}%`;
            }
            // --- Phase 3: Disk write Registry stuck (0.7 to 1.0 progress) ---
            else {
                if (compNet) compNet.className = "v64-pc-component success";
                if (compCpu) compCpu.className = "v64-pc-component success";
                if (compDisk) compDisk.className = "v64-pc-component active"; // stuck disk write

                if (link1) link1.setAttribute('class', "v64-link-line");
                if (link2) link2.setAttribute('class', "v64-link-line"); // stopped flow

                if (netSpeed) netSpeed.textContent = "Idle";
                if (cpuLoad) cpuLoad.textContent = "Load: 100% (High Wait)";

                // Fill almost all, but last block flashes
                diskGridSquares.forEach((sq, idx) => {
                    if (idx < 8) {
                        sq.setAttribute('class', 'v64-small-square filled');
                    } else {
                        sq.setAttribute('class', 'v64-small-square filled stuck');
                    }
                });

                if (archDesc) archDesc.textContent = "Bước 3: SSD ghi 10.000 file Registry (Quá tải & Kẹt write)...";
                if (archPct) archPct.textContent = "Tiến trình: 99% (Stuck)";
            }
        }

        // Slide 4: Milestone queues (Asymmetric queues replacing list cards)
        else if (slideId === 'slide_loading_uneven') {
            const mon1 = row.querySelector('#v64-mon-1');
            const mon2 = row.querySelector('#v64-mon-2');
            const mon3 = row.querySelector('#v64-mon-3');

            const s1 = row.querySelector('#v64-mon-1-status');
            const s2 = row.querySelector('#v64-mon-2-status');
            const s3 = row.querySelector('#v64-mon-3-status');

            const grid1 = row.querySelector('#v64-mon-1-grid');
            const grid2 = row.querySelector('#v64-mon-2-grid');
            const grid3 = row.querySelector('#v64-mon-3-grid');

            // --- Phase 1: Queue 1 network download ---
            if (progress < 0.25) {
                if (mon1) mon1.className = "v64-monitor-section active";
                if (mon2) mon2.className = "v64-monitor-section";
                if (mon3) mon3.className = "v64-monitor-section";

                const localP = progress / 0.25;
                if (s1) s1.textContent = `Tải xuống... ${(localP * 100).toFixed(0)}%`;
                if (s2) s2.textContent = "Đang chờ...";
                if (s3) s3.textContent = "Đang chờ...";

                // Animate network blocks
                const filled = Math.floor(localP * 15);
                animateQueueBlocks(grid1, filled, 'active');
                animateQueueBlocks(grid2, 0, '');
                animateQueueBlocks(grid3, 0, '');
            }
            // --- Phase 2: Queue 1 completed, Queue 2 CPU decompress ---
            else if (progress >= 0.25 && progress < 0.6) {
                if (mon1) mon1.className = "v64-monitor-section success";
                if (mon2) mon2.className = "v64-monitor-section active";
                if (mon3) mon3.className = "v64-monitor-section";

                if (s1) s1.textContent = "Đã hoàn tất (0.4s)";
                const localP = (progress - 0.25) / 0.35;
                if (s2) s2.textContent = `Đang giải nén... ${(localP * 100).toFixed(0)}%`;
                if (s3) s3.textContent = "Đang chờ...";

                animateQueueBlocks(grid1, 15, 'success');
                const filled = Math.floor(localP * 15);
                animateQueueBlocks(grid2, filled, 'active');
                animateQueueBlocks(grid3, 0, '');
            }
            // --- Phase 3: Queue 1 & 2 completed, Queue 3 SSD write stuck ---
            else {
                if (mon1) mon1.className = "v64-monitor-section success";
                if (mon2) mon2.className = "v64-monitor-section success";
                if (mon3) mon3.className = "v64-monitor-section danger"; // stuck warning

                if (s1) s1.textContent = "Đã hoàn tất (0.4s)";
                if (s2) s2.textContent = "Đã hoàn tất (1.8s)";
                
                const localP = (progress - 0.6) / 0.4;
                if (s3) s3.textContent = `Ghi Registry: 9,999/10,000 file (KẸT - Chờ ${((progress - 0.6) * 45).toFixed(1)}s)`;

                animateQueueBlocks(grid1, 15, 'success');
                animateQueueBlocks(grid2, 15, 'success');
                
                // 14 blocks filled, 15th block blinking (stuck)
                animateQueueBlocks(grid3, 15, 'stuck');
            }
        }

        // Slide 5: Graph Real (Actual speed - Task Manager style)
        else if (slideId === 'slide_loading_graph_real') {
            const pathReal = row.querySelector('#v64-path-real');
            const dotReal = row.querySelector('#v64-cursor-real');
            const lblReal = row.querySelector('#v64-lbl-real');
            const lblRealUtil = row.querySelector('#v64-lbl-real-util');

            if (pathReal && dotReal && lblReal) {
                try {
                    const totalLen = pathReal.getTotalLength();
                    const point = pathReal.getPointAtLength(progress * totalLen);
                    dotReal.setAttribute('cx', point.x);
                    dotReal.setAttribute('cy', point.y);
                    
                    // Update and position tooltip label next to dot
                    lblReal.style.opacity = "1";
                    lblReal.style.left = `${point.x + 12}px`;
                    lblReal.style.top = `${point.y - 12}px`;
                    
                    const currentPctVal = Math.round((1 - (point.y - 10) / 160) * 100);
                    lblReal.textContent = `Thực tế: ${Math.max(0, Math.min(100, currentPctVal))}%`;
                    if (lblRealUtil) lblRealUtil.textContent = `Sử dụng: ${Math.max(0, Math.min(100, currentPctVal))}%`;
                } catch (e) {
                    const x = progress * 432;
                    let y = 170;
                    if (progress > 0.75) {
                        y = 170 - ((progress - 0.75) / 0.25 * 160);
                    }
                    dotReal.setAttribute('cx', x);
                    dotReal.setAttribute('cy', y);
                }
            }
        }

        // Slide 6: Graph Display (Comparison - Task Manager style)
        else if (slideId === 'slide_loading_graph_display') {
            const pathReal = row.querySelector('#v64-path-real-dim');
            const pathDisplay = row.querySelector('#v64-path-display');
            
            const dotReal = row.querySelector('#v64-cursor-real-dim');
            const dotDisplay = row.querySelector('#v64-cursor-display');
            
            const lblReal = row.querySelector('#v64-lbl-real-dim');
            const lblDisplay = row.querySelector('#v64-lbl-display');
            const lblDispUtil = row.querySelector('#v64-lbl-disp-util');

            if (pathReal && dotReal && lblReal) {
                try {
                    const totalLen = pathReal.getTotalLength();
                    const point = pathReal.getPointAtLength(progress * totalLen);
                    dotReal.setAttribute('cx', point.x);
                    dotReal.setAttribute('cy', point.y);
                    
                    lblReal.style.opacity = "0.75";
                    lblReal.style.left = `${point.x - 72}px`;
                    lblReal.style.top = `${point.y - 22}px`;
                    const currentPctVal = Math.round((1 - (point.y - 10) / 160) * 100);
                    lblReal.textContent = `Thực tế: ${Math.max(0, Math.min(100, currentPctVal))}%`;
                } catch (e) {
                    const x = progress * 432;
                    let y = 170;
                    if (progress > 0.75) {
                        y = 170 - ((progress - 0.75) / 0.25 * 160);
                    }
                    dotReal.setAttribute('cx', x);
                    dotReal.setAttribute('cy', y);
                }
            }

            if (pathDisplay && dotDisplay && lblDisplay) {
                try {
                    const totalLen = pathDisplay.getTotalLength();
                    const point = pathDisplay.getPointAtLength(progress * totalLen);
                    dotDisplay.setAttribute('cx', point.x);
                    dotDisplay.setAttribute('cy', point.y);
                    
                    lblDisplay.style.opacity = "1";
                    lblDisplay.style.left = `${point.x + 12}px`;
                    lblDisplay.style.top = `${point.y - 14}px`;
                    
                    const currentPctVal = Math.round((1 - (point.y - 10) / 160) * 100);
                    lblDisplay.textContent = `Hiển thị: ${Math.max(0, Math.min(100, currentPctVal))}%`;
                    if (lblDispUtil) lblDispUtil.textContent = `Sử dụng: ${Math.max(0, Math.min(100, currentPctVal))}%`;
                } catch (e) {
                    const x = progress * 432;
                    const y = 170 - (Math.pow(progress, 0.45) * 160);
                    dotDisplay.setAttribute('cx', x);
                    dotDisplay.setAttribute('cy', y);
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video64',
        topic: 'Cú lừa Loading Bar - Tiến trình 99%',
        episodeNum: 64,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video64 Plugin] Loaded: Cú lừa Loading Bar (Updated with PC grids).');
})();
