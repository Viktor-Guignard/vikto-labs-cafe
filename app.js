/* ===================== Modèle de données ===================== */

let uidCounter = 1;
function newId(){ return 'b' + (uidCounter++) + '_' + Math.random().toString(36).slice(2,7); }

/* Le contenu réel de chaque carte est chargé depuis le cloud (versions/<clé>/).
   En attendant, on part d'un document vide. */
function defaultDoc(){ return []; }

/* Tous les blocs possibles. Le sélecteur n'en propose qu'un sous-ensemble par
   carte (voir MENU_BLOCK_PRESETS dans menus-config.js), adapté à sa DA réelle. */
const BLOCK_DEFS = {
  section:          {type:'section', ttl:'Titre de section', desc:'Ex : « ENTRÉES / Starters »', make:()=>({fr:'NOUVELLE SECTION', en:'New section'})},
  item:             {type:'item', ttl:'Plat', desc:'Nom FR, nom EN, prix', make:()=>({fr:'NOUVEAU PLAT', en:'New dish', price:'0€'})},
  formule:          {type:'formule', ttl:'Ligne formule', desc:'Texte en couleur (accent de la carte)', make:()=>({text:'NOUVELLE FORMULE'})},
  'formule-heading':{type:'formule', ttl:'Sous-titre', desc:'Ex : « LES SPRITZ », « BULLES »', make:()=>({text:'NOUVEAU SOUS-TITRE', heading:true})},
  note:             {type:'note', ttl:'Note / mention', desc:'Petit texte italique gris', make:()=>({text:'Note...'})},
  image:            {type:'image', ttl:'Image / logo', desc:'Logo ou visuel centré (cliquer pour remplacer)', make:()=>({src:'assets/badge.png', widthPct:45})},
  divider:          {type:'divider', ttl:'Séparateur', desc:'Ligne fine de séparation', make:()=>({})},
  pagebreak:        {type:'pagebreak', ttl:'Saut de page', desc:'Démarre une nouvelle page PDF', make:()=>({})},
};

function currentBlockLibrary(){
  const keys = (window.MENU_BLOCK_PRESETS && window.MENU_BLOCK_PRESETS[window.currentMenuKey()]) || Object.keys(BLOCK_DEFS);
  return keys.map(k => BLOCK_DEFS[k]).filter(Boolean);
}

/* Champs mono-lignes : Entrée = valider, pas de retour à la ligne */
const MULTILINE_FIELDS = new Set(['insta','wifi']);

/* ===================== Apparence (polices & couleurs) ===================== */

const FONT_CHOICES = {
  title: [
    {name:'Playfair Display', gq:'Playfair+Display:wght@700;800'},
    {name:'Cormorant Garamond', gq:'Cormorant+Garamond:wght@600;700'},
    {name:'DM Serif Display', gq:'DM+Serif+Display'},
    {name:'Libre Baskerville', gq:'Libre+Baskerville:wght@400;700'},
    {name:'Oswald', gq:'Oswald:wght@500;600'},
    {name:'Marcellus', gq:'Marcellus'},
  ],
  body: [
    {name:'Poppins', gq:'Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500'},
    {name:'Jost', gq:'Jost:ital,wght@0,400;0,500;0,600;1,400'},
    {name:'Lato', gq:'Lato:ital,wght@0,400;0,700;1,400'},
    {name:'Montserrat', gq:'Montserrat:ital,wght@0,400;0,600;0,700;1,400'},
    {name:'Source Sans 3', gq:'Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400'},
    {name:'EB Garamond', gq:'EB+Garamond:ital,wght@0,400;0,600;1,400'},
  ],
};

