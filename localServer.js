const port = 3000
const axios = require('axios')
const http = require('http')

const request = 'http://www.google.co.in'
const server = http.createServer((req, res) => {
  const getGoogle = () => axios.get(request)
  getGoogle()
    .then((response) => {
      //res.writeHead(404);
      res.end(response.data)
    })
    .catch((err) => {
      console.error(error)
    })
})
server.listen(port)