# 🎸 Différence: PATTERNS vs GAMMES

## Pattern Normal (U/D/M)
**Cas d'usage:** Exercices techniques avec directions (ascendant/descendant/mix)

### Structure du code
```javascript
{
  id: "A4P2aU",           // ID unique + direction
  cat: "A4",              // Catégorie (A2-A6, B6, B8)
  dir: "U",               // Direction: U, D, ou M
  num: "2a",              // Numéro du pattern
  notes: 4,               // Nombre de notes
  etape: 1,               // Numéro d'étape du parcours
  difficulty: "Débutant",
  name: "Chromatique",
  bpm: 60,
  bpmTarget: 130,
  fingerings: ['ind + maj + ann + aur', ...],  // Doigtés multiples
  tab: `e|...\nB|...\n↩ retour\n...`
}
```

### Format ASCII
- **Header:** Lignes avec `e |`, `B |`, `G |`, `D |`, `A |`, `E |` (6 cordes)
- **Montée:** Première section (ascendant)
- **Séparateur:** `↩ retour` + description
- **Retour:** Deuxième section (descendant/décalé)
- **Terminator:** `|||` en fin de retour

```
e|--------------------------5-6-7-8-|
B|------------------5-6-7-8---------|
G|----------5-6-7-8-----------------|
D|--5-6-7-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-7-8-9-------------------------|||
```

### Propriétés requises
- ✅ Direction (U/D/M)
- ✅ Doigtés (`fingerings` array)
- ✅ Étape du parcours (`etape`)
- ✅ Format tab avec séparateur `↩`
- ✅ Trois versions de chaque pattern (U, D, M)

### Propriété optionnelle: `fretOffset`
**Cas d'usage:** Décaler les numéros de case pour éviter les doublons à l'affichage (patterns avec extensions)

```javascript
{
  id: "A4P1dU",
  // ... propriétés standards ...
  fretOffset: -1,    // Décale toutes les cases de -1 (réduit de 1 semitone)
  tab: `e|...-9-5-9-5...`  // Les 9 s'afficheront comme 8, les 5 comme 4, etc.
}
```

**Fonctionnement:**
- Paramètre optionnel (défaut: 0, aucun décalage)
- S'ajoute au décalage de `neckPosition` (mid: 0, high: 7)
- Appliqué par `transformTab()` lors du rendu
- Affecte l'affichage UNIQUEMENT (les doigtés et l'audio utilisent toujours les cases d'origine)

**Exemples d'application:**
- `A4P1d*` (Alternance tierce majeure) → `-1` pour éviter 9-10-9-10
- `A6P1c*` (Triade doublée 1-3-5) → `-1` pour simplifier 9-7-5
- `A3P1c*`, `A3P2c*`, `A2P1d*`, `A4P?a*` → `-1` pour lisibilité

---

## Gamme (Pattern Spécial)
**Cas d'usage:** Gammes compètes, 12 notes, lecture note-par-note sur 2 mesures

### Structure du code
```javascript
{
  id: "gammeP1",           // ID simple, pas de direction
  cat: "gamme",            // Catégorie obligatoire
  num: "1",                // Numéro de la gamme
  special: true,           // ⚠️ FLAG OBLIGATOIRE
  notes: 12,               // Toujours 12 (6 montée + 6 retour)
  difficulty: "Débutant",
  name: "Pentatonic C/Am forme 1",
  bpm: 120,
  bpmTarget: 120,
  // ❌ PAS de: fingerings, etape, dir
  tab: `e |--5--8--...\n↩\n--8--5--...`
}
```

### Format ASCII
- **Header:** Lignes avec `e |`, `B |`, `G |`, `D |`, `A |`, `E |` (6 cordes)
- **Montée:** 6 notes (une par corde, de bas en haut ou haut en bas)
- **Séparateur:** Ligne vide simple (pas de `↩`)
- **Retour:** 6 notes identiques à l'inverse
- **Terminator:** `||` en fin

