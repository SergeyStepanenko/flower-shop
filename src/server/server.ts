import cors from 'cors'
import express from 'express'
import { API, ProductApi } from '../common/api'
import { startCommand } from './bot/commands/startCommand'
import { createInvoiceLink } from './controllers/createInvoiceLinkController'
import { sendInvoice } from './controllers/sendInvoiceController'

const PORT = 3000
const app = express()

// Enable CORS
app.use(cors())

// Middleware to parse JSON requests
app.use(express.json())

// Webhook endpoint
app.post('/', async (req, res) => {
  try {
    const update = req.body
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

    res.status(200).json({ status: 'ok' })
  } catch (error) {
    console.error('Error processing update:', error)
    res.status(400).json({ error: 'Bad Request' })
  }
})

// Route to handle start payment
app.post(API.startPayment, async (req, res) => {
  try {
    const { chatId } = req.body // Extract data from request body
    await sendInvoice(chatId)
    res.status(200).json({ status: 'Invoice sent' })
  } catch (error) {
    console.error('Error sending invoice:', error)
    res.status(500).json({ error: 'Failed to send invoice' })
  }
})

app.post(API.createInvoice, async (req, res) => {
  try {
    res.json({
      status: 'Invoice created',
      invoiceLink: await createInvoiceLink(req.body as ProductApi),
    })
  } catch (error) {
    console.error('Error creating invoice:', error)
    res.status(500).json({ status: 'Error', error: '' })
  }
})

// Handle unknown routes
app.use((req, res) => {
  res.status(404).send('Not Found')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
