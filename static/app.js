// API config fallback for Live Server environments (port 5501)
const API_BASE = (window.location.port === '5501') ? '' : 'http://' + window.location.hostname + ':5501';
// State Management & History (Undo/Redo)
let slides = [];
let undoStack = [];
let redoStack = [];
const MAX_HISTORY = 100;
let currentSlideIndex = 0;
const urlParams = new URLSearchParams(window.location.search);
const scriptParam = urlParams.get('script');
let currentScript = scriptParam || localStorage.getItem('currentScript') || 'video17';
if (scriptParam) {
    localStorage.setItem('currentScript', scriptParam);
}
let isPlaying = false;
let playbackTimer = null;
let silentTimeout = null;
let currentSlideStartTime = 0; // ms
let currentSlideProgress = 0; // seconds
let audioContext = null;
let audioAnalyser = null;
let currentAudioNode = null;
let currentAudioElement = null;
let audioSourceNode = null;
let currentWaveStyle = localStorage.getItem('wave_style') || 'bell';
let synthesisPollInterval = null;
function initAudioPlayer() {
    if (!currentAudioElement) {
        currentAudioElement = new Audio();
    }
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioAnalyser = audioContext.createAnalyser();
            audioAnalyser.fftSize = 64;
            audioSourceNode = audioContext.createMediaElementSource(currentAudioElement);
            audioSourceNode.connect(audioAnalyser);
            audioAnalyser.connect(audioContext.destination);
        } catch (e) {
            console.warn("Web Audio API hook failed:", e);
        }
    }
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}
function formatTitleHTML(title) {
    if (!title) return '';
    // Match common prefixes to separate them into small header lines (including Tháº£m há»a, TÃ¡c háº¡i, Giáº£i phÃ¡p, v.v.)
    const match = title.match(/^(Kháº¯c phá»¥c(?:\s+\d+)?|Tháº£m há»a|TÃ¡c háº¡i|Giáº£i phÃ¡p|Káº¿t quáº£|Háº­u quáº£|NguyÃªn lÃ½|TrÆ°á»›c tá»‘i Æ°u|Sau tá»‘i Æ°u|BÃ­ áº©n|CÃ¢u há»i|Tháº¯c máº¯c|Táº¡i sao|So sÃ¡nh|Khá»Ÿi Ä‘áº§u|Dá»¯ liá»‡u Ä‘áº§u vÃ o|Chu ká»³ thá»i gian|CÆ¡ cháº¿ báº£o máº­t|Káº¿t quáº£ bÄƒm|RÃºt gá»n sá»‘|Cáº¯t láº¥y 6 sá»‘|XÃ¡c thá»±c khá»›p mÃ£|TÃ¢m lÃ½ lá»‡ch giá»|Máº¥t deal vÃ¬|Háº¡ táº§ng SMS|Giáº£i phÃ¡p offline|BÃ­ áº©n Ä‘áº±ng sau|XÃ¡c thá»±c|KhÃ³a bÃ­ máº­t|Thá»i gian|Chu ká»³|Thuáº­t toÃ¡n|Cáº¯t sá»‘|Lá»‡ch giá»|NguyÃªn nhÃ¢n|CÆ¡ cháº¿|Gá»­i Request|Ghi nháº­n|Giao tiáº¿p|Xá»­ lÃ½|HoÃ n thÃ nh|Lá»—i máº¡ng|Thá»­ láº¡i)[:\-\.]?\s*(.*)$/i);
    if (match) {
        let mainText = match[2] || '';
        if (mainText) {
            mainText = mainText.charAt(0).toUpperCase() + mainText.slice(1);
        }
        return `<span class="title-prefix">${match[1]}</span><span class="title-main">${mainText}</span>`;
    }
    return title;
}
function getPerformanceStatus(slide) {
    if (!slide) return { text: 'Performance Boosted!', class: 'success', icon: 'sparkles' };
    if (slide.badge) {
        if (slide.badge.type === 'danger' || slide.badge.type === 'warning') {
            return { text: slide.badge.text || 'Performance Warning', class: slide.badge.type, icon: slide.badge.icon || 'alert-triangle' };
        }
        return { text: slide.badge.text || 'Performance Boosted!', class: 'success', icon: slide.badge.icon || 'sparkles' };
    }
    const combined = `${slide.title || ''} ${slide.subtitle || ''} ${slide.id || ''}`.toLowerCase();
    if (combined.includes('thiáº¿u an toÃ n') ||
        combined.includes('thá»§ pháº¡m') ||
        combined.includes('lá»— há»•ng') ||
        combined.includes('nguy hiá»ƒm') ||
        combined.includes('hacker') ||
        combined.includes('táº¥n cÃ´ng') ||
        combined.includes('danger')) {
        return { text: 'Security Vulnerability!', class: 'danger', icon: 'alert-octagon' };
    }
    if (combined.includes('trÆ°á»›c tá»‘i Æ°u') ||
        combined.includes('cháº­m') ||
        combined.includes('chÆ°a') ||
        combined.includes('scan') ||
        combined.includes('tuáº§n tá»±') ||
        combined.includes('ngháº½n') ||
        combined.includes('háº­u quáº£') ||
        combined.includes('tÃ¡c háº¡i')) {
        return { text: 'Performance Warning!', class: 'danger', icon: 'alert-triangle' };
    }
    return { text: 'Performance Boosted!', class: 'success', icon: 'sparkles' };
}
function initVisualizerBars(numBars = 40) {
    const container = document.querySelector('.visualizer-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = `visualizer-bar bar-${i + 1}`;
        bar.style.display = 'flex';
        bar.style.flexDirection = 'column-reverse';
        bar.style.gap = '2.5px';
        bar.style.height = '100%';
        bar.style.justifyContent = 'flex-start';
        bar.style.background = 'transparent';
        
        // Add 6 stacked square indicator dots per bar column
        for (let j = 0; j < 6; j++) {
            const dot = document.createElement('div');
            dot.className = 'visualizer-dot';
            dot.style.width = '8px';
            dot.style.height = '6px';
            dot.style.borderRadius = '1.5px';
            dot.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            dot.style.opacity = '0.35';
            dot.style.transition = 'all 0.1s ease';
            bar.appendChild(dot);
        }
        container.appendChild(bar);
    }
    visualizerBars = null; // Clear cached array to trigger re-query
}
// Estimate slide duration based on script text or generated audio
function getSlideDuration(slide) {
    if (!slide) return 10.0;
    if (slide.audioPath && slide.duration) {
        return slide.duration;
    }
    // Fallback calculation based on script text length
    const words = (slide.script || '').trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > 0) {
        // Estimate average reading speed: 2.5 words per second
        return Math.min(30.0, Math.max(4.0, words.length / 2.5));
    }
    return 10.0;
}
function getSlideIcon(slide) {
    if (!slide) return "heading";
    if (slide.icon) return slide.icon;
    const titleLower = (slide.title || "").toLowerCase();
    const subtitleLower = (slide.subtitle || "").toLowerCase();
    const combined = `${titleLower} ${subtitleLower}`;
    if (combined.includes("database") || combined.includes("db") || combined.includes("báº£n ghi") || combined.includes("truy váº¥n")) {
        return "database";
    }
    if (combined.includes("cháº­m") || combined.includes("quÃ¡ táº£i") || combined.includes("ngháº½n") || combined.includes("lag") || combined.includes("lá»—i") || combined.includes("timeout") || combined.includes("háº­u quáº£")) {
        return "alert-triangle";
    }
    if (combined.includes("nhanh") || combined.includes("gáº¥p") || combined.includes("tá»‘i Æ°u") || combined.includes("hiá»‡u nÄƒng") || combined.includes("tá»‘c Ä‘á»™") || combined.includes("lá»£i") || combined.includes("chá»‰ vá»›i") || combined.includes("eager")) {
        return "zap";
    }
    if (combined.includes("kháº¯c phá»¥c") || combined.includes("giáº£i phÃ¡p") || combined.includes("join") || combined.includes("load")) {
        return "check-circle";
    }
    if (combined.includes("so sÃ¡nh")) {
        return "bar-chart-2";
    }
    if (slide.layout === 'code') return "code-2";
    if (slide.layout === 'diagram') return "git-commit";
    if (slide.layout === 'cards') return "layout-grid";
    if (slide.layout === 'metrics') return "trending-up";
    if (slide.layout === 'spotify') return "music";
    return "heading";
}
function getSlideHeaderEmoji(slide) {
    if (!slide) return 'ðŸ’¡';
    if (slide.id && slide.id.startsWith('slide_ticket_1a')) {
        return 'ðŸŽ«';
    }
    const titleLower = (slide.title || "").toLowerCase();
    const subtitleLower = (slide.subtitle || "").toLowerCase();
    const combined = `${titleLower} ${subtitleLower}`;
    if (combined.includes("database lock") || combined.includes("db lock") || combined.includes("khÃ³a")) {
        return "ðŸ”’";
    }
    if (combined.includes("redis decr") || combined.includes("redis lua")) {
        return "âš¡";
    }
    if (combined.includes("sáº­p") || combined.includes("ngháº½n") || combined.includes("quÃ¡ táº£i") || combined.includes("timeout") || combined.includes("lá»‘t") || combined.includes("lá»—i") || combined.includes("giÃ nh giáº­t")) {
        return "ðŸ’¥";
    }
    if (combined.includes("database") || combined.includes("db") || combined.includes("ghi Ä‘Ã¨")) {
        return "ðŸ’¾";
    }
    if (combined.includes("thanh toÃ¡n") || combined.includes("hÃ ng Ä‘á»£i") || combined.includes("báº¥t Ä‘á»“ng bá»™")) {
        return "ðŸ’³";
    }
    if (combined.includes("tÃ­nh táº¯c") || combined.includes("milli-giÃ¢y") || combined.includes("tÃ­ch táº¯c")) {
        return "â±ï¸";
    }
    if (combined.includes("theo dÃµi") || combined.includes("cáº£m Æ¡n")) {
        return "ðŸŽ‰";
    }
    // Fallback based on layout
    if (slide.layout === 'code') return "ðŸ’»";
    if (slide.layout === 'diagram') return "ðŸŽ¯";
    if (slide.layout === 'cards') return "ðŸŽ´";
    if (slide.layout === 'metrics') return "ðŸ“Š";
    if (slide.layout === 'spotify') return "ðŸŽµ";
    return "ðŸ’¡";
}
function getCardType(card) {
    if (!card) return "neutral";
    if (card.type === 'success' || card.type === 'pro') return 'pro';
    if (card.type === 'danger' || card.type === 'con') return 'con';
    if (card.type) return card.type;
    const combined = `${card.title || ""} ${card.desc || ""}`.toLowerCase();
    if (combined.includes("cháº­m") || combined.includes("tá»‘n") || combined.includes("quÃ¡ táº£i") || combined.includes("lag") || combined.includes("lá»—i") || combined.includes("n+1") || combined.includes("timeout") || combined.includes("ngháº½n") || combined.includes("sáº­p")) {
        return "con";
    }
    if (combined.includes("nhanh") || combined.includes("tá»‘i Æ°u") || combined.includes("tiáº¿t kiá»‡m") || combined.includes("join") || combined.includes("eager") || combined.includes("mÆ°á»£t")) {
        return "pro";
    }
    return "neutral";
}
// Recording Reference Audio Voice
let mediaRecorder = null;
let recordedChunks = [];
let recordTimer = null;
// Video Export State
let exportMediaRecorder = null;
let exportChunks = [];
let isExporting = false;
let exportSlideIndex = 0;
// Lucide Icon mappings
const iconMap = {
    'database': 'database',
    'zap': 'zap',
    'cpu': 'cpu',
    'git-branch': 'git-branch',
    'server': 'server',
    'activity': 'activity',
    'shield': 'shield',
    'hard-drive': 'hard-drive',
    'terminal': 'terminal'
};
// Fetch and load scripts list
async function loadScriptList() {
    try {
        const response = await fetch(`${API_BASE}/api/scripts`);
        const scriptsList = await response.json();
        const select = document.getElementById('script-select');
        select.innerHTML = '';
        scriptsList.forEach(scr => {
            const opt = document.createElement('option');
            opt.value = scr;
            opt.textContent = scr;
            select.appendChild(opt);
        });
        if (scriptsList.includes(currentScript)) {
            select.value = currentScript;
        } else if (scriptsList.length > 0) {
            currentScript = scriptsList[0];
            localStorage.setItem('currentScript', currentScript);
            select.value = currentScript;
        }
    } catch (err) {
        console.error('Failed to load scripts list:', err);
    }
}
// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Setup Scaling
    adjustCanvasScale();
    window.addEventListener('resize', adjustCanvasScale);
    // 2. Load Init Data
    await loadScriptList();
    await fetchSlides();
    await fetchVoices();
    checkVoxCPMStatus();
    checkActiveExportStatus();
    // Poll VoxCPM status every 5 seconds
    setInterval(checkVoxCPMStatus, 5000);
    // Poll active export status every 4 seconds
    setInterval(checkActiveExportStatus, 4000);
    // 3. Bind Event Listeners
    setupEventListeners();
    // 4. Build Custom Visualizer Bars
    initVisualizerBars(24);
    // 5. Start visualizer animator
    animateVisualizer();
});
// Responsive scaling of 1080x1920 vertical canvas
function adjustCanvasScale() {
    const container = document.getElementById('canvas-scaler-box');
    const canvas = document.getElementById('tiktok-canvas');
    if (!container || !canvas) return;
    const contWidth = container.clientWidth;
    const contHeight = container.clientHeight;
    // Design resolution for 9:16 vertical TikTok layout
    const designWidth = 1080;
    const designHeight = 1920;
    // Compute scale to fit container vertically or horizontally
    const scale = Math.min(contWidth / designWidth, contHeight / designHeight) * 0.95;
    // Apply transform
    canvas.style.transform = `scale(${scale})`;
}
// Fetch Slides Config
async function fetchSlides() {
    try {
        const response = await fetch(`${API_BASE}/api/slides?script=${currentScript}`);
        slides = await response.json();
        // Initialize Undo/Redo history
        undoStack = [JSON.stringify(slides)];
        redoStack = [];
        updateUndoRedoButtons();
        renderSlideList();
        renderActiveSlide();
        renderTimeline();
        updateEpisodeHeader();
        initScriptTopic();
        loadVideoScript(currentScript);
        checkActiveSynthesisProgress();
    } catch (err) {
        console.error('Failed to fetch slides:', err);
    }
}
// Fetch available voices
async function fetchVoices() {
    try {
        const response = await fetch(`${API_BASE}/api/voices`);
        const data = await response.json();
        const refSelect = document.getElementById('slide-ref-voice-select');
        // Clear except first
        refSelect.innerHTML = '<option value="default_voxcpm">-- DÃ¹ng Giá»ng máº·c Ä‘á»‹nh há»‡ thá»‘ng --</option>';
        data.voices.forEach(voice => {
            const opt = document.createElement('option');
            opt.value = voice;
            opt.textContent = voice;
            refSelect.appendChild(opt);
        });
        // Set up fallback voices list if available
        const fallbackSelect = document.getElementById('slide-voice-fallback-select');
        fallbackSelect.innerHTML = '';
        data.fallback_voices.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.id;
            opt.textContent = v.name;
            fallbackSelect.appendChild(opt);
        });
    } catch (err) {
        console.error('Failed to fetch voices:', err);
    }
}
// Check VoxCPM Download & Setup Status
async function checkVoxCPMStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/voxcpm/status`);
        const data = await response.json();
        const badge = document.getElementById('voxcpm-status-badge');
        const dlBtn = document.getElementById('download-voxcpm-btn');
        if (data.model_loaded) {
            badge.className = 'badge success';
            badge.textContent = 'VoxCPM Active (Voice Cloning OK)';
            dlBtn.style.display = 'none';
        } else if (data.checkpoint_downloaded) {
            badge.className = 'badge warning';
            badge.textContent = 'VoxCPM Loading...';
            dlBtn.style.display = 'none';
        } else {
            badge.className = 'badge warning';
            badge.textContent = 'VoxCPM Weights Missing (Offline Fallback)';
            if (data.download_status.status === 'downloading') {
                badge.textContent = `Downloading Weights (${data.download_status.progress}%)`;
                dlBtn.style.display = 'none';
            } else {
                dlBtn.style.display = 'inline-flex';
            }
        }
    } catch (err) {
        console.warn('Cannot check VoxCPM status:', err);
    }
}
// Bind controls
function setupEventListeners() {
    // Add Slide
    document.getElementById('add-slide-btn').addEventListener('click', () => {
        const newId = `slide_${Date.now()}`;
        const newSlide = {
            id: newId,
            title: "TiÃªu Ä‘á» Slide má»›i",
            subtitle: "MÃ´ táº£ ngáº¯n cá»§a slide",
            layout: "title",
            script: "Viáº¿t lá»i thoáº¡i á»Ÿ Ä‘Ã¢y Ä‘á»ƒ AI Ä‘á»c.",
            voice: "vi-VN-HoaiMyNeural",
            refVoice: "",
            audioPath: "",
            duration: 10.0,
            cards: [
                { "icon": "database", "title": "Database Optimization", "desc": "Optimize queries and indexes." },
                { "icon": "zap", "title": "Caching Layer", "desc": "Speed up API speed." }
            ],
            code: "SELECT * FROM users;",
            diagram: [
                { "id": "d_1", "label": "Client", "type": "start" },
                { "id": "d_2", "label": "Server", "type": "process" }
            ],
            metrics: "95% | Giáº£m táº£i CPU\n10x | Tá»‘c Ä‘á»™ truy váº¥n\n0.5ms | Latency Cache"
        };
        slides.push(newSlide);
        currentSlideIndex = slides.length - 1;
        saveSlidesToServer();
    });
    // Script switcher dropdown & create button
    const scriptSelect = document.getElementById('script-select');
    if (scriptSelect) {
        scriptSelect.addEventListener('change', async (e) => {
            currentScript = e.target.value;
            localStorage.setItem('currentScript', currentScript);
            currentSlideIndex = 0;
            loadVideoScript(currentScript);
            await fetchSlides();
        });
    }
    const prevScriptBtn = document.getElementById('prev-script-btn');
    if (prevScriptBtn && scriptSelect) {
        prevScriptBtn.addEventListener('click', async () => {
            const idx = scriptSelect.selectedIndex;
            if (idx > 0) {
                scriptSelect.selectedIndex = idx - 1;
                scriptSelect.dispatchEvent(new Event('change'));
            }
        });
    }
    const nextScriptBtn = document.getElementById('next-script-btn');
    if (nextScriptBtn && scriptSelect) {
        nextScriptBtn.addEventListener('click', async () => {
            const idx = scriptSelect.selectedIndex;
            if (idx >= 0 && idx < scriptSelect.options.length - 1) {
                scriptSelect.selectedIndex = idx + 1;
                scriptSelect.dispatchEvent(new Event('change'));
            }
        });
    }
    const createScriptBtn = document.getElementById('create-script-btn');
    if (createScriptBtn) {
        createScriptBtn.addEventListener('click', async () => {
            const name = prompt("Nháº­p tÃªn ká»‹ch báº£n má»›i (chá»‰ dÃ¹ng chá»¯ cÃ¡i, sá»‘, gáº¡ch dÆ°á»›i, gáº¡ch ngang):");
            if (name) {
                const sanitizedName = name.trim().replace(/[^a-zA-Z0-9_\-]/g, '');
                if (!sanitizedName) {
                    alert("TÃªn ká»‹ch báº£n khÃ´ng há»£p lá»‡!");
                    return;
                }
                try {
                    const response = await fetch(`${API_BASE}/api/scripts`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: sanitizedName })
                    });
                    const data = await response.json();
                    if (data.success) {
                        currentScript = data.name;
                        localStorage.setItem('currentScript', currentScript);
                        await loadScriptList();
                        await fetchSlides();
                        alert(`ÄÃ£ táº¡o ká»‹ch báº£n má»›i: ${data.name}`);
                    } else {
                        alert(`Lá»—i: ${data.error}`);
                    }
                } catch (err) {
                    alert(`KhÃ´ng táº¡o Ä‘Æ°á»£c ká»‹ch báº£n: ${err.message}`);
                }
            }
        });
    }
    // Test Voice button
    const testVoiceBtn = document.getElementById('test-voice-btn');
    if (testVoiceBtn) {
        testVoiceBtn.addEventListener('click', async () => {
            const voiceSelect = document.getElementById('slide-voice-fallback-select');
            const selectedVoice = voiceSelect.value;
            const originalText = testVoiceBtn.innerHTML;
            testVoiceBtn.disabled = true;
            testVoiceBtn.innerHTML = '<i class="export-spinner" style="width: 12px; height: 12px; border-width: 2px;"></i>';
            try {
                const testText = "Xin chÃ o! ÄÃ¢y lÃ  báº£n nghe thá»­ Ã¢m thanh cá»§a giá»ng Ä‘á»c Ä‘Æ°á»£c chá»n.";
                const refVoiceSelect = document.getElementById('slide-ref-voice-select');
                const voxcpmBtn = document.getElementById('tts-mode-voxcpm-btn');
                const isVoxCPM = voxcpmBtn && voxcpmBtn.classList.contains('active');
                const refVoice = (refVoiceSelect && isVoxCPM) ? refVoiceSelect.value : '';
                const response = await fetch(`${API_BASE}/api/synthesize`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slideId: 'test_voice_preview',
                        text: testText,
                        refVoice: refVoice,
                        voice: selectedVoice,
                        script: currentScript
                    })
                });
                const data = await response.json();
                if (data.success) {
                    const audio = new Audio(data.audioUrl + "?t=" + Date.now());
                    audio.play();
                } else {
                    alert('Lá»—i thá»­ giá»ng: ' + data.error);
                }
            } catch (err) {
                alert('KhÃ´ng thá»ƒ thá»­ giá»ng: ' + err.message);
            } finally {
                testVoiceBtn.disabled = false;
                testVoiceBtn.innerHTML = originalText;
            }
        });
    }
    // Layout buttons
    const layoutBtns = document.querySelectorAll('.layout-btn');
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            layoutBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const layout = btn.getAttribute('data-layout');
            slides[currentSlideIndex].layout = layout;
            showLayoutInputs(layout);
            renderActiveSlide();
            saveSlidesToServer();
        });
    });
    // Inputs dynamic binding
    const bindInput = (id, propName, forceRebuild = false) => {
        const elem = document.getElementById(id);
        if (!elem) return;
        elem.addEventListener('input', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex][propName] = e.target.value;
                // If it is transition layout, auto-sync title/subtitle modifications to transitionTitle
                if (slides[currentSlideIndex].layout === 'transition') {
                    const titleVal = slides[currentSlideIndex].title || '';
                    const subtitleVal = slides[currentSlideIndex].subtitle || '';
                    slides[currentSlideIndex].transitionTitle = `<span style='font-size:24px; font-weight: 600; color: var(--gold-primary); display:block; margin-bottom: 20px; text-transform: uppercase;'>${subtitleVal}</span><span style='font-size: 48px; font-weight: 900; display:block; color: #fff;'>${titleVal}</span>`;
                    const transTitleInput = document.getElementById('slide-transition-title');
                    if (transTitleInput) {
                        transTitleInput.value = slides[currentSlideIndex].transitionTitle;
                    }
                }
                renderActiveSlide(forceRebuild);
                debounceSave();
            }
        });
    };
    bindInput('slide-title-input', 'title');
    bindInput('slide-subtitle-input', 'subtitle');
    bindInput('slide-code-input', 'code', true);
    const phraseInputBinding = document.getElementById('slide-code-phrase-highlights-input');
    if (phraseInputBinding) {
        phraseInputBinding.addEventListener('input', (e) => {
            if (slides[currentSlideIndex]) {
                const lines = e.target.value.split('\n').filter(l => l.trim().length > 0);
                slides[currentSlideIndex].codePhraseHighlights = lines.map(line => {
                    const parts = line.split('|').map(x => x.trim());
                    let className = 'code-highlight-bad';
                    if (parts[3] === 'good') className = 'code-highlight-good';
                    else if (parts[3] === 'gold') className = 'code-highlight-gold';
                    return {
                        phrase: parts[0] || '',
                        start: parseFloat(parts[1]) || 0,
                        end: parseFloat(parts[2]) || 0,
                        class: className
                    };
                }).filter(h => h.phrase.length > 0);
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    bindInput('slide-script-input', 'script');
    bindInput('slide-split-left-title', 'splitLeftTitle', true);
    bindInput('slide-split-left-text', 'splitLeftText', true);
    bindInput('slide-split-right-title', 'splitRightTitle', true);
    bindInput('slide-split-right-text', 'splitRightText', true);
    bindInput('slide-quote-text', 'quoteText', true);
    bindInput('slide-quote-author', 'quoteAuthor', true);
    bindInput('slide-metrics-input', 'metrics', true);
    // New layouts inputs
    bindInput('slide-tree-root', 'treeRoot', true);
    bindInput('slide-tree-left', 'treeLeft', true);
    bindInput('slide-tree-right', 'treeRight', true);
    bindInput('slide-tree-target', 'treeTarget', true);
    bindInput('slide-table-headers', 'tableHeaders', true);
    bindInput('slide-table-rows', 'tableRows', true);
    bindInput('slide-table-highlight', 'tableHighlight', true);
    bindInput('slide-alert-detail', 'alertDetail', true);
    const treeHighlightSelect = document.getElementById('slide-tree-highlight');
    if (treeHighlightSelect) {
        treeHighlightSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].treeHighlight = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const tableHighlightTypeSelect = document.getElementById('slide-table-highlight-type');
    if (tableHighlightTypeSelect) {
        tableHighlightTypeSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].tableHighlightType = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const alertLevelSelect = document.getElementById('slide-alert-level');
    if (alertLevelSelect) {
        alertLevelSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].alertLevel = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const iconSelect = document.getElementById('slide-icon-select');
    if (iconSelect) {
        iconSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].icon = e.target.value;
                renderActiveSlide();
                debounceSave();
            }
        });
    }
    // New layouts inputs bindings
    bindInput('slide-boxes-labels', 'boxesLabels', true);
    bindInput('slide-boxes-highlight', 'boxesHighlight', true);
    bindInput('slide-search-query', 'searchQuery', true);
    bindInput('slide-search-status', 'searchStatus', true);
    bindInput('slide-transition-title', 'transitionTitle', true);
    bindInput('slide-transition-icon', 'transitionIcon', true);
    const boxesHighlightTypeSelect = document.getElementById('slide-boxes-highlight-type');
    if (boxesHighlightTypeSelect) {
        boxesHighlightTypeSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].boxesHighlightType = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const searchIndicatorSelect = document.getElementById('slide-search-indicator');
    if (searchIndicatorSelect) {
        searchIndicatorSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].searchIndicator = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const transitionThemeSelect = document.getElementById('slide-transition-theme');
    if (transitionThemeSelect) {
        transitionThemeSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].transitionTheme = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    bindInput('slide-hook-tag', 'hookTag', true);
    bindInput('slide-hook-title', 'hookTitle', true);
    bindInput('slide-hook-subtitle', 'hookSubtitle', true);
    bindInput('slide-hook-icon', 'hookIcon', true);
    const hookThemeSelect = document.getElementById('slide-hook-theme');
    if (hookThemeSelect) {
        hookThemeSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].hookTheme = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    bindInput('slide-spotify-playlist', 'spotifyPlaylist', true);
    bindInput('slide-spotify-search-query', 'spotifySearchQuery', true);
    bindInput('slide-spotify-active-song', 'spotifyActiveSong', true);
    bindInput('slide-spotify-songs', 'spotifySongs', true);
    const spotifyViewModeSelect = document.getElementById('slide-spotify-view-mode');
    if (spotifyViewModeSelect) {
        spotifyViewModeSelect.addEventListener('change', (e) => {
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].spotifyViewMode = e.target.value;
                renderActiveSlide(true);
                debounceSave();
            }
        });
    }
    const standardBtn = document.getElementById('tts-mode-standard-btn');
    const voxcpmBtn = document.getElementById('tts-mode-voxcpm-btn');
    const standardContainer = document.getElementById('standard-voice-container');
    const voxcpmContainer = document.getElementById('voxcpm-voice-container');
    if (standardBtn && voxcpmBtn) {
        standardBtn.addEventListener('click', () => {
            if (!slides[currentSlideIndex]) return;
            standardBtn.classList.add('active');
            voxcpmBtn.classList.remove('active');
            standardContainer.style.display = 'block';
            voxcpmContainer.style.display = 'none';
            // Clear refVoice when selecting standard cloud TTS mode
            slides[currentSlideIndex].refVoice = '';
            document.getElementById('slide-ref-voice-select').value = 'default_voxcpm';
            debounceSave();
        });
        voxcpmBtn.addEventListener('click', () => {
            if (!slides[currentSlideIndex]) return;
            standardBtn.classList.remove('active');
            voxcpmBtn.classList.add('active');
            standardContainer.style.display = 'none';
            voxcpmContainer.style.display = 'block';
            // Set refVoice to current selection of slide-ref-voice-select
            const val = document.getElementById('slide-ref-voice-select').value;
            slides[currentSlideIndex].refVoice = val;
            debounceSave();
        });
    }
    document.getElementById('slide-ref-voice-select').addEventListener('change', (e) => {
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].refVoice = e.target.value;
            debounceSave();
        }
    });
    document.getElementById('slide-voice-fallback-select').addEventListener('change', (e) => {
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].voice = e.target.value;
            debounceSave();
        }
    });
    // Synthesis buttons
    document.getElementById('generate-audio-btn').addEventListener('click', generateAudioForActiveSlide);
    document.getElementById('generate-all-audio-btn').addEventListener('click', generateAudioForAllSlides);
    // Timeline player buttons
    document.getElementById('play-btn').addEventListener('click', togglePlayback);
    document.getElementById('play-prev-btn').addEventListener('click', playPreviousSlide);
    document.getElementById('play-next-btn').addEventListener('click', playNextSlide);
    // Fullscreen Controls Bindings
    const fsReloadBtn = document.getElementById('fs-reload-btn');
    if (fsReloadBtn) {
        fsReloadBtn.addEventListener('click', () => {
            stopPlayback();
            selectSlide(0);
            startPlayback();
        });
    }
    const fsPlayBtn = document.getElementById('fs-play-btn');
    if (fsPlayBtn) {
        fsPlayBtn.addEventListener('click', () => {
            togglePlayback();
        });
    }
    const fsExitBtn = document.getElementById('fs-exit-btn');
    if (fsExitBtn) {
        fsExitBtn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    }
    // Record reference voice button
    document.getElementById('record-btn').addEventListener('click', toggleVoiceRecording);
    document.getElementById('upload-voice-btn').addEventListener('click', uploadRecordedVoice);
    // Model download trigger
    document.getElementById('download-voxcpm-btn').addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE}/api/voxcpm/download`, { method: 'POST' });
            const data = await response.json();
            if (data.success) {
                alert('Báº¯t Ä‘áº§u táº£i mÃ´ hÃ¬nh VoxCPM trong ná»n (khoáº£ng 4GB). Báº¡n cÃ³ thá»ƒ xem tráº¡ng thÃ¡i á»Ÿ gÃ³c trÃªn!');
                checkVoxCPMStatus();
            }
        } catch (e) {
            console.error(e);
        }
    });
    // Diagram node operations
    document.getElementById('add-diagram-node').addEventListener('click', () => {
        const activeSlide = slides[currentSlideIndex];
        if (!activeSlide.diagram) activeSlide.diagram = [];
        const newNodeId = `node_${Date.now()}`;
        activeSlide.diagram.push({
            id: newNodeId,
            label: "BÆ°á»›c má»›i",
            type: "process",
            note: ""
        });
        renderDiagramEditor();
        renderActiveSlide();
        saveSlidesToServer();
    });
    // Export video button
    document.getElementById('record-video-btn').addEventListener('click', startVideoExport);
    // Headless MP4 Export button
    const exportMp4Btn = document.getElementById('export-mp4-btn');
    if (exportMp4Btn) {
        exportMp4Btn.addEventListener('click', startHeadlessMp4Export);
    }
    // View Video button
    const viewVideoBtn = document.getElementById('view-video-btn');
    if (viewVideoBtn) {
        viewVideoBtn.addEventListener('click', async () => {
            try {
                await fetch(`${API_BASE}/api/open-folder`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ script: currentScript, type: 'video' })
                });
            } catch (err) {
                console.warn("Folder open API failed locally:", err);
            }
            window.open(`${API_BASE}/kichban/${currentScript}/mp4/video.mp4`, '_blank');
        });
    }
    // Open MP3 Folder button
    const openMp3FolderBtn = document.getElementById('open-mp3-folder-btn');
    if (openMp3FolderBtn) {
        openMp3FolderBtn.addEventListener('click', async () => {
            try {
                const res = await fetch(`${API_BASE}/api/open-folder`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ script: currentScript, type: 'mp3' })
                });
                const data = await res.json();
                if (!data.success) {
                    alert("ChÆ°a cÃ³ file thuyáº¿t minh. Vui lÃ²ng táº¡o giá»ng nÃ³i trÆ°á»›c!");
                }
            } catch (err) {
                alert("KhÃ´ng má»Ÿ Ä‘Æ°á»£c thÆ° má»¥c: " + err.message);
            }
        });
    }
    // Fullscreen button click
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const container = document.getElementById('canvas-scaler-box');
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => {
                    console.error(`Lá»—i cháº¿ Ä‘á»™ toÃ n mÃ n hÃ¬nh: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
    // Wave style selector binding
    const waveStyleSelect = document.getElementById('wave-style-select');
    if (waveStyleSelect) {
        waveStyleSelect.value = currentWaveStyle;
        waveStyleSelect.addEventListener('change', (e) => {
            currentWaveStyle = e.target.value;
            localStorage.setItem('wave_style', currentWaveStyle);
        });
    }
    // Fullscreen change listener
    document.addEventListener('fullscreenchange', () => {
        const btn = document.getElementById('fullscreen-btn');
        if (!btn) return;
        if (document.fullscreenElement) {
            btn.innerHTML = '<i data-lucide="minimize" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ThoÃ¡t ToÃ n MÃ n HÃ¬nh';
        } else {
            btn.innerHTML = '<i data-lucide="maximize" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> Xem Full MÃ n HÃ¬nh';
        }
        lucide.createIcons();
        adjustCanvasScale();
    });
    // Edit Canvas Header Topic click
    const topicEl = document.getElementById('canvas-header-topic');
    if (topicEl) {
        topicEl.addEventListener('click', () => {
            const currentTopic = topicEl.textContent.trim();
            const newTopic = prompt("Nháº­p chá»§ Ä‘á» hiá»ƒn thá»‹ (gÃ³c pháº£i Canvas Header):", currentTopic);
            if (newTopic !== null) {
                const pluginTopic = window.VideoPlugin ? window.VideoPlugin.topic : null;
                const cleanTopic = newTopic.trim() || pluginTopic || 'Optimize Backend';
                topicEl.textContent = cleanTopic;
                localStorage.setItem(`topic_${currentScript}`, cleanTopic);
            }
        });
    }
    // Toggle TikTok UI Overlay
    document.getElementById('toggle-overlay-btn').addEventListener('click', () => {
        const overlay = document.getElementById('tiktok-ui-simulator');
        const btn = document.getElementById('toggle-overlay-btn');
        if (overlay.style.display === 'none') {
            overlay.style.display = 'flex';
            btn.innerHTML = '<i data-lucide="eye-off" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> áº¨n Phá»§ TikTok';
            btn.classList.add('active');
        } else {
            overlay.style.display = 'none';
            btn.innerHTML = '<i data-lucide="eye" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> Hiá»‡n Phá»§ TikTok';
            btn.classList.remove('active');
        }
        lucide.createIcons();
    });
    // Undo / Redo Click Bindings
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);

        if (isInput) return; // Do not intercept typing shortcuts inside inputs

        // Spacebar: Play/Pause
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            togglePlayback();
            return;
        }

        // Left Arrow: Previous Slide
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            playPreviousSlide();
            return;
        }

        // Right Arrow: Next Slide
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            playNextSlide();
            return;
        }

        // Up Arrow: Previous Video/Script
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevBtn = document.getElementById('prev-script-btn');
            if (prevBtn) prevBtn.click();
            return;
        }

        // Down Arrow: Next Video/Script
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextBtn = document.getElementById('next-script-btn');
            if (nextBtn) nextBtn.click();
            return;
        }

        // Ctrl+Z / Ctrl+Y
        const isCtrl = e.ctrlKey || e.metaKey;
        if (isCtrl) {
            if (e.key.toLowerCase() === 'z') {
                e.preventDefault();
                undo();
            } else if (e.key.toLowerCase() === 'y') {
                e.preventDefault();
                redo();
            }
        }
    });
}
// Debounce save configuration
let saveTimeout = null;
function debounceSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveSlidesToServer, 1000);
}
async function saveSlidesToServer() {
    recordHistory();
    try {
        await fetch(`${API_BASE}/api/slides?script=${currentScript}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slides)
        });
        renderSlideList();
        renderTimeline();
    } catch (err) {
        console.error('Failed to save slides:', err);
    }
}
// Slide List Render
function renderSlideList() {
    const list = document.getElementById('slide-list');
    list.innerHTML = '';
    slides.forEach((slide, idx) => {
        const item = document.createElement('div');
        item.className = `slide-item ${idx === currentSlideIndex ? 'active' : ''}`;
        item.addEventListener('click', () => selectSlide(idx));
        const info = document.createElement('div');
        info.className = 'slide-item-info';
        const num = document.createElement('span');
        num.className = 'slide-item-index';
        num.textContent = `${(idx + 1).toString().padStart(2, '0')}`;
        const title = document.createElement('span');
        title.className = 'slide-item-title';
        const iconName = getSlideIcon(slide);
        title.innerHTML = `<i data-lucide="${iconName}" style="width:22px; height:22px; display: inline-block; vertical-align: middle; margin-right: 6px; color: var(--gold-primary);"></i> ${slide.title}`;
        info.appendChild(num);
        info.appendChild(title);
        const actions = document.createElement('div');
        actions.className = 'slide-item-actions';
        const lay = document.createElement('span');
        lay.className = 'slide-item-layout';
        lay.textContent = slide.layout;
        const del = document.createElement('button');
        del.className = 'slide-delete-btn';
        del.innerHTML = '<i data-lucide="trash-2" style="width:22px; height:22px;"></i>';
        del.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('XÃ³a slide nÃ y?')) {
                slides.splice(idx, 1);
                if (currentSlideIndex >= slides.length) {
                    currentSlideIndex = Math.max(0, slides.length - 1);
                }
                saveSlidesToServer().then(() => {
                    selectSlide(currentSlideIndex);
                });
            }
        });
        actions.appendChild(lay);
        if (slides.length > 1) {
            actions.appendChild(del);
        }
        item.appendChild(info);
        item.appendChild(actions);
        list.appendChild(item);
    });
    lucide.createIcons();
}
// Select Slide
function selectSlide(idx) {
    if (isPlaying) {
        stopPlayback();
    }
    currentSlideIndex = idx;
    renderSlideList();
    renderActiveSlide();
    renderTimeline();
}
// Display Slide in Editor Form
function renderActiveSlide(forceRebuild = true) {
    const slide = slides[currentSlideIndex];
    if (!slide) return;
    document.getElementById('active-slide-label').textContent = `SLIDE #${(currentSlideIndex + 1)}`;
    document.getElementById('slide-title-input').value = slide.title || '';
    document.getElementById('slide-subtitle-input').value = slide.subtitle || '';
    document.getElementById('slide-icon-select').value = slide.icon || '';
    document.getElementById('slide-script-input').value = slide.script || '';
    document.getElementById('slide-ref-voice-select').value = slide.refVoice || 'default_voxcpm';
    document.getElementById('slide-voice-fallback-select').value = slide.voice || 'vi-VN-HoaiMyNeural';
    // Update TTS mode selectors based on slide.refVoice presence
    const hasRefVoice = !!slide.refVoice;
    const standardBtn = document.getElementById('tts-mode-standard-btn');
    const voxcpmBtn = document.getElementById('tts-mode-voxcpm-btn');
    const standardContainer = document.getElementById('standard-voice-container');
    const voxcpmContainer = document.getElementById('voxcpm-voice-container');
    if (standardBtn && voxcpmBtn && standardContainer && voxcpmContainer) {
        if (hasRefVoice) {
            standardBtn.classList.remove('active');
            voxcpmBtn.classList.add('active');
            standardContainer.style.display = 'none';
            voxcpmContainer.style.display = 'block';
        } else {
            standardBtn.classList.add('active');
            voxcpmBtn.classList.remove('active');
            standardContainer.style.display = 'block';
            voxcpmContainer.style.display = 'none';
        }
    }
    document.getElementById('slide-code-input').value = slide.code || '';
    const phraseInput = document.getElementById('slide-code-phrase-highlights-input');
    if (phraseInput) {
        if (slide.codePhraseHighlights && Array.isArray(slide.codePhraseHighlights)) {
            phraseInput.value = slide.codePhraseHighlights.map(h => {
                let type = 'bad';
                if (h.class === 'code-highlight-good') type = 'good';
                else if (h.class === 'code-highlight-gold') type = 'gold';
                return `${h.phrase} | ${h.start} | ${h.end} | ${type}`;
            }).join('\n');
        } else {
            phraseInput.value = '';
        }
    }
    document.getElementById('slide-split-left-title').value = slide.splitLeftTitle || '';
    document.getElementById('slide-split-left-text').value = slide.splitLeftText || '';
    document.getElementById('slide-split-right-title').value = slide.splitRightTitle || '';
    document.getElementById('slide-split-right-text').value = slide.splitRightText || '';
    document.getElementById('slide-quote-text').value = slide.quoteText || '';
    document.getElementById('slide-quote-author').value = slide.quoteAuthor || '';
    document.getElementById('slide-metrics-input').value = slide.metrics || '';
    // Set values for the new layout editors
    const treeRootElem = document.getElementById('slide-tree-root');
    if (treeRootElem) treeRootElem.value = slide.treeRoot || '';
    const treeLeftElem = document.getElementById('slide-tree-left');
    if (treeLeftElem) treeLeftElem.value = slide.treeLeft || '';
    const treeRightElem = document.getElementById('slide-tree-right');
    if (treeRightElem) treeRightElem.value = slide.treeRight || '';
    const treeTargetElem = document.getElementById('slide-tree-target');
    if (treeTargetElem) treeTargetElem.value = slide.treeTarget || '';
    const treeHighlightElem = document.getElementById('slide-tree-highlight');
    if (treeHighlightElem) treeHighlightElem.value = slide.treeHighlight || 'left';
    const tableHeadersElem = document.getElementById('slide-table-headers');
    if (tableHeadersElem) tableHeadersElem.value = slide.tableHeaders || '';
    const tableRowsElem = document.getElementById('slide-table-rows');
    if (tableRowsElem) tableRowsElem.value = slide.tableRows || '';
    const tableHighlightElem = document.getElementById('slide-table-highlight');
    if (tableHighlightElem) tableHighlightElem.value = slide.tableHighlight || '';
    const tableHighlightTypeElem = document.getElementById('slide-table-highlight-type');
    if (tableHighlightTypeElem) tableHighlightTypeElem.value = slide.tableHighlightType || 'warning';
    const alertLevelElem = document.getElementById('slide-alert-level');
    if (alertLevelElem) alertLevelElem.value = slide.alertLevel || 'danger';
    const alertDetailElem = document.getElementById('slide-alert-detail');
    if (alertDetailElem) alertDetailElem.value = slide.alertDetail || '';
    // Set values for boxes, search, transition editors
    const boxesLabelsElem = document.getElementById('slide-boxes-labels');
    if (boxesLabelsElem) boxesLabelsElem.value = slide.boxesLabels || '';
    const boxesHighlightElem = document.getElementById('slide-boxes-highlight');
    if (boxesHighlightElem) boxesHighlightElem.value = slide.boxesHighlight || '';
    const boxesHighlightTypeElem = document.getElementById('slide-boxes-highlight-type');
    if (boxesHighlightTypeElem) boxesHighlightTypeElem.value = slide.boxesHighlightType || 'warning';
    const searchQueryElem = document.getElementById('slide-search-query');
    if (searchQueryElem) searchQueryElem.value = slide.searchQuery || '';
    const searchStatusElem = document.getElementById('slide-search-status');
    if (searchStatusElem) searchStatusElem.value = slide.searchStatus || '';
    const searchIndicatorElem = document.getElementById('slide-search-indicator');
    if (searchIndicatorElem) searchIndicatorElem.value = slide.searchIndicator || 'scanning';
    const transitionTitleElem = document.getElementById('slide-transition-title');
    if (transitionTitleElem) transitionTitleElem.value = slide.transitionTitle || '';
    const transitionIconElem = document.getElementById('slide-transition-icon');
    if (transitionIconElem) transitionIconElem.value = slide.transitionIcon || '';
    const transitionThemeElem = document.getElementById('slide-transition-theme');
    if (transitionThemeElem) transitionThemeElem.value = slide.transitionTheme || 'warning';
    const spotifyViewModeElem = document.getElementById('slide-spotify-view-mode');
    if (spotifyViewModeElem) spotifyViewModeElem.value = slide.spotifyViewMode || 'playlist';
    const spotifyPlaylistElem = document.getElementById('slide-spotify-playlist');
    if (spotifyPlaylistElem) spotifyPlaylistElem.value = slide.spotifyPlaylist || '';
    const spotifySearchQueryElem = document.getElementById('slide-spotify-search-query');
    if (spotifySearchQueryElem) spotifySearchQueryElem.value = slide.spotifySearchQuery || '';
    const spotifyActiveSongElem = document.getElementById('slide-spotify-active-song');
    if (spotifyActiveSongElem) spotifyActiveSongElem.value = slide.spotifyActiveSong || '';
    const spotifySongsElem = document.getElementById('slide-spotify-songs');
    if (spotifySongsElem) spotifySongsElem.value = slide.spotifySongs || '';
    const hookTagElem = document.getElementById('slide-hook-tag');
    if (hookTagElem) hookTagElem.value = slide.hookTag || '';
    const hookTitleElem = document.getElementById('slide-hook-title');
    if (hookTitleElem) hookTitleElem.value = slide.hookTitle || '';
    const hookSubtitleElem = document.getElementById('slide-hook-subtitle');
    if (hookSubtitleElem) hookSubtitleElem.value = slide.hookSubtitle || '';
    const hookIconElem = document.getElementById('slide-hook-icon');
    if (hookIconElem) hookIconElem.value = slide.hookIcon || '';
    const hookThemeElem = document.getElementById('slide-hook-theme');
    if (hookThemeElem) hookThemeElem.value = slide.hookTheme || 'danger';
    // Set Layout Button active state
    const layoutBtns = document.querySelectorAll('.layout-btn');
    layoutBtns.forEach(btn => {
        if (btn.getAttribute('data-layout') === slide.layout) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    showLayoutInputs(slide.layout);
    // Render Canvas content preview
    renderCanvasPreview(slide, 0, forceRebuild);
    // Render Audio Player if audio exists
    const audioContainer = document.getElementById('slide-audio-player-container');
    if (slide.audioPath) {
        audioContainer.style.display = 'block';
        audioContainer.innerHTML = `
            <div class="audio-player-status">
                <span class="audio-badge"><i data-lucide="check-circle" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> Ä Ã£ táº¡o Ã¢m thanh</span>
                <span class="audio-duration">Thá» i lÆ°á»£ng: ${slide.duration ? slide.duration.toFixed(1) : '0.0'}s</span>
            </div>
            <div class="audio-player-row">
                <audio id="slide-audio-widget" src="${slide.audioPath}?t=${Date.now()}" controls class="custom-audio-widget"></audio>
            </div>
        `;
        lucide.createIcons();
    } else {
        audioContainer.style.display = 'none';
        audioContainer.innerHTML = '';
    }
}
// Show/Hide sub-editors
function showLayoutInputs(layout) {
    document.getElementById('layout-input-metrics').style.display = layout === 'metrics' ? 'block' : 'none';
    document.getElementById('layout-input-code').style.display = layout === 'code' ? 'block' : 'none';
    document.getElementById('layout-input-diagram').style.display = layout === 'diagram' ? 'block' : 'none';
    document.getElementById('layout-input-cards').style.display = layout === 'cards' ? 'block' : 'none';
    document.getElementById('layout-input-split').style.display = layout === 'split' ? 'block' : 'none';
    document.getElementById('layout-input-quote').style.display = layout === 'quote' ? 'block' : 'none';
    // Show/hide new layout editors
    const treeInputGroup = document.getElementById('layout-input-tree');
    if (treeInputGroup) treeInputGroup.style.display = layout === 'tree' ? 'block' : 'none';
    const tableInputGroup = document.getElementById('layout-input-table');
    if (tableInputGroup) tableInputGroup.style.display = layout === 'table' ? 'block' : 'none';
    const alertInputGroup = document.getElementById('layout-input-alert');
    if (alertInputGroup) alertInputGroup.style.display = layout === 'alert' ? 'block' : 'none';
    // Show/hide boxes, search, transition editors
    const boxesInputGroup = document.getElementById('layout-input-boxes');
    if (boxesInputGroup) boxesInputGroup.style.display = layout === 'boxes' ? 'block' : 'none';
    const searchInputGroup = document.getElementById('layout-input-search');
    if (searchInputGroup) searchInputGroup.style.display = layout === 'search' ? 'block' : 'none';
    const transitionInputGroup = document.getElementById('layout-input-transition');
    if (transitionInputGroup) transitionInputGroup.style.display = layout === 'transition' ? 'block' : 'none';
    const hookInputGroup = document.getElementById('layout-input-hook');
    if (hookInputGroup) hookInputGroup.style.display = layout === 'hook' ? 'block' : 'none';
    const spotifyInputGroup = document.getElementById('layout-input-spotify');
    if (spotifyInputGroup) spotifyInputGroup.style.display = layout === 'spotify' ? 'block' : 'none';
    if (layout === 'diagram') {
        renderDiagramEditor();
    } else if (layout === 'cards') {
        renderCardsEditor();
    }
}
// Render dynamic steps list for Diagram Editor
function renderDiagramEditor() {
    const container = document.getElementById('diagram-nodes-list');
    container.innerHTML = '';
    const slide = slides[currentSlideIndex];
    if (!slide.diagram) slide.diagram = [];
    slide.diagram.forEach((node, idx) => {
        const row = document.createElement('div');
        row.className = 'node-edit-row';
        const labelInput = document.createElement('input');
        labelInput.className = 'form-control';
        labelInput.value = node.label;
        labelInput.placeholder = 'TÃªn bÆ°á»›c...';
        labelInput.addEventListener('input', (e) => {
            node.label = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        const typeSelect = document.createElement('select');
        typeSelect.className = 'form-control';
        typeSelect.innerHTML = `
            <option value="start">Báº¯t Ä‘áº§u</option>
            <option value="process">Thá»±c hiá»‡n</option>
            <option value="success">ThÃ nh cÃ´ng</option>
            <option value="warning">Lá»—i/Bottleneck</option>
        `;
        typeSelect.value = node.type;
        typeSelect.addEventListener('change', (e) => {
            node.type = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        const noteInput = document.createElement('input');
        noteInput.className = 'form-control';
        noteInput.value = node.note || '';
        noteInput.placeholder = 'ChÃº giáº£i (0.5ms, O(N)...)';
        noteInput.addEventListener('input', (e) => {
            node.note = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        const del = document.createElement('button');
        del.className = 'node-delete-btn btn btn-danger btn-sm';
        del.innerHTML = '<i data-lucide="trash-2" style="width:22px; height:22px;"></i>';
        del.addEventListener('click', () => {
            slide.diagram.splice(idx, 1);
            renderDiagramEditor();
            renderActiveSlide();
            saveSlidesToServer();
        });
        row.appendChild(labelInput);
        row.appendChild(typeSelect);
        row.appendChild(noteInput);
        row.appendChild(del);
        container.appendChild(row);
    });
    lucide.createIcons();
}
// Render dynamic forms for Cards Editor
function renderCardsEditor() {
    const container = document.getElementById('cards-editor-container');
    container.innerHTML = '';
    const slide = slides[currentSlideIndex];
    if (!slide.cards) slide.cards = [];
    // Ensure we have at least 1 and at most 3 cards
    if (slide.cards.length === 0) {
        slide.cards.push({ icon: "database", title: "Trá»¥ cá»™t 1", desc: "MÃ´ táº£ trá»¥ cá»™t 1" });
    }
    if (slide.cards.length < 3) {
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-secondary btn-sm mb-2';
        addBtn.innerHTML = '<i data-lucide="plus"></i> ThÃªm Card';
        addBtn.onclick = () => {
            slide.cards.push({ icon: "zap", title: `Trá»¥ cá»™t ${slide.cards.length + 1}`, desc: "MÃ´ táº£ má»›i" });
            renderCardsEditor();
            renderActiveSlide();
            saveSlidesToServer();
        };
        container.appendChild(addBtn);
    }
    slide.cards.forEach((card, idx) => {
        const block = document.createElement('div');
        block.className = 'card-edit-block';
        const row1 = document.createElement('div');
        row1.className = 'node-edit-row mb-1';
        const title = document.createElement('input');
        title.className = 'form-control';
        title.value = card.title;
        title.placeholder = 'TiÃªu Ä‘á» card...';
        title.addEventListener('input', (e) => {
            card.title = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        const iconSelect = document.createElement('select');
        iconSelect.className = 'form-control';
        iconSelect.style.width = '120px';
        Object.keys(iconMap).forEach(k => {
            const opt = document.createElement('option');
            opt.value = k;
            opt.textContent = k;
            iconSelect.appendChild(opt);
        });
        iconSelect.value = card.icon;
        iconSelect.addEventListener('change', (e) => {
            card.icon = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        const del = document.createElement('button');
        del.className = 'node-delete-btn btn btn-danger btn-sm';
        del.innerHTML = '<i data-lucide="trash-2" style="width:22px; height:22px;"></i>';
        del.addEventListener('click', () => {
            slide.cards.splice(idx, 1);
            renderCardsEditor();
            renderActiveSlide();
            saveSlidesToServer();
        });
        const cardTypeSelect = document.createElement('select');
        cardTypeSelect.className = 'form-control mt-1';
        cardTypeSelect.innerHTML = `
            <option value="neutral">BÃ¬nh thÆ°á»ng (VÃ ng Gold)</option>
            <option value="pro">Æ¯u Ä‘iá»ƒm / Tá»‘t (Xanh lÃ¡)</option>
            <option value="con">Háº¡n cháº¿ / Xáº¥u (Äá» Cam)</option>
        `;
        cardTypeSelect.value = card.type || 'neutral';
        cardTypeSelect.addEventListener('change', (e) => {
            card.type = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        row1.appendChild(title);
        row1.appendChild(iconSelect);
        if (slide.cards.length > 1) {
            row1.appendChild(del);
        }
        const typeRow = document.createElement('div');
        typeRow.className = 'node-edit-row mt-1';
        typeRow.appendChild(cardTypeSelect);
        const row2 = document.createElement('input');
        row2.className = 'form-control mt-1';
        row2.value = card.desc;
        row2.placeholder = 'MÃ´ táº£ chi tiáº¿t...';
        row2.addEventListener('input', (e) => {
            card.desc = e.target.value;
            renderActiveSlide();
            debounceSave();
        });
        block.appendChild(row1);
        block.appendChild(typeRow);
        block.appendChild(row2);
        container.appendChild(block);
    });
    lucide.createIcons();
}
// Format SQL/JS/Python/ORM keywords highlighting (universal syntax highlighter)
function highlightSQL(code, codePhraseHighlights = []) {
    if (!code) return '';
    // escape html
    let escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    // Match and wrap phrase highlights first using unique non-word markers to keep word boundaries intact
    if (codePhraseHighlights && codePhraseHighlights.length > 0) {
        codePhraseHighlights.forEach((h, idx) => {
            const phrase = h.phrase;
            if (!phrase) return;
            // Escape HTML characters of the phrase since the source code is already escaped
            const escapedPhrase = phrase
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            const safePhrase = escapedPhrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(safePhrase, 'g');
            escaped = escaped.replace(regex, `Â«START_PHRASE_${idx}Â»$&Â«END_PHRASEÂ»`);
        });
    }
    // JS/TS/Python/SQL keywords
    const keywords = [
        // SQL keywords
        'SELECT', 'FROM', 'WHERE', 'CREATE', 'INDEX', 'ON', 'UPDATE', 'DELETE', 'INSERT', 'INTO', 'VALUES', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER',
        // JS/Python/ORM keywords
        'const', 'await', 'async', 'let', 'var', 'function', 'def', 'class', 'return', 'import', 'from', 'true', 'false', 'null', 'include', 'prisma'
    ];
    // We use temporary replacement tokens for strings and comments to prevent overlapping highlights
    const items = [];
    let tokenIndex = 0;
    // Extract comments: double slash //, hash #, or double dash --
    escaped = escaped.replace(/(\/\/.*|#.*|--.*)/g, (match) => {
        const token = `___TOKEN_COMMENT_${tokenIndex}___`;
        items.push({ token, html: `<span class="code-comment">${match}</span>` });
        tokenIndex++;
        return token;
    });
    // Extract double quoted strings, single quoted strings, and backticks
    escaped = escaped.replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g, (match) => {
        const token = `___TOKEN_STRING_${tokenIndex}___`;
        items.push({ token, html: `<span class="code-string">${match}</span>` });
        tokenIndex++;
        return token;
    });
    // Highlight SQL/JS/Python keywords in a single pass to prevent nested matches (e.g. matching 'class' inside '<span class="code-keyword">')
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(keywordRegex, '<span class="code-keyword">$1</span>');
    // Highlight numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    // Highlight ORM methods / database functions (words followed by parenthesis)
    escaped = escaped.replace(/\b(\w+)(?=\()/g, '<span class="code-func">$1</span>');
    // Put strings and comments back
    items.forEach(item => {
        escaped = escaped.replace(item.token, item.html);
    });
    // Replace delimiters back to final html spans
    if (codePhraseHighlights && codePhraseHighlights.length > 0) {
        escaped = escaped.replace(/Â«START_PHRASE_(\d+)Â»/g, (match, idx) => {
            const h = codePhraseHighlights[idx];
            const className = h.class || 'code-highlight-bad';
            return `<span class="code-phrase-highlight" data-start="${h.start}" data-end="${h.end}" data-class="${className}">`;
        });
        escaped = escaped.replace(/Â«END_PHRASEÂ»/g, '</span>');
    }
    return escaped;
}
function getCodeLayoutFilename(slide) {
    const code = (slide.code || '').toLowerCase();
    if (code.includes('select ') || code.includes('from ') || code.includes('join ')) {
        return 'optimize_query.sql';
    }
    if (code.includes('prisma') || code.includes('const ') || code.includes('await ') || code.includes('import ')) {
        return 'app.js';
    }
    if (code.includes('def ') || (code.includes('import ') && code.includes('.py'))) {
        return 'main.py';
    }
    return 'code.txt';
}
function formatSubtitleHTML(subtitle) {
    if (!subtitle) return '';
    // Escape HTML first to prevent injection
    let escaped = subtitle
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    // Look for A VS B or A -> B pattern
    const vsMatch = escaped.match(/^(.*?)\s+(VS||-&gt;)\s+(.*?)$/i);
    if (vsMatch) {
        let left = vsMatch[1].trim();
        const separator = vsMatch[2].trim();
        let right = vsMatch[3].trim();
        // Highlight numbers inside left (bad metrics since it's "before")
        left = left.replace(/(\b\d+(?:\.\d+)?%?|\b\d+\s*(?:ms|s|x|láº§n)\b)/gi, '<span class="sub-num-bad">$1</span>');
        // Highlight numbers inside right (good metrics since it's "after")
        right = right.replace(/(\b\d+(?:\.\d+)?%?|\b\d+\s*(?:ms|s|x|láº§n)\b)/gi, '<span class="sub-num-good">$1</span>');
        let sepHTML = `<span class="sub-vs-separator">${separator}</span>`;
        if (separator.toLowerCase() === 'vs') {
            sepHTML = `<span class="sub-vs-separator vs-badge">VS</span>`;
        } else if (separator === '-&gt;' || separator === '') {
            sepHTML = `<span class="sub-vs-separator arrow-badge"></span>`;
        }
        return `<span class="sub-vs-left">${left}</span> ${sepHTML} <span class="sub-vs-right">${right}</span>`;
    }
    // Highlight numbers/percentages in general subtitle
    escaped = escaped.replace(/(\b\d+(?:\.\d+)?%?|\b\d+\s*(?:ms|s|x|láº§n)\b)/gi, (match) => {
        return `<span class="subtitle-highlight">${match}</span>`;
    });
    return escaped;
}
function segmentScriptIntoPhrases(script) {
    if (!script) return [];
    // Split by major punctuation boundaries but retain delimiters attached to previous items
    const rawSegments = script.split(/([,;?!\n]+|\.(?!\d))/);
    const segments = [];
    let currentPhrase = '';
    for (let i = 0; i < rawSegments.length; i++) {
        const item = rawSegments[i];
        if (!item) continue;
        if (/^[.,;?!\n\s]+$/.test(item)) {
            currentPhrase += item;
        } else {
            if (currentPhrase.trim().length > 0) {
                segments.push(currentPhrase.trim());
            }
            currentPhrase = item;
        }
    }
    if (currentPhrase.trim().length > 0) {
        segments.push(currentPhrase.trim());
    }
    const finalPhrases = [];
    for (let i = 0; i < segments.length; i++) {
        const phrase = segments[i];
        const words = phrase.split(/\s+/).filter(w => w.length > 0);
        if (words.length > 10) {
            // Split long sentences at space boundaries (max 8 words)
            const maxWords = 8;
            for (let j = 0; j < words.length; j += maxWords) {
                const subWords = words.slice(j, j + maxWords);
                finalPhrases.push(subWords.join(' '));
            }
        } else if (words.length > 0) {
            finalPhrases.push(phrase);
        }
    }
    // Merge tiny phrases (<= 3 words) with adjacent ones if total is <= 9 words
    const mergedPhrases = [];
    for (let i = 0; i < finalPhrases.length; i++) {
        const phrase = finalPhrases[i];
        if (mergedPhrases.length === 0) {
            mergedPhrases.push(phrase);
        } else {
            const lastIdx = mergedPhrases.length - 1;
            const lastPhrase = mergedPhrases[lastIdx];
            const lastWordCount = lastPhrase.split(/\s+/).length;
            const currentWordCount = phrase.split(/\s+/).length;
            if (currentWordCount <= 3 && (lastWordCount + currentWordCount <= 9)) {
                mergedPhrases[lastIdx] = lastPhrase + ' ' + phrase;
            } else {
                mergedPhrases.push(phrase);
            }
        }
    }
    return mergedPhrases;
}
function getActiveSubtitleChunk(script, animTime, duration) {
    if (!script) return '';
    const phrases = segmentScriptIntoPhrases(script);
    if (phrases.length === 0) return '';
    if (phrases.length === 1) return phrases[0];
    if (animTime < 0) return phrases[0];

    // Calculate estimated duration for each phrase including punctuation pauses
    const phraseEstimates = phrases.map(phrase => {
        const words = phrase.split(/\s+/).filter(w => w.length > 0).length;
        let pause = 0;
        // Check for sentence ending punctuation
        if (/[.!?\n]/.test(phrase)) {
            pause += 0.7;
        } else if (/[,;:]/.test(phrase)) {
            pause += 0.35;
        }
        return {
            phrase,
            estDuration: words * 0.28 + pause
        };
    });

    const totalEstDuration = phraseEstimates.reduce((sum, item) => sum + item.estDuration, 0);
    if (totalEstDuration <= 0) return phrases[0];

    let currentStart = 0;
    for (let i = 0; i < phraseEstimates.length; i++) {
        const item = phraseEstimates[i];
        const phraseDuration = (item.estDuration / totalEstDuration) * duration;
        const start = currentStart;
        const end = currentStart + phraseDuration;
        currentStart = end;

        if (animTime >= start && animTime < end) {
            return item.phrase;
        }
    }
    return phrases[phrases.length - 1] || '';
}
function formatLeftSplitItemHTML(itemLeft) {
    if (!itemLeft) return '';
    const numLeftMatch = itemLeft.match(/(\d+(?:\.\d+)?)/);
    if (numLeftMatch) {
        return itemLeft.replace(numLeftMatch[1], `<span class="drop-num-bad">${numLeftMatch[1]}</span>`);
    }
    return itemLeft;
}
function formatSplitItemHTML(itemLeft, itemRight, isRightColumn, animTime, startTime, duration) {
    if (!itemLeft || !itemRight) return itemRight;
    // Find the first number in both left and right items
    const numLeftMatch = itemLeft.match(/(\d+(?:\.\d+)?)/);
    const numRightMatch = itemRight.match(/(\d+(?:\.\d+)?)/);
    if (numLeftMatch && numRightMatch) {
        const numLeft = parseFloat(numLeftMatch[1]);
        const numRight = parseFloat(numRightMatch[1]);
        if (numLeft > numRight) {
            const dropPct = Math.round(((numLeft - numRight) / numLeft) * 100);
            // Format right column with animated number and decrease badge
            if (isRightColumn) {
                let currentVal = numRight;
                let showBadge = false;
                let badgeClass = '';
                if (animTime > startTime && duration > 0) {
                    const elapsed = animTime - startTime;
                    const animDuration = Math.min(1.0, duration);
                    const progress = Math.min(1, elapsed / animDuration);
                    const ease = progress * (2 - progress); // easeOutQuad
                    currentVal = numLeft - (numLeft - numRight) * ease;
                    if (progress >= 0.9) {
                        showBadge = true;
                        badgeClass = 'show-badge';
                    }
                } else if (!isPlaying) {
                    currentVal = numRight;
                    showBadge = true;
                    badgeClass = 'show-badge';
                } else {
                    currentVal = numLeft;
                }
                const formattedNum = numRight % 1 !== 0 ? currentVal.toFixed(1) : Math.floor(currentVal);
                // Replace the first number with the animated wrapper
                const replacedText = itemRight.replace(numRightMatch[1], `<span class="drop-num-highlight">${formattedNum}</span>`);
                const badgeHTML = `<span class="reduction-badge ${badgeClass}"><i data-lucide="trending-down"></i> ${dropPct}%</span>`;
                return `<span>${replacedText}</span> ${badgeHTML}`;
            }
        }
    }
    return `<span>${itemRight}</span>`;
}
function renderCustomSimulationSlide(slide, animTime, forceRebuild) {
    const root = document.getElementById('slide-content-root');
    const slideId = slide.id;
    // Check if we need to recreate the structure
    const hasSim = root.querySelector(`.layout-custom-sim-view[data-slide-id="${slideId}"]`);
    if (forceRebuild || !hasSim) {
        root.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'layout-custom-sim-view';
        const slideIndex = slides.findIndex(s => s.id === slideId);
        if (slideIndex === 0) {
            wrapper.classList.add('first-slide');
        }
        wrapper.setAttribute('data-slide-id', slideId);
        // Header
        const header = document.createElement('div');
        if (slideId === 'slide_pag_1a') {
            header.className = 'sim-scene-header layout-title-view';
            const iconName = slide.icon || getSlideIcon(slide) || 'help-circle';
            header.innerHTML = `
                <div class="title-slide-icon-wrapper">
                    <i data-lucide="${iconName}"></i>
                </div>
                <h1>${formatTitleHTML(slide.title || '')}</h1>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
                <div class="title-decorative-line"></div>
            `;
        } else {
            header.className = 'sim-scene-header';
            header.innerHTML = `
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
        }
        wrapper.appendChild(header);
        // Canvas body
        const canvas = document.createElement('div');
        canvas.className = 'sim-canvas-body';
        wrapper.appendChild(canvas);
        root.appendChild(wrapper);
        lucide.createIcons({ node: wrapper });
    }
    const canvas = root.querySelector('.sim-canvas-body');
    if (!canvas) return;
    const needsTemplate = canvas.getAttribute('data-sim-template') !== slideId || canvas.innerHTML === '';
    // Diagnostic logging removed for performance
    if (needsTemplate) {
        canvas.setAttribute('data-sim-template', slideId);
    }
    // Render contents for each scene
    // â”€â”€ Plugin: delegate rendering to loaded VideoPlugin â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (window.VideoPlugin && window.VideoPlugin.customSlideIds && window.VideoPlugin.customSlideIds.includes(slideId)) {
        const progress = isPlaying ? (animTime / getSlideDuration(slide)) : 1.0;
        window.VideoPlugin.renderGfx(slideId, canvas, isPlaying, getSlideDuration, slide);
        window.VideoPlugin.updateFrame(slideId, canvas, progress);
        
        if (window.VideoPlugin.keywordsData && window.VideoPlugin.keywordsData[slideId]) {
            const list = window.VideoPlugin.keywordsData[slideId];
            const slideIndex = slides.findIndex(s => s.id === slideId);
            const isFirstSlide = (slideIndex === 0);
            
            // Build keywords-panel (skip on slide_spotify_1 per user request, and skip on first slide of script)
            if (slideId !== 'slide_spotify_1' && !isFirstSlide) {
                let keywordsPanel = canvas.querySelector('.keywords-panel');
                if (!keywordsPanel) {
                    keywordsPanel = document.createElement('div');
                    keywordsPanel.className = 'keywords-panel';
                    canvas.appendChild(keywordsPanel);
                }
                if (keywordsPanel.children.length === 0) {
                    keywordsPanel.innerHTML = list.map((kw, i) => `
                        <span class="ai-keyword-tag kw-${i}">${kw.text}</span>
                    `).join('');
                }
                
                // Update panel tags
                list.forEach((kw, i) => {
                    const tag = keywordsPanel.querySelector(`.kw-${i}`);
                    if (tag) {
                        const isActive = animTime >= kw.start && animTime <= kw.end;
                        tag.className = `ai-keyword-tag kw-${i}`;
                        if (isActive) tag.classList.add(kw.class);
                    }
                });
            } else {
                // If it is the first slide or slide_spotify_1, ensure any existing keywords-panel is removed
                const keywordsPanel = canvas.querySelector('.keywords-panel');
                if (keywordsPanel) {
                    keywordsPanel.remove();
                }
            }

            let titleHTML = formatTitleHTML(slide.title || '');
            let subtitleHTML = formatSubtitleHTML(slide.subtitle || '');
            if (!isFirstSlide) {
                list.forEach(kw => {
                    const isActive = animTime >= kw.start && animTime <= kw.end;
                    const escText = kw.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    const re = new RegExp('(' + escText + ')', 'gi');
                    const spanClass = isActive ? kw.class : 'keyword-idle';
                    titleHTML = titleHTML.replace(re, '<span class="' + spanClass + '">$1</span>');
                    subtitleHTML = subtitleHTML.replace(re, '<span class="' + spanClass + '">$1</span>');
                });
            }
            const headerEl = root.querySelector('.sim-scene-header');
            if (headerEl && slideId !== 'slide_pag_1a') {
                const newHTML = `
                    <h2>${titleHTML}</h2>
                    <p>${subtitleHTML}</p>
                `;
                if (headerEl.dataset.lastHTML !== newHTML) {
                    headerEl.dataset.lastHTML = newHTML;
                    headerEl.innerHTML = newHTML;
                }
            }
        }
        
        statusText = 'Playing';
        codeOutput = '';
    }
    // Sync simulation voice script to the bottom subtitle box    // Sync simulation voice script to the bottom subtitle box
    const subtitleBox = document.getElementById('canvas-subtitle-box');
    if (subtitleBox) {
        if (slide.script) {
            const duration = getSlideDuration(slide);
            // Introduce a 0.3s lead time so subtitles appear slightly ahead of narration
            const activeChunk = getActiveSubtitleChunk(slide.script, animTime + 0.3, duration);
            let scriptHTML = formatSubtitleHTML(activeChunk);
            // Highlight keywords in bottom subtitle script directly from plugin data
            if (window.VideoPlugin && window.VideoPlugin.keywordsData && window.VideoPlugin.keywordsData[slide.id]) {
                const slideIndex = slides.findIndex(s => s.id === slide.id);
                const isFirstSlide = (slideIndex === 0);
                if (!isFirstSlide) {
                    window.VideoPlugin.keywordsData[slide.id].forEach(kw => {
                        const isActive = animTime >= kw.start && animTime <= kw.end;
                        if (kw.text) {
                            const escText = kw.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            const re = new RegExp('(' + escText + ')', 'gi');
                            const spanClass = isActive ? kw.class : 'keyword-idle';
                            scriptHTML = scriptHTML.replace(re, '<span class="' + spanClass + '">$1</span>');
                        }
                    });
                }
            }
            if (subtitleBox.dataset.lastScript !== scriptHTML) {
                subtitleBox.dataset.lastScript = scriptHTML;
                subtitleBox.innerHTML = '<span style="display:block; text-align:center; width:100%; animation: subtitle-smooth-appear 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;">' + scriptHTML + '</span>';
            }
            subtitleBox.style.display = 'flex';
        } else {
            subtitleBox.style.display = 'none';
            subtitleBox.innerHTML = '';
        }
    }
}
function renderCanvasPreview(slide, animTime = 0, forceRebuild = true) {
    // Check if the loaded VideoPlugin handles this slide
    const isCustomSim = slide.id && window.VideoPlugin &&
        window.VideoPlugin.customSlideIds &&
        window.VideoPlugin.customSlideIds.includes(slide.id);
    if (isCustomSim) {
        renderCustomSimulationSlide(slide, animTime, forceRebuild);
        return;
    }
    // Hide simulation subtitle box for standard slides
    const subtitleBox = document.getElementById('canvas-subtitle-box');
    if (subtitleBox) {
        subtitleBox.style.display = 'none';
        subtitleBox.innerHTML = '';
    }
    const root = document.getElementById('slide-content-root');
    // Determine if we need to rebuild the DOM structure
    const layoutClass = `layout-${slide.layout}-view`;
    const hasLayout = root.querySelector(`.${layoutClass}`);
    if (forceRebuild || !hasLayout) {
        root.innerHTML = '';
        if (slide.layout === 'title') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-title-view';
            const slideIndex = slides.findIndex(s => s.id === slide.id);
            const isLastSlide = (slideIndex === slides.length - 1 && slides.length > 0);
            const iconWrap = document.createElement('div');
            if (isLastSlide) {
                const isFollowed = (animTime > 2.0);
                iconWrap.className = 'title-slide-icon-wrapper last-slide-logo-wrapper';
                iconWrap.innerHTML = `
                    <img src="${API_BASE}/logo.png" crossorigin="anonymous" class="follow-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" alt="logo">
                    <div class="follow-avatar-placeholder" style="display:none; width:100%; height:100%; border-radius:50%; align-items:center; justify-content:center; background:#F59E0B; color:#000; font-weight:bold; font-size:48px;">T</div>
                    <div class="follow-plus-btn">
                        <i data-lucide="${isFollowed ? 'check' : 'plus'}"></i>
                    </div>
                    <div class="follow-ripple-ring"></div>
                `;
            } else {
                const iconName = getSlideIcon(slide);
                iconWrap.className = 'title-slide-icon-wrapper';
                if (slide.id === 'slide_token_1a2') {
                    iconWrap.style.display = 'none';
                } else if (slide.id === 'slide_ticket_1a_1') {
                    iconWrap.innerHTML = `<span style="font-size:150px; line-height:1; display:flex; align-items:center; justify-content:center; width:100%; height:100%;">ðŸŽ«</span>`;
                    iconWrap.style.background = 'none';
                    iconWrap.style.border = 'none';
                    iconWrap.style.boxShadow = 'none';
                    iconWrap.style.backdropFilter = 'none';
                } else {
                    iconWrap.innerHTML = `<i data-lucide="${iconName}"></i>`;
                }
            }
            const h1 = document.createElement('h1');
            if (slide.id === 'slide_token_1a') {
                h1.innerHTML = `Access Token<br><span class="vs-circle">vs</span><br>Refresh Token`;
            } else {
                h1.innerHTML = formatTitleHTML(slide.title || '');
            }
            const p = document.createElement('p');
            p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
            const line = document.createElement('div');
            line.className = 'title-decorative-line';
            wrapper.appendChild(iconWrap);
            wrapper.appendChild(h1);
            // Check if this slide needs a sample UUID display (e.g. slide_uuid_1a)
            if (slide.id === 'slide_uuid_1a') {
                const uuidSample = document.createElement('div');
                uuidSample.className = 'title-uuid-sample';
                uuidSample.innerHTML = `
                    <div style="font-family:'Fira Code', monospace; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); padding:10px 20px; border-radius:8px; font-size:24px; color:var(--gold-primary); margin:15px auto 5px auto; font-weight:bold; letter-spacing:0.5px; display:inline-block; box-shadow:0 4px 15px rgba(0,0,0,0.4); border-color: rgba(245, 158, 11, 0.25);">
                        f81d4fae-7dec-11d0-a765-00a0c91e6bf6
                    </div>
                `;
                wrapper.appendChild(uuidSample);
            } else if (slide.id === 'slide_select_1a') {
                const codeSample = document.createElement('div');
                codeSample.className = 'title-code-sample';
                codeSample.innerHTML = `
                    <div style="font-family:'Fira Code', monospace; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); padding:12px 24px; border-radius:8px; font-size:28px; color:#f87171; margin:15px auto 5px auto; font-weight:bold; letter-spacing:0.5px; display:inline-block; box-shadow:0 4px 15px rgba(0,0,0,0.4); border-color: rgba(239, 68, 68, 0.25);">
                        SELECT * FROM users;
                    </div>
                `;
                wrapper.appendChild(codeSample);
            } else if (slide.id === 'slide_token_1a') {
                const tokenSample = document.createElement('div');
                tokenSample.className = 'title-token-sample';
                tokenSample.innerHTML = `
                    <div style="font-family:'Fira Code', monospace; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); padding:12px 20px; border-radius:8px; font-size:26px; color:#60a5fa; margin:15px auto 5px auto; font-weight:bold; letter-spacing:0.5px; display:inline-block; box-shadow:0 4px 15px rgba(0,0,0,0.4); border-color: rgba(96, 165, 250, 0.25); max-width: 900px; word-break: break-all;">
                        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </div>
                `;
                wrapper.appendChild(tokenSample);
            } else if (slide.id === 'slide_token_1a2') {
                const buildingSample = document.createElement('div');
                buildingSample.className = 'title-building-sample';
                buildingSample.innerHTML = `
                    <div style="background:rgba(255,255,255,0.02); border:1.5px solid rgba(255,255,255,0.08); padding:24px; border-radius:16px; margin:15px auto 5px auto; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 4px 15px rgba(0,0,0,0.4); border-color: rgba(250, 204, 21, 0.25); width: 130px; height: 130px;">
                        <i data-lucide="building" style="width:80px; height:80px; color:var(--gold-primary);"></i>
                    </div>
                `;
                wrapper.appendChild(buildingSample);
            }
            wrapper.appendChild(p);
            wrapper.appendChild(line);
            root.appendChild(wrapper);
        } else if (slide.layout === 'code') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-code-view';
            const status = getPerformanceStatus(slide);
            if (status.class === 'danger') {
                wrapper.classList.add('status-danger');
            }
            // IDE frame
            const editor = document.createElement('div');
            editor.className = 'editor-window-container';
            const topBar = document.createElement('div');
            topBar.className = 'editor-top-bar';
            topBar.innerHTML = `
                <div class="mac-controls">
                    <div class="mac-dot close"></div>
                    <div class="mac-dot minimize"></div>
                    <div class="mac-dot maximize"></div>
                </div>
                <div class="editor-filename">${getCodeLayoutFilename(slide)}</div>
            `;
            const body = document.createElement('div');
            body.className = 'editor-code-body';
            const linesNum = document.createElement('div');
            linesNum.className = 'editor-line-numbers';
            const codeContent = document.createElement('pre');
            codeContent.className = 'editor-code-content';
            const lines = (slide.code || '').split('\n');
            linesNum.innerHTML = Array.from({ length: lines.length || 1 }, (_, i) => i + 1).join('<br>');
            codeContent.innerHTML = '';
            lines.forEach((lineText, idx) => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.id = `code-line-${idx}`;
                lineDiv.innerHTML = highlightSQL(lineText, slide.codePhraseHighlights) || '&nbsp;';
                codeContent.appendChild(lineDiv);
            });
            body.appendChild(linesNum);
            body.appendChild(codeContent);
            editor.appendChild(topBar);
            editor.appendChild(body);
            // Sidebar detail text
            const info = document.createElement('div');
            info.className = 'code-info-container';
            const emoji = getSlideHeaderEmoji(slide);
            const iconHTML = `<div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>`;
            info.innerHTML = `
                ${iconHTML}
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
            const tip = document.createElement('div');
            tip.className = `tip-pill ${status.class}`;
            tip.innerHTML = `<i data-lucide="${status.icon}"></i> ${status.text}`;
            info.appendChild(tip);
            wrapper.appendChild(info);
            wrapper.appendChild(editor);
            root.appendChild(wrapper);
        } else if (slide.layout === 'diagram') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-diagram-view';
            const header = document.createElement('div');
            header.className = 'diagram-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title)}</h2>
                <p>${formatSubtitleHTML(slide.subtitle)}</p>
            `;
            const flow = document.createElement('div');
            flow.className = 'diagram-nodes-flow';
            const steps = slide.diagram || [];
            steps.forEach((step, idx) => {
                // Draw Arrow (except first)
                if (idx > 0) {
                    const arrow = document.createElement('div');
                    arrow.className = 'diagram-arrow';
                    arrow.innerHTML = '<i data-lucide="arrow-down"></i><div class="diagram-data-packet"></div>';
                    flow.appendChild(arrow);
                }
                const box = document.createElement('div');
                box.className = `diagram-node-box ${step.type}`;
                const iconWrap = document.createElement('div');
                iconWrap.className = 'node-icon-wrapper';
                let nodeIconName = 'cpu';
                if (step.label.toLowerCase().includes('client') || step.label.toLowerCase().includes('user')) nodeIconName = 'terminal';
                else if (step.label.toLowerCase().includes('cache') || step.label.toLowerCase().includes('redis')) nodeIconName = 'zap';
                else if (step.label.toLowerCase().includes('db') || step.label.toLowerCase().includes('sql') || step.label.toLowerCase().includes('data')) nodeIconName = 'database';
                else if (step.type === 'success') nodeIconName = 'activity';
                else if (step.type === 'warning') nodeIconName = 'shield';
                iconWrap.innerHTML = `<i data-lucide="${nodeIconName}"></i>`;
                const label = document.createElement('div');
                label.className = 'node-label';
                label.textContent = step.label;
                box.appendChild(iconWrap);
                box.appendChild(label);
                if (step.note) {
                    const note = document.createElement('div');
                    note.className = 'node-note';
                    note.textContent = step.note;
                    box.appendChild(note);
                }
                flow.appendChild(box);
            });
            wrapper.appendChild(header);
            wrapper.appendChild(flow);
            root.appendChild(wrapper);
        } else if (slide.layout === 'cards') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-cards-view';
            const header = document.createElement('div');
            header.className = 'cards-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title)}</h2>
                <p>${formatSubtitleHTML(slide.subtitle)}</p>
            `;
            const grid = document.createElement('div');
            grid.className = 'cards-grid';
            const cards = slide.cards || [];
            cards.forEach((card, idx) => {
                const box = document.createElement('div');
                const cardType = getCardType(card);
                box.className = `studio-card-box card-${cardType}`;
                // Card badge (top right)
                if (card.badge) {
                    const badge = document.createElement('div');
                    badge.className = `card-badge badge-${cardType}`;
                    badge.textContent = card.badge;
                    box.appendChild(badge);
                }
                // Card header row (icon + title)
                const headerRow = document.createElement('div');
                headerRow.className = 'studio-card-header-row';
                const icon = document.createElement('div');
                icon.className = `studio-card-icon icon-${cardType}`;
                icon.innerHTML = `<i data-lucide="${iconMap[card.icon] || card.icon || 'zap'}"></i>`;
                const title = document.createElement('h4');
                title.className = `studio-card-title title-${cardType}`;
                title.textContent = card.title;
                headerRow.appendChild(icon);
                headerRow.appendChild(title);
                const desc = document.createElement('p');
                desc.className = 'studio-card-desc';
                desc.textContent = card.desc;
                box.appendChild(headerRow);
                box.appendChild(desc);
                grid.appendChild(box);
            });
            wrapper.appendChild(header);
            wrapper.appendChild(grid);
            root.appendChild(wrapper);
        } else if (slide.layout === 'split') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-split-view';
            const header = document.createElement('div');
            header.className = 'split-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title)}</h2>
                <p>${formatSubtitleHTML(slide.subtitle)}</p>
            `;
            const container = document.createElement('div');
            container.className = `split-container ${slide.splitInvert ? 'split-inverted' : ''}`;
            const leftCol = document.createElement('div');
            leftCol.className = 'split-column left-column';
            const leftTitle = document.createElement('h3');
            leftTitle.className = 'split-col-title';
            leftTitle.textContent = slide.splitLeftTitle || 'Háº¡n cháº¿ / Váº¥n Ä‘á»';
            const leftList = document.createElement('ul');
            leftList.className = 'split-col-list';
            const leftItems = (slide.splitLeftText || '').split('\n').filter(x => x.trim().length > 0);
            const leftIcon = slide.splitInvert ? 'check-circle' : 'x-circle';
            const leftColor = slide.splitInvert ? '#10B981' : '#EF4444';
            leftItems.forEach(item => {
                const li = document.createElement('li');
                let iconName = leftIcon;
                let iconColor = leftColor;
                let cleanItem = item.trim();
                const iconMatch = cleanItem.match(/^\[([a-zA-Z0-9\-]+)(?::([^\]]+))?\]\s*(.*)$/);
                if (iconMatch) {
                    iconName = iconMatch[1];
                    iconColor = iconMatch[2] || 'var(--gold-primary)';
                    cleanItem = iconMatch[3];
                }
                const formattedLeft = formatLeftSplitItemHTML(cleanItem);
                li.innerHTML = `<i data-lucide="${iconName}" style="color:${iconColor}; width:28px; height:28px; display:inline-block; vertical-align:middle; margin-right:8px;"></i><span>${formattedLeft}</span>`;
                leftList.appendChild(li);
            });
            leftCol.appendChild(leftTitle);
            leftCol.appendChild(leftList);
            const rightCol = document.createElement('div');
            rightCol.className = 'split-column right-column';
            const rightTitle = document.createElement('h3');
            rightTitle.className = 'split-col-title';
            rightTitle.textContent = slide.splitRightTitle || 'Tá»‘i Æ°u / Giáº£i phÃ¡p';
            const rightList = document.createElement('ul');
            rightList.className = 'split-col-list';
            const rightItems = (slide.splitRightText || '').split('\n').filter(x => x.trim().length > 0);
            const rightIcon = slide.splitInvert ? 'x-circle' : 'check-circle';
            const rightColor = slide.splitInvert ? '#EF4444' : '#10B981';
            rightItems.forEach((item, idx) => {
                const li = document.createElement('li');
                const leftItem = leftItems[idx] || '';
                let iconName = rightIcon;
                let iconColor = rightColor;
                let cleanItem = item.trim();
                const iconMatch = cleanItem.match(/^\[([a-zA-Z0-9\-]+)(?::([^\]]+))?\]\s*(.*)$/);
                if (iconMatch) {
                    iconName = iconMatch[1];
                    iconColor = iconMatch[2] || 'var(--success-green)';
                    cleanItem = iconMatch[3];
                }
                // Icon
                const icon = document.createElement('i');
                icon.setAttribute('data-lucide', iconName);
                icon.setAttribute('style', `color:${iconColor}; width:28px; height:28px; display:inline-block; vertical-align:middle; margin-right:8px;`);
                li.appendChild(icon);
                // Text Span
                const textSpan = document.createElement('span');
                textSpan.className = 'split-item-text';
                li.appendChild(textSpan);
                // Badge Container
                const badgeSpan = document.createElement('span');
                badgeSpan.className = 'split-item-badge-container';
                li.appendChild(badgeSpan);
                // Check if we can animate
                const cleanLeftItem = leftItem.replace(/^\[[a-zA-Z0-9\-]+(?::[^\]]+)?\]\s*/, '').trim();
                const numLeftMatch = cleanLeftItem.match(/(\d+(?:\.\d+)?)/);
                const numRightMatch = cleanItem.match(/(\d+(?:\.\d+)?)/);
                if (numLeftMatch && numRightMatch && parseFloat(numLeftMatch[1]) > parseFloat(numRightMatch[1])) {
                    li.setAttribute('data-animatable', 'true');
                    li.setAttribute('data-num-left', numLeftMatch[1]);
                    li.setAttribute('data-num-right', numRightMatch[1]);
                    li.setAttribute('data-text-template', cleanItem.replace(numRightMatch[1], '__NUM__'));
                    // Initial rendering content for animTime = 0 / isPlaying = false
                    const initialVal = isPlaying ? numLeftMatch[1] : numRightMatch[1];
                    const initialTextHTML = cleanItem.replace(numRightMatch[1], `<span class="drop-num-highlight">${initialVal}</span>`);
                    textSpan.innerHTML = initialTextHTML;
                    if (!isPlaying) {
                        const dropPct = Math.round(((parseFloat(numLeftMatch[1]) - parseFloat(numRightMatch[1])) / parseFloat(numLeftMatch[1])) * 100);
                        badgeSpan.innerHTML = `<span class="reduction-badge show-badge"><i data-lucide="trending-down"></i> ${dropPct}%</span>`;
                    }
                } else {
                    li.setAttribute('data-animatable', 'false');
                    textSpan.innerHTML = cleanItem;
                }
                rightList.appendChild(li);
            });
            rightCol.appendChild(rightTitle);
            rightCol.appendChild(rightList);
            container.appendChild(leftCol);
            const vsBadge = document.createElement('div');
            vsBadge.className = 'split-vs-badge';
            vsBadge.innerHTML = '<span>VS</span>';
            if (slide.splitHideVS) {
                vsBadge.style.display = 'none';
            }
            container.appendChild(vsBadge);
            container.appendChild(rightCol);
            wrapper.appendChild(header);
            wrapper.appendChild(container);
            root.appendChild(wrapper);
        } else if (slide.layout === 'metrics') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-metrics-view';
            const header = document.createElement('div');
            header.className = 'metrics-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
            wrapper.appendChild(header);
            // Render scanning table if defined
            if (slide.tableRows) {
                const tableContainer = document.createElement('div');
                tableContainer.className = 'table-container-box metrics-layout-table';
                tableContainer.style.marginTop = '10px';
                tableContainer.style.marginBottom = '20px';
                tableContainer.style.width = '90%';
                tableContainer.style.marginLeft = 'auto';
                tableContainer.style.marginRight = 'auto';
                const table = document.createElement('table');
                table.className = 'studio-data-table';
                table.style.fontSize = '18px';
                const headers = (slide.tableHeaders || 'ID | Cá»™t 1 | Cá»™t 2').split('|').map(x => x.trim());
                const rows = (slide.tableRows || '').split('\n').map(line => line.split('|').map(x => x.trim()));
                const thead = document.createElement('thead');
                const trHead = document.createElement('tr');
                headers.forEach(h => {
                    const th = document.createElement('th');
                    th.textContent = h;
                    th.style.padding = '14px 20px';
                    trHead.appendChild(th);
                });
                thead.appendChild(trHead);
                table.appendChild(thead);
                const tbody = document.createElement('tbody');
                rows.forEach((rowCells, idx) => {
                    if (rowCells.length === 0 || (rowCells.length === 1 && rowCells[0] === '')) return;
                    const tr = document.createElement('tr');
                    tr.className = 'table-row-item';
                    rowCells.forEach(cell => {
                        const td = document.createElement('td');
                        td.style.padding = '12px 20px';
                        const cellLower = cell.toLowerCase();
                        if (cellLower.includes('sai') || cellLower.includes('bá» qua')) {
                            td.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">${cell}</span>`;
                        } else if (cellLower.includes('Ä‘Ãºng') || cellLower.includes('tÃ¬m tháº¥y')) {
                            td.innerHTML = `<span style="color: var(--success-green); font-weight: bold;">${cell}</span>`;
                        } else {
                            td.textContent = cell;
                        }
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                tableContainer.appendChild(table);
                wrapper.appendChild(tableContainer);
            }
            const grid = document.createElement('div');
            grid.className = 'metrics-grid';
            const rawLines = (slide.metrics || '').split('\n').filter(l => l.trim().length > 0);
            rawLines.forEach((line, idx) => {
                const parts = line.split('|');
                const num = parts[0] ? parts[0].trim() : '';
                const lbl = parts[1] ? parts[1].trim() : '';
                const box = document.createElement('div');
                const itemColor = getMetricColor(num, lbl);
                let boxClass = 'metric-box';
                if (itemColor === 'danger') boxClass += ' level-danger';
                else if (itemColor === 'success') boxClass += ' level-success';
                box.className = boxClass;
                if (slide.tableRows) {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px) scale(0.95)';
                }
                let numClass = 'metric-number';
                if (itemColor === 'danger') numClass += ' alert-red';
                else if (itemColor === 'success') numClass += ' success-green';
                box.innerHTML = `
                    <div class="metric-number-wrapper">
                        <span class="${numClass}">${num}</span>
                        <div class="metric-progress-line-container">
                            <div class="metric-progress-line-fill" id="metric-fill-${idx}"></div>
                        </div>
                    </div>
                    <div class="metric-label">${lbl}</div>
                `;
                grid.appendChild(box);
            });
            wrapper.appendChild(grid);
            root.appendChild(wrapper);
        } else if (slide.layout === 'quote') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-quote-view';
            const quoteBox = document.createElement('div');
            quoteBox.className = 'quote-card-box';
            const quoteIcon = document.createElement('div');
            quoteIcon.className = 'quote-card-icon';
            quoteIcon.innerHTML = `<i data-lucide="quote"></i>`;
            const quoteText = document.createElement('p');
            quoteText.className = 'quote-card-text';
            quoteText.textContent = slide.quoteText || 'HÃ£y viáº¿t ghi chÃº quan trá»ng á»Ÿ Ä‘Ã¢y!';
            const quoteAuthor = document.createElement('div');
            quoteAuthor.className = 'quote-card-author';
            quoteAuthor.textContent = slide.quoteAuthor || 'â€” Lá»i khuyÃªn';
            quoteBox.appendChild(quoteIcon);
            quoteBox.appendChild(quoteText);
            quoteBox.appendChild(quoteAuthor);
            wrapper.appendChild(quoteBox);
            root.appendChild(wrapper);
        } else if (slide.layout === 'tree') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-tree-view';
            const header = document.createElement('div');
            header.className = 'tree-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
            const container = document.createElement('div');
            container.className = 'tree-container';
            const rootVal = slide.treeRoot || 'Gá»‘c cÃ¢y (M-R)';
            const leftVal = slide.treeLeft || 'NhÃ¡nh trÃ¡i (A-L)';
            const rightVal = slide.treeRight || 'NhÃ¡nh pháº£i (S-Z)';
            const targetVal = slide.treeTarget || 'NÃºt tÃ¬m tháº¥y';
            const highlight = slide.treeHighlight || 'left';
            // Draw connecting SVG lines
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;');
            let activeLevel = 0; // 0 = root, 1 = left/right, 2 = target
            const duration = getSlideDuration(slide);
            if (isPlaying && duration > 0) {
                const ratio = animTime / duration;
                if (ratio < 0.35) activeLevel = 0;
                else if (ratio < 0.7) activeLevel = 1;
                else activeLevel = 2;
            } else {
                activeLevel = 2; // Show full tree path when static
            }
            const rootNode = document.createElement('div');
            rootNode.className = `tree-node root-node ${activeLevel >= 0 ? 'highlighted' : 'dimmed'}`;
            rootNode.textContent = rootVal;
            const leftNode = document.createElement('div');
            leftNode.className = `tree-node left-node ${activeLevel >= 1 && highlight === 'left' ? 'highlighted' : 'dimmed'}`;
            leftNode.textContent = leftVal;
            const rightNode = document.createElement('div');
            rightNode.className = `tree-node right-node ${activeLevel >= 1 && highlight === 'right' ? 'highlighted' : 'dimmed'}`;
            rightNode.textContent = rightVal;
            const targetNode = document.createElement('div');
            targetNode.className = `tree-node target-node ${activeLevel >= 2 ? 'success' : 'dimmed'}`;
            targetNode.textContent = targetVal;
            const isLeft = (highlight === 'left');
            const leftColor = (activeLevel >= 1 && isLeft) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.15)';
            const leftStrokeWidth = (activeLevel >= 1 && isLeft) ? '4' : '2';
            const leftDash = (activeLevel >= 1 && isLeft) ? '8 4' : 'none';
            const rightColor = (activeLevel >= 1 && !isLeft) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.15)';
            const rightStrokeWidth = (activeLevel >= 1 && !isLeft) ? '4' : '2';
            const rightDash = (activeLevel >= 1 && !isLeft) ? '8 4' : 'none';
            const targetColor = (activeLevel >= 2) ? 'var(--success-green)' : 'rgba(255,255,255,0.15)';
            const targetStrokeWidth = (activeLevel >= 2) ? '4' : '2';
            const targetDash = (activeLevel >= 2) ? '8 4' : 'none';
            svg.innerHTML = `
                <line class="tree-line-draw" x1="50%" y1="12%" x2="28%" y2="38%" stroke="${leftColor}" stroke-width="${leftStrokeWidth}" stroke-dasharray="${leftDash}" />
                <line class="tree-line-draw" x1="50%" y1="12%" x2="72%" y2="38%" stroke="${rightColor}" stroke-width="${rightStrokeWidth}" stroke-dasharray="${rightDash}" />
                <line class="tree-line-draw" x1="28%" y1="52%" x2="28%" y2="74%" stroke="${targetColor}" stroke-width="${targetStrokeWidth}" stroke-dasharray="${targetDash}" />
            `;
            container.appendChild(svg);
            container.appendChild(rootNode);
            container.appendChild(leftNode);
            container.appendChild(rightNode);
            container.appendChild(targetNode);
            wrapper.appendChild(header);
            wrapper.appendChild(container);
            root.appendChild(wrapper);
        } else if (slide.layout === 'table') {
            const isSqlBypass = (slide.id === 'slide_sql_5b' || (slide.tableRows && slide.tableRows.includes("Bypass")));
            if (isSqlBypass) {
                const wrapper = document.createElement('div');
                wrapper.className = 'layout-sql-flow-view';
                const header = document.createElement('div');
                header.className = 'sql-flow-header';
                const emoji = getSlideHeaderEmoji(slide) || 'ðŸ›¡ï¸';
                header.innerHTML = `
                    <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                    <h2>${formatTitleHTML(slide.title || 'Bypass kiá»ƒm tra máº­t kháº©u')}</h2>
                    <p>${formatSubtitleHTML(slide.subtitle || 'ï¸ TOÃ€N Bá»˜ ÄIá»€U KIá»†N WHERE = TRUE')}</p>
                `;
                const canvas = document.createElement('div');
                canvas.className = 'sql-flow-canvas';
                // SQL Code Block
                const codeBox = document.createElement('div');
                codeBox.className = 'sql-code-box';
                codeBox.innerHTML = `
                    <span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> users<br>
                    <span class="sql-kw">WHERE</span> <span class="code-expr-email">email = ''</span> 
                    <span class="sql-kw code-expr-or">OR</span> 
                    <span class="code-expr-true">'1'='1'</span> 
                    <span class="sql-kw code-expr-and">AND</span> 
                    <span class="code-expr-pass">password = ''</span>;
                `;
                canvas.appendChild(codeBox);
                // Flow Nodes container
                const nodesContainer = document.createElement('div');
                nodesContainer.className = 'flow-nodes-container';
                // Left Node: email = '' -> FALSE
                const nodeEmail = document.createElement('div');
                nodeEmail.className = 'flow-node-card node-email dimmed';
                nodeEmail.id = 'flow-node-email';
                nodeEmail.innerHTML = `
                    <div class="node-expr">email = ''</div>
                    <div class="node-status status-false">Sai (FALSE)</div>
                    <div class="node-label">NhÃ¡nh chÃ­nh bá»‹ bá» qua</div>
                `;
                nodesContainer.appendChild(nodeEmail);
                // Operator OR
                const nodeOr = document.createElement('div');
                nodeOr.className = 'flow-operator-circle';
                nodeOr.id = 'flow-node-or';
                nodeOr.innerHTML = '<span>OR</span>';
                nodesContainer.appendChild(nodeOr);
                // Right Node: '1'='1' -> TRUE
                const nodeTrue = document.createElement('div');
                nodeTrue.className = 'flow-node-card node-true dimmed';
                nodeTrue.id = 'flow-node-true';
                nodeTrue.innerHTML = `
                    <div class="node-expr">'1'='1'</div>
                    <div class="node-status status-true">ÄÃºng (TRUE)</div>
                    <div class="node-label">NhÃ¡nh OR luÃ´n Ä‘Ãºng</div>
                `;
                nodesContainer.appendChild(nodeTrue);
                canvas.appendChild(nodesContainer);
                // SVG Paths
                const svgContainer = document.createElement('div');
                svgContainer.className = 'flow-svg-container';
                svgContainer.innerHTML = `
                    <svg width="100%" height="100%" style="position: absolute; top:0; left:0; pointer-events:none;">
                        <path id="path-email-or" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" />
                        <path id="path-true-or" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" />
                        <path id="path-or-result" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" />
                        <path id="path-result-admin" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" />
                    </svg>
                `;
                canvas.appendChild(svgContainer);
                // Result Container
                const resultContainer = document.createElement('div');
                resultContainer.className = 'flow-result-container';
                // Node WHERE logic
                const nodeWhere = document.createElement('div');
                nodeWhere.className = 'flow-node-card node-where dimmed';
                nodeWhere.id = 'flow-node-where';
                nodeWhere.innerHTML = `
                    <div class="node-expr">WHERE Logic</div>
                    <div class="node-status status-true">ÄÃºng (TRUE)</div>
                    <div class="node-label">Bypass kiá»ƒm tra máº­t kháº©u</div>
                `;
                resultContainer.appendChild(nodeWhere);
                // Output Admin Card
                const nodeAdmin = document.createElement('div');
                nodeAdmin.className = 'flow-admin-card dimmed';
                nodeAdmin.id = 'flow-node-admin';
                nodeAdmin.innerHTML = `
                    <div class="admin-avatar">
                        <i data-lucide="user-check"></i>
                    </div>
                    <div class="admin-info">
                        <div class="admin-title">ADMIN</div>
                        <div class="admin-subtitle">TÃ i khoáº£n Ä‘Æ°á»£c tráº£ vá»</div>
                    </div>
                `;
                resultContainer.appendChild(nodeAdmin);
                canvas.appendChild(resultContainer);
                wrapper.appendChild(header);
                wrapper.appendChild(canvas);
                root.appendChild(wrapper);
                // Initialize SVG path coordinates
                setTimeout(() => {
                    updateSQLFlowPaths();
                }, 50);
            } else {
                const wrapper = document.createElement('div');
                wrapper.className = 'layout-table-view';
                const header = document.createElement('div');
                header.className = 'table-header';
                const emoji = getSlideHeaderEmoji(slide);
                header.innerHTML = `
                    <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                    <h2>${formatTitleHTML(slide.title || '')}</h2>
                    <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
                `;
                const container = document.createElement('div');
                container.className = 'table-container-box';
                const table = document.createElement('table');
                table.className = 'studio-data-table';
                const headers = (slide.tableHeaders || 'ID | Cá»™t 1 | Cá»™t 2').split('|').map(x => x.trim());
                const rows = (slide.tableRows || '1 | DÃ²ng A | GiÃ¡ trá»‹\n2 | DÃ²ng B | GiÃ¡ trá»‹').split('\n').map(line => line.split('|').map(x => x.trim()));
                // Dynamic Scanning Highlight index calculation
                const duration = getSlideDuration(slide);
                let activeRowIdx = -1;
                if (isPlaying && duration > 0) {
                    const ratio = animTime / duration;
                    if (ratio < 0.75) {
                        const numScanRows = rows.length - 1;
                        activeRowIdx = Math.min(numScanRows - 1, Math.floor((ratio / 0.75) * numScanRows));
                    } else {
                        activeRowIdx = rows.length - 1;
                    }
                } else {
                    activeRowIdx = parseInt(slide.tableHighlight, 10) - 1;
                    if (isNaN(activeRowIdx)) activeRowIdx = -1;
                }
                const thead = document.createElement('thead');
                const trHead = document.createElement('tr');
                headers.forEach(h => {
                    const th = document.createElement('th');
                    th.textContent = h;
                    trHead.appendChild(th);
                });
                thead.appendChild(trHead);
                table.appendChild(thead);
                const tbody = document.createElement('tbody');
                rows.forEach((rowCells, idx) => {
                    if (rowCells.length === 0 || (rowCells.length === 1 && rowCells[0] === '')) return;
                    const tr = document.createElement('tr');
                    // Color formatting classes
                    if (idx === activeRowIdx) {
                        if (idx === rows.length - 1) {
                            tr.className = 'highlight-success scanning-active';
                        } else {
                            tr.className = 'highlight-danger scanning-active';
                        }
                    } else if (idx < activeRowIdx) {
                        if (idx === rows.length - 1) {
                            tr.className = 'highlight-success';
                        } else {
                            tr.className = 'scanned-failed';
                        }
                    } else {
                        tr.className = 'table-row-item';
                    }
                    rowCells.forEach(cell => {
                        const td = document.createElement('td');
                        const cellLower = cell.toLowerCase();
                        if (cellLower.includes('sai') || cellLower.includes('bá» qua')) {
                            td.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">${cell}</span>`;
                        } else if (cellLower.includes('Ä‘Ãºng') || cellLower.includes('tÃ¬m tháº¥y')) {
                            td.innerHTML = `<span style="color: var(--success-green); font-weight: bold;">${cell}</span>`;
                        } else {
                            td.textContent = cell;
                        }
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                container.appendChild(table);
                wrapper.appendChild(header);
                wrapper.appendChild(container);
                root.appendChild(wrapper);
            }
        } else if (slide.layout === 'alert') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-alert-view';
            const level = slide.alertLevel || 'danger';
            const card = document.createElement('div');
            card.className = `alert-card-container alert-${level}`;
            const iconPulse = document.createElement('div');
            iconPulse.className = 'alert-icon-pulse';
            let alertIcon = 'alert-octagon';
            if (level === 'warning') alertIcon = 'alert-triangle';
            else if (level === 'info') alertIcon = 'info';
            iconPulse.innerHTML = `<i data-lucide="${alertIcon}"></i>`;
            const h2 = document.createElement('h2');
            h2.innerHTML = formatTitleHTML(slide.title || '');
            const p = document.createElement('p');
            p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
            card.appendChild(iconPulse);
            card.appendChild(h2);
            card.appendChild(p);
            if (slide.alertDetail) {
                const detailsList = document.createElement('div');
                detailsList.className = 'alert-details-list';
                const lines = (slide.alertDetail || '').split('\n').filter(line => line.trim().length > 0);
                lines.forEach((lineText, idx) => {
                    const item = document.createElement('div');
                    item.className = 'alert-detail-item';
                    // Parse line for alert level prefix or keyword
                    let itemLevel = level; // fallback to slide level
                    let cleanText = lineText.trim();
                    let prefixLabel = '';
                    const prefixMatch = cleanText.match(/^(CRITICAL|ERROR|WARNING|Lá»œI KHUYÃŠN|TIP|INFO|OK|STATUS|EFFECT|HACKER INPUT)[:\-\.]?\s*(.*)$/i);
                    let prefixWord = '';
                    if (prefixMatch) {
                        prefixWord = prefixMatch[1].toUpperCase();
                        cleanText = prefixMatch[2];
                        if (prefixWord === 'CRITICAL' || prefixWord === 'ERROR') {
                            itemLevel = 'danger';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'WARNING') {
                            itemLevel = 'warning';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'Lá»œI KHUYÃŠN' || prefixWord === 'TIP' || prefixWord === 'OK') {
                            itemLevel = 'success';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'INFO') {
                            itemLevel = 'info';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'STATUS') {
                            itemLevel = 'warning';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'EFFECT') {
                            itemLevel = 'danger';
                            prefixLabel = prefixWord;
                        } else if (prefixWord === 'HACKER INPUT') {
                            itemLevel = 'danger';
                            prefixLabel = 'Hacker Input';
                            let commandCode = cleanText;
                            const sqlKeywords = ['SELECT', 'UNION', 'DROP', 'TABLE', 'FROM', 'WHERE', 'AND', 'OR', 'NULL'];
                            sqlKeywords.forEach(kw => {
                                const reg = new RegExp(`\\b${kw}\\b`, 'g');
                                commandCode = commandCode.replace(reg, `<span class="sql-keyword">${kw}</span>`);
                            });
                            cleanText = `<code class="alert-code-highlight">${commandCode}</code>`;
                        }
                    } else {
                        // Fallback detection by keywords
                        const lowerText = cleanText.toLowerCase();
                        if (lowerText.includes('critical') || lowerText.includes('sáº­p') || lowerText.includes('100%')) {
                            itemLevel = 'danger';
                        } else if (lowerText.includes('lá»i khuyÃªn') || lowerText.includes('nÃªn') || lowerText.includes('giáº£i phÃ¡p')) {
                            itemLevel = 'success';
                        }
                    }
                    item.classList.add(`level-${itemLevel}`);
                    // Choose Lucide icon based on level
                    let iconName = 'alert-circle';
                    if (itemLevel === 'danger') iconName = 'x-circle';
                    else if (itemLevel === 'warning') iconName = 'alert-triangle';
                    else if (itemLevel === 'success') iconName = 'check-circle-2';
                    else if (itemLevel === 'info') iconName = 'info';
                    // Render inner HTML with custom badge if prefix was found
                    let badgeHTML = prefixLabel ? `<span class="alert-detail-badge badge-${itemLevel}">${prefixLabel}</span>` : '';
                    // Format numbers in text to pulse or be highlighted (skip for HACKER INPUT code blocks)
                    let formattedText;
                    if (prefixWord === 'HACKER INPUT') {
                        formattedText = cleanText;
                    } else {
                        formattedText = cleanText.replace(/(\b\d+(?:\.\d+)?%?|\b>\s*\d+|\b\d+\s*(?:ms|s|x|láº§n)\b)/g, (match) => {
                            const colorClass = (itemLevel === 'danger' || itemLevel === 'warning') ? 'alert-red' : 'success-green';
                            return `<span class="alert-detail-number ${colorClass}">${match}</span>`;
                        });
                    }
                    item.innerHTML = `
                        <div class="alert-detail-icon"><i data-lucide="${iconName}"></i></div>
                        <div class="alert-detail-content">
                            ${badgeHTML}
                            <div class="alert-detail-text">${formattedText}</div>
                        </div>
                    `;
                    // Entrance animation delay for each detail item
                    item.style.animationDelay = `${0.3 + idx * 0.15}s`;
                    detailsList.appendChild(item);
                });
                card.appendChild(detailsList);
            }
            wrapper.appendChild(card);
            root.appendChild(wrapper);
        } else if (slide.layout === 'boxes') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-boxes-view';
            const header = document.createElement('div');
            header.className = 'boxes-header';
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
            const container = document.createElement('div');
            container.className = 'boxes-grid-container';
            const labels = (slide.boxesLabels || 'Page 1 | Page 2 | Page 3 | Page 4').split('|').map(x => x.trim());
            const hlIdx = parseInt(slide.boxesHighlight, 10);
            const hlType = slide.boxesHighlightType || 'warning';
            labels.forEach((label, idx) => {
                const box = document.createElement('div');
                box.className = 'box-slot-item';
                const icon = document.createElement('div');
                icon.className = 'box-slot-icon';
                let boxIcon = 'database';
                if (label.toLowerCase().includes('target') || label.toLowerCase().includes('key') || label.toLowerCase().includes('Ä‘Ã­ch') || label.toLowerCase().includes('an') || label.toLowerCase().includes('Ä‘Ãºng')) {
                    boxIcon = 'check-square';
                }
                icon.innerHTML = `<i data-lucide="${boxIcon}"></i>`;
                const text = document.createElement('span');
                text.textContent = label;
                box.appendChild(icon);
                box.appendChild(text);
                if (idx + 1 === hlIdx) {
                    box.className += ` highlight-${hlType}`;
                }
                container.appendChild(box);
            });
            wrapper.appendChild(header);
            if (slide.code) {
                const editor = document.createElement('div');
                editor.className = 'editor-window-container';
                editor.style.marginTop = '10px';
                editor.style.marginBottom = '30px';
                editor.style.width = '90%';
                editor.style.maxWidth = '800px';
                editor.style.marginLeft = 'auto';
                editor.style.marginRight = 'auto';
                const topBar = document.createElement('div');
                topBar.className = 'editor-top-bar';
                topBar.innerHTML = `
                    <div class="mac-controls">
                        <div class="mac-dot close"></div>
                        <div class="mac-dot minimize"></div>
                        <div class="mac-dot maximize"></div>
                    </div>
                    <div class="editor-filename">${getCodeLayoutFilename(slide)}</div>
                `;
                const body = document.createElement('div');
                body.className = 'editor-code-body';
                const linesNum = document.createElement('div');
                linesNum.className = 'editor-line-numbers';
                const codeContent = document.createElement('pre');
                codeContent.className = 'editor-code-content';
                const lines = slide.code.split('\n');
                linesNum.innerHTML = Array.from({ length: lines.length || 1 }, (_, i) => i + 1).join('<br>');
                codeContent.innerHTML = '';
                lines.forEach((lineText, idx) => {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'code-line';
                    lineDiv.id = `code-line-boxes-${idx}`;
                    lineDiv.innerHTML = highlightSQL(lineText, slide.codePhraseHighlights) || '&nbsp;';
                    codeContent.appendChild(lineDiv);
                });
                body.appendChild(linesNum);
                body.appendChild(codeContent);
                editor.appendChild(topBar);
                editor.appendChild(body);
                wrapper.appendChild(editor);
            }
            wrapper.appendChild(container);
            root.appendChild(wrapper);
        } else if (slide.layout === 'search') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-search-view';
            const header = document.createElement('div');
            header.className = 'boxes-header'; // reuse
            const emoji = getSlideHeaderEmoji(slide);
            header.innerHTML = `
                <div class="slide-header-icon-box" style="font-size:38px; display:flex; align-items:center; justify-content:center; line-height:1;">${emoji}</div>
                <h2>${formatTitleHTML(slide.title || '')}</h2>
                <p>${formatSubtitleHTML(slide.subtitle || '')}</p>
            `;
            const consoleContainer = document.createElement('div');
            consoleContainer.className = 'search-console-container';
            const searchBar = document.createElement('div');
            searchBar.className = 'search-bar-mockup';
            searchBar.innerHTML = `
                <i data-lucide="search"></i>
                <span class="search-query-text">${slide.searchQuery || ''}</span>
                <span class="search-typing-cursor"></span>
            `;
            const radarCircle = document.createElement('div');
            const indicator = slide.searchIndicator || 'scanning';
            radarCircle.className = `search-scanner-circle ${indicator}`;
            if (indicator === 'scanning') {
                radarCircle.innerHTML = `
                    <div class="radar-sweep-line"></div>
                    <i data-lucide="compass"></i>
                `;
            } else {
                radarCircle.innerHTML = `<i data-lucide="check-circle-2"></i>`;
            }
            const status = document.createElement('div');
            status.className = 'search-status-label';
            status.textContent = slide.searchStatus || 'Searching...';
            consoleContainer.appendChild(searchBar);
            consoleContainer.appendChild(radarCircle);
            consoleContainer.appendChild(status);
            wrapper.appendChild(header);
            wrapper.appendChild(consoleContainer);
            root.appendChild(wrapper);
        } else if (slide.layout === 'spotify') {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-spotify-view';
            const playlistTitle = slide.spotifyPlaylist || 'Giai Ä‘iá»‡u Coding';
            const searchQuery = slide.spotifySearchQuery || '';
            const viewMode = slide.spotifyViewMode || 'playlist';
            // Parse active song
            const activeSongParts = (slide.spotifyActiveSong || 'Chill Beats | Lofi Girl | 3:45').split('|').map(x => x.trim());
            const activeSongTitle = activeSongParts[0] || 'Unknown Title';
            const activeSongArtist = activeSongParts[1] || 'Unknown Artist';
            const activeSongDuration = activeSongParts[2] || '3:00';
            // Parse list of songs
            const songsText = slide.spotifySongs || 'Chill Beats | Lofi Girl | 3:45\nCode Flow | Synth Boy | 4:12\nCompile error | Dev Jam | 2:50';
            const songs = songsText.split('\n').map(line => {
                const parts = line.split('|').map(x => x.trim());
                if (!parts[0]) return null;
                return {
                    title: parts[0],
                    artist: parts[1] || 'Unknown Artist',
                    duration: parts[2] || '3:00'
                };
            }).filter(Boolean);
            if (viewMode === 'playlist') {
                // Render Playlist layout
                wrapper.innerHTML = `
                    <div class="spotify-playlist-container">
                        <!-- Spotify Top Bar -->
                        <div class="spotify-header-bar">
                            <div class="spotify-nav-arrows">
                                <span class="nav-arrow"><i data-lucide="chevron-left"></i></span>
                                <span class="nav-arrow"><i data-lucide="chevron-right"></i></span>
                            </div>
                            ${searchQuery ? `
                                <div class="spotify-search-bar">
                                    <i data-lucide="search"></i>
                                    <span class="spotify-search-text">${searchQuery}</span>
                                </div>
                            ` : `
                                <div class="spotify-profile-tab">
                                    <div class="spotify-user-badge">T</div>
                                </div>
                            `}
                        </div>
                        <!-- Playlist Meta Banner -->
                        <div class="spotify-playlist-hero">
                            <div class="spotify-playlist-art">
                                <i data-lucide="music-4"></i>
                            </div>
                            <div class="spotify-playlist-info">
                                <span class="playlist-tag">PLAYLIST CÃ NHÃ‚N</span>
                                <h1 class="playlist-name-title">${playlistTitle}</h1>
                                <p class="playlist-creator-desc">Táº¡o bá»Ÿi <strong>@Turnio.dev</strong> â€¢ ${songs.length} bÃ i hÃ¡t</p>
                            </div>
                        </div>
                        <!-- Playlist Controls -->
                        <div class="spotify-playlist-controls">
                            <button class="spotify-play-btn"><i data-lucide="play"></i></button>
                            <button class="spotify-action-icon"><i data-lucide="heart"></i></button>
                            <button class="spotify-action-icon"><i data-lucide="arrow-down-circle"></i></button>
                            <button class="spotify-action-icon"><i data-lucide="more-horizontal"></i></button>
                        </div>
                        <!-- Tracks Table -->
                        <div class="spotify-tracks-list">
                            <div class="tracks-list-header">
                                <span class="track-col-index">#</span>
                                <span class="track-col-title">TIÃŠU Äá»€</span>
                                <span class="track-col-duration"><i data-lucide="clock"></i></span>
                            </div>
                            <div class="tracks-list-items">
                                ${songs.map((song, index) => {
                    const isActive = song.title.toLowerCase() === activeSongTitle.toLowerCase();
                    return `
                                        <div class="track-row ${isActive ? 'active-track' : ''}">
                                            <span class="track-index">
                                                ${isActive && isPlaying ? `
                                                    <div class="spotify-mini-equalizer">
                                                        <div class="eq-bar bar-1"></div>
                                                        <div class="eq-bar bar-2"></div>
                                                        <div class="eq-bar bar-3"></div>
                                                    </div>
                                                ` : (index + 1)}
                                            </span>
                                            <div class="track-details">
                                                <span class="track-name">${song.title}</span>
                                                <span class="track-artist">${song.artist}</span>
                                            </div>
                                            <span class="track-duration">${song.duration}</span>
                                        </div>
                                    `;
                }).join('')}
                            </div>
                        </div>
                    </div>
                    <!-- Spotify Bottom Playback Bar -->
                    <div class="spotify-bottom-player">
                        <div class="bottom-track-details">
                            <div class="bottom-album-art"><i data-lucide="music"></i></div>
                            <div class="bottom-track-text">
                                <span class="bottom-track-name marquee-container">${activeSongTitle}</span>
                                <span class="bottom-track-artist">${activeSongArtist}</span>
                            </div>
                            <button class="bottom-heart-btn"><i data-lucide="heart"></i></button>
                        </div>
                        <div class="bottom-playback-controls">
                            <div class="bottom-control-buttons">
                                <button class="bottom-icon-btn"><i data-lucide="shuffle"></i></button>
                                <button class="bottom-icon-btn"><i data-lucide="skip-back"></i></button>
                                <button class="bottom-play-circle"><i data-lucide="${isPlaying ? 'pause' : 'play'}"></i></button>
                                <button class="bottom-icon-btn"><i data-lucide="skip-forward"></i></button>
                                <button class="bottom-icon-btn"><i data-lucide="repeat"></i></button>
                            </div>
                            <div class="bottom-progress-slider">
                                <span class="bottom-progress-time">0:00</span>
                                <div class="progress-bar-bg">
                                    <div class="progress-bar-fill" style="width: 0%;"></div>
                                </div>
                                <span class="bottom-total-time">${activeSongDuration}</span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Render full Player layout (Now Playing screen)
                wrapper.innerHTML = `
                    <div class="spotify-full-player-container">
                        <!-- Header -->
                        <div class="player-header-bar">
                            <button class="header-icon-btn"><i data-lucide="chevron-down"></i></button>
                            <div class="header-text-info">
                                <span class="playing-from-tag">ÄANG PHÃT Tá»ª PLAYLIST</span>
                                <span class="playing-playlist-name">${playlistTitle}</span>
                            </div>
                            <button class="header-icon-btn"><i data-lucide="more-vertical"></i></button>
                        </div>
                        <!-- Album Art Container -->
                        <div class="player-album-art-wrapper">
                            <div class="player-album-art-glow"></div>
                            <div class="player-album-art-card">
                                <i data-lucide="music-4" class="fallback-art-icon"></i>
                                <div class="spotify-spinner-overlay">
                                    <div class="spinner-vinyl"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Track Info -->
                        <div class="player-track-info-row">
                            <div class="player-track-details">
                                <h1 class="player-track-name">${activeSongTitle}</h1>
                                <p class="player-track-artist">${activeSongArtist}</p>
                            </div>
                            <button class="player-heart-btn"><i data-lucide="heart" class="spotify-heart-icon"></i></button>
                        </div>
                        <!-- Timeline Progress -->
                        <div class="player-timeline-container">
                            <div class="player-progress-bar-bg">
                                <div class="player-progress-bar-fill" style="width: 0%;"></div>
                                <div class="player-progress-handle" style="left: 0%;"></div>
                            </div>
                            <div class="player-time-labels">
                                <span class="player-elapsed-time">0:00</span>
                                <span class="player-duration-time">${activeSongDuration}</span>
                            </div>
                        </div>
                        <!-- Player Controls -->
                        <div class="player-playback-controls-row">
                            <button class="player-control-btn spotify-green-hover"><i data-lucide="shuffle"></i></button>
                            <button class="player-control-btn"><i data-lucide="skip-back"></i></button>
                            <button class="player-main-play-btn"><i data-lucide="${isPlaying ? 'pause' : 'play'}"></i></button>
                            <button class="player-control-btn"><i data-lucide="skip-forward"></i></button>
                            <button class="player-control-btn spotify-green-hover"><i data-lucide="repeat"></i></button>
                        </div>
                        <!-- Extra device controls -->
                        <div class="player-footer-controls">
                            <button class="device-icon-btn"><i data-lucide="speaker"></i></button>
                            <button class="device-icon-btn"><i data-lucide="list-music"></i></button>
                        </div>
                    </div>
                `;
            }
            root.appendChild(wrapper);
        } else if (slide.layout === 'hook') {
            const theme = slide.hookTheme || 'danger';
            const wrapper = document.createElement('div');
            wrapper.className = `layout-hook-view hook-theme-${theme}`;

            const badgeContainer = document.createElement('div');
            badgeContainer.className = 'hook-badge-container';
            const iconName = slide.hookIcon || 'flame';
            badgeContainer.innerHTML = `
                <span class="hook-badge-capsule">
                    <i data-lucide="${iconName}"></i>
                    ${slide.hookTag || 'HOOK'}
                </span>
            `;

            const titleBox = document.createElement('div');
            titleBox.className = 'hook-title-box';
            const h1 = document.createElement('h1');
            h1.innerHTML = (slide.hookTitle || '').replace(/\n/g, '<br>');
            const p = document.createElement('p');
            p.className = 'hook-lead-text';
            p.innerHTML = (slide.hookSubtitle || '').replace(/\n/g, '<br>');
            titleBox.appendChild(h1);
            titleBox.appendChild(p);

            const decoration = document.createElement('div');
            decoration.className = 'hook-footer-decoration';
            decoration.innerHTML = `<div class="hook-laser-line"></div>`;

            wrapper.appendChild(badgeContainer);
            wrapper.appendChild(titleBox);
            wrapper.appendChild(decoration);
            root.appendChild(wrapper);
        } else if (slide.layout === 'transition') {
            const theme = slide.transitionTheme || 'warning';
            const wrapper = document.createElement('div');
            wrapper.className = `layout-transition-view transition-theme-${theme}`;
            const header = document.createElement('div');
            header.className = 'transition-user-header';
            header.innerHTML = `
                <div class="transition-user-avatar">T</div>
                <div class="transition-user-handle">@turnio.dev <span>â€¢ Backend</span></div>
            `;
            const titleBox = document.createElement('div');
            titleBox.className = 'transition-title-box';
            const h1 = document.createElement('h1');
            h1.innerHTML = (slide.transitionTitle || '').replace(/\n/g, '<br>');
            const iconName = slide.transitionIcon || 'help-circle';
            const iconWrap = document.createElement('div');
            iconWrap.className = 'transition-large-icon-wrapper';
            iconWrap.innerHTML = `<i data-lucide="${iconName}"></i>`;
            titleBox.appendChild(iconWrap);
            titleBox.appendChild(h1);
            wrapper.appendChild(header);
            wrapper.appendChild(titleBox);
            root.appendChild(wrapper);
        }
        lucide.createIcons();
    }
    // --- Smooth DOM Element Value Updates (No Rebuilds!) ---
    if (slide.layout === 'title') {
        const h1 = root.querySelector('.layout-title-view h1');
        if (h1) {
            if (slide.id === 'slide_token_1a') {
                if (!h1.querySelector('.vs-circle')) {
                    h1.innerHTML = `Access Token<br><span class="vs-circle">vs</span><br>Refresh Token`;
                }
            } else {
                h1.innerHTML = formatTitleHTML(slide.title || '');
            }
        }
        const p = root.querySelector('.layout-title-view p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const slideIndex = slides.findIndex(s => s.id === slide.id);
        const isLastSlide = (slideIndex === slides.length - 1 && slides.length > 0);
        if (isLastSlide) {
            const iconWrap = root.querySelector('.layout-title-view .title-slide-icon-wrapper');
            if (iconWrap) {
                const isFollowed = (animTime > 2.0);
                if (isFollowed && !iconWrap.classList.contains('is-followed')) {
                    iconWrap.classList.add('is-followed');
                    const btn = iconWrap.querySelector('.follow-plus-btn');
                    if (btn) {
                        btn.innerHTML = '<i data-lucide="check"></i>';
                        lucide.createIcons();
                    }
                } else if (!isFollowed && iconWrap.classList.contains('is-followed')) {
                    iconWrap.classList.remove('is-followed');
                    const btn = iconWrap.querySelector('.follow-plus-btn');
                    if (btn) {
                        btn.innerHTML = '<i data-lucide="plus"></i>';
                        lucide.createIcons();
                    }
                }
            }
        } else {
            const iconSpan = root.querySelector('.layout-title-view .title-slide-icon-wrapper span');
            if (iconSpan) {
                const emoji = getSlideHeaderEmoji(slide);
                if (iconSpan.textContent !== emoji) {
                    iconSpan.textContent = emoji;
                    const isTicket1 = (slide.id === 'slide_ticket_1a_1');
                    iconSpan.style.fontSize = isTicket1 ? '150px' : '48px';
                    iconSpan.style.filter = isTicket1 ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))' : '';
                }
            }
        }
    } else if (slide.layout === 'code') {
        const wrapper = root.querySelector('.layout-code-view');
        if (wrapper) {
            const status = getPerformanceStatus(slide);
            if (status.class === 'danger') {
                wrapper.classList.add('status-danger');
            } else {
                wrapper.classList.remove('status-danger');
            }
        }
        const h2 = root.querySelector('.code-info-container h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.code-info-container p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const iconI = root.querySelector('.code-info-container .slide-header-icon-box i');
        if (iconI) {
            const iconName = getSlideIcon(slide);
            if (iconI.getAttribute('data-lucide') !== iconName) {
                iconI.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }
        }
        const lines = root.querySelectorAll('.code-line');
        if (lines.length > 0) {
            const duration = getSlideDuration(slide);
            if (slide.codeHighlightLine !== undefined && slide.codeHighlightLine !== null && slide.codeHighlightLine !== "") {
                const targetLines = String(slide.codeHighlightLine).split(',').map(x => parseInt(x.trim(), 10) - 1);
                const startDelay = 0.8;
                const shouldHighlight = !isPlaying || (animTime > startDelay);
                lines.forEach((line, idx) => {
                    if (shouldHighlight && targetLines.includes(idx)) {
                        line.classList.add('active-line');
                    } else {
                        line.classList.remove('active-line');
                    }
                });
            } else {
                let activeLineIdx = -1;
                if (isPlaying && duration > 0) {
                    const startDelay = 0.8;
                    if (animTime > startDelay) {
                        const activeRatio = (animTime - startDelay) / (duration - startDelay);
                        activeLineIdx = Math.min(lines.length - 1, Math.floor(activeRatio * lines.length));
                    }
                }
                lines.forEach((line, idx) => {
                    if (idx === activeLineIdx) {
                        line.classList.add('active-line');
                    } else {
                        line.classList.remove('active-line');
                    }
                });
            }
        }
    } else if (slide.layout === 'diagram') {
        const h2 = root.querySelector('.diagram-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.diagram-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const iconI = root.querySelector('.diagram-header .slide-header-icon-box i');
        if (iconI) {
            const iconName = getSlideIcon(slide);
            if (iconI.getAttribute('data-lucide') !== iconName) {
                iconI.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }
        }
    } else if (slide.layout === 'cards') {
        const h2 = root.querySelector('.cards-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.cards-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const iconI = root.querySelector('.cards-header .slide-header-icon-box i');
        if (iconI) {
            const iconName = getSlideIcon(slide);
            if (iconI.getAttribute('data-lucide') !== iconName) {
                iconI.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }
        }
    } else if (slide.layout === 'split') {
        const h2 = root.querySelector('.split-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.split-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const iconI = root.querySelector('.split-header .slide-header-icon-box i');
        if (iconI) {
            const iconName = getSlideIcon(slide);
            if (iconI.getAttribute('data-lucide') !== iconName) {
                iconI.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }
        }
        // Dynamic number count-down update for right-column comparison
        const rightListItems = root.querySelectorAll('.right-column .split-col-list li');
        const rightItems = (slide.splitRightText || '').split('\n').filter(x => x.trim().length > 0);
        if (rightListItems.length === rightItems.length) {
            const duration = getSlideDuration(slide);
            const introDelay = 1.2;
            const remainingTime = duration - introDelay;
            const stepDuration = remainingTime / 2;
            const rightColStartTime = introDelay + stepDuration;
            rightListItems.forEach((li) => {
                const isAnim = li.getAttribute('data-animatable') === 'true';
                if (isAnim) {
                    const numLeft = parseFloat(li.getAttribute('data-num-left'));
                    const numRight = parseFloat(li.getAttribute('data-num-right'));
                    const template = li.getAttribute('data-text-template');
                    let currentVal = numRight;
                    let showBadge = false;
                    if (isPlaying && duration > 0) {
                        if (animTime > rightColStartTime) {
                            const elapsed = animTime - rightColStartTime;
                            const animDuration = Math.min(1.0, stepDuration);
                            const progress = Math.min(1, elapsed / animDuration);
                            const ease = progress * (2 - progress); // easeOutQuad
                            currentVal = numLeft - (numLeft - numRight) * ease;
                            if (progress >= 0.9) showBadge = true;
                        } else {
                            currentVal = numLeft;
                        }
                    } else {
                        currentVal = numRight;
                        showBadge = true;
                    }
                    const formattedNum = numRight % 1 !== 0 ? currentVal.toFixed(1) : Math.floor(currentVal);
                    const newTextHTML = template.replace('__NUM__', `<span class="drop-num-highlight">${formattedNum}</span>`);
                    const textSpan = li.querySelector('.split-item-text');
                    if (textSpan && textSpan.innerHTML !== newTextHTML) {
                        textSpan.innerHTML = newTextHTML;
                    }
                    const badgeContainer = li.querySelector('.split-item-badge-container');
                    if (badgeContainer) {
                        const dropPct = Math.round(((numLeft - numRight) / numLeft) * 100);
                        const badgeHTML = `<span class="reduction-badge ${showBadge ? 'show-badge' : ''}"><i data-lucide="trending-down"></i> ${dropPct}%</span>`;
                        if (badgeContainer.innerHTML !== badgeHTML) {
                            badgeContainer.innerHTML = badgeHTML;
                            lucide.createIcons();
                        }
                    }
                }
            });
        }
    } else if (slide.layout === 'metrics') {
        const h2 = root.querySelector('.metrics-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.metrics-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        const iconI = root.querySelector('.metrics-header .slide-header-icon-box i');
        if (iconI) {
            const iconName = getSlideIcon(slide);
            if (iconI.getAttribute('data-lucide') !== iconName) {
                iconI.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }
        }
        // Dynamic Table scanning row calculation if table exists in metrics layout
        const rows = (slide.tableRows || '').split('\n').map(line => line.split('|').map(x => x.trim())).filter(r => r.length > 0 && r[0] !== '');
        const tableRowsDOM = root.querySelectorAll('.metrics-layout-table tbody tr');
        const duration = getSlideDuration(slide);
        const scanPhaseDuration = slide.tableRows ? 3.5 : 0;
        let isScanCompleted = !slide.tableRows;
        let activeRowIdx = -1;
        if (slide.tableRows && tableRowsDOM.length === rows.length) {
            if (isPlaying && duration > 0) {
                if (animTime < scanPhaseDuration) {
                    const numScanRows = rows.length - 1;
                    activeRowIdx = Math.min(numScanRows - 1, Math.floor((animTime / scanPhaseDuration) * numScanRows));
                    isScanCompleted = false;
                } else {
                    activeRowIdx = rows.length - 1;
                    isScanCompleted = true;
                }
            } else {
                activeRowIdx = parseInt(slide.tableHighlight, 10) - 1;
                if (isNaN(activeRowIdx)) activeRowIdx = -1;
                isScanCompleted = true;
            }
            tableRowsDOM.forEach((tr, idx) => {
                if (idx === activeRowIdx) {
                    if (idx === rows.length - 1) {
                        tr.className = 'highlight-success scanning-active';
                    } else {
                        tr.className = 'highlight-danger scanning-active';
                    }
                } else if (idx < activeRowIdx) {
                    if (idx === rows.length - 1) {
                        tr.className = 'highlight-success';
                    } else {
                        tr.className = 'scanned-failed';
                    }
                } else {
                    tr.className = 'table-row-item';
                }
                // Dynamic text updates for the scanning dots row
                const firstTd = tr.querySelector('td');
                if (firstTd) {
                    const originalRow = rows[idx];
                    const originalFirstCell = originalRow[0] || '';
                    if (originalFirstCell.includes('...')) {
                        if (isPlaying && duration > 0) {
                            if (idx === activeRowIdx) {
                                const totalScanRows = rows.length - 1;
                                const rowScanDuration = scanPhaseDuration / totalScanRows;
                                const rowStartTime = idx * rowScanDuration;
                                const rowElapsedTime = animTime - rowStartTime;
                                const rowProgress = Math.max(0, Math.min(1, rowElapsedTime / rowScanDuration));
                                const prevNum = idx > 0 ? parseInt(rows[idx - 1][0].replace(/[\.,]/g, ''), 10) : 0;
                                const nextNum = idx + 1 < rows.length ? parseInt(rows[idx + 1][0].replace(/[\.,]/g, ''), 10) : 1000000;
                                const count = Math.floor(prevNum + rowProgress * (nextNum - prevNum));
                                firstTd.textContent = count.toLocaleString('vi-VN');
                                const secondTd = tr.querySelectorAll('td')[1];
                                if (secondTd) {
                                    secondTd.innerHTML = `<span style="color: var(--text-muted);">Äang duyá»‡t hÃ ng triá»‡u dÃ²ng...</span>`;
                                }
                                const thirdTd = tr.querySelectorAll('td')[2];
                                if (thirdTd) {
                                    thirdTd.innerHTML = `<span style="color: var(--gold-primary); font-weight: bold; animation: pulseIcon 0.8s infinite;">Äang tÃ¬m...</span>`;
                                }
                            } else if (idx < activeRowIdx) {
                                const nextNum = idx + 1 < rows.length ? parseInt(rows[idx + 1][0].replace(/[\.,]/g, ''), 10) : 1000000;
                                firstTd.textContent = (nextNum - 1).toLocaleString('vi-VN');
                                const secondTd = tr.querySelectorAll('td')[1];
                                if (secondTd) secondTd.textContent = 'Bá» qua';
                                const thirdTd = tr.querySelectorAll('td')[2];
                                if (thirdTd) thirdTd.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">Sai - Bá» qua</span>`;
                            } else {
                                firstTd.textContent = '...';
                                const secondTd = tr.querySelectorAll('td')[1];
                                if (secondTd) secondTd.textContent = '...';
                                const thirdTd = tr.querySelectorAll('td')[2];
                                if (thirdTd) thirdTd.textContent = '...';
                            }
                        } else {
                            firstTd.textContent = originalFirstCell;
                            const secondTd = tr.querySelectorAll('td')[1];
                            if (secondTd) secondTd.textContent = originalRow[1] || '';
                            const thirdTd = tr.querySelectorAll('td')[2];
                            if (thirdTd) {
                                const cell = originalRow[2] || '';
                                const cellLower = cell.toLowerCase();
                                if (cellLower.includes('sai') || cellLower.includes('bá» qua')) {
                                    thirdTd.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">${cell}</span>`;
                                } else if (cellLower.includes('Ä‘Ãºng') || cellLower.includes('tÃ¬m tháº¥y')) {
                                    thirdTd.innerHTML = `<span style="color: var(--success-green); font-weight: bold;">${cell}</span>`;
                                } else {
                                    thirdTd.textContent = cell;
                                }
                            }
                        }
                    }
                }
            });
        }
        // Rebuild metrics boxes if count doesn't match to allow live typing support
        const boxes = root.querySelectorAll('.metric-box');
        const rawLines = (slide.metrics || '').split('\n').filter(l => l.trim().length > 0);
        if (boxes.length !== rawLines.length) {
            const grid = root.querySelector('.metrics-grid');
            if (grid) {
                grid.innerHTML = '';
                rawLines.forEach((line) => {
                    const parts = line.split('|');
                    const num = parts[0] ? parts[0].trim() : '';
                    const lbl = parts[1] ? parts[1].trim() : '';
                    const itemColor = getMetricColor(num, lbl);
                    let numClass = 'metric-number';
                    if (itemColor === 'danger') numClass += ' alert-red';
                    else if (itemColor === 'success') numClass += ' success-green';
                    let boxClass = 'metric-box';
                    if (itemColor === 'danger') boxClass += ' level-danger';
                    else if (itemColor === 'success') boxClass += ' level-success';
                    const box = document.createElement('div');
                    box.className = boxClass;
                    if (slide.tableRows) {
                        box.style.opacity = '0';
                        box.style.transform = 'translateY(20px) scale(0.95)';
                    }
                    box.innerHTML = `
                            <div class="metric-number-wrapper">
                                <span class="${numClass}">${num}</span>
                            </div>
                            <div class="metric-label">${lbl}</div>
                        `;
                    grid.appendChild(box);
                });
            }
        } else {
            // Update text content of existing boxes
            rawLines.forEach((line, idx) => {
                const parts = line.split('|');
                const num = parts[0] ? parts[0].trim() : '';
                const lbl = parts[1] ? parts[1].trim() : '';
                const box = boxes[idx];
                const numSpan = box ? box.querySelector('.metric-number') : null;
                if (numSpan) {
                    numSpan.textContent = num;
                    numSpan.classList.remove('alert-red', 'success-green');
                    const itemColor = getMetricColor(num, lbl);
                    if (itemColor === 'danger') numSpan.classList.add('alert-red');
                    else if (itemColor === 'success') numSpan.classList.add('success-green');
                    box.classList.remove('level-danger', 'level-success');
                    if (itemColor === 'danger') box.classList.add('level-danger');
                    else if (itemColor === 'success') box.classList.add('level-success');
                }
                const lblDiv = box ? box.querySelector('.metric-label') : null;
                if (lblDiv) lblDiv.textContent = lbl;
            });
        }
    } else if (slide.layout === 'quote') {
        const p = root.querySelector('.quote-card-text');
        if (p) p.textContent = slide.quoteText || '';
        const auth = root.querySelector('.quote-card-author');
        if (auth) auth.textContent = slide.quoteAuthor || '';
    } else if (slide.layout === 'tree') {
        const h2 = root.querySelector('.tree-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.tree-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
        // Dynamic B-Tree traverse update logic
        const rootNode = root.querySelector('.tree-node.root-node');
        const leftNode = root.querySelector('.tree-node.left-node');
        const rightNode = root.querySelector('.tree-node.right-node');
        const targetNode = root.querySelector('.tree-node.target-node');
        const svg = root.querySelector('.tree-container svg');
        const highlight = slide.treeHighlight || 'left';
        if (rootNode && leftNode && rightNode && targetNode) {
            const duration = getSlideDuration(slide);
            let activeLevel = 0;
            if (isPlaying && duration > 0) {
                const ratio = animTime / duration;
                if (ratio < 0.35) activeLevel = 0;
                else if (ratio < 0.7) activeLevel = 1;
                else activeLevel = 2;
            } else {
                activeLevel = 2;
            }
            rootNode.className = `tree-node root-node ${activeLevel >= 0 ? 'highlighted' : 'dimmed'}`;
            leftNode.className = `tree-node left-node ${activeLevel >= 1 && highlight === 'left' ? 'highlighted' : 'dimmed'}`;
            rightNode.className = `tree-node right-node ${activeLevel >= 1 && highlight === 'right' ? 'highlighted' : 'dimmed'}`;
            targetNode.className = `tree-node target-node ${activeLevel >= 2 ? 'success' : 'dimmed'}`;
            if (svg) {
                const isLeft = (highlight === 'left');
                const leftColor = (activeLevel >= 1 && isLeft) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.15)';
                const leftStrokeWidth = (activeLevel >= 1 && isLeft) ? '4' : '2';
                const leftDash = (activeLevel >= 1 && isLeft) ? '8 4' : 'none';
                const rightColor = (activeLevel >= 1 && !isLeft) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.15)';
                const rightStrokeWidth = (activeLevel >= 1 && !isLeft) ? '4' : '2';
                const rightDash = (activeLevel >= 1 && !isLeft) ? '8 4' : 'none';
                const targetColor = (activeLevel >= 2) ? 'var(--success-green)' : 'rgba(255,255,255,0.15)';
                const targetStrokeWidth = (activeLevel >= 2) ? '4' : '2';
                const targetDash = (activeLevel >= 2) ? '8 4' : 'none';
                svg.innerHTML = `
                        <line class="tree-line-draw" x1="50%" y1="12%" x2="28%" y2="38%" stroke="${leftColor}" stroke-width="${leftStrokeWidth}" stroke-dasharray="${leftDash}" />
                        <line class="tree-line-draw" x1="50%" y1="12%" x2="72%" y2="38%" stroke="${rightColor}" stroke-width="${rightStrokeWidth}" stroke-dasharray="${rightDash}" />
                        <line class="tree-line-draw" x1="28%" y1="52%" x2="28%" y2="74%" stroke="${targetColor}" stroke-width="${targetStrokeWidth}" stroke-dasharray="${targetDash}" />
                    `;
            }
        }
    } else if (slide.layout === 'table') {
        const isSqlBypass = (slide.id === 'slide_sql_5b' || (slide.tableRows && slide.tableRows.includes("Bypass")));
        if (isSqlBypass) {
            const duration = getSlideDuration(slide);
            const nodeEmail = root.querySelector('#flow-node-email');
            const nodeOrCircle = root.querySelector('#flow-node-or');
            const nodeTrue = root.querySelector('#flow-node-true');
            const nodeWhere = root.querySelector('#flow-node-where');
            const nodeAdmin = root.querySelector('#flow-node-admin');
            const exprEmail = root.querySelector('.code-expr-email');
            const exprOr = root.querySelector('.code-expr-or');
            const exprTrue = root.querySelector('.code-expr-true');
            const exprAnd = root.querySelector('.code-expr-and');
            const exprPass = root.querySelector('.code-expr-pass');
            const pathEmailOr = root.querySelector('#path-email-or');
            const pathTrueOr = root.querySelector('#path-true-or');
            const pathOrResult = root.querySelector('#path-or-result');
            const pathResultAdmin = root.querySelector('#path-result-admin');
            const setStage = (stageNum) => {
                [nodeEmail, nodeOrCircle, nodeTrue, nodeWhere, nodeAdmin].forEach(el => {
                    if (el) {
                        el.classList.add('dimmed');
                        el.classList.remove('active');
                    }
                });
                [exprEmail, exprOr, exprTrue, exprAnd, exprPass].forEach(el => {
                    if (el) el.classList.remove('highlight-bad', 'highlight-good', 'highlight-gold');
                });
                [pathEmailOr, pathTrueOr, pathOrResult, pathResultAdmin].forEach(p => {
                    if (p) {
                        p.setAttribute('stroke', 'rgba(255,255,255,0.08)');
                        p.setAttribute('stroke-width', '2');
                        p.classList.remove('active');
                    }
                });
                if (stageNum >= 1) {
                    if (nodeEmail) {
                        nodeEmail.classList.remove('dimmed');
                        nodeEmail.classList.add('active');
                    }
                    if (exprEmail) exprEmail.classList.add('highlight-bad');
                    if (pathEmailOr) {
                        pathEmailOr.setAttribute('stroke', '#ef4444');
                        pathEmailOr.setAttribute('stroke-width', '4');
                        pathEmailOr.classList.add('active');
                    }
                }
                if (stageNum >= 2) {
                    if (nodeTrue) {
                        nodeTrue.classList.remove('dimmed');
                        nodeTrue.classList.add('active');
                    }
                    if (exprTrue) exprTrue.classList.add('highlight-good');
                    if (pathTrueOr) {
                        pathTrueOr.setAttribute('stroke', '#10b981');
                        pathTrueOr.setAttribute('stroke-width', '4');
                        pathTrueOr.classList.add('active');
                    }
                }
                if (stageNum >= 3) {
                    if (nodeOrCircle) nodeOrCircle.classList.add('active');
                    if (nodeWhere) {
                        nodeWhere.classList.remove('dimmed');
                        nodeWhere.classList.add('active');
                    }
                    if (exprOr) exprOr.classList.add('highlight-gold');
                    if (exprAnd) exprAnd.classList.add('highlight-bad');
                    if (exprPass) exprPass.classList.add('highlight-bad');
                    if (pathOrResult) {
                        pathOrResult.setAttribute('stroke', 'var(--gold-primary)');
                        pathOrResult.setAttribute('stroke-width', '4');
                        pathOrResult.classList.add('active');
                    }
                }
                if (stageNum >= 4) {
                    if (nodeAdmin) {
                        nodeAdmin.classList.remove('dimmed');
                        nodeAdmin.classList.add('active');
                    }
                    if (pathResultAdmin) {
                        pathResultAdmin.setAttribute('stroke', 'var(--gold-primary)');
                        pathResultAdmin.setAttribute('stroke-width', '4');
                        pathResultAdmin.classList.add('active');
                    }
                }
            };
            const minStage = slide.flowMinStage !== undefined ? slide.flowMinStage : 0;
            const maxStage = slide.flowMaxStage !== undefined ? slide.flowMaxStage : 4;
            if (isPlaying && duration > 0) {
                const ratio = animTime / duration;
                const numSteps = maxStage - minStage;
                let targetStage = minStage;
                if (numSteps > 0) {
                    targetStage = minStage + Math.min(numSteps, Math.floor(ratio * (numSteps + 1)));
                }
                setStage(targetStage);
            } else {
                setStage(maxStage);
            }
            updateSQLFlowPaths();
        } else {
            const h2 = root.querySelector('.table-header h2');
            if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
            const p = root.querySelector('.table-header p');
            if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
            const rows = (slide.tableRows || '').split('\n').map(line => line.split('|').map(x => x.trim())).filter(r => r.length > 0 && r[0] !== '');
            const tableRowsDOM = root.querySelectorAll('.studio-data-table tbody tr');
            if (tableRowsDOM.length === rows.length) {
                const duration = getSlideDuration(slide);
                const scanPhaseDuration = duration * 0.75;
                let activeRowIdx = -1;
                if (isPlaying && duration > 0) {
                    const ratio = animTime / duration;
                    if (ratio < 0.75) {
                        const numScanRows = rows.length - 1;
                        activeRowIdx = Math.min(numScanRows - 1, Math.floor((ratio / 0.75) * numScanRows));
                    } else {
                        activeRowIdx = rows.length - 1;
                    }
                } else {
                    activeRowIdx = parseInt(slide.tableHighlight, 10) - 1;
                    if (isNaN(activeRowIdx)) activeRowIdx = -1;
                }
                tableRowsDOM.forEach((tr, idx) => {
                    if (idx === activeRowIdx) {
                        if (idx === rows.length - 1) {
                            tr.className = 'highlight-success scanning-active';
                        } else {
                            tr.className = 'highlight-danger scanning-active';
                        }
                    } else if (idx < activeRowIdx) {
                        if (idx === rows.length - 1) {
                            tr.className = 'highlight-success';
                        } else {
                            tr.className = 'scanned-failed';
                        }
                    } else {
                        tr.className = 'table-row-item';
                    }
                    const firstTd = tr.querySelector('td');
                    if (firstTd) {
                        const originalRow = rows[idx];
                        const originalFirstCell = originalRow[0] || '';
                        if (originalFirstCell.includes('...')) {
                            if (isPlaying && duration > 0) {
                                if (idx === activeRowIdx) {
                                    const totalScanRows = rows.length - 1;
                                    const rowScanDuration = scanPhaseDuration / totalScanRows;
                                    const rowStartTime = idx * rowScanDuration;
                                    const rowElapsedTime = animTime - rowStartTime;
                                    const rowProgress = Math.max(0, Math.min(1, rowElapsedTime / rowScanDuration));
                                    const prevNum = idx > 0 ? parseInt(rows[idx - 1][0].replace(/[\.,]/g, ''), 10) : 0;
                                    const nextNum = idx + 1 < rows.length ? parseInt(rows[idx + 1][0].replace(/[\.,]/g, ''), 10) : 1000000;
                                    const count = Math.floor(prevNum + rowProgress * (nextNum - prevNum));
                                    firstTd.textContent = count.toLocaleString('vi-VN');
                                    const secondTd = tr.querySelectorAll('td')[1];
                                    if (secondTd) {
                                        secondTd.innerHTML = `<span style="color: var(--text-muted);">Äang duyá»‡t hÃ ng triá»‡u dÃ²ng...</span>`;
                                    }
                                    const thirdTd = tr.querySelectorAll('td')[2];
                                    if (thirdTd) {
                                        thirdTd.innerHTML = `<span style="color: var(--gold-primary); font-weight: bold; animation: pulseIcon 0.8s infinite;">Äang tÃ¬m...</span>`;
                                    }
                                } else if (idx < activeRowIdx) {
                                    const nextNum = idx + 1 < rows.length ? parseInt(rows[idx + 1][0].replace(/[\.,]/g, ''), 10) : 1000000;
                                    firstTd.textContent = (nextNum - 1).toLocaleString('vi-VN');
                                    const secondTd = tr.querySelectorAll('td')[1];
                                    if (secondTd) secondTd.textContent = 'Bá» qua';
                                    const thirdTd = tr.querySelectorAll('td')[2];
                                    if (thirdTd) thirdTd.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">Sai - Bá» qua</span>`;
                                } else {
                                    firstTd.textContent = '...';
                                    const secondTd = tr.querySelectorAll('td')[1];
                                    if (secondTd) secondTd.textContent = '...';
                                    const thirdTd = tr.querySelectorAll('td')[2];
                                    if (thirdTd) thirdTd.textContent = '...';
                                }
                            } else {
                                firstTd.textContent = originalFirstCell;
                                const secondTd = tr.querySelectorAll('td')[1];
                                if (secondTd) secondTd.textContent = originalRow[1] || '';
                                const thirdTd = tr.querySelectorAll('td')[2];
                                if (thirdTd) {
                                    const cell = originalRow[2] || '';
                                    const cellLower = cell.toLowerCase();
                                    if (cellLower.includes('sai') || cellLower.includes('bá» qua')) {
                                        thirdTd.innerHTML = `<span style="color: var(--warning-red); font-weight: bold;">${cell}</span>`;
                                    } else if (cellLower.includes('Ä‘Ãºng') || cellLower.includes('tÃ¬m tháº¥y')) {
                                        thirdTd.innerHTML = `<span style="color: var(--success-green); font-weight: bold;">${cell}</span>`;
                                    } else {
                                        thirdTd.textContent = cell;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    } else if (slide.layout === 'alert') {
        const h2 = root.querySelector('.alert-card-container h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.alert-card-container p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
    } else if (slide.layout === 'boxes') {
        const h2 = root.querySelector('.boxes-header h2');
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.boxes-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
    } else if (slide.layout === 'search') {
        const h2 = root.querySelector('.boxes-header h2'); // reuse
        if (h2) h2.innerHTML = formatTitleHTML(slide.title || '');
        const p = root.querySelector('.boxes-header p');
        if (p) p.innerHTML = formatSubtitleHTML(slide.subtitle || '');
    } else if (slide.layout === 'hook') {
        const h1 = root.querySelector('.hook-title-box h1');
        if (h1) h1.innerHTML = (slide.hookTitle || '').replace(/\n/g, '<br>');
        const p = root.querySelector('.hook-lead-text');
        if (p) p.innerHTML = (slide.hookSubtitle || '').replace(/\n/g, '<br>');
        const badge = root.querySelector('.hook-badge-capsule');
        if (badge) {
            const iconName = slide.hookIcon || 'flame';
            badge.innerHTML = `<i data-lucide="${iconName}"></i> ${slide.hookTag || 'HOOK'}`;
            lucide.createIcons({ node: badge });
        }
    } else if (slide.layout === 'transition') {
        const h1 = root.querySelector('.transition-title-box h1');
        if (h1) h1.innerHTML = (slide.transitionTitle || '').replace(/\n/g, '<br>');
    } else if (slide.layout === 'spotify') {
        const viewMode = slide.spotifyViewMode || 'playlist';
        const duration = getSlideDuration(slide);
        const ratio = isPlaying && duration > 0 ? Math.min(1, animTime / duration) : 0;
        const elapsedSeconds = isPlaying ? Math.floor(animTime) : 0;
        const formatTime = (sec) => {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };
        if (viewMode === 'playlist') {
            const timeLabel = root.querySelector('.bottom-progress-time');
            if (timeLabel) timeLabel.textContent = formatTime(elapsedSeconds);
            const fillBar = root.querySelector('.progress-bar-fill');
            if (fillBar) fillBar.style.width = `${ratio * 100}%`;
            const playCircle = root.querySelector('.bottom-play-circle i');
            if (playCircle) {
                const iconName = isPlaying ? 'pause' : 'play';
                if (playCircle.getAttribute('data-lucide') !== iconName) {
                    playCircle.setAttribute('data-lucide', iconName);
                    lucide.createIcons();
                }
            }
        } else {
            const timeLabel = root.querySelector('.player-elapsed-time');
            if (timeLabel) timeLabel.textContent = formatTime(elapsedSeconds);
            const fillBar = root.querySelector('.player-progress-bar-fill');
            if (fillBar) fillBar.style.width = `${ratio * 100}%`;
            const handle = root.querySelector('.player-progress-handle');
            if (handle) handle.style.left = `${ratio * 100}%`;
            const playBtn = root.querySelector('.player-main-play-btn i');
            if (playBtn) {
                const iconName = isPlaying ? 'pause' : 'play';
                if (playBtn.getAttribute('data-lucide') !== iconName) {
                    playBtn.setAttribute('data-lucide', iconName);
                    lucide.createIcons();
                }
            }
            const vinyl = root.querySelector('.spinner-vinyl');
            if (vinyl) {
                if (isPlaying) {
                    vinyl.style.animationPlayState = 'running';
                } else {
                    vinyl.style.animationPlayState = 'paused';
                }
            }
        }
    }
    // --- Dynamic Class Animations (Extremely fast, no DOM rebuilds) ---
    if (slide.layout === 'diagram') {
        const steps = slide.diagram || [];
        const duration = getSlideDuration(slide);
        let activeStepIndex = -1;
        if (isPlaying && duration > 0) {
            const introDelay = 1.2; // 1.2s intro delay before steps start highlighting
            if (animTime > introDelay) {
                const remainingTime = duration - introDelay;
                const stepDuration = remainingTime / Math.max(1, steps.length);
                activeStepIndex = Math.min(steps.length - 1, Math.floor((animTime - introDelay) / stepDuration));
            } else {
                activeStepIndex = -1;
            }
        } else if (!isPlaying) {
            activeStepIndex = steps.length;
        }
        const boxes = root.querySelectorAll('.diagram-node-box');
        boxes.forEach((box, idx) => {
            if (idx <= activeStepIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
            if (idx === activeStepIndex) {
                box.classList.add('current-step');
            } else {
                box.classList.remove('current-step');
            }
        });
        const arrows = root.querySelectorAll('.diagram-arrow');
        arrows.forEach((arrow, idx) => {
            if (idx < activeStepIndex) {
                arrow.classList.add('active');
            } else {
                arrow.classList.remove('active');
            }
            if (idx === activeStepIndex - 1) {
                arrow.classList.add('glow-arrow');
            } else {
                arrow.classList.remove('glow-arrow');
            }
        });
    } else if (slide.layout === 'cards') {
        const cards = slide.cards || [];
        const duration = getSlideDuration(slide);
        let visibleCount = cards.length;
        if (isPlaying && duration > 0) {
            const introDelay = 1.5; // 1.5s intro delay for cards to align with speaker hook
            if (animTime > introDelay) {
                const remainingTime = duration - introDelay;
                const cardGapTime = remainingTime / Math.max(1, cards.length);
                visibleCount = Math.min(cards.length, Math.floor((animTime - introDelay) / cardGapTime) + 1);
            } else {
                visibleCount = 0;
            }
        } else if (!isPlaying) {
            visibleCount = cards.length;
        }
        const boxes = root.querySelectorAll('.studio-card-box');
        boxes.forEach((box, idx) => {
            if (idx < visibleCount) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
            if (idx === visibleCount - 1) {
                box.classList.add('current-card');
            } else {
                box.classList.remove('current-card');
            }
        });
    } else if (slide.layout === 'split') {
        const leftCol = root.querySelector('.left-column');
        const rightCol = root.querySelector('.right-column');
        const duration = getSlideDuration(slide);
        let showLeft = true;
        let showRight = true;
        if (isPlaying && duration > 0) {
            const introDelay = 1.2;
            const remainingTime = duration - introDelay;
            const stepDuration = remainingTime / 2;
            showLeft = (animTime > introDelay);
            showRight = (animTime > introDelay + stepDuration);
        } else if (!isPlaying) {
            showLeft = true;
            showRight = true;
        }
        if (slide.splitShowLeft === "always") showLeft = true;
        if (slide.splitShowLeft === "never") showLeft = false;
        if (slide.splitShowRight === "always") showRight = true;
        if (slide.splitShowRight === "never") showRight = false;
        if (leftCol) {
            if (showLeft) leftCol.classList.add('active');
            else leftCol.classList.remove('active');
        }
        if (rightCol) {
            if (showRight) rightCol.classList.add('active');
            else rightCol.classList.remove('active');
        }
        const vsBadge = root.querySelector('.split-vs-badge');
        if (vsBadge) {
            if (showRight) vsBadge.classList.add('active');
            else vsBadge.classList.remove('active');
        }
    } else if (slide.layout === 'metrics') {
        const rawLines = (slide.metrics || '').split('\n').filter(l => l.trim().length > 0);
        const duration = getSlideDuration(slide);
        const boxes = root.querySelectorAll('.metric-box');
        boxes.forEach((box, idx) => {
            const numSpan = box.querySelector('.metric-number');
            const fillLine = box.querySelector('.metric-progress-line-fill');
            const line = rawLines[idx] || '';
            const parts = line.split('|');
            const numStr = parts[0] ? parts[0].trim() : '0';
            const lblStr = parts[1] ? parts[1].trim() : '';
            const parsed = parseNumberAndSuffix(numStr);
            const itemColor = getMetricColor(numStr, lblStr);
            // Update coloring classes dynamically
            if (numSpan) {
                numSpan.classList.remove('alert-red', 'success-green');
                if (itemColor === 'danger') {
                    numSpan.classList.add('alert-red');
                } else if (itemColor === 'success') {
                    numSpan.classList.add('success-green');
                }
            }
            box.classList.remove('level-danger', 'level-success');
            if (itemColor === 'danger') {
                box.classList.add('level-danger');
            } else if (itemColor === 'success') {
                box.classList.add('level-success');
            }
            const scanPhaseDuration = slide.tableRows ? 3.5 : 0;
            const introDelay = slide.tableRows ? scanPhaseDuration : 1.2;
            const remainingTime = duration - introDelay;
            const gapTime = remainingTime / Math.max(1, rawLines.length);
            const itemStartTime = introDelay + idx * gapTime;
            const animDuration = Math.min(0.8, gapTime);
            if (isPlaying && duration > 0) {
                if (animTime >= itemStartTime) {
                    box.classList.add('active');
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0) scale(1)';
                    const prog = Math.min(1, (animTime - itemStartTime) / animDuration);
                    if (numSpan) {
                        if (parsed.isNumeric) {
                            const ease = prog * (2 - prog); // easeOutQuad
                            let currentVal;
                            if (parsed.isArrow) {
                                currentVal = parsed.startVal - (parsed.startVal - parsed.endVal) * ease;
                            } else {
                                currentVal = parsed.value * ease;
                            }
                            const isFloat = parsed.value % 1 !== 0;
                            if (isFloat) {
                                const decimalPlaces = (parsed.value.toString().split('.')[1] || '').length;
                                numSpan.textContent = currentVal.toFixed(Math.max(1, decimalPlaces)) + parsed.suffix;
                            } else {
                                numSpan.textContent = Math.floor(currentVal).toLocaleString('vi-VN') + parsed.suffix;
                            }
                        } else {
                            numSpan.textContent = numStr;
                        }
                    }
                    if (fillLine) {
                        let fillWidth;
                        if (parsed.isArrow) {
                            const ease = prog * (2 - prog);
                            const currentVal = parsed.startVal - (parsed.startVal - parsed.endVal) * ease;
                            fillWidth = Math.max(0, Math.min(100, currentVal));
                        } else {
                            fillWidth = prog * 100;
                        }
                        fillLine.style.width = `${fillWidth}%`;
                    }
                } else {
                    box.classList.remove('active');
                    if (slide.tableRows) {
                        box.style.opacity = '0';
                        box.style.transform = 'translateY(20px) scale(0.95)';
                    }
                    if (numSpan) {
                        if (parsed.isArrow) {
                            numSpan.textContent = parsed.startVal + parsed.suffix;
                        } else {
                            numSpan.textContent = parsed.isNumeric ? (parsed.suffix ? '0' + parsed.suffix : '0') : '';
                        }
                    }
                    if (fillLine) {
                        if (parsed.isArrow) {
                            fillLine.style.width = `${Math.max(0, Math.min(100, parsed.startVal))}%`;
                        } else {
                            fillLine.style.width = '0%';
                        }
                    }
                }
            } else {
                // Static editor preview
                box.classList.add('active');
                box.style.opacity = '1';
                box.style.transform = 'translateY(0) scale(1)';
                if (numSpan) {
                    numSpan.textContent = numStr;
                }
                if (fillLine) {
                    if (parsed.isArrow) {
                        fillLine.style.width = `${Math.max(0, Math.min(100, parsed.endVal))}%`;
                    } else {
                        fillLine.style.width = '100%';
                    }
                }
            }
        });
    }
    // --- Global follow CTA removed to prevent duplicate info ---
    let followCTA = root.querySelector('.follow-cta-container');
    if (followCTA) {
        followCTA.remove();
    }
    // --- Dynamic Code Phrase Highlights Update ---
    const phraseSpans = root.querySelectorAll('.code-phrase-highlight');
    if (phraseSpans.length > 0) {
        phraseSpans.forEach(span => {
            const start = parseFloat(span.getAttribute('data-start')) || 0;
            const end = parseFloat(span.getAttribute('data-end')) || 0;
            const className = span.getAttribute('data-class') || 'code-highlight-bad';
            const isActive = animTime >= start && animTime <= end;
            if (isActive) {
                span.classList.add(className);
            } else {
                span.classList.remove(className);
            }
        });
    }
    // --- Slide Exit Transition Handler ---
    const wrapper = root.firstElementChild;
    if (wrapper) {
        const duration = getSlideDuration(slide);
        if (isPlaying && duration > 0 && animTime >= duration - 0.5) {
            wrapper.classList.add('exiting');
        } else {
            wrapper.classList.remove('exiting');
        }
    }
}
// Generate TTS voice cloning audio
async function generateAudioForActiveSlide() {
    const slide = slides[currentSlideIndex];
    if (!slide) return;
    const btn = document.getElementById('generate-audio-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    
    const startTime = Date.now();
    let timerInterval = setInterval(() => {
        const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(elapsedSec / 60);
        const s = elapsedSec % 60;
        const timeStr = `${m}:${s.toString().padStart(2, '0')}`;
        btn.innerHTML = `<i class="export-spinner" style="width:22px; height:22px; border-width: 2px;"></i> Äang táº¡o giá»ng máº«u... [${timeStr}]`;
    }, 1000);

    // Initial text before first tick
    btn.innerHTML = `<i class="export-spinner" style="width:22px; height:22px; border-width: 2px;"></i> Äang táº¡o giá»ng máº«u... [0:00]`;

    try {
        const response = await fetch(`${API_BASE}/api/synthesize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slideId: slide.id,
                text: slide.script,
                refVoice: slide.refVoice,
                voice: slide.voice,
                script: currentScript
            })
        });
        const data = await response.json();
        if (data.success) {
            slide.audioPath = data.audioUrl;
            slide.duration = data.duration;
            // Reload
            renderActiveSlide();
            renderTimeline();
            await saveSlidesToServer();
            alert(`Táº¡o giá»ng nÃ³i thÃ nh cÃ´ng sau ${Math.floor((Date.now() - startTime) / 1000)} giÃ¢y!`);
        } else {
            alert('Lá»—i táº¡o giá»ng nÃ³i: ' + data.error);
        }
    } catch (e) {
        alert('YÃªu cáº§u tháº¥t báº¡i: ' + e.message);
    } finally {
        clearInterval(timerInterval);
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}
// Check if synthesis is already running on backend and resume progress polling if it is
async function checkActiveSynthesisProgress() {
    try {
        const response = await fetch(`${API_BASE}/api/synthesize-all/status?script=${currentScript}`);
        const statusData = await response.json();
        if (statusData.status === 'processing') {
            console.log('Detected active synthesis task running in backend, resuming poll...');
            resumeSynthesisPolling();
        } else if (synthesisPollInterval) {
            // Clean up if it finished while we were away
            clearInterval(synthesisPollInterval);
            synthesisPollInterval = null;
            const btn = document.getElementById('generate-all-audio-btn');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i data-lucide="mic"></i> Táº¡o giá»ng nÃ³i cho táº¥t cáº£ Slide';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        }
    } catch (err) {
        console.warn('Failed to check active synthesis status:', err);
    }
}
function resumeSynthesisPolling(startTime, originalText) {
    if (synthesisPollInterval) {
        clearInterval(synthesisPollInterval);
    }
    if (!startTime) {
        startTime = Date.now();
    }
    const btn = document.getElementById('generate-all-audio-btn');
    if (!btn) return;
    if (!originalText) {
        originalText = '<i data-lucide="mic"></i> Táº¡o giá»ng nÃ³i cho táº¥t cáº£ Slide';
    }
    btn.disabled = true;
    synthesisPollInterval = setInterval(async () => {
        try {
            const statusRes = await fetch(`${API_BASE}/api/synthesize-all/status?script=${currentScript}`);
            const statusData = await statusRes.json();
            const elapsedMs = Date.now() - startTime;
            const elapsedSec = Math.floor(elapsedMs / 1000);
            const m = Math.floor(elapsedSec / 60);
            const s = elapsedSec % 60;
            const timeStr = `${m}:${s.toString().padStart(2, '0')}`;
            if (statusData.status === 'processing') {
                btn.innerHTML = `<i class="export-spinner" style="width:22px; height:22px; border-width: 2px;"></i> Äang lá»“ng tiáº¿ng: ${statusData.current}/${statusData.total} (${statusData.progress}%) [${timeStr}]`;
            } else if (statusData.status === 'completed') {
                clearInterval(synthesisPollInterval);
                synthesisPollInterval = null;
                slides = statusData.slides;
                // Reload UI components
                renderSlideList();
                renderActiveSlide();
                renderTimeline();
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                alert(`Táº¡o giá»ng nÃ³i cho toÃ n bá»™ slide thÃ nh cÃ´ng sau ${timeStr}! CÃ¡c file Ä‘Ã£ Ä‘Æ°á»£c lÆ°u trong thÆ° má»¥c kichban/${currentScript}/mp3/`);
            } else if (statusData.status === 'failed') {
                clearInterval(synthesisPollInterval);
                synthesisPollInterval = null;
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                alert(`Lá»—i táº¡o giá»ng nÃ³i cho táº¥t cáº£ slide sau ${timeStr}: ` + statusData.error);
            } else if (statusData.status === 'idle') {
                clearInterval(synthesisPollInterval);
                synthesisPollInterval = null;
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        } catch (pollErr) {
            console.error('Error polling synthesis status:', pollErr);
        }
    }, 800);
}
// Generate TTS voice cloning audio for all slides
async function generateAudioForAllSlides() {
    if (slides.length === 0) return;
    const btn = document.getElementById('generate-all-audio-btn');
    const originalText = btn ? btn.innerHTML : '<i data-lucide="mic"></i> Táº¡o giá»ng nÃ³i cho táº¥t cáº£ Slide';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="export-spinner" style="width:22px; height:22px; border-width: 2px;"></i> Äang khá»Ÿi táº¡o...';
    }
    const startTime = Date.now();
    try {
        const response = await fetch(`${API_BASE}/api/synthesize-all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                script: currentScript,
                voice: slides[currentSlideIndex].voice,
                refVoice: slides[currentSlideIndex].refVoice
            })
        });
        const startData = await response.json();
        if (!startData.success) {
            alert('Lá»—i khá»Ÿi táº¡o thuyáº¿t minh: ' + startData.error);
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
            return;
        }
        // Start polling progress
        resumeSynthesisPolling(startTime, originalText);
    } catch (e) {
        alert('YÃªu cáº§u tháº¥t báº¡i: ' + e.message);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }
}
// Voice Recording Handlers
async function toggleVoiceRecording() {
    const btn = document.getElementById('record-btn');
    const status = document.getElementById('record-status');
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        clearTimeout(recordTimer);
        btn.innerHTML = '<i data-lucide="mic"></i> Ghi Ã¢m (5s)';
        lucide.createIcons();
        return;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(blob);
            const preview = document.getElementById('voice-record-preview');
            preview.src = audioUrl;
            preview.style.display = 'block';
            document.getElementById('voice-upload-row').style.display = 'flex';
            status.textContent = "ÄÃ£ thu Ã¢m xong. Nháº­p tÃªn vÃ  Táº£i lÃªn!";
            // Stop media stream tracks
            stream.getTracks().forEach(track => track.stop());
        };
        mediaRecorder.start();
        btn.innerHTML = '<i data-lucide="square"></i> Dá»«ng ngay';
        lucide.createIcons();
        status.textContent = "Äang thu Ã¢m...";
        // Auto stop after 6 seconds
        recordTimer = setTimeout(() => {
            if (mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i data-lucide="mic"></i> Ghi Ã¢m (5s)';
                lucide.createIcons();
            }
        }, 6000);
    } catch (err) {
        alert("KhÃ´ng thá»ƒ truy cáº­p Microphone: " + err.message);
    }
}
// Upload WAV sample
async function uploadRecordedVoice() {
    if (recordedChunks.length === 0) return;
    const nameInput = document.getElementById('voice-name-input');
    let name = nameInput.value.trim();
    if (!name) {
        alert('Vui lÃ²ng Ä‘iá»n tÃªn giá»ng clone!');
        return;
    }
    if (!name.endsWith('.wav')) name += '.wav';
    const blob = new Blob(recordedChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', blob, name);
    const uploadBtn = document.getElementById('upload-voice-btn');
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Äang táº£i...';
    try {
        const response = await fetch(`${API_BASE}/api/upload-voice`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            alert('Táº£i lÃªn giá»ng máº«u thÃ nh cÃ´ng!');
            document.getElementById('voice-upload-row').style.display = 'none';
            document.getElementById('voice-record-preview').style.display = 'none';
            document.getElementById('record-status').textContent = 'ChÆ°a ghi Ã¢m';
            nameInput.value = '';
            await fetchVoices();
        } else {
            alert('Táº£i lÃªn tháº¥t báº¡i: ' + data.error);
        }
    } catch (e) {
        alert('Lá»—i káº¿t ná»‘i: ' + e.message);
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i data-lucide="upload"></i> Táº£i lÃªn';
        lucide.createIcons();
    }
}
// Timeline Progress Builder
function renderTimeline() {
    const container = document.getElementById('timeline-progress-bar');
    container.innerHTML = '';
    let totalDur = 0;
    slides.forEach(s => totalDur += getSlideDuration(s));
    slides.forEach((slide, idx) => {
        const seg = document.createElement('div');
        seg.className = `timeline-segment ${idx === currentSlideIndex ? 'active-segment' : ''}`;
        // Flex proportion
        const pct = (getSlideDuration(slide) / totalDur) * 100;
        seg.style.flex = pct;
        const fill = document.createElement('div');
        fill.className = 'timeline-segment-fill';
        fill.id = `segment-fill-${idx}`;
        // If slide is completed in timeline progression
        if (idx < currentSlideIndex) {
            fill.style.width = '100%';
        } else if (idx > currentSlideIndex) {
            fill.style.width = '0%';
        } else if (isPlaying) {
            // Active slide progress managed dynamically by playback timer
        }
        seg.appendChild(fill);
        seg.addEventListener('click', (e) => {
            e.stopPropagation();
            selectSlide(idx);
        });
        container.appendChild(seg);
    });
    updateTimelineTimeDisplay();
}
function updateTimelineTimeDisplay() {
    let totalDur = 0;
    slides.forEach(s => totalDur += getSlideDuration(s));
    let currentElapsed = 0;
    for (let i = 0; i < currentSlideIndex; i++) {
        currentElapsed += getSlideDuration(slides[i]);
    }
    currentElapsed += currentSlideProgress;
    const fmt = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    document.getElementById('timeline-time-display').textContent = `${fmt(currentElapsed)} / ${fmt(totalDur)}`;
}
// Playback Player Loop
function togglePlayback() {
    const playBtn = document.getElementById('play-btn');
    if (isPlaying) {
        stopPlayback();
    } else {
        startPlayback();
    }
}
function startPlayback() {
    if (slides.length === 0) return;
    isPlaying = true;
    document.getElementById('play-btn').className = 'btn btn-secondary btn-large';
    document.getElementById('play-btn').innerHTML = '<i data-lucide="pause" id="play-icon"></i> Táº¡m dá»«ng';
    const fsPlayBtn = document.getElementById('fs-play-btn');
    if (fsPlayBtn) {
        fsPlayBtn.innerHTML = '<i data-lucide="pause"></i>';
    }
    lucide.createIcons();
    // Start Audio
    playSlideAudio(currentSlideIndex);
}
function stopPlayback() {
    isPlaying = false;
    document.getElementById('play-btn').className = 'btn btn-gold btn-large';
    document.getElementById('play-btn').innerHTML = '<i data-lucide="play" id="play-icon"></i> Cháº¡y thá»­ Video';
    const fsPlayBtn = document.getElementById('fs-play-btn');
    if (fsPlayBtn) {
        fsPlayBtn.innerHTML = '<i data-lucide="play"></i>';
    }
    lucide.createIcons();
    // Stop audio
    if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
    }
    if (playbackTimer) {
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
    if (silentTimeout) {
        clearTimeout(silentTimeout);
        silentTimeout = null;
    }
    currentSlideProgress = 0;
    renderTimeline();
    renderCanvasPreview(slides[currentSlideIndex], 0);
}
function playSlideAudio(slideIdx) {
    if (slideIdx >= slides.length) {
        stopPlayback();
        selectSlide(0);
        return;
    }
    currentSlideIndex = slideIdx;
    renderSlideList();
    renderTimeline();
    const slide = slides[slideIdx];
    renderCanvasPreview(slide, 0, true); // Force rebuild to trigger entrance animations on every slide start!
    currentSlideProgress = 0;
    currentSlideStartTime = Date.now();
    const slideDuration = getSlideDuration(slide);
    initAudioPlayer();
    if (playbackTimer) {
        clearInterval(playbackTimer);
    }
    // Set timeline segment widths appropriately on start
    for (let i = 0; i < slides.length; i++) {
        const fill = document.getElementById(`segment-fill-${i}`);
        if (fill) {
            if (i < slideIdx) fill.style.width = '100%';
            else if (i > slideIdx) fill.style.width = '0%';
        }
    }
    let audioPlayedSuccessfully = false;
    let audioFailed = false;
    // Check if generated audio exists
    if (slide.audioPath) {
        currentAudioElement.src = slide.audioPath + "?t=" + new Date().getTime();
        currentAudioElement.load();
        currentAudioElement.play().then(() => {
            audioPlayedSuccessfully = true;
        }).catch(e => {
            console.warn("Audio play failed, playing silently:", e);
            audioFailed = true;
        });
        currentAudioElement.onended = () => {
            if (isPlaying && currentSlideIndex === slideIdx) {
                if (playbackTimer) clearInterval(playbackTimer);
                // Add a 0.3s slide pause beat
                silentTimeout = setTimeout(() => {
                    playSlideNext();
                }, 300);
            }
        };
        currentAudioElement.onerror = () => {
            console.warn("Audio error, playing silently");
            audioFailed = true;
        };
    }
    playbackTimer = setInterval(() => {
        if (!isPlaying) {
            clearInterval(playbackTimer);
            return;
        }
        let elapsed = 0;
        // If audio is playing, not ended, and has no error/failure, use currentTime
        if (slide.audioPath && currentAudioElement && !currentAudioElement.paused && !currentAudioElement.ended && !audioFailed && !currentAudioElement.error) {
            elapsed = currentAudioElement.currentTime;
        } else {
            // Otherwise increment progression manually (e.g. silent slides or failed audio)
            currentSlideProgress += 0.05;
            elapsed = currentSlideProgress;
        }
        elapsed = Math.min(slideDuration, elapsed);
        currentSlideProgress = elapsed;
        // Update active segment fill width in timeline
        const fill = document.getElementById(`segment-fill-${slideIdx}`);
        if (fill) {
            fill.style.width = `${(elapsed / slideDuration) * 100}%`;
        }
        // Render current animation frame on canvas (forceRebuild = false to keep transitions smooth!)
        renderCanvasPreview(slide, elapsed, false);
        // Update timeline time display
        updateTimelineTimeDisplay();
        // Trigger next slide if it's a silent slide (or audio failed to play) and duration is reached
        const isSilentOrFailed = !slide.audioPath || audioFailed || (currentAudioElement && (currentAudioElement.paused || currentAudioElement.error) && !audioPlayedSuccessfully);
        if (isSilentOrFailed && elapsed >= slideDuration) {
            clearInterval(playbackTimer);
            playSlideNext();
        }
    }, 50);
}
function playSlideNext() {
    if (currentSlideIndex + 1 < slides.length) {
        playSlideAudio(currentSlideIndex + 1);
    } else {
        stopPlayback();
        selectSlide(0);
    }
}
function playPreviousSlide() {
    if (currentSlideIndex > 0) {
        selectSlide(currentSlideIndex - 1);
        if (isPlaying) startPlayback();
    }
}
function playNextSlide() {
    if (currentSlideIndex + 1 < slides.length) {
        selectSlide(currentSlideIndex + 1);
        if (isPlaying) startPlayback();
    }
}
// Animate visualizer bars
let visualizerBars = null;
let prevHeights = [];
function animateVisualizer() {
    requestAnimationFrame(animateVisualizer);
    if (!visualizerBars || visualizerBars.length === 0) {
        visualizerBars = document.querySelectorAll('.visualizer-bar');
        prevHeights = [];
    }
    const bars = visualizerBars;
    if (!bars.length) return;
    if (prevHeights.length !== bars.length) {
        prevHeights = Array(bars.length).fill(8);
    }
    const targets = Array(bars.length).fill(8);
    if (isPlaying && audioAnalyser) {
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteFrequencyData(dataArray);
        bars.forEach((bar, idx) => {
            const lowFreqStart = Math.floor(bufferLength * 0.02);
            const freqRange = Math.floor(bufferLength * 0.45);
            let dataIdx = 0;
            let boost = 1.0;
            if (currentWaveStyle === 'bell') {
                // Bell curve: Tallest in the center, tapering down to the edges
                const mid = (bars.length - 1) / 2;
                const dist = Math.abs(idx - mid);
                const normDist = dist / mid; // 0 at center, 1 at edges
                dataIdx = lowFreqStart + Math.floor(normDist * freqRange);
                boost = 1.0 + normDist * 1.5;
            } else if (currentWaveStyle === 'split') {
                // Double mounds: Peaks at 1/4 and 3/4 points, dips in the middle and sides
                const mid = (bars.length - 1) / 2;
                const doubleMoundDist = Math.abs((idx % (bars.length / 2)) - (bars.length / 4));
                const normDoubleMound = doubleMoundDist / (bars.length / 4); // 0 at peaks, 1 at dips
                dataIdx = lowFreqStart + Math.floor(normDoubleMound * freqRange);
                boost = 1.0 + normDoubleMound * 1.5;
            } else if (currentWaveStyle === 'classic') {
                // Classic frequency spectrum: rising from left to right
                const progress = idx / bars.length;
                dataIdx = lowFreqStart + Math.floor(progress * freqRange);
                boost = 1.0 + progress * 2.0;
            } else if (currentWaveStyle === 'heartbeat') {
                // Rolling wave propagation from right to left
                const phase = (Date.now() / 250) + (idx * 0.15);
                const factor = (Math.sin(phase) + 1) / 2; // 0 to 1
                dataIdx = lowFreqStart + Math.floor(factor * freqRange);
                boost = 1.0 + factor * 1.2;
            } else {
                // Scrambled Equalizer columns
                const orderIdx = ((idx * 7) % bars.length) / bars.length;
                dataIdx = lowFreqStart + Math.floor(orderIdx * freqRange);
                boost = 1.0 + orderIdx * 1.5;
            }
            const rawValue = dataArray[dataIdx] || 0;
            const value = Math.min(255, rawValue * boost);
            const pct = (value / 255) * 100;
            targets[idx] = Math.max(8, pct * 0.45);
        });
    } else if (isPlaying) {
        // Simulated dancing heights (slower rate simulation with sine modulation)
        const mid = (bars.length - 1) / 2;
        if (currentWaveStyle === 'bell') {
            const heights = [];
            for (let i = 0; i <= Math.ceil(mid); i++) {
                const normDist = i / mid;
                const maxH = (1 - normDist) * 25 + 18;
                const slowWave = Math.sin(Date.now() / 300 + i * 0.5) * 10;
                heights.push(Math.max(8, Math.random() * maxH + (maxH * 0.3) + slowWave));
            }
            bars.forEach((bar, idx) => {
                const dist = Math.abs(idx - mid);
                const heightIdx = Math.round(mid - dist);
                targets[idx] = heights[heightIdx] || 8;
            });
        } else if (currentWaveStyle === 'split') {
            const heights = [];
            const quarter = Math.floor(bars.length / 4);
            for (let i = 0; i <= quarter; i++) {
                const norm = i / quarter; // 0 at peak, 1 at edge
                const maxH = (1 - norm) * 25 + 15;
                const slowWave = Math.sin(Date.now() / 300 + i * 0.5) * 8;
                heights.push(Math.max(8, Math.random() * maxH + (maxH * 0.3) + slowWave));
            }
            bars.forEach((bar, idx) => {
                const sectionIdx = idx % Math.floor(bars.length / 2);
                const dist = Math.abs(sectionIdx - quarter);
                targets[idx] = heights[dist] || 8;
            });
        } else if (currentWaveStyle === 'heartbeat') {
            bars.forEach((bar, idx) => {
                const phase = (Date.now() / 250) + (idx * 0.15);
                const factor = (Math.sin(phase) + 1) / 2;
                targets[idx] = factor * 25 + Math.random() * 8 + 8;
            });
        } else if (currentWaveStyle === 'classic') {
            bars.forEach((bar, idx) => {
                const progress = idx / bars.length;
                const baseH = (1 - progress) * 25 + 12;
                const slowWave = Math.sin(Date.now() / 400 + idx * 0.2) * 5;
                targets[idx] = Math.random() * baseH + 8 + slowWave;
            });
        } else {
            // Random Equalizer columns
            bars.forEach((bar, idx) => {
                const slowWave = Math.sin(Date.now() / 250 + idx * 0.5) * 12;
                targets[idx] = Math.max(8, Math.random() * 20 + 8 + slowWave);
            });
        }
    } else {
        // Idle state: draw a subtle shape curve depending on chosen style
        const mid = (bars.length - 1) / 2;
        bars.forEach((bar, idx) => {
            let h = 8;
            if (currentWaveStyle === 'bell') {
                const dist = Math.abs(idx - mid);
                const normDist = dist / mid;
                h = Math.max(6, (1 - normDist) * 8 + 6);
            } else if (currentWaveStyle === 'split') {
                const sectionIdx = idx % Math.floor(bars.length / 2);
                const quarter = Math.floor(bars.length / 4);
                const dist = Math.abs(sectionIdx - quarter);
                const norm = dist / quarter;
                h = Math.max(6, (1 - norm) * 8 + 6);
            } else if (currentWaveStyle === 'classic') {
                const progress = idx / bars.length;
                h = Math.max(6, (1 - progress) * 8 + 6);
            } else {
                h = 8;
            }
            targets[idx] = h;
        });
    }
    // Apply linear interpolation (lerp) for buttery smooth motion (prevents jumpy/jittery feel)
    bars.forEach((bar, idx) => {
        const currentH = prevHeights[idx] || 8;
        const targetH = targets[idx] || 8;
        const nextH = currentH + (targetH - currentH) * 0.18; // Easing coefficient (0.18)
        prevHeights[idx] = nextH;
        
        const dots = bar.querySelectorAll('.visualizer-dot');
        if (dots.length > 0) {
            // Map nextH (typically 8 to 50) to active dots (0 to 6)
            const activeCount = Math.min(6, Math.floor((nextH - 8) / 6.0));
            dots.forEach((dot, dotIdx) => {
                if (dotIdx < activeCount) {
                    let activeColor = 'var(--gold-primary)';
                    // Equalizer colors: green, orange, red
                    if (dotIdx >= 5) activeColor = '#ff4a4a'; // Red
                    else if (dotIdx >= 3) activeColor = '#f59e0b'; // Gold
                    else activeColor = '#10b981'; // Green
                    
                    dot.style.backgroundColor = activeColor;
                    dot.style.opacity = '1';
                    dot.style.boxShadow = `0 0 6px ${activeColor}`;
                } else {
                    dot.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    dot.style.opacity = '0.35';
                    dot.style.boxShadow = 'none';
                }
            });
        } else {
            bar.style.height = `${nextH}px`;
        }
    });
}
let activeExportPollInterval = null;
async function checkActiveExportStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/export-status?script=${currentScript}`);
        const data = await response.json();
        
        const statusBox = document.getElementById('export-status-box');
        const progressFill = document.getElementById('export-progress');
        const progressText = document.getElementById('export-progress-text');
        
        if (data.status === 'processing') {
            // Background export is running! Show the UI progress dialog
            statusBox.classList.add('is-exporting-status');
            statusBox.style.display = 'flex';
            
            const statusHeader = statusBox.querySelector('h4');
            const statusDesc = statusBox.querySelector('p');
            if (statusHeader) statusHeader.textContent = 'Đang xuất video chất lượng cao...';
            if (statusDesc) statusDesc.textContent = 'Hệ thống đang render từng khung hình và ghép âm thanh trên máy chủ. Bạn có thể đóng tab hoặc chỉnh sửa thoải mái.';
            
            const pct = data.progress || 0;
            progressFill.style.width = `${pct}%`;
            progressText.textContent = data.message || `Đang chạy: ${pct}%`;
            
            // Start faster polling if not already active
            if (!activeExportPollInterval) {
                activeExportPollInterval = setInterval(checkActiveExportStatus, 1000);
            }
        } else {
            // Export is not running. If we were polling faster, clear it
            if (activeExportPollInterval) {
                clearInterval(activeExportPollInterval);
                activeExportPollInterval = null;
            }
            
            // Only auto-hide and alert if the box is currently displaying our background exporter
            const statusHeader = statusBox.querySelector('h4');
            if (statusBox.style.display === 'flex' && statusHeader && statusHeader.textContent === 'Đang xuất video chất lượng cao...') {
                if (data.status === 'completed') {
                    progressFill.style.width = '100%';
                    progressText.textContent = 'Hoàn thành 100%!';
                    setTimeout(() => {
                        statusBox.style.display = 'none';
                        statusBox.classList.remove('is-exporting-status');
                        // Restore defaults
                        statusHeader.textContent = 'Đang ghi hình video 9:16...';
                        const statusDesc = statusBox.querySelector('p');
                        if (statusDesc) statusDesc.textContent = 'Hệ thống đang chạy qua các slide và thu âm âm thanh thực tế. Vui lòng không đóng tab.';
                        
                        alert('Xuất video MP4 chất lượng cao thành công! (kichban/' + currentScript + '/mp4/video.mp4)');
                        window.open(`${API_BASE}/kichban/${currentScript}/mp4/video.mp4`, '_blank');
                    }, 500);
                } else if (data.status === 'failed') {
                    statusBox.style.display = 'none';
                    statusBox.classList.remove('is-exporting-status');
                    // Restore defaults
                    statusHeader.textContent = 'Đang ghi hình video 9:16...';
                    const statusDesc = statusBox.querySelector('p');
                    if (statusDesc) statusDesc.textContent = 'Hệ thống đang chạy qua các slide và thu âm âm thanh thực tế. Vui lòng không đóng tab.';
                    
                    alert('Lỗi xuất video: ' + (data.error || 'Lỗi không rõ nguồn gốc.'));
                }
            }
        }
    } catch (err) {
        console.error("Error checking background export status:", err);
    }
}

// Programmatic Headless Backend MP4 Export
async function startHeadlessMp4Export() {
    if (slides.length === 0) return;
    if (isPlaying) stopPlayback();
    const isMissingAudio = slides.some(s => !s.audioPath);
    if (isMissingAudio) {
        if (!confirm('Một số slide chưa được tạo giọng nói. Bản xuất video sẽ bị im lặng ở các slide này. Bạn có muốn tiếp tục?')) {
            return;
        }
    }
    
    const statusBox = document.getElementById('export-status-box');
    const progressFill = document.getElementById('export-progress');
    const progressText = document.getElementById('export-progress-text');
    const statusHeader = statusBox.querySelector('h4');
    const statusDesc = statusBox.querySelector('p');
    
    // Show progress overlay
    statusBox.classList.add('is-exporting-status');
    statusBox.style.display = 'flex';
    if (statusHeader) statusHeader.textContent = 'Đang xuất video chất lượng cao...';
    if (statusDesc) statusDesc.textContent = 'Hệ thống đang render từng khung hình và ghép âm thanh trên máy chủ. Bạn có thể đóng tab hoặc chỉnh sửa thoải mái.';
    progressFill.style.width = '0%';
    progressText.textContent = 'Đang chuẩn bị khởi động...';
    
    try {
        // Trigger server background task
        const response = await fetch(`${API_BASE}/api/export-video`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script: currentScript })
        });
        const data = await response.json();
        
        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Không thể bắt đầu xuất video.');
        }
        
        // Immediately trigger checkActiveExportStatus to handle polling
        checkActiveExportStatus();
        
    } catch (error) {
        statusBox.style.display = 'none';
        statusBox.classList.remove('is-exporting-status');
        if (statusHeader) statusHeader.textContent = 'Đang ghi hình video 9:16...';
        if (statusDesc) statusDesc.textContent = 'Hệ thống đang chạy qua các slide và thu âm âm thanh thực tế. Vui lòng không đóng tab.';
        alert('Lỗi khi kích hoạt tiến trình xuất video: ' + error.message);
    }
}

// Widescreen HTML5 Canvas + WebAudio Recording & Export
async function startVideoExport() {
    if (slides.length === 0) return;
    if (isPlaying) stopPlayback();
    const isMissingAudio = slides.some(s => !s.audioPath);
    if (isMissingAudio) {
        if (!confirm('Má»™t sá»‘ slide chÆ°a Ä‘Æ°á»£c táº¡o giá»ng nÃ³i. Báº£n xuáº¥t video sáº½ bá»‹ im láº·ng á»Ÿ cÃ¡c slide nÃ y. Báº¡n cÃ³ muá»‘n tiáº¿p tá»¥c?')) {
            return;
        }
    }
    const canvas = document.getElementById('tiktok-canvas');
    const statusBox = document.getElementById('export-status-box');
    const progressFill = document.getElementById('export-progress');
    const progressText = document.getElementById('export-progress-text');
    // Position fixed at (0,0) and scale 1 to prevent html2canvas centering/crop bug
    canvas.classList.add('is-exporting-canvas');
    statusBox.classList.add('is-exporting-status');
    statusBox.style.display = 'flex';
    isExporting = true;
    exportChunks = [];
    exportSlideIndex = 0;
    window._isCapturingFrame = false;
    let totalDuration = 0;
    slides.forEach(s => totalDuration += getSlideDuration(s));
    // Create hidden canvas to copy DOM element to
    const hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = 1080;
    hiddenCanvas.height = 1920;
    const hiddenCtx = hiddenCanvas.getContext('2d');
    // Setup Canvas stream from hidden canvas
    const canvasStream = hiddenCanvas.captureStream(30); // 30 FPS
    // Setup Audio Stream from AudioContext
    let dest = null;
    let exportAudioCtx = null;
    try {
        exportAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        dest = exportAudioCtx.createMediaStreamDestination();
    } catch (e) {
        console.error('Failed to create WebAudio stream recorder:', e);
    }
    // Combine Video & Audio Streams
    const tracks = [];
    canvasStream.getVideoTracks().forEach(t => tracks.push(t));
    if (dest) {
        dest.stream.getAudioTracks().forEach(t => tracks.push(t));
    }
    const combinedStream = new MediaStream(tracks);
    // Determine mimeType support - prefer MP4 if natively supported by client
    let options = { mimeType: 'video/mp4;codecs=h264,aac' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/mp4;codecs=h264' };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/mp4' };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp9,opus' };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp8,opus' };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
    }
    exportMediaRecorder = new MediaRecorder(combinedStream, options);
    exportMediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) exportChunks.push(e.data);
    };
    exportMediaRecorder.onstop = () => {
        const isMp4 = exportMediaRecorder.mimeType.includes('mp4');
        const mime = isMp4 ? 'video/mp4' : 'video/webm';
        const blob = new Blob(exportChunks, { type: mime });
        const url = URL.createObjectURL(blob);
        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `turnio_dev_tiktok_9_16_${Date.now()}.mp4`;
        a.click();
        // Update status box for server saving
        const statusHeader = statusBox.querySelector('h4');
        const statusText = statusBox.querySelector('p');
        const statusProgress = statusBox.querySelector('.progress-bar-container');
        if (statusHeader) statusHeader.textContent = 'Äang lÆ°u video lÃªn mÃ¡y chá»§...';
        if (statusText) statusText.textContent = `Há»‡ thá»‘ng Ä‘ang chuyá»ƒn Ä‘á»•i vÃ  lÆ°u video thÃ nh kichban/${currentScript}/mp4/video.mp4. Vui lÃ²ng Ä‘á»£i.`;
        if (statusProgress) statusProgress.style.display = 'none';
        if (progressText) progressText.style.display = 'none';
        const formData = new FormData();
        const exportFilename = isMp4 ? 'video.mp4' : 'video.webm';
        formData.append('file', blob, exportFilename);
        fetch(`${API_BASE}/api/save-video?script=${currentScript}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(`Xuáº¥t vÃ  lÆ°u video lÃªn mÃ¡y chá»§ thÃ nh cÃ´ng (kichban/${currentScript}/mp4/video.mp4)!`);
                } else {
                    alert('Xuáº¥t video thÃ nh cÃ´ng, nhÆ°ng khÃ´ng lÆ°u Ä‘Æ°á»£c lÃªn mÃ¡y chá»§: ' + data.error);
                }
            })
            .catch(err => {
                alert('Lá»—i káº¿t ná»‘i khi lÆ°u video lÃªn mÃ¡y chá»§: ' + err.message);
            })
            .finally(() => {
                // Restore layout scaling & UI state
                canvas.classList.remove('is-exporting-canvas');
                statusBox.classList.remove('is-exporting-status');
                statusBox.style.display = 'none';
                if (statusProgress) statusProgress.style.display = 'block';
                if (progressText) {
                    progressText.style.display = 'block';
                    progressText.textContent = 'Äang chuáº©n bá»‹...';
                }
                if (statusHeader) statusHeader.textContent = 'Äang ghi hÃ¬nh video 9:16...';
                if (statusText) statusText.textContent = 'Há»‡ thá»‘ng Ä‘ang cháº¡y qua cÃ¡c slide vÃ  thu Ã¢m Ã¢m thanh thá»±c táº¿. Vui lÃ²ng khÃ´ng Ä‘Ã³ng tab.';
                isExporting = false;
                adjustCanvasScale();
                if (exportAudioCtx) exportAudioCtx.close();
            });
    };
    exportMediaRecorder.start();
    // Progression runner
    runExportSlideLoop(exportAudioCtx, dest, totalDuration, progressFill, progressText, canvas, hiddenCtx);
}
function runExportSlideLoop(exportAudioCtx, dest, totalDuration, progressFill, progressText, captureDiv, hiddenCtx) {
    if (exportSlideIndex >= slides.length) {
        exportMediaRecorder.stop();
        return;
    }
    const slide = slides[exportSlideIndex];
    selectSlide(exportSlideIndex);
    const slideDuration = getSlideDuration(slide);
    let elapsed = 0;
    let audio = null;
    if (slide.audioPath && exportAudioCtx && dest) {
        audio = new Audio(slide.audioPath + "?t=" + new Date().getTime());
        const source = exportAudioCtx.createMediaElementSource(audio);
        source.connect(dest);
        source.connect(exportAudioCtx.destination);
        audio.play().catch(e => console.warn('Auto-play blocked inside exporter:', e));
    }
    const timer = setInterval(() => {
        if (audio) {
            elapsed = audio.currentTime;
        } else {
            elapsed += 0.05;
        }
        elapsed = Math.min(slideDuration, elapsed);
        // Update progress visualizer
        let priorDuration = 0;
        for (let i = 0; i < exportSlideIndex; i++) {
            priorDuration += getSlideDuration(slides[i]);
        }
        const totalElapsed = priorDuration + elapsed;
        const pct = (totalElapsed / totalDuration) * 100;
        progressFill.style.width = `${pct}%`;
        if (progressText) {
            const remaining = Math.max(0, Math.round(totalDuration - totalElapsed));
            const remMin = Math.floor(remaining / 60);
            const remSec = remaining % 60;
            const secStr = remSec < 10 ? '0' + remSec : remSec;
            progressText.textContent = `Äang ghi hÃ¬nh: ${Math.floor(pct)}% | Slide ${exportSlideIndex + 1}/${slides.length} (CÃ²n khoáº£ng ${remMin}:${secStr})`;
        }
        // Render animations frame
        renderCanvasPreview(slide, elapsed, false);
        // Screenshot the div and draw to hidden canvas
        if (typeof html2canvas !== 'undefined' && !window._isCapturingFrame) {
            window._isCapturingFrame = true;
            html2canvas(captureDiv, {
                width: 1080,
                height: 1920,
                scale: 1,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
                backgroundColor: '#050507',
                logging: false,
                useCORS: true
            }).then(tmpCanvas => {
                hiddenCtx.clearRect(0, 0, 1080, 1920);
                hiddenCtx.drawImage(tmpCanvas, 0, 0);
                window._isCapturingFrame = false;
            }).catch(err => {
                console.error("html2canvas capture error:", err);
                window._isCapturingFrame = false;
            });
        }
        // Check slide end
        const isEnd = audio ? audio.ended : (elapsed >= slideDuration);
        if (isEnd) {
            clearInterval(timer);
            exportSlideIndex++;
            runExportSlideLoop(exportAudioCtx, dest, totalDuration, progressFill, progressText, captureDiv, hiddenCtx);
        }
    }, 50);
}
// --- Undo / Redo State Management ---
function recordHistory() {
    const currentStateStr = JSON.stringify(slides);
    // Don't push if same as the top of undoStack
    if (undoStack.length > 0 && undoStack[undoStack.length - 1] === currentStateStr) {
        return;
    }
    undoStack.push(currentStateStr);
    if (undoStack.length > MAX_HISTORY) {
        undoStack.shift();
    }
    // Clear redoStack on new action
    redoStack = [];
    updateUndoRedoButtons();
}
async function undo() {
    if (undoStack.length <= 1) return;
    // Pop current state and push to redoStack
    const current = undoStack.pop();
    redoStack.push(current);
    // Restore previous state
    const previous = undoStack[undoStack.length - 1];
    slides = JSON.parse(previous);
    // Correct slide index if it is now out of bounds
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = Math.max(0, slides.length - 1);
    }
    await saveSlidesToServerSilent();
}
async function redo() {
    if (redoStack.length === 0) return;
    // Pop next state and push to undoStack
    const nextState = redoStack.pop();
    undoStack.push(nextState);
    // Restore state
    slides = JSON.parse(nextState);
    // Correct slide index if it is now out of bounds
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = Math.max(0, slides.length - 1);
    }
    await saveSlidesToServerSilent();
}
async function saveSlidesToServerSilent() {
    try {
        await fetch(`${API_BASE}/api/slides?script=${currentScript}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slides)
        });
        renderSlideList();
        renderActiveSlide();
        renderTimeline();
        updateUndoRedoButtons();
    } catch (err) {
        console.error('Failed to save slides silently:', err);
    }
}
function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    if (undoBtn) {
        undoBtn.disabled = undoStack.length <= 1;
    }
    if (redoBtn) {
        redoBtn.disabled = redoStack.length === 0;
    }
}
// Smooth number counting animation helper
function animateNumberCount(element, start, end, suffix, duration = 800) {
    const isFloat = end % 1 !== 0;
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutQuad
        const ease = progress * (2 - progress);
        const currentVal = start + (end - start) * ease;
        if (isFloat) {
            element.textContent = currentVal.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(currentVal) + suffix;
        }
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isFloat) {
                element.textContent = end.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(end) + suffix;
            }
        }
    }
    requestAnimationFrame(update);
}
function parseNumberAndSuffix(str) {
    const match = str.trim().match(/^([+-]?[0-9.]+)(.*)$/);
    if (match) {
        let numStr = match[1];
        const suffix = match[2] || '';
        // Strip thousands separator dot (e.g. 3.200 -> 3200 or 1.000.000 -> 1000000)
        if (numStr.includes('.') && !numStr.startsWith('0.')) {
            const parts = numStr.split('.');
            if (parts.length > 2 || parts[parts.length - 1].length === 3) {
                numStr = numStr.replace(/\./g, '');
            }
        }
        // Check for arrow transition like "100%  4%" or "95% -> 15%"
        const arrowMatch = suffix.match(/^\s*%\s*(?:|->)\s*([0-9.]+)\s*(%?)$/);
        if (arrowMatch) {
            const startVal = parseFloat(numStr);
            let endNumStr = arrowMatch[1];
            const endSuffix = arrowMatch[2] || '%';
            const endVal = parseFloat(endNumStr);
            return {
                value: endVal,
                suffix: endSuffix,
                isNumeric: true,
                isArrow: true,
                startVal: startVal,
                endVal: endVal
            };
        }
        // Generic arrow match for non-percentage values, e.g. "3.200ms  0.08ms"
        const parts = str.split(/\s*(?:|->)\s*/);
        if (parts.length === 2) {
            const p1 = parseNumberAndSuffix(parts[0]);
            const p2 = parseNumberAndSuffix(parts[1]);
            if (p1.isNumeric && p2.isNumeric) {
                return {
                    value: p2.value,
                    suffix: p2.suffix || p1.suffix,
                    isNumeric: true,
                    isArrow: true,
                    startVal: p1.value,
                    endVal: p2.value
                };
            }
        }
        const val = parseFloat(numStr);
        return { value: isNaN(val) ? 0 : val, suffix, isNumeric: !isNaN(val) };
    }
    return { value: 0, suffix: str, isNumeric: false };
}
function getMetricColor(numStr, labelStr) {
    const combined = (numStr + " " + labelStr).toLowerCase();
    if (combined.includes('cháº­m') || combined.includes('lá»—i') || combined.includes('sáº­p') || combined.includes('quÃ¡ táº£i') || combined.includes('ngháº½n') || combined.includes('tá»‡') || combined.includes('critical') || combined.includes('warning')) {
        return 'danger';
    }
    if (combined.includes('nhanh') || combined.includes('tá»‘i Æ°u') || combined.includes('giáº£m') || combined.includes('tÄƒng') || combined.includes('mÆ°á»£t') || combined.includes('ok') || combined.includes('an toÃ n') || combined.includes('x') || combined.includes('láº§n') || combined.includes('ms') || combined.includes('giáº£i phÃ³ng') || combined.includes('tiáº¿t kiá»‡m') || combined.includes('giáº£m táº£i') || combined.includes('nháº¹')) {
        return 'success';
    }
    return 'info';
}
// Dynamically update Episode header based on currentScript name (e.g. video1 -> EP. 001)
function updateEpisodeHeader() {
    const headerEp = document.querySelector('.header-ep');
    if (!headerEp) return;
    let epNumStr = "001";
    const match = currentScript.match(/\d+/);
    if (match) {
        const num = parseInt(match[0], 10);
        epNumStr = String(num).padStart(3, '0');
    }
    headerEp.textContent = `TECH DISPATCH \u00b7 EP. ${epNumStr}`;
    
    // Toggle Cloudflare logo visibility
    const cfLogo = document.getElementById('header-cf-logo');
    if (cfLogo) {
        cfLogo.style.display = (currentScript === 'video30') ? 'inline-block' : 'none';
    }
    
    // Toggle YouTube logo visibility
    const ytLogo = document.getElementById('header-yt-logo');
    if (ytLogo) {
        ytLogo.style.display = (currentScript === 'video33') ? 'inline-block' : 'none';
    }
}
// Dynamically initialize the editable canvas header topic from localStorage
function initScriptTopic() {
    const topicEl = document.getElementById('canvas-header-topic');
    if (!topicEl) return;
    // Use plugin topic name if available, otherwise fallback
    const pluginTopic = window.VideoPlugin ? window.VideoPlugin.topic : null;
    const defaultTopic = pluginTopic || localStorage.getItem(`topic_${currentScript}`) || 'Optimize Backend';
    let savedTopic = localStorage.getItem(`topic_${currentScript}`);
    if (pluginTopic && savedTopic !== pluginTopic) {
        savedTopic = pluginTopic;
        localStorage.setItem(`topic_${currentScript}`, pluginTopic);
    } else if (!savedTopic) {
        savedTopic = defaultTopic;
        localStorage.setItem(`topic_${currentScript}`, defaultTopic);
    }
    topicEl.textContent = savedTopic;
}
// â”€â”€ Dynamic Video Plugin Loader â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Call this whenever the user switches to a different video script.
// It removes any previously loaded plugin JS/CSS, then loads the new ones.
let _loadedVideoScriptName = null;
function loadVideoScript(scriptName) {
    if (_loadedVideoScriptName === scriptName) return; // already loaded
    // Remove old plugin script + css
    const oldJs = document.getElementById('video-plugin-js');
    const oldCss = document.getElementById('video-plugin-css');
    if (oldJs) oldJs.remove();
    if (oldCss) oldCss.remove();
    window.VideoPlugin = null;
    if (!scriptName) return;
    const basePath = `${API_BASE}/static/videos/${scriptName}`;
    const cacheBuster = `?t=${Date.now()}`;
    // Load CSS first
    const link = document.createElement('link');
    link.id = 'video-plugin-css';
    link.rel = 'stylesheet';
    link.href = `${basePath}.css${cacheBuster}`;
    document.head.appendChild(link);
    // Load JS
    const script = document.createElement('script');
    script.id = 'video-plugin-js';
    script.src = `${basePath}.js${cacheBuster}`;
    script.onload = () => {
        console.log(`[App] VideoPlugin loaded for: ${scriptName}`);
        // Re-render current slide with plugin active
        if (slides[currentSlideIndex]) renderActiveSlide(true);
        updateEpisodeHeader();
        initScriptTopic();
    };
    script.onerror = () => console.warn(`[App] No plugin found for: ${scriptName}`);
    document.body.appendChild(script);
    _loadedVideoScriptName = scriptName;
}
function updateSQLFlowPaths() {

    const canvas = document.querySelector('.sql-flow-canvas');
    if (!canvas) return;
    const nodeEmail = document.getElementById('flow-node-email');
    const nodeOr = document.getElementById('flow-node-or');
    const nodeTrue = document.getElementById('flow-node-true');
    const nodeWhere = document.getElementById('flow-node-where');
    const nodeAdmin = document.getElementById('flow-node-admin');
    if (!nodeEmail || !nodeOr || !nodeTrue || !nodeWhere || !nodeAdmin) return;
    const getElOffset = (el) => {
        let x = 0;
        let y = 0;
        let curr = el;
        while (curr && curr !== canvas) {
            x += curr.offsetLeft;
            y += curr.offsetTop;
            curr = curr.offsetParent;
        }
        return { x, y };
    };
    const offsetEmail = getElOffset(nodeEmail);
    const offsetOr = getElOffset(nodeOr);
    const offsetTrue = getElOffset(nodeTrue);
    const offsetWhere = getElOffset(nodeWhere);
    const offsetAdmin = getElOffset(nodeAdmin);
    const emailX1 = offsetEmail.x + nodeEmail.offsetWidth;
    const emailY1 = offsetEmail.y + nodeEmail.offsetHeight / 2;
    const orXLeft = offsetOr.x;
    const orYLeft = offsetOr.y + nodeOr.offsetHeight / 2;
    const dx1 = orXLeft - emailX1;
    const pathEmailOr = document.getElementById('path-email-or');
    if (pathEmailOr) {
        pathEmailOr.setAttribute('d',
            `M ${emailX1} ${emailY1} C ${emailX1 + dx1 * 0.5} ${emailY1}, ${orXLeft - dx1 * 0.5} ${orYLeft}, ${orXLeft} ${orYLeft}`
        );
    }
    const trueX1 = offsetTrue.x;
    const trueY1 = offsetTrue.y + nodeTrue.offsetHeight / 2;
    const orXRight = offsetOr.x + nodeOr.offsetWidth;
    const orYRight = offsetOr.y + nodeOr.offsetHeight / 2;
    const dx2 = trueX1 - orXRight;
    const pathTrueOr = document.getElementById('path-true-or');
    if (pathTrueOr) {
        pathTrueOr.setAttribute('d',
            `M ${trueX1} ${trueY1} C ${trueX1 - dx2 * 0.5} ${trueY1}, ${orXRight + dx2 * 0.5} ${orYRight}, ${orXRight} ${orYRight}`
        );
    }
    const orXBot = offsetOr.x + nodeOr.offsetWidth / 2;
    const orYBot = offsetOr.y + nodeOr.offsetHeight;
    const whereXTop = offsetWhere.x + nodeWhere.offsetWidth / 2;
    const whereYTop = offsetWhere.y;
    const dy1 = whereYTop - orYBot;
    const pathOrResult = document.getElementById('path-or-result');
    if (pathOrResult) {
        pathOrResult.setAttribute('d',
            `M ${orXBot} ${orYBot} C ${orXBot} ${orYBot + dy1 * 0.5}, ${whereXTop} ${whereYTop - dy1 * 0.5}, ${whereXTop} ${whereYTop}`
        );
    }
    const whereXBot = offsetWhere.x + nodeWhere.offsetWidth / 2;
    const whereYBot = offsetWhere.y + nodeWhere.offsetHeight;
    const adminXTop = offsetAdmin.x + nodeAdmin.offsetWidth / 2;
    const adminYTop = offsetAdmin.y;
    const dy2 = adminYTop - whereYBot;
    const pathResultAdmin = document.getElementById('path-result-admin');
    if (pathResultAdmin) {
        pathResultAdmin.setAttribute('d',
            `M ${whereXBot} ${whereYBot} C ${whereXBot} ${whereYBot + dy2 * 0.5}, ${adminXTop} ${adminYTop - dy2 * 0.5}, ${adminXTop} ${adminYTop}`
        );
    }
}

// Expose variables for backend headless exporter
Object.defineProperty(window, 'slides', {
    get: function() { return slides; }
});
window.getSlides = () => slides;
window.selectSlide = selectSlide;
window.renderCanvasPreview = renderCanvasPreview;
window.getSlideDuration = getSlideDuration;
window.isExportScrubbing = false;
window.setIsPlayingForExport = (val) => { isPlaying = val; };

