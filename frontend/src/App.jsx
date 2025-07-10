

import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Customize from './pages/Customize'
import Home from './pages/Home'
import { userDataContext } from './context/UserContext'

const App = () => {
  const { userData } = useContext(userDataContext)

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          userData?.assistantImage && userData?.assistantName 
            ? <Home /> 
            : <Navigate to="/customize" />
        } 
      />
      <Route 
        path="/signup" 
        element={
          !userData 
            ? <SignUp /> 
            : <Navigate to="/" />
        } 
      />
      <Route 
        path="/signin" 
        element={
          !userData 
            ? <SignIn /> 
            : <Navigate to="/" />
        } 
      />
      <Route path="/customize" element={userData ?<Customize />:<Navigate to={"/signin"}/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
