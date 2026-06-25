/**
 * DOM Memo Video 42: Ảo giác Pareidolia (Pareidolia Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo42_1": [
                {
                        "text": "nhìn vào ổ cắm điện thấy đang ngạc nhiên",
                        "start": 1.0,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "não tưởng tượng kỳ lạ",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo42_2": [
                {
                        "text": "Vùng nhận diện mặt Fusiform",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                },
                {
                        "text": "bảo vệ sinh tồn",
                        "start": 6.5,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo42_3": [
                {
                        "text": "kết cấu 3 chấm song song",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "tự động vẽ các đường nối",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo42_4": [
                {
                        "text": "bảo vệ tổ tiên khỏi thú dữ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "nguy hiểm chết người",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo42_5": [
                {
                        "text": "cái giá vô cùng nhỏ để sống sót",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo42_1', 'slide_memo42_2', 'slide_memo42_3', 'slide_memo42_4', 'slide_memo42_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo42_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo42-1-container">
                        <span class="ambient-sleep-particle-v42" style="top: 15%; left: 8%; animation-delay: -1s;">😮</span>
                        <span class="ambient-sleep-particle-v42" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v42" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="wall-socket-v42">😮</div>
                <div class="detection-mesh-v42"></div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo42_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo42-2-container">
                        <span class="ambient-sleep-particle-v42" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v42" style="top: 82%; left: 10%; animation-delay: -4s;">😮</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v42 node-1">
                                <span class="diagram-node-icon">😮</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v42 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v42 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác Pareidolia*: Hiện tượng này gọi là Pareidolia. Bộ não có một khu vực riêng biệt gọi là Vùng nhận diện mặt Fusiform để quét tìm gương mặt tốc độ cao nhằm bảo vệ sinh tồn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo42_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo42-3-container">
                        <span class="ambient-sleep-particle-v42" style="top: 10%; left: 15%; animation-delay: -1s;">😮</span>
                        <span class="ambient-sleep-particle-v42" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v42">
                <div class="state-indicator-badge rested">BỘ QUÉT HÌNH DÁNG (FFA)</div>
                <div class="socket-scene">
                    <span class="socket-eye-l">⚫</span>
                    <span class="socket-eye-r">⚫</span>
                    <span class="socket-mouth">🕳️</span>
                </div>
                <div class="interpretation-lbl">Vật thể: Ổ điện tường</div>
            </div>
            <div class="amygdala-dashboard-v42">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    NHẬN DIỆN MẶT
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Khớp Face Model</span>
                    <span class="amygdala-status-badge calm">Thấp (2%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Vùng Fusiform Face Area phản ứng với cấu trúc mặt chỉ trong 130 phần nghìn giây, nhanh hơn cả ý thức.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo42_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo42-4-container">
                        <span class="ambient-sleep-particle-v42" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v42" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v42">
                            <div class="comp-card-v42 card-left card-active">
                                <div class="comp-header-v42">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v42">😮</div>
                                </div>
                                <div class="comp-bullet-list-v42">
                                    <div class="comp-bullet-row-v42" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v42">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v42" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v42">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v42">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v42 card-right card-inactive">
                                <div class="comp-header-v42">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v42">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v42">
                                    <div class="comp-bullet-row-v42" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v42">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v42" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v42">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v42">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo42_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo42-5-container">
                        <div class="takeaway-radar-v42"></div>
                        <div class="takeaway-box-v42" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v42">😮</div>
                            <div class="takeaway-text-v42">
                                "Nhìn nhầm ổ điện là cái giá vô cùng nhỏ để tổ tiên chúng ta sống sót và truyền lại bộ não nhạy bén này cho bạn!"
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
        if (slideId === 'slide_memo42_1') {
            const mesh = canvas.querySelector('.detection-mesh-v42');
            const socket = canvas.querySelector('.wall-socket-v42');
            if (mesh && socket) {
                if (progress > 0.45) {
                    mesh.style.opacity = '0.7';
                    mesh.style.transform = 'scale(1.5)';
                    socket.style.transform = 'scale(1.3) rotate(5deg)';
                } else {
                    mesh.style.opacity = '0';
                    mesh.style.transform = 'scale(0.8)';
                    socket.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_memo42_2') {
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
        else if (slideId === 'slide_memo42_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const eyeL = canvas.querySelector('.socket-eye-l');
            const eyeR = canvas.querySelector('.socket-eye-r');
            const mouth = canvas.querySelector('.socket-mouth');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'VẬT THỂ VẬT LÝ';
                if (eyeL) eyeL.style.color = '#333';
                if (eyeR) eyeR.style.color = '#333';
                if (mouth) mouth.textContent = '🕳️';
                if (lbl) lbl.textContent = 'Đánh giá: Ổ điện cắm chấu';
                if (statusTag) {
                    statusTag.textContent = 'Mức khớp: 2%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'ẢO GIÁC THỊ GIÁC!';
                if (eyeL) eyeL.style.color = '#eab308';
                if (eyeR) eyeR.style.color = '#eab308';
                if (mouth) {
                    mouth.textContent = '😮';
                    mouth.style.transform = 'scale(1.2)';
                }
                if (lbl) lbl.textContent = 'Đánh giá: Gương mặt kinh ngạc! 😮';
                if (statusTag) {
                    statusTag.textContent = 'Mức khớp: 98% (MẶT)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo42_4') {
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
        else if (slideId === 'slide_memo42_5') {
            const box = canvas.querySelector('.takeaway-box-v42');
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
        scriptName: 'video42',
        topic: 'Pareidolia Effect',
        episodeNum: 42,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 42 Plugin] Loaded: Ảo giác Pareidolia.');
})();
