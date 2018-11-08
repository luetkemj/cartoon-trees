const auth = (req, res) => {
  res.send({ data: 'hello author' });
};

module.exports = (router) => {
  router.route('/api/auth').get(auth);
};
