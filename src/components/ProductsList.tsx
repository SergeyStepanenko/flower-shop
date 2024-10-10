import React from 'react'
import { styled } from '@linaria/react'
import { ProductCard } from './ProductCard'

export const ProductsList: React.FC = () => {
  // Временно создадим массив данных для двух строк продуктов (4 продукта)
  const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description of product 1',
      price: '$29.99',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description of product 2',
      price: '$39.99',
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Description of product 3',
      price: '$49.99',
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Description of product 4',
      price: '$59.99',
    },
  ]

  return (
    <ProductsListContainer>
      {products.map(product => (
        <ProductCard key={product.id} />
      ))}
    </ProductsListContainer>
  )
}

// Стили для контейнера карточек продуктов
export const ProductsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    2,
    calc(50% - 5px)
  ); /* Две колонки одинаковой ширины */
  gap: 10px; /* Отступ между карточками */
  grid-gap: 10px; /* Отступ между карточками */
  width: 100%;
`
