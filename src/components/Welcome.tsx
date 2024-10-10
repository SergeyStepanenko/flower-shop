import { styled } from '@linaria/react'
import React, { FC } from 'react'

export const Welcome: FC = () => {
  const onClose = () => {
    window.Telegram.WebApp.close()
  }

  return (
    <div>
      <Title>Добро пожаловать в моё Telegram Mini App приложение!</Title>
      <button onClick={onClose}>Close Mini App</button>
    </div>
  )
}

const Title = styled.h1`
  font-size: 32px;
  color: #333;
`
