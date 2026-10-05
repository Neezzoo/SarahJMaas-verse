# Site Maasverse

Site de fan statique (HTML, CSS, JavaScript, sans framework). Ouvrir `index.html` dans un navigateur suffit.

## Organisation

- `*.html` : les 9 pages (accueil, sagas, cartes, personnages, liens, chronologie, quiz, glossaire, actus)
- `assets/css/style.css` : tout le style (couleurs des sagas en haut du fichier)
- `assets/js/app.js` : en-tête, menu, recherche, spoilers, emplacements de fan art
- `assets/js/carte.js` : moteur des cartes (zoom, déplacement)
- `assets/js/pages/` : le script propre à chaque page
- `assets/js/data/` : **tout le contenu**, à modifier sans toucher au HTML
  - `livres.js`, `personnages.js`, `cartes.js`, `glossaire.js`, `quiz.js`, `chronologie.js`, `fanarts.js`

Dans les textes : `**gras**`, `*italique*`, et `[[texte]]` pour masquer un spoiler.

## Ajouter un fan art

1. Déposer l'image dans `assets/img/fanart/` (jpg/webp, < 500 Ko).
2. Personnage : dans `personnages.js`, remplir `image: "assets/img/fanart/aelin.jpg"` et `credit: "@artiste"`.
   Accueil, sagas, liens : même chose dans `fanarts.js`.

## Mise en ligne (GitHub Pages)

Mettre le contenu de ce dossier à la racine d'un dépôt GitHub, puis Settings → Pages → branche `main`, dossier `/`.
