/* ===================== Modèle de données ===================== */

let uidCounter = 1;
function newId(){ return 'b' + (uidCounter++) + '_' + Math.random().toString(36).slice(2,7); }

/* Carte café — dépliant 3 volets (2 planches paysage).
   Chaque planche = 3 volets, séparés par des blocs `colbreak` ;
   `pagebreak` démarre la planche suivante. */
function defaultDoc(){
  const b = (type, fields) => ({ id: newId(), type, ...fields });
  return [
    /* ===================== PLANCHE 1 (boissons & desserts) ===================== */

    /* Éléments décoratifs (positionnés en absolu, déplaçables) */
    b('deco', {img:'assets/deco-stamp.png', x:300, y:200, w:82, rot:0}),
    b('deco', {img:'assets/deco-flower.png', x:758, y:662, w:80, rot:0}),

    /* ---------- Volet 1 : cocktails, boissons fraîches, vins, champagnes ---------- */
    b('section', {fr:'COCKTAILS FRAIS PRESSÉS', en:'(40 cl)', price:'8'}),
    b('formule', {text:'Supplément collagène "Day+" +2€'}),
    b('item', {fr:'GINGER ADDICT', en:'Pomme, citron, gingembre', price:'', half:true}),
    b('item', {fr:'FRESH', en:'Ananas, pomme, menthe fraîche', price:'', half:true}),
    b('item', {fr:'IPANEMA', en:'Baies d’açaï BIO*, banane, myrtille, pomme', price:'', half:true}),
    b('item', {fr:'LEMONANA', en:'Citron, menthe, limonade', price:'', half:true}),
    b('item', {fr:'SWEET TROPICAL', en:'Lait de coco, banane, purée de mangue*', price:'', half:true}),
    b('item', {fr:'CELERY KISS', en:'Pomme, citron, épinard, céleri', price:'', half:true}),
    b('item', {fr:'WAKE UP', en:'Carotte, pomme, gingembre', price:'', half:true}),
    b('item', {fr:'GREEN JUICE', en:'Concombre, pomme, gingembre', price:'', half:true}),
    b('item', {fr:'GOOD MOOD', en:'Pomme, kiwi, citron', price:'', half:true}),

    b('section', {fr:'SHOTS', en:'(7 cl)', price:'3.5'}),
    b('item', {fr:'LEMON SHOT', en:'Citron, gingembre', price:'', half:true}),
    b('item', {fr:'GINGER SHOT', en:'Pomme, gingembre', price:'', half:true}),

    b('section', {fr:'COCKTAILS CLASSIQUES', en:'(27 cl)'}),
    b('item', {fr:'MOJITO ORIGINAL', en:'Rhum Havana 3 ans 4 cl, citron vert, menthe fraîche, cassonnade, eau gazeuse', price:'9'}),
    b('item', {fr:'APÉROL SPRITZ', en:'Apérol 6 cl, Prosecco, eau gazeuse', price:'9'}),
    b('item', {fr:'UGO SPRITZ', en:'Liqueur St Germain 6 cl, Prosecco, eau gazeuse', price:'11'}),

    b('section', {fr:'BOISSONS FRAÎCHES', en:null}),
    b('item', {fr:'EAU AQUACHIARA', en:'Plate ou gazeuse 75 cl', price:'5', inline:true}),
    b('item', {fr:'EAU DÉTOX', en:'Concombre & menthe 75 cl', price:'5.5', inline:true}),
    b('item', {fr:'THÉ GLACÉ MAISON : INFUSION PAR L’INFUSEUR', en:'Cassis, hibiscus, citronnelle. Infusion "Détox"', price:'6'}),
    b('item', {fr:'COCA COLA, COCA COLA SANS SUCRE', en:'33 cl', price:'5.5', inline:true}),
    b('item', {fr:'FUZE TEA', en:'Pêche 25 cl', price:'5', inline:true}),
    b('item', {fr:'PERRIER', en:'33 cl', price:'5.5', inline:true}),
    b('item', {fr:'BIÈRE 1664 BLONDE', en:'25 cl / 50 cl', price:'5.9 / 8.5', inline:true}),
    b('item', {fr:'BIÈRE 1664 BLANCHE', en:'25 cl / 50 cl', price:'6.2 / 9', inline:true}),
    b('item', {fr:'BIÈRE GRIMBERGEN ROUGE', en:'25 cl / 50 cl', price:'6.5 / 8.5', inline:true}),

    b('section', {fr:'VINS', en:null}),
    b('pricehead', {cols:3, h1:'VERRE\n14 cl', h2:'VERRE\n25 cl', h3:'BTL\n75 cl'}),
    b('formule', {text:'ROUGES', heading:true}),
    b('item', {fr:'Côtes du Rhone Amour de Fruits - Domaine Dieu le Fit BIO', en:'', cols:3, p1:'6', p2:'9', p3:'29'}),
    b('item', {fr:'Saint Nicolas de Bourgueil AOP - Domaine des Pins', en:'', cols:3, p1:'6', p2:'9', p3:'29'}),
    b('item', {fr:'Graves AOP - Château les Majureaux', en:'', cols:3, p1:'-', p2:'-', p3:'35'}),
    b('formule', {text:'BLANCS', heading:true}),
    b('item', {fr:'IGP Côtes de Gascogne Sauvignon Gros-Manseng - Famille Dufour', en:'demi sec', cols:3, p1:'6', p2:'9', p3:'29'}),
    b('item', {fr:'IGP D’OC Chardonnay - Cellier du Pic', en:'', cols:3, p1:'6', p2:'9', p3:'29'}),
    b('item', {fr:'Petit Chablis - Domaine du Chardonnay', en:'', cols:3, p1:'9', p2:'-', p3:'45'}),
    b('formule', {text:'ROSÉ', heading:true}),
    b('item', {fr:'Vin de France Gris de Gris Les Oliviers - Domaine des Captives BIO', en:'', cols:3, p1:'6', p2:'9', p3:'29'}),

    b('section', {fr:'CHAMPAGNES', en:null}),
    b('pricehead', {cols:2, h1:'VERRE\n12 cl', h2:'BTL\n75 cl'}),
    b('item', {fr:'Grande Réserve Brut - Pierre Domi', en:'local', cols:2, p1:'9.5', p2:'-'}),
    b('item', {fr:'Blanc de Blancs - Pierre Domi', en:'local', cols:2, p1:'-', p2:'60'}),
    b('item', {fr:'Cuvée Royale Brut - Joseph Perrier', en:'', cols:2, p1:'12', p2:'65'}),
    b('item', {fr:'« R » de Ruinart Brut - Ruinart', en:'', cols:2, p1:'-', p2:'90'}),
    b('note', {text:'AOP : Appellation d’Origine Protégée, IGP : Indication Géographique Protégée.  L’abus d’alcool est dangereux pour la santé. Toute boisson alcoolisée doit être accompagnée d’un plat.', center:true}),

    b('colbreak', {}),

    /* ---------- Volet 2 : desserts, boissons chaudes, lattes ---------- */
    b('section', {fr:'DESSERTS', en:null, big:true}),
    b('item', {fr:'PÊCHE FAÇON MELBA', en:'Chantilly végétale, coulis de fruits rouges, amandes effilées', price:'8.5'}),
    b('item', {fr:'MOUSSE AU CHOCOLAT NOIR', en:'', price:'8.5'}),
    b('item', {fr:'CRUMBLE POMMES', en:'', price:'8.5'}),
    b('item', {fr:'LE PLUME', en:'Gâteau au fromage blanc allégé', price:'9.5'}),
    b('item', {fr:'MOUSSE LÉGÈRE "SIGNATURE"', sg:true, veg:true, en:'Mousse au lait d’amande, coulis de fruits rouges*', price:'8.5'}),
    b('item', {fr:'MOELLEUX AU CHOCOLAT', en:'Crème anglaise', price:'8'}),
    b('item', {fr:'CAKE DU MOMENT', en:'Cake myrtille, glaçage citron ou cake aux pépites de chocolat', price:'5.5'}),
    b('item', {fr:'CRÊPE AU SUCRE*', en:'Supplément Nutella, crème sucrée ou chocolat maison +1€', price:'5.5'}),
    b('item', {fr:'COOKIE', en:'Chocolat-noix de pécan ou matcha-chocolat blanc', price:'5.5'}),
    b('item', {fr:'AÇAÏ BOWL', veg:true, en:'Açaï BIO*, banane, muesli, coco râpée, myrtille', price:'12'}),
    b('item', {fr:'CAFÉ GOURMAND', en:'Mousse légère, cake du moment, mousse au chocolat', price:'10'}),

    b('section', {fr:'FROZEN YOGURT', veg:true, en:'(avec 2 toppings au choix)', big:true, price:'9.5'}),
    b('note', {text:'Glace au yaourt nature basse calorie'}),
    b('formule', {text:'Topping supplémentaire +1€'}),
    b('note', {text:'Toppings : banane, myrtille, caramel beurré salé*, miel, noix de pécan, muesli, amandes, Nutella, sirop d’érable'}),

    b('section', {fr:'BOISSONS CHAUDES', en:null, big:true}),
    b('item', {fr:'CAFÉ EXPRESSO, DÉCAFÉINÉ', en:'', price:'2.8'}),
    b('item', {fr:'CAFÉ NOISETTE', en:'', price:'3.2'}),
    b('item', {fr:'DOUBLE EXPRESSO, CAFÉ CRÈME', en:'', price:'5.5'}),
    b('item', {fr:'GRANDE LATTE MACCHIATO, CAPPUCCINO', en:'', price:'6'}),
    b('item', {fr:'CHOCOLAT CHAUD', en:'', price:'6'}),
    b('item', {fr:'GREEN MATCHA LATTE', en:'', price:'7'}),
    b('item', {fr:'THÉS BIO & INFUSION PAR L’INFUSEUR', en:'Thé vert Sencha, thé vert menthe, thé vert gingembre, thé Earl grey, Roiboos vanille. Infusion détox : cassis, hibiscus, citronnelle', price:'6'}),
    b('note', {text:'Les boissons lactées peuvent être servies au lait végétal +1€'}),
    b('note', {text:'Sirop de vanille ou de caramel +0.5€'}),
    b('note', {text:'Supplément collagène "Day+" +2€'}),

    b('section', {fr:'LES LATTE', en:'de la Main Noire', big:true, price:'7'}),
    b('item', {fr:'GOLDEN LATTE BIO', en:'Curcuma, gingembre, poivre noir, muscade, cardamome, sucre de betterave', price:''}),
    b('item', {fr:'BLUE LATTE BIO', en:'Spiruline bleue, coco, gingembre, sumac, sucre de betterave', price:''}),
    b('item', {fr:'CHAI LATTE BIO', en:'Thé noir Rukeri AOP, poivre noir, gingembre, cannelle, cardamome, clou de girofle, sucre de betterave', price:''}),
    b('item', {fr:'UBE LATTE', en:'Patate douce violette, ube violet, sucre de betterave, vanille Bourbon de Madagascar', price:''}),

    b('colbreak', {}),

    /* ---------- Volet 3 : panneau vert (nom + signature éditables) ---------- */
    b('panel', {img:null, name:'Le Café', caption:'Chez nous, <em>happiness</em> is homemade'}),

    b('pagebreak', {}),

    /* ===================== PLANCHE 2 (brunch & food) ===================== */

    /* ---------- Volet 1 : le brunch + buns ---------- */
    b('brunch', {
      title:'LE<br>BRUNCH',
      subtitle:'Samedi, Dimanche & jours fériés',
      offer:'ASSIETTE BRUNCH <i>24</i><br>FORMULE <i>32</i>',
      d1t:'BOISSON AU CHOIX - 25 CL',
      d1b:'Au choix : Green juice <i>ou</i> Wake up <i>ou</i> orange pressée <i>ou</i> jus de pomme pressé<br>(ou Mimosa 12 cl +6€)',
      d2t:'BOISSON CHAUDE OU THÉ GLACÉ',
      d2b:'Au choix : Café, chocolat chaud, thé <i>ou</i> infusion L’Infuseur.<br>(Cappuccino, Macchiato, ou lait végétal +1€)<br>(Latte au choix +1.50€)',
      d3t:'ASSIETTE BRUNCH',
      d3b:'Pain brioché artisanal multigrains*, cheddar, œufs pochés, sauce hollandaise*, avocat, salade de pommes de terre, salade verte<br>+ au choix : poulet, saumon fumé <i>ou</i> pastrami',
      d4t:'DESSERT',
      d4b:'Pancakes, bananes, caramel beurre salé & noix de pécan<br>ou fromage blanc 0 %, muesli & miel',
    }),

    b('section', {fr:'BUNS', en:null, big:true}),
    b('note', {text:'Pain brioché artisanal multigrains*', strong:true}),
    b('note', {text:'Supplément cheddar +1.5€'}),
    b('item', {fr:'BROOKLYN', en:'Pastrami de bœuf, cornichons, émincé de chou, mayonnaise Savora, salade de pommes de terre, salade verte', price:'19'}),
    b('item', {fr:'OSLO', en:'Saumon fumé, concombre, yaourt aux herbes, salade de pommes de terre, salade verte', price:'18.5'}),
    b('item', {fr:'CALIFORNIEN', en:'Poulet, tomate, romaine, œuf dur, mayonnaise Savora, salade de pommes de terre, salade verte', price:'16.5'}),

    b('colbreak', {}),

    /* ---------- Volet 2 : salades, plats chauds, petits plus ---------- */
    b('section', {fr:'SALADES GOURMANDES', en:null, big:true}),
    b('item', {fr:'SALADE GRECQUE', sg:true, veg:true, en:'Salade romaine, concombre, tomate cerise, féta, olives Kalamata, pickles, menthe, vinaigrette balsamique', price:'17'}),
    b('item', {fr:'GREEN GLOW', sg:true, en:'Saumon cuit mariné soja-sésame, fromage blanc, haricots verts, concombre, edamame, pois gourmands, roquette, pignons de pin & graines de courge, sauce au collagène', price:'22'}),
    b('item', {fr:'MIDDLE EAST', veg:true, en:'Taboulé de quinoa, halloumi, courgette grillée, salade romaine, houmous, olives Kalamata, crackers, huile d’olive-citron-miel', price:'18'}),
    b('item', {fr:'TAI CHI', en:'Salade romaine, chou chinois, chou rouge, julienne de carotte, pousses de soja, poulet, spaghettis de konjac, radis, cacahuète, menthe, coriandre, sauce soja-sésame', price:'18'}),
    b('item', {fr:'CHICKEN QUINOA BOWL', en:'Émincé de poulet, quinoa, avocat, concombre, grenade, pousses d’épinard, chèvre frais, amandes, basilic, salade romaine, sauce huile d’olive-citron-miel', price:'19'}),
    b('item', {fr:'MUM TO BE', en:'Saumon cuit mariné soja-sésame, haricots verts, edamame*, champignons sautés, patate douce, fromage Grana Padano, graines de lin, amandes, huile d’olive-citron-miel', price:'20.5'}),
    b('item', {fr:'CRISPY QUINOA', en:'Pousses d’épinard, salade romaine, quinoa, émincé de poulet, avocat, oignons crispy, sauce au miel', price:'18'}),
    b('item', {fr:'CAESAR', en:'Salade romaine, émincé de poulet, champignons, tomates cerise, fromage Grana Padano, oignons crispy, sauce caesar', price:'18'}),
    b('item', {fr:'SWEET NIÇOISE', sg:true, en:'Salade romaine, pousses d’épinard, filet de thon de Tarifa, œuf poché, haricots verts, patates douces, tomates cerise, pickles, olives Kalamata, huile d’olive-citron-miel', price:'21.5'}),
    b('note', {text:'Toutes nos salades sont désormais disponibles en version VEGGIE avec notre aiguillette végétale BIO*'}),

    b('section', {fr:'PLATS CHAUDS', en:null, big:true}),
    b('item', {fr:'AUBERGINE À LA PARMIGGIANA', veg:true, en:'Fiore di latte, coulis de tomate, roquette', price:'18'}),
    b('item', {fr:'CABILLAUD MISO', sg:true, en:'Cabillaud mariné au miso blanc, purée de haricots verts, brocoli bimi, coriandre', price:'24'}),
    b('item', {fr:'PAVÉ DE SAUMON MI-CUIT SOJA SÉSAME', sg:true, en:'Riz curcuma, haricots verts & champignons sautés', price:'23'}),
    b('item', {fr:'AIGUILLETTES DE POULET', sg:true, en:'Aiguillettes de poulet marinées au gingembre & citron confit, patate douce rôtie, haricots verts', price:'22'}),
    b('item', {fr:'CURRY DE POULET AU LAIT DE COCO', en:'Riz curcuma, coriandre, julienne de carotte & courgette grillée', price:'18'}),

    b('section', {fr:'PETITS PLUS', en:null, big:true}),
    b('item', {fr:'ŒUF POCHÉ', en:'', price:'2.5', half:true}),
    b('item', {fr:'DEMI AVOCAT', en:'', price:'3', half:true}),
    b('item', {fr:'HALLOUMI GRILLÉ', en:'', price:'5', half:true}),
    b('item', {fr:'CHAMPIGNONS SAUTÉS - HARICOTS VERTS', en:'', price:'', half:true}),
    b('item', {fr:'SALADE VERTE - RIZ CURCUMA - SALADE DE POMMES DE TERRE', en:'', price:'5', half:true}),
    b('item', {fr:'SAUMON FUMÉ - SAUMON CUIT MARINE', en:'', price:'', half:true}),

    b('colbreak', {}),

    /* ---------- Volet 3 : piadinas, clubs, toasts, menu enfant ---------- */
    b('section', {fr:'PIADINAS', en:null, big:true}),
    b('note', {text:'Galette de blé non levée légèrement toastée', strong:true}),
    b('item', {fr:'PIADINA VEGGIE', en:'Pesto, courgettes & poivrons grillés, tomates confites, fromage fiore di latte, salade verte', price:'18'}),
    b('item', {fr:'PIADINA POULET', en:'Pesto rosso, tomates confites, fromage fiore di latte, salade verte', price:'18'}),
    b('item', {fr:'PIADINA THON', en:'Tomates confites, miettes de thon, œuf poché, fiore di latte, salade verte', price:'18'}),

    b('section', {fr:'CLUBS SANDWICHS', en:null, big:true}),
    b('item', {fr:'CLUB POULET', en:'Poulet, tomate, salade romaine, œuf dur, mayonnaise Savora, salade de pommes de terre, salade verte', price:'17'}),
    b('item', {fr:'CLUB TUNA', en:'Rillette de thon à l’aneth, tomate, avocat, salade de pommes de terre, salade verte', price:'16'}),
    b('item', {fr:'CLUB SAUMON', en:'Saumon fumé, fromage à la crème, avocat, salade de pommes de terre, salade verte', price:'18'}),
    b('item', {fr:'CLUB PASTRAMI', en:'Pastrami de bœuf, cornichons, émincé de chou, mayonnaise Savora, salade de pommes de terre, salade verte', price:'19'}),

    b('section', {fr:'TOASTS', en:null, big:true}),
    b('item', {fr:'AVOCADO TOAST', en:'Pain nordique BIO, avocat slicé, féta, œuf poché, grenade, sésame, salade verte', price:'17'}),
    b('item', {fr:'TARTINE CAPRESE', en:'Pain nordique BIO, tomate, mozzarella di bufala, câpres, crème de balsamique, roquette', price:'15'}),
    b('note', {text:'Avec du saumon fumé +5€'}),

    b('enfant', {
      title:'Menu Enfant',
      offer:'PLAT • BOISSON • DESSERT <i>10</i>',
      body:'Demi pavé de saumon, <i>ou</i> Mini club poulet <i>ou</i> thon,<br>salade de pommes de terre<br>Sirop à l’eau <i>ou</i> jus de pomme pressé<br>Crêpe au sucre <i>ou</i> Nutella, <i>ou</i> Cake du moment',
    }),

    b('note', {text:'Paiements acceptés: Espèces, Tickets restaurant, CB, American Express. Prix nets en euros, service et TVA inclus. * Produit surgelé. DOP = dénomination d’origine protégée. Une carafe d’eau potable sera mise à votre disposition gratuitement sur demande. Liste des allergènes sur demande.', center:true, legend:true}),
  ];
}

