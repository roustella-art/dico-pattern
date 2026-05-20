// ─── RENDER ───────────────────────────────────────────────────────────────────
// Extrait de index.html lors du refactor v1.15
// Contient : render(), renderParcours(), renderPatterns(), renderPatternGroupBody(),
//            renderSessionCalendar(), renderCalendarAccordion(),
//            renderGlobalProgress(), renderProgress(), renderGuide()
// Dépendances (globales) : state, SETTINGS (state.js) · PATTERNS, TEMPOS (data.js)
//                          PREVIEW, METRO (audio.js) · HCTRL (index.html)
// ─────────────────────────────────────────────────────────────────────────────

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render() {
  const el = document.getElementById('content');
  if (state.tab === 'patterns') el.innerHTML = renderPatterns();
  else if (state.tab === 'parcours') el.innerHTML = renderParcours();
  else if (state.tab === 'guide') el.innerHTML = renderGuide();
  else el.innerHTML = renderProgress();
  metroPostRender();
  refreshAllTraceDisplays();
}


// ── CHALLENGE ALÉATOIRE QUOTIDIEN ──
function getDailyRandomPatterns() {
  const today = new Date().toISOString().slice(0, 10);
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem('dicoDailyChallenge') || '{}'); } catch(e) { console.warn('getDailyRandomPatterns:', e); }

  if (cache.date === today && cache.patterns) {
    return cache.patterns.map(id => PATTERNS.find(p => p.id === id)).filter(Boolean);
  }

  // Dédupliquer par groupe (cat + 'P' + num) — tous les patterns de l'appli
  const seen = new Set();
  const groups = [];
  PATTERNS.forEach(p => {
    const gkey = p.cat + 'P' + p.num;
    if (seen.has(gkey)) return;
    seen.add(gkey);

    // Calculer progression réelle sur toutes les directions du groupe
    let total = 0, done = 0, discovered = false;
    PATTERNS.filter(q => q.cat + 'P' + q.num === gkey).forEach(q => {
      [1].forEach(f => INTERPS.forEach(i => TEMPOS.forEach(t => {
        const pk = getProgressKey(q.id, f, q.dir, i, t);
        total++;
        if (state.progress[pk]) { done++; discovered = true; }
      })));
    });
    const avgProgress = total ? done / total : 0;
    groups.push({ p, gkey, discovered, avgProgress });
  });

  // Trier : non découverts d'abord, puis progression croissante
  groups.sort((a, b) => {
    if (a.discovered !== b.discovered) return a.discovered ? 1 : -1;
    return a.avgProgress - b.avgProgress;
  });

  // Choisir 2 parmi les 8 premiers candidats (aléa pour varier)
  const candidates = groups.slice(0, Math.min(8, groups.length));
  const selected = [];
  for (let i = 0; i < Math.min(2, candidates.length); i++) {
    const idx = Math.floor(Math.random() * candidates.length);
    selected.push(candidates[idx].p);
    candidates.splice(idx, 1);
  }

  cache = { date: today, patterns: selected.map(p => p.id) };
  localStorage.setItem('dicoDailyChallenge', JSON.stringify(cache));

  return selected;
}

// ── PARCOURS TAB ──
function renderParcours() {
  const etapeNames = { 1: 'La base', 2: "L'indépendance", 3: "L'extension" };

  // Collecter les étapes et groupes
  const etapes = {};
  PATTERNS.forEach(p => {
    if (!p.etape) return;
    const key = p.cat + 'P' + p.num;
    if (!etapes[p.etape]) etapes[p.etape] = {};
    if (!etapes[p.etape][key]) etapes[p.etape][key] = { order: p.etapeOrder, patterns: [] };
    etapes[p.etape][key].patterns.push(p);
  });

  if (!Object.keys(etapes).length) {
    return `<div style="text-align:center;padding:40px;color:var(--text2)">
      <p>Aucun parcours défini pour l'instant.</p>
    </div>`;
  }

  let html = '';

  Object.keys(etapes).sort((a,b) => a-b).forEach(etapeNum => {
    const groups = etapes[etapeNum];
    const name = etapeNames[etapeNum] || `Étape ${etapeNum}`;

    // Progression globale de l'étape
    let totalE = 0, doneE = 0;
    Object.values(groups).forEach(g => {
      g.patterns.forEach(p => {
        [1].forEach(f => INTERPS.forEach(i => TEMPOS.forEach(t => {
          totalE++;
          if (state.progress[getProgressKey(p.id, f, p.dir, i, t)]) doneE++;
        })));
      });
    });
    const pctE = totalE ? Math.round(doneE / totalE * 100) : 0;

    // Couleurs par étape : clair → moyen → foncé
    const etapeColors = {
      1: '#A8D5E2',  // Bleu clair
      2: '#4A9AB5',  // Bleu moyen
      3: '#0F4C5C'   // Bleu foncé
    };
    const bgColor = etapeColors[etapeNum] || 'var(--blue)';
    const colorE = pctE >= 80 ? 'var(--green)' : pctE >= 40 ? 'var(--orange)' : 'var(--blue)';

    // Accordéon étape — fermé par défaut
    if (state.etapeOpen[etapeNum] === undefined) state.etapeOpen[etapeNum] = false;
    const isEtapeOpen = state.etapeOpen[etapeNum];

    // Une seule fenêtre avec header + accordéon fusionnés
    html += `
    <div style="background:${bgColor};border-radius:var(--radius);box-shadow:0 1px 4px rgba(0,0,0,.08);margin-bottom:16px;overflow:hidden">
      <div style="padding:13px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none"
        onclick="toggleEtape(${etapeNum})">
        <div style="flex:1">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,.6)">Étape ${etapeNum}</div>
          <div style="font-size:19px;font-weight:800;color:#fff">${name}</div>
        </div>
        <div style="text-align:right;margin-left:16px">
          <div style="font-size:28px;font-weight:800;color:${pctE>0?'#fff':'rgba(255,255,255,.4)'}">${pctE}%</div>
          <div style="height:4px;background:rgba(255,255,255,.2);border-radius:2px;width:60px;margin-top:6px"><div style="height:4px;background:rgba(255,255,255,.6);border-radius:2px;width:${pctE}%"></div></div>
        </div>
        <svg id="etape-arrow-${etapeNum}" style="transition:transform .2s;transform:rotate(${isEtapeOpen?'180':'0'}deg);margin-left:12px;flex-shrink:0"
          width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <polyline points="2 4 7 10 12 4"/>
        </svg>
      </div>`;

    // Trier par etapeOrder
    const sorted = Object.entries(groups).sort((a,b) => a[1].order - b[1].order);

    html += `<div id="etape-content-${etapeNum}" style="border-top:2px solid rgba(255,255,255,.2);padding:10px;display:${isEtapeOpen ? 'block' : 'none'}">`;
    sorted.forEach(([key, group]) => {
      const base = group.patterns[0];
      const pct = getGroupPct(key);
      const color = 'var(--blue)';
      const barColor = pct >= 80 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--blue)';
      const isOpen = state.parcoursOpen === key;
      html += `
      <div id="parc-card-${key}" style="background:var(--card);border-radius:var(--radius);box-shadow:0 1px 4px rgba(0,0,0,.08);margin-bottom:8px;overflow:hidden">
        <div style="padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="toggleParcours('${key}')">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">${group.order}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:700">${base.name}</div>
            <div style="font-size:11px;color:var(--text2);margin-top:2px">${key} · ${diffTag(base.difficulty)}</div>
            <div class="progress-bar-wrap" style="margin-top:6px"><div id="grpbar-${key}" class="progress-bar" style="width:${pct}%;background:${barColor}"></div></div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
            <div id="grppct-${key}" style="font-size:20px;font-weight:800;color:${color}">${pct > 0 ? pct+'%' : '—'}</div>
            <button onclick="toggleFavorite('${key}',event)"
              style="background:none;border:none;cursor:pointer;padding:2px;display:flex;align-items:center">
              ${heartSVG(!!state.favorites[key])}
            </button>
            <span style="font-size:16px;color:var(--text2)">${isOpen ? '▲' : '▼'}</span>
          </div>
        </div>
        ${isOpen ? (() => {
          let inner = '<div style="border-top:1px solid var(--border);padding:12px 14px 0">';
          inner += renderPatternGroupBody(group.patterns, key);
          inner += '</div>';
          return inner;
        })() : ''}
      </div>`;
    });
    html += `</div>`; // ferme etape-content

    html += `</div>`; // ferme le wrapper accordéon

  });

  // ── CHALLENGE ALÉATOIRE QUOTIDIEN ──
  // Affiche 2 patterns aléatoires qui s'ouvrent directement dans le parcours
  const dailyPatterns = getDailyRandomPatterns();
  if (dailyPatterns.length > 0) {
    html += `
    <div style="background:linear-gradient(135deg, #E89968 0%, #D9834F 100%);border-radius:var(--radius);box-shadow:0 2px 8px rgba(212,98,46,.15);margin-bottom:16px;overflow:hidden">
      <div style="padding:13px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none" onclick="toggleDailyChallenge()">
        <div style="display:flex;align-items:center;gap:10px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" style="flex-shrink:0">
            <ellipse cx="12" cy="19" rx="9" ry="3" fill="rgba(0,0,0,0.12)"/>
            <rect x="1" y="1" width="22" height="22" rx="2.5" fill="#E3E3E3" stroke="#999" stroke-width="1"/>
            <rect x="2" y="2" width="20" height="20" rx="2.5" fill="#FAFAFA"/>
            <circle cx="7" cy="7" r="1.5" fill="#333"/>
            <circle cx="12" cy="12" r="1.5" fill="#333"/>
            <circle cx="17" cy="17" r="1.5" fill="#333"/>
          </svg>
          <div>
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,.7)">Challenge du jour</div>
            <div style="font-size:15px;font-weight:800;color:#fff">Patterns aléatoire</div>
          </div>
        </div>
        <svg id="daily-challenge-arrow" style="transition:transform .2s;transform:rotate(${state.dailyChallengeOpen ? '180' : '0'}deg);margin-left:12px;flex-shrink:0"
          width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <polyline points="2 4 7 10 12 4"/>
        </svg>
      </div>
      <div id="daily-challenge-patterns" style="border-top:2px solid rgba(255,255,255,.2);padding:10px;display:${state.dailyChallengeOpen ? 'flex' : 'none'};flex-direction:column;gap:8px">
        ${dailyPatterns.map(p => {
          const key = p.cat + 'P' + p.num;
          const pct = getGroupPct(key);
          const color = 'var(--blue)';
          const barColor = pct >= 80 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--blue)';
          // Si le pattern est dans le parcours (a une étape), on l'ouvre là-bas ; sinon onglet Patterns
          const onclick = p.etape ? `toggleParcours('${key}')` : `goToPattern('${key}')`;
          const destLabel = p.etape ? '📋 Parcours' : '🎸 Patterns';
          return `
          <div id="chall-card-${key}" style="background:var(--card);border-radius:var(--radius);box-shadow:0 1px 4px rgba(0,0,0,.08);overflow:hidden">
            <div style="padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="${onclick}">
              <div style="width:32px;height:32px;border-radius:50%;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">${pct}%</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:14px;font-weight:700">${p.name}</div>
                <div style="font-size:11px;color:var(--text2);margin-top:2px">${key} · ${diffTag(p.difficulty)}</div>
                <div class="progress-bar-wrap" style="margin-top:6px"><div class="progress-bar" style="width:${pct}%;background:${barColor}"></div></div>
              </div>
              <span style="font-size:16px;color:var(--text2)">→</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  return html;
}