/* Formats de page réels (px @96dpi + mm pour le PDF) */
const PAGE_FORMATS = {
  a4:      { label:'A4 portrait (21 × 29,7 cm)',  w:794,  h:1123, mm:[210,297] },
  a4l:     { label:'A4 paysage (29,7 × 21 cm)',   w:1123, h:794,  mm:[297,210] },
  carte34: { label:'Carte haute (14 × 34 cm)',    w:529,  h:1285, mm:[140,340] },
  a5:      { label:'Demi-A4 / A5 (14,85 × 21 cm)', w:561,  h:794,  mm:[148.5,210] },
};
/* Anciens presets (rétro-compatibilité) -> valeurs en mm */
const LEGACY_MARGINS = {
  compacte: {t:7,  r:8,  b:8,  l:8},
  normale:  {t:12, r:14, b:14, l:14},
  large:    {t:16, r:18, b:18, l:18},
};
const MM2PX = 96/25.4;
function normMargins(st){
  if(st.marginMm && typeof st.marginMm.t === 'number') return st.marginMm;
  return LEGACY_MARGINS[st.margin] || LEGACY_MARGINS.normale;
}
const PAGE_THEMES = {
  classique: { label:'Classique' },
  vigne:     { label:'Vigne (ornements)' },
};

function defaultStyle(){
  return {
    titleFont:'Playfair Display',
    bodyFont:'Poppins',
    titleColor:'#1a1a1a',
    accent:'#227a75',
    pageBg:'#ffffff',
    leaders:true,           // pointillés entre plat et prix
    format:'a4',
    marginMm:{t:12, r:14, b:14, l:14},
    mirror:false,
    theme:'classique',
    sectionUnderline:true,
    itemSpacing:2,           // padding vertical (px) de chaque ligne plat/boisson
  };
}

function applyStyle(){
  const st = state.style;
  const fmt = PAGE_FORMATS[st.format] || PAGE_FORMATS.a4;
  const m = normMargins(st);
  const px = mm => Math.round(mm * MM2PX) + 'px';
  const root = document.documentElement;
  root.style.setProperty('--font-title', `'${st.titleFont}', serif`);
  root.style.setProperty('--font-body', `'${st.bodyFont}', sans-serif`);
  root.style.setProperty('--title-color', st.titleColor);
  root.style.setProperty('--accent', st.accent);
  root.style.setProperty('--page-bg', st.pageBg);
  root.style.setProperty('--page-w', fmt.w + 'px');
  root.style.setProperty('--page-h', fmt.h + 'px');
  root.style.setProperty('--page-pad', `${px(m.t)} ${px(m.r)} ${px(m.b)} ${px(m.l)}`);
  // pages paires : marges en miroir (reliure) si demandé
  const me = st.mirror ? {t:m.t, r:m.l, b:m.b, l:m.r} : m;
  root.style.setProperty('--page-pad-even', `${px(me.t)} ${px(me.r)} ${px(me.b)} ${px(me.l)}`);
  document.body.classList.toggle('leaders-off', !st.leaders);
  document.body.classList.toggle('theme-vigne', st.theme === 'vigne');
  document.body.classList.toggle('no-section-underline', st.sectionUnderline === false);
  root.style.setProperty('--item-pad-v', (st.itemSpacing != null ? st.itemSpacing : 2) + 'px');
  loadFonts(st);
}

function currentPageH(){
  return (PAGE_FORMATS[state.style.format] || PAGE_FORMATS.a4).h;
}

