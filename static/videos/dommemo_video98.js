(function() {
    const customSlideIds = [
        'slide_memo98_1',
        'slide_memo98_2',
        'slide_memo98_3',
        'slide_memo98_4',
        'slide_memo98_5'
    ];

    const keywordsData = {
        "slide_memo98_1": [
                {
                        "text": "người đi muộn,",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo98_2": [
                {
                        "text": "là Sai lầm",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo98_3": [
                {
                        "text": "phỏng: Khi gán",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo98_4": [
                {
                        "text": "sánh: Phán xét",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo98_5": [
                {
                        "text": "bao dung hơn",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo98_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo98-1-container">
                        <span class="ambient-sleep-particle-v98" style="top: 15%; left: 10%; animation-delay: 0s;">⚖️</span>
                        <span class="ambient-sleep-particle-v98" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v98" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v98">⚖️</div>
                <div class="hook-sub-icon-v98">⚖️</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo98_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo98-4-container">
                        <span class="ambient-sleep-particle-v98" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v98" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v98">
                            <div class="comp-card-v98 card-left card-active">
                                <div class="comp-header-v98">
                                    <h3>Đánh Giá Người Khác</h3>
                                    <div class="comp-icon-v98">🎭</div>
                                </div>
                                <div class="comp-bullet-list-v98">
                                    <div class="comp-bullet-row-v98" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v98">✨</span>
                                        <span>Bỏ qua bối cảnh tắc đường, gia cảnh</span>
                                    </div>
                                    <div class="comp-bullet-row-v98" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v98">✨</span>
                                        <span>Quy ngay lỗi lầm do tính cách tồi</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v98">90% QUY CHỤP TÍNH CÁCH</div>
                            </div>

                            <div class="comp-card-v98 card-right card-inactive">
                                <div class="comp-header-v98">
                                    <h3>Đánh Giá Bản Thân</h3>
                                    <div class="comp-icon-v98">⚖️</div>
                                </div>
                                <div class="comp-bullet-list-v98">
                                    <div class="comp-bullet-row-v98" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v98">❌</span>
                                        <span>Nắm rõ mọi hoàn cảnh khách quan</span>
                                    </div>
                                    <div class="comp-bullet-row-v98" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v98">❌</span>
                                        <span>Đổ lỗi cho kẹt xe, thời tiết xui xẻo</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v98">15% ĐỔ LỖI HOÀN CẢNH</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo98_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo98-3-container">
                        <span class="ambient-sleep-particle-v98" style="top: 10%; left: 15%; animation-delay: -1s;">⚖️</span>
                        <span class="ambient-sleep-particle-v98" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v98">
                <div class="state-indicator-badge rested">NGƯỜI KHÁC LỖI</div>
                <div class="sim-scene-v98">
                    <div class="spotlight-beam-v98"></div>
                    <span class="sim-actor-v98">⚖️</span>
                    <span class="sweat-drops-v98">💧 💧</span>
                </div>
                <div class="interpretation-lbl">Trạng thái: Tự nhiên</div>
            </div>
            <div class="amygdala-dashboard-v98">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    ĐÁNH GIÁ HÀNH VI
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Gán cho Tính cách</span>
                    <span class="amygdala-status-badge calm">90% (QUY CHỤP)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Chúng ta nhìn thấy hoàn cảnh của mình rất rõ ràng, nhưng đối với người khác, chúng ta chỉ nhìn thấy hành động của họ mà bỏ qua bối cảnh xung quanh.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo98_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo98-4-container">
                        <span class="ambient-sleep-particle-v98" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v98" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// SAI LẦM GÁN GHÉP CƠ BẢN
let subject = "OtherPerson";
let mistake = "LateForMeeting";
let attribution = (subject == "Self") ? "Situational (Traffic)" : "Dispositional (Lazy)";
console.log(\`Kết luận lỗi do: \${attribution}\`);</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Phán xét phiến diện bỏ qua hoàn cảnh khách quan. Thấu hiểu đa chiều giúp cảm thông và xây dựng mối quan hệ tốt đẹp.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo98_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo98-5-container">
                        <div class="takeaway-radar-v98"></div>
                        <div class="takeaway-box-v98" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v98">⚖️</div>
                            <div class="takeaway-text-v98">
                                "Hãy bao dung hơn với người khác và nghiêm khắc hơn với bản thân. Sự thấu hiểu hoàn cảnh chính là nền tảng của lòng nhân ái!"
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
        if (slideId === 'slide_memo98_1') {
            const main = canvas.querySelector('.hook-main-icon-v98');
            const sub = canvas.querySelector('.hook-sub-icon-v98');
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
        else if (slideId === 'slide_memo98_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo98_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v98');
            const beam = canvas.querySelector('.spotlight-beam-v98');
            const sweat = canvas.querySelector('.sweat-drops-v98');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'NGƯỜI KHÁC LỖI';
                if (actor) { actor.style.transform = 'scale(1) translateY(0)'; }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) { sweat.style.opacity = '0'; sweat.style.transform = 'translateY(0)'; }
                if (lbl) lbl.textContent = 'Trạng thái: NGƯỜI KHÁC LỖI';
                if (statusTag) {
                    statusTag.textContent = '90% (QUY CHỤP)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'BẢN THÂN LỖI';
                if (actor) {
                    actor.style.transform = 'scale(1.2) translateY(-5px)';
                    if ('attribution' === 'spotlight' || 'attribution' === 'attribution') {
                        actor.style.animation = 'bubble-vibrate 0.15s infinite';
                    }
                }
                if (beam) { beam.style.opacity = '0'; }
                if (sweat) {
                    sweat.style.opacity = '0';
                    sweat.style.transform = 'translateY(15px)';
                }
                if (lbl) lbl.textContent = 'Nhận thức: BẢN THÂN LỖI';
                if (statusTag) {
                    statusTag.textContent = '15% (ĐỔ HOÀN CẢNH)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo98_4' && canvas.querySelector('.comp-row-v98')) {
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
        else if (slideId === 'slide_memo98_5' || (slideId === 'slide_memo98_4' && canvas.querySelector('.takeaway-box-v98'))) {
            const box = canvas.querySelector('.takeaway-box-v98');
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
        scriptName: 'video98',
        topic: 'Fundamental Attribution Error',
        episodeNum: 98,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 98 Plugin] Loaded: Lệch lạc Gán ghép.');
})();
