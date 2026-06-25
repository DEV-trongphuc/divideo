/**
 * DOM Memo Video 5: Blind Spot Paradox
 * Custom script plugin containing rich selective attention animations and timeline logic.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo5_1: [
            { text: 'chìa khóa', start: 1.0, end: 3.5, class: 'active-purple' },
            { text: 'trên bàn', start: 4.0, end: 6.8, class: 'active-pink' }
        ],
        slide_memo5_2: [
            { text: 'não bộ', start: 1.5, end: 4.5, class: 'active-indigo' },
            { text: 'hình ảnh', start: 5.0, end: 8.0, class: 'active-purple' },
            { text: 'tưởng tượng', start: 8.5, end: 11.5, class: 'active-pink' }
        ],
        slide_memo5_3: [
            { text: 'chìa khóa', start: 1.0, end: 3.5, class: 'active-purple' },
            { text: 'lọc bỏ', start: 4.0, end: 7.5, class: 'active-pink' },
            { text: 'nhận diện', start: 8.0, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo5_4: [
            { text: 'mù do không chú ý', start: 1.0, end: 4.5, class: 'active-purple' },
            { text: 'bỏ qua', start: 5.0, end: 8.0, class: 'active-pink' },
            { text: 'trước mắt', start: 8.5, end: 10.8, class: 'active-indigo' }
        ]
    };

    const customSlideIds = [
        'slide_memo5_1', 'slide_memo5_2', 'slide_memo5_3', 'slide_memo5_4'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo5_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo5-1-container">
                        <!-- Table Simulation Area -->
                        <div class="table-simulation-box">
                            <div class="desk-surface"></div>
                            
                            <!-- Scattered objects -->
                            <div class="scattered-item sc-mug">☕</div>
                            <div class="scattered-item sc-book">📖</div>
                            <div class="scattered-item sc-phone">📱</div>
                            <div class="scattered-item sc-pen">🖊️</div>
                            
                            <!-- Hidden Keys -->
                            <div class="desk-keys">
                                <i data-lucide="key"></i>
                                <div class="key-reveal-ring"></div>
                            </div>
                            
                            <!-- Magnifying Glass -->
                            <div class="search-magnifier"></div>
                        </div>

                        <div class="search-time-counter glass-card">
                            <span class="counter-label">THỜI GIAN TÌM:</span>
                            <span class="counter-value">0 phút</span>
                        </div>

                        <div class="sleep-status-badge">ĐIỂM MÙ NHẬN THỨC</div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo5_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo5-2-container">
                        <div class="visual-pathway-box">
                            <!-- Left: The Eye/Input -->
                            <div class="path-node node-eye glass-card">
                                <div class="node-icon"><i data-lucide="eye"></i></div>
                                <div class="node-title">1. Ánh sáng vào mắt</div>
                                <div class="node-status text-green">NHẬN TÍN HIỆU</div>
                            </div>
                            
                            <!-- Middle: The Brain Filter Gate -->
                            <div class="path-node node-filter glass-card">
                                <div class="node-icon"><i data-lucide="shield-alert"></i></div>
                                <div class="node-title">2. Bộ lọc so khớp</div>
                                <div class="node-status text-yellow">ĐANG PHÂN TÍCH</div>
                                <div class="filter-gate-status">ĐÃ BỊ CHẶN! ❌</div>
                            </div>
                            
                            <!-- Right: The Brain Visual Cortex / Awareness -->
                            <div class="path-node node-brain glass-card">
                                <div class="node-icon"><i data-lucide="brain"></i></div>
                                <div class="node-title">3. Ý thức nhận biết</div>
                                <div class="node-status text-red">KHÔNG NHẬN ĐƯỢC</div>
                            </div>

                            <!-- SVG Connections & Signal Pulse -->
                            <svg class="path-connections" width="800" height="280">
                                <!-- Line from Eye to Filter -->
                                <path id="pathEyeToFilter" d="M 135,110 L 400,110" stroke="rgba(255,255,255,0.15)" stroke-width="4" stroke-dasharray="8 6" fill="none" />
                                <!-- Line from Filter to Brain -->
                                <path id="pathFilterToBrain" d="M 400,110 L 665,110" stroke="rgba(255,255,255,0.15)" stroke-width="4" stroke-dasharray="8 6" fill="none" />
                                
                                <!-- Animated Pulse Dot -->
                                <circle class="path-pulse-dot" r="8" fill="#10b981" />
                            </svg>
                        </div>
                        
                        <div class="pathway-explanation glass-card">
                            <span class="expl-icon">💡</span>
                            <span class="expl-text">Mọi tín hiệu hình ảnh từ mắt đều phải đi qua <strong>Bộ lọc so khớp</strong> của não. Nếu không khớp với hình ảnh đang tưởng tượng, nó sẽ bị chặn đứng trước khi bạn kịp ý thức!</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo5_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo5-3-container">
                        <!-- Top part: Mental Target vs Real Object -->
                        <div class="comparison-header">
                            <div class="mental-target-box glass-card">
                                <div class="card-label">ẢNH MẪU TRONG NÃO (TEMPLATE)</div>
                                <div class="template-item pulsing-gold"><i data-lucide="key"></i></div>
                                <div class="template-desc">Tìm kiếm chìa khóa</div>
                            </div>

                            <div class="matching-feedback-box glass-card">
                                <div class="feedback-title">KẾT QUẢ SO KHỚP</div>
                                <div class="feedback-score">0%</div>
                                <div class="feedback-badge">ĐANG QUÉT...</div>
                            </div>
                        </div>

                        <!-- Main simulation field -->
                        <div class="spotlight-simulation-box">
                            <div class="simulator-field-bg"></div>
                            
                            <!-- Scattered objects (normally dark/grayscale, highlighted under spotlight) -->
                            <div class="sim-item sim-mug" data-id="mug">☕ <span class="item-name">Cốc nước</span></div>
                            <div class="sim-item sim-book" data-id="book">📖 <span class="item-name">Sách dày</span></div>
                            
                            <!-- Hidden/Covered Key -->
                            <div class="sim-item sim-half-key" data-id="half-key">
                                <div class="half-key-wrapper">
                                    <span class="mini-book">📖</span>
                                    <i data-lucide="key" class="gold-key"></i>
                                </div>
                                <span class="item-name">Chìa khóa bị che 40%</span>
                            </div>

                            <!-- Target Key (Fully visible) -->
                            <div class="sim-item sim-full-key" data-id="full-key">
                                <i data-lucide="key" class="gold-key"></i>
                                <span class="item-name">Chìa khóa lộ diện!🔑</span>
                            </div>
                            
                            <!-- Moving Attention Spotlight -->
                            <div class="attention-spotlight">
                                <div class="spotlight-cone"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo5_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo5-4-container">
                        <div class="radar-blindspot-panel glass-card left-radar-panel">
                            <div class="panel-left-content">
                                <div class="sc-title sc-blue-title">BỘ LỌC TÌM KIẾM NÃO BỘ</div>
                                <div class="radar-status-lbl">QUÉT ĐỒ VẬT PHÙ HỢP...</div>
                            </div>
                            
                            <div class="radar-scope-wrap">
                                <div class="radar-sweep-line"></div>
                                <div class="radar-grid"></div>
                                <div class="radar-target"></div>
                            </div>
                        </div>

                        <div class="radar-blindspot-panel glass-card right-blindspot-panel">
                            <div class="panel-left-content">
                                <div class="sc-title sc-red-title">ĐIỂM MÙ NHẬN THỨC</div>
                                <div class="blindspot-labels-group">
                                    <span class="blindspot-desc-txt">Mù do không chú ý (Inattentional Blindness)</span>
                                    <span class="blindspot-status-tag text-blue">CHƯA XUẤT HIỆN ĐIỂM MÙ</span>
                                </div>
                            </div>
                            
                            <div class="blindspot-brain-gfx">
                                <div class="blindspot-brain-glow vibrate-active">
                                    <i data-lucide="eye-off"></i>
                                </div>
                                <div class="blindspot-status-alert alert-inactive">TẦM NHÌN THÔNG SUỐT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize Lucide icons
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
        if (slideId === 'slide_memo5_1') {
            const magnifier = canvas.querySelector('.search-magnifier');
            const container = canvas.querySelector('.table-simulation-box');
            const counterVal = canvas.querySelector('.counter-value');
            
            // Search animation path for magnifying glass
            if (magnifier && container) {
                let xPos, yPos;
                if (progress < 0.75) {
                    // Search loop movement
                    const speed = progress * 20;
                    xPos = 290 + Math.sin(speed) * 220 + Math.cos(speed * 0.5) * 60;
                    yPos = 130 + Math.cos(speed * 1.5) * 90;
                    container.classList.remove('reveal-active');
                } else {
                    // Locks onto keys in the center
                    const lockProgress = (progress - 0.75) / 0.25;
                    const keysX = 350; // Center coordinates relative to box
                    const keysY = 190;
                    const startX = 290 + Math.sin(0.75 * 20) * 220 + Math.cos(0.75 * 10) * 60;
                    const startY = 130 + Math.cos(0.75 * 1.5 * 10) * 90;
                    
                    xPos = startX + (keysX - startX) * lockProgress;
                    yPos = startY + (keysY - startY) * lockProgress;
                    container.classList.add('reveal-active');
                }
                
                magnifier.style.left = `${xPos}px`;
                magnifier.style.top = `${yPos}px`;
            }

            // Minutes counter
            if (counterVal) {
                const mins = Math.min(10, Math.floor(progress * 14));
                counterVal.textContent = `${mins} phút`;
                if (mins >= 10) {
                    counterVal.style.color = '#ef4444';
                    counterVal.textContent = '10 phút (NẰM LÙ LÙ TRÊN BÀN! 🔑)';
                } else {
                    counterVal.style.color = '#f472b6';
                }
            }
        }
        else if (slideId === 'slide_memo5_2') {
            const eyeNode = canvas.querySelector('.node-eye');
            const filterNode = canvas.querySelector('.node-filter');
            const brainNode = canvas.querySelector('.node-brain');
            const gateStatus = canvas.querySelector('.filter-gate-status');
            const pulseDot = canvas.querySelector('.path-pulse-dot');

            const eyeX = 135;
            const filterX = 400;
            const brainX = 665;
            const Y = 110;

            if (pulseDot) {
                pulseDot.style.opacity = '1';
                if (progress < 0.35) {
                    const ratio = progress / 0.35;
                    const curX = eyeX + (filterX - eyeX) * ratio;
                    pulseDot.setAttribute('cx', curX);
                    pulseDot.setAttribute('cy', Y);
                    pulseDot.setAttribute('fill', '#10b981');
                    pulseDot.style.color = '#10b981';

                    if (eyeNode) {
                        eyeNode.className = 'path-node node-eye glass-card node-active-green';
                        eyeNode.querySelector('.node-status').textContent = 'PHÁT TÍN HIỆU 🟢';
                    }
                    if (filterNode) {
                        filterNode.className = 'path-node node-filter glass-card';
                        filterNode.querySelector('.node-status').textContent = 'ĐANG ĐỢI TÍN HIỆU...';
                    }
                    if (brainNode) {
                        brainNode.className = 'path-node node-brain glass-card';
                        brainNode.querySelector('.node-status').textContent = 'CHƯA CÓ THÔNG TIN';
                    }
                    if (gateStatus) gateStatus.classList.remove('active');
                } 
                else if (progress < 0.65) {
                    pulseDot.setAttribute('cx', filterX);
                    pulseDot.setAttribute('cy', Y);
                    pulseDot.setAttribute('fill', '#f59e0b');
                    pulseDot.style.color = '#f59e0b';

                    if (eyeNode) {
                        eyeNode.className = 'path-node node-eye glass-card';
                        eyeNode.querySelector('.node-status').textContent = 'TÍN HIỆU ĐÃ PHÁT';
                    }
                    if (filterNode) {
                        filterNode.className = 'path-node node-filter glass-card node-active-yellow';
                        filterNode.querySelector('.node-status').textContent = 'SO KHỚP BỘ LỌC... 🟡';
                    }
                    if (brainNode) {
                        brainNode.className = 'path-node node-brain glass-card';
                        brainNode.querySelector('.node-status').textContent = 'CHƯA CÓ THÔNG TIN';
                    }
                    if (gateStatus) gateStatus.classList.remove('active');
                }
                else if (progress < 0.8) {
                    pulseDot.setAttribute('cx', filterX);
                    pulseDot.setAttribute('cy', Y);
                    pulseDot.setAttribute('fill', '#ef4444');
                    pulseDot.style.color = '#ef4444';

                    if (eyeNode) {
                        eyeNode.className = 'path-node node-eye glass-card';
                        eyeNode.querySelector('.node-status').textContent = 'TÍN HIỆU ĐÃ PHÁT';
                    }
                    if (filterNode) {
                        filterNode.className = 'path-node node-filter glass-card node-active-red';
                        filterNode.querySelector('.node-status').textContent = 'KHÔNG KHỚP! 🔴';
                    }
                    if (brainNode) {
                        brainNode.className = 'path-node node-brain glass-card';
                        brainNode.querySelector('.node-status').textContent = 'BỊ NGĂN CHẶN';
                    }
                    if (gateStatus) gateStatus.classList.add('active');
                }
                else {
                    const ratio = (progress - 0.8) / 0.2;
                    const curX = filterX + (brainX - filterX) * ratio;
                    pulseDot.setAttribute('cx', curX);
                    pulseDot.setAttribute('cy', Y);
                    pulseDot.setAttribute('fill', '#ef4444');
                    pulseDot.style.color = '#ef4444';
                    pulseDot.style.opacity = (1 - ratio).toString();

                    if (eyeNode) {
                        eyeNode.className = 'path-node node-eye glass-card';
                        eyeNode.querySelector('.node-status').textContent = 'TÍN HIỆU ĐÃ PHÁT';
                    }
                    if (filterNode) {
                        filterNode.className = 'path-node node-filter glass-card node-active-red';
                        filterNode.querySelector('.node-status').textContent = 'ĐÃ LỌC BỎ! ❌';
                    }
                    if (brainNode) {
                        brainNode.className = 'path-node node-brain glass-card node-active-red';
                        brainNode.querySelector('.node-status').textContent = 'MẤT TÍN HIỆU ❌';
                    }
                    if (gateStatus) gateStatus.classList.add('active');
                }
            }
        }
        else if (slideId === 'slide_memo5_3') {
            const scorePct = canvas.querySelector('.feedback-score');
            const scoreStatus = canvas.querySelector('.feedback-badge');
            const spotlight = canvas.querySelector('.attention-spotlight');
            const mug = canvas.querySelector('.sim-mug');
            const book = canvas.querySelector('.sim-book');
            const halfKey = canvas.querySelector('.sim-half-key');
            const fullKey = canvas.querySelector('.sim-full-key');

            if (mug) mug.classList.remove('lit');
            if (book) book.classList.remove('lit');
            if (halfKey) halfKey.classList.remove('lit');
            if (fullKey) fullKey.classList.remove('lit');
            if (spotlight) {
                spotlight.className = 'attention-spotlight';
            }

            let targetX = 400, targetY = 170;

            if (progress < 0.25) {
                const ratio = progress / 0.25;
                const startX = 400, startY = 170;
                const destX = 150, destY = 100;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (ratio > 0.8) {
                    if (mug) mug.classList.add('lit');
                    if (spotlight) spotlight.classList.add('spotlight-lit-red');
                    if (scorePct) scorePct.textContent = '10%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'KHÔNG PHÙ HỢP ❌';
                        scoreStatus.style.color = '#ef4444';
                        scoreStatus.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                        scoreStatus.style.background = 'rgba(239, 68, 68, 0.1)';
                    }
                } else {
                    if (scorePct) scorePct.textContent = '0%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'ĐANG PHÂN TÍCH...';
                        scoreStatus.style.color = 'rgba(255,255,255,0.5)';
                        scoreStatus.style.borderColor = 'rgba(255,255,255,0.1)';
                        scoreStatus.style.background = 'rgba(255,255,255,0.03)';
                    }
                }
            } 
            else if (progress < 0.55) {
                const ratio = (progress - 0.25) / 0.3;
                const startX = 150, startY = 100;
                const destX = 620, destY = 100;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (ratio > 0.7) {
                    if (halfKey) halfKey.classList.add('lit');
                    if (spotlight) spotlight.classList.add('spotlight-lit-red');
                    if (scorePct) scorePct.textContent = '40%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'ĐỘ KHỚP THẤP -> BỎ QUA! ❌';
                        scoreStatus.style.color = '#f59e0b';
                        scoreStatus.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                        scoreStatus.style.background = 'rgba(245, 158, 11, 0.1)';
                    }
                } else {
                    if (scorePct) scorePct.textContent = '10%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'ĐANG SO KHỚP...';
                        scoreStatus.style.color = '#f59e0b';
                        scoreStatus.style.borderColor = 'rgba(245, 158, 11, 0.2)';
                        scoreStatus.style.background = 'rgba(245, 158, 11, 0.05)';
                    }
                }
            } 
            else if (progress < 0.75) {
                const ratio = (progress - 0.55) / 0.2;
                const startX = 620, startY = 100;
                const destX = 680, destY = 280;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (ratio > 0.8) {
                    if (book) book.classList.add('lit');
                    if (spotlight) spotlight.classList.add('spotlight-lit-red');
                    if (scorePct) scorePct.textContent = '5%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'KHÔNG PHÙ HỢP ❌';
                        scoreStatus.style.color = '#ef4444';
                        scoreStatus.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                        scoreStatus.style.background = 'rgba(239, 68, 68, 0.1)';
                    }
                } else {
                    if (scorePct) scorePct.textContent = '40%';
                    if (scoreStatus) {
                        scoreStatus.textContent = 'ĐANG PHÂN TÍCH...';
                        scoreStatus.style.color = 'rgba(255,255,255,0.5)';
                        scoreStatus.style.borderColor = 'rgba(255,255,255,0.1)';
                        scoreStatus.style.background = 'rgba(255,255,255,0.03)';
                    }
                }
            } 
            else {
                const ratio = (progress - 0.75) / 0.25;
                const startX = 680, startY = 280;
                const destX = 240, destY = 280;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (ratio > 0.6) {
                    if (fullKey) fullKey.classList.add('lit');
                    if (spotlight) spotlight.classList.add('spotlight-lit-gold');
                    if (scorePct) {
                        scorePct.textContent = '100%';
                        scorePct.style.color = '#facc15';
                        scorePct.style.textShadow = '0 0 15px rgba(250, 204, 21, 0.8)';
                    }
                    if (scoreStatus) {
                        scoreStatus.textContent = 'TRÙNG KHỚP! HIỆN HỮU 🔑';
                        scoreStatus.style.color = '#10b981';
                        scoreStatus.style.borderColor = 'rgba(16, 185, 129, 0.45)';
                        scoreStatus.style.background = 'rgba(16, 185, 129, 0.15)';
                    }
                } else {
                    if (scorePct) {
                        scorePct.textContent = '5%';
                        scorePct.style.color = '#fff';
                        scorePct.style.textShadow = 'none';
                    }
                    if (scoreStatus) {
                        scoreStatus.textContent = 'ĐANG TÌM KIẾM...';
                        scoreStatus.style.color = 'rgba(255,255,255,0.5)';
                        scoreStatus.style.borderColor = 'rgba(255,255,255,0.1)';
                        scoreStatus.style.background = 'rgba(255,255,255,0.03)';
                    }
                }
            }

            if (spotlight) {
                spotlight.style.left = `${targetX}px`;
                spotlight.style.top = `${targetY}px`;
            }
        }
        else if (slideId === 'slide_memo5_4') {
            const target = canvas.querySelector('.radar-target');
            const radarStatus = canvas.querySelector('.radar-status-lbl');
            const brainGlow = canvas.querySelector('.blindspot-brain-glow');
            const alertText = canvas.querySelector('.blindspot-status-alert');
            const statusTag = canvas.querySelector('.blindspot-status-tag');

            // Radar sweep detections
            if (progress > 0.25) {
                if (target) target.classList.add('detected');
                if (radarStatus) radarStatus.textContent = 'MỤC TIÊU BỊ BỎ QUA (ĐỘ KHỚP THẤP)';
            } else {
                if (target) target.classList.remove('detected');
                if (radarStatus) radarStatus.textContent = 'QUÉT ĐỒ VẬT PHÙ HỢP...';
            }

            // Brain blind spot activation
            if (progress > 0.45) {
                if (brainGlow) {
                    brainGlow.style.background = 'rgba(239, 68, 68, 0.15)';
                    brainGlow.style.borderColor = '#ef4444';
                    brainGlow.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
                    brainGlow.style.color = '#ef4444';
                }
                if (alertText) {
                    alertText.textContent = "ĐIỂM MÙ KÍCH HOẠT! 👁️‍🗨️";
                    alertText.className = "blindspot-status-alert alert-active";
                }
                if (statusTag) {
                    statusTag.textContent = "BỊ BỎ QUA VÔ THỨC";
                    statusTag.className = "blindspot-status-tag text-red";
                }
            } else {
                if (brainGlow) {
                    brainGlow.style.background = 'rgba(99, 102, 241, 0.12)';
                    brainGlow.style.borderColor = 'rgba(99, 102, 241, 0.35)';
                    brainGlow.style.boxShadow = 'none';
                    brainGlow.style.color = 'var(--memo-indigo)';
                }
                if (alertText) {
                    alertText.textContent = "TẦM NHÌN THÔNG SUỐT";
                    alertText.className = "blindspot-status-alert alert-inactive";
                }
                if (statusTag) {
                    statusTag.textContent = "CHƯA XUẤT HIỆN ĐIỂM MÙ";
                    statusTag.className = "blindspot-status-tag text-blue";
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video5',
        topic: 'Blind Spot Paradox',
        episodeNum: 5,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 5 Plugin] Loaded: Blind Spot Paradox ready.');
})();
