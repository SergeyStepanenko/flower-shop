import React, { FC, useEffect } from 'react'
import { IndexPage } from './pages/IndexPage'

const App: FC = () => {
  useEffect(() => {
    Telegram.WebApp.ready()
    Telegram.WebApp.expand()
    Telegram.WebApp.MainButton.isVisible = true

    Telegram.WebApp.onEvent('mainButtonClicked', () => {
      Telegram.WebApp.MainButton.text = 'Clicked!'
      Telegram.WebApp.sendData('Some important data')
    })
  }, [])

  return <IndexPage />
}

export default App
