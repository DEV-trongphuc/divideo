/**
 * DOM Memo Video 39: Đang nói quên sạch (Working Memory)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo39_1": [
                {
                        "text": "đầu óc bỗng trống rỗng",
                        "start": 6.5,
                        "end": 9.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo39_2": [
                {
                        "text": "bộ nhớ tạm thời vô cùng giới hạn",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "đẩy ký ức cũ ra ngoài",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo39_3": [
                {
                        "text": "bong bóng bộ nhớ hoạt động",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "quả bóng lập tức nổ tung",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo39_4": [
                {
                        "text": "duy trì thông tin",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bẻ gãy chuỗi logic",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo39_5": [
                {
                        "text": "quá tải dung lượng",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo39_1', 'slide_memo39_2', 'slide_memo39_3', 'slide_memo39_4', 'slide_memo39_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo39_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo39-1-container">
                        <span class="ambient-sleep-particle-v39" style="top: 15%; left: 8%; animation-delay: -1s;">🎈</span>
                        <span class="ambient-sleep-particle-v39" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v39" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="bubble-speech-v39">Đang kể... 🗣️</div>
                <div class="pop-needle-v39">❓</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo39_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo39-2-container">
                        <span class="ambient-sleep-particle-v39" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v39" style="top: 82%; left: 10%; animation-delay: -4s;">🎈</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v39 node-1">
                                <span class="diagram-node-icon">🎈</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v39 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v39 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Đang nói quên sạch*: Đó là vì bộ nhớ tạm thời của não bộ vô cùng giới hạn. Khi thông tin mới đột ngột chen vào, nó chiếm hết tiêu điểm chú ý và đẩy ký ức cũ ra ngoài.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo39_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo39-3-container">
                        <span class="ambient-sleep-particle-v39" style="top: 10%; left: 15%; animation-delay: -1s;">🎈</span>
                        <span class="ambient-sleep-particle-v39" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v39">
                <div class="state-indicator-badge rested">BỘ NHỚ TẠM THỜI (WORKING MEMORY)</div>
                <div class="balloon-container">
                    <div class="memory-balloon">Ý TƯỞNG 🧠</div>
                </div>
                <div class="interpretation-lbl">Trạng thái: Đang giữ ý chính</div>
            </div>
            <div class="amygdala-dashboard-v39">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    DUNG LƯỢNG BỘ NHỚ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Số lượng thẻ nhớ</span>
                    <span class="amygdala-status-badge calm">4 / 4 Thẻ (Đầy)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Bộ nhớ tạm chỉ lưu trữ thông tin trong khoảng 15-30 giây và tối đa chỉ 4-7 mục thông tin cùng lúc.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo39_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo39-4-container">
                        <span class="ambient-sleep-particle-v39" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v39" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v39">
                            <div class="comp-card-v39 card-left card-active">
                                <div class="comp-header-v39">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v39">🎈</div>
                                </div>
                                <div class="comp-bullet-list-v39">
                                    <div class="comp-bullet-row-v39" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v39">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v39" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v39">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v39">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v39 card-right card-inactive">
                                <div class="comp-header-v39">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v39">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v39">
                                    <div class="comp-bullet-row-v39" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v39">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v39" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v39">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v39">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo39_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo39-5-container">
                        <div class="takeaway-radar-v39"></div>
                        <div class="takeaway-box-v39" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v39">🎈</div>
                            <div class="takeaway-text-v39">
                                "Hiện tượng này không phải đãng trí, mà chỉ là bộ nhớ tạm của bạn vừa bị quá tải dung lượng. Hãy ghi chép nhanh nếu có ý tưởng quan trọng nhé!"
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
        if (slideId === 'slide_memo39_1') {
            const speech = canvas.querySelector('.bubble-speech-v39');
            const needle = canvas.querySelector('.pop-needle-v39');
            if (speech && needle) {
                if (progress > 0.45) {
                    needle.style.transform = 'translate(-60px, 30px) scale(1.5)';
                    speech.textContent = '💥 TRỐNG RỖNG!';
                    speech.style.backgroundColor = 'var(--memo39-secondary)';
                    speech.style.color = '#fff';
                } else {
                    needle.style.transform = 'translate(0, 0) scale(1)';
                    speech.textContent = 'Đang kể... 🗣️';
                    speech.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    speech.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo39_2') {
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
        else if (slideId === 'slide_memo39_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const balloon = canvas.querySelector('.memory-balloon');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: TẬP TRUNG KỂ';
                if (balloon) {
                    balloon.textContent = 'Ý TƯỞNG 🧠';
                    balloon.style.background = 'var(--memo39-primary)';
                    balloon.style.transform = 'scale(1)';
                    balloon.style.opacity = '1';
                }
                if (lbl) lbl.textContent = 'Não: Giữ vững ý chính trong bộ nhớ đệm';
                if (statusTag) {
                    statusTag.textContent = 'Lưu trữ: 4/4 Thẻ';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: BỊ CHEN NGANG!';
                if (balloon) {
                    balloon.textContent = '💥 QUÊN SẠCH!';
                    balloon.style.background = 'var(--memo39-secondary)';
                    balloon.style.transform = 'scale(1.2)';
                    balloon.style.opacity = '0.9';
                }
                if (lbl) lbl.textContent = 'Não: Ý tưởng cũ đã bị xóa khỏi RAM';
                if (statusTag) {
                    statusTag.textContent = 'Lưu trữ: 0/4 (Rỗng)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo39_4') {
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
        else if (slideId === 'slide_memo39_5') {
            const box = canvas.querySelector('.takeaway-box-v39');
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
        scriptName: 'video39',
        topic: 'Working Memory',
        episodeNum: 39,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 39 Plugin] Loaded: Đang nói quên sạch.');
})();
