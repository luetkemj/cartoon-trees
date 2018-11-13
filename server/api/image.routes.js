const { imgurRequest } = require('../lib/http');

const uploadImage = async (req, res) => {
  const { file } = req.body;

  const url = 'https://api.imgur.com/3/image';
  const config = {
    method: 'POST',
    data: {
      image: file,
      album: 'XgmiXIB',
    },
  };

  try {
    const response = await imgurRequest(url, config);
    return res.send({ data: response.data });
  } catch (e) {
    return res.status(e.response.status).send({ message: e.response.statusText });
  }
};

module.exports = (router) => {
  router.route('/api/upload-image').post(uploadImage);
};
