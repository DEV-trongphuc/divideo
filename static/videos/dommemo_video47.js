/**
 * DOM Memo Video 47: Hiệu ứng Tetris (Tetris Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo47_1": [
                {
                        "text": "chơi game xếp gạch Tetris",
                        "start": 1.0,
                        "end": 4.0,
                        "class": "active-violet"
                },
                {
                        "text": "vẫn thấy các khối gạch rơi xuống",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo47_2": [
                {
                        "text": "Hiệu ứng Tetris",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "bộ lọc thói quen nhận thức",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo47_3": [
                {
                        "text": "khối gạch thần kinh",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "chiếm dụng toàn bộ sóng não",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo47_4": [
                {
                        "text": "tư duy linh hoạt và đa dạng",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "kẹt trong một thuật toán",
                        "start": 5.0,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo47_5": [
                {
                        "text": "cho bộ não nghỉ ngơi sau mỗi 45 phút",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo47_1', 'slide_memo47_2', 'slide_memo47_3', 'slide_memo47_4', 'slide_memo47_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo47_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo47-1-container">
                        <span class="ambient-sleep-particle-v47" style="top: 15%; left: 8%; animation-delay: -1s;">🧱</span>
                        <span class="ambient-sleep-particle-v47" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v47" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="falling-blocks-v47">🧱 🧩 🧱</div>
                <div class="dreaming-head-v47">😴</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo47_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo47-2-container">
                        <span class="ambient-sleep-particle-v47" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v47" style="top: 82%; left: 10%; animation-delay: -4s;">🧱</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v47 node-1">
                                <span class="diagram-node-icon">🧱</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v47 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v47 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Tetris*: Đó là do Hiệu ứng Tetris. Khi bạn lặp đi lặp lại một mẫu hành động quá nhiều, bộ não sẽ tự động chuyển nó vào bộ lọc thói quen nhận thức và tiếp tục xử lý ngay cả khi bạn ngủ.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo47_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo47-3-container">
                        <span class="ambient-sleep-particle-v47" style="top: 10%; left: 15%; animation-delay: -1s;">🧱</span>
                        <span class="ambient-sleep-particle-v47" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v47">
                <div class="state-indicator-badge rested">GIẢ LẬP SÓNG NÃO</div>
                <div class="tetris-box">
                    <span class="block b-1">🧱</span>
                    <span class="block b-2">🧱</span>
                </div>
                <div class="interpretation-lbl">Suy nghĩ: Trống rỗng</div>
            </div>
            <div class="amygdala-dashboard-v47">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ẢO ẢNH HÀNH VI
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số lặp lại</span>
                    <span class="amygdala-status-badge calm">BÌNH THƯỜNG (0%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự củng cố synap thần kinh liên tục tạo ra thói quen nhận thức mạnh mẽ, làm suy yếu sự linh hoạt của não bộ.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo47_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo47-4-container">
                        <span class="ambient-sleep-particle-v47" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v47" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v47">
                            <div class="comp-card-v47 card-left card-active">
                                <div class="comp-header-v47">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v47">🧱</div>
                                </div>
                                <div class="comp-bullet-list-v47">
                                    <div class="comp-bullet-row-v47" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v47">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v47" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v47">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v47">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v47 card-right card-inactive">
                                <div class="comp-header-v47">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v47">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v47">
                                    <div class="comp-bullet-row-v47" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v47">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v47" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v47">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v47">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo47_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo47-5-container">
                        <div class="takeaway-radar-v47"></div>
                        <div class="takeaway-box-v47" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v47">🧱</div>
                            <div class="takeaway-text-v47">
                                "Hãy cho bộ não nghỉ ngơi sau mỗi 45 phút làm việc lặp lại. Đừng để những khối gạch ảo xây kín thời gian nghỉ ngơi của bạn!"
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
        if (slideId === 'slide_memo47_1') {
            const blocks = canvas.querySelector('.falling-blocks-v47');
            const head = canvas.querySelector('.dreaming-head-v47');
            if (blocks && head) {
                if (progress > 0.45) {
                    blocks.style.transform = 'translateY(120px) scale(1.3)';
                    head.style.transform = 'scale(1.3)';
                    head.textContent = '🤯';
                } else {
                    blocks.style.transform = 'translateY(0) scale(1)';
                    head.style.transform = 'scale(1)';
                    head.textContent = '😴';
                }
            }
        }
        else if (slideId === 'slide_memo47_2') {
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
        else if (slideId === 'slide_memo47_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const blocks = canvas.querySelectorAll('.block');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TRẠNG THÁI: NÃO NGHỈ NGƠI';
                blocks.forEach(b => { b.style.transform = 'translateY(-20px)'; b.style.opacity = '0.1'; });
                if (lbl) lbl.textContent = 'Suy nghĩ: Tự do, không bị kẹt thói quen';
                if (statusTag) {
                    statusTag.textContent = 'Chỉ số lặp: 0% (Tự do)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRẠNG THÁI: HIỆU ỨNG TETRIS';
                blocks.forEach((b, idx) => {
                    b.style.transform = 'translateY(' + (30 + idx * 20) + 'px)';
                    b.style.opacity = '1';
                });
                if (lbl) lbl.textContent = 'Suy nghĩ: Các khối gạch ảo liên tục rơi 🧱';
                if (statusTag) {
                    statusTag.textContent = 'Chỉ số lặp: 95% (Bị kẹt)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo47_4') {
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
        else if (slideId === 'slide_memo47_5') {
            const box = canvas.querySelector('.takeaway-box-v47');
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
        scriptName: 'video47',
        topic: 'Tetris Effect',
        episodeNum: 47,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 47 Plugin] Loaded: Hiệu ứng Tetris.');
})();
