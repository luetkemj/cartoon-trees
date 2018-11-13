const axios = require('axios');

const mongoose = require('mongoose');

const logger = require('../lib/logger')();

const Page = mongoose.model('Page');

const imgurRequest = (url, config) => {
  return axios({
    url,
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    ...config,
  });
};

const uploadImage = async (req, res) => {
  logger.log('preparing to upload image to imgur: 👍');

  const { file, parent, root } = req.body;

  const url = 'https://api.imgur.com/3/image';
  const config = {
    method: 'POST',
    data: {
      image: file,
    },
  };

  try {
    logger.log('uploadImage: uploading image to imgur: 👍');
    const imgurResponse = await imgurRequest(url, config);
    const image = imgurResponse.data.data;

    const docs = {
      image, // imgur image object
      parent, // mongo id of parent
      root, // is this page a root?
    };

    const data = await Page.create(docs);
    logger.log('uploadImage: createPage: 👍');

    return res.send({ data });
  } catch (e) {
    logger.error('uploadImage: Error! ❌');
    logger.error(e);
    return res.status(500).send(e);
    // return res.status(e.response.status).send({ message: e.response.statusText });
  }
};

// const getRootPages = async

module.exports = (router) => {
  router.route('/api/upload-image').post(uploadImage);
};