```
e |--5--8----|
B |-5--8------|
G |5--8-------|
D |-8--------|
A |8---------|
E |----------|


--8--5--||
--8--5--||
--8--5--||
--8-----||
--8-----||
---------||
```

### Propriétés requises
- ✅ `special: true` (obligatoire!)
- ✅ `cat: "gamme"` (obligatoire!)
- ✅ Format ASCII: 6 cordes, 2 sections séparées
- ✅ Pas de direction (U/D/M)
- ✅ Pas de doigtés
- ✅ Une seule version (pas de copies U/D/M)

### Comportement spécifique aux gammes
- ✅ Lecture note-par-note (pas de grouping par colonne)
- ✅ Affichage simplifié (pas de boutons direction)
- ✅ Section séparée "🎵 Gammes" (visible seulement si filtre = "Tous" ou "Gamme")
- ✅ Grille de progression sans colonne direction
- ✅ Symboles de médiator (↑↓) sur les deux sections
- ✅ Pourcentage de progression en temps réel

---

## Checklist: Ajouter une nouvelle Gamme

1. **Format ASCII valide?**
   - [ ] 6 lignes avec headers `e |`, `B |`, `G |`, `D |`, `A |`, `E |`
   - [ ] 6 notes en montée, 6 notes en retour
   - [ ] Séparateur ligne vide entre sections
   - [ ] Termine par `||`

2. **Objet JavaScript complet?**
   - [ ] `id: "gammeP#"` (unique)
   - [ ] `cat: "gamme"`
   - [ ] `special: true`
   - [ ] `num: "#"`
   - [ ] `name: "Nom complet"`
   - [ ] `bpm: value`
   - [ ] `notes: 12`
   - [ ] `difficulty: "Débutant"|"Intermédiaire"|"Avancé"`

3. **Pas de propriétés interdites?**
   - [ ] ❌ Pas de `dir`
   - [ ] ❌ Pas de `fingerings`
   - [ ] ❌ Pas de `etape`

4. **Test rapide?**
   - [ ] Filtre "Tous" → gamme visible
   - [ ] Filtre "A2"/"A3"/etc → gamme cachée
   - [ ] Filtre "Gamme" → gamme visible
   - [ ] Click play → lecture note-par-note
   - [ ] Grille progression fonctionne

---

## Exemple complet: Pentatonic C/Am forme 1

```javascript
{
  id: "gammeP1",
  cat: "gamme",
  num: "1",
  special: true,
  notes: 12,
  difficulty: "Débutant",
  name: "Pentatonic C/Am forme 1",
  bpm: 120,
  bpmTarget: 120,
  tab: `e |--------------------------------5--8----|
B |--------------------------5--8----------|
G |--------------------5--7----------------|
D |--------------5--7----------------------|
A |--------5--7----------------------------|
E |--5--8----------------------------------|


--8--5----------------------------------||
--------8--5----------------------------||
--------------7--5----------------------||
--------------------7--5----------------||
--------------------------7--5----------||
--------------------------------8--5----||`
}
```

Ajout dans le fichier: Après la dernière ligne de `PATTERNS = [...]`, avant le `];`

---

---

## Pattern Statique (tabMid / tabHigh)
**Cas d'usage:** Patterns multi-cordes (B6, B8) dont la structure visuelle serait cassée par la transposition automatique (ex: cases 5→12 avec décalage d'alignement des tirets).

### Quand utiliser tabMid/tabHigh ?
- Le pattern utilise des **cases à 1 chiffre en mid** (ex: 5, 7) et **2 chiffres en high** (ex: 12, 14)
- La transposition automatique `+7` casserait l'alignement des tirets dans la tab
- Le décalage de corde caractéristique du pattern doit être **préservé visuellement**

### Structure du code
```javascript
{
  id: "B6P1aU",
  cat: "B6",
  // ... propriétés standards ...
  tabMid: `e|...(cases 5-7)...`,   // Position mid (case 5), alignement cases 1 chiffre
  tabHigh: `e|...(cases 12-14)...` // Position high (case 12), alignement cases 2 chiffres
  // ❌ PAS de propriété `tab` — remplacée par tabMid + tabHigh
}
```

