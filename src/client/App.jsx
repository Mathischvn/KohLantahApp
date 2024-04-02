import React, { startTransition } from 'react'
import './reset.css'
import './App.css'
import { TitlePage } from './components/mainPage/titlePage'
import { SideBar } from './components/sideBar/sideBar'

function App() {
  return (
    <React.Fragment>
      <TitlePage />
      <SideBar />
    </React.Fragment>
  )
}

export default App
