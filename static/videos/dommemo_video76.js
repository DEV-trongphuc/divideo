(function() {
    const customSlideIds = [
        'slide_memo76_1',
        'slide_memo76_2',
        'slide_memo76_3',
        'slide_memo76_4',
        'slide_memo76_5'
    ];

    const keywordsData = {
        "slide_memo76_1": [
                {
                        "text": "muốn bán chiếc",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo76_2": [
                {
                        "text": "là Hiệu ứng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo76_3": [
                {
                        "text": "phỏng: Cầm chiếc",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo76_4": [
                {
                        "text": "sánh: Người bán",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo76_5": [
                {
                        "text": "tỉnh táo trước",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo76_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo76-1-container">
                        <span class="ambient-sleep-particle-v76" style="top: 15%; left: 10%; animation-delay: 0s;">📦</span>
                        <span class="ambient-sleep-particle-v76" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v76" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v76">📦</div>
                <div class="hook-sub-icon-v76">💎</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo76_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo76-4-container">
                        <span class="ambient-sleep-particle-v76" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v76" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v76">
                            <div class="comp-card-v76 card-left card-active">
                                <div class="comp-header-v76">
                                    <h3>Người Sở Hữu Bán</h3>
                                    <div class="comp-icon-v76">🙋</div>
                                </div>
                                <div class="comp-bullet-list-v76">
                                    <div class="comp-bullet-row-v76" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v76">✨</span>
                                        <span>Sợ cảm giác mất mát đồ đạc</span>
                                    </div>
                                    <div class="comp-bullet-row-v76" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v76">✨</span>
                                        <span>Cộng thêm giá trị kỷ niệm cá nhân</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v76">ĐỊNH GIÁ $25</div>
                            </div>

                            <div class="comp-card-v76 card-right card-inactive">
                                <div class="comp-header-v76">
                                    <h3>Người Đi Mua</h3>
                                    <div class="comp-icon-v76">🛒</div>
                                </div>
                                <div class="comp-bullet-list-v76">
                                    <div class="comp-bullet-row-v76" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v76">❌</span>
                                        <span>Đánh giá dựa trên công năng thuần</span>
                                    </div>
                                    <div class="comp-bullet-row-v76" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v76">❌</span>
                                        <span>So sánh khách quan giá thị trường</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v76">TRẢ GIÁ $5</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo76_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo76-3-container">
                        <span class="ambient-sleep-particle-v76" style="top: 10%; left: 15%; animation-delay: -1s;">📦</span>
                        <span class="ambient-sleep-particle-v76" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v76">
                <div class="state-indicator-badge rested">NGƯỜI MUA TÌM</div>
                <div class="sim-scene-v76">
                    <div class="barrier-v76"></div>
                    <span class="sim-actor-v76">📦</span>
                    <span class="sim-particle-v76">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v76">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỊNH GIÁ MÓN ĐỒ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức định giá</span>
                    <span class="amygdala-status-badge calm">$5 (GIÁ KHÁCH QUAN)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sở hữu một món đồ kích hoạt trung tâm tự hào của não bộ, khiến việc từ bỏ nó tạo ra tín hiệu đau đớn tương tự như mất mát vật chất.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo76_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo76-4-container">
                        <span class="ambient-sleep-particle-v76" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v76" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// CÔNG THỨC HIỆU ỨNG SỞ HỮU
let marketValue = 100;
let lossAversionFactor = 2.5; // Não coi mất mát đau gấp 2.5 lần
let sellerAskingPrice = marketValue * lossAversionFactor;
console.log(sellerAskingPrice); // Đòi bán $250</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Người bán định giá kèm giá trị kỷ niệm và nỗi đau mất mát. Người mua đánh giá khách quan dựa trên công năng thực tế.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo76_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo76-5-container">
                        <div class="takeaway-radar-v76"></div>
                        <div class="takeaway-box-v76" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v76">📦</div>
                            <div class="takeaway-text-v76">
                                "Hãy tỉnh táo trước khi mua bán. Đừng để cảm xúc sở hữu bóp méo giá trị thực tế của các tài sản bạn đang nắm giữ!"
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
        if (slideId === 'slide_memo76_1') {
            const main = canvas.querySelector('.hook-main-icon-v76');
            const sub = canvas.querySelector('.hook-sub-icon-v76');
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
        else if (slideId === 'slide_memo76_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo76_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v76');
            const barrier = canvas.querySelector('.barrier-v76');
            const part = canvas.querySelector('.sim-particle-v76');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'NGƯỜI MUA TÌM';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: NGƯỜI MUA TÌM';
                if (statusTag) {
                    statusTag.textContent = '$5 (GIÁ KHÁCH QUAN)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'CHỦ SỞ HỮU BÁN';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('endowment' === 'ostrich' || 'endowment' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: CHỦ SỞ HỮU BÁN';
                if (statusTag) {
                    statusTag.textContent = '$25 (GIÁ CẢM XÚC)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo76_4' && canvas.querySelector('.comp-row-v76')) {
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
        else if (slideId === 'slide_memo76_5' || (slideId === 'slide_memo76_4' && canvas.querySelector('.takeaway-box-v76'))) {
            const box = canvas.querySelector('.takeaway-box-v76');
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
        scriptName: 'video76',
        topic: 'Endowment Effect',
        episodeNum: 76,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 76 Plugin] Loaded: Hiệu ứng Sở hữu.');
})();
