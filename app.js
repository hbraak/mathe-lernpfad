// ============================================================
// APP STATE
// ============================================================
let state = {
    studentNr: null,
    currentUnit: null,
    unitProgress: {},
    taskStates: {},
    geminiQuestions: 0,
    geminiHistory: [],
    events: []
};

const REPO_OWNER = 'hbraak';
const REPO_NAME = 'mathe-lernpfad';

// ============================================================
// ANSWER NORMALIZATION
// ============================================================
function normalizeAnswer(s) {
    return s
        .replace(/\s+/g, '')
        .toLowerCase()
        .replace(/\*\*/g, '^')
        .replace(/\^{([^}]+)}/g, '^($1)')
        .replace(/\^(-?\d)/g, '^($1)')
        .replace(/\^([a-z])/g, '^($1)')
        .replace(/×/g, '*').replace(/·/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
        .replace(/²/g, '^(2)').replace(/³/g, '^(3)').replace(/⁴/g, '^(4)').replace(/⁵/g, '^(5)')
        .replace(/√/g, 'sqrt')
        .replace(/\bexp\(([^)]+)\)/g, 'e^($1)')
        .replace(/\*{2,}/g, '*');
}

// ============================================================
// TEXT → LaTeX CONVERSION (for live preview)
// ============================================================
function textToLatex(s) {
    if (!s || !s.trim()) return '';
    let t = s.trim();
    
    // Replace function names
    t = t.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    t = t.replace(/sin\(/g, '\\sin(');
    t = t.replace(/cos\(/g, '\\cos(');
    t = t.replace(/tan\(/g, '\\tan(');
    t = t.replace(/ln\(/g, '\\ln(');
    t = t.replace(/log\(/g, '\\log(');
    
    // e^(...) → e^{...}
    t = t.replace(/e\^\(([^)]+)\)/g, 'e^{$1}');
    t = t.replace(/e\^(-?[a-z0-9]+)/g, 'e^{$1}');
    
    // x^(...) → x^{...}
    t = t.replace(/\^(\(([^)]+)\))/g, '^{$2}');
    t = t.replace(/\^(-?\d+)/g, '^{$1}');
    
    // Fractions: a/b → \frac{a}{b} (simple cases)
    t = t.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
    
    // * → \cdot
    t = t.replace(/\*/g, ' \\cdot ');
    
    return t;
}

function renderPreview(inputId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById('preview-' + inputId.replace('input-', ''));
    if (!input || !preview) return;
    
    const raw = input.value.trim();
    if (!raw) {
        preview.innerHTML = '<span class="preview-placeholder">Vorschau...</span>';
        return;
    }
    
    try {
        const latex = textToLatex(raw);
        katex.render(latex, preview, { throwOnError: false, displayMode: false });
    } catch (e) {
        preview.textContent = raw;
    }
}

// ============================================================
// SPEECH INPUT
// ============================================================
let activeSpeechSession = null;

function getSpeechRecognitionCtor() {
    if (typeof window === 'undefined') return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function speechInputSupported() {
    return !!getSpeechRecognitionCtor();
}

function speechToMathText(raw) {
    if (!raw) return '';
    let t = raw
        .toLowerCase()
        .replace(/[.,!?;:]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Number words → digits
    const nums = { null:'0', eins:'1', ein:'1', eine:'1', zwei:'2', drei:'3', vier:'4',
        'fünf':'5', funf:'5', fuenf:'5', sechs:'6', sieben:'7', acht:'8', neun:'9',
        zehn:'10', elf:'11', 'zwölf':'12', zwolf:'12', dreizehn:'13', vierzehn:'14',
        'fünfzehn':'15', sechzehn:'16', siebzehn:'17', achtzehn:'18', neunzehn:'19',
        zwanzig:'20', dreißig:'30', vierzig:'40', 'fünfzig':'50', hundert:'100' };
    t = t.replace(/\b(null|eins|ein|eine|zwei|drei|vier|f[uü]n?f|fuenf|sechs|sieben|acht|neun|zehn|elf|zw[oö]lf|dreizehn|vierzehn|f[uü]nfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|drei[sß]ig|vierzig|f[uü]nfzig|hundert)\b/g, m => nums[m] || m);

    // Fractions
    t = t.replace(/\bein halb\b/g, '1/2');
    t = t.replace(/\bein drittel\b/g, '1/3');
    t = t.replace(/\bein viertel\b/g, '1/4');

    // Wurzel / Quadratwurzel
    t = t.replace(/\b(?:die\s+)?(?:quadrat)?wurzel\s+(?:von|aus)\s+(.+?)(?=\s+(?:plus|minus|mal|durch|geteilt|$))/g, 'sqrt($1)');
    t = t.replace(/\b(?:die\s+)?(?:quadrat)?wurzel\s+(?:von|aus)\s+(\S+)/g, 'sqrt($1)');
    t = t.replace(/\bwurzel\s+(\S+)/g, 'sqrt($1)');

    // "hoch" → ^
    t = t.replace(/\bhoch\s+minus\s+(\S+)/g, '^(-$1)');
    t = t.replace(/\bhoch\s+(\S+)/g, '^$1');
    t = t.replace(/\bquadrat\b/g, '^2');
    t = t.replace(/\bhoch\b/g, '^');

    // Operators
    t = t.replace(/\bgeteilt\s+durch\b/g, '/');
    t = t.replace(/\bmal\b/g, '*');
    t = t.replace(/\bdurch\b/g, '/');
    t = t.replace(/\bplus\b/g, '+');
    t = t.replace(/\bminus\b/g, '-');

    // Trig/log
    t = t.replace(/\bsinus\s+(?:von\s+)?/g, 'sin(');
    t = t.replace(/\bcosinus\s+(?:von\s+)?/g, 'cos(');
    t = t.replace(/\btangens\s+(?:von\s+)?/g, 'tan(');
    t = t.replace(/\blogarithmus\s+(?:von\s+)?/g, 'ln(');

    // Clean up
    t = t.replace(/\s*([+\-*/^])\s*/g, '$1');
    t = t.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
    t = t.replace(/\s+/g, '').trim();
    return t;
}

async function geminiRequest(body, model = 'gemini-2.5-flash-lite', retries = 3) {
    for (let i = 0; i < retries; i++) {
        const key = typeof getGeminiApiKey === 'function' ? getGeminiApiKey() : GEMINI_API_KEY;
        if (!key) throw new Error('No API key');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (resp.status === 429 && typeof rotateGeminiKey === 'function') {
            rotateGeminiKey();
            continue;
        }
        if (!resp.ok) throw new Error(`API ${resp.status}`);
        return await resp.json();
    }
    throw new Error('All API keys exhausted');
}

async function speechToMathViaGemini(spokenText) {
    if (!spokenText?.trim()) return spokenText;
    const key = typeof getGeminiApiKey === 'function' ? getGeminiApiKey() : (typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '');
    if (!key) return speechToMathText(spokenText);
    try {
        const data = await geminiRequest({
            contents: [{ role: 'user', parts: [{ text: 'Konvertiere: ' + spokenText }] }],
            systemInstruction: {
                parts: [{ text: `Du wandelst gesprochene deutsche Mathematik in Textnotation um. Gib AUSSCHLIESSLICH die Formel zurück. Kein Markdown, kein LaTeX, keine Dollarzeichen, kein erklärender Text.
Notation: ^ für Potenzen, sqrt() für Wurzeln, sin()/cos()/tan()/ln() für Funktionen.
Beispiele: "x hoch 2" = x^2, "12 x hoch 3" = 12x^3, "Wurzel aus x" = sqrt(x), "e hoch x" = e^x, "minus 2 durch x hoch 3" = -2/x^3, "x quadrat plus 1" = x^2+1, "3x plus 1 hoch 5" = (3x+1)^5, "Cosinus von 2x" = cos(2x)` }]
            },
            generationConfig: { maxOutputTokens: 60, temperature: 0.1 }
        });
        const result = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        console.log('[Speech→Math] Input:', spokenText, '→ Gemini:', result);
        if (!result) return speechToMathText(spokenText);
        // Strip markdown code fences, quotes, backticks
        let clean = result.replace(/^```[a-z]*\n?/g, '').replace(/\n?```$/g, '').replace(/^`|`$/g, '').replace(/^["']|["']$/g, '').trim();
        return clean || speechToMathText(spokenText);
    } catch (e) {
        console.warn('Gemini math conversion failed, using regex fallback:', e);
        return speechToMathText(spokenText);
    }
}

function stopActiveSpeechInput() {
    if (!activeSpeechSession?.recognition) return;
    try {
        activeSpeechSession.recognition.stop();
    } catch (e) {}
}

function toggleSpeechInput(inputId, buttonId, useMathTransform = true) {
    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) return;

    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    if (!input || !button || input.disabled) return;

    if (activeSpeechSession && activeSpeechSession.buttonId === buttonId) {
        stopActiveSpeechInput();
        return;
    }
    if (activeSpeechSession) {
        stopActiveSpeechInput();
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const baseText = input.value.trim();
    activeSpeechSession = { recognition, buttonId };

    button.classList.add('recording');
    button.setAttribute('aria-pressed', 'true');
    input.focus();

    recognition.onresult = (event) => {
        let transcript = '';
        let isFinal = false;
        for (let i = 0; i < event.results.length; i++) {
            transcript += `${event.results[i][0].transcript} `;
            if (event.results[i].isFinal) isFinal = true;
        }
        transcript = transcript.trim();
        if (!transcript) return;

        // Show interim result immediately (regex only)
        const interimText = useMathTransform ? speechToMathText(transcript) : transcript;
        input.value = baseText ? `${baseText} ${interimText}`.trim() : interimText.trim();
        if (input.id.startsWith('input-')) renderPreview(input.id);

        // When final, use Gemini for better conversion
        if (isFinal && useMathTransform) {
            const rawTranscript = transcript;
            const regexResult = input.value; // current regex result as fallback
            console.log('[Speech] Raw transcript:', rawTranscript, '| Regex result:', regexResult);
            input.classList.add('converting');
            speechToMathViaGemini(rawTranscript).then(converted => {
                console.log('[Speech] Gemini result:', converted);
                // Only use Gemini result if it looks like math (has digits or operators)
                const looksLikeMath = /[0-9x^()+\-*/]/.test(converted) && converted.length > 0;
                const finalResult = looksLikeMath ? converted : regexResult;
                console.log('[Speech] Using:', finalResult);
                input.value = baseText ? `${baseText} ${finalResult}`.trim() : finalResult.trim();
                input.classList.remove('converting');
                if (input.id.startsWith('input-')) renderPreview(input.id);
            }).catch(() => {
                input.classList.remove('converting');
            });
        }
    };

    recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        const micBtn = document.getElementById(buttonId);
        if (micBtn) {
            micBtn.classList.remove('recording');
            micBtn.setAttribute('aria-pressed', 'false');
        }
        if (activeSpeechSession && activeSpeechSession.recognition === recognition) {
            activeSpeechSession = null;
        }
    };

    try {
        recognition.start();
    } catch (e) {
        console.error('Speech recognition start failed:', e);
        button.classList.remove('recording');
        button.setAttribute('aria-pressed', 'false');
        if (activeSpeechSession && activeSpeechSession.recognition === recognition) {
            activeSpeechSession = null;
        }
    }
}

// ============================================================
// HANDWRITING INPUT (Canvas + Gemini Vision)
// ============================================================
const drawPads = {};

function initDrawPad(taskId) {
    if (drawPads[taskId]) return;
    const canvas = document.getElementById(`draw-${taskId}`);
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.floor(canvas.offsetWidth * ratio);
    canvas.height = Math.floor(canvas.offsetHeight * ratio);
    canvas.getContext('2d').scale(ratio, ratio);
    // White background
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPads[taskId] = new SignaturePad(canvas, {
        minWidth: 0.8, maxWidth: 2, penColor: '#1a2a3a',
        backgroundColor: 'rgb(255,255,255)',
        throttle: 0, velocityFilterWeight: 0.2
    });
}

function toggleDrawPad(taskId) {
    const wrap = document.getElementById(`draw-wrap-${taskId}`);
    if (!wrap) return;
    const isVisible = wrap.classList.toggle('visible');
    if (isVisible) initDrawPad(taskId);
}

function clearDrawPad(taskId) {
    if (!drawPads[taskId]) return;
    drawPads[taskId].clear();
    // Re-fill white
    const canvas = document.getElementById(`draw-${taskId}`);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function recognizeDrawing(taskId) {
    const pad = drawPads[taskId];
    if (!pad || pad.isEmpty()) return;
    const key = typeof getGeminiApiKey === 'function' ? getGeminiApiKey() : (typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '');
    if (!key) {
        alert('Zeichenerkennung benötigt einen Gemini API-Key.');
        return;
    }

    const input = document.getElementById(`input-${taskId}`);
    if (!input) return;

    input.classList.add('converting');

    try {
        const dataUrl = pad.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];

        const data = await geminiRequest({
            contents: [{
                role: 'user',
                parts: [
                    { inlineData: { mimeType: 'image/png', data: base64 } },
                    { text: 'Erkenne die handgeschriebene Mathematik im Bild. Gib AUSSCHLIESSLICH die Formel zurück — kein Text, kein Markdown, kein LaTeX, keine Dollarzeichen. Notation: ^ für Potenzen, sqrt() für Wurzeln, sin()/cos() für Funktionen.' }
                ]
            }],
            generationConfig: { maxOutputTokens: 60, temperature: 0.1 }
        });
        let result = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        result = result.replace(/^```[a-z]*\n?/g, '').replace(/\n?```$/g, '').replace(/^`|`$/g, '').replace(/^["']|["']$/g, '').replace(/^\$+|\$+$/g, '').trim();
        console.log('[Draw→Math] Recognized:', result);

        if (result && /[0-9x^()+\-*/]/.test(result)) {
            input.value = result;
            renderPreview(`input-${taskId}`);
        }
    } catch (e) {
        console.error('Drawing recognition failed:', e);
    } finally {
        input.classList.remove('converting');
    }
}

function updateSpeechUi() {
    const supported = speechInputSupported();
    const geminiMicBtn = document.getElementById('gemini-mic-btn');
    if (geminiMicBtn) geminiMicBtn.hidden = !supported;
    const geminiSpeechHint = document.getElementById('gemini-speech-hint');
    if (geminiSpeechHint) geminiSpeechHint.hidden = !supported;
}

// ============================================================
// MATH KEYBOARD
// ============================================================
function insertMathSymbol(taskId, symbol) {
    const input = document.getElementById(`input-${taskId}`);
    if (!input || input.disabled) return;
    
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const before = input.value.substring(0, start);
    const after = input.value.substring(end);
    
    // Some symbols need special cursor placement
    let insert = symbol;
    let cursorOffset = symbol.length;
    
    if (symbol === '^()') {
        insert = '^(';
        cursorOffset = 2;
        // Auto-close later
        input.value = before + insert + after;
    } else if (symbol === 'sqrt()') {
        insert = 'sqrt(';
        cursorOffset = 5;
        input.value = before + insert + after;
    } else {
        input.value = before + insert + after;
    }
    
    input.focus();
    input.selectionStart = input.selectionEnd = start + cursorOffset;
    renderPreview(`input-${taskId}`);
}

function buildMathKeyboard(taskId) {
    const keys = [
        { label: 'x', value: 'x' },
        { label: 'e', value: 'e' },
        { label: 'π', value: 'pi' },
        { label: 'x²', value: 'x^(2)', cls: 'key-op' },
        { label: 'x³', value: 'x^(3)', cls: 'key-op' },
        { label: 'xⁿ', value: '^()', cls: 'key-op' },
        { label: '√', value: 'sqrt()', cls: 'key-fn' },
        { label: 'sin', value: 'sin()', cls: 'key-fn' },
        { label: 'cos', value: 'cos()', cls: 'key-fn' },
        { label: 'ln', value: 'ln()', cls: 'key-fn' },
        { label: '(', value: '(' },
        { label: ')', value: ')' },
        { label: '+', value: '+', cls: 'key-op' },
        { label: '−', value: '-', cls: 'key-op' },
        { label: '·', value: '*', cls: 'key-op' },
        { label: '/', value: '/', cls: 'key-op' },
        { label: '0', value: '0', cls: 'key-num' },
        { label: '1', value: '1', cls: 'key-num' },
        { label: '2', value: '2', cls: 'key-num' },
        { label: '3', value: '3', cls: 'key-num' },
        { label: '4', value: '4', cls: 'key-num' },
        { label: '5', value: '5', cls: 'key-num' },
        { label: '6', value: '6', cls: 'key-num' },
        { label: '7', value: '7', cls: 'key-num' },
        { label: '8', value: '8', cls: 'key-num' },
        { label: '9', value: '9', cls: 'key-num' },
        { label: '⌫', value: '__backspace__', cls: 'key-del' },
        { label: 'C', value: '__clear__', cls: 'key-del' },
    ];
    
    let html = `<div class="math-keyboard" id="kbd-${taskId}">`;
    for (const k of keys) {
        if (k.value === '__backspace__') {
            html += `<button class="math-key ${k.cls || ''}" onclick="mathBackspace('${taskId}')">${k.label}</button>`;
        } else if (k.value === '__clear__') {
            html += `<button class="math-key ${k.cls || ''}" onclick="mathClear('${taskId}')">${k.label}</button>`;
        } else {
            html += `<button class="math-key ${k.cls || ''}" onclick="insertMathSymbol('${taskId}','${k.value}')">${k.label}</button>`;
        }
    }
    html += `</div>`;
    return html;
}

function mathBackspace(taskId) {
    const input = document.getElementById(`input-${taskId}`);
    if (!input || input.disabled) return;
    const pos = input.selectionStart;
    if (pos > 0) {
        input.value = input.value.substring(0, pos - 1) + input.value.substring(pos);
        input.focus();
        input.selectionStart = input.selectionEnd = pos - 1;
    }
    renderPreview(`input-${taskId}`);
}

function mathClear(taskId) {
    const input = document.getElementById(`input-${taskId}`);
    if (!input || input.disabled) return;
    input.value = '';
    input.focus();
    renderPreview(`input-${taskId}`);
}

// ============================================================
// LOGIN
// ============================================================
function doLogin() {
    const nr = parseInt(document.getElementById('student-nr').value);
    if (nr < 1 || nr > 25 || isNaN(nr)) {
        document.getElementById('student-nr').style.borderColor = '#ef4444';
        return;
    }
    state.studentNr = nr;
    
    const saved = localStorage.getItem(`lernpfad_${nr}`);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.unitProgress = parsed.unitProgress || {};
            state.taskStates = parsed.taskStates || {};
            state.geminiQuestions = parsed.geminiQuestions || 0;
            state.events = parsed.events || [];
        } catch(e) {}
    }
    
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    document.getElementById('student-label').textContent = `Nr. ${nr}`;
    
    const nextUnit = getNextUnit();
    showUnit(nextUnit);
}

function getNextUnit() {
    if (!state.unitProgress.diagnose) return 'diagnose';
    
    const diagScore = state.unitProgress.diagnose.score || 0;
    
    if (diagScore < 0.6 && !state.unitProgress.unit0) return 'unit0';
    if (diagScore < 0.6 && state.unitProgress.unit0 && !state.unitProgress.unit0.completed) return 'unit0';
    
    // LP1: Ableitungsregeln
    const lp1 = diagScore < 0.6 
        ? ['unit0', 'unit1', 'unit2', 'unit25', 'anwendungen1']
        : ['unit1', 'unit2', 'unit25', 'anwendungen1'];
    
    for (const u of lp1) {
        if (!state.unitProgress[u] || !state.unitProgress[u].completed) return u;
    }
    
    // LP2: Anwendungen der Differentialrechnung (AS 6)
    if (!state.unitProgress.diagnose2) return 'diagnose2';
    
    const diag2Score = state.unitProgress.diagnose2.score || 0;
    const lp2 = diag2Score < 0.6
        ? ['steckbrief', 'modellierung', 'extremwert', 'final']
        : ['modellierung', 'extremwert', 'final'];
    
    for (const u of lp2) {
        if (!state.unitProgress[u] || !state.unitProgress[u].completed) return u;
    }
    
    return 'complete';
}

// ============================================================
// SAVE STATE
// ============================================================
function saveState() {
    if (!state.studentNr) return;
    localStorage.setItem(`lernpfad_${state.studentNr}`, JSON.stringify({
        unitProgress: state.unitProgress,
        taskStates: state.taskStates,
        geminiQuestions: state.geminiQuestions,
        events: state.events
    }));
}

// ============================================================
// EVENT LOGGING
// ============================================================
function logEvent(event, data) {
    state.events.push({
        nr: state.studentNr,
        event: event,
        timestamp: new Date().toISOString(),
        ...data
    });
    saveState();
}

// ============================================================
// GIST SYNC (automatic upload)
// ============================================================
async function syncToGist() {
    if (!GITHUB_TOKEN || !GIST_ID || !state.studentNr) return;
    
    // Read current gist content
    try {
        const resp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        if (!resp.ok) { console.error('Gist read error:', resp.status); return; }
        
        const gist = await resp.json();
        const currentContent = gist.files?.['progress.json']?.content || '{}';
        let allData = {};
        try { allData = JSON.parse(currentContent); } catch(e) { allData = {}; }
        
        // Update this student's data
        allData[state.studentNr] = {
            unitProgress: state.unitProgress,
            geminiQuestions: state.geminiQuestions,
            lastSync: new Date().toISOString()
        };
        
        // Write back
        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: { 'progress.json': { content: JSON.stringify(allData, null, 2) } }
            })
        });
        
        console.log(`Synced student ${state.studentNr} to Gist`);
    } catch (e) {
        console.error('Gist sync error:', e);
    }
}

// ============================================================
// EXPORT / SYNC
// ============================================================
function getProgressCode() {
    if (!state.studentNr) return '';
    const summary = { nr: state.studentNr, t: Date.now(), u: {} };
    for (const [id, p] of Object.entries(state.unitProgress)) {
        summary.u[id] = { s: Math.round((p.score || 0) * 100), c: p.completed ? 1 : 0, a: p.attempts || 0 };
    }
    summary.g = state.geminiQuestions;
    return btoa(JSON.stringify(summary));
}

function exportProgress() {
    const data = {
        studentNr: state.studentNr,
        exportTime: new Date().toISOString(),
        unitProgress: state.unitProgress,
        taskStates: state.taskStates,
        geminiQuestions: state.geminiQuestions,
        events: state.events
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lernpfad_nr${state.studentNr}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function copyProgressCode() {
    const code = getProgressCode();
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copy-code-btn');
        if (btn) { btn.textContent = '✅ Kopiert!'; setTimeout(() => btn.textContent = '📋 Code kopieren', 2000); }
    });
}

// ============================================================
// SHOW UNIT
// ============================================================
function showUnit(unitId) {
    state.currentUnit = unitId;
    const area = document.getElementById('content-area');
    stopActiveSpeechInput();
    
    if (unitId === 'complete') { showCompletion(); return; }
    
    const unit = UNITS[unitId];
    if (!unit) return;
    
    document.getElementById('unit-label').textContent = unit.title;
    updateProgressBar();
    logEvent('unit_start', { unit: unitId });
    
    let html = `<div class="unit-intro"><h2>${unit.title}</h2><p>${unit.description}</p></div>`;
    
    if (unit.explanation) {
        html += `<div class="explanation">${unit.explanation}</div>`;
    }
    if (unit.example) {
        html += `<div class="example"><h3>📝 ${unit.example.title}</h3>${unit.example.content}</div>`;
    }
    
    unit.tasks.forEach((task, idx) => {
        const ts = state.taskStates[task.id] || { attempts: 0, hintLevel: 0, correct: false, answer: '' };
        state.taskStates[task.id] = ts;
        html += renderTask(task, idx, ts);
    });
    
    if (unitId !== 'diagnose' && unitId !== 'final') {
        html += `<div class="checkpoint-notice">
            <h3>🎓 Lehrer-Checkpoint</h3>
            <p>Zeig deinem Lehrer dein Ergebnis nach dem Mastery-Check!</p>
        </div>`;
    }
    
    html += `<div class="nav-buttons">
        <button class="btn-primary" onclick="runMasteryCheck()" id="mastery-btn">
            ${unitId === 'diagnose' ? 'Diagnose auswerten' : unitId === 'final' ? 'Abschlusstest auswerten' : 'Mastery-Check starten'}
        </button>
    </div>`;
    
    area.innerHTML = html;
    renderMathInElement(area, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ]
    });
}

