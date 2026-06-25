/**
 * Video 60: Null Pointer - Billion Dollar Mistake Simulation
 * Plugin driving visuals for smartphone app crash, RAM memory void falls,
 * shockwave explosions, financial transaction cliff-dives, and compiler-level Null Safety IDEs.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_null_1: [
            { text: 'Null Pointer Exception', start: 1.5, end: 7.0, class: 'active-red' },
            { text: 'văng, treo máy', start: 7.0, end: 11.5, class: 'active-red' },
            { text: 'hàng tỷ đô la', start: 11.5, end: 16.0, class: 'active-yellow' }
        ],
        slide_null_2: [
            { text: 'bộ nhớ hoạt động', start: 1.5, end: 5.5, class: 'active-cyan' },
            { text: 'Tony Hoare', start: 5.5, end: 9.0, class: 'active-gold' },
            { text: 'không trỏ đến', start: 9.0, end: 16.5, class: 'active-yellow' }
        ],
        slide_null_3: [
            { text: 'đối tượng rỗng', start: 1.5, end: 5.5, class: 'active-red' },
            { text: 'hố rỗng không đáy', start: 5.5, end: 11.0, class: 'active-red' },
            { text: 'nổ tung và sụp đổ', start: 11.0, end: 17.5, class: 'active-red' }
        ],
        slide_null_4: [
            { text: 'sai lầm trị giá tỷ đô', start: 1.5, end: 6.0, class: 'active-yellow' },
            { text: 'sập các server', start: 6.0, end: 11.5, class: 'active-red' },
            { text: 'mất mát hàng triệu giao dịch', start: 11.5, end: 18.0, class: 'active-red' }
        ],
        slide_null_5: [
            { text: 'Null Safety', start: 1.5, end: 5.5, class: 'active-green' },
            { text: 'chặn đứng mọi lỗi Null', start: 5.5, end: 11.0, class: 'active-green' },
            { text: 'tấm khiên bảo vệ', start: 11.0, end: 15.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_null_1', 'slide_null_2', 'slide_null_3', 'slide_null_4', 'slide_null_5'
    ];

    function initIcons(box) {
        try {
            if (window.lucide) {
                if (box) window.lucide.createIcons({ node: box });
                else window.lucide.createIcons();
            }
        } catch (e) {
            console.warn('[Video60] Lucide error:', e);
        }
    }

    function sceneWrap(inner) {
        return `<div class="v60-zoom-container"><div class="v60-scene-content">${inner}</div></div>`;
    }

    // Dynamic Physics Spark Emitter for Slide 3 void impact
    function spawnVoidSparks(canvas) {
        const container = canvas.querySelector('#s3-particle-layer');
        if (!container) return;
        container.innerHTML = ''; // reset

        const sparkChars = ['💥', '✖', '0', '1', 'NULL', 'ERR'];
        // Spawn 20 sparks
        for (let i = 0; i < 22; i++) {
            const spark = document.createElement('div');
            spark.className = 'v60-money-particle dust';
            spark.textContent = sparkChars[Math.floor(Math.random() * sparkChars.length)];
            spark.style.position = 'absolute';
            spark.style.fontSize = `${9 + Math.random() * 8}px`;
            spark.style.fontWeight = 'bold';
            
            // Void box center coords (relative to .v60-memory-space):
            // Width of space is 580px. Stack is 220px. Void container is on right (260px wide).
            // Centered in right area, so X ≈ 450px, Y ≈ 320px.
            const startX = 450 + (Math.random() - 0.5) * 20;
            const startY = 300 + (Math.random() - 0.5) * 10;
            spark.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
            container.appendChild(spark);

            const angle = -Math.PI / 6 - Math.random() * (Math.PI * 2 / 3); // upward arc
            const speed = 3 + Math.random() * 6;
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed;
            let x = startX;
            let y = startY;
            let opacity = 1;
            
            const anim = () => {
                vy += 0.22; // gravity
                vx *= 0.98; // air drag
                x += vx;
                y += vy;
                opacity -= 0.022;
                spark.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                spark.style.opacity = opacity;
                if (opacity > 0) {
                    requestAnimationFrame(anim);
                } else {
                    spark.remove();
                }
            };
            requestAnimationFrame(anim);
        }
    }

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_null_1') {
            canvas.innerHTML = sceneWrap(`
                <div class="v60-scene-row" id="s1-scene-row">
                    <!-- Centered Smartphone Mockup -->
                    <div class="v60-phone-mockup" id="s1-phone">
                        <div class="v60-phone-island"></div>
                        <div class="v60-phone-flash" id="s1-flash"></div>
                        
                        <!-- Screen Crack Overlay -->
                        <div class="v60-phone-crack" id="s1-crack"></div>
                        
                        <!-- Crash Error Page -->
                        <div class="v60-crash-screen" id="s1-crash-page">
                            <span class="v60-crash-title" id="s1-crash-title">
                                <i data-lucide="alert-octagon" style="width:16px;height:16px;"></i> APP CRASHED!
                            </span>
                            <div class="v60-crash-trace">
FATAL EXCEPTION: main
java.lang.NullPointerException: Attempt to invoke virtual method 'String com.turnio.User.getName()' on a null object reference
    at com.turnio.App.loadProfile(ProfileActivity.java:42)
    at com.turnio.App.onCreate(MainActivity.java:18)
    at android.app.ActivityThread.main(ActivityThread.java:108)
                            </div>
                        </div>

                        <!-- App Layout -->
                        <div class="v60-app-screen" id="s1-app-screen">
                            <div class="v60-app-header">
                                <div class="v60-app-avatar" id="s1-avatar">U</div>
                                <div class="v60-app-userinfo">
                                    <span class="v60-app-username" id="s1-username">Loading User...</span>
                                    <span class="v60-app-userrole">Premium Account</span>
                                </div>
                            </div>
                            
                            <div class="v60-app-card shimmer" id="s1-card-balance">
                                <span style="font-size:9px;color:var(--v60-gray);font-weight:bold;">CURRENT BALANCE</span>
                                <span class="v60-app-card-price" id="s1-balance">$1,450.00</span>
                            </div>

                            <div class="v60-app-card shimmer" id="s1-card-history">
                                <span class="v60-app-card-title">User Transaction History</span>
                                <div style="display:flex;justify-content:space-between;font-size:9px;color:#9ca3af;margin-top:2px;">
                                    <span>T.DEV Pro Subscription</span>
                                    <span style="color:var(--v60-red);font-weight:bold;">-$49.00</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;font-size:9px;color:#9ca3af;">
                                    <span>Cloud Server Cost</span>
                                    <span style="color:var(--v60-red);font-weight:bold;">-$120.00</span>
                                </div>
                            </div>

                            <div style="flex:1;"></div>
                            
                            <button class="v60-app-btn" id="s1-action-btn">
                                <i data-lucide="refresh-cw" style="width:12px;height:12px;margin-right:6px;animation:spin 3s linear infinite;"></i> LOAD PROFILE DATA
                            </button>
                        </div>
                    </div>
                </div>
            `);
            initIcons(canvas);
        }
        else if (slideId === 'slide_null_2' || slideId === 'slide_null_3') {
            canvas.innerHTML = sceneWrap(`
                <div class="v60-scene-row" id="s2-scene-row">
                    <!-- Instruction/Method Call Particle -->
                    <div class="v60-instruct-bubble" id="s2-instruct" style="display:none;">
                        getName()
                    </div>

                    <!-- RAM Memory Allocation Layout -->
                    <div class="v60-memory-space" id="s2-mem-space">
                        <!-- Sparks container for void explosion -->
                        <div id="s3-particle-layer" style="position:absolute;inset:0;pointer-events:none;z-index:12;"></div>

                        <!-- Variables (Pointers) -->
                        <div class="v60-pointer-stack">
                            <span style="font-size:12px;font-weight:800;color:#fff;margin-bottom:4px;text-align:left;letter-spacing:0.5px;">POINTER STACK (RAM)</span>
                            
                            <div class="v60-stack-slot">
                                <span class="v60-slot-addr">Addr: 0x7FFF004</span>
                                <div><span class="v60-var-badge blue">OrderObj order</span></div>
                            </div>

                            <div class="v60-stack-slot">
                                <span class="v60-slot-addr">Addr: 0x7FFF008</span>
                                <div><span class="v60-var-badge purple">ProductObj prod</span></div>
                            </div>

                            <div class="v60-stack-slot" id="s2-slot-user">
                                <span class="v60-slot-addr">Addr: 0x7FFF012</span>
                                <div><span class="v60-var-badge orange" id="s2-user-badge">UserObj user</span></div>
                            </div>
                        </div>

                        <!-- Connector Lines Canvas -->
                        <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
                            <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(255,255,255,0.4)" />
                                </marker>
                                <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--v60-yellow)" />
                                </marker>
                            </defs>
                            <!-- Pointers to heap object -->
                            <path id="path-order" class="v60-pointer-path" d="M 230 110 L 330 84" stroke="rgba(59, 130, 246, 0.4)" stroke-width="2" fill="none" marker-end="url(#arrow)" />
                            <path id="path-prod" class="v60-pointer-path" d="M 230 220 L 330 194" stroke="rgba(139, 92, 246, 0.4)" stroke-width="2" fill="none" marker-end="url(#arrow)" />
                            <path id="path-user" class="v60-pointer-path" d="M 230 330 L 330 330" stroke="var(--v60-yellow)" stroke-width="2.5" fill="none" marker-end="url(#arrow-orange)" />
                            <!-- Active Pulsing Pointer Dot -->
                            <circle id="s2-pointer-dot" class="v60-pointer-dot" r="4" style="display:none;" />
                        </svg>

                        <!-- Heap Values -->
                        <div class="v60-value-heap">
                            <span style="font-size:12px;font-weight:800;color:#fff;margin-bottom:4px;text-align:left;letter-spacing:0.5px;">DATA HEAP (RAM)</span>
                            
                            <div class="v60-heap-obj active-blue">
                                <span class="v60-obj-title">OrderObject @ 0x1A2B</span>
                                <div class="v60-obj-prop">id: <span>#9081</span></div>
                                <div class="v60-obj-prop">amount: <span>$145.00</span></div>
                            </div>

                            <div class="v60-heap-obj active-purple">
                                <span class="v60-obj-title">ProductObject @ 0x3C4D</span>
                                <div class="v60-obj-prop">title: <span>"Subscription"</span></div>
                                <div class="v60-obj-prop">stock: <span>45</span></div>
                            </div>

                            <!-- Void Container for NULL -->
                            <div class="v60-void-box" id="s2-void-container">
                                <div class="v60-shockwave ring-1" id="s2-shockwave-1"></div>
                                <div class="v60-shockwave ring-2" id="s2-shockwave-2"></div>
                                <div class="v60-shockwave ring-3" id="s2-shockwave-3"></div>
                                <span class="v60-void-title" id="s2-void-lbl">NULL</span>
                                <span class="v60-void-desc">NO DATA ALLOCATED</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_null_4') {
            canvas.innerHTML = sceneWrap(`
                <div class="v60-scene-row" id="s4-scene-row">
                    <!-- Particle container for falling money and dust -->
                    <div class="v60-particle-layer" id="s4-particles" style="position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden;"></div>

                    <div class="v60-finance-dashboard" id="s4-dashboard">
                        <!-- Revenue Monitor Card -->
                        <div class="v60-card v60-chart-card">
                            <div class="v60-card-hdr">
                                <span class="v60-card-lbl"><i data-lucide="bar-chart-3" style="width:12px;height:12px;margin-right:4px;"></i> Live Revenue Stream</span>
                                <span class="v60-status-badge stable" id="s4-stat-badge">SYSTEM HEALTHY</span>
                            </div>
                            
                            <div class="v60-revenue-board">
                                <div class="v60-rev-stat">
                                    <span style="font-size:9px;color:var(--v60-gray);font-weight:bold;">DAILY REVENUE</span>
                                    <div class="v60-rev-num" id="s4-rev-num">$2,451,080</div>
                                </div>
                                <div class="v60-rev-stat">
                                    <span style="font-size:9px;color:var(--v60-gray);font-weight:bold;">ACTIVE CHECKOUTS</span>
                                    <div class="v60-rev-num" id="s4-checkout-num" style="color:var(--v60-green);">4,821 / min</div>
                                </div>
                            </div>

                            <div class="v60-chart-container">
                                <div class="v60-chart-grid"></div>
                                <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:2;overflow:visible;">
                                    <path id="s4-chart-line" fill="none" stroke="var(--v60-green)" stroke-width="3" d="M 10 140 L 90 120 L 170 110 L 250 80 L 330 160" />
                                    <circle id="s4-chart-dot" r="5.5" fill="var(--v60-green)" cx="10" cy="140" />
                                </svg>
                            </div>
                        </div>

                        <!-- System Log Card -->
                        <div class="v60-card v60-log-card">
                            <div class="v60-card-hdr">
                                <span class="v60-card-lbl"><i data-lucide="terminal" style="width:12px;height:12px;margin-right:4px;"></i> Server Logs</span>
                            </div>
                            <div class="v60-log-box" id="s4-log-box"></div>
                        </div>
                    </div>
                </div>
            `);
            initIcons(canvas);
        }
        else if (slideId === 'slide_null_5') {
            canvas.innerHTML = sceneWrap(`
                <div class="v60-scene-row" id="s5-scene-row">
                    <!-- VS Code IDE Mockup -->
                    <div class="v60-card v60-ide-card" id="s5-ide-card" style="padding:0;overflow:hidden;">
                        <div class="v60-card-hdr" style="margin:0;padding:12px;background:rgba(10,15,30,0.5);border-bottom:1.5px solid var(--v60-border);">
                            <span class="v60-card-lbl" style="display:flex;align-items:center;gap:6px;color:#fff;">
                                <span style="display:flex;gap:5px;margin-right:6px;">
                                    <span style="width:8px;height:8px;border-radius:50%;background:#ef4444;display:inline-block;"></span>
                                    <span style="width:8px;height:8px;border-radius:50%;background:#f59e0b;display:inline-block;"></span>
                                    <span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;"></span>
                                </span>
                                <i data-lucide="code" style="width:13px;height:13px;color:var(--v60-blue);"></i> IDE Editor - main.java
                            </span>
                            <span class="v60-status-badge warning" id="s5-status">COMPILING UNSAFE</span>
                        </div>

                        <div class="v60-ide-body">
                            <!-- Sidebar -->
                            <div class="v60-ide-sidebar">
                                <span style="font-size:9px;font-weight:bold;color:var(--v60-gray);margin-bottom:6px;text-transform:uppercase;">Files</span>
                                <div class="v60-file-node"><i data-lucide="file" style="width:10px;height:10px;"></i> Main.java</div>
                                <div class="v60-file-node active"><i data-lucide="file-json" style="width:10px;height:10px;color:var(--v60-yellow);"></i> UserService.java</div>
                                <div class="v60-file-node"><i data-lucide="file" style="width:10px;height:10px;"></i> User.java</div>
                            </div>

                            <!-- Code Editor Area -->
                            <div class="v60-code-area" id="s5-code-area">
                                <div class="v60-shield-overlay" id="s5-shield">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--v60-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </div>
                                <div class="v60-shield-wave" id="s5-shield-wave"></div>
                                <div id="s5-code-lines"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            initIcons(canvas);
        }
    }

    // ── ANIMATION TIMELINE UPDATES ─────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying, getSlideDuration, slide) {
        const sceneRow = canvas.querySelector('.v60-scene-row');

        // Clean up general warning classes unless specific slides need them
        if (sceneRow) {
            sceneRow.classList.remove('shake-active', 'siren-alert');
        }

        if (slideId === 'slide_null_1') {
            const phone = canvas.querySelector('#s1-phone');
            const crack = canvas.querySelector('#s1-crack');
            const crashPage = canvas.querySelector('#s1-crash-page');
            const username = canvas.querySelector('#s1-username');
            const balance = canvas.querySelector('#s1-balance');
            const actionBtn = canvas.querySelector('#s1-action-btn');
            const appScreen = canvas.querySelector('#s1-app-screen');
            const flash = canvas.querySelector('#s1-flash');
            const crashTitle = canvas.querySelector('#s1-crash-title');

            // Slide 1 Entrance (Bouncy Scale In)
            if (progress > 0.01) {
                if (phone) phone.classList.add('active-in');
                if (appScreen) appScreen.classList.add('loaded');
            } else {
                if (phone) phone.classList.remove('active-in');
                if (appScreen) appScreen.classList.remove('loaded');
            }

            if (progress <= 0.4) {
                // Phase 1: User tries loading data
                if (crack) {
                    crack.classList.remove('active');
                    crack.style.opacity = '0';
                }
                if (crashPage) crashPage.classList.remove('active');
                if (username) username.textContent = 'Loading User...';
                if (balance) balance.textContent = '$1,450.00';
                if (flash) {
                    flash.classList.remove('flicker');
                    flash.style.opacity = '0';
                }
                if (crashTitle) crashTitle.classList.remove('glitch');
                if (actionBtn) {
                    actionBtn.innerHTML = `<i data-lucide="refresh-cw" style="width:12px;height:12px;margin-right:6px;animation:spin 3s linear infinite;"></i> CONNECTING SERVER...`;
                    initIcons(actionBtn);
                }
            } 
            else if (progress > 0.4 && progress <= 0.48) {
                // Phase 2: CRASH HIT (flash red, shake violently, glitch text)
                if (crack) {
                    crack.classList.add('active');
                    crack.style.opacity = '1';
                }
                if (crashPage) crashPage.classList.add('active');
                if (crashTitle) crashTitle.classList.add('glitch');
                if (sceneRow) {
                    sceneRow.classList.add('shake-active', 'siren-alert');
                }
                if (flash) {
                    flash.classList.add('flicker');
                    // Add physical raw random flicker if playing
                    if (isPlaying) {
                        flash.style.opacity = Math.random() > 0.45 ? '0.8' : '0';
                    }
                }
            } 
            else {
                // Phase 3: Settle down to static red warning page, glitch title remains active
                if (crack) {
                    crack.classList.add('active');
                    crack.style.opacity = '1';
                }
                if (crashPage) crashPage.classList.add('active');
                if (crashTitle) crashTitle.classList.add('glitch');
                if (flash) {
                    flash.classList.remove('flicker');
                    flash.style.opacity = '0';
                }
                if (sceneRow) {
                    sceneRow.classList.remove('shake-active');
                    sceneRow.classList.add('siren-alert'); // keep ambient siren glow pulsing
                }
            }
        }
        else if (slideId === 'slide_null_2') {
            // Slide 2: Explains Null memory tracings
            const pathUser = canvas.querySelector('#path-user');
            const userBadge = canvas.querySelector('#s2-user-badge');
            const voidBox = canvas.querySelector('#s2-void-container');
            const memSpace = canvas.querySelector('#s2-mem-space');
            const pointerDot = canvas.querySelector('#s2-pointer-dot');

            // Slide 2 Entrance
            if (progress > 0.01) {
                if (memSpace) memSpace.classList.add('loaded');
            } else {
                if (memSpace) memSpace.classList.remove('loaded');
            }

            if (progress < 0.3) {
                if (pathUser) pathUser.setAttribute('d', 'M 230 330 L 230 330'); // no path yet
                if (userBadge) userBadge.className = 'v60-var-badge';
                if (voidBox) voidBox.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                if (pointerDot) pointerDot.style.display = 'none';
            }
            else {
                // Connect pointer path User to NULL box
                const t = Math.min(1, (progress - 0.3) / 0.3); // animate line growth
                const endX = 230 + t * (330 - 230);
                if (pathUser) {
                    pathUser.setAttribute('d', `M 230 330 L ${endX} 330`);
                    pathUser.style.stroke = 'var(--v60-yellow)';
                    pathUser.style.strokeWidth = '2.5';
                }
                
                if (userBadge) {
                    userBadge.className = 'v60-var-badge orange';
                }
                if (voidBox) {
                    voidBox.style.borderColor = 'rgba(239, 68, 68, 0.35)';
                    voidBox.style.background = 'rgba(239, 68, 68, 0.04)';
                }

                // Travel pointer dot
                if (pointerDot) {
                    pointerDot.style.display = 'block';
                    pointerDot.setAttribute('cx', endX);
                    pointerDot.setAttribute('cy', '330');
                }
            }
        }
        else if (slideId === 'slide_null_3') {
            // Slide 3: getName() bubble flies, drops into void, and triggers explosion
            const instruct = canvas.querySelector('#s2-instruct');
            const voidLbl = canvas.querySelector('#s2-void-lbl');
            const voidBox = canvas.querySelector('#s2-void-container');
            const memSpace = canvas.querySelector('#s2-mem-space');
            const pointerDot = canvas.querySelector('#s2-pointer-dot');
            const pathUser = canvas.querySelector('#path-user');

            const ring1 = canvas.querySelector('#s2-shockwave-1');
            const ring2 = canvas.querySelector('#s2-shockwave-2');
            const ring3 = canvas.querySelector('#s2-shockwave-3');

            // Slide 3 Entrance
            if (progress > 0.01) {
                if (memSpace) memSpace.classList.add('loaded');
                if (pathUser) pathUser.setAttribute('d', 'M 230 330 L 330 330'); // fully drawn
            }

            // Reset states
            if (instruct) instruct.style.display = 'none';
            if (ring1) ring1.classList.remove('active');
            if (ring2) ring2.classList.remove('active');
            if (ring3) ring3.classList.remove('active');
            if (pointerDot) pointerDot.style.display = 'none';

            if (voidLbl) {
                voidLbl.textContent = 'NULL';
                voidLbl.style.color = 'var(--v60-red)';
            }
            if (voidBox) {
                voidBox.className = 'v60-void-box';
                voidBox.style.background = 'rgba(239, 68, 68, 0.02)';
            }

            // Spark particles setup and execution
            if (progress < 0.55) {
                canvas.removeAttribute('data-exploded');
                const particleLayer = canvas.querySelector('#s3-particle-layer');
                if (particleLayer) particleLayer.innerHTML = '';
            }

            if (progress > 0.05 && progress <= 0.45) {
                // Bubble travels from pointer (230, 330) to heap void box entrance (330, 330)
                const t = (progress - 0.05) / 0.40;
                const curX = 200 + t * (315 - 200);
                // Float with a sinus wave wobble
                const curY = 310 + Math.sin(t * Math.PI * 4) * 10;
                if (instruct) {
                    instruct.style.display = 'flex';
                    instruct.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(1)`;
                    instruct.style.opacity = '1';
                }
            }
            else if (progress > 0.45 && progress <= 0.58) {
                // Bubble drops down into the bottomless hole (Y increases, scales down)
                const t = (progress - 0.45) / 0.13;
                const curX = 315;
                const curY = 310 + t * 65;
                const scaleVal = 1 - t * 0.4;
                const opacityVal = 1 - t * 0.8;
                
                if (instruct) {
                    instruct.style.display = 'flex';
                    instruct.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${scaleVal})`;
                    instruct.style.opacity = opacityVal;
                }

                // Just before hitting the bottomless gradient
                if (progress > 0.55) {
                    if (ring1) ring1.classList.add('active');
                }
            }
            else if (progress > 0.58) {
                // Shockwave and system panic active
                if (instruct) instruct.style.display = 'none';
                if (ring1) ring1.classList.add('active');
                if (ring2) ring2.classList.add('active');
                if (ring3) ring3.classList.add('active');

                // Trigger spark explosion ONCE when boundary crossed
                if (!canvas.hasAttribute('data-exploded')) {
                    canvas.setAttribute('data-exploded', 'true');
                    spawnVoidSparks(canvas);
                }

                if (voidLbl) {
                    voidLbl.innerHTML = '<i data-lucide="bomb" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;"></i> ERROR!';
                    initIcons(voidLbl);
                }
                if (voidBox) {
                    voidBox.className = 'v60-void-box error';
                    voidBox.style.background = 'rgba(239, 68, 68, 0.12)';
                    voidBox.style.boxShadow = '0 0 25px rgba(239,68,68,0.25)';
                }
                
                // Shake briefly upon explosion (progress 0.58 to 0.70)
                if (progress <= 0.72 && sceneRow) {
                    sceneRow.classList.add('shake-active', 'siren-alert');
                } else if (sceneRow) {
                    sceneRow.classList.add('siren-alert');
                }
            }
        }
        else if (slideId === 'slide_null_4') {
            // Slide 4: Chart collapses, money falls, transaction logs fail
            const logBox = canvas.querySelector('#s4-log-box');
            const chartLine = canvas.querySelector('#s4-chart-line');
            const chartDot = canvas.querySelector('#s4-chart-dot');
            const revNum = canvas.querySelector('#s4-rev-num');
            const checkoutNum = canvas.querySelector('#s4-checkout-num');
            const statBadge = canvas.querySelector('#s4-stat-badge');
            const dashboard = canvas.querySelector('#s4-dashboard');
            const particleLayer = canvas.querySelector('#s4-particles');

            // Slide 4 Entrance
            if (progress > 0.01) {
                if (dashboard) dashboard.classList.add('loaded');
            } else {
                if (dashboard) dashboard.classList.remove('loaded');
            }

            // Animate transaction logs based on progress thresholds
            const logsData = [
                { time: '09:12:30', msg: 'Order API: GET /api/v1/checkout/192 ... OK (200)', p: 0.08, type: 'ok' },
                { time: '09:12:32', msg: 'Stock API: POST /api/v1/stock/reserve ... OK (200)', p: 0.16, type: 'ok' },
                { time: '09:12:35', msg: 'User API: GET /api/v1/users/458021 ... OK (200)', p: 0.24, type: 'ok' },
                { time: '09:12:37', msg: 'Notify API: SMS queued user #458021 ... OK (200)', p: 0.32, type: 'ok' },
                { time: '09:12:40', msg: 'CRITICAL: NullPointerException at line 42 (UserService)', p: 0.44, type: 'err' },
                { time: '09:12:41', msg: 'Transaction flow aborted. Rolling back DB writes.', p: 0.52, type: 'err' },
                { time: '09:12:43', msg: 'ALERT: Gateway error code 500 (Internal Server Error)', p: 0.60, type: 'err' },
                { time: '09:12:45', msg: 'WARN: Checkout cluster service is offline!', p: 0.72, type: 'err' },
                { time: '09:12:48', msg: 'ALERT: Revenue streams lost. System Panic mode.', p: 0.82, type: 'err' }
            ];

            if (logBox) {
                // Populate log box with items that have p <= progress
                let logHTML = '';
                let currentItemCount = 0;
                logsData.forEach(item => {
                    if (progress >= item.p) {
                        logHTML += `<div class="v60-log-row ${item.type}">[${item.time}] ${item.msg}</div>`;
                        currentItemCount++;
                    }
                });
                
                // Only rewrite if number of elements changed to prevent flickering redraws
                if (logBox.children.length !== currentItemCount) {
                    logBox.innerHTML = logHTML;
                    logBox.scrollTop = logBox.scrollHeight; // auto scroll
                }
            }

            // Animate chart line and metrics
            if (progress <= 0.44) {
                // Standard climbing line
                const ptX = 10 + progress * 720;
                const ptY = 140 - progress * 100;
                
                if (chartLine) {
                    chartLine.setAttribute('d', `M 10 140 Q 150 110, ${ptX} ${ptY}`);
                    chartLine.setAttribute('stroke', 'var(--v60-green)');
                    chartLine.classList.remove('crashed');
                }
                if (chartDot) {
                    chartDot.setAttribute('cx', ptX);
                    chartDot.setAttribute('cy', ptY);
                    chartDot.setAttribute('fill', 'var(--v60-green)');
                }
                if (dashboard) {
                    dashboard.classList.remove('crashed');
                }
                if (logBox) {
                    logBox.classList.remove('crashed');
                }

                if (revNum) {
                    const currentVal = Math.round(2451080 + progress * 200000);
                    revNum.textContent = `$${currentVal.toLocaleString()}`;
                    revNum.style.color = '#fff';
                    revNum.classList.remove('crashed');
                }
                if (checkoutNum) {
                    checkoutNum.textContent = '4,820 / min';
                    checkoutNum.style.color = 'var(--v60-green)';
                }
                if (statBadge) {
                    statBadge.className = 'v60-status-badge stable';
                    statBadge.textContent = 'SYSTEM HEALTHY';
                }

                // Floating Money: spawn green '$' particles
                if (isPlaying && Math.random() < 0.18 && particleLayer) {
                    const pEl = document.createElement('div');
                    pEl.className = 'v60-money-particle';
                    pEl.textContent = '$';
                    
                    const startX = 20 + Math.random() * 320;
                    pEl.style.transform = `translate3d(${startX}px, 280px, 0)`;
                    particleLayer.appendChild(pEl);

                    // Physics parameters
                    let curX = startX;
                    let curY = 280;
                    let vy = -1.2 - Math.random() * 2.2;
                    let drift = (Math.random() - 0.5) * 0.5;
                    let opacity = 1;

                    const moneyLoop = () => {
                        curY += vy;
                        curX += drift;
                        opacity -= 0.012;
                        pEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
                        pEl.style.opacity = opacity;
                        if (opacity > 0) requestAnimationFrame(moneyLoop);
                        else pEl.remove();
                    };
                    moneyLoop();
                }
            } 
            else {
                // CLIFF-DIVE CRASH (progress > 0.44)
                const tCrash = (progress - 0.44) / 0.56;
                const crashX = 10 + 0.44 * 720;
                const crashY = 140 - 0.44 * 100;
                const endY = Math.min(170, crashY + tCrash * 240);

                if (chartLine) {
                    chartLine.setAttribute('d', `M 10 140 Q 150 110, ${crashX} ${crashY} L ${crashX + tCrash * 40} ${endY}`);
                    chartLine.setAttribute('stroke', 'var(--v60-red)');
                    chartLine.classList.add('crashed');
                }
                if (chartDot) {
                    chartDot.setAttribute('cx', crashX + tCrash * 40);
                    chartDot.setAttribute('cy', endY);
                    chartDot.setAttribute('fill', 'var(--v60-red)');
                }
                if (dashboard) {
                    dashboard.classList.add('crashed');
                }
                if (logBox) {
                    logBox.classList.add('crashed');
                }

                // Glitched countdown/panic texts
                if (revNum) {
                    if (Math.random() > 0.75) {
                        const glitchList = ['$0.00', 'ERR_NULL', 'SYS_HALT', 'PANIC_500'];
                        revNum.textContent = glitchList[Math.floor(Math.random() * glitchList.length)];
                    } else {
                        revNum.textContent = '$0.00';
                    }
                    revNum.style.color = 'var(--v60-red)';
                    revNum.classList.add('crashed');
                }
                if (checkoutNum) {
                    checkoutNum.textContent = '0 / min (FAILED)';
                    checkoutNum.style.color = 'var(--v60-red)';
                }
                if (statBadge) {
                    statBadge.className = 'v60-status-badge error';
                    statBadge.textContent = 'SYSTEM LOCKOUT';
                }

                // Shake on crash impact (0.44 to 0.54)
                if (progress > 0.44 && progress <= 0.56 && sceneRow) {
                    sceneRow.classList.add('shake-active', 'siren-alert');
                } else if (sceneRow) {
                    sceneRow.classList.add('siren-alert');
                }

                // Money disintegrates: spawn red dust particles falling down
                if (isPlaying && Math.random() < 0.22 && particleLayer) {
                    const pEl = document.createElement('div');
                    pEl.className = 'v60-money-particle dust';
                    pEl.textContent = Math.random() > 0.5 ? 'x' : '✖';
                    
                    const startX = 20 + Math.random() * 320;
                    pEl.style.transform = `translate3d(${startX}px, 200px, 0)`;
                    particleLayer.appendChild(pEl);

                    let curX = startX;
                    let curY = 200;
                    let vy = 1.5 + Math.random() * 3.0; // falling down fast
                    let vx = (Math.random() - 0.5) * 1.5;
                    let opacity = 1;

                    const dustLoop = () => {
                        curY += vy;
                        curX += vx;
                        opacity -= 0.025;
                        pEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
                        pEl.style.opacity = opacity;
                        if (opacity > 0) requestAnimationFrame(dustLoop);
                        else pEl.remove();
                    };
                    dustLoop();
                }
            }
        }
        else if (slideId === 'slide_null_5') {
            const ide = canvas.querySelector('#s5-ide-card');
            const status = canvas.querySelector('#s5-status');
            const codeLines = canvas.querySelector('#s5-code-lines');
            const shield = canvas.querySelector('#s5-shield');
            const shieldWave = canvas.querySelector('#s5-shield-wave');

            // Slide 5 Entrance
            if (progress > 0.01) {
                if (ide) ide.classList.add('loaded');
            } else {
                if (ide) ide.classList.remove('loaded');
            }

            const unsafeCode = `
<span class="v60-code-line">01 <span class="v60-code-type">User</span> user = database.<span class="v60-code-method">getUser</span>();</span>
<span class="v60-code-line" style="position:relative;display:inline-block;">02 <span class="v60-wavy-error">user.<span class="v60-code-method">getName</span>()</span>; <span class="v60-code-comment">// Unsafe call!</span><span class="v60-text-strike" id="s5-strike"></span></span>
            `;

            if (progress <= 0.3) {
                // Phase 1: Show unsafe code in error
                if (status) {
                    status.className = 'v60-status-badge error';
                    status.textContent = 'COMPILING UNSAFE';
                }
                if (codeLines) codeLines.innerHTML = unsafeCode;
                if (shield) shield.classList.remove('active');
                if (shieldWave) shieldWave.classList.remove('active');
                canvas.removeAttribute('data-shield-waved');

                // Trigger strike animation right before replacement (progress > 0.16)
                const strike = canvas.querySelector('#s5-strike');
                if (strike) {
                    if (progress > 0.15) {
                        strike.classList.add('active');
                    } else {
                        strike.classList.remove('active');
                    }
                }
            }
            else if (progress > 0.3 && progress <= 0.75) {
                // Phase 2: Typer deletes line 2 and types safe check
                const t = (progress - 0.3) / 0.45;
                if (status) {
                    status.className = 'v60-status-badge warning';
                    status.textContent = 'TYPING FIX...';
                }
                if (shield) shield.classList.remove('active');
                if (shieldWave) shieldWave.classList.remove('active');
                canvas.removeAttribute('data-shield-waved');

                const safeLinesText = [
                    '02 ',
                    'if (user != null) {',
                    '    String name = user.getName();',
                    '}'
                ];

                let output = `<span class="v60-code-line">01 <span class="v60-code-type">User</span> user = database.<span class="v60-code-method">getUser</span>();</span>\n`;
                
                // Typing character animations
                if (t < 0.35) {
                    // Type: if (user != null) {
                    const charCount = Math.round((t / 0.35) * safeLinesText[1].length);
                    const typed = safeLinesText[1].substring(0, charCount);
                    output += `<div class="v60-safe-wrapper-box">`;
                    output += `<span class="v60-code-line">02 <span class="v60-code-keyword">if</span> (${typed}<span class="v60-typing-cursor"></span>)</span>`;
                    output += `</div>`;
                } 
                else if (t >= 0.35 && t < 0.8) {
                    // Type: String name = user.getName();
                    const subT = (t - 0.35) / 0.45;
                    const charCount = Math.round(subT * safeLinesText[2].length);
                    const typed = safeLinesText[2].substring(0, charCount);
                    output += `<div class="v60-safe-wrapper-box">`;
                    output += `<span class="v60-code-line">02 <span class="v60-code-keyword">if</span> (user != <span class="v60-code-keyword">null</span>) {</span>\n`;
                    output += `<span class="v60-code-line">03     <span class="v60-code-type">String</span> name = ${typed}<span class="v60-typing-cursor"></span></span>`;
                    output += `</div>`;
                } 
                else {
                    // Type: closing bracket
                    output += `<div class="v60-safe-wrapper-box">`;
                    output += `<span class="v60-code-line">02 <span class="v60-code-keyword">if</span> (user != <span class="v60-code-keyword">null</span>) {</span>\n`;
                    output += `<span class="v60-code-line">03     <span class="v60-code-type">String</span> name = user.<span class="v60-code-method">getName</span>();</span>\n`;
                    output += `<span class="v60-code-line">04 }<span class="v60-typing-cursor"></span></span>`;
                    output += `</div>`;
                }

                if (codeLines) codeLines.innerHTML = output;
            }
            else {
                // Phase 3: Compilation success, shield slides in, everything glows green
                if (status) {
                    status.className = 'v60-status-badge stable';
                    status.textContent = 'SAFE SHIELD OK';
                }
                if (shield) shield.classList.add('active');

                // Trigger expanding protective wave once
                if (!canvas.hasAttribute('data-shield-waved')) {
                    canvas.setAttribute('data-shield-waved', 'true');
                    if (shieldWave) {
                        shieldWave.classList.remove('active');
                        void shieldWave.offsetWidth; // force reflow
                        shieldWave.classList.add('active');
                    }
                }

                const safeCode = `
<span class="v60-code-line">01 <span class="v60-code-type">User</span> user = database.<span class="v60-code-method">getUser</span>();</span>
<div class="v60-safe-wrapper-box" style="border-color:rgba(16,185,129,0.55);box-shadow:0 0 15px rgba(16,185,129,0.15);">
<span class="v60-code-line">02 <span class="v60-code-keyword v60-code-glow">if</span> (user != <span class="v60-code-keyword v60-code-glow">null</span>) {</span>
<span class="v60-code-line">03     <span class="v60-code-type">String</span> name = user.<span class="v60-code-method v60-code-glow">getName</span>();</span>
<span class="v60-code-line">04 }</span>
</div>
                `;
                if (codeLines) codeLines.innerHTML = safeCode;
            }
        }
    }

    // ── PUBLIC PLUGIN REGISTRATION ─────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video60',
        topic: 'Null Pointer Billion Dollar Mistake',
        episodeNum: 60,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video60 Plugin] Loaded: Null Pointer visual simulation engine ready.');
})();
