(function() {
    const customSlideIds = [
        'slide_memo67_1',
        'slide_memo67_2',
        'slide_memo67_3',
        'slide_memo67_4',
        'slide_memo67_5'
    ];

    const keywordsData = {
        "slide_memo67_1": [
                {
                        "text": "đi ngoài đường",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo67_2": [
                {
                        "text": "chính là Hiệu",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo67_3": [
                {
                        "text": "phỏng: Khi ánh",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo67_4": [
                {
                        "text": "sánh: Người lo",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo67_5": [
                {
                        "text": "người đều quá",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo67_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo67-1-container">
                        <span class="ambient-sleep-particle-v67" style="top: 15%; left: 10%; animation-delay: 0s;">🔦</span>
                        <span class="ambient-sleep-particle-v67" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v67" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v67">🔦</div>
                <div class="hook-sub-icon-v67">😰</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo67_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo67-2-container">
                        <span class="ambient-sleep-particle-v67" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v67" style="top: 82%; left: 10%; animation-delay: -4s;">🔦</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v67 node-1">
                                <span class="diagram-node-icon">🔦</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v67 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v67 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Spotlight*: Đó chính là Hiệu ứng Tiêu điểm. Bộ não tự động lấy bản thân làm trung tâm vũ trụ, phóng đại mức độ chú ý mà người khác dành cho mình lên gấp nhiều lần.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo67_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo67-3-container">
                        <span class="ambient-sleep-particle-v67" style="top: 10%; left: 15%; animation-delay: -1s;">🔦</span>
                        <span class="ambient-sleep-particle-v67" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v67">
                <div class="state-indicator-badge rested">ẨN THÂN</div>
                <div class="sim-scene-v67">
                    <div class="spotlight-beam-v67"></div>
                    <span class="sim-actor-v67">🔦</span>
                    <span class="sweat-drops-v67">💧 💧</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Tự nhiên</div>
            </div>
            <div class="amygdala-dashboard-v67">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ LỆCH NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số lo âu</span>
                    <span class="amygdala-status-badge calm">15% (AN TOÀN)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Chúng ta là nhân vật chính trong bộ phim của mình, nhưng chỉ là một diễn viên quần chúng lướt qua trong cuộc đời người khác.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo67_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo67-4-container">
                        <span class="ambient-sleep-particle-v67" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v67" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v67">
                            <div class="comp-card-v67 card-left card-active">
                                <div class="comp-header-v67">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v67">🔦</div>
                                </div>
                                <div class="comp-bullet-list-v67">
                                    <div class="comp-bullet-row-v67" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v67">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v67" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v67">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v67">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v67 card-right card-inactive">
                                <div class="comp-header-v67">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v67">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v67">
                                    <div class="comp-bullet-row-v67" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v67">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v67" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v67">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v67">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo67_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo67-5-container">
                        <div class="takeaway-radar-v67"></div>
                        <div class="takeaway-box-v67" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v67">🔦</div>
                            <div class="takeaway-text-v67">
                                "Mọi người đều quá bận rộn lo lắng về chính họ để chú ý đến lỗi nhỏ của bạn. Hãy tự tin thả lỏng và tận hưởng cuộc sống!"
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
        if (slideId === 'slide_memo67_1') {
            const main = canvas.querySelector('.hook-main-icon-v67');
            const sub = canvas.querySelector('.hook-sub-icon-v67');
            if (main && sub) {
                if (progress > 0.45) {
                    main.style.transform = 'scale(1.3)';
                    sub.style.opacity = '1';
                    sub.style.textShadow = '0 0 25px #ffeb3b';
                } else {
                    main.style.transform = 'scale(1)';
                    sub.style.opacity = '0.2';
                    sub.style.textShadow = 'none';
                }
            }
        }
        else if (slideId === 'slide_memo67_2') {
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
        else if (slideId === 'slide_memo67_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v67');
            const beam = canvas.querySelector('.spotlight-beam-v67');
            const sweat = canvas.querySelector('.sweat-drops-v67');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'ẨN THÂN';
                if (actor) { actor.style.transform = 'scale(1) translateY(0)'; }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) { sweat.style.opacity = '0'; sweat.style.transform = 'translateY(0)'; }
                if (lbl) lbl.textContent = 'Trạng thái: ẨN THÂN';
                if (statusTag) {
                    statusTag.textContent = '15% (AN TOÀN)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'DƯỚI ÁNH ĐÈN';
                if (actor) {
                    actor.style.transform = 'scale(1.2) translateY(-5px)';
                    if ('spotlight' === 'spotlight' || 'spotlight' === 'attribution') {
                        actor.style.animation = 'bubble-vibrate 0.15s infinite';
                    }
                }
                if (beam) { beam.style.opacity = '0.8'; }
                if (sweat) {
                    sweat.style.opacity = '1';
                    sweat.style.transform = 'translateY(15px)';
                }
                if (lbl) lbl.textContent = 'Nhận thức: DƯỚI ÁNH ĐÈN';
                if (statusTag) {
                    statusTag.textContent = '90% (QUÁ TẢI)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo67_4') {
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
        else if (slideId === 'slide_memo67_5') {
            const box = canvas.querySelector('.takeaway-box-v67');
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
        scriptName: 'video67',
        topic: 'Spotlight Effect',
        episodeNum: 67,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 67 Plugin] Loaded: Hiệu ứng Spotlight.');
})();