### Règle de construction de tabHigh
**tabHigh = tabMid avec toutes les cases +7 demi-tons**
- Cas `5` → `12`, cas `7` → `14`, cas `6` → `13`, cas `8` → `15`, etc.
- Les tirets doivent être **recalculés** pour correspondre aux largeurs des nombres à 2 chiffres

### Comportement dans le système

| Transformation | Pattern classique (`tab`) | Pattern statique (`tabMid`/`tabHigh`) |
|---|---|---|
| **Sélection neck** | `tab` unique + offset +7 auto | `tabMid` ou `tabHigh` selon `SETTINGS.neckPosition` |
| **Fret offset** | ✅ Appliqué automatiquement | ❌ Déjà intégré dans tabMid/tabHigh |
| **String shift (EADG)** | ✅ Appliqué | ✅ Appliqué via `applyStaticTabTransform()` |

### Fonction clé : `applyStaticTabTransform(rawTab)`
Définie dans `index.html`, utilisée dans `render.js` et `audio.js`.

```javascript
function applyStaticTabTransform(rawTab) {
  const shift = STRING_SHIFTS[SETTINGS.stringGroup] || 0;
  return shift !== 0 ? tabApplyStringShift(rawTab, shift) : rawTab;
}
```

**Pourquoi cette fonction existe:**
- Les tabs statiques bypassaient auparavant TOUT `transformTab` (pour éviter le fret offset)
- Mais cela bloquait aussi le **string shift** (EADG/ADGB)
- `applyStaticTabTransform` applique UNIQUEMENT le string shift, sans toucher aux frets

### Pipeline de rendu selon le type de pattern

```
Pattern classique:
  tab → getEffectiveTab() → transformTab() → [stringShift + fretOffset] → affichage

Pattern statique:
  tabMid ou tabHigh → getEffectiveTab() → applyStaticTabTransform() → [stringShift SEULEMENT] → affichage
```

### Fichiers concernés
- `index.html` : `getTabForNeckPosition()`, `isStaticNeckTab()`, `applyStaticTabTransform()`
- `render.js` : affichage de la tab (2 occurrences)
- `audio.js` : lecture audio (2 occurrences : parsing + curseur)

### Patterns actuellement en format statique
- `B6P1a`, `B6P1b`, `B6P1c` (Run de gamme multi-cordes)
- `B8P1b` (Alternance 2 cordes U/D/M)
- `B8P2a` (Bumblebee U/D/M)

---

---

## Sélection de cordes pour les gammes

**Cas d'usage :** L'utilisateur veut travailler un fragment de gamme sur un sous-ensemble de cordes (ex : seulement E, A, D pour la main gauche grave ; ou G, B, e pour préparer un solo).

### Interface

Barre de 6 boutons ronds au-dessus de la tab, dans l'ordre guitare **grave → aigu** : `E · A · D · G · B · e`

- **Active** → fond vert, texte blanc
- **Inactive** → fond gris, texte gris clair
- Bouton **Tout** visible uniquement si au moins une corde est désactivée
- Minimum 1 corde toujours active (protection)

### État persistant

```javascript
// Dans state.gammeActiveStrings (localStorage)
{
  "gammeP1": [true, true, true, true, true, true],  // toutes actives
  "gammeP2": [true, false, true, true, true, true]   // A désactivée
}
// Index : 0=e · 1=B · 2=G · 3=D · 4=A · 5=E
```

### Fonctions clés (index.html)

| Fonction | Rôle |
|----------|------|
| `getGammeActiveStrings(patId)` | Retourne le tableau de 6 booléens (toutes `true` par défaut) |
| `applyGammeStringFilter(tabStr, activeStrings)` | Masque les notes des cordes inactives par des tirets |
| `toggleGammeString(patId, idx)` | Toggle une corde + mise à jour DOM ciblée |
| `resetGammeStrings(patId)` | Réactive toutes les cordes + mise à jour DOM |

