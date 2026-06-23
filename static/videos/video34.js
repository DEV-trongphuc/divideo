/**
 * Video 34: Real-time Chat — WebSockets & Redis Pub/Sub (Premium UI)
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_chat_intro: [
            { text: 'tức thì', start: 1.0, end: 8.0, class: 'active-gold' },
            { text: 'WebSocket', start: 8.0, end: 17.0, class: 'active-good' }
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
        'slide_chat_intro', 'slide_chat_http', 'slide_chat_polling',
        'slide_chat_websocket_intro', 'slide_chat_ws_handshake', 'slide_chat_ws_flow',
        'slide_chat_scale_problem', 'slide_chat_redis_pubsub', 'slide_chat_full_arch',
        'slide_chat_compare', 'slide_chat_outro'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, tint) {
        const bgClass = tint ? ` v34-scene-bg ${tint}` : ' v34-scene-bg';
        return `<div class="v34-zoom-container"><div class="${bgClass.trim()}"></div><div class="v34-scene-content">${inner}</div></div>`;
    }

    function nodeIcon(icon, color) {
        return `<div class="v34-node-icon-wrap"><i data-lucide="${icon}" style="width:22px;height:22px;color:${color || '#fff'};"></i></div>`;
    }

    function phoneMock(id, name, avatarClass, letter) {
        return `
        <div class="v34-phone" id="${id}">
            <div class="v34-phone-notch"></div>
            <div class="v34-phone-statusbar"><span>9:41</span><span>●●●</span></div>
            <div class="v34-phone-header">
                <div class="v34-avatar ${avatarClass}">${letter}</div>
                <div class="v34-phone-meta">
                    <span class="v34-phone-name">${name}</span>
                    <span class="v34-phone-online">● online</span>
                </div>
            </div>
            <div class="v34-chat-area" id="${id}-chat"></div>
        </div>`;
    }

    function getCenterOffset(el, container) {
        if (!el || !container) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (contRect.width / container.offsetWidth) : 1.4;
        return {
            x: (rect.left - contRect.left + rect.width / 2) / zoom,
            y: (rect.top - contRect.top + rect.height / 2) / zoom
        };
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
        const start = getCenterOffset(startNode, container);
        const end = getCenterOffset(endNode, container);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dy) < 5) {
            path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
        } else {
            path.setAttribute('d', `M ${start.x} ${start.y} C ${start.x + dx * 0.4} ${start.y}, ${end.x - dx * 0.4} ${end.y}, ${end.x} ${end.y}`);
        }
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '8 6');
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

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        }
        if (!needsTemplate) return;

        if (slideId === 'slide_chat_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-phones-row intro-layout">
                    ${phoneMock('v34-phone-alice', 'Alice', 'blue', 'A')}
                    <div class="v34-intro-connector" id="v34-intro-connector">
                        <div class="v34-connector-line" id="v34-intro-line-l"></div>
                        <div class="v34-zap-hub" id="v34-intro-hub">
                            <div class="v34-zap-ring"></div>
                            <div class="v34-zap-ring"></div>
                            <i data-lucide="zap" style="color:var(--chat-green);" id="v34-intro-zap"></i>
                            <span class="v34-latency-pill" id="v34-intro-latency">&lt;50ms</span>
                        </div>
                        <div class="v34-connector-line" id="v34-intro-line-r"></div>
                    </div>
                    ${phoneMock('v34-phone-bob', 'Bob', 'purple', 'B')}
                </div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="message-circle" style="width:12px;height:12px;"></i> Real-time</span>
                    <span style="font-family:'Fira Code',monospace;font-size:11px;font-weight:bold;color:var(--chat-text-muted);" id="v34-intro-status">Đang gửi tin nhắn...</span>
                </div>`, 'green-tint');
            canvas.querySelector('#v34-phone-alice-chat').innerHTML =
                '<div class="v34-bubble sent" id="v34-intro-sent">Xin chào! 👋<div class="v34-bubble-meta">Gửi ✓</div></div>';
            canvas.querySelector('#v34-phone-bob-chat').innerHTML =
                '<div class="v34-typing" id="v34-intro-typing"><span></span><span></span><span></span></div>' +
                '<div class="v34-bubble recv" id="v34-intro-recv">Xin chào! 👋<div class="v34-bubble-meta">vừa xong</div></div>' +
                '<div class="v34-delivered-toast" id="v34-intro-toast"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Delivered instantly</div>';
            initIcons();
        }
        else if (slideId === 'slide_chat_http') {
            canvas.innerHTML = sceneWrap(`
                <svg class="v34-svg-container"><path id="v34-path-http-req" class="flow-blue" /><path id="v34-path-http-res" class="flow-green" /></svg>
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;position:relative;z-index:3;" id="v34-http-container">
                    <div class="v34-node active-blue" id="v34-http-client">
                        ${nodeIcon('monitor-smartphone', 'var(--chat-blue)')}
                        <span>Browser Client</span>
                        <span style="font-size:8px;color:var(--chat-text-muted);margin-top:3px;">Chủ động Request</span>
                    </div>
                    <div class="v34-node" id="v34-http-server">
                        ${nodeIcon('server', '#fff')}
                        <span>HTTP Server</span>
                        <span style="font-size:8px;color:var(--chat-red);margin-top:3px;font-weight:bold;" id="v34-http-lock">🔒 Tin mới bị khóa</span>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-http-pkt-req"><div class="v34-packet-core"></div><span class="v34-packet-label">GET</span></div>
                <div class="v34-packet-wrap" id="v34-http-pkt-res"><div class="v34-packet-core green"></div><span class="v34-packet-label">200 OK</span></div>
                <div class="v34-glass-card glow-red" style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:10px;font-weight:bold;color:var(--chat-text-muted);text-transform:uppercase;">HTTP Cycle</span>
                    <span style="font-family:'Fira Code',monospace;font-size:11px;font-weight:bold;color:var(--chat-red);" id="v34-http-status">Server không thể push chủ động</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_polling') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-storm-particles" id="v34-storm"></div>
                <svg class="v34-svg-container"><path id="v34-path-poll" class="flow-red" /></svg>
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;position:relative;z-index:3;" id="v34-poll-container">
                    <div class="v34-node active-blue" id="v34-poll-client">
                        ${nodeIcon('refresh-cw', 'var(--chat-blue)')}
                        <span>Client Poll</span>
                        <span style="font-size:8px;color:var(--chat-cyan);">⏱ every 3s</span>
                    </div>
                    <div class="v34-node" id="v34-poll-server">
                        ${nodeIcon('server', '#fff')}
                        <span>Chat Server</span>
                        <div class="v34-metrics-bar"><div class="v34-metrics-fill" id="v34-poll-cpu"></div></div>
                        <span style="font-size:8px;color:var(--chat-text-muted);margin-top:4px;" id="v34-poll-req-rate">0 req/s</span>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-poll-pkt"><div class="v34-packet-core red"></div><span class="v34-packet-label">GET []</span></div>
                <div class="v34-glass-card glow-red">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;align-items:center;">
                        <span style="font-size:10px;font-weight:bold;color:var(--chat-text-muted);">⚡ POLL STORM LOG</span>
                        <span class="v34-status-val-pill red" id="v34-poll-counter">0 empty</span>
                    </div>
                    <div class="v34-poll-log" id="v34-poll-log"></div>
                </div>`, 'red-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-tunnel-wrap">
                    <div class="v34-node active-blue" id="v34-ws-client">
                        ${nodeIcon('monitor-smartphone', 'var(--chat-blue)')}
                        <span style="font-size:10px;">Client</span>
                    </div>
                    <div class="v34-tunnel-pipe" id="v34-ws-pipe">
                        <div class="v34-tunnel-flow"></div>
                        <span class="v34-tunnel-label">WS TUNNEL OPEN</span>
                        <div class="v34-tunnel-pulse fwd" id="v34-ws-pulse-fwd"></div>
                        <div class="v34-tunnel-pulse rev" id="v34-ws-pulse-rev"></div>
                    </div>
                    <div class="v34-node active-green" id="v34-ws-server">
                        ${nodeIcon('radio', 'var(--chat-green)')}
                        <span style="font-size:10px;">WS Server</span>
                    </div>
                </div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="arrow-left-right" style="width:12px;height:12px;"></i> Full-Duplex</span>
                    <span style="font-family:'Fira Code',monospace;font-size:11px;font-weight:bold;color:var(--chat-green);" id="v34-ws-tunnel-status">Establishing tunnel...</span>
                </div>`, 'green-tint');
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
                    <div class="v34-terminal" id="v34-hs-res-term" style="opacity:0.25;transform:scale(0.97);transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);">
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
                <div class="v34-glass-card" style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                    <span class="v34-protocol-badge http active" id="v34-hs-badge-http">HTTP</span>
                    <span style="font-size:14px;color:var(--chat-text-muted);">→</span>
                    <span class="v34-protocol-badge ws" id="v34-hs-badge-ws">WebSocket</span>
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-green);margin-left:auto;" id="v34-hs-status">Handshake...</span>
                </div>`);
        }
        else if (slideId === 'slide_chat_ws_flow') {
            canvas.innerHTML = sceneWrap(`
                <svg class="v34-svg-container">
                    <path id="v34-path-flow-a-s" class="flow-blue" />
                    <path id="v34-path-flow-s-b" class="flow-green" />
                </svg>
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;position:relative;z-index:3;" id="v34-flow-container">
                    <div class="v34-phone active-send" id="v34-flow-alice" style="width:130px;height:220px;">
                        <div class="v34-phone-notch"></div>
                        <div class="v34-phone-header" style="padding:6px 10px;">
                            <div class="v34-avatar blue" style="width:22px;height:22px;font-size:9px;">A</div>
                            <span class="v34-phone-name" style="font-size:9px;">Alice</span>
                        </div>
                        <div class="v34-chat-area"><div class="v34-bubble sent visible" id="v34-flow-sent">Xin chào!</div></div>
                    </div>
                    <div class="v34-node active-green v34-pulse-radar" id="v34-flow-server" style="min-width:88px;">
                        ${nodeIcon('radio', 'var(--chat-green)')}
                        <span style="font-size:9px;">WS Server</span>
                    </div>
                    <div class="v34-phone" id="v34-flow-bob" style="width:130px;height:220px;">
                        <div class="v34-phone-notch"></div>
                        <div class="v34-phone-header" style="padding:6px 10px;">
                            <div class="v34-avatar purple" style="width:22px;height:22px;font-size:9px;">B</div>
                            <span class="v34-phone-name" style="font-size:9px;">Bob</span>
                        </div>
                        <div class="v34-chat-area"><div class="v34-bubble recv" id="v34-flow-recv">Xin chào!</div></div>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-flow-pkt1"><div class="v34-packet-core"></div><span class="v34-packet-label">{msg}</span></div>
                <div class="v34-packet-wrap" id="v34-flow-pkt2"><div class="v34-packet-core green"></div><span class="v34-packet-label">PUSH</span></div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="send" style="width:12px;height:12px;"></i> Instant Push</span>
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-cyan);" id="v34-flow-status">{"type":"msg","text":"Xin chào!"}</span>
                </div>`, 'green-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_scale_problem') {
            canvas.innerHTML = sceneWrap(`
                <svg class="v34-svg-container">
                    <path id="v34-path-scale-s1-mid" class="flow-blue" />
                    <path id="v34-path-scale-block" class="flow-red" />
                </svg>
                <div class="v34-scale-grid">
                    <div class="v34-node active-gold" id="v34-scale-lb" style="width:100%;flex-direction:row;gap:8px;padding:10px;">
                        <i data-lucide="network" style="width:18px;height:18px;color:var(--chat-gold);"></i>
                        <span>Load Balancer</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:stretch;width:100%;gap:8px;position:relative;z-index:3;">
                        <div class="v34-node active-blue" id="v34-scale-s1">
                            ${nodeIcon('server', 'var(--chat-blue)')}
                            <span style="font-size:9px;">WS Server 1</span>
                            <span style="font-size:8px;color:var(--chat-blue);"><span class="v34-user-dot" style="background:var(--chat-blue);"></span>User A</span>
                        </div>
                        <div class="v34-block-zone" id="v34-scale-block">
                            <i data-lucide="ban" style="width:36px;height:36px;color:var(--chat-red);" id="v34-scale-ban"></i>
                            <span style="font-size:9px;color:var(--chat-red);font-weight:bold;">CROSS-SERVER FAIL</span>
                        </div>
                        <div class="v34-node" id="v34-scale-s2">
                            ${nodeIcon('server', '#fff')}
                            <span style="font-size:9px;">WS Server 2</span>
                            <span style="font-size:8px;color:var(--chat-purple);"><span class="v34-user-dot" style="background:var(--chat-purple);"></span>User B</span>
                        </div>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-scale-pkt"><div class="v34-packet-core red"></div><span class="v34-packet-label">msg</span></div>
                <div class="v34-glass-card glow-red">
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-red);" id="v34-scale-status">❌ Message stuck on Server 1</span>
                </div>`, 'red-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            canvas.innerHTML = sceneWrap(`
                <svg class="v34-svg-container">
                    <path id="v34-path-r-s1-redis" class="flow-gold" />
                    <path id="v34-path-r-redis-s2" class="flow-purple" />
                </svg>
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;position:relative;z-index:3;" id="v34-redis-container">
                    <div class="v34-node active-blue" id="v34-redis-s1">
                        ${nodeIcon('server', 'var(--chat-blue)')}
                        <span style="font-size:9px;">Server 1</span>
                        <span style="font-size:7px;color:var(--chat-gold);font-weight:bold;">PUBLISH ↑</span>
                    </div>
                    <div class="v34-redis-hub" id="v34-redis-hub">
                        <div class="v34-redis-ring r1" id="v34-redis-ring1"></div>
                        <div class="v34-redis-ring r2" id="v34-redis-ring2"></div>
                        <div class="v34-redis-ring r3" id="v34-redis-ring3"></div>
                        <div class="v34-redis-core" id="v34-redis-core">
                            <i data-lucide="database" style="width:22px;height:22px;color:var(--chat-purple);"></i>
                            <span style="font-size:7px;color:var(--chat-purple);margin-top:2px;font-weight:bold;">Pub/Sub</span>
                        </div>
                    </div>
                    <div class="v34-node" id="v34-redis-s2">
                        ${nodeIcon('server', '#fff')}
                        <span style="font-size:9px;">Server 2</span>
                        <span style="font-size:7px;color:var(--chat-green);font-weight:bold;">SUB → PUSH</span>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-redis-pkt1"><div class="v34-packet-core gold"></div><span class="v34-packet-label">PUBLISH</span></div>
                <div class="v34-packet-wrap" id="v34-redis-pkt2"><div class="v34-packet-core purple"></div><span class="v34-packet-label">BROADCAST</span></div>
                <div class="v34-packet-wrap" id="v34-redis-pkt3"><div class="v34-packet-core green"></div><span class="v34-packet-label">PUSH</span></div>
                <div class="v34-glass-card glow-purple" style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="radio-tower" style="width:12px;height:12px;"></i> Channel</span>
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-purple);" id="v34-redis-status">chat:room:42</span>
                </div>`);
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
                        <div class="v34-node dimmed" id="v34-arch-client">${nodeIcon('smartphone', 'var(--chat-blue)')}<span style="font-size:8px;">Client</span></div>
                        <span class="v34-arch-connector" id="v34-conn-1">→</span>
                        <div class="v34-node dimmed" id="v34-arch-lb">${nodeIcon('network', 'var(--chat-gold)')}<span style="font-size:8px;">Load Balancer</span></div>
                        <span class="v34-arch-connector" id="v34-conn-2">→</span>
                        <div class="v34-node dimmed" id="v34-arch-ws">${nodeIcon('radio', 'var(--chat-green)')}<span style="font-size:8px;">WS Cluster</span></div>
                    </div>
                    <div class="v34-arch-row">
                        <div class="v34-node dimmed" id="v34-arch-redis">${nodeIcon('database', 'var(--chat-purple)')}<span style="font-size:8px;">Redis Pub/Sub</span></div>
                        <span class="v34-arch-connector" id="v34-conn-3">⇄</span>
                        <div class="v34-node dimmed" id="v34-arch-db">${nodeIcon('hard-drive', '#fff')}<span style="font-size:8px;">PostgreSQL</span></div>
                    </div>
                </div>
                <div class="v34-packet-wrap" id="v34-arch-pkt"><div class="v34-packet-core green"></div><span class="v34-packet-label">msg</span></div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:9px;font-weight:bold;color:var(--chat-text-muted);">PRODUCTION PIPELINE</span>
                    <span style="font-family:'Fira Code',monospace;font-size:10px;font-weight:bold;color:var(--chat-green);" id="v34-arch-status">Initializing...</span>
                </div>`, 'green-tint');
            initIcons();
        }
        else if (slideId === 'slide_chat_compare') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-compare-grid">
                    <div class="v34-compare-col loser" id="v34-cmp-poll">
                        <div class="v34-compare-icon" style="background:rgba(244,63,94,0.15);"><i data-lucide="refresh-cw" style="width:16px;height:16px;color:var(--chat-red);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-red);">HTTP Polling</div>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill red" id="v34-bar-poll-bat"></div></div></div>
                        </div>
                    </div>
                    <div class="v34-compare-col loser" id="v34-cmp-long">
                        <div class="v34-compare-icon" style="background:rgba(245,158,11,0.15);"><i data-lucide="hourglass" style="width:16px;height:16px;color:var(--chat-gold);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-gold);">Long Poll</div>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill yellow" id="v34-bar-long-bat"></div></div></div>
                        </div>
                    </div>
                    <div class="v34-compare-col" id="v34-cmp-ws">
                        <div class="v34-compare-icon" style="background:rgba(16,185,129,0.15);"><i data-lucide="zap" style="width:16px;height:16px;color:var(--chat-green);"></i></div>
                        <div class="v34-compare-title" style="color:var(--chat-green);">WebSocket</div>
                        <span class="v34-crown" id="v34-cmp-crown">👑</span>
                        <div class="v34-bar-wrap">
                            <div class="v34-bar-row"><span class="v34-bar-label">Latency</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-lat"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Requests</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-req"></div></div></div>
                            <div class="v34-bar-row"><span class="v34-bar-label">Battery</span><div class="v34-bar-track"><div class="v34-bar-fill green" id="v34-bar-ws-bat"></div></div></div>
                        </div>
                    </div>
                </div>
                <div class="v34-glass-card glow-green" style="text-align:center;">
                    <span style="font-size:11px;font-weight:bold;color:var(--chat-green);" id="v34-cmp-verdict">WebSocket wins on all metrics 🏆</span>
                </div>`);
            initIcons();
        }
        else if (slideId === 'slide_chat_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v34-outro-grid">
                    <div class="v34-outro-card" id="v34-outro-1">
                        <div class="v34-outro-icon" style="background:rgba(16,185,129,0.15);"><i data-lucide="zap" style="width:16px;height:16px;color:var(--chat-green);"></i></div>
                        <span class="v34-outro-number">&lt; 50ms</span>
                        <span class="v34-outro-label">WebSocket Latency</span>
                        <span class="v34-outro-desc">Đường hầm hai chiều, server push tức thì.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-2">
                        <div class="v34-outro-icon" style="background:rgba(59,130,246,0.15);"><i data-lucide="unlink" style="width:16px;height:16px;color:var(--chat-blue);"></i></div>
                        <span class="v34-outro-number">1 conn</span>
                        <span class="v34-outro-label">Zero Polling</span>
                        <span class="v34-outro-desc">Không spam request rỗng, tiết kiệm pin.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-3">
                        <div class="v34-outro-icon" style="background:rgba(168,85,247,0.15);"><i data-lucide="radio-tower" style="width:16px;height:16px;color:var(--chat-purple);"></i></div>
                        <span class="v34-outro-number">Pub/Sub</span>
                        <span class="v34-outro-label">Redis Broadcast</span>
                        <span class="v34-outro-desc">Đồng bộ tin giữa hàng trăm WS Server.</span>
                    </div>
                    <div class="v34-outro-card" id="v34-outro-4">
                        <div class="v34-outro-icon" style="background:rgba(245,158,11,0.15);"><i data-lucide="database" style="width:16px;height:16px;color:var(--chat-gold);"></i></div>
                        <span class="v34-outro-number">DB + WS</span>
                        <span class="v34-outro-label">Real-time + History</span>
                        <span class="v34-outro-desc">PostgreSQL lưu lịch sử, WS giao tin live.</span>
                    </div>
                </div>
                <div class="v34-glass-card glow-green" style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="v34-status-badge green"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Chat Architecture</span>
                    <span style="font-size:11px;font-weight:bold;color:#fff;">Production Ready ✓</span>
                </div>`, 'green-tint');
            initIcons();
        }
    }

    function updateFrame(slideId, canvas, progress) {
        const container = canvas.querySelector('.v34-zoom-container');

        if (slideId === 'slide_chat_intro') {
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

            if (progress < 0.2) {
                if (alice) alice.classList.add('active-send');
                if (sent) sent.classList.add('visible');
                if (typing) typing.classList.remove('active');
                if (recv) recv.classList.remove('visible');
                if (lineL) lineL.classList.remove('active');
                if (lineR) lineR.classList.remove('active');
                if (status) status.textContent = 'Alice nhấn Gửi...';
                if (toast) toast.classList.remove('show');
            } else if (progress < 0.55) {
                if (lineL) lineL.classList.add('active');
                if (lineR) lineR.classList.add('active');
                if (typing) typing.classList.add('active');
                if (recv) recv.classList.remove('visible');
                if (status) status.textContent = '⚡ Truyền qua mạng...';
                if (latency) latency.classList.add('flash');
            } else {
                if (bob) bob.classList.add('active-recv');
                if (typing) typing.classList.remove('active');
                if (recv) recv.classList.add('visible');
                if (toast) toast.classList.add('show');
                if (status) { status.textContent = '✓ Delivered — không cần F5'; status.style.color = 'var(--chat-green)'; }
            }
        }
        else if (slideId === 'slide_chat_http') {
            const client = canvas.querySelector('#v34-http-client');
            const server = canvas.querySelector('#v34-http-server');
            const pktReq = canvas.querySelector('#v34-http-pkt-req');
            const pktRes = canvas.querySelector('#v34-http-pkt-res');
            const status = canvas.querySelector('#v34-http-status');
            const lock = canvas.querySelector('#v34-http-lock');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v34-path-http-req', client, server, container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-http-res', server, client, container, 'flow-green');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const cOff = getCenterOffset(client, container);
            const sOff = getCenterOffset(server, container);
            const cycle = (progress * 2.5) % 1;

            if (cycle < 0.42) {
                placePacket(pktReq, cOff, sOff, cycle / 0.42);
                hidePacket(pktRes);
                if (client) client.classList.add('active-blue');
                if (server) server.classList.remove('active-red');
                if (status) status.textContent = '→ GET /api/messages';
            } else if (cycle < 0.78) {
                hidePacket(pktReq);
                placePacket(pktRes, sOff, cOff, (cycle - 0.42) / 0.36);
                if (status) status.textContent = '← 200 OK (connection closed)';
            } else {
                hidePacket(pktReq);
                hidePacket(pktRes);
                if (lock) lock.textContent = '🔒 Tin mới vẫn khóa — cần Request mới';
                if (server) server.classList.add('active-red');
                if (status) status.textContent = 'Server KHÔNG thể push chủ động';
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
            const storm = canvas.querySelector('#v34-storm');

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v34-path-poll', client, server, container, 'flow-red');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const pollCount = Math.min(5, Math.floor(progress * 6) + 1);
            const cpuPct = Math.min(98, 12 + progress * 88);

            if (cpu) {
                cpu.style.width = `${cpuPct}%`;
                cpu.className = cpuPct > 65 ? 'v34-metrics-fill critical' : 'v34-metrics-fill';
            }
            if (rate) rate.textContent = `${Math.round(3333 * Math.min(1, progress * 1.2))} req/s`;
            if (counter) counter.textContent = `${Math.max(0, pollCount - 1)} empty responses`;
            if (server) server.className = cpuPct > 65 ? 'v34-node active-red' : 'v34-node';

            if (log) {
                let html = '';
                for (let i = 0; i < pollCount; i++) {
                    const isHit = i === pollCount - 1 && progress > 0.88;
                    html += `<div class="v34-poll-line visible ${isHit ? 'hit' : 'empty'}">[${(i + 1) * 3}s] GET /messages → ${isHit ? '200 ["Hello!"] ✓' : '200 []'}</div>`;
                }
                log.innerHTML = html;
            }

            if (storm && progress > 0.4 && storm.childElementCount < 12) {
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'v34-storm-dot';
                    dot.style.left = `${20 + Math.random() * 60}%`;
                    dot.style.top = `${10 + Math.random() * 80}%`;
                    dot.style.opacity = `${0.3 + progress * 0.5}`;
                    storm.appendChild(dot);
                }
            }

            const cOff = getCenterOffset(client, container);
            const sOff = getCenterOffset(server, container);
            placePacket(pkt, cOff, sOff, (progress * 10) % 1);
        }
        else if (slideId === 'slide_chat_websocket_intro') {
            const pipe = canvas.querySelector('#v34-ws-pipe');
            const fwd = canvas.querySelector('#v34-ws-pulse-fwd');
            const rev = canvas.querySelector('#v34-ws-pulse-rev');
            const status = canvas.querySelector('#v34-ws-tunnel-status');
            const client = canvas.querySelector('#v34-ws-client');
            const server = canvas.querySelector('#v34-ws-server');

            if (pipe) pipe.classList.toggle('active', progress > 0.12);
            if (client) client.classList.toggle('active-blue', progress > 0.1);
            if (server) server.classList.toggle('active-green', progress > 0.2);

            const spd = progress * 5;
            if (fwd) {
                fwd.style.opacity = progress > 0.15 ? '1' : '0';
                fwd.style.left = `${((spd) % 1) * 100}%`;
            }
            if (rev) {
                rev.style.opacity = progress > 0.2 ? '1' : '0';
                rev.style.left = `${(1 - ((spd + 0.35) % 1)) * 100}%`;
            }
            if (status) {
                status.textContent = progress > 0.45
                    ? '↓ Server PUSH  +  ↑ Client SEND'
                    : progress > 0.12 ? 'Tunnel OPEN — streaming...' : 'Establishing tunnel...';
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

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v34-path-flow-a-s', alice, server, container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-flow-s-b', server, bob, container, 'flow-green');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const aOff = getCenterOffset(alice, container);
            const sOff = getCenterOffset(server, container);
            const bOff = getCenterOffset(bob, container);

            if (progress < 0.38) {
                placePacket(pkt1, aOff, sOff, progress / 0.38);
                hidePacket(pkt2);
                if (recv) recv.classList.remove('visible');
                if (status) status.textContent = '{"type":"msg","from":"Alice"}';
            } else if (progress < 0.72) {
                hidePacket(pkt1);
                placePacket(pkt2, sOff, bOff, (progress - 0.38) / 0.34);
                if (server) server.classList.add('active-green');
                if (status) status.textContent = 'Server PUSH → Bob socket';
            } else {
                hidePacket(pkt1);
                hidePacket(pkt2);
                if (bob) bob.classList.add('active-recv');
                if (recv) recv.classList.add('visible');
                if (status) { status.textContent = '✓ Delivered in <50ms'; status.style.color = 'var(--chat-green)'; }
            }
        }
        else if (slideId === 'slide_chat_scale_problem') {
            const s1 = canvas.querySelector('#v34-scale-s1');
            const s2 = canvas.querySelector('#v34-scale-s2');
            const block = canvas.querySelector('#v34-scale-block');
            const pkt = canvas.querySelector('#v34-scale-pkt');
            const status = canvas.querySelector('#v34-scale-status');

            const s1Off = getCenterOffset(s1, container);
            const blockOff = getCenterOffset(block, container);

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v34-path-scale-s1-mid', s1, block, container, 'flow-blue');
                const s2Off = getCenterOffset(s2, container);
                const pathBlock = canvas.querySelector('#v34-path-scale-block');
                if (pathBlock) {
                    pathBlock.setAttribute('d', `M ${blockOff.x} ${blockOff.y} L ${s2Off.x} ${s2Off.y}`);
                    pathBlock.setAttribute('stroke-width', '2.5');
                    pathBlock.setAttribute('stroke-dasharray', '6 8');
                    pathBlock.setAttribute('class', 'flow-red');
                }
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            if (progress < 0.55) {
                placePacket(pkt, s1Off, blockOff, progress / 0.55);
                if (block) block.classList.remove('active');
                if (s1) s1.classList.add('active-blue');
            } else {
                if (pkt) {
                    pkt.style.left = `${blockOff.x}px`;
                    pkt.style.top = `${blockOff.y}px`;
                    pkt.classList.add('visible');
                }
                if (block) block.classList.add('active');
                if (s1) s1.classList.add('active-red');
                if (s2) s2.classList.add('dimmed');
                if (status) status.textContent = '❌ User B on Server 2 — message LOST';
            }
        }
        else if (slideId === 'slide_chat_redis_pubsub') {
            const s1 = canvas.querySelector('#v34-redis-s1');
            const core = canvas.querySelector('#v34-redis-core');
            const s2 = canvas.querySelector('#v34-redis-s2');
            const pkt1 = canvas.querySelector('#v34-redis-pkt1');
            const pkt2 = canvas.querySelector('#v34-redis-pkt2');
            const pkt3 = canvas.querySelector('#v34-redis-pkt3');
            const status = canvas.querySelector('#v34-redis-status');
            const rings = ['#v34-redis-ring1', '#v34-redis-ring2', '#v34-redis-ring3'];

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                const hub = canvas.querySelector('.v34-redis-hub');
                drawSVGPath(canvas, '#v34-path-r-s1-redis', s1, hub, container, 'flow-gold');
                drawSVGPath(canvas, '#v34-path-r-redis-s2', hub, s2, container, 'flow-purple');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            const hubEl = canvas.querySelector('.v34-redis-hub');
            const s1Off = getCenterOffset(s1, container);
            const rOff = getCenterOffset(hubEl, container);
            const s2Off = getCenterOffset(s2, container);

            if (progress < 0.32) {
                placePacket(pkt1, s1Off, rOff, progress / 0.32);
                hidePacket(pkt2);
                hidePacket(pkt3);
                if (status) status.textContent = 'PUBLISH chat:room:42';
            } else if (progress < 0.58) {
                hidePacket(pkt1);
                placePacket(pkt2, rOff, s2Off, (progress - 0.32) / 0.26);
                if (core) core.classList.add('burst');
                rings.forEach(sel => { const r = canvas.querySelector(sel); if (r) r.classList.add('pulse-active'); });
                if (s2) s2.classList.add('active-green');
                if (status) status.textContent = 'Redis BROADCAST → all servers';
            } else {
                hidePacket(pkt1);
                hidePacket(pkt2);
                placePacket(pkt3, s2Off, { x: s2Off.x + 35, y: s2Off.y - 15 }, (progress - 0.58) / 0.42);
                if (status) status.textContent = '✓ PUSH to User B — delivered!';
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

            if (canvas.getAttribute('data-paths-drawn') !== 'true') {
                drawSVGPath(canvas, '#v34-path-arch-1', nodes[0], nodes[1], container, 'flow-blue');
                drawSVGPath(canvas, '#v34-path-arch-2', nodes[1], nodes[2], container, 'flow-green');
                drawSVGPath(canvas, '#v34-path-arch-3', nodes[2], nodes[3], container, 'flow-purple');
                drawSVGPath(canvas, '#v34-path-arch-4', nodes[3], nodes[4], container, 'flowing');
                canvas.setAttribute('data-paths-drawn', 'true');
            }

            nodes.forEach((n, i) => {
                if (!n) return;
                const lit = progress > i * 0.16;
                n.classList.toggle('dimmed', !lit);
                n.classList.toggle('lit', lit);
                if (lit) n.classList.add('active-green');
            });
            conns.forEach((c, i) => {
                if (c) c.classList.toggle('lit', progress > (i + 1) * 0.16);
            });

            const offsets = nodes.map(n => getCenterOffset(n, container));
            const seg = Math.min(3, Math.floor(progress * 4));
            const segT = (progress * 4) % 1;
            if (offsets[seg] && offsets[seg + 1]) {
                placePacket(pkt, offsets[seg], offsets[seg + 1], segT);
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
        topic: 'Real-time Chat: WebSockets & Redis Pub/Sub',
        episodeNum: 34,
        customSlideIds,
        keywordsData,
        renderGfx,
        updateFrame
    };

    console.log('[Video34 Plugin] Loaded: Premium chat simulation — 11 slides.');
})();
