/**
 * DOM Memo Video 38: Thiên kiến Mệt mỏi (Fatigue Bias)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo38_1": [
                {
                        "text": "đến 1 giờ sáng khi mệt mỏi",
                        "start": 3.5,
                        "end": 6.5,
                        "class": "active-violet"
                },
                {
                        "text": "thấy đối phương đang móc mỉa",
                        "start": 7.0,
                        "end": 10.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo38_2": [
                {
                        "text": "kiệt quệ năng lượng",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "hạch hạnh nhân dễ nghiêng về kịch bản phòng vệ",
                        "start": 5.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo38_3": [
                {
                        "text": "dịch một cách bao dung",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "chế độ phòng thủ tiêu cực",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo38_4": [
                {
                        "text": "lý trí cân bằng, hiểu đúng ngữ cảnh",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bóp méo giao tiếp, suy diễn",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo38_5": [
                {
                        "text": "không phải cuộc trò chuyện, mà là giấc ngủ",
                        "start": 2.0,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo38_1', 'slide_memo38_2', 'slide_memo38_3', 'slide_memo38_4', 'slide_memo38_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo38_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo38-1-container">
                        <span class="ambient-sleep-particle-v38" style="top: 15%; left: 8%; animation-delay: -1s;">🔋</span>
                        <span class="ambient-sleep-particle-v38" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v38" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="tired-battery-v38">🔋 0%</div>
                <div class="angry-bubble-v38">Ok. 😡</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo38_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo38-2-container">
                        <span class="ambient-sleep-particle-v38" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v38" style="top: 82%; left: 10%; animation-delay: -4s;">🔋</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v38 node-1">
                                <span class="diagram-node-icon">🔋</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v38 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v38 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Thiên kiến Mệt mỏi*: Đó là vì khi kiệt quệ năng lượng, vỏ não trước trán giảm kiểm soát cảm xúc, làm hạch hạnh nhân dễ nghiêng về các kịch bản phòng vệ tồi tệ nhất.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo38_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo38-3-container">
                        <span class="ambient-sleep-particle-v38" style="top: 10%; left: 15%; animation-delay: -1s;">🔋</span>
                        <span class="ambient-sleep-particle-v38" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v38">
                <div class="state-indicator-badge rested">PHÂN TÍCH TIN NHẮN</div>
                <div class="text-bubble-sim">Ok.</div>
                <div class="interpretation-lbl">Nghĩa là: Đồng ý</div>
            </div>
            <div class="amygdala-dashboard-v38">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ CẢM XÚC NÃO BỘ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Năng lượng Pin</span>
                    <span class="amygdala-status-badge calm">100% (ĐẦY)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự cạn kiệt năng lượng đường huyết (glucose) làm giảm mạnh khả năng tự ức chế phản ứng lo âu của vỏ não mới.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo38_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo38-4-container">
                        <span class="ambient-sleep-particle-v38" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v38" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v38">
                            <div class="comp-card-v38 card-left card-active">
                                <div class="comp-header-v38">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v38">🔋</div>
                                </div>
                                <div class="comp-bullet-list-v38">
                                    <div class="comp-bullet-row-v38" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v38">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v38" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v38">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v38">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v38 card-right card-inactive">
                                <div class="comp-header-v38">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v38">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v38">
                                    <div class="comp-bullet-row-v38" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v38">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v38" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v38">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v38">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo38_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo38-5-container">
                        <div class="takeaway-radar-v38"></div>
                        <div class="takeaway-box-v38" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v38">🔋</div>
                            <div class="takeaway-text-v38">
                                "Có những lúc thứ cần sửa chữa không phải là cuộc trò chuyện, mà chỉ là giấc ngủ của bạn. Hãy tắt máy đi ngủ sớm nhé!"
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
        if (slideId === 'slide_memo38_1') {
            const bat = canvas.querySelector('.tired-battery-v38');
            const bubble = canvas.querySelector('.angry-bubble-v38');
            if (bat && bubble) {
                if (progress > 0.45) {
                    bat.style.color = 'var(--memo38-secondary)';
                    bat.style.transform = 'scale(0.8)';
                    bubble.style.transform = 'scale(1.4)';
                    bubble.style.backgroundColor = 'rgba(244,63,94,0.15)';
                    bubble.style.borderColor = 'var(--memo38-secondary)';
                } else {
                    bat.style.color = '#fff';
                    bat.style.transform = 'scale(1)';
                    bubble.style.transform = 'scale(1)';
                    bubble.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    bubble.style.borderColor = 'rgba(255,255,255,0.1)';
                }
            }
        }
        else if (slideId === 'slide_memo38_2') {
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
        else if (slideId === 'slide_memo38_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const bubble = canvas.querySelector('.text-bubble-sim');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: KHỎE MẠNH (RESTED)';
                if (bubble) {
                    bubble.textContent = 'Ok. 🙂';
                    bubble.style.background = 'rgba(255,255,255,0.05)';
                    bubble.style.borderColor = 'rgba(255,255,255,0.1)';
                    bubble.style.animation = 'none';
                }
                if (lbl) lbl.textContent = 'Hiểu: Đồng ý, bình thường';
                if (statusTag) {
                    statusTag.textContent = 'Pin: 100% (Sáng suốt)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: KIỆT SỨC (TIRED)';
                if (bubble) {
                    bubble.textContent = 'Ok. 😒 (Ý gì đây?)';
                    bubble.style.background = 'rgba(244,63,94,0.1)';
                    bubble.style.borderColor = '#f43f5e';
                    bubble.style.animation = 'bubble-vibrate 0.2s infinite';
                }
                if (lbl) lbl.textContent = 'Suy diễn: Đang thái độ, khó chịu!';
                if (statusTag) {
                    statusTag.textContent = 'Pin: 5% (Nguy kịch)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo38_4') {
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
        else if (slideId === 'slide_memo38_5') {
            const box = canvas.querySelector('.takeaway-box-v38');
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
        scriptName: 'video38',
        topic: 'Fatigue Bias',
        episodeNum: 38,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 38 Plugin] Loaded: Thiên kiến Mệt mỏi.');
})();
