// produitController.js
// Contrôleur pour gérer les produits (PostgreSQL)

// Import du pool PostgreSQL pour exécuter les requêtes SQL
const pool = require('../models/pgClient');

// Liste tous les produits
exports.list = async (req, res) => {
  try {
    // Requête SQL pour récupérer tous les produits, triés par id
    const { rows } = await pool.query('SELECT * FROM produits ORDER BY id');
    
    // Retourne les produits sous forme de JSON
    res.json(rows);
  } catch (err) {
    // Log côté serveur
    console.error(err);
    // Retourne une réponse JSON d'erreur
    res.status(500).json({ error: 'Erreur récupération produits' });
  }
};

// Créer un nouveau produit
exports.create = async (req, res) => {
  // Récupération des données depuis le corps de la requête
  const { nom, code, quantite, depot_id } = req.body;

  try {
    // Insertion du produit dans la table "produits"
    // RETURNING * permet de récupérer le produit créé
    const { rows } = await pool.query(
      'INSERT INTO produits (nom, code, quantite, depot_id) VALUES ($1,$2,$3,$4) RETURNING *',
      [nom, code, quantite, depot_id]
    );

    // Retourne le produit créé
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur création produit' });
  }
};

// Mettre à jour un produit existant
exports.update = async (req, res) => {
  const { id } = req.params; // Récupération de l'id du produit depuis l'URL
  const { nom, code, quantite, depot_id } = req.body; // Nouvelles valeurs

  try {
    // Mise à jour du produit dans la table "produits"
    // RETURNING * renvoie le produit mis à jour
    const { rows } = await pool.query(
      'UPDATE produits SET nom=$1, code=$2, quantite=$3, depot_id=$4 WHERE id=$5 RETURNING *',
      [nom, code, quantite, depot_id, id]
    );

    // Retourne le produit mis à jour
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour produit' });
  }
};

// Supprimer un produit
exports.remove = async (req, res) => {
  const { id } = req.params; // Récupération de l'id du produit depuis l'URL

  try {
    // Suppression du produit dans la table "produits"
    await pool.query('DELETE FROM produits WHERE id=$1', [id]);

    // Retourne un message de confirmation
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur suppression produit' });
  }
};
