import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'

function App() {

  return (
    <>
     <BrowserRouter>
     
        <Routes>
            <Route path='/signup' element = {<Signup/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/' element = {<Home/>}/>
        </Routes>

        <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
