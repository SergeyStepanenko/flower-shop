import axios from 'axios'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config() // Load environment variables
import { PaymentData } from '../src/components/ProductCard'

const PORT = 3000
const BOT_TOKEN = process.env.TELEGRAM_BOT_PRODUCTION_API_KEY
const WEB_APP_URL = process.env.WEB_APP_URL
const PROVIDER_TOKEN = process.env.PAYMENT_METHOD_TOKEN_SBERBANK

const sendStartMessage = async (chatId: string) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: 'Открыть магазин',
        reply_markup: {
          keyboard: [
            [
              {
                text: 'Open Web App',
                web_app: { url: WEB_APP_URL },
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Response from Telegram:', response.data)
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const sendInvoice = async (chatId: string) => {
  const paymentData = {
    productId: '12345',
    title: 'Burger Meal',
    description: 'A delicious burger with fries and a drink',
    currency: 'USD',
    totalAmount: 500, // Amount in smallest currency units, e.g., cents
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendInvoice`,
      {
        chat_id: chatId,
        title: paymentData.title,
        description: paymentData.description,
        payload: `product_${paymentData.productId}`,
        provider_token: PROVIDER_TOKEN,
        currency: paymentData.currency,
        prices: [{ label: paymentData.title, amount: paymentData.totalAmount }],
      },
    )
    console.log('Invoice sent:', response.data)
  } catch (error) {
    console.error('Error sending invoice:', error)
  }
}

// Create HTTP server to listen for webhook events
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''

    // Collect data chunks from request
    req.on('data', chunk => {
      body += chunk.toString()
    })

    // Process the received data once complete
    req.on('end', () => {
      try {
        const update = JSON.parse(body)
        console.log('Received update:', update)

        console.log(update)

        if (update.pre_checkout_query) {
          // Answer pre-checkout query
          axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`,
            {
              pre_checkout_query_id: update.pre_checkout_query.id,
              ok: true,
            },
          )
        } else if (update.message && update.message.successful_payment) {
          // Handle successful payment
          console.log('Payment successful:', update.message.successful_payment)
        }

        // Check if it's a message update
        if (update.message) {
          const chatId = update.message.chat.id
          const text = update.message.text

          if (text === '/start') {
            console.log('Handling /start command...')
            sendStartMessage(chatId)

            setTimeout(() => {
              sendInvoice(chatId)
            }, 5000)
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
