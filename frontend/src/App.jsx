import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Rides from './Pages/Rides'
import Rides1 from './Pages/Ride1 Profile'
import TechnicianSection from './Pages/TechnicianSection'
import Ride1profile from './Pages/Ride1 Profile'
import Ride2 from './Pages/Ride2'
import Ride3 from './Pages/Ride3'



function App() {
  const [count, SetCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/Login' element={<Login></Login>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/Profile' element={<Profile></Profile>}></Route>
          <Route path='/Rides' element={<Rides></Rides>}></Route>
          <Route path='/TechnicianSection' element={<TechnicianSection></TechnicianSection>}></Route>
          <Route path='/Rideprofile/:rideid' element={<Ride1profile></Ride1profile>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}






export default App
