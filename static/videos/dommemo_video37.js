/**
 * DOM Memo Video 37: Thức trước báo thức (Circadian Rhythm)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo37_1": [
                {
                        "text": "đúng 6 giờ 58 phút đã tự động mở mắt",
                        "start": 4.0,
                        "end": 8.0,
                        "class": "active-green"
                },
                {
                        "text": "biết giờ chính xác",
                        "start": 8.5,
                        "end": 11.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo37_2": [
                {
                        "text": "nhân trên chéo của não",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "giải phóng hormone Cortisol",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo37_3": [
                {
                        "text": "tăng vọt chuẩn bị cho cơ thể",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                },
                {
                        "text": "chiến thắng chiếc điện thoại",
                        "start": 7.0,
                        "end": 10.0,
                        "class": "active-green"
                }
        ],
        "slide_memo37_4": [
                {
                        "text": "chuyển trạng thái mượt mà",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "cắt đứt chu kỳ ngủ sâu",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo37_5": [
                {
                        "text": "đồng hồ sinh học vô cùng khỏe mạnh",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo37_1', 'slide_memo37_2', 'slide_memo37_3', 'slide_memo37_4', 'slide_memo37_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo37_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo37-1-container">
                        <span class="ambient-sleep-particle-v37" style="top: 15%; left: 8%; animation-delay: -1s;">⏰</span>
                        <span class="ambient-sleep-particle-v37" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v37" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="digital-time-v37">06:58</div>
                <div class="eyes-opening-v37">😴</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo37_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo37-2-container">
                        <span class="ambient-sleep-particle-v37" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v37" style="top: 82%; left: 10%; animation-delay: -4s;">⏰</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v37 node-1">
                                <span class="diagram-node-icon">⏰</span>
                                <span>1. Thói quen ngủ đúng giờ</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v37 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Hoạt chất ACTH tăng trước</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v37 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Tự tỉnh giấc dễ chịu</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Thức trước báo thức*: Đó là nhờ nhịp sinh học được điều khiển bởi nhân trên chéo của não. Khi bạn có lịch trình lặp lại, não bộ sẽ tự động giải phóng hormone Cortisol để đánh thức bạn từ trước.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo37_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo37-3-container">
                        <span class="ambient-sleep-particle-v37" style="top: 10%; left: 15%; animation-delay: -1s;">⏰</span>
                        <span class="ambient-sleep-particle-v37" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v37">
                <div class="state-indicator-badge rested">ĐỒNG HỒ SINH HỌC</div>
                <div class="clock-display-v37">06:50</div>
                <div class="interpretation-lbl">Trạng thái: Đang ngủ say</div>
            </div>
            <div class="amygdala-dashboard-v37">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HORMONE CORTISOL
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Nồng độ đánh thức</span>
                    <span class="amygdala-status-badge calm">15% (THẤP)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Cơ thể chuẩn bị thức giấc bằng cách tăng dần nhiệt độ cơ thể, nhịp tim và Cortisol trước giờ tỉnh dậy 1 tiếng.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo37_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo37-4-container">
                        <span class="ambient-sleep-particle-v37" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v37" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v37">
                            <div class="comp-card-v37 card-left card-active">
                                <div class="comp-header-v37">
                                    <h3>Nhịp Sinh Học</h3>
                                    <div class="comp-icon-v37">⏰</div>
                                </div>
                                <div class="comp-bullet-list-v37">
                                    <div class="comp-bullet-row-v37" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v37">✨</span>
                                        <span>Hormone tăng dần tự nhiên</span>
                                    </div>
                                    <div class="comp-bullet-row-v37" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v37">✨</span>
                                        <span>Tỉnh táo nhẹ nhàng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v37">ÊM ÁI</div>
                            </div>

                            <div class="comp-card-v37 card-right card-inactive">
                                <div class="comp-header-v37">
                                    <h3>Báo Thức Giật Mình</h3>
                                    <div class="comp-icon-v37">🔊</div>
                                </div>
                                <div class="comp-bullet-list-v37">
                                    <div class="comp-bullet-row-v37" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v37">❌</span>
                                        <span>Kích hoạt cortisol khẩn cấp</span>
                                    </div>
                                    <div class="comp-bullet-row-v37" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v37">❌</span>
                                        <span>Tim đập nhanh căng thẳng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v37">CÚ SỐC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo37_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo37-5-container">
                        <div class="takeaway-radar-v37"></div>
                        <div class="takeaway-box-v37" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v37">⏰</div>
                            <div class="takeaway-text-v37">
                                "Hãy duy trì giờ ngủ ổn định. Việc tự thức giấc là dấu hiệu cho thấy bạn đang sở hữu một đồng hồ sinh học vô cùng khỏe mạnh!"
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
        if (slideId === 'slide_memo37_1') {
            const time = canvas.querySelector('.digital-time-v37');
            const eyes = canvas.querySelector('.eyes-opening-v37');
            if (time && eyes) {
                if (progress > 0.45) {
                    time.style.transform = 'scale(1.3)';
                    time.style.color = 'var(--memo37-primary)';
                    eyes.textContent = '🤩';
                    eyes.style.transform = 'scale(1.5) rotate(5deg)';
                } else {
                    time.style.transform = 'scale(1)';
                    time.style.color = '#fff';
                    eyes.textContent = '😴';
                    eyes.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_memo37_2') {
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
        else if (slideId === 'slide_memo37_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const clock = canvas.querySelector('.clock-display-v37');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: 6:50 AM';
                if (clock) clock.textContent = '06:50';
                if (lbl) lbl.textContent = 'Cơ thể: Đang ngủ sâu, tích lũy năng lượng';
                if (statusTag) {
                    statusTag.textContent = 'Cortisol: 15% (Chuẩn bị)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: 6:58 AM (TỰ TỈNH)';
                if (clock) {
                    clock.textContent = '06:58';
                    clock.style.color = '#10b981';
                }
                if (lbl) lbl.textContent = 'Cơ thể: Tự mở mắt nhẹ nhàng, tỉnh táo!';
                if (statusTag) {
                    statusTag.textContent = 'Cortisol: 95% (Tỉnh táo)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo37_4') {
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
        else if (slideId === 'slide_memo37_5') {
            const box = canvas.querySelector('.takeaway-box-v37');
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
        scriptName: 'video37',
        topic: 'Circadian Rhythm',
        episodeNum: 37,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 37 Plugin] Loaded: Thức trước báo thức.');
})();
