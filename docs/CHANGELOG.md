# 📜 Changelog — Dico Pattern

## v1.12 — Gammes Spéciales ✨
**Date:** 18 mai 2026

### ✅ Nouvelles fonctionnalités
- **Système de Gammes Spéciales**
  - Ajout d'un type de pattern spécial (`special: true`, `cat: "gamme"`)
  - Lecture note-par-note séquentielle (pas de grouping par colonne)
  - Format: 2 mesures complètes (6 notes montée + 6 notes retour)
  - Pas de direction U/D/M, lecture directe du fichier ASCII

- **Section "🎵 Gammes" dédiée**
  - Affichage séparé dans l'onglet Patterns
  - Visible uniquement si filtre = "Tous" ou "Gamme"
  - Cache automatiquement si filtre spécifique (A2, A3, A4, A5, A6, B6, B8)

- **UI simplifiée pour gammes**
  - Pas de boutons direction (U/D/M)
  - Grille de progression sans colonne direction
  - Pourcentage de progression en temps réel
  - Symboles de médiator (↑↓) sur les deux sections

### 📦 Gammes incluses
1. **Pentatonic C/Am forme 1** (BPM: 120)
   - Notes de base: C - Eb - F - G - Bb - C
   - Montée grave → aigu (E→e), retour aigu → grave (e→E)

2. **Pentatonic Bb/Gm forme 2** (BPM: 120)
   - Notes de base: Bb - Db - Eb - F - Ab - Bb
   - Position décalée pour diversifier le jeu

### 🔧 Améliorations techniques
- Nouvelle fonction `parseSectionSpecial()` pour extraction sans grouping
- Fonction `parseTabNotesSpecial()` pour parsing ASCII tablature spécial
- Fonction `parseTabForCursorSpecial()` pour positionnement curseur
- Fonction `refreshSpecialProgressPercent()` pour mise à jour temps réel
- Modification `renderPatterns()` avec filtre conditionnel gammes
- Support format ASCII avec variabilité d'espaces: `/^([eEBGDA])\s*\|/`

### 📝 Documentation
- Créé **GAMMES_vs_PATTERNS.md**: guide complet avec différences et checklist
- Distingue clairement patterns normaux (U/D/M + doigtés) vs gammes (spécial + note-par-note)

### 🎯 Format ASCII accepté
```
Tempo = 120
Steel Guitar

e |--5--8----...|
B |-5--8----...|
G |5--8----...|
D |-8-----...|
A |8------...|
E |-------...|


--8--5--||
--8--5--||
...
```
- 6 cordes: e (aigu), B, G, D, A, E (grave)
- 2 sections séparées par ligne vide
- Notes directes, sans grouping par colonne

### ✅ Tests validés
- ✅ Lecture note-par-note (pas de blocs)
- ✅ 2 mesures complètes
- ✅ Grille progression fonctionne
- ✅ Filtre conditionnel gammes
- ✅ Pourcentage temps réel
- ✅ Symboles médiator affichés
- ✅ Format ASCII variabilité espaces

---

## v1.11 — [À compléter si applicable]

---

## v1.10 — Simplification UI
**Date:** [date antérieure]
- Suppression Large View
- Suppression mode paysage
- Refactorisation "Case de départ": 2 presets Mid-neck/High-neck
- Fix import/export JSON avec fichiers réels
- Ajout Challenge Aléatoire quotidien au parcours

---

**🚀 Prochaines étapes potentielles:**
- [ ] Enregistrer session dès la lecture d'une preview
- [ ] Rafraîchir tempo presets quand réglages changent  
- [ ] Réduire le wake lock de 10 à 5 minutes
- [ ] Ajouter plus de gammes (modes, positions)
