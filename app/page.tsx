"use client";

import { useState } from "react";

// ─── DONNÉES ────────────────────────────────────────────────────────────────

const SEMAINES = [
  // ── PHASE 1 ──────────────────────────────────────────────────────────────
  {
    num: 1, phase: 1,
    lundi: {
      type: "halte", label: "Snatch technique + Force",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "5' vélo léger, puis mobilité spécifique : 10 dislocations épaules avec bâton, 10 overhead squats à vide, 10 hip circles/jambe, 5 Jefferson curls légers. 3 séries légères de snatch à vide pour réveiller le pattern." },
        { titre: "Snatch – Technique", duree: "30 min", contenu: "Snatch tirage (pull) : 3×5 @20kg – focus triple extension et trajet de barre.\nSnatch à la prise : 5×3 @27.5kg (60%) – tempo lent, réception consciente, reset entre chaque rep. Priorité : position de réception, mobilité overhead, gainage.\nHang snatch position haute : 3×3 @23kg – travail du catch." },
        { titre: "Back Squat – Force", duree: "25 min", contenu: "Montée progressive : 1×5 @40kg, 1×4 @50kg, 1×3 @55kg.\nTravail : 5×4 @59kg (65%) – tempo 3-1-1, profondeur maximale, genoux dans l'axe des orteils. Repos 2 min entre séries." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×10 Good mornings @barre vide – gainage postérieur.\n3×45s planche – gainage antérieur.\n2×10 Bird dog /côté." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements statiques : psoas, ischio-jambiers, pecs, trapèzes. Focus mobilité thoracique." },
      ]
    },
    mardi: {
      type: "course", label: "Run/Walk 30 min",
      duree: "30 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche rapide 5 min. Quelques montées de genoux, talons-fesses, fentes dynamiques." },
        { titre: "Séance principale", duree: "30 min", contenu: "6 × [3' course EF + 2' marche active]\nAllure course : 145–148 bpm. Si la FC dépasse 150, ralentir immédiatement. La marche n'est pas un échec, c'est la méthode !\nDistance estimée : ~3.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche 5 min. Étirements mollets, quadriceps, fléchisseurs de hanche." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk + Front Squat",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "5' vélo, puis : 10 face pulls élastique, 10 Cuban press barre vide, 10 sotts press barre vide. 3 séries clean tirage à vide pour préparer la chaîne postérieure." },
        { titre: "Clean & Jerk – Technique", duree: "30 min", contenu: "Clean tirage : 3×5 @30kg – position de départ, trajet collé, explosion des hanches.\nClean @genoux : 3×3 @30kg – travail position intermédiaire.\nClean & Jerk : 5×3 @33kg (60%) – reset complet entre chaque rep, focus position de jerk (split ou squat selon votre style). Repos 2-2:30 min." },
        { titre: "Front Squat – Force", duree: "25 min", contenu: "Montée : 1×5 @35kg, 1×4 @43kg.\nTravail : 5×4 @48kg (65%) – coudes hauts impératif, position de rack propre. Tempo 3-1-1. Repos 2 min." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×8 fentes bulgares /jambe @haltères 8–10 kg.\n3×20 crunchs.\n2×30s hollow hold." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Mobilité hanches (pigeon, lézard), étirements mollets et chevilles, décompression thoracique." },
      ]
    },
    jeudi: {
      type: "course", label: "Run/Walk 30 min",
      duree: "30 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche rapide 5 min + routines de jambes dynamiques." },
        { titre: "Séance principale", duree: "30 min", contenu: "6 × [3' course EF + 2' marche active]\nMême protocole que mardi. Observer si la FC est plus basse à même allure → signe d'adaptation.\nDistance estimée : ~3.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes olympiques + Hinge",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité complète : épaules, hanches, chevilles. Snatch-grip deadlift barre vide ×10. Overhead squat ×10 barre vide. 2 rounds." },
        { titre: "Complexe Snatch", duree: "25 min", contenu: "Complexe : 1 Hang Snatch haut + 1 Snatch complet\n4×(1+1) @25kg – rester lourd sans sacrifier la technique.\nL'enchaînement force à rester dans la position de tirage entre les deux mouvements.\nRepos 2:30 min." },
        { titre: "Complexe Clean", duree: "20 min", contenu: "Complexe : 1 Hang Clean + 1 Clean + 1 Jerk\n4×(1+1+1) @30kg – chaîne complète. Observer la fatigue sur le jerk.\nRepos 2:30 min." },
        { titre: "Romanian Deadlift + Accessoire", duree: "15 min", contenu: "RDL : 4×8 @55-60kg – charnière hanches, barre collée aux jambes, stop à mi-tibia.\n3×10 Glute bridge unilatéral.\n2×10 Good mornings." },
        { titre: "Mobilité thoracique", duree: "15 min", contenu: "Foam roller thoracique 3 min. Book opening 10/côté. Rotations thoraciques assis 10/côté. Child's pose overhead 2×45s." },
      ]
    },
  },

  // S2 ────────────────────────────────────────────────────────────────────────
  {
    num: 2, phase: 1,
    lundi: {
      type: "halte", label: "Snatch technique + Force",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Même protocole S1. Ajouter 2×5 overhead squat @barre pour approfondir mobilité." },
        { titre: "Snatch – Technique", duree: "30 min", contenu: "Snatch pull : 3×4 @25kg.\nSnatch : 5×3 @27.5kg (60%) – idem S1 mais focus sur la vitesse de tirage sous la barre. Vidéo recommandée pour analyser la réception.\nPower Snatch : 2×3 @23kg – travail catch haut." },
        { titre: "Back Squat", duree: "25 min", contenu: "Montée : 1×5 @40kg, 1×3 @52kg.\nTravail : 5×4 @59kg (65%) – chercher plus de profondeur qu'en S1. Tempo 3-1-1." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×10 Good mornings. 3×45s planche. 3×10 face pull élastique." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements épaules, thoracique, hanches." },
      ]
    },
    mardi: {
      type: "course", label: "Run/Walk 35 min",
      duree: "35 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active 5 min." },
        { titre: "Séance principale", duree: "35 min", contenu: "5 × [4' course EF + 2' marche active]\nProgression : les blocs de course s'allongent d'une minute. Maintenir 145–150 bpm.\nDistance estimée : ~4 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk + Front Squat",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité épaules + clean pull barre vide ×10 ×3." },
        { titre: "Clean & Jerk", duree: "30 min", contenu: "Clean pull : 3×5 @35kg.\nClean & Jerk : 5×3 @33kg (60%) – cette semaine focus sur le jerk : position des pieds, dip-drive vertical, réception stable.\nPush press : 3×5 @30kg – renforcer le jerk." },
        { titre: "Front Squat", duree: "25 min", contenu: "5×4 @48kg (65%) – même intensité S1 mais chercher la fluidité et la position parfaite." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×8 fentes bulgares. 3×15 crunchs obliques. 2×30s hollow hold." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Mobilité hanches + chevilles." },
      ]
    },
    jeudi: {
      type: "course", label: "Run/Walk 35 min",
      duree: "35 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche + dynamiques." },
        { titre: "Séance principale", duree: "35 min", contenu: "5 × [4' course EF + 2' marche active] + 5' marche retour\nMême protocole mardi. Comparer les sensations : les jambes récupèrent-elles mieux ?\nDistance estimée : ~4 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes + Accessoire",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité complète. Power clean barre vide ×8 ×3." },
        { titre: "Complexe Snatch", duree: "25 min", contenu: "1 Snatch tirage + 1 Snatch : 4×(1+1) @25-27.5kg.\nFocus : enchaînement fluide, pas de pause en position debout entre les deux mouvements." },
        { titre: "Complexe Clean", duree: "20 min", contenu: "1 Clean + 1 Front Squat + 1 Jerk : 4×(1+1+1) @30-32kg.\nCe complexe simule le mouvement complet en ajoutant un front squat de contrôle." },
        { titre: "Renfo postérieur", duree: "15 min", contenu: "RDL : 4×8 @58-62kg.\n3×12 Hip thrust barre.\n2×10 Nordic curl assisté ou ischio curl machine." },
        { titre: "Mobilité", duree: "15 min", contenu: "Foam roller dos + IT band. Étirements psoas, fléchisseurs de hanche." },
      ]
    },
  },

  // S3 ────────────────────────────────────────────────────────────────────────
  {
    num: 3, phase: 1,
    lundi: {
      type: "halte", label: "Snatch – Montée d'intensité",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + snatch à vide ×10 ×3. Ajouter quelques snatch balance pour ouvrir les épaules." },
        { titre: "Snatch", duree: "30 min", contenu: "Montée progressive : 3×3 @27.5kg, puis…\nTravail : 5×3 @30kg (65%) – l'intensité augmente, maintenir la qualité technique. Si une rep est ratée, rester à la même charge.\nSnatch équilibre (Snatch balance) : 3×3 @23kg – travail position overhead." },
        { titre: "Back Squat", duree: "25 min", contenu: "Montée : 1×5 @45kg, 1×3 @55kg.\nTravail : 5×4 @63.5kg (70%) – première hausse d'intensité. Tempo 2-1-1 pour rester explosif." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×10 Good mornings. 3×45s planche. 2×10 pull apart élastique." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements + foam roller." },
      ]
    },
    mardi: {
      type: "course", label: "Run/Walk 40 min",
      duree: "40 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active + éducatifs." },
        { titre: "Séance principale", duree: "40 min", contenu: "4 × [6' course EF + 2' marche active]\nLes blocs de course s'allongent significativement. 6 minutes de course continue, c'est un cap mental important.\nFocus : allure très progressive pour ne pas partir trop vite. Distance estimée : ~5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements mollets et hanches." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk 65% + FS",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull ×8 ×3 + push press barre vide ×10 ×2." },
        { titre: "Clean & Jerk", duree: "30 min", contenu: "Clean pull : 3×5 @40kg.\nClean & Jerk : 5×3 @36kg (65%) – intensité en hausse. Focus cette semaine : le catch propre du clean (coudes remontent vite, barre sur les clavicules).\nJerk derrière la nuque : 3×5 @30kg – proprioception overhead." },
        { titre: "Front Squat", duree: "25 min", contenu: "5×4 @52kg (70%) – coudes hauts, position de rack active tout au long du mouvement." },
        { titre: "Accessoire", duree: "10 min", contenu: "Fentes bulgares 3×8. Crunchs 3×20. Side plank 2×30s/côté." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Mobilité chevilles (mur) + étirements chaîne postérieure." },
      ]
    },
    jeudi: {
      type: "course", label: "Run/Walk 40 min",
      duree: "40 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche + éducatifs." },
        { titre: "Séance principale", duree: "40 min", contenu: "3 × [8' course EF + 2' marche active]\nBlocs encore plus longs – 8 minutes en continu. Rester calme, respirer, ne pas regarder la montre.\nDistance estimée : ~5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes + Force postérieure",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité complète + overhead squat @barre ×10 ×3." },
        { titre: "Complexe Snatch évolué", duree: "25 min", contenu: "1 Snatch depuis le sol + 1 Hang snatch + 1 Overhead squat\n4×(1+1+1) @25-27.5kg. Ce complexe teste la consistance de la barre et la mobilité overhead." },
        { titre: "Complexe Clean évolué", duree: "20 min", contenu: "1 Clean + 2 Front Squats + 1 Jerk\n4×(1+2+1) @30-33kg. Les deux front squats exposent la position de rack sous fatigue." },
        { titre: "RDL + accessoire", duree: "15 min", contenu: "RDL : 4×8 @62-65kg.\n3×10 Step-ups lestés (haltère 10kg).\n2×15 Glute bridge bilatéral." },
        { titre: "Mobilité", duree: "15 min", contenu: "Travail mobilité thoracique + ouverture thoracique sur foam roller." },
      ]
    },
  },

  // S4 ────────────────────────────────────────────────────────────────────────
  {
    num: 4, phase: 1,
    lundi: {
      type: "halte", label: "Snatch 70% – Premier pic",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité approfondie : 5' foam roller thoracique, puis snatch à vide ×10 ×4 avec focus sur la vitesse de passage sous la barre." },
        { titre: "Snatch", duree: "35 min", contenu: "Montée : 3×2 @27.5kg, 2×2 @30kg.\nTravail : 4×3 @32kg (70%) – première semaine à 70%, réduire légèrement le volume. Chaque série compte, repos 2:30 min.\nOHS (Overhead Squat) : 3×4 @27.5kg – maintenir la position à 70%." },
        { titre: "Back Squat", duree: "25 min", contenu: "Montée : 1×4 @50kg, 1×3 @60kg.\nTravail : 4×4 @68kg (75%) – charges significatives. Ceinture recommandée si disponible. Repos 2:30 min." },
        { titre: "Accessoire", duree: "10 min", contenu: "3×10 Good mornings @barre. 3×45s planche avec rotation. 2×10 face pull." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements épaules + thoracique." },
      ]
    },
    mardi: {
      type: "course", label: "Run/Walk 45 min",
      duree: "45 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active + éducatifs." },
        { titre: "Séance principale", duree: "45 min", contenu: "3 × [10' course EF + 2' marche active]\n10 minutes en continu ! C'est le cap psychologique de cette phase. Allure très conservative (on doit pouvoir parler en phrase entière).\nDistance estimée : ~5.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements complets." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk 70% + FS",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull 3×5 @40kg + push press 3×5 @30kg." },
        { titre: "Clean & Jerk", duree: "35 min", contenu: "Montée : 2×2 @33kg, 2×2 @36kg.\nTravail : 4×3 @38.5kg (70%) – repos 2:30 min. Focus : la séquence dip-drive du jerk doit être verticale. Éviter de pencher le torse en avant.\nSplit jerk practice : 3×5 @25kg si vous utilisez le split." },
        { titre: "Front Squat", duree: "25 min", contenu: "Montée : 1×4 @42kg, 1×3 @48kg.\n4×4 @53.5kg (72%) – maintenir les coudes hauts même sous charge lourde." },
        { titre: "Accessoire", duree: "10 min", contenu: "Fentes bulgares 3×8. Hollow hold 3×30s. Pull apart 3×15." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Mobilité chevilles + psoas." },
      ]
    },
    jeudi: {
      type: "course", label: "Run/Walk 40 min",
      duree: "40 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche + dynamiques." },
        { titre: "Séance principale", duree: "40 min", contenu: "2 × [12' course EF + 3' marche active]\nSeule deux répétitions mais 12 minutes consécutives. Observer la FC : si elle monte au-dessus de 155, ralentir.\nDistance estimée : ~5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes lourds + Accessoire",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité approfondie + snatch à vide ×8 ×4." },
        { titre: "Complexe Snatch 70%", duree: "25 min", contenu: "1 Power Snatch + 1 Snatch complet\n4×(1+1) @30-32kg – le power snatch avant le snatch complet force à maintenir la vitesse de tirage même en position de catch basse." },
        { titre: "Complexe Clean 70%", duree: "20 min", contenu: "1 Power Clean + 1 Clean + 1 Jerk\n4×(1+1+1) @35-38kg. Exigeant. Si technique se dégrade, baisser la charge." },
        { titre: "RDL + accessoire", duree: "15 min", contenu: "RDL : 4×6 @68-70kg (montée de charge).\n3×10 Nordic curl ou ischio curl.\n2×15 hip thrust." },
        { titre: "Mobilité bilan Phase 1", duree: "15 min", contenu: "Test mobilité : OHS à vide filmé. Overhead squat squat profond – noter les limitations. Ce sera la référence pour la Phase 2." },
      ]
    },
  },

  // S5 – DÉCHARGE ──────────────────────────────────────────────────────────────
  {
    num: 5, phase: 1, decharge: true,
    lundi: {
      type: "halte", label: "⚡ Décharge – Snatch léger",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité complète sans rush. Snatch à vide ×10 ×3." },
        { titre: "Snatch – Décharge", duree: "25 min", contenu: "3×3 @27.5kg (60%) – travail technique pur. Vidéo chaque série. Corriger les défauts identifiés en S1-S4. Pas de PR, pas d'ego." },
        { titre: "Back Squat – Décharge", duree: "20 min", contenu: "3×4 @59kg (65%) – mouvement parfait, profondeur maximale. Se sentir léger et fluide." },
        { titre: "Accessoire léger", duree: "10 min", contenu: "2×10 Good mornings. 2×45s planche. Quelques étirements actifs." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements généraux." },
      ]
    },
    mardi: {
      type: "course", label: "Course continue 45 min ✅",
      duree: "45 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active 5 min." },
        { titre: "Séance principale – CAP 🎯", duree: "45 min", contenu: "45 minutes de course CONTINUE sans marche !\nC'est le premier objectif de la Phase 1. Allure très conservative (145-150 bpm). Si vous devez marcher 30s, c'est ok, l'essentiel est de terminer.\nDistance estimée : ~6.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche 5 min, étirements complets. Célébrer !" },
      ]
    },
    mercredi: {
      type: "halte", label: "⚡ Décharge – Clean léger",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull barre vide ×10 ×3." },
        { titre: "Clean & Jerk – Décharge", duree: "25 min", contenu: "3×3 @33kg (60%) – qualité technique, travail du catch et du jerk à charge légère. Observer les patterns." },
        { titre: "Front Squat – Décharge", duree: "20 min", contenu: "3×4 @48kg (65%) – position parfaite." },
        { titre: "Accessoire léger", duree: "10 min", contenu: "2×8 fentes bulgares. 2×20 crunchs." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Mobilité hanches + thoracique." },
      ]
    },
    jeudi: {
      type: "course", label: "Course continue 40 min",
      duree: "40 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche + dynamiques." },
        { titre: "Séance principale", duree: "40 min", contenu: "40 minutes de course EF continue.\nSemaine de décharge : allure très relax, < 148 bpm. Profiter du mouvement.\nDistance estimée : ~5.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "⚡ Décharge – Complexes légers",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité générale, snatch à vide." },
        { titre: "Complexes légers", duree: "30 min", contenu: "Complexe snatch 2×(1+1) @22-25kg.\nComplexe clean 2×(1+1+1) @28-30kg.\nFocus : fluidité, pas de charge." },
        { titre: "RDL léger", duree: "15 min", contenu: "3×8 @55kg – chaîne postérieure en douceur." },
        { titre: "Bilan & mobilité", duree: "15 min", contenu: "15 min de mobilité globale. Bilan de la Phase 1 : qu'est-ce qui a progressé ? Que travailler en Phase 2 ?" },
      ]
    },
  },

  // ── PHASE 2 (représentative S6, S8, S10, S11 décharge) ─────────────────────
  {
    num: 6, phase: 2,
    lundi: {
      type: "halte", label: "Snatch 70% + Gymnique intro",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + snatch à vide. Ajouter : 10 kip swings à la barre (introduction au mouvement CrossFit)." },
        { titre: "Snatch", duree: "25 min", contenu: "Snatch pull : 3×4 @30kg.\n5×3 @32kg (70%) – retour à 70% après la décharge. Les charges devraient se sentir légères. Profiter pour peaufiner le timing." },
        { titre: "Back Squat", duree: "20 min", contenu: "5×3 @68kg (75%) – passage à 3 reps pour augmenter l'intensité relative." },
        { titre: "Introduction gymnique CrossFit", duree: "20 min", contenu: "Tractions assistées élastique épais : 4×5 – position d'engagement scapulaire, pas de kipping encore.\nDips (barres ou chaise) : 3×8 – amplitude complète.\nBox jumps 50cm : 4×5 – atterrissage silencieux, position squat profond." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements + mobilité épaules spécifique halté/CrossFit." },
      ]
    },
    mardi: {
      type: "course", label: "Long run EF 50 min",
      duree: "50 min",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active + éducatifs." },
        { titre: "Séance principale", duree: "50 min", contenu: "50 minutes de course EF continue, 145–150 bpm.\nPremière sortie de la Phase 2. Observer comment les jambes récupèrent après une semaine de décharge.\nDistance estimée : ~7 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk 70% + WOD intro",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull ×8 ×3 + push press ×8 ×3." },
        { titre: "Clean & Jerk", duree: "25 min", contenu: "Clean pull : 3×4 @40kg.\n5×3 @38.5kg (70%) – précision maximale sur le jerk. Si split jerk : travail du pas de séparation.\nPush Jerk : 3×4 @30kg – renfo jerk." },
        { titre: "Front Squat", duree: "20 min", contenu: "5×3 @55.5kg (75%) – intensité en hausse, volume en baisse." },
        { titre: "Premier WOD CrossFit", duree: "20 min", contenu: "AMRAP 12 minutes :\n10 Kettlebell Swings @12kg\n10 Box Step-ups (pas de sauts)\n10 Ring Rows (ou tractions assistées)\nObjectif : introduction au format. Pas de compétition, juste bouger et respirer." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements complets." },
      ]
    },
    jeudi: {
      type: "course", label: "Fartlek doux",
      duree: "50 min",
      blocs: [
        { titre: "Échauffement", duree: "10 min", contenu: "10 min de course EF très légère." },
        { titre: "Séance principale – Fartlek", duree: "30 min", contenu: "5 × [2' allure 10k + 2' EF récup]\nAllure 10k cible : ~5:45–6:00/km, FC ~158–165 bpm (plus élevée mais contrôlée).\nPremière séance de qualité ! C'est normal de se sentir essoufflé sur les accélérations.\nDistance estimée : ~7 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "10 min EF très léger + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes 70% + Force + Gymnique",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité complète + kip swings ×10 ×2." },
        { titre: "Complexe Snatch intensifié", duree: "25 min", contenu: "1 Snatch + 1 Hang Snatch + 1 OHS\n4×(1+1+1) @28-30kg – le OHS final teste la stabilité overhead sous fatigue." },
        { titre: "Complexe Clean intensifié", duree: "20 min", contenu: "1 Clean + 1 Front Squat + 1 Push Jerk + 1 Split Jerk\n4×(1+1+1+1) @33-35kg – la progression des jerks force à gérer la fatigue bras/épaules." },
        { titre: "RDL + Gymnique", duree: "15 min", contenu: "RDL : 3×8 @65kg.\nTrouver les hanches : 2×10 kip swings à la barre fixe (introduction au kipping)." },
        { titre: "Mobilité", duree: "15 min", contenu: "Mobilité complète : foam roller + étirements actifs." },
      ]
    },
  },

  // S8 ────────────────────────────────────────────────────────────────────────
  {
    num: 8, phase: 2,
    lundi: {
      type: "halte", label: "Snatch 75% + Gymnique",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + snatch à vide ×8 ×4. Quelques kip swings." },
        { titre: "Snatch", duree: "30 min", contenu: "Montée : 2×2 @30kg, 2×2 @32kg.\n4×3 @34.5kg (75%) – on approche des 80%, la technique doit tenir. Si une réception est mauvaise, ne pas monter la charge.\nSnatch depuis blocks : 3×2 @30kg – travail tirage de la position haute." },
        { titre: "Back Squat", duree: "20 min", contenu: "4×3 @73kg (80%) – charges lourdes. Ceinture recommandée. Repos 3 min entre séries." },
        { titre: "Gymnique CrossFit", duree: "20 min", contenu: "Tractions assistées (élastique fin) : 4×4–5\nDips : 4×8\nDouble-unders (corde à sauter ×2 sous le pied) : 5×20 – si pas acquis, 5×30 sauts simples\nBox jumps : 4×5 @55cm" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    mardi: {
      type: "course", label: "Long run EF 1h",
      duree: "1h",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active." },
        { titre: "Séance principale", duree: "1h", contenu: "60 minutes de course EF continue, 145–150 bpm.\nCap symbolique de 1 heure ! Allure relax, ne pas accélérer même si les jambes vont bien. Économiser pour le jeudi.\nDistance estimée : ~8.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk 75% + WOD",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull ×6 ×3 + push press ×6 ×3." },
        { titre: "Clean & Jerk", duree: "30 min", contenu: "Montée : 2×2 @35kg, 2×2 @38kg.\n4×3 @41kg (75%) – bonne intensité. Observer la fatigue sur le jerk en fin de série.\nHang Clean : 3×3 @35kg – travail timing catch." },
        { titre: "Front Squat", duree: "20 min", contenu: "4×3 @57.5kg (78%) – position de rack active, coudes hauts même sous fatigue." },
        { titre: "WOD CrossFit", duree: "20 min", contenu: "For Time (avec chrono) :\n3 rounds de :\n15 Wall Balls @6kg\n12 Kettlebell Swings @14kg\n9 Box Jumps @50cm\nObjectif : <12 minutes. Intro au concept \"for time\"." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements généraux." },
      ]
    },
    jeudi: {
      type: "course", label: "Fractionné 6×2'30\"",
      duree: "55 min",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "15 min de course EF légère pour préparer les jambes." },
        { titre: "Séance principale – Fractionné", duree: "30 min", contenu: "6 × [2'30\" allure 10k + 90s EF récup]\nAllure 10k cible : ~5:45–6:00/km. Ce sera l'allure du test 10k en S10.\nLes 90s de récup doivent être suffisants pour reprendre la respiration.\nDistance estimée : ~8 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "10 min EF + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes 75% + Renfo",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + overhead squat @barre ×8 ×4." },
        { titre: "Complexe Snatch évolué", duree: "25 min", contenu: "2 Snatches + 1 Hang Snatch\n4×(2+1) @30-32kg – le deuxième snatch sous légère fatigue teste la reproductibilité technique." },
        { titre: "Complexe Clean évolué", duree: "20 min", contenu: "2 Cleans + 1 Front Squat + 2 Jerks\n4×(2+1+2) @36-38kg – volume augmenté, charge maîtrisée." },
        { titre: "RDL + accessoire CrossFit", duree: "15 min", contenu: "RDL : 4×6 @70kg.\nL-sit sur parallettes ou chaise : 3×15s.\n2×8 strict pull-ups ou tractions assistées." },
        { titre: "Mobilité", duree: "15 min", contenu: "Foam roller + mobilité spécifique overhead." },
      ]
    },
  },

  // S10 ───────────────────────────────────────────────────────────────────────
  {
    num: 10, phase: 2,
    lundi: {
      type: "halte", label: "Snatch 80% – Pic Phase 2",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité approfondie. Montée progressive snatch à vide puis @25kg @30kg @34kg." },
        { titre: "Snatch", duree: "35 min", contenu: "Montée : 2×1 @34kg, 2×1 @36kg.\n4×2 @37kg (80%) – 2 reps à 80%, c'est exigeant. Repos 3 min entre séries. Ne pas forcer si technique se dégrade à la 2e rep.\nPower Snatch max du jour : 1×1 @32-34kg – test puissance." },
        { titre: "Back Squat", duree: "20 min", contenu: "4×2 @77.5kg (85%) – charges les plus lourdes de la Phase 2. Ceinture, pareur si possible. Repos 3 min." },
        { titre: "Gymnique CrossFit", duree: "20 min", contenu: "Tractions kipping (introduction) : 4×3–5 – apprendre le rythme du kip.\nDips anneau (si dispo) ou barre : 3×6.\nDouble-unders : 5×30 – progression depuis S6." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    mardi: {
      type: "course", label: "Long run EF 1h10",
      duree: "1h10",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active." },
        { titre: "Séance principale", duree: "1h10", contenu: "70 minutes de course EF continue, 145–150 bpm.\nPic du volume course de la Phase 2. Parcours plat recommandé pour maintenir la FC stable.\nDistance estimée : ~10 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    mercredi: {
      type: "halte", label: "Clean & Jerk 80% + WOD",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull ×5 ×3 + push press ×5 ×3." },
        { titre: "Clean & Jerk", duree: "35 min", contenu: "Montée : 2×1 @38kg, 2×1 @41kg.\n4×2 @44kg (80%) – 80% du C&J. Chaque rep doit être parfaite. Repos 3 min.\nSplit Jerk technique : 3×3 @32kg – peaufiner le placement des pieds." },
        { titre: "Front Squat", duree: "20 min", contenu: "4×2 @60.5kg (82%) – charges lourdes, focus gainage abdominal." },
        { titre: "WOD CrossFit aérobie", duree: "15 min", contenu: "AMRAP 10 min :\n200m course (ou 250m rameur)\n10 Wall Balls @6kg\n5 Burpees\nObjectif : rythme constant, pas de sprint." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    jeudi: {
      type: "course", label: "🎯 TEST 10K",
      duree: "1h20",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "15 min de jogging très léger + 4×30s accélérations progressives + mobilité dynamique." },
        { titre: "TEST 10K 🎯", duree: "58-65 min", contenu: "10 kilomètres à allure cible.\nObjectif indicatif : 58–65 min (~5:48–6:30/km). Ce n'est pas un record, c'est un indicateur.\nStratégie : partir au feeling pour les 3 premiers km, trouver son rythme en S4-S7, finir fort sur S8-S10.\nRechercher l'allure confortable maintenue, pas le sprint." },
        { titre: "Retour au calme", duree: "10 min", contenu: "10 min de marche. Note le temps, la FC moyenne, les sensations. Ce sera la base pour calibrer la Phase 3." },
      ]
    },
    vendredi: {
      type: "halte", label: "Complexes 80% + Bilan",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + snatch à vide ×6 ×4." },
        { titre: "Complexe Snatch pic", duree: "25 min", contenu: "1 Snatch + 1 Hang Snatch + 1 OHS\n4×(1+1+1) @32-34kg – pic de difficulté du complexe. L'OHS à 70%+ teste vraiment la mobilité." },
        { titre: "Complexe Clean pic", duree: "20 min", contenu: "1 Clean + 1 FS + 1 Push Jerk + 1 Jerk\n4×(1+1+1+1) @38-40kg – série complète à intensité élevée." },
        { titre: "Accessoire final Phase 2", duree: "15 min", contenu: "RDL : 3×5 @72-75kg – charges les plus lourdes du cycle.\n3×5 strict pull-ups ou assistés.\nL-sit 3×20s." },
        { titre: "Bilan Phase 2 + Mobilité", duree: "15 min", contenu: "Bilan : noter les progrès techniques, les nouvelles charges. OHS filmé pour comparer à la fin de S5.\nMobilité globale 10 min." },
      ]
    },
  },

  // S11 – DÉCHARGE Phase 2 ────────────────────────────────────────────────────
  {
    num: 11, phase: 2, decharge: true,
    lundi: {
      type: "halte", label: "⚡ Décharge + Gymnique intro CrossFit",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité générale." },
        { titre: "Snatch – Décharge", duree: "20 min", contenu: "3×3 @30kg (65%) – technique pure, légèreté, aucune fatigue." },
        { titre: "Back Squat – Décharge", duree: "15 min", contenu: "3×3 @63.5kg (70%) – mouvement parfait." },
        { titre: "Gymnique CrossFit bilan", duree: "20 min", contenu: "Tractions kipping : 3×5 – noter la progression depuis S6.\nDouble-unders : 5×40 – amélioration du rythme.\nBox jumps : 3×8 @55cm – fluidité des sauts." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    mardi: {
      type: "course", label: "Récup active 45 min",
      duree: "45 min",
      blocs: [
        { titre: "Séance principale", duree: "45 min", contenu: "45 min de course EF très légère post-test 10k.\nFC cible : < 145 bpm. Très lent. Récupération des jambes avant la Phase 3.\nDistance estimée : ~6 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements mollets, IT band, hanches." },
      ]
    },
    mercredi: {
      type: "halte", label: "⚡ Décharge Clean + WOD léger",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité + clean pull léger." },
        { titre: "Clean & Jerk – Décharge", duree: "20 min", contenu: "3×3 @36kg (65%) – mouvement propre, pas d'ego." },
        { titre: "Front Squat – Décharge", duree: "15 min", contenu: "3×3 @52kg (70%)." },
        { titre: "WOD léger", duree: "20 min", contenu: "15 min EMOM (every minute on the minute) :\nMinutes impaires : 8 KB swings @12kg\nMinutes paires : 6 box step-ups\nTrès léger, juste bouger." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    jeudi: {
      type: "course", label: "Fractionné relance",
      duree: "55 min",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Jogging léger 15 min." },
        { titre: "Séance principale", duree: "30 min", contenu: "8 × [2' allure 10k + 90s EF récup]\nRelance après la décharge. Plus de répétitions qu'en S8 mais à allure cible 10k.\nDistance estimée : ~9 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "EF léger + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "⚡ Décharge complexes",
      duree: "1h15",
      blocs: [
        { titre: "Complexes légers", duree: "35 min", contenu: "2×(1+1) snatch @25kg.\n2×(1+1+1) clean @30kg.\nFluide, technique, pas de fatigue." },
        { titre: "Mobilité approfondie", duree: "40 min", contenu: "Bilan complet avant Phase 3 : OHS filmé, test mobilité chevilles (squat sur talons), test shoulder flexion overhead.\nFoam roller complet + étirements profonds." },
      ]
    },
  },

  // ── PHASE 3 (S12, S14, S15, S16, S17) ─────────────────────────────────────
  {
    num: 12, phase: 3,
    lundi: {
      type: "halte", label: "CrossFit – Halté + Gymnique",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement CrossFit", duree: "15 min", contenu: "500m rameur ou 400m jogging. Puis : 10 PVC pass-throughs, 10 overhead squats barre, 10 kip swings, 5 box jumps." },
        { titre: "Snatch CrossFit", duree: "25 min", contenu: "Snatch : 4×3 @34.5kg (75%) – les mouvements olympiques sont maintenant dans un contexte CrossFit : rythme légèrement différent.\nPower Snatch rapide : 3×3 @28kg – entraîner la vitesse de réalisation (important en WOD)." },
        { titre: "Back Squat", duree: "20 min", contenu: "4×3 @73kg (80%) – force maintenue malgré l'ajout du CrossFit." },
        { titre: "WOD CrossFit", duree: "25 min", contenu: "\"Cindy\" modifié : AMRAP 15 min\n5 Pull-ups (kipping ou assistés)\n10 Push-ups\n15 Air squats\nObjectif : > 8 rounds. Introduction au benchmark CrossFit." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    mardi: {
      type: "course", label: "Long run 1h15",
      duree: "1h15",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active." },
        { titre: "Séance principale", duree: "1h15", contenu: "75 minutes de course EF, 145–150 bpm.\nPremière sortie longue de la Phase 3. Le corps doit s'adapter à courir après une semaine de décharge + CrossFit.\nDistance estimée : ~11 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements." },
      ]
    },
    mercredi: {
      type: "halte", label: "CrossFit – Clean + Force + Gymnique",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement CrossFit", duree: "15 min", contenu: "400m + mobilité + 10 kip swings + 5 box jumps." },
        { titre: "Clean & Jerk CrossFit", duree: "25 min", contenu: "C&J : 4×3 @41kg (75%).\nTouch-and-go Clean : 3×3 @32kg – introduction au style CrossFit (pas de reset entre les reps)." },
        { titre: "Front Squat", duree: "15 min", contenu: "4×3 @55.5kg (75%) – maintien de la force." },
        { titre: "WOD CrossFit", duree: "25 min", contenu: "3 rounds for time :\n7 Hang Power Cleans @32kg\n14 Box Jumps @50cm\n21 Double-unders (ou 42 sauts simples)\nIntégration des mouvements olympiques dans un WOD." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements complets." },
      ]
    },
    jeudi: {
      type: "course", label: "Tempo run – Allure semi",
      duree: "55 min",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "15 min jogging léger." },
        { titre: "Séance principale – Tempo", duree: "30 min", contenu: "15 min EF + 20 min allure semi-marathon cible (4'58/km) + 10 min EF retour\nPremier bloc à allure semi ! 20 minutes à ~5:00/km. Garder la FC < 170 bpm.\nC'est cette allure que vous devrez tenir pendant 1h45.\nDistance estimée : ~10 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "EF très léger + étirements spécifiques course." },
      ]
    },
    vendredi: {
      type: "halte", label: "CrossFit – Conditionnement",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement CrossFit", duree: "15 min", contenu: "Row 500m + mobilité + 10 wall balls + 5 box jumps." },
        { titre: "Complexe CrossFit Snatch", duree: "20 min", contenu: "Power Snatch : 4×2 @32kg – vitesse de réalisation CrossFit.\nOHS : 3×3 @28kg – mobilité en condition." },
        { titre: "Complexe CrossFit Clean", duree: "15 min", contenu: "Hang Power Clean : 4×3 @35kg – style CrossFit, touch-and-go.\nPush Press : 4×5 @32kg – renforcement jerk." },
        { titre: "WOD CrossFit cardio", duree: "25 min", contenu: "EMOM 20 min :\nMin 1 : 12 Wall Balls @6kg\nMin 2 : 8 Burpees\nMin 3 : 10 KB Swings @16kg\nMin 4 : 15 Air Squats\nRépéter 5 fois. Rythme soutenu mais gérable." },
        { titre: "Retour au calme", duree: "15 min", contenu: "Étirements + foam roller." },
      ]
    },
  },

  // S15 – PIC DE VOLUME ───────────────────────────────────────────────────────
  {
    num: 15, phase: 3,
    lundi: {
      type: "halte", label: "CrossFit – Halté 82% + WOD lourd",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "500m rameur + mobilité complète + montée progressive snatch." },
        { titre: "Snatch – Pic Phase 3", duree: "25 min", contenu: "Montée : 2×1 @34kg, 2×1 @36kg.\n3×2 @37.5kg (82%) – près du max. Chaque rep filmée idéalement. Ne pas dépasser si technique défaillante.\n1×1 tentative @39-40kg (85%) si tout se passe bien." },
        { titre: "Back Squat", duree: "20 min", contenu: "3×2 @79kg (87%) – charges maximales du programme. Ceinture, pareur. Repos 4 min." },
        { titre: "WOD CrossFit", duree: "25 min", contenu: "\"Grace\" modifié : 20 Clean & Jerk @30kg for time.\nObjectif : < 4 minutes. Benchmark classique CrossFit adapté à votre niveau." },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements." },
      ]
    },
    mardi: {
      type: "course", label: "🏔️ Long run 1h40 – Pic volume",
      duree: "1h40",
      blocs: [
        { titre: "Échauffement", duree: "5 min", contenu: "Marche active." },
        { titre: "Séance principale – PIC 🏔️", duree: "1h40", contenu: "100 minutes de course EF, 145–150 bpm.\nC'est la sortie longue la plus longue de tout le programme. Prendre de l'eau, un gel si > 1h20.\nAprès cette séance, le travail difficile est fait. Le tapering commence la semaine prochaine.\nDistance estimée : ~14.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements complets." },
      ]
    },
    mercredi: {
      type: "halte", label: "CrossFit – Clean 82% + WOD",
      duree: "1h30",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "400m + mobilité + clean pull ×5 ×3." },
        { titre: "Clean & Jerk – Pic Phase 3", duree: "25 min", contenu: "Montée : 2×1 @41kg, 2×1 @43kg.\n3×2 @45kg (82%) – près du 1RM. Exécution parfaite.\n1×1 tentative @47-48kg (85%) si l'énergie le permet." },
        { titre: "Front Squat", duree: "15 min", contenu: "3×2 @61kg (82%) – lourd mais maîtrisé." },
        { titre: "WOD CrossFit", duree: "25 min", contenu: "\"Isabel\" modifiée : 21-15-9\nPower Snatch @25kg + Box Jumps @50cm\nEnchaîner sans pause excessive. Objectif : < 8 minutes." },
        { titre: "Retour au calme", duree: "10 min", contenu: "Étirements + mobilité." },
      ]
    },
    jeudi: {
      type: "course", label: "Fractionné spécifique semi",
      duree: "1h",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Jogging 15 min." },
        { titre: "Séance principale", duree: "35 min", contenu: "5 × [4' allure semi (4:58/km) + 90s EF récup]\n5 répétitions de 4 minutes à allure semi ! Très exigeant combiné avec le long run de mardi.\nMaintenir la FC < 175 bpm pendant les intervalles.\nDistance estimée : ~12 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "EF léger + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "CrossFit léger – Récup active",
      duree: "1h",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité générale + mouvements légers." },
        { titre: "Technique légère", duree: "20 min", contenu: "Snatch technique : 3×2 @28kg – correction de détails.\nClean & Jerk : 3×2 @33kg – technique propre." },
        { titre: "WOD léger récup", duree: "20 min", contenu: "AMRAP 12 min à 60% de capacité :\n10 Ring Rows\n10 KB Swings @12kg\n10 Box Step-ups\nPas d'effort maximal. Corps en récup." },
        { titre: "Mobilité", duree: "5 min", contenu: "Foam roller + étirements." },
      ]
    },
  },

  // S17 – TAPERING ─────────────────────────────────────────────────────────────
  {
    num: 17, phase: 3, tapering: true,
    lundi: {
      type: "halte", label: "⚡ Tapering – CrossFit léger",
      duree: "1h",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité générale." },
        { titre: "Snatch – Tapering", duree: "20 min", contenu: "3×2 @32kg (70%) – léger, fluide. Rappeler au corps les mouvements sans fatigue." },
        { titre: "Back Squat – Tapering", duree: "15 min", contenu: "3×2 @68kg (75%) – charges modérées." },
        { titre: "WOD très léger", duree: "10 min", contenu: "10 min EMOM :\nMin 1 : 6 KB Swings @12kg\nMin 2 : 5 Box Step-ups\nJuste bouger. Pas de fatigue." },
      ]
    },
    mardi: {
      type: "course", label: "Tapering – 55 min EF",
      duree: "55 min",
      blocs: [
        { titre: "Séance principale", duree: "55 min", contenu: "55 min de course EF très légère, FC < 148 bpm.\nVolume réduit. Les jambes doivent commencer à se sentir légères.\nDistance estimée : ~7.5 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Marche + étirements mollets et hanches." },
      ]
    },
    mercredi: {
      type: "halte", label: "⚡ Tapering – Clean + WOD très léger",
      duree: "1h",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Mobilité générale." },
        { titre: "Clean & Jerk – Tapering", duree: "20 min", contenu: "3×2 @38.5kg (70%) – mouvements parfaits, pas de fatigue accumulée." },
        { titre: "Front Squat – Tapering", duree: "15 min", contenu: "3×2 @52kg (70%)." },
        { titre: "WOD très léger", duree: "10 min", contenu: "10 min de travail gymnique léger : 3×5 tractions, 3×5 dips. Rien d'intense." },
      ]
    },
    jeudi: {
      type: "course", label: "Rappel vitesse",
      duree: "50 min",
      blocs: [
        { titre: "Échauffement", duree: "15 min", contenu: "Jogging 15 min." },
        { titre: "Séance principale", duree: "25 min", contenu: "4 × [3' allure semi (4:58/km) + 2' EF récup]\nRappel de l'allure cible. Les jambes sont fraîches après la réduction de volume. Elles devraient se sentir légères et réactives.\nDistance estimée : ~9 km" },
        { titre: "Retour au calme", duree: "10 min", contenu: "EF très léger + étirements." },
      ]
    },
    vendredi: {
      type: "halte", label: "⚡ Tapering – Technique pure",
      duree: "45 min",
      blocs: [
        { titre: "Technique légère", duree: "30 min", contenu: "Snatch : 2×3 @27.5kg – plaisir du mouvement.\nClean & Jerk : 2×3 @33kg – mouvements propres.\nOHS : 2×5 @barre vide – mobilité." },
        { titre: "Visualisation + mobilité", duree: "15 min", contenu: "15 min de mobilité douce. Visualiser la course de dimanche : le départ, les 5 premiers km, le passage à mi-parcours, le finish.\nCe soir : repas riche en glucides." },
      ]
    },
  },

  // S18 – RACE WEEK ────────────────────────────────────────────────────────────
  {
    num: 18, phase: 3, raceWeek: true,
    lundi: {
      type: "halte", label: "Repos complet ou mobilité",
      duree: "30 min",
      blocs: [
        { titre: "Option A : Repos total", duree: "–", contenu: "Journée de récupération complète. Pas de charge, pas de stress physique. Marche légère si besoin de bouger." },
        { titre: "Option B : Mobilité douce", duree: "30 min", contenu: "20 min de mobilité très douce : foam roller, étirements passifs, yoga léger. 0 effort musculaire. Juste détendre." },
      ]
    },
    mardi: {
      type: "course", label: "Sortie légère 30 min",
      duree: "30 min",
      blocs: [
        { titre: "Séance principale", duree: "30 min", contenu: "30 min de jogging très léger, FC < 145 bpm.\nJuste garder les jambes actives. Peut inclure 3-4 accélérations de 20s pour éviter d'avoir les jambes lourdes le jour J.\nDistance estimée : ~4 km" },
        { titre: "Retour au calme", duree: "5 min", contenu: "Étirements mollets et quadriceps." },
      ]
    },
    mercredi: {
      type: "halte", label: "Repos ou mobilité légère",
      duree: "20 min",
      blocs: [
        { titre: "Mobilité pré-course", duree: "20 min", contenu: "Mobilité chevilles, hanches, thoracique. Très léger. Préparer le kit de course ce soir : dossard, chaussures, nutrition (gels), tenue." },
      ]
    },
    jeudi: {
      type: "course", label: "🏁 SEMI-MARATHON",
      duree: "~1h45",
      blocs: [
        { titre: "Échauffement J-", duree: "15 min", contenu: "15 min de jogging léger avant le départ + 4 accélérations progressives de 30s. S'hydrater." },
        { titre: "🏁 SEMI-MARATHON – Objectif 1h45", duree: "~1h45", contenu: "Stratégie : partir à 5:05-5:10/km les 5 premiers km (légèrement en-dessous de l'allure cible pour ne pas partir trop vite).\nKm 5-15 : allure cible ~4:58/km, rythme de croisière stable.\nKm 15-21.1 : si les réserves le permettent, accélérer progressivement.\nNutrition : 1 gel à 45 min, 1 gel à 1h15, eau à chaque ravitaillement." },
        { titre: "Récupération post-course 🎉", duree: "15 min", contenu: "Marche 10 min immédiatement après. S'hydrater et manger (glucides + protéines dans les 30 min). Étirements doux. FÉLICITATIONS !" },
      ]
    },
    vendredi: {
      type: "halte", label: "Repos mérité 🎉",
      duree: "–",
      blocs: [
        { titre: "REPOS", duree: "–", contenu: "Vous venez de finir un semi-marathon après 18 semaines d'un programme intense combinant haltérophilie, CrossFit et course. Repos complet. Récupération active uniquement si envie (marche, bain froid, massage)." },
      ]
    },
  },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────

const JOUR_ORDER = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
const JOUR_LABEL: Record<string, string> = { lundi: "Lundi", mardi: "Mardi", mercredi: "Mercredi", jeudi: "Jeudi", vendredi: "Vendredi" };
const TYPE_COLOR: Record<string, string> = { halte: "#C77DFF", course: "#52B788" };
const TYPE_ICON: Record<string, string> = { halte: "🏋️", course: "🏃" };
const TYPE_LABEL: Record<string, string> = { halte: "Haltérophilie", course: "Course à pied" };

const PHASE_META = [
  { id: 1, label: "Phase 1", dates: "Fin juin → Fin juillet", color: "#2D6A4F", accent: "#52B788", theme: "Technique & bases" },
  { id: 2, label: "Phase 2", dates: "Août → Mi-sept", color: "#7B2D8B", accent: "#C77DFF", theme: "Intensification" },
  { id: 3, label: "Phase 3", dates: "Mi-sept → Nov", color: "#C25B0A", accent: "#F4A261", theme: "CrossFit & Semi" },
];

// ─── COMPOSANT ───────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("semaines"); // semaines | conseils
  const [activePhase, setActivePhase] = useState(1);
  const [activeSemaine, setActiveSemaine] = useState<number | null>(null);
  const [activeJour, setActiveJour] = useState<string | null>(null);
  const [expandedBloc, setExpandedBloc] = useState<number | null>(null);

  const semaines = SEMAINES.filter(s => s.phase === activePhase);
  const semaine = activeSemaine !== null ? SEMAINES.find(s => s.num === activeSemaine) as any : null;
  const jourData = semaine && activeJour ? (semaine as any)[activeJour] : null;
  const pm = PHASE_META.find(p => p.id === activePhase);

  // ── Vue détail jour ──────────────────────────────────────────────────────
  if (jourData) {
    const tc = TYPE_COLOR[jourData.type];
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0F0F13", minHeight: "100vh", color: "#F0EDE8", maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
        <div style={{ padding: "20px 16px 12px", background: "#1A1A22", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #2A2A35" }}>
          <button onClick={() => { setActiveJour(null); }} style={{ background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8 }}>← Retour semaine {activeSemaine}</button>
          <div style={{ fontSize: 11, color: tc, textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>{JOUR_LABEL[activeJour!]} · S{activeSemaine} · {TYPE_LABEL[jourData.type]}</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{jourData.label}</div>
          {jourData.duree && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>⏱ {jourData.duree}</div>}
        </div>
        <div style={{ padding: "16px" }}>
          {jourData.blocs.map((bloc, i) => {
            const open = expandedBloc === i;
            return (
              <div key={i} onClick={() => setExpandedBloc(open ? null : i)} style={{ background: "#1A1A22", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", border: open ? `1px solid ${tc}44` : "1px solid transparent", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{bloc.titre}</div>
                    {bloc.duree && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>⏱ {bloc.duree}</div>}
                  </div>
                  <span style={{ fontSize: 16, color: "#555" }}>{open ? "▲" : "▼"}</span>
                </div>
                {open && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #2A2A35", fontSize: 13, color: "#ccc", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                    {bloc.contenu}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Vue détail semaine ───────────────────────────────────────────────────
  if (semaine) {
    const badge = semaine.decharge ? "⚡ Décharge" : semaine.tapering ? "⚡ Tapering" : semaine.raceWeek ? "🏁 Race Week" : null;
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0F0F13", minHeight: "100vh", color: "#F0EDE8", maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
        <div style={{ padding: "20px 16px 12px", background: "#1A1A22", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #2A2A35" }}>
          <button onClick={() => setActiveSemaine(null)} style={{ background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8 }}>← Retour Phase {semaine.phase}</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Semaine {semaine.num}</div>
            {badge && <div style={{ background: "#2A2A35", color: "#F4A261", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{badge}</div>}
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          {JOUR_ORDER.filter(j => semaine[j]).map(jour => {
            const d = semaine[jour];
            const tc = TYPE_COLOR[d.type];
            return (
              <div key={jour} onClick={() => setActiveJour(jour)} style={{ background: "#1A1A22", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", border: "1px solid #2A2A35", transition: "all 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 22 }}>{TYPE_ICON[d.type]}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1 }}>{JOUR_LABEL[jour]}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginTop: 1 }}>{d.label}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>⏱ {d.duree} · {d.blocs.length} blocs</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: tc, background: `${tc}22`, padding: "3px 8px", borderRadius: 20 }}>{TYPE_LABEL[d.type]}</span>
                  <span style={{ fontSize: 14, color: "#555" }}>›</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Vue principale ───────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0F0F13", minHeight: "100vh", color: "#F0EDE8", maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(180deg, #1A1A22 0%, #0F0F13 100%)" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#888", textTransform: "uppercase", marginBottom: 4 }}>Programme été 2026</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", lineHeight: 1.2 }}>Cap sur le semi 🏁</h1>
        <p style={{ fontSize: 13, color: "#999", margin: "0 0 20px" }}>Haltérophilie · Course · CrossFit · 18 semaines</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["semaines", "conseils"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: view === v ? "#F0EDE8" : "#1E1E28", color: view === v ? "#0F0F13" : "#888", transition: "all 0.2s" }}>
              {v === "semaines" ? "📅 Programme" : "💡 Conseils"}
            </button>
          ))}
        </div>
      </div>

      {view === "semaines" && (
        <div style={{ padding: "0 16px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {PHASE_META.map(p => (
              <button key={p.id} onClick={() => setActivePhase(p.id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, border: `2px solid ${p.id === activePhase ? p.accent : "transparent"}`, background: p.id === activePhase ? `${p.color}33` : "#1E1E28", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: p.id === activePhase ? p.accent : "#666", letterSpacing: 1, textTransform: "uppercase" }}>{p.label}</div>
                <div style={{ fontSize: 11, color: p.id === activePhase ? "#F0EDE8" : "#555", marginTop: 2 }}>{p.theme}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{pm.dates}</div>
          {semaines.map(s => {
            const badge = s.decharge ? "⚡ Décharge" : s.tapering ? "⚡ Tapering" : s.raceWeek ? "🏁 Race Week" : null;
            const jours = JOUR_ORDER.filter(j => (s as any)[j]);
            return (
              <div key={s.num} onClick={() => setActiveSemaine(s.num)} style={{ background: "#1A1A22", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", border: "1px solid #2A2A35", transition: "all 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>Semaine {s.num}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {badge && <span style={{ fontSize: 10, fontWeight: 700, color: "#F4A261", background: "#F4A26122", padding: "3px 8px", borderRadius: 20 }}>{badge}</span>}
                    <span style={{ fontSize: 14, color: "#555" }}>›</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {jours.map(j => (
                    <div key={j} style={{ fontSize: 11, color: TYPE_COLOR[s[j].type], background: `${TYPE_COLOR[s[j].type]}18`, padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>
                      {JOUR_LABEL[j].slice(0,3)} · {s[j].type === "halte" ? "🏋️" : "🏃"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "conseils" && (
        <div style={{ padding: "0 16px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "16px 0 4px" }}>Vos 1RM de référence</h2>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Base de calcul de toutes les charges</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
            {[["Snatch", "46 kg", "mesuré"], ["Clean & Jerk", "55 kg", "mesuré"], ["Back Squat", "~91 kg", "estimé (4×80)"], ["Front Squat", "~74 kg", "estimé (4×65)"]].map(([name, val, src]) => (
              <div key={name} style={{ background: "#1A1A22", borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#888" }}>{name}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#C77DFF" }}>{val}</div>
                <div style={{ fontSize: 10, color: "#555" }}>{src}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>Allures de course</h2>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Référence pour calibrer vos séances</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {[["EF (endurance fondamentale)", "5:50–6:20/km", "145–150 bpm"], ["Allure 10k cible", "5:45–6:00/km", "158–165 bpm"], ["Allure semi-marathon", "~4:58/km", "< 175 bpm"], ["Semi-marathon objectif", "1h45", "21.1 km"]].map(([type, allure, fc]) => (
              <div key={type} style={{ background: "#1A1A22", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{type}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{fc}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#52B788" }}>{allure}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 12px" }}>Feuille de route 🗓️</h2>
          {[
            { date: "Fin juin", event: "Début Phase 1 – Run/Walk + technique halté", color: "#52B788" },
            { date: "Fin juillet", event: "45 min course continue ✅ + décharge S5", color: "#52B788" },
            { date: "Mi-août", event: "🎯 Test 10k (S10)", color: "#C77DFF" },
            { date: "Mi-septembre", event: "⚡ Décharge S11 + début CrossFit en box", color: "#F4A261" },
            { date: "Fin octobre", event: "🏔️ Pic volume S15 – long run 1h40", color: "#F4A261" },
            { date: "Octobre/Novembre", event: "🏁 SEMI-MARATHON – objectif 1h45 !", color: "#F4A261" },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 2 }} />
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: "#2A2A35", marginTop: 2 }} />}
              </div>
              <div style={{ paddingBottom: 4 }}>
                <div style={{ fontSize: 11, color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{item.date}</div>
                <div style={{ fontSize: 13, color: "#ddd", marginTop: 1 }}>{item.event}</div>
              </div>
            </div>
          ))}

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "24px 0 12px" }}>Règles d'or</h2>
          {[
            { icon: "💤", title: "Sommeil", text: "8h minimum. C'est là que les muscles se reconstruisent." },
            { icon: "💧", title: "Hydratation", text: "2.5–3L/jour + électrolytes pour les séances > 1h." },
            { icon: "📈", title: "Règle des 10%", text: "Ne jamais augmenter le volume course de plus de 10% par semaine." },
            { icon: "⚠️", title: "Signaux d'alarme", text: "Douleur tibia, genou ou tendon d'Achille = arrêt immédiat et consultation." },
            { icon: "🎥", title: "Vidéo", text: "Filmez-vous en halté une fois par semaine. C'est le meilleur outil de progression technique." },
          ].map((t, i) => (
            <div key={i} style={{ background: "#1A1A22", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{t.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