// ============================================================
// MINI-MARKDOWN (bold, tables, newlines)
// ============================================================
function miniMarkdown(text) {
    // Convert markdown tables to HTML
    text = text.replace(/((?:\|[^\n]+\|\n?)+)/g, function(tableBlock) {
        const rows = tableBlock.trim().split('\n').filter(r => r.trim());
        if (rows.length < 2) return tableBlock;
        let html = '<table class="md-table">';
        rows.forEach((row, i) => {
            // Skip separator rows like |---|---|---| (only dashes, colons, pipes, spaces)
            if (/^\|[\s:\-]+(\|[\s:\-]+)*\|$/.test(row.trim())) return;
            const tag = i === 0 ? 'th' : 'td';
            const cells = row.split('|').filter((c, ci, arr) => ci > 0 && ci < arr.length - 1);
            html += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
        });
        html += '</table>';
        return html;
    });
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Newlines (but not inside tables)
    text = text.replace(/\n/g, '<br>');
    return text;
}

// ============================================================
// RENDER TASK
// ============================================================
function renderTask(task, idx, ts) {
    const taskNum = idx + 1;
    let html = `<div class="task-card" id="task-${task.id}" data-task-id="${task.id}">`;
    html += `<h3>Aufgabe ${taskNum}</h3>`;
    html += `<div class="task-question">${miniMarkdown(task.question)}</div>`;
    
    if (task.type === 'choice') {
        html += `<div class="structure-options" id="options-${task.id}">`;
        task.options.forEach((opt, i) => {
            const cls = ts.correct && i === task.correct ? 'selected-correct' : 
                        (ts.answer === i && !ts.correct && ts.attempts > 0) ? 'selected-wrong' : '';
            html += `<button class="${cls}" onclick="checkChoice('${task.id}', ${i})" ${ts.correct ? 'disabled' : ''}>${miniMarkdown(opt)}</button>`;
        });
        html += `</div>`;
    } else {
        const micBtn = speechInputSupported()
            ? `<button type="button" class="mic-btn" id="mic-${task.id}"
                   onclick="toggleSpeechInput('input-${task.id}','mic-${task.id}', true)"
                   title="Antwort per Sprache eingeben" aria-label="Antwort per Sprache eingeben"
                   ${ts.correct ? 'disabled' : ''}>🎤</button>`
            : '';
        const drawBtn = !ts.correct
            ? `<button type="button" class="draw-btn" onclick="toggleDrawPad('${task.id}')" title="Antwort zeichnen" aria-label="Antwort zeichnen">✏️</button>`
            : '';
        // Text input with math keyboard and live preview
        html += `<div class="math-input-area">
            <div class="task-input-row">
                <input type="text" id="input-${task.id}" placeholder="Deine Antwort..." 
                       value="${ts.correct ? ts.answer : ''}" ${ts.correct ? 'disabled' : ''}
                       oninput="renderPreview('input-${task.id}')"
                       onkeydown="if(event.key==='Enter')checkAnswer('${task.id}')"
                       inputmode="text" enterkeyhint="done"
                       autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                ${micBtn}
                ${drawBtn}
                <button type="button" class="check-btn" id="check-btn-${task.id}" onclick="checkAnswer('${task.id}')" ${ts.correct ? 'disabled' : ''}>Prüfen</button>
            </div>
            ${!ts.correct ? `<div class="draw-wrap" id="draw-wrap-${task.id}">
                <canvas id="draw-${task.id}" class="draw-canvas"></canvas>
                <div class="draw-buttons">
                    <button type="button" onclick="clearDrawPad('${task.id}')">🗑️ Löschen</button>
                </div>
            </div>` : ''}
            <div class="math-preview" id="preview-${task.id}"><span class="preview-placeholder">Vorschau...</span></div>
            ${!ts.correct ? buildMathKeyboard(task.id) : ''}
        </div>`;
    }
    
    html += `<div class="task-feedback" id="feedback-${task.id}"></div>`;
    
    if (!task.type && !ts.correct) {
        html += `<button class="hint-btn" onclick="showHint('${task.id}')" id="hint-btn-${task.id}">
            💡 Hinweis (${ts.hintLevel}/${task.hints ? task.hints.length : 0})
        </button>`;
    }
    
    html += `</div>`;
    return html;
}

