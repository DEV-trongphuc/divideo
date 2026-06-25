(function() {
    const customSlideIds = [
        'slide_memo80_1',
        'slide_memo80_2',
        'slide_memo80_3',
        'slide_memo80_4',
        'slide_memo80_5'
    ];

    const keywordsData = {
        "slide_memo80_1": [
                {
                        "text": "yêu thích một",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo80_2": [
                {
                        "text": "tượng này là",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo80_3": [
                {
                        "text": "phỏng: Bạn phóng",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo80_4": [
                {
                        "text": "sánh: Người áp",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo80_5": [
                {
                        "text": "tôn trọng sự",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo80_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo80-1-container">
                        <span class="ambient-sleep-particle-v80" style="top: 15%; left: 10%; animation-delay: 0s;">🗣️</span>
                        <span class="ambient-sleep-particle-v80" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v80" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v80">🗣️</div>
                <div class="hook-sub-icon-v80">📣</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo80_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo80-4-container">
                        <span class="ambient-sleep-particle-v80" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v80" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v80">
                            <div class="comp-card-v80 card-left card-active">
                                <div class="comp-header-v80">
                                    <h3>Đồng Thuận Giả Tạo</h3>
                                    <div class="comp-icon-v80">🗣️</div>
                                </div>
                                <div class="comp-bullet-list-v80">
                                    <div class="comp-bullet-row-v80" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v80">✨</span>
                                        <span>Phóng chiếu ý kiến cá nhân ra ngoài</span>
                                    </div>
                                    <div class="comp-bullet-row-v80" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v80">✨</span>
                                        <span>Nghĩ ai cũng có chung niềm tin</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v80">ÁP ĐẶT 85%</div>
                            </div>

                            <div class="comp-card-v80 card-right card-inactive">
                                <div class="comp-header-v80">
                                    <h3>Đa Dạng Quan Điểm</h3>
                                    <div class="comp-icon-v80">🌈</div>
                                </div>
                                <div class="comp-bullet-list-v80">
                                    <div class="comp-bullet-row-v80" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v80">❌</span>
                                        <span>Thừa nhận sự khác biệt xã hội</span>
                                    </div>
                                    <div class="comp-bullet-row-v80" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v80">❌</span>
                                        <span>Lắng nghe những tiếng nói trái chiều</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v80">THỰC TẾ 15%</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo80_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo80-3-container">
                        <span class="ambient-sleep-particle-v80" style="top: 10%; left: 15%; animation-delay: -1s;">🗣️</span>
                        <span class="ambient-sleep-particle-v80" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v80">
                <div class="state-indicator-badge rested">PHÓNG CHIẾU</div>
                <div class="sim-scene-v80">
                    <div class="spotlight-beam-v80"></div>
                    <span class="sim-actor-v80">🗣️</span>
                    <span class="sweat-drops-v80">💧 💧</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Tự nhiên</div>
            </div>
            <div class="amygdala-dashboard-v80">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐỘ ĐỒNG THUẬN GIẢ
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Tỷ lệ đồng ý</span>
                    <span class="amygdala-status-badge calm">85% (ẢO TƯỞNG)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Chúng ta dành nhiều thời gian với những người giống mình, tạo ra một buồng phản xạ âm thanh làm méo mó ước tính về dân số chung.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo80_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo80-4-container">
                        <span class="ambient-sleep-particle-v80" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v80" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// CHỈ SỐ PHÓNG CHIẾU ĐỒNG THUẬN
let myOpinion = "A";
let projectedAgreement = 0.85; // Não ảo tưởng 85% đồng ý
let actualAgreement = getActualStatistics("Opinion A");
console.log(\`Độ lệch: \${projectedAgreement - actualAgreement}\`);</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Người áp đặt tin rằng ý kiến của mình là chuẩn mực chung. Người cởi mở hiểu rằng mỗi cá nhân có một thế giới quan độc lập.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo80_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo80-5-container">
                        <div class="takeaway-radar-v80"></div>
                        <div class="takeaway-box-v80" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v80">🗣️</div>
                            <div class="takeaway-text-v80">
                                "Hãy tôn trọng sự khác biệt và lắng nghe nhiều góc nhìn khác nhau. Thế giới đa sắc màu chính là vẻ đẹp của cuộc sống!"
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
        if (slideId === 'slide_memo80_1') {
            const main = canvas.querySelector('.hook-main-icon-v80');
            const sub = canvas.querySelector('.hook-sub-icon-v80');
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
        else if (slideId === 'slide_memo80_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo80_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v80');
            const beam = canvas.querySelector('.spotlight-beam-v80');
            const sweat = canvas.querySelector('.sweat-drops-v80');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'PHÓNG CHIẾU';
                if (actor) { actor.style.transform = 'scale(1) translateY(0)'; }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) { sweat.style.opacity = '0'; sweat.style.transform = 'translateY(0)'; }
                if (lbl) lbl.textContent = 'Trạng thái: PHÓNG CHIẾU';
                if (statusTag) {
                    statusTag.textContent = '85% (ẢO TƯỞNG)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'THỰC TẾ KHÁCH QUAN';
                if (actor) {
                    actor.style.transform = 'scale(1.2) translateY(-5px)';
                    if ('consensus' === 'spotlight' || 'consensus' === 'attribution') {
                        actor.style.animation = 'bubble-vibrate 0.15s infinite';
                    }
                }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) {
                    sweat.style.opacity = '0';
                    sweat.style.transform = 'translateY(15px)';
                }
                if (lbl) lbl.textContent = 'Nhận thức: THỰC TẾ KHÁCH QUAN';
                if (statusTag) {
                    statusTag.textContent = '15% (ĐA DẠNG)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo80_4' && canvas.querySelector('.comp-row-v80')) {
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
        else if (slideId === 'slide_memo80_5' || (slideId === 'slide_memo80_4' && canvas.querySelector('.takeaway-box-v80'))) {
            const box = canvas.querySelector('.takeaway-box-v80');
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
        scriptName: 'video80',
        topic: 'False Consensus Effect',
        episodeNum: 80,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 80 Plugin] Loaded: Lệch lạc Đồng thuận Giả.');
})();
