import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets.js'
import '../css/Profile.css'
import axios from 'axios'
import { AppContent } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const { backendUrl, userData, setIsLoggedin, setUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [verifyEmail, SetVerifyEmail] = useState('')


  const verifyAccountHandler = async (e) => {
    e.preventDefault();


    try {

      if(userData.isAccountVerified===true){
        alert("Account already Verified");
      }else{

         const email = userData.email;
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        email
      })

      if(data.success){
        alert("Varificaiton OTP sent on Email☑️");

        navigate('/email-verify');
      }else{
        alert(data.message)
      }

      }
     
    } catch (error) {
      console.error(error)
      alert("something went wrong!")
    }

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

   
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/change-name`, {
        newName
      })

      if (data.success) {
        setIsLoggedin(true);
        window.location.reload();
      }
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong changing name.")
    }
  }


  return (
    <div className="profilePage">
      <Navbar />
      <div className="profileBox">
        <div className="dataContainer">

          <div className="profileAvatar">
            <h3>{userData ? userData.name[0].toUpperCase() : '?'}</h3>
          </div>

          <div className="data">
            <div className="nameContainer">
              <input
                type="text"
                className="nameInput"
                placeholder={userData ? userData.name : 'User'}
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                required
              />
              <button onClick={onSubmitHandler} className="editBtn">
                <img src={assets.editPencil} alt="edit icon" />
              </button>
            </div>

            <div className="emailContainer">
              <p className="email">{userData ? userData.email : "UserEmail"}</p>
              <div onClick={verifyAccountHandler} className={userData.isAccountVerified ? 'profileStatus verified' : 'profileStatus notVerified'}>{userData.isAccountVerified ? 'Verified' : 'Not Verified'}</div>
            </div>

            <div className="changePasswordContainer">
              <button onClick={e => navigate('/change-password')} className="changePasswordBtn">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
