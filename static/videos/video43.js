/**
 * Video 43: Lời nguyền USB Paradox
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video43
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_usb_2: [
            { text: 'USB Paradox', start: 3.0, end: 8.0, class: 'active-gold' },
            { text: 'quy luật Internet', start: 1.0, end: 5.0, class: 'active-good' }
        ],
        slide_usb_3: [
            { text: 'lật ngược lại', start: 5.0, end: 10.0, class: 'active-gold' },
            { text: 'y như lần đầu', start: 10.0, end: 14.0, class: 'active-good' }
        ],
        slide_usb_4: [
            { text: 'một chiều duy nhất', start: 4.0, end: 10.0, class: 'active-bad' },
            { text: 'đầu USB Type-A', start: 1.0, end: 6.0, class: 'active-gold' }
        ],
        slide_usb_5: [
            { text: 'năm 1996', start: 2.0, end: 7.0, class: 'active-gold' },
            { text: 'chi phí phải rẻ', start: 7.0, end: 12.0, class: 'active-good' }
        ],
        slide_usb_6: [
            { text: 'USB-C xuất hiện', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'đối xứng hoàn hảo', start: 6.0, end: 11.0, class: 'active-gold' }
        ],
        slide_usb_7: [
            { text: 'bao nhiêu lần', start: 3.0, end: 8.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_usb_1', 'slide_usb_2', 'slide_usb_3',
        'slide_usb_4', 'slide_usb_5', 'slide_usb_6', 'slide_usb_7'
    ];

    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_usb_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.2;">
                        <div class="v37-grid-bg blue-tint" style="position:absolute; inset:0; background-image:radial-gradient(rgba(59,130,246,0.04) 1.5px, transparent 1.5px); background-size:20px 20px; pointer-events:none;"></div>
                        
                        <div style="position:relative; width:340px; height:340px; margin: 20px 0; display:flex; align-items:center; justify-content:center; zoom: 1.1;">
                            <div class="v26-zip-glow-ring" style="position:absolute; width:340px; height:340px; border-radius:50%; border: 2.5px dashed rgba(245, 158, 11, 0.45); animation: v26-logo-spin 25s linear infinite; pointer-events: none;"></div>
                            <div class="v26-zip-glow-ring inner" style="position:absolute; width:280px; height:280px; border-radius:50%; border: 1.5px solid rgba(245, 158, 11, 0.25); animation: v26-logo-spin-rev 15s linear infinite; pointer-events: none;"></div>
                            <div class="v43-floating-plug" style="z-index: 2; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center;">
                                <img src="https://media.lordicon.com/icons/wired/flat/1305-usb-cable.svg" style="width: 220px; height: 220px; filter: drop-shadow(0 0 35px rgba(245,158,11,0.6));" alt="USB Cable Logo">
                            </div>
                        </div>

                        <div class="glass-card" style="text-align: center; width: 90%; max-width: 500px; padding: 22px 24px; border-radius: 20px; border: 1.5px solid rgba(245, 158, 11, 0.35); background: rgba(12, 16, 24, 0.8); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 40px rgba(0,0,0,0.55); margin-top: 10px;">
                            <div style="margin-bottom: 12px; font-size: 16px; padding: 6px 16px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); color: var(--gold-primary); border-radius: 99px; font-weight: 600; text-transform: uppercase; font-family: monospace;">
                                <i data-lucide="shield-alert" style="width:16px;height:16px;"></i> Lời nguyền Internet > 20 năm
                            </div>
                            <div style="font-family:'Fira Code', monospace; font-size: 20px; font-weight: bold; color: #fff; line-height: 1.5;">
                                Tại sao bạn luôn phải cắm USB 3 lần mới đúng?
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_2') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.25;">
                        <div style="font-size:22px; font-weight:800; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; width:100%; max-width:560px; text-transform:uppercase; letter-spacing:0.5px; text-align:center; white-space:nowrap;">
                            Quy luật USB Paradox
                        </div>

                        <div style="display:flex; flex-direction:column; gap:15px; width:100%; max-width:560px; margin-top:20px;">
                            <!-- Top: Theory Card (Horizontal style) -->
                            <div class="glass-card v43-card-theory" style="width:100%; padding:18px 22px; border:1.5px solid rgba(59, 130, 246, 0.25); background:rgba(59, 130, 246, 0.03); border-radius:20px; display:flex; align-items:center; justify-content:space-between; transition: all 0.3s; overflow:hidden;">
                                <div style="display:flex; align-items:center; gap:15px; flex: 1;">
                                    <i data-lucide="calculator" style="width:36px; height:36px; color:#3b82f6; flex-shrink:0; display:inline-block;"></i>
                                    <div style="text-align:left;">
                                        <div style="font-size:17px; color:rgba(255,255,255,0.85); font-weight:bold; text-transform:uppercase; white-space:nowrap;">Xác suất Toán học</div>
                                        <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:2px; white-space:nowrap;">Chỉ có 2 mặt trên và dưới</div>
                                    </div>
                                </div>
                                <div style="font-size:46px; font-weight:900; color:#3b82f6; white-space:nowrap; width:130px; min-width:130px; text-align:right; font-variant-numeric:tabular-nums; margin-left:20px;" class="v43-val-theory">0%</div>
                            </div>

                            <!-- Bottom: Reality Card (Horizontal style) -->
                            <div class="glass-card v43-card-reality" style="width:100%; padding:18px 22px; border:1.5px solid rgba(239, 68, 68, 0.25); background:rgba(239, 68, 68, 0.03); border-radius:20px; display:flex; align-items:center; justify-content:space-between; transition: all 0.3s; overflow:hidden;">
                                <div style="display:flex; align-items:center; gap:15px; flex: 1;">
                                    <i data-lucide="frown" style="width:36px; height:36px; color:#ef4444; flex-shrink:0; display:inline-block;"></i>
                                    <div style="text-align:left;">
                                        <div style="font-size:17px; color:rgba(255,255,255,0.85); font-weight:bold; text-transform:uppercase; white-space:nowrap;">Cảm giác thực tế</div>
                                        <div style="font-size:14px; color:rgba(255,255,255,0.4); margin-top:2px; white-space:nowrap;">Cảm giác cắm sai lần đầu</div>
                                    </div>
                                </div>
                                <div style="font-size:46px; font-weight:900; color:#ef4444; text-shadow:0 0 15px rgba(239,68,68,0.4); white-space:nowrap; width:130px; min-width:130px; text-align:right; font-variant-numeric:tabular-nums; margin-left:20px;" class="v43-val-reality">0%</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.2;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 100%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">
                            Quy trình cắm USB truyền thuyết
                        </div>
                        
                        <div class="v43-sim-box">
                            <div style="position:relative; width:800px; height:100%; margin:0 auto;">
                                <!-- USB Plug (on the left, absolutely positioned) -->
                                <div class="v43-plug-container" style="position:absolute; left:40px; top:75px;">
                                    <div class="v43-usb-plug" style="position:absolute; left:90px; top:26px;">
                                        <div class="v43-usb-plug-block"></div>
                                        <div class="v43-usb-plug-holes">
                                            <div class="v43-usb-plug-hole"></div>
                                            <div class="v43-usb-plug-hole"></div>
                                        </div>
                                    </div>
                                    <div class="v43-usb-collar"></div>
                                    <div class="v43-usb-cable"></div>
                                </div>
                                
                                <!-- USB Port (on the right, absolutely positioned) -->
                                <div class="v43-port-container" style="position:absolute; left:540px; top:75px;">
                                    <div class="v43-usb-port">
                                        <div class="v43-usb-port-block"></div>
                                        <div class="v43-usb-port-contacts">
                                            <div class="v43-usb-port-contact"></div>
                                            <div class="v43-usb-port-contact"></div>
                                            <div class="v43-usb-port-contact"></div>
                                            <div class="v43-usb-port-contact"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Notification overlays -->
                            <div class="v43-alert-badge badge-l1" style="display:none;">❌ SAI CHIỀU!</div>
                            <div class="v43-alert-badge badge-l2" style="display:none;">❌ VẪN SAI CHIỀU!</div>
                            <div class="v43-alert-badge badge-l3" style="display:none;">✅ KHỚP KHÍT!</div>
                        </div>

                        <!-- Step List Trackers -->
                        <div class="v43-steps-tracker">
                            <div class="v43-step-card card-step-1">
                                <div class="v43-step-icon"><i data-lucide="arrow-down"></i></div>
                                <div>
                                    <div style="font-weight:bold; font-size:16px; color:#fff;">Lần 1: Cắm thử</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px;">Báo lỗi sai chiều.</div>
                                </div>
                            </div>
                            <div class="v43-step-card card-step-2">
                                <div class="v43-step-icon"><i data-lucide="refresh-cw"></i></div>
                                <div>
                                    <div style="font-weight:bold; font-size:16px; color:#fff;">Lần 2: Lật ngược</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px;">Cắm tiếp, vẫn báo sai.</div>
                                </div>
                            </div>
                            <div class="v43-step-card card-step-3 success-step">
                                <div class="v43-step-icon"><i data-lucide="check-circle"></i></div>
                                <div>
                                    <div style="font-weight:bold; font-size:16px; color:#fff;">Lần 3: Lật lại</div>
                                    <div style="font-size:13px; color:rgba(255,255,255,0.4); margin-top:2px;">Cắm khớp hoàn toàn!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.2;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 100%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">
                            Cấu trúc bất đối xứng của USB Type-A
                        </div>

                        <div class="v43-sim-box">
                            <div style="position:relative; width:800px; height:100%; margin:0 auto;">
                                <!-- Left: Connector cross section (absolutely positioned) -->
                                <div style="position:absolute; left:120px; top:65px; display:flex; flex-direction:column; align-items:center; gap:8px;" class="v43-phys-plug-container">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4);">ĐẦU CẮM (PLUG)</div>
                                    <div style="width:140px; height:90px; border:3.5px solid #94a3b8; border-radius:8px; position:relative; background:#1e293b; transition: transform 0.4s; overflow:hidden;" class="v43-phys-plug">
                                        <!-- Top half: Solid plastic block (unrotated: top) -->
                                        <div style="position:absolute; top:0; left:0; right:0; height:45px; background:#0f172a; border-bottom:1.5px solid #334155; display:flex; align-items:center; justify-content:center; font-size:13px; color:#f59e0b; font-weight:bold;" class="v43-phys-plug-top-txt">KHỐI NHỰA</div>
                                        <!-- Bottom half: Empty space (unrotated: bottom) -->
                                        <div style="position:absolute; bottom:0; left:0; right:0; height:45px; background:transparent; display:flex; align-items:center; justify-content:center; font-size:13px; color:rgba(255,255,255,0.3); font-weight:bold; border-top:1.5px dashed rgba(255,255,255,0.15);" class="v43-phys-plug-bot-txt">KHOẢNG TRỐNG</div>
                                    </div>
                                </div>

                                <!-- Blocker status indicator (moved to top-center to prevent overlap) -->
                                <div style="position:absolute; left:50%; top:20px; transform:translateX(-50%); display:flex; align-items:center; gap:8px; z-index: 10;" class="v43-phys-status">
                                    <div style="width:36px; height:36px; border-radius:50%; background:rgba(239, 68, 68, 0.15); border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; color:#ef4444; font-size:18px; font-weight:bold;" class="v43-phys-status-icon">!</div>
                                    <div style="font-size:15px; font-weight:bold; color:#ef4444;" class="v43-phys-status-text">BỊ CHẶN</div>
                                </div>

                                <!-- Right: Port cross section (absolutely positioned) -->
                                <div style="position:absolute; left:540px; top:65px; display:flex; flex-direction:column; align-items:center; gap:8px;">
                                    <div style="font-size:12px; font-weight:bold; color:rgba(255,255,255,0.4);">CỔNG CẮM (PORT)</div>
                                    <div style="width:140px; height:90px; border:3.5px solid #64748b; border-left:none; border-radius:0 8px 8px 0; position:relative; background:#0f172a;">
                                        <!-- Plastic top half -->
                                        <div style="position:absolute; top:0; left:0; right:0; height:45px; background:#334155; border-bottom:1.5px solid #475569; display:flex; align-items:center; justify-content:center; font-size:13px; color:#f59e0b; font-weight:bold;">
                                            KHỐI NHỰA
                                        </div>
                                        <!-- Empty bottom half -->
                                        <div style="position:absolute; bottom:0; left:0; right:0; height:45px; background:transparent; display:flex; align-items:center; justify-content:center; font-size:13px; color:rgba(255,255,255,0.3); font-weight:bold; border-top:1.5px dashed rgba(255,255,255,0.15);">KHOẢNG TRỐNG</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Physical bullets -->
                        <div class="v43-phys-labels" style="width: 95%; max-width: 900px;">
                            <div class="v43-phys-label-item" style="font-size: 15px;">
                                <i data-lucide="check-circle-2" style="width:18px; height:18px; color:#10b981; flex-shrink:0;"></i>
                                <span><strong>Đúng chiều:</strong> Khối nhựa lọt vào khoảng trống.</span>
                            </div>
                            <div class="v43-phys-label-item" style="font-size: 15px;">
                                <i data-lucide="x-circle" style="width:18px; height:18px; color:#ef4444; flex-shrink:0;"></i>
                                <span><strong>Ngược chiều:</strong> Hai khối nhựa chạm nhau, bị chặn.</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_5') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.25;">
                        <div style="font-size:22px; font-weight:800; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; width:100%; max-width:480px; text-transform:uppercase; letter-spacing:0.5px; text-align:center;">
                            Lịch sử Thiết kế USB (1996)
                        </div>

                        <div style="display:flex; flex-direction:column; gap:15px; width:100%; max-width:480px; margin-top:15px;">
                            <!-- Top: Retro Birth Year Badge (Row Style) -->
                            <div class="glass-card" style="width:100%; padding:18px; border:1.5px solid rgba(245, 158, 11, 0.25); background:rgba(245, 158, 11, 0.03); border-radius:20px; display:flex; align-items:center; justify-content:center; gap:20px; text-align:left;">
                                <i data-lucide="history" style="width:40px; height:40px; color:var(--gold-primary); display:inline-block; flex-shrink:0;"></i>
                                <div>
                                    <div style="font-size:12px; color:rgba(255,255,255,0.4); font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;">Thời kỳ sơ khai (USB 1.0)</div>
                                    <div style="font-size:40px; font-weight:900; color:var(--gold-primary); text-shadow:0 0 10px rgba(245,158,11,0.3); line-height:1; margin-top:2px;">1996</div>
                                </div>
                            </div>

                            <!-- Bottom: Historical Constraints list -->
                            <div class="glass-card" style="width:100%; padding:20px 24px; border:1.5px solid rgba(255, 255, 255, 0.06); border-radius:20px; display:flex; flex-direction:column; text-align:left;">
                                <div style="font-size:14px; font-weight:bold; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.5px;">TIÊU CHÍ THỜI ĐÓ</div>
                                
                                <div style="display:flex; flex-direction:column; gap:16px;">
                                    <div style="display:flex; gap:12px; align-items:center;" class="v43-hist-item" id="hist-item-1">
                                        <i data-lucide="dollar-sign" style="width:24px; height:24px; color:#10b981; flex-shrink:0;"></i>
                                        <div style="font-size:16px; color:rgba(255,255,255,0.9);"><strong style="color:#fff;">Tiết kiệm chi phí:</strong> Tối giản linh kiện mạch.</div>
                                    </div>
                                    <div style="display:flex; gap:12px; align-items:center;" class="v43-hist-item" id="hist-item-2">
                                        <i data-lucide="layers" style="width:24px; height:24px; color:#3b82f6; flex-shrink:0;"></i>
                                        <div style="font-size:16px; color:rgba(255,255,255,0.9);"><strong style="color:#fff;">Thay thế cổng cũ:</strong> Thu gọn giắc cắm cồng kềnh.</div>
                                    </div>
                                    <div style="display:flex; gap:12px; align-items:center;" class="v43-hist-item" id="hist-item-3">
                                        <i data-lucide="keyboard" style="width:24px; height:24px; color:#f59e0b; flex-shrink:0;"></i>
                                        <div style="font-size:16px; color:rgba(255,255,255,0.9);"><strong style="color:#fff;">Ít cắm rút:</strong> Chủ yếu dùng cố định (chuột/phím).</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_6') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.2;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; width: 100%; max-width: 900px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">
                            USB-C: Thiết kế đối xứng hoàn hảo
                        </div>

                        <div class="v43-sim-box">
                            <div style="position:relative; width:800px; height:100%; margin:0 auto;">
                                <!-- Left: USB-C Plug (absolutely positioned) -->
                                <div class="v43-usbc-plug-container" style="position:absolute; left:40px; top:75px; width: 220px; height: 100px;">
                                    <div class="v43-usbc-plug" style="position:absolute; left:90px; top:32px;">
                                        <div class="v43-usbc-plug-inner"></div>
                                    </div>
                                    <div class="v43-usb-collar"></div>
                                    <div class="v43-usb-cable"></div>
                                </div>

                                <!-- Status indicator (moved to top-center to prevent overlap) -->
                                <div style="position:absolute; left:50%; top:20px; transform:translateX(-50%); display:flex; align-items:center; gap:8px; z-index: 10;" class="v43-usbc-status">
                                    <div style="width:36px; height:36px; border-radius:50%; background:rgba(16, 185, 129, 0.15); border:2px solid #10b981; display:flex; align-items:center; justify-content:center; color:#10b981; font-size:18px;" class="v43-usbc-status-icon">
                                        <i data-lucide="check" style="width:18px; height:18px;"></i>
                                    </div>
                                    <div style="font-size:15px; font-weight:bold; color:#10b981;" class="v43-usbc-status-text">ĐỐI XỨNG</div>
                                </div>

                                <!-- Right: USB-C Port (absolutely positioned) -->
                                <div class="v43-usbc-port-container" style="position:absolute; left:540px; top:75px; width: 220px; height: 100px; display:flex; align-items:center; justify-content:center;">
                                    <div class="v43-usbc-port">
                                        <div class="v43-usbc-port-tongue">
                                            <div class="v43-usbc-tongue-pin"></div>
                                            <div class="v43-usbc-tongue-pin"></div>
                                            <div class="v43-usbc-tongue-pin"></div>
                                            <div class="v43-usbc-tongue-pin"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Feature list -->
                        <div class="v43-steps-tracker">
                            <div class="v43-step-card active success-step">
                                <i data-lucide="check-circle" style="width:20px; height:20px; color:#10b981; flex-shrink:0;"></i>
                                <div style="font-weight:bold; font-size:16px; color:#fff;">Cắm chiều nào cũng được</div>
                            </div>
                            <div class="v43-step-card active success-step">
                                <i data-lucide="check-circle" style="width:20px; height:20px; color:#10b981; flex-shrink:0;"></i>
                                <div style="font-weight:bold; font-size:16px; color:#fff;">Không cần phán đoán</div>
                            </div>
                            <div class="v43-step-card active success-step">
                                <i data-lucide="check-circle" style="width:20px; height:20px; color:#10b981; flex-shrink:0;"></i>
                                <div style="font-weight:bold; font-size:16px; color:#fff;">Xóa bỏ lời nguyền "3 lần"</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        else if (slideId === 'slide_usb_7') {
            if (needsTemplate) {
                canvas.innerHTML = `
                    <div class="v43-zoom-container" style="zoom: 1.25;">
                        <div class="glass-card" style="width:95%; max-width:480px; padding:24px; border:2.5px solid rgba(245, 158, 11, 0.35); background:rgba(12, 16, 24, 0.85); border-radius:24px; text-align:center; position:relative; overflow:hidden;">
                            <!-- Gold pulse ring back -->
                            <div style="position:absolute; inset:-40px; background:radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 60%); pointer-events:none;"></div>
                            
                            <div style="font-size:22px; font-weight:bold; color:#fff; line-height:1.45; margin-bottom:20px;">
                                Thành thật đi...<br>Bạn đã cắm đúng ngay lần đầu bao nhiêu lần? 😅
                            </div>

                            <!-- Fake Poll Option boxes -->
                            <div style="display:flex; flex-direction:column; gap:12px; width:100%; margin:0 auto 20px auto;">
                                <div class="v43-poll-option poll-opt-1" style="display:flex; align-items:center; justify-content:space-between; background:rgba(239, 68, 68, 0.05); border:1.5px solid rgba(239, 68, 68, 0.15); border-radius:12px; padding:14px 18px; font-size:16px; color:#fca5a5; font-weight:bold; transition:all 0.3s;">
                                    <span>❌ Chưa bao giờ (Luôn sai)</span>
                                    <span style="font-family:monospace; font-size:16px;" class="v43-vote-pct-1">0% vote</span>
                                </div>
                                <div class="v43-poll-option poll-opt-2" style="display:flex; align-items:center; justify-content:space-between; background:rgba(245, 158, 11, 0.05); border:1.5px solid rgba(245, 158, 11, 0.15); border-radius:12px; padding:14px 18px; font-size:16px; color:#fde047; font-weight:bold; transition:all 0.3s;">
                                    <span>🤔 Thỉnh thoảng (Ăn may)</span>
                                    <span style="font-family:monospace; font-size:16px;" class="v43-vote-pct-2">0% vote</span>
                                </div>
                                <div class="v43-poll-option poll-opt-3" style="display:flex; align-items:center; justify-content:space-between; background:rgba(16, 185, 129, 0.05); border:1.5px solid rgba(16, 185, 129, 0.15); border-radius:12px; padding:14px 18px; font-size:16px; color:#a7f3d0; font-weight:bold; transition:all 0.3s;">
                                    <span>😎 Siêu nhân (Lần đầu ăn ngay)</span>
                                    <span style="font-family:monospace; font-size:16px;" class="v43-vote-pct-3">0% vote</span>
                                </div>
                            </div>

                            <!-- Follow callout -->
                            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:16px; display:inline-flex; align-items:center; gap:8px;">
                                <i data-lucide="bell" style="width:22px; height:22px; color:var(--gold-primary); display:inline-block;"></i>
                                <span style="font-size:14px; color:rgba(255,255,255,0.5);">Đừng quên nhấn <strong>Follow @Turnio.dev</strong> nhé!</span>
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
        if (slideId === 'slide_usb_1') {
            const floatEl = canvas.querySelector('.v43-floating-plug');
            if (floatEl) {
                // Smooth periodic floating transform
                const floatY = Math.sin(progress * Math.PI * 2) * 8;
                const floatRot = Math.sin(progress * Math.PI * 2) * 2.5;
                floatEl.style.transform = `translateY(${floatY}px) rotate(${floatRot}deg)`;
            }
        }
        else if (slideId === 'slide_usb_2') {
            const theoryValEl = canvas.querySelector('.v43-val-theory');
            const realityValEl = canvas.querySelector('.v43-val-reality');
            const cardTheory = canvas.querySelector('.v43-card-theory');
            const cardReality = canvas.querySelector('.v43-card-reality');

            // Count-up progress animations
            const currentTheory = Math.round(Math.min(1.0, progress / 0.7) * 50);
            const currentReality = Math.round(Math.min(1.0, progress / 0.8) * 99);

            if (theoryValEl) theoryValEl.textContent = `${currentTheory}%`;
            if (realityValEl) realityValEl.textContent = `${currentReality}%`;

            if (progress >= 0.75) {
                if (cardReality) {
                    cardReality.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    cardReality.style.background = 'rgba(239, 68, 68, 0.08)';
                    cardReality.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.15)';
                    cardReality.style.transform = 'scale(1.05)';
                }
            } else {
                if (cardReality) {
                    cardReality.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                    cardReality.style.background = 'rgba(239, 68, 68, 0.02)';
                    cardReality.style.boxShadow = 'none';
                    cardReality.style.transform = 'scale(1)';
                }
            }
        }
        else if (slideId === 'slide_usb_3') {
            const plugContainer = canvas.querySelector('.v43-plug-container');
            
            const badgeL1 = canvas.querySelector('.badge-l1');
            const badgeL2 = canvas.querySelector('.badge-l2');
            const badgeL3 = canvas.querySelector('.badge-l3');
            
            const card1 = canvas.querySelector('.card-step-1');
            const card2 = canvas.querySelector('.card-step-2');
            const card3 = canvas.querySelector('.card-step-3');

            let xVal = 0;
            let rotateVal = 0;
            
            // Set default alert classes and styles
            if (badgeL1) { badgeL1.style.display = 'none'; badgeL1.className = 'v43-alert-badge badge-l1'; }
            if (badgeL2) { badgeL2.style.display = 'none'; badgeL2.className = 'v43-alert-badge badge-l2'; }
            if (badgeL3) { badgeL3.style.display = 'none'; badgeL3.className = 'v43-alert-badge badge-l3'; }

            if (card1) card1.classList.remove('active');
            if (card2) card2.classList.remove('active');
            if (card3) card3.classList.remove('active');

            if (progress < 0.33) {
                // Phase 1: cắm lần 1
                if (card1) card1.classList.add('active');
                rotateVal = 0;
                const p = progress / 0.33;
                if (p < 0.45) {
                    xVal = (p / 0.45) * 320;
                } else if (p >= 0.45 && p < 0.70) {
                    xVal = 320;
                    if (badgeL1) { badgeL1.style.display = 'block'; badgeL1.classList.add('fail'); }
                } else {
                    xVal = (1 - (p - 0.70) / 0.30) * 320;
                }
            }
            else if (progress >= 0.33 && progress < 0.66) {
                // Phase 2: cắm lần 2 (lật ngược)
                if (card2) card2.classList.add('active');
                const p = (progress - 0.33) / 0.33;
                
                // Rotation transition at the beginning
                if (p < 0.15) {
                    xVal = 0;
                    rotateVal = (p / 0.15) * 180;
                } else {
                    rotateVal = 180;
                    const pCắm = (p - 0.15) / 0.85;
                    if (pCắm < 0.45) {
                        xVal = (pCắm / 0.45) * 320;
                    } else if (pCắm >= 0.45 && pCắm < 0.70) {
                        xVal = 320;
                        if (badgeL2) { badgeL2.style.display = 'block'; badgeL2.classList.add('fail'); }
                    } else {
                        xVal = (1 - (pCắm - 0.70) / 0.30) * 320;
                    }
                }
            }
            else {
                // Phase 3: cắm lần 3 (lật lại và thành công!)
                if (card3) card3.classList.add('active');
                const p = (progress - 0.66) / 0.34;
                
                // Rotate back to 360 (which is 0)
                if (p < 0.15) {
                    xVal = 0;
                    rotateVal = 180 + (p / 0.15) * 180;
                } else {
                    rotateVal = 360;
                    const pCắm = (p - 0.15) / 0.85;
                    if (pCắm < 0.45) {
                        xVal = (pCắm / 0.45) * 400; // slides fully in
                    } else {
                        xVal = 400;
                        if (badgeL3) { badgeL3.style.display = 'block'; badgeL3.classList.add('success'); }
                    }
                }
            }

            if (plugContainer) {
                plugContainer.style.transform = `translateX(${xVal}px)`;
                const usbPlug = plugContainer.querySelector('.v43-usb-plug');
                if (usbPlug) {
                    usbPlug.style.transform = `rotate(${rotateVal}deg)`;
                }
            }
        }
        else if (slideId === 'slide_usb_4') {
            const physPlug = canvas.querySelector('.v43-phys-plug');
            const statusIcon = canvas.querySelector('.v43-phys-status-icon');
            const statusText = canvas.querySelector('.v43-phys-status-text');
            const plugTop = canvas.querySelector('.v43-phys-plug-top-txt');
            const plugBot = canvas.querySelector('.v43-phys-plug-bot-txt');

            if (progress < 0.35) {
                // Wrong orientation, blocked
                if (physPlug) {
                    physPlug.style.transform = 'translateX(280px) rotate(0deg)'; // close, touching port
                    if (plugTop) {
                        plugTop.style.transform = 'rotate(0deg)';
                        plugTop.style.opacity = 1;
                    }
                    if (plugBot) {
                        plugBot.style.transform = 'rotate(0deg)';
                        plugBot.style.opacity = 1;
                    }
                }
                if (statusIcon) { statusIcon.textContent = "!"; statusIcon.style.borderColor = "#ef4444"; statusIcon.style.color = "#ef4444"; statusIcon.style.background = "rgba(239, 68, 68, 0.15)"; }
                if (statusText) { statusText.textContent = "BỊ CHẶN"; statusText.style.color = "#ef4444"; }
            }
            else if (progress >= 0.35 && progress < 0.65) {
                // Flip animation
                const p = (progress - 0.35) / 0.3;
                const rot = p * 180;
                // Move plug back to 0 during rotation
                const xVal = (1 - p) * 280;
                if (physPlug) {
                    physPlug.style.transform = `translateX(${xVal}px) rotate(${rot}deg)`;
                    if (plugTop) {
                        plugTop.style.transform = `rotate(-${rot}deg)`;
                        plugTop.style.opacity = 1;
                    }
                    if (plugBot) {
                        plugBot.style.transform = `rotate(-${rot}deg)`;
                        plugBot.style.opacity = 1;
                    }
                }
                if (statusIcon) { statusIcon.textContent = "⟳"; statusIcon.style.borderColor = "#f59e0b"; statusIcon.style.color = "#f59e0b"; statusIcon.style.background = "rgba(245, 158, 11, 0.15)"; }
                if (statusText) { statusText.textContent = "ĐANG XOAY"; statusText.style.color = "#f59e0b"; }
            }
            else {
                // Correct orientation, fitted!
                const pCắm = (progress - 0.65) / 0.35;
                const xVal = 280 + pCắm * 90;
                const opacityVal = Math.max(0, 1 - pCắm * 2.5);

                if (physPlug) {
                    physPlug.style.transform = `translateX(${xVal}px) rotate(180deg)`;
                    if (plugTop) {
                        plugTop.style.transform = 'rotate(-180deg)';
                        plugTop.style.opacity = opacityVal;
                    }
                    if (plugBot) {
                        plugBot.style.transform = 'rotate(-180deg)';
                        plugBot.style.opacity = opacityVal;
                    }
                }
                if (statusIcon) { statusIcon.textContent = "✓"; statusIcon.style.borderColor = "#10b981"; statusIcon.style.color = "#10b981"; statusIcon.style.background = "rgba(16, 185, 129, 0.15)"; }
                if (statusText) { statusText.textContent = "KHỚP KHÍT"; statusText.style.color = "#10b981"; }
            }
        }
        else if (slideId === 'slide_usb_5') {
            const item1 = canvas.querySelector('#hist-item-1');
            const item2 = canvas.querySelector('#hist-item-2');
            const item3 = canvas.querySelector('#hist-item-3');

            // Slide in items sequentially based on progress
            if (progress >= 0.2) item1?.classList.add('visible'); else item1?.classList.remove('visible');
            if (progress >= 0.5) item2?.classList.add('visible'); else item2?.classList.remove('visible');
            if (progress >= 0.8) item3?.classList.add('visible'); else item3?.classList.remove('visible');
        }
        else if (slideId === 'slide_usb_6') {
            const plugContainer = canvas.querySelector('.v43-usbc-plug-container');
            const statusIcon = canvas.querySelector('.v43-usbc-status-icon');
            const statusText = canvas.querySelector('.v43-usbc-status-text');

            let xVal = 0;
            let rotateVal = 0;

            if (progress < 0.32) {
                // Cắm lần 1 ở hướng 0 độ
                const p = progress / 0.32;
                rotateVal = 0;
                if (p < 0.45) {
                    xVal = (p / 0.45) * 400;
                } else if (p >= 0.45 && p < 0.75) {
                    xVal = 400;
                } else {
                    xVal = (1 - (p - 0.75) / 0.25) * 400;
                }
            }
            else if (progress >= 0.32 && progress < 0.42) {
                // Xoay đầu cắm 180 độ
                const p = (progress - 0.32) / 0.10;
                xVal = 0;
                rotateVal = p * 180;
            }
            else if (progress >= 0.42 && progress < 0.74) {
                // Cắm lần 2 ở hướng 180 độ
                const p = (progress - 0.42) / 0.32;
                rotateVal = 180;
                if (p < 0.45) {
                    xVal = (p / 0.45) * 400;
                } else if (p >= 0.45 && p < 0.75) {
                    xVal = 400;
                } else {
                    xVal = (1 - (p - 0.75) / 0.25) * 400;
                }
            }
            else {
                // Rút ra và đứng yên ở cuối
                const p = (progress - 0.74) / 0.26;
                rotateVal = 180;
                xVal = 0;
            }

            if (plugContainer) {
                plugContainer.style.transform = `translateX(${xVal}px)`;
                const usbcPlug = plugContainer.querySelector('.v43-usbc-plug');
                if (usbcPlug) {
                    usbcPlug.style.transform = `rotate(${rotateVal}deg)`;
                }
            }

            if (statusIcon && statusText) {
                if (xVal > 100) {
                    statusText.textContent = "ĐÃ CẮM";
                    statusIcon.style.background = "rgba(16, 185, 129, 0.3)";
                    statusIcon.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.6)";
                } else {
                    statusText.textContent = "ĐỐI XỨNG";
                    statusIcon.style.background = "rgba(16, 185, 129, 0.1)";
                    statusIcon.style.boxShadow = "none";
                }
            }
        }
        else if (slideId === 'slide_usb_7') {
            const bell = canvas.querySelector('.lucide-bell');
            const opt1 = canvas.querySelector('.poll-opt-1');
            const opt2 = canvas.querySelector('.poll-opt-2');
            const opt3 = canvas.querySelector('.poll-opt-3');
            
            const pct1 = canvas.querySelector('.v43-vote-pct-1');
            const pct2 = canvas.querySelector('.v43-vote-pct-2');
            const pct3 = canvas.querySelector('.v43-vote-pct-3');

            // Sequential votes count up
            const v1 = Math.round(Math.min(1.0, progress / 0.5) * 87);
            const v2 = Math.round(Math.min(1.0, progress / 0.6) * 12);
            const v3 = Math.round(Math.min(1.0, progress / 0.7) * 1);

            if (pct1) pct1.textContent = `${v1}% vote`;
            if (pct2) pct2.textContent = `${v2}% vote`;
            if (pct3) pct3.textContent = `${v3}% vote`;

            // Active option highlights
            if (opt1) {
                if (progress >= 0.2 && progress < 0.45) opt1.classList.add('highlight');
                else opt1.classList.remove('highlight');
            }
            if (opt2) {
                if (progress >= 0.45 && progress < 0.7) opt2.classList.add('highlight');
                else opt2.classList.remove('highlight');
            }
            if (opt3) {
                if (progress >= 0.7) opt3.classList.add('highlight');
                else opt3.classList.remove('highlight');
            }

            // Bell shaking
            if (bell) {
                if (progress >= 0.75) {
                    bell.style.animation = 'v43-bell-ring 1s infinite ease-in-out';
                } else {
                    bell.style.animation = 'none';
                }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video43',
        topic: 'Lời nguyền USB Paradox',
        episodeNum: 43,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video43 Plugin] Loaded: USB Paradox slides ready.');
})();