function loadFonts(st){
  const t = FONT_CHOICES.title.find(f => f.name === st.titleFont);
  const b = FONT_CHOICES.body.find(f => f.name === st.bodyFont);
  const parts = [];
  if(t) parts.push('family=' + t.gq);
  if(b) parts.push('family=' + b.gq);
  if(!parts.length) return;
  const href = 'https://fonts.googleapis.com/css2?' + parts.join('&') + '&display=swap';
  let link = document.getElementById('dynFonts');
  if(!link){
    link = document.createElement('link');
    link.id = 'dynFonts';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if(link.href !== href) link.href = href;
}

/* ===================== État ===================== */

const state = {
  doc: defaultDoc(),
  style: defaultStyle(),
  selectedId: null,
  dirty: false,           // modifications non enregistrées dans le cloud
  baseVersion: null,      // nom de la version cloud dont on est parti (détection de conflit)
};

/* ===================== Historique (annuler / rétablir) ===================== */

let history = [], hIndex = -1;

function pushHistory(){
  history = history.slice(0, hIndex + 1);
  history.push(JSON.stringify({doc: state.doc, style: state.style}));
  if(history.length > 80) history.shift();
  hIndex = history.length - 1;
  updateHistoryButtons();
}

function resetHistory(){
  history = [JSON.stringify({doc: state.doc, style: state.style})];
  hIndex = 0;
  updateHistoryButtons();
}

function restoreFromHistory(){
  const snap = JSON.parse(history[hIndex]);
  state.doc = snap.doc;
  state.style = snap.style || defaultStyle();
  state.selectedId = null;
  applyStyle();
  render();
  // sauvegarde du brouillon sans nouvel élément d'historique
  state.dirty = true;
  updateSyncStatus();
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 800);
  updateHistoryButtons();
}

function undo(){ if(hIndex > 0){ hIndex--; restoreFromHistory(); } }
function redo(){ if(hIndex < history.length - 1){ hIndex++; restoreFromHistory(); } }

function updateHistoryButtons(){
  const u = document.getElementById('undoBtn'), r = document.getElementById('redoBtn');
  if(u) u.disabled = hIndex <= 0;
  if(r) r.disabled = hIndex >= history.length - 1;
}

/* ===================== Brouillon local (sécurité) ===================== */

const DRAFT_KEY = 'vlcafe_draft_' + window.currentMenuKey();

function saveDraft(){
  try{
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ts: new Date().toISOString(), doc: state.doc, style: state.style}));
  }catch(e){ /* stockage plein : tant pis, le brouillon est un filet de sécurité */ }
}
function clearDraft(){ localStorage.removeItem(DRAFT_KEY); state.dirty = false; updateSyncStatus(); }
function getDraft(){
  try{
    const raw = localStorage.getItem(DRAFT_KEY);
    const d = raw ? JSON.parse(raw) : null;
    // un brouillon vide (tout supprimé) ne vaut rien : on l'ignore et on le purge
    if(d && (!Array.isArray(d.doc) || d.doc.length === 0)){ localStorage.removeItem(DRAFT_KEY); return null; }
    return d;
  }catch(e){ return null; }
}

let draftTimer = null;
function markDirty(){
  state.dirty = true;
  updateSyncStatus();
  pushHistory();
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 800);
}

function updateSyncStatus(){
  const el = document.getElementById('syncStatus');
  const txt = el.querySelector('.txt');
  const hasToken = !!window.CarteStorage && window.CarteStorage.hasToken();
  el.classList.remove('ok','warn');
  if(state.dirty){
    el.classList.add('warn');
    txt.textContent = 'Modifications non enregistrées';
  } else if(hasToken){
    el.classList.add('ok');
    txt.textContent = 'Sauvegarde cloud activée';
  } else {
    txt.textContent = 'Lecture seule — jeton requis pour enregistrer (⚙️)';
  }
}

/* Pictogrammes de plat (extraits des PDF sources) */
const TAG_ICONS = {
  veg:  { src:'assets/icon-veg.svg',  label:'Végétarien' },
  spec: { src:'assets/icon-spec.svg', label:'Spécialité de la maison' },
};
const TAG_CYCLE = [null, 'veg', 'spec'];

/* ===================== Rendu ===================== */

const canvasWrap = document.getElementById('canvasWrap');

function esc(s){
  const d = document.createElement('div');
  d.textContent = s == null ? '' : s;
  return d.innerHTML;
}

function ed(id, field, value, extraClass, tag){
  tag = tag || 'span';
  return `<${tag} class="${extraClass||''}" contenteditable="true" data-id="${id}" data-field="${field}">${value||''}</${tag}>`;
}

