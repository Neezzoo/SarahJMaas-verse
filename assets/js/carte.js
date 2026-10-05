/* ==========================================================
   Maasverse — moteur des cartes (SVG, zoom et déplacement)
   ========================================================== */
(function () {
  "use strict";
  const M = window.MAAS;
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- Bruit déterministe pour « dessiner » les côtes ---------- */
  function aleatoire(graine) {
    let s = graine >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function graineDe(txt) { let h = 2166136261; for (let i = 0; i < txt.length; i++) { h ^= txt.charCodeAt(i); h = Math.imul(h, 16777619); } return h; }

  // Découpe chaque côté en petits segments et les décale un peu : effet de côte dessinée.
  function irregulier(points, graine, amplitude, pas) {
    const r = aleatoire(graine);
    const sortie = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const long = Math.hypot(dx, dy);
      const n = Math.max(1, Math.round(long / pas));
      const nx = -dy / (long || 1), ny = dx / (long || 1);
      for (let k = 0; k < n; k++) {
        const t = k / n;
        const dec = k === 0 ? 0 : (r() - 0.5) * 2 * amplitude;
        sortie.push([a[0] + dx * t + nx * dec, a[1] + dy * t + ny * dec]);
      }
    }
    return sortie;
  }
  // Courbe lisse fermée (Catmull-Rom → Bézier)
  function cheminLisse(pts, ferme) {
    const n = pts.length;
    if (n < 2) return "";
    const P = function (i) { return ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]; };
    let d = "M" + pts[0][0].toFixed(1) + "," + pts[0][1].toFixed(1);
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += "C" + c1[0].toFixed(1) + "," + c1[1].toFixed(1) + " " + c2[0].toFixed(1) + "," + c2[1].toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
    }
    return d + (ferme ? "Z" : "");
  }
  function polygone(pts) { return "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L") + "Z"; }

  function el(nom, attrs, parent) {
    const e = document.createElementNS(NS, nom);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  const COULEURS_SAGA = { tog: "#ef7d3c", acotar: "#e5457f", cc: "#d9ad52" };

  /* ---------- Construction d'une carte ---------- */
  function Carte(cadre, cle, surSelection) {
    this.cadre = cadre;
    this.cle = cle;
    this.donnees = M.cartes[cle];
    this.surSelection = surSelection;
    this.construire();
    this.activerInteractions();
  }

  Carte.prototype.construire = function () {
    const d = this.donnees, W = d.largeur, H = d.hauteur, cle = this.cle;
    const accent = COULEURS_SAGA[d.saga] || "#e7c56b";
    const svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Carte de " + d.titre });
    this.svg = svg;
    const defs = el("defs", {}, svg);
    const deg = el("radialGradient", { id: "degradeMer", cx: "50%", cy: "45%", r: "75%" }, defs);
    el("stop", { offset: "0%", "stop-color": d.ville ? "#16233a" : "#13294a" }, deg);
    el("stop", { offset: "100%", "stop-color": "#070b16" }, deg);
    const lueur = el("filter", { id: "lueur-" + cle, x: "-20%", y: "-20%", width: "140%", height: "140%" }, defs);
    el("feGaussianBlur", { stdDeviation: "6", result: "flou" }, lueur);
    const fusion = el("feMerge", {}, lueur);
    el("feMergeNode", { in: "flou" }, fusion);
    el("feMergeNode", { in: "SourceGraphic" }, fusion);
    // motif de vagues
    const motif = el("pattern", { id: "vagues-" + cle, width: "60", height: "30", patternUnits: "userSpaceOnUse" }, defs);
    el("path", { d: "M0 15 q15 -8 30 0 t30 0", fill: "none", stroke: "rgba(140,180,230,.07)", "stroke-width": "1.2" }, motif);

    const monde = el("g", { class: "monde" }, svg);
    this.monde = monde;
    el("rect", { x: -W, y: -H, width: W * 3, height: H * 3, class: "mer" }, monde);
    el("rect", { x: -W, y: -H, width: W * 3, height: H * 3, fill: "url(#vagues-" + cle + ")" }, monde);

    // Terres
    const formes = {};
    d.terres.forEach(function (t) {
      const pts = t.lisse ? t.points : irregulier(t.points, graineDe(cle + t.id), 9, 22);
      const chemin = t.lisse ? polygone(pts) : cheminLisse(pts, true);
      formes[t.id] = chemin;
      const cp = el("clipPath", { id: "clip-" + cle + "-" + t.id }, defs);
      el("path", { d: chemin }, cp);
    });
    const gTerres = el("g", { filter: "url(#lueur-" + cle + ")" }, monde);
    d.terres.forEach(function (t) {
      el("path", { d: formes[t.id], class: "terre", fill: t.couleur, stroke: accent, "stroke-opacity": ".75" }, gTerres);
    });

    // Régions
    const self = this;
    const gRegions = el("g", {}, monde);
    (d.regions || []).forEach(function (r) {
      const pts = irregulier(r.points, graineDe(cle + r.id), 4, 30);
      const p = el("path", {
        d: cheminLisse(pts, true), class: "region", fill: r.couleur, "fill-opacity": ".32",
        "clip-path": "url(#clip-" + cle + "-" + r.terre + ")",
      }, gRegions);
      p.addEventListener("click", function (e) { if (!self.aBouge) { e.stopPropagation(); self.selectionner({ region: r }); } });
    });

    // Forêts, montagnes, fleuves, mur
    const gDeco = el("g", { "pointer-events": "none" }, monde);
    (d.forets || []).forEach(function (f) {
      const r = aleatoire(graineDe(cle + f.join()));
      for (let i = 0; i < 7; i++) {
        const a = r() * Math.PI * 2, dist = r() * f[2];
        el("circle", { cx: f[0] + Math.cos(a) * dist, cy: f[1] + Math.sin(a) * dist, r: 5 + r() * 5, class: "foret" }, gDeco);
      }
    });
    (d.montagnes || []).forEach(function (m) {
      const x = m[0], y = m[1], s = m[2];
      el("path", { d: "M" + (x - s) + "," + (y + s * .5) + " L" + x + "," + (y - s * .6) + " L" + (x + s) + "," + (y + s * .5) +
        " M" + (x - s * .2) + "," + (y - s * .2) + " L" + (x + s * .15) + "," + (y + s * .1), class: "montagne" }, gDeco);
    });
    (d.fleuves || []).forEach(function (f) {
      const pts = Array.isArray(f) ? f : f.points;
      const larg = Array.isArray(f) ? null : f.largeur;
      const attrs = { d: cheminLisse(pts, false), class: "fleuve" };
      if (larg) { attrs.style = "stroke-width:" + larg + ";stroke:#1b3b62;opacity:1"; }
      el("path", attrs, gDeco);
      if (larg) el("path", { d: cheminLisse(pts, false), class: "fleuve", style: "stroke-width:" + (larg - 14) + ";stroke:#24507f;opacity:.6" }, gDeco);
    });
    if (d.mur) el("path", { d: cheminLisse(d.mur, false), class: "mur" }, gDeco);

    // Étiquettes de mers et de régions
    (d.mers || []).forEach(function (m) {
      const t = el("text", { x: m.x, y: m.y, class: "nom-mer", "font-size": m.taille }, gDeco);
      t.textContent = m.nom;
    });
    (d.regions || []).forEach(function (r) {
      const c = centreRegion(r, d);
      const t = el("text", { x: c[0], y: c[1], class: "nom-region", "font-size": d.ville ? 20 : 22 }, gDeco);
      t.textContent = r.nom;
    });
    if (d.mur) {
      const m = d.mur[1];
      const t = el("text", { x: m[0], y: m[1] - 12, class: "nom-region", "font-size": 15, fill: "#f4e3ae" }, gDeco);
      t.textContent = "Le Mur";
    }

    // Lieux
    const gLieux = el("g", {}, monde);
    this.marqueurs = {};
    d.lieux.forEach(function (l) {
      const g = el("g", { class: "marqueur" + (l.importance === 2 ? " mineur" : ""), tabindex: "0", role: "button", "aria-label": l.nom }, gLieux);
      g.dataset.x = l.x; g.dataset.y = l.y;
      const interne = el("g", {}, g);
      el("circle", { r: 16, class: "halo", fill: accent, "fill-opacity": ".25" }, interne);
      el("circle", { r: l.importance === 1 ? 7 : 5, class: "point", fill: l.importance === 1 ? accent : "#f4e3ae" }, interne);
      const t = el("text", { x: 11, y: 4 }, interne);
      t.textContent = l.nom;
      g.addEventListener("click", function (e) { if (!self.aBouge) { e.stopPropagation(); self.selectionner({ lieu: l }); } });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); self.selectionner({ lieu: l }); } });
      self.marqueurs[l.id] = g;
    });

    this.cadre.querySelectorAll("svg").forEach(function (s) { s.remove(); });
    this.cadre.prepend(svg);
    this.vue = { x: 0, y: 0, w: W, h: H };
    this.appliquer();
  };

  function centreRegion(r, d) {
    if (r.etiquette) return r.etiquette;
    // centre du polygone, recadré dans la terre correspondante
    let x = 0, y = 0;
    r.points.forEach(function (p) { x += p[0]; y += p[1]; });
    x /= r.points.length; y /= r.points.length;
    const terre = d.terres.filter(function (t) { return t.id === r.terre; })[0];
    if (terre) {
      let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
      terre.points.forEach(function (p) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); });
      let rx0 = 1e9, rx1 = -1e9, ry0 = 1e9, ry1 = -1e9;
      r.points.forEach(function (p) { rx0 = Math.min(rx0, p[0]); rx1 = Math.max(rx1, p[0]); ry0 = Math.min(ry0, p[1]); ry1 = Math.max(ry1, p[1]); });
      x = (Math.max(rx0, minX) + Math.min(rx1, maxX)) / 2;
      y = (Math.max(ry0, minY) + Math.min(ry1, maxY)) / 2;
    }
    return [x, y];
  }

  /* ---------- Vue : zoom et déplacement ---------- */
  Carte.prototype.echelle = function () { return this.donnees.largeur / this.vue.w; };

  Carte.prototype.facteurBase = function () {
    // à zoom 1, un marqueur doit faire environ la même taille à l'écran quelle que soit la largeur du cadre
    const r = this.cadre.getBoundingClientRect();
    if (!r.width) return 1.3;
    return Math.max(1, Math.min(2.4, this.donnees.largeur / r.width));
  };

  Carte.prototype.adapterRatio = function () {
    const r = this.cadre.getBoundingClientRect();
    if (r.width && r.height) this.ratio = r.height / r.width;
  };

  Carte.prototype.reinitialiser = function () {
    this.adapterRatio();
    const d = this.donnees;
    const ratio = this.ratio || d.hauteur / d.largeur;
    // tout montrer
    let w = d.largeur;
    if (d.hauteur > w * ratio) w = d.hauteur / ratio;
    this.vue = { w: w, h: w * ratio, x: (d.largeur - w) / 2, y: (d.hauteur - w * ratio) / 2 };
    this.appliquerSansBornes();
  };
  Carte.prototype.appliquerSansBornes = function () {
    const v = this.vue;
    this.svg.setAttribute("viewBox", v.x + " " + v.y + " " + v.w + " " + v.h);
    this.minW = v.w;
    this.appliquerEchelleMarqueurs();
  };
  Carte.prototype.appliquerEchelleMarqueurs = function () {
    const k = this.donnees.largeur / this.vue.w;
    const taille = this.facteurBase() / Math.pow(Math.max(k, 0.5), 0.85);
    for (const id in this.marqueurs) {
      const g = this.marqueurs[id];
      g.firstChild.setAttribute("transform", "translate(" + g.dataset.x + "," + g.dataset.y + ") scale(" + taille.toFixed(3) + ")");
    }
    this.cadre.classList.toggle("zoome", k >= 1.6);
  };
  // Bornes souples : on ne peut pas trop s'éloigner de la vue d'ensemble
  Carte.prototype.appliquer = function () {
    const v = this.vue, d = this.donnees;
    const maxW = this.minW || d.largeur;
    v.w = Math.min(Math.max(v.w, maxW / 8), maxW);
    v.h = v.w * (this.ratio || d.hauteur / d.largeur);
    const cx0 = d.largeur / 2, cy0 = d.hauteur / 2;
    const libreX = Math.max(0, (maxW - v.w) / 2 + d.largeur * 0.08 + Math.max(0, d.largeur - maxW) / 2);
    const hTot = maxW * (this.ratio || d.hauteur / d.largeur);
    const libreY = Math.max(0, (hTot - v.h) / 2 + d.hauteur * 0.08 + Math.max(0, d.hauteur - hTot) / 2);
    const cx = Math.min(Math.max(v.x + v.w / 2, cx0 - libreX), cx0 + libreX);
    const cy = Math.min(Math.max(v.y + v.h / 2, cy0 - libreY), cy0 + libreY);
    v.x = cx - v.w / 2; v.y = cy - v.h / 2;
    this.svg.setAttribute("viewBox", v.x + " " + v.y + " " + v.w + " " + v.h);
    this.appliquerEchelleMarqueurs();
  };

  Carte.prototype.zoomer = function (facteur, px, py) {
    // px, py : position dans le cadre (0..1). Par défaut, le centre.
    if (px == null) { px = 0.5; py = 0.5; }
    const v = this.vue;
    const ux = v.x + v.w * px, uy = v.y + v.h * py;
    const nw = v.w / facteur;
    const maxW = this.minW || this.donnees.largeur;
    const w = Math.min(Math.max(nw, maxW / 8), maxW);
    const h = w * (this.ratio || this.donnees.hauteur / this.donnees.largeur);
    v.x = ux - w * px; v.y = uy - h * py; v.w = w; v.h = h;
    this.appliquer();
  };

  Carte.prototype.centrerSur = function (x, y, k) {
    const maxW = this.minW || this.donnees.largeur;
    const w = maxW / (k || 2.2);
    const h = w * (this.ratio || this.donnees.hauteur / this.donnees.largeur);
    this.vue = { x: x - w / 2, y: y - h / 2, w: w, h: h };
    this.appliquer();
  };

  Carte.prototype.activerInteractions = function () {
    const self = this, cadre = this.cadre;
    const pointeurs = new Map();
    let depart = null, distDepart = 0, vueDepart = null;

    function posRel(e) {
      const r = self.svg.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    }
    this.surRoulette = function (e) {
      e.preventDefault();
      const p = posRel(e);
      self.zoomer(e.deltaY < 0 ? 1.18 : 1 / 1.18, p[0], p[1]);
    };
    this.surBas = function (e) {
      if (e.target.closest(".commandes")) return;
      cadre.setPointerCapture && cadre.setPointerCapture(e.pointerId);
      pointeurs.set(e.pointerId, [e.clientX, e.clientY]);
      self.aBouge = false;
      vueDepart = Object.assign({}, self.vue);
      if (pointeurs.size === 1) depart = [e.clientX, e.clientY];
      if (pointeurs.size === 2) {
        const p = Array.from(pointeurs.values());
        distDepart = Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]);
      }
      cadre.classList.add("saisie");
    };
    this.surDeplacement = function (e) {
      if (!pointeurs.has(e.pointerId)) return;
      pointeurs.set(e.pointerId, [e.clientX, e.clientY]);
      const r = self.svg.getBoundingClientRect();
      if (pointeurs.size === 1 && depart) {
        const dx = e.clientX - depart[0], dy = e.clientY - depart[1];
        if (Math.abs(dx) + Math.abs(dy) > 4) self.aBouge = true;
        self.vue.x = vueDepart.x - dx * vueDepart.w / r.width;
        self.vue.y = vueDepart.y - dy * vueDepart.h / r.height;
        self.appliquer();
      } else if (pointeurs.size === 2) {
        self.aBouge = true;
        const p = Array.from(pointeurs.values());
        const dist = Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]);
        const mx = ((p[0][0] + p[1][0]) / 2 - r.left) / r.width, my = ((p[0][1] + p[1][1]) / 2 - r.top) / r.height;
        self.vue = Object.assign({}, vueDepart);
        self.zoomer(dist / (distDepart || dist), mx, my);
      }
    };
    this.surHaut = function (e) {
      pointeurs.delete(e.pointerId);
      if (pointeurs.size === 1) {
        // reprendre un déplacement à un doigt
        depart = Array.from(pointeurs.values())[0];
        vueDepart = Object.assign({}, self.vue);
      }
      if (!pointeurs.size) cadre.classList.remove("saisie");
      setTimeout(function () { if (!pointeurs.size) self.aBouge = false; }, 0);
    };
    this.svg.addEventListener("wheel", this.surRoulette, { passive: false });
    this.svg.addEventListener("pointerdown", this.surBas);
    this.svg.addEventListener("pointermove", this.surDeplacement);
    this.svg.addEventListener("pointerup", this.surHaut);
    this.svg.addEventListener("pointercancel", this.surHaut);
    this.svg.addEventListener("click", function (e) {
      if (!self.aBouge && !e.target.closest(".marqueur") && !e.target.classList.contains("region")) self.selectionner(null);
    });
  };

  Carte.prototype.selectionner = function (sel) {
    for (const id in this.marqueurs) this.marqueurs[id].classList.remove("actif");
    if (sel && sel.lieu) this.marqueurs[sel.lieu.id].classList.add("actif");
    if (this.surSelection) this.surSelection(sel, this);
  };

  M.Carte = Carte;
})();
