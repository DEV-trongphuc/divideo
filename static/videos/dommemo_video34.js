/**
 * DOM Memo Video 34: Đọc chữ thiếu nét (Typoglycemia)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo34_1": [
                {
                        "text": "Ký tự bị đảo lộn",
                        "start": 3.5,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "vẫn hiểu rõ ràng",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo34_2": [
                {
                        "text": "không quét từng chữ cái",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "nhận diện hình dáng cả từ",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo34_3": [
                {
                        "text": "thuật toán phân tích của bộ não",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                },
                {
                        "text": "tự điền phần khuyết",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo34_4": [
                {
                        "text": "máy tính báo lỗi chính tả",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "suy luận tối ưu hóa",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo34_5": [
                {
                        "text": "tự vẽ ra thực tế",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo34_1', 'slide_memo34_2', 'slide_memo34_3', 'slide_memo34_4', 'slide_memo34_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo34_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo34-1-container">
                        <span class="ambient-sleep-particle-v34" style="top: 15%; left: 8%; animation-delay: -1s;">👁️</span>
                        <span class="ambient-sleep-particle-v34" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v34" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="scrambled-text-v34">Nã0 bạ n khôg cầ n</div>
                <div class="scanner-bar-v34"></div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo34_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo34-2-container">
                        <span class="ambient-sleep-particle-v34" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v34" style="top: 82%; left: 10%; animation-delay: -4s;">👁️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v34 node-1">
                                <span class="diagram-node-icon">👁️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v34 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v34 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Đọc chữ thiếu nét*: Hiện tượng này gọi là Typoglycemia. Bộ não không quét từng chữ cái riêng biệt mà nhận diện hình dáng cả từ và dùng ngữ cảnh để dự đoán từ tiếp theo.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo34_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo34-3-container">
                        <span class="ambient-sleep-particle-v34" style="top: 10%; left: 15%; animation-delay: -1s;">👁️</span>
                        <span class="ambient-sleep-particle-v34" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v34">
                <div class="state-indicator-badge rested">BỘ QUÉT CHỮ NÃO BỘ</div>
                <div class="scanning-word">Nã0 bạ n khôg cầ n...</div>
                <div class="interpretation-lbl">Chữ gốc bị lỗi</div>
            </div>
            <div class="amygdala-dashboard-v34">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    PHÂN TÍCH QUY NẠP
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Kết quả dự đoán</span>
                    <span class="amygdala-status-badge calm">Khớp 100%</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Chỉ cần chữ cái đầu và cuối của từ nằm đúng vị trí, não bộ có thể đoán đúng nghĩa dựa trên kho từ vựng tích lũy.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo34_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo34-4-container">
                        <span class="ambient-sleep-particle-v34" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v34" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v34">
                            <div class="comp-card-v34 card-left card-active">
                                <div class="comp-header-v34">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v34">👁️</div>
                                </div>
                                <div class="comp-bullet-list-v34">
                                    <div class="comp-bullet-row-v34" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v34">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v34" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v34">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v34">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v34 card-right card-inactive">
                                <div class="comp-header-v34">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v34">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v34">
                                    <div class="comp-bullet-row-v34" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v34">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v34" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v34">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v34">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo34_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo34-5-container">
                        <div class="takeaway-radar-v34"></div>
                        <div class="takeaway-box-v34" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v34">👁️</div>
                            <div class="takeaway-text-v34">
                                "Bộ não của bạn liên tục phán đoán và tự vẽ ra thực tế chứ không chỉ tiếp nhận thông tin thụ động từ đôi mắt!"
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
        if (slideId === 'slide_memo34_1') {
            const bar = canvas.querySelector('.scanner-bar-v34');
            const text = canvas.querySelector('.scrambled-text-v34');
            if (bar && text) {
                bar.style.transform = 'translateY(' + (Math.sin(progress * 10) * 100) + 'px)';
                if (progress > 0.45) {
                    text.textContent = 'Não bạn không cần';
                    text.style.color = 'var(--memo34-lime)';
                } else {
                    text.textContent = 'Nã0 bạ n khôg cầ n';
                    text.style.color = '#fff';
                }
            }
        }
        else if (slideId === 'slide_memo34_2') {
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
        else if (slideId === 'slide_memo34_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const word = canvas.querySelector('.scanning-word');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TÍN HIỆU: ĐẦU VÀO MẮT';
                if (word) { word.textContent = 'Nã0 bạ n khôg cầ n'; word.style.color = '#06b6d4'; }
                if (lbl) lbl.textContent = 'Ý nghĩa thô: Ký tự xáo trộn nét';
                if (statusTag) {
                    statusTag.textContent = 'Độ chính xác: 40%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TÍN HIỆU: SAU KHI NÃO DỊCH';
                if (word) {
                    word.textContent = 'Não bạn không cần';
                    word.style.color = '#84cc16';
                }
                if (lbl) lbl.textContent = 'Ý nghĩa dịch: Não bạn không cần...';
                if (statusTag) {
                    statusTag.textContent = 'Độ chính xác: 100% (Khớp)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo34_4') {
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
        else if (slideId === 'slide_memo34_5') {
            const box = canvas.querySelector('.takeaway-box-v34');
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
        scriptName: 'video34',
        topic: 'Typoglycemia',
        episodeNum: 34,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 34 Plugin] Loaded: Đọc chữ thiếu nét.');
})();
