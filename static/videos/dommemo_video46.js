/**
 * DOM Memo Video 46: Hiệu ứng Neo (Anchoring Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo46_1": [
                {
                        "text": "giá gốc 5 triệu",
                        "start": 3.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "giảm xuống còn 1 triệu",
                        "start": 6.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo46_2": [
                {
                        "text": "Hiệu ứng Neo quyết định",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "điểm tham chiếu chính",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo46_3": [
                {
                        "text": "mỏ neo '5 triệu' thả xuống",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "trở nên vô cùng hấp dẫn",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo46_4": [
                {
                        "text": "đánh giá giá trị khách quan",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bị bóp méo nhận thức",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo46_5": [
                {
                        "text": "bảng giá gốc đắt đỏ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "khóa chặt ví tiền",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo46_1', 'slide_memo46_2', 'slide_memo46_3', 'slide_memo46_4', 'slide_memo46_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo46_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo46-1-container">
                        <span class="ambient-sleep-particle-v46" style="top: 15%; left: 8%; animation-delay: -1s;">⚓</span>
                        <span class="ambient-sleep-particle-v46" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v46" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="falling-anchor-v46">⚓</div>
                <div class="price-tag-large-v46">5.000.000đ</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo46_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo46-2-container">
                        <span class="ambient-sleep-particle-v46" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v46" style="top: 82%; left: 10%; animation-delay: -4s;">⚓</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v46 node-1">
                                <span class="diagram-node-icon">⚓</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v46 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v46 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Neo*: Đó là do Hiệu ứng Neo quyết định. Bộ não của bạn tự động lấy con số đầu tiên nhìn thấy làm điểm tham chiếu chính, từ đó định giá tất cả các lựa chọn phía sau.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo46_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo46-3-container">
                        <span class="ambient-sleep-particle-v46" style="top: 10%; left: 15%; animation-delay: -1s;">⚓</span>
                        <span class="ambient-sleep-particle-v46" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v46">
                <div class="state-indicator-badge rested">HỆ THỐNG ĐỊNH GIÁ</div>
                <div class="anchor-stage">
                    <span class="anchor-icon">⚓</span>
                    <span class="price-tag-v46">5.000.000đ</span>
                </div>
                <div class="interpretation-lbl">Nhận thức: Giá gốc chiếc áo</div>
            </div>
            <div class="amygdala-dashboard-v46">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐIỂM NEO NĂNG LƯỢNG
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Độ hài lòng mua</span>
                    <span class="amygdala-status-badge calm">THẤP (10%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Khi bị neo bởi một giá trị cực cao, mọi so sánh giảm giá bên dưới đều mang lại cảm giác tiết kiệm tài chính giả tạo.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo46_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo46-4-container">
                        <span class="ambient-sleep-particle-v46" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v46" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v46">
                            <div class="comp-card-v46 card-left card-active">
                                <div class="comp-header-v46">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v46">⚓</div>
                                </div>
                                <div class="comp-bullet-list-v46">
                                    <div class="comp-bullet-row-v46" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v46">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v46" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v46">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v46">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v46 card-right card-inactive">
                                <div class="comp-header-v46">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v46">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v46">
                                    <div class="comp-bullet-row-v46" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v46">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v46" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v46">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v46">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo46_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo46-5-container">
                        <div class="takeaway-radar-v46"></div>
                        <div class="takeaway-box-v46" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v46">⚓</div>
                            <div class="takeaway-text-v46">
                                "Hãy cẩn thận với những bảng giá gốc đắt đỏ. Đó chỉ là những chiếc neo tinh vi được thả xuống để khóa chặt ví tiền của bạn!"
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
        if (slideId === 'slide_memo46_1') {
            const anchor = canvas.querySelector('.falling-anchor-v46');
            const price = canvas.querySelector('.price-tag-large-v46');
            if (anchor && price) {
                if (progress > 0.45) {
                    anchor.style.transform = 'translateY(100px) rotate(20deg)';
                    price.textContent = '1.000.000đ! 🏷️';
                    price.style.color = 'var(--memo46-secondary)';
                } else {
                    anchor.style.transform = 'translateY(0) rotate(0deg)';
                    price.textContent = '5.000.000đ';
                    price.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo46_2') {
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
        else if (slideId === 'slide_memo46_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const anchor = canvas.querySelector('.anchor-icon');
            const price = canvas.querySelector('.price-tag-v46');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: KHÔNG NEO GIÁ';
                if (anchor) { anchor.style.transform = 'translateY(-30px)'; anchor.style.opacity = '0.2'; }
                if (price) { price.textContent = '1.000.000đ'; price.style.color = '#fff'; }
                if (lbl) lbl.textContent = 'Đánh giá: 1 triệu đồng là mức giá bình thường';
                if (statusTag) {
                    statusTag.textContent = 'Độ hời: 10% (Trung tính)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: ĐÃ BỊ NEO GIÁ!';
                if (anchor) {
                    anchor.style.transform = 'translateY(10px) rotate(15deg)';
                    anchor.style.opacity = '1';
                }
                if (price) {
                    price.textContent = '1.000.000đ (Gốc 5M ❌)';
                    price.style.color = '#ef4444';
                }
                if (lbl) lbl.textContent = 'Đánh giá: Rẻ gấp 5 lần! (Phải mua ngay)';
                if (statusTag) {
                    statusTag.textContent = 'Độ hời: 95% (Cực rẻ)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo46_4') {
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
        else if (slideId === 'slide_memo46_5') {
            const box = canvas.querySelector('.takeaway-box-v46');
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
        scriptName: 'video46',
        topic: 'Anchoring Effect',
        episodeNum: 46,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 46 Plugin] Loaded: Hiệu ứng Neo.');
})();
