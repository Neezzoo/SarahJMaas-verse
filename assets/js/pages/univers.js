/* Pages « univers » : tog.html, acotar.html, cc.html
   Une page par monde, avec ses rubriques en onglets :
   livres, à savoir, personnages, carte, glossaire, quiz.
   Adresses : #livres, #livre-tog3, #a-savoir, #personnages, #perso-rowan,
   #carte, #carte/lunathion/comitium, #glossaire, #glossaire/wyrdmarks, #quiz */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const M = window.MAAS;
  const S = document.body.dataset.univers;

  const UNIVERS = {
    tog: {
      monde: "Erilea", titre: 'Throne <span class="petit">of</span> Glass',
      genre: "Fantasy épique · 8 livres · saga terminée",
      devise: "Une assassine. Un trône de verre. Un feu que rien n'éteint.",
      pitch: "Dans un royaume où la magie s'est tue, une assassine de dix-huit ans sort des mines de sel d'Endovier, les poignets encore marqués par les fers. On lui offre la liberté contre une épée au service du roi qu'elle hait. Mais sous le château de verre dorment des secrets plus anciens que les couronnes, et le feu qu'elle croyait mort n'a jamais cessé de brûler.",
      cartes: ["erilea"],
      conseil: "**Throne of Glass** se lit seule, sans rien connaître des autres sagas. Lisez *Tower of Dawn* en même temps qu'*Empire of Storms* : les deux histoires se déroulent en parallèle.",
    },
    acotar: {
      monde: "Prythian", titre: 'A Court <span class="petit">of</span> Thorns <span class="petit">and</span> Roses',
      genre: "Romantasy adulte · saga en cours",
      devise: "Au-delà du Mur, les monstres portent des couronnes.",
      pitch: "Au-delà du Mur vivent les Fae : immortels, splendides, et cruels. Feyre Archeron chasse pour que sa famille ne meure pas de faim, jusqu'au jour où sa flèche abat un loup qui n'en était pas un. Le prix du sang l'entraîne à Prythian, terre de cours enchantées où une malédiction ronge tout. Là-bas, les plus beaux visages cachent les pires crocs, et l'amour peut devenir la plus dangereuse des épreuves.",
      cartes: ["prythian"],
      conseil: "Romans adultes dès le tome 2 (scènes explicites, violence, traumatismes). Lisez les tomes 1 à 3.5 **avant** *House of Earth and Blood*, et tout ACOTAR **avant** *House of Sky and Breath*.",
    },
    cc: {
      monde: "Midgard", titre: "Crescent City",
      genre: "Urban fantasy adulte · saga en cours",
      devise: "Sous le croissant de lune, même les anges tombent.",
      pitch: "Lunathion ne dort jamais : les anges patrouillent son ciel, les loups règnent sur ses rues et les Fae y vivent en seigneurs. Bryce Quinlan, demi-Fae, croyait sa vie faite de fêtes et de nuits sans fin, jusqu'au meurtre qui lui a tout arraché. Deux ans plus tard, quand le sang coule de nouveau, elle doit faire équipe avec un ange déchu au passé de sang. Et sous le croissant de lune, la vérité menace d'embraser la ville entière.",
      cartes: ["midgard", "lunathion"],
      conseil: "Le tome 2, *House of Sky and Breath*, se termine sur un crossover : **lisez ACOTAR avant**, au moins jusqu'à *A Court of Silver Flames*.",
    },
  };
  const U = UNIVERS[S];
  const T = M.textesLivres || {};
  const PERSO = M.personnalites || {};
  const LIVRES = M.livres.filter(function (l) { return l.saga === S; });
  const persos = M.personnages.filter(function (p) { return p.saga === S; });
  const parId = {};
  M.personnages.forEach(function (p) { parId[p.id] = p; });

  /* ---------- Bannière ---------- */
  document.getElementById("banniere").innerHTML =
    '<div class="banniere-scene">' + M.scene(S) + "</div>" +
    '<div class="conteneur banniere-texte">' +
    '<p class="surtitre"><a href="index.html">Accueil</a> <span aria-hidden="true">✦</span> Le monde ' + (U.monde === "Erilea" ? "d'" : "de ") + U.monde + "</p>" +
    "<h1>" + U.titre + "</h1>" +
    '<p class="devise">' + U.devise + "</p>" +
    '<p class="pitch">' + M.riche(U.pitch) + "</p>" +
    '<p class="meta">' + U.genre + " · " + persos.length + " personnages</p></div>";

  /* ---------- Onglets ---------- */
  const ONGLETS = [
    { id: "livres", titre: "Les livres" },
    { id: "a-savoir", titre: "À savoir" },
    { id: "personnages", titre: "Personnages" },
    { id: "carte", titre: U.cartes.length > 1 ? "Cartes" : "Carte" },
    { id: "glossaire", titre: "Glossaire" },
    { id: "quiz", titre: "Quiz" },
  ];
  const barre = document.getElementById("sousNav");
  barre.innerHTML = '<div class="conteneur"><div class="sous-nav-liste" role="tablist">' + ONGLETS.map(function (o) {
    return '<a role="tab" href="#' + o.id + '" data-onglet="' + o.id + '" aria-selected="false">' + o.titre + "</a>";
  }).join("") + "</div></div>";

  const prets = {};
  let ongletActif = null;
  function montrer(id, defiler) {
    if (!document.getElementById("panneau-" + id)) id = "livres";
    ONGLETS.forEach(function (o) { document.getElementById("panneau-" + o.id).hidden = o.id !== id; });
    barre.querySelectorAll("[data-onglet]").forEach(function (a) { a.setAttribute("aria-selected", a.dataset.onglet === id); });
    const lien = barre.querySelector('[data-onglet="' + id + '"]');
    if (lien && lien.scrollIntoView) lien.parentNode.scrollLeft = lien.offsetLeft - 40;
    if (!prets[id]) { prets[id] = true; CONSTRUIRE[id](); }
    if (id === "carte" && carte && ongletActif !== "carte") carte.reinitialiser();
    ongletActif = id;
    if (defiler) {
      const haut = barre.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: haut });
    }
  }

  /* ---------- Livres ---------- */
  function titreCouverture(t) { return M.echap(t).replace(/\b(of|and)\b/g, '<span class="petit">$1</span>'); }
  function assombrir(hex) {
    const n = parseInt(hex.slice(1), 16);
    return "rgb(" + Math.round(((n >> 16) & 255) * 0.45) + "," + Math.round(((n >> 8) & 255) * 0.45) + "," + Math.round((n & 255) * 0.45) + ")";
  }
  function paragraphes(t) {
    return String(t || "").split(/\n\n+/).map(function (p) { return "<p>" + M.riche(p) + "</p>"; }).join("");
  }
  function construireLivres() {
    const p = document.getElementById("panneau-livres");
    const fa = M.fanarts["saga-" + S] || {};
    p.innerHTML = '<div class="etageres" id="etagere">' + LIVRES.map(function (l) {
      return '<button class="livre' + (l.aVenir ? " a-venir" : "") + '" data-livre="' + l.id + '" style="background:linear-gradient(170deg,' + l.couleur + "," + assombrir(l.couleur) + ')" aria-pressed="false">' +
        '<span class="num">' + (/^\d/.test(l.num) ? "TOME " : "") + l.num + "</span>" +
        '<span class="titre">' + titreCouverture(l.vo) + "</span>" +
        '<span><span class="vf">' + M.echap(l.vf) + '</span><br><span class="annee">' + (l.date || l.annee) + "</span></span></button>";
    }).join("") + "</div>" +
      '<div class="livre-ouvert" id="livreOuvert"></div>' +
      '<div class="univers-bas"><p class="alerte">' + M.riche(U.conseil) + ' <a href="sagas.html#ordre">Voir l\'ordre de lecture complet</a>.</p>' +
      M.fanart({ image: fa.image, credit: fa.credit, label: "Fan art à venir", classe: "fanart-saga" }) + "</div>";
    p.addEventListener("click", function (e) {
      const b = e.target.closest("[data-livre]");
      if (b) { ouvrirLivre(b.dataset.livre); history.replaceState(null, "", "#livre-" + b.dataset.livre); }
    });
    ouvrirLivre(LIVRES[0].id);
  }
  function ouvrirLivre(id, defiler) {
    const l = LIVRES.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    const t = T[id] || {};
    const i = LIVRES.indexOf(l), suivant = LIVRES[i + 1];
    document.querySelectorAll("[data-livre]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.livre === id); });
    document.getElementById("livreOuvert").innerHTML =
      '<article class="quatrieme" style="--teinte:' + l.couleur + '">' +
      '<div class="quatrieme-couv" style="background:linear-gradient(170deg,' + l.couleur + "," + assombrir(l.couleur) + ')">' +
      '<span class="num">' + (/^\d/.test(l.num) ? "TOME " : "") + l.num + '</span><span class="titre">' + titreCouverture(l.vo) + '</span><span class="auteur">SARAH J. MAAS</span></div>' +
      '<div class="quatrieme-texte">' +
      '<p class="meta">' + (l.aVenir ? "À paraître · " + l.date : l.annee) + " · VF : " + M.echap(l.vf) + "</p>" +
      "<h2>" + M.echap(l.vo) + "</h2>" +
      (t.accroche ? '<p class="accroche">' + M.riche(t.accroche) + "</p>" : "") +
      '<div class="texte-quatrieme">' + paragraphes(t.quatrieme || l.resume) + "</div>" +
      ((t.rappel || []).length && suivant ? '<a class="btn secondaire" href="#a-savoir" data-rappel="' + l.id + '">À savoir avant ' + M.echap(suivant.vo) + " →</a>" : "") +
      "</div></article>";
    if (defiler) document.getElementById("livreOuvert").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  document.addEventListener("click", function (e) {
    const r = e.target.closest("[data-rappel]");
    if (!r) return;
    e.preventDefault();
    history.replaceState(null, "", "#a-savoir");
    montrer("a-savoir");
    const c = document.getElementById("rappel-" + r.dataset.rappel);
    if (c) c.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- À savoir ---------- */
  function construireASavoir() {
    const p = document.getElementById("panneau-a-savoir");
    let html = '<div class="titre-section"><p class="eyebrow">Se rappeler</p><h2>Avant d\'ouvrir le tome suivant</h2>' +
      "<p>Une pause entre deux livres ? Voici l'essentiel à retenir de chaque tome. Chaque rappel dévoile tout le livre concerné : ouvrez seulement celui dont vous avez besoin.</p></div>";
    html += '<ol class="rappels">';
    LIVRES.forEach(function (l, i) {
      const t = T[l.id] || {}, suivant = LIVRES[i + 1];
      if (!(t.rappel || []).length || !suivant) return;
      html += '<li class="rappel" id="rappel-' + l.id + '" style="--teinte:' + l.couleur + '">' +
        '<div class="rappel-tete"><span class="rappel-num">' + suivant.num + '</span><div><p class="meta">Avant de lire</p>' +
        "<h3>" + M.echap(suivant.vo) + '</h3><p class="meta">il faut se rappeler de <em>' + M.echap(l.vo) + "</em></p></div></div>" +
        '<div class="spoiler"><ul>' + t.rappel.map(function (x) { return "<li>" + M.riche(x) + "</li>"; }).join("") + "</ul></div></li>";
    });
    html += "</ol>";
    p.innerHTML = html;
  }

  /* ---------- Personnages ---------- */
  const filtres = { role: "", texte: "" };
  function vignette(p) {
    return '<button class="perso ' + p.saga + '" data-perso="' + p.id + '">' +
      M.fanart({ image: p.image, credit: p.credit, alt: p.nom, initiales: p.image ? "" : M.initiales(p.nom) }) +
      '<div class="infos"><div class="nom">' + M.echap(p.nom) + "</div>" +
      '<div class="sous">' + M.echap(p.race) + "</div></div></button>";
  }
  function afficherGalerie() {
    const q = M.sansAccent(filtres.texte);
    const liste = persos.filter(function (p) {
      return (!filtres.role || p.role === filtres.role) &&
        (!q || M.sansAccent([p.nom, p.alias, p.motscles, p.race, p.affiliation, p.pouvoirs].join(" ")).indexOf(q) !== -1);
    });
    document.getElementById("galerie").innerHTML = liste.length ? liste.map(vignette).join("") : '<p class="meta">Aucun personnage ne correspond.</p>';
    document.getElementById("compte").textContent = liste.length + " personnage" + (liste.length > 1 ? "s" : "");
  }
  function construirePersonnages() {
    const p = document.getElementById("panneau-personnages");
    const couples = (M.couples || []).filter(function (c) { return c.saga === S && parId[c.a] && parId[c.b]; });
    p.innerHTML =
      '<div class="barre-filtres"><div class="groupe" role="group" aria-label="Rôle">' +
      '<button class="puce" data-role="" aria-pressed="true">Tous</button>' +
      '<button class="puce" data-role="principal" aria-pressed="false">Principaux</button>' +
      '<button class="puce" data-role="secondaire" aria-pressed="false">Secondaires</button></div>' +
      '<div class="groupe"><label class="visuellement-cache" for="filtreTexte">Chercher un personnage</label>' +
      '<input class="champ" id="filtreTexte" type="search" placeholder="Chercher un nom, une cour…"></div>' +
      '<span class="compte" id="compte"></span></div>' +
      '<div class="galerie" id="galerie"></div>' +
      (couples.length ? '<h2 style="margin-top:48px">Les couples</h2><p class="intro">Ceux qui sont des révélations restent masqués.</p><div class="couples">' +
        couples.map(function (c) {
          const noms = "<strong>" + M.echap(parId[c.a].nom) + "</strong> &amp; <strong>" + M.echap(parId[c.b].nom) + "</strong>";
          const txt = noms + ' <span class="meta">« ' + M.echap(c.surnom) + " »</span>";
          return '<div class="couple"><p style="margin:0">' + (c.spoiler ? '<span class="spoiler">' + txt + "</span>" : txt) + "</p></div>";
        }).join("") + "</div>" : "");
    p.querySelectorAll("[data-role]").forEach(function (b) {
      b.addEventListener("click", function () {
        filtres.role = b.dataset.role;
        p.querySelectorAll("[data-role]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        afficherGalerie();
      });
    });
    document.getElementById("filtreTexte").addEventListener("input", function (e) { filtres.texte = e.target.value; afficherGalerie(); });
    document.getElementById("galerie").addEventListener("click", function (e) {
      const b = e.target.closest("[data-perso]");
      if (b) ouvrirFiche(b.dataset.perso);
    });
    afficherGalerie();
  }

  const modale = document.getElementById("modale");
  const fiche = document.getElementById("fiche");
  function liste(t) { return "<ul>" + t.map(function (x) { return "<li>" + M.riche(x) + "</li>"; }).join("") + "</ul>"; }
  function ouvrirFiche(id) {
    const p = parId[id];
    if (!p) return;
    const pe = PERSO[id] || {};
    const liens = (p.liens || []).filter(function (l) { return parId[l[0]]; }).map(function (l) {
      return '<button data-id="' + l[0] + '">' + M.echap(parId[l[0]].nom) + ' <span class="meta">· ' + M.riche(l[1]) + "</span></button>";
    }).join("");
    fiche.innerHTML =
      M.fanart({ image: p.image, credit: p.credit, alt: p.nom, initiales: p.image ? "" : M.initiales(p.nom) }) +
      '<div class="contenu fiche">' + M.badge(p.saga) + ' <span class="meta">' + (p.role === "principal" ? "Personnage principal" : "Personnage secondaire") + "</span>" +
      '<h2 style="margin:10px 0 2px">' + M.echap(p.nom) + "</h2>" +
      (p.alias ? '<p class="meta">Aussi appelé·e : ' + M.echap(p.alias) + "</p>" : "") +
      ((pe.traits || []).length ? '<div class="traits">' + pe.traits.map(function (t) { return "<span>" + M.riche(t) + "</span>"; }).join("") + "</div>" : "") +
      "<p>" + M.riche(p.resume) + "</p>" +
      (p.spoiler ? '<div class="spoiler">' + M.riche(p.spoiler) + "</div>" : "") +
      (pe.caractere ? '<h3 class="fiche-titre">Caractère</h3><p>' + M.riche(pe.caractere) + "</p>" : "") +
      ((pe.aime || pe.naimePas) ? '<div class="gouts">' +
        (pe.aime ? '<div class="aime"><h3 class="fiche-titre">♥ Aime</h3>' + liste(pe.aime) + "</div>" : "") +
        (pe.naimePas ? '<div class="naime-pas"><h3 class="fiche-titre">✕ N\'aime pas</h3>' + liste(pe.naimePas) + "</div>" : "") + "</div>" : "") +
      (pe.anecdote ? '<p class="anecdote"><strong>Le saviez-vous ?</strong> ' + M.riche(pe.anecdote) + "</p>" : "") +
      "<dl><dt>Race</dt><dd>" + M.echap(p.race) + "</dd>" +
      "<dt>Affiliation</dt><dd>" + M.echap(p.affiliation) + "</dd>" +
      "<dt>Pouvoirs</dt><dd>" + M.echap(p.pouvoirs) + "</dd>" +
      "<dt>1re apparition</dt><dd><em>" + M.echap(p.apparition) + "</em></dd></dl>" +
      (liens ? '<p class="meta">Liens</p><div class="liens-perso">' + liens + "</div>" : "") +
      "</div>";
    fiche.querySelector(".contenu").scrollTop = 0;
    if (!modale.open) modale.showModal();
    history.replaceState(null, "", "#perso-" + id);
  }
  fiche.addEventListener("click", function (e) {
    if (e.target.closest(".spoiler:not(.revele)") && !document.body.classList.contains("spoilers-reveles")) return;
    const b = e.target.closest(".liens-perso button");
    if (!b) return;
    const autre = parId[b.dataset.id];
    if (autre.saga === S) ouvrirFiche(autre.id);
    else location.href = autre.saga + ".html#perso-" + autre.id;
  });
  document.getElementById("fermerModale").addEventListener("click", function () { modale.close(); });
  modale.addEventListener("click", function (e) { if (e.target === modale) modale.close(); });
  modale.addEventListener("close", function () { history.replaceState(null, "", "#personnages"); });

  /* ---------- Carte ---------- */
  let carte = null, cleActive = null;
  const panneauLieu = function () { return document.getElementById("panneauLieu"); };
  function construireCarte() {
    const p = document.getElementById("panneau-carte");
    p.innerHTML = (U.cartes.length > 1 ? '<div class="onglets" id="ongletsCartes">' + U.cartes.map(function (c) {
      return '<button data-carte="' + c + '" aria-selected="false">' + M.cartes[c].titre + "</button>";
    }).join("") + "</div>" : "") +
      '<p class="centre meta" id="introCarte" style="margin-bottom:16px"></p>' +
      '<div class="zone-carte"><div class="cadre-carte" id="cadreCarte"><div class="commandes">' +
      '<button type="button" id="zoomPlus" aria-label="Zoomer">+</button><button type="button" id="zoomMoins" aria-label="Dézoomer">−</button>' +
      '<button type="button" id="zoomReset" aria-label="Vue d\'ensemble">⤢</button></div>' +
      '<p class="aide-carte">Carte stylisée · positions indicatives</p></div>' +
      '<aside class="panneau-lieu"><div class="carte" id="panneauLieu"></div></aside></div>';
    if (U.cartes.length > 1) document.getElementById("ongletsCartes").addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (b) afficherCarte(b.dataset.carte);
    });
    document.getElementById("zoomPlus").addEventListener("click", function () { carte.zoomer(1.5); });
    document.getElementById("zoomMoins").addEventListener("click", function () { carte.zoomer(1 / 1.5); });
    document.getElementById("zoomReset").addEventListener("click", function () { carte.reinitialiser(); });
    panneauLieu().addEventListener("click", function (e) {
      const b = e.target.closest("[data-lieu]");
      if (b) {
        const l = M.cartes[cleActive].lieux.filter(function (x) { return x.id === b.dataset.lieu; })[0];
        carte.centrerSur(l.x, l.y, 2.4);
        carte.selectionner({ lieu: l });
      }
      if (e.target.closest("[data-retour]")) carte.selectionner(null);
      const pp = e.target.closest("[data-perso]");
      if (pp) { e.preventDefault(); ouvrirFiche(pp.dataset.perso); }
    });
    window.addEventListener("resize", function () {
      if (!carte || ongletActif !== "carte") return;
      clearTimeout(window.__rz);
      window.__rz = setTimeout(function () { carte.reinitialiser(); }, 150);
    });
    afficherCarte(U.cartes[0]);
  }
  function listeLieux(cle) {
    return '<ul class="liste-lieux">' + M.cartes[cle].lieux.slice().sort(function (a, b) { return a.nom.localeCompare(b.nom, "fr"); }).map(function (l) {
      return '<li><button data-lieu="' + l.id + '">' + M.echap(l.nom) + "</button></li>";
    }).join("") + "</ul>";
  }
  function accueilCarte(cle) {
    const d = M.cartes[cle];
    panneauLieu().innerHTML = '<h3 style="margin-top:4px">' + d.titre + "</h3><p>" + M.riche(d.intro) + '</p><p class="meta">Tous les lieux :</p>' + listeLieux(cle);
  }
  function surSelection(sel) {
    if (!sel) { accueilCarte(cleActive); history.replaceState(null, "", "#carte"); return; }
    if (sel.region) {
      panneauLieu().innerHTML = '<p class="meta">Région</p><h3>' + M.echap(sel.region.nom) + "</h3><p>" + M.riche(sel.region.texte || "") + "</p>" +
        '<button class="btn secondaire" data-retour>← Tous les lieux</button>';
      return;
    }
    const l = sel.lieu;
    const lies = (l.persos || []).filter(function (id) { return parId[id]; }).map(function (id) {
      return '<a class="puce" href="#perso-' + id + '" data-perso="' + id + '">' + M.echap(parId[id].nom) + "</a>";
    }).join("");
    panneauLieu().innerHTML = '<p class="meta">' + M.echap(l.type || "") + (l.vo ? " · VO : " + M.echap(l.vo) : "") + "</p>" +
      "<h3>" + M.echap(l.nom) + "</h3><p>" + M.riche(l.texte || "") + "</p>" +
      (l.spoiler ? '<p class="spoiler">' + M.riche(l.spoiler) + "</p>" : "") +
      (lies ? '<p class="meta">Personnages liés</p><div class="puces" style="margin-bottom:14px">' + lies + "</div>" : "") +
      '<button class="btn secondaire" data-retour>← Tous les lieux</button>';
    history.replaceState(null, "", "#carte/" + cleActive + "/" + l.id);
  }
  function afficherCarte(cle, lieuId) {
    if (U.cartes.indexOf(cle) === -1) cle = U.cartes[0];
    cleActive = cle;
    document.querySelectorAll("#ongletsCartes button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.carte === cle); });
    document.getElementById("introCarte").textContent = M.cartes[cle].intro;
    carte = new M.Carte(document.getElementById("cadreCarte"), cle, surSelection);
    carte.reinitialiser();
    accueilCarte(cle);
    if (lieuId) {
      const l = M.cartes[cle].lieux.filter(function (x) { return x.id === lieuId; })[0];
      if (l) { carte.centrerSur(l.x, l.y, 2.4); carte.selectionner({ lieu: l }); }
    }
  }

  /* ---------- Glossaire ---------- */
  function construireGlossaire() {
    const G = M.glossaire.filter(function (g) { return g.saga === S; }).sort(function (a, b) { return a.terme.localeCompare(b.terme, "fr"); });
    document.getElementById("panneau-glossaire").innerHTML =
      '<p class="intro">Le vocabulaire propre à ' + U.monde + '. Les mots communs aux trois sagas sont dans le <a href="glossaire.html">glossaire complet</a>.</p>' +
      '<div class="glossaire">' + G.map(function (g) {
        return '<article class="terme" id="glossaire-' + g.id + '"><h3>' + M.echap(g.terme) + (g.vo ? ' <span class="vo">VO : ' + M.echap(g.vo) + "</span>" : "") +
          '</h3><p class="meta" style="margin-bottom:4px">' + g.categorie + "</p><p>" + M.riche(g.texte) + "</p></article>";
      }).join("") + "</div>";
  }

  /* ---------- Quiz ---------- */
  function melanger(t) {
    const a = t.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  function construireQuiz() {
    const zone = document.getElementById("panneau-quiz");
    const base = M.quiz.filter(function (q) { return q.saga === S; });
    let questions = [], index = 0, score = 0;
    function accueil() {
      zone.innerHTML = '<div class="quiz"><div class="carte centre" style="padding:34px"><h2>Le quiz ' + (U.monde === "Erilea" ? "d'" : "de ") + U.monde + "</h2>" +
        "<p>" + base.length + ' questions sur la saga, dans le désordre. Les grosses révélations sont évitées.</p><button class="btn" id="go">Commencer</button>' +
        '<p class="meta" style="margin-top:16px">Envie de mélanger les trois mondes ? <a href="quiz.html">Le grand quiz</a>.</p></div></div>';
      document.getElementById("go").addEventListener("click", demarrer);
    }
    function demarrer() {
      questions = melanger(base).slice(0, 10).map(function (q) {
        const ordre = melanger(q.choix.map(function (c, i) { return i; }));
        return { q: q.q, explication: q.explication, choix: ordre.map(function (i) { return q.choix[i]; }), bonne: ordre.indexOf(q.bonne) };
      });
      index = 0; score = 0; question();
    }
    function question() {
      const q = questions[index];
      zone.innerHTML = '<div class="quiz"><div class="progression"><div style="width:' + (index / questions.length * 100) + '%"></div></div>' +
        '<p class="meta">Question ' + (index + 1) + " / " + questions.length + "</p>" +
        '<p class="question">' + M.riche(q.q) + '</p><div class="reponses">' +
        q.choix.map(function (c, i) { return '<button data-i="' + i + '">' + M.riche(c) + "</button>"; }).join("") + '</div><div id="suite"></div></div>';
      zone.querySelectorAll(".reponses button").forEach(function (b) { b.addEventListener("click", function () { repondre(+b.dataset.i); }); });
    }
    function repondre(i) {
      const q = questions[index];
      zone.querySelectorAll(".reponses button").forEach(function (b, j) {
        b.disabled = true;
        if (j === q.bonne) b.classList.add("bonne"); else if (j === i) b.classList.add("mauvaise");
      });
      if (i === q.bonne) score++;
      const dernier = index === questions.length - 1;
      document.getElementById("suite").innerHTML = '<div class="explication">' + (i === q.bonne ? "✓ Bonne réponse ! " : "✗ Raté. ") + M.riche(q.explication) + "</div>" +
        '<p style="margin-top:16px;text-align:right"><button class="btn" id="suivant">' + (dernier ? "Voir mon score" : "Question suivante →") + "</button></p>";
      document.getElementById("suivant").addEventListener("click", function () { if (dernier) resultat(); else { index++; question(); } });
      document.getElementById("suivant").focus();
    }
    function resultat() {
      const r = score / questions.length;
      const titres = {
        tog: ["Digne de la reine de Terrasen !", "Une vraie membre de la Treize.", "Pas mal pour une recrue d'Arobynn.", "Retour aux mines d'Endovier pour réviser…"],
        acotar: ["Bienvenue dans le Cercle intime !", "Velaris vous ouvre ses portes.", "La Cour du Printemps vous garde à l'œil.", "Sous la Montagne, on révise…"],
        cc: ["Une vraie Étoilée !", "Hunt approuve d'un sourire en coin.", "Syrinx vous regarde avec indulgence.", "Direction le Marché de la Viande pour réviser…"],
      }[S];
      zone.innerHTML = '<div class="quiz"><div class="carte centre" style="padding:34px"><p class="meta">VOTRE SCORE</p><div class="score">' + score + " / " + questions.length + "</div><h2>" +
        titres[r === 1 ? 0 : r >= 0.7 ? 1 : r >= 0.4 ? 2 : 3] + '</h2><button class="btn" id="rejouer">Rejouer</button></div></div>';
      document.getElementById("rejouer").addEventListener("click", demarrer);
    }
    accueil();
  }

  const CONSTRUIRE = { livres: construireLivres, "a-savoir": construireASavoir, personnages: construirePersonnages, carte: construireCarte, glossaire: construireGlossaire, quiz: construireQuiz };

  /* ---------- Adresse ---------- */
  function lireAdresse(defiler) {
    const h = decodeURIComponent(location.hash.slice(1));
    if (/^perso-/.test(h)) {
      const id = h.slice(6);
      montrer("personnages", defiler);
      if (parId[id] && parId[id].saga === S) ouvrirFiche(id);
    } else if (/^livre-/.test(h)) {
      montrer("livres", defiler); ouvrirLivre(h.slice(6), true);
    } else if (/^carte\//.test(h)) {
      const m = h.split("/");
      montrer("carte", defiler); afficherCarte(m[1], m[2]);
    } else if (/^glossaire\//.test(h)) {
      montrer("glossaire", defiler);
      const el = document.getElementById("glossaire-" + h.split("/")[1]);
      if (el) { el.classList.add("cible"); el.scrollIntoView({ block: "center" }); }
    } else {
      montrer(h || "livres", defiler && !!h);
    }
  }
  lireAdresse(!!location.hash);
  window.addEventListener("hashchange", function () { lireAdresse(true); });

  /* ---------- Arrivée par un portail (le voile est posé dans la page) ---------- */
  try { sessionStorage.removeItem("maasverse-portail"); } catch (e) { /* stockage indisponible */ }
  setTimeout(function () { document.documentElement.classList.remove("arrivee"); }, 2000);
});
