import React, { useContext, useState } from 'react'
import '../css/LoginCard.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContent } from '../context/AppContext'

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const { backendUrl } = useContext(AppContent)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const resetToken = localStorage.getItem('resetToken') // ✅ Retrieve saved token

      if (!resetToken) {
        alert('Reset token missing or expired. Please request OTP again.')
        return navigate('/reset-password')
      }

      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-reset-otp`,
        { otp, newPassword },
        {
          headers: { Authorization: `Bearer ${resetToken}` },
          withCredentials: true,
        }
      )

      if (data.success) {
        alert('✅ Password reset successful!')
        localStorage.removeItem('resetToken') // Clean up
        navigate('/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <div className="SignUpCardContainer">
      <form onSubmit={onSubmitHandler}>
        <div className="signUpContainer">
          <h2 className="white">
            Verify OTP
            <img src={assets.OtpKey || assets.Login} alt="Verify Icon" />
          </h2>

          <div className="emailContainer">
            <h4>Enter OTP</h4>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              placeholder="Enter 6-digit OTP"
              type="text"
              className="email"
              required
              maxLength={6}
            />
          </div>

          <div className="passwordContainer">
            <h4>New Password</h4>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              className="password"
              placeholder="Enter new password"
              required
            />
          </div>

          <button type="submit" className="register">
            Verify & Reset Password
          </button>

          <div className="loginAcc">
            <p>Back to Login?</p>
            <span onClick={() => navigate('/login')}>Login Here</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyResetOtp
