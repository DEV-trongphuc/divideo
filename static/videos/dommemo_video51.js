/**
 * DOM Memo Video 51: Hiệu ứng Tần suất (Frequency Illusion)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo51_1": [
                {
                        "text": "vừa biết đến một từ mới",
                        "start": 1.0,
                        "end": 3.5,
                        "class": "active-green"
                },
                {
                        "text": "thấy nó xuất hiện khắp nơi",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo51_2": [
                {
                        "text": "Ảo ảnh Tần suất",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "quét tìm nó trong môi trường vô thức",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo51_3": [
                {
                        "text": "lướt qua mắt như tạp âm",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "bắt dính và rọi sáng",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo51_4": [
                {
                        "text": "bỏ qua 99% thông tin trung lập",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "chú ý chọn lọc",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo51_5": [
                {
                        "text": "bộ não đang bắt đầu chú ý",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo51_1', 'slide_memo51_2', 'slide_memo51_3', 'slide_memo51_4', 'slide_memo51_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo51_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo51-1-container">
                        <span class="ambient-sleep-particle-v51" style="top: 15%; left: 8%; animation-delay: -1s;">🔍</span>
                        <span class="ambient-sleep-particle-v51" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v51" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="eye-scanner-v51">🔍</div>
                <div class="target-car-v51">🚗</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo51_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo51-2-container">
                        <span class="ambient-sleep-particle-v51" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v51" style="top: 82%; left: 10%; animation-delay: -4s;">🔍</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v51 node-1">
                                <span class="diagram-node-icon">🔍</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v51 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v51 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Tần suất*: Đó gọi là Hiện tượng Baader-Meinhof hay Ảo ảnh Tần suất. Sau khi học từ mới, bộ não tự động đưa nó vào bộ nhớ đệm 'quan trọng' và tích cực quét tìm nó trong môi trường vô thức.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo51_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo51-3-container">
                        <span class="ambient-sleep-particle-v51" style="top: 10%; left: 15%; animation-delay: -1s;">🔍</span>
                        <span class="ambient-sleep-particle-v51" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v51">
                <div class="state-indicator-badge rested">BỘ LỌC CHÚ Ý CHỌN LỌC</div>
                <div class="street-grid">
                    <span class="street-item s-1">🚗 (Trắng)</span>
                    <span class="street-item s-target">🚗 (Đỏ)</span>
                    <span class="street-item s-3">🚗 (Đen)</span>
                </div>
                <div class="interpretation-lbl">Kết quả: Đi qua không để ý</div>
            </div>
            <div class="amygdala-dashboard-v51">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    QUÉT PHÁT HIỆN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Bộ nhớ hoạt động</span>
                    <span class="amygdala-status-badge calm">Tắt (0%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự ảo nhận xảy ra khi sự nhạy cảm nhận thức thay đổi, biến các kích thích quen thuộc thành tiêu điểm của ý thức.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo51_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo51-4-container">
                        <span class="ambient-sleep-particle-v51" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v51" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v51">
                            <div class="comp-card-v51 card-left card-active">
                                <div class="comp-header-v51">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v51">🔍</div>
                                </div>
                                <div class="comp-bullet-list-v51">
                                    <div class="comp-bullet-row-v51" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v51">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v51" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v51">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v51">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v51 card-right card-inactive">
                                <div class="comp-header-v51">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v51">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v51">
                                    <div class="comp-bullet-row-v51" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v51">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v51" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v51">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v51">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo51_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo51-5-container">
                        <div class="takeaway-radar-v51"></div>
                        <div class="takeaway-box-v51" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v51">🔍</div>
                            <div class="takeaway-text-v51">
                                "Sự thật là tần suất của vật thể không hề tăng lên. Chỉ là bộ não của bạn đang bắt đầu chú ý đến nó nhiều hơn mà thôi!"
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
        if (slideId === 'slide_memo51_1') {
            const scanner = canvas.querySelector('.eye-scanner-v51');
            const car = canvas.querySelector('.target-car-v51');
            if (scanner && car) {
                if (progress > 0.45) {
                    scanner.style.transform = 'scale(1.4) translate(40px, -20px)';
                    car.style.filter = 'drop-shadow(0 0 25px var(--memo51-primary))';
                    car.style.transform = 'scale(1.5)';
                } else {
                    scanner.style.transform = 'scale(1) translate(0, 0)';
                    car.style.filter = 'none';
                    car.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_memo51_2') {
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
        else if (slideId === 'slide_memo51_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const target = canvas.querySelector('.s-target');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'KHO TRÍ NHỚ: CHƯA QUAN TÂM';
                if (target) { target.style.color = '#fff'; target.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Bộ lọc: Coi xe đỏ như mọi xe khác';
                if (statusTag) {
                    statusTag.textContent = 'Độ quét xe đỏ: Tắt';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'KHO TRÍ NHỚ: ĐANG TÌM MUA XE ĐỎ!';
                if (target) {
                    target.style.color = '#eab308';
                    target.style.transform = 'scale(1.4)';
                    target.style.textShadow = '0 0 10px #eab308';
                }
                if (lbl) lbl.textContent = 'Bộ lọc: Phát hiện xe đỏ ngay lập tức! 🚗✨';
                if (statusTag) {
                    statusTag.textContent = 'Độ quét xe đỏ: BẬT (99%)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo51_4') {
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
        else if (slideId === 'slide_memo51_5') {
            const box = canvas.querySelector('.takeaway-box-v51');
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
        scriptName: 'video51',
        topic: 'Frequency Illusion',
        episodeNum: 51,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 51 Plugin] Loaded: Hiệu ứng Tần suất.');
})();
