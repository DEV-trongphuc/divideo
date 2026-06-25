/**
 * Video 34: Real-time Chat — WebSockets & Redis Pub/Sub (Premium UI Redesign)
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_chat_intro_a: [
            { text: 'tức thì', start: 1.0, end: 5.0, class: 'active-gold' }
        ],
        slide_chat_intro_b: [
            { text: 'WebSocket', start: 0.5, end: 5.0, class: 'active-good' }
        ],
        slide_chat_http: [
            { text: 'Request', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: 'không thể tự đẩy', start: 7.0, end: 13.0, class: 'active-bad' }
        ],
        slide_chat_polling: [
            { text: 'ba giây', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'ba nghìn request', start: 8.0, end: 17.0, class: 'active-bad' }
        ],
        slide_chat_websocket_intro: [
            { text: 'hai chiều', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'mili-giây', start: 8.0, end: 14.0, class: 'active-gold' }
        ],
        slide_chat_ws_handshake: [
            { text: 'Upgrade', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: '101', start: 7.0, end: 13.0, class: 'active-good' }
        ],
        slide_chat_ws_flow: [
            { text: 'WebSocket frame', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'tức thì', start: 8.0, end: 15.0, class: 'active-good' }
        ],
        slide_chat_scale_problem: [
            { text: 'Server 1', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'Server 2', start: 8.0, end: 14.0, class: 'active-bad' }
        ],
        slide_chat_redis_pubsub: [
            { text: 'Pub/Sub', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'broadcast', start: 8.0, end: 15.0, class: 'active-good' }
        ],
        slide_chat_full_arch: [
            { text: 'Load Balancer', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'Redis', start: 8.0, end: 16.0, class: 'active-good' }
        ],
        slide_chat_compare: [
            { text: '50 mili-giây', start: 1.0, end: 10.0, class: 'active-good' },
            { text: 'WebSocket', start: 10.0, end: 16.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_chat_intro_a', 'slide_chat_intro_b', 'slide_chat_http', 'slide_chat_polling',
        'slide_chat_websocket_intro', 'slide_chat_ws_handshake', 'slide_chat_ws_flow',
        'slide_chat_scale_problem', 'slide_chat_redis_pubsub', 'slide_chat_full_arch',
        'slide_chat_compare', 'slide_chat_outro'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute, tint) {
        const bgClass = tint ? ` v34-scene-bg ${tint}` : ' v34-scene-bg';
        const absHtml = absolute || '';
        return `<div class="v34-zoom-container"><div class="${bgClass.trim()}"></div>${absHtml}<div class="v34-scene-content">${inner}</div></div>`;
    }

    function nodeIcon(icon, color) {
        return `<div class="v34-node-icon-wrap"><i data-lucide="${icon}" style="width:16px;height:16px;color:${color || '#fff'};"></i></div>`;
    }

    function makeKeyboardHTML() {
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];
        let html = '<div class="v34-keyboard">';
        rows.forEach(row => {
            html += '<div class="v34-keyboard-row">';
            row.forEach(key => {
                html += `<div class="v34-kb-key key-${key}">${key}</div>`;
            });
            html += '</div>';
        });
        html += '<div class="v34-keyboard-row space-row"><div class="v34-kb-key key-space">space</div></div>';
        html += '</div>';
        return html;
    }

    function makeVoiceBubbleHTML(isSender, isAnimating, durationText) {
        const alignClass = isSender ? 'sent' : 'recv';
        const animClass = isAnimating ? ' animating' : '';
        const dur = durationText || '0:04';
        let html = `<div class="v34-bubble v34-voice-bubble ${alignClass} visible${animClass}"><div class="v34-voice-play-btn"><i data-lucide="play" style="width:10px;height:10px;fill:currentColor;color:#fff;"></i></div><div class="v34-voice-waveform-grid">`;
        for (let col = 0; col < 12; col++) {
            html += `<div class="v34-wave-bar"><div class="v34-wave-dot"></div><div class="v34-wave-dot"></div><div class="v34-wave-dot"></div></div>`;
        }
        html += `</div><span class="v34-voice-duration">${dur}</span><div class="v34-bubble-meta">${isSender ? 'Gửi ✓' : 'vừa xong'}</div></div>`;
        return html;
    }

    function phoneMock(id, name, isSender) {
        const titleText = name === 'Alice' ? '👩‍💻 User A (Alice)' : '👨‍💻 User B (Bob)';
        const inputDefault = isSender ? 'Xin chào...' : 'Nhập tin nhắn...';
        return `
        <div class="v34-phone" id="${id}">
            <div class="v34-phone-title">
                <span class="v34-online-dot"></span>
                <span>${titleText}</span>
            </div>
            <div class="v34-chat-area" id="${id}-chat"></div>
            <div class="v34-phone-bottom">
                <div class="v34-input-row">
                    <div class="v34-input-display" id="${id}-input">${inputDefault}</div>
                    <i data-lucide="${isSender ? 'send' : 'image'}" class="v34-input-icon ${isSender ? '' : 'muted'}"></i>
                </div>
                ${makeKeyboardHTML()}
            </div>
        </div>`;
    }

    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.5;
        return {
            x: (rect.left - contRect.left + rect.width / 2) / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
    }

    function getNodeConnectionPoint(node, targetNode, container) {
        if (!node || !container) return { x: 0, y: 0 };
        const center = getCenterOffset(node, container);
        if (!targetNode) return center;
        
        const targetCenter = getCenterOffset(targetNode, container);
        const dx = targetCenter.x - center.x;
        const dy = targetCenter.y - center.y;
        
        const rect = node.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.5;
        
        const w = rect.width / zoom;
        const h = rect.height / zoom;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            return {
                x: center.x + (dx > 0 ? w / 2 : -w / 2),
                y: center.y
            };
        } else {
            return {
                x: center.x,
                y: center.y + (dy > 0 ? h / 2 : -h / 2)
            };
        }
    }

    function getPathPoint(start, end, t) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 5) return { x: start.x + dx * t, y: start.y + dy * t };
        const mt = 1 - t;
        return {
            x: mt * mt * mt * start.x + 3 * mt * mt * t * (start.x + dx * 0.4)
                + 3 * mt * t * t * (end.x - dx * 0.4) + t * t * t * end.x,
            y: mt * mt * mt * start.y + 3 * mt * mt * t * start.y
                + 3 * mt * t * t * end.y + t * t * t * end.y
        };
    }

    function drawSVGPath(canvas, pathId, startNode, endNode, container, flowClass) {
        const path = canvas.querySelector(pathId);
        if (!path || !startNode || !endNode || !container) return;
        const start = getNodeConnectionPoint(startNode, endNode, container);
        const end = getNodeConnectionPoint(endNode, startNode, container);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 5) {
            path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
        } else {
            path.setAttribute('d', `M ${start.x} ${start.y} C ${start.x + dx * 0.4} ${start.y}, ${end.x - dx * 0.4} ${end.y}, ${end.x} ${end.y}`);
        }
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '6 5');
        path.setAttribute('class', flowClass || 'flowing');
    }

    function placePacket(wrap, start, end, t) {
        if (!wrap) return;
        const pt = getPathPoint(start, end, t);
        wrap.style.left = `${pt.x}px`;
        wrap.style.top = `${pt.y}px`;
        wrap.classList.add('visible');
    }

    function hidePacket(wrap) {
        if (wrap) wrap.classList.remove('visible');
    }

    // HTML Component Generators
    function serverMockHTML(idPrefix, title, statusLabel, activeLed, codeText, isError, customBody) {
        const ledClass = isError ? 'active error' : (activeLed ? 'active' : '');
        const activeColorClass = isError ? 'glow-red' : (activeLed ? 'active-green' : '');
        const bodyContent = customBody || `
            <span class="v34-term-title">Web Logs: ${statusLabel || 'Idle'}</span>
            <div class="v34-term-log" id="${idPrefix}-term-log">${codeText || 'Waiting for HTTP requests...'}</div>
        `;
        return `
        <div class="v34-server-mock ${activeColorClass}" id="${idPrefix}-server">
            <div class="v34-server-header">
                <div class="v34-server-title-bar">
                    <i data-lucide="server" style="width:11px;height:11px;color:var(--chat-green);"></i>
                    <span>${title || 'Web Server'}</span>
                </div>
                <div class="v34-server-leds">
                    <div class="v34-server-led ${ledClass}"></div>
                    <div class="v34-server-led"></div>
                </div>
            </div>
            <div class="v34-server-terminal">
                ${bodyContent}
            </div>
        </div>`;
    }

    function redisHubHTML(idPrefix, title, isBursting) {
        const burstClass = isBursting ? ' burst' : '';
        return `
        <div class="v34-redis-hub" id="${idPrefix}-redis-hub" style="width: 140px; height: 110px;">
            <div class="v34-redis-ring r1"></div>
            <div class="v34-redis-ring r2"></div>
            <div class="v34-redis-ring r3"></div>
            <div class="v34-redis-core${burstClass}" id="${idPrefix}-redis-core" style="width: 115px; height: 90px; border-radius: 10px; flex-direction: column; padding: 6px 8px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
                <div style="display:flex; align-items:center; gap:4px; margin-bottom: 2px;">
                    <i data-lucide="database" style="width:11px;height:11px;color:var(--chat-purple);"></i>
                    <span style="font-size: 7.5px; font-weight: 900; color: var(--chat-purple); text-transform: uppercase;">Redis Pub/Sub</span>
                </div>
                <div class="v34-redis-channels-grid">
                    <div class="v34-channel-cell" id="v34-chan-41">room:41</div>
                    <div class="v34-channel-cell" id="v34-chan-42">room:42</div>
                    <div class="v34-channel-cell" id="v34-chan-43">room:43</div>
                </div>
            </div>
        </div>`;
    }

    function databasePanelHTML(idPrefix, title, activeRowIndex, scanActive) {
        const rows = [
            { id: 'usr_b', server: 'WS Server 2' }
        ];
        let rowsHtml = '';
        rows.forEach((r, idx) => {
            const isHl = idx === activeRowIndex ? ' active-hl' : '';
            rowsHtml += `
            <div class="v34-db-row-item${isHl}">
                <span>ID: ${r.id}</span>
                <span>Node: ${r.server}</span>
            </div>`;
        });

        return `
        <div class="v34-db-panel" id="${idPrefix}-db-panel">
            <div class="v34-db-header">
                <i data-lucide="database" style="width:11px;height:11px;color:var(--chat-purple);"></i>
                <span>${title || 'Session Store'}</span>
            </div>
            <div class="v34-db-body-layout">
                <div class="v34-db-cylinder" id="${idPrefix}-db-cylinder">
                    <div class="v34-db-cylinder-ring"></div>
                    <div class="v34-db-cylinder-ring"></div>
                </div>
                <div class="v34-db-rows" style="position:relative;">
                    ${rowsHtml}
                </div>
            </div>
        </div>`;
    }

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        }
        if (!needsTemplate) return;

        if (slideId === 'slide_chat_intro_a') {
            canvas.innerHTML = `
                <div class="v34-scene-wrapper-hook">
                    <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
                        <div class="v34-messages-intro-container">
                            <div class="v34-messages-glow-ring"></div>
                            <div class="v34-messages-glow-ring inner"></div>
                            <div class="v34-giant-messages-logo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Google_Messages_icon_%282022%29.svg/1280px-Google_Messages_icon_%282022%29.svg.png" alt="Google Messages" />
                            </div>
                        </div>
                        <div class="v34-glass-card" style="text-align: center; width: 440px; padding: 18px 24px; margin-top: 15px; border: 1.5px solid rgba(59, 130, 246, 0.4); background: rgba(10, 12, 15, 0.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55);">
                            <div style="margin-bottom: 8px; font-size: 14px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(59, 130, 246, 0.4); background: rgba(59, 130, 246, 0.1); color: var(--chat-blue); border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                <i data-lucide="message-square" style="width: 14px; height: 14px; color: var(--chat-blue);"></i> Chat Protocol
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size: 15px; font-weight: bold; color: var(--chat-blue); line-height: 1.45;">
                                Tin nhắn tức thì: Vì sao chat WebSocket không cần F5?
                            </div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_chat_intro_b') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-phones-row intro-layout">
                    ${phoneMock('v34-phone-alice', 'Alice', true)}
                    <div class="v34-intro-connector" id="v34-intro-connector">
                        <div class="v34-connector-line" id="v34-intro-line-l"></div>
                        <div class="v34-zap-hub" id="v34-intro-hub">
                            <i data-lucide="zap" style="color:#fff;" id="v34-intro-zap"></i>
                            <span class="v34-latency-pill" id="v34-intro-latency">&lt;50ms</span>
                        </div>
                        <div class="v34-connector-line" id="v34-intro-line-r"></div>
                    </div>
                    ${phoneMock('v34-phone-bob', 'Bob', false)}
                </div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;margin-top:15px;width:440px;padding:12px 20px;margin-left:auto;margin-right:auto;">
                    <span class="v34-status-badge green"><i data-lucide="message-circle" style="width:12px;height:12px;"></i> Real-time</span>
                    <span style="color:#fff;" id="v34-intro-status">Đang gửi tin nhắn...</span>
                </div>`, null, 'green-tint');
            canvas.querySelector('#v34-phone-alice-chat').innerHTML =
                makeVoiceBubbleHTML(true, true, '0:04').replace('v34-voice-bubble', 'v34-voice-bubble" id="v34-intro-sent');
            canvas.querySelector('#v34-phone-bob-chat').innerHTML =
                '<div class="v34-typing" id="v34-intro-typing"><span></span><span></span><span></span></div>' +
                makeVoiceBubbleHTML(false, false, '0:04').replace('v34-voice-bubble', 'v34-voice-bubble" id="v34-intro-recv') +
                '<div class="v34-delivered-toast" id="v34-intro-toast"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Delivered instantly</div>';
            initIcons();
        }
        else if (slideId === 'slide_chat_http') {
            const inner = `
                <div class="v34-vertical-stack">
                    <div style="display:flex;justify-content:center;align-items:center;gap:64px;width:100%;position:relative;z-index:3;" id="v34-http-container">
                        <div class="v34-node active-blue" id="v34-http-client">
                            ${nodeIcon('monitor-smartphone', 'var(--chat-blue)')}
                            <span>Browser Client</span>
                            <span class="v34-node-sub">Chủ động Request</span>
                        </div>
                        ${serverMockHTML('v34-http', 'HTTP Server', 'Idle', false, 'Waiting for request...', false)}
                    </div>
                </div>
                <div class="v34-glass-card glow-red" style="display:flex;justify-content:space-between;align-items:center;margin-top:15px;padding:12px 20px;">
                    <span style="font-size:10px;font-weight:bold;color:var(--chat-text-muted);text-transform:uppercase;">HTTP Cycle</span>
                    <span style="color:var(--chat-red);" id="v34-http-status">Server không thể push chủ động</span>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container"><path id="v34-path-http-req" class="flow-blue" /><path id="v34-path-http-res" class="flow-green" /></svg>
                <div class="v34-packet-wrap" id="v34-http-pkt-req"><div class="v34-packet-core"></div><span class="v34-packet-label">GET /api/msgs</span></div>
                <div class="v34-packet-wrap" id="v34-http-pkt-res"><div class="v34-packet-core green"></div><span class="v34-packet-label">200 OK []</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute);
            initIcons();
        }
        else if (slideId === 'slide_chat_polling') {
            const inner = `
                <div class="v34-vertical-stack">
                    <div class="v34-bottom-nodes" id="v34-poll-container">
                        <div class="v34-node active-blue" id="v34-poll-client">
                            ${nodeIcon('refresh-cw', 'var(--chat-blue)')}
                            <span>Client Poll</span>
                            <span class="v34-node-sub">⏱ Every 3 seconds</span>
                        </div>
                        <div class="v34-poll-grid" id="v34-poll-grid">
                            ${Array.from({length: 12}, (_, i) => `
                                <div class="v34-poll-cell" id="v34-poll-cell-${i}">
                                    <i data-lucide="refresh-cw" class="icon-refresh"></i>
                                    <i data-lucide="x-circle" class="icon-fail" style="display:none; color: var(--chat-red);"></i>
                                    <i data-lucide="check-circle" class="icon-success" style="display:none; color: var(--chat-green);"></i>
                                    <span>#${i+1}</span>
                                </div>
                            `).join('')}
                        </div>
                        ${serverMockHTML('v34-poll', 'HTTP Server (Polling)', 'Idle', false, '', false, `
                            <div class="v34-poll-server-term-content">
                                <div class="poll-server-row">
                                    <span class="lbl">CPU LOAD:</span>
                                    <span class="val red" id="v34-poll-cpu-val">12%</span>
                                </div>
                                <div class="v34-metrics-bar" style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden; margin: 3px 0 6px 0;">
                                    <div class="v34-metrics-fill" id="v34-poll-cpu" style="width: 12%;"></div>
                                </div>
                                <div class="poll-server-row">
                                    <span class="lbl">REQ RATE:</span>
                                    <span class="val red" id="v34-poll-req-rate">0 req/s</span>
                                </div>
                                <div class="poll-server-row">
                                    <span class="lbl">EMPTY REQS:</span>
                                    <span class="val yellow" id="v34-poll-counter">0</span>
                                </div>
                            </div>
                        `)}
                    </div>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container"><path id="v34-path-poll" class="flow-red" /></svg>
                <div class="v34-packet-wrap" id="v34-poll-pkt"><div class="v34-packet-core red"></div><span class="v34-packet-label">GET []</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, 'red-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            const inner = `
                <div class="v34-tunnel-flow-layout">
                    <!-- Client side (Mini Browser/Console mockup) -->
                    <div class="v34-mini-browser" id="v34-ws-client-box">
                        <div class="v34-browser-header">
                            <div class="v34-browser-dots">
                                <div class="v34-browser-dot r"></div>
                                <div class="v34-browser-dot y"></div>
                                <div class="v34-browser-dot g"></div>
                            </div>
                            <span class="v34-browser-addr">wss://chat.dev</span>
                        </div>
                        <div class="v34-browser-console">
                            <div class="v34-console-line green">✓ Connected</div>
                            <div class="v34-console-line" style="font-size: 8px; color: var(--chat-text-muted);">Ready to stream</div>
                        </div>
                    </div>

                    <!-- Connection Tunnel Grid -->
                    <div class="v34-ws-tunnel-grid" id="v34-ws-tunnel-grid">
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-0"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-1"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-2"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-3"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-4"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-5"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-6"></div>
                        <div class="v34-tunnel-cell" id="v34-tunnel-cell-7"></div>
                    </div>

                    <!-- Server side (Mini Server Rack with LEDs) -->
                    <div class="v34-mini-server" id="v34-ws-server-box">
                        <div class="v34-server-header" style="background:#0d121f; border-bottom:1px solid rgba(255,255,255,0.05); padding:6px 8px; display:flex; align-items:center; justify-content:space-between;">
                            <div class="v34-server-title-bar" style="display:flex; align-items:center; gap:4px; font-size:8px; font-weight:800; color:#fff;">
                                <i data-lucide="server" style="width:11px;height:11px;color:var(--chat-green);"></i>
                                <span>WS NODE 01</span>
                            </div>
                            <div class="v34-server-leds">
                                <div class="v34-server-led active" style="width:4px;height:4px;"></div>
                            </div>
                        </div>
                        <div class="v34-server-terminal" style="flex:1; background:#05070c; padding:6px; display:flex; flex-direction:column; gap:3px; justify-content:center;">
                            <span class="v34-term-title" style="font-size:8px; color:var(--chat-text-muted); text-transform:uppercase; text-align:left;">Sockets</span>
                            <div class="v34-term-log success" style="font-size:8.5px; color:var(--chat-green); font-family: 'Fira Code', monospace; text-align:left;">Conn #42 open</div>
                        </div>
                    </div>
                </div>

                <!-- Connection Info Glass Card -->
                <div class="v34-glass-card glow-green" style="margin-top: 6px;">
                    <div class="v34-ws-metrics-grid">
                        <div class="v34-ws-metric-item">
                            <span class="m-label">Trạng thái:</span>
                            <span class="m-value gold" id="v34-ws-val-status">CONNECTING...</span>
                        </div>
                        <div class="v34-ws-metric-item">
                            <span class="m-label">Cơ chế:</span>
                            <span class="m-value gold">FULL-DUPLEX (2 chiều)</span>
                        </div>
                        <div class="v34-ws-metric-item">
                            <span class="m-label">Độ trễ:</span>
                            <span class="m-value cyan">&lt; 1ms</span>
                        </div>
                    </div>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container">
                    <path id="v34-path-ws-intro" class="flowing" />
                </svg>
                <div class="v34-packet-wrap" id="v34-ws-intro-pkt-fwd"><div class="v34-packet-core"></div><span class="v34-packet-label">SEND</span></div>
                <div class="v34-packet-wrap" id="v34-ws-intro-pkt-rev"><div class="v34-packet-core green"></div><span class="v34-packet-label">PUSH</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, 'green-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_ws_handshake') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-handshake-col">
                    <div class="v34-terminal" id="v34-hs-req-term">
                        <div class="v34-terminal-bar">
                            <div class="v34-terminal-dot r"></div><div class="v34-terminal-dot y"></div><div class="v34-terminal-dot g"></div>
                            <span class="v34-terminal-title">client → server</span>
                        </div>
                        <div class="v34-code-block">
                            <div class="v34-code-line" id="v34-hs-l1">GET /chat HTTP/1.1</div>
                            <div class="v34-code-line" id="v34-hs-l2">Host: api.chat.app</div>
                            <div class="v34-code-line" id="v34-hs-l3"><span class="hl-gold">Upgrade: websocket</span></div>
                            <div class="v34-code-line" id="v34-hs-l4"><span class="hl-gold">Connection: Upgrade</span></div>
                        </div>
                    </div>
                    <div class="v34-handshake-arrow">↓</div>
                    <div class="v34-terminal" id="v34-hs-res-term" style="opacity:0.25;transform:scale(0.97);transition:all 0.5s ease;">
                        <div class="v34-terminal-bar">
                            <div class="v34-terminal-dot r"></div><div class="v34-terminal-dot y"></div><div class="v34-terminal-dot g"></div>
                            <span class="v34-terminal-title">server → client</span>
                        </div>
                        <div class="v34-code-block">
                            <div class="v34-code-line" id="v34-hs-r1"><span class="hl-green">HTTP/1.1 101 Switching Protocols</span></div>
                            <div class="v34-code-line" id="v34-hs-r2"><span class="hl-blue">Upgrade: websocket</span></div>
                            <div class="v34-code-line" id="v34-hs-r3"><span class="hl-blue">Connection: Upgrade</span></div>
                        </div>
                    </div>
                </div>
                <div class="v34-glass-card" style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:4px;">
                    <span class="v34-protocol-badge http active" id="v34-hs-badge-http">HTTP</span>
                    <span style="font-size:14px;color:var(--chat-text-muted);">→</span>
                    <span class="v34-protocol-badge ws" id="v34-hs-badge-ws">WebSocket</span>
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-green);margin-left:auto;" id="v34-hs-status">Handshake...</span>
                </div>`, null, null);
        }
        else if (slideId === 'slide_chat_ws_flow') {
            const wsServerCustomBody = `
                <span class="v34-term-title">Active Sockets Registry</span>
                <div class="v34-socket-registry-grid">
                    <div class="v34-socket-cell" id="v34-sock-alice">👩‍💻 User A (Alice)</div>
                    <div class="v34-socket-cell">👵 User C</div>
                    <div class="v34-socket-cell">🧔 User D</div>
                    <div class="v34-socket-cell">👩‍🎨 User E</div>
                    <div class="v34-socket-cell">👨‍🚀 User F</div>
                    <div class="v34-socket-cell" id="v34-sock-bob">👨‍💻 User B (Bob)</div>
                </div>
                <div class="v34-term-log success" id="v34-flow-term-log" style="margin-top:5px;font-size:7.5px;min-height:24px;line-height:1.2;">Listening...</div>
            `;
            const inner = `
                <div class="v34-flow-stage" id="v34-flow-container">
                    ${phoneMock('v34-flow-alice', 'Alice', true)}
                    ${serverMockHTML('v34-flow', 'WS Server', 'Active', true, 'Listening...', false, wsServerCustomBody)}
                    ${phoneMock('v34-flow-bob', 'Bob', false)}
                </div>
                <div class="v34-glass-card glow-green v34-status-card" style="margin-top:15px;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="send" style="width:12px;height:12px;"></i> Instant Push</span>
                    <span style="color:var(--chat-cyan);" id="v34-flow-status">{"type":"msg","text":"Xin chào!"}</span>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container">
                    <path id="v34-path-flow-a-s" class="flow-blue" />
                    <path id="v34-path-flow-s-b" class="flow-green" />
                </svg>
                <div class="v34-packet-wrap" id="v34-flow-pkt1"><div class="v34-packet-core"></div><span class="v34-packet-label">WS Frame</span></div>
                <div class="v34-packet-wrap" id="v34-flow-pkt2"><div class="v34-packet-core green"></div><span class="v34-packet-label">PUSH Socket</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, 'green-tint');
            canvas.querySelector('#v34-flow-alice-chat').innerHTML =
                makeVoiceBubbleHTML(true, true, '0:04').replace('v34-voice-bubble', 'v34-voice-bubble" id="v34-flow-sent');
            canvas.querySelector('#v34-flow-bob-chat').innerHTML =
                makeVoiceBubbleHTML(false, false, '0:04').replace('v34-voice-bubble', 'v34-voice-bubble" id="v34-flow-recv');
            initIcons();
        }
        else if (slideId === 'slide_chat_scale_problem') {
            const inner = `
                <div class="v34-scale-grid">
                    <div class="v34-node active-gold v34-wide-node" id="v34-scale-lb">
                        <i data-lucide="network" style="width:14px;height:14px;color:var(--chat-gold);"></i>
                        <span>Load Balancer</span>
                    </div>
                    <div class="v34-scale-row">
                        ${serverMockHTML('v34-scale-s1', 'WS Server 1', 'Active', true, 'Waiting for request...', false)}
                        <div class="v34-block-zone" id="v34-scale-block">
                            <i data-lucide="ban" style="width:18px;height:18px;color:var(--chat-red);" id="v34-scale-ban"></i>
                            <span style="font-size:7px;color:var(--chat-red);font-weight:bold;text-align:center;">CROSS-SERVER BLOCK</span>
                        </div>
                        ${serverMockHTML('v34-scale-s2', 'WS Server 2', 'Active', true, 'Bob connected', false)}
                    </div>
                </div>
                <div class="v34-glass-card glow-red" style="margin-top:15px;padding:12px 20px;">
                    <span style="color:var(--chat-red);" id="v34-scale-status">❌ Message stuck on Server 1</span>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container">
                    <path id="v34-path-scale-s1-mid" class="flow-blue" />
                    <path id="v34-path-scale-block" class="flow-red" />
                </svg>
                <div class="v34-packet-wrap" id="v34-scale-pkt"><div class="v34-packet-core red"></div><span class="v34-packet-label">To: Bob (Err)</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, 'red-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            const inner = `
                <div class="v34-redis-vertical-layout" id="v34-redis-container">
                    <!-- Server 1 -->
                    ${serverMockHTML('v34-redis-s1', 'WS Server 1 (👩‍💻 Alice Connected)', 'Active', true, 'Publishing payload to Redis...', false)}
                    
                    <!-- Redis Hub -->
                    ${redisHubHTML('v34-redis', 'Redis Pub/Sub', false)}
                    
                    <!-- Server 2 -->
                    ${serverMockHTML('v34-redis-s2', 'WS Server 2 (👨‍💻 Bob Connected)', 'Active', true, 'Subscribed to chat:room:42', false)}
                </div>
                <div class="v34-glass-card glow-purple" style="display:flex;justify-content:space-between;align-items:center;margin-top:15px;padding:12px 20px;">
                    <span class="v34-status-badge green"><i data-lucide="radio-tower" style="width:12px;height:12px;"></i> Channel</span>
                    <span style="color:var(--chat-purple);" id="v34-redis-status">chat:room:42</span>
                </div>`;

            const absolute = `
                <svg class="v34-svg-container">
                    <path id="v34-path-r-s1-redis" class="flow-gold" />
                    <path id="v34-path-r-redis-s2" class="flow-purple" />
                </svg>
                <div class="v34-packet-wrap" id="v34-redis-pkt1"><div class="v34-packet-core gold"></div><span class="v34-packet-label">PUBLISH chat:room:42</span></div>
                <div class="v34-packet-wrap" id="v34-redis-pkt2"><div class="v34-packet-core purple"></div><span class="v34-packet-label">BROADCAST</span></div>
                <div class="v34-packet-wrap" id="v34-redis-pkt3"><div class="v34-packet-core green"></div><span class="v34-packet-label">PUSH to User B</span></div>`;

            canvas.innerHTML = sceneWrap(inner, absolute, null);
            initIcons();
        }
        else if (slideId === 'slide_chat_full_arch') {
            canvas.innerHTML = sceneWrap(`
                <svg class="v34-svg-container">
                    <path id="v34-path-arch-1" class="flow-blue" />
                    <path id="v34-path-arch-2" class="flow-green" />
                    <path id="v34-path-arch-3" class="flow-purple" />
                    <path id="v34-path-arch-4" class="flowing" />
                </svg>
                <div class="v34-arch-pipeline" id="v34-arch-pipeline">
                    <div class="v34-arch-row">
                        <div class="v34-node dimmed v34-arch-node" id="v34-arch-client">${nodeIcon('smartphone', 'var(--chat-blue)')}<span>Client</span></div>
                        <span class="v34-arch-connector" id="v34-conn-1">→</span>
                        <div class="v34-node dimmed v34-arch-node" id="v34-arch-lb">${nodeIcon('network', 'var(--chat-gold)')}<span>Load Balancer</span></div>
                        <span class="v34-arch-connector" id="v34-conn-2">→</span>
                        <div class="v34-node dimmed v34-arch-node" id="v34-arch-ws">${nodeIcon('radio', 'var(--chat-green)')}<span>WS Server 1</span></div>
                    </div>
                    <div class="v34-arch-row">
                        <div class="v34-node dimmed v34-arch-node" id="v34-arch-redis">${nodeIcon('database', 'var(--chat-purple)')}<span>Redis Pub/Sub</span></div>
                        <span class="v34-arch-connector" id="v34-conn-3">⇄</span>
                        <div class="v34-node dimmed v34-arch-node" id="v34-arch-db">${nodeIcon('hard-drive', '#fff')}<span>PostgreSQL</span></div>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-arch-pkt"><div class="v34-packet-core green"></div><span class="v34-packet-label">msg</span></div>
                <div class="v34-glass-card glow-green v34-status-card" style="margin-top:15px;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-label">PRODUCTION PIPELINE</span>
                    <span style="color:var(--chat-green);" id="v34-arch-status">Initializing...</span>
                </div>`, null, 'green-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_compare') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-compare-grid">
                    <div class="v34-compare-col loser" id="v34-cmp-poll">
                        <div class="v34-compare-icon" style="background:rgba(239,68,68,0.12);"><i data-lucide="refresh-cw" style="width:14px;height:14px;color:var(--chat-red);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-red);">Short Polling</div>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-bat"></div></div></div>
                        </div>
                    </div>
                    <div class="v34-compare-col loser" id="v34-cmp-long">
                        <div class="v34-compare-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="hourglass" style="width:14px;height:14px;color:var(--chat-gold);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-gold);">Long Polling</div>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-bat"></div></div></div>
                        </div>
                    </div>
                    <div class="v34-compare-col" id="v34-cmp-ws">
                        <div class="v34-compare-icon" style="background:rgba(16,185,129,0.12);"><i data-lucide="zap" style="width:14px;height:14px;color:var(--chat-green);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-green);">WebSocket</div>
                        <span class="v34-crown" id="v34-cmp-crown">👑</span>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-bat"></div></div></div>
                        </div>
                    </div>
                </div>
                <div class="v34-glass-card glow-green" style="text-align:center;margin-top:15px;padding:12px 20px;">
                    <span style="color:var(--chat-green);" id="v34-cmp-verdict">WebSocket wins on all metrics 🏆</span>
                </div>`, null, null);
            initIcons();
        }
        else if (slideId === 'slide_chat_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-outro-grid">
                    <div class="v34-outro-card" id="v34-outro-1">
                        <div class="v34-outro-icon" style="background:rgba(16,185,129,0.12);"><i data-lucide="zap" style="width:14px;height:14px;color:var(--chat-green);"></i></div>
                        <span class="v34-outro-number">&lt; 50ms</span>
                        <span class="v34-outro-label">Latency</span>
                        <span class="v34-outro-desc">Đường hầm hai chiều, push tức thì.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-2">
                        <div class="v34-outro-icon" style="background:rgba(59,130,246,0.12);"><i data-lucide="unlink" style="width:14px;height:14px;color:var(--chat-blue);"></i></div>
                        <span class="v34-outro-number">1 conn</span>
                        <span class="v34-outro-label">Zero Polling</span>
                        <span class="v34-outro-desc">Không spam request rỗng, tiết kiệm pin.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-3">
                        <div class="v34-outro-icon" style="background:rgba(168,85,247,0.12);"><i data-lucide="radio-tower" style="width:14px;height:14px;color:var(--chat-purple);"></i></div>
                        <span class="v34-outro-number">Pub/Sub</span>
                        <span class="v34-outro-label">Redis Broadcast</span>
                        <span class="v34-outro-desc">Đồng bộ tin giữa WebSocket Server.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-4">
                        <div class="v34-outro-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="database" style="width:14px;height:14px;color:var(--chat-gold);"></i></div>
                        <span class="v34-outro-number">DB + WS</span>
                        <span class="v34-outro-label">Sync &amp; History</span>
                        <span class="v34-outro-desc">PostgreSQL lưu lịch sử, WS push live.</span>
                    </div>
                </div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
                    <span class="v34-status-badge green"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Chat Architecture</span>
                    <span style="font-size:11px;font-weight:bold;color:#fff;">Production Ready ✓</span>
                </div>`, null, 'green-tint');
            initIcons();
        }
    }

    function updateFrame(slideId, canvas, progress) {
        const container = canvas.querySelector('.v34-zoom-container');

        if (slideId === 'slide_chat_intro_a') {
            return;
        }
        else if (slideId === 'slide_chat_intro_b') {
            const alice = canvas.querySelector('#v34-phone-alice');
            const bob = canvas.querySelector('#v34-phone-bob');
            const sent = canvas.querySelector('#v34-intro-sent');
            const typing = canvas.querySelector('#v34-intro-typing');
            const recv = canvas.querySelector('#v34-intro-recv');
            const lineL = canvas.querySelector('#v34-intro-line-l');
            const lineR = canvas.querySelector('#v34-intro-line-r');
            const status = canvas.querySelector('#v34-intro-status');
            const latency = canvas.querySelector('#v34-intro-latency');
            const toast = canvas.querySelector('#v34-intro-toast');
            const aliceInput = canvas.querySelector('#v34-phone-alice-input');

            if (progress < 0.2) {
                if (alice) alice.classList.add('active-send');
                if (sent) {
                    sent.classList.add('visible');
                    sent.classList.remove('animating');
                }
                if (typing) typing.classList.remove('active');
                if (recv) {
                    recv.classList.remove('visible', 'animating');
                }
                if (lineL) lineL.classList.remove('active');
                if (lineR) lineR.classList.remove('active');
                if (status) status.textContent = '👩‍💻 Alice gửi Voice Message...';
                if (toast) toast.classList.remove('show');
                if (aliceInput) aliceInput.textContent = '🎤 Voice Message (0:04)';
            } else if (progress < 0.55) {
                if (lineL) lineL.classList.add('active');
                if (lineR) lineR.classList.add('active');
                if (typing) typing.classList.add('active');
                if (sent) {
                    sent.classList.add('visible', 'animating');
                }
                if (recv) {
                    recv.classList.remove('visible', 'animating');
                }
                if (status) status.textContent = '⚡ WebSocket pushing...';
                if (latency) latency.classList.add('flash');
            } else {
                if (bob) bob.classList.add('active-recv');
                if (typing) typing.classList.remove('active');
                if (sent) {
                    sent.classList.add('visible');
                    sent.classList.remove('animating');
                    const meta = sent.querySelector('.v34-bubble-meta');
                    if (meta) meta.textContent = 'Đã xem ✓✓';
                }
                if (recv) {
                    recv.classList.add('visible', 'animating');
                }
                if (toast) toast.classList.add('show');
                if (status) {
                    status.textContent = '✓ Nhận tức thì — không cần F5';
                    status.style.color = 'var(--chat-green)';
                }
            }
        }
        else if (slideId === 'slide_chat_http') {
            const client = canvas.querySelector('#v34-http-client');
            const server = canvas.querySelector('#v34-http-server');
            const pktReq = canvas.querySelector('#v34-http-pkt-req');
            const pktRes = canvas.querySelector('#v34-http-pkt-res');
            const status = canvas.querySelector('#v34-http-status');
            const serverLog = canvas.querySelector('#v34-http-term-log');

            const cOff = getNodeConnectionPoint(client, server, container);
            const sOff = getNodeConnectionPoint(server, client, container);
            const cycle = (progress * 4) % 1;

            if (client && server) {
                drawSVGPath(canvas, '#v34-path-http-req', client, server, container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-http-res', server, client, container, 'flow-green');
            }

            if (cycle < 0.42) {
                placePacket(pktReq, cOff, sOff, cycle / 0.42);
                hidePacket(pktRes);
                if (client) client.classList.add('active-blue');
                if (server) {
                    server.classList.remove('active-red');
                    server.classList.add('active-blue');
                }
                if (status) status.textContent = '→ GET /api/messages HTTP/1.1';
                if (serverLog) {
                    serverLog.innerHTML = 'GET /api/messages HTTP/1.1\nHost: api.chat.app\n\n[Processing Request...]';
                    serverLog.className = 'v34-term-log highlight';
                }
            } else if (cycle < 0.78) {
                hidePacket(pktReq);
                placePacket(pktRes, sOff, cOff, (cycle - 0.42) / 0.36);
                if (server) {
                    server.classList.remove('active-blue');
                    server.classList.add('active-green');
                }
                if (status) status.textContent = '← 200 OK (Connection Closed)';
                if (serverLog) {
                    serverLog.innerHTML = 'HTTP/1.1 200 OK\nConnection: close\n\n[] (No new messages)';
                    serverLog.className = 'v34-term-log success';
                }
            } else {
                hidePacket(pktReq);
                hidePacket(pktRes);
                if (server) {
                    server.classList.remove('active-green');
                    server.classList.add('active-red');
                }
                if (status) status.textContent = 'Server không thể tự push — Đã đóng kết nối';
                if (serverLog) {
                    serverLog.innerHTML = 'Connection state: CLOSED\nCannot push new messages to client.';
                    serverLog.className = 'v34-term-log error';
                }
            }
        }
        else if (slideId === 'slide_chat_polling') {
            const client = canvas.querySelector('#v34-poll-client');
            const server = canvas.querySelector('#v34-poll-server');
            const pkt = canvas.querySelector('#v34-poll-pkt');
            const cpu = canvas.querySelector('#v34-poll-cpu');
            const rate = canvas.querySelector('#v34-poll-req-rate');
            const counter = canvas.querySelector('#v34-poll-counter');
            const log = canvas.querySelector('#v34-poll-log');
            const serverLog = canvas.querySelector('#v34-poll-term-log');

            const pollCount = Math.min(5, Math.floor(progress * 6) + 1);
            const cpuPct = Math.min(98, 12 + progress * 88);

            const activeCellCount = Math.floor(progress * 13);
            for (let i = 0; i < 12; i++) {
                const cell = canvas.querySelector(`#v34-poll-cell-${i}`);
                if (cell) {
                    const iconRefresh = cell.querySelector('.icon-refresh');
                    const iconFail = cell.querySelector('.icon-fail');
                    const iconSuccess = cell.querySelector('.icon-success');
                    const spanText = cell.querySelector('span');

                    if (i < activeCellCount) {
                        if (i === 11) {
                            cell.className = 'v34-poll-cell success-hit';
                            if (iconRefresh) iconRefresh.style.display = 'none';
                            if (iconFail) iconFail.style.display = 'none';
                            if (iconSuccess) iconSuccess.style.display = 'inline-block';
                            if (spanText) spanText.textContent = 'Hit ✓';
                        } else {
                            cell.className = 'v34-poll-cell empty-fail';
                            if (iconRefresh) iconRefresh.style.display = 'none';
                            if (iconFail) iconFail.style.display = 'inline-block';
                            if (iconSuccess) iconSuccess.style.display = 'none';
                            if (spanText) spanText.textContent = 'Empty ✗';
                        }
                    } else {
                        cell.className = 'v34-poll-cell';
                        if (iconRefresh) iconRefresh.style.display = 'inline-block';
                        if (iconFail) iconFail.style.display = 'none';
                        if (iconSuccess) iconSuccess.style.display = 'none';
                        if (spanText) spanText.textContent = `#${i+1}`;
                    }
                }
            }

            const cpuVal = canvas.querySelector('#v34-poll-cpu-val');
            if (cpuVal) cpuVal.textContent = `${Math.round(cpuPct)}%`;
            if (cpu) {
                cpu.style.width = `${cpuPct}%`;
                cpu.className = cpuPct > 65 ? 'v34-metrics-fill critical' : 'v34-metrics-fill';
            }
            if (rate) rate.textContent = `${Math.round(3333 * Math.min(1, progress * 1.2))} req/s`;
            if (counter) counter.textContent = `${Math.max(0, activeCellCount - 1)}`;
            if (server) server.className = cpuPct > 65 ? 'v34-server-mock active-red' : 'v34-server-mock';

            const cOff = getNodeConnectionPoint(client, server, container);
            const sOff = getNodeConnectionPoint(server, client, container);

            if (client && server) {
                drawSVGPath(canvas, '#v34-path-poll', client, server, container, 'flow-red');
            }

            placePacket(pkt, cOff, sOff, (progress * 12) % 1);
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            const client = canvas.querySelector('#v34-ws-client-box');
            const server = canvas.querySelector('#v34-ws-server-box');
            const pktFwd = canvas.querySelector('#v34-ws-intro-pkt-fwd');
            const pktRev = canvas.querySelector('#v34-ws-intro-pkt-rev');
            const metricStatus = canvas.querySelector('#v34-ws-val-status');

            if (client) client.classList.toggle('active-blue', progress > 0.1);
            if (server) server.classList.toggle('active-green', progress > 0.2);

            // Animate WS tunnel grid cells
            const timeStep = Math.floor(Date.now() / 80); // change frame every 80ms
            for (let i = 0; i < 8; i++) {
                const cell = canvas.querySelector(`#v34-tunnel-cell-${i}`);
                if (cell) {
                    cell.className = 'v34-tunnel-cell';
                    if (progress > 0.15) {
                        // Left column flow (0, 2, 4, 6) downwards: client to server
                        if (i % 2 === 0) {
                            const indexOffset = (i / 2);
                            if ((timeStep + indexOffset) % 4 === 0) {
                                cell.className = 'v34-tunnel-cell pulse-blue';
                            }
                        } 
                        // Right column flow (1, 3, 5, 7) upwards: server to client
                        else {
                            const indexOffset = Math.floor(i / 2);
                            if ((timeStep - indexOffset + 40) % 4 === 0) {
                                cell.className = 'v34-tunnel-cell pulse-green';
                            }
                        }
                    }
                }
            }

            if (client && server) {
                drawSVGPath(canvas, '#v34-path-ws-intro', client, server, container, 'flowing');
            }

            const cOff = getNodeConnectionPoint(client, server, container);
            const sOff = getNodeConnectionPoint(server, client, container);
            const spd = progress * 10;

            if (pktFwd && cOff && sOff) {
                if (progress > 0.15) {
                    placePacket(pktFwd, cOff, sOff, (spd) % 1);
                } else {
                    hidePacket(pktFwd);
                }
            }
            if (pktRev && cOff && sOff) {
                if (progress > 0.25) {
                    placePacket(pktRev, sOff, cOff, (spd + 0.5) % 1);
                } else {
                    hidePacket(pktRev);
                }
            }

            if (metricStatus) {
                if (progress > 0.45) {
                    metricStatus.textContent = 'STREAMING';
                    metricStatus.className = 'm-value green';
                } else if (progress > 0.12) {
                    metricStatus.textContent = 'ESTABLISHED';
                    metricStatus.className = 'm-value green';
                } else {
                    metricStatus.textContent = 'CONNECTING...';
                    metricStatus.className = 'm-value gold';
                }
            }
        }
        else if (slideId === 'slide_chat_ws_handshake') {
            const lines = ['#v34-hs-l1', '#v34-hs-l2', '#v34-hs-l3', '#v34-hs-l4'];
            const resLines = ['#v34-hs-r1', '#v34-hs-r2', '#v34-hs-r3'];
            const resTerm = canvas.querySelector('#v34-hs-res-term');
            const badgeWs = canvas.querySelector('#v34-hs-badge-ws');
            const badgeHttp = canvas.querySelector('#v34-hs-badge-http');
            const status = canvas.querySelector('#v34-hs-status');

            lines.forEach((sel, i) => {
                const el = canvas.querySelector(sel);
                if (el) el.classList.toggle('visible', progress > i * 0.11);
            });

            if (progress > 0.48) {
                if (resTerm) { resTerm.style.opacity = '1'; resTerm.style.transform = 'scale(1)'; }
                resLines.forEach((sel, i) => {
                    const el = canvas.querySelector(sel);
                    if (el) el.classList.toggle('visible', progress > 0.48 + i * 0.1);
                });
                if (badgeWs) badgeWs.classList.add('active');
                if (badgeHttp) badgeHttp.classList.remove('active');
                if (status) status.textContent = '✓ 101 — WebSocket ACTIVE';
            } else {
                if (badgeHttp) badgeHttp.classList.add('active');
                if (badgeWs) badgeWs.classList.remove('active');
                if (status) status.textContent = progress > 0.2 ? 'Sending Upgrade...' : 'Handshake...';
            }
        }
        else if (slideId === 'slide_chat_ws_flow') {
            const alice = canvas.querySelector('#v34-flow-alice');
            const server = canvas.querySelector('#v34-flow-server');
            const bob = canvas.querySelector('#v34-flow-bob');
            const recv = canvas.querySelector('#v34-flow-recv');
            const pkt1 = canvas.querySelector('#v34-flow-pkt1');
            const pkt2 = canvas.querySelector('#v34-flow-pkt2');
            const status = canvas.querySelector('#v34-flow-status');
            const serverLog = canvas.querySelector('#v34-flow-term-log');

            const aOff = getNodeConnectionPoint(alice, server, container);
            const sOff = getNodeConnectionPoint(server, alice, container);
            const sOff2 = getNodeConnectionPoint(server, bob, container);
            const bOff = getNodeConnectionPoint(bob, server, container);

            if (alice && server && bob) {
                drawSVGPath(canvas, '#v34-path-flow-a-s', alice, server, container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-flow-s-b', server, bob, container, 'flow-green');
            }

            const sockAlice = canvas.querySelector('#v34-sock-alice');
            const sockBob = canvas.querySelector('#v34-sock-bob');
            const sent = canvas.querySelector('#v34-flow-sent');

            if (progress < 0.22) {
                const t1 = Math.min(1, progress / 0.15);
                placePacket(pkt1, aOff, sOff, t1);
                hidePacket(pkt2);
                if (sent) sent.classList.add('visible', 'animating');
                if (recv) recv.classList.remove('visible', 'animating');
                if (status) status.textContent = '{"type":"voice","length":4}';
                if (serverLog) {
                    serverLog.innerHTML = 'Receiving WebSocket frame from 👩‍💻 A...\nPayload: {"voice_len": 4}';
                    serverLog.className = 'v34-term-log highlight';
                }
                if (sockAlice) sockAlice.className = 'v34-socket-cell active-alice';
                if (sockBob) sockBob.className = 'v34-socket-cell';
            } else if (progress < 0.44) {
                hidePacket(pkt1);
                const t2 = Math.min(1, (progress - 0.22) / 0.15);
                placePacket(pkt2, sOff2, bOff, t2);
                if (sent) { sent.classList.add('visible'); sent.classList.remove('animating'); }
                if (recv) recv.classList.remove('visible', 'animating');
                if (status) status.textContent = 'Server push down to 👨‍💻 User B socket';
                if (serverLog) {
                    serverLog.innerHTML = 'Routing to 👨‍💻 B socket...\nFrame PUSH active';
                    serverLog.className = 'v34-term-log success';
                }
                if (sockAlice) sockAlice.className = 'v34-socket-cell active-alice';
                if (sockBob) sockBob.className = 'v34-socket-cell active-bob';
            } else {
                hidePacket(pkt1);
                hidePacket(pkt2);
                if (sent) { sent.classList.add('visible'); sent.classList.remove('animating'); }
                if (recv) recv.classList.add('visible', 'animating');
                if (status) status.textContent = '✓ Delivered instantly (👨‍💻 Bob received)';
                if (serverLog) {
                    serverLog.innerHTML = 'Frame delivered successfully.\nConnection: active';
                    serverLog.className = 'v34-term-log success';
                }
                if (sockAlice) sockAlice.className = 'v34-socket-cell active-alice';
                if (sockBob) sockBob.className = 'v34-socket-cell active-bob';
            }
        }
        else if (slideId === 'slide_chat_scale_problem') {
            const s1 = canvas.querySelector('#v34-scale-s1-server');
            const block = canvas.querySelector('#v34-scale-block');
            const pkt = canvas.querySelector('#v34-scale-pkt');
            const status = canvas.querySelector('#v34-scale-status');
            const s1Log = canvas.querySelector('#v34-scale-s1-term-log');

            const lb = canvas.querySelector('#v34-scale-lb');
            const s1Off = getNodeConnectionPoint(s1, block, container);
            const bOff = getNodeConnectionPoint(block, s1, container);

            if (lb && s1 && block) {
                drawSVGPath(canvas, '#v34-path-scale-s1-mid', lb, s1, container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-scale-block', s1, block, container, 'flow-red');
            }

            if (progress < 0.3) {
                const t = Math.min(1, progress / 0.2);
                placePacket(pkt, s1Off, bOff, t);
                if (block) block.classList.remove('active');
                if (status) status.textContent = '👩‍💻 Alice gửi tin nhắn cho 👨‍💻 Bob...';
                if (s1Log) {
                    s1Log.innerHTML = '👩‍💻 User A sent message to 👨‍💻 Bob.\nLooking up User B socket connection...';
                    s1Log.className = 'v34-term-log highlight';
                }
            } else {
                hidePacket(pkt);
                if (block) block.classList.add('active');
                if (status) status.textContent = '❌ Lỗi: 👨‍💻 Bob đang ở Server 2. Server 1 không có socket của Bob!';
                if (s1Log) {
                    s1Log.innerHTML = 'Lookup failed: 👨‍💻 User B not connected to Node 1.\nError: Stuck message!';
                    s1Log.className = 'v34-term-log error';
                }
            }
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            const s1 = canvas.querySelector('#v34-redis-s1-server');
            const core = canvas.querySelector('#v34-redis-redis-core');
            const s2 = canvas.querySelector('#v34-redis-s2-server');
            const pkt1 = canvas.querySelector('#v34-redis-pkt1');
            const pkt2 = canvas.querySelector('#v34-redis-pkt2');
            const pkt3 = canvas.querySelector('#v34-redis-pkt3');
            const status = canvas.querySelector('#v34-redis-status');
            const s1Log = canvas.querySelector('#v34-redis-s1-term-log');
            const s2Log = canvas.querySelector('#v34-redis-s2-term-log');

            const s1Off = getNodeConnectionPoint(s1, core, container);
            const rOff1 = getNodeConnectionPoint(core, s1, container);
            const rOff2 = getNodeConnectionPoint(core, s2, container);
            const s2Off = getNodeConnectionPoint(s2, core, container);
            const s2Center = getCenterOffset(s2, container);
            const s2OffRight = {
                x: s2Center.x + s2.offsetWidth / 2,
                y: s2Center.y
            };

            if (s1 && core && s2) {
                drawSVGPath(canvas, '#v34-path-r-s1-redis', s1, core, container, 'flow-gold');
                drawSVGPath(canvas, '#v34-path-r-redis-s2', core, s2, container, 'flow-purple');
            }

            const chan42 = canvas.querySelector('#v34-chan-42');

            if (progress < 0.25) {
                const t1 = Math.min(1, progress / 0.15);
                placePacket(pkt1, s1Off, rOff1, t1);
                hidePacket(pkt2);
                hidePacket(pkt3);
                if (status) status.textContent = 'WS Server 1 publishes message to Redis';
                if (s1Log) {
                    s1Log.innerHTML = 'Publishing payload to channel chat:room:42...';
                    s1Log.className = 'v34-term-log highlight';
                }
                if (s2Log) {
                    s2Log.innerHTML = 'Subscribed to channel chat:room:42\nListening...';
                    s2Log.className = 'v34-term-log';
                }
                if (chan42) chan42.className = 'v34-channel-cell active-publish';
            } else if (progress < 0.5) {
                hidePacket(pkt1);
                const t2 = Math.min(1, (progress - 0.25) / 0.15);
                placePacket(pkt2, rOff2, s2Off, t2);
                if (core) core.classList.add('burst');
                if (s2) s2.classList.add('active-green');
                if (status) status.textContent = 'Redis Pub/Sub broadcasts to Server 2';
                if (s2Log) {
                    s2Log.innerHTML = 'Received Redis broadcast!\nRecipient 👨‍💻 B is online on this server. Routing...';
                    s2Log.className = 'v34-term-log highlight';
                }
                if (chan42) chan42.className = 'v34-channel-cell active-broadcast';
            } else {
                hidePacket(pkt1);
                hidePacket(pkt2);
                const t3 = Math.min(1, (progress - 0.5) / 0.18);
                placePacket(pkt3, s2OffRight, { x: s2OffRight.x + 35, y: s2OffRight.y - 15 }, t3);
                if (status) status.textContent = '✓ WS Server 2 pushes successfully to 👨‍💻 User B socket!';
                if (s2Log) {
                    s2Log.innerHTML = 'WebSocket push to 👨‍💻 B: success\nDelivered real-time!';
                    s2Log.className = 'v34-term-log success';
                }
                if (chan42) chan42.className = 'v34-channel-cell active-broadcast';
            }
        }
        else if (slideId === 'slide_chat_full_arch') {
            const nodes = [
                canvas.querySelector('#v34-arch-client'),
                canvas.querySelector('#v34-arch-lb'),
                canvas.querySelector('#v34-arch-ws'),
                canvas.querySelector('#v34-arch-redis'),
                canvas.querySelector('#v34-arch-db')
            ];
            const conns = [
                canvas.querySelector('#v34-conn-1'),
                canvas.querySelector('#v34-conn-2'),
                canvas.querySelector('#v34-conn-3')
            ];
            const pkt = canvas.querySelector('#v34-arch-pkt');
            const status = canvas.querySelector('#v34-arch-status');

            nodes.forEach((n, i) => {
                if (!n) return;
                const lit = progress > i * 0.16;
                n.classList.toggle('dimmed', !lit);
                n.classList.toggle('lit', lit);
                n.classList.remove('active-blue', 'active-gold', 'active-green', 'active-purple');
                if (lit) {
                    const nodeColors = ['active-blue', 'active-gold', 'active-green', 'active-purple', ''];
                    if (nodeColors[i]) n.classList.add(nodeColors[i]);
                }
            });
            conns.forEach((c, i) => {
                if (c) c.classList.toggle('lit', progress > (i + 1) * 0.16);
            });

            if (nodes[0] && nodes[1] && nodes[2] && nodes[3] && nodes[4]) {
                drawSVGPath(canvas, '#v34-path-arch-1', nodes[0], nodes[1], container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-arch-2', nodes[1], nodes[2], container, 'flow-green');
                drawSVGPath(canvas, '#v34-path-arch-3', nodes[2], nodes[3], container, 'flow-purple');
                drawSVGPath(canvas, '#v34-path-arch-4', nodes[3], nodes[4], container, 'flowing');
            }

            const seg = Math.min(3, Math.floor(progress * 4));
            const segT = (progress * 4) % 1;
            if (nodes[seg] && nodes[seg + 1]) {
                const startPt = getNodeConnectionPoint(nodes[seg], nodes[seg + 1], container);
                const endPt = getNodeConnectionPoint(nodes[seg + 1], nodes[seg], container);
                placePacket(pkt, startPt, endPt, segT);
            }
            if (status) {
                const labels = ['Client connecting...', 'Via Load Balancer...', 'WS Cluster routing...', 'Redis sync...', 'Persisted to DB ✓'];
                status.textContent = labels[Math.min(4, Math.floor(progress * 5))];
            }
        }
        else if (slideId === 'slide_chat_compare') {
            const t = Math.min(1, progress * 1.25);
            const setBar = (id, pct) => { const el = canvas.querySelector(id); if (el) el.style.width = `${pct * t}%`; };

            setBar('#v34-bar-poll-lat', 92);
            setBar('#v34-bar-poll-req', 96);
            setBar('#v34-bar-poll-bat', 90);
            setBar('#v34-bar-long-lat', 58);
            setBar('#v34-bar-long-req', 52);
            setBar('#v34-bar-long-bat', 48);
            setBar('#v34-bar-ws-lat', 10);
            setBar('#v34-bar-ws-req', 6);
            setBar('#v34-bar-ws-bat', 14);

            const wsCol = canvas.querySelector('#v34-cmp-ws');
            const crown = canvas.querySelector('#v34-cmp-crown');
            if (wsCol) wsCol.classList.toggle('winner', progress > 0.35);
            if (crown) crown.classList.toggle('show', progress > 0.5);
        }
        else if (slideId === 'slide_chat_outro') {
            canvas.querySelectorAll('.v34-outro-card').forEach((card, i) => {
                const threshold = 0.06 + i * 0.17;
                card.classList.toggle('active', progress >= threshold);
            });
        }
    }

    window.VideoPlugin = {
        scriptName: 'video34',
        topic: 'Realtime Chat',
        episodeNum: 34,
        customSlideIds,
        keywordsData,
        renderGfx,
        updateFrame
    };

    console.log('[Video34 Plugin] Loaded: Premium chat simulation — 12 slides.');
})();
