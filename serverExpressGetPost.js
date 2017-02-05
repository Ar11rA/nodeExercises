const port = 3000;
const filePath = '/Users/aritraaritra/Documents/nodeExercises/sampleTextFile.txt';
const express = require('express')
const bodyParser = require('body-parser');
const readFile = require('./syncFileRead');
const appendFile = require('./fileAppend');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.get('/read', (request, response) => {
  const result = readFile(filePath);
  response.send(result);
});
app.post('/write', (req, res) => {
  const data = req.body.dataWrite;
  appendFile(filePath, `${data}\n`);
});
app.listen(port, () => {
  console.log('Listening');
});