const glob = require('glob');
const path = require('path');

module.exports = (router) => {
  // import API routes
  const API_ROUTE_PATH = path.join(__dirname, 'api');
  const files = glob.sync(`${API_ROUTE_PATH}/**/*.js`);
  // files are all the {name}.routes.js files in the routes/api folder
  // each file is given an express router (which originates in the express.js folder)
  files.map(file => require(file)(router)); // eslint-disable-line import/no-dynamic-require

  // if at this point we don't have a route match for /api, return 404
  router.route('/api/*').all((req, res) =>
    res.status(404).send({
      error: `route not found: ${req.url}`,
    }));
};
