// ─── DATA ─────────────────────────────────────────────────────────────────────
// Fichier extrait de index.html lors du refactor v1.15
// Contient : PATTERNS, MODES, MODE_LABELS, INTERPS, INTERP_LABELS, TEMPOS, FINGERINGS
// ─────────────────────────────────────────────────────────────────────────────

const PATTERNS = [
  // ── A4 — 4 NOTES ────────────────────────────────────────────────────────────

  {
    id:"A4P2aU", cat:"A4", dir:"U", num:'2a', notes:4, etape:1, etapeOrder:3, difficulty:"Débutant", fingerings:['ind + maj + ann + aur', 'ind + ind (glis.) + maj + ann', 'ind + maj + ann + ann', 'ind + maj + maj + ann'],
    name:"Chromatique", bpm:60, bpmTarget:130,
    tab:`e|--------------------------5-6-7-8-|
B|------------------5-6-7-8---------|
G|----------5-6-7-8-----------------|
D|--5-6-7-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-7-8-9-------------------------|||
----------6-7-8-9-----------------|||
------------------6-7-8-9--------o|||
--------------------------6-7-8-9o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Pattern fondamental : 4 cases consécutives, un doigt par case.",
    tip:"Garde les doigts proches des cordes. Commence ultra lentement.",
  },

  {
    id:"A4P2aD", cat:"A4", dir:"D", num:'2a', notes:4, etape:1, etapeOrder:3, difficulty:"Débutant", fingerings:['ind + maj + ann + aur', 'ind + ind (glis.) + maj + ann', 'ind + maj + ann + ann', 'ind + maj + maj + ann'],
    name:"Chromatique", bpm:60, bpmTarget:130,
    tab:`e|--------------------------8-7-6-5-|
B|------------------8-7-6-5---------|
G|----------8-7-6-5-----------------|
D|--8-7-6-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--9-8-7-6-------------------------|||
----------9-8-7-6-----------------|||
------------------9-8-7-6--------o|||
--------------------------9-8-7-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Pattern fondamental : 4 cases consécutives, un doigt par case. Version descendante.",
    tip:"Garde les doigts proches des cordes. Commence ultra lentement. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A4P2aM", cat:"A4", dir:"M", num:'2a', notes:4, etape:1, etapeOrder:3, difficulty:"Débutant", fingerings:['ind + maj + ann + aur', 'ind + ind (glis.) + maj + ann', 'ind + maj + ann + ann', 'ind + maj + maj + ann'],
    name:"Chromatique", bpm:60, bpmTarget:119,
    tab:`e|--------------------------5-6-7-8-|
B|------------------5-6-7-8---------|
G|----------5-6-7-8-----------------|
D|--5-6-7-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--9-8-7-6-------------------------|||
----------9-8-7-6-----------------|||
------------------9-8-7-6--------o|||
--------------------------9-8-7-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Pattern fondamental : 4 cases consécutives, un doigt par case. Montée puis retour décalé d\'une case.",
    tip:"Garde les doigts proches des cordes. Commence ultra lentement. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A4P1aU", cat:"A4", dir:"U", num:'1a', notes:4, etape:2, etapeOrder:1, difficulty:"Débutant", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Alternance demi-ton", bpm:60, bpmTarget:150,
    tab:`e|--------------------------5-6-5-6-|
B|------------------5-6-5-6---------|
G|----------5-6-5-6-----------------|
D|--5-6-5-6-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-7-6-7-------------------------|||
----------6-7-6-7-----------------|||
------------------6-7-6-7--------o|||
--------------------------6-7-6-7o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation sur un demi-ton : 1-2-1-2. La main ne bouge pas — elle bat. Idéal pour le trémolo chromatique.",
    tip:"Concentre-toi sur la régularité, pas la vitesse. Les deux doigts doivent frapper avec la même force.",
  },

  {
    id:"A4P1aD", cat:"A4", dir:"D", num:'1a', notes:4, etape:2, etapeOrder:1, difficulty:"Débutant", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Alternance demi-ton", bpm:60, bpmTarget:150,
    tab:`e|--------------------------6-5-6-5-|
B|------------------6-5-6-5---------|
G|----------6-5-6-5-----------------|
D|--6-5-6-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--7-6-7-6-------------------------|||
----------7-6-7-6-----------------|||
------------------7-6-7-6--------o|||
--------------------------7-6-7-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation sur un demi-ton : 2-1-2-1. Version descendante — le majeur frappe en premier.",
    tip:"Le retour majeur→index est souvent moins précis que l\'autre sens. Isole cette direction.",
  },

  {
    id:"A4P1aM", cat:"A4", dir:"M", num:'1a', notes:4, etape:2, etapeOrder:1, difficulty:"Débutant", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Alternance demi-ton", bpm:60, bpmTarget:138,
    tab:`e|--------------------------5-6-5-6-|
B|------------------5-6-5-6---------|
G|----------5-6-5-6-----------------|
D|--5-6-5-6-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--7-6-7-6-------------------------|||
----------7-6-7-6-----------------|||
------------------7-6-7-6--------o|||
--------------------------7-6-7-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation demi-ton — montée index-majeur, retour majeur-index décalé d\'un demi-ton.",
    tip:"La transition entre le sens index-premier et le sens majeur-premier est la partie à travailler.",
  },

  {
    id:"A4P1bU", cat:"A4", dir:"U", num:'1b', notes:4, etape:1, etapeOrder:1, difficulty:"Débutant", related:"A2P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Alternance ton entier", bpm:60, bpmTarget:140,
    tab:`e|--------------------------5-7-5-7-|
B|------------------5-7-5-7---------|
G|----------5-7-5-7-----------------|
D|--5-7-5-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-8-6-8-------------------------|||
----------6-8-6-8-----------------|||
------------------6-8-6-8--------o|||
--------------------------6-8-6-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation sur un ton entier : 1-3-1-3. Pattern de base du trémolo diatonique.",
    tip:"Le doigt qui revient (3→1) doit rester proche de la corde. Évite de lever l\'annulaire trop haut.",
  },

  {
    id:"A4P1bD", cat:"A4", dir:"D", num:'1b', notes:4, etape:1, etapeOrder:1, difficulty:"Débutant", related:"A2P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Alternance ton entier", bpm:60, bpmTarget:140,
    tab:`e|--------------------------7-5-7-5-|
B|------------------7-5-7-5---------|
G|----------7-5-7-5-----------------|
D|--7-5-7-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--8-6-8-6-------------------------|||
----------8-6-8-6-----------------|||
------------------8-6-8-6--------o|||
--------------------------8-6-8-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation sur un ton entier : 3-1-3-1. Version descendante — l\'annulaire frappe en premier.",
    tip:"Compare ta précision dans ce sens avec la version U. Il y a souvent un déséquilibre à corriger.",
  },

  {
    id:"A4P1bM", cat:"A4", dir:"M", num:'1b', notes:4, etape:1, etapeOrder:1, difficulty:"Débutant", related:"A2P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Alternance ton entier", bpm:60, bpmTarget:128,
    tab:`e|--------------------------5-7-5-7-|
B|------------------5-7-5-7---------|
G|----------5-7-5-7-----------------|
D|--5-7-5-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--8-6-8-6-------------------------|||
----------8-6-8-6-----------------|||
------------------8-6-8-6--------o|||
--------------------------8-6-8-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation ton entier — montée index-annulaire, retour annulaire-index décalé d\'un demi-ton.",
    tip:"Le changement de sens en haut doit être transparent. Écoute la continuité rythmique.",
  },

  {
    id:"A4P2bU", cat:"A4", dir:"U", num:'2b', notes:4, difficulty:"Intermédiaire", fingerings:['ind + ann + maj + aur', 'ind + maj (ext.) + ind + ann', 'maj + aur + ann + aur', 'ind + ann + ind (glis.) + maj'],
    name:"Croisé 1-3-2-4", bpm:60, bpmTarget:120,
    tab:`e|--------------------------5-7-6-8-|
B|------------------5-7-6-8---------|
G|----------5-7-6-8-----------------|
D|--5-7-6-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-8-7-9-------------------------|||
----------6-8-7-9-----------------|||
------------------6-8-7-9--------o|||
--------------------------6-8-7-9o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Saut d'une case, retour, saut : 1-3-2-4. Exercice d'extension et de coordination.",
    tip:"Le croisement doigts 2 sur doigt 3 est le point difficile. Ralentis sur cette transition.",
  },

  {
    id:"A4P2bD", cat:"A4", dir:"D", num:'2b', notes:4, difficulty:"Intermédiaire", fingerings:['ind + ann + maj + aur', 'ind + maj (ext.) + ind + ann', 'maj + aur + ann + aur', 'ind + ann + ind (glis.) + maj'],
    name:"Croisé 1-3-2-4", bpm:60, bpmTarget:120,
    tab:`e|--------------------------8-6-7-5-|
B|------------------8-6-7-5---------|
G|----------8-6-7-5-----------------|
D|--8-6-7-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--9-7-8-6-------------------------|||
----------9-7-8-6-----------------|||
------------------9-7-8-6--------o|||
--------------------------9-7-8-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Saut d'une case, retour, saut : 1-3-2-4. Exercice d'extension et de coordination. Version descendante.",
    tip:"Le croisement doigts 2 sur doigt 3 est le point difficile. Ralentis sur cette transition. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A4P2bM", cat:"A4", dir:"M", num:'2b', notes:4, difficulty:"Intermédiaire", fingerings:['ind + ann + maj + aur', 'ind + maj (ext.) + ind + ann', 'maj + aur + ann + aur', 'ind + ann + ind (glis.) + maj'],
    name:"Croisé 1-3-2-4", bpm:60, bpmTarget:110,
    tab:`e|--------------------------5-7-6-8-|
B|------------------5-7-6-8---------|
G|----------5-7-6-8-----------------|
D|--5-7-6-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--9-7-8-6-------------------------|||
----------9-7-8-6-----------------|||
------------------9-7-8-6--------o|||
--------------------------9-7-8-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Saut d'une case, retour, saut : 1-3-2-4. Exercice d'extension et de coordination. Montée puis retour décalé d\'une case.",
    tip:"Le croisement doigts 2 sur doigt 3 est le point difficile. Ralentis sur cette transition. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A4P2cU", cat:"A4", dir:"U", num:'2c', notes:4, difficulty:"Intermédiaire", fingerings:['ind + aur + maj + ann', 'ind + ann (ext.) + maj + ann', 'ind + aur + aur (glis.) + ann', 'ind + aur + ind (glis.) + maj'],
    name:"Croisé 1-4-2-3", bpm:60, bpmTarget:110,
    tab:`e|--------------------------5-8-6-7-|
B|------------------5-8-6-7---------|
G|----------5-8-6-7-----------------|
D|--5-8-6-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-9-7-8-------------------------|||
----------6-9-7-8-----------------|||
------------------6-9-7-8--------o|||
--------------------------6-9-7-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Extension maximale sur le premier saut : 1-4-2-3.",
    tip:"L\'extension 1→4 au départ fatigue l\'auriculaire. Prends des pauses régulières.",
  },

  {
    id:"A4P2cD", cat:"A4", dir:"D", num:'2c', notes:4, difficulty:"Intermédiaire", fingerings:['ind + aur + maj + ann', 'ind + ann (ext.) + maj + ann', 'ind + aur + aur (glis.) + ann', 'ind + aur + ind (glis.) + maj'],
    name:"Croisé 1-4-2-3", bpm:60, bpmTarget:110,
    tab:`e|--------------------------8-5-7-6-|
B|------------------8-5-7-6---------|
G|----------8-5-7-6-----------------|
D|--8-5-7-6-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--9-6-8-7-------------------------|||
----------9-6-8-7-----------------|||
------------------9-6-8-7--------o|||
--------------------------9-6-8-7o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Extension maximale sur le premier saut : 1-4-2-3. Version descendante.",
    tip:"L\'extension 1→4 au départ fatigue l\'auriculaire. Prends des pauses régulières. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A4P2cM", cat:"A4", dir:"M", num:'2c', notes:4, difficulty:"Intermédiaire", fingerings:['ind + aur + maj + ann', 'ind + ann (ext.) + maj + ann', 'ind + aur + aur (glis.) + ann', 'ind + aur + ind (glis.) + maj'],
    name:"Croisé 1-4-2-3", bpm:60, bpmTarget:101,
    tab:`e|--------------------------5-8-6-7-|
B|------------------5-8-6-7---------|
G|----------5-8-6-7-----------------|
D|--5-8-6-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--9-6-8-7-------------------------|||
----------9-6-8-7-----------------|||
------------------9-6-8-7--------o|||
--------------------------9-6-8-7o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Extension maximale sur le premier saut : 1-4-2-3. Montée puis retour décalé d\'une case.",
    tip:"L\'extension 1→4 au départ fatigue l\'auriculaire. Prends des pauses régulières. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A4P1cU", cat:"A4", dir:"U", num:'1c', notes:4, etape:2, etapeOrder:3, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ann + aur (ext.)'],
    name:"Alternance tierce mineure", bpm:60, bpmTarget:130,
    tab:`e|--------------------------5-8-5-8-|
B|------------------5-8-5-8---------|
G|----------5-8-5-8-----------------|
D|--5-8-5-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-9-6-9-------------------------|||
----------6-9-6-9-----------------|||
------------------6-9-6-9--------o|||
--------------------------6-9-6-9o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation sur une tierce mineure : 1-4-1-4. Extension index-auriculaire en aller-retour continu.",
    tip:"C\'est l\'extension qui fatigue, pas la vitesse. Travaille par petites séries avec des pauses.",
  },

  {
    id:"A4P1cD", cat:"A4", dir:"D", num:'1c', notes:4, etape:2, etapeOrder:3, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ann + aur (ext.)'],
    name:"Alternance tierce mineure", bpm:60, bpmTarget:130,
    tab:`e|--------------------------8-5-8-5-|
B|------------------8-5-8-5---------|
G|----------8-5-8-5-----------------|
D|--8-5-8-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--9-6-9-6-------------------------|||
----------9-6-9-6-----------------|||
------------------9-6-9-6--------o|||
--------------------------9-6-9-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation tierce mineure : 4-1-4-1. L\'auriculaire frappe en premier — sens souvent plus difficile.",
    tip:"L\'auriculaire en premier position est inhabituel. Travaille ce sens séparément avec soin.",
  },

  {
    id:"A4P1cM", cat:"A4", dir:"M", num:'1c', notes:4, etape:2, etapeOrder:3, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ann + aur (ext.)'],
    name:"Alternance tierce mineure", bpm:60, bpmTarget:119,
    tab:`e|--------------------------5-8-5-8-|
B|------------------5-8-5-8---------|
G|----------5-8-5-8-----------------|
D|--5-8-5-8-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--9-6-9-6-------------------------|||
----------9-6-9-6-----------------|||
------------------9-6-9-6--------o|||
--------------------------9-6-9-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Oscillation tierce mineure — montée index-auriculaire, retour auriculaire-index décalé.",
    tip:"Prends des pauses fréquentes. L\'extension répétée sur 3 cases est exigeante sur les tendons.",
  },

  {
    id:"A4P2dU", cat:"A4", dir:"U", num:'2d', notes:4, difficulty:"Avancé", fingerings:['ind + aur + ann + maj', 'maj + aur + ann + maj', 'ind + aur + ann + ind (glis.)', 'ind + ann (ext.) + ann (glis.) + maj'],
    name:"Croisé 1-4-3-2", bpm:60, bpmTarget:110,
    tab:`e|--------------------------5-8-7-6-|
B|------------------5-8-7-6---------|
G|----------5-8-7-6-----------------|
D|--5-8-7-6-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-9-8-7-------------------------|||
----------6-9-8-7-----------------|||
------------------6-9-8-7--------o|||
--------------------------6-9-8-7o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Combinaison d\'extension et de croisement arrière : 1-4-3-2.",
    tip:"Le retour 4→3→2 après l\'extension est tricky. Décompose en deux cellules.",
  },

  {
    id:"A4P2dD", cat:"A4", dir:"D", num:'2d', notes:4, difficulty:"Avancé", fingerings:['ind + aur + ann + maj', 'maj + aur + ann + maj', 'ind + aur + ann + ind (glis.)', 'ind + ann (ext.) + ann (glis.) + maj'],
    name:"Croisé 1-4-3-2", bpm:60, bpmTarget:110,
    tab:`e|--------------------------8-5-6-7-|
B|------------------8-5-6-7---------|
G|----------8-5-6-7-----------------|
D|--8-5-6-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--9-6-7-8-------------------------|||
----------9-6-7-8-----------------|||
------------------9-6-7-8--------o|||
--------------------------9-6-7-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Combinaison d\'extension et de croisement arrière : 1-4-3-2. Version descendante.",
    tip:"Le retour 4→3→2 après l\'extension est tricky. Décompose en deux cellules. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A4P2dM", cat:"A4", dir:"M", num:'2d', notes:4, difficulty:"Avancé", fingerings:['ind + aur + ann + maj', 'maj + aur + ann + maj', 'ind + aur + ann + ind (glis.)', 'ind + ann (ext.) + ann (glis.) + maj'],
    name:"Croisé 1-4-3-2", bpm:60, bpmTarget:101,
    tab:`e|--------------------------5-8-7-6-|
B|------------------5-8-7-6---------|
G|----------5-8-7-6-----------------|
D|--5-8-7-6-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--9-6-7-8-------------------------|||
----------9-6-7-8-----------------|||
------------------9-6-7-8--------o|||
--------------------------9-6-7-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Combinaison d\'extension et de croisement arrière : 1-4-3-2. Montée puis retour décalé d\'une case.",
    tip:"Le retour 4→3→2 après l\'extension est tricky. Décompose en deux cellules. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A4P?aU", cat:"A4", dir:"U", num:'?a', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ann + aur (ext.)', 'ind + maj + maj (ext.) + aur', 'ind + maj + ann + ann (glis.)', 'ind + ind (glis.) + maj + ann'], fretOffset:-1,
    name:"Croisé 1-2-3-5", bpm:60, bpmTarget:100,
    tab:`e|--------------------------5-6-7-9-|
B|------------------5-6-7-9---------|
G|----------5-6-7-9-----------------|
D|--5-6-7-9-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--6-7-8-10----------------------------|||
-----------6-7-8-10-------------------|||
--------------------6-7-8-10---------o|||
-----------------------------6-7-8-10o|||
--------------------------------------|||
--------------------------------------|||`,
    desc:"Extension vers la case 9 : 1-2-3-5. Dépasse l\'octave.",
    tip:"La case 9 est loin. Glisse la main plutôt que de tirer les doigts.",
  },

  {
    id:"A4P?aD", cat:"A4", dir:"D", num:'?a', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ann + aur (ext.)', 'ind + maj + maj (ext.) + aur', 'ind + maj + ann + ann (glis.)', 'ind + ind (glis.) + maj + ann'], fretOffset:-1,
    name:"Croisé 1-2-3-5", bpm:60, bpmTarget:100,
    tab:`e|--------------------------9-7-6-5-|
B|------------------9-7-6-5---------|
G|----------9-7-6-5-----------------|
D|--9-7-6-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--10-8-7-6----------------------------|||
-----------10-8-7-6-------------------|||
--------------------10-8-7-6---------o|||
-----------------------------10-8-7-6o|||
--------------------------------------|||
--------------------------------------|||`,
    desc:"Extension vers la case 9 : 1-2-3-5. Dépasse l\'octave. Version descendante.",
    tip:"La case 9 est loin. Glisse la main plutôt que de tirer les doigts. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A4P?aM", cat:"A4", dir:"M", num:'?a', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ann + aur (ext.)', 'ind + maj + maj (ext.) + aur', 'ind + maj + ann + ann (glis.)', 'ind + ind (glis.) + maj + ann'], fretOffset:-1,
    name:"Croisé 1-2-3-5", bpm:60, bpmTarget:92,
    tab:`e|--------------------------5-6-7-9-|
B|------------------5-6-7-9---------|
G|----------5-6-7-9-----------------|
D|--5-6-7-9-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour descendant +1
--10-8-7-6----------------------------|||
-----------10-8-7-6-------------------|||
--------------------10-8-7-6---------o|||
-----------------------------10-8-7-6o|||
--------------------------------------|||
--------------------------------------|||`,
    desc:"Extension vers la case 9 : 1-2-3-5. Dépasse l\'octave. Montée puis retour décalé d\'une case.",
    tip:"La case 9 est loin. Glisse la main plutôt que de tirer les doigts. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A4P1dU", cat:"A4", dir:"U", num:'1d', notes:4, etape:3, etapeOrder:1, difficulty:"Intermédiaire", fingerings:['ind + aur (grand écart)', 'ind + ann (ext. max)', 'maj + aur (ext.)', 'ind + ind (glis.)'], fretOffset:-1,
    name:"Alternance tierce majeure", bpm:55, bpmTarget:110,
    tab:`e|-----------------------------5-9-5-9-|
B|---------------------5-9-5-9---------|
G|-----------5-9-5-9-------------------|
D|--5-9-5-9----------------------------|
A|-------------------------------------|
E|-------------------------------------|
↩ retour décalé +1
--6-10-6-10----------------------------------|||
-----------6-10-6-10-------------------------|||
---------------------6-10-6-10--------------o|||
-------------------------------6-10-6-10----o|||
---------------------------------------------|||
---------------------------------------------|||`,
    desc:"Oscillation sur une tierce majeure : 1-5-1-5. Extension index-auriculaire extrême sur 4 cases.",
    tip:"Étire-toi soigneusement avant. Douleur = stop immédiat. Ne force jamais cette extension.",
  },

  {
    id:"A4P1dD", cat:"A4", dir:"D", num:'1d', notes:4, etape:3, etapeOrder:1, difficulty:"Intermédiaire", fingerings:['ind + aur (grand écart)', 'ind + ann (ext. max)', 'maj + aur (ext.)', 'ind + ind (glis.)'], fretOffset:-1,
    name:"Alternance tierce majeure", bpm:55, bpmTarget:110,
    tab:`e|------------------------------9-5-9-5-|
B|----------------------9-5-9-5---------|
G|------------9-5-9-5-------------------|
D|--9-5-9-5-----------------------------|
A|--------------------------------------|
E|--------------------------------------|
↩ retour +1 case
--10-6-10-6----------------------------------|||
-----------10-6-10-6-------------------------|||
---------------------10-6-10-6--------------o|||
-------------------------------10-6-10-6----o|||
---------------------------------------------|||
---------------------------------------------|||`,
    desc:"Oscillation tierce majeure : 4-1-4-1. Extension extrême, auriculaire en premier.",
    tip:"Encore plus exigeant que la version U. Réservé aux mains bien échauffées et entraînées.",
  },

  {
    id:"A4P1dM", cat:"A4", dir:"M", num:'1d', notes:4, etape:3, etapeOrder:1, difficulty:"Intermédiaire", fingerings:['ind + aur (grand écart)', 'ind + ann (ext. max)', 'maj + aur (ext.)', 'ind + ind (glis.)'], fretOffset:-1,
    name:"Alternance tierce majeure", bpm:55, bpmTarget:100,
    tab:`e|-----------------------------5-9-5-9-|
B|---------------------5-9-5-9---------|
G|-----------5-9-5-9-------------------|
D|--5-9-5-9----------------------------|
A|-------------------------------------|
E|-------------------------------------|
↩ retour descendant +1
--10-6-10-6----------------------------------|||
-----------10-6-10-6-------------------------|||
---------------------10-6-10-6--------------o|||
-------------------------------10-6-10-6----o|||
---------------------------------------------|||
---------------------------------------------|||`,
    desc:"Oscillation tierce majeure — montée index-auriculaire, retour auriculaire-index décalé.",
    tip:"Ce mix est le plus complet. Ne l\'aborde qu\'une fois les versions U et D bien maîtrisées.",
  },

  {
    id:"A4P-YMaU", cat:"A4", dir:"U", num:'-YMa', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ind (shift) + maj', 'ind + maj + ann + aur (ext.)', 'ind + maj + aur + aur (glis.)', 'ind + ind (glis.) + ann + aur'],
    name:"Seconde augmentée (Yngwie)", bpm:55, bpmTarget:110,
    tab:`e|-----------------------------5-6-9-10-|
B|--------------------5-6-9-10----------|
G|-----------5-6-9-10-------------------|
D|--5-6-9-10----------------------------|
A|--------------------------------------|
E|--------------------------------------|
↩ retour décalé +1
--6-7-10-11-------------------------------|||
------------6-7-10-11---------------------|||
----------------------6-7-10-11----------o|||
--------------------------------6-7-10-11o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Demi-ton / saut de 3 cases / demi-ton. L\'intervalle de seconde augmentée de la gamme mineure harmonique.",
    tip:"Le saut index-auriculaire sur 3 cases est le cœur du pattern. Ancre bien l\'index avant de sauter.",
  },

  {
    id:"A4P-YMaD", cat:"A4", dir:"D", num:'-YMa', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ind (shift) + maj', 'ind + maj + ann + aur (ext.)', 'ind + maj + aur + aur (glis.)', 'ind + ind (glis.) + ann + aur'],
    name:"Seconde augmentée (Yngwie)", bpm:55, bpmTarget:110,
    tab:`e|-----------------------------10-9-6-5-|
B|--------------------10-9-6-5----------|
G|-----------10-9-6-5-------------------|
D|--10-9-6-5----------------------------|
A|--------------------------------------|
E|--------------------------------------|
↩ retour +1 case
--11-10-7-6-------------------------------|||
------------11-10-7-6---------------------|||
----------------------11-10-7-6----------o|||
--------------------------------11-10-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante de la seconde augmentée. Le doigté inversé 4-3-2-1 avec le grand saut au centre.",
    tip:"Le saut auriculaire-index en descente est souvent le sens le plus difficile. Isole ce mouvement.",
  },

  {
    id:"A4P-YMaM", cat:"A4", dir:"M", num:'-YMa', notes:4, difficulty:"Avancé", fingerings:['ind + maj + ind (shift) + maj', 'ind + maj + ann + aur (ext.)', 'ind + maj + aur + aur (glis.)', 'ind + ind (glis.) + ann + aur'],
    name:"Seconde augmentée (Yngwie)", bpm:55, bpmTarget:100,
    tab:`e|-----------------------------5-6-9-10-|
B|--------------------5-6-9-10----------|
G|-----------5-6-9-10-------------------|
D|--5-6-9-10----------------------------|
A|--------------------------------------|
E|--------------------------------------|
↩ retour descendant +1
--11-10-7-6-------------------------------|||
------------11-10-7-6---------------------|||
----------------------11-10-7-6----------o|||
--------------------------------11-10-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée avec la seconde augmentée, retour décalé d\'une case. Prépare directement les runs Yngwie / mineur harmonique.",
    tip:"Ce mix est le plus proche du son Yngwie. La montée 5-6-9-10 suivie du retour 11-10-7-6 est un réflexe à graver.",
  },

  // ── A3 — 3 NOTES ────────────────────────────────────────────────────────────

  {
    id:"A3P1aU", cat:"A3", dir:"U", num:'1a', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Triade 1-2-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------5-6-8-|
B|--------------5-6-8-------|
G|--------5-6-8-------------|
D|--5-6-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--6-7-9-------------------|||
--------6-7-9-------------|||
--------------6-7-9------o|||
--------------------6-7-9o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois doigts consécutifs : 1-2-3. Base de tous les exercices à 3 notes.",
    tip:"Plus facile que 4 notes, idéal pour chauffer la main avant de passer à A4.",
  },

  {
    id:"A3P1aD", cat:"A3", dir:"D", num:'1a', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Triade 1-2-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------8-6-5-|
B|--------------8-6-5-------|
G|--------8-6-5-------------|
D|--8-6-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--9-7-6-------------------|||
--------9-7-6-------------|||
--------------9-7-6------o|||
--------------------9-7-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois doigts consécutifs : 1-2-3. Base de tous les exercices à 3 notes. Version descendante.",
    tip:"Plus facile que 4 notes, idéal pour chauffer la main avant de passer à A4. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A3P1aM", cat:"A3", dir:"M", num:'1a', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Triade 1-2-3", bpm:70, bpmTarget:128,
    tab:`e|--------------------5-6-8-|
B|--------------5-6-8-------|
G|--------5-6-8-------------|
D|--5-6-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--9-7-6-------------------|||
--------9-7-6-------------|||
--------------9-7-6------o|||
--------------------9-7-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois doigts consécutifs : 1-2-3. Base de tous les exercices à 3 notes. Montée puis retour décalé d\'une case.",
    tip:"Plus facile que 4 notes, idéal pour chauffer la main avant de passer à A4. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  // ── A3P1d — Chromatique 1-2-3 (version consécutive de 1-2-3) ────────────────

  {
    id:"A3P1dU", cat:"A3", dir:"U", num:'1d', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Chromatique 1-2-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------5-6-7-|
B|--------------5-6-7-------|
G|--------5-6-7-------------|
D|--5-6-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--6-7-8-------------------|||
--------6-7-8-------------|||
--------------6-7-8------o|||
--------------------6-7-8o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois notes consécutives : chromatique 1-2-3. Plus fluide que la triade espacée, travaille la liaison smooth.",
    tip:"Les notes consécutives demandent une fluidité différente. Les doigts bougent moins, le geste est plus économe.",
  },

  {
    id:"A3P1dD", cat:"A3", dir:"D", num:'1d', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Chromatique 1-2-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------7-6-5-|
B|--------------7-6-5-------|
G|--------7-6-5-------------|
D|--7-6-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--8-7-6-------------------|||
--------8-7-6-------------|||
--------------8-7-6------o|||
--------------------8-7-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Descendant chromatique 1-2-3 (7-6-5). Le doigté inversé sur notes consécutives crée une sensation nouvelle.",
    tip:"Attention à l\'ordre des doigts en descendant — l\'auriculaire ouvre, pas l\'index. Plus facile que la triade descendante.",
  },

  {
    id:"A3P1dM", cat:"A3", dir:"M", num:'1d', notes:3, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Chromatique 1-2-3", bpm:70, bpmTarget:128,
    tab:`e|--------------------5-6-7-|
B|--------------5-6-7-------|
G|--------5-6-7-------------|
D|--5-6-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--8-7-6-------------------|||
--------8-7-6-------------|||
--------------8-7-6------o|||
--------------------8-7-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée chromatique (5-6-7), retour descendant (8-7-6). Le contraste lisse-vs-espacé aide à la fluidité générale.",
    tip:"Ressens la différence : la montée chromatique coule, le retour espacé offre une résistance. C\'est contraste pédagogiquement utile.",
  },

  // ── A3P2a — Triade 2-1-3 (inversion de 1-2-3) ──────────────────────────────

  {
    id:"A3P2aU", cat:"A3", dir:"U", num:'2a', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Triade 2-1-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------6-5-8-|
B|--------------6-5-8-------|
G|--------6-5-8-------------|
D|--6-5-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--7-6-9-------------------|||
--------7-6-9-------------|||
--------------7-6-9------o|||
--------------------7-6-9o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois doigts : 2-1-3 (inversion de 1-2-3). Travaille la flexibilité digitale en changeant l\'ordre des doigts.",
    tip:"Le doigté commence par le majeur au lieu de l\'index — cela change ta perception du pattern. Ralentis si nécessaire.",
  },

  // ── A3P2d — Chromatique 2-1-3 (version consécutive de 2-1-3) ────────────────

  {
    id:"A3P2dU", cat:"A3", dir:"U", num:'2d', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Chromatique 2-1-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------6-5-7-|
B|--------------6-5-7-------|
G|--------6-5-7-------------|
D|--6-5-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--7-6-8-------------------|||
--------7-6-8-------------|||
--------------7-6-8------o|||
--------------------7-6-8o|||
--------------------------|||
--------------------------|||`,
    desc:"Chromatique inversée : 2-1-3 sur notes consécutives (6-5-7). La fluidité du chromatique avec le doigté inversé.",
    tip:"Compare avec A3P1d : même chromatique, mais doigté différent (maj au lieu d\'ind). Ressens la différence.",
  },

  {
    id:"A3P2dD", cat:"A3", dir:"D", num:'2d', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Chromatique 2-1-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------6-7-5-|
B|--------------6-7-5-------|
G|--------6-7-5-------------|
D|--6-7-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--7-8-6-------------------|||
--------7-8-6-------------|||
--------------7-8-6------o|||
--------------------7-8-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Descendant chromatique inversé (6-7-5). Les notes consécutives rendent le saut moins brutal.",
    tip:"La version chromatique du doigté 2-1-3 descendant est plus \"coulante\" que la triade. Un bon intermédiaire.",
  },

  {
    id:"A3P2dM", cat:"A3", dir:"M", num:'2d', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Chromatique 2-1-3", bpm:70, bpmTarget:128,
    tab:`e|--------------------6-5-7-|
B|--------------6-5-7-------|
G|--------6-5-7-------------|
D|--6-5-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--7-8-6-------------------|||
--------7-8-6-------------|||
--------------7-8-6------o|||
--------------------7-8-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée chromatique inversée (6-5-7), retour descendant (7-8-6). Le doigté maj+ind+aur sur deux types de mouvements.",
    tip:"À ce stade, tu dois sentir la différence entre chromatique et triade. Le change­ment de sens teste ta maîtrise.",
  },

  {
    id:"A3P2aD", cat:"A3", dir:"D", num:'2a', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Triade 2-1-3", bpm:70, bpmTarget:140,
    tab:`e|--------------------6-8-5-|
B|--------------6-8-5-------|
G|--------6-8-5-------------|
D|--6-8-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--7-9-6-------------------|||
--------7-9-6-------------|||
--------------7-9-6------o|||
--------------------7-9-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Trois doigts : 2-1-3 descendant (8-6-5 → 6-8-5). Version descendante avec doigté inversé.",
    tip:"La descente avec ce doigté est souvent plus difficile. L\'index en position médiane demande de l\'adaptation.",
  },

  {
    id:"A3P2aM", cat:"A3", dir:"M", num:'2a', notes:3, difficulty:"Intermédiaire", fingerings:['maj + ind + aur', 'maj + ind + ann', 'ann + ind + aur', 'ind + ann + aur'],
    name:"Triade 2-1-3", bpm:70, bpmTarget:128,
    tab:`e|--------------------6-5-8-|
B|--------------6-5-8-------|
G|--------6-5-8-------------|
D|--6-5-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--7-9-6-------------------|||
--------7-9-6-------------|||
--------------7-9-6------o|||
--------------------7-9-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée 2-1-3 (6-5-8), retour 2-1-3 descendant (7-9-6). Mix des doigtés inversés — le moment clé pour consolider.",
    tip:"Le changement de direction teste ta maîtrise du doigté 2-1-3. Si l\'un des sens traîne, reviens en mode entraînement.",
  },

  // ── A3P2b — Triade 3-1-4 (inversion de 1-3-4) ──────────────────────────────

  {
    id:"A3P2bU", cat:"A3", dir:"U", num:'2b', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + aur', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'],
    name:"Triade 3-1-4", bpm:70, bpmTarget:140,
    tab:`e|--------------------7-5-8-|
B|--------------7-5-8-------|
G|--------7-5-8-------------|
D|--7-5-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--8-6-9-------------------|||
--------8-6-9-------------|||
--------------8-6-9------o|||
--------------------8-6-9o|||
--------------------------|||
--------------------------|||`,
    desc:"Saute la case 2 : 3-1-4 (inversion de 1-3-4). Les deux premières notes inversées changent la mécanique.",
    tip:"L\'annulaire en position de départ — c\'est une nouvelle sensation. Le saut 3→1 demande de la précision.",
  },

  {
    id:"A3P2bD", cat:"A3", dir:"D", num:'2b', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + aur', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'],
    name:"Triade 3-1-4", bpm:70, bpmTarget:140,
    tab:`e|--------------------7-8-5-|
B|--------------7-8-5-------|
G|--------7-8-5-------------|
D|--7-8-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--8-9-6-------------------|||
--------8-9-6-------------|||
--------------8-9-6------o|||
--------------------8-9-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Descendant 3-1-4 (7-8-5). Le doigté inversé au retour crée une complexité bienvenue.",
    tip:"La mécanique descendante du saut est différente. Pratique les deux directions séparément si nécessaire.",
  },

  {
    id:"A3P2bM", cat:"A3", dir:"M", num:'2b', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + aur', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'],
    name:"Triade 3-1-4", bpm:70, bpmTarget:128,
    tab:`e|--------------------7-5-8-|
