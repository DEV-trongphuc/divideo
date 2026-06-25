/**
 * DOM Memo Video 30: Hiệu ứng Hào quang (Spotlight Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo30_1": [
                {
                        "text": "lỡ nói nhầm một câu",
                        "start": 1.0,
                        "end": 3.5,
                        "class": "active-violet"
                },
                {
                        "text": "tự trách và nhớ mãi",
                        "start": 4.0,
                        "end": 7.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo30_2": [
                {
                        "text": "Hiệu ứng Hào quang",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "phóng đại tầm quan trọng",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo30_3": [
                {
                        "text": "mọi ánh đèn sân khấu",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "mọi người chỉ rọi đèn vào chính họ",
                        "start": 5.5,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo30_4": [
                {
                        "text": "tự soi xét mình 100%",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "chưa đầy 5% thời gian",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo30_5": [
                {
                        "text": "lỗi lầm nhỏ nhặt",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "ai cũng bận soi chính mình",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo30_1', 'slide_memo30_2', 'slide_memo30_3', 'slide_memo30_4', 'slide_memo30_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo30_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo30-1-container">
                        <span class="ambient-sleep-particle-v30" style="top: 15%; left: 8%; animation-delay: -1s;">🔦</span>
                        <span class="ambient-sleep-particle-v30" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v30" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="stage-cone-v30">🔦</div>
                <div class="shy-emoji-v30">😳</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo30_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo30-2-container">
                        <span class="ambient-sleep-particle-v30" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v30" style="top: 82%; left: 10%; animation-delay: -4s;">🔦</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v30 node-1">
                                <span class="diagram-node-icon">🔦</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v30 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v30 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Hào quang*: Hiện tượng này gọi là Hiệu ứng Hào quang. Vì bạn là nhân vật chính trong thế giới của mình, bạn phóng đại tầm quan trọng của các chi tiết cá nhân lên gấp nhiều lần.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo30_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo30-3-container">
                        <span class="ambient-sleep-particle-v30" style="top: 10%; left: 15%; animation-delay: -1s;">🔦</span>
                        <span class="ambient-sleep-particle-v30" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v30">
                <div class="state-indicator-badge rested">ÁNH HÀO QUANG XÃ HỘI</div>
                <div class="spotlight-stage">
                    <div class="spotlight-cone"></div>
                    <span class="center-person">😳</span>
                </div>
                <div class="interpretation-lbl">Bạn nghĩ: Mọi người đang cười mình</div>
            </div>
            <div class="amygdala-dashboard-v30">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    CHỈ SỐ TỰ TI
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức phóng đại lỗi</span>
                    <span class="amygdala-status-badge active-threat">X10 LẦN</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự tự ý thức cực đoan khiến bạn tin rằng thế giới đang quan sát từng hành vi của bạn như một chiếc kính hiển vi.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo30_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo30-4-container">
                        <span class="ambient-sleep-particle-v30" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v30" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v30">
                            <div class="comp-card-v30 card-left card-active">
                                <div class="comp-header-v30">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v30">🔦</div>
                                </div>
                                <div class="comp-bullet-list-v30">
                                    <div class="comp-bullet-row-v30" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v30">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v30" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v30">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v30">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v30 card-right card-inactive">
                                <div class="comp-header-v30">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v30">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v30">
                                    <div class="comp-bullet-row-v30" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v30">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v30" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v30">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v30">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo30_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo30-5-container">
                        <div class="takeaway-radar-v30"></div>
                        <div class="takeaway-box-v30" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v30">🔦</div>
                            <div class="takeaway-text-v30">
                                "Đừng quá căng thẳng vì những lỗi lầm nhỏ nhặt. Không ai soi bạn kỹ đến thế đâu, vì ai cũng bận soi chính mình!"
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
        if (slideId === 'slide_memo30_1') {
            const cone = canvas.querySelector('.stage-cone-v30');
            const shy = canvas.querySelector('.shy-emoji-v30');
            if (cone && shy) {
                if (progress > 0.45) {
                    cone.style.transform = 'scale(2.2) rotate(180deg)';
                    shy.style.transform = 'scale(1.4) translateY(-10px)';
                    shy.textContent = '😱';
                } else {
                    cone.style.transform = 'scale(1) rotate(180deg)';
                    shy.style.transform = 'scale(1) translateY(0)';
                    shy.textContent = '😳';
                }
            }
        }
        else if (slideId === 'slide_memo30_2') {
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
        else if (slideId === 'slide_memo30_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const cone = canvas.querySelector('.spotlight-cone');
            const person = canvas.querySelector('.center-person');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'GÓC NHÌN: CỦA BẠN';
                if (cone) { cone.style.transform = 'scaleX(1.8)'; cone.style.opacity = '0.6'; }
                if (person) { person.textContent = '😳'; person.style.transform = 'scale(1.2)'; }
                if (lbl) lbl.textContent = 'Bạn nghĩ: Tất cả đang soi mình! (100% chú ý)';
                if (statusTag) {
                    statusTag.textContent = 'Phóng đại lỗi: X10';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            } else {
                if (badge) badge.textContent = 'GÓC NHÌN: THỰC TẾ';
                if (cone) { cone.style.transform = 'scaleX(0.2)'; cone.style.opacity = '0.05'; }
                if (person) { person.textContent = '😐'; person.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Thực tế: Không ai quan tâm! (2% chú ý)';
                if (statusTag) {
                    statusTag.textContent = 'Phóng đại lỗi: X1 (Khách quan)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            }
        }
        else if (slideId === 'slide_memo30_4') {
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
        else if (slideId === 'slide_memo30_5') {
            const box = canvas.querySelector('.takeaway-box-v30');
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
        scriptName: 'video30',
        topic: 'Spotlight Effect',
        episodeNum: 30,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 30 Plugin] Loaded: Hiệu ứng Hào quang.');
})();
