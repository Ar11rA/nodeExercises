const axios = require('axios')
const fileWrite = require('./fileWrite')
const inputPath = '/Users/aritraaritra/Documents/nodeExercises/cab.txt'
const getGoogle = () => axios.get('https://ride.guru')
getGoogle()
  .then((response) => {
    fileWrite(inputPath, response.toString())
  })
  .catch((error) => {
    console.log(error)
  })