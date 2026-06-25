/**
 * DOM Memo Video 55: Hiệu ứng Khung (Framing Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo55_1": [
                {
                        "text": "95% không béo",
                        "start": 2.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "Có 5% chất béo",
                        "start": 5.0,
                        "end": 7.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo55_2": [
                {
                        "text": "Hiệu ứng Khung nhận thức",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "tích cực hay tiêu cực",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo55_3": [
                {
                        "text": "Không béo, dopamine sáng lên",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "Có béo, đánh giá mối đe dọa",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo55_4": [
                {
                        "text": "khung tích cực",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "khung tiêu cực",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo55_5": [
                {
                        "text": "bóc tách lớp vỏ ngôn ngữ",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo55_1', 'slide_memo55_2', 'slide_memo55_3', 'slide_memo55_4', 'slide_memo55_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo55_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo55-1-container">
                        <span class="ambient-sleep-particle-v55" style="top: 15%; left: 8%; animation-delay: -1s;">🖼️</span>
                        <span class="ambient-sleep-particle-v55" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v55" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="frame-border-v55">🥛</div>
                <div class="frame-label-v55">95% Fat Free vs 5% Fat</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo55_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo55-2-container">
                        <span class="ambient-sleep-particle-v55" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v55" style="top: 82%; left: 10%; animation-delay: -4s;">🖼️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v55 node-1">
                                <span class="diagram-node-icon">🖼️</span>
                                <span>1. Đọc tin điều trị bệnh</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v55 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Kích hoạt cảm xúc sợ/hy vọng</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v55 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Lựa chọn phương án khác nhau</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Khung*: Đó là Hiệu ứng Khung nhận thức. Bộ não phản ứng khác nhau dựa trên cách thông tin được định khung là tích cực (được lợi) hay tiêu cực (bị tổn thất), dù bản chất hoàn toàn giống nhau.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo55_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo55-3-container">
                        <span class="ambient-sleep-particle-v55" style="top: 10%; left: 15%; animation-delay: -1s;">🖼️</span>
                        <span class="ambient-sleep-particle-v55" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v55">
                <div class="state-indicator-badge rested">PHÂN TÍCH KHUNG THÔNG TIN</div>
                <div class="milk-box">🥛</div>
                <div class="interpretation-lbl">Nhãn: 95% không béo</div>
            </div>
            <div class="amygdala-dashboard-v55">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐÁNH GIÁ SỨC KHỎE
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức độ hấp dẫn</span>
                    <span class="amygdala-status-badge calm">CỰC CAO (90%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự định khung đánh lừa cơ chế phán đoán tự động của hệ thống 1, khiến nó bỏ qua các phép so sánh toán học cơ bản.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo55_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo55-4-container">
                        <span class="ambient-sleep-particle-v55" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v55" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v55">
                            <div class="comp-card-v55 card-left card-active">
                                <div class="comp-header-v55">
                                    <h3>Tỷ Lệ Sống 80%</h3>
                                    <div class="comp-icon-v55">🌱</div>
                                </div>
                                <div class="comp-bullet-list-v55">
                                    <div class="comp-bullet-row-v55" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v55">✨</span>
                                        <span>Kích hoạt an tâm, hy vọng</span>
                                    </div>
                                    <div class="comp-bullet-row-v55" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v55">✨</span>
                                        <span>Đồng ý điều trị lập tức</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v55">HY VỌNG</div>
                            </div>

                            <div class="comp-card-v55 card-right card-inactive">
                                <div class="comp-header-v55">
                                    <h3>Tỷ Lệ Chết 20%</h3>
                                    <div class="comp-icon-v55">💀</div>
                                </div>
                                <div class="comp-bullet-list-v55">
                                    <div class="comp-bullet-row-v55" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v55">❌</span>
                                        <span>Kích hoạt nỗi sợ mất mát</span>
                                    </div>
                                    <div class="comp-bullet-row-v55" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v55">❌</span>
                                        <span>Từ chối và đề phòng tìm cách khác</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v55">LO SỢ</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo55_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo55-5-container">
                        <div class="takeaway-radar-v55"></div>
                        <div class="takeaway-box-v55" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v55">🖼️</div>
                            <div class="takeaway-text-v55">
                                "Hãy bóc tách lớp vỏ ngôn ngữ để nhìn vào bản chất con số. Đừng để những chiếc khung từ ngữ định đoạt lựa chọn của bạn!"
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: { class: 'lucide-icon-custom' },
                nameAttr: 'data-lucide'
            });
        }
    }

    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_memo55_1') {
            const frame = canvas.querySelector('.frame-border-v55');
            const label = canvas.querySelector('.frame-label-v55');
            if (frame && label) {
                if (progress > 0.45) {
                    frame.style.transform = 'scale(1.4) rotate(15deg)';
                    label.textContent = 'BẢN CHẤT HOÀN TOÀN NHƯ NHAU! ⚖️';
                    label.style.color = 'var(--memo55-primary)';
                } else {
                    frame.style.transform = 'scale(1) rotate(0deg)';
                    label.textContent = '95% Fat Free vs 5% Fat';
                    label.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo55_2') {
            const n1 = canvas.querySelector('.node-1');
            const n2 = canvas.querySelector('.node-2');
            const n3 = canvas.querySelector('.node-3');
            const a1 = canvas.querySelector('.arrow-1');
            const a2 = canvas.querySelector('.arrow-2');

            if (progress >= 0.7) {
                if (n1) n1.classList.add('active-node');
                if (n2) n2.classList.add('active-node');
                if (n3) n3.classList.add('active-node');
                if (a1) a1.classList.add('highlight-link');
                if (a2) a2.classList.add('highlight-link');
            } else if (progress >= 0.35) {
                if (n1) n1.classList.add('active-node');
                if (n2) n2.classList.add('active-node');
                if (n3) n3.classList.remove('active-node');
                if (a1) a1.classList.add('highlight-link');
                if (a2) a2.classList.remove('highlight-link');
            } else {
                if (n1) n1.classList.add('active-node');
                if (n2) n2.classList.remove('active-node');
                if (n3) n3.classList.remove('active-node');
                if (a1) a1.classList.remove('highlight-link');
                if (a2) a2.classList.remove('highlight-link');
            }
        }
        else if (slideId === 'slide_memo55_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const milk = canvas.querySelector('.milk-box');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'KHUNG A: TẬP TRUNG TÍCH CỰC';
                if (milk) { milk.style.transform = 'scale(1.2)'; milk.style.filter = 'none'; }
                if (lbl) lbl.textContent = 'Mô tả: 95% KHÔNG BÉO 🥛 (Ấn tượng tốt)';
                if (statusTag) {
                    statusTag.textContent = 'Độ hấp dẫn: 90% (Mua)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'KHUNG B: TẬP TRUNG TIÊU CỰC';
                if (milk) {
                    milk.style.transform = 'scale(1)';
                    milk.style.filter = 'grayscale(0.8)';
                }
                if (lbl) lbl.textContent = 'Mô tả: CHỨA 5% BÉO ⚠️ (Có vẻ độc hại)';
                if (statusTag) {
                    statusTag.textContent = 'Độ hấp dẫn: 15% (Bỏ qua)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo55_4') {
            const leftCard = canvas.querySelector('.card-left');
            const rightCard = canvas.querySelector('.card-right');

            if (progress < 0.5) {
                if (leftCard) {
                    leftCard.classList.remove('card-inactive');
                    leftCard.classList.add('card-active');
                }
                if (rightCard) {
                    rightCard.classList.remove('card-active');
                    rightCard.classList.add('card-inactive');
                }
            } else {
                if (leftCard) {
                    leftCard.classList.remove('card-active');
                    leftCard.classList.add('card-inactive');
                }
                if (rightCard) {
                    rightCard.classList.remove('card-inactive');
                    rightCard.classList.add('card-active');
                }
            }
        }
        else if (slideId === 'slide_memo55_5') {
            const box = canvas.querySelector('.takeaway-box-v55');
            if (box) {
                if (progress > 0.2) {
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

    window.VideoPlugin = {
        scriptName: 'video55',
        topic: 'Framing Effect',
        episodeNum: 55,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 55 Plugin] Loaded: Hiệu ứng Khung.');
})();