// ============================================================
// CHECK ANSWER
// ============================================================
async function checkAnswerWithGemini(task, studentAnswer) {
    const data = await geminiRequest({
        contents: [{ role: 'user', parts: [{ text: `Aufgabe: ${task.question}\nKorrekte Lösung: ${task.answer}\nAntwort des Schülers: ${studentAnswer}` }] }],
        systemInstruction: { parts: [{ text: `Du bist ein Mathe-Korrektor. Prüfe ob die Antwort des Schülers mathematisch äquivalent zur korrekten Lösung ist.

WICHTIG:
- Die Reihenfolge der Terme ist egal (Kommutativgesetz): u'v + uv' = uv' + u'v
- Nicht vereinfachte aber korrekte Formen zählen als richtig: 2x*e^x + x^2*e^x = e^x*(x^2+2x)
- Verschiedene Schreibweisen sind ok: 1/(2sqrt(x)) = 0.5*x^(-0.5) = x^(-1/2)/2
- Faktorisierte und ausmultiplizierte Form sind beide richtig
- Teilweise vereinfacht ist auch richtig, solange mathematisch korrekt

Antworte NUR mit einem einzelnen Wort: RICHTIG oder FALSCH` }] },
        generationConfig: { maxOutputTokens: 10, temperature: 0.0 }
    });
    const result = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim().toUpperCase();
    console.log('[GeminiCheck]', studentAnswer, '→', result);
    return result.startsWith('RICHTIG');
}

