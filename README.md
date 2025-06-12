# Le Moderne - Restaurant avec Système de Réservation

Bienvenue chez **Le Moderne**, un restaurant gastronomique d'exception situé au cœur de Paris avec un système complet de réservation en ligne et panel d'administration.

## 🚀 Fonctionnalités

### 💼 Panel d'Administration

- **Dashboard complet** - Gestion de toutes les réservations
- **Authentification sécurisée** - Connexion avec identifiants
- **Gestion des statuts** - Confirmer/Annuler les réservations
- **Statistiques en temps réel** - Vue d'ensemble des réservations
- **Changement de mot de passe** - Sécurité renforcée

### 📝 Système de Réservation

- **Formulaire en ligne** - Interface moderne et intuitive
- **Validation en temps réel** - Contrôles de saisie
- **Gestion des demandes spéciales** - Notes personnalisées
- **Interface multilingue** - Entièrement en français

### 🗄️ Base de Données

- **PostgreSQL NEON** - Base de données relationnelle sécurisée
- **Chiffrement des mots de passe** - Sécurité renforcée avec bcrypt
- **Connexions SSL** - Communications sécurisées

## 🛠️ Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Base de données PostgreSQL

### 1. Cloner le projet

```bash
git clone https://github.com/your-username/resto-parisien.git
cd resto-parisien
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

```bash
cp .env.example .env.local
```

Remplissez les variables d'environnement dans `.env.local`

### 4. Configuration de la base de données

```bash
npm run init-db
```

### 5. Créer un administrateur

```bash
npm run create-admin
```

### 6. Démarrage du serveur de développement

```bash
npm run dev
```

## 🔐 Sécurité

⚠️ **IMPORTANT**: Pour des raisons de sécurité, les données sensibles ont été supprimées du code source.

### Configuration requise:

1. **Variables d'environnement** - Configurez `.env.local` avec vos propres valeurs
2. **NEXTAUTH_SECRET** - Générez une clé secrète forte
3. **Mots de passe** - Utilisez des mots de passe sécurisés pour l'admin
4. **Base de données** - Configurez votre propre instance PostgreSQL

### Commandes de sécurité:

```bash
# Audit de sécurité
npm run security-audit

# Correction automatique des vulnérabilités
npm run security-fix
```

Consultez `SECURITY.md` pour plus de détails sur la sécurité.

## 🚀 Déploiement

Consultez `DEPLOYMENT.md` pour les instructions complètes de déploiement.

### Déploiement rapide sur Vercel:

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

## 🎯 Accès

## 📱 Pages Utilisateur

- **Accueil**: http://localhost:3000
- **Réservation**: http://localhost:3000/reservation
- **Menu**: http://localhost:3000/menu
- **Contact**: http://localhost:3000/contact

## 🎨 Design & Concept

**Le Moderne** se distingue par :

- **Design Unique** : Interface moderne avec une palette de couleurs sophistiquée (tons chauds dorés, charbon élégant, crème raffinée)
- **Typographie Premium** : Combinaison de Playfair Display (titres) et Inter (texte) pour une élégance parisienne
- **UX Contemporaine** : Navigation intuitive avec animations fluides et effets de verre
- **Responsive Design** : Expérience optimale sur tous les appareils

## 🚀 Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Tailwind CSS** - Framework CSS utilitaire avec configuration personnalisée
- **Lucide React** - Icônes modernes et élégantes

## 📋 Fonctionnalités

### 🏠 Page d'Accueil

- Hero section avec badges de reconnaissance (Guide Michelin, Gault & Millau)
- Section "À Propos" avec nos valeurs
- Informations pratiques (horaires, adresse, contact)

### 🍽️ Notre Carte

- **Entrées** : Tartare de Saint-Jacques, Foie Gras Mi-Cuit, Velouté Truffe...
- **Plats Principaux** : Homard Bleu, Côte de Bœuf Maturée, Turbot Sauvage...
- **Desserts** : Soufflé au Grand Marnier, Moelleux Valrhona...
- Menu dégustation 7 services avec accords mets et vins
- Plats signature du chef mis en valeur

### 📞 Contact & Réservation

- Formulaire de réservation interactif
- Informations complètes (adresse, téléphone, horaires)
- Notes importantes (allergies, privatisation, menus spéciaux)

## 🛠️ Installation

1. **Cloner le projet**

   ```bash
   git clone [url-du-repo]
   cd restaurant-parisien
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🎨 Palette de Couleurs

- **Primary** : Tons chauds dorés (#d97d34 - #6b371f)
- **Charcoal** : Nuances de gris élégants (#2d2d2d - #f6f6f6)
- **Cream** : Fond doux (#fdf7f0)
- **Gold** : Accents dorés (#d4af37)

## 📱 Pages

- `/` - Page d'accueil avec hero et informations
- `/menu` - Carte gastronomique complète
- `/contact` - Formulaire de réservation et coordonnées
