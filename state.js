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
  gammeActiveStrings: {}, // { "gammeP1": [true,true,true,true,true,true] } — [e,B,G,D,A,E]
  gammeSelectedDir: {},  // { "pentaTrans1": "1→2" } — direction active par gamme avec directions multiples
  triadeStringGroup: {},  // { "triadeDim1": "GBe" } — groupe de cordes actif par triade
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
  showNeckBtn: false,      // afficher/masquer le bouton mid/high dans le header
  showShuffleBtn: false,   // afficher bouton Shuffle dans la row 1 du header
  showStringBtn: false,    // afficher bouton groupe de cordes dans la row 1 du header
  showSubdivBtn: false,    // afficher bouton subdivision rythmique dans le header
  showTrain: false,        // afficher bouton Train. dans le header
  showCountin: true,       // afficher bouton Décompte dans le header
  showClick: true,         // afficher bouton Clic dans le header
  showMetroSolo: false,    // afficher bouton Métronome solo dans le header
  showHeaderStats: false,  // afficher stats streak (🔥⚡📅) dans le header
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
  shuffleMode: false,        // mode shuffle/swing (facteur fixe 0.67 = triolet)
  darkMode: false,           // true = mode sombre activé manuellement
};

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('dicoSettings') || '{}');
    if (s.stringGroup && STRING_SHIFTS[s.stringGroup] !== undefined) SETTINGS.stringGroup = s.stringGroup;
    if (PREVIEW_SOUND_KEYS.includes(s.previewSound)) SETTINGS.previewSound = s.previewSound;
    if (['mid', 'high'].includes(s.neckPosition)) SETTINGS.neckPosition = s.neckPosition;
    if (s.showNeckBtn !== undefined) SETTINGS.showNeckBtn = s.showNeckBtn;
    if (s.showShuffleBtn !== undefined) SETTINGS.showShuffleBtn = s.showShuffleBtn;
    if (s.showStringBtn  !== undefined) SETTINGS.showStringBtn  = s.showStringBtn;
    if (s.showSubdivBtn !== undefined) SETTINGS.showSubdivBtn = s.showSubdivBtn;
    if (s.showTrain !== undefined) SETTINGS.showTrain = s.showTrain;
    if (s.showCountin !== undefined) SETTINGS.showCountin = s.showCountin;
    if (s.showClick !== undefined) SETTINGS.showClick = s.showClick;
    if (s.showMetroSolo !== undefined) SETTINGS.showMetroSolo = s.showMetroSolo;
    if (s.showHeaderStats !== undefined) SETTINGS.showHeaderStats = s.showHeaderStats;
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
    if (s.shuffleMode === true) SETTINGS.shuffleMode = true;
    if (s.darkMode === true) SETTINGS.darkMode = true;
    if (s.tempoPresets && typeof s.tempoPresets === 'object') {
      ['lent','cool','chaud'].forEach(k => {
        const v = parseInt(s.tempoPresets[k]);
        if (Number.isFinite(v) && v >= 20 && v <= 200) SETTINGS.tempoPresets[k] = v;
      });
    }
  } catch(e) { console.warn('loadSettings:', e); }
}

function saveSettings() {
  try {
    localStorage.setItem('dicoSettings', JSON.stringify({
      stringGroup: SETTINGS.stringGroup,
      previewSound: SETTINGS.previewSound,
      neckPosition: SETTINGS.neckPosition,
      showNeckBtn: SETTINGS.showNeckBtn,
      showShuffleBtn: SETTINGS.showShuffleBtn,
      showStringBtn:  SETTINGS.showStringBtn,
      showSubdivBtn: SETTINGS.showSubdivBtn,
      showTrain: SETTINGS.showTrain,
      showCountin: SETTINGS.showCountin,
      showClick: SETTINGS.showClick,
      showMetroSolo: SETTINGS.showMetroSolo,
      showHeaderStats: SETTINGS.showHeaderStats,
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
      shuffleMode: SETTINGS.shuffleMode,
      darkMode: SETTINGS.darkMode,
    }));
  } catch(e) { console.warn('saveSettings:', e); }
}

let PAT_NOTES = {};

function loadPatNotes() {
  try { PAT_NOTES = JSON.parse(localStorage.getItem('dicoPatNotes') || '{}'); } catch(e) { PAT_NOTES = {}; }
}

function savePatNote(patId, text) {
  PAT_NOTES[patId] = text;
  try { localStorage.setItem('dicoPatNotes', JSON.stringify(PAT_NOTES)); } catch(e) { console.warn('savePatNote:', e); }
}

// ─── SESSION TRACE ────────────────────────────────────────────────────────────
// Mémorise par pattern : dernier jeu · BPM max atteint · total de boucles jouées
let PAT_TRACE = {};

function loadPatTrace() {
  try { PAT_TRACE = JSON.parse(localStorage.getItem('dicoPatTrace') || '{}'); } catch(e) { PAT_TRACE = {}; }
}

