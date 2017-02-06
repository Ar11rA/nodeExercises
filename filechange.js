module.exports = function changeFile(filePath, lineNumber, data) {
  var fs = require('fs');
  const fileData = fs.readFileSync(filePath).toString().split('\n');
  if (fileData.length > lineNumber) {
    fileData[lineNumber] = data;
    const text = fileData.join('\n');
    fs.writeFile(filePath, text, function (err) {
      if (err) return console.log(err);
      else
      return 1;
    });
  }
  else{
    return -1;
  }
};
//changeFile('/Users/aritraaritra/Documents/nodeExercises/sampleTextFile.txt',2,'data');