function renderBlockInner(blk){
  switch(blk.type){
    case 'header':
      return `
        <div class="titles">
          <h1>${ed(blk.id,'line1',esc(blk.line1))}<br>${ed(blk.id,'line2',esc(blk.line2))}</h1>
        </div>
        <div class="badgeRow img-slot" data-id="${blk.id}" data-field="logoImg" title="Cliquer pour remplacer le logo">
          <img src="${blk.logoImg || 'assets/badge.png'}" class="logo-badge" alt="logo">
        </div>
        <div class="side">
          <div class="chef">${ed(blk.id,'chef',esc(blk.chef))}</div>
          <div class="insta">${ed(blk.id,'insta',blk.insta)}</div>
          <div class="qr-box img-slot" data-id="${blk.id}" data-field="qrImg" title="Cliquer pour remplacer le QR code">
            <img src="${blk.qrImg || 'assets/qr.png'}" alt="QR code">
          </div>
          <div class="wifi" style="margin-top:8px;">${ed(blk.id,'wifi',blk.wifi)}</div>
        </div>`;
    case 'section':
      return `<h2>${ed(blk.id,'fr',esc(blk.fr))}${blk.en != null ? ' <span class="en">/ '+ed(blk.id,'en',esc(blk.en))+'</span>' : ''}</h2>`;
    case 'item': {
      const tags = (blk.tags||[]).map(t => `<img class="item-tag" src="${TAG_ICONS[t]?.src||''}" title="${TAG_ICONS[t]?.label||''}" alt="${TAG_ICONS[t]?.label||''}">`).join('');
      return `
        <div class="txt">
          <div class="fr">${ed(blk.id,'fr',esc(blk.fr))}${tags}</div>
          <div class="en">${ed(blk.id,'en',esc(blk.en))}</div>
        </div>
        <div class="leader"></div>
        <div class="price">${ed(blk.id,'price',esc(blk.price))}</div>`;
    }
    case 'formule':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'note':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'image':
      return `<div class="img-slot img-block-slot" data-id="${blk.id}" data-field="src" title="Cliquer pour remplacer l'image">
        <img src="${blk.src || 'assets/badge.png'}" style="width:${blk.widthPct || 45}%" alt="">
      </div>`;
    case 'divider':
      return '';
    case 'pagebreak':
      return '↴ Nouvelle page (PDF)';
    default:
      return '';
  }
}

function blockClass(blk){
  const map = {header:'blk-header', section:'blk-section', item:'blk-item', formule:'blk-formule', note:'blk-note', divider:'blk-divider', pagebreak:'blk-pagebreak', image:'blk-image'};
  let c = map[blk.type] || '';
  if(blk.type==='formule' && blk.italic) c += ' italic';
  if(blk.type==='formule' && blk.heading) c += ' heading';
  if(blk.hidden) c += ' is-hidden';
  return c;
}

/* Blocs qu'on peut masquer temporairement (pas le saut de page) */
const HIDEABLE = new Set(['item','section','formule','note','image','divider']);