function savePatTrace() {
  try { localStorage.setItem('dicoPatTrace', JSON.stringify(PAT_TRACE)); } catch(e) { console.warn('savePatTrace:', e); }
}

// ─── PATTERN JOURNAL ──────────────────────────────────────────────────────────
// Enregistre chaque lecture de pattern avec timestamp, tempo, mode
let PATTERN_JOURNAL = [];

function loadPatternJournal() {
  try { PATTERN_JOURNAL = JSON.parse(localStorage.getItem('dicoPatternJournal') || '[]'); } catch(e) { PATTERN_JOURNAL = []; }
}

function savePatternJournal() {
  try { localStorage.setItem('dicoPatternJournal', JSON.stringify(PATTERN_JOURNAL)); } catch(e) { console.warn('savePatternJournal:', e); }
}

function addJournalEntry(patId, bpm, trainMode, pyramideMode, shuffleMode) {
  const pat = PATTERNS.find(p => p.id === patId);
  if (!pat) return;
  const now = new Date();

  // Compter les cases cochées (progress = true)
  const checkedCount = Object.values(state.progress || {}).filter(v => v === true).length;

  const entry = {
    timestamp: now.getTime(),
    patId: patId,
    patName: pat.name,
    bpm: bpm,
    trainMode: trainMode || false,
    pyramideMode: pyramideMode || false,
    shuffleMode: shuffleMode || false,
    checkedCount: checkedCount,  // Nombre de cases cochées au moment de la lecture
  };
  PATTERN_JOURNAL.push(entry);
  savePatternJournal();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('dicoPattern') || '{}');
    state.progress  = saved.progress  || {};
    state.favorites = saved.favorites || {};
    state.pimtDone  = saved.pimtDone  || {};
    if (saved.dailyChallengeOpen !== undefined) state.dailyChallengeOpen = saved.dailyChallengeOpen;
    if (saved.gammeActiveStrings && typeof saved.gammeActiveStrings === 'object') {
      state.gammeActiveStrings = saved.gammeActiveStrings;
    }
    if (saved.gammeSelectedDir && typeof saved.gammeSelectedDir === 'object') {
      state.gammeSelectedDir = saved.gammeSelectedDir;
    }
    if (saved.triadeStringGroup && typeof saved.triadeStringGroup === 'object') {
      state.triadeStringGroup = saved.triadeStringGroup;
    }
  } catch(e) { console.warn('loadState:', e); }
  loadPatNotes();
  loadPatTrace();
  loadPatternJournal();
  loadSettings();
}

function saveState() {
  try {
    localStorage.setItem('dicoPattern', JSON.stringify({
      progress:  state.progress,
      favorites: state.favorites,
      pimtDone:  state.pimtDone,
      dailyChallengeOpen: state.dailyChallengeOpen,
      gammeActiveStrings: state.gammeActiveStrings,
      gammeSelectedDir:   state.gammeSelectedDir,
      triadeStringGroup:  state.triadeStringGroup,
    }));
  } catch(e) { console.warn('saveState:', e); }
}

function getProgressKey(patId, fing, mode, interp, tempo) {
  const t = typeof tempo === 'object' ? tempo.key : tempo;
  const sh = SETTINGS.shuffleMode ? '__sh' : '';
  return `${patId}__${fing}__${mode}__${interp}__${t}${sh}`;
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
    if (p.special && p.hasDirectionTabs && p.directions) {
      // Gamme avec onglets de direction : une progression par direction
      Object.keys(p.directions).forEach(dirKey => {
        const progressId = p.id + '__' + dirKey.replace(/[→↔]/g, '-');
        const interpsToUse = p.customInterps || INTERPS;
        interpsToUse.forEach(i => TEMPOS.forEach(t => {
          total++;
          if (state.progress[getProgressKey(progressId, 1, 'U', i, t)]) done++;
        }));
      });
    } else if (p.special && p.stringGroups) {
      // Gamme spécialisée avec groupes de cordes (triades) : une progression par groupe
      Object.keys(p.stringGroups).forEach(groupKey => {
        const progressId = p.id + '__' + groupKey;
        const interpsToUse = p.customInterps || INTERPS;
        interpsToUse.forEach(i => TEMPOS.forEach(t => {
          total++;
          if (state.progress[getProgressKey(progressId, 1, 'U', i, t)]) done++;
        }));
      });
    } else {
      // Pour les gammes (special: true), utiliser 'U' ; sinon utiliser la direction du pattern
      const dirs = p.special ? ['U'] : (p.dir ? [p.dir] : ['U','D','M']);
      const interpsToUse = p.customInterps || INTERPS;
      dirs.forEach(d => {
        interpsToUse.forEach(i => TEMPOS.forEach(t => {
          total++;
          if (state.progress[getProgressKey(p.id, 1, d, i, t)]) done++;
        }));
      });
    }
  });
  return total ? Math.round(done / total * 100) : 0;
}


