/**
 * DOM Memo Video 31: Nhìn lâu hóa lạ (Semantic Satiation)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo31_1": [
                {
                        "text": "nhìn chằm chằm một từ quen thuộc",
                        "start": 1.0,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "bỗng lạ hẳn",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo31_2": [
                {
                        "text": "Nhìn Lâu Hóa Lạ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "neuron nhận diện ý nghĩa bị mệt mỏi",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo31_3": [
                {
                        "text": "liên kết ngay với kho ngữ nghĩa",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "đường truyền ngôn ngữ bị quá tải",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo31_4": [
                {
                        "text": "tốn cực ít điện thần kinh",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bẻ gãy mối nối ngôn ngữ",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo31_5": [
                {
                        "text": "biến những điều quen thuộc thành xa lạ",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo31_1', 'slide_memo31_2', 'slide_memo31_3', 'slide_memo31_4', 'slide_memo31_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo31_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo31-1-container">
                        <span class="ambient-sleep-particle-v31" style="top: 15%; left: 8%; animation-delay: -1s;">🤔</span>
                        <span class="ambient-sleep-particle-v31" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v31" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="word-split-v31">XIN CHÀO</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo31_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo31-2-container">
                        <span class="ambient-sleep-particle-v31" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v31" style="top: 82%; left: 10%; animation-delay: -4s;">🤔</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v31 node-1">
                                <span class="diagram-node-icon">📝</span>
                                <span>1. Lặp từ liên tục</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v31 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Trơ cảm giác nơ-ron</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v31 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Mất ý nghĩa tạm thời</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nhìn lâu hóa lạ*: Hiện tượng này gọi là Nhìn Lâu Hóa Lạ. Sự kích thích lặp đi lặp lại khiến các neuron nhận diện ý nghĩa từ bị mệt mỏi tạm thời, làm mất đi sự quen thuộc.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo31_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo31-3-container">
                        <span class="ambient-sleep-particle-v31" style="top: 10%; left: 15%; animation-delay: -1s;">🤔</span>
                        <span class="ambient-sleep-particle-v31" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v31">
                <div class="state-indicator-badge rested">LIÊN KẾT TỪ VỰNG</div>
                <div class="word-display">NHÀ</div>
                <div class="interpretation-lbl">Ý nghĩa: Nơi ấm áp để về</div>
            </div>
            <div class="amygdala-dashboard-v31">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    NHẬN DIỆN NGỮ NGHĨA
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Kết nối từ - nghĩa</span>
                    <span class="amygdala-status-badge calm">ỔN ĐỊNH (100%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự bão hòa ngôn ngữ (Semantic Satiation) xảy ra do sự trơ hóa của các thụ thể thần kinh đối với kích thích lặp lại.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo31_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo31-4-container">
                        <span class="ambient-sleep-particle-v31" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v31" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v31">
                            <div class="comp-card-v31 card-left card-active">
                                <div class="comp-header-v31">
                                    <h3>Đọc Bình Thường</h3>
                                    <div class="comp-icon-v31">📝</div>
                                </div>
                                <div class="comp-bullet-list-v31">
                                    <div class="comp-bullet-row-v31" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v31">✨</span>
                                        <span>Kết nối âm thanh - ý nghĩa</span>
                                    </div>
                                    <div class="comp-bullet-row-v31" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v31">✨</span>
                                        <span>Xử lý nhanh chóng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v31">BÌNH THƯỜNG</div>
                            </div>

                            <div class="comp-card-v31 card-right card-inactive">
                                <div class="comp-header-v31">
                                    <h3>Nhìn Lâu Hóa Lạ</h3>
                                    <div class="comp-icon-v31">🌫️</div>
                                </div>
                                <div class="comp-bullet-list-v31">
                                    <div class="comp-bullet-row-v31" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v31">❌</span>
                                        <span>Tạm thời trơ kết nối từ</span>
                                    </div>
                                    <div class="comp-bullet-row-v31" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v31">❌</span>
                                        <span>Chữ trông như nét vẽ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v31">TRƠ CẢM GIÁC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo31_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo31-5-container">
                        <div class="takeaway-radar-v31"></div>
                        <div class="takeaway-box-v31" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v31">🤔</div>
                            <div class="takeaway-text-v31">
                                "Bộ não đôi khi có thể biến những điều quen thuộc nhất trở nên xa lạ để duy trì tính chọn lọc của thông tin nhận thức!"
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
        if (slideId === 'slide_memo31_1') {
            const word = canvas.querySelector('.word-split-v31');
            if (word) {
                if (progress > 0.45) {
                    word.textContent = 'X I N C H À O ?';
                    word.style.letterSpacing = '6px';
                    word.style.color = 'var(--memo31-purple)';
                } else {
                    word.textContent = 'XIN CHÀO';
                    word.style.letterSpacing = 'normal';
                    word.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo31_2') {
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
        else if (slideId === 'slide_memo31_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const word = canvas.querySelector('.word-display');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BỘ NÃO: MỚI ĐỌC CHỮ';
                if (word) { word.textContent = 'NHÀ'; word.style.letterSpacing = 'normal'; word.style.color = '#fff'; }
                if (lbl) lbl.textContent = 'Ý nghĩa: Tổ ấm, nơi che mưa nắng 🏠';
                if (statusTag) {
                    statusTag.textContent = 'Kết nối nghĩa: 100%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BỘ NÃO: QUÁ TẢI (SAU 1 PHÚT)';
                if (word) {
                    word.textContent = 'N  H  À  ?';
                    word.style.letterSpacing = '10px';
                    word.style.color = '#a855f7';
                }
                if (lbl) lbl.textContent = 'Ý nghĩa: Không xác định ❓ (Chỉ là nét vẽ kì lạ)';
                if (statusTag) {
                    statusTag.textContent = 'Kết nối nghĩa: 0% (Bị đứt)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo31_4') {
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
        else if (slideId === 'slide_memo31_5') {
            const box = canvas.querySelector('.takeaway-box-v31');
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
        scriptName: 'video31',
        topic: 'Semantic Satiation',
        episodeNum: 31,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 31 Plugin] Loaded: Nhìn lâu hóa lạ.');
})();
