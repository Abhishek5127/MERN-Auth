import React, { useContext, useState } from 'react'
import '../css/LoginCard.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      axios.defaults.withCredentials = true;
      
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password-otp`, {
        email,
      })

      if (data.success) {
        // ✅ Save reset token
        localStorage.setItem('resetToken', data.resetToken)
        alert('✅ OTP sent successfully to your email!')
        navigate('/verify-reset-otp')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="SignUpCardContainer">
      <form onSubmit={onSubmitHandler}>
        <div className="signUpContainer">
          <h2 className="white">
            Reset Password
            <img src={assets.VerifyEmail} alt="Reset Icon" />
          </h2>

          <div className="emailContainer">
            <h4>Registered Email</h4>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="elonmast@gmail.com"
              type="email"
              className="email"
              required
            />
          </div>

          <button type="submit" className="submit">
            Send Reset Link
          </button>

          <div className="loginAcc">
            <p>Remembered your password?</p>
            <span onClick={() => navigate('/login')}>Login Here</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
