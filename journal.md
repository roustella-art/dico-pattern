# Journal de développement — Dico Pattern

---

## Session du 10 juin 2026

### Patterns rythmiques : moteur, accord, flèches, bends, phrase

**Fichiers modifiés :** `data.js`, `audio.js`, `render.js`, `index.html`

---

#### 1 — Patterns `rhythmic-test` et `rhythmic-2` : accord sur le premier temps

Les deux patterns rythmiques ont un accord (0 sur E + 2 sur A) sur le tout premier temps.  
Quand on change la corde de référence via le sélecteur, l'accord se transpose en bloc.

**Données (`data.js`) :**
```
A|2-----------------------------------------------|
E|0-----0--0--0-----...|
```
- `rhythmic-test` : croches + doubles croches, resolution=3
- `rhythmic-2` : croche+2doubles / 2croches / 2croches / 4doubles, resolution=3

**Transposition de l'accord (`transposeShiftTab`) :**  
Nouvelle fonction dans `index.html` et `audio.js`. Contrairement à `transposeSingleStringTab` (qui déplace une seule corde), `transposeShiftTab` décale **toutes les lignes ensemble** d'un nombre de positions — l'accord reste intact.  
Activé par le flag `stringShift: true` sur le pattern.

```javascript
// Flag sur le pattern :
stringSelector: true,
stringShift: true,
```

Si E sélectionné → 0 sur E, 2 sur A  
Si A sélectionné → 0 sur A, 2 sur D  
Si D sélectionné → 0 sur D, 2 sur G  
...etc.

---

#### 2 — Flèches de picking pour les patterns rythmiques (résolution positionnelle)

**Problème initial :** les flèches alternaient note par note (comptage séquentiel), sans tenir compte de la position réelle dans la mesure.

**Solution :** dans `tabWithSymbols`, quand `opts.rhythmicResolution` est défini, on calcule la direction à partir de la **position colonne** :

```javascript
const sixteenthIdx = Math.floor(col / rhythmicRes);
// Down : pair → ↓, impair → ↑
// Up   : pair → ↑, impair → ↓
```

Pour `rhythmic-2` (resolution=3), le résultat corrigé (version D) est :
```
   D     D  U  D     D     D     D     D  U  D  U
E |0-----0--0--0-----0-----0-----0-----0--0--0--0--|
```

---

#### 3 — Silence initial et synchronisation métronome

**Problème :** si la première note n'est pas à col 0, le parser ignorait le silence de tête → le métronome démarrait en même temps que la première note, sans laisser entendre le 1er temps seul.

**Solution dans `parseSectionWithDurations` (`audio.js`) :**

```javascript
// Après le groupage, insérer un silence si la première note n'est pas à col 0 :
if (grouped.length > 0 && notes.length > 0 && notes[0].col > 0) {
  grouped.unshift({ notes: [], isAttack: false, duration: notes[0].col, bendTargets: {} });
}
```

`scheduleCycle` itère l'entrée vide (aucune note jouée, `currentTime` avance quand même).  
`_rhythmicLoopDuration` inclut le silence → durée de boucle = mesure complète.

**Fix curseur associé :** `_rhythmicCumulativeTimes` n'enregistre que les entrées avec des notes réelles (`item.notes.length > 0`), sinon l'index du curseur était décalé d'une position.

---

#### 4 — Simulation de bends dans le parser audio

**Notation tab :**

| Symbole | Effet | Description |
|---------|-------|-------------|
| `14b`   | ↑ fret 14 → 16 | Bend plein ton (+ 2 demi-tons) |
| `14b16` | ↑ fret 14 → 16 | Bend vers fret cible explicite |
| `14r`   | ↓ fret 16 → 14 | Pré-bend release (attaque pré-bendée, redescend) |

**Implémentation (`extractLineNotes`, `audio.js`) :**

```javascript
// Bend montant : 14b → attaque à 14, glisse vers 14+2=16
if (content[i] === 'b') {
  // targetFret = digits suivants ou startFret + 2
  bendTarget = baseMidi + targetFret;
}
// Pré-bend release : 14r → attaque à 14+2=16, glisse vers 14
else if (content[i] === 'r') {
  bendTarget = baseMidi + playFret;   // cible = note écrite
  playFret   = playFret + 2;          // départ = pré-bendé
}
noteEntry.bendTarget = bendTarget;
```

**Simulation oscillateur (`pluckNote`, `audio.js`) :**

```javascript
function pluckNote(ctx, masterGain, freq, time, gainMult, freqEnd, bendDur)
```

Si `freqEnd` est fourni, les oscillateurs reçoivent une rampe de fréquence :

```javascript
osc.frequency.setValueAtTime(freq, time);
osc.frequency.exponentialRampToValueAtTime(freqEnd, time + bendDur);
```

Tous les sons sont couverts : piano (5 harmoniques, chacune rampée proportionnellement), guitare (sawtooth), doux (triangle + sine octave).

**Durée de bend (`scheduleCycle`) :**

```javascript
const isRelease = freq440(midi) > freqEnd;  // descend = release
const bendDur   = isRelease
  ? noteDur                              // release : durée pleine de la note
  : Math.min(noteDur * 0.5, 0.25);      // bend montant : rapide
```

---

#### 5 — Pattern `test-phrase1` : phrase blues avec bends et timing syncopé

**Référence :** capture d'écran partition + fichier `Phrase#1.txt`  
**Cordes :** B et e (frets 12–14)  
**Caractéristiques :**
- `rhythmicTiming: true`, `rhythmicResolution: 2` (2 chars = 1 double-croche)
- `disableHighNeck: true` (empêche la transposition +12 pour les frets 12-14)
- `rhythmicBeatPicking: true` (flèches temps/contre-temps, voir §6)