### Pourquoi masquer plutôt que supprimer les lignes ?

Le parser audio `parseSectionSpecial()` utilise `unlabeledIdx` pour mapper les lignes sans label (section retour) vers les cordes dans l'ordre `['e','B','G','D','A','E']`. Si on **supprime** une ligne inactive, l'index se décale et les mauvaises notes sont assignées aux mauvaises cordes.

Le **masquage** (remplacement des chiffres par des tirets de même longueur) préserve la structure de lignes tout en silençant les notes :

```
// Corde A désactivée — masquage :
A |--------5--7------||   →   A |----------------||
// La ligne existe toujours → unlabeledIdx reste cohérent
```

### Pipeline d'application du filtre

```
Affichage (render.js) :
  rawTab → applyGammeStringFilter(tab, activeStrings) → cleanTabDisplay → tabWithSymbols → pre.innerHTML

Audio (audio.js previewPlay) :
  rawTab → applyGammeStringFilter(tab, activeStrings) → parseTabNotesSpecial → cycle

Curseur (audio.js previewPlay) :
  rawTab → applyGammeStringFilter(tab, activeStrings) → parseTabForCursorSpecial → steps

Rafraîchissement interp (audio.js setPreviewInterp) :
  rawTab → applyGammeStringFilter(tab, activeStrings) → pre.innerHTML
```

### Mise à jour DOM ciblée

`toggleGammeString()` et `resetGammeStrings()` mettent à jour **sans `render()` global** :
- `document.getElementById('tab-pre-' + patId)` → contenu tab rechargé
- `document.getElementById('gamme-str-btn-' + patId + '-' + i)` → styles boutons
- `document.getElementById('gamme-reset-btn-' + patId)` → visibilité bouton Tout

→ Pas de scroll reset, pas de clignotement, réponse instantanée.

---

## Gamme avec onglets de direction (`hasDirectionTabs`)

**Cas d'usage :** Une gamme pédagogiquement bidirectionnelle — par exemple la pentatonique en transition entre deux formes (montée shape #1 / descente shape #2, ou l'inverse). Une seule carte, deux variantes jouables, sans multiplier les exercices.

### Structure du code

```javascript
{
  id: "pentaTrans1",
  cat: "gamme",
  num: "7",
  special: true,
  hasDirectionTabs: true,      // ← active le système d'onglets
  notes: 12,
  difficulty: "Intermédiaire",
  name: "Pentatonic Transition 1↔2",
  bpm: 90,
  bpmTarget: 120,
  directions: {
    "1→2": `e |...tab montée #1 / descente #2...`,
    "2→1": `e |...tab montée #2 / descente #1...`
  }
  // ❌ PAS de propriété `tab` — remplacée par `directions`
}
```

### Interface

Deux boutons pleine largeur au-dessus de la tab (avant le sélecteur de cordes) :

- **Actif** → fond `var(--blue)`, texte blanc
- **Inactif** → transparent, texte `var(--text2)`
- Cliquer change la direction → tab + grille de progression mis à jour instantanément, sans re-render global

### État persistant

```javascript
// Dans state.gammeSelectedDir (localStorage)
{
  "pentaTrans1": "1→2"   // direction active par gamme
}
```

### Fonctions clés

| Fonction | Fichier | Rôle |
|----------|---------|------|
| `getGammeSelectedDir(patId)` | `index.html` | Retourne la direction active (première par défaut) |
| `getGammeActiveTab(pat)` | `index.html` | Retourne le tab de la direction sélectionnée |
| `setGammeDirection(patId, dirKey)` | `index.html` | Change la direction + met à jour tab, grille et boutons |
| `buildGammeProgGrid(p)` | `render.js` | Génère le HTML de la grille de progression (utilisé au render initial ET au live refresh) |

### Progression séparée par direction

Chaque direction a sa propre progression indépendante. La clé localStorage encode la direction :

```javascript
// Format de la clé :
progressId = patId + '__' + dirKey.replace(/[→↔]/g, '-')

