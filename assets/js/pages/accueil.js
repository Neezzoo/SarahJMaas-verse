/* Accueil : les trois portails.
   Au clic, l'arche s'illumine, s'ouvre jusqu'à remplir l'écran,
   puis la page de l'univers prend le relais (avec une arrivée en lumière). */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const M = window.MAAS;
  const passage = document.querySelector(".passage");
  const calme = window.matchMedia("(prefers-reduced-motion: reduce)");
  let enCours = false;

  document.getElementById("nbPersos") && (document.getElementById("nbPersos").textContent = M.personnages.length);
  if ((M.fanarts.accueil || {}).image) document.getElementById("sectionFanart").hidden = false;

  function memoriser(cle) { try { sessionStorage.setItem("maasverse-portail", cle); } catch (e) { /* stockage indisponible */ } }

  document.querySelectorAll(".portail").forEach(function (portail) {
    portail.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      if (enCours) return;
      enCours = true;
      const cle = portail.dataset.univers, url = portail.getAttribute("href");
      memoriser(cle);
      if (calme.matches || !passage.animate) { location.href = url; return; }

      const arche = portail.querySelector(".arche");
      const r = arche.getBoundingClientRect();
      const rayon = r.width / 2;
      document.body.classList.add("portail-en-cours");
      portail.classList.add("choisi");

      passage.className = "passage " + cle;
      passage.innerHTML = '<div class="passage-scene">' + M.scene(cle) + '</div><div class="passage-anneau"></div><div class="passage-eclat"></div>';
      Object.assign(passage.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: rayon + "px " + rayon + "px 6px 6px" });

      // 1. l'arche s'embrase
      setTimeout(function () {
        passage.classList.add("visible");
        // 2. le portail s'ouvre jusqu'aux bords de l'écran
        passage.animate([
          { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: rayon + "px " + rayon + "px 6px 6px" },
          { left: "0px", top: "0px", width: innerWidth + "px", height: innerHeight + "px", borderRadius: "0px 0px 0px 0px" },
        ], { duration: 950, easing: "cubic-bezier(.7,0,.25,1)", fill: "forwards" });
        passage.querySelector(".passage-scene").animate([{ transform: "scale(1)" }, { transform: "scale(1.45)" }],
          { duration: 1300, easing: "cubic-bezier(.5,0,.3,1)", fill: "forwards" });
        passage.querySelector(".passage-anneau").animate([
          { transform: "translate(-50%,-50%) scale(.2) rotate(0deg)", opacity: 0 },
          { transform: "translate(-50%,-50%) scale(1) rotate(90deg)", opacity: 1, offset: .5 },
          { transform: "translate(-50%,-50%) scale(3) rotate(180deg)", opacity: 0 },
        ], { duration: 1200, easing: "ease-out", fill: "forwards" });
        // 3. un éclat de lumière, puis le nouveau monde
        passage.querySelector(".passage-eclat").animate([{ opacity: 0 }, { opacity: 0, offset: .55 }, { opacity: 1 }],
          { duration: 1250, easing: "ease-in", fill: "forwards" }).onfinish = function () { location.href = url; };
      }, 380);
    });
  });

  // retour arrière : la page revient du cache, on referme le portail
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    enCours = false;
    document.body.classList.remove("portail-en-cours");
    document.querySelectorAll(".portail.choisi").forEach(function (p) { p.classList.remove("choisi"); });
    passage.className = "passage";
    passage.innerHTML = "";
    passage.getAnimations && passage.getAnimations().forEach(function (a) { a.cancel(); });
  });
});