async function checkAnswer(taskId) {
    const unit = UNITS[state.currentUnit];
    const task = unit.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const ts = state.taskStates[taskId];
    const input = document.getElementById(`input-${taskId}`);

    // If draw pad is open and has content, recognize first
    const drawWrap = document.getElementById(`draw-wrap-${taskId}`);
    if (drawWrap?.classList.contains('visible') && drawPads[taskId] && !drawPads[taskId].isEmpty()) {
        await recognizeDrawing(taskId);
    }

    const raw = input.value.trim();
    if (!raw) return;
    
    const card = document.getElementById(`task-${taskId}`);
    const feedback = document.getElementById(`feedback-${taskId}`);
    const checkBtn = document.getElementById(`check-btn-${taskId}`);

    // Stage 1: Fast string comparison
    const normalized = normalizeAnswer(raw);
    let isCorrect = task.accepts.some(a => normalizeAnswer(a) === normalized);

    // Stage 2: If no string match and API key available, ask Gemini
    if (!isCorrect && typeof GEMINI_API_KEY !== 'undefined' && GEMINI_API_KEY) {
        if (checkBtn) { checkBtn.disabled = true; checkBtn.textContent = '⏳'; }
        feedback.className = 'task-feedback show';
        feedback.textContent = '🔍 Wird geprüft...';
        feedback.style.background = '#1e293b'; feedback.style.color = '#94a3b8';
        try {
            isCorrect = await checkAnswerWithGemini(task, raw);
        } catch (e) {
            console.warn('Gemini answer check failed:', e);
        }
        if (checkBtn) { checkBtn.disabled = false; checkBtn.textContent = 'Prüfen'; }
        feedback.style.background = ''; feedback.style.color = '';
    }

    ts.attempts++;
    ts.answer = raw;
    
    logEvent('answer', { task: taskId, answer: raw, correct: isCorrect, attempt: ts.attempts });
    
    if (isCorrect) {
        ts.correct = true;
        card.classList.add('correct');
        card.classList.remove('incorrect');
        feedback.className = 'task-feedback show correct';
        feedback.textContent = '✅ Richtig!';
        input.disabled = true;
        if (checkBtn) checkBtn.disabled = true;
        const micBtn = document.getElementById(`mic-${taskId}`);
        if (micBtn) {
            micBtn.disabled = true;
            if (activeSpeechSession?.buttonId === micBtn.id) stopActiveSpeechInput();
        }
        // Hide keyboard
        const kbd = document.getElementById(`kbd-${taskId}`);
        if (kbd) kbd.style.display = 'none';
        const hintBtn = document.getElementById(`hint-btn-${taskId}`);
        if (hintBtn) hintBtn.style.display = 'none';
    } else {
        card.classList.add('incorrect');
        
        let errorMsg = null;
        if (task.errorPatterns) {
            for (const [pattern, msg] of Object.entries(task.errorPatterns)) {
                if (normalizeAnswer(pattern) === normalized) {
                    errorMsg = msg;
                    break;
                }
            }
        }
        
        if (ts.attempts >= 3 && task.hints && task.hints.length > 0) {
            const lastHint = task.hints[task.hints.length - 1];
            feedback.className = 'task-feedback show hint';
            feedback.innerHTML = `❌ Nicht ganz. Hier ist der Lösungsweg:<br>${miniMarkdown(lastHint)}<br><br><em>Warum funktioniert das so? Versuch es nochmal!</em>`;
        } else if (errorMsg) {
            feedback.className = 'task-feedback show wrong';
            feedback.innerHTML = `❌ ${miniMarkdown(errorMsg)}`;
        } else if (ts.attempts === 1) {
            feedback.className = 'task-feedback show wrong';
            feedback.textContent = '❌ Nicht ganz. Versuch es nochmal oder nutze den Hinweis!';
        } else {
            feedback.className = 'task-feedback show wrong';
            feedback.innerHTML = '❌ Leider falsch. Nutze den Hinweis oder frag den KI-Tutor! 💬';
        }
    }
    
    saveState();
    renderMathInElement(feedback, {
        delimiters: [{left: '$', right: '$', display: false}]
    });
}

