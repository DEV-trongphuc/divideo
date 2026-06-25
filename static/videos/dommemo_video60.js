/**
 * DOM Memo Video 60: Hiệu ứng Tương phản (Contrast Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo60_1": [
                {
                        "text": "ngâm tay vào nước đá lạnh buốt",
                        "start": 1.0,
                        "end": 3.8,
                        "class": "active-violet"
                },
                {
                        "text": "cảm thấy nóng rát như nước sôi",
                        "start": 4.2,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo60_2": [
                {
                        "text": "Hiệu ứng Tương phản cảm giác",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "không đo lường khách quan tuyệt đối",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo60_3": [
                {
                        "text": "độ chênh lệch nhiệt độ cực lớn",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "ảo giác nóng bỏng",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo60_4": [
                {
                        "text": "ấm áp, dịu nhẹ",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "phóng đại lên gấp 5 lần",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo60_5": [
                {
                        "text": "thang đo trong đầu bị xô lệch",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo60_1', 'slide_memo60_2', 'slide_memo60_3', 'slide_memo60_4', 'slide_memo60_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo60_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo60-1-container">
                        <span class="ambient-sleep-particle-v60" style="top: 15%; left: 8%; animation-delay: -1s;">🔥</span>
                        <span class="ambient-sleep-particle-v60" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v60" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="fire-ice-v60">❄️ ➡️ 🔥</div>
                <div class="thermometer-v60">🌡️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo60_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo60-2-container">
                        <span class="ambient-sleep-particle-v60" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v60" style="top: 82%; left: 10%; animation-delay: -4s;">🔥</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v60 node-1">
                                <span class="diagram-node-icon">🔥</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v60 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v60 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Tương phản*: Đó là Hiệu ứng Tương phản cảm giác. Bộ não không đo lường các tác nhân vật lý một cách khách quan tuyệt đối, mà liên tục so sánh sự thay đổi đột ngột so với trạng thái trước đó.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo60_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo60-3-container">
                        <span class="ambient-sleep-particle-v60" style="top: 10%; left: 15%; animation-delay: -1s;">🔥</span>
                        <span class="ambient-sleep-particle-v60" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v60">
                <div class="state-indicator-badge rested">PHÂN TÍCH NHIỆT ĐỘ</div>
                <div class="temp-scene">
                    <span class="water-emoji">💧</span>
                </div>
                <div class="interpretation-lbl">Cảm nhận: Dịu nhẹ (35 độ C)</div>
            </div>
            <div class="amygdala-dashboard-v60">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    XUNG THỤ THỂ NHIỆT
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Độ kích thích neuron</span>
                    <span class="amygdala-status-badge calm">Thấp (15%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Các đầu dây thần kinh cảm giác (Thermoreceptors) báo cáo sự thay đổi động năng năng lượng chứ không báo cáo nhiệt độ tĩnh.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo60_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo60-4-container">
                        <span class="ambient-sleep-particle-v60" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v60" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v60">
                            <div class="comp-card-v60 card-left card-active">
                                <div class="comp-header-v60">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v60">🔥</div>
                                </div>
                                <div class="comp-bullet-list-v60">
                                    <div class="comp-bullet-row-v60" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v60">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v60" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v60">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v60">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v60 card-right card-inactive">
                                <div class="comp-header-v60">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v60">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v60">
                                    <div class="comp-bullet-row-v60" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v60">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v60" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v60">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v60">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo60_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo60-5-container">
                        <div class="takeaway-radar-v60"></div>
                        <div class="takeaway-box-v60" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v60">🔥</div>
                            <div class="takeaway-text-v60">
                                "Sự thật là nước ấm không đổi, chỉ có thang đo trong đầu bạn bị xô lệch. Đừng vội đánh giá một việc khi tâm trí bạn chưa cân bằng!"
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
        if (slideId === 'slide_memo60_1') {
            const item = canvas.querySelector('.fire-ice-v60');
            const thermo = canvas.querySelector('.thermometer-v60');
            if (item && thermo) {
                if (progress > 0.45) {
                    item.style.transform = 'scale(1.3) rotate(15deg)';
                    item.textContent = '🔥 NÓNG BỎNG! 🔥';
                    thermo.style.filter = 'drop-shadow(0 0 25px var(--memo60-primary))';
                } else {
                    item.style.transform = 'scale(1) rotate(0deg)';
                    item.textContent = '❄️ ➡️ 🔥';
                    thermo.style.filter = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo60_2') {
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
        else if (slideId === 'slide_memo60_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const water = canvas.querySelector('.water-emoji');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: TỪ KHÔNG KHÍ VÀO NƯỚC ẤM';
                if (water) { water.textContent = '💧 (Ấm áp)'; water.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Cảm nhận: Dịu nhẹ, bình thường';
                if (statusTag) {
                    statusTag.textContent = 'Kích thích: 15% (Bình thường)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: TỪ NƯỚC ĐÁ VÀO NƯỚC ẤM';
                if (water) {
                    water.textContent = '🔥 NÓNG RÁT!';
                    water.style.transform = 'scale(1.4)';
                }
                if (lbl) lbl.textContent = 'Ảo giác: Thấy nước nóng như sôi! 🥵';
                if (statusTag) {
                    statusTag.textContent = 'Kích thích: 95% (Cực mạnh)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo60_4') {
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
        else if (slideId === 'slide_memo60_5') {
            const box = canvas.querySelector('.takeaway-box-v60');
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
        scriptName: 'video60',
        topic: 'Contrast Effect',
        episodeNum: 60,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 60 Plugin] Loaded: Hiệu ứng Tương phản.');
})();
