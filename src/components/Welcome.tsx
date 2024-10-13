import { styled } from '@linaria/react'
import React, { FC } from 'react'

export const Welcome: FC = () => {
  return <Title>Добро пожаловать в магазин цветов!</Title>
}

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  text-align: center;
`
