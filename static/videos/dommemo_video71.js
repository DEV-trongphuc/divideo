(function() {
    const customSlideIds = [
        'slide_memo71_1',
        'slide_memo71_2',
        'slide_memo71_3',
        'slide_memo71_4',
        'slide_memo71_5'
    ];

    const keywordsData = {
        "slide_memo71_1": [
                {
                        "text": "thuyết trình trước",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo71_2": [
                {
                        "text": "gọi là Ảo",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo71_3": [
                {
                        "text": "phỏng: Dù bên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo71_4": [
                {
                        "text": "sánh: Cảm giác",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo71_5": [
                {
                        "text": "người không hề",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo71_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo71-1-container">
                        <span class="ambient-sleep-particle-v71" style="top: 15%; left: 10%; animation-delay: 0s;">🔮</span>
                        <span class="ambient-sleep-particle-v71" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v71" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v71">🔮</div>
                <div class="hook-sub-icon-v71">💧</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo71_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo71-2-container">
                        <span class="ambient-sleep-particle-v71" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v71" style="top: 82%; left: 10%; animation-delay: -4s;">🔮</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v71 node-1">
                                <span class="diagram-node-icon">🔮</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v71 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v71 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác Minh bạch*: Đó gọi là Ảo giác Minh bạch. Con người thường đánh giá quá cao mức độ mà người khác có thể đọc được trạng thái cảm xúc cá nhân của mình.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo71_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo71-3-container">
                        <span class="ambient-sleep-particle-v71" style="top: 10%; left: 15%; animation-delay: -1s;">🔮</span>
                        <span class="ambient-sleep-particle-v71" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v71">
                <div class="state-indicator-badge rested">BÌNH THƯỜNG</div>
                <div class="sim-scene-v71">
                    <div class="spotlight-beam-v71"></div>
                    <span class="sim-actor-v71">🔮</span>
                    <span class="sweat-drops-v71">💧 💧</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Tự nhiên</div>
            </div>
            <div class="amygdala-dashboard-v71">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ LỆCH QUAN SÁT
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức độ lộ diện</span>
                    <span class="amygdala-status-badge calm">5% (ẨN DẤU)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Trải nghiệm lo âu của chúng ta rất mãnh liệt, nhưng các dấu hiệu sinh lý bên ngoài lại quá nhỏ để người khác nhận biết dễ dàng.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo71_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo71-4-container">
                        <span class="ambient-sleep-particle-v71" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v71" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v71">
                            <div class="comp-card-v71 card-left card-active">
                                <div class="comp-header-v71">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v71">🔮</div>
                                </div>
                                <div class="comp-bullet-list-v71">
                                    <div class="comp-bullet-row-v71" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v71">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v71" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v71">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v71">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v71 card-right card-inactive">
                                <div class="comp-header-v71">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v71">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v71">
                                    <div class="comp-bullet-row-v71" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v71">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v71" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v71">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v71">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo71_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo71-5-container">
                        <div class="takeaway-radar-v71"></div>
                        <div class="takeaway-box-v71" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v71">🔮</div>
                            <div class="takeaway-text-v71">
                                "Mọi người không hề nhìn thấu tâm can của bạn đâu. Hãy hít một hơi thật sâu, tự tin bước lên và nói lời của bạn!"
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
        if (slideId === 'slide_memo71_1') {
            const main = canvas.querySelector('.hook-main-icon-v71');
            const sub = canvas.querySelector('.hook-sub-icon-v71');
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
        else if (slideId === 'slide_memo71_2') {
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
        else if (slideId === 'slide_memo71_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v71');
            const beam = canvas.querySelector('.spotlight-beam-v71');
            const sweat = canvas.querySelector('.sweat-drops-v71');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BÌNH THƯỜNG';
                if (actor) { actor.style.transform = 'scale(1) translateY(0)'; }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) { sweat.style.opacity = '0'; sweat.style.transform = 'translateY(0)'; }
                if (lbl) lbl.textContent = 'Trạng thái: BÌNH THƯỜNG';
                if (statusTag) {
                    statusTag.textContent = '5% (ẨN DẤU)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'LO LẮNG TỘT ĐỘ';
                if (actor) {
                    actor.style.transform = 'scale(1.2) translateY(-5px)';
                    if ('transparency' === 'spotlight' || 'transparency' === 'attribution') {
                        actor.style.animation = 'bubble-vibrate 0.15s infinite';
                    }
                }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) {
                    sweat.style.opacity = '1';
                    sweat.style.transform = 'translateY(15px)';
                }
                if (lbl) lbl.textContent = 'Nhận thức: LO LẮNG TỘT ĐỘ';
                if (statusTag) {
                    statusTag.textContent = '8% (KHÔNG AI BIẾT)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo71_4') {
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
        else if (slideId === 'slide_memo71_5') {
            const box = canvas.querySelector('.takeaway-box-v71');
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
        scriptName: 'video71',
        topic: 'Illusion of Transparency',
        episodeNum: 71,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 71 Plugin] Loaded: Ảo giác Minh bạch.');
})();
