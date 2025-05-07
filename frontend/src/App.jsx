import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Navbar from './components/Navbar'
function App() {

  return (
    <>

      <BrowserRouter>
<Navbar/>
      <Routes>
      {/* <Route path="/" element={<Navbar/>}></Route> */}

      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path='task' element ={<Task/>}></Route>

        </Routes> 
      </BrowserRouter>
         </>
  )
}

export default App
