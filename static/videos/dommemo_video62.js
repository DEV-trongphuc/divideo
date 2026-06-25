/**
 * DOM Memo Video 62: Ảo giác McGurk (McGurk Effect)
 * Custom script plugin driving visual simulator, keywords activation, and premium hook animation.
 */
(function () {
    'use strict';

    const keywordsData = {
        "slide_memo62_1": [
                {
                        "text": "tai nghe thấy 'Ba-ba'",
                        "start": 1.0,
                        "end": 3.5,
                        "class": "active-violet"
                },
                {
                        "text": "nghe thành 'Fa-fa'",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo62_2": [
                {
                        "text": "Hiệu ứng McGurk",
                        "start": 1.5,
                        "end": 4.5,
                        "class": "active-green"
                },
                {
                        "text": "ưu tiên thông tin hình ảnh từ mắt",
                        "start": 5.0,
                        "end": 8.5,
                        "class": "active-green"
                }
        ],
        "slide_memo62_3": [
                {
                        "text": "mắt cưỡng chế ép tai nghe theo",
                        "start": 2.5,
                        "end": 6.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo62_4": [
                {
                        "text": "Nghe nhắm mắt",
                        "start": 1.5,
                        "end": 4.0,
                        "class": "active-green"
                },
                {
                        "text": "chi phối mạnh mẽ bởi chuyển động môi",
                        "start": 4.5,
                        "end": 8.0,
                        "class": "active-violet"
                }
        ],
        "slide_memo62_5": [
                {
                        "text": "nghe bằng dự đoán của đôi mắt",
                        "start": 2.0,
                        "end": 5.5,
                        "class": "active-green"
                }
        ]
};

    const customSlideIds = [
        'slide_memo62_1', 'slide_memo62_2', 'slide_memo62_3', 'slide_memo62_4', 'slide_memo62_5'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_memo62_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo62-1-container">
                        <span class="ambient-sleep-particle-v62" style="top: 15%; left: 8%; animation-delay: -1s;">👄</span>
                        <span class="ambient-sleep-particle-v62" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v62" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="giant-lips-v62">👄</div>
                <div class="ear-receiver-v62">👂</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo62_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo62-2-container">
                        <span class="ambient-sleep-particle-v62" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v62" style="top: 82%; left: 10%; animation-delay: -4s;">👄</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v62 node-1">
                                <span class="diagram-node-icon">👄</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v62 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v62 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác McGurk*: Đó chính là Hiệu ứng McGurk. Bộ não của bạn ưu tiên thông tin hình ảnh từ mắt để giải mã ngôn ngữ nói, tự động đồng bộ hóa và ghi đè âm thanh thực tế thu được từ tai.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo62_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo62-3-container">
                        <span class="ambient-sleep-particle-v62" style="top: 10%; left: 15%; animation-delay: -1s;">👄</span>
                        <span class="ambient-sleep-particle-v62" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v62">
                <div class="state-indicator-badge rested">ĐỒNG BỘ THỊ-THÍNH GIÁC</div>
                <div class="lip-scene">
                    <span class="lip-actor">👄</span>
                    <span class="sound-wave-actor">👂 "Ba-ba"</span>
                </div>
                <div class="interpretation-lbl">Não nghe thành: Ba-ba</div>
            </div>
            <div class="amygdala-dashboard-v62">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    XỬ LÝ ĐỒNG BỘ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Sự can thiệp thị giác</span>
                    <span class="amygdala-status-badge calm">TẮT (0%)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Vỏ não liên kết đa cảm giác (Multisensory integration) tự động ghi đè thính giác khi có thông tin thị giác đáng tin cậy.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo62_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo62-4-container">
                        <span class="ambient-sleep-particle-v62" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v62" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v62">
                            <div class="comp-card-v62 card-left card-active">
                                <div class="comp-header-v62">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v62">👄</div>
                                </div>
                                <div class="comp-bullet-list-v62">
                                    <div class="comp-bullet-row-v62" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v62">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v62" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v62">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v62">TỰ ĐỘNG HÓA</div>
                            </div>

                            <div class="comp-card-v62 card-right card-inactive">
                                <div class="comp-header-v62">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v62">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v62">
                                    <div class="comp-bullet-row-v62" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v62">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v62" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v62">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v62">Ý THỨC KIỂM SOÁT</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo62_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo62-5-container">
                        <div class="takeaway-radar-v62"></div>
                        <div class="takeaway-box-v62" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v62">👄</div>
                            <div class="takeaway-text-v62">
                                "Đôi khi chúng ta không nghe bằng tai mà đang nghe bằng dự đoán của đôi mắt. Hãy nhắm mắt lại để thẩm định âm thanh chuẩn xác nhất!"
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
        if (slideId === 'slide_memo62_1') {
            const lips = canvas.querySelector('.giant-lips-v62');
            const ear = canvas.querySelector('.ear-receiver-v62');
            if (lips && ear) {
                if (progress > 0.45) {
                    lips.style.transform = 'scale(1.4) translateY(-10px)';
                    ear.style.transform = 'scale(1.3) rotate(20deg)';
                    ear.textContent = '👂 ❓';
                    ear.style.filter = 'drop-shadow(0 0 25px var(--memo62-primary))';
                } else {
                    lips.style.transform = 'scale(1) translateY(0)';
                    ear.style.transform = 'scale(1) rotate(0deg)';
                    ear.textContent = '👂';
                    ear.style.filter = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo62_2') {
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
        else if (slideId === 'slide_memo62_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const lip = canvas.querySelector('.lip-actor');
            const wave = canvas.querySelector('.sound-wave-actor');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'THÍ NHIỆM: NHẮM MẮT NGHE';
                if (lip) { lip.textContent = '🙈'; lip.style.transform = 'scale(1)'; }
                if (wave) { wave.textContent = '👂 "Ba-ba"'; wave.style.color = '#fff'; }
                if (lbl) lbl.textContent = 'Thực tế: Nghe chuẩn âm thanh gốc "Ba-ba"';
                if (statusTag) {
                    statusTag.textContent = 'Can thiệp mắt: 0% (Tự nhiên)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'THÍ NHIỆM: MỞ MẮT NHÌN KHẨU HÌNH "FA"';
                if (lip) {
                    lip.textContent = '👄 "Fa-fa"';
                    lip.style.transform = 'scale(1.2) rotate(-5deg)';
                }
                if (wave) {
                    wave.textContent = '👂 Dịch thành: "Fa-fa"';
                    wave.style.color = '#f43f5e';
                }
                if (lbl) lbl.textContent = 'Ảo giác: Tai bị mắt cưỡng chế nghe thành "Fa-fa"!';
                if (statusTag) {
                    statusTag.textContent = 'Can thiệp mắt: 99% (Cưỡng chế)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo62_4') {
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
        else if (slideId === 'slide_memo62_5') {
            const box = canvas.querySelector('.takeaway-box-v62');
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
        scriptName: 'video62',
        topic: 'McGurk Effect',
        episodeNum: 62,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 62 Plugin] Loaded: Ảo giác McGurk.');
})();
