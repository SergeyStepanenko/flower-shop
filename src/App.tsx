import React from 'react'
import { useTelegram } from './hooks/useTelegram'
import { IndexPage } from './pages/IndexPage'

const App: React.FC = () => {
  useTelegram()

  return <IndexPage />
}

export default App
