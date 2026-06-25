/**
 * DOM Memo Video 48: Hiệu ứng Người ngoài (Bystander Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo48_1": [
                {
                        "text": "khả năng nhận được sự giúp đỡ lại thấp hơn",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo48_2": [
                {
                        "text": "Hiệu ứng Người ngoài cuộc",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "khuếch tán trách nhiệm",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo48_3": [
                {
                        "text": "trách nhiệm giúp đỡ là 100%",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "tự động chia nhỏ làm tất cả cùng đóng băng",
                        "start": 5.5,
                        "end": 9.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo48_4": [
                {
                        "text": "trợ giúp nhanh",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "sự thờ ơ tập thể vô thức",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo48_5": [
                {
                        "text": "chỉ đích danh một người cụ thể",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo48_1', 'slide_memo48_2', 'slide_memo48_3', 'slide_memo48_4', 'slide_memo48_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo48_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo48-1-container">
                        <span class="ambient-sleep-particle-v48" style="top: 15%; left: 8%; animation-delay: -1s;">🚨</span>
                        <span class="ambient-sleep-particle-v48" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v48" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="emergency-badge-v48">🚨 🆘 🚨</div>
                <div class="crowd-size-v48">👥 👥 👥 👥</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo48_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo48-2-container">
                        <span class="ambient-sleep-particle-v48" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v48" style="top: 82%; left: 10%; animation-delay: -4s;">🚨</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v48 node-1">
                                <span class="diagram-node-icon">🚨</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v48 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v48 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Người ngoài*: Hiện tượng này gọi là Hiệu ứng Người ngoài cuộc. Đám đông tạo ra sự khuếch tán trách nhiệm: ai cũng nghĩ chắc chắn sẽ có người khác cứu bạn rồi.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo48_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo48-3-container">
                        <span class="ambient-sleep-particle-v48" style="top: 10%; left: 15%; animation-delay: -1s;">🚨</span>
                        <span class="ambient-sleep-particle-v48" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v48">
                <div class="state-indicator-badge rested">radar TRÁCH NHIỆM</div>
                <div class="bystander-crowd">
                    <span class="victim">🆘</span>
                </div>
                <div class="interpretation-lbl">Khả năng cứu giúp: 100%</div>
            </div>
            <div class="amygdala-dashboard-v48">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    SỰ PHÂN TÁN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trách nhiệm cá nhân</span>
                    <span class="amygdala-status-badge calm">100% (Tối Đa)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Khi số lượng người chứng kiến tăng lên, xác suất hành động cứu giúp của mỗi người giảm theo cấp số nhân.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo48_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo48-4-container">
                        <span class="ambient-sleep-particle-v48" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v48" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v48">
                            <div class="comp-card-v48 card-left card-active">
                                <div class="comp-header-v48">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v48">🚨</div>
                                </div>
                                <div class="comp-bullet-list-v48">
                                    <div class="comp-bullet-row-v48" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v48">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v48" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v48">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v48">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v48 card-right card-inactive">
                                <div class="comp-header-v48">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v48">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v48">
                                    <div class="comp-bullet-row-v48" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v48">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v48" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v48">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v48">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo48_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo48-5-container">
                        <div class="takeaway-radar-v48"></div>
                        <div class="takeaway-box-v48" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v48">🚨</div>
                            <div class="takeaway-text-v48">
                                "Nếu cần giúp đỡ nơi đông người, hãy chỉ đích danh một người cụ thể. Đừng kêu cứu chung chung giữa đám đông!"
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
        if (slideId === 'slide_memo48_1') {
            const emergency = canvas.querySelector('.emergency-badge-v48');
            const crowd = canvas.querySelector('.crowd-size-v48');
            if (emergency && crowd) {
                if (progress > 0.45) {
                    emergency.style.transform = 'scale(0.8)';
                    crowd.style.transform = 'scale(1.5)';
                    crowd.style.opacity = '1';
                } else {
                    emergency.style.transform = 'scale(1.3)';
                    crowd.style.transform = 'scale(1)';
                    crowd.style.opacity = '0.3';
                }
            }
        }
        else if (slideId === 'slide_memo48_2') {
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
        else if (slideId === 'slide_memo48_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const crowd = canvas.querySelector('.bystander-crowd');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: CHỈ 1 NGƯỜI CHỨNG KIẾN';
                if (crowd) crowd.innerHTML = '<span class="victim">🆘</span> <span style="font-size:30px;">🙋</span>';
                if (lbl) lbl.textContent = 'Trách nhiệm tập trung: 1 người lập tức cứu giúp!';
                if (statusTag) {
                    statusTag.textContent = 'Trách nhiệm: 100% (Cao)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: CÓ ĐÁM ĐÔNG 10 NGƯỜI';
                if (crowd) {
                    crowd.innerHTML = '<span class="victim">🆘</span>' + ' 👥'.repeat(6);
                }
                if (lbl) lbl.textContent = 'Trách nhiệm bị phân tán: Ai cũng thờ ơ lạnh lùng...';
                if (statusTag) {
                    statusTag.textContent = 'Trách nhiệm: 5% (Cực thấp)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo48_4') {
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
        else if (slideId === 'slide_memo48_5') {
            const box = canvas.querySelector('.takeaway-box-v48');
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
        scriptName: 'video48',
        topic: 'Bystander Effect',
        episodeNum: 48,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 48 Plugin] Loaded: Hiệu ứng Người ngoài.');
})();
