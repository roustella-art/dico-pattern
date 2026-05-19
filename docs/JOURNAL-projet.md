# Le Dico Pattern — Journal de construction
_Avril 2026 · 10 sessions de travail_

---

## L'idée de départ

Tout commence avec une conviction pédagogique simple : les patterns de guitare s'apprennent comme des gammes de sportif. Pas de théorie, pas de notation, juste le geste qui se grave dans les doigts à force de répétition consciente. Il fallait un outil à la hauteur de cette philosophie — épuré, efficace, et pensé pour les élèves de Ced.

Le Dico Pattern est né de là.

---

## Session 1 — Les fondations

On pose les bases de l'architecture. L'app est une **PWA single-file HTML** — pas de framework, pas de dépendances, juste du HTML/CSS/JS pur dans un seul fichier. Ce choix est volontaire : robustesse maximale, déploiement instantané sur GitHub Pages, fonctionne hors-ligne.

Les premiers patterns arrivent : la catégorie **A4** (une corde, 4 doigts). On définit le système de nommage — catégorie + numéro + direction (U/D/M pour Up, Down, Mixte). La grille de progression est créée : **36 cases par pattern** (tempo × interprétation × doigté), sauvegardées en localStorage par appareil.

---

## Session 2 — L'audio et le chronomètre

L'app prend vie sonore. La **preview audio** est entièrement synthétisée via Web Audio API — parsing de la tablature ASCII, lecture en boucle infinie, décompte 4 temps avant le départ. Trois vitesses préréglées (40 / 80 / 120 BPM) plus un champ libre.

Le **chronomètre** fait son entrée dans le header : cadran analogique SVG, anneau 5 minutes, double bip à chaque tour, rouge 5 secondes au bip. L'idée : un minutier de séance, pas un chrono de performance. 5 à 10 minutes par jour, c'est suffisant.

---

## Session 3 — Les doigtés et le schéma de main

Gros chantier : intégrer les **doigtés réels** sur les 63 patterns. Quatre doigtés par pattern (D1 principal + D2/D3/D4 alternatifs), affichés en toutes lettres (Index / Majeur / Annulaire / Auriculaire).

Un **schéma de main SVG** apparaît à côté du doigté D1, avec les doigts utilisés mis en rouge. Les D2–D4 sont repliés dans un accordéon "Aller plus loin" — suggérés sans être imposés.

Leçon technique retenue : ne jamais écrire de scripts Python pour manipuler le JS — travailler directement dans le code.

---

## Session 4 — L'audio peaufiné, le Parcours

Corrections profondes sur l'audio : les nœuds Web Audio s'accumulaient silencieusement en mémoire à chaque boucle. Fix : nettoyage systématique dans `onended`. La dérive de tempo est aussi corrigée.

L'onglet **Parcours** est créé — une progression linéaire guidée par étapes, avec une grille de progression inline par pattern. L'Étape 1 est définie : A4P3, A6P1, A6P2, A4P1, A2P2 dans cet ordre, du plus accessible au plus complexe.

---

## Session 5 — Le design zen

Refonte visuelle complète. On jette les ombres, les dégradés, les couleurs de fond par onglet. L'app adopte un **design zen et épuré** : fond neutre uniforme, cartes blanches, icônes SVG flat dans la navigation, contrôles segmentés. Le principe : l'interface ne doit pas distraire du geste.

Le métronome global est intégré dans le header — il remplace les petits widgets par pattern. Feedback sonore et vibration au cochage des cases. L'app commence à ressembler à quelque chose qu'on a envie d'utiliser.

---

## Session 6 — La vision long terme

Session de recul et de conception. On formalise la **philosophie** : le Dico Pattern est le premier jalon d'un écosystème plus large — Rythme, Accords, Gammes, Harmonie, chacun autonome mais complémentaire. L'harmonie restera séparée du geste pur, toujours.

Le **modèle économique** prend forme : PWA gratuite + méthode imprimée (Amazon KDP). Le podcast À la Loop comme canal d'acquisition naturel. L'app comme outil pro pour les profs et les écoles de musique.

On définit aussi les limites architecturales : ~360 patterns théoriques max, beaucoup moins en pratique — la curation est le vrai garde-fou. Au-delà d'un certain volume, les données patterns iront dans un fichier JSON séparé.

---

## Session 7 — Le bouton Clic et les zones tempo

Ajout du **bouton Clic** — un métronome uniforme qui tourne pendant la preview, dans une boucle indépendante. Leçon importante : chaque feature audio doit avoir son propre timer pour éviter les race conditions Web Audio.

Les zones tempo sont nommées : Lent (40–60) / Cool (70–100) / Chaud (110–130+) / Zen (30–60). Le BPM et l'interprétation se réinitialisent à chaque ouverture de fiche — toujours repartir propre.

---

## Session 8 — La béta prend forme

Création de **index-beta.html** — une app séparée pour le test élèves. localStorage indépendant, Service Worker dédié. Contenu filtré sur l'Étape 1 uniquement (Débutant), navigation simplifiée.

L'onglet Questionnaire apparaît — 9 questions, export WhatsApp. Un onboarding 3 pages avec navigation ←→. Les favoris sont intégrés sur les tuiles de progression.