// ============================================================
// CHECK CHOICE
// ============================================================
function checkChoice(taskId, choice) {
    const unit = UNITS[state.currentUnit];
    const task = unit.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const ts = state.taskStates[taskId];
    if (ts.correct) return;
    
    ts.attempts++;
    ts.answer = choice;
    
    const container = document.getElementById(`options-${taskId}`);
    const buttons = container.querySelectorAll('button');
    const feedback = document.getElementById(`feedback-${taskId}`);
    const card = document.getElementById(`task-${taskId}`);
    
    logEvent('answer', { task: taskId, answer: choice, correct: choice === task.correct, attempt: ts.attempts });
    
    if (choice === task.correct) {
        ts.correct = true;
        buttons[choice].classList.add('selected-correct');
        buttons.forEach(b => b.disabled = true);
        card.classList.add('correct');
        feedback.className = 'task-feedback show correct';
        feedback.textContent = '✅ Richtig!';
    } else {
        buttons[choice].classList.add('selected-wrong');
        setTimeout(() => buttons[choice].classList.remove('selected-wrong'), 1500);
        card.classList.add('incorrect');
        
        if (task.hints && ts.attempts <= task.hints.length) {
            feedback.className = 'task-feedback show hint';
            feedback.innerHTML = `💡 ${miniMarkdown(task.hints[ts.attempts - 1])}`;
        } else {
            feedback.className = 'task-feedback show wrong';
            feedback.textContent = '❌ Nicht ganz. Überlege nochmal!';
        }
    }
    
    saveState();
    renderMathInElement(feedback, {
        delimiters: [{left: '$', right: '$', display: false}]
    });
}

