import http from 'http'
import { startCommand } from './bot/commands/startCommand'
import { sendInvoice } from './controllers/sendInvoiceController'

const PORT = 3000

// Create HTTP server to listen for webhook events
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = ''

    // Collect data chunks from request
    req.on('data', chunk => {
      body += chunk.toString()
    })

    // Process the received data once complete
    req.on('end', async () => {
      try {
        const update = JSON.parse(body)
        console.log('Received update:', update)

        // if (update.pre_checkout_query) {
        //   // Answer pre-checkout query
        //   axios.post(
        //     `https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`,
        //     {
        //       pre_checkout_query_id: update.pre_checkout_query.id,
        //       ok: true,
        //     },
        //   )
        // } else if (update.message && update.message.successful_payment) {
        //   // Handle successful payment
        //   console.log('Payment successful:', update.message.successful_payment)
        // }

        // Check if it's a message update
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
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