function render(){
  canvasWrap.innerHTML = '';
  let pageBlocks = [];
  let pageNum = 1;

  const flushPage = () => {
    const pageEl = document.createElement('div');
    pageEl.className = 'pdf-page' + (pageNum % 2 === 0 ? ' page-even' : '');
    const fmt = PAGE_FORMATS[state.style.format] || PAGE_FORMATS.a4;
    const [wMm, hMm] = fmt.mm;
    const label = document.createElement('div');
    label.className = 'page-label';
    label.innerHTML = `Page ${pageNum} <span class="page-fmt">— ${wMm} × ${hMm} mm (${fmt.label.replace(/ \(.*\)/,'')})</span>`;
    pageEl.appendChild(label);
    if(pageBlocks.length === 0){
      const hint = document.createElement('div');
      hint.className = 'page-empty-hint';
      hint.textContent = 'Page vide — ajoutez un bloc';
      pageEl.appendChild(hint);
    }
    pageBlocks.forEach(blk => {
      pageEl.appendChild(buildInsertBar(state.doc.indexOf(blk) - 1));
      pageEl.appendChild(buildBlockEl(blk));
    });
    if(pageBlocks.length > 0){
      pageEl.appendChild(buildInsertBar(state.doc.indexOf(pageBlocks[pageBlocks.length-1])));
    }
    const warn = document.createElement('div');
    warn.className = 'page-overflow-warning';
    warn.textContent = '⚠️ Le contenu dépasse la page — déplacez des blocs ou ajoutez un saut de page';
    pageEl.appendChild(warn);
    canvasWrap.appendChild(pageEl);
    pageNum++;
    pageBlocks = [];
  };

  state.doc.forEach(blk => {
    pageBlocks.push(blk);
    if(blk.type === 'pagebreak') flushPage();
  });
  flushPage();

  requestAnimationFrame(checkOverflow);
}

function checkOverflow(){
  // Mesure valable uniquement en mise en page A4 (pas en vue mobile,
  // ni quand la fenêtre n'est pas encore dimensionnée)
  if(!window.innerWidth || matchMedia('(max-width:900px)').matches){
    document.querySelectorAll('.pdf-page').forEach(p => p.classList.remove('overflowing'));
    return;
  }
  const pageH = currentPageH();
  document.querySelectorAll('.pdf-page').forEach(page => {
    // retirer d'abord la classe : le bandeau d'avertissement (30px sous la page)
    // gonflerait scrollHeight et rendrait l'état collant
    page.classList.remove('overflowing');
    page.classList.toggle('overflowing', page.scrollHeight > pageH + 2);
  });
}

function buildInsertBar(afterIndex){
  const bar = document.createElement('div');
  bar.className = 'insert-bar';
  const btn = document.createElement('button');
  btn.textContent = '+ ajouter ici';
  btn.onclick = () => openBlockPicker(afterIndex);
  bar.appendChild(btn);
  return bar;
}

