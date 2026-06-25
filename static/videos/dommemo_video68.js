(function() {
    const customSlideIds = [
        'slide_memo68_1',
        'slide_memo68_2',
        'slide_memo68_3',
        'slide_memo68_4',
        'slide_memo68_5'
    ];

    const keywordsData = {
        "slide_memo68_1": [
                {
                        "text": "khoản ngân hàng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo68_2": [
                {
                        "text": "là Hiệu ứng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo68_3": [
                {
                        "text": "phỏng: Khi thị",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo68_4": [
                {
                        "text": "sánh: Người đối",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo68_5": [
                {
                        "text": "tin xấu không",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo68_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo68-1-container">
                        <span class="ambient-sleep-particle-v68" style="top: 15%; left: 10%; animation-delay: 0s;">🦩</span>
                        <span class="ambient-sleep-particle-v68" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v68" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v68">🦩</div>
                <div class="hook-sub-icon-v68">🙈</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo68_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo68-2-container">
                        <span class="ambient-sleep-particle-v68" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v68" style="top: 82%; left: 10%; animation-delay: -4s;">🦩</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v68 node-1">
                                <span class="diagram-node-icon">🦩</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v68 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v68 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Đà điểu*: Đó là Hiệu ứng Đà điểu. Con người có xu hướng từ chối tiếp nhận thông tin tiêu cực hoặc đe dọa, tựa như đà điểu chôn đầu xuống cát để tự an ủi.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo68_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo68-3-container">
                        <span class="ambient-sleep-particle-v68" style="top: 10%; left: 15%; animation-delay: -1s;">🦩</span>
                        <span class="ambient-sleep-particle-v68" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v68">
                <div class="state-indicator-badge rested">ĐỐI MẶT</div>
                <div class="sim-scene-v68">
                    <div class="barrier-v68"></div>
                    <span class="sim-actor-v68">🦩</span>
                    <span class="sim-particle-v68">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v68">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TRẠNG THÁI TÂM LÝ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số an toàn</span>
                    <span class="amygdala-status-badge calm">40% (LO LẮNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Tránh né thông tin xấu là cơ chế phòng vệ ngắn hạn của não để bảo vệ cái tôi khỏi những cú sốc thực tế đột ngột.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo68_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo68-4-container">
                        <span class="ambient-sleep-particle-v68" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v68" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v68">
                            <div class="comp-card-v68 card-left card-active">
                                <div class="comp-header-v68">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v68">🦩</div>
                                </div>
                                <div class="comp-bullet-list-v68">
                                    <div class="comp-bullet-row-v68" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v68">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v68" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v68">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v68">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v68 card-right card-inactive">
                                <div class="comp-header-v68">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v68">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v68">
                                    <div class="comp-bullet-row-v68" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v68">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v68" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v68">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v68">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo68_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo68-5-container">
                        <div class="takeaway-radar-v68"></div>
                        <div class="takeaway-box-v68" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v68">🦩</div>
                            <div class="takeaway-text-v68">
                                "Thông tin xấu không biến mất chỉ vì bạn nhắm mắt lại. Hãy dũng cảm nhìn thẳng vào sự thật để tìm ra giải pháp xử lý sớm nhất!"
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
        if (slideId === 'slide_memo68_1') {
            const main = canvas.querySelector('.hook-main-icon-v68');
            const sub = canvas.querySelector('.hook-sub-icon-v68');
            if (main && sub) {
                if (progress > 0.45) {
                    main.style.transform = 'translateX(40px) scale(1.2)';
                    sub.style.opacity = '1';
                    sub.style.transform = 'scale(1.3)';
                } else {
                    main.style.transform = 'translateX(0) scale(1)';
                    sub.style.opacity = '0.2';
                    sub.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_memo68_2') {
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
        else if (slideId === 'slide_memo68_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v68');
            const barrier = canvas.querySelector('.barrier-v68');
            const part = canvas.querySelector('.sim-particle-v68');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'ĐỐI MẶT';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: ĐỐI MẶT';
                if (statusTag) {
                    statusTag.textContent = '40% (LO LẮNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TRỐN TRÁNH';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('ostrich' === 'ostrich' || 'ostrich' === 'handicap') {
                        barrier.style.transform = 'scaleY(1.5) translateY(5px)';
                    } else {
                        barrier.style.transform = 'scaleY(0)';
                        barrier.style.opacity = '0.1';
                    }
                }
                if (part) {
                    part.style.transform = 'translate(50px, -20px) scale(1.6)';
                    part.style.opacity = '1';
                }
                if (lbl) lbl.textContent = 'Hành vi: TRỐN TRÁNH';
                if (statusTag) {
                    statusTag.textContent = '95% (GIẢ TẠO)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo68_4') {
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
        else if (slideId === 'slide_memo68_5') {
            const box = canvas.querySelector('.takeaway-box-v68');
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
        scriptName: 'video68',
        topic: 'Ostrich Effect',
        episodeNum: 68,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 68 Plugin] Loaded: Hiệu ứng Đà điểu.');
})();
