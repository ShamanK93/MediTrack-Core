const express = require('express');
const router = express.Router();

const depotCtrl = require('../controllers/depotController');
const produitCtrl = require('../controllers/produitController');
const mouvementCtrl = require('../controllers/mouvementController');

const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Liste tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 */
router.get('/produits', produitCtrl.list);

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Crée un produit (admin seulement)
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - code
 *               - quantite
 *               - depot_id
 *             properties:
 *               nom:
 *                 type: string
 *               code:
 *                 type: string
 *               quantite:
 *                 type: integer
 *               depot_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produit créé
 */
router.post('/produits', isAdmin, produitCtrl.create);

/**
 * @swagger
 * /api/mouvements:
 *   get:
 *     summary: Liste tous les mouvements
 *     tags: [Mouvements]
 *     responses:
 *       200:
 *         description: Liste des mouvements
 */
router.get('/mouvements', mouvementCtrl.list);

/**
 * @swagger
 * /api/mouvements:
 *   post:
 *     summary: Crée un mouvement (in/out)
 *     tags: [Mouvements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - quantite
 *               - produit_id
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [IN, OUT]
 *               quantite:
 *                 type: integer
 *               produit_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Mouvement créé
 */
router.post('/mouvements', mouvementCtrl.create);

/**
 * @swagger
 * tags:
 *   name: Dépôts
 *   description: Gestion des zones internes des dépôts
 */

/**
 * @swagger
 * /api/depots/{id}/zones:
 *   get:
 *     summary: Récupère les zones d'un dépôt
 *     tags: [Dépôts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Zones récupérées
 */
router.get('/depots/:id/zones', depotCtrl.getZones);

/**
 * @swagger
 * /api/depots/{id}/zones:
 *   post:
 *     summary: Crée des zones pour un dépôt (admin seulement)
 *     tags: [Dépôts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nom:
 *                       type: string
 *                     bac:
 *                       type: string
 *     responses:
 *       201:
 *         description: Zones créées
 */
router.post('/depots/:id/zones', isAdmin, depotCtrl.createZone);

router.put('/depots/:id/zones', isAdmin, depotCtrl.updateZone);

module.exports = router;
