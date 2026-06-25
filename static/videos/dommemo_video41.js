/**
 * DOM Memo Video 41: Bản đồ không gian lệch (Spatial Grid)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo41_1": [
                {
                        "text": "dịch chuyển vị trí cái bàn",
                        "start": 3.5,
                        "end": 6.0,
                        "class": "active-violet"
                },
                {
                        "text": "va côm cốp vào góc tủ",
                        "start": 6.5,
                        "end": 9.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo41_2": [
                {
                        "text": "hệ thống tế bào lưới ở hồi hải mã",
                        "start": 3.0,
                        "end": 6.5,
                        "class": "active-green"
                },
                {
                        "text": "vận hành cơ thể theo phản xạ vô thức",
                        "start": 7.0,
                        "end": 10.5,
                        "class": "active-green"
                }
        ],
        "slide_memo41_3": [
                {
                        "text": "bản đồ neuron chưa kịp cập nhật",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "tín hiệu định vị bị lệch pha",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo41_4": [
                {
                        "text": "di chuyển bằng 100% tự động hóa",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "vẽ lại bản đồ thần kinh",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo41_5": [
                {
                        "text": "GPS trong đầu đang tải lại",
                        "start": 2.5,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo41_1', 'slide_memo41_2', 'slide_memo41_3', 'slide_memo41_4', 'slide_memo41_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo41_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo41-1-container">
                        <span class="ambient-sleep-particle-v41" style="top: 15%; left: 8%; animation-delay: -1s;">🗺️</span>
                        <span class="ambient-sleep-particle-v41" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v41" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="grid-lines-v41">🗺️</div>
                <div class="hitting-foot-v41">🤖 💥 📦</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo41_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo41-2-container">
                        <span class="ambient-sleep-particle-v41" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v41" style="top: 82%; left: 10%; animation-delay: -4s;">🗺️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v41 node-1">
                                <span class="diagram-node-icon">🗺️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v41 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v41 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Bản đồ không gian lệch*: Đó là vì não bộ lưu bản đồ không gian 3D thông qua hệ thống tế bào lưới ở hồi hải mã. Não dùng bản đồ cũ để vận hành cơ thể theo phản xạ vô thức.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo41_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo41-3-container">
                        <span class="ambient-sleep-particle-v41" style="top: 10%; left: 15%; animation-delay: -1s;">🗺️</span>
                        <span class="ambient-sleep-particle-v41" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v41">
                <div class="state-indicator-badge rested">ĐỊNH VỊ KHÔNG GIAN (GRID CELLS)</div>
                <div class="grid-scene">
                    <div class="player-node">🤖</div>
                    <div class="table-obstacle">📦</div>
                </div>
                <div class="interpretation-lbl">Phản xạ: Đường đi sạch sẽ</div>
            </div>
            <div class="amygdala-dashboard-v41">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HỆ TẾ BÀO LƯỚI
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trạng thái bản đồ</span>
                    <span class="amygdala-status-badge calm">Khớp (100%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Hồi hải mã chứa các grid cells liên tục cập nhật tọa độ không gian để bạn có thể đi trong bóng tối mà không ngã.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo41_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo41-4-container">
                        <span class="ambient-sleep-particle-v41" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v41" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v41">
                            <div class="comp-card-v41 card-left card-active">
                                <div class="comp-header-v41">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v41">🗺️</div>
                                </div>
                                <div class="comp-bullet-list-v41">
                                    <div class="comp-bullet-row-v41" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v41">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v41" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v41">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v41">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v41 card-right card-inactive">
                                <div class="comp-header-v41">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v41">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v41">
                                    <div class="comp-bullet-row-v41" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v41">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v41" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v41">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v41">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo41_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo41-5-container">
                        <div class="takeaway-radar-v41"></div>
                        <div class="takeaway-box-v41" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v41">🗺️</div>
                            <div class="takeaway-text-v41">
                                "Nếu bạn bị vấp chân khi kê lại đồ đạc, đừng tự trách. Chỉ là định vị GPS trong đầu bạn đang tải lại bản đồ mới mà thôi!"
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
        if (slideId === 'slide_memo41_1') {
            const foot = canvas.querySelector('.hitting-foot-v41');
            if (foot) {
                if (progress > 0.45) {
                    foot.style.transform = 'scale(1.5)';
                    foot.style.color = 'var(--memo41-secondary)';
                } else {
                    foot.style.transform = 'scale(1)';
                    foot.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo41_2') {
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
        else if (slideId === 'slide_memo41_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const player = canvas.querySelector('.player-node');
            const obstacle = canvas.querySelector('.table-obstacle');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BẢN ĐỒ: KHỚP VẬT LÝ';
                if (player) player.style.transform = 'translate(0, 0)';
                if (obstacle) { obstacle.style.transform = 'translate(60px, 0)'; obstacle.style.opacity = '0.3'; }
                if (lbl) lbl.textContent = 'Phản xạ: Tự động né tránh an toàn 🟢';
                if (statusTag) {
                    statusTag.textContent = 'Định vị: Khớp (Safe)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BẢN ĐỒ: LỆCH TOẠ ĐỘ!';
                if (player) {
                    player.style.transform = 'translate(45px, 0)';
                    player.style.animation = 'bubble-vibrate 0.1s infinite';
                }
                if (obstacle) { obstacle.style.transform = 'translate(45px, 0)'; obstacle.style.opacity = '1'; }
                if (lbl) lbl.textContent = 'Va chạm! 🔴 (Do dịch chuyển bàn học)';
                if (statusTag) {
                    statusTag.textContent = 'Định vị: Lệch 40cm (Va đập)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo41_4') {
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
        else if (slideId === 'slide_memo41_5') {
            const box = canvas.querySelector('.takeaway-box-v41');
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
        scriptName: 'video41',
        topic: 'Spatial Grid',
        episodeNum: 41,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 41 Plugin] Loaded: Bản đồ không gian lệch.');
})();
