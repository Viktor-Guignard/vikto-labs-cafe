# VIKTO LABS Café — éditeur de carte (démo)

**Site : https://viktor-guignard.github.io/vikto-labs-cafe/** — c'est la démo intégrée à [vikto-labs.fr](https://vikto-labs.fr).

Même moteur, mêmes fonctions et même disposition que l'éditeur livré aux restaurants (La Coursive des Alpes) :

- **Onglets** : une carte indépendante par onglet (Carte, Brunch, Desserts, Boissons, Vins & apéro), chacune avec son format, ses couleurs, ses versions et son PDF.
- **Cliquer sur un texte** pour l'éditer directement (Entrée ou clic ailleurs pour valider).
- **✕ au bout de chaque ligne** pour supprimer (avec « Annuler » pendant 6 s) ; au survol : **⧉ ↑ ↓** dupliquer, monter, descendre, **👁 masquer** temporairement (rupture), **🏷 pictogramme** (végétarien / spécialité).
- **+ Ajouter un bloc** : blocs adaptés à chaque carte (section, plat, sous-titre, formule, note, image, saut de page).
- **🎨 Apparence** : polices, couleurs, format de page (A4, A4 paysage, carte haute 14×34, A5), marges, miroir, thème « Vigne », pointillés, filets, espacement.
- **⬇️ PDF**, **💾 Enregistrer**, **🕑 Versions**, **↶ / ↷**, brouillon local de sécurité.
- **📱 Publier / QR** : choisir les cartes visibles par les clients ; le QR de table pointe vers `carte.html`, la page publique.
- **🎓 Tuto** (démonstrations animées) et **?** (aide).

## Différences avec l'éditeur d'un restaurant

- Contenu fictif (`versions/<carte>/…json`, `published.json`) et visuels propres à la démo (`assets/badge.png`, `assets/qr.png`).
- Clés de stockage préfixées `vlcafe_` : la démo partage le domaine `viktor-guignard.github.io` avec les éditeurs des restaurants, il ne faut pas que brouillons et jetons se mélangent.
- Sans jeton, la démo est en lecture seule côté cloud : on peut tout modifier à l'écran, pas enregistrer ni publier.

## Technique

Site 100 % statique (HTML/CSS/JS, aucun build), hébergé sur GitHub Pages. Versions en JSON dans `versions/` via l'API GitHub Contents (lecture publique, écriture par jeton *fine-grained* limité à ce dépôt).

Développement local : `python3 -m http.server 8000` puis `http://localhost:8000` (la liste des versions lit le dépôt GitHub distant).
