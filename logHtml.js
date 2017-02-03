const axios = require('axios');
const getGoogle = () => axios.get('https://www.google.com');
const getFacebook = () => axios.get('https://www.facebook.com');
getGoogle()
  .then((response) => {
    console.log('Google: ' + response.data);
    return getFacebook();
  })
  .then((response) => {
    console.log('\n\n\n')
    console.log('Facebook: ' + response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
