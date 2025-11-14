require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Routes
const routes = require('./src/routes');           // tes routes MediTrack Core
const authRoutes = require('./src/routes/auth');  // routes auth register/login

// Middleware global d'erreur
const errorHandler = require('./src/middlewares/errorHandler');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Création de l'application
const app = express();

// ------------------- MIDDLEWARES -------------------
app.use(morgan('dev'));                  // logging des requêtes
app.use(bodyParser.json());              // parse JSON
app.use(cors({ origin: '*' }));         // CORS simple, adapte selon ton front

// Limitation de requêtes (rate limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,                  // 100 requêtes max par IP
});
app.use(limiter);

// ------------------- ROUTES -------------------
// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'MediTrack Secure API running', routes: ['/api', '/auth', '/docs'] });
});

// Auth routes
app.use('/auth', authRoutes);

// Core API routes sécurisées
app.use('/api', routes);

// Middleware global d'erreur
app.use(errorHandler);

// ------------------- SWAGGER -------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediTrack Secure API',
      version: '1.0.0',
      description: 'API sécurisée pour la gestion des dépôts et des mouvements',
    },
  },
  apis: ['./src/routes/*.js'], // chemin vers tes fichiers de routes avec commentaires Swagger
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------- MONGODB -------------------
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
