const pool = require('../models/pgClient');

exports.list = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM mouvements ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération mouvements' });
  }
};

exports.create = async (req, res) => {
  const { type, quantite, produit_id } = req.body;
  try {
    await pool.query('BEGIN');

    // Insérer mouvement
    const { rows } = await pool.query(
      'INSERT INTO mouvements (type, quantite, produit_id) VALUES ($1,$2,$3) RETURNING *',
      [type, quantite, produit_id]
    );

    // Mettre à jour le stock
    const prod = await pool.query('SELECT quantite FROM produits WHERE id=$1', [produit_id]);
    let newQty = prod.rows[0].quantite;
    newQty += type === 'IN' ? quantite : -quantite;

    await pool.query('UPDATE produits SET quantite=$1 WHERE id=$2', [newQty, produit_id]);
    await pool.query('COMMIT');

    res.status(201).json(rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Erreur création mouvement' });
  }
};
