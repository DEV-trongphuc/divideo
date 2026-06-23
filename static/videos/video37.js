/**
 * Video 37: Google Free Business Model - "Tại sao Google lại miễn phí?"
 * Dynamic GFX and Slide animation plugin for Video 37
 */
(function () {
    'use strict';

    // ── KEYWORDS TIMINGS (Max 2 keywords per slide) ───────────────────────────
    const keywordsData = {
        slide_v37_hook: [
            { text: 'miễn phí', start: 3.0, end: 7.0, class: 'active-good' },
            { text: 'nhà quảng cáo', start: 10.5, end: 14.5, class: 'active-gold' }
        ],
        slide_v37_you_are_product: [
            { text: 'âm thầm ghi nhận', start: 2.5, end: 6.5, class: 'active-gold' },
            { text: 'hồ sơ chân dung', start: 8.5, end: 13.0, class: 'active-good' }
        ],
        slide_v37_ad_auction: [
            { text: 'đấu giá chớp nhoáng', start: 3.0, end: 7.5, class: 'active-good' },
            { text: 'giá thầu', start: 8.0, end: 12.0, class: 'active-gold' }
        ],
        slide_v37_sponsored_ads: [
            { text: 'được tài trợ', start: 2.0, end: 6.0, class: 'active-gold' },
            { text: 'Pay-Per-Click', start: 8.5, end: 12.5, class: 'active-good' }
        ],
        slide_v37_adsense_network: [
            { text: 'phân phối quảng cáo', start: 3.0, end: 7.5, class: 'active-good' },
            { text: 'AdSense', start: 8.0, end: 12.5, class: 'active-gold' }
        ],
        slide_v37_recap: [
            { text: 'dữ liệu hành vi', start: 2.5, end: 7.0, class: 'active-gold' },
            { text: '200 tỷ đô', start: 8.5, end: 13.5, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_v37_hook', 'slide_v37_you_are_product', 'slide_v37_ad_auction',
        'slide_v37_sponsored_ads', 'slide_v37_adsense_network', 'slide_v37_recap'
    ];

    function initIcons(canvas) {
        if (window.lucide) window.lucide.createIcons({ node: canvas });
    }

    // Helper to wrap standard slide GFX background
    function sceneWrap(inner, absolute, tint) {
        const bgClass = tint ? `v37-grid-bg ${tint}` : 'v37-grid-bg';
        const absHtml = absolute || '';
        return `
            <div class="v37-scene-wrapper">
                <div class="${bgClass}"></div>
                ${absHtml}
                <div style="position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; gap:20px;">
                    ${inner}
                </div>
            </div>
        `;
    }

    // ── GFX RENDERER ───────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_v37_hook') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div class="v37-google-intro-container">
                        <div class="v37-google-glow-ring"></div>
                        <div class="v37-google-glow-ring inner"></div>
                        <div class="v37-giant-google-logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="Google Logo">
                        </div>
                    </div>
                    <div class="v37-glass-card glow-gold" style="text-align: center; max-width: 520px; padding: 24px 30px; margin-top: 30px;">
                        <div class="v37-status-badge gold" style="margin-bottom: 12px; font-size: 18px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); color: var(--gold-secondary); border-radius: 99px;">
                            <i data-lucide="search" style="width:20px;height:20px;"></i> Google Search
                        </div>
                        <div style="font-family:'Fira Code', monospace; font-size: 24px; font-weight: bold; color: var(--gold-secondary); line-height: 1.5;" id="v37-intro-label">
                            Bạn dùng Google 20 năm không mất đồng nào?
                        </div>
                    </div>
                `, null, 'gold-tint');
                initIcons(canvas);
            }
        }
        else if (slideId === 'slide_v37_you_are_product') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div class="v37-vertical-layout" style="zoom:0.95;">
                        <!-- User device tracking mockup -->
                        <div class="v37-phone v37-phone-compact">
                            <div class="v37-phone-notch"></div>
                            <div class="v37-phone-screen" style="justify-content:flex-start;">
                                <div style="text-align:center; padding-top:10px;">
                                    <span style="font-size:32px;">👦</span>
                                    <div style="font-size:16px; font-weight:bold; margin-top:4px; color:#fff;">Người dùng miễn phí</div>
                                </div>
                                <div style="margin-top:15px; display:flex; flex-direction:column; gap:8px; text-align:left;">
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
                                        <span>🔍 Google Search</span>
                                        <span class="v37-s2-indicator ind-search" style="font-size:11px; color:rgba(255,255,255,0.3);">Idle</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
                                        <span>🎥 YouTube Video</span>
                                        <span class="v37-s2-indicator ind-youtube" style="font-size:11px; color:rgba(255,255,255,0.3);">Idle</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
                                        <span>📍 Google Maps Location</span>
                                        <span class="v37-s2-indicator ind-maps" style="font-size:11px; color:rgba(255,255,255,0.3);">Idle</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Data pipeline vector -->
                        <div style="height:35px; display:flex; align-items:center; justify-content:center;">
                            <i data-lucide="arrow-down" style="width:20px;height:20px;color:#f59e0b;" class="v37-arrow-down-glow"></i>
                        </div>

                        <!-- Profile builder dashboard -->
                        <div class="v37-glass-card v37-detail-card" style="padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:13px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; text-align:left;">📊 Hồ sơ chân dung (User Profile)</div>
                                <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px; text-align:left;">
                                    <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05);">
                                        <div style="font-size:10px; color:rgba(255,255,255,0.4); text-transform:uppercase; margin-bottom:4px;">Nhóm nhân khẩu học</div>
                                        <div style="display:flex; gap:6px;">
                                            <span class="v37-profile-tag tag-age" style="font-size:11px; padding:3px 8px;">Tuổi: 25-34</span>
                                            <span class="v37-profile-tag tag-gender" style="font-size:11px; padding:3px 8px;">Nam giới</span>
                                        </div>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05);">
                                        <div style="font-size:10px; color:rgba(255,255,255,0.4); text-transform:uppercase; margin-bottom:4px;">Sở thích & Nhu cầu</div>
                                        <div style="display:flex; flex-wrap:wrap; gap:6px;">
                                            <span class="v37-profile-tag tag-tech" style="font-size:11px; padding:3px 8px;">Công nghệ</span>
                                            <span class="v37-profile-tag tag-travel" style="font-size:11px; padding:3px 8px;">Du lịch</span>
                                            <span class="v37-profile-tag tag-buy" style="font-size:11px; padding:3px 8px;">Mua sắm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:8px; border-color:rgba(255,255,255,0.05); margin-top:8px;">
                                <div class="v37-status-led active-scanning s2-led" style="width:6px; height:6px;"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:9px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái hồ sơ</div>
                                    <div class="v37-s2-result-text" style="font-size:11px; font-weight:bold; margin-top:1px;">Đang thu thập dữ liệu hành vi...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `, null);
                initIcons(canvas);
            }
        }
        else if (slideId === 'slide_v37_ad_auction') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div class="v37-vertical-layout" style="zoom:0.95;">
                        <!-- Advertisers Bidding Cards -->
                        <div class="v37-bidders-row">
                            <!-- Brand A -->
                            <div class="v37-glass-card v37-bidder-card float-1 brand-a">
                                <div style="font-weight:bold; color:#fff; text-align:left; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:2px; font-size:10px;">💻 Laptop A</div>
                                <div style="display:flex; flex-direction:column; align-items:flex-start; margin-top:4px; font-size:10px;">
                                    <span style="color:rgba(255,255,255,0.5); font-size:9px;">Thầu tối đa:</span>
                                    <span style="font-weight:bold; color:#3b82f6;">$1.20</span>
                                </div>
                            </div>
                            <!-- Brand B -->
                            <div class="v37-glass-card v37-bidder-card float-2 brand-b">
                                <div style="font-weight:bold; color:#fff; text-align:left; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:2px; font-size:10px;">💻 Laptop B</div>
                                <div style="display:flex; flex-direction:column; align-items:flex-start; margin-top:4px; font-size:10px;">
                                    <span style="color:rgba(255,255,255,0.5); font-size:9px;">Thầu tối đa:</span>
                                    <span style="font-weight:bold; color:#f59e0b;">$1.80</span>
                                </div>
                            </div>
                            <!-- Brand C -->
                            <div class="v37-glass-card v37-bidder-card float-3 brand-c">
                                <div style="font-weight:bold; color:#fff; text-align:left; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:2px; font-size:10px;">💻 Laptop C</div>
                                <div style="display:flex; flex-direction:column; align-items:flex-start; margin-top:4px; font-size:10px;">
                                    <span style="color:rgba(255,255,255,0.5); font-size:9px;">Thầu tối đa:</span>
                                    <span style="font-weight:bold; color:#f43f5e;">$0.90</span>
                                </div>
                            </div>
                        </div>

                        <!-- Central Connection Vectors -->
                        <div class="v37-vertical-connection">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                <path class="v37-s3-path-a v37-dash-path" d="M 55 0 L 170 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2.5"></path>
                                <path class="v37-s3-path-b v37-dash-path" d="M 170 0 L 170 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2.5"></path>
                                <path class="v37-s3-path-c v37-dash-path" d="M 285 0 L 170 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2.5"></path>
                            </svg>
                            <!-- Flying packets -->
                            <div class="v37-s3-packet-a" style="position:absolute; width:8px; height:8px; border-radius:50%; background:#3b82f6; opacity:0; left:55px; top:0; transform:translate(-50%,-50%); z-index:5;"></div>
                            <div class="v37-s3-packet-b" style="position:absolute; width:8px; height:8px; border-radius:50%; background:#f59e0b; opacity:0; left:170px; top:0; transform:translate(-50%,-50%); z-index:5;"></div>
                            <div class="v37-s3-packet-c" style="position:absolute; width:8px; height:8px; border-radius:50%; background:#f43f5e; opacity:0; left:285px; top:0; transform:translate(-50%,-50%); z-index:5;"></div>
                        </div>

                        <!-- Google Ad Auction Server -->
                        <div class="v37-glass-card v37-detail-card" style="padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:14px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; display:flex; align-items:center; gap:6px; text-transform:uppercase;">
                                    <i data-lucide="zap" style="width:14px;height:14px;color:#f59e0b;"></i>
                                    <span>Google Ad Auction Engine</span>
                                </div>
                                <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px; text-align:left;">
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Từ khóa đấu giá:</span>
                                        <span style="font-weight:bold; color:#fff; font-size:12px;" id="v37-auction-kw">"mua laptop gaming"</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Thời gian xử lý thầu:</span>
                                        <span style="font-weight:bold; color:#34d399; font-size:12px;" class="v37-auction-timer">-- ms</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Đơn vị chiến thắng:</span>
                                        <span style="font-weight:bold; color:#fbbf24; font-size:12px;" class="v37-auction-winner">Chờ kết quả...</span>
                                    </div>
                                </div>
                            </div>
                            <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:8px; border-color:rgba(255,255,255,0.05); margin-top:8px;">
                                <div class="v37-status-led active-scanning s3-led" style="width:6px; height:6px;"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:9px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái thầu</div>
                                    <div class="v37-s3-result-text" style="font-size:11px; font-weight:bold; margin-top:1px;">Nhận các giá thầu...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `, null);
                initIcons(canvas);
            }
        }
        else if (slideId === 'slide_v37_sponsored_ads') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div class="v37-vertical-layout" style="zoom:0.95;">
                        <!-- Phone Mockup showing Search Result Links -->
                        <div class="v37-phone v37-phone-compact">
                            <div class="v37-phone-notch"></div>
                            <div class="v37-phone-screen" style="justify-content:flex-start;">
                                <div style="display:flex; align-items:center; gap:6px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; margin-top:8px; margin-bottom:10px;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" style="width:14px;height:14px;object-fit:contain;">
                                    <div style="font-size:10px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:2px 8px; flex:1; text-align:left; color:#fff;">mua laptop gaming</div>
                                </div>

                                <!-- Sponsored Ad Link -->
                                <div class="v37-sponsored-link winner-ad" style="position:relative;">
                                    <div class="v37-click-ripple" id="v37-click-marker" style="position:absolute; left:50%; top:50%; opacity:0; pointer-events:none;"></div>
                                    <div style="font-size:8px; font-weight:bold; color:#a2a8b3; text-transform:uppercase;">Được tài trợ (Sponsored)</div>
                                    <div style="font-size:12px; font-weight:bold; color:#3b82f6; margin-top:2px;" class="v37-ad-title">Laptop Gaming Brand B - Siêu Ưu Đãi</div>
                                    <div style="font-size:9px; color:rgba(255,255,255,0.5); margin-top:1px;">Laptop cấu hình đỉnh cao, giảm 20% hôm nay.</div>
                                </div>

                                <!-- Natural Search Links -->
                                <div class="v37-sponsored-link" style="opacity:0.6; padding:6px 10px; margin-bottom:6px;">
                                    <div style="font-size:11px; font-weight:bold; color:#fff;">Diễn đàn chia sẻ kinh nghiệm Laptop</div>
                                    <div style="font-size:9px; color:rgba(255,255,255,0.5); margin-top:1px;">Đánh giá laptop gaming tầm trung và cao cấp...</div>
                                </div>
                                <div class="v37-sponsored-link" style="opacity:0.6; padding:6px 10px; margin-bottom:6px;">
                                    <div style="font-size:11px; font-weight:bold; color:#fff;">Các dòng máy Laptop Gaming tốt nhất 2026</div>
                                    <div style="font-size:9px; color:rgba(255,255,255,0.5); margin-top:1px;">Cập nhật danh sách laptop chơi game tốt nhất...</div>
                                </div>
                            </div>
                        </div>

                        <!-- Central Flow Vectors -->
                        <div class="v37-vertical-connection">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                <path class="v37-s4-path-ad v37-dash-path" d="M 160 0 L 160 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2.5"></path>
                                <path class="v37-s4-path-revenue v37-dash-path" d="M 160 50 L 160 0" fill="none" stroke="rgba(52, 211, 153, 0.45)" stroke-width="3" style="opacity:0;"></path>
                            </svg>
                            <!-- Click indicators / fly money -->
                            <div class="v37-s4-money" style="position:absolute; width:12px; height:12px; border-radius:50%; background:#34d399; opacity:0; left:160px; top:50px; transform:translate(-50%,-50%); z-index:5;">💵</div>
                        </div>

                        <!-- Brand B Server (redirection) -->
                        <div class="v37-glass-card v37-detail-card" style="padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:14px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; text-align:left; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="shopping-bag" style="width:14px;height:14px;color:#10b981;"></i>
                                    <span>Brand B Landing Store</span>
                                </div>
                                <div style="margin-top:10px; text-align:left; display:flex; flex-direction:column; gap:8px;">
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Thanh toán click:</span>
                                        <span style="font-weight:bold; color:#34d399; font-size:12px;" class="v37-s4-ad-cost">$0.00</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Số click nhận:</span>
                                        <span style="font-weight:bold; color:#3b82f6; font-size:12px;" class="v37-s4-click-count">0 click</span>
                                    </div>
                                </div>
                            </div>
                            <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:8px; border-color:rgba(255,255,255,0.05); margin-top:8px;">
                                <div class="v37-status-led active-scanning s4-led" style="width:6px; height:6px;"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:9px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái click</div>
                                    <div class="v37-s4-result-text" style="font-size:11px; font-weight:bold; margin-top:1px;">Chờ người dùng nhấp chuột...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `, null);
                initIcons(canvas);
            }
        }
        else if (slideId === 'slide_v37_adsense_network') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div class="v37-vertical-layout" style="zoom:0.95;">
                        <!-- Publisher Website Mockup in Phone frame -->
                        <div class="v37-phone v37-phone-compact">
                            <div class="v37-phone-notch"></div>
                            <div class="v37-phone-screen" style="justify-content:flex-start;">
                                <div style="font-size:12px; font-weight:bold; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:6px; margin-top:10px; margin-bottom:10px; text-align:left; display:flex; align-items:center; gap:6px;">
                                    <span style="font-size:14px;">📰</span>
                                    <span>Kênh Tin Tức Công Nghệ</span>
                                </div>
                                <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
                                    <div style="height:10px; background:rgba(255,255,255,0.08); border-radius:4px; width:90%;"></div>
                                    <div style="height:10px; background:rgba(255,255,255,0.08); border-radius:4px; width:75%;"></div>
                                    
                                    <!-- Integrated Adsense Slot -->
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(245,158,11,0.03); border:1.5px dashed rgba(245,158,11,0.3); border-radius:10px; text-align:center; margin:8px 0;" id="v35-adsense-slot">
                                        <div style="font-size:8px; font-weight:bold; color:#f59e0b; text-transform:uppercase; margin-bottom:4px;">Quảng cáo bởi Google</div>
                                        <div style="font-size:11px; font-weight:bold; color:#fff;" class="adsense-ad-text">Đang tải Ad...</div>
                                    </div>
                                    
                                    <div style="height:10px; background:rgba(255,255,255,0.08); border-radius:4px; width:85%;"></div>
                                </div>
                                <div class="v37-glass-card" style="padding:6px 10px; background:rgba(255,255,255,0.02); display:flex; justify-content:space-between; font-size:10px; border-color:rgba(255,255,255,0.05); margin-bottom:5px;">
                                    <span style="color:rgba(255,255,255,0.4);">Doanh thu chia sẻ:</span>
                                    <span style="font-weight:bold; color:#34d399;" class="pub-share-value">+$0.00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Adsense Hub (Middleman) -->
                        <div class="v37-vertical-connection">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;">
                                <path class="v37-s5-path-ad v37-dash-path" d="M 160 50 L 160 0" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"></path>
                                <path class="v37-s5-path-rev v37-dash-path" d="M 160 50 L 160 0" fill="none" stroke="rgba(52, 211, 153, 0.45)" stroke-width="2.5"></path>
                            </svg>
                            <!-- Packet dots -->
                            <div class="v37-s5-packet-ad" style="position:absolute; width:8px; height:8px; border-radius:50%; background:#f59e0b; opacity:0; left:160px; top:50px; transform:translate(-50%,-50%); z-index:5;"></div>
                            <div class="v37-s5-packet-rev" style="position:absolute; width:8px; height:8px; border-radius:50%; background:#34d399; opacity:0; left:160px; top:50px; transform:translate(-50%,-50%); z-index:5;"></div>
                        </div>

                        <!-- Google AdSense Control Center -->
                        <div class="v37-glass-card v37-detail-card" style="padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                            <div>
                                <div style="font-size:14px; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="globe" style="width:14px;height:14px;color:#f59e0b;"></i>
                                    <span>Google AdSense Platform</span>
                                </div>
                                <div style="margin-top:10px; text-align:left; display:flex; flex-direction:column; gap:8px;">
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Cắt hoa hồng Google:</span>
                                        <span style="font-weight:bold; color:#fbbf24; font-size:12px;">32% hoa hồng</span>
                                    </div>
                                    <div class="v37-glass-card" style="padding:8px 10px; background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                                        <span style="color:rgba(255,255,255,0.4); font-size:11px;">Chia sẻ cho Publisher:</span>
                                        <span style="font-weight:bold; color:#34d399; font-size:12px;">68% doanh thu</span>
                                    </div>
                                </div>
                            </div>
                            <div class="v37-glass-card" style="padding:8px; background:rgba(255,255,255,0.02); display:flex; align-items:center; gap:8px; border-color:rgba(255,255,255,0.05); margin-top:8px;">
                                <div class="v37-status-led active-scanning s5-led" style="width:6px; height:6px;"></div>
                                <div style="text-align:left; flex:1;">
                                    <div style="font-size:9px; font-weight:bold; color:rgba(255,255,255,0.4); text-transform:uppercase;">Trạng thái Adsense</div>
                                    <div class="v37-s5-result-text" style="font-size:11px; font-weight:bold; margin-top:1px;">Kết nối và phân chia quảng cáo...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `, null);
                initIcons(canvas);
            }
        }
        else if (slideId === 'slide_v37_recap') {
            if (needsTemplate) {
                canvas.innerHTML = sceneWrap(`
                    <div style="display:flex; flex-direction:column; align-items:center; gap:16px; zoom:1.02; width:100%; max-width:380px;">
                        <!-- Statistics Board -->
                        <div class="v37-glass-card v37-recap-board">
                            <div style="font-size:16px; font-weight:bold; border-bottom:1.5px solid rgba(255,255,255,0.08); padding-bottom:10px; display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                                <span style="display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="pie-chart" style="width:16px;height:16px;color:#f59e0b;"></i>
                                    Cơ cấu doanh thu Google hàng năm
                                </span>
                                <span style="font-size:11px; color:rgba(255,255,255,0.4);">Báo cáo tài chính</span>
                            </div>
                            
                            <div style="display:flex; flex-direction:column; gap:14px; text-align:left;">
                                <!-- Search ads -->
                                <div class="v37-chart-row">
                                    <div class="v37-chart-info">
                                        <span class="v37-chart-label">
                                            <i data-lucide="search" style="width:14px;height:14px;color:#3b82f6;"></i>
                                            Google Search Ads
                                        </span>
                                        <span class="v37-chart-percent" style="color:#3b82f6;">70%</span>
                                    </div>
                                    <div class="v37-bar-container">
                                        <div class="v37-bar-fill bar-search" id="v37-bar-search" style="width:0%;"></div>
                                    </div>
                                </div>
                                <!-- Youtube ads -->
                                <div class="v37-chart-row">
                                    <div class="v37-chart-info">
                                        <span class="v37-chart-label">
                                            <i data-lucide="youtube" style="width:14px;height:14px;color:#fb7185;"></i>
                                            YouTube Advertising
                                        </span>
                                        <span class="v37-chart-percent" style="color:#fb7185;">15%</span>
                                    </div>
                                    <div class="v37-bar-container">
                                        <div class="v37-bar-fill bar-youtube" id="v37-bar-youtube" style="width:0%;"></div>
                                    </div>
                                </div>
                                <!-- Adsense network -->
                                <div class="v37-chart-row">
                                    <div class="v37-chart-info">
                                        <span class="v37-chart-label">
                                            <i data-lucide="globe" style="width:14px;height:14px;color:#10b981;"></i>
                                            Google AdSense Network
                                        </span>
                                        <span class="v37-chart-percent" style="color:#10b981;">10%</span>
                                    </div>
                                    <div class="v37-bar-container">
                                        <div class="v37-bar-fill bar-adsense" id="v37-bar-adsense" style="width:0%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Big counter board -->
                        <div class="v37-glass-card" style="width:100%; padding:14px; display:flex; justify-content:space-between; align-items:center; border-color:rgba(52,211,153,0.3); background:rgba(16,185,129,0.03);">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <i data-lucide="trending-up" style="width:24px;height:24px;color:#34d399;"></i>
                                <div style="text-align:left;">
                                    <div style="font-size:10px; color:rgba(255,255,255,0.4); text-transform:uppercase;">Doanh thu hàng năm</div>
                                    <div style="font-family:'Fira Code', monospace; font-size:20px; font-weight:900; color:#34d399;" class="annual-revenue-val">$0</div>
                                </div>
                            </div>
                            <span style="background:rgba(52,211,153,0.12); border:1px solid #34d399; color:#34d399; font-size:10px; font-weight:bold; padding:3px 8px; border-radius:8px; text-transform:uppercase;">
                                Doanh thu khủng
                            </span>
                        </div>
                    </div>
                `, null);
                initIcons(canvas);
            }
        }
    }

    // ── ANIMATION TIMELINE UPDATE ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_v37_hook') {
            const label = canvas.querySelector('#v37-intro-label');
            if (progress < 0.35) {
                if (label) label.textContent = 'Bạn dùng Google 20 năm không mất đồng nào?';
            } else if (progress < 0.70) {
                if (label) label.textContent = 'Hạ tầng vận hành tốn hàng tỷ USD mỗi ngày...';
            } else {
                if (label) label.textContent = 'Vậy ai đang trả tiền cho tất cả?';
            }
        }
        else if (slideId === 'slide_v37_you_are_product') {
            const indSearch = canvas.querySelector('.ind-search');
            const indYoutube = canvas.querySelector('.ind-youtube');
            const indMaps = canvas.querySelector('.ind-maps');
            const tagAge = canvas.querySelector('.tag-age');
            const tagGender = canvas.querySelector('.tag-gender');
            const tagTech = canvas.querySelector('.tag-tech');
            const tagTravel = canvas.querySelector('.tag-travel');
            const tagBuy = canvas.querySelector('.tag-buy');
            const led = canvas.querySelector('.s2-led');
            const statusText = canvas.querySelector('.v37-s2-result-text');

            if (progress > 0.15) {
                if (indSearch) { indSearch.textContent = 'Recorded ✓'; indSearch.style.color = '#38bdf8'; }
                if (tagAge) tagAge.classList.add('active-blue');
                if (tagGender) tagGender.classList.add('active-blue');
            } else {
                if (indSearch) { indSearch.textContent = 'Idle'; indSearch.style.color = 'rgba(255,255,255,0.3)'; }
                if (tagAge) tagAge.classList.remove('active-blue');
                if (tagGender) tagGender.classList.remove('active-blue');
            }

            if (progress > 0.4) {
                if (indYoutube) { indYoutube.textContent = 'Recorded ✓'; indYoutube.style.color = '#fbbf24'; }
                if (tagTech) tagTech.classList.add('active-gold');
                if (tagTravel) tagTravel.classList.add('active-gold');
            } else {
                if (indYoutube) { indYoutube.textContent = 'Idle'; indYoutube.style.color = 'rgba(255,255,255,0.3)'; }
                if (tagTech) tagTech.classList.remove('active-gold');
                if (tagTravel) tagTravel.classList.remove('active-gold');
            }

            if (progress > 0.65) {
                if (indMaps) { indMaps.textContent = 'Recorded ✓'; indMaps.style.color = '#34d399'; }
                if (tagBuy) tagBuy.classList.add('active-green');
            } else {
                if (indMaps) { indMaps.textContent = 'Idle'; indMaps.style.color = 'rgba(255,255,255,0.3)'; }
                if (tagBuy) tagBuy.classList.remove('active-green');
            }

            if (progress >= 0.8) {
                if (led) led.className = 'v37-status-led active-ok s2-led';
                if (statusText) statusText.textContent = 'Hoàn tất xây dựng chân dung mục tiêu!';
            } else {
                if (led) led.className = 'v37-status-led active-scanning s2-led';
                if (statusText) statusText.textContent = 'Đang thu thập dữ liệu hành vi...';
            }
        }
        else if (slideId === 'slide_v37_ad_auction') {
            const pA = canvas.querySelector('.v37-s3-packet-a');
            const pB = canvas.querySelector('.v37-s3-packet-b');
            const pC = canvas.querySelector('.v37-s3-packet-c');
            const cardA = canvas.querySelector('.brand-a');
            const cardB = canvas.querySelector('.brand-b');
            const cardC = canvas.querySelector('.brand-c');
            const timer = canvas.querySelector('.v37-auction-timer');
            const winner = canvas.querySelector('.v37-auction-winner');
            const led = canvas.querySelector('.s3-led');
            const resultText = canvas.querySelector('.v37-s3-result-text');

            // Packets fly from top brands to central auction engine at the bottom: progress 0.1 to 0.45
            if (progress > 0.1 && progress < 0.45) {
                const t = (progress - 0.1) / 0.35;
                // A: 55, 0 -> 170, 50
                const xa = 55 + (170 - 55) * t;
                const ya = 50 * t;
                if (pA) { pA.style.left = `${xa}px`; pA.style.top = `${ya}px`; pA.style.opacity = '1'; }

                // B: 170, 0 -> 170, 50
                const xb = 170;
                const yb = 50 * t;
                if (pB) { pB.style.left = `${xb}px`; pB.style.top = `${yb}px`; pB.style.opacity = '1'; }

                // C: 285, 0 -> 170, 50
                const xc = 285 + (170 - 285) * t;
                const yc = 50 * t;
                if (pC) { pC.style.left = `${xc}px`; pC.style.top = `${yc}px`; pC.style.opacity = '1'; }
            } else {
                if (pA) pA.style.opacity = '0';
                if (pB) pB.style.opacity = '0';
                if (pC) pC.style.opacity = '0';
            }

            // Auction computes: progress 0.45 to 0.75
            if (progress > 0.45) {
                const currentMs = Math.floor(Math.min(1, (progress - 0.45) / 0.2) * 38) + 8;
                if (timer) timer.textContent = `${currentMs} ms`;
            } else {
                if (timer) timer.textContent = '-- ms';
            }

            // Declare winner: progress >= 0.75
            if (progress >= 0.75) {
                if (cardB) cardB.classList.add('winner');
                if (cardA) cardA.style.opacity = '0.4';
                if (cardC) cardC.style.opacity = '0.4';
                if (winner) winner.textContent = 'Laptop Brand B ($1.80)';
                if (led) led.className = 'v37-status-led active-ok s3-led';
                if (resultText) resultText.textContent = 'Đấu giá hoàn tất! Brand B chiến thắng.';
            } else {
                if (cardB) cardB.classList.remove('winner');
                if (cardA) cardA.style.opacity = '1';
                if (cardC) cardC.style.opacity = '1';
                if (winner) winner.textContent = 'Chờ kết quả...';
                if (led) led.className = 'v37-status-led active-scanning s3-led';
                if (resultText) resultText.textContent = 'Đang nhận và so sánh các mức giá thầu...';
            }
        }
        else if (slideId === 'slide_v37_sponsored_ads') {
            const marker = canvas.querySelector('#v37-click-marker');
            const pathAd = canvas.querySelector('.v37-s4-path-ad');
            const pathRev = canvas.querySelector('.v37-s4-path-revenue');
            const money = canvas.querySelector('.v37-s4-money');
            const brandCost = canvas.querySelector('.v37-s4-ad-cost');
            const brandClicks = canvas.querySelector('.v37-s4-click-count');
            const led = canvas.querySelector('.s4-led');
            const resultText = canvas.querySelector('.v37-s4-result-text');

            // Touch click: progress 0.25 to 0.35
            if (progress > 0.25 && progress < 0.38) {
                if (marker) {
                    marker.style.opacity = '1';
                    marker.style.transform = `scale(${(progress - 0.25) / 0.13 * 1.2 + 0.3})`;
                }
            } else {
                if (marker) marker.style.opacity = '0';
            }

            // Click recorded & money sent to Google: progress 0.38 to 0.75
            // Money flies from bottom (y=50) to top (y=0)
            if (progress > 0.38) {
                if (pathRev) pathRev.style.opacity = '1';
                if (brandClicks) brandClicks.textContent = '1 click';
                
                const t = Math.min(1, (progress - 0.38) / 0.37);
                const y = 50 - 50 * t;
                if (money) {
                    money.style.left = '160px';
                    money.style.top = `${y}px`;
                    money.style.opacity = (t < 1) ? '1' : '0';
                }
                const cost = (t * 1.80).toFixed(2);
                if (brandCost) brandCost.textContent = `$${cost}`;
            } else {
                if (pathRev) pathRev.style.opacity = '0';
                if (brandClicks) brandClicks.textContent = '0 click';
                if (money) money.style.opacity = '0';
                if (brandCost) brandCost.textContent = '$0.00';
            }

            if (progress >= 0.75) {
                if (led) led.className = 'v37-status-led active-ok s4-led';
                if (resultText) resultText.textContent = 'Google ghi nhận 1 click. Đã tính tiền $1.80!';
            } else {
                if (led) led.className = 'v37-status-led active-scanning s4-led';
                if (resultText) resultText.textContent = 'Chờ người dùng nhấp chuột...';
            }
        }
        else if (slideId === 'slide_v37_adsense_network') {
            const pAd = canvas.querySelector('.v37-s5-packet-ad');
            const pRev = canvas.querySelector('.v37-s5-packet-rev');
            const adText = canvas.querySelector('.adsense-ad-text');
            const pubShare = canvas.querySelector('.pub-share-value');
            const led = canvas.querySelector('.s5-led');
            const resultText = canvas.querySelector('.v37-s5-result-text');

            // Ad delivery: progress 0.1 to 0.45
            // Ad packet flies from bottom (AdSense Platform) to top (Website Mockup)
            if (progress > 0.1 && progress < 0.45) {
                const t = (progress - 0.1) / 0.35;
                const y = 50 - 50 * t;
                if (pAd) { pAd.style.left = '160px'; pAd.style.top = `${y}px`; pAd.style.opacity = '1'; }
            } else {
                if (pAd) pAd.style.opacity = '0';
            }

            if (progress > 0.45) {
                if (adText) adText.textContent = '👟 Laptop Brand B giảm 20%';
            } else {
                if (adText) adText.textContent = 'Đang tải Ad...';
            }

            // Share revenue to publisher: progress 0.45 to 0.8
            // Money flies from bottom (AdSense Platform) to top (Website Mockup)
            if (progress > 0.45) {
                const t = Math.min(1, (progress - 0.45) / 0.35);
                const y = 50 - 50 * t;
                if (pRev) { pRev.style.left = '160px'; pRev.style.top = `${y}px`; pRev.style.opacity = (t < 1) ? '1' : '0'; }
                
                const share = (t * 1.22).toFixed(2); // 68% of 1.80
                if (pubShare) pubShare.textContent = `+$${share}`;
            } else {
                if (pRev) pRev.style.opacity = '0';
                if (pubShare) pubShare.textContent = '+$0.00';
            }

            if (progress >= 0.8) {
                if (led) led.className = 'v37-status-led active-ok s5-led';
                if (resultText) resultText.textContent = 'Google phân phối thành công, chia sẻ 68% doanh thu!';
            } else {
                if (led) led.className = 'v37-status-led active-scanning s5-led';
                if (resultText) resultText.textContent = 'Đang kết nối và tải quảng cáo...';
            }
        }
        else if (slideId === 'slide_v37_recap') {
            const revLabel = canvas.querySelector('.annual-revenue-val');
            // count up to 220,000,000,000
            const currentBill = Math.floor(progress * 220);
            if (revLabel) {
                revLabel.textContent = `$${currentBill} Tỷ USD`;
            }

            // Animate bar fills
            const barSearch = canvas.querySelector('#v37-bar-search');
            const barYoutube = canvas.querySelector('#v37-bar-youtube');
            const barAdsense = canvas.querySelector('#v37-bar-adsense');

            if (progress > 0.1) {
                const t = Math.min(1, (progress - 0.1) / 0.7); // Animates fully over 70% of duration
                if (barSearch) barSearch.style.width = `${t * 70}%`;
                if (barYoutube) barYoutube.style.width = `${t * 15}%`;
                if (barAdsense) barAdsense.style.width = `${t * 10}%`;
            } else {
                if (barSearch) barSearch.style.width = '0%';
                if (barYoutube) barYoutube.style.width = '0%';
                if (barAdsense) barAdsense.style.width = '0%';
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video37',
        topic: 'Google Free Model',
        episodeNum: 37,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video37 Plugin] Loaded: Google Business Model GFX ready.');
})();
