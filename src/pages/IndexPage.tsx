import React, { FC } from 'react'
import { Welcome } from '../components/Welcome'
import { ProductsList } from '../components/ProductsList'

export const IndexPage: FC = () => {
  return (
    <div>
      <Welcome />
      <ProductsList />
    </div>
  )
}