B|--------------7-5-8-------|
G|--------7-5-8-------------|
D|--7-5-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--8-9-6-------------------|||
--------8-9-6-------------|||
--------------8-9-6------o|||
--------------------8-9-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée 3-1-4 (7-5-8), retour descendant (8-9-6). L\'annulaire comme point de départ crée une indépendance nouvelle.",
    tip:"Le changement de sens teste ta maîtrise du doigté inversé. Ralentis au sommet si nécessaire.",
  },

  // ── A3P2c — Triade 3-1-5 (grande extension avec inversion) ────────────────────

  {
    id:"A3P2cU", cat:"A3", dir:"U", num:'2c', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + ind (shift)', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'], fretOffset:-1,
    name:"Triade 3-1-5", bpm:60, bpmTarget:120,
    tab:`e|--------------------7-5-9-|
B|--------------7-5-9-------|
G|--------7-5-9-------------|
D|--7-5-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--8-6-10----------------------|||
---------8-6-10---------------|||
----------------8-6-10-------o|||
-----------------------8-6-10o|||
--------------------------|||
--------------------------|||`,
    desc:"Deux sauts d\'une case : 3-1-5 (inversion de 1-3-5). Grande extension avec annulaire en point de départ.",
    tip:"L\'annulaire comme ancrage — attention à ne pas déplacer la main. Les sauts doivent rester nets.",
  },

  {
    id:"A3P2cD", cat:"A3", dir:"D", num:'2c', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + ind (shift)', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'], fretOffset:-1,
    name:"Triade 3-1-5", bpm:60, bpmTarget:120,
    tab:`e|--------------------7-9-5-|
B|--------------7-9-5-------|
G|--------7-9-5-------------|
D|--7-9-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--8-10-6----------------------|||
---------8-10-6---------------|||
----------------8-10-6-------o|||
-----------------------8-10-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Descendant 3-1-5 (7-9-5). Deux sauts inversés — plus difficile que le descendant classique.",
    tip:"Les deux sauts avec annulaire en position médiane demandent de la concentration. Très bon exercice d\'indépendance.",
  },

  {
    id:"A3P2cM", cat:"A3", dir:"M", num:'2c', notes:3, difficulty:"Intermédiaire", fingerings:['ann + ind + ind (shift)', 'ann + maj (ext.) + aur', 'ann + ind + ind (glis.)', 'aur + ind + ind (glis.)'], fretOffset:-1,
    name:"Triade 3-1-5", bpm:60, bpmTarget:110,
    tab:`e|--------------------7-5-9-|
