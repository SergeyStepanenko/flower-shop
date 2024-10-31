import http from 'http'
import { startCommand } from './bot/commands/startCommand'
import { sendInvoice } from './controllers/sendInvoiceController'
import { API } from '../common/api'

const PORT = 3000

// Create HTTP server to listen for webhook events
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === API.startPayment && req.method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      const paymentData = JSON.parse(body)
      await sendInvoice(paymentData.chatId)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'Invoice sent' }))
    })
    return
  }

  if (req.url === '/' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => (body += chunk.toString()))

    // Process the received data once complete
    req.on('end', async () => {
      try {
        const update = JSON.parse(body)
        console.log('Received update:', update)

        if (update.message) {
          const chatId = update.message.chat.id
          const text = update.message.text

          switch (text) {
            case '/start':
              await startCommand(chatId)
              break
            case '/invoice':
              await sendInvoice(chatId)
              break
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok' }))
      } catch (error) {
        console.error('Error parsing JSON:', error)
        res.writeHead(400)
        res.end('Bad Request')
      }
    })
    return
  }

  res.writeHead(404)
  res.end('Not Found')
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
