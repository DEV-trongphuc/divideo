/**
 * DOM Memo Video 27: Cù không cười (Self-Tickling)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo27_1": [
                {
                        "text": "cười lăn khi người khác cù",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "tự cù mình lại gần như không có cảm giác",
                        "start": 4.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo27_2": [
                {
                        "text": "dự đoán trước chuyển động",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "giảm đi độ bất ngờ",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo27_3": [
                {
                        "text": "người khác cù",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "tự cù",
                        "start": 5.0,
                        "end": 7.5,
                        "class": "active-violet"
                },
                {
                        "text": "chặn trước, triệt tiêu",
                        "start": 8.0,
                        "end": 11.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo27_4": [
                {
                        "text": "tín hiệu bất ngờ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "tín hiệu dự phòng",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo27_5": [
                {
                        "text": "không phải không cảm nhận",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "thủ phạm... chính là bạn",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo27_1', 'slide_memo27_2', 'slide_memo27_3', 'slide_memo27_4', 'slide_memo27_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo27_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo27-1-container">
                        <span class="ambient-sleep-particle-v27" style="top: 15%; left: 8%; animation-delay: -1s;">🪶</span>
                        <span class="ambient-sleep-particle-v27" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v27" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="feather-large-v27">🪶</div>
                <div class="face-target-v27">😐</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo27_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo27-2-container">
                        <span class="ambient-sleep-particle-v27" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v27" style="top: 82%; left: 10%; animation-delay: -4s;">🪶</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v27 node-1">
                                <span class="diagram-node-icon">🪶</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v27 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v27 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Cù không cười*: Đó là vì não bộ đã dự đoán trước chuyển động do chính tay bạn tạo ra. Tiểu não của bạn lập tức tính toán và tự động giảm đi độ bất ngờ của cảm giác đó.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo27_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo27-3-container">
                        <span class="ambient-sleep-particle-v27" style="top: 10%; left: 15%; animation-delay: -1s;">🪶</span>
                        <span class="ambient-sleep-particle-v27" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v27">
                <div class="state-indicator-badge rested">CHỌN CHẾ ĐỘ CÙ</div>
                <div class="tickle-scene">
                    <span class="tickle-emoji">😐</span>
                    <span class="feather-actor">🪶</span>
                </div>
                <div class="interpretation-lbl">Cảm giác: Bình thường</div>
            </div>
            <div class="amygdala-dashboard-v27">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TÍN HIỆU TIỂU NÃO
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Ức chế cảm giác</span>
                    <span class="amygdala-status-badge calm">BẬT (TỰ CÙ)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Tiểu não gửi bản sao dự báo động tác (efference copy) đến vỏ não cảm giác để xóa bỏ phản ứng cù.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo27_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo27-4-container">
                        <span class="ambient-sleep-particle-v27" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v27" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v27">
                            <div class="comp-card-v27 card-left card-active">
                                <div class="comp-header-v27">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v27">🪶</div>
                                </div>
                                <div class="comp-bullet-list-v27">
                                    <div class="comp-bullet-row-v27" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v27">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v27" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v27">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v27">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v27 card-right card-inactive">
                                <div class="comp-header-v27">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v27">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v27">
                                    <div class="comp-bullet-row-v27" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v27">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v27" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v27">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v27">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo27_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo27-5-container">
                        <div class="takeaway-radar-v27"></div>
                        <div class="takeaway-box-v27" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v27">🪶</div>
                            <div class="takeaway-text-v27">
                                "Tóm lại, bộ não không phải không cảm nhận được ngón tay bạn, nó chỉ biết rất rõ thủ phạm... chính là bạn!"
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
        if (slideId === 'slide_memo27_1') {
            const feather = canvas.querySelector('.feather-large-v27');
            const face = canvas.querySelector('.face-target-v27');
            if (feather && face) {
                if (progress > 0.4) {
                    feather.style.transform = 'translate(60px, -20px) rotate(-30deg)';
                    face.textContent = '😂';
                    face.style.transform = 'scale(1.4) rotate(15deg)';
                } else {
                    feather.style.transform = 'translate(0, 0) rotate(0deg)';
                    face.textContent = '😐';
                    face.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_memo27_2') {
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
        else if (slideId === 'slide_memo27_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const emoji = canvas.querySelector('.tickle-emoji');
            const feather = canvas.querySelector('.feather-actor');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'CHẾ ĐỘ: TỰ CÙ';
                if (emoji) { emoji.textContent = '😐'; emoji.style.transform = 'scale(1)'; }
                if (feather) feather.style.animation = 'feather-tickle-self 1s infinite';
                if (lbl) lbl.textContent = 'Cảm giác: Bình thường 😐 (Tiểu não chặn)';
                if (statusTag) {
                    statusTag.textContent = 'ỨC CHẾ: 95%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'CHẾ ĐỘ: NGƯỜI KHÁC CÙ';
                if (emoji) {
                    emoji.textContent = '😂';
                    emoji.style.transform = 'scale(1.2) rotate(' + (Math.sin(progress * 50) * 10) + 'deg)';
                }
                if (feather) feather.style.animation = 'feather-tickle-other 0.3s infinite';
                if (lbl) lbl.textContent = 'Cảm giác: Nhột phát điên! 😂 (Bất ngờ)';
                if (statusTag) {
                    statusTag.textContent = 'ỨC CHẾ: 0%';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo27_4') {
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
        else if (slideId === 'slide_memo27_5') {
            const box = canvas.querySelector('.takeaway-box-v27');
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
        scriptName: 'video27',
        topic: 'Self-Tickling',
        episodeNum: 27,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 27 Plugin] Loaded: Cù không cười.');
})();
