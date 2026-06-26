/**
 * Video 62: Headroom LLM Prompt Context Compressor Simulation
 * Plugin driving visual models, token meters, compression flow, and cache lookups.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_head_intro: [
            { text: 'lãng phí vì đống dữ liệu rác', start: 1.5, end: 4.5, class: 'active-red' },
            { text: 'giảm tới 90% token', start: 6.0, end: 9.0, class: 'active-yellow' }
        ],
        slide_head_problem: [
            { text: 'nhồi hàng vạn token rác', start: 2.0, end: 5.5, class: 'active-red' },
            { text: 'ngốn tiền kinh khủng', start: 6.0, end: 9.0, class: 'active-red' }
        ],
        slide_head_compress: [
            { text: 'bộ nén thông minh SmartCrusher', start: 2.0, end: 5.5, class: 'active-cyan' },
            { text: 'loại bộ boilerplate', start: 6.0, end: 9.5, class: 'active-yellow' }
        ],
        slide_head_ccr: [
            { text: 'lưu bản gốc cục bộ', start: 2.8, end: 5.8, class: 'active-cyan' },
            { text: 'truy xuất lại bản gốc', start: 7.2, end: 11.2, class: 'active-green' }
        ],
        slide_head_integration: [
            { text: 'thư viện Python/TS', start: 2.2, end: 4.8, class: 'active-cyan' },
            { text: 'dựng Proxy trung gian', start: 5.2, end: 8.2, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_head_intro', 'slide_head_problem', 'slide_head_compress', 'slide_head_ccr', 'slide_head_integration'
    ];

    function sceneWrap(inner) {
        return `<div class="v62-zoom-container"><div class="v62-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_head_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v62-scene-row v62-hook-row">
                    <!-- Background Cyber Decoration Rings -->
                    <div class="v62-decor-ring ring-outer"></div>
                    <div class="v62-decor-ring ring-inner"></div>

                    <!-- Github Header Block -->
                    <div class="v62-github-header">
                        <div class="v62-repo-meta">
                            <i data-lucide="github" class="v62-github-icon"></i>
                            <span class="v62-repo-name">headroomlabs-ai/headroom</span>
                        </div>
                        <img src="/static/videos/github_trending_badge.svg" class="v62-trending-badge" alt="Github Trending Badge">
                    </div>

                    <!-- Large Mockup Screen Frame -->
                    <div class="v62-photo-frame" id="s-intro-photo-frame" style="width: 560px; height: 310px; border-radius: 16px;">
                        <!-- Tech corners -->
                        <div class="v62-hud-corner tl"></div>
                        <div class="v62-hud-corner tr"></div>
                        <div class="v62-hud-corner bl"></div>
                        <div class="v62-hud-corner br"></div>

                        <img src="/static/videos/headroom_screenshot.png" class="v62-photo-img" alt="Headroom Screenshot">

                        <!-- Stars count overlay -->
                        <div class="v62-stars-badge">
                            <i data-lucide="star" class="v62-star-icon"></i>
                            <span class="v62-stars-count" id="s-intro-stars-count">0</span>
                        </div>
                    </div>

                    <!-- News ticker box below -->
                    <div class="v62-ticker-box" style="margin-top: 15px;">
                        <div class="v62-ticker-badge">TRENDING</div>
                        <div class="v62-ticker-text" id="s-intro-ticker-text">LOADING DATAFEED...</div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_head_problem') {
            canvas.innerHTML = sceneWrap(`
                <div class="v62-scene-row">
                    <div class="v62-problem-grid">
                        <!-- Left: Large Bloated Code / Log Mockup -->
                        <div class="v62-editor-frame" id="s-prob-editor">
                            <div class="v62-editor-hdr">
                                <div class="mac-dots">
                                    <span class="dot close"></span>
                                    <span class="dot minimize"></span>
                                    <span class="dot maximize"></span>
                                </div>
                                <span class="editor-title">logs_debug_verbose.json</span>
                            </div>
                            <div class="v62-editor-body" style="position:relative;">
                                <!-- Matrix digital stream grid -->
                                <div class="v62-matrix-rain"></div>
                                <div class="v62-code-line"><span class="c-dim">{</span></div>
                                <div class="v62-code-line"><span class="c-key">  "timestamp":</span> <span class="c-val">"2026-06-26T14:24:02Z"</span>,</div>
                                <div class="v62-code-line"><span class="c-key">  "level":</span> <span class="c-val">"VERBOSE_DEBUG"</span>,</div>
                                <div class="v62-code-line"><span class="c-key">  "stack_trace":</span> <span class="c-err">"Error: Connection reset by peer at Socket.connect (node:net:1024) at Client.connect... [150 lines of call stack...]"</span>,</div>
                                <div class="v62-code-line"><span class="c-key">  "metadata":</span> <span class="c-dim">{ "ip": "127.0.0.1", "agent": "Aider/0.4.1", "token": "..." }</span></div>
                                <div class="v62-code-line"><span class="c-dim">}</span></div>
                            </div>
                        </div>

                        <!-- Right: Costs and Token Burn Dashboard -->
                        <div class="v62-stats-panel" id="s-prob-stats">
                            <div class="v62-stat-card bad">
                                <span class="lbl">TOTAL PROMPT CONTEXT</span>
                                <span class="val" id="s-prob-token-count">38,400 Tkn</span>
                            </div>
                            <div class="v62-stat-card bad">
                                <span class="lbl">ESTIMATED COST / CALL</span>
                                <span class="val" id="s-prob-price-count">$0.58</span>
                            </div>
                            <div class="v62-alert-banner" id="s-prob-alert">
                                <i data-lucide="alert-octagon" class="pulse-icon"></i>
                                <span>CONTEXT OVERLOAD WARNING!</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_head_compress') {
            canvas.innerHTML = sceneWrap(`
                <div class="v62-scene-row">
                    <div class="v62-compress-board">
                        <!-- Before & After AST compression visualization -->
                        <div class="v62-compare-columns">
                            <!-- Left: Raw Boilerplate code -->
                            <div class="v62-comp-col" id="s-comp-before-card">
                                <span class="col-lbl red">RAW BOILERPLATE (100%)</span>
                                <div class="v62-mini-code">
                                    <div class="code-row strike"><span class="c-keyword">import</span> * <span class="c-keyword">as</span> react <span class="c-keyword">from</span> <span class="c-string">'react'</span>;</div>
                                    <div class="code-row strike"><span class="c-comment">// Validate auth headers</span></div>
                                    <div class="code-row strike"><span class="c-comment">// for current user session</span></div>
                                    <div class="code-row"><span class="c-keyword">function</span> <span class="c-fn">verify</span>(req) {</div>
                                    <div class="code-row strike">  <span class="c-keyword">const</span> auth = req.headers.auth;</div>
                                    <div class="code-row">  <span class="c-keyword">return</span> auth ? <span class="c-fn">decode</span>(auth) : <span class="c-keyword">null</span>;</div>
                                    <div class="code-row">}</div>
                                </div>
                            </div>

                            <!-- Arrow indicators -->
                            <div class="v62-middle-arrow">
                                <i data-lucide="chevrons-right" class="arrow-icon"></i>
                            </div>

                            <!-- Right: AST Compressed structure -->
                            <div class="v62-comp-col" id="s-comp-after-card">
                                <span class="col-lbl cyan">AST COMPRESSED (10%)</span>
                                <div class="v62-mini-code cyan-theme">
                                    <div class="code-row"><span class="c-fn">verify</span>(req) {</div>
                                    <div class="code-row">  <span class="c-keyword">return</span> <span class="c-fn">decode</span>(req.headers.auth);</div>
                                    <div class="code-row">}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Progress Bar & Compression Win Indicator -->
                        <div class="v62-progress-area" id="s-comp-progress-area" style="position: relative; overflow: visible;">
                            <div class="progress-hdr">
                                <span>Compressing Context...</span>
                                <span class="percentage" id="s-comp-percent">0%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" id="s-comp-bar"></div>
                            </div>
                            <div class="v62-win-badge" id="s-comp-win-badge">
                                <i data-lucide="sparkles"></i> SAVED <span class="v62-win-highlight">90%</span> TOKENS
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_head_ccr') {
            canvas.innerHTML = sceneWrap(`
                <div class="v62-scene-row">
                    <!-- Dynamic Cache Lookup Loop -->
                    <div class="v62-ccr-workspace">
                        <!-- Left Node: LLM Agent -->
                        <div class="v62-ccr-node" id="s-ccr-llm">
                            <div class="v62-node-ring"></div>
                            <span class="icon"><i data-lucide="brain"></i></span>
                            <span class="lbl">LLM AGENT</span>
                        </div>

                        <!-- Connection Paths -->
                        <svg class="v62-ccr-svg" viewBox="0 0 460 260">
                            <!-- Loop lines -->
                            <path class="ccr-path" id="s-ccr-path-request" d="M 90 90 Q 230 40 370 90" />
                            <path class="ccr-path" id="s-ccr-path-response" d="M 370 170 Q 230 220 90 170" />
                            <circle class="ccr-particle" id="s-ccr-particle-request" cx="90" cy="90" r="7" fill="var(--v62-primary)" />
                            <circle class="ccr-particle" id="s-ccr-particle-response" cx="370" cy="170" r="7" fill="var(--v62-green)" />
                        </svg>

                        <!-- Right Node: Local Content Router & Cache -->
                        <div class="v62-ccr-node" id="s-ccr-cache">
                            <div class="v62-node-ring"></div>
                            <span class="icon"><i data-lucide="database"></i></span>
                            <span class="lbl">LOCAL CACHE</span>
                        </div>

                        <!-- Floating Hash Code Bubble in between -->
                        <div class="v62-hash-bubble" id="s-ccr-hash-box">
                            <span class="hash-lbl">BREADCRUMB HASH</span>
                            <span class="hash-code">#hr-ccr-7d1a</span>
                        </div>

                        <!-- Slide-in Details panel: The Recovered Original Log -->
                        <div class="v62-original-payload-panel" id="s-ccr-payload">
                            <div class="payload-hdr"><i data-lucide="check-circle" class="icon-inline"></i> CCR SUCCESS: RESTORED ORIGINAL CONTENT</div>
                            <pre class="payload-body">Original verbose logs retrieved from local store. LLM successfully answered prompt without token cost.</pre>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_head_integration') {
            canvas.innerHTML = sceneWrap(`
                <div class="v62-scene-row">
                    <div class="v62-integration-container">
                        <!-- Card 1: Library -->
                        <div class="v62-card v62-integration-card" id="s-int-card-1">
                            <div class="v62-int-icon-wrap code">
                                <i data-lucide="code-2"></i>
                            </div>
                            <h3>Library SDK</h3>
                            <p>Tích hợp trực tiếp <code>compress(messages)</code> trong Python hoặc TypeScript.</p>
                            <span class="v62-int-tag">Python & TS</span>
                        </div>

                        <!-- Card 2: Proxy -->
                        <div class="v62-card v62-integration-card" id="s-int-card-2">
                            <div class="v62-int-icon-wrap server">
                                <i data-lucide="server"></i>
                            </div>
                            <h3>Headroom Proxy</h3>
                            <p>Dựng cổng trung gian giữa app và LLM API. Không cần sửa code.</p>
                            <span class="v62-int-tag">Zero Code Change</span>
                        </div>

                        <!-- Card 3: Wrap CLI -->
                        <div class="v62-card v62-integration-card" id="s-int-card-3">
                            <div class="v62-int-icon-wrap terminal">
                                <i data-lucide="terminal"></i>
                            </div>
                            <h3>Agent Wrap CLI</h3>
                            <p>Tăng tốc các Agent CLI như Cursor, Claude Code, Aider, Copilot.</p>
                            <span class="v62-int-tag">Aider & Claude Code</span>
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
        const row = canvas.querySelector('.v62-scene-row');
        if (!row) return;

        // Slide 1: Flow System particle movement and halo rotation
        if (slideId === 'slide_head_intro') {
            const frame = row.querySelector('#s-intro-photo-frame');
            const starsCount = row.querySelector('#s-intro-stars-count');
            const tickerText = row.querySelector('#s-intro-ticker-text');
            const ringOuter = row.querySelector('.ring-outer');
            const ringInner = row.querySelector('.ring-inner');

            if (frame) {
                // Floating tilt animation
                const yShift = Math.sin(progress * 12) * 5;
                const xRot = Math.sin(progress * 7) * 2;
                const yRot = Math.cos(progress * 7) * 2;
                frame.style.transform = `translateY(${yShift}px) rotateX(${xRot}deg) rotateY(${yRot}deg)`;
                
                const glowSize = 12 + Math.sin(progress * 15) * 5;
                frame.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 ${glowSize}px var(--v62-primary-glow)`;
            }

            // Animate stars from 0 to 51,300 (or "51.3k")
            if (starsCount) {
                const targetStars = 51300;
                // easeOutQuad progress
                const factor = Math.min(1.0, progress / 0.85);
                const ease = factor * (2 - factor);
                const curStars = Math.round(ease * targetStars);
                if (curStars >= 1000) {
                    starsCount.textContent = (curStars / 1000).toFixed(1) + 'k';
                } else {
                    starsCount.textContent = curStars.toString();
                }
            }

            if (ringOuter) ringOuter.style.transform = `translate(-50%, -50%) rotate(${progress * 90}deg)`;
            if (ringInner) ringInner.style.transform = `translate(-50%, -50%) rotate(${-progress * 150}deg)`;

            if (tickerText) {
                const fullText = "GITHUB TRENDING #1 • 51.3K STARS • CONTEXT COMPRESSION • REDUCE TOKEN COST BY 90%";
                const chars = Math.floor(progress * fullText.length);
                tickerText.textContent = fullText.slice(0, chars) + (progress < 0.98 ? "_" : "");
            }

            // Spawn floating neon dot-particles inside the photo frame
            let lastSpawnTime = parseFloat(canvas.getAttribute('data-last-spawn') || '0');
            if (progress - lastSpawnTime > 0.06 && progress < 0.95) {
                canvas.setAttribute('data-last-spawn', progress.toString());
                const container = row.querySelector('#s-intro-photo-frame');
                if (container) {
                    const particle = document.createElement('div');
                    particle.className = 'v62-dot-particle';
                    particle.style.background = Math.random() > 0.5 ? 'var(--v62-cyan)' : 'var(--v62-primary)';
                    particle.style.boxShadow = `0 0 8px ${particle.style.background}`;
                    const left = 5 + Math.random() * 90;
                    particle.style.left = `${left}%`;
                    particle.style.bottom = '5%';
                    particle.style.animationDuration = `${1.2 + Math.random() * 1.5}s`;
                    container.appendChild(particle);
                    
                    setTimeout(() => particle.remove(), 2500);
                }
            }
        }

        // Slide 2: Problem Slide (Warning alerts, counting tokens/price up)
        else if (slideId === 'slide_head_problem') {
            const editor = row.querySelector('#s-prob-editor');
            const stats = row.querySelector('#s-prob-stats');
            const tknCount = row.querySelector('#s-prob-token-count');
            const priceCount = row.querySelector('#s-prob-price-count');
            const alertBanner = row.querySelector('#s-prob-alert');

            if (editor) {
                // Subtle tilt & vibration when active
                const rotX = Math.sin(progress * 15) * 0.8;
                const rotY = Math.cos(progress * 15) * 0.8;
                editor.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                
                // Shake editor on progress triggers
                if (progress > 0.3 && progress < 0.8) {
                    const shakeX = (Math.random() - 0.5) * 3;
                    const shakeY = (Math.random() - 0.5) * 3;
                    editor.style.transform += ` translate(${shakeX}px, ${shakeY}px)`;
                }
            }

            if (stats) {
                stats.style.opacity = '1';
                stats.style.transform = 'translateY(0)';
            }

            // Count tokens upwards rapidly
            if (tknCount) {
                const maxTokens = 38400;
                const curTokens = Math.round(progress * maxTokens);
                tknCount.textContent = `${curTokens.toLocaleString()} Tkn`;
            }

            // Count prices
            if (priceCount) {
                const maxPrice = 0.58;
                const curPrice = (progress * maxPrice).toFixed(2);
                priceCount.textContent = `$${curPrice}`;
            }

            // Toggle alert flashing
            if (alertBanner && progress > 0.45) {
                alertBanner.classList.add('active');
            } else if (alertBanner) {
                alertBanner.classList.remove('active');
            }
        }

        // Slide 3: Compression animation
        else if (slideId === 'slide_head_compress') {
            const bar = row.querySelector('#s-comp-bar');
            const percent = row.querySelector('#s-comp-percent');
            const winBadge = row.querySelector('#s-comp-win-badge');
            const beforeCard = row.querySelector('#s-comp-before-card');
            const afterCard = row.querySelector('#s-comp-after-card');

            const factor = Math.min(1.0, progress / 0.85);
            const ease = factor * (2 - factor); // easeOutQuad
            const pctVal = Math.round(100 - (ease * 90));

            if (bar) {
                bar.style.width = `${pctVal}%`;
                const hue = ((100 - pctVal) / 90) * 140;
                bar.style.background = `linear-gradient(90deg, hsl(${hue}, 85%, 45%), hsl(${hue}, 85%, 55%))`;
                bar.style.boxShadow = `0 0 12px hsla(${hue}, 85%, 50%, 0.45)`;
            }
            if (percent) {
                percent.textContent = `${pctVal}%`;
                const hue = ((100 - pctVal) / 90) * 140;
                percent.style.color = `hsl(${hue}, 90%, 55%)`;
            }

            // Strike code rows sequentially in raw card
            if (beforeCard) {
                const strikeRows = beforeCard.querySelectorAll('.code-row.strike');
                strikeRows.forEach((item, index) => {
                    const triggerLimit = 0.15 + (index * 0.12);
                    if (progress >= triggerLimit) {
                        item.classList.add('active-strike');
                    } else {
                        item.classList.remove('active-strike');
                    }
                });
            }

            // Cards scale shifts
            if (progress > 0.5) {
                if (beforeCard) beforeCard.style.opacity = '0.35';
                if (afterCard) {
                    afterCard.style.opacity = '1';
                    afterCard.style.transform = 'scale(1.08)';
                    afterCard.style.boxShadow = '0 15px 35px rgba(6,182,212,0.15)';
                }
            } else {
                if (beforeCard) beforeCard.style.opacity = '1';
                if (afterCard) {
                    afterCard.style.opacity = '0.5';
                    afterCard.style.transform = 'scale(0.95)';
                    afterCard.style.boxShadow = 'none';
                }
            }

            // TRIGGER SPARK EXPLOSION ONCE when compression hits
            if (progress > 0.8 && !canvas.v62SparksSpawned) {
                canvas.v62SparksSpawned = true;
                const area = row.querySelector('#s-comp-progress-area');
                if (area) {
                    for (let i = 0; i < 25; i++) {
                        const spark = document.createElement('div');
                        spark.className = 'v62-spark';
                        spark.style.left = '50%';
                        spark.style.top = '20%';
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 70 + Math.random() * 100;
                        spark.style.background = Math.random() > 0.5 ? 'var(--v62-cyan)' : 'var(--v62-primary)';
                        spark.style.boxShadow = `0 0 10px ${spark.style.background}`;
                        area.appendChild(spark);
                        
                        setTimeout(() => {
                            spark.style.transition = 'all 0.8s cubic-bezier(0.1, 0.8, 0.1, 1)';
                            spark.style.transform = `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px) scale(0)`;
                            spark.style.opacity = '0';
                        }, 10);
                        
                        setTimeout(() => spark.remove(), 900);
                    }
                }
            }
            if (progress < 0.2) {
                canvas.v62SparksSpawned = false;
            }

            // Show win badge at the end of progress
            if (winBadge && progress > 0.75) {
                winBadge.classList.add('active');
            } else if (winBadge) {
                winBadge.classList.remove('active');
            }
        }

        // Slide 4: CCR Lossless Recovery (Hash code, cache lookup, slide-in payload)
        else if (slideId === 'slide_head_ccr') {
            const llm = row.querySelector('#s-ccr-llm');
            const cache = row.querySelector('#s-ccr-cache');
            const hashBox = row.querySelector('#s-ccr-hash-box');
            const payload = row.querySelector('#s-ccr-payload');
            const pReq = row.querySelector('#s-ccr-particle-request');
            const pRes = row.querySelector('#s-ccr-particle-response');

            // 1. Initial State: LLM active, sends hash code request
            if (progress <= 0.3) {
                if (llm) llm.classList.add('active');
                if (cache) cache.classList.remove('active');
                if (hashBox) {
                    hashBox.style.opacity = (progress / 0.3).toString();
                    hashBox.style.transform = `translate(-50%, -50%) scale(${0.5 + (progress / 0.3) * 0.5})`;
                }
                if (payload) payload.classList.remove('active');

                // Animate request particle
                const pathReq = row.querySelector('#s-ccr-path-request');
                if (pathReq && pReq) {
                    const localProg = progress / 0.3;
                    const pt = pathReq.getPointAtLength(localProg * (pathReq.getTotalLength() || 160));
                    pReq.setAttribute('cx', pt.x.toString());
                    pReq.setAttribute('cy', pt.y.toString());
                    pReq.setAttribute('opacity', '1');
                }
                if (pRes) pRes.setAttribute('opacity', '0');
            } 
            // 2. Mid State: Hit cache, content found
            else if (progress > 0.3 && progress <= 0.6) {
                if (llm) llm.classList.remove('active');
                if (cache) cache.classList.add('active');
                if (pReq) pReq.setAttribute('opacity', '0');

                // Animate response particle
                const pathRes = row.querySelector('#s-ccr-path-response');
                if (pathRes && pRes) {
                    const localProg = (progress - 0.3) / 0.3;
                    const pt = pathRes.getPointAtLength(localProg * (pathRes.getTotalLength() || 160));
                    pRes.setAttribute('cx', pt.x.toString());
                    pRes.setAttribute('cy', pt.y.toString());
                    pRes.setAttribute('opacity', '1');
                }
            } 
            // 3. Final State: Original content loaded, success banner active
            else {
                if (llm) llm.classList.add('active');
                if (cache) cache.classList.add('active');
                if (pReq) pReq.setAttribute('opacity', '0');
                if (pRes) pRes.setAttribute('opacity', '0');
                
                if (payload) {
                    payload.classList.add('active');
                }
            }

            // Animate node rings pulsing based on active state
            if (llm && llm.classList.contains('active')) {
                const ring = llm.querySelector('.v62-node-ring');
                if (ring) {
                    const size = 1.0 + Math.sin(progress * 30) * 0.15;
                    ring.style.transform = `translate(-50%, -50%) scale(${size})`;
                    ring.style.opacity = (1.0 - (progress * 30 % 2) / 2).toString();
                }
            }
            if (cache && cache.classList.contains('active')) {
                const ring = cache.querySelector('.v62-node-ring');
                if (ring) {
                    const size = 1.0 + Math.sin(progress * 25) * 0.15;
                    ring.style.transform = `translate(-50%, -50%) scale(${size})`;
                    ring.style.opacity = (1.0 - (progress * 25 % 2) / 2).toString();
                }
            }
        }
        // Slide 5: Integration Custom Staggered Animation
        else if (slideId === 'slide_head_integration') {
            const card1 = row.querySelector('#s-int-card-1');
            const card2 = row.querySelector('#s-int-card-2');
            const card3 = row.querySelector('#s-int-card-3');

            const popCard = (card, start, end) => {
                if (!card) return;
                if (progress < start) {
                    card.style.opacity = '1';
                    card.style.filter = 'grayscale(100%)';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                } else if (progress > end) {
                    card.style.opacity = '1';
                    card.style.filter = 'none';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    const local = (progress - start) / (end - start);
                    const scale = 0.96 + local * 0.04;
                    const y = 15 - local * 15;
                    const grayVal = 100 - local * 100;
                    card.style.opacity = '1';
                    card.style.filter = `grayscale(${grayVal}%)`;
                    card.style.transform = `translateY(${y}px) scale(${scale})`;
                }
            };

            popCard(card1, 0.05, 0.25);
            popCard(card2, 0.25, 0.45);
            popCard(card3, 0.45, 0.65);

            // Floating dynamic bounce for cards once loaded
            const floatCard = (card, speedOffset) => {
                if (!card) return;
                const yShift = Math.sin(progress * 12 + speedOffset) * 4;
                card.style.transform = `translateY(${yShift}px)`;
            };

            if (progress > 0.65) {
                floatCard(card1, 0);
                floatCard(card2, 2.5);
                floatCard(card3, 5.0);
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video62',
        topic: 'Headroom Context Compression',
        episodeNum: 62,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video62 Plugin] Loaded: Headroom LLM Prompt Context Compression.');
})();
