/* Page « Les liens » : constellation des mondes */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const MONDES = [
    { id: "erilea", nom: "Erilea", sous: "Throne of Glass", x: 170, y: 150, couleur: "#ef7d3c",
      texte: "Le monde de **Throne of Glass**. Ses portes vers les autres mondes sont les Wyrdgates, scellés par le Verrou de la déesse Mala." },
    { id: "prythian", nom: "Prythian", sous: "ACOTAR", x: 470, y: 90, couleur: "#e5457f",
      texte: "Le monde d'**ACOTAR**, avec l'île des sept Cours. [[C'est le monde d'origine des Fae de Midgard.]]" },
    { id: "midgard", nom: "Midgard", sous: "Crescent City", x: 760, y: 220, couleur: "#d9ad52",
      texte: "Le monde de **Crescent City**, moderne, gouverné par les Asteri. La Faille du Nord le relie à Hel." },
    { id: "hel", nom: "Hel", sous: "Crescent City", x: 690, y: 440, couleur: "#b13a3a",
      texte: "Le monde des démons de Crescent City, gouverné par sept princes. [[Il devient un allié contre les Asteri.]]" },
    { id: "valg", nom: "Monde des Valg", sous: "Throne of Glass", x: 210, y: 430, couleur: "#7b5ea7",
      texte: "Le royaume démoniaque d'où viennent Erawan, ses frères et les princes Valg." },
  ];
  const LIENS = [
    { a: "prythian", b: "midgard", type: "confirme", etiquette: "Theia · Bryce",
      texte: "[[Il y a des millénaires, la reine Theia et ses Fae ont quitté Prythian pour Midgard. À la fin de *House of Sky and Breath*, Bryce fait le chemin inverse, puis repart avec Truth-Teller dans *House of Flame and Shadow*. Et les Asteri sont des Daglan, les anciens tyrans de Prythian.]]" },
    { a: "midgard", b: "hel", type: "confirme", etiquette: "Faille du Nord",
      texte: "La Faille du Nord, dans la région de Nena, relie Midgard et Hel. Les démons tentent régulièrement de la franchir." },
    { a: "erilea", b: "valg", type: "confirme", etiquette: "Wyrdgate",
      texte: "Les Valg sont arrivés sur Erilea par le Wyrdgate. Les Wyrdkeys, taillées dans cette porte, permettent de l'ouvrir." },
    { a: "erilea", b: "midgard", type: "theorie", etiquette: "Vision d'Aelin", position: 0.74,
      texte: "[[Dans *Kingdom of Ash*, Aelin aperçoit une ville moderne au bord d'un fleuve, interprétée comme Lunathion.]] L'autrice ne l'a jamais confirmé." },
    { a: "erilea", b: "prythian", type: "theorie", etiquette: "Vision d'Aelin",
      texte: "[[Dans la même scène, Aelin voit un mâle ailé, interprété comme Rhysand.]] Non confirmé." },
    { a: "valg", b: "hel", type: "theorie", etiquette: "Démons cousins ?",
      texte: "Valg et démons de Hel viennent de mondes démoniaques. Certains fans pensent qu'ils sont liés, ou que les Valg ont été « dévorés » par les Asteri." },
  ];

  const parId = {};
  MONDES.forEach(function (m) { parId[m.id] = m; });
  const W = 920, H = 520;
  let svg = '<svg class="constellation" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Schéma des mondes du Maasverse et de leurs liens">' +
    '<defs><filter id="lueurMonde" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>';
  // petites étoiles de fond
  for (let i = 0; i < 70; i++) {
    const x = (i * 137.5) % W, y = (i * 71.3 + (i % 7) * 31) % H;
    svg += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (i % 5 === 0 ? 1.6 : 0.9) + '" fill="rgba(255,255,255,' + (i % 3 === 0 ? 0.5 : 0.25) + ')"/>';
  }
  LIENS.forEach(function (l, i) {
    const a = parId[l.a], b = parId[l.b];
    const t = l.position || 0.5;
    const mx = a.x + (b.x - a.x) * t, my = a.y + (b.y - a.y) * t;
    svg += '<g class="lien-g" data-lien="' + i + '" style="cursor:pointer">' +
      '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="transparent" stroke-width="18"/>' +
      '<line class="lien ' + l.type + '" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>' +
      '<text class="etiq" x="' + mx + '" y="' + (my - 8) + '" paint-order="stroke" stroke="#0c0d16" stroke-width="4">' + l.etiquette + "</text></g>";
  });
  MONDES.forEach(function (m) {
    svg += '<g class="monde" data-monde="' + m.id + '" tabindex="0" role="button" aria-label="' + m.nom + '">' +
      '<circle cx="' + m.x + '" cy="' + m.y + '" r="46" fill="' + m.couleur + '" opacity=".35" filter="url(#lueurMonde)"/>' +
      '<circle class="coeur" cx="' + m.x + '" cy="' + m.y + '" r="40" fill="#13141f" stroke="' + m.couleur + '" stroke-width="3"/>' +
      '<path d="M' + m.x + "," + (m.y - 16) + " l4,12 12,4 -12,4 -4,12 -4,-12 -12,-4 12,-4z\" fill=\"" + m.couleur + '"/>' +
      '<text x="' + m.x + '" y="' + (m.y + 66) + '" font-size="19">' + m.nom + "</text>" +
      '<text class="sous" x="' + m.x + '" y="' + (m.y + 84) + '">' + m.sous + "</text></g>";
  });
  svg += "</svg>";
  document.getElementById("constellation").innerHTML = svg;

  const info = document.getElementById("infoMonde");
  document.getElementById("constellation").addEventListener("click", function (e) {
    const g = e.target.closest(".monde");
    const l = e.target.closest(".lien-g");
    if (g) {
      const m = parId[g.dataset.monde];
      const lies = LIENS.filter(function (x) { return x.a === m.id || x.b === m.id; }).map(function (x) {
        const autre = parId[x.a === m.id ? x.b : x.a];
        return "<li>" + autre.nom + ' <span class="badge ' + (x.type === "confirme" ? "confirme" : "theorie") + '">' + (x.type === "confirme" ? "confirmé" : "théorie") + "</span></li>";
      }).join("");
      info.innerHTML = '<p class="meta">' + m.sous + '</p><h3 style="color:' + m.couleur + '">' + m.nom + "</h3><p>" + M.riche(m.texte) + "</p>" +
        (lies ? '<p class="meta">Relié à</p><ul style="margin:0;padding-left:18px">' + lies + "</ul>" : "");
    } else if (l) {
      const x = LIENS[+l.dataset.lien];
      info.innerHTML = '<span class="badge ' + (x.type === "confirme" ? "confirme" : "theorie") + '">' + (x.type === "confirme" ? "lien confirmé" : "théorie") + "</span>" +
        '<h3 style="margin-top:10px">' + parId[x.a].nom + " ↔ " + parId[x.b].nom + "</h3><p>" + M.riche(x.texte) + "</p>";
    }
  });
  document.getElementById("constellation").addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.closest(".monde")) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
  });

  // mise en page étroite : le panneau passe sous le schéma
  function adapter() {
    document.getElementById("zoneConstellation").style.gridTemplateColumns = window.innerWidth < 900 ? "1fr" : "1fr 300px";
  }
  adapter();
  window.addEventListener("resize", adapter);
});
