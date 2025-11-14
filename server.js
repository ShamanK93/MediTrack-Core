require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// Root / health route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'MediTrack API running', routes: ['/api'] });
});

app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect Mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
