/**
 * DOM Memo Video 57: Hiệu ứng Hào quang (Halo Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo57_1": [
                {
                        "text": "ngoại hình thu hút",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "tự động nghĩ họ thông minh, tử tế",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo57_2": [
                {
                        "text": "Hiệu ứng Hào quang nhân cách",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "lấy một đặc điểm nổi bật làm hào quang",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo57_3": [
                {
                        "text": "vẽ lên một vòng hào quang",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "chấm điểm tối đa cho độ trung thực",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo57_4": [
                {
                        "text": "dễ bị lừa bởi vẻ bề ngoài",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "đòi hỏi thời gian quan sát",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo57_5": [
                {
                        "text": "ấn tượng ban đầu",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo57_1', 'slide_memo57_2', 'slide_memo57_3', 'slide_memo57_4', 'slide_memo57_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo57_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo57-1-container">
                        <span class="ambient-sleep-particle-v57" style="top: 15%; left: 8%; animation-delay: -1s;">😇</span>
                        <span class="ambient-sleep-particle-v57" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v57" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="halo-ring-v57">😇</div>
                <div class="good-avatar-v57">😎</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo57_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo57-2-container">
                        <span class="ambient-sleep-particle-v57" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v57" style="top: 82%; left: 10%; animation-delay: -4s;">😇</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v57 node-1">
                                <span class="diagram-node-icon">😇</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v57 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v57 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Hào quang*: Đó chính là Hiệu ứng Hào quang nhân cách. Bộ não lười biếng lấy một đặc điểm nổi bật (ngoại hình) làm hào quang phủ lên toàn bộ các khía cạnh khác của người đó.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo57_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo57-3-container">
                        <span class="ambient-sleep-particle-v57" style="top: 10%; left: 15%; animation-delay: -1s;">😇</span>
                        <span class="ambient-sleep-particle-v57" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v57">
                <div class="state-indicator-badge rested">ĐÁNH GIÁ NHÂN CÁCH</div>
                <div class="halo-avatar">😎</div>
                <div class="interpretation-lbl">Vẻ ngoài: Rất thu hút</div>
            </div>
            <div class="amygdala-dashboard-v57">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HỒ SƠ TỰ ĐỘNG
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Đánh giá đạo đức</span>
                    <span class="amygdala-status-badge calm">Trung Thực (95%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự thiên lệch xảy ra khi thông tin tích cực ở một thuộc tính lan tỏa sang các đánh giá ở thuộc tính khác.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo57_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo57-4-container">
                        <span class="ambient-sleep-particle-v57" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v57" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v57">
                            <div class="comp-card-v57 card-left card-active">
                                <div class="comp-header-v57">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v57">😇</div>
                                </div>
                                <div class="comp-bullet-list-v57">
                                    <div class="comp-bullet-row-v57" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v57">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v57" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v57">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v57">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v57 card-right card-inactive">
                                <div class="comp-header-v57">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v57">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v57">
                                    <div class="comp-bullet-row-v57" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v57">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v57" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v57">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v57">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo57_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo57-5-container">
                        <div class="takeaway-radar-v57"></div>
                        <div class="takeaway-box-v57" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v57">😇</div>
                            <div class="takeaway-text-v57">
                                "Đừng vội tin cậy hoàn toàn vào ấn tượng ban đầu. Hào quang lấp lánh bên ngoài đôi khi chỉ là một tấm rèm che đi sự thật!"
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
        if (slideId === 'slide_memo57_1') {
            const ring = canvas.querySelector('.halo-ring-v57');
            const avatar = canvas.querySelector('.good-avatar-v57');
            if (ring && avatar) {
                if (progress > 0.45) {
                    ring.style.transform = 'translateY(-30px) scale(1.6)';
                    ring.style.filter = 'drop-shadow(0 0 25px var(--memo57-primary))';
                    avatar.style.transform = 'scale(1.2)';
                } else {
                    ring.style.transform = 'translateY(0) scale(1)';
                    ring.style.filter = 'none';
                    avatar.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_memo57_2') {
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
        else if (slideId === 'slide_memo57_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const avatar = canvas.querySelector('.halo-avatar');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: NGOẠI HÌNH TRUNG BÌNH';
                if (avatar) { avatar.textContent = '😐'; avatar.style.filter = 'none'; }
                if (lbl) lbl.textContent = 'Não bộ: Chờ thông tin thực tế';
                if (statusTag) {
                    statusTag.textContent = 'Độ tin cậy: 50% (Chờ)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: NGOẠI HÌNH ĐẸP ĐẼ';
                if (avatar) {
                    avatar.textContent = '😎✨';
                    avatar.style.filter = 'drop-shadow(0 0 15px #fbbf24)';
                }
                if (lbl) lbl.textContent = 'Não bộ: Tự động gắn mác lịch sự, thông minh! 😇';
                if (statusTag) {
                    statusTag.textContent = 'Độ tin cậy: 95% (Thiên vị)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo57_4') {
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
        else if (slideId === 'slide_memo57_5') {
            const box = canvas.querySelector('.takeaway-box-v57');
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
        scriptName: 'video57',
        topic: 'Halo Effect',
        episodeNum: 57,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 57 Plugin] Loaded: Hiệu ứng Hào quang.');
})();