// ── PATTERN GROUP BODY (direction unifiée ou pattern spécial) ────────────────
function renderPatternGroupBody(pats, key) {
  // Détecter les patterns spéciaux
  const isSpecial = pats[0].special;

  if (isSpecial) {
    // Pour les patterns spéciaux, utiliser directement le premier pattern
    const p = pats[0];
    const relPat = null;

    // ── Pas de doigtés, juste la tablature ──
    // Pour les patterns spéciaux, afficher la tab SANS transformTab (pas de string grouping)
    const tabIsPlaying = PREVIEW.patId === p.id;
    const tabBlock = `
      <div style="margin-bottom:10px">
        <div class="tab-wrap" style="margin:0" onclick="tabWrapClick('${p.id}')"
          title="Tap → lecture / stop">
          <pre data-tab-id="${p.id}" id="tab-pre-${p.id}" style="font-size:12px">${tabWithSymbols(cleanTabDisplay((isStaticNeckTab(p) || (p.tabMid && p.tabHigh && SETTINGS.neckPosition === 'high')) ? getEffectiveTab(getTabForNeckPosition(p)) : transformTab(getEffectiveTab(getTabForNeckPosition(p)), p.id)), PREVIEW.interp)}</pre>
          <div id="tab-cursor-montee-${p.id}" class="tab-cursor-bar"></div>
          <div id="tab-cursor-retour-${p.id}" class="tab-cursor-bar"></div>
          <div id="tab-play-badge-${p.id}" class="tab-play-badge${tabIsPlaying?' playing':''}">
            ${tabIsPlaying
              ? `<svg width="9" height="9" viewBox="0 0 9 9" fill="rgba(255,255,255,.9)"><rect width="4" height="9" rx=".8"/><rect x="5" width="4" height="9" rx=".8"/></svg>`
              : `<svg width="8" height="9" viewBox="0 0 8 9" fill="rgba(255,255,255,.55)"><path d="M0 0l8 4.5L0 9z"/></svg>`}
          </div>
        </div>
      </div>`;

    // ── Grille de progression simplifiée (pas de direction) ──
    // Calculer le pourcentage de progression
    let totalCells = 0, doneCells = 0;
    let gridRows = '';
    TEMPOS.forEach(tempo => {
      gridRows += `<tr>
        <td class="tempo" style="text-align:center;padding:4px 6px;cursor:pointer;user-select:none"
            onclick="applyTempoPreset('${tempo.key}')" title="Régler le BPM à ${SETTINGS.tempoPresets[tempo.key]} bpm">
          <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:3px">
            ${tempo.icon}
          </div>
          <span style="font-size:10px;color:${tempo.color};font-weight:700;display:block">${SETTINGS.tempoPresets[tempo.key]} <span style="font-size:8px;font-weight:500">bpm</span></span>
        </td>`;
      INTERPS.forEach(interp => {
        const k = getProgressKey(p.id, 1, 'U', interp, tempo);
        const done = !!state.progress[k];
        totalCells++;
        if (done) doneCells++;
        const dirColor = '#56864A';
        const checkedStyle = done ? `background:${dirColor};border-color:${dirColor};` : '';
        gridRows += `<td><button class="cell-btn ${done?'checked':''}" style="${checkedStyle}" data-dir="U" onclick="toggleParcoursCell('${k}',this,\`${dirColor}\`)"></button></td>`;
      });
      gridRows += `</tr>`;
    });
    const progressPercent = totalCells > 0 ? Math.round((doneCells / totalCells) * 100) : 0;

    const progGrid = `<div class="prog-grid" style="margin-bottom:10px">
      <table><thead><tr>
        <th style="width:68px;background:var(--blue)"></th>
        ${INTERPS.map(i=>`<th data-interp-th="${i}" onclick="setPreviewInterp('${i}')"
          style="cursor:pointer;transition:all .15s;${PREVIEW.interp===i ? 'background:var(--orange);color:#fff;' : 'background:var(--blue);color:rgba(255,255,255,.75);'}">${INTERP_LABELS[i]}</th>`).join('')}
      </tr></thead>
      <tbody style="background:transparent">${gridRows}</tbody></table></div>`;

    // ── Notes personnelles ──
    const infoDrawer = `
      <details id="drawer-${key}" class="info-drawer" style="margin-bottom:2px">
        <summary style="font-size:11px;font-weight:600;color:var(--text2);cursor:pointer;
          padding:7px 10px;background:#f8f7f4;border-radius:8px;border:1px solid var(--border);
          list-style:none;display:flex;align-items:center;justify-content:space-between;user-select:none">
          <span style="display:flex;align-items:center;gap:6px">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Notes
          </span>
          <span style="font-size:9px;opacity:.5">▼</span>
        </summary>
        <div style="padding:12px 0 2px;display:flex;flex-direction:column;gap:10px">
          <textarea placeholder="Notes personnelles…"
            style="width:100%;min-height:52px;padding:8px 10px;font-size:12px;font-family:-apple-system,sans-serif;
              color:var(--text);background:#fafaf8;border:1px solid var(--border);border-radius:8px;
              resize:vertical;outline:none;line-height:1.5"
            onblur="savePatNote('${key}',this.value)">${PAT_NOTES[key]||PAT_NOTES[p.id]||''}</textarea>
        </div>
      </details>`;

    return `
      <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)">
        <div id="pat-train-${p.id}" style="font-size:13px;color:var(--text2);opacity:.7;padding:0 1px 6px;letter-spacing:.1px;display:flex;justify-content:space-between;align-items:center">
          <span>— pattern spécial —</span>
          <span style="font-weight:600;color:var(--blue);font-size:12px">${progressPercent > 0 ? progressPercent+'%' : ''}</span>
        </div>
        ${tabBlock}
        <div style="font-size:11px;font-weight:600;color:var(--text2);letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px;padding-left:1px">Remplis le tableau</div>
        ${progGrid}
        ${infoDrawer}
      </div>`;
  }

  // Sinon, affichage normal avec directions
  const dirs = ['U','D','M'].filter(d => pats.find(p => p.dir === d));
  const activeDir = (state.cardDir[key] && dirs.includes(state.cardDir[key]))
    ? state.cardDir[key] : dirs[0];
  state.cardDir[key] = activeDir;
  const p = pats.find(x => x.dir === activeDir);
  const relPat = p.related ? PATTERNS.find(r => r.id === p.related + activeDir) : null;

  // ── Doigtés (basés sur la direction active) ──────────────────────────────────
  const d1 = p.fingerings ? p.fingerings[0] : null;
  const d1hand = d1 ? `
    <div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text2);margin-bottom:6px">Doigté principal</div>
      <div style="display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:start">
        <span style="color:var(--text2);font-weight:700;font-size:11px;white-space:nowrap;padding-top:1px">↑ Up</span>
        <span style="font-size:12px;color:var(--text);line-height:1.6">${expandFingering(d1)}</span>
        <span style="color:var(--text2);font-weight:700;font-size:11px;white-space:nowrap;padding-top:1px">↓ Down</span>
        <span style="font-size:12px;color:var(--text);line-height:1.6">${expandFingering(reverseFingering(d1))}</span>
      </div>
    </div>` : '';
  const altFingerings = p.fingerings ? p.fingerings.slice(1).filter(Boolean) : [];
  const altFingeringsInner = altFingerings.length ? altFingerings.map((f, i) => {
    const fingIdx = i + 2;
    const pimtKey = p.id + '__pim' + fingIdx;
    const done = !!(state.pimtDone && state.pimtDone[pimtKey]);
    return `
    <div style="margin-bottom:${i < altFingerings.length - 1 ? '12' : '0'}px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:10px;font-weight:700;color:var(--text2)">Doigté ${fingIdx}</div>
        <button onclick="togglePimtDone('${pimtKey}', this)"
          style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:6px;border:1.5px solid;cursor:pointer;transition:all .15s;
            background:${done?'var(--green)':'transparent'};
            color:${done?'#fff':'var(--text2)'};
            border-color:${done?'var(--green)':'var(--border)'}">
          ${done ? '✓ Maîtrisé' : 'À travailler'}
        </button>
      </div>
      <div style="display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:start">
        <span style="color:var(--text2);font-weight:700;font-size:11px;white-space:nowrap;padding-top:1px">↑ Up</span>
        <span style="font-size:11px;color:var(--text);line-height:1.6">${expandFingering(f)}</span>
        <span style="color:var(--text2);font-weight:700;font-size:11px;white-space:nowrap;padding-top:1px">↓ Down</span>
        <span style="font-size:11px;color:var(--text);line-height:1.6">${expandFingering(reverseFingering(f))}</span>
      </div>
    </div>`;
  }).join('') : '';

  // ── Sélecteur de direction — boutons pleine largeur aux couleurs du tableau ──
  const DIR_BTN_COLORS = {
    U: { bg:'rgba(26,122,94,.13)',  color:'#1a7a5e', border:'#1a7a5e' },
    D: { bg:'rgba(184,74,32,.13)',  color:'#b84a20', border:'#b84a20' },
    M: { bg:'rgba(107,79,170,.13)', color:'#6b4faa', border:'#6b4faa' }
  };
  const dirLabels = {U:'↑ Ascendant', D:'↓ Descendant', M:'↑↓ Mix'};
  const dirBtns = dirs.length > 1 ? `<div style="display:flex;gap:6px;width:100%">${dirs.map(d => {
    const active = d === activeDir;
    const dc = DIR_BTN_COLORS[d] || { bg:'var(--blue-light)', color:'var(--blue)', border:'var(--blue)' };
    let tot = 0, don = 0;
    const dp = pats.find(x => x.dir === d);
    if (dp) INTERPS.forEach(i => TEMPOS.forEach(t => {
      tot++; if (state.progress[getProgressKey(dp.id,1,d,i,t)]) don++;
    }));
    const dpct = tot ? Math.round(don/tot*100) : 0;
    return `<button onclick="setCardDir('${key}','${d}')"
      style="flex:1;font-size:12px;font-weight:700;padding:8px 4px 6px;border-radius:8px;border:2px solid;cursor:pointer;transition:all .15s;text-align:center;line-height:1.3;
        background:${active ? dc.bg : 'transparent'};
        color:${active ? dc.color : 'var(--text2)'};
        border-color:${active ? dc.border : 'rgba(0,0,0,.15)'}">
      ${dirLabels[d]}
      <span id="dirpct-${key}-${d}" style="display:block;font-size:9px;opacity:.7;font-weight:500;margin-top:2px">${dpct>0?`${dpct}%`:''}</span>
    </button>`;
  }).join('')}</div>` : '';


  // ── Tab (direction active) ────────────────────────────────────────────────────
  const tabIsPlaying = PREVIEW.patId === p.id;
  const tabBlock = `
    <div style="margin-bottom:10px">
      <div class="tab-wrap" style="margin:0" onclick="tabWrapClick('${p.id}')"
        title="Tap → lecture / stop">
        <pre data-tab-id="${p.id}" id="tab-pre-${p.id}" style="font-size:12px">${tabWithSymbols(cleanTabDisplay((isStaticNeckTab(p) || (p.tabMid && p.tabHigh && SETTINGS.neckPosition === 'high')) ? getEffectiveTab(getTabForNeckPosition(p)) : transformTab(getEffectiveTab(getTabForNeckPosition(p)), p.id)), PREVIEW.interp)}</pre>
        <div id="tab-cursor-montee-${p.id}" class="tab-cursor-bar"></div>
        <div id="tab-cursor-retour-${p.id}" class="tab-cursor-bar"></div>
        <div id="tab-play-badge-${p.id}" class="tab-play-badge${tabIsPlaying?' playing':''}">
          ${tabIsPlaying
            ? `<svg width="9" height="9" viewBox="0 0 9 9" fill="rgba(255,255,255,.9)"><rect width="4" height="9" rx=".8"/><rect x="5" width="4" height="9" rx=".8"/></svg>`
            : `<svg width="8" height="9" viewBox="0 0 8 9" fill="rgba(255,255,255,.55)"><path d="M0 0l8 4.5L0 9z"/></svg>`}
        </div>
      </div>
    </div>`;

  // ── Grille de progression (direction active) ──────────────────────────────────
  const DIR_COLORS  = {U:'#1a7a5e', D:'#b84a20', M:'#6b4faa'};
  const DIR_BG      = {U:'rgba(44,100,240,0.07)', D:'rgba(210,180,30,0.08)', M:'rgba(200,60,110,0.07)'};
  const dirColor    = DIR_COLORS[activeDir] || '#56864A';
  const dirBgColor  = DIR_BG[activeDir] || 'transparent';
  let gridRows = '';
  TEMPOS.forEach(tempo => {
    gridRows += `<tr>
      <td class="tempo" style="text-align:center;padding:4px 6px;cursor:pointer;user-select:none"
          onclick="applyTempoPreset('${tempo.key}')" title="Régler le BPM à ${SETTINGS.tempoPresets[tempo.key]} bpm">
        <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:3px">
          ${tempo.icon}
        </div>
        <span style="font-size:10px;color:${tempo.color};font-weight:700;display:block">${SETTINGS.tempoPresets[tempo.key]} <span style="font-size:8px;font-weight:500">bpm</span></span>
      </td>`;
    INTERPS.forEach(interp => {
      const k = getProgressKey(p.id, 1, p.dir, interp, tempo);
      const done = !!state.progress[k];
      const checkedStyle = done ? `background:${dirColor};border-color:${dirColor};` : '';
      gridRows += `<td><button class="cell-btn ${done?'checked':''}" style="${checkedStyle}" data-dir="${activeDir}" onclick="toggleParcoursCell('${k}',this,\`${dirColor}\`)"></button></td>`;
    });
    gridRows += `</tr>`;
  });
  const thStyle = i => PREVIEW.interp===i
    ? 'background:var(--orange);color:#fff;'
    : 'background:var(--blue);color:rgba(255,255,255,.75);';
  const progGrid = `<div class="prog-grid" style="margin-bottom:10px">
    <table><thead><tr>
      <th style="width:68px;background:var(--blue)"></th>
      ${INTERPS.map(i=>`<th data-interp-th="${i}" onclick="setPreviewInterp('${i}')"
        style="cursor:pointer;transition:all .15s;${thStyle(i)}">${INTERP_LABELS[i]}</th>`).join('')}
    </tr></thead>
    <tbody style="background:${dirBgColor}">${gridRows}</tbody></table></div>`;

  // ── 6. TIROIR UNIQUE : doigté + description + notes ─────────────────────────
  const relBtn = relPat
    ? `<div style="padding-top:8px;border-top:1px solid var(--border);margin-top:8px">
        <button onclick="goToPattern('${relPat.cat}P${relPat.num}')"
          style="font-size:11px;color:var(--blue);background:transparent;border:1px solid var(--blue);
            border-radius:10px;padding:2px 10px;cursor:pointer">
          Voir aussi : ${relPat.cat}P${relPat.num} — ${relPat.name}
        </button>
      </div>` : '';

  const drawerContent = `
    <div style="padding:12px 0 2px;display:flex;flex-direction:column;gap:10px">

      ${(d1hand || altFingeringsInner) ? `
      <div style="display:flex;flex-direction:column;gap:8px">
        ${d1hand ? d1hand : ''}
        ${altFingeringsInner ? `
        <details id="pimt-${p.id}" class="pimt">
          <summary style="font-size:11px;font-weight:700;color:var(--orange);cursor:pointer;
            padding:6px 10px;background:#FFF5EC;border-radius:8px;border:1px solid #F5C9A0;
            list-style:none;display:flex;align-items:center;justify-content:space-between;user-select:none">
            <span>🌶️ Pimenter</span>
            <span class="pimt-arrow" style="font-size:9px;opacity:.7">▶</span>
          </summary>
          <div style="padding:8px 10px 10px;background:#FFFAF5;border:1px solid #F5C9A0;border-top:none;border-radius:0 0 8px 8px">
            ${altFingeringsInner}
          </div>
        </details>` : ''}
      </div>` : ''}

      ${relBtn}

      <textarea placeholder="Notes personnelles…"
        style="width:100%;min-height:52px;padding:8px 10px;font-size:12px;font-family:-apple-system,sans-serif;
          color:var(--text);background:#fafaf8;border:1px solid var(--border);border-radius:8px;
          resize:vertical;outline:none;line-height:1.5"
        onblur="savePatNote('${key}',this.value)">${PAT_NOTES[key]||PAT_NOTES[p.id]||''}</textarea>

    </div>`;

  const infoDrawer = `
    <details id="drawer-${key}" class="info-drawer" style="margin-bottom:2px">
      <summary style="font-size:11px;font-weight:600;color:var(--text2);cursor:pointer;
        padding:7px 10px;background:#f8f7f4;border-radius:8px;border:1px solid var(--border);
        list-style:none;display:flex;align-items:center;justify-content:space-between;user-select:none">
        <span style="display:flex;align-items:center;gap:6px">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Doigté &amp; notes
        </span>
        <span style="font-size:9px;opacity:.5">▼</span>
      </summary>
      ${drawerContent}
    </details>`;

  // ── ENTÊTE : boutons direction pleine largeur ──────────────────────────────
  const codeBase = p.cat + 'P' + p.num;
  const header = dirs.length > 1 ? `
    <div style="margin-bottom:8px">
      ${dirBtns}
    </div>` : '';

  return `
    <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)">
      ${header}
      <div id="pat-train-${p.id}" style="font-size:13px;color:var(--text2);opacity:.7;padding:0 1px 6px;letter-spacing:.1px">— pas encore de lecture —</div>
      ${tabBlock}
      <div style="font-size:11px;font-weight:600;color:var(--text2);letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px;padding-left:1px">Remplis le tableau</div>
      ${progGrid}
      ${infoDrawer}
    </div>`;
}

