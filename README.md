# VIKTO LABS CAFÉ

Éditeur de carte pour café / brunch.

Édition directe sur la carte, PDF vectoriel prêt pour l'imprimeur, versions horodatées dans le cloud.
Dépliant **3 volets** (2 planches paysage), entièrement éditable.
Application web statique, sans build ni serveur : elle s'héberge telle quelle sur **GitHub Pages**.

## Ce que fait le site

- **Édition en direct** : cliquez sur n'importe quel texte de la carte pour le modifier. Ajoutez des blocs (sections, plats, formules, notes, séparateurs, **nouvelle colonne / volet**, nouvelle planche). Blocs spéciaux : panneau visuel (nom éditable), cadre « Brunch », pastille « Menu Enfant ».
- **Outils de ligne** (comme l'éditeur de La Coursive) : au survol d'une ligne, une barre s'affiche juste à côté de ses textes, dans le blanc avant le prix (au-dessus de la ligne quand la place manque) : ✕ supprimer · ⧉ dupliquer · ↑ ↓ monter / descendre (y compris vers le volet voisin) · 👁 masquer (la ligne reste dans l'éditeur, badge « Masqué », mais disparaît du PDF) · 🏷 pictos végétarien / sans gluten (un clic fait défiler : aucun → V → SG → V + SG).
- **Apparence** (🎨) : polices et couleurs de la carte (vert forêt / crème par défaut).
- **Enregistrement cloud** (💾) : chaque enregistrement crée une **version horodatée** stockée dans ce dépôt (dossier `versions/`), sans jamais écraser les précédentes. La plus récente se recharge automatiquement à l'ouverture.
- **Versions** (🕑) : consulter, charger ou supprimer les versions enregistrées.
- **Export PDF** (⬇️) : une planche paysage (3 volets) par page.
- **Brouillon local** de sécurité (auto-sauvegarde dans le navigateur).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page + fenêtres modales |
| `styles.css` | Thème (couleurs, mise en page paysage 3 volets) |
| `app.js` | Modèle de données, contenu par défaut de la carte, rendu, édition |
| `storage.js` | Sauvegarde des versions dans le dépôt via l'API GitHub |
| `pdf-export.js` | Export PDF paysage (html2canvas + jsPDF) |
| `assets/logo.png` | Panneau vert botanique + nom éditable (volet 3, planche 1) |
| `assets/brunch.png` | Cadre botanique du « Brunch » |
| `assets/enfant.png` | Pastille botanique « Menu Enfant » (symétrique) |
| `versions/` | Versions enregistrées de la carte (`.json`) |

## Activer l'enregistrement sur un ordinateur

La lecture est publique (aucun réglage). Pour **enregistrer** depuis un poste :

1. Créez un jeton GitHub *fine-grained* limité au dépôt `vikto-labs-cafe`, permission **Contents : Read and write**.
2. Dans le site : ⚙️ → collez le jeton. (Ou utilisez le « lien magique » pour vos autres postes.)

Le jeton n'est stocké que dans le navigateur de ce poste.

## Développement local

```sh
python3 -m http.server 8765
# puis ouvrir http://localhost:8765
```
