// ─── STATE ────────────────────────────────────────────────────────────────────
// Extrait de index.html lors du refactor v1.15
// Contient : state, SETTINGS, constantes cordes, load/save localStorage,
//            getProgressKey, getPatternPct, getGroupPct
// Dépendances : PATTERNS (data.js), TEMPOS/INTERPS (data.js)
// ─────────────────────────────────────────────────────────────────────────────

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  tab: 'parcours',
  filter: 'all',
  diffFilter: 'all',
  openCards: {},
  progress: {},
  favorites: {},
  pimtDone: {},  // doigtés pimenter complétés (pattern.id + '__pimN')
  parcoursOpen: null,
  etapeOpen: {},   // accordéon par numéro d'étape
  cardDir: {},   // direction active par groupe, ex: {'A4P1b':'U'}
  dailyChallengeOpen: true,  // accordéon challenge du jour (ouvert par défaut)
};

// ─── SETTINGS (cordes / son / case de départ) ────────────────────────────────
// Ordre canonique des cordes (top→bottom dans le tab)
const STRING_LINES = ['e','B','G','D','A','E'];
// Décalage en lignes : DGBE = 0 (pattern sur cordes 1-4 : e,B,G,D)
//                     ADGB = +1 (pattern descendu d'1 ligne : B,G,D,A)
//                     EADG = +2 (pattern descendu de 2 lignes : G,D,A,E)
const STRING_SHIFTS = { DGBE: 0, ADGB: 1, EADG: 2 };

const PREVIEW_SOUND_KEYS = ['doux','piano','guitare'];
const PREVIEW_SOUND_LABELS = { doux:'Doux', piano:'Piano', guitare:'Guitare' };

const SETTINGS = {
  stringGroup: 'DGBE',     // 'DGBE' | 'ADGB' | 'EADG'
  previewSound: 'doux',    // 'doux' | 'piano' | 'guitare' | 'auto'
  neckPosition: 'mid',     // 'mid' (case 5, offset 0) | 'high' (case 12, offset 7)
  clickSubdiv: 4,          // 2 | 3 | 4 | 6 — subdivision du clic
  navHidden: false,        // true = nav masquée (portrait + paysage), togglé par long press logo
  loopExt: 0,              // 0 = base · −1 = retour même niveau · +N = extension pyramide
  trainMode: false,        // mode entraînement progressif
  trainBpmStart: 40,       // tempo de départ — appliqué à chaque lancement en mode entraînement
  trainBpmStep: 5,         // +N BPM par incrément (1-5)
  trainLoopEvery: 1,       // incrémenter toutes les N boucles (1-5)
  trainBpmMax: 120,        // tempo plafond (arrêt des incréments)
  trainPyramide: false,    // mode pyramide : redescend après atteindre le max
  tempoPresets: { lent: 40, cool: 70, chaud: 100 },  // BPM presets pour chaque zone
  patVolume: 75,             // 0–100 → gain tablature (75 ≈ ×1.5)
  clickVolume: 60,           // 0–100 → gain clic métronome (60 ≈ ×0.36)
};

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('dicoSettings') || '{}');
    if (s.stringGroup && STRING_SHIFTS[s.stringGroup] !== undefined) SETTINGS.stringGroup = s.stringGroup;
    if (PREVIEW_SOUND_KEYS.includes(s.previewSound)) SETTINGS.previewSound = s.previewSound;
    if (['mid', 'high'].includes(s.neckPosition)) SETTINGS.neckPosition = s.neckPosition;
    if ([2,3,4,6].includes(parseInt(s.clickSubdiv))) SETTINGS.clickSubdiv = parseInt(s.clickSubdiv);
    if (s.navHidden === true) SETTINGS.navHidden = true;
    const le = parseInt(s.loopExt);
    if ([-1,0,1,2,3,4].includes(le)) SETTINGS.loopExt = le;
    if (s.trainMode === true) SETTINGS.trainMode = true;
    const tbst = parseInt(s.trainBpmStart);
    if (!isNaN(tbst) && tbst >= 20 && tbst <= 200) SETTINGS.trainBpmStart = tbst;
    const tbs = parseInt(s.trainBpmStep);
    if ([1,2,3,4,5].includes(tbs)) SETTINGS.trainBpmStep = tbs;
    const tle = parseInt(s.trainLoopEvery);
    if ([1,2,3,4,5].includes(tle)) SETTINGS.trainLoopEvery = tle;
    const tbm = parseInt(s.trainBpmMax);
    if (!isNaN(tbm) && tbm >= 40 && tbm <= 200) SETTINGS.trainBpmMax = tbm;
    const pv = parseInt(s.patVolume);
    if (!isNaN(pv) && pv >= 0 && pv <= 100) SETTINGS.patVolume = pv;
    const cv = parseInt(s.clickVolume);
    if (!isNaN(cv) && cv >= 0 && cv <= 100) SETTINGS.clickVolume = cv;
    if (s.tempoPresets && typeof s.tempoPresets === 'object') {
      ['lent','cool','chaud'].forEach(k => {
        const v = parseInt(s.tempoPresets[k]);
        if (Number.isFinite(v) && v >= 20 && v <= 200) SETTINGS.tempoPresets[k] = v;
      });
    }
  } catch(e) {}
}