// ============================================================
// SHOW HINT
// ============================================================
function showHint(taskId) {
    const unit = UNITS[state.currentUnit];
    const task = unit.tasks.find(t => t.id === taskId);
    if (!task || !task.hints) return;
    
    const ts = state.taskStates[taskId];
    if (ts.hintLevel >= task.hints.length) return;
    
    const feedback = document.getElementById(`feedback-${taskId}`);
    feedback.className = 'task-feedback show hint';
    feedback.innerHTML = `💡 Hinweis ${ts.hintLevel + 1}: ${miniMarkdown(task.hints[ts.hintLevel])}`;
    ts.hintLevel++;
    
    logEvent('hint', { task: taskId, level: ts.hintLevel });
    
    const hintBtn = document.getElementById(`hint-btn-${taskId}`);
    if (hintBtn) {
        hintBtn.textContent = `💡 Hinweis (${ts.hintLevel}/${task.hints.length})`;
        if (ts.hintLevel >= task.hints.length) hintBtn.disabled = true;
    }
    
    saveState();
    renderMathInElement(feedback, {
        delimiters: [{left: '$', right: '$', display: false}]
    });
}

// ============================================================
// MASTERY CHECK
// ============================================================
function runMasteryCheck() {
    const unit = UNITS[state.currentUnit];
    if (!unit) return;
    
    const total = unit.tasks.length;
    const correct = unit.tasks.filter(t => state.taskStates[t.id]?.correct).length;
    const score = correct / total;
    const threshold = unit.masteryThreshold || 0.6;
    const passed = state.currentUnit === 'diagnose' ? true : score >= threshold;
    
    state.unitProgress[state.currentUnit] = {
        completed: passed,
        score: score,
        attempts: (state.unitProgress[state.currentUnit]?.attempts || 0) + 1
    };
    saveState();
    
    logEvent('mastery_check', {
        unit: state.currentUnit,
        score: Math.round(score * 100),
        correct, total, passed,
        geminiQuestions: state.geminiQuestions
    });
    
    // Auto-sync to Gist
    syncToGist();
    
    const area = document.getElementById('content-area');
    const pct = Math.round(score * 100);
    
    if (state.currentUnit === 'diagnose') {
        const needsReview = score < 0.6;
        area.innerHTML = `
            <div class="mastery-result">
                <h2>📊 Diagnose-Ergebnis</h2>
                <div class="mastery-score ${needsReview ? 'fail' : 'pass'}">${pct}%</div>
                <p class="mastery-msg">${correct} von ${total} Aufgaben richtig.</p>
                <p class="mastery-msg">${needsReview 
                    ? 'Du startest mit einer kurzen Wiederholung der Grundableitungen.' 
                    : 'Du kannst direkt mit der Produktregel starten!'}</p>
                <div class="nav-buttons">
                    <button class="btn-primary" onclick="showUnit(getNextUnit())">Weiter →</button>
                </div>
            </div>`;
    } else if (state.currentUnit === 'final') {
        area.innerHTML = `
            <div class="mastery-result">
                <h2>🏁 Abschlusstest</h2>
                <div class="mastery-score ${passed ? 'pass' : 'fail'}">${pct}%</div>
                <p class="mastery-msg">${correct} von ${total} Aufgaben richtig.</p>
                <p class="mastery-msg">${passed 
                    ? '🎉 Bestanden! Du beherrschst Produkt- und Kettenregel.' 
                    : 'Noch nicht bestanden. Wiederhole die schwachen Einheiten und versuche es erneut.'}</p>
                <div class="sync-section">
                    <button class="btn-secondary" onclick="copyProgressCode()" id="copy-code-btn">📋 Code kopieren</button>
                    <button class="btn-secondary" onclick="exportProgress()">💾 Ergebnis speichern</button>
                </div>
                <div class="checkpoint-notice">
                    <h3>🎓 Zeig dieses Ergebnis deinem Lehrer!</h3>
                </div>
                ${!passed ? '<div class="nav-buttons"><button class="btn-secondary" onclick="retryFinal()">Nochmal versuchen</button></div>' : ''}
            </div>`;
    } else if (passed) {
        area.innerHTML = `
            <div class="mastery-result">
                <h2>✅ Mastery-Check bestanden!</h2>
                <div class="mastery-score pass">${pct}%</div>
                <p class="mastery-msg">${correct} von ${total} Aufgaben richtig. Weiter geht's!</p>
                <div class="checkpoint-notice">
                    <h3>🎓 Lehrer-Checkpoint</h3>
                    <p>Zeig deinem Lehrer kurz dein Ergebnis!</p>
                </div>
                <div class="nav-buttons">
                    <button class="btn-primary" onclick="showUnit(getNextUnit())">Nächste Einheit →</button>
                </div>
            </div>`;
    } else {
        area.innerHTML = `
            <div class="mastery-result">
                <h2>⚠️ Noch nicht bestanden</h2>
                <div class="mastery-score fail">${pct}%</div>
                <p class="mastery-msg">${correct} von ${total} richtig. Du brauchst mindestens ${Math.round(threshold*100)}%.</p>
                <p class="mastery-msg">Arbeite die Aufgaben nochmal durch und nutze den KI-Tutor bei Fragen!</p>
                <div class="nav-buttons">
                    <button class="btn-primary" onclick="retryUnit()">Nochmal versuchen</button>
                    <button class="btn-secondary" onclick="toggleGemini()">💬 KI-Tutor fragen</button>
                </div>
            </div>`;
    }
    
    renderMathInElement(area, { delimiters: [{left: '$', right: '$', display: false}] });
}

