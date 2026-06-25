/**
 * DOM Memo Video 49: Hiệu ứng Dunning-Kruger (Dunning-Kruger)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo49_1": [
                {
                        "text": "mới học lại cực kỳ tự tin",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "chuyên gia lại rụt rè",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo49_2": [
                {
                        "text": "Hiệu ứng Dunning-Kruger",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "ảo tưởng tự tin cực hạn",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo49_3": [
                {
                        "text": "Đỉnh cao sự tự mãn",
                        "start": 2.0,
                        "end": 4.8,
                        "class": "active-violet"
                },
                {
                        "text": "Thung lũng tuyệt vọng",
                        "start": 5.2,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo49_4": [
                {
                        "text": "tự tin tuyệt đối",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "luôn nghi ngờ năng lực",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo49_5": [
                {
                        "text": "giữ tinh thần cởi mở học hỏi",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo49_1', 'slide_memo49_2', 'slide_memo49_3', 'slide_memo49_4', 'slide_memo49_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo49_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo49-1-container">
                        <span class="ambient-sleep-particle-v49" style="top: 15%; left: 8%; animation-delay: -1s;">📈</span>
                        <span class="ambient-sleep-particle-v49" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v49" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="clown-actor-v49">🤡</div>
                <div class="confidence-bar-v49">TỰ TIN: 100%</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo49_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo49-2-container">
                        <span class="ambient-sleep-particle-v49" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v49" style="top: 82%; left: 10%; animation-delay: -4s;">📈</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v49 node-1">
                                <span class="diagram-node-icon">📈</span>
                                <span>1. Mới học được chút ít</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v49 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Tự tin thái quá ảo tưởng</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v49 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Học sâu mới thấy mình thiếu</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Dunning-Kruger*: Đó là Hiệu ứng Dunning-Kruger. Người thiếu kiến thức không đủ trình độ để nhận ra những thiếu sót của bản thân, dẫn đến ảo tưởng tự tin cực hạn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo49_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo49-3-container">
                        <span class="ambient-sleep-particle-v49" style="top: 10%; left: 15%; animation-delay: -1s;">📈</span>
                        <span class="ambient-sleep-particle-v49" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v49">
                <div class="state-indicator-badge rested">BIỂU ĐỒ NĂNG LỰC D-K</div>
                <div class="graph-scene-v49">
                    <div class="mount-point peak">🏔️ Đỉnh Tự Mãn</div>
                    <div class="mount-point valley">🕳️ Thung Lũng</div>
                </div>
                <div class="interpretation-lbl">Trạng thái: Vừa học 1 ngày</div>
            </div>
            <div class="amygdala-dashboard-v49">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ TỰ TIN NÃO BỘ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số tự tin</span>
                    <span class="amygdala-status-badge active-threat">100% (CỰC CAO)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự tự tin mù quáng chỉ là kết quả của việc không có đủ kiến thức để nhận diện lỗi sai logic của bản thân.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo49_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo49-4-container">
                        <span class="ambient-sleep-particle-v49" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v49" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v49">
                            <div class="comp-card-v49 card-left card-active">
                                <div class="comp-header-v49">
                                    <h3>Đỉnh Cao Ngu Muội</h3>
                                    <div class="comp-icon-v49">📈</div>
                                </div>
                                <div class="comp-bullet-list-v49">
                                    <div class="comp-bullet-row-v49" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v49">✨</span>
                                        <span>Tự tin cực cao dù biết ít</span>
                                    </div>
                                    <div class="comp-bullet-row-v49" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v49">✨</span>
                                        <span>Đánh giá thấp độ khó thực tế</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v49">ẢO TƯỞNG</div>
                            </div>

                            <div class="comp-card-v49 card-right card-inactive">
                                <div class="comp-header-v49">
                                    <h3>Thung Lũng Tuyệt Vọng</h3>
                                    <div class="comp-icon-v49">📉</div>
                                </div>
                                <div class="comp-bullet-list-v49">
                                    <div class="comp-bullet-row-v49" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v49">❌</span>
                                        <span>Tự tin sụt giảm thấy rõ</span>
                                    </div>
                                    <div class="comp-bullet-row-v49" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v49">❌</span>
                                        <span>Nhận ra lượng kiến thức khổng lồ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v49">THẤT VỌNG</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo49_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo49-5-container">
                        <div class="takeaway-radar-v49"></div>
                        <div class="takeaway-box-v49" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v49">📈</div>
                            <div class="takeaway-text-v49">
                                "Hãy luôn giữ tinh thần cởi mở học hỏi. Càng biết nhiều, chúng ta càng nhận ra đại dương kiến thức rộng lớn đến nhường nào!"
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
        if (slideId === 'slide_memo49_1') {
            const clown = canvas.querySelector('.clown-actor-v49');
            const conf = canvas.querySelector('.confidence-bar-v49');
            if (clown && conf) {
                if (progress > 0.45) {
                    clown.textContent = '🧠';
                    clown.style.transform = 'scale(1.3) rotate(15deg)';
                    conf.textContent = 'TỰ TIN: 15% (Đang học)';
                    conf.style.color = 'var(--memo49-secondary)';
                } else {
                    clown.textContent = '🤡';
                    clown.style.transform = 'scale(1) rotate(0deg)';
                    conf.textContent = 'TỰ TIN: 100% (Ảo tưởng)';
                    conf.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo49_2') {
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
        else if (slideId === 'slide_memo49_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const peak = canvas.querySelector('.peak');
            const valley = canvas.querySelector('.valley');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'GIAI ĐOẠN 1: MỚI BẮT ĐẦU';
                if (peak) peak.style.transform = 'scale(1.3)';
                if (valley) valley.style.transform = 'scale(1)';
                if (lbl) lbl.textContent = 'Biết 1%: Nghĩ mình là thiên tài! (Đỉnh cao)';
                if (statusTag) {
                    statusTag.textContent = 'Tự tin: 100% (Ảo tưởng)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            } else {
                if (badge) badge.textContent = 'GIAI ĐOẠN 2: HỌC THÊM 6 THÁNG';
                if (peak) peak.style.transform = 'scale(1)';
                if (valley) valley.style.transform = 'scale(1.3)';
                if (lbl) lbl.textContent = 'Biết 50%: Thấy mình không biết gì... (Thung lũng)';
                if (statusTag) {
                    statusTag.textContent = 'Tự tin: 15% (Hoang mang)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            }
        }
        else if (slideId === 'slide_memo49_4') {
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
        else if (slideId === 'slide_memo49_5') {
            const box = canvas.querySelector('.takeaway-box-v49');
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
        scriptName: 'video49',
        topic: 'Dunning-Kruger',
        episodeNum: 49,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 49 Plugin] Loaded: Hiệu ứng Dunning-Kruger.');
})();
