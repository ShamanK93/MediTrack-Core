const express = require('express');
const router = express.Router();

const depotCtrl = require('../controllers/depotController');
const produitCtrl = require('../controllers/produitController');
const mouvementCtrl = require('../controllers/mouvementController');

// DEPOTS -> zones (Mongo)
router.get('/depots/:id/zones', depotCtrl.getZones);
router.post('/depots/:id/zones', depotCtrl.createZone);
router.put('/depots/:id/zones', depotCtrl.updateZone);

// PRODUITS CRUD
router.get('/produits', produitCtrl.list);
router.post('/produits', produitCtrl.create);
router.put('/produits/:id', produitCtrl.update);
router.delete('/produits/:id', produitCtrl.remove);

// MOUVEMENTS
router.get('/mouvements', mouvementCtrl.list);
router.post('/mouvements', mouvementCtrl.create); // gère MAJ stock + insert mouvement

module.exports = router;
