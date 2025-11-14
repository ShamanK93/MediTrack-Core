// mouvementController.js
// Contrôleur pour gérer les mouvements de stock (PostgreSQL)

// Import du pool PostgreSQL pour exécuter les requêtes SQL
const pool = require('../models/pgClient');

// Liste tous les mouvements
exports.list = async (req, res) => {
  try {
    // Requête SQL pour récupérer tous les mouvements, triés par date décroissante
    const { rows } = await pool.query('SELECT * FROM mouvements ORDER BY date DESC');
    
    // Retourne les mouvements sous forme de JSON
    res.json(rows);
  } catch (err) {
    // Log côté serveur en cas d'erreur
    console.error(err);
    // Retour d'une réponse JSON d'erreur
    res.status(500).json({ error: 'Erreur récupération mouvements' });
  }
};

// Créer un mouvement et mettre à jour le stock du produit
exports.create = async (req, res) => {
  // Récupération des données depuis le corps de la requête
  const { type, quantite, produit_id } = req.body;

  try {
    // Démarrage d'une transaction PostgreSQL
    await pool.query('BEGIN');

    // Insertion du mouvement dans la table "mouvements"
    // RETURNING * permet de récupérer le mouvement créé
    const { rows } = await pool.query(
      'INSERT INTO mouvements (type, quantite, produit_id) VALUES ($1,$2,$3) RETURNING *',
      [type, quantite, produit_id]
    );

    // Récupération de la quantité actuelle du produit
    const prod = await pool.query('SELECT quantite FROM produits WHERE id=$1', [produit_id]);
    let newQty = prod.rows[0].quantite;

    // Mise à jour de la quantité selon le type du mouvement
    // 'IN' = ajout au stock, 'OUT' = retrait du stock
    newQty += type === 'IN' ? quantite : -quantite;

    // Mise à jour de la table produits avec la nouvelle quantité
    await pool.query('UPDATE produits SET quantite=$1 WHERE id=$2', [newQty, produit_id]);

    // Validation de la transaction
    await pool.query('COMMIT');

    // Retourne le mouvement créé
    res.status(201).json(rows[0]);
  } catch (err) {
    // Annule la transaction en cas d'erreur
    await pool.query('ROLLBACK');
    console.error(err);
    // Retourne une réponse JSON d'erreur
    res.status(500).json({ error: 'Erreur création mouvement' });
  }
};
