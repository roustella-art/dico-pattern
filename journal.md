# Journal de développement — Dico Pattern

## Session du 1er juin 2026

### 1. Réorganisation des exercices Gammes
**Fichier:** `data.js`

**Changements:**
- Réordonné les gammes pour une progression pédagogique logique :
  - **Positions 1–5:** Pentatonic #1 à #5 (Débutant)
  - **Positions 6–10:** Pentatonic Transition 1↔2 à 5↔1 (Intermédiaire)
  - **Position 11:** A Ionien (Intermédiaire)
- Mis à jour les numéros `num` dans chaque entrée
- Déplacé physiquement A Ionien après les transitions

**Fichier:** `render.js`
- Changé le tri de `gammeGroups` de lexicographique vers numérique pour affichage correct (10, 11 après 9, non après 1)
- Tri par `parseInt(num, 10)` au lieu de `localeCompare`

---

### 2. Configuration par défaut du header
**Fichier:** `state.js`

**Affichage par défaut (minimaliste):**
```javascript
showCountin: true      // ✅ Afficher décompte
showClick: true        // ✅ Afficher clic métronome
showMetroSolo: false   // ❌ Métronome solo caché
showSubdivBtn: false   // ❌ Bouton ÷N caché
showTrain: false       // ❌ Mode entraînement caché
showNeckBtn: false     // ❌ Mid/High caché
showShuffleBtn: false  // ❌ Shuffle caché
showStringBtn: false   // ❌ Groupe de cordes caché
showHeaderStats: false // ❌ Stats streak caché
```

**BPM initial:** 60 (au lieu de 40)
- `HCTRL.bpm` changé de 40 → 60
- Span HTML `header-bpm-val` changé de "40" → "60"

---

### 3. Notations rythmiques — Cohérence anglo-saxonne
**Fichier:** `index.html`

**Réglages — Valeur rythmique de référence:**

| Avant | Après | Notation | Couleur |
|-------|-------|----------|---------|
| 2 | **8** | Croche (8th note) | #1a7fa6 (bleu) |
| 3 | **3:8** | Triolet (triplet) | #56864A (vert) |
| ♬ | **16** | Double croche (16th note) | #C8952A (orange) |
| 6 | **6:16** | Sextolet (sextuplet) | #7B5EA7 (violet) |

**Changements:**
- Remplacé l'icône ♬ par texte "double croche" en toutes lettres
- Ajouté les couleurs distinctes pour chaque valeur (cohérence avec le bouton header)
- Mise à jour des aria-label pour l'accessibilité

**Fichier:** `audio.js`

**Fonction `syncSubdivUI()`:**
- Ajouté `SUBDIV_LABELS` avec les notations correctes (8, 3:8, 16, 6:16)
- Mise à jour du bouton header pour afficher les notations au lieu de `÷N`
- Application des couleurs `SUBDIV_COL` aux boutons de réglage
- Synchronisation couleur/notation entre header et réglages

**Bouton header (subdiv-cycle-btn):**
- Affiche maintenant les notations : 8 / 3:8 / 16 / 6:16
- Titre updated : "Subdivision rythmique — 8 croche · 3:8 triolet · 16 double croche · 6:16 sextolet"
- Couleurs dynamiques selon la sélection (bleu/vert/orange/violet)

---

### Récapitulatif des fichiers modifiés
```
~/Desktop/dico-pattern/
├── data.js         (+num ordering pour gammes, reordering A Ionien)
├── render.js       (+numeric sort pour renderGammes)
├── state.js        (+defaults minimalist header, BPM 60, +darkMode)
├── index.html      (+notations 8/3:8/16/6:16, +couleurs, BPM 60)
└── audio.js        (+SUBDIV_LABELS, +syncSubdivUI() colors)
```

### Notes
- **Cohérence garantie:** Les notations et couleurs sont synchronisées entre header et réglages
- **Accessibilité:** Aria-labels mis à jour pour réfleter les nouvelles notations
- **UX minimaliste:** L'utilisateur démarre avec le strict nécessaire et peut activer les extras via Réglages

