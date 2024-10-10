import React, { useEffect } from 'react'
import { IndexPage } from './pages/IndexPage'
import { tg } from './constants'

const App: React.FC = () => {
  useEffect(() => {
    tg.ready()
    // Получение данных пользователя
    console.log('Telegram:', tg)
  }, [])

  return <IndexPage />
}

export default App
