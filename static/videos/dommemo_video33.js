/**
 * DOM Memo Video 33: Cơn đói ngọt ngào (Hunger Expectation)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo33_1": [
                {
                        "text": "đói cồn cào",
                        "start": 1.0,
                        "end": 3.0,
                        "class": "active-violet"
                },
                {
                        "text": "thèm ăn dữ dội",
                        "start": 4.5,
                        "end": 7.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo33_2": [
                {
                        "text": "hormone Ghrelin",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "nâng độ nhạy cảm của khứu giác và vị giác",
                        "start": 6.0,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo33_3": [
                {
                        "text": "phóng to và kích thích mạnh",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "hệ thống tưởng thưởng dopamine",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo33_4": [
                {
                        "text": "ăn no, giảm phản xạ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "tối ưu hóa mọi cảm giác quan",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo33_5": [
                {
                        "text": "cơ chế sinh tồn tối thượng",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo33_1', 'slide_memo33_2', 'slide_memo33_3', 'slide_memo33_4', 'slide_memo33_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo33_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo33-1-container">
                        <span class="ambient-sleep-particle-v33" style="top: 15%; left: 8%; animation-delay: -1s;">🍔</span>
                        <span class="ambient-sleep-particle-v33" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v33" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="burger-giant-v33">🍔</div>
                <div class="heartbeat-glow-v33"></div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo33_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo33-2-container">
                        <span class="ambient-sleep-particle-v33" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v33" style="top: 82%; left: 10%; animation-delay: -4s;">🍔</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v33 node-1">
                                <span class="diagram-node-icon">🍬</span>
                                <span>1. Mùi bánh ngọt thơm</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v33 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Não tăng tiết insulin</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v33 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Hạ đường huyết, đói ngấu</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Cơn đói ngọt ngào*: Sự thật là khi cơ thể thiếu hụt glucose, dạ dày tiết ra hormone Ghrelin gửi tín hiệu đến não bộ để nâng độ nhạy cảm của khứu giác và vị giác lên mức báo động.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo33_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo33-3-container">
                        <span class="ambient-sleep-particle-v33" style="top: 10%; left: 15%; animation-delay: -1s;">🍔</span>
                        <span class="ambient-sleep-particle-v33" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v33">
                <div class="state-indicator-badge rested">CẢM THỤ DÀNH CHO THỨC ĂN</div>
                <div class="food-plate">🍔</div>
                <div class="interpretation-lbl">Kích thước đồ ăn trong mắt bạn</div>
            </div>
            <div class="amygdala-dashboard-v33">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HORMONE GHRELIN (ĐÓI)
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Nồng độ hormone</span>
                    <span class="amygdala-status-badge calm">Bình thường (10%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Ghrelin tăng kích thích trực tiếp lên vùng dưới đồi làm thay đổi hoàn toàn hệ thống lọc tín hiệu giác quan.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo33_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo33-4-container">
                        <span class="ambient-sleep-particle-v33" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v33" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v33">
                            <div class="comp-card-v33 card-left card-active">
                                <div class="comp-header-v33">
                                    <h3>Điều Kiện Thường</h3>
                                    <div class="comp-icon-v33">🔋</div>
                                </div>
                                <div class="comp-bullet-list-v33">
                                    <div class="comp-bullet-row-v33" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v33">✨</span>
                                        <span>Đói do cơ thể thiếu chất</span>
                                    </div>
                                    <div class="comp-bullet-row-v33" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v33">✨</span>
                                        <span>Cần bổ sung calo thực</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v33">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v33 card-right card-inactive">
                                <div class="comp-header-v33">
                                    <h3>Đói Kỳ Vọng</h3>
                                    <div class="comp-icon-v33">🍬</div>
                                </div>
                                <div class="comp-bullet-list-v33">
                                    <div class="comp-bullet-row-v33" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v33">❌</span>
                                        <span>Đói do kích thích giác quan</span>
                                    </div>
                                    <div class="comp-bullet-row-v33" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v33">❌</span>
                                        <span>Tự hạ đường huyết tạm thời</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v33">ẢO GIÁC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo33_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo33-5-container">
                        <div class="takeaway-radar-v33"></div>
                        <div class="takeaway-box-v33" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v33">🍔</div>
                            <div class="takeaway-text-v33">
                                "Không phải đầu bếp nấu ngon hơn, mà là bộ não của bạn đang kích hoạt cơ chế sinh tồn tối thượng: tìm thức ăn ngay lập tức!"
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
        if (slideId === 'slide_memo33_1') {
            const burger = canvas.querySelector('.burger-giant-v33');
            if (burger) {
                if (progress > 0.45) {
                    burger.style.transform = 'scale(2.2)';
                    burger.style.filter = 'drop-shadow(0 0 40px var(--memo33-orange))';
                } else {
                    burger.style.transform = 'scale(1)';
                    burger.style.filter = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo33_2') {
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
        else if (slideId === 'slide_memo33_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const food = canvas.querySelector('.food-plate');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: NO BỤNG';
                if (food) { food.style.transform = 'scale(1)'; food.style.filter = 'none'; }
                if (lbl) lbl.textContent = 'Độ nhạy cảm vị giác: Bình thường';
                if (statusTag) {
                    statusTag.textContent = 'Ghrelin: 10% (Bình thường)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: ĐÓI CỒN CÀO!';
                if (food) {
                    food.style.transform = 'scale(1.4) rotate(' + (Math.sin(progress*20)*10) + 'deg)';
                    food.style.filter = 'drop-shadow(0 0 20px #f97316)';
                }
                if (lbl) lbl.textContent = 'Độ nhạy cảm vị giác: X2 (Ngon tuyệt vời)';
                if (statusTag) {
                    statusTag.textContent = 'Ghrelin: 95% (Cực cao)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo33_4') {
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
        else if (slideId === 'slide_memo33_5') {
            const box = canvas.querySelector('.takeaway-box-v33');
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
        scriptName: 'video33',
        topic: 'Hunger Expectation',
        episodeNum: 33,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 33 Plugin] Loaded: Cơn đói ngọt ngào.');
})();
