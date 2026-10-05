/* Page « Quiz » */
document.addEventListener("DOMContentLoaded", function () {
  const M = window.MAAS;
  const zone = document.getElementById("quiz");
  const NB = 10;
  let questions = [], index = 0, score = 0, saga = "";

  function melanger(t) {
    const a = t.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }

  function accueil() {
    const compte = function (s) { return M.quiz.filter(function (q) { return !s || q.saga === s; }).length; };
    zone.innerHTML = '<div class="carte centre" style="padding:34px">' +
      "<h2>Choisissez votre quiz</h2>" +
      '<div class="puces" style="justify-content:center;margin:20px 0">' +
      '<button class="puce" data-saga="" aria-pressed="false">Les trois sagas (' + compte("") + " questions)</button>" +
      '<button class="puce" data-saga="tog" aria-pressed="false">Throne of Glass</button>' +
      '<button class="puce" data-saga="acotar" aria-pressed="false">ACOTAR</button>' +
      '<button class="puce" data-saga="cc" aria-pressed="false">Crescent City</button>' +
      '<button class="puce" data-saga="multi" aria-pressed="false">Spécial liens</button>' +
      "</div><p class=\"meta\">Les questions évitent les grosses révélations, mais quelques détails de l'histoire y passent.</p></div>";
    zone.querySelectorAll("[data-saga]").forEach(function (b) {
      b.addEventListener("click", function () { demarrer(b.dataset.saga); });
    });
  }

  function demarrer(s) {
    saga = s;
    questions = melanger(M.quiz.filter(function (q) { return !s || q.saga === s; })).slice(0, NB).map(function (q) {
      // mélanger aussi les réponses
      const ordre = melanger(q.choix.map(function (c, i) { return i; }));
      return { saga: q.saga, q: q.q, explication: q.explication, choix: ordre.map(function (i) { return q.choix[i]; }), bonne: ordre.indexOf(q.bonne) };
    });
    index = 0; score = 0;
    question();
  }

  function question() {
    const q = questions[index];
    zone.innerHTML = '<div class="progression"><div style="width:' + (index / questions.length * 100) + '%"></div></div>' +
      '<p class="meta">Question ' + (index + 1) + " / " + questions.length + " · " + M.badge(q.saga) + "</p>" +
      '<p class="question">' + M.riche(q.q) + "</p>" +
      '<div class="reponses">' + q.choix.map(function (c, i) { return '<button data-i="' + i + '">' + M.riche(c) + "</button>"; }).join("") + "</div>" +
      '<div id="suite"></div>';
    zone.querySelectorAll(".reponses button").forEach(function (b) {
      b.addEventListener("click", function () { repondre(+b.dataset.i); });
    });
  }

  function repondre(i) {
    const q = questions[index];
    const boutons = zone.querySelectorAll(".reponses button");
    boutons.forEach(function (b, j) {
      b.disabled = true;
      if (j === q.bonne) b.classList.add("bonne");
      else if (j === i) b.classList.add("mauvaise");
    });
    if (i === q.bonne) score++;
    const dernier = index === questions.length - 1;
    document.getElementById("suite").innerHTML = '<div class="explication">' + (i === q.bonne ? "✓ Bonne réponse ! " : "✗ Raté. ") + M.riche(q.explication) + "</div>" +
      '<p style="margin-top:16px;text-align:right"><button class="btn" id="suivant">' + (dernier ? "Voir mon score" : "Question suivante →") + "</button></p>";
    document.getElementById("suivant").addEventListener("click", function () {
      if (dernier) resultat(); else { index++; question(); }
    });
    document.getElementById("suivant").focus();
  }

  function resultat() {
    const ratio = score / questions.length;
    const titre = ratio === 1 ? "Digne de la Grande Dame de la Cour de la Nuit !"
      : ratio >= 0.7 ? "Une vraie Étoilée."
      : ratio >= 0.4 ? "Pas mal pour une recrue de la Treize."
      : "Retour aux mines d'Endovier pour réviser…";
    zone.innerHTML = '<div class="carte centre" style="padding:34px"><p class="meta">VOTRE SCORE</p>' +
      '<div class="score">' + score + " / " + questions.length + "</div><h2>" + titre + "</h2>" +
      '<div class="puces" style="justify-content:center;margin-top:18px">' +
      '<button class="btn" id="rejouer">Rejouer</button><button class="btn secondaire" id="changer">Changer de quiz</button></div></div>';
    document.getElementById("rejouer").addEventListener("click", function () { demarrer(saga); });
    document.getElementById("changer").addEventListener("click", accueil);
  }

  accueil();
});