function buildBlockEl(blk){
  const wrap = document.createElement('div');
  wrap.className = 'block ' + blockClass(blk) + (state.selectedId===blk.id ? ' selected' : '');
  wrap.dataset.blockId = blk.id;
  wrap.innerHTML = renderBlockInner(blk);
  if(blk.type === 'formule' && blk.color) wrap.style.setProperty('--formule-color-override', blk.color);
  if(blk.hidden){
    const badge = document.createElement('span');
    badge.className = 'hidden-badge';
    badge.textContent = '👁 Masqué du site';
    wrap.appendChild(badge);
  }

  const controls = document.createElement('div');
  controls.className = 'row-controls';
  const tagBtn = blk.type === 'item'
    ? `<button class="rctrl" data-act="tag" title="Pictogramme (végétarien / spécialité)">${blk.tags && blk.tags[0] ? `<img src="${TAG_ICONS[blk.tags[0]].src}" alt="">` : '🏷'}</button>`
    : '';
  const hideBtn = HIDEABLE.has(blk.type)
    ? `<button class="rctrl${blk.hidden ? ' is-off' : ''}" data-act="hide" title="${blk.hidden ? 'Réafficher sur le site' : 'Masquer temporairement (rupture…)'}">${blk.hidden ? '🚫' : '👁'}</button>`
    : '';
  controls.innerHTML = `
    <button class="rctrl del" data-act="del" title="Supprimer">✕</button>
    <button class="rctrl" data-act="dup" title="Dupliquer">⧉</button>
    <button class="rctrl" data-act="up" title="Monter">↑</button>
    <button class="rctrl" data-act="down" title="Descendre">↓</button>${hideBtn}${tagBtn}`;
  wrap.appendChild(controls);

  wrap.addEventListener('click', (e) => {
    if(e.target.closest('.rctrl')) return;
    if(e.target.closest('.img-slot')) return;
    state.selectedId = blk.id;
  });

  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    const act = btn && btn.dataset.act;
    if(!act) return;
    const idx = state.doc.findIndex(x=>x.id===blk.id);
    if(idx < 0) return;
    if(act==='tag'){
      const cur = (blk.tags && blk.tags[0]) || null;
      const next = TAG_CYCLE[(TAG_CYCLE.indexOf(cur) + 1) % TAG_CYCLE.length];
      blk.tags = next ? [next] : [];
      markDirty(); render();
      return;
    }
    if(act==='hide'){
      blk.hidden = !blk.hidden;
      markDirty(); render();
      toast(blk.hidden ? 'Masqué du site (pensez à Enregistrer + Publier)' : 'Réaffiché sur le site');
      return;
    }
    if(act==='up' && idx>0){
      [state.doc[idx-1],state.doc[idx]]=[state.doc[idx],state.doc[idx-1]];
      markDirty(); render();
    }
    if(act==='down' && idx<state.doc.length-1){
      [state.doc[idx+1],state.doc[idx]]=[state.doc[idx],state.doc[idx+1]];
      markDirty(); render();
    }
    if(act==='dup'){
      const copy = JSON.parse(JSON.stringify(state.doc[idx]));
      copy.id = newId();
      state.doc.splice(idx+1, 0, copy);
      state.selectedId = copy.id;
      markDirty(); render();
    }
    if(act==='del'){
      if(state.selectedId === blk.id) state.selectedId = null;
      state.doc.splice(idx,1);
      markDirty(); render();
      toast('Bloc supprimé', 'Annuler', undo);
    }
  });

  wrap.querySelectorAll('.img-slot').forEach(slot=>{
    slot.addEventListener('click', ()=> triggerImageUpload(slot.dataset.id, slot.dataset.field));
  });

  return wrap;
}

function triggerImageUpload(blockId, field){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const blk = state.doc.find(b=>b.id===blockId);
      if(!blk) return;
      blk[field] = reader.result;
      markDirty(); render();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* ===================== Édition inline ===================== */

/* Validation à la sortie du champ */
canvasWrap.addEventListener('blur', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  const id = el.dataset.id, field = el.dataset.field;
  const blk = state.doc.find(b=>b.id===id);
  if(!blk) return;
  const newVal = MULTILINE_FIELDS.has(field)
    ? el.innerHTML.replace(/<div><br><\/div>/g,'<br>').replace(/<div>/g,'<br>').replace(/<\/div>/g,'')
    : el.textContent;
  if(blk[field] !== newVal){
    blk[field] = newVal;
    markDirty();
  }
}, true);

/* Entrée = valider (sauf champs multilignes) ; Échap = valider aussi */
canvasWrap.addEventListener('keydown', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  if(e.key === 'Escape'){ e.preventDefault(); el.blur(); return; }
  if(e.key === 'Enter' && !MULTILINE_FIELDS.has(el.dataset.field)){
    e.preventDefault();
    el.blur();
  }
});

/* Coller en texte brut (évite d'importer du gras/couleurs de Word etc.) */
canvasWrap.addEventListener('paste', (e) => {
  const el = e.target;
  if(!el.matches || !el.closest('[contenteditable="true"]')) return;
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, text);
});

/* ===================== Ajout de bloc ===================== */

const pickerBackdrop = document.getElementById('pickerBackdrop');
const blockGrid = document.getElementById('blockGrid');
let pendingInsertIndex = null;

