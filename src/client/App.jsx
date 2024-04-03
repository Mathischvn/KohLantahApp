import React, { startTransition } from 'react'
import './reset.css'
import './App.css'
import { TitlePage } from './components/mainPage/titlePage'
import { SideBar } from './components/sideBar/sideBar'
import { Enigme } from './components/enigmePage/enigme'
import { ChoicePage } from './components/choicePage/choicePage'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <TitlePage />
            <SideBar />
          </>
        } />
        <Route path='/enigme' element={<Enigme />} />
        <Route path='/combat' element={""} />
        <Route path='/choise' element={<ChoicePage />} />
      </Routes>
      
     
    </BrowserRouter>
  )
}

export default App
