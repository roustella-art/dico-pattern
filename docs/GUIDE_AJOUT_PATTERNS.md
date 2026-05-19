# Guide — Ajouter un pattern dans DicoPattern

## Structure des fichiers

```
data.js     → ajouter les patterns ici
state.js    → état et réglages (ne pas toucher)
audio.js    → son et métronome (ne pas toucher)
render.js   → affichage (ne pas toucher)
index.html  → structure et CSS (ne pas toucher)
```

---

## Les 3 types de patterns

### Type A — Pattern classique (A4, A6…)

- **Toujours 3 entrées** : une par direction U / D / M
- Une seule tablature `tab`
- L'app transpose automatiquement selon le groupe de cordes et la position du manche

```js
{
  id:"A4P3aU",            // UNIQUE — convention: [CAT]P[NUM][DIR]
  cat:"A4",               // A4 = 4 notes · A6 = 6 notes
  dir:"U",                // U = montée · D = descente · M = mix
  num:'3a',               // numéro inédit dans cette catégorie
  notes:4,
  difficulty:"Débutant",  // "Débutant" | "Intermédiaire" | "Avancé"
  fingerings:['ind + maj + ann + aur', 'ind + maj + ann + ann'],
  name:"Nom du pattern",
  bpm:60,                 // BPM de départ
  bpmTarget:130,          // BPM objectif
  tab:`e|--------------------------5-6-8-9-|
B|------------------5-6-8-9---------|
G|----------5-6-8-9-----------------|
D|--5-6-8-9-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-7-9-10------------------------|||
----------6-7-9-10----------------|||
------------------6-7-9-10-------o|||
--------------------------6-7-9-10|||
----------------------------------|||
----------------------------------|||`,
  desc:"Description courte du pattern.",
  tip:"Conseil pratique pour le travailler.",
},
```

> Répéter 3 fois avec `dir:"U"`, `dir:"D"`, `dir:"M"` et les tabs correspondantes.

**Champs optionnels :**
- `etape` + `etapeOrder` → position dans le Parcours (1, 2 ou 3)
- `fretOffset:-1` → pattern qui commence une case plus bas (case 4)
- `related:"A4P1b"` → lien vers un pattern similaire

---

### Type B — Pattern statique multi-cordes (B6…)

- **2 tablatures** : `tabMid` (case 5) et `tabHigh` (case 12)
- Pas de transformation automatique — les deux tabs sont écrites manuellement

```js
{
  id:"B6P2aU",
  cat:"B6", dir:"U", num:"2a", notes:6,
  difficulty:"Intermédiaire",
  fingerings:['ind + maj + aur'],
  name:"Nom du run",
  bpm:60, bpmTarget:110,
  tabMid:`e|-----------------------------------------------5----------|
B|-----------------------------5--------5--6--8-----8--6----|
G|-----------5--------5--6--8-----8--6----------------------|
D|--5--6--8-----8--6----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
...`,
  tabHigh:`e|-----------------------------------------------12---------|
B|-----------------------------12-------12-13-15----15-13---|
G|-----------12       12-13-15----15-13---------------------|
D|--12-13-15----15-13---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
...`,
  desc:"Description.",
  tip:"Conseil.",
},
```

---

### Type Gamme — Pentatonique, Ionien…

- `special: true` obligatoire
- Une seule `tab`, pas de transformation automatique
- Pas besoin de directions U/D/M

```js
{
  id:"pentaC3",           // UNIQUE — convention: [nom][forme]
  cat:"gamme",
  num:"3",
  notes:12,
  difficulty:"Débutant",
  special:true,           // OBLIGATOIRE
  name:"Pentatonic #3",
  bpm:120, bpmTarget:120,
  tab:`e |--------------------------------7--10----|
B |--------------------------8--10----------|
G |--------------------7--9----------------|
D |--------------7--9----------------------|
A |--------7--10---------------------------|
E |--7--10---------------------------------|
↩
--10--7---------------------------------||
--------10--7---------------------------||
--------------9--7----------------------||
--------------------9--7----------------||
--------------------------10--8---------||
--------------------------------10--7---||`,
  desc:"Description de la gamme.",
  tip:"Conseil.",
},
```

---

## Règles à respecter

| Règle | Détail |
|---|---|
| ID unique | Vérifier qu'aucun autre pattern n'a le même `id` |
| 3 entrées par pattern A | Une pour chaque direction U, D, M |
| `tabHigh` = `tabMid` + 7 cases | Pour les patterns B uniquement |
| `special:true` | Obligatoire pour toutes les gammes |
| Tester après ajout | Ouvrir http://localhost:8765 et vérifier l'affichage |

---

## Démarrer le serveur de test

```bash
cd "chemin/vers/dico-pattern"
python3 -m http.server 8765
```

Puis ouvrir **http://localhost:8765** dans le navigateur.

---

## Où ajouter dans data.js

- Patterns **A4** → après la dernière entrée `A4P…`
- Patterns **A6** → après la dernière entrée `A6P…`
- Patterns **B6** → après la dernière entrée `B6P…`
- **Gammes** → tout à la fin du tableau, avant le `];` final
