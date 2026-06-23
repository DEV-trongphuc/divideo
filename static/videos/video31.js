/**
 * Video 31: Luhn Algorithm & Client-Side Validation
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video31
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_luhn_1: [
            { text: 'Luhn Check', start: 1.0, end: 12.0, class: 'active-bad' },
            { text: 'kiểm định', start: 12.0, end: 24.0, class: 'active-gold' }
        ],
        slide_luhn_bin: [
            { text: 'mã định danh BIN', start: 1.0, end: 11.0, class: 'active-gold' },
            { text: 'kiểm định', start: 11.0, end: 22.0, class: 'active-good' }
        ],
        slide_luhn_2: [
            { text: 'phải sang trái', start: 1.0, end: 10.0, class: 'active-gold' },
            { text: 'nhân đôi', start: 10.0, end: 22.0, class: 'active-good' }
        ],
        slide_luhn_3: [
            { text: 'chia hết cho 10', start: 1.0, end: 11.0, class: 'active-good' },
            { text: 'sai một chữ số', start: 11.0, end: 21.0, class: 'active-bad' }
        ],
        slide_luhn_4: [
            { text: 'Client-side Validation', start: 1.0, end: 11.0, class: 'active-gold' },
            { text: 'báo đỏ', start: 11.0, end: 23.0, class: 'active-bad' }
        ],
        slide_luhn_5: [
            { text: 'tiết kiệm tài nguyên', start: 1.0, end: 10.0, class: 'active-good' },
            { text: 'xác thực', start: 10.0, end: 20.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_luhn_1',
        'slide_luhn_bin',
        'slide_luhn_2',
        'slide_luhn_3',
        'slide_luhn_4',
        'slide_luhn_5'
    ];

    function initIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Helper to detect card brand details based on current number prefix
    function getCardBrandDetails(cardNumber) {
        const cleanNum = cardNumber.toString().replace(/[\s\xa0]+/g, '');
        if (cleanNum.startsWith('970436')) {
            return {
                type: 'vietcombank',
                logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png',
                name: 'Vietcombank',
                color: '#10b981'
            };
        } else if (cleanNum.startsWith('9704')) {
            return {
                type: 'napas',
                logoUrl: '',
                name: 'NAPAS',
                color: 'var(--luhn-orange)'
            };
        } else if (cleanNum.startsWith('4')) {
            return {
                type: 'visa',
                logoUrl: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
                name: 'VISA',
                color: '#60a5fa'
            };
        } else if (cleanNum.startsWith('5')) {
            return {
                type: 'mastercard',
                logoUrl: 'https://www.mastercard.com/content/dam/brandcenter/assets/images/logos/mclogo-for-footer.svg',
                name: 'MASTERCARD',
                color: '#f43f5e'
            };
        }
        return {
            type: 'unknown',
            logoUrl: '',
            name: 'CARD',
            color: 'var(--luhn-text-muted)'
        };
    }

    // Geometry center helper
    function getNodeCenter(node, container) {
        if (!node || !container) return { x: 0, y: 0 };
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const zoom = container.offsetWidth > 0 ? (containerRect.width / container.offsetWidth) : 1.45;
        const rx = rect.left - containerRect.left + rect.width / 2;
        const ry = rect.top - containerRect.top + rect.height / 2;
        return {
            x: rx / zoom,
            y: ry / zoom
        };
    }

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_luhn_1') {
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 24px;">
                    <!-- Credit card representation -->
                    <div class="v31-credit-card" id="v31-card-1">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div class="v31-card-chip"></div>
                            <span style="font-size: 10px; font-weight:bold; color:var(--luhn-text-muted); text-transform:uppercase; letter-spacing:0.5px;">Credit Card</span>
                        </div>
                        
                        <!-- Dynamically typed credit card numbers -->
                        <div class="v31-card-number" id="v31-card-num-display">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>

                        <div class="v31-card-holder-area">
                            <div class="v31-card-holder">
                                <div class="v31-card-label">Card Holder</div>
                                <div class="v31-card-val">Alice Vance</div>
                            </div>
                            <div class="v31-card-brand" id="v31-brand-logo-container-1">
                                <img src="" id="v31-brand-logo-img-1" style="display: none;" />
                                <span id="v31-brand-logo-text-1">CARD</span>
                            </div>
                        </div>
                    </div>

                    <!-- Warning Toast alert -->
                    <div class="v31-glass-card" id="v31-alert-toast-1" style="padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; border-color: rgba(255,255,255,0.08); transition: all 0.4s;">
                        <span class="v31-status-badge red" id="v31-status-badge-1" style="opacity:0;"><i data-lucide="alert-triangle"></i> invalid card</span>
                        <div style="font-family: 'Fira Code', monospace; font-size: 12px; font-weight: 900; color: var(--luhn-text-muted);" id="v31-card-check-desc">
                            Typing number...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_luhn_bin') {
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 20px; padding-top: 10px;">
                    <!-- Credit card representation with highlight container -->
                    <div class="v31-credit-card" id="v31-card-bin" style="height: 180px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div class="v31-card-chip"></div>
                            <span style="font-size: 10px; font-weight:bold; color:var(--luhn-text-muted); text-transform:uppercase; letter-spacing:0.5px;">Premium Identification</span>
                        </div>
                        
                        <!-- Numbers with highlight zones -->
                        <div class="v31-card-number" style="display: flex; gap: 4px; font-family:'Fira Code', monospace; justify-content: flex-start; margin-top: 25px; font-size: 20px;">
                            <span id="v31-num-mii" style="color: var(--luhn-text); font-weight: 900; transition: all 0.3s; padding: 2px 6px; border-radius: 6px;">9</span>
                            <span id="v31-num-bin" style="color: var(--luhn-text); font-weight: 900; transition: all 0.3s; padding: 2px 6px; border-radius: 6px;">704 36</span>
                            <span id="v31-num-rest" style="color: rgba(255,255,255,0.15); font-weight: 900; transition: all 0.3s; padding: 2px 6px;">12 3456 7890</span>
                        </div>

                        <div class="v31-card-holder-area" style="margin-top: 25px;">
                            <div class="v31-card-holder">
                                <div class="v31-card-label">Card Holder</div>
                                <div class="v31-card-val">Alice Vance</div>
                            </div>
                            <div class="v31-card-brand" id="v31-card-brand-bin" style="color: var(--luhn-text-muted); font-weight: 900; transition: all 0.3s;">
                                <img src="" id="v31-brand-logo-img-bin" style="display: none;" />
                                <span id="v31-brand-logo-text-bin">CARD</span>
                            </div>
                        </div>
                    </div>

                    <!-- BIN Identification Panel -->
                    <div class="v31-glass-card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; width: 100%;">
                        <div style="font-size: 12px; font-weight: 900; color: var(--luhn-text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; text-align: left;">
                            Giải mã cấu trúc số thẻ
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 8px; text-align: left; font-size: 13px;">
                            <!-- MII Item -->
                            <div class="v31-bin-item" id="v31-bin-item-mii" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04); background: rgba(0,0,0,0.15); transition: all 0.3s;">
                                <span style="color: rgba(255,255,255,0.5);">Số đầu (MII): <strong style="color:var(--luhn-orange);" id="v31-mii-digit">9</strong></span>
                                <span style="font-weight: 900; color: rgba(255,255,255,0.3); transition: all 0.3s;" id="v31-mii-label">Đang gõ...</span>
                            </div>
                            
                            <!-- BIN Item -->
                            <div class="v31-bin-item" id="v31-bin-item-bin" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04); background: rgba(0,0,0,0.15); transition: all 0.3s; opacity: 0.4;">
                                <span style="color: rgba(255,255,255,0.5);">6 số đầu (BIN): <strong style="color:#60a5fa;" id="v31-bin-digit">970436</strong></span>
                                <span style="font-weight: 900; color: rgba(255,255,255,0.3); transition: all 0.3s;" id="v31-bin-label">Đang gõ...</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_luhn_2') {
            const numbers = [9, 7, 0, 4, 3, 6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 15px;">
                    <div style="font-size:13px; font-weight:800; color:var(--luhn-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Quét từ phải sang trái & nhân đôi
                    </div>

                    <!-- Row-based calculations layout (Mỗi số 1 ô vuông riêng biệt) -->
                    <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
                        <!-- Original digits row -->
                        <div class="v31-luhn-row original">
                            ${numbers.map((num, i) => `
                                <div class="v31-luhn-digit-box original" id="v31-orig-box-${i}">${num}</div>
                            `).join('')}
                        </div>

                        <!-- Arrows row -->
                        <div class="v31-luhn-arrows-row">
                            ${numbers.map((num, i) => `
                                <div class="v31-luhn-arrow-item" id="v31-arrow-${i}">↓</div>
                            `).join('')}
                        </div>

                        <!-- Calculated digits row -->
                        <div class="v31-luhn-row calculated">
                            ${numbers.map((num, i) => `
                                <div class="v31-luhn-digit-box calculated" id="v31-calc-box-${i}">?</div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="v31-glass-card" style="padding: 16px 20px; text-align:center; min-height: 85px; display:flex; flex-direction:column; justify-content:center; align-items:center; border-color: rgba(139, 92, 246, 0.2); transition: border-color 0.3s;" id="v31-luhn-calc-details-card">
                        <div style="font-size: 14px; font-weight:bold; color:var(--luhn-text-muted); display:flex; align-items:center; gap:6px;" id="v31-calc-detail-label">
                            Bắt đầu quét (từ phải sang)...
                        </div>
                        <div style="font-size: 18px; font-weight: 900; color: #fff; margin-top: 6px; font-family: 'Fira Code', monospace;" id="v31-calc-detail-step">
                            Đang đợi dữ liệu...
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_luhn_3') {
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 20px;">
                    <div style="font-size:13px; font-weight:800; color:var(--luhn-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Cộng tổng và chia hết cho 10
                    </div>

                    <!-- Sum card visualization -->
                    <div class="v31-glass-card" style="padding:18px; text-align:center; display:flex; flex-direction:column; gap:12px;">
                        <div style="font-family:'Fira Code', monospace; font-size:12px; color:var(--luhn-text-muted); line-height:1.4;" id="v31-sum-formula">
                            Sum = 9 + 7 + 0 + 4 + 6 + 6 + 2 + 2 + 6 + 4 + 1 + 6 + 5 + 8 + 9 + 0 = 75
                        </div>

                        <div style="display:flex; justify-content:space-around; align-items:center; background:rgba(0,0,0,0.2); border-radius:12px; padding:12px; border:1px solid rgba(255,255,255,0.03);">
                            <div style="text-align:left;">
                                <div style="font-size:10px; color:var(--luhn-text-muted); font-weight:bold; text-transform:uppercase;">Tổng số thẻ (Sum)</div>
                                <div style="font-size:24px; font-weight:900; color:#fff; display:inline-block; transition:transform 0.3s;" id="v31-sum-display">75</div>
                            </div>
                            <div style="width:1.5px; height:35px; background:rgba(255,255,255,0.08);"></div>
                            <div style="text-align:left;">
                                <div style="font-size:10px; color:var(--luhn-text-muted); font-weight:bold; text-transform:uppercase;">Kết quả dư (Sum % 10)</div>
                                <div style="font-size:24px; font-weight:900; color:var(--luhn-red); display:inline-block; transition:transform 0.3s;" id="v31-mod-display">5</div>
                            </div>
                        </div>

                        <!-- Card switcher description -->
                        <div style="font-size:11px; font-weight:bold; color:var(--luhn-red);" id="v31-validity-status">
                            ❌ Số thẻ không thể tồn tại (Không chia hết cho 10)
                        </div>
                    </div>

                    <!-- Slide card comparison toggler -->
                    <div style="font-size:12px; color:var(--luhn-text-muted); line-height:1.4;" id="v31-luhn-helper-tip">
                        Nếu đổi chữ số cuối thành <span style="color:var(--luhn-green); font-weight:bold;">5</span> ➔ Tổng = <span style="color:var(--luhn-green); font-weight:bold;">80</span> % 10 = <span style="color:var(--luhn-green); font-weight:bold;">0 (Hợp lệ)</span>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_luhn_4') {
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 20px;">
                    <div style="font-size:13px; font-weight:800; color:var(--luhn-text-muted); text-transform:uppercase; text-align:center; letter-spacing:0.8px;">
                        Mô hình xác thực phía máy khách (Client-side)
                    </div>

                    <!-- List of field inputs -->
                    <div class="v31-validation-grid">
                        <!-- Field 1: Email -->
                        <div class="v31-val-card" id="v31-val-email">
                            <div class="v31-val-info">
                                <div class="v31-val-label">Email Address</div>
                                <div class="v31-val-input-text" id="v31-input-email">bob#domain.com</div>
                            </div>
                            <div class="v31-val-status invalid" id="v31-status-email">INVALID</div>
                        </div>

                        <!-- Field 2: Phone -->
                        <div class="v31-val-card" id="v31-val-phone">
                            <div class="v31-val-info">
                                <div class="v31-val-label">Phone Number</div>
                                <div class="v31-val-input-text" id="v31-input-phone">09123</div>
                            </div>
                            <div class="v31-val-status invalid" id="v31-status-phone">TOO SHORT</div>
                        </div>

                        <!-- Field 3: CCCD -->
                        <div class="v31-val-card" id="v31-val-cccd">
                            <div class="v31-val-info">
                                <div class="v31-val-label">Citizen Identity (CCCD)</div>
                                <div class="v31-val-input-text" id="v31-input-cccd">123456</div>
                            </div>
                            <div class="v31-val-status invalid" id="v31-status-cccd">TOO SHORT</div>
                        </div>

                        <!-- Field 4: Password -->
                        <div class="v31-val-card" id="v31-val-password">
                            <div class="v31-val-info">
                                <div class="v31-val-label">Password</div>
                                <div class="v31-val-input-text" id="v31-input-password">abc</div>
                            </div>
                            <div class="v31-val-status invalid" id="v31-status-password">WEAK</div>
                        </div>
                    </div>
                </div>
            `;
            initIcons();
        }
        else if (slideId === 'slide_luhn_5') {
            canvas.innerHTML = `
                <div class="v31-zoom-container" style="justify-content: center; gap: 32px;">
                    <!-- Glassmorphic credit card with success status -->
                    <div class="v31-credit-card" id="v31-card-outro" style="animation: v31-card-breath 6s ease-in-out infinite;">
                        <!-- Card Glow background effect -->
                        <div style="position:absolute; right:-20px; top:-20px; width:150px; height:150px; border-radius:50%; background:radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%); filter:blur(15px);"></div>
                        
                        <!-- Card top row -->
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <!-- Card chip -->
                            <div class="v31-card-chip"></div>
                            <!-- Card Brand Logo (Vietcombank icon/Visa) -->
                            <div style="display:flex; gap:6px; align-items:center;">
                                <span style="font-size:12px; font-weight:bold; letter-spacing:1px; color:rgba(255,255,255,0.4); text-transform:uppercase;">Secure Pay</span>
                                <i data-lucide="credit-card" style="width:20px; height:20px; color:rgba(255,255,255,0.6);"></i>
                            </div>
                        </div>
                        
                        <!-- Card Number -->
                        <div class="v31-card-number" style="font-size:24px; font-weight:bold; letter-spacing:2px; color:#fff; word-spacing:4px; margin: 15px 0;">
                            4539 0123 4567 8910
                        </div>
                        
                        <!-- Card Footer (Valid thru and checkmark badge) -->
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <div style="font-size:9px; color:rgba(255,255,255,0.3); text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">Valid Thru</div>
                                <div style="font-size:13px; font-weight:bold; color:rgba(255,255,255,0.7); margin-top:2px;">12 / 30</div>
                            </div>
                            
                            <!-- Checkmark status badge -->
                            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); padding:6px 14px; border-radius:30px; box-shadow:0 4px 12px rgba(16,185,129,0.15);" id="v31-outro-shield-badge">
                                <i data-lucide="shield-check" style="width:16px; height:16px; color:#10b981;"></i>
                                <span style="font-size:12px; font-weight:bold; color:#10b981; text-transform:uppercase; letter-spacing:0.5px;">Valid Luhn</span>
                            </div>
                        </div>
                        <!-- Scanning line overlay -->
                        <div id="v31-outro-scanline" style="position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent); transform:skewX(-20deg); pointer-events:none;"></div>
                    </div>
                    <!-- Summary Card -->
                    <div class="glass-card" style="padding:18px 28px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); border-radius:16px; text-align:center; width:100%; max-width:480px; box-shadow:0 15px 35px rgba(0,0,0,0.6); animation: v31-card-breath 6s ease-in-out infinite 1s;">
                        <div style="font-family:'Outfit', sans-serif; font-size:16px; font-weight:800; color:var(--gold-primary); letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:8px;">Luhn Algorithm Validation</div>
                        <div style="font-size:15px; color:#94a3b8; line-height:1.6; display:block;">Xác thực định dạng số thẻ tức thì không cần kết nối API</div>
                    </div>
                </div>
            `;
            initIcons();
        }
    }

    // ── ANIMATION UPDATE FRAME ─────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress, isPlaying) {
        if (slideId === 'slide_luhn_1') {
            const cardNumEl = canvas.querySelector('#v31-card-num-display');
            const alertBadge = canvas.querySelector('#v31-status-badge-1');
            const alertDesc = canvas.querySelector('#v31-card-check-desc');
            const cardEl = canvas.querySelector('#v31-card-1');
            const alertToast = canvas.querySelector('#v31-alert-toast-1');

            const fullNum = "9704 3612 3456 7890";
            
            // Dynamic typing calculation with blinking cursor
            const charCount = Math.floor(progress * 1.25 * fullNum.length);
            const typed = fullNum.substring(0, Math.min(fullNum.length, charCount));
            const isTyping = charCount < fullNum.length;
            const cursorHtml = isTyping ? '<span class="v31-cursor"></span>' : '';
            const remaining = "&nbsp;".repeat(Math.max(0, fullNum.length - typed.length));
            if (cardNumEl) {
                cardNumEl.innerHTML = typed + cursorHtml + remaining;
            }

            // Dynamic card brand update based on typed numbers
            const brandContainer = canvas.querySelector('#v31-brand-logo-container-1');
            const brandImg = canvas.querySelector('#v31-brand-logo-img-1');
            const brandText = canvas.querySelector('#v31-brand-logo-text-1');
            if (brandContainer && brandImg && brandText) {
                const details = getCardBrandDetails(typed);
                if (details.logoUrl) {
                    brandImg.src = details.logoUrl;
                    brandImg.style.display = 'block';
                    brandText.style.display = 'none';
                } else {
                    brandImg.style.display = 'none';
                    brandText.textContent = details.name;
                    brandText.style.display = 'block';
                    brandText.style.color = details.color;
                }
            }

            if (progress < 0.8) {
                if (alertBadge) alertBadge.style.opacity = '0';
                if (alertDesc) alertDesc.textContent = "Typing number...";
                if (cardEl) {
                    cardEl.style.borderColor = 'var(--luhn-border)';
                    cardEl.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.75)';
                    cardEl.classList.remove('shake');
                }
                if (alertToast) {
                    alertToast.style.borderColor = 'rgba(255,255,255,0.08)';
                    alertToast.style.transform = 'translateY(10px)';
                    alertToast.style.opacity = '0.5';
                }
            } else {
                // Flash RED alert & Trigger shake
                if (alertBadge) alertBadge.style.opacity = '1';
                if (alertDesc) {
                    alertDesc.textContent = "Luhn Check: Failed (0ms)";
                    alertDesc.style.color = "var(--luhn-red)";
                }
                if (cardEl) {
                    cardEl.style.borderColor = 'var(--luhn-red)';
                    cardEl.style.boxShadow = '0 0 30px var(--luhn-red-glow)';
                    if (!cardEl.classList.contains('shake')) {
                        cardEl.classList.add('shake');
                    }
                }
                if (alertToast) {
                    alertToast.style.borderColor = 'var(--luhn-red-glow)';
                    alertToast.style.transform = 'translateY(0)';
                    alertToast.style.opacity = '1';
                }
            }
        }
        else if (slideId === 'slide_luhn_bin') {
            const numMii = canvas.querySelector('#v31-num-mii');
            const numBin = canvas.querySelector('#v31-num-bin');
            const numRest = canvas.querySelector('#v31-num-rest');
            const itemMii = canvas.querySelector('#v31-bin-item-mii');
            const itemBin = canvas.querySelector('#v31-bin-item-bin');
            const miiDigit = canvas.querySelector('#v31-mii-digit');
            const miiLabel = canvas.querySelector('#v31-mii-label');
            const binDigit = canvas.querySelector('#v31-bin-digit');
            const binLabel = canvas.querySelector('#v31-bin-label');
            const brandBinImg = canvas.querySelector('#v31-brand-logo-img-bin');
            const brandBinText = canvas.querySelector('#v31-brand-logo-text-bin');

            let miiVal = '9';
            let binRestVal = '704 36';
            let restVal = '12 3456 7890';
            
            let miiColor = 'var(--luhn-orange)';
            let miiColorGlow = 'rgba(245, 158, 11, 0.4)';
            let miiColorBg = 'rgba(245, 158, 11, 0.15)';
            let miiColorBorder = 'rgba(245, 158, 11, 0.3)';
            let miiColorText = 'Thẻ Nội địa / Napas';
            
            let binColor = '#10b981';
            let binColorGlow = 'rgba(16, 185, 129, 0.4)';
            let binColorBg = 'rgba(16, 185, 129, 0.15)';
            let binColorBorder = 'rgba(16, 185, 129, 0.3)';
            
            let binDigitText = '970436';
            let binLabelText = 'Vietcombank';
            
            let phase = 1; // 1 = Visa, 2 = Mastercard, 3 = Vietcombank

            if (progress < 0.35) {
                phase = 1;
                miiVal = '4';
                binRestVal = '000 12';
                restVal = '34 5678 9010';
                
                miiColor = '#3b82f6'; // Visa Blue
                miiColorGlow = 'rgba(59, 130, 246, 0.4)';
                miiColorBg = 'rgba(59, 130, 246, 0.15)';
                miiColorBorder = 'rgba(59, 130, 246, 0.3)';
                miiColorText = 'Mạng lưới thẻ: Visa';
                
                binColor = '#3b82f6';
                binColorGlow = 'rgba(59, 130, 246, 0.4)';
                binColorBg = 'rgba(59, 130, 246, 0.15)';
                binColorBorder = 'rgba(59, 130, 246, 0.3)';
                
                binDigitText = '400012';
                binLabelText = 'Visa Classic/Gold';
            } else if (progress >= 0.35 && progress < 0.70) {
                phase = 2;
                miiVal = '5';
                binRestVal = '123 45';
                restVal = '67 8901 2345';
                
                miiColor = '#db2777'; // Mastercard Pink/Rose
                miiColorGlow = 'rgba(219, 39, 119, 0.4)';
                miiColorBg = 'rgba(219, 39, 119, 0.15)';
                miiColorBorder = 'rgba(219, 39, 119, 0.3)';
                miiColorText = 'Mạng lưới thẻ: Mastercard';
                
                binColor = '#db2777';
                binColorGlow = 'rgba(219, 39, 119, 0.4)';
                binColorBg = 'rgba(219, 39, 119, 0.15)';
                binColorBorder = 'rgba(219, 39, 119, 0.3)';
                
                binDigitText = '512345';
                binLabelText = 'Mastercard Standard';
            } else {
                phase = 3;
                miiVal = '9';
                binRestVal = '704 36';
                restVal = '12 3456 7890';
                
                miiColor = 'var(--luhn-orange)'; // Napas Orange
                miiColorGlow = 'rgba(245, 158, 11, 0.4)';
                miiColorBg = 'rgba(245, 158, 11, 0.15)';
                miiColorBorder = 'rgba(245, 158, 11, 0.3)';
                miiColorText = 'Thẻ Nội địa / Napas';
                
                binColor = '#10b981'; // Vietcombank Green
                binColorGlow = 'rgba(16, 185, 129, 0.4)';
                binColorBg = 'rgba(16, 185, 129, 0.15)';
                binColorBorder = 'rgba(16, 185, 129, 0.3)';
                
                binDigitText = '970436';
                binLabelText = 'Vietcombank (Napas)';
            }

            // Update card number text content
            if (numMii) numMii.textContent = miiVal;
            if (numBin) numBin.textContent = binRestVal;
            if (numRest) numRest.textContent = restVal;

            // Update card brand logo
            const brandDetails = getCardBrandDetails(miiVal + binRestVal);
            if (brandBinImg && brandBinText) {
                if (brandDetails.logoUrl) {
                    brandBinImg.src = brandDetails.logoUrl;
                    brandBinImg.style.display = 'block';
                    brandBinText.style.display = 'none';
                } else {
                    brandBinImg.style.display = 'none';
                    brandBinText.textContent = brandDetails.name;
                    brandBinText.style.display = 'block';
                    brandBinText.style.color = brandDetails.color;
                }
            }

            // Update panel text
            if (miiDigit) miiDigit.textContent = miiVal;
            if (miiLabel) miiLabel.textContent = miiColorText;
            if (binDigit) binDigit.textContent = binDigitText;
            if (binLabel) binLabel.textContent = binLabelText;

            // Focus states based on phase
            if (phase === 1) {
                // Focus: MII (First digit)
                if (numMii) {
                    numMii.style.color = miiColor;
                    numMii.style.background = miiColorBg;
                    numMii.style.boxShadow = `0 0 10px ${miiColorGlow}`;
                }
                if (numBin) {
                    numBin.style.color = 'rgba(255, 255, 255, 0.15)';
                    numBin.style.background = 'transparent';
                    numBin.style.boxShadow = 'none';
                }
                if (numRest) numRest.style.color = 'rgba(255, 255, 255, 0.08)';

                if (itemMii) {
                    itemMii.style.opacity = '1';
                    itemMii.style.borderColor = miiColorBorder;
                    itemMii.style.background = miiColorBg;
                }
                if (itemBin) {
                    itemBin.style.opacity = '0.2';
                    itemBin.style.borderColor = 'rgba(255,255,255,0.04)';
                    itemBin.style.background = 'rgba(0,0,0,0.15)';
                }
            } 
            else if (phase === 2) {
                // Focus: BIN (First 6 digits)
                if (numMii) {
                    numMii.style.color = binColor;
                    numMii.style.background = binColorBg;
                    numMii.style.boxShadow = `0 0 10px ${binColorGlow}`;
                }
                if (numBin) {
                    numBin.style.color = binColor;
                    numBin.style.background = binColorBg;
                    numBin.style.boxShadow = `0 0 10px ${binColorGlow}`;
                }
                if (numRest) numRest.style.color = 'rgba(255, 255, 255, 0.08)';

                if (itemMii) {
                    itemMii.style.opacity = '0.4';
                    itemMii.style.borderColor = 'rgba(255,255,255,0.04)';
                    itemMii.style.background = 'rgba(0,0,0,0.15)';
                }
                if (itemBin) {
                    itemBin.style.opacity = '1';
                    itemBin.style.borderColor = binColorBorder;
                    itemBin.style.background = binColorBg;
                }
            } 
            else {
                // Final: Show rest of the numbers lighting up for Luhn check
                if (numMii) {
                    numMii.style.color = 'var(--luhn-text)';
                    numMii.style.background = 'transparent';
                    numMii.style.boxShadow = 'none';
                }
                if (numBin) {
                    numBin.style.color = 'var(--luhn-text)';
                    numBin.style.background = 'transparent';
                    numBin.style.boxShadow = 'none';
                }
                if (numRest) {
                    numRest.style.color = 'var(--luhn-text)';
                    numRest.style.textShadow = '0 0 5px rgba(255,255,255,0.3)';
                }

                if (itemMii) {
                    itemMii.style.opacity = '1';
                    itemMii.style.borderColor = 'rgba(255,255,255,0.08)';
                    itemMii.style.background = 'rgba(0,0,0,0.15)';
                }
                if (itemBin) {
                    itemBin.style.opacity = '1';
                    itemBin.style.borderColor = 'rgba(255,255,255,0.08)';
                    itemBin.style.background = 'rgba(0,0,0,0.15)';
                }
            }
        }
        else if (slideId === 'slide_luhn_2') {
            const numbers = [9, 7, 0, 4, 3, 6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const calculationsSteps = [
                { label: "Chữ số thứ 16", val: 9, doubled: true, calc: "9 × 2 = 18 ➔ 18 - 9 = 9" },
                { label: "Chữ số thứ 15", val: 7, doubled: false, calc: "Giữ nguyên ➔ 7" },
                { label: "Chữ số thứ 14", val: 0, doubled: true, calc: "0 × 2 = 0 ➔ 0" },
                { label: "Chữ số thứ 13", val: 4, doubled: false, calc: "Giữ nguyên ➔ 4" },
                { label: "Chữ số thứ 12", val: 3, doubled: true, calc: "3 × 2 = 6 ➔ 6" },
                { label: "Chữ số thứ 11", val: 6, doubled: false, calc: "Giữ nguyên ➔ 6" },
                { label: "Chữ số thứ 10", val: 1, doubled: true, calc: "1 × 2 = 2 ➔ 2" },
                { label: "Chữ số thứ 9", val: 2, doubled: false, calc: "Giữ nguyên ➔ 2" },
                { label: "Chữ số thứ 8", val: 3, doubled: true, calc: "3 × 2 = 6 ➔ 6" },
                { label: "Chữ số thứ 7", val: 4, doubled: false, calc: "Giữ nguyên ➔ 4" },
                { label: "Chữ số thứ 6", val: 5, doubled: true, calc: "5 × 2 = 10 ➔ 10 - 9 = 1" },
                { label: "Chữ số thứ 5", val: 6, doubled: false, calc: "Giữ nguyên ➔ 6" },
                { label: "Chữ số thứ 4", val: 7, doubled: true, calc: "7 × 2 = 14 ➔ 14 - 9 = 5" },
                { label: "Chữ số thứ 3", val: 8, doubled: false, calc: "Giữ nguyên ➔ 8" },
                { label: "Chữ số thứ 2", val: 9, doubled: true, calc: "9 × 2 = 18 ➔ 18 - 9 = 9" },
                { label: "Chữ số thứ 1", val: 0, doubled: false, calc: "Giữ nguyên ➔ 0" }
            ];

            let activeIndex = -1;
            numbers.forEach((num, i) => {
                const origBox = canvas.querySelector(`#v31-orig-box-${i}`);
                const arrowItem = canvas.querySelector(`#v31-arrow-${i}`);
                const calcBox = canvas.querySelector(`#v31-calc-box-${i}`);

                const digitPos = 16 - i;
                const isSecondDigitFromRight = (digitPos % 2 === 0);

                const threshold = (16 - digitPos) / 16; 
                const progressScale = progress * 1.1;

                if (progressScale >= threshold) {
                    activeIndex = i;
                    const cls = isSecondDigitFromRight ? "double-active" : "active";
                    if (origBox) origBox.className = `v31-luhn-digit-box original ${cls}`;
                    if (arrowItem) arrowItem.className = `v31-luhn-arrow-item ${cls}`;
                    if (calcBox) {
                        calcBox.className = `v31-luhn-digit-box calculated ${cls}`;
                        if (isSecondDigitFromRight) {
                            const db = num * 2;
                            const res = db > 9 ? (db - 9) : db;
                            calcBox.textContent = res;
                        } else {
                            calcBox.textContent = num;
                        }
                    }
                } else {
                    if (origBox) origBox.className = "v31-luhn-digit-box original";
                    if (arrowItem) arrowItem.className = "v31-luhn-arrow-item";
                    if (calcBox) {
                        calcBox.className = "v31-luhn-digit-box calculated";
                        calcBox.textContent = "?";
                    }
                }
            });

            // Cập nhật ô to hiển thị phép tính tương tác thời gian thực
            const detailLabel = canvas.querySelector('#v31-calc-detail-label');
            const detailStep = canvas.querySelector('#v31-calc-detail-step');
            const detailsCard = canvas.querySelector('#v31-luhn-calc-details-card');

            if (activeIndex === -1) {
                if (detailLabel) detailLabel.innerHTML = '<span>Bắt đầu quét (từ phải sang)...</span>';
                if (detailStep) detailStep.textContent = 'Đang đợi dữ liệu...';
                if (detailsCard) detailsCard.style.borderColor = 'rgba(139, 92, 246, 0.2)';
            } else if (progress >= 0.95) {
                if (detailLabel) detailLabel.innerHTML = '<span style="color:var(--luhn-green);font-weight:bold;">HOÀN TẤT QUÉT</span>';
                if (detailStep) detailStep.innerHTML = '<span style="color:var(--luhn-green);">Cộng tất cả các chữ số mới ➔ Tính Tổng!</span>';
                if (detailsCard) detailsCard.style.borderColor = 'var(--luhn-green-glow)';
            } else {
                const step = calculationsSteps[activeIndex];
                if (step) {
                    if (step.doubled) {
                        if (detailLabel) {
                            detailLabel.innerHTML = `<span style="color:var(--luhn-orange);font-weight:bold;">Chữ số thứ ${16 - activeIndex} (Nhân đôi): ${step.val}</span>`;
                        }
                        if (detailStep) {
                            detailStep.innerHTML = `<span style="color:var(--luhn-orange);">${step.calc}</span>`;
                        }
                        if (detailsCard) detailsCard.style.borderColor = 'var(--luhn-orange-glow)';
                    } else {
                        if (detailLabel) {
                            detailLabel.innerHTML = `<span style="color:var(--luhn-purple);font-weight:bold;">Chữ số thứ ${16 - activeIndex} (Giữ nguyên): ${step.val}</span>`;
                        }
                        if (detailStep) {
                            detailStep.innerHTML = `<span style="color:var(--luhn-purple);">${step.calc}</span>`;
                        }
                        if (detailsCard) detailsCard.style.borderColor = 'var(--luhn-purple-glow)';
                    }
                }
            }
        }
        else if (slideId === 'slide_luhn_3') {
            const sumDisplay = canvas.querySelector('#v31-sum-display');
            const modDisplay = canvas.querySelector('#v31-mod-display');
            const validityStatus = canvas.querySelector('#v31-validity-status');
            const helperTip = canvas.querySelector('#v31-luhn-helper-tip');
            const formula = canvas.querySelector('#v31-sum-formula');

            if (progress < 0.5) {
                // Show invalid sum calculation (75)
                if (sumDisplay) {
                    if (sumDisplay.textContent !== "75") {
                        sumDisplay.textContent = "75";
                        sumDisplay.classList.add('v31-number-pulse');
                        setTimeout(() => sumDisplay.classList.remove('v31-number-pulse'), 500);
                    }
                }
                if (modDisplay) {
                    if (modDisplay.textContent !== "5") {
                        modDisplay.textContent = "5";
                        modDisplay.style.color = "var(--luhn-red)";
                        modDisplay.classList.add('v31-number-pulse');
                        setTimeout(() => modDisplay.classList.remove('v31-number-pulse'), 500);
                    }
                }
                if (validityStatus) {
                    validityStatus.innerHTML = "❌ Số thẻ không thể tồn tại (Không chia hết cho 10)";
                    validityStatus.style.color = "var(--luhn-red)";
                }
                if (formula) {
                    formula.textContent = "Sum = 9 + 7 + 0 + 4 + 6 + 6 + 2 + 2 + 6 + 4 + 1 + 6 + 5 + 8 + 9 + 0 = 75";
                }
            } else {
                // Transition to valid sum calculation (80)
                if (sumDisplay) {
                    if (sumDisplay.textContent !== "80") {
                        sumDisplay.textContent = "80";
                        sumDisplay.classList.add('v31-number-pulse');
                        setTimeout(() => sumDisplay.classList.remove('v31-number-pulse'), 500);
                    }
                }
                if (modDisplay) {
                    if (modDisplay.textContent !== "0") {
                        modDisplay.textContent = "0";
                        modDisplay.style.color = "var(--luhn-green)";
                        modDisplay.classList.add('v31-number-pulse');
                        setTimeout(() => modDisplay.classList.remove('v31-number-pulse'), 500);
                    }
                }
                if (validityStatus) {
                    validityStatus.innerHTML = "✓ Số thẻ hợp lệ (Chia hết cho 10!)";
                    validityStatus.style.color = "var(--luhn-green)";
                }
                if (formula) {
                    formula.innerHTML = "Sum = 9 + 7 + 0 + 4 + 6 + 6 + 2 + 2 + 6 + 4 + 1 + 6 + 5 + 8 + 9 + <span style='color:var(--luhn-green);font-weight:bold;'>5</span> = 80";
                }
            }
        }
        else if (slideId === 'slide_luhn_4') {
            const valEmail = canvas.querySelector('#v31-val-email');
            const inputEmail = canvas.querySelector('#v31-input-email');
            const statusEmail = canvas.querySelector('#v31-status-email');

            const valPhone = canvas.querySelector('#v31-val-phone');
            const inputPhone = canvas.querySelector('#v31-input-phone');
            const statusPhone = canvas.querySelector('#v31-status-phone');

            const valCccd = canvas.querySelector('#v31-val-cccd');
            const inputCccd = canvas.querySelector('#v31-input-cccd');
            const statusCccd = canvas.querySelector('#v31-status-cccd');

            const valPassword = canvas.querySelector('#v31-val-password');
            const inputPassword = canvas.querySelector('#v31-input-password');
            const statusPassword = canvas.querySelector('#v31-status-password');

            // Text typing simulation function
            const typeText = (full, startProg, endProg, currentProg) => {
                if (currentProg < startProg) return "";
                if (currentProg >= endProg) return full;
                const t = (currentProg - startProg) / (endProg - startProg);
                const chars = Math.floor(t * full.length);
                return full.substring(0, chars) + '<span class="v31-input-cursor"></span>';
            };

            // Phase-based validation correction animation
            // Phase 1: Email (0.0 to 0.25)
            if (progress < 0.18) {
                if (valEmail) valEmail.className = "v31-val-card invalid";
                const currentText = typeText("bob#domain.com", 0.0, 0.12, progress);
                if (inputEmail) inputEmail.innerHTML = currentText || "&nbsp;";
                if (statusEmail) {
                    statusEmail.textContent = "INVALID";
                    statusEmail.className = "v31-val-status invalid";
                }
            } else {
                if (valEmail) valEmail.className = "v31-val-card valid";
                const currentText = typeText("bob@domain.com", 0.18, 0.28, progress);
                if (inputEmail) inputEmail.innerHTML = currentText;
                if (statusEmail) {
                    statusEmail.textContent = "VALID";
                    statusEmail.className = "v31-val-status valid";
                }
            }

            // Phase 2: Phone (0.25 to 0.45)
            if (progress < 0.38) {
                if (valPhone) valPhone.className = "v31-val-card invalid";
                const currentText = typeText("09123", 0.22, 0.32, progress);
                if (inputPhone) inputPhone.innerHTML = currentText || "&nbsp;";
                if (statusPhone) {
                    statusPhone.textContent = "TOO SHORT";
                    statusPhone.className = "v31-val-status invalid";
                }
            } else {
                if (valPhone) valPhone.className = "v31-val-card valid";
                const currentText = typeText("0912345678", 0.38, 0.48, progress);
                if (inputPhone) inputPhone.innerHTML = currentText;
                if (statusPhone) {
                    statusPhone.textContent = "VALID";
                    statusPhone.className = "v31-val-status valid";
                }
            }

            // Phase 3: CCCD (0.45 to 0.65)
            if (progress < 0.58) {
                if (valCccd) valCccd.className = "v31-val-card invalid";
                const currentText = typeText("123456", 0.42, 0.52, progress);
                if (inputCccd) inputCccd.innerHTML = currentText || "&nbsp;";
                if (statusCccd) {
                    statusCccd.textContent = "TOO SHORT";
                    statusCccd.className = "v31-val-status invalid";
                }
            } else {
                if (valCccd) valCccd.className = "v31-val-card valid";
                const currentText = typeText("012345678901", 0.58, 0.68, progress);
                if (inputCccd) inputCccd.innerHTML = currentText;
                if (statusCccd) {
                    statusCccd.textContent = "VALID";
                    statusCccd.className = "v31-val-status valid";
                }
            }

            // Phase 4: Password (0.65 to 0.85)
            if (progress < 0.78) {
                if (valPassword) valPassword.className = "v31-val-card invalid";
                const currentText = typeText("abc", 0.62, 0.72, progress);
                if (inputPassword) inputPassword.innerHTML = currentText || "&nbsp;";
                if (statusPassword) {
                    statusPassword.textContent = "WEAK";
                    statusPassword.className = "v31-val-status invalid";
                }
            } else {
                if (valPassword) valPassword.className = "v31-val-card valid";
                const currentText = typeText("abc@123456", 0.78, 0.88, progress);
                if (inputPassword) inputPassword.innerHTML = currentText;
                if (statusPassword) {
                    statusPassword.textContent = "SECURE";
                    statusPassword.className = "v31-val-status valid";
                }
            }
        }
        else if (slideId === 'slide_luhn_5') {
            const scanline = canvas.querySelector('#v31-outro-scanline');
            if (scanline) {
                scanline.style.left = `${-100 + progress * 250}%`;
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video31',
        topic: 'Thuật toán Luhn',
        episodeNum: 31,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video31 Plugin] Loaded: LUHN ALGORITHM 5 slides ready.');
})();