const BLOCK_LIBRARY = [
  {type:'section', ttl:'Titre de section', desc:'Ex : « DESSERTS » ; « FROZEN YOGURT / V »', make:()=>({fr:'NOUVELLE SECTION', en:null})},
  {type:'item', ttl:'Plat', desc:'Nom, description, prix', make:()=>({fr:'NOUVEAU PLAT', en:'Description', price:'0'})},
  {type:'formule', ttl:'Ligne formule', desc:'Texte en vert (ex. prix partagé)', make:()=>({text:'NOUVELLE FORMULE'})},
  {type:'note', ttl:'Note / mention', desc:'Petit texte italique', make:()=>({text:'Note...'})},
  {type:'item', ttl:'Plat — 2 colonnes', desc:'Plat compact réparti sur 2 sous-colonnes (cocktails, petits plus…)', make:()=>({fr:'NOUVEAU PLAT', en:'Description', price:'', half:true})},
  {type:'item', ttl:'Plat — inline', desc:'Nom + qualificatif sur une seule ligne (« 33 cl »)', make:()=>({fr:'NOUVEAU PLAT', en:'33 cl', price:'0', inline:true})},
  {type:'item', ttl:'Vin — 3 prix', desc:'Ligne avec 3 colonnes de prix (verre/verre/btl)', make:()=>({fr:'Nom du vin — Domaine', en:'', cols:3, p1:'6', p2:'9', p3:'29'})},
  {type:'pricehead', ttl:'En-tête colonnes prix', desc:'Libellés au-dessus des colonnes de prix (Verre / Btl)', make:()=>({cols:3, h1:'Verre 14 cl', h2:'Verre 25 cl', h3:'Btl 75 cl'})},
  {type:'divider', ttl:'Séparateur', desc:'Ligne fine de séparation', make:()=>({})},
  {type:'colbreak', ttl:'Nouvelle colonne', desc:'Passe au volet suivant de la planche', make:()=>({})},
  {type:'pagebreak', ttl:'Nouvelle planche', desc:'Démarre une nouvelle planche (PDF)', make:()=>({})},
  {type:'panel', ttl:'Panneau visuel', desc:'Grand visuel botanique + nom éditable (volet entier)', make:()=>({img:null, name:'Le Café', caption:'Chez nous, happiness is homemade'})},
  {type:'brunch', ttl:'Cadre « Brunch »', desc:'Cadre botanique ovale avec texte éditable', make:()=>({title:'LE BRUNCH', subtitle:'Samedi, dimanche & jours fériés', offer:'ASSIETTE BRUNCH 24 · FORMULE 32', d1t:'BOISSON', d1b:'…', d2t:'BOISSON CHAUDE', d2b:'…', d3t:'ASSIETTE', d3b:'…', d4t:'DESSERT', d4b:'…'})},
  {type:'enfant', ttl:'Pastille « Menu Enfant »', desc:'Pastille botanique avec texte éditable', make:()=>({title:'Menu Enfant', offer:'PLAT · BOISSON · DESSERT  10', body:'…'})},
  {type:'deco', ttl:'Déco — tampon', desc:'Motif soleil-agrume (déplaçable)', make:()=>({img:'assets/deco-stamp.png', x:120, y:120, w:120, rot:0})},
  {type:'deco', ttl:'Déco — fleur', desc:'Fleur botanique (déplaçable)', make:()=>({img:'assets/deco-flower.png', x:150, y:150, w:90, rot:0})},
  {type:'deco', ttl:'Déco — image…', desc:'Votre propre illustration (déplaçable)', make:()=>({img:'assets/deco-stamp.png', x:130, y:130, w:120, rot:0})},
];

