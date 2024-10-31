import React, { FC } from 'react'
import { styled } from '@linaria/react'
import { Product, ProductCard } from './ProductCard'
import rosesImage from '../assets/images/roses.webp'
import { API, ProductApi } from '../../common/api'

export const ProductsList: FC = () => {
  // Временно создадим массив данных для двух строк продуктов (4 продукта)
  const products: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description of product 1',
      price: '$29.99',
      imageUrl: rosesImage,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description of product 2',
      price: '$39.99',
      imageUrl: rosesImage,
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Description of product 3',
      price: '$49.99',
      imageUrl: rosesImage,
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Description of product 4',
      price: '$59.99',
      imageUrl: rosesImage,
    },
  ]

  const handlePayment = async (productId: number) => {
    const paymentData: ProductApi = {
      productId: '12345',
      title: 'Burger Meal',
      description: 'A delicious burger with fries and a drink',
      currency: 'USD',
      totalAmount: 499, // Amount in cents (e.g., $4.99)
      chatId: Telegram.WebApp.initDataUnsafe.user!.id, // Get the user’s chat ID if available
    }

    try {
      // Send the payment data to your bot backend without closing the Mini App
      const response = (await fetch(
        `${process.env.API_BASE_URL}${API.createInvoice}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData),
        },
      )) as Response

      const json = await response.json()

      Telegram.WebApp.openInvoice(json.invoiceLink, status => {
        status
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ProductsListContainer>
      {products.map(product => (
        <ProductCard key={product.id} {...product} onBuyClick={handlePayment} />
      ))}
    </ProductsListContainer>
  )
}

// Стили для контейнера карточек продуктов
export const ProductsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 5px));
  gap: 10px;
  grid-gap: 10px;
  width: 100%;
`
