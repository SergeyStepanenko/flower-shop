export const API = {
  startPayment: '/start-payment',
  createInvoice: '/create-invoice',
} as const

export type ProductApi = {
  productId: string
  title: string
  description: string
  currency: string
  totalAmount: number
  chatId: number
}
