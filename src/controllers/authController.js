const pool = require('../models/pgClient'); // connexion PostgreSQL
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --------- REGISTER ---------
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Vérifier que l'utilisateur n'existe pas déjà
    const { rows: exist } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (exist.length > 0) {
      return res.status(400).json({ error: 'Nom d’utilisateur déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter l'utilisateur en base
    const { rows } = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, hashedPassword, role || 'user']
    );

    res.status(201).json({ status: 'success', user: rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement' });
  }
};

// --------- LOGIN ---------
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Chercher l'utilisateur
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const user = rows[0];

    // Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ status: 'success', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};