Le titre devient **"Le Dico Pattern · par Ced"**. Plus de "CedLoop" — juste Ced.

---

## Session 9 — La béta finalisée et envoyée

Session de finition et de lancement. Tout est revu et peaufiné avant l'envoi aux élèves.

**Sur l'app principale :**
L'accordéon **"🌶️ Envie de pimenter le pattern ?"** est ajouté — doigtés alternatifs repliés, en orange, pour les élèves qui veulent aller plus loin quand le doigté principal est ancré.

**Sur la béta :**
- Palette de couleurs **"tasty"** — bleu, vert, rouge, orange vifs sur fond crème. L'app donne envie de cliquer.
- **Code CACTUS** pour déverrouiller le questionnaire après 2 semaines — évite les réponses à chaud.
- Onboarding **4 pages** entièrement refondu : textes personnalisés ("Félicitations, tu as été personnellement sélectionné(e) par Ced, ton prof de guitare"), éléments réels de l'app (chrono SVG à 04:55, barres de progression, bouton Écouter inline), "C'est parti !" accessible sur chaque page.
- Header restructuré : chrono à droite, boutons de contrôle à sa gauche.
- **Questionnaire complet refondu** — 15 questions en 5 sections (Installation / Utilisation / Contenu / Retours / La suite + Section VIP éloges drôles pour le prof).
- **Export par modale** : fini le lien WhatsApp qui ne marchait pas sur Mac. Une fenêtre s'ouvre avec le résumé formaté, un bouton Copier, et les coordonnées de Ced (06 33 10 22 34 / cedrik.musik@gmail.com).

**Le lancement :**
Déployée sur GitHub Pages. SMS d'envoi rédigé — ton canapé vs ta guitare, dimanche soir. Envoyé.

---

## Session 10 — L'interface devient un instrument

Session consacrée à l'ergonomie et à la cohérence visuelle. Le retour terrain est arrivé : un élève confondait le métronome du header avec la preview. Le diagnostic est posé — l'interface doit parler d'elle-même.

**Refonte du header :**
Le header devient un vrai centre de contrôle, épuré et lisible. Le chrono SVG est sorti — trop encombrant, il rejoint l'onglet Progression. À la place : un bandeau compact avec un **bouton ▶/■ contextuel** (métronome solo par défaut, preview dès qu'un pattern est sélectionné), un **affichage BPM en glassmorphism vert** (le même style qu'avant mais assumé), et les boutons Décompte / Clic directement accessibles. Une petite **icône SVG métronome pendule** remplace l'emoji 🥁 — plus flat, plus cohérent. Le **point de bip** est bien là, fidèle au poste.

**Le chrono dans Progression :**
Le chrono numérique `MM:SS` prend sa place en haut de l'onglet Progression — sobre, monospace, toujours visible dès que l'utilisateur consulte sa progression. Il vire au rouge au bip des 5 minutes, puis reprend sa couleur. Le chrono tourne en fond peu importe l'onglet actif.

**Popups de session :**
À 5 minutes, un message d'encouragement apparaît (aléatoire parmi 4). À 10 minutes — et à chaque bip suivant — un rappel philosophique : "Le Dico Pattern se consomme avec modération. 10 min régulières > 1h par mois." L'app ne se contente plus d'être un outil, elle accompagne.

**Onglet Progression en accordéon :**
Les trois sections sont maintenant repliables. **"Progression globale"** reste ouvert par défaut et affiche le pourcentage dans son titre. **"Mes séances"** affiche en titre fermé la série actuelle, le record et le total de jours. **"Détail par pattern"** est replié. L'essentiel est visible d'un coup d'œil, le reste se déplie quand on veut.

**Clic plus fort :**
Le volume du clic métronome pendant la preview est presque triplé (0.10 → 0.28). Il s'entend vraiment maintenant.

**Outillage :**
Premier test du script `deploy.sh` — commit et push vers GitHub Pages en une commande depuis le terminal. Ça marche.

---

## Où en est l'app aujourd'hui

**App principale** — https://roustella-art.github.io/dico-pattern/
63 patterns, catégories A2/A4/A6/B6, Étape 1 définie, audio complet (doux/piano/guitare), preview avec décompte et clic, réglages (groupe de cordes, son, case de départ), progression par élève, doigtés + schémas de main, accordéon alternatif 🌶️, header épuré, chrono dans Progression, popups de session.

**Béta élèves** — https://roustella-art.github.io/dico-pattern/index-beta.html
Étape 1 uniquement, onboarding personnalisé, questionnaire verrouillé 2 semaines (code CACTUS), export propre par copier-coller. Envoyée le 26 avril 2026.

**Retours attendus** autour du 10 mai 2026. C'est là que le projet entre dans sa deuxième phase.

---

## Ce qui vient

- Analyser les retours élèves et ajuster
- Ajouter de nouveaux patterns à l'app principale
- Définir l'Étape 2 du Parcours
- Construire les catégories B (2 cordes) et C (3 cordes)
- Trancher sur le modèle économique si les retours sont bons
- Et un jour : le livre 📖

---

_"Mouvement d'abord, musique après."_
