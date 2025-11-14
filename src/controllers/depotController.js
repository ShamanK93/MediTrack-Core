// Si tu veux utiliser MongoDB plus tard, tu importeras ton modèle ici
// const Zone = require('../models/zoneModel'); 

// Route GET /depots/:id/zones
exports.getZones = async (req, res) => {
  const depotId = req.params.id;
  
  try {
    // Pour l'instant, on renvoie un exemple statique
    // Plus tard, tu feras Zone.find({ depot_id: depotId })
    res.json({
      depot_id: depotId,
      zones: [
        { nom: "Zone A", bac: "A1" },
        { nom: "Zone B", bac: "B1" }
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération zones' });
  }
};

// Route POST /depots/:id/zones
exports.createZone = async (req, res) => {
  const depotId = req.params.id;
  const { zones } = req.body; // attend un tableau de zones

  try {
    // Pour l'instant, juste un retour statique
    res.status(201).json({
      message: `Zones ajoutées pour le dépôt ${depotId}`,
      zones: zones || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur création zones' });
  }
};

// Route PUT /depots/:id/zones
exports.updateZone = async (req, res) => {
  const depotId = req.params.id;
  const { zones } = req.body;

  try {
    // Pour l'instant, juste un retour statique
    res.json({
      message: `Zones mises à jour pour le dépôt ${depotId}`,
      zones: zones || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour zones' });
  }
};
