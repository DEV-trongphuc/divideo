(function() {
    const customSlideIds = [
        'slide_memo83_1',
        'slide_memo83_2',
        'slide_memo83_3',
        'slide_memo83_4',
        'slide_memo83_5'
    ];

    const keywordsData = {
        "slide_memo83_1": [
                {
                        "text": "người kéo dây",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo83_2": [
                {
                        "text": "chính là Hiệu",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo83_3": [
                {
                        "text": "phỏng: Khi kéo",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo83_4": [
                {
                        "text": "sánh: Làm việc",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo83_5": [
                {
                        "text": "làm việc nhóm",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo83_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo83-1-container">
                        <span class="ambient-sleep-particle-v83" style="top: 15%; left: 10%; animation-delay: 0s;">👥</span>
                        <span class="ambient-sleep-particle-v83" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v83" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v83">👥</div>
                <div class="hook-sub-icon-v83">🤝</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo83_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo83-2-container">
                        <span class="ambient-sleep-particle-v83" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v83" style="top: 82%; left: 10%; animation-delay: -4s;">👥</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v83 node-1">
                                <span class="diagram-node-icon">🧍</span>
                                <span>1. Làm việc đơn độc</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v83 node-2">
                                <span class="diagram-node-icon">👥</span>
                                <span>2. Gộp nhóm đông người</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v83 node-3">
                                <span class="diagram-node-icon">❓</span>
                                <span>3. Mất dấu ấn đóng góp</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Ringelmann*: Đó chính là Hiệu ứng Ringelmann. Khi số lượng thành viên trong nhóm tăng lên, nỗ lực cá nhân của mỗi người vô thức giảm đi do tâm lý ỷ lại tập thể.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo83_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo83-3-container">
                        <span class="ambient-sleep-particle-v83" style="top: 10%; left: 15%; animation-delay: -1s;">👥</span>
                        <span class="ambient-sleep-particle-v83" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v83">
                <div class="state-indicator-badge rested">KÉO ĐƠN ĐỘC</div>
                <div class="sim-scene-v83">
                    <div class="barrier-v83"></div>
                    <span class="sim-actor-v83">👥</span>
                    <span class="sim-particle-v83">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v83">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    LỰC KÉO CÁ NHÂN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Nỗ lực thực tế</span>
                    <span class="amygdala-status-badge calm">100% (HẾT SỨC)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Khi không thể đo lường trực tiếp đóng góp cá nhân, bộ não tự động giảm tiêu hao năng lượng để bảo toàn sức lực.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo83_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo83-4-container">
                        <span class="ambient-sleep-particle-v83" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v83" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v83">
                            <div class="comp-card-v83 card-left card-active">
                                <div class="comp-header-v83">
                                    <h3>Độc Lập Tác Chiến</h3>
                                    <div class="comp-icon-v83">🧍</div>
                                </div>
                                <div class="comp-bullet-list-v83">
                                    <div class="comp-bullet-row-v83" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v83">✨</span>
                                        <span>Nỗ lực tối đa của bản thân</span>
                                    </div>
                                    <div class="comp-bullet-row-v83" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v83">✨</span>
                                        <span>Đo lường kết quả trực tiếp</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v83">HẾT SỨC 100%</div>
                            </div>

                            <div class="comp-card-v83 card-right card-inactive">
                                <div class="comp-header-v83">
                                    <h3>Nhóm Lớn Mơ Hồ</h3>
                                    <div class="comp-icon-v83">👥</div>
                                </div>
                                <div class="comp-bullet-list-v83">
                                    <div class="comp-bullet-row-v83" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v83">❌</span>
                                        <span>Dễ dàng hòa lẫn vào tập thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v83" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v83">❌</span>
                                        <span>Nỗ lực âm thầm suy giảm</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v83">Ỷ LẠI 35%</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo83_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo83-5-container">
                        <div class="takeaway-radar-v83"></div>
                        <div class="takeaway-box-v83" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v83">👥</div>
                            <div class="takeaway-text-v83">
                                "Để làm việc nhóm hiệu quả, hãy chia nhỏ nhóm và giao trách nhiệm rõ ràng cho từng cá nhân. Sự minh bạch giúp loại bỏ sự ỷ lại!"
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
        if (slideId === 'slide_memo83_1') {
            const main = canvas.querySelector('.hook-main-icon-v83');
            const sub = canvas.querySelector('.hook-sub-icon-v83');
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
        else if (slideId === 'slide_memo83_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo83_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v83');
            const barrier = canvas.querySelector('.barrier-v83');
            const part = canvas.querySelector('.sim-particle-v83');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'KÉO ĐƠN ĐỘC';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: KÉO ĐƠN ĐỘC';
                if (statusTag) {
                    statusTag.textContent = '100% (HẾT SỨC)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'KÉO ĐỒNG ĐỘI';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('ringelmann' === 'ostrich' || 'ringelmann' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: KÉO ĐỒNG ĐỘI';
                if (statusTag) {
                    statusTag.textContent = '35% (Ỷ LẠI)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo83_4' && canvas.querySelector('.comp-row-v83')) {
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
        else if (slideId === 'slide_memo83_5' || (slideId === 'slide_memo83_4' && canvas.querySelector('.takeaway-box-v83'))) {
            const box = canvas.querySelector('.takeaway-box-v83');
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
        scriptName: 'video83',
        topic: 'Ringelmann Effect',
        episodeNum: 83,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 83 Plugin] Loaded: Hiệu ứng Ringelmann.');
})();
