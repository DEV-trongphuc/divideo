/**
 * Video 50: The Magic of QR Codes in Cafe Payments
 * Plugin file containing interactive animations, scans, and parsing steps.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_qr_intro: [
            { text: 'quét', start: 1.0, end: 5.0, class: 'active-good' }
        ],
        slide_qr_definition: [
            { text: 'hai chiều', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'bảy nghìn', start: 8.0, end: 14.0, class: 'active-gold' }
        ],
        slide_qr_anatomy: [
            { text: 'định vị', start: 1.5, end: 8.0, class: 'active-good' }
        ],
        slide_qr_static_dynamic: [
            { text: 'tĩnh', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: 'động', start: 7.0, end: 14.0, class: 'active-good' }
        ],
        slide_qr_emvco_payload: [
            { text: 'chuỗi ký tự', start: 1.0, end: 8.0, class: 'active-gold' }
        ],
        slide_qr_parsing: [
            { text: 'bóc tách', start: 1.0, end: 8.0, class: 'active-good' }
        ],
        slide_qr_reed_solomon: [
            { text: 'Reed Solomon', start: 1.0, end: 8.0, class: 'active-good' },
            { text: 'ba mươi phần trăm', start: 8.0, end: 15.0, class: 'active-gold' }
        ],
        slide_qr_security_risk: [
            { text: 'dán đè', start: 1.0, end: 8.0, class: 'active-bad' },
            { text: 'chủ tài khoản', start: 8.0, end: 15.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_qr_intro', 'slide_qr_definition', 'slide_qr_anatomy', 'slide_qr_static_dynamic',
        'slide_qr_emvco_payload', 'slide_qr_parsing', 'slide_qr_reed_solomon', 'slide_qr_security_risk',
        'slide_qr_outro'
    ];

    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function sceneWrap(inner, absolute) {
        const absHtml = absolute || '';
        return `<div class="v50-zoom-container">${absHtml}<div class="v50-scene-content">${inner}</div></div>`;
    }

    // A simple 21x21 binary matrix representing a static QR Code (Version 1)
    const qrMatrix = [
        [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1,0,1,1,1,1,0,0,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0],
        [1,1,0,1,0,1,0,1,1,0,1,1,0,0,1,0,1,0,1,1,0],
        [0,0,1,0,1,0,0,0,0,1,0,1,0,1,1,0,1,1,0,0,1],
        [1,1,0,1,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1,1,0],
        [0,1,0,0,1,0,0,1,1,1,0,0,0,1,0,1,0,0,1,0,1],
        [1,0,1,0,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,0,1,1,1,0,0,1,0,1,0],
        [1,0,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1,0,1,1,0],
        [1,0,1,1,1,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0,1],
        [1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,1,1,0,1,1,0],
        [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,0],
        [1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,1,0,1,1],
        [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,1,0,1,0,1]
    ];

    function makeQRHTML(mode, isDamaged, isCorrected) {
        let html = '<div class="v50-qr-code">';
        for (let r = 0; r < 21; r++) {
            for (let c = 0; c < 21; c++) {
                const val = qrMatrix[r][c];
                const classes = ['v50-qr-pixel'];
                if (val === 1) classes.push('black');
                
                // Highlight modules on Anatomy slide
                if (mode === 'anatomy') {
                    if (r <= 6 && c <= 6) classes.push('finder');
                    else if (r <= 6 && c >= 14) classes.push('finder');
                    else if (r >= 14 && c <= 6) classes.push('finder');
                    else if (r >= 14 && r <= 18 && c >= 14 && c <= 18) classes.push('alignment');
                    else if ((r === 8 && c <= 8) || (c === 8 && r <= 8)) classes.push('version-info');
                }
                
                html += `<div class="${classes.join(' ')}" data-row="${r}" data-col="${c}"></div>`;
            }
        }
        
        if (isDamaged) {
            const extraClass = isCorrected ? ' corrected' : '';
            html += `<div class="v50-damaged-patch${extraClass}" style="left: 45px; top: 40px; width: 35px; height: 35px;"></div>`;
        }
        
        html += '<div class="v50-scan-line" id="v50-scan-line-el"></div>';
        html += '</div>';
        return html;
    }

    function phoneMockHTML(id, titleText, customScreenHTML) {
        const screenContent = customScreenHTML || `
            <div class="v50-scan-box-wrap" style="width: 100px; height: 100px; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 8px; position: relative; display:flex; justify-content:center; align-items:center;">
                <div class="v50-scan-corner tl" style="position: absolute; top: -2px; left: -2px; width: 12px; height: 12px; border-top: 3px solid var(--qr-green); border-left: 3px solid var(--qr-green);"></div>
                <div class="v50-scan-corner tr" style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; border-top: 3px solid var(--qr-green); border-right: 3px solid var(--qr-green);"></div>
                <div class="v50-scan-corner bl" style="position: absolute; bottom: -2px; left: -2px; width: 12px; height: 12px; border-bottom: 3px solid var(--qr-green); border-left: 3px solid var(--qr-green);"></div>
                <div class="v50-scan-corner br" style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; border-bottom: 3px solid var(--qr-green); border-right: 3px solid var(--qr-green);"></div>
                <div class="v50-scan-line scanning" style="animation-duration: 2s;"></div>
                <i data-lucide="scan" style="width:24px;height:24px;color:rgba(255,255,255,0.25);"></i>
            </div>
        `;
        return `
        <div class="v50-phone" id="${id}">
            <div class="v50-phone-title">
                <span class="v50-online-dot"></span>
                <span>${titleText}</span>
            </div>
            <div class="v50-phone-screen">
                ${screenContent}
            </div>
        </div>`;
    }

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
            canvas.setAttribute('data-paths-drawn', 'false');
        }
        if (!needsTemplate) return;

        if (slideId === 'slide_qr_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-scene-row">
                    <div class="v50-coffee-cup-wrap">
                        <div class="v50-cup-steam s1"></div>
                        <div class="v50-cup-steam s2"></div>
                        <div class="v50-cup-steam s3"></div>
                        <div class="v50-coffee-cup">
                            <div class="v50-cup-sleeve"></div>
                            <div class="v50-cup-handle"></div>
                            <div class="v50-cup-lid"></div>
                        </div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v50-qr-stand" id="v50-intro-stand">
                            <div class="v50-qr-stand-logo">VIETQR</div>
                            <div class="v50-qr-wrapper">
                                ${makeQRHTML('normal', false, false)}
                            </div>
                        </div>
                        <div class="v50-qr-stand-base"></div>
                    </div>
                    
                    ${phoneMockHTML('v50-intro-phone', 'Quét mã VietQR')}
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="scan" style="width:12px;height:12px;"></i> camera scanning</span>
                    <span style="color:#fff;" id="v50-intro-status">Đang quét mã QR...</span>
                </div>
            `, null, 'green-tint');
            initIcons();
        }
        else if (slideId === 'slide_qr_definition') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-compare-row">
                    <div class="v50-compare-col" id="v50-def-col-1">
                        <div class="v50-barcode-wrap">
                            <div class="v50-barcode-lines">
                                ${Array.from({length: 24}, (_, i) => `<div class="v50-barcode-line ${i % 5 === 0 ? 'w2' : (i % 7 === 0 ? 'w3' : '')} ${i % 8 === 0 ? 'space' : ''}"></div>`).join('')}
                            </div>
                            <div style="font-size:5.5px; font-family:monospace; color:#000; letter-spacing:0.8px;">8931234567890</div>
                        </div>
                        <span class="v50-compare-title">Mã vạch 1D truyền thống</span>
                        <span class="v50-compare-desc">Chỉ lưu tối đa 20 chữ số.<br>Chỉ mở rộng theo chiều ngang.</span>
                    </div>
                    <div class="v50-compare-col" id="v50-def-col-2">
                        <div class="v50-qr-wrapper" style="padding: 4px;">
                            ${makeQRHTML('normal', false, false)}
                        </div>
                        <span class="v50-compare-title">Mã QR 2D ma trận</span>
                        <span class="v50-compare-desc">Lưu tới 7089 chữ số.<br>Mở rộng hai chiều (dọc & ngang).</span>
                    </div>
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="database" style="width:12px;height:12px;"></i> CAPACITY COMPARE</span>
                    <span style="color:#fff;" id="v50-def-status">QR Code lưu dữ liệu gấp hàng trăm lần mã vạch thô.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_anatomy') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-scene-row" style="gap:95px; position:relative; justify-content:center; align-items:center; margin-top: 15px;">
                    <div class="v50-qr-wrapper" style="padding: 8px; transform: scale(1.6); transform-origin: center;">
                        ${makeQRHTML('anatomy', false, false)}
                    </div>
                    <div class="v50-anatomy-legend" style="display:flex; flex-direction:column; gap:16px; font-family:sans-serif; text-align:left;">
                        <div style="display:flex; align-items:center; gap:10px; font-size:14px;" id="v50-legend-0">
                            <span style="width:14px; height:14px; background:var(--qr-cyan); border-radius:3px; flex-shrink:0;"></span>
                            <span style="font-weight:800; color:#fff;">Finder (Định vị góc)</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px; font-size:14px;" id="v50-legend-1">
                            <span style="width:14px; height:14px; background:var(--qr-gold); border-radius:3px; flex-shrink:0;"></span>
                            <span style="font-weight:800; color:#fff;">Alignment (Căn chỉnh lệch)</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px; font-size:14px;" id="v50-legend-2">
                            <span style="width:14px; height:14px; background:var(--qr-purple); border-radius:3px; flex-shrink:0;"></span>
                            <span style="font-weight:800; color:#fff;">Format/Version (Phiên bản)</span>
                        </div>
                    </div>
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="layers" style="width:12px;height:12px;"></i> QR ANATOMY</span>
                    <span style="color:#fff;" id="v50-anatomy-status">Ba ô định vị giúp quét chuẩn kể cả khi cầm nghiêng điện thoại.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_static_dynamic') {
            const staticScreen = `
                <div class="v50-phone-bill">
                    <span class="v50-bank-logo"><i data-lucide="landmark" style="width:10px;height:10px;"></i> SMART BANK</span>
                    <div class="v50-bill-box">
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Người nhận</span>
                            <span class="v50-bill-value">CAFE CẦU ĐẤT</span>
                        </div>
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Nhập số tiền</span>
                            <div style="display:flex; align-items:center; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 3px 6px; background: rgba(0,0,0,0.3); margin-top:2px;">
                                <span style="font-size:11px; color:var(--qr-gold); font-family: 'Fira Code', monospace; flex:1; font-weight:bold; text-align:left;" id="v50-static-amt-input">_</span>
                                <span style="font-size:8px; color:rgba(255,255,255,0.5); font-weight:bold;">VND</span>
                            </div>
                        </div>
                    </div>
                    <button class="v50-bill-btn" id="v50-static-btn" style="background:#475569; box-shadow:none; pointer-events:none;">Nhập tiền...</button>
                </div>
            `;
            const dynamicScreen = `
                <div class="v50-phone-bill">
                    <span class="v50-bank-logo"><i data-lucide="landmark" style="width:10px;height:10px;"></i> SMART BANK</span>
                    <div class="v50-bill-box">
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Người nhận</span>
                            <span class="v50-bill-value">CAFE CẦU ĐẤT</span>
                        </div>
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Số tiền hóa đơn</span>
                            <span class="v50-bill-value large" id="v50-dynamic-amt-val">45,000</span>
                        </div>
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Nội dung</span>
                            <span class="v50-bill-value" style="font-size:8.5px; font-family:'Fira Code', monospace; color:var(--qr-cyan);">HD10294</span>
                        </div>
                    </div>
                    <button class="v50-bill-btn" id="v50-dynamic-btn">Xác nhận chuyển ✓</button>
                </div>
            `;
            canvas.innerHTML = sceneWrap(`
                <div class="v50-phones-row">
                    <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                        <span style="font-size:9px; font-weight:800; color:var(--qr-text-muted);">QR TĨNH (Static)</span>
                        ${phoneMockHTML('v50-phone-static', 'Thanh Toán VietQR', staticScreen)}
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                        <span style="font-size:9px; font-weight:800; color:var(--qr-cyan);">QR ĐỘNG (Dynamic)</span>
                        ${phoneMockHTML('v50-phone-dynamic', 'Thanh Toán VietQR', dynamicScreen)}
                    </div>
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="toggle-left" style="width:12px;height:12px;"></i> STATIC VS DYNAMIC</span>
                    <span style="color:#fff;" id="v50-sd-status">QR tĩnh cần tự nhập tiền, QR động tự điền sẵn tiền hóa đơn.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_emvco_payload') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-parse-container">
                    <span style="font-size:9.5px; font-weight:800; color:var(--qr-text-muted); text-align:left; text-transform:uppercase; font-family:sans-serif; letter-spacing:0.5px;">VietQR Raw String (EMVCo Standard)</span>
                    <div class="v50-raw-string-box" id="v50-emvco-raw">
                        00020101021238570010A0000007270128001897042300069704235406450005802VN62150811HD1029482035303704
                    </div>
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="file-code" style="width:12px;height:12px;"></i> EMVCO PAYLOAD</span>
                    <span style="color:#fff;" id="v50-emvco-status">Mã QR thực chất chỉ lưu một chuỗi văn bản thô theo chuẩn EMVCo.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_parsing') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-parse-container">
                    <div class="v50-raw-string-box" id="v50-parse-raw">
                        00020101021238570010A0000007270128001897042300069704235406450005802VN62150811HD1029482035303704
                    </div>
                    <div class="v50-parse-table">
                        <div class="v50-parse-row" id="v50-parse-row-0">
                            <span class="v50-parse-label">Mã Người Nhận (Tag 38)</span>
                            <span class="v50-parse-value" style="color:var(--qr-blue);">Vietcombank | 970423...</span>
                        </div>
                        <div class="v50-parse-row" id="v50-parse-row-1">
                            <span class="v50-parse-label">Số Tiền (Tag 54)</span>
                            <span class="v50-parse-value" style="color:var(--qr-green);">45,000 VND</span>
                        </div>
                        <div class="v50-parse-row" id="v50-parse-row-2">
                            <span class="v50-parse-label">Nội Dung / Mã HĐ (Tag 62)</span>
                            <span class="v50-parse-value" style="color:var(--qr-gold);">HD10294</span>
                        </div>
                    </div>
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="split" style="width:12px;height:12px;"></i> STRING PARSING</span>
                    <span style="color:#fff;" id="v50-parse-status">App ngân hàng bóc tách chuỗi thô thành các trường dữ liệu.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_reed_solomon') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-scene-row">
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v50-qr-stand">
                            <div class="v50-qr-stand-logo">REED-SOLOMON</div>
                            <div class="v50-qr-wrapper" style="padding: 6px;">
                                ${makeQRHTML('normal', true, false)}
                            </div>
                        </div>
                        <div class="v50-qr-stand-base"></div>
                    </div>
                    ${phoneMockHTML('v50-rs-phone', 'Quét VietQR')}
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> ERROR CORRECTION</span>
                    <span style="color:#fff;" id="v50-rs-status">Nhờ thuật toán Reed-Solomon, mã bị bẩn 30% vẫn quét bình thường.</span>
                </div>
            `);
            initIcons();
        }
        else if (slideId === 'slide_qr_security_risk') {
            const secureScreen = `
                <div class="v50-phone-bill">
                    <span class="v50-bank-logo"><i data-lucide="landmark" style="width:10px;height:10px;"></i> SMART BANK</span>
                    <div class="v50-bill-box">
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Người nhận</span>
                            <span class="v50-bill-value" style="color:var(--qr-red);" id="v50-sec-recipient">CAFE CẦU ĐẤT</span>
                        </div>
                        <div class="v50-bill-item">
                            <span class="v50-bill-label">Số tiền</span>
                            <span class="v50-bill-value large" style="color:var(--qr-red);">45,000</span>
                        </div>
                    </div>
                    <div class="v50-alert-popup" id="v50-sec-alert">
                        <i data-lucide="alert-triangle" style="width:18px;height:18px;color:var(--qr-red);flex-shrink:0;"></i>
                        <div class="v50-alert-text">
                            <span class="v50-alert-title">CHỦ TÀI KHOẢN KHÔNG KHỚP!</span>
                            <span class="v50-alert-desc">Người nhận thực tế: NGUYỄN VĂN A</span>
                        </div>
                    </div>
                    <button class="v50-bill-btn" style="background:var(--qr-red); box-shadow:none; margin-top:auto;">Hủy thanh toán ✗</button>
                </div>
            `;
            canvas.innerHTML = sceneWrap(`
                <div class="v50-scene-row">
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v50-qr-stand" id="v50-sec-stand" style="position:relative;">
                            <div class="v50-qr-stand-logo">VIETQR</div>
                            <div class="v50-qr-wrapper">
                                ${makeQRHTML('normal', false, false)}
                            </div>
                            <div id="v50-sec-hacker-tag" style="position:absolute; top:45px; left:-5px; background:rgba(239,68,68,0.95); border:1px solid #fff; border-radius:4px; padding:2px 5px; font-size:7px; color:#fff; font-weight:900; transform:rotate(-15deg); opacity:0; transition:all 0.4s ease; z-index:15; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
                                ⚠️ TRÁO MÃ QR
                            </div>
                        </div>
                        <div class="v50-qr-stand-base"></div>
                    </div>
                    ${phoneMockHTML('v50-sec-phone', 'Cảnh Báo VietQR', secureScreen)}
                </div>
                <div class="v50-glass-card glow-red v50-status-card">
                    <span class="v50-status-badge red"><i data-lucide="shield-alert" style="width:12px;height:12px;"></i> SECURITY WARNING</span>
                    <span style="color:var(--qr-red);" id="v50-security-status">Cảnh giác: Kẻ xấu có thể dán đè mã QR khác để chiếm đoạt tiền.</span>
                </div>
                `, null);
            initIcons();
        }
        else if (slideId === 'slide_qr_outro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v50-scene-row" style="gap:40px; margin-top: 10px;">
                    <!-- QR Stand on the left -->
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="v50-qr-stand" style="transform: scale(1.05);">
                            <div class="v50-qr-stand-logo" style="color:var(--qr-cyan); border-color:rgba(6,182,212,0.3); background:rgba(6,182,212,0.05);">FOLLOW ME</div>
                            <div class="v50-qr-wrapper" style="padding: 6px;">
                                ${makeQRHTML('normal', true, false)}
                            </div>
                        </div>
                        <div class="v50-qr-stand-base"></div>
                    </div>
                    <!-- Phone mock on the right simulating successful payment -->
                    ${phoneMockHTML('v50-outro-phone', 'Cảm ơn bạn!', `
                        <div class="v50-phone-bill" style="align-items:center; justify-content:center; gap:16px; padding-top:20px;">
                            <div style="width:45px; height:45px; border-radius:50%; background:rgba(16,185,129,0.15); border:2.5px solid var(--qr-green); display:flex; align-items:center; justify-content:center; color:var(--qr-green); box-shadow:0 0 15px rgba(16,185,129,0.3);">
                                <i data-lucide="check" style="width:24px; height:24px; stroke-width:3;"></i>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <span style="font-size:12px; font-weight:900; color:#fff;">THÀNH CÔNG</span>
                                <span style="font-size:8px; color:var(--qr-text-muted);">Đã chuyển tới Cafe Cầu Đất</span>
                            </div>
                            <div style="width:100%; border-top:1px dashed rgba(255,255,255,0.1); margin:4px 0;"></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <span style="font-size:7px; color:var(--qr-text-muted);">Đồng hành cùng</span>
                                <span style="font-size:10px; font-weight:900; color:var(--qr-cyan);">@Turnio.dev</span>
                            </div>
                        </div>
                    `)}
                </div>
                <div class="v50-glass-card glow-green v50-status-card">
                    <span class="v50-status-badge green"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> VIETQR BILLING</span>
                    <span style="color:#fff;" id="v50-outro-status">Thanh toán nhanh chóng, chính xác và bảo mật cao.</span>
                </div>`, null);
            initIcons();
        }
    }

    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_qr_intro') {
            const scanLine = canvas.querySelector('#v50-scan-line-el');
            const status = canvas.querySelector('#v50-intro-status');
            const phoneScreen = canvas.querySelector('#v50-intro-phone .v50-phone-screen');
            
            if (scanLine) {
                scanLine.style.opacity = 1;
                // Move scan line up and down
                scanLine.style.top = `${(progress * 5 % 1) * 100}%`;
            }

            if (progress < 0.5) {
                if (status) status.textContent = 'Đang quét mã QR VietQR...';
            } else {
                if (status) {
                    status.textContent = '✓ Quét thành công — Đang trích xuất hóa đơn';
                    status.style.color = 'var(--qr-green)';
                }
                if (phoneScreen && !phoneScreen.querySelector('.v50-phone-bill')) {
                    phoneScreen.innerHTML = `
                        <div class="v50-phone-bill" style="animation: v50-shake 0.3s ease;">
                            <span class="v50-bank-logo"><i data-lucide="landmark" style="width:10px;height:10px;"></i> SMART BANK</span>
                            <div class="v50-bill-box">
                                <div class="v50-bill-item">
                                    <span class="v50-bill-label">Người nhận</span>
                                    <span class="v50-bill-value">CAFE CẦU ĐẤT</span>
                                </div>
                                <div class="v50-bill-item">
                                    <span class="v50-bill-label">Số tiền</span>
                                    <span class="v50-bill-value large">45,000</span>
                                </div>
                            </div>
                            <button class="v50-bill-btn" style="margin-top:auto;">Xác nhận chuyển ✓</button>
                        </div>
                    `;
                    initIcons();
                }
            }
        }
        else if (slideId === 'slide_qr_definition') {
            const col1 = canvas.querySelector('#v50-def-col-1');
            const col2 = canvas.querySelector('#v50-def-col-2');
            const status = canvas.querySelector('#v50-def-status');

            if (progress < 0.45) {
                if (col1) col1.classList.add('active');
                if (col2) col2.classList.remove('active');
                if (status) status.textContent = 'Mã vạch 1D: dung lượng thấp, chỉ đọc theo chiều ngang.';
            } else {
                if (col1) col1.classList.remove('active');
                if (col2) col2.classList.add('active');
                if (status) status.textContent = 'Mã QR 2D: dung lượng lớn gấp hàng trăm lần, đọc hai chiều dọc ngang.';
            }
        }
        else if (slideId === 'slide_qr_anatomy') {
            const legend0 = canvas.querySelector('#v50-legend-0');
            const legend1 = canvas.querySelector('#v50-legend-1');
            const legend2 = canvas.querySelector('#v50-legend-2');
            const status = canvas.querySelector('#v50-anatomy-status');
            const pixels = canvas.querySelectorAll('.v50-qr-pixel');

            // Reset pixel scaling
            pixels.forEach(p => p.style.transform = 'scale(1)');

            if (progress < 0.35) {
                if (legend0) { legend0.style.transform = 'scale(1.08)'; legend0.style.opacity = '1'; }
                if (legend1) { legend1.style.transform = 'scale(1)'; legend1.style.opacity = '0.4'; }
                if (legend2) { legend2.style.transform = 'scale(1)'; legend2.style.opacity = '0.4'; }
                if (status) status.textContent = 'Finder Pattern: Ô định vị giúp camera xoay đúng hướng của mã.';
                
                // Pulse finder pixels
                pixels.forEach(p => {
                    if (p.classList.contains('finder')) p.style.transform = 'scale(1.15)';
                });
            } else if (progress < 0.7) {
                if (legend0) { legend0.style.transform = 'scale(1)'; legend0.style.opacity = '0.4'; }
                if (legend1) { legend1.style.transform = 'scale(1.08)'; legend1.style.opacity = '1'; }
                if (legend2) { legend2.style.transform = 'scale(1)'; legend2.style.opacity = '0.4'; }
                if (status) status.textContent = 'Alignment Pattern: Ô căn chỉnh lệch giúp sửa độ cong vẹo khi quét nghiêng.';
                
                // Pulse alignment pixels
                pixels.forEach(p => {
                    if (p.classList.contains('alignment')) p.style.transform = 'scale(1.15)';
                });
            } else {
                if (legend0) { legend0.style.transform = 'scale(1)'; legend0.style.opacity = '0.4'; }
                if (legend1) { legend1.style.transform = 'scale(1)'; legend1.style.opacity = '0.4'; }
                if (legend2) { legend2.style.transform = 'scale(1.08)'; legend2.style.opacity = '1'; }
                if (status) status.textContent = 'Format/Version: Khai báo phiên bản của mã QR và mức sửa lỗi.';
                
                // Pulse version pixels
                pixels.forEach(p => {
                    if (p.classList.contains('version-info')) p.style.transform = 'scale(1.15)';
                });
            }
        }
        else if (slideId === 'slide_qr_static_dynamic') {
            const staticAmt = canvas.querySelector('#v50-static-amt-input');
            const staticBtn = canvas.querySelector('#v50-static-btn');
            const dynamicBtn = canvas.querySelector('#v50-dynamic-btn');
            const status = canvas.querySelector('#v50-sd-status');

            if (progress < 0.5) {
                // Simulate typing on static QR phone
                const amtStr = '45000';
                const charsTyped = Math.min(amtStr.length, Math.floor(progress * 16));
                if (staticAmt) {
                    staticAmt.textContent = Number(amtStr.substring(0, charsTyped)).toLocaleString();
                    if (charsTyped < amtStr.length) staticAmt.textContent += '|';
                }
                if (staticBtn) {
                    if (charsTyped >= amtStr.length) {
                        staticBtn.textContent = 'Xác nhận chuyển ✓';
                        staticBtn.style.background = 'var(--qr-green)';
                        staticBtn.style.boxShadow = '0 4px 10px rgba(16, 185, 129, 0.3)';
                    } else {
                        staticBtn.textContent = 'Nhập tiền...';
                        staticBtn.style.background = '#475569';
                        staticBtn.style.boxShadow = 'none';
                    }
                }
                if (status) status.textContent = 'QR Tĩnh: Chỉ chứa số tài khoản, bạn buộc phải tự nhập số tiền cần chuyển.';
            } else {
                if (staticAmt) staticAmt.textContent = '45,000';
                if (staticBtn) {
                    staticBtn.textContent = 'Xác nhận chuyển ✓';
                    staticBtn.style.background = 'var(--qr-green)';
                }
                if (status) status.textContent = 'QR Động: Đã có sẵn số tiền & nội dung hóa đơn tự động điền trong app.';
            }
        }
        else if (slideId === 'slide_qr_emvco_payload') {
            const rawBox = canvas.querySelector('#v50-emvco-raw');
            const status = canvas.querySelector('#v50-emvco-status');
            
            // Pulse characters in the raw string box
            if (rawBox) {
                const charLen = rawBox.textContent.trim().length;
                const activeIndex = Math.floor(progress * charLen * 1.5) % charLen;
                const text = rawBox.textContent.trim();
                let highlighted = '';
                for (let i = 0; i < text.length; i++) {
                    if (i === activeIndex) {
                        highlighted += `<span style="color:var(--qr-green); font-weight:bold; font-size:9.5px;">${text[i]}</span>`;
                    } else {
                        highlighted += text[i];
                    }
                }
                rawBox.innerHTML = highlighted;
            }
        }
        else if (slideId === 'slide_qr_parsing') {
            const rawBox = canvas.querySelector('#v50-parse-raw');
            const status = canvas.querySelector('#v50-parse-status');
            
            const r0 = canvas.querySelector('#v50-parse-row-0');
            const r1 = canvas.querySelector('#v50-parse-row-1');
            const r2 = canvas.querySelector('#v50-parse-row-2');

            if (progress < 0.33) {
                if (r0) r0.classList.add('active');
                if (r1) r1.classList.remove('active');
                if (r2) r2.classList.remove('active');
                if (status) status.textContent = 'Bóc tách Tag 38: Lấy thông tin tài khoản người nhận (Vietcombank).';
            } else if (progress < 0.66) {
                if (r0) r0.classList.add('active');
                if (r1) r1.classList.add('active');
                if (r2) r2.classList.remove('active');
                if (status) status.textContent = 'Bóc tách Tag 54: Lấy thông tin số tiền chuyển khoản (45,000 VND).';
            } else {
                if (r0) r0.classList.add('active');
                if (r1) r1.classList.add('active');
                if (r2) r2.classList.add('active');
                if (status) status.textContent = 'Bóc tách Tag 62: Lấy thông tin nội dung/mã hóa đơn (HD10294).';
            }
        }
        else if (slideId === 'slide_qr_reed_solomon') {
            const scanLine = canvas.querySelector('#v50-scan-line-el');
            const patch = canvas.querySelector('.v50-damaged-patch');
            const status = canvas.querySelector('#v50-rs-status');
            const phoneScreen = canvas.querySelector('#v50-rs-phone .v50-phone-screen');

            if (scanLine) {
                scanLine.style.opacity = 1;
                scanLine.style.top = `${(progress * 4 % 1) * 100}%`;
            }

            if (progress < 0.5) {
                if (patch) patch.className = 'v50-damaged-patch';
                if (status) status.textContent = 'Mã QR bị bẩn và hỏng một phần dữ liệu ở góc dưới phải...';
            } else {
                if (patch) patch.className = 'v50-damaged-patch corrected';
                if (status) {
                    status.textContent = '✓ Reed-Solomon tự động sửa lỗi thành công và khôi phục 100% dữ liệu gốc!';
                    status.style.color = 'var(--qr-green)';
                }
                if (phoneScreen && !phoneScreen.querySelector('.v50-phone-bill')) {
                    phoneScreen.innerHTML = `
                        <div class="v50-phone-bill" style="animation: v50-shake 0.3s ease;">
                            <span class="v50-bank-logo"><i data-lucide="landmark" style="width:10px;height:10px;"></i> SMART BANK</span>
                            <div class="v50-bill-box">
                                <div class="v50-bill-item">
                                    <span class="v50-bill-label">Người nhận</span>
                                    <span class="v50-bill-value">CAFE CẦU ĐẤT</span>
                                </div>
                                <div class="v50-bill-item">
                                    <span class="v50-bill-label">Số tiền</span>
                                    <span class="v50-bill-value large">45,000</span>
                                </div>
                            </div>
                            <button class="v50-bill-btn" style="margin-top:auto;">Xác nhận chuyển ✓</button>
                        </div>
                    `;
                    initIcons();
                }
            }
        }
        else if (slideId === 'slide_qr_security_risk') {
            const hackerTag = canvas.querySelector('#v50-sec-hacker-tag');
            const alertPopup = canvas.querySelector('#v50-sec-alert');
            const recipient = canvas.querySelector('#v50-sec-recipient');
            const status = canvas.querySelector('#v50-security-status');

            if (progress < 0.4) {
                if (hackerTag) { hackerTag.style.opacity = '0'; hackerTag.style.transform = 'rotate(-15deg) scale(0.8)'; }
                if (alertPopup) alertPopup.classList.remove('active');
                if (recipient) { recipient.textContent = 'CAFE CẦU ĐẤT'; recipient.style.color = '#fff'; }
                if (status) status.textContent = 'Đang quét mã QR dán tại quầy...';
            } else {
                if (hackerTag) { hackerTag.style.opacity = '1'; hackerTag.style.transform = 'rotate(-15deg) scale(1)'; }
                if (alertPopup) alertPopup.classList.add('active');
                if (recipient) { recipient.textContent = 'NGUYỄN VĂN A (Kẻ gian)'; recipient.style.color = 'var(--qr-red)'; }
                if (status) {
                    status.textContent = '🚨 Cảnh báo tráo mã QR! Hãy luôn đối chiếu tên chủ tài khoản hiển thị trên ứng dụng.';
                    status.style.color = 'var(--qr-red)';
                }
            }
        }
        else if (slideId === 'slide_qr_outro') {
            const status = canvas.querySelector('#v50-outro-status');
            if (status) {
                status.innerHTML = 'Thanh toán nhanh chóng, chính xác và bảo mật cao.';
            }
        }
    }

    window.VideoPlugin = {
        scriptName: 'video50',
        topic: 'Thanh Toán QR',
        episodeNum: 50,
        customSlideIds,
        keywordsData,
        renderGfx,
        updateFrame
    };

    console.log('[Video50 Plugin] Loaded: The Magic of QR Codes.');
})();