function retryUnit() {
    const unit = UNITS[state.currentUnit];
    if (unit) {
        unit.tasks.forEach(t => {
            state.taskStates[t.id] = { attempts: 0, hintLevel: 0, correct: false, answer: '' };
        });
    }
    saveState();
    showUnit(state.currentUnit);
}

function retryFinal() {
    UNITS.final.tasks.forEach(t => {
        state.taskStates[t.id] = { attempts: 0, hintLevel: 0, correct: false, answer: '' };
    });
    state.unitProgress.final = { completed: false, score: 0, attempts: state.unitProgress.final?.attempts || 0 };
    saveState();
    showUnit('final');
}

// ============================================================
// COMPLETION SCREEN
// ============================================================
function showCompletion() {
    const area = document.getElementById('content-area');
    document.getElementById('unit-label').textContent = 'Fertig! 🎉';
    updateProgressBar();
    
    area.innerHTML = `
        <div class="mastery-result">
            <h2>🏆 Lernpfad abgeschlossen!</h2>
            <p class="mastery-msg">Du hast alle Einheiten erfolgreich bearbeitet.</p>
            <h3 style="margin: 1.5rem 0 1rem;">Deine Ergebnisse:</h3>
            <table style="margin: 0 auto; text-align: left; border-collapse: collapse;">
                ${Object.entries(state.unitProgress).map(([id, p]) => {
                    const u = UNITS[id];
                    if (!u) return '';
                    return `<tr style="border-bottom: 1px solid #334155;">
                        <td style="padding: 0.5rem 1rem;">${u.title}</td>
                        <td style="padding: 0.5rem 1rem; color: ${p.score >= 0.8 ? '#10b981' : '#f59e0b'}">${Math.round(p.score*100)}%</td>
                    </tr>`;
                }).join('')}
            </table>
            <p class="mastery-msg" style="margin-top: 1.5rem;">KI-Tutor genutzt: ${state.geminiQuestions} Fragen</p>
            <div class="sync-section">
                <button class="btn-secondary" onclick="copyProgressCode()" id="copy-code-btn">📋 Code kopieren</button>
                <button class="btn-secondary" onclick="exportProgress()">💾 Ergebnis speichern</button>
            </div>
            <div class="checkpoint-notice">
                <h3>🎓 Zeig dieses Ergebnis deinem Lehrer!</h3>
            </div>
        </div>`;
}

