/**
 * DOM Memo Video 36: Mắc kẹt đầu lưỡi (Tip of the Tongue)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo36_1": [
                {
                        "text": "mắc kẹt ngay đầu lưỡi",
                        "start": 4.5,
                        "end": 7.0,
                        "class": "active-violet"
                },
                {
                        "text": "càng cố nhớ lại càng bế tắc",
                        "start": 7.5,
                        "end": 10.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo36_2": [
                {
                        "text": "Mắc Kẹt Đầu Lưỡi",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "sự căng thẳng làm nhiễu loạn",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo36_3": [
                {
                        "text": "cánh cổng ký ức đóng sập",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "buông lỏng ý chí, tự do kết nối",
                        "start": 5.5,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo36_4": [
                {
                        "text": "cortisol phong tỏa liên kết",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "kích hoạt bộ nhớ vô thức",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo36_5": [
                {
                        "text": "tự động tìm thấy và trả kết quả",
                        "start": 3.0,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo36_1', 'slide_memo36_2', 'slide_memo36_3', 'slide_memo36_4', 'slide_memo36_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo36_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo36-1-container">
                        <span class="ambient-sleep-particle-v36" style="top: 15%; left: 8%; animation-delay: -1s;">👅</span>
                        <span class="ambient-sleep-particle-v36" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v36" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="mouth-trap-v36">👅</div>
                <div class="trapped-word-v36">?</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo36_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo36-2-container">
                        <span class="ambient-sleep-particle-v36" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v36" style="top: 82%; left: 10%; animation-delay: -4s;">👅</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v36 node-1">
                                <span class="diagram-node-icon">👅</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v36 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v36 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Mắc kẹt đầu lưỡi*: Hiện tượng này gọi là Mắc Kẹt Đầu Lưỡi. Càng cố ép bộ não, sự căng thẳng sẽ làm nhiễu loạn và chặn đứng đường truyền tín hiệu truy xuất thông tin trong vỏ não.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo36_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo36-3-container">
                        <span class="ambient-sleep-particle-v36" style="top: 10%; left: 15%; animation-delay: -1s;">👅</span>
                        <span class="ambient-sleep-particle-v36" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v36">
                <div class="state-indicator-badge rested">BỘ NHỚ TRUY XUẤT</div>
                <div class="tube-scene">
                    <div class="blocked-bubble">?</div>
                </div>
                <div class="interpretation-lbl">Càng cố: Càng nghẹt</div>
            </div>
            <div class="amygdala-dashboard-v36">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    CĂNG THẲNG TRUY TRUYỀN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Áp lực Cortisol</span>
                    <span class="amygdala-status-badge active-threat">CỰC CAO (90%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự tắc nghẽn xảy ra khi khái niệm ngữ nghĩa được kích hoạt nhưng âm vị tương ứng bị ức chế do sóng nhiễu.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo36_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo36-4-container">
                        <span class="ambient-sleep-particle-v36" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v36" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v36">
                            <div class="comp-card-v36 card-left card-active">
                                <div class="comp-header-v36">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v36">👅</div>
                                </div>
                                <div class="comp-bullet-list-v36">
                                    <div class="comp-bullet-row-v36" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v36">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v36" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v36">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v36">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v36 card-right card-inactive">
                                <div class="comp-header-v36">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v36">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v36">
                                    <div class="comp-bullet-row-v36" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v36">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v36" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v36">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v36">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo36_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo36-5-container">
                        <div class="takeaway-radar-v36"></div>
                        <div class="takeaway-box-v36" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v36">👅</div>
                            <div class="takeaway-text-v36">
                                "Khi quên tên ai đó, hãy tạm thời nghĩ sang chuyện khác. Bộ não sẽ tự động tìm thấy và trả kết quả khi bạn thoải mái nhất!"
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
        if (slideId === 'slide_memo36_1') {
            const word = canvas.querySelector('.trapped-word-v36');
            if (word) {
                if (progress > 0.45) {
                    word.style.transform = 'translateY(-120px) scale(1.6)';
                    word.textContent = 'MINH! ✨';
                    word.style.color = 'var(--memo36-primary)';
                } else {
                    word.style.transform = 'translateY(0) scale(1)';
                    word.textContent = '?';
                    word.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo36_2') {
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
        else if (slideId === 'slide_memo36_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const bubble = canvas.querySelector('.blocked-bubble');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: CỐ ÉP TRÍ NHỚ';
                if (bubble) {
                    bubble.textContent = '❓';
                    bubble.style.background = 'var(--memo36-secondary)';
                    bubble.style.transform = 'scale(' + (1 + progress * 0.5) + ')';
                    bubble.style.animation = 'bubble-vibrate 0.1s infinite';
                }
                if (lbl) lbl.textContent = 'Não bộ: Bị nghẽn đường truyền thông tin';
                if (statusTag) {
                    statusTag.textContent = 'Cortisol: 90% (Nghẽn)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: THƯ GIÃN BỎ QUA';
                if (bubble) {
                    bubble.textContent = '💡 MINH!';
                    bubble.style.background = 'var(--memo36-primary)';
                    bubble.style.transform = 'scale(1.2)';
                    bubble.style.animation = 'none';
                }
                if (lbl) lbl.textContent = 'Tự động trồi lên: Tên là MINH!';
                if (statusTag) {
                    statusTag.textContent = 'Cortisol: 10% (Thông suốt)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            }
        }
        else if (slideId === 'slide_memo36_4') {
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
        else if (slideId === 'slide_memo36_5') {
            const box = canvas.querySelector('.takeaway-box-v36');
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
        scriptName: 'video36',
        topic: 'Tip of the Tongue',
        episodeNum: 36,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 36 Plugin] Loaded: Mắc kẹt đầu lưỡi.');
})();
