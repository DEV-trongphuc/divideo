/**
 * Video 34: Real-time Chat — WebSockets & Redis Pub/Sub (Clean 100% Rebuild with 12 slides)
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_chat_intro: [
            { text: 'WebSocket', start: 0.5, end: 9.0, class: 'active-good' }
        ],
        slide_chat_http: [
            { text: 'Request', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: 'hoàn toàn bị động', start: 6.0, end: 9.0, class: 'active-bad' }
        ],
        slide_chat_polling: [
            { text: 'Polling', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'hàng nghìn request', start: 6.0, end: 13.0, class: 'active-bad' }
        ],
        slide_chat_websocket_intro: [
            { text: 'hai chiều', start: 1.0, end: 5.0, class: 'active-good' },
            { text: 'mili-giây', start: 5.0, end: 9.0, class: 'active-gold' }
        ],
        slide_chat_ws_handshake: [
            { text: 'Upgrade', start: 1.0, end: 5.0, class: 'active-gold' },
            { text: 'Switching Protocols', start: 5.0, end: 9.0, class: 'active-good' }
        ],
        slide_chat_ws_flow: [
            { text: 'WebSocket frame', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'tức thì', start: 6.0, end: 11.0, class: 'active-good' }
        ],
        slide_chat_scale_problem: [
            { text: 'Server 1', start: 1.0, end: 5.0, class: 'active-bad' },
            { text: 'Server 2', start: 5.0, end: 10.0, class: 'active-bad' }
        ],
        slide_chat_redis_pubsub: [
            { text: 'Pub/Sub', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'broadcast', start: 6.0, end: 11.0, class: 'active-good' }
        ],
        slide_chat_full_arch: [
            { text: 'Load Balancer', start: 1.0, end: 5.5, class: 'active-gold' },
            { text: 'Redis', start: 5.5, end: 11.0, class: 'active-good' }
        ],
        slide_chat_compare: [
            { text: 'WebSocket', start: 1.0, end: 9.5, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_chat_intro', 'slide_chat_http', 'slide_chat_polling',
        'slide_chat_websocket_intro', 'slide_chat_ws_handshake', 'slide_chat_ws_flow',
        'slide_chat_scale_problem', 'slide_chat_redis_pubsub', 'slide_chat_full_arch',
        'slide_chat_compare', 'slide_chat_outro', 'slide_chat_follow'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, zoomClass) {
        const zClass = zoomClass ? ` ${zoomClass}` : '';
        return `<div class="v34-zoom-container${zClass}"><div class="v34-scene-bg"></div><div class="v34-scene-content">${inner}</div></div>`;
    }

    function nodeIcon(icon, color) {
        return `<div class="v34-node-icon-wrap"><i data-lucide="${icon}" style="width:24px;height:24px;color:${color || '#fff'};"></i></div>`;
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

    function serverMockHTML(idPrefix, title, statusText, isActive, logText, isError, customBody) {
        const activeClass = isActive ? ' active-green' : '';
        const bodyContent = customBody || `
            <span class="v34-term-title">Web Server Console</span>
            <div class="v34-server-terminal">
                <div class="v34-term-log ${isError ? 'error' : ''}" id="${idPrefix}-log">${logText || 'Listening on port 5501...'}</div>
            </div>`;
        return `
        <div class="v34-server-mock${activeClass}" id="${idPrefix}-server">
            <div class="v34-server-header">
                <div class="v34-server-title-bar">
                    <i data-lucide="server" style="width:14px;height:14px;"></i>
                    <span>${title}</span>
                </div>
                <div class="v34-server-leds">
                    <div class="v34-server-led active"></div>
                </div>
            </div>
            ${bodyContent}
        </div>`;
    }

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }
        if (!needsTemplate) return;

        if (slideId === 'slide_chat_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-phones-row intro-layout">
                    ${phoneMock('v34-phone-alice', 'Alice', true)}
                    <div style="display:flex; align-items:center; justify-content:center; width:90px; height:40px; position:relative;">
                        <div style="width:100%; height:2.5px; background:repeating-linear-gradient(to right, var(--chat-green) 0px, var(--chat-green) 5px, transparent 5px, transparent 10px); opacity:0.85;"></div>
                        <div style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:32px; height:32px; border-radius:50%; background:rgba(16,185,129,0.15); border:1.5px solid var(--chat-green); display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(16,185,129,0.3);" id="v34-intro-hub">
                            <i data-lucide="zap" style="color:var(--chat-green); width:16px; height:16px;" id="v34-intro-zap"></i>
                        </div>
                        <span style="position:absolute; left:50%; top:calc(50% + 22px); transform:translateX(-50%); font-size:10px; font-weight:900; color:var(--chat-green); font-family:monospace;" id="v34-intro-latency">&lt;50ms</span>
                    </div>
                    ${phoneMock('v34-phone-bob', 'Bob', false)}
                </div>
                <div class="v34-glass-card glow-green v34-status-card" style="margin-top:10px; width:440px; padding:12px 20px; margin-left:auto; margin-right:auto;">
                    <span class="v34-status-badge green"><i data-lucide="message-circle" style="width:12px;height:12px;"></i> Real-time</span>
                    <span style="color:#fff;" id="v34-intro-status">Đang gửi tin nhắn...</span>
                </div>`, 'zoom-large');
            initIcons();
        }
        else if (slideId === 'slide_chat_http') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-vertical-stack">
                    <div style="display:flex;justify-content:center;align-items:center;gap:24px;width:100%;position:relative;z-index:3;" id="v34-http-container">
                        <div class="v34-node active-blue" id="v34-http-client">
                            ${nodeIcon('monitor-smartphone', 'var(--chat-blue)')}
                            <span>Browser Client</span>
                            <span class="v34-node-sub">Chủ động Request</span>
                        </div>
                        <div class="v34-line-bridge active-blue">
                            <div class="v34-packet-wrap" id="v34-http-pkt" style="opacity:0; left:0;"><span class="v34-packet-label" id="v34-http-pkt-label">GET</span></div>
                        </div>
                        ${serverMockHTML('v34-http', 'HTTP Server', 'Idle', false, 'Waiting for request...', false)}
                    </div>
                </div>
                <div class="v34-glass-card glow-red v34-status-card" style="width:440px; margin-left:auto; margin-right:auto;">
                    <span class="v34-status-badge red">HTTP Cycle</span>
                    <span style="color:var(--chat-red); font-weight:800;" id="v34-http-status">Server không thể push chủ động</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_polling') {
            canvas.innerHTML = sceneWrap(`
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
                                    <i data-lucide="refresh-cw" class="icon-refresh" style="width:12px;height:12px;"></i>
                                    <i data-lucide="x-circle" class="icon-fail" style="display:none; color: var(--chat-red); width:12px;height:12px;"></i>
                                    <i data-lucide="check-circle" class="icon-success" style="display:none; color: var(--chat-green); width:12px;height:12px;"></i>
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
                                    <div style="width: 12%; height:100%; background:var(--chat-red);" id="v34-poll-cpu"></div>
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
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-tunnel-flow-layout">
                    <div class="v34-mini-browser" id="v34-ws-client-box">
                        <div class="v34-browser-header">
                            <div class="v34-browser-dots">
                                <div class="v34-browser-dot r"></div>
                                <div class="v34-browser-dot y" style="width:5px;height:5px;background:var(--chat-gold);border-radius:50%;"></div>
                                <div class="v34-browser-dot g" style="width:5px;height:5px;background:var(--chat-green);border-radius:50%;"></div>
                            </div>
                            <span class="v34-browser-addr">wss://chat.dev</span>
                        </div>
                        <div class="v34-browser-console">
                            <div class="v34-console-line green">✓ Connected</div>
                            <div class="v34-console-line" style="font-size: 9px; color: var(--chat-text-muted);">Ready to stream</div>
                        </div>
                    </div>

                    <div class="v34-ws-tunnel-grid" id="v34-ws-tunnel-grid" style="display:flex; align-items:center; justify-content:center;">
                        <div style="position:absolute; width:100%; height:2px; background:repeating-linear-gradient(to right, var(--chat-green) 0px, var(--chat-green) 6px, transparent 6px, transparent 12px); opacity:0.6;"></div>
                        <div class="v34-packet-wrap" id="v34-ws-intro-pkt" style="opacity:0; position:absolute;"><span class="v34-packet-label">WS Frame</span></div>
                    </div>

                    <div class="v34-mini-server" id="v34-ws-server-box">
                        <div class="v34-server-header" style="background:#0d121f; padding:6px 8px; display:flex; align-items:center; justify-content:space-between;">
                            <div class="v34-server-title-bar" style="display:flex; align-items:center; gap:4px; font-size:10px; font-weight:800; color:#fff;">
                                <i data-lucide="server" style="width:11px;height:11px;color:var(--chat-green);"></i>
                                <span>WS NODE 01</span>
                            </div>
                            <div class="v34-server-led active" style="width:6px;height:6px;border-radius:50%;background:var(--chat-green);"></div>
                        </div>
                        <div class="v34-server-terminal" style="flex:1; background:#05070c; padding:6px; min-height:48px;">
                            <span class="v34-term-title" style="font-size:9px;">Sockets</span>
                            <div class="v34-term-log success" style="font-size:9.5px;">Conn #42 open</div>
                        </div>
                    </div>
                </div>

                <div class="v34-glass-card glow-green" style="margin-top: 10px; width:440px; margin-left:auto; margin-right:auto;">
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
                        <div>Status: <span class="green" id="v34-ws-val-status">CONNECTED</span></div>
                        <div>Type: <span class="gold">FULL-DUPLEX</span></div>
                        <div>Latency: <span class="cyan">&lt; 1ms</span></div>
                    </div>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_ws_handshake') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-handshake-col">
                    <div class="v34-terminal" id="v34-hs-req-term">
                        <div class="v34-terminal-bar">
                            <div class="v34-terminal-dot r"></div><div class="v34-terminal-dot y" style="width:6px;height:6px;background:var(--chat-gold);border-radius:50%;"></div><div class="v34-terminal-dot g" style="width:6px;height:6px;background:var(--chat-green);border-radius:50%;"></div>
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
                    <div class="v34-terminal" id="v34-hs-res-term" style="opacity:0.25; transform:scale(0.97); transition:all 0.5s ease;">
                        <div class="v34-terminal-bar">
                            <div class="v34-terminal-dot r"></div><div class="v34-terminal-dot y" style="width:6px;height:6px;background:var(--chat-gold);border-radius:50%;"></div><div class="v34-terminal-dot g" style="width:6px;height:6px;background:var(--chat-green);border-radius:50%;"></div>
                            <span class="v34-terminal-title">server → client</span>
                        </div>
                        <div class="v34-code-block">
                            <div class="v34-code-line" id="v34-hs-r1"><span class="hl-green">HTTP/1.1 101 Switching Protocols</span></div>
                            <div class="v34-code-line" id="v34-hs-r2"><span class="hl-blue">Upgrade: websocket</span></div>
                            <div class="v34-code-line" id="v34-hs-r3"><span class="hl-blue">Connection: Upgrade</span></div>
                        </div>
                    </div>
                </div>
                <div class="v34-glass-card" style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:10px; width:440px; margin-left:auto; margin-right:auto;">
                    <span class="v34-protocol-badge active" id="v34-hs-badge-http">HTTP</span>
                    <span style="font-size:14px;color:var(--chat-text-muted);">→</span>
                    <span class="v34-protocol-badge" id="v34-hs-badge-ws">WebSocket</span>
                    <span style="font-family:'Fira Code',monospace; font-size:11px; font-weight:bold; color:var(--chat-gold); margin-left:auto;" id="v34-hs-status">Requesting upgrade...</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_ws_flow') {
            const wsServerCustomBody = `
                <span class="v34-term-title">Active Sockets Registry</span>
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:6px; margin:4px 0; background:rgba(0,0,0,0.3); padding:4px; border-radius:8px; font-size:10px;">
                    <div id="v34-sock-alice" style="border:1px solid rgba(255,255,255,0.05); padding:2px; text-align:center;">👩‍💻 Alice socket</div>
                    <div id="v34-sock-bob" style="border:1px solid rgba(255,255,255,0.05); padding:2px; text-align:center;">👨‍💻 Bob socket</div>
                </div>
                <div class="v34-term-log success" id="v34-flow-term-log" style="font-size:10px;">Listening...</div>
            `;
            canvas.innerHTML = sceneWrap(`
                <div style="display:flex; align-items:center; justify-content:center; gap:8px; width:100%;">
                    ${phoneMock('v34-flow-alice', 'Alice', true)}
                    
                    <div class="v34-line-bridge active-blue" style="max-width:50px;">
                        <div class="v34-packet-wrap" id="v34-flow-pkt-alice" style="opacity:0; left:0;"><span class="v34-packet-label">SEND</span></div>
                    </div>
                    
                    ${serverMockHTML('v34-flow', 'WS Server', 'Active', true, 'Listening...', false, wsServerCustomBody)}
                    
                    <div class="v34-line-bridge active-green" style="max-width:50px;">
                        <div class="v34-packet-wrap green" id="v34-flow-pkt-bob" style="opacity:0; left:0;"><span class="v34-packet-label">PUSH</span></div>
                    </div>
                    
                    ${phoneMock('v34-flow-bob', 'Bob', false)}
                </div>
                <div class="v34-glass-card glow-green v34-status-card" style="width:440px; margin-left:auto; margin-right:auto; margin-top:6px !important;">
                    <span class="v34-status-badge green">Instant Push</span>
                    <span style="color:var(--chat-cyan); font-weight:800;" id="v34-flow-status">WS Connection active</span>
                </div>`, 'zoom-large');
            initIcons();
        }
        else if (slideId === 'slide_chat_scale_problem') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-vertical-stack">
                    <div style="display:flex; align-items:center; justify-content:center; gap:20px; width:100%;">
                        ${serverMockHTML('v34-scale-s1', 'WS Server 1', 'Active', true, 'Alice connected', false)}
                        <div style="width:100px; padding:10px; background:rgba(239,68,68,0.1); border:1.5px solid var(--chat-red); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;" id="v34-scale-block">
                            <i data-lucide="ban" style="width:20px; height:20px; color:var(--chat-red);"></i>
                            <span style="font-size:9px; color:var(--chat-red); font-weight:bold; text-align:center; text-transform:uppercase;">No Bridge</span>
                        </div>
                        ${serverMockHTML('v34-scale-s2', 'WS Server 2', 'Active', true, 'Bob connected', false)}
                    </div>
                </div>
                <div class="v34-glass-card glow-red" style="width:440px; margin-left:auto; margin-right:auto; padding:12px 20px;">
                    <span style="color:var(--chat-red); font-weight:800;" id="v34-scale-status">❌ Message stuck on Server 1</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            canvas.innerHTML = sceneWrap(`
                <div style="display:flex; flex-direction:column; align-items:center; gap:20px; width:100%;">
                    <div style="display:flex; align-items:center; justify-content:center; gap:64px; width:100%;">
                        ${serverMockHTML('v34-redis-s1', 'WS Server 1', 'Active', true, 'Alice on socket #42', false)}
                        ${serverMockHTML('v34-redis-s2', 'WS Server 2', 'Active', true, 'Bob on socket #99', false)}
                    </div>
                    <div style="display:flex; align-items:center; justify-content:center; gap:8px; padding:12px 24px; border:2px solid var(--chat-purple); background:rgba(168,85,247,0.1); border-radius:16px; width:220px;" id="v34-redis-core">
                        <i data-lucide="radio" style="width:24px; height:24px; color:var(--chat-purple);"></i>
                        <span style="font-size:14px; font-weight:900; color:var(--chat-purple); text-transform:uppercase;">Redis Pub/Sub</span>
                    </div>
                </div>
                <div class="v34-glass-card glow-purple" style="width:440px; margin-left:auto; margin-right:auto; padding:12px 20px; margin-top:10px;">
                    <span style="color:var(--chat-purple); font-weight:800;" id="v34-redis-status">Redis broadcasts event to all nodes</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_full_arch') {
            canvas.innerHTML = sceneWrap(`
                <div style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:440px; margin:0 auto;" id="v34-arch-list">
                    <div class="v34-node active-blue" style="width:100%; flex-direction:row; gap:12px; padding:10px 16px;">
                        ${nodeIcon('smartphone', 'var(--chat-blue)')}
                        <div style="text-align:left;"><div style="font-weight:800; font-size:13px; color:#fff;">1. Client Browser</div><div style="font-size:9px; color:var(--chat-text-muted);">Establishes connection</div></div>
                    </div>
                    <div class="v34-node" style="width:100%; flex-direction:row; gap:12px; padding:10px 16px;">
                        ${nodeIcon('network', 'var(--chat-gold)')}
                        <div style="text-align:left;"><div style="font-weight:800; font-size:13px; color:#fff;">2. Load Balancer</div><div style="font-size:9px; color:var(--chat-text-muted);">Distributes WS traffic</div></div>
                    </div>
                    <div class="v34-node" style="width:100%; flex-direction:row; gap:12px; padding:10px 16px;">
                        ${nodeIcon('radio', 'var(--chat-green)')}
                        <div style="text-align:left;"><div style="font-weight:800; font-size:13px; color:#fff;">3. WS Cluster Node</div><div style="font-size:9px; color:var(--chat-text-muted);">Handles socket connections</div></div>
                    </div>
                    <div class="v34-node" style="width:100%; flex-direction:row; gap:12px; padding:10px 16px;">
                        ${nodeIcon('radio', 'var(--chat-purple)')}
                        <div style="text-align:left;"><div style="font-weight:800; font-size:13px; color:#fff;">4. Redis Pub/Sub</div><div style="font-size:9px; color:var(--chat-text-muted);">Syncs cross-node messages</div></div>
                    </div>
                    <div class="v34-node" style="width:100%; flex-direction:row; gap:12px; padding:10px 16px;">
                        ${nodeIcon('hard-drive', '#fff')}
                        <div style="text-align:left;"><div style="font-weight:800; font-size:13px; color:#fff;">5. PostgreSQL DB</div><div style="font-size:9px; color:var(--chat-text-muted);">Persists chat room history ✓</div></div>
                    </div>
                </div>
                <div class="v34-glass-card" style="width:440px; margin-left:auto; margin-right:auto; padding:10px 16px; margin-top:10px;">
                    <span style="font-size:12px; font-weight:800; color:var(--chat-cyan);" id="v34-arch-status">Initiating network handshake...</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_compare') {
            canvas.innerHTML = sceneWrap(`
                <div style="display:flex; justify-content:center; gap:20px; width:100%;">
                    <div class="v34-glass-card" style="flex:1; text-align:left; border-top:3px solid var(--chat-red); margin-top:0 !important;">
                        <h3 style="font-size:15px; color:var(--chat-red); font-weight:800; margin-bottom:12px; text-transform:uppercase;">Short Polling</h3>
                        <div style="display:flex; flex-direction:column; gap:10px; font-size:11px;">
                            <div>⏱ <b>Latency:</b> High (&gt;1.5s)</div>
                            <div>🔄 <b>Requests:</b> 1000s of empty loops</div>
                            <div>🔋 <b>Battery:</b> High drain</div>
                        </div>
                    </div>
                    <div class="v34-glass-card glow-green" style="flex:1; text-align:left; border-top:3px solid var(--chat-green); margin-top:0 !important; position:relative;" id="v34-cmp-ws">
                        <h3 style="font-size:15px; color:var(--chat-green); font-weight:800; margin-bottom:12px; text-transform:uppercase;">WebSocket</h3>
                        <div style="display:flex; flex-direction:column; gap:10px; font-size:11px;">
                            <div>⚡ <b>Latency:</b> Realtime (&lt;50ms)</div>
                            <div>🤝 <b>Requests:</b> 1 single handshake</div>
                            <div>🔋 <b>Battery:</b> Optimized</div>
                        </div>
                    </div>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-vertical-stack" style="text-align:center;">
                    <div style="width:80px; height:80px; border-radius:50%; margin:0 auto; padding:3px; background:linear-gradient(45deg, var(--chat-gold), var(--chat-green)); display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(0,0,0,0.4);">
                        <i data-lucide="shield-check" style="width:40px; height:40px; color:#fff;"></i>
                    </div>
                    <h2 style="font-size:18px; font-weight:800; color:#fff; margin-top:10px;">Real-time không phải phép màu!</h2>
                    <p style="font-size:12px; color:var(--chat-text-muted); max-width:320px; margin:0 auto;">Bạn muốn thiết kế hệ thống real-time bằng công nghệ nào? Hãy để lại ý kiến dưới phần bình luận nhé!</p>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_follow') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-vertical-stack" style="text-align:center;">
                    <div style="width:80px; height:80px; border-radius:50%; margin:0 auto; padding:3px; background:linear-gradient(45deg, var(--chat-gold), var(--chat-green)); display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(0,0,0,0.4);">
                        <i data-lucide="message-square-plus" style="width:40px; height:40px; color:#fff;"></i>
                    </div>
                    <h2 style="font-size:18px; font-weight:800; color:#fff; margin-top:10px;">Làm chủ Thiết kế Hệ thống!</h2>
                    <p style="font-size:12px; color:var(--chat-text-muted); max-width:320px; margin:0 auto;">Follow kênh @Turnio.dev để khám phá thêm nhiều kiến thức thiết kế hệ thống thú vị mỗi ngày!</p>
                </div>`);
            initIcons();
        }
    }

    function updateFrame(slideId, canvas, progress, isPlaying, getSlideDuration, slide) {
        if (slideId === 'slide_chat_intro') {
            const aliceChat = canvas.querySelector('#v34-phone-alice-chat');
            const bobChat = canvas.querySelector('#v34-phone-bob-chat');
            const status = canvas.querySelector('#v34-intro-status');
            const zap = canvas.querySelector('#v34-intro-zap');

            if (progress < 0.3) {
                if (aliceChat) aliceChat.innerHTML = '';
                if (bobChat) bobChat.innerHTML = '';
                if (status) status.textContent = 'Alice soạn tin: "Xin chào!"';
            } else if (progress < 0.6) {
                if (aliceChat) aliceChat.innerHTML = makeVoiceBubbleHTML(true, false, '0:03');
                if (bobChat) bobChat.innerHTML = '<div class="v34-typing active"><span></span><span></span><span></span></div>';
                if (status) status.textContent = 'Đang truyền dẫn WebSocket...';
                if (zap) zap.style.transform = `scale(${1 + Math.sin(progress * 20) * 0.15})`;
            } else {
                if (aliceChat) aliceChat.innerHTML = makeVoiceBubbleHTML(true, false, '0:03');
                if (bobChat) bobChat.innerHTML = makeVoiceBubbleHTML(false, false, '0:03');
                if (status) status.textContent = 'Tin nhắn hiển thị tức thì bên Bob! ✓';
            }
        }
        else if (slideId === 'slide_chat_http') {
            const pkt = canvas.querySelector('#v34-http-pkt');
            const pktLabel = canvas.querySelector('#v34-http-pkt-label');
            const serverLog = canvas.querySelector('#v34-http-log');
            const status = canvas.querySelector('#v34-http-status');

            if (progress < 0.45) {
                const t = progress / 0.45;
                if (pkt) { pkt.style.opacity = 1; pkt.style.left = `${t * 80}%`; }
                if (pktLabel) pktLabel.textContent = 'GET';
                if (serverLog) serverLog.textContent = 'WEB LOGS: IDLE';
                if (status) { status.textContent = 'Client gửi HTTP Request...'; status.style.color = 'var(--chat-blue)'; }
            } else if (progress < 0.85) {
                const t = (progress - 0.45) / 0.40;
                if (pkt) { pkt.style.opacity = 1; pkt.style.left = `${80 - t * 80}%`; }
                if (pktLabel) pktLabel.textContent = '200 OK';
                if (serverLog) serverLog.innerHTML = '<span class="success">GET /api/messages HTTP/1.1\nResponse sent!</span>';
                if (status) { status.textContent = 'Server trả HTTP Response rồi đóng kết nối.'; status.style.color = 'var(--chat-green)'; }
            } else {
                if (pkt) pkt.style.opacity = 0;
                if (serverLog) serverLog.textContent = 'CONNECTION CLOSED.';
                if (status) { status.textContent = 'Server không thể tự push khi chưa có yêu cầu mới!'; status.style.color = 'var(--chat-red)'; }
            }
        }
        else if (slideId === 'slide_chat_polling') {
            const cells = canvas.querySelectorAll('.v34-poll-cell');
            const cpu = canvas.querySelector('#v34-poll-cpu');
            const cpuVal = canvas.querySelector('#v34-poll-cpu-val');
            const rate = canvas.querySelector('#v34-poll-req-rate');
            const counter = canvas.querySelector('#v34-poll-counter');

            const totalPolls = Math.min(12, Math.floor(progress * 13));
            cells.forEach((cell, idx) => {
                const isFail = idx < totalPolls && idx < 11;
                const isSuccess = idx === 11 && totalPolls >= 12;

                const failIcon = cell.querySelector('.icon-fail');
                const successIcon = cell.querySelector('.icon-success');
                const refreshIcon = cell.querySelector('.icon-refresh');

                if (isFail) {
                    if (failIcon) failIcon.style.display = 'block';
                    if (refreshIcon) refreshIcon.style.display = 'none';
                    cell.style.borderColor = 'var(--chat-red)';
                } else if (isSuccess) {
                    if (successIcon) successIcon.style.display = 'block';
                    if (refreshIcon) refreshIcon.style.display = 'none';
                    cell.style.borderColor = 'var(--chat-green)';
                } else {
                    if (failIcon) failIcon.style.display = 'none';
                    if (successIcon) successIcon.style.display = 'none';
                    if (refreshIcon) refreshIcon.style.display = 'block';
                    cell.style.borderColor = '';
                }
            });

            const loadPct = Math.min(98, 12 + progress * 86);
            if (cpu) cpu.style.width = `${loadPct}%`;
            if (cpuVal) cpuVal.textContent = `${Math.floor(loadPct)}%`;
            if (rate) rate.textContent = `${Math.floor(progress * 3333)} req/s`;
            if (counter) counter.textContent = totalPolls;
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            const pkt = canvas.querySelector('#v34-ws-intro-pkt');
            if (pkt) {
                pkt.style.opacity = 1;
                const cycle = (progress * 4) % 1;
                const dir = Math.floor(progress * 4) % 2; // 0: fwd, 1: rev
                pkt.style.left = dir === 0 ? `${cycle * 80}%` : `${80 - cycle * 80}%`;
                pkt.querySelector('.v34-packet-label').textContent = dir === 0 ? 'CLIENT_FRAME' : 'SERVER_PUSH';
            }
        }
        else if (slideId === 'slide_chat_ws_handshake') {
            const res = canvas.querySelector('#v34-hs-res-term');
            const badgeHttp = canvas.querySelector('#v34-hs-badge-http');
            const badgeWs = canvas.querySelector('#v34-hs-badge-ws');
            const status = canvas.querySelector('#v34-hs-status');

            if (progress < 0.45) {
                if (res) { res.style.opacity = 0.25; res.style.transform = 'scale(0.97)'; }
                if (badgeHttp) badgeHttp.classList.add('active');
                if (badgeWs) badgeWs.classList.remove('active');
                if (status) status.textContent = 'Requesting protocol upgrade...';
            } else {
                if (res) { res.style.opacity = 1; res.style.transform = 'scale(1)'; }
                if (badgeHttp) badgeHttp.classList.remove('active');
                if (badgeWs) badgeWs.classList.add('active');
                if (status) { status.textContent = 'Protocol Switched to WebSocket! ✓'; status.style.color = 'var(--chat-green)'; }
            }
        }
        else if (slideId === 'slide_chat_ws_flow') {
            const pktAlice = canvas.querySelector('#v34-flow-pkt-alice');
            const pktBob = canvas.querySelector('#v34-flow-pkt-bob');
            const log = canvas.querySelector('#v34-flow-term-log');
            const status = canvas.querySelector('#v34-flow-status');

            const aliceChat = canvas.querySelector('#v34-flow-alice-chat');
            const bobChat = canvas.querySelector('#v34-flow-bob-chat');

            if (progress < 0.15) {
                if (pktAlice) pktAlice.style.opacity = 0;
                if (pktBob) pktBob.style.opacity = 0;
                if (log) log.textContent = 'Waiting for events...';
                if (status) status.textContent = 'Idle state';
                if (aliceChat) aliceChat.innerHTML = '';
                if (bobChat) bobChat.innerHTML = '';
            } else if (progress < 0.5) {
                const t = (progress - 0.15) / 0.35;
                if (pktAlice) { pktAlice.style.opacity = 1; pktAlice.style.left = `${t * 100}%`; }
                if (pktBob) pktBob.style.opacity = 0;
                if (log) log.innerHTML = '<span class="highlight">Received frame from Alice\nTarget: Bob (Socket #99)</span>';
                if (status) status.textContent = 'Routing message frame...';
                if (aliceChat) aliceChat.innerHTML = makeVoiceBubbleHTML(true, false, '0:03');
                if (bobChat) bobChat.innerHTML = '';
            } else if (progress < 0.85) {
                const t = (progress - 0.5) / 0.35;
                if (pktAlice) pktAlice.style.opacity = 0;
                if (pktBob) { pktBob.style.opacity = 1; pktBob.style.left = `${t * 100}%`; }
                if (log) log.innerHTML = '<span class="highlight">Sync ok. Pushing to Bob socket...</span>';
                if (status) status.textContent = 'Server pushing message...';
                if (aliceChat) aliceChat.innerHTML = makeVoiceBubbleHTML(true, false, '0:03');
                if (bobChat) bobChat.innerHTML = '<div class="v34-typing active"><span></span><span></span><span></span></div>';
            } else {
                if (pktAlice) pktAlice.style.opacity = 0;
                if (pktBob) pktBob.style.opacity = 0;
                if (log) log.innerHTML = '<span class="success">Socket #99: Message pushed successfully!</span>';
                if (status) status.textContent = 'Message delivered instantly to Bob! ✓';
                if (aliceChat) aliceChat.innerHTML = makeVoiceBubbleHTML(true, false, '0:03');
                if (bobChat) bobChat.innerHTML = makeVoiceBubbleHTML(false, false, '0:03');
            }
        }
        else if (slideId === 'slide_chat_scale_problem') {
            const status = canvas.querySelector('#v34-scale-status');
            const block = canvas.querySelector('#v34-scale-block');

            if (progress < 0.5) {
                if (status) status.textContent = 'Alice sends message to Bob (on Server 2)';
                if (block) block.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            } else {
                if (status) status.innerHTML = '❌ <span class="red">Server 1 has no socket registry for Bob. Message blocked.</span>';
                if (block) block.style.borderColor = 'var(--chat-red)';
            }
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            const status = canvas.querySelector('#v34-redis-status');
            const core = canvas.querySelector('#v34-redis-core');

            if (progress < 0.45) {
                if (status) status.textContent = 'Server 1 publishes event to Redis channel...';
                if (core) core.style.transform = 'scale(1)';
            } else {
                if (status) status.innerHTML = '<span class="purple">Redis Pub/Sub broadcasts event to Server 2 instantly! ✓</span>';
                if (core) core.style.transform = `scale(${1.1 + Math.sin(progress * 25) * 0.05})`;
            }
        }
        else if (slideId === 'slide_chat_full_arch') {
            const list = canvas.querySelector('#v34-arch-list');
            const status = canvas.querySelector('#v34-arch-status');
            if (list) {
                const nodes = list.querySelectorAll('.v34-node');
                const step = Math.min(4, Math.floor(progress * 5));
                nodes.forEach((node, idx) => {
                    node.className = 'v34-node';
                    if (idx === step) {
                        const stepColors = ['active-blue', 'active-gold', 'active-green', 'active-purple', 'active-green'];
                        node.classList.add(stepColors[idx]);
                    }
                });
                const labels = [
                    '1. Client Browser upgrades to WebSocket...',
                    '2. Load Balancer selects target node...',
                    '3. WS Server Node registers connection...',
                    '4. Redis Pub/Sub coordinates server cluster...',
                    '5. PostgreSQL persists chat room history ✓'
                ];
                if (status) status.textContent = labels[step];
            }
        }
        else if (slideId === 'slide_chat_compare') {
            const cmpWs = canvas.querySelector('#v34-cmp-ws');
            if (cmpWs) {
                if (progress > 0.45) {
                    cmpWs.style.borderColor = 'var(--chat-green)';
                    cmpWs.style.transform = 'translateY(-4px)';
                } else {
                    cmpWs.style.borderColor = 'rgba(16, 185, 129, 0.25)';
                    cmpWs.style.transform = 'translateY(0)';
                }
            }
        }
        else if (slideId === 'slide_chat_outro') {
            // Outro slide triggers
        }
        else if (slideId === 'slide_chat_follow') {
            // Follow slide triggers
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

    console.log('[Video34 Plugin] Loaded completely rebuilt premium 12-slide chat simulation.');
})();
