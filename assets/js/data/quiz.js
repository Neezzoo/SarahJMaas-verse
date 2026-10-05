/* Questions du quiz.
   saga : "tog" | "acotar" | "cc" | "multi" ; bonne : index de la bonne réponse (0 = la première). */
window.MAAS = window.MAAS || {};
MAAS.quiz = [
  /* --- Throne of Glass --- */
  { saga: "tog", q: "Dans quelles mines Celaena est-elle esclave au début de la saga ?", choix: ["Calaculla", "Endovier", "Morath", "Anielle"], bonne: 1, explication: "Les mines de sel d'Endovier, d'où Dorian vient la chercher." },
  { saga: "tog", q: "Quel est le nom de la wyverne de Manon Blackbeak ?", choix: ["Narene", "Abraxos", "Titus", "Syrinx"], bonne: 1, explication: "Abraxos, wyverne couverte de cicatrices qui aime les fleurs. Narene est celle d'Asterin." },
  { saga: "tog", q: "En quel animal Rowan Whitethorn se transforme-t-il ?", choix: ["Un loup", "Un lion", "Un faucon", "Un cerf"], bonne: 2, explication: "Un faucon. Fenrys et Connall sont des loups, Gavriel un lion." },
  { saga: "tog", q: "Quel élément maîtrise Celaena ?", choix: ["La glace", "Le feu", "L'eau", "Les ombres"], bonne: 1, explication: "Le feu, héritage de la déesse Mala Porteuse-de-Feu. [[Normal, puisqu'elle est en réalité Aelin Galathynius.]]" },
  { saga: "tog", q: "Qui est le roi des assassins de Rifthold ?", choix: ["Arobynn Hamel", "Rolfe", "Cain", "Sam Cortland"], bonne: 0, explication: "Arobynn Hamel, mentor manipulateur de Celaena." },
  { saga: "tog", q: "Dans quelle ville se trouve la Torre Cesme ?", choix: ["Doranelle", "Orynth", "Antica", "Banjali"], bonne: 2, explication: "À Antica, capitale du Khaganat, sur le Continent du Sud." },
  { saga: "tog", q: "Quel tome se déroule en même temps qu'*Empire of Storms* ?", choix: ["Heir of Fire", "Tower of Dawn", "Kingdom of Ash", "Queen of Shadows"], bonne: 1, explication: "*Tower of Dawn*, centré sur Chaol et Yrene. On conseille de les lire « en tandem »." },
  { saga: "tog", q: "Comment s'appelle l'unité d'élite de Manon ?", choix: ["Les Douze", "La Treize", "Le Cadre", "Les Rukhin"], bonne: 1, explication: "La Treize (the Thirteen)." },
  { saga: "tog", q: "Quel est le nom de famille de Chaol ?", choix: ["Havilliard", "Westfall", "Ashryver", "Lochan"], bonne: 1, explication: "Chaol Westfall, héritier d'Anielle." },

  /* --- ACOTAR --- */
  { saga: "acotar", q: "Quel animal Feyre tue-t-elle au début du premier tome ?", choix: ["Un cerf", "Un loup", "Un ours", "Un renard"], bonne: 1, explication: "Un loup… qui était un Fae déguisé." },
  { saga: "acotar", q: "Comment s'appelle la ville secrète de la Cour de la Nuit ?", choix: ["Adriata", "Velaris", "Windhaven", "Lunathion"], bonne: 1, explication: "Velaris, la Cité de la Lumière des Étoiles." },
  { saga: "acotar", q: "Quelle est l'arme d'Azriel ?", choix: ["Goldryn", "Truth-Teller", "L'Épée-Étoile", "Damaris"], bonne: 1, explication: "La dague Truth-Teller (Dis-Vérité)." },
  { saga: "acotar", q: "Combien y a-t-il de Cours à Prythian ?", choix: ["Quatre", "Cinq", "Sept", "Neuf"], bonne: 2, explication: "Sept : Printemps, Été, Automne, Hiver, Aube, Jour et Nuit." },
  { saga: "acotar", q: "Qui est le Grand Seigneur de la Cour de l'Été ?", choix: ["Helion", "Tarquin", "Kallias", "Thesan"], bonne: 1, explication: "Tarquin, dont la capitale est Adriata." },
  { saga: "acotar", q: "Quelle sœur Archeron est l'héroïne d'*A Court of Silver Flames* ?", choix: ["Feyre", "Elain", "Nesta", "Mor"], bonne: 2, explication: "Nesta, avec Cassian." },
  { saga: "acotar", q: "Quel pouvoir particulier a Rhysand ?", choix: ["Il lit et contrôle les esprits", "Il contrôle l'eau", "Il guérit", "Il voit l'avenir"], bonne: 0, explication: "C'est un daemati." },
  { saga: "acotar", q: "Qui tenait sa cour Sous la Montagne ?", choix: ["Le roi d'Hybern", "Amarantha", "La Tisseuse", "Ianthe"], bonne: 1, explication: "Amarantha, générale d'Hybern." },
  { saga: "acotar", q: "Quel est le métier ou la passion de Feyre ?", choix: ["Musicienne", "Peintre", "Couturière", "Guérisseuse"], bonne: 1, explication: "Elle peint, en plus d'être chasseuse." },

  /* --- Crescent City --- */
  { saga: "cc", q: "Comment s'appelle l'animal de compagnie de Bryce ?", choix: ["Lehabah", "Syrinx", "Abraxos", "Fleetfoot"], bonne: 1, explication: "Syrinx, une petite chimère. Lehabah est la sprite de feu de la galerie." },
  { saga: "cc", q: "Quel surnom porte Hunt Athalar ?", choix: ["La Biche", "Le Marteau", "L'Ombre de la Mort", "Le Loup de Terrasen"], bonne: 2, explication: "Umbra Mortis, l'Ombre de la Mort." },
  { saga: "cc", q: "Sur quel fleuve se trouve Lunathion ?", choix: ["La Sidra", "L'Avery", "L'Istros", "Le Styx"], bonne: 2, explication: "L'Istros. La Sidra traverse Velaris et l'Avery, Rifthold." },
  { saga: "cc", q: "Dans quel quartier vivent les Fae de Lunathion ?", choix: ["Moonwood", "Five Roses", "Old Square", "Meat Market"], bonne: 1, explication: "Five Roses (FiRo). Moonwood est le quartier des loups." },
  { saga: "cc", q: "Comment appelle-t-on le rituel où l'on atteint son plein pouvoir ?", choix: ["La Descente", "Le Saut", "L'Éveil", "Le Grand Rite"], bonne: 0, explication: "La Descente (the Drop)." },
  { saga: "cc", q: "Quelle arme porte Ruhn Danaan ?", choix: ["Truth-Teller", "L'Épée-Étoile", "Goldryn", "Un arc"], bonne: 1, explication: "L'Épée-Étoile, l'épée de la reine Theia." },
  { saga: "cc", q: "Qui règne sur Midgard ?", choix: ["Les archanges", "Les Asteri", "Le Sous-Roi", "Les princes de Hel"], bonne: 1, explication: "Les Asteri, depuis la Cité Éternelle." },
  { saga: "cc", q: "Quelle race est Juniper Andromeda ?", choix: ["Faune", "Sorcière", "Louve", "Mer"], bonne: 0, explication: "Juniper est une faune, danseuse de ballet." },

  /* --- Maasverse --- */
  { saga: "multi", q: "Quel lien d'âme existe dans les trois sagas ?", choix: ["Le carranam", "Le lien de compagnons", "Le marché magique", "Le halo"], bonne: 1, explication: "Le lien de compagnons (mating bond)." },
  { saga: "multi", q: "Quelle déesse de la lune et de la chasse fait écho à Luna (CC) dans TOG ?", choix: ["Mala", "Anneith", "Deanna", "Silba"], bonne: 2, explication: "Deanna, sœur de Mala." },
  { saga: "multi", q: "À la fin de quel livre Bryce arrive-t-elle dans un autre monde ?", choix: ["House of Earth and Blood", "House of Sky and Breath", "House of Flame and Shadow", "A Court of Silver Flames"], bonne: 1, explication: "À la fin de *House of Sky and Breath* : elle atterrit à Prythian." },
  { saga: "multi", q: "Quelle saga peut-on lire de façon totalement indépendante ?", choix: ["Throne of Glass", "Crescent City", "Aucune", "ACOTAR seulement après CC"], bonne: 0, explication: "Throne of Glass. En revanche, il faut avoir lu ACOTAR avant la fin de Crescent City." },
  { saga: "multi", q: "Quel est le nom du monde de Throne of Glass ?", choix: ["Prythian", "Midgard", "Erilea", "Hel"], bonne: 2, explication: "Erilea." },
  { saga: "multi", q: "Quel personnage de Crescent City a le même titre que Beron d'ACOTAR ?", choix: ["Le Sous-Roi", "Le Roi de l'Automne", "Micah", "Rigelus"], bonne: 1, explication: "Le Roi de l'Automne : même feu, même cruauté. Les fans y voient une lignée commune." },
];
