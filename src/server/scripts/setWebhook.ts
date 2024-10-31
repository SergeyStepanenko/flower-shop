// ts-node ./src/server/scripts/setWebhook.ts

import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const botToken = process.env.BOT_TOKEN
const webhookUrl = process.env.SERVER_URL

async function setWebhook() {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      {
        url: webhookUrl,
      },
    )
    console.log('Webhook set:', response.data)
  } catch (error) {
    console.error('Error setting webhook:', error)
  }
}

setWebhook()
