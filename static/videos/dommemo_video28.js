/**
 * DOM Memo Video 28: Hiệu ứng Cocktail (Cocktail Party)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo28_1": [
                {
                        "text": "chỉ cần ai đó gọi tên bạn",
                        "start": 4.5,
                        "end": 7.5,
                        "class": "active-green"
                },
                {
                        "text": "quay lại ngay",
                        "start": 8.0,
                        "end": 10.5,
                        "class": "active-violet"
                }
        ],
        "slide_memo28_2": [
                {
                        "text": "không xử lý mọi âm thanh như nhau",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-violet"
                },
                {
                        "text": "lọc bỏ các tạp âm",
                        "start": 6.0,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo28_3": [
                {
                        "text": "tiếng nói chuyện mờ nhạt",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-violet"
                },
                {
                        "text": "gọi tên bạn",
                        "start": 5.5,
                        "end": 8.5,
                        "class": "active-green"
                },
                {
                        "text": "radar nhận thức lập tức bùng nổ",
                        "start": 9.0,
                        "end": 12.0,
                        "class": "active-green"
                }
        ],
        "slide_memo28_4": [
                {
                        "text": "mờ đi và liệt vào danh sách an toàn",
                        "start": 1.5,
                        "end": 5.0,
                        "class": "active-violet"
                },
                {
                        "text": "lập tức xuyên qua bộ lọc",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-green"
                }
        ],
        "slide_memo28_5": [
                {
                        "text": "âm thầm lắng nghe",
                        "start": 2.0,
                        "end": 5.0,
                        "class": "active-green"
                },
                {
                        "text": "tìm kiếm thứ quan trọng nhất",
                        "start": 5.5,
                        "end": 9.0,
                        "class": "active-violet"
                }
        ]
};

    const customSlideIds = [
        'slide_memo28_1', 'slide_memo28_2', 'slide_memo28_3', 'slide_memo28_4', 'slide_memo28_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo28_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo28-1-container">
                        <span class="ambient-sleep-particle-v28" style="top: 15%; left: 8%; animation-delay: -1s;">🔊</span>
                        <span class="ambient-sleep-particle-v28" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v28" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="crowd-noise-v28">💬 🎙️ 🗣️ 💬</div>
                <div class="name-badge-v28">✨ HẢI ƠI! ✨</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo28_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo28-2-container">
                        <span class="ambient-sleep-particle-v28" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v28" style="top: 82%; left: 10%; animation-delay: -4s;">🔊</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v28 node-1">
                                <span class="diagram-node-icon">🔊</span>
                                <span>1. Tạp âm ồn ào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v28 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Bộ lọc lưới RAS</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v28 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nghe thấy tên riêng</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Cocktail*: Đó là nhờ Hiệu ứng Tiệc Cocktail. Bộ não không xử lý mọi âm thanh như nhau, nó lọc bỏ các tạp âm và ưu tiên những tín hiệu liên quan trực tiếp đến sự sinh tồn của bạn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo28_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo28-3-container">
                        <span class="ambient-sleep-particle-v28" style="top: 10%; left: 15%; animation-delay: -1s;">🔊</span>
                        <span class="ambient-sleep-particle-v28" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v28">
                <div class="state-indicator-badge rested">PHÂN TÍCH ÂM THANH</div>
                <div class="audio-waves">
                    <div class="wave-bar w-1"></div>
                    <div class="wave-bar w-2"></div>
                    <div class="wave-bar w-3"></div>
                </div>
                <div class="detected-word">Tạp âm xì xào...</div>
            </div>
            <div class="amygdala-dashboard-v28">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    BỘ LỌC CHÚ Ý (RAS)
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Độ khuếch đại</span>
                    <span class="amygdala-status-badge calm">10% (THẤP)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Hệ kích hoạt lưới (RAS) chặn đứng 99% âm thanh vô nghĩa để tránh cho vỏ não bị quá tải thông tin.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo28_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo28-4-container">
                        <span class="ambient-sleep-particle-v28" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v28" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v28">
                            <div class="comp-card-v28 card-left card-active">
                                <div class="comp-header-v28">
                                    <h3>Lọc Tạp Âm</h3>
                                    <div class="comp-icon-v28">🔊</div>
                                </div>
                                <div class="comp-bullet-list-v28">
                                    <div class="comp-bullet-row-v28" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v28">✨</span>
                                        <span>Chặn đứng tạp âm vô nghĩa</span>
                                    </div>
                                    <div class="comp-bullet-row-v28" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v28">✨</span>
                                        <span>Tránh quá tải vỏ não</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v28">BÌNH THƯỜNG</div>
                            </div>

                            <div class="comp-card-v28 card-right card-inactive">
                                <div class="comp-header-v28">
                                    <h3>Từ Khóa Nhạy Cảm</h3>
                                    <div class="comp-icon-v28">✨</div>
                                </div>
                                <div class="comp-bullet-list-v28">
                                    <div class="comp-bullet-row-v28" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v28">❌</span>
                                        <span>Ưu tiên tên riêng, cảnh báo</span>
                                    </div>
                                    <div class="comp-bullet-row-v28" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v28">❌</span>
                                        <span>Lập tức xuyên qua bộ lọc</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v28">BÙNG NỔ</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo28_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo28-5-container">
                        <div class="takeaway-radar-v28"></div>
                        <div class="takeaway-box-v28" style="transform: scale(0.9); opacity: 0; margin-top: 160px;">
                            <div class="takeaway-face-v28">🔊</div>
                            <div class="takeaway-text-v28">
                                "Tóm lại, giữa cả trăm âm thanh xáo trộn, bộ não của bạn vẫn đang âm thầm lắng nghe và tìm kiếm thứ quan trọng nhất: chính là bạn!"
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
        if (slideId === 'slide_memo28_1') {
            const crowd = canvas.querySelector('.crowd-noise-v28');
            const name = canvas.querySelector('.name-badge-v28');
            if (crowd && name) {
                if (progress > 0.45) {
                    crowd.style.opacity = '0.1';
                    name.style.transform = 'scale(1.4)';
                    name.style.opacity = '1';
                } else {
                    crowd.style.opacity = '0.8';
                    name.style.transform = 'scale(0.8)';
                    name.style.opacity = '0';
                }
            }
        }
        else if (slideId === 'slide_memo28_2') {
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
        else if (slideId === 'slide_memo28_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const word = canvas.querySelector('.detected-word');
            const statusTag = canvas.querySelector('.amygdala-status-badge');
            const bars = canvas.querySelectorAll('.wave-bar');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BỘ LỌC: ĐANG LỌC TẠP ÂM';
                if (word) { word.textContent = '🔊 Nói chuyện xì xào...'; word.style.color = 'rgba(255,255,255,0.3)'; }
                if (statusTag) {
                    statusTag.textContent = 'Khuếch đại: 10%';
                    statusTag.className = 'amygdala-status-badge calm';
                }
                bars.forEach(b => b.style.height = (20 + Math.sin(Date.now()/100)*10) + 'px');
            } else {
                if (badge) badge.textContent = 'BỘ LỌC: PHÁT HIỆN TÊN RIÊNG!';
                if (word) {
                    word.textContent = '✨ MINH ƠI! (TÊN BẠN) ✨';
                    word.style.color = '#eab308';
                }
                if (statusTag) {
                    statusTag.textContent = 'Khuếch đại: 99%';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
                bars.forEach(b => b.style.height = (80 + Math.sin(Date.now()/50)*20) + 'px');
            }
        }
        else if (slideId === 'slide_memo28_4') {
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
        else if (slideId === 'slide_memo28_5') {
            const box = canvas.querySelector('.takeaway-box-v28');
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
        scriptName: 'video28',
        topic: 'Cocktail Party',
        episodeNum: 28,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 28 Plugin] Loaded: Hiệu ứng Cocktail.');
})();
