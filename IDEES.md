# Dico Pattern — Idées & Chantiers
_Mis à jour : 19 avril 2026_

## App HTML — Fait ✅
- [x] Déployer sur GitHub Pages
- [x] Métronome global dans le header (remplace les widgets par pattern)
- [x] Chronomètre avec double bip toutes les 5 minutes
- [x] Onglet Guide (philosophie, nomenclature, méthode de travail)
- [x] Suppression de l'onglet Programme (pas utile pour l'instant)
- [x] Grille de progression simplifiée : 36 cases par pattern (1 direction × 3 interps × 4 doigtés × 3 tempos)
- [x] Progression sauvegardée en localStorage — persistante par appareil, chaque élève a sa propre progression indépendante

## App HTML — À faire
- [ ] Tester l'app sur iPad / iPhone — phase test élèves
- [ ] Traiter la question des doigtés (chantier à définir)
- [ ] Ajouter les catégories B (2 cordes) et C (3 cordes)
- [ ] Ajouter d'autres patterns A4 si besoin après retours des élèves

## Méthode / Livre
- [ ] Rédiger l'introduction philosophique de la méthode (texte rédigé ensemble, à formaliser)
- [ ] Créer le PDF imprimable version test (à partager avec les élèves)
- [ ] Définir la structure complète : niveaux débutant / intermédiaire / avancé
- [ ] Phase test avec les élèves → recueillir les retours
- [ ] Explorer le format print-on-demand (Amazon KDP ou Lulu.com)

## Podcast À la Loop !
- [ ] Intégrer des patterns comme exercices complémentaires aux épisodes
- [ ] Tourner quelques vidéos démo des patterns
- [ ] Épisode dédié à la philosophie de la méthode ?

## Catégories futures
- [ ] Catégorie "Style" : patterns signature par guitariste
  - [x] Yngwie Malmsteen (mineure harmonique) — A4P6 ✅
  - [ ] Jimi Hendrix (pentatonique / chromatique blues)
  - [ ] Guthrie Govan (intervalles larges)
  - [ ] Zakk Wylde (pentatonique minor power)
- [ ] Patterns sur 2 cordes (catégorie B) — arpèges, gammes 3 notes/corde
- [ ] Patterns sur 3 cordes (catégorie C) — runs type Yngwie multi-cordes

## Notes techniques
- Progression : localStorage, par navigateur/appareil. Pas de sync multi-appareils.
- Chaque élève sur son propre téléphone = progression 100% indépendante.
- Si besoin de sync à terme → nécessiterait un backend (pas prioritaire).
