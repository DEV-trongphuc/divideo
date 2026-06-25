(function() {
    const customSlideIds = [
        'slide_memo88_1',
        'slide_memo88_2',
        'slide_memo88_3',
        'slide_memo88_4',
        'slide_memo88_5'
    ];

    const keywordsData = {
        "slide_memo88_1": [
                {
                        "text": "trong một bể",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo88_2": [
                {
                        "text": "chính là Hiện",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo88_3": [
                {
                        "text": "phỏng: Khi các",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo88_4": [
                {
                        "text": "sánh: Trạng thái",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo88_5": [
                {
                        "text": "não là một",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo88_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo88-1-container">
                        <span class="ambient-sleep-particle-v88" style="top: 15%; left: 10%; animation-delay: 0s;">🌌</span>
                        <span class="ambient-sleep-particle-v88" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v88" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v88">🌌</div>
                <div class="hook-sub-icon-v88">🛸</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo88_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo88-4-container">
                        <span class="ambient-sleep-particle-v88" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v88" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v88">
                            <div class="comp-card-v88 card-left card-active">
                                <div class="comp-header-v88">
                                    <h3>Nhận Tín Hiệu Thực Tế</h3>
                                    <div class="comp-icon-v88">👁️</div>
                                </div>
                                <div class="comp-bullet-list-v88">
                                    <div class="comp-bullet-row-v88" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v88">✨</span>
                                        <span>Ánh sáng và âm thanh liên tục</span>
                                    </div>
                                    <div class="comp-bullet-row-v88" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v88">✨</span>
                                        <span>Não phân tích dữ liệu bên ngoài</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v88">ỔN ĐỊNH 5%</div>
                            </div>

                            <div class="comp-card-v88 card-right card-inactive">
                                <div class="comp-header-v88">
                                    <h3>Cắt Đứt Giác Quan</h3>
                                    <div class="comp-icon-v88">🌌</div>
                                </div>
                                <div class="comp-bullet-list-v88">
                                    <div class="comp-bullet-row-v88" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v88">❌</span>
                                        <span>Tín hiệu đầu vào rơi về mức 0</span>
                                    </div>
                                    <div class="comp-bullet-row-v88" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v88">❌</span>
                                        <span>Hệ RAS tăng độ nhạy tối đa</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v88">BÙNG PHÁT 95%</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo88_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo88-3-container">
                        <span class="ambient-sleep-particle-v88" style="top: 10%; left: 15%; animation-delay: -1s;">🌌</span>
                        <span class="ambient-sleep-particle-v88" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v88">
                <div class="state-indicator-badge rested">TIẾP NHẬN BÌNH THƯỜNG</div>
                <div class="sim-scene-v88">
                    <div class="barrier-v88"></div>
                    <span class="sim-actor-v88">🌌</span>
                    <span class="sim-particle-v88">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v88">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    HOẠT ĐỘNG VỎ NÃO
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Chỉ số ảo giác</span>
                    <span class="amygdala-status-badge calm">5% (ỔN ĐỊNH)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Thiếu hụt kích thích từ bên ngoài khiến hệ lưới hoạt hóa vỏ não (RAS) nâng độ nhạy cảm lên tối đa, diễn dịch các nhiễu loạn nội bộ thành ảo ảnh thực tế.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo88_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo88-4-container">
                        <span class="ambient-sleep-particle-v88" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v88" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// CÔ LẬP GIÁC QUAN TRONG BỂ
let sensoryInput = 0; // Tối hoàn toàn
let brainHallucinationThreshold = 10;
let corticalSensitivity = 150; // Độ nhạy vọt lên
if (sensoryInput < brainHallucinationThreshold) {
    triggerHallucinations(); // Tự sinh ảo giác
}</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Trạng thái bình thường tiếp nhận thông tin khách quan. Trạng thái cô lập buộc não bộ phải tự phóng chiếu thế giới nội tâm ra ngoài.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo88_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo88-5-container">
                        <div class="takeaway-radar-v88"></div>
                        <div class="takeaway-box-v88" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v88">🌌</div>
                            <div class="takeaway-text-v88">
                                "Bộ não là một cỗ máy xử lý thông tin không bao giờ ngừng nghỉ. Khi thế giới im lặng, nội tâm bạn sẽ bắt đầu lên tiếng!"
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
        if (slideId === 'slide_memo88_1') {
            const main = canvas.querySelector('.hook-main-icon-v88');
            const sub = canvas.querySelector('.hook-sub-icon-v88');
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
        else if (slideId === 'slide_memo88_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo88_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v88');
            const barrier = canvas.querySelector('.barrier-v88');
            const part = canvas.querySelector('.sim-particle-v88');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'TIẾP NHẬN BÌNH THƯỜNG';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: TIẾP NHẬN BÌNH THƯỜNG';
                if (statusTag) {
                    statusTag.textContent = '5% (ỔN ĐỊNH)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'CÔ LẬP GIÁC QUAN';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('deprivation' === 'ostrich' || 'deprivation' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: CÔ LẬP GIÁC QUAN';
                if (statusTag) {
                    statusTag.textContent = '95% (BÙNG PHÁT)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo88_4' && canvas.querySelector('.comp-row-v88')) {
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
        else if (slideId === 'slide_memo88_5' || (slideId === 'slide_memo88_4' && canvas.querySelector('.takeaway-box-v88'))) {
            const box = canvas.querySelector('.takeaway-box-v88');
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
        scriptName: 'video88',
        topic: 'Sensory Deprivation',
        episodeNum: 88,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 88 Plugin] Loaded: Ảo giác Trôi nổi.');
})();
