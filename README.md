## MediTrack Core — Documentation Technique
1. Présentation du projet

MediTrack Core est une API back-end permettant la gestion complète des stocks hospitaliers, incluant :

Gestion des produits (PostgreSQL)

Gestion des mouvements (IN / OUT)

Gestion des zones internes des dépôts (MongoDB)

Authentification via JWT (sessions stateless)

Rôles utilisateurs : admin / user

Sécurisation des routes protégées

Documentation API avec Swagger

Ce document résume l’installation, la configuration, les routes disponibles et les tests (unitaires, intégration et charge).

2. Prérequis

Node.js 18+

PostgreSQL 14+

MongoDB 5+

Postman

JMeter (pour le test de charge)

Git

3. Installation
3.1 Cloner le projet
git clone https://github.com/**********/MediTrack-Core
cd MediTrack-Core

3.2 Installer les dépendances
npm install

3.3 Créer un fichier .env
PORT=3000

# PostgreSQL
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=motdepasse
PGDATABASE=gestion_stock
PGPORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/meditrack

# JWT
JWT_SECRET=Votre_Clé_JWT_Sécurisée
JWT_EXPIRES_IN=24h

4. Base de données
4.1 Script d'initialisation PostgreSQL (migration.sql)

Ce fichier doit être fourni dans le rendu final :

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE depots (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE produits (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    code VARCHAR(100),
    quantite INTEGER DEFAULT 0,
    depot_id INTEGER REFERENCES depots(id)
);

CREATE TABLE mouvements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) CHECK (type IN ('IN','OUT')),
    quantite INTEGER NOT NULL,
    produit_id INTEGER REFERENCES produits(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


MongoDB ne nécessite pas de création initiale (collections automatiques).

5. Lancement du serveur
npm run dev


URL du serveur :
http://localhost:3000

6. Documentation Swagger

Après lancement :

URL Swagger :
http://localhost:3000/api-docs

Votre projet contient au moins 4 endpoints documentés (exigence respectée).

7. Authentification
7.1 Register

POST /auth/register

Exemple body :
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
![alt text](/MediTrack-Core/src/tests/captures/register.png)

7.2 Login

POST /auth/login

Exemple retour :

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
![alt text](/MediTrack-Core/src/tests/captures/login.png)

Comment utiliser le token dans Postman

Dans l’onglet Headers :

Key	Value
Authorization	Bearer VOTRE_TOKEN_JWT
![alt text](/MediTrack-Core/src/tests/captures/produits.png)

8. Routes de l’API
8.1 Routes publiques
Méthode	Endpoint	Description
POST	/auth/register	Créer compte
POST	/auth/login	Connexion
8.2 Routes protégées (token obligatoire)
Produits
Méthode	Endpoint	Protection
GET	/api/produits	JWT
POST	/api/produits	JWT + ADMIN
Mouvements
Méthode	Endpoint	Protection
GET	/api/mouvements	JWT
POST	/api/mouvements	JWT
Dépôts / Zones
Méthode	Endpoint	Protection
GET	/api/depots/:id/zones	JWT
POST	/api/depots/:id/zones	JWT + ADMIN
PUT	/api/depots/:id/zones	JWT + ADMIN
9. Structure du projet
MediTrack-Core/
├─ node_modules/
├─ src/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ depotController.js
│  │  ├─ mouvementController.js
│  │  └─ produitController.js
│  ├─ middlewares/
│  │  ├─ authMiddleware.js
│  │  ├─ errorHandler.js
│  │  ├─ isAdmin.js
│  │  └─ loginLimiter.js
│  ├─ models/
│  │  └─ pgClient.js
│  ├─ mongo-models/
│  │  └─ Zone.js
│  ├─ postgres/
│  │  └─ migrations.sql
│  └─ routes/
│     ├─ auth.js
│     └─ index.js
├─ tests/
│  ├─ captures/
│  │  ├─ login.png
│  │  ├─ produits.png
│  │  └─ register.png
│  └─ units/
│     ├─ auth.test.js
│     ├─ mouvement.test.js
│     └─ produit.test.js
├─ .env
├─ .env.example
├─ .gitignore
├─ commits_log.txt
├─ package.json
├─ package-lock.json
├─ README.md
└─ server.js


10. Tests automatisés
10.1 Installation des outils de tests
npm install --save-dev jest supertest

Ajouter dans package.json
"scripts": {
  "test": "jest"
}

11. Tests unitaires (tests/unit/)
tests/unit/auth.test.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

test("Génération d’un token valide", () => {
    const token = jwt.sign({ id: 1, username: "test", role: "admin" }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.username).toBe("test");
});

tests/unit/produit.test.js
const produitController = require("../../src/controllers/produitController");

test("Le contrôleur list existe", () => {
    expect(produitController.list).toBeDefined();
});

tests/unit/mouvement.test.js
const mouvementController = require("../../src/controllers/mouvementController");

test("Le contrôleur mouvement.create existe", () => {
    expect(mouvementController.create).toBeDefined();
});

12. Tests d’intégration Postman

À fournir dans votre rendu :

Une collection Postman exportée :
tests/integration/MediTrack.postman_collection.json

Captures d’écran :

Register OK

Login OK → montre le token

GET /api/produits → fonctionne avec token

POST /api/produits → fonctionne en admin

13. Test de charge (JMeter)

Fichier recommandé :
tests/load/meditrack_load_test.jmx

Plan de test à inclure :

Thread Group : 50 utilisateurs simultanés

Ramp-up : 5 secondes

Endpoint testé :
GET http://localhost:3000/api/produits

Critères attendus :

95% des requêtes < 200 ms

0% d’erreurs HTTP

Il suffit d’importer votre .jmx dans JMeter et d’exécuter.

14. Commandes utiles
Lancer le projet
npm run dev

Lancer les tests unitaires
npm test

Sauvegarde automatique PostgreSQL
pg_dump -U postgres gestion_stock > backups/backup_$(date +%F).sql


Fréquence recommandée :
1 backup/jour