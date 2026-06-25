/**
 * DOM Memo Video 63: Hiệu ứng Stroop (Stroop Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo63_1": [
                {
                        "text": "chữ 'ĐỎ' được in mực màu xanh",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-violet"
                },
                {
                        "text": "vấp váp và mất nhiều thời gian",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo63_2": [
                {
                        "text": "Hiệu ứng Stroop",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "xung đột giữa đọc tự động và nhận diện thủ công",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo63_3": [
                {
                        "text": "từ và màu mực trùng nhau",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "đồng hồ đo độ trễ vọt lên",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo63_4": [
                {
                        "text": "từ ngữ và thị giác hỗ trợ nhau",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "ức chế từ đọc tự động",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo63_5": [
                {
                        "text": "tự động hóa ngôn ngữ mạnh mẽ",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo63_1', 'slide_memo63_2', 'slide_memo63_3', 'slide_memo63_4', 'slide_memo63_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo63_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo63-1-container">
                        <span class="ambient-sleep-particle-v63" style="top: 15%; left: 8%; animation-delay: -1s;">🎨</span>
                        <span class="ambient-sleep-particle-v63" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v63" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="color-palette-v63">🎨</div>
                <div class="confused-word-v63" style="color: #ef4444;">XANH LÁ</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo63_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo63-2-container">
                        <span class="ambient-sleep-particle-v63" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v63" style="top: 82%; left: 10%; animation-delay: -4s;">🎨</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v63 node-1">
                                <span class="diagram-node-icon">🎨</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v63 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v63 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Stroop*: Đó chính là Hiệu ứng Stroop. Sự xung đột giữa chức năng đọc hiểu chữ tự động và việc nhận diện màu sắc thủ công gây ra sự tranh chấp tài nguyên xử lý trong vỏ não trán.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo63_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo63-3-container">
                        <span class="ambient-sleep-particle-v63" style="top: 10%; left: 15%; animation-delay: -1s;">🎨</span>
                        <span class="ambient-sleep-particle-v63" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v63">
                <div class="state-indicator-badge rested">ĐO ĐỘ TRỄ PHẢN XẠ (STROOP METER)</div>
                <div class="stroop-word">ĐỎ</div>
                <div class="interpretation-lbl">Màu mực: Đỏ (Khớp)</div>
            </div>
            <div class="amygdala-dashboard-v63">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ TRỄ PHẢN ỨNG
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Thời gian xử lý</span>
                    <span class="amygdala-status-badge calm">0.5 Giây (SIÊU NHANH)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Việc đọc chữ là phản xạ tự động hóa cao độ của người lớn, khó có thể tự tắt đi bằng ý chí.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo63_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo63-4-container">
                        <span class="ambient-sleep-particle-v63" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v63" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v63">
                            <div class="comp-card-v63 card-left card-active">
                                <div class="comp-header-v63">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v63">🎨</div>
                                </div>
                                <div class="comp-bullet-list-v63">
                                    <div class="comp-bullet-row-v63" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v63">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v63" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v63">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v63">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v63 card-right card-inactive">
                                <div class="comp-header-v63">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v63">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v63">
                                    <div class="comp-bullet-row-v63" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v63">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v63" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v63">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v63">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo63_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo63-5-container">
                        <div class="takeaway-radar-v63"></div>
                        <div class="takeaway-box-v63" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v63">🎨</div>
                            <div class="takeaway-text-v63">
                                "Sự xung đột nhận thức chứng minh rằng việc tự động hóa ngôn ngữ của bộ não mạnh mẽ hơn chúng ta tưởng rất nhiều!"
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
        if (slideId === 'slide_memo63_1') {
            const palette = canvas.querySelector('.color-palette-v63');
            const word = canvas.querySelector('.confused-word-v63');
            if (palette && word) {
                if (progress > 0.45) {
                    palette.style.transform = 'scale(1.3) rotate(30deg)';
                    word.style.color = 'var(--memo63-primary)';
                    word.textContent = 'ĐỎ (Mực Xanh)';
                } else {
                    palette.style.transform = 'scale(1) rotate(0deg)';
                    word.style.color = '#ef4444';
                    word.textContent = 'XANH LÁ';
                }
            }
        }
        else if (slideId === 'slide_memo63_2') {
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
        else if (slideId === 'slide_memo63_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const word = canvas.querySelector('.stroop-word');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: KHỚP MÀU CHỮ';
                if (word) { word.textContent = 'ĐỎ'; word.style.color = '#ef4444'; }
                if (lbl) lbl.textContent = 'Yêu cầu: Nêu màu mực ➡️ ĐỎ (Khớp 0.5s)';
                if (statusTag) {
                    statusTag.textContent = 'Phản xạ: 0.5s (Siêu nhanh)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: XUNG ĐỘT MÀU CHỮ';
                if (word) {
                    word.textContent = 'ĐỎ';
                    word.style.color = '#22c55e';
                }
                if (lbl) lbl.textContent = 'Yêu cầu: Nêu màu mực ➡️ XANH LÁ (Xung đột 1.8s)';
                if (statusTag) {
                    statusTag.textContent = 'Phản xạ: 1.8s (Lag nhận thức)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo63_4') {
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
        else if (slideId === 'slide_memo63_5') {
            const box = canvas.querySelector('.takeaway-box-v63');
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
        scriptName: 'video63',
        topic: 'Stroop Effect',
        episodeNum: 63,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 63 Plugin] Loaded: Hiệu ứng Stroop.');
})();
