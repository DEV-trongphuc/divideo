(function() {
    const customSlideIds = [
        'slide_memo82_1',
        'slide_memo82_2',
        'slide_memo82_3',
        'slide_memo82_4',
        'slide_memo82_5'
    ];

    const keywordsData = {
        "slide_memo82_1": [
                {
                        "text": "nghĩ thoải mái",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo82_2": [
                {
                        "text": "luật Yerkes-Dodson chỉ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo82_3": [
                {
                        "text": "phỏng: Trạng thái",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo82_4": [
                {
                        "text": "sánh: Quá thư",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo82_5": [
                {
                        "text": "học cách đón",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo82_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo82-1-container">
                        <span class="ambient-sleep-particle-v82" style="top: 15%; left: 10%; animation-delay: 0s;">📈</span>
                        <span class="ambient-sleep-particle-v82" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v82" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v82">📈</div>
                <div class="hook-sub-icon-v82">🎯</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo82_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo82-2-container">
                        <span class="ambient-sleep-particle-v82" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v82" style="top: 82%; left: 10%; animation-delay: -4s;">📈</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v82 node-1">
                                <span class="diagram-node-icon">📈</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v82 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v82 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Định luật Yerkes-Dodson*: Định luật Yerkes-Dodson chỉ ra rằng hiệu suất làm việc đạt đỉnh cao ở mức độ căng thẳng vừa phải. Quá ít áp lực gây chán nản, quá nhiều gây hoảng loạn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo82_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo82-3-container">
                        <span class="ambient-sleep-particle-v82" style="top: 10%; left: 15%; animation-delay: -1s;">📈</span>
                        <span class="ambient-sleep-particle-v82" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v82">
                <div class="state-indicator-badge rested">QUÁ THƯ GIÃN</div>
                <div class="sim-scene-v82">
                    <div class="barrier-v82"></div>
                    <span class="sim-actor-v82">📈</span>
                    <span class="sim-particle-v82">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v82">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐƯỜNG CONG ÁP LỰC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số Hiệu suất</span>
                    <span class="amygdala-status-badge calm">30% (TRÌ TRỆ)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Áp lực vừa phải kích hoạt hormone adrenaline ở mức vừa đủ để tăng cường sự tập trung mà không gây quá tải cho hệ vỏ não.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo82_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo82-4-container">
                        <span class="ambient-sleep-particle-v82" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v82" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v82">
                            <div class="comp-card-v82 card-left card-active">
                                <div class="comp-header-v82">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v82">📈</div>
                                </div>
                                <div class="comp-bullet-list-v82">
                                    <div class="comp-bullet-row-v82" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v82">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v82" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v82">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v82">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v82 card-right card-inactive">
                                <div class="comp-header-v82">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v82">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v82">
                                    <div class="comp-bullet-row-v82" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v82">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v82" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v82">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v82">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo82_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo82-5-container">
                        <div class="takeaway-radar-v82"></div>
                        <div class="takeaway-box-v82" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v82">📈</div>
                            <div class="takeaway-text-v82">
                                "Hãy học cách đón nhận áp lực vừa phải như một động lực tích cực. Đó chính là nhiên liệu đưa bạn đến đỉnh cao hiệu suất!"
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
        if (slideId === 'slide_memo82_1') {
            const main = canvas.querySelector('.hook-main-icon-v82');
            const sub = canvas.querySelector('.hook-sub-icon-v82');
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
        else if (slideId === 'slide_memo82_2') {
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
        else if (slideId === 'slide_memo82_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v82');
            const barrier = canvas.querySelector('.barrier-v82');
            const part = canvas.querySelector('.sim-particle-v82');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'QUÁ THƯ GIÃN';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: QUÁ THƯ GIÃN';
                if (statusTag) {
                    statusTag.textContent = '30% (TRÌ TRỆ)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'ÁP LỰC TỐI ƯU';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('yerkes' === 'ostrich' || 'yerkes' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: ÁP LỰC TỐI ƯU';
                if (statusTag) {
                    statusTag.textContent = '98% (ĐỈNH CAO)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo82_4') {
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
        else if (slideId === 'slide_memo82_5') {
            const box = canvas.querySelector('.takeaway-box-v82');
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
        scriptName: 'video82',
        topic: 'Yerkes-Dodson Law',
        episodeNum: 82,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 82 Plugin] Loaded: Định luật Yerkes-Dodson.');
})();
