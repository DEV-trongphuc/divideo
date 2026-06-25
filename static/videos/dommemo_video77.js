(function() {
    const customSlideIds = [
        'slide_memo77_1',
        'slide_memo77_2',
        'slide_memo77_3',
        'slide_memo77_4',
        'slide_memo77_5'
    ];

    const keywordsData = {
        "slide_memo77_1": [
                {
                        "text": "nghe câu chuyện",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo77_2": [
                {
                        "text": "chính là Thiên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo77_3": [
                {
                        "text": "phỏng: Gia cố",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo77_4": [
                {
                        "text": "sánh: Nhìn nhận",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo77_5": [
                {
                        "text": "thành công, đừng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo77_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo77-1-container">
                        <span class="ambient-sleep-particle-v77" style="top: 15%; left: 10%; animation-delay: 0s;">🛩️</span>
                        <span class="ambient-sleep-particle-v77" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v77" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v77">🛩️</div>
                <div class="hook-sub-icon-v77">🛡️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo77_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo77-2-container">
                        <span class="ambient-sleep-particle-v77" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v77" style="top: 82%; left: 10%; animation-delay: -4s;">🛩️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v77 node-1">
                                <span class="diagram-node-icon">🛩️</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v77 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v77 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Thiên kiến Sinh tồn*: Đó chính là Thiên kiến Sinh tồn. Chúng ta chỉ tập trung vào những trường hợp thành công nổi bật mà vô tình bỏ qua nhóm thất bại thầm lặng khổng lồ.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo77_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo77-3-container">
                        <span class="ambient-sleep-particle-v77" style="top: 10%; left: 15%; animation-delay: -1s;">🛩️</span>
                        <span class="ambient-sleep-particle-v77" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v77">
                <div class="state-indicator-badge rested">CHỈ NHÌN NGƯỜI THẮNG</div>
                <div class="sim-scene-v77">
                    <div class="barrier-v77"></div>
                    <span class="sim-actor-v77">🛩️</span>
                    <span class="sim-particle-v77">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v77">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    QUYẾT ĐỊNH CHIẾN LƯỢC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Độ chính xác</span>
                    <span class="amygdala-status-badge calm">20% (RỦI RO CAO)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Tập trung vào người sống sót tạo ra ảo giác rằng việc đạt được mục tiêu dễ dàng hơn nhiều so với thực tế khốc liệt.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo77_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo77-4-container">
                        <span class="ambient-sleep-particle-v77" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v77" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v77">
                            <div class="comp-card-v77 card-left card-active">
                                <div class="comp-header-v77">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v77">🛩️</div>
                                </div>
                                <div class="comp-bullet-list-v77">
                                    <div class="comp-bullet-row-v77" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v77">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v77" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v77">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v77">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v77 card-right card-inactive">
                                <div class="comp-header-v77">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v77">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v77">
                                    <div class="comp-bullet-row-v77" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v77">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v77" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v77">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v77">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo77_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo77-5-container">
                        <div class="takeaway-radar-v77"></div>
                        <div class="takeaway-box-v77" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v77">🛩️</div>
                            <div class="takeaway-text-v77">
                                "Muốn thành công, đừng chỉ học từ người thắng cuộc. Hãy nghiên cứu kỹ bài học từ những người đã thất bại để tránh đi vào vết xe đổ!"
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
        if (slideId === 'slide_memo77_1') {
            const main = canvas.querySelector('.hook-main-icon-v77');
            const sub = canvas.querySelector('.hook-sub-icon-v77');
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
        else if (slideId === 'slide_memo77_2') {
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
        else if (slideId === 'slide_memo77_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v77');
            const barrier = canvas.querySelector('.barrier-v77');
            const part = canvas.querySelector('.sim-particle-v77');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'CHỈ NHÌN NGƯỜI THẮNG';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: CHỈ NHÌN NGƯỜI THẮNG';
                if (statusTag) {
                    statusTag.textContent = '20% (RỦI RO CAO)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'TÌM HIỂU TOÀN DIỆN';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('survivorship' === 'ostrich' || 'survivorship' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: TÌM HIỂU TOÀN DIỆN';
                if (statusTag) {
                    statusTag.textContent = '95% (AN TOÀN HƠN)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo77_4') {
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
        else if (slideId === 'slide_memo77_5') {
            const box = canvas.querySelector('.takeaway-box-v77');
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
        scriptName: 'video77',
        topic: 'Survivorship Bias',
        episodeNum: 77,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 77 Plugin] Loaded: Thiên kiến Sinh tồn.');
})();