function saveSettings() {
  try {
    localStorage.setItem('dicoSettings', JSON.stringify({
      stringGroup: SETTINGS.stringGroup,
      previewSound: SETTINGS.previewSound,
      neckPosition: SETTINGS.neckPosition,
      clickSubdiv: SETTINGS.clickSubdiv,
      navHidden: SETTINGS.navHidden,
      loopExt: SETTINGS.loopExt,
      trainMode: SETTINGS.trainMode,
      trainBpmStart: SETTINGS.trainBpmStart,
      trainBpmStep: SETTINGS.trainBpmStep,
      trainLoopEvery: SETTINGS.trainLoopEvery,
      trainBpmMax: SETTINGS.trainBpmMax,
      tempoPresets: SETTINGS.tempoPresets,
      patVolume: SETTINGS.patVolume,
      clickVolume: SETTINGS.clickVolume,
    }));
  } catch(e) {}
}

let PAT_NOTES = {};

function loadPatNotes() {
  try { PAT_NOTES = JSON.parse(localStorage.getItem('dicoPatNotes') || '{}'); } catch(e) { PAT_NOTES = {}; }
}

function savePatNote(patId, text) {
  PAT_NOTES[patId] = text;
  try { localStorage.setItem('dicoPatNotes', JSON.stringify(PAT_NOTES)); } catch(e) {}
}

// ─── SESSION TRACE ────────────────────────────────────────────────────────────
// Mémorise par pattern : dernier jeu · BPM max atteint · total de boucles jouées
let PAT_TRACE = {};

function loadPatTrace() {
  try { PAT_TRACE = JSON.parse(localStorage.getItem('dicoPatTrace') || '{}'); } catch(e) { PAT_TRACE = {}; }
}

function savePatTrace() {
  try { localStorage.setItem('dicoPatTrace', JSON.stringify(PAT_TRACE)); } catch(e) {}
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('dicoPattern') || '{}');
    state.progress  = saved.progress  || {};
    state.favorites = saved.favorites || {};
    state.pimtDone  = saved.pimtDone  || {};
    state.showHeaderStats = saved.showHeaderStats === true; // false by default
    if (saved.dailyChallengeOpen !== undefined) state.dailyChallengeOpen = saved.dailyChallengeOpen;
  } catch(e) {}
  loadPatNotes();
  loadPatTrace();
  loadSettings();
}

function saveState() {
  try {
    localStorage.setItem('dicoPattern', JSON.stringify({
      progress:  state.progress,
      favorites: state.favorites,
      pimtDone:  state.pimtDone,
      showHeaderStats: state.showHeaderStats,
      dailyChallengeOpen: state.dailyChallengeOpen,
    }));
  } catch(e) {}
}

function getProgressKey(patId, fing, mode, interp, tempo) {
  const t = typeof tempo === 'object' ? tempo.key : tempo;
  return `${patId}__${fing}__${mode}__${interp}__${t}`;
}

function getPatternPct(patId) {
  const pat = PATTERNS.find(p => p.id === patId);
  const mode = pat ? pat.dir : 'U';
  let total = 0, done = 0;
  [1].forEach(f => INTERPS.forEach(i => TEMPOS.forEach(t => {
    total++;
    if (state.progress[getProgressKey(patId, f, mode, i, t)]) done++;
  })));
  return total > 0 ? Math.round(done / total * 100) : 0;
}

// % global d'un groupe (toutes directions confondues)
function getGroupPct(groupKey) {
  const pats = PATTERNS.filter(p => p.cat + 'P' + p.num === groupKey);
  let total = 0, done = 0;
  pats.forEach(p => {
    // Pour les gammes (special: true), utiliser 'U' ; sinon utiliser la direction du pattern
    const dirs = p.special ? ['U'] : (p.dir ? [p.dir] : ['U','D','M']);
    dirs.forEach(d => {
      INTERPS.forEach(i => TEMPOS.forEach(t => {
        total++;
        if (state.progress[getProgressKey(p.id, 1, d, i, t)]) done++;
      }));
    });
  });
  return total ? Math.round(done / total * 100) : 0;
}


