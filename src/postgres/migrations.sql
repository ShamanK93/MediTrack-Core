-- =============================
-- migration.sql pour MediTrack
-- =============================

-- Création de la base (à exécuter seulement si elle n'existe pas)
-- CREATE DATABASE gestion_stock;

-- -----------------------------
-- Table depots
-- -----------------------------
CREATE TABLE IF NOT EXISTS depots (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255)
);

-- -----------------------------
-- Table produits
-- -----------------------------
CREATE TABLE IF NOT EXISTS produits (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    quantite INT DEFAULT 0 CHECK (quantite >= 0),
    depot_id INT REFERENCES depots(id) ON DELETE CASCADE
);

-- -----------------------------
-- Table mouvements
-- -----------------------------
CREATE TABLE IF NOT EXISTS mouvements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(3) NOT NULL CHECK (type IN ('IN','OUT')),
    quantite INT NOT NULL CHECK (quantite > 0),
    produit_id INT REFERENCES produits(id) ON DELETE CASCADE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------
-- Optionnel : Insertions d'exemple
-- -----------------------------
-- INSERT INTO depots (nom, adresse) VALUES ('Depot Central', '123 Rue Principale');
-- INSERT INTO produits (nom, code, quantite, depot_id) VALUES ('Paracetamol', 'P001', 100, 1);
