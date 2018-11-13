// initialize the configuration first!
require('../config/init')();

// load the mongo database
require('./mongo');

const app = require('./express');

const logger = require('../lib/logger')();

// load and output the configuration
const config = require('../config');

logger.log('config: %j', config);

app.listen(config.port, (err) => {
  if (err) {
    logger.log(err);
  }

  logger.log(`Express server listening on port ${config.port} in ${process.env.NODE_ENV} environment`);
});
