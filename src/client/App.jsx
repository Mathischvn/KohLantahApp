import React from 'react'
import './App.css'
import { TitlePage } from './components/mainPage/titlePage'
import { InventoryPage } from './components/inventoryPage/inventoryPage'

function App() {

  return (
    <React.Fragment>
      <TitlePage />
      <InventoryPage />
    </React.Fragment>
  )
}

export default App
