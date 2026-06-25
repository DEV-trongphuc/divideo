(function() {
    const customSlideIds = [
        'slide_memo93_1',
        'slide_memo93_2',
        'slide_memo93_3',
        'slide_memo93_4',
        'slide_memo93_5'
    ];

    const keywordsData = {
        "slide_memo93_1": [
                {
                        "text": "nằm trằn trọc",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo93_2": [
                {
                        "text": "là Hiệu ứng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo93_3": [
                {
                        "text": "phỏng: Chuyển các",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo93_4": [
                {
                        "text": "sánh: Để công",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo93_5": [
                {
                        "text": "khi đi ngủ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo93_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo93-1-container">
                        <span class="ambient-sleep-particle-v93" style="top: 15%; left: 10%; animation-delay: 0s;">🗒️</span>
                        <span class="ambient-sleep-particle-v93" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v93" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v93">🗒️</div>
                <div class="hook-sub-icon-v93">🧠</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo93_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo93-2-container">
                        <span class="ambient-sleep-particle-v93" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v93" style="top: 82%; left: 10%; animation-delay: -4s;">🗒️</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v93 node-1">
                                <span class="diagram-node-icon">❓</span>
                                <span>1. Công việc tồn đọng</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v93 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Vòng lặp nhắc nhở liên tục</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v93 node-3">
                                <span class="diagram-node-icon">🗒️</span>
                                <span>3. Ghi chép ra sổ tay</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Zeigarnik Ngược*: Đó là Hiệu ứng Zeigarnik Ngược. Việc viết các đầu việc cần làm ra giấy thuyết phục bộ não rằng kế hoạch đã được thiết lập, giải phóng bộ nhớ đệm.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo93_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo93-3-container">
                        <span class="ambient-sleep-particle-v93" style="top: 10%; left: 15%; animation-delay: -1s;">🗒️</span>
                        <span class="ambient-sleep-particle-v93" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v93">
                <div class="state-indicator-badge rested">SUY NGHĨ TRONG ĐẦU</div>
                <div class="sim-scene-v93">
                    <div class="barrier-v93"></div>
                    <span class="sim-actor-v93">🗒️</span>
                    <span class="sim-particle-v93">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v93">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TẢI TRỌNG NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">CPU RAM Occupied</span>
                    <span class="amygdala-status-badge calm">90% (QUÁ TẢI)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Viết ra giấy tạo tín hiệu đóng vòng lặp ảo, cho phép thùy trán ngừng kích hoạt các cảnh báo nhắc nhở liên tục.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo93_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo93-4-container">
                        <span class="ambient-sleep-particle-v93" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v93" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v93">
                            <div class="comp-card-v93 card-left card-active">
                                <div class="comp-header-v93">
                                    <h3>Ủ Việc Trong Đầu</h3>
                                    <div class="comp-icon-v93">🧠</div>
                                </div>
                                <div class="comp-bullet-list-v93">
                                    <div class="comp-bullet-row-v93" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v93">✨</span>
                                        <span>Não liên tục chạy ngầm nhắc nhở</span>
                                    </div>
                                    <div class="comp-bullet-row-v93" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v93">✨</span>
                                        <span>Tiêu tốn glucose của thùy trán</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v93">90% QUÁ TẢI</div>
                            </div>

                            <div class="comp-card-v93 card-right card-inactive">
                                <div class="comp-header-v93">
                                    <h3>Viết Ra Sổ Tay</h3>
                                    <div class="comp-icon-v93">🗒️</div>
                                </div>
                                <div class="comp-bullet-list-v93">
                                    <div class="comp-bullet-row-v93" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v93">❌</span>
                                        <span>Đóng vòng lặp nhận thức ảo</span>
                                    </div>
                                    <div class="comp-bullet-row-v93" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v93">❌</span>
                                        <span>Xác nhận kế hoạch đã được quản lý</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v93">10% THƯ THÁI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo93_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo93-5-container">
                        <div class="takeaway-radar-v93"></div>
                        <div class="takeaway-box-v93" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v93">🗒️</div>
                            <div class="takeaway-text-v93">
                                "Trước khi đi ngủ hoặc bắt đầu ngày mới, hãy viết mọi việc ra giấy. Hãy giải phóng bộ não để tập trung vào việc tận hưởng hiện tại!"
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
        if (slideId === 'slide_memo93_1') {
            const main = canvas.querySelector('.hook-main-icon-v93');
            const sub = canvas.querySelector('.hook-sub-icon-v93');
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
        else if (slideId === 'slide_memo93_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo93_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v93');
            const barrier = canvas.querySelector('.barrier-v93');
            const part = canvas.querySelector('.sim-particle-v93');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'SUY NGHĨ TRONG ĐẦU';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: SUY NGHĨ TRONG ĐẦU';
                if (statusTag) {
                    statusTag.textContent = '90% (QUÁ TẢI)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'GHI RA SỔ TAY';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('reverse_zeigarnik' === 'ostrich' || 'reverse_zeigarnik' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: GHI RA SỔ TAY';
                if (statusTag) {
                    statusTag.textContent = '10% (THƯ THÁI)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo93_4' && canvas.querySelector('.comp-row-v93')) {
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
        else if (slideId === 'slide_memo93_5' || (slideId === 'slide_memo93_4' && canvas.querySelector('.takeaway-box-v93'))) {
            const box = canvas.querySelector('.takeaway-box-v93');
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
        scriptName: 'video93',
        topic: 'Reverse Zeigarnik',
        episodeNum: 93,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 93 Plugin] Loaded: Zeigarnik Ngược.');
})();
