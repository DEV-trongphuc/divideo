/**
 * DOM Memo Video 53: Sợ mất mát (Loss Aversion)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo53_1": [
                {
                        "text": "nhặt được 100 ngàn",
                        "start": 1.0,
                        "end": 3.5,
                        "class": "active-green"
                },
                {
                        "text": "làm rơi mất 100 ngàn",
                        "start": 4.0,
                        "end": 6.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo53_2": [
                {
                        "text": "Tâm lý Sợ mất mát",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "phòng tránh nguy cơ hơn tìm phần thưởng",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo53_3": [
                {
                        "text": "dopamine tăng nhẹ",
                        "start": 2.0,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "hạch hạnh nhân kích hoạt cực độ",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo53_4": [
                {
                        "text": "tích lũy nhẹ nhàng",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "bản năng tự vệ sinh tồn dữ dội",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo53_5": [
                {
                        "text": "sợ mất một thứ gì đó",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "trói buộc tiềm năng",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo53_1', 'slide_memo53_2', 'slide_memo53_3', 'slide_memo53_4', 'slide_memo53_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo53_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo53-1-container">
                        <span class="ambient-sleep-particle-v53" style="top: 15%; left: 8%; animation-delay: -1s;">📉</span>
                        <span class="ambient-sleep-particle-v53" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v53" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="broken-coin-v53">📉 🪙</div>
                <div class="pain-bar-v53">ĐAU GẤP 2 LẦN!</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo53_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo53-2-container">
                        <span class="ambient-sleep-particle-v53" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v53" style="top: 82%; left: 10%; animation-delay: -4s;">📉</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v53 node-1">
                                <span class="diagram-node-icon">📉</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v53 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v53 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Sợ mất mát*: Hiện tượng này gọi là Tâm lý Sợ mất mát. Bộ não con người tiến hóa để ưu tiên phòng tránh nguy cơ hơn là tìm kiếm phần thưởng, coi việc mất đi một tài sản sẵn có là mối đe dọa sinh tồn nghiêm trọng.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo53_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo53-3-container">
                        <span class="ambient-sleep-particle-v53" style="top: 10%; left: 15%; animation-delay: -1s;">📉</span>
                        <span class="ambient-sleep-particle-v53" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v53">
                <div class="state-indicator-badge rested">CẢM XÚC ĐỐI XỨNG</div>
                <div class="coin-gain-loss">
                    <span class="coin-action">🪙</span>
                </div>
                <div class="interpretation-lbl">Chỉ số cảm xúc: 0</div>
            </div>
            <div class="amygdala-dashboard-v53">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ BIÊN ĐỘ ĐAU KHỔ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Phản ứng sinh học</span>
                    <span class="amygdala-status-badge calm">Trung Tính (0)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Daniel Kahneman chứng minh rằng về mặt tâm lý, tổn thất gây ra vết thương cảm xúc đau gấp 2 đến 2.5 lần lợi ích tương đương.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo53_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo53-4-container">
                        <span class="ambient-sleep-particle-v53" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v53" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v53">
                            <div class="comp-card-v53 card-left card-active">
                                <div class="comp-header-v53">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v53">📉</div>
                                </div>
                                <div class="comp-bullet-list-v53">
                                    <div class="comp-bullet-row-v53" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v53">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v53" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v53">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v53">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v53 card-right card-inactive">
                                <div class="comp-header-v53">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v53">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v53">
                                    <div class="comp-bullet-row-v53" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v53">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v53" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v53">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v53">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo53_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo53-5-container">
                        <div class="takeaway-radar-v53"></div>
                        <div class="takeaway-box-v53" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v53">📉</div>
                            <div class="takeaway-text-v53">
                                "Khi đưa ra quyết định, hãy chú ý xem bạn có đang chọn chỉ vì sợ mất một thứ gì đó hay không. Đừng để nỗi sợ mất mát trói buộc tiềm năng của bạn!"
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
        if (slideId === 'slide_memo53_1') {
            const coin = canvas.querySelector('.broken-coin-v53');
            const pain = canvas.querySelector('.pain-bar-v53');
            if (coin && pain) {
                if (progress > 0.45) {
                    coin.style.transform = 'scale(1.4) translateY(20px)';
                    pain.style.opacity = '1';
                    pain.style.transform = 'scale(1.2)';
                    pain.style.color = 'var(--memo53-primary)';
                } else {
                    coin.style.transform = 'scale(1) translateY(0)';
                    pain.style.opacity = '0.3';
                    pain.style.transform = 'scale(1)';
                    pain.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo53_2') {
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
        else if (slideId === 'slide_memo53_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const coin = canvas.querySelector('.coin-action');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TÌNH HUỐNG: ĐƯỢC 100.000đ';
                if (coin) { coin.textContent = '🪙 +100k 🟩'; coin.style.transform = 'scale(1.2)'; }
                if (lbl) lbl.textContent = 'Cảm xúc: Vui vẻ nhẹ (+10 điểm)';
                if (statusTag) {
                    statusTag.textContent = 'Phản ứng: Dopamine Tăng';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TÌNH HUỐNG: MẤT 100.000đ';
                if (coin) {
                    coin.textContent = '📉 -100k 🟥';
                    coin.style.transform = 'scale(1.5) rotate(-15deg)';
                }
                if (lbl) lbl.textContent = 'Cảm xúc: Cực kỳ tức giận (-25 điểm) 😡';
                if (statusTag) {
                    statusTag.textContent = 'Phản ứng: Amygdala Báo Động Đỏ';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo53_4') {
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
        else if (slideId === 'slide_memo53_5') {
            const box = canvas.querySelector('.takeaway-box-v53');
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
        scriptName: 'video53',
        topic: 'Loss Aversion',
        episodeNum: 53,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 53 Plugin] Loaded: Sợ mất mát.');
})();
