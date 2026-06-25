/**
 * DOM Memo Video 56: Hiệu ứng Barnum (Barnum Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo56_1": [
                {
                        "text": "bói toán cung hoàng đạo",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-violet"
                },
                {
                        "text": "chính xác 100% tính cách",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-green"
                }
        ],
        "slide_memo56_2": [
                {
                        "text": "Hiệu ứng Barnum",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "mô tả mơ hồ, chung chung",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo56_3": [
                {
                        "text": "câu mô tả lập lờ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "tự tìm kiếm trải nghiệm để lắp ráp",
                        "start": 5.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo56_4": [
                {
                        "text": "cảm giác được thấu hiểu sâu sắc",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "đòi hỏi chỉ số khách quan",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo56_5": [
                {
                        "text": "đúng với bất kỳ ai",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo56_1', 'slide_memo56_2', 'slide_memo56_3', 'slide_memo56_4', 'slide_memo56_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo56_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo56-1-container">
                        <span class="ambient-sleep-particle-v56" style="top: 15%; left: 8%; animation-delay: -1s;">🔮</span>
                        <span class="ambient-sleep-particle-v56" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v56" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="glowing-crystal-v56">🔮</div>
                <div class="prediction-paper-v56">"Nói trúng tim đen!"</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo56_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo56-2-container">
                        <span class="ambient-sleep-particle-v56" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v56" style="top: 82%; left: 10%; animation-delay: -4s;">🔮</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v56 node-1">
                                <span class="diagram-node-icon">🔮</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v56 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v56 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Barnum*: Đó chính là Hiệu ứng Barnum hay Forer. Chúng ta có xu hướng tin rằng những mô tả mơ hồ, chung chung áp dụng cho tất cả mọi người là dành riêng cho cá nhân mình.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo56_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo56-3-container">
                        <span class="ambient-sleep-particle-v56" style="top: 10%; left: 15%; animation-delay: -1s;">🔮</span>
                        <span class="ambient-sleep-particle-v56" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v56">
                <div class="state-indicator-badge rested">QUẢ CẦU PHÁT NGÔN</div>
                <div class="crystal-ball">🔮</div>
                <div class="interpretation-lbl">Lời tiên tri: "Bạn có nỗi sợ thầm kín..."</div>
            </div>
            <div class="amygdala-dashboard-v56">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ KHỚP TÂM LÝ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Độ chính xác cảm nhận</span>
                    <span class="amygdala-status-badge calm">95% (Khớp!)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Bộ não có khuynh hướng tự điền thông tin cá nhân (ego-biased validation) để khớp các thông điệp mơ hồ vào bản thân.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo56_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo56-4-container">
                        <span class="ambient-sleep-particle-v56" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v56" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v56">
                            <div class="comp-card-v56 card-left card-active">
                                <div class="comp-header-v56">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v56">🔮</div>
                                </div>
                                <div class="comp-bullet-list-v56">
                                    <div class="comp-bullet-row-v56" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v56">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v56" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v56">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v56">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v56 card-right card-inactive">
                                <div class="comp-header-v56">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v56">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v56">
                                    <div class="comp-bullet-row-v56" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v56">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v56" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v56">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v56">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo56_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo56-5-container">
                        <div class="takeaway-radar-v56"></div>
                        <div class="takeaway-box-v56" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v56">🔮</div>
                            <div class="takeaway-text-v56">
                                "Hãy nhớ rằng những lời tiên tri chung chung có thể đúng với bất kỳ ai. Đừng để những mô tả mơ hồ vẽ nên cuộc đời bạn!"
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
        if (slideId === 'slide_memo56_1') {
            const crystal = canvas.querySelector('.glowing-crystal-v56');
            const paper = canvas.querySelector('.prediction-paper-v56');
            if (crystal && paper) {
                if (progress > 0.45) {
                    crystal.style.transform = 'translateY(-25px) scale(1.25) rotate(30deg)';
                    crystal.style.filter = 'drop-shadow(0 0 25px var(--memo56-primary))';
                    paper.style.color = 'var(--memo56-secondary)'; paper.style.transform = 'translateY(15px) scale(1.05)';
                } else {
                    crystal.style.transform = 'scale(1) rotate(0deg)';
                    crystal.style.filter = 'none';
                    paper.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo56_2') {
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
        else if (slideId === 'slide_memo56_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const crystal = canvas.querySelector('.crystal-ball');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TÍN HIỆU: ĐỌC TIÊN TRI MƠ HỒ';
                if (crystal) { crystal.style.transform = 'scale(1)'; crystal.style.filter = 'none'; }
                if (lbl) lbl.textContent = 'Lời tiên tri: "Đôi khi bạn rất hướng ngoại nhưng lại muốn yên tĩnh."';
                if (statusTag) {
                    statusTag.textContent = 'Nhận thức: Sao đúng thế! (95%)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TÍN HIỆU: SAU KHI PHÂN TÍCH LÝ TRÍ';
                if (crystal) {
                    crystal.style.transform = 'scale(1.2) rotate(15deg)';
                    crystal.style.filter = 'drop-shadow(0 0 15px #a855f7)';
                }
                if (lbl) lbl.textContent = 'Sự thật: Câu này đúng với 100% con người trên Trái Đất!';
                if (statusTag) {
                    statusTag.textContent = 'Nhận thức: Chung chung (10%)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo56_4') {
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
        else if (slideId === 'slide_memo56_5') {
            const box = canvas.querySelector('.takeaway-box-v56');
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
        scriptName: 'video56',
        topic: 'Barnum Effect',
        episodeNum: 56,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 56 Plugin] Loaded: Hiệu ứng Barnum.');
})();
