/* Glossaire : races, magie, dieux, objets, vocabulaire.
   saga : "tog" | "acotar" | "cc" | "multi" (commun à plusieurs sagas)
   categorie : Races | Magie | Dieux | Objets | Factions | Vocabulaire */
window.MAAS = window.MAAS || {};
MAAS.glossaire = [
  /* --- Races --- */
  { id: "fae", terme: "Fae", saga: "multi", categorie: "Races", texte: "Êtres immortels aux oreilles pointues et aux canines allongées, présents dans les trois sagas. En TOG, ils peuvent prendre une forme animale (Rowan, faucon) ; dans ACOTAR on distingue Fae Hauts et Fae inférieurs ; dans Crescent City ils forment une aristocratie. [[Les Fae de Midgard viennent de Prythian.]]" },
  { id: "demi-fae", terme: "Demi-Fae", saga: "multi", categorie: "Races", texte: "Né d'un parent fae et d'un parent humain : Aedion et Lorcan (TOG), Bryce (CC). Dans ACOTAR, des humaines deviennent Fae (Feyre, Nesta, Elain)." },
  { id: "fae-hauts", terme: "Fae Hauts / Fae inférieurs", vo: "High Fae / Lesser Fae", saga: "acotar", categorie: "Races", texte: "À Prythian, les Fae Hauts ont une apparence quasi humaine et détiennent le pouvoir ; les Fae inférieurs regroupent toutes les autres créatures féeriques (le Suriel, les pixies, les naga…)." },
  { id: "illyriens", terme: "Illyriens", saga: "acotar", categorie: "Races", texte: "Peuple de guerriers ailés des montagnes de la Cour de la Nuit (Cassian, Azriel, en partie Rhysand). Société guerrière et dure envers les femmes, à qui on coupait les ailes." },
  { id: "sorcieres", terme: "Sorcières", saga: "multi", categorie: "Races", texte: "Ironteeth aux dents de fer et Crochans en TOG ; créatures anciennes et sorciers dans ACOTAR ; sorcières de la Maison de la Terre et du Sang dans CC (Hypaxia, Jesiba)." },
  { id: "ironteeth", terme: "Ironteeth", saga: "tog", categorie: "Races", texte: "Sorcières aux dents et ongles de fer, divisées en clans (Blackbeak, Yellowlegs, Bluebloods). Elles chevauchent des wyvernes pour Morath." },
  { id: "crochans", terme: "Crochans", saga: "tog", categorie: "Races", texte: "Sorcières ennemies des Ironteeth, héritières de l'ancien royaume des sorcières. [[Manon est à moitié Crochan.]]" },
  { id: "valg", terme: "Valg", saga: "tog", categorie: "Races", texte: "Démons venus d'un autre monde, qui possèdent les corps humains à l'aide de colliers et d'anneaux de pierre de Wyrd. Leurs rois sont Erawan, Orcus et Mantyx." },
  { id: "anges", terme: "Anges (malakim) et archanges", saga: "cc", categorie: "Races", texte: "Êtres ailés de Midgard, organisés en légions. Les archanges gouvernent les territoires pour les Asteri ; les anges rebelles (Hunt) sont réduits en esclavage et marqués d'un halo." },
  { id: "asteri", terme: "Asteri", saga: "cc", categorie: "Races", texte: "Les six « étoiles » immortelles qui règnent sur Midgard depuis la Cité Éternelle. [[Ils se nourrissent de la magie des habitants et sont de la même espèce que les Daglan d'ACOTAR.]]" },
  { id: "daglan", terme: "Daglan", saga: "acotar", categorie: "Races", texte: "Anciens tyrans de Prythian, renversés par les Fae, évoqués dans *A Court of Silver Flames*. [[Ce sont les mêmes êtres que les Asteri.]]" },
  { id: "mers", terme: "Mers", saga: "cc", categorie: "Races", texte: "Créatures de l'eau de la Maison des Nombreuses Eaux, capables de passer d'une forme humaine à une forme aquatique (Tharion)." },
  { id: "vampyrs", terme: "Vampyrs", saga: "cc", categorie: "Races", texte: "Buveurs de sang de la Maison de la Flamme et de l'Ombre, nombreux au Meat Market." },
  { id: "hel-demons", terme: "Démons de Hel", saga: "cc", categorie: "Races", texte: "Habitants de Hel, monde voisin de Midgard, gouverné par sept princes. Longtemps présentés comme l'ennemi. [[Ils deviennent des alliés contre les Asteri.]]" },
  { id: "wyverne", terme: "Wyverne", saga: "tog", categorie: "Races", texte: "Grande bête volante montée par les sorcières Ironteeth. Celle de Manon s'appelle Abraxos." },

  /* --- Magie --- */
  { id: "compagnon", terme: "Compagnon, compagne", vo: "mate, mating bond", saga: "multi", categorie: "Magie", texte: "Lien d'âme fae inné entre deux êtres, présent dans les trois sagas : Aelin et Rowan, Feyre et Rhysand, Bryce et Hunt…" },
  { id: "carranam", terme: "Carranam", saga: "tog", categorie: "Magie", texte: "Deux porteurs de magie capables d'unir leurs pouvoirs (Aelin et Rowan)." },
  { id: "wyrdmarks", terme: "Wyrdmarks", saga: "tog", categorie: "Magie", texte: "Symboles anciens qu'on trace, souvent avec du sang, pour ouvrir des portes ou lancer des sorts." },
  { id: "wyrdkeys", terme: "Wyrdkeys", saga: "tog", categorie: "Objets", texte: "Trois clés taillées dans la porte entre les mondes (le Wyrdgate). Qui les réunit contrôle les portes du monde. Le roi d'Adarlan s'en est servi pour supprimer la magie." },
  { id: "verrou", terme: "Le Verrou", vo: "the Lock", saga: "tog", categorie: "Objets", texte: "Objet créé par la déesse Mala pour sceller le Wyrdgate. [[Aelin en forge un nouveau dans *Kingdom of Ash*.]]" },
  { id: "daemati", terme: "Daemati", saga: "acotar", categorie: "Magie", texte: "Être capable de lire et de manipuler les esprits. Rhysand en est un." },
  { id: "siphons", terme: "Siphons", saga: "acotar", categorie: "Objets", texte: "Pierres portées par les guerriers illyriens pour canaliser leur pouvoir." },
  { id: "marche", terme: "Marché magique", vo: "bargain", saga: "acotar", categorie: "Magie", texte: "Accord magique qui lie littéralement les deux parties, comme le tatouage de Feyre sur la main et le bras." },
  { id: "grand-seigneur", terme: "Grand Seigneur, Grande Dame", vo: "High Lord, High Lady", saga: "acotar", categorie: "Factions", texte: "Souverain d'une des sept Cours de Prythian, qui détient la puissance de sa terre, transmise à son successeur." },
  { id: "descente", terme: "La Descente", vo: "the Drop", saga: "cc", categorie: "Magie", texte: "Rituel où un être magique atteint son plein pouvoir ; il y perd brièvement la vie et doit être ramené par un Ancre." },
  { id: "firstlight", terme: "Lumière première", vo: "firstlight", saga: "cc", categorie: "Magie", texte: "Énergie produite lors de la Descente, qui alimente la ville (électricité, technologie). [[Les Asteri s'en nourrissent.]]" },
  { id: "secondlight", terme: "Lumière seconde", vo: "secondlight", saga: "cc", categorie: "Magie", texte: "Énergie libérée par les morts." },
  { id: "etoile", terme: "Étoilé", vo: "Starborn", saga: "cc", categorie: "Magie", texte: "Fae porteur de la lumière des étoiles, lignée de la reine Theia (Ruhn, Bryce)." },
  { id: "maisons", terme: "Les Maisons", vo: "Houses", saga: "cc", categorie: "Factions", texte: "Les quatre grandes catégories de citoyens de Midgard : Terre et Sang (métamorphes, humains, sorcières), Ciel et Souffle (anges, Fae, élémentaires), Nombreuses Eaux (créatures de l'eau), Flamme et Ombre (daemonaki, faucheurs, vampyrs). Les titres des tomes viennent de là." },

  /* --- Dieux --- */
  { id: "mala", terme: "Mala Porteuse-de-Feu", saga: "tog", categorie: "Dieux", texte: "Déesse du soleil et du feu, ancêtre de la lignée d'Aelin." },
  { id: "deanna", terme: "Deanna", saga: "tog", categorie: "Dieux", texte: "Déesse de la chasse et de la lune, sœur de Mala. Écho de Luna dans Crescent City." },
  { id: "anneith", terme: "Anneith", saga: "tog", categorie: "Dieux", texte: "Déesse de la sagesse et de la mort douce, protectrice d'Elide." },
  { id: "trois-visages", terme: "La Déesse aux Trois Visages", saga: "tog", categorie: "Dieux", texte: "Divinité des sorcières : la Jeune Fille, la Mère et la Vieille." },
  { id: "chaudron", terme: "Le Chaudron", vo: "the Cauldron", saga: "acotar", categorie: "Dieux", texte: "Origine de toute magie, créateur du monde de Prythian. Il transforme ceux qu'on y plonge. [[Nesta et Elain y sont plongées dans *ACOMAF*.]]" },
  { id: "mere", terme: "La Mère", vo: "the Mother", saga: "acotar", categorie: "Dieux", texte: "Divinité créatrice de Prythian. On dit des morts qu'ils rejoignent le Chaudron." },
  { id: "cthona", terme: "Cthona", saga: "cc", categorie: "Dieux", texte: "Déesse de la terre, déesse-mère de Midgard." },
  { id: "luna", terme: "Luna", saga: "cc", categorie: "Dieux", texte: "Déesse de la lune et de la chasse. La Corne de Luna porte son nom." },
  { id: "solas", terme: "Solas", saga: "cc", categorie: "Dieux", texte: "Dieu du soleil de Midgard. Écho de Mala dans TOG." },
  { id: "ogenas", terme: "Ogenas", saga: "cc", categorie: "Dieux", texte: "Déesse de l'océan." },
  { id: "urd", terme: "Urd", saga: "cc", categorie: "Dieux", texte: "Déesse du destin." },

  /* --- Objets --- */
  { id: "epee-etoile", terme: "L'Épée-Étoile", vo: "Starsword, Gwydion", saga: "cc", categorie: "Objets", texte: "L'épée de la reine Theia, portée par Ruhn puis par Bryce. [[Elle est jumelle de Truth-Teller, la dague d'Azriel.]]" },
  { id: "truth-teller", terme: "Truth-Teller (Dis-Vérité)", saga: "multi", categorie: "Objets", texte: "La dague d'Azriel (ACOTAR). [[Forgée dans le même métal que l'Épée-Étoile ; une prophétie dit que quand l'épée et le couteau seront réunis, leur peuple le sera aussi. Bryce l'emporte à Midgard.]]" },
  { id: "corne", terme: "La Corne de Luna", saga: "cc", categorie: "Objets", texte: "Instrument ancien capable d'ouvrir des portails entre les mondes. [[Elle est tatouée dans le dos de Bryce.]]" },
  { id: "tresors", terme: "Les Trésors Maudits", vo: "Dread Trove", saga: "acotar", categorie: "Objets", texte: "Trois objets forgés par le Chaudron : le **Masque** (relève les morts), la **Harpe** et la **Couronne**. Au cœur d'*A Court of Silver Flames*. [[Le Masque compte aussi dans *House of Flame and Shadow*.]]" },
  { id: "livre-souffles", terme: "Le Livre des Souffles", vo: "Book of Breathings", saga: "acotar", categorie: "Objets", texte: "Livre de sorts dont les moitiés sont gardées par la Cour de l'Été et les reines humaines ; il permet d'annuler le pouvoir du Chaudron." },
  { id: "ouroboros", terme: "L'Ouroboros", saga: "acotar", categorie: "Objets", texte: "Miroir ancien qui montre à chacun ce qu'il est vraiment." },
  { id: "goldryn", terme: "Goldryn", saga: "tog", categorie: "Objets", texte: "L'épée ancestrale d'Aelin, ornée d'un rubis." },
  { id: "colliers", terme: "Colliers et anneaux de Wyrd", saga: "tog", categorie: "Objets", texte: "Bijoux de pierre noire qui permettent aux princes Valg de posséder un humain." },

  /* --- Factions et lieux-concepts --- */
  { id: "cercle-intime", terme: "Le Cercle intime", vo: "Inner Circle", saga: "acotar", categorie: "Factions", texte: "La famille choisie de Rhysand : Cassian, Azriel, Mor, Amren, puis Feyre (et ses sœurs)." },
  { id: "valkyries", terme: "Valkyries", saga: "acotar", categorie: "Factions", texte: "Ancien ordre de guerrières humaines, refondé par Nesta, Gwyneth et Emerie dans *A Court of Silver Flames*. Il donne son nom au Valkyrie Cycle." },
  { id: "la-treize", terme: "La Treize", vo: "the Thirteen", saga: "tog", categorie: "Factions", texte: "L'unité d'élite de Manon : treize sorcières et leurs wyvernes, liées jusqu'à la mort." },
  { id: "cadre", terme: "Le cadre de Maeve", saga: "tog", categorie: "Factions", texte: "Les guerriers liés par le sang à la reine Maeve : Rowan, Lorcan, Gavriel, Fenrys, Connall, Vaughan." },
  { id: "ophion", terme: "Ophion", saga: "cc", categorie: "Factions", texte: "La rébellion humaine contre la République et les Asteri." },
  { id: "triarii", terme: "Triarii", saga: "cc", categorie: "Factions", texte: "La garde rapprochée d'un archange (Pollux, Baxian, Mordoc pour Sandriel)." },
  { id: "aux", terme: "Aux", saga: "cc", categorie: "Factions", texte: "Les Auxiliaires de la ville de Lunathion, dont les Fae de Ruhn." },

  /* --- Vocabulaire --- */
  { id: "maasverse", terme: "Maasverse", saga: "multi", categorie: "Vocabulaire", texte: "Le nom que fans et presse donnent à l'ensemble des sagas de Sarah J. Maas, un multivers relié par des portails et une cosmologie commune." },
  { id: "wyrdgate", terme: "Wyrdgate", saga: "tog", categorie: "Vocabulaire", texte: "La porte entre les mondes d'Erilea, par laquelle les Valg sont arrivés." },
  { id: "faille", terme: "La Faille du Nord", vo: "Northern Rift", saga: "cc", categorie: "Vocabulaire", texte: "Passage entre Midgard et Hel, dans la région de Nena." },
  { id: "mur", terme: "Le Mur", vo: "the Wall", saga: "acotar", categorie: "Vocabulaire", texte: "Barrière magique qui séparait Prythian des terres humaines. [[Il tombe à la fin d'*A Court of Wings and Ruin*.]]" },
  { id: "romantasy", terme: "Romantasy", saga: "multi", categorie: "Vocabulaire", texte: "Genre qui mêle romance et fantasy, dont Sarah J. Maas est l'une des figures majeures." },
];
