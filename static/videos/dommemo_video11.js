/**
 * DOM Memo Video 11: Real-time Perception Illusion
 * Custom script plugin driving visual delay simulations, optic transmission speeds, AV synchronization, and comparison states.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo11_1: [
            { text: 'Thứ bạn đang thấy', start: 1.2, end: 4.2, class: 'active-pink' },
            { text: 'chậm hơn vài phần giây', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'thực tế', start: 8.0, end: 10.5, class: 'active-indigo' }
        ],
        slide_memo11_2: [
            { text: 'ánh sáng cần truyền', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'võng mạc', start: 5.2, end: 8.2, class: 'active-indigo' },
            { text: 'tám mươi mili-giây', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo11_3: [
            { text: 'giật lag', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'bộ đồng bộ hóa', start: 5.0, end: 8.0, class: 'active-purple' },
            { text: 'trải nghiệm liền mạch', start: 8.3, end: 11.5, class: 'active-indigo' }
        ],
        slide_memo11_4: [
            { text: 'Thực tế khách quan', start: 1.8, end: 5.0, class: 'active-indigo' },
            { text: 'tốc độ ánh sáng', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'bản dựng đã trễ', start: 8.8, end: 11.5, class: 'active-purple' }
        ],
        slide_memo11_5: [
            { text: 'sống trong quá khứ', start: 1.5, end: 4.5, class: 'active-indigo' },
            { text: 'tận hưởng từng khoảnh khắc', start: 5.0, end: 7.5, class: 'active-pink' }
        ],
        slide_memo11_6: [
            { text: 'follow DOM Memo', start: 1.0, end: 4.0, class: 'active-purple' },
            { text: 'thấu hiểu bản thân', start: 4.5, end: 7.0, class: 'active-indigo' }
        ]
    };

    const customSlideIds = [
        'slide_memo11_1', 'slide_memo11_2', 'slide_memo11_3', 'slide_memo11_4', 'slide_memo11_5', 'slide_memo11_6'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo11_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-1-container">
                        <!-- Ambient drift particles -->
                        <span class="ambient-delay-particle" style="top: 10%; left: 10%; animation-delay: -2s;">⏰</span>
                        <span class="ambient-delay-particle" style="top: 75%; left: 80%; animation-delay: -5s;">⚡</span>
                        <span class="ambient-delay-particle" style="top: 20%; left: 85%; animation-delay: -7s;">⏳</span>

                        <!-- Time lag lane simulator -->
                        <div class="delay-simulator-v11">
                            <!-- Track 1: Objective Reality -->
                            <div class="sim-track-lane lane-reality">
                                <span class="sim-track-label">THỰC TẾ KHÁCH QUAN</span>
                                <div class="track-node-v11 node-reality" style="left: 40px;">
                                    <span class="node-icon-glow">⚡</span>
                                    <span>Sự kiện xảy ra</span>
                                </div>
                            </div>

                            <!-- Track 2: Brain perception -->
                            <div class="sim-track-lane lane-brain">
                                <span class="sim-track-label">Ý THỨC CỦA NÃO</span>
                                <div class="track-node-v11 node-brain" style="left: 40px;">
                                    <span class="node-icon-glow">👁️</span>
                                    <span>Não nhận biết</span>
                                </div>
                            </div>
                            
                            <!-- Red lag offset connector -->
                            <div class="lag-offset-connector" style="left: 40px; width: 0px;">
                                <span class="lag-offset-badge">TRỄ 0ms</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo11_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-2-container">
                        <span class="ambient-delay-particle" style="top: 15%; left: 82%; animation-delay: -1s;">⚡</span>
                        <span class="ambient-delay-particle" style="top: 80%; left: 8%; animation-delay: -4s;">🧠</span>

                        <!-- Optic transmission pathway -->
                        <div class="transmission-board-v11">
                            <!-- Latency dashboard -->
                            <div class="latency-readout-v11">
                                <div class="readout-num">0 ms</div>
                                <div class="readout-lbl">ĐỘ TRỄ TRUYỀN DẪN</div>
                            </div>

                            <!-- Eye -->
                            <div class="trans-node-anchor">
                                <span class="trans-anchor-icon">👁️</span>
                                <span class="trans-anchor-lbl">VÕNG MẠC MẮT</span>
                            </div>

                            <!-- Nerve path -->
                            <div class="optic-nerve-pathway">
                                <div class="optic-pulse-dot" style="left: 0%;"></div>
                            </div>

                            <!-- Visual cortex brain -->
                            <div class="trans-node-anchor">
                                <span class="trans-anchor-icon">🧠</span>
                                <span class="trans-anchor-lbl">VỎ NÃO THỊ GIÁC</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01);">
                            💡 *Quy trình truyền dẫn*: Mắt chụp ảnh ➔ Võng mạc chuyển đổi tín hiệu điện ➔ Dây thần kinh thị giác dẫn truyền ➔ Vỏ não phân tích và dựng hình. Toàn bộ hành trình mất trung bình **80 mili-giây**.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo11_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-3-container">
                        <span class="ambient-delay-particle" style="top: 10%; left: 10%; animation-delay: -3s;">⏳</span>
                        <span class="ambient-delay-particle" style="top: 80%; left: 80%; animation-delay: -6s;">⏰</span>

                        <!-- Left: Sync lanes -->
                        <div class="sync-panel-v11">
                            <!-- Light Lane -->
                            <div class="sync-lane-track track-theme-light">
                                <span class="lane-label">ÁNH SÁNG (NHANH)</span>
                                <span class="sync-wave-signal light-wave-node" style="left: 40px;">⚡</span>
                            </div>

                            <!-- Sound Lane -->
                            <div class="sync-lane-track track-theme-sound">
                                <span class="lane-label">ÂM THANH (CHẬM)</span>
                                <span class="sync-wave-signal sound-wave-node" style="left: 40px;">🔊</span>
                            </div>

                            <!-- Sync buffer box overlay -->
                            <div class="brain-sync-envelope" style="left: 310px;">
                                <span class="envelope-core-icon">🧠</span>
                                <span style="font-size: 11px;">SYNC ENGINE</span>
                            </div>
                        </div>

                        <!-- Right: Dashboard data -->
                        <div class="sync-dashboard-v11">
                            <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                                TRÌNH ĐỒNG BỘ CẢM GIÁC
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái đồng bộ</span>
                                <span class="sync-status-badge waiting">ĐANG CHỜ TÍN HIỆU...</span>
                            </div>
                            
                            <div style="font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 5px;">
                                💡 *Cơ chế hoạt động*: Vì ánh sáng đi nhanh hơn âm thanh, não sẽ tự động "giữ chân" tín hiệu hình ảnh lại một nhịp ngắn để chờ âm thanh truyền tới vỏ não rồi mới xuất ra ý thức cùng lúc.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo11_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-4-container">
                        <span class="ambient-delay-particle" style="top: 8%; left: 82%; animation-delay: -2s;">⚡</span>
                        <span class="ambient-delay-particle" style="top: 78%; left: 12%; animation-delay: -5s;">👁️</span>

                        <div class="comparison-row-v11">
                            <!-- Left Card: Objective reality -->
                            <div class="comparison-card-v11 card-theme-realtime card-active">
                                <div class="comp-header-v11">
                                    <h3>THỰC TẾ KHÁCH QUAN</h3>
                                    <div class="comp-icon-badge-v11">⚡</div>
                                </div>
                                
                                <div class="comp-list-v11">
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">⚡</span>
                                        <span>Thời gian thực tuyệt đối</span>
                                    </div>
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">⚡</span>
                                        <span>Ánh sáng và âm thanh đi rời rạc</span>
                                    </div>
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">⚡</span>
                                        <span>Sự kiện diễn ra tức thời</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v11">TỨC THỜI & RỜI RẠC</div>
                            </div>

                            <!-- Right Card: Brain perception -->
                            <div class="comparison-card-v11 card-theme-brain card-inactive">
                                <div class="comp-header-v11">
                                    <h3>NHẬN THỨC CỦA BẠN</h3>
                                    <div class="comp-icon-badge-v11">🧠</div>
                                </div>
                                
                                <div class="comp-list-v11">
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">✨</span>
                                        <span>Đã bị trễ khoảng 80 mili-giây</span>
                                    </div>
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">✨</span>
                                        <span>Đã được não bộ gom và căn chỉnh</span>
                                    </div>
                                    <div class="comp-row-v11">
                                        <span class="comp-bullet-v11">✨</span>
                                        <span>Trải nghiệm mượt mà, liền mạch</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v11">MƯỢT MÀ & LIỀN MẠCH</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo11_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-5-container">
                        <div class="calming-radar-v11"></div>
                        
                        <!-- Reassurance box -->
                        <div class="outro-reassurance-box-v11" style="transform: scale(0.9); opacity: 0; margin-top: 180px;">
                            <div class="reassurance-face-v11">🌍</div>
                            <div class="reassurance-text-v11">
                                "Ý thức của chúng ta thực ra đang sống trong quá khứ 80ms. Hãy thả lỏng và trân trọng hiện tại nhé!"
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo11_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo11-5-container">
                        <div class="calming-radar-v11"></div>
                        
                        <!-- CTA follow banner -->
                        <div class="outro-cta-banner-v11" style="margin-top: 180px; text-align: center; z-index: 2;">
                            <div class="outro-cta-logo-v11">DOM MEMO</div>
                            <p style="font-size: 19px; color: rgba(255,255,255,0.75); font-weight: 600; margin-bottom: 25px;">
                                Hiểu tâm lý học • Làm chủ cuộc sống
                            </p>
                            <span style="font-size: 15px; color: rgba(255,255,255,0.4); border: 1.5px solid rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 24px; font-weight: 600; display: inline-block;">
                                Đừng quên thả tim và follow DOM Memo nhé!
                            </span>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons if loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: {
                    class: 'lucide-icon-custom'
                },
                nameAttr: 'data-lucide'
            });
        }
    }

    // ── ANIMATION FRAME UPDATES ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_memo11_1') {
            const realityNode = canvas.querySelector('.node-reality');
            const brainNode = canvas.querySelector('.node-brain');
            const connector = canvas.querySelector('.lag-offset-connector');
            const badge = canvas.querySelector('.lag-offset-badge');

            // Total slider width is 680px (from 40px to 640px)
            const minX = 40;
            const maxX = 600;
            const deltaX = maxX - minX;

            // Reality moves linearly from progress 0 to 1
            const rX = minX + deltaX * progress;
            if (realityNode) realityNode.style.left = `${rX}px`;

            // Brain lags behind. Starts after progress 0.15
            const brainRatio = progress < 0.15 ? 0 : (progress - 0.15) / 0.85;
            const bX = minX + deltaX * brainRatio;
            if (brainNode) brainNode.style.left = `${bX}px`;

            // Draw red connector representing the lag gap
            if (connector) {
                connector.style.left = `${bX + 35}px`;
                connector.style.width = `${Math.max(0, rX - bX)}px`;
            }

            // Update badge text detailing current processing offset
            if (badge) {
                if (progress < 0.15) {
                    const lagMs = Math.round(progress / 0.15 * 80);
                    badge.textContent = `TRỄ ${lagMs}ms`;
                } else if (progress > 0.85) {
                    const lagMs = Math.round((1 - progress) / 0.15 * 80);
                    badge.textContent = `TRỄ ${lagMs}ms`;
                } else {
                    badge.textContent = `TRỄ 80ms`;
                }
            }
        }
        else if (slideId === 'slide_memo11_2') {
            const dot = canvas.querySelector('.optic-pulse-dot');
            const readout = canvas.querySelector('.readout-num');

            // Pulse travels from 0% to 100% between 0.1 and 0.8 progress
            let travelPct = 0;
            let lagMs = 0;
            if (progress > 0.1) {
                const ratio = Math.min(1.0, (progress - 0.1) / 0.7);
                travelPct = ratio * 100;
                lagMs = Math.round(ratio * 80);
            }

            if (dot) dot.style.left = `${travelPct}%`;
            if (readout) readout.textContent = `${lagMs} ms`;
        }
        else if (slideId === 'slide_memo11_3') {
            const lightNode = canvas.querySelector('.light-wave-node');
            const soundNode = canvas.querySelector('.sound-wave-node');
            const envelope = canvas.querySelector('.brain-sync-envelope');
            const statusTag = canvas.querySelector('.sync-status-badge');

            // Light reaches target left:350px quickly (progress 0.1 to 0.35)
            let lX = 40;
            if (progress > 0.1) {
                const ratio = Math.min(1.0, (progress - 0.1) / 0.25);
                lX = 40 + (350 - 40) * ratio;
            }
            if (lightNode) lightNode.style.left = `${lX}px`;

            // Sound reaches target left:350px slowly (progress 0.1 to 0.65)
            let sX = 40;
            if (progress > 0.1) {
                const ratio = Math.min(1.0, (progress - 0.1) / 0.55);
                sX = 40 + (350 - 40) * ratio;
            }
            if (soundNode) soundNode.style.left = `${sX}px`;

            // Check if both signals are in the envelope
            if (progress < 0.65) {
                if (envelope) envelope.classList.remove('active-sync');
                if (statusTag) {
                    statusTag.textContent = 'ĐANG ĐỒNG BỘ...';
                    statusTag.className = 'sync-status-badge waiting';
                }
            } else {
                if (envelope) envelope.classList.add('active-sync');
                if (statusTag) {
                    statusTag.textContent = 'ĐÃ ĐỒNG BỘ ❇️';
                    statusTag.className = 'sync-status-badge synced';
                }
            }
        }
        else if (slideId === 'slide_memo11_4') {
            const realCard = canvas.querySelector('.card-theme-realtime');
            const brainCard = canvas.querySelector('.card-theme-brain');

            // Swap card highlights halfway
            if (progress < 0.5) {
                if (realCard) {
                    realCard.classList.remove('card-inactive');
                    realCard.classList.add('card-active');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-active');
                    brainCard.classList.add('card-inactive');
                }
            } else {
                if (realCard) {
                    realCard.classList.remove('card-active');
                    realCard.classList.add('card-inactive');
                }
                if (brainCard) {
                    brainCard.classList.remove('card-inactive');
                    brainCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo11_5') {
            const box = canvas.querySelector('.outro-reassurance-box-v11');

            if (box) {
                if (progress > 0.25) {
                    box.style.transform = 'scale(1) translateY(0)';
                    box.style.opacity = '1';
                    box.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    box.style.transform = 'scale(0.9) translateY(20px)';
                    box.style.opacity = '0';
                    box.style.transition = 'all 0.3s ease';
                }
            }
        }
        else if (slideId === 'slide_memo11_6') {
            const banner = canvas.querySelector('.outro-cta-banner-v11');
            if (banner) {
                if (progress > 0.2) {
                    banner.style.transform = 'scale(1)';
                    banner.style.opacity = '1';
                    banner.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    banner.style.transform = 'scale(0.9)';
                    banner.style.opacity = '0';
                    banner.style.transition = 'all 0.3s ease';
                }
            }
        }
    }

    // ── PUBLIC API REGISTRATION ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video11',
        topic: 'Real-time Illusion',
        episodeNum: 11,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 11 Plugin] Loaded: Real-time Illusion ready.');
})();
