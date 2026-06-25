/**
 * Video 46: RESTful vs GraphQL (Sự khác biệt cốt lõi)
 * Plugin file - chứa toàn bộ slide hoạt ảnh/HTML cho video46
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_api_1: [
            { text: 'restful', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'graphql', start: 6.0, end: 12.0, class: 'active-good' },
            { text: 'combo', start: 12.0, end: 16.0, class: 'active-bad' },
            { text: 'tự do chọn', start: 16.0, end: 20.0, class: 'active-good' }
        ],
        slide_api_2: [
            { text: 'combo đóng sẵn', start: 1.0, end: 6.0, class: 'active-bad' },
            { text: 'over-fetching', start: 6.0, end: 12.0, class: 'active-bad' },
            { text: 'lãng phí băng thông', start: 12.0, end: 18.0, class: 'active-bad' }
        ],
        slide_api_3: [
            { text: 'buffet tự chọn', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'chỉ định rõ', start: 6.0, end: 12.0, class: 'active-gold' },
            { text: 'tối ưu hóa', start: 12.0, end: 20.0, class: 'active-good' }
        ],
        slide_api_4: [
            { text: 'code', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'dư thừa', start: 6.0, end: 12.0, class: 'active-bad' },
            { text: 'vừa khít', start: 12.0, end: 18.0, class: 'active-good' }
        ],
        slide_api_5: [
            { text: 'caching', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'quá tải database', start: 6.0, end: 14.0, class: 'active-bad' },
            { text: 'lựa chọn nào', start: 14.0, end: 22.0, class: 'active-gold' }
        ]
    };

    const customSlideIds = [
        'slide_api_1',
        'slide_api_2',
        'slide_api_3',
        'slide_api_4',
        'slide_api_5'
    ];

    // ── GFX RENDER TEMPLATES ───────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (!needsTemplate) return;

        if (slideId === 'slide_api_1') {
            canvas.innerHTML = `
                <div class="v46-slide-container">
                    <div class="v46-intro-split">
                        <!-- RESTful (Combo Card) -->
                        <div class="v46-intro-card rest v46-glass" id="s1-card-rest">
                            <div class="v46-intro-icon-wrapper">
                                <div class="v46-intro-icon-glow"></div>
                                <span class="icon-placeholder" style="font-size: 130px; line-height: 1;">🍔</span>
                            </div>
                            <h3>RESTful API</h3>
                            <p>Phục vụ trọn gói Combo cố định định sẵn từ Server.</p>
                        </div>

                        <!-- GraphQL (Buffet Card) -->
                        <div class="v46-intro-card graphql v46-glass" id="s1-card-graphql">
                            <div class="v46-intro-icon-wrapper">
                                <div class="v46-intro-icon-glow"></div>
                                <span class="icon-placeholder" style="font-size: 130px; line-height: 1;">🥗</span>
                            </div>
                            <h3>GraphQL</h3>
                            <p>Tự do lựa chọn nguyên liệu. Client quyết định cấu trúc.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_api_2') {
            canvas.innerHTML = `
                <div class="v46-slide-container">
                    <div class="v46-restaurant-table-card">
                        <!-- Left Side: Speech Bubble -->
                        <div class="v46-client-narrative">
                            <div class="v46-bubble-speech" id="s2-speech">
                                Tôi chỉ ăn Hamburger thôi!
                            </div>
                            <div style="font-size: 15px; color: #94a3b8; font-weight: bold; margin-left: 10px;">
                                Client yêu cầu GET /burger
                            </div>
                        </div>

                        <!-- Right Side: Tray with items -->
                        <div class="v46-tray-container" id="s2-tray">
                            <span class="v46-tray-label">REST RESPONSE</span>
                            <div class="v46-food-item" id="s2-item-burger">
                                🍔
                                <span class="item-label">Hamburger</span>
                            </div>
                            <div class="v46-food-item extra" id="s2-item-fries">
                                🍟
                                <span class="item-label">Khoai Tây</span>
                            </div>
                            <div class="v46-food-item extra" id="s2-item-coke">
                                🥤
                                <span class="item-label">Nước Ngọt</span>
                            </div>
                        </div>

                        <!-- Trash Bin for waste -->
                        <div class="v46-trash-bin" id="s2-trash">
                            <i data-lucide="trash-2"></i>
                            <span>THÙNG RÁC</span>
                        </div>

                        <!-- Badge for Over-fetching -->
                        <div class="v46-overfetch-panel">
                            <div class="v46-badge-warning" id="s2-warning-badge" style="display:none;">OVER-FETCHING!</div>
                            <div style="font-size:14px; color:#ef4444; font-weight:bold; display:none;" id="s2-waste-txt">
                                +120KB Dữ Liệu Dư Thừa Bị Vứt Bỏ
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_api_3') {
            canvas.innerHTML = `
                <div class="v46-slide-container">
                    <div class="v46-buffet-scene-card">
                        <!-- Top: Shelf -->
                        <div class="v46-buffet-header">
                            <div style="font-size: 15px; color: #10b981; font-weight: bold; font-family: monospace;">
                                query { lettuce, tomato }
                            </div>
                            <div style="font-size: 15px; color: #888;">
                                Quầy nguyên liệu (Server Schema)
                            </div>
                        </div>

                        <div class="v46-buffet-shelf">
                            <div class="v46-shelf-item" id="s3-shelf-lettuce">
                                🥬
                                <span class="item-label">Rau cải</span>
                            </div>
                            <div class="v46-shelf-item" id="s3-shelf-tomato">
                                🍅
                                <span class="item-label">Cà chua</span>
                            </div>
                            <div class="v46-shelf-item" id="s3-shelf-onion">
                                🧅
                                <span class="item-label">Hành tây</span>
                            </div>
                            <div class="v46-shelf-item" id="s3-shelf-cheese">
                                🧀
                                <span class="item-label">Phô mai</span>
                            </div>
                        </div>

                        <!-- Salad Bowl & Dropping Items -->
                        <div class="v46-salad-bowl-container" id="s3-bowl-container">
                            <div class="v46-falling-item" id="s3-fall-lettuce">🥬</div>
                            <div class="v46-falling-item" id="s3-fall-tomato">🍅</div>

                            <div class="v46-salad-bowl">
                                <span class="v46-salad-bowl-label">Salad Bowl</span>
                            </div>
                        </div>

                        <!-- Exact match badge -->
                        <div class="v46-exact-fetch-badge" id="s3-exact-badge" style="display:none;">
                            EXACT MATCH: Chỉ Nhận 2KB Dữ Liệu!
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_api_4') {
            canvas.innerHTML = `
                <div class="v46-slide-container">
                    <div class="v46-code-split" style="position:relative;">
                        <!-- Overlay Neon Connector Lines -->
                        <div class="v46-neon-line" id="s4-neon-line-1"></div>
                        <div class="v46-neon-line" id="s4-neon-line-2"></div>

                        <!-- REST Panel -->
                        <div class="v46-code-card" id="s4-rest-card">
                            <div class="v46-code-body">
                                <span style="position: absolute; top: 16px; right: 16px; font-size: 12px; font-weight: 800; color: #ef4444; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); padding: 3px 10px; border-radius: 8px; letter-spacing: 0.5px;">RESTful</span>
                                fetch(<span class="string">'/user/1'</span>)<br><br>
                                {<br>
                                &nbsp;&nbsp;"id": 1,<br>
                                <span class="highlight-field" id="rest-f1">&nbsp;&nbsp;"name": "Alex",</span><br>
                                <span class="highlight-field" id="rest-f2">&nbsp;&nbsp;"email": "alex@g.com",</span><br>
                                <span class="highlight-field" id="rest-f3">&nbsp;&nbsp;"age": 28,</span><br>
                                <span class="highlight-field" id="rest-f4">&nbsp;&nbsp;"address": "Ha Noi",</span><br>
                                <span class="highlight-field" id="rest-f5">&nbsp;&nbsp;"history": [...]</span><br>
                                }
                            </div>
                        </div>

                        <!-- GraphQL Panel -->
                        <div class="v46-code-card" id="s4-graphql-card">
                            <div class="v46-code-body">
                                <span style="position: absolute; top: 16px; right: 16px; font-size: 12px; font-weight: 800; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 10px; border-radius: 8px; letter-spacing: 0.5px;">GraphQL</span>
                                query {<br>
                                &nbsp;&nbsp;user(id: 1) {<br>
                                <span class="highlight-field-green" id="gq-q1">&nbsp;&nbsp;&nbsp;&nbsp;name</span><br>
                                <span class="highlight-field-green" id="gq-q2">&nbsp;&nbsp;&nbsp;&nbsp;email</span><br>
                                &nbsp;&nbsp;}<br>
                                }<br><br>
                                {<br>
                                <span class="highlight-field-green" id="gq-r1">&nbsp;&nbsp;"name": "Alex",</span><br>
                                <span class="highlight-field-green" id="gq-r2">&nbsp;&nbsp;"email": "alex@g.com"</span><br>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (slideId === 'slide_api_5') {
            canvas.innerHTML = `
                <div class="v46-slide-container">
                    <div class="v46-compare-list">
                        <!-- Row 1: Over/Under-fetching -->
                        <div class="v46-compare-item" id="row-fetching">
                            <div class="v46-compare-label">
                                <i data-lucide="database" style="width:16px; height:16px; color:#fbbf24;"></i>
                                <span>Over/Under-fetching</span>
                            </div>
                            <div class="v46-compare-grid">
                                <div class="v46-compare-cell v46-cell-bad">
                                    <i data-lucide="x-circle"></i>
                                    <span>REST: Dư thừa dữ liệu</span>
                                </div>
                                <div class="v46-compare-cell v46-cell-good">
                                    <i data-lucide="check-circle"></i>
                                    <span>GraphQL: Vừa khít, chính xác</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 2: Endpoints -->
                        <div class="v46-compare-item" id="row-routing">
                            <div class="v46-compare-label">
                                <i data-lucide="git-branch" style="width:16px; height:16px; color:#fbbf24;"></i>
                                <span>Endpoints quản lý</span>
                            </div>
                            <div class="v46-compare-grid">
                                <div class="v46-compare-cell v46-cell-bad">
                                    <i data-lucide="x-circle"></i>
                                    <span>REST: Nhiều URL độc lập</span>
                                </div>
                                <div class="v46-compare-cell v46-cell-good">
                                    <i data-lucide="check-circle"></i>
                                    <span>GraphQL: 1 URL duy nhất</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 3: Caching -->
                        <div class="v46-compare-item" id="row-caching">
                            <div class="v46-compare-label">
                                <i data-lucide="refresh-cw" style="width:16px; height:16px; color:#fbbf24;"></i>
                                <span>Caching mặc định</span>
                            </div>
                            <div class="v46-compare-grid">
                                <div class="v46-compare-cell v46-cell-good">
                                    <i data-lucide="check-circle"></i>
                                    <span>REST: Cực tốt (HTTP Cache)</span>
                                </div>
                                <div class="v46-compare-cell v46-cell-bad">
                                    <i data-lucide="x-circle"></i>
                                    <span>GraphQL: Phức tạp</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 4: Setup & Learning -->
                        <div class="v46-compare-item" id="row-learning">
                            <div class="v46-compare-label">
                                <i data-lucide="book-open" style="width:16px; height:16px; color:#fbbf24;"></i>
                                <span>Học tập & Setup</span>
                            </div>
                            <div class="v46-compare-grid">
                                <div class="v46-compare-cell v46-cell-good">
                                    <i data-lucide="check-circle"></i>
                                    <span>REST: Đơn giản, phổ biến</span>
                                </div>
                                <div class="v46-compare-cell v46-cell-bad">
                                    <i data-lucide="x-circle"></i>
                                    <span>GraphQL: Phức tạp (Cần Schema)</span>
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
        if (slideId === 'slide_api_1') {
            const cardRest = canvas.querySelector('#s1-card-rest');
            const cardGraphQL = canvas.querySelector('#s1-card-graphql');

            if (cardRest) cardRest.classList.remove('active');
            if (cardGraphQL) cardGraphQL.classList.remove('active');

            if (progress <= 0.5) {
                // Focus RESTful card
                if (cardRest) cardRest.classList.add('active');
            } else {
                // Focus GraphQL card
                if (cardGraphQL) cardGraphQL.classList.add('active');
            }
        }
        else if (slideId === 'slide_api_2') {
            const speech = canvas.querySelector('#s2-speech');
            const tray = canvas.querySelector('#s2-tray');
            const trash = canvas.querySelector('#s2-trash');
            const warningBadge = canvas.querySelector('#s2-warning-badge');
            const wasteTxt = canvas.querySelector('#s2-waste-txt');

            const itemBurger = canvas.querySelector('#s2-item-burger');
            const itemFries = canvas.querySelector('#s2-item-fries');
            const itemCoke = canvas.querySelector('#s2-item-coke');

            // Reset states
            if (speech) speech.style.display = 'none';
            if (tray) { tray.style.display = 'none'; tray.classList.remove('active'); }
            if (trash) { trash.classList.remove('glow'); }
            if (warningBadge) warningBadge.style.display = 'none';
            if (wasteTxt) wasteTxt.style.display = 'none';

            if (itemBurger) { itemBurger.style.opacity = '1'; itemBurger.className = 'v46-food-item'; }
            if (itemFries) { itemFries.style.opacity = '1'; itemFries.className = 'v46-food-item extra'; itemFries.style.transform = 'none'; }
            if (itemCoke) { itemCoke.style.opacity = '1'; itemCoke.className = 'v46-food-item extra'; itemCoke.style.transform = 'none'; }

            if (progress <= 0.25) {
                // Phase 1: Client speaks (GET request)
                if (speech) {
                    speech.style.display = 'block';
                    speech.textContent = "Tôi chỉ ăn Hamburger thôi!";
                }
            }
            else if (progress > 0.25 && progress <= 0.55) {
                // Phase 2: Waiter serves the combo tray
                if (tray) {
                    tray.style.display = 'flex';
                    tray.classList.add('active');
                }
            }
            else if (progress > 0.55 && progress <= 0.85) {
                // Phase 3: Extra items slide down into trash bin
                if (tray) tray.style.display = 'flex';
                if (trash) trash.classList.add('glow');

                const t = (progress - 0.55) / 0.30;
                
                // Burger stays on tray. Fries and Coke slide and drop to trash bin.
                // Trash bin is at right: 25px, bottom: 25px. Tray is in center.
                // Translate values calculated relative to tray container
                const yTranslate = t * 155; // drop down
                const xTranslate = t * 90;  // slide right towards trash
                const opacityVal = 1 - (t * 0.7);

                if (itemFries) {
                    itemFries.style.transform = `translate(${xTranslate}px, ${yTranslate}px) scale(${1 - t*0.3})`;
                    itemFries.style.opacity = opacityVal;
                }
                if (itemCoke) {
                    itemCoke.style.transform = `translate(${xTranslate - 40}px, ${yTranslate}px) scale(${1 - t*0.3})`;
                    itemCoke.style.opacity = opacityVal;
                }
            }
            else {
                // Phase 4: Overfetching alert
                if (tray) tray.style.display = 'flex';
                if (itemFries) { itemFries.style.opacity = '0'; }
                if (itemCoke) { itemCoke.style.opacity = '0'; }
                if (warningBadge) warningBadge.style.display = 'block';
                if (wasteTxt) wasteTxt.style.display = 'block';
                if (trash) trash.classList.remove('glow');
            }
        }
        else if (slideId === 'slide_api_3') {
            const itemLettuce = canvas.querySelector('#s3-shelf-lettuce');
            const itemTomato = canvas.querySelector('#s3-shelf-tomato');
            const itemOnion = canvas.querySelector('#s3-shelf-onion');
            const itemCheese = canvas.querySelector('#s3-shelf-cheese');

            const fallLettuce = canvas.querySelector('#s3-fall-lettuce');
            const fallTomato = canvas.querySelector('#s3-fall-tomato');
            const exactBadge = canvas.querySelector('#s3-exact-badge');

            // Reset
            [itemLettuce, itemTomato, itemOnion, itemCheese].forEach(el => {
                if (el) el.className = 'v46-shelf-item';
            });
            if (fallLettuce) { fallLettuce.style.opacity = '0'; fallLettuce.style.transform = 'none'; }
            if (fallTomato) { fallTomato.style.opacity = '0'; fallTomato.style.transform = 'none'; }
            if (exactBadge) exactBadge.style.display = 'none';

            if (progress <= 0.25) {
                // Phase 1: Show raw shelf, highlighting query elements (lettuce & tomato)
                if (itemLettuce) itemLettuce.classList.add('selected');
                if (itemTomato) itemTomato.classList.add('selected');
                if (itemOnion) itemOnion.classList.add('unselected');
                if (itemCheese) itemCheese.classList.add('unselected');
            }
            else if (progress > 0.25 && progress <= 0.75) {
                // Phase 2: Lettuce and Tomato drop into the bowl
                if (itemLettuce) itemLettuce.classList.add('selected');
                if (itemTomato) itemTomato.classList.add('selected');
                if (itemOnion) itemOnion.classList.add('unselected');
                if (itemCheese) itemCheese.classList.add('unselected');

                const t = (progress - 0.25) / 0.50; // 0 to 1

                // Animate drop. Shelf is at top, bowl is at bottom.
                // Lettuce (left shelf index) falls to bowl left.
                // Tomato (second shelf index) falls to bowl right.
                if (fallLettuce) {
                    fallLettuce.style.opacity = '1';
                    const y = t * 140;
                    const x = 180 + t * 50;
                    fallLettuce.style.left = `${x}px`;
                    fallLettuce.style.top = `${y}px`;
                }
                if (fallTomato) {
                    fallTomato.style.opacity = '1';
                    const y = t * 140;
                    const x = 270 + t * 40;
                    fallTomato.style.left = `${x}px`;
                    fallTomato.style.top = `${y}px`;
                }
            }
            else {
                // Phase 3: exact match complete
                if (itemLettuce) itemLettuce.classList.add('selected');
                if (itemTomato) itemTomato.classList.add('selected');
                if (itemOnion) itemOnion.classList.add('unselected');
                if (itemCheese) itemCheese.classList.add('unselected');

                if (exactBadge) exactBadge.style.display = 'block';
                
                // Keep them inside the bowl
                if (fallLettuce) {
                    fallLettuce.style.opacity = '1';
                    fallLettuce.style.left = '230px';
                    fallLettuce.style.top = '140px';
                }
                if (fallTomato) {
                    fallTomato.style.opacity = '1';
                    fallTomato.style.left = '310px';
                    fallTomato.style.top = '140px';
                }
            }
        }
        else if (slideId === 'slide_api_4') {
            const restCard = canvas.querySelector('#s4-rest-card');
            const graphqlCard = canvas.querySelector('#s4-graphql-card');
            const neonLine1 = canvas.querySelector('#s4-neon-line-1');
            const neonLine2 = canvas.querySelector('#s4-neon-line-2');

            const rf1 = canvas.querySelector('#rest-f1');
            const rf2 = canvas.querySelector('#rest-f2');
            const rf3 = canvas.querySelector('#rest-f3');
            const rf4 = canvas.querySelector('#rest-f4');
            const rf5 = canvas.querySelector('#rest-f5');

            const gqq1 = canvas.querySelector('#gq-q1');
            const gqq2 = canvas.querySelector('#gq-q2');
            const gqr1 = canvas.querySelector('#gq-r1');
            const gqr2 = canvas.querySelector('#gq-r2');

            // Reset highlights
            [rf1, rf2, rf3, rf4, rf5, gqq1, gqq2, gqr1, gqr2].forEach(el => {
                if (el) el.style.background = 'none';
            });
            if (neonLine1) neonLine1.style.display = 'none';
            if (neonLine2) neonLine2.style.display = 'none';

            if (progress <= 0.5) {
                // Focus REST card
                if (restCard) {
                    restCard.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    restCard.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.15)';
                    restCard.style.transform = 'scale(1.02)';
                }
                if (graphqlCard) {
                    graphqlCard.style.borderColor = 'rgba(255,255,255,0.06)';
                    graphqlCard.style.boxShadow = 'none';
                    graphqlCard.style.transform = 'none';
                }
                
                // Highlight redundant fields
                if (progress > 0.2) {
                    if (rf3) rf3.style.background = 'rgba(239, 68, 68, 0.22)';
                    if (rf4) rf4.style.background = 'rgba(239, 68, 68, 0.22)';
                    if (rf5) rf5.style.background = 'rgba(239, 68, 68, 0.22)';
                }
            }
            else {
                // Focus GraphQL card
                if (restCard) {
                    restCard.style.borderColor = 'rgba(255,255,255,0.06)';
                    restCard.style.boxShadow = 'none';
                    restCard.style.transform = 'none';
                }
                if (graphqlCard) {
                    graphqlCard.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    graphqlCard.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.15)';
                    graphqlCard.style.transform = 'scale(1.02)';
                }

                if (gqq1) gqq1.style.background = 'rgba(16, 185, 129, 0.2)';
                if (gqq2) gqq2.style.background = 'rgba(16, 185, 129, 0.2)';
                if (gqr1) gqr1.style.background = 'rgba(16, 185, 129, 0.2)';
                if (gqr2) gqr2.style.background = 'rgba(16, 185, 129, 0.2)';

                // Draw connector lines
                if (progress > 0.75) {
                    const parentRect = canvas.querySelector('.v46-code-split').getBoundingClientRect();

                    if (neonLine1 && gqq1 && gqr1) {
                        neonLine1.style.display = 'block';
                        const rectQ = gqq1.getBoundingClientRect();
                        const rectR = gqr1.getBoundingClientRect();

                        const x1 = rectQ.right - parentRect.left;
                        const y1 = rectQ.top + rectQ.height / 2 - parentRect.top;
                        const x2 = rectR.left - parentRect.left;
                        const y2 = rectR.top + rectR.height / 2 - parentRect.top;

                        const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                        neonLine1.style.width = `${length}px`;
                        neonLine1.style.left = `${x1}px`;
                        neonLine1.style.top = `${y1}px`;
                        neonLine1.style.transform = `rotate(${angle}deg)`;
                    }

                    if (neonLine2 && gqq2 && gqr2) {
                        neonLine2.style.display = 'block';
                        const rectQ = gqq2.getBoundingClientRect();
                        const rectR = gqr2.getBoundingClientRect();

                        const x1 = rectQ.right - parentRect.left;
                        const y1 = rectQ.top + rectQ.height / 2 - parentRect.top;
                        const x2 = rectR.left - parentRect.left;
                        const y2 = rectR.top + rectR.height / 2 - parentRect.top;

                        const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                        neonLine2.style.width = `${length}px`;
                        neonLine2.style.left = `${x1}px`;
                        neonLine2.style.top = `${y1}px`;
                        neonLine2.style.transform = `rotate(${angle}deg)`;
                    }
                }
            }
        }
        else if (slideId === 'slide_api_5') {
            const rowFetching = canvas.querySelector('#row-fetching');
            const rowRouting = canvas.querySelector('#row-routing');
            const rowCaching = canvas.querySelector('#row-caching');
            const rowLearning = canvas.querySelector('#row-learning');

            // Reset
            [rowFetching, rowRouting, rowCaching, rowLearning].forEach(el => {
                if (el) el.classList.remove('active-row');
            });

            if (progress <= 0.11) {
                // Intro: no highlights yet
            }
            else if (progress > 0.11 && progress <= 0.36) {
                // REST Caching mặc định
                if (rowCaching) rowCaching.classList.add('active-row');
            }
            else if (progress > 0.36 && progress <= 0.55) {
                // REST Học tập & Setup
                if (rowLearning) rowLearning.classList.add('active-row');
            }
            else if (progress > 0.55 && progress <= 0.80) {
                // GraphQL Over/Under-fetching
                if (rowFetching) rowFetching.classList.add('active-row');
            }
            else {
                // Wrap up: Highlight all rows
                if (rowFetching) rowFetching.classList.add('active-row');
                if (rowRouting) rowRouting.classList.add('active-row');
                if (rowCaching) rowCaching.classList.add('active-row');
                if (rowLearning) rowLearning.classList.add('active-row');
            }
        }
    }

    // ── REGISTER PLUGIN GLOBALS ──────────────────────────────────────────────
    window.VideoPlugin = {
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame,
        scriptName: 'video46'
    };

    console.log('[Video46 Plugin] Loaded: RESTful vs GraphQL Combo/Buffet slides loaded successfully.');
})();