// ── DIRECTION SELECTOR ──────────────────────────────────────────────────────
function setCardDir(key, dir) {
  previewStop();
  state.cardDir[key] = dir;
  PREVIEW.bpm = HCTRL.bpm;
  PREVIEW.interp = 'Down';
  render();
  // Re-scroll to the card so the user sees the updated body
  setTimeout(() => {
    const el = document.getElementById('card-' + key) || document.getElementById('parc-card-' + key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 60);
}

// ── PATTERNS TAB ──
function diffTag(d) {
  if (d === 'Débutant') return `<span class="tag diff-deb">${d}</span>`;
  if (d === 'Intermédiaire') return `<span class="tag diff-int">${d}</span>`;
  return `<span class="tag diff-adv">${d}</span>`;
}

function dirLabel(d) {
  return {U:'⬆ Ascendant',D:'⬇ Descendant',M:'↕ Mix'}[d] || d;
}

function renderPatterns() {
  const filters = ['all','A2','A3','A4','A5','A6','B8','B6','gamme'];
  const filterLabels = {all:'Tous',A2:'A2 — 2 notes',A3:'A3 — 3 notes',A4:'A4 — 4 notes',A5:'A5 — 5 notes',A6:'A6 — triade ×2',B8:'B8 — 2 cordes ×8',B6:'B6 — multi-cordes',gamme:'Gamme'};
  let html = `<div class="filter-bar">`;
  filters.forEach(f => {
    html += `<button class="${state.filter===f?'active':''}" onclick="setFilter('${f}')">${filterLabels[f]}</button>`;
  });
  html += `</div>`;

  const diffs = ['all','Débutant','Intermédiaire','Avancé'];
  const diffColors = {all:'',Débutant:'diff-deb',Intermédiaire:'diff-int',Avancé:'diff-adv'};
  html += `<div class="filter-seg">`;
  diffs.forEach(d => {
    const active = state.diffFilter === d ? 'active' : '';
    const colorClass = active && d !== 'all' ? diffColors[d] : '';
    html += `<button class="${active} ${colorClass}" onclick="setDiffFilter('${d}')">${d === 'all' ? 'Tous' : d}</button>`;
  });
  html += `</div>`;

  const visible = PATTERNS.filter(p =>
    (state.filter === 'all' || p.cat === state.filter) &&
    (state.diffFilter === 'all' || p.difficulty === state.diffFilter)
  );

  // Group by cat+num
  const groups = {};
  visible.forEach(p => {
    const key = p.cat + 'P' + p.num;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  Object.entries(groups).sort((a,b) => a[0].localeCompare(b[0])).forEach(([key, pats]) => {
    // Passer les gammes (qui seront affichées dans une section séparée)
    if (pats[0].cat === 'gamme') return;

    const base = pats[0];
    const isOpen = state.openCards[key];
    const pct = getGroupPct(key); // toutes directions confondues
    const allIds = pats.map(p=>p.id).join(',');

    const diffDot = {Débutant:'#4a9e6b',Intermédiaire:'#c07830',Avancé:'#a03030'}[base.difficulty]||'#999';

    html += `
    <div class="card" id="card-${key}">
      <div class="card-head" onclick="toggleCard('${key}')">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="width:7px;height:7px;border-radius:50%;background:${diffDot};flex-shrink:0;display:inline-block"></span>
            <h2 style="font-size:14px">${key} — ${base.name}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span id="grppct-${key}" style="font-size:11px;font-weight:600;color:var(--blue)">${pct > 0 ? pct+'%' : ''}</span>
          <button onclick="toggleFavorite('${key}',event)"
            style="background:none;border:none;cursor:pointer;padding:2px;display:flex;align-items:center">
            ${heartSVG(!!state.favorites[key])}
          </button>
          <span style="color:var(--border);font-size:13px;line-height:1;margin:0 1px">·</span>
          <span class="arrow ${isOpen?'open':''}">▶</span>
        </div>
      </div>
      <div class="card-body ${isOpen?'open':''}">`;

    html += renderPatternGroupBody(pats, key);

    html += `</div></div>`;
  });

  // ── Section Gammes (séparée, visible seulement si filtre 'all' ou 'gamme') ──
  const gammeGroups = {};
  PATTERNS.filter(p => p.cat === 'gamme').forEach(p => {
    const key = p.cat + 'P' + p.num;
    if (!gammeGroups[key]) gammeGroups[key] = [];
    gammeGroups[key].push(p);
  });

  if (Object.keys(gammeGroups).length > 0 && (state.filter === 'all' || state.filter === 'gamme')) {
    html += `<div style="margin-top:20px;padding-top:14px;border-top:2px solid var(--border)">
      <h3 style="font-size:12px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;padding:0 4px">🎵 Gammes</h3>`;

    Object.entries(gammeGroups).sort((a,b) => a[0].localeCompare(b[0])).forEach(([key, pats]) => {
      const base = pats[0];
      const isOpen = state.openCards[key];
      const pct = getGroupPct(key);
      const diffDot = {Débutant:'#4a9e6b',Intermédiaire:'#c07830',Avancé:'#a03030'}[base.difficulty]||'#999';

      html += `
      <div class="card" id="card-${key}">
        <div class="card-head" onclick="toggleCard('${key}')">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:7px">
              <span style="width:7px;height:7px;border-radius:50%;background:${diffDot};flex-shrink:0;display:inline-block"></span>
              <h2 style="font-size:14px">${base.name}</h2>
            </div>
            <div class="progress-bar-wrap" style="margin-top:6px"><div id="grpbar-${key}" class="progress-bar" style="width:${pct}%;background:var(--blue)"></div></div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
            <span id="grppct-${key}" style="font-size:11px;font-weight:600;color:var(--blue)">${pct > 0 ? pct+'%' : ''}</span>
            <button onclick="toggleFavorite('${key}',event)"
              style="background:none;border:none;cursor:pointer;padding:2px;display:flex;align-items:center">
              ${heartSVG(!!state.favorites[key])}
            </button>
            <span style="color:var(--border);font-size:13px;line-height:1;margin:0 1px">·</span>
            <span class="arrow ${isOpen?'open':''}">▶</span>
          </div>
        </div>
        <div class="card-body ${isOpen?'open':''}">`;

      html += renderPatternGroupBody(pats, key);

      html += `</div></div>`;
    });

    html += `</div>`;
  }

  return html;
}

function toggleEtape(num) {
  state.etapeOpen[num] = !state.etapeOpen[num];
  saveState();

  // Manipuler directement le DOM au lieu de re-rendre
  const contentDiv = document.getElementById(`etape-content-${num}`);
  const arrow = document.getElementById(`etape-arrow-${num}`);

  if (contentDiv) {
    contentDiv.style.display = state.etapeOpen[num] ? 'block' : 'none';
  }
  if (arrow) {
    arrow.style.transform = state.etapeOpen[num] ? 'rotate(180deg)' : 'rotate(0deg)';
  }
}

function toggleParcours(key) {
  const wasOpen = state.parcoursOpen === key;
  if (wasOpen) previewStop();
  if (!wasOpen) { PREVIEW.bpm = HCTRL.bpm; PREVIEW.interp = 'Down'; PREVIEW.settingsOpen = false; }
  state.parcoursOpen = wasOpen ? null : key;
  // S'assure que l'étape parente est ouverte (sinon parc-card-${key} n'est pas dans le DOM)
  if (!wasOpen) {
    const pat = PATTERNS.find(p => p.cat + 'P' + p.num === key);
    if (pat) state.etapeOpen[pat.etape] = true;
  }
  render();
  if (!wasOpen) {
    setTimeout(() => {
      const el = document.getElementById('parc-card-' + key);
      if (el) el.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }, 60);
  }
}

function refreshDirPctsNoColor(groupKey) {
  // Met à jour la progress bar et le % global avec 3 teintes pour la progress bar
  const gPct = getGroupPct(groupKey);

  // Mettre à jour le % affiché
  const pctEl = document.getElementById('grppct-' + groupKey);
  if (pctEl) { pctEl.textContent = gPct > 0 ? gPct + '%' : ''; }

  // Mettre à jour la progress bar avec couleur selon progression
  const barEl = document.getElementById('grpbar-' + groupKey);
  if (barEl) {
    barEl.style.width = gPct + '%';
    // 3 teintes: bleu < 40%, orange 40-80%, vert >= 80%
    const barColor = gPct >= 80 ? 'var(--green)' : gPct >= 40 ? 'var(--orange)' : 'var(--blue)';
    barEl.style.background = barColor;
  }
}

function refreshDirPcts(groupKey) {
  const pats = PATTERNS.filter(p => p.cat + 'P' + p.num === groupKey);

  // % par direction (Up / Down / Mix)
  ['U','D','M'].forEach(d => {
    const dp = pats.find(p => p.dir === d);
    if (!dp) return;
    let tot = 0, don = 0;
    INTERPS.forEach(i => TEMPOS.forEach(t => {
      tot++;
      if (state.progress[getProgressKey(dp.id, 1, d, i, t)]) don++;
    }));
    const pct = tot ? Math.round(don / tot * 100) : 0;
    const el = document.getElementById('dirpct-' + groupKey + '-' + d);
    if (el) el.textContent = pct > 0 ? pct + '%' : '';
  });

  // % global de la carte (toutes dirs)
  const gPct = getGroupPct(groupKey);
  const gColor = gPct >= 80 ? 'var(--green)' : gPct >= 40 ? 'var(--orange)' : gPct > 0 ? 'var(--blue)' : 'var(--border)';
  const pctEl = document.getElementById('grppct-' + groupKey);
  if (pctEl) { pctEl.textContent = gPct > 0 ? gPct + '%' : '—'; pctEl.style.color = gColor; }
  const barEl = document.getElementById('grpbar-' + groupKey);
  if (barEl) { barEl.style.width = gPct + '%'; barEl.style.background = gColor; }
}



// Mettre à jour le pourcentage de progression en direct pour les patterns spéciaux
function refreshSpecialProgressPercent(patId) {
  const patTrainEl = document.getElementById('pat-train-' + patId);
  if (!patTrainEl) return;

  let totalCells = 0, doneCells = 0;
  TEMPOS.forEach(tempo => {
    INTERPS.forEach(interp => {
      const k = getProgressKey(patId, 1, 'U', interp, tempo);
      totalCells++;
      if (state.progress[k]) doneCells++;
    });
  });

  const progressPercent = totalCells > 0 ? Math.round((doneCells / totalCells) * 100) : 0;
  const percentEl = patTrainEl.querySelector('span:last-child');
  if (percentEl) {
    percentEl.textContent = progressPercent + '%';
  }

  // Mettre à jour aussi le pourcentage du header du groupe
  const pat = PATTERNS.find(p => p.id === patId);
  if (pat) {
    const groupKey = pat.cat + 'P' + pat.num;
    const headerPercentEl = document.getElementById('grppct-' + groupKey);
    if (headerPercentEl) {
      const groupPct = getGroupPct(groupKey);
      headerPercentEl.textContent = groupPct + '%';
    }
  }
}

// ─── SUIVI SÉANCES ────────────────────────────────────────────────────────────
function logSession() {
  const today = new Date().toISOString().slice(0,10);
  let sessions = [];
  try { sessions = JSON.parse(localStorage.getItem('dicoSessions') || '[]'); } catch(e) { console.warn('logSession parse:', e); }
  if (!sessions.includes(today)) {
    sessions.push(today);
    try { localStorage.setItem('dicoSessions', JSON.stringify(sessions)); } catch(e) { console.warn('logSession save:', e); }
  }
}

function getSessions() {
  try { return JSON.parse(localStorage.getItem('dicoSessions') || '[]'); } catch(e) { return []; }
}

function computeStreak(sessions) {
  if (!sessions.length) return { current: 0, record: 0 };
  const set = new Set(sessions);
  const today = new Date();
  let current = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    if (set.has(d.toISOString().slice(0,10))) current++;
    else break;
  }
  // record streak
  const sorted = [...sessions].sort();
  let record = 0, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i-1]), cur = new Date(sorted[i]);
    const diff = (cur - prev) / 86400000;
    if (diff === 1) { run++; record = Math.max(record, run); }
    else run = 1;
  }
  record = Math.max(record, current, sessions.length > 0 ? 1 : 0);
  return { current, record };
}

