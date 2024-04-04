import React, { startTransition } from 'react'
import './reset.css'
import './App.css'
import { TitlePage } from './components/mainPage/titlePage'
import { SideBar } from './components/sideBar/sideBar'
import { Enigme } from './components/enigmePage/enigme'
import { DicePage } from './components/dicePage/dicePage'
import { ChoicePage } from './components/choicePage/choicePage'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'
import { BlankPage } from './components/blankPage/blankPage'


function App() {
  const [sectionID, setSectionID] = React.useState(1)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/game" element={<BlankPage sectionId={sectionID} setSectionID={setSectionID} />} />
      </Routes>
      
     
    </BrowserRouter>
  )
}

export default App
