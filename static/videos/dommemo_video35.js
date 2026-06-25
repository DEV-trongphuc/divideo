/**
 * DOM Memo Video 35: Tay nhớ mật khẩu (Muscle Memory)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo35_1": [
                {
                        "text": "ngón tay lại tự gõ mật khẩu cũ",
                        "start": 3.0,
                        "end": 6.5,
                        "class": "active-violet"
                },
                {
                        "text": "nhớ trước cả khi bạn kịp nghĩ",
                        "start": 7.0,
                        "end": 10.0,
                        "class": "active-green"
                }
        ],
        "slide_memo35_2": [
                {
                        "text": "lưu tại Hạch nền",
                        "start": 2.5,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "trí nhớ cơ bắp",
                        "start": 5.5,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo35_3": [
                {
                        "text": "đường truyền thói quen cũ chạy cực nhanh",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                },
                {
                        "text": "hoạt động chậm chạp",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo35_4": [
                {
                        "text": "tay tự gõ tức thì",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "đòi hỏi sự tập trung cao độ",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo35_5": [
                {
                        "text": "tiết kiệm calo tối đa",
                        "start": 3.0,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo35_1', 'slide_memo35_2', 'slide_memo35_3', 'slide_memo35_4', 'slide_memo35_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo35_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo35-1-container">
                        <span class="ambient-sleep-particle-v35" style="top: 15%; left: 8%; animation-delay: -1s;">⌨️</span>
                        <span class="ambient-sleep-particle-v35" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v35" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="keyboard-actor-v35">⌨️</div>
                <div class="password-stars-v35">••••••</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo35_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo35-2-container">
                        <span class="ambient-sleep-particle-v35" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v35" style="top: 82%; left: 10%; animation-delay: -4s;">⌨️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v35 node-1">
                                <span class="diagram-node-icon">⌨️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v35 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v35 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Tay nhớ mật khẩu*: Đó là vì phản xạ tự động hóa được lưu tại Hạch nền. Khi hành động được gõ quá nhiều lần, nó trở thành trí nhớ cơ bắp giúp tiết kiệm năng lượng cho vỏ não trán.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo35_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo35-3-container">
                        <span class="ambient-sleep-particle-v35" style="top: 10%; left: 15%; animation-delay: -1s;">⌨️</span>
                        <span class="ambient-sleep-particle-v35" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v35">
                <div class="state-indicator-badge rested">TRUY XUẤT MẬT KHẨU</div>
                <div class="typing-keypad">
                    <span class="key k1">Q</span>
                    <span class="key k2">W</span>
                    <span class="key k3">E</span>
                </div>
                <div class="interpretation-lbl">Hành động: Đang gõ...</div>
            </div>
            <div class="amygdala-dashboard-v35">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐƯỜNG MÒN THẦN KINH
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Loại phản xạ</span>
                    <span class="amygdala-status-badge calm">Tự động (95%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Phản xạ vận động lặp đi lặp lại tạo ra sự myelin hóa cực mạnh quanh sợi thần kinh, cho phép truyền xung cực nhanh.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo35_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo35-4-container">
                        <span class="ambient-sleep-particle-v35" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v35" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v35">
                            <div class="comp-card-v35 card-left card-active">
                                <div class="comp-header-v35">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v35">⌨️</div>
                                </div>
                                <div class="comp-bullet-list-v35">
                                    <div class="comp-bullet-row-v35" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v35">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v35" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v35">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v35">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v35 card-right card-inactive">
                                <div class="comp-header-v35">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v35">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v35">
                                    <div class="comp-bullet-row-v35" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v35">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v35" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v35">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v35">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo35_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo35-5-container">
                        <div class="takeaway-radar-v35"></div>
                        <div class="takeaway-box-v35" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v35">⌨️</div>
                            <div class="takeaway-text-v35">
                                "Không phải bạn ngốc, mà là bộ não đang ưu tiên sử dụng đường mòn thói quen cũ để tiết kiệm calo tối đa!"
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
        if (slideId === 'slide_memo35_1') {
            const kb = canvas.querySelector('.keyboard-actor-v35');
            const stars = canvas.querySelector('.password-stars-v35');
            if (kb && stars) {
                if (progress > 0.45) {
                    kb.style.transform = 'scale(1.3) rotate(5deg)';
                    stars.textContent = 'OLD_PASS ❌';
                    stars.style.color = 'var(--memo35-secondary)';
                } else {
                    kb.style.transform = 'scale(1) rotate(0deg)';
                    stars.textContent = '••••••';
                    stars.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo35_2') {
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
        else if (slideId === 'slide_memo35_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const keys = canvas.querySelectorAll('.key');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: PHẢN XẠ CƠ BẮP';
                keys.forEach((k, idx) => {
                    k.style.background = (idx === Math.floor(progress * 10) % 3) ? '#10b981' : 'rgba(255,255,255,0.05)';
                });
                if (lbl) lbl.textContent = 'Ngón tay tự gõ: 123456 (Mật khẩu cũ)';
                if (statusTag) {
                    statusTag.textContent = 'Hạch nền điều khiển: 95%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: VỎ NÃO NỖ LỰC';
                keys.forEach(k => k.style.background = 'rgba(255,255,255,0.05)');
                if (lbl) lbl.textContent = 'Ý thức suy nghĩ: ABCxyz... (Mật khẩu mới)';
                if (statusTag) {
                    statusTag.textContent = 'Vỏ não trán điều khiển: 15%';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo35_4') {
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
        else if (slideId === 'slide_memo35_5') {
            const box = canvas.querySelector('.takeaway-box-v35');
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
        scriptName: 'video35',
        topic: 'Muscle Memory',
        episodeNum: 35,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 35 Plugin] Loaded: Tay nhớ mật khẩu.');
})();
