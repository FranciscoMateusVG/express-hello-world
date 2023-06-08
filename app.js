const express = require('express')
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')

app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)

server.keepAliveTimeout = 120 * 1000
server.headersTimeout = 120 * 1000

const wss = new WebSocket.Server({ server })

app.post('/message', express.json(), (req, res) => {
  const message = req.body
  console.log(message)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const myId = uuidv4()

      client.send(
        JSON.stringify({
          ...message,
          myId
        })
      )
    }
  })
  res.json({ status: 'Message sent to all clients' })
})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })
})