/* Champs mono-lignes : Entrée = valider, pas de retour à la ligne.
   Les champs multilignes gardent les <br>. */
const MULTILINE_FIELDS = new Set(['insta','wifi','d1b','d2b','d3b','d4b','body']);

/* ===================== Apparence (polices & couleurs) ===================== */

const FONT_CHOICES = {
  title: [
    {name:'Playfair Display', gq:'Playfair+Display:wght@400;700;800'},
    {name:'Cormorant Garamond', gq:'Cormorant+Garamond:wght@600;700'},
    {name:'DM Serif Display', gq:'DM+Serif+Display'},
    {name:'Libre Baskerville', gq:'Libre+Baskerville:wght@400;700'},
    {name:'Marcellus', gq:'Marcellus'},
  ],
  body: [
    {name:'EB Garamond', gq:'EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500'},
    {name:'Cormorant Garamond', gq:'Cormorant+Garamond:ital,wght@0,500;0,600;1,500'},
    {name:'Poppins', gq:'Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500'},
    {name:'Lato', gq:'Lato:ital,wght@0,400;0,700;1,400'},
    {name:'Source Sans 3', gq:'Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400'},
  ],
};

function defaultStyle(){
  return {
    titleFont:'Playfair Display',
    bodyFont:'EB Garamond',
    titleColor:'#3a492d',   // vert forêt
    accent:'#3a492d',
    pageBg:'#fefbf8',       // crème
    leaders:false,          // pas de pointillés par défaut (comme l'imprimé)
  };
}

