# 🌍 Multiplayer Strategy Game

✍️ **Une note sur l'usage de l'IA**

**Aucune IA n'a été utilisée pour générer du code. Cela vaut pour les projets passés et ceux à venir tout au long de mon apprentissage.** Mon usage de l'IA est strictement pédagogique. Je m'en sers pour comprendre des concepts et me pousser à réfléchir, jamais pour produire des solutions toutes faites.

---

## Un jeu de stratégie multijoueur, jouable dans le navigateur, inspiré de jeux comme _OpenFront.io_.

Ce projet est développé en autodidacte dans le cadre de ma montée en compétences full-stack. Il me sert de fil rouge pour apprendre le développement web de bout en bout : du rendu côté client jusqu'à la persistance en base de données, en passant par une API et un système d'authentification complet.

--

## 🚧 État du projet

**En développement actif.** Le socle technique est en place puisque le projet dispose d'un front interactif, d'un back-end structuré avec une API, et d'un système d'authentification fonctionnel connecté à une base de données PostgreSQL. La logique de jeu constitue la prochaine grande étape.

---

## ✅ Fonctionnalités actuelles

**Authentification**

- Inscription (`/signup`) avec hachage des mots de passe via **bcrypt**
- Connexion (`/login`) avec vérification sécurisée et émission d'un **JSON Web Token (JWT)**
- Stockage du jeton côté client pour maintenir la session
- Requêtes SQL **paramétrées** pour se protéger des injections SQL
- Gestion des erreurs et codes de statut HTTP appropriés

**Interface**

- Navigation entre les vues (menu, connexion, inscription).
- Communication client à serveur en **JSON** via l'API`fetch`
- Formulaires connectés au back-end

**Back-end & données**

- API construite avec **Express**
- Connexion à **PostgreSQL** via une pool de connexions
- Configuration des secrets par variables d'environnement (`.env`)
- Gestion du **CORS** pour les échanges cross-origin

---

## 🛠 Stack technique

### Front-end

- **HTML / CSS / JavaScript vanilla** (ES Modules)
- **Pico.css** — framework CSS minimaliste
- **PixiJS** — rendu 2D (prévu pour l'affichage de la carte de jeu)

### Back-end

- **Node.js** + **Express**
- **node-postgres (pg)** — driver PostgreSQL
- **bcrypt** — pour le hash des mots de passe
- **jsonwebtoken** — authentification par jetons
- **cors** - gestion des origines croisées

### Base de données

- **PostgreSQL**

---

Le projet sépare le **client** du **serveur** :

- le **client** ne communique jamais directement avec la base de données ;
- il envoie des requêtes à l'**API** (serveur Express) ;
- le **serveur** est seul à dialoguer avec PostgreSQL.

---

### 🎯 MVP

L'ambition immédiate est un premier jeu jouable et démontrable :

- [x] Système d'authentification (inscription / connexion)
- [ ] Protection des routes par un middleware JWT
- [ ] Création et gestion de salons de jeu
- [ ] Affichage de la carte interactive avec PixiJS
- [ ] Logique du jeu (initialisation de la partie, création d'unités, déplacements ...)
- [ ] Synchronisation de l'état de partie entre joueurs

### 🚀 Vision à long terme

À terme, le projet vise une architecture de jeu multijoueur :

- Détection de désynchronisation
- Communication temps réel
- IA de jeu fondée sur des fonctions de score d'utilité et s'exécutant comme un joueur virtuel

---

## 📚 Notes d'apprentissage

Ce projet est avant tout un support d'apprentissage. Il m'a permis d'aborder en profondeur, entre autres :

- le modèle **client-serveur** et le protocole **HTTP** (méthodes, statuts, headers, body) ;
- la construction d'une **API** avec Express (routing, middlewares) ;
- la **sérialisation / désérialisation** des données (JSON) au cœur des échanges réseau ;
- la sécurité web avec le **hachage** de mots de passe, **requêtes paramétrées**, **CORS**, **variables d'environnement**, authentification par **JWT** ;
- le **modèle relationnel** et le langage **SQL** (schéma, contraintes, CRUD) ;
- la connexion d'une application Node.js à **PostgreSQL** ;
- la gestion de l'**asynchronisme** en JavaScript (`async` / `await`, `try` / `catch`).

---

_Ce projet est développé par [thomastbl](https://github.com/thomastbl)._