// ============================================================
// PROGRESS BAR
// ============================================================
function updateProgressBar() {
    const completedUnits = Object.values(state.unitProgress).filter(p => p.completed).length;
    const totalUnits = UNIT_ORDER.length;
    const pct = Math.round((completedUnits / totalUnits) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';
}

// ============================================================
// GEMINI CHAT
// ============================================================
function toggleGemini() {
    const panel = document.getElementById('gemini-panel');
    const btn = document.getElementById('gemini-toggle');
    panel.classList.toggle('hidden');
    btn.classList.toggle('active');
    
    if (!panel.classList.contains('hidden') && state.geminiHistory.length === 0) {
        if (!_tkey) {
            addGeminiMessage('ai', '⚠️ KI-Tutor nicht verfügbar. Frag deinen Lehrer um den richtigen Link!');
        } else {
            addGeminiMessage('ai', 'Hallo! 👋 Ich bin dein Mathe-Tutor. Frag mich, wenn du bei einer Aufgabe nicht weiterkommst. Ich gebe dir Hinweise — aber nicht die Lösung! 😉');
        }
    }
    
    if (!panel.classList.contains('hidden')) {
        const input = document.getElementById('gemini-input');
        if (input) setTimeout(() => input.focus(), 60);
    } else if (activeSpeechSession?.buttonId === 'gemini-mic-btn') {
        stopActiveSpeechInput();
    }
    updateSpeechUi();
}

function addGeminiMessage(role, text) {
    const container = document.getElementById('gemini-messages');
    const div = document.createElement('div');
    div.className = `gemini-msg ${role}`;
    div.innerHTML = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    
    renderMathInElement(div, { delimiters: [{left: '$', right: '$', display: false}] });
}

async function sendGemini() {
    const input = document.getElementById('gemini-input');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    addGeminiMessage('user', text);
    state.geminiQuestions++;
    saveState();
    
    logEvent('gemini_question', { question: text.substring(0, 100) });
    
    const _tkey = typeof getGeminiApiKey === 'function' ? getGeminiApiKey() : (typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '');
    if (!_tkey) {
        addGeminiMessage('ai', '⚠️ KI-Tutor nicht verfügbar. Fragen Sie Ihren Lehrer!');
        return;
    }
    
    const currentTask = getCurrentTaskContext();
    
    const contents = [];
    for (const msg of state.geminiHistory.slice(-6)) {
        contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        });
    }
    contents.push({ role: 'user', parts: [{ text: text }] });
    
    state.geminiHistory.push({ role: 'user', content: text });
    
    addGeminiMessage('ai', '<em>Denke nach...</em>');
    const loadingMsg = document.getElementById('gemini-messages').lastChild;
    
    try {
        const data = await geminiRequest({
            contents: contents,
            systemInstruction: {
                parts: [{ text: GEMINI_SYSTEM_PROMPT + (currentTask ? `\n\nAktuelle Aufgabe: ${currentTask}` : '') }]
            },
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
        }, GEMINI_MODEL);
        
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Entschuldigung, ich konnte keine Antwort generieren.';
        
        loadingMsg.innerHTML = reply;
        renderMathInElement(loadingMsg, { delimiters: [{left: '$', right: '$', display: false}] });
        
        state.geminiHistory.push({ role: 'assistant', content: reply });
        
    } catch (e) {
        loadingMsg.innerHTML = '⚠️ Verbindungsfehler. Versuch es nochmal oder frag deinen Lehrer!';
        console.error('Gemini error:', e);
    }
}

function getCurrentTaskContext() {
    if (!state.currentUnit) return null;
    const unit = UNITS[state.currentUnit];
    if (!unit) return null;
    
    for (const task of unit.tasks) {
        const ts = state.taskStates[task.id];
        if (!ts?.correct) return task.question.replace(/\n/g, ' ');
    }
    return `Einheit: ${unit.title}`;
}

// ============================================================
// DRAGGABLE GEMINI PANEL
// ============================================================
function initDraggable() {
    const panel = document.getElementById('gemini-panel');
    const header = document.getElementById('gemini-header');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    function onStart(e) {
        // Don't drag if clicking close button
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        const touch = e.touches ? e.touches[0] : e;
        const rect = panel.getBoundingClientRect();
        startX = touch.clientX;
        startY = touch.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        // Switch from bottom/right to top/left positioning
        panel.style.left = rect.left + 'px';
        panel.style.top = rect.top + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        e.preventDefault();
    }

    function onMove(e) {
        if (!isDragging) return;
        const touch = e.touches ? e.touches[0] : e;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        let newLeft = startLeft + dx;
        let newTop = startTop + dy;
        // Clamp to viewport
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 100));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - 50));
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
        e.preventDefault();
    }

    function onEnd() {
        isDragging = false;
    }

    header.addEventListener('mousedown', onStart);
    header.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
    initDraggable();
    updateSpeechUi();
});