**Tab final :**
```
e|------------14------------------|
B|----14b---------14r-----12------|
```

**Rythmique (4/4 commun) :**

| Temps | Événement | Valeur | Col |
|-------|-----------|--------|-----|
| 1 (silence) | — | croche | 0 |
| "et" du 1 | B `14b` | **croche** (pickup) | 4 |
| 2 | e `14` | **noire** | 12 |
| 3 | B `14r` | **noire** | 16 |
| 4 | B `12` | **noire** | 24 |

Le temps 1 sonne le clic seul → phrase "en contre-temps" typique du blues-rock.

**Audio :**
- `14b` : B fret 14 (Si) glisse vers fret 16 (Ré#) en ~0.25s (bend rapide)
- `14r` : attaque à fret 16 (Ré#), redescend vers fret 14 (Si) sur toute la durée de la noire (~0.75s à 80 BPM)
- e `14` et B `12` : notes normales sans effet

---

#### 6 — Flag `rhythmicBeatPicking` : picking temps/contre-temps

**Contexte :** la logique par défaut (alternance par double-croche) est correcte pour `rhythmic-2` mais incorrecte pour `test-phrase1` où les 4 notes tombent toutes sur des doubles-croches paires.

**Nouvelle propriété pattern :**
```javascript
rhythmicBeatPicking: true
```

**Logique dans `tabWithSymbols` (`audio.js`) :**
```javascript
const onBeat = (sixteenthIdx % 4) < 2;
if (interp === 'Down') s = onBeat ? '↓' : '↑';
if (interp === 'Up')   s = onBeat ? '↑' : '↓';
```

**Résultat pour `test-phrase1` :**

| Note | 16ème | On beat ? | Down | Up |
|------|-------|-----------|------|----|
| B `14b` col 4 | 2 | ✗ contre-temps | ↑ | ↓ |
| e `14` col 12 | 6 | ✗ contre-temps | ↑ | ↓ |
| B `14r` col 16 | 8 | ✓ temps 3 | ↓ | ↑ |
| B `12` col 24 | 12 | ✓ temps 4 | ↓ | ↑ |

`rhythmic-test` et `rhythmic-2` : flag absent → logique par double-croche inchangée.

---

## Session du 3 juin 2026

### Simplification UI : Suppression des doigtés et notes directes + défaut Down

**Fichiers modifiés:** `render.js`, `index.html`, `state.js`, `audio.js`  
**Versions:** v25 → v27 | v1.1.0 → v1.1.2

#### Étape 1 — Suppression des doigtés
- ❌ Supprimé accordéons de doigtés ("Pimenter")
- ❌ Supprimé système `pimtDone` (doigtés complétés)
- ❌ Supprimé fonction `togglePimtDone()`
- ✅ Conservé section "Notes" sous le tableau de progression
- Données `fingerings[]` laissées dans `data.js` pour réouverture future

#### Étape 2 — Notes directement accessibles
- ❌ Supprimé accordéon "Notes" (drawer)
- ✅ Affichage direct textarea sans avoir à ouvrir d'accordéon
- ✅ Textarea visible immédiatement après le tableau de progression

#### Étape 3 — Interprétation par défaut (Pick Down)
- **Avant :** `interp: 'Up'` (Pick Up/Montée)
- **Après :** `interp: 'Down'` (Pick Down/Descente)
- Changement : ligne 116 de `audio.js`, objet PREVIEW

#### Étape 4 — Correction d'accord G-B (Son + Affichage)
**Fichiers:** `audio.js` (parsing + affichage) + `render.js`

**Problème :** Intervalle G-B = 4 demi-tons (au lieu de 5 comme autres cordes)
- Avant : B frette 2 + G frette 0 = dissonant
- Après : B frette 3 + G frette 0 = consonant

**Solution duale :**

1. **Audio (parseSection)** — Quand B et G jouent à la même colonne → +1 demi-ton à B
   - Appliquée dans 3 fonctions : `parseSection()`, `parseSectionWithDurations()`, `parseSectionSpecial()`

2. **Affichage (render.js)** — Nouvelle fonction `applyGBDisplayCorrection()`
   - Corrige l'affichage du tableau : B frette 2 → frette 3 visuellement
   - **FIX :** Appliquée AVANT le filtrage/transposition des cordes
   - Garantit que la correction s'applique même si G n'est pas affiché à l'écran

- ✅ Version v29 → v30 | v1.1.4 → v1.1.5

---

## Session du 1er juin 2026

### Réorganisation des exercices Gammes
**Fichier:** `data.js` + `render.js`

- Réordonné : Pentatonic 1-5 → Transitions 6-10 → A Ionien 11
- Mise à jour numéros `num` dans chaque entrée
- Changé tri en numérique (lieu de lexicographique)

### Configuration par défaut du header
**Fichier:** `state.js`

Affichage minimaliste par défaut :
- ✅ Décompte + Clic métronome + BPM 60
- ❌ Autres options masquées (utilisateur peut les activer via Réglages)

### Notations rythmiques — Cohérence anglo-saxonne
**Fichiers:** `index.html`, `audio.js`

- 8 = Croche (8th note)
- 3:8 = Triolet (triplet)
- 16 = Double croche (16th note)
- 6:16 = Sextolet (sextuplet)

Couleurs distinctes appliquées partout.

### Système de mise à jour PWA + Onboarding
**Fichiers:** `version.json`, `index.html`, `sw.js`, `onboarding.js`

**PWA Versioning:**
- Fichier `version.json` source de vérité
- App vérifie automatiquement → mise à jour sans action utilisateur

**Onboarding adaptatif:**
- Questionnaire 3 questions : années, heures/semaine, profil guitariste
- Presets calculés et affichés
- Sauvegardé (une seule affichage)