function renderSessionCalendar() {
  const sessions = getSessions();
  const { current, record } = computeStreak(sessions);
  const set = new Set(sessions);
  const total = sessions.length;

  // Mini calendrier — mois courant
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0=dim
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = now.toISOString().slice(0,10);
  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const dayNames = ['L','M','M','J','V','S','D'];

  // Adjust: start on Monday
  const startOffset = (firstDay + 6) % 7;

  let calCells = '';
  // Day headers
  dayNames.forEach(d => {
    calCells += `<div style="text-align:center;font-size:9px;font-weight:700;color:var(--text2);padding-bottom:3px">${d}</div>`;
  });
  // Empty cells before day 1
  for (let i = 0; i < startOffset; i++) {
    calCells += `<div></div>`;
  }
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const worked = set.has(dateStr);
    const isToday = dateStr === todayStr;
    let bg = 'transparent', color = 'var(--text2)', border = 'none', fw = '400';
    if (worked) { bg = 'var(--blue)'; color = '#fff'; fw = '700'; }
    if (isToday && !worked) { border = '1.5px solid var(--blue)'; color = 'var(--blue)'; fw = '700'; }
    if (isToday && worked) { bg = 'var(--green)'; }
    calCells += `<div style="text-align:center;font-size:10px;font-weight:${fw};color:${color};
      background:${bg};border:${border};border-radius:50%;
      width:22px;height:22px;display:flex;align-items:center;justify-content:center;margin:0 auto">${d}</div>`;
  }

  const streakColor = current >= 7 ? 'var(--green)' : current >= 3 ? 'var(--orange)' : 'var(--blue)';
  // SVG flat icons
  const icoFlame = `<svg width="22" height="26" viewBox="0 0 24 28"><path d="M12 2C12 2 6 8 6 14a6 6 0 0012 0c0-3-2-5-2-5s0 4-4 4c0-4 4-7 4-13z" fill="${streakColor}"/></svg>`;
  const icoTrophy = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4M12 17v4M8 21h8M3 5h18"/><path d="M12 17a7 7 0 007-7V5H5v5a7 7 0 007 7z"/></svg>`;
  const icoCalendar = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  const streakIco = current >= 3 ? icoFlame : icoCalendar;

  return `
  <div style="background:var(--bg);border-radius:var(--radius);padding:4px 0 8px;">
    <div style="display:flex;gap:8px;margin-bottom:14px">
      <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
        <div style="margin-bottom:6px">${streakIco}</div>
        <div style="font-size:22px;font-weight:800;color:${streakColor};line-height:1">${current}</div>
        <div style="font-size:10px;color:var(--text2);margin-top:3px">Série</div>
      </div>
      <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
        <div style="margin-bottom:6px">${icoTrophy}</div>
        <div style="font-size:22px;font-weight:800;color:var(--text);line-height:1">${record}</div>
        <div style="font-size:10px;color:var(--text2);margin-top:3px">Record</div>
      </div>
      <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
        <div style="margin-bottom:6px">${icoCalendar}</div>
        <div style="font-size:22px;font-weight:800;color:var(--text);line-height:1">${total}</div>
        <div style="font-size:10px;color:var(--text2);margin-top:3px">Total jours</div>
      </div>
    </div>

    <div style="font-size:11px;font-weight:600;color:var(--text2);text-align:center;margin-bottom:6px">
      ${monthNames[month]} ${year}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
      ${calCells}
    </div>
  </div>`;
}