function openBlockPicker(afterIndex){
  pendingInsertIndex = afterIndex;
  const sub = document.getElementById('pickerSub');
  if(sub) sub.textContent = `Blocs adaptés à la carte « ${window.currentMenuLabel()} ». Inséré juste après le bloc sélectionné (ou à la fin).`;
  pickerBackdrop.classList.add('open');
}
document.getElementById('addBlockBtn').addEventListener('click', ()=>{
  const idx = state.selectedId ? state.doc.findIndex(b=>b.id===state.selectedId) : state.doc.length-1;
  openBlockPicker(idx);
});
document.getElementById('pickerClose').addEventListener('click', ()=> pickerBackdrop.classList.remove('open'));
pickerBackdrop.addEventListener('click', (e)=>{ if(e.target===pickerBackdrop) pickerBackdrop.classList.remove('open'); });

currentBlockLibrary().forEach(opt=>{
  const el = document.createElement('button');
  el.className = 'block-opt';
  el.innerHTML = `<div class="ttl">${opt.ttl}</div><div class="desc">${opt.desc}</div>`;
  el.onclick = () => {
    const newBlk = { id:newId(), type:opt.type, ...opt.make() };
    const insertAt = (pendingInsertIndex==null ? state.doc.length-1 : pendingInsertIndex) + 1;
    state.doc.splice(insertAt, 0, newBlk);
    state.selectedId = newBlk.id;
    pickerBackdrop.classList.remove('open');
    markDirty(); render();
  };
  blockGrid.appendChild(el);
});

/* ===================== Toast (avec action optionnelle) ===================== */

function toast(msg, actionLabel, actionFn){
  const t = document.getElementById('toast');
  t.innerHTML = '';
  t.appendChild(document.createTextNode(msg));
  if(actionLabel && actionFn){
    const btn = document.createElement('button');
    btn.textContent = actionLabel;
    btn.onclick = () => { actionFn(); t.classList.remove('show'); };
    t.appendChild(btn);
  }
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> t.classList.remove('show'), actionLabel ? 6000 : 2600);
}

/* ===================== Annuler / Rétablir : boutons & clavier ===================== */

document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);
document.addEventListener('keydown', (e) => {
  // dans un champ en cours d'édition, laisser l'annulation native du texte
  const el = document.activeElement;
  if(el && el.isContentEditable) return;
  const mod = e.metaKey || e.ctrlKey;
  if(!mod) return;
  if(e.key === 'z' || e.key === 'Z'){
    e.preventDefault();
    if(e.shiftKey) redo(); else undo();
  } else if(e.key === 'y' || e.key === 'Y'){
    e.preventDefault();
    redo();
  }
});

/* ===================== Modale Apparence ===================== */

const appearanceBackdrop = document.getElementById('appearanceBackdrop');

function fillAppearanceForm(){
  const st = state.style;
  const selT = document.getElementById('titleFontSel');
  const selB = document.getElementById('bodyFontSel');
  selT.innerHTML = FONT_CHOICES.title.map(f => `<option${f.name===st.titleFont?' selected':''}>${f.name}</option>`).join('');
  selB.innerHTML = FONT_CHOICES.body.map(f => `<option${f.name===st.bodyFont?' selected':''}>${f.name}</option>`).join('');
  document.getElementById('formatSel').innerHTML = Object.entries(PAGE_FORMATS)
    .map(([k,f]) => `<option value="${k}"${k===(st.format||'a4')?' selected':''}>${f.label}</option>`).join('');
  const m = normMargins(st);
  document.getElementById('marginT').value = m.t;
  document.getElementById('marginR').value = m.r;
  document.getElementById('marginB').value = m.b;
  document.getElementById('marginL').value = m.l;
  document.getElementById('mirrorChk').checked = !!st.mirror;
  document.getElementById('themeSel').innerHTML = Object.entries(PAGE_THEMES)
    .map(([k,t]) => `<option value="${k}"${k===(st.theme||'classique')?' selected':''}>${t.label}</option>`).join('');
  document.getElementById('titleColorInp').value = st.titleColor;
  document.getElementById('accentColorInp').value = st.accent;
  document.getElementById('pageBgSel').value = st.pageBg;
  document.getElementById('leadersChk').checked = !!st.leaders;
  document.getElementById('underlineChk').checked = st.sectionUnderline !== false;
  document.getElementById('itemSpacingInp').value = st.itemSpacing != null ? st.itemSpacing : 2;
}

