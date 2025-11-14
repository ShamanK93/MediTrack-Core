const pool = require('../models/pgClient');

exports.list = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM produits ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération produits' });
  }
};

exports.create = async (req, res) => {
  const { nom, code, quantite, depot_id } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO produits (nom, code, quantite, depot_id) VALUES ($1,$2,$3,$4) RETURNING *',
      [nom, code, quantite, depot_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur création produit' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nom, code, quantite, depot_id } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE produits SET nom=$1, code=$2, quantite=$3, depot_id=$4 WHERE id=$5 RETURNING *',
      [nom, code, quantite, depot_id, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour produit' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM produits WHERE id=$1', [id]);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur suppression produit' });
  }
};
