// ============================================================
// APP STATE
// ============================================================
let state = {
    studentNr: null,
    currentUnit: null,
    unitProgress: {},   // { unitId: { completed: bool, score: float, attempts: int } }
    taskStates: {},     // { taskId: { attempts: 0, hintLevel: 0, correct: false, answer: '' } }
    geminiQuestions: 0,
    geminiHistory: [],
    events: []          // local event log
};

const REPO_OWNER = 'hbraak';
const REPO_NAME = 'mathe-lernpfad';

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
    
    // Load saved state
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
    
    // Determine which unit to show
    const nextUnit = getNextUnit();
    showUnit(nextUnit);
}

function getNextUnit() {
    if (!state.unitProgress.diagnose) return 'diagnose';
    
    const diagScore = state.unitProgress.diagnose.score || 0;
    
    if (diagScore < 0.6 && !state.unitProgress.unit0) return 'unit0';
    if (diagScore < 0.6 && state.unitProgress.unit0 && !state.unitProgress.unit0.completed) return 'unit0';
    
    const path = diagScore < 0.6 
        ? ['unit0', 'unit1', 'unit2', 'unit25', 'final']
        : ['unit1', 'unit2', 'unit25', 'final'];
    
    for (const u of path) {
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
// EVENT LOGGING (local, exportable)
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
// EXPORT / SYNC FUNCTIONS
// ============================================================

// Generate a compact progress code for teacher verification
function getProgressCode() {
    if (!state.studentNr) return '';
    const summary = {
        nr: state.studentNr,
        t: Date.now(),
        u: {}
    };
    for (const [id, p] of Object.entries(state.unitProgress)) {
        summary.u[id] = { s: Math.round((p.score || 0) * 100), c: p.completed ? 1 : 0, a: p.attempts || 0 };
    }
    summary.g = state.geminiQuestions;
    return btoa(JSON.stringify(summary));
}

// Export full progress as JSON (download)
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

// Copy progress code to clipboard
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
    
    if (unitId === 'complete') {
        showCompletion();
        return;
    }
    
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
// RENDER TASK
// ============================================================
function renderTask(task, idx, ts) {
    const taskNum = idx + 1;
    let html = `<div class="task-card" id="task-${task.id}" data-task-id="${task.id}">`;
    html += `<h3>Aufgabe ${taskNum}</h3>`;
    html += `<div class="task-question">${task.question.replace(/\n/g, '<br>')}</div>`;
    
    if (task.type === 'choice') {
        html += `<div class="structure-options" id="options-${task.id}">`;
        task.options.forEach((opt, i) => {
            const cls = ts.correct && i === task.correct ? 'selected-correct' : 
                        (ts.answer === i && !ts.correct && ts.attempts > 0) ? 'selected-wrong' : '';
            html += `<button class="${cls}" onclick="checkChoice('${task.id}', ${i})" ${ts.correct ? 'disabled' : ''}>${opt}</button>`;
        });
        html += `</div>`;
    } else {
        html += `<div class="task-input-row">
            <input type="text" id="input-${task.id}" placeholder="Deine Antwort..." 
                   value="${ts.correct ? ts.answer : ''}" ${ts.correct ? 'disabled' : ''}
                   onkeydown="if(event.key==='Enter')checkAnswer('${task.id}')">
            <button onclick="checkAnswer('${task.id}')" ${ts.correct ? 'disabled' : ''}>Prüfen</button>
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
// CHECK ANSWER (free text)
// ============================================================
function checkAnswer(taskId) {
    const unit = UNITS[state.currentUnit];
    const task = unit.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const ts = state.taskStates[taskId];
    const input = document.getElementById(`input-${taskId}`);
    const raw = input.value.trim();
    if (!raw) return;
    
    const normalized = raw.replace(/\s+/g, '').toLowerCase();
    const isCorrect = task.accepts.some(a => 
        a.replace(/\s+/g, '').toLowerCase() === normalized
    );
    
    ts.attempts++;
    ts.answer = raw;
    
    const card = document.getElementById(`task-${taskId}`);
    const feedback = document.getElementById(`feedback-${taskId}`);
    
    logEvent('answer', { task: taskId, answer: raw, correct: isCorrect, attempt: ts.attempts });
    
    if (isCorrect) {
        ts.correct = true;
        card.classList.add('correct');
        card.classList.remove('incorrect');
        feedback.className = 'task-feedback show correct';
        feedback.textContent = '✅ Richtig!';
        input.disabled = true;
        input.nextElementSibling.disabled = true;
        const hintBtn = document.getElementById(`hint-btn-${taskId}`);
        if (hintBtn) hintBtn.style.display = 'none';
    } else {
        card.classList.add('incorrect');
        
        let errorMsg = null;
        if (task.errorPatterns) {
            for (const [pattern, msg] of Object.entries(task.errorPatterns)) {
                if (pattern.replace(/\s+/g, '').toLowerCase() === normalized) {
                    errorMsg = msg;
                    break;
                }
            }
        }
        
        if (ts.attempts >= 3 && task.hints && task.hints.length > 0) {
            const lastHint = task.hints[task.hints.length - 1];
            feedback.className = 'task-feedback show hint';
            feedback.innerHTML = `❌ Nicht ganz. Hier ist der Lösungsweg:<br>${lastHint}<br><br><em>Warum funktioniert das so? Versuch es nochmal!</em>`;
        } else if (errorMsg) {
            feedback.className = 'task-feedback show wrong';
            feedback.innerHTML = `❌ ${errorMsg}`;
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
            feedback.innerHTML = `💡 ${task.hints[ts.attempts - 1]}`;
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
    feedback.innerHTML = `💡 Hinweis ${ts.hintLevel + 1}: ${task.hints[ts.hintLevel]}`;
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
    
    renderMathInElement(area, {
        delimiters: [{left: '$', right: '$', display: false}]
    });
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
        addGeminiMessage('ai', 'Hallo! 👋 Ich bin dein Mathe-Tutor. Frag mich, wenn du bei einer Aufgabe nicht weiterkommst. Ich gebe dir Hinweise — aber nicht die Lösung! 😉');
    }
}

function addGeminiMessage(role, text) {
    const container = document.getElementById('gemini-messages');
    const div = document.createElement('div');
    div.className = `gemini-msg ${role}`;
    div.innerHTML = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    
    renderMathInElement(div, {
        delimiters: [{left: '$', right: '$', display: false}]
    });
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
    
    const currentTask = getCurrentTaskContext();
    
    // Build Gemini API request (native format)
    const contents = [];
    
    // Add history (last 6 messages)
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
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                systemInstruction: {
                    parts: [{ text: GEMINI_SYSTEM_PROMPT + (currentTask ? `\n\nAktuelle Aufgabe: ${currentTask}` : '') }]
                },
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7
                }
            })
        });
        
        if (!resp.ok) throw new Error(`API Error: ${resp.status}`);
        
        const data = await resp.json();
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
        if (!ts?.correct) {
            return task.question.replace(/\n/g, ' ');
        }
    }
    return `Einheit: ${unit.title}`;
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
    // Nothing to flush — all local
});
