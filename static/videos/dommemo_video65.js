(function() {
    const customSlideIds = [
        'slide_memo65_1',
        'slide_memo65_2',
        'slide_memo65_3',
        'slide_memo65_4',
        'slide_memo65_5'
    ];

    const keywordsData = {
        "slide_memo65_1": [
                {
                        "text": "luôn muốn tỏ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo65_2": [
                {
                        "text": "tượng này gọi",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo65_3": [
                {
                        "text": "phỏng: Khi tách",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo65_4": [
                {
                        "text": "sánh: Người hoàn",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo65_5": [
                {
                        "text": "sợ mắc những",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo65_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo65-1-container">
                        <span class="ambient-sleep-particle-v65" style="top: 15%; left: 10%; animation-delay: 0s;">☕</span>
                        <span class="ambient-sleep-particle-v65" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v65" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v65">☕</div>
                <div class="hook-sub-icon-v65">💧</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo65_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo65-4-container">
                        <span class="ambient-sleep-particle-v65" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v65" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v65">
                            <div class="comp-card-v65 card-left card-active">
                                <div class="comp-header-v65">
                                    <h3>Hoàn Hảo Tuyệt Đối</h3>
                                    <div class="comp-icon-v65">🛡️</div>
                                </div>
                                <div class="comp-bullet-list-v65">
                                    <div class="comp-bullet-row-v65" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v65">✨</span>
                                        <span>Tạo khoảng cách xa lạ</span>
                                    </div>
                                    <div class="comp-bullet-row-v65" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v65">✨</span>
                                        <span>Gây áp lực cho xung quanh</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v65">XA CÁCH</div>
                            </div>

                            <div class="comp-card-v65 card-right card-inactive">
                                <div class="comp-header-v65">
                                    <h3>Tài Năng & Vụng Về</h3>
                                    <div class="comp-icon-v65">☕</div>
                                </div>
                                <div class="comp-bullet-list-v65">
                                    <div class="comp-bullet-row-v65" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v65">❌</span>
                                        <span>Gần gũi và thực tế</span>
                                    </div>
                                    <div class="comp-bullet-row-v65" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v65">❌</span>
                                        <span>Dễ kết nối cảm xúc</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v65">KẾT NỐI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo65_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo65-3-container">
                        <span class="ambient-sleep-particle-v65" style="top: 10%; left: 15%; animation-delay: -1s;">☕</span>
                        <span class="ambient-sleep-particle-v65" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v65">
                <div class="state-indicator-badge rested">CHƯA MẮC LỖI</div>
                <div class="sim-scene-v65">
                    <span class="sim-actor-v65">☕</span>
                    <span class="sim-glow-v65">✨</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Ban đầu</div>
            </div>
            <div class="amygdala-dashboard-v65">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    CHỈ SỐ THIỆN CẢM
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức độ gần gũi</span>
                    <span class="amygdala-status-badge calm">40% (BÌNH THƯỜNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Lỗi nhỏ làm giảm bớt tính đe dọa của người tài giỏi và làm họ trở nên đáng yêu, dễ tiếp cận hơn.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo65_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo65-2-container">
                        <span class="ambient-sleep-particle-v65" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v65" style="top: 82%; left: 10%; animation-delay: -4s;">☕</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v65 node-1">
                                <span class="diagram-node-icon">🎓</span>
                                <span>1. Chuyên môn cao</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v65 node-2">
                                <span class="diagram-node-icon">☕</span>
                                <span>2. Mắc lỗi nhỏ</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v65 node-3">
                                <span class="diagram-node-icon">💡</span>
                                <span>3. Bớt hoàn hảo</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hiệu ứng Pratfall*: Hiện tượng này gọi là Hiệu ứng Pratfall. Người tài giỏi thỉnh thoảng phạm một lỗi nhỏ sẽ trở nên gần gũi, thực tế và đáng mến hơn trong mắt người khác.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo65_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo65-5-container">
                        <div class="takeaway-radar-v65"></div>
                        <div class="takeaway-box-v65" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v65">☕</div>
                            <div class="takeaway-text-v65">
                                "Đừng sợ mắc những lỗi nhỏ trước mặt người khác. Sự chân thật và một chút vụng về chính là chất keo kết nối mạnh mẽ nhất!"
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
        if (slideId === 'slide_memo65_1') {
            const main = canvas.querySelector('.hook-main-icon-v65');
            const sub = canvas.querySelector('.hook-sub-icon-v65');
            if (main && sub) {
                if (progress > 0.45) {
                    main.style.transform = 'translateY(-20px) rotate(-80deg) scale(1.2)';
                    sub.style.opacity = '1';
                    sub.style.transform = 'translateY(15px) scale(1.1)';
                } else {
                    main.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                    sub.style.opacity = '0.2';
                    sub.style.transform = 'translateY(0) scale(1)';
                }
            }
        }
        // Slide 2 Diagram Nodes Sequential Highlight (if active on slide 2)
        else if (slideId === 'slide_memo65_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo65_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v65');
            const glow = canvas.querySelector('.sim-glow-v65');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'CHƯA MẮC LỖI';
                if (actor) { actor.style.transform = 'scale(1) rotate(0deg)'; }
                if (glow) { glow.style.opacity = '0.1'; glow.style.transform = 'scale(0.8)'; }
                if (lbl) lbl.textContent = 'Trạng thái: CHƯA MẮC LỖI';
                if (statusTag) {
                    statusTag.textContent = '40% (BÌNH THƯỜNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'VỤNG VỀ DỄ THƯƠNG!';
                if (actor) {
                    actor.style.transform = 'scale(1.5) rotate(10deg)';
                }
                if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.6) translate(-10px, -10px)';
                }
                if (lbl) lbl.textContent = 'Kết quả: VỤNG VỀ DỄ THƯƠNG!! ☕';
                if (statusTag) {
                    statusTag.textContent = '95% (CỰC CAO)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo65_4' && canvas.querySelector('.comp-row-v65')) {
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
        else if (slideId === 'slide_memo65_5' || (slideId === 'slide_memo65_4' && canvas.querySelector('.takeaway-box-v65'))) {
            const box = canvas.querySelector('.takeaway-box-v65');
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
        scriptName: 'video65',
        topic: 'Pratfall Effect',
        episodeNum: 65,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 65 Plugin] Loaded: Hiệu ứng Pratfall.');
})();
