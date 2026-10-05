/* Page « Cartes » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const ORDRE = ["erilea", "prythian", "midgard", "lunathion"];
  const onglets = document.getElementById("onglets");
  const cadre = document.getElementById("cadreCarte");
  const panneau = document.getElementById("panneau");
  const persoParId = {};
  M.personnages.forEach(function (p) { persoParId[p.id] = p; });

  let carte = null, cleActive = null;

  onglets.innerHTML = ORDRE.map(function (c) {
    const d = M.cartes[c];
    return '<button role="tab" data-carte="' + c + '" aria-selected="false">' + d.titre + ' <span class="meta">' + M.SAGAS[d.saga].court + "</span></button>";
  }).join("");

  function listeLieux(cle) {
    const d = M.cartes[cle];
    return '<ul class="liste-lieux">' + d.lieux.slice().sort(function (a, b) { return a.nom.localeCompare(b.nom, "fr"); }).map(function (l) {
      return '<li><button data-lieu="' + l.id + '">' + M.echap(l.nom) + "</button></li>";
    }).join("") + "</ul>";
  }

  function panneauAccueil(cle) {
    const d = M.cartes[cle];
    panneau.innerHTML = M.badge(d.saga) + '<h3 style="margin-top:10px">' + d.titre + "</h3><p>" + M.riche(d.intro) + "</p>" +
      '<p class="meta">Tous les lieux :</p>' + listeLieux(cle);
  }

  function surSelection(sel) {
    const d = M.cartes[cleActive];
    if (!sel) { panneauAccueil(cleActive); history.replaceState(null, "", "#" + cleActive); return; }
    if (sel.region) {
      panneau.innerHTML = M.badge(d.saga) + '<p class="meta" style="margin-top:10px">Région</p><h3>' + M.echap(sel.region.nom) + "</h3><p>" + M.riche(sel.region.texte || "") + "</p>" +
        '<button class="btn secondaire" data-retour>← Tous les lieux</button>';
      return;
    }
    const l = sel.lieu;
    const persos = (l.persos || []).filter(function (id) { return persoParId[id]; }).map(function (id) {
      return '<a class="puce" href="personnages.html#' + id + '">' + M.echap(persoParId[id].nom) + "</a>";
    }).join("");
    panneau.innerHTML = M.badge(d.saga) + '<p class="meta" style="margin-top:10px">' + M.echap(l.type || "") + (l.vo ? " · VO : " + M.echap(l.vo) : "") + "</p>" +
      "<h3>" + M.echap(l.nom) + "</h3><p>" + M.riche(l.texte || "") + "</p>" +
      (l.spoiler ? '<p class="spoiler">' + M.riche(l.spoiler) + "</p>" : "") +
      (persos ? '<p class="meta">Personnages liés</p><div class="puces" style="margin-bottom:14px">' + persos + "</div>" : "") +
      '<button class="btn secondaire" data-retour>← Tous les lieux</button>';
    history.replaceState(null, "", "#" + cleActive + "/" + l.id);
  }

  panneau.addEventListener("click", function (e) {
    const b = e.target.closest("[data-lieu]");
    if (b) {
      const l = M.cartes[cleActive].lieux.filter(function (x) { return x.id === b.dataset.lieu; })[0];
      carte.centrerSur(l.x, l.y, 2.4);
      carte.selectionner({ lieu: l });
    }
    if (e.target.closest("[data-retour]")) carte.selectionner(null);
  });

  function afficher(cle, lieuId) {
    if (!M.cartes[cle]) cle = ORDRE[0];
    cleActive = cle;
    onglets.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.carte === cle); });
    document.getElementById("introCarte").textContent = M.cartes[cle].intro;
    carte = new M.Carte(cadre, cle, surSelection);
    carte.reinitialiser();
    panneauAccueil(cle);
    if (lieuId) {
      const l = M.cartes[cle].lieux.filter(function (x) { return x.id === lieuId; })[0];
      if (l) { carte.centrerSur(l.x, l.y, 2.4); carte.selectionner({ lieu: l }); }
    } else {
      history.replaceState(null, "", "#" + cle);
    }
  }

  onglets.addEventListener("click", function (e) {
    const b = e.target.closest("button");
    if (b) afficher(b.dataset.carte);
  });
  document.getElementById("zoomPlus").addEventListener("click", function () { carte.zoomer(1.5); });
  document.getElementById("zoomMoins").addEventListener("click", function () { carte.zoomer(1 / 1.5); });
  document.getElementById("zoomReset").addEventListener("click", function () { carte.reinitialiser(); });
  window.addEventListener("resize", function () {
    if (!carte) return;
    clearTimeout(window.__rz);
    window.__rz = setTimeout(function () { carte.reinitialiser(); }, 150);
  });

  // adresse : cartes.html#prythian ou cartes.html#prythian/velaris
  const morceaux = location.hash.slice(1).split("/");
  afficher(morceaux[0] || ORDRE[0], morceaux[1]);
  window.addEventListener("hashchange", function () {
    const m = location.hash.slice(1).split("/");
    if (m[0] !== cleActive || m[1]) afficher(m[0], m[1]);
  });
});
