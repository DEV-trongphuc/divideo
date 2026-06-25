(function() {
    const customSlideIds = [
        'slide_memo70_1',
        'slide_memo70_2',
        'slide_memo70_3',
        'slide_memo70_4',
        'slide_memo70_5'
    ];

    const keywordsData = {
        "slide_memo70_1": [
                {
                        "text": "tự tay ráp",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo70_2": [
                {
                        "text": "chính là Hiệu",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo70_3": [
                {
                        "text": "phỏng: Khi các",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo70_4": [
                {
                        "text": "sánh: Đồ mua",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo70_5": [
                {
                        "text": "ứng dụng hiệu",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo70_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo70-1-container">
                        <span class="ambient-sleep-particle-v70" style="top: 15%; left: 10%; animation-delay: 0s;">🔨</span>
                        <span class="ambient-sleep-particle-v70" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v70" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v70">🔨</div>
                <div class="hook-sub-icon-v70">📦</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo70_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo70-2-container">
                        <span class="ambient-sleep-particle-v70" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v70" style="top: 82%; left: 10%; animation-delay: -4s;">🔨</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v70 node-1">
                                <span class="diagram-node-icon">📦</span>
                                <span>1. Mua linh kiện rời</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v70 node-2">
                                <span class="diagram-node-icon">🔨</span>
                                <span>2. Đổ mồ hôi lắp ráp</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v70 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Hoàn thiện sản phẩm</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng IKEA*: Đó chính là Hiệu ứng IKEA. Chúng ta vô thức gán giá trị cao bất thường cho những vật dụng mà bản thân đã bỏ công sức và thời gian để hoàn thành.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo70_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo70-3-container">
                        <span class="ambient-sleep-particle-v70" style="top: 10%; left: 15%; animation-delay: -1s;">🔨</span>
                        <span class="ambient-sleep-particle-v70" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v70">
                <div class="state-indicator-badge rested">MẢNH GHÉP RỜI</div>
                <div class="sim-scene-v70">
                    <div class="barrier-v70"></div>
                    <span class="sim-actor-v70">🔨</span>
                    <span class="sim-particle-v70">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v70">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỊNH GIÁ CHỦ QUAN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Subjective Value</span>
                    <span class="amygdala-status-badge calm">$10 (GIÁ THỊ TRƯỜNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Công sức bỏ ra được não bộ chuyển hóa thành giá trị tinh thần, liên kết trực tiếp sản phẩm với cái tôi của người làm.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo70_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo70-4-container">
                        <span class="ambient-sleep-particle-v70" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v70" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v70">
                            <div class="comp-card-v70 card-left card-active">
                                <div class="comp-header-v70">
                                    <h3>Đồ Tự Lắp Ráp</h3>
                                    <div class="comp-icon-v70">🔨</div>
                                </div>
                                <div class="comp-bullet-list-v70">
                                    <div class="comp-bullet-row-v70" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v70">✨</span>
                                        <span>Có công sức cá nhân gắn kết</span>
                                    </div>
                                    <div class="comp-bullet-row-v70" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v70">✨</span>
                                        <span>Gia tăng tình cảm sở hữu</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v70">TỰ HÀO</div>
                            </div>

                            <div class="comp-card-v70 card-right card-inactive">
                                <div class="comp-header-v70">
                                    <h3>Đồ Mua Sẵn</h3>
                                    <div class="comp-icon-v70">🛒</div>
                                </div>
                                <div class="comp-bullet-list-v70">
                                    <div class="comp-bullet-row-v70" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v70">❌</span>
                                        <span>Hoàn hảo không vết xước</span>
                                    </div>
                                    <div class="comp-bullet-row-v70" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v70">❌</span>
                                        <span>Không có kết nối cảm xúc</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v70">TIÊU CHUẨN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo70_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo70-5-container">
                        <div class="takeaway-radar-v70"></div>
                        <div class="takeaway-box-v70" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v70">🔨</div>
                            <div class="takeaway-text-v70">
                                "Hãy ứng dụng hiệu ứng này vào học tập và công việc. Tự tay hoàn thiện dự án sẽ giúp bạn yêu thích và trân trọng kết quả hơn!"
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
        // Slide 1 Hook Animation
        if (slideId === 'slide_memo70_1') {
            const main = canvas.querySelector('.hook-main-icon-v70');
            const sub = canvas.querySelector('.hook-sub-icon-v70');
            if (main && sub) {
                if (progress > 0.45) {
                    main.style.transform = 'translateY(-25px) scale(1.3)';
                    main.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    sub.style.opacity = '1';
                    sub.style.transform = 'translateY(15px) scale(1.1)';
                    sub.style.transition = 'all 0.5s ease';
                } else {
                    main.style.transform = 'translateY(0) scale(1)';
                    sub.style.opacity = '0.2';
                    sub.style.transform = 'translateY(0) scale(1)';
                }
            }
        }
        // Slide 2 Diagram Nodes Sequential Highlight (if active on slide 2)
        else if (slideId === 'slide_memo70_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        // Slide 3 Interactive Simulator
        else if (slideId === 'slide_memo70_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v70');
            const barrier = canvas.querySelector('.barrier-v70');
            const part = canvas.querySelector('.sim-particle-v70');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'MẢNH GHÉP RỜI';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: MẢNH GHÉP RỜI';
                if (statusTag) {
                    statusTag.textContent = '$10 (GIÁ THỊ TRƯỜNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TỰ RÁP XONG!';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('ikea' === 'ostrich' || 'ikea' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: TỰ RÁP XONG!';
                if (statusTag) {
                    statusTag.textContent = '$95 (VÔ GIÁ)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo70_4' && canvas.querySelector('.comp-row-v70')) {
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
        // Slide 5 Takeaway scaling
        else if (slideId === 'slide_memo70_5' || (slideId === 'slide_memo70_4' && canvas.querySelector('.takeaway-box-v70'))) {
            const box = canvas.querySelector('.takeaway-box-v70');
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
        scriptName: 'video70',
        topic: 'IKEA Effect',
        episodeNum: 70,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 70 Plugin] Loaded: Hiệu ứng IKEA.');
})();
