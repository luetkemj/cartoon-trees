const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');
const config = require('./index.js');

const logger = require('../lib/logger')();

const RETRY_SECONDS = 5;

const mongoUrl = `${config.mongo.protocol}${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

function connectWithRetry(retrySeconds) {
  return mongoose.connect(mongoUrl, options, (err) => {
    if (err) {
      logger.error(`Failed to connect to mongo on startup. Retrying in ${retrySeconds} seconds`, err.message);
      setTimeout(() => connectWithRetry(retrySeconds), 1000 * retrySeconds);
    } else {
      logger.log(`Connected to MongoDB ${mongoUrl}`);
      mongoose.connection.on('disconnected', () => {
        const errorMsg = `Lost connection to MongoDB ${mongoUrl}`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      });
    }
  });
}

connectWithRetry(RETRY_SECONDS);

// load all the mongoose models
const MODELS_PATH = path.join(__dirname, '../models');
logger.log(`models path: ${MODELS_PATH}`);
const files = glob.sync(`${MODELS_PATH}/**/*.js`);
files.map(file => require(file)); // eslint-disable-line
