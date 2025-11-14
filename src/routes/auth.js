const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");
const loginLimiter = require("../middlewares/loginLimiter");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Paramètres invalides
 */
router.post("/register", authCtrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connecté avec succès
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", loginLimiter, authCtrl.login);

module.exports = router;
