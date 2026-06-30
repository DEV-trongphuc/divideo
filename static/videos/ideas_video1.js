/**
 * Video IDEAS 1: Swiss UMEF Master Programs Promotional Video
 * High-fidelity animated simulation plugin for IDEAS Education & Swiss UMEF Geneva.
 * Rebuilt for a 4:5 aspect ratio (1080x1350) and expanded to 9 slides.
 * Using real image assets from the IDEAS local workspace.
 */
(function () {
    'use strict';

    const keywordsData = {
        slide_ideas_intro: [
            { text: 'Thạc sĩ quốc tế', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'Swiss UMEF', start: 5.5, end: 9.5, class: 'active-ideas-red' }
        ],
        slide_ideas_accreditation: [
            { text: 'kiểm định cấp liên bang', start: 2.0, end: 6.0, class: 'active-ideas-red' },
            { text: 'Hội đồng Kiểm định Thụy Sĩ SAC', start: 6.0, end: 12.0, class: 'active-ideas-gold' }
        ],
        slide_ideas_programs: [
            { text: '4 chương trình Thạc sĩ', start: 1.5, end: 5.5, class: 'active-ideas-red' },
            { text: 'Trí tuệ Nhân tạo', start: 5.5, end: 11.0, class: 'active-ideas-gold' }
        ],
        slide_ideas_mba_emba: [
            { text: 'Online MBA', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'Executive EMBA', start: 5.5, end: 11.0, class: 'active-ideas-red' }
        ],
        slide_ideas_ai_programs: [
            { text: 'MSc in AI', start: 1.5, end: 5.5, class: 'active-ideas-red' },
            { text: 'MBA in AI', start: 5.5, end: 11.0, class: 'active-ideas-gold' }
        ],
        slide_ideas_ecosystem: [
            { text: 'nền tảng LMS', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'trợ lý Buffet AI', start: 5.5, end: 11.0, class: 'active-ideas-red' }
        ],
        slide_ideas_workshops: [
            { text: 'offline seminar', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'workshop thực chiến', start: 5.5, end: 11.0, class: 'active-ideas-red' }
        ],
        slide_ideas_credibility: [
            { text: 'Phái đoàn làm việc', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'Hợp pháp hóa lãnh sự', start: 5.5, end: 11.5, class: 'active-ideas-red' }
        ],
        slide_ideas_cta: [
            { text: 'học phí chỉ từ 4.220 CHF', start: 1.5, end: 5.5, class: 'active-ideas-gold' },
            { text: 'đăng ký xét tuyển', start: 5.5, end: 10.5, class: 'active-ideas-red' }
        ]
    };

    const customSlideIds = [
        'slide_ideas_intro',
        'slide_ideas_accreditation',
        'slide_ideas_programs',
        'slide_ideas_mba_emba',
        'slide_ideas_ai_programs',
        'slide_ideas_ecosystem',
        'slide_ideas_workshops',
        'slide_ideas_credibility',
        'slide_ideas_cta'
    ];

    function sceneWrap(inner, className = '') {
        return `<div class="ideas-zoom-container ${className}"><div class="ideas-scene-content">${inner}</div></div>`;
    }

    // Initialize icons using Lucide
    function initIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // ── GFX RENDER TEMPLATE ────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        
        if (!needsTemplate) return;
        canvas.setAttribute('data-sim-template', slideId);

        if (slideId === 'slide_ideas_intro') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-intro-bg-cover">
                    <img src="/static/images/ideas/ltnumef10202501.webp" alt="Graduation Background" />
                    <div class="ideas-intro-overlay"></div>
                </div>

                <div class="ideas-intro-card">
                    <div class="ideas-intro-header sim-scene-header">
                        <div class="ideas-logo-badge">SWISS UMEF GENEVA</div>
                    </div>
                    
                    <div class="ideas-brand-logos">
                        <div class="ideas-logo-wrap ideas-glow-red">
                            <img src="/static/images/ideas/logo.webp" alt="IDEAS Logo" />
                        </div>
                        <div class="ideas-logo-connector">✕</div>
                        <div class="ideas-logo-wrap ideas-glow-gold">
                            <img src="/static/images/ideas/Logo-Swiss-UMEF.webp" alt="Swiss UMEF Logo" />
                        </div>
                    </div>

                    <div class="ideas-hero-headings">
                        <h1 class="ideas-title-glow">HỌC THẠC SĨ THỤY SĨ</h1>
                        <p class="ideas-subtitle-glow">BẰNG CẤP DANH GIÁ &bull; TOÀN CẦU &bull; LINH HOẠT</p>
                    </div>
                </div>

                <div class="ideas-floating-badge fb-left" id="fb-badge-1">Bằng Quốc Tế</div>
                <div class="ideas-floating-badge fb-right" id="fb-badge-2">Học 100% Online</div>
                <div class="ideas-floating-badge fb-left" id="fb-badge-3">Trả Góp Học Phí 0%</div>
            `, 'intro-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_accreditation') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-accreditation-board">
                    <div class="ideas-board-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="shield-check"></i> KIỂM ĐỊNH & CÔNG NHẬN</span>
                        <h2>Trường Tư Thục Đầu Tiên Tại Geneva Được Công Nhận Liên Bang Thụy Sĩ</h2>
                    </div>

                    <div class="ideas-acc-grid">
                        <div class="ideas-acc-card" id="acc-card-sac">
                            <div class="acc-logo-wrap"><img src="https://ideas.edu.vn/wp-content/uploads/2026/06/SAC_LOGO.png" alt="SAC" /></div>
                            <h3>SAC Thụy Sĩ</h3>
                            <p>Hội đồng Kiểm định Liên bang Thụy Sĩ phê duyệt chính thức.</p>
                            <div class="acc-glow-ring"></div>
                        </div>

                        <div class="ideas-acc-card" id="acc-card-iacbe">
                            <div class="acc-logo-wrap"><img src="https://ideas.edu.vn/wp-content/uploads/2026/05/iacbe.webp" alt="IACBE" /></div>
                            <h3>IACBE (Mỹ)</h3>
                            <p>Hội đồng kiểm định quốc tế chuyên ngành đào tạo kinh doanh.</p>
                            <div class="acc-glow-ring"></div>
                        </div>

                        <div class="ideas-acc-card" id="acc-card-eduqua">
                            <div class="acc-logo-wrap"><img src="https://ideas.edu.vn/wp-content/uploads/2026/06/kdumef3.webp" alt="Eduqua" /></div>
                            <h3>EduQua</h3>
                            <p>Chứng nhận chất lượng giáo dục quốc gia hàng đầu Thụy Sĩ.</p>
                            <div class="acc-glow-ring"></div>
                        </div>

                        <div class="ideas-acc-card" id="acc-card-qs">
                            <div class="acc-logo-wrap"><img src="/static/images/ideas/qs-1.webp" alt="QS Stars" /></div>
                            <h3>QS Stars (4★)</h3>
                            <p>Đại học đạt tiêu chuẩn chất lượng 4 sao xuất sắc toàn cầu.</p>
                            <div class="acc-glow-ring"></div>
                        </div>
                    </div>
                </div>
            `, 'acc-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_programs') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-programs-board">
                    <div class="ideas-programs-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="graduation-cap"></i> CHƯƠNG TRÌNH ĐÀO TẠO</span>
                        <h2>4 Nhóm Ngành Thạc Sĩ Bứt Phá</h2>
                    </div>

                    <div class="ideas-carousel-viewport">
                        <div class="ideas-program-card c1" id="prog-card-mba">
                            <div class="card-image-header">
                                <img src="/static/images/ideas/online-mba-1.png.webp" alt="Online MBA" />
                            </div>
                            <div class="card-body-content">
                                <h3>Online MBA</h3>
                                <div class="card-accent-badge">16-18 Tháng</div>
                                <p>Đào tạo kiến thức quản trị doanh nghiệp hiện đại, linh hoạt.</p>
                            </div>
                        </div>

                        <div class="ideas-program-card c2" id="prog-card-emba">
                            <div class="card-image-header">
                                <img src="/static/images/ideas/emba.png.webp" alt="Executive MBA" />
                            </div>
                            <div class="card-body-content">
                                <h3>Executive MBA</h3>
                                <div class="card-accent-badge ideas-bg-gold">Lãnh Đạo Chiến Lược</div>
                                <p>Thiết kế riêng cho các nhà điều hành, quản trị cấp cao.</p>
                            </div>
                        </div>

                        <div class="ideas-program-card c3" id="prog-card-mscai">
                            <div class="card-image-header">
                                <img src="/static/images/ideas/mscai.png.webp" alt="MSc in AI" />
                            </div>
                            <div class="card-body-content">
                                <h3>MSc in AI (MSCAI)</h3>
                                <div class="card-accent-badge ideas-bg-navy">Thạc Sĩ Khoa Học</div>
                                <p>Đi sâu vào kỹ thuật, thuật toán và mô hình trí tuệ nhân tạo.</p>
                            </div>
                        </div>

                        <div class="ideas-program-card c4" id="prog-card-mbainai">
                            <div class="card-image-header">
                                <img src="/static/images/ideas/AI-thac-si.webp" alt="MBA in AI" />
                            </div>
                            <div class="card-body-content">
                                <h3>MBA in AI</h3>
                                <div class="card-accent-badge ideas-bg-red">AI Thực Chiến</div>
                                <p>Tích hợp AI vào quản trị, tối ưu năng suất kinh doanh.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'programs-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_mba_emba') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-split-comparison">
                    <div class="ideas-split-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="award"></i> QUẢN TRỊ & ĐIỀU HÀNH</span>
                        <h2>Online MBA & Executive MBA</h2>
                    </div>

                    <div class="ideas-split-body">
                        <div class="ideas-split-col left-col" id="mba-left-col">
                            <div class="ideas-split-card">
                                <h3>Online MBA</h3>
                                <ul class="ideas-bullet-list">
                                    <li><i data-lucide="check-circle"></i> Học 100% Online linh hoạt</li>
                                    <li><i data-lucide="check-circle"></i> Trọng tâm quản trị thực chiến</li>
                                    <li><i data-lucide="check-circle"></i> Dành cho nhân sự bận rộn</li>
                                    <li><i data-lucide="check-circle"></i> Học phí tối ưu 4.220 CHF</li>
                                </ul>
                            </div>
                        </div>
                        <div class="ideas-split-col right-col" id="emba-right-col">
                            <div class="ideas-split-card emba-theme">
                                <h3>Executive EMBA</h3>
                                <ul class="ideas-bullet-list">
                                    <li><i data-lucide="zap"></i> Tư duy điều hành cấp cao</li>
                                    <li><i data-lucide="zap"></i> Tương tác trực tiếp giảng viên</li>
                                    <li><i data-lucide="zap"></i> Kết nối cộng đồng doanh chủ</li>
                                    <li><i data-lucide="zap"></i> Bứt phá vị thế lãnh đạo</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'split-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_ai_programs') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-split-comparison">
                    <div class="ideas-split-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="cpu"></i> CÔNG NGHỆ TƯƠNG LAI</span>
                        <h2>MSc AI & MBA Chuyên Ngành AI</h2>
                    </div>

                    <div class="ideas-split-body">
                        <div class="ideas-split-col left-col" id="mscai-left-col">
                            <div class="ideas-split-card mscai-theme">
                                <h3>MSc in AI</h3>
                                <ul class="ideas-bullet-list">
                                    <li><i data-lucide="shield"></i> Kỹ thuật & Thuật toán AI sâu</li>
                                    <li><i data-lucide="shield"></i> Phát triển mô hình máy học</li>
                                    <li><i data-lucide="shield"></i> Dành cho chuyên gia công nghệ</li>
                                    <li><i data-lucide="shield"></i> Bằng Thạc sĩ Khoa học giá trị</li>
                                </ul>
                            </div>
                        </div>
                        <div class="ideas-split-col right-col" id="mbainai-right-col">
                            <div class="ideas-split-card mbainai-theme">
                                <h3>MBA in AI</h3>
                                <ul class="ideas-bullet-list">
                                    <li><i data-lucide="rocket"></i> Tích hợp AI vào quy trình</li>
                                    <li><i data-lucide="rocket"></i> Quản trị năng suất tự động</li>
                                    <li><i data-lucide="rocket"></i> Dành cho CEO & Nhà quản lý</li>
                                    <li><i data-lucide="rocket"></i> Ứng dụng Buffet AI thực tế</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'split-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_ecosystem') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-ecosystem-scene">
                    <div class="ideas-ecosystem-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="grid"></i> HỆ SINH THÁI HỌC TẬP</span>
                        <h2>Đồng Hành Toàn Diện Suốt Lộ Trình</h2>
                    </div>

                    <div class="ideas-eco-grid">
                        <div class="ideas-eco-box" id="eco-box-1">
                            <div class="eco-icon-wrap"><i data-lucide="monitor"></i></div>
                            <h3>LMS Canvas / Moodle</h3>
                            <p>Bài học trực tuyến khoa học, theo dõi tiến độ chi tiết.</p>
                        </div>
                        <div class="ideas-eco-box" id="eco-box-2">
                            <div class="eco-icon-wrap"><i data-lucide="cpu"></i></div>
                            <h3>Buffet AI Platform</h3>
                            <p>Trợ lý ảo thông minh giải đáp kiến thức học vụ 24/7.</p>
                        </div>
                        <div class="ideas-eco-box" id="eco-box-3">
                            <div class="eco-icon-wrap"><i data-lucide="book-open"></i></div>
                            <h3>Cengage Library</h3>
                            <p>Miễn phí hơn 1.000 đầu sách học thuật chất lượng cao.</p>
                        </div>
                        <div class="ideas-eco-box" id="eco-box-4">
                            <div class="eco-icon-wrap"><i data-lucide="users"></i></div>
                            <h3>Chuyên Đề Bổ Trợ</h3>
                            <p>Gặp gỡ, thảo luận trực tiếp cùng giảng viên cuối tuần.</p>
                        </div>
                    </div>
                </div>
            `, 'ecosystem-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_workshops') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-workshops-scene">
                    <div class="ideas-workshops-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="users"></i> WORKSHOP & CHUYÊN ĐỀ</span>
                        <h2>Hoạt Động Kết Nối & Thực Chiến</h2>
                    </div>

                    <div class="ideas-workshops-row">
                        <div class="ideas-workshop-card" id="ws-card-1">
                            <div class="ws-icon-wrap"><i data-lucide="presentation"></i></div>
                            <h3>Hội thảo Offline</h3>
                            <p>Chia sẻ chuyên sâu các case study quản trị cùng chuyên gia đầu ngành.</p>
                        </div>
                        <div class="ideas-workshop-card" id="ws-card-2">
                            <div class="ws-icon-wrap"><i data-lucide="git-pull-request"></i></div>
                            <h3>Offline Network</h3>
                            <p>Giao lưu và mở rộng cơ hội hợp tác kinh doanh bền vững.</p>
                        </div>
                        <div class="ideas-workshop-card" id="ws-card-3">
                            <div class="ws-icon-wrap"><i data-lucide="award"></i></div>
                            <h3>Workshop Thực Chiến</h3>
                            <p>Cùng lập đội giải quyết trực tiếp bài toán kinh doanh thực tế.</p>
                        </div>
                    </div>
                </div>
            `, 'workshops-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_credibility') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-credibility-scene">
                    <div class="ideas-credibility-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="shield"></i> UY TÍN PHÁP LÝ</span>
                        <h2>Bằng Cấp Hợp Pháp Hóa Lãnh Sự</h2>
                    </div>
                    <div class="ideas-credibility-body">
                        <div class="credibility-card visit-card" id="cred-card-visit">
                            <div class="card-img-container">
                                <img src="/static/images/ideas/8X1A9328-1-1.webp" alt="Phái đoàn Bộ Tài Chính" />
                            </div>
                            <div class="card-content">
                                <h4>Bộ Tài Chính Ghé Thăm</h4>
                                <p>Phái đoàn Việt Nam làm việc trực tiếp tại trụ sở Swiss UMEF Geneva.</p>
                            </div>
                        </div>
                        <div class="credibility-card degree-card" id="cred-card-degree">
                            <div class="degree-mockup">
                                <div class="degree-header">SWISS UMEF GENEVA</div>
                                <div class="degree-title">Master of Business Administration</div>
                                <div class="degree-recipient">MBA DEGREE CERTIFICATE</div>
                                <div class="degree-stamp" id="degree-red-stamp">
                                    <div class="stamp-circle">Hợp Pháp Hóa</div>
                                    <div class="stamp-vietnam">LÃNH SỰ</div>
                                </div>
                            </div>
                            <div class="card-content">
                                <h4>Giá Trị Pháp Lý Toàn Cầu</h4>
                                <p>Bằng cấp được Bộ Ngoại giao Thụy Sĩ chứng nhận chính thức.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'credibility-container');
            initIcons();
        }
        else if (slideId === 'slide_ideas_cta') {
            canvas.innerHTML = sceneWrap(`
                <div class="ideas-cta-scene">
                    <div class="ideas-cta-header sim-scene-header">
                        <span class="ideas-label-accent"><i data-lucide="send"></i> BẮT ĐẦU NGAY</span>
                        <h2>Bứt Phá Lãnh Đạo Thời Đại Số</h2>
                    </div>
                    <div class="ideas-cta-body">
                        <div class="ideas-testimonials-row">
                            <div class="testimonial-bubble bubble-1" id="testi-bubble-1">
                                <img src="/static/images/ideas/ideas_about_img_1778124270063.webp" alt="Alumni Testimonial" />
                                <div class="testi-text">
                                    <strong>Chu Hoàng Thái (Alumni)</strong>
                                    <p>"Chương trình EMBA giúp tôi củng cố và thay đổi hệ thống vận hành doanh nghiệp."</p>
                                </div>
                            </div>
                            <div class="testimonial-bubble bubble-2" id="testi-bubble-2">
                                <img src="https://ideas.edu.vn/wp-content/uploads/2025/02/huynhphuong-optimized.webp" alt="Alumni Testimonial 2" />
                                <div class="testi-text">
                                    <strong>Lê Ngọc Thương (Alumni)</strong>
                                    <p>"Bài giảng lôi cuốn, học trực tuyến Canvas cực kỳ thuận tiện cho quản lý."</p>
                                </div>
                            </div>
                        </div>
                        <div class="ideas-cta-action" id="cta-action-wrap">
                            <div class="ideas-pricing-tag">Học Phí Chỉ Từ: <strong>4.220 CHF</strong> &bull; Hỗ Trợ Trả Góp 0%</div>
                            <button class="ideas-btn-glow-gold">ĐĂNG KÝ XÉT TUYỂN NGAY <i data-lucide="chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            `, 'cta-container');
            initIcons();
        }
    }

    // ── FRAME ANIMATIONS / LIFECYCLE ──────────────────────────────────────────
    function updateFrame(slideId, canvas, progress) {
        const slide = window.slides ? window.slides.find(s => s.id === slideId) : null;
        const duration = slide ? slide.duration || 10.0 : 10.0;
        const elapsed = progress * duration;

        if (slideId === 'slide_ideas_intro') {
            const container = canvas.querySelector('.ideas-intro-card');
            const bgCover = canvas.querySelector('.ideas-intro-bg-cover img');
            if (!container) return;

            if (bgCover) {
                const bgScale = 1.0 + (progress * 0.05);
                bgCover.style.transform = `scale(${bgScale})`;
            }

            const logoWrap1 = container.querySelector('.ideas-brand-logos .ideas-logo-wrap:first-child');
            const logoWrap2 = container.querySelector('.ideas-brand-logos .ideas-logo-wrap:last-child');
            const heading = container.querySelector('.ideas-hero-headings h1');
            const subHeading = container.querySelector('.ideas-hero-headings p');

            if (logoWrap1 && logoWrap2) {
                const s1 = Math.min(1, elapsed * 1.5);
                const s2 = Math.min(1, Math.max(0, elapsed - 0.4) * 1.5);
                logoWrap1.style.transform = `scale(${s1})`;
                logoWrap2.style.transform = `scale(${s2})`;
            }

            if (heading) {
                const opacity = Math.min(1, Math.max(0, elapsed - 0.8) * 2);
                heading.style.opacity = opacity;
                heading.style.transform = `translateY(${Math.max(0, 20 - (elapsed - 0.8) * 40)}px)`;
            }

            if (subHeading) {
                const opacity = Math.min(1, Math.max(0, elapsed - 1.2) * 2);
                subHeading.style.opacity = opacity;
            }

            const badge1 = canvas.querySelector('#fb-badge-1');
            const badge2 = canvas.querySelector('#fb-badge-2');
            const badge3 = canvas.querySelector('#fb-badge-3');

            if (badge1) {
                if (elapsed >= 1.6) {
                    const b1Time = elapsed - 1.6;
                    badge1.style.opacity = Math.min(1, b1Time * 2);
                    badge1.style.transform = `translateX(${Math.max(0, -30 + b1Time * 60)}px)`;
                } else {
                    badge1.style.opacity = 0;
                    badge1.style.transform = 'translateX(-30px)';
                }
            }

            if (badge2) {
                if (elapsed >= 2.6) {
                    const b2Time = elapsed - 2.6;
                    badge2.style.opacity = Math.min(1, b2Time * 2);
                    badge2.style.transform = `translateX(${Math.min(0, 30 - b2Time * 60)}px)`;
                } else {
                    badge2.style.opacity = 0;
                    badge2.style.transform = 'translateX(30px)';
                }
            }

            if (badge3) {
                if (elapsed >= 3.6) {
                    const b3Time = elapsed - 3.6;
                    badge3.style.opacity = Math.min(1, b3Time * 2);
                    badge3.style.transform = `translateX(${Math.max(0, -30 + b3Time * 60)}px)`;
                } else {
                    badge3.style.opacity = 0;
                    badge3.style.transform = 'translateX(-30px)';
                }
            }
        }
        else if (slideId === 'slide_ideas_accreditation') {
            const container = canvas.querySelector('.ideas-accreditation-board');
            if (!container) return;

            let activeAccIndex = 0;
            if (elapsed > 7.5) {
                activeAccIndex = 3;
            } else if (elapsed > 5.0) {
                activeAccIndex = 2;
            } else if (elapsed > 2.5) {
                activeAccIndex = 1;
            }

            const cardsInfo = [
                { id: 'acc-card-sac', index: 0 },
                { id: 'acc-card-iacbe', index: 1 },
                { id: 'acc-card-eduqua', index: 2 },
                { id: 'acc-card-qs', index: 3 }
            ];

            cardsInfo.forEach(info => {
                const cardEl = container.querySelector(`#${info.id}`);
                if (cardEl) {
                    const isActive = info.index === activeAccIndex;
                    const targetScale = isActive ? 1.06 : 0.90;
                    const targetOpacity = isActive ? 1.0 : 0.45;
                    
                    cardEl.style.transform = `scale(${targetScale})`;
                    cardEl.style.opacity = targetOpacity;
                    
                    if (isActive) {
                        cardEl.classList.add('active');
                    } else {
                        cardEl.classList.remove('active');
                    }
                }
            });
        }
        else if (slideId === 'slide_ideas_programs') {
            const container = canvas.querySelector('.ideas-programs-board');
            if (!container) return;

            let activeIdx = 0;
            if (elapsed > 8.5) {
                activeIdx = 3;
            } else if (elapsed > 5.5) {
                activeIdx = 2;
            } else if (elapsed > 2.5) {
                activeIdx = 1;
            }

            const cardIds = ['prog-card-mba', 'prog-card-emba', 'prog-card-mscai', 'prog-card-mbainai'];
            cardIds.forEach((id, index) => {
                const cardEl = container.querySelector(`#${id}`);
                if (cardEl) {
                    const diff = index - activeIdx;
                    const xOffset = diff * 210;
                    const scale = index === activeIdx ? 1.06 : 0.82;
                    const zIndex = index === activeIdx ? 20 : 10 - Math.abs(diff);
                    const opacity = index === activeIdx ? 1.0 : 0.45;
                    const rotateY = diff * -20;

                    cardEl.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
                    cardEl.style.opacity = opacity;
                    cardEl.style.zIndex = zIndex;

                    if (index === activeIdx) {
                        cardEl.classList.add('featured');
                    } else {
                        cardEl.classList.remove('featured');
                    }
                }
            });
        }
        else if (slideId === 'slide_ideas_mba_emba' || slideId === 'slide_ideas_ai_programs') {
            const leftCol = canvas.querySelector('.left-col');
            const rightCol = canvas.querySelector('.right-col');
            if (leftCol && rightCol) {
                if (elapsed >= 0.8) {
                    const t = elapsed - 0.8;
                    leftCol.style.opacity = Math.min(1, t * 2.5);
                    leftCol.style.transform = `translateX(${Math.max(0, -40 + t * 80)}px)`;
                } else {
                    leftCol.style.opacity = 0;
                    leftCol.style.transform = 'translateX(-40px)';
                }
                
                if (elapsed >= 4.5) {
                    const t = elapsed - 4.5;
                    rightCol.style.opacity = Math.min(1, t * 2.5);
                    rightCol.style.transform = `translateX(${Math.min(0, 40 - t * 80)}px)`;
                } else {
                    rightCol.style.opacity = 0;
                    rightCol.style.transform = 'translateX(40px)';
                }

                const listItems = canvas.querySelectorAll('.ideas-bullet-list li');
                listItems.forEach((li, idx) => {
                    const startReveal = 1.2 + (idx * 0.6);
                    if (elapsed >= startReveal) {
                        li.style.opacity = 1;
                        li.style.transform = 'translateY(0)';
                    } else {
                        li.style.opacity = 0;
                        li.style.transform = 'translateY(10px)';
                    }
                });
            }
        }
        else if (slideId === 'slide_ideas_ecosystem') {
            const container = canvas.querySelector('.ideas-ecosystem-scene');
            if (container) {
                const boxes = ['eco-box-1', 'eco-box-2', 'eco-box-3', 'eco-box-4'];
                boxes.forEach((id, index) => {
                    const boxEl = container.querySelector(`#${id}`);
                    if (boxEl) {
                        const startDelay = 1.0 + (index * 1.2);
                        if (elapsed >= startDelay) {
                            const t = elapsed - startDelay;
                            boxEl.style.opacity = Math.min(1, t * 2);
                            boxEl.style.transform = `translateY(${Math.max(0, 20 - t * 40)}px)`;
                            if (t > 0.1 && t < 1.5) {
                                boxEl.style.borderColor = 'var(--ideas-gold-light)';
                                boxEl.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.35)';
                            } else {
                                boxEl.style.borderColor = '';
                                boxEl.style.boxShadow = '';
                            }
                        } else {
                            boxEl.style.opacity = 0;
                            boxEl.style.transform = 'translateY(20px)';
                        }
                    }
                });
            }
        }
        else if (slideId === 'slide_ideas_workshops') {
            const container = canvas.querySelector('.ideas-workshops-scene');
            if (container) {
                const cards = ['ws-card-1', 'ws-card-2', 'ws-card-3'];
                cards.forEach((id, index) => {
                    const cardEl = container.querySelector(`#${id}`);
                    if (cardEl) {
                        const startDelay = 1.0 + (index * 2.0);
                        if (elapsed >= startDelay) {
                            const t = elapsed - startDelay;
                            cardEl.style.opacity = Math.min(1, t * 2);
                            cardEl.style.transform = `scale(${Math.min(1.05, 0.8 + t * 0.4)}) translateY(${Math.max(0, 15 - t * 30)}px)`;
                            if (t > 0.4) {
                                cardEl.style.transform = 'scale(1.0) translateY(0)';
                            }
                        } else {
                            cardEl.style.opacity = 0;
                            cardEl.style.transform = 'scale(0.8) translateY(15px)';
                        }
                    }
                });
            }
        }
        else if (slideId === 'slide_ideas_credibility') {
            const container = canvas.querySelector('.ideas-credibility-scene');
            if (!container) return;

            const visitCard = container.querySelector('#cred-card-visit');
            const degreeCard = container.querySelector('#cred-card-degree');
            const redStamp = container.querySelector('#degree-red-stamp');

            if (visitCard) {
                if (elapsed >= 0.8) {
                    const t = elapsed - 0.8;
                    visitCard.style.opacity = Math.min(1, t * 2.5);
                    visitCard.style.transform = `translateX(${Math.max(0, -40 + t * 100)}px)`;
                } else {
                    visitCard.style.opacity = 0;
                    visitCard.style.transform = 'translateX(-40px)';
                }
            }

            if (degreeCard) {
                if (elapsed >= 1.8) {
                    const t = elapsed - 1.8;
                    degreeCard.style.opacity = Math.min(1, t * 2.5);
                    degreeCard.style.transform = `translateX(${Math.min(0, 40 - t * 100)}px)`;
                } else {
                    degreeCard.style.opacity = 0;
                    degreeCard.style.transform = 'translateX(40px)';
                }
            }

            if (redStamp) {
                const stampTime = 5.5;
                if (elapsed >= stampTime) {
                    const sElapsed = elapsed - stampTime;
                    if (sElapsed < 0.25) {
                        const scale = 3.5 - (sElapsed / 0.25) * 2.5;
                        redStamp.style.opacity = 1;
                        redStamp.style.transform = `scale(${scale}) rotate(-12deg)`;
                    } else {
                        redStamp.style.opacity = 1;
                        redStamp.style.transform = 'scale(1) rotate(-12deg)';
                    }
                } else {
                    redStamp.style.opacity = 0;
                    redStamp.style.transform = 'scale(3.5) rotate(0deg)';
                }
            }
        }
        else if (slideId === 'slide_ideas_cta') {
            const container = canvas.querySelector('.ideas-cta-scene');
            if (!container) return;

            const bubble1 = container.querySelector('#testi-bubble-1');
            const bubble2 = container.querySelector('#testi-bubble-2');
            const ctaAction = container.querySelector('#cta-action-wrap');

            if (bubble1) {
                if (elapsed >= 1.0) {
                    const t = elapsed - 1.0;
                    bubble1.style.opacity = Math.min(1, t * 2);
                    bubble1.style.transform = `scale(${Math.min(1, 0.85 + t * 0.3)})`;
                } else {
                    bubble1.style.opacity = 0;
                    bubble1.style.transform = 'scale(0.85)';
                }
            }

            if (bubble2) {
                if (elapsed >= 3.5) {
                    const t = elapsed - 3.5;
                    bubble2.style.opacity = Math.min(1, t * 2);
                    bubble2.style.transform = `scale(${Math.min(1, 0.85 + t * 0.3)})`;
                } else {
                    bubble2.style.opacity = 0;
                    bubble2.style.transform = 'scale(0.85)';
                }
            }

            if (ctaAction) {
                if (elapsed >= 6.5) {
                    const t = elapsed - 6.5;
                    ctaAction.style.opacity = Math.min(1, t * 2);
                    ctaAction.style.transform = `translateY(${Math.max(0, 30 - t * 60)}px)`;
                } else {
                    ctaAction.style.opacity = 0;
                    ctaAction.style.transform = 'translateY(30px)';
                }
            }
        }
    }

    // Export plugin definitions
    window.VideoPlugin = {
        topic: 'ĐÀO TẠO THẠC SĨ SWISS UMEF',
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

})();
