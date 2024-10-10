import React, { useEffect } from 'react'
import { IndexPage } from './pages/Main'

const App: React.FC = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp
    tg.ready()

    // Получение данных пользователя
    console.log('User:', tg)
  }, [])

  return <IndexPage />
}

export default App
