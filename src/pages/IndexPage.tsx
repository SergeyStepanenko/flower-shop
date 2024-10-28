import React, { FC } from 'react'
import { Welcome } from '../components/Welcome'
import { ProductsList } from '../components/ProductsList'
import { useTelegram } from '../hooks/useTelegram'

export const IndexPage: FC = () => {
  return (
    <div>
      <Welcome />
      <ProductsList />
      {/* <button onClick={window.Telegram.WebApp.close}>Close App</button>
      <button
        onClick={() => window.Telegram.WebApp.sendData('Some important data')}
      >
        Send Data
      </button> */}
    </div>
  )
}
