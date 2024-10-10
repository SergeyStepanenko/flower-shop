import React, { useEffect } from 'react'
import { styled } from '@linaria/react'

const App: React.FC = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp
    tg.ready()

    // Получение данных пользователя
    console.log('User:', tg)
  }, [])

  const onClose = () => {
    window.Telegram.WebApp.close()
  }

  return (
    <div>
      <Title>Добро пожаловать в моё Telegram Mini App приложение!</Title>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}

export default App

const Title = styled.h1`
  font-size: 32px;
  color: #333;
`
