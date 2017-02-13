const fs = require('fs')
function fileWrite (inputPath, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(inputPath, text, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = fileWrite