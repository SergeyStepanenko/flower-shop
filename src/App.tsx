import React, { useEffect } from 'react'

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
      <h1>Добро пожаловать в моё Telegram Mini App!</h1>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}

export default App
