/**
 * DOM Memo Video 43: Nghe nhầm chắc chắn (Auditory Guessing)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo43_1": [
                {
                        "text": "nghe rất chắc chắn thành một nẻo",
                        "start": 3.5,
                        "end": 6.5,
                        "class": "active-violet"
                },
                {
                        "text": "cãi bằng được",
                        "start": 7.0,
                        "end": 9.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo43_2": [
                {
                        "text": "không ghi âm như máy ghi âm",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "dùng bối cảnh và kỳ vọng để tự điền",
                        "start": 5.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo43_3": [
                {
                        "text": "tự động phán đoán",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "dịch thành 'Ăn chửi'",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo43_4": [
                {
                        "text": "đòi hỏi âm thanh sạch",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "dựa trên kịch bản sẵn có",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo43_5": [
                {
                        "text": "nghe bằng dự đoán của não",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo43_1', 'slide_memo43_2', 'slide_memo43_3', 'slide_memo43_4', 'slide_memo43_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo43_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo43-1-container">
                        <span class="ambient-sleep-particle-v43" style="top: 15%; left: 8%; animation-delay: -1s;">👂</span>
                        <span class="ambient-sleep-particle-v43" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v43" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="ear-actor-v43">👂</div>
                <div class="muddled-words-v43">??? ➡️ BƯỞI hay CHỬI?</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo43_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo43-2-container">
                        <span class="ambient-sleep-particle-v43" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v43" style="top: 82%; left: 10%; animation-delay: -4s;">👂</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v43 node-1">
                                <span class="diagram-node-icon">👂</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v43 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v43 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nghe nhầm chắc chắn*: Sự thật là tai không ghi âm như máy ghi âm. Khi âm thanh bị ồn, nói nhanh hoặc thiếu nét, não sẽ dùng bối cảnh và kỳ vọng để tự điền từ còn thiếu.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo43_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo43-3-container">
                        <span class="ambient-sleep-particle-v43" style="top: 10%; left: 15%; animation-delay: -1s;">👂</span>
                        <span class="ambient-sleep-particle-v43" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v43">
                <div class="state-indicator-badge rested">GIẢI MÃ THÍNH GIÁC</div>
                <div class="muffled-audio">📢 (Nhiễu sóng)</div>
                <div class="interpretation-lbl">Từ nói gốc: Ăn bưởi 🍊</div>
            </div>
            <div class="amygdala-dashboard-v43">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    DỰ ĐOÁN PHÂN TÍCH
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Kết quả dịch nghĩa</span>
                    <span class="amygdala-status-badge calm">Ăn Bưởi (98%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Khi tiếp nhận âm thanh không rõ, não thực hiện suy luận kiểu Bayes để tìm từ có xác suất xuất hiện cao nhất.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo43_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo43-4-container">
                        <span class="ambient-sleep-particle-v43" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v43" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v43">
                            <div class="comp-card-v43 card-left card-active">
                                <div class="comp-header-v43">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v43">👂</div>
                                </div>
                                <div class="comp-bullet-list-v43">
                                    <div class="comp-bullet-row-v43" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v43">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v43" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v43">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v43">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v43 card-right card-inactive">
                                <div class="comp-header-v43">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v43">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v43">
                                    <div class="comp-bullet-row-v43" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v43">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v43" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v43">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v43">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo43_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo43-5-container">
                        <div class="takeaway-radar-v43"></div>
                        <div class="takeaway-box-v43" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v43">👂</div>
                            <div class="takeaway-text-v43">
                                "Lần tới nếu thấy câu nói của ai đó kỳ lạ hoặc gây hấn, hãy hỏi lại cho kỹ. Bạn đang nghe bằng dự đoán của não chứ không chỉ bằng tai đâu!"
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
        if (slideId === 'slide_memo43_1') {
            const ear = canvas.querySelector('.ear-actor-v43');
            const words = canvas.querySelector('.muddled-words-v43');
            if (ear && words) {
                if (progress > 0.45) {
                    ear.style.transform = 'scale(1.4) rotate(10deg)';
                    words.textContent = 'ĂN CHỬI?! 😡';
                    words.style.color = 'var(--memo43-secondary)';
                } else {
                    ear.style.transform = 'scale(1) rotate(0deg)';
                    words.textContent = '??? ➡️ BƯỞI hay CHỬI?';
                    words.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo43_2') {
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
        else if (slideId === 'slide_memo43_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const audio = canvas.querySelector('.muffled-audio');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'GIAI ĐOẠN 1: ÂM THANH RÕ';
                if (audio) { audio.textContent = '📢 Ăn bưởi'; audio.style.color = '#fff'; }
                if (lbl) lbl.textContent = 'Gốc: Bạn nói rủ đi Ăn Bưởi';
                if (statusTag) {
                    statusTag.textContent = 'Độ chính xác: 98% (Thực tế)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'GIAI ĐOẠN 2: BỊ TIẾNG ỒN CHÈN';
                if (audio) {
                    audio.textContent = '📢 Ăn chửi?! 💢';
                    audio.style.color = '#f43f5e';
                }
                if (lbl) lbl.textContent = 'Não tự đoán: Họ bảo mình đi Ăn Chửi!';
                if (statusTag) {
                    statusTag.textContent = 'Độ chính xác: 15% (Lỗi Dự Đoán)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo43_4') {
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
        else if (slideId === 'slide_memo43_5') {
            const box = canvas.querySelector('.takeaway-box-v43');
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
        scriptName: 'video43',
        topic: 'Auditory Guessing',
        episodeNum: 43,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 43 Plugin] Loaded: Nghe nhầm chắc chắn.');
})();
