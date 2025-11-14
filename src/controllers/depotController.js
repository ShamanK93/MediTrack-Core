// depotController.js
// Contrôleur pour gérer les zones des dépôts (MongoDB)
// Chaque fonction correspond à une route API pour les zones

// Récupérer les zones d'un dépôt
exports.getZones = async (req, res) => {
  // Récupération de l'id du dépôt depuis les paramètres de l'URL
  const depotId = req.params.id;
  
  try {
    // Retourne un JSON simulant les zones du dépôt
    // Dans une version finale, ici tu ferais une requête MongoDB pour récupérer les données réelles
    res.json({
      depot_id: depotId,
      zones: [
        { nom: "Zone A", bac: "A1" },
        { nom: "Zone B", bac: "B1" }
      ]
    });
  } catch (err) {
    // Log de l'erreur côté serveur
    console.error(err);
    // Retour d'une réponse JSON d'erreur
    res.status(500).json({ error: 'Erreur récupération zones' });
  }
};

// Créer des zones pour un dépôt
exports.createZone = async (req, res) => {
  const depotId = req.params.id;
  // Extraction des zones depuis le corps de la requête
  const { zones } = req.body; 

  try {
    // Ici, normalement, tu ferais un insert dans MongoDB
    // Pour le moment, on renvoie simplement un JSON confirmant la création
    res.status(201).json({
      message: `Zones ajoutées pour le dépôt ${depotId}`,
      zones: zones || [] // Si aucune zone fournie, renvoie un tableau vide
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur création zones' });
  }
};

// Mettre à jour les zones d'un dépôt
exports.updateZone = async (req, res) => {
  const depotId = req.params.id;
  const { zones } = req.body;

  try {
    // Normalement ici, tu ferais un update sur MongoDB
    // On renvoie juste un JSON confirmant la mise à jour
    res.json({
      message: `Zones mises à jour pour le dépôt ${depotId}`,
      zones: zones || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour zones' });
  }
};
