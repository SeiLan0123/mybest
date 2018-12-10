const express = require("express");
const app = express()
const router = express.Router()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

router.get('/send', function (req, res) {
  return res.json({ sentence: 'request recieved in get method' })
})
router.post('/send', function (req, res) {
  console.log(req.body.sentence);
  return res.json({ sentence: 'hello' })
})

app.use(router);

module.exports = {
  path: '/api',
  handler: app
}
