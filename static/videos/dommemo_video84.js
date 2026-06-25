(function() {
    const customSlideIds = [
        'slide_memo84_1',
        'slide_memo84_2',
        'slide_memo84_3',
        'slide_memo84_4',
        'slide_memo84_5'
    ];

    const keywordsData = {
        "slide_memo84_1": [
                {
                        "text": "muốn học kỹ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo84_2": [
                {
                        "text": "là Bẫy Vùng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo84_3": [
                {
                        "text": "phỏng: Nằm yên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo84_4": [
                {
                        "text": "sánh: Ở trong",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo84_5": [
                {
                        "text": "phát triển thực",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo84_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo84-1-container">
                        <span class="ambient-sleep-particle-v84" style="top: 15%; left: 10%; animation-delay: 0s;">🛋️</span>
                        <span class="ambient-sleep-particle-v84" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v84" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v84">🛋️</div>
                <div class="hook-sub-icon-v84">🌀</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo84_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo84-4-container">
                        <span class="ambient-sleep-particle-v84" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v84" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v84">
                            <div class="comp-card-v84 card-left card-active">
                                <div class="comp-header-v84">
                                    <h3>Trong Vùng Thoải Mái</h3>
                                    <div class="comp-icon-v84">🛋️</div>
                                </div>
                                <div class="comp-bullet-list-v84">
                                    <div class="comp-bullet-row-v84" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v84">✨</span>
                                        <span>Năng lượng tiêu thụ cực thấp</span>
                                    </div>
                                    <div class="comp-bullet-row-v84" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v84">✨</span>
                                        <span>Không gặp áp lực hay sợ hãi</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v84">AN TOÀN / TRÌ TRỆ</div>
                            </div>

                            <div class="comp-card-v84 card-right card-inactive">
                                <div class="comp-header-v84">
                                    <h3>Bứt Phá Ra Ngoài</h3>
                                    <div class="comp-icon-v84">🌀</div>
                                </div>
                                <div class="comp-bullet-list-v84">
                                    <div class="comp-bullet-row-v84" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v84">❌</span>
                                        <span>Kích hoạt học hỏi chủ động</span>
                                    </div>
                                    <div class="comp-bullet-row-v84" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v84">❌</span>
                                        <span>Chấp nhận thử thách, vấp ngã</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v84">PHÁT TRIỂN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo84_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo84-3-container">
                        <span class="ambient-sleep-particle-v84" style="top: 10%; left: 15%; animation-delay: -1s;">🛋️</span>
                        <span class="ambient-sleep-particle-v84" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v84">
                <div class="state-indicator-badge rested">AN TOÀN</div>
                <div class="sim-scene-v84">
                    <span class="sim-actor-v84">🛋️</span>
                    <span class="sim-glow-v84">✨</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Ban đầu</div>
            </div>
            <div class="amygdala-dashboard-v84">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TIẾN TRÌNH PHÁT TRIỂN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số Kỹ năng</span>
                    <span class="amygdala-status-badge calm">10% (TRÌ TRỆ)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ coi vùng thoải mái là vùng sinh tồn an toàn đã được chứng thực. Vượt ra ngoài đòi hỏi sự dũng cảm để vượt qua nỗi sợ vô thức.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo84_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo84-4-container">
                        <span class="ambient-sleep-particle-v84" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v84" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// CHỈ SỐ PHÁT TRIỂN NĂNG LỰC
let zone = "Comfort";
let energyCost = (zone == "Comfort") ? 0.10 : 0.80;
let skillGrowth = (zone == "Comfort") ? 0.00 : 0.95;
console.log(\`Tỷ lệ phát triển: \${skillGrowth * 100}%\`);</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Ở trong vùng quen thuộc an toàn nhưng không tiến bộ. Bước ra ngoài vùng thử thách kích hoạt học hỏi và mở rộng giới hạn bản thân.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo84_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo84-5-container">
                        <div class="takeaway-radar-v84"></div>
                        <div class="takeaway-box-v84" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v84">🛋️</div>
                            <div class="takeaway-text-v84">
                                "Sự phát triển thực sự chỉ bắt đầu ở rìa vùng an toàn của bạn. Hãy dũng cảm bước ra ngoài và đón nhận những thử thách mới!"
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
        if (slideId === 'slide_memo84_1') {
            const main = canvas.querySelector('.hook-main-icon-v84');
            const sub = canvas.querySelector('.hook-sub-icon-v84');
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
        else if (slideId === 'slide_memo84_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo84_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v84');
            const glow = canvas.querySelector('.sim-glow-v84');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'AN TOÀN';
                if (actor) { actor.style.transform = 'scale(1) rotate(0deg)'; }
                if (glow) { glow.style.opacity = '0.1'; glow.style.transform = 'scale(0.8)'; }
                if (lbl) lbl.textContent = 'Trạng thái: AN TOÀN';
                if (statusTag) {
                    statusTag.textContent = '10% (TRÌ TRỆ)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BƯỚC RA NGOÀI!';
                if (actor) {
                    actor.style.transform = 'scale(1.3) rotate(10deg)';
                }
                if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.6) translate(-10px, -10px)';
                }
                if (lbl) lbl.textContent = 'Kết quả: BƯỚC RA NGOÀI!! 🛋️';
                if (statusTag) {
                    statusTag.textContent = '95% (VƯỢT TRỘI)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo84_4' && canvas.querySelector('.comp-row-v84')) {
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
        else if (slideId === 'slide_memo84_5' || (slideId === 'slide_memo84_4' && canvas.querySelector('.takeaway-box-v84'))) {
            const box = canvas.querySelector('.takeaway-box-v84');
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
        scriptName: 'video84',
        topic: 'Comfort Zone Trap',
        episodeNum: 84,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 84 Plugin] Loaded: Bẫy Vùng an toàn.');
})();
