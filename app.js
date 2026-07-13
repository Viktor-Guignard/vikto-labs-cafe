/* ===================== Modèle de données ===================== */

let uidCounter = 1;
function newId(){ return 'b' + (uidCounter++) + '_' + Math.random().toString(36).slice(2,7); }

function defaultDoc(){
  const b = (type, fields) => ({ id: newId(), type, ...fields });
  return [
    b('header', {
      line1:'La Carte', line2:'Été 2026',
      chef:'Chez nous, happiness is homemade',
      insta:'Good food · Good mood<br>Reims',
      wifi:'', logoImg:null, qrImg:null
    }),

    /* ---------------- PAGE 1 — Boissons ---------------- */
    b('section', {fr:'COCKTAILS FRAIS PRESSÉS (40 cl)', en:null}),
    b('formule', {text:'8 € · Supplément collagène « Day+ » +2 €'}),
    b('item', {fr:'GINGER ADDICT', en:'Pomme, citron, gingembre', price:''}),
    b('item', {fr:'FRESH', en:'Ananas, pomme, menthe fraîche', price:''}),
    b('item', {fr:'IPANEMA', en:'Baies d’açaï BIO*, banane, myrtille, pomme', price:''}),
    b('item', {fr:'LEMONANA', en:'Citron, menthe, limonade', price:''}),
    b('item', {fr:'SWEET TROPICAL', en:'Lait de coco, banane, purée de mangue*', price:''}),
    b('item', {fr:'CELERY KISS', en:'Pomme, citron, épinard, céleri', price:''}),
    b('item', {fr:'WAKE UP', en:'Carotte, pomme, gingembre', price:''}),
    b('item', {fr:'GREEN JUICE', en:'Concombre, pomme, gingembre', price:''}),
    b('item', {fr:'GOOD MOOD', en:'Pomme, kiwi, citron', price:''}),

    b('section', {fr:'SHOTS (7 cl)', en:null}),
    b('formule', {text:'3,5 €'}),
    b('item', {fr:'LEMON SHOT', en:'Citron, gingembre', price:''}),
    b('item', {fr:'GINGER SHOT', en:'Pomme, gingembre', price:''}),

    b('pagebreak', {}),

    b('section', {fr:'COCKTAILS CLASSIQUES (27 cl)', en:null}),
    b('item', {fr:'MOJITO ORIGINAL', en:'Rhum Havana 3 ans 4 cl, citron vert, menthe fraîche, cassonnade, eau gazeuse', price:'9 €'}),
    b('item', {fr:'APÉROL SPRITZ', en:'Apérol 6 cl, Prosecco, eau gazeuse', price:'9 €'}),
    b('item', {fr:'UGO SPRITZ', en:'Liqueur St Germain 6 cl, Prosecco, eau gazeuse', price:'11 €'}),

    b('section', {fr:'BOISSONS FRAÎCHES', en:null}),
    b('item', {fr:'EAU AQUACHIARA', en:'Plate ou gazeuse 75 cl', price:'5 €'}),
    b('item', {fr:'EAU DÉTOX', en:'Concombre & menthe 75 cl', price:'5,5 €'}),
    b('item', {fr:'THÉ GLACÉ MAISON — INFUSION PAR L’INFUSEUR', en:'Cassis, hibiscus, citronnelle · Infusion « Détox »', price:'6 €'}),
    b('item', {fr:'COCA COLA, COCA COLA SANS SUCRE', en:'33 cl', price:'5,5 €'}),
    b('item', {fr:'FUZE TEA', en:'Pêche 25 cl', price:'5 €'}),
    b('item', {fr:'PERRIER', en:'33 cl', price:'5,5 €'}),
    b('item', {fr:'BIÈRE 1664 BLONDE', en:'25 cl / 50 cl', price:'5,9 / 8,5 €'}),
    b('item', {fr:'BIÈRE 1664 BLANCHE', en:'25 cl / 50 cl', price:'6,2 / 9 €'}),
    b('item', {fr:'BIÈRE GRIMBERGEN ROUGE', en:'25 cl / 50 cl', price:'6,5 / 8,5 €'}),

    b('pagebreak', {}),

    b('section', {fr:'VINS', en:null}),
    b('note', {text:'Verre 14 cl · Verre 25 cl · Bouteille 75 cl'}),
    b('formule', {text:'ROUGES', heading:true}),
    b('item', {fr:'Côtes du Rhône Amour de Fruits — Domaine Dieu le Fit BIO', en:'', price:'6 · 9 · 29 €'}),
    b('item', {fr:'Saint Nicolas de Bourgueil AOP — Domaine des Pins', en:'', price:'6 · 9 · 29 €'}),
    b('item', {fr:'Graves AOP — Château les Majureaux', en:'', price:'— · — · 35 €'}),
    b('formule', {text:'BLANCS', heading:true}),
    b('item', {fr:'IGP Côtes de Gascogne Sauvignon Gros-Manseng — Famille Dufour', en:'Demi-sec', price:'6 · 9 · 29 €'}),
    b('item', {fr:'IGP d’Oc Chardonnay — Cellier du Pic', en:'', price:'6 · 9 · 29 €'}),
    b('item', {fr:'Petit Chablis — Domaine du Chardonnay', en:'', price:'9 · — · 45 €'}),
    b('formule', {text:'ROSÉ', heading:true}),
    b('item', {fr:'Vin de France Gris de Gris Les Oliviers — Domaine des Captives BIO', en:'', price:'6 · 9 · 29 €'}),

    b('section', {fr:'CHAMPAGNES', en:null}),
    b('note', {text:'Verre 12 cl · Bouteille 75 cl'}),
    b('item', {fr:'Grande Réserve Brut — Pierre Domi', en:'Local', price:'9,5 · — €'}),
    b('item', {fr:'Blanc de Blancs — Pierre Domi', en:'Local', price:'— · 60 €'}),
    b('item', {fr:'Cuvée Royale Brut — Joseph Perrier', en:'', price:'12 · 65 €'}),
    b('item', {fr:'« R » de Ruinart Brut — Ruinart', en:'', price:'— · 90 €'}),
    b('note', {text:'AOP : Appellation d’Origine Protégée · IGP : Indication Géographique Protégée. L’abus d’alcool est dangereux pour la santé. Toute boisson alcoolisée doit être accompagnée d’un plat.'}),

    b('pagebreak', {}),

    /* ---------------- PAGE 2 — Desserts & boissons chaudes ---------------- */
    b('section', {fr:'DESSERTS', en:null}),
    b('item', {fr:'PÊCHE FAÇON MELBA', en:'Chantilly végétale, coulis de fruits rouges, amandes effilées', price:'8,5 €'}),
    b('item', {fr:'MOUSSE AU CHOCOLAT NOIR', en:'', price:'8,5 €'}),
    b('item', {fr:'CRUMBLE POMMES', en:'', price:'8,5 €'}),
    b('item', {fr:'LE PLUME', en:'Gâteau au fromage blanc allégé', price:'9,5 €'}),
    b('item', {fr:'DS LIGHT « RÉÉDITION » (SG · V)', en:'Mousse au lait d’amande, coulis de fruits rouges*', price:'8,5 €'}),
    b('item', {fr:'MOELLEUX AU CHOCOLAT', en:'Crème anglaise', price:'8 €'}),
    b('item', {fr:'CAKE DU MOMENT', en:'Cake myrtille, glaçage citron ou cake aux pépites de chocolat', price:'5,5 €'}),
    b('item', {fr:'CRÊPE AU SUCRE*', en:'Supplément Nutella, crème sucrée ou chocolat maison +1 €', price:'5,5 €'}),
    b('item', {fr:'COOKIE', en:'Chocolat-noix de pécan ou matcha-chocolat blanc', price:'5,5 €'}),
    b('item', {fr:'AÇAÏ BOWL (V)', en:'Açaï BIO*, banane, muesli, coco râpée, myrtille', price:'12 €'}),
    b('item', {fr:'CAFÉ GOURMAND', en:'DS light, cake du moment, mousse au chocolat', price:'10 €'}),

    b('section', {fr:'FROZEN YOGURT', en:'avec 2 toppings au choix'}),
    b('formule', {text:'9,5 € · Végétarien · Topping supplémentaire +1 €'}),
    b('item', {fr:'Glace au yaourt nature basse calorie', en:'Toppings : banane, myrtille, caramel beurré salé*, miel, noix de pécan, muesli, amandes, Nutella, sirop d’érable', price:''}),

    b('pagebreak', {}),

    b('section', {fr:'BOISSONS CHAUDES', en:null}),
    b('item', {fr:'CAFÉ EXPRESSO, DÉCAFÉINÉ', en:'', price:'2,8 €'}),
    b('item', {fr:'CAFÉ NOISETTE', en:'', price:'3,2 €'}),
    b('item', {fr:'DOUBLE EXPRESSO, CAFÉ CRÈME', en:'', price:'5,5 €'}),
    b('item', {fr:'GRANDE LATTE MACCHIATO, CAPPUCCINO', en:'', price:'6 €'}),
    b('item', {fr:'CHOCOLAT CHAUD', en:'', price:'6 €'}),
    b('item', {fr:'GREEN MATCHA LATTE', en:'', price:'7 €'}),
    b('item', {fr:'THÉS BIO & INFUSION PAR L’INFUSEUR', en:'Thé vert Sencha, thé vert menthe, thé vert gingembre, thé Earl Grey, Rooibos vanille · Infusion détox : cassis, hibiscus, citronnelle', price:'6 €'}),
    b('note', {text:'Les boissons lactées peuvent être servies au lait végétal +1 € · Sirop de vanille ou de caramel +0,5 € · Supplément collagène « Day+ » +2 €'}),

    b('section', {fr:'LES LATTE', en:'de la Main Noire'}),
    b('formule', {text:'7 €'}),
    b('item', {fr:'GOLDEN LATTE BIO', en:'Curcuma, gingembre, poivre noir, muscade, cardamome, sucre de betterave', price:''}),
    b('item', {fr:'BLUE LATTE BIO', en:'Spiruline bleue, coco, gingembre, sumac, sucre de betterave', price:''}),
    b('item', {fr:'CHAI LATTE BIO', en:'Thé noir Rukeri AOP, poivre noir, gingembre, cannelle, cardamome, clou de girofle, sucre de betterave', price:''}),
    b('item', {fr:'UBE LATTE', en:'Patate douce violette, ube violet, sucre de betterave, vanille Bourbon de Madagascar', price:''}),

    b('pagebreak', {}),

    /* ---------------- PAGE 3 — Le Brunch & Buns ---------------- */
    b('section', {fr:'LE BRUNCH', en:'Samedi, dimanche & jours fériés'}),
    b('formule', {text:'ASSIETTE BRUNCH 24 € · FORMULE 32 €', heading:true}),
    b('note', {text:'Boisson au choix (25 cl) : Green Juice, Wake Up, orange pressée ou jus de pomme pressé (ou Mimosa 12 cl +6 €)'}),
    b('note', {text:'Boisson chaude ou thé glacé au choix : café, chocolat chaud, thé ou infusion L’Infuseur (Cappuccino, Macchiato ou lait végétal +1 € · Latte au choix +1,50 €)'}),
    b('item', {fr:'ASSIETTE BRUNCH', en:'Pain brioché artisanal multigrains*, cheddar, œufs pochés, sauce hollandaise*, avocat, salade de pommes de terre, salade verte + au choix : poulet, saumon fumé ou pastrami', price:''}),
    b('item', {fr:'DESSERT', en:'Pancakes, bananes, caramel beurre salé & noix de pécan ou fromage blanc 0 %, muesli & miel', price:''}),

    b('section', {fr:'BUNS', en:null}),
    b('note', {text:'Pain brioché artisanal multigrains* · Supplément cheddar +1,5 €'}),
    b('item', {fr:'BROOKLYN', en:'Pastrami de bœuf, cornichons, émincé de chou, mayonnaise Savora, salade de pommes de terre, salade verte', price:'19 €'}),
    b('item', {fr:'OSLO', en:'Saumon fumé, concombre, yaourt aux herbes, salade de pommes de terre, salade verte', price:'18,5 €'}),
    b('item', {fr:'CALIFORNIEN', en:'Poulet, tomate, romaine, œuf dur, mayonnaise Savora, salade de pommes de terre, salade verte', price:'16,5 €'}),

    b('pagebreak', {}),

    /* ---------------- PAGE 4 — Salades, plats chauds & petits plus ---------------- */
    b('section', {fr:'SALADES GOURMANDES', en:null}),
    b('item', {fr:'SALADE GRECQUE (SG · V)', en:'Salade romaine, concombre, tomate cerise, féta, olives Kalamata, pickles, menthe, vinaigrette balsamique', price:'17 €'}),
    b('item', {fr:'GREEN GLOW (SG)', en:'Saumon cuit mariné soja-sésame, fromage blanc, haricots verts, concombre, edamame, pois gourmands, roquette, pignons de pin & graines de courge, sauce au collagène', price:'22 €'}),
    b('item', {fr:'MIDDLE EAST (V)', en:'Taboulé de quinoa, halloumi, courgette grillée, salade romaine, houmous, olives Kalamata, crackers, huile d’olive-citron-miel', price:'18 €'}),
    b('item', {fr:'TAI CHI', en:'Salade romaine, chou chinois, chou rouge, julienne de carotte, pousses de soja, poulet, spaghettis de konjac, radis, cacahuète, menthe, coriandre, sauce soja-sésame', price:'18 €'}),
    b('item', {fr:'CHICKEN QUINOA BOWL', en:'Émincé de poulet, quinoa, avocat, concombre, grenade, pousses d’épinard, chèvre frais, amandes, basilic, salade romaine, sauce huile d’olive-citron-miel', price:'19 €'}),
    b('item', {fr:'MUM TO BE', en:'Saumon cuit mariné soja-sésame, haricots verts, edamame*, champignons sautés, patate douce, fromage Grana Padano, graines de lin, amandes, huile d’olive-citron-miel', price:'20,5 €'}),
    b('item', {fr:'CRISPY QUINOA', en:'Pousses d’épinard, salade romaine, quinoa, émincé de poulet, avocat, oignons crispy, sauce au miel', price:'18 €'}),
    b('item', {fr:'CAESAR', en:'Salade romaine, émincé de poulet, champignons, tomates cerise, fromage Grana Padano, oignons crispy, sauce caesar', price:'18 €'}),
    b('item', {fr:'SWEET NIÇOISE (SG)', en:'Salade romaine, pousses d’épinard, filet de thon de Tarifa, œuf poché, haricots verts, patates douces, tomates cerise, pickles, olives Kalamata, huile d’olive-citron-miel', price:'21,5 €'}),
    b('note', {text:'Toutes nos salades sont désormais disponibles en version VEGGIE avec notre aiguillette végétale BIO*'}),

    b('pagebreak', {}),

    b('section', {fr:'PLATS CHAUDS', en:null}),
    b('item', {fr:'AUBERGINE À LA PARMIGGIANA (V)', en:'Fiore di latte, coulis de tomate, roquette', price:'18 €'}),
    b('item', {fr:'CABILLAUD MISO (SG)', en:'Cabillaud mariné au miso blanc, purée de haricots verts, brocoli bimi, coriandre', price:'24 €'}),
    b('item', {fr:'PAVÉ DE SAUMON MI-CUIT SOJA SÉSAME (SG)', en:'Riz curcuma, haricots verts & champignons sautés', price:'23 €'}),
    b('item', {fr:'AIGUILLETTES DE POULET (SG)', en:'Aiguillettes de poulet marinées au gingembre & citron confit, patate douce rôtie, haricots verts', price:'22 €'}),
    b('item', {fr:'CURRY DE POULET AU LAIT DE COCO', en:'Riz curcuma, coriandre, julienne de carotte & courgette grillée', price:'18 €'}),

    b('section', {fr:'PETITS PLUS', en:null}),
    b('item', {fr:'ŒUF POCHÉ', en:'', price:'2,5 €'}),
    b('item', {fr:'DEMI AVOCAT', en:'', price:'3 €'}),
    b('item', {fr:'HALLOUMI GRILLÉ', en:'', price:'5 €'}),
    b('item', {fr:'CHAMPIGNONS SAUTÉS · HARICOTS VERTS', en:'', price:'5 €'}),
    b('item', {fr:'SALADE VERTE · RIZ CURCUMA · SALADE DE POMMES DE TERRE', en:'', price:'5 €'}),
    b('item', {fr:'SAUMON FUMÉ · SAUMON CUIT MARINÉ', en:'', price:'5 €'}),

    b('pagebreak', {}),

    /* ---------------- PAGE 5 — Piadinas, clubs, toasts & menu enfant ---------------- */
    b('section', {fr:'PIADINAS', en:'Galette de blé non levée légèrement toastée'}),
    b('item', {fr:'PIADINA VEGGIE', en:'Pesto, courgettes & poivrons grillés, tomates confites, fromage fiore di latte, salade verte', price:'18 €'}),
    b('item', {fr:'PIADINA POULET', en:'Pesto rosso, tomates confites, fromage fiore di latte, salade verte', price:'18 €'}),
    b('item', {fr:'PIADINA THON', en:'Tomates confites, miettes de thon, œuf poché, fiore di latte, salade verte', price:'18 €'}),

    b('section', {fr:'CLUBS SANDWICHS', en:null}),
    b('item', {fr:'CLUB POULET', en:'Poulet, tomate, salade romaine, œuf dur, mayonnaise Savora, salade de pommes de terre, salade verte', price:'17 €'}),
    b('item', {fr:'CLUB TUNA', en:'Rillette de thon à l’aneth, tomate, avocat, salade de pommes de terre, salade verte', price:'16 €'}),
    b('item', {fr:'CLUB SAUMON', en:'Saumon fumé, fromage à la crème, avocat, salade de pommes de terre, salade verte', price:'18 €'}),
    b('item', {fr:'CLUB PASTRAMI', en:'Pastrami de bœuf, cornichons, émincé de chou, mayonnaise Savora, salade de pommes de terre, salade verte', price:'19 €'}),

    b('section', {fr:'TOASTS', en:null}),
    b('item', {fr:'AVOCADO TOAST', en:'Pain nordique BIO, avocat slicé, féta, œuf poché, grenade, sésame, salade verte', price:'17 €'}),
    b('item', {fr:'TARTINE CAPRESE', en:'Pain nordique BIO, tomate, mozzarella di bufala, câpres, crème de balsamique, roquette', price:'15 €'}),
    b('note', {text:'Avec du saumon fumé +5 €'}),

    b('section', {fr:'MENU ENFANT', en:null}),
    b('formule', {text:'Plat + Boisson + Dessert — 10 €', heading:true}),
    b('note', {text:'Plat : demi pavé de saumon, ou mini club poulet ou thon, salade de pommes de terre · Boisson : sirop à l’eau ou jus de pomme pressé · Dessert : crêpe au sucre ou Nutella, ou cake du moment'}),

    b('divider', {}),
    b('note', {text:'Paiements acceptés : Espèces, Tickets restaurant, CB, American Express. Prix nets en euros, service et TVA inclus. * Produit surgelé. DOP = dénomination d’origine protégée. Une carafe d’eau potable sera mise à votre disposition gratuitement sur demande. Liste des allergènes sur demande.  SG = sans gluten · V = végétarien.'}),
  ];
}