function setFilter(f) {
  state.filter = f;
  render();
}

function filterByGroup(groupKey) {
  // Extrait la catégorie du groupKey (ex: "A4P1a" → "A4")
  const cat = groupKey.split('P')[0];
  state.filter = cat;
  state.diffFilter = 'all';
  render();
}

function setDiffFilter(d) {
  state.diffFilter = d;
  render();
}





// ── Calendrier rétractable (utilisé dans Mes séances) ──
function renderCalendarAccordion() {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = now.toISOString().slice(0,10);
  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const dayNames = ['L','M','M','J','V','S','D'];
  const sessions = getSessions();
  const set = new Set(sessions);
  const startOffset = (firstDay + 6) % 7;

  let calCells = '';
  dayNames.forEach(d => {
    calCells += `<div style="text-align:center;font-size:9px;font-weight:700;color:var(--text2);padding-bottom:3px">${d}</div>`;
  });
  for (let i = 0; i < startOffset; i++) calCells += `<div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const worked = set.has(dateStr), isToday = dateStr === todayStr;
    let bg = 'transparent', color = 'var(--text2)', border = 'none', fw = '400';
    if (worked)  { bg = 'var(--blue)'; color = '#fff'; fw = '700'; }
    if (isToday && !worked) { border = '1.5px solid var(--blue)'; color = 'var(--blue)'; fw = '700'; }
    if (isToday && worked)  { bg = 'var(--green)'; }
    calCells += `<div style="text-align:center;font-size:10px;font-weight:${fw};color:${color};
      background:${bg};border:${border};border-radius:50%;
      width:22px;height:22px;display:flex;align-items:center;justify-content:center;margin:0 auto">${d}</div>`;
  }

  return `
  <details style="border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:2px">
    <summary style="padding:10px 14px;cursor:pointer;user-select:none;font-size:13px;font-weight:700;
      list-style:none;color:var(--text2);display:flex;align-items:center;gap:6px">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Calendrier — ${monthNames[month]} ${year}
    </summary>
    <div style="padding:10px 14px 12px;background:var(--bg)">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">${calCells}</div>
    </div>
  </details>`;
}

