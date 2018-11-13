const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const cors = require('cors');

// Create the express application
const app = express();

// CORS
// https://github.com/expressjs/cors
app.use(cors());

// gzip all the things
app.use(compression());

// use express' body parser to access body elements later
// set limit to 10mb - the max size of images accepted by the imgur api
app.use(bodyParser.json({ limit: '10mb' }));

/* ------------------------------------------ *
 * Route configuration
 * ------------------------------------------ */

const router = new express.Router();
const routes = require('../routes');

routes(router);
app.use(router);

module.exports = app;
