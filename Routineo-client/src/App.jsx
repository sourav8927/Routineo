import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import FullScreenWrapper from './Components/FullScreenWrapper'


function App() {
  const [count, setCount] = useState(0)
  // const [routines, setRoutines] = useState([
  //   // Default static routines from the original RoutinePage component
  //   {
  //     sl: 1,
  //     type: "Engineering Science",
  //     code: "ESC-EC 501",
  //     title: "Signals & Systems",
  //     hours: { lecture: 3, tutorial: 0, practical: 0 },
  //     credits: 3,
  //     marks: 100,
  //   },
  //   {
  //     sl: 2,
  //     type: "Professional Core Course",
  //     code: "PCC-IT 501",
  //     title: "Database Management Systems",
  //     hours: { lecture: 3, tutorial: 0, practical: 0 },
  //     credits: 3,
  //     marks: 100,
  //   },
  //   // Add other default routines here
  // ]);
  // const handleAddRoutine = (newRoutine) => {
  //   setRoutines([...routines, newRoutine]); // Append the new routine
  // };
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
