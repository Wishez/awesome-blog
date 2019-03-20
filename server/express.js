const server = require('express')()
const fs = require('fs')

const createApp = require('../server-dist/vue-ssr-server-bundle.json')
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(createApp, {
  runInNewContext: false,
  template: fs.readFileSync('./dist/index.html', 'utf-8'),
})

server.get('*', (req, res) => {
  const context = { url: req.url }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Внутренняя ошибка сервера')
      return
    }

    res.end(html)
  })
})

const PORT = 3000
server.listen(PORT, () => console.log(`Listen on ${PORT}!`))
