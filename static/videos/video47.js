/**
 * Video 47: Đừng dùng Auto-Increment ID làm Primary Key!
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video47
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_active_1: [
            { text: 'auto-increment id', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'dò quét', start: 6.0, end: 12.0, class: 'active-bad' },
            { text: 'idor', start: 12.0, end: 19.0, class: 'active-bad' }
        ],
        slide_active_2: [
            { text: 'phân tán', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'trùng lặp', start: 6.0, end: 12.0, class: 'active-bad' },
            { text: 'xung đột', start: 12.0, end: 19.0, class: 'active-bad' }
        ],
        slide_active_3: [
            { text: 'ulid', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'timestamp', start: 6.0, end: 12.0, class: 'active-good' },
            { text: 'sắp xếp', start: 12.0, end: 21.0, class: 'active-gold' }
        ],
        slide_active_4: [
            { text: 'bảo mật', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'tốc độ ghi', start: 6.0, end: 12.0, class: 'active-gold' },
            { text: 'hoàn hảo', start: 12.0, end: 21.0, class: 'active-good' }
        ]
    };

    const customSlideIds = [
        'slide_active_1',
        'slide_active_2',
        'slide_active_3',
        'slide_active_4'
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_active_1') {
            canvas.innerHTML = `
                <div class="v47-slide-container">
                    <div class="v47-browser-card v47-glass">
                        <!-- Browser address bar -->
                        <div class="v47-address-bar" id="s1-address-bar">
                            <i data-lucide="globe" style="width: 20px; height: 20px;"></i>
                            <span>https://api.myapp.com/v1/users/<span class="v47-address-id" id="s1-addr-id">99</span></span>
                        </div>

                        <!-- User Profile display card -->
                        <div class="v47-user-profile" id="s1-user-profile">
                            <img class="v47-user-avatar" id="s1-user-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" alt="Avatar">
                            <div class="v47-user-info">
                                <h4 id="s1-user-name">Alex Smith</h4>
                                <p id="s1-user-email">Email: alex.smith@example.com</p>
                                <p id="s1-user-phone">Phone: +84 901 234 567</p>
                                <p id="s1-user-status" style="color: #10b981; font-weight: bold;">Status: Active Member</p>
                            </div>

                            <!-- Floating vulnerability badge -->
                            <div class="v47-idor-badge" id="s1-idor-badge">
                                IDOR Attack Exposed!
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_2') {
            canvas.innerHTML = `
                <div class="v47-slide-container">
                    <div class="v47-collision-scene">
                        <!-- Left Node: Hanoi Server -->
                        <div class="v47-server-node v47-glass" id="s2-srv-hanoi">
                            <i data-lucide="server" style="width: 32px; height: 32px; color: #fbbf24;"></i>
                            <span class="v47-server-title">Server Hà Nội</span>
                            <span class="v47-server-id">ID: 100</span>
                        </div>

                        <!-- Central Database node -->
                        <div class="v47-center-db" id="s2-db">
                            <i data-lucide="database" style="width: 48px; height: 48px; color: #10b981;" id="s2-db-icon"></i>
                            <span style="font-size: 16px; font-weight: bold; color: #fff;">Main Database</span>
                            <span class="v47-db-status" id="s2-db-status">DB OK</span>
                        </div>

                        <!-- Collision Lightning Bolt -->
                        <i data-lucide="zap" class="v47-collision-bolt" id="s2-bolt"></i>

                        <!-- Right Node: Saigon Server -->
                        <div class="v47-server-node v47-glass" id="s2-srv-saigon">
                            <i data-lucide="server" style="width: 32px; height: 32px; color: #fbbf24;"></i>
                            <span class="v47-server-title">Server Sài Gòn</span>
                            <span class="v47-server-id">ID: 100</span>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_3') {
            canvas.innerHTML = `
                <div class="v47-slide-container">
                    <div class="v47-ulid-box">
                        <!-- ULID layout diagram -->
                        <div class="v47-ulid-card">
                            <div class="v47-ulid-part timestamp" id="s3-part-time">
                                <span class="v47-ulid-header">Timestamp (48-bit)</span>
                                <span class="v47-ulid-val">01HQV5M</span>
                                <span class="v47-ulid-desc">Tự sắp xếp theo thời gian</span>
                            </div>
                            <div class="v47-ulid-part randomness" id="s3-part-rand">
                                <span class="v47-ulid-header">Randomness (80-bit)</span>
                                <span class="v47-ulid-val">9F6KB8T...</span>
                                <span class="v47-ulid-desc">Ngẫu nhiên, duy nhất</span>
                            </div>
                        </div>

                        <!-- Sorted list simulator -->
                        <div class="v47-sorting-grid">
                            <div class="v47-sort-row" id="s3-row-1">
                                <span>ULID #1: 01HQV5M17A...</span>
                                <span style="color:#10b981; font-weight:800;">Time: 12:00:01</span>
                            </div>
                            <div class="v47-sort-row" id="s3-row-2">
                                <span>ULID #2: 01HQV5M18B...</span>
                                <span style="color:#10b981; font-weight:800;">Time: 12:00:02</span>
                            </div>
                            <div class="v47-sort-row" id="s3-row-3">
                                <span>ULID #3: 01HQV5M19C...</span>
                                <span style="color:#10b981; font-weight:800;">Time: 12:00:03</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_active_4') {
            canvas.innerHTML = `
                <div class="v47-slide-container">
                    <div class="v47-compare-split">
                        <!-- Left Card: Auto-Increment ID -->
                        <div class="v47-compare-panel rest-panel" id="panel-auto">
                            <div class="v47-panel-header">
                                <i data-lucide="hash"></i>
                                <span>AUTO-INCREMENT ID</span>
                            </div>
                            <div class="v47-panel-specs">
                                <div class="v47-spec-item bad" id="auto-spec-security">
                                    <span class="v47-spec-title">BẢO MẬT</span>
                                    <span class="v47-spec-val">❌ Kém (Dễ đoán, dễ bị IDOR)</span>
                                </div>
                                <div class="v47-spec-item bad" id="auto-spec-dist">
                                    <span class="v47-spec-title">HỆ PHÂN TÁN</span>
                                    <span class="v47-spec-val">❌ Dễ xung đột khóa chính</span>
                                </div>
                                <div class="v47-spec-item good" id="auto-spec-speed">
                                    <span class="v47-spec-title">TỐC ĐỘ GHI DATABASE</span>
                                    <span class="v47-spec-val">✅ Nhanh (Ghi tuần tự)</span>
                                </div>
                                <div class="v47-spec-item good" id="auto-spec-sort">
                                    <span class="v47-spec-title">TÍNH THỨ TỰ</span>
                                    <span class="v47-spec-val">✅ Có (Tự tăng dần)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Card: ULID -->
                        <div class="v47-compare-panel ulid-panel" id="panel-ulid">
                            <div class="v47-panel-header">
                                <i data-lucide="shield"></i>
                                <span>ULID (RECOMMENDED)</span>
                            </div>
                            <div class="v47-panel-specs">
                                <div class="v47-spec-item good" id="ulid-spec-security">
                                    <span class="v47-spec-title">BẢO MẬT</span>
                                    <span class="v47-spec-val">✅ Cao (Ngẫu nhiên hóa)</span>
                                </div>
                                <div class="v47-spec-item good" id="ulid-spec-dist">
                                    <span class="v47-spec-title">HỆ PHÂN TÁN</span>
                                    <span class="v47-spec-val">✅ An toàn (Duy nhất toàn cầu)</span>
                                </div>
                                <div class="v47-spec-item good" id="ulid-spec-speed">
                                    <span class="v47-spec-title">TỐC ĐỘ GHI DATABASE</span>
                                    <span class="v47-spec-val">✅ Nhanh (TimeStamp đầu)</span>
                                </div>
                                <div class="v47-spec-item good" id="ulid-spec-sort">
                                    <span class="v47-spec-title">TÍNH THỨ TỰ</span>
                                    <span class="v47-spec-val">✅ Có (Sắp xếp thời gian)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ node: canvas });
        }
    }

    // ── ANIMATION FRAME UPDATOR ───────────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        if (slideId === 'slide_active_1') {
            const addrBar = canvas.querySelector('#s1-address-bar');
            const addrId = canvas.querySelector('#s1-addr-id');
            const profile = canvas.querySelector('#s1-user-profile');
            const avatar = canvas.querySelector('#s1-user-avatar');
            const nameEl = canvas.querySelector('#s1-user-name');
            const emailEl = canvas.querySelector('#s1-user-email');
            const phoneEl = canvas.querySelector('#s1-user-phone');
            const statusEl = canvas.querySelector('#s1-user-status');
            const badge = canvas.querySelector('#s1-idor-badge');

            if (progress <= 0.40) {
                // Phase 1: Normal request at ID 99
                if (addrBar) addrBar.classList.remove('danger-border');
                if (addrId) { addrId.textContent = '99'; addrId.classList.remove('danger-text'); }
                if (profile) profile.classList.remove('exposed');
                if (avatar) avatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                if (nameEl) nameEl.textContent = "Alex Smith";
                if (emailEl) emailEl.textContent = "Email: alex.smith@example.com";
                if (phoneEl) phoneEl.textContent = "Phone: +84 901 234 567";
                if (statusEl) { statusEl.textContent = "Status: Active Member"; statusEl.style.color = "#10b981"; }
                if (badge) badge.style.display = 'none';
            }
            else if (progress > 0.40 && progress <= 0.75) {
                // Phase 2: Hacker changes ID to 100
                if (addrBar) addrBar.classList.add('danger-border');
                if (addrId) { addrId.textContent = '100'; addrId.classList.add('danger-text'); }
                if (profile) profile.classList.add('exposed');
                
                // Show a different user's exposed data
                if (avatar) avatar.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
                if (nameEl) nameEl.textContent = "Jane Miller (Different User)";
                if (emailEl) emailEl.textContent = "Email: jane.miller_private@example.com";
                if (phoneEl) phoneEl.textContent = "Phone: +84 988 888 999";
                if (statusEl) { statusEl.textContent = "EXPOSED: Private Bank Details"; statusEl.style.color = "#ef4444"; }
                if (badge) badge.style.display = 'none';
            }
            else {
                // Phase 3: Vulnerability badge flashes
                if (addrBar) addrBar.classList.add('danger-border');
                if (addrId) { addrId.textContent = '100'; addrId.classList.add('danger-text'); }
                if (profile) profile.classList.add('exposed');
                if (badge) badge.style.display = 'block';
            }
        }
        else if (slideId === 'slide_active_2') {
            const hanoiNode = canvas.querySelector('#s2-srv-hanoi');
            const saigonNode = canvas.querySelector('#s2-srv-saigon');
            const dbNode = canvas.querySelector('#s2-db');
            const dbIcon = canvas.querySelector('#s2-db-icon');
            const dbStatus = canvas.querySelector('#s2-db-status');
            const bolt = canvas.querySelector('#s2-bolt');

            // Reset
            if (hanoiNode) hanoiNode.classList.remove('active');
            if (saigonNode) saigonNode.classList.remove('active');
            if (dbNode) dbNode.classList.remove('collision-shake');
            if (dbIcon) { dbIcon.style.color = '#10b981'; dbIcon.setAttribute('data-lucide', 'database'); }
            if (dbStatus) { dbStatus.textContent = 'DB OK'; }
            if (bolt) { bolt.style.display = 'none'; }

            if (progress <= 0.35) {
                // Phase 1: Both nodes generate same ID
                if (hanoiNode) hanoiNode.classList.add('active');
                if (saigonNode) saigonNode.classList.add('active');
            }
            else if (progress > 0.35 && progress <= 0.70) {
                // Phase 2: Transmit state (Server nodes flash)
                if (hanoiNode) hanoiNode.classList.add('active');
                if (saigonNode) saigonNode.classList.add('active');
                if (dbStatus) { dbStatus.textContent = 'SYNCING...'; }
            }
            else {
                // Phase 3: Collision at Main DB
                if (dbNode) dbNode.classList.add('collision-shake');
                if (dbIcon) { dbIcon.style.color = '#ef4444'; }
                if (dbStatus) { dbStatus.textContent = 'COLLISION ERROR!'; }
                if (bolt) { bolt.style.display = 'block'; }
            }
        }
        else if (slideId === 'slide_active_3') {
            const partTime = canvas.querySelector('#s3-part-time');
            const partRand = canvas.querySelector('#s3-part-rand');
            const row1 = canvas.querySelector('#s3-row-1');
            const row2 = canvas.querySelector('#s3-row-2');
            const row3 = canvas.querySelector('#s3-row-3');

            // Reset
            [partTime, partRand].forEach(p => { if (p) p.classList.remove('active'); });
            [row1, row2, row3].forEach(r => { if (r) r.classList.remove('highlight'); });

            if (progress <= 0.35) {
                // Phase 1: Highlight timestamp component
                if (partTime) partTime.classList.add('active');
            }
            else if (progress > 0.35 && progress <= 0.70) {
                // Phase 2: Highlight randomness component
                if (partRand) partRand.classList.add('active');
            }
            else {
                // Phase 3: Animate sorted ULID rows sequential highlights
                if (partTime) partTime.classList.add('active');
                if (partRand) partRand.classList.add('active');
                
                const t = (progress - 0.70) / 0.30; // 0 to 1
                if (t > 0.1 && row1) row1.classList.add('highlight');
                if (t > 0.45 && row2) row2.classList.add('highlight');
                if (t > 0.8 && row3) row3.classList.add('highlight');
            }
        }
        else if (slideId === 'slide_active_4') {
            const autoSec = canvas.querySelector('#auto-spec-security');
            const ulidSec = canvas.querySelector('#ulid-spec-security');
            const autoDist = canvas.querySelector('#auto-spec-dist');
            const ulidDist = canvas.querySelector('#ulid-spec-dist');
            const autoSpeed = canvas.querySelector('#auto-spec-speed');
            const ulidSpeed = canvas.querySelector('#ulid-spec-speed');
            const autoSort = canvas.querySelector('#auto-spec-sort');
            const ulidSort = canvas.querySelector('#ulid-spec-sort');

            // Reset highlights
            [autoSec, ulidSec, autoDist, ulidDist, autoSpeed, ulidSpeed, autoSort, ulidSort].forEach(el => {
                if (el) el.classList.remove('active-spec');
            });

            if (progress <= 0.11) {
                // Intro frame: no highlights
            }
            else if (progress > 0.11 && progress <= 0.36) {
                // Phase 1: Security
                if (autoSec) autoSec.classList.add('active-spec');
                if (ulidSec) ulidSec.classList.add('active-spec');
            }
            else if (progress > 0.36 && progress <= 0.55) {
                // Phase 2: Distributed
                if (autoDist) autoDist.classList.add('active-spec');
                if (ulidDist) ulidDist.classList.add('active-spec');
            }
            else if (progress > 0.55 && progress <= 0.80) {
                // Phase 3: Write Speed & Sorting
                if (autoSpeed) autoSpeed.classList.add('active-spec');
                if (ulidSpeed) ulidSpeed.classList.add('active-spec');
                if (autoSort) autoSort.classList.add('active-spec');
                if (ulidSort) ulidSort.classList.add('active-spec');
            }
            else {
                // Wrap up: Highlight all specs
                [autoSec, ulidSec, autoDist, ulidDist, autoSpeed, ulidSpeed, autoSort, ulidSort].forEach(el => {
                    if (el) el.classList.add('active-spec');
                });
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video47',
        topic: 'Database Security'
    };

    console.log('[Video47 Plugin] Loaded: Auto-Increment ID Primary Key comparison plugin loaded.');
})();
