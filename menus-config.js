/* Configuration partagée des cartes de VIKTO LABS Café (démo).
   Même moteur que l'éditeur de La Coursive : onglets de l'éditeur, page Publier et page publique.
   (Les noms COURSIVE_* sont gardés tels quels pour que le moteur reste identique.) */
window.COURSIVE_MENUS = [
  { key: 'carte',    label: 'Carte',        hint: 'Cuisine',            slug: 'carte' },
  { key: 'brunch',   label: 'Brunch',       hint: 'Week-end',           slug: 'brunch' },
  { key: 'desserts', label: 'Desserts',     hint: 'Maison',             slug: 'desserts' },
  { key: 'boissons', label: 'Boissons',     hint: 'Chaudes & fraîches', slug: 'boissons' },
  { key: 'vins',     label: 'Vins & apéro', hint: '',                   slug: 'vins-apero' },
];
window.COURSIVE_PUBLIC_URL = 'https://viktor-guignard.github.io/vikto-labs-cafe/carte.html';

window.currentMenuKey = function () {
  const k = new URLSearchParams(location.search).get('menu');
  return window.COURSIVE_MENUS.some(m => m.key === k) ? k : 'carte';
};
window.currentMenuLabel = function () {
  const k = window.currentMenuKey();
  const m = window.COURSIVE_MENUS.find(x => x.key === k);
  return m ? m.label : k;
};
window.menuSlug = function (key) {
  const m = window.COURSIVE_MENUS.find(x => x.key === key);
  return (m && m.slug) || key || 'carte';
};
window.currentMenuSlug = function () { return window.menuSlug(window.currentMenuKey()); };

/* Blocs proposés par « + Ajouter un bloc », adaptés à chaque carte. */
window.MENU_BLOCK_PRESETS = {
  carte:    ['section', 'item', 'note', 'image', 'formule', 'pagebreak'],
  brunch:   ['section', 'item', 'formule', 'note', 'image', 'pagebreak'],
  desserts: ['section', 'item', 'note', 'image', 'pagebreak'],
  boissons: ['section', 'formule-heading', 'item', 'note', 'pagebreak'],
  vins:     ['section', 'formule-heading', 'item', 'note', 'pagebreak'],
};