const BLOCK_LIBRARY = [
  {type:'section', ttl:'Titre de section', desc:'Ex : « ENTRÉES / Starters »', make:()=>({fr:'NOUVELLE SECTION', en:'New section'})},
  {type:'item', ttl:'Plat', desc:'Nom FR, nom EN, prix', make:()=>({fr:'NOUVEAU PLAT', en:'New dish', price:'0€'})},
  {type:'formule', ttl:'Ligne formule', desc:'Texte en couleur (ex. prix menu)', make:()=>({text:'NOUVELLE FORMULE'})},
  {type:'note', ttl:'Note / mention', desc:'Petit texte italique gris', make:()=>({text:'Note...'})},
  {type:'divider', ttl:'Séparateur', desc:'Ligne fine de séparation', make:()=>({})},
  {type:'pagebreak', ttl:'Saut de page', desc:'Démarre une nouvelle page PDF', make:()=>({})},
];

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

function defaultStyle(){
  return {
    titleFont:'Playfair Display',
    bodyFont:'EB Garamond',
    titleColor:'#3a492d',   // vert forêt DS Café
    accent:'#3a492d',
    pageBg:'#fefbf8',       // crème DS Café
    leaders:false,          // la carte DS n'utilise pas de pointillés
  };
}

function applyStyle(){
  const st = state.style;
  const root = document.documentElement;
  root.style.setProperty('--font-title', `'${st.titleFont}', serif`);
  root.style.setProperty('--font-body', `'${st.bodyFont}', sans-serif`);
  root.style.setProperty('--title-color', st.titleColor);
  root.style.setProperty('--accent', st.accent);
  root.style.setProperty('--page-bg', st.pageBg);
  document.body.classList.toggle('leaders-off', !st.leaders);
  loadFonts(st);
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

const DRAFT_KEY = 'carte_ds_draft_v1';

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

/* ===================== Rendu ===================== */

const canvasWrap = document.getElementById('canvasWrap');
const PAGE_H = 1123; // hauteur A4 en px (96 dpi)

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
          <div class="tagline">${ed(blk.id,'chef',esc(blk.chef))}</div>
          <div class="welcome">${ed(blk.id,'insta',blk.insta)}</div>
        </div>
        <div class="hero img-slot" data-id="${blk.id}" data-field="logoImg" title="Cliquer pour remplacer le visuel">
          <img src="${blk.logoImg || 'assets/logo.png'}" alt="DS Café">
        </div>`;
    case 'section':
      return `<h2>${ed(blk.id,'fr',esc(blk.fr))}${blk.en != null ? ' <span class="en">/ '+ed(blk.id,'en',esc(blk.en))+'</span>' : ''}</h2>`;
    case 'item':
      return `
        <div class="txt">
          <div class="fr">${ed(blk.id,'fr',esc(blk.fr))}</div>
          <div class="en">${ed(blk.id,'en',esc(blk.en))}</div>
        </div>
        <div class="leader"></div>
        <div class="price">${ed(blk.id,'price',esc(blk.price))}</div>`;
    case 'formule':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'note':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'divider':
      return '';
    case 'pagebreak':
      return '↴ Nouvelle page (PDF)';
    default:
      return '';
  }
}

function blockClass(blk){
  const map = {header:'blk-header', section:'blk-section', item:'blk-item', formule:'blk-formule', note:'blk-note', divider:'blk-divider', pagebreak:'blk-pagebreak'};
  let c = map[blk.type] || '';
  if(blk.type==='formule' && blk.italic) c += ' italic';
  if(blk.type==='formule' && blk.heading) c += ' heading';
  return c;
}

function render(){
  canvasWrap.innerHTML = '';
  let pageBlocks = [];
  let pageNum = 1;

  const flushPage = () => {
    const pageEl = document.createElement('div');
    pageEl.className = 'pdf-page';
    const label = document.createElement('div');
    label.className = 'page-label';
    label.textContent = 'Page ' + pageNum;
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
    warn.textContent = '⚠️ Le contenu dépasse la page A4 — déplacez des blocs ou ajoutez un saut de page';
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
  document.querySelectorAll('.pdf-page').forEach(page => {
    // retirer d'abord la classe : le bandeau d'avertissement (30px sous la page)
    // gonflerait scrollHeight et rendrait l'état collant
    page.classList.remove('overflowing');
    page.classList.toggle('overflowing', page.scrollHeight > PAGE_H + 2);
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

  const controls = document.createElement('div');
  controls.className = 'row-controls';
  controls.innerHTML = `
    <button class="rctrl del" data-act="del" title="Supprimer">✕</button>
    <button class="rctrl" data-act="dup" title="Dupliquer">⧉</button>
    <button class="rctrl" data-act="up" title="Monter">↑</button>
    <button class="rctrl" data-act="down" title="Descendre">↓</button>`;
  wrap.appendChild(controls);

  wrap.addEventListener('click', (e) => {
    if(e.target.closest('.rctrl')) return;
    if(e.target.closest('.img-slot')) return;
    state.selectedId = blk.id;
  });

  controls.addEventListener('click', (e) => {
    const act = e.target.dataset.act;
    if(!act) return;
    const idx = state.doc.findIndex(x=>x.id===blk.id);
    if(idx < 0) return;
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
  pickerBackdrop.classList.add('open');
}
document.getElementById('addBlockBtn').addEventListener('click', ()=>{
  const idx = state.selectedId ? state.doc.findIndex(b=>b.id===state.selectedId) : state.doc.length-1;
  openBlockPicker(idx);
});
document.getElementById('pickerClose').addEventListener('click', ()=> pickerBackdrop.classList.remove('open'));
pickerBackdrop.addEventListener('click', (e)=>{ if(e.target===pickerBackdrop) pickerBackdrop.classList.remove('open'); });

BLOCK_LIBRARY.forEach(opt=>{
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
  document.getElementById('titleColorInp').value = st.titleColor;
  document.getElementById('accentColorInp').value = st.accent;
  document.getElementById('pageBgSel').value = st.pageBg;
  document.getElementById('leadersChk').checked = !!st.leaders;
}

function readAppearanceForm(){
  state.style = {
    titleFont: document.getElementById('titleFontSel').value,
    bodyFont: document.getElementById('bodyFontSel').value,
    titleColor: document.getElementById('titleColorInp').value,
    accent: document.getElementById('accentColorInp').value,
    pageBg: document.getElementById('pageBgSel').value,
    leaders: document.getElementById('leadersChk').checked,
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
['titleFontSel','bodyFontSel','titleColorInp','accentColorInp','pageBgSel','leadersChk'].forEach(id => {
  document.getElementById(id).addEventListener('change', readAppearanceForm);
});
document.getElementById('appearanceReset').addEventListener('click', () => {
  state.style = defaultStyle();
  applyStyle();
  fillAppearanceForm();
  markDirty();
});

/* ===================== Boot ===================== */

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
};
