const fs = require('fs')
readFileAsync = function (inputPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(inputPath, 'utf-8', function (err, data) {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}
module.exports = readFileAsync;
// readFileAsync(inputPath)
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// NOTE - ANOTHER IMPLEMENTATION -- readFileAsync = new Promise(function (resolve, reject) { 
