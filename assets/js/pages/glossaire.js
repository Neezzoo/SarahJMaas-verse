/* Page « Glossaire » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const G = M.glossaire.slice().sort(function (a, b) { return a.terme.localeCompare(b.terme, "fr"); });
  const filtres = { saga: "", categorie: "", texte: "" };
  const sel = document.getElementById("filtreCategorie");
  sel.innerHTML += Array.from(new Set(G.map(function (g) { return g.categorie; }))).sort().map(function (c) {
    return '<option value="' + c + '">' + c + "</option>";
  }).join("");

  function afficher() {
    const q = M.sansAccent(filtres.texte);
    const liste = G.filter(function (g) {
      return (!filtres.saga || g.saga === filtres.saga) && (!filtres.categorie || g.categorie === filtres.categorie) &&
        (!q || M.sansAccent(g.terme + " " + (g.vo || "") + " " + g.texte.replace(/\[\[.*?\]\]/g, "")).indexOf(q) !== -1);
    });
    document.getElementById("glossaire").innerHTML = liste.map(function (g) {
      return '<article class="terme" id="' + g.id + '"><h3>' + M.echap(g.terme) + (g.vo ? ' <span class="vo">VO : ' + M.echap(g.vo) + "</span>" : "") +
        " " + M.badge(g.saga) + '</h3><p class="meta" style="margin-bottom:4px">' + g.categorie + "</p><p>" + M.riche(g.texte) + "</p></article>";
    }).join("") || '<p class="meta">Aucun terme ne correspond.</p>';
    document.getElementById("compte").textContent = liste.length + " terme" + (liste.length > 1 ? "s" : "");
  }
  document.querySelectorAll("[data-filtre]").forEach(function (b) {
    b.addEventListener("click", function () {
      filtres.saga = b.dataset.valeur;
      document.querySelectorAll("[data-filtre]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      afficher();
    });
  });
  sel.addEventListener("change", function () { filtres.categorie = sel.value; afficher(); });
  document.getElementById("filtreTexte").addEventListener("input", function (e) { filtres.texte = e.target.value; afficher(); });
  afficher();

  function cibler() {
    const id = location.hash.slice(1);
    const el = id && document.getElementById(id);
    document.querySelectorAll(".terme.cible").forEach(function (x) { x.classList.remove("cible"); });
    if (el && el.classList.contains("terme")) { el.classList.add("cible"); el.scrollIntoView({ block: "center" }); }
  }
  cibler();
  window.addEventListener("hashchange", cibler);
});
