# Site Maasverse

Site de fan statique (HTML, CSS, JavaScript, sans framework). Ouvrir `index.html` dans un navigateur suffit.

## Organisation

- `index.html` : l'accueil, avec les trois portails animés et la 4e section « Multivers »
- `tog.html`, `acotar.html`, `cc.html` : une page par univers (livres, À savoir, personnages, carte, glossaire, quiz en onglets)
- `liens.html`, `chronologie.html`, `sagas.html` (ordre de lecture), `glossaire.html`, `quiz.html`, `actus.html` : les pages du Multivers
- `assets/css/style.css` : tout le style (couleurs des sagas en haut du fichier)
- `assets/js/app.js` : en-tête, menu, recherche, spoilers, emplacements de fan art
- `assets/js/carte.js` : moteur des cartes (zoom, déplacement)
- `assets/js/scenes.js` : les trois tableaux dessinés en SVG (portails et bannières)
- `assets/js/pages/` : le script propre à chaque page
- `assets/js/data/` : **tout le contenu**, à modifier sans toucher au HTML
  - `livres.js`, `personnages.js`, `cartes.js`, `glossaire.js`, `quiz.js`, `chronologie.js`, `fanarts.js`
  - `livres-textes.js` : accroche, quatrième de couverture et rappel « À savoir » de chaque tome
  - `personnalites-tog.js`, `-acotar.js`, `-cc.js` : traits, caractère, ce que chaque personnage aime et n'aime pas

Dans les textes : `**gras**`, `*italique*`, et `[[texte]]` pour masquer un spoiler.

## Ajouter un fan art

1. Déposer l'image dans `assets/img/fanart/` (jpg/webp, < 500 Ko).
2. Personnage : dans `personnages.js`, remplir `image: "assets/img/fanart/aelin.jpg"` et `credit: "@artiste"`.
   Accueil, sagas, liens : même chose dans `fanarts.js`.

## Mise en ligne (GitHub Pages)

Mettre le contenu de ce dossier à la racine d'un dépôt GitHub, puis Settings → Pages → branche `main`, dossier `/`.
