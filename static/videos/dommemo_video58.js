/**
 * DOM Memo Video 58: Mù lựa chọn (Choice Blindness)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo58_1": [
                {
                        "text": "tráo đổi thành khuôn mặt B",
                        "start": 3.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "say sưa giải thích lý do thích B",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo58_2": [
                {
                        "text": "Sự Mù Lựa Chọn",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "hợp lý hóa mọi chuyện",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo58_3": [
                {
                        "text": "bức ảnh bị đánh tráo",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "kích hoạt cơ chế tự biện hộ",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo58_4": [
                {
                        "text": "nhận thức lỏng lẻo",
                        "start": 4.0,
                        "end": 7.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo58_5": [
                {
                        "text": "bảo vệ cái tôi bướng bỉnh",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo58_1', 'slide_memo58_2', 'slide_memo58_3', 'slide_memo58_4', 'slide_memo58_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo58_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo58-1-container">
                        <span class="ambient-sleep-particle-v58" style="top: 15%; left: 8%; animation-delay: -1s;">🎭</span>
                        <span class="ambient-sleep-particle-v58" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v58" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="card-box-v58">🃏</div>
                <div class="face-swapped-v58">🙂 ➡️ 🙁</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo58_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo58-2-container">
                        <span class="ambient-sleep-particle-v58" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v58" style="top: 82%; left: 10%; animation-delay: -4s;">🎭</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v58 node-1">
                                <span class="diagram-node-icon">🎭</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v58 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v58 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Mù lựa chọn*: Hiện tượng này gọi là Sự Mù Lựa Chọn. Bộ não rất giỏi hợp lý hóa mọi chuyện sau khi nó diễn ra, tự động bịa ra lý do biện hộ để giữ sự nhất quán trong nhận thức.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo58_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo58-3-container">
                        <span class="ambient-sleep-particle-v58" style="top: 10%; left: 15%; animation-delay: -1s;">🎭</span>
                        <span class="ambient-sleep-particle-v58" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v58">
                <div class="state-indicator-badge rested">ĐÁNH TRÁO LỰA CHỌN</div>
                <div class="card-swap-scene">
                    <span class="swapped-card">🙂</span>
                </div>
                <div class="interpretation-lbl">Lý do chọn: "Mặt cười thân thiện"</div>
            </div>
            <div class="amygdala-dashboard-v58">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    BIỆN HỘ CẢM XÚC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số nhất quán</span>
                    <span class="amygdala-status-badge calm">100% (Không đổi)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Choice Blindness vạch trần việc chúng ta đưa ra quyết định mà không hề có nhận thức sâu sắc về nguyên nhân thực tế.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo58_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo58-4-container">
                        <span class="ambient-sleep-particle-v58" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v58" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v58">
                            <div class="comp-card-v58 card-left card-active">
                                <div class="comp-header-v58">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v58">🎭</div>
                                </div>
                                <div class="comp-bullet-list-v58">
                                    <div class="comp-bullet-row-v58" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v58">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v58" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v58">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v58">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v58 card-right card-inactive">
                                <div class="comp-header-v58">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v58">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v58">
                                    <div class="comp-bullet-row-v58" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v58">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v58" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v58">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v58">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo58_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo58-5-container">
                        <div class="takeaway-radar-v58"></div>
                        <div class="takeaway-box-v58" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v58">🎭</div>
                            <div class="takeaway-text-v58">
                                "Hãy nhớ rằng đôi khi chúng ta chỉ đang cố bảo vệ cái tôi bướng bỉnh chứ không thực sự lựa chọn phương án đó ngay từ đầu!"
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
        if (slideId === 'slide_memo58_1') {
            const card = canvas.querySelector('.card-box-v58');
            const face = canvas.querySelector('.face-swapped-v58');
            if (card && face) {
                if (progress > 0.45) {
                    card.style.transform = 'scale(1.3) rotate(180deg)';
                    face.style.color = 'var(--memo58-secondary)';
                    face.textContent = '🙁 (Mù Lựa Chọn)';
                } else {
                    card.style.transform = 'scale(1) rotate(0deg)';
                    face.style.color = '#fff';
                    face.textContent = '🙂 ➡️ 🙁';
                }
            }
        }
        else if (slideId === 'slide_memo58_2') {
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
        else if (slideId === 'slide_memo58_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const card = canvas.querySelector('.swapped-card');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: LỰA CHỌN GỐC';
                if (card) { card.textContent = '🙂'; card.style.transform = 'scale(1)'; }
                if (lbl) lbl.textContent = 'Lý do: "Tôi chọn vì nụ cười rạng rỡ"';
                if (statusTag) {
                    statusTag.textContent = 'Biện hộ: Tự nhiên';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: SAU KHI TRÁO BÀI!';
                if (card) {
                    card.textContent = '🙁';
                    card.style.transform = 'scale(1.2) rotate(10deg)';
                }
                if (lbl) lbl.textContent = 'Lý do bịa ra: "Tôi thích sự trầm tư sâu sắc của mặt này"';
                if (statusTag) {
                    statusTag.textContent = 'Biện hộ: 99% (Bịa lý do giữ thể diện)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo58_4') {
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
        else if (slideId === 'slide_memo58_5') {
            const box = canvas.querySelector('.takeaway-box-v58');
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
        scriptName: 'video58',
        topic: 'Choice Blindness',
        episodeNum: 58,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 58 Plugin] Loaded: Mù lựa chọn.');
})();
