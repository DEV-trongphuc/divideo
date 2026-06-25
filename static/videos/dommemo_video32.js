/**
 * DOM Memo Video 32: Nhớ nhạc quên lời (Music Memory)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo32_1": [
                {
                        "text": "ngân nga hoàn hảo nhạc",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "lời ca thì không tài nào nhớ nổi",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo32_2": [
                {
                        "text": "xử lý ở bán cầu não phải và hệ viền",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                },
                {
                        "text": "bền bỉ hơn rất nhiều",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo32_3": [
                {
                        "text": "vùng cảm nhận nhịp điệu sáng rực",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "vùng lưu từ vựng bị lu mờ",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo32_4": [
                {
                        "text": "phản xạ cơ thể và cảm xúc",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "dễ bị xóa sạch",
                        "start": 5.0,
                        "end": 7.8,
                        "class": "active-violet"
                }
        ],
        "slide_memo32_5": [
                {
                        "text": "lời ca có thể phai nhạt",
                        "start": 1.0,
                        "end": 3.5,
                        "class": "active-violet"
                },
                {
                        "text": "giữ nguyên vẹn cảm xúc",
                        "start": 4.0,
                        "end": 7.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo32_1', 'slide_memo32_2', 'slide_memo32_3', 'slide_memo32_4', 'slide_memo32_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo32_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo32-1-container">
                        <span class="ambient-sleep-particle-v32" style="top: 15%; left: 8%; animation-delay: -1s;">🎵</span>
                        <span class="ambient-sleep-particle-v32" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v32" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="glowing-note-v32">🎵</div>
                <div class="falling-letters-v32">A B C X Y Z</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo32_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo32-2-container">
                        <span class="ambient-sleep-particle-v32" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v32" style="top: 82%; left: 10%; animation-delay: -4s;">🎵</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v32 node-1">
                                <span class="diagram-node-icon">🎵</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v32 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v32 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Nhớ nhạc quên lời*: Đó là vì giai điệu, nhịp điệu và cảm xúc được xử lý ở bán cầu não phải và hệ viền, có cấu trúc lưu trữ nguyên thủy, bền bỉ hơn rất nhiều so với vùng ngôn ngữ ở bán cầu trái.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo32_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo32-3-container">
                        <span class="ambient-sleep-particle-v32" style="top: 10%; left: 15%; animation-delay: -1s;">🎵</span>
                        <span class="ambient-sleep-particle-v32" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v32">
                <div class="state-indicator-badge rested">HOẠT ĐỘNG HAI BÁN CẦU</div>
                <div class="music-wave-container">
                    <span class="music-note-v32">🎵</span>
                </div>
                <div class="interpretation-lbl">Giai điệu: Hồi tưởng 99%</div>
            </div>
            <div class="amygdala-dashboard-v32">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    BỘ NHỚ NGÔN NGỮ VS NHẠC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Trí nhớ chữ viết (Left)</span>
                    <span class="amygdala-status-badge calm">20% (Suy Giảm)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Nghiên cứu fMRI cho thấy âm nhạc kích hoạt cả vỏ não vận động và cảm xúc nên ký ức âm thanh cực kỳ sâu sắc.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo32_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo32-4-container">
                        <span class="ambient-sleep-particle-v32" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v32" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v32">
                            <div class="comp-card-v32 card-left card-active">
                                <div class="comp-header-v32">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v32">🎵</div>
                                </div>
                                <div class="comp-bullet-list-v32">
                                    <div class="comp-bullet-row-v32" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v32">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v32" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v32">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v32">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v32 card-right card-inactive">
                                <div class="comp-header-v32">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v32">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v32">
                                    <div class="comp-bullet-row-v32" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v32">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v32" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v32">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v32">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo32_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo32-5-container">
                        <div class="takeaway-radar-v32"></div>
                        <div class="takeaway-box-v32" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v32">🎵</div>
                            <div class="takeaway-text-v32">
                                "Lời ca có thể phai nhạt theo năm tháng, nhưng giai điệu cũ vẫn giữ nguyên vẹn cảm xúc của lần đầu tiên bạn nghe thấy nó!"
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
        if (slideId === 'slide_memo32_1') {
            const note = canvas.querySelector('.glowing-note-v32');
            const letters = canvas.querySelector('.falling-letters-v32');
            if (note && letters) {
                if (progress > 0.45) {
                    note.style.transform = 'scale(2.2)';
                    letters.style.transform = 'translateY(100px)';
                    letters.style.opacity = '0.1';
                } else {
                    note.style.transform = 'scale(1)';
                    letters.style.transform = 'translateY(0)';
                    letters.style.opacity = '0.8';
                }
            }
        }
        else if (slideId === 'slide_memo32_2') {
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
        else if (slideId === 'slide_memo32_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const note = canvas.querySelector('.music-note-v32');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'PHÂN TÍCH: NGHE GIAI ĐIỆU';
                if (note) { note.style.transform = 'scale(1.5) rotate(0deg)'; note.style.color = '#ec4899'; }
                if (lbl) lbl.textContent = 'Giai điệu: Cảm nhận trọn vẹn 💖 (Bán cầu phải)';
                if (statusTag) {
                    statusTag.textContent = 'Trí nhớ nhạc: 95%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'PHÂN TÍCH: NHỚ LỜI CA';
                if (note) { note.style.transform = 'scale(0.8) rotate(45deg)'; note.style.color = 'rgba(255,255,255,0.2)'; }
                if (lbl) lbl.textContent = 'Lời ca: Quên gần hết ❓ (Bán cầu trái)';
                if (statusTag) {
                    statusTag.textContent = 'Trí nhớ chữ: 15%';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo32_4') {
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
        else if (slideId === 'slide_memo32_5') {
            const box = canvas.querySelector('.takeaway-box-v32');
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
        scriptName: 'video32',
        topic: 'Music Memory',
        episodeNum: 32,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 32 Plugin] Loaded: Nhớ nhạc quên lời.');
})();
