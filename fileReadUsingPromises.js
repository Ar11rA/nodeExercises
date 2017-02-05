const fs = require('fs');
const inputPath = '/Users/aritraaritra/Documents/nodeExercises/README.md';
readFileAsync = function (inputPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(inputPath, 'utf-8', function (err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};
readFileAsync(inputPath)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

// NOTE - ANOTHER IMPLEMENTATION -- readFileAsync = new Promise(function (resolve, reject) { 
