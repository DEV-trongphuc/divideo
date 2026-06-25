/**
 * DOM Memo Video 50: Nghịch lý lựa chọn (Choice Overload)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo50_1": [
                {
                        "text": "đứng trước 24 loại",
                        "start": 3.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "quyết định đi về tay không",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo50_2": [
                {
                        "text": "Nghịch lý của sự lựa chọn",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "tê liệt quyết định",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo50_3": [
                {
                        "text": "vỏ cortex xử lý êm ái",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "quá tải xung điện",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo50_4": [
                {
                        "text": "dễ ra quyết định nhanh",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "tiêu tốn glucose, gây stress",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo50_5": [
                {
                        "text": "giới hạn trước 3 lựa chọn",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo50_1', 'slide_memo50_2', 'slide_memo50_3', 'slide_memo50_4', 'slide_memo50_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo50_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo50-1-container">
                        <span class="ambient-sleep-particle-v50" style="top: 15%; left: 8%; animation-delay: -1s;">🤯</span>
                        <span class="ambient-sleep-particle-v50" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v50" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="choice-jams-v50">🍯 🍯 🍯 🍯 🍯</div>
                <div class="confused-face-v50">🤯</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo50_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo50-2-container">
                        <span class="ambient-sleep-particle-v50" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v50" style="top: 82%; left: 10%; animation-delay: -4s;">🤯</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v50 node-1">
                                <span class="diagram-node-icon">🛍️</span>
                                <span>1. Quá nhiều món hàng đẹp</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v50 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Quá tải calo so sánh</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v50 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Không mua hoặc hối hận</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nghịch lý lựa chọn*: Đó chính là Nghịch lý của sự lựa chọn. Có quá nhiều phương án làm tăng gánh nặng phân tích cho não bộ, gây ra sự tê liệt quyết định và lo sợ hối hận sau khi mua.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo50_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo50-3-container">
                        <span class="ambient-sleep-particle-v50" style="top: 10%; left: 15%; animation-delay: -1s;">🤯</span>
                        <span class="ambient-sleep-particle-v50" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v50">
                <div class="state-indicator-badge rested">MENU LỰA CHỌN</div>
                <div class="choice-cards-v50">
                    <span class="c-card">Jam A</span>
                    <span class="c-card">Jam B</span>
                </div>
                <div class="interpretation-lbl">Não bộ: Rất thư giãn</div>
            </div>
            <div class="amygdala-dashboard-v50">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TẢI QUYẾT ĐỊNH (CPU)
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Năng lượng tiêu hao</span>
                    <span class="amygdala-status-badge calm">15% (THẤP)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Số lượng phương án vượt quá khả năng xử lý của trí nhớ ngắn hạn sẽ gây ức chế hệ thần kinh trung ương.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo50_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo50-4-container">
                        <span class="ambient-sleep-particle-v50" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v50" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v50">
                            <div class="comp-card-v50 card-left card-active">
                                <div class="comp-header-v50">
                                    <h3>Ít Lựa Chọn (3-4)</h3>
                                    <div class="comp-icon-v50">⚖️</div>
                                </div>
                                <div class="comp-bullet-list-v50">
                                    <div class="comp-bullet-row-v50" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v50">✨</span>
                                        <span>Dễ dàng cân nhắc so sánh</span>
                                    </div>
                                    <div class="comp-bullet-row-v50" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v50">✨</span>
                                        <span>Hài lòng cao với quyết định</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v50">DỄ DÀNG</div>
                            </div>

                            <div class="comp-card-v50 card-right card-inactive">
                                <div class="comp-header-v50">
                                    <h3>Quá Nhiều Lựa Chọn</h3>
                                    <div class="comp-icon-v50">🛍️</div>
                                </div>
                                <div class="comp-bullet-list-v50">
                                    <div class="comp-bullet-row-v50" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v50">❌</span>
                                        <span>Mất nhiều thời gian đắn đo</span>
                                    </div>
                                    <div class="comp-bullet-row-v50" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v50">❌</span>
                                        <span>Sợ chọn sai nên trì hoãn</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v50">MỆT MỎI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo50_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo50-5-container">
                        <div class="takeaway-radar-v50"></div>
                        <div class="takeaway-box-v50" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v50">🤯</div>
                            <div class="takeaway-text-v50">
                                "Để tránh mệt mỏi quyết định, hãy giới hạn bản thân trước 3 lựa chọn hàng đầu. Sự đơn giản chính là bí quyết giải thoát tâm trí!"
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
        if (slideId === 'slide_memo50_1') {
            const jams = canvas.querySelector('.choice-jams-v50');
            const face = canvas.querySelector('.confused-face-v50');
            if (jams && face) {
                if (progress > 0.45) {
                    jams.style.transform = 'scale(1.4)';
                    jams.textContent = '🍯 🍯 🍯 🍯 🍯 🍯 🍯 🍯';
                    face.style.animation = 'bubble-vibrate 0.1s infinite';
                    face.style.transform = 'scale(1.3)';
                } else {
                    jams.style.transform = 'scale(1)';
                    jams.textContent = '🍯 🍯';
                    face.style.animation = 'none';
                    face.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_memo50_2') {
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
        else if (slideId === 'slide_memo50_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const cards = canvas.querySelector('.choice-cards-v50');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'MENU: 2 LỰA CHỌN (DỄ DÀNG)';
                if (cards) cards.innerHTML = '<span class="c-card">Mứt Dâu 🍓</span> <span class="c-card">Mứt Nho 🍇</span>';
                if (lbl) lbl.textContent = 'Não bộ: Dễ dàng quyết định chọn vị yêu thích!';
                if (statusTag) {
                    statusTag.textContent = 'CPU Tải: 15% (Thư giãn)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'MENU: 24 LỰA CHỌN (PARALYSIS)';
                if (cards) {
                    cards.innerHTML = '<span class="c-card">🍓</span><span class="c-card">🍇</span><span class="c-card">🍎</span><span class="c-card">🍊</span><span class="c-card">🍋</span>';
                }
                if (lbl) lbl.textContent = 'Não bộ: Quá nhiều lựa chọn, tê liệt, bỏ cuộc! 🤯';
                if (statusTag) {
                    statusTag.textContent = 'CPU Tải: 99% (Quá tải)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo50_4') {
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
        else if (slideId === 'slide_memo50_5') {
            const box = canvas.querySelector('.takeaway-box-v50');
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
        scriptName: 'video50',
        topic: 'Choice Overload',
        episodeNum: 50,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 50 Plugin] Loaded: Nghịch lý lựa chọn.');
})();
