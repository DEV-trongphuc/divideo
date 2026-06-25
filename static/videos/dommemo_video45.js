/**
 * DOM Memo Video 45: Hiệu ứng Pygmalion (Pygmalion Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo45_1": [
                {
                        "text": "đặt trọn niềm tin và kỳ vọng",
                        "start": 1.0,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "sẽ thực sự làm việc tốt hơn",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo45_2": [
                {
                        "text": "Hiệu ứng Pygmalion",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "thúc đẩy hành vi và hiệu suất",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo45_3": [
                {
                        "text": "hạt mầm tự tin nảy mầm",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                },
                {
                        "text": "ngôi sao hy vọng",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo45_4": [
                {
                        "text": "khơi dậy dopamine và nỗ lực",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "dập tắt động lực",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo45_5": [
                {
                        "text": "gieo hạt mầm thành công",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo45_1', 'slide_memo45_2', 'slide_memo45_3', 'slide_memo45_4', 'slide_memo45_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo45_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo45-1-container">
                        <span class="ambient-sleep-particle-v45" style="top: 15%; left: 8%; animation-delay: -1s;">🌱</span>
                        <span class="ambient-sleep-particle-v45" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v45" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="giant-seed-v45">🌱</div>
                <div class="stars-rain-v45">⭐ ⭐ ⭐</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo45_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo45-2-container">
                        <span class="ambient-sleep-particle-v45" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v45" style="top: 82%; left: 10%; animation-delay: -4s;">🌱</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v45 node-1">
                                <span class="diagram-node-icon">🌱</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v45 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v45 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Pygmalion*: Hiện tượng này gọi là Hiệu ứng Pygmalion. Niềm tin tích cực của bạn vô thức thay đổi cách bạn đối xử với họ, từ đó thúc đẩy hành vi và hiệu suất của họ đi lên.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo45_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo45-3-container">
                        <span class="ambient-sleep-particle-v45" style="top: 10%; left: 15%; animation-delay: -1s;">🌱</span>
                        <span class="ambient-sleep-particle-v45" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v45">
                <div class="state-indicator-badge rested">GIẢ LẬP PHÁT TRIỂN</div>
                <div class="growth-scene">
                    <span class="star-float">⭐</span>
                    <span class="plant-actor">🌱</span>
                </div>
                <div class="interpretation-lbl">Mức kỳ vọng: Thấp</div>
            </div>
            <div class="amygdala-dashboard-v45">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HIỆU SUẤT ĐẠT ĐƯỢC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số tự tin</span>
                    <span class="amygdala-status-badge calm">20% (YẾU)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự kỳ vọng làm thay đổi hành vi của người gửi, dẫn đến việc họ cung cấp nhiều cơ hội và phản hồi tích cực hơn.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo45_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo45-4-container">
                        <span class="ambient-sleep-particle-v45" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v45" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v45">
                            <div class="comp-card-v45 card-left card-active">
                                <div class="comp-header-v45">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v45">🌱</div>
                                </div>
                                <div class="comp-bullet-list-v45">
                                    <div class="comp-bullet-row-v45" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v45">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v45" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v45">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v45">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v45 card-right card-inactive">
                                <div class="comp-header-v45">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v45">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v45">
                                    <div class="comp-bullet-row-v45" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v45">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v45" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v45">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v45">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo45_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo45-5-container">
                        <div class="takeaway-radar-v45"></div>
                        <div class="takeaway-box-v45" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v45">🌱</div>
                            <div class="takeaway-text-v45">
                                "Hãy tin tưởng và trao đi những kỳ vọng tốt đẹp. Bạn đang trực tiếp gieo hạt mầm thành công vào tương lai của những người xung quanh!"
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
        if (slideId === 'slide_memo45_1') {
            const seed = canvas.querySelector('.giant-seed-v45');
            const stars = canvas.querySelector('.stars-rain-v45');
            if (seed && stars) {
                if (progress > 0.45) {
                    seed.textContent = '🌿';
                    seed.style.transform = 'scale(1.5) rotate(5deg)';
                    stars.style.opacity = '1';
                    stars.style.transform = 'translateY(-20px)';
                } else {
                    seed.textContent = '🌱';
                    seed.style.transform = 'scale(1) rotate(0deg)';
                    stars.style.opacity = '0.2';
                    stars.style.transform = 'translateY(0)';
                }
            }
        }
        else if (slideId === 'slide_memo45_2') {
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
        else if (slideId === 'slide_memo45_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const plant = canvas.querySelector('.plant-actor');
            const star = canvas.querySelector('.star-float');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: KHÔNG KỲ VỌNG';
                if (plant) { plant.textContent = '🌱'; plant.style.transform = 'scale(1)'; }
                if (star) { star.style.transform = 'translateY(0)'; star.style.opacity = '0.1'; }
                if (lbl) lbl.textContent = 'Niềm tin yếu: Hạt mầm không phát triển';
                if (statusTag) {
                    statusTag.textContent = 'Tự tin: 20% (Yếu)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: KỲ VỌNG TÍCH CỰC!';
                if (plant) {
                    plant.textContent = '🌿';
                    plant.style.transform = 'scale(1.6) translateY(-5px)';
                }
                if (star) {
                    star.style.transform = 'translateY(-40px) scale(1.5)';
                    star.style.opacity = '1';
                }
                if (lbl) lbl.textContent = 'Niềm tin cao: Cây tự tin phát triển rực rỡ! 🌿';
                if (statusTag) {
                    statusTag.textContent = 'Tự tin: 95% (Cực mạnh)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo45_4') {
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
        else if (slideId === 'slide_memo45_5') {
            const box = canvas.querySelector('.takeaway-box-v45');
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
        scriptName: 'video45',
        topic: 'Pygmalion Effect',
        episodeNum: 45,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 45 Plugin] Loaded: Hiệu ứng Pygmalion.');
})();
