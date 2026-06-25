(function() {
    const customSlideIds = [
        'slide_memo92_1',
        'slide_memo92_2',
        'slide_memo92_3',
        'slide_memo92_4',
        'slide_memo92_5'
    ];

    const keywordsData = {
        "slide_memo92_1": [
                {
                        "text": "lập kế hoạch",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo92_2": [
                {
                        "text": "chính là Ảo",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo92_3": [
                {
                        "text": "phỏng: Bạn kỳ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo92_4": [
                {
                        "text": "sánh: Dự kiến",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo92_5": [
                {
                        "text": "lập kế hoạch,",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo92_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo92-1-container">
                        <span class="ambient-sleep-particle-v92" style="top: 15%; left: 10%; animation-delay: 0s;">📅</span>
                        <span class="ambient-sleep-particle-v92" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v92" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v92">📅</div>
                <div class="hook-sub-icon-v92">⏳</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo92_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo92-4-container">
                        <span class="ambient-sleep-particle-v92" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v92" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v92">
                            <div class="comp-card-v92 card-left card-active">
                                <div class="comp-header-v92">
                                    <h3>Dự Kiến Lý Thuyết</h3>
                                    <div class="comp-icon-v92">📅</div>
                                </div>
                                <div class="comp-bullet-list-v92">
                                    <div class="comp-bullet-row-v92" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v92">✨</span>
                                        <span>Kịch bản hoàn hảo, trơn tru</span>
                                    </div>
                                    <div class="comp-bullet-row-v92" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v92">✨</span>
                                        <span>Không tính đến sự cố gián đoạn</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v92">2 NGÀY KỲ VỌNG</div>
                            </div>

                            <div class="comp-card-v92 card-right card-inactive">
                                <div class="comp-header-v92">
                                    <h3>Thực Tế Triển Khai</h3>
                                    <div class="comp-icon-v92">🛠️</div>
                                </div>
                                <div class="comp-bullet-list-v92">
                                    <div class="comp-bullet-row-v92" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v92">❌</span>
                                        <span>Các sự cố bất ngờ liên tục phát sinh</span>
                                    </div>
                                    <div class="comp-bullet-row-v92" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v92">❌</span>
                                        <span>Thiếu nguyên vật liệu hoặc trì trệ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v92">10 NGÀY TRỄ HẠN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo92_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo92-3-container">
                        <span class="ambient-sleep-particle-v92" style="top: 10%; left: 15%; animation-delay: -1s;">📅</span>
                        <span class="ambient-sleep-particle-v92" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v92">
                <div class="state-indicator-badge rested">KỲ VỌNG BAN ĐẦU</div>
                <div class="sim-scene-v92">
                    <div class="barrier-v92"></div>
                    <span class="sim-actor-v92">📅</span>
                    <span class="sim-particle-v92">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v92">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TIẾN ĐỘ THỰC TẾ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Số ngày thực tế</span>
                    <span class="amygdala-status-badge calm">2 NGÀY (KỲ VỌNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ tập trung vào kịch bản thành công lý tưởng nhất để duy trì động lực bắt đầu hành động, vô tình lọc bỏ các rủi ro có thể xảy ra.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo92_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo92-4-container">
                        <span class="ambient-sleep-particle-v92" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v92" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// DỰ BÁO LẬP KẾ HOẠCH LẠC QUAN
let optimisticDuration = 2; // Ngày
let probabilityOfRisk = 0.85; // Rủi ro cực cao
let actualDuration = optimisticDuration + (probabilityOfRisk * 10 * Math.random());
console.log(\`Số ngày thực tế: \${Math.round(actualDuration)} ngày\`);</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Dự kiến lý thuyết trơn tru, không có sự cố. Thực tế triển khai luôn đi kèm các sự cố phát sinh ngoài tầm kiểm soát.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo92_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo92-5-container">
                        <div class="takeaway-radar-v92"></div>
                        <div class="takeaway-box-v92" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v92">📅</div>
                            <div class="takeaway-text-v92">
                                "Khi lập kế hoạch, hãy cộng thêm 50% thời gian dự phòng. Nhìn nhận thực tế sẽ giúp bạn làm chủ thời gian và giảm bớt căng thẳng!"
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
        if (slideId === 'slide_memo92_1') {
            const main = canvas.querySelector('.hook-main-icon-v92');
            const sub = canvas.querySelector('.hook-sub-icon-v92');
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
        else if (slideId === 'slide_memo92_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo92_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v92');
            const barrier = canvas.querySelector('.barrier-v92');
            const part = canvas.querySelector('.sim-particle-v92');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'KỲ VỌNG BAN ĐẦU';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: KỲ VỌNG BAN ĐẦU';
                if (statusTag) {
                    statusTag.textContent = '2 NGÀY (KỲ VỌNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'THỰC TẾ TRIỂN KHAI';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('planning' === 'ostrich' || 'planning' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: THỰC TẾ TRIỂN KHAI';
                if (statusTag) {
                    statusTag.textContent = '10 NGÀY (TRỄ HẠN)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo92_4' && canvas.querySelector('.comp-row-v92')) {
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
        else if (slideId === 'slide_memo92_5' || (slideId === 'slide_memo92_4' && canvas.querySelector('.takeaway-box-v92'))) {
            const box = canvas.querySelector('.takeaway-box-v92');
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
        scriptName: 'video92',
        topic: 'Planning Fallacy',
        episodeNum: 92,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 92 Plugin] Loaded: Ảo giác Khả thi.');
})();
