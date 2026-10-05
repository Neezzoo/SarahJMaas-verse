/* Les livres des trois sagas.
   Texte enrichi : **gras**, *italique*, [[texte spoiler masqué]].
   couleur : teinte de la couverture, utilisée pour le « dos » du livre. */
window.MAAS = window.MAAS || {};
MAAS.livres = [
  /* ---------- Throne of Glass ---------- */
  { id: "tab", saga: "tog", num: "0", sigle: "TAB", vo: "The Assassin's Blade", vf: "La Lame de l'assassineuse", annee: 2014, couleur: "#1f5a57",
    pitch: "Cinq novellas préquelles : la jeunesse de Celaena au service du roi des assassins.",
    resume: "Celaena est la protégée d'Arobynn Hamel à Rifthold. Missions au Désert Rouge et à la Baie du Crâne, amour avec Sam Cortland. [[Arobynn la trahit : Sam est tué et Celaena est envoyée aux mines de sel d'Endovier.]]" },
  { id: "tog1", saga: "tog", num: "1", sigle: "TOG", vo: "Throne of Glass", vf: "L'Assassineuse", annee: 2012, couleur: "#22345f",
    pitch: "Celaena, sortie des mines d'Endovier, doit remporter un tournoi pour devenir la Championne du roi d'Adarlan.",
    resume: "Le tournoi au château de verre de Rifthold, entre le prince Dorian et le capitaine Chaol. Amitié avec la princesse Nehemia d'Eyllwe. [[Des champions meurent de façon monstrueuse : Cain utilise des Wyrdmarks. Celaena gagne avec l'aide du fantôme de la reine Elena.]]" },
  { id: "tog2", saga: "tog", num: "2", sigle: "COM", vo: "Crown of Midnight", vf: "La Reine sans couronne", annee: 2013, couleur: "#6b1f3a",
    pitch: "Devenue Championne du roi, Celaena mène un double jeu dangereux.",
    resume: "[[Mort de Nehemia, qui l'a choisie pour pousser Celaena à agir. Révélation : Celaena est Aelin Galathynius, héritière disparue de Terrasen. Le roi a bloqué la magie grâce aux Wyrdkeys.]]" },
  { id: "tog3", saga: "tog", num: "3", sigle: "HOF", vo: "Heir of Fire", vf: "L'Héritière du feu", annee: 2014, couleur: "#20442f",
    pitch: "En Wendlyn, Celaena affronte son passé auprès du prince fae Rowan Whitethorn.",
    resume: "Entraînement à Mistward sous l'autorité de la reine Maeve. En parallèle, Manon Blackbeak et les sorcières Ironteeth apprennent à monter des wyvernes. [[Aelin accepte qui elle est. Dorian perd Sorscha et se retrouve sous un collier Valg.]]" },
  { id: "tog4", saga: "tog", num: "4", sigle: "QOS", vo: "Queen of Shadows", vf: "La Reine des ombres", annee: 2015, couleur: "#8c1d1d",
    pitch: "Le retour à Rifthold, pour régler ses comptes.",
    resume: "[[Chute d'Arobynn, libération de Dorian, destruction du château de verre et mort du roi d'Adarlan. La magie revient sur le continent.]]" },
  { id: "tog5", saga: "tog", num: "5", sigle: "EOS", vo: "Empire of Storms", vf: "L'Empire des tempêtes", annee: 2016, couleur: "#3d2440",
    pitch: "La guerre s'étend et Aelin cherche des alliés partout où elle peut.",
    resume: "Guerre contre Erawan, alliances avec les pirates, les sorcières Crochan et les Fae. [[Aelin et Rowan se marient en secret. Fin : Aelin est capturée par Maeve et enfermée dans un cercueil de fer.]]" },
  { id: "tog6", saga: "tog", num: "6", sigle: "TOD", vo: "Tower of Dawn", vf: "La Tour de l'aube", annee: 2017, couleur: "#d0612a",
    pitch: "Chaol part sur le Continent du Sud pour se faire soigner par la guérisseuse Yrene Towers.",
    resume: "Se déroule en même temps qu'*Empire of Storms* (lecture « en tandem » conseillée). [[Révélations sur les Valg et les guerres anciennes ; le Khaganat rejoint la guerre.]]" },
  { id: "tog7", saga: "tog", num: "7", sigle: "KOA", vo: "Kingdom of Ash", vf: "Le Royaume de cendre", annee: 2018, couleur: "#1c2730",
    pitch: "La grande guerre finale pour Erilea.",
    resume: "[[Aelin, torturée par Maeve, est libérée. Elle forge un nouveau Verrou et aperçoit d'autres mondes. Erawan et Maeve sont vaincus ; Aelin devient reine de Terrasen.]]" },

  /* ---------- ACOTAR ---------- */
  { id: "acotar1", saga: "acotar", num: "1", sigle: "ACOTAR", vo: "A Court of Thorns and Roses", vf: "Un palais d'épines et de roses", annee: 2015, couleur: "#e2364f",
    pitch: "Feyre tue un loup qui était un Fae déguisé ; en réparation, elle est emmenée de l'autre côté du Mur, à la Cour du Printemps.",
    resume: "Vie à la Cour du Printemps de Tamlin, malédiction d'Amarantha. [[Feyre affronte trois épreuves Sous la Montagne, meurt et est ressuscitée en Fae Haute par les sept Grands Seigneurs.]]" },
  { id: "acotar2", saga: "acotar", num: "2", sigle: "ACOMAF", vo: "A Court of Mist and Fury", vf: "Un palais de colère et de brume", annee: 2016, couleur: "#16a99a",
    pitch: "Feyre, brisée par ce qu'elle a vécu, découvre un autre visage de Prythian.",
    resume: "[[Rhysand l'emmène à Velaris. Découverte du Cercle intime ; Feyre et Rhys sont âmes sœurs. Le roi d'Hybern plonge Nesta et Elain dans le Chaudron.]]" },
  { id: "acotar3", saga: "acotar", num: "3", sigle: "ACOWAR", vo: "A Court of Wings and Ruin", vf: "Un palais de cendres et de ruines", annee: 2017, couleur: "#d23a9a",
    pitch: "La guerre contre Hybern éclate.",
    resume: "[[Feyre espionne à la Cour du Printemps ; elle devient Grande Dame de la Nuit. Nesta tue le roi d'Hybern et le Mur tombe.]]" },
  { id: "acotar35", saga: "acotar", num: "3.5", sigle: "ACOFAS", vo: "A Court of Frost and Starlight", vf: "Un palais de glace et de lumière", annee: 2018, couleur: "#2aa7e0",
    pitch: "Novella : le solstice d'hiver à Velaris, après la guerre.",
    resume: "Une transition douce vers la suite, avec plusieurs points de vue." },
  { id: "acotar4", saga: "acotar", num: "4", sigle: "ACOSF", vo: "A Court of Silver Flames", vf: "Un palais de flammes d'argent", annee: 2021, couleur: "#e36f22",
    pitch: "Nesta, détruite par la guerre, doit se reconstruire.",
    resume: "Entraînement avec Cassian, les prêtresses Gwyneth et Emerie : renaissance des **Valkyries**. [[Les Trésors Maudits (Masque, Harpe, Couronne) ; Nesta et Cassian sont compagnons ; naissance de Nyx, fils de Feyre et Rhys.]]" },
  { id: "acotar5", saga: "acotar", num: "VC I", sigle: "ACOSH", vo: "A Court of Splintered Harmony", vf: "pas encore de VF", annee: 2026, couleur: "#5b4a8c", aVenir: true, date: "27 octobre 2026",
    pitch: "Valkyrie Cycle, Mouvement I. Narration de Lucien (au moins).",
    resume: "Premier volet d'une grande histoire en « mouvements ». La numérotation officielle varie selon les sources." },
  { id: "acotar6", saga: "acotar", num: "VC II–III", sigle: "ACOFM", vo: "A Court of Forgotten Melody", vf: "pas encore de VF", annee: 2027, couleur: "#3b5b8c", aVenir: true, date: "12 janvier 2027",
    pitch: "Valkyrie Cycle, Mouvements II et III.",
    resume: "Suite directe d'*A Court of Splintered Harmony*. Un dernier volet (Mouvement IV) conclura le cycle." },

  /* ---------- Crescent City ---------- */
  { id: "cc1", saga: "cc", num: "1", sigle: "HOEAB", vo: "House of Earth and Blood", vf: "Maison de la Terre et du Sang", annee: 2020, couleur: "#a3161f",
    pitch: "Deux ans après le meurtre de sa meilleure amie, Bryce Quinlan enquête avec l'ange déchu Hunt Athalar.",
    resume: "Enquête sur la mort de Danika et la Corne de Luna. [[Le coupable est l'archange Micah. Bryce fait sa Descente, devient Étoilée et sauve la ville d'une invasion de Hel ; Lehabah se sacrifie.]]" },
  { id: "cc2", saga: "cc", num: "2", sigle: "HOSAB", vo: "House of Sky and Breath", vf: "Maison du Ciel et du Souffle", annee: 2022, couleur: "#2a5c93",
    pitch: "Bryce et Hunt voudraient une vie calme ; la rébellion Ophion en décide autrement.",
    resume: "[[L'agent « Daybright » est Lidia Cervos. Les Asteri se nourrissent de la magie des habitants. Dernières pages : Bryce ouvre un portail et atterrit… à Prythian.]]" },
  { id: "cc3", saga: "cc", num: "3", sigle: "HOFAS", vo: "House of Flame and Shadow", vf: "Maison de la Flamme et de l'Ombre", annee: 2024, couleur: "#b8862e",
    pitch: "Bryce se retrouve dans un monde inconnu, loin de tous ceux qu'elle aime.",
    resume: "[[Bryce à Prythian avec Nesta, Azriel, Cassian et Rhysand. Les Fae de Midgard viennent de Prythian ; les Asteri sont les Daglan. Truth-Teller réagit avec l'Épée-Étoile. Retour à Midgard, alliance avec Hel et chute des Asteri.]]" },
  { id: "cc4", saga: "cc", num: "4", sigle: "CC4", vo: "Crescent City 4 (titre inconnu)", vf: "—", annee: 2028, couleur: "#3a3f4f", aVenir: true, date: "date inconnue",
    pitch: "Confirmé par l'autrice, sans titre ni date.",
    resume: "Les fans rêvent du titre *House of Many Waters* (non officiel)." },
];

/* Les deux ordres de lecture */
MAAS.ordres = {
  publication: [
    "Chaque saga dans l'ordre de parution : c'est le plus simple pour une première lecture.",
  ],
  conseille: [
    { texte: "**Throne of Glass** en entier, avec *Tower of Dawn* en même temps qu'*Empire of Storms* (lecture en tandem).", saga: "tog" },
    { texte: "**ACOTAR** tomes 1 à 3.5 (jusqu'à *A Court of Frost and Starlight*).", saga: "acotar" },
    { texte: "*House of Earth and Blood* (Crescent City 1).", saga: "cc" },
    { texte: "*A Court of Silver Flames* (ACOTAR 4).", saga: "acotar" },
    { texte: "*House of Sky and Breath* (Crescent City 2) : **à lire seulement après ACOTAR**, la fin est un crossover.", saga: "cc" },
    { texte: "*House of Flame and Shadow* (Crescent City 3).", saga: "cc" },
    { texte: "Le **Valkyrie Cycle** (ACOTAR, à partir d'octobre 2026).", saga: "acotar" },
  ],
};
