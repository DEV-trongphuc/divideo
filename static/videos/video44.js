/**
 * Video 44: Google Docs Collaborative Editing (Operational Transformation)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video44
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_docs_2: [
            { text: 'ghi đè', start: 3.0, end: 9.0, class: 'active-bad' },
            { text: 'lỗi', start: 9.0, end: 15.0, class: 'active-bad' }
        ],
        slide_docs_3: [
            { text: 'thuật toán OT', start: 2.0, end: 8.0, class: 'active-good' },
            { text: 'thao tác cơ bản', start: 8.0, end: 14.5, class: 'active-gold' }
        ],
        slide_docs_4: [
            { text: 'Server', start: 2.0, end: 8.0, class: 'active-gold' },
            { text: 'lùi lại', start: 8.0, end: 16.0, class: 'active-good' }
        ],
        slide_docs_5: [
            { text: 'A T S', start: 2.0, end: 7.0, class: 'active-good' },
            { text: 'mượt mà', start: 7.0, end: 14.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_docs_1',
        'slide_docs_2',
        'slide_docs_3',
        'slide_docs_4',
        'slide_docs_5'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return; // Keep DOM persistence for performance

        if (slideId === 'slide_docs_1') {
            canvas.innerHTML = `
                <div class="v44-zoom-container">
                    <div class="v37-grid-bg blue-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(59,130,246,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                    
                    <div style="position:relative; width:340px; height:340px; margin: 20px 0; display:flex; align-items:center; justify-content:center;">
                        <!-- Outer rotating rings -->
                        <div class="v44-glow-ring outer" style="position:absolute; width:340px; height:340px;"></div>
                        <div class="v44-glow-ring inner" style="position:absolute; width:280px; height:280px;"></div>
                        
                        <!-- Floating Google Docs Icon -->
                        <div class="v44-floating-logo" style="z-index: 2; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center;">
                            <img src="https://cdn-icons-png.flaticon.com/256/5968/5968517.png" style="width: 180px; height: 180px; filter: drop-shadow(0 0 35px rgba(59,130,246,0.5));" alt="Google Docs Icon">
                        </div>
                    </div>

                    <div class="glass-card" style="text-align: center; width: 90%; max-width: 500px; padding: 22px 24px; border-radius: 20px; border: 1.5px solid rgba(59,130,246,0.35); background: rgba(12, 16, 24, 0.8); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 10px;">
                        <div style="margin-bottom: 12px; font-size: 15px; padding: 6px 16px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(59, 130, 246, 0.4); background: rgba(59, 130, 246, 0.1); color: #38bdf8; border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                            <i data-lucide="users" style="width:16px;height:16px;"></i> Cộng tác thời gian thực
                        </div>
                        <div style="font-family:'Outfit', sans-serif; font-size: 19px; font-weight: bold; color: #fff; line-height: 1.5;">
                            Làm sao 100 người sửa chung một dòng văn bản mà không bị đè hay mất chữ?
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_docs_2') {
            canvas.innerHTML = `
                <div class="v44-zoom-container">
                    <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 95%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px;">
                        Tình huống: Gõ chữ đồng thời (Không có OT)
                    </div>

                    <div class="v44-sim-box">
                        <div class="v44-editor-split">
                            <!-- Left: User A -->
                            <div class="v44-editor-card user-a" id="editor-a">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#38bdf8;">A</div>
                                    <div class="v44-editor-user-name">User A (Gõ thêm 'S')</div>
                                </div>
                                <div class="v44-text-line">
                                    <div class="v44-char-box char-a-0">C</div>
                                    <div class="v44-char-box char-a-1">A</div>
                                    <div class="v44-char-box char-a-2">T</div>
                                    <div class="v44-char-box char-a-3" style="display:none;">S</div>
                                    <div class="v44-cursor user-a" id="cursor-a" style="left: 146px;">
                                        <div class="v44-cursor-tag">User A</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: User B -->
                            <div class="v44-editor-card user-b" id="editor-b">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#f43f5e;">B</div>
                                    <div class="v44-editor-user-name">User B (Xóa chữ 'C')</div>
                                </div>
                                <div class="v44-text-line">
                                    <div class="v44-char-box char-b-0">C</div>
                                    <div class="v44-char-box char-b-1">A</div>
                                    <div class="v44-char-box char-b-2">T</div>
                                    <div class="v44-cursor user-b" id="cursor-b" style="left: 10px;">
                                        <div class="v44-cursor-tag">User B</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Naive Overwrite crash warning -->
                        <div class="v44-crash-warning" id="crash-overlay">
                            <i data-lucide="alert-octagon" style="width:52px; height:52px; color:#ef4444; margin-bottom:8px;"></i>
                            <div style="font-size:18px; font-weight:800; color:#fff; text-transform:uppercase;">Xung đột dữ liệu!</div>
                            <div style="font-size:14px; color:rgba(255,255,255,0.7); margin-top:4px; text-align:center; padding:0 20px;">
                                Không có thuật toán OT, văn bản của User A và B sẽ đè lên nhau gây mất chữ!
                            </div>
                        </div>
                    </div>

                    <!-- Steps description tracker -->
                    <div class="v44-steps-tracker">
                        <div class="v44-step-card card-state-1">
                            <div class="v44-step-icon"><i data-lucide="keyboard"></i></div>
                            <div style="font-weight:bold; font-size:15px; color:#fff;">1. Sửa đồng thời</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.4); margin-top:2px;">A gõ thêm S, B xóa C.</div>
                        </div>
                        <div class="v44-step-card card-state-2">
                            <div class="v44-step-icon"><i data-lucide="network"></i></div>
                            <div style="font-weight:bold; font-size:15px; color:#fff;">2. Máy chủ bối rối</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.4); margin-top:2px;">Ghi nhận 2 thao tác cùng lúc.</div>
                        </div>
                        <div class="v44-step-card card-state-3" id="state-3-warn">
                            <div class="v44-step-icon"><i data-lucide="shield-alert"></i></div>
                            <div style="font-weight:bold; font-size:15px; color:#fff;">3. Lỗi mất chữ</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.4); margin-top:2px;">Xung đột index gây đè dữ liệu.</div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_docs_3') {
            canvas.innerHTML = `
                <div class="v44-zoom-container">
                    <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 95%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px;">
                        Giải pháp: Đóng gói thao tác dưới dạng phép toán
                    </div>

                    <div class="v44-sim-box">
                        <div class="v44-editor-split">
                            <!-- Left Client -->
                            <div class="v44-editor-card user-a" style="max-height: 180px;">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#38bdf8;">A</div>
                                    <div style="font-size:13px; font-weight:bold;">CLIENT A</div>
                                </div>
                                <div class="v44-text-line" style="height: 60px;">
                                    <div class="v44-char-box">C</div>
                                    <div class="v44-char-box">A</div>
                                    <div class="v44-char-box">T</div>
                                    <div class="v44-char-box added">S</div>
                                </div>
                            </div>

                            <!-- Server (Middle) -->
                            <div class="v44-server-node" id="server-node-s3">
                                <div class="v44-server-core">
                                    <i data-lucide="cpu" style="width:28px; height:28px;"></i>
                                </div>
                                <div style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">SERVER</div>
                                <div style="font-size:13px; font-weight:bold; color:#f59e0b; margin-top:2px;" id="server-status-s3">STANDBY</div>
                            </div>

                            <!-- Right Client -->
                            <div class="v44-editor-card user-b" style="max-height: 180px;">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#f43f5e;">B</div>
                                    <div style="font-size:13px; font-weight:bold;">CLIENT B</div>
                                </div>
                                <div class="v44-text-line" style="height: 60px;">
                                    <div class="v44-char-box deleted">C</div>
                                    <div class="v44-char-box">A</div>
                                    <div class="v44-char-box">T</div>
                                </div>
                            </div>
                        </div>

                        <!-- Operations Packets -->
                        <div class="v44-flying-packet user-a" id="packet-a">
                            <span class="v44-packet-title">A: INS</span>
                            <span class="v44-packet-op">'S' @ 3</span>
                        </div>
                        <div class="v44-flying-packet user-b" id="packet-b">
                            <span class="v44-packet-title">B: DEL</span>
                            <span class="v44-packet-op">'C' @ 0</span>
                        </div>
                    </div>

                    <!-- Steps tracker -->
                    <div class="v44-steps-tracker">
                        <div class="v44-step-card active">
                            <div style="font-weight:bold; font-size:15px; color:#fff;">Gói tin thao tác</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;">
                                Trình duyệt chuyển chữ gõ thành lệnh: <strong style="color:#38bdf8;">INS</strong> hoặc <strong style="color:#f43f5e;">DEL</strong> kèm index.
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_docs_4') {
            canvas.innerHTML = `
                <div class="v44-zoom-container">
                    <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 95%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px;">
                        Server hoạt động: Thuật toán biến đổi (OT)
                    </div>

                    <div class="v44-sim-box">
                        <div class="v44-editor-split" style="align-items: center; justify-content: center;">
                            <!-- Central Server area with processing logs -->
                            <div class="v44-server-node active" style="position:relative; left:0; top:0; transform:none; width: 150px; height: 150px;">
                                <div class="v44-server-core">
                                    <i data-lucide="refresh-cw" style="width:32px; height:32px; color:#f59e0b;"></i>
                                </div>
                                <div style="font-size:11px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">OT ENGINE</div>
                                <div style="font-size:13px; font-weight:bold; color:#10b981; margin-top:2px;">PROCESSING</div>
                            </div>
                            
                            <!-- Detailed code execution board -->
                            <div class="glass-card" style="width: 320px; padding: 15px; border-radius: 16px; border: 1.5px solid rgba(245,158,11,0.3); background: rgba(12,16,24,0.9); margin-left: 30px; display:flex; flex-direction:column; gap:8px;">
                                <div style="font-size:11px; font-family:monospace; color:#f59e0b; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:4px;">Server Rules Log:</div>
                                <div style="font-size:13px; font-family:monospace; color:rgba(255,255,255,0.85);" id="log-line-1">
                                    ⚙️ Recv: B (DEL @ 0) -> Applied!
                                </div>
                                <div style="font-size:13px; font-family:monospace; color:rgba(255,255,255,0.85);" id="log-line-2">
                                    ⚙️ Recv: A (INS 'S' @ 3) -> Conflicting!
                                </div>
                                <div style="font-size:13px; font-family:monospace; color:#38bdf8; font-weight:bold; background:rgba(56,189,248,0.08); padding:6px; border-radius:8px; border:1px dashed rgba(56,189,248,0.25);" id="log-line-3">
                                    🔄 OT: Shift A pos (3 - 1) = 2
                                </div>
                                <div style="font-size:13px; font-family:monospace; color:#10b981; font-weight:bold;" id="log-line-4">
                                    🚀 Broadcast: A (INS 'S' @ 2) to B!
                                </div>
                            </div>
                        </div>

                        <!-- Packets flying back/out -->
                        <div class="v44-flying-packet user-b" id="out-packet-a" style="left:50%; top:50%;">
                            <span class="v44-packet-title">To A</span>
                            <span class="v44-packet-op">DEL @ 0</span>
                        </div>
                        <div class="v44-flying-packet user-a" id="out-packet-b" style="left:50%; top:50%;">
                            <span class="v44-packet-title">To B</span>
                            <span class="v44-packet-op">INS 'S' @ 2</span>
                        </div>
                    </div>

                    <!-- Steps tracker -->
                    <div class="v44-steps-tracker">
                        <div class="v44-step-card active">
                            <div style="font-weight:bold; font-size:15px; color:#fff;">Tự động dịch chuyển Index</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;">
                                Vì B đã xóa 1 ký tự ở đầu (độ dài giảm 1), vị trí chèn của A được Server dời từ <span style="color:#ef4444; font-weight:bold;">3</span> về <span style="color:#10b981; font-weight:bold;">2</span>.
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_docs_5') {
            canvas.innerHTML = `
                <div class="v44-zoom-container">
                    <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 95%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px;">
                        Kết quả: Đồng bộ mượt mà
                    </div>

                    <div class="v44-sim-box">
                        <div class="v44-editor-split">
                            <!-- Left: User A -->
                            <div class="v44-editor-card user-a">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#38bdf8;">A</div>
                                    <div class="v44-editor-user-name">User A (Đã đồng bộ)</div>
                                </div>
                                <div class="v44-text-line">
                                    <div class="v44-char-box">A</div>
                                    <div class="v44-char-box">T</div>
                                    <div class="v44-char-box added">S</div>
                                    <div class="v44-cursor user-a" style="left: 146px;">
                                        <div class="v44-cursor-tag">A</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: User B -->
                            <div class="v44-editor-card user-b">
                                <div class="v44-editor-header">
                                    <div class="v44-editor-user-avatar" style="background:#f43f5e;">B</div>
                                    <div class="v44-editor-user-name">User B (Đã đồng bộ)</div>
                                </div>
                                <div class="v44-text-line">
                                    <div class="v44-char-box">A</div>
                                    <div class="v44-char-box">T</div>
                                    <div class="v44-char-box added">S</div>
                                    <div class="v44-cursor user-b" style="left: 146px;">
                                        <div class="v44-cursor-tag">B</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Success badge indicator overlay -->
                        <div style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); padding: 12px 24px; border-radius: 16px; border:2.5px solid #10b981; background:rgba(16,185,129,0.15); box-shadow:0 0 25px rgba(16,185,129,0.3); display:flex; align-items:center; gap:8px; z-index: 10;" class="v44-success-banner">
                            <div style="width:30px; height:30px; border-radius:50%; background:#10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-size:16px; font-weight:bold;">✓</div>
                            <div style="font-size:16px; font-weight:bold; color:#fff; text-transform:uppercase; letter-spacing:0.5px;">ĐỒNG BỘ THÀNH CÔNG!</div>
                        </div>
                    </div>

                    <!-- Steps tracker -->
                    <div class="v44-steps-tracker">
                        <div class="v44-step-card active success-step" style="flex:1;">
                            <div style="font-weight:bold; font-size:15px; color:#fff;">Văn bản đồng nhất tuyệt đối</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;">
                                Cả hai người dùng đều thấy chữ <strong style="color:#10b981;">A T S</strong>. Không ai bị mất dữ liệu, không ai bị đè chữ.
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_docs_1') {
            const logo = canvas.querySelector('.v44-floating-logo');
            if (logo) {
                const floatY = Math.sin(progress * Math.PI * 2) * 8;
                const floatRot = Math.sin(progress * Math.PI * 2) * 1.8;
                logo.style.transform = `translateY(${floatY}px) rotate(${floatRot}deg)`;
            }
        }
        else if (slideId === 'slide_docs_2') {
            const cardA = canvas.querySelector('#editor-a');
            const cardB = canvas.querySelector('#editor-b');
            const crashOverlay = canvas.querySelector('#crash-overlay');
            
            const charA3 = canvas.querySelector('.char-a-3');
            const charB0 = canvas.querySelector('.char-b-0');
            const cursorA = canvas.querySelector('#cursor-a');
            const cursorB = canvas.querySelector('#cursor-b');

            const step1 = canvas.querySelector('.card-state-1');
            const step2 = canvas.querySelector('.card-state-2');
            const step3 = canvas.querySelector('#state-3-warn');

            // Reset styles
            if (cardA) { cardA.classList.remove('v44-shake'); cardA.style.borderColor = 'rgba(56, 189, 248, 0.25)'; }
            if (cardB) { cardB.classList.remove('v44-shake'); cardB.style.borderColor = 'rgba(244, 63, 94, 0.25)'; }
            if (crashOverlay) { crashOverlay.classList.remove('visible'); }
            
            if (step1) step1.classList.remove('active');
            if (step2) step2.classList.remove('active');
            if (step3) { step3.classList.remove('active'); step3.classList.remove('success-step'); }

            if (progress < 0.35) {
                // Phase 1: Typing & Initial setup
                if (step1) step1.classList.add('active');
                
                // User A hasn't typed 'S' yet, User B hasn't deleted 'C' yet
                if (charA3) charA3.style.display = 'none';
                if (charB0) {
                    charB0.style.display = 'flex';
                    charB0.className = 'v44-char-box char-b-0';
                }
                if (cursorA) cursorA.style.left = '146px'; // right after T
                if (cursorB) cursorB.style.left = '10px';  // right before C
            }
            else if (progress >= 0.35 && progress < 0.70) {
                // Phase 2: Operations occur simultaneously
                if (step2) step2.classList.add('active');

                // User A types 'S'
                if (charA3) {
                    charA3.style.display = 'flex';
                    charA3.className = 'v44-char-box char-a-3 added';
                }
                if (cursorA) cursorA.style.left = '194px'; // moves right

                // User B deletes 'C'
                if (charB0) {
                    charB0.className = 'v44-char-box char-b-0 deleted';
                }
                if (cursorB) cursorB.style.left = '10px';
            }
            else {
                // Phase 3: Collision error shown
                if (step3) { step3.classList.add('active'); }
                
                if (charA3) { charA3.style.display = 'flex'; charA3.className = 'v44-char-box char-a-3 added'; }
                if (charB0) { charB0.className = 'v44-char-box char-b-0 deleted'; }
                if (cursorA) cursorA.style.left = '194px';
                if (cursorB) cursorB.style.left = '10px';

                // Display warning and shake cards
                if (crashOverlay) crashOverlay.classList.add('visible');
                if (cardA) { cardA.classList.add('v44-shake'); cardA.style.borderColor = '#ef4444'; }
                if (cardB) { cardB.classList.add('v44-shake'); cardB.style.borderColor = '#ef4444'; }
            }
        }
        else if (slideId === 'slide_docs_3') {
            const packetA = canvas.querySelector('#packet-a');
            const packetB = canvas.querySelector('#packet-b');
            const server = canvas.querySelector('#server-node-s3');
            const serverStatus = canvas.querySelector('#server-status-s3');

            if (progress < 0.15) {
                // Packets static at client positions
                if (packetA) {
                    packetA.style.opacity = 1;
                    packetA.style.left = '130px';
                    packetA.style.top = '140px';
                }
                if (packetB) {
                    packetB.style.opacity = 1;
                    packetB.style.left = '670px';
                    packetB.style.top = '140px';
                }
                if (server) server.classList.remove('active');
                if (serverStatus) { serverStatus.textContent = 'STANDBY'; serverStatus.style.color = '#f59e0b'; }
            }
            else if (progress >= 0.15 && progress < 0.70) {
                // Packets flying towards the center server
                const p = (progress - 0.15) / 0.55;
                
                // Interpolate X positions
                const startXA = 130;
                const endXA = 400; // center is 400px (50% of 800px)
                const startXB = 670;
                const endXB = 400;

                const currXA = startXA + p * (endXA - startXA);
                const currXB = startXB + p * (endXB - startXB);

                // Interpolate Y positions (downwards to center line)
                const startY = 140;
                const endY = 190;
                const currY = startY + p * (endY - startY);

                if (packetA) {
                    packetA.style.opacity = 1;
                    packetA.style.left = `${currXA}px`;
                    packetA.style.top = `${currY}px`;
                }
                if (packetB) {
                    packetB.style.opacity = 1;
                    packetB.style.left = `${currXB}px`;
                    packetB.style.top = `${currY}px`;
                }
                if (server) server.classList.remove('active');
                if (serverStatus) { serverStatus.textContent = 'STANDBY'; serverStatus.style.color = '#f59e0b'; }
            }
            else {
                // Packets inside the server node, server becomes active
                if (packetA) packetA.style.opacity = 0;
                if (packetB) packetB.style.opacity = 0;
                if (server) server.classList.add('active');
                if (serverStatus) { serverStatus.textContent = 'ENGAGED'; serverStatus.style.color = '#10b981'; }
            }
        }
        else if (slideId === 'slide_docs_4') {
            const outPacketA = canvas.querySelector('#out-packet-a');
            const outPacketB = canvas.querySelector('#out-packet-b');
            
            const log1 = canvas.querySelector('#log-line-1');
            const log2 = canvas.querySelector('#log-line-2');
            const log3 = canvas.querySelector('#log-line-3');
            const log4 = canvas.querySelector('#log-line-4');

            // Reset text visibility
            if (log1) log1.style.opacity = '0.15';
            if (log2) log2.style.opacity = '0.15';
            if (log3) log3.style.opacity = '0.15';
            if (log4) log4.style.opacity = '0.15';

            if (progress < 0.25) {
                if (log1) log1.style.opacity = '1';
                
                if (outPacketA) outPacketA.style.opacity = 0;
                if (outPacketB) outPacketB.style.opacity = 0;
            }
            else if (progress >= 0.25 && progress < 0.50) {
                if (log1) log1.style.opacity = '1';
                if (log2) log2.style.opacity = '1';

                if (outPacketA) outPacketA.style.opacity = 0;
                if (outPacketB) outPacketB.style.opacity = 0;
            }
            else if (progress >= 0.50 && progress < 0.75) {
                if (log1) log1.style.opacity = '1';
                if (log2) log2.style.opacity = '1';
                if (log3) log3.style.opacity = '1';

                if (outPacketA) outPacketA.style.opacity = 0;
                if (outPacketB) outPacketB.style.opacity = 0;
            }
            else {
                // Phase 4: Broadcast out to clients
                if (log1) log1.style.opacity = '1';
                if (log2) log2.style.opacity = '1';
                if (log3) log3.style.opacity = '1';
                if (log4) log4.style.opacity = '1';

                const p = (progress - 0.75) / 0.25;
                // Outbound flow
                const startX = 220; // server relative center
                const endXA = 100;  // moves left to Client A
                const endXB = 340;  // moves right to Client B

                const currXA = startX + p * (endXA - startX);
                const currXB = startX + p * (endXB - startX);

                if (outPacketA) {
                    outPacketA.style.opacity = 1;
                    outPacketA.style.left = `${currXA}px`;
                    outPacketA.style.top = '90px';
                }
                if (outPacketB) {
                    outPacketB.style.opacity = 1;
                    outPacketB.style.left = `${currXB}px`;
                    outPacketB.style.top = '90px';
                }
            }
        }
        else if (slideId === 'slide_docs_5') {
            const banner = canvas.querySelector('.v44-success-banner');
            if (banner) {
                if (progress >= 0.45) {
                    banner.style.opacity = 1;
                    banner.style.transform = 'translate(-50%, -50%) scale(1.05)';
                } else {
                    banner.style.opacity = 0;
                    banner.style.transform = 'translate(-50%, -50%) scale(0.9)';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video44',
        topic: 'Đồng bộ Google Docs',
        episodeNum: 44,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video44 Plugin] Loaded: Google Docs OT slides ready.');
})();
