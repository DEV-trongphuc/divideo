/**
 * DOM Memo Video 8: Ironic Process Theory (White Bear Problem)
 * Custom script plugin containing spring simulations, split processes, and radar scan alarm logic.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo8_1: [
            { text: 'đừng nghĩ về', start: 1.0, end: 4.0, class: 'active-pink' },
            { text: 'gấu trắng', start: 4.5, end: 8.5, class: 'active-purple' }
        ],
        slide_memo8_2: [
            { text: 'Hiệu ứng nghĩ ngược', start: 1.5, end: 5.0, class: 'active-purple' },
            { text: 'hai tiến trình', start: 6.0, end: 9.5, class: 'active-indigo' }
        ],
        slide_memo8_3: [
            { text: 'Giám sát ngầm', start: 1.0, end: 4.2, class: 'active-pink' },
            { text: 'gợi nhớ', start: 5.5, end: 9.0, class: 'active-purple' }
        ],
        slide_memo8_4: [
            { text: 'Phản ứng dội', start: 1.2, end: 4.2, class: 'active-pink' },
            { text: 'cố quên', start: 5.5, end: 9.0, class: 'active-indigo' }
        ],
        slide_memo8_5: [
            { text: 'chấp nhận', start: 1.0, end: 4.0, class: 'active-indigo' },
            { text: 'làm chủ tâm trí', start: 5.0, end: 8.5, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo8_1', 'slide_memo8_2', 'slide_memo8_3', 'slide_memo8_4', 'slide_memo8_5'
    ];

    // Helper: generate staggered floating snow particles
    function makeSnowParticlesHTML() {
        let html = '';
        for (let i = 0; i < 8; i++) {
            const leftOffset = 20 + (i * 12);
            const delay = i * 0.45;
            html += `<span class="drifting-particle" style="left: ${leftOffset}%; animation-delay: -${delay}s;">❄️</span>`;
        }
        return html;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo8_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo8-1-container">
                        <!-- Ambient snow drift particles -->
                        ${makeSnowParticlesHTML()}
                        
                        <div class="forbidden-bear-simulation">
                            <div class="bear-workspace">
                                <!-- Polar bear silhouette outline -->
                                <span class="polar-bear-outline">🐻‍❄️</span>
                                
                                <!-- Red Crossed circle -->
                                <div class="forbidden-red-ring"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo8_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo8-2-container">
                        <div class="split-process-box">
                            <!-- Left: Operating process -->
                            <div class="process-card card-operating">
                                <div class="proc-icon">🌳</div>
                                <h3 class="proc-title">Tiến trình Vận hành</h3>
                                <p class="proc-desc">Tìm kiếm đối tượng thay thế (chạy ngầm tự ý)</p>
                                
                                <div class="proc-display-panel">
                                    <span class="distraction-item d1">🌲 Rừng thông</span>
                                    <span class="distraction-item d2">🍎 Quả táo</span>
                                    <span class="distraction-item d3">🚲 Xe đạp</span>
                                </div>
                                
                                <span class="box-status-msg text-green">ĐANG PHÂN TÁN</span>
                            </div>

                            <!-- Right: Monitoring process -->
                            <div class="process-card card-monitoring">
                                <div class="proc-icon">🔍</div>
                                <h3 class="proc-title">Tiến trình Giám sát</h3>
                                <p class="proc-desc">Liên tục kiểm tra xem có gấu trắng xuất hiện không</p>
                                
                                <div class="proc-display-panel">
                                    <span class="monitoring-screen-bear">🐻‍❄️</span>
                                </div>
                                
                                <span class="box-status-msg text-red">QUÉT ẢNH CẤM</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo8_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo8-3-container">
                        <div class="radar-scanner-panel">
                            <div class="radar-left-content">
                                <div class="radar-title-lbl">TIẾN TRÌNH GIÁM SÁT NGẦM</div>
                                <div class="radar-status-group">
                                    <span class="radar-desc-txt">TẦM SOÁT Ý NGHĨ...</span>
                                    <span class="radar-status-tag">RÀ QUÉT HÌNH ẢNH CẤM</span>
                                </div>
                            </div>
                            
                            <div class="radar-display-container">
                                <div class="radar-circular-grid"></div>
                                <div class="radar-beam-line"></div>
                                
                                <!-- Flashing Polar Bear target -->
                                <span class="radar-bear-target">🐻‍❄️</span>
                            </div>
                        </div>
                        
                        <div class="radar-explanation-badge">
                            <span class="rd-expl-icon">⚠️</span>
                            <span class="rd-expl-text">Nghịch lý ở chỗ: Để kiểm chứng xem ta **đã nghĩ về Gấu trắng chưa**, bộ não bắt buộc phải gợi nhớ lại hình ảnh **Gấu trắng** một lần nữa!</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo8_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo8-4-container">
                        <div class="spring-cards-row">
                            <!-- Card 1: Spring Compressed -->
                            <div class="spring-card-item card-compress">
                                <div class="spring-header-txt">
                                    <h3>Cố đè nén ý nghĩ</h3>
                                    <p>Tương đương việc nén lò xo xuống</p>
                                </div>
                                
                                <div class="spring-graphic-wrap">🌀</div>
                                
                                <span class="spring-status-badge">ĐÈ NÉN TỐI ĐA</span>
                            </div>

                            <!-- Card 2: Rebound / Burst -->
                            <div class="spring-card-item card-burst">
                                <div class="spring-header-txt">
                                    <h3>Hiệu ứng dội ngược</h3>
                                    <p>Buông tay = Ý nghĩ dội lên cực mạnh</p>
                                </div>
                                
                                <div class="spring-graphic-wrap">🌀</div>
                                
                                <!-- Floating burst alerts (dx/dy random offsets) -->
                                <span class="burst-alert-tag b-t1" style="--dx: -70px; --dy: -60px; animation-delay: 0.1s;">Gấu trắng! 🐻‍❄️</span>
                                <span class="burst-alert-tag b-t2" style="--dx: 80px; --dy: -50px; animation-delay: 0.3s;">Ký ức buồn! 😢</span>
                                <span class="burst-alert-tag b-t3" style="--dx: -60px; --dy: 50px; animation-delay: 0.5s;">Đồ ngọt! 🍰</span>
                                <span class="burst-alert-tag b-t4" style="--dx: 70px; --dy: 70px; animation-delay: 0.7s;">Cố quên! 🛑</span>
                                
                                <span class="spring-status-badge">PHUN TRÀO 10X</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo8_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo8-5-container">
                        <!-- Standard CTA Outro -->
                        <div style="text-align: center; margin-top: 100px;">
                            <div style="font-size: 80px; margin-bottom: 20px; animation: bounce 2s infinite alternate;">🐻‍❄️</div>
                            <h2 style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 10px;">ĐỪNG ĐÈ NÉN Ý NGHĨ</h2>
                            <p style="font-size: 18px; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6;">
                                Càng cố chống cự, bộ não càng làm tăng sức hút. Hãy thả lỏng, chấp nhận sự tồn tại của ý nghĩ và để nó trôi qua nhẹ nhàng.
                            </p>
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
        if (slideId === 'slide_memo8_1') {
            const bear = canvas.querySelector('.polar-bear-outline');
            const ring = canvas.querySelector('.forbidden-red-ring');

            // Ring activation
            if (ring) {
                if (progress > 0.2) {
                    ring.classList.add('active');
                } else {
                    ring.classList.remove('active');
                }
            }

            // Polar bear pulses alarm red
            if (bear) {
                if (progress > 0.45) {
                    bear.classList.add('pulsing-alert');
                } else {
                    bear.classList.remove('pulsing-alert');
                }
            }
        }
        else if (slideId === 'slide_memo8_2') {
            const opCard = canvas.querySelector('.card-operating');
            const monCard = canvas.querySelector('.card-monitoring');
            const monBear = canvas.querySelector('.monitoring-screen-bear');

            const d1 = canvas.querySelector('.d1');
            const d2 = canvas.querySelector('.d2');
            const d3 = canvas.querySelector('.d3');

            // Process staggered cards activation
            if (progress < 0.2) {
                if (opCard) opCard.classList.remove('active-proc');
                if (monCard) monCard.classList.remove('active-proc');
                if (monBear) monBear.className = 'monitoring-screen-bear';
            } 
            else if (progress < 0.55) {
                if (opCard) opCard.classList.add('active-proc');
                if (monCard) monCard.classList.remove('active-proc');
                if (monBear) monBear.className = 'monitoring-screen-bear';

                // Rotate distraction options
                const subSec = Math.floor((progress - 0.2) / 0.35 * 3);
                if (d1) d1.className = `distraction-item d1 ${subSec === 0 ? 'visible' : ''}`;
                if (d2) d2.className = `distraction-item d2 ${subSec === 1 ? 'visible' : ''}`;
                if (d3) d3.className = `distraction-item d3 ${subSec === 2 ? 'visible' : ''}`;
            } 
            else if (progress < 0.8) {
                if (opCard) opCard.classList.add('active-proc');
                if (monCard) monCard.classList.add('active-proc');
                if (monBear) {
                    monBear.className = 'monitoring-screen-bear vibrate-danger';
                }
            } 
            else {
                if (opCard) opCard.classList.add('active-proc');
                if (monCard) monCard.classList.add('active-proc');
                if (monBear) monBear.className = 'monitoring-screen-bear vibrate-danger';
            }
        }
        else if (slideId === 'slide_memo8_3') {
            const panel = canvas.querySelector('.radar-scanner-panel');
            const statusTag = canvas.querySelector('.radar-status-tag');
            const bearTarget = canvas.querySelector('.radar-bear-target');
            const beam = canvas.querySelector('.radar-beam-line');

            // Synchronize beam rotation angle directly to progress!
            if (beam) {
                const angle = progress * 360 * 3.5; // 3.5 spins over duration
                beam.style.transform = `rotate(${angle}deg)`;
                
                // Sweep check: target bear is at top-left (~125deg to 160deg in polar coord)
                // Evaluate if angle % 360 falls within this check arc
                const relativeAngle = angle % 360;
                const isOverlapping = (relativeAngle > 100 && relativeAngle < 170);

                if (isOverlapping || progress > 0.85) {
                    if (bearTarget) bearTarget.classList.add('lit');
                    if (panel) panel.classList.add('alert-active');
                    if (statusTag) {
                        statusTag.textContent = 'PHÁT HIỆN GẤU TRẮNG! 🚨';
                        statusTag.className = 'radar-status-tag detected';
                    }
                } else {
                    if (bearTarget) bearTarget.classList.remove('lit');
                    if (panel) panel.classList.remove('alert-active');
                    if (statusTag) {
                        statusTag.textContent = 'ĐANG GIÁM SÁT NGẦM...';
                        statusTag.className = 'radar-status-tag';
                    }
                }
            }
        }
        else if (slideId === 'slide_memo8_4') {
            const opCard = canvas.querySelector('.card-compress');
            const burstCard = canvas.querySelector('.card-burst');
            const tags = canvas.querySelectorAll('.burst-alert-tag');

            // Staggered spring simulator
            if (progress < 0.45) {
                if (opCard) opCard.classList.add('active-card');
                if (burstCard) burstCard.classList.remove('active-card');
                tags.forEach(t => t.style.display = 'none');
            } 
            else if (progress < 0.8) {
                if (opCard) opCard.classList.remove('active-card');
                if (burstCard) burstCard.classList.add('active-card');
                tags.forEach(t => t.style.display = 'inline-block');
            } 
            else {
                if (opCard) opCard.classList.add('active-card');
                if (burstCard) burstCard.classList.add('active-card');
                tags.forEach(t => t.style.display = 'inline-block');
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video8',
        topic: 'Ironic Process Theory',
        episodeNum: 8,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 8 Plugin] Loaded: Ironic Process Theory ready.');
})();
