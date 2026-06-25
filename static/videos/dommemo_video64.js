/**
 * DOM Memo Video 64: Hiệu ứng Franklin (Ben Franklin Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo64_1": [
                {
                        "text": "cho mượn một cuốn sách",
                        "start": 3.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "bỗng thấy thiện cảm với họ hơn",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo64_2": [
                {
                        "text": "Hiệu ứng Ben Franklin",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "giải quyết sự xung đột nhận thức",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo64_3": [
                {
                        "text": "trao đi một cuốn sách giúp đỡ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "thang điểm thiện cảm tăng vọt",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo64_4": [
                {
                        "text": "lấy lòng bằng quà cáp phản tác dụng",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "nhờ giúp việc nhỏ là cầu nối hiệu quả",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo64_5": [
                {
                        "text": "biến đối thủ thành đồng minh",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo64_1', 'slide_memo64_2', 'slide_memo64_3', 'slide_memo64_4', 'slide_memo64_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo64_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo64-1-container">
                        <span class="ambient-sleep-particle-v64" style="top: 15%; left: 8%; animation-delay: -1s;">🙋</span>
                        <span class="ambient-sleep-particle-v64" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v64" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="help-hand-v64">🙋 🤝 🙋</div>
                <div class="heart-pulse-v64">💖</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo64_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo64-2-container">
                        <span class="ambient-sleep-particle-v64" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v64" style="top: 82%; left: 10%; animation-delay: -4s;">🙋</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v64 node-1">
                                <span class="diagram-node-icon">🙋</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v64 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v64 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Franklin*: Đó chính là Hiệu ứng Ben Franklin. Để giải quyết sự xung đột nhận thức trong đầu: 'Tại sao mình lại giúp kẻ mình ghét?', bộ não tự động thay đổi thái độ thành 'Chắc là mình cũng thích họ nên mới giúp'.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo64_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo64-3-container">
                        <span class="ambient-sleep-particle-v64" style="top: 10%; left: 15%; animation-delay: -1s;">🙋</span>
                        <span class="ambient-sleep-particle-v64" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v64">
                <div class="state-indicator-badge rested">KẾT NỐI MƯỢN ĐỒ</div>
                <div class="favor-scene">
                    <span class="book-actor">📖</span>
                    <span class="favor-reaction">😐 (Lạnh lùng)</span>
                </div>
                <div class="interpretation-lbl">Thiện cảm: 20% (Xung khắc)</div>
            </div>
            <div class="amygdala-dashboard-v64">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    XUNG ĐỘT NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Hòa hợp tâm lý</span>
                    <span class="amygdala-status-badge calm">Thấp (20%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ không chấp nhận sự mâu thuẫn giữa hành vi (giúp đỡ) và cảm xúc (ghét bỏ), nó sẽ buộc cảm xúc phải thay đổi theo hành vi.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo64_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo64-4-container">
                        <span class="ambient-sleep-particle-v64" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v64" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v64">
                            <div class="comp-card-v64 card-left card-active">
                                <div class="comp-header-v64">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v64">🙋</div>
                                </div>
                                <div class="comp-bullet-list-v64">
                                    <div class="comp-bullet-row-v64" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v64">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v64" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v64">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v64">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v64 card-right card-inactive">
                                <div class="comp-header-v64">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v64">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v64">
                                    <div class="comp-bullet-row-v64" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v64">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v64" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v64">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v64">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo64_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo64-5-container">
                        <div class="takeaway-radar-v64"></div>
                        <div class="takeaway-box-v64" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v64">🙋</div>
                            <div class="takeaway-text-v64">
                                "Muốn biến một đối thủ thành đồng minh? Hãy khéo léo nhờ họ giúp đỡ một việc nhỏ nhé!"
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
        if (slideId === 'slide_memo64_1') {
            const hand = canvas.querySelector('.help-hand-v64');
            const heart = canvas.querySelector('.heart-pulse-v64');
            if (hand && heart) {
                if (progress > 0.45) {
                    hand.style.transform = 'scale(0.8)';
                    heart.style.transform = 'scale(1.5)';
                    heart.style.filter = 'drop-shadow(0 0 25px var(--memo64-primary))';
                } else {
                    hand.style.transform = 'scale(1)';
                    heart.style.transform = 'scale(0.8)';
                    heart.style.filter = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo64_2') {
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
        else if (slideId === 'slide_memo64_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const book = canvas.querySelector('.book-actor');
            const react = canvas.querySelector('.favor-reaction');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: CHƯA GIÚP ĐỠ';
                if (book) { book.style.transform = 'translateX(-30px)'; book.style.opacity = '0.2'; }
                if (react) react.textContent = '😐 (Ghét nhẹ)';
                if (lbl) lbl.textContent = 'Cảm xúc: Thiện cảm chỉ 20%';
                if (statusTag) {
                    statusTag.textContent = 'Thiện cảm: 20% (Lạnh nhạt)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: ĐÃ CHO MƯỢN SÁCH 🤝';
                if (book) {
                    book.style.transform = 'translateX(20px) rotate(15deg)';
                    book.style.opacity = '1';
                }
                if (react) react.textContent = '🥰 (Yêu mến)';
                if (lbl) lbl.textContent = 'Cảm xúc: Thiện cảm tăng lên 80% để giải quyết mâu thuẫn!';
                if (statusTag) {
                    statusTag.textContent = 'Thiện cảm: 80% (Gắn kết)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo64_4') {
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
        else if (slideId === 'slide_memo64_5') {
            const box = canvas.querySelector('.takeaway-box-v64');
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
        scriptName: 'video64',
        topic: 'Ben Franklin Effect',
        episodeNum: 64,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 64 Plugin] Loaded: Hiệu ứng Franklin.');
})();
