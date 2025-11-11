import React, { useState,useContext } from 'react'
import '../css/ChangePassword.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContent } from '../context/AppContext'


const ChangePassword = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const {backendUrl,userData} = useContext(AppContent);
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = userData.email;
    if(!email){
      alert("couldn't find user")
    }

    try {
       const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`,{
         email,
         oldpassword:oldPass,
         newpassword:newPass
       })

       if(data.success){
        alert("Password Changed Succesfully☑️");
        navigate('/profile-info')
       }else{
        alert(data.message);
       }
    } catch (error) {
      console.error(error);  
    }
    
  }

  return (
    <div className="cp-page">
      <div className="cp-card">
        <div className="cp-header">
          <div className="cp-icon">
            <img src={assets.LockIcon} alt="lock icon" />
          </div>
          <h2>Change Password</h2>
          <p className="cp-sub">for itzabhishek5127@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cp-input-group">
            <label>Old Password</label>
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              required
            />
          </div>

          <div className="cp-input-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="cp-btn">Change Password</button>

          <div className="cp-footer">
            <p>Want to go back?</p>
            <button type="button" onClick={() => navigate('/profile-info')} className="cp-back-btn">
              Return to Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
