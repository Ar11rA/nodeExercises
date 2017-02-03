const axios = require('axios');
const url = 'https://www.google.com';
axios.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
 