/**
 * DOM Memo Video 54: Từ chối trước (Door-in-the-Face)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo54_1": [
                {
                        "text": "nhờ làm tốn 5 ngày, từ chối ngay",
                        "start": 2.0,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "xin giúp 1 tiếng, sẵn sàng đồng ý",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo54_2": [
                {
                        "text": "Từ chối trước, Đồng ý sau",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "quy luật có qua có lại",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo54_3": [
                {
                        "text": "KHÔNG! đóng sập",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "mở toang cánh cửa chấp thuận",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo54_4": [
                {
                        "text": "yêu cầu nhỏ từ đầu dễ bị lờ",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "tạo ra điểm neo nhượng bộ",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo54_5": [
                {
                        "text": "không cần cảm thấy tội lỗi",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo54_1', 'slide_memo54_2', 'slide_memo54_3', 'slide_memo54_4', 'slide_memo54_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo54_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo54-1-container">
                        <span class="ambient-sleep-particle-v54" style="top: 15%; left: 8%; animation-delay: -1s;">🚪</span>
                        <span class="ambient-sleep-particle-v54" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v54" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="door-actor-v54">🚪</div>
                <div class="ask-tag-v54">Yêu cầu lớn ❌ ➡️ Yêu cầu nhỏ 🤝</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo54_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo54-2-container">
                        <span class="ambient-sleep-particle-v54" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v54" style="top: 82%; left: 10%; animation-delay: -4s;">🚪</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v54 node-1">
                                <span class="diagram-node-icon">🚪</span>
                                <span>1. Yêu cầu mượn 10 triệu</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v54 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Bị từ chối ngay lập tức</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v54 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhờ mượn 100k, đồng ý</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Từ chối trước*: Hiện tượng này gọi là Kỹ thuật Cửa sập vào mặt hay Từ chối trước, Đồng ý sau. Khi đối phương nhượng bộ hạ mức yêu cầu xuống, não bạn cảm thấy có nghĩa vụ phải nhượng bộ tương xứng theo quy luật có qua có lại.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo54_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo54-3-container">
                        <span class="ambient-sleep-particle-v54" style="top: 10%; left: 15%; animation-delay: -1s;">🚪</span>
                        <span class="ambient-sleep-particle-v54" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v54">
                <div class="state-indicator-badge rested">KỊCH BẢN THUYẾT PHỤC</div>
                <div class="door-status">🚪 ĐÓNG</div>
                <div class="interpretation-lbl">Yêu cầu: Quyên góp 10 triệu</div>
            </div>
            <div class="amygdala-dashboard-v54">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ÁP LỰC ĐÁP NGHĨA
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức độ thỏa hiệp</span>
                    <span class="amygdala-status-badge calm">THẤP (0%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Quy chuẩn đạo đức có qua có lại (Reciprocity) thôi thúc bạn nhượng bộ khi thấy người khác đã nhượng bộ trước.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo54_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo54-4-container">
                        <span class="ambient-sleep-particle-v54" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v54" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v54">
                            <div class="comp-card-v54 card-left card-active">
                                <div class="comp-header-v54">
                                    <h3>Yêu Cầu Quá Tải</h3>
                                    <div class="comp-icon-v54">🚪</div>
                                </div>
                                <div class="comp-bullet-list-v54">
                                    <div class="comp-bullet-row-v54" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v54">✨</span>
                                        <span>Từ chối thẳng thừng ngay</span>
                                    </div>
                                    <div class="comp-bullet-row-v54" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v54">✨</span>
                                        <span>Tạo ranh giới đề phòng cao</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v54">TỪ CHỐI</div>
                            </div>

                            <div class="comp-card-v54 card-right card-inactive">
                                <div class="comp-header-v54">
                                    <h3>Yêu Cầu Hạ Thấp</h3>
                                    <div class="comp-icon-v54">✨</div>
                                </div>
                                <div class="comp-bullet-list-v54">
                                    <div class="comp-bullet-row-v54" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v54">❌</span>
                                        <span>Cảm giác được nhượng bộ</span>
                                    </div>
                                    <div class="comp-bullet-row-v54" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v54">❌</span>
                                        <span>Vui vẻ gật đầu giúp đỡ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v54">ĐỒNG Ý</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo54_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo54-5-container">
                        <div class="takeaway-radar-v54"></div>
                        <div class="takeaway-box-v54" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v54">🚪</div>
                            <div class="takeaway-text-v54">
                                "Hãy tỉnh táo trước những lời nhờ vả hạ cấp. Bạn không cần cảm thấy tội lỗi khi từ chối cả hai yêu cầu nếu chúng không hợp lý!"
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
        if (slideId === 'slide_memo54_1') {
            const door = canvas.querySelector('.door-actor-v54');
            const ask = canvas.querySelector('.ask-tag-v54');
            if (door && ask) {
                if (progress > 0.45) {
                    door.style.transform = 'scale(1.3) rotate(-15deg)';
                    ask.style.color = 'var(--memo54-primary)';
                } else {
                    door.style.transform = 'scale(1) rotate(0deg)';
                    ask.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo54_2') {
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
        else if (slideId === 'slide_memo54_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const door = canvas.querySelector('.door-status');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BƯỚC 1: YÊU CẦU QUÁ LỚN';
                if (door) { door.textContent = '🚪 KHÔNG! (Đóng sập)'; door.style.color = '#f43f5e'; }
                if (lbl) lbl.textContent = 'Phản ứng: Từ chối ngay lập tức!';
                if (statusTag) {
                    statusTag.textContent = 'Thỏa hiệp: 0% (Từ chối)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BƯỚC 2: HẠ YÊU CẦU NHỎ';
                if (door) {
                    door.textContent = '🤝 ĐỒNG Ý! (Mở cửa)';
                    door.style.color = '#10b981';
                }
                if (lbl) lbl.textContent = 'Phản ứng: Quyên góp 50k (Đồng ý)';
                if (statusTag) {
                    statusTag.textContent = 'Thỏa hiệp: 90% (Quy luật đối ứng)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo54_4') {
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
        else if (slideId === 'slide_memo54_5') {
            const box = canvas.querySelector('.takeaway-box-v54');
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
        scriptName: 'video54',
        topic: 'Door-in-the-Face',
        episodeNum: 54,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 54 Plugin] Loaded: Từ chối trước.');
})();
