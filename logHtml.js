const axios = require('axios')
const getGoogle = () => axios.get('https://olafarefinder.com/estimate/Marathahalli,%20Bengaluru,%20Karnataka,%20India/Whitefield,%20Bengaluru,%20Karnataka,%20India')
getGoogle()
  .then((response) => {
    console.log('Cab: ' + response.data)
  })
  .catch((error) => {
    console.log(error)
  })
