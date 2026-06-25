/**
 * DOM Memo Video 29: Nước lạnh tỉnh táo (Cold Water Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo29_1": [
                {
                        "text": "rửa mặt bằng nước lạnh",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "tỉnh hẳn người",
                        "start": 4.8,
                        "end": 7.5,
                        "class": "active-green"
                }
        ],
        "slide_memo29_2": [
                {
                        "text": "dây thần kinh tam thoa",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "hệ lưới hoạt hóa ở thân não",
                        "start": 6.0,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo29_3": [
                {
                        "text": "nước đá lạnh",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "dòng điện thần kinh",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-violet"
                },
                {
                        "text": "reset trạng thái buồn ngủ",
                        "start": 8.0,
                        "end": 11.5,
                        "class": "active-green"
                }
        ],
        "slide_memo29_4": [
                {
                        "text": "giảm nhịp tim và hoạt động",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "co mạch máu, tăng tuần hoàn",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo29_5": [
                {
                        "text": "không phải hết buồn ngủ",
                        "start": 1.0,
                        "end": 3.8,
                        "class": "active-violet"
                },
                {
                        "text": "đánh thức nhẹ",
                        "start": 4.2,
                        "end": 7.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo29_1', 'slide_memo29_2', 'slide_memo29_3', 'slide_memo29_4', 'slide_memo29_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo29_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo29-1-container">
                        <span class="ambient-sleep-particle-v29" style="top: 15%; left: 8%; animation-delay: -1s;">💦</span>
                        <span class="ambient-sleep-particle-v29" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v29" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="water-droplets-v29">💦 🧊 💦</div>
                <div class="face-reboot-v29">😴</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo29_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo29-2-container">
                        <span class="ambient-sleep-particle-v29" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v29" style="top: 82%; left: 10%; animation-delay: -4s;">💦</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v29 node-1">
                                <span class="diagram-node-icon">❄️</span>
                                <span>1. Nước đá vào mặt</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v29 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Phản xạ lặn động vật</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v29 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Tim đập chậm, tỉnh táo</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nước lạnh tỉnh táo*: Sự thật là nước lạnh kích hoạt dây thần kinh tam thoa trên khuôn mặt, gửi tín hiệu kích thích đột ngột lên hệ lưới hoạt hóa ở thân não, buộc bạn phải tỉnh thức.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo29_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo29-3-container">
                        <span class="ambient-sleep-particle-v29" style="top: 10%; left: 15%; animation-delay: -1s;">💦</span>
                        <span class="ambient-sleep-particle-v29" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v29">
                <div class="state-indicator-badge rested">TRẠNG THÁI HỆ THẦN KINH</div>
                <div class="sleepy-face-avatar">😴</div>
                <div class="interpretation-lbl">Mức độ cảnh giác: 15%</div>
            </div>
            <div class="amygdala-dashboard-v29">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HOẠT HÓA THÂN NÃO
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Xung thần kinh</span>
                    <span class="amygdala-status-badge calm">Chậm (Sóng Theta)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự thay đổi nhiệt độ đột ngột trên da mặt kích thích cơ quan cảm thụ nhiệt truyền thông tin siêu tốc.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo29_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo29-4-container">
                        <span class="ambient-sleep-particle-v29" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v29" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v29">
                            <div class="comp-card-v29 card-left card-active">
                                <div class="comp-header-v29">
                                    <h3>Nhịp Tim Thường</h3>
                                    <div class="comp-icon-v29">🫀</div>
                                </div>
                                <div class="comp-bullet-list-v29">
                                    <div class="comp-bullet-row-v29" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v29">✨</span>
                                        <span>Đập 70-80 lần/phút</span>
                                    </div>
                                    <div class="comp-bullet-row-v29" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v29">✨</span>
                                        <span>Tiêu thụ oxy bình thường</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v29">BÌNH THƯỜNG</div>
                            </div>

                            <div class="comp-card-v29 card-right card-inactive">
                                <div class="comp-header-v29">
                                    <h3>Phản Xạ Lặn</h3>
                                    <div class="comp-icon-v29">❄️</div>
                                </div>
                                <div class="comp-bullet-list-v29">
                                    <div class="comp-bullet-row-v29" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v29">❌</span>
                                        <span>Nhịp tim giảm 10-25%</span>
                                    </div>
                                    <div class="comp-bullet-row-v29" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v29">❌</span>
                                        <span>Ưu tiên oxy nuôi não</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v29">TỐI ƯU</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo29_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo29-5-container">
                        <div class="takeaway-radar-v29"></div>
                        <div class="takeaway-box-v29" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v29">💦</div>
                            <div class="takeaway-text-v29">
                                "Không phải bạn hết buồn ngủ, chỉ là não bộ vừa nhận một tín hiệu đánh thức nhẹ. Hãy dùng nước lạnh để khởi động lại sự tập trung khi cần thiết!"
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
        if (slideId === 'slide_memo29_1') {
            const water = canvas.querySelector('.water-droplets-v29');
            const face = canvas.querySelector('.face-reboot-v29');
            if (water && face) {
                if (progress > 0.45) {
                    water.style.transform = 'translateY(120px) scale(1.5)';
                    water.style.opacity = '0';
                    face.textContent = '🤩';
                    face.style.transform = 'scale(1.5) rotate(10deg)';
                } else {
                    water.style.transform = 'translateY(0) scale(1)';
                    water.style.opacity = '1';
                    face.textContent = '😴';
                    face.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_memo29_2') {
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
        else if (slideId === 'slide_memo29_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const face = canvas.querySelector('.sleepy-face-avatar');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: BUỒN NGỦ';
                if (face) { face.textContent = '😴'; face.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Mức độ cảnh giác: 15% (Lờ đờ)';
                if (statusTag) {
                    statusTag.textContent = 'Xung nhịp: Thấp (Sóng Theta)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: RỬA NƯỚC LẠNH!';
                if (face) {
                    face.textContent = '🤩⚡';
                    face.style.transform = 'scale(1.3) rotate(' + (Math.sin(progress*30)*5) + 'deg)';
                }
                if (lbl) lbl.textContent = 'Mức độ cảnh giác: 90% (Bùng nổ)';
                if (statusTag) {
                    statusTag.textContent = 'Xung nhịp: Cao (Sóng Beta)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo29_4') {
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
        else if (slideId === 'slide_memo29_5') {
            const box = canvas.querySelector('.takeaway-box-v29');
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
        scriptName: 'video29',
        topic: 'Cold Water Effect',
        episodeNum: 29,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 29 Plugin] Loaded: Nước lạnh tỉnh táo.');
})();
