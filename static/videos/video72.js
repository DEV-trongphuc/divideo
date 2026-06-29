/**
 * Video 72: Image Location Privacy (EXIF Metadata)
 * Scaled & Rich Animated Version (Adding laser scans, satellites, alerts, toggle sliders, and settings).
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_location_intro: [
            { text: 'vị trí nhà riêng', start: 1.5, end: 6.0, class: 'active-red' },
            { text: 'camera điện thoại', start: 7.0, end: 11.5, class: 'active-cyan' }
        ],
        slide_location_exif: [
            { text: 'EXIF Metadata', start: 3.5, end: 7.5, class: 'active-yellow' },
            { text: 'dữ liệu ẩn vô hình', start: 8.0, end: 11.5, class: 'active-cyan' }
        ],
        slide_location_details: [
            { text: 'thời gian chụp chính xác', start: 4.0, end: 8.0, class: 'active-cyan' },
            { text: 'tọa độ GPS', start: 8.5, end: 12.0, class: 'active-red' }
        ],
        slide_location_map: [
            { text: 'trích xuất tọa độ', start: 3.0, end: 6.5, class: 'active-yellow' },
            { text: 'Google Maps', start: 7.5, end: 11.5, class: 'active-green' }
        ],
        slide_location_prevent: [
            { text: 'tắt quyền Truy cập vị trí', start: 2.5, end: 7.0, class: 'active-green' },
            { text: 'tự động xóa', start: 8.5, end: 12.5, class: 'active-yellow' }
        ]
    };

    const customSlideIds = [
        'slide_location_intro',
        'slide_location_exif',
        'slide_location_details',
        'slide_location_map',
        'slide_location_prevent'
    ];

    function sceneWrap(inner) {
        return `<div class="v72-zoom-container"><div class="v72-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_location_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v72-device-mockup">
                    <div class="v72-camera-screen">
                        <!-- Selfie Background simulation -->
                        <div class="v72-selfie-bg">
                            <div class="v72-house-bg"></div>
                            <div class="v72-avatar-user">👤</div>
                            
                            <!-- Laser depth focus grid (Micro-animation) -->
                            <div class="v72-laser-focus-grid"></div>
                            <div class="v72-scanner-line"></div>
                        </div>
                        
                        <!-- Camera Viewfinder Overlay -->
                        <div class="v72-viewfinder-grid">
                            <div class="v72-grid-line h1"></div>
                            <div class="v72-grid-line h2"></div>
                            <div class="v72-grid-line v1"></div>
                            <div class="v72-grid-line v2"></div>
                        </div>

                        <!-- Focus bracket and distance text -->
                        <div class="v72-focus-bracket">
                            <span class="v72-focus-dist">AF LOCK 1.2m</span>
                        </div>

                        <!-- Top indicators bar -->
                        <div class="v72-cam-header">
                            <span>⚡ AUTO</span>
                            <span class="v72-cam-gps-dot">📍 GPS ON</span>
                            <span class="v72-battery">🔋 98%</span>
                        </div>

                        <!-- Zoom multiplier dials -->
                        <div class="v72-zoom-selector">
                            <span>0.5x</span>
                            <span class="active">1.0x</span>
                            <span>2.0x</span>
                            <span>5.0x</span>
                        </div>

                        <!-- Bottom panel with capture button & album thumbnail -->
                        <div class="v72-cam-footer">
                            <div class="v72-album-thumbnail">🏞️</div>
                            <div class="v72-shutter-outer">
                                <div class="v72-shutter-btn"></div>
                            </div>
                            <div class="v72-cam-mode-switch">PHOTO</div>
                        </div>
                    </div>
                </div>

                <!-- Sliding Polaroid photo output -->
                <div class="v72-polaroid-photo" id="v72-photo-1">
                    <div class="v72-polaroid-img">
                        <div class="v72-polaroid-avatar">👤</div>
                    </div>
                    <div class="v72-polaroid-label">My Sweet Home 🏡</div>
                </div>

                <!-- Flash screen overlay -->
                <div class="v72-flash-overlay" id="v72-flash"></div>
            `);
        }
        else if (slideId === 'slide_location_exif') {
            canvas.innerHTML = sceneWrap(`
                <div class="v72-exif-container">
                    <!-- Floating category tags -->
                    <div class="v72-float-tag f1" id="v72-tag-file">📂 FILE_INFO</div>
                    <div class="v72-float-tag f2" id="v72-tag-gps">🛰️ GPS_COORDS</div>
                    <div class="v72-float-tag f3" id="v72-tag-cam">📷 CAM_SPECS</div>

                    <div class="v72-card-3d" id="v72-exif-card">
                        <!-- Front: The Photo -->
                        <div class="v72-card-side v72-card-front">
                            <div class="v72-polaroid-img">
                                <div class="v72-polaroid-avatar">👤</div>
                            </div>
                            <div class="v72-polaroid-label">My Sweet Home 🏡</div>
                        </div>
                        <!-- Back: Holographic Metadata -->
                        <div class="v72-card-side v72-card-back">
                            <div class="v72-exif-hdr">📂 EXIF METADATA</div>
                            
                            <!-- Laser scan line sweeps back and forth -->
                            <div class="v72-laser-scan-line"></div>

                            <div class="v72-binary-rain" id="v72-binary-lines">
                                01010100 01000101 01000011<br>
                                01000100 01000101 01010110<br>
                                01001100 01001111 01000011<br>
                                01010100 01001001 01001111
                            </div>
                            <div class="v72-exif-tag-pop">META-DATA ACTIVATED</div>
                        </div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_location_details') {
            canvas.innerHTML = sceneWrap(`
                <div class="v72-details-board">
                    <!-- Danger top warning alert banner -->
                    <div class="v72-warning-banner" id="v72-details-alert">
                        <span class="v72-pulse-dot"></span> ⚠️ SECURITY WARNING: GPS DATA LEAKED
                    </div>

                    <div class="v72-details-header">
                        <span class="v72-details-icon">📂</span>
                        <span style="font-weight:bold;">EXIF INSPECTOR v1.0.3</span>
                    </div>
                    <div class="v72-details-body">
                        <div class="v72-detail-row" id="v72-row-1">
                            <span class="v72-key">📱 Device model:</span>
                            <span class="v72-val">iPhone 15 Pro Max</span>
                        </div>
                        <div class="v72-detail-row" id="v72-row-2">
                            <span class="v72-key">📷 Lens Aperture:</span>
                            <span class="v72-val">f/1.78 @ 24mm</span>
                        </div>
                        <div class="v72-detail-row" id="v72-row-3">
                            <span class="v72-key">📅 Capture Time:</span>
                            <span class="v72-val">2026:06:29 09:25:08</span>
                        </div>
                        <div class="v72-detail-row warning-row" id="v72-row-4">
                            <span class="v72-key">📍 GPS Latitude:</span>
                            <span class="v72-val gps-val">10° 46' 37.2" N</span>
                        </div>
                        <div class="v72-detail-row warning-row" id="v72-row-5">
                            <span class="v72-key">📍 GPS Longitude:</span>
                            <span class="v72-val gps-val">106° 42' 04.5" E</span>
                        </div>
                    </div>
                    
                    <!-- Spinning radar target locking reticle -->
                    <div class="v72-reticle-wrap" id="v72-target-reticle">
                        <svg class="v72-reticle-svg" viewBox="0 0 100 100">
                            <circle class="v72-reticle-circle" cx="50" cy="50" r="40" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#ef4444" stroke-width="2" />
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#ef4444" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="v72-radar-target" id="v72-target-aim">🎯</div>
                </div>
            `);
        }
        else if (slideId === 'slide_location_map') {
            canvas.innerHTML = sceneWrap(`
                <div class="v72-map-wrapper">
                    <!-- Laser Satellite node shooting beams -->
                    <div class="v72-satellite-node" id="v72-sat-node">🛰️ GPS-SATELLITE_08</div>
                    <svg class="v72-sat-beam-svg">
                        <!-- Line connecting Sat to coordinates center -->
                        <line class="v72-sat-beam-line" id="v72-sat-beam" x1="750" y1="40" x2="370" y2="425" />
                    </svg>

                    <!-- Panels mapping hacker vs victim -->
                    <div class="v72-map-overlay-panel left-panel" id="v72-hacker-panel">
                        <div style="color:#ef4444; font-weight:bold; font-size:16px;">👤 TRUY VẾT HACKER</div>
                        <div style="font-size:14px; font-family:monospace; color:rgba(255,255,255,0.5);">Target: EXIF Coordinates</div>
                    </div>
                    <div class="v72-map-overlay-panel right-panel" id="v72-victim-panel">
                        <div style="color:#06b6d4; font-weight:bold; font-size:16px;">🏡 ĐỊA CHỈ PHÁT HIỆN</div>
                        <div style="font-size:14px; font-family:monospace; color:rgba(255,255,255,0.5);">User Home Database</div>
                    </div>

                    <!-- Stylized blueprint map layout -->
                    <div class="v72-map-canvas" id="v72-map-grid">
                        <div class="v72-map-street main-st"></div>
                        <div class="v72-map-street cross-st"></div>
                        <div class="v72-map-river"></div>
                        
                        <!-- Map Pointer/Pin -->
                        <div class="v72-map-pin-wrap" id="v72-pin">
                            <div class="v72-map-pin">📍</div>
                            <div class="v72-map-ripple r1"></div>
                            <div class="v72-map-ripple r2"></div>
                        </div>
                    </div>
                    
                    <!-- Floating Coordinates Info Box -->
                    <div class="v72-coords-overlay" id="v72-coords-box">
                        <div style="font-weight:bold; color:#ef4444; font-size:16px; margin-bottom:5px;">🎯 ĐỊNH VỊ THÀNH CÔNG</div>
                        <div style="font-family:monospace; font-size:24px; color:#fff;" id="v72-address-text">Đang giải mã địa chỉ...</div>
                    </div>
                </div>
            `);
        }
        else if (slideId === 'slide_location_prevent') {
            canvas.innerHTML = sceneWrap(`
                <div class="v72-settings-mockup">
                    <div class="v72-settings-header">Quyền riêng tư & Bảo mật</div>
                    
                    <div class="v72-settings-group">
                        <div class="v72-settings-row">
                            <div class="v72-row-left">
                                <span class="v72-row-icon">📍</span>
                                <span>Dịch vụ Định vị</span>
                            </div>
                            <span style="color:#10b981; font-weight:bold; font-size:20px;">BẬT</span>
                        </div>
                    </div>

                    <div class="v72-settings-group">
                        <div class="v72-settings-row header-row">
                            <span>QUYỀN TRUY CẬP CAMERA VỊ TRÍ</span>
                        </div>
                        <div class="v72-settings-row sub-choice">
                            <div class="v72-row-left">
                                <span>Hỏi trong lần sau</span>
                            </div>
                            <span class="v72-row-check"></span>
                        </div>
                        <div class="v72-settings-row sub-choice active-green-row">
                            <div class="v72-row-left">
                                <span>Khi dùng ứng dụng</span>
                            </div>
                            <span class="v72-row-check checked">✓</span>
                        </div>
                        <div class="v72-settings-row sub-choice" id="v72-settings-choice-never">
                            <div class="v72-row-left">
                                <span>Không bao giờ</span>
                            </div>
                            <span class="v72-row-check" id="v72-check-never"></span>
                        </div>
                    </div>

                    <!-- Permission description text -->
                    <div class="v72-settings-notice" id="v72-settings-desc">
                        Cho phép Camera truy cập vị trí để gắn thẻ địa lý vào bức ảnh. Khi tắt, các bức ảnh sống ảo sẽ hoàn toàn an toàn và sạch dữ liệu.
                    </div>

                    <!-- Cyber Shield Protector overlay -->
                    <div class="v72-shield-overlay" id="v72-shield">
                        <div class="v72-shield-icon">🛡️</div>
                        <div class="v72-shield-title">GPS STRIPPED / SAFE</div>
                        <div style="font-size:18px; color:rgba(255,255,255,0.4); text-align:center;">Quyền vị trí đã được khóa an toàn!</div>
                    </div>

                    <!-- Cursor simulated icon -->
                    <div class="v72-cursor" id="v72-hand-cursor">👆</div>
                </div>
            `);
        }
    }

    // ── UPDATE FRAME ANIMATION LOOP ────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_location_intro') {
            const shutterBtn = canvas.querySelector('.v72-shutter-btn');
            const flash = canvas.querySelector('#v72-flash');
            const photo = canvas.querySelector('#v72-photo-1');
            const focus = canvas.querySelector('.v72-focus-bracket');
            const gpsDot = canvas.querySelector('.v72-cam-gps-dot');
            const scanLine = canvas.querySelector('.v72-scanner-line');

            // 1. Autofocus box blinking in first half
            if (focus) {
                if (progress < 0.45) {
                    const blink = Math.floor(progress * 15) % 2 === 0;
                    focus.style.borderColor = blink ? '#10b981' : 'transparent';
                    focus.style.transform = `translate(-50%, -50%) scale(${1.2 - (progress * 0.4)})`;
                    focus.style.opacity = '1';
                } else {
                    focus.style.opacity = '0';
                }
            }

            // Viewfinder laser scan line animation
            if (scanLine) {
                const linePos = Math.sin(progress * Math.PI * 4) * 50 + 50; // runs up/down
                scanLine.style.top = `${linePos}%`;
                scanLine.style.opacity = (progress < 0.45) ? '0.7' : '0';
            }

            // GPS DOT flashing red warning
            if (gpsDot) {
                const blink = Math.floor(progress * 8) % 2 === 0;
                gpsDot.style.color = blink ? '#ef4444' : '#fff';
            }

            // 2. Shutter click and Flash at 0.50
            if (progress >= 0.45 && progress < 0.55) {
                if (shutterBtn) shutterBtn.style.background = '#ef4444';
                if (flash) {
                    flash.style.opacity = '1';
                    flash.style.pointerEvents = 'auto';
                }
            } else {
                if (shutterBtn) shutterBtn.style.background = '#fff';
                if (flash) {
                    flash.style.opacity = '0';
                    flash.style.transition = 'opacity 0.4s ease';
                    flash.style.pointerEvents = 'none';
                }
            }

            // 3. Polaroid photo slips out after flash
            if (photo) {
                if (progress >= 0.52) {
                    const slideInProgress = (progress - 0.52) / 0.48; // scale from 0 to 1
                    photo.style.transform = `translate(-50%, ${200 - (slideInProgress * 260)}px) scale(${0.5 + (slideInProgress * 0.5)}) rotate(${slideInProgress * -4}deg)`;
                    photo.style.opacity = '1';
                } else {
                    photo.style.transform = 'translate(-50%, 200px) scale(0.5)';
                    photo.style.opacity = '0';
                }
            }
        }
        else if (slideId === 'slide_location_exif') {
            const card = canvas.querySelector('#v72-exif-card');
            const popTag = canvas.querySelector('.v72-exif-tag-pop');
            const fileTag = canvas.querySelector('#v72-tag-file');
            const gpsTag = canvas.querySelector('#v72-tag-gps');
            const camTag = canvas.querySelector('#v72-tag-cam');
            const laser = canvas.querySelector('.v72-laser-scan-line');

            // 1. Floating metadata tags fly into center card
            if (fileTag) {
                const p = Math.min(1.0, progress / 0.3);
                fileTag.style.transform = `translate(${(1.0 - p) * -80}px, ${(1.0 - p) * -60}px)`;
                fileTag.style.opacity = p;
            }
            if (gpsTag) {
                const p = Math.min(1.0, progress / 0.3);
                gpsTag.style.transform = `translate(${(1.0 - p) * 90}px, ${(1.0 - p) * -80}px)`;
                gpsTag.style.opacity = p;
            }
            if (camTag) {
                const p = Math.min(1.0, progress / 0.3);
                camTag.style.transform = `translate(${(1.0 - p) * -90}px, ${(1.0 - p) * 90}px)`;
                camTag.style.opacity = p;
            }

            // 2. Card flips Y-axis
            if (card) {
                if (progress < 0.2) {
                    card.style.transform = 'rotateY(0deg)';
                } else if (progress >= 0.2 && progress < 0.7) {
                    const flipProgress = (progress - 0.2) / 0.5; // 0 to 1
                    card.style.transform = `rotateY(${flipProgress * 180}deg)`;
                } else {
                    card.style.transform = 'rotateY(180deg)';
                }
            }

            // Laser scan sweeping back
            if (laser) {
                if (progress >= 0.35 && progress < 0.8) {
                    const laserPos = Math.sin((progress - 0.35) * Math.PI * 4) * 50 + 50;
                    laser.style.top = `${laserPos}%`;
                    laser.style.opacity = '1';
                } else {
                    laser.style.opacity = '0';
                }
            }

            // Activated Pop Tag
            if (popTag) {
                if (progress >= 0.72) {
                    popTag.style.opacity = '1';
                    popTag.style.transform = 'translate(-50%, -50%) scale(1.1)';
                } else {
                    popTag.style.opacity = '0';
                    popTag.style.transform = 'translate(-50%, -50%) scale(0.7)';
                }
            }
        }
        else if (slideId === 'slide_location_details') {
            const row1 = canvas.querySelector('#v72-row-1');
            const row2 = canvas.querySelector('#v72-row-2');
            const row3 = canvas.querySelector('#v72-row-3');
            const row4 = canvas.querySelector('#v72-row-4');
            const row5 = canvas.querySelector('#v72-row-5');
            const alert = canvas.querySelector('#v72-details-alert');
            const target = canvas.querySelector('#v72-target-aim');
            const reticle = canvas.querySelector('#v72-target-reticle');

            // Sequential typing/fade in
            if (row1) row1.style.opacity = progress >= 0.1 ? '1' : '0';
            if (row2) row2.style.opacity = progress >= 0.25 ? '1' : '0';
            if (row3) row3.style.opacity = progress >= 0.4 ? '1' : '0';
            if (row4) row4.style.opacity = progress >= 0.55 ? '1' : '0';
            if (row5) row5.style.opacity = progress >= 0.65 ? '1' : '0';

            // Show Security risk alert box
            if (alert) {
                if (progress >= 0.55) {
                    alert.style.opacity = '1';
                    alert.style.transform = 'translateY(0)';
                    const blink = Math.floor(progress * 12) % 2 === 0;
                    alert.style.borderColor = blink ? '#ef4444' : 'rgba(239,68,68,0.2)';
                } else {
                    alert.style.opacity = '0';
                    alert.style.transform = 'translateY(-10px)';
                }
            }

            // Reticle radar spinning lock-on
            if (reticle) {
                if (progress >= 0.55) {
                    reticle.style.opacity = '1';
                    const angle = (progress - 0.55) * 360 * 2;
                    const scale = Math.max(1.0, 3.0 - (progress - 0.55) * 5);
                    reticle.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${angle}deg)`;
                } else {
                    reticle.style.opacity = '0';
                }
            }

            // Target lock-on animation on GPS rows
            if (target) {
                if (progress >= 0.55) {
                    target.style.opacity = '1';
                    target.style.transform = `scale(${2.0 - (progress - 0.55) * 2}) rotate(${(1.0 - progress) * 180}deg)`;
                    
                    if (progress >= 0.75) {
                        target.style.transform = 'scale(1) rotate(0deg)';
                        const blink = Math.floor(progress * 15) % 2 === 0;
                        target.style.color = blink ? '#ef4444' : '#fbbf24';
                    }
                } else {
                    target.style.opacity = '0';
                }
            }
        }
        else if (slideId === 'slide_location_map') {
            const map = canvas.querySelector('#v72-map-grid');
            const pin = canvas.querySelector('#v72-pin');
            const box = canvas.querySelector('#v72-coords-box');
            const addressText = canvas.querySelector('#v72-address-text');
            const satNode = canvas.querySelector('#v72-sat-node');
            const satBeam = canvas.querySelector('#v72-sat-beam');
            const hackerPanel = canvas.querySelector('#v72-hacker-panel');
            const victimPanel = canvas.querySelector('#v72-victim-panel');

            // 1. Zooming in map blueprint
            if (map) {
                const zoomFactor = 1.0 + (progress * 0.8);
                map.style.transform = `scale(${zoomFactor}) translate(${progress * -30}px, ${progress * -20}px)`;
            }

            // Satellite node slides in
            if (satNode) {
                satNode.style.opacity = (progress >= 0.1) ? '1' : '0';
                satNode.style.transform = (progress >= 0.1) ? 'translate(0, 0)' : 'translate(20px, -20px)';
            }

            // Panels slide in
            if (hackerPanel) hackerPanel.style.transform = (progress >= 0.15) ? 'translateX(0)' : 'translateX(-120%)';
            if (victimPanel) victimPanel.style.transform = (progress >= 0.15) ? 'translateX(0)' : 'translateX(120%)';

            // 2. Satellite laser beam shoots down
            if (satBeam) {
                if (progress >= 0.28 && progress < 0.48) {
                    satBeam.style.opacity = '1';
                    satBeam.style.strokeDashoffset = 1000 - ((progress - 0.28) / 0.2) * 1000;
                } else if (progress >= 0.48 && progress < 0.6) {
                    satBeam.style.opacity = '1';
                    satBeam.style.strokeDashoffset = '0';
                } else {
                    satBeam.style.opacity = '0';
                    satBeam.style.transition = 'opacity 0.2s';
                }
            }

            // 3. Pin falls down at 0.48
            if (pin) {
                if (progress >= 0.45) {
                    const fallProgress = Math.min(1.0, (progress - 0.45) / 0.15);
                    const bounceY = (1.0 - fallProgress) * -150;
                    pin.style.transform = `translate(-50%, -100%) translateY(${bounceY}px)`;
                    pin.style.opacity = '1';

                    // Trigger ripples only after pin hits the ground
                    const ripples = canvas.querySelectorAll('.v72-map-ripple');
                    ripples.forEach(r => {
                        r.style.opacity = (progress >= 0.58) ? '1' : '0';
                    });
                } else {
                    pin.style.opacity = '0';
                }
            }

            // 4. Info box slides in with resolved address
            if (box) {
                if (progress >= 0.65) {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                    
                    if (addressText) {
                        if (progress >= 0.8) {
                            addressText.textContent = '📍 123 Nguyễn Huệ, Quận 1, TP. HCM';
                            addressText.style.color = '#fbbf24';
                        } else {
                            addressText.textContent = 'Resolving Coordinates...';
                            addressText.style.color = 'rgba(255,255,255,0.6)';
                        }
                    }
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px)';
                }
            }
        }
        else if (slideId === 'slide_location_prevent') {
            const cursor = canvas.querySelector('#v72-hand-cursor');
            const shield = canvas.querySelector('#v72-shield');
            const choiceNever = canvas.querySelector('#v72-settings-choice-never');
            const checkNever = canvas.querySelector('#v72-check-never');
            const checkApp = canvas.querySelector('.active-green-row .v72-row-check');
            const rowApp = canvas.querySelector('.active-green-row');

            // 1. Cursor hand slides in pointing to "Không bao giờ" (choiceNever)
            if (cursor) {
                if (progress < 0.25) {
                    cursor.style.transform = 'translate(60px, 60px) scale(0.5)';
                    cursor.style.opacity = '0';
                } else if (progress >= 0.25 && progress < 0.45) {
                    const slideProg = (progress - 0.25) / 0.20; // 0 to 1
                    // Moves from bottom-right target towards the third row "Không bao giờ" (choiceNever)
                    cursor.style.transform = `translate(${100 - (slideProg * 100)}px, ${100 - (slideProg * 100)}px) scale(1)`;
                    cursor.style.opacity = '1';
                } else if (progress >= 0.45 && progress < 0.6) {
                    // Click down animation
                    cursor.style.transform = 'translate(0, 0) scale(0.85)';
                    cursor.style.opacity = '1';
                } else {
                    // Slide away
                    cursor.style.transform = 'translate(40px, -40px) scale(0.8)';
                    cursor.style.opacity = '0';
                }
            }

            // 2. Settings selection switch to "Không bao giờ" at progress 0.48
            if (progress >= 0.48) {
                if (choiceNever) choiceNever.classList.add('active-green-row');
                if (checkNever) {
                    checkNever.textContent = '✓';
                    checkNever.classList.add('checked');
                }
                if (rowApp) rowApp.classList.remove('active-green-row');
                if (checkApp) {
                    checkApp.textContent = '';
                    checkApp.classList.remove('checked');
                }
            } else {
                if (choiceNever) choiceNever.classList.remove('active-green-row');
                if (checkNever) {
                    checkNever.textContent = '';
                    checkNever.classList.remove('checked');
                }
                if (rowApp) rowApp.classList.add('active-green-row');
                if (checkApp) {
                    checkApp.textContent = '✓';
                    checkApp.classList.add('checked');
                }
            }

            // 3. Shield Protector pops up
            if (shield) {
                if (progress >= 0.62) {
                    shield.style.opacity = '1';
                    shield.style.transform = 'translate(-50%, -50%) scale(1)';
                } else {
                    shield.style.opacity = '0';
                    shield.style.transform = 'translate(-50%, -50%) scale(0.7)';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video72',
        topic: 'Bảo Mật GPS Ảnh Sống Ảo',
        episodeNum: 72,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video72 Plugin] Loaded: Image location leak EXIF simulator with rich animations.');
})();
