# MediTrack Core

## Auteur
Samah Ghalloussi

## Description
MediTrack Core est une API Back-End pour la gestion des dépôts hospitaliers.  
Elle centralise les **produits**, les **mouvements de stock** et la **cartographie interne des dépôts**.  
Le projet utilise **Node.js**, **Express**, **PostgreSQL** pour les données relationnelles et **MongoDB** pour la cartographie.

---

## Prérequis
- Node.js >= 18
- PostgreSQL installé et en fonctionnement
- MongoDB installé et en fonctionnement (MongoDB Compass ou service local)
- Postman pour tester les endpoints

---

## Installation

1. Cloner le projet
```bash
git clone https://github.com/ShamanK93/MediTrack-Core
cd MediTrack-Core
Installer les dépendances

bash
Copier le code
npm install
Créer un fichier .env à la racine du projet :

env
Copier le code
# Serveur
PORT=3000

# PostgreSQL
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=<votre_mot_de_passe>
PGDATABASE=gestion_stock
PGPORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/meditrack
Lancer PostgreSQL et MongoDB (via pgAdmin et MongoDB Compass ou services locaux)

Lancer le serveur

bash
Copier le code
npm run dev
Le serveur tourne sur le port défini dans .env (par défaut : 3000)

Vérification : http://localhost:3000/ renvoie :

json
Copier le code
{
  "status": "ok",
  "message": "MediTrack API running",
  "routes": ["/api"]
}
Structure du projet
bash
Copier le code
MediTrack-Core/
├─ src/
│  ├─ controllers/     # Logique des routes
│  ├─ models/          # Modèles PostgreSQL et MongoDB
│  ├─ routes/          # Définition des endpoints
│  └─ middlewares/     # Gestion des erreurs, logs, etc.
├─ .env
├─ package.json
├─ server.js
└─ README.md
Routes principales
Produits (PostgreSQL)
Méthode	Endpoint	Description
GET	/api/produits	Liste tous les produits
POST	/api/produits	Ajouter un produit
PUT	/api/produits/:id	Mettre à jour un produit
DELETE	/api/produits/:id	Supprimer un produit

Zones (MongoDB)
Méthode	Endpoint	Description
GET	/api/depots/:id/zones	Récupérer la structure d’un dépôt
POST	/api/depots/:id/zones	Créer des zones pour un dépôt
PUT	/api/depots/:id/zones	Mettre à jour les zones d’un dépôt

Mouvements (PostgreSQL)
Méthode	Endpoint	Description
GET	/api/mouvements	Liste tous les mouvements
POST	/api/mouvements	Enregistre un mouvement et met à jour le stock

Test des endpoints
Utiliser Postman pour tester les routes :

Exemple POST produit :

bash
Copier le code
POST http://localhost:3000/api/produits
Body (raw JSON):
{
  "nom": "Paracetamol",
  "code": "P001",
  "quantite": 100,
  "depot_id": 1
}
Exemple POST zones :

bash
Copier le code
POST http://localhost:3000/api/depots/1/zones
Body (raw JSON):
{
  "zones": [
    { "nom": "Zone A", "bac": "A1" },
    { "nom": "Zone B", "bac": "B1" }
  ]
}
Exemple POST mouvement :

bash
Copier le code
POST http://localhost:3000/api/mouvements
Body (raw JSON):
{
  "produit_id": 1,
  "type": "IN",
  "quantite": 50
}
Notes
Les réponses de toutes les routes sont en JSON :

json
Copier le code
{
  "status": "success",
  "data": {...}
}
Les erreurs sont loggées côté serveur avec console.error() et renvoyées en JSON.