function readAppearanceForm(){
  state.style = {
    titleFont: document.getElementById('titleFontSel').value,
    bodyFont: document.getElementById('bodyFontSel').value,
    titleColor: document.getElementById('titleColorInp').value,
    accent: document.getElementById('accentColorInp').value,
    pageBg: document.getElementById('pageBgSel').value,
    leaders: document.getElementById('leadersChk').checked,
    sectionUnderline: document.getElementById('underlineChk').checked,
    itemSpacing: parseFloat(document.getElementById('itemSpacingInp').value) || 0,
    format: document.getElementById('formatSel').value,
    marginMm: {
      t: parseFloat(document.getElementById('marginT').value) || 0,
      r: parseFloat(document.getElementById('marginR').value) || 0,
      b: parseFloat(document.getElementById('marginB').value) || 0,
      l: parseFloat(document.getElementById('marginL').value) || 0,
    },
    mirror: document.getElementById('mirrorChk').checked,
    theme: document.getElementById('themeSel').value,
  };
  applyStyle();
  markDirty();
  requestAnimationFrame(checkOverflow);
}

document.getElementById('appearanceBtn').addEventListener('click', () => {
  fillAppearanceForm();
  appearanceBackdrop.classList.add('open');
});
document.getElementById('appearanceClose').addEventListener('click', ()=> appearanceBackdrop.classList.remove('open'));
appearanceBackdrop.addEventListener('click', (e)=>{ if(e.target===appearanceBackdrop) appearanceBackdrop.classList.remove('open'); });
['titleFontSel','bodyFontSel','titleColorInp','accentColorInp','pageBgSel','leadersChk','underlineChk','itemSpacingInp','formatSel','marginT','marginR','marginB','marginL','mirrorChk','themeSel'].forEach(id => {
  document.getElementById(id).addEventListener('change', readAppearanceForm);
});
document.getElementById('appearanceReset').addEventListener('click', () => {
  state.style = defaultStyle();
  applyStyle();
  fillAppearanceForm();
  markDirty();
});

/* ===================== Onglets des cartes ===================== */

function buildMenuTabs(){
  const bar = document.getElementById('menuTabs');
  if(!bar) return;
  const active = window.currentMenuKey();
  bar.innerHTML = '';
  window.COURSIVE_MENUS.forEach(m => {
    const a = document.createElement('a');
    a.href = '?menu=' + m.key;
    a.className = 'menu-tab' + (m.key === active ? ' active' : '');
    a.innerHTML = `<span class="lbl">${m.label}</span>${m.hint ? `<span class="hint">${m.hint}</span>` : ''}`;
    bar.appendChild(a);
  });
  const pub = document.createElement('a');
  pub.href = 'publier.html';
  pub.className = 'menu-tab publish-tab';
  pub.innerHTML = '<span class="lbl">📱 Publier / QR</span>';
  bar.appendChild(pub);

  const badge = document.getElementById('menuBadge');
  if(badge) badge.textContent = window.currentMenuLabel();
}

/* ===================== Boot ===================== */

buildMenuTabs();
applyStyle();
render();
resetHistory();

/* La mesure de débordement n'est fiable qu'une fois styles + polices chargés */
window.addEventListener('load', checkOverflow);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(checkOverflow);
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(checkOverflow, 200);
});

/* Exposé pour storage.js et pdf-export.js */
window.__CARTE_STATE__ = state;
window.__CARTE_RENDER__ = render;
window.__CARTE_HELPERS__ = {
  toast, markDirty, clearDraft, getDraft, updateSyncStatus,
  applyStyle, resetHistory, defaultStyle, checkOverflow,
  PAGE_FORMATS,
};
