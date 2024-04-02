import React, { startTransition } from 'react'
import './reset.css'
import './App.css'
import { TitlePage } from './components/mainPage/titlePage'
import { InventoryPage } from './components/inventoryPage/inventoryPage'
import { SideBar } from './components/sideBar/sideBar'
import SlideIn from './components/slideIn/SlideIn'

function App() {
  return (
    <React.Fragment>
      <TitlePage />
      <SideBar />
    </React.Fragment>
  )
}

export default App
