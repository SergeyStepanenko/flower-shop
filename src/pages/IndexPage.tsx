import React, { FC } from 'react'
import { Welcome } from '../components/Welcome'
import { ProductsList } from '../components/ProductsList'
import { useTelegram } from '../hooks/useTelegram'

export const IndexPage: FC = () => {
  const { closeApp, sendData } = useTelegram()

  return (
    <div>
      <Welcome />
      <ProductsList />
      <button onClick={closeApp}>Close App</button>
      <button onClick={() => sendData('Some important data')}>Send Data</button>
    </div>
  )
}
