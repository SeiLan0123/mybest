const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = require('express')()

const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })

app.use(bodyParser.json())

app.post('/api/send', function (req, res) {
  console.log(req.body.sentence);
  return res.json({ sentence: 'hello' })
})



// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}


app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
