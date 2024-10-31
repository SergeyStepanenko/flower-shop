import axios from 'axios'
import { ProductApi } from '../../common/api'
import { BOT_TOKEN, PAYMENT_PROVIDER_TOKEN } from '../config/env'

export async function createInvoiceLink(product: ProductApi) {
  const payload = {
    title: product.title,
    description: product.description,
    payload: `product_${product.productId}`,
    provider_token: PAYMENT_PROVIDER_TOKEN,
    currency: product.currency,
    prices: [{ label: product.title, amount: product.totalAmount }],
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
      payload,
    )
    console.log('Invoice Link:', response.data.result)
    return response.data.result as string // This is the invoice link
  } catch (error) {
    console.error('Error creating invoice link:', error)
  }
}
