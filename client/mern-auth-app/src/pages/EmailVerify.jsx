import React, { useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/EmailVerify.css'
import axios from 'axios'
import { assets } from '../assets/assets.js'
import { AppContent } from '../context/AppContext.jsx'

const EmailVerify = () => {
  const navigate = useNavigate()
  const {backendUrl,userData} = useContext(AppContent);
  const inputsRef = Array.from({ length: 6 }, () => useRef(null))
  const [otp, setOtp] = useState(Array(6).fill(''))

  const handleChange = (i, value) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[i] = value
    setOtp(next)
    if (value && i < 5) inputsRef[i + 1].current?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputsRef[i - 1].current?.focus()
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef[i - 1].current?.focus()
    if (e.key === 'ArrowRight' && i < 5) inputsRef[i + 1].current?.focus()
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    const next = [...otp]
    for (let i = 0; i < 6; i++) next[i] = text[i] || ''
    setOtp(next)
    const firstEmpty = next.findIndex((d) => !d)
    inputsRef[(firstEmpty === -1 ? 5 : firstEmpty)].current?.focus()
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length === 6) {
      try {
        const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`,{
          otp:code
        })

        if(data.success){
          
          alert("Email Verified☑️");
          navigate('/profile-info');
          window.location.reload();

        }else{
          alert(data.message);
        }
        
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
      
    }else{
      alert("Enter 6 digit OTP")
    }
  }

  const resendOtp = () => {
    console.log('Resend OTP clicked (no backend wired)')
  }

  return (
    <div className="ev-page">
      <div className="ev-card">
        <div className="ev-header">
          <div className="ev-icon-wrap">
            <img src={assets?.OtpKey || assets?.Login} alt="otp" />
          </div>
          <h2>Email Verification</h2>
          <p className="ev-sub">Enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="ev-otp" onPaste={handlePaste}>
            {otp.map((val, i) => (
              <input
                key={i}
                ref={inputsRef[i]}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="ev-otp-input"
              />
            ))}
          </div>

          <button type="submit" className="ev-verify-btn">
            Verify Email
          </button>

          <div className="ev-foot">
            <span>Didn't receive the code?</span>
            <button type="button" className="ev-resend" onClick={resendOtp}>
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify
