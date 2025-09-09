# OptiAcad - Système de Gestion Académique

Un système complet de gestion académique développé avec Next.js, Material-UI, et PrimeReact.

## 🚀 Technologies Utilisées

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Libraries**: Material-UI, PrimeReact, PrimeIcons
- **State Management**: Redux Toolkit, React Query
- **Cartographie**: Mapbox GL
- **Internationalisation**: React-i18next
- **Styling**: Tailwind CSS, CSS Modules
- **Polices**: Google Fonts (Bubblegum Sans, Josefin Sans, Lobster, Playball, Roboto, Viga)

## 🎨 Thème et Design

### Couleurs

- **Fond principal**: `#00070F` (très sombre)
- **Cartes**: `#181F27` (gris sombre)
- **Bleu sombre**: `#000C18`
- **Gris sombre**: `#343A40`
- **Gris clair**: `#F8F9FA`
- **Texte**: `#ededed` (clair)

### Polices

- **Bubblegum Sans**: Titres ludiques
- **Josefin Sans**: Texte principal (100-700, normal/italic)
- **Lobster**: Éléments décoratifs
- **Playball**: Signatures
- **Roboto**: Interface utilisateur (100-900, normal/italic)
- **Viga**: Titres secondaires

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (auth)/                    # Module d'authentification
│   │   ├── layout.tsx            # Layout pour les pages d'auth
│   │   ├── login/page.tsx        # Page de connexion
│   │   └── register/page.tsx     # Page d'inscription
│   │
│   ├── dashboard/                 # Dashboard principal
│   │   ├── layout.tsx            # Layout avec navigation
│   │   ├── page.tsx              # Page d'accueil dashboard
│   │   ├── students/page.tsx     # ModuleStudentManager
│   │   ├── staff/page.tsx        # StaffManagement
│   │   ├── attendance/page.tsx   # StaffQrAttendance
│   │   ├── ratings/page.tsx      # TeacherRatingModule
│   │   └── archives/page.tsx     # ArchiveModule
│   │
│   ├── globals.css               # Styles globaux
│   ├── layout.tsx                # Layout racine
│   └── page.tsx                  # Page d'accueil
│
├── lib/                          # Utilitaires et configurations
└── components/                   # Composants réutilisables
```

## 🏗️ Modules Principaux

### 1. **Auth Module** - Authentification

- **Route**: `/login`, `/register`
- **Fonctionnalités**: Connexion, inscription, gestion des sessions
- **Technologies**: Material-UI, Formulaires

### 2. **ModuleStudentManager** - Gestion des Étudiants

- **Route**: `/dashboard/students`
- **Fonctionnalités**:
  - Liste des étudiants avec recherche
  - Ajout/modification/suppression d'étudiants
  - Suivi des présences
  - Gestion des classes

### 3. **StaffManagement** - Gestion du Personnel

- **Route**: `/dashboard/staff`
- **Fonctionnalités**:
  - Gestion des enseignants et administrateurs
  - Profils détaillés avec avatars
  - Filtrage par département et rôle
  - Statuts (Actif, Congé, Inactif)

### 4. **StaffQrAttendance** - Présence QR

- **Route**: `/dashboard/attendance`
- **Fonctionnalités**:
  - Génération de codes QR pour les cours
  - Suivi des présences en temps réel
  - Statistiques de présence
  - Export des données

### 5. **TeacherRatingModule** - Évaluation des Enseignants

- **Route**: `/dashboard/ratings`
- **Fonctionnalités**:
  - Système d'évaluation par étoiles
  - Tendances d'amélioration
  - Statistiques globales
  - Détails par enseignant

### 6. **ArchiveModule** - Archives

- **Route**: `/dashboard/archives`
- **Fonctionnalités**:
  - Stockage et organisation des documents
  - Filtrage par type et catégorie
  - Recherche avancée
  - Export des archives

## 🎯 Fonctionnalités Clés

### Dashboard Principal

- **Statistiques en temps réel**
- **Navigation intuitive** avec sidebar
- **Interface responsive** (mobile/desktop)
- **Thème sombre** par défaut

### Interface Utilisateur

- **Material-UI** pour les composants principaux
- **PrimeReact** pour les composants avancés
- **Design system** cohérent
- **Animations** et transitions fluides

### Gestion d'État

- **Redux Toolkit** pour l'état global
- **React Query** pour la gestion des données
- **Cache intelligent** et synchronisation

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build

# Démarrage en production
npm start
```

## 📦 Dépendances Principales

```json
{
  "@mui/material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "@mui/icons-material": "^5.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "@tanstack/react-query": "^5.x",
  "primevue": "^3.x",
  "primeicons": "^6.x",
  "mapbox-gl": "^3.x",
  "react-i18next": "^14.x",
  "i18next": "^23.x"
}
```

## 🌐 Internationalisation

- **Français** (par défaut)
- **Anglais** (support complet)
- **Détection automatique** de la langue
- **Traductions** pour tous les modules

## 🗺️ Cartographie

- **Mapbox GL** pour l'intégration cartographique
- **Géolocalisation** des établissements
- **Visualisation** des données spatiales

## 🔧 Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=your_api_url
```

### Configuration Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "dark-blue": "var(--dark-blue)",
        "dark-gray": "var(--dark-gray)",
        "light-gray": "var(--light-gray)",
      },
      fontFamily: {
        bubblegum: "var(--font-bubblegum-sans)",
        josefin: "var(--font-josefin-sans)",
        lobster: "var(--font-lobster)",
        playball: "var(--font-playball)",
        roboto: "var(--font-roboto)",
        viga: "var(--font-viga)",
      },
    },
  },
  plugins: [],
};
```

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints** optimisés
- **Navigation** adaptative
- **Composants** flexibles

## 🔒 Sécurité

- **Authentification** sécurisée
- **Validation** des formulaires
- **Protection** des routes
- **Gestion** des permissions

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm run build
vercel --prod
```

### Autres Plateformes

- **Netlify**
- **AWS Amplify**
- **Docker** support

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :

- **Email**: support@optiacad.com
- **Documentation**: [docs.optiacad.com](https://docs.optiacad.com)
- **Issues**: [GitHub Issues](https://github.com/optiacad/issues)

---

**OptiAcad** - Optimiser l'éducation, un module à la fois. 🎓
