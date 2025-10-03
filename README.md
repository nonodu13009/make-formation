# Make Formation - Notes

Application moderne de prise de notes pour la formation Make, inspirée de bolt.new.

## 🚀 Fonctionnalités

- **Interface moderne** : Design glassmorphism avec animations fluides
- **Prise de notes en temps réel** : Sauvegarde automatique en local
- **Support Markdown** : Édition et aperçu en Markdown
- **Recherche** : Recherche instantanée dans toutes les notes
- **Export** : Téléchargement des notes en format Markdown
- **Responsive** : Interface adaptée à tous les écrans

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **React Markdown** - Rendu Markdown
- **Local Storage** - Persistance des données

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/nonodu13009/make-formation.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🎯 Utilisation

1. **Créer une note** : Cliquez sur "Nouvelle note" dans la sidebar
2. **Éditer** : Tapez directement dans l'éditeur
3. **Aperçu** : Cliquez sur l'icône "œil" pour voir le rendu Markdown
4. **Rechercher** : Utilisez la barre de recherche dans la sidebar
5. **Sauvegarder** : Cmd/Ctrl + S ou cliquez sur l'icône de sauvegarde
6. **Exporter** : Cliquez sur l'icône de téléchargement

## ⌨️ Raccourcis clavier

- `Cmd/Ctrl + S` : Sauvegarder la note
- `Tab` : Indenter dans l'éditeur

## 🎨 Personnalisation

Le design utilise un système de couleurs purple/pink avec des effets glassmorphism. Vous pouvez modifier les couleurs dans :

- `src/app/globals.css` : Variables CSS et animations
- `tailwind.config.js` : Configuration Tailwind
- `src/components/` : Composants individuels

## 📱 Responsive

L'application est entièrement responsive avec :
- Sidebar rétractable sur mobile
- Interface adaptée aux petits écrans
- Touch-friendly sur tablettes

## 🔒 Données

Toutes les notes sont stockées localement dans le navigateur (Local Storage). Aucune donnée n'est envoyée vers des serveurs externes.

## 🚀 Déploiement

```bash
# Build de production
npm run build

# Démarrer en production
npm start
```

## 📝 Formation Make

Cette application est conçue pour accompagner votre formation Make sur Udemy. Utilisez-la pour :

- Prendre des notes pendant les cours
- Documenter vos workflows Make
- Organiser vos intégrations
- Sauvegarder vos configurations

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.