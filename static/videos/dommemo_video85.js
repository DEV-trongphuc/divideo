(function() {
    const customSlideIds = [
        'slide_memo85_1',
        'slide_memo85_2',
        'slide_memo85_3',
        'slide_memo85_4',
        'slide_memo85_5'
    ];

    const keywordsData = {
        "slide_memo85_1": [
                {
                        "text": "đồng xu 5",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo85_2": [
                {
                        "text": "gọi là Ảo",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo85_3": [
                {
                        "text": "phỏng: Giữa các",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo85_4": [
                {
                        "text": "sánh: Nhìn nhận",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo85_5": [
                {
                        "text": "phải sự trùng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo85_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo85-1-container">
                        <span class="ambient-sleep-particle-v85" style="top: 15%; left: 10%; animation-delay: 0s;">🎲</span>
                        <span class="ambient-sleep-particle-v85" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v85" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v85">🎲</div>
                <div class="hook-sub-icon-v85">🔮</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo85_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo85-2-container">
                        <span class="ambient-sleep-particle-v85" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v85" style="top: 82%; left: 10%; animation-delay: -4s;">🎲</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v85 node-1">
                                <span class="diagram-node-icon">🎲</span>
                                <span>1. Dữ liệu ngẫu nhiên</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v85 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Não quét khuôn mẫu</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v85 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Vẽ đường kết nối</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Ảo giác Gom nhóm*: Đó gọi là Ảo giác Gom nhóm. Bộ não con người tiến hóa để tìm kiếm các khuôn mẫu, dẫn đến việc tự động kết nối các dữ liệu ngẫu nhiên thành quy luật.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo85_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo85-3-container">
                        <span class="ambient-sleep-particle-v85" style="top: 10%; left: 15%; animation-delay: -1s;">🎲</span>
                        <span class="ambient-sleep-particle-v85" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v85">
                <div class="state-indicator-badge rested">DỮ LIỆU NGẪU NHIÊN</div>
                <div class="sim-scene-v85">
                    <div class="barrier-v85"></div>
                    <span class="sim-actor-v85">🎲</span>
                    <span class="sim-particle-v85">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v85">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ LỆCH NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mức độ tìm quy luật</span>
                    <span class="amygdala-status-badge calm">10% (KHÁCH QUAN)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Tìm kiếm khuôn mẫu là cơ chế sinh tồn cổ xưa giúp tổ tiên phát hiện thú dữ ẩn nấp trong rừng cây rậm rạp.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo85_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo85-4-container">
                        <span class="ambient-sleep-particle-v85" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v85" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v85">
                            <div class="comp-card-v85 card-left card-active">
                                <div class="comp-header-v85">
                                    <h3>Nhìn Nhận Ngẫu Nhiên</h3>
                                    <div class="comp-icon-v85">🎲</div>
                                </div>
                                <div class="comp-bullet-list-v85">
                                    <div class="comp-bullet-row-v85" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v85">✨</span>
                                        <span>Hiểu rõ lý thuyết xác suất</span>
                                    </div>
                                    <div class="comp-bullet-row-v85" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v85">✨</span>
                                        <span>Chấp nhận sự trùng hợp tự nhiên</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v85">KHÁCH QUAN</div>
                            </div>

                            <div class="comp-card-v85 card-right card-inactive">
                                <div class="comp-header-v85">
                                    <h3>Vẽ Quy Luật Ảo</h3>
                                    <div class="comp-icon-v85">🔮</div>
                                </div>
                                <div class="comp-bullet-list-v85">
                                    <div class="comp-bullet-row-v85" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v85">❌</span>
                                        <span>Cố giải nghĩa mọi sự kiện</span>
                                    </div>
                                    <div class="comp-bullet-row-v85" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v85">❌</span>
                                        <span>Tin vào điềm báo tưởng tượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v85">ẢO GIÁC</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo85_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo85-5-container">
                        <div class="takeaway-radar-v85"></div>
                        <div class="takeaway-box-v85" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v85">🎲</div>
                            <div class="takeaway-text-v85">
                                "Không phải sự trùng hợp nào cũng mang thông điệp vũ trụ. Hãy học cách chấp nhận sự ngẫu nhiên để đưa ra các quyết định sáng suốt hơn!"
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
        if (slideId === 'slide_memo85_1') {
            const main = canvas.querySelector('.hook-main-icon-v85');
            const sub = canvas.querySelector('.hook-sub-icon-v85');
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
        else if (slideId === 'slide_memo85_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo85_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v85');
            const barrier = canvas.querySelector('.barrier-v85');
            const part = canvas.querySelector('.sim-particle-v85');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'DỮ LIỆU NGẪU NHIÊN';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: DỮ LIỆU NGẪU NHIÊN';
                if (statusTag) {
                    statusTag.textContent = '10% (KHÁCH QUAN)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'NÃO TỰ VẼ QUY LUẬT';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('clustering' === 'ostrich' || 'clustering' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: NÃO TỰ VẼ QUY LUẬT';
                if (statusTag) {
                    statusTag.textContent = '90% (ẢO GIÁC)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo85_4' && canvas.querySelector('.comp-row-v85')) {
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
        else if (slideId === 'slide_memo85_5' || (slideId === 'slide_memo85_4' && canvas.querySelector('.takeaway-box-v85'))) {
            const box = canvas.querySelector('.takeaway-box-v85');
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
        scriptName: 'video85',
        topic: 'Clustering Illusion',
        episodeNum: 85,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 85 Plugin] Loaded: Ảo giác Gom nhóm.');
})();
