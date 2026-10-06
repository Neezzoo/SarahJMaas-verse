/* Page « Sagas et ordre de lecture » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const TEXTES = {
    tog: { titre: 'Throne <span class="petit">of</span> Glass', genre: "Fantasy épique · 8 livres · terminée",
      pitch: "Celaena Sardothien, 18 ans, la plus célèbre assassine d'Adarlan, croupit dans les mines de sel d'Endovier. Le prince héritier Dorian lui propose la liberté si elle remporte un tournoi pour devenir la Championne du roi, celui-là même qui a interdit la magie et conquis le continent." },
    acotar: { titre: 'A Court <span class="petit">of</span> Thorns <span class="petit">and</span> Roses', genre: "Romantasy adulte · en cours",
      pitch: "Feyre Archeron, 19 ans, chasseuse dans un village humain pauvre, tue un loup qui était un Fae déguisé. En réparation, une créature monstrueuse l'emmène de l'autre côté du Mur, à Prythian, dans la Cour du Printemps." },
    cc: { titre: "Crescent City", genre: "Urban fantasy adulte · en cours",
      pitch: "Bryce Quinlan, demi-Fae demi-humaine, fêtarde et assistante dans une galerie d'antiquités de Lunathion, voit sa meilleure amie, la louve Danika, assassinée. Deux ans plus tard, les meurtres reprennent et elle doit enquêter avec Hunt Athalar, ange déchu réduit en esclavage." },
  };

  const conteneur = document.getElementById("sagas");
  conteneur.innerHTML = ["tog", "acotar", "cc"].map(function (s) {
    const t = TEXTES[s], info = M.SAGAS[s];
    const livres = M.livres.filter(function (l) { return l.saga === s; });
    return '<section class="saga-bloc" id="' + s + '">' +
      "<header><div>" + M.badge(s) + ' <span class="meta">' + t.genre + " · monde : " + info.monde + "</span>" +
      '<h2 class="c-' + s + '" style="margin-top:10px">' + t.titre + "</h2>" +
      '<p class="meta">En français : ' + info.vf + "</p>" +
      "<p>" + t.pitch + "</p></div>" +
      M.fanart({ image: (M.fanarts["saga-" + s] || {}).image, credit: (M.fanarts["saga-" + s] || {}).credit, label: "Fan art à venir" }) +
      "</header>" +
      '<div class="etageres">' + livres.map(function (l) {
        return '<button class="livre' + (l.aVenir ? " a-venir" : "") + '" id="' + l.id + '" style="background:linear-gradient(170deg,' + l.couleur + ',' + assombrir(l.couleur) + ')" aria-expanded="false" aria-controls="detail-' + s + '">' +
          '<span class="num">' + (/^\d/.test(l.num) ? "TOME " : "") + l.num + "</span>" +
          '<span class="titre">' + titreCouverture(l.vo) + "</span>" +
          '<span><span class="vf">' + M.echap(l.vf) + '</span><br><span class="annee">' + (l.date || l.annee) + "</span></span></button>";
      }).join("") + "</div>" +
      '<div class="carte detail-livre" id="detail-' + s + '" hidden></div>' +
      "</section>";
  }).join("");

  function titreCouverture(t) {
    // met « of », « and », « the » en petit, comme sur les couvertures
    return M.echap(t).replace(/\b(of|and)\b/g, '<span class="petit">$1</span>');
  }
  function assombrir(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * 0.45), g = Math.round(((n >> 8) & 255) * 0.45), b = Math.round((n & 255) * 0.45);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function ouvrir(id, defiler) {
    const l = M.livres.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    const detail = document.getElementById("detail-" + l.saga);
    document.querySelectorAll('#' + l.saga + ' .livre').forEach(function (b) { b.setAttribute("aria-expanded", b.id === id); });
    detail.hidden = false;
    detail.innerHTML = '<p class="meta">' + M.SAGAS[l.saga].court + " · " + (l.aVenir ? "à paraître le " + l.date : l.annee) + "</p>" +
      "<h3><em>" + M.echap(l.vo) + "</em></h3>" +
      '<p class="meta">VF : ' + M.echap(l.vf) + "</p>" +
      ((M.textesLivres || {})[l.id] ? '<p class="accroche">' + M.riche(M.textesLivres[l.id].accroche) + "</p>" +
        M.textesLivres[l.id].quatrieme.split(/\n\n+/).map(function (x) { return "<p>" + M.riche(x) + "</p>"; }).join("")
        : "<p>" + M.riche(l.pitch) + "</p>") +
      '<p><a class="btn secondaire" href="' + l.saga + ".html#livre-" + l.id + '">Ouvrir dans le monde ' + (M.SAGAS[l.saga].monde === "Erilea" ? "d'" : "de ") + M.SAGAS[l.saga].monde + " →</a></p>";
    if (defiler) detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  conteneur.addEventListener("click", function (e) {
    const b = e.target.closest(".livre");
    if (b) { ouvrir(b.id, true); history.replaceState(null, "", "#" + b.id); }
  });

  document.getElementById("ordreConseille").innerHTML = M.ordres.conseille.map(function (o) {
    return "<li>" + M.badge(o.saga) + " " + M.riche(o.texte) + "</li>";
  }).join("");

  // ouvrir le livre demandé dans l'adresse (ex. sagas.html#tog3)
  const cible = location.hash.slice(1);
  if (cible && M.livres.some(function (l) { return l.id === cible; })) {
    ouvrir(cible, false);
    document.getElementById(cible).scrollIntoView({ block: "center" });
  }
});
