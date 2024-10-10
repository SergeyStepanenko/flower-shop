import Telegram from '@types/telegram-web-app'

/* eslint-disable no-unused-vars */
interface Window {
  Telegram: {
    WebApp: Telegram // You can replace 'any' with the appropriate type if known
  }
}
