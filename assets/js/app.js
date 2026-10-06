/* ==========================================================
   Maasverse — script commun à toutes les pages
   En-tête, pied de page, spoilers, recherche, fan arts.
   ========================================================== */
(function () {
  "use strict";

  const M = (window.MAAS = window.MAAS || {});

  /* Menu regroupé en rubriques. Pour ajouter une page : l'ajouter dans la bonne rubrique. */
  const SECTIONS_UNIVERS = function (s, carte) {
    return [
      { href: s + ".html#livres", titre: "Les livres", desc: "Les tomes et leur quatrième de couverture" },
      { href: s + ".html#a-savoir", titre: "À savoir", desc: "Le rappel avant d'ouvrir le tome suivant" },
      { href: s + ".html#personnages", titre: "Personnages", desc: "Fiches, caractères, couples" },
      { href: s + ".html#carte", titre: carte, desc: "La carte à explorer" },
      { href: s + ".html#glossaire", titre: "Glossaire", desc: "Le vocabulaire de ce monde" },
      { href: s + ".html#quiz", titre: "Quiz", desc: "Testez-vous sur cette saga" },
    ];
  };
  const RUBRIQUES = [
    { titre: "Throne of Glass", saga: "tog", univers: true, pages: [{ id: "tog", href: "tog.html", titre: "Throne of Glass", desc: "Le monde d'Erilea" }], sections: SECTIONS_UNIVERS("tog", "Carte d'Erilea") },
    { titre: "ACOTAR", saga: "acotar", univers: true, pages: [{ id: "acotar", href: "acotar.html", titre: "ACOTAR", desc: "Le monde de Prythian" }], sections: SECTIONS_UNIVERS("acotar", "Carte de Prythian") },
    { titre: "Crescent City", saga: "cc", univers: true, pages: [{ id: "cc", href: "cc.html", titre: "Crescent City", desc: "Le monde de Midgard" }], sections: SECTIONS_UNIVERS("cc", "Cartes de Midgard") },
    { titre: "Multivers", pages: [
      { id: "liens", href: "liens.html", titre: "Les liens entre les sagas", desc: "La carte du multivers, crossovers et théories" },
      { id: "chronologie", href: "chronologie.html", titre: "Chronologie", desc: "Les parutions et l'histoire des trois mondes" },
      { id: "sagas", href: "sagas.html", titre: "Ordre de lecture", desc: "Tous les tomes, VO et VF, par où commencer" },
      { id: "glossaire", href: "glossaire.html", titre: "Glossaire complet", desc: "Les trois mondes réunis" },
      { id: "quiz", href: "quiz.html", titre: "Le grand quiz", desc: "Les trois sagas et leurs liens" },
      { id: "actus", href: "actus.html", titre: "Actualités", desc: "Valkyrie Cycle, Crescent City 4, adaptations" },
    ] },
  ];
  const PAGES = [{ id: "accueil", href: "index.html", titre: "Accueil" }].concat(
    RUBRIQUES.reduce(function (t, r) { return t.concat(r.pages.map(function (p) { return Object.assign({ rubrique: r.titre }, p); })); }, []));
  M.PAGES = PAGES;
  M.RUBRIQUES = RUBRIQUES;

  M.SAGAS = {
    tog: { court: "TOG", nom: "Throne of Glass", vf: "Keleana / Le Trône de Cristal", monde: "Erilea" },
    acotar: { court: "ACOTAR", nom: "A Court of Thorns and Roses", vf: "Un palais d'épines et de roses", monde: "Prythian" },
    cc: { court: "CC", nom: "Crescent City", vf: "Crescent City", monde: "Midgard" },
    multi: { court: "Maasverse", nom: "Plusieurs sagas", vf: "", monde: "" },
  };

  /* ---------- Petites aides ---------- */
  M.echap = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  // Texte enrichi minimal : **gras**, *italique*, [[spoiler]]
  M.riche = function (s) {
    // texte entièrement masqué : un bloc plutôt qu'une ligne hachurée
    const tout = /^\[\[([^\]]+)\]\]$/.exec(String(s || "").trim());
    if (tout) return '<span class="spoiler bloc" tabindex="0" role="button" aria-label="Spoiler masqué, activer pour révéler">' + M.riche(tout[1]) + "</span>";
    return M.echap(s)
      .replace(/\[\[(.+?)\]\]/g, '<span class="spoiler" tabindex="0" role="button" aria-label="Spoiler masqué, activer pour révéler">$1</span>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  };
  M.sansAccent = function (s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  };
  M.badge = function (saga) {
    const s = M.SAGAS[saga] || M.SAGAS.multi;
    return '<span class="badge ' + saga + '">' + s.court + "</span>";
  };
  M.initiales = function (nom) {
    return nom.replace(/«.*?»|\(.*?\)/g, "").split(/[\s/-]+/).filter(Boolean)
      .filter(function (m) { return /^[A-ZÀ-Ý]/.test(m); }).slice(0, 2).map(function (m) { return m[0]; }).join("");
  };

  /* Emplacement de fan art : affiche l'image si elle est renseignée,
     sinon un cadre « Fan art à venir ». */
  M.fanart = function (o) {
    o = o || {};
    if (o.image) {
      return '<figure class="fanart rempli ' + (o.classe || "") + '">' +
        '<img src="' + M.echap(o.image) + '" alt="' + M.echap(o.alt || "") + '" loading="lazy">' +
        (o.credit ? "<figcaption>Art : " + M.echap(o.credit) + "</figcaption>" : "") + "</figure>";
    }
    return '<figure class="fanart ' + (o.classe || "") + '">' +
      (o.initiales
        ? '<span class="initiales">' + M.echap(o.initiales) + '</span><span class="mention-fanart">fan art à venir</span>'
        : '<div class="vide"><div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 8"/></svg>' +
          M.echap(o.label || "Fan art à venir") + "</div></div>") + "</figure>";
  };

  /* ---------- Icônes ---------- */
  const ICONE_CROISSANT = '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M40 6a26 26 0 1 0 18 44A22 22 0 1 1 40 6z"/><path fill="currentColor" d="M47 14l1.6 4.4L53 20l-4.4 1.6L47 26l-1.6-4.4L41 20l4.4-1.6z"/></svg>';
  M.ICONE_CROISSANT = ICONE_CROISSANT;
  M.ICONE_ETOILE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/></svg>';

  /* ---------- En-tête et pied de page ---------- */
  function construireEntete() {
    const page = document.body.dataset.page;
    const courant = function (p) { return p.id === page ? ' aria-current="page"' : ""; };
    const nav = RUBRIQUES.map(function (r, i) {
      const actif = r.pages.some(function (p) { return p.id === page; });
      const items = r.sections || r.pages;
      if (!r.univers && r.pages.length === 1) {
        const p = r.pages[0];
        return '<a class="nav-lien' + (actif ? " actif" : "") + '" href="' + p.href + '"' + courant(p) + ">" + p.titre + "</a>";
      }
      return '<div class="nav-groupe' + (r.saga ? " nav-" + r.saga : "") + '">' +
        '<button class="nav-lien' + (actif ? " actif" : "") + '" aria-expanded="false" aria-controls="sousmenu-' + i + '">' + r.titre +
        ' <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
        '<div class="sous-menu" id="sousmenu-' + i + '"><p class="sous-titre">' + r.titre + "</p>" + items.map(function (p) {
          return '<a href="' + p.href + '"' + courant(p) + "><strong>" + p.titre + "</strong><span>" + p.desc + "</span></a>";
        }).join("") + "</div></div>";
    }).join("");

    const entete = document.createElement("header");
    entete.className = "entete";
    entete.innerHTML =
      '<div class="conteneur">' +
      '<a class="logo" href="index.html">' + ICONE_CROISSANT + '<span class="texte-logo">Maasverse</span></a>' +
      '<nav class="nav" aria-label="Navigation principale">' + nav + "</nav>" +
      '<div class="outils">' +
      '<div class="recherche"><label class="visuellement-cache" for="rechercheGlobale">Rechercher</label>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
      '<input id="rechercheGlobale" type="search" placeholder="Rechercher…" autocomplete="off">' +
      '<div class="resultats" role="listbox"></div></div>' +
      '<button class="interrupteur" id="toutReveler" aria-pressed="false" title="Afficher ou masquer tous les spoilers"><span aria-hidden="true">◐</span> <span class="texte-long">Spoilers&nbsp;</span><span class="etat">masqués</span></button>' +
      '<button class="btn-menu" aria-label="Menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      "</div></div>";
    document.body.prepend(entete);

    const btnMenu = entete.querySelector(".btn-menu");
    const navEl = entete.querySelector(".nav");
    btnMenu.addEventListener("click", function () {
      const ouvert = navEl.classList.toggle("ouvert");
      btnMenu.setAttribute("aria-expanded", ouvert);
    });
    // sous-menus : ouverture au clic (et au survol sur ordinateur, via CSS)
    entete.querySelectorAll(".nav-groupe > button").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        const ouvert = b.getAttribute("aria-expanded") !== "true";
        entete.querySelectorAll(".nav-groupe > button").forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
        b.setAttribute("aria-expanded", ouvert);
      });
    });
    document.addEventListener("click", function () {
      entete.querySelectorAll(".nav-groupe > button").forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") entete.querySelectorAll(".nav-groupe > button").forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
    });

    // fil d'Ariane au-dessus du titre de la page
    const pageInfo = PAGES.filter(function (p) { return p.id === page; })[0];
    const surtitre = document.querySelector(".entete-page .surtitre");
    if (surtitre && pageInfo && pageInfo.rubrique) {
      surtitre.innerHTML = '<a href="index.html">Accueil</a> <span aria-hidden="true">✦</span> ' + pageInfo.rubrique;
    }

    const pied = document.createElement("footer");
    pied.className = "pied";
    pied.innerHTML =
      '<div class="conteneur"><div class="pied-grille">' +
      '<div class="pied-marque"><a class="logo" href="index.html">' + ICONE_CROISSANT + "<span>Maasverse</span></a>" +
      "<p>Le guide francophone des trois sagas de Sarah J. Maas et de ce qui les relie.</p></div>" +
      RUBRIQUES.map(function (r) {
        return '<div><p class="pied-titre">' + r.titre + "</p><ul>" + (r.sections || r.pages).map(function (p) {
          return '<li><a href="' + p.href + '">' + p.titre + "</a></li>";
        }).join("") + "</ul></div>";
      }).join("") +
      '</div><p class="pied-mentions">Site de fan non officiel, sans but commercial. Les univers, personnages et titres appartiennent à Sarah J. Maas et à ses éditeurs (Bloomsbury, La Martinière). ' +
      "Les cartes sont des créations originales stylisées ; les fan arts sont publiés avec l'accord de leurs artistes.</p></div>";
    document.body.appendChild(pied);
  }

  /* ---------- Spoilers ---------- */
  const CLE_SPOILERS = "maasverse-spoilers";
  function lireStockage(cle) { try { return localStorage.getItem(cle); } catch (e) { return null; } }
  function ecrireStockage(cle, v) { try { localStorage.setItem(cle, v); } catch (e) { /* stockage indisponible */ } }

  function appliquerSpoilers(tous) {
    document.body.classList.toggle("spoilers-reveles", tous);
    const btn = document.getElementById("toutReveler");
    if (btn) {
      btn.setAttribute("aria-pressed", tous);
      btn.querySelector(".etat").textContent = tous ? "visibles" : "masqués";
    }
  }
  function initSpoilers() {
    appliquerSpoilers(lireStockage(CLE_SPOILERS) === "oui");
    document.getElementById("toutReveler").addEventListener("click", function () {
      const tous = !document.body.classList.contains("spoilers-reveles");
      ecrireStockage(CLE_SPOILERS, tous ? "oui" : "non");
      if (!tous) document.querySelectorAll(".spoiler.revele").forEach(function (el) { el.classList.remove("revele"); });
      appliquerSpoilers(tous);
    });
    function reveler(e) {
      const sp = e.target.closest(".spoiler");
      if (!sp || sp.classList.contains("revele") || document.body.classList.contains("spoilers-reveles")) return;
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      sp.classList.add("revele");
    }
    document.addEventListener("click", reveler, true);
    document.addEventListener("keydown", reveler, true);
  }

  /* ---------- Recherche globale ---------- */
  function construireIndex() {
    const idx = [];
    (M.personnages || []).forEach(function (p) {
      idx.push({ type: "Personnage", titre: p.nom, saga: p.saga, url: p.saga + ".html#perso-" + p.id, texte: [p.nom, p.alias, p.motscles, p.race, p.affiliation].join(" ") });
    });
    Object.keys(M.cartes || {}).forEach(function (cle) {
      const c = M.cartes[cle];
      (c.lieux || []).forEach(function (l) {
        idx.push({ type: "Lieu", titre: l.nom, saga: c.saga, url: c.saga + ".html#carte/" + cle + "/" + l.id, texte: [l.nom, l.vo, l.type].join(" ") });
      });
    });
    (M.livres || []).forEach(function (l) {
      idx.push({ type: "Livre", titre: l.vo, saga: l.saga, url: l.saga + ".html#livre-" + l.id, texte: [l.vo, l.vf, l.sigle].join(" ") });
    });
    (M.glossaire || []).forEach(function (g) {
      idx.push({ type: "Glossaire", titre: g.terme, saga: g.saga, url: "glossaire.html#" + g.id, texte: [g.terme, g.vo].join(" ") });
    });
    PAGES.forEach(function (p) { idx.push({ type: "Page", titre: p.titre, saga: "", url: p.href, texte: p.titre }); });
    idx.forEach(function (e) { e.cle = M.sansAccent(e.texte); });
    return idx;
  }

  function initRecherche() {
    const champ = document.getElementById("rechercheGlobale");
    const boite = document.querySelector(".resultats");
    let index = null;
    let actif = -1;

    function afficher() {
      if (!index) index = construireIndex();
      const q = M.sansAccent(champ.value.trim());
      actif = -1;
      if (q.length < 2) { boite.classList.remove("ouvert"); return; }
      const mots = q.split(/\s+/);
      const res = index.filter(function (e) { return mots.every(function (m) { return e.cle.indexOf(m) !== -1; }); })
        .sort(function (a, b) {
          const da = M.sansAccent(a.titre).indexOf(q) === 0 ? 0 : 1;
          const db = M.sansAccent(b.titre).indexOf(q) === 0 ? 0 : 1;
          return da - db;
        }).slice(0, 14);
      boite.innerHTML = res.length
        ? res.map(function (e) {
          return '<a role="option" href="' + e.url + '"><span class="type">' + e.type + "</span><span>" + M.echap(e.titre) +
            (e.saga && e.saga !== "multi" ? " " + M.badge(e.saga) : "") + "</span></a>";
        }).join("")
        : '<div class="vide">Aucun résultat pour « ' + M.echap(champ.value) + " ».</div>";
      boite.classList.add("ouvert");
    }
    champ.addEventListener("input", afficher);
    champ.addEventListener("focus", afficher);
    champ.addEventListener("keydown", function (e) {
      const items = boite.querySelectorAll("a");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!items.length) return;
        actif = (actif + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        items.forEach(function (a, i) { a.classList.toggle("actif", i === actif); });
      } else if (e.key === "Enter") {
        const cible = items[actif >= 0 ? actif : 0];
        if (cible) { e.preventDefault(); window.location.href = cible.getAttribute("href"); boite.classList.remove("ouvert"); }
      } else if (e.key === "Escape") {
        boite.classList.remove("ouvert"); champ.blur();
      }
    });
    boite.addEventListener("click", function () { boite.classList.remove("ouvert"); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".recherche")) boite.classList.remove("ouvert");
    });
  }

  /* Remplit les éléments <div data-fanart="cle"> à partir de MAAS.fanarts */
  function remplirFanarts() {
    document.querySelectorAll("[data-fanart]").forEach(function (el) {
      const info = (M.fanarts || {})[el.dataset.fanart] || {};
      const style = el.getAttribute("style");
      const tmp = document.createElement("div");
      tmp.innerHTML = M.fanart({ image: info.image, credit: info.credit, alt: info.alt, label: el.dataset.label, classe: el.className });
      const fig = tmp.firstChild;
      if (style) fig.setAttribute("style", style);
      el.replaceWith(fig);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    construireEntete();
    remplirFanarts();
    initSpoilers();
    initRecherche();
    document.dispatchEvent(new Event("maas:pret"));
  });
})();
