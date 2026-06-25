/**
 * DOM Memo Video 52: Người thứ ba (Third-Person Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo52_1": [
                {
                        "text": "người khác sẽ bị lừa",
                        "start": 3.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "tôi thì không bao giờ",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo52_2": [
                {
                        "text": "Hiệu ứng Người thứ ba",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "phóng đại sức ảnh hưởng lên người khác",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo52_3": [
                {
                        "text": "bị ghi đè nhận thức",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "lá chắn bảo vệ",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo52_4": [
                {
                        "text": "thiếu phòng thủ, dễ bị dắt mũi",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "làm chủ lý trí tuyệt đối",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo52_5": [
                {
                        "text": "không ai hoàn toàn miễn nhiễm",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo52_1', 'slide_memo52_2', 'slide_memo52_3', 'slide_memo52_4', 'slide_memo52_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo52_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo52-1-container">
                        <span class="ambient-sleep-particle-v52" style="top: 15%; left: 8%; animation-delay: -1s;">🛡️</span>
                        <span class="ambient-sleep-particle-v52" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v52" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="media-wave-v52">📺 📶 📺</div>
                <div class="steel-shield-v52">🛡️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo52_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo52-2-container">
                        <span class="ambient-sleep-particle-v52" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v52" style="top: 82%; left: 10%; animation-delay: -4s;">🛡️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v52 node-1">
                                <span class="diagram-node-icon">🛡️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v52 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v52 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Người thứ ba*: Đó chính là Hiệu ứng Người thứ ba. Chúng ta có xu hướng phóng đại sức ảnh hưởng của truyền thông lên người khác, trong khi tự tin thái quá rằng bản thân có bộ lọc miễn nhiễm hoàn hảo.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo52_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo52-3-container">
                        <span class="ambient-sleep-particle-v52" style="top: 10%; left: 15%; animation-delay: -1s;">🛡️</span>
                        <span class="ambient-sleep-particle-v52" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v52">
                <div class="state-indicator-badge rested">HIỆU LỰC TRUYỀN THÔNG</div>
                <div class="shield-scene">
                    <span class="user-node">🧠</span>
                    <span class="defense-shield">🛡️</span>
                </div>
                <div class="interpretation-lbl">Nhận thức: Miễn nhiễm 100%</div>
            </div>
            <div class="amygdala-dashboard-v52">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    SỨC BẢO VỆ LÝ TRÍ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số tự tin miễn dịch</span>
                    <span class="amygdala-status-badge calm">100% (Khỏe)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Chúng ta có nhu cầu duy trì lòng tự trọng bằng cách tin rằng mình thông thái và độc lập hơn số đông xã hội.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo52_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo52-4-container">
                        <span class="ambient-sleep-particle-v52" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v52" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v52">
                            <div class="comp-card-v52 card-left card-active">
                                <div class="comp-header-v52">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v52">🛡️</div>
                                </div>
                                <div class="comp-bullet-list-v52">
                                    <div class="comp-bullet-row-v52" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v52">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v52" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v52">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v52">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v52 card-right card-inactive">
                                <div class="comp-header-v52">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v52">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v52">
                                    <div class="comp-bullet-row-v52" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v52">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v52" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v52">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v52">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo52_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo52-5-container">
                        <div class="takeaway-radar-v52"></div>
                        <div class="takeaway-box-v52" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v52">🛡️</div>
                            <div class="takeaway-text-v52">
                                "Sự thật là không ai hoàn toàn miễn nhiễm với truyền thông. Hãy luôn giữ cái đầu lạnh và thận trọng với những thông tin bạn tiếp nhận!"
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
        if (slideId === 'slide_memo52_1') {
            const wave = canvas.querySelector('.media-wave-v52');
            const shield = canvas.querySelector('.steel-shield-v52');
            if (wave && shield) {
                if (progress > 0.45) {
                    wave.style.opacity = '0.2';
                    shield.style.transform = 'scale(1.5) rotate(15deg)';
                    shield.style.filter = 'drop-shadow(0 0 25px var(--memo52-primary))';
                } else {
                    wave.style.opacity = '1';
                    shield.style.transform = 'scale(1) rotate(0deg)';
                    shield.style.filter = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo52_2') {
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
        else if (slideId === 'slide_memo52_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const shield = canvas.querySelector('.defense-shield');
            const user = canvas.querySelector('.user-node');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'ĐỐI TƯỢNG: NGƯỜI KHÁC';
                if (shield) { shield.style.transform = 'scale(0)'; shield.style.opacity = '0'; }
                if (user) user.textContent = '🤯 (Bị dẫn dắt)';
                if (lbl) lbl.textContent = 'Đánh giá: Đám đông dễ dàng tin vào quảng cáo';
                if (statusTag) {
                    statusTag.textContent = 'Độ miễn dịch: 10% (Rất yếu)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            } else {
                if (badge) badge.textContent = 'ĐỐI TƯỢNG: BẢN THÂN BẠN';
                if (shield) {
                    shield.style.transform = 'scale(1.3) translateX(-15px)';
                    shield.style.opacity = '1';
                }
                if (user) user.textContent = '😎 (Tỉnh táo)';
                if (lbl) lbl.textContent = 'Đánh giá: Bạn tin mình có lý trí bảo vệ vượt trội 🛡️';
                if (statusTag) {
                    statusTag.textContent = 'Độ miễn dịch: 100% (Tự tin)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            }
        }
        else if (slideId === 'slide_memo52_4') {
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
        else if (slideId === 'slide_memo52_5') {
            const box = canvas.querySelector('.takeaway-box-v52');
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
        scriptName: 'video52',
        topic: 'Third-Person Effect',
        episodeNum: 52,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 52 Plugin] Loaded: Người thứ ba.');
})();
