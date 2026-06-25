(function() {
    const customSlideIds = [
        'slide_memo73_1',
        'slide_memo73_2',
        'slide_memo73_3',
        'slide_memo73_4',
        'slide_memo73_5'
    ];

    const keywordsData = {
        "slide_memo73_1": [
                {
                        "text": "mua một vé",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo73_2": [
                {
                        "text": "chính là Bẫy",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo73_3": [
                {
                        "text": "phỏng: Nỗ lực",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo73_4": [
                {
                        "text": "sánh: Quyết định",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo73_5": [
                {
                        "text": "phí đã mất",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo73_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo73-1-container">
                        <span class="ambient-sleep-particle-v73" style="top: 15%; left: 10%; animation-delay: 0s;">💸</span>
                        <span class="ambient-sleep-particle-v73" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v73" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v73">💸</div>
                <div class="hook-sub-icon-v73">⚓</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo73_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo73-2-container">
                        <span class="ambient-sleep-particle-v73" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v73" style="top: 82%; left: 10%; animation-delay: -4s;">💸</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v73 node-1">
                                <span class="diagram-node-icon">💸</span>
                                <span>1. Đầu tư vốn/tiền</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v73 node-2">
                                <span class="diagram-node-icon">💔</span>
                                <span>2. Kết quả không tốt</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v73 node-3">
                                <span class="diagram-node-icon">⚓</span>
                                <span>3. Tiếc của tiếc công</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Bẫy Chi phí Chìm*: Đó chính là Bẫy Chi phí Chìm. Chúng ta đưa ra quyết định dựa trên số tiền hoặc công sức đã mất trong quá khứ, thay vì tính đến lợi ích tương lai.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo73_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo73-3-container">
                        <span class="ambient-sleep-particle-v73" style="top: 10%; left: 15%; animation-delay: -1s;">💸</span>
                        <span class="ambient-sleep-particle-v73" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v73">
                <div class="state-indicator-badge rested">ĐẦU TƯ BAN ĐẦU</div>
                <div class="sim-scene-v73">
                    <div class="barrier-v73"></div>
                    <span class="sim-actor-v73">💸</span>
                    <span class="sim-particle-v73">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v73">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐÁNH GIÁ TÀI CHÍNH
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Tổn thất tích lũy</span>
                    <span class="amygdala-status-badge calm">$10 (CẮT LỖ ĐƯỢC)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ liên kết việc bỏ cuộc với nỗi đau thất bại, nên nó chọn tiếp tục đầu tư sai lầm để trì hoãn việc thừa nhận mình đã sai.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo73_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo73-4-container">
                        <span class="ambient-sleep-particle-v73" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v73" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// PHÂN TÍCH QUYẾT ĐỊNH RỒI
let sunkCost = 5000; // Tiền đã mất
let futureGain = -200; // Tiếp tục sẽ lỗ thêm
let rationalChoice = "Cut Loss";
let emotionalChoice = "Stay & Invest More";
console.log(rationalChoice);</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Quyết định lý trí là cắt lỗ ngay lập tức để bảo toàn tài nguyên. Quyết định cảm tính là cố đấm ăn xôi và chịu lỗ nặng hơn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo73_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo73-5-container">
                        <div class="takeaway-radar-v73"></div>
                        <div class="takeaway-box-v73" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v73">💸</div>
                            <div class="takeaway-text-v73">
                                "Chi phí đã mất là không thể lấy lại. Đừng lãng phí tương lai chỉ để cố công bù đắp cho những sai lầm đã qua!"
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
        if (slideId === 'slide_memo73_1') {
            const main = canvas.querySelector('.hook-main-icon-v73');
            const sub = canvas.querySelector('.hook-sub-icon-v73');
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
        else if (slideId === 'slide_memo73_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo73_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v73');
            const barrier = canvas.querySelector('.barrier-v73');
            const part = canvas.querySelector('.sim-particle-v73');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'ĐẦU TƯ BAN ĐẦU';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: ĐẦU TƯ BAN ĐẦU';
                if (statusTag) {
                    statusTag.textContent = '$10 (CẮT LỖ ĐƯỢC)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'CỐ ĐẤM ĂN XÔI';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('sunkcost' === 'ostrich' || 'sunkcost' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: CỐ ĐẤM ĂN XÔI';
                if (statusTag) {
                    statusTag.textContent = '$100 (QUÁ TRỄ)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo73_4' && canvas.querySelector('.comp-row-v73')) {
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
        else if (slideId === 'slide_memo73_5' || (slideId === 'slide_memo73_4' && canvas.querySelector('.takeaway-box-v73'))) {
            const box = canvas.querySelector('.takeaway-box-v73');
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
        scriptName: 'video73',
        topic: 'Sunk Cost Fallacy',
        episodeNum: 73,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 73 Plugin] Loaded: Bẫy Chi phí Chìm.');
})();