function applyStyle(){
  const st = state.style;
  const root = document.documentElement;
  root.style.setProperty('--font-title', `'${st.titleFont}', serif`);
  root.style.setProperty('--font-body', `'${st.bodyFont}', serif`);
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
  dirty: false,
  baseVersion: null,
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

const DRAFT_KEY = 'carte_ds_draft_v2';

function saveDraft(){
  try{
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ts: new Date().toISOString(), doc: state.doc, style: state.style}));
  }catch(e){ /* stockage plein : le brouillon est un filet de sécurité */ }
}
function clearDraft(){ localStorage.removeItem(DRAFT_KEY); state.dirty = false; updateSyncStatus(); }
function getDraft(){
  try{
    const raw = localStorage.getItem(DRAFT_KEY);
    const d = raw ? JSON.parse(raw) : null;
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

/* ===================== Rendu (planches 3 volets) ===================== */

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

/* Pictos régime (sans gluten / végétarien) affichés après un nom */
function dietIcons(blk){
  let s = '';
  if(blk.sg)  s += '<img class="diet" src="assets/icon-sg.png" alt="sans gluten">';
  if(blk.veg) s += '<img class="diet" src="assets/icon-veg.png" alt="végétarien">';
  return s;
}
/* Légende des pictos, avec les icônes */
function dietLegend(){
  return `<span class="diet-legend"><img class="diet" src="assets/icon-sg.png"> = sans gluten` +
         `&nbsp;&nbsp;<img class="diet" src="assets/icon-veg.png"> = végétarien</span>`;
}

function renderBlockInner(blk){
  switch(blk.type){
    case 'panel':
      return `
        <div class="panel-wrap">
          <div class="panel-img img-slot" data-id="${blk.id}" data-field="img" title="Cliquer pour remplacer le visuel">
            <img src="${blk.img || 'assets/logo.png'}" alt="">
          </div>
          <div class="panel-over">
            <div class="panel-name">${ed(blk.id,'name',esc(blk.name),'','div')}</div>
            <div class="panel-caption">${ed(blk.id,'caption',blk.caption,'','div')}</div>
          </div>
        </div>`;
    case 'brunch':
      return `
        <img class="frame-bg" src="assets/brunch.png" alt="" draggable="false">
        <div class="brunch-inner">
          <div class="brunch-title">${ed(blk.id,'title',blk.title,'','div')}</div>
          <div class="brunch-sub">${ed(blk.id,'subtitle',esc(blk.subtitle),'','div')}</div>
          <div class="brunch-offer">${ed(blk.id,'offer',blk.offer,'','div')}</div>
          <div class="brunch-sep">—</div>
          <div class="brunch-h">${ed(blk.id,'d1t',esc(blk.d1t),'','div')}</div>
          <div class="brunch-b">${ed(blk.id,'d1b',blk.d1b,'','div')}</div>
          <div class="brunch-sep">—</div>
          <div class="brunch-h">${ed(blk.id,'d2t',esc(blk.d2t),'','div')}</div>
          <div class="brunch-b">${ed(blk.id,'d2b',blk.d2b,'','div')}</div>
          <div class="brunch-sep">—</div>
          <div class="brunch-h">${ed(blk.id,'d3t',esc(blk.d3t),'','div')}</div>
          <div class="brunch-b">${ed(blk.id,'d3b',blk.d3b,'','div')}</div>
          <div class="brunch-sep">—</div>
          <div class="brunch-h">${ed(blk.id,'d4t',esc(blk.d4t),'','div')}</div>
          <div class="brunch-b">${ed(blk.id,'d4b',blk.d4b,'','div')}</div>
        </div>`;
    case 'enfant':
      return `
        <img class="frame-bg" src="assets/enfant.png" alt="" draggable="false">
        <div class="enfant-inner">
          <div class="enfant-title">${ed(blk.id,'title',esc(blk.title),'','div')}</div>
          <div class="enfant-offer">${ed(blk.id,'offer',blk.offer,'','div')}</div>
          <div class="enfant-b">${ed(blk.id,'body',blk.body,'','div')}</div>
        </div>`;
    case 'section':
      return `<h2>${ed(blk.id,'fr',esc(blk.fr))}${blk.en != null ? ' <span class="en'+(/^\(\s*\d+\s*cl\s*\)$/.test(blk.en)?' unit':'')+'">'+ed(blk.id,'en',esc(blk.en))+'</span>' : ''}${dietIcons(blk)}${blk.price != null ? '<span class="sec-price">'+ed(blk.id,'price',esc(blk.price))+'</span>' : ''}</h2>`;
    case 'item': {
      if(blk.cols){
        let cells = '';
        for(let i=1;i<=blk.cols;i++) cells += `<span class="pcell">${ed(blk.id,'p'+i,esc(blk['p'+i]))}</span>`;
        return `
          <div class="txt">
            <div class="fr">${ed(blk.id,'fr',esc(blk.fr))}${dietIcons(blk)}</div>
            <div class="en">${ed(blk.id,'en',esc(blk.en))}</div>
          </div>
          <div class="pcols">${cells}</div>`;
      }
      return `
        <div class="txt">
          <div class="fr">${ed(blk.id,'fr',esc(blk.fr))}${dietIcons(blk)}</div>
          <div class="en">${ed(blk.id,'en',esc(blk.en))}</div>
        </div>
        <div class="leader"></div>
        <div class="price">${ed(blk.id,'price',esc(blk.price))}</div>`;
    }
    case 'pricehead': {
      let cells = '';
      for(let i=1;i<=(blk.cols||3);i++) cells += `<span class="pcell head">${ed(blk.id,'h'+i,esc(blk['h'+i]))}</span>`;
      return `<div class="ph-spacer"></div><div class="pcols">${cells}</div>`;
    }
    case 'deco':
      return `
        <img class="deco-img" src="${blk.img || 'assets/deco-stamp.png'}" alt="décor" draggable="false">
        <div class="deco-resize" title="Redimensionner"></div>`;
    case 'formule':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'note':
      return ed(blk.id,'text',esc(blk.text),'', 'div') + (blk.legend ? dietLegend() : '');
    case 'divider':
      return '';
    case 'colbreak':
      return '⇥ Nouvelle colonne';
    case 'pagebreak':
      return '↴ Nouvelle planche (PDF)';
    default:
      return '';
  }
}

function blockClass(blk){
  const map = {section:'blk-section', item:'blk-item', formule:'blk-formule', note:'blk-note', divider:'blk-divider', pagebreak:'blk-pagebreak', colbreak:'blk-colbreak', panel:'blk-panel', brunch:'blk-brunch', enfant:'blk-enfant', pricehead:'blk-pricehead', deco:'blk-deco'};
  let c = map[blk.type] || '';
  if(blk.type==='formule' && blk.italic) c += ' italic';
  if(blk.type==='formule' && blk.heading) c += ' heading';
  if(blk.type==='section' && blk.big) c += ' big';
  if(blk.type==='note' && blk.center) c += ' center';
  if(blk.type==='note' && blk.strong) c += ' strong';
  if(blk.type==='item' && blk.inline) c += ' inline';
  if(blk.type==='item' && blk.cols) c += ' wine';
  return c;
}

function render(){
  canvasWrap.innerHTML = '';
  let sheetEl = null, voletEl = null, sheetNum = 0;

  const newVolet = () => {
    voletEl = document.createElement('div');
    voletEl.className = 'volet';
    sheetEl.insertBefore(voletEl, sheetEl.querySelector('.sheet-overflow-warning'));
  };
  const newSheet = () => {
    sheetNum++;
    sheetEl = document.createElement('div');
    sheetEl.className = 'sheet';
    const label = document.createElement('div');
    label.className = 'sheet-label';
    label.textContent = 'Planche ' + sheetNum;
    sheetEl.appendChild(label);
    const warn = document.createElement('div');
    warn.className = 'sheet-overflow-warning';
    warn.textContent = '⚠️ Une colonne dépasse la hauteur de la planche — déplacez ou retirez des blocs';
    sheetEl.appendChild(warn);
    canvasWrap.appendChild(sheetEl);
    newVolet();
  };

  newSheet();

  let gridEl = null;    // conteneur 2 sous-colonnes pour les items « half »
  let groupEl = null;   // groupe « section + ses lignes » (pour répartir l'espace)
  const ensureGroup = () => {
    if(!groupEl){ groupEl = document.createElement('div'); groupEl.className = 'section-group'; voletEl.appendChild(groupEl); }
    return groupEl;
  };

  state.doc.forEach((blk, idx) => {
    // Éléments décoratifs : positionnés en absolu sur la planche, hors flux
    if(blk.type === 'deco'){ sheetEl.appendChild(buildDecoEl(blk)); return; }

    // Marqueurs de colonne / planche : au niveau du volet, hors groupe
    if(blk.type === 'colbreak' || blk.type === 'pagebreak'){
      gridEl = null; groupEl = null;
      voletEl.appendChild(buildInsertBar(idx - 1));
      voletEl.appendChild(buildBlockEl(blk));
      if(blk.type === 'pagebreak') newSheet(); else newVolet();
      return;
    }
    // Panneau vert : occupe tout le volet, hors groupe
    if(blk.type === 'panel'){
      gridEl = null; groupEl = null;
      voletEl.appendChild(buildInsertBar(idx - 1));
      voletEl.appendChild(buildBlockEl(blk));
      return;
    }
    // Nouvelle section / bloc autonome → nouveau groupe (pour la répartition)
    if(blk.type === 'section' || blk.type === 'brunch' || blk.type === 'enfant') groupEl = null;
    const g = ensureGroup();

    // Items « half » (cocktails, shots, petits plus) → 2 sous-colonnes
    if(blk.type === 'item' && blk.half){
      if(!gridEl){ gridEl = document.createElement('div'); gridEl.className = 'item-grid'; g.appendChild(gridEl); }
      gridEl.appendChild(buildBlockEl(blk));
      return;
    }
    gridEl = null;
    g.appendChild(buildInsertBar(idx - 1));
    g.appendChild(buildBlockEl(blk));
  });

  requestAnimationFrame(checkOverflow);
}

function checkOverflow(){
  if(!window.innerWidth || matchMedia('(max-width:1100px)').matches){
    document.querySelectorAll('.sheet').forEach(s => s.classList.remove('overflowing'));
    return;
  }
  document.querySelectorAll('.sheet').forEach(sheet => {
    sheet.classList.remove('overflowing');
    let over = false;
    sheet.querySelectorAll('.volet').forEach(v => {
      if(v.scrollHeight > v.clientHeight + 6) over = true;
    });
    sheet.classList.toggle('overflowing', over);
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
    <button class="rctrl grip" data-act="grip" title="Glisser pour déplacer où vous voulez">⠿</button>
    <button class="rctrl del" data-act="del" title="Supprimer">✕</button>
    <button class="rctrl" data-act="dup" title="Dupliquer">⧉</button>
    <button class="rctrl" data-act="up" title="Monter">↑</button>
    <button class="rctrl" data-act="down" title="Descendre">↓</button>`;
  wrap.appendChild(controls);
  const grip = controls.querySelector('.grip');
  if(grip) grip.addEventListener('mousedown', (e)=> startBlockDrag(e, blk));

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

/* ===================== Glisser-déposer d'un bloc (aimanté à la grille) ===================== */

let dragState = null;

function startBlockDrag(e, blk){
  e.preventDefault(); e.stopPropagation();
  const wrap = e.target.closest('.block');
  if(!wrap) return;
  wrap.classList.add('dragging');
  document.body.classList.add('dragging-block');
  const indicator = document.createElement('div');
  indicator.className = 'drop-indicator';
  indicator.style.display = 'none';
  document.body.appendChild(indicator);
  dragState = { id: blk.id, beforeId: null, indicator };

  const move = (ev) => {
    const t = findDropTarget(ev.clientX, ev.clientY, blk.id);
    if(t){
      dragState.beforeId = t.beforeId;
      dragState.hasTarget = true;
      indicator.style.display = 'block';
      indicator.style.left = t.x + 'px';
      indicator.style.top = t.y + 'px';
      indicator.style.width = t.w + 'px';
    } else {
      dragState.hasTarget = false;
      indicator.style.display = 'none';
    }
  };
  const up = () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    wrap.classList.remove('dragging');
    document.body.classList.remove('dragging-block');
    indicator.remove();
    if(dragState && dragState.hasTarget) moveBlockBefore(dragState.id, dragState.beforeId);
    dragState = null;
  };
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
}

/* Trouve la position d'insertion la plus proche (volet sous le curseur, puis position verticale). */
function findDropTarget(cx, cy, draggedId){
  const volets = [...document.querySelectorAll('.volet')];
  if(!volets.length) return null;
  let vol = null, bestd = Infinity;
  for(const v of volets){
    const r = v.getBoundingClientRect();
    if(cx >= r.left && cx <= r.right){ vol = v; break; }
    const d = Math.min(Math.abs(cx - r.left), Math.abs(cx - r.right));
    if(d < bestd){ bestd = d; vol = v; }
  }
  if(!vol) return null;
  const vr = vol.getBoundingClientRect();
  const cands = [...vol.querySelectorAll('[data-block-id]')].filter(el =>
    el.dataset.blockId !== draggedId && !el.classList.contains('blk-deco'));
  cands.sort((a,b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  let beforeEl = null;
  for(const el of cands){
    const r = el.getBoundingClientRect();
    if(cy < r.top + r.height/2){ beforeEl = el; break; }
  }
  if(beforeEl){
    const r = beforeEl.getBoundingClientRect();
    return { beforeId: beforeEl.dataset.blockId, x: vr.left, y: r.top - 1.5, w: vr.width };
  }
  // sous tous les blocs : insérer avant le marqueur de fin de volet (reste dans ce volet)
  const marker = cands.find(el => el.classList.contains('blk-colbreak') || el.classList.contains('blk-pagebreak'));
  if(marker){
    const r = marker.getBoundingClientRect();
    return { beforeId: marker.dataset.blockId, x: vr.left, y: r.top - 1.5, w: vr.width };
  }
  const last = cands[cands.length-1];
  const y = last ? last.getBoundingClientRect().bottom + 1 : vr.top;
  return { beforeId: null, x: vr.left, y, w: vr.width };
}

function moveBlockBefore(dragId, beforeId){
  const from = state.doc.findIndex(b => b.id === dragId);
  if(from < 0) return;
  const [blk] = state.doc.splice(from, 1);
  let to;
  if(beforeId == null){ to = state.doc.length; }
  else {
    to = state.doc.findIndex(b => b.id === beforeId);
    if(to < 0) to = state.doc.length;
  }
  state.doc.splice(to, 0, blk);
  state.selectedId = dragId;
  markDirty(); render();
}

/* ===================== Ajout d'un bloc « au curseur » (clic pour placer) ===================== */

let placingState = null;

function startPlacing(opt){
  cancelPlacing();
  const blk = { id: newId(), type: opt.type, ...opt.make() };
  const label = document.createElement('div');
  label.className = 'placing-label';
  label.innerHTML = `<b>${opt.ttl}</b><span>cliquez pour placer · Échap pour annuler</span>`;
  document.body.appendChild(label);
  const indicator = document.createElement('div');
  indicator.className = 'drop-indicator';
  indicator.style.display = 'none';
  document.body.appendChild(indicator);
  document.body.classList.add('placing-block');
  placingState = { blk, opt, label, indicator, beforeId: null, hasTarget: false };

  const move = (ev) => {
    label.style.left = (ev.clientX + 16) + 'px';
    label.style.top = (ev.clientY + 16) + 'px';
    if(blk.type === 'deco'){ indicator.style.display = 'none'; placingState.hasTarget = true; return; }
    const t = findDropTarget(ev.clientX, ev.clientY, null);
    if(t){
      placingState.beforeId = t.beforeId; placingState.hasTarget = true;
      indicator.style.display = 'block';
      indicator.style.left = t.x + 'px'; indicator.style.top = t.y + 'px'; indicator.style.width = t.w + 'px';
    } else { placingState.hasTarget = false; indicator.style.display = 'none'; }
  };
  const down = (ev) => {
    const tgt = ev.target;
    if(!tgt || typeof tgt.closest !== 'function'){ return; }
    if(tgt.closest('#toolbar') || tgt.closest('.modal-backdrop')){ return; }
    if(!tgt.closest('#canvasWrap')){ cancelPlacing(); return; }
    ev.preventDefault(); ev.stopPropagation();
    finishPlacing(ev.clientX, ev.clientY);
  };
  const key = (ev) => { if(ev.key === 'Escape'){ ev.preventDefault(); cancelPlacing(); } };
  placingState.move = move; placingState.down = down; placingState.key = key;
  document.addEventListener('mousemove', move);
  document.addEventListener('keydown', key);
  // différer l'écouteur de clic pour ne pas capter le clic qui a fermé le sélecteur
  setTimeout(() => { if(placingState) document.addEventListener('mousedown', down, true); }, 0);
  H_toast('Placez « ' + opt.ttl + ' » — cliquez à l\'endroit voulu');
}

function finishPlacing(cx, cy){
  if(!placingState) return;
  const blk = placingState.blk;
  if(blk.type === 'deco'){
    const sheets = [...document.querySelectorAll('.sheet')];
    let sheetEl = sheets.find(s => { const r = s.getBoundingClientRect(); return cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom; }) || sheets[0];
    if(sheetEl){
      const r = sheetEl.getBoundingClientRect();
      blk.x = Math.round(cx - r.left - (blk.w||120)/2);
      blk.y = Math.round(cy - r.top - 20);
      const firstId = sheetEl.querySelector('[data-block-id]')?.dataset.blockId;
      let to = firstId ? state.doc.findIndex(b => b.id === firstId) : state.doc.length;
      if(to < 0) to = state.doc.length;
      state.doc.splice(to, 0, blk);
    } else { state.doc.push(blk); }
  } else {
    if(!placingState.hasTarget){ cancelPlacing(); return; }
    const beforeId = placingState.beforeId;
    let to = beforeId == null ? state.doc.length : state.doc.findIndex(b => b.id === beforeId);
    if(to < 0) to = state.doc.length;
    state.doc.splice(to, 0, blk);
  }
  state.selectedId = blk.id;
  cleanupPlacing();
  markDirty(); render();
  H_toast('Bloc ajouté ✓');
}

function cancelPlacing(){ if(placingState) cleanupPlacing(); }

function cleanupPlacing(){
  if(!placingState) return;
  document.removeEventListener('mousemove', placingState.move);
  document.removeEventListener('mousedown', placingState.down, true);
  document.removeEventListener('keydown', placingState.key);
  if(placingState.label) placingState.label.remove();
  if(placingState.indicator) placingState.indicator.remove();
  document.body.classList.remove('placing-block');
  placingState = null;
}

/* toast accessible avant la définition de toast() (hoisting des function declarations) */
function H_toast(m){ try{ toast(m); }catch(e){} }

/* Élément décoratif : positionné en absolu, déplaçable / redimensionnable / pivotable */
function buildDecoEl(blk){
  const el = document.createElement('div');
  el.className = 'block blk-deco' + (state.selectedId===blk.id ? ' selected' : '');
  el.dataset.blockId = blk.id;
  el.style.left = (blk.x||40) + 'px';
  el.style.top = (blk.y||40) + 'px';
  el.style.width = (blk.w||120) + 'px';
  if(blk.rot) el.style.transform = 'rotate(' + blk.rot + 'deg)';
  el.innerHTML = renderBlockInner(blk);

  const controls = document.createElement('div');
  controls.className = 'deco-controls';
  controls.innerHTML = `
    <button class="rctrl del" data-act="del" title="Supprimer">✕</button>
    <button class="rctrl" data-act="img" title="Changer l'image">🖼</button>
    <button class="rctrl" data-act="rot" title="Pivoter">⟳</button>`;
  el.appendChild(controls);
  controls.addEventListener('mousedown', e=> e.stopPropagation());
  controls.addEventListener('click', (e)=>{
    const act = e.target.dataset.act; if(!act) return;
    e.stopPropagation();
    const idx = state.doc.findIndex(x=>x.id===blk.id); if(idx<0) return;
    if(act==='del'){ if(state.selectedId===blk.id) state.selectedId=null; state.doc.splice(idx,1); markDirty(); render(); toast('Déco supprimée','Annuler',undo); }
    if(act==='img'){ triggerImageUpload(blk.id,'img'); }
    if(act==='rot'){ blk.rot = ((blk.rot||0) + 15) % 360; el.style.transform='rotate('+blk.rot+'deg)'; markDirty(); }
  });

  el.addEventListener('mousedown', (e)=>{
    if(e.target.closest('.deco-controls') || e.target.closest('.deco-resize')) return;
    e.preventDefault();
    state.selectedId = blk.id;
    document.querySelectorAll('.blk-deco.selected').forEach(d=>d.classList.remove('selected'));
    el.classList.add('selected');
    const sx=e.clientX, sy=e.clientY, ox=blk.x||40, oy=blk.y||40;
    const move=(ev)=>{ blk.x = Math.round(ox + (ev.clientX-sx)); blk.y = Math.round(oy + (ev.clientY-sy)); el.style.left=blk.x+'px'; el.style.top=blk.y+'px'; };
    const up=()=>{ document.removeEventListener('mousemove',move); document.removeEventListener('mouseup',up); markDirty(); };
    document.addEventListener('mousemove',move); document.addEventListener('mouseup',up);
  });

  const handle = el.querySelector('.deco-resize');
  if(handle) handle.addEventListener('mousedown', (e)=>{
    e.preventDefault(); e.stopPropagation();
    const sx=e.clientX, ow=blk.w||120;
    const move=(ev)=>{ blk.w = Math.max(24, Math.round(ow + (ev.clientX-sx))); el.style.width=blk.w+'px'; };
    const up=()=>{ document.removeEventListener('mousemove',move); document.removeEventListener('mouseup',up); markDirty(); };
    document.addEventListener('mousemove',move); document.addEventListener('mouseup',up);
  });

  return el;
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

canvasWrap.addEventListener('keydown', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  if(e.key === 'Escape'){ e.preventDefault(); el.blur(); return; }
  if(e.key === 'Enter' && !MULTILINE_FIELDS.has(el.dataset.field)){
    e.preventDefault();
    el.blur();
  }
});

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
    pickerBackdrop.classList.remove('open');
    startPlacing(opt);
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

/* Mode aperçu propre (?print) : masque toute l'UI d'édition (comme l'export) */
if(/[?&]print\b/.test(location.search)) document.body.classList.add('exporting');

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
