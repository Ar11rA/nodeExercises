const express = require('express')
const app = express()
const {addToDb, displayData, updateDb, deleteFromDb, updateDbAll, deleteAllChecked} = require('./databaseFunctions')
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.get('/test', function (req, res) {
  res.render('public/test')
})

app.get('/read', function (req, response) {
  const disp = displayData()
  disp.then((tasks) => {
    response.send(tasks)
  })
})
app.post('/write/:message', function (req, response) {
  const data = req.params.message
  if (!data) {
    response.sendStatus(500)
  }
  const addData = addToDb(data)
  addData.then((id) => response.send(id))
  addData.catch(() => response.sendStatus(500))
})
app.put('/update/:id', function (req, response) {
  const id = req.params.id
  if (id < 0) {
    response.sendStatus(500)
  }
  const description = req.body.description
  const status = req.body.status
  if (status == null && !description) response.sendStatus(500)
  const updData = updateDb(id, description, status)
  updData.then((id) => response.send(id))
  updData.catch(() => response.sendStatus(500))
})
app.delete('/destroy/:id', function (req, response) {
  const id = req.params.id
  if (id < 0) response.sendStatus(500)
  const delId = deleteFromDb(id)
  delId.then((data) => {
    if (data[1].rowCount === 0)
      response.send('No such row to delete')
    else
      response.send('Data deleted')
  })
  delId.catch(() => response.sendStatus(500))
})
app.delete('/destroyAll', function (req, response) {
  const id = req.params.id
  if (id < 0) response.sendStatus(500)
  const delId = deleteAllChecked()
  delId.then((data) => {
    if (data[1].rowCount === 0)
      response.send('No such row to delete')
    else
      response.send('Data Deleted')
  })
  delId.catch(() => response.sendStatus(500))
})
app.put('/updateAll/:status', function (req, response) {
  const statusAll = req.params.status
  const updData = updateDbAll(statusAll)
  updData.then(() => response.send())
  updData.catch(() => response.sendStatus(500))
})
app.listen(3010)
