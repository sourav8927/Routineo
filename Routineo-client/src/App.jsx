import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import FullScreenWrapper from './Components/FullScreenWrapper'
import GoogleCaptcha from './Components/GoogleCaptcha'


function App() {
  
  return (
    <>
    <FullScreenWrapper>
     <Navbar/>
     <div id="root" class="">
      <Outlet/>
     
     </div>
     </FullScreenWrapper>
    </>
  )
}

export default App
