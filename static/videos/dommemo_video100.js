(function() {
    const customSlideIds = [
        'slide_memo100_1',
        'slide_memo100_2',
        'slide_memo100_3',
        'slide_memo100_4',
        'slide_memo100_5'
    ];

    const keywordsData = {
        "slide_memo100_1": [
                {
                        "text": "muốn vừa sáng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo100_2": [
                {
                        "text": "chính là Trạng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo100_3": [
                {
                        "text": "phỏng: Hai bán",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo100_4": [
                {
                        "text": "sánh: Não hoạt",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo100_5": [
                {
                        "text": "rèn luyện sự",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo100_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo100-1-container">
                        <span class="ambient-sleep-particle-v100" style="top: 15%; left: 10%; animation-delay: 0s;">🧠</span>
                        <span class="ambient-sleep-particle-v100" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v100" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v100">🧠</div>
                <div class="hook-sub-icon-v100">⚡</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo100_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo100-2-container">
                        <span class="ambient-sleep-particle-v100" style="top: 8%; left: 85%; animation-delay: -2s;">🧠</span>
                        <span class="ambient-sleep-particle-v100" style="top: 82%; left: 10%; animation-delay: -4s;">🧠</span>

                        <div class="sleep-diagram-board">
                            <div class="diagram-node-v100 node-1">
                                <span class="diagram-node-icon">🧠</span>
                                <span>1. Đầu Vào</span>
                            </div>
                            <span class="node-link-arrow arrow-1">➡️</span>
                            <div class="diagram-node-v100 node-2">
                                <span class="diagram-node-icon">🧠</span>
                                <span>2. Xử Lý Não</span>
                            </div>
                            <span class="node-link-arrow arrow-2">➡️</span>
                            <div class="diagram-node-v100 node-3">
                                <span class="diagram-node-icon">✨</span>
                                <span>3. Nhận Thức</span>
                            </div>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Đồng bộ Bán cầu*: Đó chính là Trạng thái Đồng bộ Bán cầu Não. Khi các sóng não trái và phải đồng bộ tần số, bạn sẽ bước vào trạng thái dòng chảy tập trung tối đa.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo100_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo100-3-container">
                        <span class="ambient-sleep-particle-v100" style="top: 10%; left: 15%; animation-delay: -1s;">🧠</span>
                        <span class="ambient-sleep-particle-v100" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v100">
                <div class="state-indicator-badge rested">HOẠT ĐỘNG LỆCH PHA</div>
                <div class="sim-scene-v100">
                    <div class="barrier-v100"></div>
                    <span class="sim-actor-v100">🧠</span>
                    <span class="sim-particle-v100">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v100">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỒNG BỘ SÓNG NÃO
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Brainwave Sync</span>
                    <span class="amygdala-status-badge calm">30% (RỜI RẠC)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Sự đồng bộ hai bán cầu não tối ưu hóa dòng chảy thông tin qua thể chai, kết nối phân tích chi tiết với bức tranh toàn cảnh một cách liền mạch.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo100_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo100-4-container">
                        <span class="ambient-sleep-particle-v100" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v100" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v100">
                            <div class="comp-card-v100 card-left card-active">
                                <div class="comp-header-v100">
                                    <h3>TRẠNG THÁI A</h3>
                                    <div class="comp-icon-v100">🧠</div>
                                </div>
                                <div class="comp-bullet-list-v100">
                                    <div class="comp-bullet-row-v100" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v100">✨</span>
                                        <span>Phản xạ tự nhiên của cơ thể</span>
                                    </div>
                                    <div class="comp-bullet-row-v100" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v100">✨</span>
                                        <span>Diễn ra nhanh chóng, ít tốn calo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v100">BẢN NĂNG</div>
                            </div>

                            <div class="comp-card-v100 card-right card-inactive">
                                <div class="comp-header-v100">
                                    <h3>TRẠNG THÁI B</h3>
                                    <div class="comp-icon-v100">⚙️</div>
                                </div>
                                <div class="comp-bullet-list-v100">
                                    <div class="comp-bullet-row-v100" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v100">❌</span>
                                        <span>Phản ứng chậm do ý thức can thiệp</span>
                                    </div>
                                    <div class="comp-bullet-row-v100" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v100">❌</span>
                                        <span>Đòi hỏi tập trung và năng lượng</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v100">NHẬN THỨC MỚI</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo100_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo100-5-container">
                        <div class="takeaway-radar-v100"></div>
                        <div class="takeaway-box-v100" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v100">🧠</div>
                            <div class="takeaway-text-v100">
                                "Hãy rèn luyện sự đồng bộ bằng cách thiền định, nghe âm thanh tần số kép (binaural beats) và phối hợp cả phân tích logic lẫn liên tưởng sáng tạo!"
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
        if (slideId === 'slide_memo100_1') {
            const main = canvas.querySelector('.hook-main-icon-v100');
            const sub = canvas.querySelector('.hook-sub-icon-v100');
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
        else if (slideId === 'slide_memo100_2') {
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
        else if (slideId === 'slide_memo100_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v100');
            const barrier = canvas.querySelector('.barrier-v100');
            const part = canvas.querySelector('.sim-particle-v100');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'HOẠT ĐỘNG LỆCH PHA';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: HOẠT ĐỘNG LỆCH PHA';
                if (statusTag) {
                    statusTag.textContent = '30% (RỜI RẠC)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'ĐỒNG BỘ ĐỒNG PHA!';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('brainsync' === 'ostrich' || 'brainsync' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: ĐỒNG BỘ ĐỒNG PHA!';
                if (statusTag) {
                    statusTag.textContent = '98% (DÒNG CHẢY FLOW)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        else if (slideId === 'slide_memo100_4') {
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
        else if (slideId === 'slide_memo100_5') {
            const box = canvas.querySelector('.takeaway-box-v100');
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
        scriptName: 'video100',
        topic: 'Hemisphere Sync',
        episodeNum: 100,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 100 Plugin] Loaded: Đồng bộ Bán cầu.');
})();
