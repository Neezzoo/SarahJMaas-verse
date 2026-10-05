/* Page « Personnages » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const P = M.personnages;
  const parId = {};
  P.forEach(function (p) { parId[p.id] = p; });
  const filtres = { saga: "", role: "", famille: "", texte: "" };

  const galerie = document.getElementById("galerie");
  const selFamille = document.getElementById("filtreFamille");
  const familles = Array.from(new Set(P.map(function (p) { return p.famille; }))).sort(function (a, b) { return a.localeCompare(b, "fr"); });
  selFamille.innerHTML += familles.map(function (f) { return '<option value="' + f + '">' + f + "</option>"; }).join("");

  function vignette(p) {
    return '<button class="perso ' + p.saga + '" data-id="' + p.id + '">' +
      M.fanart({ image: p.image, credit: p.credit, alt: p.nom, initiales: p.image ? "" : M.initiales(p.nom) }) +
      '<div class="infos"><div class="nom">' + M.echap(p.nom) + "</div>" +
      '<div class="sous">' + M.SAGAS[p.saga].court + " · " + M.echap(p.race) + "</div></div></button>";
  }

  function afficher() {
    const q = M.sansAccent(filtres.texte);
    const liste = P.filter(function (p) {
      return (!filtres.saga || p.saga === filtres.saga) &&
        (!filtres.role || p.role === filtres.role) &&
        (!filtres.famille || p.famille === filtres.famille) &&
        (!q || M.sansAccent([p.nom, p.alias, p.motscles, p.race, p.affiliation, p.pouvoirs].join(" ")).indexOf(q) !== -1);
    });
    galerie.innerHTML = liste.length ? liste.map(vignette).join("") : '<p class="meta">Aucun personnage ne correspond.</p>';
    document.getElementById("compte").textContent = liste.length + " personnage" + (liste.length > 1 ? "s" : "");
  }

  document.querySelectorAll("[data-filtre]").forEach(function (b) {
    b.addEventListener("click", function () {
      filtres[b.dataset.filtre] = b.dataset.valeur;
      document.querySelectorAll('[data-filtre="' + b.dataset.filtre + '"]').forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      afficher();
    });
  });
  selFamille.addEventListener("change", function () { filtres.famille = selFamille.value; afficher(); });
  document.getElementById("filtreTexte").addEventListener("input", function (e) { filtres.texte = e.target.value; afficher(); });

  /* ---------- Fiche détaillée ---------- */
  const modale = document.getElementById("modale");
  const fiche = document.getElementById("fiche");

  function ouvrirFiche(id) {
    const p = parId[id];
    if (!p) return;
    const liens = (p.liens || []).filter(function (l) { return parId[l[0]]; }).map(function (l) {
      return '<button data-id="' + l[0] + '">' + M.echap(parId[l[0]].nom) + ' <span class="meta">· ' + M.riche(l[1]) + "</span></button>";
    }).join("");
    fiche.innerHTML =
      M.fanart({ image: p.image, credit: p.credit, alt: p.nom, initiales: p.image ? "" : M.initiales(p.nom) }) +
      '<div class="contenu fiche">' + M.badge(p.saga) + ' <span class="meta">' + (p.role === "principal" ? "Personnage principal" : "Personnage secondaire") + "</span>" +
      '<h2 style="margin:10px 0 2px">' + M.echap(p.nom) + "</h2>" +
      (p.alias ? '<p class="meta">Aussi appelé·e : ' + M.echap(p.alias) + "</p>" : "") +
      "<p>" + M.riche(p.resume) + "</p>" +
      (p.spoiler ? '<div class="spoiler">' + M.riche(p.spoiler) + "</div>" : "") +
      "<dl><dt>Race</dt><dd>" + M.echap(p.race) + "</dd>" +
      "<dt>Affiliation</dt><dd>" + M.echap(p.affiliation) + "</dd>" +
      "<dt>Pouvoirs</dt><dd>" + M.echap(p.pouvoirs) + "</dd>" +
      "<dt>1re apparition</dt><dd><em>" + M.echap(p.apparition) + "</em></dd></dl>" +
      (liens ? '<p class="meta">Liens</p><div class="liens-perso">' + liens + "</div>" : "") +
      "</div>";
    fiche.querySelector(".contenu").scrollTop = 0;
    if (!modale.open) modale.showModal();
    history.replaceState(null, "", "#" + id);
  }

  galerie.addEventListener("click", function (e) {
    const b = e.target.closest(".perso");
    if (b) ouvrirFiche(b.dataset.id);
  });
  fiche.addEventListener("click", function (e) {
    if (e.target.closest(".spoiler:not(.revele)") && !document.body.classList.contains("spoilers-reveles")) return;
    const b = e.target.closest(".liens-perso button");
    if (b) ouvrirFiche(b.dataset.id);
  });
  function fermer() { modale.close(); }
  document.getElementById("fermerModale").addEventListener("click", fermer);
  modale.addEventListener("click", function (e) { if (e.target === modale) fermer(); });
  modale.addEventListener("close", function () { history.replaceState(null, "", location.pathname + location.search); });

  /* ---------- Couples ---------- */
  document.getElementById("couples").innerHTML = M.couples.map(function (c) {
    const a = parId[c.a], b = parId[c.b];
    const noms = "<strong>" + M.echap(a.nom) + "</strong> &amp; <strong>" + M.echap(b.nom) + "</strong>";
    return '<div class="couple">' + M.badge(c.saga) + '<p style="margin:8px 0 0">' +
      (c.spoiler ? '<span class="spoiler">' + noms + ' <span class="meta">« ' + M.echap(c.surnom) + " »</span></span>"
        : noms + ' <span class="meta">« ' + M.echap(c.surnom) + " »</span>") + "</p></div>";
  }).join("");

  afficher();
  const cible = location.hash.slice(1);
  if (cible && parId[cible]) ouvrirFiche(cible);
  window.addEventListener("hashchange", function () {
    const id = location.hash.slice(1);
    if (parId[id]) ouvrirFiche(id);
  });
});
