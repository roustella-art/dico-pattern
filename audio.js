// ─── AUDIO ────────────────────────────────────────────────────────────────────
// Extrait de index.html lors du refactor v1.15
// Contient : METRO, PREVIEW, previewPlay, previewStop, metroStart, metroStop,
//            scheduleCycle, pluckNote, freq440, startClickLoop, startPulseTicker
// Dépendances (globales) : state, SETTINGS (state.js) · PATTERNS (data.js)
//                          HCTRL (index.html, défini avant le premier appel audio)
// ─────────────────────────────────────────────────────────────────────────────

// ─── METRONOME ────────────────────────────────────────────────────────────────
const METRO = { ctx:null, running:false, bpm:60, nextBeat:0, timer:null, patId:null };

function metroCtx() {
  if (!METRO.ctx) METRO.ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (METRO.ctx.state === 'suspended') METRO.ctx.resume();
  return METRO.ctx;
}

function metroClick(time) {
  const ctx = METRO.ctx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = 880;
  const cg = (SETTINGS.clickVolume || 60) * 0.006; // même réglage que clic preview
  gain.gain.setValueAtTime(cg, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
  osc.start(time); osc.stop(time + 0.05);
  // flash visuel — utilise la classe .flash (palette CSS)
  const ahead = Math.max(0, (time - ctx.currentTime) * 1000);
  setTimeout(() => {
    const dot = document.getElementById('metro-dot-' + METRO.patId);
    if (dot) { dot.classList.add('flash'); setTimeout(() => dot.classList.remove('flash'), 90); }
    // En mode métronome solo (global) : flash header-pulse en cyan
    if (METRO.patId === 'global') {
      const hp = document.getElementById('header-pulse');
      if (hp) { hp.classList.add('flash-metro'); setTimeout(() => hp.classList.remove('flash-metro'), 90); }
    }
  }, ahead);
}

function metroSchedule() {
  const ctx = METRO.ctx;
  while (METRO.nextBeat < ctx.currentTime + 0.15) {
    metroClick(METRO.nextBeat);
    METRO.nextBeat += 60.0 / METRO.bpm;
  }
}

function metroStart(patId) {
  if (PREVIEW.patId) previewStop();
  metroStop(false);
  const ctx = metroCtx();

  if (patId === 'global') {
    METRO.bpm = HCTRL.bpm;
  } else {
    const inp = document.getElementById('metro-bpm-' + patId);
    METRO.bpm = inp ? Math.max(20, Math.min(200, parseInt(inp.value) || 60)) : 60;
  }
  METRO.patId = patId;
  METRO.running = true;
  METRO.nextBeat = ctx.currentTime + 0.1;
  METRO.timer = setInterval(metroSchedule, 50);
  metroRefreshBtn(patId, true);
}

function metroStop(refresh=true) {
  if (METRO.timer) { clearInterval(METRO.timer); METRO.timer = null; }
  const old = METRO.patId;
  METRO.running = false;
  const hp = document.getElementById('header-pulse');
  if (hp) { hp.classList.remove('flash'); hp.classList.remove('flash-metro'); }
  if (refresh) {
    if (old === 'global') syncHeaderPlay();
    else if (old) metroRefreshBtn(old, false);
  }
}

function metroToggle(patId) {
  if (METRO.running && METRO.patId === patId) metroStop();
  else metroStart(patId);
}

function metroBpmChange(patId, delta) {
  const inp = document.getElementById('metro-bpm-' + patId);
  if (!inp) return;
  const v = Math.max(20, Math.min(200, (parseInt(inp.value) || 60) + delta));
  inp.value = v;
  if (METRO.running && METRO.patId === patId) METRO.bpm = v;
}

function metroRefreshBtn(patId, running) {
  if (patId === 'global') { syncHeaderPlay(); return; }
  const btn = document.getElementById('metro-btn-' + patId);
  if (!btn) return;
  btn.textContent = running ? '⏹ Stop' : '▶ Start';
  btn.style.background = running ? 'var(--red)' : 'var(--green)';
}

function metroPostRender() {
  if (METRO.running && METRO.patId) metroRefreshBtn(METRO.patId, true);
}

function toggleAltFing(patId, idx, btn) {
  const key = `altFing_${patId}_${idx}`;
  const next = localStorage.getItem(key) !== '1';
  localStorage.setItem(key, next ? '1' : '0');
  btn.style.background   = next ? 'var(--orange)' : 'transparent';
  btn.style.borderColor  = next ? 'var(--orange)' : 'var(--border)';
  btn.textContent        = next ? '✓' : '';
  btn.title              = next ? 'Travaillé ✓' : 'Marquer comme travaillé';
}

// ─── PREVIEW AUDIO ────────────────────────────────────────────────────────────
const OPEN_MIDI = {e:64, B:59, G:55, D:50, A:45, E:40};
const PREVIEW = { ctx:null, masterGain:null, patId:null, timer:null, clickTimer:null, pulseTimer:null, bpm:40, interp:'Up', countIn:true, click:true, settingsOpen:false, cycleIdx:0, cursorTimeouts:[], clickNotes:4, cycleT0:0 };

function previewCtx() {
  if (!PREVIEW.ctx) PREVIEW.ctx = new (window.AudioContext||window.webkitAudioContext)();
  if (PREVIEW.ctx.state === 'suspended') PREVIEW.ctx.resume();
  return PREVIEW.ctx;
}

// ── Curseur tab : retourne [{cols:[charPos,...]}, ...] une entrée par section ──
function parseTabForCursor(tabStr, patId) {
  // La transformation est gérée en amont par previewStart() — pas de transformation ici
  const allLines = tabStr.split('\n');
  const sections = [];
  let currentLines = [];

  function flushSection(lines) {
    const items = [];
    for (const line of lines) {
      const lm = line.match(/^([eEBGDA])\s*\|(.+)/);
      if (lm) {
        const content = lm[2];
        let i = 0;
        while (i < content.length) {
          if (/\d/.test(content[i])) {
            const col = i + 2; // +2 pour 'X|'
            while (i < content.length && /\d/.test(content[i])) i++;
            items.push(col);
          } else i++;
        }
      } else if (/^[-\d]/.test(line)) {
        let i = 0;
        while (i < line.length) {
          if (/\d/.test(line[i])) {
            const col = i;
            while (i < line.length && /\d/.test(line[i])) i++;
            items.push(col);
          } else i++;
        }
      }
    }
    items.sort((a, b) => a - b);
    const seen = new Set();
    const cols = [];
    for (const col of items) {
      if (!seen.has(col)) { seen.add(col); cols.push(col); }
    }
    if (cols.length > 0) sections.push({ cols });
  }

  for (const line of allLines) {
    if (line.includes('↩') || line.includes('retour')) {
      if (currentLines.length) flushSection(currentLines);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length) flushSection(currentLines);
  return sections; // [{cols:[...]}, {cols:[...]}]
}

// Special version of parseTabForCursor that doesn't apply transformTab
function parseTabForCursorSpecial(tabStr) {
  // No transformTab for special patterns
  const allLines = tabStr.split('\n');
  const sections = [];
  let currentLines = [];

  function flushSection(lines) {
    const items = [];
    for (const line of lines) {
      const lm = line.match(/^([eEBGDA])\s*\|(.+)/);
      if (lm) {
        const content = lm[2];
        let i = 0;
        while (i < content.length) {
          if (/\d/.test(content[i])) {
            const col = i + 2; // +2 pour 'X|'
            while (i < content.length && /\d/.test(content[i])) i++;
            items.push(col);
          } else i++;
        }
      } else if (/^[-\d]/.test(line)) {
        let i = 0;
        while (i < line.length) {
          if (/\d/.test(line[i])) {
            const col = i;
            while (i < line.length && /\d/.test(line[i])) i++;
            items.push(col);
          } else i++;
        }
      }
    }
    items.sort((a, b) => a - b);
    const seen = new Set();
    const cols = [];
    for (const col of items) {
      if (!seen.has(col)) { seen.add(col); cols.push(col); }
    }
    if (cols.length > 0) sections.push({ cols });
  }

  for (const line of allLines) {
    if (line.includes('↩') || line.includes('retour')) {
      if (currentLines.length) flushSection(currentLines);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length) flushSection(currentLines);
  return sections; // [{cols:[...]}, {cols:[...]}]
}

function measurePreCharWidth(preEl) {
  if (!preEl) return 7.8;
  const cs = getComputedStyle(preEl);
  const tmp = document.createElement('span');
  tmp.style.cssText = `position:absolute;visibility:hidden;font-family:${cs.fontFamily};font-size:${cs.fontSize};white-space:pre`;
  tmp.textContent = '-';
  document.body.appendChild(tmp);
  const w = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return w || 7.8;
}

// Ordre standard des cordes dans un tab ASCII (de haut en bas)
const STRING_ORDER = ['e','B','G','D','A','E'];

function extractLineNotes(content, baseMidi, notes, strKey) {
  let i = 0;
  while (i < content.length) {
    if (/\d/.test(content[i])) {
      const col = i;
      let num = '';
      while (i < content.length && /\d/.test(content[i])) num += content[i++];
      notes.push({ col, midi: baseMidi + parseInt(num), str: strKey });
    } else { i++; }
  }
}

function parseSection(lines) {
  const notes = [];
  let unlabeledIdx = 0;
  // Toujours STRING_ORDER standard : la transformation amont gère le décalage de cordes
  for (const line of lines) {
    const labeled = line.match(/^([eEBGDA])\|(.+)/);
    if (labeled) {
      const strKey = labeled[1];
      const baseMidi = OPEN_MIDI[strKey];
      if (baseMidi !== undefined) extractLineNotes(labeled[2], baseMidi, notes, strKey);
    } else if (/^[-\d]/.test(line)) {
      const str = STRING_ORDER[unlabeledIdx];
      if (str && OPEN_MIDI[str] !== undefined) extractLineNotes(line, OPEN_MIDI[str], notes, str);
      unlabeledIdx++;
    }
  }

  notes.sort((a, b) => a.col - b.col);

  // Marquer les attaques (premier temps de chaque nouvelle corde — legato)
  let prevStr = null;
  notes.forEach(n => { n.isAttack = n.str !== prevStr; prevStr = n.str; });

  const grouped = [];
  let lastCol = -1;
  for (const n of notes) {
    if (n.col === lastCol) {
      grouped[grouped.length-1].notes.push(n.midi);
      if (n.isAttack) grouped[grouped.length-1].isAttack = true;
    } else {
      grouped.push({ notes:[n.midi], isAttack:n.isAttack });
      lastCol = n.col;
    }
  }
  return grouped;
}

function parseTabNotes(tabStr, patId) {
  // La transformation est gérée en amont par previewStart() — pas de transformation ici
  // (elle l'a déjà fait ou décidé de ne pas la faire)
  // Découpe en sections : aller / retour (séparées par ↩)
  const allLines = tabStr.split('\n');
  const sections = [];
  let current = [];
  for (const line of allLines) {
    if (line.includes('↩') || line.includes('retour')) {
      if (current.length) sections.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) sections.push(current);
  return sections.map(parseSection).filter(s => s.length > 0);
}

// Special parsing function that doesn't group notes by column
// Each note plays individually, sequentially
function parseSectionSpecial(lines) {
  const notes = [];
  let unlabeledIdx = 0;
  for (const line of lines) {
    // Skip blank lines
    if (line.trim() === '') continue;

    const labeled = line.match(/^([eEBGDA])\s*\|(.+)/);
    if (labeled) {
      const strKey = labeled[1];
      const baseMidi = OPEN_MIDI[strKey];
      if (baseMidi !== undefined) extractLineNotes(labeled[2], baseMidi, notes, strKey);
    } else if (/^[-\d]/.test(line)) {
      const str = STRING_ORDER[unlabeledIdx];
      if (str && OPEN_MIDI[str] !== undefined) extractLineNotes(line, OPEN_MIDI[str], notes, str);
      unlabeledIdx++;
    }
  }

  // Sort by column (maintains sequence order)
  notes.sort((a, b) => a.col - b.col);

  // For special patterns: NO GROUPING — each note is separate (each note: its own midi, each is an attack)
  // Each note plays individually at slightly different times (based on column order)
  const ungrouped = notes.map(n => ({ notes: [n.midi], isAttack: true }));
  return ungrouped;
}

// Special parsing for patterns that should bypass transformTab (no string grouping)
function parseTabNotesSpecial(tabStr) {
  // Pour les patterns spéciaux : pas de transformTab, lecture directe
  // Découpe en sections : aller / retour (séparées par ↩)
  const allLines = tabStr.split('\n');
  const sections = [];
  let current = [];
  for (const line of allLines) {
    const trimmed = line.trim();

    // Skip blank lines
    if (trimmed === '') continue;

    if (trimmed.includes('↩') || trimmed.includes('retour')) {
      if (current.length) sections.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) sections.push(current);
  return sections.map(parseSectionSpecial).filter(s => s.length > 0);
}

// Détermine quel son utiliser pour la note actuelle (mode 'auto' = rotation par cycle)
function getActiveSound() {
  const s = SETTINGS.previewSound || 'doux';
  if (s !== 'auto') return s;
  return ['doux','piano','guitare'][(PREVIEW.cycleIdx || 0) % 3];
}

function pluckNote(ctx, masterGain, freq, time, gainMult = 1.0) {
  const env  = ctx.createGain();
  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.connect(env);
  env.connect(masterGain);

  const sound = getActiveSound();
  const nodes = [filt, env];   // tous les nœuds à débrancher en cleanup
  const starts = [];           // callbacks à appeler pour démarrer les sources
  let endTime = time + 1.0;

  if (sound === 'piano') {
    // ── Piano — 5 harmoniques avec decays individuels (fondamentale tient long, aigus s'éteignent vite)
    const harmonics = [
      { mult: 1,    g: 0.50, dec: 1.6 },
      { mult: 2,    g: 0.30, dec: 1.1 },
      { mult: 3,    g: 0.16, dec: 0.75 },
      { mult: 4,    g: 0.09, dec: 0.5 },
      { mult: 5.7,  g: 0.04, dec: 0.3 },  // léger inharmonique pour la couleur
    ];
    filt.frequency.value = Math.min(freq * 9, 6500); filt.Q.value = 0.4;
    let maxDec = 0;
    harmonics.forEach(h => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq * h.mult;
      o.connect(g); g.connect(filt);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(h.g * gainMult, time + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, time + h.dec);
      starts.push(() => { o.start(time); o.stop(time + h.dec + 0.05); });
      nodes.push(o, g);
      if (h.dec > maxDec) maxDec = h.dec;
    });
    env.gain.value = 1;
    endTime = time + maxDec + 0.1;
  }
  else if (sound === 'guitare') {
    // ── Guitare — sawtooth + lowpass + attaque rapide : son corde plumée sans feedback
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = Math.min(freq * 5, 4000);
    lp.Q.value = 1.2;
    osc.connect(lp);
    lp.connect(filt);
    filt.frequency.value = 3500;
    filt.Q.value = 0.5;
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(0.35 * gainMult, time + 0.004);
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.9);
    starts.push(() => { osc.start(time); osc.stop(time + 1.0); });
    nodes.push(osc, lp);
    endTime = time + 1.0;
  }
  else {
    // ── Doux (par défaut) — triangle + sine octave + lowpass : le son original
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = 'triangle'; o1.frequency.value = freq;
    o2.type = 'sine';     o2.frequency.value = freq * 2;
    filt.frequency.value = Math.min(freq * 9, 7000); filt.Q.value = 0.8;
    o1.connect(filt); o2.connect(filt);
    env.gain.setValueAtTime(0.001, time);
    env.gain.linearRampToValueAtTime(0.32 * gainMult, time + 0.004);
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.9);
    starts.push(() => {
      o1.start(time); o1.stop(time + 0.9);
      o2.start(time); o2.stop(time + 0.9);
    });
    nodes.push(o1, o2);
    endTime = time + 0.95;
  }

  starts.forEach(fn => fn());

  // Cleanup retardé — débranche tous les nœuds après la fin du son
  const cleanupMs = Math.max(0, (endTime - ctx.currentTime) * 1000) + 80;
  setTimeout(() => {
    nodes.forEach(n => { try { n.disconnect(); } catch(e){} });
  }, cleanupMs);
}

function previewStop() {
  if (PREVIEW.masterGain && PREVIEW.ctx) {
    const t = PREVIEW.ctx.currentTime;
    PREVIEW.masterGain.gain.cancelScheduledValues(t);
    PREVIEW.masterGain.gain.setValueAtTime(PREVIEW.masterGain.gain.value, t);
    PREVIEW.masterGain.gain.linearRampToValueAtTime(0, t + 0.04);
    // Débranchement retardé pour laisser le fade se terminer
    const mg = PREVIEW.masterGain;
    setTimeout(() => { try { mg.disconnect(); } catch(e){} }, 200);
  }
  // Nullifier immédiatement — empêche scheduleCycle de continuer à utiliser l'ancien nœud
  PREVIEW.masterGain = null;
  if (PREVIEW.timer) { clearTimeout(PREVIEW.timer); PREVIEW.timer = null; }
  // Nettoyer les timeouts du curseur
  (PREVIEW.cursorTimeouts || []).forEach(t => clearTimeout(t));
  PREVIEW.cursorTimeouts = [];
  document.querySelectorAll('.tab-cursor-bar').forEach(el => { el.style.display = 'none'; });
  stopClickLoop();
  stopPulseTicker();
  if (PREVIEW.patId) {
    document.querySelectorAll('[id^="prev-btn-"]').forEach(b => {
      b.innerHTML = previewBtnInner('play');
      b.style.color = '';
    });
    // Remettre le badge tab en état ▶
    const badge = document.getElementById('tab-play-badge-' + PREVIEW.patId);
    if (badge) {
      badge.classList.remove('playing');
      badge.innerHTML = `<svg width="8" height="9" viewBox="0 0 8 9" fill="rgba(255,255,255,.55)"><path d="M0 0l8 4.5L0 9z"/></svg>`;
    }
  }
  commitSessionTrace(PREVIEW.patId); // commit boucles session → trace
  PREVIEW.patId = null;
  // Mode entraînement : réarmer le flag reset → prochain lancement repart du tempo de départ
  if (SETTINGS.trainMode) PREVIEW._trainNeedsReset = true;
  syncHeaderPlay();
}

function togglePreviewSettings() {
  PREVIEW.settingsOpen = !PREVIEW.settingsOpen;
  document.querySelectorAll('.preview-settings-panel').forEach(el => {
    el.style.display = PREVIEW.settingsOpen ? 'flex' : 'none';
  });
  document.querySelectorAll('.settings-toggle-btn').forEach(b => {
    b.style.background  = PREVIEW.settingsOpen ? 'var(--blue)' : 'transparent';
    b.style.color       = PREVIEW.settingsOpen ? '#fff' : 'var(--text2)';
    b.style.borderColor = PREVIEW.settingsOpen ? 'var(--blue)' : 'var(--border)';
  });
}

function togglePreviewClick() {
  PREVIEW.click = !PREVIEW.click;
  document.querySelectorAll('.click-btn').forEach(b => {
    const isHeader = b.classList.contains('h-toggle');
    if (isHeader) {
      b.classList.toggle('on', PREVIEW.click);
    } else {
      b.style.background  = PREVIEW.click ? 'var(--blue)' : 'transparent';
      b.style.color       = PREVIEW.click ? '#fff' : 'var(--text2)';
      b.style.borderColor = PREVIEW.click ? 'var(--blue)' : 'var(--border)';
      b.style.opacity     = PREVIEW.click ? '1' : '.55';
    }
  });
  if (PREVIEW.click && PREVIEW.masterGain) {
    // Synchroniser à la prochaine frontière de temps fort du pattern en cours
    let startT = PREVIEW.ctx.currentTime + 0.01;
    if (PREVIEW.patId && PREVIEW.cycleT0 > 0) {
      const clickInterval = 60 / PREVIEW.bpm; // clic sur le temps (1 par beat)
      const elapsed = PREVIEW.ctx.currentTime - PREVIEW.cycleT0;
      // Prochain temps fort depuis le début du cycle courant
      const n = Math.ceil(elapsed / clickInterval);
      const nextBeat = PREVIEW.cycleT0 + n * clickInterval;
      startT = Math.max(nextBeat, PREVIEW.ctx.currentTime + 0.01);
    }
    startClickLoop(startT);
  } else {
    stopClickLoop();
  }
}

function toggleCountIn() {
  PREVIEW.countIn = !PREVIEW.countIn;
  document.querySelectorAll('.countin-btn').forEach(b => {
    const isHeader = b.classList.contains('h-toggle');
    if (isHeader) {
      b.classList.toggle('on', PREVIEW.countIn);
    } else {
      b.style.background  = PREVIEW.countIn ? 'var(--blue)' : 'transparent';
      b.style.color       = PREVIEW.countIn ? '#fff' : 'var(--text2)';
      b.style.borderColor = PREVIEW.countIn ? 'var(--blue)' : 'var(--border)';
      b.style.opacity     = PREVIEW.countIn ? '1' : '.55';
    }
  });
}

function previewBtnInner(state) {
  if (state === 'play') return `<svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><path d="M0 0l8 5-8 5z"/></svg> Écouter`;
  return `<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect width="10" height="10" rx="1"/></svg> Stop`;
}

function expandFingering(s) {
  return s
    .replace(/\bind\b/g, 'Index')
    .replace(/\bmaj\b/g, 'Majeur')
    .replace(/\bann\b/g, 'Annulaire')
    .replace(/\baur\b/g, 'Auriculaire')
    .replace(/\(surext\.\)/g, '(surextension)')
    .replace(/\(ext\.\)/g, '(extension)')
    .replace(/\(glis\.\)/g, '(glissé)')
    .replace(/\(shift\)/g, '(déplacement)');
}
function reverseFingering(s) {
  return s.split(' + ').reverse().join(' + ');
}

function handSVG(raw) {
  // Main gauche organique — peau, pouce, bouts rouges sur doigts actifs
  const act = k => new RegExp('\\b' + k + '\\b').test(raw);
  const skin  = '#f5c4a0';
  const shade = '#dea078';
  const tip   = k => act(k) ? '#D32F2F' : shade;
  const lbl   = k => act(k) ? '#8b0000' : '#c8b8a8';

  return `<svg width="68" height="104" viewBox="0 0 68 104" style="flex-shrink:0;display:block">
    <!-- Poignet -->
    <path d="M22 84 Q19 100 24 103 Q33 106 44 103 Q48 100 46 84 Z" fill="${shade}"/>
    <!-- Paume -->
    <path d="M10 70 Q7 56 14 50 Q20 47 27 50 L41 50 Q47 47 54 50 Q61 56 58 70 Q55 83 34 86 Q13 83 10 70Z" fill="${skin}"/>
    <!-- Pouce -->
    <path d="M15 57 Q6 54 3 47 Q1 40 5 35 Q9 30 15 34 Q19 39 17 55 Z" fill="${skin}"/>
    <ellipse cx="6" cy="34" rx="5.5" ry="4.5" fill="${shade}"/>
    <!-- Index -->
    <path d="M14 53 Q11 35 13 19 Q15 8 21 8 Q27 8 28 18 Q29 35 27 53 Z" fill="${skin}"/>
    <ellipse cx="21" cy="9" rx="7" ry="5.5" fill="${tip('ind')}"/>
    <!-- Majeur (le plus long) -->
    <path d="M27 53 Q25 30 27 12 Q29 2 34 1 Q39 1 41 11 Q43 30 41 53 Z" fill="${skin}"/>
    <ellipse cx="34" cy="2.5" rx="7.5" ry="6" fill="${tip('maj')}"/>
    <!-- Annulaire -->
    <path d="M41 53 Q39 32 41 17 Q43 7 48 7 Q53 7 54 17 Q55 32 53 53 Z" fill="${skin}"/>
    <ellipse cx="48" cy="8" rx="7" ry="5.5" fill="${tip('ann')}"/>
    <!-- Auriculaire (le plus court) -->
    <path d="M53 53 Q52 40 54 29 Q56 20 61 20 Q66 20 67 28 Q68 39 66 53 Z" fill="${skin}"/>
    <ellipse cx="60" cy="21" rx="6" ry="5" fill="${tip('aur')}"/>
    <!-- Lignes de paume (subtiles) -->
    <path d="M18 71 Q30 66 46 70" stroke="${shade}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M24 78 Q33 76 42 78" stroke="${shade}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".45"/>
    <!-- Labels doigts -->
    <text x="21" y="47" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="8" font-weight="700" fill="${lbl('ind')}">I</text>
    <text x="34" y="47" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="8" font-weight="700" fill="${lbl('maj')}">M</text>
    <text x="48" y="47" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="8" font-weight="700" fill="${lbl('ann')}">A</text>
    <text x="60" y="47" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="8" font-weight="700" fill="${lbl('aur')}">P</text>
  </svg>`;
}

function toggleAllerPlusLoin(id) {
  const el  = document.getElementById('apl-' + id);
  const btn = document.getElementById('apl-btn-' + id);
  if (!el) return;
  const opening = el.style.display === 'none';
  el.style.display  = opening ? 'block' : 'none';
  if (btn) btn.innerHTML = opening ? 'Aller plus loin <span style="font-size:9px">▾</span>' : 'Aller plus loin <span style="font-size:9px">▸</span>';
}

function spdButtons() {
  const s = 'font-size:11px;font-weight:500;padding:4px 10px;border-radius:10px;border:1px solid;cursor:pointer;transition:all .15s;';
  const presets = [40,80,120].map(b => {
    const active = PREVIEW.bpm === b;
    return `<button class="spd-btn" data-bpm="${b}" onclick="setPreviewBpm(${b})"
      style="${s}background:${active?'var(--blue)':'transparent'};color:${active?'#fff':'var(--text2)'};border-color:${active?'var(--blue)':'var(--border)'}">
      ${b}</button>`;
  }).join('');
  const isCustom = ![40,80,120].includes(PREVIEW.bpm);
  const sep = `<span style="color:var(--border);font-size:13px;font-weight:300;margin:0 3px;align-self:center;line-height:1">/</span>`;
  const custom = `<input class="spd-custom" type="number" min="10" max="200" value="${PREVIEW.bpm}"
    title="Tempo libre"
    style="width:46px;font-size:11px;font-weight:600;padding:4px 5px;border-radius:10px;border:1px solid;
      text-align:center;transition:all .15s;-moz-appearance:textfield;
      background:${isCustom?'var(--blue)':'transparent'};
      color:${isCustom?'#fff':'var(--text2)'};
      border-color:${isCustom?'var(--blue)':'var(--border)'}"
    onkeydown="if(event.key==='Enter'){const v=Math.max(10,Math.min(200,parseInt(this.value)||80));setPreviewBpm(v);this.blur()}"
    onblur="const v=Math.max(10,Math.min(200,parseInt(this.value)||80));if(v!==PREVIEW.bpm)setPreviewBpm(v)">`;
  return presets + sep + custom;
}

// ─── SYMBOLES MÉDIATOR ────────────────────────────────────────────────────────
function tabWithSymbols(tabStr, interp) {
  const lines = tabStr.split('\n');
  const isStrLine = l => /^[eEBGDA]\s*\|/.test(l) || /^[-\d]/.test(l);
  const STR_ORDER = ['e','B','G','D','A','E'];
  const output = [];
  let i = 0;
  let globalIdx = 0;

  while (i < lines.length) {
    if (isStrLine(lines[i])) {
      // ── Collecter le bloc ──────────────────────────────────────────────────
      const block = [];
      while (i < lines.length && isStrLine(lines[i])) {
        block.push(lines[i]);
        i++;
      }

      // ── Ramasser notes de TOUTES les cordes avec leur corde d'origine ─────
      const allNotes = [];
      block.forEach((line, li) => {
        const m = line.match(/^([eEBGDA])\s*\|(.+)/);
        const strKey  = m ? m[1] : `_${li}`;
        const content = m ? m[2] : line;
        let j = 0;
        while (j < content.length) {
          if (/\d/.test(content[j])) {
            allNotes.push({ col: j, strKey });
            while (j < content.length && /\d/.test(content[j])) j++;
          } else j++;
        }
      });

      // Grouper par colonne (même col = même temps)
      const byCol = {};
      allNotes.forEach(n => { (byCol[n.col] = byCol[n.col] || []).push(n.strKey); });
      const beats = Object.keys(byCol).map(Number).sort((a, b) => a - b);

      // ── Construire la ligne de symboles ───────────────────────────────────
      const fm = block[0].match(/^([eEBGDA])\s*\|(.+)/);
      const prefixLen  = fm ? (fm[0].indexOf('|') + 1) : 0;
      const contentLen = fm ? fm[2].length : Math.max(...block.map(l => l.length));

      let sym = ' '.repeat(contentLen);
      let prevStr = null;
      beats.forEach((col, j) => {
        // Corde principale à ce temps (ordre d'affichage de la tab)
        const primaryStr = byCol[col].sort(
          (a, b) => (STR_ORDER.indexOf(a) + 99) % 99 - (STR_ORDER.indexOf(b) + 99) % 99
        )[0];

        let s = ' ';
        if (interp === 'Up')   s = (globalIdx + j) % 2 === 0 ? '↑' : '↓';
        if (interp === 'Down') s = (globalIdx + j) % 2 === 0 ? '↓' : '↑';
        if (interp === 'Leg')  s = primaryStr !== prevStr ? '↓' : ' ';

        prevStr = primaryStr;
        if (col < sym.length) sym = sym.substring(0, col) + s + sym.substring(col + 1);
      });

      output.push(' '.repeat(prefixLen) + sym);
      globalIdx += beats.length;
      block.forEach(l => output.push(l));
    } else {
      output.push(lines[i]);
      i++;
    }
  }

  // Coloriser les flèches médiator en orange (post-processing HTML)
  return output.join('\n')
    .replace(/↑/g, '<span style="color:var(--orange)">↑</span>')
    .replace(/↓/g, '<span style="color:#5BAEC4">↓</span>');
}

function interpButtons(vertical) {
  const base = `font-size:11px;font-weight:600;border:1px solid;cursor:pointer;transition:all .15s;text-align:left;`;
  const vs = vertical
    ? `${base}padding:5px 10px;border-radius:8px;width:100%;display:block;white-space:nowrap;`
    : `${base}padding:3px 10px;border-radius:20px;`;
  return INTERPS.map(key => {
    const active = PREVIEW.interp === key;
    return `<button class="interp-btn" data-interp="${key}" onclick="setPreviewInterp('${key}')"
      style="${vs}background:${active?'var(--blue)':'transparent'};color:${active?'#fff':'var(--text2)'};border-color:${active?'var(--blue)':'var(--border)'}">
      ${INTERP_LABELS[key]}</button>`;
  }).join('');
}

function setPreviewInterp(interp) {
  PREVIEW.interp = interp;
  // Boutons Interp (Patterns + Parcours)
  document.querySelectorAll('.interp-btn').forEach(b => {
    const active = b.dataset.interp === interp;
    b.style.background  = active ? 'var(--blue)' : 'transparent';
    b.style.color       = active ? '#fff' : 'var(--text2)';
    b.style.borderColor = active ? 'var(--blue)' : 'var(--border)';
  });
  // Headers de colonne dans la grille Progression
  document.querySelectorAll('[data-interp-th]').forEach(th => {
    const active = th.dataset.interpTh === interp;
    th.style.background = active ? 'var(--orange)' : 'var(--blue)';
    th.style.color      = active ? '#fff' : 'rgba(255,255,255,.75)';
    th.style.boxShadow  = 'none';
    th.textContent      = INTERP_LABELS[th.dataset.interpTh];
  });
  // Rafraîchir toutes les tabs visibles sans re-render
  document.querySelectorAll('[data-tab-id]').forEach(pre => {
    const pat = PATTERNS.find(p => p.id === pre.dataset.tabId);
    if (pat) {
      // Ne pas transformer: patterns statiques OU patterns classiques en high neck (tabHigh a déjà +7)
      const rawTab = getEffectiveTab(getTabForNeckPosition(pat));
      const isClassicHighNeck = (pat.tabMid && pat.tabHigh && SETTINGS.neckPosition === 'high');
      const tabContent = cleanTabDisplay(isStaticNeckTab(pat) || isClassicHighNeck ? rawTab : transformTab(rawTab, pre.dataset.tabId));
      pre.innerHTML = tabWithSymbols(tabContent, interp);
    }
  });
}

function setPreviewBpm(bpm) {
  PREVIEW.bpm = bpm;
  // Sync header BPM
  HCTRL.bpm = bpm;
  const hbpm = document.getElementById('header-bpm-val');
  if (hbpm) hbpm.textContent = bpm;
  // Boutons préréglés
  document.querySelectorAll('.spd-btn').forEach(b => {
    const active = parseInt(b.dataset.bpm) === bpm;
    b.style.background  = active ? 'var(--blue)' : 'transparent';
    b.style.color       = active ? '#fff' : 'var(--text2)';
    b.style.borderColor = active ? 'var(--blue)' : 'var(--border)';
  });
  // Champ libre — se met en bleu si la valeur est hors préréglages
  const isCustom = ![40,80,120].includes(bpm);
  document.querySelectorAll('.spd-custom').forEach(inp => {
    inp.value = bpm;
    inp.style.background  = isCustom ? 'var(--blue)' : 'transparent';
    inp.style.color       = isCustom ? '#fff' : 'var(--text2)';
    inp.style.borderColor = isCustom ? 'var(--blue)' : 'var(--border)';
  });
  // Redémarre la lecture au nouveau tempo si un pattern joue
  if (PREVIEW.patId) {
    const id = PREVIEW.patId;
    previewStop();
    setTimeout(() => previewPlay(id), 40);
  }
}

// ─── TRAINING MODE — incrémentation BPM silencieuse (sans relancer l'audio) ──
// nextCycleT : timestamp Web Audio du début du prochain cycle → resync le click
function trainBpmIncrement(nextCycleT) {
  if (PREVIEW._trainPyramidePhase === undefined) {
    PREVIEW._trainPyramidePhase = 1; // 1 = montée, -1 = descente
  }

  let newBpm = PREVIEW.bpm;

  if (SETTINGS.trainPyramide) {
    // Mode pyramide : monte jusqu'au max, puis redescend
    if (PREVIEW._trainPyramidePhase === 1) {
      // Phase montée
      newBpm = Math.min(PREVIEW.bpm + SETTINGS.trainBpmStep, SETTINGS.trainBpmMax);
      if (newBpm >= SETTINGS.trainBpmMax) {
        PREVIEW._trainPyramidePhase = -1; // Basculer en descente
      }
    } else {
      // Phase descente
      newBpm = Math.max(PREVIEW.bpm - SETTINGS.trainBpmStep, SETTINGS.trainBpmStart);
      if (newBpm <= SETTINGS.trainBpmStart) {
        PREVIEW._trainPyramidePhase = 1; // Revenir en montée
      }
    }
  } else {
    // Mode normal : juste monter jusqu'au max
    newBpm = Math.min(PREVIEW.bpm + SETTINGS.trainBpmStep, SETTINGS.trainBpmMax);
  }

  if (newBpm === PREVIEW.bpm) return; // pas de changement
  PREVIEW.bpm = newBpm;
  HCTRL.bpm   = newBpm;
  // Feedback visuel : header BPM flashe en orange
  const hbpm = document.getElementById('header-bpm-val');
  if (hbpm) {
    hbpm.textContent = newBpm;
    hbpm.style.transition = 'color .15s';
    hbpm.style.color = 'var(--orange)';
    setTimeout(() => { if (hbpm) { hbpm.style.color = ''; syncTrainModeUI(); } }, 900);
  }
  // Sync champs BPM sans relancer la lecture
  document.querySelectorAll('.spd-custom').forEach(inp => { inp.value = newBpm; });
  document.querySelectorAll('.spd-btn').forEach(b => {
    const active = parseInt(b.dataset.bpm) === newBpm;
    b.style.background  = active ? 'var(--blue)' : 'transparent';
    b.style.color       = active ? '#fff'         : 'var(--text2)';
    b.style.borderColor = active ? 'var(--blue)'  : 'var(--border)';
  });
  // Resync le click loop ET la pastille pulse exactement à la frontière du prochain cycle
  // → évite le décalage entre clic/pulse et notes quand le tempo change
  const resyncT = nextCycleT || PREVIEW.ctx.currentTime + 0.05;
  if (PREVIEW.click && PREVIEW.masterGain && PREVIEW.ctx) {
    stopClickLoop();
    startClickLoop(resyncT);
  }
  stopPulseTicker();
  startPulseTicker(resyncT);
  // Mise à jour trace — nouveau BPM max éventuel (global + libre/entraînement)
  if (PREVIEW.patId) {
    const t = PAT_TRACE[PREVIEW.patId] || { lastPlayed: 0, maxBpm: 0, totalLoops: 0 };
    let changed = false;
    if (newBpm > (t.maxBpm || 0)) { t.maxBpm = newBpm; changed = true; }
    if (!SETTINGS.trainMode) {
      if (newBpm > (t.freeMaxBpm || 0)) { t.freeMaxBpm = newBpm; changed = true; }
    } else {
      if (newBpm > (t.trainMax || 0)) { t.trainMax = newBpm; changed = true; }
    }
    if (changed) {
      PAT_TRACE[PREVIEW.patId] = t;
      savePatTrace();
      updatePatTraceDisplay(PREVIEW.patId);
      updateTrainDisplay(PREVIEW.patId);
    }
  }
}

function scheduleClick(ctx, t) {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.connect(env); env.connect(PREVIEW.masterGain);
  osc.type = 'square';
  osc.frequency.value = 900;
  const cg = (SETTINGS.clickVolume || 60) * 0.006; // 60 → 0.36
  env.gain.setValueAtTime(cg, t);
  env.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
  osc.start(t); osc.stop(t + 0.04);
  osc.onended = () => { try { osc.disconnect(); env.disconnect(); } catch(e){} };
}

function startClickLoop(t0) {
  if (PREVIEW.clickTimer) { clearTimeout(PREVIEW.clickTimer); PREVIEW.clickTimer = null; }
  if (!PREVIEW.click || !PREVIEW.masterGain) return;
  const ctx = PREVIEW.ctx;
  // Clic toujours sur le temps (1 par beat), indépendamment de la subdivision de lecture
  const clickInterval = 60 / PREVIEW.bpm;
  const safeT = Math.max(t0, ctx.currentTime + 0.01);
  scheduleClick(ctx, safeT);
  const nextT = safeT + clickInterval;
  const delay = Math.max(0, (nextT - ctx.currentTime - 0.05) * 1000);
  PREVIEW.clickTimer = setTimeout(() => startClickLoop(nextT), delay);
}

function stopClickLoop() {
  if (PREVIEW.clickTimer) { clearTimeout(PREVIEW.clickTimer); PREVIEW.clickTimer = null; }
}

// ── Pastille pulse visuelle — clignote sur chaque temps (indép. du clic audio) ──
function startPulseTicker(t0) {
  if (PREVIEW.pulseTimer) { clearTimeout(PREVIEW.pulseTimer); PREVIEW.pulseTimer = null; }
  if (!PREVIEW.masterGain) return;
  const ctx = PREVIEW.ctx;
  const beatInterval = 60 / PREVIEW.bpm; // un temps = noire
  const safeT = Math.max(t0, ctx.currentTime + 0.005);
  const delay = Math.max(0, (safeT - ctx.currentTime) * 1000);
  PREVIEW.pulseTimer = setTimeout(() => {
    const dot = document.getElementById('header-pulse');
    if (dot) {
      dot.classList.add('flash');
      setTimeout(() => dot.classList.remove('flash'), 90);
    }
    startPulseTicker(safeT + beatInterval);
  }, delay);
}

function stopPulseTicker() {
  if (PREVIEW.pulseTimer) { clearTimeout(PREVIEW.pulseTimer); PREVIEW.pulseTimer = null; }
  const dot = document.getElementById('header-pulse');
  if (dot) dot.classList.remove('flash');
}

// ── Long press sur le bouton Clic ───────────────────────────────────────────


// ── Long press sur le logo/titre — masquer/afficher les onglets ────────────────
let _navHidePressTimer = null;
let _navHideLongFired  = false;

// ─── LONG PRESS SUR L'ENGRENAGE → popup export/import ────────────────────────
let _gearPressTimer = null;
let _gearLongFired  = false;

function gearPressStart(e) {
  _gearLongFired = false;
  _gearPressTimer = setTimeout(() => {
    _gearLongFired = true;
    showGearPopup();
  }, 480);
}
function gearPressEnd(e) {
  clearTimeout(_gearPressTimer);
  _gearPressTimer = null;
  if (_gearLongFired) e.preventDefault(); // annule le onclick si long press
}
function gearPressCancel() {
  clearTimeout(_gearPressTimer);
  _gearPressTimer = null;
}

function showGearPopup() {
  if (document.getElementById('gear-popup')) return;
  const btn = document.getElementById('gear-btn');
  const rect = btn ? btn.getBoundingClientRect() : { right: window.innerWidth - 12, top: 50 };
  const popup = document.createElement('div');
  popup.id = 'gear-popup';
  popup.style.cssText = `
    position:fixed;top:${rect.bottom + 6}px;right:${window.innerWidth - rect.right}px;
    background:#1F2D33;color:#F4EEE2;border-radius:12px;
    box-shadow:0 4px 20px rgba(0,0,0,.35);z-index:9999;
    min-width:180px;overflow:hidden;animation:fadeInDown .15s ease`;
  popup.innerHTML = `
    <div style="padding:10px 14px 6px;font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;opacity:.5">Sauvegarde</div>
    <button onclick="event.stopPropagation();doExportJSON();closeGearPopup()"
      style="display:block;width:100%;text-align:left;padding:11px 16px;background:transparent;color:#F4EEE2;
        border:none;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:.1px">
      ↓ &nbsp;Télécharger (JSON)
    </button>
    <button onclick="event.stopPropagation();doImportJSON();closeGearPopup()"
      style="display:block;width:100%;text-align:left;padding:11px 16px;background:transparent;color:#F4EEE2;
        border:none;font-size:13px;font-weight:600;cursor:pointer;border-top:1px solid rgba(244,238,226,.1);letter-spacing:.1px">
      ↑ &nbsp;Charger (JSON)
    </button>`;
  document.body.appendChild(popup);
  popup.addEventListener('touchstart', e => e.stopPropagation(), true);
  popup.addEventListener('mousedown',  e => e.stopPropagation(), true);
  setTimeout(() => document.addEventListener('touchstart', closeGearPopup, { once:true, passive:true }), 50);
  setTimeout(() => document.addEventListener('mousedown',  closeGearPopup, { once:true }), 50);
}

function closeGearPopup() {
  const el = document.getElementById('gear-popup');
  if (el) el.remove();
}

function navHidePressStart(e) {
  // Ne pas bloquer les événements normaux (permet de scroller si besoin)
  _navHideLongFired = false;
  _navHidePressTimer = setTimeout(() => {
    _navHideLongFired = true;
    toggleNavVisibility();
  }, 480);
}
function navHidePressEnd(e) {
  clearTimeout(_navHidePressTimer);
  _navHidePressTimer = null;
  // Pas d'action sur tap court — le logo n'a pas d'autre fonction
}
function navHidePressCancel() {
  clearTimeout(_navHidePressTimer);
  _navHidePressTimer = null;
}

function toggleNavVisibility() {
  SETTINGS.navHidden = !SETTINGS.navHidden;
  applyNavHidden();
  saveSettings();
  // Feedback haptique discret
  if (navigator.vibrate) navigator.vibrate(SETTINGS.navHidden ? [8,40,8] : 8);
}

function applyNavHidden() {
  document.body.classList.toggle('nav-hidden', !!SETTINGS.navHidden);
}

function setClickSubdiv(n) {
  SETTINGS.clickSubdiv = n;
  PREVIEW.clickNotes = n;
  saveSettings();
  syncSubdivUI();
  if (PREVIEW.click && PREVIEW.masterGain) {
    stopClickLoop();
    startClickLoop(PREVIEW.ctx.currentTime);
  }
}

function syncSubdivUI() {
  const n = SETTINGS.clickSubdiv;
  // Chips dans les réglages (fond clair)
  document.querySelectorAll('.subdiv-btn').forEach(b => {
    const active = parseInt(b.dataset.subdiv) === n;
    b.style.background  = active ? 'var(--green)'  : 'rgba(28,45,51,.07)';
    b.style.color       = active ? '#fff'           : 'var(--text2)';
    b.style.borderColor = active ? 'var(--green)'  : 'rgba(28,45,51,.18)';
    b.style.fontWeight  = active ? '800'            : '700';
  });
  // Bouton cycle subdivision dans le header — couleur propre à chaque valeur
  const SUBDIV_COL = {
    2: '#1a7fa6',  // teal bleu  — croches
    3: '#56864A',  // vert       — triolets
    4: '#C8952A',  // or ambré   — doubles croches (standard)
    6: '#7B5EA7',  // violet     — sextolets
  };
  const cycleBtn = document.getElementById('subdiv-cycle-btn');
  if (cycleBtn) {
    const col = SUBDIV_COL[n] || 'rgba(244,238,226,.08)';
    cycleBtn.textContent    = `÷${n}`;
    cycleBtn.style.background   = col;
    cycleBtn.style.borderColor  = col;
    cycleBtn.style.color        = '#fff';
  }
}

// Calcule le décalage temporel d'une note selon le mode shuffle
// Shuffle 0.67 (triolet) : les notes impaires sont décalées vers l'arrière (longue-courte)
function noteOffset(i, sx) {
  if (!SETTINGS.shuffleMode) return i * sx;
  return Math.floor(i / 2) * 2 * sx + (i % 2 === 0 ? 0 : 2 * 0.67 * sx);
}

function scheduleCycle(ctx, cycle, t0, patId) {
  if (!PREVIEW.masterGain) return; // déjà stoppé
  // La subdivision détermine la vitesse de lecture : n notes par temps
  // n=4 (double croche) = vitesse standard, n=2 = moitié vitesse, n=6 = 1.5× vitesse
  const sixteenth = 60 / (PREVIEW.bpm * (PREVIEW.clickNotes || 4));
  // Recaler t0 si le setTimeout a tardé (évite la dérive de tempo)
  const safeT0 = Math.max(t0, ctx.currentTime + 0.01);
  PREVIEW.cycleT0 = safeT0; // mémorise le début du cycle courant pour sync click
  cycle.forEach(({ notes, isAttack }, i) => {
    const gainMult = PREVIEW.interp === 'Leg'
      ? (isAttack ? 1.5 : 0.62)
      : 1.0;
    notes.forEach(midi => {
      pluckNote(ctx, PREVIEW.masterGain, freq440(midi), safeT0 + noteOffset(i, sixteenth), gainMult);
    });
  });
  // Incrémente les compteurs de cycles
  PREVIEW.cycleIdx     = (PREVIEW.cycleIdx    || 0) + 1;
  PREVIEW.sessionLoops = (PREVIEW.sessionLoops || 0) + 1;
  const nextT0 = safeT0 + cycle.length * sixteenth;
  const delay  = Math.max(0, (nextT0 - ctx.currentTime - 0.08) * 1000);
  PREVIEW.timer = setTimeout(() => {
    if (PREVIEW.patId !== patId || !PREVIEW.masterGain) return;
    // Training : check APRÈS N boucles entendues (pas au lancement du 1er cycle)
    if (SETTINGS.trainMode && PREVIEW.sessionLoops % SETTINGS.trainLoopEvery === 0) {
      trainBpmIncrement(nextT0); // nextT0 = frontière du prochain cycle → resync click
    }
    scheduleCycle(ctx, cycle, nextT0, patId);
  }, delay);
}

function freq440(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

// Son de clic satisfaisant au cocher une case
function checkSound(isDone) {
  if (navigator.vibrate) navigator.vibrate(isDone ? 12 : 5);
  try {
    const ctx = previewCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = isDone ? 1047 : 660;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isDone ? 0.22 : 0.08));
    osc.start(t); osc.stop(t + (isDone ? 0.23 : 0.09));
  } catch(e) { console.warn('pluckNote:', e); }
}

// ── Sélectionner le bon tab selon la position du manche ──
function getTabForNeckPosition(pat) {
  if (pat.tabMid && pat.tabHigh) {
    return SETTINGS.neckPosition === 'high' ? pat.tabHigh : pat.tabMid;
  }
  return pat.tab;
}

// ── Retourner le tab sans transformation supplémentaire ──
function getEffectiveTab(tabStr) {
  return tabStr;
}

function previewPlay(patId) {
  if (PREVIEW.patId === patId) { previewStop(); return; }
  if (METRO.running) metroStop();
  previewStop();
  const pat = PATTERNS.find(p => p.id === patId);
  if (!pat) return;
  // ── Loop étendu : utilise le tab étendu pour l'audio ─────────────────────────
  const effectiveTabStr = getEffectiveTab(getTabForNeckPosition(pat));
  // Ne pas transformer: patterns statiques (B6P1a/b/c) OU patterns classiques en high neck (tabHigh a déjà +7)
  const isClassicPatternHighNeck = (pat.tabMid && pat.tabHigh && SETTINGS.neckPosition === 'high');
  const shouldTransform = !isStaticNeckTab(pat) && !isClassicPatternHighNeck;
  const tabForParsing = shouldTransform ? transformTab(effectiveTabStr, patId) : effectiveTabStr;
  const sections = (pat.special) ? parseTabNotesSpecial(tabForParsing) : parseTabNotes(tabForParsing, patId);
  if (!sections.length) return;
  const cycle = sections.flat();
  if (!cycle.length) return;

  const ctx = previewCtx();
  PREVIEW.masterGain = ctx.createGain();
  PREVIEW.masterGain.gain.value = (SETTINGS.patVolume || 75) * 0.02; // 75 → ×1.5
  PREVIEW.masterGain.connect(ctx.destination);
  PREVIEW.patId = patId;
  PREVIEW.cycleIdx    = 0;  // reset pour le mode son 'auto'
  PREVIEW.sessionLoops = 0; // reset compteur boucles (trace + training)
  PREVIEW.clickNotes  = SETTINGS.clickSubdiv || 4;
  recordPatPlay(patId);

  // Sync header — le header est maître du BPM
  // Mode entraînement : reset vers le tempo de départ SEULEMENT si le flag est actif
  // (flag positionné par toggleTrainMode, pas à chaque lancement de pattern)
  if (SETTINGS.trainMode === true && PREVIEW._trainNeedsReset === true) {
    HCTRL.bpm = SETTINGS.trainBpmStart;
    PREVIEW._trainNeedsReset = false;
    PREVIEW._trainPyramidePhase = 1; // Réinitialiser la phase pyramide en montée
  }
  HCTRL.mode = 'preview';
  HCTRL.patId = patId;
  HCTRL.patName = pat.id;
  PREVIEW.bpm = HCTRL.bpm;   // on écrase PREVIEW.bpm avec la valeur du header
  const hbpmEl = document.getElementById('header-bpm-val');
  if (hbpmEl) hbpmEl.textContent = HCTRL.bpm;
  syncHeaderPlay();

  const btn = document.getElementById('prev-btn-' + patId);
  if (btn) { btn.innerHTML = previewBtnInner('stop'); btn.style.color = 'var(--red)'; }

  // Mettre à jour le badge tab en état ⏸
  const badge = document.getElementById('tab-play-badge-' + patId);
  if (badge) {
    badge.classList.add('playing');
    badge.innerHTML = `<svg width="9" height="9" viewBox="0 0 9 9" fill="rgba(255,255,255,.9)"><rect width="4" height="9" rx=".8"/><rect x="5" width="4" height="9" rx=".8"/></svg>`;
  }

  // ─ Décompte 4 temps avant le pattern ─
  const quarter = 60 / PREVIEW.bpm;
  // Sous 60 BPM le décompte bat en double pour ne pas faire attendre
  const countInQuarter = PREVIEW.bpm < 60 ? quarter / 2 : quarter;
  const t0 = ctx.currentTime + 0.08;
  if (PREVIEW.countIn) {
    for (let i = 0; i < 4; i++) {
      const t   = t0 + i * countInQuarter;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.connect(env); env.connect(PREVIEW.masterGain);
      osc.type = 'square';
      osc.frequency.value = i === 0 ? 1200 : 900;
      env.gain.setValueAtTime(0.14, t);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.start(t); osc.stop(t + 0.05);
      osc.onended = () => { try { osc.disconnect(); env.disconnect(); } catch(e){} };
    }
  }
  const patStart = t0 + (PREVIEW.countIn ? 4 * countInQuarter : 0);
  scheduleCycle(ctx, cycle, patStart, patId);
  if (PREVIEW.click) startClickLoop(patStart);
  startPulseTicker(patStart);

  // ── Curseur tab — version N-sections (fonctionne pour base ET loop étendu) ──
  // Ne pas transformer: patterns statiques (B6P1a/b/c) OU patterns classiques en high neck (tabHigh a déjà +7)
  const effectiveTabForCursor = getEffectiveTab(getTabForNeckPosition(pat));
  const isClassicPatternHighNeckCursor = (pat.tabMid && pat.tabHigh && SETTINGS.neckPosition === 'high');
  const shouldTransformCursor = !isStaticNeckTab(pat) && !isClassicPatternHighNeckCursor;
  const tabForCursor = shouldTransformCursor ? transformTab(effectiveTabForCursor, patId) : effectiveTabForCursor;
  const cursorSections = (pat.special) ? parseTabForCursorSpecial(tabForCursor) : parseTabForCursor(tabForCursor, patId);
  if (cursorSections.length > 0) {
    const preEl    = document.getElementById('tab-pre-' + patId);
    const monteeEl = document.getElementById('tab-cursor-montee-' + patId);
    const retourEl = document.getElementById('tab-cursor-retour-' + patId);
    if (preEl && monteeEl) {
      const charW      = measurePreCharWidth(preEl);
      const preOffsetX = preEl.offsetLeft;
      const lineH      = parseFloat(getComputedStyle(preEl).lineHeight) || 19.2;
      const topOffset  = preEl.offsetTop;
      const sixteenth  = 60 / (PREVIEW.bpm * (PREVIEW.clickNotes || 4));

      // On n'utilise qu'une seule barre (monteeEl), repositionnée à chaque étape
      if (retourEl) retourEl.style.display = 'none';

      // ── Calculer (startLine, lineCount) pour chaque section du texte rendu ──
      // Les séparateurs "↩ retour +k" / "↩ montée +k" occupent chacun 1 ligne
      const textLines = preEl.textContent.split('\n');
      const secLineStarts  = [];
      const secLineCounts  = [];
      let curStart = 0, curCount = 0;
      for (let li = 0; li < textLines.length; li++) {
        if (textLines[li].includes('↩')) {
          secLineStarts.push(curStart);
          secLineCounts.push(curCount);
          curStart = li + 1;
          curCount = 0;
        } else {
          curCount++;
        }
      }
      secLineStarts.push(curStart);
      secLineCounts.push(curCount);

      // ── Construire la liste plate des étapes {x, top, height, col, topLine, lineCount} ─
      const steps = [];
      for (let s = 0; s < cursorSections.length; s++) {
        const lineStart = secLineStarts[s] ?? 0;
        const lineCount = secLineCounts[s] ?? 6;
        const sTop    = topOffset + lineStart * lineH;
        const sHeight = lineCount * lineH;
        for (const col of cursorSections[s].cols) {
          steps.push({ x: preOffsetX + col * charW, top: sTop, height: sHeight,
                       col, topLine: lineStart, lineCount });
        }
      }

      if (steps.length > 0) {
        const totalSteps = steps.length;

        // Position initiale
        monteeEl.style.left   = steps[0].x + 'px';
        monteeEl.style.top    = steps[0].top + 'px';
        monteeEl.style.height = steps[0].height + 'px';
        monteeEl.style.bottom = 'auto';
        monteeEl.style.display = 'block';

        function scheduleCursorCycle(t0Cursor) {
          if (PREVIEW.patId !== patId || !PREVIEW.masterGain) return;

          // Recalculer sixteenth à chaque cycle — suit les changements de BPM (training mode) ET de subdivision
          const sx = 60 / (PREVIEW.bpm * (PREVIEW.clickNotes || 4));

          steps.forEach((step, i) => {
            const delay = Math.max(0, (t0Cursor + noteOffset(i, sx) - ctx.currentTime) * 1000);
            const tid = setTimeout(() => {
              if (PREVIEW.patId !== patId) return;
              const bar = document.getElementById('tab-cursor-montee-' + patId);
              if (bar) {
                const prevTop = bar.style.top;
                bar.style.left   = step.x      + 'px';
                bar.style.top    = step.top    + 'px';
                bar.style.height = step.height + 'px';
                bar.style.display = 'block';
                // autoscroll vertical si changement de section
                if (prevTop !== step.top + 'px') {
                  bar.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                // autoscroll horizontal — garde le curseur visible dans .tab-wrap
                const wrap = bar.parentElement;
                if (wrap) {
                  const margin = 32;
                  const cursorX = step.x;
                  const wLeft   = wrap.scrollLeft;
                  const wWidth  = wrap.clientWidth;
                  if (cursorX < wLeft + margin) {
                    wrap.scrollLeft = Math.max(0, cursorX - margin);
                  } else if (cursorX > wLeft + wWidth - margin) {
                    wrap.scrollLeft = cursorX - wWidth + margin + margin;
                  }
                }
              }
            }, delay);
            PREVIEW.cursorTimeouts.push(tid);
          });

          // Relancer le cycle suivant — durée calculée avec le BPM courant
          const nextT = t0Cursor + totalSteps * sx;
          const reschedDelay = Math.max(0, (nextT - ctx.currentTime - 0.05) * 1000);
          const rt = setTimeout(() => scheduleCursorCycle(nextT), reschedDelay);
          PREVIEW.cursorTimeouts.push(rt);
        }

        scheduleCursorCycle(patStart);
      }
    }
  }
}

// ─── BIP FEEDBACK ──────────────────────────────────────────────────────────────
function playBip() {
  try {
    const ctx = METRO.ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const time = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.start(time);
    osc.stop(time + 0.08);
  } catch(e) { console.warn('playBip error:', e); }
}


