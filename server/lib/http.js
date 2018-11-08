const axios = require('axios');

const imgurRequest = (url, config) => {
  console.log('about to axios');
  return axios({
    url,
    headers: {
      Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
    },
    ...config,
  });
};

module.exports = {
  imgurRequest,
};
