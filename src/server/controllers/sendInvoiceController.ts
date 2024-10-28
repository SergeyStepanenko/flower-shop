import axios from 'axios'
import { BOT_TOKEN, PAYMENT_PROVIDER_TOKEN } from '../config/env'

export const sendInvoice = async (chatId: string) => {
  const paymentData = {
    productId: '12345',
    title: 'Burger Meal',
    description: 'A delicious burger with fries and a drink',
    currency: 'USD',
    totalAmount: 500, // Amount in smallest currency units, e.g., cents
  } as const

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendInvoice`,
      {
        chat_id: chatId,
        title: paymentData.title,
        description: paymentData.description,
        payload: `product_${paymentData.productId}`,
        provider_token: PAYMENT_PROVIDER_TOKEN,
        currency: paymentData.currency,
        prices: [{ label: paymentData.title, amount: paymentData.totalAmount }],
      },
    )
    console.log('Invoice sent:', response.data)
  } catch (error) {
    console.error('Error sending invoice:', error)
  }
}