// Exemples :
"pentaTrans1__1-2__1__U__Down__lent"
"pentaTrans1__2-1__1__U__Down__cool"
```

Le `th` de la grille affiche un **badge** de la direction active (ex : `1→2`) pour que l'utilisateur sache toujours quelle progression il remplit.

Le **% global** de la carte (affiché dans le header) agrège les progressions des deux directions via `getGroupPct()` dans `state.js`.

### Pipeline complet

```
Affichage tab :
  pat.directions[dirKey] → transformTab() → applyGammeStringFilter() → tabWithSymbols → pre.innerHTML

Audio :
  pat.directions[dirKey] → transformTab() → applyGammeStringFilter() → parseTabNotesSpecial → cycle

Curseur :
  pat.directions[dirKey] → transformTab() → applyGammeStringFilter() → parseTabForCursorSpecial → steps
```

### Mise à jour DOM ciblée au changement de direction

`setGammeDirection()` met à jour sans `render()` global :
- `document.getElementById('tab-pre-' + patId)` → tab rechargée
- `document.getElementById('gamme-prog-' + patId)` → grille régénérée via `buildGammeProgGrid(pat)`
- `document.getElementById('pat-train-' + patId)` → % progression rechargé
- `document.getElementById('gamme-dir-btn-' + patId + '-' + dk)` → styles boutons

### Règle de nommage des IDs de bouton de direction

Les caractères `→` et `↔` sont remplacés par `_` dans l'ID HTML pour éviter les problèmes de sélecteur :
```javascript
btnId = 'gamme-dir-btn-' + patId + '-' + dk.replace(/[→↔]/g, '_')
// "1→2" → id="gamme-dir-btn-pentaTrans1-1_2"
```

---

## Badge de mode dans la grille de progression (patterns classiques)

**Cas d'usage :** Indiquer visuellement dans le tableau de progression quel mode (Ascendant / Descendant / Mix) est actuellement affiché, sans avoir à lever les yeux vers les boutons de direction.

### Interface

Un badge coloré dans le `th` du coin gauche de la grille, aux couleurs du mode actif :

| Mode | Label | Couleur |
|------|-------|---------|
| U (Ascendant) | `↑ Asc.` | `#1a7a5e` (vert teal) |
| D (Descendant) | `↓ Desc.` | `#b84a20` (orange brun) |
| M (Mix) | `↑↓ Mix` | `#6b4faa` (violet) |

Les couleurs sont cohérentes avec les boutons de direction (`DIR_BTN_COLORS`) et le fond du tbody (`DIR_BG`).

### Code (render.js)

```javascript
const DIR_BADGE_LABELS = {U:'↑ Asc.', D:'↓ Desc.', M:'↑↓ Mix'};
const dirBadge = `<span style="font-size:9px;font-weight:700;color:#fff;
  background:${dirColor};border-radius:6px;padding:1px 6px;opacity:.9">
  ${DIR_BADGE_LABELS[activeDir] || activeDir}
</span>`;
// Injecté dans le th : <th style="...;vertical-align:middle">${dirBadge}</th>
```

Le badge se met à jour automatiquement à chaque changement de direction (via `setCardDir()` qui déclenche un `render()` complet).

---

**🎯 TL;DR:**
- **Pattern** = exercice technique, multiple directions, doigtés
- **Gamme** = pattern spécial, `special:true`, `cat:"gamme"`, note-par-note, 2 mesures
- **fretOffset** = propriété optionnelle pour décaler les cases à l'affichage (lisibilité)
- **tabMid/tabHigh** = pattern statique multi-cordes, tab fixe par position neck, string shift toujours actif
- **gammeActiveStrings** = sélection par corde pour les gammes, masquage des notes inactives, persisté en localStorage
- **hasDirectionTabs** = gamme avec variantes de direction (ex: pentatonique 1↔2), une progression distincte par direction, live refresh ciblé
- **dirBadge** = badge dans le `th` de la grille pour afficher le mode actif (patterns classiques et gammes à onglets)
