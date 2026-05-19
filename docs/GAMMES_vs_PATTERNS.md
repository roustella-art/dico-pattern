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

**🎯 TL;DR:**
- **Pattern** = exercice technique, multiple directions, doigtés
- **Gamme** = pattern spécial, `special:true`, `cat:"gamme"`, note-par-note, 2 mesures
- **fretOffset** = propriété optionnelle pour décaler les cases à l'affichage (lisibilité)
