/* Page « Chronologie » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const NOTES = {
    parutions: "Dates de sortie en version originale (anglais).",
    multivers: "Ordre approximatif : les mondes n'ont peut-être pas le même écoulement du temps. Les étapes révélatrices sont masquées.",
  };
  const frise = document.getElementById("frise");
  function afficher(piste) {
    document.querySelectorAll("[data-piste]").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.piste === piste); });
    document.getElementById("noteFrise").textContent = NOTES[piste];
    frise.innerHTML = M.chronologie[piste].map(function (e) {
      return '<li class="' + e.saga + '"><div class="carte"><div class="date">' + M.echap(e.date) + "</div>" +
        M.badge(e.saga) + "<h3>" + M.riche(e.titre) + "</h3>" + (e.texte ? "<p>" + M.riche(e.texte) + "</p>" : "") + "</div></li>";
    }).join("");
  }
  document.querySelectorAll("[data-piste]").forEach(function (b) {
    b.addEventListener("click", function () { afficher(b.dataset.piste); history.replaceState(null, "", "#" + b.dataset.piste); });
  });
  afficher(location.hash === "#multivers" ? "multivers" : "parutions");
});
