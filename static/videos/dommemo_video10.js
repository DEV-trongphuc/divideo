/**
 * DOM Memo Video 10: Mirror vs Camera Bias (Mere Exposure & Face Asymmetry)
 * Custom script plugin driving mirror-flipping portraits, familiarity meters, symmetry breaks, and comparison cards.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo10_1: [
            { text: 'Soi gương thấy ổn', start: 1.0, end: 4.0, class: 'active-pink' },
            { text: 'mở camera trước', start: 4.5, end: 7.5, class: 'active-purple' },
            { text: 'muốn tắt máy', start: 8.0, end: 10.5, class: 'active-indigo' }
        ],
        slide_memo10_2: [
            { text: 'quen nhìn khuôn mặt', start: 1.8, end: 4.8, class: 'active-purple' },
            { text: 'đảo ngược trong gương', start: 5.2, end: 8.2, class: 'active-indigo' },
            { text: 'phiên bản chuẩn đẹp', start: 8.5, end: 11.0, class: 'active-pink' }
        ],
        slide_memo10_3: [
            { text: 'đúng chiều thực tế', start: 1.5, end: 4.5, class: 'active-pink' },
            { text: 'không đối xứng hoàn hảo', start: 5.0, end: 8.0, class: 'active-purple' },
            { text: 'não cảm thấy lạ lẫm', start: 8.3, end: 11.5, class: 'active-indigo' }
        ],
        slide_memo10_4: [
            { text: 'đối xứng và hài hòa ảo', start: 1.8, end: 5.0, class: 'active-indigo' },
            { text: 'chân thật, đúng chiều', start: 5.5, end: 8.5, class: 'active-pink' },
            { text: 'cảnh báo bất thường', start: 8.8, end: 11.0, class: 'active-purple' }
        ],
        slide_memo10_5: [
            { text: 'não bộ chưa quen', start: 1.2, end: 4.2, class: 'active-indigo' },
            { text: 'rất xinh đẹp và tự nhiên', start: 4.8, end: 7.8, class: 'active-pink' },
            { text: 'follow DOM Memo', start: 8.2, end: 11.0, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo10_1', 'slide_memo10_2', 'slide_memo10_3', 'slide_memo10_4', 'slide_memo10_5'
    ];

    // ── HTML RENDERING TEMPLATES ────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo10_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo10-1-container">
                        <!-- Drifting light sparkles -->
                        <span class="ambient-sparkle" style="top: 15%; left: 8%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sparkle" style="top: 70%; left: 15%; animation-delay: -5s;">📸</span>
                        <span class="ambient-sparkle" style="top: 25%; left: 85%; animation-delay: -8s;">✨</span>

                        <!-- Left: Mirror mockup (Warm Gold glow) -->
                        <div class="mirror-showcase-v10">
                            <div class="mirror-frame-v10">
                                <div class="mirror-glass-glare"></div>
                                <div class="portrait-v10 portrait-mirror" style="transform: scaleX(-1);">
                                    <span class="portrait-avatar-shape">👩‍🦰</span>
                                    <span class="portrait-marker-badge m-hair" style="transform: scaleX(-1);">Tóc lệch trái</span>
                                    <span class="portrait-marker-badge m-mole" style="bottom: 25px; left: 15px; transform: scaleX(-1);">Nốt ruồi phải</span>
                                </div>
                            </div>
                            <span class="showcase-lbl">Ảnh Gương Soi (Thân thuộc)</span>
                        </div>

                        <!-- Right: Camera Viewfinder mockup (Cyan/Blue cold glow) -->
                        <div class="camera-showcase-v10">
                            <div class="camera-screen-v10">
                                <div class="camera-inner-viewfinder">
                                    <div class="camera-grid-lines"></div>
                                    <div class="camera-lens-dot"></div>
                                    <div class="portrait-v10 portrait-camera">
                                        <span class="portrait-avatar-shape">👩‍🦰</span>
                                        <span class="portrait-marker-badge m-hair">Tóc lệch phải</span>
                                        <span class="portrait-marker-badge m-mole" style="bottom: 25px; right: 15px;">Nốt ruồi trái</span>
                                    </div>
                                </div>
                            </div>
                            <span class="showcase-lbl">Ảnh Camera (Người khác thấy)</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo10_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo10-2-container">
                        <span class="ambient-sparkle" style="top: 10%; left: 80%; animation-delay: -1s;">✨</span>
                        <span class="ambient-sparkle" style="top: 80%; left: 12%; animation-delay: -3s;">🪞</span>

                        <div class="telemetry-row-v10">
                            <!-- Mirror familiarity card -->
                            <div class="telemetry-card-v10 card-theme-mirror">
                                <div class="t-card-header">
                                    <h3>GƯƠNG SOI HÀNG NGÀY</h3>
                                    <span class="t-card-icon">🪞</span>
                                </div>
                                <div class="t-metric-item">
                                    <div class="t-metric-lbl">
                                        <span>Tần suất tiếp xúc</span>
                                        <span class="t-metric-val freq-mirror-val">100%</span>
                                    </div>
                                    <div class="t-bar-bg">
                                        <div class="t-bar-fill freq-mirror-fill" style="width: 100%;"></div>
                                    </div>
                                </div>
                                <div class="t-metric-item">
                                    <div class="t-metric-lbl">
                                        <span>Chỉ số quen mắt</span>
                                        <span class="t-metric-val pref-mirror-val">90%</span>
                                    </div>
                                    <div class="t-bar-bg">
                                        <div class="t-bar-fill pref-mirror-fill" style="width: 90%;"></div>
                                    </div>
                                </div>
                                <span class="t-status-badge">ĐẸP & THÂN THUỘC</span>
                            </div>

                            <!-- Camera familiarity card -->
                            <div class="telemetry-card-v10 card-theme-camera">
                                <div class="t-card-header">
                                    <h3>CAMERA KHÔNG LẬT</h3>
                                    <span class="t-card-icon">📸</span>
                                </div>
                                <div class="t-metric-item">
                                    <div class="t-metric-lbl">
                                        <span>Tần suất tiếp xúc</span>
                                        <span class="t-metric-val freq-camera-val">10%</span>
                                    </div>
                                    <div class="t-bar-bg">
                                        <div class="t-bar-fill freq-camera-fill" style="width: 10%;"></div>
                                    </div>
                                </div>
                                <div class="t-metric-item">
                                    <div class="t-metric-lbl">
                                        <span>Chỉ số quen mắt</span>
                                        <span class="t-metric-val pref-camera-val">10%</span>
                                    </div>
                                    <div class="t-bar-bg">
                                        <div class="t-bar-fill pref-camera-fill" style="width: 10%;"></div>
                                    </div>
                                </div>
                                <span class="t-status-badge">LẠ MẮT & ĐÁNG NGỜ</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.01);">
                            💡 *Hiệu ứng tiếp xúc thường xuyên*: Ta luôn thích thứ ta được thấy nhiều nhất. Bản thân ta quen nhìn phiên bản lật ngược trong gương, nên phiên bản camera trông cực kỳ sai lệch.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo10_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo10-3-container">
                        <span class="ambient-sparkle" style="top: 15%; left: 10%; animation-delay: -2s;">⚖️</span>
                        <span class="ambient-sparkle" style="top: 75%; left: 82%; animation-delay: -6s;">🎭</span>

                        <!-- Asymmetry board containing a flipping face model -->
                        <div class="asymmetry-board-v10">
                            <!-- Center dividing line -->
                            <div class="symmetry-center-line"></div>
                            
                            <div class="asymmetric-face-wrap">
                                <div class="asymmetric-portrait-graphic">👩‍🦰</div>
                                <!-- Asymmetric marks -->
                                <span class="asymmetry-hair-part">💇‍♀️</span>
                                <div class="asymmetry-mole-spot"></div>
                            </div>
                            
                            <!-- Telemetry tag updating with state -->
                            <div class="asymmetry-info-tag">ẢNH GƯƠNG SOI (Thân thuộc, Hài hòa)</div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.45); max-width: 680px; line-height: 1.5; text-align: center;">
                            ⚠️ Khuôn mặt con người không bao giờ đối xứng hoàn hảo. Khi camera trước lật lại khuôn mặt đúng chiều, các nét lệch nhỏ đột nhiên chuyển vị trí khiến não lập tức báo động bất thường.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo10_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo10-4-container">
                        <span class="ambient-sparkle" style="top: 8%; left: 85%; animation-delay: -3s;">🪞</span>
                        <span class="ambient-sparkle" style="top: 80%; left: 15%; animation-delay: -5s;">📱</span>

                        <div class="comparison-row-v10">
                            <!-- Left: Mirror View -->
                            <div class="comparison-card-v10 card-view-mirror card-active">
                                <div class="comp-header-v10">
                                    <h3>GƯƠNG SOI</h3>
                                    <div class="comp-icon-badge-v10">🪞</div>
                                </div>
                                
                                <div class="comp-list-v10">
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">⭐</span>
                                        <span>Đã bị đảo chiều ngang</span>
                                    </div>
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">⭐</span>
                                        <span>Thân thuộc (Hiệu ứng tiếp xúc)</span>
                                    </div>
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">⭐</span>
                                        <span>Não thấy quen mắt và hài hòa</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v10">ẢO GIÁC HÀI HÒA</div>
                            </div>
                            
                            <!-- Right: Camera View -->
                            <div class="comparison-card-v10 card-view-camera card-inactive">
                                <div class="comp-header-v10">
                                    <h3>CAMERA TRƯỚC</h3>
                                    <div class="comp-icon-badge-v10">📱</div>
                                </div>
                                
                                <div class="comp-list-v10">
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">❗</span>
                                        <span>Không lật (Giữ nguyên chiều gốc)</span>
                                    </div>
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">❗</span>
                                        <span>Là phiên bản người khác nhìn thấy</span>
                                    </div>
                                    <div class="comp-row-v10">
                                        <span class="comp-bullet-v10">❗</span>
                                        <span>Não thấy lạ lẫm, báo lỗi xấu đi</span>
                                    </div>
                                </div>
                                
                                <div class="comp-footer-lbl-v10">BẤT NGỜ & LẠ MẮT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo10_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo10-5-container">
                        <div class="calming-ring-v10"></div>
                        
                        <!-- Reassurance speech bubble -->
                        <div class="outro-reassurance-box">
                            <div class="reassurance-face">🥰</div>
                            <div class="reassurance-text">
                                "Bạn không hề xấu đi, chỉ là bộ não chưa quen với góc nhìn đúng chiều mà thôi!"
                            </div>
                        </div>
                        
                        <!-- CTA follow banner -->
                        <div class="outro-cta-banner-v10">
                            <div class="outro-cta-logo-v10">DOM MEMO</div>
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
        if (slideId === 'slide_memo10_1') {
            const mirrorPort = canvas.querySelector('.mirror-showcase-v10');
            const cameraPort = canvas.querySelector('.camera-showcase-v10');

            // Toggle highlights to lead the story
            if (progress < 0.45) {
                if (mirrorPort) mirrorPort.style.opacity = '1';
                if (cameraPort) cameraPort.style.opacity = '0.3';
            } else {
                if (mirrorPort) mirrorPort.style.opacity = '0.3';
                if (cameraPort) cameraPort.style.opacity = '1';
            }
        }
        else if (slideId === 'slide_memo10_2') {
            // Animating familiarity bar levels
            const mirrorFreqVal = canvas.querySelector('.freq-mirror-val');
            const mirrorFreqFill = canvas.querySelector('.freq-mirror-fill');
            const mirrorPrefVal = canvas.querySelector('.pref-mirror-val');
            const mirrorPrefFill = canvas.querySelector('.pref-mirror-fill');

            const cameraFreqVal = canvas.querySelector('.freq-camera-val');
            const cameraFreqFill = canvas.querySelector('.freq-camera-fill');
            const cameraPrefVal = canvas.querySelector('.pref-camera-val');
            const cameraPrefFill = canvas.querySelector('.pref-camera-fill');

            // Mirror stats: rises from 10% to 100% (progress 0.1 to 0.75)
            let mPct = 10;
            if (progress > 0.1) {
                const ratio = Math.min(1.0, (progress - 0.1) / 0.65);
                mPct = Math.round(10 + (100 - 10) * ratio);
            }
            if (mirrorFreqVal) mirrorFreqVal.textContent = `${mPct}%`;
            if (mirrorFreqFill) mirrorFreqFill.style.width = `${mPct}%`;
            if (mirrorPrefVal) mirrorPrefVal.textContent = `${Math.round(mPct * 0.9)}%`;
            if (mirrorPrefFill) mirrorPrefFill.style.width = `${Math.round(mPct * 0.9)}%`;

            // Camera stats: rises slightly from 5% to 15% (progress 0.2 to 0.8)
            let cPct = 5;
            if (progress > 0.2) {
                const ratio = Math.min(1.0, (progress - 0.2) / 0.6);
                cPct = Math.round(5 + (15 - 5) * ratio);
            }
            if (cameraFreqVal) cameraFreqVal.textContent = `${cPct}%`;
            if (cameraFreqFill) cameraFreqFill.style.width = `${cPct}%`;
            if (cameraPrefVal) cameraPrefVal.textContent = `${Math.round(cPct * 0.85)}%`;
            if (cameraPrefFill) cameraPrefFill.style.width = `${Math.round(cPct * 0.85)}%`;
        }
        else if (slideId === 'slide_memo10_3') {
            const face = canvas.querySelector('.asymmetric-portrait-graphic');
            const tag = canvas.querySelector('.asymmetry-info-tag');
            const divider = canvas.querySelector('.symmetry-center-line');

            // Flip the face horizontally on progress split 0.5
            // Also update the description tag
            if (progress < 0.5) {
                if (face) {
                    face.style.transform = 'scaleX(1)'; // Mirrored / normal looking to self
                }
                if (tag) {
                    tag.textContent = 'ẢNH GƯƠNG SOI (Thân thuộc, Hài hòa)';
                    tag.classList.remove('warning-state');
                }
                if (divider) divider.style.opacity = '0.3';
            } else {
                if (face) {
                    face.style.transform = 'scaleX(-1)'; // Camera flip / true asymmetry
                }
                if (tag) {
                    tag.textContent = 'ẢNH CAMERA (Bất đối xứng lật ngược -> Não lạ mắt!)';
                    tag.classList.add('warning-state');
                }
                if (divider) divider.style.opacity = '1';
            }
        }
        else if (slideId === 'slide_memo10_4') {
            const mirrorCard = canvas.querySelector('.card-view-mirror');
            const cameraCard = canvas.querySelector('.card-view-camera');

            // Stagger card sizes and highlights
            if (progress < 0.5) {
                if (mirrorCard) {
                    mirrorCard.classList.remove('card-inactive');
                    mirrorCard.classList.add('card-active');
                }
                if (cameraCard) {
                    cameraCard.classList.remove('card-active');
                    cameraCard.classList.add('card-inactive');
                }
            } else {
                if (mirrorCard) {
                    mirrorCard.classList.remove('card-active');
                    mirrorCard.classList.add('card-inactive');
                }
                if (cameraCard) {
                    cameraCard.classList.remove('card-inactive');
                    cameraCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo10_5') {
            const box = canvas.querySelector('.outro-reassurance-box');
            // Reassurance card bounces and scales in at progress 0.25
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
    }

    // ── PUBLIC API REGISTRATION ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video10',
        topic: 'Mere Exposure Asymmetry',
        episodeNum: 10,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 10 Plugin] Loaded: Mere Exposure Asymmetry ready.');
})();
