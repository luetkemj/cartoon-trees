const axios = require('axios');

const mongoose = require('mongoose');

const logger = require('../lib/logger')();

const Page = mongoose.model('Page');

const imgurRequest = (url, config) => axios({
  url,
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
  ...config,
});

const uploadImage = async (req, res) => {
  logger.log('uploadImage: preparing to upload image to imgur: 👍');

  const { file, parent, root } = req.body;

  const url = 'https://api.imgur.com/3/image';
  const config = {
    method: 'POST',
    data: {
      image: file,
    },
  };

  try {
    logger.log('uploadImage: uploading to imgur: 👍');
    const imgurResponse = await imgurRequest(url, config);
    logger.log('uploadImage: uploaded to imgur: 👍');

    logger.log('uploadImage: preparing to save to database: 👍');
    const image = imgurResponse.data.data;

    const docs = {
      image, // imgur image object
      parent, // mongo id of parent
      root, // is this page a root?
    };

    logger.log('uploadImage: saving to database: 👍');
    const data = await Page.create(docs);
    logger.log('uploadImage: saved to database: 👍');

    return res.send({ data });
  } catch (e) {
    const { response: { status, statusText } } = e;

    logger.error('uploadImage: ', { status, statusText });
    return res.status(status).send({ message: statusText });
  }
};

const getRootPages = async (req, res) => {
  logger.log('getRootPages: prepearing to get root pages');

  try {
    const data = await Page.find({ root: true }).exec();
    logger.log('getRootPages: from database: 👍');
    return res.send({ data });
  } catch (e) {
    const { response: { status, statusText } } = e;
    logger.error('getRootPages: ', { status, statusText });
    return res.status(status).send({ message: statusText });
  }
};

const getPage = async (req, res) => {
  logger.log('getPage: preparing to get page');
  const { id } = req.params;

  try {
    const [page, children] = await Promise.all([
      Page.findById(id).exec(),
      Page.find({ parent: id }).exec(),
    ]);
    logger.log('getPage: from database: 👍');

    const data = {
      _id: page._id, // eslint-disable-line
      image: page.image,
      parent: page.parent,
      root: page.root,
      children,
    };

    return res.send({ data });
  } catch (e) {
    const { response: { status, statusText } } = e;
    logger.error('getPage: ', { status, statusText });
    return res.status(status).send({ message: statusText });
  }
};

module.exports = (router) => {
  router.route('/api/upload-image').post(uploadImage);
  router.route('/api/root-pages').get(getRootPages);
  router.route('/api/page/:id').get(getPage);
};
