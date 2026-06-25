/**
 * DOM Memo Video 7: Frequency Illusion (Baader-Meinhof Phenomenon)
 * Custom script plugin containing selective attention spotlight sweep and newspaper highlights.
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_memo7_1: [
            { text: 'nghe một từ lạ', start: 1.0, end: 3.5, class: 'active-pink' },
            { text: 'xuất hiện', start: 4.5, end: 7.2, class: 'active-purple' },
            { text: 'tín hiệu', start: 8.0, end: 11.0, class: 'active-indigo' }
        ],
        slide_memo7_2: [
            { text: 'Ảo giác tần suất', start: 1.5, end: 4.5, class: 'active-purple' },
            { text: 'tần suất xuất hiện', start: 5.5, end: 9.0, class: 'active-pink' }
        ],
        slide_memo7_3: [
            { text: 'ưu tiên', start: 1.2, end: 4.2, class: 'active-indigo' },
            { text: 'lướt qua', start: 5.2, end: 8.5, class: 'active-purple' }
        ],
        slide_memo7_4: [
            { text: 'bỏ qua', start: 1.0, end: 4.2, class: 'active-purple' },
            { text: 'tràn ngập', start: 5.5, end: 9.0, class: 'active-pink' }
        ],
        slide_memo7_5: [
            { text: 'bộ lọc của não', start: 1.0, end: 4.0, class: 'active-indigo' },
            { text: 'tâm lý học', start: 5.0, end: 8.5, class: 'active-purple' }
        ]
    };

    const customSlideIds = [
        'slide_memo7_1', 'slide_memo7_2', 'slide_memo7_3', 'slide_memo7_4', 'slide_memo7_5'
    ];

    // Helper: generate staggered words for ignored card
    function makeIgnoredWordsHTML() {
        let html = '';
        const words = ['Sonder', 'Eunoia', 'Petrichor', 'Limerence', 'Mellifluous', 'Defenestration', 'Phosphenes', 'Epiphany'];
        words.forEach((w, idx) => {
            const leftOffset = 15 + (idx * 28);
            const delay = idx * 0.25;
            html += `<span class="falling-word" style="left: ${leftOffset}px; animation-delay: -${delay}s;">${w}</span>`;
        });
        return html;
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo7_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo7-1-container">
                        <div class="ambient-word-cloud">
                            <span class="ambient-word w-a1">Psychology</span>
                            <span class="ambient-word w-a2">Cognitive</span>
                            <span class="ambient-word w-a3">Attention</span>
                            <span class="ambient-word w-a4">Frequency</span>
                            <span class="ambient-word w-a5">Brain</span>
                            <span class="ambient-word w-a6">Filter</span>
                            
                            <!-- The Target Word -->
                            <span class="ambient-word target-word">"Serendipity"</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo7_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo7-2-container">
                        <div class="newspaper-mockup">
                            <div class="newspaper-header">
                                <span class="np-title">BÁO TÂM LÝ HỌC (THE MEMO DAILY)</span>
                                <span class="np-date">Thứ Sáu, 26/06/2026</span>
                            </div>
                            
                            <div class="newspaper-columns">
                                <div class="newspaper-col">
                                    <div class="col-header">Chuyên mục Khoa học</div>
                                    <div class="col-body-txt">
                                        Hiện tượng tình cờ phát hiện ra những điều may mắn gọi là <strong class="np-target np-t1">Serendipity</strong>. Từ này xuất phát từ một câu chuyện cổ xứ Ba Tư...
                                    </div>
                                </div>
                                <div class="newspaper-col">
                                    <div class="col-header">Góc Nhìn Nhận Thức</div>
                                    <div class="col-body-txt">
                                        Nhiều người lầm tưởng từ <strong class="np-target np-t2">Serendipity</strong> là điềm báo tâm linh từ vũ trụ khi thấy nó xuất hiện ngẫu nhiên liên tiếp trên báo sách...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo7_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo7-3-container">
                        <div class="scan-spotlight-panel">
                            <div class="scan-left-content">
                                <div class="scan-title-lbl">BỘ LỌC CHÚ Ý CHỌN LỌC</div>
                                <div class="scan-status-group">
                                    <span class="scan-desc-txt">TẦM SOÁT THỊ GIÁC...</span>
                                    <span class="scan-status-tag">ĐANG QUÉT MÔI TRƯỜNG</span>
                                </div>
                            </div>
                            
                            <div class="word-cloud-container">
                                <div class="word-cloud-bg"></div>
                                
                                <span class="cloud-item ci-1">Cognitive</span>
                                <span class="cloud-item ci-2">Illusion</span>
                                <span class="cloud-item ci-3">Frequency</span>
                                <span class="cloud-item ci-4">Attention</span>
                                <span class="cloud-item ci-6">Visual</span>
                                <span class="cloud-item ci-7">Select</span>
                                
                                <!-- Target Word inside Cloud -->
                                <span class="cloud-item ci-5 target-word-item">Serendipity</span>
                                
                                <!-- Moving Spotlight Beam -->
                                <div class="cloud-spotlight-cone"></div>
                            </div>
                        </div>
                        
                        <div class="scan-explanation-badge">
                            <span class="sc-expl-icon">👁️</span>
                            <span class="sc-expl-text">Sau khi từ khóa được lưu trữ, não bộ sẽ **kích hoạt bộ quét chú ý chọn lọc**. Nó âm thầm phân tích và làm sáng bừng từ đó lên giữa vô vàn chữ khác!</span>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo7_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo7-4-container">
                        <div class="split-cards-row">
                            <!-- Card 1: Glowing Captured Word -->
                            <div class="split-card-item glowing-card">
                                <div class="card-title-header">
                                    <h3>Từ đã nghe qua</h3>
                                    <p>Được não gắn nhãn ưu tiên</p>
                                </div>
                                
                                <div class="card-center-gfx">✨</div>
                                
                                <span class="card-status-badge">BẬT SÁNG NỔI BẬT</span>
                            </div>

                            <!-- Card 2: Blurred Ignored Words -->
                            <div class="split-card-item dimmed-card">
                                <div class="card-title-header">
                                    <h3>Hàng ngàn từ lạ khác</h3>
                                    <p>Không có trong danh sách lưu trữ</p>
                                </div>
                                
                                <div class="card-center-gfx">🙈</div>
                                
                                <!-- Staggered falling blurred words -->
                                <div class="falling-ignored-words">
                                    ${makeIgnoredWordsHTML()}
                                </div>
                                
                                <span class="card-status-badge">BỊ LỜ ĐI VÔ THỨC</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo7_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo7-5-container">
                        <!-- Standard CTA Outro -->
                        <div style="text-align: center; margin-top: 100px;">
                            <div style="font-size: 80px; margin-bottom: 20px; animation: bounce 2s infinite alternate;">🔍</div>
                            <h2 style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 10px;">BỘ LỌC CỦA BẠN ĐANG HOẠT ĐỘNG!</h2>
                            <p style="font-size: 18px; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6;">
                                Lần tới khi bạn nhìn thấy điều trùng hợp lặp lại, hãy hiểu rằng não bộ của bạn đang ưu tiên chú ý thông tin đó.
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
        if (slideId === 'slide_memo7_1') {
            const targetWord = canvas.querySelector('.target-word');
            const w1 = canvas.querySelector('.w-a1');
            const w2 = canvas.querySelector('.w-a2');
            const w3 = canvas.querySelector('.w-a3');
            const w4 = canvas.querySelector('.w-a4');

            // Floating movement for background words
            if (w1) w1.style.transform = `translateY(${Math.sin(progress * 5) * 15}px) rotate(-5deg)`;
            if (w2) w2.style.transform = `translateY(${Math.cos(progress * 4) * 20}px) rotate(10deg)`;
            if (w3) w3.style.transform = `translateY(${Math.sin(progress * 6) * 18}px) rotate(-8deg)`;
            if (w4) w4.style.transform = `translateY(${Math.cos(progress * 5) * 12}px) rotate(5deg)`;

            // Target word glows and scales when progress is large
            if (targetWord) {
                if (progress > 0.45) {
                    targetWord.classList.add('pulsing');
                } else {
                    targetWord.classList.remove('pulsing');
                }
            }
        }
        else if (slideId === 'slide_memo7_2') {
            const t1 = canvas.querySelector('.np-t1');
            const t2 = canvas.querySelector('.np-t2');

            // Highlight newspaper words sequentially
            if (t1) {
                if (progress > 0.25) {
                    t1.classList.add('highlight-active');
                } else {
                    t1.classList.remove('highlight-active');
                }
            }
            if (t2) {
                if (progress > 0.65) {
                    t2.classList.add('highlight-active');
                } else {
                    t2.classList.remove('highlight-active');
                }
            }
        }
        else if (slideId === 'slide_memo7_3') {
            const spotlight = canvas.querySelector('.cloud-spotlight-cone');
            const statusTag = canvas.querySelector('.scan-status-tag');
            const targetWordItem = canvas.querySelector('.target-word-item');
            const items = canvas.querySelectorAll('.cloud-item');

            // Reset lit classes
            items.forEach(it => it.classList.remove('lit'));
            if (targetWordItem) targetWordItem.classList.remove('target-lit');
            if (spotlight) spotlight.classList.remove('target-glow');

            // Attention Spotlight Coordinates inside 320x180 box
            // ci-1: top 25, left 20 (x=50, y=35)
            // ci-5 (Target): top 75, left 110 (x=160, y=90)
            // ci-3: bottom 35, left 40 (x=70, y=145)
            // ci-7: top 110, right 40 (x=250, y=120)

            let targetX = 160, targetY = 90; // Default center

            if (progress < 0.25) {
                // Sweeps to ci-1 (Illusion/Cognitive area)
                const ratio = progress / 0.25;
                const startX = 160, startY = 90;
                const destX = 50, destY = 35;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                const litItem = canvas.querySelector('.ci-1');
                if (litItem && ratio > 0.8) litItem.classList.add('lit');
                
                if (statusTag) {
                    statusTag.textContent = 'TẦM SOÁT THỊ GIÁC...';
                    statusTag.className = 'scan-status-tag';
                }
            } 
            else if (progress < 0.65) {
                // Sweeps onto target (ci-5)
                const ratio = (progress - 0.25) / 0.4;
                const startX = 50, startY = 35;
                const destX = 160, destY = 90;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (ratio > 0.6) {
                    if (targetWordItem) targetWordItem.classList.add('target-lit');
                    if (spotlight) spotlight.classList.add('target-glow');
                    if (statusTag) {
                        statusTag.textContent = 'ĐÃ BẮT SÓNG! 🎯 (ĐỘ ƯU TIÊN: 98%)';
                        statusTag.className = 'scan-status-tag scan-active';
                    }
                } else {
                    if (statusTag) {
                        statusTag.textContent = 'TÌM KIẾM ĐỐI TƯỢNG...';
                        statusTag.className = 'scan-status-tag';
                    }
                }
            } 
            else if (progress < 0.8) {
                // Sweeps away to ci-7
                const ratio = (progress - 0.65) / 0.15;
                const startX = 160, startY = 90;
                const destX = 250, destY = 120;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                const litItem = canvas.querySelector('.ci-7');
                if (litItem && ratio > 0.8) litItem.classList.add('lit');

                if (statusTag) {
                    statusTag.textContent = 'BỘ LỌC HOẠT ĐỘNG';
                    statusTag.className = 'scan-status-tag';
                }
            } 
            else {
                // Locks on target again
                const ratio = (progress - 0.8) / 0.2;
                const startX = 250, startY = 120;
                const destX = 160, destY = 90;
                targetX = startX + (destX - startX) * ratio;
                targetY = startY + (destY - startY) * ratio;

                if (targetWordItem) targetWordItem.classList.add('target-lit');
                if (spotlight) spotlight.classList.add('target-glow');
                if (statusTag) {
                    statusTag.textContent = 'KHÓA ĐỐI TƯỢNG 🔒 (ƯU TIÊN 100%)';
                    statusTag.className = 'scan-status-tag scan-active';
                }
            }

            if (spotlight) {
                spotlight.style.left = `${targetX}px`;
                spotlight.style.top = `${targetY}px`;
            }
        }
        else if (slideId === 'slide_memo7_4') {
            const glowingCard = canvas.querySelector('.glowing-card');
            const dimmedCard = canvas.querySelector('.dimmed-card');

            // Staggered card highlighting
            if (progress < 0.45) {
                if (dimmedCard) dimmedCard.classList.add('dimmed-card-active');
                if (glowingCard) glowingCard.classList.remove('glowing-card-active');
            } 
            else if (progress < 0.8) {
                if (dimmedCard) dimmedCard.classList.remove('dimmed-card-active');
                if (glowingCard) glowingCard.classList.add('glowing-card-active');
            } 
            else {
                if (dimmedCard) dimmedCard.classList.add('dimmed-card-active');
                if (glowingCard) glowingCard.classList.add('glowing-card-active');
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video7',
        topic: 'Frequency Illusion',
        episodeNum: 7,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 7 Plugin] Loaded: Frequency Illusion ready.');
})();
