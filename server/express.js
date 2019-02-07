const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const fs = require('fs')
const createApp = require('../src/main')
// const createApp = () => 'nothing'

const [headHtml, bodyHtml] = fs.readFileSync('./dist/index.html', 'utf-8').split('<body>')

server.get('*', (req, res) => {
  const app = createApp()

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Внутренняя ошибка сервера')
      return
    }

    const resultHtml = `${headHtml}<body>${html}${bodyHtml}`
    res.send(resultHtml)
  })
})

const PORT = 9080
server.listen(PORT, () => console.log(`Listen on ${PORT}!`))
