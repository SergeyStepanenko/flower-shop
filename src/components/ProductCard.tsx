import React from 'react'
import { styled } from '@linaria/react'

// React component
export const ProductCard: React.FC = () => {
  return (
    <Card>
      <ProductImage src="https://via.placeholder.com/300" alt="Product Image" />
      <ProductTitle>Product Title</ProductTitle>
      <ProductDescriptionBlock>
        <ProductDescription>
          This is a brief description of the product. It highlights key features
          and benefits.
        </ProductDescription>
        <ProductPrice>$49.99</ProductPrice>
        <OrderButton>Заказать</OrderButton>
      </ProductDescriptionBlock>
    </Card>
  )
}

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 16px;
`
const ProductTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #333;
`
const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 8px 0;
`
const ProductDescriptionBlock = styled.div`
  padding: 8px;
  text-align: center;
`
const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 12px 0;
`
const OrderButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`
