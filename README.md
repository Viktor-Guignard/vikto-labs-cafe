# DS Café — Éditeur de carte

Éditeur de carte en ligne pour **DS Café** (menu Été 2026, Reims).
Application web statique, sans build ni serveur : elle s'héberge telle quelle sur **GitHub Pages**.

## Ce que fait le site

- **Édition en direct** : cliquez sur n'importe quel texte de la carte pour le modifier. Ajoutez, dupliquez, déplacez ou supprimez des blocs (sections, plats, formules, notes, séparateurs, sauts de page).
- **Apparence** (🎨) : polices et couleurs de la carte (vert forêt DS Café / crème par défaut).
- **Enregistrement cloud** (💾) : chaque enregistrement crée une **version horodatée** stockée dans ce dépôt (dossier `versions/`), sans jamais écraser les précédentes. La plus récente se recharge automatiquement à l'ouverture.
- **Versions** (🕑) : consulter, charger ou supprimer les versions enregistrées.
- **Export PDF** (⬇️) : une page A4 par « page » de la carte.
- **Brouillon local** de sécurité (auto-sauvegarde dans le navigateur).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page + fenêtres modales |
| `styles.css` | Thème DS Café (couleurs, mise en page A4) |
| `app.js` | Modèle de données, contenu par défaut de la carte, rendu, édition |
| `storage.js` | Sauvegarde des versions dans le dépôt via l'API GitHub |
| `pdf-export.js` | Export PDF (html2canvas + jsPDF) |
| `assets/logo.png` | Visuel du panneau vert DS Café (en-tête) |
| `versions/` | Versions enregistrées de la carte (`.json`) |

## Activer l'enregistrement sur un ordinateur

La lecture est publique (aucun réglage). Pour **enregistrer** depuis un poste :

1. Créez un jeton GitHub *fine-grained* limité au dépôt `ds-cafe-carte`, permission **Contents : Read and write**.
2. Dans le site : ⚙️ → collez le jeton. (Ou utilisez le « lien magique » pour vos autres postes.)

Le jeton n'est stocké que dans le navigateur de ce poste.

## Développement local

```sh
python3 -m http.server 8765
# puis ouvrir http://localhost:8765
```
