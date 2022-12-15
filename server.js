// Server Dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('./config/winston');
const helmet = require('helmet');

// Init Express
const app = express();
require('dotenv').config();

// Server Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));
app.use(helmet());

// Cors Controls
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH'
  );
  next();
});
app.use(cors());

// Routes Definitions
const gamesRoute = require('./api/routes/gamesListRoutes');
const accountRoute = require('./api/routes/accountRoutes');
const ledgerRoute = require('./api/routes/ledgerListRoutes');
gamesRoute(app);
accountRoute(app);
ledgerRoute(app);

// 404 Handling
app.use((req, res) => {
  winston.error(`'Hit 404' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

// Server Port Controls
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
