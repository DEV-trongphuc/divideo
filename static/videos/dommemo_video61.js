/**
 * DOM Memo Video 61: Ảo giác Müller-Lyer (Müller-Lyer Illusion)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo61_1": [
                {
                        "text": "hai đường thẳng nằm song song",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "một đường dài hơn",
                        "start": 4.5,
                        "end": 7.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo61_2": [
                {
                        "text": "Ảo giác Müller-Lyer",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "chỉ báo chiều sâu xa gần",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo61_3": [
                {
                        "text": "chiều dài cảm nhận co giãn giả tạo",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "thước đo thực tế chứng minh bằng nhau",
                        "start": 6.0,
                        "end": 9.5,
                        "class": "active-green"
                }
        ],
        "slide_memo61_4": [
                {
                        "text": "bị đánh lừa bởi bối cảnh",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "kết quả chính xác, bất biến",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-green"
                }
        ],
        "slide_memo61_5": [
                {
                        "text": "công cụ đo lường khách quan",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo61_1', 'slide_memo61_2', 'slide_memo61_3', 'slide_memo61_4', 'slide_memo61_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo61_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo61-1-container">
                        <span class="ambient-sleep-particle-v61" style="top: 15%; left: 8%; animation-delay: -1s;">↔️</span>
                        <span class="ambient-sleep-particle-v61" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v61" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="illusion-arrow-v61">↔️</div>
                <div class="line-ruler-v61">📏 📐 📏</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo61_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo61-2-container">
                        <span class="ambient-sleep-particle-v61" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v61" style="top: 82%; left: 10%; animation-delay: -4s;">↔️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v61 node-1">
                                <span class="diagram-node-icon">↔️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v61 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v61 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác Müller-Lyer*: Đó chính là Ảo giác Müller-Lyer. Bộ não của bạn tự động diễn dịch các góc nhọn của mũi tên thành các chỉ báo chiều sâu xa gần trong không gian 3D, bóp méo nhận thức độ dài thực tế.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo61_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo61-3-container">
                        <span class="ambient-sleep-particle-v61" style="top: 10%; left: 15%; animation-delay: -1s;">↔️</span>
                        <span class="ambient-sleep-particle-v61" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v61">
                <div class="state-indicator-badge rested">ĐO LƯỜNG ĐỘ DÀI</div>
                <div class="lines-container">
                    <div class="test-line line-a">⬅️══➡️</div>
                    <div class="test-line line-b">➡️══⬅️</div>
                </div>
                <div class="interpretation-lbl">Mắt thấy: Hai đường bằng nhau</div>
            </div>
            <div class="amygdala-dashboard-v61">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    LỆCH PHA KÍCH THƯỚC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Sai lệch cảm nhận</span>
                    <span class="amygdala-status-badge calm">Không lệch (0%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ liên hệ các đường hướng ra ngoài với góc tường xa, và các góc hướng vào trong với góc tường gần.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo61_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo61-4-container">
                        <span class="ambient-sleep-particle-v61" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v61" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v61">
                            <div class="comp-card-v61 card-left card-active">
                                <div class="comp-header-v61">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v61">↔️</div>
                                </div>
                                <div class="comp-bullet-list-v61">
                                    <div class="comp-bullet-row-v61" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v61">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v61" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v61">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v61">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v61 card-right card-inactive">
                                <div class="comp-header-v61">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v61">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v61">
                                    <div class="comp-bullet-row-v61" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v61">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v61" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v61">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v61">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo61_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo61-5-container">
                        <div class="takeaway-radar-v61"></div>
                        <div class="takeaway-box-v61" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v61">↔️</div>
                            <div class="takeaway-text-v61">
                                "Hãy luôn xác thực thông tin bằng các công cụ đo lường khách quan. Đừng chỉ tin vào những gì mắt bạn trực tiếp nhìn thấy!"
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
        if (slideId === 'slide_memo61_1') {
            const arrow = canvas.querySelector('.illusion-arrow-v61');
            const ruler = canvas.querySelector('.line-ruler-v61');
            if (arrow && ruler) {
                if (progress > 0.45) {
                    arrow.style.transform = 'scaleX(1.8) scaleY(1.2)';
                    arrow.style.color = 'var(--memo61-primary)';
                    ruler.style.transform = 'translateY(20px)';
                    ruler.style.opacity = '1';
                } else {
                    arrow.style.transform = 'scaleX(1) scaleY(1)';
                    arrow.style.color = '#fff';
                    ruler.style.transform = 'translateY(0)';
                    ruler.style.opacity = '0.3';
                }
            }
        }
        else if (slideId === 'slide_memo61_2') {
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
        else if (slideId === 'slide_memo61_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const lineA = canvas.querySelector('.line-a');
            const lineB = canvas.querySelector('.line-b');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: KHÔNG CÓ BỐI CẢNH ẢO GIÁC';
                if (lineA) { lineA.textContent = '═══ (Dài 10cm)'; lineA.style.color = '#fff'; }
                if (lineB) { lineB.textContent = '═══ (Dài 10cm)'; lineB.style.color = '#fff'; }
                if (lbl) lbl.textContent = 'Đánh giá: Hai đoạn thẳng hiển thị bằng nhau';
                if (statusTag) {
                    statusTag.textContent = 'Sai lệch: 0% (Chính xác)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: CÓ ĐUÔI MŨI TÊN MÜLLER';
                if (lineA) {
                    lineA.textContent = '⬅️═══➡️ (Trông ngắn hơn)';
                    lineA.style.color = '#10b981';
                }
                if (lineB) {
                    lineB.textContent = '➡️═══⬅️ (Trông dài hơn!)';
                    lineB.style.color = '#0ea5e9';
                }
                if (lbl) lbl.textContent = 'Ảo giác: Bạn thề rằng đoạn B dài gấp rưỡi đoạn A!';
                if (statusTag) {
                    statusTag.textContent = 'Sai lệch: +30% (Ảo giác)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo61_4') {
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
        else if (slideId === 'slide_memo61_5') {
            const box = canvas.querySelector('.takeaway-box-v61');
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
        scriptName: 'video61',
        topic: 'Müller-Lyer Illusion',
        episodeNum: 61,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 61 Plugin] Loaded: Ảo giác Müller-Lyer.');
})();
