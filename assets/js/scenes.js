/* ==========================================================
   Maasverse — les trois tableaux des portails
   Scènes SVG originales (1600 × 800), centrées pour être
   recadrées en portrait (portails) ou en paysage (bannières).
   MAAS.scene("tog" | "acotar" | "cc") renvoie le code SVG.
   ========================================================== */
(function () {
  "use strict";
  const M = (window.MAAS = window.MAAS || {});

  // petit générateur pseudo-aléatoire : la scène est identique à chaque affichage
  function graine(n) {
    return function () {
      n |= 0; n = (n + 0x6d2b79f5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = function (x) { return Math.round(x * 10) / 10; };

  function etoiles(alea, n, yMax, couleur) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const x = alea() * 1600, y = alea() * yMax, r = 0.5 + alea() * alea() * 1.8;
      const cl = alea() < 0.35 ? ' class="scint" style="animation-delay:' + f(alea() * 4) + 's"' : "";
      s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + (couleur || "#fff") + '" opacity="' + f(0.35 + alea() * 0.6) + '"' + cl + "/>";
    }
    return s;
  }
  function eclat(x, y, t, couleur) {
    return '<path class="scint" d="M' + x + " " + (y - t) + " L" + (x + t * 0.22) + " " + (y - t * 0.22) + " L" + (x + t) + " " + y +
      " L" + (x + t * 0.22) + " " + (y + t * 0.22) + " L" + x + " " + (y + t) + " L" + (x - t * 0.22) + " " + (y + t * 0.22) +
      " L" + (x - t) + " " + y + " L" + (x - t * 0.22) + " " + (y - t * 0.22) + 'Z" fill="' + couleur + '"/>';
  }
  // ligne de crête : des pics entre y1 et y2
  function crete(alea, y0, y1, pas, base) {
    let d = "M0 " + base + " L0 " + f(y0 + alea() * (y1 - y0));
    for (let x = pas; x <= 1600 + pas; x += pas) {
      d += " L" + f(x - pas / 2 + (alea() - 0.5) * pas * 0.4) + " " + f(y0 + alea() * (y1 - y0) - 30) + " L" + Math.min(x, 1600) + " " + f(y0 + alea() * (y1 - y0) + 20);
    }
    return d + " L1600 " + base + " Z";
  }
  function sapins(alea, n, yMin, yMax, couleur, taille) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const x = alea() * 1640 - 20, y = yMin + alea() * (yMax - yMin), h = taille * (0.6 + alea() * 0.7), l = h * 0.32;
      s += '<path d="M' + f(x) + " " + f(y - h) + " L" + f(x + l) + " " + f(y) + " L" + f(x - l) + " " + f(y) + 'Z" fill="' + couleur + '"/>';
    }
    return s;
  }

  /* ---------- Throne of Glass : le château de verre au couchant ---------- */
  function sceneTog() {
    const a = graine(7);
    let s = '<defs>' +
      '<linearGradient id="tg-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16244a"/><stop offset=".38" stop-color="#4a4778"/><stop offset=".62" stop-color="#d0704c"/><stop offset=".8" stop-color="#f4a35c"/><stop offset="1" stop-color="#ffd98e"/></linearGradient>' +
      '<radialGradient id="tg-soleil"><stop offset="0" stop-color="#fff6d8"/><stop offset=".18" stop-color="#ffe2a0" stop-opacity=".9"/><stop offset=".5" stop-color="#ffb066" stop-opacity=".35"/><stop offset="1" stop-color="#ff9a55" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="tg-verre" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3fdff"/><stop offset=".45" stop-color="#a9dfe6"/><stop offset="1" stop-color="#4b8397"/></linearGradient>' +
      '<linearGradient id="tg-roc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4f5c"/><stop offset="1" stop-color="#1b2422"/></linearGradient>' +
      '<linearGradient id="tg-chute" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#bff1f0" stop-opacity=".1"/></linearGradient>' +
      '<radialGradient id="tg-brume" cy=".3"><stop offset="0" stop-color="#ffe9c4" stop-opacity=".45"/><stop offset="1" stop-color="#ffe9c4" stop-opacity="0"/></radialGradient>' +
      '<filter id="tg-lueur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs>";
    s += '<rect width="1600" height="800" fill="url(#tg-ciel)"/>';
    s += etoiles(a, 60, 220, "#fff4dc");
    s += '<circle cx="800" cy="470" r="330" fill="url(#tg-soleil)"/><circle cx="800" cy="470" r="62" fill="#fff3cf" opacity=".9"/>';
    // nuages
    [[420, 340, 260], [1180, 300, 300], [760, 385, 220], [1460, 380, 180], [140, 300, 200]].forEach(function (n) {
      s += '<ellipse cx="' + n[0] + '" cy="' + n[1] + '" rx="' + n[2] + '" ry="' + n[2] * 0.07 + '" fill="#ffd2a1" opacity=".28"/>';
    });
    // montagnes lointaines
    s += '<path d="' + crete(a, 420, 470, 160, 800) + '" fill="#7d5f86" opacity=".55"/>';
    s += '<path d="' + crete(a, 480, 520, 120, 800) + '" fill="#4d5370" opacity=".7"/>';
    // collines boisées
    s += '<path d="M0 800 L0 560 C200 520 380 590 560 560 L1040 560 C1220 590 1400 520 1600 560 L1600 800Z" fill="#234538"/>';
    s += sapins(a, 70, 560, 640, "#1a3a2e", 46);
    // falaises lointaines et leurs chutes
    s += '<path d="M180 800 L230 520 L330 500 L380 800Z" fill="#2d3b3a"/><path d="M1240 800 L1290 510 L1390 520 L1430 800Z" fill="#2d3b3a"/>';
    s += '<rect x="296" y="505" width="9" height="290" fill="url(#tg-chute)"/><rect x="1318" y="515" width="9" height="280" fill="url(#tg-chute)"/>';
    // le rocher du château
    s += '<path d="M540 800 L600 610 L632 530 L690 486 L910 486 L968 530 L1000 610 L1060 800Z" fill="url(#tg-roc)"/>';
    s += '<path d="M632 530 L660 600 L640 680 M968 530 L940 610 L962 690 M760 486 L748 560 M850 486 L866 552" stroke="#1a2221" stroke-width="3" fill="none" opacity=".6"/>';
    // les cascades qui tombent du rocher
    [[646, 528, 16], [952, 528, 16], [800, 500, 10]].forEach(function (c) {
      s += '<path d="M' + (c[0] - c[2] / 2) + " " + c[1] + " L" + (c[0] + c[2] / 2) + " " + c[1] + " L" + (c[0] + c[2]) + " 790 L" + (c[0] - c[2]) + ' 790Z" fill="url(#tg-chute)"/>';
      s += '<path class="chute" d="M' + c[0] + " " + c[1] + " L" + c[0] + ' 790" stroke="#fff" stroke-width="' + c[2] * 0.35 + '" stroke-dasharray="10 18" opacity=".8"/>';
    });
    // le château de verre
    const tours = [[692, 22, 392], [736, 26, 330], [785, 30, 250], [839, 26, 330], [886, 22, 392], [662, 16, 430], [922, 16, 430]];
    s += '<g filter="url(#tg-lueur)">';
    s += '<rect x="676" y="424" width="248" height="64" fill="url(#tg-verre)" opacity=".92"/>';
    tours.forEach(function (t) {
      const x = t[0], l = t[1], y = t[2], h = l * 2.3;
      s += '<rect x="' + x + '" y="' + y + '" width="' + l + '" height="' + (488 - y) + '" fill="url(#tg-verre)" stroke="#f2fdff" stroke-opacity=".6"/>';
      s += '<path d="M' + (x - 4) + " " + y + " L" + (x + l / 2) + " " + (y - h) + " L" + (x + l + 4) + " " + y + 'Z" fill="url(#tg-verre)" stroke="#f2fdff" stroke-opacity=".7"/>';
      s += '<rect x="' + (x + l / 2 - 2.5) + '" y="' + (y + 18) + '" width="5" height="9" rx="2.5" fill="#ffd37a"/>';
    });
    s += '<path d="M700 470 Q800 440 900 470" stroke="#f2fdff" stroke-opacity=".7" fill="none"/>';
    s += "</g>";
    s += eclat(800, 190, 16, "#fffbe8");
    // forêt du premier plan et brume
    s += '<ellipse cx="800" cy="700" rx="700" ry="90" fill="url(#tg-brume)"/>';
    s += sapins(a, 90, 700, 800, "#0f2a20", 70);
    s += '<path d="M0 800 L0 740 C300 700 500 760 700 735 C760 728 860 728 920 740 C1150 770 1350 700 1600 740 L1600 800Z" fill="#0b1f18"/>';
    // le cerf blanc
    s += '<g transform="translate(700 742) scale(.95)" fill="#f8f3e7" stroke="#f8f3e7" stroke-linecap="round" filter="url(#tg-lueur)">' +
      '<ellipse cx="0" cy="-55" rx="38" ry="17"/>' +
      '<path d="M22 -64 L38 -96 L52 -92 L42 -56Z"/>' +
      '<path d="M37 -98 Q48 -110 62 -101 L72 -92 Q66 -86 57 -89 L48 -87Z"/>' +
      '<path d="M42 -101 L33 -111 L47 -105Z"/>' +
      '<g stroke-width="5" fill="none"><path d="M-28 -46 L-31 0"/><path d="M-17 -44 L-13 0"/><path d="M20 -46 L17 0"/><path d="M31 -48 L35 0"/></g>' +
      '<g stroke-width="2.6" fill="none"><path d="M44 -104 C40 -126 30 -136 20 -152"/><path d="M37 -123 L23 -127"/><path d="M30 -136 L17 -134"/><path d="M47 -104 C54 -126 62 -134 68 -152"/><path d="M57 -122 L71 -121"/><path d="M62 -134 L75 -140"/></g>' +
      '<ellipse cx="-38" cy="-63" rx="6" ry="4"/></g>';
    // oiseaux
    [[560, 300], [590, 285], [1030, 330], [1060, 318]].forEach(function (o) {
      s += '<path d="M' + o[0] + " " + o[1] + ' q7 -7 14 0 q7 -7 14 0" stroke="#2a2440" stroke-width="2" fill="none"/>';
    });
    return s;
  }

  /* ---------- ACOTAR : Velaris sous les étoiles ---------- */
  function sceneAcotar() {
    const a = graine(21);
    let s = '<defs>' +
      '<linearGradient id="ac-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04061c"/><stop offset=".45" stop-color="#11184e"/><stop offset=".72" stop-color="#2a2a70"/><stop offset="1" stop-color="#4b3b88"/></linearGradient>' +
      '<radialGradient id="ac-neb1"><stop offset="0" stop-color="#e5457f" stop-opacity=".35"/><stop offset="1" stop-color="#e5457f" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="ac-neb2"><stop offset="0" stop-color="#1fb5a6" stop-opacity=".3"/><stop offset="1" stop-color="#1fb5a6" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="ac-lune"><stop offset="0" stop-color="#e9ecff" stop-opacity=".55"/><stop offset="1" stop-color="#e9ecff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="ac-ville" cy=".7"><stop offset="0" stop-color="#ffbe6b" stop-opacity=".55"/><stop offset="1" stop-color="#ffbe6b" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="ac-fleuve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ad0"/><stop offset="1" stop-color="#1c2468"/></linearGradient>' +
      '<mask id="ac-croissant"><circle cx="1010" cy="170" r="68" fill="#fff"/><circle cx="1038" cy="150" r="62" fill="#000"/></mask>' +
      '<filter id="ac-lueur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs>";
    s += '<rect width="1600" height="800" fill="url(#ac-ciel)"/>';
    s += '<ellipse cx="520" cy="200" rx="420" ry="150" fill="url(#ac-neb1)"/><ellipse cx="1180" cy="300" rx="460" ry="140" fill="url(#ac-neb2)"/>';
    s += etoiles(a, 260, 560);
    [[640, 110, 9], [880, 70, 7], [1220, 140, 8], [380, 230, 6], [1420, 90, 7], [720, 300, 5]].forEach(function (e) { s += eclat(e[0], e[1], e[2], "#fff"); });
    // la lune
    s += '<circle cx="1010" cy="170" r="190" fill="url(#ac-lune)"/><circle cx="1010" cy="170" r="68" fill="#f2f3ff" mask="url(#ac-croissant)"/>';
    // deux Illyriens en vol devant la lune
    [[930, 210, 1], [985, 238, 0.75]].forEach(function (v) {
      s += '<g transform="translate(' + v[0] + " " + v[1] + ") scale(" + v[2] + ')" fill="#05061a">' +
        '<path d="M0 0 C-10 -14 -26 -20 -44 -16 C-36 -10 -34 -4 -36 2 C-28 -2 -22 0 -16 4 C-12 2 -6 2 0 6 C6 2 12 2 16 4 C22 0 28 -2 36 2 C34 -4 36 -10 44 -16 C26 -20 10 -14 0 0Z"/>' +
        '<ellipse cx="0" cy="6" rx="3" ry="9"/></g>';
    });
    // montagnes enneigées
    s += '<path d="' + crete(a, 330, 420, 150, 800) + '" fill="#1d2257" opacity=".85"/>';
    s += '<path d="M0 800 L0 470 L170 380 L300 440 L430 330 L560 420 L660 360 L800 250 L940 360 L1040 420 L1170 330 L1300 430 L1430 370 L1600 450 L1600 800Z" fill="#1a2058"/>';
    s += '<g fill="#d6ddff" opacity=".85"><path d="M800 250 L842 283 L826 280 L812 296 L796 284 L778 296 L770 280 L758 283Z"/>' +
      '<path d="M430 330 L466 358 L450 356 L436 368 L420 356 L404 360Z"/><path d="M1170 330 L1206 358 L1190 354 L1176 368 L1160 356 L1144 360Z"/>' +
      '<path d="M170 380 L198 396 L184 396 L172 406 L158 398 L146 400Z"/><path d="M1430 370 L1458 386 L1444 386 L1432 396 L1418 388 L1406 390Z"/></g>';
    // la Maison du Vent, tout en haut
    s += '<g filter="url(#ac-lueur)"><rect x="786" y="296" width="28" height="16" fill="#1a1f52"/><rect x="790" y="300" width="4" height="5" fill="#ffd27a"/><rect x="798" y="300" width="4" height="5" fill="#ffd27a"/><rect x="806" y="300" width="4" height="5" fill="#ffd27a"/></g>';
    // vallée
    s += '<path d="M0 800 L0 600 C220 560 420 620 560 600 C680 585 920 585 1040 600 C1180 620 1380 560 1600 600 L1600 800Z" fill="#0c1038"/>';
    s += '<ellipse cx="800" cy="660" rx="420" ry="120" fill="url(#ac-ville)"/>';
    // le fleuve Sidra
    s += '<path d="M770 800 C760 740 860 720 820 680 C790 650 700 650 640 620 L690 618 C760 640 860 645 880 682 C910 730 860 760 880 800Z" fill="url(#ac-fleuve)" opacity=".9"/>';
    for (let i = 0; i < 26; i++) {
      const y = 640 + a() * 155, x = 700 + (y - 640) * 0.45 + a() * 90;
      s += '<circle class="scint" cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(0.8 + a()) + '" fill="#fff" opacity=".8" style="animation-delay:' + f(a() * 4) + 's"/>';
    }
    // la ville
    let maisons = "", fenetres = "";
    for (let i = 0; i < 120; i++) {
      const x = 470 + a() * 660, y = 615 + a() * 150, h = 14 + a() * 26, l = 10 + a() * 16;
      if (x > 690 + (y - 640) * 0.45 && x < 790 + (y - 640) * 0.45 && y > 640) continue; // pas de maisons dans le fleuve
      maisons += '<rect x="' + f(x) + '" y="' + f(y - h) + '" width="' + f(l) + '" height="' + f(h) + '"/><path d="M' + f(x - 2) + " " + f(y - h) + " L" + f(x + l / 2) + " " + f(y - h - l * 0.6) + " L" + f(x + l + 2) + " " + f(y - h) + 'Z"/>';
      const n = 1 + Math.floor(a() * 3);
      for (let k = 0; k < n; k++) fenetres += '<rect x="' + f(x + 2 + a() * (l - 6)) + '" y="' + f(y - h + 4 + a() * (h - 10)) + '" width="3" height="4"/>';
    }
    s += '<g fill="#0a0d2e">' + maisons + "</g>";
    s += '<g fill="#ffcf7a" filter="url(#ac-lueur)">' + fenetres + "</g>";
    s += '<g fill="none" stroke="#2a2f6a" stroke-width="4"><path d="M690 676 Q735 650 790 676"/><path d="M760 730 Q805 706 860 730"/></g>';
    // ronces et roses aux deux bords
    function ronce(x0, sens) {
      let r = '<g transform="translate(' + x0 + ' 800) scale(' + sens + ' 1)"><path d="M0 0 C40 -80 10 -160 70 -230 C110 -280 90 -340 140 -390 M30 -120 C70 -130 90 -110 120 -140 M60 -260 C30 -290 20 -320 30 -350" stroke="#081a1a" stroke-width="7" fill="none"/>';
      [[70, -230], [140, -390], [120, -140], [30, -350]].forEach(function (p) {
        r += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="13" fill="#b51f4a"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="#e5457f"/>';
      });
      return r + "</g>";
    }
    s += ronce(60, 1) + ronce(1540, -1);
    return s;
  }

  /* ---------- Crescent City : Lunathion sous le croissant ---------- */
  function sceneCc() {
    const a = graine(42);
    let s = '<defs>' +
      '<linearGradient id="cc-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14051f"/><stop offset=".4" stop-color="#43103f"/><stop offset=".68" stop-color="#a11d4f"/><stop offset=".86" stop-color="#e44b5c"/><stop offset="1" stop-color="#ff8f6b"/></linearGradient>' +
      '<radialGradient id="cc-lune"><stop offset="0" stop-color="#ffd6e0" stop-opacity=".6"/><stop offset="1" stop-color="#ff7aa0" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="cc-fleuve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a0d34"/><stop offset="1" stop-color="#12041a"/></linearGradient>' +
      '<mask id="cc-croissant"><circle cx="800" cy="215" r="128" fill="#fff"/><circle cx="852" cy="182" r="114" fill="#000"/></mask>' +
      '<filter id="cc-neon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs>";
    s += '<rect width="1600" height="800" fill="url(#cc-ciel)"/>';
    s += etoiles(a, 90, 330, "#ffe6f0");
    s += '<circle cx="800" cy="215" r="320" fill="url(#cc-lune)"/><circle cx="800" cy="215" r="128" fill="#fff0f3" mask="url(#cc-croissant)"/>';
    // traînées de nuages
    [[300, 360, 240], [1250, 330, 280], [820, 420, 300], [1500, 420, 160]].forEach(function (n) {
      s += '<ellipse cx="' + n[0] + '" cy="' + n[1] + '" rx="' + n[2] + '" ry="' + f(n[2] * 0.05) + '" fill="#ff9fb5" opacity=".22"/>';
    });
    // un ange en vol devant la lune
    s += '<g transform="translate(700 260)" fill="#1a0619">' +
      '<path d="M0 0 C-14 -26 -40 -44 -78 -50 C-62 -40 -58 -30 -66 -22 C-52 -24 -44 -18 -40 -10 C-30 -14 -18 -8 -10 2Z"/>' +
      '<path d="M6 0 C20 -26 46 -44 84 -50 C68 -40 64 -30 72 -22 C58 -24 50 -18 46 -10 C36 -14 24 -8 16 2Z"/>' +
      '<ellipse cx="3" cy="10" rx="5" ry="15"/><circle cx="3" cy="-8" r="5"/></g>';
    // trois plans d'immeubles
    const couleursFen = ["#ffd27a", "#ff6fb1", "#6fe3ff", "#ffe9f0"];
    function plan(n, yBase, hMin, hMax, couleur, fen, neons) {
      let b = "", w = "", ne = "";
      let x = -20;
      while (x < 1620) {
        const l = 34 + a() * 70, h = hMin + a() * (hMax - hMin), y = yBase - h;
        b += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(l) + '" height="' + f(h + 200) + '"/>';
        if (a() < 0.3) b += '<rect x="' + f(x + l * 0.2) + '" y="' + f(y - 16) + '" width="' + f(l * 0.6) + '" height="16"/>';
        if (a() < 0.25) b += '<rect x="' + f(x + l / 2 - 1) + '" y="' + f(y - 46) + '" width="2" height="46"/>';
        if (fen) {
          for (let yy = y + 10; yy < yBase - 6; yy += 13) {
            for (let xx = x + 6; xx < x + l - 8; xx += 11) {
              if (a() < fen) w += '<rect x="' + f(xx) + '" y="' + f(yy) + '" width="5" height="6" fill="' + couleursFen[Math.floor(a() * a() * 4)] + '"/>';
            }
          }
        }
        if (neons && a() < neons) {
          const c = a() < 0.5 ? "#ff3fa4" : "#3fe0ff";
          ne += '<path class="neon" style="animation-delay:' + f(a() * 6) + 's" d="M' + f(x + 5) + " " + f(y + 14) + " L" + f(x + 5) + " " + f(y + 14 + Math.min(80, h * 0.5)) + '" stroke="' + c + '" stroke-width="3"/>';
        }
        x += l + a() * 8;
      }
      return '<g fill="' + couleur + '">' + b + "</g><g>" + w + '</g><g filter="url(#cc-neon)">' + ne + "</g>";
    }
    s += plan(1, 520, 60, 200, "#5a1647", 0, 0);
    s += plan(2, 610, 90, 260, "#2d0a2e", 0.18, 0.12);
    // le Comitium, au centre
    s += '<g fill="#1d061f"><rect x="770" y="250" width="60" height="460"/><path d="M770 250 L800 150 L830 250Z"/><rect x="740" y="380" width="120" height="330"/></g>';
    s += '<g filter="url(#cc-neon)"><path d="M800 160 L800 700" stroke="#ff7ad1" stroke-width="2" opacity=".85"/><path class="neon" d="M748 400 L748 690 M852 400 L852 690" stroke="#3fe0ff" stroke-width="2.5"/></g>';
    s += plan(3, 720, 70, 200, "#14041a", 0.24, 0.2);
    // le fleuve Istros et ses reflets
    s += '<rect x="0" y="716" width="1600" height="84" fill="url(#cc-fleuve)"/>';
    for (let i = 0; i < 70; i++) {
      const x = a() * 1600, y = 722 + a() * 74;
      s += '<rect class="reflet" style="animation-delay:' + f(a() * 3) + 's" x="' + f(x) + '" y="' + f(y) + '" width="' + f(10 + a() * 40) + '" height="2" fill="' + couleursFen[Math.floor(a() * 3)] + '" opacity=".5"/>';
    }
    s += '<rect x="780" y="722" width="40" height="70" fill="#ffd6e0" opacity=".12"/>';
    return s;
  }

  const SCENES = { tog: sceneTog, acotar: sceneAcotar, cc: sceneCc };
  const cache = {};
  /* Illustrations choisies par la fan : elles remplacent les dessins quand elles sont renseignées.
     cadrage : la partie de l'image à garder visible quand elle est recadrée. */
  const ILLUSTRATIONS = {
    tog: { image: "assets/img/portails/tog.jpg", credit: "Dream World Dweller", cadrage: "50% 42%" },
    acotar: { image: "assets/img/portails/acotar.jpg", credit: "", cadrage: "55% 42%" },
    cc: { image: "assets/img/portails/cc.jpg", credit: "", cadrage: "52% 55%" },
  };
  M.ILLUSTRATIONS = ILLUSTRATIONS;
  M.creditIllustration = function (cle) {
    const il = ILLUSTRATIONS[cle];
    if (!il || !il.image) return "";
    return "Illustration : " + (il.credit || "artiste à créditer (Pinterest)");
  };
  M.scene = function (cle, classe) {
    const il = ILLUSTRATIONS[cle];
    if (il && il.image) {
      return '<img class="scene scene-image scene-' + cle + " " + (classe || "") + '" src="' + il.image + '" alt="" style="object-position:' + il.cadrage + '" decoding="async">';
    }
    if (!cache[cle]) cache[cle] = SCENES[cle]();
    return '<svg class="scene scene-' + cle + " " + (classe || "") + '" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + cache[cle] + "</svg>";
  };
  // remplit automatiquement les <span data-scene="tog"></span>
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-scene]").forEach(function (el) { el.innerHTML = M.scene(el.dataset.scene); });
  });
})();
