/**
 * DOM Memo Video 44: Ảo giác Déjà Vu (Déjà Vu Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo44_1": [
                {
                        "text": "cảm giác cực kỳ quen thuộc",
                        "start": 3.5,
                        "end": 6.5,
                        "class": "active-green"
                },
                {
                        "text": "từng ngồi đúng góc này",
                        "start": 7.0,
                        "end": 10.0,
                        "class": "active-green"
                }
        ],
        "slide_memo44_2": [
                {
                        "text": "trễ nhịp truyền dẫn giữa hai bán cầu",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "tưởng đó là ký ức cũ",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo44_3": [
                {
                        "text": "tín hiệu mắt trái đến trước",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "mắt phải đến sau",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                },
                {
                        "text": "phân loại là thông tin đã nhớ lại",
                        "start": 8.5,
                        "end": 12.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo44_4": [
                {
                        "text": "hợp nhất đồng thời ở thời hiện tại",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "biến hiện tại thành quá khứ giả tạo",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo44_5": [
                {
                        "text": "cú vấp nhẹ của hệ thống đồng bộ",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo44_1', 'slide_memo44_2', 'slide_memo44_3', 'slide_memo44_4', 'slide_memo44_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo44_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo44-1-container">
                        <span class="ambient-sleep-particle-v44" style="top: 15%; left: 8%; animation-delay: -1s;">🌀</span>
                        <span class="ambient-sleep-particle-v44" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v44" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="portal-actor-v44">🌀</div>
                <div class="clock-overlap-v44">🕐 🕐</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo44_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo44-2-container">
                        <span class="ambient-sleep-particle-v44" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v44" style="top: 82%; left: 10%; animation-delay: -4s;">🌀</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v44 node-1">
                                <span class="diagram-node-icon">🌀</span>
                                <span>1. Cảnh tượng mới tinh</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v44 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Đi tắt vào trí nhớ dài hạn</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v44 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Ảo giác đã từng nhìn thấy</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác Déjà Vu*: Nguyên nhân có thể do sự trễ nhịp truyền dẫn giữa hai bán cầu não. Tín hiệu từ một mắt truyền chậm hơn mắt kia một phần triệu giây, khiến não tưởng đó là ký ức cũ.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo44_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo44-3-container">
                        <span class="ambient-sleep-particle-v44" style="top: 10%; left: 15%; animation-delay: -1s;">🌀</span>
                        <span class="ambient-sleep-particle-v44" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v44">
                <div class="state-indicator-badge rested">ĐỒNG BỘ HÓA TÍN HIỆU</div>
                <div class="split-clocks">
                    <span class="clock-l">🕐</span>
                    <span class="clock-r">🕐</span>
                </div>
                <div class="interpretation-lbl">Trễ nhịp: 0.00 giây</div>
            </div>
            <div class="amygdala-dashboard-v44">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ TRỄ TRUYỀN DẪN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Phân loại ký ức</span>
                    <span class="amygdala-status-badge calm">HIỆN TẠI (0ms)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự sai lệch cực nhỏ trong tốc độ truyền thông tin qua cầu não có thể tạo ra cảm nhận giả về thời gian.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo44_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo44-4-container">
                        <span class="ambient-sleep-particle-v44" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v44" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v44">
                            <div class="comp-card-v44 card-left card-active">
                                <div class="comp-header-v44">
                                    <h3>Đường Truyền Chuẩn</h3>
                                    <div class="comp-icon-v44">📥</div>
                                </div>
                                <div class="comp-bullet-list-v44">
                                    <div class="comp-bullet-row-v44" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v44">✨</span>
                                        <span>Đi vào trí nhớ ngắn hạn trước</span>
                                    </div>
                                    <div class="comp-bullet-row-v44" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v44">✨</span>
                                        <span>Não biết rõ đây là cảnh mới</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v44">BÌNH THƯỜNG</div>
                            </div>

                            <div class="comp-card-v44 card-right card-inactive">
                                <div class="comp-header-v44">
                                    <h3>Đường Tắt Trí Nhớ</h3>
                                    <div class="comp-icon-v44">🌀</div>
                                </div>
                                <div class="comp-bullet-list-v44">
                                    <div class="comp-bullet-row-v44" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v44">❌</span>
                                        <span>Ghi đè thẳng vào vùng nhớ cũ</span>
                                    </div>
                                    <div class="comp-bullet-row-v44" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v44">❌</span>
                                        <span>Lừa não bộ đây là quá khứ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v44">ẢO GIÁC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo44_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo44-5-container">
                        <div class="takeaway-radar-v44"></div>
                        <div class="takeaway-box-v44" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v44">🌀</div>
                            <div class="takeaway-text-v44">
                                "Không có gì huyền bí, Déjà Vu chỉ là một cú vấp nhẹ của hệ thống đồng bộ hóa hình ảnh trong não bộ của bạn mà thôi!"
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
        if (slideId === 'slide_memo44_1') {
            const portal = canvas.querySelector('.portal-actor-v44');
            const clocks = canvas.querySelector('.clock-overlap-v44');
            if (portal && clocks) {
                if (progress > 0.45) {
                    portal.style.transform = 'scale(1.4) rotate(' + (progress * 720) + 'deg)';
                    clocks.style.transform = 'scale(1.4) translateY(-10px)';
                    clocks.style.color = 'var(--memo44-secondary)';
                } else {
                    portal.style.transform = 'scale(1) rotate(0deg)';
                    clocks.style.transform = 'scale(1) translateY(0)';
                    clocks.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo44_2') {
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
        else if (slideId === 'slide_memo44_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const clockL = canvas.querySelector('.clock-l');
            const clockR = canvas.querySelector('.clock-r');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: ĐỒNG BỘ ĐỒNG THỜI';
                if (clockL) clockL.style.transform = 'none';
                if (clockR) clockR.style.transform = 'none';
                if (lbl) lbl.textContent = 'Đồng bộ: 2 bán cầu nhận cùng lúc';
                if (statusTag) {
                    statusTag.textContent = 'Hợp nhất: Hiện Tại (Safe)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: TRỄ NHỊP (DÉJÀ VU)';
                if (clockL) clockL.style.transform = 'translateX(-20px)';
                if (clockR) {
                    clockR.style.transform = 'translateX(20px) rotate(15deg)';
                    clockR.style.color = '#fbbf24';
                }
                if (lbl) lbl.textContent = 'Lệch pha! Mắt phải nhận trễ 1 micro giây';
                if (statusTag) {
                    statusTag.textContent = 'Cảm nhận: Quá Khứ Giả Lập';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo44_4') {
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
        else if (slideId === 'slide_memo44_5') {
            const box = canvas.querySelector('.takeaway-box-v44');
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
        scriptName: 'video44',
        topic: 'Déjà Vu Effect',
        episodeNum: 44,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 44 Plugin] Loaded: Ảo giác Déjà Vu.');
})();
