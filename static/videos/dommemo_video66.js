(function() {
    const customSlideIds = [
        'slide_memo66_1',
        'slide_memo66_2',
        'slide_memo66_3',
        'slide_memo66_4',
        'slide_memo66_5'
    ];

    const keywordsData = {
        "slide_memo66_1": [
                {
                        "text": "ai đó liên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo66_2": [
                {
                        "text": "tượng này gọi",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo66_3": [
                {
                        "text": "phỏng: Khi gánh",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo66_4": [
                {
                        "text": "sánh: Sự tin",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo66_5": [
                {
                        "text": "tránh xa những",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo66_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo66-1-container">
                        <span class="ambient-sleep-particle-v66" style="top: 15%; left: 10%; animation-delay: 0s;">🥀</span>
                        <span class="ambient-sleep-particle-v66" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v66" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v66">🥀</div>
                <div class="hook-sub-icon-v66">☁️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo66_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo66-2-container">
                        <span class="ambient-sleep-particle-v66" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v66" style="top: 82%; left: 10%; animation-delay: -4s;">🥀</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v66 node-1">
                                <span class="diagram-node-icon">🥀</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v66 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v66 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Golem*: Hiện tượng này gọi là Hiệu ứng Golem. Kỳ vọng tiêu cực của người quản lý vô tình làm giảm động lực, tạo ra sự tự ti và dẫn đến thất bại thực tế.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo66_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo66-3-container">
                        <span class="ambient-sleep-particle-v66" style="top: 10%; left: 15%; animation-delay: -1s;">🥀</span>
                        <span class="ambient-sleep-particle-v66" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v66">
                <div class="state-indicator-badge rested">KỲ VỌNG CAO</div>
                <div class="sim-scene-v66">
                    <span class="sim-actor-v66">🥀</span>
                    <span class="sim-glow-v66">✨</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Ban đầu</div>
            </div>
            <div class="amygdala-dashboard-v66">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HIỆU SUẤT CÁ NHÂN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số nỗ lực</span>
                    <span class="amygdala-status-badge calm">85% (MẠNH MẼ)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự nghi ngờ vô thức làm thay đổi hành vi giao tiếp, khiến người nhận phản xạ tự cô lập và đánh mất năng lực sáng tạo.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo66_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo66-4-container">
                        <span class="ambient-sleep-particle-v66" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v66" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v66">
                            <div class="comp-card-v66 card-left card-active">
                                <div class="comp-header-v66">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v66">🥀</div>
                                </div>
                                <div class="comp-bullet-list-v66">
                                    <div class="comp-bullet-row-v66" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v66">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v66" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v66">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v66">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v66 card-right card-inactive">
                                <div class="comp-header-v66">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v66">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v66">
                                    <div class="comp-bullet-row-v66" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v66">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v66" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v66">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v66">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo66_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo66-5-container">
                        <div class="takeaway-radar-v66"></div>
                        <div class="takeaway-box-v66" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v66">🥀</div>
                            <div class="takeaway-text-v66">
                                "Hãy tránh xa những kỳ vọng độc hại và lời bàn tán tiêu cực. Bạn xứng đáng được phát triển trong một môi trường tin tưởng!"
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
        if (slideId === 'slide_memo66_1') {
            const main = canvas.querySelector('.hook-main-icon-v66');
            const sub = canvas.querySelector('.hook-sub-icon-v66');
            if (main && sub) {
                if (progress > 0.45) {
                    main.style.transform = 'scale(0.7) rotate(20deg) translateY(10px)';
                    sub.style.opacity = '1';
                    sub.style.transform = 'scale(1.2) translateY(5px)';
                } else {
                    main.style.transform = 'scale(1) rotate(0deg) translateY(0)';
                    sub.style.opacity = '0.2';
                    sub.style.transform = 'scale(1) translateY(0)';
                }
            }
        }
        else if (slideId === 'slide_memo66_2') {
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
        else if (slideId === 'slide_memo66_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v66');
            const glow = canvas.querySelector('.sim-glow-v66');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'KỲ VỌNG CAO';
                if (actor) { actor.style.transform = 'scale(0.85) rotate(0deg)'; }
                if (glow) { glow.style.opacity = '0.1'; glow.style.transform = 'scale(0.8)'; }
                if (lbl) lbl.textContent = 'Trạng thái: KỲ VỌNG CAO';
                if (statusTag) {
                    statusTag.textContent = '85% (MẠNH MẼ)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BỊ NGHI NGỜ';
                if (actor) {
                    actor.style.transform = 'scale(0.5) rotate(15deg)';
                }
                if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.6) translate(-10px, -10px)';
                }
                if (lbl) lbl.textContent = 'Kết quả: BỊ NGHI NGỜ! 🥀';
                if (statusTag) {
                    statusTag.textContent = '15% (HÉO ÚA)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo66_4') {
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
        else if (slideId === 'slide_memo66_5') {
            const box = canvas.querySelector('.takeaway-box-v66');
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
        scriptName: 'video66',
        topic: 'Golem Effect',
        episodeNum: 66,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 66 Plugin] Loaded: Hiệu ứng Golem.');
})();
