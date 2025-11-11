import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import Signup from './pages/signup.jsx'
import VerifyPasswordOtp from './pages/VerifyPasswordOtp.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Profile from './pages/Profile.jsx'
import ChangePassword from './pages/ChangePassword.jsx'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='reset-password-otp' element={<ResetPassword/>}/>
        <Route path='verify-reset-otp' element={<VerifyPasswordOtp/>}/>
        <Route path='profile-info' element={<Profile/>}/>
        <Route path='change-password' element={<ChangePassword/>}/>

        
      </Routes>
    </div>
  )
}

export default App
