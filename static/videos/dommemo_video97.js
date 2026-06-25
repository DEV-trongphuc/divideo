(function() {
    const customSlideIds = [
        'slide_memo97_1',
        'slide_memo97_2',
        'slide_memo97_3',
        'slide_memo97_4',
        'slide_memo97_5'
    ];

    const keywordsData = {
        "slide_memo97_1": [
                {
                        "text": "sao bạn lại",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo97_2": [
                {
                        "text": "chính là Vòng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo97_3": [
                {
                        "text": "phỏng: Mỗi lượt",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo97_4": [
                {
                        "text": "sánh: Tập trung",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo97_5": [
                {
                        "text": "thiết lập giới",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo97_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo97-1-container">
                        <span class="ambient-sleep-particle-v97" style="top: 15%; left: 10%; animation-delay: 0s;">📱</span>
                        <span class="ambient-sleep-particle-v97" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v97" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v97">📱</div>
                <div class="hook-sub-icon-v97">⚡</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo97_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo97-2-container">
                        <span class="ambient-sleep-particle-v97" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v97" style="top: 82%; left: 10%; animation-delay: -4s;">📱</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v97 node-1">
                                <span class="diagram-node-icon">📱</span>
                                <span>1. Vuốt màn hình điện thoại</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v97 node-2">
                                <span class="diagram-node-icon">🎁</span>
                                <span>2. Nhận phần thưởng ngẫu nhiên</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v97 node-3">
                                <span class="diagram-node-icon">⚡</span>
                                <span>3. Đỉnh dopamine bùng nổ</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Vòng lặp Dopamine*: Đó chính là Vòng lặp Dopamine vô tận. Mạng xã hội sử dụng thuật toán phần thưởng biến thiên để liên tục kích hoạt dopamine, giữ chân bạn online.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo97_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo97-3-container">
                        <span class="ambient-sleep-particle-v97" style="top: 10%; left: 15%; animation-delay: -1s;">📱</span>
                        <span class="ambient-sleep-particle-v97" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v97">
                <div class="state-indicator-badge rested">TẬP TRUNG SÂU</div>
                <div class="sim-scene-v97">
                    <div class="barrier-v97"></div>
                    <span class="sim-actor-v97">📱</span>
                    <span class="sim-particle-v97">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v97">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    NĂNG LƯỢNG TẬP TRUNG
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số chú ý sâu</span>
                    <span class="amygdala-status-badge calm">90% (HIỆU QUẢ)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Phần thưởng biến thiên (không biết bài đăng tiếp theo có gì hay) kích thích dopamine mạnh mẽ hơn nhiều so với phần thưởng định trước.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo97_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo97-4-container">
                        <span class="ambient-sleep-particle-v97" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v97" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v97">
                            <div class="comp-card-v97 card-left card-active">
                                <div class="comp-header-v97">
                                    <h3>Tập Trung Trạng Thái Sâu</h3>
                                    <div class="comp-icon-v97">🧘</div>
                                </div>
                                <div class="comp-bullet-list-v97">
                                    <div class="comp-bullet-row-v97" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v97">✨</span>
                                        <span>Sản sinh dopamine bền vững, dịu nhẹ</span>
                                    </div>
                                    <div class="comp-bullet-row-v97" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v97">✨</span>
                                        <span>Hoàn thành công việc chất lượng cao</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v97">90% TẬP TRUNG SÂU</div>
                            </div>

                            <div class="comp-card-v97 card-right card-inactive">
                                <div class="comp-header-v97">
                                    <h3>Nghiện Lướt Di Động</h3>
                                    <div class="comp-icon-v97">📱</div>
                                </div>
                                <div class="comp-bullet-list-v97">
                                    <div class="comp-bullet-row-v97" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v97">❌</span>
                                        <span>Các kích thích dopamine ảo dồn dập</span>
                                    </div>
                                    <div class="comp-bullet-row-v97" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v97">❌</span>
                                        <span>Bào mòn khả năng kiên nhẫn học tập</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v97">15% PHÂN TÁN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo97_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo97-5-container">
                        <div class="takeaway-radar-v97"></div>
                        <div class="takeaway-box-v97" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v97">📱</div>
                            <div class="takeaway-text-v97">
                                "Hãy thiết lập giới hạn thời gian sử dụng điện thoại và dành thời gian cho các hoạt động thực tế. Hãy giành lại quyền làm chủ bộ não của bạn!"
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
        if (slideId === 'slide_memo97_1') {
            const main = canvas.querySelector('.hook-main-icon-v97');
            const sub = canvas.querySelector('.hook-sub-icon-v97');
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
        else if (slideId === 'slide_memo97_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo97_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v97');
            const barrier = canvas.querySelector('.barrier-v97');
            const part = canvas.querySelector('.sim-particle-v97');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TẬP TRUNG SÂU';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: TẬP TRUNG SÂU';
                if (statusTag) {
                    statusTag.textContent = '90% (HIỆU QUẢ)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'LƯỚT DI ĐỘNG';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('dopamineloop' === 'ostrich' || 'dopamineloop' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: LƯỚT DI ĐỘNG';
                if (statusTag) {
                    statusTag.textContent = '15% (PHÂN TÁN)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo97_4' && canvas.querySelector('.comp-row-v97')) {
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
        else if (slideId === 'slide_memo97_5' || (slideId === 'slide_memo97_4' && canvas.querySelector('.takeaway-box-v97'))) {
            const box = canvas.querySelector('.takeaway-box-v97');
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
        scriptName: 'video97',
        topic: 'Dopamine Loop',
        episodeNum: 97,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 97 Plugin] Loaded: Vòng lặp Dopamine.');
})();
