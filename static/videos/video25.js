/**
 * Video 25: Git Status & Merkle Tree internals
 * Plugin file - chứa toàn bộ slide animation/HTML cho video25
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_git_1a: [], // First slide: no keywords as requested
        slide_git_1b: [], // Second slide: no keywords
        slide_git_2: [
            { text: 'quét tuần tự', start: 3.5, end: 12.0, class: 'active-bad' },
            { text: 'nghẽn ổ đĩa', start: 12.0, end: 25.0, class: 'active-bad' }
        ],
        slide_git_3: [
            { text: 'mã hóa sha-1', start: 4.0, end: 14.0, class: 'active-good' },
            { text: 'định danh duy nhất', start: 14.0, end: 25.5, class: 'active-gold' }
        ],
        slide_git_4: [
            { text: 'merkle tree', start: 4.0, end: 12.5, class: 'active-good' },
            { text: 'cây băm', start: 12.5, end: 19.0, class: 'active-good' },
            { text: 'lan truyền hash', start: 19.0, end: 26.0, class: 'active-gold' }
        ],
        slide_git_5: [
            { text: 'so khớp root hash', start: 4.5, end: 14.5, class: 'active-good' },
            { text: 'tối ưu o(1)', start: 14.5, end: 26.5, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_git_1a', 'slide_git_1b', 'slide_git_2', 'slide_git_3', 
        'slide_git_4', 'slide_git_5'
    ];

    function makeFilesListHTML() {
        const files = [
            'src/auth.py', 'src/main.py', 'src/db.py', 
            'tests/test_auth.py', 'tests/test_main.py', 
            'config.json', 'package.json', 'README.md'
        ];
        let html = `<div style="display:flex; flex-direction:column; gap:9px; position:relative; width:100%; box-sizing:border-box;">`;
        html += `<div class="v25-scanner-glow" style="position:absolute; left:0; top:0; width:100%; height:0px; background:linear-gradient(180deg, transparent, rgba(239, 68, 68, 0.08)); border-bottom:3px solid #ef4444; box-shadow:0 0 15px rgba(239,68,68,0.5); pointer-events:none; z-index:10; transition: height 0.05s ease-out;"></div>`;
        files.forEach((f, idx) => {
            html += `
                <div class="v25-file-item file-idx-${idx}">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="file-text" style="width:14px; height:14px;"></i>
                        <span>${f}</span>
                    </div>
                    <span style="font-size:10px; font-weight:bold;" class="file-status-lbl-${idx}">UNCHECKED</span>
                </div>
            `;
        });
        html += `</div>`;
        return html;
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_git_1a') {
            canvas.innerHTML = `
                <div class="v25-scene-wrapper">
                    <div class="v37-grid-bg purple-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(139,92,246,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                        <div class="v25-github-intro-container">
                            <div class="v25-github-glow-ring"></div>
                            <div class="v25-github-glow-ring inner"></div>
                            <div class="v25-giant-github-logo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" style="filter: invert(1) drop-shadow(0 0 25px rgba(139, 92, 246, 0.7));">
                            </div>
                        </div>
                        
                        <!-- Premium Badge and Label in Glass Card -->
                        <div class="glass-card v25-glow-purple" style="text-align: center; width: 440px; padding: 18px 24px; border-radius: 20px; border: 1.5px solid rgba(139, 92, 246, 0.4); background: rgba(13, 17, 28, 0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 15px;">
                            <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(139, 92, 246, 0.4); background: rgba(139, 92, 246, 0.1); color: #a78bfa; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                <i data-lucide="git-branch" style="width:14px;height:14px;"></i> Git Status Engine
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size: 16px; font-weight: bold; color: #a78bfa; line-height: 1.4;" id="v25-intro-label">
                                Làm sao Git phát hiện đổi code chỉ trong tích tắc?
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_git_1b') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <!-- Center workspace row -->
                    <div style="display:flex; gap:30px; justify-content:center; align-items:center; width:840px;">
                        
                        <!-- Left CLI Terminal Mockup -->
                        <div class="glass-card" style="width:420px; height:340px; border-radius:20px; border:2px solid rgba(255,255,255,0.12); background:#05070c; box-shadow:0 15px 35px rgba(0,0,0,0.6); display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden; position:relative; box-sizing:border-box;">
                            <!-- Top Header of Terminal -->
                            <div style="display:flex; justify-content:space-between; align-items:center; background:#111520; border-bottom:1px solid rgba(255,255,255,0.06); padding:8px 15px;">
                                <div style="display:flex; gap:6px;">
                                    <div style="width:10px; height:10px; border-radius:50%; background:#ef4444;"></div>
                                    <div style="width:10px; height:10px; border-radius:50%; background:#f59e0b;"></div>
                                    <div style="width:10px; height:10px; border-radius:50%; background:#10b981;"></div>
                                </div>
                                <span style="font-size:11px; font-weight:bold; color:#888; font-family:monospace;">bash - git status</span>
                            </div>
                            
                            <!-- Terminal Screen Output -->
                            <div style="flex:1; padding:15px; font-family:'Fira Code', monospace; font-size:12.5px; text-align:left; color:#10b981; line-height:1.6; overflow-y:auto;" class="s1-terminal-content">
                                <span style="color:#888;">$ </span><span style="color:#fff;" class="s1-terminal-input"></span>
                            </div>
                        </div>

                        <!-- Right Stats Box -->
                        <div class="glass-card" style="width:340px; padding:24px; border-radius:20px; border:1px solid rgba(255,255,255,0.1); background:#0f1118; display:flex; flex-direction:column; gap:18px; text-align:left; box-sizing:border-box;">
                            <div style="font-size:11px; font-weight:bold; color:#8b5cf6; font-family:monospace; letter-spacing:1px; text-transform:uppercase;">GIT REPOSITORY</div>
                            <div style="font-size:24px; font-weight:bold; color:#fff; font-family:sans-serif; margin-bottom:2px;">Git Status Engine</div>
                            
                            <!-- Root hash card -->
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:16px; border-radius:12px; display:flex; flex-direction:column; gap:6px;">
                                <span style="font-size:11px; color:#aaa; font-family:sans-serif; font-weight:bold; letter-spacing:0.5px;">PROJECT ROOT HASH</span>
                                <div style="font-size:32px; font-weight:800; color:#f59e0b; font-family:monospace; text-shadow:0 0 10px rgba(245,158,11,0.25);">e7d2b8a1c9...</div>
                            </div>
                            
                            <div style="font-size:12.5px; color:#aaa; font-family:sans-serif; line-height:1.45;">
                                Khám phá cách Git theo dõi hàng ngàn tập tin và trả lời câu hỏi "Có gì thay đổi?" trong vài mili-giây.
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_git_2') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px; display:flex; gap:30px;">
                        
                        <!-- Left list of files to check -->
                        <div class="glass-card" style="width:380px; height:410px; border-radius:24px; border:2px solid rgba(255,255,255,0.12); background:#0a0c10; box-shadow:0 15px 35px rgba(0,0,0,0.5); display:flex; flex-direction:column; overflow:hidden; position:relative; padding:15px; box-sizing:border-box; z-index:3;">
                            <div style="font-size:13px; font-weight:bold; color:#fff; font-family:sans-serif; text-transform:uppercase; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px; text-align:left;">
                                📁 Thư mục dự án (10,000 files)
                            </div>
                            <!-- Files box -->
                            <div style="flex:1; overflow:hidden; position:relative;" class="s2-files-wrapper">
                                ${makeFilesListHTML()}
                            </div>
                        </div>

                        <!-- Right Stats & Log Dashboard -->
                        <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
                            
                            <!-- CPU & Disk load metrics -->
                            <div class="glass-card" style="padding:20px; border-radius:20px; border:1.5px solid rgba(255,255,255,0.08); background:rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:12px; font-family:monospace; font-size:13px; text-align:left; box-sizing:border-box;">
                                <div style="font-weight:bold; color:#ef4444; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; font-size:13px;">CPU & DISK SCANNING OVERHEAD</div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span>DISK READ SPEED:</span>
                                    <span style="color:#ef4444; font-weight:bold; font-size:16px;" class="s2-lbl-disk">0 MB/s</span>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:4px; margin-top:2px;">
                                    <div style="display:flex; justify-content:space-between;">
                                        <span>CPU CORE LOAD:</span>
                                        <span style="color:#ef4444; font-weight:bold;" class="s2-lbl-cpu">10%</span>
                                    </div>
                                    <!-- CPU Progress bar -->
                                    <div style="width:100%; height:12px; background:rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
                                        <div class="s2-cpu-bar" style="width:10%; height:100%; background:linear-gradient(90deg, #f59e0b, #ef4444); transition:width 0.2s;"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Live Scan Console Logs -->
                            <div class="glass-card" style="flex:1; padding:15px; border-radius:20px; border:1px solid rgba(255,255,255,0.06); background:#05070b; display:flex; flex-direction:column; justify-content:flex-start; text-align:left; box-sizing:border-box; overflow:hidden;">
                                <div style="font-family:monospace; font-size:11px; color:#888; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px; font-weight:bold;">
                                    SYSTEM SCANNER PROCESS OUTPUT
                                </div>
                                <div class="s2-console-log" style="flex:1; font-family:'Fira Code', monospace; font-size:11px; color:#aaa; line-height:1.5; overflow-y:hidden;">
                                    <!-- Log lines will append here -->
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_git_3') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px; display:flex; align-items:center; justify-content:space-between; box-sizing:border-box; padding:10px 0;">
                        
                        <!-- Left Code Editor -->
                        <div class="glass-card" style="width:340px; height:360px; border-radius:20px; border:2px solid rgba(255,255,255,0.12); background:#07090e; display:flex; flex-direction:column; overflow:hidden; position:relative; padding:15px; box-sizing:border-box;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px; margin-bottom:10px;">
                                <span style="font-family:monospace; font-size:12px; color:#8b5cf6; font-weight:bold;">📝 main.py</span>
                                <span style="font-size:10px; color:#666; font-family:monospace;">UTF-8</span>
                            </div>
                            
                            <div class="s3-code-display" style="flex:1; font-family:'Fira Code', monospace; font-size:14px; text-align:left; color:#ccc; line-height:1.7; white-space:pre;">def process_data(data):
    result = []
    for item in data:
        # filter
        result.append(item * 2)
    return result</div>
                        </div>

                        <!-- Connecting SVG lines -->
                        <svg style="position:absolute; left:340px; top:0; width:160px; height:410px; pointer-events:none; z-index:1;" class="s3-flow-svg">
                            <path d="M 0 205 L 80 205" stroke="rgba(139, 92, 246, 0.2)" stroke-width="2" class="v25-flow-path" fill="none"></path>
                            <path d="M 80 205 L 160 205" stroke="rgba(139, 92, 246, 0.2)" stroke-width="2" class="v25-flow-path" fill="none"></path>
                            <g class="s3-svg-packets"></g>
                        </svg>

                        <!-- Middle SHA-1 Machine -->
                        <div style="z-index:2; position:relative; margin-left:10px; margin-right:10px;">
                            <div class="v25-hash-machine active">
                                <i data-lucide="settings" style="width:48px; height:48px;" class="v25-hash-gear"></i>
                            </div>
                            <div style="font-family:monospace; font-size:11px; color:#8b5cf6; font-weight:bold; margin-top:8px;">SHA-1 ENGINE</div>
                        </div>

                        <!-- Right Output Card -->
                        <div class="glass-card" style="width:300px; height:360px; border-radius:20px; border:1px solid rgba(255,255,255,0.08); background:#0c0f18; display:flex; flex-direction:column; justify-content:space-between; padding:20px; box-sizing:border-box; text-align:left;">
                            <div style="font-size:11px; font-weight:bold; color:#8b5cf6; font-family:monospace; letter-spacing:1px; text-transform:uppercase;">SHA-1 HASH OUTPUT</div>
                            
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:8px;">
                                <span style="font-size:12px; color:#888; font-family:sans-serif; font-weight:bold;">MÃ BĂM 40 KÝ TỰ:</span>
                                <div class="s3-hash-box" style="font-family:'Fira Code', monospace; font-size:16px; color:#10b981; font-weight:bold; word-break:break-all; background:rgba(16,185,129,0.05); padding:15px; border-radius:10px; border:1.5px solid rgba(16,185,129,0.25); box-shadow:0 0 15px rgba(16,185,129,0.1); line-height:1.4;">
                                    e7d2b8a1c9e2b10a4b3c8d7e9f0a1b2c3d4e5f6a
                                </div>
                            </div>

                            <div style="font-size:11px; color:#888; font-family:sans-serif; line-height:1.4;">
                                Chỉ một thay đổi nhỏ của mã nguồn sẽ lập tức làm biến đổi hoàn toàn mã hash đầu ra.
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_git_4') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <div style="position:relative; width:840px; height:410px;">
                        
                        <!-- SVG Tree Connection Lines -->
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="s4-tree-svg">
                            <!-- Root -> Folder src -->
                            <path d="M 420 65 L 260 195" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" fill="none" class="p-root-src"></path>
                            <!-- Root -> Folder tests -->
                            <path d="M 420 65 L 580 195" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" fill="none" class="p-root-tests"></path>
                            
                            <!-- Folder src -> auth.py -->
                            <path d="M 260 195 L 160 325" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p-src-auth"></path>
                            <!-- Folder src -> main.py -->
                            <path d="M 260 195 L 360 325" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p-src-main"></path>
                            
                            <!-- Folder tests -> test_auth.py -->
                            <path d="M 580 195 L 480 325" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p-tests-auth"></path>
                            <!-- Folder tests -> test_main.py -->
                            <path d="M 580 195 L 680 325" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p-tests-main"></path>
                        </svg>

                        <!-- Level 1: Root Node (Top) -->
                        <div class="v25-tree-node node-root" style="position:absolute; left:372px; top:10px;">
                            <span class="node-label">ROOT</span>
                            <span class="node-hash color-root-hash">e7d2b8</span>
                        </div>

                        <!-- Level 2: Folder Nodes -->
                        <!-- Folder src/ -->
                        <div class="v25-tree-node node-folder-src" style="position:absolute; left:212px; top:140px; border-color:rgba(139,92,246,0.3);">
                            <span class="node-label" style="color:#8b5cf6;">📁 src/</span>
                            <span class="node-hash color-src-hash" style="border-color:rgba(139,92,246,0.25);">f3a2b1</span>
                        </div>
                        <!-- Folder tests/ -->
                        <div class="v25-tree-node node-folder-tests" style="position:absolute; left:532px; top:140px; border-color:rgba(139,92,246,0.3);">
                            <span class="node-label" style="color:#8b5cf6;">📁 tests/</span>
                            <span class="node-hash color-tests-hash" style="border-color:rgba(139,92,246,0.25);">9c8d7e</span>
                        </div>

                        <!-- Level 3: File Nodes (Bottom) -->
                        <!-- auth.py -->
                        <div class="v25-tree-node node-file-auth" style="position:absolute; left:112px; top:270px; width:96px; height:96px;">
                            <span class="node-label">auth.py</span>
                            <span class="node-hash">6b2a8d</span>
                        </div>
                        <!-- main.py -->
                        <div class="v25-tree-node node-file-main" style="position:absolute; left:312px; top:270px; width:96px; height:96px;">
                            <span class="node-label">main.py</span>
                            <span class="node-hash color-main-hash">5c1d4e</span>
                            <div class="main-pulse-dot"></div>
                        </div>
                        
                        <!-- test_auth.py -->
                        <div class="v25-tree-node node-file-test-auth" style="position:absolute; left:432px; top:270px; width:96px; height:96px;">
                            <span class="node-label">t_auth.py</span>
                            <span class="node-hash">a2f190</span>
                        </div>
                        <!-- test_main.py -->
                        <div class="v25-tree-node node-file-test-main" style="position:absolute; left:632px; top:270px; width:96px; height:96px;">
                            <span class="node-label">t_main.py</span>
                            <span class="node-hash">c4e5b6</span>
                        </div>

                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_git_5') {
            canvas.innerHTML = `
                <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:20px; zoom:1.0;">
                    
                    <!-- Top Half: Root Hash Compare Panel -->
                    <div class="glass-card" style="width:840px; padding:15px; border-radius:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.01); display:flex; justify-content:space-around; align-items:center; box-sizing:border-box;">
                        
                        <!-- Commit Root Hash -->
                        <div style="display:flex; flex-direction:column; gap:4px; text-align:left;">
                            <span style="font-size:10px; color:#aaa; font-family:monospace;">PREVIOUS COMMIT ROOT</span>
                            <div style="font-family:'Fira Code', monospace; font-size:22px; color:#10b981; font-weight:bold; background:rgba(16,185,129,0.06); padding:8px 18px; border-radius:8px; border:1px solid rgba(16,185,129,0.2);">
                                e7d2b8
                            </div>
                        </div>

                        <!-- VS symbol -->
                        <div style="font-family:sans-serif; font-size:24px; font-weight:900; color:#8b5cf6;" class="s5-vs-symbol">VS</div>

                        <!-- Working Directory Root Hash -->
                        <div style="display:flex; flex-direction:column; gap:4px; text-align:left;">
                            <span style="font-size:10px; color:#aaa; font-family:monospace;">WORKING TREE ROOT</span>
                            <div style="font-family:'Fira Code', monospace; font-size:22px; color:#ef4444; font-weight:bold; background:rgba(239,68,68,0.06); padding:8px 18px; border-radius:8px; border:1px solid rgba(239,68,68,0.2);" class="s5-work-hash">
                                3a9f02
                            </div>
                        </div>

                        <!-- Fast comparison result -->
                        <div class="glass-card s5-result-badge" style="padding:10px 18px; border-radius:10px; font-family:sans-serif; font-size:13px; font-weight:bold; transition:all 0.3s; border-color:#ef4444; background:rgba(239,68,68,0.12); color:#ef4444;">
                            MISMATCH DETECTED
                        </div>

                    </div>

                    <!-- Bottom Half: Compact Merkle Tree Showing Search path -->
                    <div style="position:relative; width:840px; height:260px; zoom: 0.9;">
                        <!-- SVG Tree Connection Lines -->
                        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;" class="s5-tree-svg">
                            <!-- Root -> Folder src -->
                            <path d="M 420 50 L 280 145" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" fill="none" class="p5-root-src"></path>
                            <!-- Root -> Folder tests -->
                            <path d="M 420 50 L 560 145" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" fill="none" class="p5-root-tests"></path>
                            
                            <!-- Folder src -> auth.py -->
                            <path d="M 280 145 L 200 240" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p5-src-auth"></path>
                            <!-- Folder src -> main.py -->
                            <path d="M 280 145 L 360 240" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" class="p5-src-main"></path>
                        </svg>

                        <!-- Level 1: Root Node (Top) -->
                        <div class="v25-tree-node node5-root" style="position:absolute; left:375px; top:5px; width:90px; height:90px;">
                            <span class="node-label">ROOT</span>
                            <span class="node-hash c5-root-hash" style="color:#ef4444;">3a9f02</span>
                        </div>

                        <!-- Level 2: Folders -->
                        <div class="v25-tree-node node5-folder-src" style="position:absolute; left:235px; top:100px; width:90px; height:90px; border-color:#ef4444; box-shadow:0 0 10px rgba(239,68,68,0.15);">
                            <span class="node-label" style="color:#8b5cf6;">📁 src/</span>
                            <span class="node-hash c5-src-hash" style="color:#ef4444;">8d9e2a</span>
                        </div>
                        <div class="v25-tree-node node5-folder-tests" style="position:absolute; left:515px; top:100px; width:90px; height:90px; border-color:#10b981; box-shadow:0 0 10px rgba(16,185,129,0.15);">
                            <span class="node-label" style="color:#8b5cf6;">📁 tests/</span>
                            <span class="node-hash" style="color:#10b981;">9c8d7e</span>
                            <div style="position:absolute; top:-6px; right:-6px; background:#10b981; color:#000; width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; box-shadow:0 0 8px #10b981;" class="skip-badge"><i data-lucide="check" style="width:12px; height:12px;"></i></div>
                        </div>

                        <!-- Level 3: Files under src/ -->
                        <div class="v25-tree-node node5-file-auth" style="position:absolute; left:155px; top:195px; width:90px; height:90px; border-color:#10b981;">
                            <span class="node-label">auth.py</span>
                            <span class="node-hash" style="color:#10b981;">6b2a8d</span>
                            <div style="position:absolute; top:-6px; right:-6px; background:#10b981; color:#000; width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; box-shadow:0 0 8px #10b981;" class="skip-badge"><i data-lucide="check" style="width:12px; height:12px;"></i></div>
                        </div>
                        <div class="v25-tree-node node5-file-main" style="position:absolute; left:315px; top:195px; width:90px; height:90px; border-color:#ef4444; box-shadow:0 0 12px rgba(239,68,68,0.3);">
                            <span class="node-label">main.py</span>
                            <span class="node-hash" style="color:#ef4444;">1a2b3c</span>
                            <div class="v25-git-pulse-dot"></div>
                        </div>

                    </div>
                </div>
            `;
        }        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_git_1a') {
            // CSS handles rotating/floating
        }
        else if (slideId === 'slide_git_1b') {
            const terminalInput = canvas.querySelector('.s1-terminal-input');
            const terminalContent = canvas.querySelector('.s1-terminal-content');
            
            if (terminalInput && terminalContent) {
                const command = 'git status';
                // Typewriter effect up to progress 0.45
                if (progress <= 0.45) {
                    const charCount = Math.floor((progress / 0.45) * command.length);
                    terminalInput.textContent = command.substring(0, charCount);
                    // Clear older status output if playing backwards
                    const existingResult = terminalContent.querySelector('.s1-result');
                    if (existingResult) existingResult.remove();
                } else {
                    terminalInput.textContent = command;
                    // Append result output if not already done
                    let existingResult = terminalContent.querySelector('.s1-result');
                    if (!existingResult) {
                        existingResult = document.createElement('div');
                        existingResult.className = 's1-result';
                        existingResult.style.color = '#ccc';
                        existingResult.style.marginTop = '10px';
                        existingResult.style.lineHeight = '1.5';
                        existingResult.innerHTML = `
                            On branch main<br>
                            Your branch is up to date with 'origin/main'.<br><br>
                            nothing to commit, working tree clean
                        `;
                        terminalContent.appendChild(existingResult);
                    }
                }
            }
        }
        else if (slideId === 'slide_git_2') {
            const scanner = canvas.querySelector('.v25-scanner-glow');
            const cpuBar = canvas.querySelector('.s2-cpu-bar');
            const cpuLbl = canvas.querySelector('.s2-lbl-cpu');
            const diskLbl = canvas.querySelector('.s2-lbl-disk');
            const consoleLog = canvas.querySelector('.s2-console-log');
            const wrapper = canvas.querySelector('.s2-files-wrapper');

            const totalFiles = 8;
            if (scanner && wrapper) {
                const wrapperHeight = wrapper.clientHeight || 340;
                // Move laser beam down from 0 to wrapperHeight
                const y = progress * (wrapperHeight - 6);
                scanner.style.height = `${y}px`;

                // Highlight files based on scanner y position
                for (let i = 0; i < totalFiles; i++) {
                    const fileEl = canvas.querySelector(`.file-idx-${i}`);
                    const statusEl = canvas.querySelector(`.file-status-lbl-${i}`);
                    if (fileEl) {
                        const fileTop = fileEl.offsetTop;
                        const fileHeight = fileEl.clientHeight;
                        const isScanned = y >= fileTop;

                        if (isScanned) {
                            fileEl.classList.add('scanned');
                            if (statusEl) {
                                statusEl.textContent = 'OK';
                                statusEl.style.color = '#10b981';
                            }
                        } else {
                            fileEl.classList.remove('scanned');
                            if (statusEl) {
                                statusEl.textContent = 'UNCHECKED';
                                statusEl.style.color = '#888';
                            }
                        }
                    }
                }
            }

            // Animate performance metrics
            if (progress > 0.05) {
                // CPU load spikes to 95%-100%
                const cpuVal = Math.min(100, Math.floor(10 + progress * 110));
                if (cpuLbl) cpuLbl.textContent = `${cpuVal}%`;
                if (cpuBar) cpuBar.style.width = `${cpuVal}%`;
                
                // Disk speed spikes to 160MB/s
                const diskVal = Math.min(160, Math.floor(progress * 190));
                if (diskLbl) diskLbl.textContent = `${diskVal} MB/s`;
            } else {
                if (cpuLbl) cpuLbl.textContent = '10%';
                if (cpuBar) cpuBar.style.width = '10%';
                if (diskLbl) diskLbl.textContent = '0 MB/s';
            }

            // Append console logs dynamically based on progress
            if (consoleLog) {
                const logs = [
                    'Scanning /config.json... Comparing hash... OK',
                    'Scanning /package.json... Comparing hash... OK',
                    'Scanning /README.md... Comparing hash... OK',
                    'Scanning /src/auth.py... OK (0.2ms)',
                    'Scanning /src/db.py... OK (0.3ms)',
                    'Scanning /src/main.py... OK (0.4ms)',
                    'Scanning /tests/test_auth.py... OK (0.5ms)',
                    'Scanning /tests/test_main.py... OK (0.5ms)'
                ];
                const activeCount = Math.floor(progress * (logs.length + 2));
                let visibleLogs = logs.slice(0, activeCount);
                if (activeCount >= logs.length) {
                    visibleLogs.push('<span style="color:#ef4444; font-weight:bold;">⚠️ SCAN COMPLETED: 10,000 files in 4.8s. DB overhead high.</span>');
                }
                consoleLog.innerHTML = visibleLogs.join('<br>');
            }
        }
        else if (slideId === 'slide_git_3') {
            const codeDisplay = canvas.querySelector('.s3-code-display');
            const hashBox = canvas.querySelector('.s3-hash-box');
            const machine = canvas.querySelector('.v25-hash-machine');
            const gear = canvas.querySelector('.v25-hash-gear');
            const packetsGroup = canvas.querySelector('.s3-svg-packets');
            
            // Phase 1 (progress <= 0.35): Old unmodified file
            if (progress <= 0.35) {
                if (codeDisplay) {
                    codeDisplay.innerHTML = `def process_data(data):
    result = []
    for item in data:
        # filter
        result.append(item * 2)
    return result`;
                }
                if (hashBox) {
                    hashBox.textContent = 'e7d2b8a1c9e2b10a4b3c8d7e9f0a1b2c3d4e5f6a';
                    hashBox.style.color = '#10b981';
                    hashBox.style.borderColor = 'rgba(16, 185, 129, 0.25)';
                    hashBox.style.background = 'rgba(16, 185, 129, 0.05)';
                    hashBox.style.boxShadow = '0 0 15px rgba(16,185,129,0.1)';
                }
                if (gear) gear.style.animationDuration = '6s';
                if (machine) machine.classList.remove('active');
                if (packetsGroup) packetsGroup.innerHTML = '';
            }
            // Phase 2 (progress > 0.35): Change code and trigger new hash
            else {
                if (codeDisplay) {
                    // Highlight the newly added comment line in red/yellow
                    codeDisplay.innerHTML = `def process_data(data):
    result = []
    for item in data:
        <span class="active-bad" style="text-shadow:none; font-weight:bold;"># debug comment added</span>
        result.append(item * 2)
    return result`;
                }
                if (hashBox) {
                    hashBox.textContent = '3a9f02c5b1d8e7a6c5b4d3e2f1a0b9c8d7e6f5a4';
                    hashBox.style.color = '#f59e0b'; // Yellow gold alert
                    hashBox.style.borderColor = 'rgba(245, 158, 11, 0.35)';
                    hashBox.style.background = 'rgba(245, 158, 11, 0.08)';
                    hashBox.style.boxShadow = '0 0 20px rgba(245,158,11,0.2)';
                }
                if (gear) gear.style.animationDuration = '1.5s'; // Spin gear faster during hashing
                if (machine) machine.classList.add('active');

                if (packetsGroup) {
                    const t = (progress - 0.35) / 0.65;
                    // Two consecutive packets in flow
                    const flows = [t, t + 0.5];
                    let pktsHTML = '';
                    flows.forEach(flowVal => {
                        const pos = (flowVal * 2) % 2.0; // scale to 0..2
                        const x = (pos / 2.0) * 160;
                        if (x >= 0 && x <= 160) {
                            pktsHTML += `<circle cx="${x}" cy="205" r="5" fill="#f59e0b" filter="drop-shadow(0 0 8px #f59e0b)"></circle>`;
                            if (x - 12 >= 0) {
                                pktsHTML += `<circle cx="${x - 12}" cy="205" r="3.5" fill="#f59e0b" opacity="0.6" filter="drop-shadow(0 0 5px #f59e0b)"></circle>`;
                            }
                            if (x - 24 >= 0) {
                                pktsHTML += `<circle cx="${x - 24}" cy="205" r="2.2" fill="#f59e0b" opacity="0.3" filter="drop-shadow(0 0 3px #f59e0b)"></circle>`;
                            }
                        }
                    });
                    packetsGroup.innerHTML = pktsHTML;
                }
            }
        }
        else if (slideId === 'slide_git_4') {
            const mainFile = canvas.querySelector('.node-file-main');
            const mainHash = canvas.querySelector('.color-main-hash');
            const srcFolder = canvas.querySelector('.node-folder-src');
            const srcHash = canvas.querySelector('.color-src-hash');
            const rootNode = canvas.querySelector('.node-root');
            const rootHash = canvas.querySelector('.color-root-hash');
            
            // Path SVGs
            const pathSrcMain = canvas.querySelector('.p-src-main');
            const pathRootSrc = canvas.querySelector('.p-root-src');

            const pulseDot = canvas.querySelector('.main-pulse-dot');

            // Default State
            if (progress <= 0.30) {
                if (mainFile) mainFile.className = 'v25-tree-node node-file-main';
                if (mainHash) { mainHash.textContent = '5c1d4e'; mainHash.style.color = '#fff'; }
                if (srcFolder) srcFolder.style.borderColor = 'rgba(139,92,246,0.3)';
                if (srcHash) { srcHash.textContent = 'f3a2b1'; srcHash.style.color = '#fff'; }
                if (rootNode) rootNode.style.borderColor = 'rgba(255,255,255,0.12)';
                if (rootHash) { rootHash.textContent = 'e7d2b8'; rootHash.style.color = '#fff'; }
                if (pathSrcMain) { pathSrcMain.setAttribute('stroke', 'rgba(255,255,255,0.08)'); pathSrcMain.classList.remove('v25-flow-path'); }
                if (pathRootSrc) { pathRootSrc.setAttribute('stroke', 'rgba(255,255,255,0.08)'); pathRootSrc.classList.remove('v25-flow-path'); }
                if (pulseDot) pulseDot.className = '';
            }
            // Phase 2 (0.30 -> 0.55): File main.py modifies
            else if (progress > 0.30 && progress <= 0.55) {
                if (mainFile) mainFile.className = 'v25-tree-node node-file-main v25-glow-red';
                if (mainHash) { mainHash.textContent = '1a2b3c'; mainHash.style.color = '#ef4444'; }
                if (pulseDot) pulseDot.className = 'v25-git-pulse-dot';
                
                // Keep others clean
                if (srcFolder) srcFolder.style.borderColor = 'rgba(139,92,246,0.3)';
                if (srcHash) { srcHash.textContent = 'f3a2b1'; srcHash.style.color = '#fff'; }
                if (rootNode) rootNode.style.borderColor = 'rgba(255,255,255,0.12)';
                if (rootHash) { rootHash.textContent = 'e7d2b8'; rootHash.style.color = '#fff'; }
                if (pathSrcMain) { pathSrcMain.setAttribute('stroke', 'rgba(239,68,68,0.4)'); pathSrcMain.classList.add('v25-flow-path'); }
                if (pathRootSrc) { pathRootSrc.setAttribute('stroke', 'rgba(255,255,255,0.08)'); pathRootSrc.classList.remove('v25-flow-path'); }
            }
            // Phase 3 (0.55 -> 0.80): Hash propagates to src folder
            else if (progress > 0.55 && progress <= 0.80) {
                if (mainFile) mainFile.className = 'v25-tree-node node-file-main v25-glow-red';
                if (mainHash) { mainHash.textContent = '1a2b3c'; mainHash.style.color = '#ef4444'; }
                if (srcFolder) srcFolder.style.borderColor = '#f59e0b';
                if (srcHash) { srcHash.textContent = '8d9e2a'; srcHash.style.color = '#f59e0b'; }
                if (pulseDot) pulseDot.className = 'v25-git-pulse-dot';
                
                if (rootNode) rootNode.style.borderColor = 'rgba(255,255,255,0.12)';
                if (rootHash) { rootHash.textContent = 'e7d2b8'; rootHash.style.color = '#fff'; }
                
                if (pathSrcMain) { pathSrcMain.setAttribute('stroke', 'rgba(239,68,68,0.6)'); pathSrcMain.classList.add('v25-flow-path'); }
                if (pathRootSrc) { pathRootSrc.setAttribute('stroke', 'rgba(245,158,11,0.4)'); pathRootSrc.classList.add('v25-flow-path'); }
            }
            // Phase 4 (progress > 0.80): Root node hash changes to red
            else {
                if (mainFile) mainFile.className = 'v25-tree-node node-file-main v25-glow-red';
                if (mainHash) { mainHash.textContent = '1a2b3c'; mainHash.style.color = '#ef4444'; }
                if (srcFolder) srcFolder.style.borderColor = '#ef4444';
                if (srcHash) { srcHash.textContent = '8d9e2a'; srcHash.style.color = '#ef4444'; }
                if (rootNode) rootNode.style.borderColor = '#ef4444';
                if (rootHash) { rootHash.textContent = '3a9f02'; rootHash.style.color = '#ef4444'; }
                if (pulseDot) pulseDot.className = 'v25-git-pulse-dot';

                if (pathSrcMain) { pathSrcMain.setAttribute('stroke', 'rgba(239,68,68,0.7)'); pathSrcMain.classList.add('v25-flow-path'); }
                if (pathRootSrc) { pathRootSrc.setAttribute('stroke', 'rgba(239,68,68,0.7)'); pathRootSrc.classList.add('v25-flow-path'); }
            }

            // Remove existing transient ripples
            const existingRipples = canvas.querySelectorAll('.v25-ripple-red, .v25-ripple-gold, .v25-ripple-purple');
            existingRipples.forEach(r => r.remove());

            // Add transient ripples on boundaries
            if (progress > 0.30 && progress < 0.40 && mainFile) {
                const r = document.createElement('div');
                r.className = 'v25-ripple-red';
                mainFile.appendChild(r);
            }
            if (progress > 0.55 && progress < 0.65 && srcFolder) {
                const r = document.createElement('div');
                r.className = 'v25-ripple-gold';
                srcFolder.appendChild(r);
            }
            if (progress > 0.80 && progress < 0.90 && rootNode) {
                const r = document.createElement('div');
                r.className = 'v25-ripple-red';
                rootNode.appendChild(r);
            }
        }
        else if (slideId === 'slide_git_5') {
            const rootNode = canvas.querySelector('.node5-root');
            const folderSrc = canvas.querySelector('.node5-folder-src');
            const folderTests = canvas.querySelector('.node5-folder-tests');
            const fileMain = canvas.querySelector('.node5-file-main');
            const fileAuth = canvas.querySelector('.node5-file-auth');
            
            const pRootSrc = canvas.querySelector('.p5-root-src');
            const pRootTests = canvas.querySelector('.p5-root-tests');
            const pSrcAuth = canvas.querySelector('.p5-src-auth');
            const pSrcMain = canvas.querySelector('.p5-src-main');

            // Default
            if (progress <= 0.2) {
                if (rootNode) rootNode.className = 'v25-tree-node node5-root';
                if (folderSrc) folderSrc.className = 'v25-tree-node node5-folder-src';
                if (folderTests) folderTests.className = 'v25-tree-node node5-folder-tests';
                if (fileMain) fileMain.className = 'v25-tree-node node5-file-main';
                
                if (pRootSrc) pRootSrc.setAttribute('stroke', 'rgba(255,255,255,0.08)');
                if (pRootTests) pRootTests.setAttribute('stroke', 'rgba(255,255,255,0.08)');
                if (pSrcMain) pSrcMain.setAttribute('stroke', 'rgba(255,255,255,0.08)');
            }
            // Phase 1 (0.2 -> 0.5): Git compares Root node (turns on glow)
            else if (progress > 0.2 && progress <= 0.5) {
                if (rootNode) rootNode.className = 'v25-tree-node node5-root v25-glow-purple';
                if (pRootSrc) pRootSrc.setAttribute('stroke', 'rgba(139,92,246,0.3)');
                if (pRootTests) pRootTests.setAttribute('stroke', 'rgba(139,92,246,0.3)');
            }
            // Phase 2 (0.5 -> 0.8): Git checks folders
            // src mismatch (needs traversal) -> turns red.
            // tests matches -> skips traversal, turns green skip-badge visible
            else if (progress > 0.5 && progress <= 0.8) {
                if (rootNode) rootNode.className = 'v25-tree-node node5-root v25-glow-red';
                if (folderSrc) folderSrc.className = 'v25-tree-node node5-folder-src v25-glow-red';
                if (folderTests) {
                    folderTests.className = 'v25-tree-node node5-folder-tests v25-glow-green';
                    const skip = folderTests.querySelector('.skip-badge');
                    if (skip) skip.style.display = 'flex';
                }
                
                if (pRootSrc) { pRootSrc.setAttribute('stroke', '#ef4444'); pRootSrc.style.strokeWidth = '3px'; }
                if (pRootTests) { pRootTests.setAttribute('stroke', '#10b981'); pRootTests.style.strokeWidth = '1.5px'; }
                if (pSrcMain) pSrcMain.setAttribute('stroke', 'rgba(255,255,255,0.08)');
            }
            // Phase 3 (progress > 0.8): Git scans main.py inside src, confirms change. auth.py gets checked green skip badge
            else {
                if (rootNode) rootNode.className = 'v25-tree-node node5-root v25-glow-red';
                if (folderSrc) folderSrc.className = 'v25-tree-node node5-folder-src v25-glow-red';
                if (folderTests) {
                    folderTests.className = 'v25-tree-node node5-folder-tests v25-glow-green';
                    const skip = folderTests.querySelector('.skip-badge');
                    if (skip) skip.style.display = 'flex';
                }
                if (fileAuth) {
                    fileAuth.className = 'v25-tree-node node5-file-auth v25-glow-green';
                    const skip = fileAuth.querySelector('.skip-badge');
                    if (skip) skip.style.display = 'flex';
                }
                if (fileMain) {
                    fileMain.className = 'v25-tree-node node5-file-main v25-glow-red';
                }

                if (pRootSrc) { pRootSrc.setAttribute('stroke', '#ef4444'); pRootSrc.style.strokeWidth = '3px'; }
                if (pRootTests) { pRootTests.setAttribute('stroke', '#10b981'); pRootTests.style.strokeWidth = '1.5px'; }
                if (pSrcAuth) { pSrcAuth.setAttribute('stroke', '#10b981'); pSrcAuth.style.strokeWidth = '1.5px'; }
                if (pSrcMain) { pSrcMain.setAttribute('stroke', '#ef4444'); pSrcMain.style.strokeWidth = '3px'; }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video25'
    };

    console.log('[Video25 Plugin] Loaded: Git Status & Merkle Tree slide animation successfully registered.');
})();
