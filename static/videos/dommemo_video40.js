/**
 * DOM Memo Video 40: Nhớ sai kỷ niệm (Memory Distort)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo40_1": [
                {
                        "text": "cam đoan chiếc áo màu đỏ",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-violet"
                },
                {
                        "text": "ảnh chụp lại là màu xanh lá",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-green"
                }
        ],
        "slide_memo40_2": [
                {
                        "text": "không phải video lưu trong ổ cứng",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "lôi ra và biên soạn lại",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo40_3": [
                {
                        "text": "ý kiến và cảm xúc chèn thông tin",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "lưu đè bằng phiên bản đã sửa",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo40_4": [
                {
                        "text": "Bản gốc chỉ tồn tại duy nhất",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bản sao của lần nhớ lại gần nhất",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo40_5": [
                {
                        "text": "chỉnh sửa quá khứ",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo40_1', 'slide_memo40_2', 'slide_memo40_3', 'slide_memo40_4', 'slide_memo40_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo40_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo40-1-container">
                        <span class="ambient-sleep-particle-v40" style="top: 15%; left: 8%; animation-delay: -1s;">🖼️</span>
                        <span class="ambient-sleep-particle-v40" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v40" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="polaroid-v40">
                    <span class="shirt-morph-v40">👕</span>
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo40_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo40-2-container">
                        <span class="ambient-sleep-particle-v40" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v40" style="top: 82%; left: 10%; animation-delay: -4s;">🖼️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v40 node-1">
                                <span class="diagram-node-icon">💭</span>
                                <span>1. Nhớ lại kỷ niệm quá khứ</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v40 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Não ghi đè cảm xúc mới</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v40 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Tự tin tin vào ký ức sai</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nhớ sai kỷ niệm*: Đó là vì Ký ức không phải video lưu trong ổ cứng. Mỗi lần nhớ lại, não sẽ lôi thông tin ra vùng đệm ý thức và biên soạn lại câu chuyện từ các mảnh ghép nhỏ.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo40_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo40-3-container">
                        <span class="ambient-sleep-particle-v40" style="top: 10%; left: 15%; animation-delay: -1s;">🖼️</span>
                        <span class="ambient-sleep-particle-v40" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v40">
                <div class="state-indicator-badge rested">QUÁ TRÌNH TÁI CỦNG CỐ KÝ ỨC</div>
                <div class="photo-frame">
                    <div class="shirt-emoji">👕</div>
                </div>
                <div class="interpretation-lbl">Ký ức gốc: Chiếc áo Xanh Lá</div>
            </div>
            <div class="amygdala-dashboard-v40">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    SAI LỆCH THEO THỜI GIAN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Tỷ lệ biến dạng</span>
                    <span class="amygdala-status-badge calm">0% (Sự kiện gốc)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Quá trình tái củng cố ký ức (Memory Reconsolidation) mở ra cơ hội để chỉnh sửa dữ liệu gốc bằng cảm xúc hiện tại.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo40_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo40-4-container">
                        <span class="ambient-sleep-particle-v40" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v40" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v40">
                            <div class="comp-card-v40 card-left card-active">
                                <div class="comp-header-v40">
                                    <h3>Bản Gốc Kỷ Ức</h3>
                                    <div class="comp-icon-v40">🛡️</div>
                                </div>
                                <div class="comp-bullet-list-v40">
                                    <div class="comp-bullet-row-v40" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v40">✨</span>
                                        <span>Chi tiết chính xác 100%</span>
                                    </div>
                                    <div class="comp-bullet-row-v40" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v40">✨</span>
                                        <span>Chỉ tồn tại ở quá khứ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v40">NGUYÊN BẢN</div>
                            </div>

                            <div class="comp-card-v40 card-right card-inactive">
                                <div class="comp-header-v40">
                                    <h3>Tái Thiết Kỷ Ức</h3>
                                    <div class="comp-icon-v40">💭</div>
                                </div>
                                <div class="comp-bullet-list-v40">
                                    <div class="comp-bullet-row-v40" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v40">❌</span>
                                        <span>Ghi đè định kiến hiện tại</span>
                                    </div>
                                    <div class="comp-bullet-row-v40" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v40">❌</span>
                                        <span>Não tự lấp đầy chi tiết giả</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v40">BIẾN ĐỔI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo40_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo40-5-container">
                        <div class="takeaway-radar-v40"></div>
                        <div class="takeaway-box-v40" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v40">🖼️</div>
                            <div class="takeaway-text-v40">
                                "Bạn không hề nói dối, chỉ là bộ não đang hoạt động như một nhà viết kịch tài ba, liên tục chỉnh sửa quá khứ để phù hợp với hiện tại!"
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
        if (slideId === 'slide_memo40_1') {
            const shirt = canvas.querySelector('.shirt-morph-v40');
            if (shirt) {
                if (progress > 0.45) {
                    shirt.style.color = 'var(--memo40-secondary)';
                    shirt.style.transform = 'scale(1.4) rotate(15deg)';
                } else {
                    shirt.style.color = 'var(--memo40-primary)';
                    shirt.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_memo40_2') {
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
        else if (slideId === 'slide_memo40_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const shirt = canvas.querySelector('.shirt-emoji');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: SỰ KIỆN NĂM 2020';
                if (shirt) { shirt.style.color = '#10b981'; shirt.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Sự thật gốc: Bạn mặc áo Màu Xanh Lá 🟩';
                if (statusTag) {
                    statusTag.textContent = 'Biến dạng: 0% (Bản Gốc)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: NHỚ LẠI NĂM 2026';
                if (shirt) {
                    shirt.style.color = '#ef4444';
                    shirt.style.transform = 'scale(1.3) rotate(' + (Math.sin(progress*20)*5) + 'deg)';
                }
                if (lbl) lbl.textContent = 'Ý nghĩ hiện tại: Mình mặc áo Màu Đỏ 🟥';
                if (statusTag) {
                    statusTag.textContent = 'Biến dạng: 85% (Bị ghi đè)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo40_4') {
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
        else if (slideId === 'slide_memo40_5') {
            const box = canvas.querySelector('.takeaway-box-v40');
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
        scriptName: 'video40',
        topic: 'Memory Distort',
        episodeNum: 40,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 40 Plugin] Loaded: Nhớ sai kỷ niệm.');
})();
