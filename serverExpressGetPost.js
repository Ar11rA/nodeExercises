const port = 3000;
const express = require('express')
const app = express()
var readFile = require('./syncFileRead');
app.get('/read', (request, response)=> {
 const filePath = '/Users/aritraaritra/Documents/nodeExercises/sampleTextFile.txt';
 const result = readFile(filePath);
 response.send(result);
});

app.listen(port,()=>{
  console.log('Listening');
});