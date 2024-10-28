import axios from 'axios'
import { BOT_TOKEN, WEB_APP_URL } from '../../config/env'

export const startCommand = async (chatId: string) => {
  console.log('Handling /start command...')

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
