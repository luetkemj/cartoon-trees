const config = {
  mongo: {
    protocol: process.env.MONGO_PROTOCOL || 'mongodb://',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DB || 'cartoon-trees',
  },
  port: process.env.PORT || 3000,
};

module.exports = config;
