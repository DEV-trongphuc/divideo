(function() {
    const customSlideIds = [
        'slide_memo78_1',
        'slide_memo78_2',
        'slide_memo78_3',
        'slide_memo78_4',
        'slide_memo78_5'
    ];

    const keywordsData = {
        "slide_memo78_1": [
                {
                        "text": "dễ dàng quên",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo78_2": [
                {
                        "text": "tượng này gọi",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo78_3": [
                {
                        "text": "phỏng: Khi hệ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo78_4": [
                {
                        "text": "sánh: Trí nhớ",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo78_5": [
                {
                        "text": "quá lạm dụng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo78_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo78-1-container">
                        <span class="ambient-sleep-particle-v78" style="top: 15%; left: 10%; animation-delay: 0s;">🖥️</span>
                        <span class="ambient-sleep-particle-v78" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v78" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v78">🖥️</div>
                <div class="hook-sub-icon-v78">🧠</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo78_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo78-4-container">
                        <span class="ambient-sleep-particle-v78" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v78" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v78">
                            <div class="comp-card-v78 card-left card-active">
                                <div class="comp-header-v78">
                                    <h3>Chủ Động Ghi Nhớ</h3>
                                    <div class="comp-icon-v78">🧠</div>
                                </div>
                                <div class="comp-bullet-list-v78">
                                    <div class="comp-bullet-row-v78" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v78">✨</span>
                                        <span>Nỗ lực liên kết các neuron</span>
                                    </div>
                                    <div class="comp-bullet-row-v78" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v78">✨</span>
                                        <span>Lưu trữ thông tin sâu vào dài hạn</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v78">80% LƯU GIỮ</div>
                            </div>

                            <div class="comp-card-v78 card-right card-inactive">
                                <div class="comp-header-v78">
                                    <h3>Ỷ Lại Tra Cứu</h3>
                                    <div class="comp-icon-v78">📱</div>
                                </div>
                                <div class="comp-bullet-list-v78">
                                    <div class="comp-bullet-row-v78" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v78">❌</span>
                                        <span>Gán nhãn thông tin 'đã có trên mạng'</span>
                                    </div>
                                    <div class="comp-bullet-row-v78" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v78">❌</span>
                                        <span>Không ghi lại dấu vết bộ nhớ</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v78">20% LƯU GIỮ</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo78_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo78-3-container">
                        <span class="ambient-sleep-particle-v78" style="top: 10%; left: 15%; animation-delay: -1s;">🖥️</span>
                        <span class="ambient-sleep-particle-v78" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v78">
                <div class="state-indicator-badge rested">TỰ GHI NHỚ</div>
                <div class="sim-scene-v78">
                    <div class="barrier-v78"></div>
                    <span class="sim-actor-v78">🖥️</span>
                    <span class="sim-particle-v78">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v78">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    LƯU TRỮ DÀI HẠN
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số lưu nhớ</span>
                    <span class="amygdala-status-badge calm">80% (BỀN VỮNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Não bộ hoạt động theo nguyên tắc tối ưu năng lượng: nếu thông tin có sẵn bên ngoài, nó sẽ giải phóng bộ nhớ để tiết kiệm glucose.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo78_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo78-4-container">
                        <span class="ambient-sleep-particle-v78" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v78" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// ĐỘ LƯU TRỮ TRONG NÃO BỘ
let infoAvailableOnline = true;
let brainStoragePriority = infoAvailableOnline ? "Low" : "High";
if (brainStoragePriority == "Low") {
    clearMemoryCache(); // Não xóa bớt thông tin
}</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Trí nhớ tự nhiên giúp liên kết tư duy sâu sắc, nhanh chóng. Trí nhớ kỹ thuật số tạo sự phụ thuộc và hạn chế sự hiểu biết bản chất.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo78_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo78-5-container">
                        <div class="takeaway-radar-v78"></div>
                        <div class="takeaway-box-v78" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v78">🖥️</div>
                            <div class="takeaway-text-v78">
                                "Đừng quá lạm dụng các công cụ tìm kiếm. Hãy chủ động ghi nhớ và tư duy sâu để xây dựng một bộ não nhạy bén và độc lập!"
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
        if (slideId === 'slide_memo78_1') {
            const main = canvas.querySelector('.hook-main-icon-v78');
            const sub = canvas.querySelector('.hook-sub-icon-v78');
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
        else if (slideId === 'slide_memo78_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo78_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v78');
            const barrier = canvas.querySelector('.barrier-v78');
            const part = canvas.querySelector('.sim-particle-v78');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TỰ GHI NHỚ';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: TỰ GHI NHỚ';
                if (statusTag) {
                    statusTag.textContent = '80% (BỀN VỮNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'DÙNG TRA CỨU';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('google' === 'ostrich' || 'google' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: DÙNG TRA CỨU';
                if (statusTag) {
                    statusTag.textContent = '20% (MAU QUÊN)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo78_4' && canvas.querySelector('.comp-row-v78')) {
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
        else if (slideId === 'slide_memo78_5' || (slideId === 'slide_memo78_4' && canvas.querySelector('.takeaway-box-v78'))) {
            const box = canvas.querySelector('.takeaway-box-v78');
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
        scriptName: 'video78',
        topic: 'Google Effect',
        episodeNum: 78,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 78 Plugin] Loaded: Hiệu ứng Google.');
})();
