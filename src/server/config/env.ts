import dotenv from 'dotenv'

dotenv.config() // Load environment variables

export const BOT_TOKEN = process.env.BOT_TOKEN
export const PAYMENT_PROVIDER_TOKEN = process.env.PAYMENT_PROVIDER_TOKEN
export const WEB_APP_URL = process.env.WEB_APP_URL
