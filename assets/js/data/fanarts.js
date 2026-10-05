/* Fan arts des pages (accueil, sagas, liens…).
   Les fan arts des PERSONNAGES se renseignent directement dans personnages.js (champs image et credit).

   Pour ajouter un fan art :
   1. déposer l'image dans assets/img/fanart/ (ex. assets/img/fanart/accueil.jpg)
   2. remplir image et credit ci-dessous
   3. toujours créditer l'artiste (pseudo + lien si possible) */
window.MAAS = window.MAAS || {};
MAAS.fanarts = {
  "accueil":      { image: "", credit: "", alt: "Fan art à la une" },
  "saga-tog":     { image: "", credit: "", alt: "Fan art Throne of Glass" },
  "saga-acotar":  { image: "", credit: "", alt: "Fan art ACOTAR" },
  "saga-cc":      { image: "", credit: "", alt: "Fan art Crescent City" },
  "liens":        { image: "", credit: "", alt: "Fan art crossover" },
};
