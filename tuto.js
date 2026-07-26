/* Tuto — démonstrations animées.

   Chaque démo est une maquette miniature de l'éditeur + un scénario :
   une liste d'étapes jouées dans l'ordre (déplacer le curseur, cliquer,
   taper, afficher un message). Rien n'est enregistré nulle part : ce
   sont des décors, les vraies cartes ne sont jamais touchées. */

(function () {

  const CURSEUR = `<svg viewBox="0 0 24 24" width="16" height="16">
      <path d="M5 2l14 10-6 1 3.5 6.5-2.6 1.4L10.4 14 5 18z" fill="#141110" stroke="#fff" stroke-width="1.4"/>
    </svg>`;

  const PLATS = [
    { nm: 'MATCHA LATTE', en: 'Thé vert matcha, lait mousseux', pr: '6.5' },
    { nm: 'GOLDEN LATTE', en: 'Curcuma, gingembre, cannelle, poivre', pr: '6.5' },
    { nm: 'CHAÏ LATTE', en: 'Thé noir épicé, cardamome, cannelle', pr: '6.5' },
  ];

  /* ---------- Construction de la maquette ---------- */
  function maquette(opts) {
    opts = opts || {};
    const rows = (opts.plats || PLATS).map((p, i) => `
      <div class="drow" data-row="${i}">
        <span class="nm">${p.nm}${p.en ? '<span class="en">' + p.en + '</span>' : ''}</span>
        <span class="dots"></span>
        <span class="pr">${p.pr}</span>
        <span class="drow-ctrl"><span data-c="grip">⠿</span><span data-c="veg">V</span><span data-c="hide">👁</span><span data-c="del">✕</span></span>
      </div>`).join('');

    return `
      <div class="demo-bar">
        <span class="demo-brand">Carte</span>
        <span class="dbtn" data-b="undo">↶</span>
        <span class="dbtn" data-b="add">+ Ajouter un bloc</span>
        <span class="dbtn" data-b="app">🎨 Apparence</span>
        <span class="dbtn teal" data-b="save">💾 Enregistrer</span>
        <span class="dbtn" data-b="versions">🕑 Versions</span>
        <span class="dbtn dark" data-b="pdf">⬇️ PDF</span>
      </div>
      <div class="demo-tabs">
        <span class="on">Planche 1</span><span>Planche 2</span>
      </div>
      <div class="demo-page">
        <div class="demo-h">LES LATTES <span style="color:#8a8a8a;font-size:10px;font-style:italic">signature</span></div>
        ${rows}
      </div>
      <div class="dsheet"><div class="dsheet-box"></div></div>
      <div class="dtoast"></div>
      <div class="cursor">${CURSEUR}</div>
      <div class="demo-foot">
        <span class="step">Cliquez sur « Rejouer » pour lancer la démonstration.</span>
        <button class="replay" type="button">▶ Rejouer</button>
      </div>`;
  }

  /* ---------- Petits outils d'animation ---------- */
  function acteur(demo) {
    const cur = demo.querySelector('.cursor');
    const toast = demo.querySelector('.dtoast');
    const step = demo.querySelector('.step');
    const sheet = demo.querySelector('.dsheet');
    const sheetBox = demo.querySelector('.dsheet-box');
    let annule = false;

    const pause = ms => new Promise(r => setTimeout(r, ms));

    return {
      stop() { annule = true; },
      get arrete() { return annule; },
      dire(t) { step.textContent = t; },
      async versEl(el, dx, dy) {
        if (!el) return;
        const d = demo.getBoundingClientRect(), r = el.getBoundingClientRect();
        cur.style.opacity = '1';
        cur.style.left = (r.left - d.left + (dx == null ? r.width / 2 : dx)) + 'px';
        cur.style.top = (r.top - d.top + (dy == null ? r.height / 2 : dy)) + 'px';
        await pause(620);
      },
      async clic(el) {
        cur.classList.add('click');
        if (el) { el.classList.add('flash'); }
        await pause(320);
        cur.classList.remove('click');
        if (el) setTimeout(() => el.classList.remove('flash'), 260);
      },
      cacherCurseur() { cur.style.opacity = '0'; },
      async toast(t, ms) {
        toast.textContent = t; toast.classList.add('show');
        await pause(ms || 1600); toast.classList.remove('show');
      },
      async panneau(html, ms) {
        sheetBox.innerHTML = html; sheet.classList.add('show');
        await pause(ms || 1800);
      },
      fermerPanneau() { sheet.classList.remove('show'); },
      pause,
      /* frappe caractère par caractère */
      async taper(el, texte, garder) {
        const base = garder || '';
        for (let i = 1; i <= texte.length; i++) {
          if (annule) return;
          el.textContent = base + texte.slice(0, i);
          await pause(55);
        }
      },
    };
  }

  /* ---------- Scénarios ---------- */
  const SCENARIOS = {

    async edit(demo, a) {
      const row = demo.querySelector('[data-row="0"]');
      const nm = row.querySelector('.nm');
      const original = nm.innerHTML;
      a.dire('On veut renommer la première boisson.');
      await a.versEl(nm, 40, 8);
      await a.clic();
      row.classList.add('editing');
      a.dire('Le texte devient modifiable : on tape directement dessus.');
      a.cacherCurseur();
      nm.innerHTML = '';
      await a.taper(nm, 'MATCHA LATTE BIO');
      await a.pause(500);
      const pr = row.querySelector('.pr');
      row.classList.remove('editing');
      a.dire('Même chose pour le prix.');
      await a.versEl(pr);
      await a.clic();
      row.classList.add('editing');
      a.cacherCurseur();
      pr.textContent = '';
      await a.taper(pr, '7');
      row.classList.remove('editing');
      a.dire('Terminé — le texte est modifié sur la carte.');
      await a.pause(1400);
      nm.innerHTML = original; pr.textContent = '6.5';
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },

    async add(demo, a) {
      const row = demo.querySelector('[data-row="1"]');
      const btn = demo.querySelector('[data-b="add"]');
      a.dire('On sélectionne la ligne après laquelle insérer.');
      await a.versEl(row);
      await a.clic();
      row.classList.add('hl');
      a.dire('Puis « + Ajouter un bloc ».');
      await a.versEl(btn);
      await a.clic(btn);
      await a.panneau(`<h4>Ajouter un bloc</h4>
        <div class="line"><span class="chk on">✓</span> Produit (nom + prix)</div>
        <div class="line"><span class="chk"></span> Titre de rubrique</div>
        <div class="line"><span class="chk"></span> Encadré / panneau</div>
        <div class="line"><span class="chk"></span> Saut de colonne</div>`, 1900);
      a.fermerPanneau();
      row.classList.remove('hl');
      const neuf = document.createElement('div');
      neuf.className = 'drow';
      neuf.innerHTML = `<span class="nm">NOUVEAU PRODUIT<span class="en">à compléter</span></span>
        <span class="dots"></span><span class="pr">—</span>`;
      neuf.style.background = 'rgba(47,158,151,.12)';
      row.after(neuf);
      a.dire('La ligne est insérée au bon endroit, prête à être remplie.');
      await a.pause(1900);
      neuf.remove();
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },

    async hide(demo, a) {
      const row = demo.querySelector('[data-row="2"]');
      const oeil = row.querySelector('[data-c="hide"]');
      a.dire('Plus de matcha : on survole la ligne.');
      await a.versEl(row);
      row.classList.add('hl');
      await a.pause(400);
      a.dire('On clique sur l’œil 👁.');
      await a.versEl(oeil);
      await a.clic(oeil);
      row.classList.add('masked');
      const b = document.createElement('span');
      b.className = 'dbadge'; b.textContent = 'Masqué du site';
      row.querySelector('.nm').appendChild(b);
      row.classList.remove('hl');
      a.cacherCurseur();
      a.dire('La ligne est grisée et barrée — elle reste dans votre carte.');
      await a.pause(1500);
      await a.toast('Masqué : ne sortira pas dans le PDF', 2000);
      a.dire('Pour le remettre, il suffit de recliquer sur l’icône.');
      await a.pause(1200);
      row.classList.remove('masked'); b.remove();
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },

    async save(demo, a) {
      const btn = demo.querySelector('[data-b="save"]');
      const row = demo.querySelector('[data-row="0"]');
      row.classList.add('editing');
      a.dire('Une modification vient d’être faite…');
      await a.pause(900);
      row.classList.remove('editing');
      a.dire('On clique sur 💾 Enregistrer.');
      await a.versEl(btn);
      await a.clic(btn);
      a.cacherCurseur();
      await a.pause(600);
      await a.toast('Version enregistrée : carte-cafe_2026-07-26_18h40', 2400);
      a.dire('Une version datée est créée dans le cloud — les précédentes restent intactes.');
      await a.pause(1400);
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },

    async versions(demo, a) {
      const undo = demo.querySelector('[data-b="undo"]');
      const vers = demo.querySelector('[data-b="versions"]');
      const row = demo.querySelector('[data-row="0"]');
      const nm = row.querySelector('.nm');
      const original = nm.innerHTML;
      nm.innerHTML = 'CROQUE ERREUR DE FRAPPE';
      a.dire('Oups, une faute vient d’être tapée.');
      await a.pause(1100);
      a.dire('↶ annule la dernière action.');
      await a.versEl(undo);
      await a.clic(undo);
      nm.innerHTML = original;
      a.cacherCurseur();
      await a.pause(1100);
      a.dire('Pour revenir plus loin : 🕑 Versions.');
      await a.versEl(vers);
      await a.clic(vers);
      await a.panneau(`<h4>Versions enregistrées</h4>
        <div class="line">carte-cafe · 26/07 à 18h40 <b style="margin-left:auto;color:#227a75">Charger</b></div>
        <div class="line">carte-cafe · 26/07 à 14h05 <b style="margin-left:auto;color:#227a75">Charger</b></div>
        <div class="line">carte · 25/07 à 09h12 <b style="margin-left:auto;color:#227a75">Charger</b></div>`, 2300);
      a.fermerPanneau();
      a.dire('Chaque enregistrement reste consultable, daté à la minute.');
      await a.pause(1300);
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },


    async picto(demo, a) {
      const row = demo.querySelector('[data-row="1"]');
      const veg = row.querySelector('[data-c="veg"]');
      a.dire('Signaler un produit végétarien ou sans gluten.');
      await a.versEl(row);
      row.classList.add('hl');
      await a.pause(400);
      a.dire('On clique sur V (végétarien).');
      await a.versEl(veg);
      await a.clic(veg);
      const p = document.createElement('span');
      p.textContent = ' ⓥ';
      p.style.cssText = 'color:#5d7a3a;font-size:9px;font-weight:700';
      row.querySelector('.nm').appendChild(p);
      row.classList.remove('hl');
      a.cacherCurseur();
      a.dire('Le pictogramme apparaît sur la carte. SG fait de même pour le sans gluten.');
      await a.pause(1800);
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },

    async pdf(demo, a) {
      const btn = demo.querySelector('[data-b="pdf"]');
      a.dire('Un clic sur ⬇️ PDF.');
      await a.versEl(btn);
      await a.clic(btn);
      a.cacherCurseur();
      btn.textContent = '⏳ Génération…';
      await a.pause(1500);
      btn.textContent = '⬇️ PDF';
      await a.toast('PDF téléchargé : carte-cafe_v23_2026-07-26_18h42.pdf', 2400);
      a.dire('Une page par planche, texte vectoriel — prêt pour l’imprimeur.');
      await a.pause(1400);
      a.dire('Cliquez sur « Rejouer » pour revoir.');
    },
  };

  /* ---------- Mise en route ---------- */
  document.querySelectorAll('.demo').forEach(demo => {
    const nom = demo.dataset.demo;
    let enCours = null;

    /* On repart d'une maquette neuve à chaque lecture : sinon les
       éléments ajoutés par le scénario précédent (étiquette « masqué »,
       ligne insérée…) s'accumulent d'une lecture à l'autre. */
    function reset() {
      demo.innerHTML = maquette();
      demo.querySelector('.replay').addEventListener('click', jouer);
    }

    async function jouer() {
      if (enCours) enCours.stop();
      reset();
      const btn = demo.querySelector('.replay');
      const a = acteur(demo);
      enCours = a;
      btn.disabled = true;
      try { await SCENARIOS[nom](demo, a); }
      catch (e) { console.warn('demo', nom, e); }
      finally { btn.disabled = false; a.cacherCurseur(); }
    }

    reset();

    /* première lecture automatique quand la démo entre à l'écran */
    if ('IntersectionObserver' in window) {
      let vue = false;
      new IntersectionObserver((ents, obs) => {
        ents.forEach(e => {
          if (e.isIntersecting && !vue) { vue = true; jouer(); obs.disconnect(); }
        });
      }, { threshold: 0.55 }).observe(demo);
    }
  });

})();
