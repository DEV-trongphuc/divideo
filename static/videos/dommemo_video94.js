(function() {
    const customSlideIds = [
        'slide_memo94_1',
        'slide_memo94_2',
        'slide_memo94_3',
        'slide_memo94_4',
        'slide_memo94_5'
    ];

    const keywordsData = {
        "slide_memo94_1": [
                {
                        "text": "đạt kết quả",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo94_2": [
                {
                        "text": "gọi là Hội",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo94_3": [
                {
                        "text": "phỏng: Dù xung",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo94_4": [
                {
                        "text": "sánh: Đánh giá",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo94_5": [
                {
                        "text": "công của bạn",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo94_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo94-1-container">
                        <span class="ambient-sleep-particle-v94" style="top: 15%; left: 10%; animation-delay: 0s;">🎭</span>
                        <span class="ambient-sleep-particle-v94" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v94" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v94">🎭</div>
                <div class="hook-sub-icon-v94">🕴️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo94_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo94-2-container">
                        <span class="ambient-sleep-particle-v94" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v94" style="top: 82%; left: 10%; animation-delay: -4s;">🎭</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v94 node-1">
                                <span class="diagram-node-icon">🎭</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v94 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v94 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Hội chứng Giả mạo*: Đó gọi là Hội chứng Kẻ giả mạo. Người mắc hội chứng này luôn nghi ngờ năng lực bản thân, lo sợ người khác sẽ phát hiện ra mình là kẻ lừa dối.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo94_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo94-3-container">
                        <span class="ambient-sleep-particle-v94" style="top: 10%; left: 15%; animation-delay: -1s;">🎭</span>
                        <span class="ambient-sleep-particle-v94" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v94">
                <div class="state-indicator-badge rested">THÀNH TỰU ĐẠT ĐƯỢC</div>
                <div class="sim-scene-v94">
                    <div class="barrier-v94"></div>
                    <span class="sim-actor-v94">🎭</span>
                    <span class="sim-particle-v94">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v94">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TÂM LÝ NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số nghi ngờ</span>
                    <span class="amygdala-status-badge calm">10% (BÌNH THƯỜNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Hội chứng này thường gặp ở những người cầu toàn và có trách nhiệm cao, tự đặt ra tiêu chuẩn quá khắt khe cho bản thân.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo94_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo94-4-container">
                        <span class="ambient-sleep-particle-v94" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v94" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v94">
                            <div class="comp-card-v94 card-left card-active">
                                <div class="comp-header-v94">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v94">🎭</div>
                                </div>
                                <div class="comp-bullet-list-v94">
                                    <div class="comp-bullet-row-v94" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v94">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v94" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v94">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v94">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v94 card-right card-inactive">
                                <div class="comp-header-v94">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v94">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v94">
                                    <div class="comp-bullet-row-v94" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v94">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v94" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v94">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v94">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo94_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo94-5-container">
                        <div class="takeaway-radar-v94"></div>
                        <div class="takeaway-box-v94" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v94">🎭</div>
                            <div class="takeaway-text-v94">
                                "Thành công của bạn là kết quả của nỗ lực thực tế. Hãy dũng cảm cởi bỏ mặt nạ nghi ngờ và tự hào về những gì bạn đã cống hiến!"
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
        if (slideId === 'slide_memo94_1') {
            const main = canvas.querySelector('.hook-main-icon-v94');
            const sub = canvas.querySelector('.hook-sub-icon-v94');
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
        else if (slideId === 'slide_memo94_2') {
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
        else if (slideId === 'slide_memo94_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v94');
            const barrier = canvas.querySelector('.barrier-v94');
            const part = canvas.querySelector('.sim-particle-v94');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'THÀNH TỰU ĐẠT ĐƯỢC';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: THÀNH TỰU ĐẠT ĐƯỢC';
                if (statusTag) {
                    statusTag.textContent = '10% (BÌNH THƯỜNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'ẢO ẢNH GIẢ MẠO';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('impostor' === 'ostrich' || 'impostor' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: ẢO ẢNH GIẢ MẠO';
                if (statusTag) {
                    statusTag.textContent = '85% (QUÁ TẢI)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo94_4') {
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
        else if (slideId === 'slide_memo94_5') {
            const box = canvas.querySelector('.takeaway-box-v94');
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
        scriptName: 'video94',
        topic: 'Impostor Syndrome',
        episodeNum: 94,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 94 Plugin] Loaded: Hội chứng Giả mạo.');
})();
