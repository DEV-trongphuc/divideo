/**
 * Video 17: Spotify - Thuật toán gợi ý nhạc
 * Plugin file - chứa toàn bộ slide animation/HTML cho video17
 * Load động bởi app.js khi user chọn video17
 */
(function () {
    'use strict';

    // ── KEYWORDS DATA ──────────────────────────────────────────────────────────
    const keywordsData = {
        slide_spotify_1: [
            { text: 'buổi sáng thứ Hai', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'Spotify', start: 6.0, end: 11.0, class: 'active-good' },
            { text: 'gợi ý nhạc', start: 11.0, end: 17.0, class: 'active-good' },
            { text: 'thuật toán', start: 17.0, end: 24.5, class: 'active-gold' }
        ],
        slide_spotify_2a: [
            { text: 'Lọc cộng tác', start: 1.0, end: 6.0, class: 'active-good' },
            { text: 'thói quen nghe nhạc', start: 6.0, end: 12.0, class: 'active-gold' },
            { text: 'ghi nhận', start: 12.0, end: 17.5, class: 'active-good' }
        ],
        slide_spotify_2b: [
            { text: 'tri kỷ âm nhạc', start: 1.5, end: 8.0, class: 'active-good' },
            { text: 'dự đoán', start: 8.0, end: 14.0, class: 'active-gold' },
            { text: 'đề xuất', start: 14.0, end: 19.5, class: 'active-good' }
        ],
        slide_spotify_3: [
            { text: 'Phân tích văn bản', start: 1.0, end: 6.0, class: 'active-gold' },
            { text: 'tần số cảm xúc', start: 6.0, end: 14.0, class: 'active-good' },
            { text: 'ghép chúng lại', start: 14.0, end: 22.5, class: 'active-good' }
        ],
        slide_spotify_4: [
            { text: 'Phân tích sóng âm', start: 1.0, end: 7.0, class: 'active-good' },
            { text: 'Khởi đầu lạnh', start: 7.0, end: 14.0, class: 'active-bad' },
            { text: 'mạng nơ-ron tích chập', start: 14.0, end: 23.5, class: 'active-gold' }
        ],
        slide_spotify_5a: [
            { text: 'Vector đa chiều', start: 1.0, end: 7.0, class: 'active-good' },
            { text: 'gu nhạc tương đồng', start: 7.0, end: 14.0, class: 'active-gold' },
            { text: 'hút lại gần', start: 14.0, end: 21.5, class: 'active-good' }
        ],
        slide_spotify_5b: [
            { text: 'Quét tọa độ', start: 1.0, end: 7.0, class: 'active-gold' },
            { text: 'Annoy', start: 7.0, end: 14.0, class: 'active-good' },
            { text: 'micro-giây', start: 14.0, end: 21.5, class: 'active-good' }
        ]
    };

    // ── SLIDE IDs that use custom GFX rendering ────────────────────────────────
    const customSlideIds = [
        'slide_spotify_1', 'slide_spotify_2a', 'slide_spotify_2b',
        'slide_spotify_3', 'slide_spotify_4', 'slide_spotify_5a', 'slide_spotify_5b'
    ];

    // ── HTML TEMPLATES ─────────────────────────────────────────────────────────
    function renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide) {
        const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
        if (needsTemplate) {
            canvas.setAttribute('data-sim-template', slideId);
        }

        if (slideId === 'slide_spotify_1') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center;">
                            <div class="glass-card spotify-phone-mockup" style="width:460px; height:620px; border:2.5px solid rgba(255,255,255,0.08); border-radius:36px; padding:30px; display:flex; flex-direction:column; justify-content:space-between; background:#121212; position:relative; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.9);">
                                <div class="rainy-overlay" style="position:absolute; inset:0; opacity:0.18; background: repeating-linear-gradient(170deg, transparent, transparent 15px, rgba(255,255,255,0.06) 15px, rgba(255,255,255,0.06) 30px); pointer-events:none;"></div>
                                <div style="display:flex; justify-content:space-between; align-items:center; z-index:2; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:12px;">
                                    <span style="font-size:24px; font-weight:bold; color:#b3b3b3; letter-spacing:1.5px;">DISCOVER WEEKLY</span>
                                    <i data-lucide="music-2" style="color:#1db954; width:24px; height:24px;"></i>
                                </div>
                                <div style="position:relative; width:260px; height:260px; margin:20px auto; display:flex; align-items:center; justify-content:center; z-index:2;">
                                    <div class="vinyl-glow" style="position:absolute; inset:0; background:radial-gradient(circle, rgba(29,185,84,0.35) 0%, transparent 70%); filter:blur(22px);"></div>
                                    <div class="vinyl-disc-s1" style="width:240px; height:240px; border-radius:50%; background:repeating-radial-gradient(circle, #222 0px, #222 4px, #111 4px, #111 8px); border:4px solid #000; display:flex; align-items:center; justify-content:center; animation: vinyl-spin 12s linear infinite; animation-play-state:running; box-shadow: 0 12px 36px rgba(0,0,0,0.65);">
                                        <div style="width:76px; height:76px; border-radius:50%; background:#1db954; border:4px solid #121212; display:flex; align-items:center; justify-content:center;">
                                            <span style="font-size:38px;">🌧️</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="z-index:2; text-align:center; margin-bottom:10px;">
                                    <div style="font-size:32px; font-weight:bold; color:#fff;" class="song-title-s1">Rainy Day Melancholy</div>
                                    <div style="font-size:22px; color:#b3b3b3; margin-top:6px;" class="artist-name-s1">Ca sĩ ẩn danh (Unknown Artist)</div>
                                </div>
                                <div class="mood-card-s1 glass-card" style="z-index:2; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.08); border-radius:20px; padding:18px; display:flex; align-items:center; gap:18px;">
                                    <div class="mood-icon-s1" style="font-size:46px;">😢</div>
                                    <div style="text-align:left;">
                                        <div style="font-size:22px; font-weight:bold; color:#fff;">Tâm trạng của bạn: Buồn</div>
                                        <div style="font-size:22px; color:#b3b3b3; margin-top:4px;" class="mood-desc-s1">Một ngày thứ Hai u ám...</div>
                                    </div>
                                </div>
                                <div style="z-index:2; margin-top:12px;">
                                    <div style="width:100%; height:8px; background:#535353; border-radius:4px; position:relative; overflow:hidden;">
                                        <div class="prog-fill-s1" style="height:100%; background:#1db954; width:0%;"></div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:24px; color:#b3b3b3; margin-top:8px;">
                                        <span class="elapsed-s1">0:00</span>
                                        <span>3:15</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_2a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:35px; zoom:0.8;">
                            <div class="glass-card profile-card-s2a active-user" style="width:340px; height:490px; border:2.5px solid #1db954; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; z-index:2; box-shadow:0 0 30px rgba(29,185,84,0.15); transition: all 0.3s;">
                                <div style="font-size:24px; font-weight:bold; color:#1db954; text-transform:uppercase; border-bottom:1px solid rgba(29,185,84,0.15); padding-bottom:10px;">Hồ sơ của bạn (You)</div>
                                <div style="display:flex; flex-direction:column; gap:20px; align-items:center; justify-content:center; flex:1;">
                                    <div style="width:110px; height:110px; border-radius:50%; background:#1db954; color:#000; font-size:52px; display:flex; align-items:center; justify-content:center; font-weight:bold;">U</div>
                                    <div style="font-size:24px; font-weight:bold; color:#fff;">Gu âm nhạc của bạn</div>
                                    <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;" class="tags-container-s2a">
                                        <span style="font-size:22px; background:rgba(29,185,84,0.12); border:1px solid #1db954; color:#1db954; padding:8px 18px; border-radius:20px; font-weight:bold;">Lofi Chill</span>
                                        <span style="font-size:22px; background:rgba(29,185,84,0.12); border:1px solid #1db954; color:#1db954; padding:8px 18px; border-radius:20px; font-weight:bold;">Acoustic</span>
                                    </div>
                                </div>
                            </div>
                            <div style="width:320px; display:flex; flex-direction:column; gap:24px; align-items:center; z-index:2;">
                                <div class="activity-log-title" style="font-size:24px; font-weight:bold; color:var(--gold-primary); text-transform:uppercase; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:10px 24px; border-radius:18px; letter-spacing:1px;">Đo lường hành vi</div>
                                <div class="activity-box-s2a glass-card" style="width:100%; height:270px; padding:24px; display:flex; flex-direction:column; justify-content:space-around; text-align:left; gap:12px; box-sizing:border-box;">
                                    <div style="display:flex; align-items:center; gap:14px; font-size:22px; opacity:0.3; transition:opacity 0.3s;" class="act-item-1">
                                        <i data-lucide="heart" style="color:#1db954; width:24px; height:24px; fill:#1db954;"></i>
                                        <span>Lưu vào Thư viện</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:14px; font-size:22px; opacity:0.3; transition:opacity 0.3s;" class="act-item-2">
                                        <i data-lucide="repeat-2" style="color:#f59e0b; width:24px; height:24px;"></i>
                                        <span>Nghe lặp lại &gt;3 lần</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:14px; font-size:22px; opacity:0.3; transition:opacity 0.3s;" class="act-item-3">
                                        <i data-lucide="skip-forward" style="color:#ef4444; width:24px; height:24px;"></i>
                                        <span>Bỏ qua nhanh (&lt;15s)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-card profile-card-s2b" style="width:340px; height:490px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; z-index:2; transition: all 0.3s;">
                                <div style="font-size:24px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">Hàng triệu User khác</div>
                                <div style="display:flex; flex-direction:column; gap:20px; align-items:center; justify-content:center; flex:1;">
                                    <div style="width:110px; height:110px; border-radius:50%; background:#282828; color:#fff; font-size:52px; display:flex; align-items:center; justify-content:center; font-weight:bold;">O</div>
                                    <div style="font-size:24px; font-weight:bold; color:#fff;">Gu tương quan tương tự</div>
                                    <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;">
                                        <span style="font-size:22px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:8px 18px; border-radius:20px; font-weight:bold;">Pop</span>
                                        <span style="font-size:22px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:8px 18px; border-radius:20px; font-weight:bold;">Lofi Chill</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_2b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; zoom:0.85;">
                            <div style="position:relative; width:900px; height:420px; display:flex; align-items:center; justify-content:center; z-index:2;">
                                <div class="venn-circle left-venn" style="position:absolute; left:90px; width:340px; height:340px; border-radius:50%; border:2.5px solid #1db954; background:rgba(29,185,84,0.03); display:flex; flex-direction:column; align-items:flex-start; padding:40px; box-sizing:border-box; justify-content:center; transition:all 0.4s;">
                                    <span style="font-weight:900; color:#1db954; font-size:22px; margin-bottom:15px;">BẠN (YOU)</span>
                                    <div style="display:flex; flex-direction:column; gap:10px;">
                                        <span style="font-size:19px; color:#fff;">🎵 Bài hát A</span>
                                        <span style="font-size:19px; color:#fff;">🎵 Bài hát B</span>
                                        <span style="font-size:19px; color:#fff;">🎵 Bài hát C</span>
                                        <span style="font-size:19px; color:#1db954; font-weight:bold; opacity:0; transition:opacity 0.4s;" class="song-d-dest">✨ Bài hát D (Đề xuất)</span>
                                    </div>
                                </div>
                                <div style="position:absolute; z-index:10; font-size:22px; font-weight:bold; color:#1db954; background:rgba(18,18,18,0.92); border:1.5px solid #1db954; padding:10px 20px; border-radius:16px; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                                    Giao Thoa Thói Quen<br><span style="font-size:24px; color:#b3b3b3;">(Đồng gu A, B, C)</span>
                                </div>
                                <div class="venn-circle right-venn" style="position:absolute; right:90px; width:340px; height:340px; border-radius:50%; border:2.5px solid var(--gold-primary); background:rgba(245,158,11,0.03); display:flex; flex-direction:column; align-items:flex-end; padding:40px; box-sizing:border-box; justify-content:center; text-align:right; transition:all 0.4s;">
                                    <span style="font-weight:900; color:var(--gold-primary); font-size:22px; margin-bottom:15px;">TRI KỶ ÂM NHẠC</span>
                                    <div style="display:flex; flex-direction:column; gap:10px; align-items:flex-end;">
                                        <span style="font-size:19px; color:#fff;">Bài hát A 🎵</span>
                                        <span style="font-size:19px; color:#fff;">Bài hát B 🎵</span>
                                        <span style="font-size:19px; color:#fff;">Bài hát C 🎵</span>
                                        <span style="font-size:20px; color:#1db954; font-weight:bold; background:rgba(29,185,84,0.12); border:1.5px dashed #1db954; padding:6px 12px; border-radius:8px;" class="song-d-badge">🔥 Bài hát D</span>
                                    </div>
                                </div>
                                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;">
                                    <path class="recommend-line" d="M 525 210 Q 400 280 275 210" fill="none" stroke="#1db954" stroke-width="3.5" stroke-dasharray="8 5" style="opacity:0;" />
                                </svg>
                                <div class="recommend-packet" style="position:absolute; width:14px; height:14px; border-radius:50%; background:#1db954; box-shadow:0 0 12px #1db954; z-index:10; left:525px; top:210px; opacity:0; transform:translate(-50%,-50%);"></div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_3') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:30px; zoom:0.9;">
                            <div class="glass-card web-crawler-card" style="width:420px; height:380px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; text-align:left; z-index:2; transition:all 0.3s;">
                                <div style="font-size:22px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;">Báo chí &amp; Playlist xã hội</div>
                                <div style="background:rgba(0,0,0,0.4); border-radius:12px; padding:18px; border:1px solid rgba(255,255,255,0.05); font-family:var(--font-mono); font-size:22px; line-height:1.6; color:#b3b3b3; flex:1; margin:15px 0; overflow:hidden;" class="crawler-text-box">
                                    Bài viết 1: "Một chiều mưa <strong style="color:var(--gold-primary);">chill</strong> cực kỳ với bản nhạc <strong style="color:var(--gold-primary);">lo-fi</strong> buồn..."<br><br>
                                    Bài viết 2: "Giai điệu này rất hợp làm <strong style="color:var(--gold-primary);">nhạc ngắm mưa</strong> thư giãn..."
                                </div>
                            </div>
                            <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                <path d="M 460 220 L 530 220" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" stroke-dasharray="6 4" />
                            </svg>
                            <div class="scrape-packet" style="position:absolute; width:12px; height:12px; border-radius:50%; background:var(--gold-primary); box-shadow:0 0 10px var(--gold-primary); z-index:5; left:460px; top:220px; opacity:0; transform:translate(-50%,-50%);"></div>
                            <div class="glass-card nlp-engine-card" style="width:420px; height:380px; border:2.5px solid var(--gold-primary); border-radius:24px; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; z-index:2; text-align:center; transition:all 0.3s;">
                                <div style="font-size:22px; font-weight:bold; color:var(--gold-primary); text-transform:uppercase; border-bottom:1px solid rgba(245,158,11,0.25); padding-bottom:8px;">Trình bóc tách từ khóa (NLP)</div>
                                <div style="display:flex; flex-direction:column; gap:15px; flex:1; justify-content:center; align-items:center;">
                                    <span style="font-size:24px; color:var(--text-muted); text-transform:uppercase;">Phân tích ngữ cảnh cảm xúc:</span>
                                    <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;" class="keyword-tags-s3">
                                        <span class="kw-tag kw-1" style="font-size:22px; font-weight:bold; padding:8px 18px; border-radius:8px; background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.3); color:#fff; transition:all 0.3s ease;">chill</span>
                                        <span class="kw-tag kw-2" style="font-size:22px; font-weight:bold; padding:8px 18px; border-radius:8px; background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.3); color:#fff; transition:all 0.3s ease;">lo-fi</span>
                                        <span class="kw-tag kw-3" style="font-size:22px; font-weight:bold; padding:8px 18px; border-radius:8px; background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.3); color:#fff; transition:all 0.3s ease;">nhạc ngắm mưa</span>
                                    </div>
                                    <div class="nlp-status-lbl" style="font-size:18px; color:#10b981; font-weight:bold; margin-top:12px; opacity:0; transition:opacity 0.3s;">➔ Phát hiện cùng tần số!</div>
                                </div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_4') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:10px 0; gap:25px; zoom:1.15;">
                            <div class="glass-card wave-analyzer-card" style="width:100%; max-width:780px; height:180px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:18px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
                                <div style="font-size:18px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; text-align:left;">Mạng nơ-ron phân tích sóng âm (CNN Audio)</div>
                                <div style="display:flex; align-items:center; justify-content:space-between; height:80px; padding:0 15px; position:relative;" class="waveform-container-s4">
                                    <div class="wave-bar" style="width:8px; height:20px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:40px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:70px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:30px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:50px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:80px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:60px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:25px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:40px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:65px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:35px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-bar" style="width:8px; height:75px; background:#555; border-radius:4px; transition:all 0.1s;"></div>
                                    <div class="wave-scanner" style="position:absolute; left:0%; top:0; bottom:0; width:4px; background:#1db954; box-shadow:0 0 15px #1db954; pointer-events:none;"></div>
                                </div>
                            </div>
                            <div style="display:flex; justify-content:space-between; width:100%; max-width:780px; gap:20px;">
                                <div class="glass-card feat-card" style="flex:1; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:12px; text-align:center;">
                                    <div style="font-size:18px; color:var(--text-muted); text-transform:uppercase; font-weight:bold;">Tempo / Nhịp độ</div>
                                    <div style="font-family:var(--font-mono); font-size:26px; font-weight:bold; color:#555; margin:8px 0;" class="bpm-val">-- BPM</div>
                                    <span style="font-size:16px; color:#b3b3b3;" class="bpm-desc">Đang quét nhịp...</span>
                                </div>
                                <div class="glass-card feat-card" style="flex:1; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:12px; text-align:center;">
                                    <div style="font-size:18px; color:var(--text-muted); text-transform:uppercase; font-weight:bold;">Tông nhạc / Key</div>
                                    <div style="font-family:var(--font-mono); font-size:26px; font-weight:bold; color:#555; margin:8px 0;" class="key-val">-- Key</div>
                                    <span style="font-size:16px; color:#b3b3b3;" class="key-desc">Đang giải mã...</span>
                                </div>
                                <div class="glass-card feat-card cold-start-card" style="flex:1; border:2.5px solid #ef4444; border-radius:20px; padding:12px; text-align:center; transition:all 0.3s ease; box-shadow: 0 0 20px rgba(239,68,68,0.15);">
                                    <div style="font-size:18px; color:#fff; text-transform:uppercase; font-weight:bold;">Lỗi khởi đầu lạnh</div>
                                    <div style="font-size:20px; font-weight:900; color:#ef4444; margin:8px 0;" class="cold-start-status">BỊ KHÓA</div>
                                    <span style="font-size:14px; color:#ef4444; font-weight:bold;" class="cold-start-desc">Chưa ai nghe trước đây!</span>
                                </div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_5a') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; align-items:center; justify-content:center; zoom:1.35;">
                            <div class="glass-card vector-space-card" style="width:100%; max-width:780px; height:340px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:20px; box-sizing:border-box; position:relative; overflow:hidden;">
                                <div style="font-size:16px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; text-align:left;">Không gian Vector đa chiều (High-Dimensional Space)</div>
                                <div style="position:relative; width:100%; height:250px;" class="vector-space-container">
                                    <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.03) 1.5px, transparent 1.5px); background-size: 20px 20px;"></div>
                                    <div class="pt-node p1" style="position:absolute; left:20%; top:25%; width:16px; height:16px; border-radius:50%; background:#ef4444; box-shadow:0 0 10px #ef4444; transition: transform 0.3s;"></div>
                                    <div class="pt-node p2" style="position:absolute; left:25%; top:65%; width:14px; height:14px; border-radius:50%; background:#ef4444; transition: transform 0.3s;"></div>
                                    <div class="pt-node p3" style="position:absolute; left:75%; top:20%; width:16px; height:16px; border-radius:50%; background:#a855f7; box-shadow:0 0 10px #a855f7; transition: transform 0.3s;"></div>
                                    <div class="pt-node p4" style="position:absolute; left:80%; top:75%; width:12px; height:12px; border-radius:50%; background:#a855f7; transition: transform 0.3s;"></div>
                                    <div class="pt-node user-node" style="position:absolute; left:28%; top:45%; width:44px; height:44px; border-radius:50%; background:#1db954; box-shadow:0 0 20px #1db954; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:17px; color:#000; z-index:10; transition:all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);">Bạn</div>
                                    <div class="pt-node song-node" style="position:absolute; left:68%; top:48%; width:36px; height:36px; border-radius:50%; background:#f59e0b; box-shadow:0 0 15px #f59e0b; z-index:10; display:flex; align-items:center; justify-content:center; font-size:16px; transition:all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);">🎵</div>
                                    <div class="attract-ring" style="position:absolute; border:2px dashed rgba(29,185,84,0.35); border-radius:50%; width:180px; height:180px; left:28%; top:45%; transform:translate(-68px,-68px); opacity:0; pointer-events:none; transition: all 0.5s;"></div>
                                </div>
                            </div>
                        </div>
                    `;
            }
        }
        else if (slideId === 'slide_spotify_5b') {
            if (needsTemplate) {
                canvas.innerHTML = `
                        <div style="width:100%; height:100%; position:relative; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:25px; zoom:1.45;">
                            <div class="glass-card annoy-space-card" style="width:380px; height:270px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:20px; box-sizing:border-box; position:relative; overflow:hidden; z-index:2;">
                                <div style="font-size:16px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; text-align:left;">Phân rã không gian (Annoy)</div>
                                <div style="position:relative; width:100%; height:190px;" class="annoy-space-container">
                                    <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.03) 1.5px, transparent 1.5px); background-size: 15px 15px;"></div>
                                    <div class="annoy-slice s-1" style="position:absolute; left:48%; top:0; bottom:0; width:2px; background:rgba(245,158,11,0.4); transform:rotate(12deg); transform-origin:center; opacity:0; transition:opacity 0.4s;"></div>
                                    <div class="annoy-slice s-2" style="position:absolute; left:0; right:0; top:48%; height:2px; background:rgba(245,158,11,0.4); transform:rotate(-8deg); transform-origin:center; opacity:0; transition:opacity 0.4s;"></div>
                                    <div class="pt-node" style="position:absolute; left:25%; top:25%; width:10px; height:10px; border-radius:50%; background:#fff;"></div>
                                    <div class="pt-node" style="position:absolute; left:30%; top:65%; width:10px; height:10px; border-radius:50%; background:#fff;"></div>
                                    <div class="pt-node" style="position:absolute; left:70%; top:30%; width:10px; height:10px; border-radius:50%; background:#fff;"></div>
                                    <div class="pt-node" style="position:absolute; left:80%; top:70%; width:10px; height:10px; border-radius:50%; background:#fff;"></div>
                                    <div class="annoy-search-glow" style="position:absolute; left:28%; top:45%; width:100px; height:100px; border-radius:50%; border:2px dashed #1db954; background:rgba(29,185,84,0.06); transform:translate(-45px,-45px); opacity:0; transition:opacity 0.4s;"></div>
                                </div>
                            </div>
                            <div class="glass-card annoy-tree-card" style="width:380px; height:270px; border:2.5px solid #1db954; border-radius:24px; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; z-index:2; text-align:center; transition:all 0.3s;">
                                <div style="font-size:16px; font-weight:bold; color:#1db954; text-transform:uppercase; border-bottom:1px solid rgba(29,185,84,0.2); padding-bottom:8px;">Tìm kiếm lân cận siêu tốc (ANN)</div>
                                <div style="display:flex; flex-direction:column; gap:15px; flex:1; justify-content:center; align-items:center;">
                                    <span style="font-size:18px; color:var(--text-muted); text-transform:uppercase;">Thời gian quét bài hát:</span>
                                    <div style="font-family:var(--font-mono); font-size:32px; font-weight:900; color:#b3b3b3; transition:color 0.3s;" class="annoy-speed-lbl">-- µs</div>
                                    <div style="background:rgba(0,0,0,0.3); border-radius:12px; width:100%; padding:12px; border:1px solid rgba(255,255,255,0.05); box-sizing:border-box;">
                                        <div style="font-size:18px; color:var(--text-muted); text-transform:uppercase;">Độ phức tạp:</div>
                                        <div style="font-size:18px; font-weight:bold; color:#fff; font-family:var(--font-mono); margin-top:3px;">O(log N) - Phân vùng nhị phân</div>
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
        if (slideId === 'slide_spotify_1') {
            const fillBar = canvas.querySelector('.prog-fill-s1');
            const elapsedLbl = canvas.querySelector('.elapsed-s1');
            const songTitle = canvas.querySelector('.song-title-s1');
            const artistName = canvas.querySelector('.artist-name-s1');
            const moodIcon = canvas.querySelector('.mood-icon-s1');
            const moodDesc = canvas.querySelector('.mood-desc-s1');
            if (fillBar) fillBar.style.width = `${progress * 100}%`;
            const totalSec = 195; // 3:15
            const elapsedSec = Math.floor(progress * totalSec);
            const m = Math.floor(elapsedSec / 60);
            const s = Math.floor(elapsedSec % 60).toString().padStart(2, '0');
            if (elapsedLbl) elapsedLbl.textContent = `${m}:${s}`;
            if (progress < 0.25) {
                if (songTitle) songTitle.textContent = 'Monday Morning Blues';
                if (artistName) artistName.textContent = 'Ca sĩ ẩn danh (Unknown Artist)';
                if (moodIcon) moodIcon.textContent = '😢';
                if (moodDesc) moodDesc.textContent = 'Tâm trạng buồn tủi ngày mưa...';
            } else if (progress < 0.6) {
                if (songTitle) songTitle.textContent = 'Rainy Day Lofi Beats';
                if (artistName) artistName.textContent = 'Lofi Coder Soundscape';
                if (moodIcon) moodIcon.textContent = '🤔';
                if (moodDesc) moodDesc.textContent = 'Ủa... giai điệu này nghe quen thế?';
            } else {
                if (songTitle) songTitle.textContent = 'Discover Weekly Magic';
                if (artistName) artistName.textContent = 'Đúng gu bạn đến kỳ lạ!';
                if (moodIcon) moodIcon.textContent = '🥰';
                if (moodDesc) moodDesc.textContent = 'Hóa ra Spotify đọc vị mình siêu đỉnh!';
            }
        }
        else if (slideId === 'slide_spotify_2a') {
            const item1 = canvas.querySelector('.act-item-1');
            const item2 = canvas.querySelector('.act-item-2');
            const item3 = canvas.querySelector('.act-item-3');
            const userCard = canvas.querySelector('.profile-card-s2a');
            const otherCard = canvas.querySelector('.profile-card-s2b');
            if (progress > 0.15 && item1) item1.style.opacity = '1';
            if (progress > 0.45 && item2) item2.style.opacity = '1';
            if (progress > 0.75 && item3) item3.style.opacity = '1';
            if (progress > 0.8 && userCard && otherCard) {
                userCard.style.boxShadow = '0 0 35px rgba(29,185,84,0.3)';
                otherCard.style.borderColor = 'rgba(29,185,84,0.5)';
                otherCard.style.boxShadow = '0 0 25px rgba(29,185,84,0.15)';
            } else {
                if (userCard) userCard.style.boxShadow = '0 0 25px rgba(29,185,84,0.1)';
                if (otherCard) { otherCard.style.borderColor = 'rgba(255,255,255,0.06)'; otherCard.style.boxShadow = 'none'; }
            }
        }
        else if (slideId === 'slide_spotify_2b') {
            const recLine = canvas.querySelector('.recommend-line');
            const recPacket = canvas.querySelector('.recommend-packet');
            const destBadge = canvas.querySelector('.song-d-dest');
            const rightVenn = canvas.querySelector('.right-venn');
            if (progress > 0.3) {
                if (recLine) recLine.style.opacity = '1';
                if (rightVenn) { rightVenn.style.borderColor = '#1db954'; rightVenn.style.boxShadow = '0 0 30px rgba(29,185,84,0.2)'; }
                if (progress > 0.3 && progress < 0.8) {
                    const ratio = (progress - 0.3) / 0.5;
                    const x = 525 - (525 - 275) * ratio;
                    const y = 210 + 60 * Math.sin(ratio * Math.PI);
                    if (recPacket) { recPacket.style.left = `${x}px`; recPacket.style.top = `${y}px`; recPacket.style.opacity = '1'; }
                } else if (progress >= 0.8) {
                    if (recPacket) recPacket.style.opacity = '0';
                    if (destBadge) destBadge.style.opacity = '1';
                }
            }
        }
        else if (slideId === 'slide_spotify_3') {
            const scrapePacket = canvas.querySelector('.scrape-packet');
            const statusLbl = canvas.querySelector('.nlp-status-lbl');
            const kw1 = canvas.querySelector('.kw-1');
            const kw2 = canvas.querySelector('.kw-2');
            const kw3 = canvas.querySelector('.kw-3');
            if (progress > 0.1 && progress < 0.6) {
                const ratio = (progress - 0.1) / 0.5;
                const x = 460 + (530 - 460) * ratio;
                if (scrapePacket) { scrapePacket.style.left = `${x}px`; scrapePacket.style.opacity = '1'; }
            } else if (progress >= 0.6) {
                if (scrapePacket) scrapePacket.style.opacity = '0';
                if (statusLbl) statusLbl.style.opacity = '1';
                if (kw1) { kw1.style.background = 'rgba(29,185,84,0.15)'; kw1.style.borderColor = '#1db954'; }
                if (kw2) { kw2.style.background = 'rgba(29,185,84,0.15)'; kw2.style.borderColor = '#1db954'; }
                if (kw3) { kw3.style.background = 'rgba(29,185,84,0.15)'; kw3.style.borderColor = '#1db954'; }
            }
        }
        else if (slideId === 'slide_spotify_4') {
            const scanner = canvas.querySelector('.wave-scanner');
            const bpmVal = canvas.querySelector('.bpm-val');
            const bpmDesc = canvas.querySelector('.bpm-desc');
            const keyVal = canvas.querySelector('.key-val');
            const keyDesc = canvas.querySelector('.key-desc');
            const coldCard = canvas.querySelector('.cold-start-card');
            const coldStatus = canvas.querySelector('.cold-start-status');
            const coldDesc = canvas.querySelector('.cold-start-desc');
            const bars = canvas.querySelectorAll('.wave-bar');
            if (scanner) scanner.style.left = `${progress * 100}%`;
            bars.forEach((bar, idx) => {
                const activeIndex = Math.floor(progress * bars.length);
                if (idx === activeIndex) { bar.style.background = '#1db954'; bar.style.transform = 'scaleY(1.3)'; }
                else if (idx < activeIndex) { bar.style.background = 'rgba(29, 185, 84, 0.4)'; bar.style.transform = 'scaleY(1)'; }
                else { bar.style.background = '#555'; bar.style.transform = 'scaleY(1)'; }
            });
            if (progress > 0.3) { if (bpmVal) { bpmVal.textContent = '76 BPM'; bpmVal.style.color = '#1db954'; } if (bpmDesc) bpmDesc.textContent = 'Tempo chậm thư giãn'; }
            if (progress > 0.6) { if (keyVal) { keyVal.textContent = 'C# Minor'; keyVal.style.color = '#1db954'; } if (keyDesc) keyDesc.textContent = 'Tông buồn hợp tâm trạng'; }
            if (progress > 0.85) {
                if (coldCard) { coldCard.style.borderColor = '#10b981'; coldCard.style.boxShadow = '0 0 25px rgba(16,185,129,0.35)'; }
                if (coldStatus) { coldStatus.textContent = 'ĐÃ ĐƯỢC MỞ'; coldStatus.style.color = '#10b981'; }
                if (coldDesc) { coldDesc.textContent = 'Giải mã sóng âm thành công!'; coldDesc.style.color = '#10b981'; }
            }
        }
        else if (slideId === 'slide_spotify_5a') {
            const userNode = canvas.querySelector('.user-node');
            const songNode = canvas.querySelector('.song-node');
            const attractRing = canvas.querySelector('.attract-ring');
            if (progress > 0.25) {
                const ratio = Math.min(1, (progress - 0.25) / 0.65);
                const userLeft = 28 + (42 - 28) * ratio;
                const songLeft = 68 - (68 - 52) * ratio;
                if (userNode) userNode.style.left = `${userLeft}%`;
                if (songNode) songNode.style.left = `${songLeft}%`;
                if (attractRing) { attractRing.style.opacity = (1 - ratio).toString(); attractRing.style.transform = `translate(-68px,-68px) scale(${1 - ratio * 0.4})`; }
            }
        }
        else if (slideId === 'slide_spotify_5b') {
            const slice1 = canvas.querySelector('.annoy-space-container .s-1');
            const slice2 = canvas.querySelector('.annoy-space-container .s-2');
            const searchGlow = canvas.querySelector('.annoy-search-glow');
            const speedLbl = canvas.querySelector('.annoy-speed-lbl');
            if (progress > 0.25 && slice1) slice1.style.opacity = '1';
            if (progress > 0.5 && slice2) slice2.style.opacity = '1';
            if (progress > 0.75) {
                if (searchGlow) searchGlow.style.opacity = '1';
                if (speedLbl) { speedLbl.textContent = '0.05 µs'; speedLbl.style.color = '#10b981'; }
            }
        }
    }

    // ── PUBLIC API ─────────────────────────────────────────────────────────────
    window.VideoPlugin = {
        scriptName: 'video17',
        topic: 'Spotify Algorithm',
        episodeNum: 17,
        customSlideIds: customSlideIds,
        keywordsData: keywordsData,
        renderGfx: renderGfx,
        updateFrame: updateFrame
    };

    console.log('[Video17 Plugin] Loaded: Spotify Algorithm slides ready.');
})();
