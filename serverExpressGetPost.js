const express = require('express')
const app = express()
const appendFile = require('./fileAppend')
const bodyParser = require('body-parser')
const changeFile = require('./filechange')
const fileDelete = require('./fileDelete')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
const filePath = '/Users/aritraaritra/Documents/nodeExercises/sampleTextFile.txt'
app.get('/read', function (req, response) {
  response.sendFile(filePath)
})
app.post('/write/:message', function (req, response) {
  const data = req.params.message
  appendFile(filePath, `\n${data}`)
  response.send()
})
app.put('/update/:line', function (req, response) {
  const lineNumber = req.params.line
  const dataToWrite = req.body.data
  const isValid = changeFile(filePath, lineNumber, dataToWrite)
  if (isValid < 0) {
    response.send(500)
  }
  response.send('Got a PUT request at /user')
})
app.delete('/destroy/:line', function (req, response) {
  const lineNumber = req.params.line
  const isValid = fileDelete(filePath, lineNumber)
  if (isValid < 0)
    response.send(500)
  response.send('Done')
})
app.listen(3004)
