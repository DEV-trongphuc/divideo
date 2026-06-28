/**
 * Video 66: Origin of Computer Bug
 * Custom slides detailing the 1947 Harvard Mark II moth incident.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_bug_intro: [
            { text: 'lỗi logic trong dòng code', start: 3.5, end: 6.0, class: 'active-red' },
            { text: 'một con côn trùng', start: 7.5, end: 10.5, class: 'active-yellow' }
        ],
        slide_bug_accident: [
            { text: 'cơ điện khổng lồ nặng tới 25 tấn', start: 3.5, end: 7.0, class: 'active-cyan' },
            { text: 'rơ-le đóng ngắt vật lý', start: 8.0, end: 11.5, class: 'active-yellow' }
        ],
        slide_bug_glitch: [
            { text: 'bỗng nhiên dừng hoạt động', start: 3.5, end: 6.5, class: 'active-red' },
            { text: 'lỗi vòng lặp', start: 7.5, end: 10.0, class: 'active-yellow' }
        ],
        slide_bug_relay: [
            { text: 'dò tìm thủ công', start: 2.0, end: 5.5, class: 'active-yellow' },
            { text: 'rơ-le số 70', start: 7.5, end: 10.5, class: 'active-cyan' }
        ],
        slide_bug_culprit: [
            { text: 'rơ-le số 70', start: 3.5, end: 6.0, class: 'active-yellow' },
            { text: 'con bươm bướm đêm bị kẹt', start: 7.0, end: 10.5, class: 'active-red' }
        ],
        slide_bug_history: [
            { text: 'dán nó vào cuốn sổ', start: 2.5, end: 5.5, class: 'active-yellow' },
            { text: 'Debugging hay diệt bug', start: 7.5, end: 10.5, class: 'active-green' }
        ]
    };

    const customSlideIds = [
        'slide_bug_intro', 'slide_bug_accident', 'slide_bug_glitch', 
        'slide_bug_relay', 'slide_bug_culprit', 'slide_bug_history'
    ];

    function sceneWrap(inner) {
        return `<div class="v66-zoom-container"><div class="v66-scene-content">${inner}</div></div>`;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (!needsTemplate) return;

        canvas.setAttribute('data-sim-template', slideId);

        // Slide 1: 1947 Electro-Mechanical Computer Console Panel (First Startup)
        if (slideId === 'slide_bug_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-retro-console">
                        <div class="v66-console-rivet tl"></div>
                        <div class="v66-console-rivet tr"></div>
                        <div class="v66-console-rivet bl"></div>
                        <div class="v66-console-rivet br"></div>
                        
                        <!-- Left Panel: Dial Gauge & Heavy Switches -->
                        <div class="v66-console-left">
                            <div class="v66-gauge-container">
                                <div class="v66-gauge-face">
                                    <div class="v66-gauge-markings"></div>
                                    <div class="v66-gauge-label val0">0V</div>
                                    <div class="v66-gauge-label val60">60V</div>
                                    <div class="v66-gauge-label val120">120V</div>
                                    <div class="v66-gauge-needle" id="v66-intro-needle" style="transform: rotate(60deg);"></div>
                                    <div class="v66-gauge-center" style="top:68px; left:68px;"></div>
                                    <div class="v66-gauge-title">LINE VOLTS</div>
                                </div>
                            </div>
                            
                            <div class="v66-switch-row">
                                <div class="v66-retro-switch-item">
                                    <span class="v66-switch-label">MASTER</span>
                                    <div class="v66-switch-body on" id="v66-switch-master">
                                        <div class="v66-switch-toggle"></div>
                                    </div>
                                </div>
                                <div class="v66-retro-switch-item">
                                    <span class="v66-switch-label">COILS</span>
                                    <div class="v66-switch-body on" id="v66-switch-coils">
                                        <div class="v66-switch-toggle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Indicator Bulbs & Punch Tape strip -->
                        <div class="v66-console-right">
                            <div class="v66-bulbs-grid">
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb green on" id="v66-bulb-1"></div>
                                    <span class="v66-bulb-label">SYS OK</span>
                                </div>
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb amber" id="v66-bulb-2"></div>
                                    <span class="v66-bulb-label">STBY</span>
                                </div>
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb red" id="v66-bulb-3"></div>
                                    <span class="v66-bulb-label">FAIL</span>
                                </div>
                            </div>
                            
                            <!-- Tape reader mockup -->
                            <div class="v66-tape-reader">
                                <div class="v66-paper-tape-strip" id="v66-intro-tape">
                                    <div class="v66-tape-holes"></div>
                                </div>
                                <span style="position:absolute; top:8px; left:12px; font-family:monospace; font-size:11px; color:#a1a1aa; font-weight:bold; z-index:10;">PUNCHED CARD READER</span>
                            </div>
                        </div>
                        
                        <!-- Flying moth -->
                        <div class="v66-moth" id="v66-intro-moth">
                            <div class="v66-moth-wings"></div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 2: Harvard Mark II cabinet representation (8 Relays)
        else if (slideId === 'slide_bug_accident') {
            let gridHTML = '<div class="v66-relay-grid">';
            for (let i = 1; i <= 8; i++) {
                gridHTML += `
                    <div class="v66-relay-cell" id="v66-cabinet-relay-${i}">
                        <span class="v66-relay-label">RLY ${60 + i}</span>
                        <span class="v66-relay-status">ON</span>
                    </div>
                `;
            }
            gridHTML += '</div>';

            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-rack-cabinet">
                        <div class="v66-cabinet-hdr">
                            <span>CABINET SECTOR 03-F</span>
                            <span>VOLTAGE: 120V (STEADY)</span>
                        </div>
                        ${gridHTML}
                    </div>
                </div>
            `);
        }

        // Slide 3: 1947 Console Panel Glitch / Crash
        else if (slideId === 'slide_bug_glitch') {
            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-retro-console" style="border-color:#7f1d1d;">
                        <div class="v66-console-rivet tl"></div>
                        <div class="v66-console-rivet tr"></div>
                        <div class="v66-console-rivet bl"></div>
                        <div class="v66-console-rivet br"></div>
                        
                        <!-- Left Panel: Dial Gauge & Heavy Switches -->
                        <div class="v66-console-left">
                            <div class="v66-gauge-container">
                                <div class="v66-gauge-face">
                                    <div class="v66-gauge-markings"></div>
                                    <div class="v66-gauge-label val0">0V</div>
                                    <div class="v66-gauge-label val60">60V</div>
                                    <div class="v66-gauge-label val120">120V</div>
                                    <div class="v66-gauge-needle" id="v66-glitch-needle" style="transform: rotate(60deg);"></div>
                                    <div class="v66-gauge-center" style="top:68px; left:68px;"></div>
                                    <div class="v66-gauge-title">LINE VOLTS</div>
                                </div>
                            </div>
                            
                            <div class="v66-switch-row">
                                <div class="v66-retro-switch-item">
                                    <span class="v66-switch-label">MASTER</span>
                                    <div class="v66-switch-body on" id="v66-switch-master-glitch">
                                        <div class="v66-switch-toggle"></div>
                                    </div>
                                </div>
                                <div class="v66-retro-switch-item">
                                    <span class="v66-switch-label">COILS</span>
                                    <div class="v66-switch-body on" id="v66-switch-coils-glitch">
                                        <div class="v66-switch-toggle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Indicator Bulbs & Punch Tape strip -->
                        <div class="v66-console-right">
                            <div class="v66-bulbs-grid">
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb green on" id="v66-bulb-1-glitch"></div>
                                    <span class="v66-bulb-label">SYS OK</span>
                                </div>
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb amber" id="v66-bulb-2-glitch"></div>
                                    <span class="v66-bulb-label">STBY</span>
                                </div>
                                <div class="v66-bulb-item">
                                    <div class="v66-bulb red" id="v66-bulb-3-glitch"></div>
                                    <span class="v66-bulb-label">FAIL</span>
                                </div>
                            </div>
                            
                            <!-- Tape reader mockup -->
                            <div class="v66-tape-reader">
                                <div class="v66-paper-tape-strip" id="v66-glitch-tape">
                                    <div class="v66-tape-holes"></div>
                                </div>
                                <span style="position:absolute; top:8px; left:12px; font-family:monospace; font-size:11px; color:#ef4444; font-weight:bold; z-index:10;">INSTRUCTION JAMMED</span>
                            </div>
                        </div>
                        
                        <!-- Flashing red danger overlay -->
                        <div class="v66-glitch-overlay" id="v66-glitch-flash-el">POWER DROP!</div>
                    </div>
                </div>
            `);
        }

        // Slide 4: Dò tìm Panel F - Relay 70 Grid
        else if (slideId === 'slide_bug_relay') {
            let gridHTML = '<div class="v66-relay-grid">';
            const relays = [
                { id: '67', label: 'RELAY 67', state: 'active' },
                { id: '68', label: 'RELAY 68', state: 'active' },
                { id: '69', label: 'RELAY 69', state: 'active' },
                { id: '70', label: 'RELAY 70', state: 'error' },
                { id: '71', label: 'RELAY 71', state: 'inactive' },
                { id: '72', label: 'RELAY 72', state: 'inactive' },
                { id: '73', label: 'RELAY 73', state: 'inactive' },
                { id: '74', label: 'RELAY 74', state: 'inactive' }
            ];

            relays.forEach(r => {
                const cls = r.state === 'active' ? 'active' : (r.state === 'error' ? 'error' : '');
                const txt = r.state === 'active' ? 'ON' : (r.state === 'error' ? 'STUCK' : 'OFF');
                gridHTML += `
                    <div class="v66-relay-cell ${cls}" id="v66-relay-${r.id}">
                        <span class="v66-relay-label">${r.label}</span>
                        <span class="v66-relay-status">${txt}</span>
                    </div>
                `;
            });
            gridHTML += '</div>';

            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-rack-cabinet" style="border-color:#b91c1c;">
                        <div class="v66-cabinet-hdr" style="color:#ef4444;">
                            <span>INSPECTING PANEL F (RELAYS)</span>
                            <span style="font-weight:900; color:#ef4444;">⚠️ ERROR DETECTED</span>
                        </div>
                        ${gridHTML}
                    </div>
                </div>
            `);
        }

        // Slide 5: Zoomed-in Mechanical Relay with Moth & Sparks
        else if (slideId === 'slide_bug_culprit') {
            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-relay-zoom-box">
                        <!-- Left Electromagnet Coil -->
                        <div class="v66-coils">
                            <span>COILS L1</span>
                            <div class="v66-copper-wire"></div>
                            <div class="v66-copper-wire"></div>
                            <div class="v66-copper-wire"></div>
                            <span>120V ELECTROMAGNET</span>
                        </div>

                        <!-- Relay Arm and contact points -->
                        <div style="display:flex; flex-direction:column; align-items:flex-start; position:relative; height:240px; width:340px; justify-content: space-between; margin-left: 20px;">
                            <div class="v66-switch-arm" id="v66-relay-arm" style="position:absolute; top:20px; left:0;">
                                <div class="v66-switch-contact" style="right:0; top:-14px;"></div>
                            </div>
                            
                            <div class="v66-switch-contact" style="position:absolute; bottom:40px; right:0;" id="v66-contact-fixed"></div>
                            
                            <!-- Moth getting trapped -->
                            <svg class="v66-moth-trapped" id="v66-trapped-moth" viewBox="0 0 64 64" style="position:absolute; right:-5px; bottom:55px; width:54px; height:54px; transform: rotate(45deg); z-index: 10;">
                                <path d="M32 16 L20 40 L32 32 L44 40 Z" fill="#92400e" />
                                <circle cx="32" cy="22" r="6" fill="#78350f" />
                                <path d="M12 28 C20 28, 20 20, 32 24 C32 24, 44 20, 52 28" stroke="#f59e0b" stroke-width="2" fill="none" />
                            </svg>
                        </div>
                        
                        <!-- Electrical sparks -->
                        <div class="v66-sparks" id="v66-sparks-container" style="right: 55px; top: 155px;">
                            <div class="v66-spark-line" style="transform: rotate(0deg);"></div>
                            <div class="v66-spark-line" style="transform: rotate(45deg);"></div>
                            <div class="v66-spark-line" style="transform: rotate(135deg);"></div>
                            <div class="v66-spark-line" style="transform: rotate(270deg);"></div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Slide 6: Yellowed Diary Logbook
        else if (slideId === 'slide_bug_history') {
            canvas.innerHTML = sceneWrap(`
                <div class="v66-scene-row">
                    <div class="v66-logbook-card">
                        <div class="v66-logbook-hdr">
                            <span>HARVARD UNIVERSITY - MARK II LOGBOOK</span>
                            <span>SEPTEMBER 9, 1947</span>
                        </div>
                        <div class="v66-logbook-body">
                            <p style="color:#b45309; font-weight:900;">0800 - System startup</p>
                            <p>0900 - Relay #70 Panel F failed.</p>
                            <p>1100 - Found moth in relay.</p>
                            <p style="font-style:italic; font-size:22px; margin-top:20px; color:#1c1917; font-weight:900; font-family:'Courier New', Courier, monospace;">
                                "First actual case of bug being found."
                            </p>
                        </div>
                        
                        <!-- Tape and Moth photo -->
                        <div class="v66-logbook-photo" id="v66-logbook-photo">
                            <img src="/static/first_bug.jpg" id="v66-photo-img" style="filter: sepia(1) contrast(1.2);" />
                            <span class="v66-photo-caption">The First Bug (1947)</span>
                        </div>
                        <div class="v66-tape" id="v66-logbook-tape"></div>
                    </div>
                </div>
            `);
            
            const photoImg = canvas.querySelector('#v66-photo-img');
            if (photoImg) {
                photoImg.onerror = function() {
                    this.style.background = '#331100';
                };
            }
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── FRAME UPDATE ANIMATIONS ────────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const row = canvas.querySelector('.v66-scene-row');
        if (!row) return;

        // Slide 1: Moth flies in chaotic paths, console paper tape rolls, needle fluctuates at 120V
        if (slideId === 'slide_bug_intro') {
            const moth = row.querySelector('#v66-intro-moth');
            const needle = row.querySelector('#v66-intro-needle');
            const tape = row.querySelector('#v66-intro-tape');
            
            if (moth) {
                const t = progress * Math.PI * 4;
                const x = 320 + Math.sin(t) * 200 + Math.cos(t * 1.5) * 50;
                const y = 140 + Math.cos(t) * 90 + Math.sin(t * 2.3) * 40;
                moth.style.left = `${x}px`;
                moth.style.top = `${y}px`;
                
                const wings = moth.querySelector('.v66-moth-wings');
                if (wings) {
                    wings.style.animationDuration = `${0.04 + progress * 0.1}s`;
                }
            }
            
            // Fluctuating needle near 120V (60 degrees)
            if (needle) {
                const angle = 60 + Math.sin(progress * 100) * 1.5;
                needle.style.transform = `rotate(${angle}deg)`;
            }
            
            // Move instruction paper card tape
            if (tape) {
                const tx = -(progress * 150) % 100;
                tape.style.left = `${tx}px`;
            }
        }

        // Slide 2: Cabinet relays blinking ON/OFF
        else if (slideId === 'slide_bug_accident') {
            for (let i = 1; i <= 8; i++) {
                const el = row.querySelector(`#v66-cabinet-relay-${i}`);
                if (el) {
                    const active = Math.sin(progress * 30 + i) > -0.2;
                    if (active) {
                        el.classList.add('active');
                        el.querySelector('.v66-relay-status').textContent = 'ON';
                    } else {
                        el.classList.remove('active');
                        el.querySelector('.v66-relay-status').textContent = 'OFF';
                    }
                }
            }
        }

        // Slide 3: Console Panel Glitch / Voltage Crash
        else if (slideId === 'slide_bug_glitch') {
            const needle = row.querySelector('#v66-glitch-needle');
            const flashOverlay = row.querySelector('#v66-glitch-flash-el');
            const switchMaster = row.querySelector('#v66-switch-master-glitch');
            const switchCoils = row.querySelector('#v66-switch-coils-glitch');
            const bulb1 = row.querySelector('#v66-bulb-1-glitch');
            const bulb3 = row.querySelector('#v66-bulb-3-glitch');
            const tape = row.querySelector('#v66-glitch-tape');
            
            if (progress < 0.4) {
                // System is running normally
                if (needle) needle.style.transform = `rotate(${60 + Math.sin(progress * 80) * 1.5}deg)`;
                if (switchMaster) switchMaster.className = 'v66-switch-body on';
                if (switchCoils) switchCoils.className = 'v66-switch-body on';
                if (bulb1) bulb1.className = 'v66-bulb green on';
                if (bulb3) bulb3.className = 'v66-bulb red';
                if (tape) {
                    const tx = -(progress * 150) % 100;
                    tape.style.left = `${tx}px`;
                }
                if (flashOverlay) flashOverlay.style.opacity = '0';
            } else {
                // System crashes! Voltage drops to 0V (needle angle rotates to -60deg)
                const crashProg = Math.min(1.0, (progress - 0.4) / 0.2); // drop in 0.2s
                const angle = 60 - crashProg * 120; // from 60 to -60 degrees
                if (needle) needle.style.transform = `rotate(${angle}deg)`;
                
                // Toggle switch clicks OFF
                if (switchMaster) switchMaster.className = 'v66-switch-body off';
                if (switchCoils) switchCoils.className = 'v66-switch-body off';
                
                // Bulbs update: SYS OK goes off, FAIL bulb lights up
                if (bulb1) bulb1.className = 'v66-bulb green';
                
                // Flashing FAIL bulb
                if (bulb3) {
                    const blink = Math.sin(progress * 50) > 0;
                    if (blink) bulb3.className = 'v66-bulb red on';
                    else bulb3.className = 'v66-bulb red';
                }
                
                // Paper tape reader freezes
                if (tape) {
                    const tx = -(0.4 * 150) % 100;
                    tape.style.left = `${tx}px`;
                }
                
                // Flashing red glitch alert overlay
                if (flashOverlay) {
                    const flash = Math.sin(progress * 60) > 0.2;
                    flashOverlay.style.opacity = flash ? '0.7' : '0.1';
                }
            }
        }

        // Slide 4: Dò tìm Panel F - Relay 70 Grid
        else if (slideId === 'slide_bug_relay') {
            const relays = ['67', '68', '69', '71', '72', '73', '74'];
            relays.forEach(id => {
                const el = row.querySelector(`#v66-relay-${id}`);
                if (el) {
                    const tick = Math.sin(progress * 25 + parseInt(id)) > 0;
                    if (tick) {
                        el.classList.add('active');
                        el.querySelector('.v66-relay-status').textContent = 'ON';
                    } else {
                        el.classList.remove('active');
                        el.querySelector('.v66-relay-status').textContent = 'OFF';
                    }
                }
            });
            
            const errorRelay = row.querySelector('#v66-relay-70');
            if (errorRelay) {
                const flash = Math.round(progress * 15) % 2 === 0;
                errorRelay.style.borderColor = flash ? '#ef4444' : '#7f1d1d';
                errorRelay.style.boxShadow = flash ? '0 0 15px rgba(239,68,68,0.4)' : '0 0 5px rgba(239,68,68,0.1)';
            }
        }

        // Slide 5: Switch closes and traps the moth, making electrical sparks
        else if (slideId === 'slide_bug_culprit') {
            const arm = row.querySelector('#v66-relay-arm');
            const moth = row.querySelector('#v66-trapped-moth');
            const sparks = row.querySelector('#v66-sparks-container');
            
            if (arm && moth) {
                if (progress < 0.5) {
                    const normProg = progress / 0.5;
                    const mx = 200 - normProg * 200;
                    const my = 150 - normProg * 95;
                    moth.style.opacity = normProg;
                    moth.style.transform = `translate(${mx}px, ${my}px) rotate(${normProg * 90}deg)`;
                    
                    arm.style.transform = 'rotate(-25deg)';
                    if (sparks) sparks.style.opacity = '0';
                } 
                else if (progress >= 0.5 && progress < 0.65) {
                    const normProg = (progress - 0.5) / 0.15;
                    const rot = -25 + normProg * 19; // closes almost completely
                    arm.style.transform = `rotate(${rot}deg)`;
                    
                    moth.style.opacity = 1;
                    moth.style.transform = 'translate(0px, 55px) scale(0.9) rotate(35deg)';
                    if (sparks) sparks.style.opacity = '0';
                }
                else {
                    // Arm is stuck due to the moth (rotated at -6deg instead of fully closed 0deg)
                    arm.style.transform = 'rotate(-6deg)';
                    moth.style.opacity = 1;
                    moth.style.transform = 'translate(0px, 55px) scale(0.85) rotate(35deg)';
                    
                    // Show flashing sparks!
                    if (sparks) {
                        const flash = Math.sin(progress * 70) > 0.2;
                        sparks.style.opacity = flash ? '1' : '0.1';
                        const lines = sparks.querySelectorAll('.v66-spark-line');
                        lines.forEach(line => {
                            line.style.transform = `rotate(${Math.random() * 360}deg) scaleX(${0.5 + Math.random() * 0.7})`;
                        });
                    }
                }
            }
        }

        // Slide 6: Photo and Tape slide-in on Logbook
        else if (slideId === 'slide_bug_history') {
            const photo = row.querySelector('#v66-logbook-photo');
            const tape = row.querySelector('#v66-logbook-tape');
            
            if (photo && tape) {
                if (progress < 0.8) {
                    const normProg = progress / 0.8;
                    const val = -120 + normProg * 140;
                    photo.style.transform = `translateX(${val}px) rotate(3deg)`;
                    photo.style.opacity = normProg;
                    tape.style.opacity = normProg;
                    tape.style.transform = `translateX(${val}px) rotate(-15deg)`;
                } else {
                    photo.style.transform = 'translateX(20px) rotate(3deg)';
                    photo.style.opacity = 1;
                    tape.style.opacity = 1;
                    tape.style.transform = 'translateX(20px) rotate(-15deg)';
                }
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video66',
        topic: 'Nguồn gốc từ Bug',
        episodeNum: 66,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video66 Plugin] Loaded: Transparent CRT & Relay UI Upgrade.');
})();
