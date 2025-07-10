import React from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Add more routes as needed */}
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} /> 
    </Routes>
  )
}

export default App