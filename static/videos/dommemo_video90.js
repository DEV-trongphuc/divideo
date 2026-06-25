(function() {
    const customSlideIds = [
        'slide_memo90_1',
        'slide_memo90_2',
        'slide_memo90_3',
        'slide_memo90_4',
        'slide_memo90_5'
    ];

    const keywordsData = {
        "slide_memo90_1": [
                {
                        "text": "khoảnh khắc trượt",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo90_2": [
                {
                        "text": "tượng này là",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo90_3": [
                {
                        "text": "phỏng: Khi mối",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo90_4": [
                {
                        "text": "sánh: Trạng thái",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ],
        "slide_memo90_5": [
                {
                        "text": "gian không thực",
                        "start": 1.5,
                        "end": 6.5,
                        "class": "active-green"
                }
        ]
};

    function renderGfx(slideId, canvas) {
        const needsTemplate = (canvas.children.length === 0);
        
        if (slideId === 'slide_memo90_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo90-1-container">
                        <span class="ambient-sleep-particle-v90" style="top: 15%; left: 10%; animation-delay: 0s;">⚡</span>
                        <span class="ambient-sleep-particle-v90" style="top: 75%; left: 88%; animation-delay: -3s;">🧠</span>
                        <span class="ambient-sleep-particle-v90" style="top: 20%; left: 80%; animation-delay: -5s;">✨</span>

                        <div class="sleep-hook-box">
                <div class="hook-main-icon-v90">⚡</div>
                <div class="hook-sub-icon-v90">⏳</div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo90_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo90-4-container">
                        <span class="ambient-sleep-particle-v90" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v90" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="comp-row-v90">
                            <div class="comp-card-v90 card-left card-active">
                                <div class="comp-header-v90">
                                    <h3>Trải Nghiệm Thường Ngày</h3>
                                    <div class="comp-icon-v90">🕰️</div>
                                </div>
                                <div class="comp-bullet-list-v90">
                                    <div class="comp-bullet-row-v90" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v90">✨</span>
                                        <span>Não ghi nhận thông tin lướt qua</span>
                                    </div>
                                    <div class="comp-bullet-row-v90" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v90">✨</span>
                                        <span>Mật độ ký ức ở mức tối thiểu</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v90">1x TỐC ĐỘ</div>
                            </div>

                            <div class="comp-card-v90 card-right card-inactive">
                                <div class="comp-header-v90">
                                    <h3>Khoảnh Khắc Nguy Hiểm</h3>
                                    <div class="comp-icon-v90">⚡</div>
                                </div>
                                <div class="comp-bullet-list-v90">
                                    <div class="comp-bullet-row-v90" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v90">❌</span>
                                        <span>Kích hoạt hạch hạnh nhân tối đa</span>
                                    </div>
                                    <div class="comp-bullet-row-v90" style="opacity:1; transform:translateY(0);">
                                        <span class="comp-bullet-icon-v90">❌</span>
                                        <span>Ghi lại mọi chi tiết để sinh tồn</span>
                                    </div>
                                </div>
                                <div class="comp-footer-v90">5x QUAY CHẬM</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo90_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo90-3-container">
                        <span class="ambient-sleep-particle-v90" style="top: 10%; left: 15%; animation-delay: -1s;">⚡</span>
                        <span class="ambient-sleep-particle-v90" style="top: 80%; left: 82%; animation-delay: -5s;">🧠</span>

                        <div class="chat-bubble-panel-v90">
                <div class="state-indicator-badge rested">BÌNH THƯỜNG</div>
                <div class="sim-scene-v90">
                    <div class="barrier-v90"></div>
                    <span class="sim-actor-v90">⚡</span>
                    <span class="sim-particle-v90">⚡</span>
                </div>
                <div class="interpretation-lbl">Mô phỏng hành vi</div>
            </div>
            <div class="amygdala-dashboard-v90">
                <h3 style="font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    TỐC ĐỘ NHẬN THỨC
                </h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 14px; color: rgba(255,255,255,0.6);">Mật độ ký ức / giây</span>
                    <span class="amygdala-status-badge calm">1x (ỔN ĐỊNH)</span>
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; margin-top: 5px;">
                    💡 Mật độ dữ liệu ghi nhớ tăng cao khiến khi hồi tưởng lại, não bộ diễn dịch khoảng thời gian đó dài hơn nhiều so với thực tế.
                </div>
            </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo90_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo90-4-container">
                        <span class="ambient-sleep-particle-v90" style="top: 12%; left: 85%; animation-delay: -2s;">✨</span>
                        <span class="ambient-sleep-particle-v90" style="top: 78%; left: 12%; animation-delay: -5s;">🧠</span>

                        <div class="sleep-diagram-board" style="width:720px; height:340px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.25);">
                            <pre style='color:#a7f3d0; font-family:monospace; text-align:left; font-size:15px; line-height:1.6; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; margin:0;'>// MẬT ĐỘ KÝ ỨC TRONG NGUY HIỂM
let threatLevel = 0.95; // Nguy kịch
let memoryCaptureRate = threatLevel > 0.80 ? 500 : 24; // Số khung hình/giây vọt lên
let perceivedDuration = memoryCaptureRate / 24; // Trôi chậm gấp nhiều lần</pre>
                        </div>

                        <div style="font-size: 15px; color: rgba(255,255,255,0.4); text-align: center; max-width: 650px; line-height: 1.5; border: 1.5px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; background: rgba(255,255,255,0.01); z-index: 10;">
                            💡 *Quy luật Trí Não*: So sánh: Trạng thái bình thường ghi nhớ thông tin thưa thớt. Trạng thái nguy hiểm ghi nhớ từng chi tiết nhỏ nhất để tìm cách sinh tồn.
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_memo90_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="memo-wrapper slide-memo90-5-container">
                        <div class="takeaway-radar-v90"></div>
                        <div class="takeaway-box-v90" style="transform: scale(0.9); opacity: 0; margin-top: 0px;">
                            <div class="takeaway-face-v90">⚡</div>
                            <div class="takeaway-text-v90">
                                "Thời gian không thực sự chậm lại, chính bộ não đã hoạt động phi thường để bảo vệ bạn. Hãy trân trọng cỗ máy sinh học kỳ diệu bên trong mình!"
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
        if (slideId === 'slide_memo90_1') {
            const main = canvas.querySelector('.hook-main-icon-v90');
            const sub = canvas.querySelector('.hook-sub-icon-v90');
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
        else if (slideId === 'slide_memo90_2' && canvas.querySelector('.sleep-diagram-board')) {
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
        else if (slideId === 'slide_memo90_3') {
            const badge = canvas.querySelector('.state-indicator-badge');
            const actor = canvas.querySelector('.sim-actor-v90');
            const barrier = canvas.querySelector('.barrier-v90');
            const part = canvas.querySelector('.sim-particle-v90');
            const lbl = canvas.querySelector('.interpretation-lbl');
            const statusTag = canvas.querySelector('.amygdala-status-badge');

            if (progress < 0.5) {
                if (badge) badge.textContent = 'BÌNH THƯỜNG';
                if (actor) { actor.style.transform = 'scale(1) translateX(0)'; }
                if (barrier) { barrier.style.transform = 'scaleY(1)'; barrier.style.opacity = '1'; }
                if (part) { part.style.transform = 'translate(0, 0)'; part.style.opacity = '0.2'; }
                if (lbl) lbl.textContent = 'Trạng thái: BÌNH THƯỜNG';
                if (statusTag) {
                    statusTag.textContent = '1x (ỔN ĐỊNH)';
                    statusTag.className = 'amygdala-status-badge calm';
                }
            } else {
                if (badge) badge.textContent = 'NGUY HIỂM!';
                if (actor) {
                    actor.style.transform = 'scale(1.15) translateX(30px)';
                }
                if (barrier) {
                    if ('chrono' === 'ostrich' || 'chrono' === 'handicap') {
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
                if (lbl) lbl.textContent = 'Hành vi: NGUY HIỂM!';
                if (statusTag) {
                    statusTag.textContent = '5x (QUAY CHẬM)';
                    statusTag.className = 'amygdala-status-badge active-threat';
                }
            }
        }
        // Slide 4 Dual Comparison Card Toggling
        else if (slideId === 'slide_memo90_4' && canvas.querySelector('.comp-row-v90')) {
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
        else if (slideId === 'slide_memo90_5' || (slideId === 'slide_memo90_4' && canvas.querySelector('.takeaway-box-v90'))) {
            const box = canvas.querySelector('.takeaway-box-v90');
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
        scriptName: 'video90',
        topic: 'Chronoception',
        episodeNum: 90,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[DOM Memo Video 90 Plugin] Loaded: Co giãn Thời gian.');
})();
