(function() {
    const customSlideIds = [
        'slide_memo89_1',
        'slide_memo89_2',
        'slide_memo89_3',
        'slide_memo89_4',
        'slide_memo89_5'
    ];

    const keywordsData = {
        "slide_memo89_1": [
                {
                        "text": "sao bạn chỉ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo89_2": [
                {
                        "text": "gọi là Thiên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo89_3": [
                {
                        "text": "phỏng: Màng lọc",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo89_4": [
                {
                        "text": "sánh: Người khách",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo89_5": [
                {
                        "text": "chủ động tìm",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo89_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo89-1-container">
                        <span class="ambient-sleep-particle-v89" style="top: 15%; left: 10%; animation-delay: 0s;">🔍</span>
                        <span class="ambient-sleep-particle-v89" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v89" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v89">🔍</div>
                <div class="hook-sub-icon-v89">📜</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo89_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo89-2-container">
                        <span class="ambient-sleep-particle-v89" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v89" style="top: 82%; left: 10%; animation-delay: -4s;">🔍</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v89 node-1">
                                <span class="diagram-node-icon">📜</span>
                                <span>1. Tiếp nhận thông tin mới</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v89 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. So khớp niềm tin sẵn có</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v89 node-3">
                                <span class="diagram-node-icon">✅</span>
                                <span>3. Chấp nhận thông tin khớp</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Thiên kiến Xác nhận*: Đó gọi là Thiên kiến Xác nhận. Bộ não có xu hướng tìm kiếm, ghi nhớ và diễn dịch thông tin theo cách củng cố các định kiến sẵn có của bản thân.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo89_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo89-3-container">
                        <span class="ambient-sleep-particle-v89" style="top: 10%; left: 15%; animation-delay: -1s;">🔍</span>
                        <span class="ambient-sleep-particle-v89" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v89">
                <div class="state-indicator-badge rested">LẮNG NGHE ĐA CHIỀU</div>
                <div class="sim-scene-v89">
                    <div class="barrier-v89"></div>
                    <span class="sim-actor-v89">🔍</span>
                    <span class="sim-particle-v89">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v89">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ KHÁCH QUAN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số khách quan</span>
                    <span class="amygdala-status-badge calm">90% (SÁNG SUỐT)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ tiêu tốn rất nhiều năng lượng để thay đổi một niềm tin cũ, nên nó chọn lọc thông tin để bảo vệ thế giới quan cũ nhằm tiết kiệm tài nguyên.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo89_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo89-4-container">
                        <span class="ambient-sleep-particle-v89" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v89" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v89">
                            <div class="comp-card-v89 card-left card-active">
                                <div class="comp-header-v89">
                                    <h3>Tư Duy Khách Quan</h3>
                                    <div class="comp-icon-v89">🧠</div>
                                </div>
                                <div class="comp-bullet-list-v89">
                                    <div class="comp-bullet-row-v89" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v89">✨</span>
                                        <span>Tìm kiếm bằng chứng phản biện</span>
                                    </div>
                                    <div class="comp-bullet-row-v89" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v89">✨</span>
                                        <span>Cân nhắc kỹ ý kiến trái chiều</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v89">SÁNG SUỐT</div>
                            </div>

                            <div class="comp-card-v89 card-right card-inactive">
                                <div class="comp-header-v89">
                                    <h3>Lọc Thiên Kiến</h3>
                                    <div class="comp-icon-v89">🔍</div>
                                </div>
                                <div class="comp-bullet-list-v89">
                                    <div class="comp-bullet-row-v89" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v89">❌</span>
                                        <span>Chỉ đọc bài viết đồng điệu</span>
                                    </div>
                                    <div class="comp-bullet-row-v89" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v89">❌</span>
                                        <span>Bỏ qua các cảnh báo bất tiện</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v89">PHIẾN DIỆN</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo89_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo89-5-container">
                        <div class="takeaway-radar-v89"></div>
                        <div class="takeaway-box-v89" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v89">🔍</div>
                            <div class="takeaway-text-v89">
                                "Hãy chủ động tìm kiếm các thông tin phản luận và lắng nghe tiếng nói trái chiều. Đó là cách duy nhất để xây dựng tư duy sắc bén!"
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
        if (slideId === 'slide_memo89_1') {
            const main = canvas.querySelector('.hook-main-icon-v89');
            const sub = canvas.querySelector('.hook-sub-icon-v89');
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
        else if (slideId === 'slide_memo89_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo89_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v89');
            const barrier = canvas.querySelector('.barrier-v89');
            const part = canvas.querySelector('.sim-particle-v89');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'LẮNG NGHE ĐA CHIỀU';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: LẮNG NGHE ĐA CHIỀU';
                if (statusTag) {
                    statusTag.textContent = '90% (SÁNG SUỐT)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'LỌC NIỀM TIN';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('confirmation' === 'ostrich' || 'confirmation' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: LỌC NIỀM TIN';
                if (statusTag) {
                    statusTag.textContent = '20% (PHIẾN DIỆN)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo89_4' && canvas.querySelector('.comp-row-v89')) {
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
        else if (slideId === 'slide_memo89_5' || (slideId === 'slide_memo89_4' && canvas.querySelector('.takeaway-box-v89'))) {
            const box = canvas.querySelector('.takeaway-box-v89');
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
        scriptName: 'video89',
        topic: 'Confirmation Bias',
        episodeNum: 89,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 89 Plugin] Loaded: Thiên kiến Xác nhận.');
})();