B|--------------7-5-9-------|
G|--------7-5-9-------------|
D|--7-5-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--8-10-6----------------------|||
---------8-10-6---------------|||
----------------8-10-6-------o|||
-----------------------8-10-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée 3-1-5 (7-5-9), retour descendant (8-10-6). L\'annulaire comme base crée une sensation unique.",
    tip:"À ce stade, tu es capable d\'enchainer trois doigtés différents (1-2-3, 1-3-4/5, 3-1-4/5). C\'est la flexibilité maximale.",
  },

  {
    id:"A3P3bU", cat:"A3", dir:"U", num:'3b', notes:3, difficulty:"Intermédiaire", fingerings:['vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:80, bpmTarget:0,
    tab:`e|--------------------0-5-7-|
B|--------------0-5-7-------|
G|--------0-5-7-------------|
D|--0-5-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--0-7-9-------------------|||
--------0-7-9-------------|||
--------------0-7-9------o|||
--------------------0-7-9o|||
--------------------------|||
--------------------------|||`,
    desc:"Groupe 0-5-7 avec corde à vide. Synchronisation entre vide et doigté sur 3 notes.",
    tip:"La corde à vide doit avoir le même son que les notes doigtées. Travaille la continuité d\'attaque.",
  },

  {
    id:"A3P3bD", cat:"A3", dir:"D", num:'3b', notes:3, difficulty:"Intermédiaire", fingerings:['vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:80, bpmTarget:0,
    tab:`e|--------------------0-7-5-|
B|--------------0-7-5-------|
G|--------0-7-5-------------|
D|--0-7-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--0-9-7-------------------|||
--------0-9-7-------------|||
--------------0-9-7------o|||
--------------------0-9-7o|||
--------------------------|||
--------------------------|||`,
    desc:"Groupe inversé 0-7-5. Descente avec corde à vide finale. Inversion du groupe ascendant.",
    tip:"L\'annulaire frappe en premier. Le retour au 0 doit être transparent et net.",
  },

  {
    id:"A3P3bM", cat:"A3", dir:"M", num:'3b', notes:3, difficulty:"Intermédiaire", fingerings:['vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:80, bpmTarget:0,
    tab:`e|--------------------0-5-7-|
B|--------------0-5-7-------|
G|--------0-5-7-------------|
D|--0-5-7-------------------|
A|--------------------------|
E|--------------------------|
↩ retour inversé +1
--0-9-7-------------------|||
--------0-9-7-------------|||
--------------0-9-7------o|||
--------------------0-9-7o|||
--------------------------|||
--------------------------|||`,
    desc:"Montée puis retour inversé décalé. Changement de sens fluide avec corde à vide.",
    tip:"Le vide en début et fin doit sonner identiquement. Fluidité entre montée et descente inversée.",
  },

  {
    id:"A3P1bU", cat:"A3", dir:"U", num:'1b', notes:3, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'],
    name:"Triade 1-3-4", bpm:70, bpmTarget:140,
    tab:`e|--------------------5-7-8-|
B|--------------5-7-8-------|
G|--------5-7-8-------------|
D|--5-7-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--6-8-9-------------------|||
--------6-8-9-------------|||
--------------6-8-9------o|||
--------------------6-8-9o|||
--------------------------|||
--------------------------|||`,
    desc:"Saute la case 2 : 1-3-4. Travaille l\'extension médius-annulaire.",
    tip:"Le saut 1→3 en début de cellule est l\'écueil principal. Ancre bien l\'index.",
  },

  {
    id:"A3P1bD", cat:"A3", dir:"D", num:'1b', notes:3, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'],
    name:"Triade 1-3-4", bpm:70, bpmTarget:140,
    tab:`e|--------------------8-7-5-|
B|--------------8-7-5-------|
G|--------8-7-5-------------|
D|--8-7-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--9-8-6-------------------|||
--------9-8-6-------------|||
--------------9-8-6------o|||
--------------------9-8-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Saute la case 2 : 1-3-4. Travaille l\'extension médius-annulaire. Version descendante.",
    tip:"Le saut 1→3 en début de cellule est l\'écueil principal. Ancre bien l\'index. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A3P1bM", cat:"A3", dir:"M", num:'1b', notes:3, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'],
    name:"Triade 1-3-4", bpm:70, bpmTarget:128,
    tab:`e|--------------------5-7-8-|
B|--------------5-7-8-------|
G|--------5-7-8-------------|
D|--5-7-8-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--9-8-6-------------------|||
--------9-8-6-------------|||
--------------9-8-6------o|||
--------------------9-8-6o|||
--------------------------|||
--------------------------|||`,
    desc:"Saute la case 2 : 1-3-4. Travaille l\'extension médius-annulaire. Montée puis retour décalé d\'une case.",
    tip:"Le saut 1→3 en début de cellule est l\'écueil principal. Ancre bien l\'index. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A3P1cU", cat:"A3", dir:"U", num:'1c', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ann + ind (shift)', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'], fretOffset:-1,
    name:"Triade 1-3-5", bpm:60, bpmTarget:120,
    tab:`e|--------------------5-7-9-|
B|--------------5-7-9-------|
G|--------5-7-9-------------|
D|--5-7-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--6-8-10----------------------|||
---------6-8-10---------------|||
----------------6-8-10-------o|||
-----------------------6-8-10o|||
--------------------------|||
--------------------------|||`,
    desc:"Deux sauts d\'une case : 1-3-5. Grande extension sur 3 doigts.",
    tip:"Attention à ne pas déplacer la main. Les 3 doigts doivent rester ancrés.",
  },

  {
    id:"A3P1cD", cat:"A3", dir:"D", num:'1c', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ann + ind (shift)', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'], fretOffset:-1,
    name:"Triade 1-3-5", bpm:60, bpmTarget:120,
    tab:`e|--------------------9-7-5-|
B|--------------9-7-5-------|
G|--------9-7-5-------------|
D|--9-7-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--10-8-6----------------------|||
---------10-8-6---------------|||
----------------10-8-6-------o|||
-----------------------10-8-6o|||
------------------------------|||
------------------------------|||`,
    desc:"Deux sauts d\'une case : 1-3-5. Grande extension sur 3 doigts. Version descendante.",
    tip:"Attention à ne pas déplacer la main. Les 3 doigts doivent rester ancrés. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A3P1cM", cat:"A3", dir:"M", num:'1c', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ann + ind (shift)', 'ind + maj (ext.) + aur', 'ind + ann + ann (glis.)', 'maj + aur + aur (glis.)'], fretOffset:-1,
    name:"Triade 1-3-5", bpm:60, bpmTarget:110,
    tab:`e|--------------------5-7-9-|
B|--------------5-7-9-------|
G|--------5-7-9-------------|
D|--5-7-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--10-8-6----------------------|||
---------10-8-6---------------|||
----------------10-8-6-------o|||
-----------------------10-8-6o|||
------------------------------|||
------------------------------|||`,
    desc:"Deux sauts d\'une case : 1-3-5. Grande extension sur 3 doigts. Montée puis retour décalé d\'une case.",
    tip:"Attention à ne pas déplacer la main. Les 3 doigts doivent rester ancrés. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A3P?aU", cat:"A3", dir:"U", num:'?a', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ind + aur', 'ind + ind + ann (ext.)', 'maj + maj + aur', 'ind + ind (glis.) + maj'], fretOffset:-1,
    name:"Double frappe + saut", bpm:60, bpmTarget:120,
    tab:`e|--------------------5-5-9-|
B|--------------5-5-9-------|
G|--------5-5-9-------------|
D|--5-5-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour décalé +1
--6-6-10------------------|||
--------6-6-10------------|||
--------------6-6-10-----o|||
--------------------6-6-10o|||
---------------------------|||
---------------------------|||`,
    desc:"Note pivot jouée deux fois puis saut (doigté 1-1-4). Le rebond avant le saut est la clé du pattern.",
    tip:"L\'index pose la base, le saut avec l\'auriculaire doit être précis et détendu. Ne contracte pas la main.",
  },

  {
    id:"A3P?aD", cat:"A3", dir:"D", num:'?a', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ind + aur', 'ind + ind + ann (ext.)', 'maj + maj + aur', 'ind + ind (glis.) + maj'], fretOffset:-1,
    name:"Double frappe + saut", bpm:60, bpmTarget:120,
    tab:`e|--------------------9-5-5-|
B|--------------9-5-5-------|
G|--------9-5-5-------------|
D|--9-5-5-------------------|
A|--------------------------|
E|--------------------------|
↩ retour +1 case
--10-6-6------------------|||
--------10-6-6------------|||
--------------10-6-6-----o|||
--------------------10-6-6o|||
---------------------------|||
---------------------------|||`,
    desc:"Saut large en premier (9→5), puis double note pivot. Renforce l\'auriculaire et l\'extension. Version descendante.",
    tip:"Le saut initial (auriculaire vers index) est plus difficile que dans la version U. Prends ton temps.",
  },

  {
    id:"A3P?aM", cat:"A3", dir:"M", num:'?a', notes:3, difficulty:"Intermédiaire", fingerings:['ind + ind + aur', 'ind + ind + ann (ext.)', 'maj + maj + aur', 'ind + ind (glis.) + maj'], fretOffset:-1,
    name:"Double frappe + saut", bpm:55, bpmTarget:110,
    tab:`e|--------------------5-5-9-|
B|--------------5-5-9-------|
G|--------5-5-9-------------|
D|--5-5-9-------------------|
A|--------------------------|
E|--------------------------|
↩ retour descendant +1
--10-6-6------------------|||
--------10-6-6------------|||
--------------10-6-6-----o|||
--------------------10-6-6o|||
---------------------------|||
---------------------------|||`,
    desc:"Montée double frappe + saut, retour avec le grand saut en premier. Le changement de sens met l\'auriculaire à l\'épreuve.",
    tip:"Travaille U et D séparément avant de chaîner. Le sommet du run est le point critique.",
  },

  // ── A2 — 2 NOTES ────────────────────────────────────────────────────────────

  {
    id:"A2P1aU", cat:"A2", dir:"U", num:'1a', notes:2, difficulty:"Intermédiaire", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Demi-ton", bpm:80, bpmTarget:160,
    tab:`e|--------------5-6-|
B|----------5-6-----|
G|------5-6---------|
D|--5-6-------------|
A|------------------|
E|------------------|
↩ retour décalé +1
--6-7-------------|||
------6-7---------|||
----------6-7----o|||
--------------6-7o|||
------------------|||
------------------|||`,
    desc:"Deux notes adjacentes. Le plus simple — mais essentiel pour la fluidité.",
    tip:"Focus sur la synchronisation main gauche / main droite. Zéro tension.",
  },

  {
    id:"A2P1aD", cat:"A2", dir:"D", num:'1a', notes:2, difficulty:"Intermédiaire", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Demi-ton", bpm:80, bpmTarget:160,
    tab:`e|--------------6-5-|
B|----------6-5-----|
G|------6-5---------|
D|--6-5-------------|
A|------------------|
E|------------------|
↩ retour +1 case
--7-6-------------|||
------7-6---------|||
----------7-6----o|||
--------------7-6o|||
------------------|||
------------------|||`,
    desc:"Deux notes adjacentes. Le plus simple — mais essentiel pour la fluidité. Version descendante.",
    tip:"Focus sur la synchronisation main gauche / main droite. Zéro tension. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A2P1aM", cat:"A2", dir:"M", num:'1a', notes:2, difficulty:"Intermédiaire", fingerings:['ind + maj', 'maj + ann', 'ann + aur', 'ind + ind (glis.)'],
    name:"Demi-ton", bpm:80, bpmTarget:147,
    tab:`e|--------------5-6-|
B|----------5-6-----|
G|------5-6---------|
D|--5-6-------------|
A|------------------|
E|------------------|
↩ retour descendant +1
--7-6-------------|||
------7-6---------|||
----------7-6----o|||
--------------7-6o|||
------------------|||
------------------|||`,
    desc:"Deux notes adjacentes. Le plus simple — mais essentiel pour la fluidité. Montée puis retour décalé d\'une case.",
    tip:"Focus sur la synchronisation main gauche / main droite. Zéro tension. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A2P1bU", cat:"A2", dir:"U", num:'1b', notes:2, etape:3, etapeOrder:3, difficulty:"Intermédiaire", related:"A4P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Ton entier", bpm:80, bpmTarget:160,
    tab:`e|--------------5-7-|
B|----------5-7-----|
G|------5-7---------|
D|--5-7-------------|
A|------------------|
E|------------------|
↩ retour décalé +1
--6-8-------------|||
------6-8---------|||
----------6-8----o|||
--------------6-8o|||
------------------|||
------------------|||`,
    desc:"Deux notes séparées d\'un ton entier : 1-3.",
    tip:"Extension index-majeur ou index-annulaire. Garde la main décontractée.",
  },

  {
    id:"A2P1bD", cat:"A2", dir:"D", num:'1b', notes:2, etape:3, etapeOrder:3, difficulty:"Intermédiaire", related:"A4P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Ton entier", bpm:80, bpmTarget:160,
    tab:`e|--------------7-5-|
B|----------7-5-----|
G|------7-5---------|
D|--7-5-------------|
A|------------------|
E|------------------|
↩ retour +1 case
--8-6-------------|||
------8-6---------|||
----------8-6----o|||
--------------8-6o|||
------------------|||
------------------|||`,
    desc:"Deux notes séparées d\'un ton entier : 1-3. Version descendante.",
    tip:"Extension index-majeur ou index-annulaire. Garde la main décontractée. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A2P1bM", cat:"A2", dir:"M", num:'1b', notes:2, etape:3, etapeOrder:3, difficulty:"Intermédiaire", related:"A4P1b", fingerings:['ind + ann', 'ind + maj (ext.)', 'maj + aur', 'ann + aur (ext.)'],
    name:"Ton entier", bpm:80, bpmTarget:147,
    tab:`e|--------------5-7-|
B|----------5-7-----|
G|------5-7---------|
D|--5-7-------------|
A|------------------|
E|------------------|
↩ retour descendant +1
--8-6-------------|||
------8-6---------|||
----------8-6----o|||
--------------8-6o|||
------------------|||
------------------|||`,
    desc:"Deux notes séparées d\'un ton entier : 1-3. Montée puis retour décalé d\'une case.",
    tip:"Extension index-majeur ou index-annulaire. Garde la main décontractée. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A2P1cU", cat:"A2", dir:"U", num:'1c', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ind + ind (glis.)'],
    name:"Tierce mineure", bpm:70, bpmTarget:140,
    tab:`e|--------------5-8-|
B|----------5-8-----|
G|------5-8---------|
D|--5-8-------------|
A|------------------|
E|------------------|
↩ retour décalé +1
--6-9-------------|||
------6-9---------|||
----------6-9----o|||
--------------6-9o|||
------------------|||
------------------|||`,
    desc:"Extension sur 3 cases : 1-4. Préparation aux grands écarts.",
    tip:"Extension index-auriculaire sur 3 cases. Prudence et pauses fréquentes.",
  },

  {
    id:"A2P1cD", cat:"A2", dir:"D", num:'1c', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ind + ind (glis.)'],
    name:"Tierce mineure", bpm:70, bpmTarget:140,
    tab:`e|--------------8-5-|
B|----------8-5-----|
G|------8-5---------|
D|--8-5-------------|
A|------------------|
E|------------------|
↩ retour +1 case
--9-6-------------|||
------9-6---------|||
----------9-6----o|||
--------------9-6o|||
------------------|||
------------------|||`,
    desc:"Extension sur 3 cases : 1-4. Préparation aux grands écarts. Version descendante.",
    tip:"Extension index-auriculaire sur 3 cases. Prudence et pauses fréquentes. Le doigté inversé est souvent plus difficile.",
  },

  {
    id:"A2P1cM", cat:"A2", dir:"M", num:'1c', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur', 'ind + ann (ext.)', 'maj + aur (ext.)', 'ind + ind (glis.)'],
    name:"Tierce mineure", bpm:70, bpmTarget:128,
    tab:`e|--------------5-8-|
B|----------5-8-----|
G|------5-8---------|
D|--5-8-------------|
A|------------------|
E|------------------|
↩ retour descendant +1
--9-6-------------|||
------9-6---------|||
----------9-6----o|||
--------------9-6o|||
------------------|||
------------------|||`,
    desc:"Extension sur 3 cases : 1-4. Préparation aux grands écarts. Montée puis retour décalé d\'une case.",
    tip:"Extension index-auriculaire sur 3 cases. Prudence et pauses fréquentes. Le changement de sens au sommet doit être fluide, sans pause.",
  },

  {
    id:"A2P1dU", cat:"A2", dir:"U", num:'1d', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur (ext.)', 'ind + ann (surext.)', 'ind + ann (glis.)', 'ind + maj (glis.)'], fretOffset:-1,
    name:"Tierce majeure", bpm:65, bpmTarget:130,
    tab:`e|--------------5-9-|
B|----------5-9-----|
G|------5-9---------|
D|--5-9-------------|
A|------------------|
E|------------------|
↩ retour décalé +1
--6-10-------------|||
------6-10---------|||
----------6-10----o|||
--------------6-10o|||
-------------------|||
-------------------|||`,
    desc:"Extension sur 4 cases : 1-4. Intervalle de tierce majeure — le plus grand écart de la famille A2.",
    tip:"Legato ↑ à chaque changement de corde. DT1 : l'auriculaire (ext.) doit tomber ferme. Fais des pauses si tu sens une tension.",
  },

  {
    id:"A2P1dD", cat:"A2", dir:"D", num:'1d', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur (ext.)', 'ind + ann (surext.)', 'ind + ann (glis.)', 'ind + maj (glis.)'], fretOffset:-1,
    name:"Tierce majeure", bpm:65, bpmTarget:130,
    tab:`e|--------------9-5-|
B|----------9-5-----|
G|------9-5---------|
D|--9-5-------------|
A|------------------|
E|------------------|
↩ retour +1 case
--10-6-------------|||
------10-6---------|||
----------10-6----o|||
--------------10-6o|||
-------------------|||
-------------------|||`,
    desc:"Tierce majeure descendante : 4-1. L'auriculaire frappe en premier — sens moins naturel, à travailler séparément.",
    tip:"Legato ↑ à chaque changement de corde. Compare ta précision avec la version U — l'écart 4→1 est souvent moins sûr.",
  },

  {
    id:"A2P1dM", cat:"A2", dir:"M", num:'1d', notes:2, difficulty:"Intermédiaire", fingerings:['ind + aur (ext.)', 'ind + ann (surext.)', 'ind + ann (glis.)', 'ind + maj (glis.)'], fretOffset:-1,
    name:"Tierce majeure", bpm:60, bpmTarget:120,
    tab:`e|--------------5-9-|
B|----------5-9-----|
G|------5-9---------|
D|--5-9-------------|
A|------------------|
E|------------------|
↩ retour descendant +1
--10-6-------------|||
------10-6---------|||
----------10-6----o|||
--------------10-6o|||
-------------------|||
-------------------|||`,
    desc:"Tierce majeure aller-retour : montée index-auriculaire, retour auriculaire-index décalé d'un demi-ton.",
    tip:"Le changement de sens en haut doit être transparent. Legato ↑ à chaque changement de corde.",
  },

  // ── A6 — 6 NOTES (triade doublée) ──────────────────────────────────────────
  {
    id:"A6P1aU", cat:"A6", dir:"U", num:'1a', notes:6, etape:1, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + maj + maj (glis.)', 'ind + ind (glis.) + maj'],
    name:"Triade doublée 1-2-4", bpm:65, bpmTarget:130,
    tab:`e|--------------------------------------5-6-8-5-6-8-|
B|--------------------------5-6-8-5-6-8-------------|
G|--------------5-6-8-5-6-8-------------------------|
D|--5-6-8-5-6-8-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--6-7-9-6-7-9-------------------------------------|||
--------------6-7-9-6-7-9-------------------------|||
--------------------------6-7-9-6-7-9------------o|||
--------------------------------------6-7-9-6-7-9o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Triade 1-2-4 jouée deux fois avant le changement de corde. Plus de temps pour préparer le déplacement, médiator plus régulier.",
    tip:"La répétition de la cellule doit sonner identique les deux fois. Aucune différence d\'attaque entre la 1ère et la 2ème passe.",
  },
  {
    id:"A6P1aD", cat:"A6", dir:"D", num:'1a', notes:6, etape:1, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + maj + maj (glis.)', 'ind + ind (glis.) + maj'],
    name:"Triade doublée 1-2-4", bpm:65, bpmTarget:130,
    tab:`e|--------------------------------------8-6-5-8-6-5-|
B|--------------------------8-6-5-8-6-5-------------|
G|--------------8-6-5-8-6-5-------------------------|
D|--8-6-5-8-6-5-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--9-7-6-9-7-6-------------------------------------|||
--------------9-7-6-9-7-6-------------------------|||
--------------------------9-7-6-9-7-6------------o|||
--------------------------------------9-7-6-9-7-6o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Triade 1-2-4 inversée et doublée (4-2-1-4-2-1). Le retour décalé régule la synchronisation main gauche / médiator.",
    tip:"Garde le même poids de médiator sur chaque note. La répétition met en évidence les irrégularités — c\'est son rôle.",
  },
  {
    id:"A6P1aM", cat:"A6", dir:"M", num:'1a', notes:6, etape:1, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + maj + maj (glis.)', 'ind + ind (glis.) + maj'],
    name:"Triade doublée 1-2-4", bpm:60, bpmTarget:120,
    tab:`e|--------------------------------------5-6-8-5-6-8-|
B|--------------------------5-6-8-5-6-8-------------|
G|--------------5-6-8-5-6-8-------------------------|
D|--5-6-8-5-6-8-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour descendant +1
--9-7-6-9-7-6-------------------------------------|||
--------------9-7-6-9-7-6-------------------------|||
--------------------------9-7-6-9-7-6------------o|||
--------------------------------------9-7-6-9-7-6o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée triade doublée 1-2-4, retour triade inversée doublée décalée. Le run complet aller-retour avec cellule répétée.",
    tip:"Travaille U et D séparément d\'abord. Le changement de sens au sommet doit rester fluide malgré la cellule plus longue.",
  },
  {
    id:"A6P1bU", cat:"A6", dir:"U", num:'1b', notes:6, etape:2, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + ann', 'ind + ann + ann (glis.)', 'ind + ind (glis.) + ann'],
    name:"Triade doublée 1-3-4", bpm:65, bpmTarget:130,
    tab:`e|--------------------------------------5-7-8-5-7-8-|
B|--------------------------5-7-8-5-7-8-------------|
G|--------------5-7-8-5-7-8-------------------------|
D|--5-7-8-5-7-8-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--6-8-9-6-8-9-------------------------------------|||
--------------6-8-9-6-8-9-------------------------|||
--------------------------6-8-9-6-8-9------------o|||
--------------------------------------6-8-9-6-8-9o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Triade 1-3-4 jouée deux fois avant le changement de corde. Le saut 1→3 est répété deux fois : idéal pour ancrer l\'extension.",
    tip:"L\'index doit rester ancré pendant le saut initial. La répétition révèle si l\'extension est maîtrisée ou forcée.",
  },
  {
    id:"A6P1bD", cat:"A6", dir:"D", num:'1b', notes:6, etape:2, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + ann', 'ind + ann + ann (glis.)', 'ind + ind (glis.) + ann'],
    name:"Triade doublée 1-3-4", bpm:65, bpmTarget:130,
    tab:`e|--------------------------------------8-7-5-8-7-5-|
B|--------------------------8-7-5-8-7-5-------------|
G|--------------8-7-5-8-7-5-------------------------|
D|--8-7-5-8-7-5-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--9-8-6-9-8-6-------------------------------------|||
--------------9-8-6-9-8-6-------------------------|||
--------------------------9-8-6-9-8-6------------o|||
--------------------------------------9-8-6-9-8-6o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Triade 1-3-4 inversée et doublée (4-3-1-4-3-1). La répétition met l\'accent sur la régularité du retour de médiator.",
    tip:"Le saut 4→3 en début de cellule est l\'écueil principal en descente. Répété deux fois, il doit devenir automatique.",
  },
  {
    id:"A6P1bM", cat:"A6", dir:"M", num:'1b', notes:6, etape:2, etapeOrder:2, difficulty:"Débutant", fingerings:['ind + ann + aur', 'ind + maj (ext.) + ann', 'ind + ann + ann (glis.)', 'ind + ind (glis.) + ann'],
    name:"Triade doublée 1-3-4", bpm:60, bpmTarget:120,
    tab:`e|--------------------------------------5-7-8-5-7-8-|
B|--------------------------5-7-8-5-7-8-------------|
G|--------------5-7-8-5-7-8-------------------------|
D|--5-7-8-5-7-8-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour descendant +1
--9-8-6-9-8-6-------------------------------------|||
--------------9-8-6-9-8-6-------------------------|||
--------------------------9-8-6-9-8-6------------o|||
--------------------------------------9-8-6-9-8-6o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée triade doublée 1-3-4, retour inversé décalé. Le run complet aller-retour avec l\'extension 1→3 répétée.",
    tip:"La combinaison montée/descente avec cellule de 6 notes demande une concentration soutenue. Reste détendu.",
  },
  {
    id:"A6P1cU", cat:"A6", dir:"U", num:'1c', notes:6, etape:3, etapeOrder:2, difficulty:"Intermédiaire", fingerings:['ind (ext.) + maj + aur', 'ind (ext.) + ann + aur', 'ind (ext.) + maj + ann (ext.)', 'ind (ext.) + ann + ann (glis.)'], fretOffset:-1,
    name:"Triade doublée 1-3-5", bpm:55, bpmTarget:110,
    tab:`e|--------------------------------------5-7-9-5-7-9-|
B|--------------------------5-7-9-5-7-9-------------|
G|--------------5-7-9-5-7-9-------------------------|
D|--5-7-9-5-7-9-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--6-8-10-6-8-10-------------------------------------|||
--------------6-8-10-6-8-10-------------------------|||
--------------------------6-8-10-6-8-10------------o|||
--------------------------------------6-8-10-6-8-10o|||
----------------------------------------------------|||
----------------------------------------------------|||`,
    desc:"Triade doublée 1-3-5 : extension sur 4 cases entières. Cellule pentatonique jouée deux fois avant chaque changement de corde.",
    tip:"Legato ↑ à chaque changement de corde. L'index en extension doit rester ancré et stable pendant toute la montée. Commence très lentement.",
  },
  {
    id:"A6P1cD", cat:"A6", dir:"D", num:'1c', notes:6, etape:3, etapeOrder:2, difficulty:"Intermédiaire", fingerings:['ind (ext.) + maj + aur', 'ind (ext.) + ann + aur', 'ind (ext.) + maj + ann (ext.)', 'ind (ext.) + ann + ann (glis.)'], fretOffset:-1,
    name:"Triade doublée 1-3-5", bpm:55, bpmTarget:110,
    tab:`e|--------------------------------------9-7-5-9-7-5-|
B|--------------------------9-7-5-9-7-5-------------|
G|--------------9-7-5-9-7-5-------------------------|
D|--9-7-5-9-7-5-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--10-8-6-10-8-6-------------------------------------|||
--------------10-8-6-10-8-6-------------------------|||
--------------------------10-8-6-10-8-6------------o|||
--------------------------------------10-8-6-10-8-6o|||
----------------------------------------------------|||
----------------------------------------------------|||`,
    desc:"Triade doublée 1-3-5 inversée (5-3-1). L'auriculaire frappe en premier — la descente pentatonique doublée.",
    tip:"Legato ↑ à chaque changement de corde. Travaille la descente séparément avant de combiner avec la montée.",
  },
  {
    id:"A6P1cM", cat:"A6", dir:"M", num:'1c', notes:6, etape:3, etapeOrder:2, difficulty:"Intermédiaire", fingerings:['ind (ext.) + maj + aur', 'ind (ext.) + ann + aur', 'ind (ext.) + maj + ann (ext.)', 'ind (ext.) + ann + ann (glis.)'], fretOffset:-1,
    name:"Triade doublée 1-3-5", bpm:50, bpmTarget:100,
    tab:`e|--------------------------------------5-7-9-5-7-9-|
B|--------------------------5-7-9-5-7-9-------------|
G|--------------5-7-9-5-7-9-------------------------|
D|--5-7-9-5-7-9-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour descendant +1
--10-8-6-10-8-6-------------------------------------|||
--------------10-8-6-10-8-6-------------------------|||
--------------------------10-8-6-10-8-6------------o|||
--------------------------------------10-8-6-10-8-6o|||
----------------------------------------------------|||
----------------------------------------------------|||`,
    desc:"Montée triade doublée 1-3-5, retour inversé décalé. Le run complet pentatonique aller-retour.",
    tip:"Le changement de sens en haut doit être transparent. Legato ↑ à chaque changement de corde.",
  },

  {
    id:"A6P2aU", cat:"A6", dir:"U", num:'2a', notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + ann + aur + ann + maj'],
    name:"Chromatique 1-2-3-4-3-2", bpm:60, bpmTarget:0,
    tab:`e|--------------------------------------5-6-7-8-7-6-|
B|--------------------------5-6-7-8-7-6-------------|
G|--------------5-6-7-8-7-6-------------------------|
D|--5-6-7-8-7-6-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--6-7-8-9-8-7-------------------------------------|||
--------------6-7-8-9-8-7-------------------------|||
--------------------------6-7-8-9-8-7------------o|||
--------------------------------------6-7-8-9-8-7o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée chromatique sur 4 frettes : 1-2-3-4-3-2. Dextérité et indépendance des doigts sur extension maximale.",
    tip:"Commence très lentement. Chaque doigt doit rester fixe et stable après avoir joué. Aucune tension inutile dans la main.",
  },

  {
    id:"A6P2aD", cat:"A6", dir:"D", num:'2a', notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + ann + aur + ann + maj'],
    name:"Chromatique 1-2-3-4-3-2", bpm:60, bpmTarget:0,
    tab:`e|--------------------------------------8-7-6-5-6-7-|
B|--------------------------8-7-6-5-6-7-------------|
G|--------------8-7-6-5-6-7-------------------------|
D|--8-7-6-5-6-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--9-8-7-6-7-8-------------------------------------|||
--------------9-8-7-6-7-8-------------------------|||
--------------------------9-8-7-6-7-8------------o|||
--------------------------------------9-8-7-6-7-8o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Descente chromatique inversée : 4-3-2-1-2-3. Le doigté inversé force la main à apprendre une nouvelle séquence motrice.",
    tip:"La descente est souvent plus difficile. Travaille lentement en isolation avant de combiner avec la montée.",
  },

  {
    id:"A6P2aM", cat:"A6", dir:"M", num:'2a', notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + ann + aur + ann + maj'],
    name:"Chromatique 1-2-3-4-3-2", bpm:60, bpmTarget:0,
    tab:`e|--------------------------------------5-6-7-8-7-6-|
B|--------------------------5-6-7-8-7-6-------------|
G|--------------5-6-7-8-7-6-------------------------|
D|--5-6-7-8-7-6-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour inversé +1
--9-8-7-6-7-8-------------------------------------|||
--------------9-8-7-6-7-8-------------------------|||
--------------------------9-8-7-6-7-8------------o|||
--------------------------------------9-8-7-6-7-8o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée puis retour inversé décalé. Maîtrise de l\'extension suivi d\'une réaction rapide au changement de sens.",
    tip:"Le sommet doit être net et propre. Le passage en descente inversée doit être instantané sans pause entre les deux directions.",
  },

  {
    id:"A6P3bU", cat:"A6", dir:"U", num:'3b', notes:6, difficulty:"Débutant", fingerings:['vide + ind + ann + vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:70, bpmTarget:0,
    tab:`e|--------------------------------------0-5-7-0-5-7-|
B|--------------------------0-5-7-0-5-7-------------|
G|--------------0-5-7-0-5-7-------------------------|
D|--0-5-7-0-5-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--0-7-9-0-7-9-------------------------------------|||
--------------0-7-9-0-7-9-------------------------|||
--------------------------0-7-9-0-7-9------------o|||
--------------------------------------0-7-9-0-7-9o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Groupe de trois notes 0-5-7 avec corde à vide. Travail de synchronisation entre corde libre et doigté.",
    tip:"La corde à vide doit sonner aussi clairement que les notes doigtées. Aucune différence de volume ou de timbre.",
  },

  {
    id:"A6P3bD", cat:"A6", dir:"D", num:'3b', notes:6, difficulty:"Débutant", fingerings:['vide + ind + ann + vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:70, bpmTarget:0,
    tab:`e|--------------------------------------0-7-5-0-7-5-|
B|--------------------------0-7-5-0-7-5-------------|
G|--------------0-7-5-0-7-5-------------------------|
D|--0-7-5-0-7-5-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--0-9-7-0-9-7-------------------------------------|||
--------------0-9-7-0-9-7-------------------------|||
--------------------------0-9-7-0-9-7------------o|||
--------------------------------------0-9-7-0-9-7o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Groupe inversé 7-5-0 : descente avec corde à vide finale. Inversion rythmique du groupe ascendant.",
    tip:"L\'annulaire frappe en premier. Le retour au 0 doit être net et transparent. Travaille la transition 7→5→0.",
  },

  {
    id:"A6P3bM", cat:"A6", dir:"M", num:'3b', notes:6, difficulty:"Débutant", fingerings:['vide + ind + ann + vide + ind + ann'],
    name:"Groupe 0-5-7", bpm:70, bpmTarget:0,
    tab:`e|--------------------------------------0-5-7-0-5-7-|
B|--------------------------0-5-7-0-5-7-------------|
G|--------------0-5-7-0-5-7-------------------------|
D|--0-5-7-0-5-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour inversé +1
--0-9-7-0-9-7-------------------------------------|||
--------------0-9-7-0-9-7-------------------------|||
--------------------------0-9-7-0-9-7------------o|||
--------------------------------------0-9-7-0-9-7o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée puis retour inversé décalé avec corde à vide. Changement de sens fluide au sommet.",
    tip:"Le vide en début et fin doit sonner identiquement. La fluidité entre montée et descente inversée est clé.",
  },

  // ── A5 — 5 NOTES ────────────────────────────────────────────────────────────

  {
    id:"A5P1aU", cat:"A5", dir:"U", num:'1a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-4)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-8-6-8-|
B|----------------------5-6-8-6-8-----------|
G|------------5-6-8-6-8---------------------|
D|--5-6-8-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour décalé +1
--6-7-9-7-9-------------------------------|||
------------6-7-9-7-9---------------------|||
----------------------6-7-9-7-9----------o|||
--------------------------------6-7-9-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Cellule asymétrique de 5 notes (1-2-4-2-4) : crée un décalage rythmique naturel sur la pulsation. Très utilisé en metal/shred.",
    tip:"Le groupe de 5 ne retombe jamais au même endroit du temps. C\'est voulu — laisse-le se déplacer naturellement.",
  },

  {
    id:"A5P1aD", cat:"A5", dir:"D", num:'1a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------8-6-5-6-5-|
B|----------------------8-6-5-6-5-----------|
G|------------8-6-5-6-5---------------------|
D|--8-6-5-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour +1 case
--9-7-6-7-6-------------------------------|||
------------9-7-6-7-6---------------------|||
----------------------9-7-6-7-6----------o|||
--------------------------------9-7-6-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Cellule descendante de 5 notes (4-2-4-2-1) : débute par le sommet, oscille puis redescend. Version descendante.",
    tip:"La cellule inversée est souvent plus difficile à sentir rythmiquement. Compte les temps à voix haute au départ.",
  },

  {
    id:"A5P1aM", cat:"A5", dir:"M", num:'1a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-4)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-6-8-6-8-|
B|----------------------5-6-8-6-8-----------|
G|------------5-6-8-6-8---------------------|
D|--5-6-8-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-7-6-7-6-------------------------------|||
------------9-7-6-7-6---------------------|||
----------------------9-7-6-7-6----------o|||
--------------------------------9-7-6-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe de 5 ascendant puis retour oscillant décalé. Le run complet sur 4 cordes crée un déplacement rythmique profond.",
    tip:"Maîtrise bien U et D avant de mixer. Le décalage du groupe de 5 peut perturber la pulsation — c\'est précisément l\'exercice.",
  },

  {
    id:"A5P1bU", cat:"A5", dir:"U", num:'1b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-4)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-7-8-7-8-|
B|----------------------5-7-8-7-8-----------|
G|------------5-7-8-7-8---------------------|
D|--5-7-8-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--6-8-9-8-9-------------------------------|||
------------6-8-9-8-9---------------------|||
----------------------6-8-9-8-9----------o|||
--------------------------------6-8-9-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe de 5 avec écart (1-3-4-3-4). Nouvelle combinaison de doigts qui élargit l\'indépendance.",
    tip:"Compare avec A5P1a — la différence de doigté change subtilement le ressenti rhythmique.",
  },

  {
    id:"A5P1bD", cat:"A5", dir:"D", num:'1b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-4)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-7-5-7-5-|
B|----------------------8-7-5-7-5-----------|
G|------------8-7-5-7-5---------------------|
D|--8-7-5-7-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-8-6-8-6-------------------------------|||
------------9-8-6-8-6---------------------|||
----------------------9-8-6-8-6----------o|||
--------------------------------9-8-6-8-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante du groupe (1-3-4-3-4). Débute du sommet.",
    tip:"Le doigté inversé peut surprendre — prends ton temps pour bien sentir chaque transition.",
  },

  {
    id:"A5P1bM", cat:"A5", dir:"M", num:'1b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-4)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-7-8-7-8-|
B|----------------------5-7-8-7-8-----------|
G|------------5-7-8-7-8---------------------|
D|--5-7-8-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-8-6-8-6-------------------------------|||
------------9-8-6-8-6---------------------|||
----------------------9-8-6-8-6----------o|||
--------------------------------9-8-6-8-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. Mélange les deux versants du pattern.",
    tip:"Sens bien la transition entre montée et retour — c\'est où les erreurs de rythme apparaissent.",
  },

  {
    id:"A5P1cU", cat:"A5", dir:"U", num:'1c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-6-8-6-8-|
B|----------------------4-6-8-6-8-----------|
G|------------4-6-8-6-8---------------------|
D|--4-6-8-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--5-7-9-7-9-------------------------------|||
------------5-7-9-7-9---------------------|||
----------------------5-7-9-7-9----------o|||
--------------------------------5-7-9-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe de 5 avec écart (1-3-5-3-5). Intervalle moyen — transition vers l\'extension.",
    tip:"L\'auriculaire commence à travailler plus. Assure-toi que chaque note est claire avant d\'accélérer.",
  },

  {
    id:"A5P1cD", cat:"A5", dir:"D", num:'1c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-6-4-6-4-|
B|----------------------8-6-4-6-4-----------|
G|------------8-6-4-6-4---------------------|
D|--8-6-4-6-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-7-5-7-5-------------------------------|||
------------9-7-5-7-5---------------------|||
----------------------9-7-5-7-5----------o|||
--------------------------------9-7-5-7-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante avec écart (1-3-5-3-5). Débute du sommet aigu.",
    tip:"Compare avec la montée — sens bien comment le doigté change avec la direction.",
  },

  {
    id:"A5P1cM", cat:"A5", dir:"M", num:'1c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-6-8-6-8-|
B|----------------------4-6-8-6-8-----------|
G|------------4-6-8-6-8---------------------|
D|--4-6-8-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-7-5-7-5-------------------------------|||
------------9-7-5-7-5---------------------|||
----------------------9-7-5-7-5----------o|||
--------------------------------9-7-5-7-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. L\'écart (1-3-5-3-5) en deux sens.",
    tip:"C\'est la progression logique après A5P1a et A5P1b. Prends ton temps pour bien sentir chaque transition.",
  },

  {
    id:"A5P1dU", cat:"A5", dir:"U", num:'1d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-7-8-7-8-|
B|----------------------4-7-8-7-8-----------|
G|------------4-7-8-7-8---------------------|
D|--4-7-8-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--5-8-9-8-9-------------------------------|||
------------5-8-9-8-9---------------------|||
----------------------5-8-9-8-9----------o|||
--------------------------------5-8-9-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe de 5 avec grand écart (1-4-5-4-5). L\'intervalle le plus large — extension maximale.",
    tip:"C\'est l\'exercice d\'extension le plus exigeant. L\'annulaire et l\'auriculaire doivent vraiment s\'étirer. Patience.",
  },

  {
    id:"A5P1dD", cat:"A5", dir:"D", num:'1d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-7-4-7-4-|
B|----------------------8-7-4-7-4-----------|
G|------------8-7-4-7-4---------------------|
D|--8-7-4-7-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-8-5-8-5-------------------------------|||
------------9-8-5-8-5---------------------|||
----------------------9-8-5-8-5----------o|||
--------------------------------9-8-5-8-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante du grand écart (1-4-5-4-5). Débute du sommet aigu.",
    tip:"En descente, l\'extension demande une précision encore plus grande. Chaque note doit être propre.",
  },

  {
    id:"A5P1dM", cat:"A5", dir:"M", num:'1d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-5)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-7-8-7-8-|
B|----------------------4-7-8-7-8-----------|
G|------------4-7-8-7-8---------------------|
D|--4-7-8-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-8-5-8-5-------------------------------|||
------------9-8-5-8-5---------------------|||
----------------------9-8-5-8-5----------o|||
--------------------------------9-8-5-8-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. Le grand écart complet en deux sens.",
    tip:"C\'est le sommet de la série A5 — extension maximale, précision maximale. Vise la limpidité.",
  },

  {
    id:"A5P1eU", cat:"A5", dir:"U", num:'1e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-2-3-2-3)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-7-6-7-|
B|----------------------5-6-7-6-7-----------|
G|------------5-6-7-6-7---------------------|
D|--5-6-7-6-7-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--6-7-8-7-8-------------------------------|||
------------6-7-8-7-8---------------------|||
----------------------6-7-8-7-8----------o|||
--------------------------------6-7-8-7-8o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe de 5 avec écart semitone (1-4-5-4-5). Version accessible — un bon point d\'entrée.",
    tip:"C\'est plus accessible que A5P1d mais demande quand même de l\'extension. Travaille à ton rythme.",
  },

  {
    id:"A5P1eD", cat:"A5", dir:"D", num:'1e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-5)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------7-6-5-6-5-|
B|----------------------7-6-5-6-5-----------|
G|------------7-6-5-6-5---------------------|
D|--7-6-5-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--8-7-6-7-6-------------------------------|||
------------8-7-6-7-6---------------------|||
----------------------8-7-6-7-6----------o|||
--------------------------------8-7-6-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante avec écart (1-4-5-4-5). Débute du sommet.",
    tip:"La descente est souvent plus facile que la montée pour l\'extension. Utilise ça à ton avantage.",
  },

  {
    id:"A5P1eM", cat:"A5", dir:"M", num:'1e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-2-3-2-3)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-7-6-7-|
B|----------------------5-6-7-6-7-----------|
G|------------5-6-7-6-7---------------------|
D|--5-6-7-6-7-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--8-7-6-7-6-------------------------------|||
------------8-7-6-7-6---------------------|||
----------------------8-7-6-7-6----------o|||
--------------------------------8-7-6-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. L\'écart accessible en deux sens.",
    tip:"Un bon intermédiaire entre A5P1c et A5P1d. Profites-en pour gagner en confiance.",
  },

  // ── A5P2 — GROUPE DE 5 (MOTIF ALLER-RETOUR) ──────────────────────────────

  {
    id:"A5P2aU", cat:"A5", dir:"U", num:'2a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-8-6-5-|
B|----------------------5-6-8-6-5-----------|
G|------------5-6-8-6-5---------------------|
D|--5-6-8-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour décalé +1
--6-7-9-7-6-------------------------------|||
------------6-7-9-7-6---------------------|||
----------------------6-7-9-7-6----------o|||
--------------------------------6-7-9-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Cellule aller-retour de 5 notes (1-2-4-2-1) : crée un motif symétrique qui redescend au point de départ. Variation mélodique du groupe de 5.",
    tip:"Contrairement à A5P1a, ce motif revient au même endroit — c'est l'aller-retour mélodique. Sens la symétrie.",
  },

  {
    id:"A5P2aD", cat:"A5", dir:"D", num:'2a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------8-6-5-6-8-|
B|----------------------8-6-5-6-8-----------|
G|------------8-6-5-6-8---------------------|
D|--8-6-5-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour +1 case
--9-7-6-7-9-------------------------------|||
------------9-7-6-7-9---------------------|||
----------------------9-7-6-7-9----------o|||
--------------------------------9-7-6-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Cellule descendante aller-retour (1-2-4-2-1) : débute du sommet, descend jusqu'au point bas puis remonte au même niveau. Version descendante symétrique.",
    tip:"Le motif est vraiment symétrique — tu descends et remontes au même point. C'est l'aller-retour mélodique parfait.",
  },

  {
    id:"A5P2aM", cat:"A5", dir:"M", num:'2a', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-2-4-2-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-6-8-6-5-|
B|----------------------5-6-8-6-5-----------|
G|------------5-6-8-6-5---------------------|
D|--5-6-8-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-7-6-7-9-------------------------------|||
------------9-7-6-7-9---------------------|||
----------------------9-7-6-7-9----------o|||
--------------------------------9-7-6-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe aller-retour ascendant puis retour descendant décalé. Le motif symétrique en deux directions.",
    tip:"Maîtrise bien U et D avant de mixer. Le feeling de symétrie du motif doit rester transparent à chaque répétition.",
  },

  {
    id:"A5P2bU", cat:"A5", dir:"U", num:'2b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-7-8-7-5-|
B|----------------------5-7-8-7-5-----------|
G|------------5-7-8-7-5---------------------|
D|--5-7-8-7-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--6-8-9-8-6-------------------------------|||
------------6-8-9-8-6---------------------|||
----------------------6-8-9-8-6----------o|||
--------------------------------6-8-9-8-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe aller-retour avec écart (1-3-4-3-1). Doigtés élargis, motif reste symétrique.",
    tip:"Compare avec A5P2a — l'écart change le ressenti mélodique mais conserve la structure aller-retour.",
  },

  {
    id:"A5P2bD", cat:"A5", dir:"D", num:'2b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-7-5-7-8-|
B|----------------------8-7-5-7-8-----------|
G|------------8-7-5-7-8---------------------|
D|--8-7-5-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-8-6-8-9-------------------------------|||
------------9-8-6-8-9---------------------|||
----------------------9-8-6-8-9----------o|||
--------------------------------9-8-6-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante avec écart (1-3-4-3-1). Débute du sommet avec doigts écartés et revient au point de départ.",
    tip:"L'écart s'agrandit en descente — la symétrie du retour crée une tension intéressante. Travaille lentement.",
  },

  {
    id:"A5P2bM", cat:"A5", dir:"M", num:'2b', notes:5, difficulty:"Intermédiaire", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-3-4-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------5-7-8-7-5-|
B|----------------------5-7-8-7-5-----------|
G|------------5-7-8-7-5---------------------|
D|--5-7-8-7-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-8-6-8-9-------------------------------|||
------------9-8-6-8-9---------------------|||
----------------------9-8-6-8-9----------o|||
--------------------------------9-8-6-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. L'écart en deux sens.",
    tip:"Sens bien la transition de direction — c'est où l'équilibre du motif symétrique s'évalue.",
  },

  {
    id:"A5P2cU", cat:"A5", dir:"U", num:'2c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-6-8-6-4-|
B|----------------------4-6-8-6-4-----------|
G|------------4-6-8-6-4---------------------|
D|--4-6-8-6-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--5-7-9-7-5-------------------------------|||
------------5-7-9-7-5---------------------|||
----------------------5-7-9-7-5----------o|||
--------------------------------5-7-9-7-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe aller-retour avec écart intermédiaire (1-3-5-3-1). Progression vers l'extension.",
    tip:"L'auriculaire commence à s'étirer. Assure-toi que la symétrie du motif reste audible malgré l'écart.",
  },

  {
    id:"A5P2cD", cat:"A5", dir:"D", num:'2c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-6-4-6-8-|
B|----------------------8-6-4-6-8-----------|
G|------------8-6-4-6-8---------------------|
D|--8-6-4-6-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-7-5-7-9-------------------------------|||
------------9-7-5-7-9---------------------|||
----------------------9-7-5-7-9----------o|||
--------------------------------9-7-5-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante avec écart intermédiaire (1-3-5-3-1). Débute aigu et revient au point de départ.",
    tip:"Sens bien comment l'extension affecte la fluidité en descente. La symétrie du retour est clé.",
  },

  {
    id:"A5P2cM", cat:"A5", dir:"M", num:'2c', notes:5, difficulty:"Intermédiaire", fingerings:['ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann', 'ind + maj + maj (glis.) + maj + maj (glis.)', 'ind + ind (glis.) + maj + ind (glis.) + maj'],
    name:"Groupe de 5 (1-3-5-3-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-6-8-6-4-|
B|----------------------4-6-8-6-4-----------|
G|------------4-6-8-6-4---------------------|
D|--4-6-8-6-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-7-5-7-9-------------------------------|||
------------9-7-5-7-9---------------------|||
----------------------9-7-5-7-9----------o|||
--------------------------------9-7-5-7-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. L'écart intermédiaire complet.",
    tip:"C'est la progression logique de la série — écarts croissants pour développer progressivement l'extension.",
  },

  {
    id:"A5P2dU", cat:"A5", dir:"U", num:'2d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-7-8-7-4-|
B|----------------------4-7-8-7-4-----------|
G|------------4-7-8-7-4---------------------|
D|--4-7-8-7-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--5-8-9-8-5-------------------------------|||
------------5-8-9-8-5---------------------|||
----------------------5-8-9-8-5----------o|||
--------------------------------5-8-9-8-5o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe aller-retour avec grand écart (1-4-5-4-1). Extension maximale et symétrie mélodique combinées.",
    tip:"C'est l'exercice d'extension ultime — exigeant physiquement et mélodiquement. Vise la limpidité.",
  },

  {
    id:"A5P2dD", cat:"A5", dir:"D", num:'2d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------8-7-4-7-8-|
B|----------------------8-7-4-7-8-----------|
G|------------8-7-4-7-8---------------------|
D|--8-7-4-7-8-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--9-8-5-8-9-------------------------------|||
------------9-8-5-8-9---------------------|||
----------------------9-8-5-8-9----------o|||
--------------------------------9-8-5-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante du grand écart (1-4-5-4-1). Débute aigu avec extension maximale et revient au point de départ.",
    tip:"En descente, l'extension demande une précision maximale. La symétrie du retour crée un défi physique unique.",
  },

  {
    id:"A5P2dM", cat:"A5", dir:"M", num:'2d', notes:5, difficulty:"Avancé", fingerings:['ind + ann + aur + ann + aur', 'ind + ann + maj + ann + maj', 'ind + maj + aur + maj + aur', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-4-5-4-1)", bpm:50, bpmTarget:90,
    tab:`e|--------------------------------4-7-8-7-4-|
B|----------------------4-7-8-7-4-----------|
G|------------4-7-8-7-4---------------------|
D|--4-7-8-7-4-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--9-8-5-8-9-------------------------------|||
------------9-8-5-8-9---------------------|||
----------------------9-8-5-8-9----------o|||
--------------------------------9-8-5-8-9o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. Le grand écart complet aller-retour en deux sens.",
    tip:"Sommet de la série A5P2 — extension et symétrie mélodique maximales. Vise la transparence.",
  },

  {
    id:"A5P2eU", cat:"A5", dir:"U", num:'2e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-2-3-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-7-6-5-|
B|----------------------5-6-7-6-5-----------|
G|------------5-6-7-6-5---------------------|
D|--5-6-7-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--6-7-8-7-6-------------------------------|||
------------6-7-8-7-6---------------------|||
----------------------6-7-8-7-6----------o|||
--------------------------------6-7-8-7-6o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Groupe aller-retour compact (1-2-3-2-1). Version accessible avec doigts proches — bon point d'entrée.",
    tip:"Doigts rapprochés = motif plus serré mélodiquement. Profites-en pour développer la précision avant d'écarter.",
  },

  {
    id:"A5P2eD", cat:"A5", dir:"D", num:'2e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-2-3-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------7-6-5-6-7-|
B|----------------------7-6-5-6-7-----------|
G|------------7-6-5-6-7---------------------|
D|--7-6-5-6-7-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour ascendant +1
--8-7-6-7-8-------------------------------|||
------------8-7-6-7-8---------------------|||
----------------------8-7-6-7-8----------o|||
--------------------------------8-7-6-7-8o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Version descendante avec doigts proches (1-2-3-2-1). Débute du sommet compact et revient au point de départ.",
    tip:"En descente, les doigts proches facilitent la fluidité et la symétrie. C'est le bon point de départ.",
  },

  {
    id:"A5P2eM", cat:"A5", dir:"M", num:'2e', notes:5, difficulty:"Débutant", fingerings:['ind + ann + maj + ann + maj', 'ind + ann + maj + maj + ann', 'ind + maj + maj + maj + maj', 'ind + maj + ann + maj + ann'],
    name:"Groupe de 5 (1-2-3-2-1)", bpm:55, bpmTarget:100,
    tab:`e|--------------------------------5-6-7-6-5-|
B|----------------------5-6-7-6-5-----------|
G|------------5-6-7-6-5---------------------|
D|--5-6-7-6-5-------------------------------|
A|------------------------------------------|
E|------------------------------------------|
↩ retour descendant +1
--8-7-6-7-8-------------------------------|||
------------8-7-6-7-8---------------------|||
----------------------8-7-6-7-8----------o|||
--------------------------------8-7-6-7-8o|||
------------------------------------------|||
------------------------------------------|||`,
    desc:"Montée ascendante avec retour descendant. L'aller-retour compact complet.",
    tip:"C'est le bon point de départ pour A5P2. Maîtrise cela avant de progresser vers les écarts plus larges.",
  },

  // ── B6 — MULTI-CORDES ───────────────────────────────────────────────────────

  {
    id:"B6P1aU", cat:"B6", dir:"U", num:"1a", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-2-4", bpm:60, bpmTarget:110,
    tabMid:`e|----------------------------------------------5----------|
B|----------------------------5--------5--6--8-----8--6----|
G|---------5--------5--6--8-----8--6----------------------|
D|5--6--8-----8--6----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------6---------------------------------------------|
--6--7--9-----9--7-----------6---------------------------|
--------------------6--7--9-----9--7-----------6--------|
--------------------------------------6--7--9-----9--7--|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------12---------|
B|-----------------------------12-------12-13-15----15-13---|
G|-----------12-------12-13-15----15-13---------------------|
D|--12-13-15----15-13---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------13---------------------------------------------|
--13-14-16----16-14----------13---------------------------|
--------------------13-14-16----16-14----------13---------|
--------------------------------------13-14-16----16-14---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule ascendante (5-6-8) sur D→G→B→e. Retour B→G→D avec cellule décalée +1. Boucle propre.",
    tip:"La note de croisement apparaît quand la corde précédente redescend. Anticipe-la sans l\'attendre.",
  },

  {
    id:"B6P1aD", cat:"B6", dir:"D", num:"1a", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-2-4", bpm:60, bpmTarget:110,
    tabMid:`e|-------------------------------------5-------------------|
B|-------------------5-------------------8--6--5--6--8-----|
G|5-------------------8--6--5--6--8------------------------|
D|---8--6--5--6--8-----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--6------------------------------------------------------|
-----9--7--6--7--9--6------------------------------------|
-----------------------9--7--6--7--9--6------------------|
-----------------------------------------9--7--6--7--9---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------12------------------|
B|--------------------12-------------------15-13-12-13-15---|
G|--12-------------------15-13-12-13-15---------------------|
D|-----15-13-12-13-15---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--13------------------------------------------------------|
-----16-14-13-14-16-13------------------------------------|
-----------------------16-14-13-14-16-13------------------|
-----------------------------------------16-14-13-14-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule en V (8-6-5-6-8) : on descend jusqu\'au fond (5) puis on remonte. Retour en V décalé E→B→G→D.",
    tip:"Le fond du V (note 5) est le pivot de chaque cellule. Ne précipite pas le rebond — c\'est là que tout se joue.",
  },

  {
    id:"B6P1aM", cat:"B6", dir:"M", num:"1a", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-2-4", bpm:60, bpmTarget:100,
    tabMid:`e|----------------------------------------------5----------|
B|----------------------------5--------5--6--8-----8--6----|
G|-----------5--------5--6--8-----8--6--------------------|
D|--5--6--8-----8--6--------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--6------------------------------------------------------|
-----9--7--6--7--9--6------------------------------------|
-----------------------9--7--6--7--9--6------------------|
-----------------------------------------9--7--6--7--9---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------12---------|
B|-----------------------------12-------12-13-15----15-13---|
G|-----------12-------12-13-15----15-13---------------------|
D|--12-13-15----15-13---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--13------------------------------------------------------|
-----16-14-13-14-16-13------------------------------------|
-----------------------16-14-13-14-16-13------------------|
-----------------------------------------16-14-13-14-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Montée U (cellules ascendantes 5-6-8) puis retour D (cellules en V 9-7-6-7-9). Le run complet aller-retour.",
    tip:"La montée est fluide, le retour en V est plus exigeant. Travaille U et D séparément avant de les chaîner.",
  },

  {
    id:"B6P1bU", cat:"B6", dir:"U", num:"1b", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-4", bpm:60, bpmTarget:110,
    tabMid:`e|-----------------------------------------------5----------|
B|-----------------------------5--------5--7--8-----8--7----|
G|-----------5--------5--7--8-----8--7----------------------|
D|--5--7--8-----8--7----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------6----------------------------------------------|
--6--8--9-----9--8-----------6---------------------------|
--------------------6--8--9-----9--8-----------6--------|
--------------------------------------6--8--9-----9--8--|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------12---------|
B|-----------------------------12-------12-14-15----15-14---|
G|-----------12-------12-14-15----15-14---------------------|
D|--12-14-15----15-14---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------13---------------------------------------------|
--13-15-16----16-15----------13---------------------------|
--------------------13-15-16----16-15----------13---------|
--------------------------------------13-15-16----16-15---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule ascendante (5-7-8) sur D→G→B→e. Retour B→G→D avec cellule décalée +1. Variation de P1a.",
    tip:"Intervalle plus large (tierce majeure). Antécédent mélodie plus brillante que P1a.",
  },

  {
    id:"B6P1bD", cat:"B6", dir:"D", num:"1b", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-4", bpm:60, bpmTarget:110,
    tabMid:`e|--------------------------------------5-------------------|
B|--------------------5-------------------8--7--5--7--8-----|
G|--5-------------------8--7--5--7--8----------------------|
D|-----8--7--5--7--8-----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--6------------------------------------------------------|
-----9--8--6--8--9--6------------------------------------|
-----------------------9--8--6--8--9--6------------------|
-----------------------------------------9--8--6--8--9---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------12------------------|
B|--------------------12-------------------15-14-12-14-15---|
G|--12-------------------15-14-12-14-15---------------------|
D|-----15-14-12-14-15---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--13------------------------------------------------------|
-----16-15-13-15-16-13------------------------------------|
-----------------------16-15-13-15-16-13------------------|
-----------------------------------------16-15-13-15-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule en V (8-7-5-7-8) : on descend jusqu'au fond (5) puis on remonte. Retour en V décalé E→B→G→D.",
    tip:"Même structure que P1a, notes plus rapprochées. Crée une densité mélodique différente.",
  },

  {
    id:"B6P1bM", cat:"B6", dir:"M", num:"1b", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-4", bpm:60, bpmTarget:100,
    tabMid:`e|-----------------------------------------------5----------|
B|-----------------------------5--------5--7--8-----8--7----|
G|-----------5--------5--7--8-----8--7--------------------|
D|--5--7--8-----8--7--------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--6------------------------------------------------------|
-----9--8--6--8--9--6-------------------------------------|
-----------------------9--8--6--8--9--6------------------|
-----------------------------------------9--8--6--8--9---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------12---------|
B|-----------------------------12-------12-14-15----15-14---|
G|-----------12-------12-14-15----15-14---------------------|
D|--12-14-15----15-14---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--13------------------------------------------------------|
-----16-15-13-15-16-13------------------------------------|
-----------------------16-15-13-15-16-13------------------|
-----------------------------------------16-15-13-15-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Montée U (cellules ascendantes 5-7-8) puis retour D (cellules en V 8-7-5-7-8). Le run complet aller-retour.",
    tip:"Variation plus dense que P1a. Compare les deux pour sentir la différence d'écartement des doigts.",
  },

  {
    id:"B6P1cU", cat:"B6", dir:"U", num:"1c", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-5", bpm:60, bpmTarget:110,
    tabMid:`e|-----------------------------------------------4----------|
B|-----------------------------4--------4--6--8-----8--6----|
G|-----------4--------4--6--8-----8--6----------------------|
D|--4--6--8-----8--6----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------5----------------------------------------------|
--5--7--9-----9--7-----------5---------------------------|
--------------------5--7--9-----9--7-----------5----------|
--------------------------------------5--7--9-----9--7----|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------11---------|
B|-----------------------------11-------11-13-15----15-13---|
G|-----------11-------11-13-15----15-13---------------------|
D|--11-13-15----15-13---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (B→G→D)
-----------12---------------------------------------------|
--12-14-16----16-14----------12---------------------------|
--------------------12-14-16----16-14----------12---------|
--------------------------------------12-14-16----16-14---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule ascendante (4-6-8) sur D→G→B→e. Écart resserré comparé à P1a/b. Retour fluide.",
    tip:"Écart minimal entre les notes. Permet des changements de cordes plus rapides.",
  },

  {
    id:"B6P1cD", cat:"B6", dir:"D", num:"1c", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-5", bpm:60, bpmTarget:110,
    tabMid:`e|--------------------------------------4-------------------|
B|--------------------4--------------------8--6--4--6--8-----|
G|--4--------------------8--6--4--6--8----------------------|
D|-----8--6--4--6--8-----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--5-------------------------------------------------------|
-----9--7--5--7--9--5-------------------------------------|
-----------------------9--7--5--7--9--5------------------|
-----------------------------------------9--7--5--7--9----|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------11------------------|
B|--------------------11-------------------15-13-11-13-15---|
G|--11-------------------15-13-11-13-15---------------------|
D|-----15-13-11-13-15---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour décalé +1 case (E→B→G→D)
--12------------------------------------------------------|
-----16-14-12-14-16-12------------------------------------|
-----------------------16-14-12-14-16-12------------------|
-----------------------------------------16-14-12-14-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Cellule en V (8-6-4-6-8) : notes resserrées. Retour décalé E→B→G→D avec variation P1c.",
    tip:"Écarts serrés = accélération possible. Travaille la précision des changements de corde.",
  },

  {
    id:"B6P1cM", cat:"B6", dir:"M", num:"1c", notes:6, difficulty:"Intermédiaire", fingerings:['ind + maj + aur', 'ind + maj + ann', 'ind + ann + aur', 'maj + ann + aur'],
    name:"Run de gamme 1-3-5", bpm:60, bpmTarget:100,
    tabMid:`e|-----------------------------------------------4----------|
B|-----------------------------4--------4--6--8-----8--6----|
G|-----------4--------4--6--8-----8--6----------------------|
D|--4--6--8-----8--6----------------------------------------|
A|---------------------------------------------------------|
E|---------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--5-------------------------------------------------------|
-----9--7--5--7--9--5-------------------------------------|
-----------------------9--7--5--7--9--5------------------|
-----------------------------------------9--7--5--7--9----|
---------------------------------------------------------|
---------------------------------------------------------|`,
    tabHigh:`e|-----------------------------------------------11---------|
B|-----------------------------11-------11-13-15----15-13---|
G|-----------11-------11-13-15----15-13---------------------|
D|--11-13-15----15-13---------------------------------------|
A|----------------------------------------------------------|
E|----------------------------------------------------------|
↩ retour en V décalé +1 (E→B→G→D)
--12------------------------------------------------------|
-----16-14-12-14-16-12------------------------------------|
-----------------------16-14-12-14-16-12------------------|
-----------------------------------------16-14-12-14-16---|
---------------------------------------------------------|
---------------------------------------------------------|`,
    desc:"Montée U (4-6-8) puis retour D en V. Écarts resserrés = plus d'agilité. Progression compacte.",
    tip:"Les trois variations (P1a/b/c) explorent des écarts différents. Maîtrise des trois = fluidité maximale.",
  },

  // ── B8 — 2 CORDES × 8 NOTES ─────────────────────────────────────────────────

  {
    id:"B8P1bU", cat:"B8", dir:"U", num:'1b', notes:8, difficulty:"Avancé", fingerings:['ind + aur (inf.) + ind (sup.)', 'maj + aur (inf.) + maj (sup.)', 'ind + ann (inf.) + ind (sup.)'],
    name:"Alternance 2 cordes — corde inf. en tête", bpm:55, bpmTarget:120,
    tabMid:`e|------------------------------------5-------5---|
B|--------------------5-------5---5-7---7-5-7---7-|
G|----5-------5---5-7---7-5-7---7-----------------|
D|5-7---7-5-7---7---------------------------------|
A|------------------------------------------------|
E|------------------------------------------------|
↩ retour +1
----6-------6-----------------------------------|
6-8---8-6-8---8-----6-------6-------------------|
----------------6-8---8-6-8---8-----6-------6---|
--------------------------------6-8---8-6-8---8o|
------------------------------------------------|
------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------------12----------12------|
B|--------------------------------12----------12----12-14----14-12-14----14---|
G|--------12----------12----12-14----14-12-14----14---------------------------|
D|--12-14----14-12-14----14---------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour +1
--------13----------13------------------------------------------------------|
--13-15----15-13-15----15-------13----------13------------------------------|
--------------------------13-15----15-13-15----15-------13----------13------|
--------------------------------------------------13-15----15-13-15----15---|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    desc:"Cellule à 2 cordes : la corde inférieure lance la paire (inf5–sup5–inf7, retour), se répète sur D/G → G/B → B/e. 24 notes par mesure.",
    tip:"La corde inférieure mène le motif — veille à ce que l\'auriculaire reste ancré sur la case 7 sans tension. Bascule corde/corde sans lever la main.",
  },

  {
    id:"B8P1bD", cat:"B8", dir:"D", num:'1b', notes:8, difficulty:"Avancé", fingerings:['ind + aur (sup.) + ind (inf.)', 'maj + aur (sup.) + maj (inf.)', 'ind + ann (sup.) + ind (inf.)'],
    name:"Alternance 2 cordes — corde sup. en tête", bpm:55, bpmTarget:120,
    tabMid:`e|--------------------------------5-------5-------|
B|----------------5-------5---------7-5-7---7-5-7-|
G|5-------5---------7-5-7---7-5-7-----------------|
D|--7-5-7---7-5-7---------------------------------|
A|------------------------------------------------|
E|------------------------------------------------|
↩ retour +1
6-------6---------------------------------------|
--8-6-8---8-6-8-6-------6-----------------------|
------------------8-6-8---8-6-8-6-------6-------|
----------------------------------8-6-8---8-6-8o|
------------------------------------------------|
------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------12----------12------------|
B|--------------------------12----------12-------------14-12-14----14-12-14---|
G|--12----------12-------------14-12-14----14-12-14---------------------------|
D|-----14-12-14----14-12-14---------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour +1
--13----------13------------------------------------------------------------|
-----15-13-15----15-13-15-13----------13------------------------------------|
-----------------------------15-13-15----15-13-15-13----------13------------|
-----------------------------------------------------15-13-15----15-13-15---|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    desc:"Variante : la corde supérieure lance la paire (sup5–inf7–inf5–inf7, retour), se répète sur D/G → G/B → B/e. Déplace la sensation rhythmique vers l\'aigu.",
    tip:"Le changement de tête de motif (corde sup. vs inf.) est subtil mais change tout le feeling. Écoute l\'accentuation naturelle de chaque version.",
  },

  {
    id:"B8P1bM", cat:"B8", dir:"M", num:'1b', notes:8, difficulty:"Avancé", fingerings:['ind + aur (inf.) + ind (sup.)', 'maj + aur (inf.) + maj (sup.)', 'ind + ann (inf.) + ind (sup.)'],
    name:"Alternance 2 cordes — montée inf. / retour sup.", bpm:55, bpmTarget:120,
    tabMid:`e|------------------------------------5-------5---|
B|--------------------5-------5---5-7---7-5-7---7-|
G|----5-------5---5-7---7-5-7---7-----------------|
D|5-7---7-5-7---7---------------------------------|
A|------------------------------------------------|
E|------------------------------------------------|
↩ retour +1
6-------6---------------------------------------|
--8-6-8---8-6-8-6-------6-----------------------|
------------------8-6-8---8-6-8-6-------6-------|
----------------------------------8-6-8---8-6-8o|
------------------------------------------------|
------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------------12----------12------|
B|--------------------------------12----------12----12-14----14-12-14----14---|
G|--------12----------12----12-14----14-12-14----14---------------------------|
D|--12-14----14-12-14----14---------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour +1
--13----------13------------------------------------------------------------||
-----15-13-15----15-13-15-13----------13------------------------------------||
-----------------------------15-13-15----15-13-15-13----------13------------||
-----------------------------------------------------15-13-15----15-13-15---||
----------------------------------------------------------------------------||
----------------------------------------------------------------------------||`,
    desc:"Montée corde inf. en tête (mesure U), retour corde sup. en tête (mesure D). Les deux motifs s\'enchaînent — montée et retour ont un feeling d\'accentuation différent.",
    tip:"C\'est l\'association la plus naturelle : la montée part du grave (D), le retour repart de l\'aigu (e). Écoute comment l\'accentuation bascule entre les deux.",
  },

  {
    id:"B8P2aU", cat:"B8", dir:"U", num:'2a', notes:8, difficulty:"Avancé", fingerings:['ind + maj + ann + aur'],
    name:"Bumblebee", bpm:60,
    tabMid:`e|--------------------------------------------------------5--6--7--6--5-------|
B|--------------------------------5--6--7--6--5-----7--8-----------------8----|
G|--------5--6--7--6--5-----7--8-----------------8----------------------------|
D|--7--8-----------------8----------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--------6--7--8--7--6-------------------------------------------------------|
--8--9-----------------9--------6--7--8--7--6-------------------------------|
--------------------------8--9-----------------9--------6--7--8--7--6-------|
--------------------------------------------------8--9-----------------9----|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------------12-13-14-13-12------|
B|--------------------------------12-13-14-13-12----14-15----------------15---|
G|--------12-13-14-13-12----14-15----------------15---------------------------|
D|--14-15----------------15---------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--------13-14-15-14-13------------------------------------------------------|
--15-16----------------16-------13-14-15-14-13------------------------------|
--------------------------15-16----------------16-------13-14-15-14-13------|
--------------------------------------------------15-16----------------16---|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    desc:"",
    tip:"",
  },

  {
    id:"B8P2aD", cat:"B8", dir:"D", num:'2a', notes:8, difficulty:"Avancé", fingerings:['ind + maj + ann + aur'],
    name:"Bumblebee", bpm:60,
    tabMid:`e|--------------------------------------------------7--6--5-----------5--6----|
B|--------------------------7--6--5-----------5--6-----------8--7--8----------|
G|--7--6--5-----------5--6-----------8--7--8----------------------------------|
D|-----------8--7--8----------------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--8--7--6-----------6--7----------------------------------------------------|
-----------9--8--9--------8--7--6-----------6--7----------------------------|
-----------------------------------9--8--9--------8--7--6-----------6--7----|
-----------------------------------------------------------9--8--9----------|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------14-13-12----------12-13---|
B|--------------------------14-13-12----------12-13----------15-14-15---------|
G|--14-13-12----------12-13----------15-14-15---------------------------------|
D|-----------15-14-15---------------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--15-14-13----------13-14---------------------------------------------------|
-----------16-15-16-------15-14-13----------13-14---------------------------|
-----------------------------------16-15-16-------15-14-13----------13-14---|
-----------------------------------------------------------16-15-16---------|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    desc:"",
    tip:"",
  },

  {
    id:"B8P2aM", cat:"B8", dir:"M", num:'2a', notes:8, difficulty:"Avancé", fingerings:['ind + maj + ann + aur'],
    name:"Bumblebee", bpm:60,
    tabMid:`e|--------------------------------------------------------5--6--7--6--5-------|
B|--------------------------------5--6--7--6--5-----7--8-----------------8----|
G|--------5--6--7--6--5-----7--8-----------------8----------------------------|
D|--7--8-----------------8----------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--8--7--6-----------6--7----------------------------------------------------|
-----------9--8--9--------8--7--6-----------6--7----------------------------|
-----------------------------------9--8--9--------8--7--6-----------6--7----|
-----------------------------------------------------------9--8--9----------|
----------------------------------------------------------------------------|
----------------------------------------------------------------------------|`,
    tabHigh:`e|--------------------------------------------------------12-13-14-13-12------|
B|--------------------------------12-13-14-13-12----14-15----------------15---|
G|--------12-13-14-13-12----14-15----------------15---------------------------|
D|--14-15----------------15---------------------------------------------------|
A|----------------------------------------------------------------------------|
E|----------------------------------------------------------------------------|
↩ retour+1
--15-14-13----------13-14---------------------------------------------------||
-----------16-15-16-------15-14-13----------13-14---------------------------||
-----------------------------------16-15-16-------15-14-13----------13-14---||
-----------------------------------------------------------16-15-16---------||
----------------------------------------------------------------------------||
----------------------------------------------------------------------------||`,
    desc:"",
    tip:"",
  },

  // ── A4P?b — TRITON ASCENDANT-DESCENDANT ──────────────────────────────────────

  {
    id:"A4P?bU", cat:"A4", dir:"U", num:'?b', notes:4, difficulty:"Intermédiaire", fingerings:[],
    name:"Triton 7-8-7-5", bpm:70, bpmTarget:140,
    tab:`e|--------------------------7-8-7-5-|
B|------------------7-8-7-5---------|
G|----------7-8-7-5-----------------|
D|--7-8-7-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour décalé +1
--8-9-8-6-------------------------|||
----------8-9-8-6-----------------|||
------------------8-9-8-6--------o|||
--------------------------8-9-8-6o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Motif triton : alternance 7-8 avec retour inversé 7-5. Intervalle de seconde majeure sur deux notes.",
    tip:"L'alternance crée une tension harmonique. Travaille la stabilité des doigts sur ces deux positions.",
  },

  {
    id:"A4P?bD", cat:"A4", dir:"D", num:'?b', notes:4, difficulty:"Intermédiaire", fingerings:[],
    name:"Triton 7-8-7-5", bpm:70, bpmTarget:140,
    tab:`e|--------------------------7-5-8-7-|
B|------------------7-5-8-7---------|
G|----------7-5-8-7-----------------|
D|--7-5-8-7-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour +1 case
--8-6-9-8-------------------------|||
----------8-6-9-8-----------------|||
------------------8-6-9-8--------o|||
--------------------------8-6-9-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Version descendante du triton 7-8 : débute par le sommet (8), oscille puis descend à 5. Inversion du motif ascendant.",
    tip:"L'inversion crée un mouvement miroir. Écoute comment l'accentuation naturelle change.",
  },

  {
    id:"A4P?bM", cat:"A4", dir:"M", num:'?b', notes:4, difficulty:"Intermédiaire", fingerings:[],
    name:"Triton 7-8-7-5", bpm:60, bpmTarget:130,
    tab:`e|--------------------------7-8-7-5-|
B|------------------7-8-7-5---------|
G|----------7-8-7-5-----------------|
D|--7-8-7-5-------------------------|
A|----------------------------------|
E|----------------------------------|
↩ retour inverti +1
--8-6-9-8-------------------------|||
----------8-6-9-8-----------------|||
------------------8-6-9-8--------o|||
--------------------------8-6-9-8o|||
----------------------------------|||
----------------------------------|||`,
    desc:"Montée triton puis retour inversé décalé. Le groupe de 4 crée des phrasés distinctes à chaque niveau.",
    tip:"Combine montée symétrique et retour miroir. Change la sensation de pulsation à chaque repetition.",
  },

  // ── A6P?a — SEXTUPLE STRATOS ──────────────────────────────────────────────

  {
    id:"A6P?aU", cat:"A6", dir:"U", num:'?a', notes:6, difficulty:"Intermédiaire", fingerings:[],
    name:"Sextuple Stratos", bpm:60, bpmTarget:120,
    tab:`e|--------------------------------------5-4-5-7-8-7-|
B|--------------------------5-4-5-7-8-7-------------|
G|--------------5-4-5-7-8-7-------------------------|
D|--5-4-5-7-8-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour +1 case
--6-5-6-8-9-8-------------------------------------|||
--------------6-5-6-8-9-8-------------------------|||
--------------------------6-5-6-8-9-8------------o|||
--------------------------------------6-5-6-8-9-8o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Cellule en V remontant (5-4 → 8-7) : commence au bas, descend jusqu'au creux (4) puis remonte. Motif stratosphérique sur 6 notes.",
    tip:"Le V inversé part du grave et monte vers l'aigu. C'est le mouvement ascendant stratosphérique — sens la trajectoire.",
  },

  {
    id:"A6P?aD", cat:"A6", dir:"D", num:'?a', notes:6, difficulty:"Intermédiaire", fingerings:[],
    name:"Sextuple Stratos", bpm:60, bpmTarget:120,
    tab:`e|--------------------------------------8-7-5-4-5-7-|
B|--------------------------8-7-5-4-5-7-------------|
G|--------------8-7-5-4-5-7-------------------------|
D|--8-7-5-4-5-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour décalé +1
--9-8-6-5-6-8-------------------------------------|||
--------------9-8-6-5-6-8-------------------------|||
--------------------------9-8-6-5-6-8------------o|||
--------------------------------------9-8-6-5-6-8o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Cellule descendante-remontante (8-7 → 4 → 5-7) : descend jusqu'au creux (4) puis remonte. Motif en V descendant stratosphérique.",
    tip:"Les sauts de 2 demi-tons créent une asymétrie naturelle. Écoute le V mélodique descendre puis remonter.",
  },

  {
    id:"A6P?aM", cat:"A6", dir:"M", num:'?a', notes:6, difficulty:"Intermédiaire", fingerings:[],
    name:"Sextuple Stratos", bpm:55, bpmTarget:110,
    tab:`e|--------------------------------------5-4-5-7-8-7-|
B|--------------------------5-4-5-7-8-7-------------|
G|--------------5-4-5-7-8-7-------------------------|
D|--5-4-5-7-8-7-------------------------------------|
A|--------------------------------------------------|
E|--------------------------------------------------|
↩ retour descendant +1
--9-8-6-5-6-8-------------------------------------|||
--------------9-8-6-5-6-8-------------------------|||
--------------------------9-8-6-5-6-8------------o|||
--------------------------------------9-8-6-5-6-8o|||
--------------------------------------------------|||
--------------------------------------------------|||`,
    desc:"Montée remontante (V ascendant) puis retour descendant décalé. Le motif Stratos complet en deux directions.",
    tip:"Sens bien la transition entre la montée et la descente — c'est où le motif stratosphérique révèle sa structure.",
  },

  // ── A8P?b — OCTONAIRE ALTERNÉ ──────────────────────────────────────────────────

  {
    id:"A8P?bU", cat:"A8", dir:"U", num:'?b', notes:8, difficulty:"Intermédiaire", fingerings:[],
    name:"Octo 0-5-0-7", bpm:60, bpmTarget:130,
    tab:`e|--------------------------------------------------0-5-0-7-0-5-0-7-|
B|----------------------------------0-5-0-7-0-5-0-7-----------------|
G|------------------0-5-0-7-0-5-0-7---------------------------------|
D|--0-5-0-7-0-5-0-7-------------------------------------------------|
A|------------------------------------------------------------------|
E|------------------------------------------------------------------|
↩ retour décalé +1
--0-7-0-9-0-7-0-9-------------------------------------------------|||
------------------0-7-0-9-0-7-0-9---------------------------------|||
----------------------------------0-7-0-9-0-7-0-9----------------o|||
--------------------------------------------------0-7-0-9-0-7-0-9o|||
------------------------------------------------------------------|||
------------------------------------------------------------------|||`,
    desc:"Octonaire avec corde à vide : alterne 0 (vide) et notes doigtées (5-0-7) sur 8 notes. Crée un rythme binaire continu.",
    tip:"La corde à vide donne une pulsation claire. Synchronise les doigtés avec la régularité du 0.",
  },

  {
    id:"A8P?bD", cat:"A8", dir:"D", num:'?b', notes:8, difficulty:"Intermédiaire", fingerings:[],
    name:"Octo 0-5-0-7", bpm:60, bpmTarget:130,
    tab:`e|--------------------------------------------------0-7-0-5-0-7-0-5-|
B|----------------------------------0-7-0-5-0-7-0-5-----------------|
G|------------------0-7-0-5-0-7-0-5---------------------------------|
D|--0-7-0-5-0-7-0-5-------------------------------------------------|
A|------------------------------------------------------------------|
E|------------------------------------------------------------------|
↩ retour +1 case
--0-9-0-7-0-9-0-7-------------------------------------------------|||
------------------0-9-0-7-0-9-0-7---------------------------------|||
----------------------------------0-9-0-7-0-9-0-7----------------o|||
--------------------------------------------------0-9-0-7-0-9-0-7o|||
------------------------------------------------------------------|||
------------------------------------------------------------------|||`,
    desc:"Version descendante de l'octonaire : 0-7-0-5-0-7-0-5. Inverse les notes doigtées mais garde la structure binaire.",
    tip:"L'alternance 0-doigt reste symétrique. Travaille l'indépendance entre doigt et corde à vide.",
  },

  {
    id:"A8P?bM", cat:"A8", dir:"M", num:'?b', notes:8, difficulty:"Intermédiaire", fingerings:[],
    name:"Octo 0-5-0-7", bpm:55, bpmTarget:120,
    tab:`e|--------------------------------------------------0-5-0-7-0-5-0-7-|
B|----------------------------------0-5-0-7-0-5-0-7-----------------|
G|------------------0-5-0-7-0-5-0-7---------------------------------|
D|--0-5-0-7-0-5-0-7-------------------------------------------------|
A|------------------------------------------------------------------|
E|------------------------------------------------------------------|
↩ retour inverti +1
--0-9-0-7-0-9-0-7-------------------------------------------------|||
------------------0-9-0-7-0-9-0-7---------------------------------|||
----------------------------------0-9-0-7-0-9-0-7----------------o|||
--------------------------------------------------0-9-0-7-0-9-0-7o|||
------------------------------------------------------------------|||
------------------------------------------------------------------|||`,
    desc:"Montée octonaire puis retour non-inversé. La structure binaire reste, mais le contour mélodique change.",
    tip:"L'octonaire est plus long — assure-toi de la stabilité avant d'accélérer. La corde à vide aide à trouver la pulsation.",
  },

  // ── GAMME PENTATONIC SPÉCIALE (lecture directe XML) ──

  {
    id:"pentaC1", cat:"gamme", num:"1", notes:12, difficulty:"Débutant", special:true,
    name:"Pentatonic #1", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------5--8----|
B |--------------------------5--8----------|
G |--------------------5--7----------------|
D |--------------5--7----------------------|
A |--------5--7----------------------------|
E |--5--8----------------------------------|
↩
--8--5----------------------------------||
--------8--5----------------------------||
--------------7--5----------------------||
--------------------7--5----------------||
--------------------------7--5----------||
--------------------------------8--5----||`,
    desc:"Gamme pentatonique Am/C forma 1 — Montée ascendante (E→e) puis descente en miroir (e→E). Lecture directe du fichier ASCII.",
    tip:"Laisser la gamme en boucle pour travailler l'automatisme et la fluidité entre les cordes.",
  },

  {
    id:"pentaBb2", cat:"gamme", num:"2", notes:12, difficulty:"Débutant", special:true,
    name:"Pentatonic #2", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------6--8----|
B |--------------------------6--8----------|
G |--------------------5--7----------------|
D |--------------5--8----------------------|
A |--------5--8----------------------------|
E |--6--8----------------------------------|
↩
--8--6----------------------------------||
--------8--6----------------------------||
--------------7--5----------------------||
--------------------8--5----------------||
--------------------------8--5----------||
--------------------------------8--6----||`,
    desc:"Gamme pentatonique Gm/Bb forme 2 — Montée ascendante puis descente en miroir. Position décalée pour diversifier le jeu.",
    tip:"Laisser la gamme en boucle pour travailler l'automatisme et la fluidité entre les cordes.",
  },

  {
    id:"pentaC3", cat:"gamme", num:"3", notes:12, difficulty:"Débutant", special:true,
    name:"Pentatonic #3", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------5--7----|
B |--------------------------5--8----------|
G |--------------------4--7----------------|
D |--------------5--7----------------------|
A |--------5--7----------------------------|
E |--5--7----------------------------------|
↩

--7--5----------------------------------||
--------8--5----------------------------||
--------------7--4----------------------||
--------------------7--5----------------||
--------------------------7--5----------||
--------------------------------7--5----||`,
    desc:"Gamme pentatonique forme 3 — Montée ascendante puis descente en miroir.",
    tip:"Laisser la gamme en boucle pour travailler l'automatisme et la fluidité entre les cordes.",
  },

  {
    id:"pentaC4", cat:"gamme", num:"4", notes:12, difficulty:"Débutant", special:true,
    name:"Pentatonic #4", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------5--8----|
B |--------------------------6--8----------|
G |--------------------5--7----------------|
D |--------------5--7----------------------|
A |--------5--8----------------------------|
E |--5--8----------------------------------|
↩

--8--5----------------------------------||
--------8--6----------------------------||
--------------7--5----------------------||
--------------------7--5----------------||
--------------------------8--5----------||
--------------------------------8--5----||`,
    desc:"Gamme pentatonique forme 4 — Montée ascendante puis descente en miroir.",
    tip:"Laisser la gamme en boucle pour travailler l'automatisme et la fluidité entre les cordes.",
  },

  {
    id:"pentaC5", cat:"gamme", num:"5", notes:12, difficulty:"Débutant", special:true,
    name:"Pentatonic #5", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------5--7----|
B |--------------------------5--7----------|
G |--------------------4--7----------------|
D |--------------4--7----------------------|
A |--------5--7----------------------------|
E |--5--7----------------------------------|
↩

--7--5----------------------------------||
--------7--5----------------------------||
--------------7--4----------------------||
--------------------7--4----------------||
--------------------------7--5----------||
--------------------------------7--5----||`,
    desc:"Gamme pentatonique forme 5 — Montée ascendante puis descente en miroir.",
    tip:"Laisser la gamme en boucle pour travailler l'automatisme et la fluidité entre les cordes.",
  },

  {
    id:"aIonien6", cat:"gamme", num:"6", notes:12, difficulty:"Intermédiaire", special:true,
    name:"A Ionien", bpm:120, bpmTarget:120,
    tab:`e |--------------------------------------------5--7----|
B |--------------------------------------7--9----------|
G |-----------------------------6--7--9----------------|
D |--------------------6--7--9-------------------------|
A |-----------5--7--9----------------------------------|
E |--5--7--9-------------------------------------------|
↩

--9--7--5-------------------------------------------|----||
-----------9--7--5----------------------------------|----||
--------------------7--6----------------------------|----||
--------------------------9--7--6-------------------|----||
-----------------------------------9--7--5----------|----||
--------------------------------------------9--7----|----||`,
    desc:"Gamme majeure A Ionien — Montée ascendante puis descente complète en miroir.",
    tip:"Travailler la montée et la descente séparément avant de les enchaîner.",
  },

  {
    id:"pentaTrans1", cat:"gamme", num:"7", notes:12, difficulty:"Intermédiaire", special:true,
    hasDirectionTabs: true,
    name:"Pentatonic Transition 1↔2", bpm:90, bpmTarget:120,
    directions: {
      "1→2": `e |--------------------------------5--8----|
B |--------------------------5--8----------|
G |--------------------5--7----------------|
D |--------------5--7----------------------|
A |--------5--7----------------------------|
E |--5--8----------------------------------|
↩

--10-8----------------------------------|
--------10-8----------------------------|
--------------9--7----------------------|
--------------------10-7----------------|
--------------------------10-7----------|
--------------------------------10-8----|`,
      "2→1": `e |--------------------------------8--10---|
B |--------------------------8--10---------|
G |--------------------7--9----------------|
D |--------------7--10---------------------|
A |--------7--10---------------------------|
E |--8--10---------------------------------|
↩

--8--5----------------------------------|
--------8--5----------------------------|
--------------7--5----------------------|
--------------------7--5----------------|
--------------------------7--5----------|
--------------------------------8--5----|`
    },
    desc:"Transition entre les deux formes pentatoniques : montée shape #1 avec descente shape #2, ou l'inverse.",
    tip:"Alterne les deux directions pour maîtriser le passage fluide entre les deux positions pentatoniques.",
  },

  {
    id:"pentaTrans2", cat:"gamme", num:"8", notes:12, difficulty:"Intermédiaire", special:true,
    hasDirectionTabs: true,
    name:"Pentatonic Transition 2↔3", bpm:90, bpmTarget:120,
    directions: {
      "2→3": `e |--------------------------------5--7----|
B |--------------------------5--7----------|
G |--------------------4--6----------------|
D |--------------4--7----------------------|
A |--------4--7----------------------------|
E |--5--7----------------------------------|
↩

--9--7----------------------------------|
--------10-7----------------------------|
--------------9--6----------------------|
--------------------9--7----------------|
--------------------------9--7----------|
--------------------------------9--7----|`,
      "3→2": `e |--------------------------------7--9----|
B |--------------------------7--10---------|
G |--------------------6--9----------------|
D |--------------7--9----------------------|
A |--------7--9----------------------------|
E |--7--9----------------------------------|
↩

--7--5----------------------------------|
--------7--5----------------------------|
--------------6--4----------------------|
--------------------7--4----------------|
--------------------------7--4----------|
--------------------------------7--5----|`
    },
    desc:"Transition entre les deux formes pentatoniques : montée shape #2 avec descente shape #3, ou l'inverse.",
    tip:"Alterne les deux directions pour maîtriser le passage fluide entre les deux positions pentatoniques.",
  },

  {
    id:"pentaTrans3", cat:"gamme", num:"9", notes:12, difficulty:"Intermédiaire", special:true,
    hasDirectionTabs: true,
    name:"Pentatonic Transition 3↔4", bpm:90, bpmTarget:120,
    directions: {
      "3→4": `e |--------------------------------5--7----|
B |--------------------------5--8----------|
G |--------------------4--7----------------|
D |--------------5--7----------------------|
A |--------5--7----------------------------|
E |--5--7----------------------------------|
↩

--10-7----------------------------------|
--------10-8----------------------------|
--------------9--7----------------------|
--------------------9--7----------------|
--------------------------10-7----------|
--------------------------------10-7----|`,
      "4→3": `e |--------------------------------7--10---|
B |--------------------------8--10---------|
G |--------------------7--9----------------|
D |--------------7--9----------------------|
A |--------7--10---------------------------|
E |--7--10---------------------------------|
↩

--7--5----------------------------------|
--------8--5----------------------------|
--------------7--4----------------------|
--------------------7--5----------------|
--------------------------7--5----------|
--------------------------------7--5----|`
    },
    desc:"Transition entre les deux formes pentatoniques : montée shape #3 avec descente shape #4, ou l'inverse.",
    tip:"Alterne les deux directions pour maîtriser le passage fluide entre les deux positions pentatoniques.",
  },

  {
    id:"pentaTrans4", cat:"gamme", num:"10", notes:12, difficulty:"Intermédiaire", special:true,
    hasDirectionTabs: true,
    name:"Pentatonic Transition 4↔5", bpm:90, bpmTarget:120,
    directions: {
      "4→5": `e |--------------------------------5--8----|
B |--------------------------6--8----------|
G |--------------------5--7----------------|
D |--------------5--7----------------------|
A |--------5--8----------------------------|
E |--5--8----------------------------------|
↩

--10-8----------------------------------|
--------10-8----------------------------|
--------------10-7----------------------|
--------------------10-7----------------|
--------------------------10-8----------|
--------------------------------10-8----|`,
      "5→4": `e |--------------------------------8--10---|
B |--------------------------8--10---------|
G |--------------------7--10---------------|
D |--------------7--10---------------------|
A |--------8--10---------------------------|
E |--8--10---------------------------------|
↩

--8--5----------------------------------|
--------8--6----------------------------|
--------------7--5----------------------|
--------------------7--5----------------|
--------------------------8--5----------|
--------------------------------8--5----|`
    },
    desc:"Transition entre les deux formes pentatoniques : montée shape #4 avec descente shape #5, ou l'inverse.",
    tip:"Alterne les deux directions pour maîtriser le passage fluide entre les deux positions pentatoniques.",
  },

  {
    id:"pentaTrans5", cat:"gamme", num:"11", notes:12, difficulty:"Intermédiaire", special:true,
    hasDirectionTabs: true,
    name:"Pentatonic Transition 5↔1", bpm:90, bpmTarget:120,
    directions: {
      "5→1": `e |--------------------------------5--7----|
B |--------------------------5--7----------|
G |--------------------4--7----------------|
D |--------------4--7----------------------|
A |--------5--7----------------------------|
E |--5--7----------------------------------|
↩

--10-7----------------------------------|
--------10-7----------------------------|
--------------9--7----------------------|
--------------------9--7----------------|
--------------------------9--7----------|
--------------------------------10-7----|`,
      "1→5": `e |--------------------------------7--10---|
B |--------------------------7--10---------|
G |--------------------7--9----------------|
D |--------------7--9----------------------|
A |--------7--9----------------------------|
E |--7--10---------------------------------|
↩

--7--5----------------------------------|
--------7--5----------------------------|
--------------7--4----------------------|
--------------------7--4----------------|
--------------------------7--5----------|
--------------------------------7--5----|`
    },
    desc:"Transition entre les deux formes pentatoniques : montée shape #5 avec descente shape #1, ou l'inverse.",
    tip:"Alterne les deux directions pour maîtriser le passage fluide entre les deux positions pentatoniques.",
  }

];


const MODES = ["U","D","M"];
const MODE_LABELS = {U:"Ascendant",D:"Descendant",M:"Mix"};
const INTERPS = ["Down","Up","Leg"];
const INTERP_LABELS = {Up:"Pick ↑",Down:"Pick ↓",Leg:"Legato"};
const TEMPOS = [
  { key:'lent',  label:'Tempo', range:'20–80',   rangeMin:20, rangeMax:80,  color:'#4a9e6b',
    icon:`<svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4"  cy="5" r="2.8" fill="#4a9e6b"/>
      <circle cx="11" cy="5" r="2.8" fill="#4a9e6b"/>
      <circle cx="18" cy="5" r="2.8" fill="#4a9e6b"/>
    </svg>`},
  { key:'cool',  label:'Tempo', range:'80–110',  rangeMin:80, rangeMax:110, color:'#c07830',
    icon:`<svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6 Q3.5 1.5 6 6 Q8.5 10.5 11 6 Q13.5 1.5 16 6 Q18.5 10.5 21 7" stroke="#c07830" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`},
  { key:'chaud', label:'Tempo', range:'110–200', rangeMin:110, rangeMax:200, color:'#a03030',
    icon:`<svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 10 L4 2 L7 10 L10 2 L13 10 L16 2 L19 10 L21 6" stroke="#a03030" stroke-width="2" stroke-linejoin="miter" stroke-linecap="square" fill="none"/>
    </svg>`},
];
const FINGERINGS = [1,2,3,4];