// ── PROGRESSION TAB ──
function renderGlobalProgress() {
  // Grouper par cat+num pour ne compter qu'une fois par groupe (comme les cartes)
  const groups = {};
  PATTERNS.forEach(p => {
    const key = p.cat + 'P' + p.num;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  const cats = ['A4','A3','A2','A5','A6','B8','B6'];
  const catLabels = {A4:'A4 — 4 notes',A3:'A3 — 3 notes',A2:'A2 — 2 notes',A5:'A5 — 5 notes',A6:'A6 — triade ×2',B8:'B8 — 2 cordes ×8',B6:'B6 — multi-cordes'};

  // Total global
  let totalAll = 0, doneAll = 0;
  PATTERNS.forEach(p => {
    const mode = p.dir;
    [1].forEach(f => INTERPS.forEach(i => TEMPOS.forEach(t => {
      totalAll++;
      if (state.progress[getProgressKey(p.id, f, mode, i, t)]) doneAll++;
    })));
  });
  const globalPct = totalAll > 0 ? Math.round(doneAll / totalAll * 100) : 0;

  // ── Stats séances pour le résumé accordion ──
  const sessions = getSessions();
  const { current: streak, record } = computeStreak(sessions);
  const totalDays = sessions.length;
  const icoFlameInline = `<svg style="display:inline;vertical-align:middle" width="11" height="13" viewBox="0 0 24 28" fill="var(--orange)"><path d="M12 2C12 2 6 8 6 14a6 6 0 0012 0c0-3-2-5-2-5s0 4-4 4c0-4 4-7 4-13z"/></svg>`;
  const icoTrophyInline = `<svg style="display:inline;vertical-align:middle" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4M12 17v4M8 21h8M3 5h18"/><path d="M12 17a7 7 0 007-7V5H5v5a7 7 0 007 7z"/></svg>`;
  const fireEmoji = streak >= 3 ? icoFlameInline : '';

  // ── Chrono numérique ──
  const chronoS = Math.floor((CHRONO.elapsed + (CHRONO.running ? Date.now() - CHRONO.startAt : 0)) / 1000);
  const chronoMM = String(Math.floor(chronoS/60)).padStart(2,'0');
  const chronoSS = String(chronoS%60).padStart(2,'0');

  // ═══ 1 — MES SÉANCES (ouvert, calendrier rétractable) ═══════════════════════
  let html = `<details class="prog-acc" open>
    <summary>Mes séances<span class="prog-sum-stat"><input type="checkbox" id="toggle-header-stats" onchange="toggleHeaderStats()" style="margin-right:6px" ${state.showHeaderStats ? 'checked' : ''}/><label for="toggle-header-stats" style="cursor:pointer;margin-right:8px">Afficher dans le header</label>${fireEmoji} ${streak} j · ${icoTrophyInline} ${record} · ${totalDays} j</span></summary>
    <div class="prog-acc-body">`;

  // Stats (toujours visibles quand la section est ouverte) — réutilise sessions/streak/record déclarés plus haut
  const sColor  = streak >= 7 ? 'var(--green)' : streak >= 3 ? 'var(--orange)' : 'var(--blue)';
  const icoFlame2  = `<svg width="22" height="26" viewBox="0 0 24 28"><path d="M12 2C12 2 6 8 6 14a6 6 0 0012 0c0-3-2-5-2-5s0 4-4 4c0-4 4-7 4-13z" fill="${sColor}"/></svg>`;
  const icoTrophy2 = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4M12 17v4M8 21h8M3 5h18"/><path d="M12 17a7 7 0 007-7V5H5v5a7 7 0 007 7z"/></svg>`;
  const icoCalSm2  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  const streakIco2 = streak >= 3 ? icoFlame2 : icoCalSm2;

  html += `
  <div style="display:flex;gap:8px;margin-bottom:12px">
    <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
      <div style="margin-bottom:6px">${streakIco2}</div>
      <div style="font-size:22px;font-weight:800;color:${sColor};line-height:1">${streak}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:3px">Série</div>
    </div>
    <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
      <div style="margin-bottom:6px">${icoTrophy2}</div>
      <div style="font-size:22px;font-weight:800;color:var(--text);line-height:1">${record}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:3px">Record</div>
    </div>
    <div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center">
      <div style="margin-bottom:6px">${icoCalSm2}</div>
      <div style="font-size:22px;font-weight:800;color:var(--text);line-height:1">${totalDays}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:3px">Total jours</div>
    </div>
  </div>`;

  // Calendrier — sous-accordéon rétractable
  html += renderCalendarAccordion();
  html += `</div></details>`;

  // ═══ 2 — DÉTAIL PAR PATTERN ══════════════════════════════════════════════════
  html += `<details class="prog-acc"><summary>Détail par pattern</summary><div class="prog-acc-body">`;
  html += `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px">`;

  Object.entries(groups).forEach(([key, pats]) => {
    const pct = getGroupPct(key);
    const color = 'var(--blue)';
    const isFav = !!state.favorites[key];
    const patId = pats[0].id;
    const isPinned = state.pinnedSession === patId;
    html += `
    <div style="position:relative;background:var(--card);border:2px solid ${pct>0?color:'var(--border)'};border-radius:8px;overflow:hidden">
      <button onclick="selectPatAndGo('${patId}')" style="width:100%;padding:7px 4px 7px;cursor:pointer;text-align:center;background:none;border:none">
        <div style="font-size:10px;font-weight:700;color:var(--text2)">${key}</div>
        <div style="font-size:16px;font-weight:800;color:${color}">${pct}%</div>
      </button>
      ${isFav ? '<div style="position:absolute;top:2px;right:2px;padding:2px;line-height:0;pointer-events:none"><svg width="13" height="13" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E91E63" stroke="#E91E63" stroke-width="2.5"/></svg></div>' : ''}
    </div>`;
  });

  html += `</div></div></details>`;

  // ═══ 3 — PROGRESSION GLOBALE ═════════════════════════════════════════════════
  html += `<details class="prog-acc">
    <summary>Progression globale<span class="prog-sum-stat" style="color:var(--blue)">${globalPct}%</span></summary>
    <div class="prog-acc-body">`;
  html += `
  <div style="background:var(--blue);border-radius:var(--radius);padding:13px 16px;margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(244,238,226,.6)">Global</div>
        <div style="font-size:19px;font-weight:800;color:var(--header-text)">Progression</div>
      </div>
      <div style="font-size:28px;font-weight:800;color:${globalPct>0?'var(--header-text)':'rgba(244,238,226,.35)'}">${globalPct}%</div>
    </div>
    <div style="height:4px;background:rgba(244,238,226,.2);border-radius:2px">
      <div style="height:4px;background:var(--orange);border-radius:2px;width:${globalPct}%"></div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px">`;

  cats.forEach(cat => {
    const catPatterns = PATTERNS.filter(p => p.cat === cat);
    if (catPatterns.length === 0) return;
    let t = 0, d = 0;
    catPatterns.forEach(p => {
      const mode = p.dir;
      [1].forEach(f => INTERPS.forEach(i => TEMPOS.forEach(tempo => {
        t++;
        if (state.progress[getProgressKey(p.id, f, mode, i, tempo)]) d++;
      })));
    });
    const pct = t > 0 ? Math.round(d / t * 100) : 0;
    const color = pct >= 80 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--blue)';
    html += `
    <div style="background:var(--card);border-radius:10px;padding:10px 12px;box-shadow:0 1px 4px rgba(0,0,0,.06)">
      <div style="font-size:11px;color:var(--text2);margin-bottom:4px">${catLabels[cat]}</div>
      <div style="font-size:22px;font-weight:800;color:${color}">${pct}%</div>
      <div class="progress-bar-wrap" style="margin-top:6px"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  });

  html += `</div></div></details>`;


  return html;
}

function selectPatAndGo(id) {
  const pat = PATTERNS.find(p => p.id === id);
  if (pat) goToPattern(pat.cat + 'P' + pat.num);
}

function renderProgress() {
  return renderGlobalProgress();
}


function goToPattern(groupKey) {
  // Ouvre le tiroir du pattern dans l'onglet Patterns
  // Reset les filtres pour être sûr que la carte est visible
  state.filter = 'all';
  state.diffFilter = 'all';
  state.openCards[groupKey] = true;
  showTab('patterns');
  setTimeout(() => {
    const el = document.getElementById('card-' + groupKey);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 80);
}


// ── GUIDE TAB ──
function renderGuide() {
  const cardStyle = 'margin-bottom:10px';
  const bodyStyle = 'padding:0 14px 18px';

  // Helper pour accordéon
  const sub = (title, content, open) =>
    `<details${open ? ' open' : ''} style="border-top:1px solid rgba(244,238,226,.07);margin-top:10px">
      <summary style="list-style:none;display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:9px 0;font-size:13px;font-weight:600;color:var(--text1);user-select:none">
        ${title}
        <svg class="sub-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="2 4 6 8 10 4"/></svg>
      </summary>
      <div style="padding-bottom:10px">${content}</div>
    </details>`;

  return `
  <style>
    details[open] .sub-chevron{transform:rotate(180deg)}
    .sub-chevron{transition:transform .18s;flex-shrink:0}
    details summary::-webkit-details-marker{display:none}
  </style>

  <!-- ── NOTES DE VERSION ── -->
  <div class="card" style="${cardStyle}">
    <div class="card-head" style="cursor:default">
      <div style="display:flex;align-items:center;gap:8px;color:var(--text1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span style="font-size:14px;font-weight:700">Notes de version</span>
      </div>
    </div>
    <div class="card-body open" style="${bodyStyle}">

      ${sub('v1.14', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li><strong>Patterns B6P1a/b/c</strong> — intégrés avec système static tabMid/tabHigh (sans transformation dynamique)</li>' +
        '<li><strong>Patterns B12P1c U/D/M</strong> — concept doublé (6×2=12 notes) pour ancrage du geste par répétition motrice. Static tabs midneck/highneck.</li>' +
        '<li>High neck gammes corrigées — transposition +7 appliquée correctement sans double décalage</li>' +
        '<li>Architecture regex mise à jour — support optionnel des espaces dans labels de cordes (e | vs e|)</li>' +
        '<li>Framework B12 complète — B12P1c trois directions intégrées. B12P1a/b à venir en futurs updates.</li>' +
        '<li>Centralisation transformation — previewStart() unique source of truth pour transformTab(). parseTabNotes() et parseTabForCursor() acceptent tabs pré-transformés.</li>' +
        '</ul>')}

      ${sub('v1.12', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li><strong>Système de Gammes Spéciales</strong> — lecture note-par-note sur 2 mesures complètes (6 montée + 6 retour)</li>' +
        '<li>Section 🎵 Gammes dédiée — visible seulement si filtre = « Tous » ou « Gamme », cachée dans autres filtres (A2-A6, B6, B8)</li>' +
        '<li>UI simplifiée pour gammes — pas de direction U/D/M, grille sans colonne direction</li>' +
        '<li>Format ASCII flexible — tablature 6 cordes avec variabilité d\'espaces supportée (EADGBe)</li>' +
        '<li>Pourcentage de progression en temps réel — mise à jour instantanée sans fermer l\'accordéon</li>' +
        '<li>Boutons de progression redessinés — blanc + bordure grise discrète au repos, colorés quand cochés (meilleur contraste)</li>' +
        '<li>2 gammes incluses : Pentatonic C/Am forme 1 · Pentatonic Bb/Gm forme 2</li>' +
        '<li>Documentation : guide GAMMES_vs_PATTERNS.md avec checklist pour ajouter nouvelles gammes</li>' +
        '</ul>')}


      ${sub('v1.11', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li><strong>Accordéons fluides</strong> — Challenge du jour et Étapes s\'ouvrent/ferment instantanément sans re-render</li>' +
        '<li>Animation flèche cohérente partout — rotation 180° sur tous les accordéons (Étapes 1-3, Challenge)</li>' +
        '<li>Sauvegarde d\'état des accordéons — le Challenge du jour se souvient d\'être ouvert ou fermé</li>' +
        '<li>Réglage Mode Pyramide — le BPM monte jusqu\'au max, puis redescend jusqu\'au min en boucle</li>' +
        '<li>Amélioration visuelle du dés SVG (ombre douce) et couleur orange adoucie du Challenge</li>' +
        '<li>Readabilité : texte de journalisation augmenté (13px, opacité 0.7)</li>' +
        '<li>Pattern A4P2d modifié — descendant 6-7-8-5 → 8-5-6-7, retour et mix ajustés</li>' +
        '</ul>')}

      ${sub('v1.09', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Nouveaux patterns B8 — 2 cordes × 8 notes : B8P1bU, B8P1bD, B8P1bM</li>' +
        '<li>Catégorie B8 ajoutée à la progression</li>' +
        '<li>Fix : flèches de mesure affichées correctement sur les retours (cascade)</li>' +
        '<li>Fix : lignes de retour débutant par un chiffre reconnues dans tous les parseurs</li>' +
        '</ul>')}

      ${sub('v1.08', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Pinch-to-zoom + pan sur les tablatures — zoom autour du point de contact, déplacement libre, spring-back au relâcher</li>' +
        '<li>BPM passe en rouge quand le plateau est atteint en mode Entraînement</li>' +
        '<li>Nouveau parcours en 3 étapes : <strong>La base</strong> · <strong>L\'indépendance</strong> · <strong>L\'extension</strong></li>' +
        '<li>A4P1d et A6P1c reclassifiés Intermédiaire</li>' +
        '</ul>')}

      ${sub('v1.05', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Journalisation : date en premier dans chaque ligne</li>' +
        '</ul>')}

      ${sub('v1.04', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Journalisation séparée : mode Libre (tempo max) et mode Entraînement (min/max) sur deux lignes distinctes</li>' +
        '<li>L\'incrément de BPM en entraînement ne pollue plus les données du mode libre</li>' +
        '</ul>')}

      ${sub('v1.03', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Fix : le toggle Mode Entraînement ouvrait le mauvais onglet</li>' +
        '<li>Plages preset tempo corrigées : 20–60 · 60–100 · 100–200 — défauts 40 / 70 / 100</li>' +
        '<li>Nouvel onglet Affichage dans les réglages : groupe de cordes, case départ, mode paysage</li>' +
        '</ul>')}

      ${sub('v1.02', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Patterns A2 reclassifiés Intermédiaire</li>' +
        '<li>Réorganisation des onglets Réglages (Son · Tempo · Boucle)</li>' +
        '<li>Mode Paysage déplacé en section commune au-dessus du reset</li>' +
        '</ul>')}

      ${sub('v1.01', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Mode Paysage dans les réglages (verrouillage orientation tablette)</li>' +
        "<li>Wake lock : l'écran reste allumé pendant la pratique, se libère après 5 min d'inactivité</li>" +
        '<li>Journalisation des sessions au-dessus de la tablature</li>' +
        '<li>Refonte des boutons direction (↑ Ascendant · ↓ Descendant · ↑↓ Mix) aux couleurs du tableau de progression</li>' +
        '<li>Suppression du chronomètre dans la section Progression</li>' +
        '</ul>')}

      ${sub('v1.00 — initial', '<ul style="font-size:12.5px;color:var(--text2);line-height:1.75;padding-left:16px;margin:0">' +
        '<li>Dictionnaire de patterns guitar (A2, A4, A6) avec tablatures interactives</li>' +
        '<li>Lecture audio Web Audio API (Legato · Alternate ↓ · Alternate ↑) + curseur animé</li>' +
        '<li>Métronome, présets tempo, mode Entraînement BPM automatique</li>' +
        '<li>Parcours guidé, tableau de progression, favoris, statistiques de session</li>' +
        '<li>Grande vue paysage automatique, boucle étendue, son actif en mode silencieux iOS</li>' +
        '<li>PWA installable, données sauvegardées localement</li>' +
        '</ul>')}

    </div>
  </div>`;
}


