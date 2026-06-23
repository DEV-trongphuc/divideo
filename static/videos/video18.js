/**
 * Video 18: AdTech - Retargeting & Facebook Pixel
 * Plugin file - chứa toàn bộ slide animation/HTML cho video18
 * Load động bởi app.js khi user chọn video18
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_adtech_1: [
            { text: 'Retargeting', start: 10.0, end: 16.5, class: 'active-good' },
            { text: 'quảng cáo bám đuôi', start: 10.0, end: 16.5, class: 'active-good' },
            { text: 'Facebook Pixel', start: 16.5, end: 22.0, class: 'active-gold' }
        ],
        slide_adtech_2: [
            { text: 'Xem Giày', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'Tracking Pixel', start: 6.0, end: 14.0, class: 'active-gold' },
            { text: 'bắn một tia dữ liệu', start: 14.0, end: 21.0, class: 'active-gold' }
        ],
        slide_adtech_3: [
            { text: 'dán nhãn tag', start: 4.5, end: 11.0, class: 'active-gold' },
            { text: 'Custom Audience', start: 11.0, end: 18.0, class: 'active-good' },
            { text: 'Đối tượng tùy chỉnh', start: 11.0, end: 18.0, class: 'active-good' }
        ],
        slide_adtech_4: [
            { text: 'Real-Time Bidding', start: 6.0, end: 14.0, class: 'active-good' },
            { text: 'Đấu giá thời gian thực', start: 6.0, end: 14.0, class: 'active-good' },
            { text: '0.1 giây', start: 14.0, end: 20.0, class: 'active-gold' }
        ],
        slide_adtech_5: [
            { text: 'giành chiến thắng', start: 3.0, end: 8.0, class: 'active-good' },
            { text: 'Bảng tin', start: 8.0, end: 14.0, class: 'active-gold' },
            { text: 'đọc được suy nghĩ', start: 14.0, end: 18.0, class: 'active-bad' }
        ]
    };

    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_adtech_1', 'slide_adtech_2', 'slide_adtech_3', 'slide_adtech_4', 'slide_adtech_5'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_adtech_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:50px; zoom:0.82;">
                        <!-- Left Phone Mockup: Shopee -->
                        <div class="glass-card phone-mockup shopee-phone" style="width:400px; height:680px; border:2.5px solid #ff5722; border-radius:36px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#180f0a; position:relative; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.8); transition:all 0.3s;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,87,34,0.15); padding-bottom:10px;">
                                <span style="font-size:22px; font-weight:bold; color:#ff5722; letter-spacing:1px; display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="shopping-bag" style="width:20px; height:20px; color:#ff5722;"></i> SHOPEE APP
                                </span>
                                <span style="font-size:18px; color:rgba(255,255,255,0.4);">5m ago</span>
                            </div>
                            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:15px; margin:20px 0;">
                                <div style="position:relative; width:220px; height:220px; display:flex; align-items:center; justify-content:center;">
                                    <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(255,87,34,0.2) 0%, transparent 70%); filter:blur(15px);"></div>
                                    <span style="font-size:120px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));" class="sneaker-emoji">👟</span>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:26px; font-weight:bold; color:#fff;">UltraBoost Promax</div>
                                    <div style="font-size:22px; color:#ff5722; font-weight:bold; margin-top:4px;">1.990.000 đ</div>
                                </div>
                                <button style="background:#ff5722; border:none; border-radius:12px; padding:12px 30px; color:#fff; font-size:20px; font-weight:bold; display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="eye" style="width:20px; height:20px;"></i> Xem sản phẩm
                                </button>
                            </div>
                            <div style="background:rgba(255,87,34,0.06); border:1px dashed rgba(255,87,34,0.3); border-radius:16px; padding:12px; font-size:18px; color:#ff5722; text-align:center; font-weight:bold;">
                                🖱️ User Click: View Content
                            </div>
                        </div>

                        <!-- Central Flow Path -->
                        <div style="position:relative; width:120px; height:100px; display:flex; align-items:center; justify-content:center;">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;">
                                <defs>
                                    <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="#ff5722" />
                                        <stop offset="100%" stop-color="#1877f2" />
                                    </linearGradient>
                                </defs>
                                <path class="flow-arrow-path" d="M 10 50 L 110 50" fill="none" stroke="url(#flow-grad)" stroke-width="4.5" stroke-dasharray="10 6" />
                            </svg>
                            <div class="flow-packet" style="position:absolute; width:18px; height:18px; border-radius:50%; background:#ff5722; box-shadow:0 0 15px #ff5722; z-index:10; left:10px; top:50%; transform:translate(-50%,-50%); opacity:0;"></div>
                            <div style="position:absolute; top:-25px; font-size:18px; font-weight:bold; color:var(--gold-primary); text-transform:uppercase; text-align:center; white-space:nowrap; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:6px 12px; border-radius:10px;">
                                Retargeting
                            </div>
                        </div>

                        <!-- Right Phone Mockup: Facebook -->
                        <div class="glass-card phone-mockup fb-phone" style="width:400px; height:680px; border:2.5px solid #1877f2; border-radius:36px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:#0c121c; position:relative; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.8); transition:all 0.3s;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(24,119,242,0.15); padding-bottom:10px;">
                                <span style="font-size:22px; font-weight:bold; color:#1877f2; letter-spacing:1px; display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="facebook" style="width:20px; height:20px; color:#1877f2; fill:#1877f2;"></i> FACEBOOK APP
                                </span>
                                <span style="font-size:18px; color:rgba(255,255,255,0.4);">Now</span>
                            </div>
                            <!-- FB Feed Ad Container -->
                            <div class="fb-ad-container" style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; opacity:0; transform:scale(0.9); transition:all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                <div class="glass-card" style="width:100%; border:1.5px solid rgba(24,119,242,0.25); border-radius:20px; background:rgba(24,119,242,0.03); padding:16px; display:flex; flex-direction:column; gap:12px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:36px; height:36px; border-radius:50%; background:#ff5722; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:bold;">S</div>
                                        <div>
                                            <div style="font-size:18px; font-weight:bold; color:#fff; display:flex; align-items:center; gap:6px;">Shopee.vn</div>
                                            <div style="font-size:14px; color:#1877f2; font-weight:bold; display:flex; align-items:center; gap:4px;"><i data-lucide="globe" style="width:12px; height:12px;"></i> Được tài trợ</div>
                                        </div>
                                    </div>
                                    <div style="font-size:17px; color:#d1d5db; line-height:1.4;">Đôi giày bạn thích đang có deal hời! Mua ngay hôm nay giảm 15%! 👟🔥</div>
                                    <div style="background:#151d2a; border-radius:12px; padding:10px; display:flex; gap:12px; align-items:center; border:1px solid rgba(255,255,255,0.06);">
                                        <span style="font-size:55px;">👟</span>
                                        <div style="flex:1;">
                                            <div style="font-size:16px; font-weight:bold; color:#fff;">UltraBoost Promax</div>
                                            <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:2px;">shopee.vn</div>
                                        </div>
                                        <button style="background:#1877f2; border:none; border-radius:8px; padding:8px 14px; color:#fff; font-size:16px; font-weight:bold;">Mua ngay</button>
                                    </div>
                                </div>
                            </div>
                            <div class="fb-loading-indicator" style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:12px; background:rgba(12,18,28,0.85); z-index:2; transition:opacity 0.3s;">
                                <div class="fb-spinner" style="width:40px; height:40px; border:4px solid rgba(24,119,242,0.2); border-top-color:#1877f2; border-radius:50%; animation:fb-spin 0.8s linear infinite;"></div>
                                <span style="font-size:18px; color:rgba(255,255,255,0.5);">Đang tải Newsfeed...</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_adtech_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:25px; zoom:0.85;">
                        <!-- Browser Mockup -->
                        <div class="glass-card browser-mockup" style="width:960px; height:480px; border:2px solid rgba(255,255,255,0.08); border-radius:20px; display:flex; flex-direction:column; background:#121212; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.7); position:relative;">
                            <!-- Browser Header -->
                            <div style="background:#1e1e1e; border-bottom:1.5px solid rgba(255,255,255,0.06); padding:12px 20px; display:flex; align-items:center; gap:15px;">
                                <div style="display:flex; gap:6px;">
                                    <span style="width:12px; height:12px; border-radius:50%; background:#ef4444; display:block;"></span>
                                    <span style="width:12px; height:12px; border-radius:50%; background:#f59e0b; display:block;"></span>
                                    <span style="width:12px; height:12px; border-radius:50%; background:#10b981; display:block;"></span>
                                </div>
                                <div style="flex:1; background:#2d2d2d; border-radius:8px; padding:6px 16px; font-size:16px; color:#a3a3a3; font-family:monospace; display:flex; align-items:center; gap:8px;">
                                    <i data-lucide="lock" style="width:14px; height:14px; color:#10b981;"></i> shopee.vn/product/sneaker-promax
                                </div>
                            </div>
                            
                            <!-- Browser content: Left and Right -->
                            <div style="flex:1; display:flex; padding:24px; gap:24px; box-sizing:border-box;">
                                <!-- Left: Product Details -->
                                <div class="glass-card product-card-s2" style="flex:1.1; border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; background:rgba(255,255,255,0.01);">
                                    <div style="display:flex; justify-content:center; align-items:center; background:rgba(255,255,255,0.02); border-radius:12px; padding:15px; height:200px; position:relative;">
                                        <span style="font-size:110px;" class="prod-sneaker-s2">👟</span>
                                        <div class="pixel-tag-badge" style="position:absolute; top:12px; right:12px; background:rgba(239,68,68,0.15); border:1px solid #ef4444; color:#ef4444; font-size:14px; font-weight:bold; padding:4px 10px; border-radius:8px; display:flex; align-items:center; gap:4px; opacity:0; transition:all 0.3s;">
                                            <span style="width:8px; height:8px; border-radius:50%; background:#ef4444; animation:pulse-red 1s infinite;"></span> Facebook Pixel Actived
                                        </div>
                                    </div>
                                    <div style="margin-top:15px;">
                                        <div style="font-size:24px; font-weight:bold; color:#fff;">UltraBoost Promax</div>
                                        <div style="font-size:18px; color:rgba(255,255,255,0.4); margin-top:4px;">Danh mục: Giày Thể Thao</div>
                                    </div>
                                    <button class="xemgiay-btn" style="background:#ff5722; border:none; border-radius:10px; padding:12px; width:100%; color:#fff; font-size:20px; font-weight:bold; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:10px;">
                                        <i data-lucide="eye" style="width:22px; height:22px;"></i> Xem Giày (View Product)
                                    </button>
                                </div>

                                <!-- Right: Pixel Code Simulation -->
                                <div class="glass-card code-card-s2" style="flex:1.3; border:2px solid rgba(255,255,255,0.05); border-radius:16px; padding:20px; background:#0b0e14; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:10px;">
                                        <span style="font-size:16px; font-weight:bold; color:var(--gold-primary); font-family:monospace; display:flex; align-items:center; gap:6px;">
                                            <i data-lucide="code-2" style="width:16px; height:16px; color:var(--gold-primary);"></i> fb_pixel.js (Tàng hình)
                                        </span>
                                        <span style="font-size:14px; color:rgba(255,255,255,0.3); font-family:monospace;">javascript</span>
                                    </div>
                                    <pre style="font-family:'Fira Code', monospace; font-size:16px; color:#d4d4d4; line-height:1.5; margin:0; flex:1;" class="pixel-code-pre">
<span style="color:#569cd6;">// Kích hoạt khi click 'Xem Giày'</span>
<span style="color:#4fc1ff;">fbq</span>(<span style="color:#ce9178;">'track'</span>, <span style="color:#ce9178;">'ViewContent'</span>, {
  <span style="color:#9cdcfe;">content_name</span>: <span style="color:#ce9178;">'UltraBoost Promax'</span>,
  <span style="color:#9cdcfe;">category</span>: <span style="color:#ce9178;">'Giày Thể Thao'</span>,
  <span style="color:#9cdcfe;">value</span>: <span style="color:#b5cea8;">85.00</span>,
  <span style="color:#9cdcfe;">currency</span>: <span style="color:#ce9178;">'USD'</span>
});</pre>
                                    <div class="code-execution-glow" style="position:absolute; inset:0; background:rgba(245,158,11,0.02); pointer-events:none; border-radius:16px; border:2px solid transparent; transition:all 0.3s;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Data Transmission Path & Server -->
                        <div style="width:960px; height:120px; display:flex; align-items:center; justify-content:space-between; padding:0 30px; box-sizing:border-box; position:relative;">
                            <div class="glass-card" style="width:260px; padding:15px; border:1.5px solid rgba(255,87,34,0.25); border-radius:12px; text-align:center; font-size:18px; font-weight:bold; color:#ff5722;">
                                📍 Trình duyệt Client (Shopee)
                            </div>
                            
                            <svg style="position:absolute; left:290px; right:290px; height:80px; pointer-events:none; z-index:1; top:20px;">
                                <path class="transmit-line" d="M 0 40 L 380 40" fill="none" stroke="#10b981" stroke-width="4.5" stroke-dasharray="8 5" style="opacity:0.3; transition:all 0.3s;" />
                            </svg>
                            <div class="transmit-packet" style="position:absolute; width:16px; height:16px; border-radius:50%; background:#10b981; box-shadow:0 0 15px #10b981; z-index:5; left:290px; top:60px; opacity:0; transform:translate(-50%,-50%);"></div>

                            <div class="glass-card fb-server-node" style="width:260px; padding:15px; border:1.5px solid rgba(255,255,255,0.06); border-radius:12px; text-align:center; transition:all 0.3s;" id="fb-server-element">
                                <div style="font-size:18px; font-weight:bold; color:var(--text-muted);" class="server-title">Máy chủ Facebook</div>
                                <div style="font-size:14px; font-family:monospace; color:rgba(255,255,255,0.3); margin-top:4px;" class="server-status">Đang đợi data...</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_adtech_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- Left Panel: User Profile Record -->
                        <div class="glass-card profile-record-card" style="width:420px; height:580px; border:2.5px solid rgba(255,255,255,0.06); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; position:relative; transition:all 0.4s;">
                            <div>
                                <div style="font-size:20px; font-weight:bold; color:var(--text-muted); border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:10px; margin-bottom:15px; text-transform:uppercase; letter-spacing:0.5px;">Hồ sơ Quảng cáo Facebook</div>
                                <div style="display:flex; align-items:center; gap:16px; margin:20px 0;">
                                    <div style="width:70px; height:70px; border-radius:50%; background:var(--gold-primary); display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; color:#000;">U</div>
                                    <div>
                                        <div style="font-size:22px; font-weight:bold; color:#fff;">User ID: #890244</div>
                                        <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:2px;">Thiết bị: iOS Mobile App</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- User Tags list -->
                            <div style="flex:1; display:flex; flex-direction:column; gap:14px; margin:10px 0;">
                                <span style="font-size:17px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold;">Sở thích ghi nhận (Tags):</span>
                                <div style="display:flex; flex-wrap:wrap; gap:10px;" class="profile-tags-container">
                                    <span style="font-size:18px; padding:6px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:20px; color:#fff;">Công Nghệ</span>
                                    <span style="font-size:18px; padding:6px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:20px; color:#fff;">Du Lịch</span>
                                    <span class="animated-retarget-tag" style="font-size:18px; padding:6px 14px; background:rgba(245,158,11,0.04); border:1.5px dashed rgba(245,158,11,0.25); border-radius:20px; color:rgba(255,255,255,0.3); transition:all 0.5s; font-weight:bold;">Thích Giày Thể Thao</span>
                                </div>
                            </div>

                            <!-- Custom Audience Member status -->
                            <div class="custom-audience-status glass-card" style="border:1.5px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.01); border-radius:16px; padding:15px; display:flex; align-items:center; gap:12px; transition:all 0.4s;">
                                <i data-lucide="shield" style="width:24px; height:24px; color:rgba(255,255,255,0.2);" class="audience-shield"></i>
                                <div style="text-align:left;">
                                    <div style="font-size:16px; color:rgba(255,255,255,0.4);">Custom Audience Segment</div>
                                    <div style="font-size:18px; font-weight:bold; color:rgba(255,255,255,0.3); margin-top:2px;" class="audience-text">Chưa được xếp nhóm</div>
                                </div>
                            </div>
                        </div>

                        <!-- Connector with animated tag transfer -->
                        <div style="position:relative; width:100px; display:flex; align-items:center; justify-content:center;">
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                <path d="M 100 240 L 0 240" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" stroke-dasharray="6 4" />
                            </svg>
                            <div class="tag-transfer-badge" style="position:absolute; background:var(--gold-primary); color:#000; font-size:15px; font-weight:bold; padding:6px 12px; border-radius:8px; box-shadow:0 0 15px var(--gold-primary); z-index:5; left:100px; top:240px; transform:translate(-50%,-50%); opacity:0; white-space:nowrap; display:flex; align-items:center; gap:4px;">
                                <i data-lucide="tag" style="width:14px; height:14px;"></i> Tag: Thích Giày
                            </div>
                        </div>

                        <!-- Right Panel: Facebook Graph & Audiences DB -->
                        <div class="glass-card graph-db-card" style="width:420px; height:580px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s; box-shadow:0 0 25px rgba(245,158,11,0.1);">
                            <div>
                                <div style="font-size:20px; font-weight:bold; color:var(--gold-primary); border-bottom:1.5px solid rgba(245,158,11,0.15); padding-bottom:10px; margin-bottom:15px; text-transform:uppercase; letter-spacing:0.5px;">Facebook Audience Manager</div>
                                <div style="background:#0c0f14; border-radius:16px; padding:18px; border:1px solid rgba(255,255,255,0.05); font-family:monospace; font-size:16px; line-height:1.5; color:#a3a3a3;">
                                    <span style="color:#569cd6;">UPDATE</span> user_profile<br>
                                    <span style="color:#569cd6;">SET</span> interests = interests + <span style="color:#ce9178;">'Giày Thể Thao'</span><br>
                                    <span style="color:#569cd6;">WHERE</span> user_id = <span style="color:#b5cea8;">890244</span>;<br><br>
                                    <span style="color:#60a5fa;">// Phân nhóm target của Shopee:</span><br>
                                    <span style="color:#569cd6;">ADD</span> user_id <span style="color:#569cd6;">TO</span> custom_audience<br>
                                    (<span style="color:#ce9178;">'shopee_view_content_shoes_30d'</span>);
                                </div>
                            </div>
                            
                            <div style="background:rgba(245,158,11,0.04); border:1px solid rgba(245,158,11,0.15); border-radius:16px; padding:18px; display:flex; flex-direction:column; gap:8px;">
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; text-align:left;">Hồ sơ đối tượng Shopee</div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:16px; color:#fff;">Tên tệp:</span>
                                    <span style="font-size:16px; font-weight:bold; color:var(--gold-primary); font-family:monospace;">Shopee Shoes Visitors</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:16px; color:#fff;">Quy mô tệp:</span>
                                    <span style="font-size:16px; font-weight:bold; color:#10b981; font-family:monospace;">320.450 Users (+1)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_adtech_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:30px; zoom:1.1;">
                        <!-- Top: Target User and Auction Clock -->
                        <div style="width:100%; max-width:1060px; display:flex; justify-content:space-between; align-items:center; gap:30px;">
                            <div class="glass-card" style="flex:1.2; padding:24px; border:2px solid rgba(255,255,255,0.06); border-radius:20px; display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.01);">
                                <div style="width:56px; height:56px; border-radius:50%; background:var(--gold-primary); display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:bold; color:#000;">U</div>
                                <div style="text-align:left;">
                                    <div style="font-size:22px; font-weight:bold; color:#fff;">Đối tượng: #890244</div>
                                    <div style="font-size:17px; color:var(--gold-primary); margin-top:4px; font-weight:bold;">Tag: Thích Giày Thể Thao</div>
                                </div>
                            </div>
                            <div class="glass-card auction-clock-card" style="flex:1; padding:24px; border:2.5px solid #ef4444; border-radius:20px; text-align:center; transition:all 0.3s; background:rgba(239,68,68,0.02); box-shadow:0 0 20px rgba(239,68,68,0.08);">
                                <div style="font-size:17px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">Đấu giá RTB</div>
                                <div style="font-family:monospace; font-size:32px; font-weight:900; color:#ef4444; margin-top:4px;" class="auction-timer">0.100 s</div>
                            </div>
                        </div>

                        <!-- Center: Bidder cards -->
                        <div style="display:flex; justify-content:space-between; width:100%; max-width:1060px; gap:30px;">
                            <!-- Bidder 1: Nike DSP -->
                            <div class="glass-card bidder-card b1" style="flex:1; border:2px solid rgba(255,255,255,0.05); border-radius:22px; padding:24px; text-align:center; transition:all 0.3s;">
                                <div style="font-size:22px; font-weight:bold; color:#fff; text-transform:uppercase;">Nike DSP</div>
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:6px;">Độ khớp: 8.2/10</div>
                                <div style="font-family:monospace; font-size:42px; font-weight:bold; color:#a3a3a3; margin:20px 0;" class="bid-val b1">$0.00</div>
                                <div style="font-size:16px; color:#ef4444; font-weight:bold; opacity:0;" class="bid-status b1">THUA CUỘC</div>
                            </div>

                            <!-- Bidder 2: Adidas DSP -->
                            <div class="glass-card bidder-card b2" style="flex:1; border:2px solid rgba(255,255,255,0.05); border-radius:22px; padding:24px; text-align:center; transition:all 0.3s;">
                                <div style="font-size:22px; font-weight:bold; color:#fff; text-transform:uppercase;">Adidas DSP</div>
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:6px;">Độ khớp: 8.5/10</div>
                                <div style="font-family:monospace; font-size:42px; font-weight:bold; color:#a3a3a3; margin:20px 0;" class="bid-val b2">$0.00</div>
                                <div style="font-size:16px; color:#ef4444; font-weight:bold; opacity:0;" class="bid-status b2">THUA CUỘC</div>
                            </div>

                            <!-- Bidder 3: Shopee Remarketing (Winner) -->
                            <div class="glass-card bidder-card b3" style="flex:1; border:2px solid rgba(255,255,255,0.05); border-radius:22px; padding:24px; text-align:center; transition:all 0.3s; position:relative;">
                                <div class="winner-badge" style="position:absolute; top:-14px; left:50%; transform:translateX(-50%); background:var(--gold-primary); color:#000; font-size:14px; font-weight:bold; padding:4px 14px; border-radius:10px; text-transform:uppercase; letter-spacing:0.5px; opacity:0; transition:all 0.3s;">Winner!</div>
                                <div style="font-size:22px; font-weight:bold; color:#fff; text-transform:uppercase;">Shopee DSP</div>
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); margin-top:6px;">Độ khớp: 9.8/10</div>
                                <div style="font-family:monospace; font-size:42px; font-weight:bold; color:#a3a3a3; margin:20px 0;" class="bid-val b3">$0.00</div>
                                <div style="font-size:16px; color:#10b981; font-weight:bold; opacity:0;" class="bid-status b3">CHIẾN THẮNG</div>
                            </div>
                        </div>

                        <!-- Bottom: Log Dashboard -->
                        <div class="glass-card rtb-log-card" style="width:100%; max-width:1060px; height:200px; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:24px; box-sizing:border-box; background:#0b0e14; text-align:left; font-family:monospace; font-size:17px; line-height:1.6; color:#a3a3a3; overflow:hidden; position:relative;">
                            <div style="font-size:16px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:12px; text-transform:uppercase; font-family:sans-serif;">Nhật ký Ad Exchange</div>
                            <div class="log-lines-container" style="height:120px; overflow-y:hidden; display:flex; flex-direction:column; gap:6px;">
                                <div class="log-line l1" style="opacity:0.3;">[0.005s] Request ad slot cho User: 890244</div>
                                <div class="log-line l2" style="opacity:0.3;">[0.020s] Gửi Bid Request tới 3 DSP</div>
                                <div class="log-line l3" style="opacity:0.3;">[0.050s] Bid Response: Nike $0.45, Adidas $0.65, Shopee $0.85</div>
                                <div class="log-line l4" style="opacity:0.3;">[0.085s] Ad Exchange tính toán độ khớp thầu</div>
                                <div class="log-line l5" style="opacity:0.3; color:#10b981; font-weight:bold;">[0.098s] Đấu giá kết thúc! Shopee thắng ($0.85 CPM)</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_adtech_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:40px; zoom:0.83;">
                        <!-- Left Panel: Phone Mockup with Sponsored Ad on Feed -->
                        <div class="glass-card phone-mockup fb-feed-phone" style="width:420px; height:680px; border:2.5px solid #1877f2; border-radius:36px; padding:20px; display:flex; flex-direction:column; background:#0c121c; position:relative; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.85);">
                            <!-- Phone Status bar -->
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(255,255,255,0.06); padding-bottom:10px; margin-bottom:15px; z-index:5;">
                                <span style="font-size:16px; font-weight:bold; color:#1877f2; display:flex; align-items:center; gap:6px;">
                                    <i data-lucide="facebook" style="width:18px; height:18px; color:#1877f2; fill:#1877f2;"></i> Bảng tin Facebook
                                </span>
                                <span style="font-size:14px; color:rgba(255,255,255,0.3); font-weight:bold;">4G | 10:05 AM</span>
                            </div>

                            <!-- Timeline scroll container -->
                            <div style="flex:1; display:flex; flex-direction:column; gap:16px; overflow:hidden; position:relative; z-index:2;">
                                <!-- Normal post -->
                                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); border-radius:16px; padding:12px; opacity:0.5; transform:scale(0.95); pointer-events:none;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <div style="width:30px; height:30px; border-radius:50%; background:#737373;"></div>
                                        <span style="font-size:14px; font-weight:bold; color:#fff;">Bạn bè của bạn</span>
                                    </div>
                                    <div style="font-size:13px; color:#a3a3a3; margin-top:8px;">Cuối tuần chill chill...</div>
                                </div>

                                <!-- The Retargeted Ad Card -->
                                <div class="sponsored-ad-card glass-card" style="border:2px solid rgba(24,119,242,0.15); border-radius:18px; background:rgba(24,119,242,0.04); padding:16px; display:flex; flex-direction:column; gap:12px; transition:all 0.5s; transform:translateY(30px); opacity:0;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <div style="width:36px; height:36px; border-radius:50%; background:#ff5722; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:bold;">S</div>
                                            <div>
                                                <div style="font-size:17px; font-weight:bold; color:#fff;">Shopee.vn</div>
                                                <div style="font-size:13px; color:#1877f2; font-weight:bold; display:flex; align-items:center; gap:4px;"><i data-lucide="globe" style="width:12px; height:12px;"></i> Được tài trợ</div>
                                            </div>
                                        </div>
                                        <i data-lucide="more-horizontal" style="color:rgba(255,255,255,0.4); width:20px; height:20px;"></i>
                                    </div>
                                    <div style="font-size:16px; color:#e5e7eb; line-height:1.4;">Bạn vẫn đang để mắt tới em này? Nhấn mua ngay để nhận ưu đãi giảm giá độc quyền! 👟💥</div>
                                    
                                    <!-- Ad Product Frame -->
                                    <div style="background:#131a26; border-radius:14px; border:1px solid rgba(24,119,242,0.2); overflow:hidden;">
                                        <div style="height:150px; background:radial-gradient(circle, rgba(255,87,34,0.12) 0%, transparent 80%); display:flex; align-items:center; justify-content:center; position:relative;">
                                            <span style="font-size:80px; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.4));">👟</span>
                                        </div>
                                        <div style="padding:14px; display:flex; justify-content:space-between; align-items:center; background:#0c121c; border-top:1px solid rgba(255,255,255,0.05);">
                                            <div style="text-align:left;">
                                                <div style="font-size:16px; font-weight:bold; color:#fff;">UltraBoost Promax</div>
                                                <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px;">Shopee.vn | Còn hàng</div>
                                            </div>
                                            <button class="ad-shop-now-btn" style="background:#1877f2; border:none; border-radius:8px; padding:10px 18px; color:#fff; font-size:16px; font-weight:bold; cursor:pointer; position:relative;">
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Cursor interaction simulation -->
                            <div class="virtual-cursor" style="position:absolute; width:24px; height:24px; pointer-events:none; z-index:100; left:50%; top:80%; opacity:0; transition:all 0.5s ease-out; font-size:24px; transform:translate(-2px, -2px);">👆</div>
                            <div class="click-ripple" style="position:absolute; width:40px; height:40px; border-radius:50%; border:2px solid #1877f2; background:rgba(24,119,242,0.15); pointer-events:none; z-index:99; left:0; top:0; transform:translate(-50%, -50%) scale(0); opacity:0;"></div>
                        </div>

                        <!-- Right Panel: Ad Metrics Dashboard -->
                        <div class="glass-card metrics-card-s5" style="width:420px; height:680px; border:2.5px solid #1877f2; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s; box-shadow:0 0 25px rgba(24,119,242,0.1);">
                            <div>
                                <div style="font-size:20px; font-weight:bold; color:#1877f2; border-bottom:1.5px solid rgba(24,119,242,0.15); padding-bottom:10px; margin-bottom:15px; text-transform:uppercase; letter-spacing:0.5px;">Phân tích phân phối (Delivery Stats)</div>
                                <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
                                    <div class="metric-item glass-card" style="padding:15px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.01); border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:16px; color:#fff;">Giá thầu CPM thắng:</span>
                                        <span style="font-size:20px; font-weight:bold; color:#10b981; font-family:monospace;">$0.85 CPM</span>
                                    </div>
                                    <div class="metric-item glass-card" style="padding:15px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.01); border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:16px; color:#fff;">Relevance Score:</span>
                                        <span style="font-size:20px; font-weight:bold; color:var(--gold-primary); font-family:monospace;">9.8 / 10</span>
                                    </div>
                                    <div class="metric-item glass-card" style="padding:15px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.01); border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:16px; color:#fff;">Tốc độ khớp thầu:</span>
                                        <span style="font-size:20px; font-weight:bold; color:#10b981; font-family:monospace;">42 ms</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background:rgba(24,119,242,0.04); border:1px solid rgba(24,119,242,0.15); border-radius:16px; padding:18px; box-sizing:border-box;">
                                <div style="font-size:16px; color:rgba(255,255,255,0.4); text-transform:uppercase; font-weight:bold; margin-bottom:8px; text-align:left;">Kết quả chuyển đổi:</div>
                                <div style="display:flex; gap:12px; align-items:center;">
                                    <div style="width:48px; height:48px; border-radius:50%; background:#10b981; display:flex; align-items:center; justify-content:center; color:#000; font-size:24px;">💰</div>
                                    <div style="text-align:left;">
                                        <div style="font-size:18px; font-weight:bold; color:#fff;">ROI Đạt: 350%</div>
                                        <div style="font-size:14px; color:#a3a3a3; margin-top:2px;">Nhắm đúng mục tiêu, tăng tỷ lệ mua hàng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (needsTemplate && typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_adtech_1') {
            const shopee = canvas.querySelector('.shopee-phone');
            const fb = canvas.querySelector('.fb-phone');
            const fbLoading = canvas.querySelector('.fb-loading-indicator');
            const fbAd = canvas.querySelector('.fb-ad-container');
            const packet = canvas.querySelector('.flow-packet');
            
            // Animation sequence
            // Phase 1: Shopee is fully lit up. (0.0 to 0.3)
            // Phase 2: A data packet shoots from Shopee to Facebook (0.3 to 0.6)
            // Phase 3: Facebook loading finishes, sponsored ad pops up (0.6 to 1.0)
            
            if (progress < 0.3) {
                if (shopee) shopee.style.boxShadow = '0 0 35px rgba(255,87,34,0.3)';
                if (fb) fb.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
                if (fbLoading) fbLoading.style.opacity = '1';
                if (fbAd) { fbAd.style.opacity = '0'; fbAd.style.transform = 'scale(0.9)'; }
                if (packet) packet.style.opacity = '0';
            }
            else if (progress >= 0.3 && progress < 0.6) {
                if (shopee) shopee.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
                const ratio = (progress - 0.3) / 0.3; // 0 to 1
                const startX = 10;
                const endX = 110;
                const currentX = startX + (endX - startX) * ratio;
                if (packet) {
                    packet.style.left = `${currentX}px`;
                    packet.style.opacity = '1';
                }
                if (fbLoading) fbLoading.style.opacity = '1';
            }
            else {
                // progress >= 0.6
                if (packet) packet.style.opacity = '0';
                if (fb) fb.style.boxShadow = '0 0 35px rgba(24,119,242,0.3)';
                if (fbLoading) fbLoading.style.opacity = '0';
                if (fbAd) {
                    fbAd.style.opacity = '1';
                    fbAd.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_adtech_2') {
            const button = canvas.querySelector('.xemgiay-btn');
            const pixelBadge = canvas.querySelector('.pixel-tag-badge');
            const codeCard = canvas.querySelector('.code-card-s2');
            const codeGlow = canvas.querySelector('.code-execution-glow');
            const packet = canvas.querySelector('.transmit-packet');
            const transmitLine = canvas.querySelector('.transmit-line');
            const fbServer = canvas.querySelector('#fb-server-element');
            const serverTitle = canvas.querySelector('.server-title');
            const serverStatus = canvas.querySelector('.server-status');
            
            // Animation sequence:
            // 0.0 -> 0.2: Cursor hovers/clicks the button
            // 0.2 -> 0.4: Code highlights / glow triggers
            // 0.4 -> 0.8: Data packet flies to FB Server
            // 0.8 -> 1.0: FB Server processes event, lights up green
            
            if (progress < 0.2) {
                if (button) { button.style.background = '#ff5722'; button.style.transform = 'scale(1)'; }
                if (pixelBadge) pixelBadge.style.opacity = '0';
                if (codeGlow) { codeGlow.style.borderColor = 'transparent'; codeGlow.style.boxShadow = 'none'; }
                if (packet) packet.style.opacity = '0';
                if (transmitLine) transmitLine.style.opacity = '0.3';
                if (fbServer) { fbServer.style.borderColor = 'rgba(255,255,255,0.06)'; fbServer.style.boxShadow = 'none'; }
                if (serverTitle) { serverTitle.textContent = 'Máy chủ Facebook'; serverTitle.style.color = 'var(--text-muted)'; }
                if (serverStatus) serverStatus.textContent = 'Đang đợi data...';
            }
            else if (progress >= 0.2 && progress < 0.45) {
                // Trigger button click animation
                if (button) { button.style.background = '#e64a19'; button.style.transform = 'scale(0.97)'; }
                if (pixelBadge) pixelBadge.style.opacity = '1';
                // Trigger JavaScript highlights / glow
                if (codeGlow) {
                    codeGlow.style.borderColor = 'var(--gold-primary)';
                    codeGlow.style.boxShadow = '0 0 20px rgba(245,158,11,0.15)';
                }
                if (packet) packet.style.opacity = '0';
            }
            else if (progress >= 0.45 && progress < 0.8) {
                if (button) { button.style.background = '#ff5722'; button.style.transform = 'scale(1)'; }
                const ratio = (progress - 0.45) / 0.35; // 0 to 1
                const startX = 290;
                const endX = 670;
                const currentX = startX + (endX - startX) * ratio;
                if (packet) {
                    packet.style.left = `${currentX}px`;
                    packet.style.opacity = '1';
                }
                if (transmitLine) transmitLine.style.opacity = '1';
            }
            else {
                // progress >= 0.8
                if (packet) packet.style.opacity = '0';
                if (fbServer) {
                    fbServer.style.borderColor = '#10b981';
                    fbServer.style.boxShadow = '0 0 30px rgba(16,185,129,0.3)';
                }
                if (serverTitle) { serverTitle.textContent = 'Data Nhận Thành Công!'; serverTitle.style.color = '#10b981'; }
                if (serverStatus) serverStatus.textContent = 'ViewContent: UltraBoost Promax';
            }
        }
        else if (slideId === 'slide_adtech_3') {
            const badge = canvas.querySelector('.tag-transfer-badge');
            const targetTag = canvas.querySelector('.animated-retarget-tag');
            const audienceBox = canvas.querySelector('.custom-audience-status');
            const audienceShield = canvas.querySelector('.audience-shield');
            const audienceText = canvas.querySelector('.audience-text');
            const profileRecord = canvas.querySelector('.profile-record-card');
            
            // Animation sequence:
            // 0.0 -> 0.15: Start from DB
            // 0.15 -> 0.55: Tag transfers across connector path
            // 0.55 -> 0.8: Tag snaps in and lights up user profile tags list
            // 0.8 -> 1.0: Custom Audience changes state to registered, profile card glows
            
            if (progress < 0.15) {
                if (badge) badge.style.opacity = '0';
                if (targetTag) {
                    targetTag.style.background = 'rgba(255,255,255,0.03)';
                    targetTag.style.borderColor = 'rgba(255,255,255,0.08)';
                    targetTag.style.color = 'rgba(255,255,255,0.3)';
                }
                if (audienceBox) audienceBox.style.borderColor = 'rgba(255,255,255,0.05)';
                if (audienceShield) audienceShield.style.color = 'rgba(255,255,255,0.2)';
                if (audienceText) { audienceText.textContent = 'Chưa được xếp nhóm'; audienceText.style.color = 'rgba(255,255,255,0.3)'; }
                if (profileRecord) { profileRecord.style.borderColor = 'rgba(255,255,255,0.06)'; profileRecord.style.boxShadow = 'none'; }
            }
            else if (progress >= 0.15 && progress < 0.55) {
                const ratio = (progress - 0.15) / 0.4; // 0 to 1
                const startX = 640;
                const endX = 290;
                const currentX = startX - (startX - endX) * ratio;
                const currentY = 240 + 40 * Math.sin(ratio * Math.PI);
                if (badge) {
                    badge.style.left = `${currentX}px`;
                    badge.style.top = `${currentY}px`;
                    badge.style.opacity = '1';
                }
            }
            else if (progress >= 0.55 && progress < 0.8) {
                if (badge) badge.style.opacity = '0';
                if (targetTag) {
                    targetTag.style.background = 'rgba(245,158,11,0.15)';
                    targetTag.style.borderColor = 'var(--gold-primary)';
                    targetTag.style.color = 'var(--gold-primary)';
                }
            }
            else {
                // progress >= 0.8
                if (badge) badge.style.opacity = '0';
                if (targetTag) {
                    targetTag.style.background = 'rgba(245,158,11,0.15)';
                    targetTag.style.borderColor = 'var(--gold-primary)';
                    targetTag.style.color = 'var(--gold-primary)';
                }
                if (audienceBox) audienceBox.style.borderColor = '#10b981';
                if (audienceShield) audienceShield.style.color = '#10b981';
                if (audienceText) { audienceText.textContent = 'Shopee Shoes Visitors (30D)'; audienceText.style.color = '#10b981'; }
                if (profileRecord) {
                    profileRecord.style.borderColor = '#10b981';
                    profileRecord.style.boxShadow = '0 0 25px rgba(16,185,129,0.2)';
                }
            }
        }
        else if (slideId === 'slide_adtech_4') {
            const clock = canvas.querySelector('.auction-clock-card');
            const timerText = canvas.querySelector('.auction-timer');
            const bidVal1 = canvas.querySelector('.bid-val.b1');
            const bidVal2 = canvas.querySelector('.bid-val.b2');
            const bidVal3 = canvas.querySelector('.bid-val.b3');
            const bidStatus1 = canvas.querySelector('.bid-status.b1');
            const bidStatus2 = canvas.querySelector('.bid-status.b2');
            const bidStatus3 = canvas.querySelector('.bid-status.b3');
            const winnerBadge = canvas.querySelector('.winner-badge');
            const bidder1 = canvas.querySelector('.bidder-card.b1');
            const bidder2 = canvas.querySelector('.bidder-card.b2');
            const bidder3 = canvas.querySelector('.bidder-card.b3');
            const logs = canvas.querySelectorAll('.log-line');
            
            // Speed bidding counts up
            const timeRemaining = Math.max(0, 0.1 - progress * 0.1);
            if (timerText) timerText.textContent = `${timeRemaining.toFixed(3)} s`;
            
            // DSP bidding prices animation
            // Bids increment from $0.00 to their targets
            const targetBid1 = 0.45;
            const targetBid2 = 0.65;
            const targetBid3 = 0.85;
            
            const currentBid1 = Math.min(targetBid1, progress * 1.25 * targetBid1);
            const currentBid2 = Math.min(targetBid2, progress * 1.15 * targetBid2);
            const currentBid3 = Math.min(targetBid3, progress * 1.35 * targetBid3);
            
            if (bidVal1) bidVal1.textContent = `$${currentBid1.toFixed(2)}`;
            if (bidVal2) bidVal2.textContent = `$${currentBid2.toFixed(2)}`;
            if (bidVal3) bidVal3.textContent = `$${currentBid3.toFixed(2)}`;
            
            // Console logging triggers on timeline:
            if (logs[0] && progress > 0.05) logs[0].style.opacity = '1';
            if (logs[1] && progress > 0.25) logs[1].style.opacity = '1';
            if (logs[2] && progress > 0.5) logs[2].style.opacity = '1';
            if (logs[3] && progress > 0.7) logs[3].style.opacity = '1';
            if (logs[4] && progress > 0.85) logs[4].style.opacity = '1';
            
            if (progress >= 0.85) {
                if (clock) { clock.style.borderColor = '#10b981'; clock.style.boxShadow = '0 0 25px rgba(16,185,129,0.3)'; clock.style.background = 'rgba(16,185,129,0.03)'; }
                if (timerText) { timerText.textContent = '0.000 s'; timerText.style.color = '#10b981'; }
                
                // Show lose/win statuses
                if (bidStatus1) bidStatus1.style.opacity = '1';
                if (bidStatus2) bidStatus2.style.opacity = '1';
                if (bidStatus3) bidStatus3.style.opacity = '1';
                if (winnerBadge) winnerBadge.style.opacity = '1';
                
                // Glow winner card
                if (bidder3) {
                    bidder3.style.borderColor = 'var(--gold-primary)';
                    bidder3.style.boxShadow = '0 0 30px rgba(245,158,11,0.35)';
                    bidder3.style.background = 'rgba(245,158,11,0.04)';
                }
                if (bidVal3) bidVal3.style.color = 'var(--gold-primary)';
            } else {
                if (clock) { clock.style.borderColor = '#ef4444'; clock.style.boxShadow = '0 0 20px rgba(239,68,68,0.08)'; clock.style.background = 'rgba(239,68,68,0.02)'; }
                if (timerText) timerText.style.color = '#ef4444';
                if (bidStatus1) bidStatus1.style.opacity = '0';
                if (bidStatus2) bidStatus2.style.opacity = '0';
                if (bidStatus3) bidStatus3.style.opacity = '0';
                if (winnerBadge) winnerBadge.style.opacity = '0';
                if (bidder3) { bidder3.style.borderColor = 'rgba(255,255,255,0.05)'; bidder3.style.boxShadow = 'none'; bidder3.style.background = 'none'; }
                if (bidVal3) bidVal3.style.color = '#a3a3a3';
            }
        }
        else if (slideId === 'slide_adtech_5') {
            const adCard = canvas.querySelector('.sponsored-ad-card');
            const cursor = canvas.querySelector('.virtual-cursor');
            const ripple = canvas.querySelector('.click-ripple');
            const button = canvas.querySelector('.ad-shop-now-btn');
            
            // Animation sequence:
            // 0.0 -> 0.35: Sponsored ad slides in and fades in
            // 0.35 -> 0.7: Cursor moves from bottom to the "Shop Now" button
            // 0.7 -> 0.8: Cursor clicks (ripple displays, button shrinks)
            // 0.8 -> 1.0: Click resolves, cursor fades out
            
            if (progress < 0.35) {
                const ratio = progress / 0.35;
                if (adCard) {
                    adCard.style.opacity = ratio.toString();
                    adCard.style.transform = `translateY(${(1 - ratio) * 30}px)`;
                }
                if (cursor) cursor.style.opacity = '0';
                if (ripple) { ripple.style.transform = 'translate(-50%, -50%) scale(0)'; ripple.style.opacity = '0'; }
            }
            else if (progress >= 0.35 && progress < 0.7) {
                if (adCard) { adCard.style.opacity = '1'; adCard.style.transform = 'translateY(0)'; }
                
                const ratio = (progress - 0.35) / 0.35; // 0 to 1
                // Move cursor to button position
                // Button is roughly at left: 300px, top: 430px relative to phone mockup container
                // Let's position it absolute in terms of container coordinates
                const startX = 220; // middle bottom
                const startY = 560;
                const endX = 320; // button location
                const endY = 460;
                
                const currentX = startX + (endX - startX) * ratio;
                const currentY = startY - (startY - endY) * ratio;
                
                if (cursor) {
                    cursor.style.left = `${currentX}px`;
                    cursor.style.top = `${currentY}px`;
                    cursor.style.opacity = '1';
                }
                if (ripple) { ripple.style.transform = 'translate(-50%, -50%) scale(0)'; ripple.style.opacity = '0'; }
            }
            else if (progress >= 0.7 && progress < 0.85) {
                // Trigger Click event!
                if (cursor) { cursor.style.left = '320px'; cursor.style.top = '460px'; cursor.style.opacity = '1'; }
                
                const clickRatio = (progress - 0.7) / 0.15; // 0 to 1
                if (ripple) {
                    ripple.style.left = '320px';
                    ripple.style.top = '460px';
                    ripple.style.transform = `translate(-50%, -50%) scale(${clickRatio * 1.5})`;
                    ripple.style.opacity = (1 - clickRatio).toString();
                }
                if (button) {
                    button.style.transform = 'scale(0.92)';
                    button.style.background = '#155db2';
                }
            }
            else {
                // progress >= 0.85
                if (cursor) cursor.style.opacity = '0';
                if (ripple) { ripple.style.opacity = '0'; }
                if (button) {
                    button.style.transform = 'scale(1)';
                    button.style.background = '#1877f2';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video18',
        topic: 'Retargeting & Facebook Pixel',
        episodeNum: 18,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video18 Plugin] Loaded: Retargeting & Facebook Pixel slides ready.');
})();
